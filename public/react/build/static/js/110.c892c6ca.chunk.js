(this.webpackJsonp=this.webpackJsonp||[]).push([[110],{ess8:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,a,u=(r=["{\n  background-color:#fff;\n  padding:20px 30px;\n  border-bottom:1px solid #eee;\n  font-size:16px;\n  color:#333;\n  display:flex;\n  justify-content: space-between;\n  align-items:center;\n}"],a=["{\n  background-color:#fff;\n  padding:20px 30px;\n  border-bottom:1px solid #eee;\n  font-size:16px;\n  color:#333;\n  display:flex;\n  justify-content: space-between;\n  align-items:center;\n}"],Object.freeze(Object.defineProperties(r,{raw:{value:Object.freeze(a)}}))),s=o(n("q1tI"));function o(e){return e&&e.__esModule?e:{default:e}}var l=o(n("vOnD")).default.div(u);t.default=function(e){var t=e.children;return s.default.createElement(l,null,t)}},"qh7/":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=h(n("2/Rp")),a=h(n("14Xm")),u=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,a=!1,u=void 0;try{for(var s,o=e[Symbol.iterator]();!(r=(s=o.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(e){a=!0,u=e}finally{try{!r&&o.return&&o.return()}finally{if(a)throw u}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},s=x(["\n   {\n    padding: 0px 30px;\n    min-height: 400px;\n  }\n"],["\n   {\n    padding: 0px 30px;\n    min-height: 400px;\n  }\n"]),o=x(["\n   {\n    padding: 22px 0px;\n    border-bottom: 1px solid #eee;\n  }\n"],["\n   {\n    padding: 22px 0px;\n    border-bottom: 1px solid #eee;\n  }\n"]),l=x(["\n   {\n    padding: 12px 0px;\n  }\n"],["\n   {\n    padding: 12px 0px;\n  }\n"]);n("L/Qf");var i=n("q1tI"),c=h(i),f=n("spEH"),d=n("tnhM"),p=h(n("ess8")),m=n("eO8H"),v=h(n("vOnD"));function h(e){return e&&e.__esModule?e:{default:e}}function x(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}n("NzgE");var b=v.default.div(s),g=v.default.p(o),w=v.default.div(l);t.default=function(e){t=a.default.mark((function e(t){var n,r;return a.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={page:l,limit:x},e.next=3,(0,d.getHooks)(t,n);case 3:(r=e.sent)&&k(r);case 5:case"end":return e.stop()}}),e,this)})),n=function(){var e=t.apply(this,arguments);return new Promise((function(t,n){return function r(a,u){try{var s=e[a](u),o=s.value}catch(e){return void n(e)}if(!s.done)return Promise.resolve(o).then((function(e){r("next",e)}),(function(e){r("throw",e)}));t(o)}("next")}))};var t,n,s=(0,i.useState)(1),o=u(s,2),l=o[0],v=(o[1],(0,i.useState)(20)),h=u(v,2),x=h[0],y=(h[1],(0,i.useState)(void 0)),E=u(y,2),k=(E[0],E[1]);e.match.params.projectsId;return c.default.createElement(f.WhiteBack,null,c.default.createElement(p.default,null,c.default.createElement("span",null,"管理web钩子"),c.default.createElement(r.default,{type:"primary"},"添加web钩子")),c.default.createElement(b,null,c.default.createElement(g,null,"当Gitea事件发生时，Web钩子自动发出HTTP POST请求。在"," ",c.default.createElement(m.Link,{to:"",className:"color-blue"},"指南")," ","中阅读更多内容。"),c.default.createElement(w,null,c.default.createElement(f.FlexAJ,{className:"manageItem"},c.default.createElement("span",{className:"webName"},"https://gitea.com/zxf/homebrew-cask-versions/settings/hooks/gitea/new"),c.default.createElement("span",null,c.default.createElement(f.Redline,null,"删除"),c.default.createElement(f.Greenline,{className:"ml30"},"编辑"))),c.default.createElement(f.FlexAJ,{className:"manageItem"},c.default.createElement("span",{className:"webName"},"https://gitea.com/zxf/homebrew-cask-versions/settings/hooks/gitea/new"),c.default.createElement("span",null,c.default.createElement(f.Redline,null,"删除"),c.default.createElement(f.Greenline,{className:"ml30"},"编辑"))))))}},tnhM:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getUser=t.getSubEntries=t.getHooks=t.getTag=t.getBranch=void 0;var r=u(n("14Xm")),a=u(n("vDqi"));function u(e){return e&&e.__esModule?e:{default:e}}function s(e){return function(){var t=e.apply(this,arguments);return new Promise((function(e,n){return function r(a,u){try{var s=t[a](u),o=s.value}catch(e){return void n(e)}if(!s.done)return Promise.resolve(o).then((function(e){r("next",e)}),(function(e){r("throw",e)}));e(o)}("next")}))}}var o,l,i,c,f;t.getBranch=(o=s(r.default.mark((function e(t,n){return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.default.get("/"+n+"/"+t+"/branches.json");case 2:return e.abrupt("return",e.sent.data);case 3:case"end":return e.stop()}}),e,void 0)}))),function(e,t){return o.apply(this,arguments)}),t.getTag=(l=s(r.default.mark((function e(t,n){return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.default.get("/"+n+"/"+t+"/tags.json");case 2:return e.abrupt("return",e.sent.data);case 3:case"end":return e.stop()}}),e,void 0)}))),function(e,t){return l.apply(this,arguments)}),t.getHooks=(i=s(r.default.mark((function e(t,n){return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.default.get("/projects/"+t+"/hooks.json",{params:n});case 2:return e.abrupt("return",e.sent.data);case 3:case"end":return e.stop()}}),e,void 0)}))),function(e,t){return i.apply(this,arguments)}),t.getSubEntries=(c=s(r.default.mark((function e(t,n,u){return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.default.get("/"+t+"/"+n+"/sub_entries.json",{params:u});case 2:return e.abrupt("return",e.sent.data);case 3:case"end":return e.stop()}}),e,void 0)}))),function(e,t,n){return c.apply(this,arguments)}),t.getUser=(f=s(r.default.mark((function e(t){return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.default.get("/users/"+t+"/hovercard.json");case 2:return e.abrupt("return",e.sent.data);case 3:case"end":return e.stop()}}),e,void 0)}))),function(e){return f.apply(this,arguments)})}}]);