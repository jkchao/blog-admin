
import ax from '../axios'

// 登录
export function login (params?: any): Promise<Ajax.AjaxResponse> {
  return ax.post('/login', params)
           .then(res => res.data)
           .catch(error => console.error)
}

// 获取用户信息
export function getAuth (params?: any): Promise<Ajax.AjaxResponse> {
  return ax.get('/auth', { params })
           .then(res => res.data)
           .catch(error => console.error)
}

// 修改用户信息
export function putAuth (params?: any): Promise<Ajax.AjaxResponse> {
  return ax.put('/auth', params)
           .then(res => res.data)
           .catch(error => console.error)
}

