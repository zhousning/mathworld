// pages/victory/victory.js
const app = getApp()
const appUtils = require('../../libs/app-utils.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isVictory: false,
    rank: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isVictory: app.globalData.isVictory,
      rank: wx.getStorageSync('rank')
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
    appUtils.addScore();
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

  goIndex: function() {
    wx.redirectTo({
      url: '../index/index'
    })
  },

  goNext: function() {
    appUtils.startGame();
  }
})