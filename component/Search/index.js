const app = getApp();
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    IconUrl: app.globalData.baseUrl + '/Upload/Pictures/mini/',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSearch() {
      wx.navigateTo({
        url: '/pages/component/search/index',
      })
    }
  }
})