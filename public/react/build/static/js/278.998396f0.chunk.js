webpackJsonp([278],{

/***/ 5009:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var CurriculumSubpage=function(_Component){_inherits(CurriculumSubpage,_Component);//测试用
function CurriculumSubpage(props){_classCallCheck(this,CurriculumSubpage);// console.log(props);
var _this=_possibleConstructorReturn(this,(CurriculumSubpage.__proto__||Object.getPrototypeOf(CurriculumSubpage)).call(this,props));_this.Curriculumstructure=function(){_this.props.history.push("/ecs/major_schools/"+_this.props.match.params.majorId+"/years/"+_this.props.match.params.yearId+"/courses/subpage/ec_course_support_setting/1");};return _this;}_createClass(CurriculumSubpage,[{key:"componentWillMount",value:function componentWillMount(){}},{key:"componentDidMount",value:function componentDidMount(){// 起始页面
// console.log(this.props);
console.log("CurriculumSubpage");console.log(this.props.match.params);}},{key:"render",value:function render(){var _this2=this;// console.log("Curriculumtwo");
// console.log(this.props);
return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"educontent fl"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{onClick:function onClick(){return _this2.Curriculumstructure();}},"\u70B9\u6211\u8FDB\u53BB\u8BFE\u7A0B\u4F53\u7CFB"));}}]);return CurriculumSubpage;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (CurriculumSubpage);

/***/ })

});