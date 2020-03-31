webpackJsonp([162],{

/***/ 1140:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(29);

__webpack_require__(1201);
//# sourceMappingURL=css.js.map


/***/ }),

/***/ 1141:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(__webpack_require__(0));

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _rcInputNumber = _interopRequireDefault(__webpack_require__(1203));

var _icon = _interopRequireDefault(__webpack_require__(26));

var _configProvider = __webpack_require__(11);

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

var InputNumber =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InputNumber, _React$Component);

  function InputNumber() {
    var _this;

    _classCallCheck(this, InputNumber);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputNumber).apply(this, arguments));

    _this.saveInputNumber = function (inputNumberRef) {
      _this.inputNumberRef = inputNumberRef;
    };

    _this.renderInputNumber = function (_ref) {
      var _classNames;

      var getPrefixCls = _ref.getPrefixCls;

      var _a = _this.props,
          className = _a.className,
          size = _a.size,
          customizePrefixCls = _a.prefixCls,
          others = __rest(_a, ["className", "size", "prefixCls"]);

      var prefixCls = getPrefixCls('input-number', customizePrefixCls);
      var inputNumberClass = (0, _classnames["default"])((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-lg"), size === 'large'), _defineProperty(_classNames, "".concat(prefixCls, "-sm"), size === 'small'), _classNames), className);
      var upIcon = React.createElement(_icon["default"], {
        type: "up",
        className: "".concat(prefixCls, "-handler-up-inner")
      });
      var downIcon = React.createElement(_icon["default"], {
        type: "down",
        className: "".concat(prefixCls, "-handler-down-inner")
      });
      return React.createElement(_rcInputNumber["default"], _extends({
        ref: _this.saveInputNumber,
        className: inputNumberClass,
        upHandler: upIcon,
        downHandler: downIcon,
        prefixCls: prefixCls
      }, others));
    };

    return _this;
  }

  _createClass(InputNumber, [{
    key: "focus",
    value: function focus() {
      this.inputNumberRef.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.inputNumberRef.blur();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderInputNumber);
    }
  }]);

  return InputNumber;
}(React.Component);

exports["default"] = InputNumber;
InputNumber.defaultProps = {
  step: 1
};
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 1167:
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

/***/ 1201:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1202);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(300)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 1202:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(299)(true);
// imports


// module
exports.push([module.i, ".ant-input-number{-webkit-box-sizing:border-box;box-sizing:border-box;font-variant:tabular-nums;list-style:none;-webkit-font-feature-settings:\"tnum\";font-feature-settings:\"tnum\";position:relative;width:100%;height:32px;padding:4px 11px;color:rgba(0,0,0,.65);font-size:14px;line-height:1.5;background-color:#fff;background-image:none;-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s;display:inline-block;width:90px;margin:0;padding:0;border:1px solid #d9d9d9;border-radius:4px}.ant-input-number::-moz-placeholder{color:#bfbfbf;opacity:1}.ant-input-number:-ms-input-placeholder{color:#bfbfbf}.ant-input-number::-webkit-input-placeholder{color:#bfbfbf}.ant-input-number:placeholder-shown{-o-text-overflow:ellipsis;text-overflow:ellipsis}.ant-input-number:focus{border-color:#40a9ff;border-right-width:1px!important;outline:0;-webkit-box-shadow:0 0 0 2px rgba(24,144,255,.2);box-shadow:0 0 0 2px rgba(24,144,255,.2)}.ant-input-number[disabled]{color:rgba(0,0,0,.25);background-color:#f5f5f5;cursor:not-allowed;opacity:1}.ant-input-number[disabled]:hover{border-color:#d9d9d9;border-right-width:1px!important}textarea.ant-input-number{max-width:100%;height:auto;min-height:32px;line-height:1.5;vertical-align:bottom;-webkit-transition:all .3s,height 0s;-o-transition:all .3s,height 0s;transition:all .3s,height 0s}.ant-input-number-lg{height:40px;padding:6px 11px}.ant-input-number-sm{height:24px;padding:1px 7px}.ant-input-number-handler{position:relative;display:block;width:100%;height:50%;overflow:hidden;color:rgba(0,0,0,.45);font-weight:700;line-height:0;text-align:center;-webkit-transition:all .1s linear;-o-transition:all .1s linear;transition:all .1s linear}.ant-input-number-handler:active{background:#f4f4f4}.ant-input-number-handler:hover .ant-input-number-handler-down-inner,.ant-input-number-handler:hover .ant-input-number-handler-up-inner{color:#40a9ff}.ant-input-number-handler-down-inner,.ant-input-number-handler-up-inner{display:inline-block;color:inherit;font-style:normal;line-height:0;text-align:center;text-transform:none;vertical-align:-.125em;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;position:absolute;right:4px;width:12px;height:12px;color:rgba(0,0,0,.45);line-height:12px;-webkit-transition:all .1s linear;-o-transition:all .1s linear;transition:all .1s linear;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ant-input-number-handler-down-inner>*,.ant-input-number-handler-up-inner>*{line-height:1}.ant-input-number-handler-down-inner svg,.ant-input-number-handler-up-inner svg{display:inline-block}.ant-input-number-handler-down-inner:before,.ant-input-number-handler-up-inner:before{display:none}.ant-input-number-handler-down-inner .ant-input-number-handler-down-inner-icon,.ant-input-number-handler-down-inner .ant-input-number-handler-up-inner-icon,.ant-input-number-handler-up-inner .ant-input-number-handler-down-inner-icon,.ant-input-number-handler-up-inner .ant-input-number-handler-up-inner-icon{display:block}.ant-input-number-focused,.ant-input-number:hover{border-color:#40a9ff;border-right-width:1px!important}.ant-input-number-focused{outline:0;-webkit-box-shadow:0 0 0 2px rgba(24,144,255,.2);box-shadow:0 0 0 2px rgba(24,144,255,.2)}.ant-input-number-disabled{color:rgba(0,0,0,.25);background-color:#f5f5f5;cursor:not-allowed;opacity:1}.ant-input-number-disabled:hover{border-color:#d9d9d9;border-right-width:1px!important}.ant-input-number-disabled .ant-input-number-input{cursor:not-allowed}.ant-input-number-disabled .ant-input-number-handler-wrap{display:none}.ant-input-number-input{width:100%;height:30px;padding:0 11px;text-align:left;background-color:transparent;border:0;border-radius:4px;outline:0;-webkit-transition:all .3s linear;-o-transition:all .3s linear;transition:all .3s linear;-moz-appearance:textfield!important}.ant-input-number-input::-moz-placeholder{color:#bfbfbf;opacity:1}.ant-input-number-input:-ms-input-placeholder{color:#bfbfbf}.ant-input-number-input::-webkit-input-placeholder{color:#bfbfbf}.ant-input-number-input:placeholder-shown{-o-text-overflow:ellipsis;text-overflow:ellipsis}.ant-input-number-input[type=number]::-webkit-inner-spin-button,.ant-input-number-input[type=number]::-webkit-outer-spin-button{margin:0;-webkit-appearance:none}.ant-input-number-lg{padding:0;font-size:16px}.ant-input-number-lg input{height:38px}.ant-input-number-sm{padding:0}.ant-input-number-sm input{height:22px;padding:0 7px}.ant-input-number-handler-wrap{position:absolute;top:0;right:0;width:22px;height:100%;background:#fff;border-left:1px solid #d9d9d9;border-radius:0 4px 4px 0;opacity:0;-webkit-transition:opacity .24s linear .1s;-o-transition:opacity .24s linear .1s;transition:opacity .24s linear .1s}.ant-input-number-handler-wrap .ant-input-number-handler .ant-input-number-handler-down-inner,.ant-input-number-handler-wrap .ant-input-number-handler .ant-input-number-handler-up-inner{display:inline-block;font-size:12px;font-size:7px\\9;-webkit-transform:scale(.58333333) rotate(0deg);-ms-transform:scale(.58333333) rotate(0deg);transform:scale(.58333333) rotate(0deg);min-width:auto;margin-right:0}:root .ant-input-number-handler-wrap .ant-input-number-handler .ant-input-number-handler-down-inner,:root .ant-input-number-handler-wrap .ant-input-number-handler .ant-input-number-handler-up-inner{font-size:12px}.ant-input-number-handler-wrap:hover .ant-input-number-handler{height:40%}.ant-input-number:hover .ant-input-number-handler-wrap{opacity:1}.ant-input-number-handler-up{border-top-right-radius:4px;cursor:pointer}.ant-input-number-handler-up-inner{top:50%;margin-top:-5px;text-align:center}.ant-input-number-handler-up:hover{height:60%!important}.ant-input-number-handler-down{top:0;border-top:1px solid #d9d9d9;border-bottom-right-radius:4px;cursor:pointer}.ant-input-number-handler-down-inner{top:50%;margin-top:-6px;text-align:center}.ant-input-number-handler-down:hover{height:60%!important}.ant-input-number-handler-down-disabled,.ant-input-number-handler-up-disabled{cursor:not-allowed}.ant-input-number-handler-down-disabled:hover .ant-input-number-handler-down-inner,.ant-input-number-handler-up-disabled:hover .ant-input-number-handler-up-inner{color:rgba(0,0,0,.25)}", "", {"version":3,"sources":["/Users/jasder/work/trustie3.0/forgeplus-react/node_modules/antd/lib/input-number/style/index.css"],"names":[],"mappings":"AAIA,kBACE,8BAA+B,AACvB,sBAAuB,AAC/B,0BAA2B,AAC3B,gBAAiB,AACjB,qCAAsC,AAC9B,6BAA8B,AACtC,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,iBAAkB,AAClB,sBAA2B,AAC3B,eAAgB,AAChB,gBAAiB,AACjB,sBAAuB,AACvB,sBAAuB,AACvB,2BAA6B,AAC7B,sBAAwB,AACxB,mBAAqB,AACrB,qBAAsB,AACtB,WAAY,AACZ,SAAU,AACV,UAAW,AACX,yBAA0B,AAC1B,iBAAmB,CACpB,AACD,oCACE,cAAe,AACf,SAAW,CACZ,AACD,wCACE,aAAe,CAChB,AACD,6CACE,aAAe,CAChB,AACD,oCACE,0BAA2B,AACxB,sBAAwB,CAC5B,AAKD,wBACE,qBAAsB,AACtB,iCAAmC,AACnC,UAAW,AACX,iDAAsD,AAC9C,wCAA8C,CACvD,AAWD,4BACE,sBAA2B,AAC3B,yBAA0B,AAC1B,mBAAoB,AACpB,SAAW,CACZ,AACD,kCACE,qBAAsB,AACtB,gCAAmC,CACpC,AACD,0BACE,eAAgB,AAChB,YAAa,AACb,gBAAiB,AACjB,gBAAiB,AACjB,sBAAuB,AACvB,qCAAwC,AACxC,gCAAmC,AACnC,4BAAgC,CACjC,AACD,qBACE,YAAa,AACb,gBAAkB,CAEnB,AACD,qBACE,YAAa,AACb,eAAiB,CAClB,AACD,0BACE,kBAAmB,AACnB,cAAe,AACf,WAAY,AACZ,WAAY,AACZ,gBAAiB,AACjB,sBAA2B,AAC3B,gBAAkB,AAClB,cAAe,AACf,kBAAmB,AACnB,kCAAoC,AACpC,6BAA+B,AAC/B,yBAA4B,CAC7B,AACD,iCACE,kBAAoB,CACrB,AACD,wIAEE,aAAe,CAChB,AACD,wEAEE,qBAAsB,AACtB,cAAe,AACf,kBAAmB,AACnB,cAAe,AACf,kBAAmB,AACnB,oBAAqB,AACrB,uBAAyB,AACzB,kCAAmC,AACnC,mCAAoC,AACpC,kCAAmC,AACnC,kBAAmB,AACnB,UAAW,AACX,WAAY,AACZ,YAAa,AACb,sBAA2B,AAC3B,iBAAkB,AAClB,kCAAoC,AACpC,6BAA+B,AAC/B,0BAA4B,AAC5B,yBAA0B,AACvB,sBAAuB,AACtB,qBAAsB,AAClB,gBAAkB,CAC3B,AACD,4EAEE,aAAe,CAChB,AACD,gFAEE,oBAAsB,CACvB,AACD,sFAEE,YAAc,CACf,AACD,oTAIE,aAAe,CAChB,AAKD,kDAHE,qBAAsB,AACtB,gCAAmC,CAQpC,AAND,0BAGE,UAAW,AACX,iDAAsD,AAC9C,wCAA8C,CACvD,AACD,2BACE,sBAA2B,AAC3B,yBAA0B,AAC1B,mBAAoB,AACpB,SAAW,CACZ,AACD,iCACE,qBAAsB,AACtB,gCAAmC,CACpC,AACD,mDACE,kBAAoB,CACrB,AACD,0DACE,YAAc,CACf,AACD,wBACE,WAAY,AACZ,YAAa,AACb,eAAgB,AAChB,gBAAiB,AACjB,6BAA8B,AAC9B,SAAU,AACV,kBAAmB,AACnB,UAAW,AACX,kCAAoC,AACpC,6BAA+B,AAC/B,0BAA4B,AAC5B,mCAAsC,CACvC,AACD,0CACE,cAAe,AACf,SAAW,CACZ,AACD,8CACE,aAAe,CAChB,AACD,mDACE,aAAe,CAChB,AACD,0CACE,0BAA2B,AACxB,sBAAwB,CAC5B,AACD,gIAEE,SAAU,AACV,uBAAyB,CAC1B,AACD,qBACE,UAAW,AACX,cAAgB,CACjB,AACD,2BACE,WAAa,CACd,AACD,qBACE,SAAW,CACZ,AACD,2BACE,YAAa,AACb,aAAe,CAChB,AACD,+BACE,kBAAmB,AACnB,MAAO,AACP,QAAS,AACT,WAAY,AACZ,YAAa,AACb,gBAAiB,AACjB,8BAA+B,AAC/B,0BAA2B,AAC3B,UAAW,AACX,2CAA8C,AAC9C,sCAAyC,AACzC,kCAAsC,CACvC,AACD,0LAEE,qBAAsB,AACtB,eAAgB,AAChB,gBAAkB,AAClB,gDAAkD,AAC9C,4CAA8C,AAC1C,wCAA0C,AAClD,eAAgB,AAChB,cAAgB,CACjB,AACD,sMAEE,cAAgB,CACjB,AACD,+DACE,UAAY,CACb,AACD,uDACE,SAAW,CACZ,AACD,6BACE,4BAA6B,AAC7B,cAAgB,CACjB,AACD,mCACE,QAAS,AACT,gBAAiB,AACjB,iBAAmB,CACpB,AACD,mCACE,oBAAuB,CACxB,AACD,+BACE,MAAO,AACP,6BAA8B,AAC9B,+BAAgC,AAChC,cAAgB,CACjB,AACD,qCACE,QAAS,AACT,gBAAiB,AACjB,iBAAmB,CACpB,AACD,qCACE,oBAAuB,CACxB,AACD,8EAEE,kBAAoB,CACrB,AACD,kKAEE,qBAA2B,CAC5B","file":"index.css","sourcesContent":["/* stylelint-disable at-rule-empty-line-before,at-rule-name-space-after,at-rule-no-unknown */\n/* stylelint-disable no-duplicate-selectors */\n/* stylelint-disable */\n/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors,string-no-newline */\n.ant-input-number {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-variant: tabular-nums;\n  list-style: none;\n  -webkit-font-feature-settings: 'tnum';\n          font-feature-settings: 'tnum';\n  position: relative;\n  width: 100%;\n  height: 32px;\n  padding: 4px 11px;\n  color: rgba(0, 0, 0, 0.65);\n  font-size: 14px;\n  line-height: 1.5;\n  background-color: #fff;\n  background-image: none;\n  -webkit-transition: all 0.3s;\n  -o-transition: all 0.3s;\n  transition: all 0.3s;\n  display: inline-block;\n  width: 90px;\n  margin: 0;\n  padding: 0;\n  border: 1px solid #d9d9d9;\n  border-radius: 4px;\n}\n.ant-input-number::-moz-placeholder {\n  color: #bfbfbf;\n  opacity: 1;\n}\n.ant-input-number:-ms-input-placeholder {\n  color: #bfbfbf;\n}\n.ant-input-number::-webkit-input-placeholder {\n  color: #bfbfbf;\n}\n.ant-input-number:placeholder-shown {\n  -o-text-overflow: ellipsis;\n     text-overflow: ellipsis;\n}\n.ant-input-number:hover {\n  border-color: #40a9ff;\n  border-right-width: 1px !important;\n}\n.ant-input-number:focus {\n  border-color: #40a9ff;\n  border-right-width: 1px !important;\n  outline: 0;\n  -webkit-box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);\n          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);\n}\n.ant-input-number-disabled {\n  color: rgba(0, 0, 0, 0.25);\n  background-color: #f5f5f5;\n  cursor: not-allowed;\n  opacity: 1;\n}\n.ant-input-number-disabled:hover {\n  border-color: #d9d9d9;\n  border-right-width: 1px !important;\n}\n.ant-input-number[disabled] {\n  color: rgba(0, 0, 0, 0.25);\n  background-color: #f5f5f5;\n  cursor: not-allowed;\n  opacity: 1;\n}\n.ant-input-number[disabled]:hover {\n  border-color: #d9d9d9;\n  border-right-width: 1px !important;\n}\ntextarea.ant-input-number {\n  max-width: 100%;\n  height: auto;\n  min-height: 32px;\n  line-height: 1.5;\n  vertical-align: bottom;\n  -webkit-transition: all 0.3s, height 0s;\n  -o-transition: all 0.3s, height 0s;\n  transition: all 0.3s, height 0s;\n}\n.ant-input-number-lg {\n  height: 40px;\n  padding: 6px 11px;\n  font-size: 16px;\n}\n.ant-input-number-sm {\n  height: 24px;\n  padding: 1px 7px;\n}\n.ant-input-number-handler {\n  position: relative;\n  display: block;\n  width: 100%;\n  height: 50%;\n  overflow: hidden;\n  color: rgba(0, 0, 0, 0.45);\n  font-weight: bold;\n  line-height: 0;\n  text-align: center;\n  -webkit-transition: all 0.1s linear;\n  -o-transition: all 0.1s linear;\n  transition: all 0.1s linear;\n}\n.ant-input-number-handler:active {\n  background: #f4f4f4;\n}\n.ant-input-number-handler:hover .ant-input-number-handler-up-inner,\n.ant-input-number-handler:hover .ant-input-number-handler-down-inner {\n  color: #40a9ff;\n}\n.ant-input-number-handler-up-inner,\n.ant-input-number-handler-down-inner {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  position: absolute;\n  right: 4px;\n  width: 12px;\n  height: 12px;\n  color: rgba(0, 0, 0, 0.45);\n  line-height: 12px;\n  -webkit-transition: all 0.1s linear;\n  -o-transition: all 0.1s linear;\n  transition: all 0.1s linear;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.ant-input-number-handler-up-inner > *,\n.ant-input-number-handler-down-inner > * {\n  line-height: 1;\n}\n.ant-input-number-handler-up-inner svg,\n.ant-input-number-handler-down-inner svg {\n  display: inline-block;\n}\n.ant-input-number-handler-up-inner::before,\n.ant-input-number-handler-down-inner::before {\n  display: none;\n}\n.ant-input-number-handler-up-inner .ant-input-number-handler-up-inner-icon,\n.ant-input-number-handler-up-inner .ant-input-number-handler-down-inner-icon,\n.ant-input-number-handler-down-inner .ant-input-number-handler-up-inner-icon,\n.ant-input-number-handler-down-inner .ant-input-number-handler-down-inner-icon {\n  display: block;\n}\n.ant-input-number:hover {\n  border-color: #40a9ff;\n  border-right-width: 1px !important;\n}\n.ant-input-number-focused {\n  border-color: #40a9ff;\n  border-right-width: 1px !important;\n  outline: 0;\n  -webkit-box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);\n          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);\n}\n.ant-input-number-disabled {\n  color: rgba(0, 0, 0, 0.25);\n  background-color: #f5f5f5;\n  cursor: not-allowed;\n  opacity: 1;\n}\n.ant-input-number-disabled:hover {\n  border-color: #d9d9d9;\n  border-right-width: 1px !important;\n}\n.ant-input-number-disabled .ant-input-number-input {\n  cursor: not-allowed;\n}\n.ant-input-number-disabled .ant-input-number-handler-wrap {\n  display: none;\n}\n.ant-input-number-input {\n  width: 100%;\n  height: 30px;\n  padding: 0 11px;\n  text-align: left;\n  background-color: transparent;\n  border: 0;\n  border-radius: 4px;\n  outline: 0;\n  -webkit-transition: all 0.3s linear;\n  -o-transition: all 0.3s linear;\n  transition: all 0.3s linear;\n  -moz-appearance: textfield !important;\n}\n.ant-input-number-input::-moz-placeholder {\n  color: #bfbfbf;\n  opacity: 1;\n}\n.ant-input-number-input:-ms-input-placeholder {\n  color: #bfbfbf;\n}\n.ant-input-number-input::-webkit-input-placeholder {\n  color: #bfbfbf;\n}\n.ant-input-number-input:placeholder-shown {\n  -o-text-overflow: ellipsis;\n     text-overflow: ellipsis;\n}\n.ant-input-number-input[type='number']::-webkit-inner-spin-button,\n.ant-input-number-input[type='number']::-webkit-outer-spin-button {\n  margin: 0;\n  -webkit-appearance: none;\n}\n.ant-input-number-lg {\n  padding: 0;\n  font-size: 16px;\n}\n.ant-input-number-lg input {\n  height: 38px;\n}\n.ant-input-number-sm {\n  padding: 0;\n}\n.ant-input-number-sm input {\n  height: 22px;\n  padding: 0 7px;\n}\n.ant-input-number-handler-wrap {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 22px;\n  height: 100%;\n  background: #fff;\n  border-left: 1px solid #d9d9d9;\n  border-radius: 0 4px 4px 0;\n  opacity: 0;\n  -webkit-transition: opacity 0.24s linear 0.1s;\n  -o-transition: opacity 0.24s linear 0.1s;\n  transition: opacity 0.24s linear 0.1s;\n}\n.ant-input-number-handler-wrap .ant-input-number-handler .ant-input-number-handler-up-inner,\n.ant-input-number-handler-wrap .ant-input-number-handler .ant-input-number-handler-down-inner {\n  display: inline-block;\n  font-size: 12px;\n  font-size: 7px \\9;\n  -webkit-transform: scale(0.58333333) rotate(0deg);\n      -ms-transform: scale(0.58333333) rotate(0deg);\n          transform: scale(0.58333333) rotate(0deg);\n  min-width: auto;\n  margin-right: 0;\n}\n:root .ant-input-number-handler-wrap .ant-input-number-handler .ant-input-number-handler-up-inner,\n:root .ant-input-number-handler-wrap .ant-input-number-handler .ant-input-number-handler-down-inner {\n  font-size: 12px;\n}\n.ant-input-number-handler-wrap:hover .ant-input-number-handler {\n  height: 40%;\n}\n.ant-input-number:hover .ant-input-number-handler-wrap {\n  opacity: 1;\n}\n.ant-input-number-handler-up {\n  border-top-right-radius: 4px;\n  cursor: pointer;\n}\n.ant-input-number-handler-up-inner {\n  top: 50%;\n  margin-top: -5px;\n  text-align: center;\n}\n.ant-input-number-handler-up:hover {\n  height: 60% !important;\n}\n.ant-input-number-handler-down {\n  top: 0;\n  border-top: 1px solid #d9d9d9;\n  border-bottom-right-radius: 4px;\n  cursor: pointer;\n}\n.ant-input-number-handler-down-inner {\n  top: 50%;\n  margin-top: -6px;\n  text-align: center;\n}\n.ant-input-number-handler-down:hover {\n  height: 60% !important;\n}\n.ant-input-number-handler-up-disabled,\n.ant-input-number-handler-down-disabled {\n  cursor: not-allowed;\n}\n.ant-input-number-handler-up-disabled:hover .ant-input-number-handler-up-inner,\n.ant-input-number-handler-down-disabled:hover .ant-input-number-handler-down-inner {\n  color: rgba(0, 0, 0, 0.25);\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_classnames__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rc_util_es_KeyCode__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__InputHandler__ = __webpack_require__(1204);











function noop() {}

function preventDefault(e) {
  e.preventDefault();
}

function defaultParser(input) {
  return input.replace(/[^\w\.-]+/g, '');
}

/**
 * When click and hold on a button - the speed of auto changin the value.
 */
var SPEED = 200;

/**
 * When click and hold on a button - the delay before auto changin the value.
 */
var DELAY = 600;

/**
 * Max Safe Integer -- on IE this is not available, so manually set the number in that case.
 * The reason this is used, instead of Infinity is because numbers above the MSI are unstable
 */
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

var isValidProps = function isValidProps(value) {
  return value !== undefined && value !== null;
};

var isEqual = function isEqual(oldValue, newValue) {
  return newValue === oldValue || typeof newValue === 'number' && typeof oldValue === 'number' && isNaN(newValue) && isNaN(oldValue);
};

var InputNumber = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(InputNumber, _React$Component);

  function InputNumber(props) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, InputNumber);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, _React$Component.call(this, props));

    _initialiseProps.call(_this);

    var value = void 0;
    if ('value' in props) {
      value = props.value;
    } else {
      value = props.defaultValue;
    }
    _this.state = {
      focused: props.autoFocus
    };
    var validValue = _this.getValidValue(_this.toNumber(value));
    _this.state = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, _this.state, {
      inputValue: _this.toPrecisionAsStep(validValue),
      value: validValue
    });
    return _this;
  }

  InputNumber.prototype.componentDidMount = function componentDidMount() {
    this.componentDidUpdate();
  };

  InputNumber.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _props = this.props,
        value = _props.value,
        onChange = _props.onChange,
        max = _props.max,
        min = _props.min;
    var focused = this.state.focused;

    // Don't trigger in componentDidMount

    if (prevProps) {
      if (!isEqual(prevProps.value, value) || !isEqual(prevProps.max, max) || !isEqual(prevProps.min, min)) {
        var validValue = focused ? value : this.getValidValue(value);
        var nextInputValue = void 0;
        if (this.pressingUpOrDown) {
          nextInputValue = validValue;
        } else if (this.inputting) {
          nextInputValue = this.rawInput;
        } else {
          nextInputValue = this.toPrecisionAsStep(validValue);
        }
        this.setState({ // eslint-disable-line
          value: validValue,
          inputValue: nextInputValue
        });
      }

      // Trigger onChange when max or min change
      // https://github.com/ant-design/ant-design/issues/11574
      var nextValue = 'value' in this.props ? value : this.state.value;
      // ref: null < 20 === true
      // https://github.com/ant-design/ant-design/issues/14277
      if ('max' in this.props && prevProps.max !== max && typeof nextValue === 'number' && nextValue > max && onChange) {
        onChange(max);
      }
      if ('min' in this.props && prevProps.min !== min && typeof nextValue === 'number' && nextValue < min && onChange) {
        onChange(min);
      }
    }

    // Restore cursor
    try {
      // Firefox set the input cursor after it get focused.
      // This caused that if an input didn't init with the selection,
      // set will cause cursor not correct when first focus.
      // Safari will focus input if set selection. We need skip this.
      if (this.cursorStart !== undefined && this.state.focused) {
        // In most cases, the string after cursor is stable.
        // We can move the cursor before it

        if (
        // If not match full str, try to match part of str
        !this.partRestoreByAfter(this.cursorAfter) && this.state.value !== this.props.value) {
          // If not match any of then, let's just keep the position
          // TODO: Logic should not reach here, need check if happens
          var pos = this.cursorStart + 1;

          // If not have last string, just position to the end
          if (!this.cursorAfter) {
            pos = this.input.value.length;
          } else if (this.lastKeyCode === __WEBPACK_IMPORTED_MODULE_8_rc_util_es_KeyCode__["a" /* default */].BACKSPACE) {
            pos = this.cursorStart - 1;
          } else if (this.lastKeyCode === __WEBPACK_IMPORTED_MODULE_8_rc_util_es_KeyCode__["a" /* default */].DELETE) {
            pos = this.cursorStart;
          }
          this.fixCaret(pos, pos);
        } else if (this.currentValue === this.input.value) {
          // Handle some special key code
          switch (this.lastKeyCode) {
            case __WEBPACK_IMPORTED_MODULE_8_rc_util_es_KeyCode__["a" /* default */].BACKSPACE:
              this.fixCaret(this.cursorStart - 1, this.cursorStart - 1);
              break;
            case __WEBPACK_IMPORTED_MODULE_8_rc_util_es_KeyCode__["a" /* default */].DELETE:
              this.fixCaret(this.cursorStart + 1, this.cursorStart + 1);
              break;
            default:
            // Do nothing
          }
        }
      }
    } catch (e) {}
    // Do nothing


    // Reset last key
    this.lastKeyCode = null;

    // pressingUpOrDown is true means that someone just click up or down button
    if (!this.pressingUpOrDown) {
      return;
    }
    if (this.props.focusOnUpDown && this.state.focused) {
      if (document.activeElement !== this.input) {
        this.focus();
      }
    }

    this.pressingUpOrDown = false;
  };

  InputNumber.prototype.componentWillUnmount = function componentWillUnmount() {
    this.stop();
  };

  InputNumber.prototype.getCurrentValidValue = function getCurrentValidValue(value) {
    var val = value;
    if (val === '') {
      val = '';
    } else if (!this.isNotCompleteNumber(parseFloat(val, 10))) {
      val = this.getValidValue(val);
    } else {
      val = this.state.value;
    }
    return this.toNumber(val);
  };

  InputNumber.prototype.getRatio = function getRatio(e) {
    var ratio = 1;
    if (e.metaKey || e.ctrlKey) {
      ratio = 0.1;
    } else if (e.shiftKey) {
      ratio = 10;
    }
    return ratio;
  };

  InputNumber.prototype.getValueFromEvent = function getValueFromEvent(e) {
    // optimize for chinese input expierence
    // https://github.com/ant-design/ant-design/issues/8196
    var value = e.target.value.trim().replace(/。/g, '.');

    if (isValidProps(this.props.decimalSeparator)) {
      value = value.replace(this.props.decimalSeparator, '.');
    }

    return value;
  };

  InputNumber.prototype.getValidValue = function getValidValue(value) {
    var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.min;
    var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props.max;

    var val = parseFloat(value, 10);
    // https://github.com/ant-design/ant-design/issues/7358
    if (isNaN(val)) {
      return value;
    }
    if (val < min) {
      val = min;
    }
    if (val > max) {
      val = max;
    }
    return val;
  };

  InputNumber.prototype.setValue = function setValue(v, callback) {
    // trigger onChange
    var precision = this.props.precision;

    var newValue = this.isNotCompleteNumber(parseFloat(v, 10)) ? null : parseFloat(v, 10);
    var _state = this.state,
        _state$value = _state.value,
        value = _state$value === undefined ? null : _state$value,
        _state$inputValue = _state.inputValue,
        inputValue = _state$inputValue === undefined ? null : _state$inputValue;
    // https://github.com/ant-design/ant-design/issues/7363
    // https://github.com/ant-design/ant-design/issues/16622

    var newValueInString = typeof newValue === 'number' ? newValue.toFixed(precision) : '' + newValue;
    var changed = newValue !== value || newValueInString !== '' + inputValue;
    if (!('value' in this.props)) {
      this.setState({
        value: newValue,
        inputValue: this.toPrecisionAsStep(v)
      }, callback);
    } else {
      // always set input value same as value
      this.setState({
        inputValue: this.toPrecisionAsStep(this.state.value)
      }, callback);
    }
    if (changed) {
      this.props.onChange(newValue);
    }

    return newValue;
  };

  InputNumber.prototype.getPrecision = function getPrecision(value) {
    if (isValidProps(this.props.precision)) {
      return this.props.precision;
    }
    var valueString = value.toString();
    if (valueString.indexOf('e-') >= 0) {
      return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
    }
    var precision = 0;
    if (valueString.indexOf('.') >= 0) {
      precision = valueString.length - valueString.indexOf('.') - 1;
    }
    return precision;
  };

  // step={1.0} value={1.51}
  // press +
  // then value should be 2.51, rather than 2.5
  // if this.props.precision is undefined
  // https://github.com/react-component/input-number/issues/39


  InputNumber.prototype.getMaxPrecision = function getMaxPrecision(currentValue) {
    var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var _props2 = this.props,
        precision = _props2.precision,
        step = _props2.step;

    if (isValidProps(precision)) {
      return precision;
    }
    var ratioPrecision = this.getPrecision(ratio);
    var stepPrecision = this.getPrecision(step);
    var currentValuePrecision = this.getPrecision(currentValue);
    if (!currentValue) {
      return ratioPrecision + stepPrecision;
    }
    return Math.max(currentValuePrecision, ratioPrecision + stepPrecision);
  };

  InputNumber.prototype.getPrecisionFactor = function getPrecisionFactor(currentValue) {
    var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var precision = this.getMaxPrecision(currentValue, ratio);
    return Math.pow(10, precision);
  };

  InputNumber.prototype.fixCaret = function fixCaret(start, end) {
    if (start === undefined || end === undefined || !this.input || !this.input.value) {
      return;
    }

    try {
      var currentStart = this.input.selectionStart;
      var currentEnd = this.input.selectionEnd;

      if (start !== currentStart || end !== currentEnd) {
        this.input.setSelectionRange(start, end);
      }
    } catch (e) {
      // Fix error in Chrome:
      // Failed to read the 'selectionStart' property from 'HTMLInputElement'
      // http://stackoverflow.com/q/21177489/3040605
    }
  };

  InputNumber.prototype.focus = function focus() {
    this.input.focus();
    this.recordCursorPosition();
  };

  InputNumber.prototype.blur = function blur() {
    this.input.blur();
  };

  InputNumber.prototype.formatWrapper = function formatWrapper(num) {
    // http://2ality.com/2012/03/signedzero.html
    // https://github.com/ant-design/ant-design/issues/9439
    if (this.props.formatter) {
      return this.props.formatter(num);
    }
    return num;
  };

  InputNumber.prototype.toPrecisionAsStep = function toPrecisionAsStep(num) {
    if (this.isNotCompleteNumber(num) || num === '') {
      return num;
    }
    var precision = Math.abs(this.getMaxPrecision(num));
    if (!isNaN(precision)) {
      return Number(num).toFixed(precision);
    }
    return num.toString();
  };

  // '1.' '1x' 'xx' '' => are not complete numbers


  InputNumber.prototype.isNotCompleteNumber = function isNotCompleteNumber(num) {
    return isNaN(num) || num === '' || num === null || num && num.toString().indexOf('.') === num.toString().length - 1;
  };

  InputNumber.prototype.toNumber = function toNumber(num) {
    var precision = this.props.precision;
    var focused = this.state.focused;
    // num.length > 16 => This is to prevent input of large numbers

    var numberIsTooLarge = num && num.length > 16 && focused;
    if (this.isNotCompleteNumber(num) || numberIsTooLarge) {
      return num;
    }
    if (isValidProps(precision)) {
      return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
    }
    return Number(num);
  };

  InputNumber.prototype.upStep = function upStep(val, rat) {
    var step = this.props.step;

    var precisionFactor = this.getPrecisionFactor(val, rat);
    var precision = Math.abs(this.getMaxPrecision(val, rat));
    var result = ((precisionFactor * val + precisionFactor * step * rat) / precisionFactor).toFixed(precision);
    return this.toNumber(result);
  };

  InputNumber.prototype.downStep = function downStep(val, rat) {
    var step = this.props.step;

    var precisionFactor = this.getPrecisionFactor(val, rat);
    var precision = Math.abs(this.getMaxPrecision(val, rat));
    var result = ((precisionFactor * val - precisionFactor * step * rat) / precisionFactor).toFixed(precision);
    return this.toNumber(result);
  };

  InputNumber.prototype.step = function step(type, e) {
    var _this2 = this;

    var ratio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var recursive = arguments[3];

    this.stop();
    if (e) {
      e.persist();
      e.preventDefault();
    }
    var props = this.props;
    if (props.disabled) {
      return;
    }
    var value = this.getCurrentValidValue(this.state.inputValue) || 0;
    if (this.isNotCompleteNumber(value)) {
      return;
    }
    var val = this[type + 'Step'](value, ratio);
    var outOfRange = val > props.max || val < props.min;
    if (val > props.max) {
      val = props.max;
    } else if (val < props.min) {
      val = props.min;
    }
    this.setValue(val);
    this.setState({
      focused: true
    });
    if (outOfRange) {
      return;
    }
    this.autoStepTimer = setTimeout(function () {
      _this2[type](e, ratio, true);
    }, recursive ? SPEED : DELAY);
  };

  InputNumber.prototype.render = function render() {
    var _classNames;

    var props = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, this.props);

    var prefixCls = props.prefixCls,
        disabled = props.disabled,
        readOnly = props.readOnly,
        useTouch = props.useTouch,
        autoComplete = props.autoComplete,
        upHandler = props.upHandler,
        downHandler = props.downHandler,
        rest = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties___default()(props, ['prefixCls', 'disabled', 'readOnly', 'useTouch', 'autoComplete', 'upHandler', 'downHandler']);

    var classes = __WEBPACK_IMPORTED_MODULE_7_classnames___default()((_classNames = {}, _classNames[prefixCls] = true, _classNames[props.className] = !!props.className, _classNames[prefixCls + '-disabled'] = disabled, _classNames[prefixCls + '-focused'] = this.state.focused, _classNames));
    var upDisabledClass = '';
    var downDisabledClass = '';
    var value = this.state.value;

    if (value || value === 0) {
      if (!isNaN(value)) {
        var val = Number(value);
        if (val >= props.max) {
          upDisabledClass = prefixCls + '-handler-up-disabled';
        }
        if (val <= props.min) {
          downDisabledClass = prefixCls + '-handler-down-disabled';
        }
      } else {
        upDisabledClass = prefixCls + '-handler-up-disabled';
        downDisabledClass = prefixCls + '-handler-down-disabled';
      }
    }

    var dataOrAriaAttributeProps = {};
    for (var key in props) {
      if (props.hasOwnProperty(key) && (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role')) {
        dataOrAriaAttributeProps[key] = props[key];
      }
    }

    var editable = !props.readOnly && !props.disabled;

    // focus state, show input value
    // unfocus state, show valid value
    var inputDisplayValue = this.getInputDisplayValue();

    var upEvents = void 0;
    var downEvents = void 0;
    if (useTouch) {
      upEvents = {
        onTouchStart: editable && !upDisabledClass ? this.up : noop,
        onTouchEnd: this.stop
      };
      downEvents = {
        onTouchStart: editable && !downDisabledClass ? this.down : noop,
        onTouchEnd: this.stop
      };
    } else {
      upEvents = {
        onMouseDown: editable && !upDisabledClass ? this.up : noop,
        onMouseUp: this.stop,
        onMouseLeave: this.stop
      };
      downEvents = {
        onMouseDown: editable && !downDisabledClass ? this.down : noop,
        onMouseUp: this.stop,
        onMouseLeave: this.stop
      };
    }

    var isUpDisabled = !!upDisabledClass || disabled || readOnly;
    var isDownDisabled = !!downDisabledClass || disabled || readOnly;
    // ref for test
    return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'div',
      {
        className: classes,
        style: props.style,
        title: props.title,
        onMouseEnter: props.onMouseEnter,
        onMouseLeave: props.onMouseLeave,
        onMouseOver: props.onMouseOver,
        onMouseOut: props.onMouseOut
      },
      __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        { className: prefixCls + '-handler-wrap' },
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_9__InputHandler__["a" /* default */],
          __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({
            ref: this.saveUp,
            disabled: isUpDisabled,
            prefixCls: prefixCls,
            unselectable: 'unselectable'
          }, upEvents, {
            role: 'button',
            'aria-label': 'Increase Value',
            'aria-disabled': !!isUpDisabled,
            className: prefixCls + '-handler ' + prefixCls + '-handler-up ' + upDisabledClass
          }),
          upHandler || __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('span', {
            unselectable: 'unselectable',
            className: prefixCls + '-handler-up-inner',
            onClick: preventDefault
          })
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_9__InputHandler__["a" /* default */],
          __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({
            ref: this.saveDown,
            disabled: isDownDisabled,
            prefixCls: prefixCls,
            unselectable: 'unselectable'
          }, downEvents, {
            role: 'button',
            'aria-label': 'Decrease Value',
            'aria-disabled': !!isDownDisabled,
            className: prefixCls + '-handler ' + prefixCls + '-handler-down ' + downDisabledClass
          }),
          downHandler || __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('span', {
            unselectable: 'unselectable',
            className: prefixCls + '-handler-down-inner',
            onClick: preventDefault
          })
        )
      ),
      __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        {
          className: prefixCls + '-input-wrap'
        },
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('input', __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({
          role: 'spinbutton',
          'aria-valuemin': props.min,
          'aria-valuemax': props.max,
          'aria-valuenow': value,
          required: props.required,
          type: props.type,
          placeholder: props.placeholder,
          onClick: props.onClick,
          onMouseUp: this.onMouseUp,
          className: prefixCls + '-input',
          tabIndex: props.tabIndex,
          autoComplete: autoComplete,
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          onKeyDown: editable ? this.onKeyDown : noop,
          onKeyUp: editable ? this.onKeyUp : noop,
          autoFocus: props.autoFocus,
          maxLength: props.maxLength,
          readOnly: props.readOnly,
          disabled: props.disabled,
          max: props.max,
          min: props.min,
          step: props.step,
          name: props.name,
          title: props.title,
          id: props.id,
          onChange: this.onChange,
          ref: this.saveInput,
          value: inputDisplayValue,
          pattern: props.pattern,
          inputMode: props.inputMode
        }, dataOrAriaAttributeProps))
      )
    );
  };

  return InputNumber;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

