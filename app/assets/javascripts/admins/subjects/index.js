$(document).on('turbolinks:load', function () {
	if ($('body.admins-subjects-index-page').length > 0) {
		var $form = $('.subject-list-form');

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

		// 清空
		$form.on('click', '.clear-btn', function () {
			$form.find('select[name="status"]').val('');
			$form.find('.school-select').val('').trigger('change');
			$form.find('input[name="keyword"]').val('');
			$form.find('#homepage_show').attr('checked', false);
			$form.find('#excellent').attr('checked', false);
			$form.find('input[type="submit"]').trigger('click');
		});

		// 定义状态切换监听事件
		var defineStatusChangeFunc = function (doElement, undoElement, url, callback) {
			$('.subject-list-container').on('click', doElement, function () {
				var $doAction = $(this);
				var $undoAction = $doAction.siblings(undoElement);

				var subjectId = $doAction.data('id');
				customConfirm({
					content: '确认进行该操作吗？',
					ok: function () {
						$.ajax({
							url: '/admins/subjects/' + subjectId + url,
							method: 'POST',
							dataType: 'json',
							success: function () {
								show_success_flash();
								$doAction.hide();
								$undoAction.show();
								if (callback && typeof callback === "function") {
									callback(subjectId, url);
								}
							}
						});
					}
				});
			});
		}
		// 隐藏与取消隐藏
		defineStatusChangeFunc('.hide-action', '.active-action', '/hide');
		defineStatusChangeFunc('.active-action', '.hide-action', '/cancel_hide');

		// 首页展示与取消首页展示
		var homepageShowCallback = function (subjectId, url) {
			var $subjectItem = $('.subject-list-container').find('.subject-item-' + subjectId);

			if (url === '/homepage_show') {
				$subjectItem.find('.homepage-show-badge').show();
			} else {
				$subjectItem.find('.homepage-show-badge').hide();
			}
		}
		defineStatusChangeFunc('.homepage-show-action', '.homepage-hide-action', '/homepage_show', homepageShowCallback);
		defineStatusChangeFunc('.homepage-hide-action', '.homepage-show-action', '/cancel_homepage_show', homepageShowCallback);

		// 设为金课与取消金课
		var excellentCallback = function (subjectId, url) {
			var $subjectItem = $('.subject-list-container').find('.subject-item-' + subjectId);

			if (url === '/excellent') {
				$subjectItem.find('.excellent-badge').show();
			} else {
				$subjectItem.find('.excellent-badge').hide();
			}
		}
		defineStatusChangeFunc('.excellent-action', '.cancel-excellent-action', '/excellent', excellentCallback);
		defineStatusChangeFunc('.cancel-excellent-action', '.excellent-action', '/cancel_excellent', excellentCallback);
	}
});
