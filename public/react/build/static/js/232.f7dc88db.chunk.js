webpackJsonp([232],{

/***/ 2357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_moopCases_css__ = __webpack_require__(1938);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_moopCases_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__css_moopCases_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__courses_css_Courses_css__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__courses_css_Courses_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__courses_css_Courses_css__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var CaseTags=function(_Component){_inherits(CaseTags,_Component);function CaseTags(props){_classCallCheck(this,CaseTags);return _possibleConstructorReturn(this,(CaseTags.__proto__||Object.getPrototypeOf(CaseTags)).call(this,props));}_createClass(CaseTags,[{key:'render',value:function render(){var tags=this.props.tags;return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Fragment,null,tags&&tags.map(function(item,key){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Fragment,null,item.name=="获奖案例"?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{key:key,className:'edu-filter-btn fl cdefault edu-activity-red ml10'},item.name):item.name=="入库案例"?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{key:key,className:'edu-filter-btn fl cdefault edu-activity-blue ml10'},item.name):item.name=='企业案例'?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{key:key,className:'edu-filter-btn fl cdefault edu-activity-orange-sub ml10'},item.name):__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{key:key,className:'edu-filter-btn fl cdefault edu-activity-36c53c-sub ml10'},item.name));}));}}]);return CaseTags;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (CaseTags);

/***/ }),

/***/ 3293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_moopCases_css__ = __webpack_require__(1938);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_moopCases_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__css_moopCases_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__courses_css_Courses_css__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__courses_css_Courses_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__courses_css_Courses_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CaseTags__ = __webpack_require__(2357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modals_Modals__ = __webpack_require__(180);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}// import AttachmentList from '../../common/components/attachment/AttachmentList'
var CaseDetail=function(_Component){_inherits(CaseDetail,_Component);function CaseDetail(props){_classCallCheck(this,CaseDetail);var _this=_possibleConstructorReturn(this,(CaseDetail.__proto__||Object.getPrototypeOf(CaseDetail)).call(this,props));_this.componentDidMount=function(){var caseID=_this.props.match.params.caseID;_this.props.getDetail(caseID);};_this.delCases=function(){_this.setState({modalsType:true,modalsTopval:"是否确认删除?",modalsBottomval:""});};_this.cancelDelClasses=function(){_this.setState({modalsType:false,modalsTopval:"",modalsBottomval:""});};_this.sureDelClasses=function(){var caseID=_this.props.match.params.caseID;var url='/libraries/'+caseID+'.json';__WEBPACK_IMPORTED_MODULE_5_axios___default.a.delete(url).then(function(result){if(result){_this.props.showNotification("删除成功");_this.props.history.push("/moop_cases");}}).catch(function(error){console.log(error);});};_this.state={modalsType:"",modalsTopval:"",modalsBottomval:"",modalCancel:""};return _this;}// 是否删除
// 取消删除
// 确定删除
_createClass(CaseDetail,[{key:'render',value:function render(){var _this2=this;var _props=this.props,CaseDetail=_props.CaseDetail,praise_count=_props.praise_count,creator=_props.creator,operation=_props.operation,user_praised=_props.user_praised,tags=_props.tags,attachments=_props.attachments;var _state=this.state,modalsType=_state.modalsType,modalsTopval=_state.modalsTopval,modalsBottomval=_state.modalsBottomval;document.title=CaseDetail&&CaseDetail.title!=undefined?CaseDetail&&CaseDetail.title:"教学案例";return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'educontent mt10 mb50'},CaseDetail&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Fragment,null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__modals_Modals__["a" /* default */],{modalsType:modalsType,modalsTopval:modalsTopval,modalsBottomval:modalsBottomval,modalCancel:this.cancelDelClasses,modalSave:this.sureDelClasses}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'mt10 mb20 clearfix lineh-20'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a',{href:'/moop_cases',className:'color-grey-9'},'\u6559\u5B66\u6848\u4F8B'),' > ',__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'color-grey-3'},CaseDetail.title)),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'lineh-25 mb20 clearfix'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'font-22 fl mr10 task-hide lineh-30',style:{maxWidth:"800px"}},CaseDetail.title),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'mt10 fl'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__CaseTags__["a" /* default */],{tags:tags}),CaseDetail.status=="pending"&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{'class':'edu-filter-btn fl cdefault edu-activity-green ml10'},'\u8349\u7A3F'),CaseDetail.status=="processing"&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{'class':'edu-filter-btn fl cdefault edu-activity-green ml10'},'\u5BA1\u6838\u4E2D'),CaseDetail.status=="refused"&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{'class':'edu-filter-btn fl cdefault edu-activity-orange ml10'},'\u672A\u901A\u8FC7')),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a',{href:'/moop_cases',className:'fr color-grey-9 mt5'},'\u8FD4\u56DE')),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'edu-back-white'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'padding30'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'df mb5'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a',{href:'/users/moop'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img',{alt:'82274?1563067098',className:'radius mr15 mt3',height:'50',src:Object(__WEBPACK_IMPORTED_MODULE_3_educoder__["M" /* getImageUrl */])('images/'+(creator&&creator.image_url)),width:'50'})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'flex1'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('li',{className:'clearfix mb5'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'font-16 fl'},creator&&creator.name),operation&&operation.can_deletable?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_educoder__["a" /* ActionBtn */],{style:'greyLine',onClick:this.delCases,className:'fr'},'\u5220\u9664'):"",operation&&operation.can_editable?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_educoder__["a" /* ActionBtn */],{style:'colorBlue',to:'/moop_cases/'+this.props.match.params.caseID+'/edit',className:'fr mr20'},'\u7F16\u8F91'):""),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('li',{className:'clearfix lineh-20'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'fl color-grey-9 mr20'},creator&&creator.school_name),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'fr'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'fl color-grey-9 mr30'},'\u7F16\u7801\uFF1A',__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'color-grey-6'},CaseDetail.uuid)),CaseDetail&&CaseDetail.status=="published"?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'fl color-grey-9'},'\u53D1\u5E03\u65F6\u95F4\uFF1A',__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'color-grey-6'},CaseDetail.published_at)):__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'fl color-grey-9'},'\u4E0A\u4F20\u65F6\u95F4\uFF1A',__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'color-grey-6'},CaseDetail.created_at)))))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'fl color-grey-9'},'\u4F5C\u8005\uFF1A'),CaseDetail.author_name,'/',CaseDetail.author_school_name),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('style',null,'\n                    .setMDStyle .editormd-html-preview{\n                      width:100%!important;\n                    }\n                  '),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{'class':'mt20 setMDStyle'},CaseDetail.content&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_educoder__["s" /* MarkdownToHtml */],{content:CaseDetail.content,id:'casesDetail',selector:'casesDetail',style:{width:"100%!important"}})),attachments&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'mt10'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_educoder__["b" /* AttachmentList */],Object.assign({},this.props,this.state,{attachments:attachments}))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{'class':'mt40'},user_praised?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'pointsBtn pointedBtn'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',null,'\u5DF2\u8D5E'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',null,praise_count)):__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{onClick:function onClick(){return _this2.props.praisePoint(_this2.props.match.params.caseID);},className:'pointsBtn'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i',{'class':'iconfont icon-dianzan'})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',null,praise_count)))))));}}]);return CaseDetail;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (CaseDetail);

/***/ })

});