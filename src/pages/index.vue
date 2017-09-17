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
          <img :src="user.gravatar + '?imageView2/1/w/36/h/36'" class="user-face">
        </span>
      </div>
    </header>
    <section>
      <aside class="nav">
          <div class="toggle-size"></div>
          <el-menu
            :default-active="defaultPath"
            class="el-menu-vertical-demo"
            theme="dark"
            unique-opened
            :default-openeds="defaultOpen"
            router>
            <template v-for="(item,index) in $router.options.routes">
              <el-submenu :index="index+''" v-if="!item.leaf && item.children" :key="index">
                <template slot="title">
                  <i :class="item.icon"  class="iconfont mar" ></i>
                  <span class="title">{{item.name}}</span>
                </template>
                <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.leaf">
                  <i :class="child.icon"  class="iconfont mar" ></i>
                  <span class="text">
                    {{child.name}}
                  </span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-if="item.leaf && item.children" :index="item.children[0].path" :key="index">
                <i :class="item.icon"  class="iconfont mar" ></i>
                <span>{{item.name}}</span>
              </el-menu-item>
            </template>
          </el-menu>
      </aside>

      <article>
        <transition-group tag="span" name="list">
          <el-col :span="24" key="1" v-if="$route.path !== '/home'" class="breadcrumb">
            <el-breadcrumb>
              <transition-group tag="div" name="list" class="el-breadcrumb">
                <el-breadcrumb-item :to="{ path: '/home' }" :key="indexPath">{{ indexPath }}</el-breadcrumb-item>
                <el-breadcrumb-item v-if="currentPathNameParent !== indexPath " :key="currentPathNameParent">{{ currentPathNameParent }}</el-breadcrumb-item>
                <el-breadcrumb-item v-if="currentPathName !== currentPathNameParent " :key="currentPathName">{{ currentPathName }}</el-breadcrumb-item>
              </transition-group>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" key="2" class="right-content">
            <transition :name="transition" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </transition-group>
      </article>
    </section>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'

export default {

  name: 'index',

  data () {
    return {
      indexPath: '我的面板',
      defaultPath: '',
      defaultOpen: [],
      currentPathName: '',
      currentPathNameParent: '',
      page: ['home', 'article', 'tag', 'hotReview', 'heros', 'set', 'analytics'],
      transition: 'fade',
      collapse: false
    }
  },

  computed: {
    ...mapGetters([
      'user'
    ])
  },

  watch: {
    '$route' (to, from) { // 监听路由改变
      this.defaultPath = to.path
      this.currentPathName = to.name
      this.currentPathNameParent = to.matched[0].name
      const toPageInd = this.page.indexOf(to.meta.page)
      const fromPageInd = this.page.indexOf(from.meta.page)
      this.transition = toPageInd === fromPageInd
                        ? 'fade'
                        : toPageInd > fromPageInd
                          ? 'slide-down'
                          : 'slide-up'
    }
  },

  created () {
    this.defaultPath = this.$route.path
    this.currentPathName = this.$route.name
    this.currentPathNameParent = this.$route.matched[0].name
    const index = this.page.indexOf(this.$route.meta.page)
    this.defaultOpen.push(index.toString())
  }
}
</script>

<style lang="scss">

@import '../assets/scss/variable.scss';
@import '../assets/scss/mixin.scss';

.index {
  height: 100%;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $header-height;
  width: 100%;
  padding: 0 20px;
  line-height: $header-height;
  background: darken($admin-bg, 0%);

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
      height: 36px;
    }
  }
}

section {
  position: absolute;
  top: 4rem;
  bottom: 0;
  width: 100%;
  overflow: hidden;

  >aside {
    position: fixed;
    top: 4rem;
    left: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    width: 200px;
    background: $black;
    z-index: 8;

    .el-menu {
      background: $black;

      .el-submenu .el-menu {
        background: $black;
      }

      .el-menu-item.is-active {
        color: $white;
        background: $darkBlack;
      }
    }
  }

  >article {
    position: absolute;
    right: 0px;
    top: 0px;
    bottom: 0px;
    left: 200px;
    padding: $lg-pad;
    min-width: 1000px;
    overflow-y: auto;

    .breadcrumb {
      margin-bottom: 1rem;
    }

    .right-content {
      height: calc(100% - 2rem);
      min-width: 1100px;
    }
  }
}
</style>
