import axios from 'axios'
import * as config from '../config.js'
import router from '../router'
import querystring from 'querystring'

const service = axios.create({
  baseURL: config.API_ROOT
})

// 拦截器
service.interceptors.request.use(config => {
  if (
    config.method === 'post' ||
    config.method === 'put' ||
    config.method === 'delete'
  ) {
    config.data = querystring.stringify(config.data)
    if (window.localStorage.getItem('TOKEN')) {
      config.headers.Authorization = JSON.parse(window.localStorage.getItem('TOKEN')).token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  if (response.data.code === -2) router.push('/login')
  return response
}, error => {
  return Promise.reject(error)
})

export default service
