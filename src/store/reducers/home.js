const initValue = {
  userChannels: [],
  allChannels: [],
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

  return state
}
