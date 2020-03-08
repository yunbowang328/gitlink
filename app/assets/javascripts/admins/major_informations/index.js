$(document).on('turbolinks:load', function() {
  if ($('body.admins-major-informations-index-page').length > 0) {
    var box_contain = $(".major-informations-list-container");
    box_contain.on("click",".collapse-item",function () {
      var a_fa = $(this).find("i");
      if(a_fa.hasClass("fa-caret-right")){
        a_fa.removeClass("fa-caret-right").addClass("fa-caret-down");
      }else{
        a_fa.removeClass("fa-caret-down").addClass("fa-caret-right");
      }
    });
  }
});