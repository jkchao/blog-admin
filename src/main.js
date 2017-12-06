// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './layout/App.vue'
import router from './router'
import store from './store'
import * as ElementUi from 'element-ui'
// import '../static/theme/index.css'
import './assets/scss/index.scss'
import 'simplemde/dist/simplemde.min.css'
import 'github-markdown-css'
import * as filters from './filters'

Vue.use(ElementUi)

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

Vue.config.productionTip = false

/* eslint-disable no-new */

const app = new Vue({
  el: '#app',
  router,
  store,
  ...App
})

export default app
