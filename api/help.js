import request from '../utils/request.js'
const baseUrl = getApp().globalData.baseUrl + '/api' // 服务器地址
// 查询
export function Get(pageNum, pageSize) {
  return request({
    url: `${baseUrl}/Help/WeChatGet?pageNum=` + pageNum + '&pageSize=' + pageSize,
    method: 'get'
  })
}

// 查询详细
export function GetDetail(ID, friendCustomerID) {
  return request({
    url: `${baseUrl}/Help/WeChatGetDetail?ID=` + ID + '&friendCustomerID=' + friendCustomerID,
    method: 'get'
  })
}

// 查询助力榜单,超过50名后
export function WeChatGetJoinList(ID, pageNum) {
  return request({
    url: `${baseUrl}/Help/WeChatGetJoinList?ID=` + ID + '&pageNum=' + pageNum,
    method: 'get'
  })
}

// 查询我的助力
export function WeChatGetMyHelpList(ID, pageNum) {
  return request({
    url: `${baseUrl}/Help/WeChatGetMyHelpList?ID=` + ID + '&pageNum=' + pageNum,
    method: 'get'
  })
}
// 参加助力
export function JoinHelp(data) {
  return request({
    url: `${baseUrl}/Help/Help`,
    method: 'post',
    data
  })
}