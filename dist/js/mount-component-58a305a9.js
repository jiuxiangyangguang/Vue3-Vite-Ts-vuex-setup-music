import{b3 as n,x as o,a9 as e,e as t}from"./index-f678d2ce.js";function s(){const n=o({show:!1}),s=o=>{n.show=o},a=o=>{t(n,o,{transitionAppear:!0}),s(!0)},u=()=>s(!1);return e({open:a,close:u,toggle:s}),{open:a,close:u,state:n,toggle:s}}function a(o){const e=n(o),t=document.createElement("div");return document.body.appendChild(t),{instance:e.mount(t),unmount(){e.unmount(),document.body.removeChild(t)}}}export{a as m,s as u};