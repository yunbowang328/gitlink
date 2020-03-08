import React, { Component } from 'react';
import '../VNC.css'
const $ = window.$;
class FloatButton extends Component {
	componentDidMount() {
		

	}
	
  	render() {
  		const { challenge,  vnc_url, children, className } = this.props

	    return (
            <div className={`float_button ${className}` } onClick={this.props.onClick}>
                <style>{`
                    
                `}</style>
                <span class="text">{children || '版本库'}</span>
            </div>
	    );
  	}
}

export default FloatButton;
