import request from '../utils/request.js'
const baseUrl = getApp().globalData.baseUrl + '/api' // 服务器地址

// 注册登陆  Post请求
export function RegisterAndLogin(data) {
  return request({
    url: `${baseUrl}/Mini/RegisterAndLogin`,
    method: 'post',
    data
  })
}

// 查询banner
export function GetUse() {
  return request({
    url: `${baseUrl}/ShopActivity/GetUseOfMini`,
    method: 'get'
  })
}
// 查询banner
export function GetUseBanner() {
  return request({
    url: `${baseUrl}/ShopActivity/GetUseOfMini`,
    method: 'get'
  })
}

// code获取登陆
export function OnLogin(code) {
  return request({
    url: `${baseUrl}/Mini/OnLogin?code=` + code,
    method: 'get'
  })
}

// 获取验证码
export function SendCode(Phone) {
  return request({
    url: `${baseUrl}/SSM/SendCode?Phone=` + Phone,
    method: 'get'
  })
}
// 手机验证码登陆 
export function RegisterAndLoginByPhone(data) {
  return request({
    url: `${baseUrl}/Mini/RegisterAndLoginByPhone`,
    method: 'post',
    data
  })
}

// 获取太阳二维码
export function GetQRCode(data) {
  return request({
    url: `${baseUrl}/Mini/GetQRCode`,
    method: 'post',
    data
  })
}
// 退出登陆
export function LoginOut(data) {
  return request({
    url: `${baseUrl}/Mini/LoginOut`,
    method: 'post',
    data
  })
}

// 个人信息
export function GetCustomerInfo() {
  return request({
    url: `${baseUrl}/WeChat/GetCustomerInfo`,
    method: 'get'
  })
}

// 分解二维码Scene
export function GetSence(scene) {
  return request({
    url: `${baseUrl}/Mini/GetSence?scene=` + scene,
    method: 'get'
  })
}