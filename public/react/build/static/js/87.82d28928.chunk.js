(this.webpackJsonp=this.webpackJsonp||[]).push([[87],{BUDl:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,r=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),l=a("q1tI"),s=(n=l)&&n.__esModule?n:{default:n},c=a("eO8H");a("dVyQ");var o=a("sYIF");function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var d=function(e){function t(){return u(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"render",value:function(){var e=this.props.match.params,t=e.projectsId,a=e.owner,n=this.props.item;return s.default.createElement("div",{className:"activity_item"},s.default.createElement("div",{className:"flex1"},"VersionRelease"===n.trend_type?s.default.createElement("p",{className:"itemLine"},s.default.createElement(c.Link,{to:"/"+a+"/"+t+"/releases",className:"color-blue font-16"},n.name),s.default.createElement("span",{className:"activity_type"},n.trend_type)):"Issue"===n.trend_type?s.default.createElement("p",{className:"itemLine"},s.default.createElement(c.Link,{to:"/"+a+"/"+t+"/issues/"+n.trend_id,className:"color-blue font-16"},n.name),s.default.createElement("span",{className:"activity_type"},n.trend_type)):s.default.createElement("p",{className:"itemLine"},s.default.createElement(c.Link,{to:"/"+a+"/"+t+"/pulls/"+n.trend_id,className:"color-blue font-16"},n.name),s.default.createElement("span",{className:"activity_type"},n.trend_type)),s.default.createElement("p",{className:"itemLine mt10"},s.default.createElement(c.Link,{to:"/"+(n&&n.user_login),className:"show-user-link"},s.default.createElement("img",{alt:"",src:(0,o.getImageUrl)("/"+n.user_avatar),className:"createImage"}),s.default.createElement("span",{className:"mr20"},n.user_name)),n.created_at&&s.default.createElement("span",{className:"color-grey-9"},"创建于",s.default.createElement("span",{className:"ml2 color-grey-6"},n.created_at)))))}}]),t}(l.Component);t.default=d},MN5C:function(e,t,a){},dVyQ:function(e,t,a){},rS1K:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=_(a("NUBc")),r=_(a("W9HT")),l=_(a("jsC+")),s=_(a("CtXQ")),c=_(a("BvKs")),o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},u=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();a("YQTV"),a("04bd"),a("aIZi"),a("2oDE"),a("2WkQ");var i=a("q1tI"),d=_(i);a("7dqz"),a("MN5C"),a("dVyQ");var p=_(a("2CTR")),f=_(a("BUDl")),m=_(a("vDqi"));function _(e){return e&&e.__esModule?e:{default:e}}var y=[{id:"",name:"全部"},{id:1,name:"1天"},{id:3,name:"3天"},{id:7,name:"1周"},{id:30,name:"1个月"}],v=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.componentDidMount=function(){var e=a.state,t=e.time,n=e.type,r=e.status,l=e.page;a.setState({isSpin:!0}),a.getInfo(t,n,r,l)},a.getInfo=function(e,t,n,r){var l=a.props.match.params,s=l.projectsId,c="/"+l.owner+"/"+s+"/activity.json";m.default.get(c,{params:{time:e,type:t,status:n,page:r}}).then((function(e){e&&(a.setState({data:e.data,project_trends:e.data.project_trends,isSpin:!1,pr_count:e.data.pr_count,new_pr_count:e.data.new_pr_count,close_issues_count:e.data.close_issues_count,open_issues_count:e.data.open_issues_count,pr_all_count:e.data.pr_all_count,issues_count:e.data.issues_count}),window.scrollTo(0,0))})).catch((function(e){console.log(e)}))},a.changeTime=function(e){a.setState({time:"item_0"===e.key?void 0:e.key,isSpin:!0});var t=a.state,n=t.type,r=t.status,l=t.page;a.getInfo("item_0"===e.key?void 0:e.key,n,r,l)},a.changeTrends=function(e,t){a.setState({type:e,status:t,page:1});var n=a.state.time;a.getInfo(n,e,t,1)},a.ChangePage=function(e){a.setState({page:e});var t=a.state,n=t.time,r=t.type,l=t.status;a.getInfo(n,r,l,e)},a.menu=function(){return d.default.createElement(c.default,null,y&&y.map((function(e,t){return d.default.createElement(c.default.Item,{key:e.id,onClick:a.changeTime},e.name)})))},a.state={time:void 0,type:void 0,state:void 0,page:1,pr_count:void 0,new_pr_count:void 0,close_issues_count:void 0,open_issues_count:void 0,pr_all_count:void 0,issues_count:void 0,data:void 0,project_trends:void 0,isSpin:!1},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),u(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.time,c=t.data,u=t.page,i=t.project_trends,m=t.isSpin,_=t.pr_count,v=t.new_pr_count,E=t.close_issues_count,h=t.open_issues_count,g=t.pr_all_count,b=t.issues_count,N=a?y.filter((function(e){return e.id===parseInt(a)})):[{name:"全部"}],w=g>0?100*parseFloat(_/g).toFixed(2)+"%":"50%",j=g>0?100*parseFloat(v/g).toFixed(2)+"%":"50%",k=b>0?100*parseFloat(E/b).toFixed(2)+"%":"50%",O=b>0?100*parseFloat(h/b).toFixed(2)+"%":"50%";return d.default.createElement("div",{className:"main"},d.default.createElement("div",{className:"normalBox"},d.default.createElement("div",{class:"normalBox-title"},"概览"),d.default.createElement("div",{className:"orderInfo"},d.default.createElement("div",null,d.default.createElement("div",{className:"percentLine prPercent"},d.default.createElement("p",{className:"percent_purple",style:{width:w}}),d.default.createElement("p",{className:"percent_green resetStyle",style:{width:""+j}})),d.default.createElement("span",null,c&&c.pr_all_count,"合并请求")),d.default.createElement("div",null,d.default.createElement("div",{className:"percentLine"},d.default.createElement("p",{className:"percent_red",style:{width:""+k}}),d.default.createElement("p",{className:"percent_green",style:{width:""+O}})),d.default.createElement("span",null,c&&c.issues_count,"易修"))),d.default.createElement("ul",{className:"percentBox"},d.default.createElement("li",null,d.default.createElement("span",{className:"purple"},c&&c.pr_count),d.default.createElement("span",{className:"change",onClick:function(){return e.changeTrends("PullRequest","delay")}},"已处理的合并请求")),d.default.createElement("li",null,d.default.createElement("span",{className:"green"},c&&c.new_pr_count),d.default.createElement("span",{className:"change",onClick:function(){return e.changeTrends("PullRequest","not_delay")}},"未处理的合并请求")),d.default.createElement("li",null,d.default.createElement("span",{className:"red"},c&&c.close_issues_count),d.default.createElement("span",{className:"change",onClick:function(){return e.changeTrends("Issue","delay")}},"已关闭的易修")),d.default.createElement("li",null,d.default.createElement("span",{className:"green"},c&&c.open_issues_count),d.default.createElement("span",{className:"change",onClick:function(){return e.changeTrends("Issue","not_delay")}},"未处理的易修")))),d.default.createElement("div",{className:"df trendsTop mt20"},d.default.createElement("div",{className:"branchDropdown f-wrap-alignCenter"},d.default.createElement(l.default,{overlay:this.menu(),trigger:["click"],placement:"bottomLeft"},d.default.createElement("a",{className:"ant-dropdown-link"},d.default.createElement("span",{className:"color-grey-9 mr3"},"周期:"),N&&N.length>0&&N[0].name," ",d.default.createElement(s.default,{type:"down"}))))),d.default.createElement(r.default,{spinning:m},i&&i.length>0?d.default.createElement("div",{className:"activity_list"},i&&i.map((function(t,a){return d.default.createElement(f.default,o({item:t},e.props))}))):d.default.createElement(p.default,{_html:"暂时还没有相关数据!"})),c&&c.project_trends_size>0&&c.project_trends_size>15&&d.default.createElement("div",{className:"pageDIV"},d.default.createElement(n.default,{showQuickJumper:!0,defaultCurrent:u,total:c&&c.project_trends_size,pageSize:15,onChange:this.ChangePage})))}}]),t}(i.Component);t.default=v}}]);