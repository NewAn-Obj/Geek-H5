import React from 'react'
import styles from './index.module.scss'
export default function Input({ extra, getCode, ...rest }) {
  return (
    <div className={styles.root}>
      <div className="input-item">
        <div className="input-box">
          <input {...rest} className="input" name="mobile" autoComplete="off" />
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
