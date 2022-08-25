const initValue = {
  userChannels: [],
}

export default function reducer(state = initValue, action) {
  const { type, payload } = action
  if (type === 'save_userChannel') {
    return {
      ...state,
      userChannels: payload,
    }
  }

  return state
}
