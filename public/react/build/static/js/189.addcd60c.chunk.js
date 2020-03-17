webpackJsonp([189],{

/***/ 1100:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(29);

__webpack_require__(1108);
//# sourceMappingURL=css.js.map


/***/ }),

/***/ 1101:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _progress = _interopRequireDefault(__webpack_require__(1110));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _progress["default"];
exports["default"] = _default;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 1108:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1109);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(300)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 1109:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(299)(true);
// imports


// module
exports.push([module.i, ".ant-progress{-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0;color:rgba(0,0,0,.65);font-size:14px;font-variant:tabular-nums;line-height:1.5;list-style:none;-webkit-font-feature-settings:\"tnum\";font-feature-settings:\"tnum\";display:inline-block}.ant-progress-line{position:relative;width:100%;font-size:14px}.ant-progress-small.ant-progress-line,.ant-progress-small.ant-progress-line .ant-progress-text .anticon{font-size:12px}.ant-progress-outer{display:inline-block;width:100%;margin-right:0;padding-right:0}.ant-progress-show-info .ant-progress-outer{margin-right:calc(-2em - 8px);padding-right:calc(2em + 8px)}.ant-progress-inner{position:relative;display:inline-block;width:100%;overflow:hidden;vertical-align:middle;background-color:#f5f5f5;border-radius:100px}.ant-progress-circle-trail{stroke:#f5f5f5}.ant-progress-circle-path{-webkit-animation:ant-progress-appear .3s;animation:ant-progress-appear .3s}.ant-progress-inner:not(.ant-progress-circle-gradient) .ant-progress-circle-path{stroke:#1890ff}.ant-progress-bg,.ant-progress-success-bg{position:relative;background-color:#1890ff;border-radius:100px;-webkit-transition:all .4s cubic-bezier(.08,.82,.17,1) 0s;-o-transition:all .4s cubic-bezier(.08,.82,.17,1) 0s;transition:all .4s cubic-bezier(.08,.82,.17,1) 0s}.ant-progress-success-bg{position:absolute;top:0;left:0;background-color:#52c41a}.ant-progress-text{display:inline-block;width:2em;margin-left:8px;color:rgba(0,0,0,.45);font-size:1em;line-height:1;white-space:nowrap;text-align:left;vertical-align:middle;word-break:normal}.ant-progress-text .anticon{font-size:14px}.ant-progress-status-active .ant-progress-bg:before{position:absolute;top:0;right:0;bottom:0;left:0;background:#fff;border-radius:10px;opacity:0;-webkit-animation:ant-progress-active 2.4s cubic-bezier(.23,1,.32,1) infinite;animation:ant-progress-active 2.4s cubic-bezier(.23,1,.32,1) infinite;content:\"\"}.ant-progress-status-exception .ant-progress-bg{background-color:#f5222d}.ant-progress-status-exception .ant-progress-text{color:#f5222d}.ant-progress-status-exception .ant-progress-inner:not(.ant-progress-circle-gradient) .ant-progress-circle-path{stroke:#f5222d}.ant-progress-status-success .ant-progress-bg{background-color:#52c41a}.ant-progress-status-success .ant-progress-text{color:#52c41a}.ant-progress-status-success .ant-progress-inner:not(.ant-progress-circle-gradient) .ant-progress-circle-path{stroke:#52c41a}.ant-progress-circle .ant-progress-inner{position:relative;line-height:1;background-color:transparent}.ant-progress-circle .ant-progress-text{position:absolute;top:50%;left:50%;width:100%;margin:0;padding:0;color:rgba(0,0,0,.65);line-height:1;white-space:normal;text-align:center;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.ant-progress-circle .ant-progress-text .anticon{font-size:1.16666667em}.ant-progress-circle.ant-progress-status-exception .ant-progress-text{color:#f5222d}.ant-progress-circle.ant-progress-status-success .ant-progress-text{color:#52c41a}@-webkit-keyframes ant-progress-active{0%{width:0;opacity:.1}20%{width:0;opacity:.5}to{width:100%;opacity:0}}@keyframes ant-progress-active{0%{width:0;opacity:.1}20%{width:0;opacity:.5}to{width:100%;opacity:0}}", "", {"version":3,"sources":["/Users/jasder/work/trustie3.0/forgeplus-react/node_modules/antd/lib/progress/style/index.css"],"names":[],"mappings":"AAIA,cACE,8BAA+B,AACvB,sBAAuB,AAC/B,SAAU,AACV,UAAW,AACX,sBAA2B,AAC3B,eAAgB,AAChB,0BAA2B,AAC3B,gBAAiB,AACjB,gBAAiB,AACjB,qCAAsC,AAC9B,6BAA8B,AACtC,oBAAsB,CACvB,AACD,mBACE,kBAAmB,AACnB,WAAY,AACZ,cAAgB,CACjB,AACD,wGAEE,cAAgB,CACjB,AACD,oBACE,qBAAsB,AACtB,WAAY,AACZ,eAAgB,AAChB,eAAiB,CAClB,AACD,4CACE,8BAA+B,AAC/B,6BAA+B,CAChC,AACD,oBACE,kBAAmB,AACnB,qBAAsB,AACtB,WAAY,AACZ,gBAAiB,AACjB,sBAAuB,AACvB,yBAA0B,AAC1B,mBAAqB,CACtB,AACD,2BACE,cAAgB,CACjB,AACD,0BACE,0CAA4C,AACpC,iCAAoC,CAC7C,AACD,iFACE,cAAgB,CACjB,AACD,0CAEE,kBAAmB,AACnB,yBAA0B,AAC1B,oBAAqB,AACrB,0DAAkE,AAClE,qDAA6D,AAC7D,iDAA0D,CAC3D,AACD,yBACE,kBAAmB,AACnB,MAAO,AACP,OAAQ,AACR,wBAA0B,CAC3B,AACD,mBACE,qBAAsB,AACtB,UAAW,AACX,gBAAiB,AACjB,sBAA2B,AAC3B,cAAe,AACf,cAAe,AACf,mBAAoB,AACpB,gBAAiB,AACjB,sBAAuB,AACvB,iBAAmB,CACpB,AACD,4BACE,cAAgB,CACjB,AACD,oDACE,kBAAmB,AACnB,MAAO,AACP,QAAS,AACT,SAAU,AACV,OAAQ,AACR,gBAAiB,AACjB,mBAAoB,AACpB,UAAW,AACX,8EAAoF,AAC5E,sEAA4E,AACpF,UAAY,CACb,AACD,gDACE,wBAA0B,CAC3B,AACD,kDACE,aAAe,CAChB,AACD,gHACE,cAAgB,CACjB,AACD,8CACE,wBAA0B,CAC3B,AACD,gDACE,aAAe,CAChB,AACD,8GACE,cAAgB,CACjB,AACD,yCACE,kBAAmB,AACnB,cAAe,AACf,4BAA8B,CAC/B,AACD,wCACE,kBAAmB,AACnB,QAAS,AACT,SAAU,AACV,WAAY,AACZ,SAAU,AACV,UAAW,AACX,sBAA2B,AAC3B,cAAe,AACf,mBAAoB,AACpB,kBAAmB,AACnB,uCAAyC,AACrC,mCAAqC,AACjC,8BAAiC,CAC1C,AACD,iDACE,sBAAwB,CACzB,AACD,sEACE,aAAe,CAChB,AACD,oEACE,aAAe,CAChB,AACD,uCACE,GACE,QAAS,AACT,UAAa,CACd,AACD,IACE,QAAS,AACT,UAAa,CACd,AACD,GACE,WAAY,AACZ,SAAW,CACZ,CACF,AACD,+BACE,GACE,QAAS,AACT,UAAa,CACd,AACD,IACE,QAAS,AACT,UAAa,CACd,AACD,GACE,WAAY,AACZ,SAAW,CACZ,CACF","file":"index.css","sourcesContent":["/* stylelint-disable at-rule-empty-line-before,at-rule-name-space-after,at-rule-no-unknown */\n/* stylelint-disable no-duplicate-selectors */\n/* stylelint-disable */\n/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors,string-no-newline */\n.ant-progress {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  color: rgba(0, 0, 0, 0.65);\n  font-size: 14px;\n  font-variant: tabular-nums;\n  line-height: 1.5;\n  list-style: none;\n  -webkit-font-feature-settings: 'tnum';\n          font-feature-settings: 'tnum';\n  display: inline-block;\n}\n.ant-progress-line {\n  position: relative;\n  width: 100%;\n  font-size: 14px;\n}\n.ant-progress-small.ant-progress-line,\n.ant-progress-small.ant-progress-line .ant-progress-text .anticon {\n  font-size: 12px;\n}\n.ant-progress-outer {\n  display: inline-block;\n  width: 100%;\n  margin-right: 0;\n  padding-right: 0;\n}\n.ant-progress-show-info .ant-progress-outer {\n  margin-right: calc(-2em - 8px);\n  padding-right: calc(2em + 8px);\n}\n.ant-progress-inner {\n  position: relative;\n  display: inline-block;\n  width: 100%;\n  overflow: hidden;\n  vertical-align: middle;\n  background-color: #f5f5f5;\n  border-radius: 100px;\n}\n.ant-progress-circle-trail {\n  stroke: #f5f5f5;\n}\n.ant-progress-circle-path {\n  -webkit-animation: ant-progress-appear 0.3s;\n          animation: ant-progress-appear 0.3s;\n}\n.ant-progress-inner:not(.ant-progress-circle-gradient) .ant-progress-circle-path {\n  stroke: #1890ff;\n}\n.ant-progress-success-bg,\n.ant-progress-bg {\n  position: relative;\n  background-color: #1890ff;\n  border-radius: 100px;\n  -webkit-transition: all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s;\n  -o-transition: all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s;\n  transition: all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s;\n}\n.ant-progress-success-bg {\n  position: absolute;\n  top: 0;\n  left: 0;\n  background-color: #52c41a;\n}\n.ant-progress-text {\n  display: inline-block;\n  width: 2em;\n  margin-left: 8px;\n  color: rgba(0, 0, 0, 0.45);\n  font-size: 1em;\n  line-height: 1;\n  white-space: nowrap;\n  text-align: left;\n  vertical-align: middle;\n  word-break: normal;\n}\n.ant-progress-text .anticon {\n  font-size: 14px;\n}\n.ant-progress-status-active .ant-progress-bg::before {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background: #fff;\n  border-radius: 10px;\n  opacity: 0;\n  -webkit-animation: ant-progress-active 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite;\n          animation: ant-progress-active 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite;\n  content: '';\n}\n.ant-progress-status-exception .ant-progress-bg {\n  background-color: #f5222d;\n}\n.ant-progress-status-exception .ant-progress-text {\n  color: #f5222d;\n}\n.ant-progress-status-exception .ant-progress-inner:not(.ant-progress-circle-gradient) .ant-progress-circle-path {\n  stroke: #f5222d;\n}\n.ant-progress-status-success .ant-progress-bg {\n  background-color: #52c41a;\n}\n.ant-progress-status-success .ant-progress-text {\n  color: #52c41a;\n}\n.ant-progress-status-success .ant-progress-inner:not(.ant-progress-circle-gradient) .ant-progress-circle-path {\n  stroke: #52c41a;\n}\n.ant-progress-circle .ant-progress-inner {\n  position: relative;\n  line-height: 1;\n  background-color: transparent;\n}\n.ant-progress-circle .ant-progress-text {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  color: rgba(0, 0, 0, 0.65);\n  line-height: 1;\n  white-space: normal;\n  text-align: center;\n  -webkit-transform: translate(-50%, -50%);\n      -ms-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n.ant-progress-circle .ant-progress-text .anticon {\n  font-size: 1.16666667em;\n}\n.ant-progress-circle.ant-progress-status-exception .ant-progress-text {\n  color: #f5222d;\n}\n.ant-progress-circle.ant-progress-status-success .ant-progress-text {\n  color: #52c41a;\n}\n@-webkit-keyframes ant-progress-active {\n  0% {\n    width: 0;\n    opacity: 0.1;\n  }\n  20% {\n    width: 0;\n    opacity: 0.5;\n  }\n  100% {\n    width: 100%;\n    opacity: 0;\n  }\n}\n@keyframes ant-progress-active {\n  0% {\n    width: 0;\n    opacity: 0.1;\n  }\n  20% {\n    width: 0;\n    opacity: 0.5;\n  }\n  100% {\n    width: 100%;\n    opacity: 0;\n  }\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1110:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var PropTypes = _interopRequireWildcard(__webpack_require__(1));

var React = _interopRequireWildcard(__webpack_require__(0));

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _omit = _interopRequireDefault(__webpack_require__(47));

var _icon = _interopRequireDefault(__webpack_require__(26));

var _configProvider = __webpack_require__(11);

var _type = __webpack_require__(72);

var _Line = _interopRequireDefault(__webpack_require__(1111));

var _Circle = _interopRequireDefault(__webpack_require__(1112));

var _utils = __webpack_require__(946);

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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

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

var ProgressTypes = (0, _type.tuple)('line', 'circle', 'dashboard');
var ProgressStatuses = (0, _type.tuple)('normal', 'exception', 'active', 'success');

var Progress =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Progress, _React$Component);

  function Progress() {
    var _this;

    _classCallCheck(this, Progress);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Progress).apply(this, arguments));

    _this.renderProgress = function (_ref) {
      var _classNames;

      var getPrefixCls = _ref.getPrefixCls;

      var _assertThisInitialize = _assertThisInitialized(_this),
          props = _assertThisInitialize.props;

      var customizePrefixCls = props.prefixCls,
          className = props.className,
          size = props.size,
          type = props.type,
          showInfo = props.showInfo,
          restProps = __rest(props, ["prefixCls", "className", "size", "type", "showInfo"]);

      var prefixCls = getPrefixCls('progress', customizePrefixCls);

      var progressStatus = _this.getProgressStatus();

      var progressInfo = _this.renderProcessInfo(prefixCls, progressStatus);

      var progress; // Render progress shape

      if (type === 'line') {
        progress = React.createElement(_Line["default"], _extends({}, _this.props, {
          prefixCls: prefixCls
        }), progressInfo);
      } else if (type === 'circle' || type === 'dashboard') {
        progress = React.createElement(_Circle["default"], _extends({}, _this.props, {
          prefixCls: prefixCls,
          progressStatus: progressStatus
        }), progressInfo);
      }

      var classString = (0, _classnames["default"])(prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(type === 'dashboard' && 'circle' || type), true), _defineProperty(_classNames, "".concat(prefixCls, "-status-").concat(progressStatus), true), _defineProperty(_classNames, "".concat(prefixCls, "-show-info"), showInfo), _defineProperty(_classNames, "".concat(prefixCls, "-").concat(size), size), _classNames), className);
      return React.createElement("div", _extends({}, (0, _omit["default"])(restProps, ['status', 'format', 'trailColor', 'successPercent', 'strokeWidth', 'width', 'gapDegree', 'gapPosition', 'strokeColor', 'strokeLinecap', 'percent']), {
        className: classString
      }), progress);
    };

    return _this;
  }

  _createClass(Progress, [{
    key: "getPercentNumber",
    value: function getPercentNumber() {
      var _this$props = this.props,
          successPercent = _this$props.successPercent,
          _this$props$percent = _this$props.percent,
          percent = _this$props$percent === void 0 ? 0 : _this$props$percent;
      return parseInt(successPercent !== undefined ? successPercent.toString() : percent.toString(), 10);
    }
  }, {
    key: "getProgressStatus",
    value: function getProgressStatus() {
      var status = this.props.status;

      if (ProgressStatuses.indexOf(status) < 0 && this.getPercentNumber() >= 100) {
        return 'success';
      }

      return status || 'normal';
    }
  }, {
    key: "renderProcessInfo",
    value: function renderProcessInfo(prefixCls, progressStatus) {
      var _this$props2 = this.props,
          showInfo = _this$props2.showInfo,
          format = _this$props2.format,
          type = _this$props2.type,
          percent = _this$props2.percent,
          successPercent = _this$props2.successPercent;
      if (!showInfo) return null;
      var text;

      var textFormatter = format || function (percentNumber) {
        return "".concat(percentNumber, "%");
      };

      var iconType = type === 'circle' || type === 'dashboard' ? '' : '-circle';

      if (format || progressStatus !== 'exception' && progressStatus !== 'success') {
        text = textFormatter((0, _utils.validProgress)(percent), (0, _utils.validProgress)(successPercent));
      } else if (progressStatus === 'exception') {
        text = React.createElement(_icon["default"], {
          type: "close".concat(iconType),
          theme: type === 'line' ? 'filled' : 'outlined'
        });
      } else if (progressStatus === 'success') {
        text = React.createElement(_icon["default"], {
          type: "check".concat(iconType),
          theme: type === 'line' ? 'filled' : 'outlined'
        });
      }

      return React.createElement("span", {
        className: "".concat(prefixCls, "-text"),
        title: typeof text === 'string' ? text : undefined
      }, text);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderProgress);
    }
  }]);

  return Progress;
}(React.Component);

