$(document).on('turbolinks:load', function() {
  if ($('body.cooperative-laboratory-users-index-page').length > 0) {
    // ============= 添加管理员 ==============
    var $addMemberModal = $('.cooperative-add-laboratory-user-modal');
    var $addMemberForm = $addMemberModal.find('.cooperative-add-laboratory-user-form');
    var $memberSelect = $addMemberModal.find('.laboratory-user-select');

    $addMemberModal.on('show.bs.modal', function(event){
      $memberSelect.select2('val', ' ');
    });

    $memberSelect.select2({
      theme: 'bootstrap4',
      placeholder: '请输入要添加的管理员姓名',
      multiple: true,
      minimumInputLength: 1,
      ajax: {
        delay: 500,
        url: '/cooperative/users/for_select',
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

      var memberIds = $memberSelect.val();
      if (memberIds && memberIds.length > 0) {
        $.ajax({
          method: 'POST',
          dataType: 'json',
          url: '/cooperative/laboratory_users',
          data: { user_ids: memberIds },
          success: function(data){
            if(data && data.status == 0){
              show_success_flash();
              $addMemberModal.modal('hide');
              window.location.reload();
            }
          }
        });
      } else {
        $addMemberModal.modal('hide');
      }
    });
  }
});
