import './header.scss';
import React, { Component } from 'react';

import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';

import TaskListContainer from './taskList/TaskListContainer'
import TaskResultLayer from './layers/TaskResultLayer'
import Tooltip from 'material-ui/Tooltip';


import moment from 'moment'

function pad(num) {
    return ("0"+num).slice(-2);
}
function hhmmss(secs) {
  var minutes = Math.floor(secs / 60);
  secs = secs%60;
  var hours = Math.floor(minutes/60)
  minutes = minutes%60;
  return pad(hours)+":"+pad(minutes)+":"+pad(secs);
}


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    background: '#05101A',
    color: '#4CACFF',
    top: '-6px'
  },
});

class Header extends Component {
	constructor(props) {
		super(props)

		this.state = {
		}
	}

	componentDidMount() {
		
	}


	goBack() {
		const { challenge, game, shixun } = this.props
		// myshixuns/pw346iskxh/stages/rw4v6giml5no
		// http://localhost:3000/shixuns/cz7yw3en/challenges
		const url = `/shixuns/${shixun.identifier}/challenges`
		window.location.href = url;
	}


  	render() {
  		const { challenge, shixun, loading, grade, classes, user, game,
  			onDrawerButtonClick, onChallengesDrawerClose, power, myshixun_manager,
  			onStarChange, saveChallengeStar, challengesDrawerOpen, taskListLoading, challenges, showSnackbar, closeTaskResultLayer } = this.props
  		// 样式在 tpiPage.css中
  		/*
			leftNavDrawer
  		*/
	    return (
	      	<div className="page--header clearfix tpi_content" id="myshixun_top">
	      		<TaskResultLayer {...this.props} onStarChange={onStarChange} saveChallengeStar={saveChallengeStar}></TaskResultLayer>
	      		<Drawer
			    	className="leftNavDrawer"
			          width={500}
			          open={challengesDrawerOpen}
			          onClose={() => onChallengesDrawerClose()}
			        >
			        
			        <TaskListContainer challenges={challenges} taskListLoading={taskListLoading} shixun={shixun}
			        	challenge={challenge} onStarChange={onStarChange} saveChallengeStar={saveChallengeStar}
			        	onChallengesDrawerClose={() => onChallengesDrawerClose()}
			        	showSnackbar={showSnackbar} closeTaskResultLayer={closeTaskResultLayer}
			        	myshixun_manager={myshixun_manager}
			        	 >
			        	
			        </TaskListContainer>
			    	
		        </Drawer>

	      		<div className="headerLeft">
		      		

				    <div className="userInfo">
				    	<a href={user.user_url} target="_blank">
							{ user.image_url && <img alt="0?1442652658" width="35" height="35" src={`../images/${user.image_url}`} /> }
						</a>
						<a href={user.user_url} className="userInfoName" target="_blank">{user.username}</a>
						   {/* "/users/p69243850" 
							"https://www.educoder.net/images/avatars/User/0?1442652658"
							*/}
					</div>

					{(grade || grade == 0) && <div className="-header-right clearfix">
					    {/*<img src="/images/task/coin.png" className="fl" width="30" height="30" alt=""/>*/}
					    <span style={{width:'20px', height:'20px', background:'#FFD633', borderRadius: '10px', marginTop: '3px' }} className="fl"></span>
					    <span className="ml5 color-white fl" id="user_grade">
							{/*  href={`${user.user_url}/user_grade`} target="_blank"  */}
					    	<span>{ grade === 0 ? grade : (grade || '')}</span>
					    </span>
					</div>}


					
			    </div>

	      		
		      	<div className="-layout-h ml10 headerCenter">
				  	<h2 className="-header-title task-hide color-white">{shixun ? shixun.name||'' : ''}</h2>
				  	<Tooltip title="本关通关耗时">
				  		<div className="timeRecord">{game && hhmmss(game.cost_time)}</div>
				  	</Tooltip>
				</div>
				
				<div className="headerRight">
					<div className="fr">
						{shixun ? 
						// className="mr20 mt8 exitBtn"
						<a href={`/shixuns/${shixun.identifier}/challenges`} className="mr20 mt8 exit_btn">
				      		<i className="fa fa-power-off font-16"></i> 
					      	{/* <span>{'退出闯关'}</span> */}
									<span>{'退出实训'}</span>
					    </a>
					    : ''}
					</div>
				</div>
		    </div>
	    );
  	}
}

export default withStyles(styles)( Header );
