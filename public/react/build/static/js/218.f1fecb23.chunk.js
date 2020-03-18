webpackJsonp([218],{

/***/ 3173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_modal_style_css__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_modal_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_modal_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_modal__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_spin_style_css__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_spin_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_antd_lib_spin_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_spin__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_spin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_antd_lib_spin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_input_style_css__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_input_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_antd_lib_input_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_input__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_antd_lib_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_educoder__ = __webpack_require__(5);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}// import '../../modules/user/common.css';
//完善个人资料
var WriteaprivateletterModal=function(_Component){_inherits(WriteaprivateletterModal,_Component);function WriteaprivateletterModal(props){_classCallCheck(this,WriteaprivateletterModal);var _this=_possibleConstructorReturn(this,(WriteaprivateletterModal.__proto__||Object.getPrototypeOf(WriteaprivateletterModal)).call(this,props));_this.Recentcontacts=function(){_this.setState({isSpin:true});var url='/users/'+_this.props.current_user.user_id+'/recent_contacts.json';__WEBPACK_IMPORTED_MODULE_7_axios___default.a.get(url).then(function(result){if(result===undefined){return;}//console.log(result);
_this.setState({users:result.data.users,Recentcontacts:false,floatingboxdisplay:false,isSpin:false});}).catch(function(error){//console.log(error)
_this.setState({isSpin:false});});};_this.SendprivatemessageAPI=function(idvalue,contentvalue){var url='/users/'+_this.props.current_user.user_id+'/private_messages.json';contentvalue=Object(__WEBPACK_IMPORTED_MODULE_8_educoder__["X" /* htmlEncode */])(contentvalue);var data={target_id:idvalue,content:contentvalue};__WEBPACK_IMPORTED_MODULE_7_axios___default.a.post(url,data).then(function(result){if(result===undefined){return;}_this.setState({floatingboxdisplays:false,Pleaseselectthesender:false});_this.props.smyJump(3,result.data.private_message.receiver_id);//console.log(result);
}).catch(function(error){//console.log(error)
});};_this.Retrieveprivatemessageusers=function(value){_this.setState({isSpin:true});var url='/users_for_private_messages.json';__WEBPACK_IMPORTED_MODULE_7_axios___default.a.get(url,{params:{keyword:value}}).then(function(result){if(result===undefined){return;}_this.setState({users:result.data.users,Recentcontacts:true,floatingboxdisplay:true,isSpin:false});//console.log(result);
}).catch(function(error){//console.log(error)
_this.setState({isSpin:false});});};_this.modalCancel=function(){// var weekArray = JSON.parse(window.sessionStorage.getItem('yslgeturls'));
// if(weekArray===undefined){
// 	weekArray="/";
// }
// if(weekArray===null){
// 	weekArray="/";
// }
// if(weekArray==="null"){
// 	weekArray="/";
// }
// window.location.href = weekArray;
};_this.setDownload=function(){// window.location.href ='/account/profile';
};_this.search_message_person=function(){//console.log("点击搜索按钮");
if(_this.state.inputvulue.length===0){_this.Recentcontacts();}else{_this.Retrieveprivatemessageusers(_this.state.inputvulue);}};_this.HideModal=function(){_this.props.cancelmodalsType();};_this.OKModal=function(){var _this$state=_this.state,inputvulue=_this$state.inputvulue,Personalid=_this$state.Personalid,inputvulues=_this$state.inputvulues;// console.log("发送私信了");
// console.log(inputvulue);
// console.log(Personalid);
// console.log(inputvulues);
if(inputvulue.length===0){_this.setState({Pleaseselectthesender:true});return;}if(inputvulues.length===0){_this.setState({floatingboxdisplays:true});return;}else{if(Personalid===undefined){_this.setState({Pleaseselectthesender:true});return;}_this.SendprivatemessageAPI(Personalid,inputvulues);}};_this.Myοnkeydοwn=function(){//console.log("点击了回车事件");
if(_this.state.inputvulue.length===0){_this.Recentcontacts();}else{_this.Retrieveprivatemessageusers(_this.state.inputvulue);}};_this.handleEnterKey=function(e){//console.log("");
if(e.nativeEvent.keyCode===13){//e.nativeEvent获取原生的事件对像
_this.Myοnkeydοwn();}};_this.setdatafunsval=function(e){if(e.target.value.length===0){_this.setState({inputvulue:e.target.value,Pleaseselectthesender:false,floatingboxdisplay:true,Personalid:undefined});_this.Recentcontacts();}else{_this.setState({inputvulue:e.target.value,Pleaseselectthesender:false,floatingboxdisplay:true});}//console.log(e.target.value);
};_this.setdatafunsvals=function(e){//console.log(e.target.value);
_this.setState({inputvulues:e.target.value,Pleaseselectthesenders:false,floatingboxdisplays:false,floatingboxdisplay:false});};_this.myonBlur=function(e){//console.log("失去焦点了");
e.preventDefault();_this.setState({// floatingboxdisplay:false,
});};_this.myonFocus=function(e){//console.log("获取到焦点了");
_this.setState({floatingboxdisplay:true});};_this.Getuserinformation=function(item){//console.log("获取到了用户信息");
//console.log(item.id);
_this.setState({Personalid:item.id===undefined?undefined:item.id===null?undefined:item.id,inputvulue:item.name,floatingboxdisplay:false});};_this.state={modalsType:false,Pleaseselectthesender:false,Pleaseselectthesenders:false,inputvulue:"",inputvulues:"",floatingboxdisplay:false,users:[],Personalid:undefined,isSpin:false,Recentcontacts:false,floatingboxdisplays:false};return _this;}_createClass(WriteaprivateletterModal,[{key:'componentDidMount',value:function componentDidMount(){//用户id
//console.log(this.props.current_user.user_id);
this.Recentcontacts();}//获取最近联系人
//发送私信
//搜索私信人
// 搜索
//取消事件
//确认事件
// 回车事件
//判断点击的键盘的keyCode是否为13，是就调用上面的搜索函数
// 查找联系人输入模式
// 输入内容
//失去焦点
//获取焦点
//获取用户信息
},{key:'render',value:function render(){var _this2=this;var _state=this.state,Pleaseselectthesender=_state.Pleaseselectthesender,inputvulue=_state.inputvulue,inputvulues=_state.inputvulues,floatingboxdisplay=_state.floatingboxdisplay,users=_state.users,floatingboxdisplays=_state.floatingboxdisplays,Recentcontacts=_state.Recentcontacts,isSpin=_state.isSpin;//console.log(floatingboxdisplay);
return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_modal___default.a,{keyboard:false,closable:false,footer:null,destroyOnClose:true,title:"写私信",centered:true,visible:this.props.modalsType,width:'550px'},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',null,__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:'mb20 pr'},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:'myw100baifenbi'},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd_lib_input___default.a,{className:'',placeholder:'\u53D1\u9001\u7ED9...',value:inputvulue,onKeyPress:this.handleEnterKey,onBlur:this.myonBlur,onFocus:this.myonFocus,onChange:this.setdatafunsval,suffix:__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('img',{src:Object(__WEBPACK_IMPORTED_MODULE_8_educoder__["M" /* getImageUrl */])("images/"+"educoder/icon/search.svg"),onClick:function onClick(){return _this2.search_message_person();}})})),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:'recently_person',style:floatingboxdisplay===false?{display:"none"}:{display:"block"}},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_antd_lib_spin___default.a,{size:'large',className:'myw100baifenbi',spinning:isSpin},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('p',{className:'padding10-20 color-grey-9 cdefault'},Recentcontacts===false?"最近联系人":"搜索结果"),users.map(function(item,key){return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('p',{className:'clearfix recently_item',key:key,onMouseDown:function onMouseDown(c){return _this2.Getuserinformation(item);}},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('img',{alt:'\u5934\u50CF',className:'radius fl mr10 myimgw48 myimgh48',src:Object(__WEBPACK_IMPORTED_MODULE_8_educoder__["M" /* getImageUrl */])("images/"+item.image_url)}),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span',{className:'recently_name'},item.name));})))),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:'writeLetter_Info'},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('textarea',{className:'writeLetter_text greyInput',value:inputvulues,onChange:this.setdatafunsvals,name:'content',id:'writeLetter_text',maxLength:'200'}),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span',{className:'longchar'},'200'))),Pleaseselectthesender===true?__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('p',{className:'color-orange-tip  ',style:{height:"25px"}},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span',{id:'notice_send_person'},'\u8BF7\u9009\u62E9\u53D1\u9001\u5BF9\u8C61')):floatingboxdisplays===false?__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('p',{style:{height:"25px"}}):"",floatingboxdisplays===true?__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('p',{className:'color-orange-tip  ',style:{height:"25px"}},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span',{id:'notice_send_person'},'\u8BF7\u8F93\u5165\u53D1\u9001\u5185\u5BB9')):"",__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('p',{className:'clearfix edu-txt-center'},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('a',{onClick:function onClick(){return _this2.HideModal();},className:'pop_close task-btn mr30'},'\u53D6\u6D88'),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('a',{className:'task-btn task-btn-orange',onClick:function onClick(){return _this2.OKModal();},id:'submit_send_letter'},'\u786E\u5B9A')));}}]);return WriteaprivateletterModal;}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (WriteaprivateletterModal);

/***/ }),

