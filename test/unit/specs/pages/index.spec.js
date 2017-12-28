import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import { mount, createLocalVue } from 'vue-test-utils'

import Index from '@/pages/index'

// 独立 Vue 构造函数
const localVue = createLocalVue()

Vue.use(ElementUI)
localVue.use(Vuex)

// 声明一个 $route 对象
const $route = {
  path: '/index',
  matched: [
    { name: '' }
  ]
}
const $router = {
  options: {
    routes: [
      {
        meta: { leaf: true },
        children: [
          { path: '/login' }
        ]
      }
    ]
  },
  push: jest.fn()
}

describe('index.vue', () => {
  let wrapper
  let state
  let store

  afterEach(() => {
    wrapper.destroy()
  })

  beforeEach(() => {
    state = {
      user: {
        gravatar: 'https://'
      }
    }
    store = new Vuex.Store({
      state
    })
  })

  it('Default data', () => {
    wrapper = mount(Index, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      }
    })
    expect(wrapper.vm.defaultPath).toBe('/index')
    expect(wrapper.vm.currentPathName).toBe('')
    expect(wrapper.vm.currentPathNameParent).toBe('')
  })

  it('Render "state user"', () => {
    wrapper = mount(Index, {
      store,
      localVue
    })
    const face = wrapper.vm.$el.querySelector('.user-face-box img')
    expect(face.getAttribute('src')).toBe('https://?imageView2/1/w/36/h/36')
  })

  it('Route change', () => {
    wrapper = mount(Index, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      }
    })
    wrapper.vm.$route = {
      path: '/login',
      matched: [
        { name: '' }
      ]
    }
    expect(wrapper.vm.defaultPath).toBe('/login')
    expect(wrapper.vm.currentPathName).toBe('')
    expect(wrapper.vm.currentPathNameParent).toBe('')
  })

  it('Has the expected html structure', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
