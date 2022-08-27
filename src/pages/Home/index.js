import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import Tabs from '../../components/Tabs'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllChannels,
  getUserChannel,
  setMoreAction,
} from '../../store/action/home'
import Icon from '../../components/Icon'
import { Popup } from 'antd-mobile'
import Channels from './components/Channels'
import ArticleList from './components/ArticleList'
import MoreAction from './components/MoreAction'
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

  //控制选中的频道高亮
  const [activeID, setActiveID] = useState(0)
  const changeActive = (index) => {
    setActiveID(index)
    dispatch(
      setMoreAction({
        visible: false,
        articleId: '',
        channelId: index,
      })
    )
  }
  return (
    <div className={styles.root}>
      <Tabs
        tabs={tabs}
        index={activeID}
        onChange={(index) => changeActive(index)}
      >
        {tabs.map((item) => {
          // console.log(item)
          return (
            <ArticleList
              key={item.id}
              channelId={item.id}
              checkedID={tabs[activeID].id}
            ></ArticleList>
          )
        })}
      </Tabs>
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
            onChange={(i) => setActiveID(i)}
          ></Channels>
        </Popup>
      )}
      <MoreAction></MoreAction>
    </div>
  )
}
