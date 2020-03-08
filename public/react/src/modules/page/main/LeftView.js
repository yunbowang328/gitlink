import React, { Component } from 'react';

import ContentLoader from 'react-content-loader'

import Tooltip from 'material-ui/Tooltip';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { CircularProgress } from 'material-ui/Progress';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

import CommentContainer from '../../comment/CommentContainer'
import CommentInput from '../../comment/CommentInput'

import ChooseAnswerView from '../component/ChooseAnswerView'

import { withStyles } from 'material-ui/styles';
import { markdownToHTML } from 'educoder'
import AnswerListContainer from './answer/AnswerListContainer'
import './leftView.css'

import CodeEvaluateMultiLevelAnswerUnlock from './CodeEvaluateMultiLevelAnswerUnlock'
import MUIDialogStyleUtil from '../component/MUIDialogStyleUtil'
import moment from 'moment';
// http://danilowoz.com/create-react-content-loader/
const MyLoader = () => (
	<ContentLoader
		height={600}
		width={400}
		speed={2}
		primaryColor={"#000000"}
		secondaryColor={"#ecebeb"}
	>
		<rect x="0" y="10" rx="3" ry="3" width="320" height="6.4" />
		<rect x="0" y="35" rx="3" ry="3" width="85" height="10" />
		<rect x="0" y="60" rx="3" ry="3" width="350" height="6.4" />
		<rect x="0" y="80" rx="3" ry="3" width="350" height="6.4" />
		<rect x="0" y="100" rx="3" ry="3" width="350" height="6.4" />
		<rect x="0" y="120" rx="3" ry="3" width="101" height="6.4" />

		<rect x="0" y="145" rx="3" ry="3" width="65" height="10" />
		<rect x="0" y="170" rx="3" ry="3" width="350" height="6.4" />
		<rect x="0" y="190" rx="3" ry="3" width="350" height="6.4" />
		<rect x="0" y="210" rx="3" ry="3" width="201" height="6.4" />
	</ContentLoader>
)

const styles = MUIDialogStyleUtil.getTwoButtonStyle(
	(theme) => { return {
			iconButton: {
				margin: theme.spacing.unit,
				// background: '#05101A',
				color: '#4CACFF',
				top: '-7px',
				width: '36px',
				height: '36px',
			}
		}
	}
)

// const styles = theme => ();

class LeftView extends Component {

