import request from '@/utils/request'
import store from '@/store'

// 登录接口
export const login = data => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data
  })
}

// 发送验证码接口
export const sendSms = mobile => {
  return request({
    url: `/app/v1_0/sms/codes/${mobile}`,
    method: 'get',
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: `/app/v1_0/user`,
    method: 'get',
    // headers: {
    //   Authorization: `Bearer ${store.state.token}`
    // }
  })
}

// 获取频道列表
export const getChannelsList = () => {
  return request({
    url: `/app/v1_0/channels`,
    method: 'get',
  })
}



