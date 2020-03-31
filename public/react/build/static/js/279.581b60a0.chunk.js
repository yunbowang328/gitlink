webpackJsonp([279],{

/***/ 4634:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_loadable__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_loadable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_loadable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Loading__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_CNotificationHOC__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__css_Courses_css__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__css_Courses_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__css_Courses_css__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}// import { TPMIndexHOC } from '../tpm/TPMIndexHOC';
//引入对应跳转的组件
var ListPageIndex=__WEBPACK_IMPORTED_MODULE_3_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(46/* duplicate */).then(__webpack_require__.bind(null, 3167));},loading:__WEBPACK_IMPORTED_MODULE_4__Loading__["a" /* default */]});// 讨论
var BoardsNew=__WEBPACK_IMPORTED_MODULE_3_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(100).then(__webpack_require__.bind(null, 4635));},loading:__WEBPACK_IMPORTED_MODULE_4__Loading__["a" /* default */]});var TopicDetail=__WEBPACK_IMPORTED_MODULE_3_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(156).then(__webpack_require__.bind(null, 4637));},loading:__WEBPACK_IMPORTED_MODULE_4__Loading__["a" /* default */]});// 讨论
var Boards=__WEBPACK_IMPORTED_MODULE_3_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(134).then(__webpack_require__.bind(null, 3302));},loading:__WEBPACK_IMPORTED_MODULE_4__Loading__["a" /* default */]});var CoursesIndex=function(_Component){_inherits(CoursesIndex,_Component);function CoursesIndex(props){_classCallCheck(this,CoursesIndex);var _this=_possibleConstructorReturn(this,(CoursesIndex.__proto__||Object.getPrototypeOf(CoursesIndex)).call(this,props));_this.state={// coursedata:undefined
};return _this;}_createClass(CoursesIndex,[{key:'componentDidMount',value:function componentDidMount(){}},{key:'render',value:function render(){var _this2=this;var common={};return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["f" /* Switch */],this.props,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["e" /* Route */],{exact:true,path:'/courses/:coursesId/boards/:boardId/messages/:topicId/edit',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(BoardsNew,Object.assign({},_this2.props,props,_this2.state,common));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["e" /* Route */],{exact:true,path:'/courses/:coursesId/boards/:boardId/messages/new',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(BoardsNew,Object.assign({},_this2.props,props,_this2.state,common));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["e" /* Route */],{exact:true,path:'/courses/:coursesId/boards/:boardId/messages/:topicId',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(TopicDetail,Object.assign({},_this2.props,_this2.state,props,common));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["e" /* Route */],{exact:true,path:'/courses/:coursesId/boards/:boardId/messages/:topicId',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(TopicDetail,Object.assign({},_this2.props,_this2.state,props,common));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["e" /* Route */],{exact:true,path:'/courses/:coursesId/boards/:boardId',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ListPageIndex,Object.assign({},_this2.props,props,_this2.state,common));}}));}}]);return CoursesIndex;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_6__common_CNotificationHOC__["a" /* CNotificationHOC */])()(Object(__WEBPACK_IMPORTED_MODULE_1_educoder__["w" /* SnackbarHOC */])()(CoursesIndex)));

/***/ })

});