	goToCertification() {
		window.open('/account/certification', '_blank');
	}
//  /shixuns/mnf6b7z3/shixun_discuss?challenge_id=88
  	render() {
  		let { challenge, shixun, tabIndex, tabIndexChange, loading, discusses_count
  				, dialogOpen, handleDialogClose, handleDialogReadAnswer, gameAnswer, loadingComments, st, user,
  				classes, onDrawerButtonClick, lockedAnswers, unlockedAnswers, isMultiLevelAnswer } = this.props

  		let propaedeutics = shixun ? shixun.propaedeutics : null;
  		let _hasAnswer =  challenge.hasAnswer // st === 1 ||
  		// const actions = [
	   //    <Button
	   //      label="取消"
	   //      primary={true}
	   //      onClick={handleDialogClose}
	   //      style={{marginRight: '6px'}}
	   //    />,
	   //    <Button
	   //    	variant="raised"
	   //      label="确定"
	   //      primary={true}
	   //      onClick={handleDialogReadAnswer}
	   //    />,
	   //  ];

			// TODO TEST
			// isMultiLevelAnswer = true
			const is_teacher = user.is_teacher

		 	let contentText = is_teacher ?
				<React.Fragment>
				<p>{`已经过职业认证的教师可以免金币查看答案哟~`}</p>
				<p>{`将扣除${challenge.score}点金币，是否确认查看答案`}</p>
				<p><a onClick={()=>this.goToCertification()}
						style={{textDecoration: 'underline', color: '#4CACFF'}}>立即认证</a></p>
				</React.Fragment>
				:
				<React.Fragment>
				<p>{`先查看参考答案，再通过评测的学生，实训作业有可能是零分哦~`}</p>
				<p>{`将扣除${challenge.score}点金币，是否确认查看答案`}</p>
				</React.Fragment>;

			// 多级别解锁
			if (isMultiLevelAnswer) {
				// power === 0 &&
				contentText =  ( is_teacher ) ?
           		<React.Fragment>
	            	<p>{`已经过职业认证的教师可以免金币查看答案哟~`}</p>
					<p><a style={{textDecoration: 'underline'}} onClick={()=>this.goToCertification()}
							style={{ color: '#1890ff', 'margin-top': '6px', display: 'inline-block'}}>立即认证</a></p>
					<CodeEvaluateMultiLevelAnswerUnlock
						ref="answerUnlock" lockedAnswers={lockedAnswers} unlockedAnswers={unlockedAnswers}
						challenge={challenge}
					>
					</CodeEvaluateMultiLevelAnswerUnlock>
           		</React.Fragment>
              :
            <React.Fragment>
				<p>{`先查看参考答案，再通过评测的学生，实训作业将被扣分`}</p>
				{/* { MultiLevelUnlockTable } */}
				<CodeEvaluateMultiLevelAnswerUnlock
					ref="answerUnlock" lockedAnswers={lockedAnswers} unlockedAnswers={unlockedAnswers}
					challenge={challenge}
				>
				</CodeEvaluateMultiLevelAnswerUnlock>
            </React.Fragment>;
			}

			/**

				{ is_teacher ? <Button size="small" variant="raised" style={{ marginRight: '20px'}}
						onClick={()=>this.goToCertification()} color="primary">
					{ '立即认证' }
				</Button> : ''}
			*/

	    return (
	    	<React.Fragment>
	    		<Dialog
		          	open={dialogOpen}
								disableEscapeKeyDown={true}
		          	onClose={handleDialogClose}
		        >
			       	<DialogTitle id="alert-dialog-title">{"提示"}</DialogTitle>
							<DialogContent id="dialog-content" >
								<DialogContentText id="alert-dialog-description" style={{textAlign: 'center'}}>
									{ contentText }
								</DialogContentText>
							</DialogContent>
		          {/* http://localhost:3000/account/professional_certification */}
							<DialogActions id="dialog-actions">

								<Button onClick={handleDialogClose} color="primary" className={`${classes.button} ${classes.buttonGray}`}>
									取消
								</Button>
								{/* variant={ is_teacher ? "flat" : "raised"}  */}
								<Button size="medium" variant={"raised"}
										className={`${classes.button} `}
										onClick={() => handleDialogReadAnswer(this.refs.answerUnlock ? this.refs.answerUnlock.getSelectedId() : '')}
										color="primary" autoFocus>
									{ is_teacher ? '继续查看' : '确定'}
								</Button>
							</DialogActions>

		        </Dialog>

		      	<div className="-fit -layout-v">

			      	<div className="-layout-v -flex -bg-white -task-ml80">

			      		{/*新界面关卡名称显示、关卡金币显示*/}
			      		<div id="task_name_section" className="task_name_section">

			      			{ loading ? "" :
			      			<React.Fragment>
			      				<Tooltip title={ "点击查看全部任务" } disableFocusListener={true}>
					      			<IconButton color="default" mini={''}  aria-label="edit" className={classes.iconButton}
						      			onClick={onDrawerButtonClick}>
								        <i className={ "fa font-18 fa-list-ul" }></i>
								    </IconButton>
							    </Tooltip>
				      			<h3 className="subject">第{challenge.position}关：{challenge.subject}</h3>
				      			<span className="btn-cir-big fr mt8 mr15">{challenge.score}</span>
			      			</React.Fragment>
			      			}
			      		</div>

			      		<ul id="tab_nav" className="-tab-nav">
					        <li id="tab_nav_1" className={ tabIndex === 0 ? `tab_hover` : ''} onClick={() => tabIndexChange(0)}>
					          <a href="javascript:void(0);" className="tab_type" style={{fontSize: '16px'}}>过关任务</a>
					        </li>
				            {/**/}
				            { propaedeutics && <li id="tab_nav_2"  className={ tabIndex === 1 ? `tab_hover` : ''} onClick={() => tabIndexChange(1)}>
				              <a href="javascript:void(0);" className="tab_type">背景知识</a>
				            </li> }
			                { _hasAnswer && <li id="tab_nav_3" className={ tabIndex === 2 ? `tab_hover` : ''} onClick={() => tabIndexChange(2)}>
			                  <a href="javascript:void(0);" className="tab_type" style={{fontSize: '16px'}}>参考答案</a>
			                </li> }
			                <li id="tab_nav_5" className={ tabIndex === 4 ? `tab_hover` : ''} onClick={() => tabIndexChange(4)}
			                		style={{display: 'none'}}>
			                  	<a href="javascript:void(0);" className="tab_type" style={{fontSize: '16px'}}>TA人解答</a>
			                </li>
					        <li id="tab_nav_4" className={ tabIndex === 3 ? `tab_hover` : ''} onClick={() => tabIndexChange(3)}>
					          <a href="javascript:void(0)" className="tab_type" style={{fontSize: '16px'}} data-remote="true">
					            评论<span id="discusses_count" className="edu-cir-grey1" style={{lineHeight: '18px!important'}}>{discusses_count||""}</span>
					          </a>
					        </li>
					        {/*<span className="btn-cir-big fr mt8 mr15">经验值：{challenge.score}</span>*/}
					    </ul>
					    <div className="cl"></div>
					    <div className="-flex -relative greytab-inner">
					    	{/*过关任务*/}
					    	<div id="tab_con_1" className="tab-info" style={ tabIndex === 0 ? {display: 'block'} : {display: 'none'}  }>
					    		<div className="fit -scroll">
					    			<div className="-layout-v -fit">
					    					{ loading ?
					    						<div className="-flex -scroll task-padding16 panel-box-sizing new_li break_word markdown-body editormd-html-preview"
					    						unselectable="on">
					    							<CircularProgress size={40} thickness={3} className="circularProgress"
					    								style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '40% !important', display: 'block' }}/>
					    						</div> : ""
					    					}

