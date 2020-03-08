$(document).on('turbolinks:load', function () {
    if ($('body.admins-tag-disciplines-index-page').length > 0) {

        // ============== 新建 ===============
        var $modal = $('.modal.admin-create-tag-discipline-modal');
        var $form = $modal.find('form.admin-create-tag-discipline-form');
        var $nameInput = $form.find('input[name="name"]');

        $form.validate({
            errorElement: 'span',
            errorClass: 'danger text-danger',
            rules: {
                name: {
                    required: true
                }
            }
        });

        // modal ready fire
        $modal.on('show.bs.modal', function () {
            $nameInput.val('');
        });

        $modal.on('click', '.submit-btn', submit_create_form);

        $nameInput.keydown(function (e) {
            var ev = e || event;
            var keycode = ev.which || ev.keyCode;
            if (keycode == 13) {
                submit_create_form();
                return false;
            }
        });

        function submit_create_form() {
            $form.find('.error').html('');

            if ($form.valid()) {
                var url = $form.data('url');

                $.ajax({
                    method: 'POST',
                    dataType: 'json',
                    url: url,
                    data: $form.serialize(),
                    success: function () {
                        $.notify({message: '创建成功'});
                        $modal.modal('hide');

                        setTimeout(function () {
                            window.location.reload();
                        }, 500);
                    },
                    error: function (res) {
                        var data = res.responseJSON;
                        $form.find('.error').html(data.message);
                    }
                });
            }
        }

        $(".tag-discipline-list-container").on("change", '.tag-discipline-source-form', function () {
            var s_id = $(this).attr("data-id");
            var s_value = $(this).val();
            var s_name = $(this).attr("name");
            var json = {};
            json[s_name] = s_value;
            $.ajax({
                url: "/admins/tag_disciplines/" + s_id,
                type: "PUT",
                dataType: 'script',
                data: json
            });
        });

        // ------------ 上移/下移 -------------
        $('.tag-discipline-list-container').on('click', ".move-action", function () {
            var $doAction = $(this);

            var objectId = $doAction.data('id');
            var opr = $doAction.data('opr');
            $.ajax({
                url: '/admins/tag_disciplines/' + objectId + '/adjust_position',
                method: 'POST',
                dataType: 'script',
                data: {opr: opr}
            });
        });
    }
});