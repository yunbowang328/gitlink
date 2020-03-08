document.write("<link href='https://at.alicdn.com/t/font_653600_qa9lwwv74z.css' rel='stylesheet' type='text/css'/>");

/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
!function(e) {
    var n;
    if ("function" == typeof define && define.amd && (define(e),
    n = !0),
    "object" == typeof exports && (module.exports = e(),
    n = !0),
    !n) {
        var t = window.Cookies
          , o = window.Cookies = e();
        o.noConflict = function() {
            return window.Cookies = t,
            o
        }
    }
}(function() {
    function e() {
        for (var e = 0, n = {}; e < arguments.length; e++) {
            var t = arguments[e];
            for (var o in t)
                n[o] = t[o]
        }
        return n
    }
    function n(e) {
        return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
    }
    return function t(o) {
        function r() {}
        function i(n, t, i) {
            if ("undefined" != typeof document) {
                "number" == typeof (i = e({
                    path: "/"
                }, r.defaults, i)).expires && (i.expires = new Date(1 * new Date + 864e5 * i.expires)),
                i.expires = i.expires ? i.expires.toUTCString() : "";
                try {
                    var c = JSON.stringify(t);
                    /^[\{\[]/.test(c) && (t = c)
                } catch (e) {}
                t = o.write ? o.write(t, n) : encodeURIComponent(String(t)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                n = encodeURIComponent(String(n)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
                var f = "";
                for (var u in i)
                    i[u] && (f += "; " + u,
                    !0 !== i[u] && (f += "=" + i[u].split(";")[0]));
                return document.cookie = n + "=" + t + f
            }
        }
        function c(e, t) {
            if ("undefined" != typeof document) {
                for (var r = {}, i = document.cookie ? document.cookie.split("; ") : [], c = 0; c < i.length; c++) {
                    var f = i[c].split("=")
                      , u = f.slice(1).join("=");
                    t || '"' !== u.charAt(0) || (u = u.slice(1, -1));
                    try {
                        var a = n(f[0]);
                        if (u = (o.read || o)(u, a) || n(u),
                        t)
                            try {
                                u = JSON.parse(u)
                            } catch (e) {}
                        if (r[a] = u,
                        e === a)
                            break
                    } catch (e) {}
                }
                return e ? r[e] : r
            }
        }
        return r.set = i,
        r.get = function(e) {
            return c(e, !1)
        }
        ,
        r.getJSON = function(e) {
            return c(e, !0)
        }
        ,
        r.remove = function(n, t) {
            i(n, "", e(t, {
                expires: -1
            }))
        }
        ,
        r.defaults = {},
        r.withConverter = t,
        r
    }(function() {})
});

$(function() {
    var result = location.search.match(/\?search=(\w*)&?/i)
    if (result && result[1]) {
        var searchText = result[1]
        $('#search-input').val(searchText)
    }
    // 未报名用户登录时弹框
    // console.log(Cookies.get('enroll_status'));
    // if(Cookies.get('enroll_status') == 0){
    //     Cookies.remove('enroll_status');
    //     var html='<div class="CompetitionEnrollBox">'+
    //         '<div class="pr with40">'+
    //         '<img src="/images/educoder/competition/boxEnroll.png" width="100%"/>'+
    //         '<a href="javascript:void(0)" class="CloseBox" onclick="CloseBox();"><i class="iconfont icon-roundclose color-grey-c"></i></a>'+
    //         '<a href="https://www.educoder.net/competitions/gcc-dev-2018/enroll" class="ImmediatelyEnroll">立即报名</a>'+
    //         '</div></div>';
    //     $(".newContainer").append(html);
    // }
});

function CloseBox() {
    $(".CompetitionEnrollBox").remove();
}

//根据页面大小决定侧边栏的位置
$(window).resize(function() {
    rightSlider();
});
function rightSlider() {
    var poi = parseInt((parseInt($(window).width()) - 1200) / 2) - 81;
    // console.log(parseInt($(window).width())+"  "+poi);
    if (poi > 0) {
        $(".-task-sidebar").css("right", poi);
    } else {
        $(".-task-sidebar").css("right", "0px");
    }
    $(".-task-sidebar").show();
}
function open_course(id, allowVisit) {
    if (allowVisit) {
        window.open("/courses/" + id);
    }
}
function open_project(id, allowVisit) {
    if (allowVisit) {
        window.open("/projects/" + id);
    }
}

function conver_size(limit) {
    var size = "";
    if (limit < 1024) {
        //如果小于1KB转化成B
        size = limit.toFixed(2) + "B";
    } else if (limit < 1024 * 1024) {
        //如果小于1MB转化成KB
        size = (limit / 1024).toFixed(2) + "KB";
    } else if (limit < 1024 * 1024 * 1024) {
        //如果小于1GB转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
    } else {
        //其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }

    var sizestr = size + "";
    var len = sizestr.indexOf("\.");
    var dec = sizestr.substr(len + 1, 2);
    if (dec == "00") {
        //当小数点后为00时 去掉小数部分
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
    }
    return sizestr;
}

function _initSider() {
    var $descSide = $("<div class='-task-desc'></div>").appendTo("body");
    $(".-task-sidebar>div").hover(function() {
        //移入显示二维码
        if ($(this).hasClass("scan")) {
            $(".scan_ewm").show().css({
                right: "75px",
                opacity: 0
            }).stop().animate({
                right: "45px",
                opacity: 1
            })
            return;
        }
        var $tool = $(this).attr("tooltips");
        $descSide.html($tool + "<div><img src='/images/edu_user/jt.png'></div>");
        $descSide.data('_dom', this)
        $descSide.show().css({
            left: $(this).offset().left - $descSide.width() - 30,
            opacity: 0,
            top: $(this).offset().top
        }).stop().animate({
            left: $(this).offset().left - $descSide.width() - 5,
            opacity: 1
        }, 400);
    }, function() {
        if ($(this).hasClass("scan")) {
            $(".scan_ewm").stop().animate({
                right: "75px",
                opacity: 0
            }, 200).hide();
        }
        $descSide.stop().animate({
            left: $(this).offset().left - $descSide.width() - 30,
            opacity: 0
        }, 200).hide();
    });
    rightSlider();

    $(window).scroll(function() {
        if ($descSide.height()) {
            var hoverIcon = $descSide.data('_dom')
            $descSide.css('top', $(hoverIcon).offset().top)
        }
    })
}
$(function() {
    // loadHeader();
    _initSider();

    $(window).scroll(function() {
        if ($(".gotop").length > 0) {
            if ($(document).scrollTop() > 0) {
                $(".-task-sidebar .gotop").show();
                $(".gotop").click(function() {
                    $("html,body").scrollTop(0);
                });
            }
            if ($(document).scrollTop() == 0) {
                $(".-task-sidebar .gotop").hide();
            }
        }
    });

    // 翻页的GO
    $(".page_GO").live("keydown", function(event) {
        var code;
        if (!event) {
            event = window.event;
            //针对ie浏览器
            code = event.keyCode;
        } else {
            code = event.keyCode;
        }
        if (code == 13) {
            var prev = $(this).prev().find("a").html().trim();
            var page = $(this).val().trim();
            if (parseInt(prev) >= parseInt(page)) {
                if (typeof ($(this).prev().children("a").attr("href")) == "undefined") {
                    var href = $(this).parent().find("li:first-child").children("a").attr("href");
                } else {
                    var href = $(this).prev().children("a").attr("href");
                }
                var new_href = href.replace(/page=(\d*)/, 'page=' + page);
                console.log(new_href);
                $.get(new_href);
                return false;
            }
        }
    });

    // 试用申请弹框
    $("#apply_trail_submit_btn").live('click', function() {
        if ($("#apply_reason").val().trim() == "") {
            $("#hint_message").show();
        } else {
            $("#hint_message").hide();
            $("#apply_trail_form").submit();
            hideModal();
        }
    });

});

// editor 存在了jquery对象上，应用不需要自己写md_rec_data方法了
function md_rec_data(k, mdu, id) {
    if (window.sessionStorage.getItem(k + mdu) !== null) {
        editor = $("#e_tips_" + id).data('editor');
        editor.setValue(window.sessionStorage.getItem(k + mdu));

        md_clear_data(k, mdu, id);
    }
}
// markdown的自动保存
function md_elocalStorage(editor, mdu, id) {
    if (window.sessionStorage) {
        var oc = window.sessionStorage.getItem('content' + mdu);
        if (oc !== null) {
            $("#e_tips_" + id).data('editor', editor);
            var h = '您上次有已保存的数据，是否<a style="cursor: pointer;" class="link-color-blue" onclick="md_rec_data(\'content\',\'' + mdu + '\',\'' + id + '\')">恢复</a> ? / <a style="cursor: pointer;" class="link-color-blue" onclick="md_clear_data(\'content\',\'' + mdu + '\',\'' + id + '\')">不恢复</a>';
            $("#e_tips_" + id).html(h);
        }
        setInterval(function() {
            d = new Date();
            var h = d.getHours();
            var m = d.getMinutes();
            var s = d.getSeconds();
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            if (editor.getValue().trim() != "") {
                md_add_data("content", mdu, editor.getValue());
                var id1 = "#e_tip_" + id;
                var id2 = "#e_tips_" + id;
                $(id1).html(" 数据已于 " + h + ':' + m + ':' + s + " 保存   ");
                $(id2).html("");
            }
        }, 10000);

    } else {
        $("#e_tip_" + id).after('您的浏览器不支持localStorage.无法开启自动保存草稿服务,请升级浏览器！');
    }
}
// 保存数据
function md_add_data(k, mdu, d) {
    window.sessionStorage.setItem(k + mdu, d);
}
// 恢复数据
//function md_rec_data(k,mdu,id, editor){
//    if(window.sessionStorage.getItem(k+mdu) !== null){
//        editor.setValue(window.sessionStorage.getItem(k+mdu));
//        md_clear_data(k,mdu,id);
//    }
//}
// 清空保存的数据
function md_clear_data(k, mdu, id) {
    window.sessionStorage.removeItem(k + mdu);
    var id1 = "#e_tip_" + id;
    var id2 = "#e_tips_" + id;
    if (k == 'content') {
        $(id2).html("");
    } else {
        $(id1).html("");
    }
}

// editorMD to create
/**
 *
 * @param id  渲染DOM的id
 * @param width 宽度
 * @param high  高度
 * @param placeholder
 * @param imageUrl 上传图片的url
 * @returns {*} 返回一个editorMD实例
 */
function create_editorMD(id, width, high, placeholder, imageUrl, readonly) {
    var readonly = readonly == undefined ? false : readonly;
    var editorName = editormd(id, {
        width: width,
        height: high,
        syncScrolling: "single",
        //你的lib目录的路径，我这边用JSP做测试的
        path: "/editormd/lib/",
        tex: true,
        tocm: true,
        emoji: true,
        taskList: true,
        codeFold: true,
        searchReplace: true,
        htmlDecode: "style,script,iframe",
        sequenceDiagram: true,
        autoFocus: false,
        readonly: readonly,
        toolbarIcons: function() {
            // Or return editormd.toolbarModes[name]; // full, simple, mini
            // Using "||" set icons align right.
            return ["bold", "italic", "|", "list-ul", "list-ol", "|", "code", "code-block", "|", "testIcon", "testIcon1", '|', "image", "table", '|', "watch", "clear"]
        },
        toolbarCustomIcons: {
            testIcon: "<a type=\"inline\" class=\"latex\" ><div class='zbg'></div></a>",
            testIcon1: "<a type=\"latex\" class=\"latex\" ><div class='zbg_latex'></div></a>"
        },
        //这个配置在simple.html中并没有，但是为了能够提交表单，使用这个配置可以让构造出来的HTML代码直接在第二个隐藏的textarea域中，方便post提交表单。
        saveHTMLToTextarea: true,
        // 用于增加自定义工具栏的功能，可以直接插入HTML标签，不使用默认的元素创建图标
        dialogMaskOpacity: 0.6,
        placeholder: placeholder,
        imageUpload: true,
        imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp", "JPG", "JPEG", "GIF", "PNG", "BMP", "WEBP"],
        imageUploadURL: imageUrl,
        //url
        onload: function(cMirror) {
            $("#" + id + " [type=\"latex\"]").bind("click", function() {
                editorName.cm.replaceSelection("```latex");
                editorName.cm.replaceSelection("\n");
                editorName.cm.replaceSelection("\n");
                editorName.cm.replaceSelection("```");
                var __Cursor = editorName.cm.getDoc().getCursor();
                editorName.cm.setCursor(__Cursor.line - 1, 0);
            });

            $("#" + id + " [type=\"inline\"]").bind("click", function() {
                editorName.cm.replaceSelection("$$$$");
                var __Cursor = editorName.cm.getDoc().getCursor();
                editorName.cm.setCursor(__Cursor.line, __Cursor.ch - 2);
                editorName.cm.focus();
            });
            $("[type=\"inline\"]").attr("title", "行内公式");
            $("[type=\"latex\"]").attr("title", "多行公式");
            setTimeout(function() {
                editorName.resize();
                editorName.cm.refresh();
                window.new_md = editorName;
            }, 300);
        }
    });
    return editorName;
}

// editormd to html
/**
 *
 * @param id 渲染的id
 * @param callback onload回調 暫時未用
 */
function editormd_to_html(id, callback) {
    editormd.loadKaTeX(function() {
        editormd.markdownToHTML(id, {
            htmlDecode: "style,script,iframe",
            // you can filter tags decode
            onload: function() {
                callback && callback()
            },
            taskList: true,
            tex: true,
            // 默认不解析
            flowChart: true,
            // 默认不解析
            sequenceDiagram: true// 默认不解析
        });
    });
}

function loadHeader() {
    // //头部导航条的----------显示搜索框
    // $("#search-open").on("click", function(e) {
    //     $(this).hide();
    //     //        $("#header-nav").animate({opacity:"0"},1000);
    //     $(".posi-search").show()
    //     // .animate({opacity:"1"},1000);
    //     $("#header-nav").css("z-index", "2");
    //     $(".posi-search").css("z-index", "3");
    //     // $(".search-input").val("");  //  不清空
    //     $(".search-input").focus();
    //     $(".search-all .search-content").hide();
    //     e.stopPropagation();
    //     //阻止冒泡
    // });
    // $(".search-input").on("click", function(e) {
    //     e.stopPropagation();
    //     //阻止冒泡
    // });
    // //搜索框输入内容
    // $(".search-input").on("input", function(e) {
    //     if ($(".search-input").val() == "") {
    //         $(".search-all .search-content").hide();
    //     } else {
    //         $(".search-all .search-content").show();
    //     }
    //     e.stopPropagation();
    //     //阻止冒泡
    // });
    // //搜索
    // $("#header_keyword_search").on("click", header_search);
    // $("input[name='search_keyword']").on("keydown", function(event) {
    //     var code;
    //     if (!event) {
    //         event = window.event;
    //         //针对ie浏览器
    //         code = event.keyCode;
    //     } else {
    //         code = event.keyCode;
    //     }
    //     if (code == 13) {
    //         header_search();
    //         return false;
    //     }
    // });
    // $(".search-clear").click(function(e) {
    //     e.stopPropagation();
    // });
    // //切换搜索条件
    // $("#searchkey li").click(function(e) {
    //     var key = $($(this).children("a")[0]).html();
    //     switch (key) {
    //     case '实训':
    //         $("#search_type").val('1');
    //         break;
    //     case '课堂':
    //         $("#search_type").val('2');
    //         break;
    //     case '用户':
    //         $("#search_type").val('3');
    //         break;
    //     }
    //     $("#searchkey").siblings(".searchkey").html(key);
    //     //        $("#searchkey").hide();
    //     e.stopPropagation();
    //     //阻止冒泡
    // });
    // //切换选择导航条
    // $("#header-nav li").click(function() {
    //     $("#header-nav li").removeClass("active");
    //     $(this).addClass("active");
    // });
    // //点击页面其它（与搜索框无关的地方）都会将搜索框隐藏，所以与搜索框有关的地方需要阻止冒泡
    // $("body").on("click", function() {
    //     closeSearch();
    // });
		//
    // $(".search_history").on("click", function() {
    //     $("input[name='search_keyword']").val($(this).html());
    //     header_search();
    // });
}

function header_search() {
    var keyword = $("input[name='search_keyword']").val();
    // 搜索关键字
    var index = $("#search_type").val();
    // 搜索课程/项目
    keyword = encodeURIComponent(keyword);
    // $.get('/users/search_shixuns_or_course',
    //     { search: keyword,
    //         index: index});
    window.location.href = "/users/search_shixuns_or_courses" + "?search=" + keyword + "&index=" + index;
    //e.stopPropagation();//阻止冒泡
}

//头部导航条的隐藏
function closeSearch() {
    $('#posi-search').hide();
    $("#search-open").show();
    //    $(".posi-search").animate({opacity:"0"},800);
    $("#header-nav").animate({
        opacity: "1"
    }, 1000);
    $(".posi-search").css("z-index", "2");
    $("#header-nav").css("z-index", "3");
}
(function($) {
    $.fn.drag = function(options) {
        var x, drag = this, isMove = false, defaults = {};
        var options = $.extend(defaults, options);
        //添加背景，文字，滑块
        var html = '<div class="drag_bg"></div>' + '<div class="drag_text" onselectstart="return false;" unselectable="on">请拖住滑块，拖动到最右边</div>' + '<div class="handler handler_bg"></div>';
        this.append(html);

        var handler = drag.find('.handler');
        var drag_bg = drag.find('.drag_bg');
        var text = drag.find('.drag_text');
        var maxWidth = text.width() - handler.width();
        //能滑动的最大间距
        //鼠标按下时候的x轴的位置
        handler.mousedown(function(e) {
            isMove = true;
            x = e.pageX - parseInt(handler.css('left'), 10);
        });

        //鼠标指针在上下文移动时，移动距离大于0小于最大间距，滑块x轴位置等于鼠标移动距离
        $(document).mousemove(function(e) {
            var _x = e.pageX - x;
            var handler_offset = handler.offset();
            var lastX = e.clientX - x;
            lastX = Math.max(0, Math.min(maxWidth, lastX));
            if (isMove) {
                if (_x > 0 && _x <= maxWidth) {
                    handler.css({
                        'left': lastX
                    });
                    drag_bg.css({
                        'width': lastX
                    });
                } else if (lastX > maxWidth - 5 && lastX < maxWidth + 5) {
                    //鼠标指针移动距离达到最大时清空事件
                    dragOk();
                }
            }
        });
        handler.mouseup(function(e) {
            isMove = false;
            var _x = e.pageX - x;
            if (_x < maxWidth) {
                //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
                handler.css({
                    'left': 0
                });
                drag_bg.css({
                    'width': 0
                });
            }
        });

        //清空事件
        function dragOk() {
            var kuaiwidth = drag.width() - handler.width();
            handler.removeClass('handler_bg').addClass('handler_ok_bg');
            handler.css({
                'left': kuaiwidth + 'px'
            })
            text.css({
                'width': kuaiwidth + 'px'
            });
            text.text('验证通过');
            drag.css({
                'color': '#fff'
            });
            drag_bg.css({
                'width': kuaiwidth + 'px'
            })
            handler.unbind('mousedown');
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
            handler.parent().next().find("p").html("").hide();
        }
    }
    ;
}
)(jQuery);

//判断是手机端还是电脑端
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

//Dom：绑定事件的节点对象，ChangeDOM：操作的相关节点，
function LeaveTitle(Dom, ChangeDom) {
    ChangeDom.html("").hide();
    ChangeDom.parent().css({
        opacity: 0,
        left: 0,
        top: 0
    }).hide();
}

$(function() {
    //平台tip的样式优化js
    var $desc = $("<div class=\"-task-title\">" + "<div class=\"data-tip-down\"></div>" + "<div class=\"data-tip-left\"></div>" + "<div class=\"data-tip-right\"></div>" + "<div class=\"data-tip-top\"></div>" + "</div>").appendTo("body");
    //Dom：绑定事件的节点对象，ChangeDOM：操作的相关节点，
    function LeaveTitle(Dom, ChangeDom) {
        Dom.live("mouseleave", function() {
            ChangeDom.html("").hide();
            $desc.css({
                opacity: 0,
                left: 0,
                top: 0
            }).hide();
        })
    }
    LeaveTitle($("[data-tip-top]"), $(".data-tip-top"));
    LeaveTitle($("[data-tip-down]"), $(".data-tip-down"));
    LeaveTitle($("[data-tip-right]"), $(".data-tip-left"));
    LeaveTitle($("[data-tip-left]"), $(".data-tip-right"));
    $("[data-tip-top]").live("mouseenter", function() {
        var $tool = $(this).attr("data-tip-top");
        if ($tool != "") {
            $(".data-tip-top").show().html($tool);
            $desc.show().css({
                left: $(this).offset().left - ($desc.width() - $(this).outerWidth()) / 2,
                opacity: 1,
                top: $(this).offset().top - 30
            });
        }
    });
    $("[data-tip-down]").live("mouseenter", function() {
        var $tool = $(this).attr("data-tip-down");
        if ($tool != "") {
            $(".data-tip-down").show().html($tool);
            $desc.show().css({
                left: $(this).offset().left - ($desc.width() - $(this).outerWidth()) / 2,
                opacity: 1,
                top: $(this).offset().top + $(this).height() + 6
            });
        }
    });
    $("[data-tip-right]").live("mouseenter", function() {
        var $tool = $(this).attr("data-tip-right");
        if ($tool != "") {
            console.log($(this).offset().left + "  " + $(this).width());
            $(".data-tip-left").show().html($tool);
            $desc.show().css({
                left: $(this).offset().left + $(this).outerWidth() + 6,
                opacity: 1,
                top: $(this).offset().top - ($desc.height() - $(this).height()) / 2
            });
        }
    });
    $("[data-tip-left]").live("mouseenter", function() {
        var $tool = $(this).attr("data-tip-left");
        if ($tool != "") {
            $(".data-tip-right").show().html($tool);
            $desc.show().css({
                left: $(this).offset().left - $desc.width() - 6,
                opacity: 1,
                top: $(this).offset().top - ($desc.height() - $(this).height()) / 2
            });
        }
    });
    unitDownOption();
});

function unitDownOption() {
    //下拉框
    $("[select-for]").append("<i class='fa fa-sort-desc lesson_img color-grey-8'></i>");
    $("[select-for]").hover(function() {
        $(this).find(".down-select").show();
    }, function() {
        $(this).find(".down-select").hide();
    })
    $("[select-for] .down-select p").bind("click", function() {
        //alert($(this).attr("data-shixun-value"));
        if ($(this).attr("id") == "diy_script") {
            return;
            // 实训新建-选择自定义脚本diy
        }
        $(this).parents(".down-select").siblings("input[type=hidden]").attr("value", $(this).attr("data-shixun-value"));

        $(this).parents(".down-select").siblings("input[type=text]").val($(this).html().trim());
        $(this).parents(".down-select").hide();
    })
}

//初始化省份
function showprovince(id) {
    var arrary = ["北京", "上海", "广东", "江苏", "浙江", "重庆", "安徽", "福建", "甘肃", "广西", "贵州", "海南", "河北", "黑龙江", "河南", "湖北", "湖南", "江西", "吉林", "辽宁", "内蒙古", "宁夏", "青海", "山东", "山西", "陕西", "四川", "天津", "新疆", "西藏", "云南", "香港特别行政区", "澳门特别行政区", "台湾", "海外"];
    var html = "<option value=\"0\">请选择所在省份</option>"
    for (var i = 0; i < arrary.length; i++) {
        var item = arrary[i];
        html += "<option value=\"" + item + "\">" + item + "</option>";
    }
    $("#" + id).html(html);
}

//省市下拉框
function showcity(province, cityField) {
    switch (province) {
    case "北京":
        var cityOptions = new Array("东城","西城","朝阳","丰台","石景山","海淀","门头沟","房山","通州","顺义","昌平","大兴","平谷","怀柔","密云","延庆");
        break;
    case "上海":
        var cityOptions = new Array("崇明","黄浦","卢湾","徐汇","长宁","静安","普陀","闸北","虹口","杨浦","闵行","宝山","嘉定","浦东","金山","松江","青浦","南汇","奉贤");
        break;
    case "广东":
        var cityOptions = new Array("广州","深圳","珠海","东莞","中山","佛山","惠州","河源","潮州","江门","揭阳","茂名","梅州","清远","汕头","汕尾","韶关","顺德","阳江","云浮","湛江","肇庆");
        break;
    case "江苏":
        var cityOptions = new Array("南京","常熟","常州","海门","淮安","江都","江阴","昆山","连云港","南通","启东","沭阳","宿迁","苏州","太仓","泰州","同里","无锡","徐州","盐城","扬州","宜兴","仪征","张家港","镇江","周庄");
        break;
    case "重庆":
        var cityOptions = new Array("万州","涪陵","渝中","大渡口","江北","沙坪坝","九龙坡","南岸","北碚","万盛","双挢","渝北","巴南","黔江","长寿","綦江","潼南","铜梁","大足","荣昌","壁山","梁平","城口","丰都","垫江","武隆","忠县","开县","云阳","奉节","巫山","巫溪","石柱","秀山","酉阳","彭水","江津","合川","永川","南川");
        break;
    case "安徽":
        var cityOptions = new Array("合肥","安庆","蚌埠","亳州","巢湖","滁州","阜阳","贵池","淮北","淮化","淮南","黄山","九华山","六安","马鞍山","宿州","铜陵","屯溪","芜湖","宣城");
        break;
    case "福建":
        var cityOptions = new Array("福州","厦门","泉州","漳州","龙岩","南平","宁德","莆田","三明");
        break;
    case "甘肃":
        var cityOptions = new Array("兰州","白银","定西","敦煌","甘南","金昌","酒泉","临夏","平凉","天水","武都","武威","西峰","张掖");
        break;
    case "广西":
        var cityOptions = new Array("南宁","百色","北海","桂林","防城港","贵港","河池","贺州","柳州","钦州","梧州","玉林");
        break;
    case "贵州":
        var cityOptions = new Array("贵阳","安顺","毕节","都匀","凯里","六盘水","铜仁","兴义","玉屏","遵义");
        break;
    case "海南":
        var cityOptions = new Array("海口","儋县","陵水","琼海","三亚","通什","万宁");
        break;
    case "河北":
        var cityOptions = new Array("石家庄","保定","北戴河","沧州","承德","丰润","邯郸","衡水","廊坊","南戴河","秦皇岛","唐山","新城","邢台","张家口");
        break;
    case "黑龙江":
        var cityOptions = new Array("哈尔滨","北安","大庆","大兴安岭","鹤岗","黑河","佳木斯","鸡西","牡丹江","齐齐哈尔","七台河","双鸭山","绥化","伊春");
        break;
    case "河南":
        var cityOptions = new Array("郑州","安阳","鹤壁","潢川","焦作","济源","开封","漯河","洛阳","南阳","平顶山","濮阳","三门峡","商丘","新乡","信阳","许昌","周口","驻马店");
        break;
    case "香港":
        var cityOptions = new Array("香港","九龙","新界");
        break;
    case "湖北":
        var cityOptions = new Array("武汉","恩施","鄂州","黄冈","黄石","荆门","荆州","潜江","十堰","随州","武穴","仙桃","咸宁","襄阳","襄樊","孝感","宜昌");
        break;
    case "湖南":
        var cityOptions = new Array("长沙","常德","郴州","衡阳","怀化","吉首","娄底","邵阳","湘潭","益阳","岳阳","永州","张家界","株洲");
        break;
    case "江西":
        var cityOptions = new Array("南昌","抚州","赣州","吉安","景德镇","井冈山","九江","庐山","萍乡","上饶","新余","宜春","鹰潭");
        break;
    case "吉林":
        var cityOptions = new Array("长春","吉林","白城","白山","珲春","辽源","梅河","四平","松原","通化","延吉");
        break;
    case "辽宁":
        var cityOptions = new Array("沈阳","鞍山","本溪","朝阳","大连","丹东","抚顺","阜新","葫芦岛","锦州","辽阳","盘锦","铁岭","营口");
        break;
    case "澳门":
        var cityOptions = new Array("澳门");
        break;
    case "内蒙古":
        var cityOptions = new Array("呼和浩特","阿拉善盟","包头","赤峰","东胜","海拉尔","集宁","临河","通辽","乌海","乌兰浩特","锡林浩特");
        break;
    case "宁夏":
        var cityOptions = new Array("银川","固源","石嘴山","吴忠");
        break;
    case "青海":
        var cityOptions = new Array("西宁","德令哈","格尔木","共和","海东","海晏","玛沁","同仁","玉树");
        break;
    case "山东":
        var cityOptions = new Array("济南","滨州","兖州","德州","东营","菏泽","济宁","莱芜","聊城","临沂","蓬莱","青岛","曲阜","日照","泰安","潍坊","威海","烟台","枣庄","淄博");
        break;
    case "山西":
        var cityOptions = new Array("太原","长治","大同","候马","晋城","离石","临汾","宁武","朔州","忻州","阳泉","榆次","运城");
        break;
    case "陕西":
        var cityOptions = new Array("西安","安康","宝鸡","汉中","渭南","商州","绥德","铜川","咸阳","延安","榆林");
        break;
    case "四川":
        var cityOptions = new Array("成都","巴中","达川","德阳","都江堰","峨眉山","涪陵","广安","广元","九寨沟","康定","乐山","泸州","马尔康","绵阳","眉山","南充","内江","攀枝花","遂宁","汶川","西昌","雅安","宜宾","自贡","资阳");
        break;
    case "台湾":
        var cityOptions = new Array("台北","基隆","台南","台中","高雄","屏东","南投","云林","新竹","彰化","苗栗","嘉义","花莲","桃园","宜兰","台东","金门","马祖","澎湖");
        break;
    case "天津":
        var cityOptions = new Array("天津","和平","东丽","河东","西青","河西","津南","南开","北辰","河北","武清","红挢","塘沽","汉沽","大港","宁河","静海","宝坻","蓟县");
        break;
    case "新疆":
        var cityOptions = new Array("乌鲁木齐","阿克苏","阿勒泰","阿图什","博乐","昌吉","东山","哈密","和田","喀什","克拉玛依","库车","库尔勒","奎屯","石河子","塔城","吐鲁番","伊宁");
        break;
    case "西藏":
        var cityOptions = new Array("拉萨","阿里","昌都","林芝","那曲","日喀则","山南");
        break;
    case "云南":
        var cityOptions = new Array("昆明","大理","保山","楚雄","大理","东川","个旧","景洪","开远","临沧","丽江","六库","潞西","曲靖","思茅","文山","西双版纳","玉溪","中甸","昭通");
        break;
    case "浙江":
        var cityOptions = new Array("杭州","安吉","慈溪","定海","奉化","海盐","黄岩","湖州","嘉兴","金华","临安","临海","丽水","宁波","瓯海","平湖","千岛湖","衢州","江山","瑞安","绍兴","嵊州","台州","温岭","温州","余姚","舟山");
        break;
    case "海外":
        var cityOptions = new Array("美国","日本","英国","法国","德国","其他");
        break;
    default:
        var cityOptions = new Array("请选择所在城市");
        break;
    }

    cityField.options.length = 0;
    for (var i = 0; i < cityOptions.length; i++) {
        cityField.options[i] = new Option(cityOptions[i],cityOptions[i]);
        /*
         if (cityField.options[i].value==city)
         {
         //alert("here put City ok!");
         document.oblogform["city"].selectedIndex = i;
         }*/
    }
}

/*弹框*/
// 公共弹框样式
// 建议左右栏的：Width：460，Height：190
// 建议宽屏对应值：Width：760，Height：500
function pop_box_new(value, Width, Height, close) {

    if ($("#popupAll").length > 0) {
        $("#popupAll").remove();
    }
    w = ($(window).width() - Width) / 2;
    h = ($(window).height() - Height) / 2;
    var html = "<div class=\"popupAll none\" id='popupAll'><div class=\"pr\"><div id=\"popupWrap\"></div></div></div>";
    if (close) {
        value = "<a href='javascript:void(0)' id='closeIcon'><i class='iconfont icon-shanchudiao'></i></a>" + value;
    }
    $(document.body).append(html);
    $("#popupWrap").html(value);
    $('#popupWrap').css({
        "top": h + "px",
        "left": w + "px",
        "padding": "0",
        "border": "none",
        "position": "fixed",
        "z-index": "99999",
        "background-color": "#fff",
        "border-radius": "10px"
    });
    if (close) {
        $('#closeIcon').css({
            "top": "-26px",
            "left": Width + "px",
            "z-index": "100000"
        });
    }

    $("#popupWrap").parent().parent().show();
    $('#popupAll').find("#closeIcon").click(function() {
        $("#popupAll").hide();
    });
    $('#popupAll').find("a[class*='pop_close']").click(function() {
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
        this.div.onmousedown = function(evt) {
            _this.getDistance(evt);
            document.onmousemove = function(evt) {
                _this.setPosition(evt);
            }
            ;
            _this.div.onmouseup = function() {
                _this.clearEvent();
            }
        }
    }
    Drag.prototype.getDistance = function(evt) {
        var oEvent = evt || event;
        this.disX = oEvent.clientX - this.div.offsetLeft;
        this.disY = oEvent.clientY - this.div.offsetTop;
    }
    ;
    Drag.prototype.setPosition = function(evt) {
        var oEvent = evt || event;
        var l = oEvent.clientX - this.disX;
        var t = oEvent.clientY - this.disY;
        if (l <= 0) {
            l = 0;
        } else if (l >= document.documentElement.clientWidth - this.div.offsetWidth) {
            l = document.documentElement.clientWidth - this.div.offsetWidth;
        }
        if (t <= 0) {
            t = 0;
        } else if (t >= document.documentElement.clientHeight - this.div.offsetHeight) {
            t = document.documentElement.clientHeight - this.div.offsetHeight;
        }
        this.div.style.left = l + "px";
        this.div.style.top = t + "px";
    }
    ;
    Drag.prototype.clearEvent = function() {
        this.div.onmouseup = null;
        document.onmousemove = null;
    }
    ;

    new Drag("popupWrap");

    $("#popupAll input, #popupAll textarea, #popupAll select, #popupAll ul, #popupAll a,#shixun_search_form_div").mousedown(function(event) {
        event.stopPropagation();
        new Drag("popupWrap");
    });

}

function hideModal(el) {
    if ($("#popupAll").length > 0) {
        $("#popupAll").remove();
    } else {
        var modal;
        if (el) {
            modal = $(el).parents('.ui-dialog-content');
        } else {
            modal = $('#ajax-modal');
        }
        modal.dialog("close");
    }
}

//提示框：只有一个确定按钮，点击跳转
//<a href="'+ url +'" class="pop_close"><i class="fa fa-times-circle font-18 link-color-grey fr mt5"></i></a>
function notice_box_redirect(url, str) {
    var htmlvalue = '<div class="task-popup" style="width:480px;"><div class="task-popup-title clearfix font-20">提示</div>' + '<div class="task-popup-content"><p class="task-popup-text-center font-16 mt15 mb15">' + str + '</p></div><div class="task-popup-sure clearfix">' + '<a href="' + url + '" class="task-btn task-btn-orange" onclick="hideModal();">确定</a></div></div>';
    pop_box_new(htmlvalue, 480, 160);
}
//按钮内容自定义（自定义按钮需要remote=true,且有取消按钮）
function notice_operation_box(url, str, btnstr) {
    var htmlvalue = '<div class="task-popup" style="width:480px;"><div class="task-popup-title clearfix">提示</div>' + '<div class="task-popup-content"><p class="task-popup-text-center font-16">' + str + '</p></div><div class="task-popup-OK clearfix">' + '<a href="javascript:void(0);" onclick="hideModal();" class="task-btn mr20">取消</a><a href="' + url + '" class="task-btn task-btn-orange" onclick="hideModal();" target="_blank" remote="true">' + btnstr + '</a></div></div>';
    pop_box_new(htmlvalue, 480, 160);
}
//点击删除时的确认弹框: 不走destroy方法
function delete_confirm_box(url, str) {
    var htmlvalue = '<div class="task-popup" style="width:480px;"><div class="task-popup-title clearfix">提示</div>' + '<div class="task-popup-content"><p class="task-popup-text-center font-16">' + str + '</p></div><div class="task-popup-submit clearfix"><a href="javascript:void(0);" onclick="hideModal();" class="task-btn fl">取消</a>' + '<a href="' + url + '" class="task-btn task-btn-orange fr" onclick="hideModal();" data-remote="true" id="task_popup_confirm">确定</a></div></div>';
    pop_box_new(htmlvalue, 480, 160);
}
//点击删除时的确认弹框: 走destroy方法,remote为true
function delete_confirm_box_2(url, str) {
    var htmlvalue = '<div class="task-popup" style="width:480px;"><div class="task-popup-title clearfix">提示</div>' + '<div class="task-popup-content"><div class="task-popup-text-center font-14">' + str + '</div></div><div class="task-popup-submit clearfix"><a href="javascript:void(0);" onclick="hideModal();" class="task-btn fl">取消</a>' + '<a href="' + url + '" class="task-btn task-btn-orange fr" onclick="hideModal();" data-method="delete" data-remote="true">确定</a></div></div>';
    pop_box_new(htmlvalue, 480, 160);
}

// 点击确定的时候ajax请求，两个按钮 点击确认跳转, 提示信息可以多行
function op_confirm_box_remote(url, str) {
    var htmlvalue = '<div class="task-popup" style="width:578px;"><div class="task-popup-title clearfix">提示</div>' + '<div class="task-popup-content"><p class="task-popup-text-center font-16">' + str + '</p></div><div class="task-popup-submit clearfix"><a href="javascript:void(0);" onclick="hideModal();" class="task-btn fl">取消</a>' + '<a href="' + url + '" class="task-btn task-btn-orange fr" onclick="hideModal();" data-remote="true">确定</a></div></div>';
    pop_box_new(htmlvalue, 578, 205);
}

//点击删除时的确认弹框: post,remote为true
function post_confirm_box(url, str) {
    var htmlvalue = '<div class="task-popup" style="width:480px;"><div class="task-popup-title clearfix"><h3 class="fl color-grey3">提示</h3><a href="javascript:void(0);" class="pop_close"><i class="fa fa-times-circle font-18 link-color-grey fr mt5"></i></a></div>' + '<div class="task-popup-content"><p class="task-popup-text-center font-16">' + str + '</p></div><div class="task-popup-submit clearfix"><a href="javascript:void(0);" onclick="hideModal();" class="task-btn fl">取消</a>' + '<a href="' + url + '" class="task-btn task-btn-orange fr pop_close" data-method="POST" data-remote="true">确定</a></div></div>';
    pop_box_new(htmlvalue, 480, 160);
}

//提示框：只有一个确定按钮，点击关闭弹框
//<a href="javascript:void(0);" class="pop_close"><i class="fa fa-times-circle font-18 link-color-grey fr mt5"></i></a>
function notice_box(str) {
    var htmlvalue = '<div class="task-popup" style="width:480px;"><div class="task-popup-title clearfix">提示</div>' + '<div class="task-popup-content"><p class="task-popup-text-center font-16">' + str + '</p></div><div class="task-popup-sure clearfix">' + '<a href="javascript:void(0);" class="task-btn task-btn-orange" onclick="hideModal();">确定</a></div></div>';
    pop_box_new(htmlvalue, 480, 160);
}

//点击删除时的确认弹框: 走destroy方法
function delete_confirm_box_3(url, str) {
    var htmlvalue = '<div class="task-popup" style="width:480px;"><div class="task-popup-title clearfix">提示</div>' + '<div class="task-popup-content"><p class="task-popup-text-center font-16">' + str + '</p></div><div class="task-popup-submit clearfix"><a href="javascript:void(0);" onclick="hideModal();" class="task-btn fl">取消</a>' + '<a href="' + url + '" class="task-btn task-btn-orange fr" data-method="delete" onclick="hideModal();">确定</a></div></div>';
    pop_box_new(htmlvalue, 480, 160);
}

//取消和确定，确定会调用自定义方法
function op_confirm_tip(str, func) {
    var htmlvalue = '<div class="task-popup" style="width:500px;"><div class="task-popup-title clearfix">提示</div>' + '<div class="task-popup-content"><p class="task-popup-text-center font-16">' + str + '</p></div><div class="task-popup-submit clearfix"><a href="javascript:void(0);" onclick="hideModal();" class="task-btn fl">取消</a>' + '<a href="javascript:void(0)" class="task-btn task-btn-orange fr" onclick="' + func + '();">确定</a></div></div>';
    pop_box_new(htmlvalue, 500, 205);
}

//取消和确定，确定会调用自定义方法（带参数）
function op_confirm_tip_1(str, func) {
    var htmlvalue = '<div class="task-popup" style="width:500px;"><div class="task-popup-title clearfix">提示</div>' + '<div class="task-popup-content"><p class="task-popup-text-center font-16">' + str + '</p></div><div class="task-popup-submit clearfix"><a href="javascript:void(0);" onclick="hideModal();" class="task-btn fl">取消</a>' + '<a href="javascript:void(0)" class="task-btn task-btn-orange fr" onclick="' + func + '">确定</a></div></div>';
    pop_box_new(htmlvalue, 500, 205);
}

function op_confirm_box_loading(url, str) {
    var htmlvalue = '<div class="task-popup" style="width:578px;"><div class="task-popup-title clearfix">提示</div>' + '<div class="task-popup-content"><p class="task-popup-text-center font-16 pt15">' + str + '</p></div><div class="task-popup-submit clearfix"><a href="javascript:void(0);" onclick="hideModal();" class="task-btn fl">取消</a>' + '<a href="' + url + '" class="task-btn task-btn-orange fr" onclick="hideModal();$(\'.loading_all\').show();">确定</a></div></div>';
    pop_box_new(htmlvalue, 578, 205);
}

// 两个按钮 点击确认跳转, 提示信息有两行
function s_op_confirm_box(url, str) {
    var htmlvalue = '<div class="task-popup" style="width:480px;"><div class="task-popup-title clearfix">提示</div>' + '<div class="task-popup-content"><p class="task-popup-text-center font-16">' + str + '</p></div><div class="task-popup-submit clearfix"><a href="javascript:void(0);" onclick="hideModal();" class="task-btn fl">取消</a>' + '<a href="' + url + '" class="task-btn task-btn-orange fr" onclick="hideModal();">确定</a></div></div>';
    pop_box_new(htmlvalue, 480, 205);
}

function suofang() {
    var html = '<div><p class="mb20 font-16 edu-txt-center">可能会影响某些功能的正常使用</p><ul class="mb20 color-grey-6" style="width: 372px;margin:0px auto;">' + '<li>1.请尝试调整浏览器缩放比例为<span class="color-orange mr5">100%</span>（快捷键ctrl+0）</li>' + '<li>2.请尝试调整系统显示比例为<span class="color-orange mr5">100%</span>（控制面板/显示 设置）</li>' + '</ul></div>';
    sure_confirm_box("页面缩放比例不正确", 600, 310, html);
}

//一个“知道了”按钮，title和宽度都作为参数
function sure_confirm_box(title, width, height, str) {
    var htmlvalue = '<div class="task-popup" style="width:' + width + 'px;"><div class="task-popup-title clearfix">' + title + '</div>' + '<div class="task-popup-content edu-txt-center">' + str + '</div><div class="mb30 edu-txt-center clearfix">' + '<a href="javascript:void(0)" class="task-btn task-btn-orange" onclick="hideModal();">知道了</a></div></div>';
    pop_box_new(htmlvalue, width, height);
}

function throttle(method, context, e) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function() {
        method.call(context, e);
    }, 500);
}

function apply_publish_shixun(url) {
    if ($("#apply_publish_shixun").attr("data-option") == '1') {
        $("#apply_publish_shixun").attr("data-option", 0);
        $("#apply_publish_shixun").addClass("disabled-grey-bg");
        $.ajax({
            url: url,
            type: 'get'
        });
    }
}

var autoTextarea = function(elem, extra, maxHeight) {
    extra = extra || 0;
    var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX'in window
      , isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera')
      , addEvent = function(type, callback) {
        elem.addEventListener ? elem.addEventListener(type, callback, false) : elem.attachEvent('on' + type, callback);
    }
      , getStyle = elem.currentStyle ? function(name) {
        var val = elem.currentStyle[name];

        if (name === 'height' && val.search(/px/i) !== 1) {
            var rect = elem.getBoundingClientRect();
            return rect.bottom - rect.top - parseFloat(getStyle('paddingTop')) - parseFloat(getStyle('paddingBottom')) + 'px';
        }
        ;
        return val;
    }
    : function(name) {
        return getComputedStyle(elem, null)[name];
    }
      , minHeight = parseFloat(getStyle('height'));

    elem.style.resize = 'none';

    var change = function() {
        var scrollTop, height, padding = 0, style = elem.style;

        if (elem._length === elem.value.length)
            return;
        elem._length = elem.value.length;

        if (!isFirefox && !isOpera) {
            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
        }
        ;scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
                height = maxHeight - padding;
                style.overflowY = 'auto';
            } else {
                height = elem.scrollHeight - padding + 10;
                style.overflowY = 'hidden';
            }
            ;style.height = height + extra + 'px';
            scrollTop += parseInt(style.height) - elem.currHeight;
            //document.body.scrollTop = scrollTop;
            //document.documentElement.scrollTop = scrollTop;
            elem.currHeight = parseInt(style.height);
        }
        ;
    };

    addEvent('propertychange', change);
    addEvent('input', change);
    addEvent('focus', change);
    change();
};

// 点击按钮复制功能
function jsCopy() {
    var e = document.getElementById("copy_rep_content");
    e.select();
    document.execCommand("Copy");
}

// 使用resize事件监听窗口的zoom，如果zoom变化了，弹框提示；初始化时也检查zoom是否是100%。
function _initZoomCheck() {
    if (!IsPC()) {
        // 手机端不需要提示
        return;
    }
    var isNormalZoom = Math.round(window.devicePixelRatio * 100) === 100
    if (!isNormalZoom) {
        suofang();
    }

    $(window).resize(function() {
        var isNormalZoom = Math.round(window.devicePixelRatio * 100) === 100
        if (!isNormalZoom) {
            suofang();
        } else {
            $('.task-btn.task-btn-orange:visible').click()
        }
    })

}

var win_resize = function() {
    var _w = $(window).width() - 1200;
    if (_w < 0) {
        $('.newHeader>.educontent').width('auto')
    } else {
        $('.newHeader>.educontent').width('1200px')
    }
};

function initWindowResize() {
    if (location.pathname === '/login') {
        // 登录页不需要
        return;
    }

    $(function() {
        setTimeout(function() {
            win_resize();
        }, 1000)
    })

    $(window).resize(function() {
        win_resize()
    })
}
initWindowResize();

// 登录刷新 https://stackoverflow.com/questions/28230845/communication-between-tabs-or-windows
if (window['BroadcastChannel']) {
    var bc = new BroadcastChannel('ec_reload');
    bc.onmessage = function(ev) {
        if (window['ec_reload_msg_send_window']) {
            window['ec_reload_msg_send_window'] = false;
        } else {
            location.reload();
        }
    }
}
function _sendReloadMsg() {
    var bc = new BroadcastChannel('ec_reload');
    window['ec_reload_msg_send_window'] = true;
    // 消息发出的窗口，不需要处理该消息
    bc.postMessage('ec_reload');
    /* send */
}
// IE11 没有 startsWith
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    }
    ;
    String.prototype.endsWith = function(search, this_len) {
        if (this_len === undefined || this_len > this.length) {
            this_len = this.length;
        }
        return this.substring(this_len - search.length, this_len) === search;
    }
    ;
}