exports["default"] = Progress;
Progress.defaultProps = {
  type: 'line',
  percent: 0,
  showInfo: true,
  trailColor: '#f3f3f3',
  size: 'default',
  gapDegree: 0,
  strokeLinecap: 'round'
};
Progress.propTypes = {
  status: PropTypes.oneOf(ProgressStatuses),
  type: PropTypes.oneOf(ProgressTypes),
  showInfo: PropTypes.bool,
  percent: PropTypes.number,
  width: PropTypes.number,
  strokeWidth: PropTypes.number,
  strokeLinecap: PropTypes.oneOf(['round', 'square']),
  strokeColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  trailColor: PropTypes.string,
  format: PropTypes.func,
  gapDegree: PropTypes.number
};
//# sourceMappingURL=progress.js.map


/***/ }),

/***/ 1111:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.handleGradient = exports.sortGradient = void 0;

var React = _interopRequireWildcard(__webpack_require__(0));

var _utils = __webpack_require__(946);

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

/**
 * {
 *   '0%': '#afc163',
 *   '75%': '#009900',
 *   '50%': 'green',     ====>     '#afc163 0%, #66FF00 25%, #00CC00 50%, #009900 75%, #ffffff 100%'
 *   '25%': '#66FF00',
 *   '100%': '#ffffff'
 * }
 */
var sortGradient = function sortGradient(gradients) {
  var tempArr = []; // eslint-disable-next-line no-restricted-syntax

  for (var _i = 0, _Object$entries = Object.entries(gradients); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    var formatKey = parseFloat(key.replace(/%/g, ''));

    if (isNaN(formatKey)) {
      return {};
    }

    tempArr.push({
      key: formatKey,
      value: value
    });
  }

  tempArr = tempArr.sort(function (a, b) {
    return a.key - b.key;
  });
  return tempArr.map(function (_ref) {
    var key = _ref.key,
        value = _ref.value;
    return "".concat(value, " ").concat(key, "%");
  }).join(', ');
};
/**
 * {
 *   '0%': '#afc163',
 *   '25%': '#66FF00',
 *   '50%': '#00CC00',     ====>  linear-gradient(to right, #afc163 0%, #66FF00 25%,
 *   '75%': '#009900',              #00CC00 50%, #009900 75%, #ffffff 100%)
 *   '100%': '#ffffff'
 * }
 *
 * Then this man came to realize the truth:
 * Besides six pence, there is the moon.
 * Besides bread and butter, there is the bug.
 * And...
 * Besides women, there is the code.
 */


