webpackJsonp([163],{

/***/ 1013:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.LayoutContext = void 0;

var React = _interopRequireWildcard(__webpack_require__(0));

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _createReactContext = _interopRequireDefault(__webpack_require__(319));

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

/***/ 1014:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// ================== Collapse Motion ==================
var getCollapsedHeight = function getCollapsedHeight() {
  return {
    height: 0,
    opacity: 0
  };
};

var getRealHeight = function getRealHeight(node) {
  return {
    height: node.scrollHeight,
    opacity: 1
  };
};

var getCurrentHeight = function getCurrentHeight(node) {
  return {
    height: node.offsetHeight
  };
};

var collapseMotion = {
  motionName: 'ant-motion-collapse',
  onAppearStart: getCollapsedHeight,
  onEnterStart: getCollapsedHeight,
  onAppearActive: getRealHeight,
  onEnterActive: getRealHeight,
  onLeaveStart: getCurrentHeight,
  onLeaveActive: getCollapsedHeight
};
var _default = collapseMotion;
exports["default"] = _default;
//# sourceMappingURL=motion.js.map


/***/ }),

/***/ 1016:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(31);

__webpack_require__(1100);

__webpack_require__(88);
//# sourceMappingURL=css.js.map


/***/ }),

/***/ 1017:
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

/***/ 1020:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(31);

__webpack_require__(1109);

__webpack_require__(175);
//# sourceMappingURL=css.js.map


/***/ }),

/***/ 1021:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(__webpack_require__(0));

var PropTypes = _interopRequireWildcard(__webpack_require__(1));

var _rcMenu = __webpack_require__(177);

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _MenuContext = _interopRequireDefault(__webpack_require__(927));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SubMenu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SubMenu, _React$Component);

  function SubMenu() {
    var _this;

    _classCallCheck(this, SubMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SubMenu).apply(this, arguments));

    _this.onKeyDown = function (e) {
      _this.subMenu.onKeyDown(e);
    };

    _this.saveSubMenu = function (subMenu) {
      _this.subMenu = subMenu;
    };

    return _this;
  }

  _createClass(SubMenu, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          rootPrefixCls = _this$props.rootPrefixCls,
          popupClassName = _this$props.popupClassName;
      return React.createElement(_MenuContext["default"].Consumer, null, function (_ref) {
        var antdMenuTheme = _ref.antdMenuTheme;
        return React.createElement(_rcMenu.SubMenu, _extends({}, _this2.props, {
          ref: _this2.saveSubMenu,
          popupClassName: (0, _classnames["default"])("".concat(rootPrefixCls, "-").concat(antdMenuTheme), popupClassName)
        }));
      });
    }
  }]);

  return SubMenu;
}(React.Component);

SubMenu.contextTypes = {
  antdMenuTheme: PropTypes.string
}; // fix issue:https://github.com/ant-design/ant-design/issues/8666

SubMenu.isSubMenu = 1;
var _default = SubMenu;
exports["default"] = _default;
//# sourceMappingURL=SubMenu.js.map


/***/ }),

/***/ 1022:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(__webpack_require__(0));

var _rcMenu = __webpack_require__(177);

var _MenuContext = _interopRequireDefault(__webpack_require__(927));

var _tooltip = _interopRequireDefault(__webpack_require__(174));

var _Sider = __webpack_require__(941);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var MenuItem =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MenuItem, _React$Component);

  function MenuItem() {
    var _this;

    _classCallCheck(this, MenuItem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MenuItem).apply(this, arguments));

    _this.onKeyDown = function (e) {
      _this.menuItem.onKeyDown(e);
    };

    _this.saveMenuItem = function (menuItem) {
      _this.menuItem = menuItem;
    };

    _this.renderItem = function (_ref) {
      var siderCollapsed = _ref.siderCollapsed;
      var _this$props = _this.props,
          level = _this$props.level,
          children = _this$props.children,
          rootPrefixCls = _this$props.rootPrefixCls;

      var _a = _this.props,
          title = _a.title,
          rest = __rest(_a, ["title"]);

      return React.createElement(_MenuContext["default"].Consumer, null, function (_ref2) {
        var inlineCollapsed = _ref2.inlineCollapsed;
        var tooltipProps = {
          title: title || (level === 1 ? children : '')
        };

        if (!siderCollapsed && !inlineCollapsed) {
          tooltipProps.title = null; // Reset `visible` to fix control mode tooltip display not correct
          // ref: https://github.com/ant-design/ant-design/issues/16742

          tooltipProps.visible = false;
        }

        return React.createElement(_tooltip["default"], _extends({}, tooltipProps, {
          placement: "right",
          overlayClassName: "".concat(rootPrefixCls, "-inline-collapsed-tooltip")
        }), React.createElement(_rcMenu.Item, _extends({}, rest, {
          title: title,
          ref: _this.saveMenuItem
        })));
      });
    };

    return _this;
  }

  _createClass(MenuItem, [{
    key: "render",
    value: function render() {
      return React.createElement(_Sider.SiderContext.Consumer, null, this.renderItem);
    }
  }]);

  return MenuItem;
}(React.Component);

exports["default"] = MenuItem;
MenuItem.isMenuItem = true;
//# sourceMappingURL=MenuItem.js.map


/***/ }),

/***/ 1100:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1101);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(318)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 1101:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(317)(true);
// imports


// module
exports.push([module.i, ".ant-dropdown{-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0;color:rgba(0,0,0,.65);font-size:14px;font-variant:tabular-nums;line-height:1.5;list-style:none;-webkit-font-feature-settings:\"tnum\";font-feature-settings:\"tnum\";position:absolute;top:-9999px;left:-9999px;z-index:1050;display:block}.ant-dropdown:before{position:absolute;top:-7px;right:0;bottom:-7px;left:-7px;z-index:-9999;opacity:.0001;content:\" \"}.ant-dropdown-wrap{position:relative}.ant-dropdown-wrap .ant-btn>.anticon-down{display:inline-block;font-size:12px;font-size:10px\\9;-webkit-transform:scale(.83333333) rotate(0deg);-ms-transform:scale(.83333333) rotate(0deg);transform:scale(.83333333) rotate(0deg)}:root .ant-dropdown-wrap .ant-btn>.anticon-down{font-size:12px}.ant-dropdown-wrap .anticon-down:before{-webkit-transition:-webkit-transform .2s;transition:-webkit-transform .2s;-o-transition:transform .2s;transition:transform .2s;transition:transform .2s,-webkit-transform .2s}.ant-dropdown-wrap-open .anticon-down:before{-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.ant-dropdown-hidden,.ant-dropdown-menu-hidden{display:none}.ant-dropdown-menu{position:relative;margin:0;padding:4px 0;text-align:left;list-style-type:none;background-color:#fff;background-clip:padding-box;border-radius:4px;outline:none;-webkit-box-shadow:0 2px 8px rgba(0,0,0,.15);box-shadow:0 2px 8px rgba(0,0,0,.15);-webkit-transform:translateZ(0)}.ant-dropdown-menu-item-group-title{padding:5px 12px;color:rgba(0,0,0,.45);-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s}.ant-dropdown-menu-submenu-popup{position:absolute;z-index:1050}.ant-dropdown-menu-submenu-popup>.ant-dropdown-menu{-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0}.ant-dropdown-menu-submenu-popup li,.ant-dropdown-menu-submenu-popup ul{list-style:none}.ant-dropdown-menu-submenu-popup ul{margin-right:.3em;margin-left:.3em;padding:0}.ant-dropdown-menu-item,.ant-dropdown-menu-submenu-title{clear:both;margin:0;padding:5px 12px;color:rgba(0,0,0,.65);font-weight:400;font-size:14px;line-height:22px;white-space:nowrap;cursor:pointer;-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s}.ant-dropdown-menu-item>.anticon:first-child,.ant-dropdown-menu-item>span>.anticon:first-child,.ant-dropdown-menu-submenu-title>.anticon:first-child,.ant-dropdown-menu-submenu-title>span>.anticon:first-child{min-width:12px;margin-right:8px;font-size:12px}.ant-dropdown-menu-item>a,.ant-dropdown-menu-submenu-title>a{display:block;margin:-5px -12px;padding:5px 12px;color:rgba(0,0,0,.65);-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s}.ant-dropdown-menu-item-selected,.ant-dropdown-menu-item-selected>a,.ant-dropdown-menu-submenu-title-selected,.ant-dropdown-menu-submenu-title-selected>a{color:#1890ff;background-color:#e6f7ff}.ant-dropdown-menu-item:hover,.ant-dropdown-menu-submenu-title:hover{background-color:#e6f7ff}.ant-dropdown-menu-item-disabled,.ant-dropdown-menu-submenu-title-disabled{color:rgba(0,0,0,.25);cursor:not-allowed}.ant-dropdown-menu-item-disabled:hover,.ant-dropdown-menu-submenu-title-disabled:hover{color:rgba(0,0,0,.25);background-color:#fff;cursor:not-allowed}.ant-dropdown-menu-item-divider,.ant-dropdown-menu-submenu-title-divider{height:1px;margin:4px 0;overflow:hidden;line-height:0;background-color:#e8e8e8}.ant-dropdown-menu-item .ant-dropdown-menu-submenu-arrow,.ant-dropdown-menu-submenu-title .ant-dropdown-menu-submenu-arrow{position:absolute;right:8px}.ant-dropdown-menu-item .ant-dropdown-menu-submenu-arrow-icon,.ant-dropdown-menu-submenu-title .ant-dropdown-menu-submenu-arrow-icon{color:rgba(0,0,0,.45);font-style:normal;display:inline-block;font-size:12px;font-size:10px\\9;-webkit-transform:scale(.83333333) rotate(0deg);-ms-transform:scale(.83333333) rotate(0deg);transform:scale(.83333333) rotate(0deg)}:root .ant-dropdown-menu-item .ant-dropdown-menu-submenu-arrow-icon,:root .ant-dropdown-menu-submenu-title .ant-dropdown-menu-submenu-arrow-icon{font-size:12px}.ant-dropdown-menu-item-group-list{margin:0 8px;padding:0;list-style:none}.ant-dropdown-menu-submenu-title{padding-right:26px}.ant-dropdown-menu-submenu-vertical{position:relative}.ant-dropdown-menu-submenu-vertical>.ant-dropdown-menu{position:absolute;top:0;left:100%;min-width:100%;margin-left:4px;-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0}.ant-dropdown-menu-submenu.ant-dropdown-menu-submenu-disabled .ant-dropdown-menu-submenu-title,.ant-dropdown-menu-submenu.ant-dropdown-menu-submenu-disabled .ant-dropdown-menu-submenu-title .ant-dropdown-menu-submenu-arrow-icon{color:rgba(0,0,0,.25);background-color:#fff;cursor:not-allowed}.ant-dropdown-menu-submenu-selected .ant-dropdown-menu-submenu-title{color:#1890ff}.ant-dropdown.slide-down-appear.slide-down-appear-active.ant-dropdown-placement-bottomCenter,.ant-dropdown.slide-down-appear.slide-down-appear-active.ant-dropdown-placement-bottomLeft,.ant-dropdown.slide-down-appear.slide-down-appear-active.ant-dropdown-placement-bottomRight,.ant-dropdown.slide-down-enter.slide-down-enter-active.ant-dropdown-placement-bottomCenter,.ant-dropdown.slide-down-enter.slide-down-enter-active.ant-dropdown-placement-bottomLeft,.ant-dropdown.slide-down-enter.slide-down-enter-active.ant-dropdown-placement-bottomRight{-webkit-animation-name:antSlideUpIn;animation-name:antSlideUpIn}.ant-dropdown.slide-up-appear.slide-up-appear-active.ant-dropdown-placement-topCenter,.ant-dropdown.slide-up-appear.slide-up-appear-active.ant-dropdown-placement-topLeft,.ant-dropdown.slide-up-appear.slide-up-appear-active.ant-dropdown-placement-topRight,.ant-dropdown.slide-up-enter.slide-up-enter-active.ant-dropdown-placement-topCenter,.ant-dropdown.slide-up-enter.slide-up-enter-active.ant-dropdown-placement-topLeft,.ant-dropdown.slide-up-enter.slide-up-enter-active.ant-dropdown-placement-topRight{-webkit-animation-name:antSlideDownIn;animation-name:antSlideDownIn}.ant-dropdown.slide-down-leave.slide-down-leave-active.ant-dropdown-placement-bottomCenter,.ant-dropdown.slide-down-leave.slide-down-leave-active.ant-dropdown-placement-bottomLeft,.ant-dropdown.slide-down-leave.slide-down-leave-active.ant-dropdown-placement-bottomRight{-webkit-animation-name:antSlideUpOut;animation-name:antSlideUpOut}.ant-dropdown.slide-up-leave.slide-up-leave-active.ant-dropdown-placement-topCenter,.ant-dropdown.slide-up-leave.slide-up-leave-active.ant-dropdown-placement-topLeft,.ant-dropdown.slide-up-leave.slide-up-leave-active.ant-dropdown-placement-topRight{-webkit-animation-name:antSlideDownOut;animation-name:antSlideDownOut}.ant-dropdown-link>.anticon.anticon-down,.ant-dropdown-trigger>.anticon.anticon-down{display:inline-block;font-size:12px;font-size:10px\\9;-webkit-transform:scale(.83333333) rotate(0deg);-ms-transform:scale(.83333333) rotate(0deg);transform:scale(.83333333) rotate(0deg)}:root .ant-dropdown-link>.anticon.anticon-down,:root .ant-dropdown-trigger>.anticon.anticon-down{font-size:12px}.ant-dropdown-button{white-space:nowrap}.ant-dropdown-button.ant-btn-group>.ant-btn:last-child:not(:first-child){padding-right:8px;padding-left:8px}.ant-dropdown-button .anticon.anticon-down{display:inline-block;font-size:12px;font-size:10px\\9;-webkit-transform:scale(.83333333) rotate(0deg);-ms-transform:scale(.83333333) rotate(0deg);transform:scale(.83333333) rotate(0deg)}:root .ant-dropdown-button .anticon.anticon-down{font-size:12px}.ant-dropdown-menu-dark,.ant-dropdown-menu-dark .ant-dropdown-menu{background:#001529}.ant-dropdown-menu-dark .ant-dropdown-menu-item,.ant-dropdown-menu-dark .ant-dropdown-menu-item .ant-dropdown-menu-submenu-arrow:after,.ant-dropdown-menu-dark .ant-dropdown-menu-item>a,.ant-dropdown-menu-dark .ant-dropdown-menu-item>a .ant-dropdown-menu-submenu-arrow:after,.ant-dropdown-menu-dark .ant-dropdown-menu-submenu-title,.ant-dropdown-menu-dark .ant-dropdown-menu-submenu-title .ant-dropdown-menu-submenu-arrow:after{color:hsla(0,0%,100%,.65)}.ant-dropdown-menu-dark .ant-dropdown-menu-item:hover,.ant-dropdown-menu-dark .ant-dropdown-menu-item>a:hover,.ant-dropdown-menu-dark .ant-dropdown-menu-submenu-title:hover{color:#fff;background:transparent}.ant-dropdown-menu-dark .ant-dropdown-menu-item-selected,.ant-dropdown-menu-dark .ant-dropdown-menu-item-selected:hover,.ant-dropdown-menu-dark .ant-dropdown-menu-item-selected>a{color:#fff;background:#1890ff}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/node_modules/antd/lib/dropdown/style/index.css"],"names":[],"mappings":"AAIA,cACE,8BAA+B,AACvB,sBAAuB,AAC/B,SAAU,AACV,UAAW,AACX,sBAA2B,AAC3B,eAAgB,AAChB,0BAA2B,AAC3B,gBAAiB,AACjB,gBAAiB,AACjB,qCAAsC,AAC9B,6BAA8B,AACtC,kBAAmB,AACnB,YAAa,AACb,aAAc,AACd,aAAc,AACd,aAAe,CAChB,AACD,qBACE,kBAAmB,AACnB,SAAU,AACV,QAAS,AACT,YAAa,AACb,UAAW,AACX,cAAe,AACf,cAAgB,AAChB,WAAa,CACd,AACD,mBACE,iBAAmB,CACpB,AACD,0CACE,qBAAsB,AACtB,eAAgB,AAChB,iBAAmB,AACnB,gDAAkD,AAC9C,4CAA8C,AAC1C,uCAA0C,CACnD,AACD,gDACE,cAAgB,CACjB,AACD,wCACE,yCAA2C,AAC3C,iCAAmC,AACnC,4BAA8B,AAC9B,yBAA2B,AAC3B,8CAAmD,CACpD,AACD,6CACE,iCAAkC,AAC9B,6BAA8B,AAC1B,wBAA0B,CACnC,AACD,+CAEE,YAAc,CACf,AACD,mBACE,kBAAmB,AACnB,SAAU,AACV,cAAe,AACf,gBAAiB,AACjB,qBAAsB,AACtB,sBAAuB,AACvB,4BAA6B,AAC7B,kBAAmB,AACnB,aAAc,AACd,6CAAkD,AAC1C,qCAA0C,AAClD,+BAAwC,CACzC,AACD,oCACE,iBAAkB,AAClB,sBAA2B,AAC3B,2BAA6B,AAC7B,sBAAwB,AACxB,kBAAqB,CACtB,AACD,iCACE,kBAAmB,AACnB,YAAc,CACf,AACD,oDACE,6BAA8B,AAC1B,yBAA0B,AACtB,oBAAsB,CAC/B,AACD,wEAEE,eAAiB,CAClB,AACD,oCACE,kBAAoB,AACpB,iBAAmB,AACnB,SAAW,CACZ,AACD,yDAEE,WAAY,AACZ,SAAU,AACV,iBAAkB,AAClB,sBAA2B,AAC3B,gBAAoB,AACpB,eAAgB,AAChB,iBAAkB,AAClB,mBAAoB,AACpB,eAAgB,AAChB,2BAA6B,AAC7B,sBAAwB,AACxB,kBAAqB,CACtB,AACD,gNAIE,eAAgB,AAChB,iBAAkB,AAClB,cAAgB,CACjB,AACD,6DAEE,cAAe,AACf,kBAAmB,AACnB,iBAAkB,AAClB,sBAA2B,AAC3B,2BAA6B,AAC7B,sBAAwB,AACxB,kBAAqB,CACtB,AACD,0JAIE,cAAe,AACf,wBAA0B,CAC3B,AACD,qEAEE,wBAA0B,CAC3B,AACD,2EAEE,sBAA2B,AAC3B,kBAAoB,CACrB,AACD,uFAEE,sBAA2B,AAC3B,sBAAuB,AACvB,kBAAoB,CACrB,AACD,yEAEE,WAAY,AACZ,aAAc,AACd,gBAAiB,AACjB,cAAe,AACf,wBAA0B,CAC3B,AACD,2HAEE,kBAAmB,AACnB,SAAW,CACZ,AACD,qIAEE,sBAA2B,AAC3B,kBAAmB,AACnB,qBAAsB,AACtB,eAAgB,AAChB,iBAAmB,AACnB,gDAAkD,AAC9C,4CAA8C,AAC1C,uCAA0C,CACnD,AACD,iJAEE,cAAgB,CACjB,AACD,mCACE,aAAc,AACd,UAAW,AACX,eAAiB,CAClB,AACD,iCACE,kBAAoB,CACrB,AACD,oCACE,iBAAmB,CACpB,AACD,uDACE,kBAAmB,AACnB,MAAO,AACP,UAAW,AACX,eAAgB,AAChB,gBAAiB,AACjB,6BAA8B,AAC1B,yBAA0B,AACtB,oBAAsB,CAC/B,AACD,oOAEE,sBAA2B,AAC3B,sBAAuB,AACvB,kBAAoB,CACrB,AACD,qEACE,aAAe,CAChB,AACD,kiBAME,oCAAqC,AAC7B,2BAA6B,CACtC,AACD,wfAME,sCAAuC,AAC/B,6BAA+B,CACxC,AACD,8QAGE,qCAAsC,AAC9B,4BAA8B,CACvC,AACD,yPAGE,uCAAwC,AAChC,8BAAgC,CACzC,AACD,qFAEE,qBAAsB,AACtB,eAAgB,AAChB,iBAAmB,AACnB,gDAAkD,AAC9C,4CAA8C,AAC1C,uCAA0C,CACnD,AACD,iGAEE,cAAgB,CACjB,AACD,qBACE,kBAAoB,CACrB,AACD,yEACE,kBAAmB,AACnB,gBAAkB,CACnB,AACD,2CACE,qBAAsB,AACtB,eAAgB,AAChB,iBAAmB,AACnB,gDAAkD,AAC9C,4CAA8C,AAC1C,uCAA0C,CACnD,AACD,iDACE,cAAgB,CACjB,AACD,mEAEE,kBAAoB,CACrB,AAMD,2aAGE,yBAAiC,CAClC,AACD,6KAGE,WAAY,AACZ,sBAAwB,CACzB,AACD,mLAGE,WAAY,AACZ,kBAAoB,CACrB","file":"index.css","sourcesContent":["/* stylelint-disable at-rule-empty-line-before,at-rule-name-space-after,at-rule-no-unknown */\n/* stylelint-disable no-duplicate-selectors */\n/* stylelint-disable */\n/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors,string-no-newline */\n.ant-dropdown {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  color: rgba(0, 0, 0, 0.65);\n  font-size: 14px;\n  font-variant: tabular-nums;\n  line-height: 1.5;\n  list-style: none;\n  -webkit-font-feature-settings: 'tnum';\n          font-feature-settings: 'tnum';\n  position: absolute;\n  top: -9999px;\n  left: -9999px;\n  z-index: 1050;\n  display: block;\n}\n.ant-dropdown::before {\n  position: absolute;\n  top: -7px;\n  right: 0;\n  bottom: -7px;\n  left: -7px;\n  z-index: -9999;\n  opacity: 0.0001;\n  content: ' ';\n}\n.ant-dropdown-wrap {\n  position: relative;\n}\n.ant-dropdown-wrap .ant-btn > .anticon-down {\n  display: inline-block;\n  font-size: 12px;\n  font-size: 10px \\9;\n  -webkit-transform: scale(0.83333333) rotate(0deg);\n      -ms-transform: scale(0.83333333) rotate(0deg);\n          transform: scale(0.83333333) rotate(0deg);\n}\n:root .ant-dropdown-wrap .ant-btn > .anticon-down {\n  font-size: 12px;\n}\n.ant-dropdown-wrap .anticon-down::before {\n  -webkit-transition: -webkit-transform 0.2s;\n  transition: -webkit-transform 0.2s;\n  -o-transition: transform 0.2s;\n  transition: transform 0.2s;\n  transition: transform 0.2s, -webkit-transform 0.2s;\n}\n.ant-dropdown-wrap-open .anticon-down::before {\n  -webkit-transform: rotate(180deg);\n      -ms-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n.ant-dropdown-hidden,\n.ant-dropdown-menu-hidden {\n  display: none;\n}\n.ant-dropdown-menu {\n  position: relative;\n  margin: 0;\n  padding: 4px 0;\n  text-align: left;\n  list-style-type: none;\n  background-color: #fff;\n  background-clip: padding-box;\n  border-radius: 4px;\n  outline: none;\n  -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n  -webkit-transform: translate3d(0, 0, 0);\n}\n.ant-dropdown-menu-item-group-title {\n  padding: 5px 12px;\n  color: rgba(0, 0, 0, 0.45);\n  -webkit-transition: all 0.3s;\n  -o-transition: all 0.3s;\n  transition: all 0.3s;\n}\n.ant-dropdown-menu-submenu-popup {\n  position: absolute;\n  z-index: 1050;\n}\n.ant-dropdown-menu-submenu-popup > .ant-dropdown-menu {\n  -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0;\n}\n.ant-dropdown-menu-submenu-popup ul,\n.ant-dropdown-menu-submenu-popup li {\n  list-style: none;\n}\n.ant-dropdown-menu-submenu-popup ul {\n  margin-right: 0.3em;\n  margin-left: 0.3em;\n  padding: 0;\n}\n.ant-dropdown-menu-item,\n.ant-dropdown-menu-submenu-title {\n  clear: both;\n  margin: 0;\n  padding: 5px 12px;\n  color: rgba(0, 0, 0, 0.65);\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 22px;\n  white-space: nowrap;\n  cursor: pointer;\n  -webkit-transition: all 0.3s;\n  -o-transition: all 0.3s;\n  transition: all 0.3s;\n}\n.ant-dropdown-menu-item > .anticon:first-child,\n.ant-dropdown-menu-submenu-title > .anticon:first-child,\n.ant-dropdown-menu-item > span > .anticon:first-child,\n.ant-dropdown-menu-submenu-title > span > .anticon:first-child {\n  min-width: 12px;\n  margin-right: 8px;\n  font-size: 12px;\n}\n.ant-dropdown-menu-item > a,\n.ant-dropdown-menu-submenu-title > a {\n  display: block;\n  margin: -5px -12px;\n  padding: 5px 12px;\n  color: rgba(0, 0, 0, 0.65);\n  -webkit-transition: all 0.3s;\n  -o-transition: all 0.3s;\n  transition: all 0.3s;\n}\n.ant-dropdown-menu-item-selected,\n.ant-dropdown-menu-submenu-title-selected,\n.ant-dropdown-menu-item-selected > a,\n.ant-dropdown-menu-submenu-title-selected > a {\n  color: #1890ff;\n  background-color: #e6f7ff;\n}\n.ant-dropdown-menu-item:hover,\n.ant-dropdown-menu-submenu-title:hover {\n  background-color: #e6f7ff;\n}\n.ant-dropdown-menu-item-disabled,\n.ant-dropdown-menu-submenu-title-disabled {\n  color: rgba(0, 0, 0, 0.25);\n  cursor: not-allowed;\n}\n.ant-dropdown-menu-item-disabled:hover,\n.ant-dropdown-menu-submenu-title-disabled:hover {\n  color: rgba(0, 0, 0, 0.25);\n  background-color: #fff;\n  cursor: not-allowed;\n}\n.ant-dropdown-menu-item-divider,\n.ant-dropdown-menu-submenu-title-divider {\n  height: 1px;\n  margin: 4px 0;\n  overflow: hidden;\n  line-height: 0;\n  background-color: #e8e8e8;\n}\n.ant-dropdown-menu-item .ant-dropdown-menu-submenu-arrow,\n.ant-dropdown-menu-submenu-title .ant-dropdown-menu-submenu-arrow {\n  position: absolute;\n  right: 8px;\n}\n.ant-dropdown-menu-item .ant-dropdown-menu-submenu-arrow-icon,\n.ant-dropdown-menu-submenu-title .ant-dropdown-menu-submenu-arrow-icon {\n  color: rgba(0, 0, 0, 0.45);\n  font-style: normal;\n  display: inline-block;\n  font-size: 12px;\n  font-size: 10px \\9;\n  -webkit-transform: scale(0.83333333) rotate(0deg);\n      -ms-transform: scale(0.83333333) rotate(0deg);\n          transform: scale(0.83333333) rotate(0deg);\n}\n:root .ant-dropdown-menu-item .ant-dropdown-menu-submenu-arrow-icon,\n:root .ant-dropdown-menu-submenu-title .ant-dropdown-menu-submenu-arrow-icon {\n  font-size: 12px;\n}\n.ant-dropdown-menu-item-group-list {\n  margin: 0 8px;\n  padding: 0;\n  list-style: none;\n}\n.ant-dropdown-menu-submenu-title {\n  padding-right: 26px;\n}\n.ant-dropdown-menu-submenu-vertical {\n  position: relative;\n}\n.ant-dropdown-menu-submenu-vertical > .ant-dropdown-menu {\n  position: absolute;\n  top: 0;\n  left: 100%;\n  min-width: 100%;\n  margin-left: 4px;\n  -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0;\n}\n.ant-dropdown-menu-submenu.ant-dropdown-menu-submenu-disabled .ant-dropdown-menu-submenu-title,\n.ant-dropdown-menu-submenu.ant-dropdown-menu-submenu-disabled .ant-dropdown-menu-submenu-title .ant-dropdown-menu-submenu-arrow-icon {\n  color: rgba(0, 0, 0, 0.25);\n  background-color: #fff;\n  cursor: not-allowed;\n}\n.ant-dropdown-menu-submenu-selected .ant-dropdown-menu-submenu-title {\n  color: #1890ff;\n}\n.ant-dropdown.slide-down-enter.slide-down-enter-active.ant-dropdown-placement-bottomLeft,\n.ant-dropdown.slide-down-appear.slide-down-appear-active.ant-dropdown-placement-bottomLeft,\n.ant-dropdown.slide-down-enter.slide-down-enter-active.ant-dropdown-placement-bottomCenter,\n.ant-dropdown.slide-down-appear.slide-down-appear-active.ant-dropdown-placement-bottomCenter,\n.ant-dropdown.slide-down-enter.slide-down-enter-active.ant-dropdown-placement-bottomRight,\n.ant-dropdown.slide-down-appear.slide-down-appear-active.ant-dropdown-placement-bottomRight {\n  -webkit-animation-name: antSlideUpIn;\n          animation-name: antSlideUpIn;\n}\n.ant-dropdown.slide-up-enter.slide-up-enter-active.ant-dropdown-placement-topLeft,\n.ant-dropdown.slide-up-appear.slide-up-appear-active.ant-dropdown-placement-topLeft,\n.ant-dropdown.slide-up-enter.slide-up-enter-active.ant-dropdown-placement-topCenter,\n.ant-dropdown.slide-up-appear.slide-up-appear-active.ant-dropdown-placement-topCenter,\n.ant-dropdown.slide-up-enter.slide-up-enter-active.ant-dropdown-placement-topRight,\n.ant-dropdown.slide-up-appear.slide-up-appear-active.ant-dropdown-placement-topRight {\n  -webkit-animation-name: antSlideDownIn;\n          animation-name: antSlideDownIn;\n}\n.ant-dropdown.slide-down-leave.slide-down-leave-active.ant-dropdown-placement-bottomLeft,\n.ant-dropdown.slide-down-leave.slide-down-leave-active.ant-dropdown-placement-bottomCenter,\n.ant-dropdown.slide-down-leave.slide-down-leave-active.ant-dropdown-placement-bottomRight {\n  -webkit-animation-name: antSlideUpOut;\n          animation-name: antSlideUpOut;\n}\n.ant-dropdown.slide-up-leave.slide-up-leave-active.ant-dropdown-placement-topLeft,\n.ant-dropdown.slide-up-leave.slide-up-leave-active.ant-dropdown-placement-topCenter,\n.ant-dropdown.slide-up-leave.slide-up-leave-active.ant-dropdown-placement-topRight {\n  -webkit-animation-name: antSlideDownOut;\n          animation-name: antSlideDownOut;\n}\n.ant-dropdown-trigger > .anticon.anticon-down,\n.ant-dropdown-link > .anticon.anticon-down {\n  display: inline-block;\n  font-size: 12px;\n  font-size: 10px \\9;\n  -webkit-transform: scale(0.83333333) rotate(0deg);\n      -ms-transform: scale(0.83333333) rotate(0deg);\n          transform: scale(0.83333333) rotate(0deg);\n}\n:root .ant-dropdown-trigger > .anticon.anticon-down,\n:root .ant-dropdown-link > .anticon.anticon-down {\n  font-size: 12px;\n}\n.ant-dropdown-button {\n  white-space: nowrap;\n}\n.ant-dropdown-button.ant-btn-group > .ant-btn:last-child:not(:first-child) {\n  padding-right: 8px;\n  padding-left: 8px;\n}\n.ant-dropdown-button .anticon.anticon-down {\n  display: inline-block;\n  font-size: 12px;\n  font-size: 10px \\9;\n  -webkit-transform: scale(0.83333333) rotate(0deg);\n      -ms-transform: scale(0.83333333) rotate(0deg);\n          transform: scale(0.83333333) rotate(0deg);\n}\n:root .ant-dropdown-button .anticon.anticon-down {\n  font-size: 12px;\n}\n.ant-dropdown-menu-dark,\n.ant-dropdown-menu-dark .ant-dropdown-menu {\n  background: #001529;\n}\n.ant-dropdown-menu-dark .ant-dropdown-menu-item,\n.ant-dropdown-menu-dark .ant-dropdown-menu-submenu-title,\n.ant-dropdown-menu-dark .ant-dropdown-menu-item > a {\n  color: rgba(255, 255, 255, 0.65);\n}\n.ant-dropdown-menu-dark .ant-dropdown-menu-item .ant-dropdown-menu-submenu-arrow::after,\n.ant-dropdown-menu-dark .ant-dropdown-menu-submenu-title .ant-dropdown-menu-submenu-arrow::after,\n.ant-dropdown-menu-dark .ant-dropdown-menu-item > a .ant-dropdown-menu-submenu-arrow::after {\n  color: rgba(255, 255, 255, 0.65);\n}\n.ant-dropdown-menu-dark .ant-dropdown-menu-item:hover,\n.ant-dropdown-menu-dark .ant-dropdown-menu-submenu-title:hover,\n.ant-dropdown-menu-dark .ant-dropdown-menu-item > a:hover {\n  color: #fff;\n  background: transparent;\n}\n.ant-dropdown-menu-dark .ant-dropdown-menu-item-selected,\n.ant-dropdown-menu-dark .ant-dropdown-menu-item-selected:hover,\n.ant-dropdown-menu-dark .ant-dropdown-menu-item-selected > a {\n  color: #fff;\n  background: #1890ff;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dropdown__ = __webpack_require__(1103);

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__Dropdown__["a" /* default */]);

/***/ }),

/***/ 1103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_trigger__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__placements__ = __webpack_require__(1104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_lifecycles_compat__ = __webpack_require__(7);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    if ('visible' in props) {
      _this.state = {
        visible: props.visible
      };
    } else {
      _this.state = {
        visible: props.defaultVisible
      };
    }
    return _this;
  }

  Dropdown.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps) {
    if ('visible' in nextProps) {
      return {
        visible: nextProps.visible
      };
    }
    return null;
  };

  Dropdown.prototype.getOverlayElement = function getOverlayElement() {
    var overlay = this.props.overlay;

    var overlayElement = void 0;
    if (typeof overlay === 'function') {
      overlayElement = overlay();
    } else {
      overlayElement = overlay;
    }
    return overlayElement;
  };

  Dropdown.prototype.getMenuElementOrLambda = function getMenuElementOrLambda() {
    var overlay = this.props.overlay;

    if (typeof overlay === 'function') {
      return this.getMenuElement;
    }
    return this.getMenuElement();
  };

  Dropdown.prototype.getPopupDomNode = function getPopupDomNode() {
    return this.trigger.getPopupDomNode();
  };

  Dropdown.prototype.getOpenClassName = function getOpenClassName() {
    var _props = this.props,
        openClassName = _props.openClassName,
        prefixCls = _props.prefixCls;

    if (openClassName !== undefined) {
      return openClassName;
    }
    return prefixCls + '-open';
  };

  Dropdown.prototype.renderChildren = function renderChildren() {
    var children = this.props.children;
    var visible = this.state.visible;

    var childrenProps = children.props ? children.props : {};
    var childClassName = __WEBPACK_IMPORTED_MODULE_4_classnames___default()(childrenProps.className, this.getOpenClassName());
    return visible && children ? Object(__WEBPACK_IMPORTED_MODULE_0_react__["cloneElement"])(children, { className: childClassName }) : children;
  };

  Dropdown.prototype.render = function render() {
    var _props2 = this.props,
        prefixCls = _props2.prefixCls,
        transitionName = _props2.transitionName,
        animation = _props2.animation,
        align = _props2.align,
        placement = _props2.placement,
        getPopupContainer = _props2.getPopupContainer,
        showAction = _props2.showAction,
        hideAction = _props2.hideAction,
        overlayClassName = _props2.overlayClassName,
        overlayStyle = _props2.overlayStyle,
        trigger = _props2.trigger,
        otherProps = _objectWithoutProperties(_props2, ['prefixCls', 'transitionName', 'animation', 'align', 'placement', 'getPopupContainer', 'showAction', 'hideAction', 'overlayClassName', 'overlayStyle', 'trigger']);

    var triggerHideAction = hideAction;
    if (!triggerHideAction && trigger.indexOf('contextMenu') !== -1) {
      triggerHideAction = ['click'];
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_3_rc_trigger__["default"],
      _extends({}, otherProps, {
        prefixCls: prefixCls,
        ref: this.saveTrigger,
        popupClassName: overlayClassName,
        popupStyle: overlayStyle,
        builtinPlacements: __WEBPACK_IMPORTED_MODULE_5__placements__["a" /* default */],
        action: trigger,
        showAction: showAction,
        hideAction: triggerHideAction || [],
        popupPlacement: placement,
        popupAlign: align,
        popupTransitionName: transitionName,
        popupAnimation: animation,
        popupVisible: this.state.visible,
        afterPopupVisibleChange: this.afterVisibleChange,
        popup: this.getMenuElementOrLambda(),
        onPopupVisibleChange: this.onVisibleChange,
        getPopupContainer: getPopupContainer
      }),
      this.renderChildren()
    );
  };

  return Dropdown;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

Dropdown.propTypes = {
  minOverlayWidthMatchTrigger: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  onVisibleChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onOverlayClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  prefixCls: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
  transitionName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  overlayClassName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  openClassName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  animation: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
  align: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  overlayStyle: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  placement: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  overlay: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func]),
  trigger: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array,
  alignPoint: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  showAction: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array,
  hideAction: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array,
  getPopupContainer: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  visible: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  defaultVisible: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};
Dropdown.defaultProps = {
  prefixCls: 'rc-dropdown',
  trigger: ['hover'],
  showAction: [],
  overlayClassName: '',
  overlayStyle: {},
  defaultVisible: false,
  onVisibleChange: function onVisibleChange() {},

  placement: 'bottomLeft'
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onClick = function (e) {
    var props = _this2.props;
    var overlayProps = _this2.getOverlayElement().props;
    // do no call onVisibleChange, if you need click to hide, use onClick and control visible
    if (!('visible' in props)) {
      _this2.setState({
        visible: false
      });
    }
    if (props.onOverlayClick) {
      props.onOverlayClick(e);
    }
    if (overlayProps.onClick) {
      overlayProps.onClick(e);
    }
  };

  this.onVisibleChange = function (visible) {
    var props = _this2.props;
    if (!('visible' in props)) {
      _this2.setState({
        visible: visible
      });
    }
    props.onVisibleChange(visible);
  };

  this.getMinOverlayWidthMatchTrigger = function () {
    var _props3 = _this2.props,
        minOverlayWidthMatchTrigger = _props3.minOverlayWidthMatchTrigger,
        alignPoint = _props3.alignPoint;

    if ('minOverlayWidthMatchTrigger' in _this2.props) {
      return minOverlayWidthMatchTrigger;
    }

    return !alignPoint;
  };

  this.getMenuElement = function () {
    var prefixCls = _this2.props.prefixCls;

    var overlayElement = _this2.getOverlayElement();
    var extraOverlayProps = {
      prefixCls: prefixCls + '-menu',
      onClick: _this2.onClick
    };
    if (typeof overlayElement.type === 'string') {
      delete extraOverlayProps.prefixCls;
    }
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.cloneElement(overlayElement, extraOverlayProps);
  };

  this.afterVisibleChange = function (visible) {
    if (visible && _this2.getMinOverlayWidthMatchTrigger()) {
      var overlayNode = _this2.getPopupDomNode();
      var rootNode = __WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.findDOMNode(_this2);
      if (rootNode && overlayNode && rootNode.offsetWidth > overlayNode.offsetWidth) {
        overlayNode.style.minWidth = rootNode.offsetWidth + 'px';
        if (_this2.trigger && _this2.trigger._component && _this2.trigger._component.alignInstance) {
          _this2.trigger._component.alignInstance.forceAlign();
        }
      }
    }
  };

  this.saveTrigger = function (node) {
    _this2.trigger = node;
  };
};

Object(__WEBPACK_IMPORTED_MODULE_6_react_lifecycles_compat__["polyfill"])(Dropdown);

/* harmony default export */ __webpack_exports__["a"] = (Dropdown);

/***/ }),

/***/ 1104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export placements */
var autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1
};

var targetOffset = [0, 0];

var placements = {
  topLeft: {
    points: ['bl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset
  },
  topCenter: {
    points: ['bc', 'tc'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset
  },
  topRight: {
    points: ['br', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset
  },
  bottomLeft: {
    points: ['tl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset
  },
  bottomCenter: {
    points: ['tc', 'bc'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset
  },
  bottomRight: {
    points: ['tr', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset
  }
};

/* harmony default export */ __webpack_exports__["a"] = (placements);

/***/ }),

/***/ 1109:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1110);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(318)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 1110:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(317)(true);
// imports


// module
exports.push([module.i, ".ant-menu{-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0;font-size:14px;font-variant:tabular-nums;line-height:1.5;-webkit-font-feature-settings:\"tnum\";font-feature-settings:\"tnum\";margin-bottom:0;padding-left:0;color:rgba(0,0,0,.65);line-height:0;list-style:none;background:#fff;outline:none;-webkit-box-shadow:0 2px 8px rgba(0,0,0,.15);box-shadow:0 2px 8px rgba(0,0,0,.15);-webkit-transition:background .3s,width .2s;-o-transition:background .3s,width .2s;transition:background .3s,width .2s;zoom:1}.ant-menu:after,.ant-menu:before{display:table;content:\"\"}.ant-menu:after{clear:both}.ant-menu ol,.ant-menu ul{margin:0;padding:0;list-style:none}.ant-menu-hidden{display:none}.ant-menu-item-group-title{padding:8px 16px;color:rgba(0,0,0,.45);font-size:14px;line-height:1.5;-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s}.ant-menu-submenu,.ant-menu-submenu-inline{-webkit-transition:border-color .3s cubic-bezier(.645,.045,.355,1),background .3s cubic-bezier(.645,.045,.355,1),padding .15s cubic-bezier(.645,.045,.355,1);-o-transition:border-color .3s cubic-bezier(.645,.045,.355,1),background .3s cubic-bezier(.645,.045,.355,1),padding .15s cubic-bezier(.645,.045,.355,1);transition:border-color .3s cubic-bezier(.645,.045,.355,1),background .3s cubic-bezier(.645,.045,.355,1),padding .15s cubic-bezier(.645,.045,.355,1)}.ant-menu-submenu-selected{color:#1890ff}.ant-menu-item:active,.ant-menu-submenu-title:active{background:#e6f7ff}.ant-menu-submenu .ant-menu-sub{cursor:auto;-webkit-transition:background .3s cubic-bezier(.645,.045,.355,1),padding .3s cubic-bezier(.645,.045,.355,1);-o-transition:background .3s cubic-bezier(.645,.045,.355,1),padding .3s cubic-bezier(.645,.045,.355,1);transition:background .3s cubic-bezier(.645,.045,.355,1),padding .3s cubic-bezier(.645,.045,.355,1)}.ant-menu-item>a{display:block;color:rgba(0,0,0,.65)}.ant-menu-item>a:hover{color:#1890ff}.ant-menu-item>a:before{position:absolute;top:0;right:0;bottom:0;left:0;background-color:transparent;content:\"\"}.ant-menu-item>.ant-badge>a{color:rgba(0,0,0,.65)}.ant-menu-item>.ant-badge>a:hover{color:#1890ff}.ant-menu-item-divider{height:1px;overflow:hidden;line-height:0;background-color:#e8e8e8}.ant-menu-item-active,.ant-menu-item:hover,.ant-menu-submenu-active,.ant-menu-submenu-title:hover,.ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open{color:#1890ff}.ant-menu-horizontal .ant-menu-item,.ant-menu-horizontal .ant-menu-submenu{margin-top:-1px}.ant-menu-horizontal>.ant-menu-item-active,.ant-menu-horizontal>.ant-menu-item:hover,.ant-menu-horizontal>.ant-menu-submenu .ant-menu-submenu-title:hover{background-color:transparent}.ant-menu-item-selected,.ant-menu-item-selected>a,.ant-menu-item-selected>a:hover{color:#1890ff}.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{background-color:#e6f7ff}.ant-menu-inline,.ant-menu-vertical,.ant-menu-vertical-left{border-right:1px solid #e8e8e8}.ant-menu-vertical-right{border-left:1px solid #e8e8e8}.ant-menu-vertical-left.ant-menu-sub,.ant-menu-vertical-right.ant-menu-sub,.ant-menu-vertical.ant-menu-sub{min-width:160px;padding:0;border-right:0;-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0}.ant-menu-vertical-left.ant-menu-sub .ant-menu-item,.ant-menu-vertical-right.ant-menu-sub .ant-menu-item,.ant-menu-vertical.ant-menu-sub .ant-menu-item{left:0;margin-left:0;border-right:0}.ant-menu-vertical-left.ant-menu-sub .ant-menu-item:after,.ant-menu-vertical-right.ant-menu-sub .ant-menu-item:after,.ant-menu-vertical.ant-menu-sub .ant-menu-item:after{border-right:0}.ant-menu-vertical-left.ant-menu-sub>.ant-menu-item,.ant-menu-vertical-left.ant-menu-sub>.ant-menu-submenu,.ant-menu-vertical-right.ant-menu-sub>.ant-menu-item,.ant-menu-vertical-right.ant-menu-sub>.ant-menu-submenu,.ant-menu-vertical.ant-menu-sub>.ant-menu-item,.ant-menu-vertical.ant-menu-sub>.ant-menu-submenu{-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0}.ant-menu-horizontal.ant-menu-sub{min-width:114px}.ant-menu-item,.ant-menu-submenu-title{position:relative;display:block;margin:0;padding:0 20px;white-space:nowrap;cursor:pointer;-webkit-transition:color .3s cubic-bezier(.645,.045,.355,1),border-color .3s cubic-bezier(.645,.045,.355,1),background .3s cubic-bezier(.645,.045,.355,1),padding .15s cubic-bezier(.645,.045,.355,1);-o-transition:color .3s cubic-bezier(.645,.045,.355,1),border-color .3s cubic-bezier(.645,.045,.355,1),background .3s cubic-bezier(.645,.045,.355,1),padding .15s cubic-bezier(.645,.045,.355,1);transition:color .3s cubic-bezier(.645,.045,.355,1),border-color .3s cubic-bezier(.645,.045,.355,1),background .3s cubic-bezier(.645,.045,.355,1),padding .15s cubic-bezier(.645,.045,.355,1)}.ant-menu-item .anticon,.ant-menu-submenu-title .anticon{min-width:14px;margin-right:10px;font-size:14px;-webkit-transition:font-size .15s cubic-bezier(.215,.61,.355,1),margin .3s cubic-bezier(.645,.045,.355,1);-o-transition:font-size .15s cubic-bezier(.215,.61,.355,1),margin .3s cubic-bezier(.645,.045,.355,1);transition:font-size .15s cubic-bezier(.215,.61,.355,1),margin .3s cubic-bezier(.645,.045,.355,1)}.ant-menu-item .anticon+span,.ant-menu-submenu-title .anticon+span{opacity:1;-webkit-transition:opacity .3s cubic-bezier(.645,.045,.355,1),width .3s cubic-bezier(.645,.045,.355,1);-o-transition:opacity .3s cubic-bezier(.645,.045,.355,1),width .3s cubic-bezier(.645,.045,.355,1);transition:opacity .3s cubic-bezier(.645,.045,.355,1),width .3s cubic-bezier(.645,.045,.355,1)}.ant-menu>.ant-menu-item-divider{height:1px;margin:1px 0;padding:0;overflow:hidden;line-height:0;background-color:#e8e8e8}.ant-menu-submenu-popup{position:absolute;z-index:1050;background:#fff;border-radius:4px}.ant-menu-submenu-popup .submenu-title-wrapper{padding-right:20px}.ant-menu-submenu-popup:before{position:absolute;top:-7px;right:0;bottom:0;left:0;opacity:.0001;content:\" \"}.ant-menu-submenu>.ant-menu{background-color:#fff;border-radius:4px}.ant-menu-submenu-inline>.ant-menu-submenu-title .ant-menu-submenu-arrow,.ant-menu-submenu-vertical-left>.ant-menu-submenu-title .ant-menu-submenu-arrow,.ant-menu-submenu-vertical-right>.ant-menu-submenu-title .ant-menu-submenu-arrow,.ant-menu-submenu-vertical>.ant-menu-submenu-title .ant-menu-submenu-arrow,.ant-menu-submenu>.ant-menu-submenu-title:after{-webkit-transition:-webkit-transform .3s cubic-bezier(.645,.045,.355,1);transition:-webkit-transform .3s cubic-bezier(.645,.045,.355,1);-o-transition:transform .3s cubic-bezier(.645,.045,.355,1);transition:transform .3s cubic-bezier(.645,.045,.355,1);transition:transform .3s cubic-bezier(.645,.045,.355,1),-webkit-transform .3s cubic-bezier(.645,.045,.355,1)}.ant-menu-submenu-inline>.ant-menu-submenu-title .ant-menu-submenu-arrow,.ant-menu-submenu-vertical-left>.ant-menu-submenu-title .ant-menu-submenu-arrow,.ant-menu-submenu-vertical-right>.ant-menu-submenu-title .ant-menu-submenu-arrow,.ant-menu-submenu-vertical>.ant-menu-submenu-title .ant-menu-submenu-arrow{position:absolute;top:50%;right:16px;width:10px}.ant-menu-submenu-inline>.ant-menu-submenu-title .ant-menu-submenu-arrow:after,.ant-menu-submenu-inline>.ant-menu-submenu-title .ant-menu-submenu-arrow:before,.ant-menu-submenu-vertical-left>.ant-menu-submenu-title .ant-menu-submenu-arrow:after,.ant-menu-submenu-vertical-left>.ant-menu-submenu-title .ant-menu-submenu-arrow:before,.ant-menu-submenu-vertical-right>.ant-menu-submenu-title .ant-menu-submenu-arrow:after,.ant-menu-submenu-vertical-right>.ant-menu-submenu-title .ant-menu-submenu-arrow:before,.ant-menu-submenu-vertical>.ant-menu-submenu-title .ant-menu-submenu-arrow:after,.ant-menu-submenu-vertical>.ant-menu-submenu-title .ant-menu-submenu-arrow:before{position:absolute;width:6px;height:1.5px;background:#fff;background:rgba(0,0,0,.65)\\9;background-image:-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.65)),to(rgba(0,0,0,.65)));background-image:-webkit-linear-gradient(left,rgba(0,0,0,.65),rgba(0,0,0,.65));background-image:-o-linear-gradient(left,rgba(0,0,0,.65),rgba(0,0,0,.65));background-image:linear-gradient(90deg,rgba(0,0,0,.65),rgba(0,0,0,.65));background-image:none\\9;border-radius:2px;-webkit-transition:background .3s cubic-bezier(.645,.045,.355,1),top .3s cubic-bezier(.645,.045,.355,1),-webkit-transform .3s cubic-bezier(.645,.045,.355,1);transition:background .3s cubic-bezier(.645,.045,.355,1),top .3s cubic-bezier(.645,.045,.355,1),-webkit-transform .3s cubic-bezier(.645,.045,.355,1);-o-transition:background .3s cubic-bezier(.645,.045,.355,1),transform .3s cubic-bezier(.645,.045,.355,1),top .3s cubic-bezier(.645,.045,.355,1);transition:background .3s cubic-bezier(.645,.045,.355,1),transform .3s cubic-bezier(.645,.045,.355,1),top .3s cubic-bezier(.645,.045,.355,1);transition:background .3s cubic-bezier(.645,.045,.355,1),transform .3s cubic-bezier(.645,.045,.355,1),top .3s cubic-bezier(.645,.045,.355,1),-webkit-transform .3s cubic-bezier(.645,.045,.355,1);content:\"\"}.ant-menu-submenu-inline>.ant-menu-submenu-title .ant-menu-submenu-arrow:before,.ant-menu-submenu-vertical-left>.ant-menu-submenu-title .ant-menu-submenu-arrow:before,.ant-menu-submenu-vertical-right>.ant-menu-submenu-title .ant-menu-submenu-arrow:before,.ant-menu-submenu-vertical>.ant-menu-submenu-title .ant-menu-submenu-arrow:before{-webkit-transform:rotate(45deg) translateY(-2px);-ms-transform:rotate(45deg) translateY(-2px);transform:rotate(45deg) translateY(-2px)}.ant-menu-submenu-inline>.ant-menu-submenu-title .ant-menu-submenu-arrow:after,.ant-menu-submenu-vertical-left>.ant-menu-submenu-title .ant-menu-submenu-arrow:after,.ant-menu-submenu-vertical-right>.ant-menu-submenu-title .ant-menu-submenu-arrow:after,.ant-menu-submenu-vertical>.ant-menu-submenu-title .ant-menu-submenu-arrow:after{-webkit-transform:rotate(-45deg) translateY(2px);-ms-transform:rotate(-45deg) translateY(2px);transform:rotate(-45deg) translateY(2px)}.ant-menu-submenu-inline>.ant-menu-submenu-title:hover .ant-menu-submenu-arrow:after,.ant-menu-submenu-inline>.ant-menu-submenu-title:hover .ant-menu-submenu-arrow:before,.ant-menu-submenu-vertical-left>.ant-menu-submenu-title:hover .ant-menu-submenu-arrow:after,.ant-menu-submenu-vertical-left>.ant-menu-submenu-title:hover .ant-menu-submenu-arrow:before,.ant-menu-submenu-vertical-right>.ant-menu-submenu-title:hover .ant-menu-submenu-arrow:after,.ant-menu-submenu-vertical-right>.ant-menu-submenu-title:hover .ant-menu-submenu-arrow:before,.ant-menu-submenu-vertical>.ant-menu-submenu-title:hover .ant-menu-submenu-arrow:after,.ant-menu-submenu-vertical>.ant-menu-submenu-title:hover .ant-menu-submenu-arrow:before{background:-webkit-gradient(linear,left top,right top,from(#1890ff),to(#1890ff));background:-webkit-linear-gradient(left,#1890ff,#1890ff);background:-o-linear-gradient(left,#1890ff,#1890ff);background:linear-gradient(90deg,#1890ff,#1890ff)}.ant-menu-submenu-inline>.ant-menu-submenu-title .ant-menu-submenu-arrow:before{-webkit-transform:rotate(-45deg) translateX(2px);-ms-transform:rotate(-45deg) translateX(2px);transform:rotate(-45deg) translateX(2px)}.ant-menu-submenu-inline>.ant-menu-submenu-title .ant-menu-submenu-arrow:after{-webkit-transform:rotate(45deg) translateX(-2px);-ms-transform:rotate(45deg) translateX(-2px);transform:rotate(45deg) translateX(-2px)}.ant-menu-submenu-open.ant-menu-submenu-inline>.ant-menu-submenu-title .ant-menu-submenu-arrow{-webkit-transform:translateY(-2px);-ms-transform:translateY(-2px);transform:translateY(-2px)}.ant-menu-submenu-open.ant-menu-submenu-inline>.ant-menu-submenu-title .ant-menu-submenu-arrow:after{-webkit-transform:rotate(-45deg) translateX(-2px);-ms-transform:rotate(-45deg) translateX(-2px);transform:rotate(-45deg) translateX(-2px)}.ant-menu-submenu-open.ant-menu-submenu-inline>.ant-menu-submenu-title .ant-menu-submenu-arrow:before{-webkit-transform:rotate(45deg) translateX(2px);-ms-transform:rotate(45deg) translateX(2px);transform:rotate(45deg) translateX(2px)}.ant-menu-vertical-left .ant-menu-submenu-selected,.ant-menu-vertical-left .ant-menu-submenu-selected>a,.ant-menu-vertical-right .ant-menu-submenu-selected,.ant-menu-vertical-right .ant-menu-submenu-selected>a,.ant-menu-vertical .ant-menu-submenu-selected,.ant-menu-vertical .ant-menu-submenu-selected>a{color:#1890ff}.ant-menu-horizontal{line-height:46px;white-space:nowrap;border:0;border-bottom:1px solid #e8e8e8;-webkit-box-shadow:none;box-shadow:none}.ant-menu-horizontal>.ant-menu-item,.ant-menu-horizontal>.ant-menu-submenu{position:relative;top:1px;display:inline-block;vertical-align:bottom;border-bottom:2px solid transparent}.ant-menu-horizontal>.ant-menu-item-active,.ant-menu-horizontal>.ant-menu-item-open,.ant-menu-horizontal>.ant-menu-item-selected,.ant-menu-horizontal>.ant-menu-item:hover,.ant-menu-horizontal>.ant-menu-submenu-active,.ant-menu-horizontal>.ant-menu-submenu-open,.ant-menu-horizontal>.ant-menu-submenu-selected,.ant-menu-horizontal>.ant-menu-submenu:hover{color:#1890ff;border-bottom:2px solid #1890ff}.ant-menu-horizontal>.ant-menu-item>a{display:block;color:rgba(0,0,0,.65)}.ant-menu-horizontal>.ant-menu-item>a:hover{color:#1890ff}.ant-menu-horizontal>.ant-menu-item>a:before{bottom:-2px}.ant-menu-horizontal>.ant-menu-item-selected>a{color:#1890ff}.ant-menu-horizontal:after{display:block;clear:both;height:0;content:\" \"}.ant-menu-inline .ant-menu-item,.ant-menu-vertical-left .ant-menu-item,.ant-menu-vertical-right .ant-menu-item,.ant-menu-vertical .ant-menu-item{position:relative}.ant-menu-inline .ant-menu-item:after,.ant-menu-vertical-left .ant-menu-item:after,.ant-menu-vertical-right .ant-menu-item:after,.ant-menu-vertical .ant-menu-item:after{position:absolute;top:0;right:0;bottom:0;border-right:3px solid #1890ff;-webkit-transform:scaleY(.0001);-ms-transform:scaleY(.0001);transform:scaleY(.0001);opacity:0;-webkit-transition:opacity .15s cubic-bezier(.215,.61,.355,1),-webkit-transform .15s cubic-bezier(.215,.61,.355,1);transition:opacity .15s cubic-bezier(.215,.61,.355,1),-webkit-transform .15s cubic-bezier(.215,.61,.355,1);-o-transition:transform .15s cubic-bezier(.215,.61,.355,1),opacity .15s cubic-bezier(.215,.61,.355,1);transition:transform .15s cubic-bezier(.215,.61,.355,1),opacity .15s cubic-bezier(.215,.61,.355,1);transition:transform .15s cubic-bezier(.215,.61,.355,1),opacity .15s cubic-bezier(.215,.61,.355,1),-webkit-transform .15s cubic-bezier(.215,.61,.355,1);content:\"\"}.ant-menu-inline .ant-menu-item,.ant-menu-inline .ant-menu-submenu-title,.ant-menu-vertical-left .ant-menu-item,.ant-menu-vertical-left .ant-menu-submenu-title,.ant-menu-vertical-right .ant-menu-item,.ant-menu-vertical-right .ant-menu-submenu-title,.ant-menu-vertical .ant-menu-item,.ant-menu-vertical .ant-menu-submenu-title{height:40px;margin-top:4px;margin-bottom:4px;padding:0 16px;overflow:hidden;font-size:14px;line-height:40px;-o-text-overflow:ellipsis;text-overflow:ellipsis}.ant-menu-inline .ant-menu-submenu,.ant-menu-vertical-left .ant-menu-submenu,.ant-menu-vertical-right .ant-menu-submenu,.ant-menu-vertical .ant-menu-submenu{padding-bottom:.02px}.ant-menu-inline .ant-menu-item:not(:last-child),.ant-menu-vertical-left .ant-menu-item:not(:last-child),.ant-menu-vertical-right .ant-menu-item:not(:last-child),.ant-menu-vertical .ant-menu-item:not(:last-child){margin-bottom:8px}.ant-menu-inline>.ant-menu-item,.ant-menu-inline>.ant-menu-submenu>.ant-menu-submenu-title,.ant-menu-vertical-left>.ant-menu-item,.ant-menu-vertical-left>.ant-menu-submenu>.ant-menu-submenu-title,.ant-menu-vertical-right>.ant-menu-item,.ant-menu-vertical-right>.ant-menu-submenu>.ant-menu-submenu-title,.ant-menu-vertical>.ant-menu-item,.ant-menu-vertical>.ant-menu-submenu>.ant-menu-submenu-title{height:40px;line-height:40px}.ant-menu-inline{width:100%}.ant-menu-inline .ant-menu-item-selected:after,.ant-menu-inline .ant-menu-selected:after{-webkit-transform:scaleY(1);-ms-transform:scaleY(1);transform:scaleY(1);opacity:1;-webkit-transition:opacity .15s cubic-bezier(.645,.045,.355,1),-webkit-transform .15s cubic-bezier(.645,.045,.355,1);transition:opacity .15s cubic-bezier(.645,.045,.355,1),-webkit-transform .15s cubic-bezier(.645,.045,.355,1);-o-transition:transform .15s cubic-bezier(.645,.045,.355,1),opacity .15s cubic-bezier(.645,.045,.355,1);transition:transform .15s cubic-bezier(.645,.045,.355,1),opacity .15s cubic-bezier(.645,.045,.355,1);transition:transform .15s cubic-bezier(.645,.045,.355,1),opacity .15s cubic-bezier(.645,.045,.355,1),-webkit-transform .15s cubic-bezier(.645,.045,.355,1)}.ant-menu-inline .ant-menu-item,.ant-menu-inline .ant-menu-submenu-title{width:calc(100% + 1px)}.ant-menu-inline .ant-menu-submenu-title{padding-right:34px}.ant-menu-inline-collapsed{width:80px}.ant-menu-inline-collapsed>.ant-menu-item,.ant-menu-inline-collapsed>.ant-menu-item-group>.ant-menu-item-group-list>.ant-menu-item,.ant-menu-inline-collapsed>.ant-menu-item-group>.ant-menu-item-group-list>.ant-menu-submenu>.ant-menu-submenu-title,.ant-menu-inline-collapsed>.ant-menu-submenu>.ant-menu-submenu-title{left:0;padding:0 32px!important;-o-text-overflow:clip;text-overflow:clip}.ant-menu-inline-collapsed>.ant-menu-item-group>.ant-menu-item-group-list>.ant-menu-item .ant-menu-submenu-arrow,.ant-menu-inline-collapsed>.ant-menu-item-group>.ant-menu-item-group-list>.ant-menu-submenu>.ant-menu-submenu-title .ant-menu-submenu-arrow,.ant-menu-inline-collapsed>.ant-menu-item .ant-menu-submenu-arrow,.ant-menu-inline-collapsed>.ant-menu-submenu>.ant-menu-submenu-title .ant-menu-submenu-arrow{display:none}.ant-menu-inline-collapsed>.ant-menu-item-group>.ant-menu-item-group-list>.ant-menu-item .anticon,.ant-menu-inline-collapsed>.ant-menu-item-group>.ant-menu-item-group-list>.ant-menu-submenu>.ant-menu-submenu-title .anticon,.ant-menu-inline-collapsed>.ant-menu-item .anticon,.ant-menu-inline-collapsed>.ant-menu-submenu>.ant-menu-submenu-title .anticon{margin:0;font-size:16px;line-height:40px}.ant-menu-inline-collapsed>.ant-menu-item-group>.ant-menu-item-group-list>.ant-menu-item .anticon+span,.ant-menu-inline-collapsed>.ant-menu-item-group>.ant-menu-item-group-list>.ant-menu-submenu>.ant-menu-submenu-title .anticon+span,.ant-menu-inline-collapsed>.ant-menu-item .anticon+span,.ant-menu-inline-collapsed>.ant-menu-submenu>.ant-menu-submenu-title .anticon+span{display:inline-block;max-width:0;opacity:0}.ant-menu-inline-collapsed-tooltip{pointer-events:none}.ant-menu-inline-collapsed-tooltip .anticon{display:none}.ant-menu-inline-collapsed-tooltip a{color:hsla(0,0%,100%,.85)}.ant-menu-inline-collapsed .ant-menu-item-group-title{padding-right:4px;padding-left:4px;overflow:hidden;white-space:nowrap;-o-text-overflow:ellipsis;text-overflow:ellipsis}.ant-menu-item-group-list{margin:0;padding:0}.ant-menu-item-group-list .ant-menu-item,.ant-menu-item-group-list .ant-menu-submenu-title{padding:0 16px 0 28px}.ant-menu-root.ant-menu-inline,.ant-menu-root.ant-menu-vertical,.ant-menu-root.ant-menu-vertical-left,.ant-menu-root.ant-menu-vertical-right,.ant-menu-sub.ant-menu-inline{-webkit-box-shadow:none;box-shadow:none}.ant-menu-sub.ant-menu-inline{padding:0;border:0;border-radius:0}.ant-menu-sub.ant-menu-inline>.ant-menu-item,.ant-menu-sub.ant-menu-inline>.ant-menu-submenu>.ant-menu-submenu-title{height:40px;line-height:40px;list-style-position:inside;list-style-type:disc}.ant-menu-sub.ant-menu-inline .ant-menu-item-group-title{padding-left:32px}.ant-menu-item-disabled,.ant-menu-submenu-disabled{color:rgba(0,0,0,.25)!important;background:none;border-color:transparent!important;cursor:not-allowed}.ant-menu-item-disabled>a,.ant-menu-submenu-disabled>a{color:rgba(0,0,0,.25)!important;pointer-events:none}.ant-menu-item-disabled>.ant-menu-submenu-title,.ant-menu-submenu-disabled>.ant-menu-submenu-title{color:rgba(0,0,0,.25)!important;cursor:not-allowed}.ant-menu-item-disabled>.ant-menu-submenu-title>.ant-menu-submenu-arrow:after,.ant-menu-item-disabled>.ant-menu-submenu-title>.ant-menu-submenu-arrow:before,.ant-menu-submenu-disabled>.ant-menu-submenu-title>.ant-menu-submenu-arrow:after,.ant-menu-submenu-disabled>.ant-menu-submenu-title>.ant-menu-submenu-arrow:before{background:rgba(0,0,0,.25)!important}.ant-menu-dark,.ant-menu-dark .ant-menu-sub{color:hsla(0,0%,100%,.65);background:#001529}.ant-menu-dark .ant-menu-sub .ant-menu-submenu-title .ant-menu-submenu-arrow,.ant-menu-dark .ant-menu-submenu-title .ant-menu-submenu-arrow{opacity:.45;-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s}.ant-menu-dark .ant-menu-sub .ant-menu-submenu-title .ant-menu-submenu-arrow:after,.ant-menu-dark .ant-menu-sub .ant-menu-submenu-title .ant-menu-submenu-arrow:before,.ant-menu-dark .ant-menu-submenu-title .ant-menu-submenu-arrow:after,.ant-menu-dark .ant-menu-submenu-title .ant-menu-submenu-arrow:before{background:#fff}.ant-menu-dark.ant-menu-submenu-popup{background:transparent}.ant-menu-dark .ant-menu-inline.ant-menu-sub{background:#000c17;-webkit-box-shadow:0 2px 8px rgba(0,0,0,.45) inset;box-shadow:inset 0 2px 8px rgba(0,0,0,.45)}.ant-menu-dark.ant-menu-horizontal{border-bottom:0}.ant-menu-dark.ant-menu-horizontal>.ant-menu-item,.ant-menu-dark.ant-menu-horizontal>.ant-menu-submenu{top:0;margin-top:0;border-color:#001529;border-bottom:0}.ant-menu-dark.ant-menu-horizontal>.ant-menu-item>a:before{bottom:0}.ant-menu-dark .ant-menu-item,.ant-menu-dark .ant-menu-item-group-title,.ant-menu-dark .ant-menu-item>a{color:hsla(0,0%,100%,.65)}.ant-menu-dark.ant-menu-inline,.ant-menu-dark.ant-menu-vertical,.ant-menu-dark.ant-menu-vertical-left,.ant-menu-dark.ant-menu-vertical-right{border-right:0}.ant-menu-dark.ant-menu-inline .ant-menu-item,.ant-menu-dark.ant-menu-vertical-left .ant-menu-item,.ant-menu-dark.ant-menu-vertical-right .ant-menu-item,.ant-menu-dark.ant-menu-vertical .ant-menu-item{left:0;margin-left:0;border-right:0}.ant-menu-dark.ant-menu-inline .ant-menu-item:after,.ant-menu-dark.ant-menu-vertical-left .ant-menu-item:after,.ant-menu-dark.ant-menu-vertical-right .ant-menu-item:after,.ant-menu-dark.ant-menu-vertical .ant-menu-item:after{border-right:0}.ant-menu-dark.ant-menu-inline .ant-menu-item,.ant-menu-dark.ant-menu-inline .ant-menu-submenu-title{width:100%}.ant-menu-dark .ant-menu-item-active,.ant-menu-dark .ant-menu-item:hover,.ant-menu-dark .ant-menu-submenu-active,.ant-menu-dark .ant-menu-submenu-open,.ant-menu-dark .ant-menu-submenu-selected,.ant-menu-dark .ant-menu-submenu-title:hover{color:#fff;background-color:transparent}.ant-menu-dark .ant-menu-item-active>a,.ant-menu-dark .ant-menu-item:hover>a,.ant-menu-dark .ant-menu-submenu-active>a,.ant-menu-dark .ant-menu-submenu-open>a,.ant-menu-dark .ant-menu-submenu-selected>a,.ant-menu-dark .ant-menu-submenu-title:hover>a{color:#fff}.ant-menu-dark .ant-menu-item-active>.ant-menu-submenu-title:hover>.ant-menu-submenu-arrow,.ant-menu-dark .ant-menu-item-active>.ant-menu-submenu-title>.ant-menu-submenu-arrow,.ant-menu-dark .ant-menu-item:hover>.ant-menu-submenu-title:hover>.ant-menu-submenu-arrow,.ant-menu-dark .ant-menu-item:hover>.ant-menu-submenu-title>.ant-menu-submenu-arrow,.ant-menu-dark .ant-menu-submenu-active>.ant-menu-submenu-title:hover>.ant-menu-submenu-arrow,.ant-menu-dark .ant-menu-submenu-active>.ant-menu-submenu-title>.ant-menu-submenu-arrow,.ant-menu-dark .ant-menu-submenu-open>.ant-menu-submenu-title:hover>.ant-menu-submenu-arrow,.ant-menu-dark .ant-menu-submenu-open>.ant-menu-submenu-title>.ant-menu-submenu-arrow,.ant-menu-dark .ant-menu-submenu-selected>.ant-menu-submenu-title:hover>.ant-menu-submenu-arrow,.ant-menu-dark .ant-menu-submenu-selected>.ant-menu-submenu-title>.ant-menu-submenu-arrow,.ant-menu-dark .ant-menu-submenu-title:hover>.ant-menu-submenu-title:hover>.ant-menu-submenu-arrow,.ant-menu-dark .ant-menu-submenu-title:hover>.ant-menu-submenu-title>.ant-menu-submenu-arrow{opacity:1}.ant-menu-dark .ant-menu-item-active>.ant-menu-submenu-title:hover>.ant-menu-submenu-arrow:after,.ant-menu-dark .ant-menu-item-active>.ant-menu-submenu-title:hover>.ant-menu-submenu-arrow:before,.ant-menu-dark .ant-menu-item-active>.ant-menu-submenu-title>.ant-menu-submenu-arrow:after,.ant-menu-dark .ant-menu-item-active>.ant-menu-submenu-title>.ant-menu-submenu-arrow:before,.ant-menu-dark .ant-menu-item:hover>.ant-menu-submenu-title:hover>.ant-menu-submenu-arrow:after,.ant-menu-dark .ant-menu-item:hover>.ant-menu-submenu-title:hover>.ant-menu-submenu-arrow:before,.ant-menu-dark .ant-menu-item:hover>.ant-menu-submenu-title>.ant-menu-submenu-arrow:after,.ant-menu-dark .ant-menu-item:hover>.ant-menu-submenu-title>.ant-menu-submenu-arrow:before,.ant-menu-dark .ant-menu-submenu-active>.ant-menu-submenu-title:hover>.ant-menu-submenu-arrow:after,.ant-menu-dark .ant-menu-submenu-active>.ant-menu-submenu-title:hover>.ant-menu-submenu-arrow:before,.ant-menu-dark .ant-menu-submenu-active>.ant-menu-submenu-title>.ant-menu-submenu-arrow:after,.ant-menu-dark .ant-menu-submenu-active>.ant-menu-submenu-title>.ant-menu-submenu-arrow:before,.ant-menu-dark .ant-menu-submenu-open>.ant-menu-submenu-title:hover>.ant-menu-submenu-arrow:after,.ant-menu-dark .ant-menu-submenu-open>.ant-menu-submenu-title:hover>.ant-menu-submenu-arrow:before,.ant-menu-dark .ant-menu-submenu-open>.ant-menu-submenu-title>.ant-menu-submenu-arrow:after,.ant-menu-dark .ant-menu-submenu-open>.ant-menu-submenu-title>.ant-menu-submenu-arrow:before,.ant-menu-dark .ant-menu-submenu-selected>.ant-menu-submenu-title:hover>.ant-menu-submenu-arrow:after,.ant-menu-dark .ant-menu-submenu-selected>.ant-menu-submenu-title:hover>.ant-menu-submenu-arrow:before,.ant-menu-dark .ant-menu-submenu-selected>.ant-menu-submenu-title>.ant-menu-submenu-arrow:after,.ant-menu-dark .ant-menu-submenu-selected>.ant-menu-submenu-title>.ant-menu-submenu-arrow:before,.ant-menu-dark .ant-menu-submenu-title:hover>.ant-menu-submenu-title:hover>.ant-menu-submenu-arrow:after,.ant-menu-dark .ant-menu-submenu-title:hover>.ant-menu-submenu-title:hover>.ant-menu-submenu-arrow:before,.ant-menu-dark .ant-menu-submenu-title:hover>.ant-menu-submenu-title>.ant-menu-submenu-arrow:after,.ant-menu-dark .ant-menu-submenu-title:hover>.ant-menu-submenu-title>.ant-menu-submenu-arrow:before{background:#fff}.ant-menu-dark .ant-menu-item:hover{background-color:transparent}.ant-menu-dark .ant-menu-item-selected{color:#fff;border-right:0}.ant-menu-dark .ant-menu-item-selected:after{border-right:0}.ant-menu-dark .ant-menu-item-selected .anticon,.ant-menu-dark .ant-menu-item-selected .anticon+span,.ant-menu-dark .ant-menu-item-selected>a,.ant-menu-dark .ant-menu-item-selected>a:hover{color:#fff}.ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected,.ant-menu.ant-menu-dark .ant-menu-item-selected{background-color:#1890ff}.ant-menu-dark .ant-menu-item-disabled,.ant-menu-dark .ant-menu-item-disabled>a,.ant-menu-dark .ant-menu-submenu-disabled,.ant-menu-dark .ant-menu-submenu-disabled>a{color:hsla(0,0%,100%,.35)!important;opacity:.8}.ant-menu-dark .ant-menu-item-disabled>.ant-menu-submenu-title,.ant-menu-dark .ant-menu-submenu-disabled>.ant-menu-submenu-title{color:hsla(0,0%,100%,.35)!important}.ant-menu-dark .ant-menu-item-disabled>.ant-menu-submenu-title>.ant-menu-submenu-arrow:after,.ant-menu-dark .ant-menu-item-disabled>.ant-menu-submenu-title>.ant-menu-submenu-arrow:before,.ant-menu-dark .ant-menu-submenu-disabled>.ant-menu-submenu-title>.ant-menu-submenu-arrow:after,.ant-menu-dark .ant-menu-submenu-disabled>.ant-menu-submenu-title>.ant-menu-submenu-arrow:before{background:hsla(0,0%,100%,.35)!important}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/node_modules/antd/lib/menu/style/index.css"],"names":[],"mappings":"AAIA,UACE,8BAA+B,AACvB,sBAAuB,AAC/B,SAAU,AACV,UAAW,AACX,eAAgB,AAChB,0BAA2B,AAC3B,gBAAiB,AACjB,qCAAsC,AAC9B,6BAA8B,AACtC,gBAAiB,AACjB,eAAgB,AAChB,sBAA2B,AAC3B,cAAe,AACf,gBAAiB,AACjB,gBAAiB,AACjB,aAAc,AACd,6CAAkD,AAC1C,qCAA0C,AAClD,4CAAgD,AAChD,uCAA2C,AAC3C,oCAAwC,AACxC,MAAQ,CACT,AACD,iCAEE,cAAe,AACf,UAAY,CACb,AACD,gBACE,UAAY,CACb,AACD,0BAEE,SAAU,AACV,UAAW,AACX,eAAiB,CAClB,AACD,iBACE,YAAc,CACf,AACD,2BACE,iBAAkB,AAClB,sBAA2B,AAC3B,eAAgB,AAChB,gBAAiB,AACjB,2BAA6B,AAC7B,sBAAwB,AACxB,kBAAqB,CACtB,AACD,2CAEE,6JAAqL,AACrL,wJAAgL,AAChL,oJAA6K,CAC9K,AACD,2BACE,aAAe,CAChB,AACD,qDAEE,kBAAoB,CACrB,AACD,gCACE,YAAgB,AAChB,4GAA4H,AAC5H,uGAAuH,AACvH,mGAAoH,CACrH,AACD,iBACE,cAAe,AACf,qBAA2B,CAC5B,AACD,uBACE,aAAe,CAChB,AACD,wBACE,kBAAmB,AACnB,MAAO,AACP,QAAS,AACT,SAAU,AACV,OAAQ,AACR,6BAA8B,AAC9B,UAAY,CACb,AACD,4BACE,qBAA2B,CAC5B,AACD,kCACE,aAAe,CAChB,AACD,uBACE,WAAY,AACZ,gBAAiB,AACjB,cAAe,AACf,wBAA0B,CAC3B,AACD,yJAKE,aAAe,CAChB,AACD,2EAEE,eAAiB,CAClB,AACD,0JAGE,4BAA8B,CAC/B,AAID,kFAEE,aAAe,CAChB,AACD,4DACE,wBAA0B,CAC3B,AACD,4DAGE,8BAAgC,CACjC,AACD,yBACE,6BAA+B,CAChC,AACD,2GAGE,gBAAiB,AACjB,UAAW,AACX,eAAgB,AAChB,6BAA8B,AAC1B,yBAA0B,AACtB,oBAAsB,CAC/B,AACD,wJAGE,OAAQ,AACR,cAAe,AACf,cAAgB,CACjB,AACD,0KAGE,cAAgB,CACjB,AACD,yTAME,6BAA8B,AAC1B,yBAA0B,AACtB,oBAAsB,CAC/B,AACD,kCACE,eAAiB,CAClB,AACD,uCAEE,kBAAmB,AACnB,cAAe,AACf,SAAU,AACV,eAAgB,AAChB,mBAAoB,AACpB,eAAgB,AAChB,sMAAsO,AACtO,iMAAiO,AACjO,6LAA8N,CAC/N,AACD,yDAEE,eAAgB,AAChB,kBAAmB,AACnB,eAAgB,AAChB,0GAA0H,AAC1H,qGAAqH,AACrH,iGAAkH,CACnH,AACD,mEAEE,UAAW,AACX,uGAAuH,AACvH,kGAAkH,AAClH,8FAA+G,CAChH,AACD,iCACE,WAAY,AACZ,aAAc,AACd,UAAW,AACX,gBAAiB,AACjB,cAAe,AACf,wBAA0B,CAC3B,AACD,wBACE,kBAAmB,AACnB,aAAc,AACd,gBAAiB,AACjB,iBAAmB,CACpB,AACD,+CACE,kBAAoB,CACrB,AACD,+BACE,kBAAmB,AACnB,SAAU,AACV,QAAS,AACT,SAAU,AACV,OAAQ,AACR,cAAgB,AAChB,WAAa,CACd,AACD,4BACE,sBAAuB,AACvB,iBAAmB,CACpB,AAQD,qWANE,wEAAgF,AAChF,gEAAwE,AACxE,2DAAmE,AACnE,wDAAgE,AAChE,4GAA6H,CAe9H,AAbD,qTAIE,kBAAmB,AACnB,QAAS,AACT,WAAY,AACZ,UAAY,CAMb,AACD,8pBAQE,kBAAmB,AACnB,UAAW,AACX,aAAc,AACd,gBAAiB,AACjB,6BAAmC,AACnC,uGAAoH,AACpH,+EAA0F,AAC1F,0EAAqF,AACrF,wEAAsF,AACtF,wBAA0B,AAC1B,kBAAmB,AACnB,6JAAqL,AACrL,qJAA6K,AAC7K,gJAAwK,AACxK,6IAAqK,AACrK,kMAAkO,AAClO,UAAY,CACb,AACD,iVAIE,iDAAkD,AAC9C,6CAA8C,AAC1C,wCAA0C,CACnD,AACD,6UAIE,iDAAkD,AAC9C,6CAA8C,AAC1C,wCAA0C,CACnD,AACD,8sBAQE,iFAAsF,AACtF,yDAA4D,AAC5D,oDAAuD,AACvD,iDAAwD,CACzD,AACD,gFACE,iDAAkD,AAC9C,6CAA8C,AAC1C,wCAA0C,CACnD,AACD,+EACE,iDAAkD,AAC9C,6CAA8C,AAC1C,wCAA0C,CACnD,AACD,+FACE,mCAAoC,AAChC,+BAAgC,AAC5B,0BAA4B,CACrC,AACD,qGACE,kDAAmD,AAC/C,8CAA+C,AAC3C,yCAA2C,CACpD,AACD,sGACE,gDAAiD,AAC7C,4CAA6C,AACzC,uCAAyC,CAClD,AAMD,gTAGE,aAAe,CAChB,AACD,qBACE,iBAAkB,AAClB,mBAAoB,AACpB,SAAU,AACV,gCAAiC,AACjC,wBAAyB,AACjB,eAAiB,CAC1B,AACD,2EAEE,kBAAmB,AACnB,QAAS,AACT,qBAAsB,AACtB,sBAAuB,AACvB,mCAAqC,CACtC,AACD,kWAQE,cAAe,AACf,+BAAiC,CAClC,AACD,sCACE,cAAe,AACf,qBAA2B,CAC5B,AACD,4CACE,aAAe,CAChB,AACD,6CACE,WAAa,CACd,AACD,+CACE,aAAe,CAChB,AACD,2BACE,cAAe,AACf,WAAY,AACZ,SAAU,AACV,WAAe,CAChB,AACD,iJAIE,iBAAmB,CACpB,AACD,yKAIE,kBAAmB,AACnB,MAAO,AACP,QAAS,AACT,SAAU,AACV,+BAAgC,AAChC,gCAAkC,AAC9B,4BAA8B,AAC1B,wBAA0B,AAClC,UAAW,AACX,mHAAmI,AACnI,2GAA2H,AAC3H,sGAAsH,AACtH,mGAAmH,AACnH,wJAAgL,AAChL,UAAY,CACb,AACD,sUAQE,YAAa,AACb,eAAgB,AAChB,kBAAmB,AACnB,eAAgB,AAChB,gBAAiB,AACjB,eAAgB,AAChB,iBAAkB,AAClB,0BAA2B,AACxB,sBAAwB,CAC5B,AACD,6JAIE,oBAAuB,CACxB,AACD,qNAIE,iBAAmB,CACpB,AACD,8YAQE,YAAa,AACb,gBAAkB,CACnB,AACD,iBACE,UAAY,CACb,AACD,yFAEE,4BAA6B,AACzB,wBAAyB,AACrB,oBAAqB,AAC7B,UAAW,AACX,qHAAqI,AACrI,6GAA6H,AAC7H,wGAAwH,AACxH,qGAAqH,AACrH,0JAAmL,CACpL,AACD,yEAEE,sBAAwB,CACzB,AACD,yCACE,kBAAoB,CACrB,AACD,2BACE,UAAY,CACb,AACD,4TAIE,OAAQ,AACR,yBAA2B,AAC3B,sBAAuB,AACpB,kBAAoB,CACxB,AACD,4ZAIE,YAAc,CACf,AACD,gWAIE,SAAU,AACV,eAAgB,AAChB,gBAAkB,CACnB,AACD,oXAIE,qBAAsB,AACtB,YAAa,AACb,SAAW,CACZ,AACD,mCACE,mBAAqB,CACtB,AACD,4CACE,YAAc,CACf,AACD,qCACE,yBAAiC,CAClC,AACD,sDACE,kBAAmB,AACnB,iBAAkB,AAClB,gBAAiB,AACjB,mBAAoB,AACpB,0BAA2B,AACxB,sBAAwB,CAC5B,AACD,0BACE,SAAU,AACV,SAAW,CACZ,AACD,2FAEE,qBAAuB,CACxB,AAQD,2KAHE,wBAAyB,AACjB,eAAiB,CAQ1B,AAND,8BACE,UAAW,AACX,SAAU,AACV,eAAiB,CAGlB,AACD,qHAEE,YAAa,AACb,iBAAkB,AAClB,2BAA4B,AAC5B,oBAAsB,CACvB,AACD,yDACE,iBAAmB,CACpB,AACD,mDAEE,gCAAsC,AACtC,gBAAiB,AACjB,mCAAqC,AACrC,kBAAoB,CACrB,AACD,uDAEE,gCAAsC,AACtC,mBAAqB,CACtB,AACD,mGAEE,gCAAsC,AACtC,kBAAoB,CACrB,AACD,gUAIE,oCAA2C,CAC5C,AACD,4CAEE,0BAAiC,AACjC,kBAAoB,CACrB,AACD,4IAEE,YAAc,AACd,2BAA6B,AAC7B,sBAAwB,AACxB,kBAAqB,CACtB,AACD,kTAIE,eAAiB,CAClB,AACD,sCACE,sBAAwB,CACzB,AACD,6CACE,mBAAoB,AACpB,mDAAwD,AAChD,0CAAgD,CACzD,AACD,mCACE,eAAiB,CAClB,AACD,uGAEE,MAAO,AACP,aAAc,AACd,qBAAsB,AACtB,eAAiB,CAClB,AACD,2DACE,QAAU,CACX,AACD,wGAGE,yBAAiC,CAClC,AACD,6IAIE,cAAgB,CACjB,AACD,yMAIE,OAAQ,AACR,cAAe,AACf,cAAgB,CACjB,AACD,iOAIE,cAAgB,CACjB,AACD,qGAEE,UAAY,CACb,AACD,8OAME,WAAY,AACZ,4BAA8B,CAC/B,AACD,0PAME,UAAY,CACb,AACD,gkCAYE,SAAW,CACZ,AACD,4xEAwBE,eAAiB,CAClB,AACD,oCACE,4BAA8B,CAC/B,AACD,uCACE,WAAY,AACZ,cAAgB,CACjB,AACD,6CACE,cAAgB,CACjB,AAQD,6LACE,UAAY,CACb,AACD,8GAEE,wBAA0B,CAC3B,AACD,sKAIE,oCAA4C,AAC5C,UAAa,CACd,AACD,iIAEE,mCAA4C,CAC7C,AACD,4XAIE,wCAAiD,CAClD","file":"index.css","sourcesContent":["/* stylelint-disable at-rule-empty-line-before,at-rule-name-space-after,at-rule-no-unknown */\n/* stylelint-disable no-duplicate-selectors */\n/* stylelint-disable */\n/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors,string-no-newline */\n.ant-menu {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  font-size: 14px;\n  font-variant: tabular-nums;\n  line-height: 1.5;\n  -webkit-font-feature-settings: 'tnum';\n          font-feature-settings: 'tnum';\n  margin-bottom: 0;\n  padding-left: 0;\n  color: rgba(0, 0, 0, 0.65);\n  line-height: 0;\n  list-style: none;\n  background: #fff;\n  outline: none;\n  -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n  -webkit-transition: background 0.3s, width 0.2s;\n  -o-transition: background 0.3s, width 0.2s;\n  transition: background 0.3s, width 0.2s;\n  zoom: 1;\n}\n.ant-menu::before,\n.ant-menu::after {\n  display: table;\n  content: '';\n}\n.ant-menu::after {\n  clear: both;\n}\n.ant-menu ul,\n.ant-menu ol {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.ant-menu-hidden {\n  display: none;\n}\n.ant-menu-item-group-title {\n  padding: 8px 16px;\n  color: rgba(0, 0, 0, 0.45);\n  font-size: 14px;\n  line-height: 1.5;\n  -webkit-transition: all 0.3s;\n  -o-transition: all 0.3s;\n  transition: all 0.3s;\n}\n.ant-menu-submenu,\n.ant-menu-submenu-inline {\n  -webkit-transition: border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);\n  -o-transition: border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n.ant-menu-submenu-selected {\n  color: #1890ff;\n}\n.ant-menu-item:active,\n.ant-menu-submenu-title:active {\n  background: #e6f7ff;\n}\n.ant-menu-submenu .ant-menu-sub {\n  cursor: initial;\n  -webkit-transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  -o-transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n.ant-menu-item > a {\n  display: block;\n  color: rgba(0, 0, 0, 0.65);\n}\n.ant-menu-item > a:hover {\n  color: #1890ff;\n}\n.ant-menu-item > a::before {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: transparent;\n  content: '';\n}\n.ant-menu-item > .ant-badge > a {\n  color: rgba(0, 0, 0, 0.65);\n}\n.ant-menu-item > .ant-badge > a:hover {\n  color: #1890ff;\n}\n.ant-menu-item-divider {\n  height: 1px;\n  overflow: hidden;\n  line-height: 0;\n  background-color: #e8e8e8;\n}\n.ant-menu-item:hover,\n.ant-menu-item-active,\n.ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,\n.ant-menu-submenu-active,\n.ant-menu-submenu-title:hover {\n  color: #1890ff;\n}\n.ant-menu-horizontal .ant-menu-item,\n.ant-menu-horizontal .ant-menu-submenu {\n  margin-top: -1px;\n}\n.ant-menu-horizontal > .ant-menu-item:hover,\n.ant-menu-horizontal > .ant-menu-item-active,\n.ant-menu-horizontal > .ant-menu-submenu .ant-menu-submenu-title:hover {\n  background-color: transparent;\n}\n.ant-menu-item-selected {\n  color: #1890ff;\n}\n.ant-menu-item-selected > a,\n.ant-menu-item-selected > a:hover {\n  color: #1890ff;\n}\n.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {\n  background-color: #e6f7ff;\n}\n.ant-menu-inline,\n.ant-menu-vertical,\n.ant-menu-vertical-left {\n  border-right: 1px solid #e8e8e8;\n}\n.ant-menu-vertical-right {\n  border-left: 1px solid #e8e8e8;\n}\n.ant-menu-vertical.ant-menu-sub,\n.ant-menu-vertical-left.ant-menu-sub,\n.ant-menu-vertical-right.ant-menu-sub {\n  min-width: 160px;\n  padding: 0;\n  border-right: 0;\n  -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0;\n}\n.ant-menu-vertical.ant-menu-sub .ant-menu-item,\n.ant-menu-vertical-left.ant-menu-sub .ant-menu-item,\n.ant-menu-vertical-right.ant-menu-sub .ant-menu-item {\n  left: 0;\n  margin-left: 0;\n  border-right: 0;\n}\n.ant-menu-vertical.ant-menu-sub .ant-menu-item::after,\n.ant-menu-vertical-left.ant-menu-sub .ant-menu-item::after,\n.ant-menu-vertical-right.ant-menu-sub .ant-menu-item::after {\n  border-right: 0;\n}\n.ant-menu-vertical.ant-menu-sub > .ant-menu-item,\n.ant-menu-vertical-left.ant-menu-sub > .ant-menu-item,\n.ant-menu-vertical-right.ant-menu-sub > .ant-menu-item,\n.ant-menu-vertical.ant-menu-sub > .ant-menu-submenu,\n.ant-menu-vertical-left.ant-menu-sub > .ant-menu-submenu,\n.ant-menu-vertical-right.ant-menu-sub > .ant-menu-submenu {\n  -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0;\n}\n.ant-menu-horizontal.ant-menu-sub {\n  min-width: 114px;\n}\n.ant-menu-item,\n.ant-menu-submenu-title {\n  position: relative;\n  display: block;\n  margin: 0;\n  padding: 0 20px;\n  white-space: nowrap;\n  cursor: pointer;\n  -webkit-transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);\n  -o-transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n.ant-menu-item .anticon,\n.ant-menu-submenu-title .anticon {\n  min-width: 14px;\n  margin-right: 10px;\n  font-size: 14px;\n  -webkit-transition: font-size 0.15s cubic-bezier(0.215, 0.61, 0.355, 1), margin 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  -o-transition: font-size 0.15s cubic-bezier(0.215, 0.61, 0.355, 1), margin 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: font-size 0.15s cubic-bezier(0.215, 0.61, 0.355, 1), margin 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n.ant-menu-item .anticon + span,\n.ant-menu-submenu-title .anticon + span {\n  opacity: 1;\n  -webkit-transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  -o-transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n.ant-menu > .ant-menu-item-divider {\n  height: 1px;\n  margin: 1px 0;\n  padding: 0;\n  overflow: hidden;\n  line-height: 0;\n  background-color: #e8e8e8;\n}\n.ant-menu-submenu-popup {\n  position: absolute;\n  z-index: 1050;\n  background: #fff;\n  border-radius: 4px;\n}\n.ant-menu-submenu-popup .submenu-title-wrapper {\n  padding-right: 20px;\n}\n.ant-menu-submenu-popup::before {\n  position: absolute;\n  top: -7px;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  opacity: 0.0001;\n  content: ' ';\n}\n.ant-menu-submenu > .ant-menu {\n  background-color: #fff;\n  border-radius: 4px;\n}\n.ant-menu-submenu > .ant-menu-submenu-title::after {\n  -webkit-transition: -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  -o-transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n.ant-menu-submenu-vertical > .ant-menu-submenu-title .ant-menu-submenu-arrow,\n.ant-menu-submenu-vertical-left > .ant-menu-submenu-title .ant-menu-submenu-arrow,\n.ant-menu-submenu-vertical-right > .ant-menu-submenu-title .ant-menu-submenu-arrow,\n.ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow {\n  position: absolute;\n  top: 50%;\n  right: 16px;\n  width: 10px;\n  -webkit-transition: -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  -o-transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n.ant-menu-submenu-vertical > .ant-menu-submenu-title .ant-menu-submenu-arrow::before,\n.ant-menu-submenu-vertical-left > .ant-menu-submenu-title .ant-menu-submenu-arrow::before,\n.ant-menu-submenu-vertical-right > .ant-menu-submenu-title .ant-menu-submenu-arrow::before,\n.ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow::before,\n.ant-menu-submenu-vertical > .ant-menu-submenu-title .ant-menu-submenu-arrow::after,\n.ant-menu-submenu-vertical-left > .ant-menu-submenu-title .ant-menu-submenu-arrow::after,\n.ant-menu-submenu-vertical-right > .ant-menu-submenu-title .ant-menu-submenu-arrow::after,\n.ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow::after {\n  position: absolute;\n  width: 6px;\n  height: 1.5px;\n  background: #fff;\n  background: rgba(0, 0, 0, 0.65) \\9;\n  background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0.65)), to(rgba(0, 0, 0, 0.65)));\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65));\n  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65));\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65));\n  background-image: none \\9;\n  border-radius: 2px;\n  -webkit-transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), top 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), top 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  -o-transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), top 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), top 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), top 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  content: '';\n}\n.ant-menu-submenu-vertical > .ant-menu-submenu-title .ant-menu-submenu-arrow::before,\n.ant-menu-submenu-vertical-left > .ant-menu-submenu-title .ant-menu-submenu-arrow::before,\n.ant-menu-submenu-vertical-right > .ant-menu-submenu-title .ant-menu-submenu-arrow::before,\n.ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow::before {\n  -webkit-transform: rotate(45deg) translateY(-2px);\n      -ms-transform: rotate(45deg) translateY(-2px);\n          transform: rotate(45deg) translateY(-2px);\n}\n.ant-menu-submenu-vertical > .ant-menu-submenu-title .ant-menu-submenu-arrow::after,\n.ant-menu-submenu-vertical-left > .ant-menu-submenu-title .ant-menu-submenu-arrow::after,\n.ant-menu-submenu-vertical-right > .ant-menu-submenu-title .ant-menu-submenu-arrow::after,\n.ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow::after {\n  -webkit-transform: rotate(-45deg) translateY(2px);\n      -ms-transform: rotate(-45deg) translateY(2px);\n          transform: rotate(-45deg) translateY(2px);\n}\n.ant-menu-submenu-vertical > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after,\n.ant-menu-submenu-vertical-left > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after,\n.ant-menu-submenu-vertical-right > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after,\n.ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after,\n.ant-menu-submenu-vertical > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before,\n.ant-menu-submenu-vertical-left > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before,\n.ant-menu-submenu-vertical-right > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before,\n.ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before {\n  background: -webkit-gradient(linear, left top, right top, from(#1890ff), to(#1890ff));\n  background: -webkit-linear-gradient(left, #1890ff, #1890ff);\n  background: -o-linear-gradient(left, #1890ff, #1890ff);\n  background: linear-gradient(to right, #1890ff, #1890ff);\n}\n.ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow::before {\n  -webkit-transform: rotate(-45deg) translateX(2px);\n      -ms-transform: rotate(-45deg) translateX(2px);\n          transform: rotate(-45deg) translateX(2px);\n}\n.ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow::after {\n  -webkit-transform: rotate(45deg) translateX(-2px);\n      -ms-transform: rotate(45deg) translateX(-2px);\n          transform: rotate(45deg) translateX(-2px);\n}\n.ant-menu-submenu-open.ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow {\n  -webkit-transform: translateY(-2px);\n      -ms-transform: translateY(-2px);\n          transform: translateY(-2px);\n}\n.ant-menu-submenu-open.ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow::after {\n  -webkit-transform: rotate(-45deg) translateX(-2px);\n      -ms-transform: rotate(-45deg) translateX(-2px);\n          transform: rotate(-45deg) translateX(-2px);\n}\n.ant-menu-submenu-open.ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow::before {\n  -webkit-transform: rotate(45deg) translateX(2px);\n      -ms-transform: rotate(45deg) translateX(2px);\n          transform: rotate(45deg) translateX(2px);\n}\n.ant-menu-vertical .ant-menu-submenu-selected,\n.ant-menu-vertical-left .ant-menu-submenu-selected,\n.ant-menu-vertical-right .ant-menu-submenu-selected {\n  color: #1890ff;\n}\n.ant-menu-vertical .ant-menu-submenu-selected > a,\n.ant-menu-vertical-left .ant-menu-submenu-selected > a,\n.ant-menu-vertical-right .ant-menu-submenu-selected > a {\n  color: #1890ff;\n}\n.ant-menu-horizontal {\n  line-height: 46px;\n  white-space: nowrap;\n  border: 0;\n  border-bottom: 1px solid #e8e8e8;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n.ant-menu-horizontal > .ant-menu-item,\n.ant-menu-horizontal > .ant-menu-submenu {\n  position: relative;\n  top: 1px;\n  display: inline-block;\n  vertical-align: bottom;\n  border-bottom: 2px solid transparent;\n}\n.ant-menu-horizontal > .ant-menu-item:hover,\n.ant-menu-horizontal > .ant-menu-submenu:hover,\n.ant-menu-horizontal > .ant-menu-item-active,\n.ant-menu-horizontal > .ant-menu-submenu-active,\n.ant-menu-horizontal > .ant-menu-item-open,\n.ant-menu-horizontal > .ant-menu-submenu-open,\n.ant-menu-horizontal > .ant-menu-item-selected,\n.ant-menu-horizontal > .ant-menu-submenu-selected {\n  color: #1890ff;\n  border-bottom: 2px solid #1890ff;\n}\n.ant-menu-horizontal > .ant-menu-item > a {\n  display: block;\n  color: rgba(0, 0, 0, 0.65);\n}\n.ant-menu-horizontal > .ant-menu-item > a:hover {\n  color: #1890ff;\n}\n.ant-menu-horizontal > .ant-menu-item > a::before {\n  bottom: -2px;\n}\n.ant-menu-horizontal > .ant-menu-item-selected > a {\n  color: #1890ff;\n}\n.ant-menu-horizontal::after {\n  display: block;\n  clear: both;\n  height: 0;\n  content: '\\20';\n}\n.ant-menu-vertical .ant-menu-item,\n.ant-menu-vertical-left .ant-menu-item,\n.ant-menu-vertical-right .ant-menu-item,\n.ant-menu-inline .ant-menu-item {\n  position: relative;\n}\n.ant-menu-vertical .ant-menu-item::after,\n.ant-menu-vertical-left .ant-menu-item::after,\n.ant-menu-vertical-right .ant-menu-item::after,\n.ant-menu-inline .ant-menu-item::after {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  border-right: 3px solid #1890ff;\n  -webkit-transform: scaleY(0.0001);\n      -ms-transform: scaleY(0.0001);\n          transform: scaleY(0.0001);\n  opacity: 0;\n  -webkit-transition: opacity 0.15s cubic-bezier(0.215, 0.61, 0.355, 1), -webkit-transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: opacity 0.15s cubic-bezier(0.215, 0.61, 0.355, 1), -webkit-transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);\n  -o-transition: transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.15s cubic-bezier(0.215, 0.61, 0.355, 1), -webkit-transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);\n  content: '';\n}\n.ant-menu-vertical .ant-menu-item,\n.ant-menu-vertical-left .ant-menu-item,\n.ant-menu-vertical-right .ant-menu-item,\n.ant-menu-inline .ant-menu-item,\n.ant-menu-vertical .ant-menu-submenu-title,\n.ant-menu-vertical-left .ant-menu-submenu-title,\n.ant-menu-vertical-right .ant-menu-submenu-title,\n.ant-menu-inline .ant-menu-submenu-title {\n  height: 40px;\n  margin-top: 4px;\n  margin-bottom: 4px;\n  padding: 0 16px;\n  overflow: hidden;\n  font-size: 14px;\n  line-height: 40px;\n  -o-text-overflow: ellipsis;\n     text-overflow: ellipsis;\n}\n.ant-menu-vertical .ant-menu-submenu,\n.ant-menu-vertical-left .ant-menu-submenu,\n.ant-menu-vertical-right .ant-menu-submenu,\n.ant-menu-inline .ant-menu-submenu {\n  padding-bottom: 0.02px;\n}\n.ant-menu-vertical .ant-menu-item:not(:last-child),\n.ant-menu-vertical-left .ant-menu-item:not(:last-child),\n.ant-menu-vertical-right .ant-menu-item:not(:last-child),\n.ant-menu-inline .ant-menu-item:not(:last-child) {\n  margin-bottom: 8px;\n}\n.ant-menu-vertical > .ant-menu-item,\n.ant-menu-vertical-left > .ant-menu-item,\n.ant-menu-vertical-right > .ant-menu-item,\n.ant-menu-inline > .ant-menu-item,\n.ant-menu-vertical > .ant-menu-submenu > .ant-menu-submenu-title,\n.ant-menu-vertical-left > .ant-menu-submenu > .ant-menu-submenu-title,\n.ant-menu-vertical-right > .ant-menu-submenu > .ant-menu-submenu-title,\n.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {\n  height: 40px;\n  line-height: 40px;\n}\n.ant-menu-inline {\n  width: 100%;\n}\n.ant-menu-inline .ant-menu-selected::after,\n.ant-menu-inline .ant-menu-item-selected::after {\n  -webkit-transform: scaleY(1);\n      -ms-transform: scaleY(1);\n          transform: scaleY(1);\n  opacity: 1;\n  -webkit-transition: opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), -webkit-transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), -webkit-transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);\n  -o-transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), -webkit-transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n.ant-menu-inline .ant-menu-item,\n.ant-menu-inline .ant-menu-submenu-title {\n  width: calc(100% + 1px);\n}\n.ant-menu-inline .ant-menu-submenu-title {\n  padding-right: 34px;\n}\n.ant-menu-inline-collapsed {\n  width: 80px;\n}\n.ant-menu-inline-collapsed > .ant-menu-item,\n.ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-item,\n.ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-submenu > .ant-menu-submenu-title,\n.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {\n  left: 0;\n  padding: 0 32px !important;\n  -o-text-overflow: clip;\n     text-overflow: clip;\n}\n.ant-menu-inline-collapsed > .ant-menu-item .ant-menu-submenu-arrow,\n.ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-item .ant-menu-submenu-arrow,\n.ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-submenu > .ant-menu-submenu-title .ant-menu-submenu-arrow,\n.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title .ant-menu-submenu-arrow {\n  display: none;\n}\n.ant-menu-inline-collapsed > .ant-menu-item .anticon,\n.ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-item .anticon,\n.ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-submenu > .ant-menu-submenu-title .anticon,\n.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title .anticon {\n  margin: 0;\n  font-size: 16px;\n  line-height: 40px;\n}\n.ant-menu-inline-collapsed > .ant-menu-item .anticon + span,\n.ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-item .anticon + span,\n.ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-submenu > .ant-menu-submenu-title .anticon + span,\n.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title .anticon + span {\n  display: inline-block;\n  max-width: 0;\n  opacity: 0;\n}\n.ant-menu-inline-collapsed-tooltip {\n  pointer-events: none;\n}\n.ant-menu-inline-collapsed-tooltip .anticon {\n  display: none;\n}\n.ant-menu-inline-collapsed-tooltip a {\n  color: rgba(255, 255, 255, 0.85);\n}\n.ant-menu-inline-collapsed .ant-menu-item-group-title {\n  padding-right: 4px;\n  padding-left: 4px;\n  overflow: hidden;\n  white-space: nowrap;\n  -o-text-overflow: ellipsis;\n     text-overflow: ellipsis;\n}\n.ant-menu-item-group-list {\n  margin: 0;\n  padding: 0;\n}\n.ant-menu-item-group-list .ant-menu-item,\n.ant-menu-item-group-list .ant-menu-submenu-title {\n  padding: 0 16px 0 28px;\n}\n.ant-menu-root.ant-menu-vertical,\n.ant-menu-root.ant-menu-vertical-left,\n.ant-menu-root.ant-menu-vertical-right,\n.ant-menu-root.ant-menu-inline {\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n.ant-menu-sub.ant-menu-inline {\n  padding: 0;\n  border: 0;\n  border-radius: 0;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n.ant-menu-sub.ant-menu-inline > .ant-menu-item,\n.ant-menu-sub.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {\n  height: 40px;\n  line-height: 40px;\n  list-style-position: inside;\n  list-style-type: disc;\n}\n.ant-menu-sub.ant-menu-inline .ant-menu-item-group-title {\n  padding-left: 32px;\n}\n.ant-menu-item-disabled,\n.ant-menu-submenu-disabled {\n  color: rgba(0, 0, 0, 0.25) !important;\n  background: none;\n  border-color: transparent !important;\n  cursor: not-allowed;\n}\n.ant-menu-item-disabled > a,\n.ant-menu-submenu-disabled > a {\n  color: rgba(0, 0, 0, 0.25) !important;\n  pointer-events: none;\n}\n.ant-menu-item-disabled > .ant-menu-submenu-title,\n.ant-menu-submenu-disabled > .ant-menu-submenu-title {\n  color: rgba(0, 0, 0, 0.25) !important;\n  cursor: not-allowed;\n}\n.ant-menu-item-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before,\n.ant-menu-submenu-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before,\n.ant-menu-item-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after,\n.ant-menu-submenu-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after {\n  background: rgba(0, 0, 0, 0.25) !important;\n}\n.ant-menu-dark,\n.ant-menu-dark .ant-menu-sub {\n  color: rgba(255, 255, 255, 0.65);\n  background: #001529;\n}\n.ant-menu-dark .ant-menu-submenu-title .ant-menu-submenu-arrow,\n.ant-menu-dark .ant-menu-sub .ant-menu-submenu-title .ant-menu-submenu-arrow {\n  opacity: 0.45;\n  -webkit-transition: all 0.3s;\n  -o-transition: all 0.3s;\n  transition: all 0.3s;\n}\n.ant-menu-dark .ant-menu-submenu-title .ant-menu-submenu-arrow::after,\n.ant-menu-dark .ant-menu-sub .ant-menu-submenu-title .ant-menu-submenu-arrow::after,\n.ant-menu-dark .ant-menu-submenu-title .ant-menu-submenu-arrow::before,\n.ant-menu-dark .ant-menu-sub .ant-menu-submenu-title .ant-menu-submenu-arrow::before {\n  background: #fff;\n}\n.ant-menu-dark.ant-menu-submenu-popup {\n  background: transparent;\n}\n.ant-menu-dark .ant-menu-inline.ant-menu-sub {\n  background: #000c17;\n  -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45) inset;\n          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45) inset;\n}\n.ant-menu-dark.ant-menu-horizontal {\n  border-bottom: 0;\n}\n.ant-menu-dark.ant-menu-horizontal > .ant-menu-item,\n.ant-menu-dark.ant-menu-horizontal > .ant-menu-submenu {\n  top: 0;\n  margin-top: 0;\n  border-color: #001529;\n  border-bottom: 0;\n}\n.ant-menu-dark.ant-menu-horizontal > .ant-menu-item > a::before {\n  bottom: 0;\n}\n.ant-menu-dark .ant-menu-item,\n.ant-menu-dark .ant-menu-item-group-title,\n.ant-menu-dark .ant-menu-item > a {\n  color: rgba(255, 255, 255, 0.65);\n}\n.ant-menu-dark.ant-menu-inline,\n.ant-menu-dark.ant-menu-vertical,\n.ant-menu-dark.ant-menu-vertical-left,\n.ant-menu-dark.ant-menu-vertical-right {\n  border-right: 0;\n}\n.ant-menu-dark.ant-menu-inline .ant-menu-item,\n.ant-menu-dark.ant-menu-vertical .ant-menu-item,\n.ant-menu-dark.ant-menu-vertical-left .ant-menu-item,\n.ant-menu-dark.ant-menu-vertical-right .ant-menu-item {\n  left: 0;\n  margin-left: 0;\n  border-right: 0;\n}\n.ant-menu-dark.ant-menu-inline .ant-menu-item::after,\n.ant-menu-dark.ant-menu-vertical .ant-menu-item::after,\n.ant-menu-dark.ant-menu-vertical-left .ant-menu-item::after,\n.ant-menu-dark.ant-menu-vertical-right .ant-menu-item::after {\n  border-right: 0;\n}\n.ant-menu-dark.ant-menu-inline .ant-menu-item,\n.ant-menu-dark.ant-menu-inline .ant-menu-submenu-title {\n  width: 100%;\n}\n.ant-menu-dark .ant-menu-item:hover,\n.ant-menu-dark .ant-menu-item-active,\n.ant-menu-dark .ant-menu-submenu-active,\n.ant-menu-dark .ant-menu-submenu-open,\n.ant-menu-dark .ant-menu-submenu-selected,\n.ant-menu-dark .ant-menu-submenu-title:hover {\n  color: #fff;\n  background-color: transparent;\n}\n.ant-menu-dark .ant-menu-item:hover > a,\n.ant-menu-dark .ant-menu-item-active > a,\n.ant-menu-dark .ant-menu-submenu-active > a,\n.ant-menu-dark .ant-menu-submenu-open > a,\n.ant-menu-dark .ant-menu-submenu-selected > a,\n.ant-menu-dark .ant-menu-submenu-title:hover > a {\n  color: #fff;\n}\n.ant-menu-dark .ant-menu-item:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow,\n.ant-menu-dark .ant-menu-item-active > .ant-menu-submenu-title > .ant-menu-submenu-arrow,\n.ant-menu-dark .ant-menu-submenu-active > .ant-menu-submenu-title > .ant-menu-submenu-arrow,\n.ant-menu-dark .ant-menu-submenu-open > .ant-menu-submenu-title > .ant-menu-submenu-arrow,\n.ant-menu-dark .ant-menu-submenu-selected > .ant-menu-submenu-title > .ant-menu-submenu-arrow,\n.ant-menu-dark .ant-menu-submenu-title:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow,\n.ant-menu-dark .ant-menu-item:hover > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow,\n.ant-menu-dark .ant-menu-item-active > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow,\n.ant-menu-dark .ant-menu-submenu-active > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow,\n.ant-menu-dark .ant-menu-submenu-open > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow,\n.ant-menu-dark .ant-menu-submenu-selected > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow,\n.ant-menu-dark .ant-menu-submenu-title:hover > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow {\n  opacity: 1;\n}\n.ant-menu-dark .ant-menu-item:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after,\n.ant-menu-dark .ant-menu-item-active > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after,\n.ant-menu-dark .ant-menu-submenu-active > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after,\n.ant-menu-dark .ant-menu-submenu-open > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after,\n.ant-menu-dark .ant-menu-submenu-selected > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after,\n.ant-menu-dark .ant-menu-submenu-title:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after,\n.ant-menu-dark .ant-menu-item:hover > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::after,\n.ant-menu-dark .ant-menu-item-active > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::after,\n.ant-menu-dark .ant-menu-submenu-active > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::after,\n.ant-menu-dark .ant-menu-submenu-open > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::after,\n.ant-menu-dark .ant-menu-submenu-selected > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::after,\n.ant-menu-dark .ant-menu-submenu-title:hover > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::after,\n.ant-menu-dark .ant-menu-item:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before,\n.ant-menu-dark .ant-menu-item-active > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before,\n.ant-menu-dark .ant-menu-submenu-active > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before,\n.ant-menu-dark .ant-menu-submenu-open > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before,\n.ant-menu-dark .ant-menu-submenu-selected > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before,\n.ant-menu-dark .ant-menu-submenu-title:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before,\n.ant-menu-dark .ant-menu-item:hover > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::before,\n.ant-menu-dark .ant-menu-item-active > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::before,\n.ant-menu-dark .ant-menu-submenu-active > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::before,\n.ant-menu-dark .ant-menu-submenu-open > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::before,\n.ant-menu-dark .ant-menu-submenu-selected > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::before,\n.ant-menu-dark .ant-menu-submenu-title:hover > .ant-menu-submenu-title:hover > .ant-menu-submenu-arrow::before {\n  background: #fff;\n}\n.ant-menu-dark .ant-menu-item:hover {\n  background-color: transparent;\n}\n.ant-menu-dark .ant-menu-item-selected {\n  color: #fff;\n  border-right: 0;\n}\n.ant-menu-dark .ant-menu-item-selected::after {\n  border-right: 0;\n}\n.ant-menu-dark .ant-menu-item-selected > a,\n.ant-menu-dark .ant-menu-item-selected > a:hover {\n  color: #fff;\n}\n.ant-menu-dark .ant-menu-item-selected .anticon {\n  color: #fff;\n}\n.ant-menu-dark .ant-menu-item-selected .anticon + span {\n  color: #fff;\n}\n.ant-menu.ant-menu-dark .ant-menu-item-selected,\n.ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {\n  background-color: #1890ff;\n}\n.ant-menu-dark .ant-menu-item-disabled,\n.ant-menu-dark .ant-menu-submenu-disabled,\n.ant-menu-dark .ant-menu-item-disabled > a,\n.ant-menu-dark .ant-menu-submenu-disabled > a {\n  color: rgba(255, 255, 255, 0.35) !important;\n  opacity: 0.8;\n}\n.ant-menu-dark .ant-menu-item-disabled > .ant-menu-submenu-title,\n.ant-menu-dark .ant-menu-submenu-disabled > .ant-menu-submenu-title {\n  color: rgba(255, 255, 255, 0.35) !important;\n}\n.ant-menu-dark .ant-menu-item-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before,\n.ant-menu-dark .ant-menu-submenu-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before,\n.ant-menu-dark .ant-menu-item-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after,\n.ant-menu-dark .ant-menu-submenu-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after {\n  background: rgba(255, 255, 255, 0.35) !important;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1126:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1440);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(318)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 1398:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(__webpack_require__(0));

var PropTypes = _interopRequireWildcard(__webpack_require__(1));

var _omit = _interopRequireDefault(__webpack_require__(46));

var _dropdown = _interopRequireDefault(__webpack_require__(957));

var _icon = _interopRequireDefault(__webpack_require__(27));

var _configProvider = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var BreadcrumbItem =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BreadcrumbItem, _React$Component);

  function BreadcrumbItem() {
    var _this;

    _classCallCheck(this, BreadcrumbItem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BreadcrumbItem).apply(this, arguments));

    _this.renderBreadcrumbItem = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;

      var _a = _this.props,
          customizePrefixCls = _a.prefixCls,
          separator = _a.separator,
          children = _a.children,
          restProps = __rest(_a, ["prefixCls", "separator", "children"]);

      var prefixCls = getPrefixCls('breadcrumb', customizePrefixCls);
      var link;

      if ('href' in _this.props) {
        link = React.createElement("a", _extends({
          className: "".concat(prefixCls, "-link")
        }, (0, _omit["default"])(restProps, ['overlay'])), children);
      } else {
        link = React.createElement("span", _extends({
          className: "".concat(prefixCls, "-link")
        }, (0, _omit["default"])(restProps, ['overlay'])), children);
      } // wrap to dropDown


      link = _this.renderBreadcrumbNode(link, prefixCls);

      if (children) {
        return React.createElement("span", null, link, separator && separator !== '' && React.createElement("span", {
          className: "".concat(prefixCls, "-separator")
        }, separator));
      }

      return null;
    };
    /**
     * if overlay is have
     * Wrap a DropDown
     */


    _this.renderBreadcrumbNode = function (breadcrumbItem, prefixCls) {
      var overlay = _this.props.overlay;

      if (overlay) {
        return React.createElement(_dropdown["default"], {
          overlay: overlay,
          placement: "bottomCenter"
        }, React.createElement("span", {
          className: "".concat(prefixCls, "-overlay-link")
        }, breadcrumbItem, React.createElement(_icon["default"], {
          type: "down"
        })));
      }

      return breadcrumbItem;
    };

    return _this;
  }

  _createClass(BreadcrumbItem, [{
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderBreadcrumbItem);
    }
  }]);

  return BreadcrumbItem;
}(React.Component);

exports["default"] = BreadcrumbItem;
BreadcrumbItem.__ANT_BREADCRUMB_ITEM = true;
BreadcrumbItem.defaultProps = {
  separator: '/'
};
BreadcrumbItem.propTypes = {
  prefixCls: PropTypes.string,
  separator: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  href: PropTypes.string
};
//# sourceMappingURL=BreadcrumbItem.js.map


/***/ }),

/***/ 1434:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toArray;

var _react = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toArray(children) {
  var ret = [];

  _react.default.Children.forEach(children, function (c) {
    ret.push(c);
  });

  return ret;
}

/***/ }),

/***/ 1440:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(317)(true);
// imports


// module
exports.push([module.i, ".polllisthover:hover{-webkit-box-shadow:0 2px 6px rgba(51,51,51,.09);box-shadow:0 2px 6px rgba(51,51,51,.09);opacity:1;border-radius:2px}.workList_Item{display:-ms-flexbox;display:flex;background-color:#fff;margin-bottom:20px;padding-top:10px}p span{cursor:default}.mt-5{margin-top:-5px}.bankNav li{float:left;margin-right:20px}.bankNav li:last-child{margin-right:0}.bankNav li.active a{color:#fff!important;background-color:#4cacff}.bankNav li a{display:block;padding:0 10px;height:28px;line-height:28px;background-color:#f5f5f5;border-radius:36px;color:#666!important}.task_menu_ul{width:600px}.task_menu_ul .ant-menu-item,.task_menu_ul .ant-menu-submenu-title{padding:0;margin-right:30px;line-height:68px;font-size:16px}.ant-menu{color:#05101a}.task_menu_ul .ant-menu-horizontal{border-bottom:none}.task_menu_ul .ant-menu-horizontal>.ant-menu-item:hover{border-bottom:2px solid transparent}.task_menu_ul .ant-menu-horizontal>.ant-menu-item-selected{border-bottom:2px solid #4cacff!important}.sourceTag a{display:block;float:left;background-color:#e5f3ff;padding:0 10px;height:24px;line-height:24px;color:#4e7a9b;margin:5px 0 5px 10px}.sourceTag a.active{color:#fff;background-color:#4cacff}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/src/modules/courses/css/busyWork.css"],"names":[],"mappings":"AACA,qBACE,gDAAoD,AAC5C,wCAA4C,AACpD,UAAW,AACX,iBAAmB,CACpB,AAED,eAEE,oBAAqB,AACrB,aAAc,AACd,sBAAuB,AACvB,mBAAoB,AACpB,gBAAkB,CACnB,AACD,OACE,cAAgB,CACjB,AACD,MAAO,eAAgB,CAAC,AAIxB,YACE,WAAY,AACZ,iBAAmB,CACpB,AACD,uBACE,cAAkB,CACnB,AACD,qBACE,qBAAsB,AACtB,wBAA0B,CAC3B,AACD,cACE,cAAe,AACf,eAAiB,AACjB,YAAa,AACb,iBAAkB,AAClB,yBAA0B,AAC1B,mBAAoB,AACpB,oBAAyB,CAC1B,AAID,cACE,WAAa,CACd,AAED,mEACE,UAAY,AACZ,kBAAmB,AACnB,iBAAkB,AAClB,cAAgB,CACjB,AACD,UACE,aAAe,CAChB,AACD,mCACE,kBAAoB,CACrB,AACD,wDACE,mCAAoC,CACrC,AACD,2DACE,yCAA4C,CAC7C,AAED,aACE,cAAe,AACf,WAAY,AACZ,yBAAyB,AACzB,eAAkB,AAClB,YAAa,AACb,iBAAkB,AAClB,cAAe,AACf,qBAAwB,CACzB,AACD,oBACE,WAAe,wBAAyB,CACzC","file":"busyWork.css","sourcesContent":["\n.polllisthover:hover {\n  -webkit-box-shadow: 0px 2px 6px rgba(51,51,51,0.09);\n          box-shadow: 0px 2px 6px rgba(51,51,51,0.09);\n  opacity: 1;\n  border-radius: 2px;\n}\n\n.workList_Item{\n  /* padding:20px 30px; */\n  display: -ms-flexbox;\n  display: flex;\n  background-color: #fff;\n  margin-bottom: 20px;\n  padding-top: 10px;\n}\np span{\n  cursor: default;\n}\n.mt-5{ margin-top:-5px;}\n\n\n/* ���ѡ��tab */\n.bankNav li{\n  float: left;\n  margin-right: 20px;\n}\n.bankNav li:last-child{\n  margin-right: 0px;\n}\n.bankNav li.active a{\n  color: #fff!important;\n  background-color: #4CACFF;\n}\n.bankNav li a{\n  display: block;\n  padding:0px 10px;\n  height: 28px;\n  line-height: 28px;\n  background-color: #F5F5F5;\n  border-radius: 36px;\n  color: #666666!important;\n}\n\n\n\n.task_menu_ul{\n  width: 600px;\n}\n\n.task_menu_ul .ant-menu-item,.task_menu_ul .ant-menu-submenu-title{\n  padding:0px;\n  margin-right: 30px;\n  line-height: 68px;\n  font-size: 16px;\n}\n.ant-menu{\n  color: #05101a;\n}\n.task_menu_ul .ant-menu-horizontal{\n  border-bottom: none;\n}\n.task_menu_ul .ant-menu-horizontal > .ant-menu-item:hover{\n  border-bottom:2px solid transparent;\n}\n.task_menu_ul .ant-menu-horizontal > .ant-menu-item-selected{\n  border-bottom: 2px solid #4CACFF !important;\n}\n\n.sourceTag a{\n  display: block;\n  float: left;\n  background-color:#E5F3FF;\n  padding: 0px 10px;\n  height: 24px;\n  line-height: 24px;\n  color: #4E7A9B;\n  margin:5px 0px 5px 10px;\n}\n.sourceTag a.active{\n  color: #FFFFFF;background-color:#4CACFF; \n}\n\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1454:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(31);

__webpack_require__(1465);

__webpack_require__(1020);

__webpack_require__(1016);
//# sourceMappingURL=css.js.map


/***/ }),

/***/ 1455:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Breadcrumb = _interopRequireDefault(__webpack_require__(1467));

var _BreadcrumbItem = _interopRequireDefault(__webpack_require__(1398));

var _BreadcrumbSeparator = _interopRequireDefault(__webpack_require__(1468));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_Breadcrumb["default"].Item = _BreadcrumbItem["default"];
_Breadcrumb["default"].Separator = _BreadcrumbSeparator["default"];
var _default = _Breadcrumb["default"];
exports["default"] = _default;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 1465:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1466);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(318)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 1466:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(317)(true);
// imports


// module
exports.push([module.i, ".ant-breadcrumb{-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0;color:rgba(0,0,0,.65);font-variant:tabular-nums;line-height:1.5;list-style:none;-webkit-font-feature-settings:\"tnum\";font-feature-settings:\"tnum\";color:rgba(0,0,0,.45);font-size:14px}.ant-breadcrumb .anticon{font-size:14px}.ant-breadcrumb a{color:rgba(0,0,0,.45);-webkit-transition:color .3s;-o-transition:color .3s;transition:color .3s}.ant-breadcrumb a:hover{color:#40a9ff}.ant-breadcrumb>span:last-child,.ant-breadcrumb>span:last-child a{color:rgba(0,0,0,.65)}.ant-breadcrumb>span:last-child .ant-breadcrumb-separator{display:none}.ant-breadcrumb-separator{margin:0 8px;color:rgba(0,0,0,.45)}.ant-breadcrumb-link>.anticon+span,.ant-breadcrumb-overlay-link>.anticon{margin-left:4px}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/node_modules/antd/lib/breadcrumb/style/index.css"],"names":[],"mappings":"AAIA,gBACE,8BAA+B,AACvB,sBAAuB,AAC/B,SAAU,AACV,UAAW,AACX,sBAA2B,AAC3B,0BAA2B,AAC3B,gBAAiB,AACjB,gBAAiB,AACjB,qCAAsC,AAC9B,6BAA8B,AACtC,sBAA2B,AAC3B,cAAgB,CACjB,AACD,yBACE,cAAgB,CACjB,AACD,kBACE,sBAA2B,AAC3B,6BAA+B,AAC/B,wBAA0B,AAC1B,oBAAuB,CACxB,AACD,wBACE,aAAe,CAChB,AAID,kEACE,qBAA2B,CAC5B,AACD,0DACE,YAAc,CACf,AACD,0BACE,aAAc,AACd,qBAA2B,CAC5B,AAID,yEACE,eAAiB,CAClB","file":"index.css","sourcesContent":["/* stylelint-disable at-rule-empty-line-before,at-rule-name-space-after,at-rule-no-unknown */\n/* stylelint-disable no-duplicate-selectors */\n/* stylelint-disable */\n/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors,string-no-newline */\n.ant-breadcrumb {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  color: rgba(0, 0, 0, 0.65);\n  font-variant: tabular-nums;\n  line-height: 1.5;\n  list-style: none;\n  -webkit-font-feature-settings: 'tnum';\n          font-feature-settings: 'tnum';\n  color: rgba(0, 0, 0, 0.45);\n  font-size: 14px;\n}\n.ant-breadcrumb .anticon {\n  font-size: 14px;\n}\n.ant-breadcrumb a {\n  color: rgba(0, 0, 0, 0.45);\n  -webkit-transition: color 0.3s;\n  -o-transition: color 0.3s;\n  transition: color 0.3s;\n}\n.ant-breadcrumb a:hover {\n  color: #40a9ff;\n}\n.ant-breadcrumb > span:last-child {\n  color: rgba(0, 0, 0, 0.65);\n}\n.ant-breadcrumb > span:last-child a {\n  color: rgba(0, 0, 0, 0.65);\n}\n.ant-breadcrumb > span:last-child .ant-breadcrumb-separator {\n  display: none;\n}\n.ant-breadcrumb-separator {\n  margin: 0 8px;\n  color: rgba(0, 0, 0, 0.45);\n}\n.ant-breadcrumb-link > .anticon + span {\n  margin-left: 4px;\n}\n.ant-breadcrumb-overlay-link > .anticon {\n  margin-left: 4px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1467:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(__webpack_require__(0));

var PropTypes = _interopRequireWildcard(__webpack_require__(1));

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _toArray = _interopRequireDefault(__webpack_require__(1434));

var _omit = _interopRequireDefault(__webpack_require__(46));

var _BreadcrumbItem = _interopRequireDefault(__webpack_require__(1398));

var _menu = _interopRequireDefault(__webpack_require__(959));

var _configProvider = __webpack_require__(14);

var _warning = _interopRequireDefault(__webpack_require__(43));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

function getBreadcrumbName(route, params) {
  if (!route.breadcrumbName) {
    return null;
  }

  var paramsKeys = Object.keys(params).join('|');
  var name = route.breadcrumbName.replace(new RegExp(":(".concat(paramsKeys, ")"), 'g'), function (replacement, key) {
    return params[key] || replacement;
  });
  return name;
}

function defaultItemRender(route, params, routes, paths) {
  var isLastItem = routes.indexOf(route) === routes.length - 1;
  var name = getBreadcrumbName(route, params);
  return isLastItem ? React.createElement("span", null, name) : React.createElement("a", {
    href: "#/".concat(paths.join('/'))
  }, name);
}

function filterFragment(children) {
  return (0, _toArray["default"])(children).map(function (element) {
    if (React.isValidElement(element) && element.type === React.Fragment) {
      var props = element.props;
      return props.children;
    }

    return element;
  });
}

var Breadcrumb =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Breadcrumb, _React$Component);

  function Breadcrumb() {
    var _this;

    _classCallCheck(this, Breadcrumb);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Breadcrumb).apply(this, arguments));

    _this.getPath = function (path, params) {
      path = (path || '').replace(/^\//, '');
      Object.keys(params).forEach(function (key) {
        path = path.replace(":".concat(key), params[key]);
      });
      return path;
    };

    _this.addChildPath = function (paths) {
      var childPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var params = arguments.length > 2 ? arguments[2] : undefined;

      var originalPaths = _toConsumableArray(paths);

      var path = _this.getPath(childPath, params);

      if (path) {
        originalPaths.push(path);
      }

      return originalPaths;
    };

    _this.genForRoutes = function (_ref) {
      var _ref$routes = _ref.routes,
          routes = _ref$routes === void 0 ? [] : _ref$routes,
          _ref$params = _ref.params,
          params = _ref$params === void 0 ? {} : _ref$params,
          separator = _ref.separator,
          _ref$itemRender = _ref.itemRender,
          itemRender = _ref$itemRender === void 0 ? defaultItemRender : _ref$itemRender;
      var paths = [];
      return routes.map(function (route) {
        var path = _this.getPath(route.path, params);

        if (path) {
          paths.push(path);
        } // generated overlay by route.children


        var overlay = null;

        if (route.children && route.children.length) {
          overlay = React.createElement(_menu["default"], null, route.children.map(function (child) {
            return React.createElement(_menu["default"].Item, {
              key: child.breadcrumbName || child.path
            }, itemRender(child, params, routes, _this.addChildPath(paths, child.path, params)));
          }));
        }

        return React.createElement(_BreadcrumbItem["default"], {
          overlay: overlay,
          separator: separator,
          key: route.breadcrumbName || path
        }, itemRender(route, params, routes, paths));
      });
    };

    _this.renderBreadcrumb = function (_ref2) {
      var getPrefixCls = _ref2.getPrefixCls;
      var crumbs;

      var _a = _this.props,
          customizePrefixCls = _a.prefixCls,
          separator = _a.separator,
          style = _a.style,
          className = _a.className,
          routes = _a.routes,
          children = _a.children,
          restProps = __rest(_a, ["prefixCls", "separator", "style", "className", "routes", "children"]);

      var prefixCls = getPrefixCls('breadcrumb', customizePrefixCls);

      if (routes && routes.length > 0) {
        // generated by route
        crumbs = _this.genForRoutes(_this.props);
      } else if (children) {
        crumbs = React.Children.map(filterFragment(children), function (element, index) {
          if (!element) {
            return element;
          }

          (0, _warning["default"])(element.type && (element.type.__ANT_BREADCRUMB_ITEM === true || element.type.__ANT_BREADCRUMB_SEPARATOR === true), 'Breadcrumb', "Only accepts Breadcrumb.Item and Breadcrumb.Separator as it's children");
          return React.cloneElement(element, {
            separator: separator,
            key: index
          });
        });
      }

      return React.createElement("div", _extends({
        className: (0, _classnames["default"])(className, prefixCls),
        style: style
      }, (0, _omit["default"])(restProps, ['itemRender', 'params'])), crumbs);
    };

    return _this;
  }

  _createClass(Breadcrumb, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var props = this.props;
      (0, _warning["default"])(!('linkRender' in props || 'nameRender' in props), 'Breadcrumb', '`linkRender` and `nameRender` are removed, please use `itemRender` instead, ' + 'see: https://u.ant.design/item-render.');
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderBreadcrumb);
    }
  }]);

  return Breadcrumb;
}(React.Component);

exports["default"] = Breadcrumb;
Breadcrumb.defaultProps = {
  separator: '/'
};
Breadcrumb.propTypes = {
  prefixCls: PropTypes.string,
  separator: PropTypes.node,
  routes: PropTypes.array
};
//# sourceMappingURL=Breadcrumb.js.map


/***/ }),

/***/ 1468:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(__webpack_require__(0));

var _configProvider = __webpack_require__(14);

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var BreadcrumbSeparator =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BreadcrumbSeparator, _React$Component);

  function BreadcrumbSeparator() {
    var _this;

    _classCallCheck(this, BreadcrumbSeparator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BreadcrumbSeparator).apply(this, arguments));

    _this.renderSeparator = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;
      var children = _this.props.children;
      var prefixCls = getPrefixCls('breadcrumb');
      return React.createElement("span", {
        className: "".concat(prefixCls, "-separator")
      }, children || '/');
    };

    return _this;
  }

  _createClass(BreadcrumbSeparator, [{
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderSeparator);
    }
  }]);

  return BreadcrumbSeparator;
}(React.Component);

exports["default"] = BreadcrumbSeparator;
BreadcrumbSeparator.__ANT_BREADCRUMB_SEPARATOR = true;
//# sourceMappingURL=BreadcrumbSeparator.js.map


/***/ }),

/***/ 1548:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(199);

/***/ }),

/***/ 1645:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DragDropContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ConnectedDraggable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ConnectedDroppable; });
/* unused harmony export resetServerContext */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__ = __webpack_require__(1732);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_corejs2_helpers_esm_inheritsLoose__ = __webpack_require__(1733);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_tiny_invariant__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_css_box_model__ = __webpack_require__(1735);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_memoize_one__ = __webpack_require__(1729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__babel_runtime_corejs2_core_js_object_values__ = __webpack_require__(1736);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__babel_runtime_corejs2_core_js_object_values___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__babel_runtime_corejs2_core_js_object_values__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__babel_runtime_corejs2_core_js_object_keys__ = __webpack_require__(1740);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__babel_runtime_corejs2_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__babel_runtime_corejs2_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__babel_runtime_corejs2_core_js_object_assign__ = __webpack_require__(1548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__babel_runtime_corejs2_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__babel_runtime_corejs2_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__babel_runtime_corejs2_core_js_date_now__ = __webpack_require__(1741);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__babel_runtime_corejs2_core_js_date_now___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__babel_runtime_corejs2_core_js_date_now__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_raf_schd__ = __webpack_require__(1744);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_react_redux__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__babel_runtime_corejs2_core_js_number_is_integer__ = __webpack_require__(1745);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__babel_runtime_corejs2_core_js_number_is_integer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__babel_runtime_corejs2_core_js_number_is_integer__);
















var origin = {
  x: 0,
  y: 0
};
var add = function add(point1, point2) {
  return {
    x: point1.x + point2.x,
    y: point1.y + point2.y
  };
};
var subtract = function subtract(point1, point2) {
  return {
    x: point1.x - point2.x,
    y: point1.y - point2.y
  };
};
var isEqual = function isEqual(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y;
};
var negate = function negate(point) {
  return {
    x: point.x !== 0 ? -point.x : 0,
    y: point.y !== 0 ? -point.y : 0
  };
};
var patch = function patch(line, value, otherValue) {
  var _ref;

  if (otherValue === void 0) {
    otherValue = 0;
  }

  return _ref = {}, _ref[line] = value, _ref[line === 'x' ? 'y' : 'x'] = otherValue, _ref;
};
var distance = function distance(point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
};
var closest = function closest(target, points) {
  return Math.min.apply(Math, points.map(function (point) {
    return distance(target, point);
  }));
};
var apply = function apply(fn) {
  return function (point) {
    return {
      x: fn(point.x),
      y: fn(point.y)
    };
  };
};

var executeClip = (function (frame, subject) {
  var result = Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["e" /* getRect */])({
    top: Math.max(subject.top, frame.top),
    right: Math.min(subject.right, frame.right),
    bottom: Math.min(subject.bottom, frame.bottom),
    left: Math.max(subject.left, frame.left)
  });

  if (result.width <= 0 || result.height <= 0) {
    return null;
  }

  return result;
});

var isEqual$1 = function isEqual(first, second) {
  return first.top === second.top && first.right === second.right && first.bottom === second.bottom && first.left === second.left;
};
var offsetByPosition = function offsetByPosition(spacing, point) {
  return {
    top: spacing.top + point.y,
    left: spacing.left + point.x,
    bottom: spacing.bottom + point.y,
    right: spacing.right + point.x
  };
};
var getCorners = function getCorners(spacing) {
  return [{
    x: spacing.left,
    y: spacing.top
  }, {
    x: spacing.right,
    y: spacing.top
  }, {
    x: spacing.left,
    y: spacing.bottom
  }, {
    x: spacing.right,
    y: spacing.bottom
  }];
};
var noSpacing = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

var scroll = function scroll(target, frame) {
  if (!frame) {
    return target;
  }

  return offsetByPosition(target, frame.scroll.diff.displacement);
};

var increase = function increase(target, axis, withPlaceholder) {
  if (withPlaceholder && withPlaceholder.increasedBy) {
    var _extends2;

    return Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, target, (_extends2 = {}, _extends2[axis.end] = target[axis.end] + withPlaceholder.increasedBy[axis.line], _extends2));
  }

  return target;
};

var clip = function clip(target, frame) {
  if (frame && frame.shouldClipSubject) {
    return executeClip(frame.pageMarginBox, target);
  }

  return Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["e" /* getRect */])(target);
};

var getSubject = (function (_ref) {
  var page = _ref.page,
      withPlaceholder = _ref.withPlaceholder,
      axis = _ref.axis,
      frame = _ref.frame;
  var scrolled = scroll(page.marginBox, frame);
  var increased = increase(scrolled, axis, withPlaceholder);
  var clipped = clip(increased, frame);
  return {
    page: page,
    withPlaceholder: withPlaceholder,
    active: clipped
  };
});

var scrollDroppable = (function (droppable, newScroll) {
  !droppable.frame ?  false ? invariant(false) : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  var scrollable = droppable.frame;
  var scrollDiff = subtract(newScroll, scrollable.scroll.initial);
  var scrollDisplacement = negate(scrollDiff);

  var frame = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, scrollable, {
    scroll: {
      initial: scrollable.scroll.initial,
      current: newScroll,
      diff: {
        value: scrollDiff,
        displacement: scrollDisplacement
      },
      max: scrollable.scroll.max
    }
  });

  var subject = getSubject({
    page: droppable.subject.page,
    withPlaceholder: droppable.subject.withPlaceholder,
    axis: droppable.axis,
    frame: frame
  });

  var result = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, droppable, {
    frame: frame,
    subject: subject
  });

  return result;
});

var records = {};
var isEnabled = false;

var isTimingsEnabled = function isTimingsEnabled() {
  return isEnabled;
};
var start = function start(key) {
  if (false) {
    if (!isTimingsEnabled()) {
      return;
    }

    var now = performance.now();
    records[key] = now;
  }
};
var finish = function finish(key) {
  if (false) {
    if (!isTimingsEnabled()) {
      return;
    }

    var now = performance.now();
    var previous = records[key];

    if (!previous) {
      console.warn('cannot finish timing as no previous time found', key);
      return;
    }

    var result = now - previous;
    var rounded = result.toFixed(2);

    var style = function () {
      if (result < 12) {
        return {
          textColor: 'green',
          symbol: '✅'
        };
      }

      if (result < 40) {
        return {
          textColor: 'orange',
          symbol: '⚠️'
        };
      }

      return {
        textColor: 'red',
        symbol: '❌'
      };
    }();

    console.log(style.symbol + " %cTiming %c" + rounded + " %cms %c" + key, 'color: blue; font-weight: bold;', "color: " + style.textColor + "; font-size: 1.1em;", 'color: grey;', 'color: purple; font-weight: bold;');
  }
};

var whatIsDraggedOver = (function (impact) {
  var merge = impact.merge,
      destination = impact.destination;

  if (destination) {
    return destination.droppableId;
  }

  if (merge) {
    return merge.combine.droppableId;
  }

  return null;
});

function values(map) {
  return __WEBPACK_IMPORTED_MODULE_8__babel_runtime_corejs2_core_js_object_values___default()(map);
}
function findIndex(list, predicate) {
  if (list.findIndex) {
    return list.findIndex(predicate);
  }

  for (var i = 0; i < list.length; i++) {
    if (predicate(list[i])) {
      return i;
    }
  }

  return -1;
}
function find(list, predicate) {
  if (list.find) {
    return list.find(predicate);
  }

  var index = findIndex(list, predicate);

  if (index !== -1) {
    return list[index];
  }

  return undefined;
}

var toDroppableMap = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (droppables) {
  return droppables.reduce(function (previous, current) {
    previous[current.descriptor.id] = current;
    return previous;
  }, {});
});
var toDraggableMap = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (draggables) {
  return draggables.reduce(function (previous, current) {
    previous[current.descriptor.id] = current;
    return previous;
  }, {});
});
var toDroppableList = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (droppables) {
  return values(droppables);
});
var toDraggableList = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (draggables) {
  return values(draggables);
});

var isWithin = (function (lowerBound, upperBound) {
  return function (value) {
    return lowerBound <= value && value <= upperBound;
  };
});

var isPositionInFrame = (function (frame) {
  var isWithinVertical = isWithin(frame.top, frame.bottom);
  var isWithinHorizontal = isWithin(frame.left, frame.right);
  return function (point) {
    return isWithinVertical(point.y) && isWithinVertical(point.y) && isWithinHorizontal(point.x) && isWithinHorizontal(point.x);
  };
});

var getDroppableOver = (function (_ref) {
  var target = _ref.target,
      droppables = _ref.droppables;
  var maybe = find(toDroppableList(droppables), function (droppable) {
    if (!droppable.isEnabled) {
      return false;
    }

    var active = droppable.subject.active;

    if (!active) {
      return false;
    }

    return isPositionInFrame(active)(target);
  });
  return maybe ? maybe.descriptor.id : null;
});

var getDraggablesInsideDroppable = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (droppableId, draggables) {
  var result = toDraggableList(draggables).filter(function (draggable) {
    return droppableId === draggable.descriptor.droppableId;
  }).sort(function (a, b) {
    return a.descriptor.index - b.descriptor.index;
  });
  return result;
});

var withDroppableScroll = (function (droppable, point) {
  var frame = droppable.frame;

  if (!frame) {
    return point;
  }

  return add(point, frame.scroll.diff.value);
});

var vertical = {
  direction: 'vertical',
  line: 'y',
  crossAxisLine: 'x',
  start: 'top',
  end: 'bottom',
  size: 'height',
  crossAxisStart: 'left',
  crossAxisEnd: 'right',
  crossAxisSize: 'width'
};
var horizontal = {
  direction: 'horizontal',
  line: 'x',
  crossAxisLine: 'y',
  start: 'left',
  end: 'right',
  size: 'width',
  crossAxisStart: 'top',
  crossAxisEnd: 'bottom',
  crossAxisSize: 'height'
};

var isUserMovingForward = (function (axis, direction) {
  return axis === vertical ? direction.vertical === 'down' : direction.horizontal === 'right';
});

var didStartDisplaced = (function (draggableId, onLift) {
  return Boolean(onLift.wasDisplaced[draggableId]);
});

var getCombinedItemDisplacement = (function (_ref) {
  var displaced = _ref.displaced,
      onLift = _ref.onLift,
      combineWith = _ref.combineWith,
      displacedBy = _ref.displacedBy;
  var isDisplaced = Boolean(displaced[combineWith]);

  if (didStartDisplaced(combineWith, onLift)) {
    return isDisplaced ? origin : negate(displacedBy.point);
  }

  return isDisplaced ? displacedBy.point : origin;
});

var getWhenEntered = function getWhenEntered(id, current, oldMerge) {
  if (!oldMerge) {
    return current;
  }

  if (id !== oldMerge.combine.draggableId) {
    return current;
  }

  return oldMerge.whenEntered;
};

var isCombiningWith = function isCombiningWith(_ref) {
  var id = _ref.id,
      currentCenter = _ref.currentCenter,
      axis = _ref.axis,
      borderBox = _ref.borderBox,
      displaceBy = _ref.displaceBy,
      currentUserDirection = _ref.currentUserDirection,
      oldMerge = _ref.oldMerge;
  var start = borderBox[axis.start] + displaceBy[axis.line];
  var end = borderBox[axis.end] + displaceBy[axis.line];
  var size = borderBox[axis.size];
  var twoThirdsOfSize = size * 0.666;
  var whenEntered = getWhenEntered(id, currentUserDirection, oldMerge);
  var isMovingForward = isUserMovingForward(axis, whenEntered);
  var targetCenter = currentCenter[axis.line];

  if (isMovingForward) {
    return isWithin(start, start + twoThirdsOfSize)(targetCenter);
  }

  return isWithin(end - twoThirdsOfSize, end)(targetCenter);
};

var getCombineImpact = (function (_ref2) {
  var currentCenter = _ref2.pageBorderBoxCenterWithDroppableScrollChange,
      previousImpact = _ref2.previousImpact,
      destination = _ref2.destination,
      insideDestinationWithoutDraggable = _ref2.insideDestinationWithoutDraggable,
      userDirection = _ref2.userDirection,
      onLift = _ref2.onLift;

  if (!destination.isCombineEnabled) {
    return null;
  }

  var axis = destination.axis;
  var map = previousImpact.movement.map;
  var canBeDisplacedBy = previousImpact.movement.displacedBy;
  var oldMerge = previousImpact.merge;
  var target = find(insideDestinationWithoutDraggable, function (child) {
    var id = child.descriptor.id;
    var displaceBy = getCombinedItemDisplacement({
      displaced: map,
      onLift: onLift,
      combineWith: id,
      displacedBy: canBeDisplacedBy
    });
    return isCombiningWith({
      id: id,
      currentCenter: currentCenter,
      axis: axis,
      borderBox: child.page.borderBox,
      displaceBy: displaceBy,
      currentUserDirection: userDirection,
      oldMerge: oldMerge
    });
  });

  if (!target) {
    return null;
  }

  var merge = {
    whenEntered: getWhenEntered(target.descriptor.id, userDirection, oldMerge),
    combine: {
      draggableId: target.descriptor.id,
      droppableId: destination.descriptor.id
    }
  };

  var withMerge = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, previousImpact, {
    destination: null,
    merge: merge
  });

  return withMerge;
});

var isPartiallyVisibleThroughFrame = (function (frame) {
  var isWithinVertical = isWithin(frame.top, frame.bottom);
  var isWithinHorizontal = isWithin(frame.left, frame.right);
  return function (subject) {
    var isContained = isWithinVertical(subject.top) && isWithinVertical(subject.bottom) && isWithinHorizontal(subject.left) && isWithinHorizontal(subject.right);

    if (isContained) {
      return true;
    }

    var isPartiallyVisibleVertically = isWithinVertical(subject.top) || isWithinVertical(subject.bottom);
    var isPartiallyVisibleHorizontally = isWithinHorizontal(subject.left) || isWithinHorizontal(subject.right);
    var isPartiallyContained = isPartiallyVisibleVertically && isPartiallyVisibleHorizontally;

    if (isPartiallyContained) {
      return true;
    }

    var isBiggerVertically = subject.top < frame.top && subject.bottom > frame.bottom;
    var isBiggerHorizontally = subject.left < frame.left && subject.right > frame.right;
    var isTargetBiggerThanFrame = isBiggerVertically && isBiggerHorizontally;

    if (isTargetBiggerThanFrame) {
      return true;
    }

    var isTargetBiggerOnOneAxis = isBiggerVertically && isPartiallyVisibleHorizontally || isBiggerHorizontally && isPartiallyVisibleVertically;
    return isTargetBiggerOnOneAxis;
  };
});

var isTotallyVisibleThroughFrame = (function (frame) {
  var isWithinVertical = isWithin(frame.top, frame.bottom);
  var isWithinHorizontal = isWithin(frame.left, frame.right);
  return function (subject) {
    var isContained = isWithinVertical(subject.top) && isWithinVertical(subject.bottom) && isWithinHorizontal(subject.left) && isWithinHorizontal(subject.right);
    return isContained;
  };
});

var isTotallyVisibleThroughFrameOnAxis = (function (axis) {
  return function (frame) {
    var isWithinVertical = isWithin(frame.top, frame.bottom);
    var isWithinHorizontal = isWithin(frame.left, frame.right);
    return function (subject) {
      if (axis === vertical) {
        return isWithinVertical(subject.top) && isWithinVertical(subject.bottom);
      }

      return isWithinHorizontal(subject.left) && isWithinHorizontal(subject.right);
    };
  };
});

var getDroppableDisplaced = function getDroppableDisplaced(target, destination) {
  var displacement = destination.frame ? destination.frame.scroll.diff.displacement : origin;
  return offsetByPosition(target, displacement);
};

var isVisibleInDroppable = function isVisibleInDroppable(target, destination, isVisibleThroughFrameFn) {
  if (!destination.subject.active) {
    return false;
  }

  return isVisibleThroughFrameFn(destination.subject.active)(target);
};

var isVisibleInViewport = function isVisibleInViewport(target, viewport, isVisibleThroughFrameFn) {
  return isVisibleThroughFrameFn(viewport)(target);
};

var isVisible = function isVisible(_ref) {
  var toBeDisplaced = _ref.target,
      destination = _ref.destination,
      viewport = _ref.viewport,
      withDroppableDisplacement = _ref.withDroppableDisplacement,
      isVisibleThroughFrameFn = _ref.isVisibleThroughFrameFn;
  var displacedTarget = withDroppableDisplacement ? getDroppableDisplaced(toBeDisplaced, destination) : toBeDisplaced;
  return isVisibleInDroppable(displacedTarget, destination, isVisibleThroughFrameFn) && isVisibleInViewport(displacedTarget, viewport, isVisibleThroughFrameFn);
};

var isPartiallyVisible = function isPartiallyVisible(args) {
  return isVisible(Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, args, {
    isVisibleThroughFrameFn: isPartiallyVisibleThroughFrame
  }));
};
var isTotallyVisible = function isTotallyVisible(args) {
  return isVisible(Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, args, {
    isVisibleThroughFrameFn: isTotallyVisibleThroughFrame
  }));
};
var isTotallyVisibleOnAxis = function isTotallyVisibleOnAxis(args) {
  return isVisible(Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, args, {
    isVisibleThroughFrameFn: isTotallyVisibleThroughFrameOnAxis(args.destination.axis)
  }));
};

var getShouldAnimate = function getShouldAnimate(forceShouldAnimate, isVisible, previous) {
  if (typeof forceShouldAnimate === 'boolean') {
    return forceShouldAnimate;
  }

  if (!isVisible) {
    return false;
  }

  if (!previous) {
    return true;
  }

  return previous.shouldAnimate;
};

var getTarget = function getTarget(draggable, onLift) {
  var marginBox = draggable.page.marginBox;

  if (!didStartDisplaced(draggable.descriptor.id, onLift)) {
    return marginBox;
  }

  var expandBy = {
    top: onLift.displacedBy.point.y,
    right: onLift.displacedBy.point.x,
    bottom: 0,
    left: 0
  };
  return Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["e" /* getRect */])(Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["c" /* expand */])(marginBox, expandBy));
};

var getDisplacement = (function (_ref) {
  var draggable = _ref.draggable,
      destination = _ref.destination,
      previousImpact = _ref.previousImpact,
      viewport = _ref.viewport,
      onLift = _ref.onLift,
      forceShouldAnimate = _ref.forceShouldAnimate;
  var id = draggable.descriptor.id;
  var map = previousImpact.movement.map;
  var target = getTarget(draggable, onLift);
  var isVisible = isPartiallyVisible({
    target: target,
    destination: destination,
    viewport: viewport,
    withDroppableDisplacement: true
  });
  var shouldAnimate = getShouldAnimate(forceShouldAnimate, isVisible, map[id]);
  var displacement = {
    draggableId: id,
    isVisible: isVisible,
    shouldAnimate: shouldAnimate
  };
  return displacement;
});

var getDisplacementMap = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (displaced) {
  return displaced.reduce(function (map, displacement) {
    map[displacement.draggableId] = displacement;
    return map;
  }, {});
});

var getDisplacedBy = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (axis, displaceBy) {
  var displacement = displaceBy[axis.line];
  return {
    value: displacement,
    point: patch(axis.line, displacement)
  };
});

var getReorderImpact = (function (_ref) {
  var currentCenter = _ref.pageBorderBoxCenterWithDroppableScrollChange,
      draggable = _ref.draggable,
      destination = _ref.destination,
      insideDestinationWithoutDraggable = _ref.insideDestinationWithoutDraggable,
      previousImpact = _ref.previousImpact,
      viewport = _ref.viewport,
      userDirection = _ref.userDirection,
      onLift = _ref.onLift;
  var axis = destination.axis;
  var isMovingForward = isUserMovingForward(destination.axis, userDirection);
  var displacedBy = getDisplacedBy(destination.axis, draggable.displaceBy);
  var targetCenter = currentCenter[axis.line];
  var displacement = displacedBy.value;
  var displaced = insideDestinationWithoutDraggable.filter(function (child) {
    var borderBox = child.page.borderBox;
    var start = borderBox[axis.start];
    var end = borderBox[axis.end];
    var didStartDisplaced$1 = didStartDisplaced(child.descriptor.id, onLift);

    if (isMovingForward) {
      if (didStartDisplaced$1) {
        return targetCenter < start;
      }

      return targetCenter < start + displacement;
    }

    if (didStartDisplaced$1) {
      return targetCenter <= end - displacement;
    }

    return targetCenter <= end;
  }).map(function (dimension) {
    return getDisplacement({
      draggable: dimension,
      destination: destination,
      previousImpact: previousImpact,
      viewport: viewport.frame,
      onLift: onLift
    });
  });
  var newIndex = insideDestinationWithoutDraggable.length - displaced.length;
  var movement = {
    displacedBy: displacedBy,
    displaced: displaced,
    map: getDisplacementMap(displaced)
  };
  var impact = {
    movement: movement,
    destination: {
      droppableId: destination.descriptor.id,
      index: newIndex
    },
    merge: null
  };
  return impact;
});

var noDisplacedBy = {
  point: origin,
  value: 0
};
var noMovement = {
  displaced: [],
  map: {},
  displacedBy: noDisplacedBy
};
var noImpact = {
  movement: noMovement,
  destination: null,
  merge: null
};

var removeDraggableFromList = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (remove, list) {
  return list.filter(function (item) {
    return item.descriptor.id !== remove.descriptor.id;
  });
});

var getDragImpact = (function (_ref) {
  var pageBorderBoxCenter = _ref.pageBorderBoxCenter,
      draggable = _ref.draggable,
      draggables = _ref.draggables,
      droppables = _ref.droppables,
      previousImpact = _ref.previousImpact,
      viewport = _ref.viewport,
      userDirection = _ref.userDirection,
      onLift = _ref.onLift;
  var destinationId = getDroppableOver({
    target: pageBorderBoxCenter,
    droppables: droppables
  });

  if (!destinationId) {
    return noImpact;
  }

  var destination = droppables[destinationId];
  var insideDestination = getDraggablesInsideDroppable(destination.descriptor.id, draggables);
  var insideDestinationWithoutDraggable = removeDraggableFromList(draggable, insideDestination);
  var pageBorderBoxCenterWithDroppableScrollChange = withDroppableScroll(destination, pageBorderBoxCenter);
  var withMerge = getCombineImpact({
    pageBorderBoxCenterWithDroppableScrollChange: pageBorderBoxCenterWithDroppableScrollChange,
    previousImpact: previousImpact,
    destination: destination,
    insideDestinationWithoutDraggable: insideDestinationWithoutDraggable,
    userDirection: userDirection,
    onLift: onLift
  });

  if (withMerge) {
    return withMerge;
  }

  return getReorderImpact({
    pageBorderBoxCenterWithDroppableScrollChange: pageBorderBoxCenterWithDroppableScrollChange,
    destination: destination,
    draggable: draggable,
    insideDestinationWithoutDraggable: insideDestinationWithoutDraggable,
    previousImpact: previousImpact,
    viewport: viewport,
    userDirection: userDirection,
    onLift: onLift
  });
});

var getHomeLocation = (function (descriptor) {
  return {
    index: descriptor.index,
    droppableId: descriptor.droppableId
  };
});

var getHomeOnLift = (function (_ref) {
  var draggable = _ref.draggable,
      home = _ref.home,
      draggables = _ref.draggables,
      viewport = _ref.viewport;
  var displacedBy = getDisplacedBy(home.axis, draggable.displaceBy);
  var insideHome = getDraggablesInsideDroppable(home.descriptor.id, draggables);
  var originallyDisplaced = insideHome.slice(draggable.descriptor.index + 1);
  var wasDisplaced = originallyDisplaced.reduce(function (previous, item) {
    previous[item.descriptor.id] = true;
    return previous;
  }, {});
  var onLift = {
    displacedBy: displacedBy,
    wasDisplaced: wasDisplaced
  };
  var displaced = originallyDisplaced.map(function (dimension) {
    return getDisplacement({
      draggable: dimension,
      destination: home,
      previousImpact: noImpact,
      viewport: viewport.frame,
      forceShouldAnimate: false,
      onLift: onLift
    });
  });
  var movement = {
    displaced: displaced,
    map: getDisplacementMap(displaced),
    displacedBy: displacedBy
  };
  var impact = {
    movement: movement,
    destination: getHomeLocation(draggable.descriptor),
    merge: null
  };
  return {
    impact: impact,
    onLift: onLift
  };
});

var getDragPositions = (function (_ref) {
  var oldInitial = _ref.initial,
      oldCurrent = _ref.current,
      oldClientBorderBoxCenter = _ref.oldClientBorderBoxCenter,
      newClientBorderBoxCenter = _ref.newClientBorderBoxCenter,
      viewport = _ref.viewport;
  var shift = subtract(newClientBorderBoxCenter, oldClientBorderBoxCenter);

  var initial = function () {
    var client = {
      selection: add(oldInitial.client.selection, shift),
      borderBoxCenter: newClientBorderBoxCenter,
      offset: origin
    };
    var page = {
      selection: add(client.selection, viewport.scroll.initial),
      borderBoxCenter: add(client.selection, viewport.scroll.initial)
    };
    return {
      client: client,
      page: page
    };
  }();

  var current = function () {
    var reverse = negate(shift);
    var offset = add(oldCurrent.client.offset, reverse);
    var client = {
      selection: add(initial.client.selection, offset),
      borderBoxCenter: add(initial.client.borderBoxCenter, offset),
      offset: offset
    };
    var page = {
      selection: add(client.selection, viewport.scroll.current),
      borderBoxCenter: add(client.borderBoxCenter, viewport.scroll.current)
    };
    !isEqual(oldCurrent.client.borderBoxCenter, client.borderBoxCenter) ?  false ? invariant(false, "\n        Incorrect new client center position.\n        Expected (" + oldCurrent.client.borderBoxCenter.x + ", " + oldCurrent.client.borderBoxCenter.y + ")\n        to equal (" + client.borderBoxCenter.x + ", " + client.borderBoxCenter.y + ")\n      ") : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    return {
      client: client,
      page: page
    };
  }();

  return {
    current: current,
    initial: initial
  };
});

var offsetDraggable = (function (_ref) {
  var draggable = _ref.draggable,
      offset$1 = _ref.offset,
      initialWindowScroll = _ref.initialWindowScroll;
  var client = Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["f" /* offset */])(draggable.client, offset$1);
  var page = Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["g" /* withScroll */])(client, initialWindowScroll);

  var moved = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, draggable, {
    placeholder: Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, draggable.placeholder, {
      client: client
    }),
    client: client,
    page: page
  });

  return moved;
});

var adjustExistingForAdditionsAndRemovals = (function (_ref) {
  var existing = _ref.existing,
      droppables = _ref.droppables,
      addedDraggables = _ref.additions,
      removedDraggables = _ref.removals,
      viewport = _ref.viewport;
  var shifted = {};
  toDroppableList(droppables).forEach(function (droppable) {
    var axis = droppable.axis;
    var original = getDraggablesInsideDroppable(droppable.descriptor.id, existing);
    var toShift = {};

    var addShift = function addShift(id, shift) {
      var previous = toShift[id];

      if (!previous) {
        toShift[id] = shift;
        return;
      }

      toShift[id] = {
        indexChange: previous.indexChange + shift.indexChange,
        offset: add(previous.offset, shift.offset)
      };
    };

    var removals = toDraggableMap(removedDraggables.map(function (id) {
      var item = existing[id];
      !item ?  false ? invariant(false, "Could not find removed draggable \"" + id + "\"") : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
      return item;
    }).filter(function (draggable) {
      return draggable.descriptor.droppableId === droppable.descriptor.id;
    }));
    var withRemovals = original.filter(function (item, index) {
      var isBeingRemoved = Boolean(removals[item.descriptor.id]);

      if (!isBeingRemoved) {
        return true;
      }

      var offset = negate(patch(axis.line, item.displaceBy[axis.line]));
      original.slice(index).forEach(function (sibling) {
        if (removals[sibling.descriptor.id]) {
          return;
        }

        addShift(sibling.descriptor.id, {
          indexChange: -1,
          offset: offset
        });
      });
      return false;
    });
    var additions = addedDraggables.filter(function (draggable) {
      return draggable.descriptor.droppableId === droppable.descriptor.id;
    });
    var withAdditions = withRemovals.slice(0);
    additions.forEach(function (item) {
      withAdditions.splice(item.descriptor.index, 0, item);
    });
    var additionMap = toDraggableMap(additions);
    withAdditions.forEach(function (item, index) {
      var wasAdded = Boolean(additionMap[item.descriptor.id]);

      if (!wasAdded) {
        return;
      }

      var offset = patch(axis.line, item.client.marginBox[axis.size]);
      withAdditions.slice(index).forEach(function (sibling) {
        if (additionMap[sibling.descriptor.id]) {
          return;
        }

        addShift(sibling.descriptor.id, {
          indexChange: 1,
          offset: offset
        });
      });
    });
    withAdditions.forEach(function (item) {
      if (additionMap[item.descriptor.id]) {
        return;
      }

      var shift = toShift[item.descriptor.id];

      if (!shift) {
        return;
      }

      var moved = offsetDraggable({
        draggable: item,
        offset: shift.offset,
        initialWindowScroll: viewport.scroll.initial
      });
      var index = item.descriptor.index + shift.indexChange;

      var updated = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, moved, {
        descriptor: Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, item.descriptor, {
          index: index
        })
      });

      shifted[moved.descriptor.id] = updated;
    });
  });

  var map = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, existing, shifted);

  return map;
});

var adjustAdditionsForScrollChanges = (function (_ref) {
  var additions = _ref.additions,
      updatedDroppables = _ref.updatedDroppables,
      viewport = _ref.viewport;
  var windowScrollChange = viewport.scroll.diff.value;
  return additions.map(function (draggable) {
    var droppableId = draggable.descriptor.droppableId;
    var modified = updatedDroppables[droppableId];
    var frame = modified.frame;
    !frame ?  false ? invariant(false) : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    var droppableScrollChange = frame.scroll.diff.value;
    var totalChange = add(windowScrollChange, droppableScrollChange);
    var moved = offsetDraggable({
      draggable: draggable,
      offset: totalChange,
      initialWindowScroll: viewport.scroll.initial
    });
    return moved;
  });
});

var adjustAdditionsForCollapsedHome = (function (_ref) {
  var additions = _ref.additions,
      dragging = _ref.dragging,
      home = _ref.home,
      viewport = _ref.viewport;
  var displacedBy = getDisplacedBy(home.axis, dragging.displaceBy);
  return additions.map(function (draggable) {
    if (draggable.descriptor.droppableId !== home.descriptor.id) {
      return draggable;
    }

    if (draggable.descriptor.index < dragging.descriptor.index) {
      return draggable;
    }

    return offsetDraggable({
      draggable: draggable,
      offset: displacedBy.point,
      initialWindowScroll: viewport.scroll.initial
    });
  });
});

var updateDraggables = (function (_ref) {
  var updatedDroppables = _ref.updatedDroppables,
      criticalId = _ref.criticalId,
      unmodifiedExisting = _ref.existing,
      unmodifiedAdditions = _ref.additions,
      removals = _ref.removals,
      viewport = _ref.viewport;
  var existing = adjustExistingForAdditionsAndRemovals({
    droppables: updatedDroppables,
    existing: unmodifiedExisting,
    additions: unmodifiedAdditions,
    removals: removals,
    viewport: viewport
  });
  var dragging = existing[criticalId];
  var home = updatedDroppables[dragging.descriptor.droppableId];
  var scrolledAdditions = adjustAdditionsForScrollChanges({
    additions: unmodifiedAdditions,
    updatedDroppables: updatedDroppables,
    viewport: viewport
  });
  var additions = adjustAdditionsForCollapsedHome({
    additions: scrolledAdditions,
    dragging: dragging,
    home: home,
    viewport: viewport
  });

  var map = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, existing, toDraggableMap(additions));

  removals.forEach(function (id) {
    delete map[id];
  });
  return map;
});

var getMaxScroll = (function (_ref) {
  var scrollHeight = _ref.scrollHeight,
      scrollWidth = _ref.scrollWidth,
      height = _ref.height,
      width = _ref.width;
  var maxScroll = subtract({
    x: scrollWidth,
    y: scrollHeight
  }, {
    x: width,
    y: height
  });
  var adjustedMaxScroll = {
    x: Math.max(0, maxScroll.x),
    y: Math.max(0, maxScroll.y)
  };
  return adjustedMaxScroll;
});

var getDroppableDimension = (function (_ref) {
  var descriptor = _ref.descriptor,
      isEnabled = _ref.isEnabled,
      isCombineEnabled = _ref.isCombineEnabled,
      isFixedOnPage = _ref.isFixedOnPage,
      direction = _ref.direction,
      client = _ref.client,
      page = _ref.page,
      closest = _ref.closest;

  var frame = function () {
    if (!closest) {
      return null;
    }

    var scrollSize = closest.scrollSize,
        frameClient = closest.client;
    var maxScroll = getMaxScroll({
      scrollHeight: scrollSize.scrollHeight,
      scrollWidth: scrollSize.scrollWidth,
      height: frameClient.paddingBox.height,
      width: frameClient.paddingBox.width
    });
    return {
      pageMarginBox: closest.page.marginBox,
      frameClient: frameClient,
      scrollSize: scrollSize,
      shouldClipSubject: closest.shouldClipSubject,
      scroll: {
        initial: closest.scroll,
        current: closest.scroll,
        max: maxScroll,
        diff: {
          value: origin,
          displacement: origin
        }
      }
    };
  }();

  var axis = direction === 'vertical' ? vertical : horizontal;
  var subject = getSubject({
    page: page,
    withPlaceholder: null,
    axis: axis,
    frame: frame
  });
  var dimension = {
    descriptor: descriptor,
    isCombineEnabled: isCombineEnabled,
    isFixedOnPage: isFixedOnPage,
    axis: axis,
    isEnabled: isEnabled,
    client: client,
    page: page,
    frame: frame,
    subject: subject
  };
  return dimension;
});

var isHomeOf = (function (draggable, destination) {
  return draggable.descriptor.droppableId === destination.descriptor.id;
});

var getRequiredGrowthForPlaceholder = function getRequiredGrowthForPlaceholder(droppable, placeholderSize, draggables) {
  var axis = droppable.axis;
  var availableSpace = droppable.subject.page.contentBox[axis.size];
  var insideDroppable = getDraggablesInsideDroppable(droppable.descriptor.id, draggables);
  var spaceUsed = insideDroppable.reduce(function (sum, dimension) {
    return sum + dimension.client.marginBox[axis.size];
  }, 0);
  var requiredSpace = spaceUsed + placeholderSize[axis.line];
  var needsToGrowBy = requiredSpace - availableSpace;

  if (needsToGrowBy <= 0) {
    return null;
  }

  return patch(axis.line, needsToGrowBy);
};

var withMaxScroll = function withMaxScroll(frame, max) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, frame, {
    scroll: Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, frame.scroll, {
      max: max
    })
  });
};

var addPlaceholder = function addPlaceholder(droppable, draggable, draggables) {
  var frame = droppable.frame;
  !!isHomeOf(draggable, droppable) ?  false ? invariant(false, 'Should not add placeholder space to home list') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  !!droppable.subject.withPlaceholder ?  false ? invariant(false, 'Cannot add placeholder size to a subject when it already has one') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  var placeholderSize = getDisplacedBy(droppable.axis, draggable.displaceBy).point;
  var requiredGrowth = getRequiredGrowthForPlaceholder(droppable, placeholderSize, draggables);
  var added = {
    placeholderSize: placeholderSize,
    increasedBy: requiredGrowth,
    oldFrameMaxScroll: droppable.frame ? droppable.frame.scroll.max : null
  };

  if (!frame) {
    var _subject = getSubject({
      page: droppable.subject.page,
      withPlaceholder: added,
      axis: droppable.axis,
      frame: droppable.frame
    });

    return Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, droppable, {
      subject: _subject
    });
  }

  var maxScroll = requiredGrowth ? add(frame.scroll.max, requiredGrowth) : frame.scroll.max;
  var newFrame = withMaxScroll(frame, maxScroll);
  var subject = getSubject({
    page: droppable.subject.page,
    withPlaceholder: added,
    axis: droppable.axis,
    frame: newFrame
  });
  return Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, droppable, {
    subject: subject,
    frame: newFrame
  });
};
var removePlaceholder = function removePlaceholder(droppable) {
  var added = droppable.subject.withPlaceholder;
  !added ?  false ? invariant(false, 'Cannot remove placeholder form subject when there was none') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  var frame = droppable.frame;

  if (!frame) {
    var _subject2 = getSubject({
      page: droppable.subject.page,
      axis: droppable.axis,
      frame: null,
      withPlaceholder: null
    });

    return Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, droppable, {
      subject: _subject2
    });
  }

  var oldMaxScroll = added.oldFrameMaxScroll;
  !oldMaxScroll ?  false ? invariant(false, 'Expected droppable with frame to have old max frame scroll when removing placeholder') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  var newFrame = withMaxScroll(frame, oldMaxScroll);
  var subject = getSubject({
    page: droppable.subject.page,
    axis: droppable.axis,
    frame: newFrame,
    withPlaceholder: null
  });
  return Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, droppable, {
    subject: subject,
    frame: newFrame
  });
};

var getFrame = (function (droppable) {
  var frame = droppable.frame;
  !frame ?  false ? invariant(false, 'Expected Droppable to have a frame') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  return frame;
});

var throwIfSpacingChange = function throwIfSpacingChange(old, fresh) {
  if (false) {
    var getMessage = function getMessage(spacingType) {
      return "Cannot change the " + spacingType + " of a Droppable during a drag";
    };

    !isEqual$1(old.margin, fresh.margin) ? process.env.NODE_ENV !== "production" ? invariant(false, getMessage('margin')) : invariant(false) : void 0;
    !isEqual$1(old.border, fresh.border) ? process.env.NODE_ENV !== "production" ? invariant(false, getMessage('border')) : invariant(false) : void 0;
    !isEqual$1(old.padding, fresh.padding) ? process.env.NODE_ENV !== "production" ? invariant(false, getMessage('padding')) : invariant(false) : void 0;
  }
};

var adjustBorderBoxSize = function adjustBorderBoxSize(axis, old, fresh) {
  return {
    top: old.top,
    left: old.left,
    right: old.left + fresh.width,
    bottom: old.top + fresh.height
  };
};

var updateDroppables = (function (_ref) {
  var modified = _ref.modified,
      existing = _ref.existing,
      viewport = _ref.viewport;

  if (!modified.length) {
    return existing;
  }

  var adjusted = modified.map(function (provided) {
    var raw = existing[provided.descriptor.id];
    !raw ?  false ? invariant(false, 'Could not locate droppable in existing droppables') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    var hasPlaceholder = Boolean(raw.subject.withPlaceholder);
    var dimension = hasPlaceholder ? removePlaceholder(raw) : raw;
    var oldClient = dimension.client;
    var newClient = provided.client;
    var oldScrollable = getFrame(dimension);
    var newScrollable = getFrame(provided);

    if (false) {
      throwIfSpacingChange(dimension.client, provided.client);
      throwIfSpacingChange(oldScrollable.frameClient, newScrollable.frameClient);
      var isFrameEqual = oldScrollable.frameClient.borderBox.height === newScrollable.frameClient.borderBox.height && oldScrollable.frameClient.borderBox.width === newScrollable.frameClient.borderBox.width;
      !isFrameEqual ? process.env.NODE_ENV !== "production" ? invariant(false, 'The width and height of your Droppable scroll container cannot change when adding or removing Draggables during a drag') : invariant(false) : void 0;
    }

    var client = Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["b" /* createBox */])({
      borderBox: adjustBorderBoxSize(dimension.axis, oldClient.borderBox, newClient.borderBox),
      margin: oldClient.margin,
      border: oldClient.border,
      padding: oldClient.padding
    });
    var closest = {
      client: oldScrollable.frameClient,
      page: Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["g" /* withScroll */])(oldScrollable.frameClient, viewport.scroll.initial),
      shouldClipSubject: oldScrollable.shouldClipSubject,
      scrollSize: newScrollable.scrollSize,
      scroll: oldScrollable.scroll.initial
    };
    var withSizeChanged = getDroppableDimension({
      descriptor: provided.descriptor,
      isEnabled: provided.isEnabled,
      isCombineEnabled: provided.isCombineEnabled,
      isFixedOnPage: provided.isFixedOnPage,
      direction: provided.axis.direction,
      client: client,
      page: Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["g" /* withScroll */])(client, viewport.scroll.initial),
      closest: closest
    });
    var scrolled = scrollDroppable(withSizeChanged, newScrollable.scroll.current);
    return scrolled;
  });

  var result = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, existing, toDroppableMap(adjusted));

  return result;
});

var withNoAnimatedDisplacement = (function (impact) {
  var displaced = impact.movement.displaced;

  if (!displaced.length) {
    return impact;
  }

  var withoutAnimation = displaced.map(function (displacement) {
    if (!displacement.isVisible) {
      return displacement;
    }

    if (!displacement.shouldAnimate) {
      return displacement;
    }

    return Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, displacement, {
      shouldAnimate: false
    });
  });

  var result = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, impact, {
    movement: Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, impact.movement, {
      displaced: withoutAnimation,
      map: getDisplacementMap(withoutAnimation)
    })
  });

  return result;
});

var patchDroppableMap = (function (droppables, updated) {
  var _extends2;

  return Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, droppables, (_extends2 = {}, _extends2[updated.descriptor.id] = updated, _extends2));
});

var clearUnusedPlaceholder = function clearUnusedPlaceholder(_ref) {
  var previousImpact = _ref.previousImpact,
      impact = _ref.impact,
      droppables = _ref.droppables;
  var last = whatIsDraggedOver(previousImpact);
  var now = whatIsDraggedOver(impact);

  if (!last) {
    return droppables;
  }

  if (last === now) {
    return droppables;
  }

  var lastDroppable = droppables[last];

  if (!lastDroppable.subject.withPlaceholder) {
    return droppables;
  }

  var updated = removePlaceholder(lastDroppable);
  return patchDroppableMap(droppables, updated);
};

var recomputePlaceholders = (function (_ref2) {
  var draggable = _ref2.draggable,
      draggables = _ref2.draggables,
      droppables = _ref2.droppables,
      previousImpact = _ref2.previousImpact,
      impact = _ref2.impact;
  var cleaned = clearUnusedPlaceholder({
    previousImpact: previousImpact,
    impact: impact,
    droppables: droppables
  });
  var isOver = whatIsDraggedOver(impact);

  if (!isOver) {
    return cleaned;
  }

  var droppable = droppables[isOver];

  if (isHomeOf(draggable, droppable)) {
    return cleaned;
  }

  if (droppable.subject.withPlaceholder) {
    return cleaned;
  }

  var patched = addPlaceholder(droppable, draggable, draggables);
  return patchDroppableMap(cleaned, patched);
});

var timingsKey = 'Processing dynamic changes';
var publishWhileDragging = (function (_ref) {
  var _extends2, _extends3;

  var state = _ref.state,
      published = _ref.published;
  start(timingsKey);
  var updatedDroppables = updateDroppables({
    modified: published.modified,
    existing: state.dimensions.droppables,
    viewport: state.viewport
  });
  var draggables = updateDraggables({
    updatedDroppables: updatedDroppables,
    criticalId: state.critical.draggable.id,
    existing: state.dimensions.draggables,
    additions: published.additions,
    removals: published.removals,
    viewport: state.viewport
  });
  var critical = {
    draggable: draggables[state.critical.draggable.id].descriptor,
    droppable: updatedDroppables[state.critical.droppable.id].descriptor
  };
  var original = state.dimensions.draggables[critical.draggable.id];
  var updated = draggables[critical.draggable.id];
  var droppables = recomputePlaceholders({
    draggable: updated,
    draggables: draggables,
    droppables: updatedDroppables,
    previousImpact: state.impact,
    impact: state.impact
  });
  var dimensions = {
    draggables: draggables,
    droppables: droppables
  };

  var _getDragPositions = getDragPositions({
    initial: state.initial,
    current: state.current,
    oldClientBorderBoxCenter: original.client.borderBox.center,
    newClientBorderBoxCenter: updated.client.borderBox.center,
    viewport: state.viewport
  }),
      initial = _getDragPositions.initial,
      current = _getDragPositions.current;

  var _getHomeOnLift = getHomeOnLift({
    draggable: updated,
    home: dimensions.droppables[critical.droppable.id],
    draggables: dimensions.draggables,
    viewport: state.viewport
  }),
      homeImpact = _getHomeOnLift.impact,
      onLift = _getHomeOnLift.onLift;

  var impact = withNoAnimatedDisplacement(getDragImpact({
    pageBorderBoxCenter: current.page.borderBoxCenter,
    draggable: updated,
    draggables: dimensions.draggables,
    droppables: dimensions.droppables,
    previousImpact: homeImpact,
    viewport: state.viewport,
    userDirection: state.userDirection,
    onLift: onLift
  }));
  var isOrphaned = Boolean(state.movementMode === 'SNAP' && !whatIsDraggedOver(impact));
  !!isOrphaned ?  false ? invariant(false, 'Dragging item no longer has a valid merge/destination after a dynamic update. This is not supported') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  finish(timingsKey);

  var draggingState = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({
    phase: 'DRAGGING'
  }, state, (_extends2 = {}, _extends2["phase"] = 'DRAGGING', _extends2.critical = critical, _extends2.current = current, _extends2.initial = initial, _extends2.impact = impact, _extends2.dimensions = dimensions, _extends2.onLift = onLift, _extends2.onLiftImpact = homeImpact, _extends2.forceShouldAnimate = false, _extends2));

  if (state.phase === 'COLLECTING') {
    return draggingState;
  }

  var dropPending = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({
    phase: 'DROP_PENDING'
  }, draggingState, (_extends3 = {}, _extends3["phase"] = 'DROP_PENDING', _extends3.reason = state.reason, _extends3.isWaiting = false, _extends3));

  return dropPending;
});

var forward = {
  vertical: 'down',
  horizontal: 'right'
};
var backward = {
  vertical: 'up',
  horizontal: 'left'
};

var moveToNextCombine = (function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      isInHomeList = _ref.isInHomeList,
      draggable = _ref.draggable,
      destination = _ref.destination,
      originalInsideDestination = _ref.insideDestination,
      previousImpact = _ref.previousImpact;

  if (!destination.isCombineEnabled) {
    return null;
  }

  if (previousImpact.merge) {
    return null;
  }

  var location = previousImpact.destination;
  !location ?  false ? invariant(false, 'Need a previous location to move from into a combine') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  var currentIndex = location.index;

  var currentInsideDestination = function () {
    var shallow = originalInsideDestination.slice();

    if (isInHomeList) {
      shallow.splice(draggable.descriptor.index, 1);
    }

    shallow.splice(location.index, 0, draggable);
    return shallow;
  }();

  var targetIndex = isMovingForward ? currentIndex + 1 : currentIndex - 1;

  if (targetIndex < 0) {
    return null;
  }

  if (targetIndex > currentInsideDestination.length - 1) {
    return null;
  }

  var target = currentInsideDestination[targetIndex];
  !(target !== draggable) ?  false ? invariant(false, 'Cannot combine with self') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  var merge = {
    whenEntered: isMovingForward ? forward : backward,
    combine: {
      draggableId: target.descriptor.id,
      droppableId: destination.descriptor.id
    }
  };
  var impact = {
    movement: previousImpact.movement,
    destination: null,
    merge: merge
  };
  return impact;
});

var addClosest = function addClosest(add, displaced) {
  var added = {
    draggableId: add.descriptor.id,
    isVisible: true,
    shouldAnimate: true
  };
  return [added].concat(displaced);
};
var removeClosest = function removeClosest(displaced) {
  return displaced.slice(1);
};

var fromReorder = (function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      isInHomeList = _ref.isInHomeList,
      draggable = _ref.draggable,
      initialInside = _ref.insideDestination,
      location = _ref.location;
  var insideDestination = initialInside.slice();
  var currentIndex = location.index;
  var isInForeignList = !isInHomeList;

  if (isInForeignList) {
    insideDestination.splice(location.index, 0, draggable);
  }

  var proposedIndex = isMovingForward ? currentIndex + 1 : currentIndex - 1;

  if (proposedIndex < 0) {
    return null;
  }

  if (proposedIndex > insideDestination.length - 1) {
    return null;
  }

  return {
    proposedIndex: proposedIndex,
    modifyDisplacement: true
  };
});

var fromCombine = (function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      destination = _ref.destination,
      previousImpact = _ref.previousImpact,
      draggables = _ref.draggables,
      merge = _ref.merge,
      onLift = _ref.onLift;

  if (!destination.isCombineEnabled) {
    return null;
  }

  var movement = previousImpact.movement;
  var combineId = merge.combine.draggableId;
  var combine = draggables[combineId];
  var combineIndex = combine.descriptor.index;
  var wasDisplacedAtStart = didStartDisplaced(combineId, onLift);

  if (wasDisplacedAtStart) {
    var hasDisplacedFromStart = !movement.map[combineId];

    if (hasDisplacedFromStart) {
      if (isMovingForward) {
        return {
          proposedIndex: combineIndex,
          modifyDisplacement: false
        };
      }

      return {
        proposedIndex: combineIndex - 1,
        modifyDisplacement: true
      };
    }

    if (isMovingForward) {
      return {
        proposedIndex: combineIndex,
        modifyDisplacement: true
      };
    }

    return {
      proposedIndex: combineIndex - 1,
      modifyDisplacement: false
    };
  }

  var isDisplaced = Boolean(movement.map[combineId]);

  if (isDisplaced) {
    if (isMovingForward) {
      return {
        proposedIndex: combineIndex + 1,
        modifyDisplacement: true
      };
    }

    return {
      proposedIndex: combineIndex,
      modifyDisplacement: false
    };
  }

  if (isMovingForward) {
    return {
      proposedIndex: combineIndex + 1,
      modifyDisplacement: false
    };
  }

  return {
    proposedIndex: combineIndex,
    modifyDisplacement: true
  };
});

var moveToNextIndex = (function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      isInHomeList = _ref.isInHomeList,
      draggable = _ref.draggable,
      draggables = _ref.draggables,
      destination = _ref.destination,
      insideDestination = _ref.insideDestination,
      previousImpact = _ref.previousImpact,
      onLift = _ref.onLift;

  var instruction = function () {
    if (previousImpact.destination) {
      return fromReorder({
        isMovingForward: isMovingForward,
        isInHomeList: isInHomeList,
        draggable: draggable,
        location: previousImpact.destination,
        insideDestination: insideDestination
      });
    }

    if (previousImpact.merge) {
      return fromCombine({
        isMovingForward: isMovingForward,
        destination: destination,
        previousImpact: previousImpact,
        draggables: draggables,
        merge: previousImpact.merge,
        onLift: onLift
      });
    }
    return null;
  }();

  if (instruction == null) {
    return null;
  }

  var proposedIndex = instruction.proposedIndex,
      modifyDisplacement = instruction.modifyDisplacement;
  var displacedBy = getDisplacedBy(destination.axis, draggable.displaceBy);

  var displaced = function () {
    var lastDisplaced = previousImpact.movement.displaced;

    if (!modifyDisplacement) {
      return lastDisplaced;
    }

    if (isMovingForward) {
      return removeClosest(lastDisplaced);
    }

    var withoutDraggable = removeDraggableFromList(draggable, insideDestination);
    var atProposedIndex = withoutDraggable[proposedIndex];
    return addClosest(atProposedIndex, lastDisplaced);
  }();

  return {
    movement: {
      displacedBy: displacedBy,
      displaced: displaced,
      map: getDisplacementMap(displaced)
    },
    destination: {
      droppableId: destination.descriptor.id,
      index: proposedIndex
    },
    merge: null
  };
});

var whenCombining = (function (_ref) {
  var combine = _ref.combine,
      onLift = _ref.onLift,
      movement = _ref.movement,
      draggables = _ref.draggables;
  var combineWith = combine.draggableId;
  var center = draggables[combineWith].page.borderBox.center;
  var displaceBy = getCombinedItemDisplacement({
    displaced: movement.map,
    onLift: onLift,
    combineWith: combineWith,
    displacedBy: movement.displacedBy
  });
  return add(center, displaceBy);
});

var distanceFromStartToBorderBoxCenter = function distanceFromStartToBorderBoxCenter(axis, box) {
  return box.margin[axis.start] + box.borderBox[axis.size] / 2;
};

var distanceFromEndToBorderBoxCenter = function distanceFromEndToBorderBoxCenter(axis, box) {
  return box.margin[axis.end] + box.borderBox[axis.size] / 2;
};

var getCrossAxisBorderBoxCenter = function getCrossAxisBorderBoxCenter(axis, target, isMoving) {
  return target[axis.crossAxisStart] + isMoving.margin[axis.crossAxisStart] + isMoving.borderBox[axis.crossAxisSize] / 2;
};

var goAfter = function goAfter(_ref) {
  var axis = _ref.axis,
      moveRelativeTo = _ref.moveRelativeTo,
      isMoving = _ref.isMoving;
  return patch(axis.line, moveRelativeTo.marginBox[axis.end] + distanceFromStartToBorderBoxCenter(axis, isMoving), getCrossAxisBorderBoxCenter(axis, moveRelativeTo.marginBox, isMoving));
};
var goBefore = function goBefore(_ref2) {
  var axis = _ref2.axis,
      moveRelativeTo = _ref2.moveRelativeTo,
      isMoving = _ref2.isMoving;
  return patch(axis.line, moveRelativeTo.marginBox[axis.start] - distanceFromEndToBorderBoxCenter(axis, isMoving), getCrossAxisBorderBoxCenter(axis, moveRelativeTo.marginBox, isMoving));
};
var goIntoStart = function goIntoStart(_ref3) {
  var axis = _ref3.axis,
      moveInto = _ref3.moveInto,
      isMoving = _ref3.isMoving;
  return patch(axis.line, moveInto.contentBox[axis.start] + distanceFromStartToBorderBoxCenter(axis, isMoving), getCrossAxisBorderBoxCenter(axis, moveInto.contentBox, isMoving));
};

var whenReordering = (function (_ref) {
  var movement = _ref.movement,
      draggable = _ref.draggable,
      draggables = _ref.draggables,
      droppable = _ref.droppable,
      onLift = _ref.onLift;
  var insideDestination = getDraggablesInsideDroppable(droppable.descriptor.id, draggables);
  var draggablePage = draggable.page;
  var axis = droppable.axis;

  if (!insideDestination.length) {
    return goIntoStart({
      axis: axis,
      moveInto: droppable.page,
      isMoving: draggablePage
    });
  }

  var displaced = movement.displaced,
      displacedBy = movement.displacedBy;

  if (displaced.length) {
    var closestAfter = draggables[displaced[0].draggableId];

    if (didStartDisplaced(closestAfter.descriptor.id, onLift)) {
      return goBefore({
        axis: axis,
        moveRelativeTo: closestAfter.page,
        isMoving: draggablePage
      });
    }

    var withDisplacement = Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["f" /* offset */])(closestAfter.page, displacedBy.point);
    return goBefore({
      axis: axis,
      moveRelativeTo: withDisplacement,
      isMoving: draggablePage
    });
  }

  var last = insideDestination[insideDestination.length - 1];

  if (last.descriptor.id === draggable.descriptor.id) {
    return draggablePage.borderBox.center;
  }

  if (didStartDisplaced(last.descriptor.id, onLift)) {
    var page = Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["f" /* offset */])(last.page, negate(onLift.displacedBy.point));
    return goAfter({
      axis: axis,
      moveRelativeTo: page,
      isMoving: draggablePage
    });
  }

  return goAfter({
    axis: axis,
    moveRelativeTo: last.page,
    isMoving: draggablePage
  });
});

var withDroppableDisplacement = (function (droppable, point) {
  var frame = droppable.frame;

  if (!frame) {
    return point;
  }

  return add(point, frame.scroll.diff.displacement);
});

var getResultWithoutDroppableDisplacement = function getResultWithoutDroppableDisplacement(_ref) {
  var impact = _ref.impact,
      draggable = _ref.draggable,
      droppable = _ref.droppable,
      draggables = _ref.draggables,
      onLift = _ref.onLift;
  var merge = impact.merge;
  var destination = impact.destination;
  var original = draggable.page.borderBox.center;

  if (!droppable) {
    return original;
  }

  if (destination) {
    return whenReordering({
      movement: impact.movement,
      draggable: draggable,
      draggables: draggables,
      droppable: droppable,
      onLift: onLift
    });
  }

  if (merge) {
    return whenCombining({
      movement: impact.movement,
      combine: merge.combine,
      draggables: draggables,
      onLift: onLift
    });
  }

  return original;
};

var getPageBorderBoxCenterFromImpact = (function (args) {
  var withoutDisplacement = getResultWithoutDroppableDisplacement(args);
  var droppable = args.droppable;
  var withDisplacement = droppable ? withDroppableDisplacement(droppable, withoutDisplacement) : withoutDisplacement;
  return withDisplacement;
});

var scrollViewport = (function (viewport, newScroll) {
  var diff = subtract(newScroll, viewport.scroll.initial);
  var displacement = negate(diff);
  var frame = Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["e" /* getRect */])({
    top: newScroll.y,
    bottom: newScroll.y + viewport.frame.height,
    left: newScroll.x,
    right: newScroll.x + viewport.frame.width
  });
  var updated = {
    frame: frame,
    scroll: {
      initial: viewport.scroll.initial,
      max: viewport.scroll.max,
      current: newScroll,
      diff: {
        value: diff,
        displacement: displacement
      }
    }
  };
  return updated;
});

var withNewDisplacement = (function (impact, displaced) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, impact, {
    movement: Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, impact.movement, {
      displaced: displaced,
      map: getDisplacementMap(displaced)
    })
  });
});

var speculativelyIncrease = (function (_ref) {
  var impact = _ref.impact,
      viewport = _ref.viewport,
      destination = _ref.destination,
      draggables = _ref.draggables,
      maxScrollChange = _ref.maxScrollChange,
      onLift = _ref.onLift;
  var displaced = impact.movement.displaced;
  var scrolledViewport = scrollViewport(viewport, add(viewport.scroll.current, maxScrollChange));
  var scrolledDroppable = destination.frame ? scrollDroppable(destination, add(destination.frame.scroll.current, maxScrollChange)) : destination;
  var updated = displaced.map(function (entry) {
    if (entry.isVisible) {
      return entry;
    }

    var draggable = draggables[entry.draggableId];
    var withScrolledViewport = getDisplacement({
      draggable: draggable,
      destination: destination,
      previousImpact: impact,
      viewport: scrolledViewport.frame,
      onLift: onLift,
      forceShouldAnimate: false
    });

    if (withScrolledViewport.isVisible) {
      return withScrolledViewport;
    }

    var withScrolledDroppable = getDisplacement({
      draggable: draggable,
      destination: scrolledDroppable,
      previousImpact: impact,
      viewport: viewport.frame,
      onLift: onLift,
      forceShouldAnimate: false
    });

    if (withScrolledDroppable.isVisible) {
      return withScrolledDroppable;
    }

    return entry;
  });
  return withNewDisplacement(impact, updated);
});

var withViewportDisplacement = (function (viewport, point) {
  return add(viewport.scroll.diff.displacement, point);
});

var getClientFromPageBorderBoxCenter = (function (_ref) {
  var pageBorderBoxCenter = _ref.pageBorderBoxCenter,
      draggable = _ref.draggable,
      viewport = _ref.viewport;
  var withoutPageScrollChange = withViewportDisplacement(viewport, pageBorderBoxCenter);
  var offset = subtract(withoutPageScrollChange, draggable.page.borderBox.center);
  return add(draggable.client.borderBox.center, offset);
});

var isTotallyVisibleInNewLocation = (function (_ref) {
  var draggable = _ref.draggable,
      destination = _ref.destination,
      newPageBorderBoxCenter = _ref.newPageBorderBoxCenter,
      viewport = _ref.viewport,
      withDroppableDisplacement = _ref.withDroppableDisplacement,
      _ref$onlyOnMainAxis = _ref.onlyOnMainAxis,
      onlyOnMainAxis = _ref$onlyOnMainAxis === void 0 ? false : _ref$onlyOnMainAxis;
  var changeNeeded = subtract(newPageBorderBoxCenter, draggable.page.borderBox.center);
  var shifted = offsetByPosition(draggable.page.borderBox, changeNeeded);
  var args = {
    target: shifted,
    destination: destination,
    withDroppableDisplacement: withDroppableDisplacement,
    viewport: viewport
  };
  return onlyOnMainAxis ? isTotallyVisibleOnAxis(args) : isTotallyVisible(args);
});

var moveToNextPlace = (function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      draggable = _ref.draggable,
      destination = _ref.destination,
      draggables = _ref.draggables,
      previousImpact = _ref.previousImpact,
      viewport = _ref.viewport,
      previousPageBorderBoxCenter = _ref.previousPageBorderBoxCenter,
      previousClientSelection = _ref.previousClientSelection,
      onLift = _ref.onLift;

  if (!destination.isEnabled) {
    return null;
  }

  var insideDestination = getDraggablesInsideDroppable(destination.descriptor.id, draggables);
  var isInHomeList = isHomeOf(draggable, destination);
  var impact = moveToNextCombine({
    isInHomeList: isInHomeList,
    isMovingForward: isMovingForward,
    draggable: draggable,
    destination: destination,
    insideDestination: insideDestination,
    previousImpact: previousImpact
  }) || moveToNextIndex({
    isMovingForward: isMovingForward,
    isInHomeList: isInHomeList,
    draggable: draggable,
    draggables: draggables,
    destination: destination,
    insideDestination: insideDestination,
    previousImpact: previousImpact,
    onLift: onLift
  });

  if (!impact) {
    return null;
  }

  var pageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
    impact: impact,
    draggable: draggable,
    droppable: destination,
    draggables: draggables,
    onLift: onLift
  });
  var isVisibleInNewLocation = isTotallyVisibleInNewLocation({
    draggable: draggable,
    destination: destination,
    newPageBorderBoxCenter: pageBorderBoxCenter,
    viewport: viewport.frame,
    withDroppableDisplacement: false,
    onlyOnMainAxis: true
  });

  if (isVisibleInNewLocation) {
    var clientSelection = getClientFromPageBorderBoxCenter({
      pageBorderBoxCenter: pageBorderBoxCenter,
      draggable: draggable,
      viewport: viewport
    });
    return {
      clientSelection: clientSelection,
      impact: impact,
      scrollJumpRequest: null
    };
  }

  var distance = subtract(pageBorderBoxCenter, previousPageBorderBoxCenter);
  var cautious = speculativelyIncrease({
    impact: impact,
    viewport: viewport,
    destination: destination,
    draggables: draggables,
    maxScrollChange: distance,
    onLift: onLift
  });
  return {
    clientSelection: previousClientSelection,
    impact: cautious,
    scrollJumpRequest: distance
  };
});

var getKnownActive = function getKnownActive(droppable) {
  var rect = droppable.subject.active;
  !rect ?  false ? invariant(false, 'Cannot get clipped area from droppable') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  return rect;
};

var getBestCrossAxisDroppable = (function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      pageBorderBoxCenter = _ref.pageBorderBoxCenter,
      source = _ref.source,
      droppables = _ref.droppables,
      viewport = _ref.viewport;
  var active = source.subject.active;

  if (!active) {
    return null;
  }

  var axis = source.axis;
  var isBetweenSourceClipped = isWithin(active[axis.start], active[axis.end]);
  var candidates = toDroppableList(droppables).filter(function (droppable) {
    return droppable !== source;
  }).filter(function (droppable) {
    return droppable.isEnabled;
  }).filter(function (droppable) {
    return Boolean(droppable.subject.active);
  }).filter(function (droppable) {
    return isPartiallyVisibleThroughFrame(viewport.frame)(getKnownActive(droppable));
  }).filter(function (droppable) {
    var activeOfTarget = getKnownActive(droppable);

    if (isMovingForward) {
      return active[axis.crossAxisEnd] < activeOfTarget[axis.crossAxisEnd];
    }

    return activeOfTarget[axis.crossAxisStart] < active[axis.crossAxisStart];
  }).filter(function (droppable) {
    var activeOfTarget = getKnownActive(droppable);
    var isBetweenDestinationClipped = isWithin(activeOfTarget[axis.start], activeOfTarget[axis.end]);
    return isBetweenSourceClipped(activeOfTarget[axis.start]) || isBetweenSourceClipped(activeOfTarget[axis.end]) || isBetweenDestinationClipped(active[axis.start]) || isBetweenDestinationClipped(active[axis.end]);
  }).sort(function (a, b) {
    var first = getKnownActive(a)[axis.crossAxisStart];
    var second = getKnownActive(b)[axis.crossAxisStart];

    if (isMovingForward) {
      return first - second;
    }

    return second - first;
  }).filter(function (droppable, index, array) {
    return getKnownActive(droppable)[axis.crossAxisStart] === getKnownActive(array[0])[axis.crossAxisStart];
  });

  if (!candidates.length) {
    return null;
  }

  if (candidates.length === 1) {
    return candidates[0];
  }

  var contains = candidates.filter(function (droppable) {
    var isWithinDroppable = isWithin(getKnownActive(droppable)[axis.start], getKnownActive(droppable)[axis.end]);
    return isWithinDroppable(pageBorderBoxCenter[axis.line]);
  });

  if (contains.length === 1) {
    return contains[0];
  }

  if (contains.length > 1) {
    return contains.sort(function (a, b) {
      return getKnownActive(a)[axis.start] - getKnownActive(b)[axis.start];
    })[0];
  }

  return candidates.sort(function (a, b) {
    var first = closest(pageBorderBoxCenter, getCorners(getKnownActive(a)));
    var second = closest(pageBorderBoxCenter, getCorners(getKnownActive(b)));

    if (first !== second) {
      return first - second;
    }

    return getKnownActive(a)[axis.start] - getKnownActive(b)[axis.start];
  })[0];
});

var getCurrentPageBorderBoxCenter = function getCurrentPageBorderBoxCenter(draggable, onLift) {
  var original = draggable.page.borderBox.center;
  return didStartDisplaced(draggable.descriptor.id, onLift) ? subtract(original, onLift.displacedBy.point) : original;
};
var getCurrentPageBorderBox = function getCurrentPageBorderBox(draggable, onLift) {
  var original = draggable.page.borderBox;
  return didStartDisplaced(draggable.descriptor.id, onLift) ? offsetByPosition(original, negate(onLift.displacedBy.point)) : original;
};

var getClosestDraggable = (function (_ref) {
  var pageBorderBoxCenter = _ref.pageBorderBoxCenter,
      viewport = _ref.viewport,
      destination = _ref.destination,
      insideDestination = _ref.insideDestination,
      onLift = _ref.onLift;
  var sorted = insideDestination.filter(function (draggable) {
    return isTotallyVisible({
      target: getCurrentPageBorderBox(draggable, onLift),
      destination: destination,
      viewport: viewport.frame,
      withDroppableDisplacement: true
    });
  }).sort(function (a, b) {
    var distanceToA = distance(pageBorderBoxCenter, withDroppableDisplacement(destination, getCurrentPageBorderBoxCenter(a, onLift)));
    var distanceToB = distance(pageBorderBoxCenter, withDroppableDisplacement(destination, getCurrentPageBorderBoxCenter(b, onLift)));

    if (distanceToA < distanceToB) {
      return -1;
    }

    if (distanceToB < distanceToA) {
      return 1;
    }

    return a.descriptor.index - b.descriptor.index;
  });
  return sorted[0] || null;
});

var moveToNewDroppable = (function (_ref) {
  var previousPageBorderBoxCenter = _ref.previousPageBorderBoxCenter,
      moveRelativeTo = _ref.moveRelativeTo,
      insideDestination = _ref.insideDestination,
      draggable = _ref.draggable,
      draggables = _ref.draggables,
      destination = _ref.destination,
      previousImpact = _ref.previousImpact,
      viewport = _ref.viewport,
      onLift = _ref.onLift;

  if (!moveRelativeTo) {
    if (insideDestination.length) {
      return null;
    }

    var proposed = {
      movement: noMovement,
      destination: {
        droppableId: destination.descriptor.id,
        index: 0
      },
      merge: null
    };
    var proposedPageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
      impact: proposed,
      draggable: draggable,
      droppable: destination,
      draggables: draggables,
      onLift: onLift
    });
    var withPlaceholder = isHomeOf(draggable, destination) ? destination : addPlaceholder(destination, draggable, draggables);
    var isVisibleInNewLocation = isTotallyVisibleInNewLocation({
      draggable: draggable,
      destination: withPlaceholder,
      newPageBorderBoxCenter: proposedPageBorderBoxCenter,
      viewport: viewport.frame,
      withDroppableDisplacement: false,
      onlyOnMainAxis: true
    });
    return isVisibleInNewLocation ? proposed : null;
  }

  var isGoingBeforeTarget = Boolean(previousPageBorderBoxCenter[destination.axis.line] < moveRelativeTo.page.borderBox.center[destination.axis.line]);
  var targetIndex = insideDestination.indexOf(moveRelativeTo);
  !(targetIndex !== -1) ?  false ? invariant(false, 'Cannot find target in list') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;

  var proposedIndex = function () {
    if (moveRelativeTo.descriptor.id === draggable.descriptor.id) {
      return targetIndex;
    }

    if (isGoingBeforeTarget) {
      return targetIndex;
    }

    return targetIndex + 1;
  }();

  var displaced = removeDraggableFromList(draggable, insideDestination).slice(proposedIndex).map(function (dimension) {
    return getDisplacement({
      draggable: dimension,
      destination: destination,
      viewport: viewport.frame,
      previousImpact: previousImpact,
      onLift: onLift
    });
  });
  var displacedBy = getDisplacedBy(destination.axis, draggable.displaceBy);
  var impact = {
    movement: {
      displacedBy: displacedBy,
      displaced: displaced,
      map: getDisplacementMap(displaced)
    },
    destination: {
      droppableId: destination.descriptor.id,
      index: proposedIndex
    },
    merge: null
  };
  return impact;
});

var moveCrossAxis = (function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      previousPageBorderBoxCenter = _ref.previousPageBorderBoxCenter,
      draggable = _ref.draggable,
      isOver = _ref.isOver,
      draggables = _ref.draggables,
      droppables = _ref.droppables,
      previousImpact = _ref.previousImpact,
      viewport = _ref.viewport,
      onLift = _ref.onLift;
  var destination = getBestCrossAxisDroppable({
    isMovingForward: isMovingForward,
    pageBorderBoxCenter: previousPageBorderBoxCenter,
    source: isOver,
    droppables: droppables,
    viewport: viewport
  });

  if (!destination) {
    return null;
  }

  var insideDestination = getDraggablesInsideDroppable(destination.descriptor.id, draggables);
  var moveRelativeTo = getClosestDraggable({
    pageBorderBoxCenter: previousPageBorderBoxCenter,
    viewport: viewport,
    destination: destination,
    insideDestination: insideDestination,
    onLift: onLift
  });
  var impact = moveToNewDroppable({
    previousPageBorderBoxCenter: previousPageBorderBoxCenter,
    destination: destination,
    draggable: draggable,
    draggables: draggables,
    moveRelativeTo: moveRelativeTo,
    insideDestination: insideDestination,
    previousImpact: previousImpact,
    viewport: viewport,
    onLift: onLift
  });

  if (!impact) {
    return null;
  }

  var pageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
    impact: impact,
    draggable: draggable,
    droppable: destination,
    draggables: draggables,
    onLift: onLift
  });
  var clientSelection = getClientFromPageBorderBoxCenter({
    pageBorderBoxCenter: pageBorderBoxCenter,
    draggable: draggable,
    viewport: viewport
  });
  return {
    clientSelection: clientSelection,
    impact: impact,
    scrollJumpRequest: null
  };
});

var getDroppableOver$1 = function getDroppableOver(impact, droppables) {
  var id = whatIsDraggedOver(impact);
  return id ? droppables[id] : null;
};

var moveInDirection = (function (_ref) {
  var state = _ref.state,
      type = _ref.type;
  var isActuallyOver = getDroppableOver$1(state.impact, state.dimensions.droppables);
  var isMainAxisMovementAllowed = Boolean(isActuallyOver);
  var home = state.dimensions.droppables[state.critical.droppable.id];
  var isOver = isActuallyOver || home;
  var direction = isOver.axis.direction;
  var isMovingOnMainAxis = direction === 'vertical' && (type === 'MOVE_UP' || type === 'MOVE_DOWN') || direction === 'horizontal' && (type === 'MOVE_LEFT' || type === 'MOVE_RIGHT');

  if (isMovingOnMainAxis && !isMainAxisMovementAllowed) {
    return null;
  }

  var isMovingForward = type === 'MOVE_DOWN' || type === 'MOVE_RIGHT';
  var draggable = state.dimensions.draggables[state.critical.draggable.id];
  var previousPageBorderBoxCenter = state.current.page.borderBoxCenter;
  var _state$dimensions = state.dimensions,
      draggables = _state$dimensions.draggables,
      droppables = _state$dimensions.droppables;
  return isMovingOnMainAxis ? moveToNextPlace({
    isMovingForward: isMovingForward,
    previousPageBorderBoxCenter: previousPageBorderBoxCenter,
    draggable: draggable,
    destination: isOver,
    draggables: draggables,
    viewport: state.viewport,
    previousClientSelection: state.current.client.selection,
    previousImpact: state.impact,
    onLift: state.onLift
  }) : moveCrossAxis({
    isMovingForward: isMovingForward,
    previousPageBorderBoxCenter: previousPageBorderBoxCenter,
    draggable: draggable,
    isOver: isOver,
    draggables: draggables,
    droppables: droppables,
    previousImpact: state.impact,
    viewport: state.viewport,
    onLift: state.onLift
  });
});

function isMovementAllowed(state) {
  return state.phase === 'DRAGGING' || state.phase === 'COLLECTING';
}

var getVertical = function getVertical(previous, diff) {
  if (diff === 0) {
    return previous;
  }

  return diff > 0 ? 'down' : 'up';
};

var getHorizontal = function getHorizontal(previous, diff) {
  if (diff === 0) {
    return previous;
  }

  return diff > 0 ? 'right' : 'left';
};

var getUserDirection = (function (previous, oldPageBorderBoxCenter, newPageBorderBoxCenter) {
  var diff = subtract(newPageBorderBoxCenter, oldPageBorderBoxCenter);
  return {
    horizontal: getHorizontal(previous.horizontal, diff.x),
    vertical: getVertical(previous.vertical, diff.y)
  };
});

var update = (function (_ref) {
  var state = _ref.state,
      forcedClientSelection = _ref.clientSelection,
      forcedDimensions = _ref.dimensions,
      forcedViewport = _ref.viewport,
      forcedImpact = _ref.impact,
      scrollJumpRequest = _ref.scrollJumpRequest;
  var viewport = forcedViewport || state.viewport;
  var currentWindowScroll = viewport.scroll.current;
  var dimensions = forcedDimensions || state.dimensions;
  var clientSelection = forcedClientSelection || state.current.client.selection;
  var offset = subtract(clientSelection, state.initial.client.selection);
  var client = {
    offset: offset,
    selection: clientSelection,
    borderBoxCenter: add(state.initial.client.borderBoxCenter, offset)
  };
  var page = {
    selection: add(client.selection, currentWindowScroll),
    borderBoxCenter: add(client.borderBoxCenter, currentWindowScroll)
  };
  var current = {
    client: client,
    page: page
  };
  var userDirection = getUserDirection(state.userDirection, state.current.page.borderBoxCenter, current.page.borderBoxCenter);

  if (state.phase === 'COLLECTING') {
    return Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({
      phase: 'COLLECTING'
    }, state, {
      dimensions: dimensions,
      viewport: viewport,
      current: current,
      userDirection: userDirection
    });
  }

  var draggable = dimensions.draggables[state.critical.draggable.id];
  var newImpact = forcedImpact || getDragImpact({
    pageBorderBoxCenter: page.borderBoxCenter,
    draggable: draggable,
    draggables: dimensions.draggables,
    droppables: dimensions.droppables,
    previousImpact: state.impact,
    viewport: viewport,
    userDirection: userDirection,
    onLift: state.onLift
  });
  var withUpdatedPlaceholders = recomputePlaceholders({
    draggable: draggable,
    impact: newImpact,
    previousImpact: state.impact,
    draggables: dimensions.draggables,
    droppables: dimensions.droppables
  });

  var result = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, state, {
    current: current,
    userDirection: userDirection,
    dimensions: {
      draggables: dimensions.draggables,
      droppables: withUpdatedPlaceholders
    },
    impact: newImpact,
    viewport: viewport,
    scrollJumpRequest: scrollJumpRequest || null,
    forceShouldAnimate: scrollJumpRequest ? false : null
  });

  return result;
});

var recompute = (function (_ref) {
  var impact = _ref.impact,
      viewport = _ref.viewport,
      destination = _ref.destination,
      draggables = _ref.draggables,
      onLift = _ref.onLift,
      forceShouldAnimate = _ref.forceShouldAnimate;
  var updated = impact.movement.displaced.map(function (entry) {
    return getDisplacement({
      draggable: draggables[entry.draggableId],
      destination: destination,
      previousImpact: impact,
      viewport: viewport.frame,
      onLift: onLift,
      forceShouldAnimate: forceShouldAnimate
    });
  });
  return withNewDisplacement(impact, updated);
});

var getClientBorderBoxCenter = (function (_ref) {
  var impact = _ref.impact,
      draggable = _ref.draggable,
      droppable = _ref.droppable,
      draggables = _ref.draggables,
      viewport = _ref.viewport,
      onLift = _ref.onLift;
  var pageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
    impact: impact,
    draggable: draggable,
    draggables: draggables,
    droppable: droppable,
    onLift: onLift
  });
  return getClientFromPageBorderBoxCenter({
    pageBorderBoxCenter: pageBorderBoxCenter,
    draggable: draggable,
    viewport: viewport
  });
});

var refreshSnap = (function (_ref) {
  var state = _ref.state,
      forcedDimensions = _ref.dimensions,
      forcedViewport = _ref.viewport;
  !(state.movementMode === 'SNAP') ?  false ? invariant(false) : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  var needsVisibilityCheck = state.impact;
  var viewport = forcedViewport || state.viewport;
  var dimensions = forcedDimensions || state.dimensions;
  var draggables = dimensions.draggables,
      droppables = dimensions.droppables;
  var draggable = draggables[state.critical.draggable.id];
  var isOver = whatIsDraggedOver(needsVisibilityCheck);
  !isOver ?  false ? invariant(false, 'Must be over a destination in SNAP movement mode') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  var destination = droppables[isOver];
  var impact = recompute({
    impact: needsVisibilityCheck,
    viewport: viewport,
    destination: destination,
    draggables: draggables,
    onLift: state.onLift
  });
  var clientSelection = getClientBorderBoxCenter({
    impact: impact,
    draggable: draggable,
    droppable: destination,
    draggables: draggables,
    viewport: viewport,
    onLift: state.onLift
  });
  return update({
    impact: impact,
    clientSelection: clientSelection,
    state: state,
    dimensions: dimensions,
    viewport: viewport
  });
});

var patchDimensionMap = (function (dimensions, updated) {
  return {
    draggables: dimensions.draggables,
    droppables: patchDroppableMap(dimensions.droppables, updated)
  };
});

var isSnapping = function isSnapping(state) {
  return state.movementMode === 'SNAP';
};

var postDroppableChange = function postDroppableChange(state, updated, isEnabledChanging) {
  var dimensions = patchDimensionMap(state.dimensions, updated);

  if (!isSnapping(state) || isEnabledChanging) {
    return update({
      state: state,
      dimensions: dimensions
    });
  }

  return refreshSnap({
    state: state,
    dimensions: dimensions
  });
};

var idle = {
  phase: 'IDLE',
  completed: null,
  shouldFlush: false
};
var reducer = (function (state, action) {
  if (state === void 0) {
    state = idle;
  }

  if (action.type === 'CLEAN') {
    return idle;
  }

  if (action.type === 'INITIAL_PUBLISH') {
    !(state.phase === 'IDLE') ?  false ? invariant(false, 'INITIAL_PUBLISH must come after a IDLE phase') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    var _action$payload = action.payload,
        critical = _action$payload.critical,
        clientSelection = _action$payload.clientSelection,
        viewport = _action$payload.viewport,
        dimensions = _action$payload.dimensions,
        movementMode = _action$payload.movementMode;
    var draggable = dimensions.draggables[critical.draggable.id];
    var home = dimensions.droppables[critical.droppable.id];
    var client = {
      selection: clientSelection,
      borderBoxCenter: draggable.client.borderBox.center,
      offset: origin
    };
    var initial = {
      client: client,
      page: {
        selection: add(client.selection, viewport.scroll.initial),
        borderBoxCenter: add(client.selection, viewport.scroll.initial)
      }
    };
    var isWindowScrollAllowed = toDroppableList(dimensions.droppables).every(function (item) {
      return !item.isFixedOnPage;
    });

    var _getHomeOnLift = getHomeOnLift({
      draggable: draggable,
      home: home,
      draggables: dimensions.draggables,
      viewport: viewport
    }),
        impact = _getHomeOnLift.impact,
        onLift = _getHomeOnLift.onLift;

    var result = {
      phase: 'DRAGGING',
      isDragging: true,
      critical: critical,
      movementMode: movementMode,
      dimensions: dimensions,
      initial: initial,
      current: initial,
      isWindowScrollAllowed: isWindowScrollAllowed,
      impact: impact,
      onLift: onLift,
      onLiftImpact: impact,
      viewport: viewport,
      userDirection: forward,
      scrollJumpRequest: null,
      forceShouldAnimate: null
    };
    return result;
  }

  if (action.type === 'COLLECTION_STARTING') {
    var _extends2;

    if (state.phase === 'COLLECTING' || state.phase === 'DROP_PENDING') {
      return state;
    }

    !(state.phase === 'DRAGGING') ?  false ? invariant(false, "Collection cannot start from phase " + state.phase) : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;

    var _result = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({
      phase: 'COLLECTING'
    }, state, (_extends2 = {}, _extends2["phase"] = 'COLLECTING', _extends2));

    return _result;
  }

  if (action.type === 'PUBLISH_WHILE_DRAGGING') {
    !(state.phase === 'COLLECTING' || state.phase === 'DROP_PENDING') ?  false ? invariant(false, "Unexpected " + action.type + " received in phase " + state.phase) : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    return publishWhileDragging({
      state: state,
      published: action.payload
    });
  }

  if (action.type === 'MOVE') {
    if (state.phase === 'DROP_PENDING') {
      return state;
    }

    !isMovementAllowed(state) ?  false ? invariant(false, action.type + " not permitted in phase " + state.phase) : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    var _clientSelection = action.payload.client;

    if (isEqual(_clientSelection, state.current.client.selection)) {
      return state;
    }

    return update({
      state: state,
      clientSelection: _clientSelection,
      impact: isSnapping(state) ? state.impact : null
    });
  }

  if (action.type === 'UPDATE_DROPPABLE_SCROLL') {
    if (state.phase === 'DROP_PENDING') {
      return state;
    }

    if (state.phase === 'COLLECTING') {
      return state;
    }

    !isMovementAllowed(state) ?  false ? invariant(false, action.type + " not permitted in phase " + state.phase) : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    var _action$payload2 = action.payload,
        id = _action$payload2.id,
        offset = _action$payload2.offset;
    var target = state.dimensions.droppables[id];

    if (!target) {
      return state;
    }

    var scrolled = scrollDroppable(target, offset);
    return postDroppableChange(state, scrolled, false);
  }

  if (action.type === 'UPDATE_DROPPABLE_IS_ENABLED') {
    if (state.phase === 'DROP_PENDING') {
      return state;
    }

    !isMovementAllowed(state) ?  false ? invariant(false, "Attempting to move in an unsupported phase " + state.phase) : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    var _action$payload3 = action.payload,
        _id = _action$payload3.id,
        isEnabled = _action$payload3.isEnabled;
    var _target = state.dimensions.droppables[_id];
    !_target ?  false ? invariant(false, "Cannot find Droppable[id: " + _id + "] to toggle its enabled state") : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    !(_target.isEnabled !== isEnabled) ?  false ? invariant(false, "Trying to set droppable isEnabled to " + String(isEnabled) + "\n      but it is already " + String(_target.isEnabled)) : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;

    var updated = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, _target, {
      isEnabled: isEnabled
    });

    return postDroppableChange(state, updated, true);
  }

  if (action.type === 'UPDATE_DROPPABLE_IS_COMBINE_ENABLED') {
    if (state.phase === 'DROP_PENDING') {
      return state;
    }

    !isMovementAllowed(state) ?  false ? invariant(false, "Attempting to move in an unsupported phase " + state.phase) : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    var _action$payload4 = action.payload,
        _id2 = _action$payload4.id,
        isCombineEnabled = _action$payload4.isCombineEnabled;
    var _target2 = state.dimensions.droppables[_id2];
    !_target2 ?  false ? invariant(false, "Cannot find Droppable[id: " + _id2 + "] to toggle its isCombineEnabled state") : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    !(_target2.isCombineEnabled !== isCombineEnabled) ?  false ? invariant(false, "Trying to set droppable isCombineEnabled to " + String(isCombineEnabled) + "\n      but it is already " + String(_target2.isCombineEnabled)) : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;

    var _updated = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, _target2, {
      isCombineEnabled: isCombineEnabled
    });

    return postDroppableChange(state, _updated, true);
  }

  if (action.type === 'MOVE_BY_WINDOW_SCROLL') {
    if (state.phase === 'DROP_PENDING' || state.phase === 'DROP_ANIMATING') {
      return state;
    }

    !isMovementAllowed(state) ?  false ? invariant(false, "Cannot move by window in phase " + state.phase) : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    !state.isWindowScrollAllowed ?  false ? invariant(false, 'Window scrolling is currently not supported for fixed lists. Aborting drag') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    var newScroll = action.payload.newScroll;

    if (isEqual(state.viewport.scroll.current, newScroll)) {
      return state;
    }

    var _viewport = scrollViewport(state.viewport, newScroll);

    if (isSnapping(state)) {
      return refreshSnap({
        state: state,
        viewport: _viewport
      });
    }

    return update({
      state: state,
      viewport: _viewport
    });
  }

  if (action.type === 'UPDATE_VIEWPORT_MAX_SCROLL') {
    if (!isMovementAllowed(state)) {
      return state;
    }

    var maxScroll = action.payload.maxScroll;

    if (isEqual(maxScroll, state.viewport.scroll.max)) {
      return state;
    }

    var withMaxScroll = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, state.viewport, {
      scroll: Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, state.viewport.scroll, {
        max: maxScroll
      })
    });

    return Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({
      phase: 'DRAGGING'
    }, state, {
      viewport: withMaxScroll
    });
  }

  if (action.type === 'MOVE_UP' || action.type === 'MOVE_DOWN' || action.type === 'MOVE_LEFT' || action.type === 'MOVE_RIGHT') {
    if (state.phase === 'COLLECTING' || state.phase === 'DROP_PENDING') {
      return state;
    }

    !(state.phase === 'DRAGGING') ?  false ? invariant(false, action.type + " received while not in DRAGGING phase") : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;

    var _result2 = moveInDirection({
      state: state,
      type: action.type
    });

    if (!_result2) {
      return state;
    }

    return update({
      state: state,
      impact: _result2.impact,
      clientSelection: _result2.clientSelection,
      scrollJumpRequest: _result2.scrollJumpRequest
    });
  }

  if (action.type === 'DROP_PENDING') {
    var _extends3;

    var reason = action.payload.reason;
    !(state.phase === 'COLLECTING') ?  false ? invariant(false, 'Can only move into the DROP_PENDING phase from the COLLECTING phase') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;

    var newState = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({
      phase: 'DROP_PENDING'
    }, state, (_extends3 = {}, _extends3["phase"] = 'DROP_PENDING', _extends3.isWaiting = true, _extends3.reason = reason, _extends3));

    return newState;
  }

  if (action.type === 'DROP_ANIMATE') {
    var _action$payload5 = action.payload,
        completed = _action$payload5.completed,
        dropDuration = _action$payload5.dropDuration,
        newHomeClientOffset = _action$payload5.newHomeClientOffset;
    !(state.phase === 'DRAGGING' || state.phase === 'DROP_PENDING') ?  false ? invariant(false, "Cannot animate drop from phase " + state.phase) : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    var _result3 = {
      phase: 'DROP_ANIMATING',
      dimensions: state.dimensions,
      completed: completed,
      dropDuration: dropDuration,
      newHomeClientOffset: newHomeClientOffset
    };
    return _result3;
  }

  if (action.type === 'DROP_COMPLETE') {
    var _action$payload6 = action.payload,
        _completed = _action$payload6.completed,
        shouldFlush = _action$payload6.shouldFlush;
    return {
      phase: 'IDLE',
      completed: _completed,
      shouldFlush: shouldFlush
    };
  }

  return state;
});

var lift = function lift(args) {
  return {
    type: 'LIFT',
    payload: args
  };
};
var initialPublish = function initialPublish(args) {
  return {
    type: 'INITIAL_PUBLISH',
    payload: args
  };
};
var publishWhileDragging$1 = function publishWhileDragging(args) {
  return {
    type: 'PUBLISH_WHILE_DRAGGING',
    payload: args
  };
};
var collectionStarting = function collectionStarting() {
  return {
    type: 'COLLECTION_STARTING',
    payload: null
  };
};
var updateDroppableScroll = function updateDroppableScroll(args) {
  return {
    type: 'UPDATE_DROPPABLE_SCROLL',
    payload: args
  };
};
var updateDroppableIsEnabled = function updateDroppableIsEnabled(args) {
  return {
    type: 'UPDATE_DROPPABLE_IS_ENABLED',
    payload: args
  };
};
var updateDroppableIsCombineEnabled = function updateDroppableIsCombineEnabled(args) {
  return {
    type: 'UPDATE_DROPPABLE_IS_COMBINE_ENABLED',
    payload: args
  };
};
var move = function move(args) {
  return {
    type: 'MOVE',
    payload: args
  };
};
var moveByWindowScroll = function moveByWindowScroll(args) {
  return {
    type: 'MOVE_BY_WINDOW_SCROLL',
    payload: args
  };
};
var updateViewportMaxScroll = function updateViewportMaxScroll(args) {
  return {
    type: 'UPDATE_VIEWPORT_MAX_SCROLL',
    payload: args
  };
};
var moveUp = function moveUp() {
  return {
    type: 'MOVE_UP',
    payload: null
  };
};
var moveDown = function moveDown() {
  return {
    type: 'MOVE_DOWN',
    payload: null
  };
};
var moveRight = function moveRight() {
  return {
    type: 'MOVE_RIGHT',
    payload: null
  };
};
var moveLeft = function moveLeft() {
  return {
    type: 'MOVE_LEFT',
    payload: null
  };
};
var clean = function clean() {
  return {
    type: 'CLEAN',
    payload: null
  };
};
var animateDrop = function animateDrop(args) {
  return {
    type: 'DROP_ANIMATE',
    payload: args
  };
};
var completeDrop = function completeDrop(args) {
  return {
    type: 'DROP_COMPLETE',
    payload: args
  };
};
var drop = function drop(args) {
  return {
    type: 'DROP',
    payload: args
  };
};
var dropPending = function dropPending(args) {
  return {
    type: 'DROP_PENDING',
    payload: args
  };
};
var dropAnimationFinished = function dropAnimationFinished() {
  return {
    type: 'DROP_ANIMATION_FINISHED',
    payload: null
  };
};

var lift$1 = (function (getMarshal) {
  return function (_ref) {
    var getState = _ref.getState,
        dispatch = _ref.dispatch;
    return function (next) {
      return function (action) {
        if (action.type !== 'LIFT') {
          next(action);
          return;
        }

        var marshal = getMarshal();
        var _action$payload = action.payload,
            id = _action$payload.id,
            clientSelection = _action$payload.clientSelection,
            movementMode = _action$payload.movementMode;
        var initial = getState();

        if (initial.phase === 'DROP_ANIMATING') {
          dispatch(completeDrop({
            completed: initial.completed,
            shouldFlush: true
          }));
        }

        !(getState().phase === 'IDLE') ?  false ? invariant(false, 'Incorrect phase to start a drag') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
        var scrollOptions = {
          shouldPublishImmediately: movementMode === 'SNAP'
        };
        var request = {
          draggableId: id,
          scrollOptions: scrollOptions
        };

        var _marshal$startPublish = marshal.startPublishing(request),
            critical = _marshal$startPublish.critical,
            dimensions = _marshal$startPublish.dimensions,
            viewport = _marshal$startPublish.viewport;

        dispatch(initialPublish({
          critical: critical,
          dimensions: dimensions,
          clientSelection: clientSelection,
          movementMode: movementMode,
          viewport: viewport
        }));
      };
    };
  };
});

var style = (function (marshal) {
  return function () {
    return function (next) {
      return function (action) {
        if (action.type === 'INITIAL_PUBLISH') {
          marshal.dragging();
        }

        if (action.type === 'DROP_ANIMATE') {
          marshal.dropping(action.payload.completed.result.reason);
        }

        if (action.type === 'CLEAN' || action.type === 'DROP_COMPLETE') {
          marshal.resting();
        }

        next(action);
      };
    };
  };
});

var curves = {
  outOfTheWay: 'cubic-bezier(0.2, 0, 0, 1)',
  drop: 'cubic-bezier(.2,1,.1,1)'
};
var combine = {
  opacity: {
    drop: 0,
    combining: 0.7
  },
  scale: {
    drop: 0.75
  }
};
var timings = {
  outOfTheWay: 0.2,
  minDropTime: 0.33,
  maxDropTime: 0.55
};
var outOfTheWayTiming = timings.outOfTheWay + "s " + curves.outOfTheWay;
var transitions = {
  fluid: "opacity " + outOfTheWayTiming,
  snap: "transform " + outOfTheWayTiming + ", opacity " + outOfTheWayTiming,
  drop: function drop(duration) {
    var timing = duration + "s " + curves.drop;
    return "transform " + timing + ", opacity " + timing;
  },
  outOfTheWay: "transform " + outOfTheWayTiming,
  placeholder: "height " + outOfTheWayTiming + ", width " + outOfTheWayTiming + ", margin " + outOfTheWayTiming
};

var moveTo = function moveTo(offset) {
  return isEqual(offset, origin) ? null : "translate(" + offset.x + "px, " + offset.y + "px)";
};

var transforms = {
  moveTo: moveTo,
  drop: function drop(offset, isCombining) {
    var translate = moveTo(offset);

    if (!translate) {
      return null;
    }

    if (!isCombining) {
      return translate;
    }

    return translate + " scale(" + combine.scale.drop + ")";
  }
};

var minDropTime = timings.minDropTime,
    maxDropTime = timings.maxDropTime;
var dropTimeRange = maxDropTime - minDropTime;
var maxDropTimeAtDistance = 1500;
var cancelDropModifier = 0.6;
var getDropDuration = (function (_ref) {
  var current = _ref.current,
      destination = _ref.destination,
      reason = _ref.reason;
  var distance$1 = distance(current, destination);

  if (distance$1 <= 0) {
    return minDropTime;
  }

  if (distance$1 >= maxDropTimeAtDistance) {
    return maxDropTime;
  }

  var percentage = distance$1 / maxDropTimeAtDistance;
  var duration = minDropTime + dropTimeRange * percentage;
  var withDuration = reason === 'CANCEL' ? duration * cancelDropModifier : duration;
  return Number(withDuration.toFixed(2));
});

var getNewHomeClientOffset = (function (_ref) {
  var impact = _ref.impact,
      draggable = _ref.draggable,
      dimensions = _ref.dimensions,
      viewport = _ref.viewport,
      onLift = _ref.onLift;
  var draggables = dimensions.draggables,
      droppables = dimensions.droppables;
  var droppableId = whatIsDraggedOver(impact);
  var destination = droppableId ? droppables[droppableId] : null;
  var home = droppables[draggable.descriptor.droppableId];
  var newClientCenter = getClientBorderBoxCenter({
    impact: impact,
    draggable: draggable,
    draggables: draggables,
    onLift: onLift,
    droppable: destination || home,
    viewport: viewport
  });
  var offset = subtract(newClientCenter, draggable.client.borderBox.center);
  var merge = impact.merge;

  if (merge && didStartDisplaced(merge.combine.draggableId, onLift)) {
    return subtract(offset, onLift.displacedBy.point);
  }

  return offset;
});

var getDropImpact = (function (_ref) {
  var reason = _ref.reason,
      lastImpact = _ref.lastImpact,
      home = _ref.home,
      viewport = _ref.viewport,
      draggables = _ref.draggables,
      onLiftImpact = _ref.onLiftImpact,
      onLift = _ref.onLift;
  var didDropInsideDroppable = reason === 'DROP' && Boolean(whatIsDraggedOver(lastImpact));

  if (!didDropInsideDroppable) {
    var impact = recompute({
      impact: onLiftImpact,
      destination: home,
      viewport: viewport,
      draggables: draggables,
      onLift: onLift,
      forceShouldAnimate: true
    });
    return {
      impact: impact,
      didDropInsideDroppable: didDropInsideDroppable
    };
  }

  if (lastImpact.destination) {
    return {
      impact: lastImpact,
      didDropInsideDroppable: didDropInsideDroppable
    };
  }

  var withoutMovement = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, lastImpact, {
    movement: noMovement
  });

  return {
    impact: withoutMovement,
    didDropInsideDroppable: didDropInsideDroppable
  };
});

var drop$1 = (function (_ref) {
  var getState = _ref.getState,
      dispatch = _ref.dispatch;
  return function (next) {
    return function (action) {
      if (action.type !== 'DROP') {
        next(action);
        return;
      }

      var state = getState();
      var reason = action.payload.reason;

      if (state.phase === 'COLLECTING') {
        dispatch(dropPending({
          reason: reason
        }));
        return;
      }

      if (state.phase === 'IDLE') {
        return;
      }

      var isWaitingForDrop = state.phase === 'DROP_PENDING' && state.isWaiting;
      !!isWaitingForDrop ?  false ? invariant(false, 'A DROP action occurred while DROP_PENDING and still waiting') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
      !(state.phase === 'DRAGGING' || state.phase === 'DROP_PENDING') ?  false ? invariant(false, "Cannot drop in phase: " + state.phase) : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
      var critical = state.critical;
      var dimensions = state.dimensions;

      var _getDropImpact = getDropImpact({
        reason: reason,
        lastImpact: state.impact,
        onLift: state.onLift,
        onLiftImpact: state.onLiftImpact,
        home: state.dimensions.droppables[state.critical.droppable.id],
        viewport: state.viewport,
        draggables: state.dimensions.draggables
      }),
          impact = _getDropImpact.impact,
          didDropInsideDroppable = _getDropImpact.didDropInsideDroppable;

      var draggable = dimensions.draggables[state.critical.draggable.id];
      var destination = didDropInsideDroppable ? impact.destination : null;
      var combine = didDropInsideDroppable && impact.merge ? impact.merge.combine : null;
      var source = {
        index: critical.draggable.index,
        droppableId: critical.droppable.id
      };
      var result = {
        draggableId: draggable.descriptor.id,
        type: draggable.descriptor.type,
        source: source,
        reason: reason,
        mode: state.movementMode,
        destination: destination,
        combine: combine
      };
      var newHomeClientOffset = getNewHomeClientOffset({
        impact: impact,
        draggable: draggable,
        dimensions: dimensions,
        viewport: state.viewport,
        onLift: state.onLift
      });
      var completed = {
        critical: state.critical,
        result: result,
        impact: impact
      };
      var isAnimationRequired = !isEqual(state.current.client.offset, newHomeClientOffset) || Boolean(result.combine);

      if (!isAnimationRequired) {
        dispatch(completeDrop({
          completed: completed,
          shouldFlush: false
        }));
        return;
      }

      var dropDuration = getDropDuration({
        current: state.current.client.offset,
        destination: newHomeClientOffset,
        reason: reason
      });
      var args = {
        newHomeClientOffset: newHomeClientOffset,
        dropDuration: dropDuration,
        completed: completed
      };
      dispatch(animateDrop(args));
    };
  };
});

var position = function position(index) {
  return index + 1;
};

var onDragStart = function onDragStart(start) {
  return "\n  You have lifted an item in position " + position(start.source.index) + ".\n  Use the arrow keys to move, space bar to drop, and escape to cancel.\n";
};

var withLocation = function withLocation(source, destination) {
  var isInHomeList = source.droppableId === destination.droppableId;
  var startPosition = position(source.index);
  var endPosition = position(destination.index);

  if (isInHomeList) {
    return "\n      You have moved the item from position " + startPosition + "\n      to position " + endPosition + "\n    ";
  }

  return "\n    You have moved the item from position " + startPosition + "\n    in list " + source.droppableId + "\n    to list " + destination.droppableId + "\n    in position " + endPosition + "\n  ";
};

var withCombine = function withCombine(id, source, combine) {
  var inHomeList = source.droppableId === combine.droppableId;

  if (inHomeList) {
    return "\n      The item " + id + "\n      has been combined with " + combine.draggableId;
  }

  return "\n      The item " + id + "\n      in list " + source.droppableId + "\n      has been combined with " + combine.draggableId + "\n      in list " + combine.droppableId + "\n    ";
};

var onDragUpdate = function onDragUpdate(update) {
  var location = update.destination;

  if (location) {
    return withLocation(update.source, location);
  }

  var combine = update.combine;

  if (combine) {
    return withCombine(update.draggableId, update.source, combine);
  }

  return 'You are over an area that cannot be dropped on';
};

var returnedToStart = function returnedToStart(source) {
  return "\n  The item has returned to its starting position\n  of " + position(source.index) + "\n";
};

var onDragEnd = function onDragEnd(result) {
  if (result.reason === 'CANCEL') {
    return "\n      Movement cancelled.\n      " + returnedToStart(result.source) + "\n    ";
  }

  var location = result.destination;
  var combine = result.combine;

  if (location) {
    return "\n      You have dropped the item.\n      " + withLocation(result.source, location) + "\n    ";
  }

  if (combine) {
    return "\n      You have dropped the item.\n      " + withCombine(result.draggableId, result.source, combine) + "\n    ";
  }

  return "\n    The item has been dropped while not over a drop area.\n    " + returnedToStart(result.source) + "\n  ";
};

var preset = {
  onDragStart: onDragStart,
  onDragUpdate: onDragUpdate,
  onDragEnd: onDragEnd
};

var isProduction = "production" === 'production';
var spacesAndTabs = /[ \t]{2,}/g;
var lineStartWithSpaces = /^[ \t]*/gm;

var clean$1 = function clean(value) {
  return value.replace(spacesAndTabs, ' ').replace(lineStartWithSpaces, '').trim();
};

var getDevMessage = function getDevMessage(message) {
  return clean$1("\n  %creact-beautiful-dnd\n\n  %c" + clean$1(message) + "\n\n  %c\uD83D\uDC77\u200D This is a development only message. It will be removed in production builds.\n");
};

var getFormattedMessage = function getFormattedMessage(message) {
  return [getDevMessage(message), 'color: #00C584; font-size: 1.2em; font-weight: bold;', 'line-height: 1.5', 'color: #723874;'];
};
var isDisabledFlag = '__react-beautiful-dnd-disable-dev-warnings';
var warning = function warning(message) {
  var _console;

  if (isProduction) {
    return;
  }

  if (typeof window !== 'undefined' && window[isDisabledFlag]) {
    return;
  }

  (_console = console).warn.apply(_console, getFormattedMessage(message));
};

var getExpiringAnnounce = (function (announce) {
  var wasCalled = false;
  var isExpired = false;
  var timeoutId = setTimeout(function () {
    isExpired = true;
  });

  var result = function result(message) {
    if (wasCalled) {
       false ? warning('Announcement already made. Not making a second announcement') : void 0;
      return;
    }

    if (isExpired) {
       false ? warning("\n        Announcements cannot be made asynchronously.\n        Default message has already been announced.\n      ") : void 0;
      return;
    }

    wasCalled = true;
    announce(message);
    clearTimeout(timeoutId);
  };

  result.wasCalled = function () {
    return wasCalled;
  };

  return result;
});

var getAsyncMarshal = (function () {
  var entries = [];

  var execute = function execute(timerId) {
    var index = findIndex(entries, function (item) {
      return item.timerId === timerId;
    });
    !(index !== -1) ?  false ? invariant(false, 'Could not find timer') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;

    var _entries$splice = entries.splice(index, 1),
        entry = _entries$splice[0];

    entry.callback();
  };

  var add = function add(fn) {
    var timerId = setTimeout(function () {
      return execute(timerId);
    });
    var entry = {
      timerId: timerId,
      callback: fn
    };
    entries.push(entry);
  };

  var flush = function flush() {
    if (!entries.length) {
      return;
    }

    var shallow = [].concat(entries);
    entries.length = 0;
    shallow.forEach(function (entry) {
      clearTimeout(entry.timerId);
      entry.callback();
    });
  };

  return {
    add: add,
    flush: flush
  };
});

var areLocationsEqual = function areLocationsEqual(first, second) {
  if (first == null && second == null) {
    return true;
  }

  if (first == null || second == null) {
    return false;
  }

  return first.droppableId === second.droppableId && first.index === second.index;
};
var isCombineEqual = function isCombineEqual(first, second) {
  if (first == null && second == null) {
    return true;
  }

  if (first == null || second == null) {
    return false;
  }

  return first.draggableId === second.draggableId && first.droppableId === second.droppableId;
};
var isCriticalEqual = function isCriticalEqual(first, second) {
  if (first === second) {
    return true;
  }

  var isDraggableEqual = first.draggable.id === second.draggable.id && first.draggable.droppableId === second.draggable.droppableId && first.draggable.type === second.draggable.type && first.draggable.index === second.draggable.index;
  var isDroppableEqual = first.droppable.id === second.droppable.id && first.droppable.type === second.droppable.type;
  return isDraggableEqual && isDroppableEqual;
};

var withTimings = function withTimings(key, fn) {
  start(key);
  fn();
  finish(key);
};

var getDragStart = function getDragStart(critical, mode) {
  return {
    draggableId: critical.draggable.id,
    type: critical.droppable.type,
    source: {
      droppableId: critical.droppable.id,
      index: critical.draggable.index
    },
    mode: mode
  };
};

var execute = function execute(responder, data, announce, getDefaultMessage) {
  if (!responder) {
    announce(getDefaultMessage(data));
    return;
  }

  var willExpire = getExpiringAnnounce(announce);
  var provided = {
    announce: willExpire
  };
  responder(data, provided);

  if (!willExpire.wasCalled()) {
    announce(getDefaultMessage(data));
  }
};

var getPublisher = (function (getResponders, announce) {
  var asyncMarshal = getAsyncMarshal();
  var dragging = null;

  var beforeStart = function beforeStart(critical, mode) {
    !!dragging ?  false ? invariant(false, 'Cannot fire onBeforeDragStart as a drag start has already been published') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    withTimings('onBeforeDragStart', function () {
      var fn = getResponders().onBeforeDragStart;

      if (fn) {
        fn(getDragStart(critical, mode));
      }
    });
  };

  var start = function start(critical, mode) {
    !!dragging ?  false ? invariant(false, 'Cannot fire onBeforeDragStart as a drag start has already been published') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    var data = getDragStart(critical, mode);
    dragging = {
      mode: mode,
      lastCritical: critical,
      lastLocation: data.source,
      lastCombine: null
    };
    asyncMarshal.add(function () {
      withTimings('onDragStart', function () {
        return execute(getResponders().onDragStart, data, announce, preset.onDragStart);
      });
    });
  };

  var update = function update(critical, impact) {
    var location = impact.destination;
    var combine = impact.merge ? impact.merge.combine : null;
    !dragging ?  false ? invariant(false, 'Cannot fire onDragMove when onDragStart has not been called') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    var hasCriticalChanged = !isCriticalEqual(critical, dragging.lastCritical);

    if (hasCriticalChanged) {
      dragging.lastCritical = critical;
    }

    var hasLocationChanged = !areLocationsEqual(dragging.lastLocation, location);

    if (hasLocationChanged) {
      dragging.lastLocation = location;
    }

    var hasGroupingChanged = !isCombineEqual(dragging.lastCombine, combine);

    if (hasGroupingChanged) {
      dragging.lastCombine = combine;
    }

    if (!hasCriticalChanged && !hasLocationChanged && !hasGroupingChanged) {
      return;
    }

    var data = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, getDragStart(critical, dragging.mode), {
      combine: combine,
      destination: location
    });

    asyncMarshal.add(function () {
      withTimings('onDragUpdate', function () {
        return execute(getResponders().onDragUpdate, data, announce, preset.onDragUpdate);
      });
    });
  };

  var flush = function flush() {
    !dragging ?  false ? invariant(false, 'Can only flush responders while dragging') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    asyncMarshal.flush();
  };

  var drop = function drop(result) {
    !dragging ?  false ? invariant(false, 'Cannot fire onDragEnd when there is no matching onDragStart') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    dragging = null;
    withTimings('onDragEnd', function () {
      return execute(getResponders().onDragEnd, result, announce, preset.onDragEnd);
    });
  };

  var abort = function abort() {
    if (!dragging) {
      return;
    }

    var result = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, getDragStart(dragging.lastCritical, dragging.mode), {
      combine: null,
      destination: null,
      reason: 'CANCEL'
    });

    drop(result);
  };

  return {
    beforeStart: beforeStart,
    start: start,
    update: update,
    flush: flush,
    drop: drop,
    abort: abort
  };
});

var responders = (function (getResponders, announce) {
  var publisher = getPublisher(getResponders, announce);
  return function (store) {
    return function (next) {
      return function (action) {
        if (action.type === 'INITIAL_PUBLISH') {
          var critical = action.payload.critical;
          publisher.beforeStart(critical, action.payload.movementMode);
          next(action);
          publisher.start(critical, action.payload.movementMode);
          return;
        }

        if (action.type === 'DROP_COMPLETE') {
          var result = action.payload.completed.result;
          publisher.flush();
          next(action);
          publisher.drop(result);
          return;
        }

        next(action);

        if (action.type === 'CLEAN') {
          publisher.abort();
          return;
        }

        var state = store.getState();

        if (state.phase === 'DRAGGING') {
          publisher.update(state.critical, state.impact);
        }
      };
    };
  };
});

var dropAnimationFinish = (function (store) {
  return function (next) {
    return function (action) {
      if (action.type !== 'DROP_ANIMATION_FINISHED') {
        next(action);
        return;
      }

      var state = store.getState();
      !(state.phase === 'DROP_ANIMATING') ?  false ? invariant(false, 'Cannot finish a drop animating when no drop is occurring') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
      store.dispatch(completeDrop({
        completed: state.completed,
        shouldFlush: false
      }));
    };
  };
});

var dimensionMarshalStopper = (function (getMarshal) {
  return function () {
    return function (next) {
      return function (action) {
        if (action.type === 'DROP_COMPLETE' || action.type === 'CLEAN' || action.type === 'DROP_ANIMATE') {
          var marshal = getMarshal();
          marshal.stopPublishing();
        }

        next(action);
      };
    };
  };
});

var shouldEnd = function shouldEnd(action) {
  return action.type === 'DROP_COMPLETE' || action.type === 'DROP_ANIMATE' || action.type === 'CLEAN';
};

var shouldCancelPending = function shouldCancelPending(action) {
  return action.type === 'COLLECTION_STARTING';
};

var autoScroll = (function (getScroller) {
  return function (store) {
    return function (next) {
      return function (action) {
        if (shouldEnd(action)) {
          getScroller().stop();
          next(action);
          return;
        }

        if (shouldCancelPending(action)) {
          getScroller().cancelPending();
          next(action);
          return;
        }

        if (action.type === 'INITIAL_PUBLISH') {
          next(action);
          var state = store.getState();
          !(state.phase === 'DRAGGING') ?  false ? invariant(false, 'Expected phase to be DRAGGING after INITIAL_PUBLISH') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
          getScroller().start(state);
          return;
        }

        next(action);
        getScroller().scroll(store.getState());
      };
    };
  };
});

var pendingDrop = (function (store) {
  return function (next) {
    return function (action) {
      next(action);

      if (action.type !== 'PUBLISH_WHILE_DRAGGING') {
        return;
      }

      var postActionState = store.getState();

      if (postActionState.phase !== 'DROP_PENDING') {
        return;
      }

      if (postActionState.isWaiting) {
        return;
      }

      store.dispatch(drop({
        reason: postActionState.reason
      }));
    };
  };
});

var composeEnhancers =  false ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : __WEBPACK_IMPORTED_MODULE_3_redux__["d" /* compose */];
var createStore = (function (_ref) {
  var getDimensionMarshal = _ref.getDimensionMarshal,
      styleMarshal = _ref.styleMarshal,
      getResponders = _ref.getResponders,
      announce = _ref.announce,
      getScroller = _ref.getScroller;
  return Object(__WEBPACK_IMPORTED_MODULE_3_redux__["e" /* createStore */])(reducer, composeEnhancers(Object(__WEBPACK_IMPORTED_MODULE_3_redux__["a" /* applyMiddleware */])(style(styleMarshal), dimensionMarshalStopper(getDimensionMarshal), lift$1(getDimensionMarshal), drop$1, dropAnimationFinish, pendingDrop, autoScroll(getScroller), responders(getResponders, announce))));
});

var clean$2 = function clean() {
  return {
    additions: {},
    removals: {},
    modified: {}
  };
};

var timingKey = 'Publish collection from DOM';
var createPublisher = (function (_ref) {
  var getEntries = _ref.getEntries,
      callbacks = _ref.callbacks;

  var advancedUsageWarning = function () {
    if (true) {
      return function () {};
    }

    var hasAnnounced = false;
    return function () {
      if (hasAnnounced) {
        return;
      }

      hasAnnounced = true;
       false ? warning("\n        Advanced usage warning: you are adding or removing a dimension during a drag\n        This an advanced feature.\n\n        More information: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/changes-while-dragging.md\n      ") : void 0;
    };
  }();

  var staging = clean$2();
  var frameId = null;

  var collect = function collect() {
    advancedUsageWarning();

    if (frameId) {
      return;
    }

    frameId = requestAnimationFrame(function () {
      frameId = null;
      callbacks.collectionStarting();
      var critical = callbacks.getCritical();
      start(timingKey);
      var entries = getEntries();
      var _staging = staging,
          additions = _staging.additions,
          removals = _staging.removals,
          modified = _staging.modified;

      var added = __WEBPACK_IMPORTED_MODULE_9__babel_runtime_corejs2_core_js_object_keys___default()(additions).map(function (id) {
        return entries.draggables[id].getDimension(origin);
      }).sort(function (a, b) {
        return a.descriptor.index - b.descriptor.index;
      });

      var updated = __WEBPACK_IMPORTED_MODULE_9__babel_runtime_corejs2_core_js_object_keys___default()(modified).map(function (id) {
        var entry = entries.droppables[id];
        !entry ?  false ? invariant(false, 'Cannot find dynamically added droppable in cache') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
        var isHome = entry.descriptor.id === critical.droppable.id;
        var options = {
          withoutPlaceholder: !isHome
        };
        return entry.callbacks.recollect(options);
      });

      var result = {
        additions: added,
        removals: __WEBPACK_IMPORTED_MODULE_9__babel_runtime_corejs2_core_js_object_keys___default()(removals),
        modified: updated
      };
      staging = clean$2();
      finish(timingKey);
      callbacks.publish(result);
    });
  };

  var add = function add(descriptor) {
    staging.additions[descriptor.id] = descriptor;
    staging.modified[descriptor.droppableId] = true;

    if (staging.removals[descriptor.id]) {
      delete staging.removals[descriptor.id];
    }

    collect();
  };

  var remove = function remove(descriptor) {
    staging.removals[descriptor.id] = descriptor;
    staging.modified[descriptor.droppableId] = true;

    if (staging.additions[descriptor.id]) {
      delete staging.additions[descriptor.id];
    }

    collect();
  };

  var stop = function stop() {
    if (!frameId) {
      return;
    }

    cancelAnimationFrame(frameId);
    frameId = null;
    staging = clean$2();
  };

  return {
    add: add,
    remove: remove,
    stop: stop
  };
});

var getWindowScroll = (function () {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
});

var getDocumentElement = (function () {
  var doc = document.documentElement;
  !doc ?  false ? invariant(false, 'Cannot find document.documentElement') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  return doc;
});

var getMaxWindowScroll = (function () {
  var doc = getDocumentElement();
  var maxScroll = getMaxScroll({
    scrollHeight: doc.scrollHeight,
    scrollWidth: doc.scrollWidth,
    width: doc.clientWidth,
    height: doc.clientHeight
  });
  return maxScroll;
});

var getViewport = (function () {
  var scroll = getWindowScroll();
  var maxScroll = getMaxWindowScroll();
  var top = scroll.y;
  var left = scroll.x;
  var doc = getDocumentElement();
  var width = doc.clientWidth;
  var height = doc.clientHeight;
  var right = left + width;
  var bottom = top + height;
  var frame = Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["e" /* getRect */])({
    top: top,
    left: left,
    right: right,
    bottom: bottom
  });
  var viewport = {
    frame: frame,
    scroll: {
      initial: scroll,
      current: scroll,
      max: maxScroll,
      diff: {
        value: origin,
        displacement: origin
      }
    }
  };
  return viewport;
});

var getInitialPublish = (function (_ref) {
  var critical = _ref.critical,
      scrollOptions = _ref.scrollOptions,
      entries = _ref.entries;
  var timingKey = 'Initial collection from DOM';
  start(timingKey);
  var viewport = getViewport();
  var windowScroll = viewport.scroll.current;
  var home = critical.droppable;
  var droppables = values(entries.droppables).filter(function (entry) {
    return entry.descriptor.type === home.type;
  }).map(function (entry) {
    return entry.callbacks.getDimensionAndWatchScroll(windowScroll, scrollOptions);
  });
  var draggables = values(entries.draggables).filter(function (entry) {
    return entry.descriptor.type === critical.draggable.type;
  }).map(function (entry) {
    return entry.getDimension(windowScroll);
  });
  var dimensions = {
    draggables: toDraggableMap(draggables),
    droppables: toDroppableMap(droppables)
  };
  finish(timingKey);
  var result = {
    dimensions: dimensions,
    critical: critical,
    viewport: viewport
  };
  return result;
});

var throwIfAddOrRemoveOfWrongType = function throwIfAddOrRemoveOfWrongType(collection, descriptor) {
  !(collection.critical.draggable.type === descriptor.type) ?  false ? invariant(false, "We have detected that you have added a Draggable during a drag.\n      This is not of the same type as the dragging item\n\n      Dragging type: " + collection.critical.draggable.type + ".\n      Added type: " + descriptor.type + "\n\n      We are not allowing this as you can run into problems if your change\n      has shifted the positioning of other Droppables, or has changed the size of the page") : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
};

var createDimensionMarshal = (function (callbacks) {
  var entries = {
    droppables: {},
    draggables: {}
  };
  var collection = null;
  var publisher = createPublisher({
    callbacks: {
      publish: callbacks.publishWhileDragging,
      collectionStarting: callbacks.collectionStarting,
      getCritical: function getCritical() {
        !collection ?  false ? invariant(false, 'Cannot get critical when there is no collection') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
        return collection.critical;
      }
    },
    getEntries: function getEntries() {
      return entries;
    }
  });

  var registerDraggable = function registerDraggable(descriptor, getDimension) {
    var entry = {
      descriptor: descriptor,
      getDimension: getDimension
    };
    entries.draggables[descriptor.id] = entry;

    if (!collection) {
      return;
    }

    throwIfAddOrRemoveOfWrongType(collection, descriptor);
    publisher.add(descriptor);
  };

  var updateDraggable = function updateDraggable(previous, descriptor, getDimension) {
    !entries.draggables[previous.id] ?  false ? invariant(false, 'Cannot update draggable registration as no previous registration was found') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    delete entries.draggables[previous.id];
    var entry = {
      descriptor: descriptor,
      getDimension: getDimension
    };
    entries.draggables[descriptor.id] = entry;
  };

  var unregisterDraggable = function unregisterDraggable(descriptor) {
    var entry = entries.draggables[descriptor.id];
    !entry ?  false ? invariant(false, "Cannot unregister Draggable with id:\n      " + descriptor.id + " as it is not registered") : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;

    if (entry.descriptor !== descriptor) {
      return;
    }

    delete entries.draggables[descriptor.id];

    if (!collection) {
      return;
    }

    !(collection.critical.draggable.id !== descriptor.id) ?  false ? invariant(false, 'Cannot remove the dragging item during a drag') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    throwIfAddOrRemoveOfWrongType(collection, descriptor);
    publisher.remove(descriptor);
  };

  var registerDroppable = function registerDroppable(descriptor, droppableCallbacks) {
    var id = descriptor.id;
    entries.droppables[id] = {
      descriptor: descriptor,
      callbacks: droppableCallbacks
    };
    !!collection ?  false ? invariant(false, 'Cannot add a Droppable during a drag') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  };

  var updateDroppable = function updateDroppable(previous, descriptor, droppableCallbacks) {
    !entries.droppables[previous.id] ?  false ? invariant(false, 'Cannot update droppable registration as no previous registration was found') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    delete entries.droppables[previous.id];
    var entry = {
      descriptor: descriptor,
      callbacks: droppableCallbacks
    };
    entries.droppables[descriptor.id] = entry;
    !!collection ?  false ? invariant(false, 'You are not able to update the id or type of a droppable during a drag') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  };

  var unregisterDroppable = function unregisterDroppable(descriptor) {
    var entry = entries.droppables[descriptor.id];
    !entry ?  false ? invariant(false, "Cannot unregister Droppable with id " + descriptor.id + " as as it is not registered") : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;

    if (entry.descriptor !== descriptor) {
      return;
    }

    delete entries.droppables[descriptor.id];
    !!collection ?  false ? invariant(false, 'Cannot add a Droppable during a drag') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  };

  var updateDroppableIsEnabled = function updateDroppableIsEnabled(id, isEnabled) {
    !entries.droppables[id] ?  false ? invariant(false, "Cannot update is enabled flag of Droppable " + id + " as it is not registered") : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;

    if (!collection) {
      return;
    }

    callbacks.updateDroppableIsEnabled({
      id: id,
      isEnabled: isEnabled
    });
  };

  var updateDroppableIsCombineEnabled = function updateDroppableIsCombineEnabled(id, isCombineEnabled) {
    !entries.droppables[id] ?  false ? invariant(false, "Cannot update isCombineEnabled flag of Droppable " + id + " as it is not registered") : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;

    if (!collection) {
      return;
    }

    callbacks.updateDroppableIsCombineEnabled({
      id: id,
      isCombineEnabled: isCombineEnabled
    });
  };

  var updateDroppableScroll = function updateDroppableScroll(id, newScroll) {
    !entries.droppables[id] ?  false ? invariant(false, "Cannot update the scroll on Droppable " + id + " as it is not registered") : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;

    if (!collection) {
      return;
    }

    callbacks.updateDroppableScroll({
      id: id,
      offset: newScroll
    });
  };

  var scrollDroppable = function scrollDroppable(id, change) {
    var entry = entries.droppables[id];
    !entry ?  false ? invariant(false, "Cannot scroll Droppable " + id + " as it is not registered") : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;

    if (!collection) {
      return;
    }

    entry.callbacks.scroll(change);
  };

  var stopPublishing = function stopPublishing() {
    if (!collection) {
      return;
    }

    publisher.stop();
    var home = collection.critical.droppable;
    values(entries.droppables).filter(function (entry) {
      return entry.descriptor.type === home.type;
    }).forEach(function (entry) {
      return entry.callbacks.dragStopped();
    });
    collection = null;
  };

  var startPublishing = function startPublishing(request) {
    !!collection ?  false ? invariant(false, 'Cannot start capturing critical dimensions as there is already a collection') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    var entry = entries.draggables[request.draggableId];
    !entry ?  false ? invariant(false, 'Cannot find critical draggable entry') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    var home = entries.droppables[entry.descriptor.droppableId];
    !home ?  false ? invariant(false, 'Cannot find critical droppable entry') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    var critical = {
      draggable: entry.descriptor,
      droppable: home.descriptor
    };
    collection = {
      critical: critical
    };
    return getInitialPublish({
      critical: critical,
      entries: entries,
      scrollOptions: request.scrollOptions
    });
  };

  var marshal = {
    registerDraggable: registerDraggable,
    updateDraggable: updateDraggable,
    unregisterDraggable: unregisterDraggable,
    registerDroppable: registerDroppable,
    updateDroppable: updateDroppable,
    unregisterDroppable: unregisterDroppable,
    updateDroppableIsEnabled: updateDroppableIsEnabled,
    updateDroppableIsCombineEnabled: updateDroppableIsCombineEnabled,
    scrollDroppable: scrollDroppable,
    updateDroppableScroll: updateDroppableScroll,
    startPublishing: startPublishing,
    stopPublishing: stopPublishing
  };
  return marshal;
});

var prefix = 'data-react-beautiful-dnd';
var dragHandle = prefix + "-drag-handle";
var draggable = prefix + "-draggable";
var droppable = prefix + "-droppable";

var makeGetSelector = function makeGetSelector(context) {
  return function (attribute) {
    return "[" + attribute + "=\"" + context + "\"]";
  };
};

var getStyles = function getStyles(rules, property) {
  return rules.map(function (rule) {
    var value = rule.styles[property];

    if (!value) {
      return '';
    }

    return rule.selector + " { " + value + " }";
  }).join(' ');
};

var noPointerEvents = 'pointer-events: none;';
var getStyles$1 = (function (styleContext) {
  var getSelector = makeGetSelector(styleContext);

  var dragHandle$1 = function () {
    var grabCursor = "\n      cursor: -webkit-grab;\n      cursor: grab;\n    ";
    return {
      selector: getSelector(dragHandle),
      styles: {
        always: "\n          -webkit-touch-callout: none;\n          -webkit-tap-highlight-color: rgba(0,0,0,0);\n          touch-action: manipulation;\n        ",
        resting: grabCursor,
        dragging: noPointerEvents,
        dropAnimating: grabCursor
      }
    };
  }();

  var draggable$1 = function () {
    var transition = "\n      transition: " + transitions.outOfTheWay + ";\n    ";
    return {
      selector: getSelector(draggable),
      styles: {
        dragging: transition,
        dropAnimating: transition,
        userCancel: transition
      }
    };
  }();

  var droppable$1 = {
    selector: getSelector(droppable),
    styles: {
      always: "overflow-anchor: none;"
    }
  };
  var body = {
    selector: 'body',
    styles: {
      dragging: "\n        cursor: grabbing;\n        cursor: -webkit-grabbing;\n        user-select: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        overflow-anchor: none;\n      "
    }
  };
  var rules = [draggable$1, dragHandle$1, droppable$1, body];
  return {
    always: getStyles(rules, 'always'),
    resting: getStyles(rules, 'resting'),
    dragging: getStyles(rules, 'dragging'),
    dropAnimating: getStyles(rules, 'dropAnimating'),
    userCancel: getStyles(rules, 'userCancel')
  };
});

var count = 0;
var resetStyleContext = function resetStyleContext() {
  count = 0;
};

var getHead = function getHead() {
  var head = document.querySelector('head');
  !head ?  false ? invariant(false, 'Cannot find the head to append a style to') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  return head;
};

var createStyleEl = function createStyleEl() {
  var el = document.createElement('style');
  el.type = 'text/css';
  return el;
};

var createStyleMarshal = (function () {
  var context = "" + count++;
  var styles = getStyles$1(context);
  var always = null;
  var dynamic = null;
  var setStyle = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (el, proposed) {
    !el ?  false ? invariant(false, 'Cannot set style of style tag if not mounted') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    el.innerHTML = proposed;
  });

  var mount = function mount() {
    !(!always && !dynamic) ?  false ? invariant(false, 'Style marshal already mounted') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    always = createStyleEl();
    dynamic = createStyleEl();
    always.setAttribute(prefix + "-always", context);
    dynamic.setAttribute(prefix + "-dynamic", context);
    getHead().appendChild(always);
    getHead().appendChild(dynamic);
    setStyle(always, styles.always);
    setStyle(dynamic, styles.resting);
  };

  var dragging = function dragging() {
    return setStyle(dynamic, styles.dragging);
  };

  var dropping = function dropping(reason) {
    if (reason === 'DROP') {
      setStyle(dynamic, styles.dropAnimating);
      return;
    }

    setStyle(dynamic, styles.userCancel);
  };

  var resting = function resting() {
    return setStyle(dynamic, styles.resting);
  };

  var unmount = function unmount() {
    !(always && dynamic) ?  false ? invariant(false, 'Cannot unmount style marshal as it is already unmounted') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    getHead().removeChild(always);
    getHead().removeChild(dynamic);
    always = null;
    dynamic = null;
  };

  var marshal = {
    dragging: dragging,
    dropping: dropping,
    resting: resting,
    styleContext: context,
    mount: mount,
    unmount: unmount
  };
  return marshal;
});

var canStartDrag = (function (state, id) {
  if (state.phase === 'IDLE') {
    return true;
  }

  if (state.phase !== 'DROP_ANIMATING') {
    return false;
  }

  if (state.completed.result.draggableId === id) {
    return false;
  }

  return state.completed.result.reason === 'DROP';
});

var scrollWindow = (function (change) {
  window.scrollBy(change.x, change.y);
});

var getBodyElement = (function () {
  var body = document.body;
  !body ?  false ? invariant(false, 'Cannot find document.body') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  return body;
});

var count$1 = 0;
var visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  border: '0',
  padding: '0',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  'clip-path': 'inset(100%)'
};
var createAnnouncer = (function () {
  var id = "react-beautiful-dnd-announcement-" + count$1++;
  var el = null;

  var announce = function announce(message) {
    if (el) {
      el.textContent = message;
      return;
    }

     false ? warning("\n      A screen reader message was trying to be announced but it was unable to do so.\n      This can occur if you unmount your <DragDropContext /> in your onDragEnd.\n      Consider calling provided.announce() before the unmount so that the instruction will\n      not be lost for users relying on a screen reader.\n\n      Message not passed to screen reader:\n\n      \"" + message + "\"\n    ") : void 0;
  };

  var mount = function mount() {
    !!el ?  false ? invariant(false, 'Announcer already mounted') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    el = document.createElement('div');
    el.id = id;
    el.setAttribute('aria-live', 'assertive');
    el.setAttribute('role', 'log');
    el.setAttribute('aria-atomic', 'true');

    __WEBPACK_IMPORTED_MODULE_10__babel_runtime_corejs2_core_js_object_assign___default()(el.style, visuallyHidden);

    getBodyElement().appendChild(el);
  };

  var unmount = function unmount() {
    !el ?  false ? invariant(false, 'Will not unmount announcer as it is already unmounted') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    getBodyElement().removeChild(el);
    el = null;
  };

  var announcer = {
    announce: announce,
    id: id,
    mount: mount,
    unmount: unmount
  };
  return announcer;
});

var getScrollableDroppables = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (droppables) {
  return toDroppableList(droppables).filter(function (droppable) {
    if (!droppable.isEnabled) {
      return false;
    }

    if (!droppable.frame) {
      return false;
    }

    return true;
  });
});

var getScrollableDroppableOver = function getScrollableDroppableOver(target, droppables) {
  var maybe = find(getScrollableDroppables(droppables), function (droppable) {
    !droppable.frame ?  false ? invariant(false, 'Invalid result') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    return isPositionInFrame(droppable.frame.pageMarginBox)(target);
  });
  return maybe;
};

var getBestScrollableDroppable = (function (_ref) {
  var center = _ref.center,
      destination = _ref.destination,
      droppables = _ref.droppables;

  if (destination) {
    var _dimension = droppables[destination];

    if (!_dimension.frame) {
      return null;
    }

    return _dimension;
  }

  var dimension = getScrollableDroppableOver(center, droppables);
  return dimension;
});

var config = {
  startFromPercentage: 0.25,
  maxScrollAtPercentage: 0.05,
  maxPixelScroll: 28,
  ease: function ease(percentage) {
    return Math.pow(percentage, 2);
  },
  durationDampening: {
    stopDampeningAt: 1200,
    accelerateAt: 360
  }
};

var getDistanceThresholds = (function (container, axis) {
  var startScrollingFrom = container[axis.size] * config.startFromPercentage;
  var maxScrollValueAt = container[axis.size] * config.maxScrollAtPercentage;
  var thresholds = {
    startScrollingFrom: startScrollingFrom,
    maxScrollValueAt: maxScrollValueAt
  };
  return thresholds;
});

var getPercentage = (function (_ref) {
  var startOfRange = _ref.startOfRange,
      endOfRange = _ref.endOfRange,
      current = _ref.current;
  var range = endOfRange - startOfRange;

  if (range === 0) {
     false ? warning("\n      Detected distance range of 0 in the fluid auto scroller\n      This is unexpected and would cause a divide by 0 issue.\n      Not allowing an auto scroll\n    ") : void 0;
    return 0;
  }

  var currentInRange = current - startOfRange;
  var percentage = currentInRange / range;
  return percentage;
});

var minScroll = 1;

var getValueFromDistance = (function (distanceToEdge, thresholds) {
  if (distanceToEdge > thresholds.startScrollingFrom) {
    return 0;
  }

  if (distanceToEdge <= thresholds.maxScrollValueAt) {
    return config.maxPixelScroll;
  }

  if (distanceToEdge === thresholds.startScrollingFrom) {
    return minScroll;
  }

  var percentageFromMaxScrollValueAt = getPercentage({
    startOfRange: thresholds.maxScrollValueAt,
    endOfRange: thresholds.startScrollingFrom,
    current: distanceToEdge
  });
  var percentageFromStartScrollingFrom = 1 - percentageFromMaxScrollValueAt;
  var scroll = config.maxPixelScroll * config.ease(percentageFromStartScrollingFrom);
  return Math.ceil(scroll);
});

var accelerateAt = config.durationDampening.accelerateAt;
var stopAt = config.durationDampening.stopDampeningAt;
var dampenValueByTime = (function (proposedScroll, dragStartTime) {
  var startOfRange = dragStartTime;
  var endOfRange = stopAt;

  var now = __WEBPACK_IMPORTED_MODULE_11__babel_runtime_corejs2_core_js_date_now___default()();

  var runTime = now - startOfRange;

  if (runTime >= stopAt) {
    return proposedScroll;
  }

  if (runTime < accelerateAt) {
    return minScroll;
  }

  var betweenAccelerateAtAndStopAtPercentage = getPercentage({
    startOfRange: accelerateAt,
    endOfRange: endOfRange,
    current: runTime
  });
  var scroll = proposedScroll * config.ease(betweenAccelerateAtAndStopAtPercentage);
  return Math.ceil(scroll);
});

var getValue = (function (_ref) {
  var distanceToEdge = _ref.distanceToEdge,
      thresholds = _ref.thresholds,
      dragStartTime = _ref.dragStartTime,
      shouldUseTimeDampening = _ref.shouldUseTimeDampening;
  var scroll = getValueFromDistance(distanceToEdge, thresholds);

  if (scroll === 0) {
    return 0;
  }

  if (!shouldUseTimeDampening) {
    return scroll;
  }

  return Math.max(dampenValueByTime(scroll, dragStartTime), minScroll);
});

var getScrollOnAxis = (function (_ref) {
  var container = _ref.container,
      distanceToEdges = _ref.distanceToEdges,
      dragStartTime = _ref.dragStartTime,
      axis = _ref.axis,
      shouldUseTimeDampening = _ref.shouldUseTimeDampening;
  var thresholds = getDistanceThresholds(container, axis);
  var isCloserToEnd = distanceToEdges[axis.end] < distanceToEdges[axis.start];

  if (isCloserToEnd) {
    return getValue({
      distanceToEdge: distanceToEdges[axis.end],
      thresholds: thresholds,
      dragStartTime: dragStartTime,
      shouldUseTimeDampening: shouldUseTimeDampening
    });
  }

  return -1 * getValue({
    distanceToEdge: distanceToEdges[axis.start],
    thresholds: thresholds,
    dragStartTime: dragStartTime,
    shouldUseTimeDampening: shouldUseTimeDampening
  });
});

var adjustForSizeLimits = (function (_ref) {
  var container = _ref.container,
      subject = _ref.subject,
      proposedScroll = _ref.proposedScroll;
  var isTooBigVertically = subject.height > container.height;
  var isTooBigHorizontally = subject.width > container.width;

  if (!isTooBigHorizontally && !isTooBigVertically) {
    return proposedScroll;
  }

  if (isTooBigHorizontally && isTooBigVertically) {
    return null;
  }

  return {
    x: isTooBigHorizontally ? 0 : proposedScroll.x,
    y: isTooBigVertically ? 0 : proposedScroll.y
  };
});

var clean$3 = apply(function (value) {
  return value === 0 ? 0 : value;
});
var getScroll = (function (_ref) {
  var dragStartTime = _ref.dragStartTime,
      container = _ref.container,
      subject = _ref.subject,
      center = _ref.center,
      shouldUseTimeDampening = _ref.shouldUseTimeDampening;
  var distanceToEdges = {
    top: center.y - container.top,
    right: container.right - center.x,
    bottom: container.bottom - center.y,
    left: center.x - container.left
  };
  var y = getScrollOnAxis({
    container: container,
    distanceToEdges: distanceToEdges,
    dragStartTime: dragStartTime,
    axis: vertical,
    shouldUseTimeDampening: shouldUseTimeDampening
  });
  var x = getScrollOnAxis({
    container: container,
    distanceToEdges: distanceToEdges,
    dragStartTime: dragStartTime,
    axis: horizontal,
    shouldUseTimeDampening: shouldUseTimeDampening
  });
  var required = clean$3({
    x: x,
    y: y
  });

  if (isEqual(required, origin)) {
    return null;
  }

  var limited = adjustForSizeLimits({
    container: container,
    subject: subject,
    proposedScroll: required
  });

  if (!limited) {
    return null;
  }

  return isEqual(limited, origin) ? null : limited;
});

var smallestSigned = apply(function (value) {
  if (value === 0) {
    return 0;
  }

  return value > 0 ? 1 : -1;
});
var getOverlap = function () {
  var getRemainder = function getRemainder(target, max) {
    if (target < 0) {
      return target;
    }

    if (target > max) {
      return target - max;
    }

    return 0;
  };

  return function (_ref) {
    var current = _ref.current,
        max = _ref.max,
        change = _ref.change;
    var targetScroll = add(current, change);
    var overlap = {
      x: getRemainder(targetScroll.x, max.x),
      y: getRemainder(targetScroll.y, max.y)
    };

    if (isEqual(overlap, origin)) {
      return null;
    }

    return overlap;
  };
}();
var canPartiallyScroll = function canPartiallyScroll(_ref2) {
  var rawMax = _ref2.max,
      current = _ref2.current,
      change = _ref2.change;
  var max = {
    x: Math.max(current.x, rawMax.x),
    y: Math.max(current.y, rawMax.y)
  };
  var smallestChange = smallestSigned(change);
  var overlap = getOverlap({
    max: max,
    current: current,
    change: smallestChange
  });

  if (!overlap) {
    return true;
  }

  if (smallestChange.x !== 0 && overlap.x === 0) {
    return true;
  }

  if (smallestChange.y !== 0 && overlap.y === 0) {
    return true;
  }

  return false;
};
var canScrollWindow = function canScrollWindow(viewport, change) {
  return canPartiallyScroll({
    current: viewport.scroll.current,
    max: viewport.scroll.max,
    change: change
  });
};
var getWindowOverlap = function getWindowOverlap(viewport, change) {
  if (!canScrollWindow(viewport, change)) {
    return null;
  }

  var max = viewport.scroll.max;
  var current = viewport.scroll.current;
  return getOverlap({
    current: current,
    max: max,
    change: change
  });
};
var canScrollDroppable = function canScrollDroppable(droppable, change) {
  var frame = droppable.frame;

  if (!frame) {
    return false;
  }

  return canPartiallyScroll({
    current: frame.scroll.current,
    max: frame.scroll.max,
    change: change
  });
};
var getDroppableOverlap = function getDroppableOverlap(droppable, change) {
  var frame = droppable.frame;

  if (!frame) {
    return null;
  }

  if (!canScrollDroppable(droppable, change)) {
    return null;
  }

  return getOverlap({
    current: frame.scroll.current,
    max: frame.scroll.max,
    change: change
  });
};

var getWindowScrollChange = (function (_ref) {
  var viewport = _ref.viewport,
      subject = _ref.subject,
      center = _ref.center,
      dragStartTime = _ref.dragStartTime,
      shouldUseTimeDampening = _ref.shouldUseTimeDampening;
  var scroll = getScroll({
    dragStartTime: dragStartTime,
    container: viewport.frame,
    subject: subject,
    center: center,
    shouldUseTimeDampening: shouldUseTimeDampening
  });
  return scroll && canScrollWindow(viewport, scroll) ? scroll : null;
});

var getDroppableScrollChange = (function (_ref) {
  var droppable = _ref.droppable,
      subject = _ref.subject,
      center = _ref.center,
      dragStartTime = _ref.dragStartTime,
      shouldUseTimeDampening = _ref.shouldUseTimeDampening;
  var frame = droppable.frame;

  if (!frame) {
    return null;
  }

  var scroll = getScroll({
    dragStartTime: dragStartTime,
    container: frame.pageMarginBox,
    subject: subject,
    center: center,
    shouldUseTimeDampening: shouldUseTimeDampening
  });
  return scroll && canScrollDroppable(droppable, scroll) ? scroll : null;
});

var scroll$1 = (function (_ref) {
  var state = _ref.state,
      dragStartTime = _ref.dragStartTime,
      shouldUseTimeDampening = _ref.shouldUseTimeDampening,
      scrollWindow = _ref.scrollWindow,
      scrollDroppable = _ref.scrollDroppable;
  var center = state.current.page.borderBoxCenter;
  var draggable = state.dimensions.draggables[state.critical.draggable.id];
  var subject = draggable.page.marginBox;

  if (state.isWindowScrollAllowed) {
    var viewport = state.viewport;

    var _change = getWindowScrollChange({
      dragStartTime: dragStartTime,
      viewport: viewport,
      subject: subject,
      center: center,
      shouldUseTimeDampening: shouldUseTimeDampening
    });

    if (_change) {
      scrollWindow(_change);
      return;
    }
  }

  var droppable = getBestScrollableDroppable({
    center: center,
    destination: whatIsDraggedOver(state.impact),
    droppables: state.dimensions.droppables
  });

  if (!droppable) {
    return;
  }

  var change = getDroppableScrollChange({
    dragStartTime: dragStartTime,
    droppable: droppable,
    subject: subject,
    center: center,
    shouldUseTimeDampening: shouldUseTimeDampening
  });

  if (change) {
    scrollDroppable(droppable.descriptor.id, change);
  }
});

var createFluidScroller = (function (_ref) {
  var scrollWindow = _ref.scrollWindow,
      scrollDroppable = _ref.scrollDroppable;
  var scheduleWindowScroll = Object(__WEBPACK_IMPORTED_MODULE_12_raf_schd__["a" /* default */])(scrollWindow);
  var scheduleDroppableScroll = Object(__WEBPACK_IMPORTED_MODULE_12_raf_schd__["a" /* default */])(scrollDroppable);
  var dragging = null;

  var tryScroll = function tryScroll(state) {
    !dragging ?  false ? invariant(false, 'Cannot fluid scroll if not dragging') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    var _dragging = dragging,
        shouldUseTimeDampening = _dragging.shouldUseTimeDampening,
        dragStartTime = _dragging.dragStartTime;
    scroll$1({
      state: state,
      scrollWindow: scheduleWindowScroll,
      scrollDroppable: scheduleDroppableScroll,
      dragStartTime: dragStartTime,
      shouldUseTimeDampening: shouldUseTimeDampening
    });
  };

  var cancelPending = function cancelPending() {
    !dragging ?  false ? invariant(false, 'Cannot cancel pending fluid scroll when not started') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    scheduleWindowScroll.cancel();
    scheduleDroppableScroll.cancel();
  };

  var start$1 = function start$1(state) {
    start('starting fluid scroller');
    !!dragging ?  false ? invariant(false, 'Cannot start auto scrolling when already started') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;

    var dragStartTime = __WEBPACK_IMPORTED_MODULE_11__babel_runtime_corejs2_core_js_date_now___default()();

    var wasScrollNeeded = false;

    var fakeScrollCallback = function fakeScrollCallback() {
      wasScrollNeeded = true;
    };

    scroll$1({
      state: state,
      dragStartTime: 0,
      shouldUseTimeDampening: false,
      scrollWindow: fakeScrollCallback,
      scrollDroppable: fakeScrollCallback
    });
    dragging = {
      dragStartTime: dragStartTime,
      shouldUseTimeDampening: wasScrollNeeded
    };
    finish('starting fluid scroller');

    if (wasScrollNeeded) {
      tryScroll(state);
    }
  };

  var stop = function stop() {
    if (!dragging) {
      return;
    }

    cancelPending();
    dragging = null;
  };

  return {
    start: start$1,
    stop: stop,
    cancelPending: cancelPending,
    scroll: tryScroll
  };
});

var createJumpScroller = (function (_ref) {
  var move = _ref.move,
      scrollDroppable = _ref.scrollDroppable,
      scrollWindow = _ref.scrollWindow;

  var moveByOffset = function moveByOffset(state, offset) {
    var client = add(state.current.client.selection, offset);
    move({
      client: client
    });
  };

  var scrollDroppableAsMuchAsItCan = function scrollDroppableAsMuchAsItCan(droppable, change) {
    if (!canScrollDroppable(droppable, change)) {
      return change;
    }

    var overlap = getDroppableOverlap(droppable, change);

    if (!overlap) {
      scrollDroppable(droppable.descriptor.id, change);
      return null;
    }

    var whatTheDroppableCanScroll = subtract(change, overlap);
    scrollDroppable(droppable.descriptor.id, whatTheDroppableCanScroll);
    var remainder = subtract(change, whatTheDroppableCanScroll);
    return remainder;
  };

  var scrollWindowAsMuchAsItCan = function scrollWindowAsMuchAsItCan(isWindowScrollAllowed, viewport, change) {
    if (!isWindowScrollAllowed) {
      return change;
    }

    if (!canScrollWindow(viewport, change)) {
      return change;
    }

    var overlap = getWindowOverlap(viewport, change);

    if (!overlap) {
      scrollWindow(change);
      return null;
    }

    var whatTheWindowCanScroll = subtract(change, overlap);
    scrollWindow(whatTheWindowCanScroll);
    var remainder = subtract(change, whatTheWindowCanScroll);
    return remainder;
  };

  var jumpScroller = function jumpScroller(state) {
    var request = state.scrollJumpRequest;

    if (!request) {
      return;
    }

    var destination = whatIsDraggedOver(state.impact);
    !destination ?  false ? invariant(false, 'Cannot perform a jump scroll when there is no destination') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    var droppableRemainder = scrollDroppableAsMuchAsItCan(state.dimensions.droppables[destination], request);

    if (!droppableRemainder) {
      return;
    }

    var viewport = state.viewport;
    var windowRemainder = scrollWindowAsMuchAsItCan(state.isWindowScrollAllowed, viewport, droppableRemainder);

    if (!windowRemainder) {
      return;
    }

    moveByOffset(state, windowRemainder);
  };

  return jumpScroller;
});

var createAutoScroller = (function (_ref) {
  var scrollDroppable = _ref.scrollDroppable,
      scrollWindow = _ref.scrollWindow,
      move = _ref.move;
  var fluidScroller = createFluidScroller({
    scrollWindow: scrollWindow,
    scrollDroppable: scrollDroppable
  });
  var jumpScroll = createJumpScroller({
    move: move,
    scrollWindow: scrollWindow,
    scrollDroppable: scrollDroppable
  });

  var scroll = function scroll(state) {
    if (state.phase !== 'DRAGGING') {
      return;
    }

    if (state.movementMode === 'FLUID') {
      fluidScroller.scroll(state);
      return;
    }

    if (!state.scrollJumpRequest) {
      return;
    }

    jumpScroll(state);
  };

  var scroller = {
    scroll: scroll,
    cancelPending: fluidScroller.cancelPending,
    start: fluidScroller.start,
    stop: fluidScroller.stop
  };
  return scroller;
});

var prefix$1 = function prefix(key) {
  return "private-react-beautiful-dnd-key-do-not-use-" + key;
};

var storeKey = prefix$1('store');
var droppableIdKey = prefix$1('droppable-id');
var droppableTypeKey = prefix$1('droppable-type');
var dimensionMarshalKey = prefix$1('dimension-marshal');
var styleKey = prefix$1('style');
var canLiftKey = prefix$1('can-lift');
var isMovementAllowedKey = prefix$1('is-movement-allowed');

var peerDependencies = {
	react: "^16.3.1"
};

var semver = /(\d+)\.(\d+)\.(\d+)/;

var getVersion = function getVersion(value) {
  var result = semver.exec(value);
  !(result != null) ?  false ? invariant(false, "Unable to parse React version " + value) : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  var major = Number(result[1]);
  var minor = Number(result[2]);
  var patch = Number(result[3]);
  return {
    major: major,
    minor: minor,
    patch: patch,
    raw: value
  };
};

var isSatisfied = function isSatisfied(expected, actual) {
  if (actual.major > expected.major) {
    return true;
  }

  if (actual.major < expected.major) {
    return false;
  }

  if (actual.minor > expected.minor) {
    return true;
  }

  if (actual.minor < expected.minor) {
    return false;
  }

  return actual.patch >= expected.patch;
};

var checkReactVersion = (function (peerDepValue, actualValue) {
  var peerDep = getVersion(peerDepValue);
  var actual = getVersion(actualValue);

  if (isSatisfied(peerDep, actual)) {
    return;
  }

   false ? warning("\n    React version: [" + actual.raw + "]\n    does not satisfy expected peer dependency version: [" + peerDep.raw + "]\n\n    This can result in run time bugs, and even fatal crashes\n  ") : void 0;
});

var suffix = "\n  We expect a html5 doctype: <!doctype html>\n  This is to ensure consistent browser layout and measurement\n\n  More information: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/doctype.md\n";
var checkDoctype = (function (doc) {
  var doctype = doc.doctype;

  if (!doctype) {
     false ? warning("\n      No <!doctype html> found.\n\n      " + suffix + "\n    ") : void 0;
    return;
  }

  if (doctype.name.toLowerCase() !== 'html') {
     false ? warning("\n      Unexpected <!doctype> found: (" + doctype.name + ")\n\n      " + suffix + "\n    ") : void 0;
  }

  if (doctype.publicId !== '') {
     false ? warning("\n      Unexpected <!doctype> publicId found: (" + doctype.publicId + ")\n      A html5 doctype does not have a publicId\n\n      " + suffix + "\n    ") : void 0;
  }
});

function printFatalError(error) {
  var _console;

  if (true) {
    return;
  }

  (_console = console).error.apply(_console, getFormattedMessage("\n        An error has occurred while a drag is occurring.\n        Any existing drag will be cancelled.\n\n        > " + error.message + "\n        "));

  console.error('raw', error);
}

var ErrorBoundary = function (_React$Component) {
  Object(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_corejs2_helpers_esm_inheritsLoose__["a" /* default */])(ErrorBoundary, _React$Component);

  function ErrorBoundary() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.onFatalError = function (error) {
      printFatalError(error);

      _this.props.onError();

      if (error.message.indexOf('Invariant failed') !== -1) {
        _this.setState({});

        return;
      }

      throw error;
    };

    return _this;
  }

  var _proto = ErrorBoundary.prototype;

  _proto.componentDidMount = function componentDidMount() {
    window.addEventListener('error', this.onFatalError);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('error', this.onFatalError);
  };

  _proto.componentDidCatch = function componentDidCatch(error) {
    this.onFatalError(error);
  };

  _proto.render = function render() {
    return this.props.children;
  };

  return ErrorBoundary;
}(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Component);

var _DragDropContext$chil;
var resetServerContext = function resetServerContext() {
  resetStyleContext();
};

var DragDropContext = function (_React$Component) {
  Object(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_corejs2_helpers_esm_inheritsLoose__["a" /* default */])(DragDropContext, _React$Component);

  function DragDropContext(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.store = void 0;
    _this.dimensionMarshal = void 0;
    _this.styleMarshal = void 0;
    _this.autoScroller = void 0;
    _this.announcer = void 0;
    _this.unsubscribe = void 0;

    _this.canLift = function (id) {
      return canStartDrag(_this.store.getState(), id);
    };

    _this.getIsMovementAllowed = function () {
      return isMovementAllowed(_this.store.getState());
    };

    _this.tryResetStore = function () {
      var state = _this.store.getState();

      if (state.phase !== 'IDLE') {
        _this.store.dispatch(clean());
      }
    };

    if (false) {
      !(typeof props.onDragEnd === 'function') ? process.env.NODE_ENV !== "production" ? invariant(false, 'A DragDropContext requires an onDragEnd function to perform reordering logic') : invariant(false) : void 0;
    }

    _this.announcer = createAnnouncer();
    _this.styleMarshal = createStyleMarshal();
    _this.store = createStore({
      getDimensionMarshal: function getDimensionMarshal() {
        return _this.dimensionMarshal;
      },
      styleMarshal: _this.styleMarshal,
      getResponders: function getResponders() {
        return {
          onBeforeDragStart: _this.props.onBeforeDragStart,
          onDragStart: _this.props.onDragStart,
          onDragEnd: _this.props.onDragEnd,
          onDragUpdate: _this.props.onDragUpdate
        };
      },
      announce: _this.announcer.announce,
      getScroller: function getScroller() {
        return _this.autoScroller;
      }
    });
    var callbacks = Object(__WEBPACK_IMPORTED_MODULE_3_redux__["b" /* bindActionCreators */])({
      publishWhileDragging: publishWhileDragging$1,
      updateDroppableScroll: updateDroppableScroll,
      updateDroppableIsEnabled: updateDroppableIsEnabled,
      updateDroppableIsCombineEnabled: updateDroppableIsCombineEnabled,
      collectionStarting: collectionStarting
    }, _this.store.dispatch);
    _this.dimensionMarshal = createDimensionMarshal(callbacks);
    _this.autoScroller = createAutoScroller(Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({
      scrollWindow: scrollWindow,
      scrollDroppable: _this.dimensionMarshal.scrollDroppable
    }, Object(__WEBPACK_IMPORTED_MODULE_3_redux__["b" /* bindActionCreators */])({
      move: move
    }, _this.store.dispatch)));
    return _this;
  }

  var _proto = DragDropContext.prototype;

  _proto.getChildContext = function getChildContext() {
    var _ref;

    return _ref = {}, _ref[storeKey] = this.store, _ref[dimensionMarshalKey] = this.dimensionMarshal, _ref[styleKey] = this.styleMarshal.styleContext, _ref[canLiftKey] = this.canLift, _ref[isMovementAllowedKey] = this.getIsMovementAllowed, _ref;
  };

  _proto.componentDidMount = function componentDidMount() {
    this.styleMarshal.mount();
    this.announcer.mount();

    if (false) {
      checkReactVersion(peerDependencies.react, React.version);
      checkDoctype(document);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.tryResetStore();
    this.styleMarshal.unmount();
    this.announcer.unmount();
  };

  _proto.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(ErrorBoundary, {
      onError: this.tryResetStore
    }, this.props.children);
  };

  return DragDropContext;
}(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Component);

DragDropContext.childContextTypes = (_DragDropContext$chil = {}, _DragDropContext$chil[storeKey] = __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.shape({
  dispatch: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func.isRequired,
  subscribe: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func.isRequired,
  getState: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func.isRequired
}).isRequired, _DragDropContext$chil[dimensionMarshalKey] = __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object.isRequired, _DragDropContext$chil[styleKey] = __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string.isRequired, _DragDropContext$chil[canLiftKey] = __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func.isRequired, _DragDropContext$chil[isMovementAllowedKey] = __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func.isRequired, _DragDropContext$chil);

var isEqual$2 = function isEqual(base) {
  return function (value) {
    return base === value;
  };
};

var isScroll = isEqual$2('scroll');
var isAuto = isEqual$2('auto');
var isVisible$1 = isEqual$2('visible');

var isEither = function isEither(overflow, fn) {
  return fn(overflow.overflowX) || fn(overflow.overflowY);
};

var isBoth = function isBoth(overflow, fn) {
  return fn(overflow.overflowX) && fn(overflow.overflowY);
};

var isElementScrollable = function isElementScrollable(el) {
  var style = window.getComputedStyle(el);
  var overflow = {
    overflowX: style.overflowX,
    overflowY: style.overflowY
  };
  return isEither(overflow, isScroll) || isEither(overflow, isAuto);
};

var isBodyScrollable = function isBodyScrollable() {
  if (true) {
    return false;
  }

  var body = getBodyElement();
  var html = document.documentElement;
  !html ?  false ? invariant(false) : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;

  if (!isElementScrollable(body)) {
    return false;
  }

  var htmlStyle = window.getComputedStyle(html);
  var htmlOverflow = {
    overflowX: htmlStyle.overflowX,
    overflowY: htmlStyle.overflowY
  };

  if (isBoth(htmlOverflow, isVisible$1)) {
    return false;
  }

   false ? warning("\n    We have detected that your <body> element might be a scroll container.\n    We have found no reliable way of detecting whether the <body> element is a scroll container.\n    Under most circumstances a <body> scroll bar will be on the <html> element (document.documentElement)\n\n    Because we cannot determine if the <body> is a scroll container, and generally it is not one,\n    we will be treating the <body> as *not* a scroll container\n\n    More information: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/how-we-detect-scroll-containers.md\n  ") : void 0;
  return false;
};

var getClosestScrollable = function getClosestScrollable(el) {
  if (el == null) {
    return null;
  }

  if (el === document.body) {
    return isBodyScrollable() ? el : null;
  }

  if (el === document.documentElement) {
    return null;
  }

  if (!isElementScrollable(el)) {
    return getClosestScrollable(el.parentElement);
  }

  return el;
};

var checkForNestedScrollContainers = (function (scrollable) {
  if (!scrollable) {
    return;
  }

  var anotherScrollParent = getClosestScrollable(scrollable.parentElement);

  if (!anotherScrollParent) {
    return;
  }

   false ? warning("\n    Droppable: unsupported nested scroll container detected.\n    A Droppable can only have one scroll parent (which can be itself)\n    Nested scroll containers are currently not supported.\n\n    We hope to support nested scroll containers soon: https://github.com/atlassian/react-beautiful-dnd/issues/131\n  ") : void 0;
});

var getScroll$1 = (function (el) {
  return {
    x: el.scrollLeft,
    y: el.scrollTop
  };
});

var getIsFixed = function getIsFixed(el) {
  if (!el) {
    return false;
  }

  var style = window.getComputedStyle(el);

  if (style.position === 'fixed') {
    return true;
  }

  return getIsFixed(el.parentElement);
};

var getEnv = (function (start) {
  var closestScrollable = getClosestScrollable(start);
  var isFixedOnPage = getIsFixed(start);
  return {
    closestScrollable: closestScrollable,
    isFixedOnPage: isFixedOnPage
  };
});

var getClient = function getClient(targetRef, closestScrollable) {
  var base = Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["d" /* getBox */])(targetRef);

  if (!closestScrollable) {
    return base;
  }

  if (targetRef !== closestScrollable) {
    return base;
  }

  var top = base.paddingBox.top - closestScrollable.scrollTop;
  var left = base.paddingBox.left - closestScrollable.scrollLeft;
  var bottom = top + closestScrollable.scrollHeight;
  var right = left + closestScrollable.scrollWidth;
  var paddingBox = {
    top: top,
    right: right,
    bottom: bottom,
    left: left
  };
  var borderBox = Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["c" /* expand */])(paddingBox, base.border);
  var client = Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["b" /* createBox */])({
    borderBox: borderBox,
    margin: base.margin,
    border: base.border,
    padding: base.padding
  });
  return client;
};

var getDimension = (function (_ref) {
  var ref = _ref.ref,
      descriptor = _ref.descriptor,
      env = _ref.env,
      windowScroll = _ref.windowScroll,
      direction = _ref.direction,
      isDropDisabled = _ref.isDropDisabled,
      isCombineEnabled = _ref.isCombineEnabled,
      shouldClipSubject = _ref.shouldClipSubject;
  var closestScrollable = env.closestScrollable;
  var client = getClient(ref, closestScrollable);
  var page = Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["g" /* withScroll */])(client, windowScroll);

  var closest = function () {
    if (!closestScrollable) {
      return null;
    }

    var frameClient = Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["d" /* getBox */])(closestScrollable);
    var scrollSize = {
      scrollHeight: closestScrollable.scrollHeight,
      scrollWidth: closestScrollable.scrollWidth
    };
    return {
      client: frameClient,
      page: Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["g" /* withScroll */])(frameClient, windowScroll),
      scroll: getScroll$1(closestScrollable),
      scrollSize: scrollSize,
      shouldClipSubject: shouldClipSubject
    };
  }();

  var dimension = getDroppableDimension({
    descriptor: descriptor,
    isEnabled: !isDropDisabled,
    isCombineEnabled: isCombineEnabled,
    isFixedOnPage: env.isFixedOnPage,
    direction: direction,
    client: client,
    page: page,
    closest: closest
  });
  return dimension;
});

var _DroppableDimensionPu;

var getClosestScrollable$1 = function getClosestScrollable(dragging) {
  return dragging && dragging.env.closestScrollable || null;
};

var immediate = {
  passive: false
};
var delayed = {
  passive: true
};

var getListenerOptions = function getListenerOptions(options) {
  return options.shouldPublishImmediately ? immediate : delayed;
};

var withoutPlaceholder = function withoutPlaceholder(placeholder, fn) {
  if (!placeholder) {
    return fn();
  }

  var last = placeholder.style.display;
  placeholder.style.display = 'none';
  var result = fn();
  placeholder.style.display = last;
  return result;
};

var DroppableDimensionPublisher = function (_React$Component) {
  Object(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_corejs2_helpers_esm_inheritsLoose__["a" /* default */])(DroppableDimensionPublisher, _React$Component);

  function DroppableDimensionPublisher(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.dragging = void 0;
    _this.callbacks = void 0;
    _this.publishedDescriptor = null;

    _this.getClosestScroll = function () {
      var dragging = _this.dragging;

      if (!dragging || !dragging.env.closestScrollable) {
        return origin;
      }

      return getScroll$1(dragging.env.closestScrollable);
    };

    _this.memoizedUpdateScroll = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (x, y) {
      !_this.publishedDescriptor ?  false ? invariant(false, 'Cannot update scroll on unpublished droppable') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
      var newScroll = {
        x: x,
        y: y
      };
      var marshal = _this.context[dimensionMarshalKey];
      marshal.updateDroppableScroll(_this.publishedDescriptor.id, newScroll);
    });

    _this.updateScroll = function () {
      var scroll = _this.getClosestScroll();

      _this.memoizedUpdateScroll(scroll.x, scroll.y);
    };

    _this.scheduleScrollUpdate = Object(__WEBPACK_IMPORTED_MODULE_12_raf_schd__["a" /* default */])(_this.updateScroll);

    _this.onClosestScroll = function () {
      var dragging = _this.dragging;
      var closest = getClosestScrollable$1(_this.dragging);
      !(dragging && closest) ?  false ? invariant(false, 'Could not find scroll options while scrolling') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
      var options = dragging.scrollOptions;

      if (options.shouldPublishImmediately) {
        _this.updateScroll();

        return;
      }

      _this.scheduleScrollUpdate();
    };

    _this.scroll = function (change) {
      var closest = getClosestScrollable$1(_this.dragging);
      !closest ?  false ? invariant(false, 'Cannot scroll a droppable with no closest scrollable') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
      closest.scrollTop += change.y;
      closest.scrollLeft += change.x;
    };

    _this.dragStopped = function () {
      var dragging = _this.dragging;
      !dragging ?  false ? invariant(false, 'Cannot stop drag when no active drag') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
      var closest = getClosestScrollable$1(dragging);
      _this.dragging = null;

      if (!closest) {
        return;
      }

      _this.scheduleScrollUpdate.cancel();

      closest.removeEventListener('scroll', _this.onClosestScroll, getListenerOptions(dragging.scrollOptions));
    };

    _this.getMemoizedDescriptor = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (id, type) {
      return {
        id: id,
        type: type
      };
    });

    _this.publish = function () {
      var marshal = _this.context[dimensionMarshalKey];

      var descriptor = _this.getMemoizedDescriptor(_this.props.droppableId, _this.props.type);

      if (!_this.publishedDescriptor) {
        marshal.registerDroppable(descriptor, _this.callbacks);
        _this.publishedDescriptor = descriptor;
        return;
      }

      if (_this.publishedDescriptor === descriptor) {
        return;
      }

      marshal.updateDroppable(_this.publishedDescriptor, descriptor, _this.callbacks);
      _this.publishedDescriptor = descriptor;
    };

    _this.unpublish = function () {
      !_this.publishedDescriptor ?  false ? invariant(false, 'Cannot unpublish descriptor when none is published') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
      var marshal = _this.context[dimensionMarshalKey];
      marshal.unregisterDroppable(_this.publishedDescriptor);
      _this.publishedDescriptor = null;
    };

    _this.recollect = function (options) {
      var dragging = _this.dragging;
      var closest = getClosestScrollable$1(dragging);
      !(dragging && closest) ?  false ? invariant(false, 'Can only recollect Droppable client for Droppables that have a scroll container') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;

      var execute = function execute() {
        return getDimension({
          ref: dragging.ref,
          descriptor: dragging.descriptor,
          env: dragging.env,
          windowScroll: origin,
          direction: _this.props.direction,
          isDropDisabled: _this.props.isDropDisabled,
          isCombineEnabled: _this.props.isCombineEnabled,
          shouldClipSubject: !_this.props.ignoreContainerClipping
        });
      };

      if (!options.withoutPlaceholder) {
        return execute();
      }

      return withoutPlaceholder(_this.props.getPlaceholderRef(), execute);
    };

    _this.getDimensionAndWatchScroll = function (windowScroll, options) {
      !!_this.dragging ?  false ? invariant(false, 'Cannot collect a droppable while a drag is occurring') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
      var descriptor = _this.publishedDescriptor;
      !descriptor ?  false ? invariant(false, 'Cannot get dimension for unpublished droppable') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;

      var ref = _this.props.getDroppableRef();

      !ref ?  false ? invariant(false, 'Cannot collect without a droppable ref') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
      var env = getEnv(ref);
      var dragging = {
        ref: ref,
        descriptor: descriptor,
        env: env,
        scrollOptions: options
      };
      _this.dragging = dragging;
      var dimension = getDimension({
        ref: ref,
        descriptor: descriptor,
        env: env,
        windowScroll: windowScroll,
        direction: _this.props.direction,
        isDropDisabled: _this.props.isDropDisabled,
        isCombineEnabled: _this.props.isCombineEnabled,
        shouldClipSubject: !_this.props.ignoreContainerClipping
      });

      if (env.closestScrollable) {
        env.closestScrollable.addEventListener('scroll', _this.onClosestScroll, getListenerOptions(dragging.scrollOptions));

        if (false) {
          checkForNestedScrollContainers(env.closestScrollable);
        }
      }

      return dimension;
    };

    var callbacks = {
      getDimensionAndWatchScroll: _this.getDimensionAndWatchScroll,
      recollect: _this.recollect,
      dragStopped: _this.dragStopped,
      scroll: _this.scroll
    };
    _this.callbacks = callbacks;
    return _this;
  }

  var _proto = DroppableDimensionPublisher.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.publish();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    this.publish();

    if (!this.dragging) {
      return;
    }

    var isDisabledChanged = this.props.isDropDisabled !== prevProps.isDropDisabled;
    var isCombineChanged = this.props.isCombineEnabled !== prevProps.isCombineEnabled;

    if (!isDisabledChanged && !isCombineChanged) {
      return;
    }

    var marshal = this.context[dimensionMarshalKey];

    if (isDisabledChanged) {
      marshal.updateDroppableIsEnabled(this.props.droppableId, !this.props.isDropDisabled);
    }

    if (isCombineChanged) {
      marshal.updateDroppableIsCombineEnabled(this.props.droppableId, this.props.isCombineEnabled);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.dragging) {
       false ? warning('unmounting droppable while a drag is occurring') : void 0;
      this.dragStopped();
    }

    this.unpublish();
  };

  _proto.render = function render() {
    return this.props.children;
  };

  return DroppableDimensionPublisher;
}(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Component);

DroppableDimensionPublisher.contextTypes = (_DroppableDimensionPu = {}, _DroppableDimensionPu[dimensionMarshalKey] = __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object.isRequired, _DroppableDimensionPu);

var empty = {
  width: 0,
  height: 0,
  margin: noSpacing
};

var Placeholder = function (_PureComponent) {
  Object(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_corejs2_helpers_esm_inheritsLoose__["a" /* default */])(Placeholder, _PureComponent);

  function Placeholder() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;
    _this.mountTimerId = null;
    _this.state = {
      isAnimatingOpenOnMount: _this.props.animate === 'open'
    };

    _this.onTransitionEnd = function (event) {
      if (event.propertyName !== 'height') {
        return;
      }

      _this.props.onTransitionEnd();

      if (_this.props.animate === 'close') {
        _this.props.onClose();
      }
    };

    return _this;
  }

  Placeholder.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    if (state.isAnimatingOpenOnMount && props.animate !== 'open') {
      return {
        isAnimatingOpenOnMount: false
      };
    }

    return state;
  };

  var _proto = Placeholder.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (!this.state.isAnimatingOpenOnMount) {
      return;
    }

    this.mountTimerId = setTimeout(function () {
      _this2.mountTimerId = null;

      if (_this2.state.isAnimatingOpenOnMount) {
        _this2.setState({
          isAnimatingOpenOnMount: false
        });
      }
    });
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (!this.mountTimerId) {
      return;
    }

    clearTimeout(this.mountTimerId);
    this.mountTimerId = null;
  };

  _proto.getSize = function getSize() {
    if (this.state.isAnimatingOpenOnMount) {
      return empty;
    }

    if (this.props.animate === 'close') {
      return empty;
    }

    var placeholder = this.props.placeholder;
    return {
      height: placeholder.client.borderBox.height,
      width: placeholder.client.borderBox.width,
      margin: placeholder.client.margin
    };
  };

  _proto.render = function render() {
    var placeholder = this.props.placeholder;
    var size = this.getSize();
    var display = placeholder.display,
        tagName = placeholder.tagName;
    var style = {
      display: display,
      boxSizing: 'border-box',
      width: size.width,
      height: size.height,
      marginTop: size.margin.top,
      marginRight: size.margin.right,
      marginBottom: size.margin.bottom,
      marginLeft: size.margin.left,
      flexShrink: '0',
      flexGrow: '0',
      pointerEvents: 'none',
      transition: transitions.placeholder
    };
    return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(tagName, {
      style: style,
      onTransitionEnd: this.onTransitionEnd,
      ref: this.props.innerRef
    });
  };

  return Placeholder;
}(__WEBPACK_IMPORTED_MODULE_2_react__["PureComponent"]);

var getWindowFromEl = (function (el) {
  return el && el.ownerDocument ? el.ownerDocument.defaultView : window;
});

function isHtmlElement(el) {
  return el instanceof getWindowFromEl(el).HTMLElement;
}

var throwIfRefIsInvalid = (function (ref) {
  !(ref && isHtmlElement(ref)) ?  false ? invariant(false, "\n    provided.innerRef has not been provided with a HTMLElement.\n\n    You can find a guide on using the innerRef callback functions at:\n    https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/using-inner-ref.md\n  ") : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
});

var checkOwnProps = (function (props) {
  !props.droppableId ?  false ? invariant(false, 'A Droppable requires a droppableId prop') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  !(typeof props.isDropDisabled === 'boolean') ?  false ? invariant(false, 'isDropDisabled must be a boolean') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  !(typeof props.isCombineEnabled === 'boolean') ?  false ? invariant(false, 'isCombineEnabled must be a boolean') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  !(typeof props.ignoreContainerClipping === 'boolean') ?  false ? invariant(false, 'ignoreContainerClipping must be a boolean') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
});

var AnimateInOut = function (_React$PureComponent) {
  Object(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_corejs2_helpers_esm_inheritsLoose__["a" /* default */])(AnimateInOut, _React$PureComponent);

  function AnimateInOut() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;
    _this.state = {
      isVisible: Boolean(_this.props.on),
      data: _this.props.on,
      animate: _this.props.shouldAnimate && _this.props.on ? 'open' : 'none'
    };

    _this.onClose = function () {
      if (_this.state.animate !== 'close') {
        return;
      }

      _this.setState({
        isVisible: false
      });
    };

    return _this;
  }

  AnimateInOut.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    if (!props.shouldAnimate) {
      return {
        isVisible: Boolean(props.on),
        data: props.on,
        animate: 'none'
      };
    }

    if (props.on) {
      return {
        isVisible: true,
        data: props.on,
        animate: 'open'
      };
    }

    if (state.isVisible) {
      return {
        isVisible: true,
        data: state.data,
        animate: 'close'
      };
    }

    return {
      isVisible: false,
      animate: 'close',
      data: null
    };
  };

  var _proto = AnimateInOut.prototype;

  _proto.render = function render() {
    if (!this.state.isVisible) {
      return null;
    }

    var provided = {
      onClose: this.onClose,
      data: this.state.data,
      animate: this.state.animate
    };
    return this.props.children(provided);
  };

  return AnimateInOut;
}(__WEBPACK_IMPORTED_MODULE_2_react___default.a.PureComponent);

var _Droppable$contextTyp, _Droppable$childConte;

var Droppable = function (_React$Component) {
  Object(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_corejs2_helpers_esm_inheritsLoose__["a" /* default */])(Droppable, _React$Component);

  function Droppable(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.styleContext = void 0;
    _this.ref = null;
    _this.placeholderRef = null;

    _this.setPlaceholderRef = function (ref) {
      _this.placeholderRef = ref;
    };

    _this.getPlaceholderRef = function () {
      return _this.placeholderRef;
    };

    _this.setRef = function (ref) {
      if (ref === null) {
        return;
      }

      if (ref === _this.ref) {
        return;
      }

      _this.ref = ref;
      throwIfRefIsInvalid(ref);
    };

    _this.getDroppableRef = function () {
      return _this.ref;
    };

    _this.onPlaceholderTransitionEnd = function () {
      var isMovementAllowed = _this.context[isMovementAllowedKey]();

      if (isMovementAllowed) {
        _this.props.updateViewportMaxScroll({
          maxScroll: getMaxWindowScroll()
        });
      }
    };

    _this.styleContext = context[styleKey];

    if (false) {
      checkOwnProps(props);
    }

    return _this;
  }

  var _proto = Droppable.prototype;

  _proto.getChildContext = function getChildContext() {
    var _value;

    var value = (_value = {}, _value[droppableIdKey] = this.props.droppableId, _value[droppableTypeKey] = this.props.type, _value);
    return value;
  };

  _proto.componentDidMount = function componentDidMount() {
    throwIfRefIsInvalid(this.ref);
    this.warnIfPlaceholderNotMounted();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.warnIfPlaceholderNotMounted();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.ref = null;
    this.placeholderRef = null;
  };

  _proto.warnIfPlaceholderNotMounted = function warnIfPlaceholderNotMounted() {
    if (true) {
      return;
    }

    if (!this.props.placeholder) {
      return;
    }

    if (this.placeholderRef) {
      return;
    }

     false ? warning("\n      Droppable setup issue [droppableId: \"" + this.props.droppableId + "\"]:\n      DroppableProvided > placeholder could not be found.\n\n      Please be sure to add the {provided.placeholder} React Node as a child of your Droppable.\n      More information: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md\n    ") : void 0;
  };

  _proto.getPlaceholder = function getPlaceholder() {
    var _this2 = this;

    return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(AnimateInOut, {
      on: this.props.placeholder,
      shouldAnimate: this.props.shouldAnimatePlaceholder
    }, function (_ref) {
      var onClose = _ref.onClose,
          data = _ref.data,
          animate = _ref.animate;
      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(Placeholder, {
        placeholder: data,
        onClose: onClose,
        innerRef: _this2.setPlaceholderRef,
        animate: animate,
        onTransitionEnd: _this2.onPlaceholderTransitionEnd
      });
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        direction = _this$props.direction,
        type = _this$props.type,
        droppableId = _this$props.droppableId,
        isDropDisabled = _this$props.isDropDisabled,
        isCombineEnabled = _this$props.isCombineEnabled,
        ignoreContainerClipping = _this$props.ignoreContainerClipping,
        snapshot = _this$props.snapshot;
    var provided = {
      innerRef: this.setRef,
      placeholder: this.getPlaceholder(),
      droppableProps: {
        'data-react-beautiful-dnd-droppable': this.styleContext
      }
    };
    return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(DroppableDimensionPublisher, {
      droppableId: droppableId,
      type: type,
      direction: direction,
      ignoreContainerClipping: ignoreContainerClipping,
      isDropDisabled: isDropDisabled,
      isCombineEnabled: isCombineEnabled,
      getDroppableRef: this.getDroppableRef,
      getPlaceholderRef: this.getPlaceholderRef
    }, children(provided, snapshot));
  };

  return Droppable;
}(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Component);

Droppable.contextTypes = (_Droppable$contextTyp = {}, _Droppable$contextTyp[styleKey] = __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string.isRequired, _Droppable$contextTyp[isMovementAllowedKey] = __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func.isRequired, _Droppable$contextTyp);
Droppable.childContextTypes = (_Droppable$childConte = {}, _Droppable$childConte[droppableIdKey] = __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string.isRequired, _Droppable$childConte[droppableTypeKey] = __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string.isRequired, _Droppable$childConte);

var isStrictEqual = (function (a, b) {
  return a === b;
});

var whatIsDraggedOverFromResult = (function (result) {
  var combine = result.combine,
      destination = result.destination;

  if (destination) {
    return destination.droppableId;
  }

  if (combine) {
    return combine.droppableId;
  }

  return null;
});

var isMatchingType = function isMatchingType(type, critical) {
  return type === critical.droppable.type;
};

var getDraggable = function getDraggable(critical, dimensions) {
  return dimensions.draggables[critical.draggable.id];
};

var makeMapStateToProps = function makeMapStateToProps() {
  var idle = {
    placeholder: null,
    shouldAnimatePlaceholder: true,
    snapshot: {
      isDraggingOver: false,
      draggingOverWith: null,
      draggingFromThisWith: null
    }
  };

  var idleWithoutAnimation = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, idle, {
    shouldAnimatePlaceholder: false
  });

  var getMapProps = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (id, isDraggingOver, dragging, snapshot) {
    var isHome = dragging.descriptor.droppableId === id;

    if (isHome) {
      return {
        placeholder: dragging.placeholder,
        shouldAnimatePlaceholder: false,
        snapshot: snapshot
      };
    }

    if (!isDraggingOver) {
      return idle;
    }

    return {
      placeholder: dragging.placeholder,
      shouldAnimatePlaceholder: true,
      snapshot: snapshot
    };
  });
  var getSnapshot = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (id, isDraggingOver, dragging) {
    var draggableId = dragging.descriptor.id;
    var isHome = dragging.descriptor.droppableId === id;
    var draggingOverWith = isDraggingOver ? draggableId : null;
    var draggingFromThisWith = isHome ? draggableId : null;
    return {
      isDraggingOver: isDraggingOver,
      draggingOverWith: draggingOverWith,
      draggingFromThisWith: draggingFromThisWith
    };
  });

  var selector = function selector(state, ownProps) {
    var id = ownProps.droppableId;
    var type = ownProps.type;

    if (state.isDragging) {
      var critical = state.critical;

      if (!isMatchingType(type, critical)) {
        return idle;
      }

      var dragging = getDraggable(critical, state.dimensions);
      var isDraggingOver = whatIsDraggedOver(state.impact) === id;
      var snapshot = getSnapshot(id, isDraggingOver, dragging);
      return getMapProps(id, isDraggingOver, dragging, snapshot);
    }

    if (state.phase === 'DROP_ANIMATING') {
      var completed = state.completed;

      if (!isMatchingType(type, completed.critical)) {
        return idle;
      }

      var _dragging = getDraggable(completed.critical, state.dimensions);

      var _snapshot = getSnapshot(id, whatIsDraggedOverFromResult(completed.result) === id, _dragging);

      return getMapProps(id, whatIsDraggedOver(completed.impact) === id, _dragging, _snapshot);
    }

    if (state.phase === 'IDLE' && state.completed) {
      var _completed = state.completed;

      if (!isMatchingType(type, _completed.critical)) {
        return idle;
      }

      var wasOver = whatIsDraggedOver(_completed.impact) === id;
      var wasCombining = Boolean(_completed.impact.merge);

      if (state.shouldFlush) {
        return idleWithoutAnimation;
      }

      if (wasOver) {
        return wasCombining ? idle : idleWithoutAnimation;
      }

      return idle;
    }

    return idle;
  };

  return selector;
};
var mapDispatchToProps = {
  updateViewportMaxScroll: updateViewportMaxScroll
};
var defaultProps = {
  type: 'DEFAULT',
  direction: 'vertical',
  isDropDisabled: false,
  isCombineEnabled: false,
  ignoreContainerClipping: false
};
var ConnectedDroppable = Object(__WEBPACK_IMPORTED_MODULE_13_react_redux__["b" /* connect */])(makeMapStateToProps, mapDispatchToProps, null, {
  storeKey: storeKey,
  pure: true,
  areStatePropsEqual: isStrictEqual
})(Droppable);
ConnectedDroppable.defaultProps = defaultProps;

var _DraggableDimensionPu;

var DraggableDimensionPublisher = function (_Component) {
  Object(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_corejs2_helpers_esm_inheritsLoose__["a" /* default */])(DraggableDimensionPublisher, _Component);

  function DraggableDimensionPublisher() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.publishedDescriptor = null;
    _this.getMemoizedDescriptor = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (id, index, droppableId, type) {
      return {
        id: id,
        index: index,
        droppableId: droppableId,
        type: type
      };
    });

    _this.publish = function () {
      var marshal = _this.context[dimensionMarshalKey];

      var descriptor = _this.getMemoizedDescriptor(_this.props.draggableId, _this.props.index, _this.props.droppableId, _this.props.type);

      if (!_this.publishedDescriptor) {
        marshal.registerDraggable(descriptor, _this.getDimension);
        _this.publishedDescriptor = descriptor;
        return;
      }

      if (descriptor === _this.publishedDescriptor) {
        return;
      }

      marshal.updateDraggable(_this.publishedDescriptor, descriptor, _this.getDimension);
      _this.publishedDescriptor = descriptor;
    };

    _this.unpublish = function () {
      !_this.publishedDescriptor ?  false ? invariant(false, 'Cannot unpublish descriptor when none is published') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
      var marshal = _this.context[dimensionMarshalKey];
      marshal.unregisterDraggable(_this.publishedDescriptor);
      _this.publishedDescriptor = null;
    };

    _this.getDimension = function (windowScroll) {
      if (windowScroll === void 0) {
        windowScroll = origin;
      }

      var targetRef = _this.props.getDraggableRef();

      var descriptor = _this.publishedDescriptor;
      !targetRef ?  false ? invariant(false, 'DraggableDimensionPublisher cannot calculate a dimension when not attached to the DOM') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
      !descriptor ?  false ? invariant(false, 'Cannot get dimension for unpublished draggable') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
      var computedStyles = window.getComputedStyle(targetRef);
      var borderBox = targetRef.getBoundingClientRect();
      var client = Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["a" /* calculateBox */])(borderBox, computedStyles);
      var page = Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["g" /* withScroll */])(client, windowScroll);
      var placeholder = {
        client: client,
        tagName: targetRef.tagName.toLowerCase(),
        display: computedStyles.display
      };
      var displaceBy = {
        x: client.marginBox.width,
        y: client.marginBox.height
      };
      var dimension = {
        descriptor: descriptor,
        placeholder: placeholder,
        displaceBy: displaceBy,
        client: client,
        page: page
      };
      return dimension;
    };

    return _this;
  }

  var _proto = DraggableDimensionPublisher.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.publish();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.publish();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unpublish();
  };

  _proto.render = function render() {
    return this.props.children;
  };

  return DraggableDimensionPublisher;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);

DraggableDimensionPublisher.contextTypes = (_DraggableDimensionPu = {}, _DraggableDimensionPu[dimensionMarshalKey] = __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object.isRequired, _DraggableDimensionPu);

function isSvgElement(el) {
  return el instanceof getWindowFromEl(el).SVGElement;
}

var selector = "[" + dragHandle + "]";

var throwIfSVG = function throwIfSVG(el) {
  !!isSvgElement(el) ?  false ? invariant(false, "A drag handle cannot be an SVGElement: it has inconsistent focus support.\n\n    More information: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/dragging-svgs.md") : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
};

var getDragHandleRef = function getDragHandleRef(draggableRef) {
  if (draggableRef.hasAttribute(dragHandle)) {
    throwIfSVG(draggableRef);
    return draggableRef;
  }

  var el = draggableRef.querySelector(selector);
  throwIfSVG(draggableRef);
  !el ?  false ? invariant(false, "\n      Cannot find drag handle element inside of Draggable.\n      Please be sure to apply the {...provided.dragHandleProps} to your Draggable\n\n      More information: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/draggable.md\n    ") : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  !isHtmlElement(el) ?  false ? invariant(false, 'A drag handle must be a HTMLElement') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  return el;
};

var retainingFocusFor = null;
var listenerOptions = {
  capture: true
};

var clearRetentionOnFocusChange = function () {
  var isBound = false;

  var bind = function bind() {
    if (isBound) {
      return;
    }

    isBound = true;
    window.addEventListener('focus', onWindowFocusChange, listenerOptions);
  };

  var unbind = function unbind() {
    if (!isBound) {
      return;
    }

    isBound = false;
    window.removeEventListener('focus', onWindowFocusChange, listenerOptions);
  };

  var onWindowFocusChange = function onWindowFocusChange() {
    unbind();
    retainingFocusFor = null;
  };

  var result = function result() {
    return bind();
  };

  result.cancel = function () {
    return unbind();
  };

  return result;
}();

var retain = function retain(id) {
  retainingFocusFor = id;
  clearRetentionOnFocusChange();
};

var tryRestoreFocus = function tryRestoreFocus(id, draggableRef) {
  if (!retainingFocusFor) {
    return;
  }

  if (id !== retainingFocusFor) {
    return;
  }

  retainingFocusFor = null;
  clearRetentionOnFocusChange.cancel();
  var dragHandleRef = getDragHandleRef(draggableRef);

  if (!dragHandleRef) {
     false ? warning('Could not find drag handle in the DOM to focus on it') : void 0;
    return;
  }

  dragHandleRef.focus();
};

var retainer = {
  retain: retain,
  tryRestoreFocus: tryRestoreFocus
};

function isElement(el) {
  return el instanceof getWindowFromEl(el).Element;
}

var interactiveTagNames = {
  input: true,
  button: true,
  textarea: true,
  select: true,
  option: true,
  optgroup: true,
  video: true,
  audio: true
};

var isAnInteractiveElement = function isAnInteractiveElement(parent, current) {
  if (current == null) {
    return false;
  }

  var hasAnInteractiveTag = Boolean(interactiveTagNames[current.tagName.toLowerCase()]);

  if (hasAnInteractiveTag) {
    return true;
  }

  var attribute = current.getAttribute('contenteditable');

  if (attribute === 'true' || attribute === '') {
    return true;
  }

  if (current === parent) {
    return false;
  }

  return isAnInteractiveElement(parent, current.parentElement);
};

var shouldAllowDraggingFromTarget = (function (event, props) {
  if (props.canDragInteractiveElements) {
    return true;
  }

  var target = event.target,
      currentTarget = event.currentTarget;

  if (!isElement(target) || !isElement(currentTarget)) {
    return true;
  }

  return !isAnInteractiveElement(currentTarget, target);
});

var createScheduler = (function (callbacks) {
  var memoizedMove = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (x, y) {
    var point = {
      x: x,
      y: y
    };
    callbacks.onMove(point);
  });
  var move = Object(__WEBPACK_IMPORTED_MODULE_12_raf_schd__["a" /* default */])(function (point) {
    return memoizedMove(point.x, point.y);
  });
  var moveUp = Object(__WEBPACK_IMPORTED_MODULE_12_raf_schd__["a" /* default */])(callbacks.onMoveUp);
  var moveDown = Object(__WEBPACK_IMPORTED_MODULE_12_raf_schd__["a" /* default */])(callbacks.onMoveDown);
  var moveRight = Object(__WEBPACK_IMPORTED_MODULE_12_raf_schd__["a" /* default */])(callbacks.onMoveRight);
  var moveLeft = Object(__WEBPACK_IMPORTED_MODULE_12_raf_schd__["a" /* default */])(callbacks.onMoveLeft);
  var windowScrollMove = Object(__WEBPACK_IMPORTED_MODULE_12_raf_schd__["a" /* default */])(callbacks.onWindowScroll);

  var cancel = function cancel() {
    move.cancel();
    moveUp.cancel();
    moveDown.cancel();
    moveRight.cancel();
    moveLeft.cancel();
    windowScrollMove.cancel();
  };

  return {
    move: move,
    moveUp: moveUp,
    moveDown: moveDown,
    moveRight: moveRight,
    moveLeft: moveLeft,
    windowScrollMove: windowScrollMove,
    cancel: cancel
  };
});

var sloppyClickThreshold = 5;
var isSloppyClickThresholdExceeded = (function (original, current) {
  return Math.abs(current.x - original.x) >= sloppyClickThreshold || Math.abs(current.y - original.y) >= sloppyClickThreshold;
});

var tab = 9;
var enter = 13;
var escape = 27;
var space = 32;
var pageUp = 33;
var pageDown = 34;
var end = 35;
var home = 36;
var arrowLeft = 37;
var arrowUp = 38;
var arrowRight = 39;
var arrowDown = 40;

var _preventedKeys;
var preventedKeys = (_preventedKeys = {}, _preventedKeys[enter] = true, _preventedKeys[tab] = true, _preventedKeys);
var preventStandardKeyEvents = (function (event) {
  if (preventedKeys[event.keyCode]) {
    event.preventDefault();
  }
});

var getOptions = function getOptions(shared, fromBinding) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, shared, fromBinding);
};

var bindEvents = function bindEvents(el, bindings, sharedOptions) {
  bindings.forEach(function (binding) {
    var options = getOptions(sharedOptions, binding.options);
    el.addEventListener(binding.eventName, binding.fn, options);
  });
};
var unbindEvents = function unbindEvents(el, bindings, sharedOptions) {
  bindings.forEach(function (binding) {
    var options = getOptions(sharedOptions, binding.options);
    el.removeEventListener(binding.eventName, binding.fn, options);
  });
};

var sharedOptions = {
  capture: true
};
var createPostDragEventPreventer = (function (getWindow) {
  var isBound = false;

  var bind = function bind() {
    if (isBound) {
      return;
    }

    isBound = true;
    bindEvents(getWindow(), pointerEvents, sharedOptions);
  };

  var unbind = function unbind() {
    if (!isBound) {
      return;
    }

    isBound = false;
    unbindEvents(getWindow(), pointerEvents, sharedOptions);
  };

  var pointerEvents = [{
    eventName: 'click',
    fn: function fn(event) {
      event.preventDefault();
      unbind();
    }
  }, {
    eventName: 'mousedown',
    fn: unbind
  }, {
    eventName: 'touchstart',
    fn: unbind
  }];

  var preventNext = function preventNext() {
    if (isBound) {
      unbind();
    }

    bind();
  };

  var preventer = {
    preventNext: preventNext,
    abort: unbind
  };
  return preventer;
});

var createEventMarshal = (function () {
  var isMouseDownHandled = false;

  var handle = function handle() {
    !!isMouseDownHandled ?  false ? invariant(false, 'Cannot handle mouse down as it is already handled') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
    isMouseDownHandled = true;
  };

  var isHandled = function isHandled() {
    return isMouseDownHandled;
  };

  var reset = function reset() {
    isMouseDownHandled = false;
  };

  return {
    handle: handle,
    isHandled: isHandled,
    reset: reset
  };
});

var supportedEventName = function () {
  var base = 'visibilitychange';

  if (typeof document === 'undefined') {
    return base;
  }

  var candidates = [base, "ms" + base, "webkit" + base, "moz" + base, "o" + base];
  var supported = find(candidates, function (eventName) {
    return "on" + eventName in document;
  });
  return supported || base;
}();

var primaryButton = 0;

var noop = function noop() {};

var mouseDownMarshal = createEventMarshal();
var createMouseSensor = (function (_ref) {
  var callbacks = _ref.callbacks,
      getWindow = _ref.getWindow,
      canStartCapturing = _ref.canStartCapturing,
      getShouldRespectForceTouch = _ref.getShouldRespectForceTouch;
  var state = {
    isDragging: false,
    pending: null
  };

  var setState = function setState(newState) {
    state = newState;
  };

  var isDragging = function isDragging() {
    return state.isDragging;
  };

  var isCapturing = function isCapturing() {
    return Boolean(state.pending || state.isDragging);
  };

  var schedule = createScheduler(callbacks);
  var postDragEventPreventer = createPostDragEventPreventer(getWindow);

  var startDragging = function startDragging(fn) {
    if (fn === void 0) {
      fn = noop;
    }

    setState({
      pending: null,
      isDragging: true
    });
    fn();
  };

  var stopDragging = function stopDragging(fn, shouldBlockClick) {
    if (fn === void 0) {
      fn = noop;
    }

    if (shouldBlockClick === void 0) {
      shouldBlockClick = true;
    }

    schedule.cancel();
    unbindWindowEvents();
    mouseDownMarshal.reset();

    if (shouldBlockClick) {
      postDragEventPreventer.preventNext();
    }

    setState({
      isDragging: false,
      pending: null
    });
    fn();
  };

  var startPendingDrag = function startPendingDrag(point) {
    setState({
      pending: point,
      isDragging: false
    });
    bindWindowEvents();
  };

  var stopPendingDrag = function stopPendingDrag() {
    stopDragging(noop, false);
  };

  var kill = function kill(fn) {
    if (fn === void 0) {
      fn = noop;
    }

    if (state.pending) {
      stopPendingDrag();
      return;
    }

    if (state.isDragging) {
      stopDragging(fn);
    }
  };

  var unmount = function unmount() {
    kill();
    postDragEventPreventer.abort();
  };

  var cancel = function cancel() {
    kill(callbacks.onCancel);
  };

  var windowBindings = [{
    eventName: 'mousemove',
    fn: function fn(event) {
      var button = event.button,
          clientX = event.clientX,
          clientY = event.clientY;

      if (button !== primaryButton) {
        return;
      }

      var point = {
        x: clientX,
        y: clientY
      };

      if (state.isDragging) {
        event.preventDefault();
        schedule.move(point);
        return;
      }

      if (!state.pending) {
        stopPendingDrag();
         false ? invariant(false, 'Expected there to be an active or pending drag when window mousemove event is received') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false);
      }

      if (!isSloppyClickThresholdExceeded(state.pending, point)) {
        return;
      }

      event.preventDefault();
      startDragging(function () {
        return callbacks.onLift({
          clientSelection: point,
          movementMode: 'FLUID'
        });
      });
    }
  }, {
    eventName: 'mouseup',
    fn: function fn(event) {
      if (state.pending) {
        stopPendingDrag();
        return;
      }

      event.preventDefault();
      stopDragging(callbacks.onDrop);
    }
  }, {
    eventName: 'mousedown',
    fn: function fn(event) {
      if (state.isDragging) {
        event.preventDefault();
      }

      stopDragging(callbacks.onCancel);
    }
  }, {
    eventName: 'keydown',
    fn: function fn(event) {
      if (!state.isDragging) {
        cancel();
        return;
      }

      if (event.keyCode === escape) {
        event.preventDefault();
        cancel();
        return;
      }

      preventStandardKeyEvents(event);
    }
  }, {
    eventName: 'resize',
    fn: cancel
  }, {
    eventName: 'scroll',
    options: {
      passive: true,
      capture: false
    },
    fn: function fn(event) {
      if (event.currentTarget !== getWindow()) {
        return;
      }

      if (state.pending) {
        stopPendingDrag();
        return;
      }

      schedule.windowScrollMove();
    }
  }, {
    eventName: 'webkitmouseforcechanged',
    fn: function fn(event) {
      if (event.webkitForce == null || MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN == null) {
         false ? warning('handling a mouse force changed event when it is not supported') : void 0;
        return;
      }

      var forcePressThreshold = MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN;
      var isForcePressing = event.webkitForce >= forcePressThreshold;

      if (!getShouldRespectForceTouch()) {
        event.preventDefault();
        return;
      }

      if (isForcePressing) {
        cancel();
      }
    }
  }, {
    eventName: supportedEventName,
    fn: cancel
  }];

  var bindWindowEvents = function bindWindowEvents() {
    var win = getWindow();
    bindEvents(win, windowBindings, {
      capture: true
    });
  };

  var unbindWindowEvents = function unbindWindowEvents() {
    var win = getWindow();
    unbindEvents(win, windowBindings, {
      capture: true
    });
  };

  var onMouseDown = function onMouseDown(event) {
    if (mouseDownMarshal.isHandled()) {
      return;
    }

    !!isCapturing() ?  false ? invariant(false, 'Should not be able to perform a mouse down while a drag or pending drag is occurring') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;

    if (!canStartCapturing(event)) {
      return;
    }

    if (event.button !== primaryButton) {
      return;
    }

    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }

    mouseDownMarshal.handle();
    event.preventDefault();
    var point = {
      x: event.clientX,
      y: event.clientY
    };
    startPendingDrag(point);
  };

  var sensor = {
    onMouseDown: onMouseDown,
    kill: kill,
    isCapturing: isCapturing,
    isDragging: isDragging,
    unmount: unmount
  };
  return sensor;
});

var getBorderBoxCenterPosition = (function (el) {
  return Object(__WEBPACK_IMPORTED_MODULE_6_css_box_model__["e" /* getRect */])(el.getBoundingClientRect()).center;
});

var _scrollJumpKeys;
var scrollJumpKeys = (_scrollJumpKeys = {}, _scrollJumpKeys[pageDown] = true, _scrollJumpKeys[pageUp] = true, _scrollJumpKeys[home] = true, _scrollJumpKeys[end] = true, _scrollJumpKeys);

var noop$1 = function noop() {};

var createKeyboardSensor = (function (_ref) {
  var callbacks = _ref.callbacks,
      getWindow = _ref.getWindow,
      getDraggableRef = _ref.getDraggableRef,
      canStartCapturing = _ref.canStartCapturing;
  var state = {
    isDragging: false
  };

  var setState = function setState(newState) {
    state = newState;
  };

  var startDragging = function startDragging(fn) {
    if (fn === void 0) {
      fn = noop$1;
    }

    setState({
      isDragging: true
    });
    bindWindowEvents();
    fn();
  };

  var stopDragging = function stopDragging(postDragFn) {
    if (postDragFn === void 0) {
      postDragFn = noop$1;
    }

    schedule.cancel();
    unbindWindowEvents();
    setState({
      isDragging: false
    });
    postDragFn();
  };

  var kill = function kill() {
    if (state.isDragging) {
      stopDragging();
    }
  };

  var cancel = function cancel() {
    stopDragging(callbacks.onCancel);
  };

  var isDragging = function isDragging() {
    return state.isDragging;
  };

  var schedule = createScheduler(callbacks);

  var onKeyDown = function onKeyDown(event) {
    if (!isDragging()) {
      if (event.defaultPrevented) {
        return;
      }

      if (!canStartCapturing(event)) {
        return;
      }

      if (event.keyCode !== space) {
        return;
      }

      var ref = getDraggableRef();
      !ref ?  false ? invariant(false, 'Cannot start a keyboard drag without a draggable ref') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
      var center = getBorderBoxCenterPosition(ref);
      event.preventDefault();
      startDragging(function () {
        return callbacks.onLift({
          clientSelection: center,
          movementMode: 'SNAP'
        });
      });
      return;
    }

    if (event.keyCode === escape) {
      event.preventDefault();
      cancel();
      return;
    }

    if (event.keyCode === space) {
      event.preventDefault();
      stopDragging(callbacks.onDrop);
      return;
    }

    if (event.keyCode === arrowDown) {
      event.preventDefault();
      schedule.moveDown();
      return;
    }

    if (event.keyCode === arrowUp) {
      event.preventDefault();
      schedule.moveUp();
      return;
    }

    if (event.keyCode === arrowRight) {
      event.preventDefault();
      schedule.moveRight();
      return;
    }

    if (event.keyCode === arrowLeft) {
      event.preventDefault();
      schedule.moveLeft();
      return;
    }

    if (scrollJumpKeys[event.keyCode]) {
      event.preventDefault();
      return;
    }

    preventStandardKeyEvents(event);
  };

  var windowBindings = [{
    eventName: 'mousedown',
    fn: cancel
  }, {
    eventName: 'mouseup',
    fn: cancel
  }, {
    eventName: 'click',
    fn: cancel
  }, {
    eventName: 'touchstart',
    fn: cancel
  }, {
    eventName: 'resize',
    fn: cancel
  }, {
    eventName: 'wheel',
    fn: cancel,
    options: {
      passive: true
    }
  }, {
    eventName: 'scroll',
    options: {
      capture: false
    },
    fn: function fn(event) {
      if (event.currentTarget !== getWindow()) {
        return;
      }

      callbacks.onWindowScroll();
    }
  }, {
    eventName: supportedEventName,
    fn: cancel
  }];

  var bindWindowEvents = function bindWindowEvents() {
    bindEvents(getWindow(), windowBindings, {
      capture: true
    });
  };

  var unbindWindowEvents = function unbindWindowEvents() {
    unbindEvents(getWindow(), windowBindings, {
      capture: true
    });
  };

  var sensor = {
    onKeyDown: onKeyDown,
    kill: kill,
    isDragging: isDragging,
    isCapturing: isDragging,
    unmount: kill
  };
  return sensor;
});

var timeForLongPress = 150;
var forcePressThreshold = 0.15;
var touchStartMarshal = createEventMarshal();

var noop$2 = function noop() {};

var webkitHack = function () {
  var stub = {
    preventTouchMove: noop$2,
    releaseTouchMove: noop$2
  };

  if (typeof window === 'undefined') {
    return stub;
  }

  if (!('ontouchstart' in window)) {
    return stub;
  }

  var isBlocking = false;
  window.addEventListener('touchmove', function (event) {
    if (!isBlocking) {
      return;
    }

    if (event.defaultPrevented) {
      return;
    }

    event.preventDefault();
  }, {
    passive: false,
    capture: false
  });

  var preventTouchMove = function preventTouchMove() {
    isBlocking = true;
  };

  var releaseTouchMove = function releaseTouchMove() {
    isBlocking = false;
  };

  return {
    preventTouchMove: preventTouchMove,
    releaseTouchMove: releaseTouchMove
  };
}();

var initial = {
  isDragging: false,
  pending: null,
  hasMoved: false,
  longPressTimerId: null
};
var createTouchSensor = (function (_ref) {
  var callbacks = _ref.callbacks,
      getWindow = _ref.getWindow,
      canStartCapturing = _ref.canStartCapturing,
      getShouldRespectForceTouch = _ref.getShouldRespectForceTouch;
  var state = initial;

  var setState = function setState(partial) {
    state = Object(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_corejs2_helpers_esm_extends__["a" /* default */])({}, state, partial);
  };

  var isDragging = function isDragging() {
    return state.isDragging;
  };

  var isCapturing = function isCapturing() {
    return Boolean(state.pending || state.isDragging || state.longPressTimerId);
  };

  var schedule = createScheduler(callbacks);
  var postDragEventPreventer = createPostDragEventPreventer(getWindow);

  var startDragging = function startDragging() {
    var pending = state.pending;

    if (!pending) {
      stopPendingDrag();
       false ? invariant(false, 'cannot start a touch drag without a pending position') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false);
    }

    setState({
      isDragging: true,
      hasMoved: false,
      pending: null,
      longPressTimerId: null
    });
    callbacks.onLift({
      clientSelection: pending,
      movementMode: 'FLUID'
    });
  };

  var stopDragging = function stopDragging(fn) {
    if (fn === void 0) {
      fn = noop$2;
    }

    schedule.cancel();
    touchStartMarshal.reset();
    webkitHack.releaseTouchMove();
    unbindWindowEvents();
    postDragEventPreventer.preventNext();
    setState(initial);
    fn();
  };

  var startPendingDrag = function startPendingDrag(event) {
    var touch = event.touches[0];
    var clientX = touch.clientX,
        clientY = touch.clientY;
    var point = {
      x: clientX,
      y: clientY
    };
    var longPressTimerId = setTimeout(startDragging, timeForLongPress);
    setState({
      longPressTimerId: longPressTimerId,
      pending: point,
      isDragging: false,
      hasMoved: false
    });
    bindWindowEvents();
  };

  var stopPendingDrag = function stopPendingDrag() {
    if (state.longPressTimerId) {
      clearTimeout(state.longPressTimerId);
    }

    schedule.cancel();
    touchStartMarshal.reset();
    webkitHack.releaseTouchMove();
    unbindWindowEvents();
    setState(initial);
  };

  var kill = function kill(fn) {
    if (fn === void 0) {
      fn = noop$2;
    }

    if (state.pending) {
      stopPendingDrag();
      return;
    }

    if (state.isDragging) {
      stopDragging(fn);
    }
  };

  var unmount = function unmount() {
    kill();
    postDragEventPreventer.abort();
  };

  var cancel = function cancel() {
    kill(callbacks.onCancel);
  };

  var windowBindings = [{
    eventName: 'touchmove',
    options: {
      passive: false
    },
    fn: function fn(event) {
      if (!state.isDragging) {
        stopPendingDrag();
        return;
      }

      if (!state.hasMoved) {
        setState({
          hasMoved: true
        });
      }

      var _event$touches$ = event.touches[0],
          clientX = _event$touches$.clientX,
          clientY = _event$touches$.clientY;
      var point = {
        x: clientX,
        y: clientY
      };
      event.preventDefault();
      schedule.move(point);
    }
  }, {
    eventName: 'touchend',
    fn: function fn(event) {
      if (!state.isDragging) {
        stopPendingDrag();
        return;
      }

      event.preventDefault();
      stopDragging(callbacks.onDrop);
    }
  }, {
    eventName: 'touchcancel',
    fn: function fn(event) {
      if (!state.isDragging) {
        stopPendingDrag();
        return;
      }

      event.preventDefault();
      stopDragging(callbacks.onCancel);
    }
  }, {
    eventName: 'touchstart',
    fn: cancel
  }, {
    eventName: 'orientationchange',
    fn: cancel
  }, {
    eventName: 'resize',
    fn: cancel
  }, {
    eventName: 'scroll',
    options: {
      passive: true,
      capture: false
    },
    fn: function fn() {
      if (state.pending) {
        stopPendingDrag();
        return;
      }

      schedule.windowScrollMove();
    }
  }, {
    eventName: 'contextmenu',
    fn: function fn(event) {
      event.preventDefault();
    }
  }, {
    eventName: 'keydown',
    fn: function fn(event) {
      if (!state.isDragging) {
        cancel();
        return;
      }

      if (event.keyCode === escape) {
        event.preventDefault();
      }

      cancel();
    }
  }, {
    eventName: 'touchforcechange',
    fn: function fn(event) {
      if (!state.isDragging && !state.pending) {
        return;
      }

      if (state.hasMoved) {
        event.preventDefault();
        return;
      }

      if (!getShouldRespectForceTouch()) {
        event.preventDefault();
        return;
      }

      var touch = event.touches[0];

      if (touch.force >= forcePressThreshold) {
        cancel();
      }
    }
  }, {
    eventName: supportedEventName,
    fn: cancel
  }];

  var bindWindowEvents = function bindWindowEvents() {
    bindEvents(getWindow(), windowBindings, {
      capture: true
    });
  };

  var unbindWindowEvents = function unbindWindowEvents() {
    unbindEvents(getWindow(), windowBindings, {
      capture: true
    });
  };

  var onTouchStart = function onTouchStart(event) {
    if (touchStartMarshal.isHandled()) {
      return;
    }

    !!isCapturing() ?  false ? invariant(false, 'Should not be able to perform a touch start while a drag or pending drag is occurring') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;

    if (!canStartCapturing(event)) {
      return;
    }

    touchStartMarshal.handle();
    webkitHack.preventTouchMove();
    startPendingDrag(event);
  };

  var sensor = {
    onTouchStart: onTouchStart,
    kill: kill,
    isCapturing: isCapturing,
    isDragging: isDragging,
    unmount: unmount
  };
  return sensor;
});

var _DragHandle$contextTy;

var preventHtml5Dnd = function preventHtml5Dnd(event) {
  event.preventDefault();
};

var DragHandle = function (_Component) {
  Object(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_corejs2_helpers_esm_inheritsLoose__["a" /* default */])(DragHandle, _Component);

  function DragHandle(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    _this.mouseSensor = void 0;
    _this.keyboardSensor = void 0;
    _this.touchSensor = void 0;
    _this.sensors = void 0;
    _this.styleContext = void 0;
    _this.canLift = void 0;
    _this.isFocused = false;
    _this.lastDraggableRef = void 0;

    _this.onFocus = function () {
      _this.isFocused = true;
    };

    _this.onBlur = function () {
      _this.isFocused = false;
    };

    _this.onKeyDown = function (event) {
      if (_this.mouseSensor.isCapturing() || _this.touchSensor.isCapturing()) {
        return;
      }

      _this.keyboardSensor.onKeyDown(event);
    };

    _this.onMouseDown = function (event) {
      if (_this.keyboardSensor.isCapturing() || _this.mouseSensor.isCapturing()) {
        return;
      }

      _this.mouseSensor.onMouseDown(event);
    };

    _this.onTouchStart = function (event) {
      if (_this.mouseSensor.isCapturing() || _this.keyboardSensor.isCapturing()) {
        return;
      }

      _this.touchSensor.onTouchStart(event);
    };

    _this.canStartCapturing = function (event) {
      if (_this.isAnySensorCapturing()) {
        return false;
      }

      if (!_this.canLift(_this.props.draggableId)) {
        return false;
      }

      return shouldAllowDraggingFromTarget(event, _this.props);
    };

    _this.isAnySensorCapturing = function () {
      return _this.sensors.some(function (sensor) {
        return sensor.isCapturing();
      });
    };

    _this.getProvided = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (isEnabled) {
      if (!isEnabled) {
        return null;
      }

      var provided = {
        onMouseDown: _this.onMouseDown,
        onKeyDown: _this.onKeyDown,
        onTouchStart: _this.onTouchStart,
        onFocus: _this.onFocus,
        onBlur: _this.onBlur,
        tabIndex: 0,
        'data-react-beautiful-dnd-drag-handle': _this.styleContext,
        'aria-roledescription': 'Draggable item. Press space bar to lift',
        draggable: false,
        onDragStart: preventHtml5Dnd
      };
      return provided;
    });

    var getWindow = function getWindow() {
      return getWindowFromEl(_this.props.getDraggableRef());
    };

    var args = {
      callbacks: _this.props.callbacks,
      getDraggableRef: _this.props.getDraggableRef,
      getWindow: getWindow,
      canStartCapturing: _this.canStartCapturing,
      getShouldRespectForceTouch: _this.props.getShouldRespectForceTouch
    };
    _this.mouseSensor = createMouseSensor(args);
    _this.keyboardSensor = createKeyboardSensor(args);
    _this.touchSensor = createTouchSensor(args);
    _this.sensors = [_this.mouseSensor, _this.keyboardSensor, _this.touchSensor];
    _this.styleContext = context[styleKey];
    _this.canLift = context[canLiftKey];
    return _this;
  }

  var _proto = DragHandle.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var draggableRef = this.props.getDraggableRef();
    this.lastDraggableRef = draggableRef;
    !draggableRef ?  false ? invariant(false, 'Cannot get draggable ref from drag handle') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;

    if (!this.props.isEnabled) {
      return;
    }

    var dragHandleRef = getDragHandleRef(draggableRef);
    retainer.tryRestoreFocus(this.props.draggableId, dragHandleRef);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this2 = this;

    var ref = this.props.getDraggableRef();

    if (ref !== this.lastDraggableRef) {
      this.lastDraggableRef = ref;

      if (ref && this.isFocused && this.props.isEnabled) {
        getDragHandleRef(ref).focus();
      }
    }

    var isCapturing = this.isAnySensorCapturing();

    if (!isCapturing) {
      return;
    }

    var isBeingDisabled = prevProps.isEnabled && !this.props.isEnabled;

    if (isBeingDisabled) {
      this.sensors.forEach(function (sensor) {
        if (!sensor.isCapturing()) {
          return;
        }

        var wasDragging = sensor.isDragging();
        sensor.kill();

        if (wasDragging) {
           false ? warning('You have disabled dragging on a Draggable while it was dragging. The drag has been cancelled') : void 0;

          _this2.props.callbacks.onCancel();
        }
      });
    }

    var isDragAborted = prevProps.isDragging && !this.props.isDragging;

    if (isDragAborted) {
      this.sensors.forEach(function (sensor) {
        if (sensor.isCapturing()) {
          sensor.kill();
        }
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var _this3 = this;

    this.sensors.forEach(function (sensor) {
      var wasDragging = sensor.isDragging();
      sensor.unmount();

      if (wasDragging) {
        _this3.props.callbacks.onCancel();
      }
    });

    var shouldRetainFocus = function () {
      if (!_this3.props.isEnabled) {
        return false;
      }

      if (!_this3.isFocused) {
        return false;
      }

      return _this3.props.isDragging || _this3.props.isDropAnimating;
    }();

    if (shouldRetainFocus) {
      retainer.retain(this.props.draggableId);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        isEnabled = _this$props.isEnabled;
    return children(this.getProvided(isEnabled));
  };

  return DragHandle;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);

DragHandle.contextTypes = (_DragHandle$contextTy = {}, _DragHandle$contextTy[styleKey] = __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string.isRequired, _DragHandle$contextTy[canLiftKey] = __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func.isRequired, _DragHandle$contextTy);

var zIndexOptions = {
  dragging: 5000,
  dropAnimating: 4500
};

var getDraggingTransition = function getDraggingTransition(shouldAnimateDragMovement, dropping) {
  if (dropping) {
    return transitions.drop(dropping.duration);
  }

  if (shouldAnimateDragMovement) {
    return transitions.snap;
  }

  return transitions.fluid;
};

var getDraggingOpacity = function getDraggingOpacity(isCombining, isDropAnimating) {
  if (!isCombining) {
    return null;
  }

  return isDropAnimating ? combine.opacity.drop : combine.opacity.combining;
};

var getShouldDraggingAnimate = function getShouldDraggingAnimate(dragging) {
  if (dragging.forceShouldAnimate != null) {
    return dragging.forceShouldAnimate;
  }

  return dragging.mode === 'SNAP';
};

function getDraggingStyle(dragging) {
  var dimension = dragging.dimension;
  var box = dimension.client;
  var offset = dragging.offset,
      combineWith = dragging.combineWith,
      dropping = dragging.dropping;
  var isCombining = Boolean(combineWith);
  var shouldAnimate = getShouldDraggingAnimate(dragging);
  var isDropAnimating = Boolean(dropping);
  var transform = isDropAnimating ? transforms.drop(offset, isCombining) : transforms.moveTo(offset);
  var style = {
    position: 'fixed',
    top: box.marginBox.top,
    left: box.marginBox.left,
    boxSizing: 'border-box',
    width: box.borderBox.width,
    height: box.borderBox.height,
    transition: getDraggingTransition(shouldAnimate, dropping),
    transform: transform,
    opacity: getDraggingOpacity(isCombining, isDropAnimating),
    zIndex: isDropAnimating ? zIndexOptions.dropAnimating : zIndexOptions.dragging,
    pointerEvents: 'none'
  };
  return style;
}

function getSecondaryStyle(secondary) {
  return {
    transform: transforms.moveTo(secondary.offset),
    transition: secondary.shouldAnimateDisplacement ? null : 'none'
  };
}

function getStyle(mapped) {
  return mapped.type === 'DRAGGING' ? getDraggingStyle(mapped) : getSecondaryStyle(mapped);
}

var checkOwnProps$1 = (function (props) {
  !__WEBPACK_IMPORTED_MODULE_14__babel_runtime_corejs2_core_js_number_is_integer___default()(props.index) ?  false ? invariant(false, 'Draggable requires an integer index prop') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  !props.draggableId ?  false ? invariant(false, 'Draggable requires a draggableId') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
  !(typeof props.isDragDisabled === 'boolean') ?  false ? invariant(false, 'isDragDisabled must be a boolean') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
});

var _Draggable$contextTyp;

var Draggable = function (_React$Component) {
  Object(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_corejs2_helpers_esm_inheritsLoose__["a" /* default */])(Draggable, _React$Component);

  function Draggable(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.callbacks = void 0;
    _this.styleContext = void 0;
    _this.ref = null;

    _this.onMoveEnd = function (event) {
      var mapped = _this.props.mapped;
      var isDropping = mapped.type === 'DRAGGING' && Boolean(mapped.dropping);

      if (!isDropping) {
        return;
      }

      if (event.propertyName !== 'transform') {
        return;
      }

      _this.props.dropAnimationFinished();
    };

    _this.onLift = function (options) {
      start('LIFT');
      var ref = _this.ref;
      !ref ?  false ? invariant(false) : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
      !!_this.props.isDragDisabled ?  false ? invariant(false, 'Cannot lift a Draggable when it is disabled') : Object(__WEBPACK_IMPORTED_MODULE_4_tiny_invariant__["a" /* default */])(false) : void 0;
      var clientSelection = options.clientSelection,
          movementMode = options.movementMode;
      var _this$props = _this.props,
          lift = _this$props.lift,
          draggableId = _this$props.draggableId;
      lift({
        id: draggableId,
        clientSelection: clientSelection,
        movementMode: movementMode
      });
      finish('LIFT');
    };

    _this.setRef = function (ref) {
      if (ref === null) {
        return;
      }

      if (ref === _this.ref) {
        return;
      }

      _this.ref = ref;
      throwIfRefIsInvalid(ref);
    };

    _this.getDraggableRef = function () {
      return _this.ref;
    };

    _this.getShouldRespectForceTouch = function () {
      return _this.props.shouldRespectForceTouch;
    };

    _this.getProvided = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (mapped, dragHandleProps) {
      var style = getStyle(mapped);
      var onTransitionEnd = mapped.type === 'DRAGGING' && Boolean(mapped.dropping) ? _this.onMoveEnd : null;
      var result = {
        innerRef: _this.setRef,
        draggableProps: {
          'data-react-beautiful-dnd-draggable': _this.styleContext,
          style: style,
          onTransitionEnd: onTransitionEnd
        },
        dragHandleProps: dragHandleProps
      };
      return result;
    });

    _this.renderChildren = function (dragHandleProps) {
      var _this$props2 = _this.props,
          children = _this$props2.children,
          mapped = _this$props2.mapped;
      return children(_this.getProvided(mapped, dragHandleProps), mapped.snapshot);
    };

    var callbacks = {
      onLift: _this.onLift,
      onMove: function onMove(clientSelection) {
        return props.move({
          client: clientSelection
        });
      },
      onDrop: function onDrop() {
        return props.drop({
          reason: 'DROP'
        });
      },
      onCancel: function onCancel() {
        return props.drop({
          reason: 'CANCEL'
        });
      },
      onMoveUp: props.moveUp,
      onMoveDown: props.moveDown,
      onMoveRight: props.moveRight,
      onMoveLeft: props.moveLeft,
      onWindowScroll: function onWindowScroll() {
        return props.moveByWindowScroll({
          newScroll: getWindowScroll()
        });
      }
    };
    _this.callbacks = callbacks;
    _this.styleContext = context[styleKey];

    if (false) {
      checkOwnProps$1(props);
    }

    return _this;
  }

  var _proto = Draggable.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.ref = null;
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        draggableId = _this$props3.draggableId,
        index = _this$props3.index,
        mapped = _this$props3.mapped,
        isDragDisabled = _this$props3.isDragDisabled,
        disableInteractiveElementBlocking = _this$props3.disableInteractiveElementBlocking;
    var droppableId = this.context[droppableIdKey];
    var type = this.context[droppableTypeKey];
    var isDragging = mapped.type === 'DRAGGING';
    var isDropAnimating = mapped.type === 'DRAGGING' && Boolean(mapped.dropping);
    return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(DraggableDimensionPublisher, {
      key: draggableId,
      draggableId: draggableId,
      droppableId: droppableId,
      type: type,
      index: index,
      getDraggableRef: this.getDraggableRef
    }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(DragHandle, {
      draggableId: draggableId,
      isDragging: isDragging,
      isDropAnimating: isDropAnimating,
      isEnabled: !isDragDisabled,
      callbacks: this.callbacks,
      getDraggableRef: this.getDraggableRef,
      getShouldRespectForceTouch: this.getShouldRespectForceTouch,
      canDragInteractiveElements: disableInteractiveElementBlocking
    }, this.renderChildren));
  };

  return Draggable;
}(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Component);

Draggable.contextTypes = (_Draggable$contextTyp = {}, _Draggable$contextTyp[droppableIdKey] = __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string.isRequired, _Draggable$contextTyp[droppableTypeKey] = __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string.isRequired, _Draggable$contextTyp[styleKey] = __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string.isRequired, _Draggable$contextTyp);

var getCombineWithFromResult = function getCombineWithFromResult(result) {
  return result.combine ? result.combine.draggableId : null;
};

var getCombineWithFromImpact = function getCombineWithFromImpact(impact) {
  return impact.merge ? impact.merge.combine.draggableId : null;
};

var makeMapStateToProps$1 = function makeMapStateToProps() {
  var getDraggingSnapshot = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (mode, draggingOver, combineWith, dropping) {
    return {
      isDragging: true,
      isDropAnimating: Boolean(dropping),
      dropAnimation: dropping,
      mode: mode,
      draggingOver: draggingOver,
      combineWith: combineWith,
      combineTargetFor: null
    };
  });
  var getSecondarySnapshot = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (combineTargetFor) {
    return {
      isDragging: false,
      isDropAnimating: false,
      dropAnimation: null,
      mode: null,
      draggingOver: null,
      combineTargetFor: combineTargetFor,
      combineWith: null
    };
  });
  var defaultMapProps = {
    mapped: {
      type: 'SECONDARY',
      offset: origin,
      combineTargetFor: null,
      shouldAnimateDisplacement: true,
      snapshot: getSecondarySnapshot(null)
    }
  };
  var memoizedOffset = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (x, y) {
    return {
      x: x,
      y: y
    };
  });
  var getDraggingProps = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (offset, mode, dimension, draggingOver, combineWith, forceShouldAnimate) {
    return {
      mapped: {
        type: 'DRAGGING',
        dropping: null,
        draggingOver: draggingOver,
        combineWith: combineWith,
        mode: mode,
        offset: offset,
        dimension: dimension,
        forceShouldAnimate: forceShouldAnimate,
        snapshot: getDraggingSnapshot(mode, draggingOver, combineWith, null)
      }
    };
  });
  var getSecondaryProps = Object(__WEBPACK_IMPORTED_MODULE_7_memoize_one__["a" /* default */])(function (offset, combineTargetFor, shouldAnimateDisplacement) {
    if (combineTargetFor === void 0) {
      combineTargetFor = null;
    }

    return {
      mapped: {
        type: 'SECONDARY',
        offset: offset,
        combineTargetFor: combineTargetFor,
        shouldAnimateDisplacement: shouldAnimateDisplacement,
        snapshot: getSecondarySnapshot(combineTargetFor)
      }
    };
  });

  var getSecondaryMovement = function getSecondaryMovement(ownId, draggingId, impact) {
    var map = impact.movement.map;
    var displacement = map[ownId];
    var movement = impact.movement;
    var merge = impact.merge;
    var isCombinedWith = Boolean(merge && merge.combine.draggableId === ownId);
    var displacedBy = movement.displacedBy.point;
    var offset = memoizedOffset(displacedBy.x, displacedBy.y);

    if (isCombinedWith) {
      return getSecondaryProps(displacement ? offset : origin, draggingId, displacement ? displacement.shouldAnimate : true);
    }

    if (!displacement) {
      return null;
    }

    if (!displacement.isVisible) {
      return null;
    }

    return getSecondaryProps(offset, null, displacement.shouldAnimate);
  };

  var draggingSelector = function draggingSelector(state, ownProps) {
    if (state.isDragging) {
      if (state.critical.draggable.id !== ownProps.draggableId) {
        return null;
      }

      var offset = state.current.client.offset;
      var dimension = state.dimensions.draggables[ownProps.draggableId];
      var mode = state.movementMode;
      var draggingOver = whatIsDraggedOver(state.impact);
      var combineWith = getCombineWithFromImpact(state.impact);
      var forceShouldAnimate = state.forceShouldAnimate;
      return getDraggingProps(memoizedOffset(offset.x, offset.y), mode, dimension, draggingOver, combineWith, forceShouldAnimate);
    }

    if (state.phase === 'DROP_ANIMATING') {
      var completed = state.completed;

      if (completed.result.draggableId !== ownProps.draggableId) {
        return null;
      }

      var _dimension = state.dimensions.draggables[ownProps.draggableId];
      var result = completed.result;
      var _mode = result.mode;

      var _draggingOver = whatIsDraggedOverFromResult(result);

      var _combineWith = getCombineWithFromResult(result);

      var duration = state.dropDuration;
      var dropping = {
        duration: duration,
        curve: curves.drop,
        moveTo: state.newHomeClientOffset,
        opacity: _combineWith ? combine.opacity.drop : null,
        scale: _combineWith ? combine.scale.drop : null
      };
      return {
        mapped: {
          type: 'DRAGGING',
          offset: state.newHomeClientOffset,
          dimension: _dimension,
          dropping: dropping,
          draggingOver: _draggingOver,
          combineWith: _combineWith,
          mode: _mode,
          forceShouldAnimate: null,
          snapshot: getDraggingSnapshot(_mode, _draggingOver, _combineWith, dropping)
        }
      };
    }

    return null;
  };

  var secondarySelector = function secondarySelector(state, ownProps) {
    if (state.isDragging) {
      if (state.critical.draggable.id === ownProps.draggableId) {
        return null;
      }

      return getSecondaryMovement(ownProps.draggableId, state.critical.draggable.id, state.impact);
    }

    if (state.phase === 'DROP_ANIMATING') {
      var completed = state.completed;

      if (completed.result.draggableId === ownProps.draggableId) {
        return null;
      }

      return getSecondaryMovement(ownProps.draggableId, completed.result.draggableId, completed.impact);
    }

    return null;
  };

  var selector = function selector(state, ownProps) {
    return draggingSelector(state, ownProps) || secondarySelector(state, ownProps) || defaultMapProps;
  };

  return selector;
};
var mapDispatchToProps$1 = {
  lift: lift,
  move: move,
  moveUp: moveUp,
  moveDown: moveDown,
  moveLeft: moveLeft,
  moveRight: moveRight,
  moveByWindowScroll: moveByWindowScroll,
  drop: drop,
  dropAnimationFinished: dropAnimationFinished
};
var defaultProps$1 = {
  isDragDisabled: false,
  disableInteractiveElementBlocking: false,
  shouldRespectForceTouch: true
};
var ConnectedDraggable = Object(__WEBPACK_IMPORTED_MODULE_13_react_redux__["b" /* connect */])(makeMapStateToProps$1, mapDispatchToProps$1, null, {
  storeKey: storeKey,
  pure: true,
  areStatePropsEqual: isStrictEqual
})(Draggable);
ConnectedDraggable.defaultProps = defaultProps$1;




/***/ }),

/***/ 1729:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }

  for (var i = 0; i < newInputs.length; i++) {
    if (newInputs[i] !== lastInputs[i]) {
      return false;
    }
  }

  return true;
}

function index (resultFn, isEqual) {
  if (isEqual === void 0) {
    isEqual = areInputsEqual;
  }

  var lastThis;
  var lastArgs = [];
  var lastResult;
  var calledOnce = false;

  var result = function result() {
    for (var _len = arguments.length, newArgs = new Array(_len), _key = 0; _key < _len; _key++) {
      newArgs[_key] = arguments[_key];
    }

    if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
      return lastResult;
    }

    lastResult = resultFn.apply(this, newArgs);
    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    return lastResult;
  };

  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (index);


/***/ }),

/***/ 1732:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _extends;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_js_object_assign__ = __webpack_require__(1548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__core_js_object_assign__);

function _extends() {
  _extends = __WEBPACK_IMPORTED_MODULE_0__core_js_object_assign___default.a || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),

/***/ 1733:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _inheritsLoose;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_js_object_create__ = __webpack_require__(1734);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_js_object_create___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__core_js_object_create__);

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = __WEBPACK_IMPORTED_MODULE_0__core_js_object_create___default()(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),

/***/ 1734:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(200);

/***/ }),

/***/ 1735:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getRect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return expand; });
/* unused harmony export shrink */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return offset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return withScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return calculateBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getBox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tiny_invariant__ = __webpack_require__(352);


var getRect = function getRect(_ref) {
  var top = _ref.top,
      right = _ref.right,
      bottom = _ref.bottom,
      left = _ref.left;
  var width = right - left;
  var height = bottom - top;
  var rect = {
    top: top,
    right: right,
    bottom: bottom,
    left: left,
    width: width,
    height: height,
    x: left,
    y: top,
    center: {
      x: (right + left) / 2,
      y: (bottom + top) / 2
    }
  };
  return rect;
};
var expand = function expand(target, expandBy) {
  return {
    top: target.top - expandBy.top,
    left: target.left - expandBy.left,
    bottom: target.bottom + expandBy.bottom,
    right: target.right + expandBy.right
  };
};
var shrink = function shrink(target, shrinkBy) {
  return {
    top: target.top + shrinkBy.top,
    left: target.left + shrinkBy.left,
    bottom: target.bottom - shrinkBy.bottom,
    right: target.right - shrinkBy.right
  };
};

var shift = function shift(target, shiftBy) {
  return {
    top: target.top + shiftBy.y,
    left: target.left + shiftBy.x,
    bottom: target.bottom + shiftBy.y,
    right: target.right + shiftBy.x
  };
};

var noSpacing = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
var createBox = function createBox(_ref2) {
  var borderBox = _ref2.borderBox,
      _ref2$margin = _ref2.margin,
      margin = _ref2$margin === void 0 ? noSpacing : _ref2$margin,
      _ref2$border = _ref2.border,
      border = _ref2$border === void 0 ? noSpacing : _ref2$border,
      _ref2$padding = _ref2.padding,
      padding = _ref2$padding === void 0 ? noSpacing : _ref2$padding;
  var marginBox = getRect(expand(borderBox, margin));
  var paddingBox = getRect(shrink(borderBox, border));
  var contentBox = getRect(shrink(paddingBox, padding));
  return {
    marginBox: marginBox,
    borderBox: getRect(borderBox),
    paddingBox: paddingBox,
    contentBox: contentBox,
    margin: margin,
    border: border,
    padding: padding
  };
};

var parse = function parse(raw) {
  var value = raw.slice(0, -2);
  var suffix = raw.slice(-2);
  !(suffix === 'px') ?  false ? invariant(false, "Expected value to be a pixel value.\n      Expected form: 10px\n      Actual value: " + raw + "\n    ") : Object(__WEBPACK_IMPORTED_MODULE_0_tiny_invariant__["a" /* default */])(false) : void 0;
  var result = Number(value);
  !!isNaN(result) ?  false ? invariant(false, "Could not parse value [raw: " + raw + ", without suffix: " + value + "]") : Object(__WEBPACK_IMPORTED_MODULE_0_tiny_invariant__["a" /* default */])(false) : void 0;
  return result;
};

var getWindowScroll = function getWindowScroll() {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
};

var offset = function offset(original, change) {
  var borderBox = original.borderBox,
      border = original.border,
      margin = original.margin,
      padding = original.padding;
  var shifted = shift(borderBox, change);
  return createBox({
    borderBox: shifted,
    border: border,
    margin: margin,
    padding: padding
  });
};
var withScroll = function withScroll(original, scroll) {
  if (scroll === void 0) {
    scroll = getWindowScroll();
  }

  return offset(original, scroll);
};
var calculateBox = function calculateBox(borderBox, styles) {
  var margin = {
    top: parse(styles.marginTop),
    right: parse(styles.marginRight),
    bottom: parse(styles.marginBottom),
    left: parse(styles.marginLeft)
  };
  var padding = {
    top: parse(styles.paddingTop),
    right: parse(styles.paddingRight),
    bottom: parse(styles.paddingBottom),
    left: parse(styles.paddingLeft)
  };
  var border = {
    top: parse(styles.borderTopWidth),
    right: parse(styles.borderRightWidth),
    bottom: parse(styles.borderBottomWidth),
    left: parse(styles.borderLeftWidth)
  };
  return createBox({
    borderBox: borderBox,
    margin: margin,
    padding: padding,
    border: border
  });
};
var getBox = function getBox(el) {
  var borderBox = el.getBoundingClientRect();
  var styles = window.getComputedStyle(el);
  return calculateBox(borderBox, styles);
};




/***/ }),

/***/ 1736:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1737);

/***/ }),

/***/ 1737:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1738);
module.exports = __webpack_require__(16).Object.values;


/***/ }),

/***/ 1738:
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(30);
var $values = __webpack_require__(1739)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),

/***/ 1739:
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(80);
var toIObject = __webpack_require__(52);
var isEnum = __webpack_require__(95).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),

/***/ 1740:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(361);

/***/ }),

/***/ 1741:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1742);

/***/ }),

/***/ 1742:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1743);
module.exports = __webpack_require__(16).Date.now;


/***/ }),

/***/ 1743:
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(30);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),

/***/ 1744:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var index = (function (fn) {
  var lastArgs = [];
  var frameId = null;

  var wrapperFn = function wrapperFn() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    lastArgs = args;

    if (frameId) {
      return;
    }

    frameId = requestAnimationFrame(function () {
      frameId = null;
      fn.apply(undefined, lastArgs);
    });
  };

  wrapperFn.cancel = function () {
    if (!frameId) {
      return;
    }

    cancelAnimationFrame(frameId);
    frameId = null;
  };

  var resultFn = wrapperFn;

  return resultFn;
});

/* harmony default export */ __webpack_exports__["a"] = (index);


/***/ }),

/***/ 1745:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1746);

/***/ }),

/***/ 1746:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1747);
module.exports = __webpack_require__(16).Number.isInteger;


/***/ }),

/***/ 1747:
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(30);

$export($export.S, 'Number', { isInteger: __webpack_require__(1748) });


/***/ }),

/***/ 1748:
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(44);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),

/***/ 4858:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_spin_style_css__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_spin_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_spin_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_spin__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_spin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_spin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_button_style_css__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_button_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_antd_lib_button_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_button__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_antd_lib_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_breadcrumb_style_css__ = __webpack_require__(1454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_breadcrumb_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_antd_lib_breadcrumb_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_breadcrumb__ = __webpack_require__(1455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_breadcrumb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_antd_lib_breadcrumb__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_beautiful_dnd__ = __webpack_require__(1645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__modals_Modals__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__css_members_css__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__css_members_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__css_members_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__css_busyWork_css__ = __webpack_require__(1126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__css_busyWork_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__css_busyWork_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Ordering_css__ = __webpack_require__(4859);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Ordering_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__Ordering_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__coursesPublic_NoneData__ = __webpack_require__(336);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var reorder=function reorder(list,startIndex,endIndex){var result=Array.from(list);var _result$splice=result.splice(startIndex,1),_result$splice2=_slicedToArray(_result$splice,1),removed=_result$splice2[0];result.splice(endIndex,0,removed);return result;};var Ordering=function(_Component){_inherits(Ordering,_Component);function Ordering(props){_classCallCheck(this,Ordering);var _this=_possibleConstructorReturn(this,(Ordering.__proto__||Object.getPrototypeOf(Ordering)).call(this,props));_this.handleScroll=function(e){// console.log(
// 	'浏览器滚动事件',
// 	e.srcElement.scrollingElement.scrollTop,
// 	e.srcElement.scrollingElement.scrollHeight
// )
//e.srcElement.scrollingElement.scrollTop为距离滚动条顶部高度
// e.srcElement.scrollingElement.scrollHeight为整个文档高度
if(e.srcElement.scrollingElement.scrollTop>60){_this.setState({windowsscrollTop:true});}if(e.srcElement.scrollingElement.scrollTop===0){_this.setState({windowsscrollTop:false});}};_this.onDragEnd=function(result){if(result.destination!=null&&result.destination!=undefined){var datas=_this.state.datas;if(!result.destination){console.log('dropped outside the list');return;}if(result.destination.index===result.source.index){console.log('the same');return;}var shixuns_list=reorder(datas,result.source.index,result.destination.index);var newtask_ids=[];shixuns_list.map(function(item,key){newtask_ids.push(item.task_id);});_this.setState({datas:shixuns_list,newtask_ids:newtask_ids});}};_this.updatalist=function(){var _this$state=_this.state,datas=_this$state.datas,newtask_ids=_this$state.newtask_ids,isSpin=_this$state.isSpin;if(newtask_ids.length===0){_this.props.showNotification("请先移动需要排序的实训作业任务");return;}if(isSpin===true){return;}_this.setState({isSpin:true});var coursesId=_this.props.match.params.coursesId;var ordering_type=_this.props.match.params.ordering_type;var url="/courses/"+coursesId+"/update_task_position.json";__WEBPACK_IMPORTED_MODULE_9_axios___default.a.post(url,{container_type:ordering_type,task_ids:newtask_ids}).then(function(result){if(result.data.status===0){_this.props.showNotification(result.data.message);_this.setState({isSpin:false,datas:datas,newtask_ids:[]});_this.goback();}else{_this.setState({isSpin:false});}}).catch(function(error){_this.setState({isSpin:false});});};_this.goback=function(){window.location.href="/courses/"+_this.props.match.params.coursesId+"/shixun_homeworks/"+_this.props.match.params.main_id;};_this.state={isSpin:false,antIcon:false,datas:undefined,windowsscrollTop:false,newtask_ids:[]};return _this;}_createClass(Ordering,[{key:"componentDidMount",value:function componentDidMount(){var _this2=this;this.setState({isSpin:true});var coursesId=this.props.match.params.coursesId;var ordering_type=this.props.match.params.ordering_type;var url="/courses/"+coursesId+"/tasks_list.json";__WEBPACK_IMPORTED_MODULE_9_axios___default.a.get(url,{params:{container_type:ordering_type}}).then(function(result){if(result){_this2.setState({datas:result.data.tasks,isSpin:false});}}).catch(function(error){console.log(error);_this2.setState({isSpin:false});});window.addEventListener('scroll',this.handleScroll.bind(this));//监听滚动
// window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
}// componentWillUnmount() { //一定要最后移除监听器，以防多个组件之间导致this的指向紊乱
// 	window.removeEventListener('scroll', this.handleScroll.bind(this))
// 	window.removeEventListener('resize', this.handleResize.bind(this))
// }
//
// handleResize = e => {
// 	console.log('浏览器窗口大小改变事件', e.target.innerWidth)
// }
},{key:"render",value:function render(){var _this3=this;var _state=this.state,datas=_state.datas,Modalstype=_state.Modalstype,windowsscrollTop=_state.windowsscrollTop;var main_id=this.props.match.params.main_id;var category_id=this.props.match.params.category_id;console.log(this.props);console.log(window);var positiontype=null;if(windowsscrollTop===true){positiontype={position:'fixed',zIndex:'1000',top:'0px'};}else{positiontype={};}return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("div",{className:"mb200"},Modalstype&&Modalstype===true?__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__modals_Modals__["a" /* default */],{modalsType:this.state.Modalstype,modalsTopval:this.state.Modalstopval,modalCancel:this.state.ModalCancel,modalSave:this.state.ModalSave,modalsBottomval:this.state.ModalsBottomval,loadtype:this.state.Loadtype,antIcon:this.state.antIcon}):"",__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("div",{className:"educontent clearfix"},windowsscrollTop===false?__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("div",{className:"mt20 mb20"},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd_lib_breadcrumb___default.a,{separator:">"},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd_lib_breadcrumb___default.a.Item,{href:this.props.current_user&&this.props.current_user.first_category_url},this.props.current_user&&this.props.current_user.course_name),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd_lib_breadcrumb___default.a.Item,{href:"/courses/"+this.props.match.params.coursesId+"/shixun_homeworks/"+this.props.match.params.main_id},"\u5B9E\u8BAD\u4F5C\u4E1A"),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd_lib_breadcrumb___default.a.Item,null,"\u8C03\u6574\u6392\u5E8F"))):"",__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("p",{className:"clearfix bor-bottom-greyE edu-back-white orderingbox",style:positiontype},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span",null,"\u6E29\u99A8\u63D0\u793A\uFF1A\u8BF7\u5728\u5217\u8868\u4E2D\u957F\u6309\u9F20\u6807\u5DE6\u952E\uFF0C\u8FDB\u884C\u62D6\u653E\u6392\u5E8F\u3002\u5B8C\u6210\u6392\u5E8F\u540E\u8BF7\u70B9\u51FB\u201C\u4FDD\u5B58\u201D"),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_antd_lib_button___default.a,{className:"fr orderingbtnleft",type:"primary",onClick:function onClick(){return _this3.updatalist();}},"\u4FDD\u5B58"),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_antd_lib_button___default.a,{className:"fr mr30 orderingbtnright",onClick:function onClick(){return _this3.goback();}},"\u53D6\u6D88"))),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_spin___default.a,{size:"large",spinning:this.state.isSpin},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_react_beautiful_dnd__["a" /* DragDropContext */],{onDragEnd:this.onDragEnd},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_react_beautiful_dnd__["c" /* Droppable */],{droppableId:this.props.match.params.ordering_type},function(provided,snapshot){return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("div",Object.assign({ref:provided.innerRef},provided.droppableProps,{className:"educontent mb50 mt40 droppableul ordermiddiv",onScroll:_this3.contentViewScrolledit}),datas===undefined?"":datas.map(function(item,index){return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_react_beautiful_dnd__["b" /* Draggable */],{key:item.task_id,draggableId:item.task_id,index:index,className:"TabsWarps"},function(provided,snapshot){return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("div",Object.assign({className:"mt30 edu-back-white pd1323s relativef ordermidbox",key:index,ref:provided.innerRef},provided.draggableProps,provided.dragHandleProps),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("div",{className:"clearfix"},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("div",{className:"item-body"},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("div",{className:"clearfix ds pr orderSection"},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("p",{title:item.task_name,className:"font-16  color-dark maxwidth865s orderfonttop",href:"/courses/"+_this3.props.match.params.coursesId+"/shixun_homeworks/"+item.task_id+"/list?tab=0"},item.task_name),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("p",{className:"color-grey panel-lightgrey mt16  "},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span",{className:"topicswidth400"},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span",{className:"topsics100 color-grey9 orderfontbom mr20 maxwidth795"},item.user_name),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("span",{className:"mr50 color-grey9 orderfontbom maxwidth795"},item.category)))))));});}));})),datas===undefined?"":datas.length===0?__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14__coursesPublic_NoneData__["a" /* default */],null):""));}}]);return Ordering;}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (Ordering);

/***/ }),

/***/ 4859:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4860);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(318)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 4860:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(317)(true);
// imports


// module
exports.push([module.i, ".color4CACFF{color:#4cacff!important}.orderingbox{width:1200px;height:80px;background:#fff;-webkit-box-shadow:3px 3px 3px #ededed;box-shadow:3px 3px 3px #ededed;opacity:1;border-radius:2px 2px 0 0;padding:24px;-webkit-box-sizing:border-box;box-sizing:border-box;line-height:34px}.orderingbtnright{background:#fff;border:1px solid #e4e4e4;border-radius:4px}.orderingbtnleft,.orderingbtnright{width:90px;height:38px;-webkit-box-shadow:0 1px 1px rgba(0,0,0,.16);box-shadow:0 1px 1px rgba(0,0,0,.16);opacity:1}.orderingbtnleft{background:#4cacff;border-radius:4px}.pd1323s{padding:10px 6px 25px 40px;cursor:pointer}.orderSection{height:80px;padding-top:16px}.ordermidbox{width:960px;height:120px;background:#fff;opacity:1;margin-left:120px}.orderfonttop{font-size:16px!important;font-weight:700;line-height:28px;color:#05101a}.orderfontbom,.orderfonttop{font-family:Microsoft YaHei;opacity:1}.orderfontbom{font-size:14px;font-weight:400;line-height:25px;color:#999}.ordermidbox:hover{-webkit-box-shadow:0 2px 6px rgba(51,51,51,.09);box-shadow:0 2px 6px rgba(51,51,51,.09);opacity:1}.mb200{margin-bottom:200px}.maxwidth865s{max-width:865px}.maxwidth795,.maxwidth865s{overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap}.maxwidth795{max-width:795px;display:inline-block}.ordermidbox:active,.ordermidbox:focus{background:#f8f7ff;border:1px solid #4cacff}.ordermiddiv{min-height:500px}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/src/modules/courses/ordering/Ordering.css"],"names":[],"mappings":"AAAA,aACI,uBAA0B,CAC7B,AAED,aACI,aAAa,AACb,YAAY,AACZ,gBAA+B,AAC/B,uCAAmD,AAC3C,+BAA2C,AACnD,UAAU,AACV,0BAA8B,AAC9B,aAAc,AACd,8BAA+B,AACvB,sBAAuB,AAC/B,gBAAkB,CACrB,AAED,kBAGI,gBAAgC,AAChC,yBAAsC,AAItC,iBAAmB,CACtB,AAED,mCAVI,WAAY,AACZ,YAAa,AAGb,6CAAiD,AACzC,qCAAyC,AACjD,SAAW,CAYd,AARD,iBAGI,mBAA+B,AAI/B,iBAAmB,CACtB,AACD,SACI,2BAA4B,AAC5B,cAAgB,CACnB,AAGD,cACI,YAAa,AACb,gBAAkB,CACrB,AAED,aACI,YAAa,AACb,aAAc,AACd,gBAAgC,AAEhC,UAAW,AACX,iBAAkB,CACrB,AAED,cACI,yBAA2B,AAE3B,gBAAkB,AAClB,iBAAkB,AAClB,aAAuB,CAE1B,AAED,4BAPI,4BAA6B,AAI7B,SAAW,CAUd,AAPD,cACI,eAAe,AAEf,gBAAgB,AAChB,iBAAiB,AACjB,UAA0B,CAE7B,AAED,mBACI,gDAAoD,AAC5C,wCAA4C,AACpD,SAAW,CACd,AAED,OACI,mBAAqB,CACxB,AAED,cACI,eAAiB,CAKpB,AAED,2BANI,gBAAiB,AACjB,0BAA2B,AACxB,uBAAwB,AAC3B,kBAAoB,CAUvB,AAPD,aACI,gBAAgB,AAKhB,oBAAsB,CACzB,AAOD,uCACI,mBAA+B,AAC/B,wBAAoC,CACvC,AAED,aACI,gBAAkB,CACrB","file":"Ordering.css","sourcesContent":[".color4CACFF{\n    color: #4CACFF !important;\n}\n\n.orderingbox{\n    width:1200px;\n    height:80px;\n    background:rgba(255,255,255,1);\n    -webkit-box-shadow:3px 3px 3px rgba(237,237,237,1);\n            box-shadow:3px 3px 3px rgba(237,237,237,1);\n    opacity:1;\n    border-radius:2px 2px 0px 0px;\n    padding: 24px;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    line-height: 34px;\n}\n\n.orderingbtnright{\n    width: 90px;\n    height: 38px;\n    background: rgba(255,255,255,1);\n    border: 1px solid rgba(228,228,228,1);\n    -webkit-box-shadow: 0px 1px 1px rgba(0,0,0,0.16);\n            box-shadow: 0px 1px 1px rgba(0,0,0,0.16);\n    opacity: 1;\n    border-radius: 4px;\n}\n\n.orderingbtnleft{\n    width: 90px;\n    height: 38px;\n    background: rgba(76,172,255,1);\n    -webkit-box-shadow: 0px 1px 1px rgba(0,0,0,0.16);\n            box-shadow: 0px 1px 1px rgba(0,0,0,0.16);\n    opacity: 1;\n    border-radius: 4px;\n}\n.pd1323s{\n    padding: 10px 6px 25px 40px;\n    cursor: pointer;\n}\n\n\n.orderSection{\n    height: 80px;\n    padding-top: 16px;\n}\n\n.ordermidbox{\n    width: 960px;\n    height: 120px;\n    background: rgba(255,255,255,1);\n    /* border: 1px solid rgba(205,205,205,1); */\n    opacity: 1;\n    margin-left:120px;\n}\n\n.orderfonttop{\n    font-size: 16px !important;\n    font-family: Microsoft YaHei;\n    font-weight: bold;\n    line-height: 28px;\n    color: rgba(5,16,26,1);\n    opacity: 1;\n}\n\n.orderfontbom{\n    font-size:14px;\n    font-family:Microsoft YaHei;\n    font-weight:400;\n    line-height:25px;\n    color:rgba(153,153,153,1);\n    opacity:1;\n}\n\n.ordermidbox:hover {\n    -webkit-box-shadow: 0px 2px 6px rgba(51,51,51,0.09);\n            box-shadow: 0px 2px 6px rgba(51,51,51,0.09);\n    opacity: 1;\n}\n\n.mb200{\n    margin-bottom: 200px;\n}\n\n.maxwidth865s{\n    max-width: 865px;\n    overflow: hidden;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.maxwidth795 {\n    max-width:795px;\n    overflow: hidden;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n    white-space: nowrap;\n    display: inline-block;\n}\n\n.ordermidbox:active{\n    background:rgba(248,247,255,1);\n    border:1px solid rgba(76,172,255,1);\n}\n\n.ordermidbox:focus{\n    background:rgba(248,247,255,1);\n    border:1px solid rgba(76,172,255,1);\n}\n\n.ordermiddiv{\n    min-height: 500px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 927:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createReactContext = _interopRequireDefault(__webpack_require__(319));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MenuContext = (0, _createReactContext["default"])({
  inlineCollapsed: false
});
var _default = MenuContext;
exports["default"] = _default;
//# sourceMappingURL=MenuContext.js.map


/***/ }),

/***/ 941:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SiderContext = void 0;

var _createReactContext = _interopRequireDefault(__webpack_require__(319));

var React = _interopRequireWildcard(__webpack_require__(0));

var _reactLifecyclesCompat = __webpack_require__(7);

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _omit = _interopRequireDefault(__webpack_require__(46));

var _layout = __webpack_require__(1013);

var _configProvider = __webpack_require__(14);

var _icon = _interopRequireDefault(__webpack_require__(27));

var _isNumeric = _interopRequireDefault(__webpack_require__(1017));

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


/***/ }),

/***/ 957:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(__webpack_require__(0));

var _rcDropdown = _interopRequireDefault(__webpack_require__(1102));

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _configProvider = __webpack_require__(14);

var _warning = _interopRequireDefault(__webpack_require__(43));

var _icon = _interopRequireDefault(__webpack_require__(27));

var _type = __webpack_require__(71);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Placements = (0, _type.tuple)('topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight');

var Dropdown =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  function Dropdown() {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).apply(this, arguments));

    _this.renderOverlay = function (prefixCls) {
      // rc-dropdown already can process the function of overlay, but we have check logic here.
      // So we need render the element to check and pass back to rc-dropdown.
      var overlay = _this.props.overlay;
      var overlayNode;

      if (typeof overlay === 'function') {
        overlayNode = overlay();
      } else {
        overlayNode = overlay;
      }

      overlayNode = React.Children.only(overlayNode);
      var overlayProps = overlayNode.props; // Warning if use other mode

      (0, _warning["default"])(!overlayProps.mode || overlayProps.mode === 'vertical', 'Dropdown', "mode=\"".concat(overlayProps.mode, "\" is not supported for Dropdown's Menu.")); // menu cannot be selectable in dropdown defaultly
      // menu should be focusable in dropdown defaultly

      var _overlayProps$selecta = overlayProps.selectable,
          selectable = _overlayProps$selecta === void 0 ? false : _overlayProps$selecta,
          _overlayProps$focusab = overlayProps.focusable,
          focusable = _overlayProps$focusab === void 0 ? true : _overlayProps$focusab;
      var expandIcon = React.createElement("span", {
        className: "".concat(prefixCls, "-menu-submenu-arrow")
      }, React.createElement(_icon["default"], {
        type: "right",
        className: "".concat(prefixCls, "-menu-submenu-arrow-icon")
      }));
      var fixedModeOverlay = typeof overlayNode.type === 'string' ? overlay : React.cloneElement(overlayNode, {
        mode: 'vertical',
        selectable: selectable,
        focusable: focusable,
        expandIcon: expandIcon
      });
      return fixedModeOverlay;
    };

    _this.renderDropDown = function (_ref) {
      var getContextPopupContainer = _ref.getPopupContainer,
          getPrefixCls = _ref.getPrefixCls;
      var _this$props = _this.props,
          customizePrefixCls = _this$props.prefixCls,
          children = _this$props.children,
          trigger = _this$props.trigger,
          disabled = _this$props.disabled,
          getPopupContainer = _this$props.getPopupContainer;
      var prefixCls = getPrefixCls('dropdown', customizePrefixCls);
      var child = React.Children.only(children);
      var dropdownTrigger = React.cloneElement(child, {
        className: (0, _classnames["default"])(child.props.className, "".concat(prefixCls, "-trigger")),
        disabled: disabled
      });
      var triggerActions = disabled ? [] : trigger;
      var alignPoint;

      if (triggerActions && triggerActions.indexOf('contextMenu') !== -1) {
        alignPoint = true;
      }

      return React.createElement(_rcDropdown["default"], _extends({
        alignPoint: alignPoint
      }, _this.props, {
        prefixCls: prefixCls,
        getPopupContainer: getPopupContainer || getContextPopupContainer,
        transitionName: _this.getTransitionName(),
        trigger: triggerActions,
        overlay: function overlay() {
          return _this.renderOverlay(prefixCls);
        }
      }), dropdownTrigger);
    };

    return _this;
  }

  _createClass(Dropdown, [{
    key: "getTransitionName",
    value: function getTransitionName() {
      var _this$props2 = this.props,
          _this$props2$placemen = _this$props2.placement,
          placement = _this$props2$placemen === void 0 ? '' : _this$props2$placemen,
          transitionName = _this$props2.transitionName;

      if (transitionName !== undefined) {
        return transitionName;
      }

      if (placement.indexOf('top') >= 0) {
        return 'slide-down';
      }

      return 'slide-up';
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderDropDown);
    }
  }]);

  return Dropdown;
}(React.Component);

exports["default"] = Dropdown;
Dropdown.defaultProps = {
  mouseEnterDelay: 0.15,
  mouseLeaveDelay: 0.1,
  placement: 'bottomLeft'
};
//# sourceMappingURL=dropdown.js.map


/***/ }),

/***/ 959:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(__webpack_require__(0));

var _rcMenu = _interopRequireWildcard(__webpack_require__(177));

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _omit = _interopRequireDefault(__webpack_require__(46));

var _reactLifecyclesCompat = __webpack_require__(7);

var _SubMenu = _interopRequireDefault(__webpack_require__(1021));

var _MenuItem = _interopRequireDefault(__webpack_require__(1022));

var _configProvider = __webpack_require__(14);

var _warning = _interopRequireDefault(__webpack_require__(43));

var _Sider = __webpack_require__(941);

var _raf = _interopRequireDefault(__webpack_require__(188));

var _motion = _interopRequireDefault(__webpack_require__(1014));

var _MenuContext = _interopRequireDefault(__webpack_require__(927));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var InternalMenu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InternalMenu, _React$Component);

  function InternalMenu(props) {
    var _this;

    _classCallCheck(this, InternalMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InternalMenu).call(this, props)); // Restore vertical mode when menu is collapsed responsively when mounted
    // https://github.com/ant-design/ant-design/issues/13104
    // TODO: not a perfect solution, looking a new way to avoid setting switchingModeFromInline in this situation

    _this.handleMouseEnter = function (e) {
      _this.restoreModeVerticalFromInline();

      var onMouseEnter = _this.props.onMouseEnter;

      if (onMouseEnter) {
        onMouseEnter(e);
      }
    };

    _this.handleTransitionEnd = function (e) {
      // when inlineCollapsed menu width animation finished
      // https://github.com/ant-design/ant-design/issues/12864
      var widthCollapsed = e.propertyName === 'width' && e.target === e.currentTarget; // Fix SVGElement e.target.className.indexOf is not a function
      // https://github.com/ant-design/ant-design/issues/15699

      var className = e.target.className; // SVGAnimatedString.animVal should be identical to SVGAnimatedString.baseVal, unless during an animation.

      var classNameValue = Object.prototype.toString.call(className) === '[object SVGAnimatedString]' ? className.animVal : className; // Fix for <Menu style={{ width: '100%' }} />, the width transition won't trigger when menu is collapsed
      // https://github.com/ant-design/ant-design-pro/issues/2783

      var iconScaled = e.propertyName === 'font-size' && classNameValue.indexOf('anticon') >= 0;

      if (widthCollapsed || iconScaled) {
        _this.restoreModeVerticalFromInline();
      }
    };

    _this.handleClick = function (e) {
      _this.handleOpenChange([]);

      var onClick = _this.props.onClick;

      if (onClick) {
        onClick(e);
      }
    };

    _this.handleOpenChange = function (openKeys) {
      _this.setOpenKeys(openKeys);

      var onOpenChange = _this.props.onOpenChange;

      if (onOpenChange) {
        onOpenChange(openKeys);
      }
    };

    _this.renderMenu = function (_ref) {
      var getPopupContainer = _ref.getPopupContainer,
          getPrefixCls = _ref.getPrefixCls;
      var _this$props = _this.props,
          customizePrefixCls = _this$props.prefixCls,
          className = _this$props.className,
          theme = _this$props.theme,
          collapsedWidth = _this$props.collapsedWidth;
      var passProps = (0, _omit["default"])(_this.props, ['collapsedWidth', 'siderCollapsed']);

      var menuMode = _this.getRealMenuMode();

      var menuOpenMotion = _this.getOpenMotionProps(menuMode);

      var prefixCls = getPrefixCls('menu', customizePrefixCls);
      var menuClassName = (0, _classnames["default"])(className, "".concat(prefixCls, "-").concat(theme), _defineProperty({}, "".concat(prefixCls, "-inline-collapsed"), _this.getInlineCollapsed()));

      var menuProps = _extends({
        openKeys: _this.state.openKeys,
        onOpenChange: _this.handleOpenChange,
        className: menuClassName,
        mode: menuMode
      }, menuOpenMotion);

      if (menuMode !== 'inline') {
        // closing vertical popup submenu after click it
        menuProps.onClick = _this.handleClick;
      } // https://github.com/ant-design/ant-design/issues/8587


      var hideMenu = _this.getInlineCollapsed() && (collapsedWidth === 0 || collapsedWidth === '0' || collapsedWidth === '0px');

      if (hideMenu) {
        menuProps.openKeys = [];
      }

      return React.createElement(_rcMenu["default"], _extends({
        getPopupContainer: getPopupContainer
      }, passProps, menuProps, {
        prefixCls: prefixCls,
        onTransitionEnd: _this.handleTransitionEnd,
        onMouseEnter: _this.handleMouseEnter
      }));
    };

    (0, _warning["default"])(!('onOpen' in props || 'onClose' in props), 'Menu', '`onOpen` and `onClose` are removed, please use `onOpenChange` instead, ' + 'see: https://u.ant.design/menu-on-open-change.');
    (0, _warning["default"])(!('inlineCollapsed' in props && props.mode !== 'inline'), 'Menu', '`inlineCollapsed` should only be used when `mode` is inline.');
    (0, _warning["default"])(!(props.siderCollapsed !== undefined && 'inlineCollapsed' in props), 'Menu', '`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.');
    var openKeys;

    if ('openKeys' in props) {
      openKeys = props.openKeys;
    } else if ('defaultOpenKeys' in props) {
      openKeys = props.defaultOpenKeys;
    }

    _this.state = {
      openKeys: openKeys || [],
      switchingModeFromInline: false,
      inlineOpenKeys: [],
      prevProps: props
    };
    return _this;
  }

  _createClass(InternalMenu, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _raf["default"].cancel(this.mountRafId);
    }
  }, {
    key: "setOpenKeys",
    value: function setOpenKeys(openKeys) {
      if (!('openKeys' in this.props)) {
        this.setState({
          openKeys: openKeys
        });
      }
    }
  }, {
    key: "getRealMenuMode",
    value: function getRealMenuMode() {
      var inlineCollapsed = this.getInlineCollapsed();

      if (this.state.switchingModeFromInline && inlineCollapsed) {
        return 'inline';
      }

      var mode = this.props.mode;
      return inlineCollapsed ? 'vertical' : mode;
    }
  }, {
    key: "getInlineCollapsed",
    value: function getInlineCollapsed() {
      var inlineCollapsed = this.props.inlineCollapsed;

      if (this.props.siderCollapsed !== undefined) {
        return this.props.siderCollapsed;
      }

      return inlineCollapsed;
    }
  }, {
    key: "getOpenMotionProps",
    value: function getOpenMotionProps(menuMode) {
      var _this$props2 = this.props,
          openTransitionName = _this$props2.openTransitionName,
          openAnimation = _this$props2.openAnimation,
          motion = _this$props2.motion; // Provides by user

      if (motion) {
        return {
          motion: motion
        };
      }

      if (openAnimation) {
        (0, _warning["default"])(typeof openAnimation === 'string', 'Menu', '`openAnimation` do not support object. Please use `motion` instead.');
        return {
          openAnimation: openAnimation
        };
      }

      if (openTransitionName) {
        return {
          openTransitionName: openTransitionName
        };
      } // Default logic


      if (menuMode === 'horizontal') {
        return {
          motion: {
            motionName: 'slide-up'
          }
        };
      }

      if (menuMode === 'inline') {
        return {
          motion: _motion["default"]
        };
      } // When mode switch from inline
      // submenu should hide without animation


      return {
        motion: {
          motionName: this.state.switchingModeFromInline ? '' : 'zoom-big'
        }
      };
    }
  }, {
    key: "restoreModeVerticalFromInline",
    value: function restoreModeVerticalFromInline() {
      var switchingModeFromInline = this.state.switchingModeFromInline;

      if (switchingModeFromInline) {
        this.setState({
          switchingModeFromInline: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_MenuContext["default"].Provider, {
        value: {
          inlineCollapsed: this.getInlineCollapsed() || false,
          antdMenuTheme: this.props.theme
        }
      }, React.createElement(_configProvider.ConfigConsumer, null, this.renderMenu));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var prevProps = prevState.prevProps;
      var newState = {
        prevProps: nextProps
      };

      if (prevProps.mode === 'inline' && nextProps.mode !== 'inline') {
        newState.switchingModeFromInline = true;
      }

      if ('openKeys' in nextProps) {
        newState.openKeys = nextProps.openKeys;
      } else {
        // [Legacy] Old code will return after `openKeys` changed.
        // Not sure the reason, we should keep this logic still.
        if (nextProps.inlineCollapsed && !prevProps.inlineCollapsed || nextProps.siderCollapsed && !prevProps.siderCollapsed) {
          newState.switchingModeFromInline = true;
          newState.inlineOpenKeys = prevState.openKeys;
          newState.openKeys = [];
        }

        if (!nextProps.inlineCollapsed && prevProps.inlineCollapsed || !nextProps.siderCollapsed && prevProps.siderCollapsed) {
          newState.openKeys = prevState.inlineOpenKeys;
          newState.inlineOpenKeys = [];
        }
      }

      return newState;
    }
  }]);

  return InternalMenu;
}(React.Component);

InternalMenu.defaultProps = {
  className: '',
  theme: 'light',
  focusable: false
};
(0, _reactLifecyclesCompat.polyfill)(InternalMenu); // We should keep this as ref-able

var Menu =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Menu, _React$Component2);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, _getPrototypeOf(Menu).apply(this, arguments));
  }

  _createClass(Menu, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(_Sider.SiderContext.Consumer, null, function (context) {
        return React.createElement(InternalMenu, _extends({}, _this2.props, context));
      });
    }
  }]);

  return Menu;
}(React.Component);

exports["default"] = Menu;
Menu.Divider = _rcMenu.Divider;
Menu.Item = _MenuItem["default"];
Menu.SubMenu = _SubMenu["default"];
Menu.ItemGroup = _rcMenu.ItemGroup;
//# sourceMappingURL=index.js.map


/***/ })

});