import { Notification } from 'element-ui'

export function error (message) {
  Notification.error({
    title: '错误',
    message
  })
}

export function success (message) {
  Notification.success({
    title: '成功',
    duration: 2000,
    message
  })
}
