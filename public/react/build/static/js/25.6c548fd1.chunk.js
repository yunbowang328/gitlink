webpackJsonp([25],{

/***/ 1830:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "monaco", {
  enumerable: true,
  get: function get() {
    return _monaco["default"];
  }
});
Object.defineProperty(exports, "noop", {
  enumerable: true,
  get: function get() {
    return _noop["default"];
  }
});
Object.defineProperty(exports, "deepMerge", {
  enumerable: true,
  get: function get() {
    return _deepMerge["default"];
  }
});

var _monaco = _interopRequireDefault(__webpack_require__(3246));

var _noop = _interopRequireDefault(__webpack_require__(3248));

var _deepMerge = _interopRequireDefault(__webpack_require__(3249));

/***/ }),

/***/ 2056:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DiffEditor", {
  enumerable: true,
  get: function get() {
    return _DiffEditor["default"];
  }
});
Object.defineProperty(exports, "ControlledEditor", {
  enumerable: true,
  get: function get() {
    return _ControlledEditor["default"];
  }
});
Object.defineProperty(exports, "monaco", {
  enumerable: true,
  get: function get() {
    return _utils.monaco;
  }
});
exports["default"] = void 0;

var _Editor = _interopRequireDefault(__webpack_require__(3234));

var _DiffEditor = _interopRequireDefault(__webpack_require__(3252));

var _ControlledEditor = _interopRequireDefault(__webpack_require__(3254));

var _utils = __webpack_require__(1830);

var _default = _Editor["default"];
exports["default"] = _default;

/***/ }),

/***/ 2316:
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(3236);

var iterableToArrayLimit = __webpack_require__(3237);

var nonIterableRest = __webpack_require__(3241);

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),

/***/ 2317:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = __webpack_require__(0);

var _MonacoContainer = _interopRequireDefault(__webpack_require__(3242));

var _default = (0, _react.memo)(_MonacoContainer["default"]);

exports["default"] = _default;

/***/ }),

/***/ 2318:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "useMount", {
  enumerable: true,
  get: function get() {
    return _useMount["default"];
  }
});
Object.defineProperty(exports, "useUpdate", {
  enumerable: true,
  get: function get() {
    return _useUpdate["default"];
  }
});

var _useMount = _interopRequireDefault(__webpack_require__(3250));

var _useUpdate = _interopRequireDefault(__webpack_require__(3251));

/***/ }),

/***/ 2319:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var themes = {
  'night-dark': {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#202124'
    }
  }
};
var _default = themes;
exports["default"] = _default;

/***/ }),

/***/ 2368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export UserInfo */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_scss__ = __webpack_require__(2369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_educoder__ = __webpack_require__(5);
/*
 * @Description: 用户头像及昵称
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-09 17:11:28
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-09 17:36:55
 */function UserInfo(props){var _props$userInfo=props.userInfo,image_url=_props$userInfo.image_url,name=_props$userInfo.name;return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div',{className:'avator_nicker'},__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('img',{style:{display:image_url?'inline-block':'none'},alt:'\u7528\u6237\u5934\u50CF',className:'student_img',src:Object(__WEBPACK_IMPORTED_MODULE_2_educoder__["M" /* getImageUrl */])('images/'+image_url||'images/educoder/headNavLogo.png?1526520218')}),__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('span',{className:'student_nicker'},name||''));}/* harmony default export */ __webpack_exports__["a"] = (UserInfo);

/***/ }),

/***/ 2369:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2370);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(317)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--1-oneOf-3-1!../../../../../node_modules/sass-loader/dist/cjs.js!./index.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--1-oneOf-3-1!../../../../../node_modules/sass-loader/dist/cjs.js!./index.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 2370:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(316)(true);
// imports


// module
exports.push([module.i, ".avator_nicker{position:absolute;color:#fff;line-height:65px;left:20px}.avator_nicker .student_img,.avator_nicker .student_nicker{display:inline-block;vertical-align:top}.avator_nicker .student_nicker{margin-left:10px}.avator_nicker .student_img{width:30px;height:30px;border-radius:50%;margin-top:15px}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/src/modules/developer/components/userInfo/index.scss"],"names":[],"mappings":"AAAA,eAAe,kBAAkB,WAAW,iBAAiB,SAAS,CAAC,2DAA2D,qBAAqB,kBAAkB,CAAC,+BAA+B,gBAAgB,CAAC,4BAA4B,WAAW,YAAY,kBAAkB,eAAe,CAAC","file":"index.scss","sourcesContent":[".avator_nicker{position:absolute;color:#fff;line-height:65px;left:20px}.avator_nicker .student_img,.avator_nicker .student_nicker{display:inline-block;vertical-align:top}.avator_nicker .student_nicker{margin-left:10px}.avator_nicker .student_img{width:30px;height:30px;border-radius:50%;margin-top:15px}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 3234:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = __webpack_require__(0);

var _Editor = _interopRequireDefault(__webpack_require__(3235));

var _default = (0, _react.memo)(_Editor["default"]);

exports["default"] = _default;

/***/ }),

/***/ 3235:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(119);

var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(21));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(2316));

var _react = _interopRequireWildcard(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(1));

var _MonacoContainer = _interopRequireDefault(__webpack_require__(2317));

var _utils = __webpack_require__(1830);

var _hooks = __webpack_require__(2318);

