import request from '../utils/request.js'
const baseUrl = getApp().globalData.baseUrl + '/api' // 服务器地址
// 查询列表
export function GetNewReward() {
  return request({
    url: `${baseUrl}/Mini/GetNewReward`,
    method: 'get'
  })
}

// 领取
export function ReceiveNewReward(data) {
  return request({
    url: `${baseUrl}/Mini/ReceiveNewReward`,
    method: 'post',
    data
  })
}