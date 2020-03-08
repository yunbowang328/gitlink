/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2020-01-03 10:24:43
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-03 11:45:22
 */
import types from './actionTypes';

export const showOrHideTpiTestCase = (flag) => {
  return {
    type: types.SHOW_OR_HIDE_TPI_TEST_CASE,
    payload: flag
  }
}

export const isCollpaseTsetCase = (flag) => {
  return {
    type: types.IS_COLLAPSE_TEST_CASE,
    payload: flag
  }
}
