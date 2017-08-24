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
            placeholder="姓名，内容"
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
                <span>{{ props.row.place }}</span>
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
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="120"
          label-class-name="head">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
          label-class-name="head">
          <template scope="scope">
            <el-button type="success" size="small">通过</el-button>
            <el-button type="danger" size="small">不通过</el-button>
            <!-- <el-button type="danger" size="small">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
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

export default {
  name: 'heros',

  data () {
    return {
      width: '48px', // text 宽度
      total: 10,
      type: [
        {
          name: '状态',
          list: [
            { name: '全部', id: '-1' },
            { name: '待审核', id: '1' },
            { name: '审核通过', id: '2' },
            { name: '审核不通过', id: '3' }
          ],
          default: { name: '全部' }
        }
      ],
      tableData: [{
        name: 'jkchao',
        content: '想起来我的爱就不能停止,南京的雨不停地下不停地下,有些人却注定要相遇,你是一片光荣的叶子,落在我卑贱的心',
        github: 'https://github.com/jkchao',
        blog: 'https://github.com/jkchao',
        date: '2016-05-02',
        state: '审核通过',
        ip: '223.21.52.121',
        place: 'CNBeijing',
        bower: 'QQ浏览器 | 6.2',
        system: 'Android'
      }, {
        name: 'jkchao',
        content: '想起来我的爱就不能停止,南京的雨不停地下不停地下,有些人却注定要相遇,你是一片光荣的叶子,落在我卑贱的心',
        github: 'https://github.com/jkchao',
        blog: 'https://github.com/jkchao',
        date: '2016-05-02',
        state: '审核通过',
        ip: '223.21.52.121',
        place: 'CNBeijing',
        bower: 'QQ浏览器 | 6.2',
        system: 'Android'
      }, {
        name: 'jkchao',
        content: '想起来我的爱就不能停止,南京的雨不停地下不停地下,有些人却注定要相遇,你是一片光荣的叶子,落在我卑贱的心',
        github: 'https://github.com/jkchao',
        blog: 'https://github.com/jkchao',
        date: '2016-05-02',
        state: '审核通过',
        ip: '223.21.52.121',
        place: 'CNBeijing',
        bower: 'QQ浏览器 | 6.2',
        system: 'Android'
      }, {
        name: 'jkchao',
        content: '想起来我的爱就不能停止,南京的雨不停地下不停地下,有些人却注定要相遇,你是一片光荣的叶子,落在我卑贱的心',
        github: 'https://github.com/jkchao',
        blog: 'https://github.com/jkchao',
        date: '2016-05-02',
        state: '审核通过',
        ip: '223.21.52.121',
        place: 'CNBeijing',
        bower: 'QQ浏览器 | 6.2',
        system: 'Android'
      }, {
        name: 'jkchao',
        content: '想起来我的爱就不能停止,南京的雨不停地下不停地下,有些人却注定要相遇,你是一片光荣的叶子,落在我卑贱的心',
        github: 'https://github.com/jkchao',
        blog: 'https://github.com/jkchao',
        date: '2016-05-02',
        state: '审核通过',
        ip: '223.21.52.121',
        place: 'CNBeijing',
        bower: 'QQ浏览器 | 6.2',
        system: 'Android'
      }, {
        name: 'jkchao',
        content: '想起来我的爱就不能停止,南京的雨不停地下不停地下,有些人却注定要相遇,你是一片光荣的叶子,落在我卑贱的心',
        github: 'https://github.com/jkchao',
        blog: 'https://github.com/jkchao',
        date: '2016-05-02',
        state: '审核通过',
        ip: '223.21.52.121',
        place: 'CNBeijing',
        bower: 'QQ浏览器 | 6.2',
        system: 'Android'
      }, {
        name: 'jkchao',
        content: '想起来我的爱就不能停止,南京的雨不停地下不停地下,有些人却注定要相遇,你是一片光荣的叶子,落在我卑贱的心',
        github: 'https://github.com/jkchao',
        blog: 'https://github.com/jkchao',
        date: '2016-05-02',
        state: '审核通过',
        ip: '223.21.52.121',
        place: 'CNBeijing',
        bower: 'QQ浏览器 | 6.2',
        system: 'Android'
      }, {
        name: 'jkchao',
        content: '想起来我的爱就不能停止,南京的雨不停地下不停地下,有些人却注定要相遇,你是一片光荣的叶子,落在我卑贱的心',
        github: 'https://github.com/jkchao',
        blog: 'https://github.com/jkchao',
        date: '2016-05-02',
        state: '审核通过',
        ip: '223.21.52.121',
        place: 'CNBeijing',
        bower: 'QQ浏览器 | 6.2',
        system: 'Android'
      }, {
        name: 'jkchao',
        content: '想起来我的爱就不能停止,南京的雨不停地下不停地下,有些人却注定要相遇,你是一片光荣的叶子,落在我卑贱的心',
        github: 'https://github.com/jkchao',
        blog: 'https://github.com/jkchao',
        date: '2016-05-02',
        state: '审核通过',
        ip: '223.21.52.121',
        place: 'CNBeijing',
        bower: 'QQ浏览器 | 6.2',
        system: 'Android'
      }, {
        name: 'jkchao',
        content: '想起来我的爱就不能停止,南京的雨不停地下不停地下,有些人却注定要相遇,你是一片光荣的叶子,落在我卑贱的心',
        github: 'https://github.com/jkchao',
        blog: 'https://github.com/jkchao',
        date: '2016-05-02',
        state: '审核通过',
        ip: '223.21.52.121',
        place: 'CNBeijing',
        bower: 'QQ浏览器 | 6.2',
        system: 'Android'
      }],
      keyword: ''
    }
  },

  methods: {

    changeType () {},

    getData () {},

    pageChange (val) {
      console.log(val)
    }

  },

  components: { card }
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
