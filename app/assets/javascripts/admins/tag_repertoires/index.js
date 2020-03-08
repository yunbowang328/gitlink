$(document).on('turbolinks:load', function() {
  if ($('body.admins-tag-repertoires-index-page').length > 0) {

    // ============== 新建 ===============
    var $modal = $('.modal.admin-create-tag-repertoire-modal');
    var $form = $modal.find('form.admin-create-tag-repertoire-form');
    var $nameInput = $form.find('input[name="name"]');

    $form.validate({
      errorElement: 'span',
      errorClass: 'danger text-danger',
      rules: {
        name: {
          required: true
        }
      }
    });

    // modal ready fire
    $modal.on('show.bs.modal', function () {
        $nameInput.val('');
    });

    $modal.on('click', '.submit-btn', function(){
      $form.find('.error').html('');

      if ($form.valid()) {
        var url = $form.data('url');

        $.ajax({
          method: 'POST',
          dataType: 'json',
          url: url,
          data: $form.serialize(),
          success: function(){
            $.notify({ message: '创建成功' });
            $modal.modal('hide');

            setTimeout(function(){
              window.location.reload();
            }, 500);
          },
          error: function(res){
            var data = res.responseJSON;
            $form.find('.error').html(data.message);
          }
        });
      }
    });

      $(".tag-repertoire-list-container").on("change", '.tag-repertoire-source-form', function () {
          var s_id = $(this).attr("data-id");
          var s_value = $(this).val();
          var s_name = $(this).attr("name");
          var json = {};
          json[s_name] = s_value;
          $.ajax({
              url: "/admins/tag_repertoires/" + s_id,
              type: "PUT",
              dataType:'script',
              data: json
          });
      });
  }
});