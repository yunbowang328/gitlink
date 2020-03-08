$(document).on('turbolinks:load', function() {
  if ($('body.admins-disciplines-index-page').length > 0) {

    // ============== 新建 ===============
    var $modal = $('.modal.admin-create-discipline-modal');
    var $form = $modal.find('form.admin-create-discipline-form');
    var $nameInput = $form.find('input[name="name"]');

    $form.validate({
      errorElement: 'span',
      errorClass: 'danger text-danger',
      rules: {
        name: {
          required: true
        }
      }
    });

    // modal ready fire
    $modal.on('show.bs.modal', function () {
        $nameInput.val('');
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

      $(".discipline-list-container").on("change", '.discipline-source-form', function () {
          var s_id = $(this).attr("data-id");
          var s_value = $(this).val();
          var s_name = $(this).attr("name");
          var json = {};
          json[s_name] = s_value;
          $.ajax({
              url: "/admins/disciplines/" + s_id,
              type: "PUT",
              dataType:'script',
              data: json
          });
      });

      // 导入学生
      var $importDisciplineModal = $('.modal.admin-import-discipline-modal');
      var $importDisciplineForm = $importDisciplineModal.find('form.admin-import-discipline-form');

      $importDisciplineModal.on('show.bs.modal', function(){
          resetFileInputFunc($importDisciplineModal.find('.upload-file-input'));
          $importDisciplineModal.find('.file-names').html('选择文件');
          $importDisciplineModal.find('.upload-file-input').trigger('click');
      });
      $importDisciplineModal.on('change', '.upload-file-input', function(e){
          var file = $(this)[0].files[0];
          $importDisciplineModal.find('.file-names').html(file ? file.name : '请选择文件');
      });

      var importDisciplineFormValid = function(){
          if($importDisciplineForm.find('input[name="file"]').val() == undefined || $importDisciplineForm.find('input[name="file"]').val().length == 0){
              $importDisciplineForm.find('.error').html('请选择文件');
              return false;
          }

          return true;
      };

      var buildResultMessage = function(data){
          var messageHtml = "<div>导入结果：成功" + data.success + "条，失败"+ data.fail.length + "条</div>";

          return messageHtml;
      };

      $importDisciplineModal.on('click', '.submit-btn', function(){
          $importDisciplineForm.find('.error').html('');

          if (importDisciplineFormValid()) {
              $('body').mLoading({ text: '正在导入...' });

              $.ajax({
                  method: 'POST',
                  dataType: 'json',
                  url: '/admins/import_disciplines',
                  data: new FormData($importDisciplineForm[0]),
                  processData: false,
                  contentType: false,
                  success: function(data){
                      $('body').mLoading('destroy');
                      $importDisciplineModal.modal('hide');

                      showMessageModal(buildResultMessage(data), function(){
                          window.location.reload();
                      });
                  },
                  error: function(res){
                      $('body').mLoading('destroy');
                      var data = res.responseJSON;
                      $importDisciplineForm.find('.error').html(data.message);
                  }
              });
          }
      });

      // ------------ 上移/下移 -------------
      $('.discipline-list-container').on('click', ".move-action", function () {
          var $doAction = $(this);

          var disciplineId = $doAction.data('id');
          var opr = $doAction.data('opr');
          $.ajax({
              url: '/admins/disciplines/' + disciplineId + '/adjust_position',
              method: 'POST',
              dataType: 'script',
              data: {opr: opr}
          });
      });
  }
});