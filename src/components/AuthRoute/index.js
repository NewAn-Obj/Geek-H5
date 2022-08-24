import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { hasToken } from '../../utils/storeage'
import { Toast } from 'antd-mobile'

export default function AuthRoute({ component: Component, ...rest }) {
  const pathName = useLocation().pathname
  // console.log(pathName)
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
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: pathName } }}
            ></Redirect>
          )
        }
      }}
    ></Route>
  )
}
