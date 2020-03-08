/*
 * @Description: 全局控制 reducer
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-27 16:27:09
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-07 15:23:39
 */
import types from "../actions/actionTypes";

const initialState = {
  showOrHideControl: false,
  loading: false, 
  excuteState: '', // 代码执行状态
  submitLoading: false, // 提交按钮状态
  publishLoading: false, // 发布
  isMySource: false,
  drawervisible:false,
  jupytertime:0,
  endjupytertime:false,
  spinning:false
}

const commonReducer = (state = initialState, action) => {
  // console.log(action)
  switch (action.type) {
    case types.SHOW_OR_HIDE_CONTROL:
      return {
        ...state,
        showOrHideControl: action.payload
      }
    case types.LOADING_STATUS:
      return {
        ...state,
        loading: action.payload
      }
    case types.TEST_CODE_STATUS: // 改变代码调试状态
      return {
        ...state,
        excuteState: action.payload
      }
    case types.SUBMIT_LOADING_STATUS:
      return {
        ...state,
        submitLoading: action.payload
      }
    case types.PUBLISH_LOADING_STATUS:
      return {
        ...state,
        publishLoading: action.payload
      }
    case types.IS_MY_SOURCE:
      return {
        ...state,
        isMySource: action.payload
      }
    case types.CHANGE_SHOW_DRAWER:
      return {
        ...state,
        drawervisible: action.payload
      }
    case types.CHANGE_JYPYTER_TIME:
      return {
        ...state,
        jupytertime: action.payload,
        endjupytertime:action.endtime,
      }
    case types.CHANGE_UPDETA_SPIN:
      return {
        ...state,
        spinning: action.payload
      }
    default:
      return state;
  }
}

export default commonReducer;
