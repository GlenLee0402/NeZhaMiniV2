import request from '../utils/request.js'
const baseUrl = getApp().globalData.baseUrl + '/api' // 服务器地址
// 秒杀列表
export function GetSecKill(pageNum, pageSize) {
  return request({
    url: `${baseUrl}/SecKill/WeChatGetPagesOfMini?pageNum=` + pageNum + '&pageSize=' + pageSize,
    method: 'get'
  })
}

// 秒杀详情
export function GetDetail(data) {
  return request({
    url: `${baseUrl}/SecKill/WeChatGetDetailOfMini`,
    method: 'post',
    data
  })
}