InputNumber.propTypes = {
  value: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string]),
  defaultValue: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string]),
  focusOnUpDown: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  autoFocus: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  onChange: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  onPressEnter: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  onKeyDown: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  onKeyUp: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  prefixCls: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string,
  tabIndex: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.number]),
  disabled: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  onFocus: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  onBlur: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  readOnly: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  max: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.number,
  min: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.number,
  step: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string]),
  upHandler: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.node,
  downHandler: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.node,
  useTouch: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  formatter: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  parser: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  onMouseEnter: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  onMouseLeave: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  onMouseOver: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  onMouseOut: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  onMouseUp: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  precision: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.number,
  required: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  pattern: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string,
  decimalSeparator: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string,
  inputMode: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string
};
InputNumber.defaultProps = {
  focusOnUpDown: true,
  useTouch: false,
  prefixCls: 'rc-input-number',
  min: -MAX_SAFE_INTEGER,
  step: 1,
  style: {},
  onChange: noop,
  onKeyDown: noop,
  onPressEnter: noop,
  onFocus: noop,
  onBlur: noop,
  parser: defaultParser,
  required: false,
  autoComplete: 'off'
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onKeyDown = function (e) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var _props3 = _this3.props,
        onKeyDown = _props3.onKeyDown,
        onPressEnter = _props3.onPressEnter;


    if (e.keyCode === __WEBPACK_IMPORTED_MODULE_8_rc_util_es_KeyCode__["a" /* default */].UP) {
      var ratio = _this3.getRatio(e);
      _this3.up(e, ratio);
      _this3.stop();
    } else if (e.keyCode === __WEBPACK_IMPORTED_MODULE_8_rc_util_es_KeyCode__["a" /* default */].DOWN) {
      var _ratio = _this3.getRatio(e);
      _this3.down(e, _ratio);
      _this3.stop();
    } else if (e.keyCode === __WEBPACK_IMPORTED_MODULE_8_rc_util_es_KeyCode__["a" /* default */].ENTER && onPressEnter) {
      onPressEnter(e);
    }

    // Trigger user key down
    _this3.recordCursorPosition();
    _this3.lastKeyCode = e.keyCode;
    if (onKeyDown) {
      onKeyDown.apply(undefined, [e].concat(args));
    }
  };

  this.onKeyUp = function (e) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var onKeyUp = _this3.props.onKeyUp;


    _this3.stop();

    _this3.recordCursorPosition();

    // Trigger user key up
    if (onKeyUp) {
      onKeyUp.apply(undefined, [e].concat(args));
    }
  };

  this.onChange = function (e) {
    var onChange = _this3.props.onChange;


    if (_this3.state.focused) {
      _this3.inputting = true;
    }
    _this3.rawInput = _this3.props.parser(_this3.getValueFromEvent(e));
    _this3.setState({ inputValue: _this3.rawInput });
    onChange(_this3.toNumber(_this3.rawInput)); // valid number or invalid string
  };

  this.onMouseUp = function () {
    var onMouseUp = _this3.props.onMouseUp;


    _this3.recordCursorPosition();

    if (onMouseUp) {
      onMouseUp.apply(undefined, arguments);
    }
  };

  this.onFocus = function () {
    var _props4;

    _this3.setState({
      focused: true
    });
    (_props4 = _this3.props).onFocus.apply(_props4, arguments);
  };

  this.onBlur = function () {
    var onBlur = _this3.props.onBlur;

    _this3.inputting = false;
    _this3.setState({
      focused: false
    });
    var value = _this3.getCurrentValidValue(_this3.state.inputValue);
    var newValue = _this3.setValue(value);

    if (onBlur) {
      var originValue = _this3.input.value;
      var inputValue = _this3.getInputDisplayValue({ focus: false, value: newValue });
      _this3.input.value = inputValue;
      onBlur.apply(undefined, arguments);
      _this3.input.value = originValue;
    }
  };

  this.getInputDisplayValue = function (state) {
    var _ref = state || _this3.state,
        focused = _ref.focused,
        inputValue = _ref.inputValue,
        value = _ref.value;

    var inputDisplayValue = void 0;
    if (focused) {
      inputDisplayValue = inputValue;
    } else {
      inputDisplayValue = _this3.toPrecisionAsStep(value);
    }

    if (inputDisplayValue === undefined || inputDisplayValue === null) {
      inputDisplayValue = '';
    }

    var inputDisplayValueFormat = _this3.formatWrapper(inputDisplayValue);
    if (isValidProps(_this3.props.decimalSeparator)) {
      inputDisplayValueFormat = inputDisplayValueFormat.toString().replace('.', _this3.props.decimalSeparator);
    }

    return inputDisplayValueFormat;
  };

  this.recordCursorPosition = function () {
    // Record position
    try {
      _this3.cursorStart = _this3.input.selectionStart;
      _this3.cursorEnd = _this3.input.selectionEnd;
      _this3.currentValue = _this3.input.value;
      _this3.cursorBefore = _this3.input.value.substring(0, _this3.cursorStart);
      _this3.cursorAfter = _this3.input.value.substring(_this3.cursorEnd);
    } catch (e) {
      // Fix error in Chrome:
      // Failed to read the 'selectionStart' property from 'HTMLInputElement'
      // http://stackoverflow.com/q/21177489/3040605
    }
  };

  this.restoreByAfter = function (str) {
    if (str === undefined) return false;

    var fullStr = _this3.input.value;
    var index = fullStr.lastIndexOf(str);

    if (index === -1) return false;

    var prevCursorPos = _this3.cursorBefore.length;
    if (_this3.lastKeyCode === __WEBPACK_IMPORTED_MODULE_8_rc_util_es_KeyCode__["a" /* default */].DELETE && _this3.cursorBefore.charAt(prevCursorPos - 1) === str[0]) {
      _this3.fixCaret(prevCursorPos, prevCursorPos);
      return true;
    }

    if (index + str.length === fullStr.length) {
      _this3.fixCaret(index, index);

      return true;
    }
    return false;
  };

  this.partRestoreByAfter = function (str) {
    if (str === undefined) return false;

    // For loop from full str to the str with last char to map. e.g. 123
    // -> 123
    // -> 23
    // -> 3
    return Array.prototype.some.call(str, function (_, start) {
      var partStr = str.substring(start);

      return _this3.restoreByAfter(partStr);
    });
  };

  this.stop = function () {
    if (_this3.autoStepTimer) {
      clearTimeout(_this3.autoStepTimer);
    }
  };

  this.down = function (e, ratio, recursive) {
    _this3.pressingUpOrDown = true;
    _this3.step('down', e, ratio, recursive);
  };

  this.up = function (e, ratio, recursive) {
    _this3.pressingUpOrDown = true;
    _this3.step('up', e, ratio, recursive);
  };

  this.saveUp = function (node) {
    _this3.upHandler = node;
  };

  this.saveDown = function (node) {
    _this3.downHandler = node;
  };

  this.saveInput = function (node) {
    _this3.input = node;
  };
};

/* harmony default export */ __webpack_exports__["default"] = (InputNumber);

/***/ }),

/***/ 1204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rmc_feedback__ = __webpack_require__(1205);








var InputHandler = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(InputHandler, _Component);

  function InputHandler() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, InputHandler);

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, _Component.apply(this, arguments));
  }

  InputHandler.prototype.render = function render() {
    var _props = this.props,
        prefixCls = _props.prefixCls,
        disabled = _props.disabled,
        otherProps = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties___default()(_props, ['prefixCls', 'disabled']);

    return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_6_rmc_feedback__["a" /* default */],
      {
        disabled: disabled,
        activeClassName: prefixCls + '-handler-active'
      },
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('span', otherProps)
    );
  };

  return InputHandler;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

InputHandler.propTypes = {
  prefixCls: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string,
  disabled: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  onTouchStart: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  onTouchEnd: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  onMouseDown: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  onMouseUp: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  onMouseLeave: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func
};

/* harmony default export */ __webpack_exports__["a"] = (InputHandler);

/***/ }),

/***/ 1205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TouchFeedback__ = __webpack_require__(1206);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__TouchFeedback__["a"]; });


/***/ }),

/***/ 1206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_classnames__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_classnames__);








var TouchFeedback = function (_React$Component) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(TouchFeedback, _React$Component);

    function TouchFeedback() {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, TouchFeedback);

        var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (TouchFeedback.__proto__ || Object.getPrototypeOf(TouchFeedback)).apply(this, arguments));

        _this.state = {
            active: false
        };
        _this.onTouchStart = function (e) {
            _this.triggerEvent('TouchStart', true, e);
        };
        _this.onTouchMove = function (e) {
            _this.triggerEvent('TouchMove', false, e);
        };
        _this.onTouchEnd = function (e) {
            _this.triggerEvent('TouchEnd', false, e);
        };
        _this.onTouchCancel = function (e) {
            _this.triggerEvent('TouchCancel', false, e);
        };
        _this.onMouseDown = function (e) {
            // pc simulate mobile
            _this.triggerEvent('MouseDown', true, e);
        };
        _this.onMouseUp = function (e) {
            _this.triggerEvent('MouseUp', false, e);
        };
        _this.onMouseLeave = function (e) {
            _this.triggerEvent('MouseLeave', false, e);
        };
        return _this;
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(TouchFeedback, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.props.disabled && this.state.active) {
                this.setState({
                    active: false
                });
            }
        }
    }, {
        key: 'triggerEvent',
        value: function triggerEvent(type, isActive, ev) {
            var eventType = 'on' + type;
            var children = this.props.children;

            if (children.props[eventType]) {
                children.props[eventType](ev);
            }
            if (isActive !== this.state.active) {
                this.setState({
                    active: isActive
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                disabled = _props.disabled,
                activeClassName = _props.activeClassName,
                activeStyle = _props.activeStyle;

            var events = disabled ? undefined : {
                onTouchStart: this.onTouchStart,
                onTouchMove: this.onTouchMove,
                onTouchEnd: this.onTouchEnd,
                onTouchCancel: this.onTouchCancel,
                onMouseDown: this.onMouseDown,
                onMouseUp: this.onMouseUp,
                onMouseLeave: this.onMouseLeave
            };
            var child = __WEBPACK_IMPORTED_MODULE_5_react___default.a.Children.only(children);
            if (!disabled && this.state.active) {
                var _child$props = child.props,
                    style = _child$props.style,
                    className = _child$props.className;

                if (activeStyle !== false) {
                    if (activeStyle) {
                        style = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, style, activeStyle);
                    }
                    className = __WEBPACK_IMPORTED_MODULE_6_classnames___default()(className, activeClassName);
                }
                return __WEBPACK_IMPORTED_MODULE_5_react___default.a.cloneElement(child, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({ className: className,
                    style: style }, events));
            }
            return __WEBPACK_IMPORTED_MODULE_5_react___default.a.cloneElement(child, events);
        }
    }]);

    return TouchFeedback;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (TouchFeedback);

TouchFeedback.defaultProps = {
    disabled: false
};

/***/ }),

/***/ 1332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_modal_style_css__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_modal_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_modal_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_modal__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var DownloadMessageysl=function(_Component){_inherits(DownloadMessageysl,_Component);function DownloadMessageysl(props){_classCallCheck(this,DownloadMessageysl);var _this=_possibleConstructorReturn(this,(DownloadMessageysl.__proto__||Object.getPrototypeOf(DownloadMessageysl)).call(this,props));_this.setDownload=function(){_this.props.modalCancel();window.open('/messages/'+_this.props.user.login+'/message_detail?target_ids=1');};_this.state={funmodalsType:false,istype:false};return _this;}_createClass(DownloadMessageysl,[{key:'render',value:function render(){return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_modal___default.a,{keyboard:false,title:'\u63D0\u793A',visible:this.props.modalsType===undefined?false:this.props.modalsType,closable:false,footer:null,destroyOnClose:true,centered:true,width:'530px'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'task-popup-content'},this.props.value===500?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',null,__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{className:'task-popup-text-center font-16'},'\u56E0\u9644\u4EF6\u8D44\u6599\u8D85\u8FC7500M\uFF0C\u60A8\u53EF\u4EE5\u901A\u8FC7\u68C0\u7D22\u5206\u6279\u4E0B\u8F7D'),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{className:'task-popup-text-center font-16 mt5'},'\u6216\u8005\u901A\u8FC7\u5FAE\u4FE1\u6216\u8005QQ\u8054\u7CFB\u7BA1\u7406\u5458\u8F85\u52A9\u60A8\u6253\u5305\u4E0B\u8F7D')):this.props.value===100?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',null,__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{className:'task-popup-text-center font-16'},'\u5DF2\u8D85\u51FA\u6587\u4EF6\u5BFC\u51FA\u7684\u4E0A\u9650\u6570\u91CF\uFF08 ',__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:"color-orange-tip"},'100'),' \uFF09\uFF0C\u5EFA\u8BAE\uFF1A'),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{className:'task-popup-text-center font-16 mt20'},'1.\u901A\u8FC7\u68C0\u7D22\u5206\u6279\u6B21\u4E0B\u8F7D'),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{className:'task-popup-text-center font-16 mt5'},'2.\u8054\u7CFB\u7BA1\u7406\u5458\u8F85\u52A9\u4E0B\u8F7D')):"",__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'clearfix mt30 edu-txt-center'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('a',{className:'task-btn mr30',onClick:this.props.modalCancel},'\u53D6\u6D88'),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('a',{className:'task-btn task-btn-orange',onClick:this.setDownload},'\u7ACB\u5373\u8054\u7CFB'))));}}]);return DownloadMessageysl;}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (DownloadMessageysl);

/***/ }),

/***/ 1386:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FormGroup", {
  enumerable: true,
  get: function get() {
    return _FormGroup.default;
  }
});
Object.defineProperty(exports, "FormLabel", {
  enumerable: true,
  get: function get() {
    return _FormLabel.default;
  }
});
Object.defineProperty(exports, "FormControl", {
  enumerable: true,
  get: function get() {
    return _FormControl.default;
  }
});
Object.defineProperty(exports, "FormHelperText", {
  enumerable: true,
  get: function get() {
    return _FormHelperText.default;
  }
});
Object.defineProperty(exports, "FormControlLabel", {
  enumerable: true,
  get: function get() {
    return _FormControlLabel.default;
  }
});

var _FormGroup = _interopRequireDefault(__webpack_require__(1537));

var _FormLabel = _interopRequireDefault(__webpack_require__(1567));

var _FormControl = _interopRequireDefault(__webpack_require__(1568));

var _FormHelperText = _interopRequireDefault(__webpack_require__(1569));

var _FormControlLabel = _interopRequireDefault(__webpack_require__(1570));

/***/ }),

/***/ 1393:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasValue = hasValue;
exports.isFilled = isFilled;
exports.isAdornedStart = isAdornedStart;
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(9));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(24));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(18));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(6));

var _getPrototypeOf = _interopRequireDefault(__webpack_require__(20));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(15));

var _createClass2 = _interopRequireDefault(__webpack_require__(16));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(21));

var _inherits2 = _interopRequireDefault(__webpack_require__(22));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(23));

var _react = _interopRequireDefault(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(1));

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _withStyles = _interopRequireDefault(__webpack_require__(17));

var _Textarea = _interopRequireDefault(__webpack_require__(1564));

// Supports determination of isControlled().
// Controlled input accepts its current value as a prop.
//
// @see https://facebook.github.io/react/docs/forms.html#controlled-components
// @param value
// @returns {boolean} true if string (including '') or number (including zero)
function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0);
} // Determine if field is empty or filled.
// Response determines if label is presented above field or as placeholder.
//
// @param obj
// @param SSR
// @returns {boolean} False when not present or empty string.
//                    True when any number or string with length.


function isFilled(obj) {
  var SSR = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return obj && (hasValue(obj.value) && obj.value !== '' || SSR && hasValue(obj.defaultValue) && obj.defaultValue !== '');
} // Determine if an Input is adorned on start.
// It's corresponding to the left with LTR.
//
// @param obj
// @returns {boolean} False when no adornments.
//                    True when adorned at the start.


function isAdornedStart(obj) {
  return obj.startAdornment;
}

var styles = function styles(theme) {
  var light = theme.palette.type === 'light';
  var placeholder = {
    color: 'currentColor',
    opacity: light ? 0.42 : 0.5,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter
    })
  };
  var placeholderHidden = {
    opacity: 0
  };
  var placeholderVisible = {
    opacity: light ? 0.42 : 0.5
  };
  var bottomLineColor = light ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)';
  return {
    root: {
      // Mimics the default input display property used by browsers for an input.
      display: 'inline-flex',
      position: 'relative',
      fontFamily: theme.typography.fontFamily,
      color: light ? 'rgba(0, 0, 0, 0.87)' : theme.palette.common.white,
      fontSize: theme.typography.pxToRem(16),
      lineHeight: '1.1875em',
      // Reset (19px), match the native input line-height
      '&$disabled': {
        color: theme.palette.text.disabled
      }
    },
    formControl: {
      'label + &': {
        marginTop: theme.spacing.unit * 2
      }
    },
    focused: {},
    disabled: {},
    underline: {
      '&:after': {
        backgroundColor: theme.palette.primary[light ? 'dark' : 'light'],
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        height: 2,
        position: 'absolute',
        right: 0,
        transform: 'scaleX(0)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeOut
        }),
        pointerEvents: 'none' // Transparent to the hover style.

      },
      '&$focused:after': {
        transform: 'scaleX(1)'
      },
      '&$error:after': {
        backgroundColor: theme.palette.error.main,
        transform: 'scaleX(1)' // error is always underlined in red

      },
      '&:before': {
        backgroundColor: bottomLineColor,
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        height: 1,
        position: 'absolute',
        right: 0,
        transition: theme.transitions.create('background-color', {
          duration: theme.transitions.duration.shorter
        }),
        pointerEvents: 'none' // Transparent to the hover style.

      },
      '&:hover:not($disabled):before': {
        backgroundColor: theme.palette.text.primary,
        height: 2
      },
      '&$disabled:before': {
        background: 'transparent',
        backgroundImage: "linear-gradient(to right, ".concat(bottomLineColor, " 33%, transparent 0%)"),
        backgroundPosition: 'left top',
        backgroundRepeat: 'repeat-x',
        backgroundSize: '5px 1px'
      }
    },
    error: {},
    multiline: {
      padding: "".concat(theme.spacing.unit - 2, "px 0 ").concat(theme.spacing.unit - 1, "px")
    },
    fullWidth: {
      width: '100%'
    },
    input: {
      font: 'inherit',
      color: 'currentColor',
      padding: "".concat(theme.spacing.unit - 2, "px 0 ").concat(theme.spacing.unit - 1, "px"),
      border: 0,
      boxSizing: 'content-box',
      verticalAlign: 'middle',
      background: 'none',
      margin: 0,
      // Reset for Safari
      // Remove grey highlight
      WebkitTapHighlightColor: 'transparent',
      display: 'block',
      // Make the flex item shrink with Firefox
      minWidth: 0,
      flexGrow: 1,
      '&::-webkit-input-placeholder': placeholder,
      '&::-moz-placeholder': placeholder,
      // Firefox 19+
      '&:-ms-input-placeholder': placeholder,
      // IE 11
      '&::-ms-input-placeholder': placeholder,
      // Edge
      '&:focus': {
        outline: 0
      },
      // Reset Firefox invalid required input style
      '&:invalid': {
        boxShadow: 'none'
      },
      '&::-webkit-search-decoration': {
        // Remove the padding when type=search.
        '-webkit-appearance': 'none'
      },
      // Show and hide the placeholder logic
      'label[data-shrink=false] + $formControl &': {
        '&::-webkit-input-placeholder': placeholderHidden,
        '&::-moz-placeholder': placeholderHidden,
        // Firefox 19+
        '&:-ms-input-placeholder': placeholderHidden,
        // IE 11
        '&::-ms-input-placeholder': placeholderHidden,
        // Edge
        '&:focus::-webkit-input-placeholder': placeholderVisible,
        '&:focus::-moz-placeholder': placeholderVisible,
        // Firefox 19+
        '&:focus:-ms-input-placeholder': placeholderVisible,
        // IE 11
        '&:focus::-ms-input-placeholder': placeholderVisible // Edge

      },
      '&$disabled': {
        opacity: 1 // Reset iOS opacity

      }
    },
    inputMarginDense: {
      paddingTop: theme.spacing.unit / 2 - 1
    },
    inputMultiline: {
      resize: 'none',
      padding: 0
    },
    inputType: {
      // type="date" or type="time", etc. have specific styles we need to reset.
      height: '1.1875em' // Reset (19px), match the native input line-height

    },
    inputTypeSearch: {
      // Improve type search style.
      '-moz-appearance': 'textfield',
      '-webkit-appearance': 'textfield'
    }
  };
};

exports.styles = styles;

function formControlState(props, context) {
  var disabled = props.disabled;
  var error = props.error;
  var margin = props.margin;

  if (context && context.muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = context.muiFormControl.disabled;
    }

    if (typeof error === 'undefined') {
      error = context.muiFormControl.error;
    }

    if (typeof margin === 'undefined') {
      margin = context.muiFormControl.margin;
    }
  }

  return {
    disabled: disabled,
    error: error,
    margin: margin
  };
}

var Input =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Input, _React$Component);

  function Input(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, Input);
    _this = (0, _possibleConstructorReturn2.default)(this, (Input.__proto__ || (0, _getPrototypeOf.default)(Input)).call(this, props, context));
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        focused: false
      }
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "isControlled", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: _this.props.value != null
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "input", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleFocus", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        // Fix an bug with IE11 where the focus/blur events are triggered
        // while the input is disabled.
        if (formControlState(_this.props, _this.context).disabled) {
          event.stopPropagation();
          return;
        }

        _this.setState({
          focused: true
        });

        if (_this.props.onFocus) {
          _this.props.onFocus(event);
        }
      }
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleBlur", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        _this.setState({
          focused: false
        });

        if (_this.props.onBlur) {
          _this.props.onBlur(event);
        }
      }
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        if (!_this.isControlled) {
          _this.checkDirty(_this.input);
        } // Perform in the willUpdate


        if (_this.props.onChange) {
          _this.props.onChange(event);
        }
      }
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleRefInput", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(node) {
        _this.input = node;

        if (_this.props.inputRef) {
          _this.props.inputRef(node);
        } else if (_this.props.inputProps && _this.props.inputProps.ref) {
          _this.props.inputProps.ref(node);
        }
      }
    });

    if (_this.isControlled) {
      _this.checkDirty(props);
    }

    var componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
      // The blur won't fire when the disabled state is set on a focused input.
      // We need to book keep the focused state manually.
      if (!formControlState(_this.props, _this.context).disabled && formControlState(nextProps, nextContext).disabled) {
        _this.setState({
          focused: false
        });
      }
    };

    var componentWillUpdate = function componentWillUpdate(nextProps, nextState, nextContext) {
      // Book keep the focused state.
      if (!formControlState(_this.props, _this.context).disabled && formControlState(nextProps, nextContext).disabled) {
        var muiFormControl = _this.context.muiFormControl;

        if (muiFormControl && muiFormControl.onBlur) {
          muiFormControl.onBlur();
        }
      }
    }; // Support for react >= 16.3.0 && < 17.0.0

    /* istanbul ignore else */


    if (_react.default.createContext) {
      _this.UNSAFE_componentWillReceiveProps = componentWillReceiveProps;
      _this.UNSAFE_componentWillUpdate = componentWillUpdate;
    } else {
      _this.componentWillReceiveProps = componentWillReceiveProps;
      _this.componentWillUpdate = componentWillUpdate;
    }

    return _this;
  }

  (0, _createClass2.default)(Input, [{
    key: "getChildContext",
    value: function getChildContext() {
      // We are consuming the parent muiFormControl context.
      // We don't want a child to consume it a second time.
      return {
        muiFormControl: null
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.isControlled) {
        this.checkDirty(this.input);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.isControlled) {
        this.checkDirty(this.props);
      } // else performed in the onChange

    }
  }, {
    key: "checkDirty",
    value: function checkDirty(obj) {
      var muiFormControl = this.context.muiFormControl;

      if (isFilled(obj)) {
        if (muiFormControl && muiFormControl.onFilled) {
          muiFormControl.onFilled();
        }

        if (this.props.onFilled) {
          this.props.onFilled();
        }

        return;
      }

      if (muiFormControl && muiFormControl.onEmpty) {
        muiFormControl.onEmpty();
      }

      if (this.props.onEmpty) {
        this.props.onEmpty();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames, _classNames2;

      var _props = this.props,
          autoComplete = _props.autoComplete,
          autoFocus = _props.autoFocus,
          classes = _props.classes,
          classNameProp = _props.className,
          defaultValue = _props.defaultValue,
          disabledProp = _props.disabled,
          disableUnderline = _props.disableUnderline,
          endAdornment = _props.endAdornment,
          errorProp = _props.error,
          fullWidth = _props.fullWidth,
          id = _props.id,
          inputComponent = _props.inputComponent,
          _props$inputProps = _props.inputProps;
      _props$inputProps = _props$inputProps === void 0 ? {} : _props$inputProps;
      var inputPropsClassName = _props$inputProps.className,
          inputPropsProp = (0, _objectWithoutProperties2.default)(_props$inputProps, ["className"]),
          inputRef = _props.inputRef,
          marginProp = _props.margin,
          multiline = _props.multiline,
          name = _props.name,
          onBlur = _props.onBlur,
          onChange = _props.onChange,
          onEmpty = _props.onEmpty,
          onFilled = _props.onFilled,
          onFocus = _props.onFocus,
          onKeyDown = _props.onKeyDown,
          onKeyUp = _props.onKeyUp,
          placeholder = _props.placeholder,
          readOnly = _props.readOnly,
          rows = _props.rows,
          rowsMax = _props.rowsMax,
          startAdornment = _props.startAdornment,
          type = _props.type,
          value = _props.value,
          other = (0, _objectWithoutProperties2.default)(_props, ["autoComplete", "autoFocus", "classes", "className", "defaultValue", "disabled", "disableUnderline", "endAdornment", "error", "fullWidth", "id", "inputComponent", "inputProps", "inputRef", "margin", "multiline", "name", "onBlur", "onChange", "onEmpty", "onFilled", "onFocus", "onKeyDown", "onKeyUp", "placeholder", "readOnly", "rows", "rowsMax", "startAdornment", "type", "value"]);
      var muiFormControl = this.context.muiFormControl;

      var _formControlState = formControlState(this.props, this.context),
          disabled = _formControlState.disabled,
          error = _formControlState.error,
          margin = _formControlState.margin;

      var className = (0, _classnames.default)(classes.root, (_classNames = {}, (0, _defineProperty2.default)(_classNames, classes.disabled, disabled), (0, _defineProperty2.default)(_classNames, classes.error, error), (0, _defineProperty2.default)(_classNames, classes.fullWidth, fullWidth), (0, _defineProperty2.default)(_classNames, classes.focused, this.state.focused), (0, _defineProperty2.default)(_classNames, classes.formControl, muiFormControl), (0, _defineProperty2.default)(_classNames, classes.multiline, multiline), (0, _defineProperty2.default)(_classNames, classes.underline, !disableUnderline), _classNames), classNameProp);
      var inputClassName = (0, _classnames.default)(classes.input, (_classNames2 = {}, (0, _defineProperty2.default)(_classNames2, classes.disabled, disabled), (0, _defineProperty2.default)(_classNames2, classes.inputType, type !== 'text'), (0, _defineProperty2.default)(_classNames2, classes.inputTypeSearch, type === 'search'), (0, _defineProperty2.default)(_classNames2, classes.inputMultiline, multiline), (0, _defineProperty2.default)(_classNames2, classes.inputMarginDense, margin === 'dense'), _classNames2), inputPropsClassName);
      var required = muiFormControl && muiFormControl.required === true;
      var InputComponent = 'input';
      var inputProps = (0, _objectSpread2.default)({}, inputPropsProp, {
        ref: this.handleRefInput
      });

      if (inputComponent) {
        InputComponent = inputComponent;
        inputProps = (0, _objectSpread2.default)({
          // Rename ref to inputRef as we don't know the
          // provided `inputComponent` structure.
          inputRef: this.handleRefInput
        }, inputProps, {
          ref: null
        });
      } else if (multiline) {
        if (rows && !rowsMax) {
          InputComponent = 'textarea';
        } else {
          inputProps = (0, _objectSpread2.default)({
            rowsMax: rowsMax,
            textareaRef: this.handleRefInput
          }, inputProps, {
            ref: null
          });
          InputComponent = _Textarea.default;
        }
      }

      return _react.default.createElement("div", (0, _extends2.default)({
        className: className
      }, other), startAdornment, _react.default.createElement(InputComponent, (0, _extends2.default)({
        "aria-invalid": error,
        "aria-required": required,
        autoComplete: autoComplete,
        autoFocus: autoFocus,
        className: inputClassName,
        defaultValue: defaultValue,
        disabled: disabled,
        id: id,
        name: name,
        onBlur: this.handleBlur,
        onChange: this.handleChange,
        onFocus: this.handleFocus,
        onKeyDown: onKeyDown,
        onKeyUp: onKeyUp,
        placeholder: placeholder,
        readOnly: readOnly,
        required: required ? true : undefined,
        rows: rows,
        type: type,
        value: value
      }, inputProps)), endAdornment);
    }
  }]);
  return Input;
}(_react.default.Component);