exports.sortGradient = sortGradient;

var handleGradient = function handleGradient(strokeColor) {
  var _strokeColor$from = strokeColor.from,
      from = _strokeColor$from === void 0 ? '#1890ff' : _strokeColor$from,
      _strokeColor$to = strokeColor.to,
      to = _strokeColor$to === void 0 ? '#1890ff' : _strokeColor$to,
      _strokeColor$directio = strokeColor.direction,
      direction = _strokeColor$directio === void 0 ? 'to right' : _strokeColor$directio,
      rest = __rest(strokeColor, ["from", "to", "direction"]);

  if (Object.keys(rest).length !== 0) {
    var sortedGradients = sortGradient(rest);
    return {
      backgroundImage: "linear-gradient(".concat(direction, ", ").concat(sortedGradients, ")")
    };
  }

  return {
    backgroundImage: "linear-gradient(".concat(direction, ", ").concat(from, ", ").concat(to, ")")
  };
};

exports.handleGradient = handleGradient;

var Line = function Line(props) {
  var prefixCls = props.prefixCls,
      percent = props.percent,
      successPercent = props.successPercent,
      strokeWidth = props.strokeWidth,
      size = props.size,
      strokeColor = props.strokeColor,
      strokeLinecap = props.strokeLinecap,
      children = props.children;
  var backgroundProps;

  if (strokeColor && typeof strokeColor !== 'string') {
    backgroundProps = handleGradient(strokeColor);
  } else {
    backgroundProps = {
      background: strokeColor
    };
  }

  var percentStyle = _extends({
    width: "".concat((0, _utils.validProgress)(percent), "%"),
    height: strokeWidth || (size === 'small' ? 6 : 8),
    borderRadius: strokeLinecap === 'square' ? 0 : ''
  }, backgroundProps);

  var successPercentStyle = {
    width: "".concat((0, _utils.validProgress)(successPercent), "%"),
    height: strokeWidth || (size === 'small' ? 6 : 8),
    borderRadius: strokeLinecap === 'square' ? 0 : ''
  };
  var successSegment = successPercent !== undefined ? React.createElement("div", {
    className: "".concat(prefixCls, "-success-bg"),
    style: successPercentStyle
  }) : null;
  return React.createElement("div", null, React.createElement("div", {
    className: "".concat(prefixCls, "-outer")
  }, React.createElement("div", {
    className: "".concat(prefixCls, "-inner")
  }, React.createElement("div", {
    className: "".concat(prefixCls, "-bg"),
    style: percentStyle
  }), successSegment)), children);
};

var _default = Line;
exports["default"] = _default;
//# sourceMappingURL=Line.js.map


/***/ }),

/***/ 1112:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(__webpack_require__(0));

var _rcProgress = __webpack_require__(1113);

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _utils = __webpack_require__(946);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var statusColorMap = {
  normal: '#108ee9',
  exception: '#ff5500',
  success: '#87d068'
};

function getPercentage(_ref) {
  var percent = _ref.percent,
      successPercent = _ref.successPercent;
  var ptg = (0, _utils.validProgress)(percent);

  if (!successPercent) {
    return ptg;
  }

  var successPtg = (0, _utils.validProgress)(successPercent);
  return [successPercent, (0, _utils.validProgress)(ptg - successPtg)];
}

function getStrokeColor(_ref2) {
  var progressStatus = _ref2.progressStatus,
      successPercent = _ref2.successPercent,
      strokeColor = _ref2.strokeColor;
  var color = strokeColor || statusColorMap[progressStatus];

  if (!successPercent) {
    return color;
  }

  return [statusColorMap.success, color];
}

var Circle = function Circle(props) {
  var prefixCls = props.prefixCls,
      width = props.width,
      strokeWidth = props.strokeWidth,
      trailColor = props.trailColor,
      strokeLinecap = props.strokeLinecap,
      gapPosition = props.gapPosition,
      gapDegree = props.gapDegree,
      type = props.type,
      children = props.children;
  var circleSize = width || 120;
  var circleStyle = {
    width: circleSize,
    height: circleSize,
    fontSize: circleSize * 0.15 + 6
  };
  var circleWidth = strokeWidth || 6;
  var gapPos = gapPosition || type === 'dashboard' && 'bottom' || 'top';
  var gapDeg = gapDegree || (type === 'dashboard' ? 75 : undefined);
  var strokeColor = getStrokeColor(props);
  var isGradient = Object.prototype.toString.call(strokeColor) === '[object Object]';
  var wrapperClassName = (0, _classnames["default"])("".concat(prefixCls, "-inner"), _defineProperty({}, "".concat(prefixCls, "-circle-gradient"), isGradient));
  return React.createElement("div", {
    className: wrapperClassName,
    style: circleStyle
  }, React.createElement(_rcProgress.Circle, {
    percent: getPercentage(props),
    strokeWidth: circleWidth,
    trailWidth: circleWidth,
    strokeColor: strokeColor,
    strokeLinecap: strokeLinecap,
    trailColor: trailColor,
    prefixCls: prefixCls,
    gapDegree: gapDeg,
    gapPosition: gapPos
  }), children);
};

var _default = Circle;
exports["default"] = _default;
//# sourceMappingURL=Circle.js.map


/***/ }),

/***/ 1113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Line__ = __webpack_require__(1114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Circle__ = __webpack_require__(1115);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Line", function() { return __WEBPACK_IMPORTED_MODULE_0__Line__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Circle", function() { return __WEBPACK_IMPORTED_MODULE_1__Circle__["a"]; });



/* harmony default export */ __webpack_exports__["default"] = ({
  Line: __WEBPACK_IMPORTED_MODULE_0__Line__["a" /* default */],
  Circle: __WEBPACK_IMPORTED_MODULE_1__Circle__["a" /* default */]
});

/***/ }),

/***/ 1114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enhancer__ = __webpack_require__(986);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__types__ = __webpack_require__(987);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Line =
/*#__PURE__*/
function (_Component) {
  _inherits(Line, _Component);

  function Line() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Line);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Line)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "paths", {});

    return _this;
  }

  _createClass(Line, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          percent = _this$props.percent,
          prefixCls = _this$props.prefixCls,
          strokeColor = _this$props.strokeColor,
          strokeLinecap = _this$props.strokeLinecap,
          strokeWidth = _this$props.strokeWidth,
          style = _this$props.style,
          trailColor = _this$props.trailColor,
          trailWidth = _this$props.trailWidth,
          transition = _this$props.transition,
          restProps = _objectWithoutProperties(_this$props, ["className", "percent", "prefixCls", "strokeColor", "strokeLinecap", "strokeWidth", "style", "trailColor", "trailWidth", "transition"]);

      delete restProps.gapPosition;
      var percentList = Array.isArray(percent) ? percent : [percent];
      var strokeColorList = Array.isArray(strokeColor) ? strokeColor : [strokeColor];
      var center = strokeWidth / 2;
      var right = 100 - strokeWidth / 2;
      var pathString = "M ".concat(strokeLinecap === 'round' ? center : 0, ",").concat(center, "\n           L ").concat(strokeLinecap === 'round' ? right : 100, ",").concat(center);
      var viewBoxString = "0 0 100 ".concat(strokeWidth);
      var stackPtg = 0;
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("svg", _extends({
        className: "".concat(prefixCls, "-line ").concat(className),
        viewBox: viewBoxString,
        preserveAspectRatio: "none",
        style: style
      }, restProps), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
        className: "".concat(prefixCls, "-line-trail"),
        d: pathString,
        strokeLinecap: strokeLinecap,
        stroke: trailColor,
        strokeWidth: trailWidth || strokeWidth,
        fillOpacity: "0"
      }), percentList.map(function (ptg, index) {
        var pathStyle = {
          strokeDasharray: "".concat(ptg, "px, 100px"),
          strokeDashoffset: "-".concat(stackPtg, "px"),
          transition: transition || 'stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke 0.3s linear'
        };
        var color = strokeColorList[index] || strokeColorList[strokeColorList.length - 1];
        stackPtg += ptg;
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
          key: index,
          className: "".concat(prefixCls, "-line-path"),
          d: pathString,
          strokeLinecap: strokeLinecap,
          stroke: color,
          strokeWidth: strokeWidth,
          fillOpacity: "0",
          ref: function ref(path) {
            _this2.paths[index] = path;
          },
          style: pathStyle
        });
      }));
    }
  }]);

  return Line;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

Line.propTypes = __WEBPACK_IMPORTED_MODULE_2__types__["b" /* propTypes */];
Line.defaultProps = __WEBPACK_IMPORTED_MODULE_2__types__["a" /* defaultProps */];
/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1__enhancer__["a" /* default */])(Line));

/***/ }),

/***/ 1115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enhancer__ = __webpack_require__(986);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__types__ = __webpack_require__(987);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint react/prop-types: 0 */




var gradientSeed = 0;

function stripPercentToNumber(percent) {
  return +percent.replace('%', '');
}

function toArray(symArray) {
  return Array.isArray(symArray) ? symArray : [symArray];
}

