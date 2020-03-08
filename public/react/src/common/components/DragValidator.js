import React, { Component } from 'react';

const $ = window.jQuery
const jQuery = $;
// if () {
// !$.drag
  // (function($){
  //   $.fn.dragValidator = function(options){
  //       var x, drag = this, isMove = false, defaults = {
  //       };
  //       var options = $.extend(defaults, options);
  //       //添加背景，文字，滑块
  //       var html = '<div class="drag_bg"></div>'+
  //           '<div class="drag_text" onselectstart="return false;" unselectable="on">拖动滑块验证</div>'+
  //           '<div class="handler handler_bg"></div>';
  //       this.append(html);
	//
  //       var handler = drag.find('.handler');
  //       var drag_bg = drag.find('.drag_bg');
  //       var text = drag.find('.drag_text');
  //       var maxWidth = text.width() - handler.width();  //能滑动的最大间距
  //       //鼠标按下时候的x轴的位置
  //       handler.mousedown(function(e){
  //           isMove = true;
  //           x = e.pageX - parseInt(handler.css('left'), 10);
  //       });
	//
  //       //鼠标指针在上下文移动时，移动距离大于0小于最大间距，滑块x轴位置等于鼠标移动距离
  //       $(document).mousemove(function(e){
  //           var _x = e.pageX - x;
  //           var handler_offset = handler.offset();
  //           var lastX = e.clientX -x;
  //           lastX = Math.max(0,Math.min(maxWidth,lastX));
  //           if(isMove){
  //               if(_x > 0 && _x <= maxWidth){
  //                   handler.css({'left': lastX});
  //                   drag_bg.css({'width': lastX});
  //               }
  //               else if(lastX > maxWidth - 5 && lastX < maxWidth + 5 ){  //鼠标指针移动距离达到最大时清空事件
  //                   dragOk();
	//
  //               }
  //           }
  //       });
  //       handler.mouseup(function(e){
  //           isMove = false;
  //           var _x = e.pageX - x;
  //           if(text.text() != '验证通过' && _x < maxWidth){ //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
  //               handler.animate({'left': 0});
  //               drag_bg.animate({'width': 0});
  //           }
  //       });
	//
  //       //清空事件
  //       function dragOk(){
  //           options.dragOkCallback && options.dragOkCallback()
  //           var kuaiwidth=drag.width() - handler.width() - 2;
  //           handler.removeClass('handler_bg').addClass('handler_ok_bg');
  //           handler.css({'left':kuaiwidth+'px'})
  //           text.css({'width':kuaiwidth+'px'});
  //           text.text('验证通过');
  //           drag.css({'color': '#fff'});
  //           drag_bg.css({'width':kuaiwidth+'px'})
  //           handler.unbind('mousedown');
  //           $(document).unbind('mousemove');
  //           $(document).unbind('mouseup');
  //           $("#user_verification_notice").html("");
  //           $('#user_verification_notice').parent().hide();
  //       }
  //   };
  // })(jQuery);
// }

class DragValidator extends Component {
  componentDidMount () {
    // if($("#reg-drag").length>0 && IsPC()){
    // $("#reg-drag").dragValidator({
    //   height: this.props.height,
    //   dragOkCallback: () => {
    //     this.props.dragOkCallback && this.props.dragOkCallback()
    //   }
    // });
    // }else{
    //     $("#reg-drag").empty();
    // }
  }
  empty() {
    // $("#reg-drag").empty();
  }
  render() {
    const height =  this.props.height || 45;
    const className =  this.props.className
    const successGreenColor = this.props.successGreenColor || '#29bd8b'
    // newMain clearfix
    return (
      <div id="reg-drag" style={{	width:"287px",}} className={`drag_slider ${className}`}>
        <style>{`
          .drag_slider .handler {
            height: 100%;
          }
          .drag_slider {
            height: ${height}px;
            line-height: ${height}px;
          }
          .drag_slider .drag_bg {
            height: ${height}px;
            background-color: ${successGreenColor};
          }
        `}</style>
      
      </div>
    );
  }
}

export default  ( DragValidator );