(this.webpackJsonp=this.webpackJsonp||[]).push([[112],{dEUZ:function(e,t,a){},p6ow:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=m(a("W9HT")),r=m(a("NUBc")),l=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var a=[],n=!0,r=!1,l=void 0;try{for(var u,i=e[Symbol.iterator]();!(n=(u=i.next()).done)&&(a.push(u.value),!t||a.length!==t);n=!0);}catch(e){r=!0,l=e}finally{try{!n&&i.return&&i.return()}finally{if(r)throw l}}return a}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};a("04bd"),a("YQTV");var u=a("q1tI"),i=m(u),o=a("spEH");a("dEUZ");var c=m(a("vDqi")),s=m(a("2CTR")),d=a("sYIF"),f=a("eO8H");function m(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=(0,u.useState)(void 0),a=l(t,2),m=a[0],p=a[1],h=(0,u.useState)(1),g=l(h,2),E=g[0],v=g[1],b=(0,u.useState)(0),y=l(b,2),w=y[0],x=y[1],N=(0,u.useState)(!0),S=l(N,2),_=S[0],I=S[1],j=e.match.params.owner,k=e.match.params.projectsId;return(0,u.useEffect)((function(){j&&k&&function(){I(!0);var e="/"+j+"/"+k+"/contributors.json";c.default.get(e,{params:{limit:20,page:E}}).then((function(e){e&&(p(e.data.contributors),x(e.data.total_count),I(!1))})).catch((function(e){}))}()}),[j,k,E]),i.default.createElement(o.WhiteBack,null,i.default.createElement(n.default,{spinning:_},i.default.createElement("div",{className:"boxPanel"},i.default.createElement("p",{className:"font-18 padding10-20",style:{borderBottom:"1px solid #eee"}},"贡献者列表"),m&&m.length>0?i.default.createElement("div",{className:"contrbuteList"},m.map((function(e,t){return i.default.createElement(o.AlignCenter,null,i.default.createElement("img",{alt:"",style:{borderRadius:"50%",marginRight:"10px"},src:(0,d.getImageUrl)("/"+e.image_url),width:"50px",height:"50px"}),i.default.createElement("div",null,i.default.createElement(f.Link,{to:"/"+e.login,className:"font-16"},e.name),i.default.createElement("p",{className:"font-12 color-grey-9"},"提交",e.contributions,"次")))}))):"",m&&0===m.length?i.default.createElement(s.default,{_html:"暂无贡献者"}):"",w>20?i.default.createElement("div",{className:"mt20 edu-txt-center"},i.default.createElement(r.default,{simple:!0,pageSize:20,onChange:function(e){v(e)},current:E,total:w})):"")))}}}]);