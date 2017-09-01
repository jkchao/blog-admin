<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'app',
  created () {
    this.$router.push('/login')
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
