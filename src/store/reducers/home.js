const initValue = {
  userChannels: [],
  allChannels: [],
  articleList: {},
}

export default function reducer(state = initValue, action) {
  const { type, payload } = action
  if (type === 'save_userChannel') {
    return {
      ...state,
      userChannels: payload,
    }
  }
  if (type === 'save_allChannel') {
    return {
      ...state,
      allChannels: payload,
    }
  }
  if (type === 'set_ArticleList') {
    return {
      ...state,
      articleList: {
        ...state.articleList,
        [payload.channelId]: {
          timestamp: payload.timestamp,
          list: payload.list,
        },
      },
    }
  }

  return state
}
