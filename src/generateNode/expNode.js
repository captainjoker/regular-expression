const {
  QUANTIFIER,
  BOUNDARY,
  GROUPID,
  GROUP,
  ASSERTIONS,
  CHARSET,
  PRESETSET,
  RANGECHARSET,
  LOGICOR,
  CHARS
} = require('./NodeType');
/**
 * 
 * @param {*} props 
 * @returns 返回节点
 */
function NodeInterface(props){
  return Object.assign(Object.create(null), {
    meta : true,
    type : '',
    value : '',
    ...props
  });
}

/**
 * 
 * @param {*} min 最小次数
 * @param {*} max 最大次数
 * @param {*} isLazy 是否非贪婪
 * @returns 字符次数节点
 */
const QuantifierNode = function(min = 0, max = -1, isLazy = false){
  return NodeInterface({
    type : QUANTIFIER,
    isLazy,
    min, 
    max
  });
};

/**
 * 
 * @param {*} value 
 * @returns 边界节点
 */
const BoundaryNode = function(value){
  return NodeInterface({
    type : BOUNDARY,
    value
  });
};

/**
 * 
 * @param {*} value 
 * @returns 分组id节点 
 */
const GroupIdNode = function(value, quantifierNode = null){
  return  NodeInterface({
    type : GROUPID,
    value,
    quantifierNode
  });
};

/**
 * 
 * @param {*} groupId 分组号
 * @param {*} isCatch 是否捕获
 * @param {*} value 
 * @returns 分组节点
 */
const GroupNode = function(groupId = 1, isCatch = true, value = [], quantifierNode = null){
  return NodeInterface({
    type : GROUP,
    isCatch,
    groupId,
    value,
    quantifierNode
  });
};

/**
 * 
 * @param {*} value 
 * @param {*} isNone 是否不等于
 * @param {*} isPositive 是否正向
 * @returns 断言节点
 */
const AssertionsNode = function(value = [], isNone = false, isPositive = true){
  return NodeInterface({
    type : ASSERTIONS,
    isNone,
    isPositive,
    value
  });
};

/**
 * 
 * @param {*} value 
 * @param {*} isNone 是否非
 * @returns 字符集节点
 */
const CharSetNode = function(value = [], isNone = false, quantifierNode = null){
  return NodeInterface({
    type : CHARSET,
    isNone,
    value,
    quantifierNode
  });
};

/**
 * 
 * @param {*} min
 * @param {*} max
 * @returns 范围字符集节点
 */
const RangeCharSetNode  = function(min = -1, max = -1){
  return NodeInterface({
    type : RANGECHARSET,
    min, max
  });
};

/**
 * 
 * @param {*} value 
 * @returns 预定义字符集节点
 */
const PresetCharSetNode = function(value = '', quantifierNode = null){
  return NodeInterface({
    type : PRESETSET,
    value,
    quantifierNode,
  });
};

/**
 * 
 * @param {*} left 左节点
 * @param {*} right 右节点
 * @returns 逻辑节点
 */
const LogicOrNode = function(left = [], right = []){
  return NodeInterface({
    type : LOGICOR,
    left,
    right
  });
};

/**
 * 
 * @param {*} text 
 * @returns 普通字符
 */
const CharsNode = function(value, quantifierNode = null){
  return NodeInterface({
    meta : false,
    type : CHARS,
    value,
    quantifierNode
  });
};

/**
 * 
 * @param {*} node 
 * @param {*} type 
 * @returns node是否type类型
 */
const isNodeType = function(node, type){
  return node?.type === type;
};

/**
 * 
 * @param {*} node 
 * @param {*} types 
 * @returns node是否属于指定类型
 */
const inNodeTypes = function(node, types = []){
  return types.includes(node?.type);
};

/**
 * 
 * @param {*} node 
 * @returns 获取node下面的数量节点
 */
const getQuantifierNodeInNode = function(node){
  return node?.quantifierNode; 
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
  LogicOrNode,
  CharsNode,
  isNodeType,
  inNodeTypes,
  getQuantifierNodeInNode
};