// 获取应用实例
const app = getApp()
import SetBasic from '../../utils/setData'
import {
  PromoteSet
} from '../../utils/auth'
const Auth = require('../../utils/auth')
import {
  GetUse
} from '../../api/user.js'
Page({
  data: {
    CustomTitle: app.globalData.MiNiName, // 首页,邀请好友,我的顶部显示小程序名称
    BasicInfo: null, // 查询基础信息
    BarList: SetBasic.BarList,
    isReward: false,
    PageCur: 'home'
  },
  onLoad(options) {
    if (options.PromoteID !== "" && options.PromoteID !== undefined) {
      PromoteSet(app.globalData.baseUrl, options)
    }
    const pageCur = options.PageCur
    if (pageCur !== undefined) {
      this.setData({
        PageCur: options.PageCur
      })
    }
    this.Mine = this.selectComponent('#Mine')
    this.handleGetUse()
  },
  onShow() {
    this.handleGetMine()
  },
  // 打开开屏红包
  handleOpen() {
    SetBasic.Jump('/pages/component/openReward/index')
  },
  // 关闭弹窗
  handleClose() {
    this.setData({
      isReward: false
    })
  },
  // 底部导航栏切换
  handleNavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
    if (this.data.PageCur === 'home') {
      this.handleGetUse()
    }
    this.handleGetMine()
  },
  handleGetMine() {
    if (this.data.PageCur === 'mine') {
      Auth.GetStorageSyncCheckSession().then(res => {
        if (res === true) {
          this.Mine.handleGet()
        }
      })
    }
  },
  // 查询基础信息
  handleGetUse() {
    GetUse().then(res => {
      this.setData({
        BasicInfo: res.Data
      })
      if (this.data.PageCur !== 'mine' && this.data.BasicInfo.NewRewardFree === 0) {
        this.setData({
          isReward: true
        })
      }
    })
  },
  // 分享
  onShareAppMessage: function (res) {
    let title = ''
    let path = ''
    if (res.from === 'menu') {
      title = app.globalData.MiNiName
      path = app.ShareUrl.Index + '?PromoteID=' + this.data.BasicInfo.CustomerID + '&Source=' + app.Source.Share + '&PageCur=home'
    } else {
      title = res.target.dataset.shareinfo.title
      path = res.target.dataset.shareinfo.path
    }
    console.log('path::::::::', path)
    return {
      title: title,
      path: path
    }
  }
})