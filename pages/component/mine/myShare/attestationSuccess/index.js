const app = getApp()
Page({
  data: {
    IconUrl: app.globalData.baseUrl + '/Upload/Pictures/mini/',
    Status: null,
    StatusText: '',
    Time: 3,
    isOpen: true
  },
  onLoad: function (options) {
    let text = ''
    if (parseInt(options.Status) == 1) {
      text = '您已经成功申请并已开通星选家功能'
    } else {
      text = '客服正在审核中,1-3个工作日将会通知您!'
    }
    this.setData({
      Status: parseInt(options.Status),
      StatusText: text
    })
  },
  onReady() {
    let time = 2;
    var Interval = setInterval(() => {
      time--;
      if (time > 0) {
        this.setData({
          isOpen: true
        })
      } else {
        clearInterval(Interval);
        this.setData({
          isOpen: false
        })
        if (this.data.Status === 1) {
          this.handleJumpTime()
        }
      }
    }, 1000)
  },
  // 跳转首页
  handleJumpHome() {
    wx.redirectTo({
      url: '/pages/index/index?PageCur=home'
    })
  },
  // 跳转倒计时
  handleJumpTime() {
    let time = 3;
    var Interval = setInterval(() => {
      time--;
      if (time > 0) {
        this.setData({
          Time: time
        })
      } else {
        clearInterval(Interval);
        this.handleGo();
      }
    }, 1000)
  },
  handleGo() {
    wx.redirectTo({
      url: '/pages/component/mine/myShare/selectList/index'
    })
  }
})