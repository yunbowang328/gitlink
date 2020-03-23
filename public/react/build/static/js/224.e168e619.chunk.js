webpackJsonp([224],{

/***/ 1248:
/***/ (function(module, exports, __webpack_require__) {

var invariant = __webpack_require__(48);

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

/***/ 3582:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_tooltip_style_css__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_tooltip_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_tooltip_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_axios__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var SelectTable=function(_Component){_inherits(SelectTable,_Component);function SelectTable(props){_classCallCheck(this,SelectTable);var _this=_possibleConstructorReturn(this,(SelectTable.__proto__||Object.getPrototypeOf(SelectTable)).call(this,props));_this.state={};return _this;}_createClass(SelectTable,[{key:'componentDidMount',value:function componentDidMount(){}},{key:'render',value:function render(){var _this2=this;var _props=this.props,match=_props.match,columns=_props.columns,tableData=_props.tableData;if(!tableData||!tableData.length)return'';return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('table',{className:'edu-pop-table-all edu-txt-center color-grey-6 interval-td',cellspacing:'0',cellpadding:'0'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('tbody',null,__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('tr',null,columns.map(function(item,index){if(index==0)return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('td',{className:'gaugeOutfit'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',null,columns[0][0]),__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span',null,columns[0][1]));return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip___default.a,{title:item},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('td',null,_this2.props.columnName||'目标',index));})),tableData.map(function(item,rowIndex){var cells=item.map(function(cell,colIndex){// placement="bottom"
if(colIndex==0)return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip___default.a,{title:cell},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('td',null,'\u6307\u6807\u70B9',_this2.props.firstColIndexArray?_this2.props.firstColIndexArray[rowIndex]:rowIndex+1));return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_tooltip___default.a,{title:!!cell?'取消支撑':'选择支撑'},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('td',{onClick:function onClick(){return _this2.props.onCellClick(rowIndex,colIndex,!!cell);}},__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('i',{className:'iconfont icon-gouxuan '+(!!cell?'color-green':'color-grey-eb')+' font-16 mr5'})));});return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('tr',{className:'sustainLine editTd'},cells);})));}}]);return SelectTable;}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (SelectTable);

/***/ }),

