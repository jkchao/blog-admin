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
            <el-input v-model="baseForm.title" :maxlength="40" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item 
            label="副标题："
            prop="sub_title"
            :rules="[
              { required: true, message: '请输入站点副标题', trigger: 'blur' }
            ]">
            <el-input v-model="baseForm.sub_title" :maxlength="40" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item 
            label="关键词："
            prop="keyword">
            <el-input 
              v-model="baseForm.keyword" 
              :maxlength="40"></el-input>
          </el-form-item>
          <el-form-item
            label="站点地址："
            prop="url"
            :rules="[
              { required: true, message: '请输入站点地址', trigger: 'blur' }
            ]">
            <el-input 
              v-model="baseForm.url" 
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
          <!-- <el-form-item
            label="SEO更新服务："
            prop="ping_sites"
            :rules="[
              { required: true, message: '请输入SEO更新服务', trigger: 'blur' }
            ]">
            <el-input 
              v-model="baseForm.ping_sites" 
              :maxlength="200"
              type="textarea"
              :rows="5"></el-input>
          </el-form-item> -->
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
                    class="avatar-uploader"
                    action="https://up.qbox.me/"
                    :data="qn"
                    :show-file-list="false"
                    :on-success="handleSuccess"
                    :before-upload="beforeUpload"
                    :on-progress="handlePro"
                    :on-error="handleError">
                    <img v-if="userForm.gravatar" :src="userForm.gravatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <el-progress :percentage="percent" v-if="percent !== 0 && percent !== 100"></el-progress>
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
                  { required: true, message: '请输入原密码', trigger: 'blur' },
                  { min: 6, message: '密码至少6位', trigger: 'blur' }
                ]">
                <el-input 
                  type="password" 
                  v-model="userForm.oldPassword" 
                  auto-complete="off"
                  :maxlength="20"
                  placeholder="原密码"
                  @keyup.enter.native="submit('userForm')"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input
                  type="password" 
                  v-model="userForm.newPassword" 
                  auto-complete="off"
                  :maxlength="20"
                  placeholder="新密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass"> 
                <el-input 
                  type="password" 
                  v-model="userForm.checkPass" 
                  auto-complete="off"
                  :maxlength="20"
                  placeholder="确认密码"
                  @keyup.enter.native="submit('userForm')"></el-input>
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
import { error } from '../../utils/response'
export default {
  name: 'set',

  data () {
    var validateNewPassword = (rule, value, callback) => {
      if (value !== '') {
        if (value.length < 6) {
          callback(new Error('密码至少6位'))
        } else {
          if (this.userForm.checkPass !== '') {
            this.$refs.userForm.validateField('checkPass')
          }
          callback()
        }
      }
      callback()
    }

    var validateCheckPass = (rule, value, callback) => {
      if (value !== '') {
        if (value !== this.userForm.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        }
        callback()
      }
      callback()
    }

    return {
      dialogVisible: false,
      fileList: [],
      baseForm: {
        title: '',
        sub_title: '',
        keyword: '',
        descript: '',
        url: '',
        email: '',
        icp: ''
        // ping_sites: ''
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
      },
      qn: {
        token: '',
        key: ''
      },
      percent: 0
    }
  },

  computed: {
    ...mapGetters([
      'user'
    ])
  },

  methods: {
    handleSuccess (res, file) {
      this.userForm.gravatar = 'https://static.jkchao.cn/' + this.qn.key
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
          const opt = await this.$store.dispatch('putOpt', { ...this.baseForm })
          if (opt.code === 1) this.baseForm._id = opt.result
        } else {
          return false
        }
      })
    },

    submit (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.userForm.oldPassword === this.userForm.newPassword) {
            error('新旧密码不可一致')
            return
          }
          const res = await this.$store.dispatch('putAuth', { ...this.userForm })
          if (res.code === 1) {
            this.userForm.oldPassword = ''
            this.userForm.newPassword = ''
            this.userForm.checkPass = ''
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },

  async created () {
    this.userForm = {
      ...this.user,
      oldPassword: '',
      newPassword: '',
      checkPass: ''
    }

    // 基本信息
    const opt = await this.$store.dispatch('getOpt')
    if (opt.code === 1) this.baseForm = { ...opt.result }

    // 七牛token
    const qn = await this.$store.dispatch('getQiniu')
    if (qn.code === 1) this.qn.token = qn.result.token
  }
}
</script>

<style lang="scss">

@import '../../assets/scss/variable.scss';

.set {
  display: flex;
  justify-content: space-between;

  >div {
    width: calc(100% - 420px);
    height: 100%;
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
