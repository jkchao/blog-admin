<template>
  <div class="set">
  <el-form
    :model="form"
    label-width="120px"
    label-position="left"
    ref="form">
    <el-col :span="15">
        <el-form-item 
          label="标题："
          prop="title"
          :rules="[
            { required: true, message: '请输入文章标题', trigger: 'blur' }
          ]">
          <el-input v-model="form.title" :maxlength="20" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item 
          label="副标题："
          prop="sub_title"
          :rules="[
            { required: true, message: '请输入站点副标题', trigger: 'blur' }
          ]">
          <el-input v-model="form.sub_title" :maxlength="20" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item 
          label="关键词："
          prop="keyword"
          :rules="[
            { required: true, message: '请输入站点关键词', trigger: 'blur' }
          ]">
          <el-input 
            v-model="form.keyword" 
            :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item 
          label="站点描述："
          prop="descript"
          :rules="[
            { required: true, message: '请输入站点描述', trigger: 'blur' }
          ]">
          <el-input 
            v-model="form.descript" 
            :maxlength="200" 
            type="textarea"
            :rows="5"></el-input>
        </el-form-item>
        <el-form-item
          label="站点地址："
          prop="adress"
          :rules="[
            { required: true, message: '请输入站点地址', trigger: 'blur' }
          ]">
          <el-input 
            v-model="form.adress" 
            :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item 
          label="电子邮件："
          prop="email"
          :rules="[
            { required: true, message: '请输入电子邮件', trigger: 'blur' }
          ]">
          <el-input
            v-model="form.email" 
            :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item
          label="ICP备案号："
          prop="icp"
          :rules="[
            { required: true, message: '请输入ICP备案号', trigger: 'blur' }
          ]">
          <el-input
            v-model="form.icp" 
            :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item
          label="SEO更新服务："
          prop="seo"
          :rules="[
            { required: true, message: '请输入SEO更新服务', trigger: 'blur' }
          ]">
          <el-input 
            v-model="form.seo" 
            :maxlength="200"
            type="textarea"
            :rows="5"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 0">
           <el-button @click="submitForm('form')">更新</el-button>
        </el-form-item>

    </el-col>
      <el-col :span="9" class="right">
        <div class="right-form">
          <el-form-item
            label="头像"
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

        <div class="right-form" style="margin-top: 20px">
          <el-form-item
            label="修改密码"
            label-width="90px" 
            class="img-item"
            prop="img"
            :rules="[
              { required: true, message: '请上传图片', trigger: 'change' }
            ]">
          </el-form-item>
        </div>

      </el-col>
    </el-form>
      <el-dialog v-model="dialogVisible" size="tiny">
        <img width="100%" :src="form.img" alt="">
      </el-dialog>
  </div>
</template>

<script>

import { markdownEditor } from 'vue-simplemde'
// import 'github-markdown-css'
require.ensure([], () => require('github-markdown-css'), 'markdown-style')

export default {
  name: 'set',

  components: {
    markdownEditor
  },

  data () {
    return {
      dialogVisible: false,
      fileList: [],
      form: {
        title: '',
        sub_title: '',
        keyword: '',
        adress: '',
        des: '',
        email: '',
        icp: '',
        seo: '',
        img: ''
      },
      ops: [
        { name: '发布', id: 1 },
        { name: '保存草稿', id: 2 }
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

.set {

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
