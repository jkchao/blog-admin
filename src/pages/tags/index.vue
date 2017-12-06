<template>
  <div class="tags">
    <div class="btn">
      <el-button size="small" @click="addTag" type="primary">增加标签</el-button>
      <div class="search">
        <el-input
          v-model="keyword"
          placeholder="name..."
          @keyup.enter.native="getData"
          icon="search"
          :on-icon-click="getData"
          size="small"></el-input>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="tagData"
        style="width: 100%">
        <el-table-column
          label="名称"
          width="160"
          label-class-name="head"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <i class="iconfont icon-tag mar"></i>
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column
          label="描述"
          min-width="320"
          label-class-name="head">
          <template slot-scope="scope">
            <i class="iconfont icon-descript mar"></i>
              {{ scope.row.descript }}
          </template>
        </el-table-column>
        <el-table-column
          prop="count"
          label="文章"
          width="80"
          label-class-name="head">
        </el-table-column>
        <el-table-column
          label="操作"
          width="240"
          label-class-name="head">
          <template slot-scope="scope">
            <el-button type="info" size="small" @click="edit(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="dele(scope.row)">删除</el-button>
            <el-button type="text" class="darg" size="small"><i class="iconfont icon-list"></i></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          :current-page="currentPage"
          layout="prev, pager, next"
          :page-size="16"
          @current-change="pageChange"
          :total="total">
        </el-pagination>
      </div>
    </div>

    <el-dialog 
      :title="title"
      :visible.sync="dialogV"
      size="tiny">
      <el-form :model="form" ref="form" v-if="dialogV">
        <el-form-item
          label="名称"
          prop="name"
          :rules="[
            { required: true, message: '名称', trigger: 'blur' }
          ]">
          <el-input v-model="form.name" :maxlength="20" placeholder="name"></el-input>
        </el-form-item>
        <el-form-item
          label="描述" 
          class="descript">
          <el-input 
            type="textarea" 
            v-model="form.descript" 
            :maxlength="100"
            :rows="3"
            placeholder="descript"></el-input>  
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogV = false">取 消</el-button>
        <el-button type="primary" @click="submit('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import Sortable from 'sortablejs'

export default {
  name: 'tags',

  data () {
    return {
      title: '增加标签',
      dialogV: false,
      sortable: null,
      tagData: [],
      list: [],
      form: {
        name: '',
        descript: ''
      },
      keyword: '',
      currentPage: 1,
      total: 10,
      totalPage: ''
    }
  },

  methods: {

    addTag () {
      this.dialogV = true
      this.title = '增加标签'
      this.form = Object.assign({}, {
        name: '',
        descript: ''
      })
    },

    edit (row) {
      this.title = '修改标签'
      this.dialogV = true
      this.form = { ...row }
    },

    dele (row, index) {
      this.$confirm('确定删除此数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$store.dispatch('deleteTag', { _id: row._id })
        if (res.code === 1) this.getData()
      }).catch(() => {})
    },

    submit (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res
          if (this.form._id) {
            res = await this.$store.dispatch('putTag', {
              _id: this.form._id,
              name: this.form.name,
              descript: this.form.descript
            })
          } else res = await this.$store.dispatch('postTag', { ...this.form })
          if (res.code === 1) {
            this.dialogV = false
            this.getData()
          }
        } else return false
      })
    },

    pageChange (val) {
      this.currentPage = val
      this.getData()
    },

    async getData () {
      const res = await this.$store.dispatch('getTag', {
        current_page: this.currentPage,
        page_size: 16,
        keyword: this.keyword
      })
      if (res.code === 1) {
        this.total = res.result.pagination.total
        this.totalPage = res.result.pagination.total_page
        this.tagData = [...res.result.list]
        this.list = this.tagData.map(item => item._id)
        this.$nextTick(() => {
          this.setSort()
        })
      }
    },

    setSort () {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        animation: 150,
        // handle: '.drag-handler',
        onEnd: evt => {
          const tempIndex = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, tempIndex)
          this.$store.dispatch('patchTag', {
            ids: this.list
          })
        }
      })
    }
  },

  created () {
    this.getData()
  }

  // mounted () {
  //   this.setSort()
  // }
}
</script>

<style scoped lang="scss">

@import '../../assets/scss/variable.scss';

.tags {

  >.btn {
    display: flex;
    justify-content: space-between;
    padding: 1rem 1rem 0;
    background: $white;

    >.search {
      display: flex;

    }
  }

  .darg {
    cursor: move;
  }
}
</style>
