const app = getApp();
const config = require('../../libs/config.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    scores: [],
    userInfo: {},
    myScore: 0,
    myRank: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var openid = wx.getStorageSync('openId');
    var that = this;
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
        console.log(res);
        that.setData({
          myScore: res.data.myscore,
          myRank: res.data.myrank,
          scores: res.data.scores
        });
      }
    })
  }
})