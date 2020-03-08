$(document).on('turbolinks:load', function() {
    if ($('body.cooperative-competitions-index-page').length > 0) {
        $('.modal.cooperative-upload-file-modal').on('upload:success', function(e, data){
            var $imageElement = $('.competition-image-' + data.source_id);
            $imageElement.attr('src', data.url);
            $imageElement.show();
            $imageElement.next().html('重新上传');
        });
    }

    $(".cooperative-competition-list-form").on("change", '.competitions-hot-select', function () {
        var s_value = $(this).get(0).checked ? 1 : 0;
        var json = {};
        json["hot"] = s_value;
        $.ajax({
            url: "/cooperative/competitions/hot_setting",
            type: "POST",
            dataType:'json',
            data: json,
            success: function(){
                $.notify({ message: '操作成功' });
            }
        });
    });

    // ============== 新增竞赛 ===============
    var $modal = $('.modal.cooperative-create-competition-modal');
    var $form = $modal.find('form.cooperative-create-competition-form');
    var $competitionNameInput = $form.find('input[name="competition_name"]');

    $form.validate({
        errorElement: 'span',
        errorClass: 'danger text-danger',
        rules: {
            competition_name: {
                required: true
            }
        }
    });

    // modal ready fire
    $modal.on('show.bs.modal', function () {
        $competitionNameInput.val('');
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
                    $.notify({ message: '创建成功' });
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

    // 导入学生
    var $importScoreModal = $('.modal.cooperative-import-competition-score-modal');
    var $importScoreForm = $importScoreModal.find('form.cooperative-import-competition-score-form');
    var $competitionIdInput = $importScoreForm.find('input[name="competition_id"]');

    $importScoreModal.on('show.bs.modal', function(event){
        resetFileInputFunc($importScoreModal.find('.upload-file-input'));
        $importScoreModal.find('.file-names').html('选择文件');
        $importScoreModal.find('.upload-file-input').trigger('click');

        var $link = $(event.relatedTarget);
        var competitionId = $link.data('competition-id');
        $competitionIdInput.val(competitionId);
    });

    $importScoreModal.on('change', '.upload-file-input', function(e){
        var file = $(this)[0].files[0];
        $importScoreModal.find('.file-names').html(file ? file.name : '请选择文件');
    });

    var importUserFormValid = function(){
        if($importScoreForm.find('input[name="file"]').val() == undefined || $importScoreForm.find('input[name="file"]').val().length == 0){
            $importScoreForm.find('.error').html('请选择文件');
            return false;
        }

        return true;
    };

    var buildResultMessage = function(data){
        var messageHtml = "<div>导入结果：成功" + data.success + "条，失败"+ data.fail.length + "条</div>";

        if(data.fail.length > 0){
            messageHtml += '<table class="table"><thead class="thead-light"><tr><th>数据</th><th>失败原因</th></tr></thead><tbody>';

            data.fail.forEach(function(item){
                messageHtml += '<tr><td>' + item.data + '</td><td>' + item.message + '</td></tr>';
            });

            messageHtml += '</tbody></table>'
        }

        return messageHtml;
    };

    $importScoreModal.on('click', '.submit-btn', function(){
        $importScoreForm.find('.error').html('');

        if (importUserFormValid()) {
            $('body').mLoading({ text: '正在导入...' });

            $.ajax({
                method: 'POST',
                dataType: 'json',
                url: '/cooperative/import_competition_scores',
                data: new FormData($importScoreForm[0]),
                processData: false,
                contentType: false,
                success: function(data){
                    $('body').mLoading('destroy');
                    $importScoreModal.modal('hide');

                    showMessageModal(buildResultMessage(data), function(){
                        window.location.reload();
                    });
                },
                error: function(res){
                    $('body').mLoading('destroy');
                    var data = res.responseJSON;
                    $importScoreForm.find('.error').html(data.message);
                }
            });
        }
    });
});

