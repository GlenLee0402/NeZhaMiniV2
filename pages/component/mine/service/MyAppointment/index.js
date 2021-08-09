import {
  GetAppointment
} from "../../../../../api/mine.js"
const Moment = require('../../../../../utils/moment.min.js');
import SetBasic from '../../../../../utils/setData'
const Auth = require('../../../../../utils/auth')
const app = getApp()
Page({
  data: {
    app: app,
    ListItem: [],
    Params: {
      PageNum: app.globalData.pageNum,
      PageSize: app.globalData.pageSize
    },
    Types: ['', '咨询预约', '治疗预约', '手术预约'],
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
    GetAppointment(this.data.Params).then(res => {
      var reg = /[,，]/g;
      res.Data.forEach(u => {
        if (u.AppointmentDate !== null) {
          u.AppointmentDate = Moment(u.AppointmentDate).format('YYYY-MM-DD')
        }
        if (u.AppointmentStartTime !== null) {
          u.AppointmentStartTime = u.AppointmentStartTime.substring(0, u.AppointmentStartTime.length - 3)
          u.AppointmentEndTime = u.AppointmentEndTime.substring(0, u.AppointmentEndTime.length - 3)
        }
        if (u.ChargeName !== "") {
          u.ChargeName = u.ChargeName.replace(reg, "$&\r\n");
        }
      })
      this.setData({
        ListItem: res.Data
      })
    })
  }
})