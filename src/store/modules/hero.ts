/**
 * 英雄版（留言墙）
 */

import { ActionTree, MutationTree } from 'vuex'

import { success, error } from '../../utils/response'
import service from '../../api'

interface State {
  fetch: boolean;
  list: StoreState.Hero[];
  total: number;
}

interface Params {
  page_size: number;
  current_page: number;
  keyword?: string;
  state?: StoreState.State
}

const state: State = {
  fetch: false,
  list: [],
  total: 0
}

const actions: ActionTree<State, any> = {
  // 获取列表
  async getHeros (
    { commit },
    data: Params
  ): Promise<Ajax.AjaxResponse> {
    commit('REQUEST_LIST')
    const res: Ajax.AjaxResponse = await service.getHeros(data)
    if (res && res.code === 1) {
      const list: StoreState.Hero[] = res.result.list.map((item: StoreState.Hero ) => {
        return { ...item, deleteing: false }
      })
      const total: number = res.result.pagination.total
      commit('REQUEST_LIST_SUCCESS', { list, total })
    } else commit('REQUEST_LIST_FAIL')
    return res
  },

  // 改变状态
  async patchHero (
    { commit },
    Hero: { _id: string, state: StoreState.State }
  ): Promise<Ajax.AjaxResponse> {
    const res: Ajax.AjaxResponse = await service.patchHero(Hero)
    if (res && res.code === 1) {
      success('修改成功')
      commit('PATCH_HERO_SUCCESS', Hero)
    } else error(res.message)
    return res
  },

  // 删除
  async deleteHero (
    { commit },
    Hero: { _id: string }
  ): Promise<Ajax.AjaxResponse> {
    commit('DELETE_TAG', Hero)
    const res: Ajax.AjaxResponse = await service.deleteHero(Hero)
    if (res && res.code === 1) success('删除成功')
    else error(res.message)
    commit('DELETE_TAG_FINAL', Hero)
    return res
  }
}

const mutations: MutationTree<State> = {
  'REQUEST_LIST' (state: State): void {
    state.fetch = true
  },

  'REQUEST_LIST_SUCCESS' (
    state: State,
    payload: { list: StoreState.Hero[], total: number }
  ): void {
    state.fetch = false
    state.list = payload.list
    state.total = payload.total
  },

  'REQUEST_LIST_FAIL' (state: State): void {
    state.fetch = false
    state.list = []
    state.total = 0
  },

  'DELETE_TAG' (
    state: State,
    Hero: { _id: string }
  ): void {
    (<StoreState.Hero>state.list.find((item: StoreState.Hero) => item._id === Hero._id)).deleteing = true
  },

  'DELETE_TAG_FINAL' (
    state: State,
    Hero: { _id: string }
  ): void {
    (<StoreState.Hero>state.list.find((item: StoreState.Hero) => item._id === Hero._id)).deleteing = false
  },

  'PATCH_HERO_SUCCESS' (
    state: State,
    Hero: { _id: string, state: StoreState.State }
  ): void {
    (<StoreState.Hero>state.list.find((item: StoreState.Hero) => item._id === Hero._id)).state = Hero.state
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}