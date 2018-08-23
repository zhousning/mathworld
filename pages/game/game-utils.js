var gameUtil = {
  config: {
    countDownMax: 10
  },
  background_score: {
    "+": ["to right, #f6d365 0%, #fda085 51%, #f6d365 100%", 1],
    "-": ["to right, #fbc2eb 0%, #a6c1ee 51%, #fbc2eb 100%", 1],
    "×": ["to right, #84fab0 0%, #8fd3f4 51%, #84fab0 100%", 1]
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
  //产生包括result在内的四个不同数字的数组(选项)
  prepareOptions: function(result) {
    var options = [result];
    for (var i = 1; i <= 3; i++) {
      var option = gameUtil.setAnswerOption(options, result);
      options.push(option);
    }
    options.sort(gameUtil.randomsort);
    return options;
  },
  setAnswerOption: function(optionsArr, target) {
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
  randomsort: function() {
    return Math.random() > 0.5 ? -1 : 1;
  },
  calculateResult: function(Operator, ParamA, ParamB) {
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
  _resultObj: function(pa, op, pb, rs, ao, ta) {
    var result = {
      ParamA: pa,
      Operator: op,
      ParamB: pb,
      Result: rs,
      AnswerOptions: ao,
      TrueAnswer: ta
    }
    return result;
  },
  //1.普通计算：例：5*3=?
  _ordinaryStrategy: function(pa, op, pb, ta) {
    var answerOptions = gameUtil.prepareOptions(ta);
    var standardResult = ta;
    var result = gameUtil._resultObj(pa, op, pb, '?', answerOptions, standardResult);
    return result;
  },
  //2.一个因子：5*？=15
  _oneFactor: function(pa, op, pb, ta) {
    var answerOptions = gameUtil.prepareOptions(pb);
    var standardResult = pb;
    var result = gameUtil._resultObj(pa, op, '?', ta, answerOptions, standardResult);
    return result;
  },
  //3.两个因子：?*?=9
  _twoFactor: function(pa, op, pb, ta) {
    var standardResult = pa + ', ' + pb;
    var arrA = gameUtil.prepareOptions(pa);
    var arrB = gameUtil.prepareOptions(pb);
    var answerOptions = [];
    for (var i = 0; i < arrA.length; i++) {
      var str = arrA[i] + ', ' + arrB[i];
      answerOptions.push(str);
    }

    if (answerOptions.indexOf(standardResult) == -1) {
      answerOptions[gameUtil.getRandom(0, 3)] = standardResult;
    }

    var result = gameUtil._resultObj('?', op, '?', ta, answerOptions, standardResult);
    return result;
  },
  //4.一个因子+结果：？*3=？
  _oneFactorAndResult: function(pa, op, pb, ta) {
    var standardResult = pa + ', ' + ta;
    var arrA = gameUtil.prepareOptions(pa);
    var arrB = gameUtil.prepareOptions(ta);
    var answerOptions = [];
    for (var i = 0; i < arrA.length; i++) {
      var str = arrA[i] + ', ' + arrB[i];
      answerOptions.push(str);
    }

    if (answerOptions.indexOf(standardResult) == -1) {
      answerOptions[gameUtil.getRandom(0, 3)] = standardResult;
    }

    var result = gameUtil._resultObj('?', op, pb, '?', answerOptions, standardResult);
    return result;
  },
  getRandomOperator: function() {
    var operatorArr = ['+', '-', '×', '÷'];
    operatorArr.sort(gameUtil.randomsort);
    return operatorArr;
  },
  //5.一个运算符：3?3=9
  _oneOperator: function(pa, op, pb, ta) {
    var standardResult = op;
    var answerOptions = gameUtil.getRandomOperator();
    var result = gameUtil._resultObj(pa, '?', pb, ta, answerOptions, standardResult);
    return result;
  },
  //6.一个因子+一个运算符：??3=9
  _oneFactorAndOperator: function(pa, op, pb, ta) {
    var standardResult = pa + '' + op;
    var arrA = gameUtil.prepareOptions(pa);
    var arrB = gameUtil.getRandomOperator();

    var cache = [];
    for (var i = 0; i < arrA.length; i++) {
      cache.push(arrA[i] + '' + arrB[i]);
    }

    if (cache.indexOf(standardResult) == -1) {
      cache[gameUtil.getRandom(0, 3)] = standardResult;
    }
    var answerOptions = cache;
    var result = gameUtil._resultObj('?', '?', pb, ta, answerOptions, standardResult);
    return result;
  },
  //7.一个因子+一个运算符+一个结果: ??4=?
  _oneFactorAndOperatorAndResult: function(pa, op, pb, ta) {
    var standardResult = pa + '' + op + ', ' + ta;
    var arrA = gameUtil.prepareOptions(pa);
    var arrB = gameUtil.getRandomOperator();
    var arrC = gameUtil.prepareOptions(ta);

    var cache = [];
    for (var i = 0; i < arrA.length; i++) {
      cache.push(arrA[i] + '' + arrB[i] + ', ' + arrC[i]);
    }
    if (cache.indexOf(standardResult) == -1) {
      cache[gameUtil.getRandom(0, 3)] = standardResult;
    }
    var answerOptions = cache;
    var result = gameUtil._resultObj('?', '?', pb, '?', answerOptions, standardResult);
    return result;
  },
  prepareQuestion: function(that, rank) {
    var pa = gameUtil.getRandom(1, 100);
    var pb = gameUtil.getRandom(1, 100);
    var op = gameUtil.getOperator();
    var ta = gameUtil.calculateResult(op, pa, pb);
    var bg = gameUtil.background_score[op][0];
    var sc = gameUtil.background_score[op][1];

    var result = null;
    switch ((rank - 1) / 7) {
      case 0:
        result = gameUtil._ordinaryStrategy(pa, op, pb, ta);
        break;
      case 1:
        result = gameUtil._oneOperator(pa, op, pb, ta);
        break;
      case 2:
        result = gameUtil._oneFactor(pa, op, pb, ta);
        break;
      case 3:
        result = gameUtil._oneFactorAndOperator(pa, op, pb, ta);
        break;
      case 4:
        result = gameUtil._twoFactor(pa, op, pb, ta);
        break;
      case 5:
        result = gameUtil._oneFactorAndResult(pa, op, pb, ta);
        break;
      case 6:
        result = gameUtil._oneFactorAndOperatorAndResult(pa, op, pb, ta);
        break;
      default:
        result = gameUtil._ordinaryStrategy(pa, op, pb, ta);
        break;
    }
    result['Score'] = sc;
    result['GameBackground'] = bg;
    result['time'] = gameUtil.config.countDownMax;
    result['CountDown'] = gameUtil.config.countDownMax;
    that.setData(result);

    if (that.data.Timer != null) {
      gameUtil.stopCountDown(that);
    }
  },
  startCountDown: function(that) {
    var time = that.data.time;
    that.data.Timer = setInterval(function() {
      time = time - 1;
      that.data.time = time;
      that.setData({
        CountDown: time
      });
      if (time == 0) {
        gameUtil.stopCountDown(that);
        wx.redirectTo({
          url: '../victory-fail/victory-fail',
        })
      }
    }, 1000);
  },
  prepareData: function(that) {
    var rank = wx.getStorageSync('rank');
    gameUtil.prepareQuestion(that, rank);
    gameUtil.startCountDown(that);
  },
  stopCountDown: function(that) {
    clearInterval(that.data.Timer);
  }
}

module.exports = gameUtil;