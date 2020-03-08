import React, { Component } from 'react';

import Drawer from 'material-ui/Drawer';

import PropTypes from 'prop-types';


// import TaskListContainer from '../taskList/TaskListContainer'

import axios from 'axios';

class LeftNav extends Component {

	constructor(props) {
	    super(props);
	    this.state = {open: false};
  	}

	handleToggle = () => this.setState({open: !this.state.open});

  	handleClose = () => this.setState({open: false});

  	render() {
  		const open = this.state.open;
	    return (
	    	<div>
	    		<Drawer
			    	className="leftNavDrawer"
			          width={500}
			          open={open}
			          onClose={() => this.setState({open: false})}
			        >
			        {/*<TaskListContainer></TaskListContainer>*/}
		          
		        </Drawer>
		        
		    	<div className="page--leftnav">

		    		<div className="user-info">
				        <a href="/users/p69243850" alt="用户头像" className="user-info-img">
				        	<img alt="0?1442652658" height="50" src="/images/avatars/User/0?1442652658" width="50"/>
				        </a>
				        <a href="/users/p69243850" className="user-info-name">Jimmy</a>
				    </div>
		    		<div className="leftnav">
				        <ul>
				          <li className="leftnav-box">
				            <a href="/myshixuns/8vrwcu74b5/stages/evmfk4txwyi3" className={`leftnav-box-inner ${open ? '' :  'leftnav-active' }`} id="current_task_tab" data-remote="true">
				            <i className="fa fa-gamepad font-20"></i><br/><span className="font-12">当前任务</span>
				          </a></li>
				          <li className={`leftnav-box`} onClick={this.handleToggle}>
				            <a href="javascript:void(0);" className={`leftnav-box-inner ${open ? 'leftnav-active' :  '' }`} id="all_task_tab">
				            <i className="fa fa-tasks font-20"></i><br/><span className="font-12">全部任务</span><br/><span className="btn-cir all_work_border">4</span>
				            </a>
				          </li>
				        </ul>
				        
				    </div>

				    <div className="leftnav" style={{position: 'fixed', bottom:0}}>
				        <a href="/shixuns/uznmbg54?exit=true" className="leftnav-box-inner" id="exit_task_tab">
				        	<i className="fa fa-arrow-left font-20"></i><br/><span className="font-12">退出实训</span>
				        </a>
				    </div>
				    
		      	</div>
	      	</div>
	      	
	    );
  	}
}

export default LeftNav;
