import ax from '../axios'

// 标签列表
export function getTags (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.get('/tag', { params })
            .then(res => res.data)
            .catch(e => console.error(e))
}

// 增加标签
export function postTag (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.post('/tag', { ...params })
            .then(res => res.data)
            .catch(e => console.error(e))
}

// 标签排序
export function patchTag (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.patch(`/tag`, { ...params })
            .then(res => res.data)
            .catch(e => console.error(e))
}

// 修改标签
export function putTag (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.put(`/tag/${params._id}`, { ...params })
            .then(res => res.data)
            .catch(e => console.error(e))
}

// 删除标签
export function deleteTag (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.delete(`/tag/${params._id}`)
            .then(res => res.data)
            .catch(e => console.error(e))
}
