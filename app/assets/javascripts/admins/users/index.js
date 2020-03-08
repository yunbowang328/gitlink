$(document).on('turbolinks:load', function(){
  if ($('body.admins-users-index-page').length > 0) {

    var showSuccessNotify = function() {
      $.notify({
        message: '操作成功'
      },{
        type: 'success'
      });
    }

    // lock user
    $('.users-list-container').on('click', '.lock-action', function(){
      var $lockAction = $(this);
      var $unlockAction = $lockAction.siblings('.unlock-action');

      var userId = $lockAction.data('id');
      customConfirm({
        content: '确认加锁吗？',
        ok: function(){
          $.ajax({
            url: '/admins/users/' + userId + '/lock',
            method: 'POST',
            dataType: 'json',
            success: function() {
              showSuccessNotify();
              $lockAction.hide();
              $unlockAction.show();
            }
          });
        }
      });
    });

    // unlock user
    $('.users-list-container').on('click', '.unlock-action', function(){
      var $unlockAction = $(this);
      var $lockAction = $unlockAction.siblings('.lock-action');

      var userId = $unlockAction.data('id');
      customConfirm({
        content: '确认解锁吗？',
        ok: function () {
          $.ajax({
            url: '/admins/users/' + userId + '/unlock',
            method: 'POST',
            dataType: 'json',
            success: function() {
              showSuccessNotify();
              $lockAction.show();
              $unlockAction.hide();
            }
          });
        }
      })
    });

    // active user
    $('.users-list-container').on('click', '.active-action', function(){
      var $activeAction = $(this);
      var $unlockAction = $activeAction.siblings('.unlock-action');
      var $lockAction = $activeAction.siblings('.lock-action');

      var userId = $activeAction.data('id');
      customConfirm({
        content: '确认激活吗？',
        ok: function () {
          $.ajax({
            url: '/admins/users/' + userId + '/unlock',
            method: 'POST',
            dataType: 'json',
            success: function() {
              showSuccessNotify();
              $activeAction.hide();
              $lockAction.show();
              $unlockAction.hide();
            }
          });
        }
      })
    });

    // reset user login times
    $('.users-list-container').on('click', '.reset-login-times-action', function(){
      var $action = $(this);

      var userId = $action.data('id');
      $.ajax({
        url: '/admins/users/' + userId + '/reset_login_times',
        method: 'POST',
        dataType: 'json',
        success: function() {
          showSuccessNotify();
        }
      });
    });

    // ***************** reward grade modal *****************
    var $rewardGradeModal = $('.admin-users-reward-grade-modal');
    var $form = $rewardGradeModal.find('form.admin-users-reward-grade-form');

    $form.validate({
      errorElement: 'span',
      errorClass: 'danger text-danger',
      rules: {
        grade: {
          required: true,
          digits: true
        },
      }
    });

    // modal ready fire
    $rewardGradeModal.on('show.bs.modal', function (event) {
      var $link = $(event.relatedTarget);

      var userId = $link.data('id');
      $rewardGradeModal.find('.modal-body input[name="user_id"]').val(userId);
    });
    // modal visited fire
    $rewardGradeModal.on('shown.bs.modal', function(){
      $rewardGradeModal.find('.modal-body input[name="grade"]').focus();
    });

    $('.admin-users-reward-grade-modal .submit-btn').on('click', function(){
      $form.find('.error').html('');

      if ($form.valid()) {
        var userId = $form.find('input[name="user_id"]').val();

        $.ajax({
          method: 'POST',
          dataType: 'json',
          url: "/admins/users/" + userId + "/reward_grade",
          data: $form.serialize(),
          success: function(data) {
            showSuccessNotify();
            $('.users-list-container .user-item-' + userId + ' td.grade-content').html(data.grade);
            $rewardGradeModal.modal('hide');
          },
          error: function(res) {
            $rewardGradeModal.find('.error').html(res.responseJSON.message);
          }
        });
      }
    });


    // 导入学生
    var $importUserModal = $('.modal.admin-import-user-modal');
    var $importUserForm = $importUserModal.find('form.admin-import-user-form')

    $importUserModal.on('show.bs.modal', function(){
      resetFileInputFunc($importUserModal.find('.upload-file-input'));
      $importUserModal.find('.file-names').html('选择文件');
      $importUserModal.find('.upload-file-input').trigger('click');
    });
    $importUserModal.on('change', '.upload-file-input', function(e){
      var file = $(this)[0].files[0];
      $importUserModal.find('.file-names').html(file ? file.name : '请选择文件');
    })

    var importUserFormValid = function(){
      if($importUserForm.find('input[name="file"]').val() == undefined || $importUserForm.find('input[name="file"]').val().length == 0){
        $importUserForm.find('.error').html('请选择文件');
        return false;
      }

      return true;
    };

    var buildResultMessage = function(data){
      var messageHtml = "<div>导入结果：成功" + data.success + "条，失败"+ data.fail.length + "条</div>";

      if(data.fail.length > 0){
        messageHtml += '<table class="table"><thead class="thead-light"><tr><th>数据</th><th>失败原因</th></tr></thead><tbody>';

        data.fail.forEach(function(item){
          messageHtml += '<tr><td>' + item.data + '</td><td>' + item.message + '</td></tr>';
        });

        messageHtml += '</tbody></table>'
      }

      return messageHtml;
    }

    $importUserModal.on('click', '.submit-btn', function(){
      $importUserForm.find('.error').html('');

      if (importUserFormValid()) {
        $('body').mLoading({ text: '正在导入...' });

        $.ajax({
          method: 'POST',
          dataType: 'json',
          url: '/admins/import_users',
          data: new FormData($importUserForm[0]),
          processData: false,
          contentType: false,
          success: function(data){
            $('body').mLoading('destroy');
            $importUserModal.modal('hide');

            showMessageModal(buildResultMessage(data), function(){
              window.location.reload();
            });
          },
          error: function(res){
            $('body').mLoading('destroy');
            var data = res.responseJSON;
            $importUserForm.find('.error').html(data.message);
          }
        });
      }
    });
  }
});