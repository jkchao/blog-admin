<template>
  <div class="tags">
    <div class="btn">
      <el-button size="small">增加标签</el-button>
      <div class="search">
        <el-input
          v-model="keyword"
          placeholder="title..."
          @keyup.enter.native="getData"
          icon="search"
          :on-icon-click="getData"></el-input>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
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
  </div>
</template>

<script>
import Sortable from 'sortablejs'

export default {
  name: 'tags',

  data () {
    return {
      sortable: null,
      total: 10,
      tableData: [{
        title: 'Jacascript',
        descript: '1',
        articleNum: 10
      }, {
        title: 'Jacascript',
        descript: '2',
        articleNum: 10
      }, {
        title: 'Jacascript',
        descript: '3',
        articleNum: 10
      }, {
        title: 'Jacascript',
        descript: '4',
        articleNum: 10
      }, {
        title: 'Jacascript',
        descript: '5',
        articleNum: 10
      }, {
        title: 'Jacascript',
        descript: '6',
        articleNum: 10
      }, {
        title: 'Jacascript',
        descript: '7',
        articleNum: 10
      }, {
        title: 'Jacascript',
        descript: '8',
        articleNum: 10
      }, {
        title: 'Jacascript',
        descript: '9',
        articleNum: 10
      }, {
        title: 'Jacascript',
        descript: '1231',
        articleNum: 10
      }],
      keyword: ''
    }
  },

  methods: {
    pageChange () {},

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
