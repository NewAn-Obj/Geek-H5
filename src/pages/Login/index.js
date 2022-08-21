import React from 'react'
import Icon from '../../components/Icon'
export default function Login() {
  return (
    <div>
      <h1>我是Login组件</h1>
      <Icon type="iconfanhui" onClick={() => alert('我点击了')}></Icon>
    </div>
  )
}
