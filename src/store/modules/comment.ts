/**
 * 评论
 */

import { ActionTree, MutationTree } from 'vuex'

import { success, error } from '../../utils/response'
import service from '../../api'

interface State {
  fetch: boolean;
  list: StoreState.Comment[];
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
  async getComments (
    { commit },
    data: Params
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

  // 改变状态
  async patchComment (
    { commit },
    Comment: { _id: string, state: StoreState.State, post_ids: string }
  ): Promise<Ajax.AjaxResponse> {
    const res: Ajax.AjaxResponse = await service.patchComment(Comment)
    if (res && res.code === 1) {
      success('修改成功')
      commit('PATCH_COMMENT_SUCCESS', Comment)
    } else error(res.message)
    return res
  },

  // 删除
  async deleteComment (
    { commit },
    Comment: { _id: string, post_ids: string }
  ): Promise<Ajax.AjaxResponse> {
    commit('DELETE_COMMENT', Comment)
    const res: Ajax.AjaxResponse = await service.deleteComment(Comment)
    if (res && res.code === 1) success('删除成功')
    else error(res.message)
    commit('DELETE_COMMENT_FINAL', Comment)
    return res
  }
}

const mutations: MutationTree<State> = {
  'REQUEST_LIST' (state: State): void {
    state.fetch = true
  },

  'REQUEST_LIST_SUCCESS' (
    state: State,
    payload: { list: StoreState.Comment[], total: number }
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

  'DELETE_COMMENT' (
    state: State,
    Comment: StoreState.Comment
  ): void {
    (<StoreState.Comment>state.list.find((item: StoreState.Comment) => item._id === Comment._id)).deleteing = true
  },

  'DELETE_COMMENT_FINAL' (
    state: State,
    Comment: { _id: string, post_ids: string }
  ): void {
    (<StoreState.Comment>state.list.find((item: StoreState.Comment) => item._id === Comment._id)).deleteing = false
  },

  'PATCH_COMMENT_SUCCESS' (
    state: State,
    Comment: { _id: string, state: StoreState.State, post_ids: string }
  ): void {
    (<StoreState.Comment>state.list.find((item: StoreState.Comment) => item._id === Comment._id)).state = Comment.state
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}