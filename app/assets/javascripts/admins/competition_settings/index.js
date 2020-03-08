$(document).on('turbolinks:load', function(){
    if ($('body.admins-competition-settings-index-page').length > 0) {

        var dateOptions = {
            autoclose: true,
            language: 'zh-CN',
            format: 'yyyy-mm-dd',
            startDate: '2017-04-01'
        };

        var timeOptions = {
            autoclose: 1,
            language: 'zh-CN',
            format: 'yyyy-mm-dd hh:ii',
            minuteStep: 30
        };

        var defineDateRangeSelect = function (element) {
            var options = $.extend({inputs: $(element).find('.start-date, .end-date')}, dateOptions);
            $(element).datepicker(options);

            $(element).find('.start-date').datepicker().on('changeDate', function (e) {
                $(element).find('.end-date').datepicker('setStartDate', e.date);
            });
        };
        $(".competition-start-end-date .start-date").datetimepicker(timeOptions);

        $(".competition-start-end-date .end-date").datetimepicker(timeOptions);

        $(".nav-setting-form .enroll_end_time").datetimepicker(timeOptions);

        $(".stage-update-form .section-start-time").datetimepicker(timeOptions);
        $(".stage-update-form .section-end-time").datetimepicker(timeOptions);

        defineDateRangeSelect('.teaching-mode-date');
        // defineTimeRangeSelect('.competition-start-end-date');

        var $basicForm = $('form.basic-setting-form');

        $basicForm.validate({
            errorElement: 'span',
            errorClass: 'danger text-danger',
            rules: {
                name: "required",
                subTitle: "required",
                startTime: "required",
                endTime: "required",
                mode: "required",
                identifier: "required"
            }
        });

        // 保存按钮
        $basicForm.on('click', ".submit-btn", function () {
            $basicForm.find('.submit-btn').attr('disabled', 'disabled');
            $basicForm.find('.error').html('');
            var valid = $basicForm.valid();

            if ($("input[name='mode']:checked").val() == 2) {
                var $courseId = $("input[name='course_id']");
                if ($courseId.val() === undefined || $courseId.val().length === 0) {
                    $courseId.addClass('danger text-danger');
                    valid = false;
                } else {
                    $courseId.removeClass('danger text-danger');
                }
            } else if ($("input[name='mode']:checked").val() == 3) {
                var $techStartTime = $("input[name='teach_start_time']");
                var $techEndTime = $("input[name='teach_end_time']");
                if ($techStartTime.val() === undefined || $techStartTime.val().length === 0) {
                    $techStartTime.addClass('danger text-danger');
                    valid = false;
                } else {
                    $techStartTime.removeClass('danger text-danger');
                }

                if ($techEndTime.val() === undefined || $techEndTime.val().length === 0) {
                    $techEndTime.addClass('danger text-danger');
                    valid = false;
                } else {
                    $techEndTime.removeClass('danger text-danger');
                }
            } else {
                $("input[name='course_id']").removeClass('danger text-danger');
                $("input[name='teach_start_time']").removeClass('danger text-danger');
                $("input[name='teach_end_time']").removeClass('danger text-danger');
            }

            if (!valid) return;
            $.ajax({
                method: 'POST',
                dataType: 'json',
                url: $basicForm.attr('action'),
                data: new FormData($basicForm[0]),
                processData: false,
                contentType: false,
                success: function (data) {
                    $.notify({message: '保存成功'});
                    // window.location.reload();
                },
                error: function (res) {
                    var data = res.responseJSON;
                    $basicForm.find('.error').html(data.message);
                },
                complete: function () {
                    $basicForm.find('.submit-btn').attr('disabled', false);
                }
            });
        });

        var selectOptions = {
            theme: 'bootstrap4',
              placeholder: '请输入要添加的单位名称',
              multiple: true,
              minimumInputLength: 1,
              ajax: {
              delay: 500,
                url: '/api/schools/search.json',
                dataType: 'json',
                data: function(params){
                return { keyword: params.term };
              },
              processResults: function(data){
                return { results: data.schools }
              }
            },
            templateResult: function (item) {
              if(!item.id || item.id === '') return item.text;
              return item.name || item.text;
            },
            templateSelection: function(item){
              return item.name || item.text;
            }
        };

        $('.sponsor-select').select2(selectOptions);
        $('.allow-school-select').select2(selectOptions);

        $('.manager-select').select2({
          theme: 'bootstrap4',
          placeholder: '请输入要添加的管理员姓名',
          multiple: true,
          minimumInputLength: 1,
          ajax: {
            delay: 500,
            url: '/admins/users',
            dataType: 'json',
            data: function(params){
              return { keyword: params.term };
            },
            processResults: function(data){
              return { results: data.users }
            }
          },
          templateResult: function (item) {
            if(!item.id || item.id === '') return item.text;
						return $("<div class='row px-0'><span class='col-3'>" + item.real_name + "</span><span class='col-5 font-12'>" + item.school_name + "</span><span class='col-4 font-12'>" + item.hidden_phone + "</span></div>");
          },
          templateSelection: function(item){
            if (item.id) {
            }
            return item.real_name || item.text;
          }
        });


        // 排行榜
        //链接
        $(".nav-setting-form").on("click",".add_linkBtn",function () {
            var length=$(".nav-setting-form").find(".linkFormItem").length + 1;
            var html='<div class="row mt-2 align-items-center linkFormItem">\n' +
                '          <div class="col-1 text-right">\n' +
                '            <label class="checkbox checkbox-primary mt-1">\n' +
                '              <input type="checkbox" name="navbar[][hidden]" value="0" hidden class="font-16" checked="checked">\n' +
                '              <input type="checkbox" value="0" class="font-16 module_hidden" checked="checked">\n' +
                '            </label>\n' +
                '          </div>\n' +
                '          <div class="col-md-label mt-1"><input type="hidden" value="md" name="navbar[][module_type]">\n' +
                '          <input type="text" name="navbar[][name]" value="" class="form-control" placeholder="模块名称"></div>\n' +
                '          <div class="col-md-1 mt-1"><input type="text" name="navbar[][position]" value="" class="form-control" placeholder="位置"></div>\n' +
                '          <div class="col-md-3 mt-1"><input type="text" name="navbar[][url]" value="" class="form-control" placeholder="请输入资料下载地址"></div>\n' +
                '          <a class="mt-1 btn btn-primary waves-effect waves-light btn-xs setBtn_s add_linkBtn" href="javascript:void(0)">+</a>\n' +
                '          <a class="mt-1 btn btn-icon waves-effect btn-default waves-light setBtn_s ml10 del_linkBtn" href="javascript:void(0)">×</a>\n' +
                '        </div>';
            $(this).parents(".linkFormItem").after(html);
        });

        $(".nav-setting-form").on("click", ".del_linkBtn", function () {
            $(this).parents(".linkFormItem").remove();
        });

        //有关报名要求
        $(".addRequireBtn").on("click",function () {
            var length=$("#requireForm").find(".requireForm_item").length + 1;
            var html='<div class="row mt-2 mb-4 requireForm_item">\n' +
                '          <div class="col-1 text-right">&nbsp;&nbsp;</div>\n' +
                '          <div class="col-1 text-left mt-1">\n' +
                '            <input type="text" class="form-control" name="competition_staffs[][minimum]" value="0">\n' +
                '          </div>\n' +
                '          <span class="mt-2">~</span>\n' +
                '          <div class="col-1 mt-1">\n' +
                '            <input type="text" class="form-control" name="competition_staffs[][maximum]" value="1">\n' +
                '          </div>\n' +
                '          <span class="mt-2">人</span>\n' +
                '          <div class="col-2 mt-1">\n' +
                '            <select class="form-control" name="competition_staffs[][category]">\n' +
                '              <option value="student">学生</option>\n' +
                '              <option value="teacher">教师</option>\n' +
                '            </select>\n' +
                '          </div>\n' +
                '          <div class="col-2 mt-1">\n' +
                '            <label class="radio checkbox-primary mt-1" value="require_'+length+'_1">\n' +
                '              <input id="require_'+length+'_1" class="mutiple-limited-radio" value="false" checked name="competition_staffs[][mutiple_limited]" type="checkbox">\n' +
                '              <label for="require_'+length+'_1">可多次报名</label>\n' +
                '            </label>\n' +
                '          </div>\n' +
                '          <div class="col-2 mt-1">\n' +
                '            <label class="radio checkbox-primary mt-1" value="require_'+length+'_2">\n' +
                '              <input id="require_'+length+'_2" class="mutiple-limited-radio" value="true" name="competition_staffs[][mutiple_limited]" type="checkbox">\n' +
                '              <label for="require_'+length+'_2">不可多次报名</label>\n' +
                '            </label>\n' +
                '            <a href="javascript:void(0)" class="ml20 delRequrieBtn">\n' +
                '              <i class="fa fa-times-circle font-20 color-grey-c"></i>\n' +
                '            </a>\n' +
                '          </div>\n' +
                '        </div>';
            $("#requireForm").append(html);
        });

        $("#requireForm").on("click",".delRequrieBtn",function () {
            $(this).parents(".requireForm_item").remove();
        });

        $('.nav-setting-form').on('click', '.module_hidden', function(){
            var checkEle = $(this);
            if (checkEle.is(':checked')) {
                checkEle.prev().val(0);
            } else {
                checkEle.prev().val(1);
            }
        });

        $('.competition-staff-settings').on('click', '.mutiple-limited-radio', function(){
            var radio = $(this);
            if (radio.is(':checked')) {
                radio.parent().parent().siblings().find('.mutiple-limited-radio').attr('checked', false)
            } else {
                radio.parent().parent().siblings().find('.mutiple-limited-radio').attr('checked', true)
            }
        });

        var $navForm = $('form.nav-setting-form');
        $navForm.on('click', ".submit-btn", function () {
            $navForm.find('.submit-btn').attr('disabled', 'disabled');
            $navForm.find('.error').html('');
            var valid = $navForm.valid();

            if (!valid) return;
            $.ajax({
                method: 'POST',
                dataType: 'json',
                url: $navForm.attr('action'),
                data: new FormData($navForm[0]),
                processData: false,
                contentType: false,
                success: function (data) {
                    $.notify({message: '保存成功'});
                    // window.location.reload();
                },
                error: function (res) {
                    var data = res.responseJSON;
                    $navForm.find('.error').html(data.message);
                },
                complete: function () {
                    $navForm.find('.submit-btn').attr('disabled', false);
                }
            });
        });

//    排行榜设置
        //删除小阶段
        $("#large_panel").on("click",".small_panel_item_del",function () {
            var list = $(this).parents(".small_panel");
            $(this).parents(".small_panel_item").remove();

            for(var i=0;i < $(list).find(".subName").length;i++){
                console.log(i);
                $(list).find(".subName").eq(i).html("第"+parseInt(i+1)+"阶段");
            }
        });

        // $('form.stage-update-form').validate({
        //     errorElement: 'span',
        //     errorClass: 'danger text-danger',
        //     rules: {
        //         stage_name: "required",
        //         "stage[][start_time]": "required",
        //         "stage[][end_time]": "required",
        //         "stage[][mission_count]": {
        //             required: true,
        //             min: 1
        //         },
        //         "stage[][entry]": {
        //             required: true,
        //             min: 1
        //         },
        //         score_rate: {
        //             required: true,
        //             range: [0, 100]
        //         }
        //     },
        //     messages: {
        //         "stage[][mission_count]": {
        //             min: ">=1"
        //         },
        //         "stage[][entry]": {
        //             min: ">=1"
        //         },
        //     }
        // });

        $('.competition-chart-setting').on('click', ".update-stage", function () {
            var updateForm = $(this).parents("form");
            $(this).attr('disabled', 'disabled');
            updateForm.find('.error').html('');
            // var valid = updateForm.valid();
            var valid = true;

            var $stageName = updateForm.find('input[name="stage_name"]');
            if($stageName.val() === undefined || $stageName.val().length === 0){
                $stageName.addClass('danger text-danger');
                valid = false;
            } else {
                $stageName.removeClass('danger text-danger');
            }

            var $scoreRate = updateForm.find('input[name="score_rate"]');
            if($scoreRate.val() === undefined || $scoreRate.val().length === 0){
                $scoreRate.addClass('danger text-danger');
                valid = false;
            } else if (parseInt($scoreRate.val()) > 100 || parseInt($scoreRate.val()) < 0) {
                $scoreRate.addClass('danger text-danger');
                $scoreRate.after('<span class="danger text-danger">0-100之间的数值</span>');
                valid = false;
            } else {
                $scoreRate.removeClass('danger text-danger');
                $scoreRate.siblings().remove();
            }

            updateForm.find('input[name="stage[][start_time]"]').each(function(_, e){
                var $ele = $(e);
                if($ele.val() === undefined || $ele.val().length === 0){
                    $ele.addClass('danger text-danger');
                    valid = false;
                } else {
                    $ele.removeClass('danger text-danger');
                }
            });

            updateForm.find('input[name="stage[][end_time]"]').each(function(_, e){
                var $ele = $(e);
                if($ele.val() === undefined || $ele.val().length === 0){
                    $ele.addClass('danger text-danger');
                    valid = false;
                } else {
                    $ele.removeClass('danger text-danger');
                }
            });

            updateForm.find('input[name="stage[][mission_count]"]').each(function(i, e){
                var $ele = $(e);
                var $entry = updateForm.find('input[name="stage[][entry]"]').eq(i);
                if($ele.val() === undefined || $ele.val().length === 0){
                    $ele.addClass('danger text-danger');
                    valid = false;
                } else if (parseInt($ele.val()) < 1) {
                    $ele.addClass('danger text-danger');
                    $ele.after('<span class="danger text-danger">大于等于1</span>');
                    valid = false;
                } else if (parseInt($ele.val()) > parseInt($entry.val())) {
                    $ele.addClass('danger text-danger');
                    $ele.after('<span class="danger text-danger">不能大于总任务数</span>');
                    valid = false;
                } else {
                    $ele.removeClass('danger text-danger');
                    $ele.siblings().remove();
                }
            });

            updateForm.find('input[name="stage[][entry]"]').each(function(_, e){
                var $ele = $(e);
                if($ele.val() === undefined || $ele.val().length === 0){
                    $ele.addClass('danger text-danger');
                    valid = false;
                } else if (parseInt($ele.val()) < 1) {
                    $ele.addClass('danger text-danger');
                    $ele.after('<span class="danger text-danger">大于等于1</span>');
                    valid = false;
                } else {
                    $ele.removeClass('danger text-danger');
                    $ele.siblings().remove();
                }
            });

            updateForm.find('input[name="stage[][identifiers][]"]').each(function(_, e){
                var $ele = $(e);
                if($ele.val() === undefined || $ele.val().length === 0){
                    $ele.addClass('danger text-danger');
                    valid = false;
                } else {
                    $ele.removeClass('danger text-danger');
                }
            });

            if (!valid) return;

            updateForm.find('input[name="stage[][mission_count]"]').each(function(_, e){
                var $missionCount = $(e);
                var $entryCount = $(e).parents("div.row").find('input[name="stage[][mission_count]"]');
                if(parseInt($missionCount.val()) > parseInt($entryCount.val()) ){
                    $missionCount.addClass('danger text-danger');
                    $missionCount.after('<span class="danger text-danger">不能大于总任务数</span>');
                    valid = false;
                } else {
                    $missionCount.removeClass('danger text-danger');
                    $missionCount.siblings().remove();
                }
            });

            $.ajax({
                method: 'POST',
                dataType: 'json',
                url: updateForm.attr('action'),
                data: new FormData(updateForm[0]),
                processData: false,
                contentType: false,
                success: function (data) {
                    $.notify({message: '保存成功'});
                    window.location.reload();
                },
                error: function (res) {
                    var data = res.responseJSON;
                    $navForm.find('.error').html(data.message);
                },
                complete: function () {
                    $navForm.find('.submit-btn').attr('disabled', false);
                }
            });
        });

        $(".competition-chart-stages").on("click", ".add-new-tab", function () {
            if($(".new-stage-form").length > 0){
                alert("请先保存上一个tab");
            } else {
                var count = parseInt($("#large_panel").find(".large_panel_part").length)+1;
                var html = '<form class="stage-update-form new-stage-form flex-1" action="/admins/competitions/'+$(this).attr("data-competition-id")+'/competition_stages" accept-charset="UTF-8" data-remote="true" method="post">' +
                    '<div class="large_panel_part" attr_line="'+count+'"><div class="row d-flex mt-3">\n' +
                    '          <span class="col-1 mt-2">tab标题</span>\n' +
                    '          <div class="col-2 no_padding">\n' +
                    '            <input type="text" class="form-control" name="stage_name"/>\n' +
                    '          </div>\n' +
                    '          <span class="col-1 text-right mt-2 no_padding">总排行榜占比:</span>\n' +
                    '          <div class="col-1 no_padding">\n' +
                    '            <input type="number" class="form-control" name="score_rate" value="100"/>\n' +
                    '          </div><span class=" mt-2">%</span>\n' +
                    '          <div class="flex-1">\n' +
                    '            <a href="javascript:void(0)"class="btn btn-outline-primary export-action ml20 add-task-sub">新增子阶段</a>\n' +
                    '          </div>\n' +
                    '          <a href="javascript:void(0)" class="btn btn-default ml20" onclick="Del_tab(this)">删除</a>\n' +
                    '          <a href="javascript:void(0)" class="btn btn-outline-primary update-stage export-action ml20">保存</a>\n' +
                    '        </div>\n' +
                    '        <div id="small_panel_'+count+'" class="small_panel">\n' +
                    '                <div class="row d-flex small_panel_item" attr_line="sub_new_new" count="1">\n' +
                    '                  <span class="mt-2 subName mr10">第1阶段</span>\n' +
                    '                  <div class="flex-1">\n' +
                    '                    <div class="row">\n' +
                    '                      <div class="row col-6"><span class="mt-2 ml20">有效时间:</span>\n' +
                    '                      <div class="col-4 no_padding">\n' +
                    '                        <input type="text" name="stage[][start_time]" id="stage__start_time" value="" autocomplete="off" class="section-start-time form-control" placeholder="有效开始时间">\n' +
                    '                      </div>\n' +
                    '                      <span class="mt-2">~</span>\n' +
                    '                      <div class="col-4 no_padding ">\n' +
                    '                        <input type="text" name="stage[][end_time]" id="stage__end_time" value="" autocomplete="off" class="section-end-time form-control" placeholder="有效结束时间">\n' +
                    '                      </div></div>\n' +
                    '                      <div class="row col-3"><span class="col-4 text-right mt-2 no_padding">总任务数:</span>\n' +
                    '                      <div class="col-6 no_padding ">\n' +
                    '                        <input type="number" class="form-control" onchange="change_total(this)" value="3" name="stage[][entry]">\n' +
                    '                      </div></div>\n' +
                    '                      <div class="row col-3"><span class="col-4 text-right mt-2 no_padding">成绩来源:</span>\n' +
                    '                      <div class="col-6 no_padding ">\n' +
                    '                        <select class="form-control" name="stage[][score_source]">\n' +
                    '                          <option value="0">经验值</option>\n' +
                    '                          <option value="1">预测准确率</option>\n' +
                    '                        </select>\n' +
                    '                      </div></div>\n' +
                    '                    </div>\n' +
                    '                    <div class="row mt-2" id="task_Input_sub_new_new">\n' +
                    '                      <div class="col-4 row task_Input_div">\n' +
                    '                        <span class="col-4 text-right mt-3 no_padding mr10">任务1</span>\n' +
                    '                        <div class="col-6 no_padding">\n' +
                    '                          <input type="text" class="form-control mt-2" name="stage[][identifiers][]" placeholder="请填写实训ID">\n' +
                    '                        </div>\n' +
                    '                      </div>\n' +
                    '                      <div class="col-4 row task_Input_div">\n' +
                    '                        <span class="col-4 text-right mt-3 no_padding mr10">任务2</span>\n' +
                    '                        <div class="col-6 no_padding">\n' +
                    '                          <input type="text" class="form-control mt-2" name="stage[][identifiers][]" placeholder="请填写实训ID">\n' +
                    '                        </div>\n' +
                    '                      </div>\n' +
                    '                      <div class="col-4 row task_Input_div">\n' +
                    '                        <span class="col-4 text-right mt-3 no_padding mr10">任务3</span>\n' +
                    '                        <div class="col-6 no_padding">\n' +
                    '                          <input type="text" class="form-control mt-2" name="stage[][identifiers][]" placeholder="请填写实训ID">\n' +
                    '                        </div>\n' +
                    '                      </div>\n' +
                    '                    </div>\n' +
                    '                  </div>\n' +
                    '                  <span>\n' +
                    '              <a href="javascript:void(0)" class="btn btn-default ml20 small_panel_item_del">删除</a>\n' +
                    '            </span>\n' +
                    '                </div>\n' +
                    '</div></div></form>';
                $("#large_panel").append(html);

                $(".stage-update-form .section-start-time").datetimepicker(timeOptions);
                $(".stage-update-form .section-end-time").datetimepicker(timeOptions);
            }
        });

        //新增子阶段
        $(".competition-chart-stages").on("click", ".add-task-sub", function () {
            var index = $(this).parents(".large_panel_part").attr("attr_line");
            var count= 0;

            console.log("sdfsf");
            console.log($("#small_panel_"+index).find(".small_panel_item").length > 0);

            if($("#small_panel_"+index).find(".small_panel_item").length > 0){
                count = parseInt($("#small_panel_"+index).find(".small_panel_item").last().attr("count")) + 1;

                console.log($("#small_panel_"+index).find(".small_panel_item").last().attr("count"));
            }else{
                count = 1;
            }

            var showCount=parseInt($("#small_panel_"+index).find(".small_panel_item").length) + 1;


            var html='<div class="row d-flex small_panel_item" attr_line="sub_'+index+'_'+count+'" count="'+count+'">\n' +
                '            <span class="mr10 mt-2 subName">第'+showCount+'阶段</span>\n' +
                '            <div class="flex-1">\n' +
                '                    <div class="row">\n' +
                '                      <div class="row col-6"><span class="mt-2 ml20 mr10">有效时间:</span>\n' +
                '                      <div class="col-4 no_padding ">\n' +
                '                        <input type="text" name="stage[][start_time]" id="stage__start_time" value="" autocomplete="off" class="section-start-time form-control" placeholder="有效开始时间">\n' +
                '                      </div>\n' +
                '                      <span class="mt-2">~</span>\n' +
                '                      <div class="col-4 no_padding ">\n' +
                '                        <input type="text" name="stage[][end_time]" id="stage__end_time" value="" autocomplete="off" class="section-end-time form-control" placeholder="有效结束时间">\n' +
                '                      </div></div>\n' +
                '                      <div class="row col-3"><span class="col-4 text-right mt-2 no_padding mr10">总任务数:</span>\n' +
                '                      <div class="col-6 no_padding ">\n' +
                '                        <input type="number" class="form-control" onchange="change_total(this)" value="3" name="stage[][entry]">\n' +
                '                      </div></div>\n' +
                '                      <div class="row col-3"><span class="col-4 mr10 text-right mt-2 no_padding">成绩来源:</span>\n' +
                '                      <div class="col-6 no_padding ">\n' +
                '                        <select class="form-control" name="stage[][score_source]">\n' +
                '                          <option value="0">经验值</option>\n' +
                '                          <option value="1">预测准确率</option>\n' +
                '                        </select>\n' +
                '                      </div></div>\n' +
                '                    </div>\n' +
                '              <div class="row mt-2" id="task_Input_sub_'+index+'_'+count+'">\n'+
                '                      <div class="col-4 row task_Input_div">\n' +
                '                        <span class="col-4 text-right mt-3 no_padding mr10">任务1</span>\n' +
                '                        <div class="col-6 no_padding">\n' +
                '                          <input type="text" class="form-control mt-2" name="stage[][identifiers][]" placeholder="请填写实训ID">\n' +
                '                        </div>\n' +
                '                      </div>\n' +
                '                      <div class="col-4 row task_Input_div">\n' +
                '                        <span class="col-4 text-right mt-3 no_padding mr10">任务2</span>\n' +
                '                        <div class="col-6 no_padding">\n' +
                '                          <input type="text" class="form-control mt-2" name="stage[][identifiers][]" placeholder="请填写实训ID">\n' +
                '                        </div>\n' +
                '                      </div>\n' +
                '                      <div class="col-4 row task_Input_div">\n' +
                '                        <span class="col-4 text-right mt-3 no_padding mr10">任务3</span>\n' +
                '                        <div class="col-6 no_padding">\n' +
                '                          <input type="text" class="form-control mt-2" name="stage[][identifiers][]" placeholder="请填写实训ID">\n' +
                '                        </div>\n' +
                '                      </div>\n' +
                '            </div>\n' +
                '            </div>\n' +
                '            <span>\n' +
                '              <a href="javascript:void(0)" class="btn btn-default ml20 small_panel_item_del">删除</a>\n' +
                '            </span>\n' +
                '          </div>';
            $("#small_panel_"+index).append(html);

            $(".stage-update-form .section-start-time").datetimepicker(timeOptions);
            $(".stage-update-form .section-end-time").datetimepicker(timeOptions);
        });

        // 奖项设置
        var $prizeContainer = $('#competition-prize-card');
        var competitionId = $prizeContainer.data('id');
        $(document).on('prize.save.success', function(){
          $.ajax({
            method: 'GET',
            url: '/admins/competitions/' + competitionId + '/competition_prizes',
            dataType: 'script'
          })
        });

        $('.modal.admin-upload-file-modal').on('upload:success', function(e, data){
          var $imageElement;
          if(data.suffix === '_member'){
            $imageElement = $('.prize-member-image-' + data.source_id);
          } else if(data.suffix === '_team'){
            $imageElement = $('.prize-team-image-' + data.source_id);
          } else {
            $imageElement = $('.prize-teacher-image-' + data.source_id);
          }
          $imageElement.attr('src', data.url);
          $imageElement.show();
          $imageElement.next().html('重新上传');
        })

        // 生成获奖记录
        $prizeContainer.on('click', '.generate-prize-user-action', function(){
          var $link = $(this);

          var generateRequest = function(){
            return $.ajax({
              method: 'POST',
              url: '/admins/competitions/' + competitionId + '/competition_prize_users',
              dataType: 'json',
              success: function(data){
                if(data && data.status === 0){
                  show_success_flash();
                  $link.remove();
                } else {
                  showErrorNotify(data.message);
                }
              },
              error: function(res){
                var data = res.responseJSON;
                showErrorNotify(data.message);
              }
            })
          }

          customConfirm({
            content: '确认生成吗？',
            ok: function () {
              customLoading({
                ajax: generateRequest
              })
            }
          })
        });
    } else {
      $(document).unbind('prize.save.success');
    }
});

