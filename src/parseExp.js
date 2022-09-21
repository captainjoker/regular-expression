const {
  isNumber,
  isABC,
  isBoundary,
  isCharSet
} = require('./meta');
const { TextNode, GroupNode, GroupIdNode, AssertionsNode, BoundaryNode, CharSetNode, RangeCharSetNode, PresetCharSetNode, QuantifierNode, LogicNode } = require('./expNode');


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
    expNodeList.push(CharSetNode(nextChar));
  } else {
    // 当成普通字符处理
    mkTextNodeIntoExpArr(nextChar, expNodeList);
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
  if (!lastNode.isMeta || lastNode.isGroup){
    return true;
  }
  if (lastNode.isQuantifier){
    lastNode.isLazy = true;
  }
  return false;
};

/**
 * 生成或者更新普通字符节点
 * @param {*} text 
 * @param {*} expNodeList 
 */
const mkTextNodeIntoExpArr = function(text, expNodeList){
  let lastNode = expNodeList[expNodeList.length - 1];
  if (lastNode && lastNode.isText){
    lastNode.text = `${lastNode.text}text`;
  } else {
    expNodeList.push(TextNode(text));
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

const parseRangeCharExp = function(expNodeList, preChar, nextChar){
  let lastNode = expNodeList[expNodeList.length - 1];
  let result = null;
  if (lastNode && lastNode.isText){
    //上一个节点为普通字符节点
    if ((isNumber(preChar) && isNumber(nextChar)) || (isABC(preChar) && isABC(preChar))){
      //两边类型相同
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
      }
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
  let stashExpNodeList = [];
  let i = 0;
  let status = INNORMAL;
  
  /**
   * 对expNodeList 和 stashExpNodeList 进行换位
   * @param {*} restoration 是否归位
   * @returns 返回更换前的expNodeList
   */
  const exchangeExpArr = function(restoration = false){
    let currentArr = expNodeList;
    if (restoration){
      let arr = stashExpNodeList;
      stashExpNodeList = [];
      expNodeList = arr;
    } else {
      stashExpNodeList = expNodeList;
      expNodeList = [];
    }
    return currentArr;
  };

  while (exp[i]){
    let currentChar = exp[i];
    let nextChar = exp[i + 1];
    let preChar = exp[i - 1];
    if (status === INCHARACTERSET && !([ ']', '\\', '-' ].includes(currentChar))){
      mkTextNodeIntoExpArr(currentChar, expNodeList);
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
        status = INCHARACTERSET;
        expNodeList.push(CharSetNode(nextChar === '^'));
        exchangeExpArr();
        break;
      case ']':
        // 当处于 INCHARACTERSET 状态时，直接闭合该状态
        // 否则当作普通字符处理
        if (status === INCHARACTERSET){
          status = INNORMAL;
          stashExpNodeList[stashExpNodeList.length - 1].value = expNodeList;
          exchangeExpArr(true);
        } else {
          mkTextNodeIntoExpArr(currentChar, expNodeList);
        }
        break;
      case '-':
        // 在状态为字符集时判断是否作为范围处理
        // 两边都为数字或者两边都为字母 = 类型相同
        // 类型相同且都是从小到大，则为范围
        // 两边类型相同但是不是从小到大，则认定为表达式不合法
        // 两边为空或者一边为空，则当作普通字符处理
        if (status === INCHARACTERSET){
          let result = parseRangeCharExp();
          result && expNodeList.push(RangeCharSetNode(result.min, result.max));
        } else {
          mkTextNodeIntoExpArr(currentChar, expNodeList);
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
        if (TokenQIsQuantifier(expNodeList, preChar, nextChar)){
          expNodeList.push(QuantifierNode(0, 1));
        }
        break;
      case '{':
        // 判断该”{“是否量词节点开头
        // 是量词节点时生成一个量词节点
        // 不是的时候当作普通字符处理
        if (isQuantifierExp(exp, i)){
          status = INQUANTIFIER;
          exchangeExpArr();
        } else {
          mkTextNodeIntoExpArr(currentChar, expNodeList);
        }
        break;
      case '}':
        // 处于量词节点时，闭合
        // 不是的时候当作普通字符处理
        if (status === INQUANTIFIER){
          let { min, max } = parseQuantifierExp(expNodeList[0].value);
          exchangeExpArr(true);
          expNodeList.push(QuantifierNode(min, max));
          status = INNORMAL;
        } else {
          mkTextNodeIntoExpArr(currentChar, expNodeList);
        }
        break;
      case '.':
        // 生成预置节点
        expNodeList.push(PresetCharSetNode(currentChar));
        break;
      case '|':
        // 生成逻辑或节点
        expNodeList.push(LogicNode(true));
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
      case '(':
        status = INGROUP;
        status = INASSERT;
        expNodeList.push(GroupNode());
        exchangeExpArr();
        break;
      case ')':
        stashExpNodeList[stashExpNodeList.length - 1].value = expNodeList;
        exchangeExpArr(true);
        status = INNORMAL;
        break;
      default:
        mkTextNodeIntoExpArr(currentChar, expNodeList);
        break;
    }
    i++;
  }
  if (expNodeList.length && stashExpNodeList.length){
    throw Error(`[${exp}]不是一个合法的正则表达式！`);
  }
  return expNodeList;
};

module.exports = parseExp;