import{T as n,e as o,am as a,a4 as i,a3 as e,d as l,b7 as t,bm as s,c as d,I as r,aN as c,aQ as g,a6 as u}from"./index-f678d2ce.js";const[p,b]=n("button");const f=u(l({name:p,props:o({},a,{tag:i("button"),text:String,icon:String,type:i("default"),size:i("normal"),color:String,block:Boolean,plain:Boolean,round:Boolean,square:Boolean,loading:Boolean,hairline:Boolean,disabled:Boolean,iconPrefix:String,nativeType:i("button"),loadingSize:e,loadingText:String,loadingType:String,iconPosition:i("left")}),emits:["click"],setup(n,{emit:o,slots:a}){const i=t(),e=()=>n.loading?a.loading?a.loading():d(g,{size:n.loadingSize,type:n.loadingType,class:b("loading")},null):a.icon?d("div",{class:b("icon")},[a.icon()]):n.icon?d(r,{name:n.icon,class:b("icon"),classPrefix:n.iconPrefix},null):void 0,l=()=>{let o;if(o=n.loading?n.loadingText:a.default?a.default():n.text,o)return d("span",{class:b("text")},[o])},u=()=>{const{color:o,plain:a}=n;if(o){const n={color:a?o:"white"};return a||(n.background=o),o.includes("gradient")?n.border=0:n.borderColor=o,n}},p=a=>{n.loading?c(a):n.disabled||(o("click",a),i())};return()=>{const{tag:o,type:a,size:i,block:t,round:r,plain:c,square:g,loading:f,disabled:x,hairline:m,nativeType:y,iconPosition:B}=n,S=[b([a,i,{plain:c,block:t,round:r,square:g,loading:f,disabled:x,hairline:m}]),{[s]:m}];return d(o,{type:y,class:S,style:u(),disabled:x,onClick:p},{default:()=>[d("div",{class:b("content")},["left"===B&&e(),l(),"right"===B&&e()])]})}}}));export{f as B};
