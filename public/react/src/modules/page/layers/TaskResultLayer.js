import React, { Component } from 'react';
import { Redirect } from 'react-router';

import PropTypes from 'prop-types';
import Rate from 'rc-rate';

import Tooltip from 'material-ui/Tooltip';

import './TaskResultLayer.css'
import moment from 'moment';

import passallImg from '../../../images/tpi/passall.png'
import passpartImg from '../../../images/tpi/passpart.png'
import empiricgreenImg from '../../../images/tpi/empiricgreen.png'

import { trigger } from 'educoder';
import SecondTab from "../../paths/SchoolStatistics/SecondTab";


class TaskResultLayer extends Component {
    constructor(props) {
      super(props)

      this.goNext = false;

      this.state = {
        stared: false,
        timeRemain: 0,
      }
    }

    componentWillReceiveProps(newProps, newContext) {
      if (newProps.currentGamePassed && (!this.props.currentGamePassed
          || (newProps.currentGamePassed !== this.props.currentGamePassed ))) {
        // this.fakeRanking = this._fakeRanking()
        const $ = window.$;
        let isLastGame = newProps.game_count === newProps.challenge.position;
        setTimeout(()=>{
          // true ||
          if ( isLastGame) {
            var dClass = 'zoomInDown' ;$('.passTaskContent').show().addClass(dClass + ' animated');
            setTimeout( function(){$('.passTaskContent').removeClass(dClass + ' animated')}, 1000)
          } else {
            var dClass = 'zoomIn' ;$('.passTaskContent').show().addClass(dClass + ' animated');
            setTimeout( function(){$('.passTaskContent').removeClass(dClass + ' animated')}, 1000)
          }
        }, 100)

        if (newProps.challenge.showLanguagePictrue == true) {
          // 开启倒计时
          // this.initEffectDisplayServerTimer()
        }
      }
    }

    onStarChange(challenge, index, value) {
      this.props.onStarChange(challenge, index, value);

      this.setState({
        stared: value ? true : false,
      })
    }

    onFinish(goNext) {
      const { stared } = this.state;
      const { game, challenge, shixun, showSnackbar, next_game } = this.props;
      if (!stared && !this.props.game.star && shixun.status >= 2 ) {     // 没点评星 && 未评星 && 实训已发布（模拟实战可以继续）
        showSnackbar('请先给该任务评星，谢谢。')
        return;
      }

      // 点击了查看效果，而非查看下一关
      if (!goNext) {
        if (challenge.showWebDisplayButton === true && challenge.webDisplayUrl) {
          // 打开web效果查看页面
          window.open(challenge.webDisplayUrl, '_blank');
          return;
        } else {
          trigger('showWebDisplayEvent')
        }
      }
      if (!game.star) { // 当前关卡没有评星，评星后再跳转
        this.props.saveChallengeStar(game, challenge.position);
      }

      //  跳转到下一关
      // https://stackoverflow.com/questions/29244731/react-router-how-to-manually-invoke-link
      // this.context.router.push('/sample');
      if (goNext === true) {
        if (next_game) {  // https://www.trustie.net/issues/18573
          this.goNext =  true;
        }
        // 隐藏掉效果查看页面
        window.$('#picture_display').hide()
      }
      this.props.onGamePassed();
      this.setState({
        stared: false
      })
    }
    _fakeRanking() {
      const { cost_time } = this.props.game
      if (cost_time > 60 * 10) {
        return Math.floor(Math.random()*11)+20
      }
      return Math.floor(( (600 - cost_time) / 600) * 100)

    }
    // componentDidUpdate(prevProps) {
    //   if (!this.props.challenge) {
    //     return;
    //   }
    //   const { showLanguagePictrue } = this.props.challenge;
    //   if ( prevProps.challenge.showLanguagePictrue != showLanguagePictrue &&
    //     showLanguagePictrue == true ) {

