import {
  GetDetail,
  Lucky,
  GetMine
} from '../../../../api/lucky';
const Moment = require('../../../../utils/moment.min.js');
const app = getApp()
const Auth = require('../../../../utils/auth')
const SetBasic = require('../../../../utils/setData')
Page({
  data: {
    app: app,
    height: app.globalData.StatusHeight - 80 + 'px',
    IconUrl: app.globalData.baseUrl + '/Upload/Pictures/mini/',
    // 奖品列表
    prizes: [],
    blocks: [{
        padding: '1px',
        background: '#e2cea3',
        borderRadius: '13px'
      },
      {
        padding: '5px',
        background: 'white',
        borderRadius: '13px'
      },
      {
        padding: '1px',
        background: '#e2cea3',
        borderRadius: '8px'
      },
      {
        padding: '15px 10px',
        background: '#fffcf5',
        borderRadius: '8px'
      },
    ],
    // 按钮样式
    buttons: [{
      x: 1,
      y: 1,
      // background: 'linear-gradient(270deg, #FFDCB8, #FDC689)',
      // shadow: '0 5 1 #e89b4f',
      imgs: [{
        src: app.globalData.baseUrl + '/Upload/Pictures/mini/newimages/buttons.png',
        width: '65%',
        top: '20%'
      }]
    }],
    // 默认样式
    defaultStyle: {
      // background: '#ffefd6',
      borderRadius: '5px',
      fontColor: '#755c28',
      fontSize: '10px',
      lineHeight: '12px'
    },
    // 选中后的样式
    activeStyle: {
      background: '#de7247',
      fontColor: '#ffefd6',
    },
    Detail: null, // 查询详情
    isShowType: '', // 弹窗类别
    isShow: false,
    isHidden: false,
    MinePrizeList: [],
    SearchForm: {
      PageSize: 20,
      PageNum: 1,
    },
    LuckyDetail: null,
    ErrMessage: '',
    isShareShow: false,
    QrParams: {},
    CurUrl: '',
    LuckyID: '',
    OtherBgColor: ''
  },
  onLoad: function (options) {
    const cur = Auth.GetCurrentPages()
    this.setData({
      CurUrl: cur,
      LuckyID: options.ID
    })
    this.handleGet()
  },
  // 邀请好友抽奖
  handleShareShow() {
    const data = {
      Width: 350,
      Page: '/pages/component/lucky/index',
      Scene: this.data.Detail.CustomerID + ',' + app.Source.Lucky, //this.data.Detail.CustomerID + ',' + app.Source.Lucky,
      PosterUrl: this.data.Detail.ShareUrl,
      CanvasheaderHeight: 180,
      CanvasheaderWidth: 300,
      isShowBtn: false,
      QrType: 'Friend'
    }
    this.setData({
      isShareShow: true,
      QrParams: data
    })
  },
  // 开始抽奖
  handleStart() {
    const child = this.selectComponent('#myLucky')
    this.handleHide()
    if (this.data.Lock) {
      return false;
    } else {
      const data = {
        ID: this.data.Detail.ID
      }
      Lucky(data).then(res => {
        this.setData({
          LuckyDetail: res.Data,
          Lock: true
        })
        if (res.ResultType === 0) {
          // 请求成功后 调用play方法开始旋转
          child.$lucky.play()
          // 调用stop方法然后缓慢停止 
          child.$lucky.stop(this.data.LuckyDetail.Sort)
          this.setData({
            'Detail.RestNum': this.data.LuckyDetail.RestNum,
            'Detail.RestCommission': this.data.LuckyDetail.RestCommission,
            'Detail.RestPoint': this.data.LuckyDetail.RestPoint,
            'Detail.TodayRestNum': this.data.LuckyDetail.TodayRestNum
          })
        } else {
          SetBasic.Toasts(this, res.Message, 4000)
        }
      }).catch(r => {})
    }
  },
  // 抽奖完毕回调
  handleEnd() {
    this.setData({
      isShow: true, // 是否打开弹窗
      isShowType: 'Prize', // 中奖弹窗
      isHidden: true, // 是否隐藏canvas
      Lock: false
    })
  },
  // 关闭还是跳转
  handleCloseOrJump() {
    if (this.data.LuckyDetail.IsLucky === false) {
      this.handleHide()
    } else {
      if (this.data.LuckyDetail.ChargeType === 1) {
        wx.navigateTo({
          url: '/pages/component/mine/service/MyCharge/index'
        })
      }
      if (this.data.LuckyDetail.ChargeType === 2) {
        wx.navigateTo({
          url: '/pages/component/mine/myAccount/MyCoupon/index?title=我的优惠券'
        })
      }
      if (this.data.LuckyDetail.ChargeType === 3) {
        wx.navigateTo({
          url: '/pages/component/mine/myAccount/MyPoint/index?title=我的积分'
        })
      }
      if (this.data.LuckyDetail.ChargeType === 4) {
        wx.navigateTo({
          url: '/pages/component/mine/myAccount/MyCommission/index?title=' + this.data.Detail.CommissionName
        })
      }
    }
  },
  // 查询抽奖
  handleGet() {
    GetDetail(this.data.LuckyID).then(res => {
      this.setData({
        Detail: res.Data,
        ["blocks[" + 0 + "].background"]: res.Data.OtherBgColor,
        ["blocks[" + 2 + "].background"]: res.Data.OtherBgColor,
        ["blocks[" + 3 + "].background"]: res.Data.InBgColor,
        ["buttons[" + 0 + "].imgs[" + 0 + "].src"]: res.Data.LuckyUrl,
        "activeStyle.background": res.Data.LuckyBgColor,
        OtherBgColor: res.Data.OtherBgColor,
        BgColor: res.Data.BgColor
      })
      this.handleSetPrize()
    }).catch(res => {
      this.setData({
        Detail: res.Data,
        ErrMessage: res.Message
      })
    })
  },
  // 设置奖品信息
  handleSetPrize() {
    const prizes = [] //获取奖品列表
    const data = this.data.Detail.Details //获取奖品列表
    let axis = [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
      [2, 2],
      [1, 2],
      [0, 2],
      [0, 1]
    ] // 设置滚动下标
    for (let i = 0; i < 8; i++) {
      let item = data[i]
      prizes.push({
        x: axis[i][0],
        y: axis[i][1],
        imgs: [{
          src: item.img,
          width: '90%',
          top: '2%'
        }]
      })
    }
    this.setData({
      prizes: prizes
    })
  },
  // 滚动刷新
  handleLower() {
    if (this.data.MinePrizeList.length >= this.data.SearchForm.PageSize) {
      this.setData({
        'SearchForm.PageSize': this.data.SearchForm.PageSize + 10
      })
      this.getGetMine()
    }
  },
  // 我的抽奖记录
  getGetMine() {
    GetMine(this.data.SearchForm).then(res => {
      res.Data.forEach(u => {
        if (u.CreateTime !== null) {
          u.CreateTime = Moment(u.CreateTime).format('YYYY-MM-DD HH:mm')
        }
      })
      this.setData({
        MinePrizeList: res.Data
      })
    }).catch(e => {

    })
  },
  // 弹窗
  handleShowType(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      isShow: true,
      isShowType: type,
      isHidden: true
    })
    if (type === 'MyPrize') {
      this.getGetMine()
    }
  },
  // 隐藏弹窗
  handleHide() {
    this.setData({
      isShow: false,
      isShowType: '',
      isHidden: false,
      isShareShow: false
    })
  },
  // 邀请好友
  onShareAppMessage() {
    if (this.data.ErrMessage !== '') {
      return false
    } else {
      return {
        desc: app.globalData.MiNiName,
        title: '邀请您一起参与抽奖!',
        path: '/pages/component/lucky/index' + '?PromoteID=' + this.data.Detail.CustomerID + '&Source=' + app.Source.Lucky
      }
    }
  }
})