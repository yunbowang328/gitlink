$(document).on('turbolinks:load', function() {
    if ($('body.admins-salesman-channels-index-page').length > 0) {

        // ============= 添加销售人员 ==============
        var $addMemberModal = $('.admin-add-salesman-channel-user-modal');
        var $addMemberForm = $addMemberModal.find('.admin-add-salesman-channel-user-form');
        var $memberSelect = $addMemberModal.find('.salesman-channel-user-select');
        var $form = $addMemberModal.find('form.admin-add-salesman-user-form');

        // 搜索
        var searchscForm = $(".saleman-channel-list-form .search-form");


        $addMemberModal.on('show.bs.modal', function(event){
            $memberSelect.select2('val', ' ');
        });

        $memberSelect.select2({
            theme: 'bootstrap4',
            placeholder: '请输入要添加的单位',
            multiple: true,
            minimumInputLength: 1,
            ajax: {
                delay: 500,
                url: '/admins/schools',
                dataType: 'json',
                data: function(params){
                    return { keyword: params.term };
                },
                processResults: function(data){
                    return { results: data.schools }
                }
            },
            templateResult: function (item) {
                if(!item.id || item.id === '') return '';
                return $("<span>" + item.name  + "</span>");
            },
            templateSelection: function(item){
                if (item.id) {
                }
                return item.name || '';
            }
        });

        $addMemberModal.on('click', '.submit-btn', function(){
            $addMemberForm.find('.error').html('');

            // var salesmanId = $salesmanIdInput.val();
            var memberIds = $memberSelect.val();
            if (memberIds && memberIds.length > 0) {
                var url = $form.data('url');
                $.ajax({
                    method: 'POST',
                    dataType: 'json',
                    url: url,
                    data: $form.serialize(),
                    success: function(){
                        $.notify({ message: '创建成功' });
                        $addMemberModal.modal('hide');
                        searchscForm.find('input[name="keyword"]').val('');

                        setTimeout(function(){
                            submitForm();
                        }, 500);
                    },
                    error: function(res){
                        var data = res.responseJSON;
                        $addMemberForm.find('.error').html(data.message);
                    }
                });
            } else {
                $addMemberModal.modal('hide');
            }
        });


        // 清空
        searchscForm.on('click', '.clear-btn', function () {
            searchscForm.find('.start_date').val('');
            searchscForm.find('.end_date').val('').trigger('change');
            searchscForm.find('input[name="keyword"]').val('');
        });

        // 时间跨度
        var baseOptions = {
            autoclose: true,
            language: 'zh-CN',
            format: 'yyyy-mm-dd',
            startDate: '2017-04-01'
        };

        var defineDateRangeSelect = function(element){
            var options = $.extend({inputs: $(element).find('.start-date, .end-date')}, baseOptions);
            $(element).datepicker(options);

            $(element).find('.start-date').datepicker().on('changeDate', function(e){
                $(element).find('.end-date').datepicker('setStartDate', e.date);
            });
        };

        defineDateRangeSelect('.grow-date-input-daterange');


        // 区间搜索
        searchscForm.on('click', ".search-btn", function(){
            submitForm();
        });

        var submitForm = function(){
            var url =  searchscForm.data('search-form-url');
            var form = searchscForm;
            $.ajax({
                url: url,
                data: form.serialize(),
                dataType: "script"
            })
        };
    }
});