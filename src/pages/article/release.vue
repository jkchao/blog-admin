<template>
  <div class="release" v-loading="fetch">
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
          <el-input v-model="form.title" :maxlength="40" style="width: 300px"></el-input>
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
           <el-button 
            @click="submitForm('form')"
            :disabled="posting">{{
              posting
              ? '提交中'
              : id
              ? '修改'
              : '发布'
            }}</el-button>
        </el-form-item>

    </el-col>

      <el-col :span="8" class="right">
        <div class="right-form">
          <el-form-item label="文章分类" label-width="90px" style="margin-bottom: 10px;">
            <el-radio-group v-model="form.type">
              <el-radio :label="1">码农</el-radio>
              <el-radio :label="2">读书</el-radio>
              <el-radio :label="3">民谣</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="文章状态" label-width="90px" style="margin-bottom: 10px;">
            <el-radio-group v-model="form.state">
              <el-radio :label="1">发布</el-radio>
              <el-radio :label="2">草稿</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="文章公开" label-width="90px" style="margin-bottom: 10px;">
            <el-radio-group v-model="form.publish">
              <el-radio :label="1">公开</el-radio>
              <el-radio :label="2">私密</el-radio>
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
                action="https://up.qbox.me/"
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

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { error } from '../../utils/response'

interface Qn {
  key: string;
  token: string;
}

interface Form extends StoreState.Article {
  tag: Array<string>
}

@Component
export default class Release extends Vue {
  private configs: any = {
    status: false,
    spellChecker: false
  }
  private form: Form = {
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
  private qn: Qn = {
    token: '',
    key: ''
  }
  private percent: number = 0
  private id: string = ''

  private get detail (): StoreState.Article {
    return this.$store.state.article.detail
  }
  private get tags (): StoreState.Tag[] {
    return this.$store.state.tag.list.map((item: StoreState.Tag) => ({ name: item.name, _id: item._id }))
  }
  private get fetch (): boolean {
    return this.$store.state.article.fetch
  }
  private get posting (): boolean {
    return this.$store.state.article.posting
  }

  @Watch('detail')
  getArt (val: StoreState.Article): void {
    this.form = Object.assign({}, {
      ...val,
      tag: val.tag.map((item: StoreState.Tag) => item._id)
    })
  }

  // 上传成功
  private handleSuccess (): void {
    this.form.thumb = 'https://static.jkchao.cn/' + this.qn.key
  }

  // 进度条
  private handlePro (e: any): void {
    this.percent = ~~e.percent
  }

  // 出错
  private handleError (res: Ajax.AjaxResponse): void {
    error(res.message)
  }

  // 上传之前检测
  private beforeUpload (file: File): boolean {
    this.qn.key = file.name
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
    const isLt10M = file.size / 1024 / 1024 < 10

    if (!isJPG) {
      error('上传头像图片只能是 JPG/PNG 格式!')
    }
    if (!isLt10M) {
      error('上传头像图片大小不能超过 10MB!')
    }
    return isJPG && isLt10M
  }

  private submitForm (formName: string): void {
    (this.$refs[formName] as HTMLFormElement).validate(async (valid: boolean): Promise<boolean> => {
      if (valid) {
        let res: Ajax.AjaxResponse
        if (!this.form._id) res = await this.$store.dispatch('article/postArt', { ...this.form })
        else res = await this.$store.dispatch('article/putArt', { ...this.form })
        if (res.code === 1) this.$router.push('/article/index')
        return true
      } else {
        return false
      }
    })
  }

  private beforeRouteUpdate (to: any, form: any, next: any): void {
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
  }

  async created (): Promise<void> {
    await Promise.all([
      // 标签列表
      this.$store.dispatch('tag/getTags', {
        current_page: 1,
        page_size: 100
      }),
      this.$store.dispatch('getQiniu')
    ])

    this.qn.token = this.$store.state.QNtoken

    // 文章详情
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.$store.dispatch('article/getArt', { _id: this.id })
    }
  }
}
</script>

<style lang="scss">

