// import { useEffect } from 'react'
import Icon from '../../../components/Icon'
import Input from '../../../components/Input'
import Navbar from '../../../components/Navbar'
// import { useHistory } from 'react-router-dom'
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
// import io from 'socket.io-client'
// import { getToken } from '../../../utils/storeage'
// import { Toast } from 'antd-mobile'

const Chat = () => {
  // useEffect(() => {
  //   const client = io('http://geek.itheima.net', {
  //     query: {
  //       token: getToken().token,
  //     },
  //     transports: ['websoket'],
  //   })
  //   client.on('connect', () => {
  //     console.log('连接服务器成功')
  //     Toast.show({
  //       content: '连接服务器成功，开始聊天吧！',
  //     })
  //   })
  //   return () => {
  //     client.close()
  //   }
  // }, [])
  //   const history = useHistory()
  const chatList = [
    {
      type: 'robot',
      text: '亲爱的同学你好，小智为你服务',
    },
    {
      type: 'user',
      text: '你好！',
    },
  ]
  const photo = useSelector((state) => state.profile.user.photo)
  // console.log(photo)
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <Navbar className="fixed-header">小智同学</Navbar>

      {/* 聊天记录列表 */}
      <div className="chat-list">
        {chatList.map((item, index) => {
          if (item.type === 'robot') {
            return (
              <div className="chat-item" key={index}>
                <Icon type="iconbtn_xiaozhitongxue" />
                <div className="message">{item.text}</div>
              </div>
            )
          } else {
            return (
              <div className="chat-item user" key={index}>
                <img
                  src={photo || 'http://geek.itheima.net/images/user_head.jpg'}
                  alt=""
                />
                <div className="message">{item.text}</div>
              </div>
            )
          }
        })}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input className="no-border input" placeholder={'请描述您的问题'} />
        <Icon type="iconbianji" />
      </div>
    </div>
  )
}

export default Chat
