<template>
  <div class="heros">
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
            placeholder="姓名"
            @keyup.enter.native="getData"
            size="small"></el-input>
          <el-button
            type="primary"
            @click.native="getData"
            size="small"><i class="iconfont icon-search mar"></i>查询</el-button>
        </div>
      </div>
    </card>

    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        >
        <el-table-column type="expand" label-class-name="head">
          <template slot-scope="props">
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
              <el-form-item label="email：">
                <span>{{props.row.email || ''}}</span>
              </el-form-item>
              <el-form-item label="blog：">
                <span>
                  <a :href="props.row.blog" target="_blank">{{ props.row.blog }}</a>
                </span>
              </el-form-item>
              <el-form-item label="内容：">
                <span>{{ props.row.content }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120px"
          label-class-name="head"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="Github"
          min-width="240"
          label-class-name="head"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <a :href="scope.row.github" target="_blank"><i class="iconfont icon-github mar"></i> {{ scope.row.github }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="160"
          label-class-name="head">
          <template slot-scope="scope">
            <i class="iconfont icon-date mar"></i>
            {{ scope.row.create_time | format('yyyy-MM-dd')}}
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="120"
          label-class-name="head">
          <template slot-scope="scope">
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
          width="220"
          label-class-name="head"
          fixed="right">
          <template slot-scope="scope">
            <transition-group tag="span" name="btn">
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
          :page-size="16"
          @current-change="pageChange"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { UAParse, OSParse } from '../../utils/ua-parse'
import card from '../../components/card'
export default {
  name: 'heros',

  data () {
    return {
      width: '48px', // text 宽度
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
      tableData: [],
      keyword: '',
      state: '',
      currentPage: 1,
      total: 10,
      totalPage: ''
    }
  },

  methods: {
    UAParse,

    OSParse,

    changeType (e) {
      this.state = e.id
      this.getData()
    },

    async changeState (row, code) {
      const res = await this.$store.dispatch('patchHero', {
        _id: row._id,
        state: code
      })
      if (res.code === 1) row.state = code
    },

    dele (row, index) {
      this.$confirm('确定删除此数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$store.dispatch('deleteHero', { _id: row._id })
        if (res.code === 1) this.getData()
      }).catch(() => {})
    },

    async getData () {
      const res = await this.$store.dispatch('getHero', {
        current_page: this.currentPage,
        page_size: 16,
        keyword: this.keyword,
        state: this.state
      })
      if (res.code === 1) {
        this.total = res.result.pagination.total
        this.totalPage = res.result.pagination.total_page
        this.tableData = [...res.result.list]
      }
    },

    pageChange (val) {
      this.currentPage = val
      this.getData()
    }

  },

  components: { card },

  created () {
    this.getData()
  }
}
</script>

<style lang="scss">

@import '../../assets/scss/variable.scss';

.heros {
  height: 100%;

  >.el-card {
    margin-bottom: $normal-pad;
  }

  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 70px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 40%;
  }

  .table-expand .el-form-item:last-child {
    width: 100%;
  }
}
</style>
