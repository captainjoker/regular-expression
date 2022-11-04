const generateNode = require('./generateNode');

const MatchHelper = require('./match');



class RegularExpression {
  constructor(pattern, model) {
    this.pattern = pattern;
    this.model = model;
    let {
      expNodeList,
      groupNum
    } = generateNode(pattern);
    this.expNodeList = expNodeList;
    this.groupNum = groupNum;
    this.lastIndex = 0;
    this.lastItem = '';
  }
    
  exec(text) {
    return this.run(text);
  }

  run(text){
    let { expNodeList, groupNum } = this;
    let result = new MatchHelper(expNodeList, groupNum, text).exec();
    return result;
  }
}

// console.log(new RegularExpression('abc{1,3}d??').exec('abccd'));

module.exports = RegularExpression;