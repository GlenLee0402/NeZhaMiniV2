import {
  GetPTassemble
} from '../../api/assemble'
const Auth = require('../../utils/auth')
import SetBasic from '../../utils/setData'
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
    // 查询前三个
    handleGet() {
      GetPTassemble(1, 3).then(res => {
        this.setData({
          ListItem: res.Data.ProjectList
        })
      })
    },
    // 跳转
    handleJump(e) {
      SetBasic.JumpDetailPage('/pages/component/assemble/index', e.currentTarget.dataset.id)
    }
  }
})