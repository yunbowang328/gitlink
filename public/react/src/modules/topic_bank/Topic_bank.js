import React, { Component } from 'react';

import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Loading from '../../Loading'

import Loadable from 'react-loadable';
import { TPMIndexHOC } from '../tpm/TPMIndexHOC'
import { SnackbarHOC } from 'educoder'


const PackageIndex = Loadable({
	loader: () => import('../user/usersInfo/InfosTopics'),
	loading: Loading,
})


class Topic_bank extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount(){
	}

	render() {
		return (
			<div className="newMain clearfix">

				<Switch>
					<Route path="/topicbank/:username/:topicstype"
								 render={
									 (props) => (<PackageIndex {...this.props} {...props} {...this.state} />)
								 }
					></Route>

					<Route path="/topicbank/:topicstype"
								 render={
									 (props) => (<PackageIndex {...this.props} {...props} {...this.state} />)
								 }
					></Route>
				</Switch>

			</div>
		);
	}
}

export default SnackbarHOC() (TPMIndexHOC (Topic_bank)) ;