(this.webpackJsonp=this.webpackJsonp||[]).push([[104],{"6V0J":function(e,t,n){},"9BHv":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=p(n("W9HT")),a=p(n("NUBc")),o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n("04bd"),n("YQTV");var i=n("q1tI"),u=p(i),s=p(n("vDqi"));n("6V0J");var c=p(n("2CTR")),f=p(n("Xd6l"));function p(e){return e&&e.__esModule?e:{default:e}}var d=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.componentDidMount=function(){n.getUsersList()},n.getUsersList=function(e,t){n.setState({isSpin:!0});var r=n.state,a=r.user_type,o=r.project_id,l="/"+r.owner+"/"+o+"/"+a+".json";s.default.get(l,{params:{page:e,limit:t}}).then((function(e){e&&n.setState({count:e.data.count,users:e.data.users,isSpin:!1})})).catch((function(e){console.log(e)}))},n.ChangePage=function(e){n.setState({page:e,isSpin:!0});var t=n.state.limit;n.getUsersList(e,t)},n.Paginations=function(){var e=n.state,t=e.count,r=e.page,o=e.limit;return u.default.createElement(u.default.Fragment,null,t>o?u.default.createElement("div",{className:"mt50 mb30 edu-txt-center"},u.default.createElement(a.default,{simple:!0,defaultCurrent:r,total:t,pageSize:o,onChange:n.ChangePage})):"")},n.state={user_type:n.props.user_type,type_title:n.props.type_title,project_id:n.props.project_id,owner:n.props.owner,users:null,count:0,limit:20,page:1,isSpin:!1},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),l(t,[{key:"render",value:function(){var e=this.state,t=e.users,n=e.count,a=e.isSpin,l=e.type_title;return u.default.createElement("div",{className:"pbt15"},u.default.createElement("div",{className:"main background-f minH-670",style:{padding:"0px"}},u.default.createElement("div",{className:"user-list-items"},u.default.createElement("div",{className:"font-18 padding10-20 border-b-line"},l),u.default.createElement(r.default,{spinning:a},u.default.createElement("div",{className:"w-100 inline-block"},0===n?u.default.createElement(c.default,{_html:"暂时还没有相关数据!"}):u.default.createElement(f.default,o({users:t,userClass:"w-25",successFunc:this.getUsersList,notReset:!0},this.props)))),this.Paginations())))}}]),t}(i.Component);t.default=d},KJct:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=u(n("2/Rp")),a=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(r=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{!r&&i.return&&i.return()}finally{if(a)throw o}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};n("L/Qf");var o=n("q1tI"),l=u(o),i=u(n("vDqi"));function u(e){return e&&e.__esModule?e:{default:e}}n("6V0J"),t.default=function(e){var t=e.is_watch,n=e.fontClass,u=e.starText,s=e.is_block,c=e.id,f=e.successFunc,p=e.notReset,d=(0,o.useState)(!1),m=a(d,2),y=m[0],b=m[1],h=(0,o.useState)(t),v=a(h,2),_=v[0],g=v[1];return l.default.createElement(r.default,{type:_?"default":"primary",ghost:!_,block:s,loading:y,onClick:function(){return e=_,b(!0),void(0,i.default)({method:e?"delete":"post",url:"/watchers/"+(e?"unfollow":"follow")+".json",params:{target_type:"user",id:c}}).then((function(e){e&&0===e.data.status&&(f&&f(),p&&g(!_)),b(!1)})).catch((function(e){b(!1)}));var e}},_?l.default.createElement("span",{className:""},l.default.createElement("i",{className:"iconfont icon-shixing font-15 text-yellow mr-4"}),l.default.createElement("span",{className:n||"font-12"},"已关注")):l.default.createElement("span",{className:""},l.default.createElement("i",{className:"iconfont icon-kongxing font-15"}),l.default.createElement("span",{className:n},u||"关注")))}},Xd6l:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=c(n("2/Rp")),a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n("L/Qf");var o=n("q1tI"),l=c(o),i=n("sYIF"),u=n("eO8H"),s=c(n("KJct"));function c(e){return e&&e.__esModule?e:{default:e}}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}n("6V0J");var d=function(e){function t(){var e,n,a;f(this,t);for(var o=arguments.length,c=Array(o),d=0;d<o;d++)c[d]=arguments[d];return n=a=p(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),a.renderList=function(e,t,n,a,o,c){if(e&&e.length>0)return e.map((function(e,f){return l.default.createElement("div",{className:"pull-left "+t,key:f},l.default.createElement("div",{className:"pbt25 grid-item mlr10  border-b-line"},l.default.createElement("div",null,l.default.createElement("a",{href:"/"+e.login,className:"show-user-link"},l.default.createElement("img",{className:"avatar-60",src:(0,i.getImageUrl)("/"+e.image_url),alt:""}))),l.default.createElement("div",{className:"ml12"},l.default.createElement("div",null,l.default.createElement(u.Link,{to:"/"+e.login,className:"font-16 text-primary task-hide max-w-200",style:{display:"block"},title:e.name},e.name)),l.default.createElement("div",{className:"font-12 text-gray grid-item pb5"},l.default.createElement("i",{className:"iconfont icon-shijian user-join-time"}),l.default.createElement("span",{className:"ml4"},"点赞列表"===a?"点赞":"关注列表"===a?"关注":"fork","时间：",e.format_time)),n&&n.login===e.login?l.default.createElement(r.default,{type:"default"},"当前用户"):l.default.createElement(s.default,{is_watch:e.is_watch,notReset:c,id:e.login,successFunc:o}))))}))},p(a,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"render",value:function(){var e=this.props,t=e.users,n=e.userClass,r=e.current_user,a=e.type_title,o=e.successFunc,l=e.notReset,i=e.title_type;return this.renderList(t,n,r,a,o,l,i)}}]),t}(o.Component);t.default=d},zM51:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n("q1tI"),o=i(a),l=i(n("9BHv"));function i(e){return e&&e.__esModule?e:{default:e}}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var c=function(e){function t(){return u(this,t),s(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"render",value:function(){var e=this.props.match.params,t=e.owner,n=e.projectsId;return o.default.createElement("div",null,n&&o.default.createElement(l.default,{user_type:"stargazers",type_title:"点赞列表",project_id:n,current_user:this.props.current_user,owner:t}))}}]),t}(a.Component);t.default=c}}]);