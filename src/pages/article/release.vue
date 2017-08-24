<template>
  <div class="release">
  <el-form
    :model="form"
    label-width="100px"
    label-position="left"
    ref="form">
    <el-col :span="16">

        <el-form-item 
          label="文章标题：" 
          prop="title"
          :rules="[
            { required: true, message: '请输入文章标题', trigger: 'blur' }
          ]">
          <el-input v-model="form.title" :maxlength="20" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item 
          label="文章关键字："
          prop="keyword"
          :rules="[
            { required: true, message: '请输入文章关键字', trigger: 'blur' }
          ]">
          <el-input v-model="form.keyword" :maxlength="20" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item 
          label="文章描述："
          prop="descript"
          :rules="[
            { required: true, message: '请输入文章描述', trigger: 'blur' }
          ]">
          <el-input 
            v-model="form.descript" 
            :maxlength="20" 
            type="textarea"
            :rows="4"></el-input>
        </el-form-item>
        <el-form-item 
          label="文章标签："
          prop="tag"
          :rules="[
            { required: true, type: 'array', message: '请选择文章标签', trigger: 'change' }
          ]">
          <el-checkbox-group v-model="form.tag" fill="#324057" text-color="white">
            <el-checkbox-button 
              v-for="item in tags" 
              :label="item.id"
              :key="item.id">{{ item.name }}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item 
          label="文章内容："
          prop="content"
          :rules="[
            { required: true, message: '请输入文章内容', trigger: 'blur, change' }
          ]">
          <markdown-editor 
            v-model="form.content" 
            ref="markdownEditor"
            :configs="configs"
            preview-class="markdown-body"></markdown-editor>
            
          <!-- <el-input v-model="form.descript" :maxlength="20"></el-input> -->
        </el-form-item>
        <el-form-item style="margin-bottom: 0">
           <el-button @click="submitForm('form')">发布</el-button>
        </el-form-item>

    </el-col>

      <el-col :span="8" class="right">
        <div class="right-form">
          <el-form-item label="文章状态：" label-width="90px" style="margin-bottom: 10px;">
            <el-radio-group v-model="form.state">
              <el-radio :label="1">发布</el-radio>
              <el-radio :label="0">草稿</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="文章公开：" label-width="90px" style="margin-bottom: 10px;">
            <el-radio-group v-model="form.viewState">
              <el-radio :label="1">公开</el-radio>
              <el-radio :label="0">私密</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="right-form" style="margin-top: 24px;">
          <el-form-item 
            label="缩略图：" 
            label-width="90px" 
            class="img-item"
            prop="img"
              :rules="[
                { required: true, message: '请上传图片', trigger: 'change' }
              ]">

            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :file-list="fileList"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :on-success="handleSuccess">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </div>

        <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="form.img" alt="">
        </el-dialog>

      </el-col>
    </el-form>
  </div>
</template>

<script>

import { markdownEditor } from 'vue-simplemde'
// import 'github-markdown-css'
require.ensure([], () => require('github-markdown-css'), 'markdown-style')

export default {
  name: 'release',

  components: {
    markdownEditor
  },

  data () {
    return {
      dialogVisible: false,
      configs: {
        status: false, // 禁用底部状态栏
        spellChecker: false,
        initialValue: '', // 设置初始值
        renderingConfig: {
          codeSyntaxHighlighting: true, // 开启代码高亮
          highlightingTheme: 'atom-one-light' // 自定义代码高亮主题，可选列表(https://github.com/isagalaev/highlight.js/tree/master/src/styles)
        }
      },
      fileList: [],
      form: {
        title: '',
        keyword: '',
        descript: '',
        tag: [],
        content: '',
        viewState: 1,
        state: 1,
        img: ''
      },
      ops: [
        { name: '发布', id: 1 },
        { name: '保存草稿', id: 2 }
      ],
      tags: [
        { name: 'Javascript', id: 1 },
        { name: 'Javascript', id: 2 },
        { name: 'Javascript', id: 3 },
        { name: 'Javascript', id: 4 },
        { name: 'Javascript', id: 5 },
        { name: 'Javascript', id: 6 }
      ]
    }
  },

  methods: {
    handleSuccess (res, file) {
      console.log(res)
      this.form.img = URL.createObjectURL(file.raw)
      // this.form.img =
    },

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    handleChange (file, fileList) {
      this.fileList = fileList.slice(-1)
    },

    handlePictureCardPreview () {
      this.dialogVisible = true
    },

    handleRemove () {
      this.form.img = ''
    }
  }
}
</script>

<style lang="scss">

@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';

.release {

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

            .el-upload {
              width: 258px;
              height: 218px;
              line-height: 220px;
            }

            .el-upload-list {
              .el-upload-list__item {
                margin: 6px 0 0 0;
                width: 260px;
                height: auto;
              }

              .el-upload-list__item.is-ready,
              .el-upload-list__item.is-uploading {
                height: 150px;
              }
            }
          }
        }
      }
    }
  }

  .markdown-editor .CodeMirror {
    height: 300px;
  }
}
</style>
