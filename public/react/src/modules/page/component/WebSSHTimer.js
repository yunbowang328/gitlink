// WebSSHTimer.js
import React, { Component } from 'react';

import Drawer from 'material-ui/Drawer';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import { green } from 'material-ui/colors';
import { CircularProgress } from 'material-ui/Progress';
import Tooltip from 'material-ui/Tooltip';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import Button from 'material-ui/Button';

import axios from 'axios';

import moment from 'moment';

import MUIDialogStyleUtil from './MUIDialogStyleUtil'

import './WebSSHTimer.css'

import Popconfirm from 'antd/lib/popconfirm';
import 'antd/lib/popconfirm/style/css';
import { on, off } from 'educoder'
const styles = MUIDialogStyleUtil.getTwoButtonStyle()

const $ = window.$;
const five_min = 5 * 60 * 1000;
/*

	当倒计时为0时，客户端发起主动关闭ssh的请求 `close_webssh`
		当倒计时到5分钟的时候，提示用户是否续时，每次续时时长为20分钟
	如果ssh因为服务端的某些未知原因中断，这里需要提供重连的策略

	有输入时，会暂停第一个倒计时，并开启一个60s的倒计时，
	如果用户一直不输入，则60s倒计时结束时，重置第一个倒计时为20分钟，并继续倒计时。
	https://www.trustie.net/issues/17698
	TODO 每次点击“申请延时”按钮，直接增加20分钟的时间
	倒计时为0时，出现“重启”按钮
*/
const isSSHInIframe = false;
class WebSSHTimer extends Component {

	constructor(props) {
		super(props)
		this.startTimeRemain = 0;
		// 用户点击取消时，变量设置为true
		this.isUserChoseNotConcern= false
		this.state = {
			showTimer: true,	//  倒计时为0时，设置为false
			loading: false,
		  	dialogOpen: false

		}
	}

