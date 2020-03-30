webpackJsonp([196],{

/***/ 1525:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return Q_TYPE_SINGLE; });
/* unused harmony export Q_TYPE_MULTI */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Q_TYPE_JUDGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Q_TYPE_NULL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Q_TYPE_MAIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Q_TYPE_SHIXUN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return qNameArray; });
var Q_TYPE_SINGLE=0;// 单选
var Q_TYPE_MULTI=1;// 多选
var Q_TYPE_JUDGE=2;// 判断
var Q_TYPE_NULL=3;// 填空
var Q_TYPE_MAIN=4;// 填空
var Q_TYPE_SHIXUN=5;// 实训
var qNameArray=['单选题','多选题','判断题','填空题','简答题','实训题'];

/***/ }),

/***/ 1722:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_tooltip_style_css__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_tooltip_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_tooltip_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_select_style_css__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_select_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_antd_lib_select_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_select__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_antd_lib_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_modal_style_css__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_modal_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_antd_lib_modal_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_modal__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_antd_lib_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_antd_lib_input_style_css__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_antd_lib_input_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_antd_lib_input_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_antd_lib_input__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_antd_lib_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_antd_lib_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__common__ = __webpack_require__(1525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_educoder__ = __webpack_require__(5);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var TextArea=__WEBPACK_IMPORTED_MODULE_7_antd_lib_input___default.a.TextArea;var confirm=__WEBPACK_IMPORTED_MODULE_5_antd_lib_modal___default.a.confirm;var $=window.$;var Option=__WEBPACK_IMPORTED_MODULE_3_antd_lib_select___default.a.Option;var QestionDisplayHeader=function(_Component){_inherits(QestionDisplayHeader,_Component);function QestionDisplayHeader(props){_classCallCheck(this,QestionDisplayHeader);var _this=_possibleConstructorReturn(this,(QestionDisplayHeader.__proto__||Object.getPrototypeOf(QestionDisplayHeader)).call(this,props));_this.componentDidMount=function(){};_this.state={};return _this;}_createClass(QestionDisplayHeader,[{key:'render',value:function render(){var _this2=this;var _props=this.props,question_title=_props.question_title,question_score=_props.question_score,question_type=_props.question_type,question_choices=_props.question_choices,standard_answer=_props.standard_answer,question_id=_props.question_id,question_number=_props.question_number,index=_props.index,displayCount=_props.displayCount,topRight=_props.topRight,showActionButton=_props.showActionButton,exerciseIsPublish=_props.exerciseIsPublish;var isAdmin=this.props.isAdmin();var courseId=this.props.match.params.coursesId;var isEdit=this.isEdit;var qNumber='question_'+index;var qName=__WEBPACK_IMPORTED_MODULE_10__common__["f" /* qNameArray */][question_type];return __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_react___default.a.Fragment,null,__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{className:'new_li'},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('style',null,'\n            .actionBtns {\n                height: 28px\n            }\n            '),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{className:'font-16 fl'},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('span',{className:'color-blue'},index+1,'\u3001',qName),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('span',{className:'color-grey-9'},'\uFF08',question_score,'\u5206\uFF09')),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{className:'fr actionBtns'},topRight,showActionButton!=false&&__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_react___default.a.Fragment,null,!exerciseIsPublish&&__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('a',{className:'mr30',onClick:function onClick(){return _this2.props.onQestionDelete(question_id);}},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip___default.a,{title:'\u5220\u9664'},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('i',{className:'color-grey-cd font-16 iconfont icon-shanchu'}))),index===0?"":__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('a',{className:'mr30',onClick:function onClick(){return _this2.props.onSortUp(index,question_id);}},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip___default.a,{title:'\u4E0A\u79FB'},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('i',{className:'color-green font-18 iconfont icon-xiangshangyi'}))),index===displayCount-1?"":__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('a',{className:'mr30',onClick:function onClick(){return _this2.props.onSortDown(index,question_id);}},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip___default.a,{title:'\u4E0B\u79FB'},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('i',{className:'color-green font-18 iconfont icon-xiangxiayi'}))),!exerciseIsPublish&&__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('a',{className:'mr30',onClick:function onClick(){return _this2.props.addQuestion(question_id,question_type);}},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip___default.a,{title:'(\u5411\u4E0B\u63D2\u5165'+qName+')'},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('i',{className:'color-green font-18 iconfont icon-roundaddfill'}))),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('a',{onClick:function onClick(){return _this2.props.editQestion(index);}},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip___default.a,{title:'\u7F16\u8F91'},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('i',{className:'color-green font-18 iconfont icon-bianjidaibeijing'})))))),question_title&&__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11_educoder__["s" /* MarkdownToHtml */],{content:question_title,selector:'qtitle_'+(index+1),style:{display:'inline-block',width:'100%',margin:'10px 0px 15px'}})//  <div className="markdown-body" dangerouslySetInnerHTML={{__html: markdownToHTML1(question_title)}} 
// style={{ display: 'inline-block', width:'100%' , margin: '10px 0px 15px' }}></div>
);}}]);return QestionDisplayHeader;}(__WEBPACK_IMPORTED_MODULE_8_react__["Component"]);// RouteHOC()
/* harmony default export */ __webpack_exports__["a"] = (QestionDisplayHeader);

