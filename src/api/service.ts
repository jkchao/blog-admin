import ax from './axios'

interface Params {
  readonly id?: string,
  readonly [propName: string]: any
} 

// 登录
export function login (data: Params): Promise<Boolean> {
  return ax.post('/login', { ...data })
        .then(res => res.data)
}

// 获取用户信息
export function getAuth (): Promise<Boolean> {
  return ax.get('/auth')
        .then(res => res.data)
}

// 修改用户信息
export function putAuth (data: Params): Promise<Boolean> {
  return ax.put('/auth', { ...data })
        .then(res => res.data)
}

// 七牛
export function getQiniu (): Promise<Boolean> {
  return ax.get('/qiniu')
        .then(res => res.data)
}

// 获取网站配置项
export function getOpt (): Promise<Boolean> {
  return ax.get('/option')
        .then(res => res.data)
}

// 修改网站配置项
export function putOpt (data: Params): Promise<Boolean> {
  return ax.put('/option', { ...data })
        .then(res => res.data)
}

// 留言墙列表
export function getHero (params: Params): Promise<Boolean> {
  return ax.get('/hero', { params })
        .then(res => res.data)
}

// 删除留言墙
export function deleteHero (data: Params): Promise<Boolean> {
  return ax.delete(`/hero/${data._id}`)
        .then(res => res.data)
}

// 留言墙状态
export function patchHero (data: Params): Promise<Boolean> {
  return ax.patch('/hero', { ...data })
        .then(res => res.data)
}

// 标签列表
export function getTag (params: Params): Promise<Boolean> {
  return ax.get('/tag', { params })
        .then(res => res.data)
}

// 增加标签
export function postTag (data: Params): Promise<Boolean> {
  return ax.post('/tag', { ...data })
        .then(res => res.data)
}

// 标签排序
export function patchTag (data: Params): Promise<Boolean> {
  return ax.patch(`/tag`, { ...data })
        .then(res => res.data)
}

// 修改标签
export function putTag (data: Params): Promise<Boolean> {
  return ax.put(`/tag/${data._id}`, { ...data })
        .then(res => res.data)
}

// 删除标签
export function deleteTag (data: Params): Promise<Boolean> {
  return ax.delete(`/tag/${data._id}`)
        .then(res => res.data)
}

// 获取文章列表
export function getArts (params: Params): Promise<Boolean> {
  return ax.get('/article', { params })
        .then(res => res.data)
}

// 获取单个文章
export function getArt (data: Params): Promise<Boolean> {
  return ax.get(`/article/${data._id}`)
        .then(res => res.data)
}

// 修改单个文章
export function putArt (data: Params): Promise<Boolean> {
  return ax.put(`/article/${data._id}`, { ...data })
        .then(res => res.data)
}

// 删除文章
export function deleteArt (data: Params): Promise<Boolean> {
  return ax.delete(`/article/${data._id}`)
        .then(res => res.data)
}

// 添加文章
export function postArt (data: Params): Promise<Boolean> {
  return ax.post('/article', { ...data })
          .then(res => res.data)
}

// 修改文章状态
export function patchArt (data: Params): Promise<Boolean> {
  return ax.patch(`/article/${data._id}`, { ...data })
          .then(res => res.data)
}

// 获取评论
export function getComments (params: Params): Promise<Boolean> {
  return ax.get('/comment', { params })
        .then(res => res.data)
}

// 删除单条评论
export function deleteComment (params: Params): Promise<Boolean> {
  return ax.delete(`/comment/${params._id}`, { params })
            .then(res => res.data)
}

// 修改单条评论状态
export function patchComment (data: Params): Promise<boolean> {
  return ax.patch(`/comment/${data._id}`, {...data})
            .then(res => res.data)
}
