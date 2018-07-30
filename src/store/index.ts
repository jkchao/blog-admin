import Vue from 'vue'
import Vuex, { ActionTree, MutationTree } from 'vuex'
import 'babel-polyfill'

import { success, error } from '../utils/response'
import service from '../api'
import modules from './modules'

Vue.use(Vuex)

interface IState {
  login: boolean
  postUser: boolean
  postOption: boolean
  option: StoreState.Option
  user: StoreState.User
  QNtoken: string
}

const state: IState = {
  login: false,
  option: {
    _id: '',
    sub_title: '',
    title: '',
    keyword: '',
    descript: '',
    url: '',
    email: '',
    icp: ''
  },
  postOption: false,
  postUser: false,
  user: {
    _id: '',
    name: '',
    username: '',
    oldPassword: '',
    newPassword: '',
    slogan: '',
    gravatar: ''
  },
  QNtoken: ''
}

const actions: ActionTree<IState, any> = {
  // 登录
  async login (
    { commit },
    user: StoreState.Login
  ): Promise<Ajax.AjaxResponse> {
    commit('USER_LOGINING')
    const res: Ajax.AjaxResponse = await service.login({ ...user })
    if (res && res.code === 1) {
      window.localStorage.setItem('TOKEN', JSON.stringify(res.result))
      success('登录成功')
    } else {
      error(res.message)
    }
    commit('USER_LOGINING_FINAL')
    return res
  },

  // 用户信息初始化
  async initAuth ({ commit }): Promise<void> {
    const res: Ajax.AjaxResponse = await service.getAuth()
    if (res && res.code === 1) commit('USER_INFO', res.result)
  },

  // 修改用户信息
  async putAuth (
    { commit },
    user: StoreState.User
  ): Promise<Ajax.AjaxResponse> {
    commit('POST_USER_INFO')
    const res: Ajax.AjaxResponse = await service.putAuth({ ...user })
    if (res && res.code === 1) success('修改用户信息成功')
    else error(res.message)
    commit('POST_USER_FINAL')
    return res
  },

  // 获取网站信息
  async getOpt ({ commit }): Promise<void> {
    const res: Ajax.AjaxResponse = await service.getOpt()
    if (res && res.code === 1) commit('OPTION_INFO', res.result)
  },

  // 获取 qn token
  async getQiniu ({ commit }): Promise<void> {
    const res: Ajax.AjaxResponse = await service.getQiniu()
    if (res && res.code === 1) commit('QN_TOKEN', res.result.token)
  },

  // 修改网站信息
  async putOpt (
    { commit },
    option: StoreState.Option
  ): Promise<Ajax.AjaxResponse> {
    commit('POST_OPTION_INFO')
    const res: Ajax.AjaxResponse = await service.putOpt({ ...option })
    if (res && res.code === 1) success('修改成功')
    else error(res.message)
    commit('POST_OPTION_FINAL')
    return res
  }
}

const mutations: MutationTree<IState> = {
  'USER_LOGINING' (state: IState): void {
    state.login = true
  },

  'USER_LOGINING_FINAL' (state: IState): void {
    state.login = false
  },

  'USER_INFO' (state: IState, user: StoreState.User): void {
    state.user = user
  },

  'POST_USER_INFO' (state: IState): void {
    state.postUser = true
  },

  'POST_USER_FINAL' (state: IState): void {
    state.postUser = false
  },

  'POST_OPTION_INFO' (state: IState): void {
    state.postOption = true
  },

  'POST_OPTION_FINAL' (state: IState): void {
    state.postOption = false
  },

  'OPTION_INFO' (state: IState, option: StoreState.Option): void {
    state.option = option
  },

  'QN_TOKEN' (state: IState, token: string): void {
    state.QNtoken = token
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules
})
