const appUtils = require('./libs/app-utils.js')
const config = require('./libs/config.js')

App({
  onLaunch: function() {
    var openId = wx.getStorageSync('openId');
    if (!openId) {
      appUtils.appLogin();
    }
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              this.globalData.userInfo = res.userInfo

              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  createShareMessage: function() {
    var message = {
      title: '这智商，我也是醉了',
      imageUrl: 'https://www.bafangjie.cn/assets/share.jpg',
      path: '/pages/index/index'
    }
    return message;
  }
})