$(document).on('turbolinks:load', function() {
  if ($('body.admins-help-centers-edit-page, body.admins-help-centers-update-page').length > 0) {
    createMDEditor('help-center-editor', {});
  }
})