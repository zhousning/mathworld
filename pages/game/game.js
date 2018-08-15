const gameUtils = require('./game-utils.js');
const config = require('../../libs/config.js')
const app = getApp()


Page({
  data: {
    ParamA: '',
    ParamB: '',
    Operator: '',
    Score: 0,
    AnswerOptions: [],
    TrueAnswer: 0,
    GameBackground: '#728D98',
    CountDown: 0,
    ProgressValue: 0,
    Timer: null,
    time: gameUtils.config.countDownMax,
    AnswerStatus: 0,
    ActiveTimeOut: 0,
    RedirectTimeOut: 0,
  },
  onLoad: function(options) {
    var that = this;
    var rank = wx.getStorageSync('rank');
    gameUtils.prepareQuestion(that, parseInt(rank));
  },
  //redirectTo or navigatBack
  onUnload: function() {
    var that = this;
    clearTimeout(that.data.ActiveTimeOut);
    clearTimeout(that.data.RedirectTimeOut);
    gameUtils.stopCountDown(that);
  },
  onHide: function() {
    var that = this;
    gameUtils.stopCountDown(that);
  },
  onShow: function() {
    var that = this;
    //gameUtils.startCountDown(that);
  },
  checkAnswer: function(e) {
    var that = this;
    var trueAnswer = e.currentTarget.dataset.trueAnswer;
    var answerOption = e.currentTarget.dataset.answerOption;
    var index = e.currentTarget.dataset.answerIndex;
    var active = 'active' + index;

    that.setData({
      active: index
    })

    that.data.ActiveTimeOut = setTimeout(function() {
      that.setData({
        active: -1
      })
    }, 300);

    if (trueAnswer == answerOption) {
      var score = gameUtils.background_score[that.data.Operator][1];
      var currentScore = wx.getStorageSync('score') + score;
      var rank = wx.getStorageSync('rank');
      wx.setStorageSync('score', currentScore);

      if (currentScore == config.games.rankScore) {
        wx.setStorageSync('rank', rank + 1);
        that.data.RedirectTimeOut = setTimeout(function() {
          app.globalData.isVictory = true;
          wx.redirectTo({
            url: '../victory/victory',
          })
        }, 1000);
        return;
      }
    } else {
      that.data.RedirectTimeOut = setTimeout(function() {
        app.globalData.isVictory = false;
        wx.redirectTo({
          url: '../victory/victory',
        })
      }, 1000);
      return;
    }

    that.data.RedirectTimeOut = setTimeout(function() {
      wx.redirectTo({
        url: './game',
        success: function() {
          gameUtils.stopCountDown(that);
        }
      })
    }, 1000);
  },
  getNextQuestion: function() {
    wx.navigateBack({

    });
  }


})