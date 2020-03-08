$(document).on('turbolinks:load', function() {
  if ($('body.cooperative-laboratory-settings-edit-page, body.cooperative-laboratory-settings-update-page').length > 0) {
    var $container = $('.edit-laboratory-setting-container');
    var $form = $container.find('.edit_laboratory');

    $('.logo-item-left, .banner-item-bottom').on("change", 'input[type="file"]', function () {
      var $fileInput = $(this);
      var file = this.files[0];
      var imageType = /image.*/;
      if (file && file.type.match(imageType)) {
        var reader = new FileReader();
        reader.onload = function () {
          var $box = $fileInput.parent();
          $box.find('img').attr('src', reader.result).css('display', 'block');
          $box.addClass('has-img');
        };
        reader.readAsDataURL(file);
      } else {
      }
    });

    createMDEditor('laboratory-footer-editor', { height: 200, placeholder: '请输入备案信息' });

    $form.validate({
      errorElement: 'span',
      errorClass: 'danger text-danger',
      errorPlacement:function(error,element){
        if(element.parent().hasClass("input-group")){
          element.parent().after(error);
        }else{
          element.after(error)
        }
      },
      rules: {
        identifier: {
          required: true,
          checkSite: true
        },
        name: {
          required: true
        }
      }
    });
    $.validator.addMethod("checkSite",function(value,element,params){
      var checkSite = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
      return this.optional(element)||(checkSite.test(value + '.educoder.com'));
    },"域名不合法！");

    $form.on('click', '.submit-btn', function(){
      $form.find('.submit-btn').attr('disabled', 'disabled');
      $form.find('.error').html('');
      var valid = $form.valid();

      $('input[name="navbar[][name]"]').each(function(_, e){
        var $ele = $(e);
        if($ele.val() === undefined || $ele.val().length === 0){
          $ele.addClass('danger text-danger');
          valid = false;
        } else {
          $ele.removeClass('danger text-danger');
        }
      });

      if(!valid) return;
      $.ajax({
        method: 'PATCH',
        dataType: 'json',
        url: $form.attr('action'),
        data: new FormData($form[0]),
        processData: false,
        contentType: false,
        success: function(data){
          $.notify({ message: '保存成功' });
          window.location.reload();
        },
        error: function(res){
          var data = res.responseJSON;
          $form.find('.error').html(data.message);
        },
        complete: function(){
          $form.find('.submit-btn').attr('disabled', false);
        }
      });
    })
  }
});