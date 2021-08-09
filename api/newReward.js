import request from '../utils/request.js'
const baseUrl = getApp().globalData.baseUrl + '/api' // 服务器地址

// 查询新人福利
export function GetNewReward() {
  return request({
    url: `${baseUrl}/NewReward/WeChatGetPages`,
    method: 'get'
  })
}
// 查询普通商品详情
export function GetNewRewardDetail(data) {
  return request({
    url: `${baseUrl}/NewReward/WeChatGetDetail`,
    method: 'post',
    data
  })
}