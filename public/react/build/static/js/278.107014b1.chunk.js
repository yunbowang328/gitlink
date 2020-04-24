webpackJsonp([278],{

/***/ 4630:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_input_style_css__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_input_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_input_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_input__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tpm_challengesnew_TPMMDEditor__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router_dom__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_axios__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}// import '../page/tpiPage.css';
__webpack_require__(339);var $=window.$;var PathNew=function(_Component){_inherits(PathNew,_Component);function PathNew(props){_classCallCheck(this,PathNew);var _this=_possibleConstructorReturn(this,(PathNew.__proto__||Object.getPrototypeOf(PathNew)).call(this,props));_this.submitNewPath=function(){var pathName=_this.state.pathName;if(pathName===""){_this.props.showSnackbar("请输入实践课程名称");window.location.href="#part_Name";_this.setState({flag_name:false});return;}var des=_this.contentMdRef.current.getValue().trim();if(des===""){_this.props.showSnackbar("请输入实践课程的简介");window.location.href="#part_Des";return;}if(des.length>8000){_this.props.showSnackbar("实践课程的简介最大限制8000个字符");window.location.href="#part_Des";return;}var point=_this.Point_editMD.current.getValue().trim();if(point===""){_this.props.showSnackbar("请输入实践课程的学习须知");window.location.href="#part_point";return;}if(point.length>2000){_this.props.showSnackbar("实践课程的学习须知最大限制2000个字符");window.location.href="#part_point";return;}if(_this.isEditPage==true){_this.setState({bottonloading:true});var pathId=_this.props.match.params.pathId;var editUrl='/paths/'+pathId+'.json';__WEBPACK_IMPORTED_MODULE_6_axios___default.a.put(editUrl,{name:pathName,description:des,learning_notes:point}).then(function(response){// console.log(response.data.subject_id);
if(response.data.subject_id){_this.props.history.push('/paths/'+response.data.subject_id);}else{_this.setState({bottonloading:false});}}).catch(function(error){console.log(error);_this.setState({bottonloading:false});});}else{_this.setState({bottonloading:true});var url="/paths.json";__WEBPACK_IMPORTED_MODULE_6_axios___default.a.post(url,{name:pathName,description:des,learning_notes:point}).then(function(response){// console.log(response.data.subject_id);
if(response.data.subject_id){_this.props.history.push('/paths/'+response.data.subject_id);}else{_this.setState({bottonloading:false});}}).catch(function(error){console.log(error);_this.setState({bottonloading:false});});}};_this.InputName=function(e){_this.setState({pathName:e.target.value});};_this.contentMdRef=__WEBPACK_IMPORTED_MODULE_2_react___default.a.createRef();_this.Point_editMD=__WEBPACK_IMPORTED_MODULE_2_react___default.a.createRef();_this.state={pathName:"",description:"",point:"",flag_name:true,bottonloading:false};return _this;}// 提交
_createClass(PathNew,[{key:'componentDidMount',value:function componentDidMount(){var _this2=this;var url="/paths/new.json";__WEBPACK_IMPORTED_MODULE_6_axios___default.a.get(url).then(function(result){console.log(result);}).catch(function(error){console.log(error);});var pathId=this.props.match.params.pathId;if(pathId){this.isEditPage=true;// const url = `/paths/${pathId}.json`
var _url='/paths/'+pathId+'/edit.json';__WEBPACK_IMPORTED_MODULE_6_axios___default.a.get(_url).then(function(response){/**
          description:
          id: 13
          learning_notes:
          name: 
         */if(response.data.name){_this2.setState({pathName:response.data.name});_this2.contentMdRef.current.setValue(response.data&&response.data.description);_this2.Point_editMD.current.setValue(response.data&&response.data.learning_notes);}}).catch(function(error){console.log(error);});}else{this.isEditPage=false;this.contentMdRef.current.setValue("");this.Point_editMD.current.setValue("");}}},{key:'render',value:function render(){var pathId=this.props.match.params.pathId;var _state=this.state,pathName=_state.pathName,description=_state.description,point=_state.point,flag_name=_state.flag_name;return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'newContainer'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'newMain clearfix'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'educontent mt10 mb50'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'mb10 edu-back-white'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{className:'padding20 bor-bottom-greyE font-18 color-grey-3'},pathId?'编辑':'创建','\u5B9E\u8DF5\u8BFE\u7A0B'),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'padding30-20',id:'part_Name'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{className:'color-grey-6 font-16 mb15'},'\u5B9E\u8DF5\u8BFE\u7A0B\u540D\u79F0'),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'df'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:'mr30 color-orange pt10'},'*'),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'flex1 mr20'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_input___default.a,{className:flag_name===true?"input-100-45 greyInput":"input-100-45 greyInput bor-red",maxLength:'60',placeholder:'\u4F8B\u5982\uFF1A\u4ECEPython\u7A0B\u5E8F\u8BBE\u8BA1-\u5165\u95E8\u7CBE\u901A',value:pathName,onInput:this.InputName}))))),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'mb10 edu-back-white padding30-20',id:'part_Des'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{className:'color-grey-6 font-16 mb15'},'\u7B80\u4ECB'),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'df'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:'mr30 color-orange pt10'},'*'),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'flex1 mr20'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{id:'shixun_introduction',className:'new_li'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__tpm_challengesnew_TPMMDEditor__["a" /* default */],{ref:this.contentMdRef,placeholder:'\u8BF7\u5728\u6B64\u8F93\u5165\u5B9E\u8DF5\u8BFE\u7A0B\u7684\u7B80\u4ECB\uFF0C\u6700\u5927\u9650\u52368000\u4E2A\u5B57\u7B26',mdID:'courseContentMD',refreshTimeout:1500,className:'courseMessageMD'// initValue={this.state.description === null ? "" : this.state.description}
})),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{id:'e_tip_shixun_introduction',className:'edu-txt-right color-grey-cd font-12'}),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{id:'e_tips_shixun_introduction',className:'edu-txt-right color-grey-cd font-12'})))),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'mb10 edu-back-white padding30-20',id:'part_point'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{className:'color-grey-6 font-16 mb15',id:'learning_notes'},'\u5B66\u4E60\u987B\u77E5'),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'df'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:'mr30 color-orange pt10'},'*'),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'flex1 mr20'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{id:'shixun_propaedeutics',className:'new_li '},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__tpm_challengesnew_TPMMDEditor__["a" /* default */],{ref:this.Point_editMD,placeholder:'\u8BF7\u5728\u6B64\u8F93\u5165\u5B9E\u8DF5\u8BFE\u7A0B\u7684\u5B66\u4E60\u987B\u77E5\uFF0C\u6700\u5927\u9650\u52362000\u4E2A\u5B57\u7B26',mdID:'Point_editMDs',refreshTimeout:1500,className:'courseMessageMD'// initValue={this.state.description === null ? "" : this.state.description}
})),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{id:'e_tip_shixun_propaedeutics',className:'edu-txt-right color-grey-cd font-12'}),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{id:'e_tips_shixun_propaedeutics',className:'edu-txt-right color-grey-cd font-12'})))),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'clearfix mb30 mt30'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('button',{className:'defalutSubmitbtn fl mr20',loading:this.state.bottonloading,onClick:this.submitNewPath},'\u63D0\u4EA4'),this.isEditPage?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_router_dom__["b" /* Link */],{to:'/paths/'+this.props.match.params.pathId,className:'defalutCancelbtn fl'},'\u53D6\u6D88'):__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_router_dom__["b" /* Link */],{to:'/paths',className:'defalutCancelbtn fl'},'\u53D6\u6D88')))));}}]);return PathNew;}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (PathNew);

/***/ })

});