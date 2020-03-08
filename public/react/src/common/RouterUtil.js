import { queryString } from 'educoder'
export function updatePageParams(pageNum, props) {
	const url = props.match.url
	      
  	const _search = props.location.search;
  	let parsed = {};
    if (_search) {
      parsed = queryString.parse(_search);
  	}

  	// 修改page參數
  	parsed.page = pageNum

  	props.history.push(`${url}?${queryString.stringify(parsed)}`)
}