/***/ }),

/***/ 2061:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2118);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(318)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 2118:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(317)(true);
// imports


// module
exports.push([module.i, ".editorWrapDiv{border:1px solid #4cacff;padding:6px 10px}.questionSection{border-bottom:1px solid #eaeaea;padding:8px 0}.questionSection:last-child{border-bottom:none}.judge-item.option-item{display:inline-block;margin-bottom:8px;width:52px}.addAnswerButton{background:#f8f8f8;text-align:center;color:#4cacff;height:40px;line-height:40px;cursor:pointer}.nullChildEditor{width:100%;display:inline-block}.singleDisplay .options .markdown-body{max-width:1116px}.singleDisplay .ant-checkbox-wrapper span:last-child,.singleDisplay .ant-radio-wrapper span:last-child{padding-right:0}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/src/modules/courses/exercise/new/common.css"],"names":[],"mappings":"AAAA,eACI,yBAA0B,AAC1B,gBAAkB,CACrB,AACD,iBACI,gCAAiC,AACjC,aAAiB,CACpB,AACD,4BACI,kBAAoB,CACvB,AAGD,wBACI,qBAAsB,AACtB,kBAAmB,AACnB,UAAY,CACf,AAGD,iBACI,mBAAgC,AAChC,kBAAmB,AACnB,cAAe,AACf,YAAa,AACb,iBAAkB,AAClB,cAAgB,CACnB,AACD,iBACI,WAAY,AACZ,oBAAsB,CACzB,AAED,uCACI,gBAAkB,CACrB,AACD,uGAEI,eAAmB,CACtB","file":"common.css","sourcesContent":[".editorWrapDiv {\r\n    border: 1px solid #4CACFF;\r\n    padding: 6px 10px;\r\n}\r\n.questionSection {\r\n    border-bottom: 1px solid #EAEAEA;\r\n    padding: 8px 0px;\r\n}\r\n.questionSection:last-child {\r\n    border-bottom: none;\r\n}\r\n\r\n/* 判断题编辑器item样式 */\r\n.judge-item.option-item {\r\n    display: inline-block;\r\n    margin-bottom: 8px;\r\n    width: 52px;\r\n}\r\n\r\n/* 填空题新增按钮 */\r\n.addAnswerButton {\r\n    background: rgba(248,248,248,1);\r\n    text-align: center;\r\n    color: #4CACFF;\r\n    height: 40px;\r\n    line-height: 40px;\r\n    cursor: pointer;\r\n}\r\n.nullChildEditor {\r\n    width: 100%;\r\n    display: inline-block;\r\n}\r\n\r\n.singleDisplay .options .markdown-body {\r\n    max-width: 1116px;\r\n}\r\n.singleDisplay .ant-radio-wrapper span:last-child\r\n    , .singleDisplay .ant-checkbox-wrapper span:last-child {\r\n    padding-right: 0px;\r\n}"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 2358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_checkbox_style_css__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_checkbox_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_checkbox_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_checkbox__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_checkbox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_checkbox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_radio_style_css__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_radio_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_antd_lib_radio_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_radio__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_radio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_antd_lib_radio__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_select_style_css__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_select_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_antd_lib_select_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_select__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_antd_lib_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_antd_lib_modal_style_css__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_antd_lib_modal_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_antd_lib_modal_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_antd_lib_modal__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_antd_lib_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_antd_lib_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_antd_lib_input_style_css__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_antd_lib_input_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_antd_lib_input_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_antd_lib_input__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_antd_lib_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_antd_lib_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__QestionDisplayHeader__ = __webpack_require__(1722);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_educoder__ = __webpack_require__(5);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var TextArea=__WEBPACK_IMPORTED_MODULE_9_antd_lib_input___default.a.TextArea;var confirm=__WEBPACK_IMPORTED_MODULE_7_antd_lib_modal___default.a.confirm;var $=window.$;var Option=__WEBPACK_IMPORTED_MODULE_5_antd_lib_select___default.a.Option;var tagArray=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];var qNameArray=['单选题','多选题','判断题','填空题','简答题','实训题'];var SingleDisplay=function(_Component){_inherits(SingleDisplay,_Component);function SingleDisplay(props){_classCallCheck(this,SingleDisplay);var _this=_possibleConstructorReturn(this,(SingleDisplay.__proto__||Object.getPrototypeOf(SingleDisplay)).call(this,props));_this.componentDidMount=function(){var Id=_this.props.match.params.Id;_this.isEdit=!!Id;if(Id){var url='/exercises/'+Id+'/edit.json';//   axios.get(url)
//     .then((response) => {
//       if (response.data.status == 0) {
//       }
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
}};_this.state={question_choices:['','','',''],standard_answers:[false,false,false,false]};return _this;}_createClass(SingleDisplay,[{key:'render',value:function render(){var _props=this.props,question_title=_props.question_title,question_score=_props.question_score,question_type=_props.question_type,question_choices=_props.question_choices,standard_answer=_props.standard_answer,question_id=_props.question_id,question_number=_props.question_number,index=_props.index,displayCount=_props.displayCount,showActionButton=_props.showActionButton;// const { getFieldDecorator } = this.props.form;
var isAdmin=this.props.isAdmin();var courseId=this.props.match.params.coursesId;var isEdit=this.isEdit;var qNumber='question_'+index;// TODO show模式  isNew为false isEdit为false
// [true, false, true] -> [0, 2]
// const answerTagArray = standard_answer.map((item, index) => { return item == true ? tagArray[index] : -1 }).filter(item => item != -1);
var length=5;var qName=qNameArray[question_type];var isPreviewPage=showActionButton==false;return __WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement('div',{className:'bor-bottom-greyE padding20-30 singleDisplay',id:qNumber,_id:question_id},__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement('style',null,'\n              .optionMdEditor {\n                flex: 0 0 800px\n              }\n              .optionRow {\n                margin: 2px;\n              }\n              .actionBtns {\n                  height: 28px\n              }\n            '),__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__QestionDisplayHeader__["a" /* default */],this.props),__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement('div',{className:'options'},question_choices.map(function(item,optionIndex){var prefix=undefined;// if (!isPreviewPage) {
prefix=tagArray[optionIndex]+'.';// }
if(question_type==0){// 单选
return __WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement('div',{className:'mb10 clearfix ',style:{display:"flex",flexDirection:"row"},key:optionIndex},__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_antd_lib_radio___default.a,{disabled:true,className:'fl lineh-25 w50',checked:item.standard_boolean},prefix),__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13_educoder__["s" /* MarkdownToHtml */],{content:item.choice_text,selector:'single_'+(index+1)+''+(optionIndex+1),style:{float:'left',display:'inline-block'}}));}else{return __WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement('div',{className:'mb10 clearfix',style:{display:"flex",flexDirection:"row"},key:optionIndex},__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_checkbox___default.a,{disabled:true,className:'fl lineh-25  w50',checked:item.standard_boolean},prefix),__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13_educoder__["s" /* MarkdownToHtml */],{content:item.choice_text,selector:'single_'+(index+1)+''+(optionIndex+1),style:{float:'left',display:'inline-block'}}));}})));}}]);return SingleDisplay;}(__WEBPACK_IMPORTED_MODULE_10_react__["Component"]);// RouteHOC()
/* harmony default export */ __webpack_exports__["a"] = (SingleDisplay);

