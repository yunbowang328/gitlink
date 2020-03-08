import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router';

import PropTypes from 'prop-types';
import Rate from 'rc-rate';

import './TaskResultLayer.css'

class ImageLayer extends Component {
    
  	render() {
      	let { showImage, imageSrc, onImageLayerClose } = this.props;
      	
      	// 语法介绍 https://reactjs.org/docs/portals.html
      	// 将html渲染都指定的element下
	    return ReactDOM.createPortal(
	    	<div>
		    	{showImage ? 
  		    	<div className="taskResultLayer" onClick={onImageLayerClose} style={{overflow: 'auto'}}>
  		    		<div className="passContent">
                		<div><img src={ imageSrc }  className="passImg" unselectable="on"/></div>
	  		      	</div>
	            </div>
		      	:
		      	<div></div>
		      	}
	      	</div>,
	      	document.getElementById('root'),
  		);
    }
}

export default ImageLayer;
