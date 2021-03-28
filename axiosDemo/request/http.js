/**
 * axios 封装
 */
import axios from 'axios' // 引入 axios
import router from '../router'
import QS from 'qs' // 引入 qs 模块, 用于序列化 post 类型的数据，
import {Toast} from 'vant'
import store from '../store/index' // 导入 vuex，使用里面的状态对象

/**
 * 提示函数
 * 禁止点击蒙层，提示一秒后关闭
 */

const tip = msg => {
  Toast({
    message: msg,
    duration: 1000,
    forbidClick: true
  })
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败状态码
 */
const errorHandle = (status, other) => {
  switch (status) {
    // 401: 未登录； 未登录跳转至登录页面，并携带当前页面的路径
    case 401:
      toLogin()
      break
    // 403: token过期 登录过期对用户进行提示，清除本地token和清空vuex中的token对象，跳转至登录页
    case 403:
      tip('登录过期，请重新登录')
      // 清除token
      localStorage.removeItem('token')
      store.commit('loginSuccess', null)
      // 跳转页面，并把将要浏览的页面fullPath传送过去，登录成功后跳转至该页面
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
    // 404: 请求不存在
    case 404:
      tip('网络请求不存在')
      break
    // 其他错误，直接抛出错误提示
    default:
      console.log(other)
  }
}

// 创建 axios 实例
var instance = axios.create({timeout: 1000 * 12})

// 设置 post 请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;'

// 请求拦截
instance.interceptors.request.use(
  config => {
    // 每次发请求前判断 vuex 中是否存在 token
    // 如果存在，则统一在 http 请求的 header 中加上 token，后台通过 token 判断登录情况.
    // 即使本地存在 token，token 也有可能过期，因此要在响应拦截中对返回的状态进行判断.
    const token = store.state.token
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
instance.interceptors.response.use(
  response => {
    // 如果状态码返回200，表示接口请求成功，可以正常拿到数据
    // 否则就抛出错误
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    const {response} = error
    if (response) {
      // 服务器状态码不是 2 开头的情况
      // 这里需要和后台开发人员协商好统一的错误状态码
      // 然后根据状态码进行操作，比如提示登录过期，错误提示等
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // 请求超时或断网时，更新 state 的 network 状态
      // network 状态在 app.vue 中控制着一个全局的断网提示组件的显示和隐藏
      if (!window.navigator.onLine) {
        store.commit('changeNetwork', false)
      } else {
        return Promise.reject(error)
      }
    }
  }
)

export default instance


// 关于 token
/**
 * 一般在登录完成后，将用户的token通过localStorage或者cookie存在本地，用户每次进入页面的时候，会先从本地存储中读取token，如果token存在说明用户登录过，则更新vuex中的token状态。
 *
 * 然后再每次请求接口的时候，都在请求的header中携带token，后台根据携带的token判断登录是否过期
 *
 * 如果没有携带，说明没有登录过。
 */
