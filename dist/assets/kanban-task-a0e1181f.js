import{r as e,U as s,d as a,aC as r,aD as o,V as t,j as i,a6 as n,P as l,aE as c,O as d,h as x,a7 as m,aq as g}from"./index-a09fe141.js";import p from"./task-detail-06e7b850.js";import{I as h}from"./index-445addad.js";import{A as j}from"./index-5babea55.js";import{S as u}from"./index-1bc1a1bb.js";var b=(e=>(e.LOW="Low",e.MEDIUM="Medium",e.HIGH="High",e))(b||{}),f=(e=>(e.frontend="FrontEnd",e.backend="BackEnd",e.fullstack="FullStack",e.DevOps="DevOps",e.AI="AI",e.DBA="DBA",e.UI="UI",e.UE="UE",e.QA="QA",e))(f||{}),k=(e=>(e.COLUMN="column",e.TASK="task",e))(k||{});const v=e.memo((function({index:x,task:m}){const{themeMode:g}=s(),[b,f]=e.useState(!1),k=a(),v={backdropFilter:"blur(20px)",backgroundImage:`url("${r}"), url("${o}")`,backgroundRepeat:"no-repeat, no-repeat",backgroundColor:t(k.colorBgContainer).alpha(.9).toString(),backgroundPosition:"right top, left bottom",backgroundSize:"50, 50%"},{id:I,title:N,comments:z=[],attachments:S=[],priority:$,assignee:M}=m;return i.jsxs(i.Fragment,{children:[i.jsx(n,{draggableId:I,index:x,children:(e,s)=>i.jsx(D,{ref:e.innerRef,...e.draggableProps,...e.dragHandleProps,$isDragging:s.isDragging,$themeMode:g,children:i.jsxs("div",{children:[S.length>0&&i.jsx(h,{src:S[0],alt:"",className:"mb-4 rounded-md"}),i.jsxs("div",{onClick:()=>f(!0),children:[i.jsx("div",{className:"flex justify-end",children:i.jsx(y,{taskPriority:$})}),i.jsx("div",{children:N}),i.jsxs("div",{className:"mt-4 flex items-center justify-between",children:[i.jsxs("div",{className:"flex items-center text-base text-gray-600",children:[i.jsx(l,{icon:"uim:comment-dots",size:16,className:"mr-1"}),i.jsx("span",{className:"text-xs",children:z.length}),i.jsx(l,{icon:"iconamoon:attachment-bold",size:16,className:"ml-2 mr-1"}),i.jsx("span",{className:"text-xs",children:S.length})]}),M?.length&&i.jsx(j.Group,{maxCount:3,maxStyle:{color:k.colorPrimary,backgroundColor:k.colorPrimaryBg},children:M.map((e=>i.jsx(j,{src:e},e)))})]})]})]})})}),i.jsx(c,{placement:"right",title:i.jsxs("div",{className:"flex items-center justify-between",children:[i.jsx("div",{children:i.jsx(u,{defaultValue:"To do",size:"large",variant:"borderless",dropdownStyle:{width:"auto"},options:[{value:"To do",label:"To do"},{value:"In progress",label:"In progress"},{value:"Done",label:"Done"}]})}),i.jsxs("div",{className:"flex text-gray",children:[i.jsx(d,{children:i.jsx(l,{icon:"solar:like-bold",size:20,color:k.colorSuccess})}),i.jsx(d,{children:i.jsx(l,{icon:"solar:trash-bin-trash-bold",size:20})}),i.jsx(d,{children:i.jsx(l,{icon:"fontisto:more-v-a",size:20})})]})]}),onClose:()=>f(!1),open:b,closable:!1,width:420,styles:{body:{padding:0},mask:{backgroundColor:"transparent"}},style:v,children:i.jsx(p,{task:m})})]})}));function y({taskPriority:e}){const{colorSuccess:s,colorInfo:r,colorWarning:o}=a();switch(e){case b.HIGH:return i.jsx(x,{icon:"ic_rise",size:20,color:o,className:""});case b.MEDIUM:return i.jsx(x,{icon:"ic_rise",size:20,color:s,className:"rotate-90"});case b.LOW:return i.jsx(x,{icon:"ic_rise",size:20,color:r,className:"rotate-180"})}}const D=m.div`
  width: 248px;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  font-weight: 400;
  font-size: 12px;
  background-color: ${e=>e.$themeMode===g.Light?e.$isDragging?"rgba(255, 255, 255, 0.48)":"rgb(255, 255, 255)":e.$isDragging?"rgba(22, 28, 36, 0.48)":"rgb(22, 28, 36)"};
  backdrop-filter: ${e=>e.$isDragging?"blur(6px)":""};

  &:hover {
    box-shadow: ${e=>e.$themeMode===g.Light?"rgba(145, 158, 171, 0.16) 0px 20px 40px -4px":"rgba(0, 0, 0, 0.16) 0px 20px 40px -4px"};
  }
`,I=Object.freeze(Object.defineProperty({__proto__:null,default:v},Symbol.toStringTag,{value:"Module"}));export{k as D,v as K,b as T,f as a,I as k};
