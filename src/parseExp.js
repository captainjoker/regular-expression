const {
  isNumber,
  isBoundary,
  isCharSet
} = require('./meta');
const { CharsNode, GroupNode, GroupIdNode, AssertionsNode, BoundaryNode, CharSetNode, RangeCharSetNode, PresetCharSetNode, QuantifierNode, LogicOrNode } = require('./expNode');


const INNORMAL = 'INNORMAL';
const INQUANTIFIER = 'INQUANTIFIER';
const INGROUP = 'INGROUP';
const INASSERT = 'INASSERT';
const INCHARACTERSET = 'INCHARACTERSET';

/**
 * 对转义符 “\” 进行解析
 * @param {*} nextChar 表达式下一个字符
 * @param {*} expNodeList 表达式节点列表
 * @returns 表达式下标需要的偏移量
 */
const handlerEscapes = function(nextChar, expNodeList){
  let step = 1;
  if (isNumber(nextChar)){
    // 为数值时当成分组id处理，生成一个分组id节点
    // 还有其他情况
    // 还需要考虑在字符集内
    expNodeList.push(GroupIdNode(nextChar - 0));
  } else if (isBoundary(nextChar)){
    // 为边界节点时
    expNodeList.push(BoundaryNode(nextChar));
  } else if (isCharSet){
    // 为预置字符集时
    expNodeList.push(PresetCharSetNode(nextChar));
  } else {
    // 当成普通字符处理
    mkCharsNodeIntoExpNodeList(nextChar, expNodeList);
  }
  return step;
};

/**
 * 
 * @param {*} expNodeList 
 * @returns 返回？是否是量词节点
 */
const TokenQIsQuantifier = function(expNodeList){
  let lastNode = expNodeList[expNodeList.length - 1]; 
  if (!lastNode.meta || lastNode.type === 'group'){
    return true;
  }
  if (lastNode.type === 'quantifier'){
    lastNode.isLazy = true;
  }
  return false;
};

/**
 * 生成或者更新普通字符节点
 * @param {*} text 
 * @param {*} expNodeList 
 */
const mkCharsNodeIntoExpNodeList = function(text, expNodeList){
  let lastNode = expNodeList[expNodeList.length - 1];
  if (lastNode?.type === 'text'){
    lastNode.value = `${lastNode.value}${text}`;
  } else {
    expNodeList.push(CharsNode(text));
  }
};

/**
 * 判断比较宽松
 * @param {*} exp 
 * @param {*} index 
 * @returns 是否是量词节点表达式
 */
const isQuantifierExp = function(exp, index){
  let result = false;
  for (let i = index + 1; i < exp.length; i++){
    let value = exp[i];
    if (value === '}'){
      result = i !== index + 1;
      break;
    } else if (value === '{'){
      break;
    } else if (!isNumber(value) && value !== ','){
      break;
    }
  }
  return result;
};

/**
 * 判断token“(”是何种类型
 * @param {*} exp 
 * @param {*} index 
 * @returns -1:不捕获分组； 0: 分组； 1正向肯定断言； 2 正向否定断言； 3反向肯定断言； 4 反向否定断言；
 */
const handleGroupOrAssertExp = function(exp, index){
  let assertType = 0;
  let i = index + 1;
  if (exp[i] === '?'){
    i++;
    if (exp[i] === ':'){
      assertType = -1;
    } else {
      if (exp[i] === '<'){
        assertType = 2;
        i++;
      }
      if ('=' === exp[i]){
        assertType += 1;
      } else if ('!' === exp[i]){
        assertType += 2;
      } else {
        throw Error('正则表达式不合法！分组错误');
      }
    }
  }
  return assertType;
};


/**
 * ascii码后边大于前边的即视作合法
 * @param {*} expNodeList 
 * @param {*} preChar 
 * @param {*} nextChar 
 * @returns 
 */
const parseRangeCharExp = function(expNodeList, preChar, nextChar){
  let lastNode = expNodeList[expNodeList.length - 1];
  let result = null;
  if (lastNode?.type === 'text' & nextChar !== ']'){
    //上一个节点为普通字符节点
    let min = preChar.charCodeAt();
    let max = nextChar.charCodeAt();
    if (max >= min){
      result =  {
        min,
        max
      };
      if (lastNode.value.length === 1){
        expNodeList.pop();
      } else {
        lastNode.value = lastNode.value.substring(0, lastNode.value.length - 1);
      }
    } else {
      throw Error(`正则表达式不合法！字符范围错误`);
    }
  } 
  return result;
};

/**
 * 解析量词节点
 * @param {*} exp 
 * @returns 量词的数量集合
 */
const parseQuantifierExp = function(exp){
  let [ min, max ] = exp.split(',');
  return {
    min : min - 0,
    max : max ? max - 0 : -1
  };
};



