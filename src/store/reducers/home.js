const initValue = {
  userChannels: [],
  allChannels: [],
  articleList: {},
  moreAction: {
    visible: false,
    articleId: '',
    channelId: 0,
  },
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
  if (type === 'set_MoreArticle') {
    console.log(payload)
    return {
      ...state,
      articleList: {
        ...state.articleList,
        [payload.channelId]: {
          timestamp: payload.timestamp,
          list: [...state.articleList[payload.channelId].list, ...payload.list],
        },
      },
    }
  }
  if (type === 'set_MoreAction') {
    return {
      ...state,
      moreAction: payload,
    }
  }
  if (type === 'set_dislikeArticle') {
    return {
      ...state,
      articleList: {
        ...state.articleList,
        [payload.channelId]: {
          timestamp: state.articleList[payload.channelId].timestamp,
          list: [
            ...state.articleList[payload.channelId].list.filter((item) => {
              return item.art_id !== payload.articleId
            }),
          ],
        },
      },
    }
  }
  if (type === 'set_reportArticle') {
    return {
      ...state,
      articleList: {
        ...state.articleList,
        [payload.channelId]: {
          timestamp: state.articleList[payload.channelId].timestamp,
          list: [
            ...state.articleList[payload.channelId].list.filter((item) => {
              return item.art_id !== payload.articleId
            }),
          ],
        },
      },
    }
  }
  return state
}
