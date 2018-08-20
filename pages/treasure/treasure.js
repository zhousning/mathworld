const config = require('../../libs/config.js')


Page({


  data: {
    Badge: [],
    TollGate: config.games.tollGate,
    Rank: 1
  },

  onShow: function () {
    var that = this;
    var openid = wx.getStorageSync('openId');
    var rank = wx.getStorageSync('rank');

    var arr = [];
    for (var i = 1; i <= config.games.tollGate; i++) {
      arr.push(i);
    }

    if (rank) {
      that.setData({
        Badge: arr,
        Rank: rank
      })
    } else {
      wx.request({
        url: config.routes.getRank,
        header: {
          'Accept': "*/*",
          'content-type': 'application/json' // 默认值
        },
        data: {
          openid: openid
        },
        success: function (res) {
          console.log(res);
          var rank = parseInt(res.data.rank);
          wx.setStorageSync('rank', rank);
          that.setData({
            Badge: arr,
            Rank: rank
          })
        }
      })
    }
  }
})