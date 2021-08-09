import {
  GetSuperVip
} from '../../../../../api/mine.js'
import SetBasic from '../../../../../utils/setData'
const Auth = require('../../../../../utils/auth')
const app = getApp()
Page({
  data: {
    app: app,
    ListItem: [],
    PageNum: app.globalData.pageNum,
    PageSize: app.globalData.pageSize
  },
  onLoad: function (options) {
    this.handleGet()
  },
  // 滚动分页
  handleLower() {
    if (this.data.ListItem.length >= this.data.PageSize) {
      this.setData({
        PageSize: this.data.PageSize + 4
      })
      this.handleGet()
    }
  },
  handleJump(e) {
    let url = Auth.GetCurrentPages()
    SetBasic.JumpDetailPage(url, e.currentTarget.dataset.id)
  },
  // 查询
  handleGet() {
    GetSuperVip(this.data.PageNum, this.data.PageSize).then(res => {
      this.setData({
        ListItem: res.Data
      })
    })
  }
})