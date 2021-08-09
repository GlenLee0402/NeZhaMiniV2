import {
  GetSuperVipDetail
} from '../../../../../../api/mine'
import {
  PromoteSet,
  GetSence
} from '../../../../../../utils/auth'
const Auth = require('../../../../../../utils/auth')
const SetBasic = require('../../../../../../utils/setData')
const app = getApp()
Page({
  data: {
    app: app,
    Detail: null,
    Params: {
      SuperVipProjectID: ''
    }
  },
  onLoad: async function (options) {
    PromoteSet(app.globalData.baseUrl, options)
    let arr = []
    const cur = Auth.GetCurrentPages()
    if (options.scene !== undefined) {
      const res = await GetSence(app.globalData.baseUrl, options.scene)
      arr = res.Data.split(",");
    }
    this.setData({
      CurUrl: cur,
      "Params.SuperVipProjectID": options.ID !== undefined ? options.ID : arr[2]
    })
    const data = {
      CurUrl: this.data.CurUrl,
      ID: this.data.Params.SuperVipProjectID
    }
    Auth.GetStorageSyncCheckSession().then(res => {
      res === true ? this.handleGet() : SetBasic.JumpLogin(data)
    })
  },
  // onLoad: function (options) {
  //   const arr = wx.getStorageSync('PromoteArr')
  //   const cur = Auth.GetCurrentPages()
  //   this.setData({
  //     "Params.SuperVipProjectID": options.ID !== undefined ? options.ID : arr[2],
  //     CurUrl: cur
  //   })
  //   const data = {
  //     CurUrl: this.data.CurUrl,
  //     ID: this.data.Params.SuperVipProjectID
  //   }
  //   Auth.GetStorageSyncCheckSession().then(res => {
  //     res === true ? this.handleGet() : SetBasic.JumpLogin(data)
  //   })
  // },
  // onLoad: function (options) {
  //   const cur = Auth.GetCurrentPages()
  //   this.setData({
  //     DetailSuperVipProjectID: options.ID,
  //     CurUrl: cur
  //   })
  // },
  // onShow: function () {
  //   const arr = wx.getStorageSync('PromoteArr')
  //   this.setData({
  //     "Params.SuperVipProjectID": this.data.DetailSuperVipProjectID !== undefined ? this.data.DetailSuperVipProjectID : arr[2]
  //   })
  //   const data = {
  //     CurUrl: this.data.CurUrl,
  //     ID: this.data.Params.SuperVipProjectID
  //   }
  //   Auth.GetStorageSyncCheckSession().then(res => {
  //     res === true ? this.handleGet() : SetBasic.JumpLogin(data)
  //   })
  // },

  // 查询详细
  handleGet() {
    GetSuperVipDetail(this.data.Params).then(res => {
      this.setData({
        Detail: res.Data
      })
    })
  },
  onShareAppMessage: function () {
    console.log(this.data.CurUrl + '?PromoteID=' + this.data.Detail.CustomerID + '&Source=' + app.Source.ShareSend + '&ID=' + this.data.Detail.SuperVipProjectID)
    return {
      desc: this.data.Detail.NickName + '给您送福利啦!',
      title: this.data.Detail.Name + ',免费赠送数量有限',
      path: this.data.CurUrl + '?PromoteID=' + this.data.Detail.CustomerID + '&Source=' + app.Source.ShareSend + '&ID=' + this.data.Detail.SuperVipProjectID, // 路径，传递参数到指定页面。
      imageUrl: this.data.Detail.MinImage
    }
  }
})