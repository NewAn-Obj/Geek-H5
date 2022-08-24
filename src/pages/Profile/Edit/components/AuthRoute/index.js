import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { hasToken } from '../../../../../utils/storeage'
import { Toast } from 'antd-mobile'

export default function AuthRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        if (hasToken()) {
          return <Component></Component>
        } else {
          Toast.show({
            content: '请登录',
          })
          return <Redirect to="/login"></Redirect>
        }
      }}
    ></Route>
  )
}
