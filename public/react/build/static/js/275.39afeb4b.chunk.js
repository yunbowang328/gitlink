webpackJsonp([275],{

/***/ 4740:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_badge_style_css__ = __webpack_require__(1905);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_badge_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_badge_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_badge__ = __webpack_require__(1906);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_badge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_badge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_input_style_css__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_input_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_antd_lib_input_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_input__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_antd_lib_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_button_style_css__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_button_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_antd_lib_button_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_button__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_antd_lib_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_antd_lib_message_style_css__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_antd_lib_message_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_antd_lib_message_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_antd_lib_message__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_antd_lib_message___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_antd_lib_message__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_antd_lib_radio_style_css__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_antd_lib_radio_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_antd_lib_radio_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_antd_lib_radio__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_antd_lib_radio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_antd_lib_radio__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_antd_lib_select_style_css__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_antd_lib_select_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_antd_lib_select_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_antd_lib_select__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_antd_lib_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_antd_lib_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_react_router_dom__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__tpm_challengesnew_TPMMDEditor__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__modals_Bottomsubmit__ = __webpack_require__(1766);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__css_TPMchallengesnew_css__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__css_TPMchallengesnew_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__css_TPMchallengesnew_css__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var $=window.$;var Option=__WEBPACK_IMPORTED_MODULE_11_antd_lib_select___default.a.Option;var RadioGroup=__WEBPACK_IMPORTED_MODULE_9_antd_lib_radio___default.a.Group;function isNulltpm(str){if(str=="")return true;var regu="^[ ]+$";var re=new RegExp(regu);return re.test(str);}var TPMchallengesnew=function(_Component){_inherits(TPMchallengesnew,_Component);function TPMchallengesnew(props){_classCallCheck(this,TPMchallengesnew);var _this=_possibleConstructorReturn(this,(TPMchallengesnew.__proto__||Object.getPrototypeOf(TPMchallengesnew)).call(this,props));_this.getdatas=function(){var id=_this.props.match.params.shixunId;var checkpointId=_this.props.match.params.checkpointId;var newchoice_url="/shixuns/"+id+"/challenges/newquestion";var newpractice_url="/shixuns/"+id+"/challenges/new";var newgo_back_url="/shixuns/"+id+"/challenges";if(checkpointId===undefined){//新建模式
var url="/shixuns/"+id+"/challenges/new.json";__WEBPACK_IMPORTED_MODULE_16_axios___default.a.get(url).then(function(response){_this.setState({choice_url:newchoice_url,practice_url:newpractice_url,go_back_url:newgo_back_url,position:response.data.position,task_pass_default:response.data.task_pass_default,submit_url:response.data.submit_url,checkpointId:checkpointId,exercisememoMDRefval:response.data.task_pass_default,responsedata:response.data});_this.exercisememoMDRef.current.setValue(response.data.task_pass_default||'');}).catch(function(error){console.log(error);});}else{//编辑模式
var _url="/shixuns/"+id+"/challenges/"+checkpointId+".json?tab=0";__WEBPACK_IMPORTED_MODULE_16_axios___default.a.get(_url).then(function(response){var optionsum=void 0;if(response.data.difficulty===1){optionsum=[100,200];}else if(response.data.difficulty===2){optionsum=[300,400,500,600];}else if(response.data.difficulty===3){optionsum=[700,800,900,1000];}var newprev_challenge=response.data.prev_challenge;var next_challenge=response.data.next_challenge;if(newprev_challenge!=undefined){if(newprev_challenge.st===0){newprev_challenge="/shixuns/"+id+"/challenges/"+newprev_challenge.id+"/editcheckpoint";}else{newprev_challenge="/shixuns/"+id+"/challenges/"+newprev_challenge.id+"/editquestion";}}if(next_challenge!=undefined){if(next_challenge.st===0){next_challenge="/shixuns/"+id+"/challenges/"+next_challenge.id+"/editcheckpoint";}else{next_challenge="/shixuns/"+id+"/challenges/"+next_challenge.id+"/editquestion";}}_this.setState({power:response.data.power,prev_challenge:newprev_challenge,next_challenge:next_challenge,choice_url:newchoice_url,practice_url:newpractice_url,go_back_url:newgo_back_url,shixunCreatePractice:response.data.subject,position:response.data.position,shixunCreatePracticeGroup:response.data.difficulty,optionsums:optionsum,onshixunsmarkvalue:response.data.score,shixunsskillvaluelist:response.data.tags,checkpointId:checkpointId,tab2url:"/shixuns/"+id+"/challenges/"+checkpointId+"/tab=2",tab3url:"/shixuns/"+id+"/challenges/"+checkpointId+"/tab=3",exercisememoMDRefval:response.data.task_pass,responsedata:response.data});// exec_time:response.data.exec_time,
if(response.data.power===false){_this.props.showNotification("你没有权限修改");}_this.exercisememoMDRef.current.setValue(response.data.task_pass||'');}).catch(function(error){console.log(error);});}};_this.componentDidUpdate=function(prevProps,prevState){if(prevProps!=_this.props){_this.getdatas();}};_this.onshixunCreatePracticeChange=function(e){if(e.target.value===undefined||e.target.value===""||e.target.value===null){}else{_this.setState({shixunCreatePracticeGrouptype:false,onshixunsmarkvaluetype:false});}var optionsum=void 0;var onshixunsmark=void 0;if(e.target.value===1){optionsum=[100,200];onshixunsmark=100;}else if(e.target.value===2){optionsum=[300,400,500,600];onshixunsmark=300;}else if(e.target.value===3){optionsum=[700,800,900,1000];onshixunsmark=700;}_this.setState({shixunCreatePracticeGroup:e.target.value,optionsums:optionsum,onshixunsmarkvalue:onshixunsmark});};_this.shixunCreatePractice=function(e){if(e.target.value===undefined||e.target.value==""){}else{_this.setState({shixunCreatePracticetype:false});}_this.setState({shixunCreatePractice:e.target.value});};_this.CreatePracticesend=function(){var exercise_editormdvalue=_this.exercisememoMDRef.current.getValue().trim();_this.setState({CreatePracticesendtype:true});if(_this.props.status===2){_this.props.showNotification("该实训已经发布不能新建");_this.setState({CreatePracticesendtype:false});return;}var _this$state=_this.state,shixunCreatePractice=_this$state.shixunCreatePractice,shixunCreatePracticeGroup=_this$state.shixunCreatePracticeGroup,onshixunsmarkvalue=_this$state.onshixunsmarkvalue,shixunsskillvaluelist=_this$state.shixunsskillvaluelist,exec_time=_this$state.exec_time;if(shixunCreatePractice===undefined||shixunCreatePractice==""){_this.setState({shixunCreatePracticetype:true,CreatePracticesendtype:false});$('html').animate({scrollTop:10},1000);return;}if(shixunCreatePractice.match(/^[ ]*$/)){_this.props.showNotification("任务名称为空，请勿输入空格");_this.setState({shixunCreatePracticetype:true,CreatePracticesendtype:false});$('html').animate({scrollTop:10},1000);return;}if(exercise_editormdvalue===undefined||exercise_editormdvalue==""||exercise_editormdvalue===null){_this.setState({tpmcourseMessageMDType:true,CreatePracticesendtype:false});_this.props.scrollToAnchor("tpmcourseMessageMD");return;}if(isNulltpm(exercise_editormdvalue)){_this.setState({tpmcourseMessageMDType:true,CreatePracticesendtype:false});_this.props.scrollToAnchor("tpmcourseMessageMD");return;}if(shixunCreatePracticeGroup===undefined){_this.setState({shixunCreatePracticeGrouptype:true,CreatePracticesendtype:false});_this.props.scrollToAnchor("shixunCreatePracticeGroupid");return;}if(onshixunsmarkvalue===undefined){_this.setState({onshixunsmarkvaluetype:true,CreatePracticesendtype:false});_this.props.scrollToAnchor("input_task_tag");return;}if(shixunsskillvaluelist.length===0){_this.setState({shixunsskillvaluelisttype:true,CreatePracticesendtype:false});// this.props.showNotification("技能标签为空")
_this.props.scrollToAnchor("input_task_tag");return;}// if(exec_time===null||exec_time===undefined||exec_time === ""){
// 	this.setState({
// 	  	shixunExec_timeType:true,
//       CreatePracticesendtype:false
// 	})
//   this.props.scrollToAnchor("exec_time");
// 	return
// }
// if (exec_time.match(/^[ ]*$/)) {
//     this.props.showNotification("评测时限，请勿输入空格");
//     this.setState({
//         shixunExec_timeType:true,
//         CreatePracticesendtype:false
//     })
//     this.props.scrollToAnchor("exec_time");
//     return
// }
var id=_this.props.match.params.shixunId;var url="/shixuns/"+id+"/challenges.json";// exec_time:exec_time
__WEBPACK_IMPORTED_MODULE_16_axios___default.a.post(url,{identifier:id,subject:shixunCreatePractice,task_pass:exercise_editormdvalue,difficulty:shixunCreatePracticeGroup,score:onshixunsmarkvalue,challenge_tag:shixunsskillvaluelist,st:0}).then(function(response){if(response.data.status===1){// $("html").animate({ scrollTop: 0 })
//window.location.href=`/shixuns/${id}/challenges/${response.data.challenge_id}/editcheckpoint?tab=2`;
// 	window.location.href=`/shixuns/${id}/challenges/${response.data.challenge_id}/tab=2`;
_this.props.history.replace('/shixuns/'+id+'/challenges/'+response.data.challenge_id+'/tab=2');// this.setState({
// 		setopen: true,
// 		CreatePracticesendtype:false,
// 		tab2url: "/shixuns/" + id + "/challenges/"+response.data.challenge_id+"/tab=2",
// 		tab3url: "/shixuns/" + id + "/challenges/"+response.data.challenge_id+"/tab=3",
// })
}// this.props.showNotification(response.data.messages);
}).catch(function(error){console.log(error);});};_this.onshixunsmark=function(value){_this.setState({onshixunsmarkvalue:value});};_this.shixunsskill=function(e){_this.setState({shixunsskillvalue:e.target.value});};_this.clickshixunsskill=function(){var _this$state2=_this.state,shixunsskillvalue=_this$state2.shixunsskillvalue,shixunsskillvaluelist=_this$state2.shixunsskillvaluelist;if(shixunsskillvalue===""){return;}else if(shixunsskillvalue===undefined){return;}if(shixunsskillvalue==""||shixunsskillvalue==undefined||shixunsskillvalue==null||shixunsskillvalue.length>0&&shixunsskillvalue.trim().length==0){__WEBPACK_IMPORTED_MODULE_7_antd_lib_message___default.a.error("输入为空，不能保存！");return;}var list=shixunsskillvaluelist;list.push(shixunsskillvalue);if(list.length>0){_this.setState({shixunsskillvaluelisttype:false});}_this.setState({shixunsskillvaluelist:list,shixunsskillvalue:""});};_this.delshixunsskilllist=function(key){var shixunsskillvaluelist=_this.state.shixunsskillvaluelist;var newshixunsskillvaluelist=shixunsskillvaluelist;newshixunsskillvaluelist.splice(key,1);_this.setState({shixunsskillvaluelist:newshixunsskillvaluelist});};_this.editPracticesend=function(){_this.setState({editPracticesendtype:true});var _this$state3=_this.state,shixunCreatePractice=_this$state3.shixunCreatePractice,shixunCreatePracticeGroup=_this$state3.shixunCreatePracticeGroup,onshixunsmarkvalue=_this$state3.onshixunsmarkvalue,shixunsskillvaluelist=_this$state3.shixunsskillvaluelist,checkpointId=_this$state3.checkpointId,exec_time=_this$state3.exec_time;var id=_this.props.match.params.shixunId;var url="/shixuns/"+id+"/challenges/"+checkpointId+".json";var exercise_editormdvalue=_this.exercisememoMDRef.current.getValue().trim();if(shixunCreatePractice===undefined||shixunCreatePractice==""){_this.setState({shixunCreatePracticetype:true,editPracticesendtype:false});// this.props.showNotification("任务名称为空")
$('html').animate({scrollTop:10},1000);return;}if(shixunCreatePractice.match(/^[ ]*$/)){_this.props.showNotification("任务名称为空，请勿输入空格");_this.setState({shixunCreatePracticetype:true,editPracticesendtype:false});$('html').animate({scrollTop:10},1000);return;}if(exercise_editormdvalue===undefined||exercise_editormdvalue==""||exercise_editormdvalue===null){_this.setState({tpmcourseMessageMDType:true,editPracticesendtype:false});_this.props.scrollToAnchor("tpmcourseMessageMD");return;}if(isNulltpm(exercise_editormdvalue)){_this.setState({tpmcourseMessageMDType:true,editPracticesendtype:false});_this.props.scrollToAnchor("tpmcourseMessageMD");_this.props.showNotification("过关任务，请勿输入空格");return;}if(shixunCreatePracticeGroup===undefined){_this.setState({shixunCreatePracticeGrouptype:true,editPracticesendtype:false});_this.props.scrollToAnchor("shixunCreatePracticeGroupid");return;}if(onshixunsmarkvalue===undefined){_this.setState({onshixunsmarkvaluetype:true,editPracticesendtype:false});_this.props.scrollToAnchor("input_task_tag");return;}if(shixunsskillvaluelist.length===0){_this.setState({shixunsskillvaluelisttype:true,editPracticesendtype:false});_this.props.scrollToAnchor("input_task_tag");return;}// if(exec_time===null||exec_time===undefined||exec_time === ""){
// 	this.setState({
// 		shixunExec_timeType:true,
//     editPracticesendtype:false
// 	})
//   this.props.scrollToAnchor("exec_time");
// 	return
// }
// if (exec_time.match(/^[ ]*$/)) {
//     this.props.showNotification("评测时限，请勿输入空格");
//     this.setState({
//         shixunExec_timeType:true,
//         editPracticesendtype:false
//     })
//     this.props.scrollToAnchor("exec_time");
//     return
// }
//					  exec_time:exec_time
__WEBPACK_IMPORTED_MODULE_16_axios___default.a.put(url,{tab:0,identifier:id,id:checkpointId,challenge:{subject:shixunCreatePractice,task_pass:exercise_editormdvalue,difficulty:shixunCreatePracticeGroup,score:onshixunsmarkvalue},challenge_tag:shixunsskillvaluelist}).then(function(response){_this.props.showNotification(response.data.messages);if(response.data.status===1){// window.location.href=`/shixuns/${id}/challenges/${checkpointId}/tab=2`;
_this.setState({setopen:true,editPracticesendtype:false,tab2url:"/shixuns/"+id+"/challenges/"+checkpointId+"/tab=2",tab3url:"/shixuns/"+id+"/challenges/"+checkpointId+"/tab=3"});_this.props.history.replace('/shixuns/'+id+'/challenges/'+checkpointId+'/tab=2');// window.location.href = "/shixuns/" + id + "/challenges/"+response.data.challenge_id+"/tab=2"
}}).catch(function(error){console.log(error);});};_this.onshixunsmarks=function(){_this.setState({marktype:true});};_this.onshixunsmarkss=function(){_this.setState({marktype:false});};_this.setexec_time=function(e){_this.setState({exec_time:e.target.value});};_this.gotocheckpoint=function(url){_this.props.history.replace(url);};_this.exercisememoMDRef=__WEBPACK_IMPORTED_MODULE_12_react___default.a.createRef();_this.state={choice_url:undefined,practice_url:undefined,go_back_url:undefined,task_pass_default:undefined,submit_url:undefined,shixunCreatePracticeGroup:undefined,optionsums:[100,200],activetype:0,setopen:false,shixunCreatePractice:undefined,onshixunsmarkvalue:undefined,shixunsskillvalue:undefined,shixunsskillvaluelist:[],tab2url:"",tab3url:"",prev_challenge:undefined,next_challenge:undefined,power:false,shixunCreatePracticetype:false,shixunsskillvaluelisttype:false,marktype:false,editPracticesendtype:false,CreatePracticesendtype:false,exec_time:20,shixunExec_timeType:false,onshixunsmarkvaluetype:false,shixunCreatePracticeGrouptype:false};return _this;}_createClass(TPMchallengesnew,[{key:'componentDidMount',value:function componentDidMount(){this.getdatas();}},{key:'render',value:function render(){var _this2=this;var shixuntype=this.props.match.params.type;var _state=this.state,responsedata=_state.responsedata,shixunCreatePracticetype=_state.shixunCreatePracticetype,shixunsskillvaluelisttype=_state.shixunsskillvaluelisttype,choice_url=_state.choice_url,practice_url=_state.practice_url,go_back_url=_state.go_back_url,position=_state.position,task_pass_default=_state.task_pass_default,submit_url=_state.submit_url,setopen=_state.setopen,checkpointId=_state.checkpointId,prev_challenge=_state.prev_challenge,next_challenge=_state.next_challenge,power=_state.power,shixunCreatePractice=_state.shixunCreatePractice,shixunCreatePracticeGroup=_state.shixunCreatePracticeGroup,onshixunsmarkvalue=_state.onshixunsmarkvalue,shixunsskillvalue=_state.shixunsskillvalue,shixunsskillvaluelist=_state.shixunsskillvaluelist,tab2url=_state.tab2url,tab3url=_state.tab3url,optionsums=_state.optionsums,CreatePracticesendtype=_state.CreatePracticesendtype,editPracticesendtype=_state.editPracticesendtype;var options=void 0;if(optionsums!=undefined){options=optionsums.map(function(d,k){return __WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(Option,{key:d,id:k},d);});}// console.log(this.props)
// console.log(this.state)
//a console.log(shixunCreatePractice)
return __WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react___default.a.Fragment,null,__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('div',{className:'educontent mt30 mb30'},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('div',{className:'TPMchallengesnewtitles edu-back-white clearfix borderbottomf4'},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('span',{className:'font-16 task-hide fl TPMtaskName'},'\u7B2C',position,'\u5173\uFF1A',responsedata&&responsedata.st===0?"实践题":responsedata&&responsedata.st===1?"选择题":""),this.props.identity>4||this.props.identity===undefined||this.props.status===2||this.props.status===1?"":__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('a',{href:practice_url===undefined?"":practice_url,className:'fr ml15 mt13'},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd_lib_button___default.a,{type:'primary',className:'edu-default-btn edu-greenback-btn  '},'\u65B0\u589E\u5B9E\u8DF5\u4EFB\u52A1')),this.props.identity>4||this.props.identity===undefined||this.props.status===2||this.props.status===1?"":__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13_react_router_dom__["b" /* Link */],{to:choice_url===undefined?"":choice_url,className:'fr ml15 mt13'},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd_lib_button___default.a,{type:'primary',className:'edu-default-btn edu-greenback-btn  mr5'},'\u65B0\u589E\u9009\u62E9\u9898\u4EFB\u52A1')),next_challenge===undefined?"":__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd_lib_button___default.a,{type:'primary',ghost:true,onClick:function onClick(){return _this2.gotocheckpoint(next_challenge);},className:'edu-default-btn edu-greenback-btn  mr5 fr ml15 mt13'},'\u4E0B\u4E00\u5173'),prev_challenge===undefined?"":__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd_lib_button___default.a,{type:'primary',ghost:true,onClick:function onClick(){return _this2.gotocheckpoint(prev_challenge);},className:'edu-default-btn edu-greenback-btn  mr5 fr ml15 mt13'},'\u4E0A\u4E00\u5173')),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('div',{className:'challenge_nav clearfix edu-back-white'},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('li',{className:'active'},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('a',{className:"color-blue"},'1\u3001\u672C\u5173\u4EFB\u52A1 ')),tab2url===""?"":__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('li',null,' > '),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('li',{className:''},tab2url===""?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('span',null):__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13_react_router_dom__["b" /* Link */],{to:tab2url},'2\u3001\u8BC4\u6D4B\u8BBE\u7F6E')),tab3url===""?"":__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('li',null,' > '),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('li',{className:''},tab3url===""?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('span',null):__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13_react_router_dom__["b" /* Link */],{to:tab3url},'  3\u3001\u53C2\u8003\u7B54\u6848'))),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('div',{className:'edu-back-white clearfix'},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('div',{className:'newpadding1020'},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('p',{className:'color-grey-6 font-16 mb10'},'  ',__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('span',{className:'mr5 color-red'},'*'),'\u540D\u79F0'),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('div',null,__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('div',{className:'flex1'},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_antd_lib_input___default.a,{placeholder:'\u8BF7\u8F93\u5165\u4EFB\u52A1\u540D\u79F0\uFF0C\u6700\u5927\u9650\u523660\u4E2A\u5B57\u7B26\uFF1B\u6B64\u4FE1\u606F\u5C06\u5728\u5B9E\u8BAD\u53D1\u5E03\u540E\u5C55\u793A\u7ED9\u5B66\u5458\uFF0C\u4F8B\uFF1A\u8BA1\u7B97\u5B66\u751F\u7684\u8BFE\u7A0B\u6210\u7EE9\u7EE9\u70B9',maxLength:'60',className:shixunCreatePracticetype===true?"bor-red":"newViewAfter",onInput:this.shixunCreatePractice,value:shixunCreatePractice,addonAfter:String(!shixunCreatePractice?0:shixunCreatePractice.length)+'/'+60})),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('div',null,__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('span',{className:shixunCreatePracticetype===true?"color-red mt8 fl  block":"color-red mt8 fl none",id:'new_shixun_name'},'\u5FC5\u586B\u9879\uFF1A\u4E0D\u80FD\u4E3A\u7A7A'))))),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('div',{className:'edu-back-white newpadding02020'},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('p',{className:'color-grey-6 font-16 mb10',id:"tpmcourseMessageMD"},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('span',{className:'mr5 color-red'},'*'),'\u8FC7\u5173\u4EFB\u52A1'),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('style',null,'\n                           .markdown-body img {\n                                    max-width: 80%; \n                                    margin: 0 auto;\n                                    display: block;\n                                    width: auto;  \n                                    height: auto;  \n                                    max-height: 80%;\n                                }\n                                '),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14__tpm_challengesnew_TPMMDEditor__["a" /* default */],{ref:this.exercisememoMDRef,placeholder:'\u8BF7\u8F93\u5165\u9009\u62E9\u9898\u7684\u9898\u5E72\u5185\u5BB9',mdID:'exercisememoMD',refreshTimeout:1500,watch:true,className:'courseMessageMD',initValue:this.state.exercisememoMDRefval,height:800}),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('p',{id:'e_tip_Memochallengesnew',className:'edu-txt-right color-grey-cd font-12'}),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('p',{id:'e_tips_Memochallengesnew',className:'edu-txt-right color-grey-cd font-12'}),this.state.tpmcourseMessageMDType===true?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('div',{className:'color-red mt7 ml5 font-14'},'\u5FC5\u586B\u9879\uFF1A\u4E0D\u80FD\u4E3A\u7A7A'):""),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('div',{className:'edu-back-white newpadding02020'},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('p',{className:'color-grey-6 font-16 mb20'},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('span',{className:'fl color-red mr5'},'*'),'\u96BE\u5EA6\u7CFB\u6570\uFF1A',__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(RadioGroup,{value:shixunCreatePracticeGroup,className:"ml10",id:"shixunCreatePracticeGroupid",disabled:this.props.status===2?true:false,onChange:this.props.status===2?"":this.onshixunCreatePracticeChange},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_antd_lib_radio___default.a,{value:1},'\u7B80\u5355'),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_antd_lib_radio___default.a,{value:2},'\u4E2D\u7B49'),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_antd_lib_radio___default.a,{value:3},'\u56F0\u96BE')),this.state.shixunCreatePracticeGrouptype===true?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('div',{className:'color-red mt7 ml5 font-14',id:'ex_value_notice'},'\u5FC5\u9009\u9879\uFF1A\u4E0D\u80FD\u4E3A\u7A7A'):""),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('p',{className:'color-grey-6 font-16 mb10'},' ',__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('span',{className:'fl mr5 color-red'},'*'),' \u5956\u52B1\u7ECF\u9A8C\u503C\uFF1A',__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('span',{className:"color-grey-8 font-14"},' (\u5982\u679C\u5B66\u5458\u7B54\u9898\u6B63\u786E\uFF0C\u5C06\u83B7\u5F97\u76F8\u5E94\u7684\u7ECF\u9A8C\u503C\uFF1B\u5982\u679C\u5B66\u5458\u6210\u529F\u5F97\u5230\u7ECF\u9A8C\u503C\uFF0C\u90A3\u4E48\u5C06\u540C\u65F6\u83B7\u5F97\u7B49\u503C\u7684\u91D1\u5E01\u5956\u52B1\uFF0C\u5982\uFF1A+100\u7ECF\u9A8C\u503C\u3001+100\u91D1\u5E01)')),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('div',{className:'clearfix'},this.state.onshixunsmarkvaluetype===true?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('style',null,'\n                                   .ant-select-selection{\n                                        border:1px solid red;\n                                   }\n                                    '):"",__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11_antd_lib_select___default.a,{style:{width:252},className:"winput-240-40 ml3",id:'challenge_score',onChange:this.props.status===2?"":this.onshixunsmark,disabled:this.props.status===2?true:false,value:onshixunsmarkvalue,getPopupContainer:function getPopupContainer(triggerNode){return triggerNode.parentNode;}},options),this.state.onshixunsmarkvaluetype===true?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('div',{className:'color-red mt7 ml5',id:'ex_value_notice'},'\u5FC5\u9009\u9879\uFF1A\u4E0D\u80FD\u4E3A\u7A7A'):"")),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('div',{className:'edu-back-white newpadding02020'},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('p',{className:'color-grey-6 font-16 mb10'},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('span',{className:'mr5 color-red'},'*'),'\u6280\u80FD\u6807\u7B7E\uFF1A',__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('span',{className:"color-grey-8 font-14"},' (\u5B66\u5458\u7B54\u9898\u6B63\u786E\u5C06\u83B7\u5F97\u6280\u80FD\uFF0C\u5426\u5219\u4E0D\u80FD\u83B7\u5F97\u6280\u80FD)')),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('div',{className:'clearfix'},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('div',{className:'flex1'},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_antd_lib_input___default.a,{type:'text',className:shixunsskillvaluelisttype===true?"winput-240-40 fl mr20 winput-240-40s ml10 bor-red":"winput-240-40 fl mr20 winput-240-40s ml10",id:'input_task_tag',placeholder:'\u6DFB\u52A0\u6807\u7B7E',onInput:this.shixunsskill,value:shixunsskillvalue,onPressEnter:this.clickshixunsskill,onBlur:this.clickshixunsskill}),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('div',{className:'ml15 color-grey-9 pt5 font-14'},'(\u56DE\u8F66\u6DFB\u52A0\u6807\u7B7E)'),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('div',{className:'mt20 clearfix',id:'task_tag_content'},shixunsskillvaluelist===undefined?"":shixunsskillvaluelist.length===0?"":shixunsskillvaluelist.map(function(itme,key){return __WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('li',{key:key,className:"fl ml10 mr10"},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_badge___default.a,{className:"tpmpointer",count:"x",onClick:function onClick(){return _this2.delshixunsskilllist(key);}},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd_lib_button___default.a,{type:'primary',ghost:true,className:"Permanentban "},itme)));}))),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('div',{className:shixunsskillvaluelisttype===true?"color-red ml10 mt5 block":"none",id:'stage_name_notice'},'\u5FC5\u9009\u9879\uFF1A\u4E0D\u80FD\u4E3A\u7A7A')))),this.props.identity>4||this.props.identity===undefined?"":__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement('div',{className:'clearfix mt30'// style={{display:this.props.identity>4||this.props.identity===undefined?"none":'block'}}
},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15__modals_Bottomsubmit__["a" /* default */],Object.assign({url:go_back_url===undefined?"":go_back_url},this.props,this.state,{bottomvalue:"提交",onSubmits:checkpointId===undefined?function(){return _this2.CreatePracticesend();}:function(){return _this2.editPracticesend();},loadings:CreatePracticesendtype===true?true:editPracticesendtype===true?true:false}))));}}]);return TPMchallengesnew;}(__WEBPACK_IMPORTED_MODULE_12_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (TPMchallengesnew);

/***/ })

});