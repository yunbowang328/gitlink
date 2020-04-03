webpackJsonp([31],{

/***/ 5010:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AccountImg__ = __webpack_require__(5011);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var AccountNav=function(_Component){_inherits(AccountNav,_Component);function AccountNav(){var _ref;var _temp,_this,_ret;_classCallCheck(this,AccountNav);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=AccountNav.__proto__||Object.getPrototypeOf(AccountNav)).call.apply(_ref,[this].concat(args))),_this),_this.toBasic=function(){_this.props.history.push('/account/profile');},_this.toCertification=function(){_this.props.history.push('/account/certification');},_this.toSecure=function(){_this.props.history.push('/account/secure');},_this.isBinding=function(){_this.props.history.push('/account/binding');},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(AccountNav,[{key:'render',value:function render(){var _props=this.props,basicInfo=_props.basicInfo,current_user=_props.current_user;// console.log(this.props);
var path=window.location.pathname;var isBasic=path.indexOf('profile')!=-1||path=="/account";var isCertification=path.indexOf('certification')!=-1;var isSecure=path.indexOf('secure')!=-1;var isBinding=path.indexOf('binding')!=-1;return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'accountNav fl'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('style',null,'\n                .accountInfo { \n                  text-align: center;\n                  display: flex;\n                  flex-direction: column;\n                  align-items: center;\n                }\n                .accountInfo .name {\n                  color: #05101A;\n                  font-size: 24px;\n                  height: 36px;\n                }\n                .accountInfo .role {\n                  color: #666666;\n                  font-size: 14px;\n                }\n                .accountManagement .title {\n                  color: #05101A;\n                  font-size: 18px;\n                  font-weight: 400;\n                  padding: 10px 28px;\n                  margin-top: 6px;\n                }\n                .accountManagement .navItem {\n                  font-size: 16px;\n                  padding: 6px 0px;\n                  padding-left: 30px;\n                  border-left: 2px solid #fff;\n                  cursor: pointer;\n                  color:#4D4D4D;\n                }\n                .accountManagement .navItem i{\n                  margin-top: -4px;\n                  display: inline-block;\n                  margin-right: 7px;\n                }\n                .accountManagement .navItem i.status{\n                  margin-top: 1px;\n                  margin-right: 24px;\n                }\n                .accountManagement .navItem.active { \n                  border-left: 2px solid #4CACFF;\n                  background: #E6F3FF;\n                }\n                .accountManagement .navItem.active i:first-child{\n                  color:#4CACFF!important;\n                }\n\n                .color-green-light{\n                  color: #45E660!important;\n                }\n            '),basicInfo&&basicInfo.id&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Fragment,null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'accountInfo'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__AccountImg__["a" /* default */],Object.assign({src:basicInfo.avatar_url},this.props)),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'name'},basicInfo.name||(current_user?"":'')),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'role'},basicInfo.technical_title)),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'accountManagement'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'title'},'\u8D26\u53F7\u7BA1\u7406'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('ul',null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('li',{className:'navItem '+(isBasic?'active':''),onClick:this.toBasic},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i',{className:'iconfont icon-jibenxinxi color-grey-9 font-16'}),'\u57FA\u672C\u4FE1\u606F',basicInfo.base_info_completed==true?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i',{className:'status fr iconfont icon-wancheng color-green-light font-16'}):__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i',{className:'status fr iconfont icon-tishi color-red font-16'})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('li',{className:'navItem '+(isCertification?'active':''),onClick:this.toCertification},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i',{className:'iconfont icon-renzhengxinxi color-grey-9 font-16'}),'\u8BA4\u8BC1\u4FE1\u606F',basicInfo.professional_certification=='certified'&&basicInfo.authentication=='certified'?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i',{className:'status fr iconfont icon-wancheng color-green-light font-16'}):__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i',{className:'status fr iconfont icon-tishi color-red font-16'})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('li',{className:'navItem '+(isSecure?'active':''),onClick:this.toSecure},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i',{className:'iconfont icon-anquanshezhi color-grey-9 font-16'}),'\u5B89\u5168\u8BBE\u7F6E'),this.props.user&&this.props.user.main_site===true?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('li',{className:'navItem '+(isBinding?'active':''),onClick:this.isBinding},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i',{className:'iconfont icon-lianjie color-grey-9 font-16'}),'\u7ED1\u5B9A\u767B\u5F55\u8D26\u53F7'):""))));}}]);return AccountNav;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (AccountNav);

