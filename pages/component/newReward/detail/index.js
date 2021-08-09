import {
  GetNewRewardDetail
} from '../../../../api/newReward'
Page({
  data: {
    Detail: null,
    Params: {
      ID: ''
    }
  },
  onLoad: function (options) {
    this.setData({
      "Params.ID": options.ID,
      "Params.ChannelID": options.ChannelID
    })
    this.handleGet()
  },
  // 查询详细
  handleGet() {
    GetNewRewardDetail(this.data.Params).then(res => {
      this.setData({
        Detail: res.Data
      })
    })
  },
})