const parseExp = function(exp){
  let expNodeList = [];
  let status = INNORMAL;
  let i = 0;
  let envStacks = [];
  let groupId = 0;
  /**
   * 设置当前环境变量值
   * @param {*} end 是否归位
   * @returns 返回更换前的expNodeList
   */
  const setStacks = function(end = false){
    let beforeNodeList = expNodeList;
    if (end){
      let stack = envStacks.pop();
      expNodeList = stack.expNodeList;
      status = stack.status;
    } else {
      envStacks.push({
        expNodeList,
        status
      });
      expNodeList = [];
      status = INNORMAL;
    }
    return beforeNodeList;
  };

  const getLastNodeInStack = function(){
    let lastNodeList = envStacks[envStacks.length - 1]?.expNodeList || [];
    return lastNodeList.length ? lastNodeList[lastNodeList.length - 1] : null;
  };

  while (exp[i]){
    let currentChar = exp[i];
    let nextChar = exp[i + 1];
    let preChar = exp[i - 1];
    if (status === INCHARACTERSET && !([ ']', '\\', '-' ].includes(currentChar))){
      mkCharsNodeIntoExpNodeList(currentChar, expNodeList);
      i++;
      continue;
    }
    switch (currentChar){
      case '\\': 
        i += handlerEscapes(nextChar, expNodeList);
        break;
      case '[':
        // 当存在[时，即认为开启字符集收集，如未闭合，则认定为表达式不合法
        // 若状态已经是在字符集中， 则当作普通字符处理
        expNodeList.push(CharSetNode([], nextChar === '^'));
        i += nextChar === '^' ? 1 : 0;
        setStacks();
        status = INCHARACTERSET;
        break;
      case ']':
        // 当处于 INCHARACTERSET 状态时，直接闭合该状态
        // 否则当作普通字符处理
        if (status === INCHARACTERSET){
          getLastNodeInStack().value = expNodeList;
          setStacks(true);
        } else {
          mkCharsNodeIntoExpNodeList(currentChar, expNodeList);
        }
        break;
      case '-':
        // 在状态为字符集时判断是否作为范围处理
        // ascii是从小到大，则为范围
        // 否则认定为表达式不合法
        // 两边为空或者一边为空，则当作普通字符处理
        if (status === INCHARACTERSET){
          let result = parseRangeCharExp(expNodeList, preChar, nextChar);
          result && expNodeList.push(RangeCharSetNode(result.min, result.max)) && i++;
        } else {
          mkCharsNodeIntoExpNodeList(currentChar, expNodeList);
        }
        break;
      case '*':
        // 生成量词节点
        expNodeList.push(QuantifierNode(0));
        break;
      case '+':
        // 生成量词节点
        expNodeList.push(QuantifierNode(1));
        break;
      case '?':
        // 当上一个节点为 量词节点时，将该量词节点置成非贪婪
        // 当不为量词节点时，本身生成一个新的量词节点
        if (TokenQIsQuantifier(expNodeList)){
          expNodeList.push(QuantifierNode(0, 1));
        }
        break;
      case '{':
        // 判断该”{“是否量词节点开头
        // 是量词节点时生成一个量词节点
        // 不是的时候当作普通字符处理
        if (isQuantifierExp(exp, i)){
          setStacks();
          status = INQUANTIFIER;
        } else {
          mkCharsNodeIntoExpNodeList(currentChar, expNodeList);
        }
        break;
      case '}':
        // 处于量词节点时，闭合
        // 不是的时候当作普通字符处理
        if (status === INQUANTIFIER){
          let { min, max } = parseQuantifierExp(expNodeList[0].value);
          setStacks(true);
          expNodeList.push(QuantifierNode(min, max));
        } else {
          mkCharsNodeIntoExpNodeList(currentChar, expNodeList);
        }
        break;
      case '.':
        // 生成预置节点
        expNodeList.push(PresetCharSetNode(currentChar));
        break;
      case '|':
        // 生成逻辑或节点
        expNodeList = [ LogicOrNode(expNodeList) ];
        setStacks();
        break;
      case '^':
        // 直接生成边界节点
        // 此处不需要考虑字符集状态
        expNodeList.push(BoundaryNode(currentChar));
        break;
      case '$':
        // 生成边界节点
        expNodeList.push(BoundaryNode(currentChar));
        break;
      case '(': {
        let assertType = handleGroupOrAssertExp(exp, i);
        let node = null;
        if (assertType > 0){
          node = AssertionsNode([], !(assertType % 2), assertType <= 2);
          i += assertType <= 2 ? 2 : 3;
        } else {
          let isCatch = assertType > -1;
          groupId += isCatch ? 1 : 0;
          node = GroupNode(isCatch ? groupId : -1, isCatch);
          i += isCatch ? 0 : 2;
        }
        expNodeList.push(node);
        setStacks();
        status = assertType > 0 ? INASSERT : INGROUP;
        break;
      }
      case ')':
        // 判断分组内是否存在逻辑或
        // 存在时将当前expNodeList 赋值 给逻辑或节点右手，再闭合逻辑或, expNodeList 指向逻辑或节点
        if (getLastNodeInStack()?.type === 'logicOr'){
          getLastNodeInStack().right = expNodeList;
          setStacks(true);
        }
        getLastNodeInStack().value = expNodeList;
        setStacks(true);
        break;
      default:
        mkCharsNodeIntoExpNodeList(currentChar, expNodeList);
        break;
    }
    i++;
  }
  if (getLastNodeInStack()?.type === 'logicOr'){
    getLastNodeInStack().right = expNodeList;
    setStacks(true);
  }
  if (!expNodeList.length || envStacks.length){
    throw Error(`[${exp}]不是一个合法的正则表达式！`);
  }
  return {
    expNodeList,
    groupNum : groupId
  };
};

parseExp('abc[^123]');

module.exports = parseExp;