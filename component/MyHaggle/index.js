import {
  GetHaggleMine
} from '../../api/haggle'
const Moment = require('../../utils/moment.min.js');
import SetBasic from '../../utils/setData'
const Auth = require('../../utils/auth')
const app = getApp()
Component({
  options: {
    addGlobalClass: true
  },
  properties: {},
  data: {
    app: app,
    PageNum: app.globalData.pageNum,
    PageSize: app.globalData.pageSize,
    ListItem: []
  },
  attached() {
    const cur = Auth.GetCurrentPages()
    this.setData({
      CurUrl: cur
    })
  },
  created() {

    Auth.GetStorageSyncCheckSession().then(res => {
      res === true ? this.handleGet() : SetBasic.JumpLogin({
        CurUrl: this.data.CurUrl
      })
    })
  },
  methods: {
    handleJump(e) {
      if (e.currentTarget.dataset.status === 3) {
        SetBasic.Toasts(this, '已失效', 2000, 'fail')
      } else {
        let url = Auth.GetCurrentPages()
        SetBasic.JumpDetailPage(this.data.CurUrl, e.currentTarget.dataset.id, e.currentTarget.dataset.customerhaggleid)
      }
    },
    // 滚动分页
    handleLower() {
      if (this.data.ListItem.length >= this.data.PageSize) {
        this.setData({
          PageSize: this.data.PageSize + 4
        })
        this.handleGet()
      }
    },
    handleGet() {
      GetHaggleMine(this.data.PageNum, this.data.PageSize).then(res => {
        if (res.Data !== null) {
          const list = res.Data
          list.forEach(function (item, index) {
            item.ExpirationTime = Moment(item.ExpirationTime).format('YYYY-MM-DD HH:mm')
          })
          this.setData({
            ListItem: list
          })
        }
      })
    }
  }
})