$(document).on('turbolinks:load', function () {
	if ($('body.admins-subject-settings-index-page').length > 0) {
		var $form = $('.subject-setting-list-form');

		// ************** 学校选择 *************
		$form.find('.school-select').select2({
			theme: 'bootstrap4',
			placeholder: '请选择创建者单位',
			minimumInputLength: 1,
			ajax: {
				delay: 500,
				url: '/api/schools/search.json',
				dataType: 'json',
				data: function (params) {
					return {keyword: params.term};
				},
				processResults: function (data) {
					return {results: data.schools}
				}
			},
			templateResult: function (item) {
				if (!item.id || item.id === '') return item.text;
				return item.name;
			},
			templateSelection: function (item) {
				if (item.id) {
				}
				return item.name || item.text;
			}
		});


        $(".subject-setting-list-container").on("change", '.subject-setting-form', function () {
            var s_id = $(this).attr("data-id");
            var s_value = $(this).val();
            var s_name = $(this).attr("name");
            var json = {};
            json[s_name] = s_value;
            $.ajax({
                url: "/admins/subject_settings/" + s_id,
                type: "PUT",
                dataType:'script',
                data: json
            })
        });

		// 清空
		$form.on('click', '.clear-btn', function () {
			$form.find('select[name="status"]').val('');
			$form.find('.school-select').val('').trigger('change');
			$form.find('input[name="keyword"]').val('');
			$form.find('#homepage_show').attr('checked', false);
			$form.find('#excellent').attr('checked', false);
			$form.find('input[type="submit"]').trigger('click');
		});

		// 上传图片
		$('.modal.admin-upload-file-modal').on('upload:success', function (e, data) {
            if(data.suffix == '_qrcode'){
                var $imageElement = $('.subject-weapp-image-' + data.source_id);
                $imageElement.attr('src', data.url);
                $imageElement.show();
                $imageElement.next().html('重新上传');
            } else {
                var $imageElement = $('.subject-image-' + data.source_id);
                $imageElement.attr('src', data.url);
                $imageElement.show();
                $imageElement.next().html('重新上传');
            }
		});
	}
});
