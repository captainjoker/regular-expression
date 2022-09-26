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
 * @param {*} min 
 * @param {*} max 
 * @returns 字符次数节点
 */
const QuantifierNode = function(min = 0, max = -1, isLazy = false){
  return NodeInterface({
    type : 'quantifier',
    isLazy,
    min, 
    max
  });
};

/**
 * 
 * @param {*} text 
 * @returns 边界节点
 */
const BoundaryNode = function(value){
  return NodeInterface({
    type : 'boundary',
    value
  });
};

/**
 * 
 * @param {*} value 
 * @returns 分组id节点 
 */
const GroupIdNode = function(value){
  return  NodeInterface({
    type : 'groupId',
    value
  });
};

/**
 * 
 * @param {*} groupId 分组号
 * @returns 分组节点
 */
const GroupNode = function(groupId = 1, isCatch = true, value = []){
  return NodeInterface({
    type : 'group',
    isCatch,
    groupId,
    value
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
    type : 'assertions',
    isNone,
    isPositive,
    value
  });
};

/**
 * 
 * @param {*} text 
 * @returns 字符集节点
 */
const CharSetNode = function(value = [], isNone = false){
  return NodeInterface({
    type : 'charSet',
    isNone,
    value 
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
    type : 'rangeCharSet',
    min, max
  });
};

/**
 * 
 * @param {*} text 
 * @returns 预定义字符集节点
 */
const PresetCharSetNode = function(value = ''){
  return NodeInterface({
    type : 'presetSet',
    value
  });
};

/**
 * 
 * @param {*} isOr 是否 或
 * @returns 逻辑节点
 */
const LogicOrNode = function(left = [], right = []){
  return NodeInterface({
    type : 'logicOr',
    left,
    right,
  });
};

/**
 * 
 * @param {*} text 
 * @returns 普通字符
 */
const CharsNode = function(value){
  return NodeInterface({
    meta : false,
    type : 'text',
    value
  });
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
  CharsNode
};