export const imgError = {
  // 当被绑定的元素插入到dom中时
  inserted: function (el, { value }) {
    // 聚焦元素
    el.onerror = function () {
      el.src = value
    }
  }
}

export const aa = {
  inserted: function () {}
}

export const bb = {
    inserted: function () {}
  }
