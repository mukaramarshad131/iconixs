import{r as e,d as r,U as n,j as t,aq as a,V as i,a7 as o}from"./index-a09fe141.js";function s(e,r){return r||(r=e.slice(0)),e.raw=r,e}var c=function(){function e(e){var r=this;this._insertTag=function(e){r.container.insertBefore(e,0===r.tags.length?r.insertionPoint?r.insertionPoint.nextSibling:r.prepend?r.container.firstChild:r.before:r.tags[r.tags.length-1].nextSibling),r.tags.push(e)},this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.prepend=e.prepend,this.insertionPoint=e.insertionPoint,this.before=null}var r=e.prototype;return r.hydrate=function(e){e.forEach(this._insertTag)},r.insert=function(e){this.ctr%(this.isSpeedy?65e3:1)==0&&this._insertTag(function(e){var r=document.createElement("style");return r.setAttribute("data-emotion",e.key),void 0!==e.nonce&&r.setAttribute("nonce",e.nonce),r.appendChild(document.createTextNode("")),r.setAttribute("data-s",""),r}(this));var r=this.tags[this.tags.length-1];if(this.isSpeedy){var n=function(e){if(e.sheet)return e.sheet;for(var r=0;r<document.styleSheets.length;r++)if(document.styleSheets[r].ownerNode===e)return document.styleSheets[r]}(r);try{n.insertRule(e,n.cssRules.length)}catch(r){}}else r.appendChild(document.createTextNode(e));this.ctr++},r.flush=function(){this.tags.forEach((function(e){return e.parentNode&&e.parentNode.removeChild(e)})),this.tags=[],this.ctr=0},e}(),l="-ms-",u="-webkit-",d=Math.abs,f=String.fromCharCode,h=Object.assign;function p(e){return e.trim()}function v(e,r,n){return e.replace(r,n)}function g(e,r){return e.indexOf(r)}function m(e,r){return 0|e.charCodeAt(r)}function b(e,r,n){return e.slice(r,n)}function y(e){return e.length}function x(e){return e.length}function w(e,r){return r.push(e),e}var k=1,$=1,C=0,A=0,S=0,P="";function j(e,r,n,t,a,i,o){return{value:e,root:r,parent:n,type:t,props:a,children:i,line:k,column:$,length:o,return:""}}function z(e,r){return h(j("",null,null,"",null,null,0),e,{length:-e.length},r)}function E(){return S=A>0?m(P,--A):0,$--,10===S&&($=1,k--),S}function O(){return S=A<C?m(P,A++):0,$++,10===S&&($=1,k++),S}function N(){return m(P,A)}function R(){return A}function _(e,r){return b(P,e,r)}function T(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function G(e){return k=$=1,C=y(P=e),A=0,[]}function M(e){return P="",e}function W(e){return p(_(A-1,L(91===e?e+2:40===e?e+1:e)))}function B(e){for(;(S=N())&&S<33;)O();return T(e)>2||T(S)>3?"":" "}function I(e,r){for(;--r&&O()&&!(S<48||S>102||S>57&&S<65||S>70&&S<97););return _(e,R()+(r<6&&32==N()&&32==O()))}function L(e){for(;O();)switch(S){case e:return A;case 34:case 39:34!==e&&39!==e&&L(S);break;case 40:41===e&&L(e);break;case 92:O()}return A}function q(e,r){for(;O()&&e+S!==57&&(e+S!==84||47!==N()););return"/*"+_(r,A-1)+"*"+f(47===e?e:O())}function D(e){for(;!T(N());)O();return _(e,A)}function F(e){return M(H("",null,null,null,[""],e=G(e),0,[0],e))}function H(e,r,n,t,a,i,o,s,c){for(var l=0,u=0,d=o,h=0,p=0,m=0,b=1,x=1,k=1,$=0,C="",A=a,S=i,P=t,j=C;x;)switch(m=$,$=O()){case 40:if(108!=m&&58==j.charCodeAt(d-1)){-1!=g(j+=v(W($),"&","&\f"),"&\f")&&(k=-1);break}case 34:case 39:case 91:j+=W($);break;case 9:case 10:case 13:case 32:j+=B(m);break;case 92:j+=I(R()-1,7);continue;case 47:switch(N()){case 42:case 47:w(V(q(O(),R()),r,n),c);break;default:j+="/"}break;case 123*b:s[l++]=y(j)*k;case 125*b:case 59:case 0:switch($){case 0:case 125:x=0;case 59+u:p>0&&y(j)-d&&w(p>32?Z(j+";",t,n,d-1):Z(v(j," ","")+";",t,n,d-2),c);break;case 59:j+=";";default:if(w(P=U(j,r,n,l,u,a,s,C,A=[],S=[],d),i),123===$)if(0===u)H(j,r,P,P,A,i,d,s,S);else switch(h){case 100:case 109:case 115:H(e,P,P,t&&w(U(e,P,P,0,0,a,s,C,a,A=[],d),S),a,S,d,s,t?A:S);break;default:H(j,P,P,P,[""],S,0,s,S)}}l=u=p=0,b=k=1,C=j="",d=o;break;case 58:d=1+y(j),p=m;default:if(b<1)if(123==$)--b;else if(125==$&&0==b++&&125==E())continue;switch(j+=f($),$*b){case 38:k=u>0?1:(j+="\f",-1);break;case 44:s[l++]=(y(j)-1)*k,k=1;break;case 64:45===N()&&(j+=W(O())),h=N(),u=d=y(C=j+=D(R())),$++;break;case 45:45===m&&2==y(j)&&(b=0)}}return i}function U(e,r,n,t,a,i,o,s,c,l,u){for(var f=a-1,h=0===a?i:[""],g=x(h),m=0,y=0,w=0;m<t;++m)for(var k=0,$=b(e,f+1,f=d(y=o[m])),C=e;k<g;++k)(C=p(y>0?h[k]+" "+$:v($,/&\f/g,h[k])))&&(c[w++]=C);return j(e,r,n,0===a?"rule":s,c,l,u)}function V(e,r,n){return j(e,r,n,"comm",f(S),b(e,2,-2),0)}function Z(e,r,n,t){return j(e,r,n,"decl",b(e,0,t),b(e,t+1,-1),t)}function J(e,r){switch(function(e,r){return(((r<<2^m(e,0))<<2^m(e,1))<<2^m(e,2))<<2^m(e,3)}(e,r)){case 5103:return u+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return u+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return u+e+"-moz-"+e+l+e+e;case 6828:case 4268:return u+e+l+e+e;case 6165:return u+e+l+"flex-"+e+e;case 5187:return u+e+v(e,/(\w+).+(:[^]+)/,"-webkit-box-$1$2-ms-flex-$1$2")+e;case 5443:return u+e+l+"flex-item-"+v(e,/flex-|-self/,"")+e;case 4675:return u+e+l+"flex-line-pack"+v(e,/align-content|flex-|-self/,"")+e;case 5548:return u+e+l+v(e,"shrink","negative")+e;case 5292:return u+e+l+v(e,"basis","preferred-size")+e;case 6060:return u+"box-"+v(e,"-grow","")+u+e+l+v(e,"grow","positive")+e;case 4554:return u+v(e,/([^-])(transform)/g,"$1-webkit-$2")+e;case 6187:return v(v(v(e,/(zoom-|grab)/,u+"$1"),/(image-set)/,u+"$1"),e,"")+e;case 5495:case 3959:return v(e,/(image-set\([^]*)/,u+"$1$`$1");case 4968:return v(v(e,/(.+:)(flex-)?(.*)/,"-webkit-box-pack:$3-ms-flex-pack:$3"),/s.+-b[^;]+/,"justify")+u+e+e;case 4095:case 3583:case 4068:case 2532:return v(e,/(.+)-inline(.+)/,u+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(y(e)-1-r>6)switch(m(e,r+1)){case 109:if(45!==m(e,r+4))break;case 102:return v(e,/(.+:)(.+)-([^]+)/,"$1-webkit-$2-$3$1-moz-"+(108==m(e,r+3)?"$3":"$2-$3"))+e;case 115:return~g(e,"stretch")?J(v(e,"stretch","fill-available"),r)+e:e}break;case 4949:if(115!==m(e,r+1))break;case 6444:switch(m(e,y(e)-3-(~g(e,"!important")&&10))){case 107:return v(e,":",":"+u)+e;case 101:return v(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+u+(45===m(e,14)?"inline-":"")+"box$3$1"+u+"$2$3$1"+l+"$2box$3")+e}break;case 5936:switch(m(e,r+11)){case 114:return u+e+l+v(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return u+e+l+v(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return u+e+l+v(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return u+e+l+e+e}return e}function K(e,r){for(var n="",t=x(e),a=0;a<t;a++)n+=r(e[a],a,e,r)||"";return n}function Q(e,r,n,t){switch(e.type){case"@import":case"decl":return e.return=e.return||e.value;case"comm":return"";case"@keyframes":return e.return=e.value+"{"+K(e.children,t)+"}";case"rule":e.value=e.props.join(",")}return y(n=K(e.children,t))?e.return=e.value+"{"+n+"}":""}var X=function(e,r,n){for(var t=0,a=0;t=a,a=N(),38===t&&12===a&&(r[n]=1),!T(a);)O();return _(e,A)},Y=new WeakMap,ee=function(e){if("rule"===e.type&&e.parent&&!(e.length<1)){for(var r=e.value,n=e.parent,t=e.column===n.column&&e.line===n.line;"rule"!==n.type;)if(!(n=n.parent))return;if((1!==e.props.length||58===r.charCodeAt(0)||Y.get(n))&&!t){Y.set(e,!0);for(var a=[],i=function(e,r){return M(function(e,r){var n=-1,t=44;do{switch(T(t)){case 0:38===t&&12===N()&&(r[n]=1),e[n]+=X(A-1,r,n);break;case 2:e[n]+=W(t);break;case 4:if(44===t){e[++n]=58===N()?"&\f":"",r[n]=e[n].length;break}default:e[n]+=f(t)}}while(t=O());return e}(G(e),r))}(r,a),o=n.props,s=0,c=0;s<i.length;s++)for(var l=0;l<o.length;l++,c++)e.props[c]=a[s]?i[s].replace(/&\f/g,o[l]):o[l]+" "+i[s]}}},re=function(e){if("decl"===e.type){var r=e.value;108===r.charCodeAt(0)&&98===r.charCodeAt(2)&&(e.return="",e.value="")}},ne=[function(e,r,n,t){if(e.length>-1&&!e.return)switch(e.type){case"decl":e.return=J(e.value,e.length);break;case"@keyframes":return K([z(e,{value:v(e.value,"@","@"+u)})],t);case"rule":if(e.length)return function(e,r){return e.map(r).join("")}(e.props,(function(r){switch(function(e){return(e=/(::plac\w+|:read-\w+)/.exec(e))?e[0]:e}(r)){case":read-only":case":read-write":return K([z(e,{props:[v(r,/:(read-\w+)/,":-moz-$1")]})],t);case"::placeholder":return K([z(e,{props:[v(r,/:(plac\w+)/,":-webkit-input-$1")]}),z(e,{props:[v(r,/:(plac\w+)/,":-moz-$1")]}),z(e,{props:[v(r,/:(plac\w+)/,l+"input-$1")]})],t)}return""}))}}],te={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},ae=/[A-Z]|^ms/g,ie=/_EMO_([^_]+?)_([^]*?)_EMO_/g,oe=function(e){return 45===e.charCodeAt(1)},se=function(e){return null!=e&&"boolean"!=typeof e},ce=function(e){var r=Object.create(null);return function(n){return void 0===r[n]&&(r[n]=e(n)),r[n]}}((function(e){return oe(e)?e:e.replace(ae,"-$&").toLowerCase()})),le=function(e,r){switch(e){case"animation":case"animationName":if("string"==typeof r)return r.replace(ie,(function(e,r,n){return de={name:r,styles:n,next:de},r}))}return 1===te[e]||oe(e)||"number"!=typeof r||0===r?r:r+"px"};function ue(e,r,n){if(null==n)return"";if(void 0!==n.__emotion_styles)return n;switch(typeof n){case"boolean":return"";case"object":if(1===n.anim)return de={name:n.name,styles:n.styles,next:de},n.name;if(void 0!==n.styles){var t=n.next;if(void 0!==t)for(;void 0!==t;)de={name:t.name,styles:t.styles,next:de},t=t.next;return n.styles+";"}return function(e,r,n){var t="";if(Array.isArray(n))for(var a=0;a<n.length;a++)t+=ue(e,r,n[a])+";";else for(var i in n){var o=n[i];if("object"!=typeof o)null!=r&&void 0!==r[o]?t+=i+"{"+r[o]+"}":se(o)&&(t+=ce(i)+":"+le(i,o)+";");else if(!Array.isArray(o)||"string"!=typeof o[0]||null!=r&&void 0!==r[o[0]]){var s=ue(e,r,o);switch(i){case"animation":case"animationName":t+=ce(i)+":"+s+";";break;default:t+=i+"{"+s+"}"}}else for(var c=0;c<o.length;c++)se(o[c])&&(t+=ce(i)+":"+le(i,o[c])+";")}return t}(e,r,n);case"function":if(void 0!==e){var a=de,i=n(e);return de=a,ue(e,r,i)}}if(null==r)return n;var o=r[n];return void 0!==o?o:n}var de,fe=/label:\s*([^\s;\n{]+)\s*(;|$)/g,he=function(e,r,n){if(1===e.length&&"object"==typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var t=!0,a="";de=void 0;var i=e[0];null==i||void 0===i.raw?(t=!1,a+=ue(n,r,i)):a+=i[0];for(var o=1;o<e.length;o++)a+=ue(n,r,e[o]),t&&(a+=i[o]);fe.lastIndex=0;for(var s,c="";null!==(s=fe.exec(a));)c+="-"+s[1];var l=function(e){for(var r,n=0,t=0,a=e.length;a>=4;++t,a-=4)r=1540483477*(65535&(r=255&e.charCodeAt(t)|(255&e.charCodeAt(++t))<<8|(255&e.charCodeAt(++t))<<16|(255&e.charCodeAt(++t))<<24))+(59797*(r>>>16)<<16),n=1540483477*(65535&(r^=r>>>24))+(59797*(r>>>16)<<16)^1540483477*(65535&n)+(59797*(n>>>16)<<16);switch(a){case 3:n^=(255&e.charCodeAt(t+2))<<16;case 2:n^=(255&e.charCodeAt(t+1))<<8;case 1:n=1540483477*(65535&(n^=255&e.charCodeAt(t)))+(59797*(n>>>16)<<16)}return(((n=1540483477*(65535&(n^=n>>>13))+(59797*(n>>>16)<<16))^n>>>15)>>>0).toString(36)}(a)+c;return{name:l,styles:a,next:de}};function pe(e,r,n){var t="";return n.split(" ").forEach((function(n){void 0!==e[n]?r.push(e[n]+";"):t+=n+" "})),t}function ve(e,r){if(void 0===e.inserted[r.name])return e.insert("",r,e.sheet,!0)}function ge(e,r,n){var t=[],a=pe(e,t,n);return t.length<2?n:a+r(t)}var me,be,ye,xe,we,ke=function e(r){for(var n="",t=0;t<r.length;t++){var a=r[t];if(null!=a){var i=void 0;switch(typeof a){case"boolean":break;case"object":if(Array.isArray(a))i=e(a);else for(var o in i="",a)a[o]&&o&&(i&&(i+=" "),i+=o);break;default:i=a}i&&(n&&(n+=" "),n+=i)}}return n},$e=function(){var e=function(e){var r=e.key;if("css"===r){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,(function(e){-1!==e.getAttribute("data-emotion").indexOf(" ")&&(document.head.appendChild(e),e.setAttribute("data-s",""))}))}var t,a,i=e.stylisPlugins||ne,o={},s=[];t=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),(function(e){for(var r=e.getAttribute("data-emotion").split(" "),n=1;n<r.length;n++)o[r[n]]=!0;s.push(e)}));var l,u,d=[Q,(u=function(e){l.insert(e)},function(e){e.root||(e=e.return)&&u(e)})],f=function(e){var r=x(e);return function(n,t,a,i){for(var o="",s=0;s<r;s++)o+=e[s](n,t,a,i)||"";return o}}([ee,re].concat(i,d));a=function(e,r,n,t){l=n,K(F(e?e+"{"+r.styles+"}":r.styles),f),t&&(h.inserted[r.name]=!0)};var h={key:r,sheet:new c({key:r,container:t,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:o,registered:{},insert:a};return h.sheet.hydrate(s),h}({key:"css"});e.sheet.speedy=function(e){this.isSpeedy=e},e.compat=!0;var r=function(){for(var r=arguments.length,n=new Array(r),t=0;t<r;t++)n[t]=arguments[t];var a=he(n,e.registered,void 0);return function(e,r,n){!function(e,r,n){var t=e.key+"-"+r.name;!1===n&&void 0===e.registered[t]&&(e.registered[t]=r.styles)}(e,r,n);var t=e.key+"-"+r.name;if(void 0===e.inserted[r.name]){var a=r;do{e.insert(r===a?"."+t:"",a,e.sheet,!0),a=a.next}while(void 0!==a)}}(e,a,!1),e.key+"-"+a.name};return{css:r,cx:function(){for(var n=arguments.length,t=new Array(n),a=0;a<n;a++)t[a]=arguments[a];return ge(e.registered,r,ke(t))},injectGlobal:function(){for(var r=arguments.length,n=new Array(r),t=0;t<r;t++)n[t]=arguments[t];var a=he(n,e.registered);ve(e,a)},keyframes:function(){for(var r=arguments.length,n=new Array(r),t=0;t<r;t++)n[t]=arguments[t];var a=he(n,e.registered),i="animation-"+a.name;return ve(e,{name:a.name,styles:"@keyframes "+i+"{"+a.styles+"}"}),i},hydrate:function(r){r.forEach((function(r){e.inserted[r]=!0}))},flush:function(){e.registered={},e.inserted={},e.sheet.flush()},sheet:e.sheet,cache:e,getRegisteredStyles:pe.bind(null,e.registered),merge:ge.bind(null,e.registered,r)}}(),Ce=$e.cx,Ae=$e.css,Se=Ae(me||(me=s(["\n  content: '';\n  position: absolute;\n  top: 0;\n  height: var(--tree-line-height);\n  box-sizing: border-box;\n"]))),Pe=Ae(be||(be=s(["\n  display: flex;\n  padding-inline-start: 0;\n  margin: 0;\n  padding-top: var(--tree-line-height);\n  position: relative;\n\n  ::before {\n    ",";\n    left: calc(50% - var(--tree-line-width) / 2);\n    width: 0;\n    border-left: var(--tree-line-width) var(--tree-node-line-style)\n      var(--tree-line-color);\n  }\n"])),Se),je=Ae(ye||(ye=s(["\n  flex: auto;\n  text-align: center;\n  list-style-type: none;\n  position: relative;\n  padding: var(--tree-line-height) var(--tree-node-padding) 0\n    var(--tree-node-padding);\n"]))),ze=Ae(xe||(xe=s(["\n  ::before,\n  ::after {\n    ",";\n    right: 50%;\n    width: 50%;\n    border-top: var(--tree-line-width) var(--tree-node-line-style)\n      var(--tree-line-color);\n  }\n  ::after {\n    left: 50%;\n    border-left: var(--tree-line-width) var(--tree-node-line-style)\n      var(--tree-line-color);\n  }\n\n  :only-of-type {\n    padding: 0;\n    ::after,\n    :before {\n      display: none;\n    }\n  }\n\n  :first-of-type {\n    ::before {\n      border: 0 none;\n    }\n    ::after {\n      border-radius: var(--tree-line-border-radius) 0 0 0;\n    }\n  }\n\n  :last-of-type {\n    ::before {\n      border-right: var(--tree-line-width) var(--tree-node-line-style)\n        var(--tree-line-color);\n      border-radius: 0 var(--tree-line-border-radius) 0 0;\n    }\n    ::after {\n      border: 0 none;\n    }\n  }\n"])),Se);function Ee(r){var n=r.children,t=r.label;return e.createElement("li",{className:Ce(je,ze,r.className)},t,e.Children.count(n)>0&&e.createElement("ul",{className:Pe},n))}function Oe(r){var n=r.children,t=r.label,a=r.lineHeight,i=void 0===a?"20px":a,o=r.lineWidth,c=void 0===o?"1px":o,l=r.lineColor,u=void 0===l?"black":l,d=r.nodePadding,f=void 0===d?"5px":d,h=r.lineStyle,p=void 0===h?"solid":h,v=r.lineBorderRadius,g=void 0===v?"5px":v;return e.createElement("ul",{className:Ae(we||(we=s(["\n        padding-inline-start: 0;\n        margin: 0;\n        display: flex;\n\n        --line-height: ",";\n        --line-width: ",";\n        --line-color: ",";\n        --line-border-radius: ",";\n        --line-style: ",";\n        --node-padding: ",";\n\n        --tree-line-height: var(--line-height, 20px);\n        --tree-line-width: var(--line-width, 1px);\n        --tree-line-color: var(--line-color, black);\n        --tree-line-border-radius: var(--line-border-radius, 5px);\n        --tree-node-line-style: var(--line-style, solid);\n        --tree-node-padding: var(--node-padding, 5px);\n      "])),i,c,u,g,p,f)},e.createElement(Ee,{label:t},n))}function Ne({organizations:e=[]}){const o=r(),{themeMode:s}=n();return t.jsx(Oe,{lineWidth:"1px",lineColor:s===a.Light?o.colorPrimaryBorder:o.colorPrimary,lineBorderRadius:"24px",label:t.jsx(_e,{$textColor:s===a.Light?o.colorPrimaryTextActive:o.colorPrimaryText,$backgroundColor:i(o.colorPrimary).alpha(.08).toString(),$borderColor:i(o.colorPrimaryBorder).alpha(.24).toString(),children:"Root"}),children:e.map((e=>t.jsx(Re,{organization:e},e.id)))})}function Re({organization:{name:e,children:o}}){const s=r(),{themeMode:c}=n();return t.jsx(Ee,{label:t.jsx(_e,{$textColor:c===a.Light?s.colorPrimaryTextActive:s.colorPrimaryText,$backgroundColor:i(s.colorPrimary).alpha(.08).toString(),$borderColor:i(s.colorPrimaryBorder).alpha(.24).toString(),children:e}),children:o?.map((e=>t.jsx(Re,{organization:e},e.id)))})}const _e=o.div`
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  overflow: hidden;
  position: relative;
  z-index: 0;
  padding: 16px;
  border-radius: 12px;
  display: inline-flex;
  text-transform: capitalize;
  color: ${e=>e.$textColor};
  background-color: ${e=>e.$backgroundColor};
  border: 1px solid ${e=>e.$borderColor};
`;export{Ne as default};
