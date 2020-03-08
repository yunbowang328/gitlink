export function bytesToSize(bytes) {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return parseFloat(bytes / Math.pow(1024, i), 2).toFixed(1) + ' ' + sizes[i];
}