/***/ }),

/***/ 5011:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ChangeHeaderPicModal__ = __webpack_require__(5012);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var AccountImg=function(_Component){_inherits(AccountImg,_Component);function AccountImg(){var _ref;var _temp,_this,_ret;_classCallCheck(this,AccountImg);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=AccountImg.__proto__||Object.getPrototypeOf(AccountImg)).call.apply(_ref,[this].concat(args))),_this),_this.editImg=function(){_this.refs['picModal'].setVisible(true);},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(AccountImg,[{key:'render',value:function render(){var picUrl=Object(__WEBPACK_IMPORTED_MODULE_1_educoder__["M" /* getImageUrl */])("images/"+this.props.src);return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'headphoto mt14'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ChangeHeaderPicModal__["a" /* default */],Object.assign({},this.props,{ref:'picModal',imageSrc:picUrl,userLogin:this.props.current_user?this.props.current_user.login:''})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('style',null,'\n            /*\n            .headphoto {\n              text-align: center;\n              background: #FFFFff;\n              width: 115px;\n              height: 115px;\n              padding: 3px;\n              border-radius: 50%;\n              position: relative;\n              float: left;\n              margin-top: 19px;\n              box-sizing: border-box;\n            }\n            .headphoto img {\n              width: 109px;\n              border-radius: 50%;\n              height: 109px;\n            }\n            .headphoto-black {\n              display: none;\n              cursor: pointer;\n              position: absolute;\n              top: 3px;\n              left: 3px;\n              width: 109px;\n              height: 109px;\n              text-align: center;\n              line-height: 112px;\n              border-radius: 50%;\n              background-color: rgba(0,0,0,0.3);\n              color: #fff;\n            } */\n            .headphoto:hover .headphoto-black {\n              display: block;\n            }\n          '),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img',{alt:'\u5934\u50CF',id:'user_avatar_show',nhname:'avatar_image',src:''+picUrl}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'headphoto-black',onClick:this.editImg},'\u4FEE\u6539\u5934\u50CF'));}}]);return AccountImg;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (AccountImg);

/***/ }),

/***/ 5012:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__courses_common_ModalWrapper__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_educoder__ = __webpack_require__(5);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var imageId='changeHeaderPic';var previewId='changeHeader_imagePreview';var uploadedImageType=void 0;var uploadedImageName=void 0;var uploadedImageURL=void 0;var ChangeHeaderPicModal=function(_Component){_inherits(ChangeHeaderPicModal,_Component);function ChangeHeaderPicModal(props){_classCallCheck(this,ChangeHeaderPicModal);var _this=_possibleConstructorReturn(this,(ChangeHeaderPicModal.__proto__||Object.getPrototypeOf(ChangeHeaderPicModal)).call(this,props));_this.init=function(){var inputImage=document.getElementById('inputImage');var that=_this;inputImage.onchange=function(){var files=this.files;var file;// cropper && 
if(files&&files.length){file=files[0];if(/^image\/\w+/.test(file.type)){if(file.size>2*1024*1024){this.props.showNotification&&this.props.showNotification("仅支持文件大小小于2M的文件");return;}uploadedImageType=file.type;uploadedImageName=file.name;if(uploadedImageURL){URL.revokeObjectURL(uploadedImageURL);}var image=document.getElementById(imageId);// base64
var reader=new FileReader();reader.readAsBinaryString(file);reader.onload=function(){var base64_content=btoa(reader.result);console.log();image.src="data:"+file.type+";base64,"+base64_content;// uploadedImageURL = URL.createObjectURL(file);
that.fileUploaded=true;that.refs['cropper'].renew(image);// cropper.destroy();
// cropper = new Cropper(image, options);
inputImage.value=null;};reader.onerror=function(){console.log('there are some problems');};}else{this.props.showNotification&&this.props.showNotification("请选择一个图片格式的文件");// window.alert('Please choose an image file.');
}}};};_this.setVisible=function(visible){_this.refs['modalWrapper'].setVisible(visible);if(visible){_this.fileUploaded=false;setTimeout(function(){_this.init();},500);}};_this.onSendOk=function(){};_this.onOk=function(){if(_this.state.uploading==true)return;if(_this.fileUploaded!=true){_this.props.showNotification("请先上传图片");return;}console.log(new Date().getTime());_this.setState({uploading:true},function(){window.setTimeout(function(){console.log(new Date().getTime());_this._onOk();},10);});};_this._onOk=function(){var img_lg=document.getElementById(previewId);// https://github.com/niklasvh/html2canvas/issues/1908     
// 截图小的显示框内的内容          
window.html2canvas(img_lg).then(function(canvas){var dataUrl=canvas.toDataURL("image/jpeg");console.log(dataUrl);var url="/users/accounts/"+_this.props.userLogin+"/avatar.json";__WEBPACK_IMPORTED_MODULE_1_axios___default.a.put(url,{image:dataUrl}).then(function(response){// {"status":0,"message":"success","avatar_url":"avatars/User/15739"}
if(response.data.status==0){// this.props.getBasicInfo()
// https://www.trustie.net/issues/22461          
if(_this.props.current_user.image_url.indexOf('avatars/User/b')!=-1||_this.props.current_user.image_url.indexOf('avatars/User/g')!=-1){window.setTimeout(function(){_this.doAfterUpdated();},1000);}else{_this.doAfterUpdated();}_this.setState({uploading:false});}}).catch(function(error){this.setState({uploading:false});console.log(error);});});};_this.doAfterUpdated=function(){_this.props.fetchUser();// 头像更新后会触发AccountPage的DidUpdate，然后会调用getBasicInfo
_this.props.showNotification&&_this.props.showNotification("修改头像成功");_this.setVisible(false);};_this.state={uploading:false};return _this;}_createClass(ChangeHeaderPicModal,[{key:"componentDidMount",value:function componentDidMount(){}},{key:"render",value:function render(){var _this2=this;var course_lists=this.state.course_lists;var _props=this.props,moduleName=_props.moduleName,current_user=_props.current_user;var userHeaderImgUrl=current_user?Object(__WEBPACK_IMPORTED_MODULE_3_educoder__["U" /* getUrl */])()+"/images/"+current_user.image_url:'';return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__courses_common_ModalWrapper__["a" /* default */],Object.assign({ref:"modalWrapper",title:"\u4E0A\u4F20\u5934\u50CF"},this.props,{onOk:this.onOk,okText:"\u4FDD\u5B58",width:552,className:"changeHeaderModal",loading:this.state.uploading,onCancel:function onCancel(){return _this2.setState({uploading:false});}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("style",null,"\n            #changeHeader_imagePreview {\n                overflow: hidden;\n                background-color: #fff;\n                border-radius: 50%;\n                text-align: center;\n                width: 120px;\n                height: 120px;\n                /* border: 1px solid #eee; */\n            }\n            .previewWrap {\n              flex-direction: column;\n              justify-content: space-between;\n              height: 320px;\n              align-items: center;\n              margin-left: 36px;\n            }\n            .changeHeaderModal .tip {\n              color: #9B9B9B;\n              margin-top: 4px;\n            }\n            .changeHeaderModal .cropperWrap .tip {\n              display: inline-block;\n            }\n            .previewWrap .tip {\n              text-align: center;\n              margin-top: 4px;\n            }\n            #uploadBtn {\n              color: #4CACFF;\n              border: 1px solid #4CACFF;\n              padding: 2px 18px;\n              cursor: pointer;\n            }\n        "),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"df"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"cropperWrap"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_educoder__["h" /* Cropper */],{imageSrc:'',initPreviewUrl:userHeaderImgUrl,ref:"cropper",imageId:imageId,previewId:"changeHeader_imagePreview",width:320,height:320}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"tip"},"\u4EC5\u652F\u6301JPG\u3001GIF\u3001PNG\uFF0C\u4E14\u6587\u4EF6\u5C0F\u4E8E2M")),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"df previewWrap",style:{flexDirection:'column'}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{id:"changeHeader_imagePreview"},userHeaderImgUrl&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img",{src:userHeaderImgUrl})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"tip"},"\u5934\u50CF\u9884\u89C8")),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("label",{id:"uploadBtn","for":"inputImage"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input",{type:"file","class":"sr-only",id:"inputImage",name:"file",accept:"image/*"}),"\u70B9\u51FB\u4E0A\u4F20"))));}}]);return ChangeHeaderPicModal;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (ChangeHeaderPicModal);

