$(document).on('turbolinks:load', function() {
  if ($('body.admins-library-applies-index-page').length > 0) {
    var $searchFrom = $('.library-applies-list-form');
    $searchFrom.find('select[name="status"]').val('pending');

    $searchFrom.on('click', '.search-form-tab', function(){
      var $link = $(this);

      $searchFrom.find('input[name="keyword"]').val('');
      $searchFrom.find('select[name="status"]').val('processed');

      if($link.data('value') === 'processed'){
        $searchFrom.find('.status-filter').show();
      } else {
        $searchFrom.find('.status-filter').hide();
        $searchFrom.find('select[name="status"]').val('pending');
      }
    });
  }
})