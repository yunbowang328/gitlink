$(document).on('turbolinks:load', function() {
  if ($('body.cooperative-laboratory-shixuns-index-page').length > 0) {
    var $searchForm = $('.laboratory-shixun-list-form .search-form');

    $searchForm.find('select#tag_id').select2({
      placeholder: "请选择",
      allowClear: true
    });

    // 上传图片
    $('.modal.cooperative-upload-file-modal').on('upload:success', function (e, data) {
      var $imageElement = $('.shixun-image-' + data.source_id);
      if($imageElement.length === 0) return;
      $imageElement.attr('src', data.url);
      $imageElement.show();
      $imageElement.next().html('重新上传');
    });

    // 定义状态切换监听事件
    var defineStatusChangeFunc = function (doElement, undoElement, url, callback) {
      $('.laboratory-shixun-list-container').on('click', doElement, function () {
        var $doAction = $(this);
        var $undoAction = $doAction.siblings(undoElement);

        var laboratoryShixunId = $doAction.data('id');
        customConfirm({
          content: '确认进行该操作吗？',
          ok: function () {
            $.ajax({
              url: '/cooperative/laboratory_shixuns/' + laboratoryShixunId + url,
              method: 'POST',
              dataType: 'json',
              success: function () {
                show_success_flash();
                $doAction.hide();
                $undoAction.show();
                if (callback && typeof callback === "function") {
                  callback(laboratoryShixunId, url);
                }
              }
            });
          }
        });
      });
    }

    // 首页展示与取消首页展示
    var homepageShowCallback = function (laboratoryShixunId, url) {
      var $laboratoryShixunItem = $('.laboratory-shixun-list-container').find('.laboratory-shixun-item-' + laboratoryShixunId);

      if (url === '/homepage') {
        $laboratoryShixunItem.find('.homepage-badge').show();
      } else {
        $laboratoryShixunItem.find('.homepage-badge').hide();
      }
    }
    defineStatusChangeFunc('.homepage-show-action', '.homepage-hide-action', '/homepage', homepageShowCallback);
    defineStatusChangeFunc('.homepage-hide-action', '.homepage-show-action', '/cancel_homepage', homepageShowCallback);
  }
})