/**
 * book 数据
 */

import { ActionTree, MutationTree } from 'vuex'

import { success, error } from '../../utils/response'
import service from '../../api'

interface IState {
  fetch: boolean
  posting: boolean
  total: number
  list: StoreState.Book[]
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
  async getBooks (
    { commit },
    data: IParams
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
    commit('POST_BOOK')
    const res: Ajax.AjaxResponse = await service.postBook(book)
    if (res && res.code === 1) success('添加数据成功')
    else error(res.message)
    commit('POST_BOOK_FINAL')
    return res
  },

  // 修改
  async putBook (
    { commit },
    book: StoreState.Book
  ): Promise<Ajax.AjaxResponse> {
    commit('POST_BOOK')
    const res: Ajax.AjaxResponse = await service.putBook(book)
    if (res && res.code === 1) {
      success('修改数据成功')
      commit('POST_BOOK_SUCCESS', book)
    } else error(res.message)
    commit('POST_BOOK_FINAL')
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
      commit('PATCH_BOOK_SUCCESS', book)
    } else error(res.message)
  },

  // 删除
  async deleteBook (
    { commit },
    book: { _id: string }
  ): Promise<Ajax.AjaxResponse> {
    commit('DELETE_BOOK', book)
    const res: Ajax.AjaxResponse = await service.deleteBook(book)
    if (res && res.code === 1) success('删除成功')
    else error(res.message)
    commit('DELETE_BOOK_FINAL', book)
    return res
  }
}

const mutations: MutationTree<IState> = {
  'REQUEST_LIST' (state: IState): void {
    state.fetch = true
  },

  'REQUEST_LIST_SUCCESS' (
    state: IState,
    payload: { list: StoreState.Book[], total: number }
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

  'POST_BOOK_SUCCESS' (state: IState, book: StoreState.Book): void {
    const item = (state.list.find((item: StoreState.Book) => item._id === book._id))
    if (item) {
      item.name = book.name
      item.descript = book.descript
      item.thumb = book.thumb
    }
  },

  'PATCH_BOOK_SUCCESS' (
    state: IState,
    book: { _id: string, state: StoreState.State }
  ): void {
    (state.list.find((item: StoreState.Book) => item._id === book._id) as StoreState.Book).state = book.state
  },

  'DELETE_BOOK' (state: IState, book: { _id: string }): void {
    (state.list.find((item: StoreState.Book) => item._id === book._id) as StoreState.Book).deleteing = true
  },

  'DELETE_BOOK_FINAL' (state: IState, book: { _id: string }): void {
    (state.list.find((item: StoreState.Book) => item._id === book._id) as StoreState.Book).deleteing = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
