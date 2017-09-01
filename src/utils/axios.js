import axios from 'axios'
import * as config from '../config.js'
// import router from '../router'

const service = axios.create({
  baseURL: config.API_ROOT
})

// 拦截器
service.interceptors.request.use(config => {
  if (window.localStorage.getItem('TOKEN')) {
    config.headers.Authorization = window.localStorage.getItem('TOKEN')
  }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  // if (response.data.code === 2) router.push('/login')
  return response
}, error => {
  return Promise.reject(error)
})

export default service
