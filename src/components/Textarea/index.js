import classNames from 'classnames'
import React, { useState } from 'react'
import styles from './index.module.scss'
export default function Textarea({ maxlength = 100, className, ...rest }) {
  const [value, setValue] = useState(rest.value || '')
  const handleChange = (e) => {
    setValue(e.target.value)
    rest.onChange?.(e)
  }
  return (
    <div className={styles.root}>
      {/* 文本输入框 */}
      <textarea
        className={classNames('textarea', className)}
        maxLength={maxlength}
        {...rest}
        onChange={handleChange}
      />
      {/* 当前字数/允许最大字数 */}
      <div className="count">
        {value.length}/{maxlength}
      </div>
    </div>
  )
}
