/*
 * @Description: 评论 service
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-23 10:43:27
 * @LastEditors  : tangjiang
 * @LastEditTime : 2019-12-25 10:50:24
 */
import axios from 'axios';

// 添加评论
export async function fetchAddComment (identifier, params) {
  const url = `/problems/${identifier}/comments.json`;
  return axios.post(url, params);
}

// 获取评论列表
export async function fetchCommentLists (identifier, params) {
  const url = `/problems/${identifier}/comments.json`;
  return axios.get(url, {params});
}

// 添加子评论
export async function fetchAddChildComment (identifier, params) {
  const url = `/problems/${identifier}/comments/reply.json`;
  return axios.post(url, params);
}

// 删除评论
export async function fetchDeleteComment (identifier, id) {
  const url = `/problems/${identifier}/comments/${id}.json`;
  return axios.delete(url);
}

// 点赞
export async function fetchLikeComment (id, params) {
  const url = `/discusses/${id}/plus.json`;
  return axios.post(url, params);
}

// 显示或隐藏
export async function fetchShowOrHideComment (identifier, id, params) {
  const url = `/problems/${identifier}/comments/${id}/hidden.json`;
  return axios.post(url, params);
}