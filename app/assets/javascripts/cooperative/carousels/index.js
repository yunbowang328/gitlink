$(document).on('turbolinks:load', function() {
  if ($('body.cooperative-carousels-index-page').length > 0) {
    var resetNo = function(){
      $('#carousels-container .custom-carousel-item-no').each(function(index, ele){
        $(ele).html(index + 1);
      })
    }
    // 删除后
    $(document).on('delete_success', resetNo);
    // ------------ 保存链接 -----------
    $('.carousels-card').on('click', '.save-data-btn', function(){
      var $link = $(this);
      var id = $link.data('id');
      var link = $('.custom-carousel-item-' + id).find('.link-input').val();
      var name = $('.custom-carousel-item-' + id).find('.name-input').val();
      if(!name || name.length == 0){
        $.notify({ message: '名称不能为空' },{ type: 'danger' });
        return;
      }
      $link.attr('disabled', true);

      $.ajax({
        url: '/cooperative/carousels/' + id,
        method: 'PATCH',
        dataType: 'json',
        data: { link: link, name: name },
        success: function(data){
          $.notify({ message: '操作成功' });
        },
        error: ajaxErrorNotifyHandler,
        complete: function(){
          $link.removeAttr('disabled');
        }
      })
    });
    // -------------- 是否在首页展示 --------------
    $('.carousels-card').on('change', '.online-check-box', function(){
      var $checkbox = $(this);
      var id = $checkbox.data('id');
      var checked = $checkbox.is(':checked');
      $checkbox.attr('disabled', true);

      $.ajax({
        url: '/cooperative/carousels/' + id,
        method: 'PATCH',
        dataType: 'json',
        data: { status: checked },
        success: function(data){
          $.notify({ message: '保存成功' });
          var box = $('.custom-carousel-item-' + id).find('.drag');
          if(checked){
            box.removeClass('not_active');
          }else{
            box.addClass('not_active');
          }
        },
        error: ajaxErrorNotifyHandler,
        complete: function(){
          $checkbox.removeAttr('disabled');
        }
      })
    });

    // ------------ 拖拽 -------------
    var onDropFunc = function(el, _target, _source, sibling){
      var moveId = $(el).data('id');
      var insertId = $(sibling).data('id') || '';

      $.ajax({
        url: '/cooperative/carousels/drag',
        method: 'POST',
        dataType: 'json',
        data: { move_id: moveId, after_id: insertId },
        success: function(data){
          resetNo();
        },
        error: function(res){
          var data = res.responseJSON;
          $.notify({message: '移动失败，原因：' + data.message}, {type: 'danger'});
        }
      })
    };
    var ele1 = document.getElementById('carousels-container');
    dragula([ele1], { mirrorContainer: ele1 }).on('drop', onDropFunc);


    // ----------- 新增 --------------
    var $createModal = $('.modal.cooperative-add-carousel-modal');
    var $createForm = $createModal.find('form.cooperative-add-carousel-form');

    $createForm.validate({
      errorElement: 'span',
      errorClass: 'danger text-danger',
      rules: {
        "portal_image[image]": {
          required: true
        },
        "portal_image[name]": {
          required: true
        },
      }
    });

    $createModal.on('show.bs.modal', function(event){
      resetFileInputFunc($createModal.find('.img-file-input'));
      $createModal.find('.file-names').html('选择文件');
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
    $('.modal.cooperative-upload-file-modal').on('upload:success', function(e, data){
      var $carouselItem = $('.custom-carousel-item-' + data.source_id);
      $carouselItem.find('.custom-carousel-item-img img').attr('src', data.url);
    })
  }
})