import {
  GetProjectDetail
} from '../../../../api/project';
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
      ID: ''
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
      "Params.ID": options.ID !== undefined ? options.ID : arr[2]
    })
    this.handleGet()
  },
  // 查询详细
  handleGet() {
    GetProjectDetail(this.data.Params).then(res => {
      this.setData({
        Detail: res.Data
      })
    })
  },
  onShareAppMessage: function () {
    const curUrl = Auth.GetCurrentPages()
    return {
      desc: this.data.Detail.NickName + '给您送福利啦,邀请您一起变美!',
      title: this.data.Detail.Name + ',超低价格购买体验!',
      path: curUrl + '?PromoteID=' + this.data.Detail.CustomerID + '&Source=' + app.Source.Project + '&ID=' + this.data.Detail.ID
    }
  }
})