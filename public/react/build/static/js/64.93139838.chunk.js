(this.webpackJsonp=this.webpackJsonp||[]).push([[64,132],{CWnV:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t("q1tI"),r=l(a),i=l(t("ProS"));function l(e){return e&&e.__esModule?e:{default:e}}t("jett"),n.default=function(e){var n=e.data;return(0,a.useEffect)((function(){var e,t,a,r;n&&(e=n,t=document.getElementById("radar"),a=i.default.init(t),r={color:["#f8e367","#99dfff","#58c0f0","#5ea6ff","#ff9e48","#bcbcbc"],title:{show:!1},legend:{data:["个人能力(personal)","社区平均(average)"],top:"3%",right:"center"},tooltip:{trigger:"item"},radar:{indicator:[{name:"影响力",max:100},{name:"贡献度",max:100},{name:"活跃度",max:100},{name:"项目经验",max:100},{name:"语言能力",max:100}],center:["50%","55%"]},series:[{name:"",type:"radar",data:[{value:e.user&&[e.user.influence,e.user.contribution,e.user.activity,e.user.experience,e.user.language],name:"个人能力(personal)"},{value:e.platform&&[e.platform.influence,e.platform.contribution,e.platform.activity,e.platform.experience,e.platform.language],name:"社区平均(average)"}]}]},a.setOption(r))}),[n]),r.default.createElement("div",{id:"radar",style:{height:"400px"}})}},UDYe:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t("q1tI"),r=l(a),i=l(t("5j6D"));function l(e){return e&&e.__esModule?e:{default:e}}n.default=function(e){var n=e.data;return(0,a.useEffect)((function(){n&&function(e){for(var n=new i.default(document.getElementById("cloud")),t=e.categories,a=[],r=0;r<t.length;r++)a.push([t[r],t.length-r]);n.setOption({backgroundColor:"transparent",shape:"circle",ellipticity:1,maxFontSize:21,minFontSize:16,tooltip:{show:!1},list:a,color:function(e,n,t,a,r){switch(t){case 21:return"#f8e367";case 20:return"#99dfff";case 19:return"#ff9e48";case 18:return"#5ea6ff";case 17:return"#58c0f0";default:return"#bcbcbc"}}})}(n)}),[n]),r.default.createElement("div",{id:"cloud",style:{height:"120px"}})}},dJxk:function(e,n,t){},kb7D:function(e,n,t){},nAGc:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t("q1tI"),r=l(a),i=l(t("ProS"));function l(e){return e&&e.__esModule?e:{default:e}}t("wDdD"),n.default=function(e){var n=e.data;return(0,a.useEffect)((function(){var e,t,a,r;n&&(e=n,t=document.getElementById("Pie"),a=i.default.init(t),r={color:["#f8e367","#5ea6ff","#ff9e48","#99dfff"],title:{show:!1},tooltip:{trigger:"item"},legend:{top:"5%",right:"center"},series:[{name:"",type:"pie",radius:["40%","70%"],avoidLabelOverlap:!1,itemStyle:{borderRadius:10,borderColor:"#fff",borderWidth:2},label:{show:!1,position:"center"},emphasis:{label:{show:!0,fontSize:"40",fontWeight:"bold"}},labelLine:{show:!1},data:[{value:e.developer&&e.developer.count,name:"开发者"},{value:e.manager&&e.manager.count,name:"管理员"},{value:e.owner&&e.owner.count,name:"创建者"},{value:e.reporter&&e.reporter.count,name:"报告者"}]}]},a.setOption(r))}),[n]),r.default.createElement("div",{id:"Pie",style:{height:"400px"}})}},"oe+v":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=x(t("+eQT")),r=function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,n){var t=[],a=!0,r=!1,i=void 0;try{for(var l,o=e[Symbol.iterator]();!(a=(l=o.next()).done)&&(t.push(l.value),!n||t.length!==n);a=!0);}catch(e){r=!0,i=e}finally{try{!a&&o.return&&o.return()}finally{if(r)throw i}}return t}(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")};t("U8R4");var i=t("q1tI"),l=x(i);t("kb7D"),t("AH3D"),t("Ynxi"),t("0o9m"),t("2w7y");var o=x(t("nAGc")),d=x(t("UDYe")),c=x(t("CWnV")),u=x(t("qVDV")),p=x(t("wd/R")),f=t("spEH"),s=x(t("vDqi"));function x(e){return e&&e.__esModule?e:{default:e}}var m=a.default.RangePicker;n.default=function(e){var n=e.match.params.username,t=(0,i.useState)(void 0),a=r(t,2),x=a[0],g=a[1],b=(0,i.useState)([]),h=r(b,2),v=h[0],y=h[1],k=(0,i.useState)(void 0),E=r(k,2),w=E[0],B=E[1],D=(0,i.useState)([]),_=r(D,2),C=_[0],j=_[1],N=(0,i.useState)(void 0),A=r(N,2),S=A[0],M=A[1],F=(0,i.useState)(void 0),O=r(F,2),Y=O[0],P=O[1],G=(0,i.useState)(void 0),I=r(G,2),R=I[0],J=I[1],z=(0,i.useState)(void 0),W=r(z,2),q=W[0],U=W[1],L=function(e){return e&&e>(0,p.default)().endOf("day")};function V(){for(var e="#",n=["1","2","3","4","4","5","6","7","8","9","a","b","c","d","e","f"],t=0;t<6;t++){e+=n[parseInt(16*Math.random(),0)]}return e}return(0,i.useEffect)((function(){var e,t,a;e="/users/"+n+"/statistics/role.json",t=x&&x.length>0&&x[0]?Date.parse(x[0])/1e3:void 0,a=x&&x.length>0&&x[1]?Date.parse(x[1])/1e3:void 0,s.default.get(e,{params:{start_time:t,end_time:a}}).then((function(e){e&&e.data&&y(e.data.role)})).catch((function(e){}))}),[x]),(0,i.useEffect)((function(){var e,t,a;e="/users/"+n+"/statistics/develop.json",t=w&&w.length>0&&w[0]?Date.parse(w[0])/1e3:void 0,a=w&&w.length>0&&w[1]?Date.parse(w[1])/1e3:void 0,s.default.get(e,{params:{start_time:t,end_time:a}}).then((function(e){if(e&&e.data){j(e.data);var n=e.data.user&&e.data.user.each_language_score;if(n){var t=[];for(var a in n)t.push([a,n[a]]);t.sort((function(e,n){return n[1]-e[1]})),M(t.slice(0,3))}var r=e.data.user&&e.data.user.languages_percent,i=[];Object.keys(r).map((function(e,n){i.push({name:e,p:parseFloat(100*r[e]).toFixed(1),color:V()})})),P(i)}})).catch((function(e){}))}),[w]),(0,i.useEffect)((function(){var e,t,a;e="/users/"+n+"/statistics/major.json",t=R&&R.length>0&&R[0]?Date.parse(R[0])/1e3:void 0,a=R&&R.length>0&&R[1]?Date.parse(R[1])/1e3:void 0,s.default.get(e,{params:{start_time:t,end_time:a}}).then((function(e){e&&e.data&&U(e.data)})).catch((function(e){}))}),[R]),l.default.createElement("div",null,l.default.createElement("div",{className:"boxes"},l.default.createElement(f.FlexAJ,{style:{marginBottom:"15px"}},l.default.createElement("span",{className:"font-18"},"开发能力"),l.default.createElement(m,{disabledDate:L,onChange:function(e,n){B(n)},format:"YYYY-MM-DD"})),l.default.createElement("div",{className:"echartBox"},l.default.createElement("p",null,"从五个维度刻画你的开发能力：语言能力、影响力、贡献度、活跃度、项目经验，同时可以查看社区平均数据。"),l.default.createElement(c.default,{data:C}),S&&S.length>0&&l.default.createElement("div",{className:"roundBox"},l.default.createElement(u.default,{num:S[0][1],color:"#FF7F69",name:S[0][0]}),S[1]&&l.default.createElement(u.default,{num:S[1][1],color:"#99dfff",name:S[1][0]}),S[2]&&l.default.createElement(u.default,{num:S[2][1],color:"#ff9e48",name:S[2][0]})),Y&&l.default.createElement("div",{className:"pBox"},l.default.createElement("div",{className:"progress"},Y.map((function(e,n){return l.default.createElement("span",{key:e.name,style:{width:e.p+"%",backgroundColor:""+e.color}})}))),l.default.createElement("div",{className:"progresstip"},Y.map((function(e,n){return l.default.createElement("span",{key:e.name},l.default.createElement("i",{className:"zero",style:{backgroundColor:""+e.color}}),l.default.createElement("span",null,e.name),l.default.createElement("span",null,e.p+"%"))})))))),l.default.createElement("div",{className:"boxes"},l.default.createElement(f.FlexAJ,{style:{marginBottom:"15px"}},l.default.createElement("span",{className:"font-18"},"角色定位"),l.default.createElement(m,{disabledDate:L,onChange:function(e,n){g(n)},format:"YYYY-MM-DD"})),l.default.createElement("div",{className:"echartBox"},l.default.createElement("p",null,"根据你在项目开发过程中的工作，对你在项目中扮演的角色进行定位，包括：创建者、管理者、开发者、测试者、文档工作者等。"),l.default.createElement(o.default,{data:v}))),l.default.createElement("div",{className:"boxes"},l.default.createElement(f.FlexAJ,{style:{marginBottom:"15px"}},l.default.createElement("span",{className:"font-18"},"专业定位"),l.default.createElement(m,{disabledDate:L,onChange:function(e,n){J(n)},format:"YYYY-MM-DD"})),l.default.createElement("div",{className:"echartBox"},l.default.createElement("p",null,"展示你擅长、关注、感兴趣的专业范围，通过你参与项目、收藏项目、关注项目、复刻项目等数据来统计。"),l.default.createElement(d.default,{data:q}))))}},qVDV:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a,r=t("q1tI"),i=(a=r)&&a.__esModule?a:{default:a};t("dJxk"),n.default=function(e){var n=e.num,t=e.color,a=e.name;return i.default.createElement("div",{className:"annulusBasics"},i.default.createElement("div",{className:"centerCircle",style:{color:""+t}},i.default.createElement("span",null,i.default.createElement("span",{className:"score"},n),"分"),i.default.createElement("span",null,a)),i.default.createElement("div",{className:"annulusOuter",style:{border:"7px solid "+t}}),n>50?i.default.createElement("div",{className:"leftRectangle",style:{transform:"rotate("+3.6*(n-50)+"deg)"}}):i.default.createElement("div",{className:"leftRectangle"}),n<50?i.default.createElement("div",{className:"rightRectangle",style:{transform:"rotate("+3.6*n+"deg)"}}):i.default.createElement("div",{className:"rightRectangle",style:{background:t}}))}},spEH:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.GroupProjectBackgroup=n.Content=n.Cancel=n.GreenUnder=n.NumUl=n.Redback=n.Blueback=n.Greenback=n.Greenline=n.Redline=n.Blueline=n.WhiteBack=n.Gap=n.Short=n.ShortWidth=n.Long=n.LongWidth=n.Box=n.AlignAJBottom=n.AlignTop=n.AlignCenter=n.FlexAJ=n.AlignCenterBetween=n.Banner=void 0;var a,r=A(["{\n  padding:20px 25px;\n  color:#333;\n  font-size:18px;\n  border-bottom:1px solid #eee;\n  background-color:#fff;\n  border-radius:5px 5px 0px 0px;\n}"],["{\n  padding:20px 25px;\n  color:#333;\n  font-size:18px;\n  border-bottom:1px solid #eee;\n  background-color:#fff;\n  border-radius:5px 5px 0px 0px;\n}"]),i=A(["{\n  display:flex;\n  align-items: center;\n  padding: 14px 14px 14px 20px;\n  justify-content: space-between;\n  border-bottom:1px solid #eee;\n}"],["{\n  display:flex;\n  align-items: center;\n  padding: 14px 14px 14px 20px;\n  justify-content: space-between;\n  border-bottom:1px solid #eee;\n}"]),l=A(["{\n  display:flex;\n  align-items: center;\n  justify-content: space-between;\n}"],["{\n  display:flex;\n  align-items: center;\n  justify-content: space-between;\n}"]),o=A(["{\n  display:flex;\n  align-items: center;\n}"],["{\n  display:flex;\n  align-items: center;\n}"]),d=A(["{\n  display:flex;\n  align-items: flex-start;\n}"],["{\n  display:flex;\n  align-items: flex-start;\n}"]),c=A(["{\n  display:flex;\n  justify-content: space-between;\n  align-items: flex-end;\n}"],["{\n  display:flex;\n  justify-content: space-between;\n  align-items: flex-end;\n}"]),u=A(["{\n  display:flex;\n  align-items:flex-start;\n}"],["{\n  display:flex;\n  align-items:flex-start;\n}"]),p=A(["{\n  flex:1;\n  width:0;\n  border-radius:5px;\n  margin-bottom:30px;\n}"],["{\n  flex:1;\n  width:0;\n  border-radius:5px;\n  margin-bottom:30px;\n}"]),f=A(["{\n  width:78%;\n  border-radius:5px;\n  margin-bottom:30px;\n}"],["{\n  width:78%;\n  border-radius:5px;\n  margin-bottom:30px;\n}"]),s=A(["{\n  width:300px;\n  border-radius:5px;\n  margin-bottom:30px;\n}"],["{\n  width:300px;\n  border-radius:5px;\n  margin-bottom:30px;\n}"]),x=A(["{\n  flex:1;\n  border-radius:5px;\n  margin-bottom:30px;\n}"],["{\n  flex:1;\n  border-radius:5px;\n  margin-bottom:30px;\n}"]),m=A(["{\n  padding-left:20px;\n  box-sizing:border-box;\n}"],["{\n  padding-left:20px;\n  box-sizing:border-box;\n}"]),g=A(["{\n  background-color:#fff;\n  border-radius:5px;\n}"],["{\n  background-color:#fff;\n  border-radius:5px;\n}"]),b=A(["{\n  height:30px;\n  line-height:28px;\n  border-radius:2px;\n  border:1px solid rgba(80,145,255,1);\n  color:rgba(80,145,255,1);\n  padding:0px 12px;\n  display:inline-block;\n}"],["{\n  height:30px;\n  line-height:28px;\n  border-radius:2px;\n  border:1px solid rgba(80,145,255,1);\n  color:rgba(80,145,255,1);\n  padding:0px 12px;\n  display:inline-block;\n}"]),h=A(["{\n  height:30px;\n  line-height:28px;\n  border-radius:2px;\n  border:1px solid #F73030;\n  color:"," !important;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:80px;\n  text-align:center;\n  background:",";\n}"],["{\n  height:30px;\n  line-height:28px;\n  border-radius:2px;\n  border:1px solid #F73030;\n  color:"," !important;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:80px;\n  text-align:center;\n  background:",";\n}"]),v=A(["{\n  height:30px;\n  line-height:28px;\n  border-radius:2px;\n  border:1px solid #28BD6C;\n  color:"," !important;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:80px;\n  text-align:center;\n  background:",";\n}"],["{\n  height:30px;\n  line-height:28px;\n  border-radius:2px;\n  border:1px solid #28BD6C;\n  color:"," !important;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:80px;\n  text-align:center;\n  background:",";\n}"]),y=A(["{\n  height:30px;\n  line-height:30px;\n  border-radius:2px;\n  background-color:#28BD6C;\n  color:#fff;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:80px;\n  text-align:center;\n}"],["{\n  height:30px;\n  line-height:30px;\n  border-radius:2px;\n  background-color:#28BD6C;\n  color:#fff;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:80px;\n  text-align:center;\n}"]),k=A(["{\n  height:30px;\n  line-height:30px;\n  border-radius:2px;\n  background-color:rgba(80,145,255,1);\n  color:#fff!important;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:80px;\n  text-align:center;\n}"],["{\n  height:30px;\n  line-height:30px;\n  border-radius:2px;\n  background-color:rgba(80,145,255,1);\n  color:#fff!important;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:80px;\n  text-align:center;\n}"]),E=A(["{\n  height:30px;\n  line-height:30px;\n  border-radius:2px;\n  background-color:#F73030;\n  color:#fff;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:80px;\n  text-align:center;\n}"],["{\n  height:30px;\n  line-height:30px;\n  border-radius:2px;\n  background-color:#F73030;\n  color:#fff;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:80px;\n  text-align:center;\n}"]),w=A(["{\n  padding-left: 20px;\n  & > li{\n    list-style-type: decimal;\n    color:#888;\n    height:24px;\n    line-height:24px;\n  }\n}"],["{\n  padding-left: 20px;\n  & > li{\n    list-style-type: decimal;\n    color:#888;\n    height:24px;\n    line-height:24px;\n  }\n}"]),B=A(["{\n  color:#28BD6C!important;\n  position:relative;\n  &:after{\n    position:absolute;\n    bottom:-2px;\n    left:0px;\n    width:100%;\n    height:1px;\n    content:'';\n    background:#28BD6C;\n  }\n}"],["{\n  color:#28BD6C!important;\n  position:relative;\n  &:after{\n    position:absolute;\n    bottom:-2px;\n    left:0px;\n    width:100%;\n    height:1px;\n    content:'';\n    background:#28BD6C;\n  }\n}"]),D=A(["{\n  height:32px;\n  line-height:32px;\n  border-radius:2px;\n  background-color:#BBBBBB;\n  color:#fff;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:64px;\n  text-align:center;\n  letter-spacing: 4px;\n}"],["{\n  height:32px;\n  line-height:32px;\n  border-radius:2px;\n  background-color:#BBBBBB;\n  color:#fff;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:64px;\n  text-align:center;\n  letter-spacing: 4px;\n}"]),_=A(["{\n  width:1200px;\n  margin:20px auto;\n  text-align:center;\n  display:flex;\n  align-Items:center;\n  background-color:#fff;\n  justify-content: center;\n}"],["{\n  width:1200px;\n  margin:20px auto;\n  text-align:center;\n  display:flex;\n  align-Items:center;\n  background-color:#fff;\n  justify-content: center;\n}"]),C=A(["{\n  background:#fafafa;\n  padding:20px 30px;\n  width:100%;\n}"],["{\n  background:#fafafa;\n  padding:20px 30px;\n  width:100%;\n}"]),j=t("vOnD"),N=(a=j)&&a.__esModule?a:{default:a};function A(e,n){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}n.Banner=N.default.div(r),n.AlignCenterBetween=N.default.div(i),n.FlexAJ=N.default.div(l),n.AlignCenter=N.default.div(o),n.AlignTop=N.default.div(d),n.AlignAJBottom=N.default.div(c),n.Box=N.default.div(u),n.LongWidth=N.default.div(p),n.Long=N.default.div(f),n.ShortWidth=N.default.div(s),n.Short=N.default.div(x),n.Gap=N.default.div(m),n.WhiteBack=N.default.div(g),n.Blueline=N.default.a(b),n.Redline=N.default.a(h,(function(e){return e.bold?"#fff":"#F73030"}),(function(e){return e.bold?"#F73030":"#fff"})),n.Greenline=N.default.a(v,(function(e){return e.bold?"#fff":"#28BD6C"}),(function(e){return e.bold?"#28BD6C":"#fff"})),n.Greenback=N.default.a(y),n.Blueback=N.default.a(k),n.Redback=N.default.a(E),n.NumUl=N.default.ul(w),n.GreenUnder=N.default.a(B),n.Cancel=N.default.a(D),n.Content=N.default.div(_),n.GroupProjectBackgroup=N.default.div(C)}}]);