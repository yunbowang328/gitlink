js_min_all含的js

es6-shim
jQuery v1.8.3
Underscore.js 1.8.2
marked v0.3.3
Raphaël 2.1.3
js sequence diagrams 1.0.4
flowchart, v1.3.4
jQuery.flowchart.js v1.1.0
https://github.com/pandao/editor.md
http://codemirror.net

diff_match_patch
codemirror merge.js

从 edu_tpi.js 挪过来的js


修改过的地方：
Raphaël 2.1.3
Element= -> __Element=          Element=  替换成了 __Element=


js_min_all的一些tpi的js
1、
code: TPI拖拽功能  begin
tpi的上下和左右的拖拽
2、
code: window.__tpiOnResize
onRepositoryViewExpand或window resize以后需要调用这个方法，重新计算命令行区域大小
3、
code: window.refresh_editor_monaco
monaco重新layout，计算高宽
4、
code:   reply_to_dis、 $("#all_task_show").on("click", function(e){  、  $("#all_task_index").on("click", function(e){  、
        $("#next_step").live("click", function(){  、 $("#prev_step").live("click", function(){  、
        function open_answer(game, myshixun, choose){  、  function choice_answer(st, nThis){
        function check_tab(allClassName,addClassName,item){   、  function toggle_test_case_choose(t_case, id){
        function toggle_test_case(open, output, actual_output, id, power){    、  
        CodeMirror_fromTextArea    、  function game_praise(obj_id, obj_type){      、  function game_tread(obj_id){
        function setupAjaxIndicatorBase() {   、   function match_specific_symbol(str){
        function code_evaluation(test_sets     、   function pop_box_new(value, Width, Height){
        
貌似没用到，基本上page目录或TPIContextProvider里搜索不到的代码，都是没用到的，可以优化去除掉。

code: 
        sure_box_redirect_btn   这些弹框的话，有的会有用到，有的没用到的可以尝试删除
5、
code： function tpi_html_show(newCode){   、   function is_cdn_link(contents){

     html显示效果时用到的脚本


6、
code：  // 这里重新加一次事件监听，不在原有事件的基础上增加代码了
      新加了一次拖拽事件

7、
code：
function create_editorMD_4comment(id, width, high, placeholder, imageUrl, callback, otherOptions){
    老的md编辑器初始化方法，考虑用心的TPMMDEditor代替

