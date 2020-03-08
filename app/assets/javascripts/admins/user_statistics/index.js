$(document).on('turbolinks:load', function() {
  if ($('body.admins-user-statistics-index-page').length > 0) {
    var $form = $('.user-statistic-list-form');

    // ************** 学校选择 *************
    var matcherFunc = function(params, data){
      if ($.trim(params.term) === '') {
        return data;
      }
      if (typeof data.text === 'undefined') {
        return null;
      }

      if (data.name && data.name.indexOf(params.term) > -1) {
        var modifiedData = $.extend({}, data, true);
        return modifiedData;
      }

      // Return `null` if the term should not be displayed
      return null;
    }

    var defineSchoolSelect = function (schools) {
      $form.find('.school-select').select2({
        theme: 'bootstrap4',
        placeholder: '选择学校/单位',
        minimumInputLength: 1,
        data: schools,
        templateResult: function (item) {
          if(!item.id || item.id === '') return item.text;
          return item.name;
        },
        templateSelection: function(item){
          if (item.id) {
            $form.find('#school_id').val(item.id);
          }
          return item.name || item.text;
        },
        matcher: matcherFunc
      });
    };


    // 初始化学校选择器
    $.ajax({
      url: '/api/schools/for_option.json',
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        defineSchoolSelect(data.schools);
      }
    });

    // 清空
    $form.on('click', '.clear-btn', function(){
      $form.find('select[name="date"]').val('');
      $form.find('.school-select').val('').trigger('change');
      $form.find('input[type="submit"]').trigger('click');
    })


    // 导出
    $('.export-action').on('click', function(){
      var form = $(".user-statistic-list-form .search-form")
      var exportLink = $(this);
      var date = form.find("select[name='date']").val();
      var schoolId = form.find('input[name="school_id"]').val();

      var url = exportLink.data("url").split('?')[0] + "?date=" + date + "&school_id=" + schoolId;
      window.open(url);
    });
  }
});