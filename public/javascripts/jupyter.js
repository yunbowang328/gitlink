//用于嵌入到jupyter pod中的js
//guange 2019.12.18

var timebool=false;
window.onload=function(){
	console.log("开始发送消息了");
	timebool=true;
	// runEvery10Sec();
}

function runEvery10Sec() {
	// 1000 * 10 = 10 秒钟
	// console.log("每隔10秒中一次");
	require(["base/js/namespace"],function(Jupyter) {
		Jupyter.notebook.save_checkpoint();
	});
	window.parent.postMessage('jupytermessage','*');
	// if(timebool===true){
	// 	setTimeout( runEvery10Sec, 1000 * 10 );
	// }

}

window.onload=function(){

document.addEventListener('keydown', (e) => {
	if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)){
		e.preventDefault();
		console.log("ctrl+s");
		window.parent.postMessage('jupytermessage','*');
	}
});

	window.addEventListener('message', (e) => {
		if(e){
			if(e.data){
				if(e.data==="stopParent"){
					//重置停止
					timebool=false;
					// console.log("父窗口调用停止");
				}else if(e.data==="clonsParent"){
					// console.log("父窗口调用启动");
					//取消启动
					timebool=true;
					// runEvery10Sec();
				}
			}

		}
	});
}
