$(document).on('turbolinks:load', function(){
    if ($('body.admins-shixun-feedback-messages-index-page').length > 0) {

        $(".content-img img").addClass("w-20").addClass("preview-image");

        var baseOptions = {
            autoclose: true,
            language: 'zh-CN',
            format: 'yyyy-mm-dd 00:00:00',
            startDate: '2017-04-01'
        };

        var defineDateRangeSelect = function(element){
            var options = $.extend({inputs: $(element).find('.start-date, .end-date')}, baseOptions);
            $(element).datepicker(options);

            $(element).find('.start-date').datepicker().on('changeDate', function(e){
                $(element).find('.end-date').datepicker('setStartDate', e.date);
            });
        };

        defineDateRangeSelect('.grow-date-input-daterange');
    }
});