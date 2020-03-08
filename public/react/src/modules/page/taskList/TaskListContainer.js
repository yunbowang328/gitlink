import React, { Component } from 'react';

import TaskList from './TaskList';

class TaskListContainer extends Component {

	constructor(props) {
		super(props)
	}
	componentDidMount() {
		// request
	}

	

  	render() {
	    return (
	      	<TaskList {...this.props} ></TaskList>
	    );
  	}
}

export default TaskListContainer;
