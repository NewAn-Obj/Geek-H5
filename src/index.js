import ReactDOM from 'react-dom/client'
import App from './App'

import store from './store'
import { Provider } from 'react-redux'
import './assets/styles/index.scss'
ReactDOM.createRoot(document.querySelector('#root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
