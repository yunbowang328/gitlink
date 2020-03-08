
function show_add_manager(id) {
  $(".auth-schools-user-add").modal("show");

  $(".auth-schools-user-add").find("#school_id_input").val(id)
}