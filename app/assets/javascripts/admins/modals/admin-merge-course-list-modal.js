$(document).on('turbolinks:load', function() {
  var $modal = $('.modal.admin-merge-course-list-modal');
  if ($modal.length > 0) {
    var $form = $modal.find('form.admin-merge-course-list-form');
    var $originCourseListIdInput = $form.find('input[name="origin_course_list_id"]');

    $form.validate({
      errorElement: 'span',
      errorClass: 'danger text-danger',
      rules: {
          course_list_name: {
          required: true
        }
      },
      messages: {
          course_list_name: {
          required: '请输入课程名称'
        }
      }
    });

    // modal ready fire
    $modal.on('show.bs.modal', function (event) {
      var $link = $(event.relatedTarget);

      var couresListId = $link.data('courseListId');
      var url = $link.data('url');

      $originCourseListIdInput.val(couresListId);
      $form.data('url', url);
    });

    $modal.on('click', '.submit-btn', function(){
      $form.find('.error').html('');

      if ($form.valid()) {
        var url = $form.data('url');

        $.ajax({
          method: 'POST',
          dataType: 'json',
          url: url,
          data: $form.serialize(),
          success: function(){
            $.notify({ message: '操作成功' });
            $modal.modal('hide');

            setTimeout(function(){
              window.location.reload();
            }, 500);
          },
          error: function(res){
            var data = res.responseJSON;
            $form.find('.error').html(data.message);
          }
        });
      }
    });
  }
});