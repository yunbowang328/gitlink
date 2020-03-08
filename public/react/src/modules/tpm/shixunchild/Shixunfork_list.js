import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import { Switch } from 'antd';

import PropTypes from 'prop-types';

import classNames from 'classnames'

import { TPMIndexHOC } from '../TPMIndexHOC'

import { SnackbarHOC } from 'educoder'

import ShixunCard from '.././shixuns/ShixunCard';

import { Pagination,Row,Col,Rate } from 'antd';

 import './shixunchildCss/Shixunfork_list.css';

import 'antd/lib/rate/style/index.css';

const $ = window.$;

class Shixunforklist extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
  }

  handleChange = (value) => {
    console.log('Page: ', value);
    // this.setState({ value });
  }
	//JSX
  	render() {
		const { match, history } = this.props

	    return (
		<div className="newMain clearfix">

				<div className="educontent">
				<div className="edu-back-white padding20 clearfix mb20 mt30">
					<span className="fl font-16">Fork实训列表</span>
					<Link to="/shixunchild" className="font-16 color-grey-9 fr">返回</Link>
				</div>


				<ShixunCard/>



				<div className="educontent edu-txt-center mb80">
				  <div className="inline pages_user_show">
					<ul>

					</ul>
					<div className="cl"></div>
				  </div>
				</div>
			  </div>
		</div>
	    );
  	}
}
export default SnackbarHOC() (TPMIndexHOC  ( Shixunforklist ));
