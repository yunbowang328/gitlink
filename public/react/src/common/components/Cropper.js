import React, { Component } from 'react';

import { getUrl2, isDev } from 'educoder'
const $ = window.$

let _url_origin = getUrl2()
// let _url_origin = `http://47.96.87.25:48080`;



function save_avatar(){        
        
    // if($(img_lg).html().trim() == ""){            
        // $("#avatar-name").html("请先选择图片上传").css("color", 'red');        
    // } else {            
        // $("#avatar-name").html("").css("color", '#333');    
        const previewId = this.props.previewId
        var img_lg = document.getElementById(previewId || 'img-preview');           
        // 截图小的显示框内的内容          
        window.html2canvas(img_lg).then(function(canvas) {
            // for test
            // document.getElementById('canvasWrap').appendChild(canvas);

            var dataUrl = canvas.toDataURL("image/jpeg");    
            console.log(dataUrl)   
            // TODO upload base64 image data to server
        });  
        return

        // 老版接口：
        // html2canvas(img_lg, {               
        //     allowTaint: true,                
        //     taintTest: false,                
        //     onrendered: function(canvas) {                    
        //         canvas.id = "mycanvas";                    
        //         //生成base64图片数据                    
        //         var dataUrl = canvas.toDataURL("image/jpeg");    
        //         console.log(dataUrl)   

        //         var newImg = document.getElementById("showImg");                    
        //         newImg.src = dataUrl;    
        //         return;   

        //         imagesAjax(dataUrl);                    
        //         $(".avatar-save").attr("disabled","true");                
        //     }            
        // });       
    // }    
}   
/** 
    props 说明：
    imageId 源图片标签的id
    previewId crop后预览dom的id
    imageSrc 源图片src
    width  数字格式
    height 数字格式 
*/ 
class Cropper extends Component {
  state = {
  };

  handleChange = (info) => {
  }

  componentDidMount() {
      this.options = {
        aspectRatio: 1,
        crop(event) {
            // console.log(event.detail.x);
            // console.log(event.detail.y);
            // console.log(event.detail.width);
            // console.log(event.detail.height);
            // console.log(event.detail.rotate);
            // console.log(event.detail.scaleX);
            // console.log(event.detail.scaleY);
        },
        preview: this.props.previewId ? `#${this.props.previewId}` : '.img-preview',
      }

      if (!window.Cropper) {
        $.ajaxSetup({
            cache: true
        });
        const _isDev = isDev()
        let _path = _isDev ? 'public' : 'build'

        $('head').append($('<link rel="stylesheet" type="text/css" />')
            .attr('href', `${_url_origin}/react/${_path}/js/cropper/cropper.min.css`));

        $.getScript(
          `${_url_origin}/react/${_path}/js/cropper/cropper.js`,
          (data, textStatus, jqxhr) => {
          
        });
        $.getScript(
          `${_url_origin}/react/${_path}/js/cropper/html2canvas.min.js`,
          (data, textStatus, jqxhr) => {
          
        });
      }

      setTimeout(() => {
        const image = document.getElementById(this.props.imageId || '__image');
        this.cropper = new window.Cropper(image, this.options);
      }, 1200)
  }
  
  renew = (image) => {
    this.cropper && this.cropper.destroy();
    this.cropper = new window.Cropper(image, this.options);

  }
  render() {
    
    const { width, height, previewId, imageSrc } = this.props;

    return (
      <div>
        {/* This rule is very important, please do not ignore this! */}
        <style>{`
            .wrapper {
                width: ${ width ? (width+'px') : '500px'};
                height: ${ height ? (height+'px') : '500px'};
                border: 1px solid #eee;
            }
            img {
                max-width: 100%; 
            }
            .preview-lg {
                overflow: hidden;
                background-color: #fff;
                border-radius: 50%;
                text-align: center;
            }
        `}</style>
        <div className="wrapper">
            {/* http://localhost:3007/images/footNavLogo.png  图片转了后不对 
                || "/images/testPicture.jpg"
                || "/images/shixun0.jpg"
            */}
            <img id={this.props.imageId || "__image"} src={`${imageSrc }`}></img>
        </div>
        {/* background: 'aquamarine', 
            'border-radius': '128px'
        */}
        {!previewId && <div id="img-preview" className="img-preview preview-lg" style={{width: '128px', height: '128px',  }}>
        </div>}

        {/* <img id="showImg" src="http://localhost:3007/images/testPicture.jpg"></img> */}

        {/* <div id="canvasWrap"></div> */}
        {/* <button onClick={save_avatar.bind(this)}>save </button> */}
      </div>
    );
  }
}

