// component/TitleTag/index.js
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    'Title': {
      type: String,
      value: ''
    },
    'isTag': {
      type: Boolean,
      value: false
    },
    'Text': {
      type: String,
      value: ''
    },
    'Url': {
      type: String,
      value: ''
    }
  },
  methods: {
    handleJump() {
      if (this.data.isTag === true) {
        wx.navigateTo({
          url: this.data.Url,
        })
      }
    }
  }
})