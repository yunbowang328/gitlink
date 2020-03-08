$(document).on('turbolinks:load', function() {
  var $tabs = $('.search-form-container .search-form-tabs');
  if ($tabs.length > 0) {
    $tabs.on('click', '.search-form-tab', function(){
      var $activeTab = $(this);
      $tabs.find('.search-form-tab').removeClass('active');
      $activeTab.addClass('active');
    });
  }
});