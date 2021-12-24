import request from '@/utils/request'

// 手机登录
export function loginByPhone(params: object) {
  return request.get('/login/cellphone', params)
}
// 退出登录
export function logout() {
  return request.get('/logout')
}

// 邮箱登录
export function loginByEmail(params: object) {
  return request.get('/login', params)
}

// 获取账号信息
export function getAccountInfo(params: object) {
  return request.get('/user/account', params)
}

// 获取账详情
export function getUserDetails(params: object) {
  return request.get('/user/detail', params)
}

// 更新用户信息
export function getInfoUpdate(params: object) {
  return request.get('/user/update', params)
}

// 上传头像
export function setUpImg(params: any) {
  return request.get(`/avatar/upload?imgSize=200&timestamp=${Date.now()}`, params)
}
