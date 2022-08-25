import request from '../../utils/request'
import {
  getLocalChannels,
  hasToken,
  saveLocalChannels,
} from '../../utils/storeage'

export const saveUserChannel = (payload) => {
  return {
    type: 'save_userChannel',
    payload,
  }
}

export const getUserChannel = () => {
  return async (dispatch) => {
    if (hasToken()) {
      const res = await request.get('/user/channels')
      dispatch(saveUserChannel(res.data.channels))
    } else {
      const channels = getLocalChannels()
      // channels
      //   ? dispatch(saveUserChannel(channels))
      //   : dispatch(saveUserChannel(await request.get('/user/channels')))
      if (channels) {
        dispatch(saveUserChannel(channels))
      } else {
        const res = await request.get('/user/channels')
        dispatch(saveUserChannel(res.data.channels))
        saveLocalChannels(res.data.channels)
      }
    }
  }
}