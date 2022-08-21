import React from 'react'
import Navbar from '../../components/Navbar'
import styles from './index.module.scss'
import Input from '../../components/Input'
export default function Login() {
  const getCode = () => {
    console.log('获取验证码')
  }
  return (
    <div className={styles.root}>
      <Navbar>登录</Navbar>
      <div className="content">
        {/* 标题 */}
        <h3>短信登录</h3>
        <form>
          {/* 手机号输入框 */}
          <Input placeholder="请输入手机号"></Input>
          {/* <div className="validate">手机号验证错误信息</div> */}
          {/* 短信验证码输入框 */}
          <Input
            placeholder="请输入验证码"
            extra="获取验证码"
            getCode={() => getCode()}
          ></Input>
          {/* <div className="validate">手机号验证错误信息</div> */}
          {/* 登录按钮 */}
          <button type="submit" className="login-btn">
            登录
          </button>
        </form>
      </div>
    </div>
  )
}
