import{j as i,T as s,P as e}from"./index-a09fe141.js";import{C as n}from"./index-50a70862.js";const a=[{country:"Germany",iconify:"twemoji:flag-germany",android:"9.91k",windows:"1.95k",ios:"1.95k"},{country:"China",iconify:"twemoji:flag-china",android:"1.95k",windows:"9.25k",ios:"7.95k"},{country:"Australia",iconify:"twemoji:flag-australia",android:"3.91k",windows:"2.95k",ios:"4.95k"},{country:"France",iconify:"twemoji:flag-france",android:"3.28k",windows:"2.29k",ios:"8.95k"},{country:"USA",iconify:"twemoji:flag-united-states",android:"8.81k",windows:"7.05k",ios:"4.35k"}],o=s=>{let n;return"android"===s&&(n=i.jsx(e,{icon:"uiw:android"})),"windows"===s&&(n=i.jsx(e,{icon:"mingcute:windows-fill"})),n=i.jsx(e,{icon:"wpf:mac-os"}),i.jsx("div",{className:"mr-1 text-xs text-gray",children:n})};function r(){return i.jsxs(n,{className:"flex-col",children:[i.jsx("header",{className:"self-start",children:i.jsx(s.Title,{level:5,children:"Top Installed Countries"})}),i.jsx("main",{className:"w-full",children:a.map((s=>i.jsxs("div",{className:"mb-4 flex items-center",children:[i.jsx(e,{icon:s.iconify,size:30}),i.jsx("span",{className:"mx-2 font-medium",children:s.country}),i.jsxs("div",{className:"ml-auto flex",children:[i.jsxs("div",{className:"flex items-center justify-center",children:[o("android"),s.android]}),i.jsxs("div",{className:"mx-2 flex items-center justify-center",children:[o("windows"),s.windows]}),i.jsxs("div",{className:"flex items-center justify-center",children:[o("ios"),s.ios]})]})]},s.country)))})]})}export{r as default};
