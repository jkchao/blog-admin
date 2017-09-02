
import server from '../utils/axios'
import querystring from 'querystring'

export const login = async ({ commit }, user) => {
  const { data } = await server.post('/auth', querystring.stringify({...user}))
  console.log(data)
  if (data.code === 1) {
    window.localStorage.setItem('TOKEN', data.result.token)
  }
  return data
}
