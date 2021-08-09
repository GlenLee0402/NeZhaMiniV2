import {
  GetOrder,
  CancelOrder,
  RePayOfMini,
  GetOrderAddress
} from "../../../../api/mine"
import SetBasic from '../../../../utils/setData.js'
const Moment = require('../../../../utils/moment.min.js');
import Dialog from '../../../../vantui/vant-weapp/dialog/dialog'
const app = getApp()
Page({
  data: {
    app: app,
    TabList: SetBasic.OrderTabList,
    GetParam: {
      PageSize: app.globalData.pageSize,
      PageNum: app.globalData.pageNum,
      PaidStatus: 2
    }, // 查询所需参数
    ListItem: [],
    Active: 'DaiZhiFu',
    ActiveTitle: '',
    Time: 0,
    TimeData: {},
    iSAddress: false,
    SendDetail: {}
  },

  onLoad: function (options) {
    this.setData({
      Active: options.type
    })
    this.handleSwitch(this.data.Active)
  },
  // 复制快递单号
  handleCopy() {
    wx.setClipboardData({
      data: this.data.SendDetail.EMSNo,
      success: function (res) {
        wx.getClipboardData({
          success(res) {}
        })
      }
    })
  },
  // 关闭物流信息
  handleClose() {
    this.setData({
      iSAddress: false
    })
  },
  // 状态跳转
  handleStatusJump(e) {
    const id = e.currentTarget.dataset.id
    const type = e.currentTarget.dataset.type
    if (type === 'EMS') {
      GetOrderAddress(id).then(res => {
        this.setData({
          iSAddress: true,
          SendDetail: res.Data
        })
      })
    }
    if (type === 'GoPay') {
      this.handleGoPay(id)
    }
    if (type === 'QX') {
      const data = {
        ID: id
      }
      var that = this;
      Dialog.confirm({
        context: this,
        message: '是否取消订单?',
        asyncClose: true
      }).then(() => {
        setTimeout(() => {
          Dialog.close();
          CancelOrder(data).then(res => {
            if (res.ResultType === 0) {
              SetBasic.Toasts(this, res.Message, '2000', 'success')
              that.handleSwitch(that.data.Active)
            }
          })
        }, 1000);
      }).catch(() => {
        Dialog.close();
      });
    }
    if (type === 'PT') {
      SetBasic.Jump('/pages/component/assemble/assembleIng/index?ID=' + id)
      console.log('拼团')
    }
  },
  // 去支付
  handleGoPay(id) {
    const data = {
      ID: id
    }
    var that = this;
    RePayOfMini(data).then(res => {
      wx.requestPayment({
        'timeStamp': res.Data.TimeStamp,
        'nonceStr': res.Data.NonceStr,
        'package': res.Data.PackageValue,
        'signType': res.Data.SignType,
        'paySign': res.Data.PaySign,
        'success': function (res) {
          that.setData({
            Active: 'YiFuKuan'
          })
          that.handleSwitch(that.data.Active)
        },
        'fail': function (res) {
          that.setData({
            Active: 'DaiZhiFu'
          })
          that.handleSwitch(that.data.Active)
        },
        'complete': function (res) {}
      })
    })
  },
  // 滚动
  handleLower() {
    if (this.data.ListItem.length >= this.data.GetParam.PageSize) {
      this.setData({
        "GetParam.PageSize": this.data.GetParam.PageSize + 4
      })
      this.handleGet()
    }
  },
  // 切换Tab
  handleActive(e) {
    this.handleSwitch(e.currentTarget.dataset.name)
  },
  // 监听
  handleSwitch(val) {
    this.data.TabList.forEach(item => {
      if (val === item.Name) {
        this.setData({
          Time: 0,
          ListItem: [],
          Active: val,
          ActiveTitle: item.Title,
          "GetParam.PaidStatus": item.Status
        })
      }
    })
    this.handleGet()
  },
  // 查询
  handleGet() {
    GetOrder(this.data.GetParam).then(res => {
      res.Data.forEach(u => {
        if (u.ExpirationTime !== null) {
          const newTime = Moment(Moment(new Date()).format('YYYY-MM-DD HH:mm')).valueOf()
          const dasTime = Moment(Moment(u.ExpirationTime).format('YYYY-MM-DD HH:mm')).valueOf()
          // 时间转毫秒
          this.setData({
            Time: dasTime - newTime
          })
          u.Time = dasTime - newTime
        }
        if (u.CreateTime !== null) {
          u.CreateTime = Moment(u.CreateTime).format('YYYY-MM-DD HH:mm')
        }
        if (u.PaidTime !== null) {
          u.PaidTime = Moment(u.PaidTime).format('YYYY-MM-DD HH:mm')
        }
      })
      this.setData({
        ListItem: res.Data
      })
    })
  }
})