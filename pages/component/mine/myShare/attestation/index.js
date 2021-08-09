const app = getApp()
import {
  SuperVipRegister
} from '../../../../../api/mine.js'
Page({
  data: {
    app: app,
    height: app.globalData.StatusHeight - 100 + 'px',
    floorstatus: false,
    SuperVipImageUrl: ''
  },
  onLoad: function (options) {
    this.setData({
      SuperVipImageUrl: options.url
    })
  },
  // 开通
  handleConfirm() {
    app.isBtnPreventActive(() => {
      SuperVipRegister().then(res => {
        if (res.ResultType === 0) {
          const url = '/pages/component/mine/myShare/attestationSuccess/index?Status=' + res.Data
          wx.redirectTo({
            url: url
          })
        }
      }).catch(res => {})
    })
  },
  // 获取滚动条当前位置
  onPageScroll: function (e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  //回到顶部
  goTop: function (e) { // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  }
})