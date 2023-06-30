!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("RegExpGenerateNode",[],t):"object"==typeof exports?exports.RegExpGenerateNode=t():e.RegExpGenerateNode=t()}(self,(()=>{return e={789:e=>{e.exports={BoundaryChars:["b","B","A","Z","z"],CharSetChars:["d","D","f","n","r","s","S","t","v","w","W"]}},490:e=>{class t extends Error{constructor(...e){super(...e)}setErrorMsg(e){this.message=e}getErrorMsg(){return this.message}}e.exports=t},685:e=>{e.exports={QUANTIFIER:"QUANTIFIER",BOUNDARY:"BOUNDARY",GROUPID:"GROUPID",GROUP:"GROUP",ASSERTIONS:"ASSERTIONS",CHARSET:"CHARSET",PRESETSET:"PRESETSET",RANGECHARSET:"RANGECHARSET",LOGICOR:"LOGICOR",CHARS:"CHARS"}},267:(e,t,r)=>{const{QUANTIFIER:n,BOUNDARY:u,GROUPID:o,GROUP:i,ASSERTIONS:s,CHARSET:a,PRESETSET:l,RANGECHARSET:c,LOGICOR:f,CHARS:d}=r(685);function p(e){return Object.assign(Object.create(null),{meta:!0,type:"",value:"",...e})}e.exports={QuantifierNode:function(e=0,t=-1,r=!1){return p({type:n,isLazy:r,min:e,max:t})},CharSetNode:function(e=[],t=!1,r=null){return p({type:a,isNone:t,value:e,quantifierNode:r})},RangeCharSetNode:function(e=-1,t=-1){return p({type:c,min:e,max:t})},PresetCharSetNode:function(e="",t=null){return p({type:l,value:e,quantifierNode:t})},BoundaryNode:function(e){return p({type:u,value:e})},GroupNode:function(e=1,t=!0,r=[],n=null){return p({type:i,isCatch:t,groupId:e,value:r,quantifierNode:n})},AssertionsNode:function(e=[],t=!1,r=!0){return p({type:s,isNone:t,isPositive:r,value:e})},GroupIdNode:function(e,t=null){return p({type:o,value:e,quantifierNode:t})},LogicOrNode:function(e=[],t=[]){return p({type:f,left:e,right:t})},CharsNode:function(e,t=null){return p({meta:!1,type:d,value:e,quantifierNode:t})},isNodeType:function(e,t){return e?.type===t},inNodeTypes:function(e,t=[]){return t.includes(e?.type)},getQuantifierNodeInNode:function(e){return e?.quantifierNode}}},478:(e,t,r)=>{const{isNumber:n,isBoundary:u,isCharSet:o}=r(19),{isNodeType:i,inNodeTypes:s,getQuantifierNodeInNode:a,CharsNode:l,GroupNode:c,GroupIdNode:f,AssertionsNode:d,BoundaryNode:p,CharSetNode:N,RangeCharSetNode:h,PresetCharSetNode:R,QuantifierNode:S,LogicOrNode:C}=r(267),E=r(490),{GROUPID:g,GROUP:A,CHARSET:y,PRESETSET:b,LOGICOR:I,CHARS:T}=r(685),v="INNORMAL",x="INQUANTIFIER",O="INCHARACTERSET",G=function(e,t){return n(e)?t.push(f(e-0)):u(e)?t.push(p(e)):o(e)?t.push(R(e)):P(e,t),1},m=function(e){let t=e[e.length-1],r=!0,n=a(t);return n&&(n.isLazy=!0,r=!1),r},k=function(e,t){let r=t[t.length-1];if(r&&!s(r,[A,g,y,b,I,T]))throw new E("没有可重复的字符！");if(i(r,T)){let e=r.value.length;if(1!==e){let n=r.value[e-1];r.value=r.value.substring(0,e-1),r=l(n),t.push(r)}}r.quantifierNode=e},P=function(e,t){let r=t[t.length-1];i(r,T)&&!a(r)?r.value=`${r.value}${e}`:t.push(l(e))},U=function(e,t){let r=!1;for(let u=t+1;u<e.length;u++){let o=e[u];if("}"===o){r=u!==t+1;break}if("{"===o)break;if(!n(o)&&","!==o)break}return r},L=function(e,t){let r=0,n=t+1;if("?"===e[n])if(n++,":"===e[n])r=-1;else if("<"===e[n]&&(r=2,n++),"="===e[n])r+=1;else{if("!"!==e[n])throw new E(`表达式下标${t}位置“(?${e[n]}”不是一个正确的分组或者断言！`);r+=2}return r},H=function(e,t,r){let n=e[e.length-1],u=null;if(i(n,T)&"]"!==r){let o=t.charCodeAt(),i=r.charCodeAt();if(!(i>=o))throw new E("字符范围错误！");u={min:o,max:i},1===n.value.length?e.pop():n.value=n.value.substring(0,n.value.length-1)}return u},w=function(e){let[t,r]=e.split(",");return{min:t-0,max:r?r-0:-1}};e.exports=function(e){let t=[],r=v,n=0,u=[],o=0;const s=function(e=!1){let n=t;if(e){let e=u.pop();t=e.expNodeList,r=e.status}else u.push({expNodeList:t,status:r}),t=[],r=v;return n},a=function(){let e=u[u.length-1]?.expNodeList||[];return e.length?e[e.length-1]:null};try{for(;e[n];){let u=e[n],l=e[n+1],f=e[n-1];if(r!==O||["]","\\","-"].includes(u)){switch(u){case"\\":n+=G(l,t);break;case"[":t.push(N([],"^"===l)),n+="^"===l?1:0,s(),r=O;break;case"]":r===O?(a().value=t,s(!0)):P(u,t);break;case"-":if(r===O){let e=H(t,f,l);e&&t.push(h(e.min,e.max))&&n++}else P(u,t);break;case"*":k(S(0),t);break;case"+":k(S(1),t);break;case"?":m(t)&&k(S(0,1),t);break;case"{":U(e,n)?(s(),r=x):P(u,t);break;case"}":if(r===x){let{min:e,max:r}=w(t[0].value);s(!0),k(S(e,r),t)}else P(u,t);break;case".":t.push(R(u));break;case"|":t=[C(t)],s();break;case"^":case"$":t.push(p(u));break;case"(":{let u=L(e,n),i=null;if(u>0)i=d([],!(u%2),u<=2),n+=u<=2?2:3;else{let e=u>-1;o+=e?1:0,i=c(e?o:-1,e),n+=e?0:2}t.push(i),s(),r=u>0?"INASSERT":"INGROUP";break}case")":for(;i(a(),I);)a().right=t,s(!0);a().value=t,s(!0);break;default:P(u,t)}n++}else P(u,t),n++}}catch(t){if(t instanceof E){let r=t.getErrorMsg();t.setErrorMsg(`非法表达式：${e}:${r}`)}throw t}for(;i(a(),I);)a().right=t,s(!0);if(!t.length||u.length)throw new E(`${e}不是一个合法的正则表达式！`);return{expNodeList:t,groupNum:o}}},19:(e,t,r)=>{const{DescribeChars:n,BoundaryChars:u,CharSetChars:o}=r(789),i=function(e){return void 0!==n[e]},s=function(e){let t=e.charCodeAt();return t<=57&&t>=48},a=function(e){let t=e.charCodeAt();return t<=90&&t>=65||t<=122&&t>=97};e.exports={isMeta:function(e){return i(e)},isDescribe:i,isNumber:s,isABC:a,isBoundary:function(e){return u.includes(e)},isCharSet:function(e){return o.includes(e)},isWordChar:function(e){return a(e)||s(e)||"_"===e},isSpace:function(e){let t=e.charCodeAt();return t>=9&&t<=13||t>=8192&&t<=8202||[32,160,5760,6158,8232,8233,8239,8287,12288,65279].includes(t)}}}},t={},function r(n){var u=t[n];if(void 0!==u)return u.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,r),o.exports}(478);var e,t}));