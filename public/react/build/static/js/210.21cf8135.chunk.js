webpackJsonp([210],{

/***/ 1725:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1937);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(299)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 1936:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__questionbanks_css__ = __webpack_require__(1725);
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

/***/ 1937:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(298)(true);
// imports


// module
exports.push([module.i, ".yslquestionbank1{padding-top:30px!important;padding-right:30px!important;padding-left:30px!important;min-height:500px!important}.yslquesHeigth{width:100%!important}.yslquesmarkdowntext{font-size:16px;color:#707070}.yslquesmat26{margin-top:26px;padding-bottom:33px!important}.ysltextcolor9999{color:#999;font-size:14px}.ysltextcolor66{color:#666;font-size:14px}.ysltextcolor05{color:#05101a;font-size:14px}.ml47text{margin-left:17px;margin-top:33px;padding-bottom:37px}.ysltextcolor99999{color:#999;font-size:16px}.yslahover{color:#999}.mt24{margin-top:24px!important}.pd30{margin-bottom:30px}", "", {"version":3,"sources":["/Users/jasder/work/trustie3.0/forgeplus-react/src/modules/courses/groupjobbank/questionbanks.css"],"names":[],"mappings":"AAAA,kBACI,2BAA6B,AAC7B,6BAA+B,AAC/B,4BAA8B,AAC9B,0BAA6B,CAChC,AACD,eACI,oBAAuB,CAG1B,AACD,qBACI,eAAgB,AAChB,aAAe,CAElB,AACD,cACI,gBAAiB,AACjB,6BAAgC,CACnC,AACD,kBACI,WAAe,AACf,cAAgB,CACnB,AACD,gBACI,WAAe,AACf,cAAgB,CACnB,AACD,gBACI,cAAe,AACf,cAAgB,CACnB,AACD,UACI,iBAAkB,AAClB,gBAAiB,AACjB,mBAAqB,CACxB,AACD,mBACI,WAAe,AACf,cAAgB,CACnB,AACD,WACI,UAAgB,CACnB,AACD,MACI,yBAA6B,CAChC,AACD,MACI,kBAAoB,CACvB","file":"questionbanks.css","sourcesContent":[".yslquestionbank1{\n    padding-top: 30px !important;\n    padding-right: 30px !important;\n    padding-left: 30px !important;\n    min-height: 500px !important;\n}\n.yslquesHeigth{\n    width: 100% !important;\n\n\n}\n.yslquesmarkdowntext{\n    font-size: 16px;\n    color: #707070;\n\n}\n.yslquesmat26{\n    margin-top: 26px;\n    padding-bottom: 33px !important;\n}\n.ysltextcolor9999{\n    color: #999999;\n    font-size: 14px;\n}\n.ysltextcolor66{\n    color: #666666;\n    font-size: 14px;\n}\n.ysltextcolor05{\n    color: #05101A;\n    font-size: 14px;\n}\n.ml47text{\n    margin-left: 17px;\n    margin-top: 33px;\n    padding-bottom: 37px;\n}\n.ysltextcolor99999{\n    color: #999999;\n    font-size: 16px;\n}\n.yslahover  {\n    color: #999999 ;\n}\n.mt24{\n    margin-top: 24px !important ;\n}\n.pd30{\n    margin-bottom: 30px;\n}"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 4884:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__groupjobbank_GroupPackage__ = __webpack_require__(1936);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__completetopicde_css__ = __webpack_require__(4885);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__completetopicde_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__completetopicde_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_components_attachment_AttachmentList__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__courses_coursesPublic_NoneData__ = __webpack_require__(313);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Completetopicdetails=function(_Component){_inherits(Completetopicdetails,_Component);function Completetopicdetails(props){_classCallCheck(this,Completetopicdetails);var _this=_possibleConstructorReturn(this,(Completetopicdetails.__proto__||Object.getPrototypeOf(Completetopicdetails)).call(this,props));_this.getTrainingjobsetting=function(){var homeworkid=_this.props.match.params.homeworkid;};_this.scrollToAnchor=function(anchorName){if(anchorName){// 找到锚点
var anchorElement=document.getElementById(anchorName);// 如果对应id的锚点存在，就跳转到锚点
if(anchorElement){anchorElement.scrollIntoView();}}};_this.state={};return _this;}_createClass(Completetopicdetails,[{key:"componentDidMount",value:function componentDidMount(){console.log("Generaljobdetails");console.log("componentDidMount");// let query = this.props.location.pathname;
// const type = query.split('/');
// this.setState({
// 	shixuntypes:type[3]
// })
// this.props.triggerRef(this);
}// 获取数据地方
//跳转道描点的地方
},{key:"render",value:function render(){var datas=this.props.datas;return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:" clearfix  edu-back-white ",ref:"targetElementTrainingjobsetting",style:{margin:"auto",minWidth:"1200px"}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"bor-bottom-greyE"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"yslquestionbank1"},datas.description===null?"":datas.description==="null"?"":datas.description===""?"":__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_educoder__["s" /* MarkdownToHtml */],{content:datas.description,selector:"work_content",className:"mb10 yslquesHeigth"}),datas.attachment_list===undefined?datas.description===undefined||datas.description===null||datas.description===""?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__courses_coursesPublic_NoneData__["a" /* default */],null):"":datas.attachment_list===null?datas.description===undefined||datas.description===null||datas.description===""?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__courses_coursesPublic_NoneData__["a" /* default */],null):"":datas.attachment_list.length===0?datas.description===undefined||datas.description===null||datas.description===""?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__courses_coursesPublic_NoneData__["a" /* default */],null):"":__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"mb29px"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_components_attachment_AttachmentList__["a" /* default */],Object.assign({},this.state,this.props,{attachments:datas.attachment_list}))))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{style:{width:"100%",padding:"36px"}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"yslboomdivs"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"yslboomdivsy"},"\u8BFE\u9898\u7C7B\u578B\uFF1A"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"yslboomdivsys"},datas&&datas.topic_type===1?"设计":datas&&datas.topic_type===2?"论文":datas&&datas.topic_type===3?"创作":"无")),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"yslboomdivsy"},"\u8BFE\u9898\u6765\u6E90\uFF1A"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"yslboomdivsys"},datas&&datas.topic_source===1?"生产/社会实际":datas&&datas.topic_source===2?"结合科研":datas&&datas.topic_source===3?"其它":"无")),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"yslboomdivsy"},"\u8BFE\u9898\u6027\u8D281\uFF1A"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"yslboomdivsys"},datas&&datas.topic_property_first===1?"真题":datas&&datas.topic_property_first===2?"模拟题":"无")),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"yslboomdivsy"},"\u8BFE\u9898\u6027\u8D282\uFF1A"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"yslboomdivsys"},datas&&datas.topic_property_second===1?"纵向课题":datas&&datas.topic_property_second===2?"横向课题":datas&&datas.topic_property_second===3?"自选":"无"))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"yslboomdivs mt7"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"yslboomdivsy"},"\u8BFE\u9898\u91CD\u590D\u60C5\u51B5\uFF1A "),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"yslboomdivsys"},datas&&datas.topic_repeat===1?"新题":datas&&datas.topic_repeat===2?"往届题，有新要求":datas&&datas.topic_repeat===3?"往届题，无新要求":"无")),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"yslboomdivsy"},"\u8C03\u7814\u6216\u5B9E\u4E60\u5730\u70B9\uFF1A"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"yslboomdivsys"},datas&&datas.province,datas&&datas.city)),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",{style:{width:"564px"}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"yslboomdivsy"},"\u8BFE\u9898\u5355\u4F4D\u6765\u6E90\uFF1A"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"yslboomdivsys"},datas&&datas.source_unit===undefined?"无":datas&&datas.source_unit===null?"无":datas&&datas.source_unit===""?"无":datas&&datas.source_unit==="null"?"无":datas.source_unit)))));}}]);return Completetopicdetails;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (Completetopicdetails);

