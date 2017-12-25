import Login from '@/pages/login'
import { destroyVm } from '../../utils/utils'

describe('login.vue', () => {
  let vm
  afterEach(() => {
    // destroyVm(vm)
  })

  it('has a mounted hook', () => {
    const options = Login.extendOptions
    expect(typeof options.mounted).toBe('function')
  })

  it('has methods function', () => {
    vm = new Login()
    expect(typeof vm.$options.methods).toBe('object')
    expect(typeof vm.submit).toBe('function')
    expect(typeof vm.buildBackground).toBe('function')
  })

  it('sets the correct default data', () => {
    vm = new Login()
    expect(vm.form.password).toBe('')
    expect(vm.form.username).toBe('')
  })
})