Input.propTypes =  false ? {
  /**
   * This property helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it here:
   * https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
   */
  autoComplete: _propTypes.default.string,

  /**
   * If `true`, the input will be focused during the first mount.
   */
  autoFocus: _propTypes.default.bool,

  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * The CSS class name of the wrapper element.
   */
  className: _propTypes.default.string,

  /**
   * The default input value, useful when not controlling the component.
   */
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * If `true`, the input will be disabled.
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the input will not have an underline.
   */
  disableUnderline: _propTypes.default.bool,

  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: _propTypes.default.node,

  /**
   * If `true`, the input will indicate an error. This is normally obtained via context from
   * FormControl.
   */
  error: _propTypes.default.bool,

  /**
   * If `true`, the input will take up the full width of its container.
   */
  fullWidth: _propTypes.default.bool,

  /**
   * The id of the `input` element.
   */
  id: _propTypes.default.string,

  /**
   * The component used for the native input.
   * Either a string to use a DOM element or a component.
   */
  inputComponent: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),

  /**
   * Properties applied to the `input` element.
   */
  inputProps: _propTypes.default.object,

  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: _propTypes.default.func,

  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: _propTypes.default.oneOf(['dense', 'none']),

  /**
   * If `true`, a textarea element will be rendered.
   */
  multiline: _propTypes.default.bool,

  /**
   * Name attribute of the `input` element.
   */
  name: _propTypes.default.string,

  /**
   * @ignore
   */
  onBlur: _propTypes.default.func,

  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   */
  onChange: _propTypes.default.func,

  /**
   * @ignore
   */
  onEmpty: _propTypes.default.func,

  /**
   * @ignore
   */
  onFilled: _propTypes.default.func,

  /**
   * @ignore
   */
  onFocus: _propTypes.default.func,

  /**
   * @ignore
   */
  onKeyDown: _propTypes.default.func,

  /**
   * @ignore
   */
  onKeyUp: _propTypes.default.func,

  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder: _propTypes.default.string,

  /**
   * @ignore
   */
  readOnly: _propTypes.default.bool,

  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  rowsMax: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: _propTypes.default.node,

  /**
   * Type of the input element. It should be a valid HTML5 input type.
   */
  type: _propTypes.default.string,

  /**
   * The input value, required for a controlled component.
   */
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]))])
} : {};
Input.muiName = 'Input';
Input.defaultProps = {
  disableUnderline: false,
  fullWidth: false,
  multiline: false,
  type: 'text'
};
Input.contextTypes = {
  muiFormControl: _propTypes.default.object
};
Input.childContextTypes = {
  muiFormControl: _propTypes.default.object
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiInput'
})(Input);

exports.default = _default;

/***/ }),

/***/ 1399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  ZERO: 48,
  NINE: 57,

  NUMPAD_ZERO: 96,
  NUMPAD_NINE: 105,

  BACKSPACE: 8,
  DELETE: 46,
  ENTER: 13,

  ARROW_UP: 38,
  ARROW_DOWN: 40
});

/***/ }),

/***/ 1404:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _Tooltip.default;
  }
});

var _Tooltip = _interopRequireDefault(__webpack_require__(1542));

/***/ }),

/***/ 1424:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1511);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(300)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 1511:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(299)(true);
// imports


// module
exports.push([module.i, ".panel-comment_item .t_area{font-size:12px;color:#ccc}.panel-comment_item .orig_reply i{font-size:14px!important;margin-left:12px}.panel-comment_item ol.linenums{overflow:auto}.panel-comment_item .rewarded{color:#ff7500!important}.panel-comment_item .rewarded.normalUser{cursor:inherit}#tab_con_4 .-layout-v{overflow-y:auto}#tab_con_4 .rc-pagination{margin:12px auto 20px}.rc-pagination{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.comment_content img{max-width:23%!important}#mini_comment_section .df .ke-container{border-radius:15px}#mini_comment_section .df .buttons{width:70px;margin-bottom:5px}#mini_comment_section .buttons i{font-size:18px;color:#656565;vertical-align:baseline}#mini_comment_section i.newReplyIcon{color:#4dacff;cursor:pointer}#mini_comment_section .buttons{margin-bottom:10px}#mini_comment_section .buttons>p{margin-top:4px;display:none}#mini_comment_section .df .buttons>p{margin-top:14px;display:block}#mini_comment_section{height:auto;background-color:#fff;display:-ms-flexbox;display:flex;-webkit-box-shadow:0 -3px 5px 0 rgba(76,172,255,.2);box-shadow:0 -3px 5px 0 rgba(76,172,255,.2);z-index:99}#mini_comment_section #editor_panel{margin-bottom:9px}#mini_comment_section #editor_panel>div:first-child{position:absolute;bottom:8px;right:88px}#mini_comment_section .ke-toolbar-icon-url{background-image:url(" + __webpack_require__(1512) + ");background-position:0 0;background-size:30px 30px;width:30px;height:30px}#mini_comment_section .ke-outline{height:30px;margin-bottom:-11px;width:30px;margin-right:-5px;border:none;margin:0;padding:0;position:absolute;top:-30px;left:-30px;left:-24px;z-index:999}#mini_comment_section i.replyIcon{font-size:20px}#shixun_comment_block .dot{height:4px;border-radius:2px;background-color:#4cacff;width:4px;position:relative;bottom:30px;left:18px;display:block}#mini_comment_section .ke-container{border-radius:6px;border-color:#eaeaea}.commentTxt{width:100%;height:95px;border:1px solid #eaeaea;border-radius:10px;padding-left:5px}#game_praise_tread{cursor:pointer}.commentsbtn{margin-top:2px}#shixun_comment_block{margin:0 10px;margin-bottom:-2px}.panel-comment_item a.task-btn-orange{background:#4cacff}.childrenCommentsView{background:#f4f4f4;border-radius:4px;margin-bottom:6px;position:relative;margin-top:6px}.childrenCommentsView .trangle{position:absolute;border-color:#000;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:5px solid #f4f4f4;left:13px;top:-9px;border-bottom:10px solid #f4f4f4}.childComment{padding:2px 8px}.childComment .iconfont.icon-jiangli{margin-top:2px}.childComment:hover{background:#ebebeb}.childComment .iconfont{display:none}.childComment p.orig_reply{margin-bottom:0}.childComment:hover .iconfont{display:inline}.blink{animation:blink-animation 3s steps(5,start) infinite;-webkit-animation:blink-animation 3s steps(5,start) infinite}@keyframes blink-animation{to{visibility:hidden}}@-webkit-keyframes blink-animation{to{visibility:hidden}}.J_Comment_Reply img.emoji{width:24px}.noCommentTitle{text-align:center;margin-top:20px;font-size:16px;height:100px;line-height:100px}.break_word_comments{word-break:break-word;width:100%;word-wrap:break-word;margin-bottom:4px;margin-top:4px}.childComment .break_word_comments{line-height:22px}form.df .tips{display:none}.loadMoreChildComments{text-align:center;height:24px;background:#f1f1f1;cursor:pointer}.loadMoreChildComments i.icon-xiajiantou{position:relative;bottom:5px}", "", {"version":3,"sources":["/Users/jasder/work/trustie3.0/forgeplus-react/src/modules/comment/Comment.css"],"names":[],"mappings":"AAKA,4BACC,eAAgB,AACb,UAAe,CAClB,AACD,kCACI,yBAA2B,AAC3B,gBAAkB,CACrB,AAEG,gCACI,aAAe,CAClB,AACD,8BACI,uBAAwB,CAC3B,AACD,yCACI,cAAgB,CACnB,AACL,sBACC,eAAiB,CACjB,AACD,0BACI,qBAAkB,CAIrB,AACD,eACI,0BAA2B,AAC3B,uBAAwB,AACxB,iBAAmB,CACtB,AAED,qBACI,uBAA0B,CAC7B,AAKD,wCACI,kBAAoB,CAEvB,AACD,mCACI,WAAY,AACX,iBAAmB,CACvB,AACG,iCACI,eAAgB,AAChB,cAAe,AACf,uBAAyB,CAC5B,AACD,qCACI,cAAe,AACf,cAAgB,CACnB,AACD,+BACI,kBAAoB,CACvB,AACD,iCACI,eAAgB,AAChB,YAAc,CACjB,AACD,qCACI,gBAAiB,AACjB,aAAe,CAClB,AACD,sBACI,YAAa,AACb,sBAAuB,AAEvB,oBAAqB,AACrB,aAAc,AACd,oDAA6D,AACrD,4CAAqD,AAC7D,UAAY,CACf,AACG,oCACI,iBAAkB,CACrB,AAED,oDACI,kBAAmB,AACnB,WAAY,AACZ,UAAY,CACf,AACG,2CACI,+CAA2D,AAC3D,wBAA6B,AAC7B,0BAA2B,AAC3B,WAAY,AACZ,WAAa,CAChB,AAET,kCACI,YAAa,AACb,oBAAqB,AACrB,WAAY,AACZ,kBAAmB,AACnB,YAAa,AACb,SAAY,AACZ,UAAa,AAEb,kBAAmB,AACnB,UAAW,AACX,WAAY,AACZ,WAAY,AACZ,WAAa,CAChB,AAED,kCACI,cAAgB,CACnB,AACD,2BAEI,WAAY,AACZ,kBAAmB,AACnB,yBAA0B,AAC1B,UAAW,AACX,kBAAmB,AACnB,YAAa,AACb,UAAW,AACX,aAAe,CAClB,AAEL,oCACI,kBAAmB,AACnB,oBAAsB,CAGzB,AACD,YACI,WAAY,AACZ,YAAa,AACb,yBAAyB,AACzB,mBAAoB,AACpB,gBAAkB,CACrB,AACD,mBACI,cAAgB,CACnB,AACD,aACI,cAAgB,CACnB,AAED,sBACI,cAAiB,AACjB,kBAAoB,CACvB,AAED,sCACI,kBAAoB,CACvB,AAGD,sBACI,mBAAoB,AACpB,kBAAmB,AACnB,kBAAmB,AACnB,kBAAmB,AACnB,cAAgB,CACnB,AACG,+BACI,kBAAmB,AACnB,kBAAoB,AACpB,QAAS,AACT,SAAU,AACV,kCAAmC,AACnC,mCAAoC,AACpC,gCAAiC,AACjC,UAAW,AACX,SAAU,AACV,gCAAkC,CACrC,AACL,cACI,eAAiB,CACpB,AACG,qCACI,cAAgB,CACnB,AAGL,oBACI,kBAAoB,CACvB,AACG,wBACI,YAAc,CACjB,AACD,2BACI,eAAmB,CACtB,AACD,8BACI,cAAgB,CACnB,AAOL,OACE,qDAAuD,AACvD,4DAA+D,CAChE,AACD,2BACE,GACE,iBAAmB,CACpB,CACF,AACD,mCACE,GACE,iBAAmB,CACpB,CACF,AAID,2BACI,UAAY,CACf,AAED,gBACI,kBAAmB,AACnB,gBAAiB,AACjB,eAAgB,AAChB,aAAc,AACd,iBAAmB,CACtB,AAED,qBAGI,sBAAuB,AAGvB,WAAY,AACZ,qBAAsB,AACtB,kBAAmB,AACnB,cAAgB,CACnB,AACD,mCACI,gBAAkB,CACrB,AAED,cACI,YAAc,CACjB,AAED,uBACI,kBAAmB,AACnB,YAAa,AACb,mBAAoB,AACpB,cAAgB,CAEnB,AACG,yCACI,kBAAmB,AACnB,UAAY,CACf","file":"Comment.css","sourcesContent":["\r\n.greytab-inner {\r\n\t/*overflow-y: scroll;*/\r\n}\r\n/*评论列表*/\r\n.panel-comment_item .t_area {\r\n\tfont-size: 12px;\r\n    color: #CCCCCC;\r\n}\r\n.panel-comment_item .orig_reply i {\r\n    font-size: 14px !important;\r\n    margin-left: 12px;\r\n}   \r\n    /* ke style 代码块*/\r\n    .panel-comment_item ol.linenums {\r\n        overflow: auto;\r\n    }\r\n    .panel-comment_item .rewarded {\r\n        color: #FF7500!important\r\n    }\r\n    .panel-comment_item .rewarded.normalUser {\r\n        cursor: inherit;\r\n    }\r\n#tab_con_4 .-layout-v {\r\n\toverflow-y: auto;\r\n}\r\n#tab_con_4 .rc-pagination {\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    margin-top: 12px;\r\n    margin-bottom: 20px;\r\n}\r\n.rc-pagination {\r\n    width: -webkit-fit-content;\r\n    width: -moz-fit-content;\r\n    width: fit-content;\r\n}\r\n\r\n.comment_content img {\r\n    max-width: 23% !important;\r\n}\r\n\r\n/*  ----------------------------------------------------- CommentInput START */\r\n\r\n/*收起的时候radius变化*/\r\n#mini_comment_section .df .ke-container {\r\n    border-radius: 15px;\r\n\r\n}\r\n#mini_comment_section .df .buttons {\r\n    width: 70px;\r\n     margin-bottom: 5px;\r\n}\r\n    #mini_comment_section .buttons i {\r\n        font-size: 18px;\r\n        color: #656565;\r\n        vertical-align: baseline;\r\n    }\r\n    #mini_comment_section i.newReplyIcon {\r\n        color: #4DACFF;\r\n        cursor: pointer;\r\n    }\r\n    #mini_comment_section .buttons {\r\n        margin-bottom: 10px;\r\n    }\r\n    #mini_comment_section .buttons>p {\r\n        margin-top: 4px;\r\n        display: none;\r\n    }\r\n    #mini_comment_section .df .buttons>p {\r\n        margin-top: 14px;\r\n        display: block;\r\n    }\r\n    #mini_comment_section {\r\n        height: auto;\r\n        background-color: #FFF;\r\n        /*border-top: 1px solid #f0f1fe;*/\r\n        display: -ms-flexbox;\r\n        display: flex;\r\n        -webkit-box-shadow: 0px -3px 5px 0px rgba(76, 172, 255, 0.2);\r\n                box-shadow: 0px -3px 5px 0px rgba(76, 172, 255, 0.2);\r\n        z-index: 99;\r\n    }   \r\n        #mini_comment_section #editor_panel {\r\n            margin-bottom: 9px\r\n        }\r\n        /* commentInput 上传图片的图标挪动到左下*/\r\n        #mini_comment_section #editor_panel>div:nth-child(1) {\r\n            position: absolute;\r\n            bottom: 8px;\r\n            right: 88px; \r\n        }\r\n            #mini_comment_section .ke-toolbar-icon-url {\r\n                background-image: url('../../images/tpi/upload-image.png');\r\n                background-position: 0px 0px;\r\n                background-size: 30px 30px;\r\n                width: 30px;\r\n                height: 30px;\r\n            }\r\n            \r\n    #mini_comment_section .ke-outline {\r\n        height: 30px;\r\n        margin-bottom: -11px;\r\n        width: 30px;\r\n        margin-right: -5px;\r\n        border: none;\r\n        margin: 0px;\r\n        padding: 0px;\r\n        /* ie上传图片看不见的问题 */\r\n        position: absolute;\r\n        top: -30px;\r\n        left: -30px;\r\n        left: -24px;\r\n        z-index: 999;\r\n    }\r\n\r\n    #mini_comment_section i.replyIcon {\r\n        font-size: 20px;\r\n    }\r\n    #shixun_comment_block .dot {\r\n        width: 4px;\r\n        height: 4px;\r\n        border-radius: 2px;\r\n        background-color: #4CACFF;\r\n        width: 4px;\r\n        position: relative;\r\n        bottom: 30px;\r\n        left: 18px;\r\n        display: block;\r\n    }\r\n\r\n#mini_comment_section .ke-container {\r\n    border-radius: 6px;\r\n    border-color: #EAEAEA;\r\n    /*max-height: 400px;  */\r\n    /*解决上传图片后看不到评论按钮的问题*/\r\n}\r\n.commentTxt{\r\n    width: 100%;\r\n    height: 95px;\r\n    border:1px solid #EAEAEA;\r\n    border-radius: 10px;\r\n    padding-left: 5px;\r\n}\r\n#game_praise_tread {\r\n    cursor: pointer;\r\n}\r\n.commentsbtn {\r\n    margin-top: 2px;\r\n}\r\n\r\n#shixun_comment_block {\r\n    margin: 0px 10px;\r\n    margin-bottom: -2px;\r\n}\r\n\r\n.panel-comment_item a.task-btn-orange {\r\n    background: #4CACFF;\r\n}\r\n\r\n/*  ----------------------------------------------------- CommentInput END */\r\n.childrenCommentsView {\r\n    background: #F4F4F4;\r\n    border-radius: 4px;\r\n    margin-bottom: 6px;\r\n    position: relative;\r\n    margin-top: 6px;\r\n}\r\n    .childrenCommentsView .trangle{\r\n        position: absolute;\r\n        border-color: black;\r\n        width: 0;\r\n        height: 0;\r\n        border-left: 5px solid transparent;\r\n        border-right: 5px solid transparent;\r\n        border-bottom: 5px solid #F4F4F4;\r\n        left: 13px;\r\n        top: -9px;\r\n        border-bottom: 10px solid #F4F4F4;\r\n    }\r\n.childComment {\r\n    padding: 2px 8px;\r\n}\r\n    .childComment .iconfont.icon-jiangli {\r\n        margin-top: 2px;\r\n    }\r\n\r\n\r\n.childComment:hover {\r\n    background: #EBEBEB;\r\n}\r\n    .childComment .iconfont {\r\n        display: none;\r\n    }\r\n    .childComment p.orig_reply {\r\n        margin-bottom: 0px;\r\n    }\r\n    .childComment:hover .iconfont{\r\n        display: inline;\r\n    }\r\n.noCommentTitle {\r\n    text-align: center;\r\n    margin-top: 20px;\r\n    font-size: 16px;\r\n}\r\n\r\n.blink {\r\n  animation: blink-animation 3s steps(5, start) infinite;\r\n  -webkit-animation: blink-animation 3s steps(5, start) infinite;\r\n}\r\n@keyframes blink-animation {\r\n  to {\r\n    visibility: hidden;\r\n  }\r\n}\r\n@-webkit-keyframes blink-animation {\r\n  to {\r\n    visibility: hidden;\r\n  }\r\n}\r\n\r\n\r\n/*md 编辑器   emoji */\r\n.J_Comment_Reply img.emoji {\r\n    width: 24px;\r\n}\r\n\r\n.noCommentTitle {\r\n    text-align: center;\r\n    margin-top: 20px;\r\n    font-size: 16px;\r\n    height: 100px;\r\n    line-height: 100px;\r\n}\r\n\r\n.break_word_comments{\r\n    /* 这个样式影响到了行高 */\r\n    /* white-space: pre-wrap!important; */\r\n    word-break: break-word;\r\n    /* 影响了 ul li的样式： https://testeduplus2.educoder.net/courses/1748/common_homeworks/12131/740898/appraise */\r\n    /* line-height: 14px; */\r\n    width: 100%;\r\n    word-wrap: break-word;\r\n    margin-bottom: 4px;\r\n    margin-top: 4px;\r\n}\r\n.childComment .break_word_comments{\r\n    line-height: 22px;\r\n}\r\n\r\nform.df .tips {\r\n    display: none;\r\n}\r\n\r\n.loadMoreChildComments {\r\n    text-align: center;\r\n    height: 24px;\r\n    background: #F1F1F1;\r\n    cursor: pointer;\r\n\r\n}\r\n    .loadMoreChildComments i.icon-xiajiantou {\r\n        position: relative;\r\n        bottom: 5px;\r\n    }"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1512:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAACO0lEQVRIS81Vz0tUURT+zp2ZV0Y/CMMUCio3geBGooUiBIGMjKI9JxAJbNVCKGxj7aJFUAQuBMNlgf2aN+Ni1NoULdI/QBCEwmilhRvDyEnfO35vZMZpSOclM9CFA+edd853v3u+c9+Tdkd7jWAYipMo1xJ88xSDEkvqclmBcwS5gcQc1XIRLsb5T8EFK2S6AA8WBI30D5aFuQCrbOaAZ/Ax7CLiGvQb4Db7W1W4wb7aQpAXUzb6IJLVKzqh9SEX43QvBgVfY+Iy7QwtXFikgtEpWwZysWhSTxnFOE/UGgxc8Yi80mrwgD1t4biyNr8+8aE73SPzgEqHgzjfjrBVNaXBBRnXxek3cay0J3BZDBIEO7YzwuAdwWdu+BYGRxjvon88mKCKd1WKtsRVcf2CWELvktk9uta/3Im/CeqLNDRp43FOsPhrtX4ZPGH8Oq2wPRk+zLKgifGjJZkz+TuP2pu+Iu8Lk6Mvtd6E8ZTvm7Nx5YQbPORRRjIebolgqCQ4WcxwGvqmbflanBx1tCsEjDLuCzdtCW6kbFnqTGorRXjFWO2ugpKVL9TYWjVufrgkm8XgTWMaqTuBOPMayPz59rRwbFJas+HhGd22vaZlnR3tn7TFZxF8qUoshTvc8D6L8nfiT0EVP6x1nE9dk6XgyNuZnY42emwp3cO52uJp+cnvRXc4hLmNDAULuCIHYDZ/4wJ/Ov6JD+0G7o/hF9oiLTvjARd1xjnaWVp+VPf14Qq4ISoMXsl/aCX//ltnXea2CTNsxwAAAABJRU5ErkJggg=="

/***/ }),

/***/ 1525:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Pagination__ = __webpack_require__(1558);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Pagination__["a"]; });


/***/ }),

/***/ 1534:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _Input.default;
  }
});
Object.defineProperty(exports, "InputAdornment", {
  enumerable: true,
  get: function get() {
    return _InputAdornment.default;
  }
});
Object.defineProperty(exports, "InputLabel", {
  enumerable: true,
  get: function get() {
    return _InputLabel.default;
  }
});

var _Input = _interopRequireDefault(__webpack_require__(1393));

var _InputAdornment = _interopRequireDefault(__webpack_require__(1565));

var _InputLabel = _interopRequireDefault(__webpack_require__(1566));

/***/ }),

/***/ 1537:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(9));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(18));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(6));

var _react = _interopRequireDefault(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(1));

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _withStyles = _interopRequireDefault(__webpack_require__(17));

var styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  row: {
    flexDirection: 'row'
  }
};
/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 */

exports.styles = styles;

function FormGroup(props) {
  var classes = props.classes,
      className = props.className,
      children = props.children,
      row = props.row,
      other = (0, _objectWithoutProperties2.default)(props, ["classes", "className", "children", "row"]);
  return _react.default.createElement("div", (0, _extends2.default)({
    className: (0, _classnames.default)(classes.root, (0, _defineProperty2.default)({}, classes.row, row), className)
  }, other), children);
}

FormGroup.propTypes =  false ? {
  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * Display group of elements in a compact row.
   */
  row: _propTypes.default.bool
} : {};
FormGroup.defaultProps = {
  row: false
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiFormGroup'
})(FormGroup);

exports.default = _default;

/***/ }),

/***/ 1541:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1597);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(300)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 1542:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(9));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(24));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(6));

var _getPrototypeOf = _interopRequireDefault(__webpack_require__(20));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(15));

var _createClass2 = _interopRequireDefault(__webpack_require__(16));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(21));

var _inherits2 = _interopRequireDefault(__webpack_require__(22));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(23));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(18));

var _react = _interopRequireDefault(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(1));

var _reactDom = _interopRequireDefault(__webpack_require__(4));

var _reactEventListener = _interopRequireDefault(__webpack_require__(94));

var _debounce = _interopRequireDefault(__webpack_require__(114));

var _warning = _interopRequireDefault(__webpack_require__(33));

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _reactPopper = __webpack_require__(1543);

var _helpers = __webpack_require__(79);

var _RootRef = _interopRequireDefault(__webpack_require__(343));

var _Portal = _interopRequireDefault(__webpack_require__(344));

var _common = _interopRequireDefault(__webpack_require__(341));

var _withStyles = _interopRequireDefault(__webpack_require__(17));

/* eslint-disable react/no-multi-comp, no-underscore-dangle */
var styles = function styles(theme) {
  return {
    // Will be gone once we drop React 15.x support.
    root: {
      display: 'inline-block',
      flexDirection: 'inherit' // Makes the wrapper more transparent.

    },
    popper: {
      zIndex: theme.zIndex.tooltip,
      pointerEvents: 'none',
      '&$open': {
        pointerEvents: 'auto'
      }
    },
    open: {},
    tooltip: {
      backgroundColor: theme.palette.grey[700],
      borderRadius: 2,
      color: _common.default.white,
      fontFamily: theme.typography.fontFamily,
      opacity: 0,
      transform: 'scale(0)',
      transition: theme.transitions.create(['opacity', 'transform'], {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeIn
      }),
      minHeight: 0,
      padding: "".concat(theme.spacing.unit / 2, "px ").concat(theme.spacing.unit, "px"),
      fontSize: theme.typography.pxToRem(10),
      lineHeight: "".concat(theme.typography.round(14 / 10), "em"),
      '&$open': {
        opacity: 0.9,
        transform: 'scale(1)',
        transition: theme.transitions.create(['opacity', 'transform'], {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.easeOut
        })
      }
    },
    touch: {
      padding: "".concat(theme.spacing.unit, "px ").concat(theme.spacing.unit * 2, "px"),
      fontSize: theme.typography.pxToRem(14),
      lineHeight: "".concat(theme.typography.round(16 / 14), "em")
    },
    tooltipPlacementLeft: (0, _defineProperty2.default)({
      transformOrigin: 'right center',
      margin: "0 ".concat(theme.spacing.unit * 3, "px")
    }, theme.breakpoints.up('sm'), {
      margin: '0 14px'
    }),
    tooltipPlacementRight: (0, _defineProperty2.default)({
      transformOrigin: 'left center',
      margin: "0 ".concat(theme.spacing.unit * 3, "px")
    }, theme.breakpoints.up('sm'), {
      margin: '0 14px'
    }),
    tooltipPlacementTop: (0, _defineProperty2.default)({
      transformOrigin: 'center bottom',
      margin: "".concat(theme.spacing.unit * 3, "px 0")
    }, theme.breakpoints.up('sm'), {
      margin: '14px 0'
    }),
    tooltipPlacementBottom: (0, _defineProperty2.default)({
      transformOrigin: 'center top',
      margin: "".concat(theme.spacing.unit * 3, "px 0")
    }, theme.breakpoints.up('sm'), {
      margin: '14px 0'
    })
  };
};

exports.styles = styles;

function flipPlacement(placement) {
  switch (placement) {
    case 'bottom-end':
      return 'bottom-start';

    case 'bottom-start':
      return 'bottom-end';

    case 'top-end':
      return 'top-start';

    case 'top-start':
      return 'top-end';

    default:
      return placement;
  }
}

var Tooltip =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Tooltip, _React$Component);

  function Tooltip(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, Tooltip);
    _this = (0, _possibleConstructorReturn2.default)(this, (Tooltip.__proto__ || (0, _getPrototypeOf.default)(Tooltip)).call(this, props, context));
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {}
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "enterTimer", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "leaveTimer", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "touchTimer", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "closeTimer", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "isControlled", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "popper", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "children", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "ignoreNonTouchEvents", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: false
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleResize", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: (0, _debounce.default)(function () {
        if (_this.popper) {
          _this.popper._popper.scheduleUpdate();
        }
      }, 166)
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleEnter", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        var _this$props = _this.props,
            children = _this$props.children,
            enterDelay = _this$props.enterDelay;
        var childrenProps = children.props;

        if (event.type === 'focus' && childrenProps.onFocus) {
          childrenProps.onFocus(event);
        }

        if (event.type === 'mouseover' && childrenProps.onMouseOver) {
          childrenProps.onMouseOver(event);
        }

        if (_this.ignoreNonTouchEvents && event.type !== 'touchstart') {
          return;
        }

        clearTimeout(_this.enterTimer);
        clearTimeout(_this.leaveTimer);

        if (enterDelay) {
          event.persist();
          _this.enterTimer = setTimeout(function () {
            _this.handleOpen(event);
          }, enterDelay);
        } else {
          _this.handleOpen(event);
        }
      }
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleOpen", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        if (!_this.isControlled) {
          _this.setState({
            open: true
          });
        }

        if (_this.props.onOpen) {
          _this.props.onOpen(event, true);
        }
      }
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleLeave", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        var _this$props2 = _this.props,
            children = _this$props2.children,
            leaveDelay = _this$props2.leaveDelay;
        var childrenProps = children.props;

        if (event.type === 'blur' && childrenProps.onBlur) {
          childrenProps.onBlur(event);
        }

        if (event.type === 'mouseleave' && childrenProps.onMouseLeave) {
          childrenProps.onMouseLeave(event);
        }

        clearTimeout(_this.enterTimer);
        clearTimeout(_this.leaveTimer);

        if (leaveDelay) {
          event.persist();
          _this.leaveTimer = setTimeout(function () {
            _this.handleClose(event);
          }, leaveDelay);
        } else {
          _this.handleClose(event);
        }
      }
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleClose", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        if (!_this.isControlled) {
          _this.setState({
            open: false
          });
        }

        if (_this.props.onClose) {
          _this.props.onClose(event, false);
        }

        clearTimeout(_this.closeTimer);
        _this.closeTimer = setTimeout(function () {
          _this.ignoreNonTouchEvents = false;
        }, _this.props.theme.transitions.duration.shortest);
      }
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleTouchStart", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        _this.ignoreNonTouchEvents = true;
        var _this$props3 = _this.props,
            children = _this$props3.children,
            enterTouchDelay = _this$props3.enterTouchDelay;
        var childrenProps = children.props;

        if (childrenProps.onTouchStart) {
          childrenProps.onTouchStart(event);
        }

        clearTimeout(_this.leaveTimer);
        clearTimeout(_this.closeTimer);
        clearTimeout(_this.touchTimer);
        event.persist();
        _this.touchTimer = setTimeout(function () {
          _this.handleEnter(event);
        }, enterTouchDelay);
      }
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleTouchEnd", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        var _this$props4 = _this.props,
            children = _this$props4.children,
            leaveTouchDelay = _this$props4.leaveTouchDelay;
        var childrenProps = children.props;

        if (childrenProps.onTouchEnd) {
          childrenProps.onTouchEnd(event);
        }

        clearTimeout(_this.touchTimer);
        clearTimeout(_this.leaveTimer);
        event.persist();
        _this.leaveTimer = setTimeout(function () {
          _this.handleClose(event);
        }, leaveTouchDelay);
      }
    });
    _this.isControlled = props.open != null;

    if (!_this.isControlled) {
      // not controlled, use internal state
      _this.state.open = false;
    }

    return _this;
  }

  (0, _createClass2.default)(Tooltip, [{
    key: "componentDidMount",
    value: function componentDidMount() {
       false ? (0, _warning.default)(!this.children || !this.children.disabled || !this.children.tagName.toLowerCase() === 'button', ['Material-UI: you are providing a disabled `button` child to the Tooltip component.', 'A disabled element does not fire events.', "Tooltip needs to listen to the child element's events to display the title.", '', 'Place a `div` container on top of the element.'].join('\n')) : void 0;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.enterTimer);
      clearTimeout(this.leaveTimer);
      clearTimeout(this.touchTimer);
      clearTimeout(this.closeTimer);
      this.handleResize.cancel();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          classes = _props.classes,
          className = _props.className,
          disableFocusListener = _props.disableFocusListener,
          disableHoverListener = _props.disableHoverListener,
          disableTouchListener = _props.disableTouchListener,
          enterDelay = _props.enterDelay,
          enterTouchDelay = _props.enterTouchDelay,
          id = _props.id,
          leaveDelay = _props.leaveDelay,
          leaveTouchDelay = _props.leaveTouchDelay,
          onClose = _props.onClose,
          onOpen = _props.onOpen,
          openProp = _props.open,
          placementProp = _props.placement,
          _props$PopperProps = _props.PopperProps;
      _props$PopperProps = _props$PopperProps === void 0 ? {} : _props$PopperProps;
      var PopperClassName = _props$PopperProps.className,
          PopperProps = (0, _objectWithoutProperties2.default)(_props$PopperProps, ["className"]),
          theme = _props.theme,
          title = _props.title,
          other = (0, _objectWithoutProperties2.default)(_props, ["children", "classes", "className", "disableFocusListener", "disableHoverListener", "disableTouchListener", "enterDelay", "enterTouchDelay", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperProps", "theme", "title"]);
      var placement = theme.direction === 'rtl' ? flipPlacement(placementProp) : placementProp;
      var open = this.isControlled ? openProp : this.state.open;
      var childrenProps = {
        'aria-describedby': id
      }; // There is no point at displaying an empty tooltip.

      if (title === '') {
        open = false;
      }

      if (!disableTouchListener) {
        childrenProps.onTouchStart = this.handleTouchStart;
        childrenProps.onTouchEnd = this.handleTouchEnd;
      }

      if (!disableHoverListener) {
        childrenProps.onMouseOver = this.handleEnter;
        childrenProps.onMouseLeave = this.handleLeave;
      }

      if (!disableFocusListener) {
        childrenProps.onFocus = this.handleEnter;
        childrenProps.onBlur = this.handleLeave;
      }

       false ? (0, _warning.default)(!children.props.title, ['Material-UI: you have been providing a `title` property to the child of <Tooltip />.', "Remove this title property `".concat(children.props.title, "` or the Tooltip component.")].join('\n')) : void 0;
      return _react.default.createElement(_reactPopper.Manager, (0, _extends2.default)({
        tag: _reactDom.default.createPortal ? false : 'div',
        className: (0, _classnames.default)(classes.root, className)
      }, other), _react.default.createElement(_reactEventListener.default, {
        target: "window",
        onResize: this.handleResize
      }), _react.default.createElement(_reactPopper.Target, null, function (_ref) {
        var targetProps = _ref.targetProps;
        return _react.default.createElement(_RootRef.default, {
          rootRef: function rootRef(node) {
            _this2.children = node;
            targetProps.ref(_this2.children);
          }
        }, _react.default.cloneElement(children, childrenProps));
      }), _react.default.createElement(_Portal.default, null, _react.default.createElement(_reactPopper.Popper, (0, _extends2.default)({
        placement: placement,
        eventsEnabled: open,
        className: (0, _classnames.default)(classes.popper, (0, _defineProperty2.default)({}, classes.open, open), PopperClassName),
        ref: function ref(node) {
          _this2.popper = node;
        }
      }, PopperProps), function (_ref2) {
        var popperProps = _ref2.popperProps,
            restProps = _ref2.restProps;
        var actualPlacement = (popperProps['data-placement'] || placement).split('-')[0];
        return _react.default.createElement("div", (0, _extends2.default)({}, popperProps, restProps, {
          style: (0, _objectSpread2.default)({}, popperProps.style, {
            top: popperProps.style.top || 0,
            left: popperProps.style.left || 0
          }, restProps.style)
        }), _react.default.createElement("div", {
          id: id,
          role: "tooltip",
          "aria-hidden": !open,
          className: (0, _classnames.default)(classes.tooltip, (0, _defineProperty2.default)({}, classes.open, open), (0, _defineProperty2.default)({}, classes.touch, _this2.ignoreNonTouchEvents), classes["tooltipPlacement".concat((0, _helpers.capitalize)(actualPlacement))])
        }, title));
      })));
    }
  }]);
  return Tooltip;
}(_react.default.Component);

Tooltip.propTypes =  false ? {
  /**
   * Tooltip reference element.
   */
  children: _propTypes.default.element.isRequired,

  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * Do not respond to focus events.
   */
  disableFocusListener: _propTypes.default.bool,

  /**
   * Do not respond to hover events.
   */
  disableHoverListener: _propTypes.default.bool,

  /**
   * Do not respond to long press touch events.
   */
  disableTouchListener: _propTypes.default.bool,

  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This property won't impact the enter touch delay (`enterTouchDelay`).
   */
  enterDelay: _propTypes.default.number,

  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   */
  enterTouchDelay: _propTypes.default.number,

  /**
   * The relationship between the tooltip and the wrapper component is not clear from the DOM.
   * By providing this property, we can use aria-describedby to solve the accessibility issue.
   */
  id: _propTypes.default.string,

  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This property won't impact the leave touch delay (`leaveTouchDelay`).
   */
  leaveDelay: _propTypes.default.number,

  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   */
  leaveTouchDelay: _propTypes.default.number,

  /**
   * Callback fired when the tooltip requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onClose: _propTypes.default.func,

  /**
   * Callback fired when the tooltip requests to be open.
   *
   * @param {object} event The event source of the callback
   */
  onOpen: _propTypes.default.func,

  /**
   * If `true`, the tooltip is shown.
   */
  open: _propTypes.default.bool,

  /**
   * Tooltip placement
   */
  placement: _propTypes.default.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),

  /**
   * Properties applied to the `Popper` element.
   */
  PopperProps: _propTypes.default.object,

  /**
   * @ignore
   */
  theme: _propTypes.default.object.isRequired,

  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title: _propTypes.default.node.isRequired
} : {};
Tooltip.defaultProps = {
  disableFocusListener: false,
  disableHoverListener: false,
  disableTouchListener: false,
  enterDelay: 0,
  enterTouchDelay: 1000,
  leaveDelay: 0,
  leaveTouchDelay: 1500,
  placement: 'bottom'
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiTooltip',
  withTheme: true
})(Tooltip);

