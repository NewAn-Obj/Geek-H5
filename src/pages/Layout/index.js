import Icon from '../../components/Icon'
import classnames from 'classnames'
import { useHistory, useLocation } from 'react-router-dom'
import styles from './index.module.scss'

// 将 tab 按钮的数据放在一个数组中
// - id 唯一性ID
// - title 按钮显示的文本
// - to 点击按钮后切换到的页面路径
// - icon 按钮上显示的图标名称
const buttons = [
  { id: 1, title: '首页', to: '/home/index', icon: 'iconbtn_home' },
  { id: 2, title: '问答', to: '/home/question', icon: 'iconbtn_qa' },
  { id: 3, title: '视频', to: '/home/video', icon: 'iconbtn_video' },
  { id: 4, title: '我的', to: '/home/profile', icon: 'iconbtn_mine' },
]

/**
 * 定义 tab 布局组件
 */
const Layout = () => {
  // 获取路由历史 history 对象
  const history = useHistory()

  // 获取路由信息 location 对象
  const location = useLocation()

  return (
    <div className={styles.root}>
      {/* 区域一：点击按钮切换显示内容的区域 */}
      <div className="tab-content"></div>

      {/* 区域二：按钮区域，会使用固定定位显示在页面底部 */}
      <div className="tabbar">
        {buttons.map((btn) => {
          // 判断当前页面路径和按钮路径是否一致，如果一致则表示该按钮处于选中状态
          const selected = btn.to === location.pathname

          return (
            <div
              key={btn.id}
              className={classnames(
                'tabbar-item',
                selected ? 'tabbar-item-active' : ''
              )}
              onClick={() => history.push(btn.to)}
            >
              <Icon type={btn.icon + (selected ? '_sel' : '')} />
              <span>{btn.title}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Layout