/***/ 4931:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_spin_style_css__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_spin_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_spin_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_spin__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_spin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_spin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__css_messagemy_css__ = __webpack_require__(2509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__css_messagemy_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__css_messagemy_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tpm_challengesnew_TPMMDEditor__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Rightdialogue__ = __webpack_require__(4932);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Leftdialogue__ = __webpack_require__(4933);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}//私信聊天页面
var MessagChat=function(_Component){_inherits(MessagChat,_Component);function MessagChat(props){_classCallCheck(this,MessagChat);var _this=_possibleConstructorReturn(this,(MessagChat.__proto__||Object.getPrototypeOf(MessagChat)).call(this,props));_this.contentViewScrolltop=function(e){if(e.currentTarget.scrollTop===0){if(_this.state.datanull===0){return;}console.log("调用了方法1111111");var pages=_this.state.pages;var newpage=pages+1;var query=_this.props.location.search;var target_ids=query.split('?target_ids=');_this.shuaxingetChatList(newpage,_this.state.limits,target_ids[1],true);_this.messageList.scrollTop=50;}};_this.contentViewScrolledit=function(e){var newscrollTop=parseInt(e.currentTarget.scrollTop);var allclientHeight=e.currentTarget.clientHeight+newscrollTop;//滑动到底判断
if(e.currentTarget.scrollHeight-allclientHeight===0||e.currentTarget.scrollHeight-allclientHeight===1||e.currentTarget.scrollHeight-allclientHeight===-1){// console.log("滑动到底判断");
var page=_this.state.page;var newpage=page+1;_this.getdata(newpage);// let ls=newpage*20
// this.setState({
// 	limits:ls,
// })
}//滑动到顶部
// console.log("滑动到顶部判断");
// console.log(e.currentTarget.clientHeight);
// console.log(e.currentTarget.scrollTop);
// console.log(e.currentTarget.scrollHeight);
// if(e.currentTarget.scrollHeight+e.currentTarget.scrollTop===e.currentTarget.clientHeight){
// 	 console.log("滑动到顶部判断");
//
// 	// let ls=newpage*20
// 	// this.setState({
// 	// 	limits:ls,
// 	// })
// }
};_this.shuaxingetChatList=function(page,listl,target_ids,bool){_this.setState({isSpin:true});var url='/users/'+_this.props.match.params.userid+'/private_message_details.json';__WEBPACK_IMPORTED_MODULE_5_axios___default.a.get(url,{params:{target_id:target_ids,page:page,per_page:listl}}).then(function(result){_this.setState({isSpin:false});if(result){// if (result.data.status === 0) {
if(result.data!==null){if(result.data.messages.length===0){console.log("没有数据了");_this.setState({datanull:0});return;}var laoshuju=_this.state.messages;var datas=[];var datay=result.data.messages;datay=datay.reverse();datay=datay.concat(laoshuju);var obj={};for(var i=0;i<datay.length;i++){if(i===0){var timetwoy=datay[i].send_time.slice(0,10);datay[i].send_day=timetwoy;obj=datay[i];datas.push(datay[i]);}else{try{var timeone=obj.send_time.slice(0,10);var timetwo=datay[i].send_time.slice(0,10);if(__WEBPACK_IMPORTED_MODULE_7_moment___default()(timeone).isSame(timetwo)){datay[i].send_day="";}else{datay[i].send_day=timetwo;obj=datay[i];}}catch(e){}datas.push(datay[i]);}}console.log("新数组+++++++++++++++++++++++++++++++++++++");console.log(datas);//颠倒数组
_this.setState({messages:datas,myuserl:result.data.target,pages:page});// }
}}}).catch(function(error){console.log(error);_this.setState({isSpin:false});});};_this.getChatList=function(page,listl,target_ids){_this.setState({isSpin:true});var url='/users/'+_this.props.match.params.userid+'/private_message_details.json';__WEBPACK_IMPORTED_MODULE_5_axios___default.a.get(url,{params:{target_id:target_ids,page:page,per_page:listl}}).then(function(result){if(result){// if (result.data.status === 0) {
if(result.data!==null){var datas=[];var datay=result.data.messages;datay=datay.reverse();var obj={};for(var i=0;i<datay.length;i++){if(i===0){var timetwoy=datay[i].send_time.slice(0,10);datay[i].send_day=timetwoy;obj=datay[i];datas.push(datay[i]);}else{try{var timeone=obj.send_time.slice(0,10);var timetwo=datay[i].send_time.slice(0,10);if(__WEBPACK_IMPORTED_MODULE_7_moment___default()(timeone).isSame(timetwo)){datay[i].send_day="";}else{datay[i].send_day=timetwo;obj=datay[i];}}catch(e){}datas.push(datay[i]);}}//颠倒数组
_this.setState({messages:datas,myuserl:result.data.target,pages:page});// }
_this.scrollToBottom();}}_this.setState({isSpin:false});}).catch(function(error){console.log(error);_this.setState({isSpin:false});});};_this.getChatListtwo=function(pages,listls,target_ids){_this.setState({isSpin:true});var url='/users/'+_this.props.match.params.userid+'/private_message_details.json';__WEBPACK_IMPORTED_MODULE_5_axios___default.a.get(url,{params:{target_id:target_ids,page:pages,per_page:listls}}).then(function(result){if(result){// if (result.data.status === 0) {
if(result){// if (result.data.status === 0) {
if(result.data!==null){var datas=[];var datay=result.data.messages;datay=datay.reverse();var obj={};for(var i=0;i<datay.length;i++){if(i===0){var timetwoy=datay[i].send_time.slice(0,10);datay[i].send_day=timetwoy;obj=datay[i];datas.push(datay[i]);}else{try{var timeone=obj.send_time.slice(0,10);var timetwo=datay[i].send_time.slice(0,10);if(__WEBPACK_IMPORTED_MODULE_7_moment___default()(timeone).isSame(timetwo)){datay[i].send_day="";}else{datay[i].send_day=timetwo;obj=datay[i];}}catch(e){console.log("271271271271");console.log(e);}datas.push(datay[i]);}}//颠倒数组
_this.setState({messages:datas,myuserl:result.data.target,pages:pages,datanull:1});_this.scrollToBottom();// }
}}}_this.setState({isSpin:false});}).catch(function(error){console.log(error);_this.setState({isSpin:false});// this.getdatatwo(this.state.page);
});};_this.getdata=function(page){var limit=_this.state.limit;var url='/users/'+(_this.props.match&&_this.props.match.params.userid)+'/private_messages.json';// let url = `/users/71519/private_messages.json`;
__WEBPACK_IMPORTED_MODULE_5_axios___default.a.get(url,{params:{page:page,per_page:limit}}).then(function(result){if(result){// console.log(types);
// console.log(result);
// console.log("调用了消失的方法");
// console.log("5454545454");
// if(result.data.status===0) {
if(result.data!==null){if(result.data.private_messages!==null){if(result.data.private_messages.length>0){for(var i=0;i<result.data.private_messages.length;i++){_this.state.datay.push(result.data.private_messages[i]);}}}}_this.setState({page:page,isSpins:false,datay:_this.state.datay,data:result.data.private_messages===null?undefined:result.data.private_messages===undefined?undefined:result.data.private_messages===[]?undefined:result.data.private_messages==="[]"?undefined:result.data.private_messages.length===0?undefined:result.data.private_messages});}// console.log(this.state.datay);
// }
}).catch(function(error){console.log(error);_this.setState({isSpins:false});});};_this.getdatatwo=function(page){var limits=_this.state.limits;var url='/users/'+(_this.props.match&&_this.props.match.params.userid)+'/private_messages.json';// let url = `/users/71519/private_messages.json`;
__WEBPACK_IMPORTED_MODULE_5_axios___default.a.get(url,{params:{page:page,per_page:limits}}).then(function(result){if(result){// if(result.data.status===0){
_this.setState({page:page,isSpins:false,datay:result.data.private_messages===null?undefined:result.data.private_messages===undefined?undefined:result.data.private_messages===[]?undefined:result.data.private_messages==="[]"?undefined:result.data.private_messages.length===0?undefined:result.data.private_messages});// }
// console.log(this.state.datay);
}}).catch(function(error){console.log(error);_this.setState({isSpins:false});});};_this.smyJump=function(i){// console.log("跳转页面");
// console.log(i);
_this.props.Modifyur(i);};_this.getdatas2=function(){};_this.Clickedontheuser=function(user){// debugger
// console.log("点击了用户");
// console.log(user);
// this.setState({
// 	myyslusers:user,
// 	mess:true,
// })
_this.setState({myuserl:user});_this.props.history.replace('/messages/'+_this.props.current_user.login+'/message_detail?target_ids='+user.id);// this.getdatatwo(this.state.page);
_this.getChatListtwo(1,_this.state.mypagey,user.id);};_this.setreplyfun=function(){_this.setState({isSpin:true});var contents=_this.messageRef.current.getValue().trim();var query=_this.props.location.search;var target_ids=query.split('?target_ids=');contents=Object(__WEBPACK_IMPORTED_MODULE_4_educoder__["X" /* htmlEncode */])(contents);var url='/users/'+_this.props.match.params.userid+'/private_messages.json';__WEBPACK_IMPORTED_MODULE_5_axios___default.a.post(url,{target_id:target_ids[1],content:contents}).then(function(response){_this.setState({isSpin:false});if(response===undefined){return;}if(response.data.status===0){// console.log("回复成功");
// console.log(response);
// var datas=[];
// var dataso=this.state.messages;
// var datays=response.data.private_message;
// var obj={};
// for (var i=0;i<dataso.length;i++){
// 	if(i===0){
// 		obj=dataso[i];
// 		datas.push(dataso[i]);
// 	}else{
// 		if( moment(obj.send_day).isSame(dataso[i].send_day)){
// 			dataso[i].send_day="";
// 		}else {
// 			obj=dataso[i];
// 		}
// 		datas.push(dataso[i]);
// 	}
// }
_this.getChatListtwo(1,_this.state.mypagey,target_ids[1]);// 	try {
// 		var time =dataso[dataso.length-1].send_time.slice(0,10);
//     console.log(time);
// 		var timetwo=datays.send_time.slice(0,10);
// 		console.log(timetwo);
// 		if( moment(time).isSame(timetwo)){
// 			     datays.send_day="";
// 		    	dataso.push(datays);
// 					}else {
// 		    	datays.send_day=timetwo;
// 		    	dataso.push(datays);
// 					}
// 	}catch (e) {
//    console.log("回去出现错误");
//    console.log(e);
// 	}
//
// //颠倒数组
// this.setState({
// 	messages: dataso,
//
// });
_this.scrollToBottom();_this.messageRef.current.setValue('');}}).catch(function(error){console.log(error);this.setState({isSpin:false});});};_this.DELETEsetreplyfun=function(user_id,id){//user_id不用
// console.log("311");
_this.setState({isSpin:true});var url='/users/'+_this.props.match.params.userid+'/private_messages/'+id+'.json';__WEBPACK_IMPORTED_MODULE_5_axios___default.a.delete(url).then(function(response){if(response){if(response.data.status===0){if(_this.state.messages.length>0){for(var i=0;i<_this.state.messages.length;i++){if(parseInt(_this.state.messages[i].id)===id){_this.state.messages.splice(i,1);}}// setTimeout(()=>{
//
// }, 200);
_this.setState({messages:_this.state.messages,isSpin:false// datanull:1
});// this.scrollToBottom()
}}}}).catch(function(error){console.log(error);this.setState({isSpin:false});});};_this.messageRef=__WEBPACK_IMPORTED_MODULE_2_react___default.a.createRef();_this.state={isSpin:false,isSpins:false,limit:20,page:1,datay:[],limits:20,mess:false,myuserl:[],pages:1,mypagey:20,messages:[],objc:[],datanull:1};return _this;}_createClass(MessagChat,[{key:'componentDidMount',value:function componentDidMount(){this.getdata(1);var query=this.props.location.search;var target_ids=query.split('?target_ids=');this.getChatList(1,this.state.limits,target_ids[1]);// console.log("MessagChat111111");
// console.log(this.props.myysluser);
this.setState({myyslusers:this.props.myysluser});try{this.props.Mtab(3);}catch(e){}// console.log("MessagChat111111");
// console.log(this.props);
// console.log(this.props.match.params.userid);
this.scrollToBottom();this.props.triggerRef(this);}},{key:'componentDidUpdate',value:function componentDidUpdate(){// this.scrollToBottom();
}},{key:'scrollToBottom',value:function scrollToBottom(){var scrollHeight=this.messageList.scrollHeight;var height=this.messageList.clientHeight;var maxScrollTop=scrollHeight-height;this.messageList.scrollTop=maxScrollTop>0?maxScrollTop:0;}// 滑动刷新
//获取数据地方
//获取数据地方
// 跳转页面
// 点击了用户
//回复
//删除
},{key:'render',value:function render(){var _this2=this;var _state=this.state,isSpins=_state.isSpins,datay=_state.datay,myyslusers=_state.myyslusers,mess=_state.mess,limits=_state.limits,myuserl=_state.myuserl,messages=_state.messages,isSpin=_state.isSpin,datanull=_state.datanull;// console.log(mess);
// console.log(myyslusers);
// console.log("MessagChat");
// console.log(this.state);
// console.log("112");
// console.log(limits);
// console.log(myuserl);
// console.log(messages);
return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'edu-back-white ml20'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'df clearfix'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'flex1'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{className:'clearfix pt30 pb30 edu-txt-center font-16 bor-bottom-greyE'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('a',{onClick:function onClick(){return _this2.smyJump(2);}},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('i',{className:'iconfont icon-zuojiantou font-14 fl ml25 color-grey-9','data-tip-down':'\u8FD4\u56DE\u5230\u5217\u8868'})),myuserl!==undefined?myuserl.name:"",'\u4E0E\u4F60\u7684\u79C1\u4FE1'),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('style',null,'\n\t\t\t\t\t\t\t.dialogPanel{\n\t\t\t\t\t\t\t    padding: 0px 20px;\n\t\t\t\t\t\t\t\t\theight: 400px !important;\n\t\t\t\t\t\t\t\t\toverflow-y: auto;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t'),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'dialogPanel',onScroll:this.contentViewScrolltop,ref:function ref(div){_this2.messageList=div;}},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',null,__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_spin___default.a,{size:'large',className:'myw100baifenbi',spinning:isSpin},datanull===0?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{className:'mt30 edu-txt-center'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:'letter-time'},'\u6CA1\u6709\u4FE1\u606F\u4E86\uFF5E\uFF5E')):"",__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{id:'yslysl'},messages===undefined?"":messages.map(function(item,key){// console.log("-----------------================-=-==-==");
// console.log(item.sender_id);
// console.log(this.props.match.params.userid);
return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{key:key},item.send_day===undefined?"":item.send_day===null?"":item.send_day===""?"":__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{className:'mt30 edu-txt-center'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:'letter-time'},item.send_day)),parseInt(item.sender_id)===parseInt(_this2.props.match.params.userid)?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__Rightdialogue__["a" /* default */],Object.assign({keys:key,objeysl:item},_this2.state,_this2.props,{DELETEsetreplyfun:function DELETEsetreplyfun(user_id,id){return _this2.DELETEsetreplyfun(user_id,id);}})):__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__Leftdialogue__["a" /* default */],Object.assign({keys:key,objeysl:item},_this2.state,_this2.props,{DELETEsetreplyfun:function DELETEsetreplyfun(user_id,id){return _this2.DELETEsetreplyfun(user_id,id);}})));}))))),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'bor-top-greyE padding20'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('style',null,'\n\t\t\t\t\t\t\t.rememberTip{\n\t\t\t\t\t\t\t\tdisplay:none;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t'),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__tpm_challengesnew_TPMMDEditor__["a" /* default */],{ref:this.messageRef,placeholder:'请输入您的回复',watch:false,initValue:'',mdID:'courseMessageMD',className:'courseMessageMD',height:200}),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:"msheight30"},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:'fl ml5 color-orange font-12'},'\u5728\u95EE\u9898\u53CD\u9988\u65F6\uFF0C\u8BF7\u540C\u65F6\u53D1\u9001\u95EE\u9898\u53D1\u751F\u9875\u7684\u7F51\u5740\u94FE\u63A5\uFF0C\u4EE5\u4FBF\u6211\u4EEC\u9AD8\u6548\u7684\u4E3A\u60A8\u670D\u52A1'),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('a',{className:'fr task-btn task-btn-orange',onClick:function onClick(){return _this2.setreplyfun();}},'\u56DE\u590D')))),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'bor-left-greyE',style:{width:"290px"}},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{className:'pt30 pb30 pl30 edu-txt-left font-16 bor-bottom-greyE'},'\u79C1\u4FE1\u5217\u8868'),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_spin___default.a,{size:'large',className:'myw100baifenbi',spinning:isSpins},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('style',null,'\n\t\t\t\t\t\t \t.private-list{\n\t\t\t\t\t\t \tmin-height: 680px !important;\n\t\t\t\t\t\t\tmax-height: 680px !important;\n\t\t\t\t\t\t\toverflow-y: auto;\n\t\t\t\t\t\t\toverflow-x: hidden;\n\t\t\t\t\t\t \t}\n\t\t\t\t\t\t \t'),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'private-list',onScroll:this.contentViewScrolledit},datay===undefined?"":datay.map(function(item,key){return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'private-part clearfix',key:key,onClick:function onClick(i){return _this2.Clickedontheuser(item.target);}},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'part-line df'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('img',{src:Object(__WEBPACK_IMPORTED_MODULE_4_educoder__["M" /* getImageUrl */])("images/"+item.target.image_url),className:'radius mr10 myimgw48 myimgh48'}),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'flex1'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{className:'clearfix mb15 lineh-17'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:'fl pr'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:'task-hide privatePartName'},item.target.name),item.unread===true?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:'newLetter'}):""),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:'color-grey-c fr'},__WEBPACK_IMPORTED_MODULE_7_moment___default()(item.send_time).fromNow())),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{className:'color-grey-6 lineh-20 justify  break_word task-hide-2 markdown-body',style:{wordBreak:"break-word"},id:'MakedownHTML',dangerouslySetInnerHTML:{__html:Object(__WEBPACK_IMPORTED_MODULE_4_educoder__["_0" /* markdownToHTML */])(item.content).replace(/▁/g,"▁▁▁")}}))));}))))));}}]);return MessagChat;}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (MessagChat);// onClick="delete_confirm_box('/users/innov/delete_message?mess_id=25137', '确定要删除该条记录吗？')"
//
// {/*左边*/}

