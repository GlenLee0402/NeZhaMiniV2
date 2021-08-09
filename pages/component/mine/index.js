import {
  GetCustomerInfo
} from "../../../api/mine"
import {
  LoginOut
} from '../../../api/user'
import SetBasic from '../../../utils/setData'
const Auth = require('../../../utils/auth.js')
const app = getApp();
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {

  },
  data: {
    app: app,
    IconUrl: app.globalData.baseUrl + '/Upload/Pictures/mini/',
    AccountList: SetBasic.AccountListTemp, // 账户情况
    isLogin: false, // 是否登陆
  },
  created: function (params) {

  },
  attached: function () {
    Auth.GetStorageSyncCheckSession().then(res => {
      if (res === true) {
        this.handleGet()
      }
      this.setData({
        isLogin: res
      })
    })
  },
  methods: {
    // 会员,星选家跳转
    handleMeberJump(e) {
      let type = e.currentTarget.dataset.type;
      if (type === 'Member') {
        SetBasic.Jump('/pages/component/mine/myMember/index')
      }
      if (type === 'Share' && this.data.User.SuperVipStatus !== app.SuperVipType.Use) {
        SetBasic.Toasts(this, '星选家权益被禁或未成为星选家!', 4000)
      } else {
        SetBasic.Jump('/pages/component/mine/myShare/index')
      }
    },
    // 我的副卡
    handleClub() {
      const url = '/pages/component/mine/service/MyCard/index?ClubType=2'
      SetBasic.Jump(url)
    },
    // 登陆
    handleLogin() {
      const data = {
        CurUrl: app.ShareUrl.Index,
        PageCur: 'mine'
      }
      SetBasic.JumpLogin(data)
    },
    // 账户跳转
    handleAccountJump(e) {
      let url = e.currentTarget.dataset.url;
      SetBasic.IsLoginToast(this, url + '?title=' + e.currentTarget.dataset.title)
    },
    // 退出登陆
    handleLoginOut() {
      wx.showModal({
        title: '提示',
        content: '您确定要退出登录吗',
        success: function (res) {
          if (res.confirm) {
            LoginOut().then(res => {
              app.AppLoginOut()
              wx.reLaunch({
                url: '/pages/index/index', //跳去首页
              })
            })
          } else { //这里是点击了取消以后
            console.log('用户点击取消')
          }
        },
        complete: function () {

        }
      })
    },
    // 关注公众号
    handleJumpWechat(e) {
      wx.navigateTo({
        url: '/pages/component/WebViwe/index?Url=' + e.target.dataset.webview
      })
    },
    // 查询个人信息
    handleGet() {
      Auth.GetStorageSyncCheckSession().then(res => {
        this.setData({
          isLogin: res
        })
      })
      GetCustomerInfo().then(res => {
        this.setData({
          User: res.Data
        })
        // 账户余额
        const val = [this.data.User.DepositAmount, this.data.User.CouponAmount, this.data.User.CommissionAmount, this.data.User.Point, this.data.User.PromoteCount]
        this.data.AccountList.forEach((item, index) => {
          this.setData({
            ["AccountList[" + index + "].Value"]: val[index],
          })
          if (index === 2) {
            this.setData({
              ["AccountList[" + index + "].Name"]: this.data.User.CommissionName,
              ["AccountList[" + index + "].Title"]: '我的' + this.data.User.CommissionName,
            })
          }
        })
      })
    },
  }
})