/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2020-01-14 09:44:02
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-14 17:02:45
 */
import types from "./actionTypes";
import { fetchStaticList } from "../../services/staticService";

export const staticList = (id) => {
  return (dispatch, getState) => {
    const { params, total_count, other_info } = getState().staticReducer;

    if (total_count !== 0 && total_count === other_info.length) return;
    fetchStaticList(id, params).then(res => {
      // console.log('统计数据=====>>>>>', res);
      const {data} = res;
      if (data.status === 0) {
        dispatch({
          type: types.GET_STATIC_INFO,
          payload: data.data
        });
      }
    });
  }
};

export const changeParams = (params) => {
  return {
    type: types.CHANGE_STATIC_PARAMS,
    payload: params
  }
}

export const initTotal = () => {
  return {
    type: types.CHANGE_STATIC_TOTAL
  }
}