/***/ }),

/***/ 2359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_radio_style_css__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_radio_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_radio_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_radio__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_radio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_radio__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_select_style_css__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_select_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_antd_lib_select_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_select__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_antd_lib_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_modal_style_css__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_modal_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_antd_lib_modal_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_modal__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_antd_lib_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_antd_lib_input_style_css__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_antd_lib_input_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_antd_lib_input_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_antd_lib_input__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_antd_lib_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_antd_lib_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__common__ = __webpack_require__(1525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__QestionDisplayHeader__ = __webpack_require__(1722);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var TextArea=__WEBPACK_IMPORTED_MODULE_7_antd_lib_input___default.a.TextArea;var confirm=__WEBPACK_IMPORTED_MODULE_5_antd_lib_modal___default.a.confirm;var $=window.$;var Option=__WEBPACK_IMPORTED_MODULE_3_antd_lib_select___default.a.Option;var tagArray=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];var JudgeDisplay=function(_Component){_inherits(JudgeDisplay,_Component);function JudgeDisplay(props){_classCallCheck(this,JudgeDisplay);var _this=_possibleConstructorReturn(this,(JudgeDisplay.__proto__||Object.getPrototypeOf(JudgeDisplay)).call(this,props));_this.componentDidMount=function(){var Id=_this.props.match.params.Id;_this.isEdit=!!Id;if(Id){var url='/exercises/'+Id+'/edit.json';//   axios.get(url)
//     .then((response) => {
//       if (response.data.status == 0) {
//       }
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
}};_this.state={question_choices:['','','',''],standard_answers:[false,false,false,false]};return _this;}_createClass(JudgeDisplay,[{key:'render',value:function render(){var _props=this.props,question_title=_props.question_title,question_score=_props.question_score,question_type=_props.question_type,question_choices=_props.question_choices,standard_answer=_props.standard_answer,question_id=_props.question_id,question_number=_props.question_number,index=_props.index,displayCount=_props.displayCount;// const { getFieldDecorator } = this.props.form;
var isAdmin=this.props.isAdmin();var courseId=this.props.match.params.coursesId;var isEdit=this.isEdit;var qNumber='question_'+index;// TODO show模式  isNew为false isEdit为false
// [true, false, true] -> [0, 2] 
// const answerTagArray = standard_answer.map((item, index) => { return item == true ? tagArray[index] : -1 }).filter(item => item != -1);
var length=5;var qName=__WEBPACK_IMPORTED_MODULE_10__common__["f" /* qNameArray */][question_type];return __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{className:'bor-bottom-greyE padding20-30',id:qNumber,_id:question_id},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('style',null,'\n              .optionMdEditor {\n                flex: 0 0 800px\n              }\n              .optionRow {\n                margin: 2px;\n              }\n              .actionBtns {\n                  height: 28px\n              }\n              \n            '),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__QestionDisplayHeader__["a" /* default */],this.props),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{className:'options clearfix'},question_choices.map(function(item,optionIndex){// 单选
return __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{key:optionIndex,className:'fl mr30 df'},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_radio___default.a,{disabled:true,className:'lineh-25',checked:item.standard_boolean}),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11_educoder__["s" /* MarkdownToHtml */],{content:item.choice_text,selector:'judge_'+(index+1)+optionIndex,className:''}));})));}}]);return JudgeDisplay;}(__WEBPACK_IMPORTED_MODULE_8_react__["Component"]);// RouteHOC()
/* harmony default export */ __webpack_exports__["a"] = (JudgeDisplay);

