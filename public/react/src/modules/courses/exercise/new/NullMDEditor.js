import React, {Component} from 'react';

import {Input, Select, Radio, Checkbox, Popconfirm, message, Modal} from 'antd';

import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import TPMMDEditor from '../../../tpm/challengesnew/TPMMDEditor';
// import "antd/dist/antd.css";

import { getImageUrl, toPath, getUrl } from 'educoder';

import axios from 'axios';


const $ = window.$;
const NULL_CH = '▁'
// const NULL_CH = '〇'
// const NULL_CH = '🈳'

export default class NullMDEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    componentDidMount = () => {
        console.log('hhhhhhhhhhhere')
        
    }
    getChCountBeforeCursor = (cm, cursor) => {
        const currentLine = cursor.line;
        let placeholderCountBefore = 0
        for(let _line = 0; _line < currentLine; _line++) {
            placeholderCountBefore += cm.getLine(_line).split(NULL_CH).length - 1;
        }
        const currentLineStringBeforeCursor = cm.getLine(currentLine).substring(0, cursor.ch)
        placeholderCountBefore += currentLineStringBeforeCursor.split(NULL_CH).length - 1;
        return placeholderCountBefore;
    }
    onCMBeforeChange = (cm, change) => {
        
        const rangeText = cm.getRange(change.from, change.to)
        let totalPlaceholderCount = 0 
        change.text.forEach(item => {
          totalPlaceholderCount += item.split(NULL_CH).length - 1
        })

        if (rangeText && rangeText.indexOf(NULL_CH) != -1) {
            // TODO 计算range里有几个
            const placeholderCountInRange = rangeText.split(NULL_CH).length - 1;
            // TODO 计算range之前有几个
            const placeholderCountBefore = this.getChCountBeforeCursor(cm, change.from)
            console.log(`删除${placeholderCountInRange}个， 之前有${placeholderCountBefore}个，新增${totalPlaceholderCount}个`)

            const ret = window.confirm(`确认要删除第${placeholderCountInRange == 1 ? placeholderCountBefore + 1 
                : `${placeholderCountBefore + 1}-${placeholderCountBefore + placeholderCountInRange}` }个空吗？`)
            if (ret) {
                this.props.onPlaceholderChange
                    && this.props.onPlaceholderChange(placeholderCountBefore, placeholderCountInRange, totalPlaceholderCount)
            } else {
                change.cancel()
            }


            // this.props.confirm({
            //     content:`确认要删除第${placeholderCountInRange == 1 ? placeholderCountBefore + 1
            //       : `${placeholderCountBefore + 1}-${placeholderCountBefore + placeholderCountInRange}` }个空吗？`,
            //     onOk: () => {      this.props.onPlaceholderChange
            //     && this.props.onPlaceholderChange(placeholderCountBefore, placeholderCountInRange, totalPlaceholderCount)
            //     },
            //     onCancel:()=>{
            //         change.cancel()
            //     }
            // })
        } else if (totalPlaceholderCount) {
            const placeholderCountBefore = this.getChCountBeforeCursor(cm, change.from)

            console.log(`新增${totalPlaceholderCount}个，之前有${placeholderCountBefore}个`)
            this.props.onPlaceholderChange 
                && this.props.onPlaceholderChange(placeholderCountBefore, 0, totalPlaceholderCount)

        }
        
    }

    showError = () => {
      this.refs['nullMDEditor'].showError()
    }
    render() {

        let {
            choice_url,
        } = this.state;
        let { mdID, className } = this.props;
        return (
            <TPMMDEditor {...this.props}
                onCMBeforeChange={this.onCMBeforeChange}
                ref='nullMDEditor'
            >    
            </TPMMDEditor>
        )
    }
}



/**
react_mdEditor_question_0.answers_editormd.cm.on('keydown', (r1, r2, r3)=> { 
    debugger; 
    if (r2.keyCode == 8) { 
        var cur = r1.curOp.cm.getCursor();
        var curBefore = {line: cur.line, ch:cur.ch-3};
        var range = r1.curOp.cm.getRange(curBefore, cur);
            if (range == "〔 〕") {
            console.log("bingo");
            r1.curOp.cm.replaceRange("", {line: cur.line, ch:cur.ch-2}, cur);
        }
    }
})

react_mdEditor_question_0.answers_editormd.cm.on('beforeChange', (cm,change) => {
    debugger;
    change.cancel();

    react_mdEditor_question_0.answers_editormd.cm.getRange(change.from, change.to)
    // TODO 计算range里有几个
    // TODO 计算range之前有几个
});


 */