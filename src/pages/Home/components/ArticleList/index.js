import styles from './index.module.scss'
import ArticleItem from '../ArticleItem'

/**
 * 文章列表组件
 * @param {String} props.channelId 当前文章列表所对应的频道ID
 * @param {String} props.aid 当前 Tab 栏选中的频道ID
 */
const ArticleList = ({ channelId, aid }) => {
  return (
    <div className={styles.root}>
      {/* 文章列表--{channelId} */}
      <div className="articles">
        <div className="article-item">
          <ArticleItem></ArticleItem>
        </div>
      </div>
    </div>
  )
}

export default ArticleList
