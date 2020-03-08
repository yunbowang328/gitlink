const $ = window.$;
export function trigger(eventName, data) {
	$(window).trigger(eventName, data);
}

export function on(eventName, callback) {
	$(window).on(eventName, (event, data)=>{
		callback && callback(event, data)
	});
}

export function off(eventName) {
	$(window).off(eventName);
}

// https://stackoverflow.com/questions/28230845/communication-between-tabs-or-windows
const broadcastChannelMap = {}

const localStorageMap = {}
function postMessageByLocalStorage(eventName, message) {
	console.log('storage event trigger:', eventName)
	localStorage.setItem(eventName, JSON.stringify(message));
}
function onMessageByLocalStorage(eventName, callback) {
	console.log('storage event register:', eventName)
	localStorageMap[eventName] = callback;
}
window.addEventListener("storage", function(ev) {
	const cb = localStorageMap[ev.key];
	// console.log('storage event:', ev)
	if (cb) {
		cb(JSON.parse(ev.newValue))
	}
});
export function broadcastChannelPostMessage(eventName, message) {
	if (!window.BroadcastChannel) {
		console.error('浏览器不支持BroadcastChannel')

		postMessageByLocalStorage(eventName, message)
		return;
	}
	var bc;
	if (!broadcastChannelMap[eventName]) {
		bc = new window.BroadcastChannel(eventName);
		broadcastChannelMap[eventName] = bc
	} else {
		bc = broadcastChannelMap[eventName]
	}
	bc.postMessage(message); /* send */

}

export function broadcastChannelOnmessage(eventName, callback) {
	if (!window.BroadcastChannel) {
		console.error('浏览器不支持BroadcastChannel')
		onMessageByLocalStorage(eventName, callback)
		return;
	}
	var bc;
	if (!broadcastChannelMap[eventName]) {
		bc = new window.BroadcastChannel(eventName);
		broadcastChannelMap[eventName] = bc	
	} else {
		bc = broadcastChannelMap[eventName]
	}
	bc.onmessage = function (ev) { 
		console.log(ev); 
		callback && callback(ev)
	}
}