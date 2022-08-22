import store from '@/store'
export const imgError = {
  // 当被绑定的元素插入到dom中时
  inserted: function (el, { value }) {
    // 聚焦元素
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
  // 指令绑定的元素更新时触发
  update(el, { value }) {
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  }
}

export const isHas = {
  inserted(el, binding) {
    // console.log(binding);
    const has = store.state.permission.points.includes(binding.value)
    if (!has) {
      el.remove()
    }
  }
}
