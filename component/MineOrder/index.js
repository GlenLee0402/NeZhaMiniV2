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
    OrderList: SetBasic.MineOrderList, // 我的订单服务
  },
  methods: {
    // 跳转页面
    handleJump(e) {
      SetBasic.IsLoginToast(this, e.currentTarget.dataset.url)
    }
  }
})