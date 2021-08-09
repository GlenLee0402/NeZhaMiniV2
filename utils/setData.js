const app = getApp();
const Auth = require('./auth')
// const Moment = require('./moment.min.js');
import Toast from '../vantui/vant-weapp/toast/toast'
// menu菜单配置
const MenuSet = [{
    title: '秒杀', // 本月精选
    url: '/pages/component/seckill/index',
    iconUrl: ''
  },
  {
    title: '拼团',
    url: '/pages/component/assemble/index',
    iconUrl: ''
  },
  {
    title: '砍价',
    url: '/pages/component/haggle/index',
    iconUrl: ''
  },
  {
    title: '幸运抽奖',
    url: '/pages/component/lucky/index',
    iconUrl: ''
  },
  {
    title: '手拉手',
    url: '/pages/component/friend/index',
    iconUrl: ''
  },
  {
    title: '院内直播',
    url: '/pages/component/plivePlayer/index',
    iconUrl: ''
  }
]
// 快捷入口 新人福利,积分兑换
const RewardPoint = [{
    url: '/pages/component/newReward/index',
    iconUrl: '',
    fontColor: ''
  },
  {
    url: '/pages/component/point/index',
    iconUrl: '',
    fontColor: ''
  }
]
// 底部菜单栏配置
const BarList = [{
    Cur: 'home',
    AddAction: 'action',
    Name: '首页',
    IconUrl: app.globalData.baseUrl + '/Upload/Pictures/mini/imgs/bar-new-home.png',
    IconUrl1: app.globalData.baseUrl + '/Upload/Pictures/mini/imgs/bar-new-home1.png'
  },
  {
    Cur: 'share',
    AddAction: 'action',
    Name: '邀请好友',
    IconUrl: app.globalData.baseUrl + '/Upload/Pictures/mini/imgs/bar-new-share.png',
    IconUrl1: app.globalData.baseUrl + '/Upload/Pictures/mini/imgs/bar-new-share1.png'
  },
  {
    Cur: 'mine',
    AddAction: 'action',
    Name: '我的',
    IconUrl: app.globalData.baseUrl + '/Upload/Pictures/mini/imgs/bar-new-mine.png',
    IconUrl1: app.globalData.baseUrl + '/Upload/Pictures/mini/imgs/bar-new-mine1.png'
  }
]

// 我的-我的订单服务信息
const MineOrderList = [{
  title: '待付款',
  type: 'DaiZhiFu',
  icon: app.globalData.baseUrl + '/Upload/Pictures/mini/mine/order/order-daizhifu.png',
  url: '/pages/component/mine/order/index?type=DaiZhiFu'
}, {
  title: '已付款',
  type: 'YiFuKuan',
  icon: app.globalData.baseUrl + '/Upload/Pictures/mini/mine/order/order-yifukuan.png',
  url: '/pages/component/mine/order/index?type=YiFuKuan'
}, {
  title: '拼团中',
  type: 'PinTuan',
  icon: app.globalData.baseUrl + '/Upload/Pictures/mini/mine/order/order-pintuan.png',
  url: '/pages/component/mine/order/index?type=PinTuan'
}, {
  title: '已取消',
  type: 'QuXiao',
  icon: app.globalData.baseUrl + '/Upload/Pictures/mini/mine/order/order-yiquxiao.png',
  url: '/pages/component/mine/order/index?type=QuXiao'
}]
// 我的-我的服务列表
const MineServerList = [{
    title: '我的预约',
    icon: app.globalData.baseUrl + '/Upload/Pictures/mini/mine/service/service-appointment.png',
    url: '/pages/component/mine/service/MyAppointment/index',
    type: ''
  },
  {
    title: '我的卡包',
    icon: app.globalData.baseUrl + '/Upload/Pictures/mini/mine/service/service-card.png',
    url: '/pages/component/mine/service/MyCard/index?ClubType=1',
    type: ''
  },
  {
    title: '我的项目',
    icon: app.globalData.baseUrl + '/Upload/Pictures/mini/mine/service/service-charge.png',
    url: '/pages/component/mine/service/MyCharge/index',
    type: ''
  },
  {
    title: '项目评价',
    icon: app.globalData.baseUrl + '/Upload/Pictures/mini/mine/service/service-operation.png',
    url: '/pages/component/mine/service/MyOperation/index',
    type: ''
  }, {
    title: '咨询评价',
    icon: app.globalData.baseUrl + '/Upload/Pictures/mini/mine/service/service-consult.png',
    url: '/pages/component/mine/service/MyConsult/index',
    type: ''
  }, {
    title: '收货地址',
    icon: app.globalData.baseUrl + '/Upload/Pictures/mini/mine/service/service-address.png',
    url: '/pages/component/mine/myAddress/index',
    type: 'address'
  }
]

// 我的 - 账户临时情况
const AccountListTemp = [{
  Name: '余额',
  Value: '***',
  Title: '我的余额',
  Url: '/pages/component/mine/myAccount/MyDeposit/index',
}, {
  Name: '优惠券',
  Value: '***',
  Title: '我的优惠券',
  Url: '/pages/component/mine/myAccount/MyCoupon/index',
}, {
  Name: '***',
  Value: '***',
  Url: '/pages/component/mine/myAccount/MyCommission/index'
}, {
  Name: '消费积分',
  Value: '***',
  Url: '/pages/component/mine/myAccount/MyPoint/index',
  Title: '我的消费积分'
}, {
  Name: '邀请记录',
  Value: '***',
  Title: '我的邀请记录',
  Url: '/pages/component/mine/myAccount/MyPromote/index',
}]

