import React from 'react'
import { List } from 'antd-mobile'
import styles from './index.module.scss'
export default function EditList({ type, configList, onClose }) {
  //   console.log(type)
  return (
    <div className={styles.root}>
      <List>
        {configList.map((item) => {
          return (
            <List.Item
              key={item.title}
              onClick={item.onClick}
              clickable=""
              className="list-item"
            >
              {item.title}
            </List.Item>
          )
        })}
        <List.Item onClick={onClose} clickable="" className="list-item">
          取消
        </List.Item>
      </List>
    </div>
  )
}
