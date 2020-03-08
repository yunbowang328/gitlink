import React, {Component} from 'react';

import {Input, Select, Radio, Checkbox, Popconfirm, message, Modal} from 'antd';

import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

// import "antd/dist/antd.css";

import { getImageUrl, getUploadActionUrl, getUrl } from 'educoder';
import '../../courses/css/Courses.css'

import axios from 'axios';

import './css/TPMchallengesnew.css';
require('codemirror/lib/codemirror.css');

let origin = getUrl();

let path = '/editormd/lib/'
    path = getUrl("/editormd/lib/")
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
        $(id2).html("　");
    }else{
        $(id1).html("　");
    }
}
window.md_clear_data = md_clear_data
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
        if(oc !== null && oc != editor.getValue()){
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
                
                var textStart = " 数据已于 "
                var text = textStart + h + ':' + m + ':' + s +" 保存 ";
                // 占位符   
                var oldHtml = $(id2).html();
                if (oldHtml && oldHtml != '　' && oldHtml.startsWith(textStart) == false) {
                    $(id2).html( oldHtml.split('　(')[0] + `　(${text})`);
                } else {
                    $(id2).html(text);
                }
                // $(id2).html("");
            }
        },10000);

    }else{
        $("#e_tip_"+id).after('您的浏览器不支持localStorage.无法开启自动保存草稿服务,请升级浏览器！');
    }
}


function create_editorMD(id, width, high, placeholder, imageUrl, callback, initValue, 
        onchange, watch, { noStorage, showNullButton, emoji }, that) {
    // 还是出现了setting只有一份，被共用的问题
    
    var editorName = window.editormd(id, {
        width: width,
        height: high===undefined?400:high,
        path: path,   // "/editormd/lib/"
        markdown : initValue,

        dialogLockScreen: false,
        watch:watch===undefined?true:watch,
        syncScrolling: "single",
        tex: true,
        tocm: true,
        emoji: !!emoji ,
        taskList: true,
        codeFold: true,
        searchReplace: true,
        htmlDecode: "style,script,iframe",
        sequenceDiagram: true,
        autoFocus: false,

        // mine
        
        toolbarIcons: function (mdEditor) {
            let react_id = `react_${mdEditor.id}`;
            const __that = window[react_id]

            // Or return editormd.toolbarModes[name]; // full, simple, mini
            // Using "||" set icons align right.
            const icons = ["bold", "italic", "|", "list-ul", "list-ol", "|", "code", "code-block", "link", "|", "testIcon", "testIcon1", '|', "image", "table", '|', "watch", "clear"];
            // 试卷处用到的填空题新增按钮
            if (__that.props.showNullButton) {
                icons.push('nullBtton')
            }
            return icons
        },
        toolbarCustomIcons: {
            testIcon: "<a type=\"inline\" class=\"latex\" ><div class='zbg'></div></a>",
            testIcon1: "<a type=\"latex\" class=\"latex\" ><div class='zbg_latex'></div></a>",
            nullBtton: "<a type=\"nullBtton\" class='pr' title='增加填空'><div class='border-left'><span></span></div><span class='fillTip'>点击插入填空项</span><i class=\"iconfont icon-edit font-16\"></i></a>",
        },
        //这个配置在simple.html中并没有，但是为了能够提交表单，使用这个配置可以让构造出来的HTML代码直接在第二个隐藏的textarea域中，方便post提交表单。
        saveHTMLToTextarea: true,
        // 用于增加自定义工具栏的功能，可以直接插入HTML标签，不使用默认的元素创建图标
        dialogMaskOpacity: 0.6,
        placeholder: placeholder,
        imageUpload: true,
        imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp", "JPG", "JPEG", "GIF", "PNG", "BMP", "WEBP"],
        imageUploadURL: imageUrl,//url
        onchange: onchange,
        onload: function() {
            let _id = this.id   // 如果要使用this，这里不能使用箭头函数
            let _editorName = this;
            let react_id = `react_${_editorName.id}`;
            const __that = window[react_id]
            
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

            if (__that.props.showNullButton) {
                const NULL_CH = '▁'
                // const NULL_CH = '〇'
                // const NULL_CH = '🈳'
                
                $("#" + _id + " [type=\"nullBtton\"]").bind("click", function () {
                    _editorName.cm.replaceSelection(NULL_CH);
                    // var __Cursor = _editorName.cm.getDoc().getCursor();
                    // _editorName.cm.setCursor(__Cursor.line - 1, 0);
                });
            }

            if (noStorage == true) {

            } else {
                md_elocalStorage(_editorName, `MDEditor__${_id}`, _id);
            }

            callback && callback(_editorName)
        }
    });
    return editorName;
}


