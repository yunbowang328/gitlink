(this.webpackJsonp=this.webpackJsonp||[]).push([[50],{"0lcf":function(e,t,n){"use strict";n.r(t);n("SchZ"),n("u3En")},"6JOy":function(e,t,n){},LmtA:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=u(n("mr32")),a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n("0lcf");var l=n("q1tI"),o=u(l),s=n("eO8H"),i=n("spEH"),c=n("sYIF");function u(e){return e&&e.__esModule?e:{default:e}}function f(e){return e&&e.length>0&&e.indexOf("/")>-1?e.replaceAll("/","%2F"):e}n("js5m");var p=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onMouseMove=function(e){n.setState({isdisplay:!0,orderid:e})},n.onMouseOut=function(){n.setState({isdisplay:!1})},n.set_issue_tags=function(e){return e&&e.length>0?e.map((function(e,t){return o.default.createElement("span",{className:"issue-tag-show",style:{color:e.color}},e.name)})):"--"},n.state={isdisplay:!1,orderid:""},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.issues,a=(t.project_name,t.project_author_name),l=t.user_admin_or_developer,u=this.props.match.params,p=u.projectsId,d=u.owner;this.props.current_user;return o.default.createElement("div",null,function(){if(n&&n.length>0)return n.map((function(t,n){var u=t.pull_request_staus;return o.default.createElement("div",{className:"issueItem"},o.default.createElement("div",{className:"flex-1"},o.default.createElement("p",{className:"mb15 df",style:{alignItems:"center"}},o.default.createElement("i",{className:"iconfont icon-hebingqingqiu1 font-14 mr3 i_"+u}),o.default.createElement(s.Link,{to:"/"+d+"/"+p+"/pulls/"+t.pull_request_id,className:"hide-1 font-15 color-grey-3 fwb lineh-30 mr10",style:{maxWidth:"600px"}},t.name),o.default.createElement(r.default,{className:"pr_tags_"+u},"merged"===u?"已合并":"closed"===u?"已拒绝":"开启的")),o.default.createElement("p",{className:"grid-item font-13"},o.default.createElement(s.Link,{to:"/"+(t&&t.author_login),className:"show-user-link"},o.default.createElement("img",{className:"radius",src:(0,c.getImageUrl)("/"+(t&&t.avatar_url)),alt:"",width:"24",height:"24"})),o.default.createElement(i.AlignCenter,null,o.default.createElement(s.Link,{to:"/"+(t&&t.author_login),className:"show-user-link color-grey-8 ml5"},t&&t.author_name),o.default.createElement("span",{className:"ml15 color-grey-8"},"open"===t.pull_request_staus?"创建于":"merged"===t.pull_request_staus?"合并于":"更新于"),o.default.createElement("span",{className:"color-grey-8"},t.pr_time),o.default.createElement("span",{className:"ml15"},t.pull_request_head&&o.default.createElement(r.default,{className:"pr-branch-tag"},o.default.createElement(s.Link,{to:"/"+(t.is_original?t.fork_project_user:d)+"/"+(t.is_original?t.fork_project_identifier:p)+"/tree/"+f(t.pull_request_head),className:"maxW200px task-hide ver-middle",style:{maxWidth:"200px"}},t.is_original?t.fork_project_user:a,":",t.pull_request_head)),t.pull_request_base&&o.default.createElement("span",{className:"mr8 ver-middle"},o.default.createElement("i",{className:"iconfont icon-youjiang color-grey-c font-16"})),t.pull_request_base&&o.default.createElement(r.default,{className:"pr-branch-tag"},o.default.createElement(s.Link,{to:"/"+d+"/"+p+"/tree/"+f(t.pull_request_base),className:"maxW200px task-hide ver-middle",style:{maxWidth:"200px"}},a,":",t.pull_request_base)))))),o.default.createElement("ul",{className:"topWrapper_select no-cursor",onMouseMove:function(){return e.onMouseMove(t.id)},onMouseOut:function(){return e.onMouseOut()}},o.default.createElement("li",null,t.priority),o.default.createElement("li",null,e.set_issue_tags(t.issue_tags)),o.default.createElement("li",null,t.assign_user_name?o.default.createElement(s.Link,{to:"/"+t.assign_user_login,className:"show-user-link"},t.assign_user_name):"--"),o.default.createElement("li",null,t.version||"--"),o.default.createElement("li",null,o.default.createElement("div",{className:"flex1 df",style:{justifyContent:"center"}},t.journals_count?o.default.createElement(s.Link,{className:"mr5 color-grey-8",to:"/"+d+"/"+p+"/pulls/"+t.pull_request_id},o.default.createElement("i",{className:"iconfont icon-huifu1 font-15 mr5 ver-middle"}),t.journals_count):"",l&&0===t.pull_request_status?o.default.createElement("div",{className:"milepostleft",style:{display:e.state.orderid===t.id&&e.state.isdisplay?"flex":"none"}},o.default.createElement("div",{className:"grid-item mr15 color-grey-9"},o.default.createElement(s.Link,{to:"/"+d+"/"+p+"/pulls/"+t.pull_request_id+"/edit",className:"color-grey-9"},o.default.createElement("i",{className:"iconfont icon-bianji3 font-14 mr5"})))):""))))}))}())}}]),t}(l.Component);t.default=p},Phz4:function(e,t,n){},VPG4:function(e,t,n){},VSCt:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=h(n("W9HT")),a=h(n("NUBc")),l=h(n("jsC+")),o=h(n("CtXQ")),s=h(n("BvKs")),i=h(n("5rEg")),c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n("04bd"),n("YQTV"),n("aIZi"),n("2oDE"),n("2WkQ"),n("1vPl");var f=n("q1tI"),p=h(f);n("js5m"),n("6JOy"),n("Phz4");var d=h(n("kre1")),m=h(n("LmtA"));n("VPG4");var _=h(n("vDqi")),y=h(n("aqs5"));function h(e){return e&&e.__esModule?e:{default:e}}var b=i.default.Search,g=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.componentDidMount=function(){n.getSelectList(),n.getIssueList()},n.getSelectList=function(){var e=n.props.match.params,t=e.projectsId,r="/"+e.owner+"/"+t+"/issues/index_chosen.json";_.default.get(r).then((function(e){e&&n.setState({issue_chosen:e.data.issue_chosen})})).catch((function(e){console.log(e)}))},n.getIssueList=function(){var e=n.state.select_params,t=n.props.match.params,r=t.projectsId,a="/"+t.owner+"/"+r+"/pulls.json";_.default.get(a,{params:e}).then((function(e){e&&n.setState({data:e.data,issues:e.data.issues,search_count:e.data.search_count,isSpin:!1})})).catch((function(e){console.log(e)}))},n.getMenu=function(e,t,r){n.setState({isSpin:!0});var a=e.key.split("-");"created_on"===a[0]?("desc"===e.item.props.value?n.setState({paix:"最新创建"}):n.setState({paix:"最早创建"}),n.state.select_params.order_name=e.key):"updated_on"===a[0]&&("desc"===e.item.props.value?n.setState({paix:"最新更新"}):n.setState({paix:"最早更新"})),n.state.select_params.order_name=a[0],n.state.select_params.order_type=e.item.props.value,n.state.select_params.page=1,n.getIssueList()},n.getOption=function(e,t,r){n.setState({isSpin:!0});var a,l,o,s="all"===e.key?void 0:e.key;n.setState((o=r,(l="${id}s")in(a={})?Object.defineProperty(a,l,{value:o,enumerable:!0,configurable:!0,writable:!0}):a[l]=o,a)),n.state.select_params[""+t]=s,n.state.select_params.page=1,n.state[t+"s"]=r,n.getIssueList()},n.renderMenu=function(e,t,r){return p.default.createElement(s.default,{className:"orderCondition"},p.default.createElement(s.default.Item,{key:"all",onClick:function(e){return n.getOption(e,r,t)}},t),e&&e.length>0&&e.map((function(e,t){return(!e.permission||e.permission&&"Reporter"!==e.permission)&&p.default.createElement(s.default.Item,{key:e.id,onClick:function(t){return n.getOption(t,r,e.name)}},e.name)})))},n.ChangePage=function(e){n.setState({isSpin:!0}),n.state.select_params.page=e,n.getIssueList()},n.searchFunc=function(e){n.setState({search:e,isSpin:!0}),n.state.select_params.search=e,n.state.select_params.page=1,n.getIssueList()},n.openorder=function(e){n.setState({isSpin:!0}),n.setState({status_type:e,issue_tag_ids:"标记",fixed_version_ids:"里程碑",assigned_to_ids:"审查人员",paix:"排序",priority_ids:"优先级"}),n.state.select_params.status_type=e,n.state.select_params.page=1,n.state.select_params.limit=15,n.getIssueList()},n.state={issue_chosen:void 0,data:void 0,issues:void 0,isSpin:!1,search:void 0,author_id:void 0,assigned_to_id:void 0,search_count:void 0,issue_type:void 0,status_type:"1",openselect:1,closeselect:void 0,issue_tag_ids:"标记",fixed_version_ids:"里程碑",assigned_to_ids:"审查人员",paix:"排序",priority_ids:"优先级",select_params:{status_type:"1",assigned_to_id:void 0,fixed_version_id:void 0,priority_id:void 0,order_name:void 0,order_type:void 0,search:void 0,page:1,limit:15}},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),u(t,[{key:"checkOperation",value:function(){var e=this.props.match.params,t=e.projectsId,n=e.owner;this.props.history.push("/"+n+"/"+t+"/compare/master...master")}},{key:"render",value:function(){var e=this,t=this.props.match.params,n=t.projectsId,i=t.owner,u=this.state,f=u.issue_chosen,_=u.issues,h=(u.limit,u.page,u.search_count),g=u.data,v=u.isSpin,E=u.status_type,O=u.select_params,j=p.default.createElement(s.default,{onClick:function(t){return e.getMenu(t)}},p.default.createElement(s.default.Item,{key:"created_on-desc",value:"desc"},"最新创建"),p.default.createElement(s.default.Item,{key:"created_on-asc",value:"asc"},"最早创建"),p.default.createElement(s.default.Item,{key:"updated_on-desc",value:"desc"},"最新更新"),p.default.createElement(s.default.Item,{key:"updated_on-asc",value:"asc"},"最早更新"));return p.default.createElement("div",{className:"main",style:{padding:"0px"}},p.default.createElement("div",{className:"topWrapper",style:{borderBottom:"none",padding:"20px"}},p.default.createElement("div",{className:"target-detail-search"},p.default.createElement(b,{placeholder:"输入关键字搜索合并请求",enterButton:!0,onSearch:this.searchFunc,style:{width:300}})),g&&g.user_admin_or_developer&&p.default.createElement(y.default,c({},this.props,{className:"topWrapper_btn ml10",sureFunc:function(){return e.checkOperation()}}),"+ 新建合并请求")),p.default.createElement("div",{className:"f-wrap-between screenWrap"},p.default.createElement("div",{className:"df"},p.default.createElement("ul",{className:"searchBanner"},p.default.createElement("li",{className:E?"":"active",onClick:function(){return e.openorder(void 0)}},p.default.createElement("label",null,"搜索结果"),p.default.createElement("span",null,g&&g.search_count)),p.default.createElement("li",{className:"1"===E?"active":"",onClick:function(){return e.openorder("1")}},p.default.createElement("i",{className:"iconfont icon-hebingqingqiu1 font-14 mr3 i_open"}),p.default.createElement("label",null,"开启的"),p.default.createElement("span",null,g&&g.open_count)),p.default.createElement("li",{className:"11"===E?"active":"",onClick:function(){return e.openorder("11")}},p.default.createElement("i",{className:"iconfont icon-hebingqingqiu1 font-14 mr3 i_merged"}),p.default.createElement("label",null,"已合并"),p.default.createElement("span",null,g&&g.merged_issues_size)),p.default.createElement("li",{className:"2"===E?"active":"",onClick:function(){return e.openorder("2")}},p.default.createElement("i",{className:"iconfont icon-hebingqingqiu1 font-14 mr3 i_closed"}),p.default.createElement("label",null,"已拒绝"),p.default.createElement("span",null,g&&g.close_count)))),p.default.createElement("ul",{className:"topWrapper_select"},p.default.createElement("li",null,p.default.createElement(l.default,{className:"topWrapperSelect",overlay:this.renderMenu(f&&f.priority,"优先级","priority_id"),trigger:["click"],placement:"bottomCenter"},p.default.createElement("span",null,this.state.priority_ids,p.default.createElement(o.default,{type:"caret-down",className:"ml5"})))),p.default.createElement("li",null,p.default.createElement(l.default,{className:"topWrapperSelect",overlay:this.renderMenu(f&&f.issue_tag,"标记","issue_tag_id"),trigger:["click"],placement:"bottomCenter"},p.default.createElement("span",null,this.state.issue_tag_ids,p.default.createElement(o.default,{type:"caret-down",className:"ml5"})))),p.default.createElement("li",null,p.default.createElement(l.default,{className:"topWrapperSelect",overlay:this.renderMenu(f&&f.assign_user,"审查人员","assigned_to_id"),trigger:["click"],placement:"bottomCenter"},p.default.createElement("span",null,this.state.assigned_to_ids,p.default.createElement(o.default,{type:"caret-down",className:"ml5"})))),p.default.createElement("li",null,p.default.createElement(l.default,{className:"topWrapperSelect",overlay:this.renderMenu(f&&f.issue_version,"里程碑","fixed_version_id"),trigger:["click"],placement:"bottomCenter"},p.default.createElement("span",null,this.state.fixed_version_ids,p.default.createElement(o.default,{type:"caret-down",className:"ml5"})))),p.default.createElement("li",null,p.default.createElement(l.default,{className:"topWrapperSelect",overlay:j,trigger:["click"],placement:"bottomCenter"},p.default.createElement("span",null,this.state.paix,p.default.createElement(o.default,{type:"caret-down",className:"ml5"})))))),p.default.createElement("div",{style:{minHeight:"470px"}},p.default.createElement(r.default,{spinning:v},g&&g.search_count&&g.search_count>0?p.default.createElement("div",null,p.default.createElement(m.default,c({issues:_,search_count:h,page:O.page,limit:O.limit,project_name:g.project_name,project_author_name:g.project_author_name},this.props,this.state,{user_admin_or_developer:g&&g.user_admin_or_developer}))):"",h>O.limit?p.default.createElement("div",{className:"mt30 mb50 edu-txt-center"},p.default.createElement(a.default,{simple:!0,current:O.page,total:h,pageSize:O.limit,onChange:this.ChangePage})):"",g&&g.issues&&0===g.issues.length?p.default.createElement(d.default,{_html:"暂时还没有相关数据!",projectsId:n,owner:i}):"")))}}]),t}(f.Component);t.default=g},js5m:function(e,t,n){},kre1:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n("q1tI"),o=(r=l)&&r.__esModule?r:{default:r},s=n("eO8H");function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var u=function(e){function t(){return i(this,t),c(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"render",value:function(){var e=this.props,t=(e._html,e.projectsId),n=e.owner;return o.default.createElement("div",{className:"none_panels"},o.default.createElement("div",null,o.default.createElement("div",{className:"mb15"},o.default.createElement("i",{className:"iconfont icon-hebingqingqiu font-80 ver-middle color-grey-b"})),o.default.createElement("h3",null,"欢迎使用合并请求！"),o.default.createElement("div",{className:"color-grey-8"},"合并请求可以帮助您与他人协作编写代码。在使用之前，请先创建一个 ",o.default.createElement(s.Link,{className:"color-blue",to:"/"+n+"/"+t+"/compare/master...master"},"合并请求"))))}}]),t}(l.Component);t.default=u},mr32:function(e,t,n){"use strict";n.r(t);var r=n("q1tI"),a=n("TSYQ"),l=n.n(a),o=n("BGR+"),s=n("VCL8"),i=n("CtXQ"),c=n("H84U");function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(){return(f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=b(e);if(t){var a=b(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return h(this,n)}}function h(e,t){return!t||"object"!==u(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var g=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},v=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(s,e);var t,n,a,o=y(s);function s(){var e;return d(this,s),(e=o.apply(this,arguments)).handleClick=function(){var t=e.props,n=t.checked,r=t.onChange;r&&r(!n)},e.renderCheckableTag=function(t){var n,a=t.getPrefixCls,o=e.props,s=o.prefixCls,i=o.className,c=o.checked,u=g(o,["prefixCls","className","checked"]),d=a("tag",s),m=l()(d,(p(n={},"".concat(d,"-checkable"),!0),p(n,"".concat(d,"-checkable-checked"),c),n),i);return delete u.onChange,r.createElement("span",f({},u,{className:m,onClick:e.handleClick}))},e}return t=s,(n=[{key:"render",value:function(){return r.createElement(c.a,null,this.renderCheckableTag)}}])&&m(t.prototype,n),a&&m(t,a),s}(r.Component),E=n("09Wf"),O=n("6CfX"),j=n("g0mS");function k(e){return(k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function w(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function N(){return(N=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function S(e,t){return(S=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function P(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=I(e);if(t){var a=I(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return x(this,n)}}function x(e,t){return!t||"object"!==k(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function I(e){return(I=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var q=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},T=new RegExp("^(".concat(E.a.join("|"),")(-inverse)?$")),M=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&S(e,t)}(u,e);var t,n,a,s=P(u);function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=s.call(this,e)).state={visible:!0},t.handleIconClick=function(e){e.stopPropagation(),t.setVisible(!1,e)},t.renderTag=function(e){var n=t.props,a=n.children,l=q(n,["children"]),s="onClick"in l||a&&"a"===a.type,i=Object(o.a)(l,["onClose","afterClose","color","visible","closable","prefixCls"]);return s?r.createElement(j.a,null,r.createElement("span",N({},i,{className:t.getTagClassName(e),style:t.getTagStyle()}),a,t.renderCloseIcon())):r.createElement("span",N({},i,{className:t.getTagClassName(e),style:t.getTagStyle()}),a,t.renderCloseIcon())},Object(O.a)(!("afterClose"in e),"Tag","'afterClose' will be deprecated, please use 'onClose', we will remove this in the next version."),t}return t=u,a=[{key:"getDerivedStateFromProps",value:function(e){return"visible"in e?{visible:e.visible}:null}}],(n=[{key:"getTagStyle",value:function(){var e=this.props,t=e.color,n=e.style,r=this.isPresetColor();return N({backgroundColor:t&&!r?t:void 0},n)}},{key:"getTagClassName",value:function(e){var t,n=e.getPrefixCls,r=this.props,a=r.prefixCls,o=r.className,s=r.color,i=this.state.visible,c=this.isPresetColor(),u=n("tag",a);return l()(u,(w(t={},"".concat(u,"-").concat(s),c),w(t,"".concat(u,"-has-color"),s&&!c),w(t,"".concat(u,"-hidden"),!i),t),o)}},{key:"setVisible",value:function(e,t){var n=this.props,r=n.onClose,a=n.afterClose;r&&r(t),a&&!r&&a(),t.defaultPrevented||"visible"in this.props||this.setState({visible:e})}},{key:"isPresetColor",value:function(){var e=this.props.color;return!!e&&T.test(e)}},{key:"renderCloseIcon",value:function(){return this.props.closable?r.createElement(i.default,{type:"close",onClick:this.handleIconClick}):null}},{key:"render",value:function(){return r.createElement(c.a,null,this.renderTag)}}])&&C(t.prototype,n),a&&C(t,a),u}(r.Component);M.CheckableTag=v,M.defaultProps={closable:!1},Object(s.polyfill)(M);t.default=M},u3En:function(e,t,n){}}]);