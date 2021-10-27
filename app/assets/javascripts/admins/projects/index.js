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
    $('.project-list-container').on('click', '.recommend-action', function(){
      var $closeAction = $(this);
      var $uncloseAction = $closeAction.siblings('.unrecommend-action');

      var keywordID = $closeAction.data('id');
      customConfirm({
        content: '确认将该项目设置为推荐项目吗?',
        ok: function(){
          $.ajax({
            url: '/admins/projects/' + keywordID,
            method: 'PUT',
            dataType: 'json',
            data: {
              project: {
                recommend: true,
                recommend_index: 1
              }
            },
            success: function() {
              showSuccessNotify();
              $closeAction.hide();
              $uncloseAction.show();
              $(".project-item-"+keywordID).children('td').eq(5).text("√")
            }
          });
        }
      });
    });

    // unclose user
    $('.project-list-container').on('click', '.unrecommend-action', function(){
      var $uncloseAction = $(this);
      var $closeAction = $uncloseAction.siblings('.recommend-action');

      var keywordID = $uncloseAction.data('id');
      customConfirm({
        content: '确认取消该推荐项目吗？',
        ok: function () {
          $.ajax({
            url: '/admins/projects/' + keywordID,
            method: 'PUT',
            dataType: 'json',
            data: {
              project: {
                recommend: false,
                recommend: 1
              }
            },
            success: function() {
              showSuccessNotify();
              $closeAction.show();
              $uncloseAction.hide();
              $(".project-item-"+keywordID).children('td').eq(5).text("")
            }
          });
        }
      })
    });


    // close user
    $('.project-list-container').on('click', '.pinned-action', function(){
      var $closeAction = $(this);
      var $uncloseAction = $closeAction.siblings('.unpinned-action');

      var keywordID = $closeAction.data('id');
      customConfirm({
        content: '确认将该项目设置为精选项目吗?',
        ok: function(){
          $.ajax({
            url: '/admins/projects/' + keywordID,
            method: 'PUT',
            dataType: 'json',
            data: {
              project: {
                is_pinned: true,
              }
            },
            success: function() {
              showSuccessNotify();
              $closeAction.hide();
              $uncloseAction.show();
              $(".project-item-"+keywordID).children('td').eq(4).text("√")
            }
          });
        }
      });
    });

    // unclose user
    $('.project-list-container').on('click', '.unpinned-action', function(){
      var $uncloseAction = $(this);
      var $closeAction = $uncloseAction.siblings('.pinned-action');

      var keywordID = $uncloseAction.data('id');
      customConfirm({
        content: '确认取消该精选项目吗？',
        ok: function () {
          $.ajax({
            url: '/admins/projects/' + keywordID,
            method: 'PUT',
            dataType: 'json',
            data: {
              project: {
                is_pinned: false,
              }
            },
            success: function() {
              showSuccessNotify();
              $closeAction.show();
              $uncloseAction.hide();
              $(".project-item-"+keywordID).children('td').eq(4).text("")
            }
          });
        }
      })
    });
})