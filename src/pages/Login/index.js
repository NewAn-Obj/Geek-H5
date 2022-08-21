import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import styles from './index.module.scss'
import Input from '../../components/Input'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { getCode } from '../../store/action/login'
import { Toast } from 'antd-mobile'
export default function Login() {
  const [time, setTime] = useState(0)
  const dispatch = useDispatch()

  const form = useFormik({
    initialValues: {
      mobile: '18888888888',
      code: '',
    },
    onSubmit(values) {
      console.log(values)
    },
    // 表单验证
    validationSchema: Yup.object().shape({
      mobile: Yup.string()
        .required('请输入手机号')
        .matches(/^1[3456789]\d{9}$/, '手机号格式错误'),
      code: Yup.string()
        .required('请输入验证码')
        .matches(/^\d{6}$/, '验证码6个数字'),
    }),
  })
  const {
    handleSubmit,
    handleChange,
    values: { mobile, code },
    touched,
    errors,
  } = form

  const onExtraClick = async () => {
    if (time > 0) {
      return
    }
    if (!/^1[3456789]\d{9}$/.test(mobile)) {
      form.setTouched({
        mobile: true,
      })
      return
    }
    // console.log('获取验证码')
    try {
      await dispatch(getCode(mobile))
      Toast.show({
        content: '获取验证码成功',
      })
      setTime(5)
      const timer = setInterval(() => {
        setTime((time) => {
          if (time === 1) {
            clearInterval(timer)
          }
          return time - 1
        })
      }, 1000)
    } catch (err) {
      // console.dir(err.response.data.message)
      if (err.response) {
        Toast.show({
          content: err.response.data.message,
          maskClickable: false,
        })
      } else {
        Toast.show({
          content: '网络繁忙，请稍后重试',
          maskClickable: false,
        })
      }
    }
  }
  return (
    <div className={styles.root}>
      <Navbar>登录</Navbar>
      <div className="content">
        {/* 标题 */}
        <h3>短信登录</h3>
        <form onSubmit={handleSubmit}>
          {/* 手机号输入框 */}
          <Input
            name="mobile"
            placeholder="请输入手机号"
            value={mobile}
            onChange={handleChange}
            maxLength="11"
          ></Input>
          {touched.mobile && errors.mobile ? (
            <div className="validate">{errors.mobile}</div>
          ) : (
            <div></div>
          )}
          {/* 短信验证码输入框 */}
          <Input
            placeholder="请输入验证码"
            extra={time === 0 ? '获取验证码' : `${time}秒后获取`}
            onExtraClick={onExtraClick}
            value={code}
            onChange={handleChange}
            name="code"
            maxLength="6"
          ></Input>
          {touched.code && errors.code ? (
            <div className="validate">{errors.code}</div>
          ) : (
            <div></div>
          )}
          {/* 登录按钮 */}
          <button type="submit" className="login-btn">
            登录
          </button>
        </form>
      </div>
    </div>
  )
}
