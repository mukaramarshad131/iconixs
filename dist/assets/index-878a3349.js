import{r as e,j as t,C as o}from"./index-a09fe141.js";import n from"./control-panel-f354da2a.js";import s from"./container-1adb37f6.js";import i from"./toolbar-0e4cb9b3.js";import{R as u,C as a}from"./row-ec866866.js";import"./cover_3-3d11acab.js";import"./index-a9dd2052.js";import"./fade-523d0f61.js";import"./ReloadOutlined-bf109b9f.js";const l=[{type:"slide in",values:["slideInUp","slideInDown","slideInLeft","slideInRight"]},{type:"slide out",values:["slideOutUp","slideOutDown","slideOutLeft","slideOutRight"]},{type:"fade in",values:["fadeIn","fadeInUp","fadeInDown","fadeInLeft","fadeInRight"]},{type:"fade out",values:["fadeOut","fadeOutUp","fadeOutDown","fadeOutLeft","fadeOutRight"]},{type:"zoom in",values:["zoomIn","zoomInUp","zoomInDown","zoomInLeft","zoomInRight"]},{type:"zoom out",values:["zoomOut","zoomOutUp","zoomOutDown","zoomOutLeft","zoomOutRight"]},{type:"bounce in",values:["bounceIn","bounceInUp","bounceInDown","bounceInLeft","bounceInRight"]},{type:"bounce out",values:["bounceOut","bounceOutUp","bounceOutDown","bounceOutLeft","bounceOutRight"]},{type:"flip in",values:["flipInX","flipInY"]},{type:"flip out",values:["flipOutX","flipOutY"]},{type:"scale in",values:["scaleInX","scaleInY"]},{type:"scale out",values:["scaleOutX","scaleOutY"]},{type:"rotate in",values:["rotateIn"]},{type:"rotate out",values:["rotateOut"]}];function d(){const d=e.useMemo((()=>({isText:!1,isMulti:!1,selectedVariant:"slideInUp"})),[]),[p,r]=e.useState(d.isText),[f,c]=e.useState(d.isMulti),[m,I]=e.useState(d.selectedVariant);return t.jsxs(o,{children:[t.jsx(u,{children:t.jsx(a,{xs:24,md:18,children:t.jsx(i,{isText:p,onChnageText:()=>r(!p),isMulti:f,onChangeMulti:()=>c(!f),onRefresh:()=>{r(d.isText),c(d.isMulti),I(d.selectedVariant)}})})}),t.jsxs(u,{justify:"space-between",children:[t.jsx(a,{xs:24,md:18,children:t.jsx(s,{variant:m,isText:p,isMulti:f})}),t.jsx(a,{xs:24,md:5,children:t.jsx(n,{variantKey:l,selectedVariant:m,onChangeVarient:e=>I(e)})})]})]})}export{d as default};
