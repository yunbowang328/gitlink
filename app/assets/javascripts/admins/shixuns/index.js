$(document).on('turbolinks:load', function() {
  if($('body.admins-shixuns-index-page').length > 0){
    $('select#tag-choosed').select2({
      placeholder: "请选择分类",
      allowClear: true
    });

    var search_form = $(".search-form");
    //导出
    $(".shixuns-list-form").on("click","#shixuns-export",function () {
      window.location.href = "/admins/shixuns.xls?" + search_form.serialize();
    });
  }
});