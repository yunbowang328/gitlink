(this.webpackJsonp=this.webpackJsonp||[]).push([[114],{"6JOy":function(e,t,a){},fyLZ:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=E(a("W9HT")),n=E(a("NUBc")),l=E(a("NJEC")),o=E(a("jsC+")),r=E(a("CtXQ")),c=E(a("BvKs")),i=E(a("wFql")),u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e},d=function(){function e(e,t){for(var a=0;a<t.length;a++){var s=t[a];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,a,s){return a&&e(t.prototype,a),s&&e(t,s),t}}();a("04bd"),a("YQTV"),a("k994"),a("aIZi"),a("2oDE"),a("2WkQ"),a("O+5t");var m=a("q1tI"),f=E(m),p=a("eO8H"),v=E(a("2CTR")),g=E(a("vDqi"));a("6JOy");var y=E(a("aqs5"));function E(e){return e&&e.__esModule?e:{default:e}}var _=i.default.Text,h=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.componentDidMount=function(){a.getList(1,a.state.status,"desc")},a.getList=function(e,t,s,n){var l=a.props.match.params,o=l.projectsId,r=l.owner,c=a.state.limit,i="/"+r+"/"+o+"/milestones.json";g.default.get(i,{params:{projectsId:o,page:e,limit:c,status:t,order_type:s,order_name:n}}).then((function(e){e&&a.setState({data:e.data,spinings:!1})})).catch((function(e){console.log(e)}))},a.opneMilelist=function(e){var t=a.state.order_name;if(e){var s=a.props.current_user;1===e?(a.setState({status:"open",openselect:s.user_id,closeselect:void 0}),a.getList(1,"open","desc",t)):(a.setState({status:"closed",openselect:void 0,closeselect:s.user_id}),a.getList(1,"closed","desc",t))}},a.updatestatusemile=function(e,t){var s=a.props.match.params,n=s.projectsId,l="/"+s.owner+"/"+n+"/milestones/"+t.id+"/update_status.json",o=a.props.current_user;g.default.post(l,{project_id:n,id:t.id,status:e}).then((function(t){if(t){a.setState({status:e,closeselect:"closed"===e?o.user_id:void 0,openselect:"closed"===e?void 0:o.user_id}),a.getList(1,e,"desc");var s=a.props.getDetail;s&&s()}})).catch((function(e){console.log(e)}))},a.closemile=function(e){var t=a.props.match.params,s=t.projectsId,n="/"+t.owner+"/"+s+"/milestones/"+e.id+".json";g.default.delete(n,{data:{project_id:s,id:e.id}}).then((function(e){if(e){a.getList(1,a.state.status,"desc");var t=a.props.getDetail;t&&t()}})).catch((function(e){console.log(e)}))},a.ChangePage=function(e){document.body.scrollIntoView(),a.setState({page:e});var t=a.state.status;a.getList(e,t)},a.arrayList=function(e){a.setState({order_name:e.key,order_type:e.item.props.value}),a.getList(1,a.state.status,e.item.props.value,e.key)},a.newshow=function(){a.setState({display:"block"})},a.newclose=function(){a.setState({display:"none"})},a.state={data:void 0,limit:15,page:1,order_type:void 0,display:"none",status:"open",openselect:1,closeselect:void 0,order_name:void 0,spinings:!0},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),d(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.data,i=t.limit,d=t.page,m=t.openselect,g=t.closeselect,E=t.spinings,h=this.props.match.params,N=h.projectsId,b=h.owner,w=f.default.createElement(c.default,{className:"orderCondition",onClick:this.arrayList},f.default.createElement(c.default.Item,{key:"effective_date",value:"desc"},"到期日从后到先"),f.default.createElement(c.default.Item,{key:"effective_date",value:"asc"},"到期日从先到后"),f.default.createElement(c.default.Item,{key:"percent",value:"asc"},"完成度从低到高"),f.default.createElement(c.default.Item,{key:"percent",value:"desc"},"完成度从高到低"),f.default.createElement(c.default.Item,{key:"issues_count",value:"desc"},"任务从多到少"),f.default.createElement(c.default.Item,{key:"issues_count",value:"asc"},"任务从少到多"));return f.default.createElement(s.default,{spinning:E},f.default.createElement("div",{className:"main",style:{minHeight:"400px"}},f.default.createElement("div",{style:{display:this.state.display}},f.default.createElement("div",{className:"tagdiv"},f.default.createElement("span",null,"里程碑",a&&a.issue_tags_count,"已创建"))),f.default.createElement("div",{className:"topWrapper",style:{borderBottom:"1px solid #eee"}},f.default.createElement("div",{className:"topWrapper_type_infos"},f.default.createElement("li",{className:m?"active":"",onClick:function(){return e.opneMilelist(1)}},a&&a.open_count,"个开启中"),f.default.createElement("li",{className:g?"active":"",onClick:function(){return e.opneMilelist(2)}},a&&a.closed_count,"个已关闭")),f.default.createElement("div",{className:"topWrapper_select"},f.default.createElement("ul",{className:"topWrapper_select mb-0"},f.default.createElement("li",null,f.default.createElement(o.default,{className:"topWrapperSelect",overlay:w,trigger:["click"],placement:"bottomCenter"},f.default.createElement("span",null,"排序",f.default.createElement(r.default,{type:"caret-down",className:"ml5"}))))),a&&a.user_admin_or_member?f.default.createElement(y.default,u({},this.props,{className:"topWrapper_btn",sureFunc:function(){e.props.history.push("/"+b+"/"+N+"/milestones/new")}}),"新的里程碑"):"")),a&&a.versions&&a.versions.length>0&&f.default.createElement("div",{className:"tagList"},a.versions.map((function(t,s){return f.default.createElement("div",{style:{display:"block"},key:s},f.default.createElement("div",{className:"milepostdiv"},f.default.createElement("div",{className:"milepostwidth"},f.default.createElement("div",{className:"grid-item width100"},f.default.createElement("i",{className:"iconfont icon-lubiaosignpost3 font-12 mr3"}),f.default.createElement(p.Link,{to:"/"+b+"/"+N+"/milestones/"+t.id,className:"font-16"},t.name)))),f.default.createElement("div",{className:"milepostdiv",style:{marginTop:5}},f.default.createElement("div",{className:"milepostrighe"},f.default.createElement("div",{className:"grid-item mr10"},f.default.createElement("i",{className:"iconfont icon-rili font-14 mr5"}),f.default.createElement("span",{className:t.effective_date?"color-red":"color-grey-c"},t.effective_date||"暂无截止时间")),f.default.createElement("div",{className:"grid-item mr10 color-grey-9"},f.default.createElement("i",{className:"iconfont icon-issue font-14 mr5"}),f.default.createElement("span",null,t.open_issues_count,"个开启")),f.default.createElement("div",{className:"grid-item mr10 color-grey-9"},f.default.createElement("i",{className:"iconfont icon-shanchudiao font-14 mr5"}),f.default.createElement("span",null,t.close_issues_count,"个关闭"))),a&&a.user_admin_or_member?f.default.createElement("div",{className:"milepostleft"},f.default.createElement("div",{className:"grid-item ml15 color-grey-9"},f.default.createElement("i",{className:"iconfont icon-bianji3 font-14 mr5"}),f.default.createElement(p.Link,{to:"/"+b+"/"+N+"/milestones/"+t.id+"/edit",className:"color-grey-9"},"编辑")),f.default.createElement("div",{className:"grid-item ml15 color-grey-9"},f.default.createElement("i",{className:"closed"===t.status?"iconfont icon-gouxuan font-14 mr5":"iconfont icon-yiguanbi1 font-14 mr5"}),f.default.createElement("a",{onClick:function(){return e.updatestatusemile("closed"===t.status?"open":"closed",t)},className:"color-grey-9"},"closed"===e.state.status?"开启":"关闭")),f.default.createElement("div",{className:"grid-item ml15 color-grey-9"},f.default.createElement("i",{className:"iconfont icon-lajitong font-14 mr5"}),f.default.createElement(l.default,{placement:"bottom",title:"是否删除里程碑？",okText:"是",cancelText:"否",onConfirm:function(){return e.closemile(t)}},f.default.createElement("a",{className:"color-grey-9"},"删除")))):""),f.default.createElement("div",{className:"milepostdiv",style:{marginTop:5}},f.default.createElement("div",{className:"textwidth"},f.default.createElement(_,{type:"secondary",ellipsis:{rows:30,expandable:!1,onExpand:Function}},t.description))))}))),a&&a.versions&&0===a.versions.length&&f.default.createElement(v.default,{_html:"暂无里程碑"}),a&&a.versions_count>i?f.default.createElement("div",{className:"mt30 mb50 edu-txt-center"},f.default.createElement(n.default,{simple:!0,current:d,total:a&&a.versions_count,pageSize:i,onChange:this.ChangePage})):""))}}]),t}(m.Component);t.default=h}}]);