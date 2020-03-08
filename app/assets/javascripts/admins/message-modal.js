$(document).on('turbolinks:load', function() {
  var $modal = $('.modal.admin-message-modal');
  var $submitBtn = $modal.find('.submit-btn');
  if ($modal.length > 0) {
    $modal.on('hide.bs.modal', function(){
      $modal.find('.modal-body').html('');
      $submitBtn.unbind();
    });
  }
});

function showMessageModal(html, callback) {
  var $modal = $('.modal.admin-message-modal');
  var $submitBtn = $modal.find('.submit-btn');
  $submitBtn.unbind();
  if(callback !== undefined && typeof callback === 'function'){
    $submitBtn.on('click', callback);
  }

  $modal.find('.modal-body').html(html);
  $modal.modal('show');
}