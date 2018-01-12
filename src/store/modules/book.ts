/**
 * book 数据
 */

import { ActionTree, MutationTree } from 'vuex'

import { success, error } from '../../utils/response'
import service from '../../api'

interface State {
  fetch: boolean;
  posting: boolean;
  total: number;
  list: StoreState.Book[];
}

interface Params {
  current_page: number;
  page_size: number;
  keyword: string;
  state?: StoreState.State;
}

const state: State = {
  posting: false,
  fetch: false,
  list: [],
  total: 0
}

const actions: ActionTree<State, any> = {

  // 获取列表
  async getBooks (
    { commit },
    data: Params
  ): Promise<Ajax.AjaxResponse> {
    commit('REQUEST_LIST')
    const res: Ajax.AjaxResponse = await service.getBooks(data)
    if (res && res.code === 1) {
      const list: StoreState.Book[] = res.result.list.map((item: StoreState.Book ) => {
        return { ...item, deleteing: false }
      })
      const total: number = res.result.pagination.total
      commit('REQUEST_LIST_SUCCESS', { list, total })
    } else commit('REQUEST_LIST_FAIL')
    return res
  },

  // 添加
  async postBook (
    { commit },
    book: StoreState.Book
  ): Promise<Ajax.AjaxResponse> {
    commit('POST_TAG')
    const res: Ajax.AjaxResponse = await service.postBook(book)
    if (res && res.code === 1) success('添加数据成功')
    else error(res.message)
    commit('POST_TAG_FINAL')
    return res
  },

  // 修改
  async putBook (
    { commit },
    book: StoreState.Book
  ): Promise<Ajax.AjaxResponse> {
    commit('POST_TAG')
    const res: Ajax.AjaxResponse = await service.putBook(book)
    if (res && res.code === 1) {
      success('修改数据成功')
      commit('POST_TAG_SUCCESS', book)
    } else error(res.message)
    commit('POST_TAG_FINAL')
    return res
  },

  // 修改状态
  async patchBook (
    { commit },
    book: { _id: string; state: StoreState.State; }
  ): Promise<void> {
    const res: Ajax.AjaxResponse = await service.patchBook(book)
    if (res && res.code === 1) {
      success('数据状态成功')
    } else error(res.message)
  },

  // 删除
  async deleteBook (
    { commit },
    book: { _id: string }
  ): Promise<Ajax.AjaxResponse> {
    commit('DELETE_TAG', book)
    const res: Ajax.AjaxResponse = await service.deleteBook(book)
    if (res && res.code === 1) success('删除成功')
    else error(res.message)
    commit('DELETE_TAG_FINAL', book)
    return res
  }
}

const mutations: MutationTree<State> = {
  'REQUEST_LIST' (state: State): void {
    state.fetch = true
  },

  'REQUEST_LIST_SUCCESS' (
    state: State,
    payload: { list: StoreState.Book[], total: number }
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

  'POST_TAG' (state: State): void {
    state.posting = true
  },

  'POST_TAG_FINAL' (state: State): void {
    state.posting = false
  },

  'POST_TAG_SUCCESS' (state: State, book: StoreState.Book): void {
    let item: StoreState.Book = <StoreState.Book>(state.list.find((item: StoreState.Book) => item._id === book._id))
    if (item) {
      item.name = book.name
      item.descript = book.descript
      item.thumb = book.thumb
    }
  },

  'DELETE_TAG' (state: State, book: { _id: string }): void {
    (<StoreState.Book>state.list.find((item: StoreState.Book) => item._id === book._id)).deleteing = true
  },

  'DELETE_TAG_FINAL' (state: State, book: { _id: string }): void {
    (<StoreState.Book>state.list.find((item: StoreState.Book) => item._id === book._id)).deleteing = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}