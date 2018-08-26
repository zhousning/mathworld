const app = getApp();
const config = require('../../libs/config.js')


Page({
  data: {
    scores: [],
    userInfo: {},
    myScore: 0,
    myRank: 1
  },

  onShow: function (options) {
    var openid = wx.getStorageSync('openId');
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: config.routes.topOneHundred,
      method: 'GET',
      data: {
        openid: openid
      },
      header: {
        'Accept': "*/*",
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        that.setData({
          myScore: res.data.myscore,
          myRank: res.data.myrank,
          scores: res.data.scores
        });
        wx.hideLoading();
      }
    })
  },

  onShareAppMessage: function () {
    return app.createShareMessage();
  }
})