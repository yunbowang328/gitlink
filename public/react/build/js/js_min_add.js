// 记录手动加到js_min_all.js中的脚本
// js_min_all_2是js_min_all的混淆后版本


// codemirror 已经加载了，codemirror会有插件，重复加载会使得之前加载的插件失效
// editormd.loadScript(loadPath + "codemirror/codemirror.min", function() {

 // codemirror 已经加载了
 // editormd.loadCSS(loadPath + "codemirror/codemirror.min");

 // active-line    application.js部分   弹框 ke自动保存等


// ----------------------------- ----------------------------- active-line.js
(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";
  var WRAP_CLASS = "CodeMirror-activeline";
  var BACK_CLASS = "CodeMirror-activeline-background";
  var GUTT_CLASS = "CodeMirror-activeline-gutter";

  CodeMirror.defineOption("styleActiveLine", false, function(cm, val, old) {
    var prev = old == CodeMirror.Init ? false : old;
    if (val == prev) return
    if (prev) {
      cm.off("beforeSelectionChange", selectionChange);
      clearActiveLines(cm);
      delete cm.state.activeLines;
    }
    if (val) {
      cm.state.activeLines = [];
      updateActiveLines(cm, cm.listSelections());
      cm.on("beforeSelectionChange", selectionChange);
    }
  });

  function clearActiveLines(cm) {
    for (var i = 0; i < cm.state.activeLines.length; i++) {
      cm.removeLineClass(cm.state.activeLines[i], "wrap", WRAP_CLASS);
      cm.removeLineClass(cm.state.activeLines[i], "background", BACK_CLASS);
      cm.removeLineClass(cm.state.activeLines[i], "gutter", GUTT_CLASS);
    }
  }

  function sameArray(a, b) {
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; i++)
      if (a[i] != b[i]) return false;
    return true;
  }

  function updateActiveLines(cm, ranges) {
    var active = [];
    for (var i = 0; i < ranges.length; i++) {
      var range = ranges[i];
      var option = cm.getOption("styleActiveLine");
      if (typeof option == "object" && option.nonEmpty ? range.anchor.line != range.head.line : !range.empty())
        continue
      var line = cm.getLineHandleVisualStart(range.head.line);
      if (active[active.length - 1] != line) active.push(line);
    }
    if (sameArray(cm.state.activeLines, active)) return;
    cm.operation(function() {
      clearActiveLines(cm);
      for (var i = 0; i < active.length; i++) {
        cm.addLineClass(active[i], "wrap", WRAP_CLASS);
        cm.addLineClass(active[i], "background", BACK_CLASS);
        cm.addLineClass(active[i], "gutter", GUTT_CLASS);
      }
      cm.state.activeLines = active;
    });
  }

  function selectionChange(cm, sel) {
    updateActiveLines(cm, sel.ranges);
  }
});

// --------------------------------------------------------------------------------------
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
// ----------------------------- ----------------------------- active-line.js  END


// ------------------------------------------- application.js到最底部
//自动保存草稿
var editor2;
function elocalStorage(editor,mdu,id){
    if (window.sessionStorage){
        editor2 = editor;
        var oc = window.sessionStorage.getItem('content'+mdu);
        if(oc !== null ){
            var h = '您上次有已保存的数据，是否<a style="cursor: pointer;" class="color-orange05" onclick="rec_data(\'content\',\''+ mdu + '\',\'' + id + '\')">恢复</a> ? / <a style="cursor: pointer;" class="color-orange05" onclick="clear_data(\'content\',\''+ mdu + '\',\'' + id + '\')">不恢复</a>';
            $("#e_tips_"+id).html(h);
        }
        setInterval(function() {
            d = new Date();
            var h = d.getHours();
            var m = d.getMinutes();
            var s = d.getSeconds();
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            editor.sync();
            if(!editor.isEmpty()){
                add_data("content",mdu,editor.html());
                var id1 = "#e_tip_"+id;
                var id2 = "#e_tips_"+id;
                $(id1).html(" 数据已于 " + h + ':' + m + ':' + s +" 保存   ");
                $(id2).html("");
            }
        },10000);

    }else{
        $('.ke-edit').after('您的浏览器不支持localStorage.无法开启自动保存草稿服务,请升级浏览器！');
    }
}

function add_data(k,mdu,d){
    window.sessionStorage.setItem(k+mdu,d);
}