/***/ 5175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_educoder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__SelectTable__ = __webpack_require__(3582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_immutability_helper__ = __webpack_require__(1248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_immutability_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_immutability_helper__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var testState={"graduation_requirements":[{"id":1,"position":1,"content":"毕业要求一"},{"id":2,"position":2,"content":"毕业要求二"}],"training_subitems":[{"id":1,"content":"培养目标一"},{"id":2,"content":"培养目标二"}],"requirement_support_objectives":[{"graduation_requirement_id":1,"training_subitem_id":1},{"graduation_requirement_id":2,"training_subitem_id":2}]};var RequirementVsObjective=function(_Component){_inherits(RequirementVsObjective,_Component);function RequirementVsObjective(props){_classCallCheck(this,RequirementVsObjective);var _this=_possibleConstructorReturn(this,(RequirementVsObjective.__proto__||Object.getPrototypeOf(RequirementVsObjective)).call(this,props));_this.init=function(){_this.graduationRequirementsIdIndexMap={};_this.trainingSubitemsIdIndexMap={};_this.state.graduation_requirements.forEach(function(item,index){_this.graduationRequirementsIdIndexMap[item.id]=index;});_this.state.training_subitems.forEach(function(item,index){// 对应table的列数
_this.trainingSubitemsIdIndexMap[item.id]=index+1;});var tableData=[];_this.state.graduation_requirements.forEach(function(item,index){tableData.push([item.content].concat(_toConsumableArray(Array(_this.state.training_subitems.length))));});_this.state.requirement_support_objectives.forEach(function(item){tableData[_this.graduationRequirementsIdIndexMap[item.graduation_requirement_id]][_this.trainingSubitemsIdIndexMap[item.training_subitem_id]]=true;});_this.setState({tableData:tableData});};_this.onCellClick=function(rowIndex,colIndex,select){console.log(rowIndex,colIndex,select);var ec_graduation_requirement_id=_this.state.graduation_requirements[rowIndex].id;var ec_training_subitem_id=_this.state.training_subitems[colIndex-1].id;var yearId=_this.props.match.params.yearId;var url='/ec_years/'+yearId+'/requirement_support_objectives.json';var method=select?__WEBPACK_IMPORTED_MODULE_3_axios___default.a.delete:__WEBPACK_IMPORTED_MODULE_3_axios___default.a.post;method(url,select?{params:{ec_graduation_requirement_id:ec_graduation_requirement_id,ec_training_subitem_id:ec_training_subitem_id}}:{ec_graduation_requirement_id:ec_graduation_requirement_id,ec_training_subitem_id:ec_training_subitem_id}).then(function(response){if(response.data.status==0){_this.setState(function(prevState){return{tableData:__WEBPACK_IMPORTED_MODULE_5_immutability_helper___default()(prevState.tableData,_defineProperty({},rowIndex,_defineProperty({},colIndex,{$set:select?false:true})))};});_this.props.showNotification((select?'取消':'选择')+'\u6210\u529F');}}).catch(function(e){});if(select){// 取消
}else{// 选择
}};_this.state={//   ...testState
};return _this;}_createClass(RequirementVsObjective,[{key:'componentDidMount',value:function componentDidMount(){var _this2=this;// this.init()
// return;
var yearId=this.props.match.params.yearId;var url='/ec_years/'+yearId+'/requirement_support_objectives.json';__WEBPACK_IMPORTED_MODULE_3_axios___default.a.get(url).then(function(response){if(response.data.graduation_requirements){_this2.setState(Object.assign({},response.data),function(){_this2.init();});}}).catch(function(e){});}},{key:'render',value:function render(){var _props=this.props,match=_props.match,history=_props.history,current_user=_props.current_user;var _state=this.state,tableData=_state.tableData,training_subitems=_state.training_subitems,graduation_requirements=_state.graduation_requirements,is_manager=_state.is_manager;var columns=training_subitems&&[['毕业要求','培养目标']].concat(_toConsumableArray(training_subitems.map(function(item){return item.content;})));var columnIdIndexMap={};console.log(columns,tableData);return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'educontent requirementVsObjective',style:{background:'#fff'}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('ul',{className:'clearfix padding20-30 bor-bottom-greyE backgroundFFF',style:{'marginBottom':'0px'}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('li',{className:'fl'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'font-18 courseSystem'},' \u6BD5\u4E1A\u8981\u6C42\u5BF9\u57F9\u517B\u76EE\u6807\u7684\u652F\u6491 '),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'color-grey-9 mr10'},'\u7528\u77E9\u9635\u56FE\u7684\u5F62\u5F0F\u8BF4\u660E\u672C\u4E13\u4E1A\u6BD5\u4E1A\u8981\u6C42\u5BF9\u57F9\u517B\u76EE\u6807\u7684\u652F\u6491\u5173\u7CFB\uFF0C\u9F20\u6807\u5DE6\u952E\u5355\u51FB\u5355\u5143\u683C\u5373\u53EF'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a',{target:'_blank',href:'/forums/3531',className:'color-blue'},'\u67E5\u770B\u8BE6\u60C5'))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a',{href:'/api/ec_years/'+this.props.yearId+'/requirement_support_objectives.xlsx'+Object(__WEBPACK_IMPORTED_MODULE_2_educoder__["O" /* getRandomNumber */])(),target:'_blank',className:'ant-btn ant-btn-primary color-white fr mt20'},'\u5BFC\u51FA\u77E9\u9635')),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'padding20-30',style:{background:'#fff'}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p',{className:'clearfix mb20'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'fl mr30'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i',{className:'iconfont icon-gouxuan color-green font-16 mr5'}),'\u8868\u793A\u652F\u6491'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'fl'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i',{className:'iconfont icon-gouxuan color-grey-eb font-16 mr5'}),'\u8868\u793A\u4E0D\u652F\u6491')),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__SelectTable__["a" /* default */],{columns:columns,tableData:tableData,onCellClick:this.onCellClick})));}}]);return RequirementVsObjective;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (RequirementVsObjective);

/***/ })

});