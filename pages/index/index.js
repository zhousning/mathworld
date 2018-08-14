const app = getApp();
const config = require('../../libs/config.js')
const appUtils = require('../../libs/app-utils.js')


Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    hasOpenId: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function(options) {
    /*var openId = wx.getStorageSync('openId');
    if (openId) {
      this.setData({
        hasOpenId: true
      })
    } else {
      app.loginReadyCallback = () => {
        this.setData({
          hasOpenId: true
        })
      }
    }*/
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    var userInfo = app.globalData.userInfo = e.detail.userInfo
    //var encryptedData = e.detail.encryptedData;
    //var iv = e.detail.iv;
    if (userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      appUtils.updateUserInfo(userInfo);
      appUtils.startGame();
    }
  },
  login: function() {
    var isLogin = appUtils.appLogin();
    if (isLogin) {
      this.setData({
        hasOpenId: true
      })
    }
  },
  startGame: function() {
    appUtils.startGame();
  },
  checkScore: function() {
    appUtils.addScore();
    wx.navigateTo({
      url: '../score/score'
    });
  }

})