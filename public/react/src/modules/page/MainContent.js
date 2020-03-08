import React, { Component } from 'react';

import ActionView from './main/ActionView';

import LeftViewContainer from './main/LeftViewContainer';


import CodeRepositoryViewContainer from './main/CodeRepositoryViewContainer';
import CodeEvaluateView from './main/CodeEvaluateView';

import ChooseRepositoryView from './main/ChooseRepositoryView';
import ChooseEvaluateView from './main/ChooseEvaluateView'

import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import VNCContainer from './VNCContainer'
import { connect } from 'react-redux';

import './tpiPage.css';
import './tpiPageForMobile.css';
import actions from '../../redux/actions';
const $ = window.$;
class MainContent extends Component {
	constructor(props) {
		super(props)
		this.chooseQ = React.createRef();
	}
	chooseQfun = (Ref) => {
		this.chooseQ = Ref;
	}
	componentDidMount() {
		// ios下图标位置有问题
		this.props.mainContentfun(this)
		setTimeout(()=>{
			if (window.$('.b-label>.resize-helper').position().top < 100) {
				window.$('.b-label>.resize-helper').css('top', '200px')
			}
    }, 4000)
    $("body").css("padding-right","0px!important")
	}
	onResizeButtonClick = () => {
		// console.log('onResizeButtonClick')
	}
	onRunCodeTest = () => {
		const {onRunCodeTest, isCollpaseTsetCase} = this.props;
		const vncContainer = this.refs['vncContainer']
		if (vncContainer) {
			vncContainer.showCodeEvaluate  && vncContainer.showCodeEvaluate()
		}
		// console.log('1111111111');
		// this.props.onRunCodeTest();
		isCollpaseTsetCase(true);
		onRunCodeTest();
	}
	hideCodeEvaluate = () => {
		const vncContainer = this.refs['vncContainer']
		if (vncContainer) {
			// console.log('点击的关闭按钮')
			vncContainer.onBottomDrawerClose  && vncContainer.onBottomDrawerClose()
		}
	}
  	render() {
		const onRunCodeTest = this.onRunCodeTest
  		const { challenge, output_sets, latest_output, record, st, readRepoTimeout,
  				onTestSetHeaderClick, loading, codeLoading, shixun, vnc_url} = this.props

  		// if (output_sets && output_sets.test_sets) {
  		// 	const test_sets_array = JSON.parse("[" + output_sets.test_sets + "]");
  		// 	output_sets.test_sets_array = test_sets_array;
  		// }

  		var games_repository_contents_style;
  		if (st===1) {
  			games_repository_contents_style = {overflow: 'auto', height: '445px', backgroundColor: '#111C24'}
  		} else {
  			games_repository_contents_style = {overflow: 'hidden', height: '445px'}
  		}
		const newProps = Object.assign({}, this.props);
		delete newProps.testSetsExpandedArray

		const showIframeContent = shixun && shixun.vnc == true

	    return (
	      	<div className="page--body -margin-t-64 -flex tpi_content">
			  	<style>{`
				  	body {
						font-family: 微软雅黑,宋体 !important;
						overflow: hidden !important;
					}
					.can-drag {
						width: 100%;
						height: 100%;
						z-index: 100;
						position: fixed;
						cursor: col-resize;
						top: 0px;
					}
				`}</style>
		      	<div className="-layout -stretch -fit labelN" id="game_show_content">
		      		<div className="split-panel--first -layout -vertical -flex -relative -flex-basic40"
		      			id="game_left_contents" style={{ width: '40%'}}>
						{/*  style={{width: '694px'}} */}

		      			{/* 左侧任务说明等功能的区域 */}
		      			<LeftViewContainer {...newProps}></LeftViewContainer>
		      		</div>
					{showIframeContent && vnc_url && <div id="can-drag" className="can-drag" style={{display: 'none'}}></div>}
		      		<div className="b-label -layout" style={{left: '687px'}}>
		      			<div className="resize-helper ">
		      				<Button variant="fab" aria-label="Swap" mini onClick={this.onResizeButtonClick}>
		      					<svg style={{ marginTop: '1px'}} width="16" height="13" viewBox="0 0 16 13"><path d="M12.245 7.53H5.647v1.882h6.598v2.823L16 8.471l-3.755-3.765V7.53zM10.353 4.706H3.755v2.823L0 3.765 3.755 0v2.824h6.598v1.882z"></path></svg>
							</Button>
		      			</div>
		      		</div>

		      		<div className="split-panel--second -layout -vertical -flex -relative -flex-basic50"
		      			id="game_right_contents" style={{width: '996px'}}>
		      			{/* 旧版本、评测等待提示--更新提示块*/}
		      			{/*<div className="tip-panel-animate clearfix user_bg_shadow bor-grey-e">
						    <div className="fl tip-img">
						      <img src="/images/bigdata/logo-1.png"></img>
						    </div>
						    <div className="fl pr tip-right-con" id="update_game_tip"></div>
						</div>*/}

						{ showIframeContent && vnc_url ? 
						<CodeRepositoryViewContainer { ...this.props } isOnlyContainer={true}>
							<VNCContainer
								ref="vncContainer"
								vnc_url={vnc_url}
								{...this.props}
								codeEvaluate={
									<div id="games_valuation_contents">
										<CodeEvaluateView output_sets={output_sets} latest_output={latest_output}
											record={record} onTestSetHeaderClick={onTestSetHeaderClick} 
											{...this.props} inDrawer={true}
											hideCodeEvaluate={this.hideCodeEvaluate}
											></CodeEvaluateView>
									</div>
								}
							></VNCContainer>
							<div id="actionView" className="-layout-h -center -bg-grey-90 -grey-20 -bg-darkblack">
								<ActionView  {...this.props}
									onRunCodeTest={onRunCodeTest}
								></ActionView>
							</div>
						</CodeRepositoryViewContainer>
						:
						<React.Fragment>

		      			<div className="-layout-v -flex">
    						<div className="-flex -relative">
    							<div className="split-panel -fit -vertical" id="games_repository_valuation">
						            <div className="-layout -stretch -fit -vertical centerH">
						              	<div className="-layout -vertical -flex -relative -flex-basic70 -bg-weightblack"
						              		id="games_repository_contents" style={games_repository_contents_style} >

															{/* 选择题或编程题 */}
															{/* readRepoTimeout 如果读取代码超时，显示重新加载按钮，重新拉取代码 */}
					              		 	{
						              		 	st === 0
													?
						              			<React.Fragment>
												  	<div style={{display: (codeLoading ? 'block' : 'none'), textAlign: 'center'}}>
														<CircularProgress size={40} thickness={3}
															style={{  marginLeft: 'auto', marginRight: 'auto', marginTop: '18%' }}/>
														<span style={{color: '#ddd', display: 'block'}}>正在加载中，请稍后...</span>
													</div>
						              				<div style={{ display: (codeLoading ? 'none' : 'block') }}>
						              					<CodeRepositoryViewContainer { ...this.props } ></CodeRepositoryViewContainer>
						              				</div>
						              			</React.Fragment>
						              			: <ChooseRepositoryView ref="chooseQ" chooseQfun={(ref)=>this.chooseQfun(ref)}{ ...this.props }></ChooseRepositoryView>
						              		}

						              		{/* */}
						              	</div>
						              	<div className="h-center" style={{top: '438px'}}>
							                {/*<div className="-changebg -bg-weightblack" id="-bg-change-color"></div>*/}
							            </div>
							            <div className="split-panel--second -layout -vertical -flex -relative -bg-black -flex-basic60"
							            	id="games_valuation_contents" style={{height: '258px', minHeight: '85px'}}>
							            	{/* 测试结果、评测信息区域 */}
							            	{ loading ? <CircularProgress size={40} thickness={3} style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '10%', display: 'block' }}/>
							            		:
								            		st === 0
							              			? <CodeEvaluateView output_sets={output_sets} latest_output={latest_output}
							              					record={record} onTestSetHeaderClick={onTestSetHeaderClick} {...this.props}></CodeEvaluateView>
							              			: <ChooseEvaluateView {...this.props}></ChooseEvaluateView>
						              		}
							            </div>
						            </div>
						        </div>
    						</div>
    					</div>

							<div id="actionView" 
								style={{ position: 'absolute', width: '100%', bottom: '0', height: '51px'}}
								className="-layout-h -center -bg-grey-90 -grey-20 -bg-darkblack">
    						<ActionView  {...this.props} onRunCodeTest={onRunCodeTest}></ActionView>
    					</div>

						</React.Fragment>
						}
		      		</div>
		      	</div>
		    </div>
	    );
  	}
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
	isCollpaseTsetCase: (flag) => dispatch(actions.isCollpaseTsetCase(flag))
});

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(MainContent);
