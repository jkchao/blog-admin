/**
 * 标签数据
 */

import { ActionTree, MutationTree } from 'vuex'

import { success, error } from '../../utils/response'
import service from '../../api'

interface IState {
  fetch: boolean
  posting: boolean
  total: number
  list: StoreState.Tag[]
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
  async getTags (
    { commit },
    data: IParams
  ): Promise<Ajax.AjaxResponse> {
    commit('REQUEST_LIST')
    const res: Ajax.AjaxResponse = await service.getTags(data)
    if (res && res.code === 1) {
      const list: StoreState.Tag[] = res.result.list.map((item: StoreState.Tag ) => {
        return { ...item, deleteing: false }
      })
      const total: number = res.result.pagination.total
      commit('REQUEST_LIST_SUCCESS', { list, total })
    } else commit('REQUEST_LIST_FAIL')
    return res
  },

  // 添加
  async postTag (
    { commit },
    tag: StoreState.Tag
  ): Promise<Ajax.AjaxResponse> {
    commit('POST_TAG')
    const res: Ajax.AjaxResponse = await service.postTag(tag)
    if (res && res.code === 1) success('添加标签成功')
    else error(res.message)
    commit('POST_TAG_FINAL')
    return res
  },

  // 修改
  async putTag (
    { commit },
    tag: StoreState.Tag
  ): Promise<Ajax.AjaxResponse> {
    commit('POST_TAG')
    const res: Ajax.AjaxResponse = await service.putTag(tag)
    if (res && res.code === 1) {
      success('修改标签成功')
      commit('POST_TAG_SUCCESS', tag)
    } else error(res.message)
    commit('POST_TAG_FINAL')
    return res
  },

  // 排序
  async patchTag (
    { commit },
    ids: string[]
  ): Promise<void> {
    const res: Ajax.AjaxResponse = await service.patchTag(ids)
    if (res && res.code === 1) {
      success('标签排序成功')
    } else error(res.message)
  },

  // 删除
  async deleteTag (
    { commit },
    tag: { _id: string }
  ): Promise<Ajax.AjaxResponse> {
    commit('DELETE_TAG', tag)
    const res: Ajax.AjaxResponse = await service.deleteTag(tag)
    if (res && res.code === 1) success('删除成功')
    else error(res.message)
    commit('DELETE_TAG_FINAL', tag)
    return res
  }
}

const mutations: MutationTree<IState> = {
  'REQUEST_LIST' (state: IState): void {
    state.fetch = true
  },

  'REQUEST_LIST_SUCCESS' (
    state: IState,
    payload: { list: StoreState.Tag[], total: number }
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

  'POST_TAG' (state: IState): void {
    state.posting = true
  },

  'POST_TAG_FINAL' (state: IState): void {
    state.posting = false
  },

  'POST_TAG_SUCCESS' (state: IState, tag: StoreState.Tag): void {
    const item = (state.list.find((item: StoreState.Tag) => item._id === tag._id) as StoreState.Tag)
    if (item) {
      item.name = tag.name
      item.descript = tag.descript
    }
  },

  'DELETE_TAG' (state: IState, tag: { _id: string }): void {
    (state.list.find((item: StoreState.Tag) => item._id === tag._id) as StoreState.Tag).deleteing = true
  },

  'DELETE_TAG_FINAL' (state: IState, tag: { _id: string }): void {
    (state.list.find((item: StoreState.Tag) => item._id === tag._id) as StoreState.Tag).deleteing = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
