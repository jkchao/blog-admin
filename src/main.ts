import Vue from 'vue'
import App from './layout/App.vue'
import router from './router/index'
import store from './store'
import * as ElementUi from 'element-ui'
import './assets/scss/index.scss'
import 'simplemde/dist/simplemde.min.css'
import { format } from './filters/index'

Vue.use(ElementUi)

Vue.filter('format', format)

Vue.config.productionTip = false


const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

export default app
