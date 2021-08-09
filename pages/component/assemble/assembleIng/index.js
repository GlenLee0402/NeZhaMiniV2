import {
  GetPinTuaning
} from '../../../../api/assemble'
import {
  PromoteSet,
  GetSence
} from '../../../../utils/auth'
const Moment = require('../../../../utils/moment.min.js');
const Auth = require('../../../../utils/auth');
const SetBasic = require('../../../../utils/setData');
const app = getApp();
Page({
  data: {
    app: app,
    IconUrl: app.globalData.baseUrl + '/Upload/Pictures/mini/',
    isShareShow: false,
    QrParams: null,
    PinTuanOrderID: ''
  },
  onLoad: async function (options) {
    PromoteSet(app.globalData.baseUrl, options)
    const url = Auth.GetCurrentPages();
    let arr = []
    if (options.scene !== undefined) {
      const res = await GetSence(app.globalData.baseUrl, options.scene)
      arr = res.Data.split(",");
    }
    this.setData({
      PinTuanOrderID: options.ID !== undefined ? options.ID : arr[2],
      CurUrl: url
    })
    const data = {
      ID: this.data.PinTuanOrderID,
      CurUrl: this.data.CurUrl
    }
    Auth.GetStorageSyncCheckSession().then(res => {
      res === true ? this.handleGet() : SetBasic.JumpLogin(data)
    })
  },
  // onLoad: function (options) {
  //   const url = Auth.GetCurrentPages();
  //   this.setData({
  //     DetailPinTuanOrderID: options.ID ,
  //     CurUrl: url
  //   })
  // },
  // onShow: function () {
  //   const arr = wx.getStorageSync('PromoteArr')
  //   this.setData({
  //     PinTuanOrderID: this.data.DetailPinTuanOrderID !== undefined ? this.data.DetailPinTuanOrderID : arr[2]
  //   })
  //   const data = {
  //     ID: this.data.PinTuanOrderID,
  //     CurUrl: this.data.CurUrl
  //   }
  //   Auth.GetStorageSyncCheckSession().then(res => {
  //     res === true ? this.handleGet() : SetBasic.JumpLogin(data)
  //   })
  // },
  // 参与或分享
  handleJoin(e) {
    const type = e.currentTarget.dataset.type
    if (type === 'Share') {
      const data = {
        Width: 350,
        Page: this.data.CurUrl,
        PosterUrl: this.data.Detail.MinImage,
        Name: this.data.Detail.Name,
        CanvasheaderHeight: 180,
        CanvasheaderWidth: 300,
        BottomInfoHeight: 140,
        isShowBtn: true,
        OrderType: this.data.Detail.OrderType,
        QrType: 'Project',
        OriginPrice: this.data.Detail.OriginPrice,
        TotalPrice: this.data.Detail.TotalPrice,
        PeopleNum: this.data.Detail.Num,
        Scene: this.data.Detail.PromoteID + ',' + app.Source.PinTuan + ',' + this.data.Detail.PinTuanOrderID,
      }
      this.setData({
        isShareShow: true,
        QrParams: data
      })
    } else {
      const data = {
        Num: 1,
        ProjectID: this.data.Detail.ID,
        PinTuanID: this.data.Detail.PinTuanID,
        OrderType: this.data.Detail.OrderType,
        PinTuanOrderID: this.data.Detail.PinTuanOrderID
      }
      SetBasic.JumpPay(data)
    }
  },
  // 查询
  handleGet() {
    const data = {
      PinTuanOrderID: this.data.PinTuanOrderID
    }
    GetPinTuaning(data).then(res => {
      res.Data.EndTime = Moment(res.Data.EndTime).format('YYYY-MM-DD HH:mm')
      this.setData({
        Detail: res.Data
      })
    })
  },
  onShareAppMessage: function () {
    const curUrl = Auth.GetCurrentPages()
    return {
      desc: '我正在拼团,邀请您一起变美!',
      title: this.data.Detail.Name + '超低价格购买体验!',
      path: curUrl + '?PromoteID=' + this.data.Detail.PromoteID + '&Source=' + app.Source.PinTuan + '&ID=' + this.data.Detail.PinTuanOrderID,
      imageUrl: this.data.Detail.MinImage
    }
  }
})