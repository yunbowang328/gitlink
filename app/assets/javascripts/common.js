function createMDEditor(element, opts){
  var defaults = {
    height: 600,
    path: '/editormd/lib/',
    syncScrolling: "single",
    tex: true,
    tocm: true,
    emoji: true,
    taskList: true,
    codeFold: true,
    searchReplace: true,
    htmlDecode: "style,script,iframe",
    sequenceDiagram: true,
    autoFocus: false,
    toolbarIcons: function () {
      // Or return editormd.toolbarModes[name]; // full, simple, mini
      // Using "||" set icons align right.
      return ["bold", "italic", "|", "list-ul", "list-ol", "|", "code", "code-block", "|", "image", "table", '|', "watch", "clear"]
    },
    //这个配置在simple.html中并没有，但是为了能够提交表单，使用这个配置可以让构造出来的HTML代码直接在第二个隐藏的textarea域中，方便post提交表单。
    saveHTMLToTextarea: true,
    dialogMaskOpacity: 0.6,
    imageUpload: true,
    imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp", "JPG", "JPEG", "GIF", "PNG", "BMP", "WEBP"],
    imageUploadURL: '/api/attachments.json'
  }
  var options = $.extend({}, defaults, opts);

  return editormd(element, options);
}

function ajaxErrorNotifyHandler(res) {
  var message = '';
  if(res.status !== 500){
    message = res.responseJSON.message;
  } else {
    message = '系统错误';
  }
  return $.notify({message: message}, {type: 'danger'});
}

function resetFileInputFunc(file){
  file.after(file.clone().val(""));
  file.remove();
}

function customConfirm(opts){
  var okCallback = opts.ok;
  var cancelCallback = opts.cancel;

  var defaultOpts = {
    title: '提示',
    buttons: {
      ok: {
        text: '确认',
        btnClass: 'btn btn-primary',
        action: okCallback
      },
      cancel: {
        text: '取消',
        btnClass: 'btn btn-secondary',
        action: cancelCallback
      },
    }
  }
  return $.confirm($.extend({}, defaultOpts, opts))
}

function customLoading(opts) {
  var loading;
  var defaultOpts = {
    content: opts.ajax,
    contentLoaded: function(){
      setTimeout(function(){
        loading.close()
      }, 200);
    }
  }
  loading = $.confirm($.extend({}, defaultOpts, opts));
  return loading;
}

function show_success_flash(message){
  $.notify({
		message: message || '操作成功'
  },{
    type: 'success'
  });
}

function showSuccessFlash(message){
  $.notify({
		message: message || '操作成功'
  },{
    type: 'success'
  });
}

function showErrorNotify(message){
  $.notify({
    message: message || '操作失败'
  },{
    type: 'danger'
  });
}
