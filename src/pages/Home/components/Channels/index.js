import Icon from '../../../../components/Icon'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import { useState } from 'react'
import { delChannels } from '../../../../store/action/home'

/**
 * 频道管理组件
 * @param {Number} props.tabActiveIndex 用户选中的频道的索引
 * @param {Function} props.onClose 关闭频道管理抽屉时的回调函数
 * @param {Function} props.onChannelClick 当点击频道列表中的某个频道时的会带哦函数
 */
const Channels = ({ index, onClose, onChange }) => {
  const { userChannels, allChannels } = useSelector((state) => state.home)
  // console.log(index)
  //recommendChannels是所有频道中过滤用户所选频道的剩余频道
  //过滤方法一
  // const recommendChannels = allChannels.filter((item) => {
  //   return userChannels.every((i) => {
  //     return i.id !== item.id
  //   })
  // })
  // console.log(recommendChannels)
  //过滤方法二
  const userChannelsId = userChannels.map((item) => item.id)
  const recommendChannels = allChannels.filter((item) => {
    return !userChannelsId.includes(item.id)
  })
  // console.log(recommendChannels)
  const handleClick = (i) => {
    if (editing) return
    onChange(i)
    onClose()
  }
  const dispatch = useDispatch()
  const [editing, setEditing] = useState(false)
  const deleteChannel = (item) => {
    console.log(item, '删除频道')
    dispatch(delChannels(item))
  }
  return (
    <div className={styles.root}>
      {/* 顶部栏：带关闭按钮 */}
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>

      {/* 频道列表 */}
      <div className="channel-content">
        {/* 当前已选择的频道列表 */}
        <div className={classNames('channel-item ', editing ? 'edit' : '')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              点击{editing ? '删除' : '切换'}频道
            </span>
            <span
              className="channel-item-edit"
              onClick={() => setEditing(!editing)}
            >
              {editing ? '完成' : '编辑'}
            </span>
          </div>

          <div className="channel-list">
            {userChannels.map((item, i) => {
              return (
                <span
                  key={item.id}
                  className={classNames(
                    'channel-list-item',
                    index === i ? 'selected' : ''
                  )}
                  onClick={() => handleClick(i)}
                >
                  {item.name}
                  <Icon
                    type="iconbtn_tag_close"
                    onClick={() => deleteChannel(item)}
                  />
                </span>
              )
            })}
          </div>
        </div>

        {/* 推荐的频道列表 */}
        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {recommendChannels.map((item) => {
              return (
                <span key={item.id} className="channel-list-item">
                  + {item.name}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
