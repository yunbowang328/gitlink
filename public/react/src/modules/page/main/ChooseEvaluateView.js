import React, { Component } from 'react';

import Tooltip from 'material-ui/Tooltip';

import { CircularProgress } from 'material-ui/Progress';

import './ChooseEvaluateViewnew.css';

class ChooseEvaluateView extends Component {

	constructor(props) {
		super(props)

		this.onEvaluateViewExpand = this.onEvaluateViewExpand.bind(this)
		this.state = {
			evaluateViewExpanded: false,
		}
	}

	componentDidMount() {
		// request
	}


	renderTestSets() {
		const { choose_test_cases, testSetsExpandedArray } = this.props;
		const { test_sets, had_submmit } = choose_test_cases;

		const testSetsComponentArray = []

		test_sets.forEach( (item, index) => {

			const isExpanded = testSetsExpandedArray[index]

			testSetsComponentArray.push(
				<div className="-task-ces-top clearfix" onClick={ () => this.props.onTestSetHeaderClick(index) }
						style={{cursor:'pointer'}} key={index+'-0'}>
					<p>
					<i className={`fa ${ 'fa-caret-right'} mr5 font-16`} 
						style={isExpanded ? {transform: 'rotate(90deg)'} : {}}></i>
					<span className="font-14">题目 {index + 1}</span>
					<i className={`fa  ${
							choose_test_cases.had_submmit === false ?
							'fa-lock'
							:
							(
							item.result === false 
							? 'fa-exclamation-circle -text-danger' 
							: 'fa-check-circle color-light-green font-16') } fr mt8 ml5 `}></i>
					</p>
							
				</div>
			)
			testSetsComponentArray.push(
				<div className="-task-ces-box mb15 clearfix" key={index+'-1'}>
					<div className="-task-ces-info" style={ isExpanded ? {display:'block'} : {display:'none'}} id={`test_case_${index}`}>
						{!had_submmit ? 
			                	<ul className=" font-14">
			                        <li><span className="ml30">尚未提交，暂不支持查看</span></li>
			                	</ul>
			                : 	item.result === true ? 
							<ul className=" font-14">
		                        <li><span className="-task-ces-info-left color-blue">正确选项：</span><span>{item.standard_answer}</span></li>
		                        <li><span className="-task-ces-info-left color-blue">你的选项：</span><span className="color-orange">{item.actual_output}</span></li>
			                </ul>
			                	:
			                	<ul className=" font-14">
			                        <li><span className="-text-danger ml30">错误，不支持查看</span></li>
			                	</ul>
			            }
					</div>
				</div>
			)
		})
		return testSetsComponentArray;
	}

	onEvaluateViewExpand() {
		window.valuation_extend_and_zoom();
		this.setState({
			evaluateViewExpanded: !this.state.evaluateViewExpanded
		})
	}



  	render() {
  		const { evaluateViewExpanded } = this.state;
  		const { choose_test_cases, latest_output, record, loading, gameBuilding } = this.props;
		
		const { choose_correct_num, challenge_chooses_count, had_submmit } = choose_test_cases;
		
		
		/*
			<IconButton iconClassName={ evaluateViewExpanded ? "fa font-16 color-grey fa-compress" : "fa fa-expand font-16 color-grey"} onClick={this.onEvaluateViewExpand} 
				  		className="fr mt10 mr15" tooltip={ evaluateViewExpanded ? "收起" : "展开"}/>
		*/
	    return (
	    	<React.Fragment>
		    	<ul id="blacktab_nav">
				  	<li className="blacktab_con undis" >
				  	</li>
				  	<li className="blacktab_con blacktab_hover" >
				    	<a href="javascript:void(0);" className="tab_type tab_color">测试结果</a>
				  	</li>
				  
				  	
				  
				  	<Tooltip id="tooltip-icon-expand" title={ evaluateViewExpanded ? "收起" : "展开"}>
				  		{/*TODO 按钮大小改造，css*/}
					  	
					  	<a onClick={this.onEvaluateViewExpand} className="fr mr15 iconButton" id="extend_and_zoom">
					  		<i className={ evaluateViewExpanded ? "font-18 iconfont icon-shousuo" : "iconfont icon-zhankai font-18" }></i>
					  	</a>
					  	
			  		</Tooltip>

				  	<div className="cl"></div>
				</ul>

				<div id="game_test_set_results" className="-flex -relative blacktab-inner">
					{ gameBuilding ? 
						<CircularProgress size={40} thickness={3} style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '10%', display: 'block' }}/>
						: 
					<React.Fragment>
					<div id="blacktab_con_1" className="">
					
					</div>
					<div id="blacktab_con_2" className=" ">
						<div className="fit -scroll">
							<div className="-layout-v -fit paddingbottom60tpm">
								<div className="-flex -scroll task-padding16 loading-center undis" id="evaluating_ajax_loading"></div>
								<div className="-flex -scroll task-padding16" id="evaluating_contents">
									{/*
										record ?  <span className="fr mr5 tab_color">本次评测耗时：{ record }秒 </span> : ""
									*/}
								
									{
										challenge_chooses_count === choose_correct_num  ?
										<div></div>
										:
										( had_submmit === true ? 
										<p className="-text-danger mb10">
					                    	<i className="fa fa-exclamation-circle font-16"></i>
					                    	<span className="ml5 mr5 -text-danger">{choose_correct_num}/{challenge_chooses_count}</span>
					                    	共有{challenge_chooses_count}题，其中有{challenge_chooses_count - choose_correct_num}题结果不匹配。详情如下：
					                  	</p> : '')
									}
									{this.renderTestSets()}
								</div>
							</div>
						</div>
					</div>
					</React.Fragment> }
				</div>
			</React.Fragment>
	      	
	    );
  	}
}

export default ChooseEvaluateView;