function getPathStyles(offset, percent, strokeColor, strokeWidth) {
  var gapDegree = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var gapPosition = arguments.length > 5 ? arguments[5] : undefined;
  var radius = 50 - strokeWidth / 2;
  var beginPositionX = 0;
  var beginPositionY = -radius;
  var endPositionX = 0;
  var endPositionY = -2 * radius;

  switch (gapPosition) {
    case 'left':
      beginPositionX = -radius;
      beginPositionY = 0;
      endPositionX = 2 * radius;
      endPositionY = 0;
      break;

    case 'right':
      beginPositionX = radius;
      beginPositionY = 0;
      endPositionX = -2 * radius;
      endPositionY = 0;
      break;

    case 'bottom':
      beginPositionY = radius;
      endPositionY = 2 * radius;
      break;

    default:
  }

  var pathString = "M 50,50 m ".concat(beginPositionX, ",").concat(beginPositionY, "\n   a ").concat(radius, ",").concat(radius, " 0 1 1 ").concat(endPositionX, ",").concat(-endPositionY, "\n   a ").concat(radius, ",").concat(radius, " 0 1 1 ").concat(-endPositionX, ",").concat(endPositionY);
  var len = Math.PI * 2 * radius;
  var pathStyle = {
    stroke: strokeColor,
    strokeDasharray: "".concat(percent / 100 * (len - gapDegree), "px ").concat(len, "px"),
    strokeDashoffset: "-".concat(gapDegree / 2 + offset / 100 * (len - gapDegree), "px"),
    transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s' // eslint-disable-line

  };
  return {
    pathString: pathString,
    pathStyle: pathStyle
  };
}

var Circle =
/*#__PURE__*/
function (_Component) {
  _inherits(Circle, _Component);

  function Circle() {
    var _this;

    _classCallCheck(this, Circle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Circle).call(this));

    _defineProperty(_assertThisInitialized(_this), "paths", {});

    _defineProperty(_assertThisInitialized(_this), "gradientId", 0);

    _this.gradientId = gradientSeed;
    gradientSeed += 1;
    return _this;
  }

  _createClass(Circle, [{
    key: "getStokeList",
    value: function getStokeList() {
      var _this2 = this;

      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          percent = _this$props.percent,
          strokeColor = _this$props.strokeColor,
          strokeWidth = _this$props.strokeWidth,
          strokeLinecap = _this$props.strokeLinecap,
          gapDegree = _this$props.gapDegree,
          gapPosition = _this$props.gapPosition;
      var percentList = toArray(percent);
      var strokeColorList = toArray(strokeColor);
      var stackPtg = 0;
      return percentList.map(function (ptg, index) {
        var color = strokeColorList[index] || strokeColorList[strokeColorList.length - 1];
        var stroke = Object.prototype.toString.call(color) === '[object Object]' ? "url(#".concat(prefixCls, "-gradient-").concat(_this2.gradientId, ")") : '';

        var _getPathStyles = getPathStyles(stackPtg, ptg, color, strokeWidth, gapDegree, gapPosition),
            pathString = _getPathStyles.pathString,
            pathStyle = _getPathStyles.pathStyle;

        stackPtg += ptg;
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
          key: index,
          className: "".concat(prefixCls, "-circle-path"),
          d: pathString,
          stroke: stroke,
          strokeLinecap: strokeLinecap,
          strokeWidth: ptg === 0 ? 0 : strokeWidth,
          fillOpacity: "0",
          style: pathStyle,
          ref: function ref(path) {
            _this2.paths[index] = path;
          }
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          strokeWidth = _this$props2.strokeWidth,
          trailWidth = _this$props2.trailWidth,
          gapDegree = _this$props2.gapDegree,
          gapPosition = _this$props2.gapPosition,
          trailColor = _this$props2.trailColor,
          strokeLinecap = _this$props2.strokeLinecap,
          style = _this$props2.style,
          className = _this$props2.className,
          strokeColor = _this$props2.strokeColor,
          restProps = _objectWithoutProperties(_this$props2, ["prefixCls", "strokeWidth", "trailWidth", "gapDegree", "gapPosition", "trailColor", "strokeLinecap", "style", "className", "strokeColor"]);

      var _getPathStyles2 = getPathStyles(0, 100, trailColor, strokeWidth, gapDegree, gapPosition),
          pathString = _getPathStyles2.pathString,
          pathStyle = _getPathStyles2.pathStyle;

      delete restProps.percent;
      var strokeColorList = toArray(strokeColor);
      var gradient = strokeColorList.find(function (color) {
        return Object.prototype.toString.call(color) === '[object Object]';
      });
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("svg", _extends({
        className: "".concat(prefixCls, "-circle ").concat(className),
        viewBox: "0 0 100 100",
        style: style
      }, restProps), gradient && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("defs", null, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("linearGradient", {
        id: "".concat(prefixCls, "-gradient-").concat(this.gradientId),
        x1: "100%",
        y1: "0%",
        x2: "0%",
        y2: "0%"
      }, Object.keys(gradient).sort(function (a, b) {
        return stripPercentToNumber(a) - stripPercentToNumber(b);
      }).map(function (key, index) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("stop", {
          key: index,
          offset: key,
          stopColor: gradient[key]
        });
      }))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
        className: "".concat(prefixCls, "-circle-trail"),
        d: pathString,
        stroke: trailColor,
        strokeLinecap: strokeLinecap,
        strokeWidth: trailWidth || strokeWidth,
        fillOpacity: "0",
        style: pathStyle
      }), this.getStokeList().reverse());
    }
  }]);

  return Circle;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

Circle.propTypes = _objectSpread({}, __WEBPACK_IMPORTED_MODULE_3__types__["b" /* propTypes */], {
  gapPosition: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf(['top', 'bottom', 'left', 'right'])
});
Circle.defaultProps = _objectSpread({}, __WEBPACK_IMPORTED_MODULE_3__types__["a" /* defaultProps */], {
  gapPosition: 'top'
});
/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2__enhancer__["a" /* default */])(Circle));

/***/ }),

