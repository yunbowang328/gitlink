/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-06 15:09:22
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-09 20:34:50
 */
import types from './actionTypes';

import { fetchUserInfoForNew } from '../../services/ojService';

// 获取用户信息
export const getUserInfoForNew =  () => {
  return (dispatch) => {
    // 调用获取用户信息， 如果没有登录直接调用登录，成功后保存当前用户信息
    fetchUserInfoForNew().then(res => {
      // console.log('获取用户信息成功: ', res);
      const { data } = res;
      if (data.status === 401) return;
      dispatch({
        type: types.SAVE_USER_INFO,
        payload: data.user
      });
    })
  }
}