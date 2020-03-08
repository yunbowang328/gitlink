import React, { Component } from 'react';

// import LeftNav from './LeftNav'

import Header from './Header'

import MainContentContainer from './MainContentContainer'

import TPIContext from '../../context/TPIContext'
import TPIContextProvider from '../../context/TPIContextProvider'

import update from 'immutability-helper'

import axios from 'axios';


// import { getUrl } from 'educoder'
// let _url_origin = getUrl()
// const $ = window.$
// let prefix = '/react/build'
// if (window.location.port == 3007) {
// 	prefix = ''
// } else {
// }

// 下面这个加载方式有问题，改到html 写script标签
// if (!window['TPIScriptLoaded']) {
//         // $('head').append($('<link rel="stylesheet" type="text/css" />')
//         //     .attr('href', `${_url_origin}${prefix}/js/xterm/xterm.css`));

//         $.when(
//             $.getScript( `${_url_origin}/assets/kindeditor/kindeditor.js` ),
//             $.getScript( `${_url_origin}${prefix}/js/create_kindeditor.js` ),
//             $.getScript( `${_url_origin}/javascripts/educoder/edu_application.js` ),
//             $.Deferred(function( deferred ){
//                 $( deferred.resolve );
//             })
//         ).done(function(){
// 			window.TPIScriptLoaded = true
//             //place your code here, the scripts are all loaded
//             // callback && callback()
//         });
//     } else {
//         // callback && callback()
//     }

class Index extends Component {
	constructor(props) {
		super(props)

		// tpi body overflow hidden
		var styles = window.$('body').attr('style');
		styles += 'overflow: hidden !important;'
		window.$('body').attr('style', styles);
      	window.$('#root').css('position', 'absolute')

		// TPI浏览器缩放
		// setTimeout(() => {
		// 	const agent = navigator.userAgent;
		// 	if (agent.indexOf('Mac OS') == -1) {
		// 		window._initZoomCheck()
		// 	}
		// }, 800)


		this.onDrawerButtonClick = this.onDrawerButtonClick.bind(this)
		this.onStarChange = this.onStarChange.bind(this)
		this.saveChallengeStar = this.saveChallengeStar.bind(this)
		this.onChallengesDrawerClose = this.onChallengesDrawerClose.bind(this)
		

		this.starArray = [];

		// 将原本放置在Header.js中的state上提到Index.js
		this.state = {
			challengesDrawerOpen: false,
			taskListLoading: true,
			challenges: [], // 任务列表

			
		}
	}
	
	onChallengesDrawerClose() {
		this.setState({
			challengesDrawerOpen: false
		})
	}

	onDrawerButtonClick() {
		if (this.props.loading) {
			return;
		}
		const { shixun, myshixun } = this.props;
		// var getChallengesUrl = `/api/v1/games/${this.props.game.identifier}/challenges`;
		var getChallengesUrl = `/myshixuns/${myshixun.identifier}/challenges.json`;

		this.setState({
			taskListLoading: true,
			challengesDrawerOpen:true
		})
		
		axios.get(getChallengesUrl, {
    			// withCredentials: true,
    		})
		  .then((response) => {

			    if (response.data.status == -1) {
			    	console.error('获取任务列表失败！')
			    	return;
			    }
			    this.starArray = [];
		    	this.setState({
		    		challenges: response.data,
					taskListLoading: false,
				})
		  	})
		  	.catch(function (error) {
		    	console.log(error);
		  	});
	
	}

	onStarChange(challenge, index, value) {
		this.starArray[index] = value;
	}
	saveChallengeStar(challenge, index) {
		const { challenges } = this.state
		const { shixun, game } = this.props;
		const value = this.starArray[index]
		if (!value && !challenges[index].star) {
			this.props.showSnackbar('请先选择评星数量(1-5星)！')
			return;
		}
		// var saveChallengeStarUrl = `/api/v1/games/${challenge.identifier}/star`;
		var saveChallengeStarUrl = `/tasks/${challenge.identifier}/star.json?shixun_id=${shixun.id}&star=${value}`;
		
		axios.get(saveChallengeStarUrl
			// , {
			// 	star: value,
			// 	shixun_id: shixun.id
			// }
			// ,{
    		// 	withCredentials: true,
    		// }
			)
		  .then((response) => {

			    // {"reward_code":86}  TODO 金币数量变化
			    if (response.data.reward_code === -1) {
			    	this.props.showSnackbar('该任务已评过星了！')
			    	return;
			    }
			    
			    if (challenges && challenges[index]) { // 每次展开都会重新加载任务列表
			    	const new_challenges = challenges.slice(0);
				    new_challenges[index].star = value;
				    this.setState({ challenges: new_challenges })
			    }
		  	})
		  	.catch(function (error) {
		    	console.log(error);
		  	});
	}

