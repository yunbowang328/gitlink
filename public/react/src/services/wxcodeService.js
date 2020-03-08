/*
 * @Description:
 * @Author: tangjiang
 * @Github:
 * @Date: 2020-01-15 15:44:36
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-17 20:39:13
 */
import axios from 'axios';
import cookie from 'react-cookies'
// axios.defaults.withCredentials = true;


const setCookier = () => {
	// const _params = window.location.search;
	// if (_params) {
	// 	let _search = _params.split('?')[1];
	// 	_search.split('&').forEach(item => {
	// 		// console.log(item);
	// 		const _arr = item.split('=');
	// 		cookie.remove(_arr[0], {
	// 			path: '/',
	// 			domain: '.educoder.net'
	// 		});
	// 		cookie.save(_arr[0], _arr[1], { domain: '.educoder.net', path: '/'});
	// 	});
	// }
}

// 获取代码块
export async function fetchWxCode (identifier, params) {
   setCookier();
  const url = `/tasks/${identifier}/rep_content.json`;
  params = Object.assign({}, params, {withCredentials: true});
  return axios.get(url, {params});
}

// 获取测试值
export async function fetchWxCodeTextCase (identifier) {
  setCookier();
  const url = `/tasks/${identifier}.json`;
  const params = Object.assign({}, {withCredentials: true});
  return axios.get(url, {params});
}

// 更新代码块内容
export async function fetchUpdateWxCode (identifier, params) {
  setCookier();
  // /myshixuns/8etu3pilsa/update_file.json
  const url = `/myshixuns/${identifier}/update_file.json`;
  params = Object.assign({}, params, {withCredentials: true});
  return axios.post(url, params);
}

// 恢复初始化
export async function fetchRestoreWxCode (identifier, params) {
  setCookier();
  const url = `/tasks/${identifier}/reset_original_code.json`;
  params = Object.assign({}, params, {withCredentials: true});
  return axios.get(url, {params});
}
// 评测
export async function fetchWxCodeGameBuild (identifier, params) {
  setCookier();
  const url = `/tasks/${identifier}/game_build.json`;
  params = Object.assign({}, params, {withCredentials: true});
  return axios.get(url, {params});
}

export async function fetchWxCodeGameStatus (identifier, params) {
  setCookier();
  const url = `/tasks/${identifier}/game_status.json`;
  params = Object.assign({}, params, {withCredentials: true});
  return axios.get(url, {params});
}
