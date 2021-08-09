const app = getApp()
Page({
  data: {
    IconUrl: app.globalData.baseUrl + '/Upload/Pictures/mini/paysu.png',
  },
  handleJump(e) {
    const type = e.currentTarget.dataset.type
    if (type === 'back') {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    } else {
      wx.redirectTo({
        url: '/pages/component/mine/order/index?type=YiFuKuan',
      })
    }
  }
})