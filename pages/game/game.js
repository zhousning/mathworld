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
    GameBackground: '',
    CountDown: 0,
    Timer: null,
    time: gameUtils.config.countDownMax,
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
    gameUtils.startCountDown(that);
  },
  checkAnswer: function(e) {
    var that = this;
    var trueAnswer = e.currentTarget.dataset.trueAnswer;
    var answerOption = e.currentTarget.dataset.answerOption;
    var index = e.currentTarget.dataset.answerIndex;

    that.setData({
      ActiveIndex: index
    })
    
    if (trueAnswer == answerOption) {
      var score = gameUtils.background_score[that.data.Operator][1];
      var currentScore = wx.getStorageSync('score') + score;
      var rank = wx.getStorageSync('rank');
      wx.setStorageSync('score', currentScore);

      if (currentScore == config.games.rankScore) {
        wx.setStorageSync('rank', rank + 1);
        that.data.RedirectTimeOut = setTimeout(function() {
          wx.redirectTo({
            url: '../victory-success/victory-success',
          })
        }, config.games.changeQuestionTime);
        return;
      }
    } else {
      that.data.RedirectTimeOut = setTimeout(function() {
        wx.redirectTo({
          url: '../victory-fail/victory-fail',
        })
      }, config.games.changeQuestionTime);
      return;
    }

    that.data.RedirectTimeOut = setTimeout(function() {
      wx.redirectTo({
        url: './game',
        success: function() {
          gameUtils.stopCountDown(that);
        }
      })
    }, config.games.changeQuestionTime);
  }
})