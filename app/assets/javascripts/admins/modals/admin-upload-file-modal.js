$(document).on('turbolinks:load', function() {
  var $modal = $('.modal.admin-upload-file-modal');
  if ($modal.length > 0) {
    var $form = $modal.find('form.admin-upload-file-form')
    var $sourceIdInput = $modal.find('input[name="source_id"]');
    var $sourceTypeInput = $modal.find('input[name="source_type"]');
    var $suffixInput = $modal.find('input[name="suffix"]');

    $modal.on('show.bs.modal', function(event){
      var $link = $(event.relatedTarget);
      var sourceId = $link.data('sourceId');
      var sourceType = $link.data('sourceType');
      var suffix = $link.data('suffix');

      $sourceIdInput.val(sourceId);
      $sourceTypeInput.val(sourceType);
      if(suffix != undefined){ $suffixInput.val(suffix); }

      $modal.find('.upload-file-input').trigger('click');
    });

    $modal.find('.upload-file-input').on('change', function(e){
      var file = $(this)[0].files[0];

      if(file){
        $modal.find('.file-names').html(file.name);
        $modal.find('.submit-btn').trigger('click');
      }
    })

    var formValid = function(){
      if($form.find('input[name="file"]').val() == undefined || $form.find('input[name="file"]').val().length == 0){
        $form.find('.error').html('请选择文件');
        return false;
      }

      return true;
    };

    $modal.on('click', '.submit-btn', function(){
      $form.find('.error').html('');

      if (formValid()) {
        var formDataString = $form.serialize();
        $.ajax({
          method: 'POST',
          dataType: 'json',
          url: '/admins/files?' + formDataString,
          data: new FormData($form[0]),
          processData: false,
          contentType: false,
          success: function(data){
            $.notify({ message: '上传成功' });
            $modal.find('.file-names').html('');
            $modal.trigger('upload:success', data);
            $modal.modal('hide');
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