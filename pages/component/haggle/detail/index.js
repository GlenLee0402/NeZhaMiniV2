import {
  GetDetail,
  Haggle
} from '../../../../api/haggle'
import {
  PromoteSet,
  GetSence
} from '../../../../utils/auth'
const app = getApp();
const Auth = require('../../../../utils/auth');
const SetBasic = require('../../../../utils/setData');
const Moment = require('../../../../utils/moment.min.js');

Page({
  data: {
    app: app,
    IconUrl: app.globalData.baseUrl + '/Upload/Pictures/mini/',
    Detail: null,
    Params: {
      HaggleID: '',
      CustomerHaggleID: ''
    },
    Time: 0,
    TimeData: null,
    BuyTotalPrice: 0,
    HaggleList: [],
    HaggleStatus: SetBasic.HaggleStatus,
    HaggleWin: false, // 砍价成功
    HaggleWinPrice: 0, // 砍掉价格
    isShareShow: false // 分享方式
  },
  onLoad: async function (options) {
    PromoteSet(app.globalData.baseUrl, options)
    let arr = []
    if (options.scene !== undefined) {
      const res = await GetSence(app.globalData.baseUrl, options.scene)
      arr = res.Data.split(",");
    }
    this.setData({
      "Params.HaggleID": options.ID !== undefined ? options.ID : arr[2],
      "Params.CustomerHaggleID": options.CustomerHaggleID !== undefined ? this.data.CustomerHaggleID : arr[3]
    })
    this.handleGet()
  },
  // onLoad: function (options) {
  //   const cur = Auth.GetCurrentPages()
  //   const arr = wx.getStorageSync('PromoteArr')
  //   this.setData({
  //     CurUrl: cur,
  //     "Params.HaggleID": options.ID !== undefined ? options.ID : arr[2],
  //     "Params.CustomerHaggleID": options.CustomerHaggleID !== undefined ? options.CustomerHaggleID : arr[3]
  //   })
  //   this.handleGet()
  // },
  // onLoad: function (options) {
  //   const cur = Auth.GetCurrentPages()
  //   this.setData({
  //     CurUrl: cur,
  //     DetailHaggleID: options.ID,
  //     DetailCustomerHaggleID: options.CustomerHaggleID
  //   })
  // },
  // onShow: function () {
  //   const arr = wx.getStorageSync('PromoteArr')
  //   this.setData({
  //     "Params.HaggleID": this.data.DetailHaggleID !== undefined ? this.data.DetailHaggleID : arr[2],
  //     "Params.CustomerHaggleID": this.data.v !== undefined ? this.data.DetailCustomerHaggleID : arr[3],
  //   })
  //   this.handleGet()
  // },
  // 自砍或帮砍价
  handleHaggle(e) {
    const data = {
      ID: this.data.Params.HaggleID,
      CustomerHaggleID: this.data.Params.CustomerHaggleID,
      CurUrl: this.data.CurUrl
    }
    Auth.GetStorageSyncCheckSession().then(res => {
      if (res === false) {
        SetBasic.JumpLogin(data)
      } else {
        app.isBtnPreventActive(() => {
          Haggle(this.data.Params).then(res => {
            if (res.ResultType === 0) {
              this.setData({
                HaggleWin: true,
                HaggleWinPrice: res.Data
              })
              this.handleGet()
            }
          }).catch(res => {})
        })
      }
    })
  },
  // 邀请好友砍价
  handleHelp() {
    const data = {
      Width: 350,
      Page: this.data.CurUrl,
      Scene: this.data.Detail.CustomerID + ',' + app.Source.Haggle + ',' + this.data.Detail.HaggleID + ',' + this.data.Detail.CustomerHaggleID,
      PosterUrl: this.data.Detail.HeaderImage,
      Name: this.data.Detail.Name,
      CanvasheaderHeight: 180,
      CanvasheaderWidth: 300,
      BottomInfoHeight: 140,
      OriginPrice: this.data.Detail.TotalPrice,
      TotalPrice: this.data.Detail.MinPrice,
      isShowBtn: true,
      OrderType: this.data.Detail.OrderType,
      QrType: 'Project'
    }
    this.setData({
      isShareShow: true,
      QrParams: data
    })
  },
  // 直接购买
  handleBuy() {
    const data = {
      Num: 1,
      ProjectID: this.data.Detail.ID,
      HaggleID: this.data.Detail.HaggleID,
      CustomerHaggleID: this.data.Detail.CustomerHaggleID,
      OrderType: this.data.Detail.OrderType
    }
    SetBasic.JumpPay(data)
  },
  // 跳转列表
  handleJump() {
    SetBasic.Jump('/pages/component/haggle/index')
  },
  // 关闭弹窗
  handleClose() {
    this.setData({
      HaggleWin: false
    })
  },
  // 计算时间
  handleTimeChange(e) {
    this.setData({
      TimeData: e.detail,
    });
  },
  // 查看大图
  handleBigImage() {
    wx.previewImage({
      current: this.data.Detail.DetailImage, // 当前显示图片的http链接
      urls: [this.data.Detail.DetailImage] // 需要预览的图片http链接列表
    })
  },
  // 查询详细
  handleGet() {
    GetDetail(this.data.Params).then(res => {
      let price = res.Data.TotalPrice - res.Data.AllHaggle
      this.setData({
        Detail: res.Data,
        BuyTotalPrice: (/^-?\d+$/).test(price) === true ? price : price.toFixed(2)
      })
      // 时间转换
      if (this.data.Detail.ExpirationTime !== null) {
        const newTime = Moment(Moment(new Date()).format('YYYY-MM-DD HH:mm')).valueOf()
        const dasTime = Moment(Moment(this.data.Detail.ExpirationTime).format('YYYY-MM-DD HH:mm')).valueOf()
        // 时间转毫秒
        this.setData({
          Time: dasTime - newTime
        })
      }
      // 帮砍列表
      if (this.data.Detail.HaggleList !== null) {
        const list = this.data.Detail.HaggleList
        list.forEach(function (item, index) {
          item.CreateTime = Moment(item.CreateTime).format('YYYY-MM-DD HH:mm')
        })
        this.setData({
          HaggleList: list
        })
      }
    })
  },
  handleToHome() {
    var arr = wx.getStorageSync('PromoteArr')
    wx.reLaunch({
      url: '/pages/index/index?PromoteID=' + arr[0],
    })
  },
  // 分享
  onShareAppMessage: function () {
    let url = '';
    if (this.data.Detail.CustomerHaggleStatus === this.data.HaggleStatus.Ing) {
      url = this.data.CurUrl + '?PromoteID=' + this.data.Detail.CustomerID + '&Source=' + app.Source.Haggle + '&ID=' + this.data.Detail.HaggleID + '&CustomerHaggleID=' + this.data.Detail.CustomerHaggleID
    } else {
      url = this.data.CurUrl + '?PromoteID=' + this.data.Detail.CustomerID + '&Source=' + app.Source.Haggle + '&ID=' + this.data.Detail.HaggleID
    }
    return {
      desc: this.data.Detail.NickName + '邀请您一起来砍价!',
      title: this.data.Detail.Name + ',超低价格,最低可砍至' + this.data.Detail.MinPrice + '元',
      path: url,
      imageUrl: this.data.Detail.HeaderImage
    }
  }
})