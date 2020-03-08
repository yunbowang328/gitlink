$(document).on('turbolinks:load', function () {
	$('.admin-modal-container').on('show.bs.modal', '.modal.admin-edit-subject-modal', function () {
		var $modal = $('.modal.admin-edit-subject-modal');
		var $form = $modal.find('form.admin-edit-subject-form');

		$modal.on('click', '.submit-btn', function () {
			$form.find('.error').html('');
			var url = $form.attr('action');

			$.ajax({
				method: 'PATCH',
				dataType: 'script',
				url: url,
				data: $form.serialize()
			});
		});
	})
});
