import Vue from 'vue'
import ElementUI from 'element-ui'

import { destroyVm, getRenderedText } from '../../utils/utils'
import Card from '@/components/card.vue'

Vue.use(ElementUI)

describe('App.vue', () => {
  let vm

  afterEach(() => {
    destroyVm(vm)
  })

  it('has methods', () => {
    vm = new Card()
    expect(typeof vm.toggle).toBe('function')
  })

  it('has render props', done => {
    vm = getRenderedText(Card, {
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
          default: '全部'
        }
      ],
      carLoading: true
    })
    Vue.nextTick(() => {
      expect(vm.$el.querySelector('.text').style.width).toBe('50px')
      expect(vm.$el.querySelector('.el-loading-mask')).not.toBe(null)
      expect(vm.$el.querySelectorAll('.el-radio-button--small').length).toBe(4)
      done()
    })
  })

  it('change event', done => {
    vm = getRenderedText(Card, {
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
          default: '全部'
        }
      ],
      carLoading: false
    })
    Vue.nextTick(() => {
      // vm.$el.querySelector('.el-radio-button').trigger('click')
      // vm.$el.querySelector('.el-radio-button').trigger('click')
      console.log(vm.$el.querySelector('.el-radio-button').click())
      // expect(vm.toggle).toBeCalled()
      done()
    })
  })
})
