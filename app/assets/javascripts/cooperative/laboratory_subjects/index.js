$(document).on('turbolinks:load', function() {
  if ($('body.cooperative-laboratory-subjects-index-page').length > 0) {
    var $searchForm = $('.laboratory-subject-list-form .search-form');

    // ************** 学校选择 *************
    $searchForm.find('.school-select').select2({
      theme: 'bootstrap4',
      placeholder: '请选择创建者单位',
      allowClear: true,
      minimumInputLength: 1,
      ajax: {
        delay: 500,
        url: '/api/schools/search.json',
        dataType: 'json',
        data: function (params) {
          return {keyword: params.term};
        },
        processResults: function (data) {
          return {results: data.schools}
        }
      },
      templateResult: function (item) {
        if (!item.id || item.id === '') return item.text;
        return item.name;
      },
      templateSelection: function (item) {
        if (item.id) {
        }
        return item.name || item.text;
      }
    });

    // 上传图片
    $('.modal.cooperative-upload-file-modal').on('upload:success', function (e, data) {
      var $imageElement = $('.subject-image-' + data.source_id);
      if($imageElement.length === 0) return;
      $imageElement.attr('src', data.url);
      $imageElement.show();
      $imageElement.next().html('重新上传');
    });

    // 定义状态切换监听事件
    var defineStatusChangeFunc = function (doElement, undoElement, url, callback) {
      $('.laboratory-subject-list-container').on('click', doElement, function () {
        var $doAction = $(this);
        var $undoAction = $doAction.siblings(undoElement);

        var laboratorySubjectId = $doAction.data('id');
        customConfirm({
          content: '确认进行该操作吗？',
          ok: function () {
            $.ajax({
              url: '/cooperative/laboratory_subjects/' + laboratorySubjectId + url,
              method: 'POST',
              dataType: 'json',
              success: function () {
                show_success_flash();
                $doAction.hide();
                $undoAction.show();
                if (callback && typeof callback === "function") {
                  callback(laboratorySubjectId, url);
                }
              }
            });
          }
        });
      });
    }

    // 首页展示与取消首页展示
    var homepageShowCallback = function (laboratoryShixunId, url) {
      var $laboratoryShixunItem = $('.laboratory-subject-list-container').find('.laboratory-subject-item-' + laboratoryShixunId);

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