var _themes = _interopRequireDefault(__webpack_require__(2319));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Editor = function Editor(_ref) {
  var value = _ref.value,
      language = _ref.language,
      editorDidMount = _ref.editorDidMount,
      theme = _ref.theme,
      line = _ref.line,
      width = _ref.width,
      height = _ref.height,
      loading = _ref.loading,
      options = _ref.options,
      _isControlledMode = _ref._isControlledMode;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      isEditorReady = _useState2[0],
      setIsEditorReady = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      isMonacoMounting = _useState4[0],
      setIsMonacoMounting = _useState4[1];

  var editorRef = (0, _react.useRef)();
  var monacoRef = (0, _react.useRef)();
  var containerRef = (0, _react.useRef)();
  (0, _hooks.useMount)(function (_) {
    _utils.monaco.init().then(function (monaco) {
      return (monacoRef.current = monaco) && setIsMonacoMounting(false);
    })["catch"](function (error) {
      return console.error('An error occurred during initialization of Monaco: ', error);
    });

    return removeEditor;
  });
  (0, _hooks.useUpdate)(function (_) {
    if (options.readOnly) {
      editorRef.current.setValue(value);
    } else {
      editorRef.current.executeEdits('', [{
        range: editorRef.current.getModel().getFullModelRange(),
        text: value
      }]);

      if (_isControlledMode) {
        var model = editorRef.current.getModel();
        model.forceTokenization(model.getLineCount());
      }

      editorRef.current.pushUndoStop();
    }
  }, [value], isEditorReady);
  (0, _hooks.useUpdate)(function (_) {
    // set last value by .setValue method before changing the language
    editorRef.current.setValue(value);
    monacoRef.current.editor.setModelLanguage(editorRef.current.getModel(), language);
  }, [language], isEditorReady);
  (0, _hooks.useUpdate)(function (_) {
    editorRef.current.setScrollPosition({
      scrollTop: line
    });
  }, [line], isEditorReady);
  (0, _hooks.useUpdate)(function (_) {
    monacoRef.current.editor.setTheme(theme);
  }, [theme], isEditorReady);
  (0, _hooks.useUpdate)(function (_) {
    editorRef.current.updateOptions(options);
  }, [options], isEditorReady);
  var createEditor = (0, _react.useCallback)(function (_) {
    editorRef.current = monacoRef.current.editor.create(containerRef.current, _objectSpread({
      value: value,
      language: language,
      automaticLayout: true
    }, options));
    editorDidMount(editorRef.current.getValue.bind(editorRef.current), editorRef.current);
    monacoRef.current.editor.defineTheme('dark', _themes["default"]['night-dark']);
    monacoRef.current.editor.setTheme(theme);
    setIsEditorReady(true);
  }, [editorDidMount, language, options, theme, value]);
  (0, _react.useEffect)(function (_) {
    !isMonacoMounting && !isEditorReady && createEditor();
  }, [isMonacoMounting, isEditorReady, createEditor]);

  var removeEditor = function removeEditor(_) {
    return editorRef.current && editorRef.current.dispose();
  };

  return _react["default"].createElement(_MonacoContainer["default"], {
    width: width,
    height: height,
    isEditorReady: isEditorReady,
    loading: loading,
    _ref: containerRef
  });
};

Editor.propTypes = {
  value: _propTypes["default"].string,
  language: _propTypes["default"].string,
  editorDidMount: _propTypes["default"].func,
  theme: _propTypes["default"].string,
  line: _propTypes["default"].number,
  width: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  height: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  loading: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].string]),
  options: _propTypes["default"].object,
  _isControlledMode: _propTypes["default"].bool
};
Editor.defaultProps = {
  editorDidMount: _utils.noop,
  theme: 'light',
  width: '100%',
  height: '100%',
  loading: 'Loading...',
  options: {},
  _isControlledMode: false
};
var _default = Editor;
exports["default"] = _default;

/***/ }),

/***/ 3236:
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),

/***/ 3237:
/***/ (function(module, exports, __webpack_require__) {

var _getIterator = __webpack_require__(3238);

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = _getIterator(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),

/***/ 3238:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3239);

/***/ }),

/***/ 3239:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(123);
__webpack_require__(96);
module.exports = __webpack_require__(3240);


/***/ }),

/***/ 3240:
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(53);
var get = __webpack_require__(205);
module.exports = __webpack_require__(16).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),

/***/ 3241:
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;

/***/ }),

/***/ 3242:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(21));

var _react = _interopRequireDefault(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(1));

var _Loading = _interopRequireDefault(__webpack_require__(3243));

var _styles = _interopRequireDefault(__webpack_require__(3245));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ** forwardref render functions do not support proptypes or defaultprops **
// one of the reasons why we use a separate prop for passing ref instead of using forwardref
var MonacoContainer = function MonacoContainer(_ref2) {
  var width = _ref2.width,
      height = _ref2.height,
      isEditorReady = _ref2.isEditorReady,
      loading = _ref2.loading,
      _ref = _ref2._ref;
  return _react["default"].createElement("section", {
    style: _objectSpread({}, _styles["default"].wrapper, {
      width: width,
      height: height
    })
  }, !isEditorReady && _react["default"].createElement(_Loading["default"], {
    content: loading
  }), _react["default"].createElement("div", {
    ref: _ref,
    style: _objectSpread({}, _styles["default"].fullWidth, {}, !isEditorReady && _styles["default"].hide)
  }));
};

MonacoContainer.propTypes = {
  width: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]).isRequired,
  height: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]).isRequired,
  loading: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].string]).isRequired,
  isEditorReady: _propTypes["default"].bool.isRequired
};
var _default = MonacoContainer;
exports["default"] = _default;

/***/ }),

/***/ 3243:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Loading = _interopRequireDefault(__webpack_require__(3244));

var _default = _Loading["default"];
exports["default"] = _default;

/***/ }),

/***/ 3244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var loadingStyles = {
  display: 'flex',
  height: '100%',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center'
};

function Loading(_ref) {
  var content = _ref.content;
  return _react["default"].createElement("div", {
    style: loadingStyles
  }, content);
}

var _default = Loading;
exports["default"] = _default;

/***/ }),

/***/ 3245:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var styles = {
  wrapper: {
    display: 'flex',
    position: 'relative',
    textAlign: 'initial'
  },
  fullWidth: {
    width: '100%'
  },
  hide: {
    display: 'none'
  }
};
var _default = styles;
exports["default"] = _default;

/***/ }),

/***/ 3246:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(17));

var _createClass2 = _interopRequireDefault(__webpack_require__(18));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(21));

var _config2 = _interopRequireDefault(__webpack_require__(3247));

var _utils = __webpack_require__(1830);

var Monaco =
/*#__PURE__*/
function () {
  function Monaco() {
    var _this = this;

    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Monaco);
    (0, _defineProperty2["default"])(this, "handleMainScriptLoad", function (_) {
      document.removeEventListener('monaco_init', _this.handleMainScriptLoad);

      _this.resolve(window.monaco);
    });
    (0, _defineProperty2["default"])(this, "isInitialized", false);
    (0, _defineProperty2["default"])(this, "wrapperPromise", new Promise(function (res, rej) {
      _this.resolve = res;
      _this.reject = rej;
    }));
    this.__config = config;
  }

  (0, _createClass2["default"])(Monaco, [{
    key: "config",
    value: function config(_config) {
      if (_config) {
        this.__config = (0, _utils.deepMerge)(this.__config, _config);
      }

      return this;
    }
  }, {
    key: "injectScripts",
    value: function injectScripts(script) {
      document.body.appendChild(script);
    }
  }, {
    key: "createScript",
    value: function createScript(src) {
      var script = document.createElement('script');
      return src && (script.src = src), script;
    }
  }, {
    key: "createMonacoLoaderScript",
    value: function createMonacoLoaderScript(mainScript) {
      var _this2 = this;

      var loaderScript = this.createScript(this.__config.urls.monacoLoader);

      loaderScript.onload = function (_) {
        return _this2.injectScripts(mainScript);
      };

      loaderScript.onerror = this.reject;
      return loaderScript;
    }
  }, {
    key: "createMainScript",
    value: function createMainScript() {
      var mainScript = this.createScript();
      mainScript.innerHTML = "\n      require.config({ paths: { 'vs': '".concat(this.__config.urls.monacoBase, "' } });\n      require(['vs/editor/editor.main'], function() {\n        document.dispatchEvent(new Event('monaco_init'));\n      });\n    ");
      mainScript.onerror = this.reject;
      return mainScript;
    }
  }, {
    key: "init",
    value: function init() {
      if (!this.isInitialized) {
        if (window.monaco && window.monaco.editor) {
          return new Promise(function (res, rej) {
            return res(window.monaco);
          });
        }

        document.addEventListener('monaco_init', this.handleMainScriptLoad);
        var mainScript = this.createMainScript();
        var loaderScript = this.createMonacoLoaderScript(mainScript);
        this.injectScripts(loaderScript);
      }

      this.isInitialized = true;
      return this.wrapperPromise;
    }
  }]);
  return Monaco;
}();

