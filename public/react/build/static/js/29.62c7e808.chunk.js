webpackJsonp([29],{

/***/ 1011:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.LayoutContext = void 0;

var React = _interopRequireWildcard(__webpack_require__(0));

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _createReactContext = _interopRequireDefault(__webpack_require__(318));

var _configProvider = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var LayoutContext = (0, _createReactContext["default"])({
  siderHook: {
    addSider: function addSider() {
      return null;
    },
    removeSider: function removeSider() {
      return null;
    }
  }
});
exports.LayoutContext = LayoutContext;

function generator(_ref) {
  var suffixCls = _ref.suffixCls,
      tagName = _ref.tagName,
      displayName = _ref.displayName;
  return function (BasicComponent) {
    var _a;

    return _a =
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(Adapter, _React$Component);

      function Adapter() {
        var _this;

        _classCallCheck(this, Adapter);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Adapter).apply(this, arguments));

        _this.renderComponent = function (_ref2) {
          var getPrefixCls = _ref2.getPrefixCls;
          var customizePrefixCls = _this.props.prefixCls;
          var prefixCls = getPrefixCls(suffixCls, customizePrefixCls);
          return React.createElement(BasicComponent, _extends({
            prefixCls: prefixCls,
            tagName: tagName
          }, _this.props));
        };

        return _this;
      }

      _createClass(Adapter, [{
        key: "render",
        value: function render() {
          return React.createElement(_configProvider.ConfigConsumer, null, this.renderComponent);
        }
      }]);

      return Adapter;
    }(React.Component), _a.displayName = displayName, _a;
  };
}

var Basic = function Basic(props) {
  var prefixCls = props.prefixCls,
      className = props.className,
      children = props.children,
      tagName = props.tagName,
      others = __rest(props, ["prefixCls", "className", "children", "tagName"]);

  var classString = (0, _classnames["default"])(className, prefixCls);
  return React.createElement(tagName, _extends({
    className: classString
  }, others), children);
};

var BasicLayout =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(BasicLayout, _React$Component2);

  function BasicLayout() {
    var _this2;

    _classCallCheck(this, BasicLayout);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(BasicLayout).apply(this, arguments));
    _this2.state = {
      siders: []
    };
    return _this2;
  }

  _createClass(BasicLayout, [{
    key: "getSiderHook",
    value: function getSiderHook() {
      var _this3 = this;

      return {
        addSider: function addSider(id) {
          _this3.setState(function (state) {
            return {
              siders: [].concat(_toConsumableArray(state.siders), [id])
            };
          });
        },
        removeSider: function removeSider(id) {
          _this3.setState(function (state) {
            return {
              siders: state.siders.filter(function (currentId) {
                return currentId !== id;
              })
            };
          });
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _a = this.props,
          prefixCls = _a.prefixCls,
          className = _a.className,
          children = _a.children,
          hasSider = _a.hasSider,
          Tag = _a.tagName,
          others = __rest(_a, ["prefixCls", "className", "children", "hasSider", "tagName"]);

      var classString = (0, _classnames["default"])(className, prefixCls, _defineProperty({}, "".concat(prefixCls, "-has-sider"), typeof hasSider === 'boolean' ? hasSider : this.state.siders.length > 0));
      return React.createElement(LayoutContext.Provider, {
        value: {
          siderHook: this.getSiderHook()
        }
      }, React.createElement(Tag, _extends({
        className: classString
      }, others), children));
    }
  }]);

  return BasicLayout;
}(React.Component);

var Layout = generator({
  suffixCls: 'layout',
  tagName: 'section',
  displayName: 'Layout'
})(BasicLayout);
var Header = generator({
  suffixCls: 'layout-header',
  tagName: 'header',
  displayName: 'Header'
})(Basic);
var Footer = generator({
  suffixCls: 'layout-footer',
  tagName: 'footer',
  displayName: 'Footer'
})(Basic);
var Content = generator({
  suffixCls: 'layout-content',
  tagName: 'main',
  displayName: 'Content'
})(Basic);
Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
var _default = Layout;
exports["default"] = _default;
//# sourceMappingURL=layout.js.map


/***/ }),

/***/ 1015:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var isNumeric = function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

var _default = isNumeric;
exports["default"] = _default;
//# sourceMappingURL=isNumeric.js.map


/***/ }),

/***/ 1440:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1457);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(317)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 1449:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(31);

__webpack_require__(1463);
//# sourceMappingURL=css.js.map


/***/ }),

