import{d as a,u as s,a as l,b as e,f as n,g as i,h as o,c,C as t,n as r,F as d,l as u,I as m,b5 as v,as as g,z as p,A as f,B as k,t as b,q as C}from"./index-f678d2ce.js";import{D as j}from"./index-b46ef06d.js";import{N as x}from"./index-e2dd9337.js";import"./index-df442bcb.js";const z={class:"skin"},y={class:"top-box"},h={class:"card"},w={class:"title"},A=o("p",null,[r(" 进度条图标 "),o("span",null,"个性装扮,与众不同")],-1),F={class:"icon"},I=["onClick"],S={class:"flag"},V={class:"card"},_={class:"title"},q=o("p",null,[r(" 全局颜色 "),o("span",null,"进度条,提示框")],-1),B={class:"icon"},D=["onClick"],M={class:"flag"},N={class:"card"},U={class:"title"},E=o("p",null,[r(" 播放动效 "),o("span",{style:{color:"#fe010d"}},"实验阶段部分歌曲不支持")],-1),G={class:"icon"},H=["onClick"],J={class:"flag"},K=a({__name:"Skin",setup(a){const K=s(),L=l(),O=e((()=>K.state.skin.progress)),P=e((()=>K.state.skin.lineColor)),Q=e((()=>K.state.audio.animation.mode)),R=e({get:()=>K.state.audio.animation.flag,set(a){K.commit("setAntFlag",a)}}),T=["hhua","gtx","ljr","mgdz","zzx"],W=["#ff5345","#8d13a4","#f16325","#76e3de","zzx"],X=["circlewave","circlebar"];return(a,s)=>{const l=m,e=C,Y=v;return n(),i("div",z,[o("div",y,[c(l,{name:"down",onClick:s[0]||(s[0]=a=>t(L).go(-1))}),r(" 个性装扮 ")]),o("div",h,[o("div",w,[A,c(l,{name:"fire",color:"#ee0a24"})]),o("ul",F,[(n(),i(d,null,u(T,(a=>o("li",{class:g({active:O.value===a}),onClick:s=>{return l=a,void K.commit("setSkinIcon",{name:"progress",data:l});var l}},[c(e,{name:a,style:{"font-size":"30px"}},null,8,["name"]),p(o("div",S,[c(e,{name:"bj",class:"bj"})],512),[[f,O.value===a]])],10,I))),64))])]),o("div",V,[o("div",_,[q,c(l,{name:"fire",color:"#ee0a24"})]),o("ul",B,[(n(),i(d,null,u(W,(a=>o("li",{class:g({active:P.value===a}),style:k({backgroundColor:a}),onClick:s=>{return l=a,void K.commit("setSkinIcon",{name:"lineColor",data:l});var l}},[p(o("div",M,[c(e,{name:"bj",class:"bj"})],512),[[f,P.value===a]])],14,D))),64))])]),o("div",N,[o("div",U,[E,c(Y,{modelValue:R.value,"onUpdate:modelValue":s[1]||(s[1]=a=>R.value=a),size:"16","active-color":"#ee0a24","inactive-color":"#dcdee0"},null,8,["modelValue"])]),o("ul",G,[(n(),i(d,null,u(X,(a=>o("li",{class:g({active:Q.value===a}),style:k({backgroundColor:a}),onClick:s=>{return l=a,void(R.value?(K.commit("setAntMode",l),x({type:"warning",message:"音乐动效目前处于测试阶段"})):j.confirm({message:"是否开启音乐动画,该功能处于实验阶段"}).then((()=>{K.commit("setAntFlag",!0)})));var l}},[o("p",null,b("circlewave"===a?"动感圆波":"跳动节奏"),1),p(o("div",J,[c(e,{name:"bj",class:"bj"})],512),[[f,Q.value===a]])],14,H))),64))])])])}}});export{K as default};
