import React, { Component } from 'react';

import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Loading from '../../Loading'

import Loadable from 'react-loadable';
import { TPMIndexHOC } from '../tpm/TPMIndexHOC'
import { SnackbarHOC } from 'educoder'


const PackageIndex = Loadable({
	loader: () => import('./PackageIndex/PackageIndex'),
	loading: Loading,
})

const PackageIndexNewandEdit = Loadable({
	loader: () => import('./PackageIndexNewandEdit/PackageIndexNewandEditIndex'),
	loading: Loading,
})

const PackageIndexNEITaskDetails = Loadable({
	loader: () => import('./PackageIndexNEITaskDetails/PackageIndexNEITaskDetails'),
	loading: Loading,
})

class ProjectPackageIndex extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount(){
		window.document.title = '众包创新'
	}

	render() {

		return (
			<div className="newMain clearfix">

				<Switch>
					{/*众包首页*/}

					<Route path="/crowdsourcing/:id/edit"
								 render={
									 (props) => (<PackageIndexNewandEdit {...this.props} {...props} {...this.state} />)
								 }
					></Route>

					<Route path="/crowdsourcing/new"
								 render={
									 (props) => (<PackageIndexNewandEdit {...this.props} {...props} {...this.state} />)
								 }
					></Route>

					<Route path="/crowdsourcing/:id"
								 render={
									 (props) => (<PackageIndexNEITaskDetails {...this.props} {...props} {...this.state} />)
								 }
					></Route>

					<Route path="/crowdsourcing"
								 render={
									 (props) => (<PackageIndex {...this.props} {...props} {...this.state} />)
								 }
					></Route>
				</Switch>

			</div>
		);
	}
}

export default SnackbarHOC() (TPMIndexHOC (ProjectPackageIndex)) ;