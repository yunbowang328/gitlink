import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { CircularProgress } from 'material-ui/Progress';
import moment from 'moment';
import Rate from 'rc-rate';

import 'rc-rate/assets/index.css';
import './TaskList.css'

import classNames  from 'classnames'
class TaskList extends Component {

  	onChange() {

  	}
  	renderTasks() {
  		const { challenges, challenge, shixun, onChallengesDrawerClose, myshixun_manager } = this.props;
      const currentChallenge = challenge;
  		const taskArray = challenges.map( (challenge, index) => {
  			challenge.experience = challenge.get_experience
  			challenge.gold = challenge.get_gold
  			challenge.subject = challenge.name
        const {finished_time, view_answer_time} = challenge;
  			const showExp = (challenge.experience > 0 && challenge.status === 2) ? '+' + challenge.experience : challenge.experience
  			const showGold = (challenge.gold > 0 && challenge.status === 2) ? '+' + challenge.gold : challenge.gold
  			return (
  				<div className={classNames("panel-list", {'current': (currentChallenge.position-1) === index})} key={index}>
  					<div className="currentSelected"></div>
		          	<div className=" clearfix -task-list-inner" id="game_status_118">

		            	{/* 允许跳关的设置 */}
		                <h4 className=" -task-list-title fl">
		                	{shixun.status<2 || challenge.status === 2 || (challenges[index-1] && challenges[index-1].status === 2)
		                		|| shixun.task_pass || myshixun_manager === true ?
		                	<Link to={`/tasks/${challenge.identifier}`} onClick={onChallengesDrawerClose}>{index+1}. {challenge.subject}</Link>
		                	:
		                	<span>{index+1}. {challenge.subject}</span>}
		                </h4>

		                <a className="fr">
		                	{challenge.status === 2 ?
		                	<i data-tip-down="已完成" className="fa fa-check-circle color-light-green fr font-16 mt5 -text-danger w20_center"></i>
		                	:
		                	<i data-tip-down="待完成" className="fa fa-check-circle fr font-16 mt5 color-light-grey w20_center"></i>
		                	}
		                </a>


		            	<div className="cl"></div>
			            <div style={{display: 'flex'}} className={`grades with80 ml20 ${challenge.status === 2 ? '' : 'notFinish'}`}>
		                    <span className={`font-12 mr15 info-partly ${(challenge.status === 2 && challenge.experience > 0) ? 'positive ' : 'negative'}`} id="shixun_exp_118">
		                    	经验值<span className="ml5">
		                    		{ showExp }
		                    	</span>
		                    </span>
		                    <span className={`font-12 mr15 info-partly ${(challenge.status === 2 && challenge.experience > 0) ? 'positive ' : 'negative'}`} id="shixun_grade_118">
		                    	金币<span className="ml5">
		                    		{/*因为关卡金币和经验值是一样的，所以这里可以直接用经验值*/}
		                    		{ showGold }

		                    	</span>
		                    </span>
		                    <span className=" font-12 mr15 info-partly" id="shixun_tag_118">
		                    	{ challenge.tag_count ?
		                    		<React.Fragment>
		                    			技能标签<span className="ml5">{challenge.tag_count || '无'}</span>
		                    		</React.Fragment>
		                     		: '' }
		                    </span>
			            </div>

                  <div className="finish-wrap">
                    <p class="finish-time font-12">
                      <span class="time-title">完成时间</span>
                      { finished_time ? moment(finished_time).format('YYYY-MM-DD HH:mm') : '--' }
                    </p>
                    <p class="finish-time font-12">
                      <span class="time-title">查看答案时间</span>
                      { view_answer_time ? moment(view_answer_time).format('YYYY-MM-DD HH:mm') : '--' }                    </p>
                  </div>
			            { shixun.status >= 2 && <div className="rateRow">
			            	{/* 已完成、未评分 */}
			            	{challenge.status === 2 && challenge.star === 0?
		            		<div className="unstar">
						    	<span className="starTip">给个评分吧：</span>
				            	<Rate
							      defaultValue={0}
							      onChange={(value) => this.props.onStarChange(challenge, index, value)}
							    />
							    <span className="starNumber" onClick={()=>this.props.saveChallengeStar(challenge, index)}>评价</span>
						    </div>
						    :
						    challenge.status === 2 && challenge.star > 0 ?
						    <div className="stared">
						    	<span className="starTip">已评分：</span>
								<Rate
							      defaultValue={challenge.star}
							      disabled
							    />
							    <span className="starNumber">{challenge.star}分</span>
						    </div>
						    : ''}
			            </div> }
		          	</div>
		        </div>
  			)
  		})
		return taskArray;
  	}

  	render() {
  		const { taskListLoading } = this.props;
	    return (
        <div className="page--over" style={{ width: '420px'}}>
          {/** 增加提示信息 */}
          <div className="tip-info-wrap">
            <p className="tip-info">
              <span><span style={{ color: '#FFBD4C'}}>温馨提示: </span> 若查看答案时间早于关卡任务完成时间，将影响课堂实训作业的成绩。</span>
            </p>
          </div>

			    <div className="col-width-3 -scroll" style={{height: 'calc( 100% - 100px )', width: '420px'}} id="all_task_index">
				    { taskListLoading ?
				    	<CircularProgress size={40} thickness={3} style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '40%', display: 'block' }}/> :
			    		this.renderTasks()
			    	}
			  	</div>
			</div>
	    );
  	}
  	/*
  		<a className="fr"><i data-tip-down="待完成" className="fa fa-play-circle color-light-green fr font-18 mt5 -text-danger w20_center"></i></a>
		<div className="-task-list-header clearfix">
				    	<h3 className="fl">全部任务</h3>
			    	</div>
  	*/
}

export default TaskList;
