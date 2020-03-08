const $ = window.$;


$(function(){
    //实训首页筛选的移入和点击事件
    $(".shaiItem").hover(function(){
        var hei=parseInt($(".shaiAllItem").height())-2;
        $(this).find(".subshaicontent").css("top",hei);
        $(this).find(".subshaicontent").show();
    },function(){
        $(this).find(".subshaicontent").hide();
    });

    $(".shaiItem").live("click",function(){
        $(".shaiItem").removeClass("active");
        $(this).addClass("active");
        $(".subshaicontent").hide();
    });

    $(".subshaicontent").live("click", function(event){
        $(".subshaicontent").hide();
        event.stopPropagation();
    });

    //最新、最热
    $(".bestChoose").click(function(){
        $(".bestChoose").removeClass("active");
        $(this).addClass("active");
    })

    //实训路径选择导航条
    $(".path-nav li a").live("click",function(){
        $(".path-nav li").removeClass("active");
        $(this).parent().addClass("active");
    })
});

//隐藏我的学习
 function clickControl(item, type){
    var wid=$(item).width();
    var wid1=$(".controlring").width();
    var hidden_course = 1;
    if($(".controlring").css("left")=="1px"){
        $(".controlring").animate({left:parseInt(wid-wid1-1)+"px"});
        $(".controlblue").animate({width:wid+"px"});
        $("input[name='hidden_learn']").val('1');
    }else{
        $(".controlring").animate({left:"1px"});
        $(".controlblue").animate({width:"0px"});
        $("input[name='hidden_learn']").val('');
        hidden_course = 0;
    }
    if(type == "l_shixun"){
        $("#shixun_search_condition").submit();
    } else{
        $.get("/courses?select="+$("#select_type").val()+"&order="+$("#select_order").val()+"&hidden="+hidden_course);
    }
}

// 清空条件
 function clear_style(){
    $("#shixun_search_condition").find('input[type=hidden]').each(function() {
        $(this).val('');
    });
}

// 精选实训的搜索 #type参数( status：实训状态； diff：实训难度； search：实训搜索； order：最新最热排序)
function filter_search(values, type){
    switch(type){
        case "status":
            $("input[name='status']").val(values);
            break;
        case "diff":
            $("input[name='diff']").val(values);
            break;
        case "search":
            $("input[name='search']").val(values);
            break;
    }
    $("#shixun_search_condition").submit();
}

// 点击实训体系名称 # type参数（rep：体系大类别； sub：体系子类别； tags 实训标签； order: 排序）
//               # name参数： 列表显示使用
//               # values参数： 赋值给表单的值
$(".shixun_repertoire").live("click", function(event){
    var type = $(this).attr("data-type");
    var name = $(this).attr("data-name");
    var values = $(this).attr("data-values");
    if(type != 'order'){
        $(".subshaicontent a").removeClass("active");
        $(".shaiItem").removeClass("active");
        $("input[name='repertoire'], input[name='sub_repertoire'], input[name='tag_repertoire']").val('');
    }
    $(this).closest(".shaiItem").addClass("active");
    $(".subshaicontent").hide();
    $("#search_name").html(name);

    switch(type){
        case "rep":
            $("input[name='repertoire']").val(values);
            $("#shixun_search_input").val("");
            $("input[name='search']").val("");
            break;
        case "sub":
            $("input[name='sub_repertoire']").val(values);
            break;
        case "tag":
            $("input[name='tag_repertoire']").val(values);
            break;
        case "order":
            var $sort = $("input[name='sort']");
            var oldValue = $("input[name='order']").val();
            $("input[name='order']").val(values);
            var newValue = $("input[name='order']").val();
            if(oldValue != newValue){
                $("input[name='sort']").val("desc");
            }else {
                if($sort.val() == "desc"){
                    $sort.val("asc");
                }else{
                    $sort.val("desc");
                }
            }
            break;
    }
    $(this).addClass("active"); // 因为order需要判断样式因此写在switch之后
    $("#shixun_search_condition").submit();
    event.stopPropagation();
});


// 实训首页回车搜索
$("#shixun_search_input").live("keyup", function(e){
    // 兼容FF和IE和Opera
    var theEvent = e || window.event;
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
        //回车执行查询
        filter_search($(this).val(), "search");
    }
});