import {
  GetMemberCategoryInfo,
  GetCategoryImage
} from "../../../../api/mine.js"
const app = getApp()
Page({
  data: {
    Detail: {},
    DetailImg: '',
    isShow: false,
    Type: 10
  },
  onLoad: function (options) {
    this.handleGet()
  },
  // 查看会员体系
  handleisShow() {
    GetCategoryImage(this.data.Type).then(res => {
      this.setData({
        DetailImg: res.Data,
        isShow: true
      })
    })
  },
  // 会员体系
  handleisClose() {
    this.setData({
      isShow: false
    })
  },
  // 查询
  handleGet() {
    GetMemberCategoryInfo().then(res => {
      this.setData({
        Detail: res.Data
      })
    })
  }
})