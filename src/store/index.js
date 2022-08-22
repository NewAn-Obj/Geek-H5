import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers'
import { getToken } from '../utils/storeage'

const store = createStore(
  reducer,
  //参数二：初始化时要加载的状态
  {
    login: getToken(),
  },
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
