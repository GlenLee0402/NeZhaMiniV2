const app = getApp();
import SetBasic from '../../utils/setData'
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    'isShow': {
      type: Boolean,
      value: false
    },
    'QrParams': {
      type: Object,
      value: {}
    },
    'ShareModel': {
      type: Object,
      value: {}
    }
  },
  data: {
    app: app,
    IconUrl: app.globalData.baseUrl + '/Upload/Pictures/mini/',
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.setData({
        isShow: false
      })
    },
    // 分享方式
    handleShare(e) {
      const type = e.currentTarget.dataset.type
      if (type === 'img') {
        SetBasic.JumpQrCode('/component/QrCodePoster/index', this.data.QrParams)
      }
    }
  }
})