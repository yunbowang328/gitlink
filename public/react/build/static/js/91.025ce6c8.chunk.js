(this.webpackJsonp=this.webpackJsonp||[]).push([[91],{BtkW:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=h(a("W9HT")),r=h(a("2/Rp")),o=h(a("CtXQ")),l=h(a("9yH6")),i=h(a("Vl3Y")),s=h(a("5rEg")),c=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();a("04bd"),a("L/Qf"),a("2oDE"),a("K4yd"),a("tULf"),a("1vPl");var u=a("q1tI"),f=h(u),p=a("sYIF"),d=a("eO8H");a("XmZk");var m=h(a("vDqi"));function h(e){return e&&e.__esModule?e:{default:e}}var b=s.default.TextArea;function y(e){return e&&e.length>0&&e.indexOf("/")>-1?e.replaceAll("/","%2F"):e}function v(e){return e&&e.length>0&&e.indexOf("%2F")>-1?e.replaceAll("%2F","/"):e}var g=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.componentDidMount=function(){var e=a.props.descName;e&&a.props.form.setFieldsValue({desc:e})},a.componentDidUpdate=function(e){var t=a.props.descName;e&&t&&e.descName!==t&&a.props.form.setFieldsValue({desc:t})},a.changeSubmittype=function(e){a.setState({submitType:e.target.value})},a.changeFileName=function(e){a.setState({filename:e.target.value})},a.subMitFrom=function(){var e=a.props,t=e.filepath,n=e.content,r=e.editor_type,o=a.props.match.params,l=o.branch,i=o.projectsId,s=o.owner,c=a.state,u=c.submitType,f=c.filename;a.setState({isSpin:!0});var p="upload"===r?t:t.substr(1);a.props.form.validateFieldsAndScroll((function(e,t){if(e)a.setState({isSpin:!1});else{var r="/"+s+"/"+i+"/create_file.json";m.default.post(r,{filepath:f||p,branch:v(l),new_branch:"1"===u?t.branchname:void 0,content:n,message:t.desc}).then((function(e){if(a.setState({isSpin:!1}),e.data&&e.data.name){if(a.props.showNotification("文件新建成功!"),"1"===u){var n=a.props.getDetail;n&&n()}var r="/"+s+"/"+i+(t.branchname?"/tree/"+y(t.branchname):l?"/tree/"+y(l):"");a.props.history.push(r)}})).catch((function(e){a.setState({isSpin:!1}),console.log(e)}))}}))},a.UpdateFile=function(){a.setState({isSpin:!0});var e=a.props,t=e.branch,n=e.detail,r=e.content,o=e.currentBranch,l=a.props.match.params,i=l.projectsId,s=l.owner,c=a.state.submitType,u="/"+s+"/"+i+"/update_file.json",f=o||t;a.props.form.validateFieldsAndScroll((function(e,l){e?a.setState({isSpin:!1}):m.default.put(u,{filepath:n.path,branch:"1"===c?void 0:v(f),new_branch:"1"===c?l.branchname:void 0,content:r,sha:n.sha,message:l.desc}).then((function(e){if(a.setState({isSpin:!1}),e.data&&1===e.data.status){var n=o||t,r="/"+s+"/"+i+(l.branchname?"/tree/"+y(l.branchname):n?"/tree/"+y(n):"");a.props.history.push(r),a.props.showNotification("文件修改成功!")}})).catch((function(e){a.setState({isSpin:!1}),console.log(e)}))}))},a.state={submitType:"0",filename:"",isSpin:!1},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),c(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.submitType,c=t.filename,u=t.isSpin,m=this.props.form.getFieldDecorator,h=this.props.match.params,y=h.branch,g=h.projectsId,E=h.owner,w=this.props,N=w.current_user,O=w.filepath,S=w.projectDetail,j=w.currentBranch,A=this.props.editor_type,x=j||y;return f.default.createElement("div",null,f.default.createElement("span",{className:"df",style:{alignItems:"center"}},f.default.createElement(d.Link,{to:"/"+(N&&N.login),className:"show-user-link"},f.default.createElement("img",{src:(0,p.getImageUrl)("/"+(N&&N.image_url)),alt:"",className:"screwImg"}),f.default.createElement("span",{className:"color-grey-3 ver-middle"},N&&N.username,"：")),f.default.createElement("span",{className:"color-grey-8"},"提交变更")),f.default.createElement(n.default,{spinning:u},f.default.createElement("div",{className:"userScrew"},f.default.createElement("div",{className:"screwPanel"},f.default.createElement(i.default,null,f.default.createElement(i.default.Item,{style:{display:"upload"===A?"block":"none"}},m("path",{rules:[]})(f.default.createElement("div",{className:"setInputAddon"},f.default.createElement(s.default,{addonBefore:"/"+(S&&S.identifier)+"/",value:c||O,onChange:this.changeFileName,placeholder:"文件路径..."})))),f.default.createElement(i.default.Item,null,m("desc",{rules:[{required:!0,message:"请添加描述信息"}]})(f.default.createElement(b,{placeholder:"必填,描述主要修改类型和内容",authSize:{minRows:3,maxRows:5}}))),f.default.createElement(l.default.Group,{value:a,onChange:this.changeSubmittype},f.default.createElement(l.default,{value:"0",className:"mb10"},f.default.createElement("i",{className:"iconfont icon-banbenku font-16 mr5"}),"直接提交至",f.default.createElement("span",{className:"color-orange"},v(x)),"分支"),f.default.createElement(l.default,{value:"1"},f.default.createElement(o.default,{type:"pull-request",className:"mr5"}),"为此提交创建一个",f.default.createElement("span",{className:"font-bd"},"新的分支"),"并发起合并请求")),"1"===a?f.default.createElement("div",{className:"mt15"},f.default.createElement(i.default.Item,{style:{paddingLeft:"24px"}},m("branchname",{rules:[{required:!0,message:"请输入分支名称"}]})(f.default.createElement(s.default,{placeholder:"请输入分支名称",style:{width:"220px"}})))):""))),f.default.createElement("div",{className:"mt20"},f.default.createElement(r.default,{type:"primary",onClick:"update"===A?this.UpdateFile:this.subMitFrom,className:"mr30"},"提交变更"),f.default.createElement(r.default,{type:"primary grey",onClick:function(){e.props.history.push("/"+E+"/"+g)},className:"mr20"},"取消"))))}}]),t}(u.Component),E=i.default.create({name:"UserSubmitForm"})(g);t.default=E},XmZk:function(e,t,a){},bIax:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAAmCAYAAACVr4jIAAAEiklEQVRoQ9WZbWxTZRTHf+feDlAJQhUIftBAUDEaDVG/gHEzEQ3GsVtMWTBGo0QxsLUJRvHDQtmMMRoyaAeJ+O4HCWzZ2rFkghpfQmZMNGqMgiwiJH6YStjmG2Treo+5ZZtDuvXerncrz8c+/3PO/9fbe3uec4VpWqsTOmeWElK4G+VOYCHCPGBAoEeFH4DP1KS1fbP8MlmbMtkEXuPX7tRFGYNtAo8As13E2wKtmNQla6TbhT6nZEpB1zbppozNSwJzCjCcRkn09/H8p/Uy5DV+SkDDMZ0xFORVhce9GrxIL3wsBuuSNXLGSy7/QWNqhILsVwh7MTaRVuC7QICVLZvlb7c5fQe14voy8JxbQ251IhxMniFEvdhuYnwFrYrrCoEjgOHGjFeNQE0yKnvcxPkKasX1W+A2N0YK1JweEJa+H5E/88VPCnR1QmfOslmlBhXANSgZVY5pGc1GhiUoh/MZmOy+CrH2iDTky1MwaGiXhm1hh8C1OYooQj+abQD8XqdSUVmcr0hBoFZcGxDqcHBKYGVMbumoEaeTGnd5NhrarY9phndKgG/Ughg8kayVt4sG6vSnM2xOiHB1iYG+mKyVuqKBWk26AZs3Sgky60XYnYpIbfFAE7oPZX2pgQrsSEbl2UmDxmJqHF3AgnSaDoQ7Sg0U2JqKyisFgVY26WLT5lGENSi3AoESBByxdEKU98Tm3bYt8nMunxc9da2dOheDBpSNCDNKGC6XtbTCm4PC1v93SxeAVjbpMtOmHbjhEgO80K7wkyihZFS+H9kYBV3TqEsNky+Aqy5pyP/IfjeF8tZa+fH8gxkI79HZg0N8KbBsiiCdCYH/97zQnellecd2OZsFtRL6AsqEf7hF+QIERXnaEDozStc4fXJRSo35yWb/eiSc0Plp5SRwRVEr5E5Wn4rKdmerslFvNgMc8bvxV/jHMLlOrLg+Bez1HVJ4KxWRDWPrhBJaruePcjN9rh9xQDuAB/0sJHCor5fKXNO7qiatFpt9fk0hhrk6JBTXboXrfQMVvi4zKZ9okGUl9BmUHb55gFPOFXUmaX7dnycHA6zo3Cy/5oOoSmhclEg+XUH7wlmxdmk/wpUFJZg46IxdxsqDm+S4q9wxNawgzcBDrvReRMofDuhRhJu8xLnQnjMMVrXVSpcL7aikIqaz5gb5ELjLS1xerXJMrITuR6nOK/YgUDjUHpXVHkJGpVVxDQm0FRI7boxwQKyduh4j+9Qr9uoFMggqSsN481fnpZNt0oWOvnBybqPiHiZsHhan/UsP4Rxt5hebdEy+11JR2ZgrvxXX24GvfKx9uizAkpEWsAalycdi0wcq1KYisjsLWhHTwLwgHyjc4xPstIAKfNLXy31OozJ6TAs3ajBt8jlwow+w0wF6vCzDipYt4jwrLhxA39+owcsCHEC5t8iwUwsqfHRuiOrDw5AXgTofhJvVHPqNJ9VmG7CoSMBTBdojBg2Bhbzesk4yY72PO6mv3KuXGwM8IEqVKstFstDOuxTP032g2KCDwz7+UqVHhG9UaLd76XQO2bkuzr9Ki5LaLq4ltwAAAABJRU5ErkJggg=="},jP00:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},r=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),o=a("q1tI"),l=u(o);a("XmZk");var i=u(a("BtkW")),s=u(a("k2Mo")),c=u(a("bIax"));function u(e){return e&&e.__esModule?e:{default:e}}var f=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.UploadFunc=function(e){a.setState({filename:e.fileName,editorValue:e.fileContent})},a.state={editorValue:"",filename:"",fileList:void 0,attachment_clean:!0},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"render",value:function(){var e=this.props.location.pathname,t=this.state,a=t.filename,r=t.editorValue,o=t.attachment_clean,u=e.split("uploadfile/")[1],f=u?u+"/"+a:a;return l.default.createElement(l.default.Fragment,null,l.default.createElement("div",{className:"main"},l.default.createElement("p",{className:"pb15 bor-bottom-greyE font-16 color-grey-3 mb20"},"上传文件"),l.default.createElement("div",{className:"upload-file-repo"},l.default.createElement(s.default,n({className:"commentStyle",isComplete:o,load:this.UploadFunc,icon:l.default.createElement("img",{src:c.default,width:"58",alt:"",style:{marginBottom:15}}),size:5,showNotification:this.props.showNotification},this.props))),l.default.createElement("div",null,l.default.createElement(i.default,n({},this.props,this.state,{filepath:f,content:r,editor_type:"upload",descName:"ADD file via upload"})))))}}]),t}(o.Component);t.default=f},k2Mo:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=c(a("CtXQ")),r=c(a("8z0m")),o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},l=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();a("2oDE"),a("7W5+");var i=a("q1tI"),s=c(i);a("sYIF"),c(a("vDqi"));function c(e){return e&&e.__esModule?e:{default:e}}var u=r.default.Dragger,f=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.onAttachmentRemove=function(e){a.setState({fileList:void 0,fileContent:void 0,fileName:void 0})},a.handleChange=function(e){var t=new FileReader;t.readAsText(e.fileList[0].originFileObj,"UTF-8"),t.onload=function(e){a.state.fileContent=e.target.result,a.props.load&&a.props.load(a.state)}},a.beforeUpload=function(e){var t=a.state.fileList,n=a.props.size,r=e.size/1024/1024<n,o=e.type.split("/").slice(-1)[0];return t&&t.length>0?a.props.showNotification("文件已存在, 请删除后再上传"):r?o&&-1!==["jpg","jpeg","png","ico","bmp","gif","pdf","csv","xlsx","xls","tif","svg","psd","cdr","webp"].indexOf(o)?a.props.showNotification("不支持"+o+"类型"):a.setState({fileList:[e],fileName:e.name}):a.props.showNotification("文件大小必须小于"+n+"MB!"),!1},a.state={fileList:void 0,fileContent:void 0,fileName:void 0},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.icon,a=e.size,r=this.state,l=r.fileList,i=r.fileName,c={name:"file",fileList:l,onChange:this.handleChange,onRemove:this.onAttachmentRemove,beforeUpload:this.beforeUpload};return s.default.createElement(u,o({},c,{className:this.props.className}),i?s.default.createElement("p",{className:"ant-upload-text"},i):s.default.createElement("div",null,t||s.default.createElement(n.default,{type:"inbox"}),s.default.createElement("p",{className:"ant-upload-text"},"拖动文件或",s.default.createElement("span",{className:"color-blue"},"点击此处上传")),s.default.createElement("p",{className:"mt10"},"暂仅支持文件格式，不支持图片,excel等不可以txt读取的文件"),s.default.createElement("p",{className:"mt10"},"文件名请使用英文且不得超过",a,"MB")))}}]),t}(i.Component);t.default=f}}]);