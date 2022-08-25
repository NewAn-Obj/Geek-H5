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
  const [tabActiveIndex, setTabActiveIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const onClose = () => {
    setVisible(false)
  }
  return (
    <div className={styles.root}>
      <Tabs
        tabs={tabs}
        index={tabActiveIndex}
        onChange={(index) => setTabActiveIndex(index)}
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
          <Channels onClose={onClose}></Channels>
        </Popup>
      )}
    </div>
  )
}
