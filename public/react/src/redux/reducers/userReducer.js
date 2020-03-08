/*
 * @Description: 保存信息数据
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-06 15:09:29
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-06 15:16:15
 */
import types from "../actions/actionTypes";

const initialState = {
  userInfo: {} // 当前登录用户信息
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_USER_INFO:
      return {
        userInfo: action.payload
      }
    default:
      return {
        ...state
      }
  }
}

export default userReducer;
export {
  userReducer
};
