webpackJsonp([209],{

/***/ 1835:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2052);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(317)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 2051:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__questionbanks_css__ = __webpack_require__(1835);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__questionbanks_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__questionbanks_css__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var GroupPackage=function(_Component){_inherits(GroupPackage,_Component);function GroupPackage(props){_classCallCheck(this,GroupPackage);var _this=_possibleConstructorReturn(this,(GroupPackage.__proto__||Object.getPrototypeOf(GroupPackage)).call(this,props));_this.DownloadOpenPdf=function(type,url){var newurl=url+Object(__WEBPACK_IMPORTED_MODULE_1_educoder__["O" /* getRandomNumber */])();type===true?window.open(newurl):window.location.href=newurl;};_this.getTrainingjobsetting=function(){var homeworkid=_this.props.match.params.homeworkid;};_this.scrollToAnchor=function(anchorName){if(anchorName){// 找到锚点
var anchorElement=document.getElementById(anchorName);// 如果对应id的锚点存在，就跳转到锚点
if(anchorElement){anchorElement.scrollIntoView();}}};_this.state={};return _this;}_createClass(GroupPackage,[{key:"componentDidMount",value:function componentDidMount(){console.log("Groupjobquesanswer");console.log("componentDidMount");// let query = this.props.location.pathname;
// const type = query.split('/');
// this.setState({
// 	shixuntypes:type[3]
// })
// this.props.triggerRef(this);
}// 获取数据地方
//跳转道描点的地方
},{key:"render",value:function render(){var _this2=this;var attachments=this.props.attachments;return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"color-grey df yslquesmat26",key:this.props.key,style:{lineHeight:'17px'}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a",{className:"color-grey "},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i",{className:"font-14 color-green iconfont icon-fujian mr8","aria-hidden":"true"})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("style",null,"\n\t\t\t\t\t\t\t\ta:hover {\n\t\t\t\t\t\t\t\t\t\t\tcolor: #459be5 !important;\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\ta:link, a:visited {\n    \t\t\t\t\t\t\t\ttext-decoration: none;\n\t\t\t\t\t\t\t\t\t color: #999999 !important;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a",{onClick:function onClick(){return _this2.DownloadOpenPdf(attachments.is_pdf,attachments.url);},title:attachments&&attachments.title,className:"mr12 yslahover overflowHidden1",length:"58",style:{maxWidth:'480px',fontSize:"16px"}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",null,attachments&&attachments.title)),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"color656565  color-grey-6 font-12 mr8"},attachments&&attachments.filesize));}}]);return GroupPackage;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* unused harmony default export */ var _unused_webpack_default_export = (GroupPackage);

/***/ }),

/***/ 2052:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(316)(true);
// imports


// module
exports.push([module.i, ".yslquestionbank1{padding-top:30px!important;padding-right:30px!important;padding-left:30px!important;min-height:500px!important}.yslquesHeigth{width:100%!important}.yslquesmarkdowntext{font-size:16px;color:#707070}.yslquesmat26{margin-top:26px;padding-bottom:33px!important}.ysltextcolor9999{color:#999;font-size:14px}.ysltextcolor66{color:#666;font-size:14px}.ysltextcolor05{color:#05101a;font-size:14px}.ml47text{margin-left:17px;margin-top:33px;padding-bottom:37px}.ysltextcolor99999{color:#999;font-size:16px}.yslahover{color:#999}.mt24{margin-top:24px!important}.pd30{margin-bottom:30px}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/src/modules/courses/groupjobbank/questionbanks.css"],"names":[],"mappings":"AAAA,kBACI,2BAA6B,AAC7B,6BAA+B,AAC/B,4BAA8B,AAC9B,0BAA6B,CAChC,AACD,eACI,oBAAuB,CAG1B,AACD,qBACI,eAAgB,AAChB,aAAe,CAElB,AACD,cACI,gBAAiB,AACjB,6BAAgC,CACnC,AACD,kBACI,WAAe,AACf,cAAgB,CACnB,AACD,gBACI,WAAe,AACf,cAAgB,CACnB,AACD,gBACI,cAAe,AACf,cAAgB,CACnB,AACD,UACI,iBAAkB,AAClB,gBAAiB,AACjB,mBAAqB,CACxB,AACD,mBACI,WAAe,AACf,cAAgB,CACnB,AACD,WACI,UAAgB,CACnB,AACD,MACI,yBAA6B,CAChC,AACD,MACI,kBAAoB,CACvB","file":"questionbanks.css","sourcesContent":[".yslquestionbank1{\n    padding-top: 30px !important;\n    padding-right: 30px !important;\n    padding-left: 30px !important;\n    min-height: 500px !important;\n}\n.yslquesHeigth{\n    width: 100% !important;\n\n\n}\n.yslquesmarkdowntext{\n    font-size: 16px;\n    color: #707070;\n\n}\n.yslquesmat26{\n    margin-top: 26px;\n    padding-bottom: 33px !important;\n}\n.ysltextcolor9999{\n    color: #999999;\n    font-size: 14px;\n}\n.ysltextcolor66{\n    color: #666666;\n    font-size: 14px;\n}\n.ysltextcolor05{\n    color: #05101A;\n    font-size: 14px;\n}\n.ml47text{\n    margin-left: 17px;\n    margin-top: 33px;\n    padding-bottom: 37px;\n}\n.ysltextcolor99999{\n    color: #999999;\n    font-size: 16px;\n}\n.yslahover  {\n    color: #999999 ;\n}\n.mt24{\n    margin-top: 24px !important ;\n}\n.pd30{\n    margin-bottom: 30px;\n}"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 3631:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3632);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(317)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 3632:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(316)(true);
// imports


// module
exports.push([module.i, ".yslquestionbank1{padding-top:30px!important;padding-right:30px!important;padding-left:30px!important;min-height:500px!important}.yslquesHeigth{width:100%!important}.yslquesmarkdowntext{font-size:16px;color:#707070}.yslquesmat26{margin-top:26px;padding-bottom:44px!important}.ysltextcolor9999{color:#999;font-size:14px}.ysltextcolor99999{color:#999;font-size:16px}.mt16px{margin-top:16px}.mt16px,.pd30{padding-bottom:30px}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/src/modules/courses/questionbank/questionbank.css"],"names":[],"mappings":"AAAA,kBACI,2BAA6B,AAC7B,6BAA+B,AAC/B,4BAA8B,AAC9B,0BAA6B,CAChC,AACD,eACI,oBAAuB,CAC1B,AACD,qBACI,eAAgB,AAChB,aAAe,CAElB,AACD,cACI,gBAAiB,AACjB,6BAAgC,CACnC,AACD,kBACG,WAAe,AACd,cAAgB,CACnB,AACD,mBACI,WAAe,AACf,cAAgB,CACnB,AACD,QACI,eAAiB,CAEpB,AACD,cAFI,mBAAqB,CAIxB","file":"questionbank.css","sourcesContent":[".yslquestionbank1{\n    padding-top: 30px !important;\n    padding-right: 30px !important;\n    padding-left: 30px !important;\n    min-height: 500px !important;\n}\n.yslquesHeigth{\n    width: 100% !important;\n}\n.yslquesmarkdowntext{\n    font-size: 16px;\n    color: #707070;\n\n}\n.yslquesmat26{\n    margin-top: 26px;\n    padding-bottom: 44px !important;\n}\n.ysltextcolor9999{\n   color: #999999;\n    font-size: 14px;\n}\n.ysltextcolor99999{\n    color: #999999;\n    font-size: 16px;\n}\n.mt16px{\n    margin-top: 16px;\n    padding-bottom: 30px;\n}\n.pd30{\n    padding-bottom: 30px;\n}"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 5038:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__groupjobbank_GroupPackage__ = __webpack_require__(2051);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__questionbank_css__ = __webpack_require__(3631);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__questionbank_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__questionbank_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_components_attachment_AttachmentList__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__courses_coursesPublic_NoneData__ = __webpack_require__(335);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}//内容详情
var Generaljobdetails=function(_Component){_inherits(Generaljobdetails,_Component);function Generaljobdetails(props){_classCallCheck(this,Generaljobdetails);var _this=_possibleConstructorReturn(this,(Generaljobdetails.__proto__||Object.getPrototypeOf(Generaljobdetails)).call(this,props));_this.getTrainingjobsetting=function(){var homeworkid=_this.props.match.params.homeworkid;};_this.scrollToAnchor=function(anchorName){if(anchorName){// 找到锚点
var anchorElement=document.getElementById(anchorName);// 如果对应id的锚点存在，就跳转到锚点
if(anchorElement){anchorElement.scrollIntoView();}}};_this.state={};return _this;}_createClass(Generaljobdetails,[{key:"componentDidMount",value:function componentDidMount(){console.log("Generaljobdetails");console.log("componentDidMount");// let query = this.props.location.pathname;
// const type = query.split('/');
// this.setState({
// 	shixuntypes:type[3]
// })
// this.props.triggerRef(this);
}// 获取数据地方
//跳转道描点的地方
},{key:"render",value:function render(){var datas=this.props.datas;return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:" clearfix  edu-back-white ",ref:"targetElementTrainingjobsetting",style:{margin:"auto",minWidth:"1200px"}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"yslquestionbank1"},datas.description===null?"":datas.description==="null"?"":datas&&datas.description===""?"":__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_educoder__["s" /* MarkdownToHtml */],{content:datas.description,selector:"work_content",className:"mb10 yslquesHeigth"})// <div id="MakedownHTML "className="markdown-body   yslquesHeigth yslquesmarkdowntext"  dangerouslySetInnerHTML={{__html: markdownToHTML(datas.description).replace(/▁/g, "▁▁▁")}}/>
,datas.attachments===undefined?datas.description===undefined||datas.description===null||datas.description===""?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__courses_coursesPublic_NoneData__["a" /* default */],null):"":datas.attachments===""?datas.description===undefined||datas.description===null||datas.description===""?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__courses_coursesPublic_NoneData__["a" /* default */],null):"":datas.attachments===null?datas.description===undefined||datas.description===null||datas.description===""?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__courses_coursesPublic_NoneData__["a" /* default */],null):"":datas.attachments.length===0?datas.description===undefined||datas.description===null||datas.description===""?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__courses_coursesPublic_NoneData__["a" /* default */],null):"":__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"mt16px"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_components_attachment_AttachmentList__["a" /* default */],Object.assign({},this.state,this.props,{attachments:datas.attachments})))));}}]);return Generaljobdetails;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (Generaljobdetails);

/***/ })

});