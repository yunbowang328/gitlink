webpackJsonp([228],{

/***/ 3454:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABgBAMAAAAnVGd6AAAAHlBMVEVHcExNrf9Prf9Osf9Mrf9Nrf9guP9Orf9Orv9MrP8FsCMcAAAACXRSTlMA7kQqy58Jgljrf+twAAABc0lEQVRYw+2ZoW7DMBCGb0lXjxeFNWgayyNMmlZpbKCaVBZNA8VjZpEKhjs1wG/b2Gky5LvofjTpjvvTV/dqn/8SERX7Kijq/LqlVA9vQVmXLq5fH4K6+nYAfAWgdgPggAD6YQcCVB2tMMAzPWGA37QFfUOKKtNSik3wTqq6j61AsQkbHaCM7Ujxg5Cy0loDGMAABjCAAnD8xgBFFV4gQB0vEQBQxAtoCwDq8S5XA5IAYpAEgD0YBTZ6QBI4N2pARmA5ICOwGJATWAzICTCA9U+3QIAB1OHSygJ5QFmNU7AgkAek+a0VBfKAu2kQ5wXygDQ/3xQYgTzgOL8FWAHmW/CzAifAANykwApwnTgpsAIc4KbAC7C/hVGBF2AB7u9RstHdTH5+oDY6gJMFhPPAiwICwIkC0onkJQEJ4CQB8Uz0goAIGBQ+sAnl8WRTmgEMYIB/BYCjMDiMg+NAOJCEI1E4lIVjYTyYhqNxOJwn+kT+HrgC4ZxMj7df2qIAAAAASUVORK5CYII="

/***/ }),

