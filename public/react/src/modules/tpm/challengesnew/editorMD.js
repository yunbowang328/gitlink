import React, {Component} from 'react';

import {getUrl,getUploadActionUrl} from 'educoder';

let path = getUrl("/editormd/lib/");

const $ = window.$;

function create_editorMD(id, width, high, placeholder, imageUrl, callback) {
    var editorName = window.editormd(id, {
        width: width,
        height: high,
        path: path,   // "/editormd/lib/"

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
        onload: function () {
            // this.previewing();
            $("#" + id + " [type=\"latex\"]").bind("click", function () {
                editorName.cm.replaceSelection("```latex");
                editorName.cm.replaceSelection("\n");
                editorName.cm.replaceSelection("\n");
                editorName.cm.replaceSelection("```");
                var __Cursor = editorName.cm.getDoc().getCursor();
                editorName.cm.setCursor(__Cursor.line - 1, 0);
            });

            $("#" + id + " [type=\"inline\"]").bind("click", function () {
                editorName.cm.replaceSelection("`$$$$`");
                var __Cursor = editorName.cm.getDoc().getCursor();
                editorName.cm.setCursor(__Cursor.line, __Cursor.ch - 3);
                editorName.cm.focus();
            });
            $("[type=\"inline\"]").attr("title", "行内公式");
            $("[type=\"latex\"]").attr("title", "多行公式");

            window.md_elocalStorage(editorName, `MemoQuestion_${id}`, `${id}Question`);

            callback && callback()
        }
    });
    return editorName;
}


export default class TPMeditorMD extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount() {


    }

    questioMD=(initValue, id)=> {

        this.contentChanged = false;
        const placeholder = "";
// amp;
// 编辑时要传memoId
        // const imageUrl = `/upload_with_markdown?container_id=&container_type=Memo`;
        const imageUrl = `${getUploadActionUrl()}`;
// 创建editorMd

        let questio_editormd = create_editorMD(id, '100%', 400, placeholder, imageUrl, () => {
            setTimeout(() => {
                questio_editormd.resize()
                questio_editormd.cm && questio_editormd.cm.refresh()
            }, 500)

            if (initValue != undefined) {
                questio_editormd.setValue(initValue)
            }
            questio_editormd.cm.on("change", (_cm, changeObj) => {
                console.log('....contentChanged')
                this.contentChanged = true;
            })
        });
        this.questio_editormd = questio_editormd;
        window.questio_editormd = questio_editormd;

    }

    componentWillReceiveProps(newProps) {
        this.questioMD(newProps.value,newProps.id)
    }
    render() {
          return (
            <div className="padding10-20 edu-back-greyf5 radius4" id="questioMD">
                <textarea style={{display: 'none'}} id="questioadd" name="content"> </textarea>
                <div className="CodeMirror cm-s-defualt">
                </div>
            </div>
        )
    }
}
