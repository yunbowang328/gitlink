// 实训游戏需要的js功能
var EXPAND = 0; // 放大
var SHRINK = 1; // 缩小

var repositoryTabHeight = 40

$(function(){
    function update_rows_and_cols(rows) {
        var _iframe = document.getElementById("game_webssh");
        if(_iframe == null || _iframe == undefined || _iframe == ""){
            return;
        }
        _iframe.contentWindow.postMessage({tp: 'resize', rows: rows, cols: 0}, "https://webssh.educoder.net");
    }
    window.top.__updateWebsshRows = update_rows_and_cols

    // TPI拖拽功能  begin
    var doc = $(document);
    var lab = $(".b-label");
    var cen = $(".h-center");
    var nextW2,nextW1;
    var dragging  = false;
    var flag = false;
    var wrapWidth;
    var wrapHeight;
    var nRow = 0;
    //var nCol = 0;
    lab.live('mousedown touchstart',function(){
            $('#game_webssh').css('pointer-events', 'none')
            dragging   = true;
            leftOffset = $(".labelN").offset().left;
            wrapWidth = $(".labelN").width();
            return false;
        }
    );
    cen.live('mousedown',function(){
            // 使得iframe不捕获事件
            $('#game_webssh').css('pointer-events', 'none')
            flag   = true;
            topOffset = $(".centerH").offset().top;
            wrapHeight = $(".centerH").height();
            return false;
        }
    );
    
    // react add TODO react加载完dom再执行
    setTimeout(function(){
        $('.CodeMirror.cm-s-railscasts').css("height", $("#games_repository_contents").height() - repositoryTabHeight);
    }, 800)
    
    // window resize
    $(window).on('resize', function() {
        $('.CodeMirror.cm-s-railscasts').css("height", $("#games_repository_contents").height() - repositoryTabHeight);
    })

    var FF = !(window.mozInnerScreenX == null);
    var websshLineHeight = FF ? 19 : 18

    doc.live('mousemove touchmove',function(e){

        $(".-brother").show();// 代码行的遮罩显示
        if(dragging) {
            clickX = e.pageX || e.originalEvent.touches[0].pageX;;
            if(clickX > leftOffset+0&&clickX<leftOffset+1600) {
                //console.log(1);
                lab.css('left', clickX - 7 - leftOffset + 'px');
                $("#game_left_contents").width( clickX-leftOffset + 'px');
                nextW2 = clickX-leftOffset;
                $("#game_right_contents").width( wrapWidth - nextW2  + 'px');
                //console.log(lab.next().width());
            } else {
                lab.css('left', '0px');
            }
        }
        if(flag){
            clickY = e.pageY;
            if(clickY > topOffset +100) {
                cen.css('top', clickY - 7 - topOffset + 'px');
                $("#games_repository_contents").height( clickY-topOffset + 'px');

                // react add
                $('.CodeMirror.cm-s-railscasts')
                    .css("height", clickY- topOffset - repositoryTabHeight - $('#games_repository_contents .codePath').height() - 12);

                nextW1 = clickY-topOffset;
                $("#games_valuation_contents").height( wrapHeight - nextW1  + 'px');
                var h = $("#games_repository_contents").height() - $("#top_repository").height() - 50;
                var m = $("#games_repository_contents").height() - 50;
                var w = $("#games_repository_contents").width();
                $(".game_webssh").css("min-height", m);
                $(".game_webssh").css("max-height", m);
                // 火狐下行高为19

                var rows = Math.floor(m / websshLineHeight);
                //var cols = parseInt(w / 6.2);
                $("#file_entry_content").find(".CodeMirror-scroll").css("min-height", h);
                $("#file_entry_content").find(".CodeMirror-scroll").css("max-height", h);
            } else {
                cen.css('top', '0px');
            }
            // 行高发生变化，则调整webssh的term的高度
            if(nRow != rows){
                //window.frames['game_webssh'].contentWindow.resizeTerminal({rows:rows});
                update_rows_and_cols(rows);
                nRow = rows;
            }else{
                nRow = rows;
            }
        }
    });

    doc.live("mouseup touchend", function(e) {
        // 使得iframe可以继续捕获事件
        $('#game_webssh').css('pointer-events', 'inherit')
        flag = false;
        dragging = false;
        e.cancelBubble = true;
        $(".-brother").hide(); // 代码行的遮罩隐藏
    });

    window.__tpiOnResize = function() {
        var m = $("#games_repository_contents").height() - 50;
        $(".game_webssh").css("min-height", m);
        $(".game_webssh").css("max-height", m);
        
        var _iframe = document.getElementById("game_webssh");
        if(!_iframe){
            return;
        }
        var FF = !(window.mozInnerScreenX == null);
        var websshLineHeight = FF ? 19 : 18
        var m = $("#games_repository_contents").height() - 50;
        var rows = Math.floor(m / websshLineHeight);
        window.top.__updateWebsshRows && window.top.__updateWebsshRows(rows)
    }
    // end;
   //解決IE瀏覽器大小改變時webssh佈局變亂。
    window.onresize = function(){
        __tpiOnResize()
    }
    // 评论区域的回复按钮
    function reply_to_dis(id, name){
        $("#comment_news").attr("placeholder", "回复"+name+":");
        $("#dis_reply_id").val(id);
        $("#comment_news").focus();
    }
    // end
    // 点击全部任务向右侧展开
    $("#all_task_show").on("click", function(e){
        c = 0;
        $("#all_task_tab").removeClass('leftnav-active');
        $("#all_task_show").css("background","rgba(0,0,0,0)");
        $("#all_task_index").css("left", 0).stop().animate({
            left: "-505px"
        }, 400, function(){
            $("#all_task_show").hide();
            fadein = 0;
        });
    });
    // end

    // 列表区域阻止事件冒泡
    $("#all_task_index").on("click", function(e){
        e.stopPropagation();
    });
    // end

    // 下一关增加loading效果
    $("#next_step").live("click", function(){
        nNext = $("#next_step_area");
        html = "<a href='javascript:void(0);' class='task-btn mr15 mt8'>下一关<img src='/images/bigdata/loading2.svg' style='width:25px;float:left;margin-top: 3px' /></a>";
        nNext.html(html);
    });
    // end

    // 上一关增加loading效果
    $("#prev_step").live("click", function(){
        nNext = $("#prev_step_area");
        html = "<a href='javascript:void(0);' class='task-btn mr15 mt8'>上一关<img src='/images/bigdata/loading2.svg' style='width:25px;float:left;margin-top: 3px' /></a>";
        nNext.html(html);
    });
    // end

});

// 查看参考答案
function open_answer(game, myshixun, choose){
    $.ajax({
        url: "/myshixuns/" + myshixun + "/stages/" + game + "/answer",
        data:{choose: choose},
        dataType: "script"
    })
}

// 选择题选择答案
function choice_answer(st, nThis){
    if(st == "2"){
        //$(nThis).hasClass("card-check") ? $(nThis).removeClass("card-check") : $(nThis).addClass("card-check");
        $(nThis).toggleClass("card-check");
        $(nThis).toggleClass("color_white");
    } else if (st == "1"){
        var choice = $(".color_white");
        choice.removeClass("card-check");
        choice.removeClass("color_white");
        $(nThis).addClass("card-check");
        $(nThis).toggleClass("color_white");
    }
}
// end

