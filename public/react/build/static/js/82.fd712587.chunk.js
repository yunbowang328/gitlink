(this.webpackJsonp=this.webpackJsonp||[]).push([[82],{"+hnl":function(e,t,n){},MKzF:function(e,t,n){"use strict";n.r(t);n("SchZ"),n("+hnl")},kaz8:function(e,t,n){"use strict";n.r(t);var r=n("q1tI"),a=n("17x9"),o=n("VCL8"),l=n("TSYQ"),u=n.n(l),i=n("x1Ya"),c=n("Gytx"),s=n.n(c),f=n("H84U"),p=n("6CfX");function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function m(){return(m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function v(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(e,t){return(b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function g(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=E(e);if(t){var a=E(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return O(this,n)}}function O(e,t){return!t||"object"!==d(t)&&"function"!=typeof t?x(e):t}function x(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function E(e){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var k=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},w=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}(l,e);var t,n,a,o=g(l);function l(){var e;return v(this,l),(e=o.apply(this,arguments)).saveCheckbox=function(t){e.rcCheckbox=t},e.renderCheckbox=function(t){var n,a=t.getPrefixCls,o=x(e),l=o.props,c=o.context,s=l.prefixCls,f=l.className,p=l.children,d=l.indeterminate,v=l.style,h=l.onMouseEnter,b=l.onMouseLeave,g=k(l,["prefixCls","className","children","indeterminate","style","onMouseEnter","onMouseLeave"]),O=c.checkboxGroup,E=a("checkbox",s),w=m({},g);O&&(w.onChange=function(){g.onChange&&g.onChange.apply(g,arguments),O.toggleOption({label:p,value:l.value})},w.name=O.name,w.checked=-1!==O.value.indexOf(l.value),w.disabled=l.disabled||O.disabled);var j=u()(f,(y(n={},"".concat(E,"-wrapper"),!0),y(n,"".concat(E,"-wrapper-checked"),w.checked),y(n,"".concat(E,"-wrapper-disabled"),w.disabled),n)),C=u()(y({},"".concat(E,"-indeterminate"),d));return r.createElement("label",{className:j,style:v,onMouseEnter:h,onMouseLeave:b},r.createElement(i.a,m({},w,{prefixCls:E,className:C,ref:e.saveCheckbox})),void 0!==p&&r.createElement("span",null,p))},e}return t=l,(n=[{key:"componentDidMount",value:function(){var e=this.props.value,t=(this.context||{}).checkboxGroup,n=void 0===t?{}:t;n.registerValue&&n.registerValue(e),Object(p.a)("checked"in this.props||(this.context||{}).checkboxGroup||!("value"in this.props),"Checkbox","`value` is not validate prop, do you mean `checked`?")}},{key:"shouldComponentUpdate",value:function(e,t,n){return!s()(this.props,e)||!s()(this.state,t)||!s()(this.context.checkboxGroup,n.checkboxGroup)}},{key:"componentDidUpdate",value:function(e){var t=e.value,n=this.props.value,r=(this.context||{}).checkboxGroup,a=void 0===r?{}:r;n!==t&&a.registerValue&&a.cancelValue&&(a.cancelValue(t),a.registerValue(n))}},{key:"componentWillUnmount",value:function(){var e=this.props.value,t=(this.context||{}).checkboxGroup,n=void 0===t?{}:t;n.cancelValue&&n.cancelValue(e)}},{key:"focus",value:function(){this.rcCheckbox.focus()}},{key:"blur",value:function(){this.rcCheckbox.blur()}},{key:"render",value:function(){return r.createElement(f.a,null,this.renderCheckbox)}}])&&h(t.prototype,n),a&&h(t,a),l}(r.Component);w.__ANT_CHECKBOX=!0,w.defaultProps={indeterminate:!1},w.contextTypes={checkboxGroup:a.any},Object(o.polyfill)(w);var j=w,C=n("BGR+");function S(e){return(S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function P(){return(P=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function _(e){return function(e){if(Array.isArray(e))return N(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return N(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return N(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function N(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function V(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function R(e,t){return(R=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function G(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=M(e);if(t){var a=M(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return A(this,n)}}function A(e,t){return!t||"object"!==S(t)&&"function"!=typeof t?I(e):t}function I(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function M(e){return(M=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var T=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},L=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&R(e,t)}(l,e);var t,n,a,o=G(l);function l(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),(t=o.call(this,e)).cancelValue=function(e){t.setState((function(t){return{registeredValues:t.registeredValues.filter((function(t){return t!==e}))}}))},t.registerValue=function(e){t.setState((function(t){var n=t.registeredValues;return{registeredValues:[].concat(_(n),[e])}}))},t.toggleOption=function(e){var n=t.state.registeredValues,r=t.state.value.indexOf(e.value),a=_(t.state.value);-1===r?a.push(e.value):a.splice(r,1),"value"in t.props||t.setState({value:a});var o=t.props.onChange;if(o){var l=t.getOptions();o(a.filter((function(e){return-1!==n.indexOf(e)})).sort((function(e,t){return l.findIndex((function(t){return t.value===e}))-l.findIndex((function(e){return e.value===t}))})))}},t.renderGroup=function(e){var n=e.getPrefixCls,a=I(t),o=a.props,l=a.state,i=o.prefixCls,c=o.className,s=o.style,f=o.options,p=T(o,["prefixCls","className","style","options"]),d=n("checkbox",i),y="".concat(d,"-group"),m=Object(C.a)(p,["children","defaultValue","value","onChange","disabled"]),v=o.children;f&&f.length>0&&(v=t.getOptions().map((function(e){return r.createElement(j,{prefixCls:d,key:e.value.toString(),disabled:"disabled"in e?e.disabled:o.disabled,value:e.value,checked:-1!==l.value.indexOf(e.value),onChange:e.onChange,className:"".concat(y,"-item")},e.label)})));var h=u()(y,c);return r.createElement("div",P({className:h,style:s},m),v)},t.state={value:e.value||e.defaultValue||[],registeredValues:[]},t}return t=l,a=[{key:"getDerivedStateFromProps",value:function(e){return"value"in e?{value:e.value||[]}:null}}],(n=[{key:"getChildContext",value:function(){return{checkboxGroup:{toggleOption:this.toggleOption,value:this.state.value,disabled:this.props.disabled,name:this.props.name,registerValue:this.registerValue,cancelValue:this.cancelValue}}}},{key:"shouldComponentUpdate",value:function(e,t){return!s()(this.props,e)||!s()(this.state,t)}},{key:"getOptions",value:function(){return this.props.options.map((function(e){return"string"==typeof e?{label:e,value:e}:e}))}},{key:"render",value:function(){return r.createElement(f.a,null,this.renderGroup)}}])&&V(t.prototype,n),a&&V(t,a),l}(r.Component);L.defaultProps={options:[]},L.propTypes={defaultValue:a.array,value:a.array,options:a.array.isRequired,onChange:a.func},L.childContextTypes={checkboxGroup:a.any},Object(o.polyfill)(L);var U=L;j.Group=U;t.default=j},tlJt:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(n("8z0m")),a=s(n("CtXQ")),o=s(n("tsqr")),l=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var l,u=e[Symbol.iterator]();!(r=(l=u.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{!r&&u.return&&u.return()}finally{if(a)throw o}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};n("7W5+"),n("2oDE"),n("8/o9");var u=n("q1tI"),i=s(u),c=n("sYIF");function s(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=e.getImage,n=e.url,s=(0,u.useState)(void 0),f=l(s,2),p=f[0],d=f[1];return(0,u.useEffect)((function(){n&&d(n)}),[n]),i.default.createElement(r.default,{name:"file",listType:"picture-card",className:"avatar-uploader",showUploadList:!1,action:(0,c.getUploadActionUrl)(),beforeUpload:function(e){var t="image/jpeg"===e.type||"image/png"===e.type;t||o.default.error("上传的图片只能是JPG或者PNG格式!");var n=e.size/1024/1024<2;return n||o.default.error("上传的图片不能超过2MB!"),t&&n},onChange:function(e){var n,r,a;e&&e.file&&"done"===e.file.status&&(n=e.file.originFileObj,r=function(e){return d(e)},(a=new FileReader).addEventListener("load",(function(){return r(a.result)})),a.readAsDataURL(n),a.onload=function(e){t&&t(e.target.result)})}},p?i.default.createElement("img",{src:p,alt:"avatar",style:{width:"100%"}}):i.default.createElement("div",null,i.default.createElement(a.default,{type:"plus"}),i.default.createElement("div",{className:"ant-upload-text"},"点击上传")))}},vnWZ:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=y(n("2/Rp")),a=y(n("kaz8")),o=y(n("9yH6")),l=y(n("5rEg")),u=y(n("Vl3Y")),i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var l,u=e[Symbol.iterator]();!(r=(l=u.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{!r&&u.return&&u.return()}finally{if(a)throw o}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};n("L/Qf"),n("MKzF"),n("K4yd"),n("1vPl"),n("tULf");var s=n("q1tI"),f=y(s);n("VUSe");var p=y(n("tlJt")),d=y(n("vDqi"));function y(e){return e&&e.__esModule?e:{default:e}}var m=window.location.port,v=window.location.hostname;t.default=u.default.create()((0,s.forwardRef)((function(e){var t=e.form,n=e.showNotification,y=e.history,h=(0,s.useState)(void 0),b=c(h,2),g=b[0],O=b[1],x=(0,s.useState)(!1),E=c(x,2),k=E[0],w=E[1],j=(0,s.useState)(0),C=c(j,2),S=C[0],P=C[1],_=t.getFieldDecorator,N=t.validateFields,V=t.setFieldsValue,R={display:"block",height:"30px",lineHeight:"30px"},G=(0,s.useCallback)((function(e,t,n,r){var a=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];return f.default.createElement(f.default.Fragment,null,f.default.createElement("span",{className:a?"lables must ":"lables"},e),f.default.createElement(u.default.Item,null,_(t,{rules:n,validateFirst:!0})(r)))}),[]);return(0,s.useEffect)((function(){V({visibility:"common"})}),[]),f.default.createElement("div",{className:"main",style:{padding:"0px",border:"none"}},f.default.createElement("div",{className:"teamBox"},f.default.createElement("p",{className:"teamBox-title"},"新建组织"),f.default.createElement(u.default,{className:"teamBox-form"},G(f.default.createElement("span",null,"组织账号："),"name",[{required:!0,message:"请输入组织账号"},{validator:function(e,t,n){t||n(),t&&!t.match(/^[a-zA-Z][a-zA-Z0-9_-]{3,19}$/)&&n("只能使用以字母开头，包含字母、数字、下划线、横杠等，长度4到20个字符"),n()}}],f.default.createElement(l.default,{addonBefore:m?v+":"+m+"/":"https://"+v+"/",placeholder:"组织账号",maxLength:100})),G(f.default.createElement("span",null,"组织名称："),"nickname",[{required:!0,message:"请输入组织名称"}],f.default.createElement(l.default,{placeholder:"请输入组织名称",maxLength:100})),f.default.createElement("div",{className:"pr"},f.default.createElement("span",{className:"toprightNum"},S,"/200"),G("组织描述","description",[{required:!0,message:"请输入组织描述"}],f.default.createElement(l.default.TextArea,{autoSize:{minRows:3,maxRows:5},placeholder:"请输入组织描述",maxLength:200,onChange:function(e){P(e.target.value?e.target.value.length:0)}}))),G("所在地区","location",[],f.default.createElement(l.default,{placeholder:"请输入地址",maxLength:50}),!1),G("可见性","visibility",[{required:!0,message:"请选择可见性"}],f.default.createElement(o.default.Group,{name:"exposure"},f.default.createElement(o.default,{style:R,value:"common",key:1},"公开"),f.default.createElement(o.default,{style:R,value:"limited",key:2},"受限",f.default.createElement("span",{className:"color-grey-8"},"（仅对登录用户可见）")),f.default.createElement(o.default,{style:R,value:"privacy",key:3},"私有",f.default.createElement("span",{className:"color-grey-8"},"（仅对组织成员可见）")))),f.default.createElement("p",{className:"font-16 lables must"},"选择头像"),f.default.createElement(p.default,{getImage:function(e){O(e),w(!1)}}),k&&f.default.createElement("p",{className:"color-red",style:{marginTop:"-10px"}},"请上传头像"),G("权限","repo_admin_change_team_access",[],f.default.createElement(a.default,{value:"1",key:1},"项目管理员可以添加或移除团队的访问权限"),!1))),f.default.createElement("p",{className:"mt20"},f.default.createElement(r.default,{type:"primary",className:"mr30",onClick:function(){N((function(e,t){if(!e){if(!g)return void w(!0);d.default.post("/organizations.json",i({},t,{image:g})).then((function(e){e&&e.data&&(n("组织创建成功！"),y.push("/"+e.data.name))})).catch((function(e){}))}}))}},"创建组织"),f.default.createElement(r.default,{className:"grey",onClick:function(){window.history.back(-1)}},"取消")))})))}}]);