  	render() {
  		const context = this.props;
		// 不将cost_time传给MainContent
  		let gameWithoutCostTime;
  		if (context.game) {
	  		gameWithoutCostTime = Object.assign({}, context.game);
	  		gameWithoutCostTime.cost_time = undefined;
  		}
	    return (
	    		
	    	
		    	
						<React.Fragment>
						<Header 
							onChallengesDrawerClose={this.onChallengesDrawerClose}
							onDrawerButtonClick={this.onDrawerButtonClick}
							onStarChange={this.onStarChange}
							saveChallengeStar={this.saveChallengeStar}
							{...this.state}

							user={context.user}
							challenge={context.challenge}
							shixun_name={context.shixun_name}
							loading={context.loading}
							onGamePassed={context.onGamePassed }
							currentGamePassed={context.currentGamePassed}
							currentPassedGameGainGold={context.currentPassedGameGainGold}
							currentPassedGameGainExperience={context.currentPassedGameGainExperience}
							closeTaskResultLayer={context.closeTaskResultLayer}
							
							game_count={context.game_count}
							grade={context.grade}
							game={context.game}
							next_game={context.next_game}
							shixun={context.shixun}

							showSnackbar={context.showSnackbar}
							power={context.power}
							myshixun_manager={context.myshixun_manager}
							>
						</Header>

						

		    		{/*  区分下repo和evaluate模块的，以及子模块的 */}
						<MainContentContainer
							confirm={context.confirm}

							onDrawerButtonClick={this.onDrawerButtonClick}
							grade={context.grade}
							allowed_unlock={context.allowed_unlock}
							user={context.user}
							power={context.power}
							myshixun_manager={context.myshixun_manager}

							praisePlus={context.praisePlus}

							git_url={context.git_url}
							mirror_name={context.mirror_name}
	    					challenge={context.challenge}
	    					myshixun={context.myshixun}
	    					shixun={context.shixun}

							vnc_url={context.vnc_url}
	    					zip_path={context.zip_path}

	    					loading={context.loading}
	    					discusses_count={context.discusses_count}
							hide_code={context.hide_code}


	    					readGameAnswer={context.readGameAnswer}

	    					record={context.record}
	    					output_sets={context.output_sets}
	    					latest_output={context.latest_output}

	    					onPathChange={context.onPathChange}
							updateChallengePath={context.updateChallengePath}

	    					
	    					time_limit={context.time_limit + 5}
	    					real_time_limit={context.time_limit}

								resetTestSetsExpandedArray={context.resetTestSetsExpandedArray}
	    					onRunCodeTestFinish={context.onRunCodeTestFinish}
	    					onRunChooseTestFinish={context.onRunChooseTestFinish}
	    					testSetUnlock={context.testSetUnlock}

	    					testSetsExpandedArray={context.testSetsExpandedArray}
	    					onTestSetHeaderClick={context.onTestSetHeaderClick}
	    					
	    					st={context.st}
	    					choose={context.chooses}
	    					choose_test_cases={context.choose_test_cases}	

	    					game={gameWithoutCostTime}
	    					next_game={context.next_game}
	    					match={context.match}

	    					onShowPrevStage={context.onShowPrevStage}
	    					onShowNextStage={context.onShowNextStage}

							showSnackbar={context.showSnackbar}
							showDialog={context.showDialog}
							handleGdialogClose={context.handleGdialogClose}
							
							tpm_cases_modified={context.tpm_cases_modified}
							tpm_modified={context.tpm_modified}
							tpm_script_modified={context.tpm_script_modified}

							showUpdateDialog={context.showUpdateDialog}
							onShowUpdateDialog={context.onShowUpdateDialog}
							updateDialogClose={context.updateDialogClose}



	    					
	    					></MainContentContainer>
						</React.Fragment>
	    	
	      		
	    );
  	}
}

export default Index;
