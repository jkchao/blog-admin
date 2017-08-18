import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import 'babel-polyfill'
Vue.use(Vuex)

const state = {}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
