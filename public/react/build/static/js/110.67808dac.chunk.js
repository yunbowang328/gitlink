(this.webpackJsonp=this.webpackJsonp||[]).push([[110],{"6V0J":function(e,t,n){},KJct:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=o(n("2/Rp")),r=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],a=!0,r=!1,i=void 0;try{for(var l,u=e[Symbol.iterator]();!(a=(l=u.next()).done)&&(n.push(l.value),!t||n.length!==t);a=!0);}catch(e){r=!0,i=e}finally{try{!a&&u.return&&u.return()}finally{if(r)throw i}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};n("L/Qf");var i=n("q1tI"),l=o(i),u=o(n("vDqi"));function o(e){return e&&e.__esModule?e:{default:e}}n("6V0J"),t.default=function(e){var t=e.is_watch,n=e.fontClass,o=e.starText,s=e.is_block,c=e.id,f=e.successFunc,d=e.notReset,m=(0,i.useState)(!1),p=r(m,2),g=p[0],h=p[1],x=(0,i.useState)(t),v=r(x,2),y=v[0],b=v[1];return l.default.createElement(a.default,{type:y?"default":"primary",ghost:!y,block:s,loading:g,onClick:function(){return e=y,h(!0),void(0,u.default)({method:e?"delete":"post",url:"/watchers/"+(e?"unfollow":"follow")+".json",params:{target_type:"user",id:c}}).then((function(e){e&&0===e.data.status&&(f&&f(),d&&b(!y)),h(!1)})).catch((function(e){h(!1)}));var e}},y?l.default.createElement("span",{className:""},l.default.createElement("i",{className:"iconfont icon-shixing font-15 text-yellow mr-4"}),l.default.createElement("span",{className:n||"font-12"},"已关注")):l.default.createElement("span",{className:""},l.default.createElement("i",{className:"iconfont icon-kongxing font-15"}),l.default.createElement("span",{className:n},o||"关注")))}},YHS8:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=p(n("2/Rp")),r=g(["{\n  border-radius:50%;\n  width:50px;\n  height:50px;\n  margin-right:14px;\n}"],["{\n  border-radius:50%;\n  width:50px;\n  height:50px;\n  margin-right:14px;\n}"]),i=g(["{\n  color:#5091FF;\n  font-size:16px;\n  height:22px;\n  line-height:22px;\n  margin-bottom:7px;\n}"],["{\n  color:#5091FF;\n  font-size:16px;\n  height:22px;\n  line-height:22px;\n  margin-bottom:7px;\n}"]),l=g(["{\n  color:#888;\n  font-size:12px;\n  height:16px;\n  line-height:16px;\n  margin-bottom:9px;\n  display:flex;\n  align-item:center;\n}"],["{\n  color:#888;\n  font-size:12px;\n  height:16px;\n  line-height:16px;\n  margin-bottom:9px;\n  display:flex;\n  align-item:center;\n}"]),u=g(["{\n  font-size:13px!important;\n  color:#60B25E;\n  margin-right:2px;\n  height:17px;\n  line-height:17px;\n}"],["{\n  font-size:13px!important;\n  color:#60B25E;\n  margin-right:2px;\n  height:17px;\n  line-height:17px;\n}"]),o=g(["{\n  margin-bottom: 18px;\n  padding:20px 16px;\n  display: flex;\n  align-items: center;\n  border:1px solid #eee;\n}"],["{\n  margin-bottom: 18px;\n  padding:20px 16px;\n  display: flex;\n  align-items: center;\n  border:1px solid #eee;\n}"]);n("L/Qf");var s=p(n("q1tI"));n("KkuB");var c=p(n("vOnD")),f=p(n("KJct")),d=n("sYIF"),m=n("eO8H");function p(e){return e&&e.__esModule?e:{default:e}}function g(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var h=c.default.img(r),x=c.default.div(i),v=c.default.div(l),y=c.default.i(u),b=c.default.div(o);t.default=function(e){var t=e.user,n=e.img,r=e.name,i=e.time,l=e.focusStatus,u=e.is_current_user,o=e.login,c=e.successFunc;return s.default.createElement(b,null,s.default.createElement(m.Link,{to:"/"+(t&&t.login)},s.default.createElement(h,{src:(0,d.getImageUrl)("/"+n)})),s.default.createElement("div",{className:"m-infos"},s.default.createElement(m.Link,{to:"/"+(t&&t.login)},s.default.createElement(x,null,r)),s.default.createElement(v,null,s.default.createElement(y,{className:"iconfont icon-shijian"}),"加入时间:",i),u?s.default.createElement(a.default,{type:"default"},"当前用户"):s.default.createElement(f.default,{is_watch:l,id:o,successFunc:c,notReset:!0})))}},yvJ0:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=d(n("NUBc")),r=d(n("W9HT")),i=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],a=!0,r=!1,i=void 0;try{for(var l,u=e[Symbol.iterator]();!(a=(l=u.next()).done)&&(n.push(l.value),!t||n.length!==t);a=!0);}catch(e){r=!0,i=e}finally{try{!a&&u.return&&u.return()}finally{if(r)throw i}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};n("YQTV"),n("04bd");var l=n("q1tI"),u=d(l),o=n("spEH"),s=d(n("YHS8")),c=d(n("vDqi")),f=d(n("2CTR"));function d(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=e.organizeDetail,n=e.current_user,d=(0,l.useState)(1),m=i(d,2),p=m[0],g=m[1],h=(0,l.useState)(0),x=i(h,2),v=x[0],y=x[1],b=(0,l.useState)(!0),E=i(b,2),_=E[0],w=E[1],S=(0,l.useState)(void 0),z=i(S,2),j=z[0],N=z[1];function k(){w(!0);var e="/organizations/"+t.id+"/organization_users.json";c.default.get(e,{page:p,limit:15}).then((function(e){e&&e.data&&(N(e.data.organization_users),y(e.data.total_count),w(!1))}))}return(0,l.useEffect)((function(){t&&k()}),[t,p]),u.default.createElement(o.WhiteBack,{style:{marginBottom:"30px",border:"1px solid #eee"}},u.default.createElement(o.Banner,null,"组织成员"),u.default.createElement(r.default,{spinning:_},u.default.createElement("div",{style:{minHeight:"400px"}},j&&j.length>0&&u.default.createElement("div",{className:"memberBox"},j.map((function(e,t){return e.user&&u.default.createElement(s.default,{user:e.user,img:e.user.image_url,name:e.user.name,time:e.created_at,focusStatus:e.user.watched,is_current_user:n&&n.login===e.user.login,login:e.user&&e.user.login,successFunc:k})}))),j&&0===j.length&&u.default.createElement(f.default,{_html:"暂无数据"}))),v>15&&u.default.createElement("div",{className:"mt20 pb20 edu-txt-center"},u.default.createElement(a.default,{simple:!0,current:p,pageSize:15,total:v,onChange:function(e){return g(e)}})))}}}]);