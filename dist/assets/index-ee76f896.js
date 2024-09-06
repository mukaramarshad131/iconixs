import{q as s,r as e,j as t,ay as a,a4 as r,a5 as n,B as o,P as i}from"./index-a09fe141.js";import{u as l,K as c}from"./kanban-column-315f329c.js";import{T as d,a as m,D as u}from"./kanban-task-a0e1181f.js";import{I as p}from"./index-74b431e6.js";import"./task-detail-06e7b850.js";import"./dayjs.min-aa5ebecd.js";import"./index-5babea55.js";import"./index-7bfc5be7.js";import"./index-7394488d.js";import"./useIcons-3bc6d994.js";import"./SearchOutlined-03807928.js";import"./index-6fe50528.js";import"./index-d00d9c03.js";import"./index-445addad.js";import"./EyeOutlined-4d65de98.js";import"./addEventListener-cd37af0c.js";import"./index-1bc1a1bb.js";import"./List-76f4e9dc.js";const k=e=>{const t=[];for(let a=0;a<e;a+=1)t.push({username:s.person.fullName(),avatar:s.image.avatarLegacy(),content:s.lorem.lines({min:1,max:3}),time:s.date.past()});return t},f=e=>{const t=[];for(let a=0;a<e;a+=1)t.push(s.image.urlPicsumPhotos());return t},g=e=>{const t=[];for(let a=0;a<e;a+=1)t.push(s.image.avatarLegacy());return t},x=e=>{const t=[],a=new Set;for(;t.length<e;){const e=s.helpers.enumValue(m);a.has(e)||(t.push(e),a.add(e))}return t},j={tasks:{"task-1":{id:"task-1",title:s.lorem.words(3),reporter:s.image.avatarLegacy(),priority:d.LOW,tags:[],comments:[],attachments:[]},"task-2":{id:"task-2",title:s.lorem.words(3),reporter:s.image.avatarLegacy(),assignee:g(1),date:s.date.future(),priority:d.HIGH,tags:x(3),comments:k(1),attachments:f(4)},"task-3":{id:"task-3",title:s.lorem.words(4),reporter:s.image.avatarLegacy(),assignee:g(2),priority:d.MEDIUM,date:s.date.future(),tags:x(2),comments:k(2),attachments:[]},"task-4":{id:"task-4",title:s.lorem.words(5),reporter:s.image.avatar(),assignee:g(3),priority:d.MEDIUM,tags:x(3),date:s.date.future(),description:s.lorem.lines(5),attachments:[],comments:k(3)},"task-5":{id:"task-5",title:s.lorem.words(4),reporter:s.image.avatar(),priority:d.HIGH,assignee:g(4),tags:x(4),date:s.date.future(),description:s.lorem.lines(3),attachments:[],comments:k(4)},"task-6":{id:"task-6",title:s.lorem.words(5),reporter:s.image.avatar(),priority:d.LOW,assignee:g(5),tags:x(5),date:s.date.future(),description:s.lorem.lines(4),attachments:f(5),comments:k(4)}},columns:{"column-1":{id:"column-1",title:"To do",taskIds:["task-1","task-2","task-3"]},"column-2":{id:"column-2",title:"In progress",taskIds:["task-4","task-5"]},"column-3":{id:"column-3",title:"Done",taskIds:["task-6"]}},columnOrder:["column-1","column-2","column-3"]};function I(){const[d,m]=e.useState(j),[k,f]=e.useState(!1),g=e.useRef(null);l("click",(e=>{if(g.current&&!g.current.input?.contains(e.target)){const e=g.current.input?.value;e&&x({id:s.string.uuid(),title:e,taskIds:[]}),f(!1)}}));const x=s=>{const e={...d,columns:{...d.columns,[s.id]:s},columnOrder:[...d.columnOrder,s.id]};m(e)},I=(s,e)=>{const t=d.columns[s],a={...d,tasks:{...d.tasks,[e.id]:e},columns:{...d.columns,[s]:{...t,taskIds:[...t.taskIds,e.id]}}};m(a)},h=s=>{const e=d.columns[s],t=Object.keys(d.tasks).filter((s=>!e.taskIds.includes(s))).reduce(((s,e)=>(s[e]=d.tasks[e],s)),{}),a=Object.keys(d.columns).filter((e=>e!==s)).reduce(((s,e)=>(s[e]=d.columns[e],s)),{}),r=Array.from(d.columnOrder).filter((e=>e!==s));m({tasks:t,columns:a,columnOrder:r})},y=s=>{const e=d.columns[s],t=Object.keys(d.tasks).filter((s=>!e.taskIds.includes(s))).reduce(((s,e)=>(s[e]=d.tasks[e],s)),{}),a={...d.columns,[s]:{...e,taskIds:[]}},r={...d,tasks:t,columns:a};m(r)},O=s=>{const{id:e,title:t}=s,a={...d.columns,[e]:{...d.columns[e],title:t}},r={...d,columns:a};m(r)};return t.jsx(a,{children:t.jsxs("div",{className:"flex",children:[t.jsx(r,{onDragEnd:s=>{const{source:e,destination:t,type:a}=s;t&&(t.droppableId===e.droppableId&&t.index===e.index||(a===u.COLUMN?(s=>{const{source:e,destination:t,draggableId:a}=s,r=Array.from(d.columnOrder);r.splice(e.index,1),r.splice(t.index,0,a);const n={...d,columnOrder:r};m(n)})(s):(s=>{const{source:e,destination:t,draggableId:a}=s,r=d.columns[e.droppableId],n=d.columns[t.droppableId];if(r===n){const s=Array.from(r.taskIds);s.splice(e.index,1),s.splice(t.index,0,a);const n={...r,taskIds:s},o={...d,columns:{...d.columns,[n.id]:n}};m(o)}else{const s=Array.from(r.taskIds);s.splice(e.index,1);const o={...r,taskIds:s},i=Array.from(n.taskIds);i.splice(t.index,0,a);const l={...n,taskIds:i},c={...d,columns:{...d.columns,[o.id]:o,[l.id]:l}};m(c)}})(s)))},children:t.jsx(n,{droppableId:"all-columns",direction:"horizontal",type:u.COLUMN,children:s=>t.jsxs("div",{ref:s.innerRef,...s.droppableProps,className:"flex h-full items-start gap-6 p-1",children:[d.columnOrder.map(((s,e)=>{const a=d.columns[s],r=a.taskIds.map((s=>d.tasks[s]));return t.jsx(c,{index:e,column:a,tasks:r,createTask:I,clearColumn:y,deleteColumn:h,renameColumn:O},s)})),s.placeholder]})})}),t.jsx("div",{className:"ml-[1.6rem] mt-[0.25rem] min-w-[280px]",children:k?t.jsx(p,{ref:g,size:"large",placeholder:"Column Name",autoFocus:!0}):t.jsxs(o,{onClick:s=>{s.stopPropagation(),f(!0)},className:"!inline-flex !w-full items-center justify-center !text-xs !font-semibold",block:!0,size:"large",children:[t.jsx(i,{icon:"carbon:add",size:20}),t.jsx("div",{children:"Add Column"})]})})]})})}export{I as default};
