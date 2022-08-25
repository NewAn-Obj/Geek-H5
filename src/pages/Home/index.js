import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import Tabs from '../../components/Tabs'
import { useDispatch, useSelector } from 'react-redux'
import { getUserChannel } from '../../store/action/home'
import Icon from '../../components/Icon'
export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserChannel())
  }, [dispatch])
  const tabs = useSelector((state) => state.home.userChannels)
  // console.log(tabs)
  const [tabActiveIndex, setTabActiveIndex] = useState(0)

  return (
    <div className={styles.root}>
      <Tabs
        tabs={tabs}
        index={tabActiveIndex}
        onChange={(index) => setTabActiveIndex(index)}
      ></Tabs>
      <div className="tabs-opration">
        <Icon type="iconbtn_search"></Icon>
        <Icon type="iconbtn_channel"></Icon>
      </div>
    </div>
  )
}
