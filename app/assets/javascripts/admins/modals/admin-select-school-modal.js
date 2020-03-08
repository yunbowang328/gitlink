$(document).on('turbolinks:load', function() {
  var $modal = $('.modal.admin-select-school-modal');
  if ($modal.length > 0) {
    var $link = null;
    var $form = $modal.find('form.admin-select-school-form');
    var multiple = $form.data('multiple');

    $form.find('.school-select').select2({
      theme: 'bootstrap4',
      placeholder: '请选择',
      multiple: multiple,
      minimumInputLength: 1,
      ajax: {
        delay: 500,
        url: '/api/schools/search.json',
        dataType: 'json',
        data: function (params) {
          return {keyword: params.term};
        },
        processResults: function (data) {
          return {results: data.schools}
        }
      },
      templateResult: function (item) {
        if (!item.id || item.id === '') return item.text;
        var html = "<span>" + item.name + "<span class='ml-4 font-12'>";
        if(item.province){ html += item.province }
        html += "</span></span>";
        return $(html);
      },
      templateSelection: function (item) {
        if (item.id) {
        }
        return item.name || item.text;
      }
    });

    $form.validate({
      errorElement: 'span',
      errorClass: 'danger text-danger',
      rules: {
        school_ids: {
          required: true
        }
      },
      messages: {
        school_ids: {
          required: '请选择'
        }
      }
    });

    $modal.on('show.bs.modal', function(event){
      $link = $(event.relatedTarget);
    });

    $modal.on('hide.bs.modal', function(){
      $form.find('.error').html('');
      $form.find('.school-select').select2('val', ' ');
    });

    $modal.on('click', '.submit-btn', function(){
      $form.find('.error').html('');

      if($form.valid()){
        var url = $form.data('url');
        var schoolIds = $form.find('#school_ids').val();

        $.ajax({
          method: 'POST',
          dataType: 'json',
          url: url,
          data: { school_ids: schoolIds },
          success: function(){
            $.notify({ message: '操作成功' });
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
  }
});