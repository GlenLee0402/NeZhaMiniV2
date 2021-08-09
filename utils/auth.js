const Moment = require('../utils/moment.min.js');
import request from '../utils/request.js'
// 注册登陆  Post请求
export function GetSence(url, scene) {
  return request({
    url: `${url}/api/Mini/GetSence?scene=` + scene,
    method: 'get'
  })
}
// 授权
export async function checkSession() {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success() {
        return resolve(true)
      },
      fail() {
        return resolve(false)
      }
    })
  })
}

// 检测登录状态，返回 true / false
export async function GetStorageSyncCheckSession() {
  // 检测token
  const token = wx.getStorageSync('Token')
  if (!token) {
    return false
  }
  // 检测token
  const session = wx.getStorageSync('CheckSession')
  if (!session) {
    return false
  }
  // 检测授权
  const loggined = await checkSession()
  if (!loggined) {
    wx.setStorageSync('Token', '') // 保存token
    wx.setStorageSync('CheckSession', false) // 记录登陆状态
    return false
  }
  return true
}

// 检查网络
export function GetNetworkType() {
  var that = this;
  wx.getNetworkType({
    success(res) {
      const networkType = res.networkType
      if (networkType === 'none') {
        that.globalData.isConnected = false
        wx.showToast({
          title: '当前无网络',
          icon: 'loading',
          duration: 2000
        })
      }
    }
  });
}

// 监听网络状态变化
export function NetworkStatusChange() {
  var that = this;
  wx.onNetworkStatusChange(function (res) {
    if (!res.isConnected) {
      that.globalData.isConnected = false
      wx.showToast({
        title: '网络已断开',
        icon: 'loading',
        duration: 2000
      })
    } else {
      that.globalData.isConnected = true
      wx.hideToast()
    }
  })
}

// 获取当前页面路径
export function GetCurrentPages() {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  return `/${currentPage.route}`
}

// 检查版本更新
export function GetUpdate() {
  if (wx.canIUse("getUpdateManager")) {
    let updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate((res) => {
      // 请求完新版本信息的回调
    })
    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: (res) => {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          } else if (res.cancel) {
            return false;
          }
        }
      })
    })
    updateManager.onUpdateFailed(() => {
      // 新的版本下载失败
      wx.hideLoading();
      wx.showModal({
        title: '升级失败',
        content: '新版本下载失败，请检查网络！',
        showCancel: false
      });
    });
  }

}

// 推荐时间
export function PromoteDateTime() {
  return Moment(new Date()).format('YYYY-MM-DD HH:mm')
}

// 推荐人信息 时间跟ID
// export function PromoteInfo(id) {
//   // 推荐时间
//   var promoteDateTime = Moment(new Date()).format('YYYY-MM-DD HH:mm')
//   wx.setStorageSync('PromoteDateTime', promoteDateTime)
//   // // 推荐人ID
//   // wx.setStorageSync('PromoteID', id)
// }

// 离开小程序时间
export function LeaveMini() {
  const time = Moment(new Date()).format('YYYY-MM-DD HH:mm')
  wx.setStorageSync('LeaveTime', time)
}

// 存储推荐参数,项目ID,特殊ID,进入小程序时间,
export async function PromoteSet(url, val) {
  // 判断链接还是海报进入
  if (val.scene === undefined) {
    // 推荐人ID
    wx.setStorageSync('PromoteID', val.PromoteID)
    // 推荐人场景值
    wx.setStorageSync('SourceType', val.Source)
  } else {
    // 解析scene携带参数
    const res = await GetSence(url, val.scene)
    const arr = res.Data.split(",");
    // 单独保存推荐人ID
    // 推荐人ID
    wx.setStorageSync('PromoteID', arr[0])
    // 推荐人场景值
    wx.setStorageSync('SourceType', arr[1])
    // 其他参数
    wx.setStorageSync('PromoteArr', arr)
  }
  // 推荐时间
  var promoteDateTime = Moment(new Date()).format('YYYY-MM-DD HH:mm')
  wx.setStorageSync('PromoteDateTime', promoteDateTime)
  // 离开时间
  const leaveTime = wx.getStorageSync('LeaveTime')
  console.log('推荐人ID::::::::::::', wx.getStorageSync('PromoteID'), wx.getStorageSync('PromoteArr'))
}

export async function GetPromote() {
  return new Promise(function (resolve, reject) {
    GetSence()
    // wx.qy.getContext({
    //   success: function (res) {
    //     if (res.entry !== 'normal') {
    //       wx.qy.getCurExternalContact({
    //         success: function (res) {
    //           resolve(res.userId);
    //         }
    //       })
    //     }
    //   }
    // })
  })
}