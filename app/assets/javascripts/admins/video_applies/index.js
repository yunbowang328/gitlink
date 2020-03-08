$(document).on('turbolinks:load', function() {
  if ($('body.admins-video-applies-index-page').length > 0) {
    var $searchFrom = $('.video-applies-form');
    $searchFrom.find('select[name="status"]').val('pending');

    $searchFrom.on('click', '.search-form-tab', function(){
      var $link = $(this);

      $searchFrom.find('input[name="keyword"]').val('');
      $searchFrom.find('select[name="status"]').val('all');

      if($link.data('value') === 'all'){
        $searchFrom.find('.status-filter').show();
      } else {
        $searchFrom.find('.status-filter').hide();
        $searchFrom.find('select[name="status"]').val('pending');
      }
    });
  }
})