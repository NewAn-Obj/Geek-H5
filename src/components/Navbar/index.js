import React from 'react'
import { useHistory } from 'react-router-dom'
import Icon from '../../components/Icon'
import styles from './index.module.scss'
// import { withRouter } from 'react-router-dom'
/*
1. 由于Navbar是自定义组件，不是路由组件，所以没有Router的location，history，match三个属性
此时，可以使用withRoute包裹Navbar，通过props拿到history属性，完成跳转功能

2.路由提供了几个与路由相关的hooks，也可以通过hooks实现回到上一页
*/
function Navbar({ children, extra }) {
  const history = useHistory()
  const back = () => {
    // console.log(history)
    history.go(-1)
  }
  return (
    <div className={styles.root}>
      {/* 后退按钮 */}
      <div className="left">
        <Icon type="iconfanhui" onClick={back} />
      </div>
      {/* 居中标题 */}
      <div className="title">{children}</div>

      {/* 右侧内容 */}
      <div className="right">{extra}</div>
    </div>
  )
}
// export default withRouter(Navbar)
export default Navbar
