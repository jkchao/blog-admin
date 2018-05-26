import Ax from './axios'

// 登录
export function login (params: any): Promise<Ajax.AjaxResponse> {
  return Ax.post('/login', { ...params })
           .then(res => res.data)
           .catch(error => console.error)
}

// 获取用户信息
export function getInfo (params: any): Promise<Ajax.AjaxResponse> {
  return Ax.get('/getInfo', { params })
           .then(res => res.data)
           .catch(error => console.error)
}

