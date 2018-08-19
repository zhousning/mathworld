// pages/victory/victory.js
const app = getApp()
const appUtils = require('../../libs/app-utils.js')

Page({
  data: {
    rank: 1
  },

  onLoad: function (options) {
    var that = this;
    that.setData({
      rank: wx.getStorageSync('rank')
    })
    wx.setNavigationBarTitle({
      title: '',
    });
  },

  onShow: function () {
    appUtils.addScore();
  },

  goIndex: function() {
    wx.redirectTo({
      url: '../index/index'
    })
  },

  goNext: function() {
    appUtils.startGame({
      goGame: function () {
        wx.redirectTo({
          url: '../game/game',
        });
      }
    });
  }
})