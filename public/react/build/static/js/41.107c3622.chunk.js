(this.webpackJsonp=this.webpackJsonp||[]).push([[41],{"0Cz8":function(e,t,n){var r=n("Xi7e"),o=n("ebwN"),a=n("e4Nc");e.exports=function(e,t){var n=this.__data__;if(n instanceof r){var i=n.__data__;if(!o||i.length<199)return i.push([e,t]),this.size=++n.size,this;n=this.__data__=new a(i)}return n.set(e,t),this.size=n.size,this}},"6sVZ":function(e,t){var n=Object.prototype;e.exports=function(e){var t=e&&e.constructor;return e===("function"==typeof t&&t.prototype||n)}},"77Zs":function(e,t,n){var r=n("Xi7e");e.exports=function(){this.__data__=new r,this.size=0}},B8du:function(e,t){e.exports=function(){return!1}},DSRE:function(e,t,n){(function(e){var r=n("Kz5y"),o=n("B8du"),a=t&&!t.nodeType&&t,i=a&&"object"==typeof e&&e&&!e.nodeType&&e,c=i&&i.exports===a?r.Buffer:void 0,l=(c?c.isBuffer:void 0)||o;e.exports=l}).call(this,n("YuTi")(e))},JHRd:function(e,t,n){var r=n("Kz5y").Uint8Array;e.exports=r},L8xA:function(e,t){e.exports=function(e){var t=this.__data__,n=t.delete(e);return this.size=t.size,n}},MMmD:function(e,t,n){var r=n("lSCD"),o=n("shjB");e.exports=function(e){return null!=e&&o(e.length)&&!r(e)}},NJEC:function(e,t,n){"use strict";n.r(t);var r=n("q1tI"),o=n("VCL8"),a=n("3S7+"),i=n("CtXQ"),c=n("2/Rp"),l=n("YMnH"),u=n("ZvpZ"),s=n("H84U");function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=h(e);if(t){var o=h(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return y(this,n)}}function y(e,t){return!t||"object"!==f(t)&&"function"!=typeof t?v(e):t}function v(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var g=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n},j=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(f,e);var t,n,o,i=b(f);function f(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),(t=i.call(this,e)).onConfirm=function(e){t.setVisible(!1,e);var n=t.props.onConfirm;n&&n.call(v(t),e)},t.onCancel=function(e){t.setVisible(!1,e);var n=t.props.onCancel;n&&n.call(v(t),e)},t.onVisibleChange=function(e){t.props.disabled||t.setVisible(e)},t.saveTooltip=function(e){t.tooltip=e},t.renderOverlay=function(e,n){var o=t.props,a=o.okButtonProps,i=o.cancelButtonProps,l=o.title,u=o.cancelText,s=o.okText,f=o.okType,d=o.icon;return r.createElement("div",null,r.createElement("div",{className:"".concat(e,"-inner-content")},r.createElement("div",{className:"".concat(e,"-message")},d,r.createElement("div",{className:"".concat(e,"-message-title")},l)),r.createElement("div",{className:"".concat(e,"-buttons")},r.createElement(c.default,p({onClick:t.onCancel,size:"small"},i),u||n.cancelText),r.createElement(c.default,p({onClick:t.onConfirm,type:f,size:"small"},a),s||n.okText))))},t.renderConfirm=function(e){var n=e.getPrefixCls,o=t.props,i=o.prefixCls,c=o.placement,s=g(o,["prefixCls","placement"]),f=n("popover",i),d=r.createElement(l.a,{componentName:"Popconfirm",defaultLocale:u.a.Popconfirm},(function(e){return t.renderOverlay(f,e)}));return r.createElement(a.default,p({},s,{prefixCls:f,placement:c,onVisibleChange:t.onVisibleChange,visible:t.state.visible,overlay:d,ref:t.saveTooltip}))},t.state={visible:e.visible},t}return t=f,o=[{key:"getDerivedStateFromProps",value:function(e){return"visible"in e?{visible:e.visible}:"defaultVisible"in e?{visible:e.defaultVisible}:null}}],(n=[{key:"getPopupDomNode",value:function(){return this.tooltip.getPopupDomNode()}},{key:"setVisible",value:function(e,t){var n=this.props;"visible"in n||this.setState({visible:e});var r=n.onVisibleChange;r&&r(e,t)}},{key:"render",value:function(){return r.createElement(s.a,null,this.renderConfirm)}}])&&d(t.prototype,n),o&&d(t,o),f}(r.Component);j.defaultProps={transitionName:"zoom-big",placement:"top",trigger:"click",okType:"primary",icon:r.createElement(i.default,{type:"exclamation-circle",theme:"filled"}),disabled:!1},Object(o.polyfill)(j),t.default=j},"UNi/":function(e,t){e.exports=function(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}},VaNO:function(e,t){e.exports=function(e){return this.__data__.has(e)}},XMDK:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=l(n("kLXV")),o=l(n("Vl3Y")),a=l(n("5rEg"));n("k3Gp"),n("tULf"),n("1vPl");var i=n("q1tI"),c=l(i);function l(e){return e&&e.__esModule?e:{default:e}}var u=a.default.TextArea;t.default=o.default.create()((0,i.forwardRef)((function(e){var t=e.form,n=e.visble,l=e.successFunc,s=e.CancelFunc,f=e.editList,p=t.getFieldDecorator,d=t.validateFields,m=t.setFieldsValue;function b(){m({name:void 0,data:void 0}),s()}return(0,i.useEffect)((function(){f&&f.id?m({name:f.name,data:f.data}):m({name:void 0,data:void 0})}),[f]),c.default.createElement(r.default,{visible:n,okText:"确定",cancelText:"取消",onCancel:b,onOk:function(){d((function(e,t){e||(l(t,f&&f.id),b())}))},title:"新建",closable:!1,width:"500px"},c.default.createElement(o.default,{labelCol:{span:5},wrapperCol:{span:18}},c.default.createElement(o.default.Item,{label:"参数名称"},p("name",{rules:[{required:!0,message:"请输入参数名称"}]})(c.default.createElement(a.default,{placeholder:"请输入参数名称",width:"220px"}))),c.default.createElement(o.default.Item,{label:"参数值"},p("data",{rules:[{required:!0,message:"请输入参数值"}]})(c.default.createElement(u,{placeholder:"请输入参数值",width:"220px",autoSize:{minRows:4,maxRows:4}})))))})))},ZxKT:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o,a=v(n("wCAj")),i=v(n("NJEC")),c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{!r&&c.return&&c.return()}finally{if(o)throw a}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},u=(r=["{\n  padding:24px 30px;\n  min-height:420px;\n}"],o=["{\n  padding:24px 30px;\n  min-height:420px;\n}"],Object.freeze(Object.defineProperties(r,{raw:{value:Object.freeze(o)}})));n("mbEz"),n("k994");var s=n("q1tI"),f=v(s),p=n("spEH"),d=n("eO8H"),m=v(n("vOnD")),b=v(n("XMDK"));n("wds5");var y=v(n("vDqi"));n("LvDl");function v(e){return e&&e.__esModule?e:{default:e}}var h=m.default.div(u);t.default=function(e){var t=(0,s.useState)(void 0),n=l(t,2),r=n[0],o=n[1],u=(0,s.useState)(void 0),m=l(u,2),v=m[0],g=m[1],j=(0,s.useState)(!1),x=l(j,2),E=x[0],_=x[1],w=e.match.params.projectsId,O=e.match.params.owner;function C(){y.default.get("/ci/secrets.json",{params:{owner:O,repo:w}}).then((function(e){e&&o(e.data)})).catch((function(e){}))}(0,s.useEffect)((function(){C()}),[]);var k=[{title:"参数名",dataIndex:"name",key:1,ellipsis:!0},{title:"操作",dataIndex:"operation",key:4,render:function(t,n){return f.default.createElement(f.default.Fragment,null,f.default.createElement("a",{className:"mr10 color-grey-6",onClick:function(){return function(e){g(e),_(!0)}(n)}},f.default.createElement("i",{className:"iconfont icon-zaibianji font-13 mr3"}),"编辑"),f.default.createElement(i.default,{title:"确定要删除此模板？",onConfirm:function(){return function(t,n){if(t&&n){var r="/ci/secrets/"+t+".json";y.default.delete(r,{params:{owner:O,repo:w,name:n}}).then((function(t){t&&(C(),e.showNotification("参数删除成功！"))})).catch((function(e){}))}}(n.id,n.name)},okText:"确定",cancelText:"取消"},f.default.createElement("a",{className:"mr10 color-grey-6"},f.default.createElement("i",{className:"iconfont icon-lajitong font-13 mr3"}),"删除")))}}];return f.default.createElement("div",null,f.default.createElement(b.default,{visble:E,successFunc:function(t,n){var r="/ci/secrets.json?owner="+O+"&repo="+w;y.default.post(r,c({},t,{id:n})).then((function(t){t&&(e.showNotification((n?"参数编辑":"新增参数")+"成功！"),C())})).catch((function(e){}))},CancelFunc:function(){_(!1)},editList:v}),f.default.createElement(p.Banner,null,f.default.createElement(p.FlexAJ,null,f.default.createElement("span",{className:"font-18"},"工作流 - 参数管理"),f.default.createElement(d.Link,{to:"/"+O+"/"+w+"/devops",className:"font-14 color-grey-9 ml20"},"返回"))),f.default.createElement(h,{className:"disposeList"},f.default.createElement("div",{style:{textAlign:"right"}},f.default.createElement(p.Blueback,{onClick:function(){return _(!0)}},"新建")),f.default.createElement(a.default,{className:"mt20",size:"small",columns:k,dataSource:r,rowKey:function(e){return e.id},pagination:!1})))}},b80T:function(e,t,n){var r=n("UNi/"),o=n("03A+"),a=n("Z0cm"),i=n("DSRE"),c=n("wJg7"),l=n("c6wG"),u=Object.prototype.hasOwnProperty;e.exports=function(e,t){var n=a(e),s=!n&&o(e),f=!n&&!s&&i(e),p=!n&&!s&&!f&&l(e),d=n||s||f||p,m=d?r(e.length,String):[],b=m.length;for(var y in e)!t&&!u.call(e,y)||d&&("length"==y||f&&("offset"==y||"parent"==y)||p&&("buffer"==y||"byteLength"==y||"byteOffset"==y)||c(y,b))||m.push(y);return m}},c6wG:function(e,t,n){var r=n("dD9F"),o=n("sEf8"),a=n("mdPL"),i=a&&a.isTypedArray,c=i?o(i):r;e.exports=c},dD9F:function(e,t,n){var r=n("NykK"),o=n("shjB"),a=n("ExA7"),i={};i["[object Float32Array]"]=i["[object Float64Array]"]=i["[object Int8Array]"]=i["[object Int16Array]"]=i["[object Int32Array]"]=i["[object Uint8Array]"]=i["[object Uint8ClampedArray]"]=i["[object Uint16Array]"]=i["[object Uint32Array]"]=!0,i["[object Arguments]"]=i["[object Array]"]=i["[object ArrayBuffer]"]=i["[object Boolean]"]=i["[object DataView]"]=i["[object Date]"]=i["[object Error]"]=i["[object Function]"]=i["[object Map]"]=i["[object Number]"]=i["[object Object]"]=i["[object RegExp]"]=i["[object Set]"]=i["[object String]"]=i["[object WeakMap]"]=!1,e.exports=function(e){return a(e)&&o(e.length)&&!!i[r(e)]}},fmRc:function(e,t,n){var r=n("Xi7e"),o=n("77Zs"),a=n("L8xA"),i=n("gCq4"),c=n("VaNO"),l=n("0Cz8");function u(e){var t=this.__data__=new r(e);this.size=t.size}u.prototype.clear=o,u.prototype.delete=a,u.prototype.get=i,u.prototype.has=c,u.prototype.set=l,e.exports=u},gCq4:function(e,t){e.exports=function(e){return this.__data__.get(e)}},k994:function(e,t,n){"use strict";n.r(t);n("SchZ"),n("Aosp"),n("L/Qf")},kekF:function(e,t){e.exports=function(e,t){return function(n){return e(t(n))}}},mdPL:function(e,t,n){(function(e){var r=n("WFqU"),o=t&&!t.nodeType&&t,a=o&&"object"==typeof e&&e&&!e.nodeType&&e,i=a&&a.exports===o&&r.process,c=function(){try{var e=a&&a.require&&a.require("util").types;return e||i&&i.binding&&i.binding("util")}catch(e){}}();e.exports=c}).call(this,n("YuTi")(e))},sEf8:function(e,t){e.exports=function(e){return function(t){return e(t)}}},wds5:function(e,t,n){},zZ0H:function(e,t){e.exports=function(e){return e}}}]);