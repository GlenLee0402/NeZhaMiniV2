import SetBasic from '../../../../../utils/setData'
import {
  GetCharge
} from "../../../../../api/mine.js"
const Moment = require('../../../../../utils/moment.min.js');
const Auth = require('../../../../../utils/auth')
const app = getApp()
Page({
  data: {
    app: app,
    Tabs: SetBasic.MyCharge,
    Params: {
      PageNum: app.globalData.pageNum,
      PageSize: app.globalData.pageSize,
      Type: 1
    },
    ListItem: []
  },
  onLoad: function (options) {
    const cur = Auth.GetCurrentPages()
    const data = {
      CurUrl: cur
    }
    Auth.GetStorageSyncCheckSession().then(res => {
      res === true ? this.handleGet() : SetBasic.JumpLogin(data)
    })
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
    GetCharge(this.data.Params).then(res => {
      res.Data.ChargeList.forEach(u => {
        if (u.CreateTime !== null) {
          u.CreateTime = Moment(u.CreateTime).format('YYYY-MM-DD HH:mm')
        }
      })
      this.setData({
        ListItem: res.Data.ChargeList
      })
    })
  }
})