/***/ }),

/***/ 4885:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4886);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(299)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 4886:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(298)(true);
// imports


// module
exports.push([module.i, ".yslquestionbank1{padding-top:30px!important;padding-right:30px!important;padding-left:30px!important;min-height:500px!important}.yslquesHeigth{width:100%!important}.yslquesmarkdowntext{font-size:16px;color:#707070}.yslquesmat26{margin-top:26px;padding-bottom:33px!important}.ysltextcolor9999{color:#999;font-size:14px}.ysltextcolor66{color:#666;font-size:14px}.ysltextcolor05{color:#05101a;font-size:14px}.ml47text{margin-left:17px;padding-bottom:37px}.ysltextcolor99999{color:#999;font-size:16px}.yslboomdivs{display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start}.yslboomdivs p{width:282px}.yslboomdivs p span{text-align:left}.yslboomdivsy{color:#999;font-size:14px}.yslboomdivsys{color:#666;font-size:14px}.mb29px{padding-top:14px!important;margin-bottom:29px!important}.pd30{margin-bottom:30px}", "", {"version":3,"sources":["/Users/jasder/work/trustie3.0/forgeplus-react/src/modules/courses/comtopicdetails/completetopicde.css"],"names":[],"mappings":"AAAA,kBACI,2BAA6B,AAC7B,6BAA+B,AAC/B,4BAA8B,AAC9B,0BAA6B,CAChC,AACD,eACI,oBAAuB,CAC1B,AACD,qBACI,eAAgB,AAChB,aAAe,CAElB,AACD,cACI,gBAAiB,AACjB,6BAAgC,CACnC,AACD,kBACI,WAAe,AACf,cAAgB,CACnB,AACD,gBACI,WAAe,AACf,cAAgB,CACnB,AACD,gBACI,cAAe,AACf,cAAgB,CACnB,AACD,UACI,iBAAkB,AAClB,mBAAqB,CACxB,AACD,mBACI,WAAe,AACf,cAAgB,CACnB,AACD,aAEI,oBAAqB,AAErB,aAAc,AACd,oBAAoB,AAChB,0BAA2B,CAClC,AACD,eACI,WAAa,CAChB,AACD,oBACC,eAAiB,CACjB,AACD,cACI,WAAe,AACf,cAAgB,CAEnB,AACD,eACI,WAAe,AACf,cAAgB,CACnB,AACD,QACI,2BAA6B,AAC7B,4BAA+B,CAClC,AACD,MACI,kBAAoB,CACvB","file":"completetopicde.css","sourcesContent":[".yslquestionbank1{\n    padding-top: 30px !important;\n    padding-right: 30px !important;\n    padding-left: 30px !important;\n    min-height: 500px !important;\n}\n.yslquesHeigth{\n    width: 100% !important;\n}\n.yslquesmarkdowntext{\n    font-size: 16px;\n    color: #707070;\n\n}\n.yslquesmat26{\n    margin-top: 26px;\n    padding-bottom: 33px !important;\n}\n.ysltextcolor9999{\n    color: #999999;\n    font-size: 14px;\n}\n.ysltextcolor66{\n    color: #666666;\n    font-size: 14px;\n}\n.ysltextcolor05{\n    color: #05101A;\n    font-size: 14px;\n}\n.ml47text{\n    margin-left: 17px;\n    padding-bottom: 37px;\n}\n.ysltextcolor99999{\n    color: #999999;\n    font-size: 16px;\n}\n.yslboomdivs{\n\n    display: -ms-flexbox;\n\n    display: flex;\n    -ms-flex-pack:start;\n        justify-content:flex-start;\n}\n.yslboomdivs p{\n    width: 282px;\n}\n.yslboomdivs p span  {\n text-align: left;\n}\n.yslboomdivsy{\n    color: #999999;\n    font-size: 14px;\n\n}\n.yslboomdivsys{\n    color: #666666;\n    font-size: 14px;\n}\n.mb29px{\n    padding-top: 14px !important;\n    margin-bottom: 29px !important;\n}\n.pd30{\n    margin-bottom: 30px;\n}"],"sourceRoot":""}]);

// exports


/***/ })

});