$(document).on('turbolinks:load', function() {
  $('.admin-modal-container').on('show.bs.modal', '.modal.admin-edit-department-modal', function(){
    var $modal = $('.modal.admin-edit-department-modal');
    var $form = $modal.find('form.admin-edit-department-form');

    $form.validate({
      errorElement: 'span',
      errorClass: 'danger text-danger',
      rules: {
        'department[name]': {
          required: true,
          maxlength: 20
        },
        'department[host_count]': {
          digits: true
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
  })
});