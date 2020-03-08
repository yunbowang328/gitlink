$(document).on('turbolinks:load', function() {
  if ($('body.admins-ec-templates-index-page').length > 0) {
    var add_modal = $(".ec-templates-new-add");
    var template_file_name = add_modal.find(".template-file-upload");
    var attachment_id_input = add_modal.find(".template_attachment_id");
    var template_container = $(".ec-templates-list-container");

    //编辑附件
    template_container.on("click", ".edit-template-content", function () {
      var t_id = $(this).attr("data-id");
      var t_name = $(this).attr("data-name");
      var template_name = $(this).attr("data-template-name");
      var t_msg = $(this).attr("data-msg");
      var template_id = $(this).attr("data-template-id");
      add_modal.modal("show");
      add_modal.find(".template_add_title").html(t_msg);
      attachment_id_input.val(template_id);
      add_modal.find(".template_show_id").val(t_id);
      add_modal.find("input[name='name']").val(t_name);
      add_modal.find("i.delete-template-icon").attr("data-id", template_id);
      if(template_id !== "-1"){
        template_file_name.find("span.template-file-input").hide();
        template_file_name.find("span.template_file_show").show();
        template_file_name.find("span.template_file_show_title").html(template_name);
      }
    });


    //删除附件
    add_modal.on("click",".delete-template-icon",function () {
      var attachment_id = $(this).attr("data-id");
      $.ajax({
        url: "/api/attachments/" + attachment_id,
        type: "delete",
        contentType:"application/json",
        dataType:"json",
        success: function (data) {
          template_file_name.find("span.template-file-input").show();
          template_file_name.find("span.template_file_show").hide();
          attachment_id_input.attr("value","-1")
        }
      })
    });

    //上传附件
    add_modal.on("change", "#upload_template_file",function () {

      var template = document.getElementById('upload_template_file').files[0];

      var file_content = new FormData();

      file_content.append("file", template);

      $.ajax({
        type: "POST",
        url: "/api/attachments",
        data:file_content,
        contentType: false,
        processData: false,
        success: function (data) {
          template_file_name.find("span.template-file-input").hide();
          template_file_name.find("span.template_file_show").show();
          template_file_name.find("span.template_file_show_title").html(template.name);
          template_file_name.find("i.delete-template-icon").attr("data-id",data.id);
          attachment_id_input.val(data.id)
        }
      })
    })
  }
});
