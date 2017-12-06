<template>
  <div id="app">
    <!-- <transition name="fade">
      <router-view></router-view>
    </transition> -->
    <h1>hea</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class App extends Vue {}
</script>

<style lang="scss">
@import '../assets/scss/variable.scss';

#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
</style>
