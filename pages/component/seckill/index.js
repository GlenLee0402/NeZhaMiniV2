import {
  GetSecKill
} from '../../../api/secKill.js'
import SetBasic from '../../../utils/setData'
const Auth = require('../../../utils/auth')
const Moment = require('../../../utils/moment.min.js');
const app = getApp();

Page({
  data: {
    app: app,
    ListItem: [],
    Time: 0,
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
    GetSecKill(this.data.pageNum, this.data.pageSize).then(res => {
      res.Data.ProjectList.forEach((item, index) => {
        if (item.EndTime !== null) {
          const newTime = Moment(Moment(new Date()).format('YYYY-MM-DD HH:mm')).valueOf()
          const dasTime = Moment(Moment(item.EndTime).format('YYYY-MM-DD HH:mm')).valueOf()
          const startTime = Moment(Moment(item.StartTime).format('YYYY-MM-DD HH:mm')).valueOf()
          if (startTime > newTime) {
            item.isSecKill = true
            item.Time = startTime - newTime
          } else {
            item.isSecKill = false
            item.Time = dasTime - newTime
          }
        }
      })
      this.setData({
        PromoteID: res.Data.CustomerID,
        ListItem: res.Data.ProjectList
      })
    })
  },
  onShareAppMessage: function () {
    const curUrl = Auth.GetCurrentPages()
    return {
      desc: app.globalData.MiNiName,
      title: '邀请您一起来秒杀!',
      path: curUrl + '?PromoteID=' + this.data.PromoteID
    }

  }
})