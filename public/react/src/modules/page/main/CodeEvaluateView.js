import '../VNC.css';
import React, { Component } from 'react';

import Tooltip from 'material-ui/Tooltip';
 
import { connect } from 'react-redux';
import './CodeEvaluateView.css';
import { CircularProgress } from 'material-ui/Progress';
import { on, off } from 'educoder'
import actions from '../../../redux/actions';
const testSetsExpandedArrayInitVal = [false, false, false, false, false, 
									 false, false, false, false, false, 
									 false, false, false, false, false, 
									 false, false, false, false, false]

const $ = window.$;
const TAB_INDEX_WEB_DISPLAY = 0;
const TAB_INDEX_EVALUATE_RESULT_INDEX = 1

class CodeEvaluateView extends Component {

	constructor(props) {
		super(props)
		
		this.onEvaluateViewExpand = this.onEvaluateViewExpand.bind(this)

		this.state = {
			// TODO 最多20个测试集？
			testSetsInitedArray:  testSetsExpandedArrayInitVal.slice(0),
			
			evaluateViewExpanded: false,

			tabIndex: 1,
		}
	}

	componentDidMount() {
		const { challenge } = this.props;

		on('showWebDisplayEvent', () => {
			if (challenge.isHtml) {
				this.setState({
					tabIndex: TAB_INDEX_WEB_DISPLAY
				})
			}
		})

		if (challenge.isHtml === true) {
			this.tabIndexChange(TAB_INDEX_WEB_DISPLAY)
		}

	}
	componentWillUnmount() {
		off('showWebDisplayEvent')
	}

