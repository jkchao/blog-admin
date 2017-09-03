<template>
  <div class="set">
    <div>
      <el-form
        :model="baseForm"
        label-width="120px"
        label-position="left"
        ref="form">
        <p class="title">基本信息</p>
          <el-form-item
            label="标题："
            prop="title"
            :rules="[
              { required: true, message: '请输入文章标题', trigger: 'blur' }
            ]">
            <el-input v-model="baseForm.title" :maxlength="20" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item 
            label="副标题："
            prop="sub_title"
            :rules="[
              { required: true, message: '请输入站点副标题', trigger: 'blur' }
            ]">
            <el-input v-model="baseForm.sub_title" :maxlength="20" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item 
            label="关键词："
            prop="keyword">
            <el-input 
              v-model="baseForm.keyword" 
              :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item 
            label="站点描述："
            prop="descript"
            :rules="[
              { required: true, message: '请输入站点描述', trigger: 'blur' }
            ]">
            <el-input 
              v-model="baseForm.descript" 
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
              v-model="baseForm.adress" 
              :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item
            label="电子邮件："
            prop="email"
            :rules="[
              { required: true, message: '请输入电子邮件', trigger: 'blur' }
            ]">
            <el-input
              v-model="baseForm.email" 
              :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item
            label="ICP备案号："
            prop="icp">
            <el-input
              v-model="baseForm.icp" 
              :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item
            label="SEO更新服务："
            prop="seo"
            :rules="[
              { required: true, message: '请输入SEO更新服务', trigger: 'blur' }
            ]">
            <el-input 
              v-model="baseForm.seo" 
              :maxlength="200"
              type="textarea"
              :rows="5"></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 0">
              <el-button @click="submitForm('form')">保存</el-button>
          </el-form-item>
        </el-form>
    </div>
      
      <div class="right">
          <div class="right-form head">
            <p class="title">个人信息</p>
            <el-form 
            :model="userForm"  
            :rules="passwordRule" 
            ref="userForm" 
            label-width="80px"
            label-position="left">
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
              <el-form-item
                label="用户名">
                {{ userForm.username }}
              </el-form-item>
              <el-form-item
                label="姓名">
                <el-input v-model="userForm.name" :maxlength="20"></el-input>
              </el-form-item>
              <el-form-item
                label="个性签名">
                <el-input v-model="userForm.slogan" :maxlength="20"></el-input>
              </el-form-item>
              <el-form-item 
                label="原密码" 
                prop="oldPassword"
                :rules="[
                  { required: true, message: '请输入原密码', trigger: 'blur' }
                ]">
                <el-input 
                  type="password" 
                  v-model="userForm.oldPassword" 
                  auto-complete="off"
                  :maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input
                  type="password" 
                  v-model="userForm.newPassword" 
                  auto-complete="off"
                  :maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass"> 
                <el-input 
                  type="password" 
                  v-model="userForm.checkPass" 
                  auto-complete="off"
                  :maxlength="20"></el-input>
              </el-form-item>
              <el-form-item style="margin-bottom: 0;">
                <el-button  @click="submit('userForm')">更改</el-button>
              </el-form-item>
            </el-form>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import server from '../../utils/axios'
export default {
  name: 'set',

  data () {
    var validateNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.userForm.checkPass !== '') {
          this.$refs.userForm.validateField('checkPass')
        }
        callback()
      }
    }

    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      dialogVisible: false,
      fileList: [],
      baseForm: {
        title: '',
        sub_title: '',
        keyword: '',
        adress: '',
        des: '',
        email: '',
        icp: '',
        ping_sites: ''
      },
      userForm: {
        _id: '',
        name: '',
        username: '',
        slogan: '',
        gravatar: '',
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
      }
    }
  },

  computed: {
    ...mapGetters([
      'user'
    ])
  },

  methods: {
    handleSuccess (res, file) {

    },

    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data } = server.put('/option', { ...this.baseForm })
          console.log(data)
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

    },

    handlePictureCardPreview () {
      this.dialogVisible = true
    },

    handleRemove () {
    }
  },

  async created () {
    this.userForm = {
      ...this.user,
      oldPassword: '',
      newPassword: '',
      checkPass: ''
    }
    const { data } = await server.get('/option')
    if (data.code === 1 && data.result) this.baseForm = { ...data.result }
  }
}
</script>

<style lang="scss">

@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';

.set {
  display: flex;
  justify-content: space-between;

  >div {
    width: calc(100% - 420px);    
    background: $white;
    padding: $lg-pad;

    .title {
      font-size: 1.3rem;
      margin-bottom: $md-pad;
    }
  }

  >div.right {
    width: 400px;
    padding: 0;
    background: transparent;
    margin-left: $lg-pad;

    .right-form {
      background: $white;
      padding: $lg-pad;
    }

    .right-form.head .img-item {
      .el-form-item__label {
        float: none;
      }

      .el-form-item__content {
        text-align: center;
        margin: 0 !important;
      }
    }
  }
}
</style>
