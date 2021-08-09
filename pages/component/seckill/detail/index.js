import {
  GetDetail
} from '../../../../api/secKill'
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
      SecKillID: ''
    }
  },
  onLoad: async function (options) {
    PromoteSet(app.globalData.baseUrl, options)
    let arr = []
    if (options.scene !== undefined) {
      const res = await GetSence(app.globalData.baseUrl, options.scene)
      arr = res.Data.split(",");
    }
    this.setData({
      "Params.SecKillID": options.ID !== undefined ? options.ID : arr[2]
    })
    this.handleGet()
  },
  // onLoad: function (options) {
  //   const arr = wx.getStorageSync('PromoteArr')
  //   this.setData({
  //     "Params.SecKillID": options.ID !== undefined ? options.ID : arr[2]
  //   })
  //   this.handleGet()
  // },

  // onLoad: function (options) {
  //   this.setData({
  //     DetailID: options.ID
  //   })
  // },
  // onShow: function () {
  //   const arr = wx.getStorageSync('PromoteArr')
  //   console.log('秒杀:::::::::::::', arr)
  //   this.setData({
  //     "Params.SecKillID": this.data.DetailID !== undefined ? this.data.DetailID : arr[2]
  //   })
  //   console.log('秒杀参数:::::::::::::', this.data.Params.SecKillID)
  //   this.handleGet()
  // },
  // handelGetStorageSync(p) {
  //   return wx.getStorageSync(p)
  // },
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
      desc: this.data.Detail.NickName + '给您送福利啦,邀请您一起来秒杀!',
      title: this.data.Detail.Name + '秒杀马上结束了,快来行动吧',
      path: cur + '?PromoteID=' + this.data.Detail.CustomerID + '&Source=' + app.Source.SecKill + '&ID=' + this.data.Detail.SecKillID, // 路径，传递参数到指定页面。
      imageUrl: this.data.Detail.MinImage
    }
  }
})