/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-21 22:17:03
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-11-29 09:31:04
 */
import types from '../actions/actionTypes';

const initialState = {
  hacks_list: [],
  top_data: {},
  hacks_count: 0, // 总条数
  pagination: {
    current: 1, // 当前页
    pageSize: 10, // 每页条数
    total: 1, // 总数
    showQuickJumper: true // 快速跳转
  }
};

const ojListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_OJ_LIST: 
      return {
        ...state,
        ...action.payload
      }
    case types.CHANGE_PAGINATION_INFO:
      return { 
        ...state,
        pagination: Object.assign({}, state.pagination, action.payload)
      }
    default: 
      return state;
  }
}

export default ojListReducer;
