const app = getApp();
const config = require('../../libs/config.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    scores: [],
    userInfo: {},
    myScore: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        that.setData({
          userInfo: app.globalData.userInfo,
          myScore: res.data.myscore,
          scores: res.data.scores
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})