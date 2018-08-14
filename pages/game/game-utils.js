var gameUtil = {
  config: {
    countDownMax: 10
  },
  background_score: {
    "+": ["#008171", 1],
    "-": ["#237EAD", 1],
    "×": ["#369445", 1]
  },
  getRandom: function(max, min) {
    var random = Math.round(Math.random() * (max - min) + min); //生成n-m，包含n和m的随机数
    return random;
  },
  getOperator: function() {
    var index = gameUtil.getRandom(0, 2);
    var arr = ['+', '-', '×'];
    return arr[index]
  },
  prepareOptions: function (result) {
    var options = [result];
    for (var i = 1; i <= 3; i++) {
      var option = gameUtil.setAnswerOption(options, result);
      options.push(option);
    }
    options.sort(gameUtil.randomsort);
    return options;
  },
  setAnswerOption: function (optionsArr, target) {
    var result = target;
    var options = optionsArr;
    var resultAbs = Math.abs(result);
    var length = (resultAbs + '').length;
    var unit = resultAbs % 10;
    var option = '';
    var prefix = '';
    if (result < 0) {
      prefix = '-';
    }
    if (length > 1) {
      var n = Math.pow(10, length - 2);
      var m = Math.pow(10, length - 1) - 1;
      var random = gameUtil.getRandom(n, m);
      option = prefix + random + '' + unit;
    } else {
      var random = gameUtil.getRandom(1, 9) + '';
      option = prefix + random;
    }
    option = parseInt(option);
    if (options.indexOf(option) != -1) {
      return gameUtil.setAnswerOption(options, result);
    } else {
      return option;
    }
  },
  randomsort: function (a, b) {
    return Math.random() > .5 ? -1 : 1;
  },
  calculateResult: function (Operator, ParamA, ParamB) {
    var result = 0;
    switch (Operator) {
      case '+':
        result = parseInt(ParamA) + parseInt(ParamB);
        break;
      case '-':
        result = parseInt(ParamA) - parseInt(ParamB);
        break;
      case '×':
        result = parseInt(ParamA) * parseInt(ParamB);
        break;
      case '/':
        result = parseInt(ParamA) / parseInt(ParamB);
        break;
    }
    return result;
  },
  prepareQuestion: function(that) {
    var pa = gameUtil.getRandom(1, 100);
    var pb = gameUtil.getRandom(1, 100);
    var op = gameUtil.getOperator();
    var ta = gameUtil.calculateResult(op, pa, pb);
    var bg = gameUtil.background_score[op][0];
    var sc = gameUtil.background_score[op][1];
    var result = {
      ParamA: pa,
      ParamB: pb,
      Operator: op,
      AnswerStatus: 0,
      TrueAnswer: ta,
      GameBackground: bg,
      Score: sc,
      time: gameUtil.config.countDownMax,
      CountDown: gameUtil.config.countDownMax,
      AnswerOptions: gameUtil.prepareOptions(ta),
    };
    that.setData(result);
    if (that.data.Timer != null) {
      gameUtil.stopCountDown(that);
    }
  },
  startCountDown: function(that) {
    //var time = gameUtil.config.countDownMax;
    var time = that.data.time;
    var progressValue = that.data.ProgressValue;
    that.data.Timer = setInterval(function () {
      time = time - 1;
      progressValue = progressValue + 1;
      that.data.time = time;
      that.setData({
        CountDown: time,
        ProgressValue: progressValue
      });
      if (time == 0) {
        gameUtil.stopCountDown(that);
        that.setData({
          active: -1
        });
        setTimeout(function(){
          wx.redirectTo({
            url: '../victory/victory',
          })
        }, 2000);
      }
    }, 1000);
  },
  prepareData: function(that) {
    gameUtil.prepareQuestion(that);
    gameUtil.startCountDown(that);
  },
  stopCountDown: function(that) {
    clearInterval(that.data.Timer);
  }
}

module.exports = gameUtil;