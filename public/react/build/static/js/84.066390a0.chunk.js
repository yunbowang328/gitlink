(this.webpackJsonp=this.webpackJsonp||[]).push([[84],{NJEC:function(e,t,n){"use strict";n.r(t);var r=n("q1tI"),a=n("VCL8"),o=n("3S7+"),l=n("CtXQ"),i=n("2/Rp"),c=n("YMnH"),u=n("ZvpZ"),s=n("H84U");function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(){return(m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function v(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=h(e);if(t){var a=h(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return b(this,n)}}function b(e,t){return!t||"object"!==f(t)&&"function"!=typeof t?y(e):t}function y(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var g=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},E=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(f,e);var t,n,a,l=v(f);function f(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),(t=l.call(this,e)).onConfirm=function(e){t.setVisible(!1,e);var n=t.props.onConfirm;n&&n.call(y(t),e)},t.onCancel=function(e){t.setVisible(!1,e);var n=t.props.onCancel;n&&n.call(y(t),e)},t.onVisibleChange=function(e){t.props.disabled||t.setVisible(e)},t.saveTooltip=function(e){t.tooltip=e},t.renderOverlay=function(e,n){var a=t.props,o=a.okButtonProps,l=a.cancelButtonProps,c=a.title,u=a.cancelText,s=a.okText,f=a.okType,d=a.icon;return r.createElement("div",null,r.createElement("div",{className:"".concat(e,"-inner-content")},r.createElement("div",{className:"".concat(e,"-message")},d,r.createElement("div",{className:"".concat(e,"-message-title")},c)),r.createElement("div",{className:"".concat(e,"-buttons")},r.createElement(i.default,m({onClick:t.onCancel,size:"small"},l),u||n.cancelText),r.createElement(i.default,m({onClick:t.onConfirm,type:f,size:"small"},o),s||n.okText))))},t.renderConfirm=function(e){var n=e.getPrefixCls,a=t.props,l=a.prefixCls,i=a.placement,s=g(a,["prefixCls","placement"]),f=n("popover",l),d=r.createElement(c.a,{componentName:"Popconfirm",defaultLocale:u.a.Popconfirm},(function(e){return t.renderOverlay(f,e)}));return r.createElement(o.default,m({},s,{prefixCls:f,placement:i,onVisibleChange:t.onVisibleChange,visible:t.state.visible,overlay:d,ref:t.saveTooltip}))},t.state={visible:e.visible},t}return t=f,a=[{key:"getDerivedStateFromProps",value:function(e){return"visible"in e?{visible:e.visible}:"defaultVisible"in e?{visible:e.defaultVisible}:null}}],(n=[{key:"getPopupDomNode",value:function(){return this.tooltip.getPopupDomNode()}},{key:"setVisible",value:function(e,t){var n=this.props;"visible"in n||this.setState({visible:e});var r=n.onVisibleChange;r&&r(e,t)}},{key:"render",value:function(){return r.createElement(s.a,null,this.renderConfirm)}}])&&d(t.prototype,n),a&&d(t,a),f}(r.Component);E.defaultProps={transitionName:"zoom-big",placement:"top",trigger:"click",okType:"primary",icon:r.createElement(l.default,{type:"exclamation-circle",theme:"filled"}),disabled:!1},Object(a.polyfill)(E),t.default=E},Smcf:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=l(n("q1tI")),a=n("spEH"),o=l(n("b0zm"));function l(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=e.organizeDetail,n=e.history,l=e.current_user;return r.default.createElement(a.WhiteBack,null,r.default.createElement(a.Banner,null,"组织团队管理"),r.default.createElement(o.default,{limit:8,organizeDetail:t,count:4,history:n,current_user:l}))}},YbNY:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,a,o=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(r=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{!r&&i.return&&i.return()}finally{if(a)throw o}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},l=(r=["{\n  color:#F73030!important;\n}"],a=["{\n  color:#F73030!important;\n}"],Object.freeze(Object.defineProperties(r,{raw:{value:Object.freeze(a)}}))),i=n("q1tI"),c=f(i),u=f(n("vOnD")),s=f(n("kksi"));function f(e){return e&&e.__esModule?e:{default:e}}var m=u.default.a(l);t.default=function(e){var t=e.teamID,n=e.onOk,r=e.className,a=(0,i.useState)(!1),l=o(a,2),u=l[0],f=l[1];return c.default.createElement(c.default.Fragment,null,c.default.createElement(m,{className:r,onClick:function(){return f(!0)}},"离开团队"),c.default.createElement(s.default,{visible:u,okText:"确定",cancelText:"取消",onCancel:function(){return f(!1)},onOk:function(){return n(t)}},c.default.createElement("p",{className:"font-16 edu-txt-center"},"确定要离开当前团队吗？")))}},b0zm:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=y(n("W9HT")),a=y(n("NUBc")),o=y(n("NJEC")),l=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(r=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{!r&&i.return&&i.return()}finally{if(a)throw o}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},i=h(["{\n  margin-right:5px;\n  color:#333\n}"],["{\n  margin-right:5px;\n  color:#333\n}"]),c=h(["{\n  height:44px;\n  width:44px;\n  border-radius:50%;\n  margin:5px 10px;\n}"],["{\n  height:44px;\n  width:44px;\n  border-radius:50%;\n  margin:5px 10px;\n}"]);n("04bd"),n("YQTV"),n("k994");var u=n("q1tI"),s=y(u),f=y(n("2CTR")),m=y(n("vDqi")),d=n("sYIF"),p=n("eO8H"),v=y(n("YbNY")),b=y(n("vOnD"));function y(e){return e&&e.__esModule?e:{default:e}}function h(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var g=b.default.span(i),E=b.default.img(c);t.default=function(e){var t=e.organizeDetail,n=e.limit,i=e.count,c=e.history,b=e.current_user,y=(0,u.useState)(1),h=l(y,2),O=h[0],k=h[1],_=(0,u.useState)(!0),x=l(_,2),C=x[0],j=x[1],N=(0,u.useState)(0),w=l(N,2),P=w[0],S=w[1],T=(0,u.useState)(void 0),z=l(T,2),D=z[0],V=z[1];function I(){j(!0);var e="/organizations/"+t.id+"/teams.json";m.default.get(e,{params:{page:O,limit:n}}).then((function(e){e&&e.data&&(V(e.data.teams),S(e.data.total_count),j(!1))}))}function M(e){var n="/organizations/"+t.id+"/teams/"+e+"/team_users/quit.json";m.default.delete(n).then((function(e){e&&e.data&&(I(),c.push("/"+(b&&b.login)))})).catch((function(e){}))}return(0,u.useEffect)((function(){t&&I()}),[t]),s.default.createElement(r.default,{spinning:C},s.default.createElement("div",{style:{minHeight:"400px"}},D&&D.length>0&&s.default.createElement("div",{className:"groupBox"},D.map((function(e,n){return s.default.createElement("div",{key:n},s.default.createElement("p",{className:"g-head"},e.is_admin||e.is_member?s.default.createElement(p.Link,{to:"/"+t.name+"/teams/"+e.id,className:"color-grey-3 font-16"},e.nickname):s.default.createElement("span",{className:"color-grey-3 font-16"},e.nickname),s.default.createElement("span",null,e.is_admin&&"owner"!==e.authorize&&s.default.createElement(o.default,{title:"确定解散团队"+e.name+"?",okText:"是",cancelText:"否",onConfirm:function(){return n=e.id,r="/organizations/"+t.id+"/teams/"+n+".json",void m.default.delete(r).then((function(e){e&&e.data&&I()})).catch((function(e){}));var n,r}},s.default.createElement("a",{className:"color-red"},"解散团队")),e.is_member&&s.default.createElement(v.default,{className:"ml15",teamID:e.id,onOk:M}),e.is_admin&&s.default.createElement("a",{className:"ml15 color-blue",onClick:function(){return n=e.id,void c.push("/"+(t&&t.name)+"/teams/"+n+"/setting");var n}},"团队设置"))),s.default.createElement("div",{className:"g-body"},e.users&&e.users.map((function(n,r){return r<i?s.default.createElement(p.Link,{to:"/"+n.login},s.default.createElement(E,{title:n.name,key:r,src:(0,d.getImageUrl)("/"+n.image_url)})):r===i?s.default.createElement(p.Link,{to:"/"+(t&&t.name)+"/teams/"+e.id,className:"moreMember",title:"查看更多"},s.default.createElement("i",{className:"iconfont icon-zhunbeizhong"})):""}))),s.default.createElement("p",{className:"g-foot"},s.default.createElement(g,null,e.num_users," 名成员"),s.default.createElement(g,null,e.num_projects," 个项目")))}))),D&&0===D.length&&s.default.createElement(f.default,{_html:"暂无数据"}),P>n&&s.default.createElement("div",{className:"mt20 pb20 edu-txt-center"},s.default.createElement(a.default,{simple:!0,current:O,total:P,pageSize:n,onChange:function(e){return k(e)}}))))}},k994:function(e,t,n){"use strict";n.r(t);n("SchZ"),n("Aosp"),n("L/Qf")},kksi:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o(n("kLXV"));n("k3Gp");var a=o(n("q1tI"));function o(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=e.visible,n=e.okText,o=e.cancelText,l=e.onOk,i=e.onCancel,c=e.children;return a.default.createElement(r.default,{visible:t,okText:n,onCancel:i,onOk:l,cancelText:o,title:"提示",closable:!1,centered:!0},c)}}}]);