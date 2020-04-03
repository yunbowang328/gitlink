webpackJsonp([227],{

/***/ 3455:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABgBAMAAAAnVGd6AAAAHlBMVEVHcExNrf9Prf9Osf9Mrf9Nrf9guP9Orf9Orv9MrP8FsCMcAAAACXRSTlMA7kQqy58Jgljrf+twAAABc0lEQVRYw+2ZoW7DMBCGb0lXjxeFNWgayyNMmlZpbKCaVBZNA8VjZpEKhjs1wG/b2Gky5LvofjTpjvvTV/dqn/8SERX7Kijq/LqlVA9vQVmXLq5fH4K6+nYAfAWgdgPggAD6YQcCVB2tMMAzPWGA37QFfUOKKtNSik3wTqq6j61AsQkbHaCM7Ujxg5Cy0loDGMAABjCAAnD8xgBFFV4gQB0vEQBQxAtoCwDq8S5XA5IAYpAEgD0YBTZ6QBI4N2pARmA5ICOwGJATWAzICTCA9U+3QIAB1OHSygJ5QFmNU7AgkAek+a0VBfKAu2kQ5wXygDQ/3xQYgTzgOL8FWAHmW/CzAifAANykwApwnTgpsAIc4KbAC7C/hVGBF2AB7u9RstHdTH5+oDY6gJMFhPPAiwICwIkC0onkJQEJ4CQB8Uz0goAIGBQ+sAnl8WRTmgEMYIB/BYCjMDiMg+NAOJCEI1E4lIVjYTyYhqNxOJwn+kT+HrgC4ZxMj7df2qIAAAAASUVORK5CYII="

/***/ }),

/***/ 4869:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__images_ok_border_png__ = __webpack_require__(3455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__images_ok_border_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__images_ok_border_png__);
function VideoUpload(props){var theme=Object(__WEBPACK_IMPORTED_MODULE_0_react__["useContext"])(__WEBPACK_IMPORTED_MODULE_1_educoder__["y" /* ThemeContext */]);var history=props.history;var username=props.match.params.username;function toList(){history.push('/users/'+username+'/videos');}function toUpload(){history.push('/users/'+username+'/videos/upload');}return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'videoPublishSuccess educontent'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_educoder__["c" /* CBreadcrumb */],{className:'mb26 mt16',separator:' > ',items:[{to:'/users/'+username+'/videos',name:'视频'},{name:'上传'}]}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('style',null,'\n                .videoPublishSuccess .section {\n                    background: #fff;\n                    padding: 72px 20px;\n                    position: relative;\n\n                    text-align: center;\n                    color: '+theme.foreground_tip+';\n                }\n                .videoPublishSuccess img.ok {\n                    width: 64px;\n                    margin: 16px;\n                    margin-top: 0px;\n                }\n                .videoPublishSuccess .tip {\n                    margin-top: 10px;\n                    margin-bottom: 12px;\n                }\n                .videoPublishSuccess .toListBtn {\n                    margin-right: 10px;\n                }\n                .videoPublishSuccess .toUploadBtn {\n                    width: 112px;\n                }\n            '),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'section'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img',{className:'ok',src:__WEBPACK_IMPORTED_MODULE_3__images_ok_border_png___default.a})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'font-16',style:{'line-height':'16px'}},'\u606D\u559C\uFF01'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'font-16'},'\u63D0\u4EA4\u6210\u529F'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'tip'},'\u5E73\u53F0\u6B63\u5728\u5BA1\u6838\u60A8\u7684\u7533\u8BF7\uFF0C\u5BA1\u6838\u7ED3\u679C\u5C06\u4EE5\u5E73\u53F0\u6D88\u606F\u7684\u5F62\u5F0F\u901A\u77E5\u60A8'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_educoder__["a" /* ActionBtn */],{className:'toListBtn',onClick:toList},'\u67E5\u770B\u5DF2\u4E0A\u4F20\u89C6\u9891'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_educoder__["a" /* ActionBtn */],{className:'toUploadBtn',onClick:toUpload},'\u7EE7\u7EED\u4E0A\u4F20'))));}/* harmony default export */ __webpack_exports__["default"] = (VideoUpload);

/***/ })

});