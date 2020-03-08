$(document).on('turbolinks:load', function() {
    if ($('body.admins-salesmans-index-page').length > 0) {

        // ============= 添加销售人员 ==============
        var $addMemberModal = $('.admin-add-salesman-user-modal');
        var $addMemberForm = $addMemberModal.find('.admin-add-salesman-user-form');
        var $memberSelect = $addMemberModal.find('.salesman-user-select');
        // var $salesmanIdInput = $addMemberForm.find('input[name="salesman_id"]')

        $addMemberModal.on('show.bs.modal', function(event){
            var $link = $(event.relatedTarget);
            // var salesmanId = $link.data('salesman-id');
            // $salesmanIdInput.val(salesmanId);

            $memberSelect.select2('val', ' ');
        });

        $memberSelect.select2({
            theme: 'bootstrap4',
            placeholder: '请输入要添加的销售姓名',
            multiple: true,
            minimumInputLength: 1,
            ajax: {
                delay: 500,
                url: '/admins/users',
                dataType: 'json',
                data: function(params){
                    return { name: params.term };
                },
                processResults: function(data){
                    return { results: data.users }
                }
            },
            templateResult: function (item) {
                if(!item.id || item.id === '') return item.text;
                return $("<span>" + item.real_name + " <span class='font-12'>" + item.school_name + ' ' + item.hidden_phone + "</span></span>");
            },
            templateSelection: function(item){
                if (item.id) {
                }
                return item.real_name || item.text;
            }
        });

        $addMemberModal.on('click', '.submit-btn', function(){
            $addMemberForm.find('.error').html('');

            // var salesmanId = $salesmanIdInput.val();
            var memberIds = $memberSelect.val();
            if (memberIds && memberIds.length > 0) {
                $.ajax({
                    method: 'POST',
                    dataType: 'json',
                    url: '/admins/salesmans/batch_add',
                    data: { user_ids: memberIds },
                    success: function(){
                        $.notify({ message: '创建成功' });
                        $addMemberModal.modal('hide');

                        setTimeout(function(){
                            window.location.reload();
                        }, 500);
                    },
                    error: function(res){
                        var data = res.responseJSON;
                        $form.find('.error').html(data.message);
                    }
                });
            } else {
                $addMemberModal.modal('hide');
            }
        });

        $(".salesman-list-container").on("change", '.salesman-sync-course', function () {
            var s_id = $(this).attr("data-id");
            var json = {};
            $.ajax({
                url: "/admins/salesmans/" + s_id + "/update_sync_course",
                type: "POST",
                dataType:'script',
                data: json
            })
        });

        $(".salesman-list-container").on("change", '.salesman-sync-form', function () {
            var s_id = $(this).attr("data-id");
            var s_value = $(this).val();
            var s_name = $(this).attr("name");
            var json = {};
            json[s_name] = s_value;
            $.ajax({
                url: "/admins/salesmans/" + s_id,
                type: "PUT",
                dataType:'script',
                data: json
            });
        });
    }
});