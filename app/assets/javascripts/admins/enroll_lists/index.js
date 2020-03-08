$(document).on('turbolinks:load', function() {
    if($('body.admins-enroll-lists-index-page').length > 0){
        var search_form = $(".search-form");
        //导出
        $(".competition-enroll-list-form").on("click","#enroll-lists-export",function () {
            window.location.href = "/admins/competitions/"+$(this).attr("data-competition-id")+"/enroll_lists/export.xlsx?" + search_form.serialize();
        });
    }
});