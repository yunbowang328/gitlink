(this.webpackJsonp=this.webpackJsonp||[]).push([[46],{"0Cz8":function(e,t,n){var r=n("Xi7e"),a=n("ebwN"),o=n("e4Nc");e.exports=function(e,t){var n=this.__data__;if(n instanceof r){var i=n.__data__;if(!a||i.length<199)return i.push([e,t]),this.size=++n.size,this;n=this.__data__=new o(i)}return n.set(e,t),this.size=n.size,this}},"6sVZ":function(e,t){var n=Object.prototype;e.exports=function(e){var t=e&&e.constructor;return e===("function"==typeof t&&t.prototype||n)}},"77Zs":function(e,t,n){var r=n("Xi7e");e.exports=function(){this.__data__=new r,this.size=0}},B8du:function(e,t){e.exports=function(){return!1}},DSRE:function(e,t,n){(function(e){var r=n("Kz5y"),a=n("B8du"),o=t&&!t.nodeType&&t,i=o&&"object"==typeof e&&e&&!e.nodeType&&e,c=i&&i.exports===o?r.Buffer:void 0,l=(c?c.isBuffer:void 0)||a;e.exports=l}).call(this,n("YuTi")(e))},JHRd:function(e,t,n){var r=n("Kz5y").Uint8Array;e.exports=r},L8xA:function(e,t){e.exports=function(e){var t=this.__data__,n=t.delete(e);return this.size=t.size,n}},MMmD:function(e,t,n){var r=n("lSCD"),a=n("shjB");e.exports=function(e){return null!=e&&a(e.length)&&!r(e)}},NJEC:function(e,t,n){"use strict";n.r(t);var r=n("q1tI"),a=n("VCL8"),o=n("3S7+"),i=n("CtXQ"),c=n("2/Rp"),l=n("YMnH"),u=n("ZvpZ"),s=n("H84U");function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=v(e);if(t){var a=v(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return h(this,n)}}function h(e,t){return!t||"object"!==f(t)&&"function"!=typeof t?y(e):t}function y(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var g=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},E=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(f,e);var t,n,a,i=b(f);function f(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),(t=i.call(this,e)).onConfirm=function(e){t.setVisible(!1,e);var n=t.props.onConfirm;n&&n.call(y(t),e)},t.onCancel=function(e){t.setVisible(!1,e);var n=t.props.onCancel;n&&n.call(y(t),e)},t.onVisibleChange=function(e){t.props.disabled||t.setVisible(e)},t.saveTooltip=function(e){t.tooltip=e},t.renderOverlay=function(e,n){var a=t.props,o=a.okButtonProps,i=a.cancelButtonProps,l=a.title,u=a.cancelText,s=a.okText,f=a.okType,d=a.icon;return r.createElement("div",null,r.createElement("div",{className:"".concat(e,"-inner-content")},r.createElement("div",{className:"".concat(e,"-message")},d,r.createElement("div",{className:"".concat(e,"-message-title")},l)),r.createElement("div",{className:"".concat(e,"-buttons")},r.createElement(c.default,p({onClick:t.onCancel,size:"small"},i),u||n.cancelText),r.createElement(c.default,p({onClick:t.onConfirm,type:f,size:"small"},o),s||n.okText))))},t.renderConfirm=function(e){var n=e.getPrefixCls,a=t.props,i=a.prefixCls,c=a.placement,s=g(a,["prefixCls","placement"]),f=n("popover",i),d=r.createElement(l.a,{componentName:"Popconfirm",defaultLocale:u.a.Popconfirm},(function(e){return t.renderOverlay(f,e)}));return r.createElement(o.default,p({},s,{prefixCls:f,placement:c,onVisibleChange:t.onVisibleChange,visible:t.state.visible,overlay:d,ref:t.saveTooltip}))},t.state={visible:e.visible},t}return t=f,a=[{key:"getDerivedStateFromProps",value:function(e){return"visible"in e?{visible:e.visible}:"defaultVisible"in e?{visible:e.defaultVisible}:null}}],(n=[{key:"getPopupDomNode",value:function(){return this.tooltip.getPopupDomNode()}},{key:"setVisible",value:function(e,t){var n=this.props;"visible"in n||this.setState({visible:e});var r=n.onVisibleChange;r&&r(e,t)}},{key:"render",value:function(){return r.createElement(s.a,null,this.renderConfirm)}}])&&d(t.prototype,n),a&&d(t,a),f}(r.Component);E.defaultProps={transitionName:"zoom-big",placement:"top",trigger:"click",okType:"primary",icon:r.createElement(i.default,{type:"exclamation-circle",theme:"filled"}),disabled:!1},Object(a.polyfill)(E),t.default=E},PhNK:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.truncateCommitId=function(e){return e&&e.length>11?e.substring(0,10):e},t.timeFormat=function(e){var t=new Date(1e3*e),n=t.getHours()<10?"0".concat(t.getHours()):t.getHours(),r=t.getMinutes()<10?"0".concat(t.getMinutes()):t.getMinutes();return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+"  "+n+":"+r}},"UNi/":function(e,t){e.exports=function(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}},VaNO:function(e,t){e.exports=function(e){return this.__data__.has(e)}},b80T:function(e,t,n){var r=n("UNi/"),a=n("03A+"),o=n("Z0cm"),i=n("DSRE"),c=n("wJg7"),l=n("c6wG"),u=Object.prototype.hasOwnProperty;e.exports=function(e,t){var n=o(e),s=!n&&a(e),f=!n&&!s&&i(e),p=!n&&!s&&!f&&l(e),d=n||s||f||p,m=d?r(e.length,String):[],b=m.length;for(var h in e)!t&&!u.call(e,h)||d&&("length"==h||f&&("offset"==h||"parent"==h)||p&&("buffer"==h||"byteLength"==h||"byteOffset"==h)||c(h,b))||m.push(h);return m}},c6wG:function(e,t,n){var r=n("dD9F"),a=n("sEf8"),o=n("mdPL"),i=o&&o.isTypedArray,c=i?a(i):r;e.exports=c},dD9F:function(e,t,n){var r=n("NykK"),a=n("shjB"),o=n("ExA7"),i={};i["[object Float32Array]"]=i["[object Float64Array]"]=i["[object Int8Array]"]=i["[object Int16Array]"]=i["[object Int32Array]"]=i["[object Uint8Array]"]=i["[object Uint8ClampedArray]"]=i["[object Uint16Array]"]=i["[object Uint32Array]"]=!0,i["[object Arguments]"]=i["[object Array]"]=i["[object ArrayBuffer]"]=i["[object Boolean]"]=i["[object DataView]"]=i["[object Date]"]=i["[object Error]"]=i["[object Function]"]=i["[object Map]"]=i["[object Number]"]=i["[object Object]"]=i["[object RegExp]"]=i["[object Set]"]=i["[object String]"]=i["[object WeakMap]"]=!1,e.exports=function(e){return o(e)&&a(e.length)&&!!i[r(e)]}},fmRc:function(e,t,n){var r=n("Xi7e"),a=n("77Zs"),o=n("L8xA"),i=n("gCq4"),c=n("VaNO"),l=n("0Cz8");function u(e){var t=this.__data__=new r(e);this.size=t.size}u.prototype.clear=a,u.prototype.delete=o,u.prototype.get=i,u.prototype.has=c,u.prototype.set=l,e.exports=u},gCq4:function(e,t){e.exports=function(e){return this.__data__.get(e)}},k994:function(e,t,n){"use strict";n.r(t);n("SchZ"),n("Aosp"),n("L/Qf")},kekF:function(e,t){e.exports=function(e,t){return function(n){return e(t(n))}}},mdPL:function(e,t,n){(function(e){var r=n("WFqU"),a=t&&!t.nodeType&&t,o=a&&"object"==typeof e&&e&&!e.nodeType&&e,i=o&&o.exports===a&&r.process,c=function(){try{var e=o&&o.require&&o.require("util").types;return e||i&&i.binding&&i.binding("util")}catch(e){}}();e.exports=c}).call(this,n("YuTi")(e))},sEf8:function(e,t){e.exports=function(e){return function(t){return e(t)}}},t8ff:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,a,o=v(n("NUBc")),i=v(n("wCAj")),c=v(n("NJEC")),l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{!r&&c.return&&c.return()}finally{if(a)throw o}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},s=(r=["{\n  padding:24px 30px;\n}"],a=["{\n  padding:24px 30px;\n}"],Object.freeze(Object.defineProperties(r,{raw:{value:Object.freeze(a)}})));n("YQTV"),n("mbEz"),n("k994");var f=n("q1tI"),p=v(f),d=n("spEH"),m=n("PhNK"),b=n("sYIF"),h=v(n("vDqi")),y=n("eO8H");function v(e){return e&&e.__esModule?e:{default:e}}var g=v(n("vOnD")).default.div(s),E=[{name:"所有"},{name:"运行中",value:"running"},{name:"已撤销",value:"killed"},{name:"构建失败",value:"failure"},{name:"已完成",value:"success"}];t.default=(0,f.forwardRef)((function(e,t){var n=(0,f.useState)(void 0),r=u(n,2),a=r[0],s=r[1],v=(0,f.useState)(1),x=u(v,2),j=x[0],_=x[1],w=(0,f.useState)(0),N=u(w,2),C=N[0],O=N[1],k=(0,f.useState)(void 0),P=u(k,2),T=P[0],A=P[1],S=(0,f.useState)(!0),z=u(S,2),I=z[0],D=z[1],V=e.match.params.projectsId,R=e.match.params.owner,F=e.match.params.branch,B=e.projectDetail&&e.projectDetail.permission;function M(e){var t="/"+R+"/"+V+"/builds.json";h.default.get(t,{params:{search:e,page:j,limit:15,branch:F}}).then((function(e){if(e&&e.data){var t=e.data.builds&&e.data.builds.map((function(e,t){return l({},e,{author:e.author&&e.author.name,image_url:e.author&&e.author.image_url,message:{branch:e.branch_target,message:e.message,sha:(0,m.truncateCommitId)(e.build_after_sha)},started:e.started||"--"})}));O(e.data.total_count),A(t),D(!1)}})).catch((function(e){console.log(e)}))}function U(t,n){return"error"===t||"success"===t?"":"killed"===t||"failure"===t?p.default.createElement(c.default,{title:"确认重新构建？",onConfirm:function(t){return function(t,n){t.stopPropagation(),D(!0);var r="/"+R+"/"+V+"/builds/"+n+"/restart.json";h.default.post(r).then((function(t){t&&(e.showNotification("工作流正在重新构建！"),M())})).catch((function(e){console.log(e)}))}(t,n)},onCancel:function(e){e.stopPropagation()},cancelText:"取消",okText:"确定"},p.default.createElement("a",{className:"color-blue",onClick:function(e){e.stopPropagation()}},"重新构建")):p.default.createElement(c.default,{title:"确认撤销构建？",onConfirm:function(t){return function(t,n){t.stopPropagation(),D(!0);var r="/"+R+"/"+V+"/builds/"+n+"/stop.json";h.default.delete(r).then((function(t){t&&(e.showNotification("撤销构建成功！"),M(V))})).catch((function(e){console.log(e)}))}(t,n)},onCancel:function(e){e.stopPropagation()},cancelText:"取消",okText:"确定"},p.default.createElement("a",{className:"color-red",onClick:function(e){e.stopPropagation()}},"撤销构建"))}(0,f.useImperativeHandle)(t,(function(){return{changeVal:function(){D(!0),M()}}})),(0,f.useEffect)((function(){V&&M()}),[j]),e.current_user;var H=[{title:"序号",dataIndex:"number",key:"number",width:"8%",render:function(e,t,n){return p.default.createElement("span",null,"#",e)}},{title:"状态",dataIndex:"status",key:"status",width:"12%",render:function(e,t,n){return function(e){switch(e){case"running":return p.default.createElement("span",{className:"statusTag running"},p.default.createElement("i",{className:"iconfont icon-yunhangzhong"}),"运行中");case"failure":case"error":return p.default.createElement("span",{className:"statusTag failed"},p.default.createElement("i",{className:"iconfont icon-weitongguo"}),"未通过");case"success":return p.default.createElement("span",{className:"statusTag pass"},p.default.createElement("i",{className:"iconfont icon-yitongguo"}),"已通过");case"killed":return p.default.createElement("span",{className:"statusTag killed"},p.default.createElement("i",{className:"iconfont icon-weitongguo"}),"已撤销");default:return p.default.createElement("span",{className:"statusTag Preparing"},p.default.createElement("i",{className:"iconfont icon-zhunbeizhong"}),"准备中")}}(e)}},{title:"构建人",dataIndex:"author",key:"author",width:"12%",align:"center"},{title:"提交信息",dataIndex:"message",key:"message",width:"30%",render:function(e,t,n){var r=t.message;return p.default.createElement(p.default.Fragment,null,p.default.createElement("div",null,r.branch&&p.default.createElement("span",{className:"mr10 color-grey-8"},p.default.createElement("i",{className:"iconfont icon-fenzhi1 font-16 mr5"}),"分支",r.branch),r.sha&&p.default.createElement("span",{className:"color-orange"},r.sha)),p.default.createElement(d.AlignCenter,null,p.default.createElement("img",{style:{borderRadius:"50%",marginRight:"10px",width:"25px",height:"25px"},alt:"",src:""+(t.image_url&&(0,b.getImageUrl)("/"+t.image_url))}),p.default.createElement("div",{className:"task-hide ml5",style:{maxWidth:"300px"}},r.message)))}},{title:"开始时间",dataIndex:"started",key:"started",width:"15%",render:function(e,t,n){return p.default.createElement("span",null,e||"--")}},{title:"运行时间",dataIndex:"duration_time",key:"duration_time",width:"15%",render:function(e,t,n){return p.default.createElement("span",null,e||"--")}},{title:"操作",dataIndex:"operation",key:"operation",render:function(e,t,n){return"Admin"===B||"Owner"===B?U(t.status,t.number):"--"}}];return p.default.createElement("div",{className:"disposePanel"},p.default.createElement(d.Banner,null,p.default.createElement(d.FlexAJ,null,p.default.createElement("span",null,"构建列表"),p.default.createElement(y.Link,{to:"/"+R+"/"+V+"/devops",className:"font-15 color-grey-9"},"返回"))),p.default.createElement(g,null,p.default.createElement("div",{className:"listPart"},p.default.createElement(d.FlexAJ,null,p.default.createElement("ul",{className:"listNav"},E.map((function(e,t){return p.default.createElement("li",{onClick:function(){return t=e.value,s(t),void M(t);var t},className:a===e.value?"active":""},e.name)}))),p.default.createElement("a",{onClick:function(){return M(a)},className:"color-red font-16"},"刷新")),p.default.createElement(i.default,{onRow:function(t,n){return{onClick:function(n){return r=t,void e.history.push("/"+R+"/"+V+"/devops/"+r.number+"/detail");var r}}},columns:H,className:"normalTable",dataSource:T,pagination:!1,loading:I}),C>15?p.default.createElement("div",{style:{textAlign:"center",margin:"30px 50px"}},p.default.createElement(o.default,{showQuickJumper:!0,defaultCurrent:j,total:C,pageSize:15,onChange:function(e){_(e)}})):"")))}))},zZ0H:function(e,t){e.exports=function(e){return e}}}]);