exports.default = _default;

/***/ }),

/***/ 1543:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Manager__ = __webpack_require__(1544);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Manager", function() { return __WEBPACK_IMPORTED_MODULE_0__Manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Target__ = __webpack_require__(1545);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Target", function() { return __WEBPACK_IMPORTED_MODULE_1__Target__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Popper__ = __webpack_require__(1546);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Popper", function() { return __WEBPACK_IMPORTED_MODULE_2__Popper__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "placements", function() { return __WEBPACK_IMPORTED_MODULE_2__Popper__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Arrow__ = __webpack_require__(1548);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Arrow", function() { return __WEBPACK_IMPORTED_MODULE_3__Arrow__["a"]; });





/***/ }),

/***/ 1544:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Manager = function (_Component) {
  _inherits(Manager, _Component);

  function Manager() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Manager);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Manager.__proto__ || Object.getPrototypeOf(Manager)).call.apply(_ref, [this].concat(args))), _this), _this._setTargetNode = function (node) {
      _this._targetNode = node;
    }, _this._getTargetNode = function () {
      return _this._targetNode;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Manager, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        popperManager: {
          setTargetNode: this._setTargetNode,
          getTargetNode: this._getTargetNode
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          tag = _props.tag,
          children = _props.children,
          restProps = _objectWithoutProperties(_props, ['tag', 'children']);

      if (tag !== false) {
        return Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(tag, restProps, children);
      } else {
        return children;
      }
    }
  }]);

  return Manager;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

Manager.childContextTypes = {
  popperManager: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};
Manager.propTypes = {
  tag: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool]),
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func])
};
Manager.defaultProps = {
  tag: 'div'
};


/* harmony default export */ __webpack_exports__["a"] = (Manager);

/***/ }),

/***/ 1545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }




var Target = function Target(props, context) {
  var _props$component = props.component,
      component = _props$component === undefined ? 'div' : _props$component,
      innerRef = props.innerRef,
      children = props.children,
      restProps = _objectWithoutProperties(props, ['component', 'innerRef', 'children']);

  var popperManager = context.popperManager;

  var targetRef = function targetRef(node) {
    popperManager.setTargetNode(node);
    if (typeof innerRef === 'function') {
      innerRef(node);
    }
  };

  if (typeof children === 'function') {
    var targetProps = { ref: targetRef };
    return children({ targetProps: targetProps, restProps: restProps });
  }

  var componentProps = _extends({}, restProps);

  if (typeof component === 'string') {
    componentProps.ref = targetRef;
  } else {
    componentProps.innerRef = targetRef;
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(component, componentProps, children);
};

Target.contextTypes = {
  popperManager: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};

Target.propTypes = {
  component: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func]),
  innerRef: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func])
};

/* harmony default export */ __webpack_exports__["a"] = (Target);

/***/ }),

/***/ 1546:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return placements; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_popper_js__ = __webpack_require__(1547);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var placements = __WEBPACK_IMPORTED_MODULE_2_popper_js__["a" /* default */].placements;

var Popper = function (_Component) {
  _inherits(Popper, _Component);

  function Popper() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Popper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Popper.__proto__ || Object.getPrototypeOf(Popper)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this._setArrowNode = function (node) {
      _this._arrowNode = node;
    }, _this._getTargetNode = function () {
      if (_this.props.target) {
        return _this.props.target;
      } else if (!_this.context.popperManager || !_this.context.popperManager.getTargetNode()) {
        throw new Error('Target missing. Popper must be given a target from the Popper Manager, or as a prop.');
      }
      return _this.context.popperManager.getTargetNode();
    }, _this._getOffsets = function (data) {
      return Object.keys(data.offsets).map(function (key) {
        return data.offsets[key];
      });
    }, _this._isDataDirty = function (data) {
      if (_this.state.data) {
        return JSON.stringify(_this._getOffsets(_this.state.data)) !== JSON.stringify(_this._getOffsets(data));
      } else {
        return true;
      }
    }, _this._updateStateModifier = {
      enabled: true,
      order: 900,
      fn: function fn(data) {
        if (_this._isDataDirty(data)) {
          _this.setState({ data: data });
        }
        return data;
      }
    }, _this._getPopperStyle = function () {
      var data = _this.state.data;


      if (!_this._popper || !data) {
        return {
          position: 'absolute',
          pointerEvents: 'none',
          opacity: 0
        };
      }

      return _extends({
        position: data.offsets.popper.position
      }, data.styles);
    }, _this._getPopperPlacement = function () {
      return _this.state.data ? _this.state.data.placement : undefined;
    }, _this._getPopperHide = function () {
      return !!_this.state.data && _this.state.data.hide ? '' : undefined;
    }, _this._getArrowStyle = function () {
      if (!_this.state.data || !_this.state.data.offsets.arrow) {
        return {};
      } else {
        var _this$state$data$offs = _this.state.data.offsets.arrow,
            top = _this$state$data$offs.top,
            left = _this$state$data$offs.left;

        return { top: top, left: left };
      }
    }, _this._handlePopperRef = function (node) {
      _this._popperNode = node;
      if (node) {
        _this._createPopper();
      } else {
        _this._destroyPopper();
      }
      if (_this.props.innerRef) {
        _this.props.innerRef(node);
      }
    }, _this._scheduleUpdate = function () {
      _this._popper && _this._popper.scheduleUpdate();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Popper, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        popper: {
          setArrowNode: this._setArrowNode,
          getArrowStyle: this._getArrowStyle
        }
      };
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(lastProps) {
      if (lastProps.placement !== this.props.placement || lastProps.eventsEnabled !== this.props.eventsEnabled || lastProps.target !== this.props.target) {
        this._destroyPopper();
        this._createPopper();
      }
      if (lastProps.children !== this.props.children) {
        this._scheduleUpdate();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._destroyPopper();
    }
  }, {
    key: '_createPopper',
    value: function _createPopper() {
      var _this2 = this;

      var _props = this.props,
          placement = _props.placement,
          eventsEnabled = _props.eventsEnabled,
          positionFixed = _props.positionFixed;

      var modifiers = _extends({}, this.props.modifiers, {
        applyStyle: { enabled: false },
        updateState: this._updateStateModifier
      });
      if (this._arrowNode) {
        modifiers.arrow = _extends({}, this.props.modifiers.arrow || {}, {
          element: this._arrowNode
        });
      }
      this._popper = new __WEBPACK_IMPORTED_MODULE_2_popper_js__["a" /* default */](this._getTargetNode(), this._popperNode, {
        placement: placement,
        positionFixed: positionFixed,
        eventsEnabled: eventsEnabled,
        modifiers: modifiers
      });

      // TODO: look into setTimeout scheduleUpdate call, without it, the popper will not position properly on creation
      setTimeout(function () {
        return _this2._scheduleUpdate();
      });
    }
  }, {
    key: '_destroyPopper',
    value: function _destroyPopper() {
      if (this._popper) {
        this._popper.destroy();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          component = _props2.component,
          innerRef = _props2.innerRef,
          placement = _props2.placement,
          eventsEnabled = _props2.eventsEnabled,
          positionFixed = _props2.positionFixed,
          modifiers = _props2.modifiers,
          children = _props2.children,
          restProps = _objectWithoutProperties(_props2, ['component', 'innerRef', 'placement', 'eventsEnabled', 'positionFixed', 'modifiers', 'children']);

      var popperStyle = this._getPopperStyle();
      var popperPlacement = this._getPopperPlacement();
      var popperHide = this._getPopperHide();

      if (typeof children === 'function') {
        var popperProps = {
          ref: this._handlePopperRef,
          style: popperStyle,
          'data-placement': popperPlacement,
          'data-x-out-of-boundaries': popperHide
        };
        return children({
          popperProps: popperProps,
          restProps: restProps,
          scheduleUpdate: this._scheduleUpdate
        });
      }

      var componentProps = _extends({}, restProps, {
        style: _extends({}, restProps.style, popperStyle),
        'data-placement': popperPlacement,
        'data-x-out-of-boundaries': popperHide
      });

      if (typeof component === 'string') {
        componentProps.ref = this._handlePopperRef;
      } else {
        componentProps.innerRef = this._handlePopperRef;
      }

      return Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(component, componentProps, children);
    }
  }]);

  return Popper;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

Popper.contextTypes = {
  popperManager: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
};
Popper.childContextTypes = {
  popper: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};
Popper.propTypes = {
  component: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func]),
  innerRef: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  placement: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf(placements),
  eventsEnabled: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  positionFixed: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  modifiers: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func]),
  target: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([
  // the following check is needed for SSR
  __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.instanceOf(typeof Element !== 'undefined' ? Element : Object), __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    getBoundingClientRect: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
    clientWidth: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
    clientHeight: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired
  })])
};
Popper.defaultProps = {
  component: 'div',
  placement: 'bottom',
  eventsEnabled: true,
  positionFixed: false,
  modifiers: {}
};


/* harmony default export */ __webpack_exports__["a"] = (Popper);

/***/ }),

/***/ 1547:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.1
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

var timeoutDuration = function () {
  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      return 1;
    }
  }
  return 0;
}();

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

/**
 * Returns the reference node of the reference object, or the reference object itself.
 * @method
 * @memberof Popper.Utils
 * @param {Element|Object} reference - the reference element (the popper will be relative to this)
 * @returns {Element} parent
 */
function getReferenceNode(reference) {
  return reference && reference.referenceNode ? reference.referenceNode : reference;
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
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

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.width;
  var height = sizes.height || element.clientHeight || result.height;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop);
    var marginLeft = parseFloat(styles.marginLeft);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
}

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }
  return el || document.documentElement;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicitly asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);

  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;

  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

    // flips variation if reference element overflows boundaries
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    // flips variation if popper content overflows boundaries
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification
  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];

  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;

  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

/* harmony default export */ __webpack_exports__["a"] = (Popper);
//# sourceMappingURL=popper.js.map

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(32)))

/***/ }),

/***/ 1548:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }




var Arrow = function Arrow(props, context) {
  var _props$component = props.component,
      component = _props$component === undefined ? 'span' : _props$component,
      innerRef = props.innerRef,
      children = props.children,
      restProps = _objectWithoutProperties(props, ['component', 'innerRef', 'children']);

  var popper = context.popper;

  var arrowRef = function arrowRef(node) {
    popper.setArrowNode(node);
    if (typeof innerRef === 'function') {
      innerRef(node);
    }
  };
  var arrowStyle = popper.getArrowStyle();

  if (typeof children === 'function') {
    var arrowProps = {
      ref: arrowRef,
      style: arrowStyle
    };
    return children({ arrowProps: arrowProps, restProps: restProps });
  }

  var componentProps = _extends({}, restProps, {
    style: _extends({}, arrowStyle, restProps.style)
  });

  if (typeof component === 'string') {
    componentProps.ref = arrowRef;
  } else {
    componentProps.innerRef = arrowRef;
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(component, componentProps, children);
};

Arrow.contextTypes = {
  popper: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};

Arrow.propTypes = {
  component: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func]),
  innerRef: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func])
};

/* harmony default export */ __webpack_exports__["a"] = (Arrow);

/***/ }),

/***/ 1557:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_input_number_style_css__ = __webpack_require__(1140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_input_number_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_input_number_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_input_number__ = __webpack_require__(1141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_input_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_input_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_material_ui_Dialog__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_material_ui_Dialog___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_material_ui_Dialog__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_material_ui_Button__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_material_ui_Button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_material_ui_Button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_material_ui_Tooltip__ = __webpack_require__(1404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_material_ui_Tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_material_ui_Tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rc_pagination__ = __webpack_require__(1525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_pagination_assets_index_css__ = __webpack_require__(1562);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_pagination_assets_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rc_pagination_assets_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_material_ui_Input__ = __webpack_require__(1534);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_material_ui_Input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_material_ui_Input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_material_ui_Form__ = __webpack_require__(1386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_material_ui_Form___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_material_ui_Form__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__CommentItemKEEditor__ = __webpack_require__(1571);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__CommentItemMDEditor__ = __webpack_require__(1572);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Comment_css__ = __webpack_require__(1424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Comment_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__Comment_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__modals_Modals__ = __webpack_require__(176);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/*
	-------------------------- 样式相关
	class 改成 className
	style 需要传入json对象				style="margin:0px">  ->   style={{ margin:"0px" }}>
	margin-top -> marginTop
	onclick -> onClick         驼峰
	
	-------------------------- 模板语法相关
	页面都在前端组装、渲染
		rails模板的 if等逻辑改成js实现
		客户端需要能判断 User.current.manager_of_shixun?(comment.dis_id)
	
	-------------------------- 现有ui控件的使用方式
	方案1: 换成对应的react组件，然后再调用(控件简单时推荐)
	方案2: 在react环境中使用若干jquery插件(控件复杂，又无react环境下的替代方案时考虑使用)
	
	-------------------------- 
	需要服务端提供对应的rest api
	

*/var _origin=window.location.origin;/*
	tpi讨论、交流问答帖子详情讨论、课堂讨论的公用模块:
	https://www.educoder.net/tasks/n2ejvaowk6l9
	https://www.educoder.net/forums/2629
	注意不同模块使用时的参数的不同		usingAntdModal onlySuperAdminCouldHide isChildCommentPagination等等

	用到的props: 
		user   user_url image_url
		
		loadingComments--
		comment_count_without_reply	
		currentPage
		comments

		buttonText  发送按钮 显示文本

		showRewardButton 是否显示奖励按钮
		showHiddenButton 是否显示隐藏按钮

		onlySuperAdminCouldHide 只有超级管理员才显示隐藏、取消隐藏
		isChildCommentPagination  是否子回复分页
		loadMoreChildComments function 加载所有子回复

		usingAntdModal 是否使用antd的弹框
		
		接口
		deleteComment			删除
		onPaginationChange    翻页变化
		commentPraise			点赞
		hiddenComment			隐藏
		rewardCode				奖励

*/var Comments=function(_Component){_inherits(Comments,_Component);function Comments(props){_classCallCheck(this,Comments);var _this=_possibleConstructorReturn(this,(Comments.__proto__||Object.getPrototypeOf(Comments)).call(this,props));_this.replyTo=function(toUserId){};_this.parseCommentContent=function(oldContent){if(oldContent&&oldContent.startsWith('<')&&oldContent.endsWith('>')){}else if(window.$('#md_div').length){// 有这个临时处理md内容的dom
window.$('#md_div').html('');// markdown to html
try{var markdwonParser=window.editormd.markdownToHTML("md_div",{markdown:oldContent,emoji:true,htmlDecode:"style,script,iframe",// you can filter tags decode
taskList:true,tex:true,// 默认不解析
flowChart:true,// 默认不解析
sequenceDiagram:true// 默认不解析
});oldContent=window.$('#md_div').html();}catch(e){// TODO 可能公式parse时报错了
console.error(e);}}return oldContent;};_this.onDialogOkBtnClick=function(){var _this$props=_this.props,deleteComment=_this$props.deleteComment,hiddenComment=_this$props.hiddenComment;var dialogType=_this.state.dialogType;if(dialogType==='delete'){deleteComment(_this.comment,_this.childComment?_this.childComment.id:'');}else if(dialogType==='hidden'||dialogType==='hiddenCancel'){hiddenComment(_this.comment,_this.childComment?_this.childComment.id:'');}_this.setState({dialogOpen:false});};_this.handleDialogClose=_this.handleDialogClose.bind(_this);_this.handleGoldRewardDialogClose=_this.handleGoldRewardDialogClose.bind(_this);_this.state={dialogOpen:false,goldRewardDialogOpen:false,goldRewardInput:'',showReplyEditorFlag:false,// false->true or true->false时切换editor显示或隐藏
currentReplyComment:null};return _this;}_createClass(Comments,[{key:'componentWillUnmount',value:function componentWillUnmount(){var $=window.$;$(document).off("onReply");}},{key:'componentDidMount',value:function componentDidMount(){var _this2=this;setTimeout(function(){var $=window.$;// 绑定后会自动off？ 加timeout试试
$(document).on("onReply",function(e,args){var commentContent=args.commentContent,id=args.id,editor=args.editor;_this2.props.replyComment(commentContent,id,editor);});},1000);}},{key:'initReply',value:function initReply(comment){this.props.initReply&&this.props.initReply(comment);// 如果配置的使用kindEditor
if(window.__useKindEditor===true){var user=this.props.user;console.log('initReply ',comment);var $=window.$;var id=comment.id;var reply_message_el='#reply_message_'+id;var reply_iconup_el='#reply_iconup_'+id;if($(reply_message_el).html()==""){$(".reply_to_message").html("");$(reply_message_el).html('<div className="orig_reply_box borderBottomNone reply_to_message" id="reply_to_message_'+id+'">\n      <div class="homepagePostReplyPortrait mr15 imageFuzzy fl" id="reply_image_'+id+'"><a href="'+user.user_url+'" target="_blank" alt="\u7528\u6237\u5934\u50CF"><img alt="0?1442652658" height="33" src="'+_origin+'/images/'+user.image_url+'" width="33" /></a></div>\n      <div class="orig_textarea fl" style="margin-bottom: 0px">\n        <div nhname=\'new_message_'+id+'\'>\n              <form accept-charset="UTF-8" action="/discusses?challenge_id=118&amp;dis_id=61&amp;dis_type=Shixun" data-remote="true" id="new_comment_form" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="HJTbMpfI8LKUpwghfkvgB2SaMmcIVyVdAezyKmzJ7FU=" /></div>\n                  <input type="hidden" id="dis_reply_id" name="reply_id" value="'+id+'">\n                  <div nhname=\'toolbar_container_'+id+'\'></div>\n                  <textarea placeholder="\u6709\u95EE\u9898\u6216\u6709\u5EFA\u8BAE\uFF0C\u8BF7\u76F4\u63A5\u7ED9\u6211\u7559\u8A00\u5427\uFF01" id="comment_news_'+id+'" style="display: none" nhname=\'new_message_textarea_'+id+'\' name="content"></textarea>\n                  <a id="new_message_submit_btn_'+id+'" href="javascript:void(0)" onclick="this.style.display=\'none\'" class="mt10 task-btn task-btn-orange fr">'+(this.props.buttonText||'发送')+'</a>\n                  <div class="cl"></div>\n                  <p nhname=\'contentmsg_'+id+'\'></p>\n</form>        </div>\n        <div class="cl"></div>\n      </div>\n  <div class="cl"></div>\n</div>\n');//" ide语法识别
$(reply_iconup_el).show();$(function(){window.sd_create_editor_from_data(id,null,"100%","Discuss");});}else{if($(reply_message_el).is(':visible')){$(reply_message_el).hide();}else{$(reply_message_el).show();}// $(reply_message_el).html("");
// $(reply_iconup_el).hide();
}}else{// MD
this.setState({currentReplyComment:comment,showReplyEditorFlag:!this.state.showReplyEditorFlag});}}// enableReplyTo
// onClick={() => this.replyTo(item.user_id)}
},{key:'renderChildenComments',value:function renderChildenComments(comment){var _this3=this;if(!comment.children||comment.children.length===0){return'';}var user=this.props.user;var childCommentsElement=comment.children.map(function(item,index){var _content=_this3.parseCommentContent(item.content);return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{key:index,className:'childComment'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'J_Comment_Info clearfix mt3'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'t_info fl'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('a',{href:_origin+'/users/'+item.user_login,className:'content-username hide fl'},item.username),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:'t_area fl'},item.time),item.reward?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_material_ui_Tooltip___default.a,{title:'\u5DF2\u5956\u52B1\u91D1\u5E01'+item.reward,disableFocusListener:true},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('a',{href:'javascript:void(0);',style:{marginLeft:'20px',cursor:'default'},className:'rewarded color-grey-8 font-12 fl '+(item.admin===true?'':'normalUser')},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('i',{className:'iconfont icon-gift mr5 color-orange fl',style:{display:'inline'}}),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:'fl'},item.reward))):''),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{className:'fr  orig_reply lineh-20'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{id:'hidden_discuss_btn_952'}),_this3.props.showRewardButton!=false&&comment.admin===true?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('a',{href:'javascript:void(0);',className:'color-grey-8',onClick:function onClick(){return _this3.showGoldRewardDialog(comment,item);}},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_material_ui_Tooltip___default.a,{title:"给TA奖励金币",disableFocusListener:true},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('i',{className:'iconfont icon-jiangli fl'}))):"", false?React.createElement(Tooltip,{title:item.hidden?"取消隐藏":"隐藏评论"},React.createElement('a',{href:'javascript:void(0);',className:'color-grey-8',onClick:function onClick(){return _this3.onCommentBtnClick(comment,item,item.hidden?'hiddenCancel':'hidden');}},React.createElement('i',{className:'fa '+(item.hidden?'fa-eye':'fa-eye-slash')+' mr5'}))):"",comment.admin===true||item.can_delete||item.user_id===user.user_id||item.user_login==user.login?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('a',{href:'javascript:void(0);',className:'color-grey-8',id:'delete_reply_118_952',onClick:function onClick(){return _this3.onCommentBtnClick(comment,item,'delete');}},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_material_ui_Tooltip___default.a,{title:"删除",disableFocusListener:true},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('i',{className:'iconfont icon-shanchu mr5'}))):'')),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'comment_content  clearfix',id:'reply_content_'+item.id},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'color-grey-3',id:'reply_content_'+item.id},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:"break_word_comments markdown-body",dangerouslySetInnerHTML:{__html:_content}}),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'cl'}))));});return childCommentsElement;}},{key:'renderComments',value:function renderComments(){var _this4=this;var _props=this.props,comments=_props.comments,currentUser=_props.currentUser,deleteComment=_props.deleteComment,commentPraise=_props.commentPraise,hiddenComment=_props.hiddenComment,user=_props.user;var _state=this.state,showReplyEditorFlag=_state.showReplyEditorFlag,currentReplyComment=_state.currentReplyComment;if(!comments||comments.length===0){return;}// "https://www.educoder.net/users/m02945638"
var commentsElement=comments.map(function(item,index){var _content=void 0;_content=_this4.parseCommentContent(item.content);return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'comment_item_cont df clearfix',key:index},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'J_Comment_Face fl'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('a',{href:_origin+'/users/'+item.user_login,target:'_blank'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('img',{alt:'\u7528\u6237\u5934\u50CF',height:'50',src:Object(__WEBPACK_IMPORTED_MODULE_8_educoder__["M" /* getImageUrl */])('images/'+item.image_url),width:'50'}))),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'t_content fl'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'J_Comment_Reply'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'comment_orig_content',style:{margin:"0px"}},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'J_Comment_Info clearfix mt3'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'t_info fl'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('a',{href:_origin+'/users/'+item.user_login,className:'content-username hide fl'},item.username),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:'t_area fl'},item.time),item.position&&__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:'fl color-light-green font-14 ml15'},'[\u7B2C',item.position,'\u5173]'),item.game_url?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_material_ui_Tooltip___default.a,{title:'\u70B9\u51FB\u67E5\u770BTA\u7684\u4EE3\u7801\u9875\u9762',disableFocusListener:true},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('a',{href:item.game_url,target:'_blank',className:'fl font-14 ml15',style:{color:"#4CACFF",cursor:"pointer"}},'\u67E5\u770B')):"",item.reward?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_material_ui_Tooltip___default.a,{title:'\u5DF2\u5956\u52B1\u91D1\u5E01'+item.reward,disableFocusListener:true},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('a',{href:'javascript:void(0);',style:{marginLeft:'20px',cursor:'default'},className:'rewarded color-grey-8 font-12 fl '+(item.admin===true?'':'normalUser')},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('i',{className:'iconfont icon-gift mr5 color-orange fl'}),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:'fl'},item.reward))):'')),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'comment_content  clearfix',id:'reply_content_'+item.id},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'color-grey-3',id:'reply_content_'+item.id},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:"break_word_comments  markdown-body",dangerouslySetInnerHTML:{__html:_content}}),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'cl'}))),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'childrenCommentsView'},item&&item.children&&item.children.length?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'trangle'}):'',_this4.renderChildenComments(item),item.isAllChildrenLoaded!=true&&item.children&&_this4.props.isChildCommentPagination==true&&item.child_message_count>5?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_material_ui_Tooltip___default.a,{title:"点击查看更多回复",disableFocusListener:true},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'loadMoreChildComments',onClick:function onClick(){_this4.props.loadMoreChildComments&&_this4.props.loadMoreChildComments(item);}},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('i',{className:'iconfont icon-xiajiantou'}))):''),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{className:'fr orig_reply'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{id:'hidden_discuss_btn_952'}),_this4.props.showRewardButton!=false&&item.admin===true?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('a',{href:'javascript:void(0);',className:'color-grey-8 fl mt2',onClick:function onClick(){return _this4.showGoldRewardDialog(item);}},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_material_ui_Tooltip___default.a,{title:"给TA奖励金币",disableFocusListener:true},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('i',{className:'iconfont icon-jiangli mr5 fl'}))):"",_this4.props.showHiddenButton==true&&(_this4.props.onlySuperAdminCouldHide&&item.isSuperAdmin||!_this4.props.onlySuperAdminCouldHide&&item.admin===true)?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_material_ui_Tooltip___default.a,{title:item.hidden?"取消隐藏":"隐藏评论",disableFocusListener:true},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('a',{href:'javascript:void(0);',className:'color-grey-8 fl mt1',onClick:function onClick(){return _this4.onCommentBtnClick(item,'',item.hidden?'hiddenCancel':'hidden');}},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('i',{className:' '+(item.hidden?'iconfont icon-yincangbiyan':'fa fa-eye')+' mr5'}))):"",item.admin&&(!item.children||item.children.length===0)?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('a',{href:'javascript:void(0);',className:'color-grey-8',onClick:function onClick(){return _this4.onCommentBtnClick(item,'','delete');}},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_material_ui_Tooltip___default.a,{title:"删除",disableFocusListener:true},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('i',{className:'iconfont icon-shanchu mr5'}))):'',(_this4.props.showReply==undefined||_this4.props.showReply==true)&&__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('a',{href:'javascript:void(0)',className:'color-grey-8',onClick:function onClick(){return _this4.initReply(item);}},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_material_ui_Tooltip___default.a,{title:"回复"},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('i',{className:'iconfont icon-huifu1 mr5'}))),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:'reply_praise_count_952'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_material_ui_Tooltip___default.a,{title:item.user_praise?"取消点赞":"点赞"},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('a',{href:'javascript:void(0)',className:'fr mr5  '+(item.user_praise?'color-orange03':'color-grey-8'),onClick:function onClick(){return commentPraise(item.id);}},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('i',{className:item.user_praise?"iconfont icon-dianzan mr3":"iconfont icon-dianzan-xian mr3"}),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',{className:'fr font-14',style:{marginTop:'1px'}},item.praise_count?item.praise_count:''))))),window.__useKindEditor?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__CommentItemKEEditor__["a" /* default */],{showReplyEditorFlag:showReplyEditorFlag,currentReplyComment:currentReplyComment,item:item,user:user}):__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__CommentItemMDEditor__["a" /* default */],{showReplyEditorFlag:showReplyEditorFlag,currentReplyComment:currentReplyComment,item:item,user:user,buttonText:_this4.props.buttonText})))));});/*
			/users/reply_to?reply_id=${item.id}&amp;type=Challenge&amp;user_activity_id=118
		*//*	
			onclick="delete_confirm_box_2('<%= discuss_path(comment, :challenge_id => @game_challenge) %>', '确定要删除该条回复吗？')"
			delete按钮
			id=`delete_reply_<%=@game_challenge.id %>_<%=comment.id %>`

		*/return commentsElement;}},{key:'onCommentBtnClick',value:function onCommentBtnClick(comment,childComment,dialogType){this.comment=comment;this.childComment=childComment;this.setState({dialogOpen:true,dialogType:dialogType});}},{key:'handleDialogClose',value:function handleDialogClose(){this.setState({dialogOpen:false});}},{key:'showGoldRewardDialog',value:function showGoldRewardDialog(comment,childComment){if(comment.admin===true){this.comment=comment;this.childComment=childComment;this.setState({goldRewardDialogOpen:true});}}},{key:'handleGoldRewardDialogClose',value:function handleGoldRewardDialogClose(){this.setState({goldRewardDialogOpen:false});}},{key:'onGoldRewardDialogOkBtnClick',value:function onGoldRewardDialogOkBtnClick(){console.log('onGoldRewardDialogOkBtnClick');var goldRewardInput=this.state.goldRewardInput;// || goldRewardInput.indexOf('-') !== -1
if(!goldRewardInput||goldRewardInput==='0'){this.setState({goldRewardInputError:true});return;}else{this.setState({goldRewardDialogOpen:false});this.props.rewardCode(this.comment,this.childComment,goldRewardInput);}}},{key:'onGoldRewardInputChange',value:function onGoldRewardInputChange(value){// e.target.value
var number=parseInt(value||0,10);if(Number.isNaN(number)){return;}this.setState({goldRewardInput:number,goldRewardInputError:false});}},{key:'render',value:function render(){var _this5=this;var _props2=this.props,deleteComment=_props2.deleteComment,onPaginationChange=_props2.onPaginationChange,comment_count_without_reply=_props2.comment_count_without_reply,currentPage=_props2.currentPage,comments=_props2.comments,usingAntdModal=_props2.usingAntdModal;var _state2=this.state,dialogOpen=_state2.dialogOpen,goldRewardDialogOpen=_state2.goldRewardDialogOpen,dialogType=_state2.dialogType,goldRewardInputError=_state2.goldRewardInputError;var goldRewardInputErrorObj=goldRewardInputError?{'error':'error'}:{};return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'fit -scroll',style:{'overflow-x':'hidden'}},usingAntdModal?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14__modals_Modals__["a" /* default */],{modalsType:dialogOpen,modalsTopval:dialogType==='delete'?'确定要删除该条回复吗？':dialogType==='hidden'?'确定要隐藏该条回复吗？':dialogType==='hiddenCancel'?'确定要取消隐藏该条回复吗？':'',modalsBottomval:"",modalCancel:this.handleDialogClose,modalSave:this.onDialogOkBtnClick}):__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_material_ui_Dialog___default.a,{open:dialogOpen,disableEscapeKeyDown:true,onClose:this.handleDialogClose},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_material_ui_Dialog__["DialogTitle"],{id:'alert-dialog-title'},"提示"),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_material_ui_Dialog__["DialogContent"],null,__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_material_ui_Dialog__["DialogContentText"],{id:'alert-dialog-description',style:{textAlign:'center'}},dialogType==='delete'?'确定要删除该条回复吗？':dialogType==='hidden'?'确定要隐藏该条回复吗？':dialogType==='hiddenCancel'?'确定要取消隐藏该条回复吗？':'')),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_material_ui_Dialog__["DialogActions"],null,__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_material_ui_Button___default.a,{onClick:this.handleDialogClose,color:'primary'},'\u53D6\u6D88'),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_material_ui_Button___default.a,{variant:'raised',onClick:function onClick(){return _this5.onDialogOkBtnClick();},color:'primary',autoFocus:true},'\u786E\u5B9A'))),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_material_ui_Dialog___default.a,{open:goldRewardDialogOpen,disableEscapeKeyDown:true,onClose:this.handleGoldRewardDialogClose},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_material_ui_Dialog__["DialogTitle"],{id:'alert-dialog-title'},"奖励设置"),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_material_ui_Dialog__["DialogContent"],null,__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_input_number___default.a,{placeholder:'\u8BF7\u8F93\u5165\u5956\u52B1\u7684\u91D1\u5E01\u6570\u91CF',id:'goldReward',type:'number',value:this.state.goldRewardInput,onChange:function onChange(e){return _this5.onGoldRewardInputChange(e);},width:228,style:{width:'228px'}})),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_material_ui_Dialog__["DialogActions"],null,__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_material_ui_Button___default.a,{onClick:this.handleGoldRewardDialogClose,color:'primary'},'\u53D6\u6D88'),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_material_ui_Button___default.a,{variant:'raised',onClick:function onClick(){return _this5.onGoldRewardDialogOkBtnClick();},color:'primary',autoFocus:true},'\u786E\u5B9A'))),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'-layout-v -fit'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'panel-comment_item'},this.renderComments()),comment_count_without_reply>10?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'paginationSection'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_rc_pagination__["a" /* default */],{showQuickJumper:true,onChange:onPaginationChange,current:currentPage,total:comment_count_without_reply})):'',comment_count_without_reply==0?__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',null,__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('div',{className:'edu-tab-con-box clearfix edu-txt-center'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('img',{className:'edu-nodata-img mb20',src:Object(__WEBPACK_IMPORTED_MODULE_8_educoder__["M" /* getImageUrl */])("images/educoder/nodata.png")}),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('p',{className:'edu-nodata-p mb20'},'\u6682\u65F6\u8FD8\u6CA1\u6709\u76F8\u5173\u6570\u636E\u54E6\uFF01'))):''));}}]);return Comments;}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (Comments);

/***/ }),

