<template>
  <div class="article">
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
            placeholder="标题，描述"
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
              <el-form-item label="描述：">
                <span>{{ props.row.descript }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="文章标题"
          :width="280"
          label-class-name="head"
          show-overflow-tooltip>
          <template scope="scope">
              {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column
          label="标签"
          width="180"
          label-class-name="head"
          show-overflow-tooltip>
          <template scope="scope">
            <i class="iconfont icon-tag mar"></i>
            <span v-for="item in scope.row.tag" :key="item._id">{{ item.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="发布日期"
          width="180"
          label-class-name="head">
          <template scope="scope">
            {{ scope.row.create_at | format('yyyy-MM-dd hh.mm')}}
          </template>
        </el-table-column>
        <el-table-column
          label="分类"
          label-class-name="head">
          <template scope="scope">
            {{ 
                scope.row.type === 1
                ? 'Code'
                : 'Think'
             }}
          </template>
        </el-table-column>
        <el-table-column
          label="公开"
          label-class-name="head">
          <template scope="scope">
            {{ 
                scope.row.publish === 1
                ? '公开'
                : '私密'
             }}
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          label-class-name="head">
          <template scope="scope">
            {{ 
                scope.row.state === 1
                ? '发布'
                : '草稿'
             }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="280"
          label-class-name="head"
          fixed="right">
          <template scope="scope">
            <el-button type="info" size="small">查看</el-button>
            <el-button type="success" size="small" v-if="scope.row.state === 2">发布</el-button>
            <el-button type="danger" size="small" v-else>草稿</el-button>
            <el-button type="success" size="small" v-if="scope.row.publish === 1">私密</el-button>
            <el-button type="danger" size="small" v-else>发布</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination" v-if="totalPage > 1">
        <el-pagination
          :current-page="currentPage"
          layout="prev, pager, next"
          :page-size="10"
          @current-change="pageChange"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import card from '../../components/card'

export default {
  name: 'article',

  data () {
    return {
      width: '48px', // text 宽度
      type: [
        {
          name: '标签',
          list: [
            { name: '全部', id: '-1' },
            { name: 'Javascript', id: '1' },
            { name: 'Vue', id: '2' },
            { name: 'Http', id: '3' }
          ],
          default: { name: '全部' }
        },
        {
          name: '分类',
          list: [
            { name: '全部', id: '-1' },
            { name: 'Code', id: '1' },
            { name: 'Think', id: '2' }
          ],
          default: { name: '全部' }
        },
        {
          name: '公开',
          list: [
            { name: '全部', id: '-1' },
            { name: '公开', id: '1' },
            { name: '私密', id: '2' }
          ],
          default: { name: '全部' }
        },
        {
          name: '状态',
          list: [
            { name: '全部', id: '-1' },
            { name: '已发布', id: '1' },
            { name: '草稿', id: '2' }
          ],
          default: { name: '全部' }
        }
      ],
      tableData: [],
      para: [
        { name: '标签', id: '' },
        { name: '分类', id: '' },
        { name: '公开', id: '' },
        { name: '状态', id: '' }
      ],
      keyword: '',
      currentPage: 1,
      total: 10,
      totalPage: ''
    }
  },

  methods: {

    changeType (e) {
      this.para.forEach(item => {
        if (item.name === e.name) item.id = e.id
      })
      this.getData()
    },

    async getData () {
      const res = await this.$store.dispatch('getArt', {
        tag: this.para[0].id,
        type: this.para[1].id,
        publish: this.para[2].id,
        state: this.para[3].id,
        keyword: this.keyword
      })
      if (res.code === 1) {
        console.log(res)
        this.total = res.result.pagination.total
        this.totalPage = res.result.pagination.total_page
        this.tableData = [...res.result.list]
      }
      console.log(res)
    },

    pageChange (val) {
      console.log(val)
    }

  },

  async created () {
    // 标签列表
    const res = await this.$store.dispatch('getTag', {
      current_page: 1,
      page_size: 16,
      keyword: this.keyword
    })
    if (res.code === 1) {
      this.type[0].list = [{ name: '全部', id: '' }, ...res.result.list.map(item => ({ name: item.name, id: item._id }))]
    }

    this.getData()
  },

  components: { card }
}
</script>

<style lang="scss" scoped>

@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';

.article {
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
}
</style>
