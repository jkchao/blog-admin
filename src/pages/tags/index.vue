<template>
  <div class="tags">
    <div class="btn">
      <el-button size="small" @click="addTag">增加标签</el-button>
      <div class="search">
        <el-input
          v-model="keyword"
          placeholder="name..."
          @keyup.enter.native="getData"
          icon="search"
          :on-icon-click="getData"></el-input>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="tagData"
        style="width: 100%"
        border>
        <el-table-column
          prop="title"
          label="名称"
          width="160"
          label-class-name="head"
          show-overflow-tooltip>
          <template scope="scope">
              {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column
          label="描述"
          min-width="320"
          label-class-name="head">
          <template scope="scope">
            <i class="iconfont icon-tag mar"></i>
              {{ scope.row.descript }}
          </template>
        </el-table-column>
        <el-table-column
          prop="articleNum"
          label="文章"
          width="180"
          label-class-name="head">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
          label-class-name="head">
          <template scope="scope">
            <el-button type="info" size="small">修改</el-button>
            <el-button type="danger" size="small">删除</el-button>
            <el-button type="text" class="darg"><i class="iconfont icon-list"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog 
      title="添加标签"
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
      dialogV: false,
      sortable: null,
      total: 10,
      tagData: [],
      form: {
        name: '',
        descript: ''
      },
      keyword: ''
    }
  },

  methods: {
    pageChange () {},

    addTag () {
      this.dialogV = true
      this.form = Object.assign({}, {
        name: '',
        descript: ''
      })
    },

    submit (formName) {
      console.log(formName)
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('success')
        } else return false
      })
    },

    getData () {},

    setSort () {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        animation: 150,
        // handle: '.drag-handler',
        onEnd: evt => {
          // const tempIndex = this.tableData.splice(evt.oldIndex, 1)[0]
          // this.tableData.splice(evt.newIndex, 0, tempIndex)
        }
      })
    }
  },

  mounted () {
    this.setSort()
  }
}
</script>

<style scoped lang="scss">

@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';

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