var _default = new Monaco(_config2["default"]);

exports["default"] = _default;

/***/ }),

/***/ 3247:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var config = {
  urls: {
    monacoLoader: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.18.1/min/vs/loader.js',
    monacoBase: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.18.1/min/vs'
  }
};
var _default = config;
exports["default"] = _default;

/***/ }),

/***/ 3248:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var noop = function noop(_) {};

var _default = noop;
exports["default"] = _default;

/***/ }),

/***/ 3249:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(21));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var merge = function merge(target, source) {
  Object.keys(source).forEach(function (key) {
    if (source[key] instanceof Object) Object.assign(source[key], merge(target[key], source[key]));
  });
  return _objectSpread({}, target, {}, source);
};

var _default = merge;
exports["default"] = _default;

/***/ }),

/***/ 3250:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = __webpack_require__(0);

var useMount = function useMount(effect) {
  return (0, _react.useEffect)(effect, []);
};

var _default = useMount;
exports["default"] = _default;

/***/ }),

/***/ 3251:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = __webpack_require__(0);

var useUpdate = function useUpdate(effect, deps) {
  var applyChanges = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var isInitialMount = (0, _react.useRef)(true);
  (0, _react.useEffect)(isInitialMount.current || !applyChanges ? function (_) {
    isInitialMount.current = false;
  } : effect, deps);
};

var _default = useUpdate;
exports["default"] = _default;

/***/ }),

/***/ 3252:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = __webpack_require__(0);

var _DiffEditor = _interopRequireDefault(__webpack_require__(3253));

var _default = (0, _react.memo)(_DiffEditor["default"]);

exports["default"] = _default;

/***/ }),

/***/ 3253:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(119);

var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(21));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(2316));

var _react = _interopRequireWildcard(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(1));

var _MonacoContainer = _interopRequireDefault(__webpack_require__(2317));

var _utils = __webpack_require__(1830);

var _hooks = __webpack_require__(2318);

var _themes = _interopRequireDefault(__webpack_require__(2319));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var DiffEditor = function DiffEditor(_ref) {
  var original = _ref.original,
      modified = _ref.modified,
      language = _ref.language,
      originalLanguage = _ref.originalLanguage,
      modifiedLanguage = _ref.modifiedLanguage,
      editorDidMount = _ref.editorDidMount,
      theme = _ref.theme,
      line = _ref.line,
      width = _ref.width,
      height = _ref.height,
      loading = _ref.loading,
      options = _ref.options;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      isEditorReady = _useState2[0],
      setIsEditorReady = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      isMonacoMounting = _useState4[0],
      setIsMonacoMounting = _useState4[1];

  var editorRef = (0, _react.useRef)();
  var monacoRef = (0, _react.useRef)();
  var containerRef = (0, _react.useRef)();
  (0, _hooks.useMount)(function (_) {
    _utils.monaco.init().then(function (monaco) {
      return (monacoRef.current = monaco) && setIsMonacoMounting(false);
    })["catch"](function (error) {
      return console.error('An error occurred during initialization of Monaco: ', error);
    });

    return removeEditor;
  });
  (0, _hooks.useUpdate)(function (_) {
    editorRef.current.getModel().modified.setValue(modified);
  }, [modified], isEditorReady);
  (0, _hooks.useUpdate)(function (_) {
    editorRef.current.getModel().original.setValue(original);
  }, [original], isEditorReady);
  (0, _hooks.useUpdate)(function (_) {
    var _editorRef$current$ge = editorRef.current.getModel(),
        original = _editorRef$current$ge.original,
        modified = _editorRef$current$ge.modified;

    monacoRef.current.editor.setModelLanguage(original, originalLanguage || language);
    monacoRef.current.editor.setModelLanguage(modified, modifiedLanguage || language);
  }, [language, originalLanguage, modifiedLanguage], isEditorReady);
  (0, _hooks.useUpdate)(function (_) {
    editorRef.current.setScrollPosition({
      scrollTop: line
    });
  }, [line], isEditorReady);
  (0, _hooks.useUpdate)(function (_) {
    monacoRef.current.editor.setTheme(theme);
  }, [theme], isEditorReady);
  (0, _hooks.useUpdate)(function (_) {
    editorRef.current.updateOptions(options);
  }, [options], isEditorReady);
  var setModels = (0, _react.useCallback)(function (_) {
    var originalModel = monacoRef.current.editor.createModel(original, originalLanguage || language);
    var modifiedModel = monacoRef.current.editor.createModel(modified, modifiedLanguage || language);
    editorRef.current.setModel({
      original: originalModel,
      modified: modifiedModel
    });
  }, [language, modified, modifiedLanguage, original, originalLanguage]);
  var createEditor = (0, _react.useCallback)(function (_) {
    editorRef.current = monacoRef.current.editor.createDiffEditor(containerRef.current, _objectSpread({
      automaticLayout: true
    }, options));
    setModels();

    var _editorRef$current$ge2 = editorRef.current.getModel(),
        original = _editorRef$current$ge2.original,
        modified = _editorRef$current$ge2.modified;

    editorDidMount(modified.getValue.bind(modified), original.getValue.bind(original), editorRef.current);
    monacoRef.current.editor.defineTheme('dark', _themes["default"]['night-dark']);
    monacoRef.current.editor.setTheme(theme);
    setIsEditorReady(true);
  }, [editorDidMount, options, theme, setModels]);
  (0, _react.useEffect)(function (_) {
    !isMonacoMounting && !isEditorReady && createEditor();
  }, [isMonacoMounting, isEditorReady, createEditor]);

  var removeEditor = function removeEditor(_) {
    return editorRef.current && editorRef.current.dispose();
  };

  return _react["default"].createElement(_MonacoContainer["default"], {
    width: width,
    height: height,
    isEditorReady: isEditorReady,
    loading: loading,
    _ref: containerRef
  });
};

