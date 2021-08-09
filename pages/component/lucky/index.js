import {
  Get
} from '../../../api/lucky';
import {
  PromoteSet,
  GetSence
} from '../../../utils/auth'
const SetBasic = require('../../../utils/setData')
const Auth = require('../../../utils/auth')
const app = getApp();
Page({
  data: {
    app: app,
    ListItem: []
  },
  onLoad: function (options) {
    PromoteSet(app.globalData.baseUrl, options)
    const cur = Auth.GetCurrentPages()
    const data = {
      CurUrl: cur
    }
    Auth.GetStorageSyncCheckSession().then(res => {
      res === true ? this.handleGet() : SetBasic.JumpLogin(data)
    })
  },
  // 查询
  handleGet() {
    Get().then(res => {
      this.setData({
        ListItem: res.Data
      })
    })
  },
  // 跳转
  handleJump(e) {
    let url = Auth.GetCurrentPages()
    let isCan = e.currentTarget.dataset.canlucky
    if (isCan === false) {
      SetBasic.Toasts(this, '您当前尚未达到此抽奖资格!', 3000)
      return false
    } else {
      SetBasic.JumpDetailPage(url, e.currentTarget.dataset.id)
    }
  }
})