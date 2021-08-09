const app = getApp();
import SetBasic from '../../utils/setData'
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    'Tabs': {
      type: Array,
      value: [],
      observer: function (params) {
        this.setData({
          Active: params[0].Name
        })
      }
    }
  },
  data: {
    Active: '',
  },
  methods: {
    handleActive(e) {
      this.setData({
        Active: e.currentTarget.dataset.name
      })
      this.triggerEvent("Active", e.currentTarget.dataset.type)
    }
  }
})