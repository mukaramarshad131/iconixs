import{c as e,j as a}from"./index-a09fe141.js";import{A as s,c as t}from"./query-8c0888dc.js";import{u as i}from"./useQuery-dd61d617.js";function r(){const{firstName:r,lastName:o,phoneNumber:l,email:m,id:p}=e(),{data:n}=i(s,{variables:{id:"664304"}}),{data:d}=i(t,{variables:{user_id:p,filter:"all",order_by:"DATE_DESC",should_paginate:!1,is_active:!0,with_all_statuses:!0}});return a.jsx("div",{className:"p-2",children:a.jsx("iframe",{style:{width:"100%",height:"100vh"},src:` https://express.care-staging.openloophealth.com/book-appointment?appointmentTypeId=156071&providerId=1322376&email=${m}&firstName=${r}&lastName=${o}&phoneNumber=${l}`,title:"W3Schools Free Online Web Tutorials"})})}export{r as default};
