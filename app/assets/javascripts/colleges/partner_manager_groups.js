$(document).on('turbolinks:load', function() {
  if ($('body.partners-partner-manager-groups-page').length > 0) {
    var $container = $('.manager-group-list-container');
    var partnerId = $container.find('.manager-group-list-body').data('id');

    // ------- 新建编辑权限组弹窗 --------
    var $managerGroupModal = $('.modal.partner-save-manager-group-modal');
    var $managerGroupForm = $managerGroupModal.find('form.partner-save-manager-group-form');
    var $managerGroupIdInput = $managerGroupForm.find('input[name="manager_group_id"]');
    var $managerGroupNameInput = $managerGroupForm.find('input[name="manager_group_name"]');

    $managerGroupForm.validate({
      errorElement: 'span',
      errorClass: 'danger text-danger',
      rules: {
        manager_group_name: {
          required: true,
          maxlength: 20
        },
      }
    });

    $managerGroupModal.on('show.bs.modal', function(event){
      var $link = $(event.relatedTarget);
      var managerGroupId = $link.data('id');
      var managerGroupName = $link.data('name');

      if(managerGroupId && managerGroupId !== ''){
        $managerGroupModal.find('.modal-title').html('重命名');
        $managerGroupIdInput.val(managerGroupId);
        $managerGroupNameInput.val(managerGroupName)
      } else {
        $managerGroupModal.find('.modal-title').html('新建');
        $managerGroupIdInput.val('');
        $managerGroupNameInput.val('');
      }
    });

    $managerGroupModal.on('hide.bs.modal', function(){
      $managerGroupIdInput.val('');
      $managerGroupNameInput.val('');
    });

    $managerGroupModal.on('click', '.submit-btn', function(){
      $managerGroupForm.find('.error').html('');
      var url = $managerGroupForm.data('url');

      if ($managerGroupForm.valid()) {
        $.ajax({
          method: 'POST',
          dataType: 'script',
          url: url,
          data: $managerGroupForm.serialize()
        });
      }
    });

    // ---------- 添加管理员弹窗 ------------
    var $partnerManagerModal = $('.modal.partner-add-partner-manager-modal');
    var $partnerManagerForm = $partnerManagerModal.find('form.partner-add-partner-manager-form');
    var $managerGroupIdInput = $partnerManagerForm.find('input[name="manager_group_id"]');
    var $userSelect = $partnerManagerForm.find('.partner-manager-select');

    $userSelect.select2({
      theme: 'bootstrap4',
      placeholder: '请输入要添加的管理员姓名',
      multiple: true,
      closeOnSelect: false,
      minimumInputLength: 1,
      ajax: {
        delay: 500,
        url: '/api/users_for_partners',
        dataType: 'json',
        data: function(params){
          return { name: params.term, partner_id: partnerId, page: params.page || 1, per_page: 20 };
        },
        processResults: function(data, params){
          params.page = params.page || 1;

          return {
            results: data.users,
            pagination: {
              more: (params.page * 20) < data.count
            }
          };
        }
      },
      templateResult: function (item) {
        if(!item.id || item.id === '') return item.text;
        return $("<span>" + item.real_name + " <span class='font-12'>" + item.school_name + ' ' + item.identity + "</span></span>");
      },
      templateSelection: function(item){
        if (item.id) {
        }
        return item.real_name || item.text;
      }
    });

    $partnerManagerModal.on('show.bs.modal', function(event){
      var $link = $(event.relatedTarget);
      var managerGroupId = $link.data('id');

      $managerGroupIdInput.val(managerGroupId);
      $userSelect.select2('val', ' ');
      $partnerManagerModal.find('.error').html('');
    });

    $partnerManagerModal.on('click', '.submit-btn', function(){
      $partnerManagerModal.find('.error').html('');
      var managerGroupId = $managerGroupIdInput.val();

      var userIds = $userSelect.val();
      if (userIds && userIds.length > 0) {
        $.ajax({
          method: 'POST',
          dataType: 'script',
          url: '/partners/' + partnerId + '/partner_managers',
          data: { user_ids: userIds, manager_group_id: managerGroupId }
        });
      } else {
        $partnerManagerModal.modal('hide');
      }
    });
  }
});