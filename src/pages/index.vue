<template>
  <div class="index">
    <header>
      <div class="logo font-futura">
        <router-link to="/">
          <img src="../assets/images/logo.png" alt="" width="46">
          <span>三毛</span>
        </router-link>
      </div>
      <div class="user">
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
            text-color="#bfc9d9"
            background-color="#24292e"
            router>
            <template v-for="(item,index) in $router.options.routes">
              <el-submenu :index="index+''" v-if="!item.meta.leaf && item.children" :key="index">
                <template slot="title">
                  <i :class="item.meta.icon"  class="iconfont mar" ></i>
                  <span class="title">{{item.name}}</span>
                </template>
                <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.meta.leaf">
                  <i :class="child.meta.icon"  class="iconfont mar" ></i>
                  <span class="text">
                    {{child.name}}
                  </span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-if="item.meta.leaf && item.children" :index="item.children[0].path" :key="index">
                <i :class="item.meta.icon"  class="iconfont mar" ></i>
                <span>{{item.name}}</span>
              </el-menu-item>
            </template>
            <el-menu-item index="">
              <a href="https://analytics.google.com" target="_blank">
                <i class="iconfont mar icon-count"></i>
                <span>Google Analytics</span>           
              </a>
            </el-menu-item>
          </el-menu>
      </aside>

      <article>
        <transition-group tag="span" name="btn">
          <el-col :span="24" key="1" v-if="$route.path !== '/home'" class="breadcrumb">
            <el-breadcrumb>
              <transition-group tag="div" name="btn" class="el-breadcrumb">
                <el-breadcrumb-item :to="{ path: '/home' }" :key="indexPath">{{ indexPath }}</el-breadcrumb-item>
                <el-breadcrumb-item v-if="currentPathNameParent !== indexPath " :key="currentPathNameParent">{{ currentPathNameParent }}</el-breadcrumb-item>
                <el-breadcrumb-item v-if="currentPathName !== currentPathNameParent " :key="currentPathName">{{ currentPathName }}</el-breadcrumb-item>
              </transition-group>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" key="2" class="right-content">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </transition-group>
      </article>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'

@Component
export default class Index extends Vue {
  private indexPath: string = '我的面板'
  private defaultPath: string = ''
  private defaultOpen: Array<string> = []
  private currentPathName: string = ''
  private currentPathNameParent: string = ''

  private get user (): StoreState.User {
    return this.$store.state.user
  }

  @Watch('$route')
  private routeChange (val: Route, oldVal: Route): void {
    this.defaultPath = val.path
    this.currentPathName = val.name || ''
    this.currentPathNameParent = val.matched[0].name || ''
  }

  private created (): void {
    this.defaultPath = this.$route.path
    this.currentPathName = this.$route.name || ''
    this.currentPathNameParent = this.$route.matched[0].name || ''
  }
}
</script>

<style lang="scss">

@import '../assets/scss/variable.scss';

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
      border: 0;

      .el-menu-item {
        &:focus {
          border: none;
          outline: none;
        }
      }

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