/***/ 1175:
/***/ (function(module, exports, __webpack_require__) {

var invariant = __webpack_require__(49);

var hasOwnProperty = Object.prototype.hasOwnProperty;
var splice = Array.prototype.splice;

var toString = Object.prototype.toString
var type = function(obj) {
  return toString.call(obj).slice(8, -1);
}

var assign = Object.assign || /* istanbul ignore next */ function assign(target, source) {
  getAllKeys(source).forEach(function(key) {
    if (hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  });
  return target;
};

var getAllKeys = typeof Object.getOwnPropertySymbols === 'function' ?
  function(obj) { return Object.keys(obj).concat(Object.getOwnPropertySymbols(obj)) } :
  /* istanbul ignore next */ function(obj) { return Object.keys(obj) };

/* istanbul ignore next */
function copy(object) {
  if (Array.isArray(object)) {
    return assign(object.constructor(object.length), object)
  } else if (type(object) === 'Map') {
    return new Map(object)
  } else if (type(object) === 'Set') {
    return new Set(object)
  } else if (object && typeof object === 'object') {
    var prototype = Object.getPrototypeOf(object);
    return assign(Object.create(prototype), object);
  } else {
    return object;
  }
}

function newContext() {
  var commands = assign({}, defaultCommands);
  update.extend = function(directive, fn) {
    commands[directive] = fn;
  };
  update.isEquals = function(a, b) { return a === b; };

  return update;

  function update(object, spec) {
    if (typeof spec === 'function') {
      spec = { $apply: spec };
    }

    if (!(Array.isArray(object) && Array.isArray(spec))) {
      invariant(
        !Array.isArray(spec),
        'update(): You provided an invalid spec to update(). The spec may ' +
        'not contain an array except as the value of $set, $push, $unshift, ' +
        '$splice or any custom command allowing an array value.'
      );
    }

    invariant(
      typeof spec === 'object' && spec !== null,
      'update(): You provided an invalid spec to update(). The spec and ' +
      'every included key path must be plain objects containing one of the ' +
      'following commands: %s.',
      Object.keys(commands).join(', ')
    );

    var nextObject = object;
    var index, key;
    getAllKeys(spec).forEach(function(key) {
      if (hasOwnProperty.call(commands, key)) {
        var objectWasNextObject = object === nextObject;
        nextObject = commands[key](spec[key], nextObject, spec, object);
        if (objectWasNextObject && update.isEquals(nextObject, object)) {
          nextObject = object;
        }
      } else {
        var nextValueForKey =
          type(object) === 'Map'
            ? update(object.get(key), spec[key])
            : update(object[key], spec[key]);
        var nextObjectValue =
          type(nextObject) === 'Map'
              ? nextObject.get(key)
              : nextObject[key];
        if (!update.isEquals(nextValueForKey, nextObjectValue) || typeof nextValueForKey === 'undefined' && !hasOwnProperty.call(object, key)) {
          if (nextObject === object) {
            nextObject = copy(object);
          }
          if (type(nextObject) === 'Map') {
            nextObject.set(key, nextValueForKey);
          } else {
            nextObject[key] = nextValueForKey;
          }
        }
      }
    })
    return nextObject;
  }

}

var defaultCommands = {
  $push: function(value, nextObject, spec) {
    invariantPushAndUnshift(nextObject, spec, '$push');
    return value.length ? nextObject.concat(value) : nextObject;
  },
  $unshift: function(value, nextObject, spec) {
    invariantPushAndUnshift(nextObject, spec, '$unshift');
    return value.length ? value.concat(nextObject) : nextObject;
  },
  $splice: function(value, nextObject, spec, originalObject) {
    invariantSplices(nextObject, spec);
    value.forEach(function(args) {
      invariantSplice(args);
      if (nextObject === originalObject && args.length) nextObject = copy(originalObject);
      splice.apply(nextObject, args);
    });
    return nextObject;
  },
  $set: function(value, nextObject, spec) {
    invariantSet(spec);
    return value;
  },
  $toggle: function(targets, nextObject) {
    invariantSpecArray(targets, '$toggle');
    var nextObjectCopy = targets.length ? copy(nextObject) : nextObject;

    targets.forEach(function(target) {
      nextObjectCopy[target] = !nextObject[target];
    });

    return nextObjectCopy;
  },
  $unset: function(value, nextObject, spec, originalObject) {
    invariantSpecArray(value, '$unset');
    value.forEach(function(key) {
      if (Object.hasOwnProperty.call(nextObject, key)) {
        if (nextObject === originalObject) nextObject = copy(originalObject);
        delete nextObject[key];
      }
    });
    return nextObject;
  },
  $add: function(value, nextObject, spec, originalObject) {
    invariantMapOrSet(nextObject, '$add');
    invariantSpecArray(value, '$add');
    if (type(nextObject) === 'Map') {
      value.forEach(function(pair) {
        var key = pair[0];
        var value = pair[1];
        if (nextObject === originalObject && nextObject.get(key) !== value) nextObject = copy(originalObject);
        nextObject.set(key, value);
      });
    } else {
      value.forEach(function(value) {
        if (nextObject === originalObject && !nextObject.has(value)) nextObject = copy(originalObject);
        nextObject.add(value);
      });
    }
    return nextObject;
  },
  $remove: function(value, nextObject, spec, originalObject) {
    invariantMapOrSet(nextObject, '$remove');
    invariantSpecArray(value, '$remove');
    value.forEach(function(key) {
      if (nextObject === originalObject && nextObject.has(key)) nextObject = copy(originalObject);
      nextObject.delete(key);
    });
    return nextObject;
  },
  $merge: function(value, nextObject, spec, originalObject) {
    invariantMerge(nextObject, value);
    getAllKeys(value).forEach(function(key) {
      if (value[key] !== nextObject[key]) {
        if (nextObject === originalObject) nextObject = copy(originalObject);
        nextObject[key] = value[key];
      }
    });
    return nextObject;
  },
  $apply: function(value, original) {
    invariantApply(value);
    return value(original);
  }
};

var contextForExport = newContext();

module.exports = contextForExport;
module.exports.default = contextForExport;
module.exports.newContext = newContext;

// invariants

function invariantPushAndUnshift(value, spec, command) {
  invariant(
    Array.isArray(value),
    'update(): expected target of %s to be an array; got %s.',
    command,
    value
  );
  invariantSpecArray(spec[command], command)
}

function invariantSpecArray(spec, command) {
  invariant(
    Array.isArray(spec),
    'update(): expected spec of %s to be an array; got %s. ' +
    'Did you forget to wrap your parameter in an array?',
    command,
    spec
  );
}

function invariantSplices(value, spec) {
  invariant(
    Array.isArray(value),
    'Expected $splice target to be an array; got %s',
    value
  );
  invariantSplice(spec['$splice']);
}

function invariantSplice(value) {
  invariant(
    Array.isArray(value),
    'update(): expected spec of $splice to be an array of arrays; got %s. ' +
    'Did you forget to wrap your parameters in an array?',
    value
  );
}

function invariantApply(fn) {
  invariant(
    typeof fn === 'function',
    'update(): expected spec of $apply to be a function; got %s.',
    fn
  );
}

function invariantSet(spec) {
  invariant(
    Object.keys(spec).length === 1,
    'Cannot have more than one key in an object with $set'
  );
}

function invariantMerge(target, specValue) {
  invariant(
    specValue && typeof specValue === 'object',
    'update(): $merge expects a spec of type \'object\'; got %s',
    specValue
  );
  invariant(
    target && typeof target === 'object',
    'update(): $merge expects a target of type \'object\'; got %s',
    target
  );
}

function invariantMapOrSet(target, command) {
  var typeOfTarget = type(target);
  invariant(
    typeOfTarget === 'Map' || typeOfTarget === 'Set',
    'update(): %s expects a target of type Set or Map; got %s',
    command,
    typeOfTarget
  );
}


/***/ }),

/***/ 3306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_spin_style_css__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_spin_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_spin_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_spin__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_spin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_spin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__VideoUpload__ = __webpack_require__(3307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__AliyunUploaderManager__ = __webpack_require__(3308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__VideoReducer__ = __webpack_require__(3309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__VideoUtil__ = __webpack_require__(3310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__images_upload_png__ = __webpack_require__(3311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__images_upload_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__images_upload_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__images_upload_hover_png__ = __webpack_require__(3312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__images_upload_hover_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__images_upload_hover_png__);
var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var uploader=void 0;var files=[];var MAX_FILE_COUNT=3;var MAX_FILE_SIZE=500;var noUploads=true;function VideoUploadList(props){// const [videos, setvideos] = useState([]);
var _useReducer=Object(__WEBPACK_IMPORTED_MODULE_2_react__["useReducer"])(__WEBPACK_IMPORTED_MODULE_8__VideoReducer__["b" /* reducer */],__WEBPACK_IMPORTED_MODULE_8__VideoReducer__["a" /* initialState */]),_useReducer2=_slicedToArray(_useReducer,2),state=_useReducer2[0],dispatch=_useReducer2[1];var theme=Object(__WEBPACK_IMPORTED_MODULE_2_react__["useContext"])(__WEBPACK_IMPORTED_MODULE_4_educoder__["y" /* ThemeContext */]);var _useState=Object(__WEBPACK_IMPORTED_MODULE_2_react__["useState"])(false),_useState2=_slicedToArray(_useState,2),couldRouteNav=_useState2[0],setCouldRouteNav=_useState2[1];var _useState3=Object(__WEBPACK_IMPORTED_MODULE_2_react__["useState"])(false),_useState4=_slicedToArray(_useState3,2),loading=_useState4[0],setLoading=_useState4[1];Object(__WEBPACK_IMPORTED_MODULE_2_react__["useEffect"])(function(){setCouldRouteNav(false);// Chrome removed support for custom message in ver 51
// https://stackoverflow.com/questions/38879742/is-it-possible-to-display-a-custom-message-in-the-beforeunload-popup
window.addEventListener("beforeunload",beforeunload);// window.onbeforeunload = beforeunload
return function(){uploader=null;// window.onbeforeunload = null;
window.removeEventListener("beforeunload",beforeunload);};},[]);// TODO 闭包！
noUploads=!state.videos||state.videos.length==0;function beforeunload(e){if(noUploads){return true;}var confirmationMessage="确认要离开当前页面，当前数据不可恢复";(e||window.event).returnValue=confirmationMessage;//Gecko + IE
return confirmationMessage;//Webkit, Safari, Chrome etc.
}var _beforeunload=beforeunload;// .bind(this, noUploads, state)
var username=props.match.params.username||props.CourseUser;var showNotification=props.showNotification,history=props.history;var uploaderOptions={};function onUploadChange(e){var file=e.target.files[0];if(!file){// alert("请先选择需要上传的文件!")
return;}// avi、flv、f4v、m4v、mov、mp4、rmvb、swf、webm
if(file.name&&file.name.indexOf('.avi')==-1&&file.name.indexOf('.flv')==-1&&file.name.indexOf('.f4v')==-1&&file.name.indexOf('.m4v')==-1&&file.name.indexOf('.mov')==-1&&file.name.indexOf('.mp4')==-1&&file.name.indexOf('.rmvb')==-1&&file.name.indexOf('.swf')==-1&&file.name.indexOf('.webm')==-1){showNotification('\u4E0D\u652F\u6301\u7684\u89C6\u9891\u683C\u5F0F');clearInput();return;}if(file.size>parseInt(MAX_FILE_SIZE)*1024*1024){// 超过500m TODO
clearInput();showNotification('\u89C6\u9891\u5927\u5C0F\u8D85\u8FC7'+MAX_FILE_SIZE+'M');return;}var gotTheSameFileName=false;state.videos.some(function(item){if(item.name==file.name){gotTheSameFileName=true;return true;}});if(gotTheSameFileName){clearInput();showNotification('\u4F60\u4E0D\u80FD\u4E0A\u4F20\u540C\u4E00\u4E2A\u89C6\u9891\u6587\u4EF6\u540D\u79F0\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u3002');return;}var Title=file.name;var userData='{"Vod":{}}';if(!uploader){Object(__WEBPACK_IMPORTED_MODULE_7__AliyunUploaderManager__["a" /* getUploader */])(username,{// 重新创建  才会用最新的 dispatch
create:!uploader,addFileSuccess:function addFileSuccess(uploadInfo){setLoading(true);var file=uploadInfo.file;console.log('addFileSuccess',uploadInfo);// const newvideos = [...videos, {
//     name: file.name,
//     size: file.size,
//     type: file.type,
//     fileHash: uploadInfo.fileHash, // "ba1bbc53fdecd9eaaae479fbd9518442"
//     state: uploadInfo.state, //  "Uploading"  "Ready"
//     videoId: uploadInfo.videoId, //   "719b82c875c34ac39f94feb145d25ad2"
//     loaded: 0
// }]
// setvideos(newvideos)
// files.push(file)
clearInput();dispatch({type:'addVideo',uploadInfo:uploadInfo});},onUploadProgress:function onUploadProgress(uploadInfo,totalSize,progress){setLoading(false);console.log("upload",uploadInfo);var progressPercent=Math.ceil(progress*100);// let _index = -1;
// videos.some((item, index) => {
//     // addFileSuccess的时候没有fileHash
//     // if (uploadInfo.fileHash == item.fileHash) {
//     if (uploadInfo.file.name == item.name) {
//         _index = index
//         return true;
//     }
// })
// TODO 这里不用reducer，会出现state被重置的问题
// if (_index == -1) {
//     const newvideos = [...videos, {
//         name: file.name,
//         size: file.size,
//         type: file.type,
//         fileHash: uploadInfo.fileHash, // "ba1bbc53fdecd9eaaae479fbd9518442"
//         state: uploadInfo.state, //  "Uploading"  "Ready"
//         videoId: uploadInfo.videoId, //   "719b82c875c34ac39f94feb145d25ad2"
//         loaded: progressPercent
//     }]
//     setvideos(newvideos)
//     return;
// }
// //           exercise_questions : update(prevState.exercise_questions, {[index]: { isNew: {$set: false}}})
// setvideos(update(videos, {[_index]: { loaded: {$set: progressPercent}}}))
dispatch({type:'updateProgress',uploadInfo:uploadInfo,progressPercent:progressPercent});},onUploadFailed:function onUploadFailed(uploadInfo){console.log('onUploadFailed',uploadInfo);props.showNotification('视频云服务出现异常，请重新上传。');},onUploadEnd:function onUploadEnd(uploadInfo){console.log('onUploadEnd',uploadInfo);},onUploadSucceed:function onUploadSucceed(uploadInfo){console.log('onUploadSucceed',uploadInfo);},onUploadError:function onUploadError(uploadInfo){},// 可能需要等lib加载完毕才能执行
gotUploader:function gotUploader(_uploader){// 首先调用 uploader.addFile(event.target.files[i], null, null, null, userData)
console.log(_uploader);var result=_uploader.addFile(file,null,null,null,userData);uploader=_uploader;window.uploader=uploader;}// )
});}else{var result=uploader.addFile(file,null,null,null,userData);}}function clearInput(){var _input=document.getElementById('fileUpload');_input.value='';}function doDelete(index,isSuccess){uploader.deleteFile(index);if(isSuccess){// uploader.deleteFile(index)
// deleteVideoInCloud(username, state.videos[index].videoId)
}else{// uploader.cancelFile(index)
}clearInput();dispatch({type:'removeVideo',index:index});// setvideos([...videos.splice(index, 1)])
}//  uploader.deleteFile(index);
function cancelUpload(index,isSuccess){props.confirm({content:__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',null,__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',null,'\u60A8\u786E\u8BA4\u8981',isSuccess?'删除':'取消上传','\u8BE5\u89C6\u9891\u5417\uFF1F')),onOk:function onOk(){doDelete(index,isSuccess);}});}function onPublish(){// 下列这些参数只有是课堂里面上传视频才会有
var CourseId=props.CourseId,CourseUser=props.CourseUser,flag=props.flag,successFunc=props.successFunc;if(state.videos.length==0){showNotification('请先上传视频');return;}var publishUrl='/users/'+(flag?CourseUser:username)+'/videos/batch_publish.json';__WEBPACK_IMPORTED_MODULE_5_axios___default.a.post(publishUrl,{videos:state.videos.map(function(item){return{video_id:item.videoId,// todo
title:item.title,course_id:CourseId};})}).then(function(response){// to success page
if(response){if(response.data.status==0){dispatch({type:'removeAll'});if(flag){successFunc(false);}else{history.push('/users/'+username+'/videos/success');}}}}).catch(function(error){console.log(error);});}function onTitleChange(title,index){dispatch({type:'updateTitle',title:title,index:index});}// login
var flag=props.flag,CourseId=props.CourseId;var urls=flag?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__["b" /* Link */],{to:'/users/'+username+'/videos/protocol?course='+CourseId,target:'_blank',style:{color:theme.foreground_select}},'\u4E0A\u4F20\u5185\u5BB9\u534F\u8BAE'):__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__["b" /* Link */],{to:'/users/'+username+'/videos/protocol',style:{color:theme.foreground_select}},'\u4E0A\u4F20\u5185\u5BB9\u534F\u8BAE');var protocolLine=__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',null,'\u4E0A\u4F20\u89C6\u9891\uFF0C\u5373\u8868\u793A\u60A8\u5DF2\u540C\u610F',urls,'\uFF0C\u4E0D\u5F97\u4E0A\u4F20\u672A\u7ECF\u4ED6\u4EBA\u6388\u6743\u7684\u4F5C\u54C1');return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:flag?"edu-back-white pb100 videoUploadList":"educontent videoUploadList",style:{marginBottom:''+(flag?"0px":"200px")}},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__["d" /* Prompt */],{when:state.videos.length,message:'\u786E\u8BA4\u8981\u79BB\u5F00\u5F53\u524D\u9875\u9762\uFF0C\u5F53\u524D\u6570\u636E\u4E0D\u53EF\u6062\u590D'}),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('style',null,'\n                .videoUploadList .section {\n                    background: #fff;\n                    padding: 16px 20px;\n                    padding-top: 0px;\n                    position: relative;\n\n                    padding-bottom: 36px;\n                }\n                .videoUploadList .cBreadcrumb {\n                    margin-top: 16px;\n                }\n                .videoUploadList .uploadTip {\n                    line-height: 18px;\n                    margin-bottom: 16px;\n                }\n                .videoUploadList .title {\n                    margin-bottom: 4px;\n                }\n                .videoUploadList .title .head {\n                    display: inline-block;\n                    margin-right: 8px;\n                }\n                .videoUploadList .title .titleDescription {\n                    color: #555;\n                }\n                .videoUploadList .section .description {\n                    padding-top: 10px;\n                    margin-top: 20px;\n                    margin-bottom: 30px;\n                    \n\n                    color: #777;\n                }\n                .videoUploadList .section .description.noUploads {\n                  text-align: \'center\';\n                }\n                .videoUploadList .publishBtn {\n                    padding: 0 16px\n                }\n                .videoUploadList .publishRow .publishBtn {\n                    padding: 6px 24px;\n                    height: auto;\n                    margin-bottom: 24px;\n                }\n                .videoUploadList .addVideoBtn {\n                    position: absolute;\n                    right: 30px;\n                }\n                .videoUploadList .publishRow {\n                    text-align: center;\n                    margin-top: 42px;\n                    display: flex;\n                    flex-direction: column;\n                    justify-content: center;\n                    align-items: center;\n                }\n\n                .noUploads {\n                    text-align: center;\n                }\n                    \n\n                /* item */\n                .videoUploadList .cancelUpload {\n                    flex: 0 0 200px;\n                    margin-left: 2px;\n                }\n                .videoUploadList .titleInput {\n                    width: 480px;\n                    margin-top: 16px;\n                }\n                .videoUploadList .videoUpload {\n                    padding: 26px 0;\n                    border-bottom: 1px dashed #DCDCDC;\n                }\n                .videoUploadList .videoUpload:last-child {\n                    border-bottom: none;\n                }\n                \n                .noUploads img {\n                    width: 64px;\n                    height: 48px;\n\n                }\n                .noUploads .uploadHoverIcon {\n                    display: none;\n                }\n                .noUploads .imgWrap:hover .uploadHoverIcon {\n                    display: inline;\n                }\n                .noUploads .imgWrap:hover .uploadIcon {\n                    display: none;\n                }\n                .noUploads .imgWrap {\n                    width: 72px;\n                    height: 54px;\n                    margin: 0 auto;\n                    cursor: pointer;\n                }\n            '),!flag&&__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Fragment,null,__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_educoder__["c" /* CBreadcrumb */],{className:'mb26',separator:' > ',items:[{to:'/users/'+username+'/videos',name:'视频'},{name:'上传'}]}),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'title'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('h2',{className:'head'},'\u4E0A\u4F20\u89C6\u9891'))),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'section'},noUploads&&__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'noUploads',style:{paddingTop:'72px'}},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'imgWrap',onClick:function onClick(){return document.getElementById('fileUpload').click();}},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('img',{className:'uploadIcon',src:__WEBPACK_IMPORTED_MODULE_10__images_upload_png___default.a}),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('img',{className:'uploadHoverIcon',src:__WEBPACK_IMPORTED_MODULE_11__images_upload_hover_png___default.a})),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{style:{color:'#000000',fontSize:'18px',fontWeight:'bold',marginBottom:'20px'}},'\u9009\u62E9\u60A8\u8981\u4E0A\u4F20\u7684\u89C6\u9891'),protocolLine),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_spin___default.a,{spinning:loading},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',null,state.videos.map(function(item,vIndex){return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__VideoUpload__["a" /* default */],Object.assign({},props,item,{className:'',cancelUpload:cancelUpload,onTitleChange:onTitleChange,key:vIndex,index:vIndex}));}))),state.videos&&state.videos.length===MAX_FILE_COUNT&&__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'uploadTip'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',null,'\u63D0\u793A\uFF1A\u5355\u6B21\u6700\u591A\u652F\u63013\u4E2A\u89C6\u9891\u6587\u4EF6\u4E0A\u4F20')),!noUploads&&state.videos.length<MAX_FILE_COUNT&&__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_educoder__["a" /* ActionBtn */],{className:'publishBtn',onClick:function onClick(){return document.getElementById('fileUpload').click();}},'\u7EE7\u7EED\u6DFB\u52A0'),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'description '+(noUploads?'noUploads':'')},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:''},'\u89C6\u9891\u5927\u5C0F\uFF1A\u4E0D\u652F\u6301\u65AD\u70B9\u7EED\u4F20\uFF0C\u5355\u4E2A\u89C6\u9891\u6587\u4EF6\u6700\u5927500M\uFF1B\u5355\u6B21\u6700\u591A\u652F\u63013\u4E2A\u89C6\u9891\u6587\u4EF6\u4E0A\u4F20 '),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:''},'\u89C6\u9891\u89C4\u683C\uFF1Aavi\u3001flv\u3001f4v\u3001m4v\u3001mov\u3001mp4\u3001rmvb\u3001swf\u3001webm '),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:''},'\u6E29\u99A8\u63D0\u793A\uFF1A\u8BF7\u52FF\u4E0A\u4F20\u8FDD\u6CD5\u89C6\u9891\u3002\u5E73\u53F0\u5C06\u4E3A\u6BCF\u4E00\u4E2A\u89C6\u9891\u5206\u914D\u4E00\u4E2A\u5730\u5740\uFF0C\u60A8\u53EF\u4EE5\u901A\u8FC7\u5F15\u7528\u8BE5\u5730\u5740\u5C06\u89C6\u9891\u4F7F\u7528\u5728\u5B9E\u8BAD\u9879\u76EE\u7B49\u6A21\u5757')),!noUploads&&__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Fragment,null,__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{style:{},className:'publishRow'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_educoder__["a" /* ActionBtn */],{className:'publishBtn',onClick:function onClick(){return onPublish();}},'\u7ACB\u5373\u53D1\u5E03'),protocolLine))),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('input',{type:'file',id:'fileUpload',style:{display:'none'},onChange:onUploadChange,accept:'.mkv, .flv, .f4v, .rmvb, .swf, video/mp4,video/x-m4v,video/flv,video/f4v,video/rmvb,video/swf,video/*'}));}/* harmony default export */ __webpack_exports__["default"] = (VideoUploadList);/**

bucket: "outin-396971199eed11e991a100163e1c7426"
checkpoint: {file: File, name: "sv/2d0fd065-16c7a62fcc5/2d0fd065-16c7a62fcc5.mp4", fileSize: 491511493, partSize: 1048576, uploadId: "A8DB0663F44C44F58F3F7F45892ED08B", …}
endpoint: "https://oss-cn-shanghai.aliyuncs.com"
file: File {name: "[阳光电影-www.ygdy8.com]金秘书为何这样-02.mp4", lastModified: 1532441562000, lastModifiedDate: Tue Jul 24 2018 22:12:42 GMT+0800 (China Standard Time), webkitRelativePath: "", size: 491511493, …}
fileHash: "ba1bbc53fdecd9eaaae479fbd9518442"
isImage: false
loaded: 0.5927505330490405
object: "sv/2d0fd065-16c7a62fcc5/2d0fd065-16c7a62fcc5.mp4"
region: "cn-shanghai"
retry: false
ri: "F0FDC11A-9A92-4A50-882A-423C3EA499F3"
state: "Uploading"
userData: "eyJWb2QiOnt9fQ=="
videoId: "719b82c875c34ac39f94feb145d25ad2"

    file
    lastModified: 1532441562000
    lastModifiedDate: Tue Jul 24 2018 22:12:42 GMT+0800 (China Standard Time) {}
    name: "[阳光电影-www.ygdy8.com]金秘书为何这样-02.mp4"
    size: 491511493
    type: "video/mp4"
    webkitRelativePath: ""


 */

/***/ }),

/***/ 3307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_input_style_css__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_input_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_input_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_input__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_progress_style_css__ = __webpack_require__(1100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_lib_progress_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_antd_lib_progress_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_progress__ = __webpack_require__(1101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_antd_lib_progress___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_antd_lib_progress__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_axios__);
var MAX_LENGTH=30;/**
name: file.name,
size: file.size,
type: file.type,

fileHash: uploadInfo.fileHash, // "ba1bbc53fdecd9eaaae479fbd9518442"
state: uploadInfo.state, //  "Uploading"
videoId: uploadInfo.videoId, //   "719b82c875c34ac39f94feb145d25ad2"
loaded: 0

 */function VideoUpload(props){var className=props.className,index=props.index,name=props.name,loaded=props.loaded,state=props.state,cancelUpload=props.cancelUpload,onTitleChange=props.onTitleChange,title=props.title;// const [title, setTitle] = useState('')
var username=props.match.params.username;function titleChange(e){onTitleChange(e.target.value,index);}return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('div',{className:'videoUpload '+className},__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('div',{className:'filename'},index+1,'. ',name),__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('div',{className:'progress df'},__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_antd_lib_progress___default.a,{percent:loaded,status:loaded=='100'?"":'active'}),__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('div',{className:'cancelUpload'},__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_educoder__["a" /* ActionBtn */],{className:'',onClick:function onClick(){return cancelUpload(index,loaded=='100');}},loaded=='100'?"删除":"取消上传"))),__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('style',null,'\n                .titleInputysl .ant-input{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tborder-right: none !important;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\theight: 40px !important;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n                \n                '),__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('div',{className:'courseForm',style:{display:"flex",alignItems:"center"}},__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('span',{className:'titleLabel mt15'},'\u6807\u9898\uFF1A'),__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_input___default.a,{placeholder:'\u6807\u9898\u652F\u6301\u6700\u591A'+MAX_LENGTH+'\u4E2A\u5B57\u7B26',onInput:titleChange,maxLength:MAX_LENGTH,addonAfter:__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('span',{className:'color-grey-6 font-13'},String(title.length),'/',MAX_LENGTH),className:'titleInput titleInputysl'})));}/* harmony default export */ __webpack_exports__["a"] = (VideoUpload);

