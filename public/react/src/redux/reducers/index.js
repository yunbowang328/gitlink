/*
 * @Description: 全局导出 reducers 
 * @Author: tangjiang 
 * @Date: 2019-11-13 20:12:54 
 * @Last Modified by: tangjiang
 * @Last Modified time: 2019-11-14 09:55:10
 */

import { combineReducers } from 'redux';
import testReducer from './testReducer';
import ojFormReducer from './ojFormReducer';
import ojListReducer from './ojListReducer';
import ojForUserReducer from './ojForUserReducer';
import commonReducer from './commonReducer';
import userReducer from './userReducer';
import jupyterReducer from './jupyterReducer';
import commentReducer from './commentReducer';
import tpiReducer from './tpiReducer';
import staticReducer from './staticReducer';
import wxcodeReducer from './wxcodeReducer';

export default combineReducers({
  testReducer,
  ojFormReducer,
  ojListReducer,
  ojForUserReducer,
  commonReducer,
  userReducer,
  jupyterReducer,
  commentReducer,
  tpiReducer,
  staticReducer,
  wxcodeReducer
});