//添加主办方或者开放范围
function addSponsor(item){
    var html='<div class="sponsor_label">\n' +
        '              <input type="hidden" value="school_id" />\n' +
        '              <span>caicai</span>\n' +
        '              <a href="javascript:void(0)" onclick="del_sponsor(this)">×</a>\n' +
        '            </div>';
    $(item).parents(".sponsorPanel").append(html);
}
//删除
function del_sponsor(item){
    $(item).parents(".sponsor_label").remove();
}

//    小阶段修改总任务数
function change_total(item) {
    var count=parseInt($(item).val());


    var index = $(item).parents(".small_panel_item").attr("attr_line");
    var indexLarge = $(item).parents(".large_panel_part").attr("attr_line");
    console.log(indexLarge);
    console.log(index);

    var divCount=parseInt($("#task_Input_"+index).find(".task_Input_div").length);


    var html = "";
    if(count > divCount){
        for(var i=0;i < count-divCount ;i++){
            html+='<div class="col-4 row task_Input_div"><span class="col-4 text-right mt-3 no_padding mr10">任务'+(divCount+i+1)+'</span>\n' +
                '<div class="col-6 no_padding">\n' +
                '<input type="text" class="form-control mt-2" name="stage[][identifiers][]" placeholder="请填写实训ID">\n' +
                '</div>\n' +
                '</div>';
        }
        $("#task_Input_"+index).append(html);
    }else{
        var delCount = divCount - count ;
        console.log(divCount);
        console.log(count);
        var _max=parseInt($("#task_Input_"+index).find(".task_Input_div:last").index());

        console.log(_max);
        var _get= _max - delCount;

        console.log(_get);
        if(count == 0){
            $("#task_Input_"+index).empty();
        }else{
            $("#task_Input_"+index).find(".task_Input_div:gt("+_get+")").remove();
        }

    }

}

