/*
 * @Description: Do not edit
 * @Date: 2021-08-31 11:16:45
 * @LastEditors: viletyy
 * @Author: viletyy
 * @LastEditTime: 2021-08-31 14:19:46
 * @FilePath: /forgeplus/app/assets/javascripts/admins/system_notifications/index.js
 */
$(document).on('turbolinks:load', function(){

    var showSuccessNotify = function() {
      $.notify({
        message: '操作成功'
      },{
        type: 'success'
      });
    }

    // close user
    $('.system-notification-list-container').on('click', '.close-action', function(){
      var $closeAction = $(this);
      var $uncloseAction = $closeAction.siblings('.unclose-action');

      var keywordID = $closeAction.data('id');
      customConfirm({
        content: '确认取消置顶吗？',
        ok: function(){
          $.ajax({
            url: '/admins/system_notifications/' + keywordID,
            method: 'PUT',
            dataType: 'json',
            data: {
              system_notification: {
                is_top: false
              }
            },
            success: function() {
              showSuccessNotify();
              $closeAction.hide();
              $uncloseAction.show();
              $(".system-notification-item-"+keywordID).children('td').eq(3).text("")
            }
          });
        }
      });
    });

    // unclose user
    $('.system-notification-list-container').on('click', '.unclose-action', function(){
      var $uncloseAction = $(this);
      var $closeAction = $uncloseAction.siblings('.close-action');

      var keywordID = $uncloseAction.data('id');
      customConfirm({
        content: '确认置顶吗？',
        ok: function () {
          $.ajax({
            url: '/admins/system_notifications/' + keywordID,
            method: 'PUT',
            dataType: 'json',
            data: {
              system_notification: {
                is_top: true
              }
            },
            success: function() {
              showSuccessNotify();
              $closeAction.show();
              $uncloseAction.hide();
              $(".system-notification-item-"+keywordID).children('td').eq(3).text("√")
            }
          });
        }
      })
    });
})