const parseExp = require('./generateNode/parseExp');

module.exports = class RegularExpression {
  constructor(pattern, model) {
    this.pattern = pattern;
    this.model = model;
    this.expArr = parseExp(pattern);
  }
    
  exec(text) {
    this.text = text;
  }

  run(){
    let index = 0;
    let { pattern } = this;
    while (index > pattern.length){ 
      index++; 
    }
  }
  static test(a, b) {
    return a + b;
  }
};