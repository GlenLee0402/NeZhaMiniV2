import {
  GetUpdate,
  LeaveMini,
  GetNetworkType,
  NetworkStatusChange,
  PromoteSet,
} from './utils/auth'

App({
  onLaunch() {
    GetUpdate()
    GetNetworkType()
    NetworkStatusChange()
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight; // 自定义顶部,获取顶部高度
        this.globalData.StatusHeight = e.windowHeight; // 自定义顶部,获取页面高度
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  onShow(opction) {
    // PromoteSet(this.globalData.baseUrl, opction.query)
  },
  // 离开小程序
  onHide() {
    LeaveMini()
  },
  globalData: {
    // 新小程序记得配置 服务器域名 

    //  ************直播插件**********


    baseUrl: 'https://miniapi.yeastar.nezhazn.net', // 哪吒智能服务器地址 wx912fe5f4a786bf9b 
    MiNiName: '哪吒智能',

    // baseUrl: 'https://wxldmini.yeastar.nezhazn.net', // 无锡丽都服务器地址 wxee8adeae8b05d9b3  
    // MiNiName: '无锡丽都整形',

    // baseUrl: 'https://bjoymini.yeastar.nezhazn.net', // 欧扬医美服务器地址 wxd5831379bc02ee56 
    // MiNiName: '北京欧扬医美',

    // baseUrl: 'https://kmldmini.yeastar.nezhazn.net', // 昆明丽都整形服务器地址 wxeaca0b8ff9ca3625
    // MiNiName: '昆明丽都整形',

    // baseUrl: 'https://wfymmini.yeastar.nezhazn.net', // 潍坊服务器地址 wxac4eb8d1327b1ed1 
    // MiNiName: '潍坊医学院整形外科',

    // baseUrl: 'https://rzymmini.yeastar.nezhazn.net', // 日照服务器地址 wxc45dd2127684ea92 
    // MiNiName: '壹美天成日照',

    // baseUrl: 'https://qdymmini.yeastar.nezhazn.net', // 青岛服务器地址 wxf3752b5aa53a31bc 
    // MiNiName: '壹美天成青岛',

    // baseUrl: 'https://ytymmini.yeastar.nezhazn.net', // 烟台服务器地址 wxa4b93b897886d45e 
    // MiNiName: '壹美天成烟台',

    // baseUrl: 'https://jnymmini.yeastar.nezhazn.net', // 济宁服务器地址 wx64be08a075385bec 
    // MiNiName: '壹美天成济宁',

    // baseUrl: 'https://zbymmini.yeastar.nezhazn.net', // 淄博壹美 wxcd04e08f005f9582  未开启直播
    // MiNiName: '淄博壹美整形美容', 

    // baseUrl: 'https://wfmzmini.yeastar.nezhazn.net', // 潍坊门诊服务器地址 wxc3819588ad933ea2  未开通直播
    // MiNiName: '潍坊壹美医疗美容',


    // baseUrl: 'https://dltlmini.yeastar.nezhazn.net', // 大连天俪医疗美容医院 wx0cf08956569fcdd7  未开启直播
    // MiNiName: '大连天俪美容医院', 

    // baseUrl: 'https://tylfmini.yeastar.nezhazn.net', // 临汾显微外科医院 wxa2f22191fcb56344  未开启直播
    // MiNiName: '惠美拼',

    // baseUrl: 'https://csldmini.yeastar.nezhazn.net', // 长沙丽都整形美容 wxb3bff77cfdae97f8  未开启直播
    // MiNiName: '长沙丽都医疗',

    // baseUrl: 'https://lkymmini.yeastar.nezhazn.net', // 龙口壹美优选 wx47d95d94f1910b94  未开启直播
    // MiNiName: '龙口壹美优选', 

    // baseUrl: 'https://hzldmini.yeastar.nezhazn.net', // 杭州丽都 wx8239195958e03b50  未开启直播
    // MiNiName: '丽都和美',

    // baseUrl: 'https://gyldmini.yeastar.nezhazn.net', // 贵阳丽都整形服务器地址 wxacd7ea552b0f0408 贵阳
    // MiNiName: '丽都购美',

    // baseUrl: 'https://dljmmini.yeastar.nezhazn.net', // 大连锦美医院 wx2be62beabcac28c9  未开启直播
    // MiNiName: '锦美星选', 

    // baseUrl: 'https://tyldmini.yeastar.nezhazn.net', // 太原丽都服务器地址 wxb927a2d28094d87e  未开启直播
    // MiNiName: '太原丽都整形美容',


    pageNum: 1, // 页数
    pageSize: 8, // 显示数据
    isConnected: true,
    isBtnActive: true, // 重复提交
    ShareID: '', // 分享人ID
    ID: '', // 商品ID
  },
  // 用户信息
  userData: {
    NickName: '',
    Sex: '',
    Province: '',
    City: '',
    Country: '',
    HeadImgUrl: '',
    EncryptedData: '',
    Iv: '',
    OpenID: '',
    UnionID: '',
    SessionKey: '',
    PromoterID: '',
    PromoteDateTime: '',
    SourceTime: '',
    Source: ''
  },
  // 分享地址
  ShareUrl: {
    // 底部菜单授权后返回
    Index: '/pages/index/index'
  },
  // 订单类型
  orderType: {
    // 项目
    Project: 1,
    // 秒杀
    SecKill: 2,
    // 拼团
    PinTuan: 3,
    // 新人激励
    NewReward: 4,
    // 分享家赠送项目
    SuperVip: 5,
    // 积分商城
    PointProject: 6,
    // 砍价
    Haggle: 7
  },
  // 星选家审核类型
  SuperVipType: {
    // 禁用
    Stop: 0,
    // 已审核通过
    Use: 1,
    // 待审核
    Auditing: 2,
    // 审核失败
    AuditFailed: 3,
    // 未加入
    No: -1
  },
  // 分享场景
  Source: {
    Share: 6, //默认分享注册
    Project: 8, //普通
    SecKill: 9, //秒杀 
    PinTuan: 10, // 拼团
    PointProject: 11, // 积分
    Haggle: 12, // 砍价
    ShareSend: 13, // 分享赠送星选家
    Lucky: 15, // 分享赠送星选家
    Friend: 16 // 分享赠送星选家
  },
  AppLoginOut: function () {
    wx.setStorageSync('Token', ''); //将token置空
    wx.setStorageSync('CheckSession', false); //将登陆状态修改false
    wx.setStorageSync('PromoteArr', [])
    wx.setStorageSync('PromoteID', '')
    wx.setStorageSync('SourceType', '')
  },
  // 设置监听器
  Watch: function (ctx, obj) {
    Object.keys(obj).forEach(key => {
      this.Observer(ctx.data, key, ctx.data[key], function (value) {
        obj[key].call(ctx, value)
      })
    })
  },
  // 监听属性，并执行监听函数
  Observer: function (data, key, val, fn) {
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get: function () {
        return val
      },
      set: function (newVal) {
        if (newVal === val) return
        fn && fn(newVal)
        val = newVal
      },
    })
  },
  // 防止重复点击
  isBtnPreventActive(fn) {
    const self = this
    if (this.globalData.isBtnActive) {
      this.globalData.isBtnActive = false
      if (fn) {
        fn()
      }
      setTimeout(() => {
        self.globalData.isBtnActive = true
      }, 1500); //设置该时间内重复触发只执行第一次，单位ms，按实际设置
    } else {
      // return false
      console.log('')
    }
  },
  // 延迟刷新
  AppDelayOnLoad: function (fn) {
    setTimeout(() => {
      if (fn) {
        fn()
      }
    }, 500);
  }
})