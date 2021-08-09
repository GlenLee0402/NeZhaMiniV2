import {
  GetSecKill
} from '../../api/secKill.js'
Component({
  options: {
    addGlobalClass: true
  },
  properties: {

  },
  data: {
    ListItem: []
  },
  created: function () {
    this.handleGet()
  },
  methods: {
    // 查询秒杀前三个
    handleGet() {
      GetSecKill(1, 3).then(res => {
        this.setData({
          ListItem: res.Data.ProjectList
        })
      })
    },
    // 更多或详情
    handleJump(e) {
      let url = '';
      e.currentTarget.dataset.type !== undefined ? url = '/pages/component/seckill/index' : url = '/pages/component/seckill/detail/index?ID=' + e.currentTarget.dataset.id
      wx.navigateTo({
        url: url
      })
    }
  }
})