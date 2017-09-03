import { Notification } from 'element-ui'

export function error (message) {
  Notification.error({
    title: '错误',
    message
  })
}