/***/ 1558:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_classnames__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Pager__ = __webpack_require__(1559);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Options__ = __webpack_require__(1560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__KeyCode__ = __webpack_require__(1399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__locale_zh_CN__ = __webpack_require__(1561);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_react_lifecycles_compat__ = __webpack_require__(7);















function noop() {}

function isInteger(value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}

function defaultItemRender(page, type, element) {
  return element;
}

function calculatePage(p, state, props) {
  var pageSize = p;
  if (typeof pageSize === 'undefined') {
    pageSize = state.pageSize;
  }
  return Math.floor((props.total - 1) / pageSize) + 1;
}

var Pagination = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Pagination, _React$Component);

  function Pagination(props) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Pagination);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));

    _initialiseProps.call(_this);

    var hasOnChange = props.onChange !== noop;
    var hasCurrent = 'current' in props;
    if (hasCurrent && !hasOnChange) {
      console.warn('Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.'); // eslint-disable-line
    }

    var current = props.defaultCurrent;
    if ('current' in props) {
      current = props.current;
    }

    var pageSize = props.defaultPageSize;
    if ('pageSize' in props) {
      pageSize = props.pageSize;
    }

    current = Math.min(current, calculatePage(pageSize, undefined, props));

    _this.state = {
      current: current,
      currentInputValue: current,
      pageSize: pageSize
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Pagination, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      // When current page change, fix focused style of prev item
      // A hacky solution of https://github.com/ant-design/ant-design/issues/8948
      var prefixCls = this.props.prefixCls;

      if (prevState.current !== this.state.current && this.paginationNode) {
        var lastCurrentNode = this.paginationNode.querySelector('.' + prefixCls + '-item-' + prevState.current);
        if (lastCurrentNode && document.activeElement === lastCurrentNode) {
          lastCurrentNode.blur();
        }
      }
    }
  }, {
    key: 'getValidValue',
    value: function getValidValue(e) {
      var inputValue = e.target.value;
      var allPages = calculatePage(undefined, this.state, this.props);
      var currentInputValue = this.state.currentInputValue;

      var value = void 0;
      if (inputValue === '') {
        value = inputValue;
      } else if (isNaN(Number(inputValue))) {
        value = currentInputValue;
      } else if (inputValue >= allPages) {
        value = allPages;
      } else {
        value = Number(inputValue);
      }
      return value;
    }
  }, {
    key: 'renderPrev',
    value: function renderPrev(prevPage) {
      var _props = this.props,
          prevIcon = _props.prevIcon,
          itemRender = _props.itemRender;

      var prevButton = itemRender(prevPage, 'prev', this.getItemIcon(prevIcon));
      var disabled = !this.hasPrev();
      return Object(__WEBPACK_IMPORTED_MODULE_6_react__["isValidElement"])(prevButton) ? Object(__WEBPACK_IMPORTED_MODULE_6_react__["cloneElement"])(prevButton, { disabled: disabled }) : prevButton;
    }
  }, {
    key: 'renderNext',
    value: function renderNext(nextPage) {
      var _props2 = this.props,
          nextIcon = _props2.nextIcon,
          itemRender = _props2.itemRender;

      var nextButton = itemRender(nextPage, 'next', this.getItemIcon(nextIcon));
      var disabled = !this.hasNext();
      return Object(__WEBPACK_IMPORTED_MODULE_6_react__["isValidElement"])(nextButton) ? Object(__WEBPACK_IMPORTED_MODULE_6_react__["cloneElement"])(nextButton, { disabled: disabled }) : nextButton;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          prefixCls = _props3.prefixCls,
          className = _props3.className,
          disabled = _props3.disabled;

      // When hideOnSinglePage is true and there is only 1 page, hide the pager

      if (this.props.hideOnSinglePage === true && this.props.total <= this.state.pageSize) {
        return null;
      }

      var props = this.props;
      var locale = props.locale;

      var allPages = calculatePage(undefined, this.state, this.props);
      var pagerList = [];
      var jumpPrev = null;
      var jumpNext = null;
      var firstPager = null;
      var lastPager = null;
      var gotoButton = null;

      var goButton = props.showQuickJumper && props.showQuickJumper.goButton;
      var pageBufferSize = props.showLessItems ? 1 : 2;
      var _state = this.state,
          current = _state.current,
          pageSize = _state.pageSize;


      var prevPage = current - 1 > 0 ? current - 1 : 0;
      var nextPage = current + 1 < allPages ? current + 1 : allPages;

      var dataOrAriaAttributeProps = Object.keys(props).reduce(function (prev, key) {
        if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role') {
          prev[key] = props[key];
        }
        return prev;
      }, {});

      if (props.simple) {
        if (goButton) {
          if (typeof goButton === 'boolean') {
            gotoButton = __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'button',
              {
                type: 'button',
                onClick: this.handleGoTO,
                onKeyUp: this.handleGoTO
              },
              locale.jump_to_confirm
            );
          } else {
            gotoButton = __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'span',
              {
                onClick: this.handleGoTO,
                onKeyUp: this.handleGoTO
              },
              goButton
            );
          }
          gotoButton = __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'li',
            {
              title: props.showTitle ? '' + locale.jump_to + this.state.current + '/' + allPages : null,
              className: prefixCls + '-simple-pager'
            },
            gotoButton
          );
        }

        return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'ul',
          __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({
            className: prefixCls + ' ' + prefixCls + '-simple ' + props.className,
            style: props.style,
            ref: this.savePaginationNode
          }, dataOrAriaAttributeProps),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'li',
            {
              title: props.showTitle ? locale.prev_page : null,
              onClick: this.prev,
              tabIndex: this.hasPrev() ? 0 : null,
              onKeyPress: this.runIfEnterPrev,
              className: (this.hasPrev() ? '' : prefixCls + '-disabled') + ' ' + prefixCls + '-prev',
              'aria-disabled': !this.hasPrev()
            },
            this.renderPrev(prevPage)
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'li',
            {
              title: props.showTitle ? this.state.current + '/' + allPages : null,
              className: prefixCls + '-simple-pager'
            },
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('input', {
              type: 'text',
              value: this.state.currentInputValue,
              onKeyDown: this.handleKeyDown,
              onKeyUp: this.handleKeyUp,
              onChange: this.handleKeyUp,
              size: '3'
            }),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'span',
              { className: prefixCls + '-slash' },
              '/'
            ),
            allPages
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'li',
            {
              title: props.showTitle ? locale.next_page : null,
              onClick: this.next,
              tabIndex: this.hasPrev() ? 0 : null,
              onKeyPress: this.runIfEnterNext,
              className: (this.hasNext() ? '' : prefixCls + '-disabled') + ' ' + prefixCls + '-next',
              'aria-disabled': !this.hasNext()
            },
            this.renderNext(nextPage)
          ),
          gotoButton
        );
      }

      if (allPages <= 5 + pageBufferSize * 2) {
        var pagerProps = {
          locale: locale,
          rootPrefixCls: prefixCls,
          onClick: this.handleChange,
          onKeyPress: this.runIfEnter,
          showTitle: props.showTitle,
          itemRender: props.itemRender
        };
        if (!allPages) {
          pagerList.push(__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__Pager__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, pagerProps, {
            key: 'noPager',
            page: allPages,
            className: prefixCls + '-disabled'
          })));
        }
        for (var i = 1; i <= allPages; i++) {
          var active = this.state.current === i;
          pagerList.push(__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__Pager__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, pagerProps, {
            key: i,
            page: i,
            active: active
          })));
        }
      } else {
        var prevItemTitle = props.showLessItems ? locale.prev_3 : locale.prev_5;
        var nextItemTitle = props.showLessItems ? locale.next_3 : locale.next_5;
        if (props.showPrevNextJumpers) {
          var jumpPrevClassString = prefixCls + '-jump-prev';
          if (props.jumpPrevIcon) {
            jumpPrevClassString += ' ' + prefixCls + '-jump-prev-custom-icon';
          }
          jumpPrev = __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'li',
            {
              title: props.showTitle ? prevItemTitle : null,
              key: 'prev',
              onClick: this.jumpPrev,
              tabIndex: '0',
              onKeyPress: this.runIfEnterJumpPrev,
              className: jumpPrevClassString
            },
            props.itemRender(this.getJumpPrevPage(), 'jump-prev', this.getItemIcon(props.jumpPrevIcon))
          );
          var jumpNextClassString = prefixCls + '-jump-next';
          if (props.jumpNextIcon) {
            jumpNextClassString += ' ' + prefixCls + '-jump-next-custom-icon';
          }
          jumpNext = __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'li',
            {
              title: props.showTitle ? nextItemTitle : null,
              key: 'next',
              tabIndex: '0',
              onClick: this.jumpNext,
              onKeyPress: this.runIfEnterJumpNext,
              className: jumpNextClassString
            },
            props.itemRender(this.getJumpNextPage(), 'jump-next', this.getItemIcon(props.jumpNextIcon))
          );
        }
        lastPager = __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__Pager__["a" /* default */], {
          locale: props.locale,
          last: true,
          rootPrefixCls: prefixCls,
          onClick: this.handleChange,
          onKeyPress: this.runIfEnter,
          key: allPages,
          page: allPages,
          active: false,
          showTitle: props.showTitle,
          itemRender: props.itemRender
        });
        firstPager = __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__Pager__["a" /* default */], {
          locale: props.locale,
          rootPrefixCls: prefixCls,
          onClick: this.handleChange,
          onKeyPress: this.runIfEnter,
          key: 1,
          page: 1,
          active: false,
          showTitle: props.showTitle,
          itemRender: props.itemRender
        });

        var left = Math.max(1, current - pageBufferSize);
        var right = Math.min(current + pageBufferSize, allPages);

        if (current - 1 <= pageBufferSize) {
          right = 1 + pageBufferSize * 2;
        }

        if (allPages - current <= pageBufferSize) {
          left = allPages - pageBufferSize * 2;
        }

        for (var _i = left; _i <= right; _i++) {
          var _active = current === _i;
          pagerList.push(__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__Pager__["a" /* default */], {
            locale: props.locale,
            rootPrefixCls: prefixCls,
            onClick: this.handleChange,
            onKeyPress: this.runIfEnter,
            key: _i,
            page: _i,
            active: _active,
            showTitle: props.showTitle,
            itemRender: props.itemRender
          }));
        }

        if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
          pagerList[0] = __WEBPACK_IMPORTED_MODULE_6_react___default.a.cloneElement(pagerList[0], {
            className: prefixCls + '-item-after-jump-prev'
          });
          pagerList.unshift(jumpPrev);
        }
        if (allPages - current >= pageBufferSize * 2 && current !== allPages - 2) {
          pagerList[pagerList.length - 1] = __WEBPACK_IMPORTED_MODULE_6_react___default.a.cloneElement(pagerList[pagerList.length - 1], {
            className: prefixCls + '-item-before-jump-next'
          });
          pagerList.push(jumpNext);
        }

        if (left !== 1) {
          pagerList.unshift(firstPager);
        }
        if (right !== allPages) {
          pagerList.push(lastPager);
        }
      }

      var totalText = null;

      if (props.showTotal) {
        totalText = __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'li',
          { className: prefixCls + '-total-text' },
          props.showTotal(props.total, [props.total === 0 ? 0 : (current - 1) * pageSize + 1, current * pageSize > props.total ? props.total : current * pageSize])
        );
      }
      var prevDisabled = !this.hasPrev() || !allPages;
      var nextDisabled = !this.hasNext() || !allPages;
      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'ul',
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({
          className: __WEBPACK_IMPORTED_MODULE_7_classnames___default()(prefixCls, className, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, prefixCls + '-disabled', disabled)),
          style: props.style,
          unselectable: 'unselectable',
          ref: this.savePaginationNode
        }, dataOrAriaAttributeProps),
        totalText,
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'li',
          {
            title: props.showTitle ? locale.prev_page : null,
            onClick: this.prev,
            tabIndex: prevDisabled ? null : 0,
            onKeyPress: this.runIfEnterPrev,
            className: (!prevDisabled ? '' : prefixCls + '-disabled') + ' ' + prefixCls + '-prev',
            'aria-disabled': prevDisabled
          },
          this.renderPrev(prevPage)
        ),
        pagerList,
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'li',
          {
            title: props.showTitle ? locale.next_page : null,
            onClick: this.next,
            tabIndex: nextDisabled ? null : 0,
            onKeyPress: this.runIfEnterNext,
            className: (!nextDisabled ? '' : prefixCls + '-disabled') + ' ' + prefixCls + '-next',
            'aria-disabled': nextDisabled
          },
          this.renderNext(nextPage)
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__Options__["a" /* default */], {
          disabled: disabled,
          locale: props.locale,
          rootPrefixCls: prefixCls,
          selectComponentClass: props.selectComponentClass,
          selectPrefixCls: props.selectPrefixCls,
          changeSize: this.props.showSizeChanger ? this.changePageSize : null,
          current: this.state.current,
          pageSize: this.state.pageSize,
          pageSizeOptions: this.props.pageSizeOptions,
          quickGo: this.shouldDisplayQuickJumper() ? this.handleChange : null,
          goButton: goButton
        })
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props, prevState) {
      var newState = {};

      if ('current' in props) {
        newState.current = props.current;

        if (props.current !== prevState.current) {
          newState.currentInputValue = newState.current;
        }
      }

      if ('pageSize' in props && props.pageSize !== prevState.pageSize) {
        var current = prevState.current;
        var newCurrent = calculatePage(props.pageSize, prevState, props);
        current = current > newCurrent ? newCurrent : current;

        if (!('current' in props)) {
          newState.current = current;
          newState.currentInputValue = current;
        }
        newState.pageSize = props.pageSize;
      }

      return newState;
    }

    /**
     * computed icon node that need to be rendered.
     * @param {React.ReactNode | React.ComponentType<PaginationProps>} icon received icon.
     * @returns {React.ReactNode}
     */

  }]);

  return Pagination;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

Pagination.propTypes = {
  disabled: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
  prefixCls: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.string,
  className: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.string,
  current: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.number,
  defaultCurrent: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.number,
  total: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.number,
  pageSize: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.number,
  defaultPageSize: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.number,
  onChange: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
  hideOnSinglePage: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
  showSizeChanger: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
  showLessItems: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
  onShowSizeChange: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
  selectComponentClass: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
  showPrevNextJumpers: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
  showQuickJumper: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool, __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.object]),
  showTitle: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
  pageSizeOptions: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.string),
  showTotal: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
  locale: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.object,
  style: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.object,
  itemRender: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
  prevIcon: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.node]),
  nextIcon: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.node]),
  jumpPrevIcon: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.node]),
  jumpNextIcon: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.node])
};
Pagination.defaultProps = {
  defaultCurrent: 1,
  total: 0,
  defaultPageSize: 10,
  onChange: noop,
  className: '',
  selectPrefixCls: 'rc-select',
  prefixCls: 'rc-pagination',
  selectComponentClass: null,
  hideOnSinglePage: false,
  showPrevNextJumpers: true,
  showQuickJumper: false,
  showSizeChanger: false,
  showLessItems: false,
  showTitle: true,
  onShowSizeChange: noop,
  locale: __WEBPACK_IMPORTED_MODULE_12__locale_zh_CN__["a" /* default */],
  style: {},
  itemRender: defaultItemRender
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.getJumpPrevPage = function () {
    return Math.max(1, _this2.state.current - (_this2.props.showLessItems ? 3 : 5));
  };

  this.getJumpNextPage = function () {
    return Math.min(calculatePage(undefined, _this2.state, _this2.props), _this2.state.current + (_this2.props.showLessItems ? 3 : 5));
  };

  this.getItemIcon = function (icon) {
    var prefixCls = _this2.props.prefixCls;

    var iconNode = icon || __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('a', { className: prefixCls + '-item-link' });
    if (typeof icon === 'function') {
      iconNode = __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(icon, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, _this2.props));
    }
    return iconNode;
  };

  this.savePaginationNode = function (node) {
    _this2.paginationNode = node;
  };

  this.isValid = function (page) {
    return isInteger(page) && page !== _this2.state.current;
  };

  this.shouldDisplayQuickJumper = function () {
    var _props4 = _this2.props,
        showQuickJumper = _props4.showQuickJumper,
        pageSize = _props4.pageSize,
        total = _props4.total;

    if (total <= pageSize) {
      return false;
    }
    return showQuickJumper;
  };

  this.handleKeyDown = function (e) {
    if (e.keyCode === __WEBPACK_IMPORTED_MODULE_11__KeyCode__["a" /* default */].ARROW_UP || e.keyCode === __WEBPACK_IMPORTED_MODULE_11__KeyCode__["a" /* default */].ARROW_DOWN) {
      e.preventDefault();
    }
  };

  this.handleKeyUp = function (e) {
    var value = _this2.getValidValue(e);
    var currentInputValue = _this2.state.currentInputValue;

    if (value !== currentInputValue) {
      _this2.setState({
        currentInputValue: value
      });
    }
    if (e.keyCode === __WEBPACK_IMPORTED_MODULE_11__KeyCode__["a" /* default */].ENTER) {
      _this2.handleChange(value);
    } else if (e.keyCode === __WEBPACK_IMPORTED_MODULE_11__KeyCode__["a" /* default */].ARROW_UP) {
      _this2.handleChange(value - 1);
    } else if (e.keyCode === __WEBPACK_IMPORTED_MODULE_11__KeyCode__["a" /* default */].ARROW_DOWN) {
      _this2.handleChange(value + 1);
    }
  };

  this.changePageSize = function (size) {
    var current = _this2.state.current;
    var newCurrent = calculatePage(size, _this2.state, _this2.props);
    current = current > newCurrent ? newCurrent : current;
    // fix the issue:
    // Once 'total' is 0, 'current' in 'onShowSizeChange' is 0, which is not correct.
    if (newCurrent === 0) {
      current = _this2.state.current;
    }

    if (typeof size === 'number') {
      if (!('pageSize' in _this2.props)) {
        _this2.setState({
          pageSize: size
        });
      }
      if (!('current' in _this2.props)) {
        _this2.setState({
          current: current,
          currentInputValue: current
        });
      }
    }
    _this2.props.onShowSizeChange(current, size);
  };

  this.handleChange = function (p) {
    var disabled = _this2.props.disabled;


    var page = p;
    if (_this2.isValid(page) && !disabled) {
      var currentPage = calculatePage(undefined, _this2.state, _this2.props);
      if (page > currentPage) {
        page = currentPage;
      } else if (page < 1) {
        page = 1;
      }

      if (!('current' in _this2.props)) {
        _this2.setState({
          current: page,
          currentInputValue: page
        });
      }

      var pageSize = _this2.state.pageSize;
      _this2.props.onChange(page, pageSize);

      return page;
    }

    return _this2.state.current;
  };

  this.prev = function () {
    if (_this2.hasPrev()) {
      _this2.handleChange(_this2.state.current - 1);
    }
  };

  this.next = function () {
    if (_this2.hasNext()) {
      _this2.handleChange(_this2.state.current + 1);
    }
  };

  this.jumpPrev = function () {
    _this2.handleChange(_this2.getJumpPrevPage());
  };

  this.jumpNext = function () {
    _this2.handleChange(_this2.getJumpNextPage());
  };

  this.hasPrev = function () {
    return _this2.state.current > 1;
  };

  this.hasNext = function () {
    return _this2.state.current < calculatePage(undefined, _this2.state, _this2.props);
  };

  this.runIfEnter = function (event, callback) {
    for (var _len = arguments.length, restParams = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      restParams[_key - 2] = arguments[_key];
    }

    if (event.key === 'Enter' || event.charCode === 13) {
      callback.apply(undefined, restParams);
    }
  };

  this.runIfEnterPrev = function (e) {
    _this2.runIfEnter(e, _this2.prev);
  };

  this.runIfEnterNext = function (e) {
    _this2.runIfEnter(e, _this2.next);
  };

  this.runIfEnterJumpPrev = function (e) {
    _this2.runIfEnter(e, _this2.jumpPrev);
  };

  this.runIfEnterJumpNext = function (e) {
    _this2.runIfEnter(e, _this2.jumpNext);
  };

  this.handleGoTO = function (e) {
    if (e.keyCode === __WEBPACK_IMPORTED_MODULE_11__KeyCode__["a" /* default */].ENTER || e.type === 'click') {
      _this2.handleChange(_this2.state.currentInputValue);
    }
  };
};

Object(__WEBPACK_IMPORTED_MODULE_13_react_lifecycles_compat__["polyfill"])(Pagination);

/* harmony default export */ __webpack_exports__["a"] = (Pagination);

/***/ }),

/***/ 1559:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);





var Pager = function Pager(props) {
  var _classNames;

  var prefixCls = props.rootPrefixCls + '-item';
  var cls = __WEBPACK_IMPORTED_MODULE_3_classnames___default()(prefixCls, prefixCls + '-' + props.page, (_classNames = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classNames, prefixCls + '-active', props.active), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classNames, props.className, !!props.className), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_classNames, prefixCls + '-disabled', !props.page), _classNames));

  var handleClick = function handleClick() {
    props.onClick(props.page);
  };

  var handleKeyPress = function handleKeyPress(e) {
    props.onKeyPress(e, props.onClick, props.page);
  };

  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    'li',
    {
      title: props.showTitle ? props.page : null,
      className: cls,
      onClick: handleClick,
      onKeyPress: handleKeyPress,
      tabIndex: '0'
    },
    props.itemRender(props.page, 'page', __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'a',
      null,
      props.page
    ))
  );
};

Pager.propTypes = {
  page: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number,
  active: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
  last: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
  locale: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object,
  className: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  showTitle: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
  rootPrefixCls: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  onClick: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  onKeyPress: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  itemRender: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func
};

/* harmony default export */ __webpack_exports__["a"] = (Pager);

/***/ }),

/***/ 1560:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__KeyCode__ = __webpack_require__(1399);








var Options = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Options, _React$Component);

  function Options() {
    var _ref;

    var _temp, _this, _ret;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Options);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_ref = Options.__proto__ || Object.getPrototypeOf(Options)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      goInputText: ''
    }, _this.buildOptionText = function (value) {
      return value + ' ' + _this.props.locale.items_per_page;
    }, _this.changeSize = function (value) {
      _this.props.changeSize(Number(value));
    }, _this.handleChange = function (e) {
      _this.setState({
        goInputText: e.target.value
      });
    }, _this.handleBlur = function (e) {
      var _this$props = _this.props,
          goButton = _this$props.goButton,
          quickGo = _this$props.quickGo,
          rootPrefixCls = _this$props.rootPrefixCls;

      if (goButton) {
        return;
      }
      if (e.relatedTarget && (e.relatedTarget.className.indexOf(rootPrefixCls + '-prev') >= 0 || e.relatedTarget.className.indexOf(rootPrefixCls + '-next') >= 0)) {
        return;
      }
      quickGo(_this.getValidValue());
    }, _this.go = function (e) {
      var goInputText = _this.state.goInputText;

      if (goInputText === '') {
        return;
      }
      if (e.keyCode === __WEBPACK_IMPORTED_MODULE_6__KeyCode__["a" /* default */].ENTER || e.type === 'click') {
        _this.setState({
          goInputText: ''
        });
        _this.props.quickGo(_this.getValidValue());
      }
    }, _temp), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(_this, _ret);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Options, [{
    key: 'getValidValue',
    value: function getValidValue() {
      var _state = this.state,
          goInputText = _state.goInputText,
          current = _state.current;

      return !goInputText || isNaN(goInputText) ? current : Number(goInputText);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          pageSize = _props.pageSize,
          pageSizeOptions = _props.pageSizeOptions,
          locale = _props.locale,
          rootPrefixCls = _props.rootPrefixCls,
          changeSize = _props.changeSize,
          quickGo = _props.quickGo,
          goButton = _props.goButton,
          selectComponentClass = _props.selectComponentClass,
          buildOptionText = _props.buildOptionText,
          selectPrefixCls = _props.selectPrefixCls,
          disabled = _props.disabled;
      var goInputText = this.state.goInputText;

      var prefixCls = rootPrefixCls + '-options';
      var Select = selectComponentClass;
      var changeSelect = null;
      var goInput = null;
      var gotoButton = null;

      if (!changeSize && !quickGo) {
        return null;
      }

      if (changeSize && Select) {
        var options = pageSizeOptions.map(function (opt, i) {
          return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            Select.Option,
            { key: i, value: opt },
            (buildOptionText || _this2.buildOptionText)(opt)
          );
        });

        changeSelect = __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          Select,
          {
            disabled: disabled,
            prefixCls: selectPrefixCls,
            showSearch: false,
            className: prefixCls + '-size-changer',
            optionLabelProp: 'children',
            dropdownMatchSelectWidth: false,
            value: (pageSize || pageSizeOptions[0]).toString(),
            onChange: this.changeSize,
            getPopupContainer: function getPopupContainer(triggerNode) {
              return triggerNode.parentNode;
            }
          },
          options
        );
      }

      if (quickGo) {
        if (goButton) {
          gotoButton = typeof goButton === 'boolean' ? __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            'button',
            {
              type: 'button',
              onClick: this.go,
              onKeyUp: this.go,
              disabled: disabled
            },
            locale.jump_to_confirm
          ) : __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            'span',
            {
              onClick: this.go,
              onKeyUp: this.go
            },
            goButton
          );
        }
        goInput = __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'div',
          { className: prefixCls + '-quick-jumper' },
          locale.jump_to,
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('input', {
            disabled: disabled,
            type: 'text',
            value: goInputText,
            onChange: this.handleChange,
            onKeyUp: this.go,
            onBlur: this.handleBlur
          }),
          locale.page,
          gotoButton
        );
      }

      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'li',
        { className: '' + prefixCls },
        changeSelect,
        goInput
      );
    }
  }]);

  return Options;
}(__WEBPACK_IMPORTED_MODULE_4_react___default.a.Component);

Options.propTypes = {
  disabled: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  changeSize: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  quickGo: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  selectComponentClass: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  current: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.number,
  pageSizeOptions: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string),
  pageSize: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.number,
  buildOptionText: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  locale: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object,
  rootPrefixCls: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string,
  selectPrefixCls: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string,
  goButton: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool, __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.node])
};
Options.defaultProps = {
  pageSizeOptions: ['10', '20', '30', '40']
};


/* harmony default export */ __webpack_exports__["a"] = (Options);

/***/ }),

/***/ 1561:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  // Options.jsx
  items_per_page: '条/页',
  jump_to: '跳至',
  jump_to_confirm: '确定',
  page: '页',

  // Pagination.jsx
  prev_page: '上一页',
  next_page: '下一页',
  prev_5: '向前 5 页',
  next_5: '向后 5 页',
  prev_3: '向前 3 页',
  next_3: '向后 3 页'
});

/***/ }),

/***/ 1562:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1563);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(300)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 1563:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(299)(true);
// imports


