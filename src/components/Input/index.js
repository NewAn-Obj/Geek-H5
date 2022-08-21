import React from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
export default function Input({ extra, getCode, className, ...rest }) {
  return (
    <div className={classNames(styles.root, className)}>
      <div className="input-item">
        <div className="input-box">
          <input {...rest} className="input" autoComplete="off" />
          {extra && (
            <div className="extra" onClick={getCode}>
              {extra}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
