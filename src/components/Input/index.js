import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
export default function Input({
  extra,
  onExtraClick,
  className,
  autoFocus,
  ...rest
}) {
  const inputRef = useRef(null)
  useEffect(() => {
    if (autoFocus) {
      inputRef.current.focus()
    }
  }, [autoFocus])
  return (
    <div className={classNames(styles.root, className)}>
      <div className="input-item">
        <div className="input-box">
          <input
            ref={inputRef}
            {...rest}
            className="input"
            autoComplete="off"
          />
          {extra && (
            <div className="extra" onClick={onExtraClick}>
              {extra}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
