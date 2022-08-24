import axios from 'axios'
import { Toast } from 'antd-mobile'
import { getToken } from './storeage'
import history from './history'

const instance = axios.create({
  timeout: 5000,
  baseURL: 'http://geek.itheima.net/v1_0',
})
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    const token = getToken().token || ''
    config.headers['Authorization'] = `Bearer ${token}`
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    //如果是网络原因，没有response，则提示网络繁忙
    if (!error.response) {
      Toast.show({
        content: '网络繁忙，请稍后重试',
        maskClickable: false,
      })
      return Promise.reject(error)
    }
    //走到这里就说明有response
    const { response } = error
    if (response.status !== 401) {
      // 不是token失效的问题
      Toast.show({
        content: response.data.message,
        maskClickable: false,
      })
      return Promise.reject(error)
    }
    //走到这里，且返回401说明是token有问题
    //1.判断 有没有refresh_token
    const { refresh_token } = getToken()
    if (!refresh_token) {
      history.push({
        pathname: '/home',
        state: {
          from: history.location.pathname,
        },
      })
      return Promise.reject(error)
    }
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance
