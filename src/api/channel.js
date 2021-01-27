/**
 *
 * 获取频道列表接口
 */

import request from '@/utils/request.js'

export const getChannelAll = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/channels'
  })
}

// 添加频道数据持久化
export const addChannelForever = () => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels'
  })
}

// 删除频道数据持久化
export const delChannelForever = (channelId) => {
    return request({
      method: 'DELETE',
      url: `/app/v1_0/user/channels/${channelId}`
    })
  }
  