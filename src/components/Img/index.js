import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon'
import styles from './index.module.scss'

/**
 * 拥有懒加载特性的图片组件
 * @param {String} props.src 图片地址
 * @param {String} props.className 样式类
 */
const Image = ({ alt, src, className }) => {
  // 记录图片加载是否出错的状态
  const [error, setError] = useState(false)
  // 记录图片是否正在加载的状态
  const [loading, setLoading] = useState(true)
  //加载成功
  const ifonLoad = () => {
    setError(false)
    setLoading(false)
  }
  //   加载失败
  const ifonError = () => {
    setLoading(false)
    setError(true)
  }
  // 对图片元素的引用
  const imgRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        //图片在可视区
        imgRef.current.src = imgRef.current.dataset.src
        //取消监听
        observer.unobserve(imgRef.current)
      }
    })
    observer.observe(imgRef.current)
  }, [])
  return (
    <div className={classnames(styles.root, className)}>
      {/* 正在加载时显示的内容 */}
      {loading && (
        <div className="image-icon">
          <Icon type="iconphoto" />
        </div>
      )}

      {/* 加载出错时显示的内容 */}
      {error && (
        <div className="image-icon">
          <Icon type="iconphoto-fail" />
        </div>
      )}

      {/* 加载成功时显示的内容 */}

      <img
        alt={alt}
        data-src={src}
        ref={imgRef}
        onLoad={ifonLoad}
        onError={ifonError}
      />
    </div>
  )
}

export default Image
