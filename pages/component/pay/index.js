import {
  GetProjectConfirm,
  PayConfirm
} from "../../../api/pay.js"
import SetBasic from '../../../utils/setData'
import Notify from '../../../vantui/vant-weapp/notify/notify';
const app = getApp();
Page({
  data: {
    app: app,
    Params: null,
    Detail: {},
    isLockBtn: false, // 支付按钮
    Deposit: null, // 预售款
    Coupon: null, // 优惠券
    Commission: null, // 佣金
    Total: 0, // 其他总计
    PointTotal: 0, // 积分兑换总计
    Active: {}, // 特殊套餐设置
    ChildChecked: [], // 统计子节点选中
    ActiveChecked: [], // 统计父节点选中
    Loading: true,
    ErrText: ''
  },
  onLoad: function (options) {
    this.setData({
      Params: JSON.parse(options.Params)
    })
  },
  onShow: function () {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    this.setData({
      Params: currPage.data.Params
    })
    this.handleGet()
  },
  // 跳转首页
  handleJumpBack() {
    wx.navigateBack({
      delta: 1
    })
    // wx.redirectTo({
    //   url: '/pages/index/index?PageCur=home'
    // })
  },
  // 离开聚焦
  handleBlur(e) {
    const type = e.currentTarget.dataset.type
    if (type === 'Deposit') {
      this.setData({
        isDisabled0: false
      })
    }
    if (type === 'Coupon') {
      this.setData({
        isDisabled1: false
      })
    }
    if (type === 'Commission') {
      this.setData({
        isDisabled2: false
      })
    }
  },
  // 输入余额
  handleAmountField(e) {
    const val = Number(e.detail)
    const type = e.currentTarget.dataset.type
    if (type === 'Deposit') {
      if (val > this.data.Detail.CanUseDepositAmount) {
        this.setData({
          Deposit: null,
          isDisabled0: true
        })
      }
    }
    if (type === 'Coupon') {
      if (val > this.data.Detail.CanUseCouponAmount) {
        this.setData({
          Coupon: null,
          isDisabled1: true
        })
      }
    }
    if (type === 'Commission') {
      if (val > this.data.Detail.CommissionAmount) {
        this.setData({
          Commission: null,
          isDisabled2: true
        })
      }
    }
    this.handleTotal()
  },
  // 特殊套餐折叠
  handleCollapseChange(e) {
    this.setData({
      Active: e.detail,
    });
  },
  // 最外层选择
  handleCheckChange(event) {
    this.setData({
      ActiveChecked: event ? event.detail : this.data.ActiveChecked,
    });

    const {
      Detail,
      ChildChecked,
      ActiveChecked
    } = this.data
    const SelectNum = Detail.ChargeSet.SelectNum
    const childNum = ChildChecked.length
    if (ActiveChecked.length + childNum >= SelectNum) {
      const dataSor = []
      Detail.ChargeSet.ChargeList.forEach((p, i) => {
        dataSor.push({
          ...p,
          IsCheck: ActiveChecked.find(u => u === p.ChargeID) ? true : false,
          disabled: !ActiveChecked.find(u => u === p.ChargeID)
        })
      })
      this.setData({
        'Detail.ChargeSet.ChargeList': dataSor
      })
      this.childDisabled(true)
    } else {
      const dataSor = []
      Detail.ChargeSet.ChargeList.forEach((p, i) => {
        dataSor.push({
          ...p,
          disabled: false,
          IsCheck: ActiveChecked.find(u => u === p.ChargeID) ? true : false,
        })
      })
      this.setData({
        'Detail.ChargeSet.ChargeList': dataSor
      })
      this.childDisabled(false)
    }
  },
  // 子节点是否禁用  childDisabled
  childDisabled(disabled) {
    const {
      Detail
    } = this.data
    const dataSor = []
    Detail.ChargeSet.ChargeSetList.forEach((p, i) => {
      const IsCheck = p.ChargeList.some(p => p.IsCheck)
      dataSor.push({
        ...p,
        ChargeList: p.ChargeList.map(u => {
          let isdisabled = false;
          if (this.data.ChildChecked.length === 0 && disabled) {
            isdisabled = true
          } else {
            isdisabled = this.data.ChildChecked.some(l => {
              return l !== u.ID
            })
          }
          return {
            ...u,
            disabled: isdisabled
          }
        })
      })
    })
    this.setData({
      'Detail.ChargeSet.ChargeSetList': dataSor
    })
  },
  // 子节点选中
  onChange(event) {
    this.setData({
      ChildChecked: event.detail,
    });
    this.handleCheckChange()
  },
  // 子节点
  handleSetCheckbox(num, val, i, fi) {
    console.log(num, val)
    if (val.disabled) {
      return false
    }
    const Charge = this.Detail.ChargeSet.ChargeSetList[fi]
    const checkLen = Charge.ChargeList.filter(p => p.IsCheck)
    const newArr = {
      ...Charge
    }

    if (checkLen.length >= num) {
      newArr.ChargeList = Charge.ChargeList.map(p => ({
        ...p,
        disabled: !checkLen.find(u => u.ID === p.ID)
      }))
    } else {
      newArr.ChargeList = Charge.ChargeList.map(p => ({
        ...p,
        disabled: false
      }))
    }
    if (checkLen.length) {
      this.ChildChecked.push(fi)
    } else {
      this.ChildChecked.pop()
    }
    this.ChildChecked = Array.from(new Set(this.ChildChecked))
    this.$set(this.Detail.ChargeSet.ChargeSetList, fi, newArr)
    this.handleChargeCheckbox()
  },
  // 修改数量
  handleNumOnChange(e) {
    const num = e.detail <= 1 ? 1 : e.detail;
    this.setData({
      'Detail.Num': num
    })
    this.handleTotal()
  },
  // 跳转地址
  handleAddress() {
    const url = '/pages/component/mine/myAddress/index?Params=' + JSON.stringify(this.data.Params)
    SetBasic.Jump(url)
  },
  // 提交订单
  handlePayConfirm() {
    // 判断是否是特殊套餐项目，并检测是否有未选中
    if (this.data.Detail.IsSpecial) {
      var childChecked = this.data.ChildChecked // 统计子节点选中
      var activeChecked = this.data.ActiveChecked // 统计父节点选中
      var count = this.data.Detail.ChargeSet.SelectNum // 必选数量
      if (childChecked.length + activeChecked.length < count) {
        Notify({
          context: this,
          selector: '#van-notify',
          message: '请检查！还有项目未选择！'
        })
        return false
      }
      var concat = childChecked.concat(activeChecked)
      this.data.Detail.ChargeSetIDList = concat
    }
    // 佣金
    if (this.data.Detail.OrderType !== app.orderType.PointProject) {
      this.data.Detail.CommissionAmount = this.data.Commission
    }
    // 优惠券
    this.data.Detail.CanUseCouponAmount = this.data.Coupon
    // 预收款
    this.data.Detail.CanUseDepositAmount = this.data.Deposit

    // 推荐人
    this.data.Detail.PromoteID = wx.getStorageSync('PromoteID')
    // 推荐时间
    this.data.Detail.PromoteDateTime = wx.getStorageSync('PromoteDateTime')
    // 分享人分享时间
    this.data.Detail.SourceTime = wx.getStorageSync('PromoteDateTime')
    // 场景值
    this.data.Detail.Source = wx.getStorageSync('SourceType')
    if (this.data.isLockBtn === true) {
      return false
    } {
      app.isBtnPreventActive((res) => {
        PayConfirm(this.data.Detail).then(res => {
          const _this = this;
          const data = res.Data
          let url = '';
          if (data.IsPay === 0) {
            wx.requestPayment({
              'timeStamp': data.TimeStamp,
              'nonceStr': data.NonceStr,
              'package': data.PackageValue,
              'signType': data.SignType,
              'paySign': data.PaySign,
              'success': function () {
                if (_this.data.Detail.OrderType === app.orderType.PinTuan) {
                  url = '/pages/component/assemble/assembleIng/index?PinTuanOrderID=' + data.PinTuanOrderID
                } else {
                  url = '/pages/component/mine/order/index?type=YiFuKuan'
                }
                _this.handleJump(url)
              },
              'fail': function (res) {
                _this.handleJump('/pages/component/mine/order/index?type=DaiZhiFu')
              },
            })
          } else {
            if (_this.data.Detail.OrderType === app.orderType.PinTuan) {
              url = '/pages/component/assemble/assembleIng/index?ID=' + data.PinTuanOrderID
            } else {
              url = './paySuccess/index?PinTuanOrderID=' + data.PinTuanOrderID
            }
            _this.handleJump(url)
          }
        })
      })
    }
  },
  // 计算总额
  handleTotal() {
    const total = this.data.Detail.Num * this.data.Detail.TotalPrice - this.data.Commission - this.data.Coupon - this.data.Deposit
    const pointTotal = this.data.Detail.Num * this.data.Detail.TotalAmount - this.data.Coupon - this.data.Deposit
    if (total < 0 || pointTotal < 0) {
      this.setData({
        Commission: null, // 佣金
        Coupon: null, // 优惠券
        Deposit: null, // 预售款
      })
    }
    // 计算积分
    if (this.data.Detail.OrderType !== app.orderType.PointProject) {
      this.setData({
        Total: this.data.Detail.Num * this.data.Detail.TotalPrice - this.data.Commission - this.data.Coupon - this.data.Deposit
      })
    } else {
      this.setData({
        PointTotal: this.data.Detail.Num * this.data.Detail.TotalAmount - this.data.Coupon - this.data.Deposit
      })
    }
    if (isNaN(parseInt(this.data.Total)) === true || isNaN(parseInt(this.data.PointTotal)) === true) {
      this.setData({
        isLockBtn: true
      })
    } else {
      this.setData({
        isLockBtn: false
      })
    }
  },
  // 查询
  handleGet() {
    GetProjectConfirm(this.data.Params).then(res => {
      this.setData({
        Loading: false,
        Detail: res.Data
      })
      this.handleTotal()
      const Detail = res.Data
      if (res.Data.ChargeSet) {
        Detail.ChargeSet.ChargeList = res.Data.ChargeSet.ChargeList.map(p => ({
          ...p,
          IsCheck: false,
          disabled: false
        }))
        Detail.ChargeSet.ChargeSetList = res.Data.ChargeSet.ChargeSetList.map(p => ({
          ...p,
          ChargeList: p.ChargeList.map(p => ({
            ...p,
            IsCheck: false,
            disabled: false
          }))
        }))
        this.setData({
          Detail
        })
      }
    }).catch(err => {
      this.setData({
        isLockBtn: true,
        ErrText: err.Message
      })
    })
  },
  // 成功后跳转
  handleJump(url) {
    wx.redirectTo({
      url: url
    })
  }
})