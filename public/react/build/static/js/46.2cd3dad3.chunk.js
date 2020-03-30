webpackJsonp([46],{

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

/***/ 1168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_tooltip_style_css__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_tooltip_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_tooltip_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__css_Courses_css__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__css_Courses_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__css_Courses_css__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var CoursesListType=function(_Component){_inherits(CoursesListType,_Component);function CoursesListType(props){_classCallCheck(this,CoursesListType);var _this=_possibleConstructorReturn(this,(CoursesListType.__proto__||Object.getPrototypeOf(CoursesListType)).call(this,props));_this.state={// typelist:[],
// typesylename:"",
// tipval:""
};return _this;}_createClass(CoursesListType,[{key:'componentDidMount',value:function componentDidMount(){// let{typelist,typesylename,tipval}=this.props;
//
// this.setState({
//   typelist:typelist,
//   typesylename:typesylename,
//   tipval:tipval
// })
// console.log("CoursesListType")
// console.log(typelist)
}},{key:'render',value:function render(){var _props=this.props,typelist=_props.typelist,typesylename=_props.typesylename,tipval=_props.tipval;return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{style:{display:'inline-block'}},typelist===undefined||typelist===403||typelist===401||typelist===407||typelist===408||typelist===409||typelist===500?"":typelist.map(function(item,key){return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip___default.a,{placement:'bottom',title:tipval,getPopupContainer:function getPopupContainer(){return document.querySelector('.TabsWarp');},key:key},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{key:key},item==="公开"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-4CACFF ml15 fl typestyle "+typesylename},'\u516C\u5F00'):"",item==="已开启补交"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-028d01 ml15 fl typestyle "+typesylename},'\u5DF2\u5F00\u542F\u8865\u4EA4'):"",item==="未开启补交"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-CC317C ml15 fl typestyle "+typesylename},'\u672A\u5F00\u542F\u8865\u4EA4'):"",item==="匿名作品"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-006B75 ml15 fl typestyle "+typesylename},'\u533F\u540D\u4F5C\u54C1'):"",item==="已选择"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-EDEDED ml15 fl typestyle color666666 "+typesylename},'\u5DF2\u9009\u62E9'):"",item==="已结束"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-EDEDED ml15 fl typestyle color666666 "+typesylename},'\u5DF2\u7ED3\u675F'):"",item==="提交中"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-4CACFF ml15 fl typestyle "+typesylename},'\u63D0\u4EA4\u4E2D'):"",item==="匿评中"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-4CACFF ml15 fl typestyle "+typesylename},'\u533F\u8BC4\u4E2D'):"",item==="申诉中"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-4CACFF ml15 fl typestyle "+typesylename},'\u7533\u8BC9\u4E2D'):"",item==="补交中"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-4CACFF ml15 fl typestyle "+typesylename},'\u8865\u4EA4\u4E2D'):"",item==="评阅中"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-4CACFF ml15 fl typestyle "+typesylename},'\u8BC4\u9605\u4E2D'):"",item==="待选中"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-4CACFF ml15 fl typestyle "+typesylename},'\u5F85\u9009\u4E2D'):"",item==="交叉评阅中"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-4CACFF ml15 fl typestyle "+typesylename},'\u4EA4\u53C9\u8BC4\u9605\u4E2D'):"",item==="已开启交叉评阅"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-E99695 ml15 fl typestyle "+typesylename},'\u5DF2\u5F00\u542F\u4EA4\u53C9\u8BC4\u9605'):"",item==="待确认"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-5E5FB9 ml15 fl typestyle "+typesylename},'\u5F85\u786E\u8BA4'):"",item==="待处理"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-5E5FB9 ml15 fl typestyle mr10 "+typesylename},'\u5F85\u5904\u7406'):"",item==="未发布"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-84B6EB ml15 fl typestyle "+typesylename},'\u672A\u53D1\u5E03'):"",item==="私有"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-84B6EB ml15 fl typestyle "+typesylename},'\u79C1\u6709'):"",item==="未提交"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-84B6EB ml15 fl typestyle "+typesylename},'\u672A\u63D0\u4EA4'):"",item==="已确认"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-FC2B6A ml15 fl typestyle "+typesylename},'\u5DF2\u786E\u8BA4'):"",item==="已截止"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-FC2B6A ml15 fl typestyle "+typesylename},'\u5DF2\u622A\u6B62'):"",item==="开放课程"?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"edu-filter-btn edu-filter-btn-FF6800 ml15 fl typestyle "+typesylename},'\u5F00\u653E\u8BFE\u7A0B'):""));}));}}]);return CoursesListType;}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (CoursesListType);// let typelist=["公开",
//               "已开启补交",
//               "未开启补交",
//               "匿名作品",
//               "已选择",
//               "已结束",
//               "提交中",
//               "匿评中",
//               "申诉中",
//               "补交中",
//               "评阅中",
//               "待选中",
//               "交叉评阅中",
//               "已开启交叉评阅",
//               "待确认",
//               "待处理",
//               "未发布",
//               "私有",
//               "未提交",
//               "已确认",
//               "已截止",
//             ]

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

/***/ 1442:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1552)


/***/ }),

/***/ 1444:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(31);

__webpack_require__(1479);
//# sourceMappingURL=css.js.map


/***/ }),

/***/ 1451:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(31);

__webpack_require__(1463);
//# sourceMappingURL=css.js.map


/***/ }),

/***/ 1452:
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
var update = __webpack_require__(318)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 1464:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(317)(true);
// imports


// module
exports.push([module.i, ".ant-divider{-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0;color:rgba(0,0,0,.65);font-size:14px;font-variant:tabular-nums;line-height:1.5;list-style:none;-webkit-font-feature-settings:\"tnum\";font-feature-settings:\"tnum\";background:#e8e8e8}.ant-divider,.ant-divider-vertical{position:relative;top:-.06em;display:inline-block;width:1px;height:.9em;margin:0 8px;vertical-align:middle}.ant-divider-horizontal{display:block;clear:both;width:100%;min-width:100%;height:1px;margin:24px 0}.ant-divider-horizontal.ant-divider-with-text-center,.ant-divider-horizontal.ant-divider-with-text-left,.ant-divider-horizontal.ant-divider-with-text-right{display:table;margin:16px 0;color:rgba(0,0,0,.85);font-weight:500;font-size:16px;white-space:nowrap;text-align:center;background:transparent}.ant-divider-horizontal.ant-divider-with-text-center:after,.ant-divider-horizontal.ant-divider-with-text-center:before,.ant-divider-horizontal.ant-divider-with-text-left:after,.ant-divider-horizontal.ant-divider-with-text-left:before,.ant-divider-horizontal.ant-divider-with-text-right:after,.ant-divider-horizontal.ant-divider-with-text-right:before{position:relative;top:50%;display:table-cell;width:50%;border-top:1px solid #e8e8e8;-webkit-transform:translateY(50%);-ms-transform:translateY(50%);transform:translateY(50%);content:\"\"}.ant-divider-horizontal.ant-divider-with-text-left .ant-divider-inner-text,.ant-divider-horizontal.ant-divider-with-text-right .ant-divider-inner-text{display:inline-block;padding:0 10px}.ant-divider-horizontal.ant-divider-with-text-left:before{top:50%;width:5%}.ant-divider-horizontal.ant-divider-with-text-left:after,.ant-divider-horizontal.ant-divider-with-text-right:before{top:50%;width:95%}.ant-divider-horizontal.ant-divider-with-text-right:after{top:50%;width:5%}.ant-divider-inner-text{display:inline-block;padding:0 24px}.ant-divider-dashed{background:none;border-color:#e8e8e8;border-style:dashed;border-width:1px 0 0}.ant-divider-horizontal.ant-divider-with-text-center.ant-divider-dashed,.ant-divider-horizontal.ant-divider-with-text-left.ant-divider-dashed,.ant-divider-horizontal.ant-divider-with-text-right.ant-divider-dashed{border-top:0}.ant-divider-horizontal.ant-divider-with-text-center.ant-divider-dashed:after,.ant-divider-horizontal.ant-divider-with-text-center.ant-divider-dashed:before,.ant-divider-horizontal.ant-divider-with-text-left.ant-divider-dashed:after,.ant-divider-horizontal.ant-divider-with-text-left.ant-divider-dashed:before,.ant-divider-horizontal.ant-divider-with-text-right.ant-divider-dashed:after,.ant-divider-horizontal.ant-divider-with-text-right.ant-divider-dashed:before{border-style:dashed none none}.ant-divider-vertical.ant-divider-dashed{border-width:0 0 0 1px}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/node_modules/antd/lib/divider/style/index.css"],"names":[],"mappings":"AAIA,aACE,8BAA+B,AACvB,sBAAuB,AAC/B,SAAU,AACV,UAAW,AACX,sBAA2B,AAC3B,eAAgB,AAChB,0BAA2B,AAC3B,gBAAiB,AACjB,gBAAiB,AACjB,qCAAsC,AAC9B,6BAA8B,AACtC,kBAAoB,CACrB,AACD,mCAEE,kBAAmB,AACnB,WAAa,AACb,qBAAsB,AACtB,UAAW,AACX,YAAc,AACd,aAAc,AACd,qBAAuB,CACxB,AACD,wBACE,cAAe,AACf,WAAY,AACZ,WAAY,AACZ,eAAgB,AAChB,WAAY,AACZ,aAAe,CAChB,AACD,4JAGE,cAAe,AACf,cAAe,AACf,sBAA2B,AAC3B,gBAAiB,AACjB,eAAgB,AAChB,mBAAoB,AACpB,kBAAmB,AACnB,sBAAwB,CACzB,AACD,+VAME,kBAAmB,AACnB,QAAS,AACT,mBAAoB,AACpB,UAAW,AACX,6BAA8B,AAC9B,kCAAmC,AAC/B,8BAA+B,AAC3B,0BAA2B,AACnC,UAAY,CACb,AACD,uJAEE,qBAAsB,AACtB,cAAgB,CACjB,AACD,0DACE,QAAS,AACT,QAAU,CACX,AAKD,oHAHE,QAAS,AACT,SAAW,CAKZ,AACD,0DACE,QAAS,AACT,QAAU,CACX,AACD,wBACE,qBAAsB,AACtB,cAAgB,CACjB,AACD,oBACE,gBAAiB,AACjB,qBAAsB,AACtB,oBAAqB,AACrB,oBAAsB,CACvB,AACD,qNAGE,YAAc,CACf,AACD,idAME,6BAA+B,CAChC,AACD,yCACE,sBAAwB,CACzB","file":"index.css","sourcesContent":["/* stylelint-disable at-rule-empty-line-before,at-rule-name-space-after,at-rule-no-unknown */\n/* stylelint-disable no-duplicate-selectors */\n/* stylelint-disable */\n/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors,string-no-newline */\n.ant-divider {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  color: rgba(0, 0, 0, 0.65);\n  font-size: 14px;\n  font-variant: tabular-nums;\n  line-height: 1.5;\n  list-style: none;\n  -webkit-font-feature-settings: 'tnum';\n          font-feature-settings: 'tnum';\n  background: #e8e8e8;\n}\n.ant-divider,\n.ant-divider-vertical {\n  position: relative;\n  top: -0.06em;\n  display: inline-block;\n  width: 1px;\n  height: 0.9em;\n  margin: 0 8px;\n  vertical-align: middle;\n}\n.ant-divider-horizontal {\n  display: block;\n  clear: both;\n  width: 100%;\n  min-width: 100%;\n  height: 1px;\n  margin: 24px 0;\n}\n.ant-divider-horizontal.ant-divider-with-text-center,\n.ant-divider-horizontal.ant-divider-with-text-left,\n.ant-divider-horizontal.ant-divider-with-text-right {\n  display: table;\n  margin: 16px 0;\n  color: rgba(0, 0, 0, 0.85);\n  font-weight: 500;\n  font-size: 16px;\n  white-space: nowrap;\n  text-align: center;\n  background: transparent;\n}\n.ant-divider-horizontal.ant-divider-with-text-center::before,\n.ant-divider-horizontal.ant-divider-with-text-left::before,\n.ant-divider-horizontal.ant-divider-with-text-right::before,\n.ant-divider-horizontal.ant-divider-with-text-center::after,\n.ant-divider-horizontal.ant-divider-with-text-left::after,\n.ant-divider-horizontal.ant-divider-with-text-right::after {\n  position: relative;\n  top: 50%;\n  display: table-cell;\n  width: 50%;\n  border-top: 1px solid #e8e8e8;\n  -webkit-transform: translateY(50%);\n      -ms-transform: translateY(50%);\n          transform: translateY(50%);\n  content: '';\n}\n.ant-divider-horizontal.ant-divider-with-text-left .ant-divider-inner-text,\n.ant-divider-horizontal.ant-divider-with-text-right .ant-divider-inner-text {\n  display: inline-block;\n  padding: 0 10px;\n}\n.ant-divider-horizontal.ant-divider-with-text-left::before {\n  top: 50%;\n  width: 5%;\n}\n.ant-divider-horizontal.ant-divider-with-text-left::after {\n  top: 50%;\n  width: 95%;\n}\n.ant-divider-horizontal.ant-divider-with-text-right::before {\n  top: 50%;\n  width: 95%;\n}\n.ant-divider-horizontal.ant-divider-with-text-right::after {\n  top: 50%;\n  width: 5%;\n}\n.ant-divider-inner-text {\n  display: inline-block;\n  padding: 0 24px;\n}\n.ant-divider-dashed {\n  background: none;\n  border-color: #e8e8e8;\n  border-style: dashed;\n  border-width: 1px 0 0;\n}\n.ant-divider-horizontal.ant-divider-with-text-center.ant-divider-dashed,\n.ant-divider-horizontal.ant-divider-with-text-left.ant-divider-dashed,\n.ant-divider-horizontal.ant-divider-with-text-right.ant-divider-dashed {\n  border-top: 0;\n}\n.ant-divider-horizontal.ant-divider-with-text-center.ant-divider-dashed::before,\n.ant-divider-horizontal.ant-divider-with-text-left.ant-divider-dashed::before,\n.ant-divider-horizontal.ant-divider-with-text-right.ant-divider-dashed::before,\n.ant-divider-horizontal.ant-divider-with-text-center.ant-divider-dashed::after,\n.ant-divider-horizontal.ant-divider-with-text-left.ant-divider-dashed::after,\n.ant-divider-horizontal.ant-divider-with-text-right.ant-divider-dashed::after {\n  border-style: dashed none none;\n}\n.ant-divider-vertical.ant-divider-dashed {\n  border-width: 0 0 0 1px;\n}\n"],"sourceRoot":""}]);

// exports


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

/***/ 1479:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1480);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(318)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 1480:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(317)(true);
// imports


// module
exports.push([module.i, ".ant-popover{-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0;color:rgba(0,0,0,.65);font-size:14px;font-variant:tabular-nums;line-height:1.5;list-style:none;-webkit-font-feature-settings:\"tnum\";font-feature-settings:\"tnum\";position:absolute;top:0;left:0;z-index:1030;font-weight:400;white-space:normal;text-align:left;cursor:auto;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}.ant-popover:after{position:absolute;background:hsla(0,0%,100%,.01);content:\"\"}.ant-popover-hidden{display:none}.ant-popover-placement-top,.ant-popover-placement-topLeft,.ant-popover-placement-topRight{padding-bottom:10px}.ant-popover-placement-right,.ant-popover-placement-rightBottom,.ant-popover-placement-rightTop{padding-left:10px}.ant-popover-placement-bottom,.ant-popover-placement-bottomLeft,.ant-popover-placement-bottomRight{padding-top:10px}.ant-popover-placement-left,.ant-popover-placement-leftBottom,.ant-popover-placement-leftTop{padding-right:10px}.ant-popover-inner{background-color:#fff;background-clip:padding-box;border-radius:4px;-webkit-box-shadow:0 2px 8px rgba(0,0,0,.15);box-shadow:0 2px 8px rgba(0,0,0,.15);-webkit-box-shadow:0 0 8px rgba(0,0,0,.15)\\9;box-shadow:0 0 8px rgba(0,0,0,.15)\\9}@media (-ms-high-contrast:none),screen and (-ms-high-contrast:active){.ant-popover-inner{-webkit-box-shadow:0 2px 8px rgba(0,0,0,.15);box-shadow:0 2px 8px rgba(0,0,0,.15)}}.ant-popover-title{min-width:177px;min-height:32px;margin:0;padding:5px 16px 4px;color:rgba(0,0,0,.85);font-weight:500;border-bottom:1px solid #e8e8e8}.ant-popover-inner-content{padding:12px 16px;color:rgba(0,0,0,.65)}.ant-popover-message{position:relative;padding:4px 0 12px;color:rgba(0,0,0,.65);font-size:14px}.ant-popover-message>.anticon{position:absolute;top:8px;color:#faad14;font-size:14px}.ant-popover-message-title{padding-left:22px}.ant-popover-buttons{margin-bottom:4px;text-align:right}.ant-popover-buttons button{margin-left:8px}.ant-popover-arrow{position:absolute;display:block;width:8.48528137px;height:8.48528137px;background:transparent;border-style:solid;border-width:4.24264069px;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.ant-popover-placement-top>.ant-popover-content>.ant-popover-arrow,.ant-popover-placement-topLeft>.ant-popover-content>.ant-popover-arrow,.ant-popover-placement-topRight>.ant-popover-content>.ant-popover-arrow{bottom:6.2px;border-top-color:transparent;border-right-color:#fff;border-bottom-color:#fff;border-left-color:transparent;-webkit-box-shadow:3px 3px 7px rgba(0,0,0,.07);box-shadow:3px 3px 7px rgba(0,0,0,.07)}.ant-popover-placement-top>.ant-popover-content>.ant-popover-arrow{left:50%;-webkit-transform:translateX(-50%) rotate(45deg);-ms-transform:translateX(-50%) rotate(45deg);transform:translateX(-50%) rotate(45deg)}.ant-popover-placement-topLeft>.ant-popover-content>.ant-popover-arrow{left:16px}.ant-popover-placement-topRight>.ant-popover-content>.ant-popover-arrow{right:16px}.ant-popover-placement-right>.ant-popover-content>.ant-popover-arrow,.ant-popover-placement-rightBottom>.ant-popover-content>.ant-popover-arrow,.ant-popover-placement-rightTop>.ant-popover-content>.ant-popover-arrow{left:6px;border-top-color:transparent;border-right-color:transparent;border-bottom-color:#fff;border-left-color:#fff;-webkit-box-shadow:-3px 3px 7px rgba(0,0,0,.07);box-shadow:-3px 3px 7px rgba(0,0,0,.07)}.ant-popover-placement-right>.ant-popover-content>.ant-popover-arrow{top:50%;-webkit-transform:translateY(-50%) rotate(45deg);-ms-transform:translateY(-50%) rotate(45deg);transform:translateY(-50%) rotate(45deg)}.ant-popover-placement-rightTop>.ant-popover-content>.ant-popover-arrow{top:12px}.ant-popover-placement-rightBottom>.ant-popover-content>.ant-popover-arrow{bottom:12px}.ant-popover-placement-bottom>.ant-popover-content>.ant-popover-arrow,.ant-popover-placement-bottomLeft>.ant-popover-content>.ant-popover-arrow,.ant-popover-placement-bottomRight>.ant-popover-content>.ant-popover-arrow{top:6px;border-top-color:#fff;border-right-color:transparent;border-bottom-color:transparent;border-left-color:#fff;-webkit-box-shadow:-2px -2px 5px rgba(0,0,0,.06);box-shadow:-2px -2px 5px rgba(0,0,0,.06)}.ant-popover-placement-bottom>.ant-popover-content>.ant-popover-arrow{left:50%;-webkit-transform:translateX(-50%) rotate(45deg);-ms-transform:translateX(-50%) rotate(45deg);transform:translateX(-50%) rotate(45deg)}.ant-popover-placement-bottomLeft>.ant-popover-content>.ant-popover-arrow{left:16px}.ant-popover-placement-bottomRight>.ant-popover-content>.ant-popover-arrow{right:16px}.ant-popover-placement-left>.ant-popover-content>.ant-popover-arrow,.ant-popover-placement-leftBottom>.ant-popover-content>.ant-popover-arrow,.ant-popover-placement-leftTop>.ant-popover-content>.ant-popover-arrow{right:6px;border-top-color:#fff;border-right-color:#fff;border-bottom-color:transparent;border-left-color:transparent;-webkit-box-shadow:3px -3px 7px rgba(0,0,0,.07);box-shadow:3px -3px 7px rgba(0,0,0,.07)}.ant-popover-placement-left>.ant-popover-content>.ant-popover-arrow{top:50%;-webkit-transform:translateY(-50%) rotate(45deg);-ms-transform:translateY(-50%) rotate(45deg);transform:translateY(-50%) rotate(45deg)}.ant-popover-placement-leftTop>.ant-popover-content>.ant-popover-arrow{top:12px}.ant-popover-placement-leftBottom>.ant-popover-content>.ant-popover-arrow{bottom:12px}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/node_modules/antd/lib/popover/style/index.css"],"names":[],"mappings":"AAIA,aACE,8BAA+B,AACvB,sBAAuB,AAC/B,SAAU,AACV,UAAW,AACX,sBAA2B,AAC3B,eAAgB,AAChB,0BAA2B,AAC3B,gBAAiB,AACjB,gBAAiB,AACjB,qCAAsC,AAC9B,6BAA8B,AACtC,kBAAmB,AACnB,MAAO,AACP,OAAQ,AACR,aAAc,AACd,gBAAoB,AACpB,mBAAoB,AACpB,gBAAiB,AACjB,YAAa,AACb,yBAA0B,AACvB,sBAAuB,AACtB,qBAAsB,AAClB,gBAAkB,CAC3B,AACD,mBACE,kBAAmB,AACnB,+BAAsC,AACtC,UAAY,CACb,AACD,oBACE,YAAc,CACf,AACD,0FAGE,mBAAqB,CACtB,AACD,gGAGE,iBAAmB,CACpB,AACD,mGAGE,gBAAkB,CACnB,AACD,6FAGE,kBAAoB,CACrB,AACD,mBACE,sBAAuB,AACvB,4BAA6B,AAC7B,kBAAmB,AACnB,6CAAkD,AAC1C,qCAA0C,AAClD,6CAAmD,AAC3C,oCAA2C,CACpD,AACD,sEAIE,mBACE,6CAAkD,AAC1C,oCAA0C,CACnD,CACF,AACD,mBACE,gBAAiB,AACjB,gBAAiB,AACjB,SAAU,AACV,qBAAsB,AACtB,sBAA2B,AAC3B,gBAAiB,AACjB,+BAAiC,CAClC,AACD,2BACE,kBAAmB,AACnB,qBAA2B,CAC5B,AACD,qBACE,kBAAmB,AACnB,mBAAoB,AACpB,sBAA2B,AAC3B,cAAgB,CACjB,AACD,8BACE,kBAAmB,AACnB,QAAS,AACT,cAAe,AACf,cAAgB,CACjB,AACD,2BACE,iBAAmB,CACpB,AACD,qBACE,kBAAmB,AACnB,gBAAkB,CACnB,AACD,4BACE,eAAiB,CAClB,AACD,mBACE,kBAAmB,AACnB,cAAe,AACf,mBAAoB,AACpB,oBAAqB,AACrB,uBAAwB,AACxB,mBAAoB,AACpB,0BAA2B,AAC3B,gCAAiC,AAC7B,4BAA6B,AACzB,uBAAyB,CAClC,AACD,kNAGE,aAAc,AACd,6BAA8B,AAC9B,wBAAyB,AACzB,yBAA0B,AAC1B,8BAA+B,AAC/B,+CAAoD,AAC5C,sCAA4C,CACrD,AACD,mEACE,SAAU,AACV,iDAAkD,AAC9C,6CAA8C,AAC1C,wCAA0C,CACnD,AACD,uEACE,SAAW,CACZ,AACD,wEACE,UAAY,CACb,AACD,wNAGE,SAAU,AACV,6BAA8B,AAC9B,+BAAgC,AAChC,yBAA0B,AAC1B,uBAAwB,AACxB,gDAAqD,AAC7C,uCAA6C,CACtD,AACD,qEACE,QAAS,AACT,iDAAkD,AAC9C,6CAA8C,AAC1C,wCAA0C,CACnD,AACD,wEACE,QAAU,CACX,AACD,2EACE,WAAa,CACd,AACD,2NAGE,QAAS,AACT,sBAAuB,AACvB,+BAAgC,AAChC,gCAAiC,AACjC,uBAAwB,AACxB,iDAAsD,AAC9C,wCAA8C,CACvD,AACD,sEACE,SAAU,AACV,iDAAkD,AAC9C,6CAA8C,AAC1C,wCAA0C,CACnD,AACD,0EACE,SAAW,CACZ,AACD,2EACE,UAAY,CACb,AACD,qNAGE,UAAW,AACX,sBAAuB,AACvB,wBAAyB,AACzB,gCAAiC,AACjC,8BAA+B,AAC/B,gDAAqD,AAC7C,uCAA6C,CACtD,AACD,oEACE,QAAS,AACT,iDAAkD,AAC9C,6CAA8C,AAC1C,wCAA0C,CACnD,AACD,uEACE,QAAU,CACX,AACD,0EACE,WAAa,CACd","file":"index.css","sourcesContent":["/* stylelint-disable at-rule-empty-line-before,at-rule-name-space-after,at-rule-no-unknown */\n/* stylelint-disable no-duplicate-selectors */\n/* stylelint-disable */\n/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors,string-no-newline */\n.ant-popover {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  color: rgba(0, 0, 0, 0.65);\n  font-size: 14px;\n  font-variant: tabular-nums;\n  line-height: 1.5;\n  list-style: none;\n  -webkit-font-feature-settings: 'tnum';\n          font-feature-settings: 'tnum';\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1030;\n  font-weight: normal;\n  white-space: normal;\n  text-align: left;\n  cursor: auto;\n  -webkit-user-select: text;\n     -moz-user-select: text;\n      -ms-user-select: text;\n          user-select: text;\n}\n.ant-popover::after {\n  position: absolute;\n  background: rgba(255, 255, 255, 0.01);\n  content: '';\n}\n.ant-popover-hidden {\n  display: none;\n}\n.ant-popover-placement-top,\n.ant-popover-placement-topLeft,\n.ant-popover-placement-topRight {\n  padding-bottom: 10px;\n}\n.ant-popover-placement-right,\n.ant-popover-placement-rightTop,\n.ant-popover-placement-rightBottom {\n  padding-left: 10px;\n}\n.ant-popover-placement-bottom,\n.ant-popover-placement-bottomLeft,\n.ant-popover-placement-bottomRight {\n  padding-top: 10px;\n}\n.ant-popover-placement-left,\n.ant-popover-placement-leftTop,\n.ant-popover-placement-leftBottom {\n  padding-right: 10px;\n}\n.ant-popover-inner {\n  background-color: #fff;\n  background-clip: padding-box;\n  border-radius: 4px;\n  -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n  -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, 0.15) \\9;\n          box-shadow: 0 0 8px rgba(0, 0, 0, 0.15) \\9;\n}\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n  .ant-popover {\n    /* IE10+ */\n  }\n  .ant-popover-inner {\n    -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n  }\n}\n.ant-popover-title {\n  min-width: 177px;\n  min-height: 32px;\n  margin: 0;\n  padding: 5px 16px 4px;\n  color: rgba(0, 0, 0, 0.85);\n  font-weight: 500;\n  border-bottom: 1px solid #e8e8e8;\n}\n.ant-popover-inner-content {\n  padding: 12px 16px;\n  color: rgba(0, 0, 0, 0.65);\n}\n.ant-popover-message {\n  position: relative;\n  padding: 4px 0 12px;\n  color: rgba(0, 0, 0, 0.65);\n  font-size: 14px;\n}\n.ant-popover-message > .anticon {\n  position: absolute;\n  top: 8px;\n  color: #faad14;\n  font-size: 14px;\n}\n.ant-popover-message-title {\n  padding-left: 22px;\n}\n.ant-popover-buttons {\n  margin-bottom: 4px;\n  text-align: right;\n}\n.ant-popover-buttons button {\n  margin-left: 8px;\n}\n.ant-popover-arrow {\n  position: absolute;\n  display: block;\n  width: 8.48528137px;\n  height: 8.48528137px;\n  background: transparent;\n  border-style: solid;\n  border-width: 4.24264069px;\n  -webkit-transform: rotate(45deg);\n      -ms-transform: rotate(45deg);\n          transform: rotate(45deg);\n}\n.ant-popover-placement-top > .ant-popover-content > .ant-popover-arrow,\n.ant-popover-placement-topLeft > .ant-popover-content > .ant-popover-arrow,\n.ant-popover-placement-topRight > .ant-popover-content > .ant-popover-arrow {\n  bottom: 6.2px;\n  border-top-color: transparent;\n  border-right-color: #fff;\n  border-bottom-color: #fff;\n  border-left-color: transparent;\n  -webkit-box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.07);\n          box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.07);\n}\n.ant-popover-placement-top > .ant-popover-content > .ant-popover-arrow {\n  left: 50%;\n  -webkit-transform: translateX(-50%) rotate(45deg);\n      -ms-transform: translateX(-50%) rotate(45deg);\n          transform: translateX(-50%) rotate(45deg);\n}\n.ant-popover-placement-topLeft > .ant-popover-content > .ant-popover-arrow {\n  left: 16px;\n}\n.ant-popover-placement-topRight > .ant-popover-content > .ant-popover-arrow {\n  right: 16px;\n}\n.ant-popover-placement-right > .ant-popover-content > .ant-popover-arrow,\n.ant-popover-placement-rightTop > .ant-popover-content > .ant-popover-arrow,\n.ant-popover-placement-rightBottom > .ant-popover-content > .ant-popover-arrow {\n  left: 6px;\n  border-top-color: transparent;\n  border-right-color: transparent;\n  border-bottom-color: #fff;\n  border-left-color: #fff;\n  -webkit-box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);\n          box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);\n}\n.ant-popover-placement-right > .ant-popover-content > .ant-popover-arrow {\n  top: 50%;\n  -webkit-transform: translateY(-50%) rotate(45deg);\n      -ms-transform: translateY(-50%) rotate(45deg);\n          transform: translateY(-50%) rotate(45deg);\n}\n.ant-popover-placement-rightTop > .ant-popover-content > .ant-popover-arrow {\n  top: 12px;\n}\n.ant-popover-placement-rightBottom > .ant-popover-content > .ant-popover-arrow {\n  bottom: 12px;\n}\n.ant-popover-placement-bottom > .ant-popover-content > .ant-popover-arrow,\n.ant-popover-placement-bottomLeft > .ant-popover-content > .ant-popover-arrow,\n.ant-popover-placement-bottomRight > .ant-popover-content > .ant-popover-arrow {\n  top: 6px;\n  border-top-color: #fff;\n  border-right-color: transparent;\n  border-bottom-color: transparent;\n  border-left-color: #fff;\n  -webkit-box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.06);\n          box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.06);\n}\n.ant-popover-placement-bottom > .ant-popover-content > .ant-popover-arrow {\n  left: 50%;\n  -webkit-transform: translateX(-50%) rotate(45deg);\n      -ms-transform: translateX(-50%) rotate(45deg);\n          transform: translateX(-50%) rotate(45deg);\n}\n.ant-popover-placement-bottomLeft > .ant-popover-content > .ant-popover-arrow {\n  left: 16px;\n}\n.ant-popover-placement-bottomRight > .ant-popover-content > .ant-popover-arrow {\n  right: 16px;\n}\n.ant-popover-placement-left > .ant-popover-content > .ant-popover-arrow,\n.ant-popover-placement-leftTop > .ant-popover-content > .ant-popover-arrow,\n.ant-popover-placement-leftBottom > .ant-popover-content > .ant-popover-arrow {\n  right: 6px;\n  border-top-color: #fff;\n  border-right-color: #fff;\n  border-bottom-color: transparent;\n  border-left-color: transparent;\n  -webkit-box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);\n          box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);\n}\n.ant-popover-placement-left > .ant-popover-content > .ant-popover-arrow {\n  top: 50%;\n  -webkit-transform: translateY(-50%) rotate(45deg);\n      -ms-transform: translateY(-50%) rotate(45deg);\n          transform: translateY(-50%) rotate(45deg);\n}\n.ant-popover-placement-leftTop > .ant-popover-content > .ant-popover-arrow {\n  top: 12px;\n}\n.ant-popover-placement-leftBottom > .ant-popover-content > .ant-popover-arrow {\n  bottom: 12px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1533:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(31);

__webpack_require__(1553);

__webpack_require__(322);

__webpack_require__(60);
//# sourceMappingURL=css.js.map


/***/ }),

/***/ 1534:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(__webpack_require__(0));

var _rcSelect = __webpack_require__(359);

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _InputElement = _interopRequireDefault(__webpack_require__(1555));

var _input = _interopRequireDefault(__webpack_require__(61));

var _select = _interopRequireDefault(__webpack_require__(320));

var _configProvider = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

function isSelectOptionOrSelectOptGroup(child) {
  return child && child.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
}

var AutoComplete =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AutoComplete, _React$Component);

  function AutoComplete() {
    var _this;

    _classCallCheck(this, AutoComplete);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AutoComplete).apply(this, arguments));

    _this.saveSelect = function (node) {
      _this.select = node;
    };

    _this.getInputElement = function () {
      var children = _this.props.children;
      var element = children && React.isValidElement(children) && children.type !== _rcSelect.Option ? React.Children.only(_this.props.children) : React.createElement(_input["default"], null);

      var elementProps = _extends({}, element.props); // https://github.com/ant-design/ant-design/pull/7742


      delete elementProps.children;
      return React.createElement(_InputElement["default"], elementProps, element);
    };

    _this.renderAutoComplete = function (_ref) {
      var _classNames;

      var getPrefixCls = _ref.getPrefixCls;
      var _this$props = _this.props,
          customizePrefixCls = _this$props.prefixCls,
          size = _this$props.size,
          _this$props$className = _this$props.className,
          className = _this$props$className === void 0 ? '' : _this$props$className,
          notFoundContent = _this$props.notFoundContent,
          optionLabelProp = _this$props.optionLabelProp,
          dataSource = _this$props.dataSource,
          children = _this$props.children;
      var prefixCls = getPrefixCls('select', customizePrefixCls);
      var cls = (0, _classnames["default"])((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-lg"), size === 'large'), _defineProperty(_classNames, "".concat(prefixCls, "-sm"), size === 'small'), _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, "".concat(prefixCls, "-show-search"), true), _defineProperty(_classNames, "".concat(prefixCls, "-auto-complete"), true), _classNames));
      var options;
      var childArray = React.Children.toArray(children);

      if (childArray.length && isSelectOptionOrSelectOptGroup(childArray[0])) {
        options = children;
      } else {
        options = dataSource ? dataSource.map(function (item) {
          if (React.isValidElement(item)) {
            return item;
          }

          switch (_typeof(item)) {
            case 'string':
              return React.createElement(_rcSelect.Option, {
                key: item
              }, item);

            case 'object':
              return React.createElement(_rcSelect.Option, {
                key: item.value
              }, item.text);

            default:
              throw new Error('AutoComplete[dataSource] only supports type `string[] | Object[]`.');
          }
        }) : [];
      }

      return React.createElement(_select["default"], _extends({}, _this.props, {
        className: cls,
        mode: _select["default"].SECRET_COMBOBOX_MODE_DO_NOT_USE,
        optionLabelProp: optionLabelProp,
        getInputElement: _this.getInputElement,
        notFoundContent: notFoundContent,
        ref: _this.saveSelect
      }), options);
    };

    return _this;
  }

  _createClass(AutoComplete, [{
    key: "focus",
    value: function focus() {
      this.select.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.select.blur();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderAutoComplete);
    }
  }]);

  return AutoComplete;
}(React.Component);

exports["default"] = AutoComplete;
AutoComplete.Option = _rcSelect.Option;
AutoComplete.OptGroup = _rcSelect.OptGroup;
AutoComplete.defaultProps = {
  transitionName: 'slide-up',
  optionLabelProp: 'children',
  choiceTransitionName: 'zoom',
  showSearch: false,
  filterOption: false
};
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 1548:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(199);

/***/ }),

/***/ 1552:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InfiniteScroll = function (_Component) {
  _inherits(InfiniteScroll, _Component);

  function InfiniteScroll(props) {
    _classCallCheck(this, InfiniteScroll);

    var _this = _possibleConstructorReturn(this, (InfiniteScroll.__proto__ || Object.getPrototypeOf(InfiniteScroll)).call(this, props));

    _this.scrollListener = _this.scrollListener.bind(_this);
    _this.eventListenerOptions = _this.eventListenerOptions.bind(_this);
    _this.mousewheelListener = _this.mousewheelListener.bind(_this);
    return _this;
  }

  _createClass(InfiniteScroll, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.pageLoaded = this.props.pageStart;
      this.options = this.eventListenerOptions();
      this.attachScrollListener();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.isReverse && this.loadMore) {
        var parentElement = this.getParentElement(this.scrollComponent);
        parentElement.scrollTop = parentElement.scrollHeight - this.beforeScrollHeight + this.beforeScrollTop;
        this.loadMore = false;
      }
      this.attachScrollListener();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.detachScrollListener();
      this.detachMousewheelListener();
    }
  }, {
    key: 'isPassiveSupported',
    value: function isPassiveSupported() {
      var passive = false;

      var testOptions = {
        get passive() {
          passive = true;
        }
      };

      try {
        document.addEventListener('test', null, testOptions);
        document.removeEventListener('test', null, testOptions);
      } catch (e) {
        // ignore
      }
      return passive;
    }
  }, {
    key: 'eventListenerOptions',
    value: function eventListenerOptions() {
      var options = this.props.useCapture;

      if (this.isPassiveSupported()) {
        options = {
          useCapture: this.props.useCapture,
          passive: true
        };
      }
      return options;
    }

    // Set a defaut loader for all your `InfiniteScroll` components

  }, {
    key: 'setDefaultLoader',
    value: function setDefaultLoader(loader) {
      this.defaultLoader = loader;
    }
  }, {
    key: 'detachMousewheelListener',
    value: function detachMousewheelListener() {
      var scrollEl = window;
      if (this.props.useWindow === false) {
        scrollEl = this.scrollComponent.parentNode;
      }

      scrollEl.removeEventListener('mousewheel', this.mousewheelListener, this.options ? this.options : this.props.useCapture);
    }
  }, {
    key: 'detachScrollListener',
    value: function detachScrollListener() {
      var scrollEl = window;
      if (this.props.useWindow === false) {
        scrollEl = this.getParentElement(this.scrollComponent);
      }

      scrollEl.removeEventListener('scroll', this.scrollListener, this.options ? this.options : this.props.useCapture);
      scrollEl.removeEventListener('resize', this.scrollListener, this.options ? this.options : this.props.useCapture);
    }
  }, {
    key: 'getParentElement',
    value: function getParentElement(el) {
      var scrollParent = this.props.getScrollParent && this.props.getScrollParent();
      if (scrollParent != null) {
        return scrollParent;
      }
      return el && el.parentNode;
    }
  }, {
    key: 'filterProps',
    value: function filterProps(props) {
      return props;
    }
  }, {
    key: 'attachScrollListener',
    value: function attachScrollListener() {
      var parentElement = this.getParentElement(this.scrollComponent);

      if (!this.props.hasMore || !parentElement) {
        return;
      }

      var scrollEl = window;
      if (this.props.useWindow === false) {
        scrollEl = parentElement;
      }

      scrollEl.addEventListener('mousewheel', this.mousewheelListener, this.options ? this.options : this.props.useCapture);
      scrollEl.addEventListener('scroll', this.scrollListener, this.options ? this.options : this.props.useCapture);
      scrollEl.addEventListener('resize', this.scrollListener, this.options ? this.options : this.props.useCapture);

      if (this.props.initialLoad) {
        this.scrollListener();
      }
    }
  }, {
    key: 'mousewheelListener',
    value: function mousewheelListener(e) {
      // Prevents Chrome hangups
      // See: https://stackoverflow.com/questions/47524205/random-high-content-download-time-in-chrome/47684257#47684257
      if (e.deltaY === 1 && !this.isPassiveSupported()) {
        e.preventDefault();
      }
    }
  }, {
    key: 'scrollListener',
    value: function scrollListener() {
      var el = this.scrollComponent;
      var scrollEl = window;
      var parentNode = this.getParentElement(el);

      var offset = void 0;
      if (this.props.useWindow) {
        var doc = document.documentElement || document.body.parentNode || document.body;
        var scrollTop = scrollEl.pageYOffset !== undefined ? scrollEl.pageYOffset : doc.scrollTop;
        if (this.props.isReverse) {
          offset = scrollTop;
        } else {
          offset = this.calculateOffset(el, scrollTop);
        }
      } else if (this.props.isReverse) {
        offset = parentNode.scrollTop;
      } else {
        offset = el.scrollHeight - parentNode.scrollTop - parentNode.clientHeight;
      }

      // Here we make sure the element is visible as well as checking the offset
      if (offset < Number(this.props.threshold) && el && el.offsetParent !== null) {
        this.detachScrollListener();
        this.beforeScrollHeight = parentNode.scrollHeight;
        this.beforeScrollTop = parentNode.scrollTop;
        // Call loadMore after detachScrollListener to allow for non-async loadMore functions
        if (typeof this.props.loadMore === 'function') {
          this.props.loadMore(this.pageLoaded += 1);
          this.loadMore = true;
        }
      }
    }
  }, {
    key: 'calculateOffset',
    value: function calculateOffset(el, scrollTop) {
      if (!el) {
        return 0;
      }

      return this.calculateTopPosition(el) + (el.offsetHeight - scrollTop - window.innerHeight);
    }
  }, {
    key: 'calculateTopPosition',
    value: function calculateTopPosition(el) {
      if (!el) {
        return 0;
      }
      return el.offsetTop + this.calculateTopPosition(el.offsetParent);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var renderProps = this.filterProps(this.props);

      var children = renderProps.children,
          element = renderProps.element,
          hasMore = renderProps.hasMore,
          initialLoad = renderProps.initialLoad,
          isReverse = renderProps.isReverse,
          loader = renderProps.loader,
          loadMore = renderProps.loadMore,
          pageStart = renderProps.pageStart,
          ref = renderProps.ref,
          threshold = renderProps.threshold,
          useCapture = renderProps.useCapture,
          useWindow = renderProps.useWindow,
          getScrollParent = renderProps.getScrollParent,
          props = _objectWithoutProperties(renderProps, ['children', 'element', 'hasMore', 'initialLoad', 'isReverse', 'loader', 'loadMore', 'pageStart', 'ref', 'threshold', 'useCapture', 'useWindow', 'getScrollParent']);

      props.ref = function (node) {
        _this2.scrollComponent = node;
        if (ref) {
          ref(node);
        }
      };

      var childrenArray = [children];
      if (hasMore) {
        if (loader) {
          isReverse ? childrenArray.unshift(loader) : childrenArray.push(loader);
        } else if (this.defaultLoader) {
          isReverse ? childrenArray.unshift(this.defaultLoader) : childrenArray.push(this.defaultLoader);
        }
      }
      return _react2.default.createElement(element, props, childrenArray);
    }
  }]);

  return InfiniteScroll;
}(_react.Component);

InfiniteScroll.propTypes = {
  children: _propTypes2.default.node.isRequired,
  element: _propTypes2.default.node,
  hasMore: _propTypes2.default.bool,
  initialLoad: _propTypes2.default.bool,
  isReverse: _propTypes2.default.bool,
  loader: _propTypes2.default.node,
  loadMore: _propTypes2.default.func.isRequired,
  pageStart: _propTypes2.default.number,
  ref: _propTypes2.default.func,
  getScrollParent: _propTypes2.default.func,
  threshold: _propTypes2.default.number,
  useCapture: _propTypes2.default.bool,
  useWindow: _propTypes2.default.bool
};
InfiniteScroll.defaultProps = {
  element: 'div',
  hasMore: false,
  initialLoad: true,
  pageStart: 0,
  ref: null,
  threshold: 250,
  useWindow: true,
  isReverse: false,
  useCapture: false,
  loader: null,
  getScrollParent: null
};
exports.default = InfiniteScroll;
module.exports = exports['default'];


/***/ }),

/***/ 1553:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1554);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(318)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 1554:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(317)(true);
// imports


// module
exports.push([module.i, ".ant-select-auto-complete{-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0;color:rgba(0,0,0,.65);font-size:14px;font-variant:tabular-nums;line-height:1.5;list-style:none;-webkit-font-feature-settings:\"tnum\";font-feature-settings:\"tnum\"}.ant-select-auto-complete.ant-select .ant-select-selection{border:0;-webkit-box-shadow:none;box-shadow:none}.ant-select-auto-complete.ant-select .ant-select-selection__rendered{height:100%;margin-right:0;margin-left:0;line-height:32px}.ant-select-auto-complete.ant-select .ant-select-selection__placeholder{margin-right:12px;margin-left:12px}.ant-select-auto-complete.ant-select .ant-select-selection--single{height:auto}.ant-select-auto-complete.ant-select .ant-select-search--inline{position:static;float:left}.ant-select-auto-complete.ant-select-allow-clear .ant-select-selection:hover .ant-select-selection__rendered{margin-right:0!important}.ant-select-auto-complete.ant-select .ant-input{height:32px;line-height:1.5;background:transparent;border-width:1px}.ant-select-auto-complete.ant-select .ant-input:focus,.ant-select-auto-complete.ant-select .ant-input:hover{border-color:#40a9ff;border-right-width:1px!important}.ant-select-auto-complete.ant-select .ant-input[disabled]{color:rgba(0,0,0,.25);background-color:#f5f5f5;cursor:not-allowed;opacity:1;background-color:transparent}.ant-select-auto-complete.ant-select .ant-input[disabled]:hover{border-color:#d9d9d9;border-right-width:1px!important}.ant-select-auto-complete.ant-select-lg .ant-select-selection__rendered{line-height:40px}.ant-select-auto-complete.ant-select-lg .ant-input{height:40px;padding-top:6px;padding-bottom:6px}.ant-select-auto-complete.ant-select-sm .ant-select-selection__rendered{line-height:24px}.ant-select-auto-complete.ant-select-sm .ant-input{height:24px;padding-top:1px;padding-bottom:1px}.ant-input-group>.ant-select-auto-complete .ant-select-search__field.ant-input-affix-wrapper{display:inline;float:none}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/node_modules/antd/lib/auto-complete/style/index.css"],"names":[],"mappings":"AAIA,0BACE,8BAA+B,AACvB,sBAAuB,AAC/B,SAAU,AACV,UAAW,AACX,sBAA2B,AAC3B,eAAgB,AAChB,0BAA2B,AAC3B,gBAAiB,AACjB,gBAAiB,AACjB,qCAAsC,AAC9B,4BAA8B,CACvC,AACD,2DACE,SAAU,AACV,wBAAyB,AACjB,eAAiB,CAC1B,AACD,qEACE,YAAa,AACb,eAAgB,AAChB,cAAe,AACf,gBAAkB,CACnB,AACD,wEACE,kBAAmB,AACnB,gBAAkB,CACnB,AACD,mEACE,WAAa,CACd,AACD,gEACE,gBAAiB,AACjB,UAAY,CACb,AACD,6GACE,wBAA2B,CAC5B,AACD,gDACE,YAAa,AACb,gBAAiB,AACjB,uBAAwB,AACxB,gBAAkB,CACnB,AACD,4GAEE,qBAAsB,AACtB,gCAAmC,CACpC,AACD,0DACE,sBAA2B,AAC3B,yBAA0B,AAC1B,mBAAoB,AACpB,UAAW,AACX,4BAA8B,CAC/B,AACD,gEACE,qBAAsB,AACtB,gCAAmC,CACpC,AACD,wEACE,gBAAkB,CACnB,AACD,mDACE,YAAa,AACb,gBAAiB,AACjB,kBAAoB,CACrB,AACD,wEACE,gBAAkB,CACnB,AACD,mDACE,YAAa,AACb,gBAAiB,AACjB,kBAAoB,CACrB,AACD,6FACE,eAAgB,AAChB,UAAY,CACb","file":"index.css","sourcesContent":["/* stylelint-disable at-rule-empty-line-before,at-rule-name-space-after,at-rule-no-unknown */\n/* stylelint-disable no-duplicate-selectors */\n/* stylelint-disable */\n/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors,string-no-newline */\n.ant-select-auto-complete {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  color: rgba(0, 0, 0, 0.65);\n  font-size: 14px;\n  font-variant: tabular-nums;\n  line-height: 1.5;\n  list-style: none;\n  -webkit-font-feature-settings: 'tnum';\n          font-feature-settings: 'tnum';\n}\n.ant-select-auto-complete.ant-select .ant-select-selection {\n  border: 0;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n.ant-select-auto-complete.ant-select .ant-select-selection__rendered {\n  height: 100%;\n  margin-right: 0;\n  margin-left: 0;\n  line-height: 32px;\n}\n.ant-select-auto-complete.ant-select .ant-select-selection__placeholder {\n  margin-right: 12px;\n  margin-left: 12px;\n}\n.ant-select-auto-complete.ant-select .ant-select-selection--single {\n  height: auto;\n}\n.ant-select-auto-complete.ant-select .ant-select-search--inline {\n  position: static;\n  float: left;\n}\n.ant-select-auto-complete.ant-select-allow-clear .ant-select-selection:hover .ant-select-selection__rendered {\n  margin-right: 0 !important;\n}\n.ant-select-auto-complete.ant-select .ant-input {\n  height: 32px;\n  line-height: 1.5;\n  background: transparent;\n  border-width: 1px;\n}\n.ant-select-auto-complete.ant-select .ant-input:focus,\n.ant-select-auto-complete.ant-select .ant-input:hover {\n  border-color: #40a9ff;\n  border-right-width: 1px !important;\n}\n.ant-select-auto-complete.ant-select .ant-input[disabled] {\n  color: rgba(0, 0, 0, 0.25);\n  background-color: #f5f5f5;\n  cursor: not-allowed;\n  opacity: 1;\n  background-color: transparent;\n}\n.ant-select-auto-complete.ant-select .ant-input[disabled]:hover {\n  border-color: #d9d9d9;\n  border-right-width: 1px !important;\n}\n.ant-select-auto-complete.ant-select-lg .ant-select-selection__rendered {\n  line-height: 40px;\n}\n.ant-select-auto-complete.ant-select-lg .ant-input {\n  height: 40px;\n  padding-top: 6px;\n  padding-bottom: 6px;\n}\n.ant-select-auto-complete.ant-select-sm .ant-select-selection__rendered {\n  line-height: 24px;\n}\n.ant-select-auto-complete.ant-select-sm .ant-input {\n  height: 24px;\n  padding-top: 1px;\n  padding-bottom: 1px;\n}\n.ant-input-group > .ant-select-auto-complete .ant-select-search__field.ant-input-affix-wrapper {\n  display: inline;\n  float: none;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1555:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(__webpack_require__(0));

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

var InputElement =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InputElement, _React$Component);

  function InputElement() {
    var _this;

    _classCallCheck(this, InputElement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputElement).apply(this, arguments));

    _this.saveRef = function (ele) {
      var childRef = _this.props.children.ref;

      if (typeof childRef === 'function') {
        childRef(ele);
      }
    };

    return _this;
  }

  _createClass(InputElement, [{
    key: "render",
    value: function render() {
      return React.cloneElement(this.props.children, _extends(_extends({}, this.props), {
        ref: this.saveRef
      }), null);
    }
  }]);

  return InputElement;
}(React.Component);

exports["default"] = InputElement;
//# sourceMappingURL=InputElement.js.map


/***/ }),

/***/ 1567:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(__webpack_require__(0));

var _tooltip = _interopRequireDefault(__webpack_require__(174));

var _configProvider = __webpack_require__(14);

var _warning = _interopRequireDefault(__webpack_require__(43));

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

var Popover =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Popover, _React$Component);

  function Popover() {
    var _this;

    _classCallCheck(this, Popover);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Popover).apply(this, arguments));

    _this.saveTooltip = function (node) {
      _this.tooltip = node;
    };

    _this.renderPopover = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;

      var _a = _this.props,
          customizePrefixCls = _a.prefixCls,
          props = __rest(_a, ["prefixCls"]);

      delete props.title;
      var prefixCls = getPrefixCls('popover', customizePrefixCls);
      return React.createElement(_tooltip["default"], _extends({}, props, {
        prefixCls: prefixCls,
        ref: _this.saveTooltip,
        overlay: _this.getOverlay(prefixCls)
      }));
    };

    return _this;
  }

  _createClass(Popover, [{
    key: "getPopupDomNode",
    value: function getPopupDomNode() {
      return this.tooltip.getPopupDomNode();
    }
  }, {
    key: "getOverlay",
    value: function getOverlay(prefixCls) {
      var _this$props = this.props,
          title = _this$props.title,
          content = _this$props.content;
      (0, _warning["default"])(!('overlay' in this.props), 'Popover', '`overlay` is removed, please use `content` instead, ' + 'see: https://u.ant.design/popover-content');
      return React.createElement("div", null, title && React.createElement("div", {
        className: "".concat(prefixCls, "-title")
      }, title), React.createElement("div", {
        className: "".concat(prefixCls, "-inner-content")
      }, content));
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderPopover);
    }
  }]);

  return Popover;
}(React.Component);

exports["default"] = Popover;
Popover.defaultProps = {
  placement: 'top',
  transitionName: 'zoom-big',
  trigger: 'hover',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  overlayStyle: {}
};
//# sourceMappingURL=index.js.map


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

/***/ 1719:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ROLE_TEACHER_NUM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ROLE_ASSISTANT_NUM; });
var ROLE_TEACHER_NUM=2;var ROLE_ASSISTANT_NUM=3;

/***/ }),

/***/ 1720:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warnOnlyTreeNode = warnOnlyTreeNode;
exports.arrDel = arrDel;
exports.arrAdd = arrAdd;
exports.posToArr = posToArr;
exports.getPosition = getPosition;
exports.isTreeNode = isTreeNode;
exports.getNodeChildren = getNodeChildren;
exports.isCheckDisabled = isCheckDisabled;
exports.traverseTreeNodes = traverseTreeNodes;
exports.mapChildren = mapChildren;
exports.getDragNodesKeys = getDragNodesKeys;
exports.calcDropPosition = calcDropPosition;
exports.calcSelectedKeys = calcSelectedKeys;
exports.convertDataToTree = convertDataToTree;
exports.convertTreeToEntities = convertTreeToEntities;
exports.parseCheckedKeys = parseCheckedKeys;
exports.conductCheck = conductCheck;
exports.conductExpandParent = conductExpandParent;
exports.getDataAndAria = getDataAndAria;

var _react = _interopRequireWildcard(__webpack_require__(0));

var _toArray = _interopRequireDefault(__webpack_require__(1434));

var _warning = _interopRequireDefault(__webpack_require__(328));

var _TreeNode = _interopRequireDefault(__webpack_require__(2023));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var DRAG_SIDE_RANGE = 0.25;
var DRAG_MIN_GAP = 2;
var onlyTreeNodeWarned = false;

function warnOnlyTreeNode() {
  if (onlyTreeNodeWarned) return;
  onlyTreeNodeWarned = true;
  (0, _warning.default)(false, 'Tree only accept TreeNode as children.');
}

function arrDel(list, value) {
  var clone = list.slice();
  var index = clone.indexOf(value);

  if (index >= 0) {
    clone.splice(index, 1);
  }

  return clone;
}

function arrAdd(list, value) {
  var clone = list.slice();

  if (clone.indexOf(value) === -1) {
    clone.push(value);
  }

  return clone;
}

function posToArr(pos) {
  return pos.split('-');
}

function getPosition(level, index) {
  return "".concat(level, "-").concat(index);
}

function isTreeNode(node) {
  return node && node.type && node.type.isTreeNode;
}

function getNodeChildren(children) {
  return (0, _toArray.default)(children).filter(isTreeNode);
}

function isCheckDisabled(node) {
  var _ref = node.props || {},
      disabled = _ref.disabled,
      disableCheckbox = _ref.disableCheckbox,
      checkable = _ref.checkable;

  return !!(disabled || disableCheckbox) || checkable === false;
}

function traverseTreeNodes(treeNodes, callback) {
  function processNode(node, index, parent) {
    var children = node ? node.props.children : treeNodes;
    var pos = node ? getPosition(parent.pos, index) : 0; // Filter children

    var childList = getNodeChildren(children); // Process node if is not root

    if (node) {
      var data = {
        node: node,
        index: index,
        pos: pos,
        key: node.key || pos,
        parentPos: parent.node ? parent.pos : null
      };
      callback(data);
    } // Process children node


    _react.Children.forEach(childList, function (subNode, subIndex) {
      processNode(subNode, subIndex, {
        node: node,
        pos: pos
      });
    });
  }

  processNode(null);
}
/**
 * Use `rc-util` `toArray` to get the children list which keeps the key.
 * And return single node if children is only one(This can avoid `key` missing check).
 */


function mapChildren(children, func) {
  var list = (0, _toArray.default)(children).map(func);

  if (list.length === 1) {
    return list[0];
  }

  return list;
}

function getDragNodesKeys(treeNodes, node) {
  var _node$props = node.props,
      eventKey = _node$props.eventKey,
      pos = _node$props.pos;
  var dragNodesKeys = [];
  traverseTreeNodes(treeNodes, function (_ref2) {
    var key = _ref2.key;
    dragNodesKeys.push(key);
  });
  dragNodesKeys.push(eventKey || pos);
  return dragNodesKeys;
} // Only used when drag, not affect SSR.


function calcDropPosition(event, treeNode) {
  var clientY = event.clientY;

  var _treeNode$selectHandl = treeNode.selectHandle.getBoundingClientRect(),
      top = _treeNode$selectHandl.top,
      bottom = _treeNode$selectHandl.bottom,
      height = _treeNode$selectHandl.height;

  var des = Math.max(height * DRAG_SIDE_RANGE, DRAG_MIN_GAP);

  if (clientY <= top + des) {
    return -1;
  }

  if (clientY >= bottom - des) {
    return 1;
  }

  return 0;
}
/**
 * Return selectedKeys according with multiple prop
 * @param selectedKeys
 * @param props
 * @returns [string]
 */


function calcSelectedKeys(selectedKeys, props) {
  if (!selectedKeys) return undefined;
  var multiple = props.multiple;

  if (multiple) {
    return selectedKeys.slice();
  }

  if (selectedKeys.length) {
    return [selectedKeys[0]];
  }

  return selectedKeys;
}
/**
 * Since React internal will convert key to string,
 * we need do this to avoid `checkStrictly` use number match
 */


function keyListToString(keyList) {
  if (!keyList) return keyList;
  return keyList.map(function (key) {
    return String(key);
  });
}

var internalProcessProps = function internalProcessProps(props) {
  return props;
};

function convertDataToTree(treeData, processor) {
  if (!treeData) return [];

  var _ref3 = processor || {},
      _ref3$processProps = _ref3.processProps,
      processProps = _ref3$processProps === void 0 ? internalProcessProps : _ref3$processProps;

  var list = Array.isArray(treeData) ? treeData : [treeData];
  return list.map(function (_ref4) {
    var children = _ref4.children,
        props = _objectWithoutProperties(_ref4, ["children"]);

    var childrenNodes = convertDataToTree(children, processor);
    return _react.default.createElement(_TreeNode.default, Object.assign({}, processProps(props)), childrenNodes);
  });
}
/**
 * Calculate treeNodes entities. `processTreeEntity` is used for `rc-tree-select`
 * @param treeNodes
 * @param processTreeEntity  User can customize the entity
 */


function convertTreeToEntities(treeNodes) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      initWrapper = _ref5.initWrapper,
      processEntity = _ref5.processEntity,
      onProcessFinished = _ref5.onProcessFinished;

  var posEntities = {};
  var keyEntities = {};
  var wrapper = {
    posEntities: posEntities,
    keyEntities: keyEntities
  };

  if (initWrapper) {
    wrapper = initWrapper(wrapper) || wrapper;
  }

  traverseTreeNodes(treeNodes, function (item) {
    var node = item.node,
        index = item.index,
        pos = item.pos,
        key = item.key,
        parentPos = item.parentPos;
    var entity = {
      node: node,
      index: index,
      key: key,
      pos: pos
    };
    posEntities[pos] = entity;
    keyEntities[key] = entity; // Fill children

    entity.parent = posEntities[parentPos];

    if (entity.parent) {
      entity.parent.children = entity.parent.children || [];
      entity.parent.children.push(entity);
    }

    if (processEntity) {
      processEntity(entity, wrapper);
    }
  });

  if (onProcessFinished) {
    onProcessFinished(wrapper);
  }

  return wrapper;
}
/**
 * Parse `checkedKeys` to { checkedKeys, halfCheckedKeys } style
 */


function parseCheckedKeys(keys) {
  if (!keys) {
    return null;
  } // Convert keys to object format


  var keyProps;

  if (Array.isArray(keys)) {
    // [Legacy] Follow the api doc
    keyProps = {
      checkedKeys: keys,
      halfCheckedKeys: undefined
    };
  } else if (_typeof(keys) === 'object') {
    keyProps = {
      checkedKeys: keys.checked || undefined,
      halfCheckedKeys: keys.halfChecked || undefined
    };
  } else {
    (0, _warning.default)(false, '`checkedKeys` is not an array or an object');
    return null;
  }

  keyProps.checkedKeys = keyListToString(keyProps.checkedKeys);
  keyProps.halfCheckedKeys = keyListToString(keyProps.halfCheckedKeys);
  return keyProps;
}
/**
 * Conduct check state by the keyList. It will conduct up & from the provided key.
 * If the conduct path reach the disabled or already checked / unchecked node will stop conduct.
 */


function conductCheck(
/** list of keys */
keyList,
/** is check the node or not */
isCheck,
/** parsed by `convertTreeToEntities` function in Tree */
keyEntities) {
  var checkStatus = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var checkedKeys = {};
  var halfCheckedKeys = {}; // Record the key has some child checked (include child half checked)

  (checkStatus.checkedKeys || []).forEach(function (key) {
    checkedKeys[key] = true;
  });
  (checkStatus.halfCheckedKeys || []).forEach(function (key) {
    halfCheckedKeys[key] = true;
  }); // Conduct up

  function conductUp(key) {
    if (checkedKeys[key] === isCheck) return;
    var entity = keyEntities[key];
    if (!entity) return;
    var children = entity.children,
        parent = entity.parent,
        node = entity.node;
    if (isCheckDisabled(node)) return; // Check child node checked status

    var everyChildChecked = true;
    var someChildChecked = false; // Child checked or half checked

    (children || []).filter(function (child) {
      return !isCheckDisabled(child.node);
    }).forEach(function (_ref6) {
      var childKey = _ref6.key;
      var childChecked = checkedKeys[childKey];
      var childHalfChecked = halfCheckedKeys[childKey];
      if (childChecked || childHalfChecked) someChildChecked = true;
      if (!childChecked) everyChildChecked = false;
    }); // Update checked status

    if (isCheck) {
      checkedKeys[key] = everyChildChecked;
    } else {
      checkedKeys[key] = false;
    }

    halfCheckedKeys[key] = someChildChecked;

    if (parent) {
      conductUp(parent.key);
    }
  } // Conduct down


  function conductDown(key) {
    if (checkedKeys[key] === isCheck) return;
    var entity = keyEntities[key];
    if (!entity) return;
    var children = entity.children,
        node = entity.node;
    if (isCheckDisabled(node)) return;
    checkedKeys[key] = isCheck;
    (children || []).forEach(function (child) {
      conductDown(child.key);
    });
  }

  function conduct(key) {
    var entity = keyEntities[key];

    if (!entity) {
      (0, _warning.default)(false, "'".concat(key, "' does not exist in the tree."));
      return;
    }

    var children = entity.children,
        parent = entity.parent,
        node = entity.node;
    checkedKeys[key] = isCheck;
    if (isCheckDisabled(node)) return; // Conduct down

    (children || []).filter(function (child) {
      return !isCheckDisabled(child.node);
    }).forEach(function (child) {
      conductDown(child.key);
    }); // Conduct up

    if (parent) {
      conductUp(parent.key);
    }
  }

  (keyList || []).forEach(function (key) {
    conduct(key);
  });
  var checkedKeyList = [];
  var halfCheckedKeyList = []; // Fill checked list

  Object.keys(checkedKeys).forEach(function (key) {
    if (checkedKeys[key]) {
      checkedKeyList.push(key);
    }
  }); // Fill half checked list

  Object.keys(halfCheckedKeys).forEach(function (key) {
    if (!checkedKeys[key] && halfCheckedKeys[key]) {
      halfCheckedKeyList.push(key);
    }
  });
  return {
    checkedKeys: checkedKeyList,
    halfCheckedKeys: halfCheckedKeyList
  };
}
/**
 * If user use `autoExpandParent` we should get the list of parent node
 * @param keyList
 * @param keyEntities
 */


function conductExpandParent(keyList, keyEntities) {
  var expandedKeys = {};

  function conductUp(key) {
    if (expandedKeys[key]) return;
    var entity = keyEntities[key];
    if (!entity) return;
    expandedKeys[key] = true;
    var parent = entity.parent,
        node = entity.node;
    if (node.props && node.props.disabled) return;

    if (parent) {
      conductUp(parent.key);
    }
  }

  (keyList || []).forEach(function (key) {
    conductUp(key);
  });
  return Object.keys(expandedKeys);
}
/**
 * Returns only the data- and aria- key/value pairs
 */


function getDataAndAria(props) {
  return Object.keys(props).reduce(function (prev, key) {
    if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-') {
      prev[key] = props[key];
    }

    return prev;
  }, {});
}

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

/***/ 1768:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_auto_complete_style_css__ = __webpack_require__(1533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_auto_complete_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_auto_complete_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_auto_complete__ = __webpack_require__(1534);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_auto_complete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_auto_complete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_select_style_css__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_select_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_antd_lib_select_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_select__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_antd_lib_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_axios__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Option=__WEBPACK_IMPORTED_MODULE_3_antd_lib_select___default.a.Option;var timeout=void 0,currentValue=void 0;var SchoolSelect=function(_Component){_inherits(SchoolSelect,_Component);function SchoolSelect(props){_classCallCheck(this,SchoolSelect);var _this=_possibleConstructorReturn(this,(SchoolSelect.__proto__||Object.getPrototypeOf(SchoolSelect)).call(this,props));_this.fetchSchool=function(value,callback){if(timeout){clearTimeout(timeout);timeout=null;}currentValue=value;function doFetch(){var url="/schools/school_list.json";__WEBPACK_IMPORTED_MODULE_6_axios___default.a.get(url,{params:{search:value}}).then(function(response){if(response.data.school_names){if(currentValue===value){callback(response.data.school_names);}}}).catch(function(error){console.log(error);});}timeout=setTimeout(doFetch,900);};_this.onOrgNameSearch=function(value){_this.fetchSchool(value,function(school_names){_this.setState({school_names:school_names});});};_this.state={school_names:''};return _this;}_createClass(SchoolSelect,[{key:"componentDidMount",value:function componentDidMount(){}},{key:"render",value:function render(){var school_names=this.state.school_names;var _props=this.props,value=_props.value,onChange=_props.onChange;return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_auto_complete___default.a,{allowClear:true,placeholder:"\u8BF7\u8F93\u5165\u5355\u4F4D\u540D\u79F0",value:value,style:{width:'221px'},onSearch:this.onOrgNameSearch,onSelect:onChange,onChange:onChange,dataSource:school_names},school_names&&school_names.map(function(item,index){return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(Option,{value:item,key:index},item);}));}}]);return SchoolSelect;}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (SchoolSelect);

/***/ }),

/***/ 1809:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_popover_style_css__ = __webpack_require__(1444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_popover_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_popover_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_popover__ = __webpack_require__(1567);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_popover___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_popover__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_breadcrumb_style_css__ = __webpack_require__(1454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_breadcrumb_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_antd_lib_breadcrumb_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_breadcrumb__ = __webpack_require__(1455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_breadcrumb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_antd_lib_breadcrumb__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_tooltip_style_css__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_tooltip_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_antd_lib_tooltip_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_tooltip__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_antd_lib_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_antd_lib_message_style_css__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_antd_lib_message_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_antd_lib_message_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_antd_lib_message__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_antd_lib_message___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_antd_lib_message__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_router_dom__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__coursesPublic_CoursesListType__ = __webpack_require__(1168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__user_AccountProfile__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__coursesPublic_Addcourses__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__css_Courses_css__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__css_Courses_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__css_Courses_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__modals_Modals__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__CoursesGuide__ = __webpack_require__(2010);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__members_modal_AddStudentModal__ = __webpack_require__(2011);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__members_modal_AddTeacherModal__ = __webpack_require__(2012);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__modals_Jointheclass__ = __webpack_require__(1906);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__modals_Certifiedprofessional__ = __webpack_require__(203);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}// 点击按钮复制功能
// function jsCopy(){
//   var e = document.getElementById("copy_invite_code");
//   e.select();
//   document.execCommand("Copy");
//   codesuccess()
// }
// 点击按钮复制功能
function jsCopy(){var e=document.getElementById("copy_invite_code");e.select();document.execCommand("Copy");codesuccess();}function codesuccess(){__WEBPACK_IMPORTED_MODULE_7_antd_lib_message___default.a.success('复制成功');};var CoursesBanner=function(_Component){_inherits(CoursesBanner,_Component);function CoursesBanner(props){_classCallCheck(this,CoursesBanner);var _this=_possibleConstructorReturn(this,(CoursesBanner.__proto__||Object.getPrototypeOf(CoursesBanner)).call(this,props));_this.HideAddcoursestypess=function(i){console.log("调用了");_this.setState({Addcoursestypes:false,mydisplay:true,occupation:i});};_this.ModalCancelsy=function(){_this.setState({mydisplay:false});};_this.onloadupdatabanner=function(){_this.updatabanner();};_this.updatabanner=function(){var query=_this.props.location.search;var dataqueryss={};try{var foqus=_this.foo(query);if(JSON.stringify(foqus)==="{}"){_this.setState({dataquerys:{}});}else{_this.setState({dataquerys:foqus});dataqueryss=foqus;}}catch(e){_this.setState({dataquerys:{}});}var courseId=_this.props.match.params.coursesId;var url="/courses/"+courseId+"/top_banner.json";__WEBPACK_IMPORTED_MODULE_10_axios___default.a.get(url,{params:dataqueryss}).then(function(result){if(result.data.status===-2){// this.setState({
// 	AccountProfiletype:true,
// 	content:result.data.message,
// 	okText:"立即认证",
// 	cannelText:"稍后认证",
// 	okHref:`/account/certification`,
// 	Accounturltype:true
// })
}else{if(result!=undefined){var data=result.data;_this.setState({coursedata:data,excellent:data.excellent});_this.props.ispostexcellenttype(data.excellent);}else{_this.onloadupdatabanner();}}});};_this.foo=function(url){var json={};var regExp=/[\?\&](\w+)(=?)(\w*)/g;var arr;do{arr=regExp.exec(url);// console.log(arr); // arr = [完整的字符串, key, 等号或'', value或'']
if(arr){var key=arr[1];var value=arr[3];// arr[2] === ''时, value = undefined
if(!arr[2])value=undefined;json[key]=value;}}while(arr);return json;};_this.tojoinclass=function(val){if(_this.props.current_user&&_this.props.current_user.profile_completed===false){_this.setState({AccountProfiletype:true});return;}if(val===1){_this.setState({Addcoursestypes:true});}else{_this.setState({Addcoursestypes:false});}};_this.myyslgradin=function(){_this.setState({yslJointhe:true});};_this.showActionPoll=function(i,s,ss,trs){_this.setState({modalsType:true,modalsTopval:s,loadtype:false,metype:i,modalsBottomval:ss,modalstrsvalue:trs});};_this.ActionPoll=function(i){var coursedata=_this.state.coursedata;var s="";var ss="";if(i===1){s="课堂删除后数据将无法恢复，是否确定删除？";_this.showActionPoll(i,s);}if(i===2){s="您确定要设置为私有?";_this.showActionPoll(i,s);}if(i===3){s="设为公开后，非课堂成员也可以访问查看";ss="是否确认设为公开？";_this.showActionPoll(i,s,ss);}if(i===4){if(coursedata.code_halt===true){var url='/courses/'+_this.props.match.params.coursesId+'/set_invite_code_halt.json';__WEBPACK_IMPORTED_MODULE_10_axios___default.a.post(url,{}).then(function(result){try{if(result.data.status===0){_this.updatabanner();}}catch(e){}});}else{s="课堂邀请码停用后，用户不能主动加入该课堂了";ss="您是否确认停用?";_this.showActionPoll(i,s,ss);}}if(i===5){s='\u201C\u590D\u5236\u201D\u529F\u80FD\u5C06\u4F1A\u4E3A\u60A8\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u8BFE\u5802';ss="请问是否继续？";var mid="旧课堂的作业、资源、试卷等都将被复制到新的课堂里面";_this.showActionPoll(i,s,ss,mid);}};_this.modalCancel=function(){_this.setState({modalsType:false,modalsTopval:"",modalsBottomval:"",loadtype:false,antIcon:false,modalstrsvalue:undefined});};_this.ModalAction=function(){var coursedata=_this.state.coursedata;var that=_this;var push=_this.props.history;var id=_this.props.match.params.coursesId;//删除
if(_this.state.metype===1){that.setState({antIcon:true});var url='/courses/'+id+'.json';__WEBPACK_IMPORTED_MODULE_10_axios___default.a.delete(url,{}).then(function(response){console.log(response.data.status);if(response.data.status===0){that.setState({antIcon:false});that.modalCancel();__WEBPACK_IMPORTED_MODULE_7_antd_lib_message___default.a.success("删除成功",1);push.push('/courses');}});}//设为私有的
if(_this.state.metype===2){_this.modalCancel();var state=_this.state;var url='/courses/'+id+'/set_public_or_private.json';__WEBPACK_IMPORTED_MODULE_10_axios___default.a.post(url,{}).then(function(result){if(result.data.status===0){__WEBPACK_IMPORTED_MODULE_7_antd_lib_message___default.a.success("设为私有的成功",1);state.coursedata.is_public=false;_this.setState({coursedata:state.coursedata});}});}//设为公有的
if(_this.state.metype===3){_this.modalCancel();var state=_this.state;var url='/courses/'+id+'/set_public_or_private.json';__WEBPACK_IMPORTED_MODULE_10_axios___default.a.post(url,{}).then(function(result){if(result.data.status===0){__WEBPACK_IMPORTED_MODULE_7_antd_lib_message___default.a.success("设为公有的成功",1);state.coursedata.is_public=true;_this.setState({coursedata:state.coursedata});}});}//停用邀请码
if(_this.state.metype===4){_this.modalCancel();var url='/courses/'+id+'/set_invite_code_halt.json';__WEBPACK_IMPORTED_MODULE_10_axios___default.a.post(url,{}).then(function(result){try{if(result.data.status===0){__WEBPACK_IMPORTED_MODULE_7_antd_lib_message___default.a.success(coursedata.code_halt===true?"启用用邀请码成功":"停用邀请码成功",1);_this.updatabanner();}}catch(e){}});}if(_this.state.metype===5){_this.setState({antIcon:true});var url='/courses/'+id+'/duplicate_course.json';__WEBPACK_IMPORTED_MODULE_10_axios___default.a.post(url).then(function(response){if(response!==undefined){window.location.href="/courses/"+response.data.new_course_id+"/students";return;}_this.modalCancel();// window.location.href = "/courses/" + response.data.new_course_id;
}).catch(function(error){_this.modalCancel();console.log(252);console.log(error);});}if(_this.state.metype===6){_this.setState({antIcon:true});var url='/courses/'+id+'/exit_course.json';__WEBPACK_IMPORTED_MODULE_10_axios___default.a.post(url).then(function(response){if(response.data.status===0){window.location.href="/users/"+_this.props.current_user.login;}});}};_this.addTeacher=function(isTeacher){_this.setState({isTeacher:isTeacher},function(){_this.refs.addTeacherModal.setVisible(true);});};_this.addStudent=function(){_this.refs.addStudentModal.setVisible(true);};_this.addTeacherSuccess=function(params){Object(__WEBPACK_IMPORTED_MODULE_11_educoder__["_10" /* trigger */])('addTeacherSuccess',JSON.stringify(params));_this.updatabanner();};_this.addStudentSuccess=function(params){Object(__WEBPACK_IMPORTED_MODULE_11_educoder__["_10" /* trigger */])('addStudentSuccess',JSON.stringify(params));_this.updatabanner();};_this.exitclass=function(){_this.setState({modalsType:true,modalsTopval:"退出后您将不再是本课题的成员,作品将全部被删除，",modalsBottomval:"确定要退出该课堂吗？",metype:6});};_this.switchidentity=function(sum){var newurl=_this.props.match.url;var id=_this.props.match.params.coursesId;if(sum===1){var url='/courses/'+id+'/switch_to_student.json';__WEBPACK_IMPORTED_MODULE_10_axios___default.a.post(url).then(function(response){if(response!=undefined){if(response.data.status===0){// window.location.href = "/users/" + this.props.current_user.login;
// this.props.history.replace(newurl);
window.location.href=newurl;}}});}if(sum===2){var _url='/courses/'+id+'/switch_to_teacher.json';__WEBPACK_IMPORTED_MODULE_10_axios___default.a.post(_url).then(function(response){if(response!=undefined){if(response.data.status===0){// window.location.href = "/users/" + this.props.current_user.login;
// this.props.history.replace(newurl);
window.location.href=newurl;}}});}if(sum===3){var _url2='/courses/'+id+'/switch_to_assistant.json';__WEBPACK_IMPORTED_MODULE_10_axios___default.a.post(_url2).then(function(response){if(response.data.status===0){// window.location.href = "/users/" + this.props.current_user.login;
// this.props.history.replace(newurl);
window.location.href=newurl;}});}};_this.postsettings=function(){window.location.href="/courses/"+_this.props.match.params.coursesId+"/settings";};_this.postsettingstwo=function(){//  var ids =1;
// try {
//   if(this.state.coursedata.is_public){
//     ids=1;
//   }else {
//     ids=0;
//   }
// }catch (e) {
//
// }
window.location.href='/courses/'+_this.props.match.params.coursesId+'/newgolds/settings';};_this.hideAccountProfile=function(){_this.setState({AccountProfiletype:false,content:undefined,okText:undefined,okHref:undefined,cannelText:undefined,Accounturltype:undefined});};_this.ysljoinmodalCancel=function(){_this.setState({yslJointhe:false});if(_this.state.yslJointhes===true){window.location.href="/";}};_this.ysljoinmodalCanceltwo=function(){_this.setState({yslJointhe:false});window.location.reload();};_this.setHistoryFun=function(url){_this.props.history.replace(url);};_this.state={show:false,Addcoursestypes:false,modalsType:false,modalsTopval:"",loadtype:false,metype:0,modalsBottomval:"",antIcon:false,coursedata:undefined,is_guide:false,excellent:false,//是否是精品课堂
yslJointhe:false,mydisplay:false,yslJointhes:false};return _this;}_createClass(CoursesBanner,[{key:'componentDidMount',value:function componentDidMount(){var _this2=this;this.onloadupdatabanner();Object(__WEBPACK_IMPORTED_MODULE_11_educoder__["_2" /* on */])('updatabanner',this.updatabanner);if(this.props.match.path==="/courses/:coursesId"){if(this.props.user!=undefined){this.props.history.push(this.props.user.first_category_url);}}__WEBPACK_IMPORTED_MODULE_10_axios___default.a.interceptors.response.use(function(response){if(response!=undefined)if(response&&response.data.status===410){_this2.setState({yslJointhe:true,yslJointhes:true});}return response;},function(error){});}},{key:'componentDidUpdate',value:function componentDidUpdate(prevProps){if(prevProps.user!=this.props.user){if(this.props.match.path==="/courses/:coursesId"){if(this.props.user!=undefined){this.props.history.push(this.props.user.first_category_url);}}}}},{key:'componentWillUnmount',value:function componentWillUnmount(){Object(__WEBPACK_IMPORTED_MODULE_11_educoder__["_1" /* off */])('updatabanner',this.updatabanner);}//精品课堂的弹框
//取消
// 确定
//退出课堂按钮
//切换身份
},{key:'render',value:function render(){var _this3=this;var _state=this.state,Addcoursestypes=_state.Addcoursestypes,coursedata=_state.coursedata,excellent=_state.excellent,modalsType=_state.modalsType,modalsTopval=_state.modalsTopval,loadtype=_state.loadtype,modalsBottomval=_state.modalsBottomval,antIcon=_state.antIcon,is_guide=_state.is_guide,AccountProfiletype=_state.AccountProfiletype,modalstrsvalue=_state.modalstrsvalue;var isCourseEnd=this.props.isCourseEnd();document.title=coursedata===undefined||coursedata.status===401||coursedata.status===407?"":coursedata.name;return __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',null,AccountProfiletype===true?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13__user_AccountProfile__["a" /* default */],Object.assign({hideAccountProfile:function hideAccountProfile(){return _this3.hideAccountProfile();}},this.props,this.state)):"",coursedata===undefined||coursedata.status===401?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{id:'course_info_1309',className:'courseHead',style:{height:'206px'}}):__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{id:'course_info_1309',className:'courseHead',style:{height:'206px'}},Addcoursestypes===true?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14__coursesPublic_Addcourses__["a" /* default */],{Addcoursestype:Addcoursestypes,hideAddcoursestype:function hideAddcoursestype(){return _this3.tojoinclass(2);},HideAddcoursestypess:function HideAddcoursestypess(i){return _this3.HideAddcoursestypess(i);}}):"",__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_21__modals_Certifiedprofessional__["a" /* default */],Object.assign({},this.props,this.state,{ModalCancelsy:this.ModalCancelsy})),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_16__modals_Modals__["a" /* default */],{modalsType:modalsType,modalsTopval:modalsTopval,loadtype:loadtype,modalsBottomval:modalsBottomval,modalsMidval:modalstrsvalue,modalCancel:this.modalCancel,modalSave:this.ModalAction,antIcon:antIcon}),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_20__modals_Jointheclass__["a" /* default */],Object.assign({},this.props,this.state,{ysljoinmodalCancel:function ysljoinmodalCancel(){return _this3.ysljoinmodalCancel();},ysljoinmodalCanceltwo:function ysljoinmodalCanceltwo(){return _this3.ysljoinmodalCanceltwo();}})),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_19__members_modal_AddTeacherModal__["a" /* default */],Object.assign({ref:'addTeacherModal'},this.props,{isTeacher:this.state.isTeacher,moduleName:this.state.isTeacher?"教师":"助教",addTeacherSuccess:this.addTeacherSuccess})),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_18__members_modal_AddStudentModal__["a" /* default */],Object.assign({ref:'addStudentModal'},this.props,{moduleName:'\u5B66\u751F',addStudentSuccess:this.addStudentSuccess})),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{className:'educontent clearfix educontentTop'},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{className:'color-white clearfix mb10'},coursedata===undefined||coursedata.status===401||coursedata.status===407?"":__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd_lib_tooltip___default.a,{placement:'bottom',title:coursedata&&coursedata.name&&coursedata.name.length<38?"":coursedata.name},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('span',{className:'font-24 fl bannername'},coursedata.name)),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('style',null,'\n                        .tag-orangces  .tag-names{\n                        display: block;\n                        width: auto;\n                        background-color: #FF6800;\n                        background-size: 100% 100%;\n                        padding: 0px 4px;\n                        color: #fff;\n                        float: left;\n                        height: 28px;\n                        line-height: 28px;\n                        font-size: 14px;\n                        border-radius: 4px;\n                      }\n                      '),excellent===true?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('span',null,__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__coursesPublic_CoursesListType__["a" /* default */],{typelist:["开放课程"],typesylename:"mt10"})):"",__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('span',{className:"TabsWarp"},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__coursesPublic_CoursesListType__["a" /* default */],{typelist:coursedata.course_end===true?["已结束"]:coursedata.is_public===true?["公开"]:["私有"],typesylename:"mt10",tipval:coursedata.is_public===true?"":"私有课堂，非课堂成员不能访问"}))),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{className:'clearfix '},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{className:'fl fl mr40 mb20'},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('a',{href:"/users/"+coursedata.teacher_login,className:'fl'},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('img',{alt:'\u5934\u50CF',className:'radius fl mt3 bannerimgname',src:Object(__WEBPACK_IMPORTED_MODULE_11_educoder__["M" /* getImageUrl */])('images/'+coursedata.teacher_img)})),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{className:'fl mt13'},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('p',{className:'color-white'},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('a',{href:"/users/"+coursedata.teacher_login,className:'color-white bannnerusername'},coursedata.teacher_name))),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{className:'fl mt13'},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('p',{className:'color-white bannnerusernames'},coursedata.teacher_school))),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',null,coursedata.switch_to_student===true?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd_lib_tooltip___default.a,{placement:'bottom',title:__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('pre',null,'\u7531\u6559\u5E08/\u52A9\u6559\u8EAB\u4EFD\u5207\u6362\u81F3\u5B66\u751F',__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('br',null),'\u53EF\u8FDB\u884C\u63D0\u4EA4\u4F5C\u54C1\u3001\u7B54\u9898\u7B49\u64CD\u4F5C')},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('a',{className:'fr user_default_btn user_blue_btn mr20 font-18',onClick:function onClick(){return _this3.switchidentity(1);}},' \u5207\u6362\u4E3A\u5B66\u751F ')):"",coursedata.switch_to_teacher===true?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd_lib_tooltip___default.a,{placement:'bottom',title:__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('pre',null,'\u7531\u5B66\u751F\u8EAB\u4EFD\u5207\u6362\u81F3\u6559\u5E08',__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('br',null),'\u62E5\u6709\u6DFB\u52A0\u6210\u5458\u3001\u53D1\u5E03\u4F5C\u4E1A\u7B49\u7BA1\u7406\u6743\u9650')},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('a',{className:'fr user_default_btn user_blue_btn mr20 font-18',onClick:function onClick(){return _this3.switchidentity(2);}},' \u5207\u6362\u4E3A\u8001\u5E08 ')):"",coursedata.switch_to_assistant===true?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd_lib_tooltip___default.a,{placement:'bottom',title:__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('pre',null,'\u7531\u5B66\u751F\u8EAB\u4EFD\u5207\u6362\u81F3\u52A9\u6559',__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('br',null),'\u62E5\u6709\u6DFB\u52A0\u6210\u5458\u3001\u53D1\u5E03\u4F5C\u4E1A\u7B49\u7BA1\u7406\u6743\u9650')},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('a',{className:'fr user_default_btn user_blue_btn mr20 font-18',onClick:function onClick(){return _this3.switchidentity(3);}},' \u5207\u6362\u4E3A\u52A9\u6559 ')):"",coursedata.course_identity===6&&coursedata.educoder_teacher===false?excellent===false?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('a',{className:'fr user_default_btn task-btn-orange font-18 mr20',id:'shixun_operation',onClick:function onClick(){return _this3.tojoinclass(1);}},'\u52A0\u5165\u8BFE\u5802'):__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('a',{className:'fr user_default_btn task-btn-orange font-18 mr20',id:'shixun_operation',onClick:function onClick(){return _this3.myyslgradin(1);}},'\u7ACB\u5373\u52A0\u5165'):"",coursedata.course_identity===6&&coursedata.educoder_teacher===true?excellent===false?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('a',{className:'fr user_default_btn task-btn-orange font-18 mr20',id:'shixun_operation',onClick:function onClick(){return _this3.tojoinclass(1);}},'\u52A0\u5165\u8BFE\u5802'):__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('a',{className:'fr user_default_btn task-btn-orange font-18 mr20',id:'shixun_operation',onClick:function onClick(){return _this3.myyslgradin(1);}},'\u7ACB\u5373\u52A0\u5165'):"",coursedata.course_identity===6&&coursedata.educoder_teacher===true?excellent===false?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('a',{className:'fr user_default_btn user_blue_btn mr20 font-18',onClick:function onClick(){return _this3.ActionPoll(5);}},' \u590D\u5236\u8BFE\u5802 '):"":"",this.props.isStudent()?this.props.current_user&&this.props.current_user.course_is_end===true?"":__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('a',{className:'fr user_default_btn user_blue_btn mr20 font-18',onClick:function onClick(){return _this3.exitclass();}},' \u9000\u51FA\u8BFE\u5802 '):""),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('style',null,'\n\t\t\t\t\t\t\t\t\t\t\t\t.teachersbox{\n\t\t\t\t\t\t\t\t\t\t\t\t  margin-right:22px !important;\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t'),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{className:'clearfix clearfixborder'},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('ul',{className:'fl color-grey-eb pathInfo pathInfobox mt10'},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('style',null,'\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t.ant-breadcrumb-separator{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t      color: rgba(255,255,255,0.3) !important;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t.pointer .ant-tooltip-inner{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\nbackground:rgba(204,204,204,0.2) !important;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t.pointer .ant-tooltip-arrow::before{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\nbackground:rgba(204,204,204,0.2) !important;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t.pointer .antsoancss{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tcolor: #fff;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t'),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_antd_lib_breadcrumb___default.a,{separator:'|',className:"mt5"},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_antd_lib_breadcrumb___default.a.Item,{className:excellent===true&&this.props.isAdminOrStudent()===false?"":"pointer"},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd_lib_tooltip___default.a,{getPopupContainer:function getPopupContainer(trigger){return trigger.parentNode;},visible:excellent===true&&this.props.isAdminOrStudent()===false?false:coursedata.teacher_applies_count===undefined?false:coursedata.teacher_applies_count>0?true:false,placement:'topLeft',title:__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('pre',{className:'antsoancss'},coursedata.teacher_applies_count===undefined?"":coursedata.teacher_applies_count>0?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('span',null,'\u60A8\u6709',coursedata.teacher_applies_count,'\u6761\u65B0\u7684\u52A0\u5165\u7533\u8BF7',__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('a',{className:"daishenp",onClick:excellent===true&&this.props.isAdminOrStudent()===false?"":function(){return _this3.setHistoryFun("/courses/"+_this3.props.match.params.coursesId+"/teachers?tab=2");}},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('span',{style:{color:"#FFA804"}},'\u5F85\u5BA1\u6279'))):"")},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('span',{className:'color-grey-c font-16',onClick:excellent===true&&this.props.isAdminOrStudent()===false?"":function(){return _this3.setHistoryFun("/courses/"+_this3.props.match.params.coursesId+"/teachers");}},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('span',{className:"mr10"},'\u6559\u5E08'),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('span',{className:"mr10"},coursedata.teacher_count)))),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_antd_lib_breadcrumb___default.a.Item,{className:excellent===true&&this.props.isAdminOrStudent()===false?"":excellent===true&&coursedata.course_end===true?this.props.isAdminOrTeacher()===true?"pointer":"":"pointer",onClick:excellent===true&&this.props.isAdminOrStudent()===false?"":excellent===true&&coursedata.course_end===true?this.props.isAdminOrTeacher()===true?function(){return _this3.setHistoryFun("/courses/"+_this3.props.match.params.coursesId+"/students");}:"":function(){return _this3.setHistoryFun("/courses/"+_this3.props.match.params.coursesId+"/students");}},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('span',{className:'color-grey-c font-16'},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('span',{className:"mr10 ml10"},'\u5B66\u751F'),'  ',__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('span',{className:"mr10"},coursedata.student_count))),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_antd_lib_breadcrumb___default.a.Item,null,coursedata.credit===null?"":__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('span',{className:'color-grey-c font-16'},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('span',{className:"mr10 ml10"},'\u5B66\u5206'),' ',__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('span',{className:"mr10"},coursedata.credit))))),this.props.isAdmin()?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('ul',{className:'fr color-grey-eb pathInfo pathInfobox mt10',style:{position:"relative"}},!isCourseEnd&&__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('li',{className:"mt7 mr10im"},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('a',{onClick:function onClick(){return _this3.addTeacher(true);}},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('span',{className:'color-white fl font-16 bannerurli width100f'},'\u6DFB\u52A0\u8001\u5E08'))),!isCourseEnd&&__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('li',{className:"mt7 mr10im"},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('a',{onClick:function onClick(){return _this3.addTeacher(false);}},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('span',{className:'color-white fl font-16 bannerurli width100f'},'\u6DFB\u52A0\u52A9\u6559'))),!isCourseEnd&&__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('li',{className:"mt7 mr10im"},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('a',{onClick:function onClick(){return _this3.addStudent();}},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('span',{className:"color-white fl font-16 bannerurli width100f"},'\u6DFB\u52A0\u5B66\u751F'))),excellent===false?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('li',{className:"mt7 mr10im ml10",style:{overflow:"hidden"}},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('a',null,__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('span',{className:'color-grey-c fl font-16',style:{marginRight:"10px"}},'\u9080\u8BF7\u7801'),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('span',{className:coursedata.code_halt===true?"color-white fl font-16 bannerurli width75f":"color-white fl font-16 bannerurli width107f marleftf10 color-orange-tip"},coursedata.code_halt===true?"已停用":coursedata.invite_code,coursedata.code_halt===true?"":__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd_lib_tooltip___default.a,{placement:'bottom',title:coursedata.code_halt===true?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('pre',null,'\u9080\u8BF7\u7801\u5DF2\u505C\u7528',__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('br',null),'\u6210\u5458\u4E0D\u80FD\u4E3B\u52A8\u52A0\u5165\u8BFE\u5802'):__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('pre',null,'\u6210\u5458\u53EF\u4EE5\u901A\u8FC7\u9080\u8BF7\u7801\u4E3B\u52A8\u52A0\u5165\u8BFE\u5802',__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('br',null),'\u70B9\u51FB\u7ACB\u523B\u590D\u5236\u9080\u8BF7\u7801')},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('i',{className:'iconfont icon-fuzhi color-white font-14 ml10',onClick:function onClick(){jsCopy();}})),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('input',{id:'copy_invite_code',value:coursedata.invite_code})))):"",__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('li',{className:"mt7 ml10 mr0 "},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('style',null,'\n                                     .defaults{cursor:default}\n                                     '),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_popover___default.a,{placement:'bottom',content:excellent===false?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('ul',{className:'sandianbox',style:{display:'block',right:"-113px",top:"20px"}},coursedata.is_public===true?coursedata.course_identity<3?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{className:"defaults",onClick:function onClick(){return _this3.ActionPoll(2);}},'\u8BBE\u4E3A\u79C1\u6709'):"":"",coursedata.is_public===false?coursedata.course_identity<3?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{className:"defaults",onClick:function onClick(){return _this3.ActionPoll(3);}},'\u8BBE\u4E3A\u516C\u5F00'):"":"",coursedata.course_identity<3?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{className:"defaults",onClick:function onClick(){return _this3.ActionPoll(4);}},coursedata.code_halt===true?"启用邀请码":"停用邀请码"):"",__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{className:"defaults",onClick:this.postsettings},'\u8BBE\u7F6E'),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{className:"defaults",onClick:function onClick(){return _this3.ActionPoll(5);}},'\u590D\u5236'),coursedata.is_admin===true?coursedata.course_identity<3?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{className:"defaults",onClick:function onClick(){return _this3.ActionPoll(1);}},'\u5220\u9664'):"":""):__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('ul',{className:'sandianbox',style:{display:'block',right:"-113px",top:"20px"}},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{className:"defaults",onClick:this.postsettingstwo},'\u8BBE\u7F6E'),coursedata.is_admin===true?coursedata.course_identity<3?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div',{className:"defaults",onClick:function onClick(){return _this3.ActionPoll(1);}},'\u5220\u9664'):"":""),trigger:'hover'},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('i',{className:'iconfont icon-weibiaoti12 color-white font-14 relative'})))):"")))));}}]);return CoursesBanner;}(__WEBPACK_IMPORTED_MODULE_8_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (CoursesBanner);// let id=this.props.match.params.coursesId;
//
// let url="/courses/"+id+"/top_banner.json"
// axios.get(url).then((result)=>{
//     if(result.status===200){
//       let data=result.data;
//         this.setState({
//           coursebannerlist:result.data,
//           name: result.data.name,
//           teacher_name:  result.data.teacher_name,
//           teacher_login:  result.data.teacher_login,
//           teacher_img:  result.data.teacher_img,
//           teacher_school:  result.data.teacher_school,
//           teacher_count:  result.data.teacher_count,
//           student_count:  result.data.student_count,
//           course_group_count:  result.data.course_group_count,
//           credit:  result.data.credit,
//           course_end:  result.data.course_end,
//           deadline:  result.data.deadline,
//           is_teacher:  result.data.is_teacher,
//           is_student:  result.data.is_student,
//           is_admin:  result.data.is_admin,
//           is_public:  result.data.is_public,
//           code_halt:  result.data.code_halt,
//           invite_code: result.data.invite_code,
//           switch_to_student:  result.data.switch_to_student,
//           switch_to_teacher:  result.data.switch_to_teacher,
//           join_course:  result.data.join_course,
//           copy_course:  result.data.copy_course,
//         })
//     }
// coursebannerlist:undefined,
//   name: undefined,
//   teacher_name: undefined,
//   teacher_login: undefined,
//   teacher_img: undefined,
//   teacher_school: undefined,
//   teacher_count: undefined,
//   student_count: undefined,
//   course_group_count: undefined,
//   credit: undefined,
//   course_end: undefined,
//   deadline: undefined,
//   is_teacher: undefined,
//   is_student: undefined,
//   is_admin: undefined,
//   is_public: undefined,
//   code_halt: undefined,
//   invite_code:undefined,
//   switch_to_student: undefined,
//   switch_to_teacher: undefined,
//   join_course: undefined,
//   copy_course: undefined,
// }).catch((error)=>{
//   console.log(error);
// })

/***/ }),

/***/ 1810:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_tooltip_style_css__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_tooltip_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_tooltip_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_popover_style_css__ = __webpack_require__(1444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_popover_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_antd_lib_popover_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_popover__ = __webpack_require__(1567);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_popover___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_antd_lib_popover__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_modal_style_css__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_modal_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_antd_lib_modal_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_modal__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_antd_lib_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_antd_lib_input_style_css__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_antd_lib_input_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_antd_lib_input_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_antd_lib_input__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_antd_lib_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_antd_lib_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_antd_lib_notification_style_css__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_antd_lib_notification_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_antd_lib_notification_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_antd_lib_notification__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_antd_lib_notification___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_antd_lib_notification__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_antd_lib_checkbox_style_css__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_antd_lib_checkbox_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_antd_lib_checkbox_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_antd_lib_checkbox__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_antd_lib_checkbox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_antd_lib_checkbox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_react_router_dom__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_react_beautiful_dnd__ = __webpack_require__(1645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__modals_Modals__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__MainLeftNav_css__ = __webpack_require__(2013);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__MainLeftNav_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__MainLeftNav_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__MyEduChapterupdate__ = __webpack_require__(2015);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var CheckboxGroup=__WEBPACK_IMPORTED_MODULE_11_antd_lib_checkbox___default.a.Group;var navidtype=true;//a little function to help us with reordering the result
var reorder=function reorder(list,startIndex,endIndex){// console.log(list)
// console.log(startIndex)
// console.log(endIndex)
var newlist=list;var result=Array.from(newlist);var _result$splice=result.splice(startIndex,1),_result$splice2=_slicedToArray(_result$splice,1),removed=_result$splice2[0];result.splice(endIndex,0,removed);return result;};// const getItemStyle = (isDragging, draggableStyle) => ({
//   // change background colour if dragging
//   background: isDragging?'#f1f1f1': '',
//   // styles we need to apply on draggables
//   ...draggableStyle,
// });
var Coursesleftnav=function(_Component){_inherits(Coursesleftnav,_Component);function Coursesleftnav(props){_classCallCheck(this,Coursesleftnav);var _this=_possibleConstructorReturn(this,(Coursesleftnav.__proto__||Object.getPrototypeOf(Coursesleftnav)).call(this,props));_this.addshixunchild=function(e,data){_this.Navmodalnames(e,1,"shixun_homework",data);};_this.editshixunchild=function(e,data){_this.Navmodalnames(e,4,"editSecondname",data.id,data.name);};_this.editshixunmainname=function(e,data){_this.Navmodalnames(e,3,"editname",data.id,data.name);};_this.boardAddListener=function(e,data){_this.Navmodalnames(e,6,"board",data);};_this.boardRenameListener=function(e,data){_this.Navmodalnames(e,7,"editSecondname",data.category_id,data.category_name);};_this.groupAddListener=function(e,data){_this.Navmodalnames(e,2,"course_group",data);};_this.groupRenameListener=function(e,data){_this.Navmodalnames(e,5,"editSecondname",data.id,data.name);};_this.attachmentAddlog=function(e,data){_this.Navmodalnames(e,1,"attachment",data);};_this.flieseditDir=function(e,data){_this.Navmodalnames(e,4,"editSecondname",data.id,data.name);};_this.componentDidUpdate=function(prevProps){if(prevProps!=_this.props){var courstype=_this.props.match.url;courstype=courstype.split('/');courstype=courstype[3];var query=_this.props.location.search;var category_id=void 0;if(courstype==="board"){category_id=parseInt(_this.props.match.params.boardId);}else{category_id=parseInt(_this.props.match.params.category_id);}if(query===""){_this.setState({positiontype:courstype});}else{if(isNaN(category_id)){_this.setState({positiontype:courstype});}else{_this.setState({positiontype:courstype});}}}};_this.setnavid=function(e,key,id,type,url){// this.props.getleftNavid && this.props.getleftNavid(key,type);
//   let {selectnavid,navid}=this.state;
//
//   if(navidtype===true&&selectnavid===false){
//
//       if(navid===key){
//         this.setState({
//           navid:"",
//           selectnavid:false,
//           newselectnavid:id
//         })
//       }else{
//         this.setState({
//           navid:key,
//           positiontype:type,
//           selectnavid:false,
//           newselectnavid:id
//         })
//       }
//   }else{
//     // console.log(navidtype)
//     // console.log(selectnavid)
//     this.setState({
//       navid:"",
//       selectnavid:false,
//       newselectnavid:id
//     })
//   }
//
// this.props.updataleftNavfun();
// this.props.history.replace( url );
// e.stopPropagation();//阻止冒泡
_this.selectnavid(e,key,id,type,url);};_this.selectnavid=function(e,key,id,type,urls,index){var url=_this.state.url;if(urls!=url){_this.props.updataleftNavfun();_this.props.history.replace(urls);}else{if(key===_this.props.indexs){_this.props.unlocationNavfun(undefined);}else{_this.props.updataleftNavfun();_this.props.unlocationNavfun(key);_this.props.history.replace(urls);}}_this.setState({selectnavid:true,newselectnavid:id,url:urls,indexs:index});// this.props.history.replace(urls);
e.stopPropagation();//阻止冒泡
};_this.selectnavids=function(e,key,id,type,urls,index){_this.setState({selectnavid:true,newselectnavid:id,url:urls,indexs:index});_this.props.updataleftNavfun();_this.props.history.replace(urls);e.stopPropagation();//阻止冒泡
};_this.twosandianshow=function(e,key,type){// console.log("twosandianshow");
// console.log(key);
// console.log(type);
_this.setState({toopvisibleindexs:key,twosandiantype:key,toopvisible:false,toopvisibleindex:undefined,twosandiantypes:type});e.stopPropagation();//阻止冒泡
};_this.twosandianshowys=function(e,key,type){// console.log("twosandianshow");
// console.log(key);
// console.log(type);
_this.setState({toopvisibleindexs:key});e.stopPropagation();//阻止冒泡
};_this.twosandianshowyss=function(e,key,type){// console.log("twosandianshow");
// console.log(key);
// console.log(type);
_this.setState({toopvisibleindexs:undefined});e.stopPropagation();//阻止冒泡
};_this.twosandianhide=function(e,index,type){// console.log(index)
_this.setState({toopvisibleindexs:undefined,twosandiantype:undefined,twosandiantypenum:undefined,toopvisible:true,toopvisibleindex:index,twosandiantypes:type});e.stopPropagation();//阻止冒泡
};_this.twosandianhideys=function(e,index,type){// console.log(index)
_this.setState({toopvisibleindexs:undefined});e.stopPropagation();//阻止冒泡
};_this.editSetup=function(e,id){e.stopPropagation();//阻止冒泡
navidtype=false;_this.setState({navid:undefined,sandiantype:undefined,twosandiantype:undefined});var url="/course_modules/"+id+"/sticky_module.json";__WEBPACK_IMPORTED_MODULE_14_axios___default.a.get(url).then(function(result){navidtype=true;_this.props.updataleftNavfun();}).catch(function(error){navidtype=true;});};_this.edithiddens=function(id){navidtype=false;_this.setState({navid:undefined,sandiantype:undefined,twosandiantype:undefined,ModalsType:false});var url="/course_modules/"+id+"/hidden_module.json";__WEBPACK_IMPORTED_MODULE_14_axios___default.a.get(url).then(function(result){navidtype=true;_this.props.updataleftNavfun();// console.log(this.props)
var list=_this.props.course_modules;for(var i=0;i<list.length;i++){if(list[i].id!=id){_this.props.history.push(list[i].category_url);return;}}}).catch(function(error){navidtype=true;});};_this.edithidden=function(e,id){e.stopPropagation();//阻止冒泡
var course_modules=_this.props.course_modules;if(course_modules.length>1){_this.setState({ModalsType:true,Modalstopval:"隐藏后将不再显示此模块，",ModalsBottomval:"后续可在课堂设置中重新勾选模块恢复显示",ModalSave:function ModalSave(){return _this.edithiddens(id);}});}else{_this.setState({ModalsType:true,Modalstopval:"您不能隐藏所有课堂模块，请至少保留",ModalsBottomval:"其中一个模块。",loadtype:true,ModalSave:function ModalSave(){return _this.cannerNavmoda();}});}};_this.Navmodalnames=function(e,id,type,setnavid,name){e.stopPropagation();//阻止冒泡
navidtype=false;if(id===1||id===2||id===6){_this.setState({Navmodalname:id===2?"新建分班":"新建目录",Navtitles:id===2?"分班名称":"目录名称",Navplaceholder:"请输入名称，最大限制60个字符",Navmodalnametype:true,Navmodaltypename:id,setnavid:setnavid,NavmodalValue:""});}else if(id===3||id===4||id===5||id===7){_this.setState({Navmodalname:id===5?"分班重命名":"目录重命名",Navtitles:id===5?"分班名称":"目录名称",Navplaceholder:"请输入名称，最大限制60个字符",Navmodalnametype:true,Navmodaltypename:id,setnavid:setnavid,NavmodalValue:name});}};_this.cannerNavmoda=function(){_this.setState({Navmodalnametype:false,NavmodalValuetype:false,ModalsType:false});navidtype=true;};_this.setNavmodalValue=function(e){_this.setState({NavmodalValue:e.target.value});};_this.updasaveNavmoda=function(message){_this.props.updataleftNavfun();// this.setState({
//   ModalsType:true,
//   Modalstopval:message,
//   loadtype:true,
//   NavmodalValue:""
// })
navidtype=true;};_this.saveNavmodapost=function(url,value,positiontype,coursesId){__WEBPACK_IMPORTED_MODULE_14_axios___default.a.post(url,{name:value}).then(function(result){if(result!=undefined){if(result.data.status===0){__WEBPACK_IMPORTED_MODULE_9_antd_lib_notification___default.a.open({message:"提示",description:result.data.message});if(positiontype==="files"){_this.updasaveNavmoda();Object(__WEBPACK_IMPORTED_MODULE_17_educoder__["_10" /* trigger */])('updateNavSuccess');window.location.href="/courses/"+coursesId+"/file/"+result.data.category_id;}if(positiontype==="boards"){_this.updasaveNavmoda();Object(__WEBPACK_IMPORTED_MODULE_17_educoder__["_10" /* trigger */])('updateNavSuccess');window.location.href="/courses/"+coursesId+"/boards/"+result.data.category_id;}if(positiontype!="course_groups"){_this.updasaveNavmoda();}if(positiontype==="course_groups"){window.location.href="/courses/"+coursesId+"/course_groups/"+result.data.group_id;}}}}).catch(function(error){console.log(error);});};_this.saveboardpost=function(url,value){__WEBPACK_IMPORTED_MODULE_14_axios___default.a.put(url,{name:value}).then(function(result){if(result!=undefined){if(result.data.status===0){// window.location.reload()
_this.updasaveNavmoda();Object(__WEBPACK_IMPORTED_MODULE_17_educoder__["_10" /* trigger */])('updateNavSuccess');//
__WEBPACK_IMPORTED_MODULE_9_antd_lib_notification___default.a.open({message:"提示",description:result.data.message});}}}).catch(function(error){console.log(error);});};_this.saveNavmoda=function(){var _this$state=_this.state,Navmodaltypename=_this$state.Navmodaltypename,setnavid=_this$state.setnavid,NavmodalValue=_this$state.NavmodalValue;var id=setnavid;if(Navmodaltypename===5&&NavmodalValue==="未分班"||Navmodaltypename===2&&NavmodalValue==="未分班"){_this.setState({NavmodalValuetype:true,NavmodalValues:"名称不能和未分班一样"});return;}if(NavmodalValue===""){_this.setState({NavmodalValuetype:true,NavmodalValues:"名称不能为空"});return;}else if(NavmodalValue.length>60){_this.setState({NavmodalValuetype:true,NavmodalValues:"名称不能超过60个字"});return;}if(Navmodaltypename===1){var url="/course_modules/"+id+"/add_second_category.json";_this.saveNavmodapost(url,NavmodalValue,_this.state.positiontype,_this.props.match.params.coursesId);}else if(Navmodaltypename===2){var newid=_this.props.match.params.coursesId;var _url="/courses/"+newid+"/course_groups.json";_this.saveNavmodapost(_url,NavmodalValue,_this.state.positiontype,_this.props.match.params.coursesId);}else if(Navmodaltypename===3){var _url2="/course_modules/"+id+"/rename_module.json";_this.saveNavmodapost(_url2,NavmodalValue);}else if(Navmodaltypename===4){var _url3="/course_second_categories/"+id+"/rename_category.json";_this.saveNavmodapost(_url3,NavmodalValue);}else if(Navmodaltypename===5){var _url4="/course_groups/"+id+"/rename_group.json";_this.saveNavmodapost(_url4,NavmodalValue);}else if(Navmodaltypename===6){var _newid=_this.props.match.params.coursesId;var _url5="/courses/"+_newid+"/boards.json";_this.saveNavmodapost(_url5,NavmodalValue,_this.state.positiontype,_this.props.match.params.coursesId);}else if(Navmodaltypename===7){var _url6="/boards/"+id+".json";_this.saveboardpost(_url6,NavmodalValue);}_this.setState({Navmodalnametype:false});};_this.updatadeleteSecondary=function(url){_this.props.updataleftNavfun();// this.setState({
//   ModalsType:true,
//   Modalstopval:"删除成功",
//   loadtype:true,
// })
// notification.open({
//   message: "删除成功",
// });
// this.props.history.replace(url);
window.location.href=url;};_this.deletenavchilds=function(url,mainurl){_this.setState({antIcon:true});__WEBPACK_IMPORTED_MODULE_14_axios___default.a.delete(url).then(function(result){if(result.data.status===0){if(mainurl===undefined){_this.updatadeleteSecondary(result.data.right_url);}else{_this.updatadeleteSecondary(mainurl);}}}).catch(function(error){console.log(error);});};_this.deleteSecondary=function(e,type,id,mainurl){e.stopPropagation();//阻止冒泡
if(type===1){var url="/course_second_categories/"+id+".json";_this.setState({ModalsType:true,Modalstopval:"该目录下的内容将被移动到父目录,",ModalsBottomval:"是否确认删除?",ModalSave:function ModalSave(){return _this.deletenavchilds(url);}});}else if(type===2){var _url7="/course_groups/"+id+".json";_this.setState({ModalsType:true,Modalstopval:"该分班的学生将被移动到“未分班”,",ModalsBottomval:"是否确认删除?",ModalSave:function ModalSave(){return _this.deletenavchilds(_url7);}});}else if(type===3){var _url8="/boards/"+id+".json";_this.setState({ModalsType:true,Modalstopval:"该目录下的内容将被移动到父目录,",ModalsBottomval:"是否确认删除?",ModalSave:function ModalSave(){return _this.deletenavchilds(_url8,mainurl);}});}};_this.droppablepost=function(url,list){__WEBPACK_IMPORTED_MODULE_14_axios___default.a.post(url,{position:list}).then(function(result){if(result!=undefined){// this.updasaveNavmoda(result.data.message)
_this.updasaveNavmoda();//
__WEBPACK_IMPORTED_MODULE_9_antd_lib_notification___default.a.open({message:"提示",description:result.data.message});}}).catch(function(error){console.log(error);});};_this.onDragEnd=function(result){// console.log(result)
// let {course_modules}=this.props;
// let newcourse_modules=course_modules;
// let newid=this.props.match.params.coursesId;
// let list=[];
// let positionlist=[];
// for(var i=0; i<newcourse_modules.length;i++){
//   if(newcourse_modules[i].type===result.source.droppableId){
//     list=newcourse_modules[i].second_category
//   }
// }
// const newlist = reorder(
//   list,
//   result.source.index,
//   result.destination.index
// );
//
// for(var z=0; z<newlist.length; z++){
//   positionlist.push(newlist[z].position)
// }
//
// for(var i=0; i<newcourse_modules.length;i++){
//   if(newcourse_modules[i].type===result.source.droppableId){
//     newcourse_modules[i].second_category=newlist
//   }
// }
//
// this.setState({
//   course_modules:newcourse_modules
// })
if(result.source.droppableId==="shixun_homework"||result.source.droppableId==="graduation"||result.source.droppableId==="attachment"){var url="/course_second_categories/"+result.draggableId+"/move_category.json";if(result.destination.index!=null){_this.droppablepost(url,result.destination.index+1);}}else if(result.source.droppableId==="board"){var _url9="/boards/"+result.draggableId+"/move_category.json";if(result.destination.index!=null){_this.droppablepost(_url9,result.destination.index+1);}}else if(result.source.droppableId==="course_group"){if(result.draggableId!=1){var _url10="/course_groups/"+result.draggableId+"/move_category.json";if(result.destination.index!=null){_this.droppablepost(_url10,result.destination.index+1);}}}};_this.hidesandian=function(e,key){_this.setState({sandiantypes:undefined});e.stopPropagation();//阻止冒泡
};_this.showsandian=function(e,key){_this.setState({sandiantypes:key});e.stopPropagation();//阻止冒泡
};_this.showsandians=function(e,key,urls,num,id,type,index){var url=_this.state.url;if(key===_this.props.indexs){_this.props.unlocationNavfun(undefined);}else{_this.props.updataleftNavfun();_this.props.unlocationNavfun(key);}if(urls!=url){_this.props.updataleftNavfun();}_this.setState({selectnavid:true,newselectnavid:id,url:urls,indexs:index});_this.props.history.replace(urls);e.stopPropagation();//阻止冒泡
};_this.maincontent=function(item,key){return __WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{className:"sandianbox"},item.type==="shixun_homework"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{onClick:function onClick(e){return _this.Navmodalnames(e,1,"shixun_homework",item.id);}},"\u65B0\u5EFA\u76EE\u5F55"):"",item.type==="attachment"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{onClick:function onClick(e){return _this.Navmodalnames(e,1,"attachment",item.id);}},"\u65B0\u5EFA\u76EE\u5F55"):"",item.type==="board"?_this.props.current_user&&_this.props.current_user.course_is_end===true?"":__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{onClick:function onClick(e){return _this.Navmodalnames(e,6,"board",item.main_id);}},"\u65B0\u5EFA\u76EE\u5F55"):"",item.type==="course_group"?_this.props.current_user&&_this.props.current_user.course_is_end===true?"":__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{onClick:function onClick(e){return _this.Navmodalnames(e,2,"course_group",item.id);}},"\u65B0\u5EFA\u5206\u73ED"):"",__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{onClick:function onClick(e){return _this.Navmodalnames(e,3,"editname",item.id,item.name);}},"\u91CD\u547D\u540D"),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{onClick:function onClick(e){return _this.edithidden(e,item.id);}},"\u9690\u85CF"),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{onClick:function onClick(e){return _this.editSetup(e,item.id);}},"\u7F6E\u9876"));};_this.content=function(item,iem,index){var _this$state2=_this.state,twosandiantypes=_this$state2.twosandiantypes,twosandiantypenum=_this$state2.twosandiantypenum;return item.type==="graduation"?"":__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{className:item.type===twosandiantypes&&twosandiantypenum===index?"sandianboxs":"sandianboxs"},item.type==="shixun_homework"||item.type==="attachment"||item.type==="graduation"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{onClick:function onClick(e){return _this.Navmodalnames(e,4,"editSecondname",iem.category_id,iem.category_name);}},"\u91CD\u547D\u540D"):"",item.type==="shixun_homework"||item.type==="attachment"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{onClick:function onClick(e){return _this.deleteSecondary(e,1,iem.category_id);}},"\u5220\u9664"):"",item.type==="course_group"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{onClick:function onClick(e){return _this.Navmodalnames(e,5,"editSecondname",iem.category_id,iem.category_name);}},"\u91CD\u547D\u540D"):"",item.type==="course_group"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{onClick:function onClick(e){return _this.deleteSecondary(e,2,iem.category_id);}},"\u5220\u9664"):"",item.type==="board"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{onClick:function onClick(e){return _this.Navmodalnames(e,7,"editSecondname",iem.category_id,iem.category_name);}},"\u91CD\u547D\u540D"):"",item.type==="board"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{onClick:function onClick(e){return _this.deleteSecondary(e,3,iem.category_id,item.category_url);}},"\u5220\u9664"):"");};_this.Chapterediting=function(e,id,url){e.stopPropagation();//阻止冒泡
//页面刷新
_this.setState({chapterupdate:true});};_this.setchapterupdatefalse=function(){_this.setState({chapterupdate:false});};_this.state={index:1,addGroup:true,navid:undefined,sandiantype:undefined,twosandiantype:undefined,addCheckboxGroup:[],Navmodalname:"",Navmodalnametype:false,Navmodaltypename:"",setnavid:"",NavmodalValue:"",ModalsType:false,Modalstopval:"",loadtype:false,selectnavid:false,newselectnavid:undefined,positiontype:undefined,toopvisible:false,toopvisibleindex:undefined,toopvisibleindexs:undefined,sandiantypes:undefined,antIcon:false,chapterupdate:false};return _this;}// updataleftNav=()=>{
//
//   let id=this.props.match.params.coursesId;
//   let url ="/courses/"+id+"/left_banner.json"
//   axios.get(url).then((response) => {
//     if(response!=undefined){
//       if(response.data&&response.data){
//         this.setState({
//           course_modules:response.data.course_modules,
//           hidden_modules:response.data.hidden_modules,
//           is_teacher:response.data.is_teacher,
//         })
//         this.locationNav(response.data.course_modules)
//       }
//     }
//
//   })
// }
// locationNav=(list)=>{
//   let filesId=this.props.match.params.Id;
//   let url=this.props.location.pathname;
//   var lists=list;
//
//
//   lists.forEach((item,index)=>{
//     if(item.second_category!=undefined&&item.second_category.length!=0){
//       item.second_category.forEach((iem,key)=>{
//         if( parseInt(filesId)===iem.category_id||parseInt(filesId)===item.id){
//           this.setState({
//             indexs:index,
//             url:url
//           })
//         }
//       })
//     }
//
//     if(this.props.match.url===item.category_url){
//       this.props.coursesidsfun(item.id)
//     }
//   })
//
// }
// setcoursesidsfun=()=>{
//   // let {course_modules} =this.props;
//   // let lists=course_modules;
//   // let url=this.props.location.pathname;
//   // lists.forEach((item,index)=>{
//   //   if(item.second_category!=undefined&&item.second_category.length!=0){
//   //     item.second_category.forEach((iem,key)=>{
//   //       if(url===iem.second_category_url){
//   //         this.props.coursesidsfun(item.id,"child")
//   //       }
//   //     })
//   //   }
//   //
//   //   if(url===item.category_url){
//   //     this.props.coursesidsfun(item.id,"node")
//   //   }
//   // })
//   // this.props.updataleftNavfun()
// }
_createClass(Coursesleftnav,[{key:"componentWillUnmount",value:function componentWillUnmount(){Object(__WEBPACK_IMPORTED_MODULE_17_educoder__["_1" /* off */])('boardAdd',this.boardAddListener);Object(__WEBPACK_IMPORTED_MODULE_17_educoder__["_1" /* off */])('boardRename',this.boardRenameListener);Object(__WEBPACK_IMPORTED_MODULE_17_educoder__["_1" /* off */])('groupAdd',this.groupAddListener);Object(__WEBPACK_IMPORTED_MODULE_17_educoder__["_1" /* off */])('groupRename',this.groupRenameListener);Object(__WEBPACK_IMPORTED_MODULE_17_educoder__["_1" /* off */])('attachmentAddlog',this.attachmentAddlog);Object(__WEBPACK_IMPORTED_MODULE_17_educoder__["_1" /* off */])('flieseditDir',this.flieseditDir);Object(__WEBPACK_IMPORTED_MODULE_17_educoder__["_1" /* off */])('shixun_homeworkadd',this.addshixunchild);Object(__WEBPACK_IMPORTED_MODULE_17_educoder__["_1" /* off */])('editshixunname',this.editshixunchild);Object(__WEBPACK_IMPORTED_MODULE_17_educoder__["_1" /* off */])('editshixunmainname',this.editshixunmainname);}},{key:"componentDidMount",value:function componentDidMount(){this.setState({url:this.props.match.url});Object(__WEBPACK_IMPORTED_MODULE_17_educoder__["_2" /* on */])('boardAdd',this.boardAddListener);Object(__WEBPACK_IMPORTED_MODULE_17_educoder__["_2" /* on */])('boardRename',this.boardRenameListener);Object(__WEBPACK_IMPORTED_MODULE_17_educoder__["_2" /* on */])('groupAdd',this.groupAddListener);Object(__WEBPACK_IMPORTED_MODULE_17_educoder__["_2" /* on */])('groupRename',this.groupRenameListener);Object(__WEBPACK_IMPORTED_MODULE_17_educoder__["_2" /* on */])('attachmentAddlog',this.attachmentAddlog);Object(__WEBPACK_IMPORTED_MODULE_17_educoder__["_2" /* on */])('flieseditDir',this.flieseditDir);Object(__WEBPACK_IMPORTED_MODULE_17_educoder__["_2" /* on */])('shixun_homeworkadd',this.addshixunchild);Object(__WEBPACK_IMPORTED_MODULE_17_educoder__["_2" /* on */])('editshixunname',this.editshixunchild);Object(__WEBPACK_IMPORTED_MODULE_17_educoder__["_2" /* on */])('editshixunmainname',this.editshixunmainname);// this.props.updataleftNavfun();
// this.props.getleftNavid && this.props.getleftNavid("shixun_homework");
// const position =parseInt(this.props.match.params.position);
var courstype=this.props.match.url;courstype=courstype.split('/');courstype=courstype[3];// console.log(courstype)
var query=this.props.location.search;// const type = query.split('?type=');
var category_id=void 0;if(courstype==="board"){category_id=parseInt(this.props.match.params.boardId);}else{category_id=parseInt(this.props.match.params.category_id);}// console.log(category_id)
if(query===""){this.setState({navid:0,positiontype:courstype,selectnavid:false,newselectnavid:parseInt(category_id)});}else{if(isNaN(category_id)){this.setState({positiontype:courstype,newselectnavid:parseInt(category_id),selectnavid:false});}else{this.setState({positiontype:courstype,newselectnavid:parseInt(category_id),selectnavid:false});}}if(navidtype===false){navidtype=true;}this.props.updataleftNavfun();}//置顶
//隐藏
//章节编辑
},{key:"render",value:function render(){var _this2=this;var _state=this.state,twosandiantype=_state.twosandiantype,Navmodalname=_state.Navmodalname,Navmodalnametype=_state.Navmodalnametype,NavmodalValue=_state.NavmodalValue,ModalsType=_state.ModalsType,Modalstopval=_state.Modalstopval,ModalsBottomval=_state.ModalsBottomval,ModalSave=_state.ModalSave,loadtype=_state.loadtype,twosandiantypes=_state.twosandiantypes,toopvisibleindexs=_state.toopvisibleindexs;var _props=this.props,course_modules=_props.course_modules,hidden_modules=_props.hidden_modules,is_teacher=_props.is_teacher;// console.log(this.props.location.pathname)
// // console.log(item.category_url)
// console.log(this.props.location.pathname)
// console.log("778");
// console.log("CoursesLeftNav");
// console.log(course_modules);
return __WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("ul",{className:"mb10 newedu-class-leftnav"},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_16__modals_Modals__["a" /* default */],{modalsType:ModalsType,modalsTopval:Modalstopval,modalsBottomval:ModalsBottomval,modalSave:ModalSave,modalCancel:this.cannerNavmoda,loadtype:loadtype,antIcon:this.state.antIcon}),Navmodalnametype===true?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("style",null,"\n              body {\n\t\t\t\t\t\t\t  overflow: hidden !important;\n\t\t\t\t\t\t\t}\n              "):"",__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd_lib_modal___default.a,{keyboard:false,title:Navmodalname,visible:Navmodalnametype,className:"Navmodal",closable:false,footer:null,destroyOnClose:true,centered:true},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{className:"df"},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{className:"fl mt5"},this.state.Navtitles,"\uFF1A"),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_antd_lib_input___default.a,{placeholder:this.state.Navplaceholder,className:"input-flex-35 greyInput fl",maxLength:"60",value:NavmodalValue,onInput:this.setNavmodalValue})),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("style",null,"\n\t\t\t\t\t\t\t \t.ml70{\n    \t\t\t\t\t\t\tmargin-left: 70px;\n\t\t\t\t\t\t\t \t}\n\t\t\t\t\t\t\t \t"),this.state.NavmodalValuetype===true?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:"ml70 color-red"},this.state.NavmodalValues):"",__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{className:this.state.NavmodalValuetype===true?"clearfix mt20 edu-txt-center":"clearfix mt50 edu-txt-center"},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("a",{className:"task-btn mr30",onClick:this.cannerNavmoda},"\u53D6\u6D88"),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("a",{className:"task-btn task-btn-orange",onClick:this.saveNavmoda},"\u786E\u5B9A"))),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("style",null,"\n              // .activity-left-name{\n              //    width: 100%;\n              //   }\n                .droppableul{\n                  max-height: 500px;\n                  overflow-y:auto;\n                  overflow-x:hidden;\n                }\n\n                .mr13{\n                margin-right:13px;\n                }\n             "),is_teacher===true?course_modules===undefined?"":course_modules.map(function(item,key){return __WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{key:key},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("a",null,__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("li",{title:item.name.length<7?"":item.name,onClick:function onClick(e){return _this2.showsandians(e,key,item.category_url,1,item.id,item.type);},className:_this2.props.mainurl===item.category_url&&_this2.props.location.pathname===item.category_url?"liactive":"clearfix active",onMouseLeave:function onMouseLeave(e){return _this2.hidesandian(e,key);},onMouseEnter:function onMouseEnter(e){return _this2.showsandian(e,key);}},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("a",{onClick:function onClick(e){return _this2.showsandians(e,key,item.category_url,1,item.id,item.type);},className:item.second_category===undefined?"fl ml20 pd0":item.second_category.length===0?"fl ml20 pd0":_this2.state.sandiantypes===key?"fl ml20 pd0 ebebeb":"fl ml20 pd0"},item.type==="announcement"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-xiaoxi1 mr10 fl":"iconfont icon-xiaoxi1 mr10 fl"}):item.type==="online_learning"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-kecheng mr10 fl font-16":"iconfont icon-kecheng mr10 fl font-16"}):item.type==="shixun_homework"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-daima mr10 fl":"iconfont icon-daima mr10 fl"}):item.type==="common_homework"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-putongzuoye mr10 fl":"iconfont icon-putongzuoye mr10 fl"}):item.type==="group_homework"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-fenzuzuoye mr10 fl":"iconfont icon-fenzuzuoye mr10 fl"}):item.type==="graduation"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-biyezhuanhuan mr10 fl":"iconfont icon-biyezhuanhuan mr10 fl"}):item.type==="exercise"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-shijuan mr10 fl":"iconfont icon-shijuan mr10 fl"}):item.type==="poll"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-wenjuan mr10 fl":"iconfont icon-wenjuan mr10 fl"}):item.type==="attachment"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-ziyuan mr10 fl":"iconfont icon-ziyuan mr10 fl"}):item.type==="board"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-taolun mr10 fl":"iconfont icon-taolun mr10 fl"}):item.type==="course_group"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-fenban mr10 fl":"iconfont icon-fenban mr10 fl"}):item.type==="statistics"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-tongji mr10 fl":"iconfont icon-tongji mr10 fl"}):item.type==="video"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-bofang2 mr10 fl":"iconfont icon-bofang2 mr10 fl"}):"",__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:_this2.props.location.pathname===item.category_url?"color-blue task-hide activity-left-name":"task-hide activity-left-name",onClick:function onClick(e){return _this2.selectnavid(e,key,item.id,item.type,item.category_url);}},item.name),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:_this2.state.sandiantypes===key?"none":_this2.props.location.pathname===item.category_url?"color-blue fr mr25 font-14":"fr mr25 color999 font-14"},item.task_count===0?"":item.task_count),_this2.state.sandiantypes===key?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_antd_lib_popover___default.a,{placement:"right",content:_this2.maincontent(item,key),trigger:"hover",key:key},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:"iconfont icon-sandian mr20 fr color999"})):"")),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_beautiful_dnd__["a" /* DragDropContext */],{onDragEnd:_this2.onDragEnd},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_beautiful_dnd__["c" /* Droppable */],{droppableId:item.type},function(provided,snapshot){return __WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("ul",Object.assign({ref:provided.innerRef},provided.droppableProps,{className:"droppableul",style:{display:key===_this2.props.indexs?"":"none"}}),item.second_category===undefined?"":item.second_category.map(function(iem,index){if(item.type==="course_group"){if(iem.category_name==="未分班"){if(iem.category_count===0){return;}}}// console.log(iem.category_name);
// console.log(iem.category_name.length);
return __WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_beautiful_dnd__["b" /* Draggable */],{key:'id'+index,draggableId:iem.category_id===0?index+1:iem.category_id,index:index,className:"TabsWarps"},function(provided,snapshot){var _Object$assign;return __WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip___default.a,{placement:"bottom",title:"拖拽二级菜单调整顺序",key:index// visible={toopvisible===true&&toopvisibleindex===iem.category_id?true:false}
,visible:false},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("a",{className:"Draggablelichild",key:index},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("li",Object.assign((_Object$assign={className:"clearfix width93 Draggableli",key:index,onClick:function onClick(e){return _this2.selectnavids(e,key,iem.category_id,item.type+"child",iem.second_category_url,key);},onMouseLeave:function onMouseLeave(e){return _this2.twosandianhide(e,index,item.type);},onMouseEnter:function onMouseEnter(e){return _this2.twosandianshow(e,index,item.type);}},_defineProperty(_Object$assign,"key",index),_defineProperty(_Object$assign,"ref",provided.innerRef),_Object$assign),provided.draggableProps,provided.dragHandleProps),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("a",{className:"fl pl46 pd0  Draggablelichild"},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:_this2.props.location.pathname===iem.second_category_url?"color-blue fl ml38 maxwidth170 task-hide  Draggablelichild":"fl ml38 maxwidth170 task-hide  Draggablelichild",onMouseEnter:function onMouseEnter(e){return _this2.twosandianshowys(e,index,item.type);}},iem.category_name),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:twosandiantype===undefined?_this2.props.location.pathname===iem.second_category_url?"fr mr20 color-blue Draggablelichild font-14":"fr mr20 color999  Draggablelichild font-14":item.type===twosandiantypes&&twosandiantype===index&&iem.category_id!=0?"none":_this2.props.location.pathname===iem.second_category_url?"fr mr20 color-blue Draggablelichild font-14":"fr mr20 color999  Draggablelichild font-14"},iem.category_count===0?"":iem.category_count),item.type===twosandiantypes&&twosandiantype===index?iem.category_id===0?"":iem.category_type==="graduation_topics"||iem.category_type==="graduation_tasks"?iem.category_name&&iem.category_name.length<13?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:"fr mr20 color999  Draggablelichild font-14"},iem.category_count===0?"":iem.category_count):__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip___default.a,{placement:"right",key:index,title:iem.category_name,visible:toopvisibleindexs===undefined?false:toopvisibleindexs===index?true:false},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:"fr mr20 color999  Draggablelichild font-14"},iem.category_count===0?"":iem.category_count)):iem.category_name&&iem.category_name.length<13?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_antd_lib_popover___default.a,{placement:"right",content:_this2.content(item,iem,index),trigger:"hover",key:index,onMouseEnter:function onMouseEnter(e){return _this2.twosandianshowyss(e);}},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:"iconfont icon-sandian fr color999 mr15 Draggablelichild"})):__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip___default.a,{placement:"right",key:index,title:iem.category_name,visible:toopvisibleindexs===undefined?false:toopvisibleindexs===index?true:false},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_antd_lib_popover___default.a,{placement:"right",content:_this2.content(item,iem,index),trigger:"hover",key:index,onMouseEnter:function onMouseEnter(e){return _this2.twosandianshowyss(e);}},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:"iconfont icon-sandian fr color999 mr15 Draggablelichild"}))):""),provided.placeholder)));});}));}))));}):course_modules===undefined?"":course_modules.map(function(item,key){return __WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{key:key},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("a",null,__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("li",{className:_this2.props.mainurl===item.category_url&&_this2.props.location.pathname===item.category_url?"liactive":"clearfix active",onClick:function onClick(e){return _this2.setnavid(e,key,item.id,item.type,item.category_url);},onMouseEnter:function onMouseEnter(e){return _this2.showsandian(e,key);},title:item.name.length<7?"":item.name},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("a",{className:item.second_category===undefined?"fl ml20 pd0":item.second_category.length===0?"fl ml20 pd0":_this2.state.sandiantypes===key?"fl ml20 pd0 ebebeb":"fl ml20 pd0"},item.type==="announcement"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-xiaoxi1 mr10 fl":"iconfont icon-xiaoxi1 mr10 fl"}):item.type==="online_learning"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-kecheng mr10 fl font-16":"iconfont icon-kecheng mr10 fl font-16"}):item.type==="shixun_homework"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-daima mr10 fl":"iconfont icon-daima mr10 fl"}):item.type==="common_homework"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-putongzuoye mr10 fl":"iconfont icon-putongzuoye mr10 fl"}):item.type==="group_homework"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-fenzuzuoye mr10 fl":"iconfont icon-fenzuzuoye mr10 fl"}):item.type==="graduation"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-biyezhuanhuan mr10 fl":"iconfont icon-biyezhuanhuan mr10 fl"}):item.type==="exercise"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-shijuan mr10 fl":"iconfont icon-shijuan mr10 fl"}):item.type==="poll"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-wenjuan mr10 fl":"iconfont icon-wenjuan mr10 fl"}):item.type==="attachment"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-ziyuan mr10 fl":"iconfont icon-ziyuan mr10 fl"}):item.type==="board"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-taolun mr10 fl":"iconfont icon-taolun mr10 fl"}):item.type==="course_group"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-fenban mr10 fl":"iconfont icon-fenban mr10 fl"}):item.type==="video"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-bofang2 mr10 fl":"iconfont icon-bofang2 mr10 fl"}):item.type==="statistics"?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("i",{className:_this2.props.location.pathname===item.category_url?"color-blue iconfont icon-tongji mr10 fl":"iconfont icon-tongji mr10 fl"}):"",__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:_this2.props.location.pathname===item.category_url?"color-blue task-hide activity-left-name":"task-hide activity-left-name",onClick:function onClick(e){return _this2.selectnavid(e,key,item.id,item.type,item.category_url);}},item.name),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:_this2.props.location.pathname===item.category_url?"color-blue fr mr20 font-14":"fr mr20 color999 font-14"},item.task_count===0?"":item.task_count)))),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("ul",{style:{display:key===_this2.props.indexs?"":"none"},"class":"droppableul"},item.second_category===undefined?"":item.second_category.map(function(iem,index){if(item.type==="course_group"){if(iem.category_name==="未分班"){if(iem.category_count===0){return;}}}// console.log(iem.category_name);
// console.log(iem.category_name.length);一开始是10 显示是13
return __WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("a",null,__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("li",{className:"clearfix Draggableli",key:index,style:{width:'244px'}},iem.category_name&&iem.category_name.length<13?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("a",{className:"fl pl46 pd0 Draggablelichild",onClick:function onClick(e){return _this2.selectnavids(e,key,iem.category_id,item.type+"child",iem.second_category_url,key);}},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:_this2.props.location.pathname===iem.second_category_url?"color-blue fl ml38 maxwidth170 task-hide  Draggablelichild":"fl ml38 maxwidth170 task-hide  Draggablelichild"},iem.category_name),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:twosandiantype===undefined?_this2.props.location.pathname===iem.second_category_url?"fr mr20 color-blue font-14":"fr mr20 color999 font-14":twosandiantype===index&&item.type!="graduation"?"none":_this2.props.location.pathname===iem.second_category_url?"fr mr20 color-blue font-14":"fr mr20 color999 font-14"},iem.category_count===0?"":iem.category_count)):__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip___default.a,{placement:"right",key:index,title:iem.category_name},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("a",{className:"fl pl46 pd0 Draggablelichild",onClick:function onClick(e){return _this2.selectnavids(e,key,iem.category_id,item.type+"child",iem.second_category_url,key);}},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:_this2.props.location.pathname===iem.second_category_url?"color-blue fl ml38 maxwidth170 task-hide  Draggablelichild":"fl ml38 maxwidth170 task-hide  Draggablelichild"},iem.category_name),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:twosandiantype===undefined?_this2.props.location.pathname===iem.second_category_url?"fr mr20 color-blue font-14":"fr mr20 color999 font-14":twosandiantype===index&&item.type!="graduation"?"none":_this2.props.location.pathname===iem.second_category_url?"fr mr20 color-blue font-14":"fr mr20 color999 font-14"},iem.category_count===0?"":iem.category_count)))));})));}));}}]);return Coursesleftnav;}(__WEBPACK_IMPORTED_MODULE_12_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (Coursesleftnav);

/***/ }),

/***/ 1811:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(__webpack_require__(0));

var _rcTree = _interopRequireWildcard(__webpack_require__(2020));

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _DirectoryTree = _interopRequireDefault(__webpack_require__(2022));

var _icon = _interopRequireDefault(__webpack_require__(27));

var _configProvider = __webpack_require__(14);

var _motion = _interopRequireDefault(__webpack_require__(1014));

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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Tree =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tree, _React$Component);

  function Tree() {
    var _this;

    _classCallCheck(this, Tree);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tree).apply(this, arguments));

    _this.renderSwitcherIcon = function (prefixCls, switcherIcon, _ref) {
      var isLeaf = _ref.isLeaf,
          expanded = _ref.expanded,
          loading = _ref.loading;
      var showLine = _this.props.showLine;

      if (loading) {
        return React.createElement(_icon["default"], {
          type: "loading",
          className: "".concat(prefixCls, "-switcher-loading-icon")
        });
      }

      if (isLeaf) {
        return showLine ? React.createElement(_icon["default"], {
          type: "file",
          className: "".concat(prefixCls, "-switcher-line-icon")
        }) : null;
      }

      var switcherCls = "".concat(prefixCls, "-switcher-icon");

      if (switcherIcon) {
        return React.cloneElement(switcherIcon, {
          className: (0, _classnames["default"])(switcherIcon.props.className || '', switcherCls)
        });
      }

      return showLine ? React.createElement(_icon["default"], {
        type: expanded ? 'minus-square' : 'plus-square',
        className: "".concat(prefixCls, "-switcher-line-icon"),
        theme: "outlined"
      }) : React.createElement(_icon["default"], {
        type: "caret-down",
        className: switcherCls,
        theme: "filled"
      });
    };

    _this.setTreeRef = function (node) {
      _this.tree = node;
    };

    _this.renderTree = function (_ref2) {
      var _classNames;

      var getPrefixCls = _ref2.getPrefixCls;

      var _assertThisInitialize = _assertThisInitialized(_this),
          props = _assertThisInitialize.props;

      var customizePrefixCls = props.prefixCls,
          className = props.className,
          showIcon = props.showIcon,
          _switcherIcon = props.switcherIcon,
          blockNode = props.blockNode,
          children = props.children;
      var checkable = props.checkable;
      var prefixCls = getPrefixCls('tree', customizePrefixCls);
      return React.createElement(_rcTree["default"], _extends({
        ref: _this.setTreeRef
      }, props, {
        prefixCls: prefixCls,
        className: (0, _classnames["default"])(className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-icon-hide"), !showIcon), _defineProperty(_classNames, "".concat(prefixCls, "-block-node"), blockNode), _classNames)),
        checkable: checkable ? React.createElement("span", {
          className: "".concat(prefixCls, "-checkbox-inner")
        }) : checkable,
        switcherIcon: function switcherIcon(nodeProps) {
          return _this.renderSwitcherIcon(prefixCls, _switcherIcon, nodeProps);
        }
      }), children);
    };

    return _this;
  }

  _createClass(Tree, [{
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderTree);
    }
  }]);

  return Tree;
}(React.Component);

exports["default"] = Tree;
Tree.TreeNode = _rcTree.TreeNode;
Tree.DirectoryTree = _DirectoryTree["default"];
Tree.defaultProps = {
  checkable: false,
  showIcon: false,
  motion: _extends(_extends({}, _motion["default"]), {
    motionAppear: false
  }),
  blockNode: false
};
//# sourceMappingURL=Tree.js.map


/***/ }),

/***/ 1812:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeContext; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ant_design_create_react_context__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ant_design_create_react_context___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ant_design_create_react_context__);

var TreeContext = __WEBPACK_IMPORTED_MODULE_0__ant_design_create_react_context___default()(null);

/***/ }),

/***/ 1813:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["p"] = warnOnlyTreeNode;
/* harmony export (immutable) */ __webpack_exports__["b"] = arrDel;
/* harmony export (immutable) */ __webpack_exports__["a"] = arrAdd;
/* harmony export (immutable) */ __webpack_exports__["o"] = posToArr;
/* harmony export (immutable) */ __webpack_exports__["l"] = getPosition;
/* unused harmony export isTreeNode */
/* harmony export (immutable) */ __webpack_exports__["k"] = getNodeChildren;
/* unused harmony export isCheckDisabled */
/* unused harmony export traverseTreeNodes */
/* harmony export (immutable) */ __webpack_exports__["m"] = mapChildren;
/* harmony export (immutable) */ __webpack_exports__["j"] = getDragNodesKeys;
/* harmony export (immutable) */ __webpack_exports__["c"] = calcDropPosition;
/* harmony export (immutable) */ __webpack_exports__["d"] = calcSelectedKeys;
/* harmony export (immutable) */ __webpack_exports__["g"] = convertDataToTree;
/* harmony export (immutable) */ __webpack_exports__["h"] = convertTreeToEntities;
/* harmony export (immutable) */ __webpack_exports__["n"] = parseCheckedKeys;
/* harmony export (immutable) */ __webpack_exports__["e"] = conductCheck;
/* harmony export (immutable) */ __webpack_exports__["f"] = conductExpandParent;
/* harmony export (immutable) */ __webpack_exports__["i"] = getDataAndAria;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rc_util_es_Children_toArray__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_warning__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TreeNode__ = __webpack_require__(1814);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





var DRAG_SIDE_RANGE = 0.25;
var DRAG_MIN_GAP = 2;
var onlyTreeNodeWarned = false;
function warnOnlyTreeNode() {
  if (onlyTreeNodeWarned) return;
  onlyTreeNodeWarned = true;
  __WEBPACK_IMPORTED_MODULE_2_warning___default()(false, 'Tree only accept TreeNode as children.');
}
function arrDel(list, value) {
  var clone = list.slice();
  var index = clone.indexOf(value);

  if (index >= 0) {
    clone.splice(index, 1);
  }

  return clone;
}
function arrAdd(list, value) {
  var clone = list.slice();

  if (clone.indexOf(value) === -1) {
    clone.push(value);
  }

  return clone;
}
function posToArr(pos) {
  return pos.split('-');
}
function getPosition(level, index) {
  return "".concat(level, "-").concat(index);
}
function isTreeNode(node) {
  return node && node.type && node.type.isTreeNode;
}
function getNodeChildren(children) {
  return Object(__WEBPACK_IMPORTED_MODULE_1_rc_util_es_Children_toArray__["a" /* default */])(children).filter(isTreeNode);
}
function isCheckDisabled(node) {
  var _ref = node.props || {},
      disabled = _ref.disabled,
      disableCheckbox = _ref.disableCheckbox,
      checkable = _ref.checkable;

  return !!(disabled || disableCheckbox) || checkable === false;
}
function traverseTreeNodes(treeNodes, callback) {
  function processNode(node, index, parent) {
    var children = node ? node.props.children : treeNodes;
    var pos = node ? getPosition(parent.pos, index) : 0; // Filter children

    var childList = getNodeChildren(children); // Process node if is not root

    if (node) {
      var data = {
        node: node,
        index: index,
        pos: pos,
        key: node.key || pos,
        parentPos: parent.node ? parent.pos : null
      };
      callback(data);
    } // Process children node


    __WEBPACK_IMPORTED_MODULE_0_react__["Children"].forEach(childList, function (subNode, subIndex) {
      processNode(subNode, subIndex, {
        node: node,
        pos: pos
      });
    });
  }

  processNode(null);
}
/**
 * Use `rc-util` `toArray` to get the children list which keeps the key.
 * And return single node if children is only one(This can avoid `key` missing check).
 */

function mapChildren(children, func) {
  var list = Object(__WEBPACK_IMPORTED_MODULE_1_rc_util_es_Children_toArray__["a" /* default */])(children).map(func);

  if (list.length === 1) {
    return list[0];
  }

  return list;
}
function getDragNodesKeys(treeNodes, node) {
  var _node$props = node.props,
      eventKey = _node$props.eventKey,
      pos = _node$props.pos;
  var dragNodesKeys = [];
  traverseTreeNodes(treeNodes, function (_ref2) {
    var key = _ref2.key;
    dragNodesKeys.push(key);
  });
  dragNodesKeys.push(eventKey || pos);
  return dragNodesKeys;
} // Only used when drag, not affect SSR.

function calcDropPosition(event, treeNode) {
  var clientY = event.clientY;

  var _treeNode$selectHandl = treeNode.selectHandle.getBoundingClientRect(),
      top = _treeNode$selectHandl.top,
      bottom = _treeNode$selectHandl.bottom,
      height = _treeNode$selectHandl.height;

  var des = Math.max(height * DRAG_SIDE_RANGE, DRAG_MIN_GAP);

  if (clientY <= top + des) {
    return -1;
  }

  if (clientY >= bottom - des) {
    return 1;
  }

  return 0;
}
/**
 * Return selectedKeys according with multiple prop
 * @param selectedKeys
 * @param props
 * @returns [string]
 */

function calcSelectedKeys(selectedKeys, props) {
  if (!selectedKeys) return undefined;
  var multiple = props.multiple;

  if (multiple) {
    return selectedKeys.slice();
  }

  if (selectedKeys.length) {
    return [selectedKeys[0]];
  }

  return selectedKeys;
}
/**
 * Since React internal will convert key to string,
 * we need do this to avoid `checkStrictly` use number match
 */

function keyListToString(keyList) {
  if (!keyList) return keyList;
  return keyList.map(function (key) {
    return String(key);
  });
}

var internalProcessProps = function internalProcessProps(props) {
  return props;
};

function convertDataToTree(treeData, processor) {
  if (!treeData) return [];

  var _ref3 = processor || {},
      _ref3$processProps = _ref3.processProps,
      processProps = _ref3$processProps === void 0 ? internalProcessProps : _ref3$processProps;

  var list = Array.isArray(treeData) ? treeData : [treeData];
  return list.map(function (_ref4) {
    var children = _ref4.children,
        props = _objectWithoutProperties(_ref4, ["children"]);

    var childrenNodes = convertDataToTree(children, processor);
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__TreeNode__["a" /* default */], Object.assign({}, processProps(props)), childrenNodes);
  });
}
/**
 * Calculate treeNodes entities. `processTreeEntity` is used for `rc-tree-select`
 * @param treeNodes
 * @param processTreeEntity  User can customize the entity
 */

function convertTreeToEntities(treeNodes) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      initWrapper = _ref5.initWrapper,
      processEntity = _ref5.processEntity,
      onProcessFinished = _ref5.onProcessFinished;

  var posEntities = {};
  var keyEntities = {};
  var wrapper = {
    posEntities: posEntities,
    keyEntities: keyEntities
  };

  if (initWrapper) {
    wrapper = initWrapper(wrapper) || wrapper;
  }

  traverseTreeNodes(treeNodes, function (item) {
    var node = item.node,
        index = item.index,
        pos = item.pos,
        key = item.key,
        parentPos = item.parentPos;
    var entity = {
      node: node,
      index: index,
      key: key,
      pos: pos
    };
    posEntities[pos] = entity;
    keyEntities[key] = entity; // Fill children

    entity.parent = posEntities[parentPos];

    if (entity.parent) {
      entity.parent.children = entity.parent.children || [];
      entity.parent.children.push(entity);
    }

    if (processEntity) {
      processEntity(entity, wrapper);
    }
  });

  if (onProcessFinished) {
    onProcessFinished(wrapper);
  }

  return wrapper;
}
/**
 * Parse `checkedKeys` to { checkedKeys, halfCheckedKeys } style
 */

function parseCheckedKeys(keys) {
  if (!keys) {
    return null;
  } // Convert keys to object format


  var keyProps;

  if (Array.isArray(keys)) {
    // [Legacy] Follow the api doc
    keyProps = {
      checkedKeys: keys,
      halfCheckedKeys: undefined
    };
  } else if (_typeof(keys) === 'object') {
    keyProps = {
      checkedKeys: keys.checked || undefined,
      halfCheckedKeys: keys.halfChecked || undefined
    };
  } else {
    __WEBPACK_IMPORTED_MODULE_2_warning___default()(false, '`checkedKeys` is not an array or an object');
    return null;
  }

  keyProps.checkedKeys = keyListToString(keyProps.checkedKeys);
  keyProps.halfCheckedKeys = keyListToString(keyProps.halfCheckedKeys);
  return keyProps;
}
/**
 * Conduct check state by the keyList. It will conduct up & from the provided key.
 * If the conduct path reach the disabled or already checked / unchecked node will stop conduct.
 */

function conductCheck(
/** list of keys */
keyList,
/** is check the node or not */
isCheck,
/** parsed by `convertTreeToEntities` function in Tree */
keyEntities) {
  var checkStatus = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var checkedKeys = {};
  var halfCheckedKeys = {}; // Record the key has some child checked (include child half checked)

  (checkStatus.checkedKeys || []).forEach(function (key) {
    checkedKeys[key] = true;
  });
  (checkStatus.halfCheckedKeys || []).forEach(function (key) {
    halfCheckedKeys[key] = true;
  }); // Conduct up

  function conductUp(key) {
    if (checkedKeys[key] === isCheck) return;
    var entity = keyEntities[key];
    if (!entity) return;
    var children = entity.children,
        parent = entity.parent,
        node = entity.node;
    if (isCheckDisabled(node)) return; // Check child node checked status

    var everyChildChecked = true;
    var someChildChecked = false; // Child checked or half checked

    (children || []).filter(function (child) {
      return !isCheckDisabled(child.node);
    }).forEach(function (_ref6) {
      var childKey = _ref6.key;
      var childChecked = checkedKeys[childKey];
      var childHalfChecked = halfCheckedKeys[childKey];
      if (childChecked || childHalfChecked) someChildChecked = true;
      if (!childChecked) everyChildChecked = false;
    }); // Update checked status

    if (isCheck) {
      checkedKeys[key] = everyChildChecked;
    } else {
      checkedKeys[key] = false;
    }

    halfCheckedKeys[key] = someChildChecked;

    if (parent) {
      conductUp(parent.key);
    }
  } // Conduct down


  function conductDown(key) {
    if (checkedKeys[key] === isCheck) return;
    var entity = keyEntities[key];
    if (!entity) return;
    var children = entity.children,
        node = entity.node;
    if (isCheckDisabled(node)) return;
    checkedKeys[key] = isCheck;
    (children || []).forEach(function (child) {
      conductDown(child.key);
    });
  }

  function conduct(key) {
    var entity = keyEntities[key];

    if (!entity) {
      __WEBPACK_IMPORTED_MODULE_2_warning___default()(false, "'".concat(key, "' does not exist in the tree."));
      return;
    }

    var children = entity.children,
        parent = entity.parent,
        node = entity.node;
    checkedKeys[key] = isCheck;
    if (isCheckDisabled(node)) return; // Conduct down

    (children || []).filter(function (child) {
      return !isCheckDisabled(child.node);
    }).forEach(function (child) {
      conductDown(child.key);
    }); // Conduct up

    if (parent) {
      conductUp(parent.key);
    }
  }

  (keyList || []).forEach(function (key) {
    conduct(key);
  });
  var checkedKeyList = [];
  var halfCheckedKeyList = []; // Fill checked list

  Object.keys(checkedKeys).forEach(function (key) {
    if (checkedKeys[key]) {
      checkedKeyList.push(key);
    }
  }); // Fill half checked list

  Object.keys(halfCheckedKeys).forEach(function (key) {
    if (!checkedKeys[key] && halfCheckedKeys[key]) {
      halfCheckedKeyList.push(key);
    }
  });
  return {
    checkedKeys: checkedKeyList,
    halfCheckedKeys: halfCheckedKeyList
  };
}
/**
 * If user use `autoExpandParent` we should get the list of parent node
 * @param keyList
 * @param keyEntities
 */

function conductExpandParent(keyList, keyEntities) {
  var expandedKeys = {};

  function conductUp(key) {
    if (expandedKeys[key]) return;
    var entity = keyEntities[key];
    if (!entity) return;
    expandedKeys[key] = true;
    var parent = entity.parent,
        node = entity.node;
    if (node.props && node.props.disabled) return;

    if (parent) {
      conductUp(parent.key);
    }
  }

  (keyList || []).forEach(function (key) {
    conductUp(key);
  });
  return Object.keys(expandedKeys);
}
/**
 * Returns only the data- and aria- key/value pairs
 */

function getDataAndAria(props) {
  return Object.keys(props).reduce(function (prev, key) {
    if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-') {
      prev[key] = props[key];
    }

    return prev;
  }, {});
}

/***/ }),

/***/ 1814:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export InternalTreeNode */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_animate_es_CSSMotion__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_util_es_Children_toArray__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_lifecycles_compat__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__contextTypes__ = __webpack_require__(1812);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__util__ = __webpack_require__(1813);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



 // @ts-ignore






var ICON_OPEN = 'open';
var ICON_CLOSE = 'close';
var defaultTitle = '---';

var TreeNode =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TreeNode, _React$Component);

  function TreeNode() {
    var _this;

    _classCallCheck(this, TreeNode);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TreeNode).apply(this, arguments));
    _this.state = {
      dragNodeHighlight: false
    };

    _this.onSelectorClick = function (e) {
      // Click trigger before select/check operation
      var onNodeClick = _this.props.context.onNodeClick;
      onNodeClick(e, _assertThisInitialized(_this));

      if (_this.isSelectable()) {
        _this.onSelect(e);
      } else {
        _this.onCheck(e);
      }
    };

    _this.onSelectorDoubleClick = function (e) {
      var onNodeDoubleClick = _this.props.context.onNodeDoubleClick;
      onNodeDoubleClick(e, _assertThisInitialized(_this));
    };

    _this.onSelect = function (e) {
      if (_this.isDisabled()) return;
      var onNodeSelect = _this.props.context.onNodeSelect;
      e.preventDefault();
      onNodeSelect(e, _assertThisInitialized(_this));
    };

    _this.onCheck = function (e) {
      if (_this.isDisabled()) return;
      var _this$props = _this.props,
          disableCheckbox = _this$props.disableCheckbox,
          checked = _this$props.checked;
      var onNodeCheck = _this.props.context.onNodeCheck;
      if (!_this.isCheckable() || disableCheckbox) return;
      e.preventDefault();
      var targetChecked = !checked;
      onNodeCheck(e, _assertThisInitialized(_this), targetChecked);
    };

    _this.onMouseEnter = function (e) {
      var onNodeMouseEnter = _this.props.context.onNodeMouseEnter;
      onNodeMouseEnter(e, _assertThisInitialized(_this));
    };

    _this.onMouseLeave = function (e) {
      var onNodeMouseLeave = _this.props.context.onNodeMouseLeave;
      onNodeMouseLeave(e, _assertThisInitialized(_this));
    };

    _this.onContextMenu = function (e) {
      var onNodeContextMenu = _this.props.context.onNodeContextMenu;
      onNodeContextMenu(e, _assertThisInitialized(_this));
    };

    _this.onDragStart = function (e) {
      var onNodeDragStart = _this.props.context.onNodeDragStart;
      e.stopPropagation();

      _this.setState({
        dragNodeHighlight: true
      });

      onNodeDragStart(e, _assertThisInitialized(_this));

      try {
        // ie throw error
        // firefox-need-it
        e.dataTransfer.setData('text/plain', '');
      } catch (error) {// empty
      }
    };

    _this.onDragEnter = function (e) {
      var onNodeDragEnter = _this.props.context.onNodeDragEnter;
      e.preventDefault();
      e.stopPropagation();
      onNodeDragEnter(e, _assertThisInitialized(_this));
    };

    _this.onDragOver = function (e) {
      var onNodeDragOver = _this.props.context.onNodeDragOver;
      e.preventDefault();
      e.stopPropagation();
      onNodeDragOver(e, _assertThisInitialized(_this));
    };

    _this.onDragLeave = function (e) {
      var onNodeDragLeave = _this.props.context.onNodeDragLeave;
      e.stopPropagation();
      onNodeDragLeave(e, _assertThisInitialized(_this));
    };

    _this.onDragEnd = function (e) {
      var onNodeDragEnd = _this.props.context.onNodeDragEnd;
      e.stopPropagation();

      _this.setState({
        dragNodeHighlight: false
      });

      onNodeDragEnd(e, _assertThisInitialized(_this));
    };

    _this.onDrop = function (e) {
      var onNodeDrop = _this.props.context.onNodeDrop;
      e.preventDefault();
      e.stopPropagation();

      _this.setState({
        dragNodeHighlight: false
      });

      onNodeDrop(e, _assertThisInitialized(_this));
    }; // Disabled item still can be switch


    _this.onExpand = function (e) {
      var onNodeExpand = _this.props.context.onNodeExpand;
      onNodeExpand(e, _assertThisInitialized(_this));
    }; // Drag usage


    _this.setSelectHandle = function (node) {
      _this.selectHandle = node;
    };

    _this.getNodeChildren = function () {
      var children = _this.props.children;
      var originList = Object(__WEBPACK_IMPORTED_MODULE_4_rc_util_es_Children_toArray__["a" /* default */])(children).filter(function (node) {
        return node;
      });
      var targetList = Object(__WEBPACK_IMPORTED_MODULE_7__util__["k" /* getNodeChildren */])(originList);

      if (originList.length !== targetList.length) {
        Object(__WEBPACK_IMPORTED_MODULE_7__util__["p" /* warnOnlyTreeNode */])();
      }

      return targetList;
    };

    _this.getNodeState = function () {
      var expanded = _this.props.expanded;

      if (_this.isLeaf()) {
        return null;
      }

      return expanded ? ICON_OPEN : ICON_CLOSE;
    };

    _this.isLeaf = function () {
      var _this$props2 = _this.props,
          isLeaf = _this$props2.isLeaf,
          loaded = _this$props2.loaded;
      var loadData = _this.props.context.loadData;
      var hasChildren = _this.getNodeChildren().length !== 0;

      if (isLeaf === false) {
        return false;
      }

      return isLeaf || !loadData && !hasChildren || loadData && loaded && !hasChildren;
    };

    _this.isDisabled = function () {
      var disabled = _this.props.disabled;
      var treeDisabled = _this.props.context.disabled; // Follow the logic of Selectable

      if (disabled === false) {
        return false;
      }

      return !!(treeDisabled || disabled);
    };

    _this.isCheckable = function () {
      var checkable = _this.props.checkable;
      var treeCheckable = _this.props.context.checkable; // Return false if tree or treeNode is not checkable

      if (!treeCheckable || checkable === false) return false;
      return treeCheckable;
    }; // Load data to avoid default expanded tree without data


    _this.syncLoadData = function (props) {
      var expanded = props.expanded,
          loading = props.loading,
          loaded = props.loaded;
      var _this$props$context = _this.props.context,
          loadData = _this$props$context.loadData,
          onNodeLoad = _this$props$context.onNodeLoad;
      if (loading) return; // read from state to avoid loadData at same time

      if (loadData && expanded && !_this.isLeaf()) {
        // We needn't reload data when has children in sync logic
        // It's only needed in node expanded
        var hasChildren = _this.getNodeChildren().length !== 0;

        if (!hasChildren && !loaded) {
          onNodeLoad(_assertThisInitialized(_this));
        }
      }
    }; // Switcher


    _this.renderSwitcher = function () {
      var _this$props3 = _this.props,
          expanded = _this$props3.expanded,
          switcherIconFromProps = _this$props3.switcherIcon;
      var _this$props$context2 = _this.props.context,
          prefixCls = _this$props$context2.prefixCls,
          switcherIconFromCtx = _this$props$context2.switcherIcon;
      var switcherIcon = switcherIconFromProps || switcherIconFromCtx;

      if (_this.isLeaf()) {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", {
          className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()("".concat(prefixCls, "-switcher"), "".concat(prefixCls, "-switcher-noop"))
        }, typeof switcherIcon === 'function' ? switcherIcon(_objectSpread({}, _this.props, {
          isLeaf: true
        })) : switcherIcon);
      }

      var switcherCls = __WEBPACK_IMPORTED_MODULE_2_classnames___default()("".concat(prefixCls, "-switcher"), "".concat(prefixCls, "-switcher_").concat(expanded ? ICON_OPEN : ICON_CLOSE));
      return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", {
        onClick: _this.onExpand,
        className: switcherCls
      }, typeof switcherIcon === 'function' ? switcherIcon(_objectSpread({}, _this.props, {
        isLeaf: false
      })) : switcherIcon);
    }; // Checkbox


    _this.renderCheckbox = function () {
      var _this$props4 = _this.props,
          checked = _this$props4.checked,
          halfChecked = _this$props4.halfChecked,
          disableCheckbox = _this$props4.disableCheckbox;
      var prefixCls = _this.props.context.prefixCls;

      var disabled = _this.isDisabled();

      var checkable = _this.isCheckable();

      if (!checkable) return null; // [Legacy] Custom element should be separate with `checkable` in future

      var $custom = typeof checkable !== 'boolean' ? checkable : null;
      return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", {
        className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()("".concat(prefixCls, "-checkbox"), checked && "".concat(prefixCls, "-checkbox-checked"), !checked && halfChecked && "".concat(prefixCls, "-checkbox-indeterminate"), (disabled || disableCheckbox) && "".concat(prefixCls, "-checkbox-disabled")),
        onClick: _this.onCheck
      }, $custom);
    };

    _this.renderIcon = function () {
      var loading = _this.props.loading;
      var prefixCls = _this.props.context.prefixCls;
      return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", {
        className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()("".concat(prefixCls, "-iconEle"), "".concat(prefixCls, "-icon__").concat(_this.getNodeState() || 'docu'), loading && "".concat(prefixCls, "-icon_loading"))
      });
    }; // Icon + Title


    _this.renderSelector = function () {
      var dragNodeHighlight = _this.state.dragNodeHighlight;
      var _this$props5 = _this.props,
          title = _this$props5.title,
          selected = _this$props5.selected,
          icon = _this$props5.icon,
          loading = _this$props5.loading;
      var _this$props$context3 = _this.props.context,
          prefixCls = _this$props$context3.prefixCls,
          showIcon = _this$props$context3.showIcon,
          treeIcon = _this$props$context3.icon,
          draggable = _this$props$context3.draggable,
          loadData = _this$props$context3.loadData;

      var disabled = _this.isDisabled();

      var wrapClass = "".concat(prefixCls, "-node-content-wrapper"); // Icon - Still show loading icon when loading without showIcon

      var $icon;

      if (showIcon) {
        var currentIcon = icon || treeIcon;
        $icon = currentIcon ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", {
          className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()("".concat(prefixCls, "-iconEle"), "".concat(prefixCls, "-icon__customize"))
        }, typeof currentIcon === 'function' ? currentIcon(_this.props) : currentIcon) : _this.renderIcon();
      } else if (loadData && loading) {
        $icon = _this.renderIcon();
      } // Title


      var $title = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", {
        className: "".concat(prefixCls, "-title")
      }, title);
      return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", {
        ref: _this.setSelectHandle,
        title: typeof title === 'string' ? title : '',
        className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()("".concat(wrapClass), "".concat(wrapClass, "-").concat(_this.getNodeState() || 'normal'), !disabled && (selected || dragNodeHighlight) && "".concat(prefixCls, "-node-selected"), !disabled && draggable && 'draggable'),
        draggable: !disabled && draggable || undefined,
        "aria-grabbed": !disabled && draggable || undefined,
        onMouseEnter: _this.onMouseEnter,
        onMouseLeave: _this.onMouseLeave,
        onContextMenu: _this.onContextMenu,
        onClick: _this.onSelectorClick,
        onDoubleClick: _this.onSelectorDoubleClick,
        onDragStart: draggable ? _this.onDragStart : undefined
      }, $icon, $title);
    }; // Children list wrapped with `Animation`


    _this.renderChildren = function () {
      var _this$props6 = _this.props,
          expanded = _this$props6.expanded,
          pos = _this$props6.pos;
      var _this$props$context4 = _this.props.context,
          prefixCls = _this$props$context4.prefixCls,
          motion = _this$props$context4.motion,
          renderTreeNode = _this$props$context4.renderTreeNode; // Children TreeNode

      var nodeList = _this.getNodeChildren();

      if (nodeList.length === 0) {
        return null;
      }

      return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3_rc_animate_es_CSSMotion__["a" /* default */], Object.assign({
        visible: expanded
      }, motion), function (_ref) {
        var style = _ref.style,
            className = _ref.className;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ul", {
          className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()(className, "".concat(prefixCls, "-child-tree"), expanded && "".concat(prefixCls, "-child-tree-open")),
          style: style,
          "data-expanded": expanded,
          role: "group"
        }, Object(__WEBPACK_IMPORTED_MODULE_7__util__["m" /* mapChildren */])(nodeList, function (node, index) {
          return renderTreeNode(node, index, pos);
        }));
      });
    };

    return _this;
  } // Isomorphic needn't load data in server side


  _createClass(TreeNode, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props7 = this.props,
          eventKey = _this$props7.eventKey,
          registerTreeNode = _this$props7.context.registerTreeNode;
      this.syncLoadData(this.props);
      registerTreeNode(eventKey, this);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.syncLoadData(this.props);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props8 = this.props,
          eventKey = _this$props8.eventKey,
          registerTreeNode = _this$props8.context.registerTreeNode;
      registerTreeNode(eventKey, null);
    }
  }, {
    key: "isSelectable",
    value: function isSelectable() {
      var selectable = this.props.selectable;
      var treeSelectable = this.props.context.selectable; // Ignore when selectable is undefined or null

      if (typeof selectable === 'boolean') {
        return selectable;
      }

      return treeSelectable;
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var loading = this.props.loading;

      var _this$props9 = this.props,
          className = _this$props9.className,
          style = _this$props9.style,
          dragOver = _this$props9.dragOver,
          dragOverGapTop = _this$props9.dragOverGapTop,
          dragOverGapBottom = _this$props9.dragOverGapBottom,
          isLeaf = _this$props9.isLeaf,
          expanded = _this$props9.expanded,
          selected = _this$props9.selected,
          checked = _this$props9.checked,
          halfChecked = _this$props9.halfChecked,
          otherProps = _objectWithoutProperties(_this$props9, ["className", "style", "dragOver", "dragOverGapTop", "dragOverGapBottom", "isLeaf", "expanded", "selected", "checked", "halfChecked"]);

      var _this$props$context5 = this.props.context,
          prefixCls = _this$props$context5.prefixCls,
          filterTreeNode = _this$props$context5.filterTreeNode,
          draggable = _this$props$context5.draggable;
      var disabled = this.isDisabled();
      var dataOrAriaAttributeProps = Object(__WEBPACK_IMPORTED_MODULE_7__util__["i" /* getDataAndAria */])(otherProps);
      return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", Object.assign({
        className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()(className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-treenode-disabled"), disabled), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-switcher-").concat(expanded ? 'open' : 'close'), !isLeaf), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-checkbox-checked"), checked), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-checkbox-indeterminate"), halfChecked), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-selected"), selected), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-loading"), loading), _defineProperty(_classNames, 'drag-over', !disabled && dragOver), _defineProperty(_classNames, 'drag-over-gap-top', !disabled && dragOverGapTop), _defineProperty(_classNames, 'drag-over-gap-bottom', !disabled && dragOverGapBottom), _defineProperty(_classNames, 'filter-node', filterTreeNode && filterTreeNode(this)), _classNames)),
        style: style,
        role: "treeitem",
        onDragEnter: draggable ? this.onDragEnter : undefined,
        onDragOver: draggable ? this.onDragOver : undefined,
        onDragLeave: draggable ? this.onDragLeave : undefined,
        onDrop: draggable ? this.onDrop : undefined,
        onDragEnd: draggable ? this.onDragEnd : undefined
      }, dataOrAriaAttributeProps), this.renderSwitcher(), this.renderCheckbox(), this.renderSelector(), this.renderChildren());
    }
  }]);

  return TreeNode;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

TreeNode.propTypes = {
  eventKey: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  prefixCls: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  className: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  style: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  onSelect: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  // By parent
  expanded: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  selected: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  checked: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  loaded: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  loading: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  halfChecked: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node,
  title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node,
  pos: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  dragOver: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  dragOverGapTop: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  dragOverGapBottom: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  // By user
  isLeaf: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  checkable: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  selectable: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  disabled: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  disableCheckbox: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  icon: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func]),
  switcherIcon: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func])
};
Object(__WEBPACK_IMPORTED_MODULE_5_react_lifecycles_compat__["polyfill"])(TreeNode);

var ContextTreeNode = function ContextTreeNode(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_6__contextTypes__["a" /* TreeContext */].Consumer, null, function (context) {
    return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](TreeNode, Object.assign({}, props, {
      context: context
    }));
  });
};

ContextTreeNode.defaultProps = {
  title: defaultTitle
};
ContextTreeNode.isTreeNode = 1;

/* harmony default export */ __webpack_exports__["a"] = (ContextTreeNode);

/***/ }),

/***/ 1906:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Modals__ = __webpack_require__(180);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}//加入精品课堂
var Jointheclass=function(_Component){_inherits(Jointheclass,_Component);function Jointheclass(props){_classCallCheck(this,Jointheclass);var _this=_possibleConstructorReturn(this,(Jointheclass.__proto__||Object.getPrototypeOf(Jointheclass)).call(this,props));_this.modalCancel=function(){_this.props.ysljoinmodalCancel();};_this.setDownload=function(){var cousestype=_this.props.pathcousestypeid;var id=_this.props.Pathcourseid===undefined?_this.props.match.params.coursesId:_this.props.Pathcourseid;var url='/courses/'+id+'/join_excellent_course.json';__WEBPACK_IMPORTED_MODULE_1_axios___default.a.post(url).then(function(result){if(result){if(result.data){if(result.data.status===0){_this.props.showNotification(result.data.message);_this.props.ysljoinmodalCanceltwo();if(cousestype===1){window.open('/courses/'+id+'/informs');}}else{_this.props.showNotification(result.data.message);}}}}).catch(function(error){console.log(error);});};return _this;}_createClass(Jointheclass,[{key:'componentDidMount',value:function componentDidMount(){// console.log("加入精品课堂");
// console.log(this.props);
var type=this.props.yslJointhe===undefined?false:this.props.yslJointhe;if(type===true){this.setState({Modalstype:true});}}},{key:'render',value:function render(){var _this2=this;// console.log("加入精品课堂2");
//console.log(this.props.Pathcourseid);
return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Modals__["a" /* default */],{modalsType:this.props.yslJointhe===undefined?false:this.props.yslJointhe,modalsTopval:"是否确定加入该课堂?",modalCancel:function modalCancel(){return _this2.modalCancel();},modalSave:function modalSave(){return _this2.setDownload();}});}}]);return Jointheclass;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (Jointheclass);

/***/ }),

/***/ 1907:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_input_style_css__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_input_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_input_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_input__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_ModalWrapper__ = __webpack_require__(341);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var AddStudentModal=function(_Component){_inherits(AddStudentModal,_Component);function AddStudentModal(props){_classCallCheck(this,AddStudentModal);var _this=_possibleConstructorReturn(this,(AddStudentModal.__proto__||Object.getPrototypeOf(AddStudentModal)).call(this,props));_this.setVisible=function(visible){_this.refs.modalWrapper.setVisible(visible);if(visible==false){_this.setState({name:''});}};_this.onSendOk=function(){if(!_this.state.name||!_this.state.name.trim()){_this.props.showNotification('请先输入答辩组名称。');return;}var courseId=_this.props.match.params.coursesId;var url="/courses/"+courseId+"/create_graduation_group.json";var params={"name":_this.state.name};__WEBPACK_IMPORTED_MODULE_3_axios___default.a.post(url,params).then(function(response){if(response.data.status==0){_this.setVisible(false);_this.props.onOk&&_this.props.onOk();_this.props.showNotification('添加成功');}}).catch(function(error){console.log(error);});};_this.onOk=function(){_this.onSendOk();};_this.state={name:''};return _this;}_createClass(AddStudentModal,[{key:"componentDidMount",value:function componentDidMount(){}},{key:"render",value:function render(){var _this2=this;var name=this.state.name;var moduleName=this.props.moduleName;return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__common_ModalWrapper__["a" /* default */],Object.assign({ref:"modalWrapper",width:"600px",title:"\u6DFB\u52A0\u7B54\u8FA9\u7EC4"},this.props,{onOk:this.onOk,className:"addGraduationGroupModal"}),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div",{style:{width:'100%',textAlign:'center'}},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("span",null,"\u540D\u79F0\uFF1A"),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_input___default.a,{style:{width:'210px'},value:name,onChange:function onChange(e){return _this2.setState({name:e.target.value});},placeholder:'示例：李老师答辩组'})));}}]);return AddStudentModal;}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (AddStudentModal);

/***/ }),

/***/ 1918:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findDOMNode;

var _reactDom = _interopRequireDefault(__webpack_require__(4));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Return if a node is a DOM node. Else will return by `findDOMNode`
 */
function findDOMNode(node) {
  if (node instanceof HTMLElement) {
    return node;
  }

  return _reactDom.default.findDOMNode(node);
}

/***/ }),

/***/ 2010:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_Courses_css__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_Courses_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__css_Courses_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_educoder__ = __webpack_require__(5);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var CoursesGuide=function(_Component){_inherits(CoursesGuide,_Component);function CoursesGuide(props){_classCallCheck(this,CoursesGuide);var _this=_possibleConstructorReturn(this,(CoursesGuide.__proto__||Object.getPrototypeOf(CoursesGuide)).call(this,props));_this.state={step:1};return _this;}_createClass(CoursesGuide,[{key:'render',value:function render(){var step=this.state.step;return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'guidePanel'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('style',null,'\n          body{\n            overflow:hidden!important;\n          }\n        '),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'educontent'},step==1&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'clearfix'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img',{className:'fr',src:'/images/course/guide/1-1.png',width:'175px',style:{margin:"205px 38px 0px 0px"}})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'clearfix pr'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img',{src:'/images/course/guide/1-2.png',className:'fr mt20 guideFirstRight'})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'clearfix pr',style:{marginTop:"80px"}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img',{src:'/images/course/guide/1-4.png',className:'fl guideFirstLeft'}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img',{src:'/images/course/guide/1-3.png',className:'fl',style:{marginLeft:"410px"}})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'clearfix'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img',{src:'/images/course/guide/1-5.png',className:'fl mt50'}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img',{src:'/images/course/guide/1-6.png',className:'fl mt40'}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a',{href:'javascript:void(0)'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img',{src:'/images/course/guide/1-7.png',className:'fl mt80 ml100'}))))));}}]);return CoursesGuide;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* unused harmony default export */ var _unused_webpack_default_export = (CoursesGuide);

/***/ }),

/***/ 2011:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_spin_style_css__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_spin_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_spin_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_spin__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_spin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_spin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_checkbox_style_css__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_checkbox_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_antd_lib_checkbox_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_checkbox__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_checkbox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_antd_lib_checkbox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_input_style_css__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_input_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_antd_lib_input_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_input__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_antd_lib_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_antd_lib_select_style_css__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_antd_lib_select_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_antd_lib_select_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_antd_lib_select__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_antd_lib_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_antd_lib_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__common_ModalWrapper__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react_infinite_scroller__ = __webpack_require__(1442);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react_infinite_scroller___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_react_infinite_scroller__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__common__ = __webpack_require__(1719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__coursesPublic_NoneData__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__coursesPublic_form_SchoolSelect__ = __webpack_require__(1768);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Option=__WEBPACK_IMPORTED_MODULE_7_antd_lib_select___default.a.Option;var pageCount=15;var AddStudentModal=function(_Component){_inherits(AddStudentModal,_Component);function AddStudentModal(props){_classCallCheck(this,AddStudentModal);var _this=_possibleConstructorReturn(this,(AddStudentModal.__proto__||Object.getPrototypeOf(AddStudentModal)).call(this,props));_this.fetchMemberList=function(arg_page){var courseId=_this.props.match.params.coursesId;var page=arg_page||_this.state.page;var _this$state=_this.state,name=_this$state.name,school_name=_this$state.school_name;var url="/courses/"+courseId+"/search_users.json?page="+page+"&limit="+pageCount+"&school_name="+(school_name||'')+"&name="+(name||'');_this.setState({loading:true});__WEBPACK_IMPORTED_MODULE_9_axios___default.a.get(encodeURI(url)).then(function(response){if(!response.data.users||response.data.users.length==0){_this.setState({users:page==1?response.data.users:_this.state.users,page:page,loading:false,hasMore:false});}else{_this.setState({users:page==1?response.data.users:_this.state.users.concat(response.data.users),page:page,loading:false,hasMore:response.data.users.length==pageCount});}}).catch(function(error){console.log(error);});};_this.fetchOptions=function(){// add_teacher_popup
var courseId=_this.props.match.params.coursesId;var url="/courses/"+courseId+"/all_course_groups.json";__WEBPACK_IMPORTED_MODULE_9_axios___default.a.get(url,{}).then(function(response){if(response.data.course_groups&&response.data.course_groups.length){_this.setState({course_groups:response.data.course_groups,courseGroup:'0'// response.data.course_groups[0].id
});}else{// showNotification('')
}}).catch(function(error){console.log(error);});};_this.setVisible=function(visible){if(visible){_this.setState({school_name:_this.props.user.user_school,name:undefined},function(){_this.fetchMemberList();});_this.fetchOptions();}_this.refs.modalWrapper.setVisible(visible);if(visible==false){_this.setState({checkBoxValues:[]});}};_this.onSendOk=function(){if(!_this.state.checkBoxValues||_this.state.checkBoxValues.length==0){_this.props.showNotification('请从列表中先选择用户。');return;}_this.setState({isSpin:true});var courseId=_this.props.match.params.coursesId;var url="/courses/"+courseId+"/add_students_by_search.json";var params={"user_ids":_this.state.checkBoxValues};var courseGroup=_this.state.courseGroup;if(courseGroup){params.course_group_id=courseGroup;}__WEBPACK_IMPORTED_MODULE_9_axios___default.a.post(url,params).then(function(response){if(response.data.status==0){_this.setVisible(false);_this.props.showNotification('添加成功');_this.props.addStudentSuccess&&_this.props.addStudentSuccess(params);_this.setState({isSpin:false});}}).catch(function(error){console.log(error);});};_this.onOk=function(){_this.onSendOk();};_this.onCheckBoxChange=function(checkBoxValues){_this.setState({checkBoxValues:checkBoxValues});};_this.handleInfiniteOnLoad=function(){_this.fetchMemberList(_this.state.page+1);};_this.onSearch=function(){_this.fetchMemberList(1);};_this.handleCourseGroupChange=function(value){_this.setState({courseGroup:value});};_this.state={checkBoxValues:[],users:[],hasMore:true,loading:false,courseGroup:'',page:1,isSpin:false};return _this;}_createClass(AddStudentModal,[{key:"componentDidMount",value:function componentDidMount(){}},{key:"render",value:function render(){var _this2=this;var _state=this.state,users=_state.users,checkBoxValues=_state.checkBoxValues,loading=_state.loading,hasMore=_state.hasMore,name=_state.name,school_name=_state.school_name,courseGroup=_state.courseGroup,course_groups=_state.course_groups,isSpin=_state.isSpin;var moduleName=this.props.moduleName;var theme=this.context;return __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__common_ModalWrapper__["a" /* default */],Object.assign({ref:"modalWrapper",width:"700px",title:"\u6DFB\u52A0"+moduleName},this.props,{onOk:this.onOk,className:"addStudentModal courseForm"}),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("style",null,"\n        .demo-loading-container {\n          position: absolute;\n          bottom: 93px;\n          width: 82%;\n          text-align: center;\n        }\n        .df {\n          display: flex;\n          align-items: baseline;\n          margin: 12px 0;\n        }\n        .firstLabel {\n          flex: 0 0 60px;\n        }\n        .df span.label {\n          margin-right: 8px;\n          text-align: right;\n          margin-left: 12px;\n        }\n        .df .ant-input-affix-wrapper {\n          width: 32%;\n        }\n\n        .addTeacherModal label.task-hide {\n          width: 100%;\n        }\n        "),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("div",{className:"df"},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span",{className:"mr10"},"\u59D3\u540D:"),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd_lib_input___default.a,{allowClear:true,placeholder:"\u8BF7\u8F93\u5165\u771F\u5B9E\u59D3\u540D",value:name,onChange:function onChange(e){_this2.setState({name:e.target.value});},style:{width:'221px'}}),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span",{className:"label",style:{minWidth:'36px'}},"\u5355\u4F4D:"),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15__coursesPublic_form_SchoolSelect__["a" /* default */],{value:school_name,onChange:function onChange(value){_this2.setState({school_name:value});}}),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("a",{className:"task-btn task-btn-orange",onClick:function onClick(){return _this2.fetchMemberList(1);},style:{height:'30px',lineHeight:'30px',marginLeft:'10px',width:'70px'}},"\u641C\u7D22")),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("p",{className:"clearfix mb2",style:{margin:'0px 20px 6px'}},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_antd_lib_checkbox___default.a,{className:"fl",style:{visibility:'hidden'}}),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span",{className:"fl task-hide with25",style:{"maxWidth":"208px;"}},'姓名'),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span",{className:"fl task-hide with25",style:{"maxWidth":"208px;"}},'学号'),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span",{className:"fl task-hide with35",style:{"maxWidth":"208px;"}},'单位'),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span",{className:"fl task-hide with10",style:{"maxWidth":"48px;"}},'')),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_spin___default.a,{size:"large",spinning:isSpin},loading||users.length?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("div",null,__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("div",{className:"edu-back-skyblue padding10-15",style:{height:"300px",overflowY:"scroll",overflowAnchor:'none'}},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11_react_infinite_scroller___default.a,{threshold:10,initialLoad:false,pageStart:0,loadMore:this.handleInfiniteOnLoad,hasMore:!loading&&hasMore,useWindow:false},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_antd_lib_checkbox___default.a.Group,{style:{width:'100%'},onChange:this.onCheckBoxChange,value:checkBoxValues},users.map(function(candidate){return __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("p",{className:"clearfix mb7",key:candidate.id},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_antd_lib_checkbox___default.a,{className:"fl",value:candidate.id,key:candidate.id,disabled:candidate.added}),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span",{className:"fl task-hide with25 ml5"},candidate.name?__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("a",{href:"/users/"+candidate.login,title:candidate.name,target:"_blank"},candidate.name):__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span",null," ")),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span",{className:"fl task-hide with25",title:candidate.student_id,style:{width:'145px',height:"20px"}},candidate.student_id||' '),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span",{className:"fl task-hide with35",title:candidate.school_name,style:{width:'204px',height:"20px"}},candidate.school_name),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span",{className:"fl task-hide with10",style:{"maxWidth":"48px",color:theme.foreground_select}},candidate.added?'已加入':''));})),loading&&hasMore&&__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("div",{className:"demo-loading-container"},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_spin___default.a,null)))),course_groups&&course_groups.length&&__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("div",{className:"df",style:{marginTop:'12px'}},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement("span",{className:"mr10",style:{width:'148px'}},"\u6240\u9009\u5B66\u751F\u5206\u73ED\u81F3(\u9009\u586B):"),__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_antd_lib_select___default.a,{style:{width:236},onChange:this.handleCourseGroupChange,value:courseGroup},__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(Option,{value:'0'},'未分班'),course_groups.map(function(item){return __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(Option,{value:item.id},item.name);})))):__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13__coursesPublic_NoneData__["a" /* default */],null)));}}]);return AddStudentModal;}(__WEBPACK_IMPORTED_MODULE_8_react__["Component"]);AddStudentModal.contextType=__WEBPACK_IMPORTED_MODULE_14_educoder__["y" /* ThemeContext */];/* harmony default export */ __webpack_exports__["a"] = (AddStudentModal);

/***/ }),

/***/ 2012:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_icon_style_css__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_icon_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_icon_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_icon__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_icon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_divider_style_css__ = __webpack_require__(1451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_divider_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_antd_lib_divider_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_divider__ = __webpack_require__(1452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_divider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_antd_lib_divider__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_spin_style_css__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_spin_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_antd_lib_spin_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_spin__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_spin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_antd_lib_spin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_antd_lib_checkbox_style_css__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_antd_lib_checkbox_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_antd_lib_checkbox_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_antd_lib_checkbox__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_antd_lib_checkbox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_antd_lib_checkbox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_antd_lib_input_style_css__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_antd_lib_input_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_antd_lib_input_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_antd_lib_input__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_antd_lib_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_antd_lib_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_antd_lib_select_style_css__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_antd_lib_select_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_antd_lib_select_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_antd_lib_select__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_antd_lib_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_antd_lib_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__common_ModalWrapper__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_react_infinite_scroller__ = __webpack_require__(1442);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_react_infinite_scroller___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_react_infinite_scroller__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__common__ = __webpack_require__(1719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__coursesPublic_NoneData__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__AddGraduationGroupModal__ = __webpack_require__(1907);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__coursesPublic_form_SchoolSelect__ = __webpack_require__(1768);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Option=__WEBPACK_IMPORTED_MODULE_11_antd_lib_select___default.a.Option;var pageCount=15;var timeout=void 0,currentValue=void 0;var AddTeacherModal=function(_Component){_inherits(AddTeacherModal,_Component);function AddTeacherModal(props){_classCallCheck(this,AddTeacherModal);var _this=_possibleConstructorReturn(this,(AddTeacherModal.__proto__||Object.getPrototypeOf(AddTeacherModal)).call(this,props));_this.fetchMemberList=function(arg_page){var courseId=_this.props.match.params.coursesId;var page=arg_page||_this.state.page;var _this$state=_this.state,name=_this$state.name,school_name=_this$state.school_name;var url="/courses/"+courseId+"/search_teacher_candidate.json";_this.setState({loading:true});__WEBPACK_IMPORTED_MODULE_13_axios___default.a.post(url,{page:page,limit:pageCount,school_name:school_name||'',name:name||''}).then(function(response){if(!response.data.candidates||response.data.candidates.length==0){_this.setState({candidates:page==1?response.data.candidates:_this.state.candidates,page:page,loading:false,hasMore:false});}else{_this.setState({candidates:page==1?response.data.candidates:_this.state.candidates.concat(response.data.candidates),page:page,loading:false,hasMore:response.data.candidates.length==pageCount});}}).catch(function(error){console.log(error);});};_this.onAddGraduationGroupOk=function(){_this.fetchOptions();};_this.fetchOptions=function(){// add_teacher_popup
var courseId=_this.props.match.params.coursesId;var url="/courses/"+courseId+"/add_teacher_popup.json";__WEBPACK_IMPORTED_MODULE_13_axios___default.a.get(url,{}).then(function(response){if(response.data.school_name){_this.setState({school_name:response.data.school_name},function(){return _this.fetchMemberList();});}else{_this.fetchMemberList();}if(response.data.graduation_groups){_this.setState({graduation_groups:response.data.graduation_groups});}if(response.data.course_groups){_this.setState({course_groups:response.data.course_groups});}}).catch(function(error){console.log(error);});};_this.setVisible=function(visible){if(visible){_this.fetchOptions();}_this.refs.modalWrapper.setVisible(visible);if(visible==false){_this.setState({checkBoxValues:[]});}_this.setState({name:undefined,graduationGroup:undefined,courseGroup:undefined});};_this.onSendOk=function(){var courseId=_this.props.match.params.coursesId;var url="/courses/"+courseId+"/add_teacher.json";if(_this.state.checkBoxValues.length==0){_this.props.showNotification('请先在下面列表中选择要添加教师的成员');return;}var params={"user_list":_this.state.checkBoxValues.map(function(item){return{'user_id':item};}),// "graduation_group_id": "2",
// "course_group_id": "820",
"role":_this.props.isTeacher?__WEBPACK_IMPORTED_MODULE_16__common__["b" /* ROLE_TEACHER_NUM */]:__WEBPACK_IMPORTED_MODULE_16__common__["a" /* ROLE_ASSISTANT_NUM */]};var _this$state2=_this.state,graduationGroup=_this$state2.graduationGroup,courseGroup=_this$state2.courseGroup;if(graduationGroup){params.graduation_group_id=graduationGroup;}if(courseGroup){params.course_group_id=courseGroup;}__WEBPACK_IMPORTED_MODULE_13_axios___default.a.post(url,params).then(function(response){if(response.data.status==0){_this.setVisible(false);_this.props.showNotification('添加成功');_this.props.addTeacherSuccess&&_this.props.addTeacherSuccess(params);}}).catch(function(error){console.log(error);});};_this.onOk=function(){_this.onSendOk();};_this.onCheckBoxChange=function(checkBoxValues){_this.setState({checkBoxValues:checkBoxValues});};_this.handleInfiniteOnLoad=function(){_this.fetchMemberList(_this.state.page+1);};_this.onSearch=function(){_this.fetchMemberList(1);};_this.handleGradationGroupChange=function(value){_this.setState({graduationGroup:value});};_this.handleCourseGroupChange=function(value){_this.setState({courseGroup:value});};_this.onOrgNameChange=function(value){// console.log('school_name: ', value)
_this.setState({school_name:value});};_this.hasGraduationModule=function(){var course_modules=_this.props.course_modules;var result=course_modules&&course_modules.filter(function(item){return item.type=='graduation';});return result&&result.length>0;};_this.state={school_names:[],checkBoxValues:[],candidates:[],hasMore:true,loading:false,page:1};return _this;}_createClass(AddTeacherModal,[{key:"componentDidMount",value:function componentDidMount(){}},{key:"render",value:function render(){var _this2=this;var _state=this.state,candidates=_state.candidates,checkBoxValues=_state.checkBoxValues,loading=_state.loading,hasMore=_state.hasMore,name=_state.name,school_name=_state.school_name,school_names=_state.school_names,graduationGroup=_state.graduationGroup,graduation_groups=_state.graduation_groups,courseGroup=_state.courseGroup,course_groups=_state.course_groups;var moduleName=this.props.moduleName;return __WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14__common_ModalWrapper__["a" /* default */],Object.assign({ref:"modalWrapper",width:"700px",title:"\u6DFB\u52A0"+moduleName},this.props,{onOk:this.onOk,className:"addTeacherModal courseForm"}),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_19__AddGraduationGroupModal__["a" /* default */],Object.assign({ref:"addGraduationGroupModal"},this.props,{onOk:this.onAddGraduationGroupOk})),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("style",null,"\n        .demo-loading-container {\n          position: absolute;\n          bottom: 210px;\n          width: 82%;\n          text-align: center;\n        }\n        .df {\n          display: flex;\n          align-items: baseline;\n          margin: 12px 0;\n        }\n        .firstLabel {\n          flex: 0 0 60px;\n        }\n        .df span.label {\n          margin-right: 8px;\n          text-align: left;\n        }\n        .df .ant-input-affix-wrapper {\n          width: 32%;\n        }\n\n        .addTeacherModal label.task-hide {\n          width: 100%;\n        }\n        "),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{className:"df"},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:"firstLabel label",style:{flex:'0 0 40px'}},"\u59D3\u540D:"),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_antd_lib_input___default.a,{allowClear:true,placeholder:"\u8BF7\u8F93\u5165\u771F\u5B9E\u59D3\u540D",value:name,onChange:function onChange(e){_this2.setState({name:e.target.value});},style:{width:'200px',marginRight:'18px'}}),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:"label",style:{minWidth:'36px',flex:'0 0 40px'}},"\u5355\u4F4D:"),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_20__coursesPublic_form_SchoolSelect__["a" /* default */],{value:school_name,onChange:this.onOrgNameChange}),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("a",{className:"task-btn task-btn-orange",onClick:function onClick(){return _this2.fetchMemberList(1);},style:{height:'30px',lineHeight:'30px',marginLeft:'10px',width:'70px'}},"\u641C\u7D22")),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("p",{className:"clearfix mb2",style:{margin:'0px 20px 6px'}},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_antd_lib_checkbox___default.a,{className:"fl",style:{visibility:'hidden'}}),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:"fl task-hide with25",style:{"maxWidth":"208px;"}},'姓名'),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:"fl task-hide with25",style:{"maxWidth":"208px;"}},'昵称'),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:"fl task-hide with35",style:{"maxWidth":"208px;"}},'单位'),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:"fl task-hide with10",style:{"maxWidth":"48px"}},'')),loading||candidates.length?__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",null,__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{className:"edu-back-skyblue padding10-15",style:{"height":"300px",overflowY:"scroll",overflowAnchor:'none'}},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_infinite_scroller___default.a,{threshold:10,initialLoad:false,pageStart:0,loadMore:this.handleInfiniteOnLoad,hasMore:!loading&&hasMore,useWindow:false},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_antd_lib_checkbox___default.a.Group,{style:{width:'100%'},onChange:this.onCheckBoxChange,value:checkBoxValues},candidates&&candidates.map(function(candidate){return __WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("p",{className:"clearfix mb7",key:candidate.id},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_antd_lib_checkbox___default.a,{className:"fl",value:candidate.id,key:candidate.id,disabled:candidate.added}),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:"fl task-hide with25 ml5",style:{width:'145px',height:"20px"}},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("a",{href:"/users/"+candidate.login,target:"_blank",title:candidate.name},candidate.name)),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:"fl task-hide with25",title:candidate.nickname,style:{width:'145px',height:"20px"}},candidate.nickname),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:"fl task-hide with35",title:candidate.school_name,style:{width:'145px',height:"20px"}},candidate.school_name),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:"fl task-hide with10 color-blue",style:{"maxWidth":"48px;"}},candidate.added?'已加入':''));})),loading&&hasMore&&__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{className:"demo-loading-container"},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd_lib_spin___default.a,null))))):__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_18__coursesPublic_NoneData__["a" /* default */],null),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{className:"df"},this.hasGraduationModule()&&__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{className:"df",style:{marginTop:'24px'}},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:"firstLabel label",style:{flex:'0 0 96px'}},"\u6DFB\u52A0\u81F3\u7B54\u8FA9\u7EC4:"),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11_antd_lib_select___default.a,{style:{width:218,marginRight:'18px'},onChange:this.handleGradationGroupChange,value:graduationGroup,dropdownRender:function dropdownRender(menu){return __WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",null,menu,__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_antd_lib_divider___default.a,{style:{margin:'4px 0'}}),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{style:{padding:'8px',cursor:'pointer'},onMouseDown:function onMouseDown(){debugger;_this2.refs['addGraduationGroupModal'].setVisible(true);}},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_icon___default.a,{type:"plus"})," \u6DFB\u52A0\u7B54\u8FA9\u7EC4"));}},graduation_groups&&graduation_groups.map(function(item){return __WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(Option,{value:item.id},item.name);}))),course_groups&&!!course_groups.length&&__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("div",{className:"df"},__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement("span",{className:"firstLabel label"},"\u7BA1\u7406\u6743\u9650:"),__WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11_antd_lib_select___default.a,{style:{width:218},onChange:this.handleCourseGroupChange,value:courseGroup},course_groups&&course_groups.map(function(item){return __WEBPACK_IMPORTED_MODULE_12_react___default.a.createElement(Option,{value:item.id},item.name);})))));}}]);return AddTeacherModal;}(__WEBPACK_IMPORTED_MODULE_12_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (AddTeacherModal);

/***/ }),

/***/ 2013:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2014);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(318)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 2014:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(317)(true);
// imports


// module
exports.push([module.i, ".droppableul::-webkit-scrollbar{width:8px;height:8px}.droppableul::-webkit-scrollbar-thumb{background-color:#e3ebf4;-webkit-box-shadow:0 0 #000;box-shadow:0 0 #000}\n/*!*鼠标悬浮在该类指向的控件上时滑块的样式*!*/\n/*!*鼠标悬浮在滑块上时滑块的样式*!*/.droppableul::-webkit-scrollbar-track{border-radius:3px;-webkit-box-shadow:inset 0 0 6px transparent;background-color:#fff}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/src/modules/courses/coursesDetail/MainLeftNav.css"],"names":[],"mappings":"AACA,gCACI,UAAW,AACX,UAAY,CACf,AAGD,sCACI,yBAA0B,AAC1B,4BAAkC,AAC1B,mBAA0B,CACrC;AACD,2BAA2B;AAO3B,sBAAsB,AAQtB,sCACI,kBAAkB,AAClB,6CAAmD,AACnD,qBAAwB,CAC3B","file":"MainLeftNav.css","sourcesContent":["\n.droppableul::-webkit-scrollbar {\n    width: 8px;\n    height: 8px;\n}\n/*正常情况下滑块的样式*/\n\n.droppableul::-webkit-scrollbar-thumb {\n    background-color: #E3EBF4;\n    -webkit-box-shadow: 0px 0px black;\n            box-shadow: 0px 0px black;\n}\n/*!*鼠标悬浮在该类指向的控件上时滑块的样式*!*/\n\n/*.droppableul:hover::-webkit-scrollbar-thumb {*/\n    /*background-color: rgba(227,235,244);*/\n    /*border-radius: 10px;*/\n    /*-webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, .1);*/\n/*}*/\n/*!*鼠标悬浮在滑块上时滑块的样式*!*/\n\n/*.droppableul::-webkit-scrollbar-thumb:hover {*/\n    /*background-color: rgba(227,235,244,.4);*/\n    /*-webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, .1);*/\n/*}*/\n/*正常时候的主干部分*/\n\n.droppableul::-webkit-scrollbar-track {\n    border-radius:3px;\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);\n    background-color: white;\n}\n/*鼠标悬浮在滚动条上的主干部分*/\n\n/*.droppableul::-webkit-scrollbar-track:hover {*/\n    /*-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .4);*/\n    /*background-color: rgba(0, 0, 0, .01);*/\n/*}*/"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 2015:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_modal_style_css__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_modal_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_modal_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_modal__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_checkbox_style_css__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_checkbox_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_antd_lib_checkbox_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_checkbox__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_checkbox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_antd_lib_checkbox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_tree_style_css__ = __webpack_require__(2016);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_tree_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_antd_lib_tree_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_tree__ = __webpack_require__(2019);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_antd_lib_tree___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_antd_lib_tree__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__chapterupdate_css__ = __webpack_require__(2028);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__chapterupdate_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__chapterupdate_css__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var TreeNode=__WEBPACK_IMPORTED_MODULE_5_antd_lib_tree___default.a.TreeNode;//立即章节选择
var treeData=[{title:'0-0',key:'0-0',children:[{title:'0-0-0',key:'0-0-0',children:[{title:'0-0-0-0',key:'0-0-0-0'},{title:'0-0-0-1',key:'0-0-0-1'},{title:'0-0-0-2',key:'0-0-0-2'}]},{title:'0-0-1',key:'0-0-1',children:[{title:'0-0-1-0',key:'0-0-1-0'},{title:'0-0-1-1',key:'0-0-1-1'},{title:'0-0-1-2',key:'0-0-1-2'}]},{title:'0-0-2',key:'0-0-2'}]},{title:'0-1',key:'0-1',children:[{title:'0-1-0-0',key:'0-1-0-0'},{title:'0-1-0-1',key:'0-1-0-1'},{title:'0-1-0-2',key:'0-1-0-2'},{title:'0-1-0-3',key:'0-1-0-3'},{title:'0-1-0-4',key:'0-1-0-4'},{title:'0-1-0-5',key:'0-1-0-5'},{title:'0-1-0-6',key:'0-1-0-6'},{title:'0-1-0-7',key:'0-1-0-7'},{title:'0-1-0-8',key:'0-1-0-8'},{title:'0-1-0-9',key:'0-1-0-9'},{title:'0-1-0-10',key:'0-1-0-10'},{title:'0-1-0-11',key:'0-1-0-11'},{title:'0-1-0-12',key:'0-1-0-12'},{title:'0-1-0-13',key:'0-1-0-13'},{title:'0-1-0-14',key:'0-1-0-15'},{title:'0-1-0-16',key:'0-1-0-16'},{title:'0-1-0-17',key:'0-1-0-17'},{title:'0-1-0-18',key:'0-1-0-18'}]},{title:'0-2',key:'0-2'}];var MyEduChapterupdate=function(_Component){_inherits(MyEduChapterupdate,_Component);//树状图
function MyEduChapterupdate(props){_classCallCheck(this,MyEduChapterupdate);var _this=_possibleConstructorReturn(this,(MyEduChapterupdate.__proto__||Object.getPrototypeOf(MyEduChapterupdate)).call(this,props));_this.modalCancel=function(){//外部传进来的参数
_this.props.setchapterupdatefalse();};_this.setDownload=function(){//外部传进来的参数
_this.props.setchapterupdatefalse();};_this.onChange=function(e){_this.setState({myeduchecked:e.target.checked});// console.log(`checked = ${e.target.checked}`);
if(e.target.checked===true){_this.setState({checkedKeys:['0-0','0-1','0-2']});}else{_this.setState({checkedKeys:[]});}};_this.onExpand=function(expandedKeys){console.log('onExpand',expandedKeys);// if not set autoExpandParent to false, if children expanded, parent can not collapse.
// or, you can remove all expanded children keys.
_this.setState({expandedKeys:expandedKeys,autoExpandParent:false});};_this.onCheck=function(checkedKeys){console.log('onCheck',checkedKeys);_this.setState({checkedKeys:checkedKeys});};_this.onSelect=function(selectedKeys,info){console.log('onSelect',info);_this.setState({selectedKeys:selectedKeys});};_this.renderTreeNodes=function(data){return data.map(function(item){if(item.children){return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(TreeNode,{title:item.title,key:item.key,dataRef:item},_this.renderTreeNodes(item.children));}return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(TreeNode,Object.assign({key:item.key},item));});};_this.state={myeduchecked:false,expandedKeys:['0-0-0','0-0-1'],autoExpandParent:true,checkedKeys:[],selectedKeys:[]};return _this;}//取消按钮
//确认按钮
//点击了选项
_createClass(MyEduChapterupdate,[{key:'render',value:function render(){var _this2=this;return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_modal___default.a,{keyboard:false,closable:false,footer:null,destroyOnClose:true,title:"章节编辑",centered:true,visible:this.props.chapterupdate,width:'600px',heigth:'658px'},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:'educouddiv',style:{heigth:"578px",width:"100%"}},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{style:{width:"100%"},className:'private-listtwo heigth459px'},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('style',null,'\n\t\t\t\t\t\t\t\tspan {\n\t\t\t\t\t\t\t\t  max-width: 500px;\n\t\t\t\t\t\t\t\t\toverflow:hidden;\n\t\t\t\t\t\t\t\t\ttext-overflow:ellipsis;\n\t\t\t\t\t\t\t\t\twhite-space:nowrap;\n\t\t\t\t\t\t\t\t\tcursor: default;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t'),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_antd_lib_tree___default.a,{checkable:true,onExpand:this.onExpand,expandedKeys:this.state.expandedKeys,autoExpandParent:this.state.autoExpandParent,onCheck:this.onCheck,checkedKeys:this.state.checkedKeys,onSelect:this.onSelect,selectedKeys:this.state.selectedKeys},this.renderTreeNodes(treeData)))),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:'yslcheckbox mt40'},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:'mr15'},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_antd_lib_checkbox___default.a,{onChange:function onChange(e){return _this2.onChange(e);},checked:this.state.myeduchecked})),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{style:{width:"100%"}},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span',{style:{color:"#999999"}},'\u5DF2\u9009\u62E9'),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span',{style:{color:"#E65656"}},'3'),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span',{style:{color:"#999999"}},' \u4E2A\u7AE0\u8282 '),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span',{style:{color:"#E65656"}},'5'),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span',{style:{color:"#999999"}},'\u4E2A\u5B9E\u8BAD')),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:'yslcheckbox2',style:{width:"100%"}},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span',{className:'font-14',style:{color:"#A3A3A3"}},'\u52FE\u9009\u5219\u5728\u8BFE\u5802\u4E2D\u663E\u793A\uFF0C\u5426\u5219\u4E0D\u663E\u793A'))),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:'clearfix edu-txt-center pt37 pb28'},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('a',{className:'task-btn mr30',style:{width:"100px",heigth:"38px"},onClick:function onClick(){return _this2.modalCancel();}},'\u53D6\u6D88'),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('a',{className:'task-btn task-btn-orange',style:{width:"100px",heigth:"38px"},onClick:function onClick(){return _this2.setDownload();}},'\u786E\u5B9A')));}}]);return MyEduChapterupdate;}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"]);/* unused harmony default export */ var _unused_webpack_default_export = (MyEduChapterupdate);

/***/ }),

/***/ 2016:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(31);

__webpack_require__(2017);
//# sourceMappingURL=css.js.map


/***/ }),

/***/ 2017:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2018);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(318)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 2018:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(317)(true);
// imports


// module
exports.push([module.i, "@-webkit-keyframes antCheckboxEffect{0%{-webkit-transform:scale(1);transform:scale(1);opacity:.5}to{-webkit-transform:scale(1.6);transform:scale(1.6);opacity:0}}@keyframes antCheckboxEffect{0%{-webkit-transform:scale(1);transform:scale(1);opacity:.5}to{-webkit-transform:scale(1.6);transform:scale(1.6);opacity:0}}.ant-tree.ant-tree-directory{position:relative}.ant-tree.ant-tree-directory .ant-tree-child-tree>li span.ant-tree-switcher,.ant-tree.ant-tree-directory>li span.ant-tree-switcher{position:relative;z-index:1}.ant-tree.ant-tree-directory .ant-tree-child-tree>li span.ant-tree-switcher.ant-tree-switcher-noop,.ant-tree.ant-tree-directory>li span.ant-tree-switcher.ant-tree-switcher-noop{pointer-events:none}.ant-tree.ant-tree-directory .ant-tree-child-tree>li span.ant-tree-checkbox,.ant-tree.ant-tree-directory>li span.ant-tree-checkbox{position:relative;z-index:1}.ant-tree.ant-tree-directory .ant-tree-child-tree>li span.ant-tree-node-content-wrapper,.ant-tree.ant-tree-directory>li span.ant-tree-node-content-wrapper{border-radius:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ant-tree.ant-tree-directory .ant-tree-child-tree>li span.ant-tree-node-content-wrapper:hover,.ant-tree.ant-tree-directory>li span.ant-tree-node-content-wrapper:hover{background:transparent}.ant-tree.ant-tree-directory .ant-tree-child-tree>li span.ant-tree-node-content-wrapper:hover:before,.ant-tree.ant-tree-directory>li span.ant-tree-node-content-wrapper:hover:before{background:#e6f7ff}.ant-tree.ant-tree-directory .ant-tree-child-tree>li span.ant-tree-node-content-wrapper.ant-tree-node-selected,.ant-tree.ant-tree-directory>li span.ant-tree-node-content-wrapper.ant-tree-node-selected{color:#fff;background:transparent}.ant-tree.ant-tree-directory .ant-tree-child-tree>li span.ant-tree-node-content-wrapper:before,.ant-tree.ant-tree-directory>li span.ant-tree-node-content-wrapper:before{position:absolute;right:0;left:0;height:24px;-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s;content:\"\"}.ant-tree.ant-tree-directory .ant-tree-child-tree>li span.ant-tree-node-content-wrapper>span,.ant-tree.ant-tree-directory>li span.ant-tree-node-content-wrapper>span{position:relative;z-index:1}.ant-tree.ant-tree-directory .ant-tree-child-tree>li.ant-tree-treenode-selected>span.ant-tree-switcher,.ant-tree.ant-tree-directory>li.ant-tree-treenode-selected>span.ant-tree-switcher{color:#fff}.ant-tree.ant-tree-directory .ant-tree-child-tree>li.ant-tree-treenode-selected>span.ant-tree-checkbox .ant-tree-checkbox-inner,.ant-tree.ant-tree-directory>li.ant-tree-treenode-selected>span.ant-tree-checkbox .ant-tree-checkbox-inner{border-color:#1890ff}.ant-tree.ant-tree-directory .ant-tree-child-tree>li.ant-tree-treenode-selected>span.ant-tree-checkbox.ant-tree-checkbox-checked:after,.ant-tree.ant-tree-directory>li.ant-tree-treenode-selected>span.ant-tree-checkbox.ant-tree-checkbox-checked:after{border-color:#fff}.ant-tree.ant-tree-directory .ant-tree-child-tree>li.ant-tree-treenode-selected>span.ant-tree-checkbox.ant-tree-checkbox-checked .ant-tree-checkbox-inner,.ant-tree.ant-tree-directory>li.ant-tree-treenode-selected>span.ant-tree-checkbox.ant-tree-checkbox-checked .ant-tree-checkbox-inner{background:#fff}.ant-tree.ant-tree-directory .ant-tree-child-tree>li.ant-tree-treenode-selected>span.ant-tree-checkbox.ant-tree-checkbox-checked .ant-tree-checkbox-inner:after,.ant-tree.ant-tree-directory>li.ant-tree-treenode-selected>span.ant-tree-checkbox.ant-tree-checkbox-checked .ant-tree-checkbox-inner:after{border-color:#1890ff}.ant-tree.ant-tree-directory .ant-tree-child-tree>li.ant-tree-treenode-selected>span.ant-tree-node-content-wrapper:before,.ant-tree.ant-tree-directory>li.ant-tree-treenode-selected>span.ant-tree-node-content-wrapper:before{background:#1890ff}.ant-tree-checkbox{-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0;color:rgba(0,0,0,.65);font-size:14px;font-variant:tabular-nums;line-height:1.5;list-style:none;-webkit-font-feature-settings:\"tnum\";font-feature-settings:\"tnum\";position:relative;top:-.09em;display:inline-block;line-height:1;white-space:nowrap;vertical-align:middle;outline:none;cursor:pointer}.ant-tree-checkbox-input:focus+.ant-tree-checkbox-inner,.ant-tree-checkbox-wrapper:hover .ant-tree-checkbox-inner,.ant-tree-checkbox:hover .ant-tree-checkbox-inner{border-color:#1890ff}.ant-tree-checkbox-checked:after{top:0;height:100%;border:1px solid #1890ff;border-radius:2px;visibility:hidden;-webkit-animation:antCheckboxEffect .36s ease-in-out;animation:antCheckboxEffect .36s ease-in-out;-webkit-animation-fill-mode:backwards;animation-fill-mode:backwards;content:\"\"}.ant-tree-checkbox-wrapper:hover .ant-tree-checkbox:after,.ant-tree-checkbox:hover:after{visibility:visible}.ant-tree-checkbox-inner{position:relative;top:0;left:0;display:block;width:16px;height:16px;background-color:#fff;border:1px solid #d9d9d9;border-radius:2px;border-collapse:separate;-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s}.ant-tree-checkbox-inner:after{position:absolute;top:50%;left:22%;display:table;width:5.71428571px;height:9.14285714px;border:2px solid #fff;border-top:0;border-left:0;-webkit-transform:rotate(45deg) scale(0) translate(-50%,-50%);-ms-transform:rotate(45deg) scale(0) translate(-50%,-50%);transform:rotate(45deg) scale(0) translate(-50%,-50%);opacity:0;-webkit-transition:all .1s cubic-bezier(.71,-.46,.88,.6),opacity .1s;-o-transition:all .1s cubic-bezier(.71,-.46,.88,.6),opacity .1s;transition:all .1s cubic-bezier(.71,-.46,.88,.6),opacity .1s;content:\" \"}.ant-tree-checkbox-input{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;width:100%;height:100%;cursor:pointer;opacity:0}.ant-tree-checkbox-checked .ant-tree-checkbox-inner:after{position:absolute;display:table;border:2px solid #fff;border-top:0;border-left:0;-webkit-transform:rotate(45deg) scale(1) translate(-50%,-50%);-ms-transform:rotate(45deg) scale(1) translate(-50%,-50%);transform:rotate(45deg) scale(1) translate(-50%,-50%);opacity:1;-webkit-transition:all .2s cubic-bezier(.12,.4,.29,1.46) .1s;-o-transition:all .2s cubic-bezier(.12,.4,.29,1.46) .1s;transition:all .2s cubic-bezier(.12,.4,.29,1.46) .1s;content:\" \"}.ant-tree-checkbox-checked .ant-tree-checkbox-inner{background-color:#1890ff;border-color:#1890ff}.ant-tree-checkbox-disabled{cursor:not-allowed}.ant-tree-checkbox-disabled.ant-tree-checkbox-checked .ant-tree-checkbox-inner:after{border-color:rgba(0,0,0,.25);-webkit-animation-name:none;animation-name:none}.ant-tree-checkbox-disabled .ant-tree-checkbox-input{cursor:not-allowed}.ant-tree-checkbox-disabled .ant-tree-checkbox-inner{background-color:#f5f5f5;border-color:#d9d9d9!important}.ant-tree-checkbox-disabled .ant-tree-checkbox-inner:after{border-color:#f5f5f5;border-collapse:separate;-webkit-animation-name:none;animation-name:none}.ant-tree-checkbox-disabled+span{color:rgba(0,0,0,.25);cursor:not-allowed}.ant-tree-checkbox-disabled:hover:after,.ant-tree-checkbox-wrapper:hover .ant-tree-checkbox-disabled:after{visibility:hidden}.ant-tree-checkbox-wrapper{-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0;color:rgba(0,0,0,.65);font-size:14px;font-variant:tabular-nums;line-height:1.5;list-style:none;-webkit-font-feature-settings:\"tnum\";font-feature-settings:\"tnum\";display:inline-block;line-height:unset;cursor:pointer}.ant-tree-checkbox-wrapper.ant-tree-checkbox-wrapper-disabled{cursor:not-allowed}.ant-tree-checkbox-wrapper+.ant-tree-checkbox-wrapper{margin-left:8px}.ant-tree-checkbox+span{padding-right:8px;padding-left:8px}.ant-tree-checkbox-group{-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0;color:rgba(0,0,0,.65);font-size:14px;font-variant:tabular-nums;line-height:1.5;list-style:none;-webkit-font-feature-settings:\"tnum\";font-feature-settings:\"tnum\";display:inline-block}.ant-tree-checkbox-group-item{display:inline-block;margin-right:8px}.ant-tree-checkbox-group-item:last-child{margin-right:0}.ant-tree-checkbox-group-item+.ant-tree-checkbox-group-item{margin-left:0}.ant-tree-checkbox-indeterminate .ant-tree-checkbox-inner{background-color:#fff;border-color:#d9d9d9}.ant-tree-checkbox-indeterminate .ant-tree-checkbox-inner:after{top:50%;left:50%;width:8px;height:8px;background-color:#1890ff;border:0;-webkit-transform:translate(-50%,-50%) scale(1);-ms-transform:translate(-50%,-50%) scale(1);transform:translate(-50%,-50%) scale(1);opacity:1;content:\" \"}.ant-tree-checkbox-indeterminate.ant-tree-checkbox-disabled .ant-tree-checkbox-inner:after{background-color:rgba(0,0,0,.25);border-color:rgba(0,0,0,.25)}.ant-tree{-webkit-box-sizing:border-box;box-sizing:border-box;color:rgba(0,0,0,.65);font-size:14px;font-variant:tabular-nums;line-height:1.5;list-style:none;-webkit-font-feature-settings:\"tnum\";font-feature-settings:\"tnum\";margin:0;padding:0}.ant-tree-checkbox-checked:after{position:absolute;top:16.67%;left:0;width:100%;height:66.67%}.ant-tree ol,.ant-tree ul{margin:0;padding:0;list-style:none}.ant-tree li{margin:0;padding:4px 0;white-space:nowrap;list-style:none;outline:0}.ant-tree li span[draggable=true],.ant-tree li span[draggable]{line-height:20px;border-top:2px solid transparent;border-bottom:2px solid transparent;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-khtml-user-drag:element;-webkit-user-drag:element}.ant-tree li.drag-over>span[draggable]{color:#fff;background-color:#1890ff;opacity:.8}.ant-tree li.drag-over-gap-top>span[draggable]{border-top-color:#1890ff}.ant-tree li.drag-over-gap-bottom>span[draggable]{border-bottom-color:#1890ff}.ant-tree li.filter-node>span{color:#f5222d!important;font-weight:500!important}.ant-tree li.ant-tree-treenode-loading span.ant-tree-switcher.ant-tree-switcher_close .ant-tree-switcher-loading-icon,.ant-tree li.ant-tree-treenode-loading span.ant-tree-switcher.ant-tree-switcher_open .ant-tree-switcher-loading-icon{position:absolute;left:0;display:inline-block;width:24px;height:24px;color:#1890ff;font-size:14px;-webkit-transform:none;-ms-transform:none;transform:none}.ant-tree li.ant-tree-treenode-loading span.ant-tree-switcher.ant-tree-switcher_close .ant-tree-switcher-loading-icon svg,.ant-tree li.ant-tree-treenode-loading span.ant-tree-switcher.ant-tree-switcher_open .ant-tree-switcher-loading-icon svg{position:absolute;top:0;right:0;bottom:0;left:0;margin:auto}:root .ant-tree li.ant-tree-treenode-loading span.ant-tree-switcher.ant-tree-switcher_close:after,:root .ant-tree li.ant-tree-treenode-loading span.ant-tree-switcher.ant-tree-switcher_open:after{opacity:0}.ant-tree li ul{margin:0;padding:0 0 0 18px}.ant-tree li .ant-tree-node-content-wrapper{display:inline-block;height:24px;margin:0;padding:0 5px;color:rgba(0,0,0,.65);line-height:24px;text-decoration:none;vertical-align:top;border-radius:2px;cursor:pointer;-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s}.ant-tree li .ant-tree-node-content-wrapper:hover{background-color:#e6f7ff}.ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected{background-color:#bae7ff}.ant-tree li span.ant-tree-checkbox{top:auto;height:24px;margin:0 4px 0 2px;padding:4px 0}.ant-tree li span.ant-tree-iconEle,.ant-tree li span.ant-tree-switcher{display:inline-block;width:24px;height:24px;margin:0;line-height:24px;text-align:center;vertical-align:top;border:0 none;outline:none;cursor:pointer}.ant-tree li span.ant-tree-iconEle:empty{display:none}.ant-tree li span.ant-tree-switcher{position:relative}.ant-tree li span.ant-tree-switcher.ant-tree-switcher-noop{cursor:default}.ant-tree li span.ant-tree-switcher.ant-tree-switcher_open .ant-select-switcher-icon,.ant-tree li span.ant-tree-switcher.ant-tree-switcher_open .ant-tree-switcher-icon{font-size:12px;font-size:10px\\9;-webkit-transform:scale(.83333333) rotate(0deg);-ms-transform:scale(.83333333) rotate(0deg);transform:scale(.83333333) rotate(0deg);display:inline-block;font-weight:700}:root .ant-tree li span.ant-tree-switcher.ant-tree-switcher_open .ant-select-switcher-icon,:root .ant-tree li span.ant-tree-switcher.ant-tree-switcher_open .ant-tree-switcher-icon{font-size:12px}.ant-tree li span.ant-tree-switcher.ant-tree-switcher_open .ant-select-switcher-icon svg,.ant-tree li span.ant-tree-switcher.ant-tree-switcher_open .ant-tree-switcher-icon svg{-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;-o-transition:transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.ant-tree li span.ant-tree-switcher.ant-tree-switcher_close .ant-select-switcher-icon,.ant-tree li span.ant-tree-switcher.ant-tree-switcher_close .ant-tree-switcher-icon{font-size:12px;font-size:10px\\9;-webkit-transform:scale(.83333333) rotate(0deg);-ms-transform:scale(.83333333) rotate(0deg);transform:scale(.83333333) rotate(0deg);display:inline-block;font-weight:700}:root .ant-tree li span.ant-tree-switcher.ant-tree-switcher_close .ant-select-switcher-icon,:root .ant-tree li span.ant-tree-switcher.ant-tree-switcher_close .ant-tree-switcher-icon{font-size:12px}.ant-tree li span.ant-tree-switcher.ant-tree-switcher_close .ant-select-switcher-icon svg,.ant-tree li span.ant-tree-switcher.ant-tree-switcher_close .ant-tree-switcher-icon svg{-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;-o-transition:transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.ant-tree li span.ant-tree-switcher.ant-tree-switcher_close .ant-tree-switcher-icon svg{-webkit-transform:rotate(-90deg);-ms-transform:rotate(-90deg);transform:rotate(-90deg)}.ant-tree li:last-child>span.ant-tree-iconEle:before,.ant-tree li:last-child>span.ant-tree-switcher:before{display:none}.ant-tree>li:first-child{padding-top:7px}.ant-tree>li:last-child{padding-bottom:7px}.ant-tree-child-tree>li:first-child{padding-top:8px}.ant-tree-child-tree>li:last-child{padding-bottom:0}li.ant-tree-treenode-disabled>.ant-tree-node-content-wrapper,li.ant-tree-treenode-disabled>.ant-tree-node-content-wrapper span,li.ant-tree-treenode-disabled>span:not(.ant-tree-switcher){color:rgba(0,0,0,.25);cursor:not-allowed}li.ant-tree-treenode-disabled>.ant-tree-node-content-wrapper:hover{background:transparent}.ant-tree-icon__close,.ant-tree-icon__open{margin-right:2px;vertical-align:top}.ant-tree.ant-tree-show-line li{position:relative}.ant-tree.ant-tree-show-line li span.ant-tree-switcher{color:rgba(0,0,0,.45);background:#fff}.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher-noop .ant-select-switcher-icon,.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher-noop .ant-tree-switcher-icon{display:inline-block;font-weight:400;font-size:12px}.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher-noop .ant-select-switcher-icon svg,.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher-noop .ant-tree-switcher-icon svg{-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;-o-transition:transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher_open .ant-select-switcher-icon,.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher_open .ant-tree-switcher-icon{display:inline-block;font-weight:400;font-size:12px}.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher_open .ant-select-switcher-icon svg,.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher_open .ant-tree-switcher-icon svg{-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;-o-transition:transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher_close .ant-select-switcher-icon,.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher_close .ant-tree-switcher-icon{display:inline-block;font-weight:400;font-size:12px}.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher_close .ant-select-switcher-icon svg,.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher_close .ant-tree-switcher-icon svg{-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;-o-transition:transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.ant-tree.ant-tree-show-line li:not(:last-child):before{position:absolute;left:12px;width:1px;height:100%;height:calc(100% - 22px);margin:22px 0 0;border-left:1px solid #d9d9d9;content:\" \"}.ant-tree.ant-tree-icon-hide .ant-tree-treenode-loading .ant-tree-iconEle{display:none}.ant-tree.ant-tree-block-node li .ant-tree-node-content-wrapper{width:calc(100% - 24px)}.ant-tree.ant-tree-block-node li span.ant-tree-checkbox+.ant-tree-node-content-wrapper{width:calc(100% - 46px)}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/node_modules/antd/lib/tree/style/index.css"],"names":[],"mappings":"AAIA,qCACE,GACE,2BAA4B,AACpB,mBAAoB,AAC5B,UAAa,CACd,AACD,GACE,6BAA8B,AACtB,qBAAsB,AAC9B,SAAW,CACZ,CACF,AACD,6BACE,GACE,2BAA4B,AACpB,mBAAoB,AAC5B,UAAa,CACd,AACD,GACE,6BAA8B,AACtB,qBAAsB,AAC9B,SAAW,CACZ,CACF,AACD,6BACE,iBAAmB,CACpB,AACD,mIAEE,kBAAmB,AACnB,SAAW,CACZ,AACD,iLAEE,mBAAqB,CACtB,AACD,mIAEE,kBAAmB,AACnB,SAAW,CACZ,AACD,2JAEE,gBAAiB,AACjB,yBAA0B,AACvB,sBAAuB,AACtB,qBAAsB,AAClB,gBAAkB,CAC3B,AACD,uKAEE,sBAAwB,CACzB,AACD,qLAEE,kBAAoB,CACrB,AACD,yMAEE,WAAY,AACZ,sBAAwB,CACzB,AACD,yKAEE,kBAAmB,AACnB,QAAS,AACT,OAAQ,AACR,YAAa,AACb,2BAA6B,AAC7B,sBAAwB,AACxB,mBAAqB,AACrB,UAAY,CACb,AACD,qKAEE,kBAAmB,AACnB,SAAW,CACZ,AACD,yLAEE,UAAY,CACb,AACD,2OAEE,oBAAsB,CACvB,AACD,yPAEE,iBAAmB,CACpB,AACD,+RAEE,eAAiB,CAClB,AACD,2SAEE,oBAAsB,CACvB,AACD,+NAEE,kBAAoB,CACrB,AACD,mBACE,8BAA+B,AACvB,sBAAuB,AAC/B,SAAU,AACV,UAAW,AACX,sBAA2B,AAC3B,eAAgB,AAChB,0BAA2B,AAC3B,gBAAiB,AACjB,gBAAiB,AACjB,qCAAsC,AAC9B,6BAA8B,AACtC,kBAAmB,AACnB,WAAa,AACb,qBAAsB,AACtB,cAAe,AACf,mBAAoB,AACpB,sBAAuB,AACvB,aAAc,AACd,cAAgB,CACjB,AACD,oKAGE,oBAAsB,CACvB,AACD,iCAEE,MAAO,AAGP,YAAa,AACb,yBAA0B,AAC1B,kBAAmB,AACnB,kBAAmB,AACnB,qDAAuD,AAC/C,6CAA+C,AACvD,sCAAuC,AAC/B,8BAA+B,AACvC,UAAY,CACb,AACD,yFAEE,kBAAoB,CACrB,AACD,yBACE,kBAAmB,AACnB,MAAO,AACP,OAAQ,AACR,cAAe,AACf,WAAY,AACZ,YAAa,AACb,sBAAuB,AACvB,yBAA0B,AAC1B,kBAAmB,AACnB,yBAA0B,AAC1B,2BAA6B,AAC7B,sBAAwB,AACxB,kBAAqB,CACtB,AACD,+BACE,kBAAmB,AACnB,QAAS,AACT,SAAU,AACV,cAAe,AACf,mBAAoB,AACpB,oBAAqB,AACrB,sBAAuB,AACvB,aAAc,AACd,cAAe,AACf,8DAAgE,AAC5D,0DAA4D,AACxD,sDAAwD,AAChE,UAAW,AACX,qEAAgF,AAChF,gEAA2E,AAC3E,6DAAwE,AACxE,WAAa,CACd,AACD,yBACE,kBAAmB,AACnB,MAAO,AACP,QAAS,AACT,SAAU,AACV,OAAQ,AACR,UAAW,AACX,WAAY,AACZ,YAAa,AACb,eAAgB,AAChB,SAAW,CACZ,AACD,0DACE,kBAAmB,AACnB,cAAe,AACf,sBAAuB,AACvB,aAAc,AACd,cAAe,AACf,8DAAgE,AAC5D,0DAA4D,AACxD,sDAAwD,AAChE,UAAW,AACX,6DAAsE,AACtE,wDAAiE,AACjE,qDAA8D,AAC9D,WAAa,CACd,AACD,oDACE,yBAA0B,AAC1B,oBAAsB,CACvB,AACD,4BACE,kBAAoB,CACrB,AACD,qFACE,6BAAkC,AAClC,4BAA6B,AACrB,mBAAqB,CAC9B,AACD,qDACE,kBAAoB,CACrB,AACD,qDACE,yBAA0B,AAC1B,8BAAiC,CAClC,AACD,2DACE,qBAAsB,AACtB,yBAA0B,AAC1B,4BAA6B,AACrB,mBAAqB,CAC9B,AACD,iCACE,sBAA2B,AAC3B,kBAAoB,CACrB,AACD,2GAEE,iBAAmB,CACpB,AACD,2BACE,8BAA+B,AACvB,sBAAuB,AAC/B,SAAU,AACV,UAAW,AACX,sBAA2B,AAC3B,eAAgB,AAChB,0BAA2B,AAC3B,gBAAiB,AACjB,gBAAiB,AACjB,qCAAsC,AAC9B,6BAA8B,AACtC,qBAAsB,AACtB,kBAAmB,AACnB,cAAgB,CACjB,AACD,8DACE,kBAAoB,CACrB,AACD,sDACE,eAAiB,CAClB,AACD,wBACE,kBAAmB,AACnB,gBAAkB,CACnB,AACD,yBACE,8BAA+B,AACvB,sBAAuB,AAC/B,SAAU,AACV,UAAW,AACX,sBAA2B,AAC3B,eAAgB,AAChB,0BAA2B,AAC3B,gBAAiB,AACjB,gBAAiB,AACjB,qCAAsC,AAC9B,6BAA8B,AACtC,oBAAsB,CACvB,AACD,8BACE,qBAAsB,AACtB,gBAAkB,CACnB,AACD,yCACE,cAAgB,CACjB,AACD,4DACE,aAAe,CAChB,AACD,0DACE,sBAAuB,AACvB,oBAAsB,CACvB,AACD,gEACE,QAAS,AACT,SAAU,AACV,UAAW,AACX,WAAY,AACZ,yBAA0B,AAC1B,SAAU,AACV,gDAAkD,AAC9C,4CAA8C,AAC1C,wCAA0C,AAClD,UAAW,AACX,WAAa,CACd,AACD,2FACE,iCAAsC,AACtC,4BAAkC,CACnC,AACD,UAEE,8BAA+B,AACvB,sBAAuB,AAC/B,sBAA2B,AAC3B,eAAgB,AAChB,0BAA2B,AAC3B,gBAAiB,AACjB,gBAAiB,AACjB,qCAAsC,AAC9B,6BAA8B,AACtC,SAAU,AACV,SAAW,CACZ,AACD,iCACE,kBAAmB,AACnB,WAAY,AACZ,OAAQ,AACR,WAAY,AACZ,aAAe,CAChB,AACD,0BAEE,SAAU,AACV,UAAW,AACX,eAAiB,CAClB,AACD,aACE,SAAU,AACV,cAAe,AACf,mBAAoB,AACpB,gBAAiB,AACjB,SAAW,CACZ,AACD,+DAEE,iBAAkB,AAClB,iCAAkC,AAClC,oCAAqC,AACrC,yBAA0B,AACvB,sBAAuB,AACtB,qBAAsB,AAClB,iBAAkB,AAE1B,yBAA0B,AAC1B,yBAA2B,CAC5B,AACD,uCACE,WAAa,AACb,yBAA0B,AAC1B,UAAa,CACd,AACD,+CACE,wBAA0B,CAC3B,AACD,kDACE,2BAA6B,CAC9B,AACD,8BACE,wBAA0B,AAC1B,yBAA4B,CAC7B,AACD,2OAEE,kBAAmB,AACnB,OAAQ,AACR,qBAAsB,AACtB,WAAY,AACZ,YAAa,AACb,cAAe,AACf,eAAgB,AAChB,uBAAwB,AACpB,mBAAoB,AAChB,cAAgB,CACzB,AACD,mPAEE,kBAAmB,AACnB,MAAO,AACP,QAAS,AACT,SAAU,AACV,OAAQ,AACR,WAAa,CACd,AACD,mMAEE,SAAW,CACZ,AACD,gBACE,SAAU,AACV,kBAAoB,CACrB,AACD,4CACE,qBAAsB,AACtB,YAAa,AACb,SAAU,AACV,cAAe,AACf,sBAA2B,AAC3B,iBAAkB,AAClB,qBAAsB,AACtB,mBAAoB,AACpB,kBAAmB,AACnB,eAAgB,AAChB,2BAA6B,AAC7B,sBAAwB,AACxB,kBAAqB,CACtB,AACD,kDACE,wBAA0B,CAC3B,AACD,mEACE,wBAA0B,CAC3B,AACD,oCACE,SAAa,AACb,YAAa,AACb,mBAAoB,AACpB,aAAe,CAChB,AACD,uEAEE,qBAAsB,AACtB,WAAY,AACZ,YAAa,AACb,SAAU,AACV,iBAAkB,AAClB,kBAAmB,AACnB,mBAAoB,AACpB,cAAe,AACf,aAAc,AACd,cAAgB,CACjB,AACD,yCACE,YAAc,CACf,AACD,oCACE,iBAAmB,CACpB,AACD,2DACE,cAAgB,CACjB,AACD,wKAEE,eAAgB,AAChB,iBAAmB,AACnB,gDAAkD,AAC9C,4CAA8C,AAC1C,wCAA0C,AAClD,qBAAsB,AACtB,eAAkB,CACnB,AACD,oLAEE,cAAgB,CACjB,AACD,gLAEE,yCAA2C,AAC3C,iCAAmC,AACnC,4BAA8B,AAC9B,yBAA2B,AAC3B,8CAAmD,CACpD,AACD,0KAEE,eAAgB,AAChB,iBAAmB,AACnB,gDAAkD,AAC9C,4CAA8C,AAC1C,wCAA0C,AAClD,qBAAsB,AACtB,eAAkB,CACnB,AACD,sLAEE,cAAgB,CACjB,AACD,kLAEE,yCAA2C,AAC3C,iCAAmC,AACnC,4BAA8B,AAC9B,yBAA2B,AAC3B,8CAAmD,CACpD,AACD,wFACE,iCAAkC,AAC9B,6BAA8B,AAC1B,wBAA0B,CACnC,AACD,2GAEE,YAAc,CACf,AACD,yBACE,eAAiB,CAClB,AACD,wBACE,kBAAoB,CACrB,AACD,oCACE,eAAiB,CAClB,AACD,mCACE,gBAAkB,CACnB,AACD,0LAGE,sBAA2B,AAC3B,kBAAoB,CACrB,AACD,mEACE,sBAAwB,CACzB,AAKD,2CACE,iBAAkB,AAClB,kBAAoB,CACrB,AACD,gCACE,iBAAmB,CACpB,AACD,uDACE,sBAA2B,AAC3B,eAAiB,CAClB,AACD,8MAEE,qBAAsB,AACtB,gBAAoB,AACpB,cAAgB,CACjB,AACD,sNAEE,yCAA2C,AAC3C,iCAAmC,AACnC,4BAA8B,AAC9B,yBAA2B,AAC3B,8CAAmD,CACpD,AACD,8MAEE,qBAAsB,AACtB,gBAAoB,AACpB,cAAgB,CACjB,AACD,sNAEE,yCAA2C,AAC3C,iCAAmC,AACnC,4BAA8B,AAC9B,yBAA2B,AAC3B,8CAAmD,CACpD,AACD,gNAEE,qBAAsB,AACtB,gBAAoB,AACpB,cAAgB,CACjB,AACD,wNAEE,yCAA2C,AAC3C,iCAAmC,AACnC,4BAA8B,AAC9B,yBAA2B,AAC3B,8CAAmD,CACpD,AACD,wDACE,kBAAmB,AACnB,UAAW,AACX,UAAW,AACX,YAAa,AACb,yBAA0B,AAC1B,gBAAiB,AACjB,8BAA+B,AAC/B,WAAa,CACd,AACD,0EACE,YAAc,CACf,AACD,gEACE,uBAAyB,CAC1B,AACD,uFACE,uBAAyB,CAC1B","file":"index.css","sourcesContent":["/* stylelint-disable at-rule-empty-line-before,at-rule-name-space-after,at-rule-no-unknown */\n/* stylelint-disable no-duplicate-selectors */\n/* stylelint-disable */\n/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors,string-no-newline */\n@-webkit-keyframes antCheckboxEffect {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 0.5;\n  }\n  100% {\n    -webkit-transform: scale(1.6);\n            transform: scale(1.6);\n    opacity: 0;\n  }\n}\n@keyframes antCheckboxEffect {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 0.5;\n  }\n  100% {\n    -webkit-transform: scale(1.6);\n            transform: scale(1.6);\n    opacity: 0;\n  }\n}\n.ant-tree.ant-tree-directory {\n  position: relative;\n}\n.ant-tree.ant-tree-directory > li span.ant-tree-switcher,\n.ant-tree.ant-tree-directory .ant-tree-child-tree > li span.ant-tree-switcher {\n  position: relative;\n  z-index: 1;\n}\n.ant-tree.ant-tree-directory > li span.ant-tree-switcher.ant-tree-switcher-noop,\n.ant-tree.ant-tree-directory .ant-tree-child-tree > li span.ant-tree-switcher.ant-tree-switcher-noop {\n  pointer-events: none;\n}\n.ant-tree.ant-tree-directory > li span.ant-tree-checkbox,\n.ant-tree.ant-tree-directory .ant-tree-child-tree > li span.ant-tree-checkbox {\n  position: relative;\n  z-index: 1;\n}\n.ant-tree.ant-tree-directory > li span.ant-tree-node-content-wrapper,\n.ant-tree.ant-tree-directory .ant-tree-child-tree > li span.ant-tree-node-content-wrapper {\n  border-radius: 0;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.ant-tree.ant-tree-directory > li span.ant-tree-node-content-wrapper:hover,\n.ant-tree.ant-tree-directory .ant-tree-child-tree > li span.ant-tree-node-content-wrapper:hover {\n  background: transparent;\n}\n.ant-tree.ant-tree-directory > li span.ant-tree-node-content-wrapper:hover::before,\n.ant-tree.ant-tree-directory .ant-tree-child-tree > li span.ant-tree-node-content-wrapper:hover::before {\n  background: #e6f7ff;\n}\n.ant-tree.ant-tree-directory > li span.ant-tree-node-content-wrapper.ant-tree-node-selected,\n.ant-tree.ant-tree-directory .ant-tree-child-tree > li span.ant-tree-node-content-wrapper.ant-tree-node-selected {\n  color: #fff;\n  background: transparent;\n}\n.ant-tree.ant-tree-directory > li span.ant-tree-node-content-wrapper::before,\n.ant-tree.ant-tree-directory .ant-tree-child-tree > li span.ant-tree-node-content-wrapper::before {\n  position: absolute;\n  right: 0;\n  left: 0;\n  height: 24px;\n  -webkit-transition: all 0.3s;\n  -o-transition: all 0.3s;\n  transition: all 0.3s;\n  content: '';\n}\n.ant-tree.ant-tree-directory > li span.ant-tree-node-content-wrapper > span,\n.ant-tree.ant-tree-directory .ant-tree-child-tree > li span.ant-tree-node-content-wrapper > span {\n  position: relative;\n  z-index: 1;\n}\n.ant-tree.ant-tree-directory > li.ant-tree-treenode-selected > span.ant-tree-switcher,\n.ant-tree.ant-tree-directory .ant-tree-child-tree > li.ant-tree-treenode-selected > span.ant-tree-switcher {\n  color: #fff;\n}\n.ant-tree.ant-tree-directory > li.ant-tree-treenode-selected > span.ant-tree-checkbox .ant-tree-checkbox-inner,\n.ant-tree.ant-tree-directory .ant-tree-child-tree > li.ant-tree-treenode-selected > span.ant-tree-checkbox .ant-tree-checkbox-inner {\n  border-color: #1890ff;\n}\n.ant-tree.ant-tree-directory > li.ant-tree-treenode-selected > span.ant-tree-checkbox.ant-tree-checkbox-checked::after,\n.ant-tree.ant-tree-directory .ant-tree-child-tree > li.ant-tree-treenode-selected > span.ant-tree-checkbox.ant-tree-checkbox-checked::after {\n  border-color: #fff;\n}\n.ant-tree.ant-tree-directory > li.ant-tree-treenode-selected > span.ant-tree-checkbox.ant-tree-checkbox-checked .ant-tree-checkbox-inner,\n.ant-tree.ant-tree-directory .ant-tree-child-tree > li.ant-tree-treenode-selected > span.ant-tree-checkbox.ant-tree-checkbox-checked .ant-tree-checkbox-inner {\n  background: #fff;\n}\n.ant-tree.ant-tree-directory > li.ant-tree-treenode-selected > span.ant-tree-checkbox.ant-tree-checkbox-checked .ant-tree-checkbox-inner::after,\n.ant-tree.ant-tree-directory .ant-tree-child-tree > li.ant-tree-treenode-selected > span.ant-tree-checkbox.ant-tree-checkbox-checked .ant-tree-checkbox-inner::after {\n  border-color: #1890ff;\n}\n.ant-tree.ant-tree-directory > li.ant-tree-treenode-selected > span.ant-tree-node-content-wrapper::before,\n.ant-tree.ant-tree-directory .ant-tree-child-tree > li.ant-tree-treenode-selected > span.ant-tree-node-content-wrapper::before {\n  background: #1890ff;\n}\n.ant-tree-checkbox {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  color: rgba(0, 0, 0, 0.65);\n  font-size: 14px;\n  font-variant: tabular-nums;\n  line-height: 1.5;\n  list-style: none;\n  -webkit-font-feature-settings: 'tnum';\n          font-feature-settings: 'tnum';\n  position: relative;\n  top: -0.09em;\n  display: inline-block;\n  line-height: 1;\n  white-space: nowrap;\n  vertical-align: middle;\n  outline: none;\n  cursor: pointer;\n}\n.ant-tree-checkbox-wrapper:hover .ant-tree-checkbox-inner,\n.ant-tree-checkbox:hover .ant-tree-checkbox-inner,\n.ant-tree-checkbox-input:focus + .ant-tree-checkbox-inner {\n  border-color: #1890ff;\n}\n.ant-tree-checkbox-checked::after {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border: 1px solid #1890ff;\n  border-radius: 2px;\n  visibility: hidden;\n  -webkit-animation: antCheckboxEffect 0.36s ease-in-out;\n          animation: antCheckboxEffect 0.36s ease-in-out;\n  -webkit-animation-fill-mode: backwards;\n          animation-fill-mode: backwards;\n  content: '';\n}\n.ant-tree-checkbox:hover::after,\n.ant-tree-checkbox-wrapper:hover .ant-tree-checkbox::after {\n  visibility: visible;\n}\n.ant-tree-checkbox-inner {\n  position: relative;\n  top: 0;\n  left: 0;\n  display: block;\n  width: 16px;\n  height: 16px;\n  background-color: #fff;\n  border: 1px solid #d9d9d9;\n  border-radius: 2px;\n  border-collapse: separate;\n  -webkit-transition: all 0.3s;\n  -o-transition: all 0.3s;\n  transition: all 0.3s;\n}\n.ant-tree-checkbox-inner::after {\n  position: absolute;\n  top: 50%;\n  left: 22%;\n  display: table;\n  width: 5.71428571px;\n  height: 9.14285714px;\n  border: 2px solid #fff;\n  border-top: 0;\n  border-left: 0;\n  -webkit-transform: rotate(45deg) scale(0) translate(-50%, -50%);\n      -ms-transform: rotate(45deg) scale(0) translate(-50%, -50%);\n          transform: rotate(45deg) scale(0) translate(-50%, -50%);\n  opacity: 0;\n  -webkit-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;\n  -o-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;\n  transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;\n  content: ' ';\n}\n.ant-tree-checkbox-input {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1;\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n  opacity: 0;\n}\n.ant-tree-checkbox-checked .ant-tree-checkbox-inner::after {\n  position: absolute;\n  display: table;\n  border: 2px solid #fff;\n  border-top: 0;\n  border-left: 0;\n  -webkit-transform: rotate(45deg) scale(1) translate(-50%, -50%);\n      -ms-transform: rotate(45deg) scale(1) translate(-50%, -50%);\n          transform: rotate(45deg) scale(1) translate(-50%, -50%);\n  opacity: 1;\n  -webkit-transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;\n  -o-transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;\n  transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;\n  content: ' ';\n}\n.ant-tree-checkbox-checked .ant-tree-checkbox-inner {\n  background-color: #1890ff;\n  border-color: #1890ff;\n}\n.ant-tree-checkbox-disabled {\n  cursor: not-allowed;\n}\n.ant-tree-checkbox-disabled.ant-tree-checkbox-checked .ant-tree-checkbox-inner::after {\n  border-color: rgba(0, 0, 0, 0.25);\n  -webkit-animation-name: none;\n          animation-name: none;\n}\n.ant-tree-checkbox-disabled .ant-tree-checkbox-input {\n  cursor: not-allowed;\n}\n.ant-tree-checkbox-disabled .ant-tree-checkbox-inner {\n  background-color: #f5f5f5;\n  border-color: #d9d9d9 !important;\n}\n.ant-tree-checkbox-disabled .ant-tree-checkbox-inner::after {\n  border-color: #f5f5f5;\n  border-collapse: separate;\n  -webkit-animation-name: none;\n          animation-name: none;\n}\n.ant-tree-checkbox-disabled + span {\n  color: rgba(0, 0, 0, 0.25);\n  cursor: not-allowed;\n}\n.ant-tree-checkbox-disabled:hover::after,\n.ant-tree-checkbox-wrapper:hover .ant-tree-checkbox-disabled::after {\n  visibility: hidden;\n}\n.ant-tree-checkbox-wrapper {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  color: rgba(0, 0, 0, 0.65);\n  font-size: 14px;\n  font-variant: tabular-nums;\n  line-height: 1.5;\n  list-style: none;\n  -webkit-font-feature-settings: 'tnum';\n          font-feature-settings: 'tnum';\n  display: inline-block;\n  line-height: unset;\n  cursor: pointer;\n}\n.ant-tree-checkbox-wrapper.ant-tree-checkbox-wrapper-disabled {\n  cursor: not-allowed;\n}\n.ant-tree-checkbox-wrapper + .ant-tree-checkbox-wrapper {\n  margin-left: 8px;\n}\n.ant-tree-checkbox + span {\n  padding-right: 8px;\n  padding-left: 8px;\n}\n.ant-tree-checkbox-group {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  color: rgba(0, 0, 0, 0.65);\n  font-size: 14px;\n  font-variant: tabular-nums;\n  line-height: 1.5;\n  list-style: none;\n  -webkit-font-feature-settings: 'tnum';\n          font-feature-settings: 'tnum';\n  display: inline-block;\n}\n.ant-tree-checkbox-group-item {\n  display: inline-block;\n  margin-right: 8px;\n}\n.ant-tree-checkbox-group-item:last-child {\n  margin-right: 0;\n}\n.ant-tree-checkbox-group-item + .ant-tree-checkbox-group-item {\n  margin-left: 0;\n}\n.ant-tree-checkbox-indeterminate .ant-tree-checkbox-inner {\n  background-color: #fff;\n  border-color: #d9d9d9;\n}\n.ant-tree-checkbox-indeterminate .ant-tree-checkbox-inner::after {\n  top: 50%;\n  left: 50%;\n  width: 8px;\n  height: 8px;\n  background-color: #1890ff;\n  border: 0;\n  -webkit-transform: translate(-50%, -50%) scale(1);\n      -ms-transform: translate(-50%, -50%) scale(1);\n          transform: translate(-50%, -50%) scale(1);\n  opacity: 1;\n  content: ' ';\n}\n.ant-tree-checkbox-indeterminate.ant-tree-checkbox-disabled .ant-tree-checkbox-inner::after {\n  background-color: rgba(0, 0, 0, 0.25);\n  border-color: rgba(0, 0, 0, 0.25);\n}\n.ant-tree {\n  /* see https://github.com/ant-design/ant-design/issues/16259 */\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: rgba(0, 0, 0, 0.65);\n  font-size: 14px;\n  font-variant: tabular-nums;\n  line-height: 1.5;\n  list-style: none;\n  -webkit-font-feature-settings: 'tnum';\n          font-feature-settings: 'tnum';\n  margin: 0;\n  padding: 0;\n}\n.ant-tree-checkbox-checked::after {\n  position: absolute;\n  top: 16.67%;\n  left: 0;\n  width: 100%;\n  height: 66.67%;\n}\n.ant-tree ol,\n.ant-tree ul {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.ant-tree li {\n  margin: 0;\n  padding: 4px 0;\n  white-space: nowrap;\n  list-style: none;\n  outline: 0;\n}\n.ant-tree li span[draggable],\n.ant-tree li span[draggable='true'] {\n  line-height: 20px;\n  border-top: 2px transparent solid;\n  border-bottom: 2px transparent solid;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  /* Required to make elements draggable in old WebKit */\n  -khtml-user-drag: element;\n  -webkit-user-drag: element;\n}\n.ant-tree li.drag-over > span[draggable] {\n  color: white;\n  background-color: #1890ff;\n  opacity: 0.8;\n}\n.ant-tree li.drag-over-gap-top > span[draggable] {\n  border-top-color: #1890ff;\n}\n.ant-tree li.drag-over-gap-bottom > span[draggable] {\n  border-bottom-color: #1890ff;\n}\n.ant-tree li.filter-node > span {\n  color: #f5222d !important;\n  font-weight: 500 !important;\n}\n.ant-tree li.ant-tree-treenode-loading span.ant-tree-switcher.ant-tree-switcher_open .ant-tree-switcher-loading-icon,\n.ant-tree li.ant-tree-treenode-loading span.ant-tree-switcher.ant-tree-switcher_close .ant-tree-switcher-loading-icon {\n  position: absolute;\n  left: 0;\n  display: inline-block;\n  width: 24px;\n  height: 24px;\n  color: #1890ff;\n  font-size: 14px;\n  -webkit-transform: none;\n      -ms-transform: none;\n          transform: none;\n}\n.ant-tree li.ant-tree-treenode-loading span.ant-tree-switcher.ant-tree-switcher_open .ant-tree-switcher-loading-icon svg,\n.ant-tree li.ant-tree-treenode-loading span.ant-tree-switcher.ant-tree-switcher_close .ant-tree-switcher-loading-icon svg {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  margin: auto;\n}\n:root .ant-tree li.ant-tree-treenode-loading span.ant-tree-switcher.ant-tree-switcher_open::after,\n:root .ant-tree li.ant-tree-treenode-loading span.ant-tree-switcher.ant-tree-switcher_close::after {\n  opacity: 0;\n}\n.ant-tree li ul {\n  margin: 0;\n  padding: 0 0 0 18px;\n}\n.ant-tree li .ant-tree-node-content-wrapper {\n  display: inline-block;\n  height: 24px;\n  margin: 0;\n  padding: 0 5px;\n  color: rgba(0, 0, 0, 0.65);\n  line-height: 24px;\n  text-decoration: none;\n  vertical-align: top;\n  border-radius: 2px;\n  cursor: pointer;\n  -webkit-transition: all 0.3s;\n  -o-transition: all 0.3s;\n  transition: all 0.3s;\n}\n.ant-tree li .ant-tree-node-content-wrapper:hover {\n  background-color: #e6f7ff;\n}\n.ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {\n  background-color: #bae7ff;\n}\n.ant-tree li span.ant-tree-checkbox {\n  top: initial;\n  height: 24px;\n  margin: 0 4px 0 2px;\n  padding: 4px 0;\n}\n.ant-tree li span.ant-tree-switcher,\n.ant-tree li span.ant-tree-iconEle {\n  display: inline-block;\n  width: 24px;\n  height: 24px;\n  margin: 0;\n  line-height: 24px;\n  text-align: center;\n  vertical-align: top;\n  border: 0 none;\n  outline: none;\n  cursor: pointer;\n}\n.ant-tree li span.ant-tree-iconEle:empty {\n  display: none;\n}\n.ant-tree li span.ant-tree-switcher {\n  position: relative;\n}\n.ant-tree li span.ant-tree-switcher.ant-tree-switcher-noop {\n  cursor: default;\n}\n.ant-tree li span.ant-tree-switcher.ant-tree-switcher_open .ant-tree-switcher-icon,\n.ant-tree li span.ant-tree-switcher.ant-tree-switcher_open .ant-select-switcher-icon {\n  font-size: 12px;\n  font-size: 10px \\9;\n  -webkit-transform: scale(0.83333333) rotate(0deg);\n      -ms-transform: scale(0.83333333) rotate(0deg);\n          transform: scale(0.83333333) rotate(0deg);\n  display: inline-block;\n  font-weight: bold;\n}\n:root .ant-tree li span.ant-tree-switcher.ant-tree-switcher_open .ant-tree-switcher-icon,\n:root .ant-tree li span.ant-tree-switcher.ant-tree-switcher_open .ant-select-switcher-icon {\n  font-size: 12px;\n}\n.ant-tree li span.ant-tree-switcher.ant-tree-switcher_open .ant-tree-switcher-icon svg,\n.ant-tree li span.ant-tree-switcher.ant-tree-switcher_open .ant-select-switcher-icon svg {\n  -webkit-transition: -webkit-transform 0.3s;\n  transition: -webkit-transform 0.3s;\n  -o-transition: transform 0.3s;\n  transition: transform 0.3s;\n  transition: transform 0.3s, -webkit-transform 0.3s;\n}\n.ant-tree li span.ant-tree-switcher.ant-tree-switcher_close .ant-tree-switcher-icon,\n.ant-tree li span.ant-tree-switcher.ant-tree-switcher_close .ant-select-switcher-icon {\n  font-size: 12px;\n  font-size: 10px \\9;\n  -webkit-transform: scale(0.83333333) rotate(0deg);\n      -ms-transform: scale(0.83333333) rotate(0deg);\n          transform: scale(0.83333333) rotate(0deg);\n  display: inline-block;\n  font-weight: bold;\n}\n:root .ant-tree li span.ant-tree-switcher.ant-tree-switcher_close .ant-tree-switcher-icon,\n:root .ant-tree li span.ant-tree-switcher.ant-tree-switcher_close .ant-select-switcher-icon {\n  font-size: 12px;\n}\n.ant-tree li span.ant-tree-switcher.ant-tree-switcher_close .ant-tree-switcher-icon svg,\n.ant-tree li span.ant-tree-switcher.ant-tree-switcher_close .ant-select-switcher-icon svg {\n  -webkit-transition: -webkit-transform 0.3s;\n  transition: -webkit-transform 0.3s;\n  -o-transition: transform 0.3s;\n  transition: transform 0.3s;\n  transition: transform 0.3s, -webkit-transform 0.3s;\n}\n.ant-tree li span.ant-tree-switcher.ant-tree-switcher_close .ant-tree-switcher-icon svg {\n  -webkit-transform: rotate(-90deg);\n      -ms-transform: rotate(-90deg);\n          transform: rotate(-90deg);\n}\n.ant-tree li:last-child > span.ant-tree-switcher::before,\n.ant-tree li:last-child > span.ant-tree-iconEle::before {\n  display: none;\n}\n.ant-tree > li:first-child {\n  padding-top: 7px;\n}\n.ant-tree > li:last-child {\n  padding-bottom: 7px;\n}\n.ant-tree-child-tree > li:first-child {\n  padding-top: 8px;\n}\n.ant-tree-child-tree > li:last-child {\n  padding-bottom: 0;\n}\nli.ant-tree-treenode-disabled > span:not(.ant-tree-switcher),\nli.ant-tree-treenode-disabled > .ant-tree-node-content-wrapper,\nli.ant-tree-treenode-disabled > .ant-tree-node-content-wrapper span {\n  color: rgba(0, 0, 0, 0.25);\n  cursor: not-allowed;\n}\nli.ant-tree-treenode-disabled > .ant-tree-node-content-wrapper:hover {\n  background: transparent;\n}\n.ant-tree-icon__open {\n  margin-right: 2px;\n  vertical-align: top;\n}\n.ant-tree-icon__close {\n  margin-right: 2px;\n  vertical-align: top;\n}\n.ant-tree.ant-tree-show-line li {\n  position: relative;\n}\n.ant-tree.ant-tree-show-line li span.ant-tree-switcher {\n  color: rgba(0, 0, 0, 0.45);\n  background: #fff;\n}\n.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher-noop .ant-tree-switcher-icon,\n.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher-noop .ant-select-switcher-icon {\n  display: inline-block;\n  font-weight: normal;\n  font-size: 12px;\n}\n.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher-noop .ant-tree-switcher-icon svg,\n.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher-noop .ant-select-switcher-icon svg {\n  -webkit-transition: -webkit-transform 0.3s;\n  transition: -webkit-transform 0.3s;\n  -o-transition: transform 0.3s;\n  transition: transform 0.3s;\n  transition: transform 0.3s, -webkit-transform 0.3s;\n}\n.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher_open .ant-tree-switcher-icon,\n.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher_open .ant-select-switcher-icon {\n  display: inline-block;\n  font-weight: normal;\n  font-size: 12px;\n}\n.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher_open .ant-tree-switcher-icon svg,\n.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher_open .ant-select-switcher-icon svg {\n  -webkit-transition: -webkit-transform 0.3s;\n  transition: -webkit-transform 0.3s;\n  -o-transition: transform 0.3s;\n  transition: transform 0.3s;\n  transition: transform 0.3s, -webkit-transform 0.3s;\n}\n.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher_close .ant-tree-switcher-icon,\n.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher_close .ant-select-switcher-icon {\n  display: inline-block;\n  font-weight: normal;\n  font-size: 12px;\n}\n.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher_close .ant-tree-switcher-icon svg,\n.ant-tree.ant-tree-show-line li span.ant-tree-switcher.ant-tree-switcher_close .ant-select-switcher-icon svg {\n  -webkit-transition: -webkit-transform 0.3s;\n  transition: -webkit-transform 0.3s;\n  -o-transition: transform 0.3s;\n  transition: transform 0.3s;\n  transition: transform 0.3s, -webkit-transform 0.3s;\n}\n.ant-tree.ant-tree-show-line li:not(:last-child)::before {\n  position: absolute;\n  left: 12px;\n  width: 1px;\n  height: 100%;\n  height: calc(100% - 22px);\n  margin: 22px 0 0;\n  border-left: 1px solid #d9d9d9;\n  content: ' ';\n}\n.ant-tree.ant-tree-icon-hide .ant-tree-treenode-loading .ant-tree-iconEle {\n  display: none;\n}\n.ant-tree.ant-tree-block-node li .ant-tree-node-content-wrapper {\n  width: calc(100% - 24px);\n}\n.ant-tree.ant-tree-block-node li span.ant-tree-checkbox + .ant-tree-node-content-wrapper {\n  width: calc(100% - 46px);\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 2019:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Tree = _interopRequireDefault(__webpack_require__(1811));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _Tree["default"];
exports["default"] = _default;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 2020:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tree__ = __webpack_require__(2021);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TreeNode__ = __webpack_require__(1814);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TreeNode", function() { return __WEBPACK_IMPORTED_MODULE_1__TreeNode__["a"]; });


var Tree = __WEBPACK_IMPORTED_MODULE_0__Tree__["a" /* default */];
Tree.TreeNode = __WEBPACK_IMPORTED_MODULE_1__TreeNode__["a" /* default */];

/* harmony default export */ __webpack_exports__["default"] = (Tree);

/***/ }),

/***/ 2021:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_warning__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_util_es_Children_toArray__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_lifecycles_compat__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__contextTypes__ = __webpack_require__(1812);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__util__ = __webpack_require__(1813);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var Tree =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tree, _React$Component);

  function Tree() {
    var _this;

    _classCallCheck(this, Tree);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tree).apply(this, arguments));
    /** Internal usage for `rc-tree-select`, we don't promise it will not change. */

    _this.domTreeNodes = {};
    _this.state = {
      keyEntities: {},
      selectedKeys: [],
      checkedKeys: [],
      halfCheckedKeys: [],
      loadedKeys: [],
      loadingKeys: [],
      expandedKeys: [],
      dragNodesKeys: [],
      dragOverNodeKey: null,
      dropPosition: null,
      treeNode: [],
      prevProps: null
    };

    _this.onNodeDragStart = function (event, node) {
      var expandedKeys = _this.state.expandedKeys;
      var onDragStart = _this.props.onDragStart;
      var _node$props = node.props,
          eventKey = _node$props.eventKey,
          children = _node$props.children;
      _this.dragNode = node;

      _this.setState({
        dragNodesKeys: Object(__WEBPACK_IMPORTED_MODULE_7__util__["j" /* getDragNodesKeys */])(children, node),
        expandedKeys: Object(__WEBPACK_IMPORTED_MODULE_7__util__["b" /* arrDel */])(expandedKeys, eventKey)
      });

      if (onDragStart) {
        onDragStart({
          event: event,
          node: node
        });
      }
    };
    /**
     * [Legacy] Select handler is less small than node,
     * so that this will trigger when drag enter node or select handler.
     * This is a little tricky if customize css without padding.
     * Better for use mouse move event to refresh drag state.
     * But let's just keep it to avoid event trigger logic change.
     */


    _this.onNodeDragEnter = function (event, node) {
      var expandedKeys = _this.state.expandedKeys;
      var onDragEnter = _this.props.onDragEnter;
      var _node$props2 = node.props,
          pos = _node$props2.pos,
          eventKey = _node$props2.eventKey;
      if (!_this.dragNode) return;
      var dropPosition = Object(__WEBPACK_IMPORTED_MODULE_7__util__["c" /* calcDropPosition */])(event, node); // Skip if drag node is self

      if (_this.dragNode.props.eventKey === eventKey && dropPosition === 0) {
        _this.setState({
          dragOverNodeKey: '',
          dropPosition: null
        });

        return;
      } // Ref: https://github.com/react-component/tree/issues/132
      // Add timeout to let onDragLevel fire before onDragEnter,
      // so that we can clean drag props for onDragLeave node.
      // Macro task for this:
      // https://html.spec.whatwg.org/multipage/webappapis.html#clean-up-after-running-script


      setTimeout(function () {
        // Update drag over node
        _this.setState({
          dragOverNodeKey: eventKey,
          dropPosition: dropPosition
        }); // Side effect for delay drag


        if (!_this.delayedDragEnterLogic) {
          _this.delayedDragEnterLogic = {};
        }

        Object.keys(_this.delayedDragEnterLogic).forEach(function (key) {
          clearTimeout(_this.delayedDragEnterLogic[key]);
        });
        _this.delayedDragEnterLogic[pos] = window.setTimeout(function () {
          var newExpandedKeys = Object(__WEBPACK_IMPORTED_MODULE_7__util__["a" /* arrAdd */])(expandedKeys, eventKey);

          if (!('expandedKeys' in _this.props)) {
            _this.setState({
              expandedKeys: newExpandedKeys
            });
          }

          if (onDragEnter) {
            onDragEnter({
              event: event,
              node: node,
              expandedKeys: newExpandedKeys
            });
          }
        }, 400);
      }, 0);
    };

    _this.onNodeDragOver = function (event, node) {
      var onDragOver = _this.props.onDragOver;
      var eventKey = node.props.eventKey; // Update drag position

      if (_this.dragNode && eventKey === _this.state.dragOverNodeKey) {
        var dropPosition = Object(__WEBPACK_IMPORTED_MODULE_7__util__["c" /* calcDropPosition */])(event, node);
        if (dropPosition === _this.state.dropPosition) return;

        _this.setState({
          dropPosition: dropPosition
        });
      }

      if (onDragOver) {
        onDragOver({
          event: event,
          node: node
        });
      }
    };

    _this.onNodeDragLeave = function (event, node) {
      var onDragLeave = _this.props.onDragLeave;

      _this.setState({
        dragOverNodeKey: ''
      });

      if (onDragLeave) {
        onDragLeave({
          event: event,
          node: node
        });
      }
    };

    _this.onNodeDragEnd = function (event, node) {
      var onDragEnd = _this.props.onDragEnd;

      _this.setState({
        dragOverNodeKey: ''
      });

      if (onDragEnd) {
        onDragEnd({
          event: event,
          node: node
        });
      }

      _this.dragNode = null;
    };

    _this.onNodeDrop = function (event, node) {
      var _this$state = _this.state,
          _this$state$dragNodes = _this$state.dragNodesKeys,
          dragNodesKeys = _this$state$dragNodes === void 0 ? [] : _this$state$dragNodes,
          dropPosition = _this$state.dropPosition;
      var onDrop = _this.props.onDrop;
      var _node$props3 = node.props,
          eventKey = _node$props3.eventKey,
          pos = _node$props3.pos;

      _this.setState({
        dragOverNodeKey: ''
      });

      if (dragNodesKeys.indexOf(eventKey) !== -1) {
        __WEBPACK_IMPORTED_MODULE_3_warning___default()(false, "Can not drop to dragNode(include it's children node)");
        return;
      }

      var posArr = Object(__WEBPACK_IMPORTED_MODULE_7__util__["o" /* posToArr */])(pos);
      var dropResult = {
        event: event,
        node: node,
        dragNode: _this.dragNode,
        dragNodesKeys: dragNodesKeys.slice(),
        dropPosition: dropPosition + Number(posArr[posArr.length - 1]),
        dropToGap: false
      };

      if (dropPosition !== 0) {
        dropResult.dropToGap = true;
      }

      if (onDrop) {
        onDrop(dropResult);
      }

      _this.dragNode = null;
    };

    _this.onNodeClick = function (e, treeNode) {
      var onClick = _this.props.onClick;

      if (onClick) {
        onClick(e, treeNode);
      }
    };

    _this.onNodeDoubleClick = function (e, treeNode) {
      var onDoubleClick = _this.props.onDoubleClick;

      if (onDoubleClick) {
        onDoubleClick(e, treeNode);
      }
    };

    _this.onNodeSelect = function (e, treeNode) {
      var selectedKeys = _this.state.selectedKeys;
      var keyEntities = _this.state.keyEntities;
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          multiple = _this$props.multiple;
      var _treeNode$props = treeNode.props,
          selected = _treeNode$props.selected,
          eventKey = _treeNode$props.eventKey;
      var targetSelected = !selected; // Update selected keys

      if (!targetSelected) {
        selectedKeys = Object(__WEBPACK_IMPORTED_MODULE_7__util__["b" /* arrDel */])(selectedKeys, eventKey);
      } else if (!multiple) {
        selectedKeys = [eventKey];
      } else {
        selectedKeys = Object(__WEBPACK_IMPORTED_MODULE_7__util__["a" /* arrAdd */])(selectedKeys, eventKey);
      } // [Legacy] Not found related usage in doc or upper libs


      var selectedNodes = selectedKeys.map(function (key) {
        var entity = keyEntities[key];
        if (!entity) return null;
        return entity.node;
      }).filter(function (node) {
        return node;
      });

      _this.setUncontrolledState({
        selectedKeys: selectedKeys
      });

      if (onSelect) {
        onSelect(selectedKeys, {
          event: 'select',
          selected: targetSelected,
          node: treeNode,
          selectedNodes: selectedNodes,
          nativeEvent: e.nativeEvent
        });
      }
    };

    _this.onNodeCheck = function (e, treeNode, checked) {
      var _this$state2 = _this.state,
          keyEntities = _this$state2.keyEntities,
          oriCheckedKeys = _this$state2.checkedKeys,
          oriHalfCheckedKeys = _this$state2.halfCheckedKeys;
      var _this$props2 = _this.props,
          checkStrictly = _this$props2.checkStrictly,
          onCheck = _this$props2.onCheck;
      var eventKey = treeNode.props.eventKey; // Prepare trigger arguments

      var checkedObj;
      var eventObj = {
        event: 'check',
        node: treeNode,
        checked: checked,
        nativeEvent: e.nativeEvent
      };

      if (checkStrictly) {
        var checkedKeys = checked ? Object(__WEBPACK_IMPORTED_MODULE_7__util__["a" /* arrAdd */])(oriCheckedKeys, eventKey) : Object(__WEBPACK_IMPORTED_MODULE_7__util__["b" /* arrDel */])(oriCheckedKeys, eventKey);
        var halfCheckedKeys = Object(__WEBPACK_IMPORTED_MODULE_7__util__["b" /* arrDel */])(oriHalfCheckedKeys, eventKey);
        checkedObj = {
          checked: checkedKeys,
          halfChecked: halfCheckedKeys
        };
        eventObj.checkedNodes = checkedKeys.map(function (key) {
          return keyEntities[key];
        }).filter(function (entity) {
          return entity;
        }).map(function (entity) {
          return entity.node;
        });

        _this.setUncontrolledState({
          checkedKeys: checkedKeys
        });
      } else {
        var _conductCheck = Object(__WEBPACK_IMPORTED_MODULE_7__util__["e" /* conductCheck */])([eventKey], checked, keyEntities, {
          checkedKeys: oriCheckedKeys,
          halfCheckedKeys: oriHalfCheckedKeys
        }),
            _checkedKeys = _conductCheck.checkedKeys,
            _halfCheckedKeys = _conductCheck.halfCheckedKeys;

        checkedObj = _checkedKeys; // [Legacy] This is used for `rc-tree-select`

        eventObj.checkedNodes = [];
        eventObj.checkedNodesPositions = [];
        eventObj.halfCheckedKeys = _halfCheckedKeys;

        _checkedKeys.forEach(function (key) {
          var entity = keyEntities[key];
          if (!entity) return;
          var node = entity.node,
              pos = entity.pos;
          eventObj.checkedNodes.push(node);
          eventObj.checkedNodesPositions.push({
            node: node,
            pos: pos
          });
        });

        _this.setUncontrolledState({
          checkedKeys: _checkedKeys,
          halfCheckedKeys: _halfCheckedKeys
        });
      }

      if (onCheck) {
        onCheck(checkedObj, eventObj);
      }
    };

    _this.onNodeLoad = function (treeNode) {
      return new Promise(function (resolve) {
        // We need to get the latest state of loading/loaded keys
        _this.setState(function (_ref) {
          var _ref$loadedKeys = _ref.loadedKeys,
              loadedKeys = _ref$loadedKeys === void 0 ? [] : _ref$loadedKeys,
              _ref$loadingKeys = _ref.loadingKeys,
              loadingKeys = _ref$loadingKeys === void 0 ? [] : _ref$loadingKeys;
          var _this$props3 = _this.props,
              loadData = _this$props3.loadData,
              onLoad = _this$props3.onLoad;
          var eventKey = treeNode.props.eventKey;

          if (!loadData || loadedKeys.indexOf(eventKey) !== -1 || loadingKeys.indexOf(eventKey) !== -1) {
            // react 15 will warn if return null
            return {};
          } // Process load data


          var promise = loadData(treeNode);
          promise.then(function () {
            var _this$state3 = _this.state,
                currentLoadedKeys = _this$state3.loadedKeys,
                currentLoadingKeys = _this$state3.loadingKeys;
            var newLoadedKeys = Object(__WEBPACK_IMPORTED_MODULE_7__util__["a" /* arrAdd */])(currentLoadedKeys, eventKey);
            var newLoadingKeys = Object(__WEBPACK_IMPORTED_MODULE_7__util__["b" /* arrDel */])(currentLoadingKeys, eventKey); // onLoad should trigger before internal setState to avoid `loadData` trigger twice.
            // https://github.com/ant-design/ant-design/issues/12464

            if (onLoad) {
              onLoad(newLoadedKeys, {
                event: 'load',
                node: treeNode
              });
            }

            _this.setUncontrolledState({
              loadedKeys: newLoadedKeys
            });

            _this.setState({
              loadingKeys: newLoadingKeys
            });

            resolve();
          });
          return {
            loadingKeys: Object(__WEBPACK_IMPORTED_MODULE_7__util__["a" /* arrAdd */])(loadingKeys, eventKey)
          };
        });
      });
    };

    _this.onNodeExpand = function (e, treeNode) {
      var expandedKeys = _this.state.expandedKeys;
      var _this$props4 = _this.props,
          onExpand = _this$props4.onExpand,
          loadData = _this$props4.loadData;
      var _treeNode$props2 = treeNode.props,
          eventKey = _treeNode$props2.eventKey,
          expanded = _treeNode$props2.expanded; // Update selected keys

      var index = expandedKeys.indexOf(eventKey);
      var targetExpanded = !expanded;
      __WEBPACK_IMPORTED_MODULE_3_warning___default()(expanded && index !== -1 || !expanded && index === -1, 'Expand state not sync with index check');

      if (targetExpanded) {
        expandedKeys = Object(__WEBPACK_IMPORTED_MODULE_7__util__["a" /* arrAdd */])(expandedKeys, eventKey);
      } else {
        expandedKeys = Object(__WEBPACK_IMPORTED_MODULE_7__util__["b" /* arrDel */])(expandedKeys, eventKey);
      }

      _this.setUncontrolledState({
        expandedKeys: expandedKeys
      });

      if (onExpand) {
        onExpand(expandedKeys, {
          node: treeNode,
          expanded: targetExpanded,
          nativeEvent: e.nativeEvent
        });
      } // Async Load data


      if (targetExpanded && loadData) {
        var loadPromise = _this.onNodeLoad(treeNode);

        return loadPromise ? loadPromise.then(function () {
          // [Legacy] Refresh logic
          _this.setUncontrolledState({
            expandedKeys: expandedKeys
          });
        }) : null;
      }

      return null;
    };

    _this.onNodeMouseEnter = function (event, node) {
      var onMouseEnter = _this.props.onMouseEnter;

      if (onMouseEnter) {
        onMouseEnter({
          event: event,
          node: node
        });
      }
    };

    _this.onNodeMouseLeave = function (event, node) {
      var onMouseLeave = _this.props.onMouseLeave;

      if (onMouseLeave) {
        onMouseLeave({
          event: event,
          node: node
        });
      }
    };

    _this.onNodeContextMenu = function (event, node) {
      var onRightClick = _this.props.onRightClick;

      if (onRightClick) {
        event.preventDefault();
        onRightClick({
          event: event,
          node: node
        });
      }
    };
    /**
     * Only update the value which is not in props
     */


    _this.setUncontrolledState = function (state) {
      var needSync = false;
      var newState = {};
      Object.keys(state).forEach(function (name) {
        if (name in _this.props) return;
        needSync = true;
        newState[name] = state[name];
      });

      if (needSync) {
        _this.setState(newState);
      }
    };

    _this.registerTreeNode = function (key, node) {
      if (node) {
        _this.domTreeNodes[key] = node;
      } else {
        delete _this.domTreeNodes[key];
      }
    };

    _this.isKeyChecked = function (key) {
      var _this$state$checkedKe = _this.state.checkedKeys,
          checkedKeys = _this$state$checkedKe === void 0 ? [] : _this$state$checkedKe;
      return checkedKeys.indexOf(key) !== -1;
    };
    /**
     * [Legacy] Original logic use `key` as tracking clue.
     * We have to use `cloneElement` to pass `key`.
     */


    _this.renderTreeNode = function (child, index) {
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var _this$state4 = _this.state,
          keyEntities = _this$state4.keyEntities,
          _this$state4$expanded = _this$state4.expandedKeys,
          expandedKeys = _this$state4$expanded === void 0 ? [] : _this$state4$expanded,
          _this$state4$selected = _this$state4.selectedKeys,
          selectedKeys = _this$state4$selected === void 0 ? [] : _this$state4$selected,
          _this$state4$halfChec = _this$state4.halfCheckedKeys,
          halfCheckedKeys = _this$state4$halfChec === void 0 ? [] : _this$state4$halfChec,
          _this$state4$loadedKe = _this$state4.loadedKeys,
          loadedKeys = _this$state4$loadedKe === void 0 ? [] : _this$state4$loadedKe,
          _this$state4$loadingK = _this$state4.loadingKeys,
          loadingKeys = _this$state4$loadingK === void 0 ? [] : _this$state4$loadingK,
          dragOverNodeKey = _this$state4.dragOverNodeKey,
          dropPosition = _this$state4.dropPosition;
      var pos = Object(__WEBPACK_IMPORTED_MODULE_7__util__["l" /* getPosition */])(level, index);
      var key = child.key || pos;

      if (!keyEntities[key]) {
        Object(__WEBPACK_IMPORTED_MODULE_7__util__["p" /* warnOnlyTreeNode */])();
        return null;
      }

      return __WEBPACK_IMPORTED_MODULE_0_react__["cloneElement"](child, {
        key: key,
        eventKey: key,
        expanded: expandedKeys.indexOf(key) !== -1,
        selected: selectedKeys.indexOf(key) !== -1,
        loaded: loadedKeys.indexOf(key) !== -1,
        loading: loadingKeys.indexOf(key) !== -1,
        checked: _this.isKeyChecked(key),
        halfChecked: halfCheckedKeys.indexOf(key) !== -1,
        pos: pos,
        // [Legacy] Drag props
        dragOver: dragOverNodeKey === key && dropPosition === 0,
        dragOverGapTop: dragOverNodeKey === key && dropPosition === -1,
        dragOverGapBottom: dragOverNodeKey === key && dropPosition === 1
      });
    };

    return _this;
  }

  _createClass(Tree, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var treeNode = this.state.treeNode;
      var _this$props5 = this.props,
          prefixCls = _this$props5.prefixCls,
          className = _this$props5.className,
          focusable = _this$props5.focusable,
          style = _this$props5.style,
          showLine = _this$props5.showLine,
          _this$props5$tabIndex = _this$props5.tabIndex,
          tabIndex = _this$props5$tabIndex === void 0 ? 0 : _this$props5$tabIndex,
          selectable = _this$props5.selectable,
          showIcon = _this$props5.showIcon,
          icon = _this$props5.icon,
          switcherIcon = _this$props5.switcherIcon,
          draggable = _this$props5.draggable,
          checkable = _this$props5.checkable,
          checkStrictly = _this$props5.checkStrictly,
          disabled = _this$props5.disabled,
          motion = _this$props5.motion,
          loadData = _this$props5.loadData,
          filterTreeNode = _this$props5.filterTreeNode;
      var domProps = Object(__WEBPACK_IMPORTED_MODULE_7__util__["i" /* getDataAndAria */])(this.props);

      if (focusable) {
        domProps.tabIndex = tabIndex;
      }

      return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_6__contextTypes__["a" /* TreeContext */].Provider, {
        value: {
          prefixCls: prefixCls,
          selectable: selectable,
          showIcon: showIcon,
          icon: icon,
          switcherIcon: switcherIcon,
          draggable: draggable,
          checkable: checkable,
          checkStrictly: checkStrictly,
          disabled: disabled,
          motion: motion,
          loadData: loadData,
          filterTreeNode: filterTreeNode,
          renderTreeNode: this.renderTreeNode,
          isKeyChecked: this.isKeyChecked,
          onNodeClick: this.onNodeClick,
          onNodeDoubleClick: this.onNodeDoubleClick,
          onNodeExpand: this.onNodeExpand,
          onNodeSelect: this.onNodeSelect,
          onNodeCheck: this.onNodeCheck,
          onNodeLoad: this.onNodeLoad,
          onNodeMouseEnter: this.onNodeMouseEnter,
          onNodeMouseLeave: this.onNodeMouseLeave,
          onNodeContextMenu: this.onNodeContextMenu,
          onNodeDragStart: this.onNodeDragStart,
          onNodeDragEnter: this.onNodeDragEnter,
          onNodeDragOver: this.onNodeDragOver,
          onNodeDragLeave: this.onNodeDragLeave,
          onNodeDragEnd: this.onNodeDragEnd,
          onNodeDrop: this.onNodeDrop,
          registerTreeNode: this.registerTreeNode
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ul", Object.assign({}, domProps, {
        className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()(prefixCls, className, _defineProperty({}, "".concat(prefixCls, "-show-line"), showLine)),
        style: style,
        role: "tree",
        unselectable: "on"
      }), Object(__WEBPACK_IMPORTED_MODULE_7__util__["m" /* mapChildren */])(treeNode, function (node, index) {
        return _this2.renderTreeNode(node, index);
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, prevState) {
      var prevProps = prevState.prevProps;
      var newState = {
        prevProps: props
      };

      function needSync(name) {
        return !prevProps && name in props || prevProps && prevProps[name] !== props[name];
      } // ================== Tree Node ==================


      var treeNode = null; // Check if `treeData` or `children` changed and save into the state.

      if (needSync('treeData')) {
        treeNode = Object(__WEBPACK_IMPORTED_MODULE_7__util__["g" /* convertDataToTree */])(props.treeData);
      } else if (needSync('children')) {
        treeNode = Object(__WEBPACK_IMPORTED_MODULE_4_rc_util_es_Children_toArray__["a" /* default */])(props.children);
      } // Tree support filter function which will break the tree structure in the vdm.
      // We cache the treeNodes in state so that we can return the treeNode in event trigger.


      if (treeNode) {
        newState.treeNode = treeNode; // Calculate the entities data for quick match

        var entitiesMap = Object(__WEBPACK_IMPORTED_MODULE_7__util__["h" /* convertTreeToEntities */])(treeNode);
        newState.keyEntities = entitiesMap.keyEntities;
      }

      var keyEntities = newState.keyEntities || prevState.keyEntities; // ================ expandedKeys =================

      if (needSync('expandedKeys') || prevProps && needSync('autoExpandParent')) {
        newState.expandedKeys = props.autoExpandParent || !prevProps && props.defaultExpandParent ? Object(__WEBPACK_IMPORTED_MODULE_7__util__["f" /* conductExpandParent */])(props.expandedKeys, keyEntities) : props.expandedKeys;
      } else if (!prevProps && props.defaultExpandAll) {
        newState.expandedKeys = Object.keys(keyEntities);
      } else if (!prevProps && props.defaultExpandedKeys) {
        newState.expandedKeys = props.autoExpandParent || props.defaultExpandParent ? Object(__WEBPACK_IMPORTED_MODULE_7__util__["f" /* conductExpandParent */])(props.defaultExpandedKeys, keyEntities) : props.defaultExpandedKeys;
      } // ================ selectedKeys =================


      if (props.selectable) {
        if (needSync('selectedKeys')) {
          newState.selectedKeys = Object(__WEBPACK_IMPORTED_MODULE_7__util__["d" /* calcSelectedKeys */])(props.selectedKeys, props);
        } else if (!prevProps && props.defaultSelectedKeys) {
          newState.selectedKeys = Object(__WEBPACK_IMPORTED_MODULE_7__util__["d" /* calcSelectedKeys */])(props.defaultSelectedKeys, props);
        }
      } // ================= checkedKeys =================


      if (props.checkable) {
        var checkedKeyEntity;

        if (needSync('checkedKeys')) {
          checkedKeyEntity = Object(__WEBPACK_IMPORTED_MODULE_7__util__["n" /* parseCheckedKeys */])(props.checkedKeys) || {};
        } else if (!prevProps && props.defaultCheckedKeys) {
          checkedKeyEntity = Object(__WEBPACK_IMPORTED_MODULE_7__util__["n" /* parseCheckedKeys */])(props.defaultCheckedKeys) || {};
        } else if (treeNode) {
          // If treeNode changed, we also need check it
          checkedKeyEntity = Object(__WEBPACK_IMPORTED_MODULE_7__util__["n" /* parseCheckedKeys */])(props.checkedKeys) || {
            checkedKeys: prevState.checkedKeys,
            halfCheckedKeys: prevState.halfCheckedKeys
          };
        }

        if (checkedKeyEntity) {
          var _checkedKeyEntity = checkedKeyEntity,
              _checkedKeyEntity$che = _checkedKeyEntity.checkedKeys,
              checkedKeys = _checkedKeyEntity$che === void 0 ? [] : _checkedKeyEntity$che,
              _checkedKeyEntity$hal = _checkedKeyEntity.halfCheckedKeys,
              halfCheckedKeys = _checkedKeyEntity$hal === void 0 ? [] : _checkedKeyEntity$hal;

          if (!props.checkStrictly) {
            var conductKeys = Object(__WEBPACK_IMPORTED_MODULE_7__util__["e" /* conductCheck */])(checkedKeys, true, keyEntities);
            checkedKeys = conductKeys.checkedKeys;
            halfCheckedKeys = conductKeys.halfCheckedKeys;
          }

          newState.checkedKeys = checkedKeys;
          newState.halfCheckedKeys = halfCheckedKeys;
        }
      } // ================= loadedKeys ==================


      if (needSync('loadedKeys')) {
        newState.loadedKeys = props.loadedKeys;
      }

      return newState;
    }
  }]);

  return Tree;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

Tree.propTypes = {
  prefixCls: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  className: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  style: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  tabIndex: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number]),
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
  treeData: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array,
  showLine: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  showIcon: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  icon: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func]),
  focusable: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  selectable: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  disabled: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  multiple: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  checkable: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node]),
  checkStrictly: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  draggable: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  defaultExpandParent: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  autoExpandParent: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  defaultExpandAll: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  defaultExpandedKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string),
  expandedKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string),
  defaultCheckedKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string),
  checkedKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number])), __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object]),
  defaultSelectedKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string),
  selectedKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string),
  onClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onDoubleClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onExpand: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onCheck: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onSelect: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onLoad: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  loadData: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  loadedKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string),
  onMouseEnter: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onMouseLeave: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onRightClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onDragStart: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onDragEnter: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onDragOver: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onDragLeave: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onDragEnd: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onDrop: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  filterTreeNode: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  motion: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  switcherIcon: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func])
};
Tree.defaultProps = {
  prefixCls: 'rc-tree',
  showLine: false,
  showIcon: true,
  selectable: true,
  multiple: false,
  checkable: false,
  disabled: false,
  checkStrictly: false,
  draggable: false,
  defaultExpandParent: true,
  autoExpandParent: false,
  defaultExpandAll: false,
  defaultExpandedKeys: [],
  defaultCheckedKeys: [],
  defaultSelectedKeys: []
};
Object(__WEBPACK_IMPORTED_MODULE_5_react_lifecycles_compat__["polyfill"])(Tree);
/* harmony default export */ __webpack_exports__["a"] = (Tree);

/***/ }),

/***/ 2022:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(__webpack_require__(0));

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _omit = _interopRequireDefault(__webpack_require__(46));

var _debounce = _interopRequireDefault(__webpack_require__(375));

var _util = __webpack_require__(1720);

var _reactLifecyclesCompat = __webpack_require__(7);

var _configProvider = __webpack_require__(14);

var _Tree = _interopRequireDefault(__webpack_require__(1811));

var _util2 = __webpack_require__(2027);

var _icon = _interopRequireDefault(__webpack_require__(27));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function getIcon(props) {
  var isLeaf = props.isLeaf,
      expanded = props.expanded;

  if (isLeaf) {
    return React.createElement(_icon["default"], {
      type: "file"
    });
  }

  return React.createElement(_icon["default"], {
    type: expanded ? 'folder-open' : 'folder'
  });
}

var DirectoryTree =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DirectoryTree, _React$Component);

  function DirectoryTree(props) {
    var _this;

    _classCallCheck(this, DirectoryTree);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DirectoryTree).call(this, props));

    _this.onExpand = function (expandedKeys, info) {
      var onExpand = _this.props.onExpand;

      _this.setUncontrolledState({
        expandedKeys: expandedKeys
      }); // Call origin function


      if (onExpand) {
        return onExpand(expandedKeys, info);
      }

      return undefined;
    };

    _this.onClick = function (event, node) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          expandAction = _this$props.expandAction; // Expand the tree

      if (expandAction === 'click') {
        _this.onDebounceExpand(event, node);
      }

      if (onClick) {
        onClick(event, node);
      }
    };

    _this.onDoubleClick = function (event, node) {
      var _this$props2 = _this.props,
          onDoubleClick = _this$props2.onDoubleClick,
          expandAction = _this$props2.expandAction; // Expand the tree

      if (expandAction === 'doubleClick') {
        _this.onDebounceExpand(event, node);
      }

      if (onDoubleClick) {
        onDoubleClick(event, node);
      }
    };

    _this.onSelect = function (keys, event) {
      var _this$props3 = _this.props,
          onSelect = _this$props3.onSelect,
          multiple = _this$props3.multiple,
          children = _this$props3.children;
      var _this$state$expandedK = _this.state.expandedKeys,
          expandedKeys = _this$state$expandedK === void 0 ? [] : _this$state$expandedK;
      var node = event.node,
          nativeEvent = event.nativeEvent;
      var _node$props$eventKey = node.props.eventKey,
          eventKey = _node$props$eventKey === void 0 ? '' : _node$props$eventKey;
      var newState = {}; // We need wrap this event since some value is not same

      var newEvent = _extends(_extends({}, event), {
        selected: true
      }); // Windows / Mac single pick


      var ctrlPick = nativeEvent.ctrlKey || nativeEvent.metaKey;
      var shiftPick = nativeEvent.shiftKey; // Generate new selected keys

      var newSelectedKeys;

      if (multiple && ctrlPick) {
        // Control click
        newSelectedKeys = keys;
        _this.lastSelectedKey = eventKey;
        _this.cachedSelectedKeys = newSelectedKeys;
        newEvent.selectedNodes = (0, _util2.convertDirectoryKeysToNodes)(children, newSelectedKeys);
      } else if (multiple && shiftPick) {
        // Shift click
        newSelectedKeys = Array.from(new Set([].concat(_toConsumableArray(_this.cachedSelectedKeys || []), _toConsumableArray((0, _util2.calcRangeKeys)(children, expandedKeys, eventKey, _this.lastSelectedKey)))));
        newEvent.selectedNodes = (0, _util2.convertDirectoryKeysToNodes)(children, newSelectedKeys);
      } else {
        // Single click
        newSelectedKeys = [eventKey];
        _this.lastSelectedKey = eventKey;
        _this.cachedSelectedKeys = newSelectedKeys;
        newEvent.selectedNodes = [event.node];
      }

      newState.selectedKeys = newSelectedKeys;

      if (onSelect) {
        onSelect(newSelectedKeys, newEvent);
      }

      _this.setUncontrolledState(newState);
    };

    _this.setTreeRef = function (node) {
      _this.tree = node;
    };

    _this.expandFolderNode = function (event, node) {
      var isLeaf = node.props.isLeaf;

      if (isLeaf || event.shiftKey || event.metaKey || event.ctrlKey) {
        return;
      } // Get internal rc-tree


      var internalTree = _this.tree.tree; // Call internal rc-tree expand function
      // https://github.com/ant-design/ant-design/issues/12567

      internalTree.onNodeExpand(event, node);
    };

    _this.setUncontrolledState = function (state) {
      var newState = (0, _omit["default"])(state, Object.keys(_this.props));

      if (Object.keys(newState).length) {
        _this.setState(newState);
      }
    };

    _this.renderDirectoryTree = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;

      var _a = _this.props,
          customizePrefixCls = _a.prefixCls,
          className = _a.className,
          props = __rest(_a, ["prefixCls", "className"]);

      var _this$state = _this.state,
          expandedKeys = _this$state.expandedKeys,
          selectedKeys = _this$state.selectedKeys;
      var prefixCls = getPrefixCls('tree', customizePrefixCls);
      var connectClassName = (0, _classnames["default"])("".concat(prefixCls, "-directory"), className);
      return React.createElement(_Tree["default"], _extends({
        icon: getIcon,
        ref: _this.setTreeRef
      }, props, {
        prefixCls: prefixCls,
        className: connectClassName,
        expandedKeys: expandedKeys,
        selectedKeys: selectedKeys,
        onSelect: _this.onSelect,
        onClick: _this.onClick,
        onDoubleClick: _this.onDoubleClick,
        onExpand: _this.onExpand
      }));
    };

    var defaultExpandAll = props.defaultExpandAll,
        defaultExpandParent = props.defaultExpandParent,
        expandedKeys = props.expandedKeys,
        defaultExpandedKeys = props.defaultExpandedKeys,
        children = props.children;

    var _convertTreeToEntitie = (0, _util.convertTreeToEntities)(children),
        keyEntities = _convertTreeToEntitie.keyEntities; // Selected keys


    _this.state = {
      selectedKeys: props.selectedKeys || props.defaultSelectedKeys || []
    }; // Expanded keys

    if (defaultExpandAll) {
      if (props.treeData) {
        _this.state.expandedKeys = (0, _util2.getFullKeyListByTreeData)(props.treeData);
      } else {
        _this.state.expandedKeys = (0, _util2.getFullKeyList)(props.children);
      }
    } else if (defaultExpandParent) {
      _this.state.expandedKeys = (0, _util.conductExpandParent)(expandedKeys || defaultExpandedKeys, keyEntities);
    } else {
      _this.state.expandedKeys = expandedKeys || defaultExpandedKeys;
    }

    _this.onDebounceExpand = (0, _debounce["default"])(_this.expandFolderNode, 200, {
      leading: true
    });
    return _this;
  }

  _createClass(DirectoryTree, [{
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderDirectoryTree);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      var newState = {};

      if ('expandedKeys' in nextProps) {
        newState.expandedKeys = nextProps.expandedKeys;
      }

      if ('selectedKeys' in nextProps) {
        newState.selectedKeys = nextProps.selectedKeys;
      }

      return newState;
    }
  }]);

  return DirectoryTree;
}(React.Component);

DirectoryTree.defaultProps = {
  showIcon: true,
  expandAction: 'click'
};
(0, _reactLifecyclesCompat.polyfill)(DirectoryTree);
var _default = DirectoryTree;
exports["default"] = _default;
//# sourceMappingURL=DirectoryTree.js.map


/***/ }),

/***/ 2023:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.InternalTreeNode = void 0;

var React = _interopRequireWildcard(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(1));

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _CSSMotion = _interopRequireDefault(__webpack_require__(2024));

var _toArray = _interopRequireDefault(__webpack_require__(1434));

var _reactLifecyclesCompat = __webpack_require__(7);

var _contextTypes = __webpack_require__(2026);

var _util = __webpack_require__(1720);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ICON_OPEN = 'open';
var ICON_CLOSE = 'close';
var defaultTitle = '---';

var TreeNode =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TreeNode, _React$Component);

  function TreeNode() {
    var _this;

    _classCallCheck(this, TreeNode);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TreeNode).apply(this, arguments));
    _this.state = {
      dragNodeHighlight: false
    };

    _this.onSelectorClick = function (e) {
      // Click trigger before select/check operation
      var onNodeClick = _this.props.context.onNodeClick;
      onNodeClick(e, _assertThisInitialized(_this));

      if (_this.isSelectable()) {
        _this.onSelect(e);
      } else {
        _this.onCheck(e);
      }
    };

    _this.onSelectorDoubleClick = function (e) {
      var onNodeDoubleClick = _this.props.context.onNodeDoubleClick;
      onNodeDoubleClick(e, _assertThisInitialized(_this));
    };

    _this.onSelect = function (e) {
      if (_this.isDisabled()) return;
      var onNodeSelect = _this.props.context.onNodeSelect;
      e.preventDefault();
      onNodeSelect(e, _assertThisInitialized(_this));
    };

    _this.onCheck = function (e) {
      if (_this.isDisabled()) return;
      var _this$props = _this.props,
          disableCheckbox = _this$props.disableCheckbox,
          checked = _this$props.checked;
      var onNodeCheck = _this.props.context.onNodeCheck;
      if (!_this.isCheckable() || disableCheckbox) return;
      e.preventDefault();
      var targetChecked = !checked;
      onNodeCheck(e, _assertThisInitialized(_this), targetChecked);
    };

    _this.onMouseEnter = function (e) {
      var onNodeMouseEnter = _this.props.context.onNodeMouseEnter;
      onNodeMouseEnter(e, _assertThisInitialized(_this));
    };

    _this.onMouseLeave = function (e) {
      var onNodeMouseLeave = _this.props.context.onNodeMouseLeave;
      onNodeMouseLeave(e, _assertThisInitialized(_this));
    };

    _this.onContextMenu = function (e) {
      var onNodeContextMenu = _this.props.context.onNodeContextMenu;
      onNodeContextMenu(e, _assertThisInitialized(_this));
    };

    _this.onDragStart = function (e) {
      var onNodeDragStart = _this.props.context.onNodeDragStart;
      e.stopPropagation();

      _this.setState({
        dragNodeHighlight: true
      });

      onNodeDragStart(e, _assertThisInitialized(_this));

      try {
        // ie throw error
        // firefox-need-it
        e.dataTransfer.setData('text/plain', '');
      } catch (error) {// empty
      }
    };

    _this.onDragEnter = function (e) {
      var onNodeDragEnter = _this.props.context.onNodeDragEnter;
      e.preventDefault();
      e.stopPropagation();
      onNodeDragEnter(e, _assertThisInitialized(_this));
    };

    _this.onDragOver = function (e) {
      var onNodeDragOver = _this.props.context.onNodeDragOver;
      e.preventDefault();
      e.stopPropagation();
      onNodeDragOver(e, _assertThisInitialized(_this));
    };

    _this.onDragLeave = function (e) {
      var onNodeDragLeave = _this.props.context.onNodeDragLeave;
      e.stopPropagation();
      onNodeDragLeave(e, _assertThisInitialized(_this));
    };

    _this.onDragEnd = function (e) {
      var onNodeDragEnd = _this.props.context.onNodeDragEnd;
      e.stopPropagation();

      _this.setState({
        dragNodeHighlight: false
      });

      onNodeDragEnd(e, _assertThisInitialized(_this));
    };

    _this.onDrop = function (e) {
      var onNodeDrop = _this.props.context.onNodeDrop;
      e.preventDefault();
      e.stopPropagation();

      _this.setState({
        dragNodeHighlight: false
      });

      onNodeDrop(e, _assertThisInitialized(_this));
    }; // Disabled item still can be switch


    _this.onExpand = function (e) {
      var onNodeExpand = _this.props.context.onNodeExpand;
      onNodeExpand(e, _assertThisInitialized(_this));
    }; // Drag usage


    _this.setSelectHandle = function (node) {
      _this.selectHandle = node;
    };

    _this.getNodeChildren = function () {
      var children = _this.props.children;
      var originList = (0, _toArray.default)(children).filter(function (node) {
        return node;
      });
      var targetList = (0, _util.getNodeChildren)(originList);

      if (originList.length !== targetList.length) {
        (0, _util.warnOnlyTreeNode)();
      }

      return targetList;
    };

    _this.getNodeState = function () {
      var expanded = _this.props.expanded;

      if (_this.isLeaf()) {
        return null;
      }

      return expanded ? ICON_OPEN : ICON_CLOSE;
    };

    _this.isLeaf = function () {
      var _this$props2 = _this.props,
          isLeaf = _this$props2.isLeaf,
          loaded = _this$props2.loaded;
      var loadData = _this.props.context.loadData;
      var hasChildren = _this.getNodeChildren().length !== 0;

      if (isLeaf === false) {
        return false;
      }

      return isLeaf || !loadData && !hasChildren || loadData && loaded && !hasChildren;
    };

    _this.isDisabled = function () {
      var disabled = _this.props.disabled;
      var treeDisabled = _this.props.context.disabled; // Follow the logic of Selectable

      if (disabled === false) {
        return false;
      }

      return !!(treeDisabled || disabled);
    };

    _this.isCheckable = function () {
      var checkable = _this.props.checkable;
      var treeCheckable = _this.props.context.checkable; // Return false if tree or treeNode is not checkable

      if (!treeCheckable || checkable === false) return false;
      return treeCheckable;
    }; // Load data to avoid default expanded tree without data


    _this.syncLoadData = function (props) {
      var expanded = props.expanded,
          loading = props.loading,
          loaded = props.loaded;
      var _this$props$context = _this.props.context,
          loadData = _this$props$context.loadData,
          onNodeLoad = _this$props$context.onNodeLoad;
      if (loading) return; // read from state to avoid loadData at same time

      if (loadData && expanded && !_this.isLeaf()) {
        // We needn't reload data when has children in sync logic
        // It's only needed in node expanded
        var hasChildren = _this.getNodeChildren().length !== 0;

        if (!hasChildren && !loaded) {
          onNodeLoad(_assertThisInitialized(_this));
        }
      }
    }; // Switcher


    _this.renderSwitcher = function () {
      var _this$props3 = _this.props,
          expanded = _this$props3.expanded,
          switcherIconFromProps = _this$props3.switcherIcon;
      var _this$props$context2 = _this.props.context,
          prefixCls = _this$props$context2.prefixCls,
          switcherIconFromCtx = _this$props$context2.switcherIcon;
      var switcherIcon = switcherIconFromProps || switcherIconFromCtx;

      if (_this.isLeaf()) {
        return React.createElement("span", {
          className: (0, _classnames.default)("".concat(prefixCls, "-switcher"), "".concat(prefixCls, "-switcher-noop"))
        }, typeof switcherIcon === 'function' ? switcherIcon(_objectSpread({}, _this.props, {
          isLeaf: true
        })) : switcherIcon);
      }

      var switcherCls = (0, _classnames.default)("".concat(prefixCls, "-switcher"), "".concat(prefixCls, "-switcher_").concat(expanded ? ICON_OPEN : ICON_CLOSE));
      return React.createElement("span", {
        onClick: _this.onExpand,
        className: switcherCls
      }, typeof switcherIcon === 'function' ? switcherIcon(_objectSpread({}, _this.props, {
        isLeaf: false
      })) : switcherIcon);
    }; // Checkbox


    _this.renderCheckbox = function () {
      var _this$props4 = _this.props,
          checked = _this$props4.checked,
          halfChecked = _this$props4.halfChecked,
          disableCheckbox = _this$props4.disableCheckbox;
      var prefixCls = _this.props.context.prefixCls;

      var disabled = _this.isDisabled();

      var checkable = _this.isCheckable();

      if (!checkable) return null; // [Legacy] Custom element should be separate with `checkable` in future

      var $custom = typeof checkable !== 'boolean' ? checkable : null;
      return React.createElement("span", {
        className: (0, _classnames.default)("".concat(prefixCls, "-checkbox"), checked && "".concat(prefixCls, "-checkbox-checked"), !checked && halfChecked && "".concat(prefixCls, "-checkbox-indeterminate"), (disabled || disableCheckbox) && "".concat(prefixCls, "-checkbox-disabled")),
        onClick: _this.onCheck
      }, $custom);
    };

    _this.renderIcon = function () {
      var loading = _this.props.loading;
      var prefixCls = _this.props.context.prefixCls;
      return React.createElement("span", {
        className: (0, _classnames.default)("".concat(prefixCls, "-iconEle"), "".concat(prefixCls, "-icon__").concat(_this.getNodeState() || 'docu'), loading && "".concat(prefixCls, "-icon_loading"))
      });
    }; // Icon + Title


    _this.renderSelector = function () {
      var dragNodeHighlight = _this.state.dragNodeHighlight;
      var _this$props5 = _this.props,
          title = _this$props5.title,
          selected = _this$props5.selected,
          icon = _this$props5.icon,
          loading = _this$props5.loading;
      var _this$props$context3 = _this.props.context,
          prefixCls = _this$props$context3.prefixCls,
          showIcon = _this$props$context3.showIcon,
          treeIcon = _this$props$context3.icon,
          draggable = _this$props$context3.draggable,
          loadData = _this$props$context3.loadData;

      var disabled = _this.isDisabled();

      var wrapClass = "".concat(prefixCls, "-node-content-wrapper"); // Icon - Still show loading icon when loading without showIcon

      var $icon;

      if (showIcon) {
        var currentIcon = icon || treeIcon;
        $icon = currentIcon ? React.createElement("span", {
          className: (0, _classnames.default)("".concat(prefixCls, "-iconEle"), "".concat(prefixCls, "-icon__customize"))
        }, typeof currentIcon === 'function' ? currentIcon(_this.props) : currentIcon) : _this.renderIcon();
      } else if (loadData && loading) {
        $icon = _this.renderIcon();
      } // Title


      var $title = React.createElement("span", {
        className: "".concat(prefixCls, "-title")
      }, title);
      return React.createElement("span", {
        ref: _this.setSelectHandle,
        title: typeof title === 'string' ? title : '',
        className: (0, _classnames.default)("".concat(wrapClass), "".concat(wrapClass, "-").concat(_this.getNodeState() || 'normal'), !disabled && (selected || dragNodeHighlight) && "".concat(prefixCls, "-node-selected"), !disabled && draggable && 'draggable'),
        draggable: !disabled && draggable || undefined,
        "aria-grabbed": !disabled && draggable || undefined,
        onMouseEnter: _this.onMouseEnter,
        onMouseLeave: _this.onMouseLeave,
        onContextMenu: _this.onContextMenu,
        onClick: _this.onSelectorClick,
        onDoubleClick: _this.onSelectorDoubleClick,
        onDragStart: draggable ? _this.onDragStart : undefined
      }, $icon, $title);
    }; // Children list wrapped with `Animation`


    _this.renderChildren = function () {
      var _this$props6 = _this.props,
          expanded = _this$props6.expanded,
          pos = _this$props6.pos;
      var _this$props$context4 = _this.props.context,
          prefixCls = _this$props$context4.prefixCls,
          motion = _this$props$context4.motion,
          renderTreeNode = _this$props$context4.renderTreeNode; // Children TreeNode

      var nodeList = _this.getNodeChildren();

      if (nodeList.length === 0) {
        return null;
      }

      return React.createElement(_CSSMotion.default, Object.assign({
        visible: expanded
      }, motion), function (_ref) {
        var style = _ref.style,
            className = _ref.className;
        return React.createElement("ul", {
          className: (0, _classnames.default)(className, "".concat(prefixCls, "-child-tree"), expanded && "".concat(prefixCls, "-child-tree-open")),
          style: style,
          "data-expanded": expanded,
          role: "group"
        }, (0, _util.mapChildren)(nodeList, function (node, index) {
          return renderTreeNode(node, index, pos);
        }));
      });
    };

    return _this;
  } // Isomorphic needn't load data in server side


  _createClass(TreeNode, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props7 = this.props,
          eventKey = _this$props7.eventKey,
          registerTreeNode = _this$props7.context.registerTreeNode;
      this.syncLoadData(this.props);
      registerTreeNode(eventKey, this);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.syncLoadData(this.props);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props8 = this.props,
          eventKey = _this$props8.eventKey,
          registerTreeNode = _this$props8.context.registerTreeNode;
      registerTreeNode(eventKey, null);
    }
  }, {
    key: "isSelectable",
    value: function isSelectable() {
      var selectable = this.props.selectable;
      var treeSelectable = this.props.context.selectable; // Ignore when selectable is undefined or null

      if (typeof selectable === 'boolean') {
        return selectable;
      }

      return treeSelectable;
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var loading = this.props.loading;

      var _this$props9 = this.props,
          className = _this$props9.className,
          style = _this$props9.style,
          dragOver = _this$props9.dragOver,
          dragOverGapTop = _this$props9.dragOverGapTop,
          dragOverGapBottom = _this$props9.dragOverGapBottom,
          isLeaf = _this$props9.isLeaf,
          expanded = _this$props9.expanded,
          selected = _this$props9.selected,
          checked = _this$props9.checked,
          halfChecked = _this$props9.halfChecked,
          otherProps = _objectWithoutProperties(_this$props9, ["className", "style", "dragOver", "dragOverGapTop", "dragOverGapBottom", "isLeaf", "expanded", "selected", "checked", "halfChecked"]);

      var _this$props$context5 = this.props.context,
          prefixCls = _this$props$context5.prefixCls,
          filterTreeNode = _this$props$context5.filterTreeNode,
          draggable = _this$props$context5.draggable;
      var disabled = this.isDisabled();
      var dataOrAriaAttributeProps = (0, _util.getDataAndAria)(otherProps);
      return React.createElement("li", Object.assign({
        className: (0, _classnames.default)(className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-treenode-disabled"), disabled), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-switcher-").concat(expanded ? 'open' : 'close'), !isLeaf), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-checkbox-checked"), checked), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-checkbox-indeterminate"), halfChecked), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-selected"), selected), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-loading"), loading), _defineProperty(_classNames, 'drag-over', !disabled && dragOver), _defineProperty(_classNames, 'drag-over-gap-top', !disabled && dragOverGapTop), _defineProperty(_classNames, 'drag-over-gap-bottom', !disabled && dragOverGapBottom), _defineProperty(_classNames, 'filter-node', filterTreeNode && filterTreeNode(this)), _classNames)),
        style: style,
        role: "treeitem",
        onDragEnter: draggable ? this.onDragEnter : undefined,
        onDragOver: draggable ? this.onDragOver : undefined,
        onDragLeave: draggable ? this.onDragLeave : undefined,
        onDrop: draggable ? this.onDrop : undefined,
        onDragEnd: draggable ? this.onDragEnd : undefined
      }, dataOrAriaAttributeProps), this.renderSwitcher(), this.renderCheckbox(), this.renderSelector(), this.renderChildren());
    }
  }]);

  return TreeNode;
}(React.Component);

exports.InternalTreeNode = TreeNode;
TreeNode.propTypes = {
  eventKey: _propTypes.default.string,
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  onSelect: _propTypes.default.func,
  // By parent
  expanded: _propTypes.default.bool,
  selected: _propTypes.default.bool,
  checked: _propTypes.default.bool,
  loaded: _propTypes.default.bool,
  loading: _propTypes.default.bool,
  halfChecked: _propTypes.default.bool,
  children: _propTypes.default.node,
  title: _propTypes.default.node,
  pos: _propTypes.default.string,
  dragOver: _propTypes.default.bool,
  dragOverGapTop: _propTypes.default.bool,
  dragOverGapBottom: _propTypes.default.bool,
  // By user
  isLeaf: _propTypes.default.bool,
  checkable: _propTypes.default.bool,
  selectable: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  disableCheckbox: _propTypes.default.bool,
  icon: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  switcherIcon: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func])
};
(0, _reactLifecyclesCompat.polyfill)(TreeNode);

var ContextTreeNode = function ContextTreeNode(props) {
  return React.createElement(_contextTypes.TreeContext.Consumer, null, function (context) {
    return React.createElement(TreeNode, Object.assign({}, props, {
      context: context
    }));
  });
};

ContextTreeNode.defaultProps = {
  title: defaultTitle
};
ContextTreeNode.isTreeNode = 1;
var _default = ContextTreeNode;
exports.default = _default;

/***/ }),

/***/ 2024:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotionPropTypes = undefined;

var _defineProperty2 = __webpack_require__(59);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = __webpack_require__(19);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(11);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(34);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(12);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.genCSSMotion = genCSSMotion;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactLifecyclesCompat = __webpack_require__(7);

var _findDOMNode = __webpack_require__(1918);

var _findDOMNode2 = _interopRequireDefault(_findDOMNode);

var _classnames = __webpack_require__(3);

var _classnames2 = _interopRequireDefault(_classnames);

var _raf = __webpack_require__(91);

var _raf2 = _interopRequireDefault(_raf);

var _motion = __webpack_require__(2025);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var STATUS_NONE = 'none'; /* eslint-disable react/default-props-match-prop-types, react/no-multi-comp */

var STATUS_APPEAR = 'appear';
var STATUS_ENTER = 'enter';
var STATUS_LEAVE = 'leave';

var MotionPropTypes = exports.MotionPropTypes = {
  eventProps: _propTypes2['default'].object, // Internal usage. Only pass by CSSMotionList
  visible: _propTypes2['default'].bool,
  children: _propTypes2['default'].func,
  motionName: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].object]),
  motionAppear: _propTypes2['default'].bool,
  motionEnter: _propTypes2['default'].bool,
  motionLeave: _propTypes2['default'].bool,
  motionLeaveImmediately: _propTypes2['default'].bool, // Trigger leave motion immediately
  removeOnLeave: _propTypes2['default'].bool,
  leavedClassName: _propTypes2['default'].string,
  onAppearStart: _propTypes2['default'].func,
  onAppearActive: _propTypes2['default'].func,
  onAppearEnd: _propTypes2['default'].func,
  onEnterStart: _propTypes2['default'].func,
  onEnterActive: _propTypes2['default'].func,
  onEnterEnd: _propTypes2['default'].func,
  onLeaveStart: _propTypes2['default'].func,
  onLeaveActive: _propTypes2['default'].func,
  onLeaveEnd: _propTypes2['default'].func
};

/**
 * `transitionSupport` is used for none transition test case.
 * Default we use browser transition event support check.
 */
function genCSSMotion(config) {
  var transitionSupport = config;
  var forwardRef = !!_react2['default'].forwardRef;

  if (typeof config === 'object') {
    transitionSupport = config.transitionSupport;
    forwardRef = 'forwardRef' in config ? config.forwardRef : forwardRef;
  }

  function isSupportTransition(props) {
    return !!(props.motionName && transitionSupport);
  }

  var CSSMotion = function (_React$Component) {
    (0, _inherits3['default'])(CSSMotion, _React$Component);

    function CSSMotion() {
      (0, _classCallCheck3['default'])(this, CSSMotion);

      var _this = (0, _possibleConstructorReturn3['default'])(this, (CSSMotion.__proto__ || Object.getPrototypeOf(CSSMotion)).call(this));

      _this.onDomUpdate = function () {
        var _this$state = _this.state,
            status = _this$state.status,
            newStatus = _this$state.newStatus;
        var _this$props = _this.props,
            onAppearStart = _this$props.onAppearStart,
            onEnterStart = _this$props.onEnterStart,
            onLeaveStart = _this$props.onLeaveStart,
            onAppearActive = _this$props.onAppearActive,
            onEnterActive = _this$props.onEnterActive,
            onLeaveActive = _this$props.onLeaveActive,
            motionAppear = _this$props.motionAppear,
            motionEnter = _this$props.motionEnter,
            motionLeave = _this$props.motionLeave;


        if (!isSupportTransition(_this.props)) {
          return;
        }

        // Event injection
        var $ele = _this.getElement();
        if (_this.$cacheEle !== $ele) {
          _this.removeEventListener(_this.$cacheEle);
          _this.addEventListener($ele);
          _this.$cacheEle = $ele;
        }

        // Init status
        if (newStatus && status === STATUS_APPEAR && motionAppear) {
          _this.updateStatus(onAppearStart, null, null, function () {
            _this.updateActiveStatus(onAppearActive, STATUS_APPEAR);
          });
        } else if (newStatus && status === STATUS_ENTER && motionEnter) {
          _this.updateStatus(onEnterStart, null, null, function () {
            _this.updateActiveStatus(onEnterActive, STATUS_ENTER);
          });
        } else if (newStatus && status === STATUS_LEAVE && motionLeave) {
          _this.updateStatus(onLeaveStart, null, null, function () {
            _this.updateActiveStatus(onLeaveActive, STATUS_LEAVE);
          });
        }
      };

      _this.onMotionEnd = function (event) {
        var _this$state2 = _this.state,
            status = _this$state2.status,
            statusActive = _this$state2.statusActive;
        var _this$props2 = _this.props,
            onAppearEnd = _this$props2.onAppearEnd,
            onEnterEnd = _this$props2.onEnterEnd,
            onLeaveEnd = _this$props2.onLeaveEnd;

        if (status === STATUS_APPEAR && statusActive) {
          _this.updateStatus(onAppearEnd, { status: STATUS_NONE }, event);
        } else if (status === STATUS_ENTER && statusActive) {
          _this.updateStatus(onEnterEnd, { status: STATUS_NONE }, event);
        } else if (status === STATUS_LEAVE && statusActive) {
          _this.updateStatus(onLeaveEnd, { status: STATUS_NONE }, event);
        }
      };

      _this.setNodeRef = function (node) {
        var internalRef = _this.props.internalRef;

        _this.node = node;

        if (typeof internalRef === 'function') {
          internalRef(node);
        } else if (internalRef && 'current' in internalRef) {
          internalRef.current = node;
        }
      };

      _this.getElement = function () {
        return (0, _findDOMNode2['default'])(_this.node || _this);
      };

      _this.addEventListener = function ($ele) {
        if (!$ele) return;

        $ele.addEventListener(_motion.transitionEndName, _this.onMotionEnd);
        $ele.addEventListener(_motion.animationEndName, _this.onMotionEnd);
      };

      _this.removeEventListener = function ($ele) {
        if (!$ele) return;

        $ele.removeEventListener(_motion.transitionEndName, _this.onMotionEnd);
        $ele.removeEventListener(_motion.animationEndName, _this.onMotionEnd);
      };

      _this.updateStatus = function (styleFunc, additionalState, event, callback) {
        var statusStyle = styleFunc ? styleFunc(_this.getElement(), event) : null;

        if (statusStyle === false || _this._destroyed) return;

        var nextStep = void 0;
        if (callback) {
          nextStep = function nextStep() {
            _this.nextFrame(callback);
          };
        }

        _this.setState((0, _extends3['default'])({
          statusStyle: typeof statusStyle === 'object' ? statusStyle : null,
          newStatus: false
        }, additionalState), nextStep); // Trigger before next frame & after `componentDidMount`
      };

      _this.updateActiveStatus = function (styleFunc, currentStatus) {
        // `setState` use `postMessage` to trigger at the end of frame.
        // Let's use requestAnimationFrame to update new state in next frame.
        _this.nextFrame(function () {
          var status = _this.state.status;

          if (status !== currentStatus) return;

          _this.updateStatus(styleFunc, { statusActive: true });
        });
      };

      _this.nextFrame = function (func) {
        _this.cancelNextFrame();
        _this.raf = (0, _raf2['default'])(func);
      };

      _this.cancelNextFrame = function () {
        if (_this.raf) {
          _raf2['default'].cancel(_this.raf);
          _this.raf = null;
        }
      };

      _this.state = {
        status: STATUS_NONE,
        statusActive: false,
        newStatus: false,
        statusStyle: null
      };
      _this.$cacheEle = null;
      _this.node = null;
      _this.raf = null;
      return _this;
    }

    (0, _createClass3['default'])(CSSMotion, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.onDomUpdate();
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        this.onDomUpdate();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this._destroyed = true;
        this.removeEventListener(this.$cacheEle);
        this.cancelNextFrame();
      }
    }, {
      key: 'render',
      value: function render() {
        var _classNames;

        var _state = this.state,
            status = _state.status,
            statusActive = _state.statusActive,
            statusStyle = _state.statusStyle;
        var _props = this.props,
            children = _props.children,
            motionName = _props.motionName,
            visible = _props.visible,
            removeOnLeave = _props.removeOnLeave,
            leavedClassName = _props.leavedClassName,
            eventProps = _props.eventProps;


        if (!children) return null;

        if (status === STATUS_NONE || !isSupportTransition(this.props)) {
          if (visible) {
            return children((0, _extends3['default'])({}, eventProps), this.setNodeRef);
          } else if (!removeOnLeave) {
            return children((0, _extends3['default'])({}, eventProps, { className: leavedClassName }), this.setNodeRef);
          }

          return null;
        }

        return children((0, _extends3['default'])({}, eventProps, {
          className: (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, (0, _motion.getTransitionName)(motionName, status), status !== STATUS_NONE), (0, _defineProperty3['default'])(_classNames, (0, _motion.getTransitionName)(motionName, status + '-active'), status !== STATUS_NONE && statusActive), (0, _defineProperty3['default'])(_classNames, motionName, typeof motionName === 'string'), _classNames)),
          style: statusStyle
        }), this.setNodeRef);
      }
    }], [{
      key: 'getDerivedStateFromProps',
      value: function getDerivedStateFromProps(props, _ref) {
        var prevProps = _ref.prevProps,
            prevStatus = _ref.status;

        if (!isSupportTransition(props)) return {};

        var visible = props.visible,
            motionAppear = props.motionAppear,
            motionEnter = props.motionEnter,
            motionLeave = props.motionLeave,
            motionLeaveImmediately = props.motionLeaveImmediately;

        var newState = {
          prevProps: props
        };

        // Clean up status if prop set to false
        if (prevStatus === STATUS_APPEAR && !motionAppear || prevStatus === STATUS_ENTER && !motionEnter || prevStatus === STATUS_LEAVE && !motionLeave) {
          newState.status = STATUS_NONE;
          newState.statusActive = false;
          newState.newStatus = false;
        }

        // Appear
        if (!prevProps && visible && motionAppear) {
          newState.status = STATUS_APPEAR;
          newState.statusActive = false;
          newState.newStatus = true;
        }

        // Enter
        if (prevProps && !prevProps.visible && visible && motionEnter) {
          newState.status = STATUS_ENTER;
          newState.statusActive = false;
          newState.newStatus = true;
        }

        // Leave
        if (prevProps && prevProps.visible && !visible && motionLeave || !prevProps && motionLeaveImmediately && !visible && motionLeave) {
          newState.status = STATUS_LEAVE;
          newState.statusActive = false;
          newState.newStatus = true;
        }

        return newState;
      }
    }]);
    return CSSMotion;
  }(_react2['default'].Component);

  CSSMotion.propTypes = (0, _extends3['default'])({}, MotionPropTypes, {

    internalRef: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func])
  });
  CSSMotion.defaultProps = {
    visible: true,
    motionEnter: true,
    motionAppear: true,
    motionLeave: true,
    removeOnLeave: true
  };


  (0, _reactLifecyclesCompat.polyfill)(CSSMotion);

  if (!forwardRef) {
    return CSSMotion;
  }

  return _react2['default'].forwardRef(function (props, ref) {
    return _react2['default'].createElement(CSSMotion, (0, _extends3['default'])({ internalRef: ref }, props));
  });
}

exports['default'] = genCSSMotion(_motion.supportTransition);

/***/ }),

/***/ 2025:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVendorPrefixes = getVendorPrefixes;
exports.getVendorPrefixedEventName = getVendorPrefixedEventName;
exports.getTransitionName = getTransitionName;
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

// ================= Transition =================
// Event wrapper. Copy from react source code
function makePrefixMap(styleProp, eventName) {
  var prefixes = {};

  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
  prefixes['Webkit' + styleProp] = 'webkit' + eventName;
  prefixes['Moz' + styleProp] = 'moz' + eventName;
  prefixes['ms' + styleProp] = 'MS' + eventName;
  prefixes['O' + styleProp] = 'o' + eventName.toLowerCase();

  return prefixes;
}

function getVendorPrefixes(domSupport, win) {
  var prefixes = {
    animationend: makePrefixMap('Animation', 'AnimationEnd'),
    transitionend: makePrefixMap('Transition', 'TransitionEnd')
  };

  if (domSupport) {
    if (!('AnimationEvent' in win)) {
      delete prefixes.animationend.animation;
    }

    if (!('TransitionEvent' in win)) {
      delete prefixes.transitionend.transition;
    }
  }

  return prefixes;
}

var vendorPrefixes = getVendorPrefixes(canUseDOM, typeof window !== 'undefined' ? window : {});

var style = {};

if (canUseDOM) {
  style = document.createElement('div').style;
}

var prefixedEventNames = {};

function getVendorPrefixedEventName(eventName) {
  if (prefixedEventNames[eventName]) {
    return prefixedEventNames[eventName];
  }

  var prefixMap = vendorPrefixes[eventName];

  if (prefixMap) {
    var stylePropList = Object.keys(prefixMap);
    var len = stylePropList.length;
    for (var i = 0; i < len; i += 1) {
      var styleProp = stylePropList[i];
      if (Object.prototype.hasOwnProperty.call(prefixMap, styleProp) && styleProp in style) {
        prefixedEventNames[eventName] = prefixMap[styleProp];
        return prefixedEventNames[eventName];
      }
    }
  }

  return '';
}

var animationEndName = exports.animationEndName = getVendorPrefixedEventName('animationend');
var transitionEndName = exports.transitionEndName = getVendorPrefixedEventName('transitionend');
var supportTransition = exports.supportTransition = !!(animationEndName && transitionEndName);

function getTransitionName(transitionName, transitionType) {
  if (!transitionName) return null;

  if (typeof transitionName === 'object') {
    var type = transitionType.replace(/-\w/g, function (match) {
      return match[1].toUpperCase();
    });
    return transitionName[type];
  }

  return transitionName + '-' + transitionType;
}

/***/ }),

/***/ 2026:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeContext = void 0;

var _createReactContext = _interopRequireDefault(__webpack_require__(319));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TreeContext = (0, _createReactContext.default)(null);
exports.TreeContext = TreeContext;

/***/ }),

/***/ 2027:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFullKeyList = getFullKeyList;
exports.calcRangeKeys = calcRangeKeys;
exports.convertDirectoryKeysToNodes = convertDirectoryKeysToNodes;
exports.getFullKeyListByTreeData = getFullKeyListByTreeData;

var _util = __webpack_require__(1720);

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Record;

(function (Record) {
  Record[Record["None"] = 0] = "None";
  Record[Record["Start"] = 1] = "Start";
  Record[Record["End"] = 2] = "End";
})(Record || (Record = {})); // TODO: Move this logic into `rc-tree`


function traverseNodesKey(rootChildren, callback) {
  var nodeList = (0, _util.getNodeChildren)(rootChildren) || [];

  function processNode(node) {
    var key = node.key,
        children = node.props.children;

    if (callback(key, node) !== false) {
      traverseNodesKey(children, callback);
    }
  }

  nodeList.forEach(processNode);
}

function getFullKeyList(children) {
  var _convertTreeToEntitie = (0, _util.convertTreeToEntities)(children),
      keyEntities = _convertTreeToEntitie.keyEntities;

  return Object.keys(keyEntities);
}
/** 计算选中范围，只考虑expanded情况以优化性能 */


function calcRangeKeys(rootChildren, expandedKeys, startKey, endKey) {
  var keys = [];
  var record = Record.None;

  if (startKey && startKey === endKey) {
    return [startKey];
  }

  if (!startKey || !endKey) {
    return [];
  }

  function matchKey(key) {
    return key === startKey || key === endKey;
  }

  traverseNodesKey(rootChildren, function (key) {
    if (record === Record.End) {
      return false;
    }

    if (matchKey(key)) {
      // Match test
      keys.push(key);

      if (record === Record.None) {
        record = Record.Start;
      } else if (record === Record.Start) {
        record = Record.End;
        return false;
      }
    } else if (record === Record.Start) {
      // Append selection
      keys.push(key);
    }

    if (expandedKeys.indexOf(key) === -1) {
      return false;
    }

    return true;
  });
  return keys;
}

function convertDirectoryKeysToNodes(rootChildren, keys) {
  var restKeys = _toConsumableArray(keys);

  var nodes = [];
  traverseNodesKey(rootChildren, function (key, node) {
    var index = restKeys.indexOf(key);

    if (index !== -1) {
      nodes.push(node);
      restKeys.splice(index, 1);
    }

    return !!restKeys.length;
  });
  return nodes;
}

function getFullKeyListByTreeData(treeData) {
  var keys = [];
  (treeData || []).forEach(function (item) {
    keys.push(item.key);

    if (item.children) {
      keys = [].concat(_toConsumableArray(keys), _toConsumableArray(getFullKeyListByTreeData(item.children)));
    }
  });
  return keys;
}
//# sourceMappingURL=util.js.map


/***/ }),

/***/ 2028:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2029);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(318)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 2029:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(317)(true);
// imports


// module
exports.push([module.i, ".yslcheckbox{-ms-flex-direction:row;flex-direction:row}.yslcheckbox,.yslcheckbox2{display:-ms-flexbox;display:flex}.yslcheckbox2{-ms-flex-direction:row-reverse;flex-direction:row-reverse}.heigth459px{max-height:459px}.private-listtwo{overflow-y:auto;overflow-x:hidden}.private-listtwo::-webkit-scrollbar{width:8px;height:8px}.private-listtwo::-webkit-scrollbar-thumb{background-color:#e3ebf4;-webkit-box-shadow:0 0 #000;box-shadow:0 0 #000}.private-listtwo::-webkit-scrollbar-track{border-radius:3px;-webkit-box-shadow:inset 0 0 6px transparent;background-color:#fff}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/src/modules/courses/coursesDetail/chapterupdate.css"],"names":[],"mappings":"AAAA,aAGO,uBAAwB,AACpB,kBAAoB,CAC3B,AACJ,2BALO,oBAAqB,AACrB,YAAc,CAUpB,AAND,cAGQ,+BAAgC,AAC5B,0BAA4B,CAEvC,AACD,aACI,gBAAiB,CACpB,AACD,iBACI,gBAAiB,AACjB,iBAAmB,CACtB,AAED,oCACI,UAAW,AACX,UAAY,CACf,AAGD,0CACI,yBAA0B,AAC1B,4BAAkC,AAC1B,mBAA0B,CACrC,AAGD,0CACI,kBAAkB,AAClB,6CAAmD,AACnD,qBAAwB,CAC3B","file":"chapterupdate.css","sourcesContent":[".yslcheckbox{\n       display: -ms-flexbox;\n       display: flex;\n       -ms-flex-direction: row;\n           flex-direction: row;\n   }\n.yslcheckbox2{\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: row-reverse;\n            flex-direction: row-reverse;\n\n}\n.heigth459px{\n    max-height:459px;\n}\n.private-listtwo{\n    overflow-y: auto;\n    overflow-x: hidden;\n}\n/*滚动条*/\n.private-listtwo::-webkit-scrollbar {\n    width: 8px;\n    height: 8px;\n}\n\n\n.private-listtwo::-webkit-scrollbar-thumb {\n    background-color: #E3EBF4;\n    -webkit-box-shadow: 0px 0px black;\n            box-shadow: 0px 0px black;\n}\n\n\n.private-listtwo::-webkit-scrollbar-track {\n    border-radius:3px;\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);\n    background-color: white;\n}"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 3299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_loadable__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_loadable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_loadable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Loading__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_courses_shixunHomework_Guide__ = __webpack_require__(4744);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__coursesDetail_CoursesBanner__ = __webpack_require__(1809);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__coursesDetail_CoursesLeftNav__ = __webpack_require__(1810);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}//业务组件
//普通作业
var CommonWork=__WEBPACK_IMPORTED_MODULE_2_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(51/* duplicate */).then(__webpack_require__.bind(null, 2114));},loading:__WEBPACK_IMPORTED_MODULE_3__Loading__["a" /* default */]});var GroupWork=__WEBPACK_IMPORTED_MODULE_2_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(51/* duplicate */).then(__webpack_require__.bind(null, 2114));},loading:__WEBPACK_IMPORTED_MODULE_3__Loading__["a" /* default */]});// 讨论
var Boards=__WEBPACK_IMPORTED_MODULE_2_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(186).then(__webpack_require__.bind(null, 3430));},loading:__WEBPACK_IMPORTED_MODULE_3__Loading__["a" /* default */]});//教师列表
var TeacherList=__WEBPACK_IMPORTED_MODULE_2_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(128).then(__webpack_require__.bind(null, 3133));},loading:__WEBPACK_IMPORTED_MODULE_3__Loading__["a" /* default */]});//学生列表
var StudentsList=__WEBPACK_IMPORTED_MODULE_2_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(80).then(__webpack_require__.bind(null, 3434));},loading:__WEBPACK_IMPORTED_MODULE_3__Loading__["a" /* default */]});//分班列表
var CourseGroupList=__WEBPACK_IMPORTED_MODULE_2_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(78).then(__webpack_require__.bind(null, 4753));},loading:__WEBPACK_IMPORTED_MODULE_3__Loading__["a" /* default */]});var Eduinforms=__WEBPACK_IMPORTED_MODULE_2_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(114).then(__webpack_require__.bind(null, 4755));},loading:__WEBPACK_IMPORTED_MODULE_3__Loading__["a" /* default */]});//2019.10.29 统计
var Statistics=__WEBPACK_IMPORTED_MODULE_2_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(113).then(__webpack_require__.bind(null, 4758));},loading:__WEBPACK_IMPORTED_MODULE_3__Loading__["a" /* default */]});var Elearning=__WEBPACK_IMPORTED_MODULE_2_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(126).then(__webpack_require__.bind(null, 4764));},loading:__WEBPACK_IMPORTED_MODULE_3__Loading__["a" /* default */]});//
var Exercise=__WEBPACK_IMPORTED_MODULE_2_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(151).then(__webpack_require__.bind(null, 2308));},loading:__WEBPACK_IMPORTED_MODULE_3__Loading__["a" /* default */]});//
var Poll=__WEBPACK_IMPORTED_MODULE_2_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(150).then(__webpack_require__.bind(null, 3141));},loading:__WEBPACK_IMPORTED_MODULE_3__Loading__["a" /* default */]});// 资源
var Resourcelist=__WEBPACK_IMPORTED_MODULE_2_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(94).then(__webpack_require__.bind(null, 3435));},loading:__WEBPACK_IMPORTED_MODULE_3__Loading__["a" /* default */]});// 视频
var CourseVideo=__WEBPACK_IMPORTED_MODULE_2_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(90).then(__webpack_require__.bind(null, 4768));},loading:__WEBPACK_IMPORTED_MODULE_3__Loading__["a" /* default */]});//实训作业
var ShixunHomework=__WEBPACK_IMPORTED_MODULE_2_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(140).then(__webpack_require__.bind(null, 3142));},loading:__WEBPACK_IMPORTED_MODULE_3__Loading__["a" /* default */]});var GraduationTopics=__WEBPACK_IMPORTED_MODULE_2_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(187).then(__webpack_require__.bind(null, 3145));},loading:__WEBPACK_IMPORTED_MODULE_3__Loading__["a" /* default */]});var GraduationTasks=__WEBPACK_IMPORTED_MODULE_2_react_loadable___default()({loader:function loader(){return __webpack_require__.e/* import() */(93).then(__webpack_require__.bind(null, 3455));},loading:__WEBPACK_IMPORTED_MODULE_3__Loading__["a" /* default */]});var ListPageIndex=function(_Component){_inherits(ListPageIndex,_Component);function ListPageIndex(props){_classCallCheck(this,ListPageIndex);var _this=_possibleConstructorReturn(this,(ListPageIndex.__proto__||Object.getPrototypeOf(ListPageIndex)).call(this,props));_this.setwindowlocal=function(bool){window.localStorage.setItem('yslGuideone',bool);try{if(bool==="true"){_this.setState({yslGuideone:true});}else{_this.setState({yslGuideone:false});}}catch(e){// console.log(e);
_this.setState({yslGuideone:false});}};_this.ispostexcellenttype=function(excellent){_this.setState({isexcellent:excellent});};_this.state={yslGuideone:undefined,yslElearning:false,isexcellent:false};return _this;}_createClass(ListPageIndex,[{key:'comyslElearning',value:function comyslElearning(bool){if(bool===true){this.setState({yslElearning:true});}else{this.setState({yslElearning:false});}}},{key:'componentDidMount',value:function componentDidMount(){// console.log("77");
var yslGuideone=window.localStorage.getItem('yslGuideone');// console.log("78");
// console.log(yslGuideone);
try{if(yslGuideone==="true"){// console.log("true 字符串");
this.setState({yslGuideone:true});}else{this.setState({yslGuideone:false});// console.log("false 字符串");
}}catch(e){console.log(e);this.setState({yslGuideone:false});}}//
// getleftNavid=(navid,newselectnavid)=>{
//   console.log(navid,newselectnavid)
//   this.setState({
//     navkey:navid,
//     navttype:newselectnavid
//   })
// }
},{key:'componentWillUnmount',value:function componentWillUnmount(){// window.localStorage.setItem('yslGuideone', "false");
}},{key:'render',value:function render(){var _this2=this;var yslGuideone=this.state.yslGuideone;// console.log("98");
// console.log(yslGuideone);
// console.log(this.props.isAdmin());
// // var yslGuideones = window.sessionStorage.getItem('yslGuideone');
// console.log(this.props);
// console.log(this.props.location.search);
return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'newMain clearfix'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__coursesDetail_CoursesBanner__["a" /* default */],Object.assign({},this.props,{ispostexcellenttype:function ispostexcellenttype(excellent){return _this2.ispostexcellenttype(excellent);}})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'educontent clearfix',style:{flex:"1 0 auto"}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'stud-class-set'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'news'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'edu-class-inner container clearfix'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'member for-content-0 for-content'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'people clearfix mb60'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:"with22 fl setleft",style:{width:'264px',minHeight:'500px'}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__coursesDetail_CoursesLeftNav__["a" /* default */],Object.assign({},this.props,this.state,{comyslElearning:function comyslElearning(i){return _this2.comyslElearning(i);}}))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'with78 fl'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:"ml20 clearfix"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["f" /* Switch */],this.props,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/courses/:coursesId/common_homeworks/:category_id',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(CommonWork,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/courses/:coursesId/group_homeworks/:category_id',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(CommonWork,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{exact:true,path:'/courses/:coursesId/boards/:boardId',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Boards,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/courses/:coursesId/course_videos',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(CourseVideo,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/courses/:coursesId/teachers',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(TeacherList,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/courses/:coursesId/students',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(StudentsList,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/courses/:coursesId/course_groups/:course_group_id',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(StudentsList,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/courses/:coursesId/course_groups',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(CourseGroupList,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/courses/:coursesId/exercises/:Id',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Exercise,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/courses/:coursesId/polls/:Id',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Poll,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/courses/:coursesId/shixun_homework/:category_id',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ShixunHomework,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/courses/:coursesId/statistics',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Statistics,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/courses/:coursesId/informs',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Eduinforms,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/courses/:coursesId/online_learning',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Elearning,Object.assign({},_this2.props,props,_this2.state,{comyslElearning:function comyslElearning(i){return _this2.comyslElearning(i);}}));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/courses/:coursesId/shixun_homeworks/:main_id',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ShixunHomework,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/courses/:coursesId/files/:main_id',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Resourcelist,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/courses/:coursesId/file/:Id',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Resourcelist,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/courses/:coursesId/graduation_topics/:Id',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(GraduationTopics,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/courses/:coursesId/graduation_tasks/:Id',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(GraduationTasks,Object.assign({},_this2.props,props,_this2.state));}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["e" /* Route */],{path:'/courses/:coursesId',render:function render(props){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(StudentsList,Object.assign({},_this2.props,props,_this2.state));}}))))))))))));}}]);return ListPageIndex;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (ListPageIndex);

/***/ }),

/***/ 4744:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__guide_css__ = __webpack_require__(4745);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__guide_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__guide_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__images_guideimg_guihome1_png__ = __webpack_require__(4747);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__images_guideimg_guihome1_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__images_guideimg_guihome1_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__images_guideimg_guihome2_jpg__ = __webpack_require__(4748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__images_guideimg_guihome2_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__images_guideimg_guihome2_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__images_guideimg_guihome3_jpg__ = __webpack_require__(4749);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__images_guideimg_guihome3_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__images_guideimg_guihome3_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__images_guideimg_guihome4_jpg__ = __webpack_require__(4750);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__images_guideimg_guihome4_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__images_guideimg_guihome4_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__images_guideimg_guihome5_jpg__ = __webpack_require__(4751);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__images_guideimg_guihome5_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__images_guideimg_guihome5_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__images_guideimg_guihome6_jpg__ = __webpack_require__(4752);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__images_guideimg_guihome6_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__images_guideimg_guihome6_jpg__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}// import guihome6 from "../../../images/guideimg/guihome6.png";
// import guihome7 from "../../../images/guideimg/guihome7.png";
var Guide=function(_Component){_inherits(Guide,_Component);function Guide(props){_classCallCheck(this,Guide);var _this=_possibleConstructorReturn(this,(Guide.__proto__||Object.getPrototypeOf(Guide)).call(this,props));_this.thissetPage=function(i){_this.setState({page:i});if(i===7){_this.props.setwindowlocal("false");}};_this.state={pingmuz:"",page:1,mywidth:1};return _this;}_createClass(Guide,[{key:"componentDidMount",value:function componentDidMount(){console.log("GuideGuideGuideGuide加载了");// 1366x768
// var mywidthone=7;
var mywidthone=0;if(window.screen.width===1024){mywidthone=1;}else if(window.screen.width===1280){mywidthone=2;}else if(window.screen.width===1440){mywidthone=3;}else if(window.screen.width===1680){mywidthone=4;}else if(window.screen.width===1920){mywidthone=5;}else if(window.screen.width===1366){mywidthone=6;}else if(window.screen.width===1600){mywidthone=7;}else{mywidthone=5;}this.setState({mywidth:mywidthone});}},{key:"render",value:function render(){var _this2=this;var _state=this.state,page=_state.page,mywidth=_state.mywidth;// console.log("屏幕宽度");
console.log(window.screen.width);console.log(mywidth);return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"guide-shadow"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("style",null,"\n\t\t\t\t\t\tbody {\n    overflow: hidden !important;\n    }\n\t\t\t\t\t\t"),page===1?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"guide-content"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img",{className:mywidth===1?"ysldiv11024":mywidth===2?"ysldiv11280":mywidth===3?"ysldiv11440":mywidth===4?"ysldiv11680":mywidth===5?"ysldiv11900":mywidth===6?"ysldiv11366":mywidth===7?"ysldiv11600":"ysldiv11900",src:__WEBPACK_IMPORTED_MODULE_2__images_guideimg_guihome1_png___default.a,onClick:function onClick(i){return _this2.thissetPage(2);}})):"",page===2?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"guide-content"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img",{className:mywidth===1?"ysldiv21024":mywidth===2?"ysldiv21280":mywidth===3?"ysldiv21440":mywidth===4?"ysldiv21680":mywidth===5?"ysldiv21900":mywidth===6?"ysldiv21366":mywidth===7?"ysldiv21600":"ysldiv21900",src:__WEBPACK_IMPORTED_MODULE_3__images_guideimg_guihome2_jpg___default.a,onClick:function onClick(i){return _this2.thissetPage(3);}})):"",page===3?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"guide-content"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img",{className:mywidth===1?"ysldiv31024":mywidth===2?"ysldiv31280":mywidth===3?"ysldiv31440":mywidth===4?"ysldiv31680":mywidth===5?"ysldiv31900":mywidth===6?"ysldiv31366":mywidth===7?"ysldiv31600":"ysldiv31900",src:__WEBPACK_IMPORTED_MODULE_4__images_guideimg_guihome3_jpg___default.a,onClick:function onClick(i){return _this2.thissetPage(4);}})):"",page===4?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"guide-content"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img",{className:mywidth===1?"ysldiv41024":mywidth===2?"ysldiv41280":mywidth===3?"ysldiv41440":mywidth===4?"ysldiv41680":mywidth===5?"ysldiv41900":mywidth===6?"ysldiv41366":mywidth===7?"ysldiv41600":"ysldiv41900",src:__WEBPACK_IMPORTED_MODULE_5__images_guideimg_guihome4_jpg___default.a,onClick:function onClick(i){return _this2.thissetPage(5);}})):"",page===5?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"guide-content"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img",{className:mywidth===1?"ysldiv51024":mywidth===2?"ysldiv51280":mywidth===3?"ysldiv51440":mywidth===4?"ysldiv51680":mywidth===5?"ysldiv51900":mywidth===6?"ysldiv51366":mywidth===7?"ysldiv51600":"ysldiv51900",src:__WEBPACK_IMPORTED_MODULE_6__images_guideimg_guihome5_jpg___default.a,onClick:function onClick(i){return _this2.thissetPage(6);}})):"",page===6?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"guide-content"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img",{className:mywidth===1?"ysldiv61024":mywidth===2?"ysldiv61280":mywidth===3?"ysldiv61440":mywidth===4?"ysldiv61680":mywidth===5?"ysldiv61900":mywidth===6?"ysldiv61366":mywidth===7?"ysldiv61600":"ysldiv61900",src:__WEBPACK_IMPORTED_MODULE_7__images_guideimg_guihome6_jpg___default.a,onClick:function onClick(i){return _this2.thissetPage(7);}})):"");}}]);return Guide;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* unused harmony default export */ var _unused_webpack_default_export = (Guide);

/***/ }),

/***/ 4745:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4746);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(318)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 4746:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(317)(true);
// imports


// module
exports.push([module.i, ".guide-container{position:relative}.guide-shadow{position:fixed;top:0;z-index:99999;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.4);display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}.guide-content,.guide-shadow{-webkit-transition:all .3s ease-out;-o-transition:all .3s ease-out;transition:all .3s ease-out}.guide-content{position:absolute;display:block;z-index:999991;width:100%;height:100%;border-radius:4px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;border:1px solid rgba(0,0,0,.5);-webkit-box-shadow:0 2px 15px rgba(0,0,0,.4);box-shadow:0 2px 15px rgba(0,0,0,.4)}.guiimgconte{width:100%;height:13%;margin-top:12%;margin-left:73%}.guiimgcontee{width:100%;display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;margin-top:2%}.gimgtwo{height:30%;margin-left:8%;margin-top:2%}.guide-icon-no{position:absolute;border:2px solid #fff;border-radius:50%;z-index:999998;color:#fff;background:-webkit-gradient(linear,left top,left bottom,from(#409eff),to(#007fff));background:-webkit-linear-gradient(top,#409eff,#007fff);background:-o-linear-gradient(top,#409eff 0,#007fff 100%);background:linear-gradient(180deg,#409eff 0,#007fff);font-weight:6000;padding:1px;font-size:13px;line-height:20px;font-family:Arial,verdana,tahoma;text-shadow:1px 1px 1px rgba(0,0,0,.3);text-align:center;-webkit-box-shadow:0 2px 5px rgba(0,0,0,.4);box-shadow:0 2px 5px rgba(0,0,0,.4);-webkit-transition:all .3s ease-out;-o-transition:all .3s ease-out;transition:all .3s ease-out}.guide-tooltip{position:absolute;border-radius:5px;z-index:999995;display:block;opacity:1;padding:15px 25px 15px 15px;-webkit-box-shadow:0 1px 10px rgba(0,0,0,.4);box-shadow:0 1px 10px rgba(0,0,0,.4);-webkit-transition:opacity .1s ease-out;-o-transition:opacity .1s ease-out;transition:opacity .1s ease-out;min-width:200px;max-width:250px;background-color:#fff}.guide-tooltip div:first-child{font:14px/normal sans-serif;color:#2d2d2d;font-weight:400;zoom:1;margin-bottom:0}.guide-tooltip .audio-play{width:26px;height:18px;background-size:20px 19px;background-position:7px -2px;background-image:url(\"http://fanyi.bdstatic.com/static/translation/img/translate/output/sound2x_d6f553d.gif\")}.guide-tooltip .audio-noplay,.guide-tooltip .audio-play{position:absolute;top:17px;z-index:999999;right:5px;background-repeat:no-repeat}.guide-tooltip .audio-noplay{background-position:0 -1046px;height:16px;width:19px;background-image:url(\"http://fanyi.bdstatic.com/static/translation/sprite/images/normal/index-sc413d90635_65ba9b0.png\")}.guide-tooltip .guide-arrow{position:absolute;content:\"\";border:5px solid #fff}.guide-tooltip .top{top:-10px;border-right-color:transparent;border-bottom-color:#fff}.guide-tooltip .left,.guide-tooltip .top{border-top-color:transparent;border-left-color:transparent}.guide-tooltip .left{left:-10px;top:10px;border-right-color:#fff;border-bottom-color:transparent}.guide-tooltip .bottom{bottom:-10px;left:10px;border-top-color:#fff;border-left-color:transparent}.guide-tooltip .bottom,.guide-tooltip .right{border-right-color:transparent;border-bottom-color:transparent}.guide-tooltip .right{right:-10px;top:10px;border-top-color:transparent;border-left-color:#fff}.guide-bullets ul{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;padding:0}.guide-bullets ul li{list-style:none}.guide-bullets ul li div{width:8px;height:8px;border-radius:50%;margin:2px;background-color:#ccc;cursor:pointer}.guide-bullets .active-dot{background-color:#409eff}.guide-button-group{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;margin-top:5px}.guide-button{background-color:#409eff;border-color:#409eff;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;color:#fff;line-height:1;font-size:13px;outline:none;margin:0;padding:4px 7px}.guide-button-total{border-radius:3px}.guide-button-left{border-bottom-left-radius:3px;border-top-left-radius:3px;border-right-color:hsla(0,0%,100%,.5)}.guide-button-right{border-bottom-right-radius:3px;border-top-right-radius:3px}.guide-button-disabled{background-color:#a0cfff;border-color:#a0cfff;cursor:not-allowed}.ysldiv11900{margin-top:10%;margin-left:17%;margin-right:14%}.ysldiv11680{margin-top:11.5%;margin-left:13%;margin-right:9%}.ysldiv11600{margin-top:12%;margin-left:11%;margin-right:7%}.ysldiv11440{margin-top:14%;margin-left:7%;margin-right:3%}.ysldiv11280{margin-top:16%;margin-left:2%;margin-right:0;height:60%}.ysldiv11366{margin-top:15%;margin-left:5%;margin-right:2%;height:60%}.ysldiv11024{margin-top:20%;margin-left:0;margin-right:-1%;height:59%}.ysldiv21900{margin-top:10%;margin-left:48%;margin-right:25%;height:18%}.ysldiv21680{margin-top:11.5%;margin-left:45%;margin-right:20%}.ysldiv21600{margin-top:12%;margin-left:47%;margin-right:20%}.ysldiv21440{margin-top:14%;margin-left:47%;margin-right:17%}.ysldiv21280{margin-top:16%;height:25%}.ysldiv21280,.ysldiv21366{margin-left:51%;margin-right:14%}.ysldiv21366{margin-top:15%;height:23%}.ysldiv21024{margin-top:20%;margin-left:61%;margin-right:0}.ysldiv31900{margin-top:10%;margin-left:19%;margin-right:45%}.ysldiv31680{margin-top:11.5%;margin-left:14%;margin-right:45%}.ysldiv31600{margin-top:12%;margin-left:12%;margin-right:45%}.ysldiv31440{margin-top:13.5%;margin-left:8%;margin-right:44%}.ysldiv31280{margin-top:15%;margin-left:3%;margin-right:44%}.ysldiv31366{margin-top:14%;margin-left:6%;margin-right:43%}.ysldiv31024{margin-top:19%;margin-left:1%;margin-right:34%}.ysldiv41900{margin-top:16%;margin-left:19%;margin-right:29%}.ysldiv41680{margin-top:18%;margin-left:14%;margin-right:24%}.ysldiv41600{margin-top:19%;margin-left:12%;margin-right:23%}.ysldiv41440{margin-top:21%;margin-left:8%;margin-right:20%}.ysldiv41280{margin-top:24%;margin-left:3%;margin-right:17%}.ysldiv41366{margin-top:22%;margin-left:6%;margin-right:20%}.ysldiv41024{margin-top:29%;margin-left:0;margin-right:2%}.ysldiv51900{margin-top:16%;margin-left:18%;margin-right:42%}.ysldiv51680{margin-top:18%;margin-left:13%;margin-right:40%}.ysldiv51600{margin-top:19%;margin-left:11%;margin-right:39%}.ysldiv51440{margin-top:21%;margin-left:7%;margin-right:39%}.ysldiv51280{margin-top:24%;margin-left:2%;margin-right:38%}.ysldiv51366{margin-top:22%;margin-left:5%;margin-right:39%}.ysldiv51024{margin-top:30%;margin-right:27%}.ysldiv61900{margin-top:16%;margin-left:34%;margin-right:19%}.ysldiv61680{margin-top:18%;margin-left:31%;margin-right:14%}.ysldiv61600{margin-top:19%;margin-left:30%;margin-right:12%}.ysldiv61440{margin-top:21%;margin-left:28%;margin-right:8%}.ysldiv61280{margin-top:24%;margin-left:25%;margin-right:3%;height:53%}.ysldiv61366{margin-top:22%;margin-left:26%;margin-right:6%;height:53%}.ysldiv61024{margin-top:31%;margin-left:27%;margin-right:0;height:40%}.ysldiv71900{margin-top:16%;margin-left:34%;margin-right:19%}.ysldiv71680{margin-top:18%;margin-left:31%;margin-right:14%}.ysldiv71600{margin-top:19%;margin-left:30%;margin-right:12%}.ysldiv71440{margin-top:21%;margin-left:28%;margin-right:8%}.ysldiv71280{margin-top:24%;margin-left:25%;margin-right:3%;height:53%}.ysldiv71366{margin-top:22%;margin-left:26%;margin-right:6%;height:53%}.ysldiv71024{margin-top:31%;margin-left:27%;margin-right:0;height:40%}", "", {"version":3,"sources":["/Users/hs/forgeplus-react/src/modules/courses/shixunHomework/guide.css"],"names":[],"mappings":"AAUA,iBACE,iBAAmB,CACpB,AAED,cACE,eAAgB,AAChB,MAAM,AACN,cAAe,AACf,OAAQ,AACR,QAAS,AACT,SAAU,AAEV,gCAAsC,AAItC,oBAAqB,AACrB,aAAc,AACd,qBAAsB,AAClB,sBAAwB,CAC7B,AAED,6BATE,oCAAqC,AACrC,+BAAgC,AAChC,2BAA6B,CAyB9B,AAlBD,eACE,kBAAmB,AACnB,cAAe,AACf,eAAgB,AAChB,WAAY,AACZ,YAAa,AACb,kBAAmB,AAInB,oBAAqB,AACrB,aAAc,AACd,0BAA0B,AACtB,sBAAsB,AAC1B,gCAAoC,AACpC,6CAAiD,AACzC,oCAAyC,CAElD,AACD,aACE,WAAY,AACZ,WAAY,AACZ,eAAgB,AAChB,eAAiB,CAClB,AAID,cACE,WAAY,AACZ,oBAAqB,AACrB,aAAc,AACd,kBAAkB,AACd,yBAAyB,AAC7B,aAAe,CAChB,AACD,SACE,WAAY,AACZ,eAAgB,AAChB,aAAe,CAChB,AACD,eACE,kBAAmB,AACnB,sBAAuB,AACvB,kBAAmB,AACnB,eAAgB,AAChB,WAAY,AACZ,mFAAqF,AACrF,wDAAiE,AACjE,0DAA4D,AAC5D,qDAA+D,AAC/D,iBAAkB,AAClB,YAAa,AACb,eAAgB,AAChB,iBAAkB,AAClB,iCAAkC,AAClC,uCAAwC,AACxC,kBAAmB,AACnB,4CAA6C,AACrC,oCAAqC,AAC7C,oCAAqC,AACrC,+BAAgC,AAChC,2BAA6B,CAC9B,AAED,eACE,kBAAmB,AACnB,kBAAmB,AACnB,eAAgB,AAChB,cAAe,AACf,UAAW,AACX,4BAA6B,AAC7B,6CAAiD,AACzC,qCAAyC,AACjD,wCAAyC,AACzC,mCAAoC,AACpC,gCAAiC,AACjC,gBAAiB,AACjB,gBAAiB,AACjB,qBAAuB,CACxB,AAED,+BACE,4BAA6B,AAC7B,cAAe,AACf,gBAAiB,AACjB,OAAQ,AACR,eAAiB,CAClB,AAED,2BAKE,WAAY,AACZ,YAAa,AACb,0BAA2B,AAE3B,6BAA8B,AAC9B,6GAA8G,CAC/G,AAED,wDAZE,kBAAmB,AACnB,SAAU,AACV,eAAgB,AAChB,UAAW,AAIX,2BAA6B,CAe9B,AAVD,6BAME,8BAA+B,AAC/B,YAAa,AACb,WAAY,AACZ,uHAAwH,CACzH,AAED,4BACE,kBAAmB,AACnB,WAAY,AACZ,qBAAuB,CACxB,AAED,oBACE,UAAW,AAEX,+BAAgC,AAChC,wBAA0B,CAE3B,AAED,yCANE,6BAA8B,AAG9B,6BAA+B,CAUhC,AAPD,qBACE,WAAY,AACZ,SAAU,AAEV,wBAAyB,AACzB,+BAAiC,CAElC,AAED,uBACE,aAAc,AACd,UAAW,AACX,sBAAuB,AAGvB,6BAA+B,CAChC,AAED,6CALE,+BAAgC,AAChC,+BAAiC,CAWlC,AAPD,sBACE,YAAa,AACb,SAAU,AACV,6BAA8B,AAG9B,sBAAwB,CACzB,AAED,kBACE,oBAAqB,AACrB,aAAc,AACd,qBAAsB,AAClB,uBAAwB,AAC5B,SAAW,CACZ,AACD,qBACE,eAAiB,CAClB,AACD,yBACE,UAAW,AACX,WAAY,AACZ,kBAAmB,AACnB,WAAY,AACZ,sBAAuB,AACvB,cAAgB,CACjB,AACD,2BACE,wBAAyB,CAC1B,AAED,oBACE,oBAAqB,AACrB,aAAc,AACd,sBAAuB,AACnB,8BAA+B,AACnC,cAAgB,CACjB,AAED,cACE,yBAA0B,AAC1B,qBAAsB,AACtB,8BAA+B,AACvB,sBAAuB,AAC/B,eAAgB,AAChB,WAAY,AACZ,cAAe,AACf,eAAgB,AAChB,aAAc,AACd,SAAU,AACV,eAAiB,CAClB,AAED,oBACE,iBAAmB,CACpB,AAED,mBACE,8BAA+B,AAC/B,2BAA4B,AAC5B,qCAAsC,CACvC,AAED,oBACE,+BAAgC,AAChC,2BAA6B,CAC9B,AAED,uBACE,yBAA0B,AAC1B,qBAAsB,AACtB,kBAAoB,CACrB,AAKD,aACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAkB,CAEnB,AACD,aACI,iBAAkB,AAClB,gBAAiB,AACjB,eAAiB,CACpB,AACD,aACE,eAAgB,AAChB,gBAAiB,AACjB,eAAiB,CAClB,AACD,aACE,eAAgB,AAChB,eAAgB,AAChB,eAAiB,CAClB,AAED,aACE,eAAgB,AAChB,eAAgB,AAChB,eAAiB,AACjB,UAAY,CACb,AACD,aACE,eAAgB,AAChB,eAAgB,AAChB,gBAAiB,AACjB,UAAY,CACb,AACD,aACE,eAAgB,AAChB,cAAgB,AAChB,iBAAkB,AAClB,UAAY,CACb,AAID,aACE,eAAgB,AAChB,gBAAiB,AACjB,iBAAkB,AAClB,UAAY,CAEb,AACD,aACI,iBAAkB,AAClB,gBAAiB,AACjB,gBAAkB,CACrB,AACD,aACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAkB,CACnB,AACD,aACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAkB,CACnB,AAED,aACE,eAAgB,AAGhB,UAAY,CACb,AACD,0BAJE,gBAAiB,AACjB,gBAAkB,CAQnB,AALD,aACE,eAAgB,AAGhB,UAAY,CACb,AACD,aACE,eAAgB,AAChB,gBAAiB,AACjB,cAAiB,CAClB,AAGD,aACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAkB,CAEnB,AACD,aACI,iBAAkB,AAClB,gBAAiB,AACjB,gBAAkB,CACrB,AACD,aACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAkB,CACnB,AACD,aACE,iBAAkB,AAClB,eAAgB,AAChB,gBAAkB,CACnB,AAED,aACE,eAAgB,AAChB,eAAgB,AAChB,gBAAkB,CACnB,AACD,aACE,eAAgB,AAChB,eAAgB,AAChB,gBAAkB,CACnB,AACD,aACE,eAAgB,AAChB,eAAgB,AAChB,gBAAkB,CACnB,AAID,aACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAkB,CAEnB,AACD,aACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAkB,CACnB,AACD,aACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAkB,CACnB,AACD,aACE,eAAgB,AAChB,eAAgB,AAChB,gBAAkB,CACnB,AAED,aACE,eAAgB,AAChB,eAAgB,AAChB,gBAAkB,CACnB,AACD,aACE,eAAgB,AAChB,eAAgB,AAChB,gBAAkB,CACnB,AACD,aACE,eAAgB,AAChB,cAAgB,AAChB,eAAiB,CAClB,AAGD,aACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAkB,CAEnB,AACD,aACI,eAAgB,AAChB,gBAAiB,AACjB,gBAAkB,CACrB,AACD,aACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAkB,CACnB,AACD,aACE,eAAgB,AAChB,eAAgB,AAChB,gBAAkB,CACnB,AAED,aACE,eAAgB,AAChB,eAAgB,AAChB,gBAAkB,CACnB,AACD,aACE,eAAgB,AAChB,eAAgB,AAChB,gBAAkB,CACnB,AACD,aACE,eAAgB,AAChB,gBAAkB,CACnB,AAGD,aACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAiB,CAElB,AACD,aACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAkB,CACnB,AACD,aACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAkB,CACnB,AACD,aACE,eAAgB,AAChB,gBAAiB,AACjB,eAAiB,CAClB,AAED,aACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAiB,AACjB,UAAY,CACb,AACD,aACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAiB,AACjB,UAAY,CACb,AACD,aACE,eAAgB,AAChB,gBAAiB,AACjB,eAAgB,AAChB,UAAY,CACb,AAMD,aACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAiB,CAElB,AACD,aACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAkB,CACnB,AACD,aACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAkB,CACnB,AACD,aACE,eAAgB,AAChB,gBAAiB,AACjB,eAAiB,CAClB,AAED,aACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAiB,AACjB,UAAY,CACb,AACD,aACE,eAAgB,AAChB,gBAAiB,AACjB,gBAAiB,AACjB,UAAY,CACb,AACD,aACE,eAAiB,AACjB,gBAAiB,AACjB,eAAgB,AAChB,UAAY,CACb","file":"guide.css","sourcesContent":["\n\n/*[class^=\"icon-\"], [class*=\" icon-\"] {*/\n/*  font-family:\"iconfont\";*/\n/*  font-size:12px;*/\n/*  font-style:normal;*/\n/*  -webkit-font-smoothing: antialiased;*/\n/*  -moz-osx-font-smoothing: grayscale;*/\n/*}*/\n\n.guide-container{\n  position: relative;\n}\n\n.guide-shadow{\n  position: fixed;\n  top:0;\n  z-index: 99999;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  \n  background-color:  rgba(0, 0, 0, 0.4);\n  -webkit-transition: all .3s ease-out;\n  -o-transition: all .3s ease-out;\n  transition: all .3s ease-out;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n      justify-content: center;\n}\n\n.guide-content{\n  position: absolute;\n  display: block;\n  z-index: 999991;\n  width: 100%;\n  height: 100%;\n  border-radius: 4px;\n  -webkit-transition: all .3s ease-out;\n  -o-transition: all .3s ease-out;\n  transition: all .3s ease-out;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction:column;\n      flex-direction:column;\n  border: 1px solid rgba(0, 0, 0, .5);\n  -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, .4);\n          box-shadow: 0 2px 15px rgba(0, 0, 0, .4);\n\n}\n.guiimgconte{\n  width: 100%;\n  height: 13%;\n  margin-top: 12%;\n  margin-left: 73%;\n}\n\n\n\n.guiimgcontee{\n  width: 100%;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack:end;\n      justify-content:flex-end;\n  margin-top: 2%;\n}\n.gimgtwo{\n  height: 30%;\n  margin-left: 8%;\n  margin-top: 2%;\n}\n.guide-icon-no{\n  position: absolute;\n  border: 2px solid #fff;\n  border-radius: 50%;\n  z-index: 999998;\n  color: #fff;\n  background: -webkit-gradient(linear,left top, left bottom,from(#409EFF),to(#007fff));\n  background: -webkit-linear-gradient(top,#409EFF 0%,#007fff 100%);\n  background: -o-linear-gradient(top,#409EFF 0%,#007fff 100%);\n  background: linear-gradient(to bottom,#409EFF 0%,#007fff 100%);\n  font-weight: 6000;\n  padding: 1px;\n  font-size: 13px;\n  line-height: 20px;\n  font-family: Arial,verdana,tahoma;\n  text-shadow: 1px 1px 1px rgba(0,0,0,.3);\n  text-align: center;\n  -webkit-box-shadow: 0 2px 5px rgba(0,0,0,.4);\n          box-shadow: 0 2px 5px rgba(0,0,0,.4);\n  -webkit-transition: all .3s ease-out;\n  -o-transition: all .3s ease-out;\n  transition: all .3s ease-out;\n}\n\n.guide-tooltip{\n  position: absolute;\n  border-radius: 5px;\n  z-index: 999995;\n  display: block;\n  opacity: 1;\n  padding: 15px 25px 15px 15px;\n  -webkit-box-shadow: 0 1px 10px rgba(0, 0, 0, .4);\n          box-shadow: 0 1px 10px rgba(0, 0, 0, .4);\n  -webkit-transition: opacity .1s ease-out;\n  -o-transition: opacity .1s ease-out;\n  transition: opacity .1s ease-out;\n  min-width: 200px;\n  max-width: 250px;\n  background-color: #fff;\n}\n\n.guide-tooltip div:nth-child(1) {\n  font: 14px/normal sans-serif;\n  color: #2d2d2d;\n  font-weight: 400;\n  zoom: 1;\n  margin-bottom: 0;\n}\n\n.guide-tooltip .audio-play{\n  position: absolute;\n  top: 17px;\n  z-index: 999999;\n  right: 5px;\n  width: 26px;\n  height: 18px;\n  background-size: 20px 19px;\n  background-repeat: no-repeat;\n  background-position: 7px -2px;\n  background-image: url('http://fanyi.bdstatic.com/static/translation/img/translate/output/sound2x_d6f553d.gif')\n}\n\n.guide-tooltip .audio-noplay{\n  position: absolute;\n  top: 17px;\n  z-index: 999999;\n  right: 5px;\n  background-repeat: no-repeat;\n  background-position: 0 -1046px;\n  height: 16px;\n  width: 19px;\n  background-image: url('http://fanyi.bdstatic.com/static/translation/sprite/images/normal/index-sc413d90635_65ba9b0.png')\n}\n\n.guide-tooltip .guide-arrow{\n  position: absolute;\n  content: '';\n  border: 5px solid #fff;\n}\n\n.guide-tooltip .top{\n  top: -10px;\n  border-top-color: transparent;\n  border-right-color: transparent;\n  border-bottom-color: #fff;\n  border-left-color: transparent;\n}\n\n.guide-tooltip .left{\n  left: -10px;\n  top: 10px;\n  border-top-color: transparent;\n  border-right-color: #fff;\n  border-bottom-color: transparent;\n  border-left-color: transparent;\n}\n\n.guide-tooltip .bottom{\n  bottom: -10px;\n  left: 10px;\n  border-top-color: #fff;\n  border-right-color: transparent;\n  border-bottom-color: transparent;\n  border-left-color: transparent;\n}\n\n.guide-tooltip .right{\n  right: -10px;\n  top: 10px;\n  border-top-color: transparent;\n  border-right-color: transparent;\n  border-bottom-color: transparent;\n  border-left-color: #fff;\n}\n\n.guide-bullets ul{\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n      justify-content: center;\n  padding: 0;\n}\n.guide-bullets ul li{\n  list-style: none;\n}\n.guide-bullets ul li div{\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  margin: 2px;\n  background-color: #ccc;\n  cursor: pointer;\n}\n.guide-bullets .active-dot{\n  background-color: #409EFF\n}\n\n.guide-button-group{\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n  margin-top: 5px;\n}\n\n.guide-button{\n  background-color: #409EFF;\n  border-color: #409EFF;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  cursor: pointer;\n  color: #fff;\n  line-height: 1;\n  font-size: 13px;\n  outline: none;\n  margin: 0;\n  padding: 4px 7px;\n}\n\n.guide-button-total {\n  border-radius: 3px;\n}\n\n.guide-button-left {\n  border-bottom-left-radius: 3px;\n  border-top-left-radius: 3px;\n  border-right-color: hsla(0,0%,100%,.5)\n}\n\n.guide-button-right {\n  border-bottom-right-radius: 3px;\n  border-top-right-radius: 3px;\n}\n \n.guide-button-disabled {\n  background-color: #a0cfff;\n  border-color: #a0cfff;\n  cursor: not-allowed;\n}\n\n\n\n/*验证码*/\n.ysldiv11900{\n  margin-top: 10%;\n  margin-left: 17%;\n  margin-right: 14%;\n\n}\n.ysldiv11680{\n    margin-top: 11.5%;\n    margin-left: 13%;\n    margin-right: 9%;\n}\n.ysldiv11600{\n  margin-top: 12%;\n  margin-left: 11%;\n  margin-right: 7%;\n}\n.ysldiv11440{\n  margin-top: 14%;\n  margin-left: 7%;\n  margin-right: 3%;\n}\n\n.ysldiv11280{\n  margin-top: 16%;\n  margin-left: 2%;\n  margin-right: 0%;\n  height: 60%;\n}\n.ysldiv11366{\n  margin-top: 15%;\n  margin-left: 5%;\n  margin-right: 2%;\n  height: 60%;\n}\n.ysldiv11024{\n  margin-top: 20%;\n  margin-left: 0%;\n  margin-right: -1%;\n  height: 59%;\n}\n\n\n/*添加成员*/\n.ysldiv21900{\n  margin-top: 10%;\n  margin-left: 48%;\n  margin-right: 25%;\n  height: 18%;\n\n}\n.ysldiv21680{\n    margin-top: 11.5%;\n    margin-left: 45%;\n    margin-right: 20%;\n}\n.ysldiv21600{\n  margin-top: 12%;\n  margin-left: 47%;\n  margin-right: 20%;\n}\n.ysldiv21440{\n  margin-top: 14%;\n  margin-left: 47%;\n  margin-right: 17%;\n}\n\n.ysldiv21280{\n  margin-top: 16%;\n  margin-left: 51%;\n  margin-right: 14%;\n  height: 25%;\n}\n.ysldiv21366{\n  margin-top: 15%;\n  margin-left: 51%;\n  margin-right: 14%;\n  height: 23%;\n}\n.ysldiv21024{\n  margin-top: 20%;\n  margin-left: 61%;\n  margin-right: 0%;\n}\n\n/*成员列表*/\n.ysldiv31900{\n  margin-top: 10%;\n  margin-left: 19%;\n  margin-right: 45%;\n\n}\n.ysldiv31680{\n    margin-top: 11.5%;\n    margin-left: 14%;\n    margin-right: 45%;\n}\n.ysldiv31600{\n  margin-top: 12%;\n  margin-left: 12%;\n  margin-right: 45%;\n}\n.ysldiv31440{\n  margin-top: 13.5%;\n  margin-left: 8%;\n  margin-right: 44%;\n}\n\n.ysldiv31280{\n  margin-top: 15%;\n  margin-left: 3%;\n  margin-right: 44%;\n}\n.ysldiv31366{\n  margin-top: 14%;\n  margin-left: 6%;\n  margin-right: 43%;\n}\n.ysldiv31024{\n  margin-top: 19%;\n  margin-left: 1%;\n  margin-right: 34%;\n}\n\n/*目录管理*/\n\n.ysldiv41900{\n  margin-top: 16%;\n  margin-left: 19%;\n  margin-right: 29%;\n\n}\n.ysldiv41680{\n  margin-top: 18%;\n  margin-left: 14%;\n  margin-right: 24%;\n}\n.ysldiv41600{\n  margin-top: 19%;\n  margin-left: 12%;\n  margin-right: 23%;\n}\n.ysldiv41440{\n  margin-top: 21%;\n  margin-left: 8%;\n  margin-right: 20%;\n}\n\n.ysldiv41280{\n  margin-top: 24%;\n  margin-left: 3%;\n  margin-right: 17%;\n}\n.ysldiv41366{\n  margin-top: 22%;\n  margin-left: 6%;\n  margin-right: 20%;\n}\n.ysldiv41024{\n  margin-top: 29%;\n  margin-left: 0%;\n  margin-right: 2%;\n}\n\n/*导航排序*/\n.ysldiv51900{\n  margin-top: 16%;\n  margin-left: 18%;\n  margin-right: 42%;\n\n}\n.ysldiv51680{\n    margin-top: 18%;\n    margin-left: 13%;\n    margin-right: 40%;\n}\n.ysldiv51600{\n  margin-top: 19%;\n  margin-left: 11%;\n  margin-right: 39%;\n}\n.ysldiv51440{\n  margin-top: 21%;\n  margin-left: 7%;\n  margin-right: 39%;\n}\n\n.ysldiv51280{\n  margin-top: 24%;\n  margin-left: 2%;\n  margin-right: 38%;\n}\n.ysldiv51366{\n  margin-top: 22%;\n  margin-left: 5%;\n  margin-right: 39%;\n}\n.ysldiv51024{\n  margin-top: 30%;\n  margin-right: 27%;\n}\n\n/*任务操作*/\n.ysldiv61900{\n  margin-top: 16%;\n  margin-left: 34%;\n  margin-right: 19%\n\n}\n.ysldiv61680{\n  margin-top: 18%;\n  margin-left: 31%;\n  margin-right: 14%;\n}\n.ysldiv61600{\n  margin-top: 19%;\n  margin-left: 30%;\n  margin-right: 12%;\n}\n.ysldiv61440{\n  margin-top: 21%;\n  margin-left: 28%;\n  margin-right: 8%;\n}\n\n.ysldiv61280{\n  margin-top: 24%;\n  margin-left: 25%;\n  margin-right: 3%;\n  height: 53%;\n}\n.ysldiv61366{\n  margin-top: 22%;\n  margin-left: 26%;\n  margin-right: 6%;\n  height: 53%;\n}\n.ysldiv61024{\n  margin-top: 31%;\n  margin-left: 27%;\n  margin-right: 0;\n  height: 40%;\n}\n\n\n\n\n\n.ysldiv71900{\n  margin-top: 16%;\n  margin-left: 34%;\n  margin-right: 19%\n\n}\n.ysldiv71680{\n  margin-top: 18%;\n  margin-left: 31%;\n  margin-right: 14%;\n}\n.ysldiv71600{\n  margin-top: 19%;\n  margin-left: 30%;\n  margin-right: 12%;\n}\n.ysldiv71440{\n  margin-top: 21%;\n  margin-left: 28%;\n  margin-right: 8%;\n}\n\n.ysldiv71280{\n  margin-top: 24%;\n  margin-left: 25%;\n  margin-right: 3%;\n  height: 53%;\n}\n.ysldiv71366{\n  margin-top: 22%;\n  margin-left: 26%;\n  margin-right: 6%;\n  height: 53%;\n}\n.ysldiv71024{\n  margin-top: 31% ;\n  margin-left: 27%;\n  margin-right: 0;\n  height: 40%;\n}"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 4747:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/guihome1.eca5276e.png";

/***/ }),

/***/ 4748:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/guihome2.c65f40bf.jpg";

/***/ }),

/***/ 4749:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/guihome3.0e1dc34b.jpg";

/***/ }),

/***/ 4750:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/guihome4.6cc0d72b.jpg";

/***/ }),

/***/ 4751:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/guihome5.1ac2c872.jpg";

/***/ }),

/***/ 4752:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/guihome6.7fc4fe9d.jpg";

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