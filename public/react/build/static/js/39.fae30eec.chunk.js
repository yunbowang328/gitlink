webpackJsonp([39],{

/***/ 878:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_loadable__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_loadable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_loadable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Loading__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tpm_TPMIndexHOC__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tpm_NewFooter__ = __webpack_require__(400);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var PathsDetail=__WEBPACK_IMPORTED_MODULE_3_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(96).then(__webpack_require__.bind(null, 4720));},loading:__WEBPACK_IMPORTED_MODULE_4__Loading__["a" /* default */]});var PathsNew=__WEBPACK_IMPORTED_MODULE_3_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(276).then(__webpack_require__.bind(null, 4735));},loading:__WEBPACK_IMPORTED_MODULE_4__Loading__["a" /* default */]});// const Statistics = Loadable({
//     loader: () => import('./SchoolStatistics/Statistics'),
//     loading:Loading
// })
var Statistics=__WEBPACK_IMPORTED_MODULE_3_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(118).then(__webpack_require__.bind(null, 4736));},loading:__WEBPACK_IMPORTED_MODULE_4__Loading__["a" /* default */]});var ShixunPaths=__WEBPACK_IMPORTED_MODULE_3_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(148).then(__webpack_require__.bind(null, 4740));},loading:__WEBPACK_IMPORTED_MODULE_4__Loading__["a" /* default */]});var Index=function(_Component){_inherits(Index,_Component);function Index(props){_classCallCheck(this,Index);return _possibleConstructorReturn(this,(Index.__proto__||Object.getPrototypeOf(Index)).call(this,props));}_createClass(Index,[{key:'render',value:function render(){var _this2=this;return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["f" /* Switch */],this.props,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["e" /* Route */],Object.assign({path:'/paths/:pathId/statistics',component:Statistics},this.props,this.state)),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["e" /* Route */],{path:'/paths/new',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(PathsNew,Object.assign({},_this2.props,_this2.state,props));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["e" /* Route */],{path:'/paths/:pathId/edit',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(PathsNew,Object.assign({},_this2.props,_this2.state,props));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["e" /* Route */],{path:'/paths/:pathId',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(PathsDetail,Object.assign({},_this2.props,_this2.state,props));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["e" /* Route */],{path:'/paths',exact:true,render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ShixunPaths,Object.assign({},_this2.props,_this2.state,props));}})));}}]);return Index;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_educoder__["d" /* CNotificationHOC */])()(Object(__WEBPACK_IMPORTED_MODULE_1_educoder__["w" /* SnackbarHOC */])()(Object(__WEBPACK_IMPORTED_MODULE_5__tpm_TPMIndexHOC__["a" /* TPMIndexHOC */])(Index))));

/***/ })

});