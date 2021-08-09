const app = getApp();
import Toast from '../../vantui/vant-weapp/toast/toast'
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    bgColor: {
      type: String,
      default: '',
      value: '#ffffff'
    },
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },
    isText: {
      type: String,
      default: '',
      value: '商品详情'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },
  /**
   * 组件的方法列表
   */
  methods: {
    BackPage() {
      wx.navigateBack({
        delta: 1,
        success: (res) => {

        },
        fail: (err) => {
          Toast({
            context: this,
            message: '请返回首页'
          })
        }
      });
    },
    toHome() {
      // 推荐人ID
      var pid = wx.getStorageSync('PromoteID')
      wx.redirectTo({
        url: '/pages/index/index?PromoteID=' + pid,
      })
    }
  }
})