/***/ }),

/***/ 3308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getUploader;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
var _url_origin=Object(__WEBPACK_IMPORTED_MODULE_0_educoder__["V" /* getUrl2 */])();var _path=Object(__WEBPACK_IMPORTED_MODULE_0_educoder__["Y" /* isDev */])()?'public':'build';var _testHost='';// 'http://192.168.2.63:3001/api' ; // '' ; 
var login='innov';// 工单注释
// https://workorder.console.aliyun.com/console.htm#/ticket/detail/?ticketId=FLASELR
// https://workorder.console.aliyun.com/console.htm#/ticket/detail/?ticketId=1FB4APN
// https://help.aliyun.com/document_detail/52204.html?spm=5176.2020520165.120.d52204.19a47029YWhro7#%E4%B8%8A%E4%BC%A0%E5%9C%B0%E5%9D%80%E5%92%8C%E5%87%AD%E8%AF%81%E6%96%B9%E5%BC%8F(%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8)
var uploader=void 0;var $=window.$;function loadLib(callback){$.getScript(_url_origin+'/react/'+_path+'/js/aliyun-upload/lib/es6-promise.min.js',function(data,textStatus,jqxhr){$.getScript(_url_origin+'/react/'+_path+'/js/aliyun-upload/lib/aliyun-oss-sdk-5.3.1.min.js',function(data,textStatus,jqxhr){$.getScript(_url_origin+'/react/'+_path+'/js/aliyun-upload/aliyun-upload-sdk-1.5.0.min.js',function(data,textStatus,jqxhr){callback&&callback();});});});}function createUploader(options){if(window.AliyunUpload&&window.AliyunUpload.Vod){doCreateUploader(options);}else{loadLib(function(){doCreateUploader(options);});}}function doCreateUploader(options){uploader=new window.AliyunUpload.Vod({timeout:$('#timeout').val()||60000,partSize:$('#partSize').val()||1048576,parallel:$('#parallel').val()||5,retryCount:$('#retryCount').val()||3,retryDuration:$('#retryDuration').val()||2,region:$('#region').val()||'ap-southeast-1',userId:$('#userId').val()||1829848226361863,// 1303984639806000,
// 解决取消上传后无法继续上传同文件的问题
// https://workorder.console.aliyun.com/console.htm#/ticket/detail/?ticketId=FLASELR
enableUploadProgress:false,// 添加文件成功
addFileSuccess:function addFileSuccess(uploadInfo){console.log("addFileSuccess: "+uploadInfo.file.name);options.addFileSuccess&&options.addFileSuccess(uploadInfo);uploader.startUpload();},// 开始上传
onUploadstarted:function onUploadstarted(uploadInfo){// 如果是 UploadAuth 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
// 如果是 UploadAuth 上传方式, 需要根据 uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress
// 如果 uploadInfo.videoId 有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
// 注意: 这里是测试 demo 所以直接调用了获取 UploadAuth 的测试接口, 用户在使用时需要判断 uploadInfo.videoId 存在与否从而调用 openApi
// 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)
// 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)
var fileName=uploadInfo.file.name;if(!uploadInfo.videoId){var createUrl=_testHost+'/users/'+login+'/video_auths.json';var _random='';// Math.random().toString().substring(3, 6)+'-'
__WEBPACK_IMPORTED_MODULE_1_axios___default.a.post(createUrl,{title:_random+fileName,file_name:_random+fileName}).then(function(response){// if (response.data.status == )
if(response){var data=response.data.data;var uploadAuth=data.UploadAuth;var uploadAddress=data.UploadAddress;var videoId=data.VideoId;uploader.setUploadAuthAndAddress(uploadInfo,uploadAuth,uploadAddress,videoId);}}).catch(function(error){// 删除当前出错的，并执行下一个任务
uploader.deleteFile(uploader._curIndex);uploader.nextUpload();console.log(error);});$('#status').text('文件开始上传...');console.log("onUploadStarted:"+uploadInfo.file.name+", endpoint:"+uploadInfo.endpoint+", bucket:"+uploadInfo.bucket+", object:"+uploadInfo.object);}else{// 如果videoId有值，根据videoId刷新上传凭证
var refreshUrl=_testHost+'/users/'+login+'/video_auths.json';__WEBPACK_IMPORTED_MODULE_1_axios___default.a.put(refreshUrl,{video_id:uploadInfo.videoId,title:fileName,file_name:fileName}).then(function(response){if(response.data.status==-1){options.onUploadError&&options.onUploadError(uploadInfo);return;}var data=response.data.data;var uploadAuth=data.UploadAuth;var uploadAddress=data.UploadAddress;var videoId=data.VideoId;uploader.setUploadAuthAndAddress(uploadInfo,uploadAuth,uploadAddress);// , videoId
}).catch(function(error){uploader.deleteFile(uploader._curIndex);uploader.nextUpload();console.log(error);});}},// 文件上传成功
onUploadSucceed:function onUploadSucceed(uploadInfo){options.onUploadSucceed&&options.onUploadSucceed(uploadInfo);console.log("onUploadSucceed: "+uploadInfo.file.name+", endpoint:"+uploadInfo.endpoint+", bucket:"+uploadInfo.bucket+", object:"+uploadInfo.object);$('#status').text('文件上传成功!');},// 文件上传失败
onUploadFailed:function onUploadFailed(uploadInfo,code,message){options.onUploadFailed&&options.onUploadFailed(uploadInfo);console.log("onUploadFailed: file:"+uploadInfo.file.name+",code:"+code+", message:"+message);$('#status').text('文件上传失败!');},// 取消文件上传
onUploadCanceled:function onUploadCanceled(uploadInfo,code,message){console.log("Canceled file: "+uploadInfo.file.name+", code: "+code+", message:"+message);$('#status').text('文件上传已暂停!');},// 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
onUploadProgress:function onUploadProgress(uploadInfo,totalSize,progress){options.onUploadProgress&&options.onUploadProgress(uploadInfo,totalSize,progress);console.log("onUploadProgress:file:"+uploadInfo.file.name+", fileSize:"+totalSize+", percent:"+Math.ceil(progress*100)+"%");var progressPercent=Math.ceil(progress*100);$('#auth-progress').text(progressPercent);$('#status').text('文件上传中...');},// 上传凭证超时
onUploadTokenExpired:function onUploadTokenExpired(uploadInfo){// 上传大文件超时, 如果是上传方式一即根据 UploadAuth 上传时
// 需要根据 uploadInfo.videoId 调用刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)重新获取 UploadAuth
// 然后调用 resumeUploadWithAuth 方法, 这里是测试接口, 所以我直接获取了 UploadAuth
$('#status').text('文件上传超时!');var refreshUrl=_testHost+'/users/'+login+'/video_auths.json';__WEBPACK_IMPORTED_MODULE_1_axios___default.a.put(refreshUrl,{video_id:uploadInfo.videoId}).then(function(response){var data=response.data.data;var uploadAuth=data.UploadAuth;uploader.resumeUploadWithAuth(uploadAuth);}).catch(function(error){console.log(error);});},// 全部文件上传结束
onUploadEnd:function onUploadEnd(uploadInfo){options.onUploadEnd&&options.onUploadEnd(uploadInfo);$('#status').text('文件上传完毕!');console.log("onUploadEnd: uploaded all the files");}});if(options.gotUploader){options.gotUploader(uploader);}}function getUploader(_login,options){_login&&(login=_login);if(!uploader||options.create==true){createUploader(options);}}

