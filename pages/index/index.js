const app = getApp();
const config = require('../../libs/config.js')
const appUtils = require('../../libs/app-utils.js')


Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function(options) {
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
  onShow: function() {
    appUtils.addScore();
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
      appUtils.startGame({
        goGame: function () {
          wx.navigateTo({
            url: '../game/game',
          });
        }
      });
    }
  },
  startGame: function() {
    appUtils.startGame({
      goGame: function () {
        wx.navigateTo({
          url: '../game/game',
        });
      }
    });
  },
  checkScore: function() {
    wx.navigateTo({
      url: '../score/score'
    });
  },
  goTreasure: function() {
    wx.navigateTo({
      url: '../treasure/treasure',
    })
  },

  onShareAppMessage: function () {
    return app.createShareMessage();
  }

})