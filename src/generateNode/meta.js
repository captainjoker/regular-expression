const {
  DescribeChars,
  BoundaryChars,
  CharSetChars
} = require('../DescribeChar');

const isMeta = function(char){
  let charIsDesc = isDescribe(char);
  return charIsDesc;
};
const isDescribe = function(char){
  return DescribeChars[char] !== undefined;
};

const isNumber = function(char){
  let asciiCode = char.charCodeAt();
  return asciiCode <= 57 && asciiCode >= 48;
};

const isABC = function(char){
  let asciiCode = char.charCodeAt();
  return (asciiCode <= 90 && asciiCode >= 65) || (asciiCode <= 122 && asciiCode >= 97);
};

const isBoundary = function(char){
  return BoundaryChars.includes(char);
};

const isCharSet = function(char){
  return CharSetChars.includes(char);
};

const isWordChar = function(char){
  return isABC(char) || isNumber(char) || char === '_';
};

const isSpace = function(char){
  let unicode = char.charCodeAt();
  // [ \f\n\r\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]
  return (unicode >= 9 && unicode <= 13) || (unicode >= 8192 && unicode <= 8202) || [ 32, 160, 5760, 6158, 8232, 8233, 8239, 8287, 12288, 65279 ].includes(unicode);
};

module.exports = {
  isMeta,
  isDescribe,
  isNumber,
  isABC,
  isBoundary,
  isCharSet,
  isWordChar,
  isSpace
};