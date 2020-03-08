$(document).on('turbolinks:load', function(){
  $(document).on('click', '.batch-all-check-box', function(){
    var $checkAll = $(this);

    $('.batch-check-box').prop('checked', $checkAll.is(':checked'));
  })

  $(document).on('click', '.batch-check-box', function(){
    var allChecked = $('.batch-check-box:checked').length === $('.batch-check-box').length
    $('.batch-all-check-box').prop('checked', allChecked);
  })
});