// 好友助力tab配置
const HelpTab = [{
  title: '助力榜单',
  name: 'Ranking'
}, {
  title: '我的投票',
  name: 'MyHelp'
}, {
  title: '活动详情',
  name: 'Rule'
}]
// 我的余额Tab
const MyDeposit = [{
    Title: '获得记录',
    Name: 'Obtain',
    Type: 1
  },
  {
    Title: '使用记录',
    Name: 'Use',
    Type: 2
  }
]
// 我的优惠券Tab
const MyCoupon = [{
    Title: '待使用',
    Name: 'Stay',
    Type: 1
  },
  {
    Title: '已使用',
    Name: 'Already',
    Type: 2
  },
  {
    Title: '已失效',
    Name: 'Over',
    Type: 3
  }
]
// 我的佣金Tab
const MyCommission = [{
    Title: '收入记录',
    Name: 'Income',
    Type: 1
  },
  {
    Title: '支出记录',
    Name: 'Expend',
    Type: 2
  },
  {
    Title: '换领记录',
    Name: 'Out',
    Type: 3
  }
]

// 我的积分Tabs
const MyPoint = [{
    Title: '收入记录',
    Name: 'Obtain',
    Type: 1
  },
  {
    Title: '支出记录',
    Name: 'Use',
    Type: 2
  }
]

// 我的项目Tabs
const MyCharge = [{
    Title: '进行中',
    Name: 'Ing',
    Type: 1
  },
  {
    Title: '已完成',
    Name: 'Done',
    Type: 2
  }
]

// 我的 项目,咨询评价
const MyEvaluate = [{
    Title: '待评价',
    Name: 'Ing',
    Type: 1
  },
  {
    Title: '已评价',
    Name: 'Done',
    Type: 2
  }
]
// 我的订单
const OrderTabList = [{
    Title: '待支付',
    Name: 'DaiZhiFu',
    Status: 1
  },
  {
    Title: '已付款',
    Name: 'YiFuKuan',
    Status: 2
  },
  {
    Title: '拼团中',
    Name: 'PinTuan',
    Status: 5
  },
  {
    Title: '已取消',
    Name: 'QuXiao',
    Status: 4
  }
]
// 砍价状态
const HaggleStatus = {
  Ing: 1,
  No: 4,
  Help: 5,
  Stop: 6,
  Helped: 7
}
// 普通跳转
const Jump = function (url) {
  wx.navigateTo({
    url: url
  })
}

// 确认订单跳转
const JumpPay = function (data) {
  wx.navigateTo({
    url: '/pages/component/pay/index?Params=' + JSON.stringify(data)
  })
}

// 跳转详情页面
const JumpDetailPage = function (Url, ID, OtherID) {
  const id = ID !== undefined ? ID : ''
  const o_Id = OtherID !== undefined ? OtherID : ''
  const url = Url.substring(0, Url.length - 6)
  wx.navigateTo({
    url: url + '/detail/index?ID=' + id + '&PinTuanOrderID=' + o_Id + '&CustomerHaggleID=' + o_Id + '&ChannelID=' + o_Id + '&FriendCustomerID=' + o_Id,
  })
}

// 跳转登陆授权
const JumpLogin = function (val) {
  var pid = wx.getStorageSync('PromoteID')
  const Params = {
    ID: val.ID !== undefined ? val.ID : '',
    BarType: val.BarType !== undefined ? val.BarType : '',
    CustomerHaggleID: val.CustomerHaggleID !== undefined ? val.CustomerHaggleID : '',
    PinTuanOrderID: val.PinTuanOrderID !== undefined ? val.PinTuanOrderID : '',
    ChannelID: val.ChannelID !== undefined ? val.ChannelID : '',
    LotteryType: val.LotteryType !== undefined ? val.LotteryType : '',
    FriendCustomerID: val.FriendCustomerID !== undefined ? val.FriendCustomerID : '',
    PromoteID: pid,
    PageCur: val.PageCur !== undefined ? val.PageCur : '',
    CurUrl: val.CurUrl !== undefined ? val.CurUrl : '' // 成功后返回地址
  }

  //授权页面
  wx.redirectTo({
    url: '/pages/component/auth/index?Params=' + JSON.stringify(Params),
  })
}

// 跳转海报生成页面
const JumpQrCode = function (url, params) {
  //授权页面
  wx.navigateTo({
    url: url + '?QrParams=' + JSON.stringify(params),
  })
}

// 我的 跳转页面时判断是否登陆
const IsLoginToast = function (that, url) {
  Auth.GetStorageSyncCheckSession().then(res => {
    if (res === false) {
      Toast({
        context: that,
        message: '您还未登陆,请先登陆',
        duration: 3000
      })
    } else {
      wx.navigateTo({
        url: url
      })
    }
  })
}

// Toast 提示
const Toasts = function (context, message, duration, type) {
  Toast({
    context: context,
    message: message,
    // type: type === undefined ? 'success' : type,
    duration: duration !== undefined ? duration : '2000'
  })
}
module.exports = {
  MenuSet: MenuSet,
  RewardPoint: RewardPoint,
  BarList: BarList,
  JumpDetailPage: JumpDetailPage,
  MineOrderList: MineOrderList,
  MineServerList: MineServerList,
  AccountListTemp: AccountListTemp,
  JumpLogin: JumpLogin,
  IsLoginToast: IsLoginToast,
  Toasts: Toasts,
  JumpQrCode: JumpQrCode,
  HelpTab: HelpTab,
  Jump: Jump,
  HaggleStatus: HaggleStatus,
  JumpPay: JumpPay,
  OrderTabList: OrderTabList,
  MyDeposit: MyDeposit,
  MyCoupon: MyCoupon,
  MyCommission: MyCommission,
  MyPoint: MyPoint,
  MyCharge: MyCharge,
  MyEvaluate: MyEvaluate
}