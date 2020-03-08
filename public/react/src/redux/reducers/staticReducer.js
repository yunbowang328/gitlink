/*
 * @Description: 统计
 * @Author: tangjiang
 * @Github: 
 * @Date: 2020-01-14 09:34:49
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-14 15:49:55
 */
import types from "../actions/actionTypes";

// const maps = {
//   1: 'shixun_info', // 实训使用情况
//   2: 'user_info', // 用户使用情况
//   3: 'subject_info' // 实践课程使用情况
// }
const initalState = {
  subject_info: {},
  other_info: [],
  total_count: 0,
  total: {},
  params: {
    // sort_by: '',
    // sort_direction: 'desc', // desc || asc
    limit: 20, // 一页多少条
    page: 1, // 第几页
    type: 'subject_info' // 类型: 实训 shixun_info,
  }
};

// const getGuid = () =>
//   'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
//   /* eslint-disable */
//     let r = (Math.random() * 16) | 0,
//       v = c == 'x' ? r : (r & 0x3) | 0x8;
//     return v.toString(16);
//   });

const staticReducer = (state = initalState, action) => {
  const { payload = {}, type } = action;
  const {subject_info, other_info = [], total = {}, total_count} = payload;
  switch (type) {
    case types.GET_STATIC_INFO:
      return {
        ...state,
        subject_info,
        other_info: state.other_info.concat(other_info),
        total,
        total_count,
        params: Object.assign({}, state.params, { page: state.params.page + 1 })
      }
    case types.CHANGE_STATIC_PARAMS: {
      return {
        ...state,
        params: Object.assign({}, state.params, payload)
      };
    }
    case types.CHANGE_STATIC_TOTAL: {
      return {
        ...state,
        other_info: [],
        total: {}
      }
    } 
    default:
      return state;
  }
}

export default staticReducer;
