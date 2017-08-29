<template>
  <div class="set">
    <el-col :span="17">
      <el-form
        :model="form"
        label-width="120px"
        label-position="left"
        ref="form">
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
        </el-form>
    </el-col>
      
      <el-col :span="9" class="right">
          <div class="right-form head">
            <el-form>
              <el-form-item
                label="头像"
                label-width="70px" 
                class="img-item">
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
            </el-form>
          </div>
          <div class="right-form" style="margin-top: 20px">
            <el-form :model="passwordForm"  :rules="passwordRule" ref="passwordForm" label-width="80px">
              <el-form-item 
                label="原密码" 
                prop="oldPassword"
                :rules="[
                  { required: true, message: '请输入原密码', trigger: 'blur' }
                ]">
                <el-input 
                  type="password" 
                  v-model="passwordForm.oldPassword" 
                  auto-complete="off"
                  :maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input
                  type="password" 
                  v-model="passwordForm.newPassword" 
                  auto-complete="off"
                  :maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass"> 
                <el-input 
                  type="password" 
                  v-model="passwordForm.checkPass" 
                  auto-complete="off"
                  :maxlength="20"></el-input>
              </el-form-item>
              <el-form-item style="margin-bottom: 0;">
                <el-button  @click="submit('passwordForm')">更改</el-button>
              </el-form-item>
            </el-form>
          </div>
      </el-col>
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
    var validateNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.passwordForm.checkPass !== '') {
          this.$refs.passwordForm.validateField('checkPass')
        }
        callback()
      }
    }

    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

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
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        checkPass: ''
      },
      passwordRule: {
        newPassword: [
          { validator: validateNewPassword, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validateCheckPass, trigger: 'blur' }
        ]
      },
      ops: [
        { name: '发布', id: 1 },
        { name: '保存草稿', id: 2 }
      ]
    }
  },

  methods: {
    handleSuccess (res, file) {
      this.form.img = URL.createObjectURL(file.raw)
    },

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(formName)
          if (formName === 'form') console.log(formName)
          else console.log(formName)
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    submit (formName) {
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
  display: flex;
  justify-content: space-between;

  >.el-col {
    background: $white;
    padding: $lg-pad;
  }

  >.el-col.right {
    padding: 0;
    background: transparent;
    margin-left: $lg-pad;

    .right-form {
      background: $white;
      padding: $lg-pad;
    }

    .right-form.head{
      .el-form-item__label {
        float: none;
      }
    }
  }

  .markdown-editor .CodeMirror {
    height: 300px;
  }
}
</style>
