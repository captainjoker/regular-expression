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

module.exports = {
  isMeta,
  isDescribe,
  isNumber,
  isABC,
  isBoundary,
  isCharSet,
  isWordChar
};