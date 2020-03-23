webpackJsonp([41],{

/***/ 876:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_spin_style_css__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_spin_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_spin_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_spin__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_spin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_spin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_axios__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Otherloginqq=function(_Component){_inherits(Otherloginqq,_Component);function Otherloginqq(){_classCallCheck(this,Otherloginqq);return _possibleConstructorReturn(this,(Otherloginqq.__proto__||Object.getPrototypeOf(Otherloginqq)).apply(this,arguments));}_createClass(Otherloginqq,[{key:'componentDidMount',value:function componentDidMount(){var query=this.props.location.search;if(query!=""){var type=query.split('?code=');var types=type[1].split('&state=');var typeshref=types[1].split('%2C');var codeurl='/auth/qq/callback';__WEBPACK_IMPORTED_MODULE_4_axios___default.a.get(codeurl,{params:{code:types[0],redirect_uri:'https://www.educoder.net/otherloginqq'}}).then(function(result){if(result){if(result.data.status===0){if(result.data.new_user===true){window.location.href='https://'+decodeURIComponent(typeshref[1])+'/loginqq?type=qq';}else{// this.getinfo()
if(typeshref[0]==="account"){window.location.href='https://'+decodeURIComponent(typeshref[1])+'/account/binding';}else{window.location.href='https://'+decodeURIComponent(typeshref[1]);}}}}}).catch(function(error){});}}},{key:'render',value:function render(){// Loading
return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'App',style:{minHeight:'800px',width:"100%"}},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('style',null,'\n\t\t\t\t\t\t .margintop{\n\t\t\t\t\t\t   margin-top:20%;\n\t\t\t\t\t\t }\n\t\t\t\t\t\t'),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_spin___default.a,{size:'large',className:"margintop"}));}}]);return Otherloginqq;}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (Otherloginqq);

/***/ })

});