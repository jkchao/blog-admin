/**
 * 是否已经登录或者 token 超时
 *
 * @export
 * @returns { boolean }
 */
export function checkLogin(): boolean {
  if (
    !window.localStorage.getItem('TOKEN') ||
    !JSON.parse(window.localStorage.getItem('TOKEN') || '').lifeTime
  ) {
    return false;
  }
  const lifeTime =
    JSON.parse(window.localStorage.getItem('TOKEN') || '').lifeTime * 1000;
  const nowTime = new Date().getTime();
  if (nowTime > lifeTime) return false;
  return true;
}