/***/ }),

/***/ 2360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_select_style_css__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_select_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_select_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_select__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_modal_style_css__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_modal_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_antd_lib_modal_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_modal__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_antd_lib_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_input_style_css__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_input_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_antd_lib_input_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_input__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_antd_lib_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common__ = __webpack_require__(1525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__QestionDisplayHeader__ = __webpack_require__(1722);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var TextArea=__WEBPACK_IMPORTED_MODULE_5_antd_lib_input___default.a.TextArea;var confirm=__WEBPACK_IMPORTED_MODULE_3_antd_lib_modal___default.a.confirm;var $=window.$;var Option=__WEBPACK_IMPORTED_MODULE_1_antd_lib_select___default.a.Option;var tagArray=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];var NullDisplay=function(_Component){_inherits(NullDisplay,_Component);function NullDisplay(props){_classCallCheck(this,NullDisplay);var _this=_possibleConstructorReturn(this,(NullDisplay.__proto__||Object.getPrototypeOf(NullDisplay)).call(this,props));_this.componentDidMount=function(){var Id=_this.props.match.params.Id;_this.isEdit=!!Id;if(Id){var url='/exercises/'+Id+'/edit.json';//   axios.get(url)
//     .then((response) => {
//       if (response.data.status == 0) {
//       }
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
}};_this.state={question_choices:['','','',''],standard_answers:[false,false,false,false]};return _this;}_createClass(NullDisplay,[{key:'render',value:function render(){var _props=this.props,question_title=_props.question_title,question_score=_props.question_score,question_type=_props.question_type,question_choices=_props.question_choices,standard_answer=_props.standard_answer,question_id=_props.question_id,question_number=_props.question_number,index=_props.index,displayCount=_props.displayCount,multi_count=_props.multi_count;// const { getFieldDecorator } = this.props.form;
var isAdmin=this.props.isAdmin();var courseId=this.props.match.params.coursesId;var isEdit=this.isEdit;var qNumber='question_'+index;/**
    is_ordered: true
    multi_count: 3
    question_id: 10444
    question_number: 6
    question_score: 2
    question_title: "_2323_↵↵_"
    question_type: 3
    standard_answer: [{choice_id: 1, answer_text: ["2", "22"]}]
     */var length=5;var qName=__WEBPACK_IMPORTED_MODULE_8__common__["f" /* qNameArray */][question_type];return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:'bor-bottom-greyE padding20-30',id:qNumber,_id:question_id},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('style',null,'\n                .answers {\n                    flex: 1;\n                    display: inline-block;\n                }\n                .answers .answer {\n                    background: #EDEDED;\n                    color: #C5C5C5;\n                    \n                    display: inline-block;\n                    line-height: 16px;\n                    padding:12px 10px;\n                    margin-bottom:10px;\n                    border-radius:2px;\n                    width: 1024px;\n                    word-break: break-all;\n                }\n                .answerRow { \n                    padding: 1px 0;\n                }\n                .answers .markdown-body > p{\n                    line-height:20px;\n                }\n            '),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__QestionDisplayHeader__["a" /* default */],this.props),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:'options'},standard_answer.map(function(answers,_index){return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:'df answerRow',key:_index},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span',{className:'lineh-40'},'\u7B54\u6848\uFF08\u586B\u7A7A',_index+1,'\uFF09\uFF1A'),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:'answers'},answers.answer_text.map(function(item,itemIndex){return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_educoder__["s" /* MarkdownToHtml */],{className:'answer',key:itemIndex,content:item,selector:'null_'+(index+1)+(_index+1)+(itemIndex+1)});})));})));}}]);return NullDisplay;}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"]);// RouteHOC()
/* harmony default export */ __webpack_exports__["a"] = (NullDisplay);

/***/ }),

/***/ 2361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_select_style_css__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_select_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_select_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_select__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_modal_style_css__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_modal_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_antd_lib_modal_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_modal__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_antd_lib_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_input_style_css__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_input_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_antd_lib_input_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_input__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_antd_lib_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common__ = __webpack_require__(1525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__QestionDisplayHeader__ = __webpack_require__(1722);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var TextArea=__WEBPACK_IMPORTED_MODULE_5_antd_lib_input___default.a.TextArea;var confirm=__WEBPACK_IMPORTED_MODULE_3_antd_lib_modal___default.a.confirm;var $=window.$;var Option=__WEBPACK_IMPORTED_MODULE_1_antd_lib_select___default.a.Option;var tagArray=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];var MainDisplay=function(_Component){_inherits(MainDisplay,_Component);function MainDisplay(props){_classCallCheck(this,MainDisplay);var _this=_possibleConstructorReturn(this,(MainDisplay.__proto__||Object.getPrototypeOf(MainDisplay)).call(this,props));_this.componentDidMount=function(){};_this.state={};return _this;}_createClass(MainDisplay,[{key:'render',value:function render(){var _props=this.props,question_title=_props.question_title,question_score=_props.question_score,question_type=_props.question_type,standard_answer=_props.standard_answer,question_id=_props.question_id,question_number=_props.question_number,index=_props.index,displayCount=_props.displayCount;// const { getFieldDecorator } = this.props.form;
var isAdmin=this.props.isAdmin();var courseId=this.props.match.params.coursesId;var isEdit=this.isEdit;var qNumber='question_'+index;// TODO show模式  isNew为false isEdit为false
// [true, false, true] -> [0, 2] 
// const answerTagArray = standard_answer.map((item, index) => { return item == true ? tagArray[index] : -1 }).filter(item => item != -1);
var length=5;var qName=__WEBPACK_IMPORTED_MODULE_8__common__["f" /* qNameArray */][question_type];return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:'bor-bottom-greyE padding20-30',id:qNumber,_id:question_id},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('style',null,'\n              .optionMdEditor {\n                flex: 0 0 800px\n              }\n              .optionRow {\n                margin: 2px;\n              }\n              .actionBtns {\n                  height: 28px\n              }\n              \n            '),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__QestionDisplayHeader__["a" /* default */],this.props),standard_answer[0]&&__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Fragment,null,__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{style:{color:'#05101A'},className:'font-16 mb5 font-bd'},'\u53C2\u8003\u7B54\u6848\uFF1A'),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_educoder__["s" /* MarkdownToHtml */],{content:standard_answer[0],selector:'answer_'+qNumber,className:''})));}}]);return MainDisplay;}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"]);// RouteHOC()
/* harmony default export */ __webpack_exports__["a"] = (MainDisplay);

