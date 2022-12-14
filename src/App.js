import React, { Suspense } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import history from './utils/history'
import AuthRoute from './components/AuthRoute'
// import Login from './pages/Login'
// import Home from './pages/Home'
const Login = React.lazy(() => import('./pages/Login'))
const Layout = React.lazy(() => import('./pages/Layout'))
const ProfileEdit = React.lazy(() => import('./pages/Profile/Edit/index'))
const Chat = React.lazy(() => import('./pages/Profile/Chat/index'))
const NotFound = React.lazy(() => import('./pages/NotFound/index'))
const Feedback = React.lazy(() => import('./pages/Profile/Feedback/index'))

export default function App() {
  return (
    <Router history={history}>
      <div className="App">
        {/* <Link to="/login">登录</Link>
        <Link to="/home">首页</Link> */}
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Redirect exact from="/" to="/home"></Redirect>
            <Route path="/login" component={Login}></Route>
            <Route path="/home" component={Layout}></Route>
            <AuthRoute path="/profile/edit" component={ProfileEdit}></AuthRoute>
            <AuthRoute path="/profile/chat" component={Chat}></AuthRoute>
            <Route path="/profile/back" component={Feedback}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}