/***/ }),

/***/ 4932:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__css_messagemy_css__ = __webpack_require__(2509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__css_messagemy_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__css_messagemy_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__messagemodal_WriteaprivateletterModal__ = __webpack_require__(3173);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}//私信页面
var Rightdialogue=function(_Component){_inherits(Rightdialogue,_Component);function Rightdialogue(props){_classCallCheck(this,Rightdialogue);var _this=_possibleConstructorReturn(this,(Rightdialogue.__proto__||Object.getPrototypeOf(Rightdialogue)).call(this,props));_this.mydelete=function(user_id,id){_this.props.DELETEsetreplyfun(user_id,id);};_this.myCome=function(e){window.location.href="/users/"+e.login;};_this.state={};return _this;}_createClass(Rightdialogue,[{key:'componentDidMount',value:function componentDidMount(){// console.log("Rightdialogue");
// console.log(this.props);
}},{key:'componentDidUpdate',value:function componentDidUpdate(prevProps){// console.log("11111111111");
// console.log(prevProps);
// console.log("22222222222");
// console.log(this.props);
// console.log("33333333333");
// if(prevProps.current_user !== this.props.current_user){
// 	this.getdata(1);
// }
}},{key:'render',value:function render(){var _this2=this;return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'ThisSide clearfix',id:'message_content_25137'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a',{onMouseDown:function onMouseDown(){return _this2.myCome(_this2.props.objeysl.sender);}},this.props.objeysl&&this.props.objeysl.sender.image_url?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img',{alt:'\u5934\u50CF',className:'ml10 radius fr myimgw48 myimgh48',src:Object(__WEBPACK_IMPORTED_MODULE_3_educoder__["M" /* getImageUrl */])("images/"+this.props.objeysl.sender.image_url)}):""),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'fr pr ThisSide-info'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'trangle'}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_educoder__["q" /* ImageLayer2 */],_defineProperty({parentSel:'#Rightdialogue'+this.props.keys},'parentSel','#Rightdialogue'+this.props.keys)),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'sms break_word markdown-body',id:'Rightdialogue'+this.props.keys,dangerouslySetInnerHTML:{__html:Object(__WEBPACK_IMPORTED_MODULE_3_educoder__["_0" /* markdownToHTML */])(this.props.objeysl.content).replace(/▁/g,"▁▁▁")}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'edu-txt-left mt5'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a',{className:'color-grey-c',onClick:function onClick(){return _this2.mydelete(_this2.props.objeysl.sender.id,_this2.props.objeysl.id);}},'\u5220\u9664'))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'fr mr15 color-grey-c lineh-15 mt15'},__WEBPACK_IMPORTED_MODULE_2_moment___default()(this.props.objeysl.send_time).hour(),':',__WEBPACK_IMPORTED_MODULE_2_moment___default()(this.props.objeysl.send_time).minute()<10?"0"+__WEBPACK_IMPORTED_MODULE_2_moment___default()(this.props.objeysl.send_time).minute():__WEBPACK_IMPORTED_MODULE_2_moment___default()(this.props.objeysl.send_time).minute()));}}]);return Rightdialogue;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (Rightdialogue);

/***/ }),