				    						<div className="-flex -scroll task-padding16 panel-box-sizing new_li break_word markdown-body editormd-html-preview"
					    						unselectable="on" id="game_task_pass" style={loading ? {display:'none'} : {}}>
				    						</div>
					    			</div>
					    		</div>
					    	</div>
					    	{/*背景知识*/}
					    	<div id="tab_con_2" className="tab-info" style={ tabIndex === 1 ? {display: 'block'} : {display: 'none'}  }>
					    		<div className="fit -scroll">
						            <div className="-layout-v -fit">
						              	<div className="-flex -scroll task-padding16 panel-box-sizing new_li markdown-body editormd-html-preview" unselectable="on" id="game_ready_knowledge">

						              	</div>
					    			</div>
					    		</div>
					    	</div>
					    	{/*	参考答案*/}
					    	<div id="tab_con_3" className="tab-info" style={ tabIndex === 2 ? {display: 'block'} : {display: 'none'} }>
					    		<div className="fit -scroll">
								  	<div className="-layout-v -fit" style={{ overflowY: 'scroll' }}>
								  		{/*  只读markdown的写法  markdownToHTML 这个接口生成的markdown没有setMarkdown接口
								  		<textarea style={{display:'none'}} id="editorMd_contents" value={gameAnswer}></textarea>*/}


