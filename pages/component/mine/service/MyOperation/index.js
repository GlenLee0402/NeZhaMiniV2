import {
  GetOperation,
  GetOperationDetail,
  AddOperation
} from "../../../../../api/mine.js"
import SetBasic from '../../../../../utils/setData'
const Moment = require('../../../../../utils/moment.min.js');
const Auth = require('../../../../../utils/auth')
const app = getApp()
Page({
  data: {
    app: app,
    Tabs: SetBasic.MyEvaluate,
    Params: {
      PageNum: app.globalData.pageNum,
      PageSize: app.globalData.pageSize,
      Type: 1
    },
    ListItem: [],
    isShow: false,
    Detail: {},
    EvaluationLevel: '',
    EvaluationContent: '',
    textLength: 0
  },
  onLoad: function (options) {
    const cur = Auth.GetCurrentPages()
    const data = {
      CurUrl: cur
    }
    Auth.GetStorageSyncCheckSession().then(res => {
      res === true ? this.handleGet() : SetBasic.JumpLogin(data)
    })
  },
  // 提交评价
  handleConfirm() {
    const data = {
      EvaluationLevel: this.data.EvaluationLevel,
      EvaluationContent: this.data.EvaluationContent,
      OperationID: this.data.Detail.OperationID
    }
    AddOperation(data).then(res => {
      SetBasic.Toasts(this, '评价成功', 3000)
      this.handleClose()
      this.handleGet()
    })
  },
  // 统计输入字符串
  handleTextinput(e) {
    var content = e.detail.value;
    var cnt = parseInt(content.length);
    this.setData({
      EvaluationContent: content,
      textLength: cnt
    })
  },
  // 评价查看
  handleEva(e) {
    const id = e.currentTarget.dataset.id
    // 查询详情
    GetOperationDetail(id).then(res => {
      if (res.Data.CreateTime !== null) {
        res.Data.CreateTime = Moment(res.Data.CreateTime).format('YYYY-MM-DD HH:mm')
      }
      if (res.Data.EvaluationTime !== null) {
        res.Data.EvaluationTime = Moment(res.Data.EvaluationTime).format('YYYY-MM-DD HH:mm')
      }
      this.setData({
        Detail: res.Data,
        EvaluationContent: res.Data.EvaluationContent,
        EvaluationLevel: res.Data.EvaluationLevel,
      })
    })
    this.setData({
      isShow: true
    })
  },
  // 关闭弹窗
  handleClose() {
    console.log()
    this.setData({
      isShow: false,
      EvaluationContent: '',
      EvaluationLevel: ''
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
    GetOperation(this.data.Params).then(res => {
      res.Data.forEach(u => {
        if (u.CreateTime !== null) {
          u.CreateTime = Moment(u.CreateTime).format('YYYY-MM-DD HH:mm')
        }
        if (u.EvaluationTime !== null) {
          u.EvaluationTime = Moment(u.EvaluationTime).format('YYYY-MM-DD HH:mm')
        }
      })
      this.setData({
        ListItem: res.Data
      })
    })
  }
})