/***/ 1450:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(__webpack_require__(0));

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _configProvider = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var Divider = function Divider(props) {
  return React.createElement(_configProvider.ConfigConsumer, null, function (_ref) {
    var _classNames;

    var getPrefixCls = _ref.getPrefixCls;

    var customizePrefixCls = props.prefixCls,
        _props$type = props.type,
        type = _props$type === void 0 ? 'horizontal' : _props$type,
        _props$orientation = props.orientation,
        orientation = _props$orientation === void 0 ? 'center' : _props$orientation,
        className = props.className,
        children = props.children,
        dashed = props.dashed,
        restProps = __rest(props, ["prefixCls", "type", "orientation", "className", "children", "dashed"]);

    var prefixCls = getPrefixCls('divider', customizePrefixCls);
    var orientationPrefix = orientation.length > 0 ? "-".concat(orientation) : orientation;
    var classString = (0, _classnames["default"])(className, prefixCls, "".concat(prefixCls, "-").concat(type), (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-with-text").concat(orientationPrefix), children), _defineProperty(_classNames, "".concat(prefixCls, "-dashed"), !!dashed), _classNames));
    return React.createElement("div", _extends({
      className: classString
    }, restProps, {
      role: "separator"
    }), children && React.createElement("span", {
      className: "".concat(prefixCls, "-inner-text")
    }, children));
  });
};

var _default = Divider;
exports["default"] = _default;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 1457:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(316)(true);
// imports


// module
exports.push([module.i, ".courseForm .formBlock{padding:20px 30px 30px;border-bottom:1px solid #ededed;margin-bottom:0;background:#fff}.courseForm .noBorder{border-bottom:none}.edu-class-container{width:1200px;margin:10px auto 20px}.courseForm .ant-form-item-label{margin-left:-10px}.courseForm .notRequired .ant-form-item-label{margin-left:0}.courseForm .ant-input:focus{border-color:#40a9ff}@media (min-width:576px){.courseForm .ant-col-sm-24{text-align:left}}.ant-form-item-control-wrapper.ant-col-xs-24.ant-col-sm-24{margin-left:2px}.errorInline.ant-form-item{margin-bottom:8px}.errorInline .ant-form-item-children input{width:auto}.errorInline .ant-form-explain{display:inline;margin-left:10px}.setemailposition{position:absolute;right:40px;top:10px}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/src/modules/courses/common/formCommon.css"],"names":[],"mappings":"AAAA,uBACE,uBAA6B,AAC7B,gCAAiC,AACjC,gBAAmB,AACnB,eAAiB,CAClB,AACD,sBACE,kBAAoB,CACrB,AAGD,qBACE,aAAc,AACd,qBAAuB,CACxB,AAGD,iCACE,iBAAmB,CACpB,AACD,8CACE,aAAiB,CAClB,AAID,6BACE,oBAAsB,CACvB,AACD,yBACE,2BACE,eAAiB,CAClB,CACF,AACD,2DACE,eAAiB,CAClB,AAID,2BACE,iBAAmB,CACpB,AAED,2CACE,UAAW,CACZ,AACD,+BACE,eAAgB,AAChB,gBAAkB,CACnB,AAGD,kBACI,kBAAmB,AACnB,WAAY,AACZ,QAAU,CACb","file":"formCommon.css","sourcesContent":[".courseForm .formBlock {\r\n  padding: 20px 30px 30px 30px;\r\n  border-bottom: 1px solid #EDEDED;\r\n  margin-bottom: 0px;\r\n  background: #fff;\r\n}\r\n.courseForm .noBorder {\r\n  border-bottom: none;\r\n}\r\n\r\n/* common */\r\n.edu-class-container {\r\n  width: 1200px;\r\n  margin: 10px auto 20px;\r\n}\r\n\r\n/* 小红点 */\r\n.courseForm .ant-form-item-label {\r\n  margin-left: -10px;\r\n}\r\n.courseForm .notRequired .ant-form-item-label {\r\n  margin-left: 0px;\r\n}\r\n\r\n\r\n/* 不知道被哪个样式影响，这里需要重置 */\r\n.courseForm .ant-input:focus {\r\n  border-color: #40a9ff;\r\n}\r\n@media (min-width: 576px) {\r\n  .courseForm .ant-col-sm-24 {\r\n    text-align: left;\r\n  }\r\n}\r\n.ant-form-item-control-wrapper.ant-col-xs-24.ant-col-sm-24 {\r\n  margin-left: 2px;\r\n}\r\n\r\n\r\n/* errorInline ----------- */\r\n.errorInline.ant-form-item {\r\n  margin-bottom: 8px;\r\n}\r\n/* 这里需要指定form组件的宽度 style={{ width: 270 }} */ \r\n.errorInline .ant-form-item-children input {\r\n  width: auto\r\n}\r\n.errorInline .ant-form-explain {\r\n  display: inline;\r\n  margin-left: 10px;\r\n}\r\n/* errorInline ----------- */\r\n\r\n.setemailposition{\r\n    position: absolute;\r\n    right: 40px;\r\n    top: 10px;\r\n}"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1463:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1464);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(317)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 1464:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(316)(true);
// imports


// module
exports.push([module.i, ".ant-divider{-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0;color:rgba(0,0,0,.65);font-size:14px;font-variant:tabular-nums;line-height:1.5;list-style:none;-webkit-font-feature-settings:\"tnum\";font-feature-settings:\"tnum\";background:#e8e8e8}.ant-divider,.ant-divider-vertical{position:relative;top:-.06em;display:inline-block;width:1px;height:.9em;margin:0 8px;vertical-align:middle}.ant-divider-horizontal{display:block;clear:both;width:100%;min-width:100%;height:1px;margin:24px 0}.ant-divider-horizontal.ant-divider-with-text-center,.ant-divider-horizontal.ant-divider-with-text-left,.ant-divider-horizontal.ant-divider-with-text-right{display:table;margin:16px 0;color:rgba(0,0,0,.85);font-weight:500;font-size:16px;white-space:nowrap;text-align:center;background:transparent}.ant-divider-horizontal.ant-divider-with-text-center:after,.ant-divider-horizontal.ant-divider-with-text-center:before,.ant-divider-horizontal.ant-divider-with-text-left:after,.ant-divider-horizontal.ant-divider-with-text-left:before,.ant-divider-horizontal.ant-divider-with-text-right:after,.ant-divider-horizontal.ant-divider-with-text-right:before{position:relative;top:50%;display:table-cell;width:50%;border-top:1px solid #e8e8e8;-webkit-transform:translateY(50%);-ms-transform:translateY(50%);transform:translateY(50%);content:\"\"}.ant-divider-horizontal.ant-divider-with-text-left .ant-divider-inner-text,.ant-divider-horizontal.ant-divider-with-text-right .ant-divider-inner-text{display:inline-block;padding:0 10px}.ant-divider-horizontal.ant-divider-with-text-left:before{top:50%;width:5%}.ant-divider-horizontal.ant-divider-with-text-left:after,.ant-divider-horizontal.ant-divider-with-text-right:before{top:50%;width:95%}.ant-divider-horizontal.ant-divider-with-text-right:after{top:50%;width:5%}.ant-divider-inner-text{display:inline-block;padding:0 24px}.ant-divider-dashed{background:none;border-color:#e8e8e8;border-style:dashed;border-width:1px 0 0}.ant-divider-horizontal.ant-divider-with-text-center.ant-divider-dashed,.ant-divider-horizontal.ant-divider-with-text-left.ant-divider-dashed,.ant-divider-horizontal.ant-divider-with-text-right.ant-divider-dashed{border-top:0}.ant-divider-horizontal.ant-divider-with-text-center.ant-divider-dashed:after,.ant-divider-horizontal.ant-divider-with-text-center.ant-divider-dashed:before,.ant-divider-horizontal.ant-divider-with-text-left.ant-divider-dashed:after,.ant-divider-horizontal.ant-divider-with-text-left.ant-divider-dashed:before,.ant-divider-horizontal.ant-divider-with-text-right.ant-divider-dashed:after,.ant-divider-horizontal.ant-divider-with-text-right.ant-divider-dashed:before{border-style:dashed none none}.ant-divider-vertical.ant-divider-dashed{border-width:0 0 0 1px}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/node_modules/antd/lib/divider/style/index.css"],"names":[],"mappings":"AAIA,aACE,8BAA+B,AACvB,sBAAuB,AAC/B,SAAU,AACV,UAAW,AACX,sBAA2B,AAC3B,eAAgB,AAChB,0BAA2B,AAC3B,gBAAiB,AACjB,gBAAiB,AACjB,qCAAsC,AAC9B,6BAA8B,AACtC,kBAAoB,CACrB,AACD,mCAEE,kBAAmB,AACnB,WAAa,AACb,qBAAsB,AACtB,UAAW,AACX,YAAc,AACd,aAAc,AACd,qBAAuB,CACxB,AACD,wBACE,cAAe,AACf,WAAY,AACZ,WAAY,AACZ,eAAgB,AAChB,WAAY,AACZ,aAAe,CAChB,AACD,4JAGE,cAAe,AACf,cAAe,AACf,sBAA2B,AAC3B,gBAAiB,AACjB,eAAgB,AAChB,mBAAoB,AACpB,kBAAmB,AACnB,sBAAwB,CACzB,AACD,+VAME,kBAAmB,AACnB,QAAS,AACT,mBAAoB,AACpB,UAAW,AACX,6BAA8B,AAC9B,kCAAmC,AAC/B,8BAA+B,AAC3B,0BAA2B,AACnC,UAAY,CACb,AACD,uJAEE,qBAAsB,AACtB,cAAgB,CACjB,AACD,0DACE,QAAS,AACT,QAAU,CACX,AAKD,oHAHE,QAAS,AACT,SAAW,CAKZ,AACD,0DACE,QAAS,AACT,QAAU,CACX,AACD,wBACE,qBAAsB,AACtB,cAAgB,CACjB,AACD,oBACE,gBAAiB,AACjB,qBAAsB,AACtB,oBAAqB,AACrB,oBAAsB,CACvB,AACD,qNAGE,YAAc,CACf,AACD,idAME,6BAA+B,CAChC,AACD,yCACE,sBAAwB,CACzB","file":"index.css","sourcesContent":["/* stylelint-disable at-rule-empty-line-before,at-rule-name-space-after,at-rule-no-unknown */\n/* stylelint-disable no-duplicate-selectors */\n/* stylelint-disable */\n/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors,string-no-newline */\n.ant-divider {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  color: rgba(0, 0, 0, 0.65);\n  font-size: 14px;\n  font-variant: tabular-nums;\n  line-height: 1.5;\n  list-style: none;\n  -webkit-font-feature-settings: 'tnum';\n          font-feature-settings: 'tnum';\n  background: #e8e8e8;\n}\n.ant-divider,\n.ant-divider-vertical {\n  position: relative;\n  top: -0.06em;\n  display: inline-block;\n  width: 1px;\n  height: 0.9em;\n  margin: 0 8px;\n  vertical-align: middle;\n}\n.ant-divider-horizontal {\n  display: block;\n  clear: both;\n  width: 100%;\n  min-width: 100%;\n  height: 1px;\n  margin: 24px 0;\n}\n.ant-divider-horizontal.ant-divider-with-text-center,\n.ant-divider-horizontal.ant-divider-with-text-left,\n.ant-divider-horizontal.ant-divider-with-text-right {\n  display: table;\n  margin: 16px 0;\n  color: rgba(0, 0, 0, 0.85);\n  font-weight: 500;\n  font-size: 16px;\n  white-space: nowrap;\n  text-align: center;\n  background: transparent;\n}\n.ant-divider-horizontal.ant-divider-with-text-center::before,\n.ant-divider-horizontal.ant-divider-with-text-left::before,\n.ant-divider-horizontal.ant-divider-with-text-right::before,\n.ant-divider-horizontal.ant-divider-with-text-center::after,\n.ant-divider-horizontal.ant-divider-with-text-left::after,\n.ant-divider-horizontal.ant-divider-with-text-right::after {\n  position: relative;\n  top: 50%;\n  display: table-cell;\n  width: 50%;\n  border-top: 1px solid #e8e8e8;\n  -webkit-transform: translateY(50%);\n      -ms-transform: translateY(50%);\n          transform: translateY(50%);\n  content: '';\n}\n.ant-divider-horizontal.ant-divider-with-text-left .ant-divider-inner-text,\n.ant-divider-horizontal.ant-divider-with-text-right .ant-divider-inner-text {\n  display: inline-block;\n  padding: 0 10px;\n}\n.ant-divider-horizontal.ant-divider-with-text-left::before {\n  top: 50%;\n  width: 5%;\n}\n.ant-divider-horizontal.ant-divider-with-text-left::after {\n  top: 50%;\n  width: 95%;\n}\n.ant-divider-horizontal.ant-divider-with-text-right::before {\n  top: 50%;\n  width: 95%;\n}\n.ant-divider-horizontal.ant-divider-with-text-right::after {\n  top: 50%;\n  width: 5%;\n}\n.ant-divider-inner-text {\n  display: inline-block;\n  padding: 0 24px;\n}\n.ant-divider-dashed {\n  background: none;\n  border-color: #e8e8e8;\n  border-style: dashed;\n  border-width: 1px 0 0;\n}\n.ant-divider-horizontal.ant-divider-with-text-center.ant-divider-dashed,\n.ant-divider-horizontal.ant-divider-with-text-left.ant-divider-dashed,\n.ant-divider-horizontal.ant-divider-with-text-right.ant-divider-dashed {\n  border-top: 0;\n}\n.ant-divider-horizontal.ant-divider-with-text-center.ant-divider-dashed::before,\n.ant-divider-horizontal.ant-divider-with-text-left.ant-divider-dashed::before,\n.ant-divider-horizontal.ant-divider-with-text-right.ant-divider-dashed::before,\n.ant-divider-horizontal.ant-divider-with-text-center.ant-divider-dashed::after,\n.ant-divider-horizontal.ant-divider-with-text-left.ant-divider-dashed::after,\n.ant-divider-horizontal.ant-divider-with-text-right.ant-divider-dashed::after {\n  border-style: dashed none none;\n}\n.ant-divider-vertical.ant-divider-dashed {\n  border-width: 0 0 0 1px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 2067:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(31);

__webpack_require__(2323);
//# sourceMappingURL=css.js.map


/***/ }),

/***/ 2068:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _layout = _interopRequireDefault(__webpack_require__(1011));

var _Sider = _interopRequireDefault(__webpack_require__(939));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_layout["default"].Sider = _Sider["default"];
var _default = _layout["default"];
exports["default"] = _default;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 2323:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2324);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(317)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 2324:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(316)(true);
// imports


// module
exports.push([module.i, ".ant-layout{display:-ms-flexbox;display:flex;-ms-flex:auto;flex:auto;-ms-flex-direction:column;flex-direction:column;min-height:0;background:#f0f2f5}.ant-layout,.ant-layout *{-webkit-box-sizing:border-box;box-sizing:border-box}.ant-layout.ant-layout-has-sider{-ms-flex-direction:row;flex-direction:row}.ant-layout.ant-layout-has-sider>.ant-layout,.ant-layout.ant-layout-has-sider>.ant-layout-content{overflow-x:hidden}.ant-layout-footer,.ant-layout-header{-ms-flex:0 0 auto;flex:0 0 auto}.ant-layout-header{height:64px;padding:0 50px;line-height:64px;background:#001529}.ant-layout-footer{padding:24px 50px;color:rgba(0,0,0,.65);font-size:14px;background:#f0f2f5}.ant-layout-content{-ms-flex:auto;flex:auto;min-height:0}.ant-layout-sider{position:relative;min-width:0;background:#001529;-webkit-transition:all .2s;-o-transition:all .2s;transition:all .2s}.ant-layout-sider-children{height:100%;margin-top:-.1px;padding-top:.1px}.ant-layout-sider-has-trigger{padding-bottom:48px}.ant-layout-sider-right{-ms-flex-order:1;order:1}.ant-layout-sider-trigger{position:fixed;bottom:0;z-index:1;height:48px;color:#fff;line-height:48px;text-align:center;background:#002140;cursor:pointer;-webkit-transition:all .2s;-o-transition:all .2s;transition:all .2s}.ant-layout-sider-zero-width>*{overflow:hidden}.ant-layout-sider-zero-width-trigger{position:absolute;top:64px;right:-36px;z-index:1;width:36px;height:42px;color:#fff;font-size:18px;line-height:42px;text-align:center;background:#001529;border-radius:0 4px 4px 0;cursor:pointer;-webkit-transition:background .3s ease;-o-transition:background .3s ease;transition:background .3s ease}.ant-layout-sider-zero-width-trigger:hover{background:#192c3e}.ant-layout-sider-zero-width-trigger-right{left:-36px;border-radius:4px 0 0 4px}.ant-layout-sider-light{background:#fff}.ant-layout-sider-light .ant-layout-sider-trigger,.ant-layout-sider-light .ant-layout-sider-zero-width-trigger{color:rgba(0,0,0,.65);background:#fff}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/node_modules/antd/lib/layout/style/index.css"],"names":[],"mappings":"AAIA,YACE,oBAAqB,AACrB,aAAc,AACd,cAAe,AACX,UAAW,AACf,0BAA2B,AAC3B,sBAAuB,AAEvB,aAAc,AACd,kBAAoB,CACrB,AACD,0BAEE,8BAA+B,AACvB,qBAAuB,CAChC,AACD,iCACE,uBAAwB,AACxB,kBAAoB,CACrB,AACD,kGAEE,iBAAmB,CACpB,AACD,sCAEE,kBAAmB,AACf,aAAe,CACpB,AACD,mBACE,YAAa,AACb,eAAgB,AAChB,iBAAkB,AAClB,kBAAoB,CACrB,AACD,mBACE,kBAAmB,AACnB,sBAA2B,AAC3B,eAAgB,AAChB,kBAAoB,CACrB,AACD,oBACE,cAAe,AACX,UAAW,AAEf,YAAc,CACf,AACD,kBACE,kBAAmB,AAEnB,YAAa,AACb,mBAAoB,AACpB,2BAA6B,AAC7B,sBAAwB,AACxB,kBAAqB,CACtB,AACD,2BACE,YAAa,AACb,iBAAmB,AACnB,gBAAmB,CACpB,AACD,8BACE,mBAAqB,CACtB,AACD,wBACE,iBAAkB,AACd,OAAS,CACd,AACD,0BACE,eAAgB,AAChB,SAAU,AACV,UAAW,AACX,YAAa,AACb,WAAY,AACZ,iBAAkB,AAClB,kBAAmB,AACnB,mBAAoB,AACpB,eAAgB,AAChB,2BAA6B,AAC7B,sBAAwB,AACxB,kBAAqB,CACtB,AACD,+BACE,eAAiB,CAClB,AACD,qCACE,kBAAmB,AACnB,SAAU,AACV,YAAa,AACb,UAAW,AACX,WAAY,AACZ,YAAa,AACb,WAAY,AACZ,eAAgB,AAChB,iBAAkB,AAClB,kBAAmB,AACnB,mBAAoB,AACpB,0BAA2B,AAC3B,eAAgB,AAChB,uCAAyC,AACzC,kCAAoC,AACpC,8BAAiC,CAClC,AACD,2CACE,kBAAoB,CACrB,AACD,2CACE,WAAY,AACZ,yBAA2B,CAC5B,AACD,wBACE,eAAiB,CAClB,AAKD,+GAHE,sBAA2B,AAC3B,eAAiB,CAKlB","file":"index.css","sourcesContent":["/* stylelint-disable at-rule-empty-line-before,at-rule-name-space-after,at-rule-no-unknown */\n/* stylelint-disable no-duplicate-selectors */\n/* stylelint-disable */\n/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors,string-no-newline */\n.ant-layout {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex: auto;\n      flex: auto;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  /* fix firefox can't set height smaller than content on flex item */\n  min-height: 0;\n  background: #f0f2f5;\n}\n.ant-layout,\n.ant-layout * {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.ant-layout.ant-layout-has-sider {\n  -ms-flex-direction: row;\n  flex-direction: row;\n}\n.ant-layout.ant-layout-has-sider > .ant-layout,\n.ant-layout.ant-layout-has-sider > .ant-layout-content {\n  overflow-x: hidden;\n}\n.ant-layout-header,\n.ant-layout-footer {\n  -ms-flex: 0 0 auto;\n      flex: 0 0 auto;\n}\n.ant-layout-header {\n  height: 64px;\n  padding: 0 50px;\n  line-height: 64px;\n  background: #001529;\n}\n.ant-layout-footer {\n  padding: 24px 50px;\n  color: rgba(0, 0, 0, 0.65);\n  font-size: 14px;\n  background: #f0f2f5;\n}\n.ant-layout-content {\n  -ms-flex: auto;\n      flex: auto;\n  /* fix firefox can't set height smaller than content on flex item */\n  min-height: 0;\n}\n.ant-layout-sider {\n  position: relative;\n  /* fix firefox can't set width smaller than content on flex item */\n  min-width: 0;\n  background: #001529;\n  -webkit-transition: all 0.2s;\n  -o-transition: all 0.2s;\n  transition: all 0.2s;\n}\n.ant-layout-sider-children {\n  height: 100%;\n  margin-top: -0.1px;\n  padding-top: 0.1px;\n}\n.ant-layout-sider-has-trigger {\n  padding-bottom: 48px;\n}\n.ant-layout-sider-right {\n  -ms-flex-order: 1;\n      order: 1;\n}\n.ant-layout-sider-trigger {\n  position: fixed;\n  bottom: 0;\n  z-index: 1;\n  height: 48px;\n  color: #fff;\n  line-height: 48px;\n  text-align: center;\n  background: #002140;\n  cursor: pointer;\n  -webkit-transition: all 0.2s;\n  -o-transition: all 0.2s;\n  transition: all 0.2s;\n}\n.ant-layout-sider-zero-width > * {\n  overflow: hidden;\n}\n.ant-layout-sider-zero-width-trigger {\n  position: absolute;\n  top: 64px;\n  right: -36px;\n  z-index: 1;\n  width: 36px;\n  height: 42px;\n  color: #fff;\n  font-size: 18px;\n  line-height: 42px;\n  text-align: center;\n  background: #001529;\n  border-radius: 0 4px 4px 0;\n  cursor: pointer;\n  -webkit-transition: background 0.3s ease;\n  -o-transition: background 0.3s ease;\n  transition: background 0.3s ease;\n}\n.ant-layout-sider-zero-width-trigger:hover {\n  background: #192c3e;\n}\n.ant-layout-sider-zero-width-trigger-right {\n  left: -36px;\n  border-radius: 4px 0 0 4px;\n}\n.ant-layout-sider-light {\n  background: #fff;\n}\n.ant-layout-sider-light .ant-layout-sider-trigger {\n  color: rgba(0, 0, 0, 0.65);\n  background: #fff;\n}\n.ant-layout-sider-light .ant-layout-sider-zero-width-trigger {\n  color: rgba(0, 0, 0, 0.65);\n  background: #fff;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 2455:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/beijintulogontwo.245dc9e1.png";

/***/ }),

/***/ 871:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_spin_style_css__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_spin_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_spin_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_spin__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_spin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_spin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_input_style_css__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_input_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_antd_lib_input_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_input__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_antd_lib_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_divider_style_css__ = __webpack_require__(1449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_divider_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_antd_lib_divider_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_divider__ = __webpack_require__(1450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_divider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_antd_lib_divider__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_antd_lib_button_style_css__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_antd_lib_button_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_antd_lib_button_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_antd_lib_button__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_antd_lib_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_antd_lib_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_antd_lib_layout_style_css__ = __webpack_require__(2067);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_antd_lib_layout_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_antd_lib_layout_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_antd_lib_layout__ = __webpack_require__(2068);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_antd_lib_layout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_antd_lib_layout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_moment__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__courses_css_members_css__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__courses_css_members_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__courses_css_members_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__courses_common_formCommon_css__ = __webpack_require__(1440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__courses_common_formCommon_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__courses_common_formCommon_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__courses_css_Courses_css__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__courses_css_Courses_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__courses_css_Courses_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__src_images_login_beijintulogontwo_png__ = __webpack_require__(2455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__src_images_login_beijintulogontwo_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__src_images_login_beijintulogontwo_png__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Header=__WEBPACK_IMPORTED_MODULE_9_antd_lib_layout___default.a.Header,Footer=__WEBPACK_IMPORTED_MODULE_9_antd_lib_layout___default.a.Footer,Sider=__WEBPACK_IMPORTED_MODULE_9_antd_lib_layout___default.a.Sider,Content=__WEBPACK_IMPORTED_MODULE_9_antd_lib_layout___default.a.Content;//educoder登入页面
var sectionStyle={"height":"100%","width":"100%","min-width":"1000px"// makesure here is String确保这里是一个字符串，以下是es6写法
};var imgback={" background-size":"cover","background-repeat":"no-repeat",backgroundImage:"url("+__WEBPACK_IMPORTED_MODULE_17__src_images_login_beijintulogontwo_png___default.a+")"};var imgmian={width:"100%",background:"url("+__WEBPACK_IMPORTED_MODULE_17__src_images_login_beijintulogontwo_png___default.a+")",position:"relative"};var newContainer={// background: `url(${beijintulogontwo})`,
backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundAttachment:"fixed",backgroundSize:"100% 100%",height:" 100%",width:" 100%",position:"absolute",top:"0px",bottom:"0px",minHeight:"100%",paddingTop:"40px"};var Loginqq=function(_Component){_inherits(Loginqq,_Component);function Loginqq(props){_classCallCheck(this,Loginqq);var _this=_possibleConstructorReturn(this,(Loginqq.__proto__||Object.getPrototypeOf(Loginqq)).call(this,props));_this.loginInputonChange=function(e){if(e.target.value===undefined||e.target.value===""||e.target.value===null){}else{if(_this.state.logintypes==="username"){_this.setState({logintypes:undefined});}}_this.setState({login:e.target.value});};_this.passwordonChange=function(e){if(e.target.value===undefined||e.target.value===""||e.target.value===null){}else{if(_this.state.logintypes==="password"){_this.setState({logintypes:undefined});}}_this.setState({password:e.target.value});};_this.postwechatlogin=function(type,username,password){var query=_this.props.location.search;var types=query.split('?type=');if(type===false){if(username===undefined||username===""||username===null){_this.setState({logintypes:"username"});return;}if(password===undefined||password===""||password===null){_this.setState({logintypes:"password"});return;}}var url="/bind_user.json";__WEBPACK_IMPORTED_MODULE_11_axios___default.a.post(url,{type:types[1]==="qq"?"qq":'wechat',not_bind:type,username:username,password:password}).then(function(response){if(response.data.status===0){window.location.href="/";}}).catch(function(error){console.log(error);});};_this.state={login:undefined,password:undefined,data:undefined,logintypes:undefined,spinnings:true};return _this;}_createClass(Loginqq,[{key:"componentDidMount",value:function componentDidMount(){var _this2=this;var url="/users/get_user_info.json";__WEBPACK_IMPORTED_MODULE_11_axios___default.a.get(url).then(function(result){console.log(result);if(result){_this2.setState({data:result.data,spinnings:false});}}).catch(function(error){_this2.setState({spinnings:false});});}},{key:"render",value:function render(){var _this3=this;var _state=this.state,data=_state.data,logintypes=_state.logintypes,spinnings=_state.spinnings;console.log(logintypes);return __WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("div",{style:newContainer,className:" clearfix"},__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_spin___default.a,{size:"large",spinning:spinnings},__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("style",null,"\n\t\t\t\t\t\t\t\t\t#root{\n\t\t\t\t\t\t\t\t\tbackground:#fff !important;\n\t\t\t\t\t\t\t\t   }\n\t\t\t\t\t\t\t\t"),__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("div",null,__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("div",{style:{"width":"100%"}},__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("div",null,__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("style",null,"\n\t\t\t\t\t\t\t\t\t\t\t\t\t.ottherimg{\n\t\t\t\t\t\t\t\t\t\t\t\t\t    width: 106px;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\theight: 106px;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tborder-radius: 50%;\n\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t"),__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("div",{className:"textcenter"},data===undefined?"":data.image_url===undefined||data.image_url===null||data.image_url===""?"":__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("img",{className:"ottherimg",src:Object(__WEBPACK_IMPORTED_MODULE_13_educoder__["M" /* getImageUrl */])("images/"+(data&&data.image_url))})),__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("div",{className:"textcenter wechatloginfont"},"\u4E3A\u4E86\u66F4\u597D\u7684\u4E3A\u60A8\u670D\u52A1\uFF0C\u8BF7\u5173\u8054\u4E00\u4E2AEduCoder\u8D26\u53F7")),__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("div",{className:"educontent clearfix wechatdivs"},__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("style",null,"\n\t\t\t\t\t\t\t\t\t\t\t\t\t.ant-layout,.ant-layout-sider,.ant-layout-content{\n\t\t\t\t\t\t\t\t\t\t\t\t\t     background: #FFF;\n\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t.ant-layout-header {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\theight: 50px;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tpadding: 0 48px;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tline-height: inherit;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tbackground: #001529;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tbackground: #FFF;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  font-size: 14px;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfont-family: PingFangSC-Regular,PingFangSC;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfont-weight: 400;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcolor: rgba(0,0,0,1);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t.ant-layout-footer {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tpadding: 0px 50px;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t    background: #FFF;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t.wechattiyan{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\twidth:300px;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\theight:46px;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tbackground:rgba(25,144,255,1);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tborder-radius:4px;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t"),__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("p",null,__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_antd_lib_layout___default.a,null,__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(Sider,null,__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("div",{className:"wechatnewchat"},"\u65B0\u7528\u6237")),__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_antd_lib_layout___default.a,null,__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(Header,null,"\u6B22\u8FCE\u6765\u5230EduCoder\uFF0C\u65B0\u7528\u6237\u767B\u5F55EduCoder\u53EF\u4EE5\u5230\u201C\u8D26\u53F7\u7BA1\u7406-\u5B89\u5168\u8BBE\u7F6E\u201D\u4E2D\u7ED1\u5B9A\u624B\u673A/\u90AE\u7BB1\uFF0C\u4EE5\u540E\u53EF\u4EE5\u7528\u7ED1\u5B9A\u7684\u624B\u673A/\u90AE\u7BB1\uFF0C\u8BBE\u7F6E\u7684\u5BC6\u7801\u767B\u5F55EduCoder\u4E86\u3002"),__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(Content,{className:"wechatContents"},"\u7ACB\u5373\u4F53\u9A8C\u8868\u793A\u60A8\u5DF2\u7ECF\u540C\u610F\u6211\u4EEC\u7684 ",__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("span",null,__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("a",{href:"https://forge.educoder.net/help?index=4",target:"_blank",className:"color-blue"}," \u670D\u52A1\u534F\u8BAE\u6761\u6B3E"))),__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(Footer,null,__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_antd_lib_button___default.a,{className:"login_btn font-16 wechattiyan",type:"primary",style:{height:"46px"},onClick:function onClick(){return _this3.postwechatlogin(true);},size:"large"},"\u7ACB\u5373\u4F53\u9A8C"))))),__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd_lib_divider___default.a,null),__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("p",null,__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_antd_lib_layout___default.a,null,__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(Sider,null,__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("div",{className:"wechatweoldchat"},"\u8001\u7528\u6237")),__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_antd_lib_layout___default.a,null,__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(Header,null,"\u5DF2\u6709EduCoder\u8D26\u53F7\uFF0C\u53EF\u4EE5\u8F93\u5165\u60A8\u7684\u8D26\u53F7\u548C\u5BC6\u7801\uFF0C\u5C06\u60A8\u7684\u5FAE\u4FE1\u8D26\u53F7\u4E0EEduCoder\u8D26\u53F7\u8FDB\u884C\u7ED1\u5B9A\u3002"),__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(Content,{className:"wechatContents"},__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_antd_lib_input___default.a,{placeholder:"\u8BF7\u8F93\u5165\u624B\u673A\u53F7/\u90AE\u7BB1/\u767B\u5F55\u540D",value:this.state.login,onInput:this.loginInputonChange,className:this.state.logintypes==="username"?"bor-red mb20 wechatpass":" mb20 wechatpass"}),__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_antd_lib_input___default.a.Password,{value:this.state.password,autoComplete:"new-password",onInput:this.passwordonChange,className:this.state.logintypes==="password"?"bor-red wechatpass":" wechatpass",placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801"})),this.state.logintypes==="username"?__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("span",{className:"color-red ml50"},"\u8BF7\u586B\u5199\u8D26\u53F7"):this.state.logintypes==="password"?__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("span",{className:"color-red ml50"},"\u8BF7\u586B\u5199\u5BC6\u7801"):"",__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(Footer,null,__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_antd_lib_button___default.a,{className:"login_btn font-16 wechattiyan",type:"primary",style:{height:"46px"},onClick:function onClick(){return _this3.postwechatlogin(false,_this3.state.login,_this3.state.password);},size:"large"},"\u7ED1\u5B9A"))))))),__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("div",{style:{display:"flex",justifyContent:"center",width:"100%"}},__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("div",{className:"font-14 color-grey-9 ",style:{marginTop:"20px"}},__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("span",{className:"font-18"},"\xA9"),"\xA0",__WEBPACK_IMPORTED_MODULE_12_moment___default()().year(),"\xA0EduCoder",__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("span",{className:"ml15 mr15"},"\u6E58ICP\u590717009477\u53F7"),__WEBPACK_IMPORTED_MODULE_10_react___default.a.createElement("a",{href:"https://team.trustie.net",style:{"color":"#888"},target:"_blank"},"Trustie"),"\xA0\xA0\xA0&\xA0\xA0\xA0IntelliDE inside.")))));}}]);return Loginqq;}(__WEBPACK_IMPORTED_MODULE_10_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (Loginqq);

/***/ }),

/***/ 939:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SiderContext = void 0;

var _createReactContext = _interopRequireDefault(__webpack_require__(318));

var React = _interopRequireWildcard(__webpack_require__(0));

var _reactLifecyclesCompat = __webpack_require__(7);

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _omit = _interopRequireDefault(__webpack_require__(46));

var _layout = __webpack_require__(1011);

var _configProvider = __webpack_require__(14);

var _icon = _interopRequireDefault(__webpack_require__(27));

var _isNumeric = _interopRequireDefault(__webpack_require__(1015));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
// TODO: Will be removed in antd 4.0 because we will no longer support ie9
if (typeof window !== 'undefined') {
  var matchMediaPolyfill = function matchMediaPolyfill(mediaQuery) {
    return {
      media: mediaQuery,
      matches: false,
      addListener: function addListener() {},
      removeListener: function removeListener() {}
    };
  }; // ref: https://github.com/ant-design/ant-design/issues/18774


  if (!window.matchMedia) window.matchMedia = matchMediaPolyfill;
}

var dimensionMaxMap = {
  xs: '479.98px',
  sm: '575.98px',
  md: '767.98px',
  lg: '991.98px',
  xl: '1199.98px',
  xxl: '1599.98px'
};
var SiderContext = (0, _createReactContext["default"])({});
exports.SiderContext = SiderContext;

var generateId = function () {
  var i = 0;
  return function () {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    i += 1;
    return "".concat(prefix).concat(i);
  };
}();

var InternalSider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InternalSider, _React$Component);

  function InternalSider(props) {
    var _this;

    _classCallCheck(this, InternalSider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InternalSider).call(this, props));

    _this.responsiveHandler = function (mql) {
      _this.setState({
        below: mql.matches
      });

      var onBreakpoint = _this.props.onBreakpoint;

      if (onBreakpoint) {
        onBreakpoint(mql.matches);
      }

      if (_this.state.collapsed !== mql.matches) {
        _this.setCollapsed(mql.matches, 'responsive');
      }
    };

    _this.setCollapsed = function (collapsed, type) {
      if (!('collapsed' in _this.props)) {
        _this.setState({
          collapsed: collapsed
        });
      }

      var onCollapse = _this.props.onCollapse;

      if (onCollapse) {
        onCollapse(collapsed, type);
      }
    };

    _this.toggle = function () {
      var collapsed = !_this.state.collapsed;

      _this.setCollapsed(collapsed, 'clickTrigger');
    };

    _this.belowShowChange = function () {
      _this.setState(function (_ref) {
        var belowShow = _ref.belowShow;
        return {
          belowShow: !belowShow
        };
      });
    };

    _this.renderSider = function (_ref2) {
      var _classNames;

      var getPrefixCls = _ref2.getPrefixCls;

      var _a = _this.props,
          customizePrefixCls = _a.prefixCls,
          className = _a.className,
          theme = _a.theme,
          collapsible = _a.collapsible,
          reverseArrow = _a.reverseArrow,
          trigger = _a.trigger,
          style = _a.style,
          width = _a.width,
          collapsedWidth = _a.collapsedWidth,
          zeroWidthTriggerStyle = _a.zeroWidthTriggerStyle,
          others = __rest(_a, ["prefixCls", "className", "theme", "collapsible", "reverseArrow", "trigger", "style", "width", "collapsedWidth", "zeroWidthTriggerStyle"]);

      var prefixCls = getPrefixCls('layout-sider', customizePrefixCls);
      var divProps = (0, _omit["default"])(others, ['collapsed', 'defaultCollapsed', 'onCollapse', 'breakpoint', 'onBreakpoint', 'siderHook', 'zeroWidthTriggerStyle']);
      var rawWidth = _this.state.collapsed ? collapsedWidth : width; // use "px" as fallback unit for width

      var siderWidth = (0, _isNumeric["default"])(rawWidth) ? "".concat(rawWidth, "px") : String(rawWidth); // special trigger when collapsedWidth == 0

      var zeroWidthTrigger = parseFloat(String(collapsedWidth || 0)) === 0 ? React.createElement("span", {
        onClick: _this.toggle,
        className: "".concat(prefixCls, "-zero-width-trigger ").concat(prefixCls, "-zero-width-trigger-").concat(reverseArrow ? 'right' : 'left'),
        style: zeroWidthTriggerStyle
      }, React.createElement(_icon["default"], {
        type: "bars"
      })) : null;
      var iconObj = {
        expanded: reverseArrow ? React.createElement(_icon["default"], {
          type: "right"
        }) : React.createElement(_icon["default"], {
          type: "left"
        }),
        collapsed: reverseArrow ? React.createElement(_icon["default"], {
          type: "left"
        }) : React.createElement(_icon["default"], {
          type: "right"
        })
      };
      var status = _this.state.collapsed ? 'collapsed' : 'expanded';
      var defaultTrigger = iconObj[status];
      var triggerDom = trigger !== null ? zeroWidthTrigger || React.createElement("div", {
        className: "".concat(prefixCls, "-trigger"),
        onClick: _this.toggle,
        style: {
          width: siderWidth
        }
      }, trigger || defaultTrigger) : null;

      var divStyle = _extends(_extends({}, style), {
        flex: "0 0 ".concat(siderWidth),
        maxWidth: siderWidth,
        minWidth: siderWidth,
        width: siderWidth
      });

      var siderCls = (0, _classnames["default"])(className, prefixCls, "".concat(prefixCls, "-").concat(theme), (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-collapsed"), !!_this.state.collapsed), _defineProperty(_classNames, "".concat(prefixCls, "-has-trigger"), collapsible && trigger !== null && !zeroWidthTrigger), _defineProperty(_classNames, "".concat(prefixCls, "-below"), !!_this.state.below), _defineProperty(_classNames, "".concat(prefixCls, "-zero-width"), parseFloat(siderWidth) === 0), _classNames));
      return React.createElement("aside", _extends({
        className: siderCls
      }, divProps, {
        style: divStyle
      }), React.createElement("div", {
        className: "".concat(prefixCls, "-children")
      }, _this.props.children), collapsible || _this.state.below && zeroWidthTrigger ? triggerDom : null);
    };

    _this.uniqueId = generateId('ant-sider-');
    var matchMedia;

    if (typeof window !== 'undefined') {
      matchMedia = window.matchMedia;
    }

    if (matchMedia && props.breakpoint && props.breakpoint in dimensionMaxMap) {
      _this.mql = matchMedia("(max-width: ".concat(dimensionMaxMap[props.breakpoint], ")"));
    }

    var collapsed;

    if ('collapsed' in props) {
      collapsed = props.collapsed;
    } else {
      collapsed = props.defaultCollapsed;
    }

    _this.state = {
      collapsed: collapsed,
      below: false
    };
    return _this;
  }

  _createClass(InternalSider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.mql) {
        this.mql.addListener(this.responsiveHandler);
        this.responsiveHandler(this.mql);
      }

      if (this.props.siderHook) {
        this.props.siderHook.addSider(this.uniqueId);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.mql) {
        this.mql.removeListener(this.responsiveHandler);
      }

      if (this.props.siderHook) {
        this.props.siderHook.removeSider(this.uniqueId);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var collapsed = this.state.collapsed;
      var collapsedWidth = this.props.collapsedWidth;
      return React.createElement(SiderContext.Provider, {
        value: {
          siderCollapsed: collapsed,
          collapsedWidth: collapsedWidth
        }
      }, React.createElement(_configProvider.ConfigConsumer, null, this.renderSider));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      if ('collapsed' in nextProps) {
        return {
          collapsed: nextProps.collapsed
        };
      }

      return null;
    }
  }]);

  return InternalSider;
}(React.Component);

InternalSider.defaultProps = {
  collapsible: false,
  defaultCollapsed: false,
  reverseArrow: false,
  width: 200,
  collapsedWidth: 80,
  style: {},
  theme: 'dark'
};
(0, _reactLifecyclesCompat.polyfill)(InternalSider); // eslint-disable-next-line react/prefer-stateless-function

var Sider =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Sider, _React$Component2);

  function Sider() {
    _classCallCheck(this, Sider);

    return _possibleConstructorReturn(this, _getPrototypeOf(Sider).apply(this, arguments));
  }

  _createClass(Sider, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(_layout.LayoutContext.Consumer, null, function (context) {
        return React.createElement(InternalSider, _extends({}, context, _this2.props));
      });
    }
  }]);

  return Sider;
}(React.Component);

exports["default"] = Sider;
//# sourceMappingURL=Sider.js.map


/***/ })

});