// 评测区域点击TAB切换样式
function check_tab(allClassName,addClassName,item){
    //点击tab添加样式
    $("."+allClassName).removeClass(addClassName);
    $(item).addClass(addClassName);
    //获取当前点击的tab的索引位置
    var index=$(item).index()+1;
    //显示或隐藏对应的内容块
    $("#"+allClassName+"_"+index).siblings().addClass("undis");
    $("#"+allClassName+"_"+index).removeClass("undis");
}
// end

// 选择题公开的测试集允许展开与隐藏
function toggle_test_case_choose(t_case, id){
    if(true){
        var nTest = $("#test_case_"+id).parent().prev(".-task-ces-top").children("i:first-child"); //图标节点
        if (nTest.hasClass("fa-caret-down")){
            nTest.addClass("fa-caret-right");
            nTest.removeClass("fa-caret-down");
        }else if( nTest.hasClass("fa-caret-right") ){
            nTest.addClass("fa-caret-down");
            nTest.removeClass("fa-caret-right");
        }
        $("#test_case_"+id).toggle();
    }
}

// 公开的测试集允许展开与隐藏
var dv;
function toggle_test_case(open, output, actual_output, id, power){
    var base64 = new Base64();
    output = base64.decode(output);
    actual_output = base64.decode(actual_output);
    actual_output = actual_output.replace(/\\r\\n/g, "\r\n").replace(/\\r/g, "\r").replace(/\\n/g, "\n").replace(/\\t/g,"\t").replace(/<\/\/script>/g, "</script>");
    output = output.replace(/\\r\\n/g, "\r\n").replace(/\\r/g, "\r").replace(/\\n/g, "\n").replace(/\\t/g,"\t");
    if(true){
        var nTest = $("#test_case_"+id).parent().prev(".-task-ces-top").children("i:first-child"); //图标节点
        if (nTest.hasClass("fa-caret-down")){
            nTest.addClass("fa-caret-right");
            nTest.removeClass("fa-caret-down");
            $("#result_different_show_"+ id).siblings(".-task-ces-info").attr("style","display:none");
            $("#result_different_show_"+ id).hide();
            $("#test_case_"+id).hide();
        }else if( nTest.hasClass("fa-caret-right") ){
            nTest.addClass("fa-caret-down");
            nTest.removeClass("fa-caret-right");
            $("#result_different_show_"+ id).show();
            $("#test_case_"+id).show();
            $("#result_different_show_"+ id).siblings(".-task-ces-info").attr("style","display:block");
            if(open == 1 || power){
                var id    = "result_different_show_" + id;
                //var oldData = "摄氏温度\t\t华氏温度\n********************\n\n-40 \t\t -40.0\n-35 \t\t -31.0\n-30 \t\t -22.0\n-25 \t\t -13.0\n-20 \t\t -4.0\n-15 \t\t 5.0\n-10 \t\t 14.0\n-5 \t\t 23.0\n0 \t\t 32.0\n5 \t\t 41.0\n10 \t\t 50.0\n15 \t\t 59.0\n20 \t\t 68.0\n25 \t\t 77.0\n30 \t\t 86.0\n35 \t\t 95.0\n40 \t\t 104.0\n45 \t\t 113.0\n50 \t\t 122.0\n\n***********************\n\n[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300]\n\n***********************\n5050 \t\t 5050\n\n***********************\n\n265252859812191058636308480000000\n\n***********************\n\nFalse\nFalse\nFalse\nFalse\nTrue\nTrue\nFalse\nFalse\nFalse\nTrue\n\n***********************\n\n3339 \t\t 333.9\n";
                var oldData = output;
                var orig1 = '';
                var newData = actual_output == "null" ? "" : actual_output;
                //var newData = "摄氏温度\t\t华氏温度\n********************\n-40 \t\t -40.0\n-35 \t\t -31.0\n-30 \t\t -22.0\n-25 \t\t -13.0\n-20 \t\t -4.0\n-15 \t\t 5.0\n-10 \t\t 14.0\n-5 \t\t 23.0\n0 \t\t 32.0\n5 \t\t 41.0\n10 \t\t 50.0\n15 \t\t 59.0\n20 \t\t 68.0\n25 \t\t 77.0\n30 \t\t 86.0\n35 \t\t 95.0\n40 \t\t 104.0\n45 \t\t 113.0\n50 \t\t 122.0\n\n***********************\n\n[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300]\n\n***********************\n\n5050 \t\t 5050\n\n***********************\n\n265252859812191058636308480000000\n\n***********************\n\nFalse\nFalse\nFalse\nFalse\nTrue\nTrue\nFalse\nFalse\nFalse\nTrue\n\n***********************\n\n3339333.9\n";
                var mv = CodeMirror.k_init(id, newData, oldData);
                if (newData == ""){
                    $(".CodeMirror-merge-r-chunk").css("background", "none");
                    $(".CodeMirror-merge-r-inserted").css("background-image", "none");
                    //$(".CodeMirror-merge-copy").find('i').remove();
                }
                var height=0;
                if($("#"+id).find(".CodeMirror-merge-pane").eq(0).height()>$("#"+id).find(".CodeMirror-merge-pane").eq(1).height()){
                    height = parseInt($("#"+id).find(".CodeMirror-merge-pane").eq(0).height());
                }else{
                    height = parseInt($("#"+id).find(".CodeMirror-merge-pane").eq(1).height());
                }

                $("#"+id).find(".CodeMirror").height(height);
                $(".CodeMirror-merge-gap").css("height", height);
                $(".CodeMirror-merge-gap").find("svg").css("height", height);
            }

        }
    }
}
// end

// codemirror渲染textarea
function CodeMirror_fromTextArea(id){
    var Code = CodeMirror.fromTextArea(document.getElementById(id), {
        /*        mode: {name: "text/x-c++src",
         // version: 2,
         singleLineStringErrors: false},*/   // 目前补全js是引入的javascript-hint,因此目前不能指定语言
        lineNumbers: true,
        theme: "railscasts",
        // extraKeys: {"Ctrl-Q": "autocomplete"}, // 快捷键
        indentUnit: 4, //代码缩进为一个tab的距离
        matchBrackets: true,
        autoRefresh: true,
        smartIndent: true,//智能换行
        extraKeys: {"Ctrl-Q": "autocomplete"},
        autofocus: true,
        styleActiveLine: true,
        lint: true,
        gutters: ["CodeMirror-linenumbers", "breakpoints"]
    });
    return Code;
}
// end

var control   = 0;                                                   // 版本库控制 0表示点击放大 1表示点击缩小
var control_1 = 0;                                                   // 测评控制 0表示点击放大 1表示点击缩小
// 版本库的放大与缩小
function repository_extend_and_zoom(){
    var nGameRes  = $("#games_repository_contents");                     // 版本库区域
    var nGameEva  = $("#games_valuation_contents");                      // 评测区域
    var nRIcon    = $("#extend_and_zoom").children("i");                 // 版本库放大缩小按钮
    var nCode     = $("#file_entry_content").find(".CodeMirror-scroll"); // 版本库代码区域
    var nMove     = $(".h-center");
    if(control == 0){
        nGameRes.addClass("-flex-basic100");
        nGameEva.addClass("-flex-basic0");
        nRIcon.addClass("fa-compress");
        nRIcon.removeClass("fa-expand");
        $("#extend_and_zoom").attr("data-tip-left","收起");
        nMove.hide();
        control = 1;
    }else if(control == 1){
        nGameRes.removeClass("-flex-basic100");
        nGameEva.removeClass("-flex-basic0");
        nRIcon.removeClass("fa-compress");
        nRIcon.addClass("fa-expand");
        $("#extend_and_zoom").attr("data-tip-left","展开");
        nMove.show();
        control = 0;
    }
    // react环境下没有window['editor_CodeMirror']
    window['editor_CodeMirror'] && editor_CodeMirror.setSize("auto", "auto");
    // react add
    $('.CodeMirror.cm-s-railscasts').css("height", $("#games_repository_contents").height() - repositoryTabHeight);

    var h = nGameRes.height() - $("#top_repository").height() - 50;
    nCode.css("min-height", h);

}
// end

