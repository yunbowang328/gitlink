$(document).on('turbolinks:load', function () {
    $('.admin-modal-container').on('show.bs.modal', '.modal.admin-edit-discipline-modal', function () {
        var $modal = $('.modal.admin-edit-discipline-modal');
        var $form = $modal.find('form.admin-edit-discipline-form');

        $form.validate({
            errorElement: 'span',
            errorClass: 'danger text-danger',
            rules: {
                'discipline[name]': {
                    required: true,
                    maxlength: 20
                }
            }
        });

        $modal.on('click', '.submit-btn', submit_edit_form);

        $form.find("#discipline_name").keydown(function (e) {
            var ev = e || event;
            var keycode = ev.which || ev.keyCode;
            if (keycode == 13) {
                submit_edit_form();
                return false;
            }
        });

        function submit_edit_form() {
            $form.find('.error').html('');
            var url = $form.attr('action');

            if ($form.valid()) {
                $.ajax({
                    method: 'PATCH',
                    dataType: 'script',
                    url: url,
                    data: $form.serialize()
                });
            }
        }
    });
});