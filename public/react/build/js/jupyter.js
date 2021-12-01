/*
 * @Author: your name
 * @Date: 2019-12-20 11:40:56
 * @LastEditTime : 2019-12-20 13:38:49
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /notebook/Users/yangshuming/Desktop/new__educode/educoder/public/react/public/js/jupyter.js
 */
 window.onload=function(){
  require(["base/js/namespace"],function(Jupyter) {
    Jupyter.notebook.save_checkpoint();
  });
  
}



// //子目标父窗口接收子窗口发送的消息
// let message =  {type: 'open', link:'需要发送的消息'};
//子窗口向父窗口发送消息，消息中包含我们想跳转的链接
window.parent.postMessage('jupytermessage','需要发送的消息');



  // //目标父窗口接收子窗口发送的消息
  // window.addEventListener('message', (e)=>{
  //   let origin = event.origin || event.originalEvent.origin;
  //   if (origin !== '需要发送的消息') {
  //     return;
  //   }else {
  //   //更换iframe的src,实现iframe页面跳转
  //    执行方法
  //   }
  // },false);

