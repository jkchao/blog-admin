/**
 * 摧毁 vm
 *
 * @export
 * @param {any} vm
 */
export function destroyVm (vm) {
  vm.$destroy && vm.$destroy()
  vm.$el &&
  vm.$el.parentNode &&
  vm.$el.parentNode.removeChild(vm.$el)
}

/**
 * 挂载元素并返回 vm
 *
 * @export
 * @param {any} Component
 * @param {any} propsData
 * @returns
 */
export function getRenderedText (Component, propsData) {
  return new Component({ propsData: propsData }).$mount()
}
