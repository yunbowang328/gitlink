import React, { Component } from 'react';

import Comments from './Comments'
import CommentInput from './CommentInput'

class CommentContainer extends Component {

	componentDidMount() {

	}

	render() {

		return (

				<Comments 
					{...this.props}
					showHiddenButton={true}
					>

				</Comments>

			
		)
	}
}

export default CommentContainer;