DiffEditor.propTypes = {
  original: _propTypes["default"].string,
  modified: _propTypes["default"].string,
  language: _propTypes["default"].string,
  originalLanguage: _propTypes["default"].string,
  modifiedLanguage: _propTypes["default"].string,
  editorDidMount: _propTypes["default"].func,
  theme: _propTypes["default"].string,
  line: _propTypes["default"].number,
  width: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  height: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  loading: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].string]),
  options: _propTypes["default"].object
};
DiffEditor.defaultProps = {
  editorDidMount: _utils.noop,
  theme: 'light',
  width: '100%',
  height: '100%',
  loading: 'Loading...',
  options: {}
};
var _default = DiffEditor;
exports["default"] = _default;

/***/ }),

/***/ 3254:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = __webpack_require__(0);

var _ControlledEditor = _interopRequireDefault(__webpack_require__(3255));

var _default = (0, _react.memo)(_ControlledEditor["default"]);

exports["default"] = _default;

/***/ }),

/***/ 3255:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(119);

var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(9));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(6));

var _react = _interopRequireWildcard(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(1));

var _ = _interopRequireDefault(__webpack_require__(2056));

var _utils = __webpack_require__(1830);

var ControlledEditor = function ControlledEditor(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      editorDidMount = _ref.editorDidMount,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["value", "onChange", "editorDidMount"]);
  var previousValue = (0, _react.useRef)(value);

  var handleEditorDidMount = function handleEditorDidMount(getValue, editor) {
    editor.onDidChangeModelContent(function (ev) {
      var currentValue = editor.getValue();

      if (currentValue !== previousValue.current && !(ev.isUndoing || ev.isRedoing)) {
        previousValue.current = currentValue;

        var _value = onChange(ev, currentValue);

        if (typeof _value === 'string') {
          if (currentValue !== _value) {
            editor.setValue(_value);
          }
        }
      }
    });
    editorDidMount(getValue, editor);
  };

  return _react["default"].createElement(_["default"], (0, _extends2["default"])({
    value: value,
    editorDidMount: handleEditorDidMount,
    _isControlledMode: true
  }, props));
};

ControlledEditor.propTypes = {
  value: _propTypes["default"].string,
  editorDidMount: _propTypes["default"].func,
  onChange: _propTypes["default"].func
};
ControlledEditor.defaultProps = {
  editorDidMount: _utils.noop,
  onChange: _utils.noop
};
var _default = ControlledEditor;
exports["default"] = _default;

/***/ }),

/***/ 3606:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_scss__ = __webpack_require__(3607);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__monaco_editor_react__ = __webpack_require__(2056);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__monaco_editor_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__monaco_editor_react__);
/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-03 15:20:55
 * @LastEditors  : tangjiang
 * @LastEditTime : 2019-12-27 22:35:14
 */function ErrorResult(props){var detail=props.detail,language=props.language;var renderError=function renderError(){var detail=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var status=detail.status,error_msg=detail.error_msg,expected_output=detail.expected_output,input=detail.input,output=detail.output,execute_time=detail.execute_time;// 根据状态渲染不同的错误信息
var result=null;switch(status){case-1:result=__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div',{className:'error_result_wrap error_result_txt'},__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('p',null,'\u8F93\u5165: [',input,']'),__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('p',null,'\u8F93\u51FA: [',output,']'),__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('p',null,'\u9884\u671F: [',expected_output,']'));break;case 2:// 评测超时
result=__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div',{className:'error_result_wrap error_result_txt'},__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('p',null,'\u6267\u884C\u8D85\u65F6\uFF0C\u9650\u5236\u65F6\u9650: ',execute_time+'s'));break;case 3:// 创建pod失败
result=__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div',{className:'error_result_wrap'},__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('p',null,'\u7CFB\u7EDF\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5'));break;case 4:// 编译失败
result=__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div',{className:'error_result_wrap error_result_code'},__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__monaco_editor_react___default.a,{height:'100%',width:'100%',language:language&&language.toLowerCase()||'c',value:error_msg,theme:'dark'}));break;case 5:// 执行失败
result=__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div',{className:'error_result_wrap'},__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('p',null,'\u6267\u884C\u51FA\u9519\u4FE1\u606F: '),__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('p',null,'\u6700\u540E\u6267\u884C\u7684\u8F93\u5165: ',input));break;default:return result;}return result;};return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Fragment,null,renderError(detail));}/* harmony default export */ __webpack_exports__["a"] = (ErrorResult);

/***/ }),

/***/ 3607:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3608);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(317)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--1-oneOf-3-1!../../../../../node_modules/sass-loader/dist/cjs.js!./index.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js??ref--1-oneOf-3-1!../../../../../node_modules/sass-loader/dist/cjs.js!./index.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 3608:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(316)(true);
// imports


