/*
 * @Description: 开发者社区接口
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-20 10:55:38
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-07 15:23:19
 */

import axios from 'axios';

export async function fetchOJList (params) {
  // console.log('传递的参数: ', params);
  const obj = {};
  Object.keys(params).forEach(key => {
    if (params[key]) {
      obj[key] = params[key];
    }
  });
  return axios.get('/problems.json', { params: obj });
}

// 删除OJ列表
export async function fetchDeleteOJItem (identifier) {
  const url = `/problems/${identifier}.json`;
  return axios.delete(url);
}

// 提交
export async function fetchPostOjForm (paramsObj) {
  const { params, submitType, identifier } = paramsObj;
  const url = submitType === 'add' ? `/problems.json` : `/problems/${identifier}.json`;
  // return axios.post(url, params);
  // if (identifier) {
  //   return axios.post(url, params);
  // } else {
  //   return 
  // }
  return identifier ? axios.put(url, params) : axios.post(url, params);
}

// 根据id号获取OJ信息
export async function fetchGetOjById (id) {
  const url = `/problems/${id}/edit.json`;
  return axios.get(url);
}

// 调试代码
export async function fetchDebuggerCode (identifier, params) {
  const url = `/myproblems/${identifier}/code_debug.json`;
  return axios.get(url, {params});
}

// 调试代码成功后，循环调用提交接口
export async function fetchCodeSubmit (identifier, params) {
  const url = `/myproblems/${identifier}/result.json`;
  return axios.get(url, {params});
}

// 开启编程题接口
export async function fetchStartProgram (identifier) {
  const url = `/problems/${identifier}/start.json`;
  return axios.get(url);
}

// 用户编程题详情
export async function fetchUserProgramDetail (identifier) {
  const url = `/myproblems/${identifier}.json`;
  return axios.get(url);
}

// 获取提交记录
export async function fetchUserCommitRecord (identifier, params) {
  // console.log('identifier=====', identifier);
  const url = `/myproblems/${identifier}/submit_records.json`;
  return axios.get(url, { params });
}

// 获取提交记录详情
export async function fetchUserCommitRecordDetail (identifier) {
  const url = `/myproblems/record_detail.json`;
  const params = {id: identifier};
  return axios.get(url, {params});
}

// 恢复初始代码
// export async function restoreInitialCode (identifier) {
//   const url = `/myproblems/${identifier}/restore_initial_code.json`;
//   return axios.get(url);
// }

// 发布任务
export async function publishTask (identifier) {
  const url = `/problems/${identifier}/publish.json`;
  return axios.post(url);
}

// 撤销发布
export async function cancelPublicTask (identifier) {
  const url = `/problems/${identifier}/cancel_publish.json`;
  return axios.post(url);
}

// 更新用户编辑代码
export async function fetchUpdateCode (identifier, params) {
  const url = `/myproblems/${identifier}/update_code.json`;
  return axios.post(url, params);
}

// 用户提交代码
export async function fetchUserCodeSubmit (identifier) {
  const url = `/myproblems/${identifier}/code_submit.json`;
  return axios.get(url);
}

// 恢复初始代码
export async function fetchRestoreInitialCode (identifier) {
  // const url = `/myproblems/${identifier}/restore_initial_code.json`;
  const url = `/myproblems/${identifier}/sync_code.json`;
  return axios.post(url);
}

// 新建时调用获取用户信息接口
export async function fetchUserInfoForNew () {
  const url = `/problems/new.json`;
  return axios.get(url);
}

// 文件上传
export async function fetchUploadImage (file) {
  const url = `/attachments.json`;
  return axios.post(url, file)
}

// 根据id号获取图片url
export async function fetchUploadImageUrl (id) {
  const url = `/attachments/${id}`;
  return axios.get(url);
} 

// 添加笔记
export async function fetchAddNotes (identifier, params) {
  const url = `/myproblems/${identifier}/add_notes.json`;
  return axios.post(url, params);
}

// 获取课程体系
export async function fetchQuestion (params) {
  const url = `/disciplines.json`;
  return axios.get(url, { params });
}

// 新增选题
export async function fetchTagDisciplines (params) {
  const url = `/tag_disciplines.json`;
  return axios.post(url, params);
}