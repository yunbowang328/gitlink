$(document).on('turbolinks:load', function() {
  $('.admin-modal-container').on('show.bs.modal', '.modal.admin-choose-mirror-modal', function(){
    var $modal = $('.modal.admin-choose-mirror-modal');
    var $form = $modal.find('form.admin-choose-mirror-form');

    var validateForm = function(){
      var checkedValue = $form.find('input[name="mirror_number"]:checked').val();

      if(checkedValue == undefined){
        $modal.find('.error').html('必须选择一种镜像保存！');
        return false;
      }
      return true;
    }

    $modal.on('click', '.submit-btn', function(){
      $form.find('.error').html('');
      var url = $form.attr('action');

      if (validateForm()) {
        $.ajax({
          method: 'POST',
          dataType: 'script',
          url: url,
          data: $form.serialize(),
        }).done(function(){
          $modal.modal('hide');
        });
      }
    });
  })
});