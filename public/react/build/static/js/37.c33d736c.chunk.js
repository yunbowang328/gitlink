webpackJsonp([37],{

/***/ 893:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tpm_TPMIndexHOC__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__courses_common_CNotificationHOC__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_loadable__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_loadable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_loadable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Loading__ = __webpack_require__(345);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var UsersInfo=__WEBPACK_IMPORTED_MODULE_5_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(0/* duplicate */).then(__webpack_require__.bind(null, 871));},loading:__WEBPACK_IMPORTED_MODULE_6__Loading__["a" /* default */]});var VideoUploadList=__WEBPACK_IMPORTED_MODULE_5_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(188).then(__webpack_require__.bind(null, 3441));},loading:__WEBPACK_IMPORTED_MODULE_6__Loading__["a" /* default */]});var VideoPublishSuccess=__WEBPACK_IMPORTED_MODULE_5_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(227).then(__webpack_require__.bind(null, 5024));},loading:__WEBPACK_IMPORTED_MODULE_6__Loading__["a" /* default */]});var VideoProtocol=__WEBPACK_IMPORTED_MODULE_5_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(228).then(__webpack_require__.bind(null, 5025));},loading:__WEBPACK_IMPORTED_MODULE_6__Loading__["a" /* default */]});var $=window.$;var InfosIndex=function(_Component){_inherits(InfosIndex,_Component);function InfosIndex(props){_classCallCheck(this,InfosIndex);var _this=_possibleConstructorReturn(this,(InfosIndex.__proto__||Object.getPrototypeOf(InfosIndex)).call(this,props));_this.componentDidMount=function(){};_this.componentDidUpdate=function(prevProps){};_this.state={data:undefined};return _this;}//判断是否看的是当前用户的个人主页
_createClass(InfosIndex,[{key:'render',value:function render(){var _this2=this;var data=this.state.data;return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["f" /* Switch */],this.props,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{exact:true,path:'/users/:username/videos/upload',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(VideoUploadList,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{exact:true,path:'/users/:username/videos/success',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(VideoPublishSuccess,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{exact:true,path:'/users/:username/videos/protocol',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(VideoProtocol,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/users/:username',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(UsersInfo,Object.assign({},_this2.props,props,_this2.state));}}));}}]);return InfosIndex;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_4__courses_common_CNotificationHOC__["a" /* CNotificationHOC */])()(Object(__WEBPACK_IMPORTED_MODULE_2_educoder__["w" /* SnackbarHOC */])()(Object(__WEBPACK_IMPORTED_MODULE_3__tpm_TPMIndexHOC__["a" /* TPMIndexHOC */])(InfosIndex))));

/***/ })

});