import React, { Component } from 'react';

import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames';

import axios from 'axios';

import { trace_collapse, WordsBtn } from 'educoder'

import { message, Input } from 'antd';


const $ = window.$;


class RepositoryCombinePath extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.secret_dir_path || '',
            isEdit: false,
        }
	}
    
    onSave = () => {
        const { shixunId, pathArray } = this.props;
        const url = `/shixuns/${shixunId}/set_secret_dir.json`
        
        this.setState({ codeSaving: true })
        axios.post(url, {
            secret_dir_path: this.state.value
        }
        ).then((response) => {
            if (response.data) {
                message.success('保存成功');
                this.setState({isEdit: false})
            }
        })
    }
    onChange = (e) => {
        const { value } = e.target;
        this.setState({ value })
    }
    onEdit = () => {
        this.setState({isEdit: true}, () => {
            window.$('.combinePathEditRow input')[0].focus()
        });
    }
    render() {
        const { fileContent, match, saveCode } = this.props;
        const { isEdit, value } = this.state;
        return (
            
            <div className="df combinePathEditRow">
                <style>{`
                    .combinePathEditRow {
                        margin: 4px 0;
                    }
                    .combinePathEditRow input {
                        flex: 0 0 300px;
                        border: none;
                    }
                    .combinePathEditRow .wordsBtn {
                        margin-left: 24px;
                    }
                `}</style>
                <span>第一版本库合并路径：</span>
                <Input disabled={!isEdit} value={value} onChange={this.onChange}></Input>
                {!isEdit && <WordsBtn className="wordsBtn" onClick={this.onEdit} style="blue">修改</WordsBtn>}
                {isEdit && <WordsBtn className="wordsBtn" onClick={this.onSave} style="blue">保存</WordsBtn>}
            </div>


    );
  }
}
export default RepositoryCombinePath;
