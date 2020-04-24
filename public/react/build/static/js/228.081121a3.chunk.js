webpackJsonp([228],{

/***/ 4958:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_index_css__ = __webpack_require__(2361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__css_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__setting_css__ = __webpack_require__(4959);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__setting_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__setting_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_loadable__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_loadable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_loadable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Loading__ = __webpack_require__(344);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Branch=__WEBPACK_IMPORTED_MODULE_4_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(282).then(__webpack_require__.bind(null, 4961));},loading:__WEBPACK_IMPORTED_MODULE_5__Loading__["a" /* default */]});var Setting=__WEBPACK_IMPORTED_MODULE_4_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(145).then(__webpack_require__.bind(null, 4962));},loading:__WEBPACK_IMPORTED_MODULE_5__Loading__["a" /* default */]});var Collaborator=__WEBPACK_IMPORTED_MODULE_4_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(173).then(__webpack_require__.bind(null, 4963));},loading:__WEBPACK_IMPORTED_MODULE_5__Loading__["a" /* default */]});var Tags=__WEBPACK_IMPORTED_MODULE_4_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(73).then(__webpack_require__.bind(null, 4964));},loading:__WEBPACK_IMPORTED_MODULE_5__Loading__["a" /* default */]});var Index=function(_Component){_inherits(Index,_Component);function Index(){_classCallCheck(this,Index);return _possibleConstructorReturn(this,(Index.__proto__||Object.getPrototypeOf(Index)).apply(this,arguments));}_createClass(Index,[{key:'render',value:function render(){var _this2=this;var projectsId=this.props.match.params.projectsId;var pathname=this.props.history.location.pathname;var flag=pathname==='/projects/'+projectsId+'/setting';return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('ul',{className:'settingNav'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('li',{className:flag?"active":""},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["b" /* Link */],{to:'/projects/'+projectsId+'/setting'},'\u4ED3\u5E93')),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('li',{className:pathname.indexOf('setting/collaborator')>-1?"active":""},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["b" /* Link */],{to:'/projects/'+projectsId+'/setting/collaborator'},'\u534F\u4F5C\u8005')),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('li',{className:pathname.indexOf('setting/tags')>-1?"active":""},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["b" /* Link */],{to:'/projects/'+projectsId+'/setting/tags'},'\u9879\u76EE\u6807\u7B7E'))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'main'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["f" /* Switch */],this.props,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/projects/:projectsId/setting/collaborator',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Collaborator,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/projects/:projectsId/setting/tags',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Tags,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/projects/:projectsId/setting',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Setting,Object.assign({},_this2.props,props,_this2.state));}}))));}}]);return Index;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ }),

/***/ 4959:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4960);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(317)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 4960:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(316)(true);
// imports


// module
exports.push([module.i, ".settingNav{display:-ms-flexbox;display:flex;border-bottom:1px solid #ddd;-ms-flex-pack:center;justify-content:center}.settingNav li{height:46px;line-height:46px;position:relative;padding:0 15px;cursor:pointer}.settingNav li.active a{color:#4cacff!important}.settingNav li.active:after{position:absolute;width:100%;bottom:0;height:2px;left:0;background:#4cacff;content:\"\"}.baseForm{padding:15px 20px!important}.baseForm .ant-row.ant-form-item{margin-bottom:15px}.submitBtn{float:left;height:35px;line-height:35px}.small_submitBtn,.submitBtn{display:block;padding:0 12px;border-radius:4px;color:#fff!important;background:#4cacff}.small_submitBtn{height:32px;line-height:32px}.addPanel{display:-ms-flexbox;display:flex;padding:15px}.red_btn{display:block;padding:0 8px;height:28px;line-height:28px;color:#fff;background:#db2828;border-radius:3px}.collaboratorItem{display:-ms-flexbox;display:flex;border-top:1px solid #f4f4f4;padding:15px}.collaboratorItem>span{-ms-flex:1 1;flex:1 1;display:-ms-flexbox;display:flex}.branchSelect{width:200px;height:32px}.dangerousBox{border:1px solid #efc16b;border-radius:4px;margin-top:20px}.dangerousTitle{padding:10px;background:#f9edbe;line-height:18px}.red_deleteBtn{display:block;height:38px;line-height:38px;border:1px solid #db2828;border-radius:4px;color:#db2828!important;padding:0 15px;font-size:16px}.flex-a-center{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center}.padding15-10{padding:15px 10px}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/src/forge/Settings/setting.css"],"names":[],"mappings":"AAAA,YACE,oBAAqB,AACrB,aAAc,AACd,6BAA8B,AAC9B,qBAAsB,AAClB,sBAAwB,CAC7B,AACD,eACE,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,eAAiB,AACjB,cAAgB,CACjB,AACD,wBACE,uBAAyB,CAC1B,AACD,4BACE,kBAAmB,AACnB,WAAY,AACZ,SAAY,AACZ,WAAY,AACZ,OAAU,AACV,mBAAoB,AACpB,UAAY,CACb,AACD,UACE,2BAA4B,CAC7B,AACD,iCACE,kBAAoB,CACrB,AACD,WAEE,WAAY,AAGZ,YAAa,AACb,gBAAkB,CAGnB,AACD,4BATE,cAAe,AAEf,eAAiB,AACjB,kBAAmB,AAGnB,qBAAsB,AACtB,kBAAoB,CAUrB,AARD,iBAIE,YAAa,AACb,gBAAkB,CAGnB,AACD,UACE,oBAAqB,AACrB,aAAc,AACd,YAAa,CACd,AACD,SACE,cAAe,AACf,cAAgB,AAChB,YAAa,AACb,iBAAkB,AAClB,WAAY,AACZ,mBAAoB,AACpB,iBAAmB,CACpB,AACD,kBACE,oBAAqB,AACrB,aAAc,AACd,6BAA8B,AAC9B,YAAa,CACd,AACD,uBACE,aAAc,AACV,SAAU,AACd,oBAAqB,AACrB,YAAc,CACf,AACD,cACE,YAAa,AACb,WAAa,CACd,AAED,cACE,yBAAyB,AACzB,kBAAmB,AACnB,eAAiB,CAClB,AACD,gBACE,aAAa,AACb,mBAAoB,AACpB,gBAAkB,CACnB,AACD,eACE,cAAe,AACf,YAAa,AACb,iBAAkB,AAClB,yBAAyB,AACzB,kBAAmB,AACnB,wBAAyB,AACzB,eAAiB,AACjB,cAAgB,CACjB,AACD,eACE,oBAAqB,AACrB,aAAc,AACd,sBAAuB,AACnB,8BAA+B,AACnC,sBAAuB,AACnB,kBAAoB,CACzB,AACD,cACE,iBAAkB,CACnB","file":"setting.css","sourcesContent":[".settingNav{\n  display: -ms-flexbox;\n  display: flex;\n  border-bottom: 1px solid #ddd;\n  -ms-flex-pack: center;\n      justify-content: center;\n}\n.settingNav li{\n  height: 46px;\n  line-height: 46px;\n  position: relative;\n  padding:0px 15px;\n  cursor: pointer;\n}\n.settingNav li.active a{\n  color: #4CACFF!important;\n}\n.settingNav li.active::after{\n  position: absolute;\n  width: 100%;\n  bottom: 0px;\n  height: 2px;\n  left: 0px;\n  background: #4CACFF;\n  content: '';\n}\n.baseForm{\n  padding:15px 20px!important;\n}\n.baseForm .ant-row.ant-form-item{\n  margin-bottom: 15px;\n}\n.submitBtn{\n  display: block;\n  float: left;\n  padding:0px 12px;\n  border-radius: 4px;\n  height: 35px;\n  line-height: 35px;\n  color: #fff!important;\n  background: #4CACFF;\n}\n.small_submitBtn{\n  display: block;\n  padding:0px 12px;\n  border-radius: 4px;\n  height: 32px;\n  line-height: 32px;\n  color: #fff!important;\n  background: #4CACFF;\n}\n.addPanel{\n  display: -ms-flexbox;\n  display: flex;\n  padding:15px;\n}\n.red_btn{\n  display: block;\n  padding:0px 8px;\n  height: 28px;\n  line-height: 28px;\n  color: #fff;\n  background: #db2828;\n  border-radius: 3px;\n}\n.collaboratorItem{\n  display: -ms-flexbox;\n  display: flex;\n  border-top: 1px solid #f4f4f4;\n  padding:15px;\n}\n.collaboratorItem>span{\n  -ms-flex: 1 1;\n      flex: 1 1;\n  display: -ms-flexbox;\n  display: flex;\n}\n.branchSelect{\n  width: 200px;\n  height: 32px;\n}\n\n.dangerousBox{\n  border:1px solid #efc16b;\n  border-radius: 4px;\n  margin-top: 20px;\n}\n.dangerousTitle{\n  padding:10px;\n  background: #f9edbe;\n  line-height: 18px;\n}\n.red_deleteBtn{\n  display: block;\n  height: 38px;\n  line-height: 38px;\n  border:1px solid #db2828;\n  border-radius: 4px;\n  color: #db2828!important;\n  padding:0px 15px;\n  font-size: 16px;\n}\n.flex-a-center{\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n  -ms-flex-align: center;\n      align-items: center;\n}\n.padding15-10{\n  padding:15px 10px;\n}"],"sourceRoot":""}]);

// exports


/***/ })

});