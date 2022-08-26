import styles from './index.module.scss'
import ArticleItem from '../ArticleItem'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAricleList } from '../../../../store/action/home'
import { PullToRefresh } from 'antd-mobile'

/**
 * 文章列表组件
 * @param {String} props.channelId 当前文章列表所对应的频道ID
 * @param {String} props.aid 当前 Tab 栏选中的频道ID
 */
const ArticleList = ({ channelId, checkedID }) => {
  const dispatch = useDispatch()
  const current = useSelector((state) => state.home.articleList[channelId])
  useEffect(() => {
    if (current) return
    if (channelId === checkedID) {
      dispatch(getAricleList(channelId, Date.now()))
    }
  }, [checkedID, channelId, dispatch, current])
  const onRefresh = async () => {
    await dispatch(getAricleList(channelId, Date.now()))
  }
  if (current === undefined) return null
  console.log(current)
  return (
    <div className={styles.root}>
      {/* 文章列表--{channelId} */}
      <div className="articles">
        <PullToRefresh onRefresh={onRefresh}>
          {current.list.map((item) => {
            return (
              <div className="article-item" key={item.art_id}>
                <ArticleItem article={item}></ArticleItem>
              </div>
            )
          })}
        </PullToRefresh>
      </div>
    </div>
  )
}

export default ArticleList
