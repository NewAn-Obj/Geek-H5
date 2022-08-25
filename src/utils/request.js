import axios from 'axios'
import { Toast } from 'antd-mobile'
import { getToken, setToken } from './storeage'
import history from './history'
import store from '../store'
import { logout, saveToken } from '../store/action/login'

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
  async function (error) {
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
    //2.是401错误 且有刷新token
    // 尝试发请求。获取新的token，但是由于instance 是我们自己封装的，有请求拦截器，所以获取新的token只能用原生axios
    try {
      const res = await axios({
        method: 'put',
        url: 'http://geek.itheima.net/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${refresh_token}`,
        },
      })
      //获取新的token
      //保存token，但是我们拿回来的data里面只有token，而没有refresh_token，所以，保存token时要携带refresh_token，否则refresh_token将被覆盖为空值
      const newToken = {
        refresh_token,
        token: res.data.data.token,
      }
      //保存token到redux
      store.dispatch(saveToken(newToken))
      //保存token到LocalStoreage
      setToken(newToken)
      console.log(newToken)
      console.log(getToken())
      //token保存后，重新发请求，获取数据（否则客户需要手动刷新页面能拿到数据
      //erorr.config里面有我们第一次发请求的所有所需配置
      return instance(error.config)
    } catch (err) {
      //获取新的token失败，refresh_token过期
      // console.log(err, 'err')
      store.dispatch(logout())
      history.push({
        pathname: '/login',
        state: {
          from: history.location.pathname,
        },
      })
      Toast.show({
        content: '身份过期，请重新登录',
      })
      return Promise.reject(error)
    }
  }
)

export default instance
