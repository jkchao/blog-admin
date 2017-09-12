import ax from './axios'

// 登录
export function login (data) {
  return ax.post('/login', { ...data })
        .then(res => res.data)
}

// 获取用户信息
export function getAuth () {
  return ax.get('/auth')
        .then(res => res.data)
}

// 修改用户信息
export function putAuth (data) {
  console.log(data)
  return ax.put('/auth', { ...data })
        .then(res => res.data)
}

// 七牛
export function getQiniu () {
  return ax.get('/qiniu')
        .then(res => res.data)
}

// 获取网站配置项
export function getOpt () {
  return ax.get('/option')
        .then(res => res.data)
}

// 修改网站配置项
export function putOpt (data) {
  return ax.put('/option', { ...data })
        .then(res => res.data)
}

// 英雄版列表
export function getHero (params) {
  return ax.get('/hero', { params })
        .then(res => res.data)
}

// 删除英雄榜
export function deleteHero (data) {
  return ax.delete(`/hero/${data._id}`)
        .then(res => res.data)
}

// 英雄版状态
export function patchHero (data) {
  return ax.patch('/hero', { ...data })
        .then(res => res.data)
}

// 标签列表
export function getTag (params) {
  return ax.get('/tag', { params })
        .then(res => res.data)
}

// 增加标签
export function postTag (data) {
  return ax.post('/tag', { ...data })
        .then(res => res.data)
}

// 标签排序
export function patchTag (data) {
  return ax.patch(`/tag`, { ...data })
        .then(res => res.data)
}

// 修改标签
export function putTag (data) {
  return ax.put(`/tag/${data._id}`, { ...data })
        .then(res => res.data)
}

// 删除标签
export function deleteTag (data) {
  return ax.delete(`/tag/${data._id}`)
        .then(res => res.data)
}

// 获取文章
export function getArt (params) {
  return ax.get('/article', { params })
        .then(res => res.data)
}

export function deleteArt (data) {
  return ax.delete(`/article/${data._id}`)
        .then(res => res.data)
}

// 添加文章
export function postArt (data) {
  return ax.post('/article', { ...data })
          .then(res => res.data)
}

// 修改文章状态
export function patchArt (data) {
  return ax.patch(`/article/${data._id}`, { ...data })
          .then(res => res.data)
}

