$(document).on('turbolinks:load', function() {
  if ($('body.admins-mirror-scripts-edit-page, body.admins-mirror-scripts-update-page, body.admins-mirror-scripts-new-page, body.admins-mirror-scripts-create-page').length > 0) {
    var $form = $('form.script-form');

    // codemirror编辑器
    var scriptEditor = CodeMirror.fromTextArea(document.getElementById('mirror_script_script'), {
      lineNumbers: true,
      mode: 'shell',
      theme: "default",
      indentUnit: 4, //代码缩进为一个tab的距离
      matchBrackets: true,
      autoRefresh: true,
      smartIndent: true,//智能换行
      styleActiveLine: true,
      lint: true
    });
    scriptEditor.setSize('auto', '600px');

    $form.validate({
      errorElement: 'span',
      errorClass: 'danger text-danger',
      rules: {
        "mirror_script[script_type]": {
          required: true
        }
      }
    });

    $form.submit(function(e){
      if(!$form.valid()){ e.preventDefault(); }
    });
  }
});