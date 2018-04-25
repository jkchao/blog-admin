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
            size="small">查询</el-button>
        </div>
      </div>
    </card>

    <div class="table">
      <el-table
        :data="list"
        style="width: 100%"
        v-loading="fetch"
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
                <span v-html="osParse(props.row.agent)"></span>
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
          min-width="120px"
          label-class-name="head"
          show-overflow-tooltip>
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
          width="280"
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
              <el-button 
                type="danger" 
                size="small" 
                key="3"
                @click="deleteHero(scope.row)"
                :disabled="scope.row.deleteing">{{ scope.row.deleteing ? '删除中' : '删 除' }}</el-button>
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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { UAParse, osParse } from '@/utils/ua-parse'
import Card from '@/components/Card.vue'

interface Iitem {
  name: string,
  id: number | string
}

interface IList {
  name: string,
  typeName: string,
  list: Iitem[],
  default: string
}

@Component({
  components: { Card }
})
export default class Heros extends Vue {
  private width: string = '48px'
  private type: IList[] = [
    {
      name: '状态',
      typeName: 'state',
      list: [
        { name: '全部', id: '' },
        { name: '待审核', id: 0 },
        { name: '审核通过', id: 1 },
        { name: '审核不通过', id: 2 }
      ],
      default: ''
    }
  ]
  private state: StoreState.State
  private keyword: string = ''
  private currentPage: number = 1

  private get fetch (): boolean {
    return this.$store.state.hero.fetch
  }
  private get list (): StoreState.Hero[] {
    return this.$store.state.hero.list
  }
  private get total (): number {
    return this.$store.state.hero.total
  }

  private UAParse (e: string): string {
    return UAParse(e)
  }

  private osParse (e: string): string {
    return osParse(e)
  }

  // 筛选类型
  private changeType (e: any): void {
    this.state = e.id
    this.getData()
  }

  // 改变状态
  private async changeState (row: StoreState.Hero, code: number): Promise<void> {
    await this.$store.dispatch('hero/patchHero', {
      _id: row._id,
      state: code
    })
  }

  // 删除
  private deleteHero (row: StoreState.Hero): void {
    this.$confirm('确定删除此数据吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const res = await this.$store.dispatch('hero/deleteHero', { _id: row._id })
      if (res.code === 1) this.getData()
    }).catch(error => console.error(error))
  }

  // 分页
  private pageChange (val: number): void {
    this.currentPage = val
    this.getData()
  }

  // 获取数据
  private getData (): void {
    this.$store.dispatch('hero/getHeros', {
      current_page: this.currentPage,
      page_size: 16,
      keyword: this.keyword,
      state: this.state
    })
  }

  private beforeCreate (): void {
    this.$store.dispatch('hero/getHeros', {
      current_page: 1,
      page_size: 16
    })
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
