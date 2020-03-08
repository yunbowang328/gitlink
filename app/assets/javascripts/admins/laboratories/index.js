$(document).on('turbolinks:load', function() {
  if ($('body.admins-laboratories-index-page').length > 0) {
    var $searchContainer = $('.laboratory-list-form');
    var $searchForm = $searchContainer.find('form.search-form');
    var $list = $('.laboratory-list-container');

    // ============== 新建 ===============
    var $modal = $('.modal.admin-create-laboratory-modal');
    var $form = $modal.find('form.admin-create-laboratory-form');
    var $schoolSelect = $modal.find('.school-select');

    $form.validate({
      errorElement: 'span',
      errorClass: 'danger text-danger',
      rules: {
        school_id: {
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
        placeholder: '请选择单位',
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
    };

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

    // ============= 添加管理员 ==============
    var $addMemberModal = $('.admin-add-laboratory-user-modal');
    var $addMemberForm = $addMemberModal.find('.admin-add-laboratory-user-form');
    var $memberSelect = $addMemberModal.find('.laboratory-user-select');
    var $laboratoryIdInput = $addMemberForm.find('input[name="laboratory_id"]')

    $addMemberModal.on('show.bs.modal', function(event){
      var $link = $(event.relatedTarget);
      var laboratoryId = $link.data('laboratory-id');
      $laboratoryIdInput.val(laboratoryId);

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

      var laboratoryId = $laboratoryIdInput.val();
      var memberIds = $memberSelect.val();
      if (laboratoryId && memberIds && memberIds.length > 0) {
        $.ajax({
          method: 'POST',
          dataType: 'script',
          url: '/admins/laboratories/' + laboratoryId + '/laboratory_user',
          data: { user_ids: memberIds }
        });
      } else {
        $addMemberModal.modal('hide');
      }
    });

      $(".laboratory-list-container").on("change", '.laboratory-sync-course', function () {
          var s_id = $(this).attr("data-id");
          var json = {};
          $.ajax({
              url: "/admins/laboratories/" + s_id + "/update_sync_course",
              type: "POST",
              dataType:'script',
              data: json
          })
      });

      $(".laboratory-list-container").on("change", '.laboratory-sync-form', function () {
          var s_id = $(this).attr("data-id");
          var s_value = $(this).val();
          var s_name = $(this).attr("name");
          var json = {};
          json[s_name] = s_value;
          $.ajax({
              url: "/admins/laboratories/" + s_id,
              type: "PUT",
              dataType:'script',
              data: json
          });
      });
  }
});