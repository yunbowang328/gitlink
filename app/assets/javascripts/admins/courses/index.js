$(document).on('turbolinks:load', function() {
  if ($('body.admins-courses-index-page').length > 0) {
    let searchContainer = $(".course-list-form");
    let searchForm = $("form.search-form",searchContainer);

    searchContainer.on('change', '.course-homepage-show', function(){
      searchForm.find('input[type="submit"]').trigger('click');
    });

    //导出
    searchContainer.on('click', "#course-export", function () {
      window.location.href = "/admins/courses.xlsx?" + searchForm.serialize();
    });

   $(".course-list-container").on("change", '.course-setting-form', function () {
     var s_id = $(this).attr("data-id");
     var s_value = $(this).val();
     var s_name = $(this).attr("name");
     var json = {};
     json[s_name] = s_value;
     $.ajax({
       url: "/admins/courses/" + s_id,
       type: "PUT",
       dataType:'script',
       data: json
     });
   });

      // 清空
      searchForm.on('click', '.clear-btn', function () {
          searchForm.find('select[name="status"]').val('');
          searchForm.find('.school-select').val('').trigger('change');
          searchForm.find('input[name="keyword"]').val('');
          searchForm.find('#homepage_show').attr('checked', false);
          searchForm.find('input[type="submit"]').trigger('click');
      });

  // ************** 学校选择 *************
  searchForm.find('.school-select').select2({
      theme: 'bootstrap4',
      placeholder: '请选择单位',
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
  }
});