/***/ }),

/***/ 2362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_select_style_css__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_select_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_select_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_select__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_modal_style_css__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_modal_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_antd_lib_modal_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_modal__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_antd_lib_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_input_style_css__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_input_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_antd_lib_input_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_input__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_antd_lib_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_router_dom__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__common__ = __webpack_require__(1525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__QestionDisplayHeader__ = __webpack_require__(1722);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var TextArea=__WEBPACK_IMPORTED_MODULE_5_antd_lib_input___default.a.TextArea;var confirm=__WEBPACK_IMPORTED_MODULE_3_antd_lib_modal___default.a.confirm;var $=window.$;var Option=__WEBPACK_IMPORTED_MODULE_1_antd_lib_select___default.a.Option;var tagArray=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];var ShixunDisplay=function(_Component){_inherits(ShixunDisplay,_Component);function ShixunDisplay(props){_classCallCheck(this,ShixunDisplay);var _this=_possibleConstructorReturn(this,(ShixunDisplay.__proto__||Object.getPrototypeOf(ShixunDisplay)).call(this,props));_this.componentDidMount=function(){};_this.state={};return _this;}_createClass(ShixunDisplay,[{key:'render',value:function render(){var _props=this.props,question_title=_props.question_title,question_score=_props.question_score,question_type=_props.question_type,standard_answer=_props.standard_answer,question_id=_props.question_id,question_number=_props.question_number,index=_props.index,displayCount=_props.displayCount,shixun_name=_props.shixun_name,shixun=_props.shixun,shixun_id=_props.shixun_id,shixun_identifier=_props.shixun_identifier;// const { getFieldDecorator } = this.props.form;
var isAdmin=this.props.isAdmin();var courseId=this.props.match.params.coursesId;var isEdit=this.isEdit;var qNumber='question_'+index;// TODO show模式  isNew为false isEdit为false
/**
    {                    #实训题
            "question_id": 7294,
            "question_number": 3,
            "question_title": "独立完成数据库知识",
            "question_type": 5,
            "exercise_id": 763,
            "question_score": 35,
            "shixun_id": 41,
            "shixun_name": "MySQL数据库编程开发实训（基础篇）",
            "shixun": [
                {
                    "challenge_id": 69,
                    "challenge_position": 1,
                    "challenge_name": "数据库连接与数据库实例创建",
                    "challenge_score": 5
                },
                {
                    "challenge_id": 70,
                    "challenge_position": 2,
                    "challenge_name": "数据表的创建",
                    "challenge_score": 5
                },
                {
                    "challenge_id": 71,
                    "challenge_position": 3,
                    "challenge_name": "数据查询操作",
                    "challenge_score": 5
                },
                {
                    "challenge_id": 72,
                    "challenge_position": 4,
                    "challenge_name": "数据库的插入操作",
                    "challenge_score": 5
                },
                {
                    "challenge_id": 73,
                    "challenge_position": 5,
                    "challenge_name": "数据表的删除操作",
                    "challenge_score": 5
                },
                {
                    "challenge_id": 74,
                    "challenge_position": 6,
                    "challenge_name": "数据表的更新操作",
                    "challenge_score": 5
                },
                {
                    "challenge_id": 75,
                    "challenge_position": 7,
                    "challenge_name": "数据库的应用",
                    "challenge_score": 5
                }
            ]
        }
     */var length=5;var qName=__WEBPACK_IMPORTED_MODULE_9__common__["f" /* qNameArray */][question_type];return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:'bor-bottom-greyE padding20-30',id:qNumber,_id:question_id},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('style',null,'\n\n              .mainQuestionDisplay {\n                margin-bottom:15px;\n              }\n              \n            '),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__QestionDisplayHeader__["a" /* default */],Object.assign({},this.props,{question_title:shixun_name,topRight:__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('a',{target:'_blank',href:'/shixuns/'+shixun_identifier+'/challenges',className:'mr30',style:{color:'#4CACFF'}},'\u5B9E\u8BAD\u8BE6\u60C5')})),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:'mainQuestionDisplay color-grey-9 markdown-body',dangerouslySetInnerHTML:{__html:Object(__WEBPACK_IMPORTED_MODULE_10_educoder__["_0" /* markdownToHTML */])(question_title)}}),shixun.map(function(ch,index){return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',null,'\u7B2C'+(index+1)+'\u5173','\u3000',ch.challenge_name,'\u3000',ch.challenge_score,'\u5206');}));}}]);return ShixunDisplay;}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"]);// RouteHOC()
/* harmony default export */ __webpack_exports__["a"] = (ShixunDisplay);

/***/ }),

/***/ 3475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_select_style_css__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_select_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_select_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_select__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_modal_style_css__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_modal_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_antd_lib_modal_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_modal__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_antd_lib_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_input_style_css__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_input_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_antd_lib_input_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_input__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_antd_lib_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__new_SingleDisplay__ = __webpack_require__(2358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__new_JudgeDisplay__ = __webpack_require__(2359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__new_NullDisplay__ = __webpack_require__(2360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__new_MainDisplay__ = __webpack_require__(2361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__new_ShixunDisplay__ = __webpack_require__(2362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__new_common_css__ = __webpack_require__(2061);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__new_common_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__new_common_css__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var TextArea=__WEBPACK_IMPORTED_MODULE_5_antd_lib_input___default.a.TextArea;var confirm=__WEBPACK_IMPORTED_MODULE_3_antd_lib_modal___default.a.confirm;var $=window.$;var Option=__WEBPACK_IMPORTED_MODULE_1_antd_lib_select___default.a.Option;var tagArray=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];var ExerciseDisplay=function(_Component){_inherits(ExerciseDisplay,_Component);function ExerciseDisplay(props){_classCallCheck(this,ExerciseDisplay);var _this=_possibleConstructorReturn(this,(ExerciseDisplay.__proto__||Object.getPrototypeOf(ExerciseDisplay)).call(this,props));_this.componentDidMount=function(){var Id=_this.props.match.params.Id;if(Id){var url='/'+(_this.props.urlPath||'exercises')+'/'+Id+'.json';__WEBPACK_IMPORTED_MODULE_7_axios___default.a.get(url).then(function(response){if(response.data.exercise){response.data.exercise.exercise_description=response.data.exercise.exercise_description||response.data.exercise.description;response.data.exercise.exercise_name=response.data.exercise.exercise_name||response.data.exercise.name;response.data.exercise.exercise_status=response.data.exercise.exercise_status==undefined?1:response.data.exercise.exercise_status;_this.setState(Object.assign({},response.data));_this.props.detailFetchCallback&&_this.props.detailFetchCallback(response);}else{_this.props.detailFetchCallback&&_this.props.detailFetchCallback(response);}}).catch(function(error){console.log(error);});}try{_this.props.triggerRef(_this);}catch(e){}};_this.state={exercise_questions:[],exercise_group_id:[],page:1,limit:10,searchtext:"",order:"end_at"};return _this;}_createClass(ExerciseDisplay,[{key:'_getRequestParams',value:function _getRequestParams(){var _state=this.state,order=_state.order,exercise_group_id=_state.exercise_group_id,searchtext=_state.searchtext,page=_state.page,limit=_state.limit;return{page:page,search:searchtext,order:order,limit:limit,group_id:exercise_group_id};}},{key:'_getRequestParams',value:function _getRequestParams(){var _state2=this.state,order=_state2.order,exercise_group_id=_state2.exercise_group_id,searchtext=_state2.searchtext,page=_state2.page,limit=_state2.limit;return{page:page,search:searchtext,order:order,limit:limit,group_id:exercise_group_id};}},{key:'render',value:function render(){var _this2=this;// let { question_title, question_score, question_type, question_choices, standard_answer,
//     question_id, question_number, index, displayCount,
//     multi_count
//  } = this.props;
var _state3=this.state,exercise_questions=_state3.exercise_questions,exercise=_state3.exercise,exercise_types=_state3.exercise_types;// // const { getFieldDecorator } = this.props.form;
// const isAdmin = this.props.isAdmin()
// const courseId=this.props.match.params.coursesId;
// const isEdit = this.isEdit
// const qNumber = `question_${index}`;
// let length = 5;
// const qName = qNameArray[question_type]
var commonHandler={};return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:'edu-back-white'},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:" padding20-30"},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('style',null,'\n                .center{\n                  text-align: center;\n                }\n                .edu-back-white>.bor-bottom-greyE:last-child {\n                  border-bottom: none !important;\n                }\n                '),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:"font-18 center"},exercise&&exercise.exercise_name),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:"font-14 color-grey-9"},exercise&&exercise.exercise_description)),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:" padding20-30 newContainer"},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('p',{className:'  clearfix'},exercise_types&&exercise_types.q_singles>0&&__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span',{className:'color-grey-9 mr15'},'\u5355\u9009\u9898 ',exercise_types.q_singles,' \u9898,\u5171 ',exercise_types&&exercise_types.q_singles_scores,' \u5206'),exercise_types&&exercise_types.q_doubles>0&&__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span',{className:'color-grey-9 mr15'},'\u591A\u9009\u9898 ',exercise_types.q_doubles,' \u9898,\u5171 ',exercise_types&&exercise_types.q_doubles_scores,' \u5206'),exercise_types&&exercise_types.q_judges>0&&__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span',{className:'color-grey-9 mr15'},'\u5224\u65AD\u9898 ',exercise_types.q_judges,' \u9898,\u5171 ',exercise_types&&exercise_types.q_judges_scores,' \u5206'),exercise_types&&exercise_types.q_nulls>0&&__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span',{className:'color-grey-9 mr15'},'\u586B\u7A7A\u9898 ',exercise_types.q_nulls,' \u9898,\u5171 ',exercise_types&&exercise_types.q_nulls_scores,' \u5206'),exercise_types&&exercise_types.q_mains>0&&__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span',{className:'color-grey-9 mr15'},'\u7B80\u7B54\u9898 ',exercise_types.q_mains,' \u9898,\u5171 ',exercise_types&&exercise_types.q_mains_scores,' \u5206'),exercise_types&&exercise_types.q_shixuns>0&&__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span',{className:'color-grey-9 mr15'},'\u5B9E\u8BAD\u9898 ',exercise_types.q_shixuns,' \u9898,\u5171 ',exercise_types&&exercise_types.q_shixuns_scores,' \u5206'),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span',{className:'color-grey-3 fr'},'\u5171',__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span',{className:'color-orange-tip'},' ',exercise_types&&exercise_types.q_scores,' '),'\u5206'),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span',{className:'color-grey-3 fr'},'\u5408\u8BA1',__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span',{className:'color-blue'},' ',exercise_types&&exercise_types.q_counts,' '),'\u9898\uFF1A'))),exercise_questions.map(function(item,index){if(item.question_type==0||item.question_type==1){return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__new_SingleDisplay__["a" /* default */],Object.assign({},_this2.props,item,{index:index},commonHandler,{displayCount:exercise_questions.length,showActionButton:false,key:index}));}else if(item.question_type==2){return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__new_JudgeDisplay__["a" /* default */],Object.assign({showActionButton:false,key:index},_this2.props,item,{index:index},commonHandler));}else if(item.question_type==3){return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__new_NullDisplay__["a" /* default */],Object.assign({showActionButton:false,key:index},_this2.props,item,{index:index},commonHandler));}else if(item.question_type==4){return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__new_MainDisplay__["a" /* default */],Object.assign({showActionButton:false,key:index},_this2.props,item,{index:index},commonHandler));}else if(item.question_type==5){return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13__new_ShixunDisplay__["a" /* default */],Object.assign({Testpapersettinghomepage:true,showActionButton:false,key:index},_this2.props,item,{index:index},commonHandler));}return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',null);}));}}]);return ExerciseDisplay;}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"]);// RouteHOC()
/* harmony default export */ __webpack_exports__["a"] = (ExerciseDisplay);

