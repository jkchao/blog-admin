/**
 * 文章
 */

import { ActionTree, MutationTree } from 'vuex'

import { success, error } from '../../utils/response'
import service from '../../api'

interface State {
  fetch: boolean;
  posting: boolean;
  list: StoreState.Article[];
  total: number;
  detail: StoreState.Article;
}

interface Params {
  tag: string;
  page_size: number;
  current_page: number;
  keyword?: string;
  state?: StoreState.State;
  publish?: StoreState.State;
  type?: StoreState.State;
}

const state: State = {
  posting: false,
  fetch: false,
  list: [],
  total: 0,
  detail: {
    title: '',
    keyword: '',
    thumb: '',
    state: 0,
    publish: 0,
    type: 0,
    descript: '',
    tag: []
  }
}

const actions: ActionTree<State, any> = {

  // 获取列表
  async getArts (
    { commit },
    data: Params
  ): Promise<Ajax.AjaxResponse> {
    commit('REQUEST_LIST')
    const res: Ajax.AjaxResponse = await service.getArts(data)
    if (res && res.code === 1) {
      const list: StoreState.Article[] = res.result.list.map((item: StoreState.Article ) => {
        return { ...item, deleteing: false }
      })
      const total: number = res.result.pagination.total
      commit('REQUEST_LIST_SUCCESS', { list, total })
    } else commit('REQUEST_LIST_FAIL')
    return res
  },

  // 获取单个文章
  async getArt (
    { commit },
    params: { _id: string }
  ): Promise<void> {
    commit('REQUEST_LIST')
    const res: Ajax.AjaxResponse = await service.getArt(params)
    if (res && res.code === 1) {
      commit('REQUEST_DETAIL_SUCCESS', res.result)
    }
    else error('REQUEST_DETAIL_FAIL')
  },

  // 添加文章
  async postArt (
    { commit },
    Article: StoreState.Article
  ): Promise<Ajax.AjaxResponse> {
    commit('POST_ARTICLE')
    const res = await service.postArt(Article)
    if (res && res.code === 1) success('添加文章成功')
    else error('添加文章失败')
    commit('POST_ARTICLE_FINAL')
    return res
  },

  // 修改文章
  async putArt (
    { commit },
    Article: StoreState.Article
  ): Promise<Ajax.AjaxResponse> {
    commit('POST_ARTICLE')
    const res = await service.putArt(Article)
    if (res && res.code === 1) success('修改文章成功')
    else error('修改文章失败')
    commit('POST_ARTICLE_FINAL')
    return res
  },

  // 改变状态
  async patchArt (
    { commit },
    Article: { _id: string; state?: StoreState.State; publish?: StoreState.State; [index: string]: any; }
  ): Promise<Ajax.AjaxResponse> {
    const res: Ajax.AjaxResponse = await service.patchArt(Article)
    if (res && res.code === 1) {
      success('修改成功')
      commit('PATCH_HERO_SUCCESS', Article)
    } else error(res.message)
    return res
  },

  // 删除
  async deleteArt (
    { commit },
    Article: { _id: string }
  ): Promise<Ajax.AjaxResponse> {
    commit('DELETE_ARTICLE', Article)
    const res: Ajax.AjaxResponse = await service.deleteArt(Article)
    if (res && res.code === 1) success('删除成功')
    else error(res.message)
    commit('DELETE_ARTICLE_FINAL', Article)
    return res
  }
}

const mutations: MutationTree<State> = {
  'REQUEST_LIST' (state: State): void {
    state.fetch = true
  },

  'REQUEST_LIST_SUCCESS' (
    state: State,
    payload: { list: StoreState.Article[], total: number }
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

  'DELETE_ARTICLE' (
    state: State,
    Article: { _id: string }
  ): void {
    (<StoreState.Article>state.list.find((item: StoreState.Article) => item._id === Article._id)).deleteing = true
  },

  'DELETE_ARTICLE_FINAL' (
    state: State,
    Article: { _id: string }
  ): void {
    (<StoreState.Article>state.list.find((item: StoreState.Article) => item._id === Article._id)).deleteing = false
  },

  'PATCH_HERO_SUCCESS' (
    state: State,
    Article: { _id: string; state?: StoreState.State; publish?: StoreState.State; [index: string]: any }
  ): void {
    let list: StoreState.Article = (<StoreState.Article>state.list.find((item: StoreState.Article) => item._id === Article._id))
    for (let i in Article) {
      list[i] = Article[i]
    }
  },

  'REQUEST_DETAIL_SUCCESS' (
    state: State,
    Article: StoreState.Article
  ): void {
    state.detail = { ...Article }
    state.fetch = false
  },

  'REQUEST_DETAIL_FAIL' (state: State) {
    state.fetch = false
  },

  'POST_ARTICLE' (state: State) {
    state.posting = true
  },

  'POST_ARTICLE_FINAL' (state: State) {
    state.posting = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}