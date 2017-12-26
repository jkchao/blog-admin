import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import { mount, createLocalVue } from 'vue-test-utils'

import Login from '@/pages/login'
import { destroyVm } from '../../utils/utils'

Vue.use(ElementUI)

// 独立 Vue 构造函数
const localVue = createLocalVue()

localVue.use(Vuex)

describe('login.vue', () => {
  let wrapper
  let actions
  let state
  let store

  afterEach(() => {
    destroyVm(wrapper.vm)
  })

  beforeEach(() => {
    state = {
      loading: true
    }
    actions = {
      login: jest.fn()
    }
    store = new Vuex.Store({
      state,
      actions
    })
  })

  it('Renders state.loading', () => {
    wrapper = mount(Login, { store, localVue })
    const btn = wrapper.find('.el-button')
    expect(btn.classes()).not.toContain('is-disabled')
  })

  it('Username and password should in page', async () => {
    wrapper = mount(Login, {
      store,
      localVue
    })
    const input = wrapper.findAll('.el-input')
    expect(input.length).toBe(2)
    wrapper.setData({
      form: {
        username: 'test username',
        password: 'test password'
      }
    })
    expect(wrapper.vm.form.username).toBe('test username')
    expect(wrapper.vm.form.password).toBe('test password')
  })

  it('has the expected html structure', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
