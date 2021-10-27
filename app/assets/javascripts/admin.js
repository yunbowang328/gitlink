//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require jquery.validate.min
//= require additional-methods.min
//= require bootstrap-notify
//= require jquery.cookie.min
//= require select2
//= require moment.min
//= require jquery.cxselect
//= require bootstrap-datepicker
//= require bootstrap-datetimepicker
//= require bootstrap.viewer
//= require jquery.mloading
//= require jquery-confirm.min
//= require common

//= require echarts
//= require codemirror/lib/codemirror
//= require codemirror/mode/shell/shell
//= require editormd/editormd
//= require editormd/languages/zh-tw
//= require dragula/dragula

//= require_tree ./i18n
//= require_tree ./admins


$.ajaxSetup({
  beforeSend: function(xhr) {
    xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
  }
});

// ******** select2 global config ********
$.fn.select2.defaults.set('theme', 'bootstrap4');
$.fn.select2.defaults.set('language', 'zh-CN');

Turbolinks.setProgressBarDelay(200);

$.notifyDefaults({
  type: 'success',
  z_index: 9999,
  delay: 2000
});

function show_success_flash(){
  $.notify({
    message: '操作成功'
  },{
    type: 'success'
  });
}

$(document).on('turbolinks:load', function(){
  $('[data-toggle="tooltip"]').tooltip({ trigger : 'hover' });
  $('[data-toggle="popover"]').popover();

  // 图片查看大图
  $('img.preview-image').bootstrapViewer();

  // flash alert提示框自动关闭
  if($('.admin-alert-container .alert').length > 0){
    setTimeout(function(){
      $('.admin-alert-container .alert:not(.alert-danger)').alert('close');
    }, 2000);
    setTimeout(function(){
      $('.admin-alert-container .alert.alert-danger').alert('close');
    }, 5000);
  }
});

$(document).on("turbolinks:before-cache", function () {
  $('[data-toggle="tooltip"]').tooltip('hide');
  $('[data-toggle="popover"]').popover('hide');
});
// var progressBar = new Turbolinks.ProgressBar();

// $(document).on('ajax:send', function(event){
//   console.log('ajax send', event);
//   progressBar.setValue(0)
//   progressBar.show()
// });
//
// $(document).on('ajax:complete', function(event){
//   console.log('ajax complete', event);
//   progressBar.setValue(1)
//   progressBar.hide() // 分页时不触发，奇怪
// });
// $(document).on('ajax:success', function(event){
//   console.log('ajax success', event);
// });
// $(document).on('ajax:error', function(event){
//   console.log('ajax error', event);
// });

$(function () {
});

$(document).on('turbolinks:load', function() {
  
  $('.logo-item-left').on("change", 'input[type="file"]', function () {
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

  $('.attachment-item-left').on("change", 'input[type="file"]', function () {
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
})