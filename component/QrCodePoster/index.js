import {
  GetQRCode
} from '../../api/user.js'
import SetBasic from '../../utils/setData'
Page({
  data: {
    // 显示数据
    QrData: {
      PosterUrl: '', // 海报地址
      PhotoUrl: '', // 头像地址
      QrcodeUrl: '', // 小程序二维码
      Name: '', // 商品名称或姓名
      OrderType: '', // 商品类型
      OrderTypeTitle: '', // 描述
      OriginPrice: '', // 商品原价
      TotalPrice: '', // 现价
      Point: 0, // 积分
      Commission: 0, // 佣金
      CommissionName: '', // 佣金名称
      CouponAmount: 0, // 券
      CouponCategoryName: '', // 券名称
      PeopleNum: 0 // N人团
    },
    // 设置海报样式,换成设置区
    SetPoster: {
      CanvasWidth: 0, // 画布宽
      CanvasHeight: 0, // 画布高
      CanvasDom: null, // 画布dom对象
      Canvas: null, // 画布的节点
      Ctx: null, // 画布的上下文
      Dpr: 1, // 设备的像素比
      PosterHeight: 0, // 海报高
      Tips: '扫码了解更多',
      QrType: '', // 二维码类型
      isShowBtn: false, // 是否现实保存按钮 模默认不显示
      PhotoDiam: 50, // 头像直径
      QrcodeDiam: 80, // 小程序码直径
      InfoSpace: 10, // 间距
      SaveImageWidth: 0, // 保存的图像宽度
      BottomInfoHeight: 0, // 底部信息区高度
      CanvasheaderHeight: 0, // 头部白色区域高度
      CanvasheaderWidth: 0, // 头部白色区域宽度
      PhotoHeight: 0, // 头像高度
    },
    // 二维码参数
    QrCode: {
      Width: 300, // 二维码宽度
      Page: '', // 扫码进入地址
      Scene: '', // 参数
      AutoColor: false,
      LineColor: '{"r":255,"g":0,"b":0}',
      IsHyaline: false
    },
    OrderTypes: ['', '精品优选', '限时秒杀', '多人拼团', '新人福利包', '赠送', '积分兑换', '限时砍价'],
    isShowBtnPage: ''
  },
  onLoad: function (options) {
    const p = JSON.parse(options.QrParams)
    if (p.PeopleNum !== undefined) {
      this.setData({
        ["OrderTypes[" + 3 + "]"]: '多人拼团(' + p.PeopleNum + '人团)'
      })
    }
    this.setData({
      isShowBtnPage: p.isShowBtn,
      "QrCode.Width": p.Width !== undefined ? p.Width : '',
      "QrCode.Page": p.Page !== undefined ? p.Page.slice(1) : '',
      "QrCode.Scene": p.Scene !== undefined ? p.Scene : '',
      "QrData.PosterUrl": p.PosterUrl !== undefined ? p.PosterUrl : '', // 海报地址
      "QrData.PhotoUrl": p.PhotoUrl !== undefined ? p.PhotoUrl : '', // 头像地址
      "QrData.QrcodeUrl": p.QrcodeUrl !== undefined ? p.QrcodeUrl : '', // 小程序二维码
      "QrData.Name": p.Name !== undefined ? p.Name : '', // 商品名称或姓名
      "QrData.OrderTypeTitle": p.OrderType !== undefined ? this.data.OrderTypes[p.OrderType] : '', // 商品类型title
      "QrData.OrderType": p.OrderType !== undefined ? p.OrderType : '', // 商品类型
      "QrData.OriginPrice": p.OriginPrice !== undefined ? p.OriginPrice : '', // 商品原价
      "QrData.TotalPrice": p.TotalPrice !== undefined ? p.TotalPrice : '', // 现价
      "QrData.Point": p.Point !== undefined ? p.Point : '', // 积分
      "QrData.Commission": p.Commission !== undefined ? p.Commission : '', // 佣金
      "QrData.CommissionName": p.CommissionName !== undefined ? p.CommissionName : '', // 佣金名称
      "QrData.CouponAmount": p.CouponAmount !== undefined ? p.CouponAmount : '', // 券
      "QrData.CouponCategoryName": p.CouponCategoryName !== undefined ? p.CouponCategoryName : '', // 券名称

      // 二维码类型  Share(邀请好友),Friend(手拉手),Project(项目)
      "SetPoster.QrType": p.QrType !== undefined ? p.QrType : '',
      "SetPoster.SaveImageWidth": p.SaveImageWidth !== undefined ? p.SaveImageWidth : 0, // 保存的图像宽度
      "SetPoster.BottomInfoHeight": p.BottomInfoHeight !== undefined ? p.BottomInfoHeight : 0, // 底部信息区高度
      "SetPoster.CanvasheaderHeight": p.CanvasheaderHeight !== undefined ? p.CanvasheaderHeight : 0, // 头部白色区域高度
      "SetPoster.CanvasheaderWidth": p.CanvasheaderWidth !== undefined ? p.CanvasheaderWidth : 0, // 头部白色区域宽度
      "SetPoster.PhotoHeight": p.PhotoHeight !== undefined ? p.PhotoHeight : 0, // 头像高度
    })
    this.handleGetQrCode()
  },
  // 查询小程序二维码
  handleGetQrCode() {
    console.log('this.data.QrCode:::::::', this.data.QrCode)
    GetQRCode(this.data.QrCode).then(res => {
      this.setData({
        "QrData.QrcodeUrl": res.Data
      })
      this.handleDrawImage()
    })
    // this.setData({
    //   "QrData.QrcodeUrl": 'https://miniapi.yeastar.nezhazn.net/Upload/Pictures/MiniCode/63ec96ec22b2bcc5010d9460038a2ade811d663bcc3f31b8928d5994b912df7e.png' //res.Data
    // })
    // this.handleDrawImage()
  },
  // 查询节点信息，并准备绘制图像
  handleDrawImage() {
    // 创建一个dom元素节点查询器
    const query = wx.createSelectorQuery();
    query.select('#canvasBox').fields({ // 需要获取的节点相关信息
      node: true, // 是否返回节点对应的 Node 实例
      size: true // 是否返回节点尺寸（width height）
    }).exec((res) => {
      const dom = res[0] // 因为页面只存在一个画布，所以我们要的dom数据就是 res数组的第一个元素
      const canvas = dom.node // canvas就是我们要操作的画布节点
      const ctx = canvas.getContext('2d') // 以2d模式，获取一个画布节点的上下文对象
      const dpr = wx.getSystemInfoSync().pixelRatio // 获取设备的像素比，未来整体画布根据像素比扩大
      this.setData({
        "SetPoster.CanvasDom": dom, // 把canvas的dom对象放到全局
        "SetPoster.Canvas": canvas, // 把canvas的节点放到全局
        "SetPoster.Ctx": ctx, // 把canvas 2d的上下文放到全局
        "SetPoster.Dpr": dpr // 屏幕像素比
      }, function () {
        this.hadleDrawIng() // 开始绘图
      })
    })
  },
  // 开始绘图
  hadleDrawIng() {
    const that = this;
    wx.showLoading({
      title: "生成中"
    })
    that.handleDrawPoster().then(function () {
      that.handleDrawBg() // 绘制底部白色背景
      that.handleDrawPhoto() // 绘制头像
      that.handleDrawQrcode() // 绘制小程序码
      that.handleDrawText() // 绘制文字
      wx.hideLoading() // 隐藏loading
      that.setData({
        "SetPoster.isShowBtn": that.data.isShowBtnPage, // 是否现实保存按钮 模默认不显示
      })
    })
  },
  // 绘制海报
  handleDrawPoster() {
    const that = this;
    return new Promise(function (resolve, reject) {
      let poster = that.data.SetPoster.Canvas.createImage(); // 创建一个图片对象
      poster.src = that.data.QrData.PosterUrl // 图片对象地址赋值
      poster.onload = () => {
        that.handleComputeCanvasSize(poster.width, poster.height) // 计算画布尺寸
          .then(function (res) {
            that.data.SetPoster.Ctx.drawImage(poster, 0, 0, poster.width, poster.height, 0, 0, res.width, res.height);
            resolve()
          })
      }
    })
  },
  // 计算画布尺寸
  handleComputeCanvasSize(imgWidth, imgHeight) {
    const that = this
    return new Promise(function (resolve, reject) {
      var canvasWidth = that.data.SetPoster.CanvasDom.width // 获取画布宽度
      var posterHeight = canvasWidth * (imgHeight / imgWidth) // 计算画布高度 海报高度+底部高度
      var canvasHeight = posterHeight + that.data.SetPoster.BottomInfoHeight // 海报高度
      that.setData({
        "SetPoster.CanvasWidth": canvasWidth, // 设置画布容器宽
        "SetPoster.CanvasHeight": canvasHeight, // 设置画布容器高
        "SetPoster.PosterHeight": posterHeight // 设置海报高
      }, () => { // 设置成功后再返回
        that.data.SetPoster.Canvas.width = that.data.SetPoster.CanvasWidth * that.data.SetPoster.Dpr // 设置画布宽
        that.data.SetPoster.Canvas.height = that.data.SetPoster.CanvasHeight * that.data.SetPoster.Dpr // 设置画布高
        that.data.SetPoster.Ctx.scale(that.data.SetPoster.Dpr, that.data.SetPoster.Dpr) // 根据像素比放大
        setTimeout(function () {
          resolve({
            "width": canvasWidth, // 海报宽度
            "height": posterHeight //
          }) // 返回成功
        }, 1200)
      })
    })
  },
  // 绘制白色背景
  // 注意：这里使用save 和 restore 来模拟图层的概念，防止污染
  handleDrawBg() {
    this.data.SetPoster.Ctx.save();
    this.data.SetPoster.Ctx.fillStyle = "#ffffff"; // 设置画布背景色
    this.data.SetPoster.Ctx.fillRect(0, this.data.SetPoster.CanvasHeight - this.data.SetPoster.BottomInfoHeight, this.data.SetPoster.CanvasWidth, this.data.SetPoster.BottomInfoHeight); // 填充整个画布
    this.data.SetPoster.Ctx.restore();
  },
  // 绘制头像
  handleDrawPhoto() {
    // let diam = this.data.SetPoster.PhotoDiam // 小程序码直径
    let photo = this.data.SetPoster.Canvas.createImage(); // 创建一个图片对象
    photo.src = this.data.QrData.PhotoUrl; // 图片对象地址赋值
    photo.onload = (res) => {
      // x位置 画布宽度/2-当前直径
      let x = 0;
      let y = 0;
      let sWidth = 0;
      let sHeight = 0;
      // 根据QrType判断 
      if (this.data.SetPoster.QrType === 'Share') {
        x = (this.data.SetPoster.CanvasWidth / 2) - (this.data.SetPoster.InfoSpace * 3 + 5);
        y = this.data.SetPoster.CanvasheaderHeight - (this.data.SetPoster.PhotoDiam * 3 + 5);
        sWidth = photo.width + this.data.SetPoster.PhotoDiam;
        sHeight = photo.height + (this.data.SetPoster.PhotoDiam * 2);
      }
      if (this.data.SetPoster.QrType === 'Friend') {}
      if (this.data.SetPoster.QrType === 'Project') {}
      this.data.SetPoster.Ctx.drawImage(
        photo,
        0,
        0,
        sWidth, sHeight,
        x,
        y,
        100,
        100 / 0.8785)
      this.data.SetPoster.Ctx.restore();
    }
  },
  // 绘制小程序码
  handleDrawQrcode() {
    let diam = this.data.SetPoster.QrcodeDiam // 小程序码直径
    let qrcode = this.data.SetPoster.Canvas.createImage(); // 创建一个图片对象
    qrcode.src = this.data.QrData.QrcodeUrl // 图片对象地址赋值
    qrcode.onload = () => {
      let radius = diam / 2 // 半径，alpiny敲碎了键盘
      let x = 0;
      let y = 0;
      // 邀请好友
      if (this.data.SetPoster.QrType === 'Share') {
        x = (this.data.SetPoster.CanvasWidth / 2) - (diam / 2);
        y = this.data.SetPoster.CanvasheaderHeight - (this.data.SetPoster.InfoSpace * 5.5);
      }
      // 手拉手
      if (this.data.SetPoster.QrType === 'Friend') {
        x = (this.data.SetPoster.CanvasWidth / 2) - (diam / 2);
        y = this.data.SetPoster.PosterHeight - (this.data.SetPoster.CanvasHeight / 3.5)
      }
      // 项目
      if (this.data.SetPoster.QrType === 'Project') {
        x = this.data.SetPoster.CanvasWidth - this.data.SetPoster.InfoSpace - diam
        y = this.data.SetPoster.PosterHeight + (this.data.SetPoster.InfoSpace * 3.9)
      }
      this.data.SetPoster.Ctx.save()
      this.data.SetPoster.Ctx.arc(x + radius, y + radius, radius, 0, 2 * Math.PI) // arc方法画曲线，按照中心点坐标计算，所以要加上半径
      this.data.SetPoster.Ctx.clip()
      this.data.SetPoster.Ctx.drawImage(qrcode, 0, 0, qrcode.width, qrcode.height, x, y, diam, diam) // 详见 drawImage 用法
      this.data.SetPoster.Ctx.restore();
    }
  },
  // 绘制文字
  handleDrawText() {
    // 邀请好友
    if (this.data.SetPoster.QrType === 'Share') {
      let x = this.data.SetPoster.CanvasWidth / 2;
      let y = this.data.SetPoster.CanvasheaderHeight / 2 + this.data.SetPoster.InfoSpace * 1.5;
      let t_y = this.data.SetPoster.CanvasheaderHeight / 2 + this.data.SetPoster.InfoSpace * 3;
      this.data.SetPoster.Ctx.font = "14px Microsoft YaHei";
      this.data.SetPoster.Ctx.fillStyle = '#8799a3'; // 设置文字颜色
      this.data.SetPoster.Ctx.textAlign = 'center'; //字体居中
      // 昵称
      this.data.SetPoster.Ctx.fillText(this.data.QrData.Name, x, y)
      // 描述
      this.data.SetPoster.Ctx.fillText('给您送福利啦', x, t_y)
    }
    // 手拉手
    if (this.data.SetPoster.QrType === 'Friend') {
      let x = (this.data.SetPoster.CanvasWidth / 2) - (this.data.SetPoster.QrcodeDiam / 2) + this.data.SetPoster.InfoSpace;
      let y = this.data.SetPoster.PosterHeight - (this.data.SetPoster.CanvasHeight / 3.5 - this.data.SetPoster.QrcodeDiam - this.data.SetPoster.InfoSpace * 1.5)
      this.data.SetPoster.Ctx.fillText(this.data.SetPoster.Tips, x, y)
    }
    // 项目
    if (this.data.SetPoster.QrType === 'Project') {
      let t_x = this.data.SetPoster.CanvasWidth - (this.data.SetPoster.QrcodeDiam + this.data.SetPoster.InfoSpace / 2)
      let t_y = this.data.SetPoster.PosterHeight + (this.data.SetPoster.InfoSpace * 5.5 + this.data.SetPoster.QrcodeDiam)
      this.data.SetPoster.Ctx.font = "12px Microsoft YaHei"; // 设置字体大小
      this.data.SetPoster.Ctx.fillStyle = "#8799a3"; // 设置文字颜色
      // 描述
      this.data.SetPoster.Ctx.fillText(this.data.SetPoster.Tips, t_x, t_y)

      // 商品类型
      this.data.SetPoster.Ctx.fillStyle = "#f37b1d"; // 设置文字颜色
      // console.log('PeopleNum:::::::::::', this.data.QrCode.PeopleNum)
      // if (this.data.QrCode.PeopleNum !== '' || this.data.QrCode.PeopleNum !== undefined) {
      //   this.setData({
      //     'QrData.OrderTypeTitle': this.data.QrData.OrderTypeTitle + '(' + this.data.QrData.PeopleNum + '人团)'
      //   })
      // }
      this.data.SetPoster.Ctx.fillText(this.data.QrData.OrderTypeTitle, this.data.SetPoster.InfoSpace, t_y)

      // 售价
      const Temp = ['', '', '秒杀价', '拼团价', '新人价', '专享价', '兑换价', '可砍至']
      let TypePrice = Temp[this.data.QrData.OrderType]
      const TotalPrice = '¥' + this.data.QrData.TotalPrice

      if (TypePrice === '兑换价') {
        let point = '';
        let commission = '';
        let couponAmount = '';
        if (this.data.QrData.Point !== 0) {
          point = '+' + this.data.QrData.Point + '消费积分'
        }
        if (this.data.QrData.Commission !== 0) {
          commission = '+' + this.data.QrData.Commission + this.data.QrData.CommissionName
        }
        if (this.data.QrData.CouponAmount !== 0) {
          couponAmount = '+' + this.data.QrData.CouponAmount + this.data.QrData.CouponCategoryName
        }
        const text = TypePrice + TotalPrice + point + commission + couponAmount;
        // this.data.SetPoster.BottomInfoHeight * 1.50
        this.data.SetPoster.Ctx.fillText(text, this.data.SetPoster.InfoSpace, this.data.SetPoster.PosterHeight + (this.data.SetPoster.InfoSpace * 2))
      } else {
        // this.data.SetPoster.BottomInfoHeight * 1.53
        this.data.SetPoster.Ctx.fillText(TypePrice + TotalPrice, this.data.SetPoster.InfoSpace, this.data.SetPoster.PosterHeight + (this.data.SetPoster.InfoSpace * 2))
      }
      // 原价
      const OriginPrice = '¥' + this.data.QrData.OriginPrice
      this.data.SetPoster.Ctx.fillStyle = "#8799a3"; // 设置文字颜色

      this.data.SetPoster.Ctx.moveTo(this.data.SetPoster.InfoSpace, this.data.SetPoster.PosterHeight + (this.data.SetPoster.InfoSpace * 3))
      this.data.SetPoster.Ctx.lineTo(this.data.SetPoster.Ctx.measureText(OriginPrice).width + this.data.SetPoster.InfoSpace, this.data.SetPoster.PosterHeight + (this.data.SetPoster.InfoSpace * 3))
      this.data.SetPoster.Ctx.strokeStyle = '#8799a3'
      this.data.SetPoster.Ctx.stroke()
      this.data.SetPoster.Ctx.fillText(OriginPrice, this.data.SetPoster.InfoSpace, this.data.SetPoster.PosterHeight + (this.data.SetPoster.InfoSpace * 3.5))

      // 商品名字
      this.data.SetPoster.Ctx.font = 'normal bold 13px Microsoft YaHei';
      this.data.SetPoster.Ctx.fillStyle = "#000000"; // 设置文字颜色
      let ArrName = [];
      let OstName = '';
      const Name = this.data.QrData.Name;
      for (let i = 0; i < Name.length; i++) {
        OstName = OstName + Name[i];
        const measure = this.data.SetPoster.Ctx.measureText(OstName) //计算商品名字宽度
        if (measure.width > (260 - this.data.SetPoster.QrcodeDiam)) {
          ArrName = ArrName.concat([OstName])
          OstName = '';
        }
      }
      ArrName = ArrName.concat([OstName])
      for (let i = 0; i < ArrName.length; i++) {
        let ins = i > 4 ? this.data.SetPoster.InfoSpace * 4 : this.data.SetPoster.InfoSpace * i
        this.data.SetPoster.Ctx.fillText(ArrName[i], this.data.SetPoster.InfoSpace, this.data.SetPoster.PosterHeight + (this.data.SetPoster.InfoSpace * 6 + ins * 2))
      }
    }
  },
  // 长按保存
  handleSaveImgLong() {
    this.handleSaveImg();
  },
  // 保存图片
  handleSaveImg() {
    const _this = this
    wx.canvasToTempFilePath({
      canvas: _this.data.SetPoster.Canvas, // 使用2D 需要传递的参数
      success(res) {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 3000
        })
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
          }
        })
      }
    })
  },
  // 取消返回上一级
  hadnleCancelImg() {
    wx.navigateBack()
  }
})