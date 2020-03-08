import store from 'store'

export function toStore(key, val) {
	let _config = store.get('__ec');
    if (!_config) _config = {};
    _config[key] = val;
    store.set('__ec', _config)
}

export function fromStore(key, defaultVal) {
	let _config = store.get('__ec');
    if (!_config) return defaultVal;
	return _config[key] === undefined ? defaultVal : _config[key];
}