import React, { Component } from 'react';

// 登录后才能跳转
class LinkAfterLogin extends Component {

	constructor(props) {
		super(props);
	}
    checkAuth = () => {
        if (this.props.checkIfLogin()) {
					if(this.props.checkProfileComplete){
						if(this.props.checkIfProfileCompleted()){
							this.props.history.push(this.props.to)
						}else{
							this.props.showProfileCompleteDialog();
						}
					}else{
						this.props.history.push(this.props.to)
					}
        } else {
            this.props.showLoginDialog()
        }
    }
	render() {
		return(
			<a {...this.props} onClick={this.checkAuth}>{this.props.children}</a>
		)
	}
}

export default LinkAfterLogin;