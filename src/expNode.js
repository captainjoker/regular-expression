/**
 * 
 * @param {*} min 
 * @param {*} max 
 * @returns 字符次数节点
 */
const QuantifierNode = function(min = 0, max = -1, isLazy = false){
  return {
    isMeta : true,
    isQuantifier : true,
    isLazy,
    min, 
    max
  };
};

/**
 * 
 * @param {*} text 
 * @returns 边界节点
 */
const BoundaryNode = function(value){
  return {
    isMeta : true,
    isBoundary : true,
    value
  };
};

/**
 * 
 * @param {*} value 
 * @returns 分组id节点 
 */
const GroupIdNode = function(value){
  return {
    isMeta : true,
    isGroupId : true,
    value
  };
};

/**
 * 
 * @returns 分组节点
 */
const GroupNode = function(value = []){
  return {
    isMeta : true,
    isGroup : true,
    isCatch : true,
    value
  };
};

/**
 * 
 * @param {*} value 
 * @param {*} isNone 是否不等于
 * @param {*} isPositive 是否正向
 * @returns 断言节点
 */
const AssertionsNode = function(value = [], isNone = false, isPositive = true){
  return {
    isMeta : true,
    isAssert : true,
    isNone,
    isPositive,
    value
  };
};

/**
 * 
 * @param {*} text 
 * @returns 字符集节点
 */
const CharSetNode = function(isNone = false){
  return {
    isMeta : true,
    isCharSet : true,
    isNone,
    value : []
  };
};

/**
 * 
 * @param {*} min
 * @param {*} max
 * @returns 范围字符集节点
 */
const RangeCharSetNode  = function(min = -1, max = -1){
  return {
    isMeta : true,
    isRangeCharSet : true,
    min, max
  };
};

/**
 * 
 * @param {*} text 
 * @returns 预定义字符集节点
 */
const PresetCharSetNode = function(value){
  return {
    isMeta : true,
    isPresetSet : true,
    value
  };
};

/**
 * 
 * @param {*} isOr 是否 或
 * @returns 逻辑节点
 */
const LogicNode = function(isOr){
  return {
    isMeta : true,
    isLogic : true,
    isOr
  };
};

/**
 * 
 * @param {*} text 
 * @returns 普通字符
 */
const TextNode = function(value){
  return {
    isText : true,
    value
  };
};




module.exports = {
  QuantifierNode,
  CharSetNode,
  RangeCharSetNode,
  PresetCharSetNode,
  BoundaryNode,
  GroupNode,
  AssertionsNode,
  GroupIdNode,
  LogicNode,
  TextNode
};