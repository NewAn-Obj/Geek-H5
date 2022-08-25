import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
export default function NotFound() {
  const history = useHistory()
  const [time, setTime] = useState(3)

  /*方法一：
    1.这种方法可以实现倒计时结束跳转页面，但是页面跳转时在return time - 1 之前，定时器就已经清除了，所以实现跳转后会报错
  */
  //不能在setTime外面访问time，因为time在闭包里面，在外部访问的time 是useState的time
  // useEffect(() => {
  //   let timeId = setInterval(() => {
  //     setTime((time) => {
  //       if (time === 1) {
  //         clearInterval(timeId)
  //         history.push('./home')
  //       }
  //       return time - 1
  //     })
  //   }, 1000)
  // }, [history])
  /**方法二：
   * 2.方法一会报错，我们可以让页面晚一点跳转，即在页面销毁之前return time - 1 ，就不会报错
   */
  //   useEffect(() => {
  //     let timeId = setInterval(() => {
  //       setTime((time) => {
  //         if (time === 1) {
  //           clearInterval(timeId)
  //           setTimeout(() => {
  //             history.push('./home')
  //           }, 50)
  //         }
  //         return time - 1
  //       })
  //     }, 1000)
  //   }, [history])
  /**
   *
   */
  /**方法三：
   *3.我们可以在函数外面const 一个timeRef，在time - 1的时候 timeRef.current也 = time -1，此时我们就可以在外面做判断清理定时器
   *
   */
  //   const timeRef = useRef(-1)
  //   useEffect(() => {
  //     let timeId = setInterval(() => {
  //       setTime((time) => {
  //         timeRef.current = time - 1
  //         return time - 1
  //       })
  //       if (timeRef.current === 1) {
  //         clearInterval(timeId)
  //         history.push('/home')
  //       }
  //     }, 1000)
  //   }, [history])
  /**方法四：
   * 4.使用setInterval用完要清理，所以不使用setInterval,使用setTimeout,并依赖到TIME，time改变又执行useEffect，判断当time === 0 时跳转页面
   */
  useEffect(() => {
    setTimeout(() => {
      setTime(time - 1)
    }, 1000)
    if (time === 0) {
      history.push('/home')
    }
  }, [time, history])
  return (
    <div>
      <h1>404 Not Found,您访问的页面不存在</h1>
      <div>
        {time}s后跳转到<Link to="/home">首页</Link>
      </div>
    </div>
  )
}