/*CodeMirror addon hint -----------------------------------------------Start*/ 
/* https://github.com/farzher/fuzzysort */ 
!function(e,r){"function"==typeof define&&define.amd?define([],r):"object"==typeof module&&module.exports?module.exports=r():e.fuzzysort=r()}(this,function(){var e="undefined"!=typeof require&&"undefined"==typeof window,r=new Map,n=new Map,o=[];o.total=0;var t=[],i=[];function a(){r.clear(),n.clear(),t=[],i=[]}function l(e){for(var r=-9007199254740991,n=e.length-1;n>=0;--n){var o=e[n];if(null!==o){var t=o.score;t>r&&(r=t)}}return-9007199254740991===r?null:r}function f(e,r){var n=e[r];if(void 0!==n)return n;var o=r;Array.isArray(r)||(o=r.split("."));for(var t=o.length,i=-1;e&&++i<t;)e=e[o[i]];return e}function u(e){return"object"==typeof e}var s=function(){var e=[],r=0,n={};function o(){for(var n=0,o=e[n],t=1;t<r;){var i=t+1;n=t,i<r&&e[i].score<e[t].score&&(n=i),e[n-1>>1]=e[n],t=1+(n<<1)}for(var a=n-1>>1;n>0&&o.score<e[a].score;a=(n=a)-1>>1)e[n]=e[a];e[n]=o}return n.add=function(n){var o=r;e[r++]=n;for(var t=o-1>>1;o>0&&n.score<e[t].score;t=(o=t)-1>>1)e[o]=e[t];e[o]=n},n.poll=function(){if(0!==r){var n=e[0];return e[0]=e[--r],o(),n}},n.peek=function(n){if(0!==r)return e[0]},n.replaceTop=function(r){e[0]=r,o()},n},p=s();return function d(c){var g={single:function(e,r,n){return e?(u(e)||(e=g.getPreparedSearch(e)),r?(u(r)||(r=g.getPrepared(r)),((n&&void 0!==n.allowTypo?n.allowTypo:!c||void 0===c.allowTypo||c.allowTypo)?g.algorithm:g.algorithmNoTypo)(e,r,e[0])):null):null},go:function(e,r,n){if(!e)return o;var t=(e=g.prepareSearch(e))[0],i=n&&n.threshold||c&&c.threshold||-9007199254740991,a=n&&n.limit||c&&c.limit||9007199254740991,s=(n&&void 0!==n.allowTypo?n.allowTypo:!c||void 0===c.allowTypo||c.allowTypo)?g.algorithm:g.algorithmNoTypo,d=0,v=0,h=r.length;if(n&&n.keys)for(var w=n.scoreFn||l,x=n.keys,y=x.length,m=h-1;m>=0;--m){for(var T=r[m],k=new Array(y),b=y-1;b>=0;--b)(_=f(T,B=x[b]))?(u(_)||(_=g.getPrepared(_)),k[b]=s(e,_,t)):k[b]=null;k.obj=T;var I=w(k);null!==I&&(I<i||(k.score=I,d<a?(p.add(k),++d):(++v,I>p.peek().score&&p.replaceTop(k))))}else if(n&&n.key){var B=n.key;for(m=h-1;m>=0;--m)(_=f(T=r[m],B))&&(u(_)||(_=g.getPrepared(_)),null!==(C=s(e,_,t))&&(C.score<i||(C={target:C.target,_targetLowerCodes:null,_nextBeginningIndexes:null,score:C.score,indexes:C.indexes,obj:T},d<a?(p.add(C),++d):(++v,C.score>p.peek().score&&p.replaceTop(C)))))}else for(m=h-1;m>=0;--m){var _,C;(_=r[m])&&(u(_)||(_=g.getPrepared(_)),null!==(C=s(e,_,t))&&(C.score<i||(d<a?(p.add(C),++d):(++v,C.score>p.peek().score&&p.replaceTop(C)))))}if(0===d)return o;var A=new Array(d);for(m=d-1;m>=0;--m)A[m]=p.poll();return A.total=d+v,A},goAsync:function(r,n,t){var i=!1,a=new Promise(function(a,p){if(!r)return a(o);var d=(r=g.prepareSearch(r))[0],v=s(),h=n.length-1,w=t&&t.threshold||c&&c.threshold||-9007199254740991,x=t&&t.limit||c&&c.limit||9007199254740991,y=(t&&void 0!==t.allowTypo?t.allowTypo:!c||void 0===c.allowTypo||c.allowTypo)?g.algorithm:g.algorithmNoTypo,m=0,T=0;function k(){if(i)return p("canceled");var s=Date.now();if(t&&t.keys)for(var c=t.scoreFn||l,b=t.keys,I=b.length;h>=0;--h){for(var B=n[h],_=new Array(I),C=I-1;C>=0;--C)(P=f(B,L=b[C]))?(u(P)||(P=g.getPrepared(P)),_[C]=y(r,P,d)):_[C]=null;_.obj=B;var A=c(_);if(null!==A&&!(A<w)&&(_.score=A,m<x?(v.add(_),++m):(++T,A>v.peek().score&&v.replaceTop(_)),h%1e3==0&&Date.now()-s>=10))return void(e?setImmediate(k):setTimeout(k))}else if(t&&t.key){for(var L=t.key;h>=0;--h)if((P=f(B=n[h],L))&&(u(P)||(P=g.getPrepared(P)),null!==(j=y(r,P,d))&&!(j.score<w)&&(j={target:j.target,_targetLowerCodes:null,_nextBeginningIndexes:null,score:j.score,indexes:j.indexes,obj:B},m<x?(v.add(j),++m):(++T,j.score>v.peek().score&&v.replaceTop(j)),h%1e3==0&&Date.now()-s>=10)))return void(e?setImmediate(k):setTimeout(k))}else for(;h>=0;--h){var P,j;if((P=n[h])&&(u(P)||(P=g.getPrepared(P)),null!==(j=y(r,P,d))&&!(j.score<w)&&(m<x?(v.add(j),++m):(++T,j.score>v.peek().score&&v.replaceTop(j)),h%1e3==0&&Date.now()-s>=10)))return void(e?setImmediate(k):setTimeout(k))}if(0===m)return a(o);for(var N=new Array(m),S=m-1;S>=0;--S)N[S]=v.poll();N.total=m+T,a(N)}e?setImmediate(k):k()});return a.cancel=function(){i=!0},a},highlight:function(e,r,n){if(null===e)return null;void 0===r&&(r="<b>"),void 0===n&&(n="</b>");for(var o="",t=0,i=!1,a=e.target,l=a.length,f=e.indexes,u=0;u<l;++u){var s=a[u];if(f[t]===u){if(i||(i=!0,o+=r),++t===f.length){o+=s+n+a.substr(u+1);break}}else i&&(i=!1,o+=n);o+=s}return o},prepare:function(e){if(e)return{target:e,_targetLowerCodes:g.prepareLowerCodes(e),_nextBeginningIndexes:null,score:null,indexes:null,obj:null}},prepareSlow:function(e){if(e)return{target:e,_targetLowerCodes:g.prepareLowerCodes(e),_nextBeginningIndexes:g.prepareNextBeginningIndexes(e),score:null,indexes:null,obj:null}},prepareSearch:function(e){if(e)return g.prepareLowerCodes(e)},getPrepared:function(e){if(e.length>999)return g.prepare(e);var n=r.get(e);return void 0!==n?n:(n=g.prepare(e),r.set(e,n),n)},getPreparedSearch:function(e){if(e.length>999)return g.prepareSearch(e);var r=n.get(e);return void 0!==r?r:(r=g.prepareSearch(e),n.set(e,r),r)},algorithm:function(e,r,n){for(var o=r._targetLowerCodes,a=e.length,l=o.length,f=0,u=0,s=0,p=0;;){if(n===o[u]){if(t[p++]=u,++f===a)break;n=e[0===s?f:s===f?f+1:s===f-1?f-1:f]}if(++u>=l)for(;;){if(f<=1)return null;if(0===s){if(n===e[--f])continue;s=f}else{if(1===s)return null;if((n=e[1+(f=--s)])===e[f])continue}u=t[(p=f)-1]+1;break}}f=0;var d=0,c=!1,v=0,h=r._nextBeginningIndexes;null===h&&(h=r._nextBeginningIndexes=g.prepareNextBeginningIndexes(r.target));var w=u=0===t[0]?0:h[t[0]-1];if(u!==l)for(;;)if(u>=l){if(f<=0){if(++d>a-2)break;if(e[d]===e[d+1])continue;u=w;continue}--f,u=h[i[--v]]}else if(e[0===d?f:d===f?f+1:d===f-1?f-1:f]===o[u]){if(i[v++]=u,++f===a){c=!0;break}++u}else u=h[u];if(c)var x=i,y=v;else x=t,y=p;for(var m=0,T=-1,k=0;k<a;++k)T!==(u=x[k])-1&&(m-=u),T=u;for(c?0!==d&&(m+=-20):(m*=1e3,0!==s&&(m+=-20)),m-=l-a,r.score=m,r.indexes=new Array(y),k=y-1;k>=0;--k)r.indexes[k]=x[k];return r},algorithmNoTypo:function(e,r,n){for(var o=r._targetLowerCodes,a=e.length,l=o.length,f=0,u=0,s=0;;){if(n===o[u]){if(t[s++]=u,++f===a)break;n=e[f]}if(++u>=l)return null}f=0;var p=!1,d=0,c=r._nextBeginningIndexes;if(null===c&&(c=r._nextBeginningIndexes=g.prepareNextBeginningIndexes(r.target)),(u=0===t[0]?0:c[t[0]-1])!==l)for(;;)if(u>=l){if(f<=0)break;--f,u=c[i[--d]]}else if(e[f]===o[u]){if(i[d++]=u,++f===a){p=!0;break}++u}else u=c[u];if(p)var v=i,h=d;else v=t,h=s;for(var w=0,x=-1,y=0;y<a;++y)x!==(u=v[y])-1&&(w-=u),x=u;for(p||(w*=1e3),w-=l-a,r.score=w,r.indexes=new Array(h),y=h-1;y>=0;--y)r.indexes[y]=v[y];return r},prepareLowerCodes:function(e){for(var r=e.length,n=[],o=e.toLowerCase(),t=0;t<r;++t)n[t]=o.charCodeAt(t);return n},prepareBeginningIndexes:function(e){for(var r=e.length,n=[],o=0,t=!1,i=!1,a=0;a<r;++a){var l=e.charCodeAt(a),f=l>=65&&l<=90,u=f||l>=97&&l<=122||l>=48&&l<=57,s=f&&!t||!i||!u;t=f,i=u,s&&(n[o++]=a)}return n},prepareNextBeginningIndexes:function(e){for(var r=e.length,n=g.prepareBeginningIndexes(e),o=[],t=n[0],i=0,a=0;a<r;++a)t>a?o[a]=t:(t=n[++i],o[a]=void 0===t?r:t);return o},cleanup:a,new:d};return g}()}); 
/* showHint */ 
!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)}(function(t){"use strict";var i="CodeMirror-hint",e="CodeMirror-hint-active";function n(t,i){this.cm=t,this.options=i,this.widget=null,this.debounce=0,this.tick=0,this.startPos=this.cm.getCursor("start"),this.startLen=this.cm.getLine(this.startPos.line).length-this.cm.getSelection().length;var e=this;t.on("cursorActivity",this.activityFunc=function(){e.cursorActivity()})}t.showHint=function(t,i,e){if(!i)return t.showHint(e);e&&e.async&&(i.async=!0);var n={hint:i};if(e)for(var o in e)n[o]=e[o];return t.showHint(n)},t.defineExtension("showHint",function(i){i=function(t,i,e){var n=t.options.hintOptions,o={};for(var s in a)o[s]=a[s];if(n)for(var s in n)void 0!==n[s]&&(o[s]=n[s]);if(e)for(var s in e)void 0!==e[s]&&(o[s]=e[s]);o.hint.resolve&&(o.hint=o.hint.resolve(t,i));return o}(this,this.getCursor("start"),i);var e=this.listSelections();if(!(e.length>1)){if(this.somethingSelected()){if(!i.hint.supportsSelection)return;for(var o=0;o<e.length;o++)if(e[o].head.line!=e[o].anchor.line)return}this.state.completionActive&&this.state.completionActive.close();var s=this.state.completionActive=new n(this,i);s.options.hint&&(t.signal(this,"startCompletion",this),s.update(!0))}});var o=window.requestAnimationFrame||function(t){return setTimeout(t,1e3/60)},s=window.cancelAnimationFrame||clearTimeout;function c(t){return"string"==typeof t?t:t.text}function r(t,i){for(;i&&i!=t;){if("LI"===i.nodeName.toUpperCase()&&i.parentNode==t)return i;i=i.parentNode}}function h(n,o){this.completion=n,this.data=o,this.picked=!1;var s=this,h=n.cm,l=this.hints=document.createElement("ul");l.className="CodeMirror-hints",this.selectedHint=o.selectedHint||0;for(var a=o.list,u=0;u<a.length;++u){var f=l.appendChild(document.createElement("li")),d=a[u],p=i+(u!=this.selectedHint?"":" "+e);null!=d.className&&(p=d.className+" "+p),f.className=p,d.render?d.render(f,o,d):f.appendChild(document.createTextNode(d.displayText||c(d))),f.hintId=u}var m=h.cursorCoords(n.options.alignWithWord?o.from:null),g=m.left,v=m.bottom,y=!0;l.style.left=g+"px",l.style.top=v+"px";var w=window.innerWidth||Math.max(document.body.offsetWidth,document.documentElement.offsetWidth),H=window.innerHeight||Math.max(document.body.offsetHeight,document.documentElement.offsetHeight);(n.options.container||document.body).appendChild(l);var k=l.getBoundingClientRect(),C=k.bottom-H,b=l.scrollHeight>l.clientHeight+1,x=h.getScrollInfo();if(C>0){var A=k.bottom-k.top;if(m.top-(m.bottom-k.top)-A>0)l.style.top=(v=m.top-A)+"px",y=!1;else if(A>H){l.style.height=H-5+"px",l.style.top=(v=m.bottom-k.top)+"px";var S=h.getCursor();o.from.ch!=S.ch&&(m=h.cursorCoords(S),l.style.left=(g=m.left)+"px",k=l.getBoundingClientRect())}}var T,M=k.right-w;if(M>0&&(k.right-k.left>w&&(l.style.width=w-5+"px",M-=k.right-k.left-w),l.style.left=(g=m.left-M)+"px"),b)for(var F=l.firstChild;F;F=F.nextSibling)F.style.paddingRight=h.display.nativeBarWidth+"px";(h.addKeyMap(this.keyMap=function(t,i){var e={Up:function(){i.moveFocus(-1)},Down:function(){i.moveFocus(1)},PageUp:function(){i.moveFocus(1-i.menuSize(),!0)},PageDown:function(){i.moveFocus(i.menuSize()-1,!0)},Home:function(){i.setFocus(0)},End:function(){i.setFocus(i.length-1)},Enter:i.pick,Tab:i.pick,Esc:i.close},n=t.options.customKeys,o=n?{}:e;function s(t,n){var s;s="string"!=typeof n?function(t){return n(t,i)}:e.hasOwnProperty(n)?e[n]:n,o[t]=s}if(n)for(var c in n)n.hasOwnProperty(c)&&s(c,n[c]);var r=t.options.extraKeys;if(r)for(var c in r)r.hasOwnProperty(c)&&s(c,r[c]);return o}(n,{moveFocus:function(t,i){s.changeActive(s.selectedHint+t,i)},setFocus:function(t){s.changeActive(t)},menuSize:function(){return s.screenAmount()},length:a.length,close:function(){n.close()},pick:function(){s.pick()},data:o})),n.options.closeOnUnfocus)&&(h.on("blur",this.onBlur=function(){T=setTimeout(function(){n.close()},100)}),h.on("focus",this.onFocus=function(){clearTimeout(T)}));return h.on("scroll",this.onScroll=function(){var t=h.getScrollInfo(),i=h.getWrapperElement().getBoundingClientRect(),e=v+x.top-t.top,o=e-(window.pageYOffset||(document.documentElement||document.body).scrollTop);if(y||(o+=l.offsetHeight),o<=i.top||o>=i.bottom)return n.close();l.style.top=e+"px",l.style.left=g+x.left-t.left+"px"}),t.on(l,"dblclick",function(t){var i=r(l,t.target||t.srcElement);i&&null!=i.hintId&&(s.changeActive(i.hintId),s.pick())}),t.on(l,"click",function(t){var i=r(l,t.target||t.srcElement);i&&null!=i.hintId&&(s.changeActive(i.hintId),n.options.completeOnSingleClick&&s.pick())}),t.on(l,"mousedown",function(){setTimeout(function(){h.focus()},20)}),t.signal(o,"select",a[0],l.firstChild),!0}function l(t,i,e,n){if(t.async)t(i,n,e);else{var o=t(i,e);o&&o.then?o.then(n):n(o)}}n.prototype={close:function(){this.active()&&(this.cm.state.completionActive=null,this.tick=null,this.cm.off("cursorActivity",this.activityFunc),this.widget&&this.data&&t.signal(this.data,"close"),this.widget&&this.widget.close(),t.signal(this.cm,"endCompletion",this.cm))},active:function(){return this.cm.state.completionActive==this},pick:function(i,e){var n=i.list[e];n.hint?n.hint(this.cm,i,n):this.cm.replaceRange(c(n),n.from||i.from,n.to||i.to,"complete"),t.signal(i,"pick",n),this.close()},cursorActivity:function(){this.debounce&&(s(this.debounce),this.debounce=0);var t=this.cm.getCursor(),i=this.cm.getLine(t.line);if(t.line!=this.startPos.line||i.length-t.ch!=this.startLen-this.startPos.ch||t.ch<this.startPos.ch||this.cm.somethingSelected()||t.ch&&this.options.closeCharacters.test(i.charAt(t.ch-1)))this.close();else{var e=this;this.debounce=o(function(){e.update()}),this.widget&&this.widget.disable()}},update:function(t){if(null!=this.tick){var i=this,e=++this.tick;l(this.options.hint,this.cm,this.options,function(n){i.tick==e&&i.finishUpdate(n,t)})}},finishUpdate:function(i,e){this.data&&t.signal(this.data,"update");var n,o,s=this.widget&&this.widget.picked;if((this.widget&&this.widget.close(),!(i&&this.data&&(n=this.data,o=i,t.cmpPos(o.from,n.from)>0&&n.to.ch-n.from.ch!=o.to.ch-o.from.ch)))&&(this.data=i,i&&i.list.length))if(s&&1==i.list.length)this.pick(i,0);else{if(1==i.list.length&&i.to.ch-i.from.ch===i.list[0].length)return;this.widget=new h(this,i),t.signal(i,"shown")}}},h.prototype={close:function(){if(this.completion.widget==this){this.completion.widget=null,this.hints.parentNode.removeChild(this.hints),this.completion.cm.removeKeyMap(this.keyMap);var t=this.completion.cm;this.completion.options.closeOnUnfocus&&(t.off("blur",this.onBlur),t.off("focus",this.onFocus)),t.off("scroll",this.onScroll)}},disable:function(){this.completion.cm.removeKeyMap(this.keyMap);var t=this;this.keyMap={Enter:function(){t.picked=!0}},this.completion.cm.addKeyMap(this.keyMap)},pick:function(){this.completion.pick(this.data,this.selectedHint)},changeActive:function(i,n){if(i>=this.data.list.length?i=n?this.data.list.length-1:0:i<0&&(i=n?0:this.data.list.length-1),this.selectedHint!=i){var o=this.hints.childNodes[this.selectedHint];o.className=o.className.replace(" "+e,""),(o=this.hints.childNodes[this.selectedHint=i]).className+=" "+e,o.offsetTop<this.hints.scrollTop?this.hints.scrollTop=o.offsetTop-3:o.offsetTop+o.offsetHeight>this.hints.scrollTop+this.hints.clientHeight&&(this.hints.scrollTop=o.offsetTop+o.offsetHeight-this.hints.clientHeight+3),t.signal(this.data,"select",this.data.list[this.selectedHint],o)}},screenAmount:function(){return Math.floor(this.hints.clientHeight/this.hints.firstChild.offsetHeight)||1}},t.registerHelper("hint","auto",{resolve:function(i,e){var n,o=i.getHelpers(e,"hint");if(o.length){var s=function(t,i,e){var n=function(t,i){if(!t.somethingSelected())return i;for(var e=[],n=0;n<i.length;n++)i[n].supportsSelection&&e.push(i[n]);return e}(t,o);!function o(s){if(s==n.length)return i(null);l(n[s],t,e,function(t){t&&t.list.length>0?i(t):o(s+1)})}(0)};return s.async=!0,s.supportsSelection=!0,s}return(n=i.getHelper(i.getCursor(),"hintWords"))?function(i){return t.hint.fromList(i,{words:n})}:t.hint.anyword?function(i,e){return t.hint.anyword(i,e)}:function(){}}}),t.registerHelper("hint","fromList",function(i,e){var n=i.getCursor(),o=i.getTokenAt(n),s=t.Pos(n.line,o.end);if(o.string&&/\w/.test(o.string[o.string.length-1]))var c=o.string,r=t.Pos(n.line,o.start);else c="",r=s;for(var h=[],l=0;l<e.words.length;l++){var a=e.words[l];a.slice(0,c.length)==c&&h.push(a)}if(h.length)return{list:h,from:r,to:s}}),t.commands.autocomplete=t.showHint;var a={hint:t.hint.auto,completeSingle:!0,alignWithWord:!0,closeCharacters:/[\s()\[\]{};:>,]/,closeOnUnfocus:!0,completeOnSingleClick:!0,container:null,customKeys:null,extraKeys:null};t.defineOption("hintOptions",null)});
/* javascript-hint 注释掉，使得show-hint.js 的resolveAutoHints方法进入这个判断：} else if (words = cm.getHelper(cm.getCursor(), "hintWords")) { */ 
// !function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)}(function(t){var e=t.Pos;function r(t,e){for(var r=0,n=t.length;r<n;++r)e(t[r])}function n(t,e){if(!Array.prototype.indexOf){for(var r=t.length;r--;)if(t[r]===e)return!0;return!1}return-1!=t.indexOf(e)}function i(i,o,s,a){var f=i.getCursor(),c=s(i,f);if(!/\b(?:string|comment)\b/.test(c.type)){c.state=t.innerMode(i.getMode(),c.state).state,/^[\w$_]*$/.test(c.string)?c.end>f.ch&&(c.end=f.ch,c.string=c.string.slice(0,f.ch-c.start)):c={start:f.ch,end:f.ch,string:"",state:c.state,type:"."==c.string?"property":null};for(var p=c;"property"==p.type;){if("."!=(p=s(i,e(f.line,p.start))).string)return;if(p=s(i,e(f.line,p.start)),!l)var l=[];l.push(p)}t.signal(i,"hinting");var u=i.state.myhints;return i.state.needToClearJSHint&&(o=[],i.state.needToClearJSHint=!1),u&&u.forEach(function(t){n(o,t)||o.push(t)}),{list:function(t,e,i,o){var s=[],a=t.string,f=o&&o.globalScope||window;function c(t){if(fuzzysort&&fuzzysort.single){var e=fuzzysort.single(a,t);e&&e.score<=0&&!n(s,t)&&s.push(t)}else 0!=t.lastIndexOf(a,0)||n(s,t)||s.push(t)}if(e&&e.length){var p,l=e.pop();for(l.type&&0===l.type.indexOf("variable")?(o&&o.additionalContext&&(p=o.additionalContext[l.string]),o&&!1===o.useGlobalScope||(p=p||f[l.string])):"string"==l.type?p="":"atom"==l.type?p=1:"function"==l.type&&(null==f.jQuery||"$"!=l.string&&"jQuery"!=l.string||"function"!=typeof f.jQuery?null!=f._&&"_"==l.string&&"function"==typeof f._&&(p=f._()):p=f.jQuery());null!=p&&e.length;)p=p[e.pop().string];null!=p&&function(t){"string"==typeof t?r(stringProps,c):t instanceof Array?r(arrayProps,c):t instanceof Function&&r(funcProps,c);!function(t,e){if(Object.getOwnPropertyNames&&Object.getPrototypeOf)for(var r=t;r;r=Object.getPrototypeOf(r))Object.getOwnPropertyNames(r).forEach(e);else for(var n in t)e(n)}(t,c)}(p)}else{var u=fuzzysort.go(a,i);u&&u.forEach(function(t){s.push(t.target)})}return s}(c,l,o,a),from:e(f.line,c.start),to:e(f.line,c.end)}}}function o(t,e){var r=t.getTokenAt(e);return e.ch==r.start+1&&"."==r.string.charAt(0)?(r.end=r.start,r.string=".",r.type="property"):/^\.[\w$_]*$/.test(r.string)&&(r.type="property",r.start++,r.string=r.string.replace(/\./,"")),r}t.registerHelper("hint","javascript",function(t,e){return i(t,s,function(t,e){return t.getTokenAt(e)},e)}),t.registerHelper("hint","coffeescript",function(t,e){return i(t,coffeescriptKeywords,o,e)});var s="double float int long short null true false enum super this void auto for register static const friend mutable explicit virtual template typename printf break continue return do while if else for instanceof switch case default try catch finally throw throws assert import package boolean byte char delete private inline struct union signed unsigned export extern namespace using operator sizeof typedef typeid and del from not as elif or with pass except print exec raise is def lambda private protected public abstract class extends final implements interface native new static strictfp synchronized transient main String string System println vector bool boolean FALSE TRUE function".split(" ")});
/* anyword-hint */ 
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";var r=/[\w$]+/;e.registerHelper("hint","anyword",function(t,o){for(var i=o&&o.word||r,n=o&&o.range||500,f=t.getCursor(),s=t.getLine(f.line),a=f.ch,c=a;c&&i.test(s.charAt(c-1));)--c;for(var l=c!=a&&s.slice(c,a),d=o&&o.list||[],u={},p=new RegExp(i.source,"g"),g=-1;g<=1;g+=2)for(var h=f.line,m=Math.min(Math.max(h+g*n,t.firstLine()),t.lastLine())+g;h!=m;h+=g)for(var y,b=t.getLine(h);y=p.exec(b);)h==f.line&&y[0]===l||l&&0!=y[0].lastIndexOf(l,0)||Object.prototype.hasOwnProperty.call(u,y[0])||(u[y[0]]=!0,d.push(y[0]));return{list:d,from:e.Pos(f.line,c),to:e.Pos(f.line,a)}})});
/*CodeMirror addon hint -----------------------------------------------End*/ 

