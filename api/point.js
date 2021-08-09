import request from '../utils/request.js'
const baseUrl = getApp().globalData.baseUrl + '/api' // 服务器地址

// 积分商城列表
export function GetPointProject(pageNum, pageSize, categoryName) {
  return request({
    url: `${baseUrl}/PointProject/WeChatGetPagesOfMini?pageNum=` + pageNum + '&pageSize=' + pageSize + '&projectCategoryName=' + categoryName,
    method: 'get'
  })
}

// 详情
export function GetDetail(data) {
  return request({
    url: `${baseUrl}/PointProject/WeChatGetDetailOfMini`,
    method: 'post',
    data
  })
}