$(document).on('turbolinks:load', function() {
  if ($('body.admins-shixun-settings-index-page').length > 0) {
    let searchContainer = $(".shixun-settings-list-form");
    let searchForm = $("form.search-form",searchContainer);

    searchContainer.on('change', '.shixun-settings-select', function(){
      searchForm.find('input[type="submit"]').trigger('click');
    });

    //导出
    searchContainer.on('click',"#shixun-settings-export",function () {
      window.location.href = "/admins/shixun_settings.xls?" + searchForm.serialize();
    });

    // 基础数据导出
      searchContainer.on('click', "#shixun-settings-base-export", function () {
          window.location.href = "/admins/shixun_settings.xls?base_data=1" + searchForm.serialize();
      });

   $(".shixun-settings-list-container").on("change", '.shixun-setting-form', function () {
     var s_id = $(this).attr("data-id");
     var s_value = $(this).val();
     var s_name = $(this).attr("name");
     var json = {};
     var s_index = $(this).parent("td").siblings(".shixun-line-no").text();
     json[s_name] = s_value;
     json["page_no"] = s_index;
     $.ajax({
       url: "/admins/shixun_settings/" + s_id,
       type: "PUT",
       dataType:'script',
       data: json
     });
   });

      $(".shixun-settings-list-container").on("change", '.repertoire-setting-form', function () {
          var s_id = $(this).attr("data-id");
          var s_value = $(this).val();
          var s_name = $(this).attr("name");
          var json = {};
          json[s_name] = s_value;
          $.ajax({
              url: "/admins/shixun_settings/" + s_id + "/update_tag_repertoires",
              type: "POST",
              dataType:'script',
              data: json
          });
      });

   $("select#settings-tag-choosed").select2({
     placeholder: "请选择分类",
     allowClear: true
   });

    $('.modal.admin-upload-file-modal').on('upload:success', function(e, data){
      if(data.suffix == '_weapp'){
        var $imageElement = $('.shixun-weapp-image-' + data.source_id);
        $imageElement.attr('src', data.url);
        $imageElement.show();
        $imageElement.next().html('重新上传');
      } else {
        var $imageElement = $('.shixun-image-' + data.source_id);
        $imageElement.attr('src', data.url);
        $imageElement.show();
        $imageElement.next().html('重新上传');
      }
    })
  }
});