// 测评的扩大与缩小
function valuation_extend_and_zoom(){
    var nGameRes  = $("#games_repository_contents");                     // 版本库区域
    var nGameEva  = $("#games_valuation_contents");                      // 评测区域
    var nVIcon    = $("#valuation_extend_and_zoom").children("i");       // 评测放大缩小
    var nMove     = $(".h-center");
    if(control_1 == 0){
        nGameRes.addClass("-flex-basic0");
        nGameEva.addClass("-flex-basic100");
        nVIcon.removeClass("fa-expand");
        nVIcon.addClass("fa-compress");
        $("#valuation_extend_and_zoom").attr("data-tip-left","收起");
        nMove.hide();
        control_1 = 1;
    }else if(control_1 == 1){
        nGameRes.removeClass("-flex-basic0");
        nGameEva.removeClass("-flex-basic100");
        nVIcon.addClass("fa-expand");
        nVIcon.removeClass("fa-compress");
        $("#valuation_extend_and_zoom").attr("data-tip-left","展开");
        nMove.show();
        control_1 = 0;
    }
}
// end

// 点赞与取消点赞
var h = true;
function game_praise(obj_id, obj_type){
    if(treadStatus){
        return;
    }
    $.ajax({
        url:  "/praise_tread/praise_plus?obj_id=" + obj_id + "&obj_type=" + obj_type,
        data: {horizontal: h, game_praise: true},
        success:function(data){
            h = !h;
            var praise_count = $("#game_praise_count");
            if(data.praise){
                praiseStatus = true; //已赞
                praise_count.html(data.praise_tread_count);
                $("#game_praise_tread").children("i").addClass("color-orange03");
                $("#game_praise_tread").attr("data-tip-top", "取消点赞")
            }else{
                praiseStatus = false; //取消赞
                praise_count.html(data.praise_tread_count);
                $("#game_praise_tread").children("i").removeClass("color-orange03");
                $("#game_praise_tread").attr("data-tip-top", "点赞")
            }
        }
    });
}
// 踩/取消踩功能
var d = true;
function game_tread(obj_id){
    if(praiseStatus){
        return;
    }
    $.ajax({
        url: "/praise_tread/praise_plus?obj_id=" + obj_id + "&obj_type=ChallengeTread",
        data: {horizontal: d, game_praise: true},
        success:function(data){
            d = !d;
            var tread_count = $("#game_tread_count");
            if(data.praise){
                treadStatus = true; // 取消踩
                tread_count.html(data.praise_tread_count);
                $("#game_tread").children("i").addClass("color-orange");
                $("#game_tread").attr("data-tip-top", "取消踩")
            }else{
                treadStatus = false; // 已踩
                tread_count.html(data.praise_tread_count);
                $("#game_tread").children("i").removeClass("color-orange");
                $("#game_tread").attr("data-tip-top", "踩");
            }
        }
    });
}
// end