export default  Cropper;


// function aaa () {
//     function showedit_headphoto() {
//         var html = `
//         <script src=\"../head/jquery.min.js\"><\/script>\n
//         <link href=\"../head/cropper.min.css\" rel=\"stylesheet\">\n
//         <link href=\"../head/sitelogo.css\" rel=\"stylesheet\">\n
//         <script src=\"../head/bootstrap.min.js\"><\/script>\n
//         <script src=\"../head/cropper.js\"><\/script>\n
//         <script src=\"../head/sitelogo.js\"><\/script>\n
//         <script src=\"../head/html2canvas.min.js\" type=\"text/javascript\" charset=\"utf-8\"><\/script>\n\n

//         <div class=\"task-popup\" style=\"width: 550px;\">\n  <div class=\"task-popup-title clearfix task-popup-bggrey\">上传头像<\/div>\n  <div class=\"clearfix\">\n    
//         <div class=\"modal fade\" style=\"outline: none;\" id=\"avatar-modal\" aria-hidden=\"true\" aria-labelledby=\"avatar-modal-label\" role=\"dialog\" tabindex=\"-1\">\n      
//         <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n          <form class=\"avatar-form\">\n            <div class=\"modal-body\">\n              
//         <div class=\"padding20\">\n                <div class=\"avatar-upload\">\n                  <input class=\"avatar-src\" name=\"avatar_src\" type=\"hidden\">\n                  
//         <input class=\"avatar-data\" name=\"avatar_data\" type=\"hidden\">\n\n                  <span id=\"avatar-name\"><\/span>\n                  
//         <input class=\"avatar-input\" style=\"display:none;\" id=\"avatarInput\" value=\"avatars/User/116\" name=\"avatar_file\" type=\"file\">\n                  
//         <input type=\"hidden\" id=\"source_id\" value=\"116\"/>\n                  <input type=\"hidden\" id=\"source_type\" value=\"User\"/>\n                <\/div>\n                
//         <div class=\"row clearfix mt20 pl20\">\n                  <div class=\"task-form-45 fl panel-box-sizing uplaodImg\">\n                    
//         <div class=\"avatar-wrapper\" id=\"wrapper_image_show\">\n                      <!--<span style=\"display: block;\">\n                                             选择你要上传的图片<br/>
//         \n                                             仅支持JPG、GIF、PNG，且文件小于2M\n                                           <\/span>-->\n                    <\/div>\n                    
//         <div class=\"row avatar-btns clearfix\">\n                      <a href=\"javascript:void(0);\" class=\"fl\" type=\"button\" onClick=\"$(\'input[id=avatarInput]\').click();\">重新上传<\/a>\n
//                               <!--<div class=\"btn-group\">\n                        <a href=\"javascript:void(0);\" class=\"fa fa-repeat fr mt5 color-grey-9\" data-method=\"rotate\" data-option=\"90\" 
//                               type=\"button\" title=\"Rotate 90 degrees\">\n                          <\/a>\n                      <\/div>-->\n                    <\/div>\n                  <\/div>\n   
//                                              <div class=\"task-form-50 panel-box-sizing fr color-grey pr20\" style=\"width: 128px;\">\n                    <div class=\"edu-txt-center\">\n                     
//                                               <div class=\"avatar-preview preview-lg radius\" id=\"imageHead\">\n                        
//                                               <img alt=\"头像\" height=\"128\" nhname=\"avatar_image\" src=\"/images/avatars/User/116?1556802838\" width=\"128\" />\n                      <\/div>\n  
//                                                                   <span>头像预览<\/span>\n                    <\/div>\n                    
//                                                                   <p class=\"color-grey-9 font-12 mt110 justify\">仅支持JPG、GIF、PNG，且文件小于2M<\/p>\n                  <\/div>\n                <\/div>\n
//                                                                                 <\/div>\n              <div class=\"clearfix edu-txt-center mb20 mt10\">\n                
//                                                                                 <a href=\"javascript:void(0);\" class=\"task-btn mr20\" onclick=\"hideModal()\">取消<\/a>\n               
//                                                                                 <a href=\"javascript:void(0);\" class=\"avatar-save task-btn task-btn-orange\" data-dismiss=\"modal\">确定<\/a>\n              
//                                                                                 <\/div>\n            <\/div>\n          <\/form>\n        <\/div>\n      <\/div>\n    <\/div>\n  <\/div>\n<\/div>\n\n<script>\n 
//                                                                                    $(function () {\n        new CropAvatar($(\'#crop-avatar\'), 1/1);\n\n        //---------------------------头像上传-----------------------------//\n        //做个下简易的验证  大小 格式\n        $(\'#avatarInput\').on(\'change\', function(e) {\n            var filemaxsize = 1024 * 5;//5M\n            var target = $(e.target);\n            var Size = target[0].files[0].size / 1024;\n            if(Size > filemaxsize) {\n                alert(\'图片过大，请重新选择!\');\n                $(\".avatar-wrapper\").children().remove;\n                return false;\n            }\n            if(!this.files[0].type.match(/image.*/)) {\n                alert(\'请选择正确的图片!\')\n            } else {\n                /*var filename = document.querySelector(\"#avatar-name\");*/\n                var texts = document.querySelector(\"#avatarInput\").value;\n                var teststr = texts; //你这里的路径写错了\n                testend = teststr.match(/[^\\\\]+\\.[^\\(]+/i); //直接完整文件名的\n                /*filename.innerHTML = testend;\n                $(filename).css(\"color\", \'#333\');*/\n                $(\".avatar-save\").removeClass(\"task-btn-grey\").addClass(\"task-btn-orange\");\n                $(\".avatar-save\").on(\"click\", save_avatar);\n            }\n\n        });\n    });\n\n    function save_avatar(){\n        var img_lg = document.getElementById(\'imageHead\');\n        if($(img_lg).html().trim() == \"\"){\n            $(\"#avatar-name\").html(\"请先选择图片上传\").css(\"color\", \'red\');\n        } else {\n            $(\"#avatar-name\").html(\"\").css(\"color\", \'#333\');\n            // 截图小的显示框内的内容\n            html2canvas(img_lg, {\n                allowTaint: true,\n                taintTest: false,\n                onrendered: function(canvas) {\n                    canvas.id = \"mycanvas\";\n                    //生成base64图片数据\n                    var dataUrl = canvas.toDataURL(\"image/jpeg\");\n                    var newImg = document.createElement(\"img\");\n                    newImg.src = dataUrl;\n                    imagesAjax(dataUrl);\n                    $(\".avatar-save\").attr(\"disabled\",\"true\");\n                }\n            });\n        }\n    }\n\n    function imagesAjax(src) {\n        var data = {};\n        data.img = src;\n        data.source_id = $(\'#source_id\').val();\n        data.source_type = $(\'#source_type\').val();\n        data.is_direct = 0;\n        $.ajax({\n            url: \"/upload_avatar\",\n            beforeSend: function(xhr) {xhr.setRequestHeader(\'X-CSRF-Token\', $(\'meta[name=\"csrf-token\"]\').attr(\'content\'))},\n            data: data,\n            type: \"POST\",\n            success: function (re) {\n                console.log(re);\n                console.log(1562050370);\n                if(re){\n                    var o = JSON.parse(re);\n                    if (o.status !=0 ){\n                        console.log(o.message);\n                    } else {\n                        var imgSpan = $(\"img[nhname=\'avatar_image\']\");\n                        imgSpan.attr({\"src\": o.url + \'?1562050370\'});\n                        $(\"#user_code\").html(o.grade);\n                        notice_box_redirect(\"/users/shitou\", \"上传成功\");\n                    }\n                } else {\n                    notice_box(\"上传出错\");\n                }\n\n            },\n            error: function (e) {\n                alert(e);\n            }\n        });\n    }\n
//                                                                                    <\/script>`;
//         pop_box_new(html, 550, 510);
//         $("#imageHead img").attr({"src": $("#user_avatar_show").attr("src")});
//         $("#wrapper_image_show img").attr({"src": $("#user_avatar_show").attr("src")});

        
//     }

