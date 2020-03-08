/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2020-01-03 10:24:31
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-03 11:44:26
 */
import types from "../actions/actionTypes";

const initialState = {
  showOrHide: false,
  isCollapse: false, // 是否展开测试集
};

const tpiReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SHOW_OR_HIDE_TPI_TEST_CASE:
      return {
        ...state,
        showOrHide: payload
      }
    case types.IS_COLLAPSE_TEST_CASE:
      return {
        ...state,
        isCollapse: payload
      }
    default:
      return {
        ...state
      }
  }
}

export default tpiReducer;
