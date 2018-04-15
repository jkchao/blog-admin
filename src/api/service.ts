import ax from './axios'

interface IParams {
  _id?: number
  current_page?: number
  page_size?: number
  keyword?: string
  state?: StoreState.State
}

// 登录
export function login (
  params: StoreState.Login
): Promise<Ajax.AjaxResponse> {
  return ax.post('/login', { ...params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 获取用户信息
export function getAuth (): Promise<Ajax.AjaxResponse> {
  return ax.get('/auth')
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 修改用户信息
export function putAuth (
  params: StoreState.User
): Promise<Ajax.AjaxResponse> {
  return ax.put('/auth', { ...params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 七牛
export function getQiniu (): Promise<Ajax.AjaxResponse> {
  return ax.get('/qiniu')
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 获取网站配置项
export function getOpt (): Promise<Ajax.AjaxResponse> {
  return ax.get('/option')
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 修改网站配置项
export function putOpt (
  params: StoreState.Option
): Promise<Ajax.AjaxResponse> {
  return ax.put('/option', { ...params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 留言墙列表
export function getHeros (
  params: IParams
): Promise<Ajax.AjaxResponse> {
  return ax.get('/hero', { params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 删除留言墙
export function deleteHero (
  params: { _id: string }
): Promise<Ajax.AjaxResponse> {
  return ax.delete(`/hero/${params._id}`)
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 留言墙状态
export function patchHero (
  params: { _id: string, state: StoreState.State }
): Promise<Ajax.AjaxResponse> {
  return ax.patch('/hero', { ...params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 标签列表
export function getTags (
  params: IParams
): Promise<Ajax.AjaxResponse> {
  return ax.get('/tag', { params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 增加标签
export function postTag (
  params: StoreState.Tag
): Promise<Ajax.AjaxResponse> {
  return ax.post('/tag', { ...params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 标签排序
export function patchTag (
  params: string[]
): Promise<Ajax.AjaxResponse> {
  return ax.patch(`/tag`, { ...params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 修改标签
export function putTag (
  params: StoreState.Tag
): Promise<Ajax.AjaxResponse> {
  return ax.put(`/tag/${params._id}`, { ...params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 删除标签
export function deleteTag (
  params: { _id: string }
): Promise<Ajax.AjaxResponse> {
  return ax.delete(`/tag/${params._id}`)
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 获取文章列表
export function getArts (
  params: IParams
): Promise<Ajax.AjaxResponse> {
  return ax.get('/article', { params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 获取单个文章
export function getArt (
  params: { _id: string }
): Promise<Ajax.AjaxResponse> {
  return ax.get(`/article/${params._id}`)
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 修改单个文章
export function putArt (
  params: StoreState.Article
): Promise<Ajax.AjaxResponse> {
  return ax.put(`/article/${params._id}`, { ...params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 删除文章
export function deleteArt (
  params: { _id: string }
): Promise<Ajax.AjaxResponse> {
  return ax.delete(`/article/${params._id}`)
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 添加文章
export function postArt (
  params: StoreState.Article
): Promise<Ajax.AjaxResponse> {
  return ax.post('/article', { ...params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 修改文章状态
export function patchArt (
  params: { _id: string, [index: string]: any }
): Promise<Ajax.AjaxResponse> {
  return ax.patch(`/article/${params._id}`, { ...params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 获取评论
export function getComments (params: IParams): Promise<Ajax.AjaxResponse> {
  return ax.get('/comment', { params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 删除单条评论
export function deleteComment (
  params: { _id: string, post_ids: string }
): Promise<Ajax.AjaxResponse> {
  return ax.delete(`/comment/${params._id}`, { params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 修改单条评论状态
export function putComment (
  params: { _id: string, state: StoreState.State, post_ids: string }
): Promise<Ajax.AjaxResponse> {
  return ax.put(`/comment/${params._id}`, { ...params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 书本列表
export function getBooks (
  params: IParams
): Promise<Ajax.AjaxResponse> {
  return ax.get('/book', { params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 增加书本
export function postBook (
  params: StoreState.Tag
): Promise<Ajax.AjaxResponse> {
  return ax.post('/book', { ...params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 书本修改状态
export function patchBook (
  params: { _id: string, state: StoreState.State }
): Promise<Ajax.AjaxResponse> {
  return ax.patch(`/book/${params._id}`, { ...params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 修改书本
export function putBook (
  params: StoreState.Tag
): Promise<Ajax.AjaxResponse> {
  return ax.put(`/book/${params._id}`, { ...params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 删除书本
export function deleteBook (
  params: { _id: string }
): Promise<Ajax.AjaxResponse> {
  return ax.delete(`/book/${params._id}`)
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 友链列表
export function getLinks (
  params: IParams
): Promise<Ajax.AjaxResponse> {
  return ax.get('/link', { params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 增加友链
export function postLink (
  params: StoreState.Link
): Promise<Ajax.AjaxResponse> {
  return ax.post('/link', { ...params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 友链修改状态
export function patchLink (
  params: { _id: string, state: StoreState.State }
): Promise<Ajax.AjaxResponse> {
  return ax.patch(`/link/${params._id}`, { ...params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 修改友链
export function putLink (
  params: StoreState.Link
): Promise<Ajax.AjaxResponse> {
  return ax.put(`/link/${params._id}`, { ...params })
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}

// 删除友链
export function deleteLink (
  params: { _id: string }
): Promise<Ajax.AjaxResponse> {
  return ax.delete(`/link/${params._id}`)
            .then((res: Ajax.AxiosResponse) => res.data)
            .catch((e: string) => console.error(e))
}
