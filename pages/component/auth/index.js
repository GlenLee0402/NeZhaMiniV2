const app = getApp()
import {
  RegisterAndLogin,
  OnLogin
} from '../../../api/user.js'
Page({
  data: {
    app: app,
    IconUrl: app.globalData.baseUrl + '/Upload/Pictures/mini/',
    CanIUse: wx.canIUse('button.open-type.getUserInfo'),
    CanIUseGetUserProfile: false,
    isPhone: false, // 获取用户手机号提示弹窗
    Params: ''
  },
  onShow: function () {
    wx.hideHomeButton()
  },
  onLoad: function (options) {
    const params = JSON.parse(options.Params)
    if (wx.getUserProfile) {
      this.setData({
        CanIUseGetUserProfile: true
      })
    }
    this.setData({
      Params: params,
      CurUrl: params.CurUrl + '?ID=' + params.ID + '&PageCur=' + params.PageCur + '&BarType=' + params.BarType + '&CustomerHaggleID=' +
        params.CustomerHaggleID + '&PinTuanOrderID=' + params.PinTuanOrderID + '&ChannelID=' + params.ChannelID + '&LotteryType=' +
        params.LotteryType + '&PromoteID=' + params.PromoteID + '&FriendCustomerID=' + params.FriendCustomerID + '&ClubType=' + params.ClubType
    })
    // console.log('授权CurUrl:::::::', this.data.CurUrl)
  },
  // 页面卸载返回 首页
  onUnload: function () {
    if (this.data.Params.PageCur === 'home') {
      wx.redirectTo({
        url: this.data.Params.CurUrl + '?PageCur=' + this.data.Params.PageCur
      })
    }
  },
  // 跳转手机号登陆
  handlePhoneLogin() {
    wx.navigateTo({
      url: '/pages/component/auth/phoneLogin/index?Params=' + JSON.stringify(this.data.Params),
    })
  },
  // 7.0版本后GetUserProfile
  handleGetUserProfile() {
    var that = this;
    wx.getUserProfile({
      desc: '正在获取', //不写不弹提示框
      success: function (user) {
        if (user.errMsg === 'getUserProfile:ok') {
          wx.login({
            success: function (login) {
              OnLogin(login.code).then(res => {
                app.userData.OpenID = res.Data.OpenID
                app.userData.SessionKey = res.Data.SessionKey
                app.userData.UnionID = res.Data.UnionID
                var echo = res.Data
                if ('Token' in echo === true) {
                  wx.setStorageSync('Token', res.Data.Token) // 保存token
                  wx.setStorageSync('OpenID', res.Data.OpenID) // 保存UnionID
                  wx.setStorageSync('CheckSession', true) // 记录登陆状态
                  // 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面
                  wx.reLaunch({
                    url: that.data.CurUrl
                  })
                } else {
                  app.userData.NickName = user.userInfo.nickName
                  app.userData.City = user.userInfo.city
                  app.userData.Country = user.userInfo.country
                  app.userData.Province = user.userInfo.province
                  app.userData.Sex = user.userInfo.gender
                  app.userData.HeadImgUrl = user.userInfo.avatarUrl
                  that.setData({
                    isPhone: true
                  })
                }
              })
            }
          })
        }
      },
      fail: function (err) {
        console.log("获取失败: ", err)
      }
    })
  },
  // 获取手机号
  handleGetPhone(e) {
    if (e.detail.errMsg === "getPhoneNumber:ok") {
      this.setData({
        isPhone: false
      })
      app.userData.Iv = e.detail.iv
      app.userData.EncryptedData = e.detail.encryptedData
      this.getRegisterLogin()
    }
  },
  // 注册登陆
  getRegisterLogin() {
    // 获取保存的推荐人ID
    console.log('微信注册登陆::::::::::::::', app.userData)
    app.userData.PromoterID = wx.getStorageSync('PromoteID')
    app.userData.SourceTime = wx.getStorageSync('PromoteDateTime')
    app.userData.Source = wx.getStorageSync('SourceType')
    RegisterAndLogin(app.userData).then(res => {
      if (res.ResultType === 0) {
        wx.setStorageSync('Token', res.Data) // 保存token
        wx.setStorageSync('CheckSession', true) // 记录登陆状态
        if (this.data.PageCur !== undefined) {
          wx.reLaunch({
            url: this.data.CurUrl
          })
        } else {
          wx.redirectTo({
            url: this.data.CurUrl
          })
        }
      }
    })
  }
  // 微信7.0之前版本
  // handleWeChat() {
  //   var that = this;
  //   wx.login({
  //     success: function (code) {
  //       if (code.code) {
  //         wx.getSetting({
  //           success: (set) => {
  //             if (set.authSetting['scope.userInfo']) {
  //               OnLogin(code.code).then(res => {
  //                 app.userData.OpenID = res.Data.OpenID
  //                 app.userData.SessionKey = res.Data.SessionKey
  //                 app.userData.UnionID = res.Data.UnionID
  //                 var echo = res.Data
  //                 // 是否存在Token
  //                 if ('Token' in echo === true) {
  //                   wx.reLaunch({
  //                     url: that.data.CurUrl
  //                   })
  //                   console.log('OnLogin:::::::;', res)
  //                   // wx.setStorageSync('Token', res.Data.Token) // 保存token
  //                   // wx.setStorageSync('OpenID', res.Data.OpenID) // 保存UnionID
  //                   // wx.setStorageSync('CheckSession', true) // 记录登陆状态
  //                 } else { // 不存在则获取用户基础信息
  //                   wx.getUserInfo({
  //                     success: function (res) {
  //                       app.userData.NickName = res.userInfo.nickName
  //                       app.userData.City = res.userInfo.city
  //                       app.userData.Country = res.userInfo.country
  //                       app.userData.Province = res.userInfo.province
  //                       app.userData.Sex = res.userInfo.gender
  //                       app.userData.HeadImgUrl = res.userInfo.avatarUrl
  //                       that.setData({
  //                         isPhone: true
  //                       })
  //                     }
  //                   });
  //                 }

  //               })
  //             }
  //           }
  //         })
  //       }
  //     }
  //   });
  // },
})