(this.webpackJsonp=this.webpackJsonp||[]).push([[63],{"6V0J":function(e,t,n){},BX1b:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,a,l=y(n("NUBc")),i=y(n("ECub")),o=y(n("2/Rp")),u=y(n("NJEC")),c=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,a=!1,l=void 0;try{for(var i,o=e[Symbol.iterator]();!(r=(i=o.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){a=!0,l=e}finally{try{!r&&o.return&&o.return()}finally{if(a)throw l}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},s=(r=["{\n  display:block;\n  border-radius:5px;\n  border:1px solid rgba(40,189,108,1);\n  color:rgba(40,189,108,1);  \n  padding:0px 14px;\n  height:30px;\n  line-height:30px;\n}"],a=["{\n  display:block;\n  border-radius:5px;\n  border:1px solid rgba(40,189,108,1);\n  color:rgba(40,189,108,1);  \n  padding:0px 14px;\n  height:30px;\n  line-height:30px;\n}"],Object.freeze(Object.defineProperties(r,{raw:{value:Object.freeze(a)}})));n("YQTV"),n("vAZS"),n("L/Qf"),n("k994");var f=n("q1tI"),d=y(f),p=y(n("vOnD")),m=n("spEH"),g=y(n("y8d7")),h=y(n("JyIB")),b=y(n("zsM7")),v=y(n("vDqi"));function y(e){return e&&e.__esModule?e:{default:e}}var x=p.default.a(s);t.default=function(e){var t=(0,f.useState)("0"),n=c(t,2),r=n[0],a=n[1],s=(0,f.useState)(1),p=c(s,2),y=p[0],E=p[1],_=(0,f.useState)(0),O=c(_,2),j=O[0],w=O[1],C=(0,f.useState)(void 0),S=c(C,2),k=S[0],P=S[1],N=(0,f.useState)(void 0),z=c(N,2),T=z[0],I=z[1],M=(0,f.useState)(void 0),B=c(M,2),R=B[0],V=B[1],F=e.match.params,L=F.OIdentifier,D=F.groupId,q=e.current_user;function J(e,t,n){var r="/organizations/"+e+"/teams/"+t+"/team_users.json";v.default.get(r,{params:{page:n,limit:15}}).then((function(e){e&&e.data&&(I(e.data.team_users),w(e.data.total_count))})).catch((function(e){}))}return(0,f.useEffect)((function(){var e;D&&(e="/organizations/"+L+"/teams/"+D+".json",v.default.get(e).then((function(e){e&&e.data&&V(e.data)})).catch((function(e){})))}),[D]),(0,f.useEffect)((function(){"0"===r?J(L,D,y):function(e,t,n){var r="/organizations/"+e+"/teams/"+t+"/team_projects.json";v.default.get(r,{params:{page:n,limit:15}}).then((function(e){e&&e.data&&e.data.team_projects.length>0&&(P(e.data.team_projects),w(e.data.total_count))})).catch((function(e){}))}(L,D,y)}),[r,y]),d.default.createElement(m.Box,{className:"GroupSubLevel"},d.default.createElement(m.Short,{className:"g-sub-left"},R?d.default.createElement("div",null,d.default.createElement(m.AlignCenterBetween,null,d.default.createElement("span",{className:"color-grey-3 task-hide"},R.nickname),R.is_member&&!R.is_admin?d.default.createElement(u.default,{title:"确认离开团队吗？",onConfirm:function(){return function(t){if(t){var n="/organizations/"+L+"/teams/"+D+"/team_users/quit.json";v.default.delete(n).then((function(n){n&&"success"===n.message&&(e.showNotification("已成功退出团队！"),e.history.push("/"+t))})).catch((function(e){}))}}(q.login)},okText:"确认",cancelText:"取消"},d.default.createElement(x,null,"离开团队")):""),d.default.createElement("div",{className:"g-desc"},R.description?R.description:"暂无描述"),d.default.createElement("div",{className:"g-tip"},d.default.createElement("p",null,"管理员团队对 ",d.default.createElement("span",null,"所有仓库")," 具有操作权限，且对组织具有 ",d.default.createElement("span",null,"管理员权限"),"。 "),d.default.createElement("p",null,"此外，该团队拥有了 ",d.default.createElement("span",null,"创建仓库"),"  的权限：成员可以在组织中创建新的仓库。 "),R.is_admin?d.default.createElement(o.default,{type:"primary",onClick:function(){return e.history.push("/"+L+"/teams/"+D+"/setting")}},d.default.createElement("span",{className:"color-white"},"团队设置")):"")):d.default.createElement(i.default,{image:i.default.PRESENTED_IMAGE_SIMPLE})),d.default.createElement(m.Long,null,d.default.createElement(m.Gap,null,d.default.createElement(m.WhiteBack,null,d.default.createElement(g.default,{nav:["团队成员","团队项目"],index:r,onChange:a},"0"===r?d.default.createElement(h.default,{data:T,current_user:e.current_user,successFunc:function(){return J(L,D,y)}}):d.default.createElement(b.default,{projects:k})),j>15&&d.default.createElement("div",{className:"mt20 pb20 edu-txt-center"},d.default.createElement(l.default,{simple:!0,current:y,total:j,pageSize:15,onChange:function(e){return E(e)}}))))))}},JyIB:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n("q1tI")),a=i(n("YHS8")),l=i(n("2CTR"));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=e.data,n=e.current_user,i=e.successFunc;return t&&t.length>0?r.default.createElement("div",{className:"MemberBoxThree"},t.map((function(e,t){return r.default.createElement(a.default,{user:e.user,img:e.user.image_url,name:e.user.name,time:e.created_at,focusStatus:e.user.watched,is_current_user:n&&e.user.login===n.login,login:e.user.login,successFunc:i})}))):r.default.createElement(l.default,{_html:"暂无团队成员"})}},KJct:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=u(n("2/Rp")),a=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,a=!1,l=void 0;try{for(var i,o=e[Symbol.iterator]();!(r=(i=o.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){a=!0,l=e}finally{try{!r&&o.return&&o.return()}finally{if(a)throw l}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};n("L/Qf");var l=n("q1tI"),i=u(l),o=u(n("vDqi"));function u(e){return e&&e.__esModule?e:{default:e}}n("6V0J"),t.default=function(e){var t=e.is_watch,n=e.fontClass,u=e.starText,c=e.is_block,s=e.id,f=e.successFunc,d=e.notReset,p=(0,l.useState)(!1),m=a(p,2),g=m[0],h=m[1],b=(0,l.useState)(t),v=a(b,2),y=v[0],x=v[1];return i.default.createElement(r.default,{type:y?"default":"primary",ghost:!y,block:c,loading:g,onClick:function(){return e=y,h(!0),void(0,o.default)({method:e?"delete":"post",url:"/watchers/"+(e?"unfollow":"follow")+".json",params:{target_type:"user",id:s}}).then((function(e){e&&0===e.data.status&&(f&&f(),d&&x(!y)),h(!1)})).catch((function(e){h(!1)}));var e}},y?i.default.createElement("span",{className:""},i.default.createElement("i",{className:"iconfont icon-shixing font-15 text-yellow mr-4"}),i.default.createElement("span",{className:n||"font-12"},"已关注")):i.default.createElement("span",{className:""},i.default.createElement("i",{className:"iconfont icon-kongxing font-15"}),i.default.createElement("span",{className:n},u||"关注")))}},NJEC:function(e,t,n){"use strict";n.r(t);var r=n("q1tI"),a=n("VCL8"),l=n("3S7+"),i=n("CtXQ"),o=n("2/Rp"),u=n("YMnH"),c=n("ZvpZ"),s=n("H84U");function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(){return(d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function g(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=v(e);if(t){var a=v(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return h(this,n)}}function h(e,t){return!t||"object"!==f(t)&&"function"!=typeof t?b(e):t}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var y=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},x=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(f,e);var t,n,a,i=g(f);function f(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),(t=i.call(this,e)).onConfirm=function(e){t.setVisible(!1,e);var n=t.props.onConfirm;n&&n.call(b(t),e)},t.onCancel=function(e){t.setVisible(!1,e);var n=t.props.onCancel;n&&n.call(b(t),e)},t.onVisibleChange=function(e){t.props.disabled||t.setVisible(e)},t.saveTooltip=function(e){t.tooltip=e},t.renderOverlay=function(e,n){var a=t.props,l=a.okButtonProps,i=a.cancelButtonProps,u=a.title,c=a.cancelText,s=a.okText,f=a.okType,p=a.icon;return r.createElement("div",null,r.createElement("div",{className:"".concat(e,"-inner-content")},r.createElement("div",{className:"".concat(e,"-message")},p,r.createElement("div",{className:"".concat(e,"-message-title")},u)),r.createElement("div",{className:"".concat(e,"-buttons")},r.createElement(o.default,d({onClick:t.onCancel,size:"small"},i),c||n.cancelText),r.createElement(o.default,d({onClick:t.onConfirm,type:f,size:"small"},l),s||n.okText))))},t.renderConfirm=function(e){var n=e.getPrefixCls,a=t.props,i=a.prefixCls,o=a.placement,s=y(a,["prefixCls","placement"]),f=n("popover",i),p=r.createElement(u.a,{componentName:"Popconfirm",defaultLocale:c.a.Popconfirm},(function(e){return t.renderOverlay(f,e)}));return r.createElement(l.default,d({},s,{prefixCls:f,placement:o,onVisibleChange:t.onVisibleChange,visible:t.state.visible,overlay:p,ref:t.saveTooltip}))},t.state={visible:e.visible},t}return t=f,a=[{key:"getDerivedStateFromProps",value:function(e){return"visible"in e?{visible:e.visible}:"defaultVisible"in e?{visible:e.defaultVisible}:null}}],(n=[{key:"getPopupDomNode",value:function(){return this.tooltip.getPopupDomNode()}},{key:"setVisible",value:function(e,t){var n=this.props;"visible"in n||this.setState({visible:e});var r=n.onVisibleChange;r&&r(e,t)}},{key:"render",value:function(){return r.createElement(s.a,null,this.renderConfirm)}}])&&p(t.prototype,n),a&&p(t,a),f}(r.Component);x.defaultProps={transitionName:"zoom-big",placement:"top",trigger:"click",okType:"primary",icon:r.createElement(i.default,{type:"exclamation-circle",theme:"filled"}),disabled:!1},Object(a.polyfill)(x),t.default=x},YHS8:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=m(n("2/Rp")),a=g(["{\n  border-radius:50%;\n  width:50px;\n  height:50px;\n  margin-right:14px;\n}"],["{\n  border-radius:50%;\n  width:50px;\n  height:50px;\n  margin-right:14px;\n}"]),l=g(["{\n  color:#5091FF;\n  font-size:16px;\n  height:22px;\n  line-height:22px;\n  margin-bottom:7px;\n}"],["{\n  color:#5091FF;\n  font-size:16px;\n  height:22px;\n  line-height:22px;\n  margin-bottom:7px;\n}"]),i=g(["{\n  color:#888;\n  font-size:12px;\n  height:16px;\n  line-height:16px;\n  margin-bottom:9px;\n  display:flex;\n  align-item:center;\n}"],["{\n  color:#888;\n  font-size:12px;\n  height:16px;\n  line-height:16px;\n  margin-bottom:9px;\n  display:flex;\n  align-item:center;\n}"]),o=g(["{\n  font-size:13px!important;\n  color:#60B25E;\n  margin-right:2px;\n  height:17px;\n  line-height:17px;\n}"],["{\n  font-size:13px!important;\n  color:#60B25E;\n  margin-right:2px;\n  height:17px;\n  line-height:17px;\n}"]),u=g(["{\n  margin-bottom: 18px;\n  padding:20px 16px;\n  display: flex;\n  align-items: center;\n  border:1px solid #eee;\n}"],["{\n  margin-bottom: 18px;\n  padding:20px 16px;\n  display: flex;\n  align-items: center;\n  border:1px solid #eee;\n}"]);n("L/Qf");var c=m(n("q1tI"));n("KkuB");var s=m(n("vOnD")),f=m(n("KJct")),d=n("sYIF"),p=n("eO8H");function m(e){return e&&e.__esModule?e:{default:e}}function g(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var h=s.default.img(a),b=s.default.div(l),v=s.default.div(i),y=s.default.i(o),x=s.default.div(u);t.default=function(e){var t=e.user,n=e.img,a=e.name,l=e.time,i=e.focusStatus,o=e.is_current_user,u=e.login,s=e.successFunc;return c.default.createElement(x,null,c.default.createElement(p.Link,{to:"/"+(t&&t.login)},c.default.createElement(h,{src:(0,d.getImageUrl)("/"+n)})),c.default.createElement("div",{className:"m-infos"},c.default.createElement(p.Link,{to:"/"+(t&&t.login)},c.default.createElement(b,null,a)),c.default.createElement(v,null,c.default.createElement(y,{className:"iconfont icon-shijian"}),"加入时间:",l),o?c.default.createElement(r.default,{type:"default"},"当前用户"):c.default.createElement(f.default,{is_watch:i,id:u,successFunc:s,notReset:!0})))}},k994:function(e,t,n){"use strict";n.r(t);n("SchZ"),n("Aosp"),n("L/Qf")},y8d7:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=l(n("ZTPi"));n("AUBz");var a=l(n("q1tI"));function l(e){return e&&e.__esModule?e:{default:e}}n("KkuB");var i=r.default.TabPane;t.default=function(e){var t=e.nav,n=e.index,l=e.onChange,o=e.children;return t&&t.length>0?a.default.createElement(r.default,{className:"tabsStyle",animated:!1,activeKey:n,onChange:l},t.map((function(e,t){return a.default.createElement(i,{tab:e,key:""+t},o)}))):""}},zsM7:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=d(["{\n  padding:0px 38px;\n  min-height:400px;\n}"],["{\n  padding:0px 38px;\n  min-height:400px;\n}"]),a=d(["{\n  display:flex;\n  align-items: center;\n  padding:25px 0px;\n  border-bottom:1px solid #eee;\n  &:last-child{\n    border-bottom:none;\n  }\n}"],["{\n  display:flex;\n  align-items: center;\n  padding:25px 0px;\n  border-bottom:1px solid #eee;\n  &:last-child{\n    border-bottom:none;\n  }\n}"]),l=d(["{\n  width:60px;\n  margin-right:12px;\n  border-radius:50%;\n}"],["{\n  width:60px;\n  margin-right:12px;\n  border-radius:50%;\n}"]),i=f(n("q1tI")),o=f(n("vOnD")),u=n("eO8H"),c=n("sYIF"),s=f(n("2CTR"));function f(e){return e&&e.__esModule?e:{default:e}}function d(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var p=o.default.div(r),m=o.default.div(a),g=o.default.img(l);t.default=function(e){var t=e.projects;return t&&t.length>0?i.default.createElement(p,null,t.map((function(e,t){return i.default.createElement(m,null,i.default.createElement(g,{src:e.project&&(0,c.getImageUrl)("/"+e.project.owner_image_url)}),i.default.createElement(u.Link,{to:"/"+e.project.owner_login+"/"+e.project.identifier},e.project.name))}))):i.default.createElement(s.default,{_html:"暂无团队项目"})}}}]);