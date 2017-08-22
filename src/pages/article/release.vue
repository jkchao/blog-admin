<template>
  <div class="release">
    <el-col :span="15">
      <el-form
        :model="form"
        label-width="100px"
        label-position="left">
        <el-form-item label="文章标题：">
          <el-input v-model="form.title" :maxlength="20" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="文章关键字：">
          <el-input v-model="form.descript" :maxlength="20" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="文章描述：">
          <el-input 
            v-model="form.descript" 
            :maxlength="20" 
            type="textarea"
            :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="文章标签：">
          <el-checkbox-group v-model="form.tag" fill="#324057" text-color="white">
            <el-checkbox-button 
              v-for="item in tags" 
              :label="item.id"
              :key="item.id">{{ item.name }}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="文章内容：">
          <markdown-editor 
            v-model="form.content" 
            ref="markdownEditor"
            :configs="configs"
            preview-class="markdown-body"></markdown-editor>
            
          <!-- <el-input v-model="form.descript" :maxlength="20"></el-input> -->
        </el-form-item>
      </el-form>
    </el-col>
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
      configs: {
        status: false, // 禁用底部状态栏
        initialValue: 'hellow', // 设置初始值
        renderingConfig: {
          codeSyntaxHighlighting: true, // 开启代码高亮
          highlightingTheme: 'atom-one-light' // 自定义代码高亮主题，可选列表(https://github.com/isagalaev/highlight.js/tree/master/src/styles)
        }
      },
      form: {
        title: '',
        keyword: '',
        descript: '',
        tag: [],
        content: ''
      },
      tags: [
        { name: 'Javascript', id: 1 },
        { name: 'Javascript', id: 2 },
        { name: 'Javascript', id: 3 },
        { name: 'Javascript', id: 4 },
        { name: 'Javascript', id: 5 },
        { name: 'Javascript', id: 6 }
      ]
    }
  }
}
</script>

<style scoped lang="scss">

@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';

.release {
  >.el-col {
    background: $white;

    >.el-form {
      padding: $lg-pad;
    }
  }
}
</style>
