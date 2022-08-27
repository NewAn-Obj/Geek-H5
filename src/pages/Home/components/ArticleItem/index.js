import Img from '../../../../components/Img'

//引入dayjs中文包
import 'dayjs/locale/zh-cn'
import classnames from 'classnames'
import Icon from '../../../../components/Icon'
import styles from './index.module.scss'
import dayjs from 'dayjs'
//扩展dayjs，引入relativeTime
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const ArticleItem = ({ className, article }) => {
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
    cover: { type, images },
    pubdate,
  } = article
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
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
