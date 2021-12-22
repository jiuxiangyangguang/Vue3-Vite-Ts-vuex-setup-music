/*
 * @Author: c
 * @Date: 2021-11-16 14:44:35
 * @LastEditTime: 2021-12-02 11:38:16
 * @LastEditors: jiuxiangyang
 * @Description: 
 * @FilePath: \musicwangyi\src\utils\request.ts
 * 版权声明
 */
import axios from 'axios'
import store from '@/store/index'
import { stringify } from 'qs' // 引入qs模块，用来序列化post类型的数据
const service = axios.create({
  baseURL: '/api',
  // https://music.qier222.com/api/
  timeout: 10000,
  withCredentials: true
})
service.interceptors.request.use((config) => {
  return config
}, (error) => Promise.reject(error))

service.interceptors.response.use(
  (response: { data: any }) => {
    const res = response.data
    return res
  },
  (error: { message: any; }) => {
    console.log(`err${error}`) // for debug
    return Promise.reject(error)
  }
)
export default {
  get(url: string, params?: any) {
    return new Promise((resolve, reject) => {
      service
        .get(url, { params })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          console.log(err)
        })
    })
  },
  /* post 请求 */
  post(url: string, params?: any) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, stringify(params))
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          console.log(err)
        })
    })
  },
  postUp(url: string, params?: any) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, stringify(params), { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
}
