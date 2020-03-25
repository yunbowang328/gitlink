webpackJsonp([32],{

/***/ 1742:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ImageLayerOfCommentHOC;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ImageLayer__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_educoder__ = __webpack_require__(5);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var $=window.$;function ImageLayerOfCommentHOC(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};return function wrap(WrappedComponent){return function(_Component){_inherits(Wrapper,_Component);function Wrapper(props){_classCallCheck(this,Wrapper);var _this=_possibleConstructorReturn(this,(Wrapper.__proto__||Object.getPrototypeOf(Wrapper)).call(this,props));_this.onDelegateClick=function(event){var imageSrc=event.target.src||event.target.getAttribute('src')||event.target.getAttribute('href');// 判断imageSrc是否是图片
var fileName=event.target.innerHTML.trim();if(Object(__WEBPACK_IMPORTED_MODULE_2_educoder__["Z" /* isImageExtension */])(imageSrc.trim())||Object(__WEBPACK_IMPORTED_MODULE_2_educoder__["Z" /* isImageExtension */])(fileName)||event.target.tagName=='IMG'){// 非回复里的头像图片; 非emoticons
if(imageSrc.indexOf('/images/avatars/User')===-1&&imageSrc.indexOf('kindeditor/plugins/emoticons')===-1){_this.setState({showImage:true,imageSrc:imageSrc});}event.stopPropagation();event.preventDefault&&event.preventDefault();event.originalEvent.preventDefault();// event.originalEvent.stopPropagation()
// event.originalEvent.cancelBubble = true
return false;}};_this.onImageLayerClose=function(){_this.setState({showImage:false,imageSrc:''});};_this.MdifHasAnchorJustScorll=function(){//mdhash滚动
var anchor=decodeURI(_this.props.location.hash).replace('#','');// 对应id的话, 滚动到相应位置
if(!!anchor){var anchorElement=document.getElementsByName(anchor);if(anchorElement){if(anchorElement.length!=0){anchorElement[anchorElement.length-1].scrollIntoView();}}}};_this.state={showImage:false,imageSrc:''};return _this;}_createClass(Wrapper,[{key:'componentDidMount',// jQuery._data( $('.newMain')[0], "events" )
value:function componentDidMount(){var _this2=this;this.props.wrappedComponentRef&&this.props.wrappedComponentRef(this.refs['wrappedComponentRef']);// commentsDelegateParent #game_left_contents #tab_con_4
setTimeout(function(){$(options.parentSelector||".commentsDelegateParent").delegate(options.imgSelector||".J_Comment_Reply .comment_content img, .J_Comment_Reply .childrenCommentsView img","click",_this2.onDelegateClick);},1200);}},{key:'componentWillUnmount',value:function componentWillUnmount(){$(options.parentSelector||".commentsDelegateParent",'click',this.onDelegateClick);}},{key:'render',value:function render(){this.MdifHasAnchorJustScorll();return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Fragment,null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__ImageLayer__["a" /* default */],Object.assign({},this.state,{onImageLayerClose:this.onImageLayerClose})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(WrappedComponent,Object.assign({},this.props,{ref:'wrappedComponentRef'})));}}]);return Wrapper;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);};}

/***/ }),

/***/ 2450:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4718);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(300)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 4718:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(299)(true);
// imports


