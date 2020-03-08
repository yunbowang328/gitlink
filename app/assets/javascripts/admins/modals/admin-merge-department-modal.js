$(document).on('turbolinks:load', function() {
  var $modal = $('.modal.admin-merge-department-modal');
  if ($modal.length > 0) {
    var $form = $modal.find('form.admin-merge-department-form');
    var $schoolIdInput = $form.find('input[name="school_id"]');
    var $originDepartmentIdInput = $form.find('input[name="origin_department_id"]');
    var $departmentSelect = $modal.find('.department-select');

    $form.validate({
      errorElement: 'span',
      errorClass: 'danger text-danger',
      rules: {
        department_id: {
          required: true
        }
      },
      messages: {
        department_id: {
          required: '请选择部门'
        }
      }
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

    var defineDepartmentSelect = function(departments) {
      $departmentSelect.empty();

      $departmentSelect.select2({
        theme: 'bootstrap4',
        placeholder: '请选择所属部门',
        data: departments,
        templateResult: function (item) {
          if(!item.id || item.id === '') return item.text;
          return item.name;
        },
        templateSelection: function(item){
          if (item.id) {
            $form.find('#department_id').val(item.id);
          }
          return item.name || item.text;
        },
        matcher: matcherFunc
      });
      $departmentSelect.select2('val', ' ');
    };

    // modal ready fire
    $modal.on('show.bs.modal', function (event) {
      var $link = $(event.relatedTarget);

      var schoolId = $link.data('schoolId');
      var url = $link.data('url');

      $schoolIdInput.val(schoolId);
      $originDepartmentIdInput.val($link.data('departmentId'));
      $form.data('url', url);
      $.ajax({
        url: '/api/schools/' + schoolId + '/departments/for_option.json',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
          defineDepartmentSelect(data.departments);
        }
      });
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
            $.notify({ message: '操作成功' });
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
  }
});