import ax from '../axios'

// 留言墙列表
export function getHeros (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.get('/hero', { params })
            .then(res => res.data)
            .catch(e => console.error(e))
}

// 删除留言墙
export function deleteHero (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.delete(`/hero/${params._id}`)
            .then(res => res.data)
            .catch(e => console.error(e))
}

// 留言墙状态
export function patchHero (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.patch('/hero', { ...params })
            .then(res => res.data)
            .catch(e => console.error(e))
}
