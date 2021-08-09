import {
  GetDetail
} from '../../../../api/point'
import {
  PromoteSet,
  GetSence
} from '../../../../utils/auth'
const app = getApp();
const Auth = require('../../../../utils/auth');
Page({
  data: {
    app: app,
    Detail: null,
    Params: {
      PointProjectID: ''
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
      "Params.PointProjectID": options.ID !== undefined ? options.ID : arr[2]
    })
    this.handleGet()
  },
  // onLoad: function (options) {
  //   const arr = wx.getStorageSync('PromoteArr')
  //   this.setData({
  //     "Params.PointProjectID": options.ID !== undefined ? options.ID : arr[2]
  //   })
  //   this.handleGet()
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
    console.log(cur + '?PromoteID=' + this.data.Detail.CustomerID + '&Source=' + app.Source.PointProject + '&ID=' + this.data.Detail.PointProjectID)
    return {
      desc: this.data.Detail.NickName + '给您送福利啦!',
      title: '免费兑换,' + this.data.Detail.Name + ',低至0元',
      path: cur + '?PromoteID=' + this.data.Detail.CustomerID + '&Source=' + app.Source.PointProject + '&ID=' + this.data.Detail.PointProjectID, // 路径，传递参数到指定页面。
      imageUrl: this.data.Detail.MinImage
    }
  }
})