/***/ }),

/***/ 3309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = reducer;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initialState; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutability_helper__ = __webpack_require__(1175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutability_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_immutability_helper__);
function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function find(state,action){var _index=-1;state.videos.some(function(item,index){// 同文件不同名字 fileHash也是一样的
if(item.loaded!=100&&(!item.fileHash||action.uploadInfo.fileHash==item.fileHash)&&action.uploadInfo.file.name==item.name){_index=index;return true;}});return _index;}function reducer(state,action){switch(action.type){case'addVideo':var uploadInfo=action.uploadInfo;return{videos:[].concat(_toConsumableArray(state.videos),[{name:uploadInfo.file.name,size:uploadInfo.file.size,type:uploadInfo.file.type,fileHash:uploadInfo.fileHash,// "ba1bbc53fdecd9eaaae479fbd9518442"
state:uploadInfo.state,//  "Uploading"  "Ready"   "Success"
videoId:uploadInfo.videoId,//   "719b82c875c34ac39f94feb145d25ad2"
loaded:0,title:''}])};case'removeVideo':return{videos:__WEBPACK_IMPORTED_MODULE_0_immutability_helper___default()(state.videos,{$splice:[[action.index,1]]})};case'removeAll':return{videos:[]};case'updateProgress':var _index=find(state,action);var newvideos=state.videos;// 删除先执行
if(_index!=-1){newvideos=__WEBPACK_IMPORTED_MODULE_0_immutability_helper___default()(state.videos,_defineProperty({},_index,{loaded:{$set:action.progressPercent},videoId:{$set:action.uploadInfo.videoId},// addFileSuccess的时候没有fileHash
fileHash:{$set:action.uploadInfo.fileHash}}));}return{videos:newvideos};case'updateTitle':var _upadteIndex=action.index;var newvideos2=state.videos;if(_upadteIndex!=-1){newvideos2=__WEBPACK_IMPORTED_MODULE_0_immutability_helper___default()(state.videos,_defineProperty({},_upadteIndex,{title:{$set:action.title}}));}return{videos:newvideos2};default:throw new Error();}}var initialState={videos:[]};