	init() {
		console.log('调用定时器开始: =========>>>>>>>>>>>>');
		// 20分钟倒计时
		this.timeRemain = 20 * 60 * 1000;
		this.startTimeRemain = 0
		// 倒计时出来！
		this.forceUpdate()
		const { game } = this.props;
		if (this.intervalHandler) {
			clearInterval(this.intervalHandler);
			this.intervalHandler = null;
		}
		this.intervalHandler = setInterval(() => {
			if (this.startTimeRemain > 0) {		// 等倒计时结束了再计算时间
				this.startTimeRemain--;
				if (this.startTimeRemain === 0) {
					// 重置主倒计时时长：20分钟
					this.timeRemain = 20 * 60 * 1000;
					$('.webSSHTimer').html(moment(this.timeRemain).format('mm:ss'))
					this.forceUpdate()
				}
				return;
			} 
			let _timeRemain = this.timeRemain;
			$('.webSSHTimer').html(moment(_timeRemain).format('mm:ss'))
			_timeRemain -= 1000
			this.timeRemain = _timeRemain;
			if (this.state.dialogOpen && _timeRemain % ( 60 * 1000 ) === 0) {	// 
				this.forceUpdate()
			}
			// 余5分钟的时候弹框通知		// 从代码文件切换回命令行时，要查看该时间
			if (_timeRemain === five_min) {
				
				this.setState({
		  			dialogOpen: true
		  		})		
				
			} else if (_timeRemain <= 0) {
				// 到时间了，触发删除pod的请求
				clearInterval(this.intervalHandler);
				this.intervalHandler = null;

				this.closeWebsshSocket();
				// this.closeWebssh()
				this.props.setSSHClosed(true)
				this.setState({
					showTimer: false,
  					dialogOpen: false	// 弹框可能未被关闭
				})
			}

		}, 1000)
	}
	closeWebsshSocket = () => {
		// 非iframe模式使用
		window.postMessage({tp: 'close_ssh_cocket'}, "*");

		/**
			启用iframe模式需要改的地方：
				ssh消息的发送和接收，消息得种类有：
				发送
				1、postMessage({tp: 'sshWorking'}, "*");                    ssh正在被使用
				2、window.parent.postMessage({tp: 'setSSHConnectStatus', tab: options.tab}, "*");
				
				接收
				1、 if(event.data.tp === 'resize'){   改变命令行窗体大小
				2、 } else if (event.data.tp === 'reload') {            异常中断后重连
				3、 } else if (event.data.tp === 'close_ssh_cocket') {  中断命令行websocket

				接收1的发送代码位于：
				js_min_all.js的这个方法：function update_rows_and_cols(rows) {
				其余的代码位于CodeRepository.js 或 WebSSHTimer.js
		 */
		// iframe模式使用
		// TODO 这里多ssh tab的话，需要调用每个window的 close_ssh_cocket
		// let windows = this.getWebsshWindows();
		// for (let i = 0; i < windows.length; i++) {
		// 	let _w = windows[i].contentWindow
		// 	_w && _w.postMessage({tp: 'close_ssh_cocket'}, "*");
		// }
	}
	// 重置命令行的时候调用的接口，会删pod
	closeWebssh = (callback) => {
		// 先关socket
		this.closeWebsshSocket()

		const { game } = this.props;
		// const url = `/api/v1/games/${game.identifier}/close_webssh`
		const url = `/tasks/${game.identifier}/close_webssh.json`
        axios.get(url, { },
            {
                // withCredentials: true
            }
		).then((response) => {
			if (response.data.status === 1) { 
				
			}
			callback && callback(response)
		}).catch((error) => {
			console.log(error)
		})
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		// 仅初始化一次
		if (prevProps.showTimerProp === false && this.props.showTimerProp === true) {
			if (this.intervalHandler) {
				const { showTimer } = this.state;
				// 用户从代码切换命令行，如果时间不够了也要提示是否续时
				if (this.isUserChoseNotConcern === false && showTimer === true && this.timeRemain < five_min) {
					this.setState({
						dialogOpen: true
					})
				}
			} else {
				this.init()
			}
		}
	}
	componentDidMount() {
		// 发现非iframe ssh也能使用postMessage
		// iframe时使用的消息机制
		// if (isSSHInIframe === true) {
			window.addEventListener('message', (e) => {
				if (this.state.showTimer === false) { // 已经触发了close_webssh
					return;
				}
				if(e.data.tp === "setSSHConnectStatus"){
					this.props.reInitSsh(window.$, null, true)
					
					// let windows = this.getWebsshWindows();
					// for (let i = 0; i < windows.length; i++) {
					// 	let _w = windows[i].contentWindow
					// 	_w && _w.postMessage({tp: 'reload'}, "*");
					// }
					
				} else if (e.data.tp === "sshWorking") {
					// this.startTimeRemain = 60;
					// this.forceUpdate();
				}
			});
		// } else {
		// 	// 非iframe时使用的消息机制
		// 	on('setSSHConnectStatus', () => {
		// 		// 需要reload
		// 		this.props.reInitSsh(window.$, null, true)
		// 	})

		// 	on('sshWorking', () => {
		// 		this.startTimeRemain = 60;
		// 		this.forceUpdate()
		// 	})
		// }
	}
	getWebsshWindows = () => {
		return $('.game_webssh')
		// var i = $('#game_webssh')[0]
		// var _w;
		// if (i) {
		// 	_w = i.contentWindow
		// }
		// return _w;
	}
	componentWillUnmount() {
		this.intervalHandler && clearInterval(this.intervalHandler);
	}
	handleDialogClose = () => {
		this.setState({
			dialogOpen: false
		})
	}
	onNope = () => {
		// 用户不续时，移除interval，无需再显示Timer
		// 用户不续时，隐藏dialog
		this.setState({
		// showTimer: false,
			dialogOpen: false
		})
		this.isUserChoseNotConcern = true
		// this.intervalHandler && clearInterval(this.intervalHandler);
	}
	onOK = () => {
		// 用户续时，+15min    // 用户操作多次后，自动续时？
		if (this.timeRemain > 0) {
			this.timeRemain += 20 * 60 * 1000;
		}
		this.setState({
			dialogOpen: false
		})
	}
	reInitSsh = () => {
		this.setState({
			showTimer: true
		})
		this.init();
		this.props.reInitSsh(window.$, null, true)
	}
	resetSsh = () => {
		this.closeWebssh((res) => {

			// message: webssh closed
			if (res.data.status === 1) {
				this.reInitSsh()
			}
		})
	}
	render() {
		const { myshixun, showUpdateDialog, classes } = this.props;
		const { showTimer, loading, dialogOpen } = this.state;

	    return (
	    	<React.Fragment>
	    		<Dialog
	        	disableBackdropClick={true}
	        	className="updateDialog"
	          	open={ dialogOpen && this.isUserChoseNotConcern === false }
	          	onClose={() => this.handleDialogClose()}
	        >	
		       	<DialogTitle id="alert-dialog-title">{"命令行连接时长提醒"}</DialogTitle>
						<DialogContent id="dialog-content">
							<div style={{textAlign: 'center'}}>
								命令行将于 {moment(this.timeRemain).format('m')} 分钟后中断，需要延长使用时间吗？
							</div>
						</DialogContent>
						<DialogActions id="dialog-actions">
							<React.Fragment>
								<Button 
									disabled={loading}
									className={ "nextUpdate " + classes.button + ' ' + classes.buttonGray} onClick={() => this.onNope()} color="primary" >
									不需要
								</Button>
								<Button 
									disabled={loading}
									variant="raised" onClick={() => this.onOK()} color="primary" className={"updateNow " + classes.button}>
									立即延长
								</Button>
								{/* loading && <CircularProgress size={24} className={classes.buttonProgress} /> */}
							</React.Fragment>
						}
						</DialogActions>
	        </Dialog>
	    	
			<Tooltip title="中断命令行连接的倒计时">
		        {/* <span className="webSSHTimer" 
		        	style={{ display: (showTimer && this.props.showTimerProp === true &&
						this.startTimeRemain <= 0 ? 'inline-block' : 'none')}}>
		        	
		        </span> */}
				<a href="javascript:void(0)" className="iconButton" 
					style={{ display: (showTimer && this.props.showTimerProp === true &&
						this.startTimeRemain <= 0 ? 'inline-block' : 'none'),
						cursor: 'default'}} >
					<i className="iconfont icon-shijian font-16 "></i>
					<span className="webSSHTimer"></span>
				</a>
	        </Tooltip>

			{ this.props.showTimerProp === true && showTimer === true && 
				<Popconfirm 
					title={<React.Fragment><p>实验环境将恢复到初始状态，</p><p>是否确认重置实验环境?</p></React.Fragment>} 
					placement="bottom"
					onConfirm={this.resetSsh} okText="确定" cancelText="取消">
					
						<a href="javascript:void(0)" className="iconButton" >
							<i className="iconfont icon-zhongzhi2 font-16 "></i>
							<span style={{ 	userSelect: 'none', verticalAlign: 'middle',
    										fontSize: '13px', marginLeft: '2px' }}>
								 重置命令行</span>
						</a>
				</Popconfirm>
			 }
			 {/* <Tooltip title={ ""} disableFocusListener={true}>
					</Tooltip> */}
			
	        { showTimer === false && this.props.showTimerProp === true && 
                <a href="javascript:void(0)" className="iconButton" onClick={this.reInitSsh} >
                    <i className="iconfont icon-congshulianjie font-16 "></i>
					<span style={{ 	userSelect: 'none', verticalAlign: 'middle',
							fontSize: '13px', marginLeft: '2px' }}>
						重连命令行</span>
                </a>
            }
			{/* <Tooltip title={ "命令行重连"} disableFocusListener={true}></Tooltip> */}
			
				</React.Fragment>
	    );
  	}
}

export default withStyles(styles) ( WebSSHTimer ) ;