// module
exports.push([module.i, ".rc-pagination{font-size:12px;font-family:Arial;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;padding:0}.rc-pagination>li{list-style:none}.rc-pagination-total-text{float:left;height:30px;line-height:30px;list-style:none;padding:0;margin:0 8px 0 0}.rc-pagination:after{content:\" \";display:block;height:0;clear:both;overflow:hidden;visibility:hidden}.rc-pagination-item{cursor:pointer;border-radius:6px;min-width:28px;height:28px;line-height:28px;text-align:center;list-style:none;float:left;border:1px solid #d9d9d9;background-color:#fff;margin-right:8px}.rc-pagination-item a{text-decoration:none;color:#666}.rc-pagination-item:hover{border-color:#2db7f5}.rc-pagination-item:hover a{color:#2db7f5}.rc-pagination-item-disabled{cursor:not-allowed}.rc-pagination-item-disabled:hover{border-color:#d9d9d9}.rc-pagination-item-disabled:hover a{color:#d9d9d9}.rc-pagination-item-active{background-color:#2db7f5;border-color:#2db7f5}.rc-pagination-item-active:hover a,.rc-pagination-item-active a{color:#fff}.rc-pagination-jump-next:after,.rc-pagination-jump-prev:after{content:\"\\2022\\2022\\2022\";display:block;letter-spacing:2px;color:#ccc;font-size:12px;margin-top:1px}.rc-pagination-jump-next:hover:after,.rc-pagination-jump-prev:hover:after{color:#2db7f5}.rc-pagination-jump-prev:hover:after{content:\"\\AB\"}.rc-pagination-jump-next:hover:after{content:\"\\BB\"}.rc-pagination-jump-next-custom-icon,.rc-pagination-jump-prev-custom-icon{position:relative}.rc-pagination-jump-next-custom-icon:after,.rc-pagination-jump-prev-custom-icon:after{position:absolute;top:0;right:0;bottom:0;left:0;margin:auto;-webkit-transition:all .2s;-o-transition:all .2s;transition:all .2s;content:\"\\2022\\2022\\2022\";opacity:1;display:block;letter-spacing:2px;color:#ccc;font-size:12px;margin-top:1px}.rc-pagination-jump-next-custom-icon .custom-icon-jump-next,.rc-pagination-jump-next-custom-icon .custom-icon-jump-prev,.rc-pagination-jump-prev-custom-icon .custom-icon-jump-next,.rc-pagination-jump-prev-custom-icon .custom-icon-jump-prev{opacity:0;-webkit-transition:all .2s;-o-transition:all .2s;transition:all .2s}.rc-pagination-jump-next-custom-icon:hover:after,.rc-pagination-jump-prev-custom-icon:hover:after{opacity:0;color:#ccc}.rc-pagination-jump-next-custom-icon:hover .custom-icon-jump-next,.rc-pagination-jump-next-custom-icon:hover .custom-icon-jump-prev,.rc-pagination-jump-prev-custom-icon:hover .custom-icon-jump-next,.rc-pagination-jump-prev-custom-icon:hover .custom-icon-jump-prev{opacity:1;color:#2db7f5}.rc-pagination-jump-next,.rc-pagination-jump-prev,.rc-pagination-prev{margin-right:8px}.rc-pagination-jump-next,.rc-pagination-jump-prev,.rc-pagination-next,.rc-pagination-prev{cursor:pointer;color:#666;font-size:10px;border-radius:6px;list-style:none;min-width:28px;height:28px;line-height:28px;float:left;text-align:center}.rc-pagination-prev a:after{content:\"\\2039\";display:block}.rc-pagination-next a:after{content:\"\\203A\";display:block}.rc-pagination-next,.rc-pagination-prev{border:1px solid #d9d9d9;font-size:18px}.rc-pagination-next a,.rc-pagination-prev a{color:#666}.rc-pagination-next a:after,.rc-pagination-prev a:after{margin-top:-1px}.rc-pagination-disabled{cursor:not-allowed}.rc-pagination-disabled a{color:#ccc}.rc-pagination-disabled .rc-pagination-item,.rc-pagination-disabled .rc-pagination-next,.rc-pagination-disabled .rc-pagination-prev{cursor:not-allowed}.rc-pagination-disabled .rc-pagination-item:hover,.rc-pagination-disabled .rc-pagination-next:hover,.rc-pagination-disabled .rc-pagination-prev:hover{border-color:#d9d9d9}.rc-pagination-disabled .rc-pagination-item:hover a,.rc-pagination-disabled .rc-pagination-next:hover a,.rc-pagination-disabled .rc-pagination-prev:hover a{color:#d9d9d9}.rc-pagination-disabled .rc-pagination-jump-next,.rc-pagination-disabled .rc-pagination-jump-prev{pointer-events:none}.rc-pagination-options{float:left;margin-left:15px}.rc-pagination-options-size-changer{float:left;width:80px}.rc-pagination-options-quick-jumper{float:left;margin-left:16px;height:28px;line-height:28px}.rc-pagination-options-quick-jumper input{margin:0 8px;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#fff;border-radius:6px;border:1px solid #d9d9d9;outline:none;padding:3px 12px;width:50px;height:28px}.rc-pagination-options-quick-jumper input:hover{border-color:#2db7f5}.rc-pagination-options-quick-jumper button{display:inline-block;margin:0 8px;font-weight:500;text-align:center;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid transparent;white-space:nowrap;padding:0 15px;font-size:12px;border-radius:6px;height:28px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transition:all .3s cubic-bezier(.645,.045,.355,1);-o-transition:all .3s cubic-bezier(.645,.045,.355,1);transition:all .3s cubic-bezier(.645,.045,.355,1);position:relative;color:rgba(0,0,0,.65);background-color:#fff;border-color:#d9d9d9}.rc-pagination-options-quick-jumper button:active,.rc-pagination-options-quick-jumper button:focus,.rc-pagination-options-quick-jumper button:hover{color:#2db7f5;background-color:#fff;border-color:#2db7f5}.rc-pagination-simple .rc-pagination-next,.rc-pagination-simple .rc-pagination-prev{border:none;height:24px;line-height:24px;margin:0;font-size:18px}.rc-pagination-simple .rc-pagination-simple-pager{float:left;margin-right:8px;list-style:none}.rc-pagination-simple .rc-pagination-simple-pager .rc-pagination-slash{margin:0 10px}.rc-pagination-simple .rc-pagination-simple-pager input{margin:0 8px;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#fff;border-radius:6px;border:1px solid #d9d9d9;outline:none;padding:5px 8px;min-height:20px}.rc-pagination-simple .rc-pagination-simple-pager input:hover{border-color:#2db7f5}.rc-pagination-simple .rc-pagination-simple-pager button{display:inline-block;margin:0 8px;font-weight:500;text-align:center;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid transparent;white-space:nowrap;padding:0 8px;font-size:12px;border-radius:6px;height:26px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transition:all .3s cubic-bezier(.645,.045,.355,1);-o-transition:all .3s cubic-bezier(.645,.045,.355,1);transition:all .3s cubic-bezier(.645,.045,.355,1);position:relative;color:rgba(0,0,0,.65);background-color:#fff;border-color:#d9d9d9}.rc-pagination-simple .rc-pagination-simple-pager button:active,.rc-pagination-simple .rc-pagination-simple-pager button:focus,.rc-pagination-simple .rc-pagination-simple-pager button:hover{color:#2db7f5;background-color:#fff;border-color:#2db7f5}@media only screen and (max-width:1024px){.rc-pagination-item-after-jump-prev,.rc-pagination-item-before-jump-next{display:none}}", "", {"version":3,"sources":["/Users/jasder/work/trustie3.0/forgeplus-react/node_modules/rc-pagination/assets/index.css"],"names":[],"mappings":"AAAA,eACE,eAAgB,AAChB,kBAAqB,AACrB,yBAA0B,AACvB,sBAAuB,AACtB,qBAAsB,AAClB,iBAAkB,AAC1B,SAAW,CACZ,AACD,kBACE,eAAiB,CAClB,AACD,0BACE,WAAY,AACZ,YAAa,AACb,iBAAkB,AAClB,gBAAiB,AACjB,UAAW,AACX,gBAAkB,CACnB,AACD,qBACE,YAAa,AACb,cAAe,AACf,SAAU,AACV,WAAY,AACZ,gBAAiB,AACjB,iBAAmB,CACpB,AACD,oBACE,eAAgB,AAChB,kBAAmB,AACnB,eAAgB,AAChB,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,gBAAiB,AACjB,WAAY,AACZ,yBAA0B,AAC1B,sBAAuB,AACvB,gBAAkB,CACnB,AACD,sBACE,qBAAsB,AACtB,UAAY,CACb,AACD,0BACE,oBAAsB,CACvB,AACD,4BACE,aAAe,CAChB,AACD,6BACE,kBAAoB,CACrB,AACD,mCACE,oBAAsB,CACvB,AACD,qCACE,aAAe,CAChB,AACD,2BACE,yBAA0B,AAC1B,oBAAsB,CACvB,AAID,gEACE,UAAY,CACb,AACD,8DAEE,0BAAe,AACf,cAAe,AACf,mBAAoB,AACpB,WAAY,AACZ,eAAgB,AAChB,cAAgB,CACjB,AACD,0EAEE,aAAe,CAChB,AACD,qCACE,aAAa,CACd,AACD,qCACE,aAAa,CACd,AACD,0EAEE,iBAAmB,CACpB,AACD,sFAEE,kBAAmB,AACnB,MAAO,AACP,QAAS,AACT,SAAU,AACV,OAAQ,AACR,YAAa,AACb,2BAA4B,AAC5B,sBAAuB,AACvB,mBAAoB,AACpB,0BAAe,AACf,UAAW,AACX,cAAe,AACf,mBAAoB,AACpB,WAAY,AACZ,eAAgB,AAChB,cAAgB,CACjB,AACD,gPAIE,UAAW,AACX,2BAA4B,AAC5B,sBAAuB,AACvB,kBAAoB,CACrB,AACD,kGAEE,UAAW,AACX,UAAY,CACb,AACD,wQAIE,UAAW,AACX,aAAe,CAChB,AACD,sEAGE,gBAAkB,CACnB,AACD,0FAIE,eAAgB,AAChB,WAAY,AACZ,eAAgB,AAChB,kBAAmB,AACnB,gBAAiB,AACjB,eAAgB,AAChB,YAAa,AACb,iBAAkB,AAClB,WAAY,AACZ,iBAAmB,CACpB,AACD,4BACE,gBAAa,AACb,aAAe,CAChB,AACD,4BACE,gBAAa,AACb,aAAe,CAChB,AACD,wCAEE,yBAA0B,AAC1B,cAAgB,CACjB,AACD,4CAEE,UAAY,CACb,AACD,wDAEE,eAAiB,CAClB,AACD,wBACE,kBAAoB,CACrB,AACD,0BACE,UAAY,CACb,AACD,oIAGE,kBAAoB,CACrB,AACD,sJAGE,oBAAsB,CACvB,AACD,4JAGE,aAAe,CAChB,AACD,kGAEE,mBAAqB,CACtB,AACD,uBACE,WAAY,AACZ,gBAAkB,CACnB,AACD,oCACE,WAAY,AACZ,UAAY,CACb,AACD,oCACE,WAAY,AACZ,iBAAkB,AAClB,YAAa,AACb,gBAAkB,CACnB,AACD,0CACE,aAAc,AACd,8BAA+B,AACvB,sBAAuB,AAC/B,sBAAuB,AACvB,kBAAmB,AACnB,yBAA0B,AAC1B,aAAc,AACd,iBAAkB,AAClB,WAAY,AACZ,WAAa,CACd,AACD,gDACE,oBAAsB,CACvB,AACD,2CACE,qBAAsB,AACtB,aAAc,AACd,gBAAiB,AACjB,kBAAmB,AACnB,8BAA+B,AAC3B,0BAA2B,AAC/B,eAAgB,AAChB,sBAAuB,AACvB,6BAA8B,AAC9B,mBAAoB,AACpB,eAAgB,AAChB,eAAgB,AAChB,kBAAmB,AACnB,YAAa,AACb,yBAA0B,AACvB,sBAAuB,AACtB,qBAAsB,AAClB,iBAAkB,AAC1B,0DAAkE,AAClE,qDAA6D,AAC7D,kDAA0D,AAC1D,kBAAmB,AACnB,sBAA2B,AAC3B,sBAAuB,AACvB,oBAAsB,CACvB,AACD,oJAGE,cAAe,AACf,sBAAuB,AACvB,oBAAsB,CACvB,AACD,oFAEE,YAAa,AACb,YAAa,AACb,iBAAkB,AAClB,SAAU,AACV,cAAgB,CACjB,AACD,kDACE,WAAY,AACZ,iBAAkB,AAClB,eAAiB,CAClB,AACD,uEACE,aAAe,CAChB,AACD,wDACE,aAAc,AACd,8BAA+B,AACvB,sBAAuB,AAC/B,sBAAuB,AACvB,kBAAmB,AACnB,yBAA0B,AAC1B,aAAc,AACd,gBAAiB,AACjB,eAAiB,CAClB,AACD,8DACE,oBAAsB,CACvB,AACD,yDACE,qBAAsB,AACtB,aAAc,AACd,gBAAiB,AACjB,kBAAmB,AACnB,8BAA+B,AAC3B,0BAA2B,AAC/B,eAAgB,AAChB,sBAAuB,AACvB,6BAA8B,AAC9B,mBAAoB,AACpB,cAAe,AACf,eAAgB,AAChB,kBAAmB,AACnB,YAAa,AACb,yBAA0B,AACvB,sBAAuB,AACtB,qBAAsB,AAClB,iBAAkB,AAC1B,0DAAkE,AAClE,qDAA6D,AAC7D,kDAA0D,AAC1D,kBAAmB,AACnB,sBAA2B,AAC3B,sBAAuB,AACvB,oBAAsB,CACvB,AACD,8LAGE,cAAe,AACf,sBAAuB,AACvB,oBAAsB,CACvB,AACD,0CACE,yEAEE,YAAc,CACf,CACF","file":"index.css","sourcesContent":[".rc-pagination {\n  font-size: 12px;\n  font-family: 'Arial';\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  padding: 0;\n}\n.rc-pagination > li {\n  list-style: none;\n}\n.rc-pagination-total-text {\n  float: left;\n  height: 30px;\n  line-height: 30px;\n  list-style: none;\n  padding: 0;\n  margin: 0 8px 0 0;\n}\n.rc-pagination:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  clear: both;\n  overflow: hidden;\n  visibility: hidden;\n}\n.rc-pagination-item {\n  cursor: pointer;\n  border-radius: 6px;\n  min-width: 28px;\n  height: 28px;\n  line-height: 28px;\n  text-align: center;\n  list-style: none;\n  float: left;\n  border: 1px solid #d9d9d9;\n  background-color: #fff;\n  margin-right: 8px;\n}\n.rc-pagination-item a {\n  text-decoration: none;\n  color: #666;\n}\n.rc-pagination-item:hover {\n  border-color: #2db7f5;\n}\n.rc-pagination-item:hover a {\n  color: #2db7f5;\n}\n.rc-pagination-item-disabled {\n  cursor: not-allowed;\n}\n.rc-pagination-item-disabled:hover {\n  border-color: #d9d9d9;\n}\n.rc-pagination-item-disabled:hover a {\n  color: #d9d9d9;\n}\n.rc-pagination-item-active {\n  background-color: #2db7f5;\n  border-color: #2db7f5;\n}\n.rc-pagination-item-active a {\n  color: #fff;\n}\n.rc-pagination-item-active:hover a {\n  color: #fff;\n}\n.rc-pagination-jump-prev:after,\n.rc-pagination-jump-next:after {\n  content: \"•••\";\n  display: block;\n  letter-spacing: 2px;\n  color: #ccc;\n  font-size: 12px;\n  margin-top: 1px;\n}\n.rc-pagination-jump-prev:hover:after,\n.rc-pagination-jump-next:hover:after {\n  color: #2db7f5;\n}\n.rc-pagination-jump-prev:hover:after {\n  content: \"«\";\n}\n.rc-pagination-jump-next:hover:after {\n  content: \"»\";\n}\n.rc-pagination-jump-prev-custom-icon,\n.rc-pagination-jump-next-custom-icon {\n  position: relative;\n}\n.rc-pagination-jump-prev-custom-icon:after,\n.rc-pagination-jump-next-custom-icon:after {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  -webkit-transition: all .2s;\n  -o-transition: all .2s;\n  transition: all .2s;\n  content: \"•••\";\n  opacity: 1;\n  display: block;\n  letter-spacing: 2px;\n  color: #ccc;\n  font-size: 12px;\n  margin-top: 1px;\n}\n.rc-pagination-jump-prev-custom-icon .custom-icon-jump-prev,\n.rc-pagination-jump-next-custom-icon .custom-icon-jump-prev,\n.rc-pagination-jump-prev-custom-icon .custom-icon-jump-next,\n.rc-pagination-jump-next-custom-icon .custom-icon-jump-next {\n  opacity: 0;\n  -webkit-transition: all .2s;\n  -o-transition: all .2s;\n  transition: all .2s;\n}\n.rc-pagination-jump-prev-custom-icon:hover:after,\n.rc-pagination-jump-next-custom-icon:hover:after {\n  opacity: 0;\n  color: #ccc;\n}\n.rc-pagination-jump-prev-custom-icon:hover .custom-icon-jump-prev,\n.rc-pagination-jump-next-custom-icon:hover .custom-icon-jump-prev,\n.rc-pagination-jump-prev-custom-icon:hover .custom-icon-jump-next,\n.rc-pagination-jump-next-custom-icon:hover .custom-icon-jump-next {\n  opacity: 1;\n  color: #2db7f5;\n}\n.rc-pagination-prev,\n.rc-pagination-jump-prev,\n.rc-pagination-jump-next {\n  margin-right: 8px;\n}\n.rc-pagination-prev,\n.rc-pagination-next,\n.rc-pagination-jump-prev,\n.rc-pagination-jump-next {\n  cursor: pointer;\n  color: #666;\n  font-size: 10px;\n  border-radius: 6px;\n  list-style: none;\n  min-width: 28px;\n  height: 28px;\n  line-height: 28px;\n  float: left;\n  text-align: center;\n}\n.rc-pagination-prev a:after {\n  content: \"‹\";\n  display: block;\n}\n.rc-pagination-next a:after {\n  content: \"›\";\n  display: block;\n}\n.rc-pagination-prev,\n.rc-pagination-next {\n  border: 1px solid #d9d9d9;\n  font-size: 18px;\n}\n.rc-pagination-prev a,\n.rc-pagination-next a {\n  color: #666;\n}\n.rc-pagination-prev a:after,\n.rc-pagination-next a:after {\n  margin-top: -1px;\n}\n.rc-pagination-disabled {\n  cursor: not-allowed;\n}\n.rc-pagination-disabled a {\n  color: #ccc;\n}\n.rc-pagination-disabled .rc-pagination-item,\n.rc-pagination-disabled .rc-pagination-prev,\n.rc-pagination-disabled .rc-pagination-next {\n  cursor: not-allowed;\n}\n.rc-pagination-disabled .rc-pagination-item:hover,\n.rc-pagination-disabled .rc-pagination-prev:hover,\n.rc-pagination-disabled .rc-pagination-next:hover {\n  border-color: #d9d9d9;\n}\n.rc-pagination-disabled .rc-pagination-item:hover a,\n.rc-pagination-disabled .rc-pagination-prev:hover a,\n.rc-pagination-disabled .rc-pagination-next:hover a {\n  color: #d9d9d9;\n}\n.rc-pagination-disabled .rc-pagination-jump-prev,\n.rc-pagination-disabled .rc-pagination-jump-next {\n  pointer-events: none;\n}\n.rc-pagination-options {\n  float: left;\n  margin-left: 15px;\n}\n.rc-pagination-options-size-changer {\n  float: left;\n  width: 80px;\n}\n.rc-pagination-options-quick-jumper {\n  float: left;\n  margin-left: 16px;\n  height: 28px;\n  line-height: 28px;\n}\n.rc-pagination-options-quick-jumper input {\n  margin: 0 8px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  background-color: #fff;\n  border-radius: 6px;\n  border: 1px solid #d9d9d9;\n  outline: none;\n  padding: 3px 12px;\n  width: 50px;\n  height: 28px;\n}\n.rc-pagination-options-quick-jumper input:hover {\n  border-color: #2db7f5;\n}\n.rc-pagination-options-quick-jumper button {\n  display: inline-block;\n  margin: 0 8px;\n  font-weight: 500;\n  text-align: center;\n  -ms-touch-action: manipulation;\n      touch-action: manipulation;\n  cursor: pointer;\n  background-image: none;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  padding: 0 15px;\n  font-size: 12px;\n  border-radius: 6px;\n  height: 28px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  -o-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  position: relative;\n  color: rgba(0, 0, 0, 0.65);\n  background-color: #fff;\n  border-color: #d9d9d9;\n}\n.rc-pagination-options-quick-jumper button:hover,\n.rc-pagination-options-quick-jumper button:active,\n.rc-pagination-options-quick-jumper button:focus {\n  color: #2db7f5;\n  background-color: #fff;\n  border-color: #2db7f5;\n}\n.rc-pagination-simple .rc-pagination-prev,\n.rc-pagination-simple .rc-pagination-next {\n  border: none;\n  height: 24px;\n  line-height: 24px;\n  margin: 0;\n  font-size: 18px;\n}\n.rc-pagination-simple .rc-pagination-simple-pager {\n  float: left;\n  margin-right: 8px;\n  list-style: none;\n}\n.rc-pagination-simple .rc-pagination-simple-pager .rc-pagination-slash {\n  margin: 0 10px;\n}\n.rc-pagination-simple .rc-pagination-simple-pager input {\n  margin: 0 8px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  background-color: #fff;\n  border-radius: 6px;\n  border: 1px solid #d9d9d9;\n  outline: none;\n  padding: 5px 8px;\n  min-height: 20px;\n}\n.rc-pagination-simple .rc-pagination-simple-pager input:hover {\n  border-color: #2db7f5;\n}\n.rc-pagination-simple .rc-pagination-simple-pager button {\n  display: inline-block;\n  margin: 0 8px;\n  font-weight: 500;\n  text-align: center;\n  -ms-touch-action: manipulation;\n      touch-action: manipulation;\n  cursor: pointer;\n  background-image: none;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  padding: 0 8px;\n  font-size: 12px;\n  border-radius: 6px;\n  height: 26px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  -o-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  position: relative;\n  color: rgba(0, 0, 0, 0.65);\n  background-color: #fff;\n  border-color: #d9d9d9;\n}\n.rc-pagination-simple .rc-pagination-simple-pager button:hover,\n.rc-pagination-simple .rc-pagination-simple-pager button:active,\n.rc-pagination-simple .rc-pagination-simple-pager button:focus {\n  color: #2db7f5;\n  background-color: #fff;\n  border-color: #2db7f5;\n}\n@media only screen and (max-width: 1024px) {\n  .rc-pagination-item-after-jump-prev,\n  .rc-pagination-item-before-jump-next {\n    display: none;\n  }\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1564:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(9));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(6));

var _getPrototypeOf = _interopRequireDefault(__webpack_require__(20));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(15));

var _createClass2 = _interopRequireDefault(__webpack_require__(16));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(21));

var _inherits2 = _interopRequireDefault(__webpack_require__(22));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(23));

var _react = _interopRequireDefault(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(1));

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _debounce = _interopRequireDefault(__webpack_require__(114));

var _reactEventListener = _interopRequireDefault(__webpack_require__(94));

var _withStyles = _interopRequireDefault(__webpack_require__(17));

var ROWS_HEIGHT = 19;
var styles = {
  root: {
    position: 'relative',
    // because the shadow has position: 'absolute',
    width: '100%'
  },
  textarea: {
    width: '100%',
    height: '100%',
    resize: 'none',
    font: 'inherit',
    padding: 0,
    cursor: 'inherit',
    boxSizing: 'border-box',
    lineHeight: 'inherit',
    border: 'none',
    outline: 'none',
    background: 'transparent'
  },
  shadow: {
    resize: 'none',
    // Overflow also needed to here to remove the extra row
    // added to textareas in Firefox.
    overflow: 'hidden',
    // Visibility needed to hide the extra text area on ipads
    visibility: 'hidden',
    position: 'absolute',
    height: 'auto',
    whiteSpace: 'pre-wrap'
  }
};
/**
 * @ignore - internal component.
 */

exports.styles = styles;

var Textarea =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Textarea, _React$Component);

  function Textarea(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, Textarea);
    _this = (0, _possibleConstructorReturn2.default)(this, (Textarea.__proto__ || (0, _getPrototypeOf.default)(Textarea)).call(this, props, context)); // <Input> expects the components it renders to respond to 'value'
    // so that it can check whether they are filled.

    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        height: null
      }
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "shadow", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "singlelineShadow", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "input", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "value", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleResize", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: (0, _debounce.default)(function () {
        _this.syncHeightWithShadow();
      }, 166)
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleRefInput", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(node) {
        _this.input = node;

        if (_this.props.textareaRef) {
          _this.props.textareaRef(node);
        }
      }
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleRefSinglelineShadow", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(node) {
        _this.singlelineShadow = node;
      }
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleRefShadow", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(node) {
        _this.shadow = node;
      }
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        _this.value = event.target.value;

        if (typeof _this.props.value === 'undefined' && _this.shadow) {
          // The component is not controlled, we need to update the shallow value.
          _this.shadow.value = _this.value;

          _this.syncHeightWithShadow();
        }

        if (_this.props.onChange) {
          _this.props.onChange(event);
        }
      }
    });
    _this.value = props.value || props.defaultValue || '';
    _this.state = {
      height: Number(props.rows) * ROWS_HEIGHT
    };
    return _this;
  }

  (0, _createClass2.default)(Textarea, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.syncHeightWithShadow();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.syncHeightWithShadow();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.handleResize.cancel();
    }
  }, {
    key: "syncHeightWithShadow",
    // Corresponds to 10 frames at 60 Hz.
    value: function syncHeightWithShadow() {
      var props = this.props;

      if (!this.shadow || !this.singlelineShadow) {
        return;
      } // The component is controlled, we need to update the shallow value.


      if (typeof props.value !== 'undefined') {
        this.shadow.value = props.value == null ? '' : String(props.value);
      }

      var lineHeight = this.singlelineShadow.scrollHeight;
      var newHeight = this.shadow.scrollHeight; // Guarding for jsdom, where scrollHeight isn't present.
      // See https://github.com/tmpvar/jsdom/issues/1013

      if (newHeight === undefined) {
        return;
      }

      if (Number(props.rowsMax) >= Number(props.rows)) {
        newHeight = Math.min(Number(props.rowsMax) * lineHeight, newHeight);
      }

      newHeight = Math.max(newHeight, lineHeight); // Need a large enough different to update the height.
      // This prevents infinite rendering loop.

      if (Math.abs(this.state.height - newHeight) > 1) {
        this.setState({
          height: newHeight
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          className = _props.className,
          defaultValue = _props.defaultValue,
          onChange = _props.onChange,
          rows = _props.rows,
          rowsMax = _props.rowsMax,
          textareaRef = _props.textareaRef,
          value = _props.value,
          other = (0, _objectWithoutProperties2.default)(_props, ["classes", "className", "defaultValue", "onChange", "rows", "rowsMax", "textareaRef", "value"]);
      return _react.default.createElement("div", {
        className: classes.root,
        style: {
          height: this.state.height
        }
      }, _react.default.createElement(_reactEventListener.default, {
        target: "window",
        onResize: this.handleResize
      }), _react.default.createElement("textarea", {
        ref: this.handleRefSinglelineShadow,
        className: (0, _classnames.default)(classes.shadow, classes.textarea),
        tabIndex: -1,
        rows: "1",
        readOnly: true,
        "aria-hidden": "true",
        value: ""
      }), _react.default.createElement("textarea", {
        ref: this.handleRefShadow,
        className: (0, _classnames.default)(classes.shadow, classes.textarea),
        tabIndex: -1,
        rows: rows,
        "aria-hidden": "true",
        readOnly: true,
        defaultValue: defaultValue,
        value: value
      }), _react.default.createElement("textarea", (0, _extends2.default)({
        rows: rows,
        className: (0, _classnames.default)(classes.textarea, className),
        defaultValue: defaultValue,
        value: value,
        onChange: this.handleChange,
        ref: this.handleRefInput
      }, other)));
    }
  }]);
  return Textarea;
}(_react.default.Component);

Textarea.propTypes =  false ? {
  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * @ignore
   */
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * @ignore
   */
  disabled: _propTypes.default.bool,

  /**
   * @ignore
   */
  onChange: _propTypes.default.func,

  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  rowsMax: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * Use that property to pass a ref callback to the native textarea element.
   */
  textareaRef: _propTypes.default.func,

  /**
   * @ignore
   */
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
} : {};
Textarea.defaultProps = {
  rows: 1
};

var _default = (0, _withStyles.default)(styles)(Textarea);

exports.default = _default;

/***/ }),

/***/ 1565:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(9));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(18));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(6));

var _react = _interopRequireDefault(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(1));

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _Typography = _interopRequireDefault(__webpack_require__(118));

var _withStyles = _interopRequireDefault(__webpack_require__(17));

var styles = function styles(theme) {
  return {
    root: {
      display: 'flex',
      maxHeight: '2em',
      alignItems: 'center'
    },
    positionStart: {
      marginRight: theme.spacing.unit
    },
    positionEnd: {
      marginLeft: theme.spacing.unit
    }
  };
};

exports.styles = styles;

function InputAdornment(props) {
  var _classNames;

  var children = props.children,
      Component = props.component,
      classes = props.classes,
      className = props.className,
      disableTypography = props.disableTypography,
      position = props.position,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "component", "classes", "className", "disableTypography", "position"]);
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classnames.default)(classes.root, (_classNames = {}, (0, _defineProperty2.default)(_classNames, classes.positionStart, position === 'start'), (0, _defineProperty2.default)(_classNames, classes.positionEnd, position === 'end'), _classNames), className)
  }, other), typeof children === 'string' && !disableTypography ? _react.default.createElement(_Typography.default, {
    color: "textSecondary"
  }, children) : children);
}

InputAdornment.propTypes =  false ? {
  /**
   * The content of the component, normally an `IconButton` or string.
   */
  children: _propTypes.default.node.isRequired,

  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),

  /**
   * If children is a string then disable wrapping in a Typography component.
   */
  disableTypography: _propTypes.default.bool,

  /**
   * The position this adornment should appear relative to the `Input`.
   */
  position: _propTypes.default.oneOf(['start', 'end'])
} : {};
InputAdornment.defaultProps = {
  component: 'div',
  disableTypography: false
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiInputAdornment'
})(InputAdornment);

exports.default = _default;

/***/ }),

/***/ 1566:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(9));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(18));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(6));

var _react = _interopRequireDefault(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(1));

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _withStyles = _interopRequireDefault(__webpack_require__(17));

var _Form = __webpack_require__(1386);

// @inheritedComponent FormLabel
var styles = function styles(theme) {
  return {
    root: {
      transformOrigin: 'top left'
    },
    formControl: {
      position: 'absolute',
      left: 0,
      top: 0,
      // slight alteration to spec spacing to match visual spec result
      transform: "translate(0, ".concat(theme.spacing.unit * 3, "px) scale(1)")
    },
    marginDense: {
      // Compensation for the `Input.inputDense` style.
      transform: "translate(0, ".concat(theme.spacing.unit * 2.5 + 1, "px) scale(1)")
    },
    shrink: {
      transform: 'translate(0, 1.5px) scale(0.75)',
      transformOrigin: 'top left'
    },
    animated: {
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut
      })
    }
  };
};

exports.styles = styles;

function InputLabel(props, context) {
  var _classNames;

  var children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      disableAnimation = props.disableAnimation,
      FormLabelClasses = props.FormLabelClasses,
      marginProp = props.margin,
      shrinkProp = props.shrink,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "classes", "className", "disableAnimation", "FormLabelClasses", "margin", "shrink"]);
  var muiFormControl = context.muiFormControl;
  var shrink = shrinkProp;

  if (typeof shrink === 'undefined' && muiFormControl) {
    shrink = muiFormControl.filled || muiFormControl.focused || muiFormControl.adornedStart;
  }

  var margin = marginProp;

  if (typeof margin === 'undefined' && muiFormControl) {
    margin = muiFormControl.margin;
  }

  var className = (0, _classnames.default)(classes.root, (_classNames = {}, (0, _defineProperty2.default)(_classNames, classes.formControl, muiFormControl), (0, _defineProperty2.default)(_classNames, classes.animated, !disableAnimation), (0, _defineProperty2.default)(_classNames, classes.shrink, shrink), (0, _defineProperty2.default)(_classNames, classes.marginDense, margin === 'dense'), _classNames), classNameProp);
  return _react.default.createElement(_Form.FormLabel, (0, _extends2.default)({
    "data-shrink": shrink,
    className: className,
    classes: FormLabelClasses
  }, other), children);
}

InputLabel.propTypes =  false ? {
  /**
   * The contents of the `InputLabel`.
   */
  children: _propTypes.default.node,

  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * If `true`, the transition animation is disabled.
   */
  disableAnimation: _propTypes.default.bool,

  /**
   * If `true`, apply disabled class.
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the label will be displayed in an error state.
   */
  error: _propTypes.default.bool,

  /**
   * If `true`, the input of this label is focused.
   */
  focused: _propTypes.default.bool,

  /**
   * `classes` property applied to the `FormLabel` element.
   */
  FormLabelClasses: _propTypes.default.object,

  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: _propTypes.default.oneOf(['dense']),

  /**
   * if `true`, the label will indicate that the input is required.
   */
  required: _propTypes.default.bool,

  /**
   * If `true`, the label is shrunk.
   */
  shrink: _propTypes.default.bool
} : {};
InputLabel.defaultProps = {
  disableAnimation: false
};
InputLabel.contextTypes = {
  muiFormControl: _propTypes.default.object
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiInputLabel'
})(InputLabel);

exports.default = _default;

/***/ }),

/***/ 1567:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(9));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(18));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(6));

var _react = _interopRequireDefault(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(1));

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _withStyles = _interopRequireDefault(__webpack_require__(17));

var styles = function styles(theme) {
  return {
    root: {
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.text.secondary,
      fontSize: theme.typography.pxToRem(16),
      lineHeight: 1,
      padding: 0,
      '&$focused': {
        color: theme.palette.primary[theme.palette.type === 'light' ? 'dark' : 'light']
      },
      '&$disabled': {
        color: theme.palette.text.disabled
      },
      '&$error': {
        color: theme.palette.error.main
      }
    },
    focused: {},
    disabled: {},
    error: {},
    asterisk: {
      '&$error': {
        color: theme.palette.error.main
      }
    }
  };
};

exports.styles = styles;

function FormLabel(props, context) {
  var _classNames;

  var children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      Component = props.component,
      disabledProp = props.disabled,
      errorProp = props.error,
      focusedProp = props.focused,
      requiredProp = props.required,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "classes", "className", "component", "disabled", "error", "focused", "required"]);
  var muiFormControl = context.muiFormControl;
  var required = requiredProp;
  var focused = focusedProp;
  var disabled = disabledProp;
  var error = errorProp;

  if (muiFormControl) {
    if (typeof required === 'undefined') {
      required = muiFormControl.required;
    }

    if (typeof focused === 'undefined') {
      focused = muiFormControl.focused;
    }

    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }

    if (typeof error === 'undefined') {
      error = muiFormControl.error;
    }
  }

  var className = (0, _classnames.default)(classes.root, (_classNames = {}, (0, _defineProperty2.default)(_classNames, classes.focused, focused), (0, _defineProperty2.default)(_classNames, classes.disabled, disabled), (0, _defineProperty2.default)(_classNames, classes.error, error), _classNames), classNameProp);
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: className
  }, other), children, required && _react.default.createElement("span", {
    className: (0, _classnames.default)(classes.asterisk, (0, _defineProperty2.default)({}, classes.error, error))
  }, "\u2009*"));
}

FormLabel.propTypes =  false ? {
  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),

  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the label should be displayed in an error state.
   */
  error: _propTypes.default.bool,

  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused: _propTypes.default.bool,

  /**
   * If `true`, the label will indicate that the input is required.
   */
  required: _propTypes.default.bool
} : {};
FormLabel.defaultProps = {
  component: 'label'
};
FormLabel.contextTypes = {
  muiFormControl: _propTypes.default.object
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiFormLabel'
})(FormLabel);

exports.default = _default;

/***/ }),

/***/ 1568:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(9));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(18));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(6));

var _getPrototypeOf = _interopRequireDefault(__webpack_require__(20));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(15));

var _createClass2 = _interopRequireDefault(__webpack_require__(16));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(21));

var _inherits2 = _interopRequireDefault(__webpack_require__(22));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(23));

var _react = _interopRequireDefault(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(1));

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _withStyles = _interopRequireDefault(__webpack_require__(17));

var _Input = __webpack_require__(1393);

var _helpers = __webpack_require__(79);

var _reactHelpers = __webpack_require__(342);

var styles = function styles(theme) {
  return {
    root: {
      display: 'inline-flex',
      flexDirection: 'column',
      position: 'relative',
      // Reset fieldset default style
      minWidth: 0,
      padding: 0,
      margin: 0,
      border: 0
    },
    marginNormal: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit
    },
    marginDense: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit / 2
    },
    fullWidth: {
      width: '100%'
    }
  };
};
/**
 * Provides context such as filled/focused/error/required for form inputs.
 * Relying on the context provides high flexibilty and ensures that the state always stay
 * consitent across the children of the `FormControl`.
 * This context is used by the following components:
 *  - FormLabel
 *  - FormHelperText
 *  - Input
 *  - InputLabel
 */


exports.styles = styles;

var FormControl =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(FormControl, _React$Component);

  function FormControl(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, FormControl);
    _this = (0, _possibleConstructorReturn2.default)(this, (FormControl.__proto__ || (0, _getPrototypeOf.default)(FormControl)).call(this, props, context)); // We need to iterate through the children and find the Input in order
    // to fully support server side rendering.

    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        adornedStart: false,
        filled: false,
        focused: false
      }
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleFocus", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        if (_this.props.onFocus) {
          _this.props.onFocus(event);
        }

        _this.setState(function (state) {
          return !state.focused ? {
            focused: true
          } : null;
        });
      }
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleBlur", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        // The event might be undefined.
        // For instance, a child component might call this hook
        // when an input is disabled but still having the focus.
        if (_this.props.onBlur && event) {
          _this.props.onBlur(event);
        }

        _this.setState(function (state) {
          return state.focused ? {
            focused: false
          } : null;
        });
      }
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleDirty", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (!_this.state.filled) {
          _this.setState({
            filled: true
          });
        }
      }
    });
    Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleClean", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (_this.state.filled) {
          _this.setState({
            filled: false
          });
        }
      }
    });
    var children = _this.props.children;

    if (children) {
      _react.default.Children.forEach(children, function (child) {
        if (!(0, _reactHelpers.isMuiElement)(child, ['Input', 'Select'])) {
          return;
        }

        if ((0, _Input.isFilled)(child.props, true)) {
          _this.state.filled = true;
        }

        var input = (0, _reactHelpers.isMuiElement)(child, ['Select']) ? child.props.input : child;

        if (input && (0, _Input.isAdornedStart)(input.props)) {
          _this.state.adornedStart = true;
        }
      });
    }

    return _this;
  }

  (0, _createClass2.default)(FormControl, [{
    key: "getChildContext",
    value: function getChildContext() {
      var _props = this.props,
          disabled = _props.disabled,
          error = _props.error,
          required = _props.required,
          margin = _props.margin;
      var _state = this.state,
          adornedStart = _state.adornedStart,
          filled = _state.filled,
          focused = _state.focused;
      return {
        muiFormControl: {
          adornedStart: adornedStart,
          disabled: disabled,
          error: error,
          filled: filled,
          focused: focused,
          margin: margin,
          onBlur: this.handleBlur,
          onEmpty: this.handleClean,
          onFilled: this.handleDirty,
          onFocus: this.handleFocus,
          required: required
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var _props2 = this.props,
          classes = _props2.classes,
          className = _props2.className,
          Component = _props2.component,
          disabled = _props2.disabled,
          error = _props2.error,
          fullWidth = _props2.fullWidth,
          margin = _props2.margin,
          required = _props2.required,
          other = (0, _objectWithoutProperties2.default)(_props2, ["classes", "className", "component", "disabled", "error", "fullWidth", "margin", "required"]);
      return _react.default.createElement(Component, (0, _extends2.default)({
        className: (0, _classnames.default)(classes.root, (_classNames = {}, (0, _defineProperty2.default)(_classNames, classes["margin".concat((0, _helpers.capitalize)(margin))], margin !== 'none'), (0, _defineProperty2.default)(_classNames, classes.fullWidth, fullWidth), _classNames), className)
      }, other, {
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      }));
    }
  }]);
  return FormControl;
}(_react.default.Component);

FormControl.propTypes =  false ? {
  /**
   * The contents of the form control.
   */
  children: _propTypes.default.node,

  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),

  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the label should be displayed in an error state.
   */
  error: _propTypes.default.bool,

  /**
   * If `true`, the component will take up the full width of its container.
   */
  fullWidth: _propTypes.default.bool,

  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   */
  margin: _propTypes.default.oneOf(['none', 'dense', 'normal']),

  /**
   * @ignore
   */
  onBlur: _propTypes.default.func,

  /**
   * @ignore
   */
  onFocus: _propTypes.default.func,

  /**
   * If `true`, the label will indicate that the input is required.
   */
  required: _propTypes.default.bool
} : {};
FormControl.defaultProps = {
  component: 'div',
  disabled: false,
  error: false,
  fullWidth: false,
  margin: 'none',
  required: false
};
FormControl.childContextTypes = {
  muiFormControl: _propTypes.default.object
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiFormControl'
})(FormControl);

exports.default = _default;

/***/ }),

/***/ 1569:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(9));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(18));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(6));

var _react = _interopRequireDefault(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(1));

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _withStyles = _interopRequireDefault(__webpack_require__(17));

var styles = function styles(theme) {
  return {
    root: {
      color: theme.palette.text.secondary,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(12),
      textAlign: 'left',
      marginTop: theme.spacing.unit,
      lineHeight: '1em',
      minHeight: '1em',
      margin: 0,
      '&$error': {
        color: theme.palette.error.main
      },
      '&$disabled': {
        color: theme.palette.text.disabled
      }
    },
    error: {},
    disabled: {},
    marginDense: {
      marginTop: theme.spacing.unit / 2
    }
  };
};

exports.styles = styles;

function FormHelperText(props, context) {
  var _classNames;

  var classes = props.classes,
      classNameProp = props.className,
      disabledProp = props.disabled,
      errorProp = props.error,
      marginProp = props.margin,
      Component = props.component,
      other = (0, _objectWithoutProperties2.default)(props, ["classes", "className", "disabled", "error", "margin", "component"]);
  var muiFormControl = context.muiFormControl;
  var disabled = disabledProp;
  var error = errorProp;
  var margin = marginProp;

  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }

    if (typeof error === 'undefined') {
      error = muiFormControl.error;
    }

    if (typeof margin === 'undefined') {
      margin = muiFormControl.margin;
    }
  }

  var className = (0, _classnames.default)(classes.root, (_classNames = {}, (0, _defineProperty2.default)(_classNames, classes.disabled, disabled), (0, _defineProperty2.default)(_classNames, classes.error, error), (0, _defineProperty2.default)(_classNames, classes.marginDense, margin === 'dense'), _classNames), classNameProp);
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: className
  }, other));
}

FormHelperText.propTypes =  false ? {
  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),

  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error: _propTypes.default.bool,

  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: _propTypes.default.oneOf(['dense'])
} : {};
FormHelperText.defaultProps = {
  component: 'p'
};
FormHelperText.contextTypes = {
  muiFormControl: _propTypes.default.object
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiFormHelperText'
})(FormHelperText);

exports.default = _default;

/***/ }),

/***/ 1570:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(9));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(18));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(6));

var _react = _interopRequireDefault(__webpack_require__(0));

var _propTypes = _interopRequireDefault(__webpack_require__(1));

var _classnames = _interopRequireDefault(__webpack_require__(3));

var _withStyles = _interopRequireDefault(__webpack_require__(17));

var _Typography = _interopRequireDefault(__webpack_require__(118));

/* eslint-disable jsx-a11y/label-has-for */
var styles = function styles(theme) {
  return {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer',
      // For correct alignment with the text.
      verticalAlign: 'middle',
      // Remove grey highlight
      WebkitTapHighlightColor: 'transparent',
      marginLeft: -14,
      marginRight: theme.spacing.unit * 2,
      // used for row presentation of radio/checkbox
      '&$disabled': {
        cursor: 'default'
      }
    },
    disabled: {},
    label: {
      '&$disabled': {
        color: theme.palette.text.disabled
      }
    }
  };
};
/**
 * Drop in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */


exports.styles = styles;

function FormControlLabel(props, context) {
  var checked = props.checked,
      classes = props.classes,
      classNameProp = props.className,
      control = props.control,
      disabledProp = props.disabled,
      inputRef = props.inputRef,
      label = props.label,
      name = props.name,
      onChange = props.onChange,
      value = props.value,
      other = (0, _objectWithoutProperties2.default)(props, ["checked", "classes", "className", "control", "disabled", "inputRef", "label", "name", "onChange", "value"]);
  var muiFormControl = context.muiFormControl;
  var disabled = disabledProp;

  if (typeof control.props.disabled !== 'undefined') {
    if (typeof disabled === 'undefined') {
      disabled = control.props.disabled;
    }
  }

  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
  }

  var className = (0, _classnames.default)(classes.root, (0, _defineProperty2.default)({}, classes.disabled, disabled), classNameProp);
  return _react.default.createElement("label", (0, _extends2.default)({
    className: className
  }, other), _react.default.cloneElement(control, {
    disabled: disabled,
    checked: typeof control.props.checked === 'undefined' ? checked : control.props.checked,
    name: control.props.name || name,
    onChange: control.props.onChange || onChange,
    value: control.props.value || value,
    inputRef: control.props.inputRef || inputRef
  }), _react.default.createElement(_Typography.default, {
    component: "span",
    className: (0, _classnames.default)(classes.label, (0, _defineProperty2.default)({}, classes.disabled, disabled))
  }, label));
}

