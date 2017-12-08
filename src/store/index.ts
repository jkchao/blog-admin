import Vue from 'vue'
import Vuex, { ActionContext, Store } from 'vuex'
import 'babel-polyfill'

import { success, error } from '../utils/response'
import service from '../api'

Vue.use(Vuex)

interface State {
  login: boolean;
  postUser: boolean;
  postOption: boolean;
  option: StoreState.Option;
  user: StoreState.User;
  QNtoken: string
}

const state: State = {
  login: false,
  postUser: false,
  postOption: false,
  option: {
    _id: '',
    title: '',
    sub_title: '',
    keyword: '',
    descript: '',
    url: '',
    email: '',
    icp: ''
  },
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

const actions = {
  // 登录
  async login (context: ActionContext<State, any>, user: StoreState.Login): Promise<Ajax.AjaxResponse> {
    context.commit('USER_LOGINING')
    const res: Ajax.AjaxResponse = await service.login({ ...user })
    if (res && res.code === 1) {
      window.localStorage.setItem('TOKEN', JSON.stringify(res.result))
      success('登录成功')
    } else {
      error(res.message)
    }
    context.commit('USER_LOGINING_FINAL')
    return res
  },

  // 用户信息初始化
  async initAuth (context: ActionContext<State, any>): Promise<void> {
    const res: Ajax.AjaxResponse = await service.getAuth()
    if (res && res.code === 1) context.commit('USER_INFO', res.result)
  },

  // 修改用户信息
  async putAuth (context: ActionContext<State, any>, user: StoreState.User): Promise<Ajax.AjaxResponse> {
    context.commit('POST_USER_INFO')
    const res: Ajax.AjaxResponse = await service.putAuth({ ...user })
    if (res && res.code === 1) success('修改用户信息成功')
    else error(res.message)
    context.commit('POST_USER_FINAL')
    return res
  },

  // 获取网站信息
  async getOpt (context: ActionContext<State, any>): Promise<void> {
    const res: Ajax.AjaxResponse = await service.getOpt()
    if (res && res.code === 1) context.commit('OPTION_INFO', res.result)
  },

  // 获取 qn token
  async getQiniu (context: ActionContext<State, any>): Promise<void> {
    const res: Ajax.AjaxResponse = await service.getQiniu()
    if (res && res.code === 1) context.commit('QN_TOKEN', res.result.token)
  },

  // 修改网站信息
  async putOpt (context: ActionContext<State, any>, option: StoreState.Option): Promise<Ajax.AjaxResponse> {
    context.commit('POST_OPTION_INFO')
    const res: Ajax.AjaxResponse = await service.putOpt({ ...option })
    if (res && res.code === 1) success('修改成功')
    else error(res.message)
    context.commit('POST_OPTION_FINAL')
    return res
  }
}

const mutations = {
  'USER_LOGINING' (state: State): void {
    state.login = true
  },

  'USER_LOGINING_FINAL' (state: State): void {
    state.login = false
  },

  'USER_INFO' (state: State, user: StoreState.User): void {
    state.user = user
  },

  'POST_USER_INFO' (state: State): void {
    state.postUser = true
  },

  'POST_USER_FINAL' (state: State): void {
    state.postUser = false
  },

  'POST_OPTION_INFO' (state: State): void {
    state.postOption = true
  },

  'POST_OPTION_FINAL' (state: State): void {
    state.postOption = false
  },

  'OPTION_INFO' (state: State, option: StoreState.Option): void {
    state.option = option
  },

  'QN_TOKEN' (state: State, token: string): void {
    state.QNtoken = token
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
