import React, { Component } from 'react';

import Drawer from 'material-ui/Drawer';
import PropTypes from 'prop-types';

import './UpdateDrawer.css'
import { withStyles } from 'material-ui/styles';

import { green } from 'material-ui/colors';
import { CircularProgress } from 'material-ui/Progress';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import Button from 'material-ui/Button';

import axios from 'axios';
import MUIDialogStyleUtil from './MUIDialogStyleUtil'
const styles = MUIDialogStyleUtil.getTwoButtonStyle()

/*
	(@tpm_modified || @tpm_script_modified) && @game_challenge.st == 0
		关卡任务的代码文件有更新啦~<br/>更新操作将保留已完成的评测记录和成绩。<br/>还未完成评测的任务代码，请自行保存！
		sync_hide_tip_content(this)	立即更新		next_update(this)	稍后再说

	tpm_cases_modified
		本关<%= @game_challenge.st == 0 ? "测试集" : "答案" %>已更新，您可以重新评测。<br/>本次更新不影响已获得的经验值。
		sync_hide($(this).parents('.tip-panel-animate-left'))
		<%= link_to "知道啦", sync_modify_time_myshixun_game_path(@game, :myshixun_id => @myshixun.id), :remote => true,:class => "fl color-orange03",:style => "width:100%;text-align: center;border:none" %>
	
	myshixuns/9egrt8q5ju/stages/2pjt9wlbzov7
	myshixun.identifier 	game.identifier
	稍后再说
	$.ajax({
            url:"/myshixuns/9egrt8q5ju/stages/2pjt9wlbzov7/system_update"
        });

	
	立即更新
    $.ajax({
            url: "/myshixuns/9egrt8q5ju/stages/2pjt9wlbzov7/sync_codes",
            dataType: "script",
            success: function(data){
            }
        });
        // :status => 1, :message :path 
		// 拿到path后重新调用rep_content即可
		

    测试集更新  sync_modify_time   提醒状态设置接口
*/
class UpdateDrawer extends Component {

	constructor(props) {
		super(props)

		this.state = {
			loading: false
		}
	}
	onCasesModified(updateTogether) {
		const { game, myshixun, showSnackbar, updateDialogClose } = this.props;

		// const url = `/api/v1/games/${game.identifier}/sync_modify_time`
		const url = `/tasks/${game.identifier}/sync_modify_time`
		axios.get(url, {
    			// withCredentials: true,
    		})
		  	.then((response) => {

			    if (!updateTogether) {
			    	showSnackbar('更新状态已同步。')
			    }
			    updateDialogClose();
		  	})
		  	.catch((error) => {
		    	console.log(error);
		  	});
		
	}
	// 稍后再说
	onNextUpdate(tpmCasesModified) {
		const { tpm_cases_modified, tpm_modified, tpm_script_modified, challenge, updateDialogClose } = this.props;
  		let needUpdateScript = (tpm_modified || tpm_script_modified) && challenge.st === 0;

		const { game, myshixun, showSnackbar } = this.props;
		// const url = `/myshixuns/${myshixun.identifier}/stages/${game.identifier}/system_update`

		// const url = `/api/v1/games/${game.identifier}/system_update?myshixun_id=${myshixun.id}`
		const url = `/tasks/${game.identifier}/system_update.json?myshixun_id=${myshixun.id}`
		this.setState({ loading: true })
		axios.get(url, {
    			// withCredentials: true,
    		})
		  .then((response) => {
			this.setState({ loading: false })


			    if (tpmCasesModified) {
			    	this.onCasesModified(true)	
			    }
			    updateDialogClose(true);
		  	})
		  	.catch((error) => {
		    	console.log(error);
		  	});
	}

