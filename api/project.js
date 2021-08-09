import request from '../utils/request.js'
const baseUrl = getApp().globalData.baseUrl + '/api' // 服务器地址

// 查询普通商品
export function GetProjectPages(pageNum, pageSize, categoryName) {
  return request({
    url: `${baseUrl}/Project/WeChatGetPagesOfMini?pageNum=` + pageNum + '&pageSize=' + pageSize + '&projectCategoryName=' + categoryName,
    method: 'get'
  })
}
// 查询普通商品详情
export function GetProjectDetail(data) {
  return request({
    url: `${baseUrl}/Project/WeChatGetDetailOfMini`,
    method: 'post',
    data
  })
}
// 普通商品分类查询
export function GetCategory(type) {
  return request({
    url: `${baseUrl}/ProjectCategory/WeChatGet?type=` + type,
    method: 'get'
  })
}

// 获取直播 access_token
export function Getliveinfo(data) {
  return request({
    url: 'https://api.weixin.qq.com/wxa/business/getliveinfo?access_token',
    method: 'post',
    data
  })
}

// 特权专区 
export function GetMemberPagesOfMini(pageNum, pageSize) {
  return request({
    url: `${baseUrl}/Mini/WeChatGetMemberPagesOfMini?pageNum=` + pageNum + '&pageSize=' + pageSize,
    method: 'get'
  })
}

// 首页搜索
export function GetWeChatSearchPages(pageNum, pageSize, param) {
  return request({
    url: `${baseUrl}/Mini/WeChatSearchPages?pageNum=` + pageNum + '&pageSize=' + pageSize + '&param=' + param,
    method: 'get'
  })
}

// 关键字查询
export function GetWeChatKey() {
  return request({
    url: `${baseUrl}/Key/WeChatGet`,
    method: 'get'
  })
}