import Vue from 'vue'
import * as ElementUi from 'element-ui'
import VueSimplemde from 'vue-simplemde'
import Component from 'vue-class-component'
import 'simplemde/dist/simplemde.min.css'
import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js'
(<any>window).hljs = hljs


import App from './layout/App.vue'
import router from './router/index'
import store from './store'
import './assets/scss/index.scss'
import { format } from './filters/index'

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])

Vue.use(ElementUi)
Vue.use(VueSimplemde)

Vue.filter('format', format)

Vue.config.productionTip = false


const app: Vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

export default app
