import request from '../utils/request.js'
const baseUrl = getApp().globalData.baseUrl + '/api' // 服务器地址
// 查看
export function GetHaggle(pageNum, pageSize) {
  return request({
    url: `${baseUrl}/Haggle/WeChatGetPagesOfMini?pageNum=` + pageNum + '&pageSize=' + pageSize,
    method: 'get'
  })
}

// 详情 查询
export function GetDetail(data) {
  return request({
    url: `${baseUrl}/Haggle/WeChatGetDetailOfMini`,
    method: 'post',
    data
  })
}

// 砍价
export function Haggle(data) {
  return request({
    url: `${baseUrl}/Haggle/Haggle`,
    method: 'post',
    data
  })
}
// 我的砍价
export function GetHaggleMine(pageNum, pageSize) {
  return request({
    url: '/Haggle/GetMine',
    url: `${baseUrl}/Haggle/GetMine?pageNum=` + pageNum + '&pageSize=' + pageSize,
    method: 'get'
  })
}