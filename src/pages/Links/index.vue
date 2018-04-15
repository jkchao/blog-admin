<template>
  <div class="link">

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
            placeholder="name..."
            @keyup.enter.native="getData"
            size="small"></el-input>
          <el-button
            type="primary"
            @click.native="getData"
            size="small">查询</el-button>
        </div>
      </div>
    </card>

    <div class="btn">
      <el-button size="small" @click="addLink" type="primary">增加友链</el-button>
    </div>

    <div class="table">
      <el-table
        :data="linkData"
        style="width: 100%"
        v-loading="fetch">
        <el-table-column
          prop="id"
          label="编号"
          width="80"
          label-class-name="head">
        </el-table-column>
        <el-table-column
          label="名称"
          prop="name"
          width="160"
          label-class-name="head"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="url"
          min-width="320"
          label-class-name="head">
          <template slot-scope="scope">
              {{ scope.row.url }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="280"
          label-class-name="head">
          <template slot-scope="scope">

            <transition-group name="btn" tag="div">
              <el-button type="info" size="small" @click="editLink(scope.row)" key="1">修改</el-button>
              <el-button
                type="danger"
                size="small"
                @click="deleteLink(scope.row)"
                :disabled="scope.row.deleteing"
                key="4">{{ scope.row.deleteing ? '删除中' : '删 除' }}</el-button>
            </transition-group>
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
      <el-form
        :model="form"
        ref="form"
        v-if="dialogV" 
        label-width="60px">
        <el-form-item
          label="名称"
          prop="name"
          :rules="[
            { required: true, message: '名称', trigger: 'blur' }
          ]">
          <el-input v-model="form.name" :maxlength="20" placeholder="name"></el-input>
        </el-form-item>

        <el-form-item
          label="URL" 
          class="descript">
          <el-input
            type="textarea" 
            v-model="form.url" 
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

import { error } from '@/utils/response'
import Card from '@/components/Card.vue'
interface Item {
  name: string,
  id: number | string
}

@Component({
  components: { Card }
})
export default class Links extends Vue {
  private width: string = '48px'
  private percent: number = 0
  private title: string = '增加友链'
  private dialogV: boolean = false
  private form: StoreState.Link = {
    name: '',
    url: ''
  }
  private type = []
  private state: StoreState.State
  private keyword: string = ''
  private currentPage: number = 1

  private get fetch (): boolean {
    return this.$store.state.link.fetch
  }
  private get posting (): boolean {
    return this.$store.state.link.posting
  }
  private get total (): number {
    return this.$store.state.link.total
  }
  private get linkData (): StoreState.Link[] {
    return this.$store.state.link.list
  }

  // 筛选类型
  private changeType (e: any): void {
    this.state = e.id
    this.getData()
  }

  // 改变状态
  private async changeState (
    row: StoreState.Link,
    code: StoreState.State
  ): Promise<void> {
    await this.$store.dispatch('link/patchLink', {
      _id: row._id,
      state: code
    })
  }

  // 添加友链
  private addLink (): void {
    this.title = '添加友链'
    this.form = Object.assign({}, {
      name: '',
      url: ''
    })
    this.dialogV = true
  }

  // 修改友链
  private editLink (row: StoreState.Link): void {
    this.title = '修改友链'
    this.form = { ...row }
    this.dialogV = true
  }

  // 删除友链
  private deleteLink (row: StoreState.Link): void {
    this.$confirm('确定删除此数据吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async (): Promise<void> => {
      const res = await this.$store.dispatch('link/deleteLink', { _id: row._id })
      if (res.code === 1) this.getData()
    }).catch(error => console.error(error))
  }

  // 表单提交
  private submit (formName: string) {
    (this.$refs[formName] as HTMLFormElement).validate(async (valid: boolean): Promise<boolean> => {
      if (valid) {
        let actionName: string
        let params: StoreState.Link
        if (this.form._id) {
          actionName = 'link/putLink'
          params = Object.assign({}, {
            _id: this.form._id,
            name: this.form.name,
            url: this.form.url
          })
        } else {
          actionName = 'link/postLink'
          params = { ...this.form }
        }
        const res: Ajax.AjaxResponse = await this.$store.dispatch(actionName, params)
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
    const res: Ajax.AjaxResponse = await this.$store.dispatch('link/getLinks', {
      current_page: this.currentPage,
      page_size: 16,
      keyword: this.keyword,
      state: this.state
    })
  }

  private async created (): Promise<void> {
    await Promise.all([
      // 标签列表
      this.$store.dispatch('link/getLinks', {
        current_page: 1,
        page_size: 16
      })
    ])
  }
}
</script>

<style scoped lang="scss">

@import '../../assets/scss/variable.scss';

.link {

  >.el-card {
    margin-bottom: $normal-pad;
  }

  >.btn {
    padding: $normal-pad $normal-pad 0;
    background: $white;
  }
}
</style>
