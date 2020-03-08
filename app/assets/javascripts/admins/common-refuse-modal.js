$(document).on('turbolinks:load', function() {
  var $refuseModal = $('.admin-common-refuse-modal');
  if ($refuseModal.length > 0) {
    var $form = $refuseModal.find('form.admin-common-refuse-form');
    var $applyIdInput = $refuseModal.find('.modal-body input[name="apply_id"]');
    var $applyTitle = $refuseModal.find('.modal-title');

    $form.validate({
      errorElement: 'span',
      errorClass: 'danger text-danger',
      rules: {
        reason: {
          required: true,
          maxlength: 200
        },
      }
    });

    // modal ready fire
    $refuseModal.on('show.bs.modal', function (event) {
      var $link = $(event.relatedTarget);

      var applyId = $link.data('id');
      var url = $link.data('url');
      var title = $link.data('title');
      var type = $link.data('type');
      var form_method = "POST";
      if(typeof title !== 'undefined'){
        $applyTitle.html(title)
      }
      if(typeof type !== 'undefined'){
        form_method = type;
      }

      $applyIdInput.val(applyId);
      $form.data('url', url);
      $form.data('type', form_method);
    });
    // modal visited fire
    $refuseModal.on('shown.bs.modal', function(){
      $refuseModal.find('.modal-body textarea[name="reason"]').focus();
    });
    $refuseModal.on('hide.bs.modal', function () {
      $applyIdInput.val('');
      $refuseModal.find('.modal-body textarea[name="reason"]').val('');
      $form.data('url', '');
    })

    $refuseModal.on('click', '.submit-btn', function(){
      $form.find('.error').html('');

      if ($form.valid()) {
        var url = $form.data('url');
        var form_method = $form.data('type');

        $.ajax({
          method: form_method,
          dataType: 'script',
          url: url,
          data: $form.serialize(),
        }).done(function(){
          $refuseModal.modal('hide');
        });
      }
    });
  }
});