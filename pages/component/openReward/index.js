const app = getApp();
const Auth = require('../../../utils/auth')
const Moment = require('../../../utils/moment.min.js');
const SetBasic = require('../../../utils/setData')
import {
  GetNewReward,
  ReceiveNewReward
} from '../../../api/openReward';
Page({
  data: {
    IconUrl: app.globalData.baseUrl + '/Upload/Pictures/mini/',
    Detail: {}
  },
  onLoad: function (params) {

  },
  onShow: function (params) {
    this.handleGet()
  },
  handleGoHome() {
    // 推荐人ID
    var pid = wx.getStorageSync('PromoteID')
    const url = '/pages/index/index?PromoteID=' + pid
    SetBasic.Jump(url)
  },
  // 跳转查看
  handleJump(e) {
    const url = e.currentTarget.dataset.url
    SetBasic.Jump(url)
  },
  handleJumpWechat(e) {
    const url = e.currentTarget.dataset.webview
    SetBasic.Jump('/component/WebViwe/WeChat/index?url=' + url)
  },
  // 领取
  handleConfirm() {
    const url = Auth.GetCurrentPages()
    const data = {
      CurUrl: url
    }
    app.isBtnPreventActive(() => {
      Auth.GetStorageSyncCheckSession().then(res => {
        if (res === true) {
          ReceiveNewReward().then(res => {
            SetBasic.Toasts(this, res.Message, 3000)
            this.handleGet()
          }).catch(err => {})
        } else {
          SetBasic.JumpLogin(data)
        }
      })
    })
  },
  // 返回上一页
  handleBackPage() {
    wx.navigateBack({
      delta: 1
    })
  },
  // 查询
  handleGet() {
    GetNewReward().then(res => {
      const detailTemp = res.Data
      // 项目限制时间
      if (detailTemp.ChargeList.length > 0) {
        detailTemp.ChargeList.forEach(function (item, index) {
          if (item.ExpirationDate !== null) {
            item.ExpirationDate = Moment(item.ExpirationDate).format('YYYY-MM-DD')
          }
        })
      }
      // 优惠券限制时间
      if (detailTemp.CouponList.length > 0) {
        detailTemp.CouponList.forEach(function (item, index) {
          if (item.ExpirationDate !== null) {
            item.ExpirationDate = Moment(item.ExpirationDate).format('YYYY-MM-DD')
          }
        })
      }
      this.setData({
        Detail: detailTemp
      })
      // if (this.data.detail.NewRewardFree === 1) {
      //   this.setData({
      //     isCheck: false
      //   })
      // }
    })
  }
})