import React from 'react'
import styles from './index.module.scss'
import Navbar from '../../../../../components/Navbar'

export default function EditInput({ onClose, type }) {
  console.log(type)
  return (
    <div className={styles.root}>
      <Navbar
        extra={<span className="commit-btn">提交</span>}
        onLeftClick={onClose}
      >
        {`编辑${type === 'name' ? '昵称' : '简介'}`}
      </Navbar>
      <h3>{type === 'name' ? '昵称' : '简介'}</h3>
    </div>
  )
}
