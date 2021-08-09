import {
  GetHaggle
} from '../../../api/haggle'
import SetBasic from '../../../utils/setData'
const Auth = require('../../../utils/auth')
const app = getApp();
Page({
  data: {
    app: app,
    ListItem: [],
    pageNum: app.globalData.pageNum,
    pageSize: app.globalData.pageSize,
    active: 'Home'
  },
  onLoad: function (options) {
    this.handleGet()
  },
  handleJump(e) {
    let url = Auth.GetCurrentPages()
    SetBasic.JumpDetailPage(url, e.currentTarget.dataset.id, e.currentTarget.dataset.customerhaggleid)
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
    GetHaggle(this.data.pageNum, this.data.pageSize).then(res => {
      this.setData({
        PromoteID: res.Data.CustomerID,
        ListItem: res.Data.ProjectList
      })
    })
  },
  onShow: function () {
    this.setData({
      active: 'Home'
    })
    this.handleGet()
  },
  // 切换
  handleTabbarChange(e) {
    this.setData({
      active: e.detail
    });
  },
  onShareAppMessage: function () {
    const curUrl = Auth.GetCurrentPages()
    return {
      desc: app.globalData.MiNiName,
      title: '邀请您一起来砍价!',
      path: curUrl + '?PromoteID=' + this.data.PromoteID
    }

  }
})