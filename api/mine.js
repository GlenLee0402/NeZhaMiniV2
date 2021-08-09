import request from '../utils/request.js'
const baseUrl = getApp().globalData.baseUrl + '/api' // 服务器地址
// 我的
export function GetCustomerInfo() {
  return request({
    url: `${baseUrl}/WeChat/GetCustomerInfo`,
    method: 'get'
  })
}

// 我的优惠券
export function GetCoupon(data) {
  return request({
    url: `${baseUrl}/WeChatMine/GetCoupon`,
    method: 'post',
    data
  })
}

// 我的订单
export function GetOrder(data) {
  return request({
    url: `${baseUrl}/WeChatMine/GetOrder`,
    method: 'post',
    data
  })
}

// 取消订单
export function CancelOrder(data) {
  return request({
    url: `${baseUrl}/WeChatOrder/Cancel`,
    method: 'post',
    data
  })
}

// 重新支付
export function RePayOfMini(data) {
  return request({
    url: `${baseUrl}/WeChatOrder/RePayOfMini`,
    method: 'post',
    data
  })
}

// 我的项目
export function GetCharge(data) {
  return request({
    url: `${baseUrl}/WeChatMine/GetCharge`,
    method: 'post',
    data
  })
}

// 我的咨询评价
export function GetConsult(data) {
  return request({
    url: `${baseUrl}/WeChatMine/GetConsult`,
    method: 'post',
    data
  })
}

// 咨询评价详情
export function GetConsultDetail(consultID) {
  return request({
    url: `${baseUrl}/WeChatmine/GetConsultDetail?consultID=` + consultID,
    method: 'get'
  })
}

// 添加咨询平价
export function AddConsult(data) {
  return request({
    url: `${baseUrl}/WeChatmine/ConsultAdd`,
    method: 'post',
    data
  })
}

// 获取医生评价
export function GetOperation(data) {
  return request({
    url: `${baseUrl}/WeChatMine/GetOperation`,
    method: 'post',
    data
  })
}

// 获取医生评价详情
export function GetOperationDetail(operationID) {
  return request({
    url: `${baseUrl}/WeChatmine/GetOperationDetail?operationID=` + operationID,
    method: 'get'
  })
}

// 医生评价
export function AddOperation(data) {
  return request({
    url: `${baseUrl}/WeChatMine/OperationAdd`,
    method: 'post',
    data
  })
}

// 邀请记录
export function GetPromote(data) {
  return request({
    url: `${baseUrl}/WeChatMine/GetPromote`,
    method: 'post',
    data
  })
}

// 分享家列表
export function GetSuperVip(pageNum, pageSize) {
  return request({
    url: `${baseUrl}/SuperVip/WeChatGetPages?pageNum=` + pageNum + '&pageSize=' + pageSize,
    method: 'get'
  })
}

// 分享家详情
export function GetSuperVipDetail(data) {
  return request({
    url: `${baseUrl}/SuperVIp/WeChatGetDetailOfMini`,
    method: 'post',
    data
  })
}

// 佣金明细
export function GetCommission(data) {
  return request({
    url: `${baseUrl}/WeChatMine/GetCommission`,
    method: 'post',
    data
  })
}
// 转让佣金
export function SendCommission(data) {
  return request({
    url: `${baseUrl}/WeChatMine/SendCommission`,
    method: 'post',
    data
  })
}
// 上传身份证获取JSSDK
export function GetWeChatJsInfo(data) {
  return request({
    url: `${baseUrl}/WeChat/GetWeChatJsInfo`,
    method: 'post',
    data
  })
}

// 提交注册星选家
export function SuperVipRegister(data) {
  return request({
    url: `${baseUrl}/SuperVip/Register`,
    method: 'post',
    data
  })
}

// 上传图片
export function Upload(formData, type) {
  return request({
    url: `${baseUrl}/Picture/Upload?type=` + type,
    method: 'post',
    data: formData
  })
}

// 查看物流
export function GetOrderAddress(weChatOrderID) {
  return request({
    url: `${baseUrl}/WeChatMine/GetOrderAddress?weChatOrderID=` + weChatOrderID,
    method: 'get'
  })
}

// 退出登陆
export function LoginOut(data) {
  return request({
    url: `${baseUrl}/WeChat/LoginOut`,
    method: 'post',
    data
  })
}

// 我的卡包
export function GetCustomerClub() {
  return request({
    url: `${baseUrl}/Club/GetCustomerClub`,
    method: 'get'
  })
}

// 我的副卡
export function GetCustomerClubSend() {
  return request({
    url: `${baseUrl}/Club/GetCustomerClubSend`,
    method: 'get'
  })
}

// 我的卡包详细
export function GetCustomerClubDetail(ID) {
  return request({
    url: `${baseUrl}/Club/GetCustomerClubDetail?ID=` + ID,
    method: 'get'
  })
}

// 转增好友
export function ClubSend(data) {
  return request({
    url: `${baseUrl}/Club/ClubSend`,
    method: 'post',
    data
  })
}

// 好友领取
export function ClubGet(data) {
  return request({
    url: `${baseUrl}/Club/ClubGet`,
    method: 'post',
    data
  })
}

// 我的预收款（余额）明细
export function GetDeposit(data) {
  return request({
    url: `${baseUrl}/WeChatMine/GetDeposit`,
    method: 'post',
    data
  })
}

// 我的消费积分明细
export function GetPoint(data) {
  return request({
    url: `${baseUrl}/WeChatMine/GetPoint`,
    method: 'post',
    data
  })
}

// 我的会员等级
export function GetMemberCategoryInfo() {
  return request({
    url: `${baseUrl}/WeChatMine/GetMemberCategoryInfo`,
    method: 'get'
  })
}
// 会员体系/分享家体系/详情图片
export function GetCategoryImage(type) {
  return request({
    url: `${baseUrl}/WeChatMine/GetCategoryImage?type=` + type,
    method: 'get'
  })
}
// 我的分享家等级
export function GetShareCategoryInfo() {
  return request({
    url: `${baseUrl}/WeChatMine/GetShareCategoryInfo`,
    method: 'get'
  })
}
// 提现
export function OutApply(data) {
  return request({
    url: `${baseUrl}/CommissionOut/OutApply`,
    method: 'post',
    data
  })
}
// 我的提现记录
export function GetCommissionOut(data) {
  return request({
    url: `${baseUrl}/CommissionOut/GetCommissionOut`,
    method: 'post',
    data
  })
}
// 取消提现
export function CancelCommissionOut(data) {
  return request({
    url: `${baseUrl}/CommissionOut/Cancel`,
    method: 'post',
    data
  })
}

// 我的预约
export function GetAppointment() {
  return request({
    url: `${baseUrl}/WeChatMine/GetAppointment`,
    method: 'get'
  })
}