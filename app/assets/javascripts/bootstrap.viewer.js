/*
 * Copyright 2018-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * WebSite: http://bootstrap-viewer.leftso.com
 */
$.fn.bootstrapViewer = function (options) {
    $(this).on('click', function () {
        var opts = $.extend({}, $.fn.bootstrapViewer.defaults, options);
        var viewer = $('<div class="modal fade bs-example-modal-lg text-center" id="bootstrapViewer" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" >\n' +
            '          <div class="modal-dialog modal-lg" style="display: inline-block; width: auto;">\n' +
            '            <div class="modal-content">\n' +
            '             <img' +
            '\t\t\t class="carousel-inner img-responsive img-rounded img-viewer" draggable="false"\n' +
            '\t\t\t onclick="/*$(\'#bootstrapViewer\').modal(\'hide\');setTimeout(function(){$(\'#bootstrapViewer\').remove();},200);*/"\n' +
            '\t\t\t onmouseover="this.style.cursor=\'move\';" \n' +
            '\t\t\t onmouseout="this.style.cursor=\'default\'"  \n' +
            '\t\t\t />\n' +
            '            </div>\n' +
            '          </div>\n' +
            '        </div>');
        $('body').append(viewer);
        if ($(this).attr(opts.src)) {
            $("#bootstrapViewer").find(".img-viewer").attr("src", $(this).attr(opts.src));
            $("#bootstrapViewer").modal();
        } else {
            throw "图片不存在"
        }
        $('#bootstrapViewer').on('hidden.bs.modal', function(){
          $('#bootstrapViewer').remove();
        });

        var $moveDiv = $('#bootstrapViewer .modal-dialog');
        var isMove = false;
        var div_x = $moveDiv.offset().left;
        var div_y = $moveDiv.offset().top;

        var mousedownFunc = function (e) {
          if (isMove) {
            var left = e.pageX - div_x;
            var top = e.pageY - div_y;
            if(left < 0){ left = 0}
            if(top < 0){ top = 0}
            $moveDiv.css({"left": left, "top":top});
          }
        }

        $moveDiv.mousedown(function (e) {
          $moveDiv.css({ left: $moveDiv[0].offsetLeft, top: $moveDiv[0].offsetTop, marginTop: 0, position: 'absolute' });

          isMove = true;
          div_x = e.pageX - $moveDiv.offset().left;
          div_y = e.pageY - $moveDiv.offset().top;
          $(document).mousemove(mousedownFunc);
        }).mouseup(function () {
          isMove = false;
          $(document).unbind('mousemove', mousedownFunc);
        });
    })

    $(this).on('mouseover', function () {
        $(this).css('cursor', 'zoom-in');
    })
}
$.fn.bootstrapViewer.defaults = {
    src: 'src'
}