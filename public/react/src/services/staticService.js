import axios from "axios";

/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2020-01-14 09:40:53
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-14 10:47:19
 */
export async function fetchStaticList (id, params) {
  const url = `/paths/${id}/statistics_info.json`;
  return axios.get(url, { params });
}
