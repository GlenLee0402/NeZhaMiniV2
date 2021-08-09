import {
  Get
} from '../../../api/help'
const app = getApp()
const Moment = require('../../../utils/moment.min.js');
import SetBasic from '../../../utils/setData'
const Auth = require('../../../utils/auth')
Page({
  data: {
    app: app,
    ListItem: [],
    PageNum: app.globalData.pageNum,
    PageSize: app.globalData.pageSize,
  },
  onLoad: function () {
    this.handleGet()
  },

  // 跳转
  hadnleJump(e) {
    let url = Auth.GetCurrentPages()
    SetBasic.JumpDetailPage(url, e.currentTarget.dataset.id)
  },
  // 查询更多
  handleLower() {
    if (this.data.ListItem.length >= this.data.PageSize) {
      this.setData({
        PageSize: this.data.PageSize + 5
      })
      this.handleGet()
    }
  },
  // 查询
  handleGet() {
    Get(this.data.PageNum, this.data.PageSize).then(res => {
      const newTime = Moment(Moment(new Date()).format('YYYY-MM-DD')).valueOf()
      res.Data.forEach(u => {
        if (u.StartTime !== null) {
          const dasTime = Moment(Moment(u.EndTime).format('YYYY-MM-DD')).valueOf()
          u.StartTime = Moment(u.StartTime).format('YYYY-MM-DD')
          u.EndTime = Moment(u.EndTime).format('YYYY-MM-DD')
          u.NewTime = newTime
          u.DasTime = dasTime
          if (u.NewTime > u.DasTime) {
            u.EndText = '活动已经结束'
          } else {
            u.EndText = null
          }
        }
      })
      this.setData({
        ListItem: res.Data
      })
    })
  }
})