import request from '../utils/request.js'
const baseUrl = getApp().globalData.baseUrl + '/api' // 服务器地址
// 拼团
export function GetPTassemble(pageNum, pageSize) {
  return request({
    url: `${baseUrl}/PinTuan/WeChatGetPagesOfMini?pageNum=` + pageNum + '&pageSize=' + pageSize,
    method: 'get'
  })
}

// 拼团详情 查询
export function GetDetail(data) {
  return request({
    url: `${baseUrl}/PinTuan/WeChatGetDetailOfMini`,
    method: 'post',
    data
  })
}

// 正在拼团
export function GetPinTuaning(data) {
  return request({
    url: `${baseUrl}/WeChatOrder/GetPinTuaningOfMini`,
    method: 'post',
    data
  })
}