import {
  GetCustomerClub,
  GetCustomerClubSend
} from '../../../../../api/mine.js'
import SetBasic from '../../../../../utils/setData'
const Auth = require('../../../../../utils/auth')
const app = getApp()
Page({
  data: {
    app: app,
    Loading: true,
    ListItem: [],
    Types: ['', '主卡', '副卡'],
    ClubType: '1'
  },
  onLoad: function (options) {
    this.setData({
      ClubType: options.ClubType
    })
    const cur = Auth.GetCurrentPages()
    const data = {
      CurUrl: cur,
      ClubType: this.data.ClubType
    }
    Auth.GetStorageSyncCheckSession().then(res => {
      res === true ? this.handleGet() : SetBasic.JumpLogin(data)
    })
  },
  // 查询主卡列表
  handleGet() {
    if (this.data.ClubType === '1') {
      GetCustomerClub().then(res => {
        this.setData({
          ListItem: res.Data,
          Loading: false
        })
      })
    } else {
      GetCustomerClubSend().then(res => {
        this.setData({
          ListItem: res.Data,
          Loading: false
        })
      })
    }
  },
  // 跳转
  handleJump(e) {
    const id = e.currentTarget.dataset.clubid
    const type = e.currentTarget.dataset.clubtype
    const url = '/pages/component/mine/service/MyCard/detail/index?ClubID=' + id + '&ClubType=' + type
    SetBasic.Jump(url)
  }
})