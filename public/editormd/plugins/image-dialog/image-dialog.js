/*!
 * Image (upload) dialog plugin for Editor.md
 *
 * @file        image-dialog.js
 * @author      pandao
 * @version     1.3.4
 * @updateTime  2015-06-09
 * {@link       https://github.com/pandao/editor.md}
 * @license     MIT
 */

(function() {

    var factory = function (exports) {

		var pluginName   = "image-dialog";

		exports.fn.imageDialog = function() {

            var _this       = this;
            var cm          = this.cm;
            var lang        = this.lang;
            var editor      = this.editor;
            var settings    = this.settings;
            var cursor      = cm.getCursor();
            var selection   = cm.getSelection();
            var imageLang   = lang.dialog.image;
            var classPrefix = this.classPrefix;
            var iframeName  = classPrefix + "image-iframe";
			var dialogName  = classPrefix + pluginName, dialog;

			cm.focus();

            var loading = function(show, visibleDialog) {
                var _loading;
                if (visibleDialog) {
                   _loading = visibleDialog.find("." + classPrefix + "dialog-mask");
                } else {
                    _loading = dialog.find("." + classPrefix + "dialog-mask");
                }
                _loading[(show) ? "show" : "hide"]();
            };

            if (editor.find("." + dialogName).length < 1)
            {
                var guid   = (new Date).getTime();
                var action = settings.imageUploadURL + (settings.imageUploadURL.indexOf("?") >= 0 ? "&" : "?") + "guid=" + guid + "&file_param_name=" + classPrefix + "image-file";

                if (settings.crossDomainUpload)
                {
                    action += "&callback=" + settings.uploadCallbackURL + "&dialog_id=editormd-image-dialog-" + guid;
                }

                var dialogContent = ( (settings.imageUpload) ? "<form action=\"" + action +"\" target=\"" + iframeName + "\" method=\"post\" enctype=\"multipart/form-data\" class=\"" + classPrefix + "form\">" : "<div class=\"" + classPrefix + "form\">" ) +
                                        ( (settings.imageUpload) ? "<iframe name=\"" + iframeName + "\" id=\"" + iframeName + "\" guid=\"" + guid + "\"></iframe>" : "" ) +
                                        "<label>" + imageLang.url + "</label>" +
                                        "<input type=\"text\" data-url />" + (function(){
                                            return (settings.imageUpload) ? "<div class=\"" + classPrefix + "file-input\">" +
                                                                                "<input type=\"file\" name=\"" + classPrefix + "image-file\" accept=\"image/*\" />" +
                                                                                // "<input type=\"file\" name=\"file\" accept=\"image/*\" />" +
                                                                                "<input type=\"submit\" value=\"" + imageLang.uploadButton + "\" />" +
                                                                            "</div>" : "";
                                        })() +
                                        "<br/>" +
                                        "<label>" + imageLang.alt + "</label>" +
                                        "<input type=\"text\" value=\"" + selection + "\" data-alt />" +
                                        "<br/>" +
                                        "<label class=\"image-link\">" + imageLang.link + "</label>" +
                                        "<input class=\"image-link\" type=\"text\" value=\"http://\" data-link />" +
                                        "<br/>" +
                                    ( (settings.imageUpload) ? "</form>" : "</div>");

                //var imageFooterHTML = "<button class=\"" + classPrefix + "btn " + classPrefix + "image-manager-btn\" style=\"float:left;\">" + imageLang.managerButton + "</button>";

                dialog = this.createDialog({
                    title      : imageLang.title,
                    width      : (settings.imageUpload) ? 465 : 380,
                    height     : 278,
                    name       : dialogName,
                    content    : dialogContent,
                    mask       : settings.dialogShowMask,
                    drag       : settings.dialogDraggable,
                    lockScreen : false, // settings.dialogLockScreen,  ??????setting??????????????????
                    maskStyle  : {
                        opacity         : settings.dialogMaskOpacity,
                        backgroundColor : settings.dialogMaskBgColor
                    },
                    buttons : {
                        enter : [lang.buttons.enter, function() {
                            var url  = this.find("[data-url]").val();
                            var alt  = this.find("[data-alt]").val();
                            var link = this.find("[data-link]").val();

                            if (url === "")
                            {
                                alert(imageLang.imageURLEmpty);
                                return false;
                            }

							var altAttr = (alt !== "") ? " \"" + alt + "\"" : "";

                            if (link === "" || link === "http://")
                            {
                                cm.replaceSelection("![" + alt + "](" + url + altAttr + ")");
                            }
                            else
                            {
                                cm.replaceSelection("[![" + alt + "](" + url + altAttr + ")](" + link + altAttr + ")");
                            }

                            if (alt === "") {
                                cm.setCursor(cursor.line, cursor.ch + 2);
                            }

                            this.hide().lockScreen(false).hideMask();
                            cm.focus && cm.focus()
                            return false;
                        }],

                        cancel : [lang.buttons.cancel, function() {
                            this.hide().lockScreen(false).hideMask();
                            cm.focus && cm.focus()
                            return false;
                        }]
                    }
                });

                dialog.attr("id", classPrefix + "image-dialog-" + guid);

				if (!settings.imageUpload) {
                    return ;
                }

				var fileInput  = dialog.find("[name=\"" + classPrefix + "image-file\"]");

				fileInput.bind("change", function() {
					var fileName  = fileInput.val();
					var isImage   = new RegExp("(\\.(" + settings.imageFormats.join("|") + "))$"); // /(\.(webp|jpg|jpeg|gif|bmp|png))$/

					if (fileName === "")
					{
						alert(imageLang.uploadFileEmpty);
                        
                        return false;
					}
					
                    if (!isImage.test(fileName))
					{
						alert(imageLang.formatNotAllowed + settings.imageFormats.join(", "));
                        
                        return false;
					}

                    loading(true);

                    var submitHandler = function() {

                          // ???????????????????????????getElementById(iframeName);?????????????????????dialog???iframe?????????
                        var uploadIframe =  $(this).parents('.editormd-dialog-container').find('#editormd-image-iframe')[0];
//                        var uploadIframe = document.getElementById(iframeName);

                        uploadIframe.onload = function() {


                            var body = (uploadIframe.contentWindow ? uploadIframe.contentWindow : uploadIframe.contentDocument).document.body;
                            var json = (body.innerText) ? body.innerText : ( (body.textContent) ? body.textContent : null);

                            json = (typeof JSON.parse !== "undefined") ? JSON.parse(json) : eval("(" + json + ")");

                            // https://www.trustie.net/issues/16197
                            // ?????????????????????????????????2???mdeditor????????????????????????md?????????????????????????????????md??????????????????dialog?????????????????????
                            // ?????????visibleDialog??????????????????dialog??????????????????????????????????????????dialog???????????????????????????????????????dialog
                            // ???????????????????????????????????????????????????dialog???????????????dialog????????????
                            // ?????????dialog??? ??????????????? ????????????loading????????????dialog???????????????val????????????????????????url?????????dialog????????????
                            // ????????????dialog??????dialog???iframe?????????????????????json????????????
                            var visibleDialog = $('.editormd-dialog:visible');
                            loading(false, visibleDialog);
                            // ?????? {"id":227354,"filesize":8253}
                            if (json.id) {
                                visibleDialog.find("[data-url]").val('/api/attachments/' + json.id);
                            } else if (json.success === 1)
                            {
                                visibleDialog.find("[data-url]").val(json.url);
                            }
                            else
                            {
                                alert(json.message);
                            }

                            return false;
                        };
                    };

                    dialog.find("[type=\"submit\"]").bind("click", submitHandler).trigger("click");
				});
            }

			dialog = editor.find("." + dialogName);
			dialog.find("[type=\"text\"]").val("");
			dialog.find("[type=\"file\"]").val("");
			dialog.find("[data-link]").val("http://");

			this.dialogShowMask(dialog);
			// this.dialogLockScreen();
			dialog.show();

		};

	};

	// CommonJS/Node.js
	if (typeof require === "function" && typeof exports === "object" && typeof module === "object")
    {
        module.exports = factory;
    }
	else if (typeof define === "function")  // AMD/CMD/Sea.js
    {
		if (define.amd) { // for Require.js

			define(["editormd"], function(editormd) {
                factory(editormd);
            });

		} else { // for Sea.js
			define(function(require) {
                var editormd = require("./../../editormd");
                factory(editormd);
            });
		}
	}
	else
	{
        factory(window.editormd);
	}

})();
