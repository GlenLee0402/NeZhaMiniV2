import {
  GetMemberPagesOfMini
} from '../../../api/project.js'
const app = getApp();
const Auth = require('../../../utils/auth')
const SetBasic = require('../../../utils/setData')
const Moment = require('../../../utils/moment.min.js');
Page({
  data: {
    app: app,
    pageNum: app.globalData.pageNum,
    pageSize: app.globalData.pageSize,
    categoryName: '',
    CurUrl: '',
    isSecKill: '结束',
    time: 0
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
  // 滚到到地步触发
  handleLower(e) {
    if (this.data.ListItem.length >= this.data.pageSize) {
      this.setData({
        pageSize: this.data.pageSize + 4
      })
      this.handleGet()
    }
  },
  // 秒杀结束时间
  handleTimeChange(e) {
    this.setData({
      TimeData: e.detail,
    });
  },
  // 查询
  handleGet() {
    GetMemberPagesOfMini(this.data.pageNum, this.data.pageSize, this.data.categoryName).then(res => {
      this.setData({
        ListItem: res.Data.ProjectList
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
  },
  // 跳转
  handleJump(e) {
    const item = e.currentTarget.dataset.item;
    let url = '';
    let id = '';

    // // 精品优选
    if (item.OrderType === this.data.app.orderType.Project) {
      url = '/pages/component/home/index'
      id = item.ID
    }
    // // 限时秒杀
    if (item.OrderType === this.data.app.orderType.SecKill) {
      url = '/pages/component/seckill/index'
      id = item.SecKillID
    }
    // 多人拼团
    if (item.OrderType === this.data.app.orderType.PinTuan) {
      url = '/pages/component/assemble/index'
      id = item.PinTuanID
    }
    // 积分兑换
    if (item.OrderType === this.data.app.orderType.PointProject) {
      url = '/pages/component/point/index'
      id = item.PointProjectID
    }
    SetBasic.JumpDetailPage(url, id)
  }
})