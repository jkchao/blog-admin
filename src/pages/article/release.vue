<template>
  <div class="release">
  <el-form
    :model="form"
    label-width="100px"
    label-position="left"
    ref="form">
    <el-col :span="16">
        <el-form-item 
          label="文章标题"
          prop="title"
          :rules="[
            { required: true, message: '请输入文章标题', trigger: 'blur' }
          ]">
          <el-input v-model="form.title" :maxlength="20" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item
          label="文章关键字"
          prop="keyword"
          :rules="[
            { required: true, message: '请输入文章关键字', trigger: 'blur' }
          ]">
          <el-input v-model="form.keyword" :maxlength="20" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item 
          label="文章标签"
          prop="tag"
          :rules="[
            { required: true, type: 'array', message: '请选择文章标签', trigger: '' }
          ]">
          <el-checkbox-group v-model="form.tag" fill="#324057" text-color="white">
            <el-checkbox-button
              v-for="item in tags"
              :label="item._id"
              :key="item._id">{{ item.name }}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item 
          label="文章描述"
          prop="descript"
          :rules="[
            { required: true, message: '请输入文章描述', trigger: 'blur' }
          ]">
          <el-input 
            v-model="form.descript" 
            :maxlength="200" 
            type="textarea"
            :rows="4"></el-input>
        </el-form-item>
        <el-form-item 
          label="文章内容"
          prop="content"
          :rules="[
            { required: true, message: '请输入文章内容', trigger: 'blur, change' }
          ]"
          class="markdown">
          <markdown-editor 
            v-model="form.content" 
            ref="markdownEditor"
            :configs="configs"
            preview-class="markdown-body"></markdown-editor>
        </el-form-item>
        <el-form-item style="margin-bottom: 0">
           <el-button @click="submitForm('form')">{{ id ? '修改' : '发布' }}</el-button>
        </el-form-item>

    </el-col>

      <el-col :span="8" class="right">
        <div class="right-form">
          <el-form-item label="文章分类" label-width="90px" style="margin-bottom: 10px;">
            <el-radio-group v-model="form.type">
              <el-radio :label="1">Code</el-radio>
              <el-radio :label="2">Think</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="文章状态" label-width="90px" style="margin-bottom: 10px;">
            <el-radio-group v-model="form.state">
              <el-radio :label="1">发布</el-radio>
              <el-radio :label="0">草稿</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="文章公开" label-width="90px" style="margin-bottom: 10px;">
            <el-radio-group v-model="form.publish">
              <el-radio :label="1">公开</el-radio>
              <el-radio :label="0">私密</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="right-form" style="margin-top: 24px;">
          <el-form-item 
            label="缩略图" 
            label-width="90px" 
            class="img-item"
            prop="thumb"
              :rules="[
                { required: true, message: '请上传图片', trigger: 'change' }
              ]">
              <el-upload
                class="avatar-uploader"
                action="http://upload.qiniu.com/"
                :data="qn"
                :show-file-list="false"
                :on-success="handleSuccess"
                :before-upload="beforeUpload"
                :on-progress="handlePro"
                :on-error="handleError">
                <img v-if="form.thumb" :src="form.thumb" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-progress :percentage="percent" v-if="percent !== 0 && percent !== 100"></el-progress>
          </el-form-item>
        </div>

      </el-col>
    </el-form>
  </div>
</template>

<script>

import { markdownEditor } from 'vue-simplemde'
// import 'github-markdown-css'
require.ensure([], () => require('github-markdown-css'), 'markdown-style')

import { error } from '../../utils/response'

export default {
  name: 'release',

  components: {
    markdownEditor
  },

  data () {
    return {
      configs: {
        status: false, // 禁用底部状态栏
        spellChecker: false,
        initialValue: '', // 设置初始值
        renderingConfig: {
          codeSyntaxHighlighting: true, // 开启代码高亮
          highlightingTheme: 'atom-one-light' // 自定义代码高亮主题，可选列表(https://github.com/isagalaev/highlight.js/tree/master/src/styles)
        }
      },
      id: '',
      fileList: [],
      form: {
        title: '',
        keyword: '',
        descript: '',
        tag: [],
        content: '',
        publish: 1,
        state: 1,
        type: 1,
        thumb: ''
      },
      qn: {
        token: '',
        key: ''
      },
      percent: 0,
      ops: [
        { name: '发布', id: 1 },
        { name: '保存草稿', id: 2 }
      ],
      tags: []
    }
  },

  methods: {
    handleSuccess (res, file) {
      this.form.thumb = 'http://ovshyp9zv.bkt.clouddn.com/' + this.qn.key
    },

    handlePro (e, file, fileList) {
      this.percent = ~~e.percent
    },

    handleError (res) {
      error(this, res.error, 2000)
    },

    beforeUpload (file) {
      this.qn.key = file.name
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isJPG && isLt10M
    },

    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res
          console.log(this.form)
          if (!this.form._id) res = await this.$store.dispatch('postArt', { ...this.form })
          else res = await this.$store.dispatch('putArt', { ...this.form })
          if (res.code === 1) this.$router.push('/article/index')
        } else {
          return false
        }
      })
    }
  },

  beforeRouteUpdate (to, from, next) {
    this.id = ''
    this.form = {
      title: '',
      keyword: '',
      descript: '',
      tag: [],
      content: '',
      publish: 1,
      state: 1,
      type: 1,
      thumb: ''
    }
    next()
  },

  async created () {
    // 标签列表
    const res = await this.$store.dispatch('getTag', {
      current_page: this.currentPage,
      page_size: 16,
      keyword: this.keyword
    })
    if (res.code === 1) {
      this.tags = res.result.list.map(item => ({ name: item.name, _id: item._id }))
    }

    // 七牛token
    const qn = await this.$store.dispatch('getQiniu')
    if (qn.code === 1) this.qn.token = qn.result.token

    // 文章详情
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      const { result: content } = await this.$store.dispatch('getArt', { _id: this.id })
      if (content) {
        this.form = Object.assign({}, {
          ...content,
          tag: content.tag.map(item => item._id)
        })
      }
    }
  }
}
</script>

<style lang="scss">

@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';

.release {
  margin-bottom: $lg-pad;

  >.el-form {
    display: flex;
    justify-content: space-between;

    >.el-col:first-child {
      background: $white;
      padding: $lg-pad;

      >.btn {
        text-align: right;
      }
    }

    .right {
      margin-left: 24px;

      .right-form {
        padding: $lg-pad;
        background: $white;

        label {
          line-height: 1
        }

        .img-item {
          display: flex;
          flex-wrap: wrap;

          >.el-form-item__content {
            margin: $normal-pad 0 0 0!important;
            width: 100%;
            text-align: center;
          }
        }
      }
    }

    .markdown {

      .el-form-item__content {
         line-height: 1.4;
      }

      .markdown-editor .CodeMirror {
        height: 400px;
      }
    }
  }
}
</style>
