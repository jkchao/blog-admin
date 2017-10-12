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
            <el-form label-position="left" class="table-expand">
              <el-form-item label="标签">
                <span v-for="item in props.row.tag" :key="item._id" style="margin-right: 10px;">{{ item.name }}</span>
              </el-form-item>
              <el-form-item label="关键字">
                <span>{{ props.row.keyword }}</span>
              </el-form-item>
              <el-form-item label="描述">
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
            <a :href="`https://jkchao.cn/article/${scope.row._id}`" class="article-link">{{ scope.row.title }}</a>
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
          width="250"
          label-class-name="head"
          fixed="right">
          <template scope="scope">
            <transition-group name="list" tag="span">
              <el-button type="info" size="small" key="1" @click="edit(scope.row)">修改</el-button>
              <el-button type="danger" size="small" key="2" v-if="scope.row.publish === 1"  @click="changeState(scope.row, 'publish', 2)">私密</el-button>
              <el-button type="success" size="small" key="3" v-else  @click="changeState(scope.row, 'publish', 1)">公开</el-button>
              <el-button type="success" size="small" key="4" v-if="scope.row.state === 2" @click="changeState(scope.row, 'state', 1)">发布</el-button>
              <el-button type="danger" size="small" key="5" v-else  @click="changeState(scope.row, 'state', 2)">草稿</el-button>
              <el-button type="danger" size="small" key="6" v-if="scope.row.state === 2" @click="dele(scope.row)">删除</el-button>
            </transition-group>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          :current-page="currentPage"
          layout="total, prev, pager, next"
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
          typeName: 'tag',
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
          typeName: 'type',
          list: [
            { name: '全部', id: '-1' },
            { name: 'Code', id: '1' },
            { name: 'Think', id: '2' }
          ],
          default: { name: '全部' }
        },
        {
          name: '公开',
          typeName: 'publish',
          list: [
            { name: '全部', id: '-1' },
            { name: '公开', id: '1' },
            { name: '私密', id: '2' }
          ],
          default: { name: '全部' }
        },
        {
          name: '状态',
          typeName: 'state',
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
        { tag: '' },
        { type: '' },
        { publish: '' },
        { state: '' }
      ],
      keyword: '',
      currentPage: 1,
      total: 10,
      totalPage: ''
    }
  },

  methods: {

    changeType (e) {
      this.para[e.typeName] = e.id
      this.getData()
    },

    edit (row) {
      this.$router.push(`/article/release?id=${row._id}`)
    },

    async changeState (row, type, code) {
      const querys = {}
      querys._id = row._id
      querys[type] = code
      const res = await this.$store.dispatch('patchArt', {...querys})
      console.log(res)
      if (res) row[type] = code
    },

    dele (row, index) {
      this.$confirm('确定删除此文章吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$store.dispatch('deleteArt', { _id: row._id })
        if (res.code === 1) this.getData()
      }).catch(() => {})
    },

    async getData () {
      const res = await this.$store.dispatch('getArts', {
        ...this.para,
        keyword: this.keyword
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

<style lang="scss" >

@import '../../assets/scss/variable.scss';

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
  }

  .article-link {
    text-decoration: underline;
  }
}
</style>
