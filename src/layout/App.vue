<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import server from '../utils/axios'

export default {
  name: 'app',
  created () {
    server.get('/')
    .then(res => {
      console.log(res.data)
    })
  }
}
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
