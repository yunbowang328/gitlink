import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import Tooltip from 'material-ui/Tooltip';

import './ActionView.css'

/*

    color: #1B4061 !important;
    background-color: transparent;
    border: 1px solid #1B4061 !important;
    */
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    border: '1px solid #1B4061',
    color: '#1B4061',
    height: '30px',
    padding: '0 16px',
    '&:hover': {
    	color: '#4CACFF',
    	border: '1px solid #4CACFF'
    }
  },
  hoverButton: {
	margin: theme.spacing.unit,
    height: '30px',
    padding: '0 16px',

	color: '#4CACFF',
	border: '1px solid #4CACFF'
  },
  buttonText: {
  	color: '#1B4061 !important',
  	'&:hover': {
  		color: '#1B4061',
  	}
  }
});

class ActionView extends Component {

	constructor(props) {
		super(props)
		
	}

	componentDidMount() {
		// request
		window._tpiWidthResize = () => {
			const _w = window.$('#actionView').width();
			// if (_w < 446) {
			// 	window.$('#time-consuming').hide()
			// 	// window.$('#time-consuming').hide()
			// } else if (_w < 746) {
			// 	// 文字放出来之前是 580
			// 	window.$('#time-consuming').show()
			// 	window.$('.time_limit').hide()
			// } else {
			// 	window.$('#time-consuming').show()
			// 	window.$('.time_limit').show()
			// }
 		}
	}

	showWebDisplay(challenge) {
		window.open(challenge.webDisplayUrl, '_blank');
	}
	/*<span className="mt10 -flex c_grey ml15" id="time-consuming">耗时：0 天 3 小时 11 分钟 57 秒 </span>*/
  	render() {
  		const { onRunCodeTest, onShowPrevStage, onShowNextStage, gameBuilding
  			, game, classes, st, shixun, record, challenge, time_limit, real_time_limit } = this.props;

  		console.log(shixun)
	    return (
	      	<div className="-flex -layout-h" id="game_operate_action">
			  	<style>{`
				  #game_operate_action {
					width: 100%;
				  }
				  .time_limit {
					  margin-right: 0px;
				  }
				  .spliter {
						border-right: 1px solid;
						padding-right: 8px;
						margin-right: 8px;
						height: 14px;
						display: inline-block;
						position: relative;
						top: 3px;
				  }
				  #time-consuming {
					  flex: auto;
					  overflow: hidden;
					  white-space: nowrap;  
				  }
				  #game_operate_action .act_btn {
					  flex: 0 0 90px;
				  }
				  `}</style>
	      		<span className="mt10 -flex c_grey ml15" id="time-consuming">
				  	{!!time_limit && 
					  <span className="time_limit">{`本关最大执行时间：${real_time_limit}秒`}
					  	{!gameBuilding && record && <span className="spliter"></span>}
					  </span>} 
	      			{!gameBuilding && record ? 
	      				// <Tooltip title={ "本次评测耗时(编译、运行总时间)" }></Tooltip>
	      					<span>本次评测耗时(编译、运行总时间)：{ record } 秒</span>
	      				
	      			: ""}
	      		</span>

	      		{/*将第一个按钮改为visibility方式隐藏，不然加载时测评按钮会出现没有垂直居中的情况*/}
				  	<Tooltip title={ "倒计时为0时，服务将被关闭" }>
						<Button size="small" className={classes.button + ' actionViewfirstButton'} onClick={()=>this.showWebDisplay(challenge)}
								style={{ visibility: challenge.showWebDisplayButton ? '': 'hidden',
									minWidth: challenge.showWebDisplayButton ? '': '1px',
									width: challenge.showWebDisplayButton ? '': '1px',
									flex: `0 0 ${challenge.showWebDisplayButton ? '110px': '1px'}`
								}} 
								id="showWebDisplayButton"
							// style={{ display: challenge.showWebDisplayButton ? 'flex': 'none'}} 
						>
							查看效果
						</Button>
					</Tooltip>

				{
					!gameBuilding && 
					(game && !!game.prev_game) ? 
				<Link to={`/tasks/${game.prev_game}`}  className={classes.buttonText + ' act_btn'}>
					<Button size="small" className={classes.button}>
						上一关
					</Button>
				</Link>
					: ''}

				{/*未发布的都能跳转*/}
				{	!gameBuilding && 
					((game && (game.status === 2 || shixun.status < 2) || shixun && shixun.task_pass ) && !!game.next_game) ? 
				<Link to={`/tasks/${game.next_game}`} className={classes.buttonText + ' act_btn'}>
					<Button size="small" className={classes.button}>
						下一关
					</Button>
				</Link>
					: ''}

				
				
				{(shixun&&!shixun.vnc || shixun&&shixun.vnc_evaluate) && <div id="code_test" className="act_btn">
					{
						st === 1 && game.status === 2 ? 
							<Tooltip title={ "已通关的选择题任务无法再次测评" }>
							<a href="javascript:void(0)" className="shixun-task-btn mr15  gray " 
						      		>
				      			<i className="fa fa-play-circle font-16"></i> 
						      	测评
						    </a>
						    </Tooltip>
						:
						gameBuilding ?
						
				    	<a href="javascript:void(0)" className="shixun-task-btn mr15  gray " 
					      		>
			      			<i className="fa fa-play-circle font-16"></i> 
					      	测评
					    </a>
				    	: 
					    <a href="javascript:void(0)" className="shixun-task-btn mr15 " 
					      		onClick={onRunCodeTest}>
			      			<i className="fa fa-play-circle font-16"></i> 
					      	测评
					    </a>}
				</div>}
	      	</div>	
	    );
	    /*	
	    	<a href="/shixuns/8arufxzl" id="exit_shixun" className="shixun-task-btn task-newbtn-grey mt8 mr15">离开</a>

	    	<a href="javascript:void(0)" className="shixun-task-btn task-btn-blue mr15 mt8" id="prev_step"
						onClick={onShowNextStage}>下一关 </a>

			onclick="training_task_submmit();"


			{game && !!game.prev_game ? 
				<div id="prev_step_area">
					<Link to={`/tasks/${game.prev_game}`} className="shixun-task-btn task-btn-blue mr15 mt8">上一关</Link>
				</div>
					: ''}

				{game && !!game.next_game ? 
				<div id="next_step_area">	
					<Link to={`/tasks/${game.next_game}`} className="shixun-task-btn task-btn-blue mr15 mt8">下一关</Link>
				</div>
					: ''}
	    */ 
  	}
}

export default withStyles(styles)( ActionView );
