import axios from 'axios' // 引入 axios
import QS from 'qs' // 引入 qs 模块, 用于序列化 post 类型的数据，
import {Toast} from 'vant'
import store from '@/store/index' // 导入 vuex，使用里面的状态对象

// 环境的切换
if(process.env.NODE_ENV === 'development'){
  axios.defaults.baseURL = 'https://www.baidu.com'
}else if(process.env.NODE_ENV === 'debug'){
  axios.defaults.baseURL = 'https://www.ceshi.com'
}else if(process.env.NODE_ENV === 'production'){
  axios.defaults.baseURL = 'https://www.production.com'
}

// 设置请求超时
axios.defaults.timeout = 10000

// 设置 post 请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;'

// 请求拦截
axios.interceptors.request.use(
  config => {
    // 每次发请求前判断 vuex 中是否存在 token
    // 如果存在，则统一在 http 请求的 header 中加上 token，后台通过 token 判断登录情况.
    // 即使本地存在 token，token 也有可能过期，因此要在响应拦截中对返回的状态进行判断.
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
axios.interceptors.response.use(
  response => {
    // 如果状态码返回200，表示接口请求成功，可以正常拿到数据
    // 否则就抛出错误
    if(response.status === 200){
      return Promise.resolve(response)
    }else{
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是 2 开头的情况
  // 这里需要和后台开发人员协商好统一的错误状态码
  // 然后根据状态码进行操作，比如提示登录过期，错误提示等
  error => {
    if(error.response.status){
      switch (error.response.status) {
        // 401: 未登录； 未登录跳转至登录页面，并携带当前页面的路径
        case 401:
          router.replace({
            path:'/login',
            query:{
              redirect:router.currentRoute.fullPath
            }
          });
          break;
        // 403: token过期 登录过期对用户进行提示，清除本地token和清空vuex中的token对象，跳转至登录页
        case 403:
          Toast({
            message:'登录过期，请重新登录',
            duration:1000,
            forbidClick:true
          })
          // 清除token
          localStorage.removeItem('token')
          store.commit('loginSuccess',null)
          // 跳转页面，并把将要浏览的页面fullPath传送过去，登录成功后跳转至该页面
          setTimeout(()=>{
            router.replace({
              path:'/login',
              query:{
                redirect:router.currentRoute.fullPath
              }
            });
          },1000)
          break;
        // 404: 请求不存在
        case 404:
          Toast({
            message:'网络请求不存在',
            duration:1500,
            forbidClick:true
          })
          break;
        // 其他错误，直接抛出错误提示
        default:
          Toast({
            message:error.response.data.message,
            duration:1500,
            forbidClick:true
          })
      }
      return Promise.reject(error.response)
    }
  }
)

// 封装 get 方法 和 post 方法
/** get 方法 对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @returns {Promise<unknown>}
 */
export function get(url,params){
  return new Promise((resolve,reject)=>{
    axios.get(url,{
      params:params
    }).then(result=>{
      resolve(result.data)
    }).catch(error=>{
      reject(error.data)
    })
  })
}

/** post 方法，对应 post 请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @returns {Promise<unknown>}
 *
 * 这里需要注意的是
 * post方法必须要对提交的参数对象进行序列化操作，这里使用了 node 的 qs 模块进行序列化
 */
export function post(url,params){
  return new Promise((resolve,reject)=>{
    axios.post(url,QS.stringify(params))
      .then(result=>{
        resolve(result.data)
      })
      .catch(error=>{
        reject(error.data)
      })
  })
}
// 小细节：
// axios.get 方法和 axios.post 方法 在提交数据的时候参数的书写方式有细微差别
// get 的 第二个参数是一个{}，这个对象的 params 属性就是参数对象。
// post 的第二个参数就是一个参数对象。





// 关于 token
/**
 * 一般在登录完成后，将用户的token通过localStorage或者cookie存在本地，用户每次进入页面的时候，会先从本地存储中读取token，如果token存在说明用户登录过，则更新vuex中的token状态。
 *
 * 然后再每次请求接口的时候，都在请求的header中携带token，后台根据携带的token判断登录是否过期
 *
 * 如果没有携带，说明没有登录过。
 */
