import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import Fade from 'material-ui/transitions/Fade';
import { notification } from 'antd'
export function SnackbarHOC(options = {}) {
	return function wrap(WrappedComponent) {
	    return class Wrapper extends Component {
	      	constructor(props) {
		        super(props);
		       	this.showSnackbar = this.showSnackbar.bind(this)
		        this.state = {
		        	 snackbarText: '',
		        	 snackbarOpen: false,
		        }
	      	}

	      	handleSnackbarClose() {
				this.setState({
					snackbarOpen: false,
					snackbarVertical: '',
					snackbarHorizontal: '',
				})
			}

	      	// 全局的snackbar this.props.showSnackbar调用即可
			// showSnackbar(description, message = "提示",icon) {
			// 	// this.setState({
			// 	// 	snackbarOpen: true,
			// 	// 	snackbarText: text,
			// 	// 	snackbarVertical: vertical,
			// 	// 	snackbarHorizontal: horizontal,
			// 	// })
			// 	const data = {
			// 		message,
			// 		description
			// 	}
			// 	if (icon) {
			// 		data.icon = icon;
			// 	}
			// 	notification.open(data);
			// }

				showSnackbar(text, vertical, horizontal) {
					this.setState({
						snackbarOpen: true,
						snackbarText: text,
						snackbarVertical: vertical,
						snackbarHorizontal: horizontal,
					})
				}
				//个别情况需要走
				showNotification = (description, message = "提示", icon) => {
					const data = {
						message,
						description
					}
					if (icon) {
						data.icon = icon;
					}
					notification.open(data);
				}
	      	render() {
		        const { snackbarOpen, snackbarText, snackbarHorizontal, snackbarVertical } = this.state;

		        
		        return (
		        	<React.Fragment>
		        		<Snackbar
                    className={"rootSnackbar"}
                    style={{zIndex:30000}}
				          	open={this.state.snackbarOpen}
				          	autoHideDuration={3000}
				          	anchorOrigin={{ vertical: this.state.snackbarVertical || 'top'
				          			, horizontal: this.state.snackbarHorizontal || 'center' }}
				          	onClose={() => this.handleSnackbarClose()}
				          	transition={Fade}
				          	SnackbarContentProps={{
				            	'aria-describedby': 'message-id',
				          	}}
				          	resumeHideDuration={2000}
				        	message={<span id="message-id">{this.state.snackbarText}</span>}
				        />
			            <WrappedComponent {...this.props} showSnackbar={ this.showSnackbar }	showNotification= { this.showNotification } >
			       	
			            </WrappedComponent>
		          	</React.Fragment>
		        )
	      	}
	    }
	}
}