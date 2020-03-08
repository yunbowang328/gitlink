$(document).on('turbolinks:load', function() {
  if ($('body.admins-identity-authentications-index-page').length > 0) {
    var $searchFrom = $('.identity-authentication-list-form');
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

    $('.batch-agree-btn').on('click', function(){
      if($('.batch-check-box:checked').length === 0){
        $.notify({ message: '请先选择数据' }, { type: 'info' });
        return;
      }

      customConfirm({
        content: '确认审核通过？',
        ok: function(){
          var ids = $('.batch-check-box:checked').map(function(_, e){ return $(e).val() }).get();

          $.ajax({
            url: '/admins/identity_authentications/batch_agree',
            method: 'POST',
            dataType: 'json',
            data: { ids: ids },
            success: function(data){
              $.notify({ message: '操作成功' });
              window.location.reload();
            },
            error: function(res){
              $.notify({ message: res.responseJSON.message }, { type: 'danger' });
            }
          })
        }
      })
    })
  }
})