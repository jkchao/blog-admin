import { success, error } from '../utils/response'
import service from '../api'

// 登录
export const login = async ({ commit }, user) => {
  const res = await service.login({...user})
  if (res.code === 1) {
    window.localStorage.setItem('TOKEN', JSON.stringify(res.result))
    success('登录成功')
  } else error(res.message)
  return res.result
}

// 用户信息初始化
export const init = async ({ state, commit }, user) => {
  if (!state.user) {
    const res = await service.getAuth()
    if (res.code === 1) commit('INIT', { ...res.result })
  } else commit('INIT', { ...user })
}

// 修改用户信息
export const setAuth = async ({ commit }, data) => {
  const res = await service.putAuth({...data})
  if (res.code !== 1) error(res.message)
  else success('修改用户信息成功')
  return res.result
}

// 七牛
export const getQiniu = async ({ commit }) => {
  const res = await service.getQiniu()
  return res.result
}

// 获取网站基本信息
export const getOpt = async ({ commit }) => {
  const res = await service.getOpt()
  if (res.code !== 1) error(res.message)
  return res.result
}

// 更改网站基本信息
export const putOpt = async ({ commit }, data) => {
  const res = await service.putOpt({ ...data })
  if (res.code !== 1) error(res.message)
  else success('修改网站信息成功')
  return res.result
}
