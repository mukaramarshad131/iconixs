import{a7 as e,d as s,j as i,T as l,g as a,Y as r,h as c}from"./index-a09fe141.js";import{d as n}from"./dayjs.min-aa5ebecd.js";import{A as d}from"./index-5babea55.js";import{D as t}from"./index-7394488d.js";import{R as x}from"./index-6fe50528.js";import{I as m}from"./index-74b431e6.js";import{I as o}from"./index-445addad.js";import"./index-7bfc5be7.js";import"./useIcons-3bc6d994.js";import"./SearchOutlined-03807928.js";import"./index-d00d9c03.js";import"./EyeOutlined-4d65de98.js";import"./addEventListener-cd37af0c.js";function j({task:e}){const{title:j,reporter:p,assignee:f=[],tags:v=[],date:u,priority:g,description:N,attachments:b,comments:w=[]}=e,{colorInfo:y,colorWarning:z,colorSuccess:D}=s();return i.jsxs(i.Fragment,{children:[i.jsxs(h,{children:[i.jsx("div",{className:"item",children:i.jsx(l.Title,{level:4,children:j})}),i.jsxs("div",{className:"item",children:[i.jsx("div",{className:"label",children:"Reporter"}),i.jsx(d,{shape:"circle",src:p,size:40})]}),i.jsxs("div",{className:"item",children:[i.jsx("div",{className:"label",children:"Assignee"}),i.jsx(a,{children:f.map(((e,s)=>i.jsx(d,{shape:"circle",src:e,size:40},s)))})]}),i.jsxs("div",{className:"item",children:[i.jsx("div",{className:"label",children:"Tag"}),i.jsx(a,{wrap:!0,children:v.map((e=>i.jsx(r,{color:y,children:e},e)))})]}),i.jsxs("div",{className:"item",children:[i.jsx("div",{className:"label",children:"Due Date"}),i.jsx(t,{variant:"borderless",value:n(u)})]}),i.jsxs("div",{className:"item",children:[i.jsx("div",{className:"label",children:"Priority"}),i.jsx("div",{children:i.jsx(x.Group,{defaultValue:g,children:i.jsxs(a,{children:[i.jsxs(x.Button,{value:"High",children:[i.jsx(c,{icon:"ic_rise",size:20,color:z}),i.jsx("span",{children:"High"})]}),i.jsxs(x.Button,{value:"Medium",children:[i.jsx(c,{icon:"ic_rise",size:20,color:D,className:"rotate-90"}),i.jsx("span",{children:"Medium"})]}),i.jsxs(x.Button,{value:"Low",children:[i.jsx(c,{icon:"ic_rise",size:20,color:y,className:"rotate-180"}),i.jsx("span",{children:"Low"})]})]})})})]}),i.jsxs("div",{className:"item",children:[i.jsx("div",{className:"label",children:"Description"}),i.jsx(m.TextArea,{defaultValue:N})]}),i.jsxs("div",{className:"item",children:[i.jsx("div",{className:"label",children:"Attachments"}),i.jsx(a,{wrap:!0,children:b?.map((e=>i.jsx(o,{src:e,width:62,height:62,className:"rounded-lg"},e)))})]})]}),i.jsx("div",{className:"flex flex-col gap-4",style:{padding:"24px 20px 40px"},children:w?.map((({avatar:e,username:s,content:a,time:r})=>i.jsxs("div",{className:"flex gap-4",children:[i.jsx(d,{src:e,size:40,className:"flex-shrink-0"}),i.jsxs("div",{className:"flex flex-grow flex-col flex-wrap gap-1 text-gray",children:[i.jsxs("div",{className:"flex justify-between",children:[i.jsx(l.Text,{children:s}),i.jsx(l.Text,{children:n(r).format("DD/MM/YYYY HH:mm")})]}),i.jsx("p",{children:a})]})]},s)))})]})}const h=e.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 20px 40px;
  .item {
    display: flex;
    align-items: center;
  }
  .label {
    text-align: left;
    font-size: 0.75rem;
    font-weight: 600;
    width: 100px;
    flex-shrink: 0;
    color: rgb(99, 115, 129);
    height: 40px;
    line-height: 40px;
  }
`;export{j as default};
