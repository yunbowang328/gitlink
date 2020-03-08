$(document).on('turbolinks:load', function() {
  $('.admin-modal-container').on('show.bs.modal', '.admin-save-competition-prize-modal', function(event){
    var $modal = $('.modal.admin-save-competition-prize-modal');
    var $form = $modal.find('form.admin-save-competition-prize-form');

    $form.validate({
      errorElement: 'span',
      errorClass: 'danger text-danger',
      rules: {
        'competition_prize[name]': {
          required: true,
          maxlength: 10
        },
        'competition_prize[num]': {
          required: true,
          digits: true,
          min: 1
        }
      }
    });

    $modal.on('click', '.submit-btn', function(){
      $form.find('.error').html('');
      var url = $form.attr('action');
      var formMethod = $form.data('form-method')

      if ($form.valid()) {
        $.ajax({
          method: formMethod,
          dataType: 'json',
          url: url,
          data: $form.serialize(),
          success: function(data){
            if(data && data.status === 0) {
              show_success_flash();
              $(document).trigger('prize.save.success');
              $modal.modal('hide');
            } else {
              $modal.find('.error').html(data.message)
            }
          }
        });
      }
    });
  })
});