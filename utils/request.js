// export default request
// request.js
const request = options => {
  return new Promise((resolve, reject) => {
    const {
      data,
      method
    } = options
    if (data && method !== 'get') {
      options.data = JSON.stringify(data)
    }
    wx.showLoading({
      title: '加载中',
      icon: "none",
      duration: 3000
    })
    wx.request({
      header: {
        'Content-Type': 'application/json',
        token: wx.getStorageSync('Token')
      },
      ...options,
      success: function (res) {
        wx.hideLoading();
        if (res.data.ResultType === 0) {
          resolve(res.data)
        } else {
          setTimeout(() => {
            wx.showToast({
              title: res.data.Message,
              icon: "none",
            });
            setTimeout(() => {
              wx.hideToast();
            }, 5000)
          }, 0);
          reject(res.data)
        }
      },
      fail: function (res) {
        reject(res.data)
      },
      complete: info => {
        wx.hideLoading();
      }
    })
  })

}
export default request