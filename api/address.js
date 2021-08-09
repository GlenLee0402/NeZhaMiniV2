import request from '../utils/request.js'
const baseUrl = getApp().globalData.baseUrl + '/api' // 服务器地址
// 删除地址
export function DeleteAddress(data) {
  return request({
    url: `${baseUrl}/CustomerAddress/DeleteAddress`,
    method: 'post',
    data
  })
}

// 获取顾客收货地址
export function GetAddress() {
  return request({
    url: `${baseUrl}/CustomerAddress/GetAddress`,
    method: 'get'
  })
}

// 添加更新顾客收货地址
export function AddAddress(data) {
  return request({
    url: `${baseUrl}/CustomerAddress/AddAddress`,
    method: 'post',
    data
  })
}

// 微信端获取省市区列表
export function GetCity() {
  return request({
    url: `${baseUrl}/CustomerAddress/GetCity`,
    method: 'get'
  })
}