$(document).on('turbolinks:load', function() {
  if ($('body.partners-customers-page').length > 0) {
    var $customerContainer = $('.customer-list-container');
    var partnerId = $customerContainer.find('.customer-list-body').data('id');

    $customerContainer.on('change', '.manager-group-select', function(){
      console.log('manager-group-select  change', $(this).val());
      var $select = $(this);
      var customerId = $select.data('id');
      var managerGroupId = $select.val();

      $.ajax({
        url: '/partners/' + partnerId + '/customer_manager_group.json',
        method: 'POST',
        dataType: 'json',
        data: { customer_id: customerId, manager_group_id: managerGroupId },
        success: function(){
          showSuccessFlash();
          $select.data('last', managerGroupId);
        },
        error: function(res){
          showErrorNotify(res.responseJSON.message);
          $select.val($select.data('last'));
        }
      })
    })
  }
});