											{ (!unlockedAnswers || unlockedAnswers.length === 0) && (!lockedAnswers || lockedAnswers.length === 0) &&
									    <div className="-flex -scroll task-padding16 panel-box-sizing new_li" id="game_answer_show"
									    		style={{ display: st === 0 ? 'block' : 'none' }}>
									    </div>
											}

											<style>{`
												.multiLevelAnswer {
													margin: 0px 12px;
												}
												.multiLevelAnswer .anwserSection {
													padding: 20px;
													border-bottom: 1px solid #EAEAEA;
												}
												.multiLevelAnswer .df {
													display: flex;
													font-size: 15px;
												}
												.multiLevelAnswer .level {
													color: #9A9A9A;
													flex: 0 0 55px;
												}
												.multiLevelAnswer .name{
													color: #4C4C4C;
													flex: 1;
												}
												.multiLevelAnswer .status{
													color: #CDCDCD;
                        }
                        .multiLevelAnswer .lock-time{
                          margin-right: 15px;
                        }
												.markdown-body ol, .markdown-body ul {
													padding-left: 2.5em;
												}
											`}</style>

											<div className="multiLevelAnswer">
												{ unlockedAnswers && unlockedAnswers.map((item, index) => {
                          const {name, contents, view_time} = item;
													return <div className="anwserSection">
														<div className="df">
															<div className="level">级别{index + 1}：</div>
															<div className="name">{name}</div>
                              <div className="status">
                                <span className="lock-time">{view_time ? moment(view_time).format('YYYY-MM-DD HH:mm') : ''}</span>
                                已解锁
                              </div>
														</div>
														<div className="contents markdown-body" dangerouslySetInnerHTML={{__html: markdownToHTML(contents)}}>
														</div>
													</div>
												})}

												{ lockedAnswers && lockedAnswers.map((item, index) => {
												return <div class="anwserSection">
														<div className="df">
															<div className="level">级别{index + 1 + (unlockedAnswers ? unlockedAnswers.length : 0)}：</div>
															<div className="name">{item.name}</div>
															<div
																className="status" onClick={ () => { this.props.showUnlockAnswerDialog(item) } }
																style={{ color: '#4CACFF', cursor: 'pointer' }}
															>解锁</div>
														</div>
													</div>
												})}

											</div>


									    { st === 1 ?
									    <div className="-flex -scroll task-padding16 panel-box-sizing new_li" id="game_answer_show_choose"
									    		>
									      	<ChooseAnswerView gameAnswer={gameAnswer}></ChooseAnswerView>
									    </div>
									    : ''
									    }
								  	</div>
								</div>
					    	</div>
					    	{/*	TA人解答*/}
					    	<div id="tab_con_5" className="tab-info" style={ tabIndex === 4 ? {display: 'block'} : {display: 'none'} }>
					    		<div className="fit -scroll">
								  	<div className="-layout-v -fit">
								  		<AnswerListContainer {...this.props}></AnswerListContainer>
								  	</div>
								</div>
					    	</div>
					    	<div id="tab_con_4" className="commentTab tab-info commentsDelegateParent" style={ tabIndex === 3 ? {display: 'block'} : {display: 'none'} }>
					    		{ loadingComments ?
							    	<CircularProgress size={40} thickness={3} style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '40%', display: 'block' }}/> :
						    		<CommentContainer {...this.props}></CommentContainer>
						    	}
					    	</div>
					    </div>

					    <div id="mini_comment_section">
					    	{/*说点什么	*/}
					    	<CommentInput challenge={challenge} {...this.props}></CommentInput>
					    </div>
			      	</div>

			    </div>
			</React.Fragment>
	    );
  	}
}
// <textarea style={{display:'none'}}  value={challenge.task_pass ? `${challenge.task_pass}` : ''}></textarea>
// {/*<textarea style={{display:'none'}}  value={propaedeutics ? `${propaedeutics}` : ''}></textarea>*/}
export default withStyles(styles)( LeftView );
