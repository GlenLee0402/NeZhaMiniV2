import SetBasic from '../../../../../utils/setData'
import {
  GetCoupon
} from "../../../../../api/mine.js"
const Moment = require('../../../../../utils/moment.min.js');
const app = getApp()
Page({
  data: {
    app: app,
    Tabs: SetBasic.MyCoupon,
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
    GetCoupon(this.data.Params).then(res => {
      res.Data.forEach(u => {
        if (u.CreateTime !== null) {
          u.CreateTime = Moment(u.CreateTime).format('YYYY-MM-DD HH:mm')
        }
        if (u.ExpirationDate !== null && u.ExpirationDate.substring(0, 4) !== '9999') {
          u.ExpirationDate = Moment(u.ExpirationDate).format('YYYY-MM-DD')
        } else {
          u.ExpirationDate = '无限制'
        }
      })
      this.setData({
        ListItem: res.Data
      })
    })
  }
})