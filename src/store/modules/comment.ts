/**
 * 评论
 */

import { ActionTree, MutationTree } from 'vuex'

import { success, error } from '../../utils/response'
import service from '../../api'

interface IState {
  fetch: boolean
  posting: boolean
  list: StoreState.Comment[]
  total: number
}

interface IParams {
  page_size: number
  current_page: number
  keyword?: string
  state?: StoreState.State
}

const state: IState = {
  fetch: false,
  posting: false,
  list: [],
  total: 0
}

const actions: ActionTree<IState, any> = {
  // 获取列表
  async getComments (
    { commit },
    data: IParams
  ): Promise<Ajax.AjaxResponse> {
    commit('REQUEST_LIST')
    const res: Ajax.AjaxResponse = await service.getComments(data)
    if (res && res.code === 1) {
      const list: StoreState.Comment[] = res.result.data.map((item: StoreState.Comment ) => {
        return { ...item, deleteing: false }
      })
      const total: number = res.result.pagination.total
      commit('REQUEST_LIST_SUCCESS', { list, total })
    } else commit('REQUEST_LIST_FAIL')
    return res
  },

  // 修改评论
  async putComment (
    { commit },
    comment: { _id: string, state: StoreState.State, post_ids: string }
  ): Promise<Ajax.AjaxResponse> {
    commit('POSTING_COMMENT')
    const res: Ajax.AjaxResponse = await service.putComment(comment)
    if (res && res.code === 1) {
      success('修改成功')
      commit('PUT_COMMENT_SUCCESS', comment)
    } else error(res.message)
    commit('POSTING_COMMENT_FINAL')
    return res
  },

  // 删除
  async deleteComment (
    { commit },
    comment: { _id: string, post_ids: string }
  ): Promise<Ajax.AjaxResponse> {
    commit('DELETE_COMMENT', comment)
    const res: Ajax.AjaxResponse = await service.deleteComment(comment)
    if (res && res.code === 1) success('删除成功')
    else error(res.message)
    commit('DELETE_COMMENT_FINAL', comment)
    return res
  }
}

const mutations: MutationTree<IState> = {
  'REQUEST_LIST' (state: IState): void {
    state.fetch = true
  },

  'REQUEST_LIST_SUCCESS' (
    state: IState,
    payload: { list: StoreState.Comment[], total: number }
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

  'DELETE_COMMENT' (
    state: IState,
    comment: StoreState.Comment
  ): void {
    (state.list.find((item: StoreState.Comment) => item._id === comment._id) as StoreState.Comment).deleteing = true
  },

  'DELETE_COMMENT_FINAL' (
    state: IState,
    comment: { _id: string, post_ids: string }
  ): void {
    (state.list.find((item: StoreState.Comment) => item._id === comment._id) as StoreState.Comment).deleteing = false
  },

  'POSTING_COMMENT' (
    state: IState
  ) {
    state.posting = true
  },

  'POSTING_COMMENT_FINAL' (
    state: IState
  ) {
    state.posting = false
  },

  'PUT_COMMENT_SUCCESS' (
    state: IState,
    comment: { _id: string, state: StoreState.State, post_ids: string }
  ): void {
    (
      state.list.find((item: StoreState.Comment) => item._id === comment._id) as StoreState.Comment
    ).state = comment.state
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
