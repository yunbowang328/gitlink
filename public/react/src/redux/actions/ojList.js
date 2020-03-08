/*
 * @Description: 开发者社区action
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-20 10:48:24
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-10 20:40:55
 */
import types from './actionTypes';
import { fetchOJList, fetchDeleteOJItem } from '../../services/ojService';

export const getOJList = (params) => {
  return (dispatch) => {
    fetchOJList(params).then((res) => {
      const { data } = res;
      dispatch({
        type: types.GET_OJ_LIST,
        payload: data
      });
      // 改变总页娄
      dispatch({
        type: types.CHANGE_PAGINATION_INFO,
        payload: {
          total: data.hacks_count
        }
      });
    });
  }
}

// 改变分页数据
export const changePaginationInfo = (obj) => {
  return {
    type: types.CHANGE_PAGINATION_INFO,
    payload: obj
  }
}

// 删除
export const deleteItem = (identifier) => {
  return (dispatch, getState) => {
    const {pagination} = getState().ojListReducer;
    fetchDeleteOJItem(identifier).then(res => {
      if (res.status === 200) {
        dispatch(getOJList(pagination));
      }
    });
  }
}
