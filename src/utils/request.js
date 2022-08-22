import axios from 'axios'
import { Toast } from 'antd-mobile'

const instance = axios.create({
  timeout: 5000,
  baseURL: 'http://geek.itheima.net/v1_0',
})
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
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
    if (error.response) {
      Toast.show({
        content: error.response.data.message,
        maskClickable: false,
      })
    } else {
      Toast.show({
        content: '网络繁忙，请稍后重试',
        maskClickable: false,
      })
    }

    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance
