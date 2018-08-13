const app = getApp();
const config = require('./config.js')

var appUtil = {
  getOpenId: function(code) {
    function restartRequest() {
      wx.hideLoading();
      wx.showModal({
        title: '登录失败',
        content: '请检查网络是否通畅',
        confirmText: '登录',
        success: function (res) {
          if (res.confirm) {
            wx.showLoading({
              title: '加载中',
              mask: true
            })
            appUtil.getOpenId(code);
          }
        }
      })
    }
    var isLogin = false;
    wx.request({
      url: config.routes.getUserId,
      method: 'POST',
      data: {
        code: code
      },
      header: {
        'Accept': "*/*",
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        if (res.data.openId) {
          wx.hideLoading();
          wx.setStorageSync('openId', res.data.openId);
          isLogin = true;
        } else {
          console.log(res);
          restartRequest();
        }
      },
      fail: function () {
        //请求失败弹出模态框，重新向服务器请求
        restartRequest();
      }
    })
    return isLogin;
  },
  appLogin: function() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    function restartLogin() {
      wx.hideLoading();
      wx.showModal({
        title: '登录失败',
        content: '请重新登录',
        confirmText: '登录',
        success: function (res) {
          if (res.confirm) {
            appUtil.appLogin();
          } 
        }
      })
    }
    var isLogin = false;
    wx.login({
      success: function (res) {
        if (res.code) {
         isLogin = appUtil.getOpenId(res.code);
        } else {
          restartLogin();
        }
      },
      fail: function () {
        restartLogin();
      }
    })
    return isLogin;
  },
  addScore: function() {
    var score = wx.getStorageSync("score");
    var openid = wx.getStorageSync("openId");
    if (score) {
      wx.request({
        url: config.routes.addScore,
        method: 'POST',
        header: {
          'Accept': "*/*",
          'content-type': 'application/json' // 默认值
        },
        data: {
          openid: openid,
          score: score
        },
        success: function (res) {
          if (res.data.status == 1) {
            wx.removeStorageSync('score');
          }
        }
      })
    }
  }
}

module.exports = appUtil