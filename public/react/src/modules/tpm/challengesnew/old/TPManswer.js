import React, {Component} from 'react';

import {Input, Select, Radio, Checkbox, Popconfirm, message, Modal} from 'antd';

import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

// import "antd/dist/antd.css";

import { getImageUrl, getUploadActionUrl, getUrl } from 'educoder';

import axios from 'axios';

import '../css/TPMchallengesnew.css';

let origin = getUrl();

let path = getUrl("/editormd/lib/")

const $ = window.$;

let timeout;

let currentValue;

const Option = Select.Option;

const RadioGroup = Radio.Group;


// 恢复数据
function md_rec_data(k,mdu,id, editor){
    if(window.sessionStorage.getItem(k+mdu) !== null){
        editor.setValue(window.sessionStorage.getItem(k+mdu));
        md_clear_data(k,mdu,id);
    }
}

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

            md_elocalStorage(editorName, `answers__${id}`, "Memoanswers");

            callback && callback()
        }
    });
    return editorName;
}


export default class TPManswer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            choice_url: undefined,
            practice_url: undefined,
            go_back_url: undefined,
            value: 1,
            answer:"",
            id:undefined,
            checkpointId:undefined,
            power: false,
            prev_challenge: undefined,
            next_challenge: undefined,
        }
    }

    answerMD(initValue, id) {

        this.contentChanged = false;
        const placeholder = "";
        // amp;
        // 编辑时要传memoId
        const imageUrl = `${getUploadActionUrl()}`;
        // 创建editorMd

        const answers_editormd = create_editorMD(id, '100%', 400, placeholder, imageUrl, () => {
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
        });
        this.answers_editormd = answers_editormd;
        window.answers_editormd = answers_editormd;

    }

    componentDidMount() {
        let id = this.props.match.params.shixunId;
        let checkpointId=this.props.match.params.checkpointId;

        let newchoice_url= "/shixuns/"+id+"/challenges/newquestion";
        let newpractice_url= "/shixuns/"+id+"/challenges/new";
        let newgo_back_url="/shixuns/"+id+"/challenges";
        this.setState({
            shixunId:id,
            checkpointId:checkpointId
        })


        let url = "/shixuns/" + id + "/challenges/" + checkpointId + "/edit.json?tab=2";
        axios.get(url).then((response) => {
            let newprev_challenge = response.data.prev_challenge;
            let next_challenge = response.data.next_challenge;
            if (newprev_challenge != undefined) {
                if(newprev_challenge.st===0){
                    newprev_challenge = "/shixuns/" + id + "/challenges/" + newprev_challenge.id + "/editcheckpoint";
                }else{
                    newprev_challenge = "/shixuns/" + id + "/challenges/" + newprev_challenge.id  + "/editquestion";
                }
            }
            if (next_challenge != undefined) {

                if(next_challenge.st===0){
                    next_challenge = "/shixuns/" + id + "/challenges/" + next_challenge.id+ "/editcheckpoint";
                }else{
                    next_challenge = "/shixuns/" + id + "/challenges/" + next_challenge.id+ "/editquestion";
                }
            }
            this.setState({
                answer:response.data.answer,
                power: response.data.power,
                choice_url: newchoice_url,	//	导航中的新建选择题url
                practice_url: newpractice_url,	//string	导航中新建实践题url
                go_back_url: newgo_back_url,	//string	导航中的返回url
                position: response.data.position,	//int	关卡位置，导航栏中的第几关
                prev_challenge: newprev_challenge,
                next_challenge: next_challenge,
             })

            if(response.data.power===false){
                this.props.showSnackbar("没有权限修改");
            }
            if(response.data.answer===undefined||response.data.answer===null){
                this.answerMD("", "answerMD");
            }else{
                this.answerMD(response.data.answer, "answerMD");
            }

        }).catch((error) => {
            console.log(error)
        });
    }

    challenge_answer_submit=()=> {
        let id = this.props.match.params.shixunId;
        let{checkpointId}=this.state;
        let url = "/shixuns/"+id+"/challenges/"+checkpointId+".json";
        const answer_editormdvalue = this.answers_editormd.getValue();

        axios.put(url,{
            tab:2,
            identifier:id,
            id:checkpointId,
            challenge:{
                answer:answer_editormdvalue
            }
            }
        ).then((response) => {
            this.props.showSnackbar(response.data.messages);

        }).catch((error) => {
            console.log(error)
        });
    }

    render() {

        let {
            choice_url,
            practice_url,
            go_back_url,
            position,
            task_pass_default,
            submit_url,
            shixunId,
            checkpointId,
            power,
            prev_challenge,
            next_challenge,
        } = this.state;
        let tab1url="/shixuns/" + shixunId + "/challenges/"+checkpointId+"/editcheckpoint";
        let tab2url="/shixuns/" + shixunId + "/challenges/"+checkpointId+"/tab=2";
        let tab3url="/shixuns/" + shixunId + "/challenges/"+checkpointId+"/tab=3";
        // console.log(this.props)
        return (
            <React.Fragment>
                <div className="educontent mt30 mb30">
                    <div className="padding10-20 mb10 edu-back-white clearfix">
                        <span className="fl ring-blue mr10 mt7">
                            <img src={getImageUrl("images/educoder/icon/code.svg")} data-tip-down="实训任务" className="fl mt2 ml2"/>
                        </span>
                        <span className="font-16 task-hide fl TPMtaskName">第{position}关</span>
                        <Link to={go_back_url === undefined ? "" : go_back_url}
                              className="color-grey-6 fr font-15 mt3">返回</Link>

                        {prev_challenge === undefined ? "" :
                            <a href={prev_challenge} className="fr color-blue mr15 mt4">上一关</a>
                        }

                        {next_challenge === undefined ? "" :
                            <a href={next_challenge} className="fr color-blue mr15 mt4">下一关</a>
                        }

                        <a href={practice_url === undefined ? "" : practice_url}
                              className="fr color-blue mr15 mt4"
                              style={{display:this.props.status===2||this.props.status===1?'none':'block'}}
                              data-tip-down="新增代码编辑类型的任务">+&nbsp;实践类型</a>
                        <a href={choice_url === undefined ? "" : choice_url}
                              className="fr color-blue mr15 mt4"
                              style={{display:this.props.status===2||this.props.status===1?'none':'block'}}
                              data-tip-down="新增选择题类型的任务">+&nbsp;选择题类型</a>

                    </div>

                    <div className="challenge_nav clearfix edu-back-white">

                        <li>
                            <Link to={tab1url}>本关任务</Link>
                        </li>

                        <li >
                            <Link to={tab2url}>评测设置</Link>
                        </li>

                        <li className="active">
                            <Link to={tab3url}>参考答案</Link>
                        </li>
                    </div>

                    <div className="edu-back-white mb10 clearfix">

                        <div className="padding40-20">
                            <p className="color-grey-6 font-16 mb30">参考答案</p>
                            <div className="df">
                                <div className="padding10-20 edu-back-greyf5 radius4" id="answerMD">
                                 <textarea style={{display: 'none'}}  id="evaluate_script_show" name="content"> </textarea>
                                    <div className="CodeMirror cm-s-defualt">
                                    </div>
                                </div>
                            </div>
                            <p id="e_tip_Memoanswers" className="edu-txt-right color-grey-cd font-12"></p>
                            <p id="e_tips_Memoanswers" className="edu-txt-right color-grey-cd font-12"></p>
                        </div>

                    </div>

                    <div className="clearfix mt20" style={{display:this.props.identity>4||this.props.identity===undefined||power===false?"none":"block"}}>
                        <a className="defalutSubmitbtn fl mr20"
                           onClick={this.challenge_answer_submit}>提交</a>
                        {/*<a href={"/shixuns/" + shixunId + "/challenges"} className="defalutCancelbtn fl">取消</a>*/}
                        <Link to={"/shixuns/" + shixunId + "/challenges"} className={"defalutCancelbtn fl"}>取消</Link>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


