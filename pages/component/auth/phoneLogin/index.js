const app = getApp()
const watch = require('../../../../utils/util.js')
const SetBasic = require('../../../../utils/setData.js')
import {
  RegisterAndLoginByPhone,
  SendCode,
  OnLogin
} from '../../../../api/user.js'
Page({
  data: {
    app: app,
    IconUrl: app.globalData.baseUrl + '/Upload/Pictures/mini/',
    Phone: '',
    Code: '',
    canIUseGetUserProfile: false,
    SendText: '获取验证码',
    isPhone: false,
    isLogin: true,
    isCode: true
  },
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    const params = JSON.parse(options.Params)
    this.setData({
      Params: params,
      CurUrl: params.CurUrl + '?ID=' + params.ID + '&PageCur=' + params.PageCur + '&BarType=' + params.BarType + '&CustomerHaggleID=' +
        params.CustomerHaggleID + '&PinTuanOrderID=' + params.PinTuanOrderID + '&ChannelID=' + params.ChannelID + '&LotteryType=' +
        params.LotteryType + '&PromoteID=' + params.PromoteID + '&FriendCustomerID=' + params.FriendCustomerID + '&ClubType=' + params.ClubType
    })
    watch.SetWatch(this);
  },
  //监听data里的数据
  watch: {
    Code: function (val) {
      let is = false;
      val.length >= 6 ? is = false : is = true
      this.setData({
        isLogin: is
      })
    },
    Phone: function (val) {
      let is = false;
      val.length >= 11 ? is = false : is = true
      this.setData({
        isCode: is
      })
      // if (val !== '' && val.length >= 11) {
      //   this.setData({
      //     isCode: false
      //   })
      // }
    }
  },
  onShow: function () {
    wx.hideHomeButton()
  },
  // 页面卸载返回 首页
  onUnload: function () {
    if (this.data.Params.PageCur === 'home') {
      wx.redirectTo({
        url: this.data.Params.CurUrl + '?PageCur=' + this.data.Params.PageCur
      })
    }
  },
  // 登陆
  handleConfirm() {
    if (this.data.Code.length < 6 || this.data.Phone.length < 11) {
      return false
    }
  },
  // 7.0版本后GetUserProfile
  handleGetUserProfile() {
    if (this.data.SendText !== '获取验证码' || this.data.isCode === true) {
      return false
    }
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
                  // if (that.data.PageCur !== undefined) {
                  //   wx.reLaunch({
                  //     url: that.data.CurUrl
                  //   })
                  // } else {
                  //   wx.redirectTo({
                  //     url: that.data.CurUrl
                  //   })
                  // }
                } else {
                  app.userData.NickName = user.userInfo.nickName
                  app.userData.City = user.userInfo.city
                  app.userData.Country = user.userInfo.country
                  app.userData.Province = user.userInfo.province
                  app.userData.Sex = user.userInfo.gender
                  app.userData.HeadImgUrl = user.userInfo.avatarUrl
                  that.handleSend()
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
  handleSend() {
    var that = this;
    var time = 60;
    this.setData({
      SendText: '60秒后重发',
      isCode: true
    })
    // 获取验证码
    SendCode(this.data.Phone).then(res => {
      if (res.ResultType === 0) {
        SetBasic.Toasts(this, '发送成功', 3000)
      }
    })
    // 倒计时
    var Interval = setInterval(function () {
      time--;
      if (time > 0) {
        that.setData({
          SendText: time + '秒后重发'
        })
      } else {
        clearInterval(Interval);
        that.setData({
          SendText: '获取验证码',
          isCode: false
        })
      }
    }, 1000)
  },
  // 确认登陆
  handleConfirm() {

    var phone = this.data.Phone
    var code = this.data.Code
    // var phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (phone === "" || phone.length !== 11 || code === '') {
      return false
    } else {
      const data = {
        Code: this.data.Code,
        Phone: this.data.Phone,
        PromoterID: wx.getStorageSync('PromoteID'),
        OpenID: app.userData.OpenID,
        SessionKey: app.userData.SessionKey,
        UnionID: app.userData.UnionID,
        NickName: app.userData.NickName,
        City: app.userData.City,
        Country: app.userData.Country,
        Province: app.userData.Province,
        Sex: app.userData.Sex,
        HeadImgUrl: app.userData.HeadImgUrl,
        SourceTime: wx.getStorageSync('PromoteDateTime'),
        Source: wx.getStorageSync('SourceType')
      }
      console.log('手机号登陆:::::::', data)
      var token = wx.getStorageSync('Token');
      if (token !== "") {
        wx.setStorageSync('CheckSession', true) // 记录登陆状态
        if (this.data.PageCur !== undefined) {
          wx.reLaunch({
            url: this.data.CurUrl
          })
        } else {
          wx.reLaunch({
            url: this.data.CurUrl
          })
        }

      } else {
        app.isBtnPreventActive(() => {
          RegisterAndLoginByPhone(data).then(res => {
            if (res.ResultType === 0) {
              wx.setStorageSync('Token', res.Data)
              wx.setStorageSync('CheckSession', true) // 记录登陆状态
              if (this.data.PageCur !== undefined) {
                wx.reLaunch({
                  url: this.data.CurUrl
                })
              } else {
                wx.reLaunch({
                  url: this.data.CurUrl
                })
              }
            }
          }).catch(err => {
            console.log('err:::::::::::::', err)
          })
        })
      }
    }
  }
})