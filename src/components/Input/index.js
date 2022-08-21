import React from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
export default function Input({ extra, onExtraClick, className, ...rest }) {
  return (
    <div className={classNames(styles.root, className)}>
      <div className="input-item">
        <div className="input-box">
          <input {...rest} className="input" autoComplete="off" />
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
