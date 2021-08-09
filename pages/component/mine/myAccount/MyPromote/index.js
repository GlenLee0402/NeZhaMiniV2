import {
  GetPromote
} from '../../../../../api/mine.js'
const Moment = require('../../../../../utils/moment.min.js');
import SetBasic from '../../../../../utils/setData'
const Auth = require('../../../../../utils/auth')
const app = getApp()
Page({
  data: {
    app: app,
    IconUrl: app.globalData.baseUrl + '/Upload/Pictures/mini/',
    ListItem: [],
    Detail: '',
    Params: {
      PageNum: app.globalData.pageNum,
      PageSize: app.globalData.pageSize,
      DetailID: '',
      Param: ''
    },
    SearchParam: '',
    Level: 1,
    scrollTop: 0,
    offsetTop: 0,
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
  onScroll(event) {
    wx.createSelectorQuery()
      .select('#scroller')
      .boundingClientRect((res) => {
        this.setData({
          scrollTop: event.detail.scrollTop,
          offsetTop: res.top,
        });
      })
      .exec();
  },
  // 清空
  handleClear() {
    this.setData({
      "Params.Param": ''
    })
    this.handleGet()
  },
  // 查询详情
  handleDetail(e) {
    const id = e.currentTarget.dataset.detail.DetailID
    this.setData({
      "Params.DetailID": id,
      Level: this.data.Level += 1
    })
    this.handleGet()
  },
  // 滚动刷新
  handleLower() {
    if (this.data.ListItem.length >= this.data.Params.PageSize) {
      this.setData({
        "Params.PageSize": this.data.Params.PageSize + 5
      })
      this.handleGet()
    }
  },
  // 搜索
  handleSearch() {
    if (this.data.ListItem.length <= 0) {
      return false
    }
    if (this.data.SearchParam === '') {
      SetBasic.Toasts(this, '请输入好友姓名或手机号', 3000)
    } else {
      this.setData({
        "Params.Param": this.data.SearchParam
      })
      this.handleGet()
    }
  },
  // 查询
  handleGet() {
    GetPromote(this.data.Params).then(res => {
      res.Data.PromoteList.forEach(u => {
        if (u.CreateTime !== null) {
          u.CreateTime = Moment(u.CreateTime).format('YYYY-MM-DD HH:mm')
        }
      })
      this.setData({
        Detail: res.Data,
        ListItem: res.Data.PromoteList
      })
    })
  }
})