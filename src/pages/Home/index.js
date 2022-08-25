import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import Tabs from '../../components/Tabs'
import { useDispatch, useSelector } from 'react-redux'
import { getAllChannels, getUserChannel } from '../../store/action/home'
import Icon from '../../components/Icon'
import { Popup } from 'antd-mobile'
import Channels from './components/Channels'
export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserChannel())
    dispatch(getAllChannels())
  }, [dispatch])
  const tabs = useSelector((state) => state.home.userChannels)
  // console.log(tabs)
  const [visible, setVisible] = useState(false)
  const onClose = () => {
    setVisible(false)
  }
  const onChannelClick = (i) => {
    setActiveID(i)
  }
  //控制选中的频道高亮
  const [activeID, setActiveID] = useState(0)
  return (
    <div className={styles.root}>
      <Tabs
        tabs={tabs}
        index={activeID}
        onChange={(index) => setActiveID(index)}
      ></Tabs>
      <div className="tabs-opration">
        <Icon type="iconbtn_search"></Icon>
        <Icon type="iconbtn_channel" onClick={() => setVisible(true)}></Icon>
      </div>
      {visible && (
        <Popup
          visible={visible}
          onMaskClick={() => {
            setVisible(false)
          }}
          position="left"
          bodyStyle={{ width: '100vw' }}
        >
          <Channels
            onClose={onClose}
            index={activeID}
            onChange={(i) => onChannelClick(i)}
          ></Channels>
        </Popup>
      )}
    </div>
  )
}
