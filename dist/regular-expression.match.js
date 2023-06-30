!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("RegularExpression",[],t):"object"==typeof exports?exports.RegularExpression=t():e.RegularExpression=t()}(self,(()=>{return e={789:e=>{e.exports={BoundaryChars:["b","B","A","Z","z"],CharSetChars:["d","D","f","n","r","s","S","t","v","w","W"]}},490:e=>{class t extends Error{constructor(...e){super(...e)}setErrorMsg(e){this.message=e}getErrorMsg(){return this.message}}e.exports=t},685:e=>{e.exports={QUANTIFIER:"QUANTIFIER",BOUNDARY:"BOUNDARY",GROUPID:"GROUPID",GROUP:"GROUP",ASSERTIONS:"ASSERTIONS",CHARSET:"CHARSET",PRESETSET:"PRESETSET",RANGECHARSET:"RANGECHARSET",LOGICOR:"LOGICOR",CHARS:"CHARS"}},595:(e,t,s)=>{const{BOUNDARY:i,GROUPID:n,CHARSET:r,PRESETSET:h,RANGECHARSET:o,CHARS:a}=s(685),{isWordChar:u,isNumber:d,isSpace:c}=s(19),l=function(e,t=!1){return t?!e:e},p={[n]:(e,t,s,i)=>{let n=null;if(void 0!==i){let s=0;for(;s<i.length&&e[t+s]===i[s];s++);n=s===i.length?i:n}else""===i&&(n="");return n},[i]:(e,t,s)=>{let{value:i}=s,n=null,r=e[t],h=!1;switch(i){case"^":n=0===t?"":null;break;case"$":n=t===e.length?"":null;break;case"b":h=!0;case"B":n=l(0===t||t===e.length||!u(r),h)?null:""}return n},[h]:(e,t,s)=>{let{value:i}=s,n=null,r=e[t];if(void 0!==r){let e=!1,t=r.charCodeAt();switch(i){case"D":e=!0;case"d":n=l(d(r),e)?r:null;break;case"S":e=!0;case"s":n=l(c(r),e)?r:null;break;case"W":e=!0;case"w":n=l(u(r),e)?r:null;break;case"f":n=12===t?r:null;break;case"n":n=10===t?r:null;break;case"r":n=13===t?r:null;break;case"v":n=11===t?r:null;break;case"t":n=9===t?r:null}}return n},[r]:(e,t,s)=>{let i=e[t],n=null;if(void 0!==i){let e=i.charCodeAt(),{value:t}=s;for(let s=0;s<t.length;s++){let r=t[s],h=!1;switch(r.type){case o:h=x(e,r);break;case a:h=N(i,r)}if(h){n=i;break}}}return n}},x=function(e,t){let{min:s,max:i}=t,n=!1;return e>=s&&e<=i&&(n=!0),n},N=function(e,t){let{value:s}=t,i=0,n=!1;for(;i<s.length;){if(s[i]===e){n=!0;break}i++}return n},f=function(e,t,s){let{value:i}=s,n=0;for(;n<i.length&&e[t+n]===i[n];)n++;return n===i.length?i:null};e.exports=function(e,t,s,...i){return(p[s.type]||f)(e,t,s,...i)}},267:(e,t,s)=>{const{QUANTIFIER:i,BOUNDARY:n,GROUPID:r,GROUP:h,ASSERTIONS:o,CHARSET:a,PRESETSET:u,RANGECHARSET:d,LOGICOR:c,CHARS:l}=s(685);function p(e){return Object.assign(Object.create(null),{meta:!0,type:"",value:"",...e})}e.exports={QuantifierNode:function(e=0,t=-1,s=!1){return p({type:i,isLazy:s,min:e,max:t})},CharSetNode:function(e=[],t=!1,s=null){return p({type:a,isNone:t,value:e,quantifierNode:s})},RangeCharSetNode:function(e=-1,t=-1){return p({type:d,min:e,max:t})},PresetCharSetNode:function(e="",t=null){return p({type:u,value:e,quantifierNode:t})},BoundaryNode:function(e){return p({type:n,value:e})},GroupNode:function(e=1,t=!0,s=[],i=null){return p({type:h,isCatch:t,groupId:e,value:s,quantifierNode:i})},AssertionsNode:function(e=[],t=!1,s=!0){return p({type:o,isNone:t,isPositive:s,value:e})},GroupIdNode:function(e,t=null){return p({type:r,value:e,quantifierNode:t})},LogicOrNode:function(e=[],t=[]){return p({type:c,left:e,right:t})},CharsNode:function(e,t=null){return p({meta:!1,type:l,value:e,quantifierNode:t})},isNodeType:function(e,t){return e?.type===t},inNodeTypes:function(e,t=[]){return t.includes(e?.type)},getQuantifierNodeInNode:function(e){return e?.quantifierNode}}},478:(e,t,s)=>{const{isNumber:i,isBoundary:n,isCharSet:r}=s(19),{isNodeType:h,inNodeTypes:o,getQuantifierNodeInNode:a,CharsNode:u,GroupNode:d,GroupIdNode:c,AssertionsNode:l,BoundaryNode:p,CharSetNode:x,RangeCharSetNode:N,PresetCharSetNode:f,QuantifierNode:g,LogicOrNode:m}=s(267),T=s(490),{GROUPID:I,GROUP:S,CHARSET:C,PRESETSET:R,LOGICOR:k,CHARS:v}=s(685),b="INNORMAL",E="INQUANTIFIER",L="INCHARACTERSET",A=function(e,t){return i(e)?t.push(c(e-0)):n(e)?t.push(p(e)):r(e)?t.push(f(e)):O(e,t),1},y=function(e){let t=e[e.length-1],s=!0,i=a(t);return i&&(i.isLazy=!0,s=!1),s},P=function(e,t){let s=t[t.length-1];if(s&&!o(s,[S,I,C,R,k,v]))throw new T("没有可重复的字符！");if(h(s,v)){let e=s.value.length;if(1!==e){let i=s.value[e-1];s.value=s.value.substring(0,e-1),s=u(i),t.push(s)}}s.quantifierNode=e},O=function(e,t){let s=t[t.length-1];h(s,v)&&!a(s)?s.value=`${s.value}${e}`:t.push(u(e))},G=function(e,t){let s=!1;for(let n=t+1;n<e.length;n++){let r=e[n];if("}"===r){s=n!==t+1;break}if("{"===r)break;if(!i(r)&&","!==r)break}return s},U=function(e,t){let s=0,i=t+1;if("?"===e[i])if(i++,":"===e[i])s=-1;else if("<"===e[i]&&(s=2,i++),"="===e[i])s+=1;else{if("!"!==e[i])throw new T(`表达式下标${t}位置“(?${e[i]}”不是一个正确的分组或者断言！`);s+=2}return s},w=function(e,t,s){let i=e[e.length-1],n=null;if(h(i,v)&"]"!==s){let r=t.charCodeAt(),h=s.charCodeAt();if(!(h>=r))throw new T("字符范围错误！");n={min:r,max:h},1===i.value.length?e.pop():i.value=i.value.substring(0,i.value.length-1)}return n},D=function(e){let[t,s]=e.split(",");return{min:t-0,max:s?s-0:-1}};e.exports=function(e){let t=[],s=b,i=0,n=[],r=0;const o=function(e=!1){let i=t;if(e){let e=n.pop();t=e.expNodeList,s=e.status}else n.push({expNodeList:t,status:s}),t=[],s=b;return i},a=function(){let e=n[n.length-1]?.expNodeList||[];return e.length?e[e.length-1]:null};try{for(;e[i];){let n=e[i],u=e[i+1],c=e[i-1];if(s!==L||["]","\\","-"].includes(n)){switch(n){case"\\":i+=A(u,t);break;case"[":t.push(x([],"^"===u)),i+="^"===u?1:0,o(),s=L;break;case"]":s===L?(a().value=t,o(!0)):O(n,t);break;case"-":if(s===L){let e=w(t,c,u);e&&t.push(N(e.min,e.max))&&i++}else O(n,t);break;case"*":P(g(0),t);break;case"+":P(g(1),t);break;case"?":y(t)&&P(g(0,1),t);break;case"{":G(e,i)?(o(),s=E):O(n,t);break;case"}":if(s===E){let{min:e,max:s}=D(t[0].value);o(!0),P(g(e,s),t)}else O(n,t);break;case".":t.push(f(n));break;case"|":t=[m(t)],o();break;case"^":case"$":t.push(p(n));break;case"(":{let n=U(e,i),h=null;if(n>0)h=l([],!(n%2),n<=2),i+=n<=2?2:3;else{let e=n>-1;r+=e?1:0,h=d(e?r:-1,e),i+=e?0:2}t.push(h),o(),s=n>0?"INASSERT":"INGROUP";break}case")":for(;h(a(),k);)a().right=t,o(!0);a().value=t,o(!0);break;default:O(n,t)}i++}else O(n,t),i++}}catch(t){if(t instanceof T){let s=t.getErrorMsg();t.setErrorMsg(`非法表达式：${e}:${s}`)}throw t}for(;h(a(),k);)a().right=t,o(!0);if(!t.length||n.length)throw new T(`${e}不是一个合法的正则表达式！`);return{expNodeList:t,groupNum:r}}},19:(e,t,s)=>{const{DescribeChars:i,BoundaryChars:n,CharSetChars:r}=s(789),h=function(e){return void 0!==i[e]},o=function(e){let t=e.charCodeAt();return t<=57&&t>=48},a=function(e){let t=e.charCodeAt();return t<=90&&t>=65||t<=122&&t>=97};e.exports={isMeta:function(e){return h(e)},isDescribe:h,isNumber:o,isABC:a,isBoundary:function(e){return n.includes(e)},isCharSet:function(e){return r.includes(e)},isWordChar:function(e){return a(e)||o(e)||"_"===e},isSpace:function(e){let t=e.charCodeAt();return t>=9&&t<=13||t>=8192&&t<=8202||[32,160,5760,6158,8232,8233,8239,8287,12288,65279].includes(t)}}},138:(e,t,s)=>{const i=s(478),n=s(214);e.exports=class{constructor(e,t){this.pattern=e,this.model=t;let{expNodeList:s,groupNum:n}=i(e);this.expNodeList=s,this.groupNum=n,this.lastIndex=0,this.lastItem=""}static generateNode(e){return i(e)}exec(e){return this.run(e)}run(e){let{expNodeList:t,groupNum:s}=this;return new n(t,s,e).exec()}}},214:(e,t,s)=>{const{BOUNDARY:i,GROUPID:n,GROUP:r,ASSERTIONS:h,CHARSET:o,PRESETSET:a,LOGICOR:u,CHARS:d}=s(685),c=s(595);e.exports=class{constructor(e,t,s){this.originExpNodeList=e,this.expNodeList=e,this.groupNum=t,this.text=s,this.setDefault()}setDefault(){this.groups=Array(this.groupNum).fill(),this.expNodeList=this.originExpNodeList,this.expNodeIndex=0,this.textIndex=0,this.safePoints=[],this.envStacks=[],this.groupTimes=0,this.groupQuantifierNode=null,this.charTimes=0,this.matchedText="",this.groupTextLength=0,this.matched=!0,this.needMatch=!1,this.assertIndex=-1}exec(){let e=null,t=0;for(;this.text.length>t&&(e=this.run(),!e);)t++,this.setDefault(),this.textIndex=t;return e}run(){for(;this.expNodeIndex<this.expNodeList.length;){let e=this.expNodeList[this.expNodeIndex];switch(e.type){case d:case i:case n:this.handlerChar(e);break;case r:case h:this.startGroup(e);break;case o:case a:this.handlerChar(e);break;case u:this.handlerLogicOr(e)}if(!this.matched)break;for(;this.expNodeIndex>=this.expNodeList.length&&this.envStacks.length;)this.endGroup(this.groupQuantifierNode)}return this.matched?[this.matchedText,...this.groups]:null}setStacks({groupId:e,isCatch:t,isNone:s,isPositive:i,type:n}){this.envStacks.push({expNodeList:this.expNodeList,expNodeIndex:this.expNodeIndex,groupTimes:this.groupTimes,groupQuantifierNode:this.groupQuantifierNode,matchedText:this.matchedText,groupTextLength:this.groupTextLength,assertIndex:this.assertIndex,textIndex:this.textIndex,groupId:e,isCatch:t,isNone:s,isPositive:i,type:n})}endStack(e,t=!0){if(this.envStacks.length){let s=this.groupQuantifierNode;e&&(this.envStacks=this.envStacks.slice(0,e+1));let i=this.envStacks.pop();if(this.expNodeList=i.expNodeList,this.expNodeIndex=i.expNodeIndex,this.groupTimes=i.groupTimes,this.groupQuantifierNode=i.groupQuantifierNode,this.assertIndex=i.assertIndex,i.groupId&&i.isCatch){let{isLazy:e=!1}=s||{};this.groups[i.groupId-1]=e?this.matchedText:this.matchedText.substring(this.groupTextLength)}this.groupTextLength=i.groupTextLength,i.type===h?i.isNone&&t||!i.isNone&&!t?this.backSafePoint():(this.matchedText=i.matchedText,this.textIndex=i.textIndex):this.matchedText=i.matchedText+this.matchedText}}setSafePoint(e={}){this.safePoints.push({envStacks:this.envStacks.slice(),groups:this.groups.slice(),groupTimes:this.groupTimes,groupTextLength:this.groupTextLength,expNodeIndex:this.expNodeIndex,matchedText:this.matchedText,charTimes:this.charTimes,textIndex:this.textIndex,expNodeList:this.expNodeList,...e})}backSafePoint(){if(this.safePoints.length){let e=this.safePoints.pop();this.envStacks=e.envStacks,this.expNodeList=e.expNodeList,this.expNodeIndex=e.expNodeIndex,this.textIndex=e.textIndex,this.groups=e.groups,this.groupTimes=e.groupTimes,this.groupTextLength=e.groupTextLength,this.matchedText=e.matchedText,this.charTimes=e.charTimes,this.needMatch=e.needMatch}else-1===this.assertIndex?this.matched=!1:!0===this.envStacks[this.assertIndex].isNone?(this.endStack(this.assertIndex,!1),this.expNodeIndex++):this.matched=!1}matchChars(e,t,s){let i=this.compareChars(this.text,this.textIndex,e);null!==i?(this.charTimes++,this.matchedText+=i,this.textIndex+=i.length,t&&t()):s?s():this.backSafePoint()}compareChars(e,t,s){let{value:i,type:r}=s,h=0,o=null;switch(r){case d:for(;h<i.length&&e[t+h]===i[h];)h++;o=h===i.length?i:o;break;case n:o=c(e,t,s,i<=this.groups.length?this.groups[i-1]||"":void 0);break;default:o=c(e,t,s)}return o}handlerChar(e){let{quantifierNode:t}=e;if(t){let{min:s,max:i,isLazy:n}=t;n?this.charTimes===i?(this.expNodeIndex++,this.charTimes=0):this.charTimes>=s?this.needMatch?(this.needMatch=!1,this.matchChars(e)):(this.setSafePoint({needMatch:!0}),this.charTimes=0,this.expNodeIndex++):this.matchChars(e):this.matchChars(e,(()=>{this.charTimes===i?(this.expNodeIndex++,this.charTimes=0):this.charTimes>=s&&this.setSafePoint({expNodeIndex:this.expNodeIndex+1,charTimes:0})}),(()=>{0===this.charTimes&&0===s?this.expNodeIndex++:this.backSafePoint()}))}else this.matchChars(e,(()=>{this.expNodeIndex++,this.charTimes=0}))}startGroup(e){let{quantifierNode:t}=e;if(t){let{min:s,max:i,isLazy:n}=t;n?this.groupTimes===i?(this.endStack(),this.expNodeIndex++):this.groupTimes>=s?this.needMatch?(this.needMatch=!1,this.matchGroup(e)):(this.setSafePoint({needMatch:!0,groupTimes:0}),this.expNodeIndex++):this.matchGroup(e):this.matchGroup(e)}else this.matchGroup(e)}endGroup(e){if(e){let{min:t,max:s,isLazy:i}=e;this.groupTimes++,i?this.groupTimes<t?this.expNodeIndex=0:(this.endStack(),this.expNodeIndex++):this.groupTimes===s?(this.endStack(),this.expNodeIndex++):this.groupTimes>=t?(this.setSafePoint({expNodeIndex:this.expNodeIndex+1}),this.groupTextLength=this.matchedText.length,this.expNodeIndex=0):this.expNodeIndex=0}else this.endStack(),this.expNodeIndex++}matchGroup(e){let{quantifierNode:t,value:s,groupId:i,isCatch:n,isNone:r,isPositive:o,type:a}=e;this.setStacks({groupId:i,isCatch:n,isNone:r,isPositive:o,type:a}),a===h&&(this.assertIndex=this.envStacks.length-1),this.groupTimes=0,this.groupQuantifierNode=t,this.expNodeList=s,this.expNodeIndex=0,this.matchedText="",this.groupTextLength=0}handlerLogicOr(e){this.setSafePoint({expNodeList:e.right}),this.expNodeList=e.left,this.expNodeIndex=0}}}},t={},function s(i){var n=t[i];if(void 0!==n)return n.exports;var r=t[i]={exports:{}};return e[i](r,r.exports,s),r.exports}(138);var e,t}));