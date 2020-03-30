webpackJsonp([59],{

/***/ 3784:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var GtopicBanks=function(_Component){_inherits(GtopicBanks,_Component);function GtopicBanks(props){_classCallCheck(this,GtopicBanks);var _this=_possibleConstructorReturn(this,(GtopicBanks.__proto__||Object.getPrototypeOf(GtopicBanks)).call(this,props));_this.componentDidMount=function(){var bankId=_this.props.match.params.bankId;var crumbData={title:'MySQL数据库编程开发实训（基础篇）111',is_public:true,crumbArray:[{content:'详情'}]};var menuData={tab:'0',//tab选中的index
menuArray:[//tab以及tab路由
{to:'/banks/gtopic/1',content:'内容详情'}],category:'topic',//毕设选题
id:bankId,is_public:true};_this.props.initPublic(crumbData,menuData);};return _this;}_createClass(GtopicBanks,[{key:'render',value:function render(){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',null);}}]);return GtopicBanks;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (GtopicBanks);

/***/ })

});