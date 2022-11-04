const {
  BOUNDARY,
  GROUPID,
  ASSERTIONS,
  CHARSET,
  PRESETSET,
  RANGECHARSET,
  LOGICOR,
  CHARS
} = require('./NodeType');

const nodeEqual = {
  [GROUPID] : (char, node, realValue) => {
    return  realValue !== undefined ? char === realValue : true;
  },
  
};

module.exports = function(char, node, ...args){
  let equal = nodeEqual[node.type];
  return equal ? equal(char, node, ...args) : char === node.value;
};