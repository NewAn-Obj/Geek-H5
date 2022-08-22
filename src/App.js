import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

// import Login from './pages/Login'
// import Home from './pages/Home'
const Login = React.lazy(() => import('./pages/Login'))
const Layout = React.lazy(() => import('./pages/Layout'))

export default function App() {
  return (
    <Router>
      <div className="App">
        {/* <Link to="/login">登录</Link>
        <Link to="/home">首页</Link> */}
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Redirect exact from="/" to="/home"></Redirect>
            <Route path="/login" component={Login}></Route>
            <Route path="/home" component={Layout}></Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}
