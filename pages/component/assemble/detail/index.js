import {
  GetDetail
} from '../../../../api/assemble'
import {
  PromoteSet,
  GetSence
} from '../../../../utils/auth'
const Auth = require('../../../../utils/auth');
const app = getApp()
Page({
  data: {
    app: app,
    Detail: null,
    Params: {
      PinTuanID: ''
    }
  },
  // onLoad: function (options) {
  //   const arr = wx.getStorageSync('PromoteArr')
  //   this.setData({
  //     "Params.PinTuanID": options.ID !== undefined ? options.ID : arr[2]
  //   })
  //   this.handleGet()
  // },
  onLoad: async function (options) {
    PromoteSet(app.globalData.baseUrl, options)
    let arr = []
    if (options.scene !== undefined) {
      const res = await GetSence(app.globalData.baseUrl, options.scene)
      arr = res.Data.split(",");
    }
    this.setData({
      "Params.PinTuanID": options.ID !== undefined ? options.ID : arr[2]
    })
    this.handleGet()
  },
  // 查询详细
  handleGet() {
    GetDetail(this.data.Params).then(res => {
      this.setData({
        Detail: res.Data
      })
    })
  },
  onShareAppMessage: function () {
    const cur = Auth.GetCurrentPages()
    return {
      desc: this.data.Detail.NickName + '邀请您一起来拼团!',
      title: this.data.Detail.Name + '多人拼团,超低价格',
      path: cur + '?PromoteID=' + this.data.Detail.CustomerID + '&Source=' + app.Source.PinTuan + '&ID=' + this.data.Detail.PinTuanID, // 路径，传递参数到指定页面。
      imageUrl: this.data.Detail.MinImage
    }
  }
})