    //   }
    // }
    initEffectDisplayServerTimer = () => {

      this.setState({ timeRemain: 5 * 60 }, () => {
        this.intervalHandler = setInterval(() => {
          let timeRemain = this.state.timeRemain
          if (timeRemain > 0) {
            timeRemain = timeRemain - 1;
          } else {
            clearInterval(this.intervalHandler);
          }
          this.setState({ timeRemain })
        }, 1000)
      })

    }
    componentWillUnmount() {
      this.intervalHandler && clearInterval(this.intervalHandler);
    }
  	render() {
      if (!this.props.challenge || !this.props.challenge.id) {
          return <div></div>
      }
      const { shixun } = this.props;
      const { stared } = this.state;
      let { currentGamePassed, currentPassedGameGainGold, currentPassedGameGainExperience,
          game_count, challenge, next_game, game, closeTaskResultLayer } = this.props;
      // TODO closeTaskResultLayer的时候没有调用评星接口


      // 如果时最后一关，图片要换
      let isLastGame =  game_count === challenge.position; // false //

      // TODO 这个用法有点蹩脚
      if (this.goNext && next_game) {
        this.goNext = false;
        return <Redirect push to={`/tasks/${next_game}`} />;
      }
      if (shixun.status <= 1 || game.isPassThrough == true) { // 模拟实战
        game.star = 8;  // 跳过评星
      }

      const titleObj = {
        title: game.star ? '' : '请先给该任务评星，谢谢。'
      }
      // const fakeRanking = this.fakeRanking;
	    return (
	    	<div>
		    	{currentGamePassed ?
		    	<div className="taskResultLayer">
		    		<div className="pr passTaskContent" style={{display:'none'}} >
                  <i className="far fa-times-circle closeIcon" onClick={closeTaskResultLayer} title="关闭"></i>
                  <img src={isLastGame? passallImg : passpartImg} width="652px" className="passTaskImg"/>
                  <div className="winpPerson expGold">
                    <p className="inline inlines"><span className=" goldring"/>
                      {currentPassedGameGainGold >= 0 ? `+${currentPassedGameGainGold}` : '+0'}
                    </p>
                    <p className="inline inlines exp">
                      <img src={empiricgreenImg} className="mr8 mt5 fl"/>
                      {currentPassedGameGainExperience >= 0 ? `+${currentPassedGameGainExperience}` : '+0'}
                    </p>
                  </div>
                  <div className="winPanel">
                      <style>
                        {
                          `
                          .page--body{
                              z-index: 0 !important;
                          }
                          `
                        }
                      </style>
                      <div className="cl"></div>
                      { !game.star ?
                        <React.Fragment>
                        <p className="rateLabel ">您的评价决定老师的江湖地位~</p>
                        <Rate
                            defaultValue={0}
                            allowClear={false}
                            onChange={(value) => this.onStarChange(this.props.game, this.props.challenge.position, value)}
                          />
                        </React.Fragment>
                      : ''}
                      <p>
                          {/*<a href="javascript:void(0)" className="passNext">下一关</a>*/}
                          <a href="javascript:void(0)" className={`passed ${ stared || game.star ? 'stared' : '' }`}
                            {...titleObj} onClick={()=>this.onFinish(true)}>{ next_game ? '下一关' : '完成'}</a>

                          { challenge.showLanguagePictrue &&

                            <a href="javascript:void(0)" className={`passed ${ stared || game.star ? 'stared' : '' }`}
                            {...titleObj} onClick={()=>this.onFinish()}>
                              { `查看效果` }
                              {/* ${ moment(this.state.timeRemain * 1000).format('mm:ss') } */}
                            </a>

                          }
                          {/*

                          (this.state.timeRemain ?
                              <Tooltip title={"注意：效果查看服务只会保留5分钟"} disableFocusListener={true}>

                              </Tooltip>
                            :
                              <Tooltip title={"效果查看服务已被终止运行，需要重新评测后才能查看"} disableFocusListener={true}>
                                <a href="javascript:void(0)" className={`passed ${ stared || game.star ? 'stared' : '' }`}
                                {...titleObj} onClick={()=>{}} style={{ backgroundColor: 'gray'}}>
                                  { `查看效果` }
                                </a>
                              </Tooltip>
                            )

                           */}
                          {/*
                            注意：效果查看服务只会保留5分钟
                            效果查看服务已被终止运行，需要重新评测后才能查看
                           */}
                      </p>
                  </div>
              </div>
		      	</div>
		      	:
		      	<div></div>
		      	}
	      	</div>
	    );
  	}
}

export default TaskResultLayer;
