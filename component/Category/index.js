import {
  GetCategory
} from '../../api/project'
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    'FontColor': {
      type: String,
      value: '#000000'
    },
    'CategoryType': {
      type: Number,
      value: 0,
      observer: function (val) {
        this.setData({
          type: val
        })
        this.handleGet()
      }
    },
    'MiddleColorLeft': {
      type: String,
      value: '#ffffff'
    },
    'MiddleColorRight': {
      type: String,
      value: '#ffffff'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ListItem: [],
    TabCur: 0,
    type: 1
  },
  created: function () {
    // this.handleGet()
  },
  methods: {
    handleGet() {
      GetCategory(this.data.type).then(res => {
        this.setData({
          ListItem: res.Data
        })
        this.triggerEvent("CategoryNameOne", this.data.ListItem[0].Name)
      })
    },
    // 分类切换
    handleActive(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.index,
      })
      this.triggerEvent("CategoryName", e.currentTarget.dataset.name)

    }
  }
})