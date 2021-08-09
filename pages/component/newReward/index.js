import {
  GetNewReward
} from '../../../api/newReward'
const app = getApp();
const Auth = require('../../../utils/auth')
const SetBasic = require('../../../utils/setData')
Page({
  data: {
    app: app,
    pageNum: app.globalData.pageNum,
    pageSize: app.globalData.pageSize,
    categoryName: '',
    CurUrl: '',
    ListItem: ''
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
  // 底部刷新
  handleLower() {},
  // 查询
  handleGet() {
    GetNewReward(this.data.pageNum, this.data.pageSize).then(res => {
      this.setData({
        ListItem: res.Data.ProjectList
      })
    })
  },
  // 跳转详情
  handleJump(e) {
    let url = Auth.GetCurrentPages()
    SetBasic.JumpDetailPage(url, e.currentTarget.dataset.id, e.currentTarget.dataset.channelid)
  },
  onShareAppMessage: function () {

  }
})