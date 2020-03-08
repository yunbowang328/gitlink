$(document).on('turbolinks:load', function() {
  if ($('body.admins-agreements-edit-page, body.admins-agreements-update-page').length > 0) {
    createMDEditor('agreement-editor', {});
  }
})