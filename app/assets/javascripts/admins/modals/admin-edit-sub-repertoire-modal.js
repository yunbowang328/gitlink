$(document).on('turbolinks:load', function() {
  $('.admin-modal-container').on('show.bs.modal', '.modal.admin-edit-sub-repertoire-modal', function(){
    var $modal = $('.modal.admin-edit-sub-repertoire-modal');
    var $form = $modal.find('form.admin-edit-sub-repertoire-form');

    $form.validate({
      errorElement: 'span',
      errorClass: 'danger text-danger',
      rules: {
        'sub_repertoire[name]': {
          required: true,
          maxlength: 20
        }
      }
    });

    $modal.on('click', '.submit-btn', function(){
      $form.find('.error').html('');
      var url = $form.attr('action');

      if ($form.valid()) {
        $.ajax({
            method: 'PATCH',
            dataType: 'script',
            url: url,
            data: $form.serialize()
        });
      }
    });
  });
});