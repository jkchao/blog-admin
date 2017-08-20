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
            placeholder="标题、文章标签"
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
        <el-table-column
          prop="title"
          label="文章标题"
          :width="320"
          label-class-name="head"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="标签"
          width="180"
          label-class-name="head">
          <template scope="scope">
            <i class="iconfont icon-tag mar"></i>
            <span>
            {{ scope.row.tag }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="发布日期"
          width="180"
          label-class-name="head">
          <template scope="scope">
            <i class="iconfont icon-date mar"></i>
            <span>
            {{ scope.row.date }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="viewState"
          label="公开"
          label-class-name="head">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          label-class-name="head">
        </el-table-column>
        <el-table-column
          label="操作"
          width="250"
          label-class-name="head">
          <template scope="scope">
            <el-button @click="" type="info" size="small">查看</el-button>
            <el-button type="danger" size="small">删除</el-button>
            <el-button type="success" size="small">发布</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      tableData: [{
        title: '爱你就像爱生命,爱你就像爱生命,爱你就像爱生命,爱你就像爱生命',
        date: '2016-05-02',
        tag: 'Javascript',
        viewState: '公开',
        state: '发布'
      }, {
        title: '爱你就像爱生命',
        date: '2016-05-02',
        tag: 'Javascript',
        viewState: '公开',
        state: '发布'
      }, {
        title: '爱你就像爱生命',
        date: '2016-05-02',
        tag: 'Javascript',
        viewState: '公开',
        state: '发布'
      }, {
        title: '爱你就像爱生命',
        date: '2016-05-02',
        tag: 'Javascript',
        viewState: '公开',
        state: '发布'
      }],
      keyword: ''
    }
  },

  methods: {

    changeType () {},

    getData () {}

  },

  components: { card }
}
</script>

<style lang="scss">

@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';

.table {
  margin-top: $md-pad;
  padding: $normal-pad;
  background: $white;

  .head {
    background: #f2f2f2;
  }

  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background: #f2f2f2;
  }

}
</style>
