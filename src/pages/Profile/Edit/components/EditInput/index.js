import React, { useState } from 'react'
import styles from './index.module.scss'
import Navbar from '../../../../../components/Navbar'
import Textarea from '../../../../../components/Textarea'
import Input from '../../../../../components/Input'

export default function EditInput({ onClose, type }) {
  const [value, setValue] = useState('hello')

  //   console.log(type)
  return (
    <div className={styles.root}>
      <Navbar
        extra={<span className="commit-btn">提交</span>}
        onLeftClick={onClose}
      >
        {`编辑${type === 'name' ? '昵称' : '简介'}`}
      </Navbar>
      <div className="content">
        <h3>{type === 'name' ? '昵称' : '简介'}</h3>
        {type === 'name' ? (
          <Input className="input-wrap" placeholder="请输入昵称"></Input>
        ) : (
          <Textarea
            maxlength={100}
            placeholder="请输入简介"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></Textarea>
        )}
      </div>
    </div>
  )
}