function clickNewsubscript() {
    $(".newsubscript").hide();
    $(".newedbox").addClass("newminheight");
    $(".newedbox").removeClass("newedboxheight");
}

/** tpm实训开启按钮，不允许多次点击  START                  */
//点击模拟实战或者开启实战等，按钮变灰内容变成“开启中”
var operationItem = null;
var operationButtonOldValue = null;
function opClickString(item) {
    var value = $(item).html();
    $(item).css({
        'background': 'gray',
        'border': '1px solid grey',
        'pointer-events': 'none'
    });
    $(item).html('开启中');

    operationButtonOldValue = value
    operationItem = item
    // setTimeout(function(){ $(item).css('background', '#4CACFF');$(item).html(value); }, 4000)
}
// 
// var isOperationSending = false;
$(document).bind('ajaxStop', function(event, xhr, settings) {
    if (settings && settings.url && (settings.url.match(/operation\?/))) {
        if (operationItem) {
            $(operationItem).css('background', '#4CACFF').css('pointer-events', 'inherit');
            $(operationItem).html(operationButtonOldValue);
        }
    }
});
$(document).bind('ajaxError', function(event, xhr, settings) {
    if (settings && settings.url && (settings.url.match(/operation\?/))) {
        if (operationItem) {
            $(operationItem).css('background', '#4CACFF').css('pointer-events', 'inherit');
            $(operationItem).html(operationButtonOldValue);
        }
    }
});
/** tpm实训开启按钮，不允许多次点击  END                  */
