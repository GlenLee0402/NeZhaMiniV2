import SetBasic from '../../../../../utils/setData'
import {
  GetDeposit
} from "../../../../../api/mine.js"
const Moment = require('../../../../../utils/moment.min.js');
const app = getApp()
Page({
  data: {
    app: app,
    Tabs: SetBasic.MyDeposit,
    ListItem: [],
    Params: {
      PageNum: app.globalData.pageNum,
      PageSize: app.globalData.pageSize,
      Type: 1
    }
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.handleGet()
  },
  // 选中
  handleActive(e) {
    this.setData({
      "Params.Type": e.detail
    })
    this.handleGet()
  },
  // 滚动
  handleLower() {
    if (this.data.ListItem.length >= this.data.Params.PageSize) {
      this.setData({
        "Params.PageSize": this.data.Params.PageSize + 5
      })
      this.handleGet()
    }
  },
  // 查询
  handleGet() {
    GetDeposit(this.data.Params).then(res => {
      res.Data.forEach(u => {
        if (u.CreateTime !== null) {
          u.CreateTime = Moment(u.CreateTime).format('YYYY-MM-DD HH:mm')
        }
        if (u.PaidTime !== null) {
          u.PaidTime = Moment(u.PaidTime).format('YYYY-MM-DD HH:mm')
        }
      })
      this.setData({
        ListItem: res.Data
      })
    })
  }
})