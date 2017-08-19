<template>
  <div class="index">
    <header>
      <div class="logo font-futura ">
        <router-link to="/">三毛</router-link>
      </div>
      <div class="user">
        <el-badge :value="2" :max="99" class="item">
          <el-button 
            size="mini" 
            type="text">
            <i class="iconfont icon-notice"></i></el-button>
        </el-badge>
        <el-badge :value="6" :max="10" class="item">
          <el-button 
            size="mini" 
            type="text">
            <i class="el-icon-message"></i></el-button>
        </el-badge>
        <span class="user-face-box">
          <img src="../assets/images/muserFace.jpeg" class="user-face">
        </span>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'index'

}
</script>

<style scoped lang="scss">

@import '../assets/scss/variable.scss';
@import '../assets/scss/mixin.scss';

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $header-height;
  padding: 0 $normal-pad;
  line-height: $header-height;
  background: $admin-bg;

  >.logo {
    font-size: $font-size-logo;
    color: white;
    justify-content: center;
  }

  >.user {

    .el-button {
      i {
        color: $white;
        font-size: 1.5rem;
      }
    }

    >.item {
      display: inline;
      padding: $xs-pad $sm-pad;
      margin: 0 $sm-pad;
    }
  }

  .user-face-box {
    margin-left: $lg-pad;

    .user-face {
      border-radius: 50%;
      width: 36px;
    }
  }
}
</style>
