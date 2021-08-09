import {
  GetDetail,
  JoinHelp,
  WeChatGetMyHelpList,
  WeChatGetJoinList
} from '../../../../api/help'
import {
  PromoteSet,
  GetSence
} from '../../../../utils/auth'
import SetBasic from '../../../../utils/setData'
const app = getApp();
const Auth = require('../../../../utils/auth');
const Moment = require('../../../../utils/moment.min.js');
Page({
  data: {
    app: app,
    IconUrl: app.globalData.baseUrl + '/Upload/Pictures/mini/',
    Detail: null,
    Param: {},
    HelpTab: SetBasic.HelpTab,
    CurIndex: 0, // 选中下标
    CurName: 'Ranking', // tab选中那么
    CurUrl: '', // 当前页面路径
    RankingNum: app.globalData.pageNum, // 助力榜单
    MyHelpListItme: [], // 我的助力
    MyHelpPageNum: app.globalData.pageNum, // 我的助力信息 
    isShareShow: false,
    IsFriend: true
  },
  onLoad: async function (options) {
    PromoteSet(app.globalData.baseUrl, options)
    let arr = []
    const cur = Auth.GetCurrentPages()
    if (options.scene !== undefined) {
      const res = await GetSence(app.globalData.baseUrl, options.scene)
      arr = res.Data.split(",");
    }
    this.setData({
      CurUrl: cur,
      "Param.ID": options.ID !== undefined ? options.ID : arr[2],
      "Param.FriendCustomerID": options.FriendCustomerID !== undefined ? options.FriendCustomerID : arr[0],
    })
    this.handleGet()
  },
  // onLoad: function (options) {
  //   const cur = Auth.GetCurrentPages()
  //   this.setData({
  //     CurUrl: cur,
  //     DetailID: options.ID,
  //     DetailFriendCustomerID: options.FriendCustomerID
  //   })
  // },
  // onShow: function () {
  //   const arr = wx.getStorageSync('PromoteArr')
  //   this.setData({
  //     "Param.ID": this.data.DetailID !== undefined ? this.data.DetailID : arr[2],
  //     "Param.FriendCustomerID": this.data.DetailFriendCustomerID !== undefined ? this.data.DetailFriendCustomerID : arr[0],
  //   })
  //   this.handleGet()
  // },
  // 邀请好友
  handleHelp() {
    const data = {
      Width: 350,
      Page: this.data.CurUrl,
      Scene: this.data.Detail.CustomerID + ',' + app.Source.Friend + ',' + this.data.Detail.ID,
      PosterUrl: this.data.Detail.ImageShareUrl,
      Name: this.data.Detail.Name,
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
  // 滚动刷新
  handleLower(e) {
    const type = e.currentTarget.dataset.type
    if (type === this.data.HelpTab[1].name) {
      if (this.data.MyHelpListItme.length >= 50) {
        this.setData({
          MyHelpPageNum: this.data.MyHelpPageNum + 1
        })
        this.handleMyHelp()
      }
    }
    if (type === this.data.HelpTab[0].name) {
      if (this.data.Detail.JoinList.length >= 50) {
        this.setData({
          RankingNum: this.data.RankingNum + 1
        })
        this.handleGetRanking()
      }
    }
  },
  // 切换tab
  handleActive(e) {
    this.setData({
      CurIndex: e.currentTarget.dataset.index,
      CurName: e.currentTarget.dataset.name
    })
    // 判断下标
    if (this.data.CurIndex === 1) {
      const data = {
        CurUrl: this.data.CurUrl,
        ID: this.data.Param.ID
      }
      Auth.GetStorageSyncCheckSession().then(res => {
        res === true ? this.handleMyHelp() : SetBasic.JumpLogin(data)
      })
    }
  },
  // 参加投票
  handleJoin(e) {
    let data = {
      ID: this.data.Param.ID,
      FriendCustomerID: e.currentTarget.dataset.customerid
    }
    Auth.GetStorageSyncCheckSession().then(res => {
      const param = {
        ID: this.data.Param.ID,
        CurUrl: this.data.CurUrl,
        FriendCustomerID: this.data.Param.FriendCustomerID
      }
      if (res === true) {
        app.isBtnPreventActive(() => {
          JoinHelp(data).then(res => {
            if (res.ResultType === 0) {
              this.handleClose()
              SetBasic.Toasts(this, res.Message, 2000)
              this.handleGet()
            }
          }).catch(res => {})
        })
      } else {
        SetBasic.JumpLogin(param)
      }
    })
  },
  // 助力榜单超过50名重新查询
  handleGetRanking() {
    WeChatGetJoinList(this.data.Param.ID, this.data.RankingNum).then(res => {
      this.setData({
        "Detail.JoinList": this.data.Detail.JoinList.concat(res.Data),
        isDivider: '已经到底啦'
      })
    })
  },
  //  查询我的助力详情
  handleMyHelp() {
    WeChatGetMyHelpList(this.data.Param.ID, this.data.MyHelpPageNum).then(res => {
      const list = res.Data
      list.forEach(function (item, index) {
        item.CreateTime = Moment(item.CreateTime).format('YYYY-MM-DD HH:mm')
      })
      this.setData({
        MyHelpListItme: list
      })
    })
  },
  // 查询
  handleGet() {
    GetDetail(this.data.Param.ID, this.data.Param.FriendCustomerID).then(res => {
      if (res.Data.StartTime !== null) {
        const newTime = Moment(Moment(new Date()).format('YYYY-MM-DD')).valueOf()
        const dasTime = Moment(Moment(res.Data.EndTime).format('YYYY-MM-DD')).valueOf()
        if (newTime > dasTime) {
          res.Data.Status = 0
        }
      }
      this.setData({
        Detail: res.Data
      })
      if (this.data.Detail.FriendCustomerID !== null && this.data.IsFriend === true) {
        this.setData({
          isShow: true
        })
      }
    })
  },
  // 弹窗关闭
  handleClose() {
    this.setData({
      isShow: false,
      IsFriend: false
    })
  },
  onShareAppMessage: function () {
    const url = this.data.CurUrl + '?PromoteID=' + this.data.Detail.CustomerID + '&Source=' + app.Source.Friend + '&ID=' + this.data.Param.ID + '&FriendCustomerID=' + this.data.Detail.CustomerID
    return {
      desc: '我正在参加' + this.data.Detail.Name,
      title: '快来帮我投票吧!!',
      path: url, // 路径，传递参数到指定页面。
      imageUrl: this.data.Detail.ImageHeadUrl,
    }
  }
})