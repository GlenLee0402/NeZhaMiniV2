const app = getApp();
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
      // value: 'bg-white',
      value: '#61c4dd'
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
      value: ''
    },
    ColorLeft: {
      type: String,
      default: ''
    },
    ColorRight: {
      type: String,
      default: ''
    },
    FontColor: {
      type: String,
      default: ''
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  }
})