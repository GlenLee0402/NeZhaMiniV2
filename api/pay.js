import request from '../utils/request.js'
const baseUrl = getApp().globalData.baseUrl + '/api' // 服务器地址
// 确认订单
// 获取商品
export function GetProjectConfirm(data) {
  return request({
    url: `${baseUrl}/WeChatOrder/ProjectConfirm`,
    method: 'post',
    data
  })
}

// 支付
export function PayConfirm(data) {
  return request({
    url: `${baseUrl}/WeChatOrder/PayOfMini`,
    method: 'post',
    data
  })
}