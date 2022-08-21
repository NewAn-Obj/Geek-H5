import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { shownum } from '../../store/action/show'
import Navbar from '../../components/Navbar'
export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(shownum())
  }, [dispatch])
  // useEffect(() => {
  //   dispatch(showlog())
  // }, [dispatch])
  return (
    <div>
      <h1>我是Home组件</h1>
      <Navbar></Navbar>
    </div>
  )
}
