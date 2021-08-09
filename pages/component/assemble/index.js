import {
  GetPTassemble
} from '../../../api/assemble'
import SetBasic from '../../../utils/setData'
const Auth = require('../../../utils/auth')
const app = getApp();
Page({
  data: {
    app: app,
    ListItem: [],
    pageNum: app.globalData.pageNum,
    pageSize: app.globalData.pageSize,
  },
  onLoad: function (options) {
    this.handleGet()
  },
  handleJump(e) {
    let url = Auth.GetCurrentPages()
    SetBasic.JumpDetailPage(url, e.currentTarget.dataset.id)
  },
  // 滚动分页
  handleLower() {
    if (this.data.ListItem.length >= this.data.pageSize) {
      this.setData({
        pageSize: this.data.pageSize + 2
      })
      this.handleGet()
    }
  },
  // 查询
  handleGet() {
    GetPTassemble(this.data.pageNum, this.data.pageSize).then(res => {
      this.setData({
        PromoteID: res.Data.CustomerID,
        ListItem: res.Data.ProjectList
      })
    })
  },
  // onShareAppMessage: function () {
  //   const curUrl = AUTH.GetCurrentPages()
  //   return {
  //     desc: app.globalData.MiNiName,
  //     title: '我正在拼团,邀请您一起变美!',
  //     path: curUrl + '?PromoteID=' + this.data.PromoteID
  //   }
  // }
})