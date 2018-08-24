// pages/victory/victory.js
const app = getApp()
const appUtils = require('../../libs/app-utils.js')
const config = require('../../libs/config.js')

Page({
  data: {
    rank: 1
  },

  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: config.titles.fail
    });
    that.setData({
      rank: wx.getStorageSync('rank')
    })
  },

  onShow: function () {
    appUtils.addScore();
  },

  goIndex: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  },

  goNext: function () {
    appUtils.startGame({
      goGame: function () {
        wx.redirectTo({
          url: '../game/game',
        });
      }
    });
  },

  onShareAppMessage: function () {
    return app.createShareMessage();
  }
})