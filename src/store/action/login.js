import request from '../../utils/request'

export const getCode = (mobile) => {
  return async () => {
    await request.get(`/sms/codes/${mobile}`)
  }
}
