// 通过 plugin 创建 toast
import Toast from '../toast.vue'

let currentToast

export default {
  install(Vue, options={}) {
    Vue.prototype.$toast = function () {
      if (currentToast) {currentToast.close()}
      currentToast = createToast({
        Vue,
        options
      })
    }
  }
}

function createToast({Vue, options}) {
  // 动态创建 toast 实例
  let Constructor = Vue.extend(Toast)
  let toast = new Constructor(options)
  toast.$mount()
  document.body.appendChild(toast.$el)
  return toast
}