export default class TPMMDEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initValue: ''
        }
    }
    componentDidUpdate(prevProps, prevState) {
        // 不能加，影响了试卷填空题
        // if (this.props.initValue != prevProps.initValue) {
        //     this.answers_editormd.setValue(this.props.initValue)
        // }
    }
    
    // react_mdEditor_
    componentDidMount = () => {
        const { mdID, initValue, placeholder, showNullButton} = this.props;
        
        let _id = `mdEditor_${mdID}`
        this.contentChanged = false;
        const _placeholder = placeholder || "";
        // amp;
        // 编辑时要传memoId
        const imageUrl = `${getUploadActionUrl()}`;
        // 创建editorMd
        let react_id = `react_${_id}`;
        // 将实例存到了window
        window[react_id] = this
        const answers_editormd = create_editorMD(_id, '100%', this.props.height, _placeholder, imageUrl, (_editorName) => {
            const __editorName = _editorName;
            react_id = `react_${__editorName.id}`;
            const that = window[react_id]
            
            // 一个延迟的recreate或resize，不加这段代码，md初始化可能会出现样式问题
            setTimeout(() => {
                if (that.props.needRecreate == true) {
                    __editorName.recreate() // 注意 必须在setValue之前触发，不然会清空
                } else {
                    __editorName.resize()
                }
                console.log('timeout', __editorName.id)
                __editorName.cm && __editorName.cm.refresh()
            }, that.props.refreshTimeout || 500)
            if (this.props.noSetValueOnInit) {
                that.onEditorChange()
            } else {
                if (that.props.initValue != undefined && that.props.initValue != '') {
                    __editorName.setValue(that.props.initValue)
                }
                if (that.state.initValue) {
                    __editorName.setValue(that.state.initValue)
                }
            }
            
            __editorName.cm.on("change", (_cm, changeObj) => {
                that.contentChanged = true;
                if (that.state.showError) {
                    that.setState({showError: false})
                }
                that.onEditorChange()
            })
            that.props.onCMBlur && __editorName.cm.on('blur', () => {
                that.props.onCMBlur()
            })
            that.props.onCMBeforeChange && __editorName.cm.on('beforeChange', (cm,change) => {
                that.props.onCMBeforeChange(cm,change)
            })
            that.answers_editormd = __editorName;
            // 这里应该可以去掉了，方便调试加的
            window[__editorName.id+'_'] = __editorName;
        }, initValue, this.onEditorChange,this.props.watch, {
            noStorage: this.props.noStorage,
            showNullButton: this.props.showNullButton,
            emoji: this.props.emoji
        }, this);
        
    }
    // 用在form里时，validate失败时出现一个红色边框
    showError = () => {
        this.setState({showError: true})
    }
    onEditorChange = () => {
        if (!this.answers_editormd) return;
        const val = this.answers_editormd.getValue();
        //console.log('onEditorChange', this.props.id, val)
        try {
            this.props.onChange && this.props.onChange(val)
        } catch(e) {
            // http://localhost:3007/courses/1309/common_homeworks/6566/setting 
            // 从这个页面，跳转到编辑页面，再在编辑页面点击返回的时候，这里会报错
            console.error('出错')
            console.error(e)
        }
    }
    resize = () => {
        if (!this.answers_editormd) { // 还未初始化
            return;
        }
        this.answers_editormd.resize()
        this.answers_editormd.cm && this.answers_editormd.cm.refresh()
        this.answers_editormd.cm.focus()
    }

    getValue = () => {
        try {
            return this.answers_editormd.getValue()
        } catch (e) {
            return ''
        }
    }
    setValue = (val) => {
        try {
            this.answers_editormd.setValue(val)
        } catch (e) {
            // TODO 这里多实例的时候，前一个实例的state会被后面这个覆盖 参考NewWork.js    http://localhost:3007/courses/1309/homework/9300/edit/1
            // 未初始化
            this.setState({ initValue: val })
        }
    }
    
    render() {

        let {
            showError
        } = this.state;
        let { mdID, className, noStorage, imageExpand } = this.props;
        let _style = {}
        if (showError) {
            _style.border = '1px solid red'
        }
        return (
            <React.Fragment>
                <div className={`df ${className} ${imageExpand && 'editormd-image-click-expand' }`} >
                {/* padding10-20  */}
                    <div className="edu-back-greyf5 radius4" id={`mdEditor_${mdID}`} style={{..._style}}>
                        <textarea style={{display: 'none'}}   id={`mdEditors_${mdID}`} name="content"></textarea>
                        <div className="CodeMirror cm-s-defualt">
                        </div>
                    </div>
                </div>
                <div className={"fr rememberTip"}>
                    {noStorage == true ? '　' : <div id={`e_tips_mdEditor_${mdID}`} className="edu-txt-right color-grey-cd font-12">　</div>}
                    {/* {noStorage == true ? '　' : <p id={`e_tips_mdEditor_${mdID}`} className="edu-txt-right color-grey-cd font-12">　</p>} */}
                </div>
            </React.Fragment>
        )
    }
}


