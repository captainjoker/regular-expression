const {
  BOUNDARY,
  GROUPID,
  // ASSERTIONS,
  CHARSET,
  PRESETSET,
  RANGECHARSET,
  // LOGICOR,
  CHARS
} = require('./NodeType');

const { 
  isWordChar,
  isNumber,
  // isABC,
  isSpace
} = require('./meta');

const doReverse = function(result, reverse = false){
  return reverse ? !result : result;
};

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
    let reverse = false;
    switch (value){
      case '^':
        matchText = index === 0 ? '' : null;
        break;
      case '$':
        matchText = index === text.length ? '' : null; 
        break;
      case 'b':
        reverse = true;
        // break omitted
      case 'B':
        matchText = doReverse(index === 0 || index === text.length || !isWordChar(char), reverse) ? null : '';
        break;
    }
    return matchText;
  },
  [PRESETSET] : (text, index, node) => {
    let { value } = node;
    let matchText = null;
    let char = text[index];
    if (char !== undefined){
      let reverse = false;
      let unicode = char.charCodeAt();
      switch (value){
        case 'D':
          reverse  = true;
          // break omitted
        case 'd':
          matchText = doReverse(isNumber(char), reverse) ? char : null;
          break;
        case 'S':
          reverse  = true;
          // break omitted;
        case 's':
          matchText = doReverse(isSpace(char), reverse)  ? char : null;
          break;
        case 'W':
          reverse  = true;
          // break omitted;
        case 'w':
          matchText = doReverse(isWordChar(char), reverse)  ? char : null;
          break;
        case 'f':
          matchText = unicode === 12 ? char : null; 
          break;
        case 'n':
          matchText = unicode === 10 ? char : null; 
          break;
        case 'r':
          matchText = unicode === 13 ? char : null; 
          break;
        case 'v':
          matchText = unicode === 11 ? char : null; 
          break;
        case 't':
          matchText = unicode === 9 ? char : null; 
          break;
      }
    } 
    return matchText;
  },
  [CHARSET] : (text, index, node) => {
    let char = text[index];
    let matchText = null;
    if (char !== undefined){
      let asciiCode = char.charCodeAt();
      let { value } = node;
      for (let i = 0; i < value.length; i++){
        let curNode  = value[i];
        let matched = false;
        switch (curNode.type){
          case RANGECHARSET: {
            matched = inRangeCharSet(asciiCode, curNode);
            break;
          }
          case CHARS: {
            matched = inChars(char, curNode);
            break;
          }
        }
        if (matched){
          matchText = char;
          break;
        }
      }
    }
    return matchText;
  }
};

const inRangeCharSet = function(asciiCode, node){
  let {
    min, max
  } = node;
  let isMatch = false;
  if (asciiCode >= min && asciiCode <= max){
    isMatch = true;
  }
  return isMatch;
};

const inChars = function(char, node){
  let { value } = node;
  let index = 0;
  let isMatch = false;
  while (index < value.length){
    if (value[index] === char){
      isMatch = true;
      break;
    }
    index++;
  }
  return isMatch;
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

module.exports = function Equal(text, index, node, ...args){
  let equal = nodeEqual[node.type] || defaultEqual;
  return  equal(text, index, node, ...args);
};