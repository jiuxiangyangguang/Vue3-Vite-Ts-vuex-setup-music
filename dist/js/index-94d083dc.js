import{T as s,d as a,X as e,a8 as o,bk as t,c as l,m as n,au as i,P as c,a4 as r,a3 as d,bl as m,an as u,I as y,aQ as p,af as k,a6 as v}from"./index-f678d2ce.js";let g=0;const[b,w]=s("toast"),f=["show","overlay","teleport","transition","overlayClass","overlayStyle","closeOnClickOverlay"];const C=v(a({name:b,props:{icon:String,show:Boolean,type:r("text"),overlay:Boolean,message:d,iconSize:d,duration:m(2e3),position:r("middle"),teleport:[String,Object],wordBreak:String,className:u,iconPrefix:String,transition:r("van-fade"),loadingType:String,forbidClick:Boolean,overlayClass:u,overlayStyle:Object,closeOnClick:Boolean,closeOnClickOverlay:Boolean},emits:["update:show"],setup(s,{emit:a,slots:r}){let d,m=!1;const u=()=>{const a=s.show&&s.forbidClick;m!==a&&(m=a,m?(g||document.body.classList.add("van-toast--unclickable"),g++):g&&(g--,g||document.body.classList.remove("van-toast--unclickable")))},v=s=>a("update:show",s),b=()=>{s.closeOnClick&&v(!1)},C=()=>clearTimeout(d),S=()=>{const{icon:a,type:e,iconSize:o,iconPrefix:t,loadingType:n}=s;return a||"success"===e||"fail"===e?l(y,{name:a||e,size:o,class:w("icon"),classPrefix:t},null):"loading"===e?l(p,{class:w("loading"),size:o,type:n},null):void 0},h=()=>{const{type:a,message:e}=s;return r.message?l("div",{class:w("text")},[r.message()]):k(e)&&""!==e?"html"===a?l("div",{key:0,class:w("text"),innerHTML:String(e)},null):l("div",{class:w("text")},[e]):void 0};return e((()=>[s.show,s.forbidClick]),u),e((()=>[s.show,s.type,s.message,s.duration]),(()=>{C(),s.show&&s.duration>0&&(d=setTimeout((()=>{v(!1)}),s.duration))})),o(u),t(u),()=>l(c,n({class:[w([s.position,"normal"===s.wordBreak?"break-normal":s.wordBreak,{[s.type]:!s.icon}]),s.className],lockScroll:!1,onClick:b,onClosed:C,"onUpdate:show":v},i(s,f)),{default:()=>[S(),h()]})}}));export{C as T};