@import '../../assets/scss/variable.scss';

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

        &::first-child {
          .el-form-item {
            display: flex;
            align-items: center;

            label {
              flex-shrink: 0;
            }

            .el-form-item__content {
              margin: 0 !important;
            }
        }
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

  .markdown-body {
      color: $black;
      word-wrap: break-word;

      a {
        font-weight: bold;
        margin: 0 .1rem;

        &.image-link {
          margin: 0;
        }

        &:hover {
          text-decoration: underline;
        }
      }

      .image-package {
        text-align: center;
        width: 92%;
        margin: 0 auto 1rem auto;

        .img-caption {
          min-width: 10%;
          max-width: 80%;
          min-height: 22px;
          display: inline-block;
          padding: 6px;
          margin: 0 auto;
          border-bottom: 1px solid #d9d9d9;
          font-size: 14px;
          color: #969696;
          line-height: 1.2;

          &:empty {
            display: none;
          }
        }
      }

      img {
        max-width: 100%;
        margin: .5rem auto;
        display: block;
        text-align: center;
        border-radius: $radius;
        transition: all .25s;
        opacity: .9;

        &.img-pop {
          cursor: zoom-in;
        }
      }

      p {
        line-height: 1.8rem;
        margin-bottom: 1rem;

        &.text-center {
          text-align: center;
        }

        &.text-right {
          text-align: right;
        }
      }

      iframe {
        margin-bottom: 1rem;
        background: #000;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 1.5rem 0;
        padding-left: 0;
        line-height: 1.8rem;
        font-weight: 700;
        text-indent: 0;

        &:target{
          padding-top: 4.5rem;
        }
      }

      hr {
        height: 0.1rem;
        background: #e1e4e8;
        border: 0;
      }

      blockquote {
  
        padding: 0 1rem;
        margin-bottom: 1rem;
        color: #6a737d;
        border-left: 0.25rem solid #dfe2e5;
  
        p {
          text-indent: 0rem;

          &:first-child {
            margin-top: 0;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      ul {
        list-style-type: square;
      }

      ul,
      ol {
        padding-left: 2rem;
        margin-bottom: 1rem;

        >li {
          line-height: 1.8rem;
          padding: .5rem;
          list-style-type: disc;


          >p {
            text-indent: 0;
          }

          >ul {

            li {
              list-style-type: circle;
            }

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }

      ul {
        list-style: disc;
      }

      table {
        font-size: .8rem;
        max-width: 100%;
        overflow: auto;
        border: 1px solid $border-color;
        border-collapse: collapse;
        border-spacing: 0;

        thead {
          background: $module-bg;
          text-align: left;
        }

        th, td {
          padding: .8rem .5rem;
          line-height: 1.5rem;
        }

        tr:nth-child(2n) {
          background: $module-bg;
        }

        td {
          min-width: 7.5rem;
        }
      }

      code {
        padding: .2rem .4rem;
        margin: 0;
        font-size: 85%;
        border-radius: $radius;
        background-color: $module-hover-bg;
      }

      pre {
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: rgba(0,0,0,.8);
        border-radius: 3px;
        margin-bottom: 1rem;
        word-wrap: normal;

        >.code-lines {
          position: absolute;
          left: 0;
          top: 2.8rem;
          margin: 0;
          padding: 1rem 0;
          width: 2.5rem;
          height: calc(100% - 2.8rem);
          text-align: center;
          background-color: rgba(0, 0, 0, 0.2);

          >.code-line-number {
            padding: 0;
            position: relative;
            list-style-type: none;
            line-height: 1.6rem;
            transition: background-color .05s;

            &:hover {
              &:before {
                display: block;
                opacity: 1;
                visibility: visible;
              }
            }

            &:before {
              content: '';
              height: 1.6rem;
              position: absolute;
              top: 0;
              left: 2.5rem;
              width: 66rem;
              background-color: rgba(154, 154, 154, 0.2);
              display: none;
              visibility: hidden;
              opacity: 0;
            }
          }
        }

        >code {
          margin: 0;
          padding: 1rem;
          float: left;
          width: 100%;
          height: 100%;
          display: block;
          line-height: 1.6rem;
          color: rgba(255, 255, 255, 0.87);
          background-color: transparent;
        }
      }
  }
}
</style>
