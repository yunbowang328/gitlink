(this.webpackJsonp=this.webpackJsonp||[]).push([[103],{"008G":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,l=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),o=a("q1tI"),r=(n=o)&&n.__esModule?n:{default:n},s=a("eO8H");function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}a("6JOy");var u=function(e){function t(){return c(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),l(t,[{key:"render",value:function(){var e=this.props.match.params,t=e.projectsId,a=e.owner;return r.default.createElement("p",{className:"topWrapper_nav"},r.default.createElement(s.NavLink,{activeClassName:"active",className:"issue-type-button",to:"/"+a+"/"+t+"/issues/tags"},"标记"),r.default.createElement(s.NavLink,{activeClassName:"active",className:"issue-type-button",to:"/"+a+"/"+t+"/milestones"},"里程碑"))}}]),t}(o.Component);t.default=u},"6JOy":function(e,t,a){},DTGX:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=E(a("kLXV")),l=E(a("NUBc")),o=E(a("NJEC")),r=E(a("jsC+")),s=E(a("CtXQ")),c=E(a("Vl3Y")),i=E(a("5rEg")),u=E(a("BvKs")),d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},p=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();a("k3Gp"),a("YQTV"),a("k994"),a("aIZi"),a("2oDE"),a("tULf"),a("1vPl"),a("2WkQ");var f=a("q1tI"),m=E(f),h=E(a("008G")),g=E(a("2CTR")),v=a("WFjJ"),y=E(a("/FUP")),b=E(a("vDqi"));function E(e){return e&&e.__esModule?e:{default:e}}var _=(0,y.default)({default:{color:{width:"20px",height:"20px",borderRadius:"2px",background:"rgba("+(void 0).state.color.r+", "+(void 0).state.color.g+", "+(void 0).state.color.b+", "+(void 0).state.color.a+")"},swatch:{padding:"5px",background:"#fff",borderRadius:"1px",width:"100px",marginTop:"5px",height:"28px",boxShadow:"0 0 0 1px rgba(0,0,0,.1)",display:"flex",cursor:"pointer"},popover:{position:"absolute",zIndex:"2"},cover:{position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"},modalcolor:{width:"20px",height:"20px",borderRadius:"2px",background:(void 0).state.newcolor}}}),w=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.componentDidMount=function(){a.getList()},a.getList=function(e,t,n){var l=a.props.match.params,o=l.projectsId,r=l.owner,s=a.state.limit,c="/projects/"+r+"/"+o+"/labels.json";b.default.get(c,{params:{page:e,limit:s,order_name:t,order_type:n}}).then((function(e){e&&a.setState({data:e.data})})).catch((function(e){console.log(e)}))},a.createtagpost=function(){a.props.form.validateFieldsAndScroll((function(e,t){if(!e){var n=a.props.match.params,l=n.projectsId,o="/projects/"+n.owner+"/"+l+"/labels.json";b.default.post(o,d({},t,{project_id:l,color:a.state.textcolor})).then((function(e){e&&(a.props.form.setFieldsValue({name:"",description:""}),a.setState({color:{r:"241",g:"112",b:"19",a:"1"},textcolor:"#F17013",display:"none"}),a.getList())})).catch((function(e){console.log(e)}))}}))},a.ChangePage=function(e){a.setState({page:e}),a.getList(e)},a.arrayList=function(e){a.setState({order_name:e.key,order_type:e.item.props.value}),a.getList(1,e.key,e.item.props.value)},a.handleClick=function(){a.setState({displayColorPicker:!a.state.displayColorPicker})},a.handleClose=function(){a.setState({displayColorPicker:!1})},a.handleChange=function(e){a.setState({color:e.rgb,textcolor:e.hex,newcolor:e.hex})},a.newshow=function(){a.setState({display:"block"})},a.newclose=function(){a.setState({display:"none"})},a.handleok=function(){a.updatetag()},a.updatetag=function(){var e=a.props.match.params,t=e.projectsId,n=e.owner,l=a.state.id,o="/projects/"+n+"/"+t+"/labels/"+l+".json",r=a.state.name,s=a.state.description,c=a.state.newcolor;b.default.put(o,{project_id:t,id:l,name:r,description:s,color:c}).then((function(e){e&&(a.setState({isShow:!1}),a.getList())})).catch((function(e){console.log(e)}))},a.deletetag=function(e){var t=a.props.match.params,n=t.projectsId,l="/projects/"+t.owner+"/"+n+"/labels/"+e+".json";b.default.delete(l,{data:{project_id:n,id:e}}).then((function(e){e&&a.getList()})).catch((function(e){console.log(e)}))},a.handleCancel=function(){a.setState({isShow:!1})},a.changmodelname=function(e){a.setState({name:e.target.value})},a.changdescription=function(e){a.setState({description:e.target.value})},a.editshow=function(e){a.setState({isShow:!0,newcolor:e.color,name:e.name,description:e.description,id:e.id})},a.menu=function(){return m.default.createElement(u.default,{onClick:a.arrayList},m.default.createElement(u.default.Item,{key:"created_at",value:"desc"},"按创建时间降序排序"),m.default.createElement(u.default.Item,{key:"created_at",value:"asc"},"按创建时间升序排序"),m.default.createElement(u.default.Item,{key:"issues_count",value:"desc"},"按issue个数降序排序"),m.default.createElement(u.default.Item,{key:"issues_count",value:"asc"},"按issue个数升序排序"))},a.state={data:void 0,limit:15,page:1,order_name:void 0,order_type:void 0,display:"none",displayColorPicker:!1,color:{r:"241",g:"112",b:"19",a:"1"},textcolor:"#F17013",isShow:!1,newcolor:"",name:"",description:"",id:"",modelname:""},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),p(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.data,u=t.limit,p=t.page,f=this.props.form.getFieldDecorator;return m.default.createElement("div",{className:"main"},m.default.createElement("div",null,m.default.createElement("div",{className:"topWrapper"},m.default.createElement(h.default,d({},this.props,this.state)),a&&a.user_admin_or_member?m.default.createElement("a",{onClick:this.newshow,className:"topWrapper_btn"},"创建标签"):""),m.default.createElement("div",{style:{display:this.state.display}},m.default.createElement(c.default,null,m.default.createElement("div",{className:"tagdiv"},m.default.createElement(c.default.Item,{className:"inptwidth"},f("name",{rules:[{required:!0,message:"请填写标签名字"}]})(m.default.createElement(i.default,{placeholder:"标签名字",maxLength:"10"}))),m.default.createElement(c.default.Item,{className:"inputcount"},f("description",{rules:[{required:!0,message:"描述不能为空"}]})(m.default.createElement(i.default,{placeholder:"描述, 30字以内",maxLength:"30"}))),m.default.createElement("div",null,m.default.createElement("div",{style:_.swatch,onClick:this.handleClick},m.default.createElement("div",{style:_.color},m.default.createElement("p",{style:{paddingLeft:25}},this.state.textcolor))),this.state.displayColorPicker?m.default.createElement("div",{style:_.popover},m.default.createElement("div",{style:_.cover,onClick:this.handleClose}),m.default.createElement(v.SketchPicker,{color:this.state.color,onChange:this.handleChange})):null),m.default.createElement("div",{className:"fr",style:{marginTop:5}},m.default.createElement("a",{onClick:this.createtagpost,className:"topWrapper_btn fr"},"创建标签"),m.default.createElement("a",{onClick:this.newclose,className:"a_btn cancel_btn fr"},"取消"))))),a&&a.issue_tags&&a.issue_tags.length>0?m.default.createElement("div",null,m.default.createElement("div",{className:"topWrapper"},m.default.createElement("span",null,"共",a&&a.issue_tags_count,"个标记"),m.default.createElement("ul",{className:"topWrapper_select"},m.default.createElement("li",null,m.default.createElement(r.default,{className:"topWrapperSelect",overlay:this.menu(),trigger:["click"],placement:"bottomCenter"},m.default.createElement("span",null,"标记",m.default.createElement(s.default,{type:"caret-down",className:"ml5"})))))),m.default.createElement("div",{className:"tagList"},a.issue_tags.map((function(t,n){return m.default.createElement("div",{key:n},m.default.createElement("span",{className:"width20 mr10"},m.default.createElement("span",{style:{backgroundColor:""+t.color},className:"tagColor"}),t.name),m.default.createElement("span",{className:"hide-1 width50 mr10"},t.description),m.default.createElement("span",{className:"width15 mr10"},t.issues_count,"个开启的任务"),a&&a.user_admin_or_member?m.default.createElement("div",{className:"width15 text-right"},m.default.createElement("a",{onClick:function(){return e.editshow(t)},className:"topWrapper_btn fr"},"编辑"),m.default.createElement(o.default,{placement:"bottom",title:"删除标签会将其从所有引用中删除。继续？",okText:"是",cancelText:"否",onConfirm:function(){return e.deletetag(t.id)}},m.default.createElement("a",{className:"a_btn delete_btn fr"},"删除"))):"")})))):m.default.createElement(g.default,{_html:"暂时还没有相关数据!"}),a&&a.issue_tags_count>u?m.default.createElement("div",{className:"mt30 mb50 edu-txt-center"},m.default.createElement(l.default,{simple:!0,defaultCurrent:p,total:a&&a.issue_tags_count,pageSize:u,onChange:this.ChangePage})):""),m.default.createElement(n.default,{title:"编辑标签",onCancel:this.handleCancel,visible:this.state.isShow,onOk:this.handleok,mask:!0,width:"60%"},m.default.createElement("div",{className:"dialogdiv"},m.default.createElement(i.default,{placeholder:"标签名字",maxLength:"10",className:"inptwidth",value:this.state.name,onChange:this.changmodelname}),m.default.createElement(i.default,{placeholder:"描述, 30字以内",maxLength:"30",className:"inputcount",value:this.state.description,onChange:this.changdescription}),m.default.createElement("div",null,m.default.createElement("div",{style:_.swatch,onClick:this.handleClick},m.default.createElement("div",{style:_.modalcolor},m.default.createElement("p",{style:{paddingLeft:25,width:100}},this.state.newcolor))),this.state.displayColorPicker?m.default.createElement("div",{style:_.popover},m.default.createElement("div",{style:_.cover,onClick:this.handleClose}),m.default.createElement(v.SketchPicker,{color:this.state.color,onChange:this.handleChange})):null))))}}]),t}(f.Component),k=c.default.create({name:"tageFrom"})(w);t.default=k}}]);