function setupAjaxIndicatorBase() {
    $('#ajax-indicator-base').bind('ajaxSend', function(event, xhr, settings) {
        if(settings && settings.url
            && (settings.url.match(/account\/heartbeat$/)
                || settings.url.match(/file_update/)
                || settings.url.match(/game_build/)
                || settings.url.match(/game_status/)
                || settings.url.match(/refresh_game_list/)
                || settings.url.match(/next_step/)
                || settings.url.match(/prev_step/)
                || settings.url.match(/open_webssh/)
                || settings.url.match(/repository/)
                || settings.url.match(/get_waiting_time/)
                )){
            return;
        }
        if ($('.ajax-loading').length === 0 && settings.contentType != 'application/octet-stream') {
            $('#ajax-indicator-base').css("display","flex").html("<embed src='/images/bigdata/loading2.svg' />").show();
        }
    });

    $('#ajax-indicator-base').bind('ajaxStop', function() {
        $('#ajax-indicator-base').html("").hide();
        if(MathJax && MathJax.Hub)
            MathJax.Hub.Queue(['Typeset', MathJax.Hub]); //如果是ajax刷新页面的话，手动执行MathJax的公式显示
        try{
            prettyPrint(); //如果刷新出来的页面如果存在代码行的话，也需要美化
        }catch (e){

        }
    });
}

function match_specific_symbol(str){
    str = str.replace(/ /g, "<span class=\"empty\"></span>").replace(/\r\n$/, "<i class=\"fa fa-level-down color-grey font-16\" aria-hidden=\"true\"></i>").replace(/\n$/, "<i class=\"fa fa-level-down color-grey font-16\" aria-hidden=\"true\"></i>").replace(/\r$/, "<i class=\"fa fa-level-down color-grey font-16\" aria-hidden=\"true\"></i>").replace(/\r\n/g, "<br>").replace(/\n/g, "<br>").replace(/\r/g, "<br>").replace(/\t/g, "<span class=\"tab-key\"><i class=\"fa fa-long-arrow-right color-grey3\" aria-hidden=\"true\"></i></span>")
    return str
};
/*

var panes = 2, highlight = true, connect = null, collapse = false;
function initUI(id, value, orig1, orig2, dv, panes, highlight, connect, collapse) {
    if (value == null) return;
    var target = document.getElementById(id);
    target.innerHTML = "";
    dv = CodeMirror.MergeView(target, {
        value: value,
        origLeft: panes == 3 && !collapse && !connect ? orig1 : null,
        orig: orig2,
        lineNumbers: true,
        mode: "text/html",
        highlightDifferences: highlight,
        connect: connect,
        collapseIdentical: collapse
    });
}
function toggleDifferences() {
    dv.setShowDifferences(highlight = !highlight);
}

function mergeViewHeight(mergeView) {
    function editorHeight(editor) {
        if (!editor) return 0;
        return editor.getScrollInfo().height;
    }
    return Math.max(editorHeight(mergeView.leftOriginal()),
        editorHeight(mergeView.editor()),
        editorHeight(mergeView.rightOriginal()));
}

function resize(mergeView) {
    var height = mergeViewHeight(mergeView);
    for(;;) {
        if (mergeView.leftOriginal())
            mergeView.leftOriginal().setSize(null, height);
        mergeView.editor().setSize(null, height);
        if (mergeView.rightOriginal())
            mergeView.rightOriginal().setSize(null, height);

        var newHeight = mergeViewHeight(mergeView);
        if (newHeight >= height) break;
        else height = newHeight;
    }
    mergeView.wrap.style.height = height + "px";
}

*/

$(document).ready(setupAjaxIndicatorBase);
// test_sets：测试集；had_test_count：输出集的个数；test_sets_count：测试集的个数；had_passed_testsests_error_count：测试集报错数；test_sets_hidden_count：隐藏测试集的个数
// test_sets_public_count：公开测试集的个人；had_passed_testsests_hidden_count：通过的隐藏集个数；had_passed_testsests_public_count：通过的公开测试集个数
// final_score：最终得经验数；gold：最终得的金币数；latest_output：最新的输出；language：实训的语言, power：是否有权限看隐藏测试集, record：最新的一次的评测时间信息, mirror_name镜像名
function code_evaluation(test_sets,
                         had_test_count,
                         test_sets_count,
                         had_passed_testsests_error_count,
                         test_sets_hidden_count,
                         test_sets_public_count,
                         had_passed_testsests_hidden_count,
                         had_passed_testsests_public_count,
                         final_score,
                         gold,
                         latest_output,
                         mirror_name,
                         power,
                         record
                         ) {
//动态加载评测区域
    /**
     * Created by wang on 2017/8/9.
     */
    //test_sets = [HtmlUtil.htmlDecode(test_sets)];
    var $EffectDisplay  , $b, $TestResult, $d, $e, $f, $g, $h, $EvaluationInformation , $n, $i;
    // 第一块  效果显示
    $EffectDisplay = "<div id=\"blacktab_con_1\" class=\"\" ></div>";
    $b = "<div class=\"fit -scroll\">" +
        "<div class=\"-layout-v -fit\">" +
        "<div class=\"-flex -scroll task-padding16 loading-center undis\" id=\"html_ajax_loading\"></div>" +
        "<form id=\"html_form\" method=\"post\" target=\"myFrame\">" +
        "<input type=\"hidden\" name=\"contents\" id=\"data_param\" />" +
        "</form>" +
        "<iframe frameborder=\"0\" name=\"myFrame\" style='background: #fff;height: 100%;'>" +
        "</iframe>" +
        "</div>" +
        "</div>";

    if (mirror_name.indexOf("Html") != -1) {
        $EffectDisplay = "<div id=\"blacktab_con_1\" class=\"\" >"+$b+"</div>";
    }

//第二块  测试结果
    if (had_test_count != "0") {
        var $t = "";
        if(record != "" && record != null && record != undefined){
            $t = " <span class=\"fr mr5 tab_color\">" + "本次评测耗时：" + record + "秒" + "</span>"
        }
        if (had_passed_testsests_error_count == test_sets_count) {
            $d = $t + "<p class=\"color-light-green mb10\">" +
                "<i class=\"fa fa-check-circle font-16\" ></i>" +
                "<span class=\"ml5 mr5\">" + test_sets_count + "/" +  test_sets_count + "</span> 全部通过</p>";
        } else {
            $d = $t + "<p class=\"-text-danger mb10\">" +
                "<i class=\"fa fa-exclamation-circle font-16\" ></i>" +
                " <span class=\"ml5 mr5 -text-danger\">" + had_passed_testsests_error_count + '/' + test_sets_count + "</span>" + latest_output + "</p>";
        }
    }
    var $forHtml = "";
    var $Bear = "";
    for (var i = 0; i < test_sets.length; i++) {
        if (test_sets[i].result == 0) {
            $g = "<i class=\"fa fa-exclamation-circle -text-danger fr mt8 ml5\" ></i>"
        }else if(test_sets[i].result == 1) {
            $g = "<i class=\"fa fa-check-circle color-light-green fr mt8 ml5 font-16\" ></i>"
        }else{
            $g = ""
        }
        if (test_sets[i].is_public == 0) {
            if(power && power != 'false'){
                $g = "<i class=\"fa fa-unlock fr mt8 ml5\" ></i>" + $g
            }else if(test_sets[i].result == 0 || test_sets[i].result == 1){
                $g = "<i class=\"fa fa-lock fr mt8 ml5\" ></i>" + $g
            }else{
                $g = "<i class=\"fa fa-lock fr mt8\" ></i>"
            }
        }else{
            if(test_sets[i].result != 0 && test_sets[i].result != 1){
                $g = undefined;
            }
        }
        if(test_sets[i].input == null || test_sets[i].input == ""){
            $i = "";
        }else{
            $i = "<div class=\"clearfix df mt5\">" +
                 "<span class=\"color-blue fl fb\">测试输入：</span>" +
                 "<p class=\"fl\" style='flex:1'>" + ( (test_sets[i].input == null || test_sets[i].input == "")  ? "空" : test_sets[i].input.replace(/\r\n/g, "<br>") ) + " </p>" +
                 "</div>"
        }
        if ((test_sets[i].is_public == 1 || power == 'true') || (power && power != 'false')) {
            $h = "<div class=\"-task-ces-info\" style=\"display:none\" id=\"test_case_" + i + "\">" +
                $i +
                "<div class='clearfix'><p class='fl with52 color-blue'>预期输出：</p><p class='fl with48 pl5 color-blue' style='box-sizing:border-box'>实际输出：</p></div>"+
                "</div>" +
                "<div id=\"result_different_show_"+ i + "\"></div>";
        }else if(test_sets[i].is_public == 0) {
            $h = "<div class=\"-task-ces-info undis\" id=\"test_case_" + i + "\">" +
                " <ul class=\"font-14\">" +
                " <li class=\"clearfix\">" +
                "<div class=\"clearfix\">" +
                "<p class=\"fl color-orange\" style=\"margin-left: 34px;\">此为隐藏测试项，<a href=\"javascript:void()\", class=\"color_white test_set_data\" style=\"text-decoration: underline;\">解锁</a></p>" +
                " </div>" +
                "</li>" +
                " </ul>" +
                "</div>";
        }
        $e = "<div class=\"-task-ces-box mb15 clearfix\">"+$h+"</div>";
        // actual_output 正则匹配的目的： 因为字符串拼接\r\n时，会转义导致js截成2断报错.因此需要编码
        var base64 = new Base64();
        var actual_output = test_sets[i].actual_output == null ? "" : base64.encode(test_sets[i].actual_output);
        var output = test_sets[i].output == null ? "" : base64.encode(test_sets[i].output);
        $f = "<div class=\"-task-ces-top clearfix\" onclick='toggle_test_case(" + test_sets[i].is_public + "," + '"' + output+ '"' + "," + '"' + actual_output + '"' + "," + i + "," + power + ")' style=\"cursor:pointer\">" +
            "<i class=\"fa fa-caret-right mr5 font-16\" ></i>" +
            "<span class=\"font-14\">测试集 " + (i + 1) + "</span>" + ($g == undefined ? "" : $g)+"</div>";

        $forHtml = $f + $e;
        $Bear += $forHtml;
    }
    $TestResult = "<div id=\"blacktab_con_2\" class=\" " + (mirror_name.indexOf("Html") != -1 ? 'undis' : '') + "\">" +
        "<div class=\"fit -scroll\">" +
        "<div class=\"-layout-v -fit\">" +
        "<div class=\"-flex -scroll task-padding16 loading-center undis\" id=\"evaluating_ajax_loading\"></div>" +
        "<div class=\"-flex -scroll task-padding16\" id=\"evaluating_contents\">" + ($d == undefined ? "" : $d) + $Bear + "</div>" +
        "</div>" +
        "</div>" +
        "</div>";

//第三块 评测信息
    if (had_test_count != "0") {
        if (had_passed_testsests_error_count == test_sets_count) {
            $n = "<p class=\"color-light-green mb10\">" +
                "<i class=\"fa fa-check-circle font-16 \" ></i>" +
                "<span class=\"ml5 mr5\">" + test_sets_count + "/" + test_sets_count + "</span> 全部通过</p>";
        } else {
            $n = "<p class=\"-text-danger mb10\">" +
                "<i class=\"fa fa-exclamation-circle font-16\" ></i>" +
                "<span class=\"ml5 mr5 -text-danger\">" + had_passed_testsests_error_count + "/" +  test_sets_count + "</span> " + latest_output + "</p>";
        }
       // $("#evaluating_info").html($n);
    }
    $EvaluationInformation = "<div id=\"blacktab_con_3\" class=\"undis\" >" +
        "<div class=\"fit -scroll\">" +
        "<div class=\"-layout-v -fit\">" +
        "<div class=\"-flex -scroll task-padding16 loading-center undis\" id=\"info_ajax_loading\"></div>" +
        "<div class=\"-flex -scroll task-padding16\" id=\"evaluating_info\">" + ($n == undefined ? "" : $n)+"<div class=\"-task-ces-box mb10 clearfix\">" +
        "<div class=\"-task-ces-info\">" +
        "<ul>" +
        "<li>" +
        "<span class=\"-task-ces-info-left \">公开测试：</span>" +
        "<span class=\"color-light-green\">" + had_passed_testsests_public_count + "/" + test_sets_public_count + "</span>" +
        "</li>" +
        "<li>" +
        "<span class=\"-task-ces-info-left\"> 隐藏测试：</span>" +
        "<span class=\"color-light-green\">" + had_passed_testsests_hidden_count + "/" + test_sets_hidden_count + "</span>" +
        "</li>" +
        "<li>" +
        "<span class=\"-task-ces-info-left\"> 经验值：</span>" +
        "<span class=\"color-light-green\" id=\"experience_value\">+ " + final_score + " </span>" +
        "</li>" +
        "<li>" +
        "<span class=\"-task-ces-info-left\">金币：</span>" +
        "<span class=\""+ (gold >= 0 ? "color-light-green" : "-text-danger") + "\"" +"id=\"grade_value\">" + (gold >= 0 ? ("+ " + gold) : gold) + "</span>" +
        "</li>" +
        "</ul>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";

    var $html =  $EffectDisplay + $TestResult +  $EvaluationInformation;
    $("#game_test_set_results").html($html);
}
// end


// $.ajax({
//     url: "http://localhost:3000/api/v1/games/zl6kx8f7vfpo",
 
//     // The name of the callback parameter, as specified by the YQL service
//     jsonp: "callback",
 
//     // Tell jQuery we're expecting JSONP
//     // dataType: "jsonp",
 
//     // Tell YQL what we want and that we want JSON
//     data: {
//         // q: "select title,abstract,url from search.news where query=\"cat\"",
//         format: "json"
//     },
 
//     // Work with the response
//     success: function( response ) {
//         console.log( response ); // server response
//     }
// });