// module
exports.push([module.i, ".error_result_wrap.error_result_txt{padding:20px 30px}.error_result_wrap.error_result_code{height:150px}.error_result_wrap.error_result_code .error_result_code_txt{line-height:32px}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/src/modules/developer/components/errorResult/index.scss"],"names":[],"mappings":"AAAA,oCAAoC,iBAAiB,CAAC,qCAAqC,YAAY,CAAC,4DAA4D,gBAAgB,CAAC","file":"index.scss","sourcesContent":[".error_result_wrap.error_result_txt{padding:20px 30px}.error_result_wrap.error_result_code{height:150px}.error_result_wrap.error_result_code .error_result_code_txt{line-height:32px}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 5271:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5272);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(317)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-oneOf-3-1!../../../../node_modules/sass-loader/dist/cjs.js!./index.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--1-oneOf-3-1!../../../../node_modules/sass-loader/dist/cjs.js!./index.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 5272:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(316)(true);
// imports


// module
exports.push([module.i, ".new_add_task_wrap,.record_detail_area,.student_study_warp{height:100vh}.new_add_task_wrap .record_detail_header,.new_add_task_wrap .student_study_header,.new_add_task_wrap .task_header,.record_detail_area .record_detail_header,.record_detail_area .student_study_header,.record_detail_area .task_header,.student_study_warp .record_detail_header,.student_study_warp .student_study_header,.student_study_warp .task_header{height:65px;background:#070f19;padding:0 20px}.new_add_task_wrap .task_header,.record_detail_area .task_header,.student_study_warp .task_header{position:relative;line-height:65px}.new_add_task_wrap .task_header .header_btn,.new_add_task_wrap .task_header .header_title,.record_detail_area .task_header .header_btn,.record_detail_area .task_header .header_title,.student_study_warp .task_header .header_btn,.student_study_warp .task_header .header_title{color:#fff;line-height:65px}.new_add_task_wrap .task_header .header_title,.record_detail_area .task_header .header_title,.student_study_warp .task_header .header_title{font-size:16px;font-weight:700;text-align:center}.new_add_task_wrap .task_header .header_btn,.record_detail_area .task_header .header_btn,.student_study_warp .task_header .header_btn{position:absolute;line-height:32px;top:18px}.new_add_task_wrap .task_header .header_btn:last-child,.record_detail_area .task_header .header_btn:last-child,.student_study_warp .task_header .header_btn:last-child{right:30px}.new_add_task_wrap .pane_right_area,.new_add_task_wrap .record_detail_header,.new_add_task_wrap .split-pane-area,.new_add_task_wrap .student_study_header,.record_detail_area .pane_right_area,.record_detail_area .record_detail_header,.record_detail_area .split-pane-area,.record_detail_area .student_study_header,.student_study_warp .pane_right_area,.student_study_warp .record_detail_header,.student_study_warp .split-pane-area,.student_study_warp .student_study_header{position:relative}.new_add_task_wrap .record_detail_header .avator_nicker,.new_add_task_wrap .record_detail_header .study_name,.new_add_task_wrap .record_detail_header .study_quit,.new_add_task_wrap .student_study_header .avator_nicker,.new_add_task_wrap .student_study_header .study_name,.new_add_task_wrap .student_study_header .study_quit,.record_detail_area .record_detail_header .avator_nicker,.record_detail_area .record_detail_header .study_name,.record_detail_area .record_detail_header .study_quit,.record_detail_area .student_study_header .avator_nicker,.record_detail_area .student_study_header .study_name,.record_detail_area .student_study_header .study_quit,.student_study_warp .record_detail_header .avator_nicker,.student_study_warp .record_detail_header .study_name,.student_study_warp .record_detail_header .study_quit,.student_study_warp .student_study_header .avator_nicker,.student_study_warp .student_study_header .study_name,.student_study_warp .student_study_header .study_quit{color:#fff;line-height:65px}.new_add_task_wrap .record_detail_header .avator_nicker,.new_add_task_wrap .record_detail_header .study_quit,.new_add_task_wrap .student_study_header .avator_nicker,.new_add_task_wrap .student_study_header .study_quit,.record_detail_area .record_detail_header .avator_nicker,.record_detail_area .record_detail_header .study_quit,.record_detail_area .student_study_header .avator_nicker,.record_detail_area .student_study_header .study_quit,.student_study_warp .record_detail_header .avator_nicker,.student_study_warp .record_detail_header .study_quit,.student_study_warp .student_study_header .avator_nicker,.student_study_warp .student_study_header .study_quit{display:inline-block;vertical-align:top}.new_add_task_wrap .record_detail_header .student_nicker,.new_add_task_wrap .student_study_header .student_nicker,.record_detail_area .record_detail_header .student_nicker,.record_detail_area .student_study_header .student_nicker,.student_study_warp .record_detail_header .student_nicker,.student_study_warp .student_study_header .student_nicker{margin-left:10px}.new_add_task_wrap .record_detail_header .student_img,.new_add_task_wrap .student_study_header .student_img,.record_detail_area .record_detail_header .student_img,.record_detail_area .student_study_header .student_img,.student_study_warp .record_detail_header .student_img,.student_study_warp .student_study_header .student_img{width:30px;height:30px}.new_add_task_wrap .record_detail_header .study_quit,.new_add_task_wrap .student_study_header .study_quit,.record_detail_area .record_detail_header .study_quit,.record_detail_area .student_study_header .study_quit,.student_study_warp .record_detail_header .study_quit,.student_study_warp .student_study_header .study_quit{float:right}.new_add_task_wrap .record_detail_header .study_name,.new_add_task_wrap .student_study_header .study_name,.record_detail_area .record_detail_header .study_name,.record_detail_area .student_study_header .study_name,.student_study_warp .record_detail_header .study_name,.student_study_warp .student_study_header .study_name{position:absolute;left:0;right:0;bottom:0;top:0;text-align:center;font-size:16px;font-weight:700}.add_editor_list_area{background:#fff;padding:0 20px;margin:0}.add_editor_list_area .add_editor_item{display:inline-block;height:56px;line-height:56px;box-sizing:border-box;margin-right:30px;border-bottom:2px solid transparent;transition:all .3s;cursor:pointer}.add_editor_list_area .add_editor_item .item-span{color:#666;font-size:16px}.add_editor_list_area .add_editor_item.active{border-bottom-color:#5091ff}.add_editor_list_area .add_editor_item.active .item-span{color:#5091ff}.comp_ctx{overflow-y:hidden}.split-pane-area .ant-tabs-nav-wrap,.split-pane-left .ant-tabs-nav-wrap{padding:0 20px}.split-pane-area .ant-tabs-bar,.split-pane-left .ant-tabs-bar{margin:0}.split-pane-area .ant-form-item-control,.split-pane-left .ant-form-item-control{line-height:1}.split-pane-area .editor_area,.split-pane-area .prev_area,.split-pane-left .editor_area,.split-pane-left .prev_area{height:100%;overflow-y:auto}.Resizer{position:relative;background:#000;z-index:1;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;-moz-background-clip:padding;-webkit-background-clip:padding;background-clip:padding-box}.Resizer:hover{-webkit-transition:all 2s ease;transition:all 2s ease}.Resizer.horizontal{height:11px;margin:-5px 0;border-top:5px solid hsla(0,0%,100%,0);border-bottom:5px solid hsla(0,0%,100%,0);cursor:row-resize;width:100%}.Resizer.horizontal:hover{border-top:5px solid rgba(0,0,0,.5);border-bottom:5px solid rgba(0,0,0,.5)}.Resizer.vertical{width:11px;margin:0 -5px;border-left:5px solid hsla(0,0%,100%,0);border-right:5px solid hsla(0,0%,100%,0);cursor:col-resize}.Resizer.vertical:hover{border-left:5px solid rgba(0,0,0,.5);border-right:5px solid rgba(0,0,0,.5)}.Resizer.disabled{cursor:not-allowed}.Resizer.disabled:hover{border-color:transparent}.outer-split-pane>.Resizer{position:relative}.outer-split-pane>.Resizer:after,.outer-split-pane>.Resizer:before{position:absolute;right:-12px;top:50%;transition:opacity,background .3s}.outer-split-pane>.Resizer:before{content:\"\";border-radius:50%;background:hsla(0,0%,92%,.3);width:24px;height:24px}.outer-split-pane>.Resizer:after{content:\"\\E712\";font-family:iconfont;transform:scale(.7);color:#666;margin-top:-2px;right:-14px;opacity:.3}.outer-split-pane>.Resizer:hover:before{background:#ebebeb}.outer-split-pane>.Resizer:hover:after{opacity:1}.record_detail_area{background:#fff}.record_detail_area .record_detail_ctx{padding:0 20px}.record_detail_area .record_detail_ctx .detail_ctx_header{position:relative;height:56px}.record_detail_area .record_detail_ctx .header_h2{line-height:56px}.record_detail_area .record_detail_ctx .header_btn{position:absolute;right:0;top:14px}.record_detail_area .record_detail_ctx .detail_ctx_status{height:18px;line-height:18px}.record_detail_area .record_detail_ctx .detail_ctx_status .status_label{color:#999;margin-right:40px}.record_detail_area .record_detail_ctx .detail_ctx_status .status_label_error{color:#e51c24}.record_detail_area .record_detail_ctx .detail_ctx_status .status_label_success{color:#28bd8b}.record_detail_area .record_detail_ctx .detail_ctx_status .status_label_sub{color:#333}.record_detail_area .record_detail_ctx .detail_ctx_status .pass_case{float:right;margin-right:0}.record_detail_area .record_detail_ctx .detail_ctx_status .pass_case_span{margin-right:10px}.record_detail_area .record_detail_ctx .result_code_area{height:calc(100vh - 360px)}.record_detail_area .record_detail_ctx .result_error_area{margin-top:15px;background:#fafafa;color:#e51c24;border-radius:3px}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/src/modules/developer/recordDetail/index.scss"],"names":[],"mappings":"AAAA,2DAA2D,YAAY,CAAC,4VAA4V,YAAY,mBAAmB,cAAc,CAAC,kGAAkG,kBAAkB,gBAAgB,CAAC,kRAAkR,WAAW,gBAAgB,CAAC,4IAA4I,eAAe,gBAAiB,iBAAiB,CAAC,sIAAsI,kBAAkB,iBAAiB,QAAQ,CAAC,uKAAuK,UAAU,CAAC,AAA8O,sdAA0P,iBAAiB,CAAC,w9BAAw9B,WAAW,gBAAgB,CAAC,spBAAspB,qBAAqB,kBAAkB,CAAC,0VAA0V,gBAAgB,CAAC,wUAAwU,WAAW,WAAW,CAAC,kUAAkU,WAAW,CAAC,kUAAkU,kBAAkB,OAAO,QAAQ,SAAS,MAAM,kBAAkB,eAAe,eAAgB,CAAC,sBAAsB,gBAAgB,eAAe,QAAQ,CAAC,uCAAuC,qBAAqB,YAAY,iBAAiB,sBAAsB,kBAAkB,oCAAoC,mBAAmB,cAAc,CAAC,kDAAkD,WAAW,cAAc,CAAC,8CAA8C,2BAA2B,CAAC,yDAAyD,aAAa,CAAC,UAAU,iBAAiB,CAAC,wEAAwE,cAAc,CAAC,8DAA8D,QAAQ,CAAC,gFAAgF,aAAa,CAAC,oHAAoH,YAAY,eAAe,CAAC,SAAS,kBAAkB,gBAAgB,UAAU,2BAA2B,8BAA8B,sBAAsB,6BAA6B,gCAAgC,2BAA2B,CAAC,eAAe,+BAA+B,sBAAsB,CAAC,oBAAoB,YAAY,cAAc,uCAAyC,0CAA4C,kBAAkB,UAAU,CAAC,0BAA0B,oCAAqC,sCAAuC,CAAC,kBAAkB,WAAW,cAAc,wCAA0C,yCAA2C,iBAAiB,CAAC,wBAAwB,qCAAsC,qCAAsC,CAAC,kBAAkB,kBAAkB,CAAC,wBAAwB,wBAAwB,CAAC,2BAA2B,iBAAiB,CAAC,mEAAqE,kBAAkB,YAAY,QAAQ,iCAAkC,CAAC,kCAAmC,WAAW,kBAAkB,6BAAiC,WAAW,WAAW,CAAC,iCAAkC,gBAAgB,qBAAuB,oBAAqB,WAAW,gBAAgB,YAAY,UAAU,CAAC,wCAAyC,kBAAkB,CAAC,uCAAwC,SAAS,CAAC,oBAAoB,eAAe,CAAC,uCAAuC,cAAc,CAAC,0DAA0D,kBAAkB,WAAW,CAAC,kDAAkD,gBAAgB,CAAC,mDAAmD,kBAAkB,QAAQ,QAAQ,CAAC,0DAA0D,YAAY,gBAAgB,CAAC,wEAAwE,WAAW,iBAAiB,CAAC,8EAA8E,aAAa,CAAC,gFAAgF,aAAa,CAAC,4EAA4E,UAAa,CAAC,qEAAqE,YAAY,cAAc,CAAC,0EAA0E,iBAAiB,CAAC,yDAAyD,0BAA0B,CAAC,0DAA0D,gBAAgB,mBAAmB,cAAc,iBAAiB,CAAC","file":"index.scss","sourcesContent":[".new_add_task_wrap,.student_study_warp,.record_detail_area{height:100vh}.new_add_task_wrap .task_header,.new_add_task_wrap .student_study_header,.new_add_task_wrap .record_detail_header,.student_study_warp .task_header,.student_study_warp .student_study_header,.student_study_warp .record_detail_header,.record_detail_area .task_header,.record_detail_area .student_study_header,.record_detail_area .record_detail_header{height:65px;background:#070f19;padding:0 20px}.new_add_task_wrap .task_header,.student_study_warp .task_header,.record_detail_area .task_header{position:relative;line-height:65px}.new_add_task_wrap .task_header .header_btn,.new_add_task_wrap .task_header .header_title,.student_study_warp .task_header .header_btn,.student_study_warp .task_header .header_title,.record_detail_area .task_header .header_btn,.record_detail_area .task_header .header_title{color:#fff;line-height:65px}.new_add_task_wrap .task_header .header_title,.student_study_warp .task_header .header_title,.record_detail_area .task_header .header_title{font-size:16px;font-weight:bold;text-align:center}.new_add_task_wrap .task_header .header_btn,.student_study_warp .task_header .header_btn,.record_detail_area .task_header .header_btn{position:absolute;line-height:32px;top:18px}.new_add_task_wrap .task_header .header_btn:last-child,.student_study_warp .task_header .header_btn:last-child,.record_detail_area .task_header .header_btn:last-child{right:30px}.new_add_task_wrap .split-pane-area,.new_add_task_wrap .pane_right_area,.student_study_warp .split-pane-area,.student_study_warp .pane_right_area,.record_detail_area .split-pane-area,.record_detail_area .pane_right_area{position:relative}.new_add_task_wrap .student_study_header,.new_add_task_wrap .record_detail_header,.student_study_warp .student_study_header,.student_study_warp .record_detail_header,.record_detail_area .student_study_header,.record_detail_area .record_detail_header{position:relative}.new_add_task_wrap .student_study_header .avator_nicker,.new_add_task_wrap .student_study_header .study_quit,.new_add_task_wrap .student_study_header .study_name,.new_add_task_wrap .record_detail_header .avator_nicker,.new_add_task_wrap .record_detail_header .study_quit,.new_add_task_wrap .record_detail_header .study_name,.student_study_warp .student_study_header .avator_nicker,.student_study_warp .student_study_header .study_quit,.student_study_warp .student_study_header .study_name,.student_study_warp .record_detail_header .avator_nicker,.student_study_warp .record_detail_header .study_quit,.student_study_warp .record_detail_header .study_name,.record_detail_area .student_study_header .avator_nicker,.record_detail_area .student_study_header .study_quit,.record_detail_area .student_study_header .study_name,.record_detail_area .record_detail_header .avator_nicker,.record_detail_area .record_detail_header .study_quit,.record_detail_area .record_detail_header .study_name{color:#fff;line-height:65px}.new_add_task_wrap .student_study_header .avator_nicker,.new_add_task_wrap .student_study_header .study_quit,.new_add_task_wrap .record_detail_header .avator_nicker,.new_add_task_wrap .record_detail_header .study_quit,.student_study_warp .student_study_header .avator_nicker,.student_study_warp .student_study_header .study_quit,.student_study_warp .record_detail_header .avator_nicker,.student_study_warp .record_detail_header .study_quit,.record_detail_area .student_study_header .avator_nicker,.record_detail_area .student_study_header .study_quit,.record_detail_area .record_detail_header .avator_nicker,.record_detail_area .record_detail_header .study_quit{display:inline-block;vertical-align:top}.new_add_task_wrap .student_study_header .student_nicker,.new_add_task_wrap .record_detail_header .student_nicker,.student_study_warp .student_study_header .student_nicker,.student_study_warp .record_detail_header .student_nicker,.record_detail_area .student_study_header .student_nicker,.record_detail_area .record_detail_header .student_nicker{margin-left:10px}.new_add_task_wrap .student_study_header .student_img,.new_add_task_wrap .record_detail_header .student_img,.student_study_warp .student_study_header .student_img,.student_study_warp .record_detail_header .student_img,.record_detail_area .student_study_header .student_img,.record_detail_area .record_detail_header .student_img{width:30px;height:30px}.new_add_task_wrap .student_study_header .study_quit,.new_add_task_wrap .record_detail_header .study_quit,.student_study_warp .student_study_header .study_quit,.student_study_warp .record_detail_header .study_quit,.record_detail_area .student_study_header .study_quit,.record_detail_area .record_detail_header .study_quit{float:right}.new_add_task_wrap .student_study_header .study_name,.new_add_task_wrap .record_detail_header .study_name,.student_study_warp .student_study_header .study_name,.student_study_warp .record_detail_header .study_name,.record_detail_area .student_study_header .study_name,.record_detail_area .record_detail_header .study_name{position:absolute;left:0;right:0;bottom:0;top:0;text-align:center;font-size:16px;font-weight:bold}.add_editor_list_area{background:#fff;padding:0 20px;margin:0}.add_editor_list_area .add_editor_item{display:inline-block;height:56px;line-height:56px;box-sizing:border-box;margin-right:30px;border-bottom:2px solid transparent;transition:all .3s;cursor:pointer}.add_editor_list_area .add_editor_item .item-span{color:#666;font-size:16px}.add_editor_list_area .add_editor_item.active{border-bottom-color:#5091FF}.add_editor_list_area .add_editor_item.active .item-span{color:#5091FF}.comp_ctx{overflow-y:hidden}.split-pane-area .ant-tabs-nav-wrap,.split-pane-left .ant-tabs-nav-wrap{padding:0 20px}.split-pane-area .ant-tabs-bar,.split-pane-left .ant-tabs-bar{margin:0}.split-pane-area .ant-form-item-control,.split-pane-left .ant-form-item-control{line-height:1}.split-pane-area .editor_area,.split-pane-area .prev_area,.split-pane-left .editor_area,.split-pane-left .prev_area{height:100%;overflow-y:auto}.Resizer{position:relative;background:#000;z-index:1;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;-moz-background-clip:padding;-webkit-background-clip:padding;background-clip:padding-box}.Resizer:hover{-webkit-transition:all 2s ease;transition:all 2s ease}.Resizer.horizontal{height:11px;margin:-5px 0;border-top:5px solid rgba(255,255,255,0);border-bottom:5px solid rgba(255,255,255,0);cursor:row-resize;width:100%}.Resizer.horizontal:hover{border-top:5px solid rgba(0,0,0,0.5);border-bottom:5px solid rgba(0,0,0,0.5)}.Resizer.vertical{width:11px;margin:0 -5px;border-left:5px solid rgba(255,255,255,0);border-right:5px solid rgba(255,255,255,0);cursor:col-resize}.Resizer.vertical:hover{border-left:5px solid rgba(0,0,0,0.5);border-right:5px solid rgba(0,0,0,0.5)}.Resizer.disabled{cursor:not-allowed}.Resizer.disabled:hover{border-color:transparent}.outer-split-pane>.Resizer{position:relative}.outer-split-pane>.Resizer::before,.outer-split-pane>.Resizer::after{position:absolute;right:-12px;top:50%;transition:opacity, background .3s}.outer-split-pane>.Resizer::before{content:'';border-radius:50%;background:rgba(235,235,235,0.3);width:24px;height:24px}.outer-split-pane>.Resizer::after{content:'\\e712';font-family:'iconfont';transform:scale(0.7);color:#666;margin-top:-2px;right:-14px;opacity:.3}.outer-split-pane>.Resizer:hover::before{background:#ebebeb}.outer-split-pane>.Resizer:hover::after{opacity:1}.record_detail_area{background:#fff}.record_detail_area .record_detail_ctx{padding:0 20px}.record_detail_area .record_detail_ctx .detail_ctx_header{position:relative;height:56px}.record_detail_area .record_detail_ctx .header_h2{line-height:56px}.record_detail_area .record_detail_ctx .header_btn{position:absolute;right:0;top:14px}.record_detail_area .record_detail_ctx .detail_ctx_status{height:18px;line-height:18px}.record_detail_area .record_detail_ctx .detail_ctx_status .status_label{color:#999;margin-right:40px}.record_detail_area .record_detail_ctx .detail_ctx_status .status_label_error{color:#E51C24}.record_detail_area .record_detail_ctx .detail_ctx_status .status_label_success{color:#28BD8B}.record_detail_area .record_detail_ctx .detail_ctx_status .status_label_sub{color:#333333}.record_detail_area .record_detail_ctx .detail_ctx_status .pass_case{float:right;margin-right:0}.record_detail_area .record_detail_ctx .detail_ctx_status .pass_case_span{margin-right:10px}.record_detail_area .record_detail_ctx .result_code_area{height:calc(100vh - 360px)}.record_detail_area .record_detail_ctx .result_error_area{margin-top:15px;background:#fafafa;color:#E51C24;border-radius:3px}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 912:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_button_style_css__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_button_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_button_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_button__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_scss__ = __webpack_require__(5271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__index_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_errorResult__ = __webpack_require__(3606);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_router_dom__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__monaco_editor_react__ = __webpack_require__(2056);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__monaco_editor_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__monaco_editor_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_redux__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_router__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__redux_actions__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__constants__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_userInfo__ = __webpack_require__(2368);
var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();/*
 * @Description: 提交记录详情
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-04 08:36:21
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-02 13:48:02
 */// import { getImageUrl } from 'educoder';
var reviewResult=__WEBPACK_IMPORTED_MODULE_11__constants__["a" /* default */].reviewResult;function RecordDetail(props){var params=props.match.params,recordDetail=props.recordDetail,getUserCommitRecordDetail=props.getUserCommitRecordDetail,saveEditorCodeForDetail=props.saveEditorCodeForDetail;var id=params.id;var _useState=Object(__WEBPACK_IMPORTED_MODULE_3_react__["useState"])({}),_useState2=_slicedToArray(_useState,2),detail=_useState2[0],setDetail=_useState2[1];var _useState3=Object(__WEBPACK_IMPORTED_MODULE_3_react__["useState"])({}),_useState4=_slicedToArray(_useState3,2),user=_useState4[0],setUser=_useState4[1];var _useState5=Object(__WEBPACK_IMPORTED_MODULE_3_react__["useState"])(''),_useState6=_slicedToArray(_useState5,2),identifier=_useState6[0],setIdentifier=_useState6[1];Object(__WEBPACK_IMPORTED_MODULE_3_react__["useEffect"])(function(){// 根据id获取记录详情
getUserCommitRecordDetail(id,'detail');},[]);Object(__WEBPACK_IMPORTED_MODULE_3_react__["useEffect"])(function(){setDetail(recordDetail);// console.log('详情: ', recordDetail);
if(recordDetail){var _user=recordDetail.user,myproblem_identifier=recordDetail.myproblem_identifier,code=recordDetail.code;setUser(_user);setIdentifier(myproblem_identifier);if(code){saveEditorCodeForDetail(code);}}},[recordDetail]);var handleReturn=function handleReturn(identifier){if(identifier){saveEditorCodeForDetail('');setTimeout(function(){props.history.push('/myproblems/'+identifier);},300);}};var handleEditorCode=function handleEditorCode(identifier,code){if(identifier){console.log(code);saveEditorCodeForDetail(code);props.history.push('/myproblems/'+identifier);}};return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('div',{className:'record_detail_area'},__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('div',{className:'record_detail_header'},__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__components_userInfo__["a" /* default */],{userInfo:user||{}}),__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('div',{className:'study_name'},__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span',null,detail.name||'test')),__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('div',{className:'study_quit'},__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_button___default.a,{style:{visibility:identifier?'visible':'hidden'},onClick:function onClick(){return handleReturn(identifier);}},'\u8FD4\u56DE\u8BE5\u9898'))),__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('div',{className:'record_detail_ctx'},__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('div',{className:'detail_ctx_header'},__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('h2',{className:'header_h2'},'\u63D0\u4EA4\u8BB0\u5F55')),__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('div',{className:'detail_ctx_status'},__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span',{className:'status_label'},'\u72B6\u6001: ',__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span',{className:detail.status===0?'status_label_success':'status_label_error'},reviewResult[detail.status])),__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span',{className:'status_label'},'\u63D0\u4EA4\u65F6\u95F4: ',__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span',{className:'status_label_sub'},__WEBPACK_IMPORTED_MODULE_4_moment___default()(detail.created_at).format('YYYY-MM-DD HH:mm'))),__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span',{className:'status_label'},'\u8BED\u8A00: ',__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span',{className:'status_label_sub'},detail.language)),__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span',{className:'status_label',style:{visibility:detail.status===0?'visible':'hidden'}},'\u6267\u884C\u7528\u65F6: ',__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span',{className:'status_label_sub'},(detail.execute_time&&Number(detail.execute_time*1000).toFixed(2))+'ms')),__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span',{className:'status_label pass_case',style:{display:[-1,0,2,5].includes(detail.status)?'inline-block':'none'}},__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span',{className:'status_label_sub'},detail.pass_sets_count),__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span',{className:'pass_case_span'},' / ',detail.set_count),'\u4E2A\u901A\u8FC7\u6D4B\u8BD5\u7528\u4F8B')),__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('div',{className:'result_error_area'},__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_errorResult__["a" /* default */],{detail:detail})),__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('div',{className:'detail_ctx_header'},__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('h2',{className:'header_h2'},'\u63D0\u4EA4\u5185\u5BB9'),__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_button___default.a,{style:{visibility:identifier?'visible':'hidden'},className:'header_btn',type:'primary',onClick:function onClick(){return handleEditorCode(identifier,detail.code);}},'\u7F16\u8F91\u4EE3\u7801')),__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('div',{className:'result_code_area'},__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__monaco_editor_react___default.a,{height:'100%',width:'100%',language:detail.language&&detail.language.toLowerCase()||'',value:detail.code||'',theme:'dark',readOnly:true}))));}var mapStateToProps=function mapStateToProps(state){var recordDetail=state.ojForUserReducer.recordDetail;return{// identifier: user_program_identifier,
recordDetail:recordDetail};};var mapDispatchToProps=function mapDispatchToProps(dispatch){return{// 根据id号获取记录详情
getUserCommitRecordDetail:function getUserCommitRecordDetail(id,type){return dispatch(__WEBPACK_IMPORTED_MODULE_10__redux_actions__["a" /* default */].getUserCommitRecordDetail(id,type));},saveEditorCodeForDetail:function saveEditorCodeForDetail(code){return dispatch(__WEBPACK_IMPORTED_MODULE_10__redux_actions__["a" /* default */].saveEditorCodeForDetail(code));}};};/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_9_react_router__["b" /* withRouter */])(Object(__WEBPACK_IMPORTED_MODULE_8_react_redux__["b" /* connect */])(mapStateToProps,mapDispatchToProps)(RecordDetail)));

/***/ })

});