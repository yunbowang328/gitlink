$(document).on('turbolinks:load', function() {
  if ($('body.admins-cooperatives-index-page').length > 0) {
    // ------------ 保存链接 -----------
    $('.coo-img-card').on('click', '.save-url-btn', function(){
      var $link = $(this);
      var cooId = $link.data('id');
      var url = $('.coo-img-item-' + cooId).find('.url-input').val();
      $link.attr('disabled', true);

      $.ajax({
        url: '/admins/cooperatives/' + cooId,
        method: 'PATCH',
        dataType: 'json',
        data: { url: url },
        success: function(data){
          $.notify({ message: '保存成功' });
        },
        error: ajaxErrorNotifyHandler,
        complete: function(){
          $link.removeAttr('disabled');
        }
      })
    });

    // ------------ 拖拽 -------------
    var onDropFunc = function(el, _target, _source, sibling){
      var moveId = $(el).data('id');
      var insertId = $(sibling).data('id') || '';

      $.ajax({
        url: '/admins/cooperatives/drag',
        method: 'POST',
        dataType: 'json',
        data: { move_id: moveId, after_id: insertId },
        success: function(data){
        },
        error: function(res){
          var data = res.responseJSON;
          $.notify({message: '移动失败，原因：' + data.message}, {type: 'danger'});
        }
      })
    };
    var ele1 = document.getElementById('coo-img-container-alliance_coop');
    dragula([ele1], { mirrorContainer: ele1 }).on('drop', onDropFunc);
    var ele2 = document.getElementById('coo-img-container-com_coop');
    dragula([ele2], { mirrorContainer: ele2 }).on('drop', onDropFunc);
    var ele3 = document.getElementById('coo-img-container-edu_coop');
    dragula([ele3], { mirrorContainer: ele3 }).on('drop', onDropFunc);


    // ----------- 新增 --------------
    var $createModal = $('.modal.admin-add-cooperative-modal');
    var $createForm = $createModal.find('form.admin-add-cooperative-form');

    $createForm.validate({
      errorElement: 'span',
      errorClass: 'danger text-danger',
      rules: {
        "coo_img[image]": {
          required: true
        }
      }
    });

    $createModal.on('show.bs.modal', function(event){
      resetFileInputFunc($createModal.find('.img-file-input'));
      $createModal.find('.file-names').html('选择文件');

      var $link = $(event.relatedTarget);
      var imgType = $link.data('imgType');
      $createForm.find('input[name="coo_img[img_type]"]').val(imgType);
    });

    $createModal.on('click', '.submit-btn', function() {
      $createForm.find('.error').html('');

      if ($createForm.valid()) {
        $createForm.submit();
      } else {
        $createForm.find('.error').html('请选择图片');
      }
    });
    $createModal.on('change', '.img-file-input', function(){
      var file = $(this)[0].files[0];
      $createModal.find('.file-names').html(file ? file.name : '请选择文件');
    })

    // -------------- 重新上传图片 --------------
    //replace_image_url
    $('.modal.admin-upload-file-modal').on('upload:success', function(e, data){
      var $cooImgItem = $('.coo-img-item-' + data.source_id);
      $.post('/admins/cooperatives/'+ data.source_id + '/replace_image_url');
      $cooImgItem.find('.coo-img-item-img img').attr('src', data.url);
    })
  }
})