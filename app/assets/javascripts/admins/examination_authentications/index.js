$(document).on('turbolinks:load', function() {
  if ($('body.admins-examination-authentications-index-page').length > 0) {
    var $searchFrom = $('.examination-authentication-list-form');
    $searchFrom.find('select[name="status"]').val('pending');

    $searchFrom.on('click', '.search-form-tab', function(){
      var $link = $(this);

      $searchFrom.find('input[name="keyword"]').val('');
      $searchFrom.find('select[name="status"]').val('processed');

      if($link.data('value') === 'processed'){
        $('.batch-action-container').hide();
        $searchFrom.find('.status-filter').show();
      } else {
        $('.batch-action-container').show();
        $searchFrom.find('.status-filter').hide();
        $searchFrom.find('select[name="status"]').val('pending');
      }
    });
  }
});