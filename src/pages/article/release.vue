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
          <el-input v-model="form.descript" :maxlength="20"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'release',

  data () {
    return {
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
