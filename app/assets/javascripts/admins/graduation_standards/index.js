$(document).on('turbolinks:load', function() {
  if($(".admins-graduation-standards-index-page").length > 0){
    $(".admin-body-container").on("click", ".standard-create-modal", function () {
      var content = $(this).attr("data-content");
      var g_id = $(this).attr("data-id");
      var g_msg = $(this).attr("data-msg");

      $("#graduation-modal-type").html(g_msg);
      $("#graduation_standard_id").val(g_id);
      $("textarea[name='content']").val(content);
    })
  }
});