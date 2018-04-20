/**
 * link 数据
 */

import { ActionTree, MutationTree } from 'vuex'

import { success, error } from '../../utils/response'
import service from '../../api'

interface IState {
  fetch: boolean
  posting: boolean
  total: number
  list: StoreState.Link[]
}

interface IParams {
  current_page: number
  page_size: number
  keyword: string
  state?: StoreState.State
}

const state: IState = {
  posting: false,
  fetch: false,
  list: [],
  total: 0
}

const actions: ActionTree<IState, any> = {

  // 获取列表
  async getLinks (
    { commit },
    data: IParams
  ): Promise<Ajax.AjaxResponse> {
    commit('REQUEST_LIST')
    const res: Ajax.AjaxResponse = await service.getLinks(data)
    if (res && res.code === 1) {
      const list: StoreState.Link[] = res.result.list.map((item: StoreState.Link ) => {
        return { ...item, deleteing: false }
      })
      const total: number = res.result.pagination.total
      commit('REQUEST_LIST_SUCCESS', { list, total })
    } else commit('REQUEST_LIST_FAIL')
    return res
  },

  // 添加
  async postLink (
    { commit },
    link: StoreState.Link
  ): Promise<Ajax.AjaxResponse> {
    commit('POST_BOOK')
    const res: Ajax.AjaxResponse = await service.postLink(link)
    if (res && res.code === 1) success('添加数据成功')
    else error(res.message)
    commit('POST_BOOK_FINAL')
    return res
  },

  // 修改
  async putLink (
    { commit },
    link: StoreState.Link
  ): Promise<Ajax.AjaxResponse> {
    commit('POST_BOOK')
    const res: Ajax.AjaxResponse = await service.putLink(link)
    if (res && res.code === 1) {
      success('修改数据成功')
      commit('POST_BOOK_SUCCESS', link)
    } else error(res.message)
    commit('POST_BOOK_FINAL')
    return res
  },

  // 修改状态
  async patchLink (
    { commit },
    link: { _id: string; state: StoreState.State; }
  ): Promise<void> {
    const res: Ajax.AjaxResponse = await service.patchLink(link)
    if (res && res.code === 1) {
      success('数据状态成功')
      commit('PATCH_BOOK_SUCCESS', link)
    } else error(res.message)
  },

  // 删除
  async deleteLink (
    { commit },
    link: { _id: string }
  ): Promise<Ajax.AjaxResponse> {
    commit('DELETE_BOOK', link)
    const res: Ajax.AjaxResponse = await service.deleteLink(link)
    if (res && res.code === 1) success('删除成功')
    else error(res.message)
    commit('DELETE_BOOK_FINAL', link)
    return res
  }
}

const mutations: MutationTree<IState> = {
  'REQUEST_LIST' (state: IState): void {
    state.fetch = true
  },

  'REQUEST_LIST_SUCCESS' (
    state: IState,
    payload: { list: StoreState.Link[], total: number }
  ): void {
    state.fetch = false
    state.list = payload.list
    state.total = payload.total
  },

  'REQUEST_LIST_FAIL' (state: IState): void {
    state.fetch = false
    state.list = []
    state.total = 0
  },

  'POST_BOOK' (state: IState): void {
    state.posting = true
  },

  'POST_BOOK_FINAL' (state: IState): void {
    state.posting = false
  },

  'POST_BOOK_SUCCESS' (state: IState, link: StoreState.Link): void {
    const item = (state.list.find((item: StoreState.Link) => item._id === link._id) as StoreState.Link)
    if (item) {
      item.name = link.name
      item.url = link.url
    }
  },

  'PATCH_BOOK_SUCCESS' (
    state: IState,
    link: { _id: string, state: StoreState.State }
  ): void {
    (state.list.find((item: StoreState.Link) => item._id === link._id) as StoreState.Link).state = link.state
  },

  'DELETE_BOOK' (state: IState, link: { _id: string }): void {
    (state.list.find((item: StoreState.Link) => item._id === link._id) as StoreState.Link).deleteing = true
  },

  'DELETE_BOOK_FINAL' (state: IState, link: { _id: string }): void {
    (state.list.find((item: StoreState.Link) => item._id === link._id) as StoreState.Link).deleteing = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
