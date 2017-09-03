export function loginIn () {
  if (!window.localStorage.getItem('TOKEN')) return false
  const lifeTime = JSON.parse(window.localStorage.getItem('TOKEN')).lifeTime * 1000
  const nowTime = (new Date()).getTime()
  if (nowTime > lifeTime) return false
  return true
}