//删除tab
function  Del_tab(item) {
    $(item).parents(".large_panel_part").remove();
}
//新增tab
function addNewTab(competition_id) {
    if($(".new-stage-form").length > 0){
        alert("请先保存上一个tab");
    } else {
        var count = parseInt($("#large_panel").find(".large_panel_part").length)+1;
        var html = '<form class="stage-update-form new-stage-form flex-1" action="/admins/competitions/'+competition_id+'/competition_stages" accept-charset="UTF-8" data-remote="true" method="post">' +
            '<div class="large_panel_part" attr_line="'+count+'"><div class="row d-flex mt-3">\n' +
            '          <span class="col-1 mt-2">tab标题</span>\n' +
            '          <div class="col-2 no_padding">\n' +
            '            <input type="text" class="form-control" name="stage_name"/>\n' +
            '          </div>\n' +
            '          <span class="col-1 text-right mt-2 no_padding">总排行榜占比:</span>\n' +
            '          <div class="col-1 no_padding">\n' +
            '            <input type="number" class="form-control" name="score_rate" value="100"/>\n' +
            '          </div><span class=" mt-2">%</span>\n' +
            '          <div class="flex-1">\n' +
            '            <a href="javascript:void(0)"class="btn btn-outline-primary export-action ml20 add-task-sub">新增子阶段</a>\n' +
            '          </div>\n' +
            '          <a href="javascript:void(0)" class="btn btn-default ml20" onclick="Del_tab(this)">删除</a>\n' +
            '          <a href="javascript:void(0)" class="btn btn-outline-primary update-stage export-action ml20">保存</a>\n' +
            '        </div>\n' +
            '        <div id="small_panel_'+count+'" class="small_panel">\n' +
            '                <div class="row d-flex small_panel_item" attr_line="sub_new_new" count="1">\n' +
            '                  <span class="mt-2 subName mr10">第1阶段</span>\n' +
            '                  <div class="flex-1">\n' +
            '                    <div class="row">\n' +
            '                      <div class="row col-6"><span class="mt-2 ml20 mr10">有效时间:</span>\n' +
            '                      <div class="col-4 no_padding ">\n' +
            '                        <input type="text" name="stage[][start_time]" id="stage__start_time" value="" autocomplete="off" class="section-start-time form-control" placeholder="有效开始时间">\n' +
            '                      </div>\n' +
            '                      <span class="mt-2">~</span>\n' +
            '                      <div class="col-4 no_padding input_middle">\n' +
            '                        <input type="text" name="stage[][end_time]" id="stage__end_time" value="" autocomplete="off" class="section-end-time form-control" placeholder="有效结束时间">\n' +
            '                      </div></div>\n' +
            '                      <div class="row col-3"><span class="col-4 text-right mt-2 no_padding mr10">总任务数:</span>\n' +
            '                      <div class="col-6 no_padding ">\n' +
            '                        <input type="number" class="form-control" onchange="change_total(this)" value="3" name="stage[][entry]">\n' +
            '                      </div></div>\n' +
            '                      <div class="row col-3"><span class="col-4 text-right mt-2 no_padding mr10">成绩来源:</span>\n' +
            '                      <div class="col-6 no_padding ">\n' +
            '                        <select class="form-control" name="stage[][score_source]">\n' +
            '                          <option value="0">经验值</option>\n' +
            '                          <option value="1">预测准确率</option>\n' +
            '                        </select>\n' +
            '                      </div></div>\n' +
            '                    </div>\n' +
            '                    <div class="row mt-2" id="task_Input_sub_new_new">\n' +
            '                      <div class="col-4 row task_Input_div">\n' +
            '                        <span class="col-3 text-right mt-3 no_padding mr10">任务1</span>\n' +
            '                        <div class="col-8 no_padding">\n' +
            '                          <input type="text" class="form-control mt-2" name="stage[][identifiers][]" placeholder="请填写实训ID">\n' +
            '                        </div>\n' +
            '                      </div>\n' +
            '                      <div class="col-4 row task_Input_div">\n' +
            '                        <span class="col-3 text-right mt-3 no_padding mr10">任务2</span>\n' +
            '                        <div class="col-8 no_padding">\n' +
            '                          <input type="text" class="form-control mt-2" name="stage[][identifiers][]" placeholder="请填写实训ID">\n' +
            '                        </div>\n' +
            '                      </div>\n' +
            '                      <div class="col-4 row task_Input_div">\n' +
            '                        <span class="col-3 text-right no_padding mr10 mt-3">任务3</span>\n' +
            '                        <div class="col-8 no_padding">\n' +
            '                          <input type="text" class="form-control mt-2" name="stage[][identifiers][]" placeholder="请填写实训ID">\n' +
            '                        </div>\n' +
            '                      </div>\n' +
            '                    </div>\n' +
            '                  </div>\n' +
            '                  <span>\n' +
            '              <a href="javascript:void(0)" class="btn btn-default ml20 small_panel_item_del">删除</a>\n' +
            '            </span>\n' +
            '                </div>\n' +
            '</div></div></form>';
        $("#large_panel").append(html);
    }
}
