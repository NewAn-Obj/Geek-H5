import Navbar from '../../../components/Navbar'
import { List, DatePicker, Popup, Toast } from 'antd-mobile'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getUserProfile, updataUser } from '../../../store/action/profile'
import classNames from 'classnames'
import EditInput from './components/EditInput'
const ProfileEdit = () => {
  const [visible, setVisible] = useState(false)
  const [visible1, setVisible1] = useState({
    visible1: false,
    type: '',
  })
  const onClose = () => {
    setVisible1({
      visible1: false,
      type: '',
    })
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])
  const data = useSelector((state) => state.profile.privateUser)
  const onSubmit = (type, value) => {
    // console.log(type, value)
    dispatch(
      updataUser({
        [type]: value,
      })
    )
    setVisible1({
      setVisible1: false,
      type: '',
    })
    Toast.show({
      content: '修改成功',
    })
  }
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 顶部导航栏 */}
        <Navbar>个人信息</Navbar>

        <div className="wrapper">
          {/* 列表一：显示头像、昵称、简介 */}
          <List className="profile-list">
            <List.Item
              clickable
              extra={
                <span className="avatar-wrapper">
                  <img src={data.photo} alt="" style={{ height: 40 }} />
                </span>
              }
            >
              头像
            </List.Item>

            <List.Item
              clickable
              extra={data.name}
              onClick={() =>
                setVisible1({
                  visible1: true,
                  type: 'name',
                })
              }
            >
              昵称
            </List.Item>

            <List.Item
              onClick={() =>
                setVisible1({
                  visible1: true,
                  type: 'intro',
                })
              }
              clickable
              extra={
                <span
                  className={classNames('intro', data.intro ? 'normal' : ' ')}
                >
                  {data.intro ? data.intro : ''}
                </span>
              }
            >
              简介
            </List.Item>
          </List>

          {/* 列表二：显示性别、生日 */}
          <List className="profile-list">
            <List.Item clickable extra={data.gender === 0 ? '男' : '女'}>
              性别
            </List.Item>
            <List.Item
              clickable
              onClick={() => {
                setVisible(true)
              }}
              // extra={data.birthday}
            >
              生日
            </List.Item>
            <DatePicker
              visible={visible}
              onClose={() => {
                setVisible(false)
              }}
              max={new Date()}
              min={new Date('1900/01/01')}
              defaultValue={new Date(data.birthday)}
              onConfirm={() => {}}
            >
              {(val) => {
                // console.log(val)
              }}
            </DatePicker>
          </List>

          {/* 文件选择框，用于头像图片的上传 */}
          <input type="file" hidden style={{ display: 'none' }} />
        </div>

        {/* 底部栏：退出登录按钮 */}
        <div className="logout">
          <button className="btn">退出登录</button>
        </div>
      </div>
      <Popup
        visible={visible1.visible1}
        position="right"
        onMaskClick={() => {
          setVisible1(false)
        }}
        bodyStyle={{ height: '100vh', width: '100vw ' }}
      >
        {visible1.visible1 && (
          <EditInput
            onClose={onClose}
            type={visible1.type}
            onSubmit={onSubmit}
          ></EditInput>
        )}
      </Popup>
    </div>
  )
}

export default ProfileEdit
