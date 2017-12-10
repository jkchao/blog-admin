/**
 * 标签数据
 */

import { ActionContext, ActionTree, MutationTree } from 'vuex'

import { success, error } from '../../utils/response'
import service from '../../api'

interface State {
  fetch: boolean;
  posting: boolean;
  total: number;
  list: StoreState.Tag[];
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
  async getTags (
    context: ActionContext<State, any>,
    data: Params
  ): Promise<Ajax.AjaxResponse> {
    context.commit('REQUEST_LIST')
    const res: Ajax.AjaxResponse = await service.getTags(data)
    if (res && res.code === 1) {
      const list: StoreState.Tag[] = res.result.list.map((item: StoreState.Tag ) => {
        return { ...item, deleteing: false }
      })
      const total: number = res.result.pagination.total
      context.commit('REQUEST_LIST_SUCCESS', { list, total })
    } else context.commit('REQUEST_LIST_FAIL')
    return res
  },

  // 添加
  async postTag (
    context: ActionContext<State, any>,
    tag: StoreState.Tag
  ): Promise<Ajax.AjaxResponse> {
    context.commit('POST_TAG')
    const res: Ajax.AjaxResponse = await service.postTag(tag)
    if (res && res.code === 1) success('添加标签成功')
    else error(res.message)
    context.commit('POST_TAG_FINAL')
    return res
  },

  // 修改
  async putTag (
    context: ActionContext<State, any>,
    tag: StoreState.Tag
  ): Promise<Ajax.AjaxResponse> {
    context.commit('POST_TAG')
    const res: Ajax.AjaxResponse = await service.putTag(tag)
    if (res && res.code === 1) {
      success('修改标签成功')
      context.commit('POST_TAG_SUCCESS', tag)
    } else error(res.message)
    context.commit('POST_TAG_FINAL')
    return res
  },

  // 排序
  async patchTag (
    context: ActionContext<State, any>,
    ids: Array<string>
  ): Promise<void> {
    const res: Ajax.AjaxResponse = await service.patchTag(ids)
    if (res && res.code === 1) {
      success('标签排序成功')
    } else error(res.message)
  },

  // 删除
  async deleteTag (
    context: ActionContext<State, any>,
    tag: { _id: string }
  ): Promise<Ajax.AjaxResponse> {
    context.commit('DELETE_TAG', tag)
    const res: Ajax.AjaxResponse = await service.deleteTag(tag)
    if (res && res.code === 1) success('删除成功')
    else error(res.message)
    context.commit('DELETE_TAG_FINAL', tag)
    return res
  }
}

const mutations: MutationTree<State> = {
  'REQUEST_LIST' (state: State): void {
    state.fetch = true
  },

  'REQUEST_LIST_SUCCESS' (
    state: State,
    payload: { list: StoreState.Tag[], total: number }
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

  'POST_TAG_SUCCESS' (state: State, tag: StoreState.Tag): void {
    let item: StoreState.Tag = <StoreState.Tag>(state.list.find((item: StoreState.Tag) => item._id === tag._id))
    if (item) {
      item.name = tag.name
      item.descript = tag.descript
    }
  },

  'DELETE_TAG' (state: State, tag: { _id: string }): void {
    (<StoreState.Tag>state.list.find((item: StoreState.Tag) => item._id === tag._id)).deleteing = true
  },

  'DELETE_TAG_FINAL' (state: State, tag: { _id: string }): void {
    (<StoreState.Tag>state.list.find((item: StoreState.Tag) => item._id === tag._id)).deleteing = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}