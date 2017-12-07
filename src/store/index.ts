import Vue from 'vue'
import Vuex from 'vuex'
import 'babel-polyfill'

import { success, error } from '../utils/response'
import service from '../api'

Vue.use(Vuex)

interface User {
  username: string;
  password: string;
  slogan?: string;
  gravatar?: string;
  name?: string
}

interface Option {
  title: string;
  sub_title: string;
  keyword: string;
  descript: string;
  url: string;
  email: string;
  icp: string
}

interface State {
  login: boolean;
  option: Option;
  user: User
}

const state: State = {
  login: false,
  option: {
    title: '',
    sub_title: '',
    keyword: '',
    descript: '',
    url: '',
    email: '',
    icp: ''
  },
  user: {
    username: '',
    password: '',
    slogan: '',
    gravatar: '',
    name: ''
  }
}

const actions = {

  // 登录
  async login({ commit }, user: User): Promise<AjaxResponse>{
    commit('USER_LOGINING')
    const res: AjaxResponse = await service.login({...user})
                                      .catch(e => console.error(e))
    if (res && res.code === 1) {
      window.localStorage.setItem('TOKEN', JSON.stringify(res.result))
      success('登录成功')
    } else {
      error(res.message)
    }
    commit('USER_LOGINING_FINAL')    
    return res
  },

  // // 用户信息初始化
  // async initAuth ({ commit }) {},

  // // 修改用户信息
  // async putAuth ({ commit }, user: User) {},

  // // 获取网站信息
  // async getOpt ({ commit }) {},

  // // 修改网站信息
  // async putOpt ({ commit }, option: Option) {}
}

const mutations = {
  'USER_LOGINING' (state: State) {
    state.login = true
  },

  'USER_LOGINING_FINAL' (state: State) {
    state.login = false
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
