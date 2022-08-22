import request from '../../utils/request'

const saveUserInfo = (data) => {
  return {
    type: 'profile/user',

    payload: data,
  }
}

export const getUserInfo = () => {
  return async (dispatch) => {
    const res = await request.get('/user')
    dispatch(saveUserInfo(res.data))
    // console.log(res.data)
  }
}
