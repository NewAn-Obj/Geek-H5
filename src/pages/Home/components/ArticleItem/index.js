import classnames from 'classnames'
import Icon from '../../../../components/Icon'
import styles from './index.module.scss'

const ArticleItem = ({ className }) => {
  const type = 3
  // const images = ['http://geek.itheima.net/resources/images/3.jpg']
  const images = [
    'http://geek.itheima.net/resources/images/91.jpg',
    'http://geek.itheima.net/resources/images/3.jpg',
    'http://geek.itheima.net/resources/images/52.jpg',
  ]
  return (
    <div className={styles.root}>
      <div
        className={classnames(
          'article-content',
          type === 3 ? 't3' : '',
          type === 0 ? 'none-mt' : ''
        )}
      >
        <h3>前端js脚本与防止js脚本</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((item, i) => (
              <div className="article-img-wrapper" key={i}>
                <img src={item} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 ? 'none-mt' : '')}>
        <span>bug制造机器</span>
        <span>0 评论</span>
        <span>1年内</span>

        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
