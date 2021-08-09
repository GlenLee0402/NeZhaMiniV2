import {
  GetCustomerClubDetail,
  ClubSend
} from '../../../../../../api/mine.js'
import SetBasic from '../../../../../../utils/setData'
const app = getApp()
Page({
  data: {
    app: app,
    ClubID: '',
    Loading: true,
    isShow: false,
    Mobile: ''
  },
  onLoad: function (options) {
    this.setData({
      ClubID: options.ClubID
    })
    this.handleGet()
  },
  // 确认提交
  handleConfirm() {
    const data = {
      ID: this.data.Detail.ID,
      Mobile: this.data.Mobile
    }
    if (data.Mobile === "" || data.Mobile.length < 11) {
      SetBasic.Toasts(this, '请输入正确的手机号', 3000, '')
      return false
    }
    app.isBtnPreventActive(() => {
      ClubSend(data).then(res => {
        SetBasic.Toasts(this, res.Message, 3000, '')
        this.handleGet()
      }).catch(err => {

      })
    })
  },
  // 查询
  handleGet() {
    GetCustomerClubDetail(this.data.ClubID).then(res => {
      this.setData({
        Detail: res.Data,
        Loading: false
      })
    })
  },
  // 转增好友
  handleSend() {
    if (this.data.Detail.RestNum === 0) {
      SetBasic.Toasts(this, '暂无可转增的副卡', 3000, '')
      return false
    } else {
      this.setData({
        isShow: true
      })
    }
  },
  // 关闭弹窗
  handleClose() {
    this.setData({
      isShow: false
    })
  }
})