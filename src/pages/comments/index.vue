<template>
  <div class="comments">
    <card
      :type="type"
      @toggle="changeType($event)"
      :width="width">
      <div class="item" style="margin-top: 10px;">
        <span
          class="text" 
          style="line-height: 38px;"
          :style="{ 'width': width }">搜索：</span>
        <div class="el-radio-group">
          <el-input
            v-model="keyword"
            placeholder="name, content, email..."
            @keyup.enter.native="getData"></el-input>
          <el-button
            type="primary"
            @click.native="getData"><i class="iconfont icon-search mar"></i>查询</el-button>
        </div>
      </div>
    </card>
  
    <div class="table">
      <el-table
        :data="commentsData"
        style="width: 100%"
        border>
        <el-table-column type="expand" label-class-name="head">
          <template scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="IP：">
                <span>{{ props.row.ip }}</span>
              </el-form-item>
              <el-form-item label="地址：">
                <span>{{props.row.country}} {{ props.row.city }}</span>
              </el-form-item>
              <el-form-item label="浏览器：">
                <span v-html="UAParse(props.row.agent)"></span>
              </el-form-item>
              <el-form-item label="系统：">
                <span v-html="OSParse(props.row.agent)"></span>
              </el-form-item>
              <el-form-item label="内容：">
                <span>{{ props.row.content }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="文章id"
          label-class-name="head"
          show-overflow-tooltip
          width="80">
          <template scope="scope">
            {{ scope.row.post_id }}
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          label-class-name="head"
          min-width="120">
          <template scope="scope">
            {{ scope.row.author.name }}
          </template>
        </el-table-column>
        <el-table-column
          label="邮箱"
          label-class-name="head"
          min-width="120"
          show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.author.email }}
          </template>
        </el-table-column>
        <el-table-column
          label="site"
          label-class-name="head"
          min-width="120"
          show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.author.site || '' }}
          </template>
        </el-table-column>
        <el-table-column
          label="日期"
          width="200"
          label-class-name="head">
          <template scope="scope">
            {{ scope.row.create_at | format('yyyy-MM-dd hh.mm.ss')}}
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="120"
          label-class-name="head">
          <template scope="scope">
            {{
               scope.row.state === 0
               ? '待审核'
               : scope.row.state === 1
                 ? '通过'
                 : '不通过'
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
          label-class-name="head"
          fixed="right">
          <template scope="scope">
            <transition-group tag="span" name="list">
              <el-button
                type="success" 
                size="small"
                v-if="scope.row.state === 0 || scope.row.state === 2"
                @click="changeState(scope.row, 1)"
                key="1">通过</el-button>
              <el-button 
                type="danger" 
                size="small" 
                v-if="scope.row.state === 0 || scope.row.state === 1"
                @click="changeState(scope.row, 2)"
                key="2">不通过</el-button>
              <el-button type="danger" size="small" key="3" @click="dele(scope.row, scope.$index)">删除</el-button>
            </transition-group>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          :current-page="currentPage"
          layout="total, prev, pager, next"
          :page-size="20"
          @current-change="pageChange"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import card from '../../components/card'
import { UAParse, OSParse } from '../../utils/ua-parse'
export default {
  name: 'comments',

  data () {
    return {
      width: '48px', // text 宽度
      commentsData: [],
      keyword: '',
      currentPage: 1,
      total: 10,
      totalPage: '',
      type: [
        {
          name: '状态',
          typeName: 'state',
          list: [
            { name: '全部', id: '' },
            { name: '待审核', id: 0 },
            { name: '审核通过', id: 1 },
            { name: '审核不通过', id: 2 }
          ],
          default: { name: '全部' }
        }
      ],
      state: ''
    }
  },

  components: { card },

  methods: {
    UAParse,

    OSParse,

    changeType (e) {
      this.state = e.id
      this.getData()
    },

    async changeState (row, code) {
      const res = await this.$store.dispatch('patchComment', {
        _id: row._id,
        state: code,
        post_ids: row.post_id
      })
      if (res.code === 1) row.state = code
    },

    dele (row, index) {
      this.$confirm('确定删除此数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$store.dispatch('deleteComment', {
          _id: row._id,
          post_ids: row.post_id
        })
        if (res.code === 1) this.getData()
      }).catch(() => {})
    },

    pageChange (val) {
      this.currentPage = val
      this.getData()
    },

    async getData () {
      const res = await this.$store.dispatch('getComments', {
        current_page: this.currentPage,
        page_size: 20,
        keyword: this.keyword,
        state: this.state
      })
      if (res.code === 1) {
        this.total = res.result.pagination.total
        this.totalPage = res.result.pagination.total_page
        this.commentsData = [...res.result.data]
      }
    }
  },

  created () {
    this.getData()
  }
}
</script>

<style lang="scss">

@import '../../assets/scss/variable.scss';

.comments {

  >.el-card {
    margin-bottom: $normal-pad;
  }
}
</style>
