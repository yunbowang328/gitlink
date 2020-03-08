import React, { Component } from 'react';

import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames';

import axios from 'axios';

import RepositoryDirectories from './RepositoryDirectories'

import { trace_collapse } from 'educoder'

import Popconfirm from 'antd/lib/popconfirm';
import 'antd/lib/popconfirm/style/css';

import { message } from 'antd';

require('codemirror/lib/codemirror.css');

const $ = window.$;


/**
        ---------------------------- START
 */
function getModeByMirrorName(mirror_name) {
    let mode = 'javascript'
    if (mirror_name && mirror_name.length) {
        for (let i = 0; i < mirror_name.length; i++) {
            let modeVal = mirrorNameModeMap[mirror_name[i]];
            if (modeVal) {
                mode = modeVal;
                break;
            }
        }
    }
    return mode;
}
const _extraKeys = {"Alt-/": "autocomplete"};
function createCMOptions(mirror_name) {
    let mode = getModeByMirrorName(mirror_name)

    let cmOptions = {
        lineNumbers: true,
        mode: mode,
        theme: "railscasts",
        indentUnit:4,
        matchBrackets: true,
        autoRefresh: true,
        smartIndent: true,//智能换行
        extraKeys: _extraKeys,
        autofocus: true,
        styleActiveLine: true,
        lint: true,
        gutters: ["CodeMirror-linenumbers", "breakpoints", "CodeMirror-lint-markers"]
    };
    return cmOptions;
}

const mirrorNameModeMap = {
    'JFinal': 'text/x-java',
    'Java': 'text/x-java',
    'Kotlin': 'text/x-kotlin',
    'C/C++' : 'text/x-c++src',
    'MachineLearning': {
                name: "python",
                version: 3,
                singleLineStringErrors: false
    },
    'Python2.7': {
                name: "python",
                version: 3,
                singleLineStringErrors: false
    },
    'Python3.6': {
                name: "python",
                version: 3,
                singleLineStringErrors: false
    },
}
/**
        ---------------------------- END
 */

class RepositoryCodeEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            codeSaving: false
        }
	}
    componentDidUpdate = (prevProps, prevState) => {
        
        if (this.props.fileContent && this.props.fileContent != prevProps.fileContent) {
            // window.setTimeout(() => {
                this.extend_editor.setValue(this.props.fileContent)
            // }, 2000)
        }
    }
    componentDidMount(){
        let cmOptions = createCMOptions(this.props.mirror_name)
        const extend_editor = window.CodeMirror.fromTextArea(window.$('#codemirror-file-edit')[0]
            , cmOptions);

        // tpi没setValue也可以
        extend_editor.setValue('')
        extend_editor.refresh();

        // 拖拽也需要用 ： window.editor_CodeMirror.refresh()
        window.editor_tempCodeMirror = extend_editor;
        this.extend_editor = extend_editor;
    }

    saveCode = () => {
        const { shixunId, pathArray } = this.props;
        const url = `/shixuns/${shixunId}/update_file.json`
        const path = pathArray.join('/')
        this.setState({ codeSaving: true })
        axios.post(url, {
                secret_repository: this.props.secret_repository_tab,
                content: this.extend_editor.getValue(),
                // type: forTest === true ? 1 : 0,
                path: path
            }
        ).then((response) => {
            if (response.data.content) {
                message.success('保存成功');
                this.setState({ codeSaving: false })
            }
        })
    }
    render() {
        const { fileContent, match, saveCode } = this.props;
        const { codeSaving } = this.state;
        return (
            <React.Fragment>

                <div className="tpmComment educontent clearfix mt30">
                    <RepositoryDirectories {...this.props}></RepositoryDirectories>

                    <div className="edu-back-skyblue padding5-10 clearfix">
                        <div className="fl">
                        </div>
                        <div id="file_action" className="recordBanner fr">
                            { codeSaving ? 
                                <a href="javascript:void(0);"
                                    className="fr mt12 mr20 color-grey">保存中...</a>
                            : <Popconfirm title="确定要保存修改后的代码吗?"
                                placement="bottom"
                                onConfirm={() => this.saveCode(this.extend_editor.getValue())}
                                okText="确定" cancelText="取消">
                                {/* onClick={this.saveCode}
                                    onClick={() => saveCode(this.extend_editor.getValue())}
                                */}
                                <a href="javascript:void(0);"
                                    className="fr mt12 mr20 color-blue">保存</a>
                            </Popconfirm> }
                        </div>
                        <div className="cl"></div>
                    </div>

                    <style>
                    {`
                        .repoCMWrapper .CodeMirror {
                            height: 500px;
                        }
                    `}
                    </style>
                    <div className="padding10-20 repoCMWrapper">
                        <textarea className="" id="codemirror-file-edit"
                            style={{display:'none'}}
                            name="content">{fileContent}</textarea>
                    </div>
                </div>

            </React.Fragment>

    );
  }
}
export default RepositoryCodeEditor;
