import axios from 'axios'
import * as config from '../config.js'

const service = axios.create({
  baseURL: config.API_ROOT
})

// 拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

export default service
