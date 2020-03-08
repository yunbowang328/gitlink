import React, { Component } from 'react';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import {  InputNumber } from 'antd'



class RewardDialog extends Component {
	constructor(props) {
		super(props)

		this.handleGoldRewardDialogClose = this.handleGoldRewardDialogClose.bind(this)

		this.state = {
			// goldRewardDialogOpen: false,
			goldRewardInput: '',
		}
	}

	showGoldRewardDialog(comment, childComment) {
		if (comment.admin === true) {
			this.comment = comment;
			this.childComment = childComment;
			this.setState({goldRewardDialogOpen: true})
		}
	}

	handleGoldRewardDialogClose() {
		this.props.setRewardDialogVisible(false)
	}
	onGoldRewardDialogOkBtnClick() {
		console.log('onGoldRewardDialogOkBtnClick')
		const { goldRewardInput } = this.state;
		if (!goldRewardInput || goldRewardInput === '0' || goldRewardInput < 0) {
			this.props.showNotification('奖励金币不能为空或负数')
			// this.setState({ goldRewardInputError: true})
			return;
		} else {
			this.props.setRewardDialogVisible( false )
			this.props.rewardCode(goldRewardInput)
		}
	}
	onGoldRewardInputChange(value) {
		// || event.target.value
		const number = parseInt(value || 0, 10);
		if (Number.isNaN(number)) {
			return;
		}
		this.setState({ goldRewardInput: number , goldRewardInputError: false });
	}

  	render() {
		const { goldRewardDialogOpen } = this.props;  		
		const { goldRewardInputError } = this.state;
		const goldRewardInputErrorObj = goldRewardInputError ? {'error': 'error'} : {}

	    return (
	      	 <Dialog
	          	open={goldRewardDialogOpen}
				disableEscapeKeyDown={true}
	          	onClose={this.handleGoldRewardDialogClose}
				className={'rewardDialog'}
	        >	
				<style>{`
					.rewardDialog>div:last-child {
						width: 280px;
					} 
				`}</style>
		       	<DialogTitle id="alert-dialog-title">{"奖励设置"}</DialogTitle>
	          	<DialogContent>
		            
		            	{/* <FormControl { ...goldRewardInputErrorObj } aria-describedby="name-error-text"> */}
				          	{/* <InputLabel htmlFor="goldReward">请输入奖励的金币数量</InputLabel>
				          	<Input id="goldReward"  type="number" value={this.state.goldRewardInput} onChange={(e) => this.onGoldRewardInputChange(e)} />
				          	{ goldRewardInputError ? <FormHelperText id="name-error-text">奖励金币不能为空或负数</FormHelperText> : ''} */}
							
							<InputNumber placeholder="请输入奖励的金币数量" id="goldReward"  type="number" value={this.state.goldRewardInput} 
								onChange={(e) => this.onGoldRewardInputChange(e)} width={228} style={{ width: '228px'}} />
				        {/* </FormControl> */}

			        {/*<DialogContentText id="alert-dialog-description" style={{textAlign: 'center'}}>    </DialogContentText>*/}
	          	</DialogContent>
	          	<DialogActions>
		            <Button onClick={this.handleGoldRewardDialogClose} color="primary">
		              取消
		            </Button>
		            <Button variant="raised" 	
		            	onClick={() => this.onGoldRewardDialogOkBtnClick() } color="primary" autoFocus>
		              确定
		            </Button>
	          	</DialogActions>
	        </Dialog>
	    );
  	}
}

export default RewardDialog;