FormControlLabel.propTypes =  false ? {
  /**
   * If `true`, the component appears selected.
   */
  checked: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string]),

  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * A control element. For instance, it can be be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: _propTypes.default.element,

  /**
   * If `true`, the control will be disabled.
   */
  disabled: _propTypes.default.bool,

  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: _propTypes.default.func,

  /**
   * The text to be used in an enclosing label element.
   */
  label: _propTypes.default.node,

  /*
   * @ignore
   */
  name: _propTypes.default.string,

  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.checked`.
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange: _propTypes.default.func,

  /**
   * The value of the component.
   */
  value: _propTypes.default.string
} : {};
FormControlLabel.contextTypes = {
  muiFormControl: _propTypes.default.object
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiFormControlLabel'
})(FormControlLabel);

exports.default = _default;

/***/ }),

/***/ 1571:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var $=window.$;var _origin=window.location.origin;var CommentItemKEEditor=function(_Component){_inherits(CommentItemKEEditor,_Component);function CommentItemKEEditor(){var _ref;var _temp,_this,_ret;_classCallCheck(this,CommentItemKEEditor);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=CommentItemKEEditor.__proto__||Object.getPrototypeOf(CommentItemKEEditor)).call.apply(_ref,[this].concat(args))),_this),_this.showOrHideEditor=function(comment){var user=_this.props.user;console.log('initReply ',comment);var $=window.$;var id=comment.id;var reply_message_el='#reply_message_'+id;var reply_iconup_el='#reply_iconup_'+id;if($(reply_message_el).html()==""){$(".reply_to_message").html("");$(reply_message_el).html('<div className="orig_reply_box borderBottomNone reply_to_message" id="reply_to_message_'+id+'">\n      <div class="homepagePostReplyPortrait mr15 imageFuzzy fl" id="reply_image_'+id+'"><a href="'+user.user_url+'" target="_blank" alt="\u7528\u6237\u5934\u50CF"><img alt="0?1442652658" height="33" src="'+_origin+'/images/'+user.image_url+'" width="33" /></a></div>\n      <div class="orig_textarea fl" style="margin-bottom: 0px">\n        <div nhname=\'new_message_'+id+'\'>\n              <form accept-charset="UTF-8" action="/discusses?challenge_id=118&amp;dis_id=61&amp;dis_type=Shixun" data-remote="true" id="new_comment_form" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="HJTbMpfI8LKUpwghfkvgB2SaMmcIVyVdAezyKmzJ7FU=" /></div>\n                  <input type="hidden" id="dis_reply_id" name="reply_id" value="'+id+'">\n                  <div nhname=\'toolbar_container_'+id+'\'></div>\n                  <textarea placeholder="\u6709\u95EE\u9898\u6216\u6709\u5EFA\u8BAE\uFF0C\u8BF7\u76F4\u63A5\u7ED9\u6211\u7559\u8A00\u5427\uFF01" id="comment_news_'+id+'" style="display: none" nhname=\'new_message_textarea_'+id+'\' name="content"></textarea>\n                  <a id="new_message_submit_btn_'+id+'" href="javascript:void(0)" onclick="this.style.display=\'none\'" class="mt10 task-btn task-btn-orange fr">\u53D1\u9001</a>\n                  <div class="cl"></div>\n                  <p nhname=\'contentmsg_'+id+'\'></p>\n</form>        </div>\n        <div class="cl"></div>\n      </div>\n  <div class="cl"></div>\n</div>\n');//" ide语法识别
$(reply_iconup_el).show();$(function(){window.sd_create_editor_from_data(id,null,"100%","Discuss");});}else{if($(reply_message_el).is(':visible')){$(reply_message_el).hide();}else{$(reply_message_el).show();}// $(reply_message_el).html("");
// $(reply_iconup_el).hide();
}// 自动focus
setTimeout(function(){var iframe=$('#reply_to_message_'+id).find('iframe')[0];iframe&&iframe.contentDocument.body.focus();},200);},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(CommentItemKEEditor,[{key:'componentDidUpdate',value:function componentDidUpdate(prevProps){var _props=this.props,item=_props.item,currentReplyComment=_props.currentReplyComment;if(prevProps.showReplyEditorFlag!=this.props.showReplyEditorFlag&&currentReplyComment&&currentReplyComment.id==item.id){this.showOrHideEditor(currentReplyComment);}}// 如果未初始化，会先初始化
},{key:'render',value:function render(){var _props2=this.props,match=_props2.match,history=_props2.history,item=_props2.item,user=_props2.user;if(!item){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',null);}return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'cl'}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{id:'reply_message_'+item.id,className:'reply_to_message'}));}}]);return CommentItemKEEditor;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (CommentItemKEEditor);

/***/ }),

/***/ 1572:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__CommentItemMDEditor_css__ = __webpack_require__(1573);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__CommentItemMDEditor_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__CommentItemMDEditor_css__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var $=window.$;var _origin=window.location.origin;var CommentItemMDEditor=function(_Component){_inherits(CommentItemMDEditor,_Component);function CommentItemMDEditor(){var _ref;var _temp,_this,_ret;_classCallCheck(this,CommentItemMDEditor);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=CommentItemMDEditor.__proto__||Object.getPrototypeOf(CommentItemMDEditor)).call.apply(_ref,[this].concat(args))),_this),_this.showOrHideEditor=function(comment){var user=_this.props.user;console.log('initReply ',comment);var $=window.$;var commentId=comment.id;var reply_message_el='#reply_message_'+commentId;var initMD_ID='reply_message_editorMd_'+commentId;var view_selector='.commentItemMDEditorView_'+commentId;var commitBtnSelector='#commitBtn_'+commentId;if($('#'+initMD_ID+' textarea').length===1){// 没有初始化
var placeholder='我要回复...';// const imageUrl = `/upload_with_markdown?container_id=${commentId}&container_type=Memo`;
var imageUrl=''+Object(__WEBPACK_IMPORTED_MODULE_5_educoder__["R" /* getUploadActionUrl */])();var otherOptions={watch:false,htmlDecode:"style,script,iframe",// you can filter tags decode
// taskList: true,
mode:'markdown',toolbar:true,markdown:'',readOnly:false,// preview: false,
tex:true,// 数学公式
flowChart:false,// 默认不解析
sequenceDiagram:false,// 默认不解析
dialogLockScreen:false};var commentMDEditor=window.create_editorMD_4comment(''+initMD_ID,'',120,placeholder,imageUrl,function(){// onload callback
commentMDEditor.cm.focus();window.initMDEditorDragResize(".editor__resize",commentMDEditor,{initHeight:120});},otherOptions);commentMDEditor.state.preview=false;_this.commentMDEditor=commentMDEditor;$('.commentItemMDEditorView').hide();$(view_selector).show();}else{// 初始化了，显示隐藏切换
if($(reply_message_el).is(':visible')){$(view_selector).hide();}else{$('.commentItemMDEditorView').hide();$(view_selector).show();window._currentChildcommentMDEditor&&window._currentChildcommentMDEditor.resize();// 自动focus
setTimeout(function(){_this.commentMDEditor&&_this.commentMDEditor.cm&&_this.commentMDEditor.cm.focus();_this.commentMDEditor.resize();// 解决切换显示、隐藏多次后出现的样式错乱的问题
},200);}}window._currentChildcommentMDEditor=_this.commentMDEditor;// tpi resize 的时候需要做调用editor.resize
},_this.onCommit=function(){window.$(document).trigger("onReply",{commentContent:_this.commentMDEditor.getValue(),id:_this.props.item.id,editor:_this.commentMDEditor});},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(CommentItemMDEditor,[{key:'componentDidUpdate',value:function componentDidUpdate(prevProps){var _props=this.props,item=_props.item,currentReplyComment=_props.currentReplyComment;if(prevProps.showReplyEditorFlag!=this.props.showReplyEditorFlag&&currentReplyComment&&currentReplyComment.id==item.id){this.showOrHideEditor(currentReplyComment);}}// 如果未初始化，会先初始化
},{key:'render',value:function render(){var _props2=this.props,match=_props2.match,history=_props2.history,item=_props2.item,user=_props2.user,buttonText=_props2.buttonText;if(!item){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',null);}return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'commentItemMDEditorView commentItemMDEditorView_'+item.id,style:{display:'none'}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'homepagePostReplyPortrait mr15 fl imageFuzzy',id:'reply_image_3097',style:{marginTop:'2px',marginRight:'-20px'}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a',{href:''+user.user_url,target:'_blank',alt:'\u7528\u6237\u5934\u50CF'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img',{alt:'0?1442652658',height:'33',src:'/images/'+user.image_url,width:'33'}))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{id:'reply_message_'+item.id,className:'reply_to_message commentItemMDEditor editormd-image-click-expand',style:{paddingTop:'0px',paddingBottom:'0px',marginTop:'36px'}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{id:'reply_message_editorMd_'+item.id,className:'editorMD',style:{marginBottom:'0px'}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('textarea',{style:{'display':'none'}})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'editor__resize',href:'javascript:void(0);',style:{display:''}},'\u8C03\u6574\u9AD8\u5EA6'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{'class':'clearfix'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a',_defineProperty({id:'commitBtn_'+item.id,href:'javascript:void(0)',onClick:this.onCommit,style:{marginRight:'44px'},className:'commentsbtn task-btn task-btn-blue  fr '},'style',{display:''}),buttonText||'发送'))));}}]);return CommentItemMDEditor;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (CommentItemMDEditor);// style={{ margin: '10px 44px', marginBottom: '0px'}}

/***/ }),

/***/ 1573:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1574);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(300)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 1574:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(299)(true);
// imports


// module
exports.push([module.i, ".reply_to_message .editorMD .editormd-toolbar li{padding:0}.reply_to_message .editorMD .editormd-toolbar,.reply_to_message .editorMD .editormd-toolbar .editormd-toolbar-container{min-height:28px}.reply_to_message .editorMD .editormd-toolbar i{margin-left:0}.reply_to_message .editorMD .editormd-preview{top:30px}.reply_to_message .editorMD .CodeMirror{margin-top:30px;height:90px}.panel-comment_item .editor__resize{-webkit-transform:translateX(-2%);-ms-transform:translateX(-2%);transform:translateX(-2%);position:absolute;width:120px;height:4px;left:54%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);margin-top:2px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;cursor:row-resize;text-indent:110%;white-space:nowrap;overflow:hidden;text-transform:capitalize;-webkit-box-sizing:border-box;box-sizing:border-box}a.commentsbtn.task-btn-blue{background:#4cacff!important}.commentTab a.commentsbtn.task-btn-blue{margin-right:22px;margin-top:6px}.editormd-grid-table-row a.editormd-emoji-btn.selected{border-bottom:2px solid #4cacff!important}", "", {"version":3,"sources":["/Users/jasder/work/trustie3.0/forgeplus-react/src/modules/comment/CommentItemMDEditor.css"],"names":[],"mappings":"AACA,iDACC,SAAW,CACX,AAKD,wHACC,eAAiB,CACjB,AACD,gDACC,aAAiB,CACjB,AAGD,8CACC,QAAU,CACV,AACD,wCACC,gBAAiB,AACjB,WAAa,CACb,AAED,oCACC,kCAAmC,AAC/B,8BAA+B,AAC3B,0BAA2B,AAEnC,kBAAmB,AACnB,YAAa,AACb,WAAY,AACZ,SAAU,AACV,mCAAoC,AAChC,+BAAgC,AAC5B,2BAA4B,AACpC,eAAgB,AAChB,0BAA2B,AAC3B,6BAA8B,AAC9B,kBAAmB,AACnB,iBAAkB,AAClB,mBAAoB,AACpB,gBAAiB,AACjB,0BAA2B,AAE3B,8BAA+B,AAEvB,qBAAuB,CAC/B,AAGD,4BACC,4BAA+B,CAC/B,AAED,wCACC,kBAAmB,AAChB,cAAgB,CACnB,AAGD,uDACC,yCAA2C,CAC3C","file":"CommentItemMDEditor.css","sourcesContent":["/*md编辑器 将toolbar高度变小变袖珍*/\r\n.reply_to_message .editorMD .editormd-toolbar li {\r\n\tpadding: 0;\r\n}\r\n.reply_to_message .editorMD .editormd-toolbar {\r\n\tmin-height: 28px;\r\n\r\n}\r\n.reply_to_message .editorMD .editormd-toolbar .editormd-toolbar-container {\r\n\tmin-height: 28px;\r\n}\r\n.reply_to_message .editorMD .editormd-toolbar i {\r\n\tmargin-left: 0px;\r\n}\r\n\r\n\r\n.reply_to_message .editorMD .editormd-preview {\r\n\ttop: 30px;\r\n}\r\n.reply_to_message .editorMD .CodeMirror {\r\n\tmargin-top: 30px;\r\n\theight: 90px;\r\n}\r\n\r\n.panel-comment_item .editor__resize {\r\n\t-webkit-transform: translateX(-2%);\r\n\t    -ms-transform: translateX(-2%);\r\n\t        transform: translateX(-2%);\r\n\r\n\tposition: absolute;\r\n\twidth: 120px;\r\n\theight: 4px;\r\n\tleft: 54%;\r\n\t-webkit-transform: translateX(-50%);\r\n\t    -ms-transform: translateX(-50%);\r\n\t        transform: translateX(-50%);\r\n\tmargin-top: 2px;\r\n\tborder-top: 1px solid #ccc;\r\n\tborder-bottom: 1px solid #ccc;\r\n\tcursor: row-resize;\r\n\ttext-indent: 110%;\r\n\twhite-space: nowrap;\r\n\toverflow: hidden;\r\n\ttext-transform: capitalize;\r\n\t\r\n\t-webkit-box-sizing: border-box;\r\n\t\r\n\t        box-sizing: border-box;\r\n}\r\n\r\n/*帖子回復按鈕*/\r\na.commentsbtn.task-btn-blue {\r\n\tbackground: #4CACFF !important;\r\n}\r\n\r\n.commentTab a.commentsbtn.task-btn-blue {\r\n\tmargin-right: 22px;\r\n    margin-top: 6px;\r\n}\r\n\r\n\r\n.editormd-grid-table-row a.editormd-emoji-btn.selected {\r\n\tborder-bottom: 2px solid #4CACFF!important;\r\n}"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1597:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(299)(true);
// imports


// module
exports.push([module.i, ".educontent{margin-bottom:20px}#forum_index_list{min-height:400px;position:relative}#forum_index_list .forum_table .forum_table_item{background:#fff}.noMemosTip{position:absolute;right:10px;top:58px;z-index:999}#forum_list{background:#f9f9f9}#forum_list .return_btn{line-height:38px;font-size:14px;cursor:pointer}#forum_list .return_btn.no_mr{margin-right:-24px!important}div#forum_list>div{background:#fff}.memoContent img{max-width:815px}.memoReplies{position:relative;margin-top:8px}.memoReplies .-fit{position:static}.replies_count{margin-left:12px}.replies_count .label{color:#666}.replies_count .count{color:#999;margin-left:10px}.memoMore{padding-top:10px;height:50px;line-height:50px;text-align:center;color:#459be6;cursor:pointer;position:relative}.memoMore .writeCommentBtn{position:absolute;right:0;color:#666;top:15px}.memoMore .writeCommentBtn:hover{color:#4dacff}.panel-comment_item .comment_orig_content{width:705px}.iconfont.icon-xiazai{font-size:22px!important;margin-right:6px}.forum_table_item{padding-left:20px}.forum_table_item .btn-top{border-radius:11px;padding:0 6px;background:#ff4343}.edu-position-hide{position:absolute;top:15px;left:-20px;-webkit-box-shadow:0 2px 8px rgba(146,153,169,.5);box-shadow:0 2px 8px rgba(146,153,169,.5);background:#fff;z-index:1001;padding:5px 0;z-index:999999}.edu-position-hide li a:hover{background:#4cacff;color:#fff}.edu-position-hidebox>a:link{color:#4cacff}.edu-position-hidebox:hover .edu-position-hide{display:block}.edu-position-hide li a{display:inline-block;height:30px;width:100px;line-height:30px;text-align:center;font-size:12px!important}.ui-widget-header{border:1px solid #4cacff;background:#4cacff}.iconfont.icon-fujian{color:#29bd8b}.ecSelect{width:300px}.ecSelect .rc-select-selection{height:40px}.ecSelect .rc-select-search--inline .rc-select-search__field{padding-top:6px}.ecSelect .rc-select-arrow,.ecSelect .rc-select-selection--single .rc-select-selection-selected-value,.ecSelect .rc-select-selection__placeholder{top:6px}.defalutCancelbtn{cursor:pointer}.defalutSubmitbtnysl{display:block;border:1px solid #4cacff;background-color:#4cacff;color:#fff!important;width:120px;text-align:center;line-height:40px;border-radius:2px;width:130px;height:40px;background:#4cacff;border-radius:4px;font-size:16px;font-family:MicrosoftYaHei;font-weight:400;color:#fff}#attachments_fields{margin-left:-77px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}#memoMD.show_content_grey{padding:0}#attachments_fields div.ui-progressbar{width:120px;height:10px;margin:2px 0 -2px 8px;display:inline-block}.ui-progressbar-value.ui-widget-header{border:1px solid #4cacff;background:#4cacff}.publishMemoSection{padding-bottom:0!important}.advertisement{margin-top:10px;height:155px}.advertisement img{width:100%}.returnBtn{font-size:16px;color:#999;float:right;margin-right:50px;position:relative;bottom:12px}", "", {"version":3,"sources":["/Users/jasder/work/trustie3.0/forgeplus-react/src/modules/forums/Post.css"],"names":[],"mappings":"AACA,YACC,kBAAoB,CACpB,AAGD,kBACC,iBAAkB,AAClB,iBAAmB,CACnB,AACA,iDACC,eAAiB,CACjB,AACD,YACC,kBAAmB,AAChB,WAAY,AACZ,SAAU,AACV,WAAa,CAChB,AACF,YACC,kBAAoB,CACpB,AACA,wBACC,iBAAkB,AAEf,eAAgB,AAChB,cAAgB,CACnB,AACD,8BACC,4BAA+B,CAC/B,AACD,mBACI,eAAiB,CACpB,AACF,iBACC,eAAiB,CACjB,AACD,aACC,kBAAmB,AACnB,cAAgB,CAChB,AACA,mBACC,eAAiB,CACjB,AACD,eACC,gBAAkB,CAClB,AACD,sBACC,UAAe,CACf,AACD,sBACC,WAAe,AACf,gBAAkB,CAClB,AAED,UACC,iBAAkB,AAClB,YAAa,AACV,iBAAkB,AAClB,kBAAmB,AACnB,cAA0B,AAC1B,eAAgB,AAChB,iBAAmB,CACtB,AACA,2BACI,kBAAmB,AACnB,QAAW,AACX,WAAe,AACf,QAAU,CACb,AACD,iCACC,aAAe,CACf,AAEH,0CACC,WAAa,CACb,AAED,sBACI,yBAA0B,AAC1B,gBAAkB,CACrB,AAID,kBACC,iBAAmB,CACnB,AAEA,2BACC,mBAAoB,AACjB,cAAiB,AACjB,kBAAoB,CAEvB,AAGF,mBACI,kBAAmB,AACnB,SAAU,AACV,WAAY,AACZ,kDAAyD,AACjD,0CAAiD,AACzD,gBAAiB,AACjB,aAAc,AACd,cAAe,AACf,cAAgB,CACnB,AACA,8BACC,mBAAoB,AACjB,UAAY,CACf,AACF,6BACC,aAAe,CACf,AACA,+CACI,aAAe,CAClB,AACD,wBACI,qBAAsB,AACtB,YAAa,AACb,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,wBAA0B,CAC7B,AAYF,kBACC,yBAA0B,AACvB,kBAAoB,CACvB,AACD,sBACC,aAAc,CACd,AAGD,UACC,WAAa,CACb,AACD,+BACC,WAAa,CACb,AACA,6DACC,eAAiB,CACjB,AAMD,kJACC,OAAS,CACT,AACF,kBACC,cAAgB,CAChB,AACD,qBACC,cAAe,yBAA0B,yBAA0B,qBAAsB,YAAa,kBAAmB,iBAAkB,kBAAmB,AAC9J,YAAa,AACb,YAAa,AACb,mBAA+B,AAC/B,kBAAmB,AACnB,eAAgB,AAChB,2BAA4B,AAC5B,gBAAiB,AACjB,UAA2B,CAC3B,AACD,oBACC,kBAAmB,AAChB,oBAAqB,AACrB,aAAc,AACd,0BAA2B,AACvB,qBAAuB,CAC9B,AAID,0BACC,SAAW,CACX,AAID,uCACC,YAAa,AACV,YAAa,AACb,sBAAuB,AACvB,oBAAsB,CACzB,AACD,uCACC,yBAA0B,AACvB,kBAAoB,CACvB,AAKD,oBACC,0BAA+B,CAC/B,AACD,eACC,gBAAiB,AACjB,YAAc,CACd,AACD,mBACC,UAAY,CACZ,AAGD,WACC,eAAe,AACf,WAA0B,AAC1B,YAAa,AACV,kBAAmB,AACnB,kBAAmB,AACnB,WAAa,CAChB","file":"Post.css","sourcesContent":["/*MemoDetail     --------------------------------- START */\n.educontent {\n\tmargin-bottom: 20px;\t\n}\n\n/* 左侧区域最小高度*/\n#forum_index_list {\n\tmin-height: 400px;\n\tposition: relative;\n}\n\t#forum_index_list .forum_table .forum_table_item {\n\t\tbackground: #fff;\n\t}\n\t.noMemosTip {\n\t\tposition: absolute;\n\t    right: 10px;\n\t    top: 58px;\n\t    z-index: 999;\n\t}\n#forum_list {\n\tbackground: #f9f9f9;\n}\n\t#forum_list .return_btn {\n\t\tline-height: 38px;\n\t    /* margin-right: 15px; */\n\t    font-size: 14px;\n\t    cursor: pointer;\n\t}\n\t#forum_list .return_btn.no_mr {\n\t\tmargin-right: -24px !important;\n\t}\n\tdiv#forum_list>div {\n\t    background: #fff;\n\t}\n.memoContent img {\n\tmax-width: 815px;\n}\n.memoReplies {\n\tposition: relative;\n\tmargin-top: 8px;\n}\n\t.memoReplies .-fit {\n\t\tposition: static;\n\t}\n\t.replies_count {\n\t\tmargin-left: 12px;\n\t}\n\t.replies_count .label {\n\t\tcolor: #666666;\n\t}\n\t.replies_count .count {\n\t\tcolor: #999999;\n\t\tmargin-left: 10px;\n\t}\n\n\t.memoMore {\n\t\tpadding-top: 10px;\n\t\theight: 50px;\n\t    line-height: 50px;\n\t    text-align: center;\n\t    color: rgba(69,155,230,1);\n\t    cursor: pointer;\n\t    position: relative;\n\t}\n\t\t.memoMore .writeCommentBtn{\n\t\t    position: absolute;\n\t\t    right: 0px;\n\t\t    color: #666666;\n\t\t    top: 15px;\n\t\t}\n\t\t.memoMore .writeCommentBtn:hover {\n\t\t\tcolor: #4DACFF;\n\t\t}\n/*使用md編輯器用为子回复时，宽度会变*/\n.panel-comment_item .comment_orig_content {\n\twidth: 705px;\n}\n\n.iconfont.icon-xiazai {\n    font-size: 22px!important;\n    margin-right: 6px;\n}\n/* MemoDetail     --------------------------------- END */\n\n/* PostItem     --------------------------------- START */\n.forum_table_item {\n\tpadding-left: 20px;\n}\n\t/* 置顶 */\n\t.forum_table_item .btn-top {\n\t\tborder-radius: 11px;\n\t    padding: 0px 6px;\n\t    background: #FF4343;\n\n\t}\n\n/* 管理员操作 */\n.edu-position-hide {\n    position: absolute;\n    top: 15px;\n    left: -20px;\n    -webkit-box-shadow: 0px 2px 8px rgba(146, 153, 169, 0.5);\n            box-shadow: 0px 2px 8px rgba(146, 153, 169, 0.5);\n    background: #fff;\n    z-index: 1001;\n    padding: 5px 0;\n    z-index: 999999;\n}\n\t.edu-position-hide li a:hover {\n\t\tbackground: #4CACFF;\n    \tcolor: #fff;\n\t}\n.edu-position-hidebox>a:link{\n\tcolor: #4CACFF;\n}\n\t.edu-position-hidebox:hover .edu-position-hide {\n\t    display: block;\n\t}\n\t.edu-position-hide li a {\n\t    display: inline-block;\n\t    height: 30px;\n\t    width: 100px;\n\t    line-height: 30px;\n\t    text-align: center;\n\t    font-size: 12px!important;\n\t}\n/* PostItem     --------------------------------- END */\n\n\n/* MemoNew     --------------------------------- START */\n\n#attachments_fields div.ui-progressbar { \n\twidth: 120px;\n    height: 10px;\n    margin: 2px 0 -2px 8px;\n    display: inline-block;\n}\n.ui-widget-header {\n\tborder: 1px solid #4CACFF;\n    background: #4CACFF;\n}\n.iconfont.icon-fujian {\n\tcolor: #29BD8B\n}\n\n/* rc-select样式覆写*/\n.ecSelect {\n\twidth: 300px;\n}\n.ecSelect .rc-select-selection {\n\theight: 40px;\n}\t\n\t.ecSelect .rc-select-search--inline .rc-select-search__field {\n\t\tpadding-top: 6px;\n\t}\n\t.ecSelect .rc-select-selection--single .rc-select-selection-selected-value \n\t\t, .ecSelect .rc-select-selection__placeholder {\n    \ttop: 6px;\n\n\t}\n\t.ecSelect .rc-select-arrow {\n\t\ttop: 6px;\n\t}\n.defalutCancelbtn  {\n\tcursor: pointer;\n}\n.defalutSubmitbtnysl{\n\tdisplay: block;border: 1px solid #4CACFF;background-color: #4CACFF;color: #fff!important;width: 120px;text-align: center;line-height: 40px;border-radius: 2px;\n\twidth: 130px;\n\theight: 40px;\n\tbackground: rgba(76,172,255,1);\n\tborder-radius: 4px;\n\tfont-size: 16px;\n\tfont-family: MicrosoftYaHei;\n\tfont-weight: 400;\n\tcolor: rgba(255,255,255,1);\n}\n#attachments_fields {\n\tmargin-left: -77px;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n        flex-direction: column;\n}\n.uploadBtn {\n\t/* margin-left: 46px; */\n}\n#memoMD.show_content_grey {\n\tpadding: 0;\n}\n.newForm .attachments_fields {\n\t/*margin-left: -39px !important*/\n}\n#attachments_fields div.ui-progressbar { \n\twidth: 120px;\n    height: 10px;\n    margin: 2px 0 -2px 8px;\n    display: inline-block;\n}\n.ui-progressbar-value.ui-widget-header {\n\tborder: 1px solid #4CACFF;\n    background: #4CACFF;\n}\n/* MemoNew     --------------------------------- END */\n\n\n/*RightMyPublish*/\n.publishMemoSection {\n\tpadding-bottom: 0px !important;\n}\n.advertisement {\n\tmargin-top: 10px;\n\theight: 155px;\n}\n.advertisement img{\n\twidth: 100%;\n}\n\n/* MyPublish*/\n.returnBtn {\n\tfont-size:16px;\n\tcolor:rgba(153,153,153,1);\n\tfloat: right;\n    margin-right: 50px;\n    position: relative;\n    bottom: 12px;\n}"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1607:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1639);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(300)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 1639:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(299)(true);
// imports


// module
exports.push([module.i, ".course-message .commentsbtn{margin-top:10px}.course-message .memoReplies{margin-top:0!important}.course-message .panel-comment_item .comment_orig_content{width:1040px}.course-message .panel-comment_item .editor__resize{left:47%}.course-message .childrenCommentsView .comment_item_cont:first-child{border-top:1px solid #e3e3e3;margin-top:8px}.course-message .comment_item_cont:last-child{border-bottom:none}.course-message .appraise.comment_item_cont:last-child{padding-bottom:0}.course-message .memoMore{background:transparent!important}.course-message .memoMore .writeCommentBtn{right:35px;top:2px}.panel-comment_item .comment_content{margin-top:4px}.commentstypetop{position:relative}.commentstypebutton{position:absolute;right:0}", "", {"version":3,"sources":["/Users/jasder/work/trustie3.0/forgeplus-react/src/modules/courses/common/courseMessage.css"],"names":[],"mappings":"AAIA,6BACE,eAAiB,CAClB,AAED,6BACE,sBAA2B,CAC5B,AAID,0DAEE,YAAc,CACf,AAeD,oDACE,QAAU,CACX,AACD,qEACE,6BAA8B,AAC9B,cAAgB,CACjB,AACD,8CACE,kBAAoB,CACrB,AACD,uDAEE,gBAAoB,CACrB,AAED,0BACE,gCAAmC,CAEpC,AACC,2CACE,WAAY,AACZ,OAAS,CACV,AAEH,qCACE,cAAgB,CACjB,AAED,iBACE,iBAAmB,CACpB,AACD,oBACE,kBAAmB,AACnB,OAAW,CACZ","file":"courseMessage.css","sourcesContent":[".course-message .commentInput {\r\n  /* padding-bottom: 60px !important; */\r\n}\r\n\r\n.course-message .commentsbtn {\r\n  margin-top: 10px;\r\n}\r\n\r\n.course-message .memoReplies {\r\n  margin-top: 0px !important;\r\n}\r\n\r\n/* 评论 */\r\n/* 改宽度 */\r\n.course-message .panel-comment_item .comment_orig_content {\r\n  /* width: 1024px; */\r\n  width: 1040px;\r\n}\r\n/* 子回复按钮 */\r\n.course-message .reply_to_message a.commentsbtn.task-btn-blue {\r\n  /* margin-right: 50px; */\r\n}\r\n/* 改边距 */\r\n/* .course-message .commentsDelegateParent {\r\n  padding-left: 100px;\r\n} */\r\n\r\n#forum_list .return_btn.no_mr {\r\n  /* margin-right: 15px */\r\n}\r\n\r\n/* md编辑器拖拽调整 */\r\n.course-message .panel-comment_item .editor__resize {\r\n  left: 47%;\r\n}\r\n.course-message .childrenCommentsView .comment_item_cont:first-child {\r\n  border-top: 1px solid #e3e3e3;\r\n  margin-top: 8px;\r\n}\r\n.course-message .comment_item_cont:last-child {\r\n  border-bottom: none;\r\n}\r\n.course-message .appraise.comment_item_cont:last-child {\r\n  /* 作品评阅需要 */\r\n  padding-bottom: 0px;\r\n}\r\n\r\n.course-message .memoMore {\r\n  background: transparent !important;\r\n  /* margin-top: 20px; */\r\n}\r\n  .course-message .memoMore .writeCommentBtn {\r\n    right: 35px;\r\n    top: 2px;\r\n  }\r\n\r\n.panel-comment_item .comment_content {\r\n  margin-top: 4px;\r\n}\r\n\r\n.commentstypetop{\r\n  position: relative;\r\n}\r\n.commentstypebutton{\r\n  position: absolute;\r\n  right: 0px;\r\n}"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1708:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__MemoDetailEditor_css__ = __webpack_require__(1709);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__MemoDetailEditor_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__MemoDetailEditor_css__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}__webpack_require__(340);var $=window.$;var MemoDetailMDEditor=function(_Component){_inherits(MemoDetailMDEditor,_Component);function MemoDetailMDEditor(props){_classCallCheck(this,MemoDetailMDEditor);var _this=_possibleConstructorReturn(this,(MemoDetailMDEditor.__proto__||Object.getPrototypeOf(MemoDetailMDEditor)).call(this,props));_this.initMDEditor=function(){// 因为props.memo不存在时，本组件不会被加载，这里直接在didMount里初始化即可
var placeholder='我要回复...';// const imageUrl = `/upload_with_markdown?container_id=${this.props.memo.id}&container_type=Memo`;
var imageUrl=''+Object(__WEBPACK_IMPORTED_MODULE_5_educoder__["R" /* getUploadActionUrl */])();if(_this.isMDInited){return;}_this.isMDInited=true;// 执行太快了，样式不正常
window.__tt=400;setTimeout(function(){console.log('create_editorMD_4comment');var commentMDEditor=window.create_editorMD_4comment("memo_comment_editorMd",'',_this.props.height||240,placeholder,imageUrl,function(){// commentMDEditor.focus()
_this.initDrag();commentMDEditor.cm.on("change",function(_cm,changeObj){_this.setState({isError:false,errorMsg:''});});// commentMDEditor.cm.focus()
},{watch:false,dialogLockScreen:false});_this.commentMDEditor=commentMDEditor;window.commentMDEditor=commentMDEditor;},window.__tt);};_this.initDrag=function(){window.initMDEditorDragResize(".editor__resize",_this.commentMDEditor);};_this.onCommit=function(){if(_this.props.checkIfLogin()===false){_this.props.showLoginDialog();return;}if(_this.props.checkIfProfileCompleted()===false){_this.props.showaccountprofileDialog();return;}var content=_this.commentMDEditor.getValue();// this.props.showError ==
if(_this.props.showError==true){if(!content||content.trim()==""){_this.setState({isError:true,errorMsg:'不能为空'});return;}else if(content.length>2000){_this.setState({isError:true,errorMsg:'不能超过2000个字符'});return;}_this.setState({isError:false,errorMsg:''});}if(_this.props.replyComment){_this.props.replyComment(content,_this.props.memo.id,_this.commentMDEditor);}else{window.$(document).trigger("onReply",{commentContent:content,id:_this.props.memo.id,editor:_this.commentMDEditor});}};_this.close=function(){_this.setState({isInited:false});};_this.onMockInputClick=function(){_this.setState({isInited:true});if(!_this.isMDInited){_this.initMDEditor();}else{setTimeout(function(){_this.commentMDEditor&&_this.commentMDEditor.cm.focus();},10);}};_this.state={isInited:_this.props.usingMockInput?false:true,isError:false,errorMsg:''};return _this;}_createClass(MemoDetailMDEditor,[{key:'componentDidUpdate',value:function componentDidUpdate(prevProps,prevState,snapshot){if(this.props.memo&&(!prevProps.memo||this.props.memo.id!=prevProps.memo.id)){// this.keEditor = window.sd_create_editor_from_data(this.props.memo.id, null, "100%", "Memo");
//          window._kk = this.keEditor
}}},{key:'componentDidMount',value:function componentDidMount(){!this.props.usingMockInput&&this.initMDEditor();}},{key:'showEditor',value:function showEditor(){var _this2=this;$("html, body").animate({scrollTop:$('.commentInput:visible').offset().top-100},1000,function(){if(_this2.commentMDEditor){_this2.commentMDEditor.cm.focus();}else{_this2.onMockInputClick();}});}},{key:'render',value:function render(){var _props=this.props,match=_props.match,history=_props.history,memo=_props.memo,placeholder=_props.placeholder,className=_props.className,imageExpand=_props.imageExpand;var _state=this.state,isInited=_state.isInited,errorMsg=_state.errorMsg;if(!memo){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',null);}return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Fragment,null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('style',null,'\n\t\t\t\t\t\t.mockInputWrapper {\n\t\t\t\t\t\t\tdisplay: flex;\n\t\t\t\t\t\t\tpadding: 20px 30px 20px 30px;\n\t\t\t\t\t\t\tborder-bottom: 1px solid #EEEEEE;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t.mockInputWrapper input {\n\t\t\t\t\t\t\tflex:1;\n\t\t\t\t\t\t\tpadding-left: 10px;\n\t\t\t\t\t\t\theight: 40px;\n\t\t\t\t\t\t\tbackground: rgb(246,246,246);\n\t\t\t\t\t\t\tmargin-right: 20px;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t.mockInputWrapper a.commentsbtn {\n\t\t\t\t\t\t\theight: 40px;\n\t\t\t\t\t\t\tdisplay: inline-block;\n\t\t\t\t\t\t\tmargin-top: 0px !important;\n\t\t\t\t\t\t\tvertical-align: text-top;\n\t\t\t\t\t\t\tpadding-top: 6px;\n\t\t\t\t\t\t\twidth: 60px;\n\t\t\t\t\t\t\tmargin-right: 0px !important;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t.commentInput {\n\t\t\t\t\t\t}\n\t\t\t\t\t\t.commentInput .editormd{\n\t\t\t\t\t\t\twidth:100%!important;\n\t\t\t\t\t\t}\n\t\t\t\t\t'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{style:{display:isInited?'none':'',borderBottom:''+(this.props.commentsLength==0?'none':'1px solid #EEEEEE')},className:'mockInputWrapper commentInput '+className},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input',{onClick:this.onMockInputClick,placeholder:placeholder||'我要回复'}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a',{href:'javascript:void(0)',onClick:this.onMockInputClick,className:'commentsbtn task-btn task-btn-blue'},this.props.buttonText||'发送')),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('style',null),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{nhname:'new_message_'+memo.id,className:'commentInput  commentInputs '+className+' '+(imageExpand&&'editormd-image-click-expand'),style:{padding:'30px',boxSizing:"border-box",display:isInited?'':'none',paddingBottom:'40px'}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{id:'memo_comment_editorMd',className:'editorMD',style:{marginBottom:'0px',border:errorMsg?'1px solid red':'1px solid #ddd'}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('textarea',{style:{'display':'none'}})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'editor__resize',href:'javascript:void(0);'},'\u8C03\u6574\u9AD8\u5EA6'),errorMsg&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'fl',style:{color:'red',marginTop:'6px',marginLeft:'4px'}},errorMsg),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{style:{height:"16px"}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a',{id:'new_message_submit_btn_'+memo.id,href:'javascript:void(0)',onClick:this.onCommit,className:'commentsbtn task-btn task-btn-blue fr'},this.props.buttonText||'发送'))));}}]);return MemoDetailMDEditor;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (MemoDetailMDEditor);

/***/ }),

/***/ 1709:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1710);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(300)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 1710:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(299)(true);
// imports


// module
exports.push([module.i, ".editorMD li,.editorMD ol,.editorMD ul{list-style-type:decimal}.editor__resize{position:absolute;width:120px;height:4px;left:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);margin-top:2px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;cursor:row-resize;text-indent:110%;white-space:nowrap;overflow:hidden;text-transform:capitalize;-webkit-box-sizing:border-box;box-sizing:border-box}", "", {"version":3,"sources":["/Users/jasder/work/trustie3.0/forgeplus-react/src/modules/forums/MemoDetailEditor.css"],"names":[],"mappings":"AACA,uCACC,uBAAyB,CACzB,AAGD,gBACC,kBAAmB,AACnB,YAAa,AACb,WAAY,AACZ,SAAU,AACV,mCAAoC,AAChC,+BAAgC,AAC5B,2BAA4B,AACpC,eAAgB,AAChB,0BAA2B,AAC3B,6BAA8B,AAC9B,kBAAmB,AACnB,iBAAkB,AAClB,mBAAoB,AACpB,gBAAiB,AACjB,0BAA2B,AAE3B,8BAA+B,AAEvB,qBAAuB,CAE/B","file":"MemoDetailEditor.css","sourcesContent":["\r\n.editorMD ol, .editorMD ul, .editorMD li {\r\n\tlist-style-type: decimal;\r\n}\r\n\r\n/*md编辑器 resizeBar*/\r\n.editor__resize {\r\n\tposition: absolute;\r\n\twidth: 120px;\r\n\theight: 4px;\r\n\tleft: 50%;\r\n\t-webkit-transform: translateX(-50%);\r\n\t    -ms-transform: translateX(-50%);\r\n\t        transform: translateX(-50%);\r\n\tmargin-top: 2px;\r\n\tborder-top: 1px solid #ccc;\r\n\tborder-bottom: 1px solid #ccc;\r\n\tcursor: row-resize;\r\n\ttext-indent: 110%;\r\n\twhite-space: nowrap;\r\n\toverflow: hidden;\r\n\ttext-transform: capitalize;\r\n\t\r\n\t-webkit-box-sizing: border-box;\r\n\t\r\n\t        box-sizing: border-box;\r\n\t/*transform: translateX(-22%);*/\r\n}\r\n\r\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1711:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1712);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(300)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),

/***/ 1712:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(299)(true);
// imports


// module
exports.push([module.i, ".searchFor .searchCon{width:215px}.search-new{width:237px!important}.search-new,.search-newysl{height:30px;margin-bottom:30px}.search-newyslw{width:237px!important}.search-new-input{padding-left:16px;height:30px}.search-span{border-radius:17px}.search-new img{right:10px}.HotLabelList a{display:block;float:left;padding:0 9px;height:28px;line-height:28px;border-radius:14px;background-color:#f5f5f5;color:#666;margin-right:10px;margin-bottom:9px}.HotLabelList a.selected{background:#4cacff;color:#fff}.hotQuestionItem{padding:20px 0;border-bottom:1px solid #eee}.questiontName{max-width:100%;display:block}.user_default_btn{width:114px}.userPrivateName{line-height:25px;margin-bottom:9px}.userPrivatePost{line-height:20px}.noteDetailTitle{line-height:38px;font-size:24px;font-weight:400;text-align:justify}.noteDetailNum{float:left;padding:0 12px;position:relative;color:#999!important;height:28px;line-height:26px}.noteDetailNum.rightline:after{position:absolute;content:\"\";right:0;width:1px;background-color:#eaeaea;height:8px;top:10px}.noteDetailPoint{width:100px;height:70px;background-color:#4cacff;border-radius:35px;color:#fff;text-align:center;margin:0 auto;-webkit-box-sizing:border-box;box-sizing:border-box;padding:2px 0;cursor:pointer;line-height:22px;padding-top:12px}.Pointed{background-color:#f0f0f0;color:#b3b3b3;cursor:default}.notefileDownload{height:25px;line-height:22px}", "", {"version":3,"sources":["/Users/jasder/work/trustie3.0/forgeplus-react/src/modules/forums/RightSection.css"],"names":[],"mappings":"AACA,sBACC,WAAa,CACb,AAED,YACI,qBAAsB,CAIzB,AACD,2BAJC,YAAa,AACV,kBAAoB,CAOvB,AACD,gBACC,qBAAsB,CACtB,AACA,kBACC,kBAAmB,AACnB,WAAa,CACb,AACD,aACC,kBAAoB,CACpB,AAEF,gBACC,UAAY,CACZ,AAID,gBAAgB,cAAe,WAAY,cAAiB,YAAa,iBAAkB,mBAAoB,yBAA0B,WAAY,kBAAmB,iBAAmB,CAAC,AAC5L,yBACC,mBAAoB,AACjB,UAAY,CACf,AAKD,iBAAiB,eAAiB,4BAA8B,CAAC,AACjE,eAAe,eAAgB,aAAe,CAAC,AAK/C,kBAAmB,WAAa,CAAC,AACjC,iBAAiB,iBAAkB,iBAAmB,CAAC,AACvD,iBAAiB,gBAAkB,CAAC,AACpC,iBAAiB,iBAAkB,eAAgB,gBAAoB,kBAAkB,CAAE,AAE3F,eAAe,WAAY,eAAiB,kBAAmB,qBAAsB,YAAa,gBAAkB,CAAC,AACrH,+BAA+B,kBAAmB,WAAY,QAAW,UAAW,yBAA0B,WAAY,QAAS,CAAC,AAGpI,iBAAiB,YAAa,YAAa,yBAA0B,mBAAoB,WAAe,kBAAmB,cAAiB,8BAA+B,sBAAuB,cAAiB,eAAgB,AAAI,iBAAkB,AACrP,gBAAkB,CAAC,AACvB,SAAS,yBAAyB,cAAe,AAAC,cAAe,CAAC,AAClE,kBAAkB,YAAa,gBAAkB,CAAC","file":"RightSection.css","sourcesContent":["/* 右侧搜索区域*/\n.searchFor .searchCon {\n\twidth: 215px;\n}\n\n.search-new {\n    width:237px!important;\n\theight: 30px;\n    margin-bottom: 30px;\n    /*margin-right: 35px;*/\n}\n.search-newysl {\n\n\theight: 30px;\n\tmargin-bottom: 30px;\n}\n.search-newyslw{\n\twidth:237px!important;\n}\n\t.search-new-input {\n\t\tpadding-left: 16px;\n\t\theight: 30px;\n\t}\n\t.search-span {\n\t\tborder-radius: 17px;\n\t}\n\n.search-new img {\n\tright: 10px;\n}\n\n\n/* 右侧 热门标签 */\n.HotLabelList a{display: block;float: left;padding: 0px 9px;height: 28px;line-height: 28px;border-radius: 14px;background-color: #f5f5f5;color: #666;margin-right: 10px;margin-bottom: 9px;}\n.HotLabelList a.selected {\n\tbackground: #4CACFF;\n    color: #fff;\n}\n\n\n\n/* 右侧 热门问题 */\n.hotQuestionItem{padding:20px 0px;border-bottom: 1px solid #eee;}\n.questiontName{max-width: 100%;display: block;}\n\n\n\n/* 用户信息-UserSection*/\n.user_default_btn {width: 114px;}\n.userPrivateName{line-height: 25px;margin-bottom: 9px;}\n.userPrivatePost{line-height: 20px;}\n.noteDetailTitle{line-height: 38px;font-size: 24px;font-weight: normal;text-align:justify }\n\n.noteDetailNum{float: left;padding:0px 12px;position: relative;color: #999!important;height: 28px;line-height: 26px;}\n.noteDetailNum.rightline:after{position: absolute;content: '';right: 0px;width: 1px;background-color: #EAEAEA;height: 8px;top:10px;}\n\n/*帖子详情点赞*/\n.noteDetailPoint{width: 100px;height: 70px;background-color: #4cacff;border-radius: 35px;color: #FFFFff;text-align: center;margin: 0px auto;-webkit-box-sizing: border-box;box-sizing: border-box;padding: 2px 0px;cursor: pointer;    line-height: 22px;\n    padding-top: 12px;}\n.Pointed{background-color:#f0f0f0;color: #b3b3b3; cursor: default}\n.notefileDownload{height: 25px;line-height: 22px;}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1737:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _findById;
/* harmony export (immutable) */ __webpack_exports__["e"] = generateComments;
/* harmony export (immutable) */ __webpack_exports__["d"] = generateChildComments;
/* harmony export (immutable) */ __webpack_exports__["g"] = handleContentBeforeCreateNew;
/* harmony export (immutable) */ __webpack_exports__["b"] = addNewComment;
/* unused harmony export NEED_TO_WRITE_CONTENT */
/* harmony export (immutable) */ __webpack_exports__["h"] = handleContentBeforeCreateSecondLevelComment;
/* harmony export (immutable) */ __webpack_exports__["c"] = addSecondLevelComment;
/* harmony export (immutable) */ __webpack_exports__["i"] = handleDeleteComment;
/* harmony export (immutable) */ __webpack_exports__["f"] = handleCommentPraise;
/* harmony export (immutable) */ __webpack_exports__["j"] = handleHiddenComment;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutability_helper__ = __webpack_require__(1167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutability_helper__);
var transformReplies=function transformReplies(replies,transformFunction){return replies.map(function(reply){return transformFunction(reply);});};// const _findById = (id, arg_comments) => {
//   const comments = arg_comments;
//   for(let i = 0; i < comments.length; i++) {
//     if (id === comments[i].id) {
//       return i;
//     }
//   }
// }
function _findById(id,arg_comments){var comments=arg_comments;for(var i=0;i<comments.length;i++){if(id===comments[i].id){return i;}}}function generateComments(comments,transformFunction,childrenName){var newChildrenName=childrenName||'children';var newComments=comments.map(function(item){var children=[];if(item[newChildrenName]){children=transformReplies(item[newChildrenName],transformFunction);}return transformFunction(item,children);});return newComments;}function generateChildComments(childrenComments,parentComments,parentComment,transformFunction){var childComments=childrenComments.map(function(item){var children=[];return transformFunction(item,children);});var oldComments=parentComments;var commentIndex=_findById(parentComment.id,oldComments);var comment=oldComments[commentIndex];comment.children=childComments;comment.isAllChildrenLoaded=true;oldComments[commentIndex]=comment;return oldComments;}function handleContentBeforeCreateNew(argContent){var content=argContent;if(content!=undefined){content=content.replace(/(\n<p>\n\t<br \/>\n<\/p>)*$/g,'');var beforeImage=content.split("<img");var afterImage=content.split("/>");if(beforeImage[0]==""&&afterImage[1]==""){window.notice_box('不支持纯图片评论<br/>请在评论中增加文字信息');return;}}return content;}function addNewComment(comments,_id,content,user,isSuperAdmin,parentComponent){if(!comments){comments=[];}comments.unshift({"can_delete":true,"admin":parentComponent?parentComponent.props.isAdmin():user.admin,isSuperAdmin:isSuperAdmin,"content":content,"image_url":user.image_url,"username":user.username,"user_login":user.login,"id":_id,"reward":null,"hidden":0,"user_praise":false,"time":"1分钟前","praise_count":0,"user_id":user.user_id});return comments;}var NEED_TO_WRITE_CONTENT="必须填写内容！";function handleContentBeforeCreateSecondLevelComment(argContent){if(argContent){return argContent.replace(/(\n<p>\n\t<br \/>\n<\/p>)*$/g,'').trim();}return argContent;}function addSecondLevelComment(parentComments,parentComment,commentIndex,newId,commentContent,user,editor){if(!parentComment.children){parentComment.children=[];}parentComment.children.push({"can_delete":true,"content":commentContent,"image_url":user.image_url,"username":user.username,"user_login":user.login,"id":newId,"time":"1分钟前","praise_count":0,"user_id":user.id});parentComments[commentIndex]=parentComment;// md
if(editor.setValue){editor.setValue('');var $=window.$;var view_selector='.commentItemMDEditorView_'+parentComment.id;$(view_selector).hide();}return parentComments;}// 公共接口
function handleDeleteComment(that,parrentComment,childCommentId,objectType){var deleteCommentId=parrentComment.id;if(childCommentId){deleteCommentId=childCommentId;}var url='/commons/delete.json';var comments=that.state.comments;__WEBPACK_IMPORTED_MODULE_0_axios___default.a.delete(url,{data:{object_id:deleteCommentId,object_type:objectType}}).then(function(response){if(response.data&&response.data.status===0){var commentIndex=that._findById(parrentComment.id,comments);// https://stackoverflow.com/questions/29527385/removing-element-from-array-in-component-state
if(!childCommentId){that.setState(function(prevState){return{comments:__WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(prevState.comments,{$splice:[[commentIndex,1]]})};});}else{var childCommentIndex=that._findById(childCommentId,comments[commentIndex].children);comments[commentIndex].children=__WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(comments[commentIndex].children,{$splice:[[childCommentIndex,1]]});that.setState({comments:comments});}var newMemo=Object.assign({},that.state.memo);newMemo.sum_replies_count=newMemo.sum_replies_count-1;that.setState({memo:newMemo,total_count:childCommentId?that.state.total_count:that.state.total_count-1});}}).catch(function(error){console.log(error);});}// 公共接口
function handleCommentPraise(that,discussId,objectType,successCallback){var comments=that.state.comments;var commentIndex=that._findById(discussId,comments);var url=comments[commentIndex].user_praise?'/praise_tread/unlike.json':'/praise_tread/like.json';var _method=comments[commentIndex].user_praise?__WEBPACK_IMPORTED_MODULE_0_axios___default.a.delete:__WEBPACK_IMPORTED_MODULE_0_axios___default.a.post;var _data={object_id:discussId,object_type:objectType//Discuss
};if(comments[commentIndex].user_praise){_data={data:_data};}_method(url,Object.assign({},_data)).then(function(response){if(response.data.status===0){comments[commentIndex].praise_count=comments[commentIndex].user_praise?comments[commentIndex].praise_count-1:comments[commentIndex].praise_count+1;successCallback&&successCallback(comments[commentIndex].user_praise);comments[commentIndex].user_praise=!comments[commentIndex].user_praise;that.setState({comments:comments});}}).catch(function(error){console.log(error);});}function handleHiddenComment(that,item,childCommentId,objectType){var id=item.id;var showNotification=that.props.showNotification;var user=that._getUser();var url=item.hidden?'/commons/unhidden.json':'/commons/hidden.json';var comments=that.state.comments;var commentIndex=that._findById(id,comments);var comment=comments[commentIndex];__WEBPACK_IMPORTED_MODULE_0_axios___default.a.put(url,{object_id:item.id,object_type:objectType},{}).then(function(response){if(response.data.status===-1){showNotification(response.data.message);return;}if(response.data.status===0){if(!childCommentId){comment.hidden=!comment.hidden;that.setState({comments:comments});}else{// TODO 目前子回复没hidden字段
var childCommentIndex=that._findById(childCommentId,comments[commentIndex].children);var childComment=comments[commentIndex].children[childCommentIndex];childComment.hidden=!childComment.hidden;that.setState({comments:comments});}}// {"message":"Couldn't find Discuss with id=911","status":-1}
}).catch(function(error){console.log(error);});}

/***/ }),

/***/ 3421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_Modals__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modals_DownloadMessageysl__ = __webpack_require__(1332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__coursesPublic_HomeworkModal__ = __webpack_require__(1168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__coursesPublic_CoursesListType__ = __webpack_require__(1116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__GraduationTaskssettingReply__ = __webpack_require__(3422);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var GraduationTasksnewtype=true;var GraduationTasksquestions=function(_Component){_inherits(GraduationTasksquestions,_Component);function GraduationTasksquestions(props){_classCallCheck(this,GraduationTasksquestions);var _this=_possibleConstructorReturn(this,(GraduationTasksquestions.__proto__||Object.getPrototypeOf(GraduationTasksquestions)).call(this,props));_this.reInit=function(){_this.getdatas();};_this.getdatas=function(){var task_Id=_this.props.match.params.task_Id;var url="/graduation_tasks/"+task_Id+".json";__WEBPACK_IMPORTED_MODULE_3_axios___default.a.get(url).then(function(result){if(result.status===200){_this.setState({questionslist:result.data,end_time:result.data.end_time});_this.props.setend_time(result.data.end_time);}}).catch(function(error){console.log(error);});};_this.goback=function(){// let courseId=this.props.match.params.coursesId;
// let category_id=this.props.match.params.category_id;
// window.location.href="/courses/"+courseId+"/graduation_tasks/"+category_id;
// let courseId = this.props.match.params.coursesId;
// if(courseId===undefined){
// 	this.props.history.push("/courses");
// }else{
// 	this.props.history.push(this.props.current_user.first_category_url);
// }
// this.props.history.goBack()
_this.props.history.replace("/courses/"+_this.state.questionslist.course_id+"/graduation_tasks/"+_this.state.questionslist.graduation_id);};_this.end=function(){// this.homeworkstart()
_this.setState({modalname:"立即截止",visible:true,Topval:"学生将不能再提交作品",// Botvalleft:"暂不截止",
// Botval:`本操作只对"提交中"的任务有效`,
Cancelname:"暂不截止",Savesname:"立即截止",Cancel:_this.cancelmodel,Saves:_this.coursetaskend,typs:"end"});};_this.publish=function(){var starttime=_this.props.getNowFormatDates(1,1);var endtime=_this.props.getNowFormatDates(2,1);// this.homeworkstart()
_this.setState({modalname:"立即发布",visible:true,Topval:"学生将立即收到毕设任务",// Botvalleft:"点击修改",
// Botval:`本操作只对"未发布"的分班有效`,
starttime:__WEBPACK_IMPORTED_MODULE_8_moment___default()(__WEBPACK_IMPORTED_MODULE_8_moment___default()(new Date())).format("YYYY-MM-DD HH:mm"),starttimes:_this.props.getNowFormatDates(1),typs:"start",endtime:endtime,Cancelname:"暂不发布",Savesname:"立即发布",Cancel:_this.cancelmodel,Saves:_this.homepublish});};_this.homeworkstart=function(){var coursesId=_this.props.match.params.coursesId;var url="/courses/"+coursesId+"/all_course_groups.json";__WEBPACK_IMPORTED_MODULE_3_axios___default.a.get(url).then(function(response){if(response.status===200){_this.setState({modaltype:response.data.course_groups===null||response.data.course_groups.length===0?2:1,course_groups:response.data.course_groups});}}).catch(function(error){console.log(error);});};_this.homepublish=function(ids,endtime){_this.cancelmodel();var task_Id=_this.props.match.params.task_Id;var cid=_this.props.match.params.coursesId;// let url = `/courses/${cid}/graduation_tasks/publish_task.json`;
var url="/courses/"+cid+"/graduation_tasks/publish_task.json";__WEBPACK_IMPORTED_MODULE_3_axios___default.a.post(url,{task_ids:[task_Id],group_ids:_this.state.course_groupslist,end_time:endtime}).then(function(response){if(response.data.status==0){_this.getdatas();_this.props.showNotification(response.data.message);_this.searchValue();_this.setState({// Modalstopval:response.data.message,
// ModalSave:this.cancelmodel,
// Loadtype:true,
course_groupslist:[],checkAllValue:false});}}).catch(function(error){});};_this.cancelmodel=function(){_this.setState({Modalstype:false,Loadtype:false,visible:false,Modulationtype:false,Allocationtype:false,Modalstopval:"",ModalCancel:"",ModalSave:""});};_this.coursetaskend=function(){_this.cancelmodel();var coursesId=_this.props.match.params.coursesId;var task_Id=_this.props.match.params.task_Id;var url="/courses/"+coursesId+"/graduation_tasks/end_task.json";__WEBPACK_IMPORTED_MODULE_3_axios___default.a.post(url,{task_ids:[task_Id],group_ids:_this.state.course_groupslist}).then(function(response){if(response.data.status==0){_this.getdatas();_this.props.showNotification(response.data.message);_this.setState({// Modalstopval:response.data.message,
// ModalSave:this.cancelmodel,
// Loadtype:true,
course_groupslist:[],checkAllValue:false});}}).catch(function(error){});};_this.getcourse_groupslist=function(id){_this.setState({course_groupslist:id});};_this.Downloadcal=function(){_this.setState({DownloadType:false,DownloadMessageval:undefined});};_this.state={coursename:"",coursesearch:"",title_num:20,title_value:"",fileList:[],contents:[{val:"",id:1}],type:true,questionslist:undefined,DownloadType:false,DownloadMessageval:undefined};return _this;}_createClass(GraduationTasksquestions,[{key:"componentDidMount",value:function componentDidMount(){var tab=this.props.tab;this.props.setTab&&this.props.setTab(tab);this.getdatas();try{this.props.triggerRef(this);}catch(e){}}//立即发布
//立即发布
},{key:"confirmysl",/// 确认是否下载
value:function confirmysl(url,urls){var _this2=this;__WEBPACK_IMPORTED_MODULE_3_axios___default.a.get(url+'?export=true').then(function(response){if(response===undefined){return;}if(response.data.status&&response.data.status===-1){}else if(response.data.status&&response.data.status===-2){if(response.data.message==="100"){// 已超出文件导出的上限数量（100 ），建议：
_this2.setState({DownloadType:true,DownloadMessageval:100});}else{//因附件资料超过500M
_this2.setState({DownloadType:true,DownloadMessageval:500});}}else{// this.props.slowDownload(urls)
//this.props.showNotification(`正在下载中`);
_this2.props.slowDownload(Object(__WEBPACK_IMPORTED_MODULE_2_educoder__["P" /* getRandomcode */])(url));// window.open(getRandomcode("/api" + url), '_blank');
// this.props.showNotification(`正在下载中`);
// window.open("/api"+url, '_blank');
}}).catch(function(error){console.log(error);});}},{key:"render",value:function render(){var _this3=this;var _state=this.state,Modalstype=_state.Modalstype,Modalstopval=_state.Modalstopval,ModalCancel=_state.ModalCancel,ModalSave=_state.ModalSave,questionslist=_state.questionslist;// console.log(this.props)
var courseId=this.props.match.params.coursesId;var category_id=this.props.match.params.category_id;var task_Id=this.props.match.params.task_Id;//console.log(questionslist&&questionslist)
return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Fragment,null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__modals_Modals__["a" /* default */],{modalsType:this.state.Modalstype,modalsTopval:this.state.Modalstopval,modalCancel:this.state.ModalCancel,modalSave:this.state.ModalSave,loadtype:this.state.Loadtype}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__modals_DownloadMessageysl__["a" /* default */],Object.assign({},this.props,{value:this.state.DownloadMessageval,modalCancel:this.Downloadcal,modalsType:this.state.DownloadType})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__coursesPublic_HomeworkModal__["a" /* default */],{starttimes:this.state.starttimes,typs:this.state.typs,modalname:this.state.modalname,visible:this.state.visible,Topval:this.state.Topval,Topvalright:this.state.Topvalright,Botvalleft:this.state.Botvalleft,Botval:this.state.Botval,starttime:this.state.starttime,endtime:this.state.endtime,Cancelname:this.state.Cancelname,Savesname:this.state.Savesname,Cancel:this.state.Cancel,Saves:this.state.Saves,course_groups:this.state.course_groups,modaltype:this.state.modaltype,getcourse_groupslist:function getcourse_groupslist(id){return _this3.getcourse_groupslist(id);}}),questionslist&&questionslist?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"newMain clearfix"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"educontent mb20"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"justify break_full_word new_li markdown-body edu-back-white",id:"challenge_editorMd_description"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",{id:"ReactMarkdown"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{style:{padding:'30px 40px'}},questionslist&&questionslist?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{style:{width:'100%',border:'1px solid transparent'}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"markdown-body",dangerouslySetInnerHTML:{__html:Object(__WEBPACK_IMPORTED_MODULE_2_educoder__["_0" /* markdownToHTML */])(questionslist.description).replace(/▁/g,"▁▁▁")}})):"",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_educoder__["b" /* AttachmentList */],Object.assign({},this.props,this.state,{attachments:questionslist&&questionslist.attachments}))),questionslist&&questionslist.group_info?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"mt20"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"font-14"},"\u5206\u7EC4\u8981\u6C42\uFF1A"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"font-14 color-grey-9"},"\uFF08\u63D0\u4EA4\u4F5C\u54C1\u65F6\u9700\u8981\u5173\u8054\u540C\u7EC4\u6210\u5458\uFF0C\u7EC4\u5185\u6210\u5458\u4F5C\u54C1\u5171\u4EAB\uFF09")),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"mt10"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"font-14"},"\u5206\u7EC4\u4EBA\u6570\uFF1A",questionslist.group_info.min_number," - ",questionslist.group_info.max_number," \u4EBA "),questionslist.group_info.base_on_project===true?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"font-14 color-grey-9"}," \uFF08\u57FA\u4E8E\u9879\u76EE\uFF0C\u9879\u76EE\u7BA1\u7406\u5458\u89D2\u8272\u7684\u6210\u5458\u53EF\u4EE5\u63D0\u4EA4\u4F5C\u54C1\uFF09"):__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"font-14 color-grey-9"}," \uFF08\u975E\u57FA\u4E8E\u9879\u76EE\uFF0C\u4EFB\u610F\u5C0F\u7EC4\u6210\u5458\u53EF\u4EE5\u63D0\u4EA4\u4F5C\u54C1\uFF09")),questionslist.group_info.base_on_project===true?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"mt10"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"font-14"},"\u57FA\u4E8E\u9879\u76EE\u5B9E\u65BD"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"font-14 color-grey-9"}," \uFF08\u5404\u5C0F\u7EC4\u5FC5\u987B\u5728educoder\u5E73\u53F0\u521B\u5EFA\u9879\u76EE\uFF09")):__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"font-14 mt10"},"\u4E0D\u57FA\u4E8E\u9879\u76EE\u5B9E\u65BD")):""))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"mt20 course-message",style:{background:'#fff'}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__GraduationTaskssettingReply__["a" /* default */],Object.assign({memo:{id:task_Id,user_id:questionslist&&questionslist.user_id},course_id:courseId},this.props))))):""));}}]);return GraduationTasksquestions;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (GraduationTasksquestions);

/***/ }),

/***/ 3422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_pagination_style_css__ = __webpack_require__(899);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_pagination_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_pagination_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_pagination__ = __webpack_require__(901);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_pagination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_immutability_helper__ = __webpack_require__(1167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_immutability_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_immutability_helper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__forums_MemoDetailMDEditor__ = __webpack_require__(1708);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__forums_Post_css__ = __webpack_require__(1541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__forums_Post_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__forums_Post_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__forums_RightSection_css__ = __webpack_require__(1711);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__forums_RightSection_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__forums_RightSection_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_layers_ImageLayerOfCommentHOC__ = __webpack_require__(1700);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__comment_Comments__ = __webpack_require__(1557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__common_courseMessage_css__ = __webpack_require__(1607);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__common_courseMessage_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__common_courseMessage_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__common_CommentsHelper__ = __webpack_require__(1737);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}// import './GraduateTopicReply.css'
var REPLY_PAGE_COUNT=10;var $=window.$;/*
  相比较GraduateTopicReply 改动的地方
  列表接口名 /graduation_tasks/${graduation_topic_id}/show_comment.json?parent_id=${parent.id}&limit=500
  回复类型名 jour_type: 'GraduationTask',
*/var GraduationTaskssettingReply=function(_Component){_inherits(GraduationTaskssettingReply,_Component);function GraduationTaskssettingReply(props){_classCallCheck(this,GraduationTaskssettingReply);var _this=_possibleConstructorReturn(this,(GraduationTaskssettingReply.__proto__||Object.getPrototypeOf(GraduationTaskssettingReply)).call(this,props));_this._findById=__WEBPACK_IMPORTED_MODULE_11__common_CommentsHelper__["a" /* _findById */];_this.createNewComment=function(commentContent,id,editor){var graduation_topic_id=_this.props.memo.id;var content=Object(__WEBPACK_IMPORTED_MODULE_11__common_CommentsHelper__["g" /* handleContentBeforeCreateNew */])(commentContent);var memo=_this.props.memo;var url="/users/reply_message.json";var comments=_this.state.comments;__WEBPACK_IMPORTED_MODULE_4_axios___default.a.post(url,{journals_for_message:{jour_type:'GraduationTask',jour_id:graduation_topic_id,notes:content,// m_parent_id
reply_id:memo.user_id}}).then(function(response){if(response.data.status===-1){console.error('服务端异常');return;}// this.props.showNotification('帖子发表成功')
if(response.data&&response.data.id){var _id=response.data.id;// md
editor.setValue&&editor.setValue('');var user=_this._getUser();_this.setState({comments:Object(__WEBPACK_IMPORTED_MODULE_11__common_CommentsHelper__["b" /* addNewComment */])(_this.state.comments,_id,content,user,_this.props.isSuperAdmin(),_this),total_count:_this.state.total_count+1});_this.refs.editor.showEditor();}}).catch(function(error){console.log(error);});};_this.replyComment=function(commentContent,id,editor){var showNotification=_this.props.showNotification;// if (!commentContent || commentContent.length === 0) {
//   showNotification(NEED_TO_WRITE_CONTENT)
//   return;
// }
if(_this.props.memo.id===id){// 回复帖子
_this.createNewComment(commentContent,id,editor);return;}var url="/users/reply_message.json";var comments=_this.state.comments;var user=_this._getUser();var graduation_topic_id=_this.props.memo.id;var commentIndex=_this._findById(id,comments);var comment=comments[commentIndex];commentContent=Object(__WEBPACK_IMPORTED_MODULE_11__common_CommentsHelper__["h" /* handleContentBeforeCreateSecondLevelComment */])(commentContent);__WEBPACK_IMPORTED_MODULE_4_axios___default.a.post(url,{journals_for_message:{jour_type:'GraduationTask',jour_id:graduation_topic_id,notes:commentContent,m_parent_id:id,reply_id:comment.user_id}},{}).then(function(response){if(response.data.id){var newId=response.data.id;_this.setState({comments:Object(__WEBPACK_IMPORTED_MODULE_11__common_CommentsHelper__["c" /* addSecondLevelComment */])(comments,comment,commentIndex,newId,commentContent,user,editor)});var newMemo2=Object.assign({},_this.props.memo);newMemo2.total_count=newMemo2.total_count+1;_this.setState({memo:newMemo2});}}).catch(function(error){console.log(error);});};_this.loadMoreChildComments=function(parent){var graduation_topic_id=_this.props.memo.id;var course_id=_this.props.course_id;var url="/graduation_tasks/"+graduation_topic_id+"/show_comment.json?parent_id="+parent.id+"&limit=500";__WEBPACK_IMPORTED_MODULE_4_axios___default.a.get(url,{}).then(function(response){var comments=response.data.comments;// const memo = Object.assign({}, this.state.memo)
// memo.sum_replies_count = sum_replies_count;
_this.setState({// memo,
comments:Object(__WEBPACK_IMPORTED_MODULE_11__common_CommentsHelper__["d" /* generateChildComments */])(comments,_this.state.comments,parent,_this.transformReply)});}).catch(function(error){console.log(error);});};_this.onPaginationChange=function(pageCount){_this.setState({pageCount:pageCount},function(){_this.fetchReplies();});};_this.fetchReplies=function(){var graduation_topic_id=_this.props.memo.id;var course_id=_this.props.course_id;var url="/graduation_tasks/"+graduation_topic_id+"/show_comment.json?page="+_this.state.pageCount;// page limit parent_id
__WEBPACK_IMPORTED_MODULE_4_axios___default.a.get(url,{}).then(function(response){var _response$data=response.data,comments=_response$data.comments,messages_count=_response$data.messages_count;_this.setState({comments:Object(__WEBPACK_IMPORTED_MODULE_11__common_CommentsHelper__["e" /* generateComments */])(comments,_this.transformReply),// : this.state.comments.concat(comments),
total_count:messages_count});}).catch(function(error){console.log(error);});};_this.transformReply=function(reply){var children=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];var isAdmin=_this.props.isAdmin();var isSuperAdmin=_this.props.isSuperAdmin();return{admin:isAdmin,//
isSuperAdmin:isSuperAdmin,permission:true,//
children:children,hidden:reply.hidden,id:reply.id,image_url:reply.author.image_url,reward:null,//
time:reply.time,// moment(reply.created_on).fromNow(),
user_id:reply.author.id,user_login:reply.author.login,user_praise:reply.user_praise,username:reply.author.name,content:reply.content,praise_count:reply.praise_count,child_message_count:reply.child_message_count};};_this.deleteComment=function(parrentComment,childCommentId){Object(__WEBPACK_IMPORTED_MODULE_11__common_CommentsHelper__["i" /* handleDeleteComment */])(_this,parrentComment,childCommentId,'journals_for_message');};_this.commentPraise=function(discussId){Object(__WEBPACK_IMPORTED_MODULE_11__common_CommentsHelper__["f" /* handleCommentPraise */])(_this,discussId,'journals_for_message');};_this.hiddenComment=function(item,childCommentId){Object(__WEBPACK_IMPORTED_MODULE_11__common_CommentsHelper__["j" /* handleHiddenComment */])(_this,item,childCommentId,'journals_for_message');};_this.showCommentInput=function(){_this.refs.editor.showEditor();};_this.initReply=function(parent){if(!parent.isAllChildrenLoaded){_this.loadMoreChildComments(parent);}};_this.state={pageCount:1};return _this;}_createClass(GraduationTaskssettingReply,[{key:"componentDidMount",value:function componentDidMount(){this.fetchReplies();}},{key:"_getUser",value:function _getUser(){var current_user=this.props.current_user;current_user.user_url="/users/"+current_user.login;return current_user;}// 公共接口 --- 删除回复
// 公共接口 --- 回复点赞
// 公共接口 --- 隐藏回复
},{key:"render",value:function render(){var _state=this.state,total_count=_state.total_count,comments=_state.comments,pageCount=_state.pageCount;var _props=this.props,current_user=_props.current_user,memo=_props.memo;return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Fragment,null,__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("style",null,"\n        \n        "),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__forums_MemoDetailMDEditor__["a" /* default */],Object.assign({},this.props,{ref:"editor",memo:memo,usingMockInput:true,placeholder:"\u8BF7\u5728\u6B64\u8F93\u5165\u5BF9\u672C\u4F5C\u54C1\u7684\u8BC4\u8BED\uFF0C\u6700\u5927\u9650\u52362000\u4E2A\u5B57\u7B26",height:160,showError:true})),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div",{className:"padding40 bor-bottom-greyE memoReplies commentsDelegateParent",style:{display:comments&&!!comments.length?'block':'none'}},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div",{className:"replies_count"},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("span",{className:"labal"},"\u5168\u90E8\u56DE\u590D"),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("span",{className:"count"},total_count)),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__comment_Comments__["a" /* default */],{comments:comments,user:current_user,replyComment:this.replyComment,deleteComment:this.deleteComment,commentPraise:this.commentPraise,rewardCode:this.rewardCode,hiddenComment:this.hiddenComment,usingAntdModal:true,isChildCommentPagination:true,loadMoreChildComments:this.loadMoreChildComments,initReply:this.initReply,showRewardButton:false,onlySuperAdminCouldHide:true})),total_count>REPLY_PAGE_COUNT&&__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div",{className:"memoMore"},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_pagination___default.a,{showQuickJumper:true,onChange:this.onPaginationChange,current:pageCount,total:total_count,pageSize:10}),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div",{className:"writeCommentBtn",onClick:this.showCommentInput},"\u5199\u8BC4\u8BBA")));}}]);return GraduationTaskssettingReply;}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_8__page_layers_ImageLayerOfCommentHOC__["a" /* ImageLayerOfCommentHOC */])()(GraduationTaskssettingReply));

/***/ })

});