/***/ 4933:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__css_messagemy_css__ = __webpack_require__(2509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__css_messagemy_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__css_messagemy_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__messagemodal_WriteaprivateletterModal__ = __webpack_require__(3173);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}//私信页面
var Leftdialogue=function(_Component){_inherits(Leftdialogue,_Component);function Leftdialogue(props){_classCallCheck(this,Leftdialogue);var _this=_possibleConstructorReturn(this,(Leftdialogue.__proto__||Object.getPrototypeOf(Leftdialogue)).call(this,props));_this.mydelete=function(user_id,id){_this.props.DELETEsetreplyfun(user_id,id);};_this.myCome=function(e){window.location.href="/users/"+e.login;};_this.state={};return _this;}_createClass(Leftdialogue,[{key:'componentDidMount',value:function componentDidMount(){console.log("Leftdialogue");console.log(this.props);}},{key:'componentDidUpdate',value:function componentDidUpdate(prevProps){// console.log("11111111111");
// console.log(prevProps);
// console.log("22222222222");
// console.log(this.props);
// console.log("33333333333");
// if(prevProps.current_user !== this.props.current_user){
// 	this.getdata(1);
// }
}},{key:'render',value:function render(){var _this2=this;return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'OtherSide clearfix',id:'message_content_25148'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a',{onMouseDown:function onMouseDown(){return _this2.myCome(_this2.props.objeysl.sender);}},this.props.objeysl&&this.props.objeysl.sender.image_url?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img',{alt:'\u5934\u50CF',className:'mr10 radius fl  myimgw48 myimgh48',src:Object(__WEBPACK_IMPORTED_MODULE_3_educoder__["M" /* getImageUrl */])("images/"+this.props.objeysl.sender.image_url)}):""),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'fl pr OtherSide-info'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'trangle'}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_educoder__["q" /* ImageLayer2 */],_defineProperty({parentSel:'#Leftdialogue'+this.props.keys},'parentSel','#Leftdialogue'+this.props.keys)),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'sms break_word markdown-body',id:'Leftdialogue'+this.props.keys,dangerouslySetInnerHTML:{__html:Object(__WEBPACK_IMPORTED_MODULE_3_educoder__["_0" /* markdownToHTML */])(this.props.objeysl.content).replace(/▁/g,"▁▁▁")}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'edu-txt-right mt5'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a',{className:'color-grey-c',onClick:function onClick(){return _this2.mydelete(_this2.props.objeysl.sender.id,_this2.props.objeysl.id);}},'\u5220\u9664'))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'fl ml15 color-grey-c lineh-15 mt15'},__WEBPACK_IMPORTED_MODULE_2_moment___default()(this.props.objeysl.send_time).hour(),':',__WEBPACK_IMPORTED_MODULE_2_moment___default()(this.props.objeysl.send_time).minute()<10?"0"+__WEBPACK_IMPORTED_MODULE_2_moment___default()(this.props.objeysl.send_time).minute():__WEBPACK_IMPORTED_MODULE_2_moment___default()(this.props.objeysl.send_time).minute()));}}]);return Leftdialogue;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (Leftdialogue);// onClick="delete_confirm_box('/users/innov/delete_message?mess_id=25148', '确定要删除该条记录吗？')"

/***/ })

});