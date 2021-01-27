import axios from 'axios'
// import { config } from 'vue/types/umd'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})
// 请求拦截器
request.interceptors.request.use(config => {
  if (store.token) {
    config.headers.Authorization = `Bearer ${store.token}`
  }
  console.log(config);
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
// request.interceptors.response.use(res => { }, err => { })

export default request
