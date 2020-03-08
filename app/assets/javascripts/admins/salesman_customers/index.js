$(document).on('turbolinks:load', function() {
    if ($('body.admins-salesman-customers-index-page').length > 0) {

        // ============= 添加销售人员 ==============
        var $addMemberModal = $('.admin-add-salesman-customer-user-modal');
        var $addMemberForm = $addMemberModal.find('.admin-add-salesman-customer-user-form');
        var $memberSelect = $addMemberModal.find('.salesman-customer-user-select');
        var $salesmanIdInput = $('.salesman-customer-list-form').find(".btn-primary");

        $addMemberModal.on('show.bs.modal', function(event){
            var $link = $(event.relatedTarget);
            // var salesmanId = $link.data('salesman_id');
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
                    url: '/admins/salesman_customers/batch_add',
                    data: { salesman_id: $salesmanIdInput.data("salesman-id"), user_ids: memberIds },
                    success: function(){
                        $.notify({ message: '创建成功' });
                        $addMemberModal.modal('hide');

                        setTimeout(function(){
                            listForm();
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


        var listForm = function(){
            $.ajax({
                url: '/admins/salesman_customers?salesman_id='+ $salesmanIdInput.data("salesman-id"),
                dataType: "script"
            });
        };
    }
});