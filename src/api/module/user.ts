import ax from '../axios'

// 登录
export function login (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.post('/login', params)
            .then(res => res.data)
            .catch(e => console.error(e))
}

// 获取用户信息
export function getAuth (
  params?: any
): Promise<Ajax.AjaxResponse> {
  return ax.get('/auth')
            .then(res => res.data)
            .catch(e => console.error(e))
}

// 修改用户信息
export function putAuth (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.put('/auth', params)
            .then(res => res.data)
            .catch(e => console.error(e))
}

// 获取网站配置项
export function getOpt (): Promise<Ajax.AjaxResponse> {
  return ax.get('/option')
            .then(res => res.data)
            .catch(e => console.error(e))
}

// 修改网站配置项
export function putOpt (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.put('/option', params)
            .then(res => res.data)
            .catch(e => console.error(e))
}
