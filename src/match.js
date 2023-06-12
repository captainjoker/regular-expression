const {
  // QUANTIFIER,
  BOUNDARY,
  GROUPID,
  GROUP,
  ASSERTIONS,
  CHARSET,
  PRESETSET,
  // RANGECHARSET,
  LOGICOR,
  CHARS
} = require('./generateNode/NodeType');
const equal = require('./generateNode/equal');

module.exports = class MatchHelper{
  constructor(expNodeList, groupNum, text){
    this.originExpNodeList = expNodeList;
    this.expNodeList = expNodeList; //表达式节点
    this.groupNum = groupNum; //表达式节点
    this.text = text; //匹配目标字符串
    this.setDefault();
  }
  setDefault(){
    this.groups = Array(this.groupNum).fill(); //分组信息
    this.expNodeList = this.originExpNodeList;
    this.expNodeIndex = 0; //节点下标
    this.textIndex = 0; //目标字符串下标
    this.safePoints = []; //执行安全点栈
    this.envStacks = []; //变量对象栈
    this.groupTimes = 0; //匹配分组次数
    this.groupQuantifierNode = null; //分组量词节点
    this.charTimes = 0; //字符匹配次数
    this.matchedText = ''; //已匹配字符
    this.groupTextLength = 0; // 记录分组有贪婪数量节点时，最后一次匹配节点的 matchedText 开始下标，以此来获取存入group的值
    this.matched = true; // 匹配成功标志
    this.needMatch = false; //节点是否需要匹配，用于非贪婪节点标志
    this.assertIndex = -1; //断言在stack的位置,当检测到不符合时，定位到断言位置
  }
  exec(){
    let result = null;
    let index = 0;
    while (this.text.length > index){
      result = this.run();
      if (result){
        break;
      }
      index++;
      this.setDefault();
      this.textIndex = index;
    }
    return result;
  }
  run(){
    while (this.expNodeIndex < this.expNodeList.length){ 
      let node = this.expNodeList[this.expNodeIndex];
      // let { quantifierNode  } = node;
      switch (node.type){
        case CHARS:
          this.handlerChar(node);
          break;
        case BOUNDARY:
          this.handlerChar(node);
          break;
        case GROUPID:
          this.handlerChar(node);
          break;
        case GROUP:
          this.startGroup(node);
          break;
        case ASSERTIONS:
          this.startGroup(node);
          break;
        case CHARSET:
          this.handlerChar(node);
          break;
        case PRESETSET:
          this.handlerChar(node);
          break;
        /* case RANGECHARSET:
          this.handlerChar(node);
          break; */
        case LOGICOR:
          this.handlerLogicOr(node);
          break;
      }
      if (!this.matched){
        break;
      }
      while (this.expNodeIndex >= this.expNodeList.length && this.envStacks.length){
        this.endGroup(this.groupQuantifierNode);
      }
    }
  
    return  this.matched ? [ this.matchedText, ...this.groups ] : null;
  }
  setStacks({
    groupId, isCatch, isNone, isPositive, type
  }){
    this.envStacks.push({
      expNodeList : this.expNodeList,
      expNodeIndex : this.expNodeIndex,
      groupTimes : this.groupTimes,
      groupQuantifierNode : this.groupQuantifierNode,
      matchedText : this.matchedText,
      groupTextLength : this.groupTextLength,
      assertIndex : this.assertIndex,
      textIndex : this.textIndex,
      groupId, isCatch, isNone, isPositive, type
    });
      
  }
  endStack(stackIndex, isMatch = true){
    if (this.envStacks.length){
      let groupQuantifierNode = this.groupQuantifierNode;
      if (stackIndex){
        this.envStacks = this.envStacks.slice(0, stackIndex + 1);
      }
      let stack  = this.envStacks.pop();
      this.expNodeList = stack.expNodeList;
      this.expNodeIndex = stack.expNodeIndex;
      this.groupTimes = stack.groupTimes;
      this.groupQuantifierNode = stack.groupQuantifierNode;
      this.assertIndex = stack.assertIndex;
      if (stack.groupId && stack.isCatch){
        let { isLazy = false } = groupQuantifierNode || {};
        if (isLazy){
          this.groups[stack.groupId - 1] = this.matchedText;
        } else {
          this.groups[stack.groupId - 1] = this.matchedText.substring(this.groupTextLength);
        }
      } 
      this.groupTextLength = stack.groupTextLength;
      if (stack.type === ASSERTIONS){
        if ((stack.isNone && isMatch) || (!stack.isNone && !isMatch)){
          this.backSafePoint();
        } else {
          this.matchedText = stack.matchedText;
          this.textIndex = stack.textIndex;
        }
      } else {
        this.matchedText = stack.matchedText + this.matchedText;
      }
    }
  }
  setSafePoint(options = {}){
    this.safePoints.push({
      envStacks : this.envStacks.slice(),
      groups : this.groups.slice(),
      groupTimes : this.groupTimes,
      groupTextLength : this.groupTextLength,
      expNodeIndex : this.expNodeIndex,
      matchedText : this.matchedText,
      charTimes : this.charTimes,
      textIndex : this.textIndex,
      expNodeList : this.expNodeList,
      // needMatch : needMatch,
      ...options
    });
  }
  backSafePoint(){
    if (!this.safePoints.length){
      if (this.assertIndex === -1){
        this.matched = false;
      } else {
        let stack = this.envStacks[this.assertIndex];
        if (stack.isNone === true){
          this.endStack(this.assertIndex, false);
          this.expNodeIndex++;
        } else {
          this.matched = false;
        }
      }
    } else {
      let safePoint = this.safePoints.pop();
      this.envStacks = safePoint.envStacks;
      this.expNodeList = safePoint.expNodeList;
      this.expNodeIndex = safePoint.expNodeIndex;
      this.textIndex = safePoint.textIndex;
      this.groups = safePoint.groups;
      this.groupTimes = safePoint.groupTimes;
      this.groupTextLength = safePoint.groupTextLength;
      this.matchedText = safePoint.matchedText;
      this.charTimes = safePoint.charTimes;
      this.needMatch = safePoint.needMatch;
    }
  }
  matchChars(node, successCallback, failCallback){
    let matchText = this.compareChars(this.text, this.textIndex, node);    
    if (matchText !== null){
      // 匹配成功，不推入安全点，直接下次循环处理
      this.charTimes++;
      this.matchedText += matchText;
      this.textIndex += matchText.length;
      successCallback && successCallback();
    } else {
      failCallback ? failCallback() : this.backSafePoint();
      // 匹配失败，回到上次节点
    }
  }
  compareChars(text, startIndex, node){
    let { value, type } = node;
    let index = 0;
    let matchText = null;
    switch (type){
      case CHARS:
        while (index < value.length){
          if (text[startIndex + index] !== value[index]){
            break;
          }
          index++;
        }
        matchText = index === value.length ? value : matchText;
        break;
      case GROUPID:
        matchText = equal(text, startIndex, node, value <= this.groups.length ? this.groups[value - 1] || '' : undefined);
        break;
      default:
        matchText = equal(text, startIndex, node);
        break;
    }
   
    return matchText;
  }
  handlerChar(node){
    let { quantifierNode } = node;
    if (quantifierNode){
      let { min, max, isLazy } = quantifierNode;
      if (isLazy){
        // 非贪婪节点
        if (this.charTimes === max){
          // 达到最大次数时，开启下一个节点匹配
          this.expNodeIndex++;
          this.charTimes = 0;
        } else if (this.charTimes >= min){
          // 达到最小次数是，判断是否需要匹配，第一次不匹配，直接推入安全点，第二次执行时开始匹配
          if (this.needMatch){
            //需要匹配
            this.needMatch = false;
            this.matchChars(node);
          } else {
            //推入安全点，匹配下一个节点
            this.setSafePoint({
              needMatch : true
            });
            this.charTimes = 0;
            this.expNodeIndex++;
          }
        } else {
          //未达到次数直接匹配
          this.matchChars(node);
        }
      } else {
        this.matchChars(node, () => {
          if (this.charTimes === max){
            // 达到最大次数时，开始匹配下一个节点匹配
            this.expNodeIndex++;
            this.charTimes = 0;
          } else if (this.charTimes >= min){
            // 达到最低次数时，先存入安全点
            this.setSafePoint({
              expNodeIndex : this.expNodeIndex + 1,
              charTimes : 0
            });
          }
        }, () => {
          if (this.charTimes === 0 && min === 0){
            this.expNodeIndex++;
          } else {
            this.backSafePoint();
          }
        });
      }
    } else {
      this.matchChars(node, () => {
        this.expNodeIndex++;
        this.charTimes = 0;
      });
    }
  }
  startGroup(node){
    let { quantifierNode } = node;
    if (quantifierNode){
      let { min, max, isLazy } = quantifierNode;
      if (isLazy){
        if (this.groupTimes === max){
          this.endStack();
          this.expNodeIndex++;
        } else if (this.groupTimes >= min){
          if (this.needMatch){
            //需要匹配
            this.needMatch = false;
            this.matchGroup(node);
          } else {
            //推入安全点，匹配下一个节点
            this.setSafePoint({
              needMatch : true,
              groupTimes : 0
            });
            this.expNodeIndex++;
          }
        } else {
          this.matchGroup(node);
        }
      } else {
        this.matchGroup(node);
      }
    } else {
      this.matchGroup(node);
    }
  }
  endGroup(quantifierNode){
    if (quantifierNode){
      let { min, max, isLazy } = quantifierNode;
      this.groupTimes++;
      if (isLazy){
        if (this.groupTimes < min){
          // group匹配结束时，未达到最低次数，再次匹配该组
          this.expNodeIndex = 0;
        } else {
          // 达到最低次数后，直接开始下一个节点的匹配
          this.endStack();
          this.expNodeIndex++;
        }
      } else {
        if (this.groupTimes === max){
          // 达到最大次数时，开始匹配下一个节点匹配
          this.endStack();
          this.expNodeIndex++;
        } else if (this.groupTimes >= min){
          // this.endStack();
          // 达到最低次数时，先存入安全点
          this.setSafePoint({
            expNodeIndex : this.expNodeIndex + 1
          });
          this.groupTextLength = this.matchedText.length;
          this.expNodeIndex = 0;
        } else {
          // group匹配结束时，未达到最低次数，再次匹配该组
          this.expNodeIndex = 0;
        }
      }
    } else {
      this.endStack();
      this.expNodeIndex++;
    }
  }
  matchGroup(node){
    let { quantifierNode, value, groupId, isCatch, isNone, isPositive, type } = node;
    this.setStacks({ groupId, isCatch, isNone, isPositive, type });
    if (type === ASSERTIONS){
      this.assertIndex = this.envStacks.length - 1;
    }
    this.groupTimes = 0;
    this.groupQuantifierNode = quantifierNode;
    this.expNodeList = value;
    this.expNodeIndex = 0;
    this.matchedText = '';
    this.groupTextLength = 0;
    // this.groups = [];
  }

  handlerLogicOr(node){
    this.setSafePoint({
      expNodeList : node.right
    });
    this.expNodeList = node.left;
    this.expNodeIndex = 0;


  }
  
};
