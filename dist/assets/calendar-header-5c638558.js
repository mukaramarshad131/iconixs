import{a2 as e,r as i,j as s,P as n,a3 as a,B as l,O as t}from"./index-a09fe141.js";import{d as o}from"./dayjs.min-aa5ebecd.js";function r({now:r,view:c,onMove:d,onCreate:m,onViewTypeChange:x}){const{screenMap:j}=e(),y=i.useMemo((()=>[{key:"1",label:"Month",view:"dayGridMonth",icon:s.jsx(n,{icon:"mdi:calendar-month-outline",size:18})},{key:"2",label:"Week",view:"timeGridWeek",icon:s.jsx(n,{icon:"mdi:calendar-weekend-outline",size:18})},{key:"3",label:"Day",view:"timeGridDay",icon:s.jsx(n,{icon:"mdi:calendar-today-outline",size:18})},{key:"4",label:"List",view:"listWeek",icon:s.jsx(n,{icon:"mdi:view-agenda-outline",size:18})}]),[]);return s.jsxs("div",{className:"relative flex items-center justify-between py-5",children:[j.lg&&s.jsx(a,{menu:{items:y,onClick:e=>{const i=y.find((i=>i.key===e.key));x(i.view)}},children:s.jsx(l,{type:"text",size:"small",children:(e=>{const{icon:i,label:a}=y.find((i=>i.view===e));return s.jsxs("div",{className:"flex items-center",children:[i,s.jsx("span",{className:"mx-1 !text-sm font-medium",children:a}),s.jsx(n,{icon:"solar:alt-arrow-down-outline",size:20})]})})(c)})}),s.jsxs("div",{className:"flex cursor-pointer items-center justify-center",children:[s.jsx(t,{children:s.jsx(n,{icon:"solar:alt-arrow-left-outline",onClick:()=>d("prev"),size:20})}),s.jsx("span",{className:"mx-2 text-base font-bold",children:o(r).format("DD MMM YYYY")}),s.jsx(t,{children:s.jsx(n,{icon:"solar:alt-arrow-right-outline",onClick:()=>d("next"),size:20})})]}),s.jsxs("div",{className:"flex items-center",children:[s.jsx(l,{type:"primary",onClick:()=>d("today"),children:"Today"}),s.jsx(l,{className:"ml-2",type:"primary",onClick:()=>m(),children:s.jsxs("div",{className:" flex items-center justify-center",children:[s.jsx(n,{icon:"material-symbols:add",size:24}),"New Event"]})})]})]})}export{r as default};
