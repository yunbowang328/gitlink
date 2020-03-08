import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames'

import { getUploadActionUrl } from 'educoder'

import './MemoDetailEditor.css'

require('codemirror/lib/codemirror.css');

const $ = window.$;
///作业回答 专用
class MemoDetailMDEditortwo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isInited: this.props.usingMockInput ? false : true,
            isError: false,
            errorMsg: ''
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.memo && (!prevProps.memo || this.props.memo.id != prevProps.memo.id)) {
            // this.keEditor = window.sd_create_editor_from_data(this.props.memo.id, null, "100%", "Memo");
            //          window._kk = this.keEditor
        }
    }

    initMDEditor = () => {
        // 因为props.memo不存在时，本组件不会被加载，这里直接在didMount里初始化即可
        const placeholder = '我要回复...'
        // const imageUrl = `/upload_with_markdown?container_id=${this.props.memo.id}&container_type=Memo`;
        const imageUrl = `${getUploadActionUrl()}`;

        // 执行太快了，样式不正常
        window.__tt = 400;
        setTimeout(() => {
            var commentMDEditor = window.create_editorMD_4comment("memo_comment_editorMd", '', this.props.height || 240, placeholder, imageUrl, () => {
                commentMDEditor.focus();

                this.initDrag();

                commentMDEditor.cm.on("change", (_cm, changeObj) => {
                    this.setState({
                        isError: false,
                        errorMsg: ''
                    })
                })
            }, {
                watch: false,
                dialogLockScreen: false,
            });
            this.commentMDEditor = commentMDEditor;
            window.commentMDEditor = commentMDEditor;

        }, window.__tt)
    };
    componentDidMount() {
        !this.props.usingMockInput && this.initMDEditor()
    }
    initDrag = () => {
        window.initMDEditorDragResize(".editor__resize", this.commentMDEditor)
    }

    onCommit = () => {
        const content = this.commentMDEditor.getValue();
        // this.props.showError ==
        if (this.props.showError == true) {
            if (!content || content.trim() == "") {
                this.setState({
                    isError: true,
                    errorMsg: '不能为空'
                })
                return;
            } else if (content.length > 2000) {
                this.setState({
                    isError: true,
                    errorMsg: '不能超过2000个字符'
                })
                return;
            }

            this.setState({
                isError: false,
                errorMsg: ''
            })
        }
        window.$(document).trigger("onReply", { commentContent: content
            , id: this.props.memo.id, editor: this.commentMDEditor } );

    }

    showEditor() {
        $("html, body").animate({ scrollTop: $('#commentInput').offset().top - 100 }, 1000, () => {
            if (this.commentMDEditor) {
                this.commentMDEditor.cm.focus()
            } else {
                $('#commentInput input')[0].click()
            }
        });
    }
    onMockInputClick = () => {
        this.setState({isInited: true})
        this.initMDEditor()
    }
    render() {
        const { match, history, memo, placeholder } = this.props
        const { isInited, errorMsg } = this.state
        if (!memo) {
            return <div></div>
        }

        return (
            <React.Fragment>
                <style>{`
						.mockInputWrapper {
							display: flex;
							padding: 30px;
						}
						.mockInputWrapper input {
							flex:1;
							padding-left: 10px;
							height: 40px;
							background: rgb(246,246,246);
							margin-right: 20px;
						}
						.mockInputWrapper a.commentsbtn {
							height: 40px;
							display: inline-block;
							margin-top: 0px !important;
							vertical-align: text-top;
							padding-top: 6px;
							width: 60px;
							margin-right: 0px !important;
						}
						#commentInput .editormd{
							width:100%!important;
						}
					`}</style>
                <div style={{ display: isInited ? 'none' : ''}} className="mockInputWrapper" id="commentInput">
                    <input onClick={this.onMockInputClick} placeholder={placeholder || '我要回复'}></input>
                    <a href="javascript:void(0)"
                       onClick={this.onMockInputClick}	className="commentsbtn task-btn task-btn-blue">
                        发送
                    </a>
                </div>

                <div nhname={`new_message_${memo.id}`} className=""
                     style={{ padding: '30px',boxSizing:"border-box", display: isInited ? '' : 'none' }} id="commentInput">
                    <div id="memo_comment_editorMd" className="editorMD" style={{ marginBottom: '0px'
                        , border: errorMsg ? '1px solid red' : '1px solid #ddd'}}>
								<textarea style={{'display': 'none'}}>
								</textarea>
                    </div>
                    <div className="editor__resize" href="javascript:void(0);">调整高度</div>
                    { errorMsg && <input className="fl" style={{color: 'red', marginTop: '6px',
                        marginLeft: '4px'}}>{errorMsg}</input> }
                    <a id={`new_message_submit_btn_${memo.id}`} href="javascript:void(0)"
                       onClick={this.onCommit} className="commentsbtn  task-btn-blue  task-btn fr ">
                        发送
                    </a>
                </div>
            </React.Fragment>
        );
    }
}

export default ( MemoDetailMDEditortwo );
