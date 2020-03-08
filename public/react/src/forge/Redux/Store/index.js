/*
 * @Description: 指定容器并绑定 reducers 
 * @Author: tangjiang 
 * @Date: 2019-11-13 20:13:21 
 * @Last Modified by: tangjiang
 * @Last Modified time: 2019-11-14 19:20:44
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = () => createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default configureStore;