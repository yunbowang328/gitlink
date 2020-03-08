$(document).on('turbolinks:load', function() {
  if ($('body.admins-mirror-repositories-edit-page, body.admins-mirror-repositories-update-page').length > 0) {
    var $form = $('form.edit-mirror');

    $form.validate({
      errorElement: 'span',
      errorClass: 'danger text-danger',
      rules: {
        "mirror_repository[type_name]": {
          required: true
        }
      }
    });

    $form.submit(function(e){
      if(!$form.valid()){ e.preventDefault(); }
    });
  }
});