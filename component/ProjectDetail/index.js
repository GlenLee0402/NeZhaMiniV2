const app = getApp();
const Auth = require('../../utils/auth');
const Moment = require('../../utils/moment.min.js');
const SetBasic = require('../../utils/setData');
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    'Detail': {
      type: Object,
      value: null,
      observer: function (val) {
        const text = ['', '立即购买', '立即秒杀', '开启拼团', '立即购买', '立即领取', '立即兑换', '']
        let tip = ''
        if (val.OrderType === app.orderType.PinTuan && val.PinTuanIngList !== null) {
          val.PinTuanIngList.forEach(function (item, index) {
            item.EndTime = Moment(item.EndTime).format('YYYY-MM-DD HH:mm')
          })
        }
        if (val !== null) {
          app.AppDelayOnLoad(() => {
            this.setData({
              Loading: val.ID !== undefined ? false : true,
              Origin: val.OriginPrice * this.data.ChangeNum,
              CircuitPrice: val.TotalPrice * this.data.ChangeNum,
              BtnText: text[val.OrderType],
              PinTuanIng: val.PinTuanIngList
            });
          })
        }
        // 秒杀
        if (val.OrderType === app.orderType.SecKill && val.EndTime !== null) {
          const newTime = Moment(Moment(new Date()).format('YYYY-MM-DD HH:mm')).valueOf()
          const dasTime = Moment(Moment(val.EndTime).format('YYYY-MM-DD HH:mm')).valueOf()
          const startTime = Moment(Moment(val.StartTime).format('YYYY-MM-DD HH:mm')).valueOf()
          if (startTime > newTime) {
            this.setData({
              isSecKill: true,
              time: startTime - newTime
            })
          } else {
            this.setData({
              isSecKill: false,
              time: dasTime - newTime
            })
          }
        }
        // 拼团
        if (val.OrderType === app.orderType.PinTuan) {
          tip = '拼团结束后生效·线上暂不支持退款·非包邮项目请到院内使用'
        }
        // 星选家
        if (val.OrderType === app.orderType.SuperVip) {
          tip = '成为星选家·即刻领取·分享赠送好友一起享美丽·暂不支持退款'
        }
        // 星选家
        if (val.OrderType !== app.orderType.SuperVip && val.OrderType !== app.orderType.PinTuan) {
          tip = '购买成功立即生效·线上暂不支持退款·非包邮项目请到院内使用'
        }
        this.setData({
          TipText: tip
        })
        // 是否有剩余数量,禁止购买
        if (val.RestNum === 0) {
          this.setData({
            isLockBtn: true
          })
        }
      }
    }
  },
  data: {
    app: app,
    style: {
      "height": app.globalData.StatusHeight + 'px'
    },
    SetBasic: SetBasic,
    IconUrl: app.globalData.baseUrl + '/Upload/Pictures/mini/',
    ChangeNum: 1, // 购买数量
    ShareParam: null,
    BuyParam: null,
    CurUrl: '', // 本页面地址
    BtnText: '立即购买',
    time: 0,
    isShareShow: false,
    QrParams: null,
    Loading: true,
    PinTuanIng: [],
    TipText: '购买后立即生效·线上暂不支持退款·非包邮项目请到院内使用'
  },
  attached() {
    const url = Auth.GetCurrentPages();
    this.setData({
      CurUrl: url
    })
  },
  methods: {
    // 参加正在拼团
    handleGoPinTuan(e) {
      const pintuanid = e.currentTarget.dataset.pintuanid
      const pintuanorderid = e.currentTarget.dataset.pintuanorderid
      const login = {
        ID: pintuanid,
        CurUrl: this.data.CurUrl
      }
      const url = '/pages/component/assemble/assembleIng/index?ID=' + pintuanorderid
      Auth.GetStorageSyncCheckSession().then(res => {
        res === true ? SetBasic.Jump(url) : SetBasic.JumpLogin(login)
      })
    },
    // 修改购买数量
    handleChangeNum(e) {
      this.setData({
        ChangeNum: e.detail,
        Origin: this.data.Detail.OriginPrice * e.detail,
        CircuitPrice: this.data.Detail.TotalPrice * e.detail,
      })
    },
    // 查看大图
    handleBigImage() {
      wx.previewImage({
        current: this.data.Detail.DetailImage, // 当前显示图片的http链接
        urls: [this.data.Detail.DetailImage] // 需要预览的图片http链接列表
      })
    },
    // 秒杀计算时间
    handleTimeChange(e) {
      this.setData({
        TimeData: e.detail,
      });
    },
    // 海报分享好友
    handleHelp() {
      Auth.GetStorageSyncCheckSession().then(res => {
        const scene = this.handleScene()
        const login = {
          ID: scene[0],
          CurUrl: this.data.CurUrl
        }
        const data = {
          Width: 350,
          Page: this.data.CurUrl,
          PosterUrl: this.data.Detail.HeaderImage,
          Name: this.data.Detail.Name,
          CanvasheaderHeight: 180,
          CanvasheaderWidth: 300,
          BottomInfoHeight: 140,
          isShowBtn: true,
          OrderType: this.data.Detail.OrderType,
          QrType: 'Project',
          Point: this.data.Detail.Point, // 积分
          Commission: this.data.Detail.Commission, // 佣金
          CommissionName: this.data.Detail.CommissionName, // 佣金名称
          CouponAmount: this.data.Detail.CouponAmount, // 券
          CouponCategoryName: this.data.Detail.CouponCategoryName, // 券名称
          OriginPrice: this.data.Detail.OriginPrice,
          Scene: this.data.Detail.CustomerID + ',' + scene[1] + ',' + scene[0],
          TotalPrice: this.data.Detail.TotalPrice,
          PeopleNum: this.data.Detail.OrderType === 3 ? this.data.Detail.PeopleNum : ''
        }
        if (res === false) {
          SetBasic.JumpLogin(login)
        } else {
          this.setData({
            isShareShow: true,
            QrParams: data
          })
        }
      })
      // const scene = this.handleScene()
      // const data = {
      //   Width: 350,
      //   Page: this.data.CurUrl,
      //   PosterUrl: this.data.Detail.HeaderImage,
      //   Name: this.data.Detail.Name,
      //   CanvasheaderHeight: 180,
      //   CanvasheaderWidth: 300,
      //   BottomInfoHeight: 140,
      //   isShowBtn: true,
      //   OrderType: this.data.Detail.OrderType,
      //   QrType: 'Project',
      //   Point: this.data.Detail.Point, // 积分
      //   Commission: this.data.Detail.Commission, // 佣金
      //   CommissionName: this.data.Detail.CommissionName, // 佣金名称
      //   CouponAmount: this.data.Detail.CouponAmount, // 券
      //   CouponCategoryName: this.data.Detail.CouponCategoryName, // 券名称
      //   OriginPrice: this.data.Detail.OriginPrice,
      //   Scene: this.data.Detail.CustomerID + ',' + scene[1] + ',' + scene[0],
      //   TotalPrice: this.data.Detail.TotalPrice,
      //   PeopleNum: this.data.Detail.OrderType === 3 ? this.data.Detail.PeopleNum : ''
      // }
      // this.setData({
      //   isShareShow: true,
      //   QrParams: data
      // })
    },
    // 购买
    handleBuy() {
      const scene = this.handleScene()
      const data = {
        ProjectID: this.data.Detail.ID,
        OrderType: this.data.Detail.OrderType,
        SecKillID: this.data.Detail.SecKillID,
        ChannelID: this.data.Detail.ChannelID,
        Num: this.data.ChangeNum,
        SuperVipProjectID: this.data.Detail.SuperVipProjectID,
        PinTuanID: this.data.Detail.PinTuanID,
        PinTuanOrderID: this.data.Detail.PinTuanOrderID,
        PointProjectID: this.data.Detail.PointProjectID,
        HaggleID: this.data.Detail.HaggleID,
        CustomerHaggleID: this.data.Detail.CustomerHaggleID,
        AddressID: this.data.Detail.AddressID,
        Source: scene[1]
      }
      const login = {
        ID: scene[0],
        CurUrl: this.data.CurUrl
      }
      app.isBtnPreventActive(() => {
        Auth.GetStorageSyncCheckSession().then(res => {
          res === true ? SetBasic.JumpPay(data) : SetBasic.JumpLogin(login)
        })
      })
    },
    // 设置Scene
    handleScene() {

      // 类型Scene参数,详情页
      let scene = ''
      // 场景值
      let source = ''
      // 精品优选
      if (this.data.Detail.OrderType === app.orderType.Project) {
        scene = this.data.Detail.ID
        source = app.Source.Project
      }
      // 秒杀
      if (this.data.Detail.OrderType === app.orderType.SecKill) {
        scene = this.data.Detail.SecKillID
        source = app.Source.SecKill
      }
      // 拼团
      if (this.data.Detail.OrderType === app.orderType.PinTuan) {
        scene = this.data.Detail.PinTuanID
        source = app.Source.PinTuan
      }
      // 积分
      if (this.data.Detail.OrderType === app.orderType.PointProject) {
        scene = this.data.Detail.PointProjectID
        source = app.Source.PointProject
      }
      // 星选家赠送
      if (this.data.Detail.OrderType === app.orderType.SuperVip) {
        scene = this.data.Detail.SuperVipProjectID
        source = app.Source.ShareSend
      }
      let arr = new Array(scene, source)
      return arr
    },
    handleToHome() {
      var arr = wx.getStorageSync('PromoteArr')
      wx.reLaunch({
        url: '/pages/index/index?PromoteID=' + arr[0],
      })
    }
  }
})