/**
 * 标签数据
 */

import { ActionContext, Store } from 'vuex'

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
}

const state: State = {
  posting: false,
  fetch: false,
  list: [],
  total: 0
}

const actions = {

  // 获取标签
  async getTag (context: ActionContext<State, any>, data: Params): Promise<void> {
    context.commit('REQUEST_LIST')
    const res: Ajax.AjaxResponse = await service.getTag(data)
    if (res && res.code === 1) {
      const list: StoreState.Tag[] = res.result.list.map((item: StoreState.Tag ) => {
        return { ...item, deleteing: false }
      })
      const total: number = res.result.pagination.total
      context.commit('REQUEST_LIST_SUCCESS', { list, total })
    } else context.commit('REQUEST_LIST_FAIL')
  },

  // 添加标签
  async postTag (context: ActionContext<State, any>, tag: StoreState.Tag): Promise<Ajax.AjaxResponse> {
    context.commit('POST_TAG')
    const res: Ajax.AjaxResponse = await service.postTag(tag)
    if (res && res.code === 1) success('添加标签成功')
    else error(res.message)
    context.commit('POST_TAG_FINAL')
    return res
  },

  // 修改标签
  async putTag(context: ActionContext<State, any>, tag: StoreState.Tag): Promise<void> {
    context.commit('POST_TAG')
    const res: Ajax.AjaxResponse = await service.putTag(tag)
    if (res && res.code === 1) {
      success('修改标签成功')
      context.commit('POST_TAG_SUCCESS', tag)
    } else error(res.message)
    context.commit('POST_TAG_FINAL')
  },

  // 标签排序
  async patchTag(context: ActionContext<State, any>, ids: Array<string>): Promise<void> {
    const res: Ajax.AjaxResponse = await service.putTag(ids)
    if (res && res.code === 1) {
      success('标签排序成功')
    } else error(res.message)
  },

  // 删除标签
  async deleteTag(context: ActionContext<State, any>, tag: StoreState.Tag): Promise<Ajax.AjaxResponse> {
    context.commit('DELETE_TAG', tag)
    const res: Ajax.AjaxResponse = await service.deleteTag(tag)
    if (res && res.code === 1) success('删除成功')
    else error(res.message)
    context.commit('DELETE_TAG_FINAL', tag)
    return res
  }
}

const mutations = {
  'REQUEST_LIST' (state: State) {
    state.fetch = true
  },

  'REQUEST_LIST_SUCCESS' (state: State, payload: { list: StoreState.Tag[], total: number }) {
    state.fetch = false
    state.list = payload.list
    state.total = payload.total
  },

  'REQUEST_LIST_FAIL' (state: State) {
    state.fetch = false
    state.list = []
    state.total = 0
  },

  'POST_TAG' (state: State) {
    state.posting = true
  },

  'POST_TAG_FINAL' (state: State) {
    state.posting = false
  },

  'POST_TAG_SUCCESS' (state: State, tag: StoreState.Tag) {
    let item: StoreState.Tag = <StoreState.Tag>(state.list.find((item: StoreState.Tag) => item._id === tag._id))
    if (item) {
      item.name = tag.name
      item.descript = tag.descript
    }
  },

  'DELETE_TAG' (state: State, tag: StoreState.Tag) {
    (<StoreState.Tag>state.list.find((item: StoreState.Tag) => item._id === tag._id)).deleteing = true
  },

  'DELETE_TAG_FINAL' (state: State, tag: StoreState.Tag) {
    (<StoreState.Tag>state.list.find((item: StoreState.Tag) => item._id === tag._id)).deleteing = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}