// module
exports.push([module.i, ".newMain{background-color:#fff}.main{width:1200px;margin:20px auto}.normal{width:1200px;margin:0 auto}.back-white{background:#fff}.back-black{background:#000}.btn_32{border-radius:4px;padding:0 12px;height:32px;line-height:32px;background-color:#f4f4f4;color:#666;display:inline-block}@media screen and (max-width:1200px){.main{width:1000px;margin:10px auto}}.hide-1{display:inline-block;white-space:nowrap}.hide-1,.hide-2{overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis}.hide-2{display:inline-block;display:-webkit-box;-webkit-line-clamp:2}.df{display:-ms-flexbox;display:flex}.flex-1{-ms-flex:1 1;flex:1 1;width:0}.f-wrap-between{-ms-flex-pack:justify;justify-content:space-between}.f-wrap-alignCenter,.f-wrap-between{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.f-wrap-alignCenter{-ms-flex-align:center;align-items:center}.normalBox{border-radius:4px;border:1px solid #ddd}.normalBox-title{padding:10px;background-color:#f4f4f4;line-height:18px}@media screen and (max-width:1000px){.main{margin:1rem auto}.main,.normal{width:750px}}@media screen and (max-width:750px){.main{width:95%;margin:1rem auto}.normal{width:100%}}", "", {"version":3,"sources":["/Users/jasder/work/trustie3.0/forgeplus-react/src/forge/css/index.css"],"names":[],"mappings":"AAAA,SACE,qBAAuB,CACxB,AACD,MACE,aAAc,AACd,gBAAiB,CAClB,AACD,QACE,aAAc,AACd,aAAgB,CACjB,AAED,YACE,eAAiB,CAClB,AACD,YACE,eAAiB,CAClB,AAED,QACE,kBAAmB,AACnB,eAAiB,AACjB,YAAa,AACb,iBAAkB,AAClB,yBAA0B,AAC1B,WAAY,AACZ,oBAAsB,CACvB,AACD,qCACE,MACE,aAAa,AACb,gBAAiB,CAClB,CACF,AAED,QACE,qBAAsB,AAEtB,kBAAoB,CAGrB,AACD,gBALE,gBAAiB,AAEjB,0BAA2B,AACxB,sBAAwB,CAS5B,AAPD,QACE,qBAAsB,AAItB,oBAAqB,AACrB,oBAAsB,CACvB,AAED,IAAI,oBAAqB,YAAa,CAAC,AACvC,QAAQ,aAAc,SAAU,OAAQ,CAAC,AAEzC,gBAKE,sBAAuB,AACnB,6BAA+B,CACpC,AACD,oCAPE,oBAAqB,AACrB,aAAc,AACd,mBAAoB,AAChB,cAAgB,CAWrB,AAPD,oBAKE,sBAAuB,AACnB,kBAAoB,CACzB,AAED,WACE,kBAAmB,AACnB,qBAAsB,CACvB,AACD,iBACE,aAAa,AACb,yBAA0B,AAC1B,gBAAkB,CACnB,AACD,qCACE,MAEE,gBAAiB,CAClB,AACD,cAHE,WAAa,CAKd,CACF,AACD,oCACE,MACE,UAAW,AACX,gBAAiB,CAClB,AACD,QACE,UAAY,CACb,CACF","file":"index.css","sourcesContent":[".newMain{\n  background-color: #fff;\n}\n.main{\n  width: 1200px;\n  margin:20px auto;\n}\n.normal{\n  width: 1200px;\n  margin:0px auto;\n}\n/* 背景色 */\n.back-white{\n  background: #fff;\n}\n.back-black{\n  background: #000;\n}\n/* 灰色按钮-高度32 */\n.btn_32{\n  border-radius: 4px;\n  padding:0px 12px;\n  height: 32px;\n  line-height: 32px;\n  background-color: #f4f4f4;\n  color: #666;\n  display: inline-block;\n}\n@media screen and (max-width: 1200px){\n  .main{\n    width:1000px;\n    margin:10px auto;\n  }\n}\n\n.hide-1{\n  display: inline-block;\n  overflow: hidden;\n  white-space: nowrap;\n  -o-text-overflow: ellipsis;\n     text-overflow: ellipsis;\n}\n.hide-2 {\n  display: inline-block;\n  overflow: hidden;\n  -o-text-overflow: ellipsis;\n     text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n}\n\n.df{display: -ms-flexbox;display: flex}\n.flex-1{-ms-flex: 1 1;flex: 1 1;width: 0}\n\n.f-wrap-between{\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n}\n.f-wrap-alignCenter{\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -ms-flex-align: center;\n      align-items: center;\n}\n\n.normalBox{\n  border-radius: 4px;\n  border:1px solid #ddd;\n}\n.normalBox-title{\n  padding:10px;\n  background-color: #f4f4f4;\n  line-height: 18px;\n}\n@media screen and (max-width: 1000px){\n  .main{\n    width: 750px;\n    margin:1rem auto;\n  }\n  .normal{\n    width: 750px;\n  }\n}\n@media screen and (max-width: 750px){\n  .main{\n    width: 95%;\n    margin:1rem auto;\n  }\n  .normal{\n    width: 100%;\n  }\n}"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 830:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_courses_common_CNotificationHOC__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_tpm_TPMIndexHOC__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__css_index_css__ = __webpack_require__(2450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__css_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__css_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_loadable__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_loadable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_loadable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Loading__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modules_page_layers_ImageLayerOfCommentHOC__ = __webpack_require__(1742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_axios__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var ProjectNew=__WEBPACK_IMPORTED_MODULE_7_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(140).then(__webpack_require__.bind(null, 4719));},loading:__WEBPACK_IMPORTED_MODULE_8__Loading__["a" /* default */]});var ProjectIndex=__WEBPACK_IMPORTED_MODULE_7_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(167).then(__webpack_require__.bind(null, 4722));},loading:__WEBPACK_IMPORTED_MODULE_8__Loading__["a" /* default */]});var ProjectDetail=__WEBPACK_IMPORTED_MODULE_7_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(191).then(__webpack_require__.bind(null, 4726));},loading:__WEBPACK_IMPORTED_MODULE_8__Loading__["a" /* default */]});var Index=function(_Component){_inherits(Index,_Component);function Index(){_classCallCheck(this,Index);return _possibleConstructorReturn(this,(Index.__proto__||Object.getPrototypeOf(Index)).apply(this,arguments));}_createClass(Index,[{key:'render',value:function render(){var _this2=this;return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'newMain clearfix'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["f" /* Switch */],this.props,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/projects/:projectsType/new',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ProjectNew,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/projects/:projectsId',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ProjectDetail,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{exact:true,path:'/projects',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ProjectIndex,Object.assign({},_this2.props,props,_this2.state));}})));}}]);return Index;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_2_react_router__["b" /* withRouter */])(Object(__WEBPACK_IMPORTED_MODULE_9__modules_page_layers_ImageLayerOfCommentHOC__["a" /* ImageLayerOfCommentHOC */])({imgSelector:'.imageLayerParent img, .imageLayerParent .imageTarget',parentSelector:'.newMain'})(Object(__WEBPACK_IMPORTED_MODULE_4__modules_courses_common_CNotificationHOC__["a" /* CNotificationHOC */])()(Object(__WEBPACK_IMPORTED_MODULE_3_educoder__["w" /* SnackbarHOC */])()(Object(__WEBPACK_IMPORTED_MODULE_5__modules_tpm_TPMIndexHOC__["a" /* TPMIndexHOC */])(Index))))));

/***/ })

});