/***/ }),

/***/ 3310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export deleteVideoInCloud */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
function deleteVideoInCloud(login,video_id){var url='/users/'+login+'/videos/cancel.json';__WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(url,{video_id:video_id}).then(function(response){}).catch(function(error){console.log(error);});}

/***/ }),

/***/ 3311:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAwBAMAAABTZWEsAAAAIVBMVEVHcExMrf9Qr/9TuP9Mrf9Nrf9Mrf9MrP9Nrv9Orv9MrP98EuefAAAACnRSTlMA3CULV5jA84JH4j3LZgAAANVJREFUOMvl1a0OwjAUBeCb/QgcGckSphqeAASBoKaR4KpwJDwAYhaHQuGbLNtynpKWmTWs92rg2n45orc7I9qeEZzrjSgqwIxRtAI7M7rzoKMLjhScNRqqsAyDGC0BxIw9/UYQKQEUHQ9SoGSBBmoOpG4/JQO0A3UYpP2KyyDQaGG8CB/YgDnMfhjhAw2zgEmGER6wAVkEQzbiMQp29g07YCOmo2CDjBywEadRkOSqB5NcBa/6Dbhd/AmIq0Z41c/DL3y8n0AsMbEGxSIVq1gsc+l38AI000Nd23IRqQAAAABJRU5ErkJggg=="

/***/ }),

/***/ 3312:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABgBAMAAAAnVGd6AAAAJFBMVEVHcExMrf9Orf9Nrf90uv9MrP////95wP/M5//z+v+x2/9cs//eVCejAAAABXRSTlMA10ycBa32wqwAAAFsSURBVFjD7dk/TsMwFMfxJ8QNIHsHOABDduAGJXoyUnZTsmcoByg3KANz/0i9AHA6YruBIjXPr/6hLrWlLlXy0dcZrPSViOj+puCENb64Ir/Okm73xMjdf15y8qpuO+COgXXZASUCVN0TYGiNsB24PVxjwAP2CNxDKDBgjAMMrgxkIANHAr5aDPiwtoWAubVPCPBobSxBBmYOeEsHfIB9bpMBHxBJoGhAJIHiAXICxQPkBFIEiAmkCBATSBMgJZAmQEogMWDiPnMxgcSAlQOmYgJJAY1xgBETSApYeIDFBJICOABiAkkBW0BM2A8sQ0APhIR3PVBvA3ogJDR6wPTX94BPmBwILHYAn3AA4A7jhncBM3g87wemIeAX+PlGCdTrFf8FeP2acqybwa1nIAMZODWgHjyMtW+qM/BNlT+HjkItUL9s8i+WDGTgSECB3f8Ps7QSAyp8IAmPROGhLDwWxgfT8GgcHs6Dfw98A1V0Ca+XaA0MAAAAAElFTkSuQmCC"

/***/ }),

/***/ 946:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validProgress = validProgress;

// eslint-disable-next-line import/prefer-default-export
function validProgress(progress) {
  if (!progress || progress < 0) {
    return 0;
  }

  if (progress > 100) {
    return 100;
  }

  return progress;
}
//# sourceMappingURL=utils.js.map


/***/ }),

/***/ 986:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var enhancer = function enhancer(WrappedComponent) {
  return (
    /*#__PURE__*/
    function (_WrappedComponent) {
      _inherits(Progress, _WrappedComponent);

      function Progress() {
        _classCallCheck(this, Progress);

        return _possibleConstructorReturn(this, _getPrototypeOf(Progress).apply(this, arguments));
      }

      _createClass(Progress, [{
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
          var _this = this;

          var now = Date.now();
          var updated = false;
          Object.keys(this.paths).forEach(function (key) {
            var path = _this.paths[key];

            if (!path) {
              return;
            }

            updated = true;
            var pathStyle = path.style;
            pathStyle.transitionDuration = '.3s, .3s, .3s, .06s';

            if (_this.prevTimeStamp && now - _this.prevTimeStamp < 100) {
              pathStyle.transitionDuration = '0s, 0s';
            }
          });

          if (updated) {
            this.prevTimeStamp = Date.now();
          }
        }
      }, {
        key: "render",
        value: function render() {
          return _get(_getPrototypeOf(Progress.prototype), "render", this).call(this);
        }
      }]);

      return Progress;
    }(WrappedComponent)
  );
};

/* harmony default export */ __webpack_exports__["a"] = (enhancer);

/***/ }),

/***/ 987:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defaultProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return propTypes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);

var defaultProps = {
  className: '',
  percent: 0,
  prefixCls: 'rc-progress',
  strokeColor: '#2db7f5',
  strokeLinecap: 'round',
  strokeWidth: 1,
  style: {},
  trailColor: '#D9D9D9',
  trailWidth: 1
};
var mixedType = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string]);
var propTypes = {
  className: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  percent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([mixedType, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.arrayOf(mixedType)]),
  prefixCls: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  strokeColor: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.object])), __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.object]),
  strokeLinecap: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOf(['butt', 'round', 'square']),
  strokeWidth: mixedType,
  style: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.object,
  trailColor: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  trailWidth: mixedType
};

/***/ })

});