/***/ 4865:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__images_ok_border_png__ = __webpack_require__(3454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__images_ok_border_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__images_ok_border_png__);
function VideoProtocol(props){var username=props.match.params.username;var search=props.history.location.search;var courseId=search&&search.split("=")[1];return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'educontent videoProtocol'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_educoder__["c" /* CBreadcrumb */],{className:'mb26 mt16',separator:' > ',items:[{to:''+(courseId?'/courses/'+courseId+'/course_videos?open=new':'/users/'+username+'/videos/upload'),name:'视频上传'},{name:'内容上传协议'}]}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('style',null,'\n                .videoProtocol {\n                    margin-bottom: 200px;\n                }   \n                .videoProtocol .title {\n                    padding: 4px 16px;\n                    background: #fff;\n                    margin-bottom: 12px;\n                    margin-top: 30px;\n                    font-size: 16px;\n                    font-weight: bold;\n                }         \n                .videoProtocol .content {\n                    background: #fff;\n                    padding: 30px;    \n                }\n                .videoProtocol .subTitle {\n                    font-size: 16px;\n                    font-weight: bold;\n                }\n                .videoProtocol .p_paragraph {\n                    font-size: 12px;\n                    text-indent: 22.5pt;\n                    margin: 10px 0;\n                }\n                .videoProtocol .p_paragraph.has_child {\n                    margin-bottom: 2px;\n                }\n                .videoProtocol .p_child_paragraph {\n                    font-size: 12px;\n                    text-indent: 40pt;\n                }\n            '),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'title'},'\u5185\u5BB9\u4E0A\u4F20\u534F\u8BAE'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'content'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'subTitle'},'\u4E00\u3001\u603B\u5219'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'1.1 \u7528\u6237\u540C\u610F\u672C\u534F\u8BAE\u7684\u6761\u6B3E\u5E76\u6309\u7167\u9875\u9762\u4E0A\u7684\u63D0\u793A\u5B8C\u6210\u89C6\u9891\u4E0A\u4F20\u6D41\u7A0B\u3002\u7528\u6237\u5728\u70B9\u51FB\u89C6\u9891\u4E0A\u4F20\u7684\u56FE\u6807\u65F6\u5373\u8868\u793A\u5DF2\u9605\u8BFB\u201C\u5185\u5BB9\u4E0A\u4F20\u534F\u8BAE\u201D\u4E0E\u6E56\u5357\u667A\u64CE\u79D1\u6280\u6709\u9650\u516C\u53F8\uFF08\u4EE5\u4E0B\u7B80\u79F0EduCoder\u5E73\u53F0\uFF09\u8FBE\u6210\u534F\u8BAE\uFF0C\u5B8C\u5168\u63A5\u53D7\u672C\u534F\u8BAE\u9879\u4E0B\u5168\u90E8\u6761\u6B3E\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'1.2 \u7528\u6237\u5728EduCoder\u5E73\u53F0\u4E0A\uFF08www.educoder.net\uFF09\u4E0A\u4F20\u89C6\u9891\uFF0C\u5E94\u5F53\u4F7F\u7528\u5DF2\u6CE8\u518C\u7684\u6709\u6548\u7528\u6237\u540D\u548C\u5BC6\u7801\u3002\u8BE5\u7528\u6237\u5E10\u53F7\u548C\u5BC6\u7801\u7531\u7528\u6237\u8D1F\u8D23\u4FDD\u7BA1\uFF0C\u7528\u6237\u4E0D\u5F97\u5C06\u5E10\u53F7\u548C\u5BC6\u7801\u8F6C\u8BA9\u7ED9\u4EFB\u4F55\u7B2C\u4E09\u4EBA\uFF1B\u7528\u6237\u5E94\u5F53\u5BF9\u4EE5\u5176\u7528\u6237\u5E10\u53F7\u8FDB\u884C\u7684\u6240\u6709\u6D3B\u52A8\u548C\u4E8B\u4EF6\u8D1F\u6CD5\u5F8B\u8D23\u4EFB\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'1.3 EduCoder\u5E73\u53F0\u7528\u6237\u5728\u4E0A\u4F20\u89C6\u9891\u65F6\uFF0C\u9664\u9075\u5B88\u672C\u534F\u8BAE\u7684\u89C4\u5B9A\uFF0C\u8FD8\u540C\u65F6\u5E94\u5F53\u9075\u5B88EduCoder\u5E73\u53F0\u7684\u5176\u4ED6\u534F\u8BAE\u548C\u89C4\u5B9A\uFF0C\u4EE5\u53CA\u9075\u5B88\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD\u7684\u6CD5\u5F8B\u6CD5\u89C4\u3002EduCoder\u5E73\u53F0\u4E0A\u4F20\u7528\u6237\u534F\u8BAE\u53CAEduCoder\u5E73\u53F0\u7684\u5176\u4ED6\u534F\u8BAE\uFF0C\u53EF\u7531EduCoder\u5E73\u53F0\u968F\u65F6\u66F4\u65B0\uFF0C\u4E14\u65E0\u9700\u53E6\u884C\u901A\u77E5\u3002\u7528\u6237\u5728\u4F7F\u7528\u76F8\u5173\u670D\u52A1\u65F6\uFF0C\u5E94\u5173\u6CE8\u5E76\u9075\u5B88\u5176\u6240\u9002\u7528\u7684\u76F8\u5173\u6761\u6B3E\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'subTitle'},'\u4E8C\u3001\u5408\u6CD5\u4F7F\u7528\u89C6\u9891\u4E0A\u4F20\u670D\u52A1'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'2.1\u3000\u7528\u6237\u5728\u4F7F\u7528\u89C6\u9891\u4E0A\u4F20\u670D\u52A1\u65F6\uFF0C\u5FC5\u987B\u9075\u5B88\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD\u76F8\u5173\u6CD5\u5F8B\u6CD5\u89C4\u7684\u89C4\u5B9A\uFF0C\u7528\u6237\u540C\u610F\u5C06\u4E0D\u4F1A\u5229\u7528\u672C\u670D\u52A1\u8FDB\u884C\u4EFB\u4F55\u8FDD\u6CD5\u6216\u4E0D\u6B63\u5F53\u7684\u6D3B\u52A8\uFF0C\u5305\u62EC\u4F46\u4E0D\u9650\u4E8E\u4E0A\u4F20\u5305\u542B\u6709\u4E0B\u5217\u5185\u5BB9\u4E4B\u4E00\u7684\u89C6\u9891\u5185\u5BB9\uFF1A'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'1\uFF09\u53CD\u5BF9\u5BAA\u6CD5\u786E\u5B9A\u7684\u57FA\u672C\u539F\u5219\uFF1B2\uFF09\u5371\u5BB3\u56FD\u5BB6\u7EDF\u4E00\u3001\u4E3B\u6743\u548C\u9886\u571F\u5B8C\u6574\u7684\uFF1B3\uFF09\u6CC4\u9732\u56FD\u5BB6\u79D8\u5BC6\u3001\u5371\u5BB3\u56FD\u5BB6\u5B89\u5168\u6216\u8005\u635F\u5BB3\u56FD\u5BB6\u8363\u8A89\u548C\u5229\u76CA\u7684\uFF1B4\uFF09\u717D\u52A8\u6C11\u65CF\u4EC7\u6068\u3001\u6C11\u65CF\u6B67\u89C6\uFF0C\u7834\u574F\u6C11\u65CF\u56E2\u7ED3\uFF0C\u6216\u8005\u4FB5\u5BB3\u6C11\u65CF\u98CE\u4FD7\u3001\u4E60\u60EF\u7684\uFF1B5\uFF09\u5BA3\u626C\u90AA\u6559\u3001\u8FF7\u4FE1\u7684\uFF1B 6\uFF09\u6270\u4E71\u793E\u4F1A\u79E9\u5E8F\uFF0C\u7834\u574F\u793E\u4F1A\u7A33\u5B9A\u7684\uFF1B 7\uFF09\u8BF1\u5BFC\u672A\u6210\u5E74\u4EBA\u8FDD\u6CD5\u72AF\u7F6A\u548C\u6E32\u67D3\u66B4\u529B\u3001\u8272\u60C5\u3001\u8D4C\u535A\u3001\u6050\u6016\u6D3B\u52A8\u7684\uFF1B 8\uFF09\u4FAE\u8FB1\u6216\u8005\u8BFD\u8C24\u4ED6\u4EBA\uFF0C\u4FB5\u5BB3\u516C\u6C11\u4E2A\u4EBA\u9690\u79C1\u7B49\u4ED6\u4EBA\u5408\u6CD5\u6743\u76CA\u7684\uFF1B9\uFF09\u5371\u5BB3\u793E\u4F1A\u516C\u5FB7\uFF0C\u635F\u5BB3\u6C11\u65CF\u4F18\u79C0\u6587\u5316\u4F20\u7EDF\u7684\uFF1B10\uFF09\u975E\u6CD5\u7684\u5E7F\u64AD\u7535\u89C6\u9891\u9053\u3001\u89C6\u542C\u8282\u76EE\u7F51\u7AD9\u63D0\u4F9B\u7684\u975E\u6CD5\u89C6\u9891\u5185\u5BB9\uFF1B11\uFF09\u6709\u5173\u6CD5\u5F8B\u3001\u884C\u653F\u6CD5\u89C4\u548C\u56FD\u5BB6\u89C4\u5B9A\u7981\u6B62\u7684\u5176\u4ED6\u5185\u5BB9\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'2.2 \u7528\u6237\u4E0D\u5F97\u5BF9\u672C\u670D\u52A1\u4EFB\u4F55\u90E8\u5206\u6216\u672C\u670D\u52A1\u4E4B\u4F7F\u7528\u6216\u83B7\u5F97\uFF0C\u8FDB\u884C\u590D\u5236\u3001\u62F7\u8D1D\u3001\u51FA\u552E\u3001\u8F6C\u552E\u6216\u7528\u4E8E\u4EFB\u4F55\u5176\u5B83\u5546\u4E1A\u76EE\u7684\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'2.3 \u7528\u6237\u987B\u5BF9\u81EA\u5DF1\u5728\u4F7F\u7528EduCoder\u5E73\u53F0\u670D\u52A1\u8FC7\u7A0B\u4E2D\u7684\u884C\u4E3A\u627F\u62C5\u6CD5\u5F8B\u8D23\u4EFB\u3002\u7528\u6237\u627F\u62C5\u6CD5\u5F8B\u8D23\u4EFB\u7684\u5F62\u5F0F\u5305\u62EC\u4F46\u4E0D\u9650\u4E8E\uFF1A\u5BF9\u53D7\u5230\u4FB5\u5BB3\u8005\u8FDB\u884C\u8D54\u507F\uFF0C\u4EE5\u53CA\u5728EduCoder\u5E73\u53F0\u9996\u5148\u627F\u62C5\u4E86\u56E0\u7528\u6237\u884C\u4E3A\u5BFC\u81F4\u7684\u884C\u653F\u5904\u7F5A\u6216\u4FB5\u6743\u635F\u5BB3\u8D54\u507F\u8D23\u4EFB\u540E\uFF0C\u7528\u6237\u5E94\u7ED9\u4E88EduCoder\u5E73\u53F0\u7B49\u989D\u7684\u8D54\u507F\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'subTitle'},'\u4E09\u3001\u77E5\u8BC6\u4EA7\u6743\u53CA\u5176\u4ED6\u5408\u6CD5\u6743\u76CA\u4FDD\u62A4'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'3.1 EduCoder\u5E73\u53F0\u63D0\u4F9B\u89C6\u9891\u4E0A\u4F20\u529F\u80FD\u4E13\u4E3A\u7528\u6237\u81EA\u5DF1\u521B\u4F5C\u6216\u4EAB\u6709\u5408\u6CD5\u6765\u6E90\u7684\u4F5C\u54C1\u63D0\u4F9B\u670D\u52A1\u3002EduCoder\u5E73\u53F0\u5C0A\u91CD\u4ED6\u4EBA\u77E5\u8BC6\u4EA7\u6743\u548C\u5408\u6CD5\u6743\u76CA\uFF0C\u8BF7\u7528\u6237\u5728\u4E0A\u4F20\u89C6\u9891\u524D\u786E\u4FDD\u62E5\u6709\u4E0A\u4F20\u7684\u89C6\u9891\u5185\u5BB9\u7684\u8457\u4F5C\u6743\u53CA\u4FE1\u606F\u7F51\u7EDC\u4F20\u64AD\u6743\u6216\u8005\u5DF2\u7ECF\u53D6\u5F97\u4E0A\u8FF0\u5168\u90E8\u6743\u5229\u4EBA\u7684\u8BB8\u53EF\uFF1B'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'3.2 \u7528\u6237\u5E94\u786E\u4FDD\u4E0A\u4F20\u7684\u89C6\u9891\u5185\u5BB9\uFF0C\u5DF2\u7ECF\u83B7\u5F97\u88AB\u62CD\u6444\u4EBA\uFF08\u5982\u6709\uFF09\u7684\u8BB8\u53EF\uFF0C\u5E76\u786E\u4FDD\u89C6\u9891\u5185\u5BB9\u6CA1\u6709\u4FB5\u72AF\u4ED6\u4EBA\u7684\u4EBA\u8EAB\u6743\uFF0C\u5305\u62EC\u4F46\u4E0D\u9650\u4E8E\u540D\u8A89\u6743\u3001\u8096\u50CF\u6743\u3001\u9690\u79C1\u6743\u3001\u59D3\u540D\u6743\uFF0C\u4E0D\u5B58\u5728\u4EFB\u4F55\u8457\u4F5C\u6743\u7EA0\u7EB7\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'subTitle'},'\u56DB\u3001\u670D\u52A1\u98CE\u9669\u53CA\u514D\u8D39\u58F0\u660E'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'4.1 \u7528\u6237\u5B8C\u5168\u7406\u89E3\u5E76\u540C\u610F\uFF0C\u672C\u670D\u52A1\u6D89\u53CA\u5230\u4E92\u8054\u7F51\u53CA\u79FB\u52A8\u901A\u8BAF\u7B49\u670D\u52A1\uFF0C\u53EF\u80FD\u4F1A\u53D7\u5230\u5404\u4E2A\u73AF\u8282\u4E0D\u7A33\u5B9A\u56E0\u7D20\u7684\u5F71\u54CD\u3002\u56E0\u6B64\u670D\u52A1\u5B58\u5728\u56E0\u4E0A\u8FF0\u4E0D\u53EF\u6297\u529B\u3001\u8BA1\u7B97\u673A\u75C5\u6BD2\u6216\u9ED1\u5BA2\u653B\u51FB\u3001\u7CFB\u7EDF\u4E0D\u7A33\u5B9A\u3001\u7528\u6237\u6240\u5728\u4F4D\u7F6E\u3001\u7528\u6237\u5173\u673A\u3001GSM\u7F51\u7EDC\u3001\u4E92\u8054\u7F51\u7EDC\u3001\u901A\u4FE1\u7EBF\u8DEF\u539F\u56E0\u7B49\u9020\u6210\u7684\u670D\u52A1\u4E2D\u65AD\u6216\u4E0D\u80FD\u6EE1\u8DB3\u7528\u6237\u8981\u6C42\u7684\u98CE\u9669\u3002\u4F7F\u7528\u672C\u670D\u52A1\u7684\u7528\u6237\u987B\u627F\u62C5\u4EE5\u4E0A\u98CE\u9669\uFF0CEduCoder\u5E73\u53F0\u5BF9\u670D\u52A1\u4E4B\u53CA\u65F6\u6027\u3001\u5B89\u5168\u6027\u3001\u51C6\u786E\u6027\u4E0D\u4F5C\u62C5\u4FDD\uFF0C\u5BF9\u56E0\u6B64\u5BFC\u81F4\u7528\u6237\u4E0D\u80FD\u53D1\u9001\u548C\u63A5\u53D7\u9605\u8BFB\u6D88\u606F\u3001\u6216\u4F20\u9012\u9519\u8BEF\uFF0C\u4E2A\u4EBA\u8BBE\u5B9A\u4E4B\u65F6\u6548\u3001\u672A\u4E88\u50A8\u5B58\u6216\u5176\u4ED6\u95EE\u9898\u4E0D\u627F\u62C5\u4EFB\u4F55\u8D23\u4EFB\u3002\u5BF9\u4E8E\u4E0D\u53EF\u6297\u529B\u6216\u975EEduCoder\u5E73\u53F0\u8FC7\u9519\u539F\u56E0\u5BFC\u81F4\u7684\u7528\u6237\u6570\u636E\u635F\u5931\u3001\u4E22\u5931\u6216\u670D\u52A1\u505C\u6B62\uFF0CEduCoder\u5E73\u53F0\u5C06\u4E0D\u627F\u62C5\u4EFB\u4F55\u8D23\u4EFB\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'4.2 \u5BF9\u4E8E\u7CFB\u7EDF\u53D1\u751F\u6545\u969C\u5F71\u54CD\u5230\u672C\u670D\u52A1\u7684\u6B63\u5E38\u8FD0\u884C\uFF0CEduCoder\u5E73\u53F0\u627F\u8BFA\u53CA\u65F6\u5904\u7406\u8FDB\u884C\u4FEE\u590D\u3002\u4F46\u7528\u6237\u56E0\u6B64\u800C\u4EA7\u751F\u7684\u7ECF\u6D4E\u548C\u7CBE\u795E\u635F\u5931\uFF0CEduCoder\u5E73\u53F0\u4E0D\u627F\u62C5\u8D23\u4EFB\u3002\u6B64\u5916\uFF0CEduCoder\u5E73\u53F0\u4FDD\u7559\u4E0D\u7ECF\u4E8B\u5148\u901A\u77E5\u4E3A\u7EF4\u4FEE\u4FDD\u517B\u3001\u5347\u7EA7\u6216\u5176\u4ED6\u76EE\u7684\u6682\u505C\u672C\u670D\u52A1\u4EFB\u4F55\u90E8\u5206\u7684\u6743\u5229\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'4.3 EduCoder\u5E73\u53F0\u90D1\u91CD\u63D0\u8BF7\u60A8\u6CE8\u610F\uFF0C\u4EFB\u4F55\u7ECF\u7531\u672C\u670D\u52A1\u4E0A\u4F20\u7684\u89C6\u9891\u5185\u5BB9\uFF0C\u5747\u7531\u5185\u5BB9\u63D0\u4F9B\u8005\u627F\u62C5\u8D23\u4EFB\u3002EduCoder\u5E73\u53F0\u65E0\u6CD5\u63A7\u5236\u7ECF\u7531\u672C\u670D\u52A1\u4E0A\u8F7D\u4E4B\u5185\u5BB9\uFF0C\u4E5F\u65E0\u6CD5\u5BF9\u7528\u6237\u7684\u4F7F\u7528\u884C\u4E3A\u8FDB\u884C\u5168\u9762\u63A7\u5236\uFF0C\u56E0\u6B64\u4E0D\u4FDD\u8BC1\u5185\u5BB9\u7684\u5408\u6CD5\u6027\u3001\u6B63\u786E\u6027\u3001\u5B8C\u6574\u6027\u3001\u771F\u5B9E\u6027\u6216\u54C1\u8D28\uFF1B\u60A8\u5DF2\u9884\u77E5\u4F7F\u7528\u672C\u670D\u52A1\u65F6\uFF0C\u53EF\u80FD\u4F1A\u63A5\u89E6\u5230\u4EE4\u4EBA\u4E0D\u5FEB\u3001\u4E0D\u9002\u5F53\u6216\u4EE4\u4EBA\u538C\u6076\u4E4B\u5185\u5BB9\uFF0C\u5E76\u540C\u610F\u5C06\u81EA\u884C\u52A0\u4EE5\u5224\u65AD\u5E76\u627F\u62C5\u6240\u6709\u98CE\u9669\uFF0C\u800C\u4E0D\u4F9D\u8D56\u4E8EEduCoder\u5E73\u53F0\u3002\u4F46\u5728\u4EFB\u4F55\u60C5\u51B5\u4E0B\uFF0CEduCoder\u5E73\u53F0\u6709\u6743\u4F9D\u6CD5\u505C\u6B62\u4F20\u8F93\u4EFB\u4F55\u524D\u8FF0\u5185\u5BB9\u5E76\u91C7\u53D6\u76F8\u5E94\u884C\u52A8\uFF0C\u5305\u62EC\u4F46\u4E0D\u9650\u4E8E\u6682\u505C\u7528\u6237\u4F7F\u7528\u672C\u670D\u52A1\u7684\u5168\u90E8\u6216\u90E8\u5206\uFF0C\u4FDD\u5B58\u6709\u5173\u8BB0\u5F55\uFF0C\u5E76\u5411\u6709\u5173\u673A\u5173\u62A5\u544A\u3002EduCoder\u5E73\u53F0\u6709\u6743(\u4F46\u65E0\u4E49\u52A1)\u4F9D\u5176\u81EA\u884C\u4E4B\u8003\u91CF\uFF0C\u62D2\u7EDD\u548C\u5220\u9664\u53EF\u7ECF\u7531\u672C\u670D\u52A1\u63D0\u4F9B\u4E4B\u8FDD\u53CD\u672C\u6761\u6B3E\u7684\u6216\u5176\u4ED6\u5F15\u8D77EduCoder\u5E73\u53F0\u6216\u5176\u4ED6\u7528\u6237\u53CD\u611F\u7684\u4EFB\u4F55\u5185\u5BB9\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'4.4 \u7528\u6237\u5B8C\u5168\u7406\u89E3\u5E76\u540C\u610F\uFF0C\u82E5\u7B2C\u4E09\u65B9\u5728\u60A8\u4E0D\u77E5\u60C5\u6216\u672A\u7ECF\u60A8\u540C\u610F\u7684\u524D\u63D0\u4E0B\uFF0C\u5C06\u60A8\u7684\u89C6\u9891\u4F5C\u54C1\u4E0A\u4F20\u4E8EEduCoder\u5E73\u53F0\u53CA\u7531\u6B64\u6240\u4EA7\u751F\u7684\u4EFB\u4F55\u53EF\u80FD\u4FB5\u5BB3\u60A8\u6743\u76CA\u7684\u884C\u4E3A\uFF0CEduCoder\u5E73\u53F0\u5747\u4E0D\u5BF9\u4EFB\u4F55\u4EBA\u627F\u62C5\u4EFB\u4F55\u8D23\u4EFB\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'4.5 \u7528\u6237\u5B8C\u5168\u7406\u89E3\u5E76\u540C\u610F\uFF0C\u7B2C\u4E09\u65B9\u53EF\u4EE5\u901A\u8FC7\u8BBF\u95EEEduCoder\u5E73\u53F0\u7F51\u7AD9\u800C\u83B7\u5F97educoder\u5E73\u53F0\u4E2D\u7684\u76F8\u5173\u4FE1\u606F\uFF0C\u5E76\u53EF\u5BF9\u4FE1\u606F\u8FDB\u884C\u4F7F\u7528\u884C\u4E3A\u3002\u5BF9\u7528\u6237\u6216\u7B2C\u4E09\u65B9\u4EE5\u4EFB\u4F55\u65B9\u5F0F\u8FDB\u884C\u7684\u4F7F\u7528\u53EF\u80FD\u4FB5\u5BB3\u60A8\u6743\u76CA\u7684\u884C\u4E3A\uFF0CEduCoder\u5E73\u53F0\u5747\u4E0D\u5BF9\u4EFB\u4F55\u4EBA\u627F\u62C5\u4EFB\u4F55\u8D23\u4EFB\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph has_child'},'4.6 \u5982\u53D1\u751F\u4E0B\u5217\u4EFB\u4F55\u4E00\u79CD\u60C5\u5F62\uFF0CEduCoder\u5E73\u53F0\u6709\u6743\u968F\u65F6\u4E2D\u65AD\u6216\u7EC8\u6B62\u5411\u7528\u6237\u63D0\u4F9B\u670D\u52A1\u800C\u65E0\u9700\u901A\u77E5\u8BE5\u7528\u6237\uFF1A'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_child_paragraph'},'4.6.1 \u7528\u6237\u63D0\u4F9B\u7684\u4E2A\u4EBA\u8D44\u6599\u4E0D\u771F\u5B9E\uFF1B'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_child_paragraph'},'4.6.2 \u7528\u6237\u8FDD\u53CD\u672C\u670D\u52A1\u6761\u6B3E\u7684\u89C4\u5B9A\uFF1B'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_child_paragraph'},'4.6.3 \u6309\u7167\u4E3B\u7BA1\u90E8\u95E8\u7684\u8981\u6C42\uFF1B'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_child_paragraph'},'4.6.4 EduCoder\u5E73\u53F0\u6536\u5230\u7B2C\u4E09\u65B9\u6295\u8BC9\u4E14\u8BE5\u7B2C\u4E09\u65B9\u51FA\u5177\u76F8\u5E94\u8BC1\u636E\u7684\uFF1B'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_child_paragraph'},'4.6.5 \u5176\u4ED6EduCoder\u5E73\u53F0\u8BA4\u4E3A\u662F\u7B26\u5408\u6574\u4F53\u670D\u52A1\u9700\u6C42\u7684\u7279\u6B8A\u60C5\u5F62\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'subTitle'},'\u4E94\u3001\u8FDD\u7EA6\u89C6\u9891\u7684\u5904\u7406\u539F\u5219 \u3000\u3000'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'5.1 \u5982\u7528\u6237\u5728\u4F7F\u7528\u89C6\u9891\u4E0A\u4F20\u670D\u52A1\u65F6\u8FDD\u53CD\u4EFB\u4F55\u4E0A\u8FF0\u89C4\u5B9A\uFF0CEduCoder\u5E73\u53F0\u6216\u5176\u6388\u6743\u7684\u4EBA\u6709\u6743\u8981\u6C42\u7528\u6237\u6539\u6B63\u6216\u4E0D\u7ECF\u901A\u77E5\u76F4\u63A5\u91C7\u53D6\u4E00\u5207\u5FC5\u8981\u7684\u63AA\u65BD\uFF08\u5305\u62EC\u4F46\u4E0D\u9650\u4E8E\u5220\u9664\u4E0A\u4F20\u7684\u89C6\u9891\u5185\u5BB9\uFF09\u4EE5\u51CF\u8F7B\u548C\u6D88\u9664\u7528\u6237\u4E0D\u5F53\u884C\u4E3A\u9020\u6210\u7684\u5F71\u54CD\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'5.2 \u5982EduCoder\u5E73\u53F0\u8BA4\u4E3A\u7528\u6237\u7684\u89C6\u9891\u4E0A\u4F20\u884C\u4E3A\u4E25\u91CD\u8FDD\u53CD\u4E86\u672C\u534F\u8BAE\uFF0C\u5E76\u7ED9EduCoder\u5E73\u53F0\u9020\u6210\u4E86\u635F\u5BB3\uFF0CEduCoder\u5E73\u53F0\u65E0\u9700\u8FDB\u884C\u4E8B\u5148\u901A\u77E5\u5373\u53EF\u7EC8\u6B62\u7528\u6237\u7684\u5BC6\u7801\u3001\u5E10\u53F7\u6216\u672C\u670D\u52A1\u4E4B\u4F7F\u7528\uFF0C\u4E14EduCoder\u5E73\u53F0\u5BF9\u7528\u6237\u6216\u4EFB\u4F55\u7B2C\u4E09\u4EBA\u5747\u4E0D\u627F\u62C5\u4EFB\u4F55\u8D23\u4EFB\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'5.3 EduCoder\u5E73\u53F0\u6709\u6743\u542F\u52A8\u5FC5\u8981\u7684\u5211\u4E8B\u53CA\u6C11\u4E8B\u6CD5\u5F8B\u7A0B\u5E8F\uFF0C\u7EF4\u62A4EduCoder\u5E73\u53F0\u7684\u5408\u6CD5\u6743\u76CA\uFF0C\u8FFD\u7A76\u8FDD\u6CD5\u7528\u6237\u7684\u6CD5\u5F8B\u8D23\u4EFB\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'subTitle'},'\u516D\u3001\u534F\u8BAE\u4FEE\u6539 \u3000\u3000'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'6.1 EduCoder\u5E73\u53F0\u6709\u6743\u968F\u65F6\u4FEE\u6539\u672C\u534F\u8BAE\u7684\u4EFB\u4F55\u6761\u6B3E\uFF0C\u4E00\u65E6\u672C\u534F\u8BAE\u7684\u5185\u5BB9\u53D1\u751F\u53D8\u52A8\uFF0CEduCoder\u5E73\u53F0\u5C06\u4F1A\u901A\u8FC7\u9002\u5F53\u65B9\u5F0F\u5411\u7528\u6237\u63D0\u793A\u4FEE\u6539\u5185\u5BB9\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'6.2 \u5982\u679C\u4E0D\u540C\u610FEduCoder\u5E73\u53F0\u5BF9\u672C\u534F\u8BAE\u76F8\u5173\u6761\u6B3E\u6240\u505A\u7684\u4FEE\u6539\uFF0C\u7528\u6237\u6709\u6743\u505C\u6B62\u4F7F\u7528\u7F51\u7EDC\u670D\u52A1\u3002\u5982\u679C\u7528\u6237\u7EE7\u7EED\u4F7F\u7528\u7F51\u7EDC\u670D\u52A1\uFF0C\u5219\u89C6\u4E3A\u7528\u6237\u63A5\u53D7EduCoder\u5E73\u53F0\u5BF9\u672C\u534F\u8BAE\u76F8\u5173\u6761\u6B3E\u6240\u505A\u7684\u4FEE\u6539\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'subTitle'},'\u4E03\u3001\u901A\u77E5\u9001\u8FBE\u3000\u3000'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'7.1 \u672C\u534F\u8BAE\u9879\u4E0BEduCoder\u5E73\u53F0\u5BF9\u4E8E\u7528\u6237\u6240\u6709\u7684\u901A\u77E5\u5747\u53EF\u901A\u8FC7\u516C\u544A\u3001\u7535\u5B50\u90AE\u4EF6\u3001\u6216\u5E38\u89C4\u7684\u4FE1\u4EF6\u4F20\u9001\u7B49\u65B9\u5F0F\u8FDB\u884C\uFF1B\u8BE5\u7B49\u901A\u77E5\u4E8E\u53D1\u9001\u4E4B\u65E5\u89C6\u4E3A\u5DF2\u9001\u8FBE\u6536\u4EF6\u4EBA\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'7.2 \u7528\u6237\u5BF9\u4E8EEduCoder\u5E73\u53F0\u7684\u901A\u77E5\u5E94\u5F53\u901A\u8FC7EduCoder\u5E73\u53F0\u7F51\u7AD9\u516C\u5E03\u7684\u901A\u4FE1\u5730\u5740\u3001\u4F20\u771F\u53F7\u7801\u3001\u7535\u5B50\u90AE\u4EF6\u5730\u5740\u7B49\u8054\u7CFB\u4FE1\u606F\u8FDB\u884C\u9001\u8FBE\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'subTitle'},'\u516B\u3001\u5176\u4ED6\u3000\u3000'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'8.1\u3000\u672C\u534F\u8BAE\u7684\u8BA2\u7ACB\u3001\u6267\u884C\u548C\u89E3\u91CA\u53CA\u4E89\u8BAE\u7684\u89E3\u51B3\u5747\u5E94\u9002\u7528\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD\u6CD5\u5F8B\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'8.2 \u5982\u53CC\u65B9\u5C31\u672C\u534F\u8BAE\u5185\u5BB9\u6216\u5176\u6267\u884C\u53D1\u751F\u4EFB\u4F55\u4E89\u8BAE\uFF0C\u53CC\u65B9\u5E94\u5C3D\u91CF\u53CB\u597D\u534F\u5546\u89E3\u51B3\uFF1B\u534F\u5546\u4E0D\u6210\u65F6\uFF0C\u4EFB\u4F55\u4E00\u65B9\u5747\u53EF\u5411EduCoder\u5E73\u53F0\u6240\u5728\u5730\u7684\u4EBA\u6C11\u6CD5\u9662\u63D0\u8D77\u8BC9\u8BBC\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'8.3 EduCoder\u5E73\u53F0\u672A\u884C\u4F7F\u6216\u6267\u884C\u672C\u670D\u52A1\u534F\u8BAE\u4EFB\u4F55\u6743\u5229\u6216\u89C4\u5B9A\uFF0C\u4E0D\u6784\u6210\u5BF9\u524D\u8FF0\u6743\u5229\u6216\u6743\u5229\u4E4B\u653E\u5F03\u3002'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'p_paragraph'},'8.4 \u5982\u672C\u534F\u8BAE\u4E2D\u7684\u4EFB\u4F55\u6761\u6B3E\u65E0\u8BBA\u56E0\u4F55\u79CD\u539F\u56E0\u5B8C\u5168\u6216\u90E8\u5206\u65E0\u6548\u6216\u4E0D\u5177\u6709\u6267\u884C\u529B\uFF0C\u672C\u534F\u8BAE\u7684\u5176\u4F59\u6761\u6B3E\u4ECD\u5E94\u6709\u6548\u5E76\u4E14\u6709\u7EA6\u675F\u529B\u3002')));}/* harmony default export */ __webpack_exports__["default"] = (VideoProtocol);

/***/ })

});