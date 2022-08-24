import request from '../../utils/request'
import { removeToken, setToken } from '../../utils/storeage'

/**
 * 获取验证码
 * @param {*} mobile
 * @returns
 */
export const getCode = (mobile) => {
  return async () => {
    await request.get(`/sms/codes/${mobile}`)
  }
}

/**
 * 登录
 * @param {*} data
 * @returns
 */
export const login = (data) => {
  return async (dispatch) => {
    const res = await request.post('/authorizations', data)
    console.log(res)
    dispatch(saveToken(res.data))
    setToken(res.data)
  }
}

const saveToken = (payload) => {
  return {
    type: 'login/token',
    payload,
  }
}
const delToken = () => {
  return {
    type: 'login/logout',
  }
}
export const logout = () => {
  return (dispatch) => {
    removeToken()
    dispatch(delToken())
  }
}
