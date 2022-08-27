import Img from '../../../../components/Img'

//引入dayjs中文包
import 'dayjs/locale/zh-cn'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import Icon from '../../../../components/Icon'
import styles from './index.module.scss'
import dayjs from 'dayjs'
//扩展dayjs，引入relativeTime
import relativeTime from 'dayjs/plugin/relativeTime'
import { setMoreAction } from '../../../../store/action/home'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const ArticleItem = ({ article }) => {
  //   console.log(item)
  //   const type = 3
  // const images = ['http://geek.itheima.net/resources/images/3.jpg']
  //   const images = [
  //     'http://geek.itheima.net/resources/images/91.jpg',
  //     'http://geek.itheima.net/resources/images/3.jpg',
  //     'http://geek.itheima.net/resources/images/52.jpg',
  //   ]
  const {
    title,
    aut_name,
    comm_count,
    art_id,
    cover: { type, images },
    pubdate,
  } = article
  //判断用户是否登录，不用hasToken,因为hasTkoen需要手动刷新才能拿到最新值
  const isLogin = useSelector((state) => !!state.login.token)
  // console.log(isLogin)
  const dispatch = useDispatch()
  const channelId = useSelector((state) => state.home.moreAction.channelId)
  return (
    <div className={styles.root}>
      <div
        className={classnames(
          'article-content',
          type === 3 ? 't3' : '',
          type === 0 ? 'none-mt' : ''
        )}
      >
        <h3>{title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((item, i) => (
              <div className="article-img-wrapper" key={i}>
                <Img src={item} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 ? 'none-mt' : '')}>
        <span>{aut_name}</span>
        <span>{comm_count} 评论</span>
        <span>{dayjs(pubdate).fromNow()}</span>

        <span className="close">
          {isLogin && (
            <Icon
              type="iconbtn_essay_close"
              onClick={() => {
                dispatch(
                  setMoreAction({
                    visible: true,
                    articleId: art_id,
                    channelId: channelId,
                  })
                )
              }}
            />
          )}
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
