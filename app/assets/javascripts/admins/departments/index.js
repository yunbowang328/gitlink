$(document).on('turbolinks:load', function() {
  if ($('body.admins-departments-index-page').length > 0) {
    var $searchContainer = $('.department-list-form');
    var $searchForm = $searchContainer.find('form.search-form');
    var $list = $('.department-list-container');

    $searchContainer.on('change', '.form-check-input', function(){
      $searchForm.find('input[type="submit"]').trigger('click');
    });

    // ============== 新建部门 ===============
    var $modal = $('.modal.admin-create-department-modal');
    var $form = $modal.find('form.admin-create-department-form');
    var $departmentNameInput = $form.find('input[name="department_name"]');
    var $schoolSelect = $modal.find('.school-select');

    $form.validate({
      errorElement: 'span',
      errorClass: 'danger text-danger',
      rules: {
        school_id: {
          required: true
        },
        department_name: {
          required: true
        }
      },
      messages: {
        school_id: {
          required: '请选择所属单位'
        }
      }
    });

    // modal ready fire
    $modal.on('show.bs.modal', function () {
      $departmentNameInput.val('');
      $schoolSelect.select2('val', ' ');
    });

    // ************** 学校选择 *************
    var matcherFunc = function(params, data){
      if ($.trim(params.term) === '') {
        return data;
      }
      if (typeof data.text === 'undefined') {
        return null;
      }

      if (data.name && data.name.indexOf(params.term) > -1) {
        var modifiedData = $.extend({}, data, true);
        return modifiedData;
      }

      // Return `null` if the term should not be displayed
      return null;
    };

    var defineSchoolSelect = function(schools) {
      $schoolSelect.select2({
        theme: 'bootstrap4',
        placeholder: '请选择所属单位',
        minimumInputLength: 1,
        data: schools,
        templateResult: function (item) {
          if(!item.id || item.id === '') return item.text;
          return item.name;
        },
        templateSelection: function(item){
          if (item.id) {
            $('#school_id').val(item.id);
          }
          return item.name || item.text;
        },
        matcher: matcherFunc
      });
    }

    $.ajax({
      url: '/api/schools/for_option.json',
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        defineSchoolSelect(data.schools);
      }
    });

    $modal.on('click', '.submit-btn', function(){
      $form.find('.error').html('');

      if ($form.valid()) {
        var url = $form.data('url');

        $.ajax({
          method: 'POST',
          dataType: 'json',
          url: url,
          data: $form.serialize(),
          success: function(){
            $.notify({ message: '创建成功' });
            $modal.modal('hide');

            setTimeout(function(){
              window.location.reload();
            }, 500);
          },
          error: function(res){
            var data = res.responseJSON;
            $form.find('.error').html(data.message);
          }
        });
      }
    });

    // ============= 添加部门管理员 ==============
    var $addMemberModal = $('.admin-add-department-member-modal');
    var $addMemberForm = $addMemberModal.find('.admin-add-department-member-form');
    var $memberSelect = $addMemberModal.find('.department-member-select');
    var $departmentIdInput = $addMemberForm.find('input[name="department_id"]')

    $addMemberModal.on('show.bs.modal', function(event){
      var $link = $(event.relatedTarget);
      var departmentId = $link.data('department-id');
      $departmentIdInput.val(departmentId);

      $memberSelect.select2('val', ' ');
    });

    $memberSelect.select2({
      theme: 'bootstrap4',
      placeholder: '请输入要添加的管理员姓名',
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
        return item.real_name;
      },
      templateSelection: function(item){
        if (item.id) {
        }
        return item.real_name || item.text;
      }
    });

    $addMemberModal.on('click', '.submit-btn', function(){
      $addMemberForm.find('.error').html('');

      var departmentId = $departmentIdInput.val();
      var memberIds = $memberSelect.val();
      if (departmentId && memberIds && memberIds.length > 0) {
        $.ajax({
          method: 'POST',
          dataType: 'script',
          url: '/admins/departments/' + departmentId + '/department_member',
          data: { user_ids: memberIds }
        });
      } else {
        $addMemberModal.modal('hide');
      }
    });
  }
});