const {
  BOUNDARY,
  GROUPID,
  // ASSERTIONS,
  // CHARSET,
  PRESETSET,
  // RANGECHARSET,
  // LOGICOR,
  // CHARS
} = require('./NodeType');

const { 
  isWordChar,
  isNumber,
  isABC
} = require('./meta');

const nodeEqual = {
  [GROUPID] : (text, startIndex, node, realValue) => {
    let matchText = null;
    if (realValue !== undefined){
      let i = 0;
      for (; i < realValue.length; i++){
        if (text[startIndex + i] !== realValue[i]){
          break;
        }
      }
      matchText = i === realValue.length ? realValue : matchText;
    } else if (realValue === ''){
      matchText = '';
    }
    return  matchText;
  },
  [BOUNDARY] : (text, index, node) => {
    let { value } = node;
    let matchText = null;
    let char = text[index];
    let isUn = false;
    switch (value){
      case '^':
        matchText = index === 0 ? '' : null;
        break;
      case '$':
        matchText = index === text.length ? '' : null; 
        break;
      case 'b':
        matchText = index === 0 || index === text.length || !isWordChar(char) ? '' : null;
        break;
        // isUn = true;
        // break omitted
      case 'B':
        matchText = index === 0 || index === text.length || !isWordChar(char) ? null : '';
        break;
    }
    return matchText;
  },
  [PRESETSET] : (text, index, node) => {
    let { value } = node;
    let matchText = null;
    switch (value){
      case 'd':
        matchText = isNumber();
        break;
      case 'D':
        break;
      case 's':
        break;
      case 'S':
        break;
      case 'w':
        break;
      case 'W':
        break;
      case 'f':
        break;
      case 'n':
        break;
      case 'r':
        break;
      case 'v':
        break;
      case 't':
        break;
    }
    return matchText;
  }
};

const defaultEqual = function(text, startIndex, node){
  let { value } = node;
  let index = 0;
  let matchText = null;
  while (index < value.length){
    if (text[startIndex + index] !== value[index]){
      break;
    }
    index++;
  }
  return matchText = index === value.length ? value : matchText;
};

module.exports = function(text, index, node, ...args){
  let equal = nodeEqual[node.type] || defaultEqual;
  return  equal(text, index, node, ...args);
};