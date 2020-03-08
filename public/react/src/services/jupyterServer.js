/*
 * @Description: jupyter相关接口
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-12 09:07:07
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-13 16:00:45
 */
import axios from 'axios';

// 获取 jupyter实训相关的内容
export async function fetchJupyterInfo (identifier) {
  const url = `/tasks/${identifier}/jupyter.json`;
  return axios.get(url);
}
// 获取数据集
export async function fetchJupyterTpiDataSet (identifier, params) {
  const url = `/shixuns/${identifier}/get_data_sets.json`;
  return axios.get(url, { params });
}
// 获取 tpi url
export async function fetchJupyterTpiUrl (params) {
  const url = `/jupyters/get_info_with_tpi.json`;
  return axios.get(url, { params });
}
// 同步代码功能
export async function fetchSyncJupyterCode (identifier) {
  const url = `/myshixuns/${identifier}/sync_code.json`;
  return axios.post(url);
}
// jupyter 保存
export async function fetchSaveJupyterTpi (params) {
  const url = `/jupyters/save_with_tpi.json`;
  return axios.get(url, { params });
}

//重置jupyter 环境
export async function fetchreset_with_tpi (params) {
  const url = `/jupyters/reset_with_tpi.json`;
  return axios.get(url, { params });
}

//延时jupyter
export async function fetactive_with_tpi(params) {
  const url = `/jupyters/active_with_tpi.json`;
  return axios.get(url, { params });
}


//获取tpi重置实训的time
export async function timeinfo_with_tpis(params){
  const url = `/jupyters/timeinfo_with_tpi.json`;
  return axios.get(url, { params });
}