$(document).on('turbolinks:load', function() {
  var $modal = $('.modal.admin-replace-mirror-modal');
  if ($modal.length > 0) {
    var $form = $modal.find('form.admin-replace-mirror-form');
    var $mirrorIdInput = $modal.find('.modal-body input[name="mirror_id"]');
    var $mirrorSelect = $modal.find('.new-mirror-select');

    var setMirror = function(id, name){
      $mirrorIdInput.val(id);
      $form.find('.mirror-id-container').html(id);
      $form.find('.mirror-name-container').html(name);
    }

    $form.validate({
      errorElement: 'span',
      errorClass: 'danger text-danger',
      rules: {
        new_mirror_id: {
          required: true
        },
      },
      messages: {
        new_mirror_id: {
          required: '请选择新镜像'
        }
      }
    });

    // modal ready fire
    $modal.on('show.bs.modal', function (event) {
      var $link = $(event.relatedTarget);

      var mirrorId = $link.data('id');
      var mirrorName = $link.data('name');

      setMirror(mirrorId, mirrorName);
      $mirrorSelect.select2('val', ' ');
    });
    $modal.on('hide.bs.modal', function () {
      setMirror('', '');
      $mirrorSelect.select2('val', ' ');
      $('#new_mirror_id-error').remove();
    });

    $mirrorSelect.select2({
      theme: 'bootstrap4',
      placeholder: '输入要合并的镜像名',
      minimumInputLength: 1,
      ajax: {
        url: '/admins/mirror_repositories/for_select',
        dataType: 'json',
        data: function(params){
          return { keyword: params.term };
        },
        processResults: function(data){
          return { results: data.mirrors }
        }
      },
      templateResult: function (item) {
        if(!item.id || item.id === '') return item.text;
        return item.name;
      },
      templateSelection: function(item){
        if (item.id) {
          $('#new_mirror_id-error').remove();
          $('#new_mirror_id').val(item.id);
        }
        return item.name || item.text;
      }
    });

    $modal.on('click', '.submit-btn', function(){
      $form.find('.error').html('');

      if ($form.valid()) {
        var url = $form.data('url');

        $.ajax({
          method: 'POST',
          dataType: 'script',
          url: url,
          data: $form.serialize(),
        }).done(function(){
          $modal.modal('hide');
        });
      }
    });
  }
});