<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class App extends Vue {
  private beforeCreate () {
    this.$store.dispatch('initAuth')
  }
}
</script>

<style lang="scss">

#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
</style>
