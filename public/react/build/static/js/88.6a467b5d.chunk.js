(this.webpackJsonp=this.webpackJsonp||[]).push([[88],{"32zL":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=h(a("W9HT")),r=h(a("kaz8")),l=h(a("Vl3Y")),o=h(a("2fM7")),i=h(a("5rEg")),c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},u=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();a("04bd"),a("MKzF"),a("tULf"),a("8QGh"),a("1vPl");var s=a("q1tI"),d=h(s),f=h(a("ess8")),p=a("spEH"),m=h(a("o5MD")),v=a("eO8H"),g=h(a("vDqi"));function h(e){return e&&e.__esModule?e:{default:e}}a("NzgE");var E=i.default.TextArea,y=o.default.Option,b=[{name:"主页",index:"home"},{name:"代码库",index:"code"},{name:"易修 (Issue)",index:"issues"},{name:"合并请求",index:"pulls"},{name:"Wiki",index:"wiki"},{name:"工作流(beta版)",index:"devops"},{name:"里程碑",index:"versions"},{name:"动态",index:"activity"}],_=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.componentDidUpdate=function(e){e&&a.props&&!a.props.checkIfLogin()&&a.props.history.push("/403")},a.componentDidMount=function(){a.getCategory(),a.getLanguage(),a.getInfo()},a.getLanguage=function(){g.default.get("/project_languages.json").then((function(e){if(e){var t=a.setOptionsList(e.data.project_languages);a.setState({LanguageList:t})}})).catch((function(e){}))},a.getInfo=function(){var e=a.props.match.params,t=e.projectsId,n="/"+e.owner+"/"+t+"/edit.json";g.default.get(n).then((function(e){if(e){var t=a.state.project_units,n=e.data.project_units;n.push.apply(n,function(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}(t)),a.props.form.setFieldsValue(c({},e.data,{project_units:n})),a.setState({projectName:e.data.project_name,private_check:e.data.private,loading:!1,project_units:n,transfer:e.data.transfer,is_transfering:e.data.is_transfering})}})).catch((function(e){console.log(e)}))},a.getCategory=function(){g.default.get("/project_categories.json").then((function(e){if(e){var t=a.setOptionsList(e.data.project_categories);a.setState({CategoryList:t})}})).catch((function(e){}))},a.setOptionsList=function(e){var t=void 0;return e&&e.length>0&&(t=e.map((function(e,t){return d.default.createElement(y,{key:e.id,value:e.id},e.name)}))),t},a.resetSetting=function(){a.props.form.validateFields((function(e,t){if(!e){a.setState({loading:!0});var n=a.props.match.params,r=n.projectsId,l="/"+n.owner+"/"+r+"/project_units.json",o=t.project_units.filter((function(e){return"home"!==e&&"activity"!==e&&"code"!==e}));g.default.post(l,{unit_types:o}).then((function(e){e&&a.update(t)})).catch((function(e){}))}}))},a.update=function(e){var t=a.props.match.params,n=t.projectsId,r=t.owner,l=a.state.private_check,o="/"+r+"/"+n+".json";g.default.put(o,c({name:e.project_name,description:e.project_description,private:l,identifier:e.project_identifier},e)).then((function(t){if(t)if(a.props.showNotification("仓库信息修改成功！"),e.project_identifier!==n)a.props.history.push("/"+r+"/"+e.project_identifier+"/settings");else{var l=a.props.getDetail;l&&l()}a.setState({loading:!1})})).catch((function(e){a.setState({loading:!1})}))},a.deleteProject=function(){var e=a.props.match.params,t=e.projectsId,n=e.owner,r=a.state.projectName;a.props.confirm({content:d.default.createElement("span",{style:{display:"block",textAlign:"left"}},"该操作无法撤销！且将会一并删除相关的易修、合并请求、工作流、里程碑、动态等数据。",d.default.createElement("br",null),"是否确认删除 ",d.default.createElement("span",{style:{fontWeight:"bold"}},n,"/",r,"(",t,")"),"？"),onOk:function(){var e="/"+n+"/"+t+".json";g.default.delete(e).then((function(e){a.props.showNotification("仓库删除成功！"),a.props.history.push("/"+n)})).catch((function(e){console.log(e)}))}})},a.changePrivate=function(e){a.setState({private_check:e.target.checked})},a.DivertProject=function(){a.setState({divertVisible:!0})},a.CancelDivertProject=function(){a.props.confirm({content:"是否确认取消将此项目转移给他人？",onOk:function(){var e=a.props.match.params,t=e.projectsId,n="/"+e.owner+"/"+t+"/applied_transfer_projects/cancel.json";g.default.post(n).then((function(e){e&&e.data&&a.setState({is_transfering:!1})})).catch((function(e){}))}})},a.onSuccess=function(e){e&&a.setState({is_transfering:!0,transfer:e}),a.setState({divertVisible:!1})},a.state={CategoryList:void 0,LanguageList:void 0,private_check:void 0,loading:!0,project_units:["home","activity","code"],divertVisible:!1,is_transfering:void 0,projectName:void 0},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),u(t,[{key:"render",value:function(){var e=this,t=this.props.form.getFieldDecorator,a=this.props.match.params,c=a.projectsId,u=a.owner,s=this.props.projectDetail,g=this.state,h=g.CategoryList,_=g.LanguageList,j=g.private_check,w=g.loading,x=g.divertVisible,k=g.is_transfering,O=g.transfer,N=s&&s.mirror,S=s&&s.type,I=this.props&&this.props.projectDetail&&this.props.projectDetail.forked_from_project_id;return d.default.createElement("div",null,d.default.createElement(m.default,{owner:u,repo:c,visible:x,onSuccess:this.onSuccess,onCancel:function(){e.setState({divertVisible:!1})}}),d.default.createElement(n.default,{spinning:w},d.default.createElement(p.WhiteBack,null,d.default.createElement(f.default,null,"基本设置"),d.default.createElement(l.default,{className:"baseForm"},d.default.createElement(l.default.Item,{label:"项目名称"},t("project_name",{rules:[{required:!0,message:"请输入项目名称"}]})(d.default.createElement(i.default,{placeholder:"请输入项目名称"}))),d.default.createElement("div",{className:"df",style:{alignItems:"center"}},d.default.createElement("span",{className:"mr20 mb15 font-16"},"可见性"),d.default.createElement(l.default.Item,{label:""},t("private",{rules:[]})(d.default.createElement(r.default,{checked:j,onChange:this.changePrivate,disabled:I},d.default.createElement("span",{className:"color-grey-9"},"将仓库设为私有"),d.default.createElement("span",{className:"color-grey-6"},I?"（Fork仓库的可见性实时同步自源仓库，不支持直接修改）":"（修改仓库的可见性，将会影响到该仓库下所有Fork仓库的可见性）"))))),d.default.createElement(l.default.Item,{label:d.default.createElement("span",null,"项目标识 ",d.default.createElement("span",{className:"color-grey-9"},"(项目url标识部分，更改项目标识将导致原仓库地址失效)"))},t("project_identifier",{rules:[{required:!0,message:"请输入项目标识"}]})(d.default.createElement(i.default,{placeholder:"项目标识请使用与项目相关的英文关键字",maxLength:"100"}))),d.default.createElement(l.default.Item,{label:"项目简介"},t("project_description",{rules:[]})(d.default.createElement(E,{placeholder:"请输入项目简介",style:{height:"80px"},maxLength:200}))),d.default.createElement(l.default.Item,{label:"项目类别"},t("project_category_id",{rules:[]})(d.default.createElement(o.default,null,d.default.createElement(y,{key:0,value:""},"未选择项目类别"),h))),d.default.createElement(l.default.Item,{label:"项目语言"},t("project_language_id",{rules:[]})(d.default.createElement(o.default,null,d.default.createElement(y,{key:0,value:""},"未选择项目语言"),_))),d.default.createElement(l.default.Item,{label:"项目导航"},t("project_units",{rules:[]})(d.default.createElement(r.default.Group,null,b.map((function(e,t){return d.default.createElement(r.default,{key:t,value:e.index,disabled:"home"===e.index||"activity"===e.index||"code"===e.index||N&&S&&2===S&&"pulls"===e.index},e.name)}))))),d.default.createElement("p",{className:"clearfix"},d.default.createElement("a",{className:"submitBtn",onClick:this.resetSetting},"更新仓库设置")))),s&&s.permission&&("Admin"===s.permission||"Owner"===s.permission)?d.default.createElement(p.WhiteBack,{className:"dangerousBox mb20"},d.default.createElement("div",null,d.default.createElement("div",{className:"dangerousTitle"},"危险操作区"),d.default.createElement("div",{className:"flex-a-center padding15-10",style:{borderBottom:"1px solid #f9edbe"}},d.default.createElement("div",null,d.default.createElement("p",{className:"font-bd font-16"},"转移仓库"),d.default.createElement("p",{className:"mt10"},k?d.default.createElement("span",null,"此仓库正在转移给【",O&&d.default.createElement(v.Link,{to:O.login},O.name),"】，请联系对方接收此仓库。"):"将此仓库转移给其他用户或组织")),k?d.default.createElement("a",{onClick:this.CancelDivertProject,className:"red_deleteBtn"},"取消转移"):d.default.createElement("a",{onClick:this.DivertProject,className:"red_deleteBtn"},"转移")),d.default.createElement("div",{className:"flex-a-center padding15-10"},d.default.createElement("div",null,d.default.createElement("p",{className:"font-bd font-16"},"删除本仓库"),d.default.createElement("p",{className:"mt10"},"删除仓库是永久性的, 无法撤消，且删除后，与仓库关联的项目/任务/合并请求/版本发布等，均会被删除")),d.default.createElement("a",{onClick:this.deleteProject,className:"red_deleteBtn"},"删除本仓库")))):""))}}]),t}(s.Component),j=l.default.create({name:"settingForm"})(_);t.default=j},Omli:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=u(a("lrIw")),r=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var a=[],n=!0,r=!1,l=void 0;try{for(var o,i=e[Symbol.iterator]();!(n=(o=i.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(e){r=!0,l=e}finally{try{!n&&i.return&&i.return()}finally{if(r)throw l}}return a}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};a("bipt");var l=a("q1tI"),o=u(l),i=a("sYIF"),c=u(a("vDqi"));function u(e){return e&&e.__esModule?e:{default:e}}var s=n.default.Option;t.default=function(e){var t=e.getUser,a=e.placeholder,u=e.width,d=e.value,f=(0,l.useState)(void 0),p=r(f,2),m=p[0],v=p[1],g=(0,l.useState)(void 0),h=r(g,2),E=h[0],y=h[1];return(0,l.useEffect)((function(){d||y(void 0)}),[d]),(0,l.useEffect)((function(){c.default.get("/users/list.json",{params:{search:E}}).then((function(e){var t,a;e&&(t=e.data.users,a=t&&t.map((function(e,t){return o.default.createElement(s,{key:t,value:""+e.user_id,login:""+e.login,name:e.username},o.default.createElement("img",{className:"user_img radius",width:"28",height:"28",src:(0,i.getImageUrl)("/"+(e&&e.image_url)),alt:""}),o.default.createElement("span",{className:"ml10",style:{"vertical-align":"middle"}},e.username,o.default.createElement("span",{className:"color-grey ml10"},"(",e.login,")")))})),v(a))})).catch((function(e){console.log(e)}))}),[E]),o.default.createElement("div",{className:"addPanel"},o.default.createElement(n.default,{getPopupContainer:function(e){return e.parentNode},dataSource:m,value:E,style:{width:u||300},onChange:function(e){y(e)},onSelect:function(e,a){y(a.props.name),t(a.props.login)},placeholder:a||"搜索需要添加的用户...",allowClear:!0}))}},QMaS:function(e,t,a){},ess8:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,r,l=(n=["{\n  background-color:#fff;\n  padding:20px 30px;\n  border-bottom:1px solid #eee;\n  font-size:16px;\n  color:#333;\n  display:flex;\n  justify-content: space-between;\n  align-items:center;\n}"],r=["{\n  background-color:#fff;\n  padding:20px 30px;\n  border-bottom:1px solid #eee;\n  font-size:16px;\n  color:#333;\n  display:flex;\n  justify-content: space-between;\n  align-items:center;\n}"],Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(r)}}))),o=i(a("q1tI"));function i(e){return e&&e.__esModule?e:{default:e}}var c=i(a("vOnD")).default.div(l);t.default=function(e){var t=e.children;return o.default.createElement(c,null,t)}},o5MD:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=m(a("kLXV")),r=m(a("5rEg")),l=m(a("Vl3Y")),o=m(a("9yH6")),i=m(a("2fM7")),c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},u=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var a=[],n=!0,r=!1,l=void 0;try{for(var o,i=e[Symbol.iterator]();!(n=(o=i.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(e){r=!0,l=e}finally{try{!n&&i.return&&i.return()}finally{if(r)throw l}}return a}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};a("k3Gp"),a("1vPl"),a("tULf"),a("K4yd"),a("8QGh");var s=a("q1tI"),d=m(s),f=m(a("Omli"));a("QMaS");var p=m(a("vDqi"));function m(e){return e&&e.__esModule?e:{default:e}}var v=i.default.Option;t.default=l.default.create()((0,s.forwardRef)((function(e){var t=e.form,a=e.visible,m=e.onSuccess,g=e.onCancel,h=e.owner,E=e.repo,y=t.getFieldDecorator,b=t.validateFields,_=t.setFieldsValue,j=(0,s.useState)(0),w=u(j,2),x=w[0],k=w[1],O=(0,s.useState)(void 0),N=u(O,2),S=N[0],I=N[1],C=(0,s.useState)(void 0),P=u(C,2),L=P[0],D=P[1];return(0,s.useEffect)((function(){_({goal:x})}),[]),(0,s.useEffect)((function(){var e;h&&E&&!0===a&&(e="/"+h+"/"+E+"/applied_transfer_projects/organizations.json",p.default.get(e).then((function(e){e&&D(e.data.organizations)})).catch((function(e){}))),a||(_({owner_name:void 0,identifier:void 0}),I(void 0))}),[E,h,a]),d.default.createElement(n.default,{width:"620px",visible:a,title:"转移仓库",onCancel:g,onOk:function(){b((function(e,t){if(!e){var a="/"+h+"/"+E+"/applied_transfer_projects.json";p.default.post(a,c({},t)).then((function(e){e&&e.data.id?m(e.data&&e.data.owner):m()})).catch((function(e){}))}}))},okText:"确认转移",cancelText:"取消",centered:!0},d.default.createElement("div",{className:"diverModal"},0===x?d.default.createElement("ul",{className:"descUl"},d.default.createElement("li",null,"转移需对方确认接受，转移成功后你将被移出仓库，其他已有成员权限不变"),d.default.createElement("li",null,"转移成功后，仓库的地址将变更至目标用户的命名空间下"),d.default.createElement("li",null,"已有成员如需继续操作仓库，需更新本地仓库的remote，使之指向新的地址")):d.default.createElement("ul",{className:"descUl"},d.default.createElement("li",null,"仓库仅可以转移到您具有管理权限的组织中"),d.default.createElement("li",null,"涉及到仓库改名操作，请提前做好仓库备份并且在转移后对本地仓库的remote进行修改"),d.default.createElement("li",null,"转移仓库到组织后，你和组织创建者/管理员同时拥有对该仓库的管理操作")),d.default.createElement(l.default,c({},{labelCol:{span:5},wrapperCol:{span:18}},{colon:!1,layout:"horizontal"}),d.default.createElement(l.default.Item,{label:"转移给:",style:{marginBottom:"0px"}},y("goal",{rules:[]})(d.default.createElement(o.default.Group,{onChange:function(e){k(e.target.value),_({owner_name:void 0})}},d.default.createElement(o.default,{value:0},"个人"),d.default.createElement(o.default,{value:1},"组织")))),0===x&&d.default.createElement(l.default.Item,{label:" "},y("owner_name",{rules:[{required:!0,message:"请输入目标用户名"}]})(d.default.createElement(f.default,{getUser:function(e){I(e),_({owner_name:e})},width:"100%",placeholder:"请输入目标用户",value:S}))),1===x&&d.default.createElement(l.default.Item,{label:" "},y("owner_name",{rules:[{required:!0,message:"请选择目标组织"}]})(d.default.createElement(i.default,{placeholder:"请选择目标组织",getPopupContainer:function(e){return e.parentNode}},L&&L.length>0?L.map((function(e,t){return d.default.createElement(v,{value:e.name},e.nickname)})):""))),d.default.createElement(l.default.Item,{label:"仓库标识:",style:{marginBottom:"0px"}},y("identifier",{rules:[{required:!0,message:"请输入仓库标识！"},{validator:function(e,t,a){t||a(),E&&t!==E&&a("请输入当前项目的标识！"),a()}}]})(d.default.createElement(r.default,{placeholder:"请输入仓库标识",autoComplete:"off"}))),d.default.createElement("span",{className:"color-grey-9",style:{marginLeft:"120px"}},"请输入当前项目的标识：",d.default.createElement("span",{className:"ml5 mr5 color-grey-3"},E),"进行确认！"))))})))}}]);