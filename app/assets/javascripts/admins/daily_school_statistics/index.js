$(document).on('turbolinks:load', function(){
  if ($('body.admins-daily-school-statistics-index-page').length > 0) {
    $('.export-action').on('click', function(){
      var form = $(".daily-school-statistic-list-form .search-form")
      var exportLink = $(this);
      var keyword = form.find("input[name='keyword']").val();

      var url = exportLink.data("url").split('?')[0] + "?keyword=" + keyword;
      window.open(url);
    });
  }
})