const { combineReducers } = require('redux')

function test(state = 0, action) {
  if (action.type === 'LOG') {
    return action.num
  }
  if (action.type === 'NUM') {
    return action.num
  }
  return state
}

const reducer = combineReducers({
  test,
})

export default reducer
