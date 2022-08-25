import request from '../../utils/request'

export const saveUserChannel = (payload) => {
  return {
    type: 'save_userChannel',
    payload,
  }
}

export const getUserChannel = () => {
  return async (dispatch) => {
    const res = await request.get('/channels')
    // console.log(res)
    dispatch(saveUserChannel(res.data.channels))
  }
}
