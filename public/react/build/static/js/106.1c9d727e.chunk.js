(this.webpackJsonp=this.webpackJsonp||[]).push([[106],{VUSe:function(e,t,n){},dtw8:function(e,t,n){"use strict";n.r(t);var r=n("8Wa3");n.d(t,"MemoryRouter",(function(){return r.a}));var a=n("LWYa");n.d(t,"Prompt",(function(){return a.a}));var u=n("mLw1");n.d(t,"Redirect",(function(){return u.a}));var l=n("4p7I");n.d(t,"Route",(function(){return l.a}));var d=n("nr6O");n.d(t,"Router",(function(){return d.a}));var i=n("yczp");n.d(t,"StaticRouter",(function(){return i.a}));var o=n("yoKv");n.d(t,"Switch",(function(){return o.a}));var f=n("l1PF");n.d(t,"generatePath",(function(){return f.a}));var c=n("SsKX");n.d(t,"matchPath",(function(){return c.a}));var m=n("9C/b");n.d(t,"withRouter",(function(){return m.a}))},"p+DR":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=m(n("q1tI")),u=n("eO8H"),l=m(n("CnBM")),d=m(n("HUFq")),i=n("dtw8"),o=n("sYIF"),f=n("1thW"),c=n("5A3O");function m(e){return e&&e.__esModule?e:{default:e}}n("7dqz"),n("VUSe");var s=(0,l.default)({loader:function(){return Promise.all([n.e(2),n.e(23),n.e(125)]).then(n.t.bind(null,"IaUq",7))},loading:d.default}),h=(0,l.default)({loader:function(){return Promise.all([n.e(3),n.e(4),n.e(9),n.e(82)]).then(n.t.bind(null,"vnWZ",7))},loading:d.default}),p=(0,l.default)({loader:function(){return Promise.all([n.e(2),n.e(107)]).then(n.t.bind(null,"CSm+",7))},loading:d.default}),v=(0,l.default)({loader:function(){return n.e(123).then(n.t.bind(null,"CyMe",7))},loading:d.default}),E=(0,l.default)({loader:function(){return Promise.all([n.e(2),n.e(14),n.e(13)]).then(n.t.bind(null,"NUct",7))},loading:d.default});t.default=(0,i.withRouter)((0,f.CNotificationHOC)()((0,o.SnackbarHOC)()((0,c.TPMIndexHOC)((function(e){return a.default.createElement("div",{className:"newMain"},a.default.createElement(u.Switch,null,a.default.createElement(u.Route,{path:"/organize/new",render:function(t){return a.default.createElement(h,r({},e,t))}}),a.default.createElement(u.Route,{path:"/:OIdentifier/teams/new",render:function(t){return a.default.createElement(s,r({},e,t))}}),a.default.createElement(u.Route,{path:"/:OIdentifier/teams/:groupId/setting",render:function(t){return a.default.createElement(v,r({},e,t))}}),a.default.createElement(u.Route,{path:"/:OIdentifier/teams",render:function(t){return a.default.createElement(p,r({},e,t))}}),a.default.createElement(u.Route,{path:"/:OIdentifier/members",render:function(t){return a.default.createElement(p,r({},e,t))}}),a.default.createElement(u.Route,{path:"/:OIdentifier/setting",render:function(t){return a.default.createElement(p,r({},e,t))}}),a.default.createElement(u.Route,{path:"/:owner/:projectsId",render:function(t){return a.default.createElement(E,r({},e,t))}}),a.default.createElement(u.Route,{path:"/:OIdentifier",render:function(t){return a.default.createElement(p,r({},e,t))}})))})))))}}]);