	// tpmCasesModified 如果为true，则需要调用后台接口置状态，下次就不用提醒了
	// 立即更新
	onUpdateNow(tpmCasesModified) {
		const { tpm_cases_modified, tpm_modified, tpm_script_modified, challenge, updateDialogClose } = this.props;
  		let needUpdateScript = (tpm_modified || tpm_script_modified) && challenge.st === 0;

		const { game, myshixun, showSnackbar, updateChallengePath, fetchRepositoryCode } = this.props;
		if (needUpdateScript) {
			this.setState({ loading: true })

			const url = `/tasks/${game.identifier}/sync_codes.json`
			axios.get(url, {
	    			// withCredentials: true,
	    		})
			  .then((response) => {
					this.setState({ loading: false })

			  		const { path, status } = response.data;
				  	if (status === -1) {
				  		showSnackbar(response.data.message || '更新失败，服务端错误')
				  	} else if (response.data) {
				  		if (path) {
				  			updateChallengePath(path);
				  			fetchRepositoryCode()
				  		}
				  		updateDialogClose(false, true);
				  		showSnackbar('更新成功，正在为您重新加载代码...')
				  		
				    }

				    if (tpmCasesModified) {
				    	this.onCasesModified(true)
				    }
			  	})
			  	.catch((error) => {
					this.setState({ loading: false })

			  		// showSnackbar('更新失败，请求异常')
			    	console.log(error);
			  	});
		}		
	}

	handleDialogClose() {
		// 必须得选择一个？
		const { updateDialogClose } = this.props;
		updateDialogClose();
	}
	// fetchRepositoryCode
	render() {
		const { myshixun, showUpdateDialog, classes } = this.props;
		const { loading } = this.state;
		// system_tip 为true时，只有点击消息通知按钮时才弹框
		// !myshixun || myshixun.system_tip === true ||
  		// if ( showUpdateDialog === false) {
  		// 	return ''
  		// }

  		const { tpm_cases_modified, tpm_modified, tpm_script_modified, challenge } = this.props;
  		let needUpdateScript = (tpm_modified || tpm_script_modified) && challenge.st === 0;

  		// 立即更新		稍后再说
	    return (

	        <Dialog
	        	disableBackdropClick={true}
	        	className="updateDialog"
	          	open={ showUpdateDialog && (tpm_cases_modified || needUpdateScript) }
	          	onClose={() => this.handleDialogClose()}
	        >	
		       	<DialogTitle id="alert-dialog-title">{"更新通知"}</DialogTitle>
	          	<DialogContent id="dialog-content">
		            <div style={{textAlign: 'center'}}>
		            	{ tpm_cases_modified && needUpdateScript ? 
		            		<div>
		            			关卡任务的代码文件和测试集有更新啦~<br></br>更新操作将保留已完成的评测记录和成绩。<br></br>还未完成评测的任务代码，请自行保存！
		            		</div>
		            		 :
		            		tpm_cases_modified ? 
		            		<div>
		            			本关{ challenge.st === 0 ? '测试集' : '答案' }已更新，您可以重新评测。<br></br>本次更新不影响已获得的经验值。
		            		</div> : 
		            		<div>
		            			关卡任务的代码文件有更新啦~<br></br>更新操作将保留已完成的评测记录和成绩。<br></br>还未完成评测的任务代码，请自行保存！
		            		</div>
		            	}
		            </div>
	          	</DialogContent>
	          	<DialogActions id="dialog-actions" >
	          		{ needUpdateScript ? 
	          		<React.Fragment>
			            <Button 
			            	disabled={loading}
			            	className={ "nextUpdate " + classes.button + ' ' + classes.buttonGray} onClick={() => this.onNextUpdate(tpm_cases_modified)} color="primary" >
			            	稍后再说
			            </Button>
			            <Button 
			            	disabled={loading}
			            	variant="raised" onClick={() => this.onUpdateNow(tpm_cases_modified)} color="primary" className={"updateNow " + classes.button}>
			            	立即更新
			            </Button>
			            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
		            </React.Fragment> : 
		            <Button onClick={() => this.onCasesModified()} color="primary" className={ "nextUpdate " + classes.button}>
		            	知道啦
		            </Button>
		        	}
 	          	</DialogActions>
	        </Dialog>
	    );
  	}
}


export default withStyles(styles)( UpdateDrawer ) ;
