import App from '@/layout/App'

describe('App.vue', () => {
  it('has a beforeCreate hook', () => {
    const options = App.extendOptions
    expect(typeof options.beforeCreate).toBe('function')
  })
})
