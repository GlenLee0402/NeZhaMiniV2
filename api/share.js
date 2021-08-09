import request from '../utils/request.js'
const baseUrl = getApp().globalData.baseUrl + '/api' // 服务器地址
// 我的战况
export function GetPromote(data) {
  return request({
    url: `${baseUrl}/WeChat/GetPromoteInfoOfMini`,
    method: 'post',
    data
  })
}

// 获取分享需要的信息
export function GetPromoteShareInfo(data) {
  return request({
    url: `${baseUrl}/WeChat/GetPromoteShareInfoOfMini`,
    method: 'post',
    data
  })
}

// 获取关注二维码
export function GetQRUrl() {
  return request({
    url: `${baseUrl}/WeChat/GetQRUrl`,
    method: 'get'
  })
}

// 获取是否关注公众号
export function GetIsSubscrit() {
  return request({
    url: `${baseUrl}/WeChat/IsSubscrit`,
    method: 'get'
  })
}


// 手动推荐
export function AddPromoteCustomerr(data) {
  return request({
    url: `${baseUrl}/WeChat/PromoteCustomer`,
    method: 'post',
    data
  })
}
