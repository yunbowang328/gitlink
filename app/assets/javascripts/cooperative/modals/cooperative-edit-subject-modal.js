$(document).on('turbolinks:load', function () {
	$('.cooperative-modal-container').on('show.bs.modal', '.modal.cooperative-edit-subject-modal', function () {
		var $modal = $('.modal.cooperative-edit-subject-modal');
		var $form = $modal.find('form.cooperative-edit-subject-form');

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