// 公共弹框样式
// 建议左右栏的：Width：460，Height：190
// 建议宽屏对应值：Width：760，Height：500
function pop_box_new(value, Width, Height){
    if($("#popupAll").length > 0){
        $("#popupAll").remove();
    }
    w = ($(window).width() - Width)/2;
    h = ($(window).height() - Height)/2;
    var html="<div class=\"popupAll none\" id='popupAll'><div class=\"pr\"><div id=\"popupWrap\"></div></div></div>";
    $(document.body).append(html);
    $("#popupWrap").html(value);
    $('#popupWrap').css({"top": h+"px","left": w+"px","padding":"0","border":"none","position":"fixed","z-index":"99999","background-color":"#fff","border-radius":"10px"});
    $("#popupWrap").parent().parent().show();
    $('#popupWrap').find("a[class*='pop_close']").click(function(){
        $("#popupAll").hide();
    });
//    w = ($(window).width() - Width)/2;
//    h = ($(window).height() - Height)/2;
//    $("#ajax-modal").html(value);
//    showModal('ajax-modal', Width + 'px');
//    $('#ajax-modal').siblings().remove();
//    $('#ajax-modal').parent().css({"top": h+"px","left": w+"px","padding":"0","border":"none","position":"fixed"});
//    $('#ajax-modal').parent().removeClass("resourceUploadPopup popbox_polls popbox");
//    $('#ajax-modal').css({"padding":"0","overflow":"hidden"});
//    $('#ajax-modal').parent().attr("id","popupWrap");

    //拖拽
    function Drag(id) {
        this.div = document.getElementById(id);
        if (this.div) {
            this.div.style.cursor = "move";
            this.div.style.position = "fixed";
        }
        this.disX = 0;
        this.disY = 0;
        var _this = this;
        this.div.onmousedown = function (evt) {
            _this.getDistance(evt);
            document.onmousemove = function (evt) {
                _this.setPosition(evt);
            };
            _this.div.onmouseup = function () {
                _this.clearEvent();
            }
        }
    }
    Drag.prototype.getDistance = function (evt) {
        var oEvent = evt || event;
        this.disX = oEvent.clientX - this.div.offsetLeft;
        this.disY = oEvent.clientY - this.div.offsetTop;
    };
    Drag.prototype.setPosition = function (evt) {
        var oEvent = evt || event;
        var l = oEvent.clientX - this.disX;
        var t = oEvent.clientY - this.disY;
        if (l <= 0) {
            l = 0;
        }
        else if (l >= document.documentElement.clientWidth - this.div.offsetWidth) {
            l = document.documentElement.clientWidth - this.div.offsetWidth;
        }
        if (t <= 0) {
            t = 0;
        }
        else if (t >= document.documentElement.clientHeight - this.div.offsetHeight) {
            t = document.documentElement.clientHeight - this.div.offsetHeight;
        }
        this.div.style.left = l + "px";
        this.div.style.top = t + "px";
    };
    Drag.prototype.clearEvent = function () {
        this.div.onmouseup = null;
        document.onmousemove = null;
    };

    new Drag("popupWrap");

    $("#popupWrap input, #popupWrap textarea, #popupWrap ul, #popupWrap a").mousedown(function(event){
        event.stopPropagation();
        new Drag("popupWrap");
    });
}
function sure_box_redirect_btn(url, str,btnstr){
    var htmlvalue = '<div class="task-popup" style="width:480px;"><div class="task-popup-title clearfix"><h3 class="fl color-grey3">提示</h3></div>'+
        '<div class="task-popup-content"><p class="task-popup-text-center font-16">' + str + '</p></div><div class="task-popup-OK clearfix">'+
        '<a href="'+ url +'" class="task-btn task-btn-orange" onclick="hideModal();" target="_blank">'+btnstr+'</a></div></div>';
    pop_box_new(htmlvalue, 480, 160);
}
function sure_box_redirect_btn2(url, str, btnstr){
    var htmlvalue = '<div class="task-popup" style="width:500px;"><div class="task-popup-title clearfix"><h3 class="fl color-grey3">提示</h3><a href="javascript:void(0);" class="pop_close"><i class="fa fa-times-circle font-18 link-color-grey fr mt5"></i></a></div>'+
        '<div class="task-popup-content"><p class="task-popup-text-center font-16">' + str + '</p></div><div class="task-popup-submit clearfix" style="width: 150px"><a href="javascript:void(0);" onclick="hideModal();" class="task-btn fl">取消</a>'+
        '<a href="'+ url +'" class="task-btn task-btn-orange fr" target="_blank" onclick="hideModal();">'+btnstr+'</a></div></div>';
    pop_box_new(htmlvalue, 578, 205);
}

function op_confirm_box_loading(url, str){
    var htmlvalue = '<div class="task-popup" style="width:578px;"><div class="task-popup-title clearfix"><h3 class="fl color-grey3">提示</h3><a href="javascript:void(0);" class="pop_close"><i class="fa fa-times-circle font-18 link-color-grey fr mt5"></i></a></div>'+
        '<div class="task-popup-content"><p class="task-popup-text-center font-16 pt15">' + str + '</p></div><div class="task-popup-submit clearfix"><a href="javascript:void(0);" onclick="hideModal();" class="task-btn fl">取消</a>'+
        '<a href="'+ url +'" class="task-btn task-btn-orange fr" onclick="hideModal();$(\'.loading_all\').show();">确定</a></div></div>';
    pop_box_new(htmlvalue, 578, 205);
}

