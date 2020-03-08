import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { Radio } from 'antd';



class CodeEvaluateMultiLevelAnswerUnlock extends Component {

	constructor(props) {
		super(props)
		this.state = {
            currentLevel: 0
        }
        
	}

	componentDidMount() {
	}
    getSelectedId = () => {
        return this.state.currentAnswerId
    }
    onLevelClick = (item, index) => {
        this.setState({
            currentLevel: index,
            currentAnswerId: item.id
        })
    }

	render() {
  		const {  shixun, challenge, lockedAnswers, unlockedAnswers } = this.props;
  		const {  currentLevel } = this.state;
	    return (
	      	<div className="answerMultiLevelUnlock">
                <style>{`
                    #tpi-dialog #alert-dialog-title {
                        margin-bottom: 0px;
                    }
                    .answerMultiLevelUnlock {
                        margin-top: 16px;
                    }
                    .answerMultiLevelUnlock .tableRow {
                        display: flex;
                        width: 500px;
                        font-size: 14px;
                        padding-left: 10px;
                        padding-bottom: 3px;
                    }
                    .answerMultiLevelUnlock .twoSpanCol {
                        flex: 0 0 40px;
                    }
                    .answerMultiLevelUnlock .fourSpanCol {
                        flex: 0 0 80px;
                    }
                    .answerMultiLevelUnlock .autoCol {
                        flex: 1
                    }

                    .answerMultiLevelUnlock .tableContentRow {
                    }
                    .answerMultiLevelUnlock .goldColor {
                        color: #FF6800
                    }
                    .multiAnswerTableContent {
                        padding-top:6px;
                        padding-bottom: 20px;
                        min-height: 100px;
                        background: #F4FAFF;
                        
                    }
                `}</style>
                <div className=" tableRow">
                    <div className="twoSpanCol"></div>
                    <div className="twoSpanCol">级别</div>
                    <div className="autoCol">名称</div>
                    <div className="fourSpanCol">扣分占比</div>
                    <div className="fourSpanCol">扣减金币</div>
                </div>
                
                <div className="multiAnswerTableContent">
                { lockedAnswers.map( (item, index) => {
                    return (
                        <div className="tableContentRow tableRow">
                            <div className="twoSpanCol" >
                                <Radio onClick={() => this.onLevelClick(item, index)} 
                                    checked={currentLevel>=index}></Radio>
                            </div>
                            <div className="twoSpanCol">{index + 1 + (unlockedAnswers && unlockedAnswers.length || 0) }</div>
                            <div className="autoCol">{item.name}</div>
                            <div className="fourSpanCol">{item.score}%</div>
                            <div className="fourSpanCol goldColor">{challenge.score * item.score / 100}</div>
                        </div>
                    )
                }) }
                </div>
            </div>
	    );
  	}
}

export default ( CodeEvaluateMultiLevelAnswerUnlock );
