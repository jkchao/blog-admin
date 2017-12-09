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
        style="width: 100%"
        v-loading="fetch">
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
            <el-button type="info" size="small" @click="editTag(scope.row)">修改</el-button>
            <el-button 
              type="danger"
              size="small"
              @click="deleteTag(scope.row)"
              :disabled="scope.row.deleteing">{{ scope.row.deleteing ? '删除中' : '删 除' }}</el-button>
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
      size="tiny"
      width="460px">
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
        <el-button type="primary" @click="submit('form')" :disabled="posting">
          {{ posting ? '提交中' : '确 定'}}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as Sortable from 'sortablejs'

import { error } from '../../utils/response'

@Component
export default class Tags extends Vue {
  private title: string = '增加标签'
  private dialogV: boolean = false
  private sortable: any = null
  private form: StoreState.Tag = {
    name: '',
    descript: ''
  }
  private keyword: string = ''
  private currentPage: number = 1

  private get fetch (): boolean {
    return this.$store.state.tag.fetch
  }
  private get posting (): boolean {
    return this.$store.state.tag.posting
  }
  private get total (): number {
    return this.$store.state.tag.total
  }
  private get tagData (): StoreState.Tag[] {
    return this.$store.state.tag.list
  }
  private get list () :Array<string>{
    return this.tagData.map((item: StoreState.Tag) => item._id) as Array<string>
  }

  // 添加标签
  private addTag (): void {
    this.title = '添加标签'
    this.form = Object.assign({}, {
      name: '',
      descript: ''
    })
    this.dialogV = true
  }

  // 修改标签
  private editTag (row: StoreState.Tag) :void {
    this.title = '修改标签'
    this.form = { ...row }
    this.dialogV = true
  }

  // 删除标签
  private deleteTag (row: StoreState.Tag): void {
    this.$confirm('确定删除此数据吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () : Promise<void> => {
      const res = await this.$store.dispatch('tag/deleteTag', { _id: row._id })
      if (res.code === 1) this.getData()
    }).catch(() => {})
  }

  // 表单提交
  private submit (formName: string) {
    (this.$refs[formName] as HTMLFormElement).validate(async (valid: boolean): Promise<boolean> => {
      if (valid) {
        let actionName: string
        let params: StoreState.Tag
        if (this.form._id) {
          actionName = 'tag/putTag'
          params = Object.assign({}, {
            _id: this.form._id,
            name: this.form.name,
            descript: this.form.descript
          })
        } else {
          actionName = 'tag/postTag'
          params = { ...this.form }
        }
        let res: Ajax.AjaxResponse = await this.$store.dispatch(actionName, params)
        if (res.code === 1) {
          this.dialogV = false
          this.getData()
        }
        return true
      } else return false
    })
  }

  // 分页
  private pageChange (val: number): void {
    this.currentPage = val
    this.getData()
  }

  // 获取数据
  private async getData (): Promise<void> {
    const res: Ajax.AjaxResponse = await this.$store.dispatch('tag/getTags', {
      current_page: this.currentPage,
      page_size: 16,
      keyword: this.keyword
    })
    if (res.code === 1) {
      this.$nextTick(() => {
        this.setSort()
      })
    }
  }

  // 标签排序
  private setSort (): void {
    const el: Element = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
    this.sortable = Sortable.create(el, {
      animation: 150,
      // handle: '.drag-handler',
      onEnd: (evt: any) => {
        const tempIndex = this.list.splice(evt.oldIndex, 1)[0]
        this.list.splice(evt.newIndex, 0, tempIndex)
        this.$store.dispatch('tag/patchTag', {
          ids: this.list
        })
      }
    })
  }

  created (): void {
    this.getData()
  }
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