//点击删除时的确认弹框: 走destroy方法,remote为true
function delete_confirm_box_2(url, str){
    var htmlvalue = '<div class="task-popup" style="width:480px;"><div class="task-popup-title clearfix"><h3 class="fl color-grey3">提示</h3><a href="javascript:void(0);" class="pop_close"><i class="fa fa-times-circle font-18 link-color-grey fr mt5"></i></a></div>'+
        '<div class="task-popup-content"><p class="task-popup-text-center font-16">' + str + '</p></div><div class="task-popup-submit clearfix"><a href="javascript:void(0);" onclick="hideModal();" class="task-btn fl">取消</a>'+
        '<a href="'+ url +'" class="task-btn task-btn-orange fr pop_close" data-method="delete" data-remote="true">确定</a></div></div>';
    pop_box_new(htmlvalue, 480, 160);
}


//提示框：只有一个确定按钮，点击关闭弹框
//<a href="javascript:void(0);" class="pop_close"><i class="fa fa-times-circle font-18 link-color-grey fr mt5"></i></a>
function notice_box(str){
    var htmlvalue = '<div class="task-popup" style="width:480px;"><div class="task-popup-title clearfix"><h3 class="fl color-grey3">提示</h3></div>'+
        '<div class="task-popup-content"><p class="task-popup-text-center font-16">' + str + '</p></div><div class="task-popup-sure clearfix">'+
        '<a href="javascript:void(0);" class="task-btn task-btn-orange" onclick="hideModal();">确定</a></div></div>';
    pop_box_new(htmlvalue, 480, 160);
}


function hideModal(el) {
    if($("#popupAll").length > 0){
        $("#popupAll").remove();
    }
    else{
        var modal;
        if (el) {
            modal = $(el).parents('.ui-dialog-content');
        } else {
            modal = $('#ajax-modal');
        }
        modal.dialog("close");
    }


}


// --------------------------------------------
function is_cdn_link(contents){
        if(contents.indexOf("http") != -1
                || contents.indexOf("com") != -1
                || contents.indexOf("net") != -1
                || contents.indexOf("org") != -1
                || contents.indexOf("cdn") != -1){
            return true;
        }else{
            return false;
        }
    }
 // 渲染用户的HTML的CODE。
function tpi_html_show(){
    //$($(".blacktab_con")[0]).trigger("click");
    var contents = editor_CodeMirror.getValue();
    var $htmlForm = $("#html_form");
    var src = contents;
    var arrCSS =[];
    var arrSript = [];
    var patternLink = /<link(?:.*?)href=[\"\‘](.+?)[\"\‘](?!<)(?:.*)\>(?:[\n\r\s]*?)(?:<\/link>)*/im;
    var patternScript = /<script(?:.*?)src=[\"\‘](.+?)[\"\‘](?!<)(?:.*)\>(?:[\n\r\s]*?)(?:<\/script>)*/im;
    var arrayMatchesLink = patternLink.exec(src);
    var arrayMatchesScript = patternScript.exec(src);

    // css部分
    while(arrayMatchesLink != null){
        if(is_cdn_link(arrayMatchesLink[1])){
            src = src.replace(arrayMatchesLink[0], arrayMatchesLink[0].replace(/link/, "edulink"));
        }else{
            src = src.replace(patternLink, "EDUCODERCSS");
            arrCSS.push(arrayMatchesLink[1]);
        }
        arrayMatchesLink = patternLink.exec(src);
    }
    // js部分
    while(arrayMatchesScript != null){
        if(is_cdn_link(arrayMatchesScript[1])){
            src = src.replace(arrayMatchesScript[0], arrayMatchesScript[0].replace(/script/g,"w3scrw3ipttag"));
        }else{
            src = src.replace(patternScript, "EDUCODERJS");
            arrSript.push(arrayMatchesScript[1]);
        }
        arrayMatchesScript = patternScript.exec(src);
    }
    // html部分 为了防止xss攻击，先将敏感字符转换
    src = src.replace(/=/gi,"w3equalsign").replace(/script/gi,"w3scrw3ipttag");

    $("#data_param").val(src);
    $("#data_css_param").val(arrCSS);
    $("#data_js_param").val(arrSript);
    $htmlForm.attr("action", "/iframes/html_content?gpid="+ __myshixun.gpid );
    $htmlForm.submit();
}
// 渲染用户的HTML的CODE。--------------------------------------------END