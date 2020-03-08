$(document).on('turbolinks:load', function() {
  if ($('body.admins-abouts-edit-page, body.admins-abouts-update-page').length > 0) {
    createMDEditor('about-us-editor', {});
  }
})