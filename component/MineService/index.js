const app = getApp();
import SetBasic from '../../utils/setData'
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    'User': {
      type: Object,
      value: null
    }
  },
  data: {
    app: app,
    ServerList: SetBasic.MineServerList, // 我的服务
    IconUrl: app.globalData.baseUrl + '/Upload/Pictures/mini/',
  },
  methods: {
    // 跳转星选家
    handleShare(e) {
      const status = e.currentTarget.dataset.status
      let url = ''
      // 已禁用
      if (status === app.SuperVipType.Stop) {
        SetBasic.Toasts(this, '星选家权益被禁或未成为星选家!', 4000)
        return false
      }
      // 审核通过
      if (status === app.SuperVipType.Use) {
        url = '/pages/component/mine/myShare/selectList/index'
      }
      // 等待审核
      if (status === app.SuperVipType.Auditing) {
        url = '/pages/component/mine/myShare/attestationSuccess/index'
      }
      // 审核失败 或则未加入
      if (status === app.SuperVipType.AuditFailed || status === app.SuperVipType.No) {
        url = '/pages/component/mine/myShare/attestation/index?url=' + this.data.User.SuperVipImageUrl
      }
      SetBasic.IsLoginToast(this, url)
      // SetBasic.Jump(url)
    },
    // 更多服务跳转
    handleJump(e) {
      const type = e.currentTarget.dataset.type;
      let u = e.currentTarget.dataset.url;
      if (type === 'address') {
        u = e.currentTarget.dataset.url + '?Params=' + JSON.stringify(this.data.User)
      }
      SetBasic.IsLoginToast(this, u)
    }
  }
})