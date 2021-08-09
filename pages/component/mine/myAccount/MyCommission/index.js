import {
  GetCommission,
  SendCommission,
  OutApply,
  CancelCommissionOut
} from "../../../../../api/mine.js"
const Moment = require('../../../../../utils/moment.min.js');
import SetBasic from '../../../../../utils/setData'
import Dialog from '../../../../../vantui/vant-weapp/dialog/dialog'
const app = getApp()
Page({
  data: {
    app: app,
    Tabs: SetBasic.MyCommission,
    ListItem: [],
    Params: {
      PageNum: app.globalData.pageNum,
      PageSize: app.globalData.pageSize,
      Type: 1
    },
    Detail: {},
    isShow: false,
    isShowType: '',
    SendPhone: '',
    Commission: '',
    Amount: '',
    SendTip: ''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.handleGet()
  },
  // 提交换领
  handleOutConfirm() {
    const data = {
      Amount: this.data.Amount
    }
    if (this.data.Amount === '') {
      SetBasic.Toasts(this, '请输入换领数量', 2000)
      return false
    }
    if (this.data.Detail.CommissionCanSend > this.data.Detail.CommissionAll) {
      err = '可换领不可大于总数量'
      return false
    }
    app.isBtnPreventActive(() => {
      OutApply(data).then(res => {
        if (res.ResultType === 0) {
          SetBasic.Toasts(this, res.Message, 2000)
          this.handleGet()
          this.handleOnClose()
        }
      }).catch(err => {})
    })
  },
  // 提交转赠
  handleConfirm() {
    const phone = this.data.SendPhone
    const commission = this.data.Commission
    if (phone === '' || commission === '' || phone.length < 11) {
      SetBasic.Toasts(this, '请检查手机号和转增数量', 2000)
      return false;
    }
    const data = {
      SendPhone: phone,
      Commission: commission
    }
    app.isBtnPreventActive(() => {
      SendCommission(data).then(res => {
        this.handleGet()
        this.handleOnClose()
        SetBasic.Toasts(this, res.Message, 2000)
      }).catch(err => {

      })
    })

  },
  // 换领和转增
  handleSend(e) {
    const type = e.currentTarget.dataset.type
    let tip = type === 'Out' ? '提交换领操作后,工作人员需要1-3个工作日进行审核,具体请前往院内咨询!' : '该操作不可撤销!请您核对手机号及转赠数量!'
    if (type === 'Out' && this.data.Detail.SuperVipStatus !== app.SuperVipType.Use) {
      Dialog.alert({
        title: '提示',
        message: '您的星选家权益已被禁用或未成为星选家,请前往我的页面中查看!',
      }).then(() => {});
    } else {
      console.log(type, tip)
      this.setData({
        isShow: true,
        isShowType: type,
        SendTip: tip
      })
    }
  },
  // 取消换领
  handleCancel(e) {
    const id = e.currentTarget.dataset.id
    const data = {
      ID: id
    }
    Dialog.confirm({
        message: '是否取消换领申请?',
        asyncClose: true
      })
      .then(() => {
        setTimeout(() => {
          Dialog.close();
          CancelCommissionOut(data).then(res => {
            if (res.ResultType === 0) {
              SetBasic.Toasts(this, res.Message, 2500)
              this.handleGet()
            }
          })
        }, 1000);
      })
      .catch(() => {
        Dialog.close();
      });
  },
  // 关闭弹窗
  handleOnClose() {
    this.setData({
      isShow: false,
      SendTip: '',
      Amount: '',
      Commission: '',
      SendPhone: ''
    })
  },
  // 选中
  handleActive(e) {
    this.setData({
      "Params.Type": e.detail
    })
    this.handleGet()
  },
  // 滚动
  handleLower() {
    if (this.data.ListItem.length >= this.data.Params.PageSize) {
      this.setData({
        "Params.PageSize": this.data.Params.PageSize + 5
      })
      this.handleGet()
    }
  },
  // 查询
  handleGet() {
    GetCommission(this.data.Params).then(res => {
      var listItem = this.data.Params.Type === this.data.Tabs[2].Type ? res.Data.CommissionOutList : res.Data.CommissionList
      listItem.forEach(u => {
        if (u.CreateTime !== null) {
          u.CreateTime = Moment(u.CreateTime).format('YYYY-MM-DD HH:mm')
        }
        if (u.FromCustomerName === null) {
          u.FromCustomerName = ''
        }
      })
      let PromoteList = ['消费金额', '折扣奖励', '顾客姓名', '等级']
      this.setData({
        Detail: res.Data,
        ListItem: listItem,
        PromoteList: PromoteList
      })
    })
  }
})