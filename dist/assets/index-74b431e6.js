import{r as e,aS as t,bP as n,w as o,b1 as a,E as r,F as s,bQ as l,bR as i,bS as c,bT as u,bM as p,b3 as f,bh as d,bU as m,bV as b,b6 as v,af as g,y,bW as O,aY as h,bI as C,bX as x,bg as j,B as E,bY as w}from"./index-a09fe141.js";import{E as P}from"./EyeOutlined-4d65de98.js";import{S}from"./SearchOutlined-03807928.js";const k=r=>{const{getPrefixCls:s,direction:l}=e.useContext(t),{prefixCls:i,className:c}=r,u=s("input-group",i),p=s("input"),[f,d]=n(p),m=o(u,{[`${u}-lg`]:"large"===r.size,[`${u}-sm`]:"small"===r.size,[`${u}-compact`]:r.compact,[`${u}-rtl`]:"rtl"===l},d,c),b=e.useContext(a),v=e.useMemo((()=>Object.assign(Object.assign({},b),{isFormItemInput:!1})),[b]);return f(e.createElement("span",{className:m,style:r.style,onMouseEnter:r.onMouseEnter,onMouseLeave:r.onMouseLeave,onFocus:r.onFocus,onBlur:r.onBlur},e.createElement(a.Provider,{value:v},r.children)))},$=e=>{const{componentCls:t,paddingXS:n}=e;return{[t]:{display:"inline-flex",alignItems:"center",flexWrap:"nowrap",columnGap:n,"&-rtl":{direction:"rtl"},[`${t}-input`]:{textAlign:"center",paddingInline:e.paddingXXS},[`&${t}-sm ${t}-input`]:{paddingInline:e.calc(e.paddingXXS).div(2).equal()},[`&${t}-lg ${t}-input`]:{paddingInline:e.paddingXS}}}},z=r(["Input","OTP"],(e=>{const t=s(e,l(e));return[$(t)]}),i);var I=globalThis&&globalThis.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]])}return n};const M=e.forwardRef(((t,n)=>{const{value:o,onChange:a,onActiveChange:r,index:s,mask:l}=t,i=I(t,["value","onChange","onActiveChange","index","mask"]),p=o&&"string"==typeof l?l:o,f=e.useRef(null);e.useImperativeHandle(n,(()=>f.current));const d=()=>{u((()=>{var e;const t=null===(e=f.current)||void 0===e?void 0:e.input;document.activeElement===t&&t&&t.select()}))};return e.createElement(c,Object.assign({},i,{ref:f,value:p,onInput:e=>{a(s,e.target.value)},onFocus:d,onKeyDown:e=>{let{key:t}=e;"ArrowLeft"===t?r(s-1):"ArrowRight"===t&&r(s+1),d()},onKeyUp:e=>{"Backspace"!==e.key||o||r(s-1),d()},onMouseDown:d,onMouseUp:d,type:!0===l?"password":"text"}))}));var T=globalThis&&globalThis.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]])}return n};function N(e){return(e||"").split("")}const R=e.forwardRef(((n,r)=>{const{prefixCls:s,length:l=6,size:i,defaultValue:c,value:u,onChange:g,formatter:y,variant:O,disabled:h,status:C,autoFocus:x,mask:j}=n,E=T(n,["prefixCls","length","size","defaultValue","value","onChange","formatter","variant","disabled","status","autoFocus","mask"]),{getPrefixCls:w,direction:P}=e.useContext(t),S=w("otp",s),k=p(E,{aria:!0,data:!0,attr:!0}),$=f(S),[I,R,A]=z(S,$),_=d((e=>null!=i?i:e)),B=e.useContext(a),F=m(B.status,C),L=e.useMemo((()=>Object.assign(Object.assign({},B),{status:F,hasFeedback:!1,feedbackIcon:null})),[B,F]),D=e.useRef(null),X=e.useRef({});e.useImperativeHandle(r,(()=>({focus:()=>{var e;null===(e=X.current[0])||void 0===e||e.focus()},blur:()=>{var e;for(let t=0;t<l;t+=1)null===(e=X.current[t])||void 0===e||e.blur()},nativeElement:D.current})));const q=e=>y?y(e):e,[U,V]=e.useState(N(q(c||"")));e.useEffect((()=>{void 0!==u&&V(N(u))}),[u]);const Q=b((e=>{V(e),g&&e.length===l&&e.every((e=>e))&&e.some(((e,t)=>U[t]!==e))&&g(e.join(""))})),G=b(((e,t)=>{let n=v(U);for(let a=0;a<e;a+=1)n[a]||(n[a]="");t.length<=1?n[e]=t:n=n.slice(0,e).concat(N(t)),n=n.slice(0,l);for(let a=n.length-1;a>=0&&!n[a];a-=1)n.pop();const o=q(n.map((e=>e||" ")).join(""));return n=N(o).map(((e,t)=>" "!==e||n[t]?e:n[t])),n})),H=(e,t)=>{var n;const o=G(e,t),a=Math.min(e+t.length,l-1);a!==e&&(null===(n=X.current[a])||void 0===n||n.focus()),Q(o)},K=e=>{var t;null===(t=X.current[e])||void 0===t||t.focus()},W={variant:O,disabled:h,status:F,mask:j};return I(e.createElement("div",Object.assign({},k,{ref:D,className:o(S,{[`${S}-sm`]:"small"===_,[`${S}-lg`]:"large"===_,[`${S}-rtl`]:"rtl"===P},A,R)}),e.createElement(a.Provider,{value:L},Array.from({length:l}).map(((t,n)=>{const o=`otp-${n}`,a=U[n]||"";return e.createElement(M,Object.assign({ref:e=>{X.current[n]=e},key:o,index:n,size:_,htmlSize:1,className:`${S}-input`,onChange:H,value:a,onActiveChange:K,autoFocus:0===n&&x},W))})))))}));const A={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"}},{tag:"path",attrs:{d:"M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"}}]},name:"eye-invisible",theme:"outlined"};var _=function(t,n){return e.createElement(g,y({},t,{ref:n,icon:A}))};
/**![eye-invisible](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTk0Mi4yIDQ4Ni4yUTg4OS40NyAzNzUuMTEgODE2LjcgMzA1bC01MC44OCA1MC44OEM4MDcuMzEgMzk1LjUzIDg0My40NSA0NDcuNCA4NzQuNyA1MTIgNzkxLjUgNjg0LjIgNjczLjQgNzY2IDUxMiA3NjZxLTcyLjY3IDAtMTMzLjg3LTIyLjM4TDMyMyA3OTguNzVRNDA4IDgzOCA1MTIgODM4cTI4OC4zIDAgNDMwLjItMzAwLjNhNjAuMjkgNjAuMjkgMCAwMDAtNTEuNXptLTYzLjU3LTMyMC42NEw4MzYgMTIyLjg4YTggOCAwIDAwLTExLjMyIDBMNzE1LjMxIDIzMi4yUTYyNC44NiAxODYgNTEyIDE4NnEtMjg4LjMgMC00MzAuMiAzMDAuM2E2MC4zIDYwLjMgMCAwMDAgNTEuNXE1Ni42OSAxMTkuNCAxMzYuNSAxOTEuNDFMMTEyLjQ4IDgzNWE4IDggMCAwMDAgMTEuMzFMMTU1LjE3IDg4OWE4IDggMCAwMDExLjMxIDBsNzEyLjE1LTcxMi4xMmE4IDggMCAwMDAtMTEuMzJ6TTE0OS4zIDUxMkMyMzIuNiAzMzkuOCAzNTAuNyAyNTggNTEyIDI1OGM1NC41NCAwIDEwNC4xMyA5LjM2IDE0OS4xMiAyOC4zOWwtNzAuMyA3MC4zYTE3NiAxNzYgMCAwMC0yMzguMTMgMjM4LjEzbC04My40MiA4My40MkMyMjMuMSA2MzcuNDkgMTgzLjMgNTgyLjI4IDE0OS4zIDUxMnptMjQ2LjcgMGExMTIuMTEgMTEyLjExIDAgMDExNDYuMi0xMDYuNjlMNDAxLjMxIDU0Ni4yQTExMiAxMTIgMCAwMTM5NiA1MTJ6IiAvPjxwYXRoIGQ9Ik01MDggNjI0Yy0zLjQ2IDAtNi44Ny0uMTYtMTAuMjUtLjQ3bC01Mi44MiA1Mi44MmExNzYuMDkgMTc2LjA5IDAgMDAyMjcuNDItMjI3LjQybC01Mi44MiA1Mi44MmMuMzEgMy4zOC40NyA2Ljc5LjQ3IDEwLjI1YTExMS45NCAxMTEuOTQgMCAwMS0xMTIgMTEyeiIgLz48L3N2Zz4=) */const B=e.forwardRef(_);var F=globalThis&&globalThis.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]])}return n};const L=t=>t?e.createElement(P,null):e.createElement(B,null),D={click:"onClick",hover:"onMouseOver"},X=e.forwardRef(((n,a)=>{const{disabled:r,action:s="click",visibilityToggle:l=!0,iconRender:i=L}=n,u="object"==typeof l&&void 0!==l.visible,[p,f]=e.useState((()=>!!u&&l.visible)),d=e.useRef(null);e.useEffect((()=>{u&&f(l.visible)}),[u,l]);const m=O(d),b=()=>{r||(p&&m(),f((e=>{var t;const n=!e;return"object"==typeof l&&(null===(t=l.onVisibleChange)||void 0===t||t.call(l,n)),n})))},{className:v,prefixCls:g,inputPrefixCls:y,size:x}=n,j=F(n,["className","prefixCls","inputPrefixCls","size"]),{getPrefixCls:E}=e.useContext(t),w=E("input",y),P=E("input-password",g),S=l&&(t=>{const n=D[s]||"",o=i(p),a={[n]:b,className:`${t}-icon`,key:"passwordIcon",onMouseDown:e=>{e.preventDefault()},onMouseUp:e=>{e.preventDefault()}};return e.cloneElement(e.isValidElement(o)?o:e.createElement("span",null,o),a)})(P),k=o(P,v,{[`${P}-${x}`]:!!x}),$=Object.assign(Object.assign({},h(j,["suffix","iconRender","visibilityToggle"])),{type:p?"text":"password",className:k,prefixCls:w,suffix:S});return x&&($.size=x),e.createElement(c,Object.assign({ref:C(a,d)},$))}));var q=globalThis&&globalThis.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]])}return n};const U=e.forwardRef(((n,a)=>{const{prefixCls:r,inputPrefixCls:s,className:l,size:i,suffix:u,enterButton:p=!1,addonAfter:f,loading:m,disabled:b,onSearch:v,onChange:g,onCompositionStart:y,onCompositionEnd:O}=n,h=q(n,["prefixCls","inputPrefixCls","className","size","suffix","enterButton","addonAfter","loading","disabled","onSearch","onChange","onCompositionStart","onCompositionEnd"]),{getPrefixCls:w,direction:P}=e.useContext(t),k=e.useRef(!1),$=w("input-search",r),z=w("input",s),{compactSize:I}=x($,P),M=d((e=>{var t;return null!==(t=null!=i?i:I)&&void 0!==t?t:e})),T=e.useRef(null),N=e=>{var t;document.activeElement===(null===(t=T.current)||void 0===t?void 0:t.input)&&e.preventDefault()},R=e=>{var t,n;v&&v(null===(n=null===(t=T.current)||void 0===t?void 0:t.input)||void 0===n?void 0:n.value,e,{source:"input"})},A="boolean"==typeof p?e.createElement(S,null):null,_=`${$}-button`;let B;const F=p||{},L=F.type&&!0===F.type.__ANT_BUTTON;B=L||"button"===F.type?j(F,Object.assign({onMouseDown:N,onClick:e=>{var t,n;null===(n=null===(t=null==F?void 0:F.props)||void 0===t?void 0:t.onClick)||void 0===n||n.call(t,e),R(e)},key:"enterButton"},L?{className:_,size:M}:{})):e.createElement(E,{className:_,type:p?"primary":void 0,size:M,disabled:b,key:"enterButton",onMouseDown:N,onClick:R,loading:m,icon:A},p),f&&(B=[B,j(f,{key:"addonAfter"})]);const D=o($,{[`${$}-rtl`]:"rtl"===P,[`${$}-${M}`]:!!M,[`${$}-with-button`]:!!p},l);return e.createElement(c,Object.assign({ref:C(T,a),onPressEnter:e=>{k.current||m||R(e)}},h,{size:M,onCompositionStart:e=>{k.current=!0,null==y||y(e)},onCompositionEnd:e=>{k.current=!1,null==O||O(e)},prefixCls:z,addonAfter:B,suffix:u,onChange:e=>{(null==e?void 0:e.target)&&"click"===e.type&&v&&v(e.target.value,e,{source:"clear"}),null==g||g(e)},className:D,disabled:b}))})),V=c;V.Group=k,V.Search=U,V.TextArea=w,V.Password=X,V.OTP=R;const Q=V;export{Q as I};
