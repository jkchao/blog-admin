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
            @keyup.enter.native="getData"></el-input>
          <el-button
            type="primary"
            @click.native="getData"><i class="iconfont icon-search mar"></i>查询</el-button>
        </div>
      </div>
    </card>

    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        >
        <el-table-column type="expand" label-class-name="head">
          <template scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="IP：">
                <span>{{ props.row.ip }}</span>
              </el-form-item>
              <el-form-item label="地址：">
                <span>{{props.row.country}}{{ props.row.city }}</span>
              </el-form-item>
              <el-form-item label="浏览器：">
                <span>{{ props.row.bower }}</span>
              </el-form-item>
              <el-form-item label="系统：">
                <span>{{ props.row.system }}</span>
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
          <template scope="scope">
            <a :href="scope.row.github" target="_blank"><i class="iconfont icon-github mar"></i> {{ scope.row.github }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="blog"
          label="Blob"
          min-width="240"
          label-class-name="head"
          show-overflow-tooltip>
          <template scope="scope">
            <a :href="scope.row.blog" target="_blank"><i class="iconfont icon-boke mar"></i> {{ scope.row.blog }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="160"
          label-class-name="head">
          <template scope="scope">
            <i class="iconfont icon-date mar"></i>
            {{ scope.row.create_time | format('yyyy-MM-dd')}}
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
          width="220"
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

      <div class="pagination" v-if="totalPage > 1">
        <el-pagination
          :current-page="currentPage"
          layout="prev, pager, next"
          :page-size="6"
          @current-change="pageChange"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import card from '../../components/card'
import server from '../../utils/axios'
import { error, success } from '../../api/response'
export default {
  name: 'heros',

  data () {
    return {
      width: '48px', // text 宽度
      total: 10,
      totalPage: '',
      type: [
        {
          name: '状态',
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
      currentPage: 1
    }
  },

  methods: {

    changeType (e) {
      this.state = e.id
      this.getData()
    },

    async changeState (row, code) {
      const { data } = await server.patch('/hero', {
        _id: row._id,
        state: code
      })
      if (data.code !== 1) error(data.message)
      else row.state = code
    },

    dele (row, index) {
      this.$confirm('确定删除此数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await server.delete(`/hero/${row._id}`)
        if (data.code !== 1) error(data.message)
        else {
          this.tableData.splice(index, 1)
          success(data.message)
        }
      }).catch(() => {})
    },

    async getData () {
      const { data } = await server.get(`/hero?` +
                      `current_page=${this.currentPage}&page_size=10` +
                      `&keyword=${this.keyword}&state=${this.state}`)
      if (data.code !== 1) error(this, data.message, 2000)
      else {
        this.total = data.result.pagination.total
        this.totalPage = data.result.pagination.total_page
        this.tableData = [...data.result.list]
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
@import '../../assets/scss/mixin.scss';

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
