import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { shownum } from '../../store/action/show'

export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(shownum())
  }, [dispatch])
  // useEffect(() => {
  //   dispatch(showlog())
  // }, [dispatch])
  return <div>我是Home组件</div>
}
