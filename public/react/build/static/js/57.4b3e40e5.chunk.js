(this.webpackJsonp=this.webpackJsonp||[]).push([[57],{"4oKn":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==s(e)&&"function"!=typeof e)return{default:e};var t=u();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=r?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=e[o]}n.default=e,t&&t.set(e,n);return n}(n("M/lh")),o=l(n("17x9")),i=l(n("q1tI")),a=n("JwdM");function l(e){return e&&e.__esModule?e:{default:e}}function u(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return u=function(){return e},e}function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){v(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function h(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=y(e);if(t){var o=y(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return m(this,n)}}function m(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?g(e):t}function g(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(u,e);var t,n,o,l=h(u);function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),v(g(t=l.call(this,e)),"assignRef",(function(e){t.containerElement=e})),t.containerElement=void 0,t}return t=u,(n=[{key:"componentDidMount",value:function(){this.initMonaco()}},{key:"componentDidUpdate",value:function(e){var t=this.props,n=t.language,o=t.theme,i=t.height,a=t.options,l=t.width,u=this.editor.getModel(),s=u.original,c=u.modified;this.props.original!==s.getValue()&&s.setValue(this.props.original),null!=this.props.value&&this.props.value!==c.getValue()&&(this.__prevent_trigger_change_event=!0,this.editor.modifiedEditor.pushUndoStop(),c.pushEditOperations([],[{range:c.getFullModelRange(),text:this.props.value}]),this.editor.modifiedEditor.pushUndoStop(),this.__prevent_trigger_change_event=!1),e.language!==n&&(r.editor.setModelLanguage(s,n),r.editor.setModelLanguage(c,n)),e.theme!==o&&r.editor.setTheme(o),!this.editor||l===e.width&&i===e.height||this.editor.layout(),e.options!==a&&this.editor.updateOptions(a)}},{key:"componentWillUnmount",value:function(){this.destroyMonaco()}},{key:"editorWillMount",value:function(){var e=this.props.editorWillMount;return e(r)||{}}},{key:"editorDidMount",value:function(e){var t=this;this.props.editorDidMount(e,r);var n=e.getModel().modified;this._subscription=n.onDidChangeContent((function(e){t.__prevent_trigger_change_event||t.props.onChange(n.getValue(),e)}))}},{key:"initModels",value:function(e,t){var n=this.props.language,o=r.editor.createModel(t,n),i=r.editor.createModel(e,n);this.editor.setModel({original:o,modified:i})}},{key:"initMonaco",value:function(){var e=null!=this.props.value?this.props.value:this.props.defaultValue,t=this.props,n=t.original,o=t.theme,i=t.options,a=t.overrideServices;this.containerElement&&(this.editorWillMount(),this.editor=r.editor.createDiffEditor(this.containerElement,f(f({},i),o?{theme:o}:{}),a),this.initModels(e,n),this.editorDidMount(this.editor))}},{key:"destroyMonaco",value:function(){if(this.editor){this.editor.dispose();var e=this.editor.getModel(),t=e.original,n=e.modified;t&&t.dispose(),n&&n.dispose()}this._subscription&&this._subscription.dispose()}},{key:"render",value:function(){var e=this.props,t=e.width,n=e.height,r={width:(0,a.processSize)(t),height:(0,a.processSize)(n)};return i.default.createElement("div",{ref:this.assignRef,style:r,className:"react-monaco-editor-container"})}}])&&p(t.prototype,n),o&&p(t,o),u}(i.default.Component);b.propTypes={width:o.default.oneOfType([o.default.string,o.default.number]),height:o.default.oneOfType([o.default.string,o.default.number]),original:o.default.string,value:o.default.string,defaultValue:o.default.string,language:o.default.string,theme:o.default.string,options:o.default.object,overrideServices:o.default.object,editorDidMount:o.default.func,editorWillMount:o.default.func,onChange:o.default.func},b.defaultProps={width:"100%",height:"100%",original:null,value:null,defaultValue:"",language:"javascript",theme:null,options:{},overrideServices:{},editorDidMount:a.noop,editorWillMount:a.noop,onChange:a.noop};var O=b;t.default=O},BtkW:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=m(n("W9HT")),o=m(n("2/Rp")),i=m(n("CtXQ")),a=m(n("9yH6")),l=m(n("Vl3Y")),u=m(n("5rEg")),s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n("04bd"),n("L/Qf"),n("2oDE"),n("K4yd"),n("tULf"),n("1vPl");var c=n("q1tI"),f=m(c),p=n("sYIF"),d=n("eO8H");n("XmZk");var h=m(n("vDqi"));function m(e){return e&&e.__esModule?e:{default:e}}var g=u.default.TextArea;function y(e){return e&&e.length>0&&e.indexOf("/")>-1?e.replaceAll("/","%2F"):e}function v(e){return e&&e.length>0&&e.indexOf("%2F")>-1?e.replaceAll("%2F","/"):e}var b=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.componentDidMount=function(){var e=n.props.descName;e&&n.props.form.setFieldsValue({desc:e})},n.componentDidUpdate=function(e){var t=n.props.descName;e&&t&&e.descName!==t&&n.props.form.setFieldsValue({desc:t})},n.changeSubmittype=function(e){n.setState({submitType:e.target.value})},n.changeFileName=function(e){n.setState({filename:e.target.value})},n.subMitFrom=function(){var e=n.props,t=e.filepath,r=e.content,o=e.editor_type,i=n.props.match.params,a=i.branch,l=i.projectsId,u=i.owner,s=n.state,c=s.submitType,f=s.filename;n.setState({isSpin:!0});var p="upload"===o?t:t.substr(1);n.props.form.validateFieldsAndScroll((function(e,t){if(e)n.setState({isSpin:!1});else{var o="/"+u+"/"+l+"/create_file.json";h.default.post(o,{filepath:f||p,branch:v(a),new_branch:"1"===c?t.branchname:void 0,content:r,message:t.desc}).then((function(e){if(n.setState({isSpin:!1}),e.data&&e.data.name){if(n.props.showNotification("文件新建成功!"),"1"===c){var r=n.props.getDetail;r&&r()}var o="/"+u+"/"+l+(t.branchname?"/tree/"+y(t.branchname):a?"/tree/"+y(a):"");n.props.history.push(o)}})).catch((function(e){n.setState({isSpin:!1}),console.log(e)}))}}))},n.UpdateFile=function(){n.setState({isSpin:!0});var e=n.props,t=e.branch,r=e.detail,o=e.content,i=e.currentBranch,a=n.props.match.params,l=a.projectsId,u=a.owner,s=n.state.submitType,c="/"+u+"/"+l+"/update_file.json",f=i||t;n.props.form.validateFieldsAndScroll((function(e,a){e?n.setState({isSpin:!1}):h.default.put(c,{filepath:r.path,branch:"1"===s?void 0:v(f),new_branch:"1"===s?a.branchname:void 0,content:o,sha:r.sha,message:a.desc}).then((function(e){if(n.setState({isSpin:!1}),e.data&&1===e.data.status){var r=i||t,o="/"+u+"/"+l+(a.branchname?"/tree/"+y(a.branchname):r?"/tree/"+y(r):"");n.props.history.push(o),n.props.showNotification("文件修改成功!")}})).catch((function(e){n.setState({isSpin:!1}),console.log(e)}))}))},n.state={submitType:"0",filename:"",isSpin:!1},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),s(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.submitType,s=t.filename,c=t.isSpin,h=this.props.form.getFieldDecorator,m=this.props.match.params,y=m.branch,b=m.projectsId,O=m.owner,_=this.props,w=_.current_user,j=_.filepath,E=_.projectDetail,M=_.currentBranch,S=this.props.editor_type,P=M||y;return f.default.createElement("div",null,f.default.createElement("span",{className:"df",style:{alignItems:"center"}},f.default.createElement(d.Link,{to:"/"+(w&&w.login),className:"show-user-link"},f.default.createElement("img",{src:(0,p.getImageUrl)("/"+(w&&w.image_url)),alt:"",className:"screwImg"}),f.default.createElement("span",{className:"color-grey-3 ver-middle"},w&&w.username,"：")),f.default.createElement("span",{className:"color-grey-8"},"提交变更")),f.default.createElement(r.default,{spinning:c},f.default.createElement("div",{className:"userScrew"},f.default.createElement("div",{className:"screwPanel"},f.default.createElement(l.default,null,f.default.createElement(l.default.Item,{style:{display:"upload"===S?"block":"none"}},h("path",{rules:[]})(f.default.createElement("div",{className:"setInputAddon"},f.default.createElement(u.default,{addonBefore:"/"+(E&&E.identifier)+"/",value:s||j,onChange:this.changeFileName,placeholder:"文件路径..."})))),f.default.createElement(l.default.Item,null,h("desc",{rules:[{required:!0,message:"请添加描述信息"}]})(f.default.createElement(g,{placeholder:"必填,描述主要修改类型和内容",authSize:{minRows:3,maxRows:5}}))),f.default.createElement(a.default.Group,{value:n,onChange:this.changeSubmittype},f.default.createElement(a.default,{value:"0",className:"mb10"},f.default.createElement("i",{className:"iconfont icon-banbenku font-16 mr5"}),"直接提交至",f.default.createElement("span",{className:"color-orange"},v(P)),"分支"),f.default.createElement(a.default,{value:"1"},f.default.createElement(i.default,{type:"pull-request",className:"mr5"}),"为此提交创建一个",f.default.createElement("span",{className:"font-bd"},"新的分支"),"并发起合并请求")),"1"===n?f.default.createElement("div",{className:"mt15"},f.default.createElement(l.default.Item,{style:{paddingLeft:"24px"}},h("branchname",{rules:[{required:!0,message:"请输入分支名称"}]})(f.default.createElement(u.default,{placeholder:"请输入分支名称",style:{width:"220px"}})))):""))),f.default.createElement("div",{className:"mt20"},f.default.createElement(o.default,{type:"primary",onClick:"update"===S?this.UpdateFile:this.subMitFrom,className:"mr30"},"提交变更"),f.default.createElement(o.default,{type:"primary grey",onClick:function(){e.props.history.push("/"+O+"/"+b)},className:"mr20"},"取消"))))}}]),t}(c.Component),O=l.default.create({name:"UserSubmitForm"})(b);t.default=O},JwdM:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.processSize=function(e){return/^\d+$/.test(e)?"".concat(e,"px"):e},t.noop=function(){}},PgMy:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=l(n("2fM7")),o=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var a,l=e[Symbol.iterator]();!(r=(a=l.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{!r&&l.return&&l.return()}finally{if(o)throw i}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};n("8QGh");var i=n("q1tI"),a=l(i);l(n("vDqi"));function l(e){return e&&e.__esModule?e:{default:e}}var u=r.default.Option,s=["apex","azcli","bat","clojure","coffee","cpp","csharp","csp","css","dockerfile","fsharp","go","handlebars","html","ini","java","javascript","json","less","lua","markdown","msdax","mysql","objective","perl","pgsql","php","postiats","powerquery","powershell","pug","python","r","razor","redis","redshift","ruby","rust","sb","scheme","scss","shell","solidity","sql","st","swift","typescript","vb","xml","yaml"];t.default=function(e){var t=e.language,n=e.select_language,l=(0,i.useState)(void 0),c=o(l,2);c[0],c[1];return a.default.createElement(r.default,{showSearch:!0,placeholder:"请选择文本语言",style:{width:200},value:t,onChange:function(e){n(e)}},a.default.createElement(u,{value:void 0},"请选择文本语言"),s&&s.map((function(e,t){return a.default.createElement(u,{value:e},e)})))}},"R/Rt":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n("q1tI"),a=s(i),l=s(n("gL5p")),u=s(n("BtkW"));function s(e){return e&&e.__esModule?e:{default:e}}n("XmZk"),n("lr0e");var c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.componentDidUpdate=function(e){e&&n.props&&n.props.content!==e.content&&n.setState({editorValue:n.props.content})},n.changeEditor=function(e){n.setState({editorValue:e})},n.state={editorValue:n.props.content,prevHeight:0},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"render",value:function(){var e=this,t=this.state.editorValue,n=this.props,o=n.readOnly,i=n.editorType,s=n.language,c=n.currentBranch,f=n.descName,p={lineNumbers:"on",wordWrap:!0,selectOnLineNumbers:!0,lineHeight:24,renderLineHighlight:"line",revealHorizontalRightPadding:5,placeholder:"请输入内容",readOnly:o,cursorStyle:o?"underline-thin":"line",folding:!0,foldingStrategy:"indentation",automaticLayout:!0,overviewRulerBorder:!1,scrollBeyondLastLine:!1,minimap:{enabled:!1}};return a.default.createElement(a.default.Fragment,null,a.default.createElement("div",{className:"editorBorderBox"},a.default.createElement(l.default,{language:s||"plaintext",theme:"vs-grey",placeholder:"请输入内容",value:t,options:p,onChange:this.changeEditor,editorWillMount:this.editorWillMount,editorDidMount:function(t,n){t.onDidChangeModelDecorations((function(){requestAnimationFrame(r)}));var r=function(){var r=t.getDomNode();if(r){var o=t.getOption(n.editor.EditorOption.lineHeight),i=t.getModel().getLineCount()||1,a=t.getTopForLineNumber(i+1)+o+40;a<400&&(a=400),e.state.prevHeight!==a&&(e.setState({prevHeight:a}),r.style.height=a+"px",t.layout())}};r()}})),!o&&a.default.createElement("div",{className:"editorBorderSubmitBox",style:{marginTop:"20px",padding:"20px"}},a.default.createElement(u.default,r({},this.props,this.state,{filepath:""+this.props.filepath,content:t,editor_type:i,currentBranch:c,descName:f}))))}}]),t}(i.Component);t.default=c},XmZk:function(e,t,n){},eacs:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=c(n("5rEg")),o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n("1vPl");var a=n("q1tI"),l=c(a),u=c(n("R/Rt"));n("XmZk");var s=c(n("PgMy"));function c(e){return e&&e.__esModule?e:{default:e}}var f=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.changeFileName=function(e){n.setState({filename:e.target.value})},n.CancelAddFile=function(){n.props.history.goBack()},n.select_language=function(e){console.log(e),n.setState({language:e})},n.state={editorValue:"",filename:"",language:void 0},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),i(t,[{key:"render",value:function(){var e=this.props.location.pathname,t=this.state,n=t.filename,i=t.language,a=e.split("newfile")[1],c=a+"/"+n,f=this.props.projectDetail;return l.default.createElement(l.default.Fragment,null,l.default.createElement("div",{className:"main"},l.default.createElement("p",{className:"pb15 bor-bottom-greyE font-16 color-grey-3 mb20"},"新建文件"),l.default.createElement("div",null,l.default.createElement("div",{className:"grid-item mb20"},l.default.createElement("div",{className:"grid-item"},l.default.createElement("div",{className:"setInputAddon"},l.default.createElement(r.default,{addonBefore:"/"+(f&&f.identifier)+a+"/",value:n,onChange:this.changeFileName,placeholder:"命名文件..."})),l.default.createElement("a",{onClick:this.CancelAddFile,className:"color-blue"},"取消")),l.default.createElement("div",{className:"text-right"},l.default.createElement(s.default,{language:i,select_language:this.select_language}))),l.default.createElement("div",{className:"editorBorder"},l.default.createElement(u.default,o({},this.props,this.state,{filepath:""+c,language:i,content:void 0,readOnly:!1,editorType:"new",descName:n&&"Add "+n}))))))}}]),t}(a.Component);t.default=f},gL5p:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(t,"MonacoDiffEditor",{enumerable:!0,get:function(){return o.default}});var r=i(n("j6EG")),o=i(n("4oKn"));function i(e){return e&&e.__esModule?e:{default:e}}},j6EG:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==s(e)&&"function"!=typeof e)return{default:e};var t=u();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=r?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=e[o]}n.default=e,t&&t.set(e,n);return n}(n("M/lh")),o=l(n("17x9")),i=l(n("q1tI")),a=n("JwdM");function l(e){return e&&e.__esModule?e:{default:e}}function u(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return u=function(){return e},e}function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){b(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function m(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=v(e);if(t){var o=v(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return g(this,n)}}function g(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?y(e):t}function y(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var O=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(u,e);var t,n,o,l=m(u);function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),b(y(t=l.call(this,e)),"assignRef",(function(e){t.containerElement=e})),t.containerElement=void 0,t}return t=u,(n=[{key:"componentDidMount",value:function(){this.initMonaco()}},{key:"componentDidUpdate",value:function(e){var t=this.props,n=t.value,o=t.language,i=t.theme,a=t.height,l=t.options,u=t.width,s=this.editor,c=s.getModel();if(null!=this.props.value&&this.props.value!==c.getValue()&&(this.__prevent_trigger_change_event=!0,this.editor.pushUndoStop(),c.pushEditOperations([],[{range:c.getFullModelRange(),text:n}]),this.editor.pushUndoStop(),this.__prevent_trigger_change_event=!1),e.language!==o&&r.editor.setModelLanguage(c,o),e.theme!==i&&r.editor.setTheme(i),!s||u===e.width&&a===e.height||s.layout(),e.options!==l){l.model;var f=p(l,["model"]);s.updateOptions(f)}}},{key:"componentWillUnmount",value:function(){this.destroyMonaco()}},{key:"destroyMonaco",value:function(){if(this.editor){this.editor.dispose();var e=this.editor.getModel();e&&e.dispose()}this._subscription&&this._subscription.dispose()}},{key:"initMonaco",value:function(){var e=null!=this.props.value?this.props.value:this.props.defaultValue,t=this.props,n=t.language,o=t.theme,i=t.options,a=t.overrideServices;this.containerElement&&(Object.assign(i,this.editorWillMount()),this.editor=r.editor.create(this.containerElement,f(f({value:e,language:n},i),o?{theme:o}:{}),a),this.editorDidMount(this.editor))}},{key:"editorWillMount",value:function(){var e=this.props.editorWillMount;return e(r)||{}}},{key:"editorDidMount",value:function(e){var t=this;this.props.editorDidMount(e,r),this._subscription=e.onDidChangeModelContent((function(n){t.__prevent_trigger_change_event||t.props.onChange(e.getValue(),n)}))}},{key:"render",value:function(){var e=this.props,t=e.width,n=e.height,r={width:(0,a.processSize)(t),height:(0,a.processSize)(n)};return i.default.createElement("div",{ref:this.assignRef,style:r,className:"react-monaco-editor-container"})}}])&&d(t.prototype,n),o&&d(t,o),u}(i.default.Component);O.propTypes={width:o.default.oneOfType([o.default.string,o.default.number]),height:o.default.oneOfType([o.default.string,o.default.number]),value:o.default.string,defaultValue:o.default.string,language:o.default.string,theme:o.default.string,options:o.default.object,overrideServices:o.default.object,editorDidMount:o.default.func,editorWillMount:o.default.func,onChange:o.default.func},O.defaultProps={width:"100%",height:"100%",value:null,defaultValue:"",language:"javascript",theme:null,options:{},overrideServices:{},editorDidMount:a.noop,editorWillMount:a.noop,onChange:a.noop};var _=O;t.default=_},lr0e:function(e,t,n){}}]);