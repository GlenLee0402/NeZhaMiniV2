const app = getApp();
import {
  GetAddress,
  GetCity,
  AddAddress,
  DeleteAddress
} from '../../../../api/address.js'
import {
  Dialogs,
  Toasts
} from '../../../../utils/setData'

Page({
  data: {
    app: app,
    ListItem: [],
    isShow: false,
    ID: '', // 编号
    Name: '', // 收货人姓名
    Tel: '', // 联系方式
    Area: '', // 地区
    AreaCode: '', // 地区Code
    AddressDetail: '', // 详细地址
    isDefault: false, // 是否默认地址
    AreaList: [], // 省市
    isArea: null, // 选中省市
    isAreaShow: false, // 显示省市弹窗
    Title: '新增地址',
    Params: null
  },
  onLoad: function (options) {
    const params = JSON.parse(options.Params)
    this.setData({
      Params: params
    })
    this.handleGet()
    // 调用监听器，监听数据变化
    app.Watch(this, {
      isShow: function (newVal) {
        if (newVal === false) {
          setTimeout(() => {
            this.setData({
              ID: '', // 编号
              Name: '', // 收货人姓名
              Tel: '', // 联系方式
              Area: '', // 地区
              AreaCode: '', // 地区Code
              AddressDetail: '', // 详细地址
              isDefault: false // 是否默认地址
            })
          }, 1000)
        }
      }
    })
  },
  // 选择地址返回上一页
  handleSelected(e) {
    if (this.data.Params.ProjectID === undefined || this.data.Params.ProjectID === null) {
      return false
    } else {
      var pages = getCurrentPages();
      //上一个页面
      var prevPage = pages[pages.length - 2];
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        Params: {
          ProjectID: this.data.Params.ProjectID,
          OrderType: this.data.Params.OrderType,
          SecKillID: this.data.Params.SecKillID,
          ChannelID: this.data.Params.ChannelID,
          Num: this.data.Params.Num,
          SuperVipProjectID: this.data.Params.SuperVipProjectID,
          PinTuanID: this.data.Params.PinTuanID,
          PinTuanOrderID: this.data.Params.PinTuanOrderID,
          PointProjectID: this.data.Params.PointProjectID,
          HaggleID: this.data.Params.HaggleID,
          CustomerHaggleID: this.data.Params.CustomerHaggleID,
          AddressID: e.currentTarget.dataset.addressid
        }
      })
    }
    wx.navigateBack({ //返回
      delta: 1
    })
  },
  // 选择地区
  handleArea() {
    this.handleGetCityList()
    this.setData({
      isAreaShow: true
    })
  },
  // 地区确认选择
  handleAreaConfirm(e) {
    const province = e.detail.values[0].name
    const city = e.detail.values[1].name
    const area = e.detail.values[2].name
    this.setData({
      Area: province + '/' + city + '/' + area,
      AreaCode: e.detail.values[2].code,
      isAreaShow: false
    })
  },
  // 地区取消选择
  handleAreaClose() {
    this.setData({
      isAreaShow: false
    })
  },
  // 详细地址
  handleTextarea(e) {
    this.setData({
      AddressDetail: e.detail.value,
    })
  },
  // 保存地址
  handleFormConfirm(e) {
    const data = {
      ID: this.data.ID,
      AreaCode: this.data.AreaCode,
      DetailAddress: this.data.AddressDetail,
      AddressPhone: this.data.Tel,
      AddressName: this.data.Name,
      IsDefault: this.data.isDefault === false ? 0 : 1
    }
    AddAddress(data).then(res => {
      Toasts(this, res.Message, 2000)
      this.handleGet()
      if (res.ResultType === 0) {
        this.setData({
          isShow: false
        })
      }
    })
  },
  // 添加编辑地址按钮
  handleAdd(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      Title: type === 'edit' ? '编辑地址' : '新增地址',
      isShow: type === 'close' ? false : true
    })
    if (type === 'edit') {
      this.setData({
        ID: e.currentTarget.dataset.val.ID,
        AreaCode: e.currentTarget.dataset.val.AreaCode,
        AddressDetail: e.currentTarget.dataset.val.DetailAddress,
        Tel: e.currentTarget.dataset.val.AddressPhone,
        Name: e.currentTarget.dataset.val.AddressName,
        isDefault: e.currentTarget.dataset.val.IsDefault === 0 ? false : true,
        Area: e.currentTarget.dataset.val.MerName.replace(/,/g, '/')
      })
    }
  },
  // 删除
  handleDelete(e) {
    this.setData({
      ID: e.currentTarget.dataset.id
    })
    Dialogs(this, '是否删除当前地址', 'van-dialog');
  },
  // 确认删除
  hadnelConfirm() {
    const data = {
      ID: this.data.ID
    }
    DeleteAddress(data).then(res => {
      Toasts(this, res.Message, 2000)
      this.handleGet()
    })
  },
  // 查询城市
  handleGetCityList() {
    GetCity().then(res => {
      this.setData({
        AreaList: res.Data
      })
    })
  },
  // 查询
  handleGet() {
    GetAddress().then(res => {
      this.setData({
        ListItem: res.Data
      })
    })
  }
})