	componentWillReceiveProps(newProps, newContext) {
		if (this.props.game && newProps.game && (newProps.game.id !== this.props.game.id 
				|| newProps.gameBuilding !== this.props.gameBuilding )) { // 切换game时重置state
			if (newProps.gameBuilding === false) {
				// 清空codemirror的内容，TODO最好调用codemirror的销毁方法
				$('#evaluating_contents .result_different_show').html('')		
				this.setState({
					tabIndex: TAB_INDEX_EVALUATE_RESULT_INDEX
				})
			}
			this.setState({
				testSetsInitedArray:  testSetsExpandedArrayInitVal.slice(0),
			})
			if (newProps.game.id !== this.props.game.id) {
				if (this.props.challenge.isHtml === true) {
					this.tabIndexChange(TAB_INDEX_WEB_DISPLAY)
				}
			}
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		// 通关后重置为0
		if (!prevProps.currentGamePassed && this.props.currentGamePassed === true) {
			this.tabIndexChange(TAB_INDEX_WEB_DISPLAY)
		}
	}
	

	tabIndexChange(index) {
		this.setState({tabIndex: index});
	}

	onTestSetHeaderClick(index) {
		const { output_sets, power, game } = this.props;
		const { test_sets_array } = output_sets;

		const { testSetsInitedArray } = this.state;

		// TODO 评测了以后，测试集会变化，
		var current_test_set = test_sets_array[index];
		if (!current_test_set.output) {
			current_test_set.output = ''
		}
		// 优化，但是会增加代码复杂度 
		if (( game.test_sets_view === true || power == 1 || current_test_set.is_public == 1 ) && testSetsInitedArray[index] === false ) {		// 如果测试集没有初始化过（如果重新评测了，都需要重新初始化）
			const id    = "result_different_show_" + index;

			var mv = window.CodeMirror.k_init(id, current_test_set.actual_output || "", current_test_set.output);

			
			var height=0;
			// 以前的代码用不了，2个pane的高度都是300
            // if($("#"+id).find(".CodeMirror-merge-pane").eq(0).height()>$("#"+id).find(".CodeMirror-merge-pane").eq(1).height()){
            //     height = parseInt($("#"+id).find(".CodeMirror-merge-pane").eq(0).height());
            // }else{
            //     height = parseInt($("#"+id).find(".CodeMirror-merge-pane").eq(1).height());
            // }
            var lineNumber = Math.max( current_test_set.output.split('\n').length
            		, (current_test_set.actual_output ? current_test_set.actual_output.split('\n').length : 1 ))

			height = lineNumber * 19 + 25;
			console.log('height ', height)
            $("#"+id).find(".CodeMirror").height(height);
            $(".CodeMirror-merge-gap").find("svg").css("height", height);
            // 取真实高度
            $(".CodeMirror-merge-gap").css("height", $('.CodeMirror-merge-pane.CodeMirror-merge-editor').height());
            setTimeout(()=>{	// 解决第一次打开时高度不准的问题
            	$('#game_test_set_results .CodeMirror-merge').css('display', 'flex')
            }, 100)
            // refresh一下，解决CM显示不全的问题
            mv.edit.refresh()
			mv.right.orig.refresh()			
			testSetsInitedArray[index] = true;
		}

		this.props.onTestSetHeaderClick(index)
		this.setState({
			testSetsInitedArray,
		})
	}
	goToCertification() {
		window.open('/account/certification', '_blank');
	}
	renderTestSets() {
		const { output_sets, testSetsExpandedArray, power, allowed_unlock, testSetUnlock, showDialog, challenge, game, user } = this.props;
		const { testSetsInitedArray } = this.state;
		
		const { test_sets_array, test_sets_count, had_test_count, test_sets_hidden_count, test_sets_public_count
			, had_passed_testsests_error_count, had_passed_testsests_hidden_count, had_passed_testsests_public_count } = output_sets;

		const testSetsComponentArray = []

		if (!test_sets_array) {
			console.error('no test_sets_array error')
			return ''
		}
		test_sets_array.forEach( (item, index) => {
			// function toggle_test_case(open, output, actual_output, id, power){
				// onclick={toggle_test_case(1, output, actual_output, 0, true)}

			const isExpanded = testSetsExpandedArray[index]

			let headIconClass = '';
			let _headLockIconClass = '';

			if (item.is_public == 0) {
				if (game.test_sets_view === true || power === 1){
					_headLockIconClass = 'fas fa-unlock-alt'
				} else {
					_headLockIconClass = 'fa-lock'
				}
			}

			if (item.result == true) {
				headIconClass = 'fa-check-circle color-light-green font-16'
			} else if (item.result == false) {
				headIconClass = 'fa-exclamation-circle -text-danger'
			}
			
			testSetsComponentArray.push(
				<div className="-task-ces-top clearfix" onClick={ this.onTestSetHeaderClick.bind(this, index) }
						style={{cursor:'pointer', 'margin-top':index == 0 ? '4px' : ''}} key={index+'-0'}>
					<p className="clearfix">
						<i className={`fa ${ 'fa-caret-right'} mr8 font-16`}
						style={isExpanded ? {transform: 'rotate(90deg)'} : {}}></i>
						<span className="font-14">测试集 {index + 1}</span>
						
						{ headIconClass && <i className={`fa ${ headIconClass } fr mt2 ml5 font-16`}></i> }
						{ _headLockIconClass && <i className={`fa ${ _headLockIconClass } fr mt2 ml5 font-16`}></i> }

						{ !!item.ts_mem && <span className="fr description">消耗内存{item.ts_mem}MB</span> }		
						{ !!item.ts_mem && !!item.ts_time && <span className="split"></span> }				
						{ !!item.ts_time && <span className="fr description">代码执行时长：{item.ts_time}秒</span> }
						
					</p>
				</div>
			)
			
			// 
			let contentText = (power === 0 && user.is_teacher) ? 
				<React.Fragment>
					<div>{`已经过职业认证的教师可以免金币查看隐藏测试集。`}</div>
					<div>{`解锁本关所有测试集需要扣除${challenge.score*5}金币，确定要解锁吗？`}</div>
					<div onClick={()=>this.goToCertification()} style={{color: '#4CACFF', cursor: 'pointer', 'text-decoration': 'underline'
							, 'margin-top': '12px'}}>立即认证</div>
				</React.Fragment> :
				<React.Fragment>
					<div>{`解锁本关所有测试集需要扣除${challenge.score*5}金币`}</div>
					<div>{`确定要解锁吗？`}</div>
				</React.Fragment> 

			const moreButtonsRender = () => {
				return ''
				// ${this.props.classes.button}
				// return (power === 0 && user.is_teacher) ? (
				// 	<Button variant="raised" style={{ marginRight: '20px'}} className={``}
			    //         		onClick={()=>this.goToCertification()} color="primary"> 
			    //         { '立即认证' }
		        //     </Button> 
				// 	) : ''
			}
			testSetsComponentArray.push(
				<div className="-task-ces-box mb10 clearfix tabContent" key={index+'-1'}>
					<div className="-task-ces-info" style={ isExpanded ? {display:'block'} : {display:'none'}} id={`test_case_${index}`}>
						{
							(game.test_sets_view === true || power == 1 || item.is_public == 1) ?
							(
                            <React.Fragment>
                            	{ item.input ?
                                <div className="pl20 pb5 -task-testline">
                                    <div className="clearfix df inputTitle" style={{lineHeight: 1.5}}>
                                        <span className="fl fb color-grey">测试输入：</span>

                                        <div className="fl color-blue input" style={{flex:1,overflow: 'hidden',textOverflow: 'ellipsis',
    whiteSpace: 'nowrap', marginRight: '15px'}} 
											// dangerouslySetInnerHTML={{__html: (item.input.replace(/\r\n/g,"</br>"))}}

										>
											{item.input}
										</div>

                                    </div>
                                </div>
                                : "" }
                                <div className="clearfix" className="outputTitle">
                                    <p className="fl with52">- 预期输出 -</p>
                                    <p className="fl with48 pl5" style={{boxSizing:'border-box'}}>- 实际输出 -</p>
                                </div>
                            </React.Fragment>
							) : 
							<p className="color-orange -task-testline pl20 " style={{ 'padding-bottom': '8px' }}>
								{ !allowed_unlock ? '隐藏测试集，暂不支持解锁和查看。' : '此为隐藏测试项。'}
								{ (power === 0 && allowed_unlock == true) ? <a href="javascript:void(0)" className="color_white test_set_data" 
									onClick={()=>showDialog({ contentText, callback: testSetUnlock , moreButtonsRender})} 
									style={{"textDecoration": "underline"}}>解锁</a> : '' }
							</p>
						}

					</div>

					{/*测试集已解锁||管理员||公开的测试集||TODO应该是全通过时 已通过的测试集*/}
					{
						(game.test_sets_view == true || power == 1 || item.is_public == 1 || !!item.result === true) ?
						<div className="result_different_show" id={`result_different_show_${index}`} style={ (!testSetsInitedArray[index] || isExpanded) ? {display:'block'} : {display:'none'}}></div>
							: ""
					}

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

	onHandleTestCase () {
		// console.log(this);
		const {showOrHide, showOrHideTpiTestCase} = this.props;
		showOrHideTpiTestCase(!showOrHide);
	}

	handleShowTestCase () {
		// console.log('111111111');
		const {isCollapse, isCollpaseTsetCase, showOrHideTpiTestCase} = this.props;
		isCollpaseTsetCase(!isCollapse);
		if (isCollapse) {
			showOrHideTpiTestCase(false);
		}
	}

  	render() {
  		const { evaluateViewExpanded, tabIndex } = this.state;
  		const { output_sets, latest_output, record, challenge, gameBuilding, myshixun, showOrHide, isCollapse } = this.props;

		if (!output_sets) {
			return (
				<div>loading</div>
			)
		}
		
		const { test_sets, test_sets_count, had_test_count, test_sets_hidden_count, test_sets_public_count
			, had_passed_testsests_error_count, had_passed_testsests_hidden_count, had_passed_testsests_public_count } = output_sets;
		
		
		/*
			<a href="javascript:void(0);" data-tip-left="展开" className="fr mt10 mr15" onClick={this.onEvaluateViewExpand} id="valuation_extend_and_zoom">
				  	<i className="fa fa-expand font-16 color-grey"></i>
				  </a>


			<li className="blacktab_con" onclick="check_tab('blacktab_con','blacktab_hover',this);">
				    <a href="javascript:void(0);" className="tab_type tab_color">评测信息</a>
				  </li>

				  onclick="check_tab('blacktab_con','blacktab_hover',this);"
		*/

		const _arrowClasses = isCollapse ? 'iconfont icon-xiajiantou btn-arrow' : 'iconfont icon-shangjiantou btn-arrow';

	    return (
	    	<React.Fragment>
		    	<ul id="blacktab_nav">
						<li className="blacktab_con undis" >
						</li>
						{ challenge.isHtml ? 
						<li className={`blacktab_con ${ tabIndex === 0 ? 'tab_hover' : ''}`} onClick={() => this.tabIndexChange(0)}>
							<a href="javascript:void(0);" className="tab_type tab_color">效果显示</a>
						</li> : ''}
						<li className={`blacktab_con ${ tabIndex === 1 ? 'tab_hover' : ''}`} onClick={() => this.tabIndexChange(1)}>
							<a href="javascript:void(0);" className="tab_type tab_color">测试结果</a>
						</li>
						{this.props&&this.props.vnc_url?<li className="blacktab_con_abs">
							<span className="code_evalute_icon" onClick={() => this.handleShowTestCase()}>
								<span className={_arrowClasses}></span>
							</span>
						</li>:""}
							
							{this.props.inDrawer ? <Tooltip id="tooltip-icon-expand" title={ showOrHide ? "收起" : "展开"}>
								{/*TODO 按钮大小改造，css*/}
								{/* icon-guanbi */}
								{/* <a className="iconButton fr mr15 mt4" onClick={this.props.hideCodeEvaluate} id="extend_and_zoom" >
									<i className={  "font-18 iconfont icon-guanbi" }></i>
								</a> */}
								<a style={{ display: isCollapse ? 'inline-block' : 'none'}} className="iconButton fr mr15" id="extend_and_zoom" onClick={() => this.onHandleTestCase()}>
									<i className={ showOrHide ? "font-18 iconfont icon-shousuo" : "iconfont icon-zhankai font-18" }></i>
								</a>
								
							</Tooltip> : <Tooltip id="tooltip-icon-expand" title={ evaluateViewExpanded ? "收起" : "展开"}>
								{/*TODO 按钮大小改造，css*/}
								
								<a className="iconButton fr mr15" onClick={this.onEvaluateViewExpand} id="extend_and_zoom" >
									<i className={ evaluateViewExpanded ? "font-18 iconfont icon-shousuo" : "iconfont icon-zhankai font-18" }></i>
								</a>
								
							</Tooltip>}
						
						<div className="cl"></div>
					</ul>


				<CircularProgress size={40} thickness={3} 
						style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '10%', display: gameBuilding ? 'block': 'none' }}/>
				<div id="evaluateMiddleStatusText" style={{
						marginTop: "4px",
						textAlign: "center",
						color: "#4CACFF",
						display: gameBuilding ? 'block': 'none'
					}}
				></div>

				<div id="game_test_set_results" className="-flex -relative blacktab-inner"
					style={{ display: gameBuilding ? 'none': 'block' }}>
						
					<React.Fragment>
						<div id="blacktab_con_1" className="htmlContainer" style={ (challenge.isHtml && tabIndex === 0) ? {display: 'block'} : {display: 'none'}  }> 
							<form id="html_form" method="post" target="myFrame" action={`/api/myshixuns/${myshixun.identifier}/html_content.html`}>
								<input type="hidden" name="contents" id="data_param" value=""></input>
								<input type="hidden" name="educodercss" id="data_css_param" value=""></input>
								<input type="hidden" name="educoderscript" id="data_js_param" value=""></input>
							</form>
							<iframe id="htmlIframe" frameBorder="0" name="myFrame" style={{background: '#fff', height: '100%', width: '100%'}} >
								
	        				</iframe> 
						</div>
						<div id="blacktab_con_2" className=" " style={ tabIndex === 1 ? {display: 'block'} : {display: 'none'}  }>
							<div className="fit -scroll">
								<div className="-layout-v -fit paddingbottom60tpm">
									<div className="-flex -scroll task-padding16 loading-center undis" id="evaluating_ajax_loading"></div>
									<div className="-flex -scroll task-padding16" id="evaluating_contents">
										{/*
											record ?  <span className="fr mr5 tab_color">本次评测耗时：{ record }秒 </span> : ""
										*/}
										{ had_test_count === 0 || test_sets_count == null ? <div></div> :
											had_passed_testsests_error_count === test_sets_count ?
											<p className="color-light-green mb10 evaluateResult" >
												<i className="fa fa-check-circle font-16"></i>
												<span className="ml5 mr5">{test_sets_count}/{test_sets_count}</span> 全部通过
											</p> : 
											<p className="-text-danger mb10 evaluateResult">
												<i className="fa fa-exclamation-circle font-16"></i>
												<span className="ml5 mr5 -text-danger">{had_passed_testsests_error_count}/{test_sets_count}</span> 
												{/*.replace(/\\u/gi, '%u') unicode转码 */}
												{latest_output ? 
													<span dangerouslySetInnerHTML={{__html: latest_output.replace(/\\r/g,'')}}></span> 
														: ""}
											</p>
										}
										{this.renderTestSets()}
									</div>
								</div>
							</div>
						</div>
					</React.Fragment>
				</div>
			</React.Fragment>
	      	
	    );
  	}
}

const mapStateToProps = (state) => {
	const { showOrHide, isCollapse } = state.tpiReducer;
	return {
		showOrHide,
		isCollapse
	}
};
const mapDispatchToProps = (dispatch) => ({
	showOrHideTpiTestCase: (flag) => dispatch(actions.showOrHideTpiTestCase(flag)),
	isCollpaseTsetCase: (flag) => dispatch(actions.isCollpaseTsetCase(flag))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CodeEvaluateView);
