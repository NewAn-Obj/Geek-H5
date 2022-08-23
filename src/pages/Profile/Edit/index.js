import Navbar from '../../../components/Navbar'
import { List, Space } from 'antd-mobile'
import styles from './index.module.scss'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserProfile } from '../../../store/action/profile'
import classNames from 'classnames'

const ProfileEdit = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])
  const history = useHistory()
  const data = useSelector((state) => state.profile.privateUser)
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 顶部导航栏 */}
        <Navbar>个人信息</Navbar>

        <div className="wrapper">
          {/* 列表一：显示头像、昵称、简介 */}
          <List className="profile-list">
            <List.Item
              extra={
                <span className="avatar-wrapper">
                  <img src={data.photo} alt="" style={{ height: 40 }} />
                </span>
              }
            >
              头像
            </List.Item>

            <List.Item extra={data.name}>昵称</List.Item>

            <List.Item
              extra={
                <span
                  className={classNames('intro', data.intro ? 'normal' : '')}
                >
                  {data.intro}
                </span>
              }
            >
              简介
            </List.Item>
          </List>

          {/* 列表二：显示性别、生日 */}
          <List className="profile-list">
            <List.Item extra={data.gender === 0 ? '男' : '女'}>性别</List.Item>
            <List.Item extra={data.birthday}>生日</List.Item>
          </List>

          {/* 文件选择框，用于头像图片的上传 */}
          <input type="file" hidden style={{ display: 'none' }} />
        </div>

        {/* 底部栏：退出登录按钮 */}
        <div className="logout">
          {/* <Link to="/profile/edit"> */}
          <button
            className="btn"
            onClick={() => {
              history.push('/profile/editing')
            }}
          >
            修改资料
          </button>
          {/* </Link> */}

          <Space></Space>
          <button className="btn">退出登录</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit
