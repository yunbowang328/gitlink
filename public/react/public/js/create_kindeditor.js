//需求：表情栏可以隐藏显示，高度只要一点高
function sd_create_editor(params){
    // var minHeight;  //最小高度
    var paramsHeight = params.height; //设定的高度
    var id = arguments[1] ? arguments[1] : undefined;
    var type = arguments[2] ? arguments[2] : '';
    var paramsWidth = params.width == undefined ? "100%" : params.width;

    var editor = params.kindutil.create(params.textarea, {
        resizeType : 1,minWidth:"1px",width:"94%",
        height:"33px",// == undefined ? "30px":paramsHeight+"px",
        minHeight:"33px",// == undefined ? "30px":paramsHeight+"px",
        width:params.width,
        /*
        items:['emoticons','fontname',
            'forecolor', 'hilitecolor', 'bold', '|', 'justifyleft', 'justifycenter', 'insertorderedlist','insertunorderedlist', '|',
            'formatblock', 'fontsize', '|','indent', 'outdent',
            '|','imagedirectupload','more'],*/
        items : ['code','emoticons','fontname',
            'forecolor', 'hilitecolor', 'bold', '|', 'justifyleft', 'justifycenter', 'insertorderedlist','insertunorderedlist', '|',
            'formatblock', 'fontsize', '|','indent', 'outdent',
            '|','imagedirectupload','table',   'media', 'preview',"more"
        ],
        afterChange:function(){//按键事件
            var edit = this.edit;
            var body = edit.doc.body;
            edit.iframe.height(paramsHeight);
            this.resize(null, Math.max((params.kindutil.IE ? body.scrollHeight : (params.kindutil.GECKO ? body.offsetHeight+26:body.offsetHeight+7))  , paramsHeight));
        },
        afterBlur:function(){
            //params.toolbar_container.hide();
            params.textarea.blur();
            sd_check_editor_form_field({content:this,contentmsg:params.contentmsg,textarea:params.textarea});
            if(this.isEmpty()) {
                this.edit.html("<span id='hint' style='color:#999999;font-size:12px;'>我要回复</span>");
            }
            //params.toolbar_container.hide();
            $('#reply_image_' + id).addClass('imageFuzzy');
            if(/^\s*<\w*\s*\w*\=\"\w*\"\s*\w*\=\"\w*\:\s*\#\d*\;\s*\w*\-\w*\:\s*\w*\;\"\>[\u4e00-\u9fa5]*<\/\w*\>\s*$/.test(this.edit.html())){
                params.submit_btn.hide();
                params.toolbar_container.hide();
                this.resize("100%", null);
            }else if(this.edit.html().trim() != ""){
                params.submit_btn.show();
                params.toolbar_container.show();
            }

            //params.submit_btn.css("display","none");

        },
        afterFocus: function(){
            var edit = this.edit;
            var body = edit.doc.body;
            if(/^\s*<\w*\s*\w*\=\"\w*\"\s*\w*\=\"\w*\:\s*\#\d*\;\s*\w*\-\w*\:\s*\w*\;\"\>[\u4e00-\u9fa5]*<\/\w*\>\s*$/.test(edit.html())){
                edit.html('');
            }
            params.submit_btn.show();
            params.contentmsg.hide();
            params.toolbar_container.show();
            // params.toolbar_container.show();
            $('#reply_image_' + id).removeClass('imageFuzzy');
            //edit.iframe.width(paramsWidth);

            this.resize("100%", null);
            this.resize(paramsWidth, null);
            //params.submit_btn.show();

        },

        afterCreate:function(){
            //params.submit_btn.hide();
            var toolbar = $("div[class='ke-toolbar']",params.div_form);
            toolbar.css('display','inline');
            toolbar.css('padding',0);
            $(".ke-outline>.ke-toolbar-icon",toolbar).append('表情');
            params.toolbar_container.append(toolbar);
            params.toolbar_container.hide();
            params.submit_btn.hide();
            //init
            var edit = this.edit;
            var body = edit.doc.body;
            edit.iframe[0].scroll = 'no';
            body.style.overflowY = 'hidden';
            //reset height
            paramsHeight = paramsHeight == undefined ? params.kindutil.removeUnit(this.height) : paramsHeight;
            edit.iframe.height(paramsHeight);
            edit.html("<span id='hint' style='color:#999999;font-size:12px;'>我要回复</span>");
            this.resize(null,paramsHeight);// Math.max((params.kindutil.IE ? body.scrollHeight : body.offsetHeight)+ paramsHeight , paramsHeight)
            // params.toolbar_container.hide();
            if(typeof enableAt === 'function'){
                enableAt(this, id, type);
            }
        }
    }).loadPlugin('paste');
    return editor;
}

function sd_create_shixun_editor(params){
    // var minHeight;  //最小高度
    var paramsHeight = params.height; //设定的高度
    var id = arguments[1] ? arguments[1] : undefined;
    var type = arguments[2] ? arguments[2] : '';
    var paramsWidth = params.width == undefined ? "100%" : params.width;

    var editor = params.kindutil.create(params.textarea, {
        resizeType : 1,minWidth:"1px",width:"94%",
        height:"33px",// == undefined ? "30px":paramsHeight+"px",
        minHeight:"33px",// == undefined ? "30px":paramsHeight+"px",
        width:params.width,
        /*
         items:['emoticons','fontname',
         'forecolor', 'hilitecolor', 'bold', '|', 'justifyleft', 'justifycenter', 'insertorderedlist','insertunorderedlist', '|',
         'formatblock', 'fontsize', '|','indent', 'outdent',
         '|','imagedirectupload','more'],*/
        items : ['imagedirectupload'],
        afterChange:function(){//按键事件
            if(this.isEmpty() || this.edit.doc.body.innerText == '说点什么') {
                $('#mini_comment_section').height('auto') 
            } else { 
                var edit = this.edit;
                var body = edit.doc.body;
                var newHeight = 0;

                var FF = !(window.mozInnerScreenX == null);
                if (FF) {   // 火狐下处理方式不一样
                    newHeight = $(body).height()
                } else {
                    $(body).children().each(function(){newHeight+=$(this).height()});
                }
                // var newHeight = $(body).height()
                
                var maxHeight = 357 // $(window).height() - 150 - 57; //  150 上部距离  57 下部距离

                newHeight = newHeight <= maxHeight ? newHeight : maxHeight
                

                if (newHeight > 150) {
                    if (FF) {   // 火狐下处理方式不一样
                        this.resize("100%", (newHeight + 20) + 'px');
                    } else {
                        this.resize("100%", newHeight + 'px');
                    }
                    $('#mini_comment_section').height(newHeight+57)
                } else {
                    this.resize("100%",  '150px');
                    $('#mini_comment_section').height('auto')
                }
            }

            //edit.iframe.height(paramsHeight);
            //this.resize(null, Math.max((params.kindutil.IE ? body.scrollHeight : (params.kindutil.GECKO ? body.offsetHeight+26:body.offsetHeight+7))  , 15));
        },
        afterBlur:function(){
            //params.toolbar_container.hide();
            params.textarea.blur();
            sd_check_editor_form_field({content:this,contentmsg:params.contentmsg,textarea:params.textarea});
            if(this.isEmpty()) {
                $('#mini_comment_section').height('auto')
                this.edit.html("<span id='hint' style='color:#999999;font-size:14px;'>说点什么</span>");
                params.submit_btn.hide();
                params.toolbar_container.hide();
                this.resize("100%", "30px");
                $("#dis_reply_id").val("");
                if($("#editor_panel").length>0){
                    $("#editor_panel").attr("style","margin-top:9px;flex: 1;");
                    $("#editor_panel").parents("form").addClass("df")
                }
            }
            //params.toolbar_container.hide();
            /*$('#reply_image_' + id).addClass('imageFuzzy');
            if(/^\s*<\w*\s*\w*\=\"\w*\"\s*\w*\=\"\w*\:\s*\#\d*\;\s*\w*\-\w*\:\s*\w*\;\"\>[\u4e00-\u9fa5]*<\/\w*\>\s*$/.test(this.edit.html())){
                params.submit_btn.hide();
                params.toolbar_container.hide();
                this.resize("100%", "30px");
            }else if(this.edit.html().trim() != ""){
                params.submit_btn.show();
                params.toolbar_container.show();
            }*/
            //params.submit_btn.css("display","none");

            // $('#mini_comment_section').height('auto')
        },
        afterFocus: function(){
            var edit = this.edit;
            var body = edit.doc.body;
            if(/^\s*<\w*\s*\w*\=\"\w*\"\s*\w*\=\"\w*\:\s*\#\d*\;\s*\w*\-\w*\:\s*\w*\;\"\>[\u4e00-\u9fa5]*<\/\w*\>\s*$/.test(edit.html())){
                edit.html("");
            }
            params.submit_btn.show();
            params.contentmsg.hide();
            params.toolbar_container.show();
            // params.toolbar_container.show();
            $('#reply_image_' + id).removeClass('imageFuzzy');
            //edit.iframe.width(paramsWidth);
            
            var newHeight = $(body).height()
            if (newHeight < 150) {
                this.resize("100%", "150px");
                this.resize(paramsWidth, "150px");
            }
            if($("#editor_panel").length>0){
                $("#editor_panel").attr("style","width:100%;margin-top:9px;");
                $("#editor_panel").parents("form").removeClass("df")
            }
            //params.submit_btn.show();

            // $('#mini_comment_section').height('244px')
        },

        afterCreate:function(){
            //params.submit_btn.hide();
            var toolbar = $("div[class='ke-toolbar']",params.div_form);
            toolbar.css('display','inline');
            toolbar.css('padding',0);
            $(".ke-outline>.ke-toolbar-icon",toolbar).append('表情');
            params.toolbar_container.append(toolbar);
            params.toolbar_container.hide();
            params.submit_btn.hide();
            //init
            var edit = this.edit;
            var body = edit.doc.body;
            edit.iframe[0].scroll = 'no';
            // body.style.overflowY = 'hidden';
            body.style['padding-top']= '2px';
            body.style['padding-left']= '5px';
            // <style type='text/css'>body{padding-top: 2px;padding-left: 5px;}</style> 
            //reset height
            paramsHeight = paramsHeight == undefined ? params.kindutil.removeUnit(this.height) : paramsHeight;
            edit.iframe.height(paramsHeight);
            edit.html("<span id='hint' style='color:#999999;font-size:14px;'>说点什么</span>");
            this.resize(null,paramsHeight);// Math.max((params.kindutil.IE ? body.scrollHeight : body.offsetHeight)+ paramsHeight , paramsHeight)
            // params.toolbar_container.hide();
            if(typeof enableAt === 'function'){
                enableAt(this, id, type);
            }

            var iframe = edit.iframe[0]
            $(iframe.contentDocument.head).append(
                $("<style type='text/css'>::-webkit-scrollbar{height: 10px;width: 6px !important;background: rgba(0,0,0,.1) !important;} ::-webkit-scrollbar-thumb {border-radius: 6px;background: #ADADAD;};</style>"));
        }
    }).loadPlugin('paste');
    return editor;
}

function sd_check_editor_form_field(params){
    var result=true;
    if(params.content!=undefined){
        if(params.content.isEmpty()){
            result=false;
        }
        if(params.content.html()!=params.textarea.html() || params.issubmit==true){
            params.textarea.html(params.content.html());
            params.content.sync();
            if(params.content.isEmpty() || /^\s*<\w*\s*\w*\=\"\w*\"\s*\w*\=\"\w*\:\s*\#\d*\;\s*\w*\-\w*\:\s*\w*\;\"\>[\u4e00-\u9fa5]*<\/\w*\>\s*$/.test(params.textarea.html())){
                params.contentmsg.html('内容不能为空');
                params.contentmsg.css({color:'#ff0000'});
            }else{
                params.contentmsg.html('填写正确');
                params.contentmsg.css({color:'#008000'});
            }
            params.contentmsg.show();
        }
    }
    return result;
}
function sd_create_form(params){
    params.form.submit(function(){
        var flag = false;
        if(params.form.attr('data-remote') != undefined ){
            flag = true
        }
        var is_checked = sd_check_editor_form_field({
            issubmit:true,
            content:params.editor,
            contentmsg:params.contentmsg,
            textarea:params.textarea
        });
        if(is_checked){
            if(flag){
                return true;
            }else{
                $(this)[0].submit();
                return false;
            }
        }
        return false;
    });
}
function sd_reset_editor_form(params){
    params.form[0].reset();
    params.textarea.empty();
    if(params.editor != undefined){
        params.editor.html(params.textarea.html());
    }
    params.contentmsg.hide();
}
//第二个参数是高度，可以传，可以不传
function sd_create_editor_from_data(id){
    var height = arguments[1] ? arguments[1] : undefined;
    var width = arguments[2] ? arguments[2] : undefined;
    var type = arguments[3] ? arguments[3] : undefined;
    // KindEditor.ready(function (K) {
        // react 环境不需要ready方法，页面已经加载完了才执行sd_create_editor_from_data
        var K = KindEditor;
        $("div[nhname='new_message_" + id + "']").each(function () {
            var params = {};
            params.kindutil = K;
            params.div_form = $(this);
            params.form = $("form", params.div_form);
            if (params.form == undefined || params.form.length == 0) {
                return;
            }
            params.textarea = $("textarea[nhname='new_message_textarea_" + id + "']", params.div_form);
            params.contentmsg = $("span[nhname='contentmsg_" + id + "']", params.div_form);
            params.toolbar_container = $("div[nhname='toolbar_container_" + id + "']", params.div_form);
            params.cancel_btn = $("#new_message_cancel_btn_" + id);
            params.submit_btn = $("#new_message_submit_btn_" + id);
            params.height = height;
            params.width = width;
            if (params.textarea.data('init') == undefined) {
                params.editor = sd_create_editor(params,id, type);
                sd_create_form(params);
                params.cancel_btn.click(function () {
                    sd_reset_editor_form(params);
                });
                params.submit_btn.click(function () {
                    var tContents = $("#comment_news_" + id).val();
                    if(tContents != undefined){
                        var beforeImage = tContents.split("<img");
                        var afterImage = tContents.split("/>");
                        if(beforeImage[0] == "" && afterImage[1] == ""){
                            notice_box('不支持纯图片评论<br/>请在评论中增加文字信息');
                            return;
                        }

                        if (tContents.startsWith('<') && tContents.endsWith('>') 
                            && (tContents.indexOf('<link') != -1 || tContents.indexOf('<script') != -1 )) {
                            notice_box('不支持包含link或script标签的html内容');
                            return;    
                        }
                    }
                    // react环境下，发消息给react组件
                    if (window['__isR'] === true) {
                        $(document).trigger("onReply", { commentContent:tContents, id:id, editor:params.editor } );
                    } else {
                        params.form.submit();
                    }
                });
                params.textarea.focus(function (){
                    params.editor.focus();
                });
                params.textarea.data('init', 1);
                $(this).show();

                __editor = params.editor
            }
        });
    // });

    div_form = $("div[nhname='new_message_" + id + "']");
    $(".ke-edit", div_form).css("height","33px");
    $(".ke-edit-iframe",div_form).css("height","33px");

    return __editor;
}


//第二个参数是高度，可以传，可以不传
function sd_create_editor_from_shixun_data(id){
    var height = arguments[1] ? arguments[1] : undefined;
    var width = arguments[2] ? arguments[2] : undefined;
    var type = arguments[3] ? arguments[3] : undefined;
    // KindEditor.ready(function (K) {
        // react 环境不需要ready方法，页面已经加载完了才执行sd_create_editor_from_data
        var K = KindEditor;
    
        $("div[nhname='new_message_" + id + "']").each(function () {
            var params = {};
            params.kindutil = K;
            params.div_form = $(this);
            params.form = $("form", params.div_form);
            if (params.form == undefined || params.form.length == 0) {
                return;
            }
            params.textarea = $("textarea[nhname='new_message_textarea_" + id + "']", params.div_form);
            params.contentmsg = $("span[nhname='contentmsg_" + id + "']", params.div_form);
            params.toolbar_container = $("div[nhname='toolbar_container_" + id + "']", params.div_form);
            params.cancel_btn = $("#new_message_cancel_btn_" + id);
            params.submit_btn = $("#new_message_submit_btn_" + id);
            params.height = height;
            params.width = width;
            if (params.textarea.data('init') == undefined) {
                params.editor = sd_create_shixun_editor(params,id, type);
                window._commentInput = params.editor;
                sd_create_form(params);
                params.cancel_btn.click(function () {
                    sd_reset_editor_form(params);
                });
                // 在react组件中hide
                // params.submit_btn.click(function () {
                    // $(this).hide()
                // });
                // 非react环境才监听这个click
                !window['__isR'] && params.submit_btn.click(function () {
                    var tContents = $("#comment_news_" + id).val();
                    
                    if(tContents != undefined){
                        var beforeImage = tContents.split("<img");
                        var afterImage = tContents.split("/>");
                        if(beforeImage[0] == "" && afterImage[1] == ""){
                            notice_box('不支持纯图片评论<br/>请在评论中增加文字信息');
                            return;
                        }
                    }
                    params.form.submit();
                });
                params.textarea.focus(function (){
                    params.editor.focus();
                });
                params.textarea.data('init', 1);
                $(this).show();
            }
        });
    // });

    div_form = $("div[nhname='new_message_" + id + "']");
    $(".ke-edit", div_form).css("height","33px");
    $(".ke-edit-iframe",div_form).css("height","33px");
}