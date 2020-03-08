//= require rails-ujs
//= require turbolinks
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require jquery.validate.min
//= require additional-methods.min
//= require bootstrap-notify
//= require select2
//= require common

//= require echarts

//= require ./i18n/jquery-validate-message-zh
//= require ./i18n/select2-i18n.zh-CN
//= require_tree ./colleges

Turbolinks.setProgressBarDelay(200);

// ******** select2 global config ********
$.fn.select2.defaults.set('theme', 'bootstrap4');
$.fn.select2.defaults.set('language', 'zh-CN');

$(document).on('turbolinks:load', function() {
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();
})

$(document).on("turbolinks:before-cache", function () {
  $('[data-toggle="tooltip"]').tooltip('hide');
  $('[data-toggle="popover"]').popover('hide');
});