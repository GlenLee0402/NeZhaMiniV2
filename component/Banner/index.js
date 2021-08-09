Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    'BannerList': {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleJump(e) {
      const urlSub5 = e.currentTarget.dataset.url.substring(0, 5)
      const urlSub6 = e.currentTarget.dataset.url.substring(0, 6)
      const urlSub1 = e.currentTarget.dataset.url.substring(0, 1)
      if (urlSub5 === 'pages' || urlSub6 === '/pages') {
        const toUrl = urlSub1 === '/' ? e.currentTarget.dataset.url : '/' + e.currentTarget.dataset.url
        wx.navigateTo({
          url: toUrl
        })
      } else if (urlSub5 !== '/pages' && urlSub5 !== "" && urlSub5 !== null) {
        wx.navigateTo({
          url: '/component/WebViwe/WeChat/index?url=' + e.currentTarget.dataset.url
        })
      }
    }
  }
})