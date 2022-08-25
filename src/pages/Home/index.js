import React, { useEffect } from 'react'
import styles from './index.module.scss'
import Tabs from '../../components/Tabs'
import { useDispatch, useSelector } from 'react-redux'
import { getUserChannel } from '../../store/action/home'
export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserChannel())
  }, [dispatch])
  const tabs = useSelector((state) => state.home.userChannels)
  console.log(tabs)
  return (
    <div className={styles.root}>
      <Tabs tabs={tabs}></Tabs>
    </div>
  )
}
