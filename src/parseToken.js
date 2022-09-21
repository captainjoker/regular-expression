const {
  isDescribe
} = require('./meta');

const parseToken = function(exp){
  let tokenArr = [];
  let i = 0;
  let chars = [];
  while (exp[i]){
    let currentChar = exp[i];
    let nextChar = exp[i + 1];
    let isMeta = false;
    switch (currentChar){
      case '\\': 
        isMeta = isDescribe(exp[i + 1]);
        if (isMeta){
          tokenArr.push(`\\${exp[i + 1]}`);
          chars = clearChars(chars, tokenArr);
          i++; 
        } else {
          chars.push(currentChar);
        }
        break;
      
      case '[':
        chars = clearChars(chars, tokenArr);
        tokenArr.push(currentChar);
        break;
      case ']':
        chars = clearChars(chars, tokenArr);
        tokenArr.push(currentChar);
        break;
      case '*':
        chars = clearChars(chars, tokenArr);
        if (nextChar === '?'){
          tokenArr.push(`${currentChar}?`);
          i++;
        } else {
          tokenArr.push(currentChar);
        }
        break;
      case '+':
        chars = clearChars(chars, tokenArr);
        tokenArr.push(currentChar);
        break;
      case '?':
        chars = clearChars(chars, tokenArr);
        tokenArr.push(currentChar);
        break;
      case '{':
        chars = clearChars(chars, tokenArr);
        tokenArr.push(currentChar);
        break;
      case '}':
        chars = clearChars(chars, tokenArr);
        tokenArr.push(currentChar);
        break;
      case '.':
        chars = clearChars(chars, tokenArr);
        tokenArr.push(currentChar);
        break;
      case '|':
        chars = clearChars(chars, tokenArr);
        tokenArr.push(currentChar);
        break;
      case '^':
        chars = clearChars(chars, tokenArr);
        tokenArr.push(currentChar);
        break;
      case '$':
        chars = clearChars(chars, tokenArr);
        tokenArr.push(currentChar);
        break;
      case '(':
        chars = clearChars(chars, tokenArr);
        tokenArr.push(currentChar);
        break;
      case ')':
        chars = clearChars(chars, tokenArr);
        tokenArr.push(currentChar);
        break;
      default:
        chars.push(currentChar);
        break;
    }
  }
  return tokenArr;
};

const clearChars = function(chars, tokenArr){
  if (chars.length){
    tokenArr.push(chars.join(''));
    return [];
  }
  return chars;
};

module.exports = parseToken;