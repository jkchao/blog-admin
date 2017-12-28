import Vue from 'vue'
import ElementUI from 'element-ui'
import { mount } from 'vue-test-utils'

import Card from '@/components/card.vue'

Vue.use(ElementUI)

describe('App.vue', () => {
  let wrapper

  afterEach(() => {
    wrapper.destroy()
  })

  it('Has methods', () => {
    wrapper = mount(Card)
    expect(typeof wrapper.vm.toggle).toBe('function')
  })

  it('Has render props', () => {
    wrapper = mount(Card, {
      propsData: {
        width: '50px',
        type: [
          {
            name: '状态',
            typeName: 'state',
            list: [
              { name: '全部', id: '' },
              { name: '待审核', id: 0 },
              { name: '审核通过', id: 1 },
              { name: '审核不通过', id: 2 }
            ],
            default: ''
          }
        ],
        carLoading: true
      }
    })
    expect(wrapper.find('.text').hasStyle('width', '50px')).toBe(true)
    expect(wrapper.find('.el-loading-mask')).not.toBe(null)
    expect(wrapper.findAll('.el-radio-button--small').length).toBe(4)
    expect(wrapper.find('.el-radio-button--small').classes()).toContain('is-active')
  })

  it('Change event', () => {
    wrapper = mount(Card, {
      propsData: {
        width: '50px',
        type: [
          {
            name: '状态',
            typeName: 'state',
            list: [
              { name: '全部', id: '' },
              { name: '待审核', id: 0 },
              { name: '审核通过', id: 1 },
              { name: '审核不通过', id: 2 }
            ],
            default: ''
          }
        ],
        carLoading: false
      }
    })
    const radioGroup = wrapper.find('.el-radio-group')
    radioGroup.trigger('change')
    expect(wrapper.emitted().toggle).toBeTruthy()
  })

  it('Has the expected html structure', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
