$(document).on('turbolinks:load', function() {
  if ($('body.admins-laboratory-shixuns-index-page').length > 0) {
    var $searchForm = $('.laboratory-shixun-list-form .search-form');
    var laboratoryId = $('.laboratory-shixun-list-container').data('id');

    $searchForm.find('select#tag_id').select2({
      placeholder: "请选择",
      allowClear: true
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
              url: '/admins/laboratories/' + laboratoryId + '/laboratory_shixuns/' + laboratoryShixunId + url,
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

    // 添加实训功能
    var $addModal = $('.modal.admin-add-laboratory-shixun-modal');
    var $addForm = $addModal.find('form.admin-add-laboratory-user-form');
    var $shixunSelect = $addForm.find('select.shixun-select');

    $addModal.on('show.bs.modal', function(){
      $addModal.find('.error').html('');
      $shixunSelect.select2('val', ' ');
    });

    $shixunSelect.select2({
      theme: 'bootstrap4',
      placeholder: '请输入实训名称/创建者检索',
      multiple: true,
      closeOnSelect: false,
      ajax: {
        delay: 500,
        url: '/admins/laboratories/' + laboratoryId + '/shixuns_for_select',
        dataType: 'json',
        data: function(params){
          return { keyword: params.term, page: params.page || 1, per_page: 20 };
        },
        processResults: function(data, params){
          params.page = params.page || 1;

          return {
            results: data.shixuns,
            pagination: {
              more: (params.page * 20) < data.count
            }
          };
        }
      },
      templateResult: function (item) {
        if(!item.id || item.id === '') return item.text;
        var ele = '<span>'
        ele += '<span>' + item.name + '</span>';
        ele += '<span class="font-12"> -- ' + item.creator_name + '</span>';
        ele += '<span class="font-12"> -- ' + item.status_text+ '</span>';
        ele += '</span>';

        return $(ele);
      },
      templateSelection: function(item){
        if (item.id) {
        }
        var ele = '<span>' + (item.name || item.text) + '<span class="font-12"> -- ' + item.creator_name + '</span></span>'
        return $(ele);
      }
    });

    $addModal.on('click', '.submit-btn', function(){
      $addModal.find('.error').html('');

      var shixunIds = $shixunSelect.val();
      if (shixunIds && shixunIds.length > 0) {
        $.ajax({
          method: 'POST',
          dataType: 'json',
          url: '/admins/laboratories/' + laboratoryId + '/laboratory_shixuns',
          data: { shixun_ids: shixunIds },
          success: function(){
            show_success_flash();
            window.location.reload();
          },
          error: function(res){
            $addModal.find('.error').html(res.responseJSON.message);
          }
        });
      } else {
        $addModal.find('.error').html('请选择实训');
      }
    });
  }
})