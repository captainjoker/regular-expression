const {
  DescribeChars,
  BoundaryChars,
  CharSetChars
} = require('./describeChar');

const isMeta = function(char){
  let charIsDesc = isDescribe(char);
  return charIsDesc;
};
const isDescribe = function(char){
  return DescribeChars[char] !== undefined;
};

const isNumber = function(str){
  let asciiCode = str.charCodeAt();
  return asciiCode <= 57 && asciiCode >= 48;
};

const isABC = function(str){
  let asciiCode = str.charCodeAt();
  return (asciiCode <= 90 && asciiCode >= 65) || (asciiCode <= 122 && asciiCode >= 97);
};

const isBoundary = function(str){
  return BoundaryChars.includes(str);
};

const isCharSet = function(str){
  return CharSetChars.includes(str);
};

module.exports = {
  isMeta,
  isDescribe,
  isNumber,
  isABC,
  isBoundary,
  isCharSet
};