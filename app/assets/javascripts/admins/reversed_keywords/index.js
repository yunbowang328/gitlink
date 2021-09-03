/*
 * @Description: Do not edit
 * @Date: 2021-08-31 11:16:45
 * @LastEditors: viletyy
 * @Author: viletyy
 * @LastEditTime: 2021-08-31 14:19:46
 * @FilePath: /forgeplus/app/assets/javascripts/admins/reversed_keywords/index.js
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
    $('.reversed-keyword-list-container').on('click', '.close-action', function(){
      var $closeAction = $(this);
      var $uncloseAction = $closeAction.siblings('.unclose-action');

      var keywordID = $closeAction.data('id');
      customConfirm({
        content: '确认关闭限制吗？',
        ok: function(){
          $.ajax({
            url: '/admins/reversed_keywords/' + keywordID,
            method: 'PUT',
            dataType: 'json',
            data: {
              reversed_keyword: {
                closed: true
              }
            },
            success: function() {
              showSuccessNotify();
              $closeAction.hide();
              $uncloseAction.show();
              $(".reversed-keyword-item-"+keywordID).children('td').eq(3).text("")
            }
          });
        }
      });
    });

    // unclose user
    $('.reversed-keyword-list-container').on('click', '.unclose-action', function(){
      var $uncloseAction = $(this);
      var $closeAction = $uncloseAction.siblings('.close-action');

      var keywordID = $uncloseAction.data('id');
      customConfirm({
        content: '确认开启限制吗？',
        ok: function () {
          $.ajax({
            url: '/admins/reversed_keywords/' + keywordID,
            method: 'PUT',
            dataType: 'json',
            data: {
              reversed_keyword: {
                closed: false
              }
            },
            success: function() {
              showSuccessNotify();
              $closeAction.show();
              $uncloseAction.hide();
              $(".reversed-keyword-item-"+keywordID).children('td').eq(3).text("√")
            }
          });
        }
      })
    });
})