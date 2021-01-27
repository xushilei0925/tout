/**
 *
 * 获取频道列表接口
 */

import request from '@/utils/request.js'

export const getChannelAll = () => {
    return request({
        method: 'get',
        url: '/app/v1_0/user/channels'
    })
}