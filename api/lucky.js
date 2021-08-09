import request from '../utils/request.js'
const baseUrl = getApp().globalData.baseUrl + '/api' // 服务器地址
// 获取抽奖
export function Get() {
  return request({
    url: `${baseUrl}/Lucky/WeChatGet`,
    method: 'get'
  })
}

// 开始抽奖
export function Lucky(data) {
  return request({
    url: `${baseUrl}/Lucky/Lucky`,
    method: 'post',
    data
  })
}


// 我的中奖记录
export function GetMine(data) {
  return request({
    url: `${baseUrl}/Lucky/Mine`,
    method: 'post',
    data
  })
}
// 获取抽奖
export function GetDetail(luckyID) {
  return request({
    url: `${baseUrl}/Lucky/WeChatGetDetail?luckyID=` + luckyID,
    method: 'get'
  })
}