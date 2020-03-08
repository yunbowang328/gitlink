import React from "react";
import md5 from 'md5';
import {Input} from "antd";
const { Search } = Input;

const $ = window.$;
const isDev = window.location.port == 3007;
export const TEST_HOST = "https://test-newweb.educoder.net"
export function getImageUrl(path) {
	// https://www.educoder.net
	// https://testbdweb.trustie.net
  // const local = 'http://localhost:3000'
  const local = 'https://test-newweb.educoder.net'
	if (isDev) {
		return `${local}/${path}`
	}
	return `/${path}`;
}

export function setImagesUrl(path){
	const local = 'https://test-newweb.educoder.net'
	let firstStr=path.substr(0,1);
	// console.log(firstStr);
	if(firstStr=="/"){
		return isDev?`${local}${path}`:`${path}`;
	}else{
		return isDev?`${local}/${path}`:`/${path}`;
	}
}

export function getUrl(path, goTest) {
	// https://www.educoder.net
	// https://testbdweb.trustie.net

	// 如果想所有url定位到测试版，可以反注释掉下面这行
	//goTest = true
	// testbdweb.educoder.net testbdweb.trustie.net
  // const local = goTest ? 'https://testeduplus2.educoder.net' : 'http://localhost:3000'
  // const local = 'https://testeduplus2.educoder.net'
	const local = 'http://localhost:3007'
	if (isDev) {
		return `${local}${path?path:''}`
	}
	return `${path ? path: ''}`;
}

export function getUrlmys(path, goTest) {
	// https://www.educoder.net
	// https://testbdweb.trustie.net

	// 如果想所有url定位到测试版，可以反注释掉下面这行
	//goTest = true
	// testbdweb.educoder.net testbdweb.trustie.net
	// const local = goTest ? 'https://testeduplus2.educoder.net' : 'http://localhost:3000'
	// const local = 'https://testeduplus2.educoder.net'
	const local = 'https://test-jupyterweb.educoder.net'
	if (isDev) {
		return `${local}${path?path:''}`
	}
	return `${path ? path: ''}`;
}
export function getStaticUrl() {
	const local = TEST_HOST;
	if (isDev) {
		return local
	}
	// todo cdn
	return ''
}
export function getUrl2(path, goTest) {
  	const local = 'http://localhost:3000'
	if (isDev) {
		return `${local}${path?path:''}`
	}
	return `${path ? path: ''}`;
}
const newopens ="79e33abd4b6588941ab7622aed1e67e8";
let newtimestamp;
let checkSubmitFlgs = false;
function railsgettimess(proxy) {
 if(checkSubmitFlgs===false){
		$.ajax({url:proxy,
			async:false,success:function(data){
				if(data.status===0){
					newtimestamp=data.message;
					checkSubmitFlgs = true;
				}
			}})

		window.setTimeout(function () {
			checkSubmitFlgs=false;
		}, 2500);
	}
}




export function Railsgettimes() {
	railsgettimess(`${getUrl()}/api/main/first_stamp.json`);
	// railsgettimess(`https://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp`);
}
export function getmyUrl(geturl) {

	return `${getUrl()}${geturl}`;
}

export function getUploadActionUrl(path, goTest) {
	Railsgettimes()
	let anewopens=md5(newopens+newtimestamp);
	return `${getUrl()}/api/attachments.json${isDev ? `?debug=${window._debugType || 'admin'}&randomcode=${newtimestamp}&client_key=${anewopens}` : `?randomcode=${newtimestamp}&client_key=${anewopens}`}`;
}

export function getUploadActionUrltwo(id) {
	Railsgettimes()
	let anewopens=md5(newopens+newtimestamp);
	return `${getUrlmys()}/api/shixuns/${id}/upload_data_sets.json${isDev ? `?debug=${window._debugType || 'admin'}&randomcode=${newtimestamp}&client_key=${anewopens}` : `?randomcode=${newtimestamp}&client_key=${anewopens}`}`
}

export function getUploadActionUrlthree() {
	Railsgettimes()
	let anewopens=md5(newopens+newtimestamp);
	return `${getUrlmys()}/api/jupyters/import_with_tpm.json${isDev ? `?debug=${window._debugType || 'admin'}&randomcode=${newtimestamp}&client_key=${anewopens}` : `?randomcode=${newtimestamp}&client_key=${anewopens}`}`
}

export function getUploadActionUrlOfAuth(id) {
	Railsgettimes()
	let anewopens=md5(newopens+newtimestamp);
	return `${getUrl()}/api/users/accounts/${id}/auth_attachment.json${isDev ? `?debug=${window._debugType || 'admin'}&randomcode=${newtimestamp}&client_key=${anewopens}` : `?randomcode=${newtimestamp}&client_key=${anewopens}`}`
}

export function getRandomNumber(type) {
	 Railsgettimes()
	let anewopens=md5(newopens+newtimestamp);
	return type===true?`randomcode=${newtimestamp}&client_key=${anewopens}`:`?randomcode=${newtimestamp}&client_key=${anewopens}`
}

export function test(path) {
	return `${path}`;
}

export function toPath(path) {
	window.open(path, '_blank');
}


export function getTaskUrlById(id) {
	return `/tasks/${id}`
}

export function getRandomcode(url) {
	Railsgettimes()
	let anewopens=md5(newopens+newtimestamp);

	if (url.indexOf('?') == -1) {
		return `${url}?randomcode=${newtimestamp}&client_key=${anewopens}`
	}else {
		return `${url}&randomcode=${newtimestamp}&client_key=${anewopens}`
	}

}

export function htmlEncode(str) {
	var s = "";
	if (str.length === 0) {
		return "";
	}
	s = str.replace(/&/g, "&amp;");
	s = s.replace(/</g, "&lt;");
	s = s.replace(/>/g, "&gt;");
	s = s.replace(/ /g, "&nbsp;");
	s = s.replace(/\'/g, "&#39;");//IE下不支持实体名称
	s = s.replace(/\"/g, "&quot;");
	return s;
}

export function publicSearchs(Placeholder,onSearch,onInputs,onChanges,loadings) {
	return(<Search
		placeholder= { Placeholder || "请输入内容进行搜索" }
		onSearch={onSearch}
		// value={searchValue}
		onInput={onInputs}
		onChange={onChanges}
		loading={loadings||false}
		allowClear={true}
	></Search>)
}
