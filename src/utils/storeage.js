// 用户 Token 的本地缓存键名
const TOKEN_KEY = 'user_token'

/**
 * 从本地缓存中获取 Token 信息
 */
export const getToken = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY)) || {}
}

/**
 * 将 Token 信息存入缓存
 * @param {Object} tokenInfo 从后端获取到的 Token 信息
 */
export const setToken = (tokenInfo) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo))
}

/**
 * 删除本地缓存中的 Token 信息
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 判断本地缓存中是否存在 Token 信息
 */
export const hasToken = () => {
  return !!getToken().token
}
/**
 * 保存频道数据到本地
 * @param {*} channels
 */
export const saveLocalChannels = (channels) => {
  localStorage.setItem('USER_CHANNELS', JSON.stringify(channels))
}

export const getLocalChannels = () => {
  return JSON.parse(localStorage.getItem('USER_CHANNELS'))
}

export const removeLocalChannels = () => {
  localStorage.removeItem('USER_CHANNELS')
}
