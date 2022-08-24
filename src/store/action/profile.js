import request from '../../utils/request'

const saveUserInfo = (data) => {
  return {
    type: 'profile/user',

    payload: data,
  }
}
const saveUserProfile = (data) => {
  return {
    type: 'profile/profile',

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
export const getUserProfile = () => {
  return async (dispatch) => {
    const res = await request.get('/user/profile')
    dispatch(saveUserProfile(res.data))
    // console.log(res.data)
  }
}

export const updataUser = (user) => {
  return async (dispatch) => {
    await request.patch('/user/profile', user)
    dispatch(getUserProfile())
  }
}
export const updataPhoto = (fd) => {
  return async (dispatch) => {
    await request.patch('/user/photo', fd)
    dispatch(getUserProfile())
  }
}