/***/ }),

/***/ 5029:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__courses_exercise_ExerciseDisplay__ = __webpack_require__(3475);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var ExerciseBanksDetail=function(_Component){_inherits(ExerciseBanksDetail,_Component);function ExerciseBanksDetail(props){_classCallCheck(this,ExerciseBanksDetail);var _this=_possibleConstructorReturn(this,(ExerciseBanksDetail.__proto__||Object.getPrototypeOf(ExerciseBanksDetail)).call(this,props));_this.componentDidMount=function(){};_this.detailFetchCallback=function(result){var Id=_this.props.match.params.Id;var crumbData={title:result.data.exercise&&result.data.exercise.name,is_public:result.data.exercise&&result.data.exercise.is_public,crumbArray:[{content:'详情'}]};var menuData={tab:'0',//tab选中的index
menuArray:[//tab以及tab路由
{to:'/banks/exercise/'+Id+'/'+_this.props.match.params.type+'?tab=0',content:'内容详情'}],category:'exercise',//
tos:'/banks/exercise/'+Id+'/edit/'+_this.props.match.params.type,id:Id,is_public:result.data.exercise&&result.data.exercise.is_public,type:_this.props.match.params.type,authorize:result&&result.data&&result.data.authorize};_this.props.initPublic(crumbData,menuData,result.data);};_this.state={};return _this;}_createClass(ExerciseBanksDetail,[{key:'render',value:function render(){var pollDetail=this.state.pollDetail;return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__courses_exercise_ExerciseDisplay__["a" /* default */],Object.assign({},this.props,this.state,{urlPath:'exercise_banks',detailFetchCallback:this.detailFetchCallback})));}}]);return ExerciseBanksDetail;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (ExerciseBanksDetail);

/***/ })

});