/***/ }),

/***/ 890:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__courses_common_CNotificationHOC__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Loading__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_loadable__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_loadable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_loadable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tpm_TPMIndexHOC__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__account_AccountNav__ = __webpack_require__(5010);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_axios__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var AccountBasic=__WEBPACK_IMPORTED_MODULE_4_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(57/* duplicate */).then(__webpack_require__.bind(null, 3298));},loading:__WEBPACK_IMPORTED_MODULE_3__Loading__["a" /* default */]});var AccountBasicEdit=__WEBPACK_IMPORTED_MODULE_4_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(57/* duplicate */).then(__webpack_require__.bind(null, 2313));},loading:__WEBPACK_IMPORTED_MODULE_3__Loading__["a" /* default */]});var AccountCertification=__WEBPACK_IMPORTED_MODULE_4_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(100).then(__webpack_require__.bind(null, 5013));},loading:__WEBPACK_IMPORTED_MODULE_3__Loading__["a" /* default */]});var AccountSecure=__WEBPACK_IMPORTED_MODULE_4_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(142).then(__webpack_require__.bind(null, 5014));},loading:__WEBPACK_IMPORTED_MODULE_3__Loading__["a" /* default */]});var AccountBinding=__WEBPACK_IMPORTED_MODULE_4_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(143).then(__webpack_require__.bind(null, 5015));},loading:__WEBPACK_IMPORTED_MODULE_3__Loading__["a" /* default */]});var AccountPage=function(_Component){_inherits(AccountPage,_Component);function AccountPage(props){_classCallCheck(this,AccountPage);var _this=_possibleConstructorReturn(this,(AccountPage.__proto__||Object.getPrototypeOf(AccountPage)).call(this,props));_this.componentDidUpdate=function(prevState){if(_this.props.current_user&&_this.props.current_user!=prevState.current_user){_this.getBasicInfo(_this.props.current_user.login);}};_this.componentDidMount=function(){if(_this.props.current_user){_this.getBasicInfo(_this.props.current_user.login);}};_this.getBasicInfo=function(login){var url='/users/accounts/'+(login||_this.props.current_user.login)+'.json';__WEBPACK_IMPORTED_MODULE_8_axios___default.a.get(url).then(function(result){if(result.data){if(result.data&&result.data.base_info_completed==false){_this.props.history.push('/account/profile/edit');}// "authentication": "uncertified", // "uncertified" | "applying" | "certified"
_this.setState({basicInfo:Object.assign({},Object.assign({},result.data),{avatar_url:''+result.data.avatar_url,gender:result.data.gender==null||result.data.gender==undefined?0:result.data.gender})});}}).catch(function(error){console.log(error);});};_this.state={basicInfo:{}};return _this;}_createClass(AccountPage,[{key:'render',value:function render(){var _this2=this;var basicInfo=this.state.basicInfo;var common={basicInfo:basicInfo,getBasicInfo:this.getBasicInfo};return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'newMain clearfix'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'educontent df pt20'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('style',null,'\n                .accountPage {\n                  display: flex;\n                }\n                .basicFormWrap{\n                  flex:1;\n                  width: 0;\n                }\n\n                /* \u5DE6\u4FA7 */\n                .accountNav {\n                  width: 290px;\n                  box-shadow: 0px 4px 9px 0px rgba(11,62,120,0.21);\n                  border-radius: 2px;\n                  padding-top: 8px;\n                  padding-bottom: 30px;\n                  margin-bottom:30px;\n                  margin-right:20px;\n                  height: 460px;\n                }\n              '),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__account_AccountNav__["a" /* default */],Object.assign({},this.props,common)),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'basicFormWrap'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["f" /* Switch */],this.props,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/account/profile/edit',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(AccountBasicEdit,Object.assign({},_this2.props,props,_this2.state,common));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/account/profile',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(AccountBasic,Object.assign({},_this2.props,props,_this2.state,common));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/account/certification',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(AccountCertification,Object.assign({},_this2.props,props,_this2.state,common));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/account/secure',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(AccountSecure,Object.assign({},_this2.props,props,_this2.state,common));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/account/binding',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(AccountBinding,Object.assign({},_this2.props,props,_this2.state,common));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{exact:true,path:'/account',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(AccountBasic,Object.assign({getBasicInfo:function getBasicInfo(){return _this2.getBasicInfo();}},_this2.props,props,_this2.state,common));}})))));}}]);return AccountPage;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_2__courses_common_CNotificationHOC__["a" /* CNotificationHOC */])()(Object(__WEBPACK_IMPORTED_MODULE_6_educoder__["w" /* SnackbarHOC */])()(Object(__WEBPACK_IMPORTED_MODULE_5__tpm_TPMIndexHOC__["a" /* TPMIndexHOC */])(AccountPage))));

/***/ })

});