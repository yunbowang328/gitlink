const queryString = {
	stringify: function(params) {
		let paramsUrl = '';
	  	for (let key in params) {
			// https://stackoverflow.com/questions/6566456/how-to-serialize-an-object-into-a-list-of-url-query-parameters
			if (params[key] != undefined) {
				if (params[key].constructor === Array) {
					for (let singleArrIndex of params[key]) {
						paramsUrl = paramsUrl + key + '[]=' + singleArrIndex + '&'
					}
				} else {
		    		paramsUrl += `${key}=${encodeURIComponent(params[key])}&`
				}
			}
	  	}
	  	if (paramsUrl == '') {
	  		return '';
	  	}
	  	paramsUrl = paramsUrl.substring(0, paramsUrl.length - 1);
	  	return paramsUrl;
	},
	parse: function(search) {
		// ?a=1&b=2
		if (!search) {
			return {}
		}
		if (search.startsWith('?')) {
			search = search.substring(1);
		}
		if (!search) {
			return {}
		}
		const keyValArray = search.split('&');
		const result = {}
		keyValArray.forEach(keyValItem => {
			const keyAndVal = keyValItem.split('=');
			result[keyAndVal[0]] = keyAndVal[1]
		})
		return result;
	}
}
/*	
	query-string用不了

	Failed to minify the code from this file:

	        ./node_modules/_query-string@6.1.0@query-string/index.js:8

	Read more here: http://bit.ly/2tRViJ9
*/
module.exports = queryString
