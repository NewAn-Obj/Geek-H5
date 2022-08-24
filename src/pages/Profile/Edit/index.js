import Navbar from '../../../components/Navbar'
import { List, DatePicker, Popup, Toast } from 'antd-mobile'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import {
  getUserProfile,
  updataPhoto,
  updataUser,
} from '../../../store/action/profile'
// import classNames from 'classnames'
import EditInput from './components/EditInput'
import EditList from './components/EditList'
import dayjs from 'dayjs'
import { logout } from '../../../store/action/login'
import { useHistory } from 'react-router-dom'
const ProfileEdit = () => {
  const history = useHistory()
  const fileRef = useRef()
  const [visible, setVisible] = useState(false)
  const [visible1, setVisible1] = useState({
    visible1: false,
    type: '',
  })
  const [visible2, setVisible2] = useState({
    visible2: false,
    type: '',
  })
  const onClose = () => {
    setVisible1({
      visible1: false,
      type: '',
    })
    setVisible2({
      visible2: false,
      type: '',
    })
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])
  const data = useSelector((state) => state.profile.privateUser)
  const onSubmit = async (type, value) => {
    // console.log(type, value)
    //成功发送请求，在跳转到个人中心，未成功发送请求则中断

    await dispatch(
      updataUser({
        [type]: value,
      })
    )
    setVisible1({
      setVisible1: false,
      type: '',
    })
    setVisible2({
      setVisible2: false,
      type: '',
    })
    Toast.show({
      content: '修改成功',
    })
  }
  const configList =
    visible2.type === 'photo'
      ? [
          {
            title: '拍照',
            onClick: () => {
              // console.log('拍照')
              Toast.show({
                content: '此设备不支持拍照',
              })
              setVisible2({
                setVisible2: false,
                type: '',
              })
            },
          },
          {
            title: '本地选择',
            onClick: () => {
              // console.log('本地选择')
              fileRef.current.click()
            },
          },
        ]
      : [
          {
            title: '男',
            onClick: () => {
              // console.log('男', visible2.type)
              onSubmit('gender', 0)
            },
          },
          {
            title: '女',
            onClick: () => {
              // console.log('女', visible2.type)
              onSubmit('gender', 1)
            },
          },
        ]
  const photoChange = async (e) => {
    const photo = e.target.files[0]
    // console.log(photo)
    const fd = new FormData()
    fd.append('photo', photo)
    await dispatch(updataPhoto(fd))
    setVisible2({
      setVisible2: false,
      type: '',
    })
    Toast.show({
      content: '修改成功',
    })
  }
  const handleLogout = async () => {
    await dispatch(logout())
    history.replace('/login')
    Toast.show({
      content: '退出成功',
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
              onClick={() =>
                setVisible2({
                  visible2: true,
                  type: 'photo',
                })
              }
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
                // className={classNames('intro', data.intro ? 'normal' : ' ')}
                // className={classNames('intro', 'normal')}
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
            <List.Item
              onClick={() =>
                setVisible2({
                  visible2: true,
                  type: 'gender',
                })
              }
              clickable
              extra={data.gender === 0 ? '男' : '女'}
            >
              性别
            </List.Item>
            <List.Item
              clickable
              onClick={() => {
                setVisible(true)
              }}
              extra={data.birthday}
            >
              生日
            </List.Item>
            {visible && (
              <DatePicker
                visible={visible}
                onClose={() => {
                  setVisible(false)
                }}
                max={new Date()}
                min={new Date('1900-01-01')}
                defaultValue={new Date(data.birthday)}
                onConfirm={async (value) => {
                  // console.log(value)
                  console.log(dayjs(value).format('YYYY-MM-DD'))
                  await dispatch(
                    updataUser({
                      birthday: dayjs(value).format('YYYY-MM-DD'),
                    })
                  )
                  Toast.show({
                    content: '修改成功',
                  })
                }}
              ></DatePicker>
            )}
          </List>

          {/* 文件选择框，用于头像图片的上传 */}
          <input
            type="file"
            hidden
            style={{ display: 'none' }}
            ref={fileRef}
            onChange={photoChange}
          />
        </div>

        {/* 底部栏：退出登录按钮 */}
        <div className="logout">
          <button className="btn" onClick={handleLogout}>
            退出登录
          </button>
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
      <Popup
        visible={visible2.visible2}
        position="bottom"
        bodyStyle={{
          width: '100vw ',
        }}
        onMaskClick={() => {
          setVisible2({
            visible: false,
            type: '',
          })
        }}
      >
        {visible2.visible2 && (
          <EditList
            type={visible2.type}
            configList={configList}
            onClose={onClose}
          ></EditList>
        )}
      </Popup>
    </div>
  )
}

export default ProfileEdit
