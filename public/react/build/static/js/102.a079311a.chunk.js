(this.webpackJsonp=this.webpackJsonp||[]).push([[102,132],{"8Or8":function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=c(t("q1tI")),r=t("spEH"),l=c(t("ess8")),a=c(t("rzEP")),d=t("eO8H"),o=c(t("CnBM")),p=c(t("HUFq"));function c(n){return n&&n.__esModule?n:{default:n}}var u=(0,o.default)({loader:function(){return Promise.all([t.e(23),t.e(135)]).then(t.t.bind(null,"gfdF",7))},loading:p.default}),f=(0,o.default)({loader:function(){return Promise.all([t.e(0),t.e(1),t.e(8),t.e(16),t.e(96)]).then(t.t.bind(null,"aQ+q",7))},loading:p.default}),x=(0,o.default)({loader:function(){return Promise.all([t.e(0),t.e(1),t.e(60),t.e(134)]).then(t.t.bind(null,"eWQA",7))},loading:p.default});e.default=function(n){var e=n.location.pathname,t=n.match.params.OIdentifier,o=n.match.params.groupId;var p=function(n){var e=0;return n==="/"+t+"/teams/"+o+"/setting/member"?e=1:n==="/"+t+"/teams/"+o+"/setting/project"&&(e=2),e}(e),c={list:[{name:"基本设置",icon:"icon-base",href:"/"+t+"/teams/"+o+"/setting"},{name:"团队成员管理",icon:"icon-zuzhichengyuan",href:"/"+t+"/teams/"+o+"/setting/member"},{name:"团队项目管理",icon:"icon-zuzhixiangmu",href:"/"+t+"/teams/"+o+"/setting/project"}],active:p};return i.default.createElement(r.Box,null,i.default.createElement(r.Short,null,i.default.createElement(a.default,{header:i.default.createElement(l.default,null,"团队设置"),nav:c})),i.default.createElement(r.Long,null,i.default.createElement(r.Gap,null,i.default.createElement(r.WhiteBack,{style:{border:"1px solid #eee"}},i.default.createElement(d.Switch,null,i.default.createElement(d.Route,{path:"/:OIdentifier/teams/:groupId/setting/project",render:function(){return i.default.createElement(x,n)}}),i.default.createElement(d.Route,{path:"/:OIdentifier/teams/:groupId/setting/member",render:function(){return i.default.createElement(f,n)}}),i.default.createElement(d.Route,{path:"/:OIdentifier/teams/:groupId/setting",render:function(){return i.default.createElement(u,n)}}))))))}},ess8:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,r,l=(i=["{\n  background-color:#fff;\n  padding:20px 30px;\n  border-bottom:1px solid #eee;\n  font-size:16px;\n  color:#333;\n  display:flex;\n  justify-content: space-between;\n  align-items:center;\n}"],r=["{\n  background-color:#fff;\n  padding:20px 30px;\n  border-bottom:1px solid #eee;\n  font-size:16px;\n  color:#333;\n  display:flex;\n  justify-content: space-between;\n  align-items:center;\n}"],Object.freeze(Object.defineProperties(i,{raw:{value:Object.freeze(r)}}))),a=d(t("q1tI"));function d(n){return n&&n.__esModule?n:{default:n}}var o=d(t("vOnD")).default.div(l);e.default=function(n){var e=n.children;return a.default.createElement(o,null,e)}},rzEP:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,r=t("q1tI"),l=(i=r)&&i.__esModule?i:{default:i},a=t("eO8H");e.default=function(n){var e=n.header,t=n.nav;return l.default.createElement("ul",{className:"list-l-Menu"},e,t&&t.list&&t.list.length>0?t.list.map((function(n,e){return l.default.createElement("li",{key:e,className:t.active===e?"active":""},l.default.createElement("p",null,l.default.createElement(a.Link,{to:n.href},l.default.createElement("i",{className:"iconfont "+(n.icon||"icon-huabanfuben")+" font-18 mr10"}),n.name)))})):"")}},spEH:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.GroupProjectBackgroup=e.Content=e.Cancel=e.GreenUnder=e.NumUl=e.Redback=e.Blueback=e.Greenback=e.Greenline=e.Redline=e.Blueline=e.WhiteBack=e.Gap=e.Short=e.ShortWidth=e.Long=e.LongWidth=e.Box=e.AlignAJBottom=e.AlignTop=e.AlignCenter=e.FlexAJ=e.AlignCenterBetween=e.Banner=void 0;var i,r=A(["{\n  padding:20px 25px;\n  color:#333;\n  font-size:18px;\n  border-bottom:1px solid #eee;\n  background-color:#fff;\n  border-radius:5px 5px 0px 0px;\n}"],["{\n  padding:20px 25px;\n  color:#333;\n  font-size:18px;\n  border-bottom:1px solid #eee;\n  background-color:#fff;\n  border-radius:5px 5px 0px 0px;\n}"]),l=A(["{\n  display:flex;\n  align-items: center;\n  padding: 14px 14px 14px 20px;\n  justify-content: space-between;\n  border-bottom:1px solid #eee;\n}"],["{\n  display:flex;\n  align-items: center;\n  padding: 14px 14px 14px 20px;\n  justify-content: space-between;\n  border-bottom:1px solid #eee;\n}"]),a=A(["{\n  display:flex;\n  align-items: center;\n  justify-content: space-between;\n}"],["{\n  display:flex;\n  align-items: center;\n  justify-content: space-between;\n}"]),d=A(["{\n  display:flex;\n  align-items: center;\n}"],["{\n  display:flex;\n  align-items: center;\n}"]),o=A(["{\n  display:flex;\n  align-items: flex-start;\n}"],["{\n  display:flex;\n  align-items: flex-start;\n}"]),p=A(["{\n  display:flex;\n  justify-content: space-between;\n  align-items: flex-end;\n}"],["{\n  display:flex;\n  justify-content: space-between;\n  align-items: flex-end;\n}"]),c=A(["{\n  display:flex;\n  align-items:flex-start;\n}"],["{\n  display:flex;\n  align-items:flex-start;\n}"]),u=A(["{\n  flex:1;\n  width:0;\n  border-radius:5px;\n  margin-bottom:30px;\n}"],["{\n  flex:1;\n  width:0;\n  border-radius:5px;\n  margin-bottom:30px;\n}"]),f=A(["{\n  width:78%;\n  border-radius:5px;\n  margin-bottom:30px;\n}"],["{\n  width:78%;\n  border-radius:5px;\n  margin-bottom:30px;\n}"]),x=A(["{\n  width:300px;\n  border-radius:5px;\n  margin-bottom:30px;\n}"],["{\n  width:300px;\n  border-radius:5px;\n  margin-bottom:30px;\n}"]),s=A(["{\n  flex:1;\n  border-radius:5px;\n  margin-bottom:30px;\n}"],["{\n  flex:1;\n  border-radius:5px;\n  margin-bottom:30px;\n}"]),g=A(["{\n  padding-left:20px;\n  box-sizing:border-box;\n}"],["{\n  padding-left:20px;\n  box-sizing:border-box;\n}"]),b=A(["{\n  background-color:#fff;\n  border-radius:5px;\n}"],["{\n  background-color:#fff;\n  border-radius:5px;\n}"]),h=A(["{\n  height:30px;\n  line-height:28px;\n  border-radius:2px;\n  border:1px solid rgba(80,145,255,1);\n  color:rgba(80,145,255,1);\n  padding:0px 12px;\n  display:inline-block;\n}"],["{\n  height:30px;\n  line-height:28px;\n  border-radius:2px;\n  border:1px solid rgba(80,145,255,1);\n  color:rgba(80,145,255,1);\n  padding:0px 12px;\n  display:inline-block;\n}"]),m=A(["{\n  height:30px;\n  line-height:28px;\n  border-radius:2px;\n  border:1px solid #F73030;\n  color:"," !important;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:80px;\n  text-align:center;\n  background:",";\n}"],["{\n  height:30px;\n  line-height:28px;\n  border-radius:2px;\n  border:1px solid #F73030;\n  color:"," !important;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:80px;\n  text-align:center;\n  background:",";\n}"]),k=A(["{\n  height:30px;\n  line-height:28px;\n  border-radius:2px;\n  border:1px solid #28BD6C;\n  color:"," !important;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:80px;\n  text-align:center;\n  background:",";\n}"],["{\n  height:30px;\n  line-height:28px;\n  border-radius:2px;\n  border:1px solid #28BD6C;\n  color:"," !important;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:80px;\n  text-align:center;\n  background:",";\n}"]),y=A(["{\n  height:30px;\n  line-height:30px;\n  border-radius:2px;\n  background-color:#28BD6C;\n  color:#fff;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:80px;\n  text-align:center;\n}"],["{\n  height:30px;\n  line-height:30px;\n  border-radius:2px;\n  background-color:#28BD6C;\n  color:#fff;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:80px;\n  text-align:center;\n}"]),v=A(["{\n  height:30px;\n  line-height:30px;\n  border-radius:2px;\n  background-color:rgba(80,145,255,1);\n  color:#fff!important;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:80px;\n  text-align:center;\n}"],["{\n  height:30px;\n  line-height:30px;\n  border-radius:2px;\n  background-color:rgba(80,145,255,1);\n  color:#fff!important;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:80px;\n  text-align:center;\n}"]),B=A(["{\n  height:30px;\n  line-height:30px;\n  border-radius:2px;\n  background-color:#F73030;\n  color:#fff;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:80px;\n  text-align:center;\n}"],["{\n  height:30px;\n  line-height:30px;\n  border-radius:2px;\n  background-color:#F73030;\n  color:#fff;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:80px;\n  text-align:center;\n}"]),w=A(["{\n  padding-left: 20px;\n  & > li{\n    list-style-type: decimal;\n    color:#888;\n    height:24px;\n    line-height:24px;\n  }\n}"],["{\n  padding-left: 20px;\n  & > li{\n    list-style-type: decimal;\n    color:#888;\n    height:24px;\n    line-height:24px;\n  }\n}"]),j=A(["{\n  color:#28BD6C!important;\n  position:relative;\n  &:after{\n    position:absolute;\n    bottom:-2px;\n    left:0px;\n    width:100%;\n    height:1px;\n    content:'';\n    background:#28BD6C;\n  }\n}"],["{\n  color:#28BD6C!important;\n  position:relative;\n  &:after{\n    position:absolute;\n    bottom:-2px;\n    left:0px;\n    width:100%;\n    height:1px;\n    content:'';\n    background:#28BD6C;\n  }\n}"]),E=A(["{\n  height:32px;\n  line-height:32px;\n  border-radius:2px;\n  background-color:#BBBBBB;\n  color:#fff;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:64px;\n  text-align:center;\n  letter-spacing: 4px;\n}"],["{\n  height:32px;\n  line-height:32px;\n  border-radius:2px;\n  background-color:#BBBBBB;\n  color:#fff;\n  padding:0px 12px;\n  display:inline-block;\n  min-width:64px;\n  text-align:center;\n  letter-spacing: 4px;\n}"]),C=A(["{\n  width:1200px;\n  margin:20px auto;\n  text-align:center;\n  display:flex;\n  align-Items:center;\n  background-color:#fff;\n  justify-content: center;\n}"],["{\n  width:1200px;\n  margin:20px auto;\n  text-align:center;\n  display:flex;\n  align-Items:center;\n  background-color:#fff;\n  justify-content: center;\n}"]),O=A(["{\n  background:#fafafa;\n  padding:20px 30px;\n  width:100%;\n}"],["{\n  background:#fafafa;\n  padding:20px 30px;\n  width:100%;\n}"]),z=t("vOnD"),_=(i=z)&&i.__esModule?i:{default:i};function A(n,e){return Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}e.Banner=_.default.div(r),e.AlignCenterBetween=_.default.div(l),e.FlexAJ=_.default.div(a),e.AlignCenter=_.default.div(d),e.AlignTop=_.default.div(o),e.AlignAJBottom=_.default.div(p),e.Box=_.default.div(c),e.LongWidth=_.default.div(u),e.Long=_.default.div(f),e.ShortWidth=_.default.div(x),e.Short=_.default.div(s),e.Gap=_.default.div(g),e.WhiteBack=_.default.div(b),e.Blueline=_.default.a(h),e.Redline=_.default.a(m,(function(n){return n.bold?"#fff":"#F73030"}),(function(n){return n.bold?"#F73030":"#fff"})),e.Greenline=_.default.a(k,(function(n){return n.bold?"#fff":"#28BD6C"}),(function(n){return n.bold?"#28BD6C":"#fff"})),e.Greenback=_.default.a(y),e.Blueback=_.default.a(v),e.Redback=_.default.a(B),e.NumUl=_.default.ul(w),e.GreenUnder=_.default.a(j),e.Cancel=_.default.a(E),e.Content=_.default.div(C),e.GroupProjectBackgroup=_.default.div(O)}}]);