import {
  GetProjectPages
} from '../../../api/project'
import SetBasic from '../../../utils/setData'
const app = getApp();

Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    'BasicInfo': {
      type: Object,
      value: null
    }
  },
  data: {
    app: app,
    ListItem: [],
    pageNum: app.globalData.pageNum,
    pageSize: app.globalData.pageSize,
    categoryName: '',
    height: 0
  },
  created() {
    this.handleGet()
  },
  methods: {
    // 分类
    handleCategoryName(e) {
      this.setData({
        categoryName: e.detail,
        ToAnchor: 'ListItem',
        pageNum: app.globalData.pageNum,
        pageSize: app.globalData.pageSize
      })
      this.handleGet()
    },
    // 跳转
    handleJump(e) {
      SetBasic.JumpDetailPage('/pages/component/home/index', e.currentTarget.dataset.id)
    },
    // 滚动分页
    handleLower() {
      if (this.data.ListItem.length >= this.data.pageSize) {
        this.setData({
          pageSize: this.data.pageSize + 2
        })
        this.handleGet()
      }
    },
    // 查询
    handleGet() {
      GetProjectPages(this.data.pageNum, this.data.pageSize, this.data.categoryName).then(res => {
        this.setData({
          LiveRoom: res.Data.LiveRoom,
          ListItem: res.Data.ProjectList,
        })
      })
    }
  }
})