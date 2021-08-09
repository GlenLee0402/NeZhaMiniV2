import {
  AddPromoteCustomerr,
  GetPromote,
  GetPromoteShareInfo
} from "../../../api/share.js"
import SetBasic from '../../../utils/setData'
const Auth = require('../../../utils/auth.js')
const app = getApp()
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {},
  data: {
    app: app,
    IconUrl: app.globalData.baseUrl + '/Upload/Pictures/mini/imgs/',
    Detail: null,
    ShareModel: null,
    isPhone: false,
    Phone: '',
    CustomerName: '',
    Remark: '',
    Sex: '0',
    isChecked: true
  },
  created() {
    Auth.GetStorageSyncCheckSession().then(res => {
      if (res === true) {
        this.handleGet()
      } else {
        const data = {
          CurUrl: app.ShareUrl.Index,
          PageCur: 'home'
        }
        SetBasic.JumpLogin(data)
      }
    })
  },
  methods: {
    // 手机号邀请
    handlePhone() {
      this.setData({
        isPhone: true,
        Remark: '描述'
      })
      let timeId = setTimeout(() => {
        this.setData({
          Remark: ''
        })
        clearTimeout(timeId);
      }, 50);
    },
    // 选择性别
    handleSexChange(e) {
      this.setData({
        Sex: e.detail
      })
    },
    // 是否发送短信
    handleIsCheck(e) {
      this.setData({
        isChecked: e.detail
      })
    },
    // 提交手机号推荐
    handleConfirm() {
      const data = {
        Phone: this.data.Phone,
        CustomerName: this.data.CustomerName,
        Sex: this.data.Sex,
        Remark: this.data.Remark,
        SendSSM: this.data.isChecked === true ? 1 : 0
      }
      if (data.CustomerName === '') {
        SetBasic.Toasts(this, '请输入好友姓名', 2000)
        return false
      }
      if (data.Phone === '' && data.Phone.length < 11) {
        SetBasic.Toasts(this, '请输入好友联系方式', 2000)
        return false
      }
      app.isBtnPreventActive(() => {
        AddPromoteCustomerr(data).then(res => {
          SetBasic.Toasts(this, res.Message, 2000)
          this.handleGet()
          this.handleClose()
        }).catch(err => {

        })
      })

    },
    // 关闭
    handleClose() {
      this.setData({
        isPhone: false,
        Remark: '',
        Phone: '',
        CustomerName: '',
        Sex: '0',
        isChecked: true
      })
    },
    //二维码邀请
    handleQrCode() {
      const data = {
        CustomerID: this.data.Detail.CustomerID
      }
      GetPromoteShareInfo(data).then(res => {
        const data = {
          Width: 350,
          Page: app.ShareUrl.Index,
          Scene: res.Data.CustomerID,
          PosterUrl: res.Data.BackGroundImageUrl,
          Name: res.Data.NickName,
          PhotoUrl: res.Data.HeadImgUrl,
          CanvasheaderHeight: 180,
          CanvasheaderWidth: 300,
          isShowBtn: false,
          Type: '砍价商品',
          QrType: 'Share'
        }
        SetBasic.JumpQrCode('/component/QrCodePoster/index', data)
      })
    },
    // 查询
    handleGet() {
      const data = {
        Url: ''
      }
      GetPromote(data).then(res => {
        this.setData({
          Detail: res.Data,
          ShareModel: {
            title: res.Data.NickName + '给您送福利啦,邀请您一起变美!',
            path: app.ShareUrl.Index + '?PromoteID=' + res.Data.CustomerID + '&PageCur=home' // 路径，传递参数到指定页面。
          }
        })
      })
    }
  }
})