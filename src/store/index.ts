import Vue from 'vue'
import Vuex from 'vuex'
import 'babel-polyfill'

import { success, error } from '../utils/response'
import service from '../api'

Vue.use(Vuex)

interface User {
  username: string,
  password: string,
  slogan?: string,
  gravatar?: string,
  readonly name?: string
}

interface Option {
  title: string,
  sub_title: string,
  keyword: string,
  descript: string,
  url: string,
  email: string,
  icp: string
}

const state = {
  login: false,
  option: <Option>{},
  user: <User>{}
}

const actions = {

  // 登录
  async login({ commit }, user: User) : Promise<any>{
    commit('USER_LOGINING')
    const res = await service.login({...user})
                        .catch(e => console.error(e))
    if (res && res.code === 1) {
      window.localStorage.setItem('TOKEN', JSON.stringify(res.result))
      commit('USER_LOGINING_SUCCESS')
      success('登录成功')
    } else {
      commit('USER_LOGINING_FAIL')
      error(res.message)
    }
    return res
  },

  // 用户信息初始化
  async initAuth ({ commit }) {},

  // 修改用户信息
  async putAuth ({ commit }, user: User) {},

  // 获取网站信息
  async getOpt ({ commit }) {},

  // 修改网站信息
  async putOpt ({ commit }, option: Option) {}
}

const mutations = {
  'USER_LOGINING' (state) {
    state.login = true
  },

  'USER_LOGINING_SUCCESS' (state) {
    state.login = false
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
