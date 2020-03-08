import React, {Component} from 'react';

import {Input, Select, Radio, Checkbox, Popconfirm, message, Modal} from 'antd';

import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

// import "antd/dist/antd.css";

import { getImageUrl, toPath, getUrl,getUploadActionUrl } from 'educoder';

import axios from 'axios';

import "./makedown.css";

let origin = getUrl();

let path = getUrl("/editormd/lib/")

const $ = window.$;

let timeout;

let currentValue;

const Option = Select.Option;

const RadioGroup = Radio.Group;



// 保存数据
function md_add_data(k,mdu,d){
  window.sessionStorage.setItem(k+mdu,d);
}

// 清空保存的数据
function md_clear_data(k,mdu,id){
  window.sessionStorage.removeItem(k+mdu);
  var id1 = "#e_tip_"+id;
  var id2 = "#e_tips_"+id;
  if(k == 'content'){
    $(id2).html("");
  }else{
    $(id1).html("");
  }
}
// editor 存在了jquery对象上，应用不需要自己写md_rec_data方法了
function md_rec_data(k, mdu, id) {
  if (window.sessionStorage.getItem(k + mdu) !== null) {
    var editor = $("#e_tips_" + id).data('editor');
    editor.setValue(window.sessionStorage.getItem(k + mdu));
    // debugger;
    // /shixuns/b5hjq9zm/challenges/3977/tab=3  setValue可能导致editor样式问题
    md_clear_data(k, mdu, id);
  }
}
window.md_rec_data = md_rec_data;

function md_elocalStorage(editor,mdu,id){
  if (window.sessionStorage){
    var oc = window.sessionStorage.getItem('content'+mdu);
    if(oc !== null ){
      console.log("#e_tips_"+id)
      $("#e_tips_"+id).data('editor', editor);
      var h = '您上次有已保存的数据，是否<a style="cursor: pointer;" class="link-color-blue" onclick="md_rec_data(\'content\',\''+ mdu + '\',\'' + id + '\')">恢复</a> ? / <a style="cursor: pointer;" class="link-color-blue" onclick="md_clear_data(\'content\',\''+ mdu + '\',\'' + id + '\')">不恢复</a>';
      $("#e_tips_"+id).html(h);
    }
    setInterval(function() {
      var d = new Date();
      var h = d.getHours();
      var m = d.getMinutes();
      var s = d.getSeconds();
      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      s = s < 10 ? '0' + s : s;
      if(editor.getValue().trim() != ""){
        md_add_data("content",mdu,editor.getValue());
        var id1 = "#e_tip_"+id;
        var id2 = "#e_tips_"+id;

        $(id1).html(" 数据已于 " + h + ':' + m + ':' + s +" 保存   ");
        $(id2).html("");
      }
    },10000);

  }else{
    $("#e_tip_"+id).after('您的浏览器不支持localStorage.无法开启自动保存草稿服务,请升级浏览器！');
  }
}


function create_editorMD(id, width, high, placeholder, imageUrl, callback, initValue) {
  var editorName = window.editormd(id, {
    width: width,
    height: high,
    path: path,   // "/editormd/lib/"
    markdown : initValue,


    syncScrolling: "single",
    tex: true,
    tocm: true,
    emoji: true,
    taskList: true,
    codeFold: true,
    searchReplace: true,
    htmlDecode: "style,script,iframe",
    sequenceDiagram: true,
    autoFocus: false,
    toolbarIcons: function () {
      // Or return editormd.toolbarModes[name]; // full, simple, mini
      // Using "||" set icons align right.
      return ["bold", "italic", "|", "list-ul", "list-ol", "|", "code", "code-block", "|", "testIcon", "testIcon1", '|', "image", "table", '|', "watch", "clear"]
    },
    toolbarCustomIcons: {
      testIcon: "<a type=\"inline\" class=\"latex\" ><div class='zbg'></div></a>",
      testIcon1: "<a type=\"latex\" class=\"latex\" ><div class='zbg_latex'></div></a>"
    },
    //这个配置在simple.html中并没有，但是为了能够提交表单，使用这个配置可以让构造出来的HTML代码直接在第二个隐藏的textarea域中，方便post提交表单。
    saveHTMLToTextarea: true,
    // 用于增加自定义工具栏的功能，可以直接插入HTML标签，不使用默认的元素创建图标
    dialogMaskOpacity: 0.6,
    placeholder: placeholder,
    imageUpload: true,
    imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp", "JPG", "JPEG", "GIF", "PNG", "BMP", "WEBP"],
    imageUploadURL: imageUrl,//url
    onload: function() {
      let _id = this.id   // 如果要使用this，这里不能使用箭头函数
      let _editorName = this;
      // this.previewing();
      // let _id = id;
      $("#" + _id + " [type=\"latex\"]").bind("click", function () {
        _editorName.cm.replaceSelection("```latex");
        _editorName.cm.replaceSelection("\n");
        _editorName.cm.replaceSelection("\n");
        _editorName.cm.replaceSelection("```");
        var __Cursor = _editorName.cm.getDoc().getCursor();
        _editorName.cm.setCursor(__Cursor.line - 1, 0);
      });

      $("#" + _id + " [type=\"inline\"]").bind("click", function () {
        _editorName.cm.replaceSelection("`$$$$`");
        var __Cursor = _editorName.cm.getDoc().getCursor();
        _editorName.cm.setCursor(__Cursor.line, __Cursor.ch - 3);
        _editorName.cm.focus();
      });
      $("[type=\"inline\"]").attr("title", "行内公式");
      $("[type=\"latex\"]").attr("title", "多行公式");

      md_elocalStorage(_editorName, `MDEditor__${_id}`, _id);

      callback && callback()
    }
  });
  return editorName;
}


export default class CoursesMarkdown extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount = () => {
    const { mdID, initValue ,placeholder} = this.props;
    // let initValue = 'initValue'
    let _id = `mdEditor_${mdID}`
    this.contentChanged = false;
    // const placeholder = "";
    // amp;
    // 编辑时要传memoId
    const imageUrl = `${getUploadActionUrl()}`;
    // 创建editorMd

    const answers_editormd = create_editorMD(_id, '100%', 400, placeholder, imageUrl, () => {
      setTimeout(() => {
        answers_editormd.resize()
        answers_editormd.cm && answers_editormd.cm.refresh()
      }, 500)

      if (initValue != undefined) {
          answers_editormd.setValue(initValue)
      }
      answers_editormd.cm.on("change", (_cm, changeObj) => {
          console.log('....contentChanged')
          this.contentChanged = true;
      })
    }, initValue);
    this.answers_editormd = answers_editormd;
    window.answers_editormd = answers_editormd;
  }

  getValue = () => {
    return this.answers_editormd.getValue()

  }

  render() {

    let {
      choice_url,
    } = this.state;
    let { mdID } = this.props;
    return (
      <React.Fragment>
        <div className="df">
          {/* padding10-20  */}
          <div className="edu-back-greyf5 radius4" id={`mdEditor_${mdID}`}>
            <textarea style={{display: 'none'}}  id="evaluate_script_show" name="content"> </textarea>
            <div className="CodeMirror cm-s-defualt">
            </div>
          </div>
        </div>
        <p id={`e_tip_mdEditor_${mdID}`} className="edu-txt-right color-grey-cd font-12"></p>
        <p id={`e_tips_mdEditor_${mdID}`} className="edu-txt-right color-grey-cd font-12"></p>
      </React.Fragment>
    )
  }
}


