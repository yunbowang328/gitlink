(this.webpackJsonp=this.webpackJsonp||[]).push([[130],{"6dZj":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),l=n("q1tI"),o=f(l),u=n("eO8H");n("7dqz"),n("NzgE");var s=f(n("CnBM")),c=f(n("HUFq")),i=n("spEH");function f(e){return e&&e.__esModule?e:{default:e}}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var m=(0,s.default)({loader:function(){return Promise.all([n.e(0),n.e(24),n.e(135)]).then(n.t.bind(null,"pSeD",7))},loading:c.default}),h=(0,s.default)({loader:function(){return Promise.all([n.e(0),n.e(1),n.e(91)]).then(n.t.bind(null,"RIeY",7))},loading:c.default}),E=(0,s.default)({loader:function(){return Promise.all([n.e(0),n.e(79),n.e(101)]).then(n.t.bind(null,"32zL",7))},loading:c.default}),b=(0,s.default)({loader:function(){return Promise.all([n.e(0),n.e(12),n.e(63),n.e(87)]).then(n.t.bind(null,"gfxg",7))},loading:c.default}),g=(0,s.default)({loader:function(){return Promise.all([n.e(0),n.e(1),n.e(83)]).then(n.t.bind(null,"5ZNU",7))},loading:c.default}),w=(0,s.default)({loader:function(){return Promise.all([n.e(0),n.e(1),n.e(9),n.e(17),n.e(108)]).then(n.t.bind(null,"XyF/",7))},loading:c.default}),y=(0,s.default)({loader:function(){return Promise.all([n.e(0),n.e(1),n.e(5),n.e(9),n.e(31)]).then(n.t.bind(null,"Un2r",7))},loading:c.default}),j=(0,s.default)({loader:function(){return n.e(121).then(n.t.bind(null,"qh7/",7))},loading:c.default}),N=(0,s.default)({loader:function(){return Promise.all([n.e(0),n.e(94)]).then(n.t.bind(null,"ejHd",7))},loading:c.default}),v=function(e){function t(){return d(this,t),p(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"render",value:function(){var e=this,t=this.props.match.params,n=t.projectsId,r=t.owner,l=this.props.history.location.pathname,s=l==="/"+r+"/"+n+"/settings";return o.default.createElement(i.Box,{className:"ProjectListIndex"},o.default.createElement(i.Short,null,o.default.createElement("ul",{className:"list-l-Menu"},o.default.createElement("li",{className:s?"active":""},o.default.createElement("p",null,o.default.createElement(u.Link,{to:"/"+r+"/"+n+"/settings",className:"w-100"},o.default.createElement("i",{className:"iconfont icon-huabanfuben font-18 mr10"}),"基本设置"))),o.default.createElement("li",{className:l.indexOf("settings/collaborators")>-1?"active":""},o.default.createElement("p",null,o.default.createElement(u.Link,{to:"/"+r+"/"+n+"/settings/collaborators",className:"w-100"},o.default.createElement("i",{className:"iconfont icon-chengyuan font-18 mr10"}),"协作者管理"))),o.default.createElement("li",{className:l.indexOf("settings/webhooks")>-1?"active":""},o.default.createElement("p",null,o.default.createElement(u.Link,{to:"/"+r+"/"+n+"/settings/webhooks",className:"w-100"},o.default.createElement("i",{className:"iconfont icon-a-xuanzhongwebhookicon font-18 mr10 color-grey-9"}),"Webhooks"))),o.default.createElement("li",{className:l.indexOf("settings/branch")>-1?"active":""},o.default.createElement("p",null,o.default.createElement(u.Link,{to:"/"+r+"/"+n+"/settings/branches",className:"w-100"},o.default.createElement("i",{className:"iconfont icon-fenzhi font-20 mr10"}),"分支设置"))),o.default.createElement("li",{className:l.indexOf("settings/labels")>-1?"active":""},o.default.createElement("p",null,o.default.createElement(u.Link,{to:"/"+r+"/"+n+"/settings/labels",className:"w-100"},o.default.createElement("i",{className:"iconfont icon-xiangmubiaoqian font-18 mr10 color-grey-6"}),"项目标记"))))),o.default.createElement(i.Long,null,o.default.createElement(i.Gap,null,o.default.createElement(u.Switch,this.props,o.default.createElement(u.Route,{path:"/:owner/:projectsId/settings/webhooks/new",render:function(t){return o.default.createElement(b,a({},e.props,t,e.state))}}),o.default.createElement(u.Route,{path:"/:owner/:projectsId/settings/webhooks/:id",render:function(t){return o.default.createElement(b,a({},e.props,t,e.state))}}),o.default.createElement(u.Route,{path:"/:owner/:projectsId/settings/webhooks",render:function(t){return o.default.createElement(g,a({},e.props,t,e.state))}}),o.default.createElement(u.Route,{path:"/:owner/:projectsId/settings/collaborators",render:function(t){return o.default.createElement(w,a({},e.props,t,e.state))}}),o.default.createElement(u.Route,{path:"/:owner/:projectsId/settings/labels",render:function(t){return o.default.createElement(y,a({},e.props,t,e.state))}}),o.default.createElement(u.Route,{path:"/:owner/:projectsId/settings/branches/:branch",render:function(t){return o.default.createElement(m,a({},e.props,t,e.state))}}),o.default.createElement(u.Route,{path:"/:owner/:projectsId/settings/branches",render:function(t){return o.default.createElement(h,a({},e.props,t,e.state))}}),o.default.createElement(u.Route,{path:"/:owner/:projectsId/settings/manage/new",render:function(t){return o.default.createElement(N,a({},e.props,t,e.state))}}),o.default.createElement(u.Route,{path:"/:owner/:projectsId/settings/manage",render:function(t){return o.default.createElement(j,a({},e.props,t,e.state))}}),o.default.createElement(u.Route,{path:"/:owner/:projectsId/settings",render:function(t){return o.default.createElement(E,a({},e.props,t,e.state))}})))))}}]),t}(l.Component);t.default=v},NzgE:function(e,t,n){}}]);