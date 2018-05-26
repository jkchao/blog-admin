import ax from '../axios'

// 获取文章列表
export function getArts (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.get('/article', { params })
            .then(res => res.data)
            .catch(e => console.error(e))
}

// 获取单个文章
export function getArt (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.get(`/article/${params._id}`)
            .then(res => res.data)
            .catch(e => console.error(e))
}

// 修改单个文章
export function putArt (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.put(`/article/${params._id}`, { ...params })
            .then(res => res.data)
            .catch(e => console.error(e))
}

// 删除文章
export function deleteArt (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.delete(`/article/${params._id}`)
            .then(res => res.data)
            .catch(e => console.error(e))
}

// 添加文章
export function postArt (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.post('/article', { ...params })
            .then(res => res.data)
            .catch(e => console.error(e))
}

// 修改文章状态
export function patchArt (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.patch(`/article/${params._id}`, { ...params })
            .then(res => res.data)
            .catch(e => console.error(e))
}
