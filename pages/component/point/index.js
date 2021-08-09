import {
  GetPointProject
} from '../../../api/point'
const app = getApp();
const Auth = require('../../../utils/auth')
const SetBasic = require('../../../utils/setData')
Page({
  data: {
    app: app,
    PageNum: app.globalData.pageNum,
    PageSize: app.globalData.pageSize,
    categoryName: '',
    CurUrl: ''
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
  // 分类
  handleCategoryName(e) {
    this.setData({
      categoryName: e.detail,
      pageNum: app.globalData.pageNum,
      pageSize: app.globalData.pageSize
    })
    this.handleGet()
  },
  // 查询分类默认第一个
  handleCategoryNameOne(e) {
    this.setData({
      categoryName: e.detail
    })
  },
  // 滚动分页
  handleLower() {
    if (this.data.ListItem.length >= this.data.PageSize) {
      this.setData({
        PageSize: this.data.PageSize + 4
      })
      this.handleGet()
    }
  },
  // 查询
  handleGet() {
    GetPointProject(this.data.PageNum, this.data.PageSize, this.data.categoryName).then(res => {
      this.setData({
        ListItem: res.Data.ProjectList
      })
    })
  },
  // 详情
  handleJump(e) {
    let url = Auth.GetCurrentPages()
    SetBasic.JumpDetailPage(url, e.currentTarget.dataset.id)
  },
  onShareAppMessage: function () {

  }
})