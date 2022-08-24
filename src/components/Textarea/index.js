import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
export default function Textarea({ maxlength = 100, className, ...rest }) {
  const [value, setValue] = useState(rest.value || '')
  const handleChange = (e) => {
    setValue(e.target.value)
    rest.onChange?.(e)
  }
  const textareaRef = useRef(null)
  useEffect(() => {
    // textareaRef.current.focus()
    textareaRef.current.setSelectionRange(-1, -1)
    // console.dir(textareaRef.current)
  }, [])
  return (
    <div className={styles.root}>
      {/* 文本输入框 */}
      <textarea
        ref={textareaRef}
        autoFocus={true}
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
