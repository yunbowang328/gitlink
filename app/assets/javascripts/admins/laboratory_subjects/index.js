$(document).on('turbolinks:load', function() {
  if ($('body.admins-laboratory-subjects-index-page').length > 0) {
    var $searchForm = $('.laboratory-subject-list-form .search-form');
    var laboratoryId = $('.laboratory-subject-list-container').data('id');

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
              url: '/admins/laboratories/' + laboratoryId + '/laboratory_subjects/' + laboratorySubjectId + url,
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

    // 添加实践课程功能
    var $addModal = $('.modal.admin-add-laboratory-subject-modal');
    var $addForm = $addModal.find('form.admin-add-laboratory-user-form');
    var $subjectSelect = $addForm.find('select.subject-select');

    $addModal.on('show.bs.modal', function(){
      $addModal.find('.error').html('');
      $subjectSelect.select2('val', ' ');
    });

    $subjectSelect.select2({
      theme: 'bootstrap4',
      placeholder: '请输入课程名称/创建者检索',
      multiple: false,
      closeOnSelect: true,
      ajax: {
        delay: 500,
        url: '/admins/laboratories/' + laboratoryId + '/subjects_for_select',
        dataType: 'json',
        data: function(params){
          return { keyword: params.term, page: params.page || 1, per_page: 20 }
        },
        processResults: function(data, params){
          params.page = params.page || 1;

          return {
            results: data.subjects,
            pagination: {
              more: (params.page * 20) < data.count
            }
          };
        }
      },
      templateResult: function (item) {
        if(!item.id || item.id === '') return item.text;
        var ele = '<span>';
        ele += '<span>' + item.name + '</span>';
        ele += '<span class="font-12"> -- ' + item.creator_name + '</span>';
        ele += '<span class="font-12"> -- ' + item.status_text+ '</span>';
        ele += '</span>';

        return $(ele);
      },
      templateSelection: function(item){
          if(!item.id || item.id === '') return item.text;
          var ele = '<span>' + (item.name || item.text) + '<span class="font-12"> -- ' + item.creator_name + '</span></span>';
          return $(ele);
      }
    });

    $addModal.on('click', '.submit-btn', function(){
      $addModal.find('.error').html('');

      var subjectIds = $subjectSelect.val();
      if (subjectIds && subjectIds.length > 0) {
        $.ajax({
          method: 'POST',
          dataType: 'json',
          url: '/admins/laboratories/' + laboratoryId + '/laboratory_subjects',
          data: { subject_id: subjectIds },
          success: function(){
            show_success_flash();
            window.location.reload();
          },
          error: function(res){
            $addModal.find('.error').html(res.responseJSON.message);
          }
        });
      } else {
        $addModal.find('.error').html('请选择课程');
      }
    });
  }
})