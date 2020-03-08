$(document).on('turbolinks:load', function() {
  if ($('body.admins-users-edit-page, body.admins-users-update-page').length > 0) {
    var initDepartmentSelect = true;

    // ************** 学校选择 *************
    var matcherFunc = function(params, data){
      if ($.trim(params.term) === '') {
        return data;
      }
      if (typeof data.text === 'undefined') {
        return null;
      }

      if (data.name && data.name.indexOf(params.term) > -1) {
        var modifiedData = $.extend({}, data, true);
        return modifiedData;
      }

      // Return `null` if the term should not be displayed
      return null;
    }

    var defineSchoolSelect = function (schools) {
      $('.school-select').select2({
        theme: 'bootstrap4',
        placeholder: '查询学校/单位',
        minimumInputLength: 1,
        data: schools,
        templateResult: function (item) {
          if(!item.id || item.id === '') return item.text;
          return item.name;
        },
        templateSelection: function(item){
          if (item.id) {
            $('#user_school_id').val(item.id);
            getDepartmentsData(item.id, defineDepartmentSelect2);
          }
          return item.name || item.text;
        },
        matcher: matcherFunc
      });
    };

    var defineDepartmentSelect2 = function(departments){
      departments.unshift({ id: '-1', name: '未选择' }); // 可不选

      if (!initDepartmentSelect) { $('.department-select').empty(); } // 为了能够回填部门
      initDepartmentSelect = false;

      $('.department-select').select2({
        theme: 'bootstrap4',
        placeholder: '查询学院/部门',
        minimumInputLength: 0,
        data: departments,
        templateResult: function (item) {
          if(!item.id || item.id === '') return item.text;
          return item.name;
        },
        templateSelection: function(item){
          if (item.id) {
            $('#user_department_id').val(item.id);
          }
          return item.name || item.text;
        },
        matcher: matcherFunc
      });
    };

    var getDepartmentsData = function(school_id, callback){
      $.ajax({
        url: '/api/schools/' + school_id + '/departments/for_option.json',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
          callback(data.departments);
        }
      })
    }

    // 初始化学校选择器
    $.ajax({
      url: '/api/schools/for_option.json',
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        defineSchoolSelect(data.schools);
      }
    });

    // **************** 地区选择 ****************
    $('.province-city-select').cxSelect({
      url: '/javascripts/educoder/province-data.json',
      selects: ['province-select', 'city-select']
    });

    // *********** 职业选择 ************
    var identityData = [
      {
        "v": "teacher",
        "n": "教师",
        "s": [{"n": "教授", "v": "教授"},{"n": "副教授", "v": "副教授"},{"n": "讲师", "v": "讲师"},{"n": "助教", "v": "助教"}]
      },
      {
        "v": "student",
        "n": "学生",
        "s": []
      },
      {
        "v": "professional",
        "n": "专业人士",
        "s": [{"n": "企业管理者", "v": "企业管理者"},{"n": "部门管理者", "v": "部门管理者"},{"n": "高级工程师", "v": "高级工程师"},{"n": "工程师", "v": "工程师"},{"n": "助理工程师", "v": "助理工程师"}]
      }
    ];
    $('.user-identity-select').cxSelect({
      data: identityData,
      jsonValue: 'v',
      selects: ['identity-select', 'technical-title-select']
    });
    $('.identity-select').on('change', function(){
      if($(this).val() === 'student'){
        $('.technical-title-select-wrapper').hide();
        $('.form-group.user_student_id').show();
      } else {
        $('.technical-title-select-wrapper').show();
        $('.form-group.user_student_id').hide();
      }
    })


    var $form = $('form.edit_user')
    $form.validate({
      errorElement: 'span',
      errorClass: 'danger text-danger',
      rules: {
        "user[password]": {
          required: false,
          minlength: 5
        },
        "user[password_confirmation]": {
          required: false,
          minlength: 5,
          equalTo: "#user_password"
        },
      },
      messages: {
        "user[password_confirmation]": {
          equalTo: "两次密码输入不一致"
        }
      }
    })

    $form.submit(function(e){
      if(!$form.valid()){ e.preventDefault(); }
    })
  }
});