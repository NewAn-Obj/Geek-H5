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
export const saveAllChannel = (payload) => {
  return {
    type: 'save_allChannel',
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
      if (channels === []) {
        dispatch(saveUserChannel(channels))
      } else {
        const res = await request.get('/user/channels')
        dispatch(saveUserChannel(res.data.channels))
        saveLocalChannels(res.data.channels)
        // console.log('test')
      }
    }
  }
}

export const getAllChannels = () => {
  return async (dispatch) => {
    const res = await request.get('/channels')
    dispatch(saveAllChannel(res.data.channels))
    // console.log(res)
  }
}
/**删除频道
 * 如果客户登录了，就发请求删除token，删除redux中对应的token
 * 如果客户没有登陆，就删除本地的token，删除redux中对应的token
 * @param {*} channel
 * @returns
 */

export const delChannels = (channel) => {
  return async (dispatch, getState) => {
    const oldChannlesList = getState().home.userChannels
    if (hasToken()) {
      await request.delete(`/user/channels/${channel.id}`)
      dispatch(
        saveUserChannel(
          oldChannlesList.filter((item) => item.id !== channel.id)
        )
      )
    } else {
      //修改本地，修改redux
      const result = oldChannlesList.filter((item) => item.id !== channel.id)
      saveLocalChannels(result)
      dispatch(saveUserChannel(result))
    }
  }
}

export const addChannels = (channel) => {
  return async (dispatch, getState) => {
    const channels = [...getState().home.userChannels, channel]
    console.log(getState())
    if (hasToken()) {
      await request.patch('/user/channels', {
        channels: [channel],
      })
      dispatch(saveUserChannel(channels))
    } else {
      dispatch(saveUserChannel(channels))
      saveLocalChannels(channels)
    }
  }
}
export const getArticleList = (channelId, timestamp) => {
  return async (dispatch) => {
    const res = await request({
      method: 'get',
      url: '/articles',
      params: {
        timestamp,
        channel_id: channelId,
      },
    })
    dispatch(
      setArticleList({
        channelId,
        timestamp: res.data.pre_timestamp,
        list: res.data.results,
      })
    )
  }
}
export const getMoreArticle = (channelId, timestamp) => {
  return async (dispatch) => {
    const res = await request({
      method: 'get',
      url: '/articles',
      params: {
        timestamp,
        channel_id: channelId,
      },
    })
    dispatch(
      setMoreArticle({
        channelId,
        timestamp: res.data.pre_timestamp,
        list: res.data.results,
      })
    )
  }
}

export const setArticleList = (payload) => {
  return {
    type: 'set_ArticleList',
    payload,
  }
}
export const setMoreArticle = (payload) => {
  return {
    type: 'set_MoreArticle',
    payload,
  }
}
