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
      wx.navigateTo({
        url: '../game/game',
        success: function () {
          wx.request({
            url: config.routes.updateUser + wx.getStorageSync('openId'),
            method: 'PUT',
            data: {
              nickname: userInfo.nickName,
              avatarurl: userInfo.avatarUrl,
              gender: userInfo.gender,
              city: userInfo.city,
              province: userInfo.province,
              country: userInfo.country,
              language: userInfo.language
            },
            header: {
              'Accept': "*/*",
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res.data.wxuser_status);
            }
          })
        }
      });
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
    wx.navigateTo({
      url: '../game/game',
    });
  },
  checkScore: function() {
    appUtils.addScore();
    wx.navigateTo({
      url: '../score/score'
    });
  }

})