//     $(function () {        
//         new CropAvatar($('#crop-avatar'), 1/1);        
//         //---------------------------头像上传-----------------------------//        
//         //做个下简易的验证  大小 格式        
//         $('#avatarInput').on('change', function(e) {            
//             var filemaxsize = 1024 * 5;//5M            
//             var target = $(e.target);            
//             var Size = target[0].files[0].size / 1024;            
//             if(Size > filemaxsize) {                
//                 alert('图片过大，请重新选择!');                
//                 $(".avatar-wrapper").children().remove;                
//                 return false;            
//             }            
//             if(!this.files[0].type.match(/image.*/)) {                
//                 alert('请选择正确的图片!')            
//             } else {                
//                 /*var filename = document.querySelector("#avatar-name");*/                
//                 var texts = document.querySelector("#avatarInput").value;                
//                 var teststr = texts; //你这里的路径写错了                
//                 testend = teststr.match(/[^\\\\]+\\.[^\\(]+/i); //直接完整文件名的                
//                 /*filename.innerHTML = testend;                $(filename).css("color", '#333');*/                
//                 $(".avatar-save").removeClass("task-btn-grey").addClass("task-btn-orange");                
//                 $(".avatar-save").on("click", save_avatar);            
//             }        
//         });    
//     });    
//     function save_avatar(){        
//         var img_lg = document.getElementById('imageHead');        
//         if($(img_lg).html().trim() == ""){            
//             $("#avatar-name").html("请先选择图片上传").css("color", 'red');        
//         } else {            
//             $("#avatar-name").html("").css("color", '#333');           
//             // 截图小的显示框内的内容            
//             html2canvas(img_lg, {               
//                 allowTaint: true,                
//                 taintTest: false,                
//                 onrendered: function(canvas) {                    
//                     canvas.id = "mycanvas";                    
//                     //生成base64图片数据                    
//                     var dataUrl = canvas.toDataURL("image/jpeg");                    
//                     var newImg = document.createElement("img");                    
//                     newImg.src = dataUrl;                    
//                     imagesAjax(dataUrl);                    
//                     $(".avatar-save").attr("disabled","true");                
//                 }            
//             });       
//         }    
//     }    
//     function imagesAjax(src) {        
//         var data = {};        
//         data.img = src;        
//         data.source_id = $('#source_id').val();        
//         data.source_type = $('#source_type').val();        
//         data.is_direct = 0;        
//         $.ajax({            
//             url: "/upload_avatar",            
//             beforeSend: function(xhr) {
//                 xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
//             },            
//             data: data,            
//             type: "POST",            
//             success: function (re) {                
//                 console.log(re);                
//                 // console.log(1562050370);                
//                 if(re){                    
//                     var o = JSON.parse(re);                    
//                     if (o.status !=0 ){                        
//                         console.log(o.message);                    
//                     } else {                        
//                         var imgSpan = $("img[nhname='avatar_image']");                        
//                         imgSpan.attr({"src": o.url + '?1562050370'});                        
//                         $("#user_code").html(o.grade);                        
//                         notice_box_redirect("/users/shitou", "上传成功");                    
//                     }                
//                 } else {                    
//                     notice_box("上传出错");                
//                 }            
//             },            
//             error: function (e) {                
//                 alert(e);            
//             }        
//         });    
//     }


// }