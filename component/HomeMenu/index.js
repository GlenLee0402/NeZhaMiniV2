import SetBasic from '../../utils/setData'
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    "LiveRoom": {
      type: String,
      value: ''
    },
    'BasicInfo': {
      type: Object,
      value: null,
      observer: function (val) {
        const MenuIconTemp = [val.IconSeckill, val.IconPinTuan, val.IconHaggle, val.IconLottery, val.IconHelp, val.IconRoom]
        this.data.MenuList.forEach((item, index) => {
          this.setData({
            ["MenuList[" + index + "].iconUrl"]: MenuIconTemp[index]
          })
        })
        const MenuMemberTemp = [val.ImageNew, val.ImagePoint]
        this.data.MenuMemberList.forEach((item, index) => {
          this.setData({
            ["MenuMemberList[" + index + "].iconUrl"]: MenuMemberTemp[index]
          })
        })
        this.setData({
          ImageMember: val.ImageMember
        })
      }
    }
  },
  data: {
    MenuList: SetBasic.MenuSet,
    MenuMemberList: SetBasic.RewardPoint
  },
  methods: {
    // 菜单跳转
    handleJump(e) {
      const url = e.currentTarget.dataset.url
      if (e.currentTarget.dataset.index === 5) {
        if (this.data.LiveRoom === '') {
          SetBasic.Toasts(this, '当前院内暂无直播!', 3000)
          return false
        } else {
          // 填写具体的房间号，可通过下面【获取直播房间列表】 API 获取
          let roomId = [this.data.LiveRoom]
          // 开发者在直播间页面路径上携带自定义参数（如示例中的path和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，详见【获取自定义参数】、【直播间到商详页面携带参数】章节（上限600个字符，超过部分会被截断）
          let customParams = encodeURIComponent(JSON.stringify({
            path: '/pages/component/plivePlayer/index',
            pid: this.data.LiveRoom
          }))
          SetBasic.Jump(`plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}&custom_params=${customParams}`)
        }
      } else {
        SetBasic.Jump(url)
      }
    },
    // 会员兑换专区
    handleJumpMember(e) {
      SetBasic.Jump(e.currentTarget.dataset.url)
    }
  }
})