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
const ProfileEdit = React.lazy(() => import('./pages/Profile/Edit/index'))
const EditInfo = React.lazy(() => import('./pages/Profile/EditInfo'))

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
            <Route path="/profile/edit" component={ProfileEdit}></Route>
            <Route path="/profile/editing" component={EditInfo}></Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}
