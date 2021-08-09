import {
  GetWeChatSearchPages,
  GetWeChatKey
} from '../../../api/project.js'
import SetBasic from '../../../utils/setData'
const Moment = require('../../../utils/moment.min.js');
const app = getApp();
Page({
  data: {
    app: app,
    KeyListItem: [], // 关键字
    ListItem: [], // 商品信息
    isHistory: true, // 是否显示历史搜索,默认显示
    name: '',
    pageNum: app.globalData.pageNum,
    pageSize: app.globalData.pageSize
  },
  onLoad: function () {
    this.handleGetKey()
  },
  // 滚动分页
  handleLower() {
    if (this.data.ListItem.length >= this.data.pageSize) {
      this.setData({
        pageSize: this.data.pageSize + 5
      })
      this.handleGet()
    }
  },
  // 跳转页面
  handleJump(e) {
    const item = e.currentTarget.dataset.item
    let url = ''
    // 精品优选
    if (item.OrderType === this.data.app.orderType.Project) {
      url = '/pages/component/home/detail/index?ID=' + item.ID
    }
    // 限时秒杀
    if (item.OrderType === this.data.app.orderType.SecKill) {
      url = '/pages/component/seckill/detail/index?ID=' + item.SecKillID
    }
    // 多人拼团
    if (item.OrderType === this.data.app.orderType.PinTuan) {
      url = '/pages/component/assemble/detail/index?ID=' + item.PinTuanID
    }
    // 积分兑换
    if (item.OrderType === this.data.app.orderType.PointProject) {
      url = '/pages/component/point/detail/index?ID=' + item.PointProjectID
    }
    SetBasic.Jump(url)
  },
  // 输入框
  handleChange(e) {
    this.setData({
      name: e.detail
    })
    if (this.data.name === '') {
      this.setData({
        isHistory: true
      })
    }
  },
  // 搜索
  handleSearch(e) {
    this.setData({
      name: ''
    })
    let param = '';
    this.data.name !== '' ? param = this.data.name : param = e.currentTarget.dataset.name
    this.setData({
      name: param
    })
    if (this.data.name === '') {
      SetBasic.Toasts(this, '请输入商品名称', 2500)
    } else {
      this.handleGet()
    }
  },
  // 查询关键字
  handleGetKey() {
    GetWeChatKey(this.data.name).then(res => {
      this.setData({
        KeyListItem: res.Data
      })
    })
  },
  // 查询搜索
  handleGet() {
    GetWeChatSearchPages(this.data.pageNum, this.data.pageSize, this.data.name).then(res => {
      this.setData({
        ListItem: res.Data.ProjectList,
        isHistory: false
      })
      this.data.ListItem.forEach(item => {
        if (item.OrderType === this.data.app.orderType.SecKill) {
          if (item.EndTime !== null) {
            const newTime = Moment(Moment(new Date()).format('YYYY-MM-DD HH:mm')).valueOf()
            const dasTime = Moment(Moment(item.EndTime).format('YYYY-MM-DD HH:mm')).valueOf()
            const startTime = Moment(Moment(item.StartTime).format('YYYY-MM-DD HH:mm')).valueOf()
            if (startTime > newTime) {
              this.setData({
                isSecKill: '开始',
                time: startTime - newTime
              })
            } else {
              this.setData({
                isSecKill: '结束',
                time: dasTime - newTime
              })
            }
          }
        }
      })
    })
  }
})