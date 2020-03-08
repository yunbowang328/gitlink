$(document).on('turbolinks:load', function(){
  if ($('body.admins-school-statistics-index-page').length > 0) {
    var searchForm = $(".school-statistic-list-form .search-form");
    var growFormUrl = searchForm.data('grow-form-url');
    var contrastFormUrl = searchForm.data('contrast-form-url');

    var dataTypeInput = searchForm.find("input[name='data_type']");
    var keywordInput = searchForm.find("input[name='keyword']");
    var contrastBtn = searchForm.find(".contrast-btn");
    var growBtn = searchForm.find(".grow-btn");
    var contrastDateContainer = searchForm.find('.contrast-date-container');
    var growDateContainer = searchForm.find('.grow-date-container');

    // 数据对比日期输入框
    var beginDateInput = searchForm.find("input[name='begin_date']");
    var endDateInput = searchForm.find("input[name='end_date']");
    var otherBeginDateInput = searchForm.find("input[name='other_begin_date']");
    var otherEndDateInput = searchForm.find("input[name='other_end_date']");

    // 新增数据日期输入框
    var growBeginDateInput = searchForm.find("input[name='grow_begin_date']");
    var growEndDateInput = searchForm.find("input[name='grow_end_date']");

    // 数据展示切换: 数据对比、新增数据
    searchForm.on('click', ".contrast-btn", function(){
      if(contrastBtn.hasClass("active")) { return }
      changeDataType("contrast");
      submitForm();
    });
    searchForm.on('click', ".grow-btn", function(){
      if(growBtn.hasClass("active")) { return }
      changeDataType("grow");
      submitForm();
    });

    // 搜索按钮
    searchForm.on('click', ".search-btn", function(){
      console.log('submit');
      submitForm();
    });

    $('.school-statistic-list-container').on('change', '.contrast-column-select', function() {
      searchForm.find("input[name='contrast_column']").val($('.contrast-column-select').val());
      submitForm();
    });

    var submitForm = function(){
      if(!validateFrom()) { return }

      var form = searchForm;
      var url = dataTypeInput.val() == "contrast" ? contrastFormUrl : growFormUrl;

      $.ajax({
        url: url,
        data: form.serialize(),
        dataType: "script"
      })
    };

    var validateFrom = function(){
      if (dataTypeInput.val() != "contrast") { return true; }

      // 全部为空时，需要展示空数据页
      if (beginDateInput.val() == "" && endDateInput.val() == "" &&
        otherBeginDateInput.val() == "" && otherBeginDateInput.val() == "") {
        return true;
      }

      if (beginDateInput.val() != "" && endDateInput.val() != "" &&
        otherBeginDateInput.val() != "" && otherBeginDateInput.val() != "") {
        return true;
      }

      return false;
    };

    var changeDataType = function(dataType){
      if (dataTypeInput.val() == dataType) { return }

      if (dataType == "contrast") {
        contrastBtn.addClass("active");
        growBtn.removeClass("active");
        dataTypeInput.val('contrast');
        growDateContainer.hide();
        contrastDateContainer.show();

        clearGrowDateInput();
      } else {
        contrastBtn.removeClass("active");
        growBtn.addClass("active");
        dataTypeInput.val('grow');
        growDateContainer.show();
        contrastDateContainer.hide();

        clearContrastDateInput();
      }
    };

    var clearGrowDateInput = function() {
      searchForm.find("input[name='grow_begin_date']").val('');
      searchForm.find("input[name='grow_end_date']").val('');
      searchForm.find("input[name='grow_date_input']").val('');
    };

    var clearContrastDateInput = function(){
      searchForm.find("input[name='begin_date']").val('');
      searchForm.find("input[name='end_date']").val('');
      searchForm.find("input[name='other_begin_date']").val('');
      searchForm.find("input[name='other_end_date']").val('');
      searchForm.find("input[name='date_input']").val('');
      searchForm.find("input[name='other_date_input']").val('');
    };

    var baseOptions = {
      autoclose: true,
      language: 'zh-CN',
      format: 'yyyy-mm-dd',
      startDate: '2017-04-01',
      endDate: '-1d'
    }

    var defineDateRangeSelect = function(element){
      var options = $.extend({inputs: $(element).find('.start-date, .end-date')}, baseOptions);
      $(element).datepicker(options);

      $(element).find('.start-date').datepicker().on('changeDate', function(e){
        $(element).find('.end-date').datepicker('setStartDate', e.date);
      })
    };

    defineDateRangeSelect('.grow-date-input-daterange');
    defineDateRangeSelect('.date-input-daterange');
    defineDateRangeSelect('.other-date-input-daterange');
  }
})