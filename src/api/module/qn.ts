import ax from '../axios'

// 七牛
export function getQiniu (): Promise<Ajax.AjaxResponse> {
  return ax.get('/qiniu')
            .then(res => res.data)
            .catch(e => console.error(e))
}
