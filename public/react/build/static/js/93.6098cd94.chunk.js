(this.webpackJsonp=this.webpackJsonp||[]).push([[93],{"+hnl":function(e,t,n){},MKzF:function(e,t,n){"use strict";n.r(t);n("SchZ"),n("+hnl")},cNeJ:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=c(n("kaz8")),o=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,o=!1,a=void 0;try{for(var u,i=e[Symbol.iterator]();!(r=(u=i.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{!r&&i.return&&i.return()}finally{if(o)throw a}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};n("MKzF");var a=n("q1tI"),u=c(a),i=c(n("vDqi"));function c(e){return e&&e.__esModule?e:{default:e}}n("j4F2"),t.default=function(e){var t=e.current_user,n=(0,a.useState)(),c=o(n,2),l=c[0],s=c[1],f=(0,a.useState)(),p=o(f,2),d=p[0],y=p[1],b=(0,a.useState)(),h=o(b,2),v=h[0],m=h[1];function g(e,n,r){var o=d,a=v;e?o[r]=n.target.checked:a[r]=n.target.checked,i.default.post("/users/"+t.login+"/template_message_settings/update_setting.json",{setting:{notification_body:o,email_body:a}}).then((function(e){e&&0===e.status&&O()}))}function O(){i.default.get("/users/"+t.login+"/template_message_settings.json").then((function(e){e&&200===e.status&&(m(e.data.email_body),y(e.data.notification_body))}))}return(0,a.useEffect)((function(){i.default.get("/template_message_settings.json").then((function(e){e&&200===e.status&&s(e.data.setting_types)})),O()}),[]),u.default.createElement("div",{className:"notice01"},u.default.createElement("div",{className:"sshHead"},u.default.createElement("span",{className:"text-shadow07"},"通知管理")),u.default.createElement("div",null,u.default.createElement("span",{className:"notice-manager-tip"},"您可以通过通知管理来选择接受通知的方式"),l&&d&&v&&l.map((function(e,t){return e.type_name&&u.default.createElement("div",{key:t},u.default.createElement("div",{className:"manager-cont-top"},e.type_name),e.settings.map((function(t,n){var o=e.type.substring(e.type.indexOf("::")+2)+"::"+t.key;return u.default.createElement("div",{className:"manager-cont",key:n},u.default.createElement("div",{className:"manager-cont-title"},t.name),u.default.createElement(r.default,{disabled:t.notification_disabled,defaultChecked:d[o],onChange:function(e){g(!0,e,o)}},"站内信"),u.default.createElement(r.default,{disabled:t.email_disabled,defaultChecked:v[o],onChange:function(e){g(!1,e,o)}},"邮件"))})))}))))}},kaz8:function(e,t,n){"use strict";n.r(t);var r=n("q1tI"),o=n("17x9"),a=n("VCL8"),u=n("TSYQ"),i=n.n(u),c=n("x1Ya"),l=n("Gytx"),s=n.n(l),f=n("H84U"),p=n("6CfX");function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function h(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function g(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=k(e);if(t){var o=k(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return O(this,n)}}function O(e,t){return!t||"object"!==d(t)&&"function"!=typeof t?x(e):t}function x(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function k(e){return(k=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var C=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n},j=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(u,e);var t,n,o,a=g(u);function u(){var e;return h(this,u),(e=a.apply(this,arguments)).saveCheckbox=function(t){e.rcCheckbox=t},e.renderCheckbox=function(t){var n,o=t.getPrefixCls,a=x(e),u=a.props,l=a.context,s=u.prefixCls,f=u.className,p=u.children,d=u.indeterminate,h=u.style,v=u.onMouseEnter,m=u.onMouseLeave,g=C(u,["prefixCls","className","children","indeterminate","style","onMouseEnter","onMouseLeave"]),O=l.checkboxGroup,k=o("checkbox",s),j=b({},g);O&&(j.onChange=function(){g.onChange&&g.onChange.apply(g,arguments),O.toggleOption({label:p,value:u.value})},j.name=O.name,j.checked=-1!==O.value.indexOf(u.value),j.disabled=u.disabled||O.disabled);var _=i()(f,(y(n={},"".concat(k,"-wrapper"),!0),y(n,"".concat(k,"-wrapper-checked"),j.checked),y(n,"".concat(k,"-wrapper-disabled"),j.disabled),n)),w=i()(y({},"".concat(k,"-indeterminate"),d));return r.createElement("label",{className:_,style:h,onMouseEnter:v,onMouseLeave:m},r.createElement(c.a,b({},j,{prefixCls:k,className:w,ref:e.saveCheckbox})),void 0!==p&&r.createElement("span",null,p))},e}return t=u,(n=[{key:"componentDidMount",value:function(){var e=this.props.value,t=(this.context||{}).checkboxGroup,n=void 0===t?{}:t;n.registerValue&&n.registerValue(e),Object(p.a)("checked"in this.props||(this.context||{}).checkboxGroup||!("value"in this.props),"Checkbox","`value` is not validate prop, do you mean `checked`?")}},{key:"shouldComponentUpdate",value:function(e,t,n){return!s()(this.props,e)||!s()(this.state,t)||!s()(this.context.checkboxGroup,n.checkboxGroup)}},{key:"componentDidUpdate",value:function(e){var t=e.value,n=this.props.value,r=(this.context||{}).checkboxGroup,o=void 0===r?{}:r;n!==t&&o.registerValue&&o.cancelValue&&(o.cancelValue(t),o.registerValue(n))}},{key:"componentWillUnmount",value:function(){var e=this.props.value,t=(this.context||{}).checkboxGroup,n=void 0===t?{}:t;n.cancelValue&&n.cancelValue(e)}},{key:"focus",value:function(){this.rcCheckbox.focus()}},{key:"blur",value:function(){this.rcCheckbox.blur()}},{key:"render",value:function(){return r.createElement(f.a,null,this.renderCheckbox)}}])&&v(t.prototype,n),o&&v(t,o),u}(r.Component);j.__ANT_CHECKBOX=!0,j.defaultProps={indeterminate:!1},j.contextTypes={checkboxGroup:o.any},Object(a.polyfill)(j);var _=j,w=n("BGR+");function S(e){return(S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function E(){return(E=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function P(e){return function(e){if(Array.isArray(e))return V(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return V(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return V(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function V(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function N(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function G(e,t){return(G=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function R(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=A(e);if(t){var o=A(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return M(this,n)}}function M(e,t){return!t||"object"!==S(t)&&"function"!=typeof t?T(e):t}function T(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function A(e){return(A=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var I=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n},D=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&G(e,t)}(u,e);var t,n,o,a=R(u);function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=a.call(this,e)).cancelValue=function(e){t.setState((function(t){return{registeredValues:t.registeredValues.filter((function(t){return t!==e}))}}))},t.registerValue=function(e){t.setState((function(t){var n=t.registeredValues;return{registeredValues:[].concat(P(n),[e])}}))},t.toggleOption=function(e){var n=t.state.registeredValues,r=t.state.value.indexOf(e.value),o=P(t.state.value);-1===r?o.push(e.value):o.splice(r,1),"value"in t.props||t.setState({value:o});var a=t.props.onChange;if(a){var u=t.getOptions();a(o.filter((function(e){return-1!==n.indexOf(e)})).sort((function(e,t){return u.findIndex((function(t){return t.value===e}))-u.findIndex((function(e){return e.value===t}))})))}},t.renderGroup=function(e){var n=e.getPrefixCls,o=T(t),a=o.props,u=o.state,c=a.prefixCls,l=a.className,s=a.style,f=a.options,p=I(a,["prefixCls","className","style","options"]),d=n("checkbox",c),y="".concat(d,"-group"),b=Object(w.a)(p,["children","defaultValue","value","onChange","disabled"]),h=a.children;f&&f.length>0&&(h=t.getOptions().map((function(e){return r.createElement(_,{prefixCls:d,key:e.value.toString(),disabled:"disabled"in e?e.disabled:a.disabled,value:e.value,checked:-1!==u.value.indexOf(e.value),onChange:e.onChange,className:"".concat(y,"-item")},e.label)})));var v=i()(y,l);return r.createElement("div",E({className:v,style:s},b),h)},t.state={value:e.value||e.defaultValue||[],registeredValues:[]},t}return t=u,o=[{key:"getDerivedStateFromProps",value:function(e){return"value"in e?{value:e.value||[]}:null}}],(n=[{key:"getChildContext",value:function(){return{checkboxGroup:{toggleOption:this.toggleOption,value:this.state.value,disabled:this.props.disabled,name:this.props.name,registerValue:this.registerValue,cancelValue:this.cancelValue}}}},{key:"shouldComponentUpdate",value:function(e,t){return!s()(this.props,e)||!s()(this.state,t)}},{key:"getOptions",value:function(){return this.props.options.map((function(e){return"string"==typeof e?{label:e,value:e}:e}))}},{key:"render",value:function(){return r.createElement(f.a,null,this.renderGroup)}}])&&N(t.prototype,n),o&&N(t,o),u}(r.Component);D.defaultProps={options:[]},D.propTypes={defaultValue:o.array,value:o.array,options:o.array.isRequired,onChange:o.func},D.childContextTypes={checkboxGroup:o.any},Object(a.polyfill)(D);var U=D;_.Group=U;t.default=_}}]);