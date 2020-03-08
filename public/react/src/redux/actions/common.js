/*
 * @Description: 控制全局
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-27 16:30:50
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-19 19:42:10
 */
import types from "./actionTypes";

// 切换控制台显示与隐藏
export const changeShowOrHideControl = (flag) => {
  return {
    type: types.SHOW_OR_HIDE_CONTROL,
    payload: flag
  }
}

// 改变 loading 状态值
export const changeLoadingState = (flag) => {
  return {
    type: types.LOADING_STATUS,
    payload: flag
  }
}

// 改变提交按钮状态值
export const changeSubmitLoadingStatus = (flag) => {
  return {
    type: types.SUBMIT_LOADING_STATUS,
    payload: flag
  }
}

// 发布按钮状态
export const changePublishLoadingStatus = (flag) => {
  return {
    type: types.PUBLISH_LOADING_STATUS,
    payload: flag
  }
}

// 是否是我发布的
export const isMyPublish = (flag) => {
  return {
    type: types.IS_MY_SOURCE,
    payload: flag
  }
}
