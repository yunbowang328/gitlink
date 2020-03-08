$(document).on('turbolinks:load', function() {
  var $modal = $('.modal.admin-import-course-member-modal');
  if ($modal.length > 0) {
    var $form = $modal.find('form.admin-import-course-member-form');

    var resetFileInputFunc = function(file){
      file.after(file.clone().val(""));
      file.remove();
    }

    $modal.on('show.bs.modal', function(){
      $modal.find('.file-names').html('选择文件');
      $modal.find('.upload-file-input').trigger('click');
    });
    $modal.on('hide.bs.modal', function(){
      resetFileInputFunc($modal.find('.upload-file-input'));
    });
    $modal.on('change', '.upload-file-input', function(e){
      var file = $(this)[0].files[0];
      $modal.find('.file-names').html(file ? file.name : '请选择文件');
    })

    var importFormValid = function(){
      if($form.find('input[name="file"]').val() == undefined || $form.find('input[name="file"]').val().length == 0){
        $form.find('.error').html('请选择文件');
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

    $modal.on('click', '.submit-btn', function(){
      $form.find('.error').html('');

      if (importFormValid()) {
        $('body').mLoading({ text: '正在导入...' });

        $.ajax({
          method: 'POST',
          dataType: 'json',
          url: '/admins/import_course_members',
          data: new FormData($form[0]),
          processData: false,
          contentType: false,
          success: function(data){
            $('body').mLoading('destroy');
            $modal.modal('hide');

            showMessageModal(buildResultMessage(data), function(){
              window.location.reload();
            });
          },
          error: function(res){
            $('body').mLoading('destroy');
            var data = res.responseJSON;
            $form.find('.error').html(data.message);
          }
        });
      }
    });
  }
});