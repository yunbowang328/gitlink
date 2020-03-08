import React, { Component } from 'react';

import { Redirect } from 'react-router';

import { Route, Link, Switch } from "react-router-dom";

import Loading from '../../Loading';

import Loadable from 'react-loadable';
import { TPMIndexHOC } from '../tpm/TPMIndexHOC';
import { CNotificationHOC } from '../courses/common/CNotificationHOC';

//新版竞赛首页
const CompetitionsIndex = Loadable({
	loader: () => import('./Competitimain/CompetitionsIndex'),
	loading: Loading,
})

//竞赛详情页
const CompetitionCommon=Loadable({
	loader: () => import('./Competitioncommon/CompetitionCommon'),
	loading: Loading,
})


//战队详情
const CompetitionTeams = Loadable({
	loader: () => import('./Competition_teams/Competitionteams'),
	loading: Loading,
})

//团队竞赛报名
const Registration = Loadable({
	loader: () => import('../competition/Registration'),
	loading: Loading,
});

class Competitions extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount(){

		window.document.title = '竞赛';
	}

	render() {

		return (
			<div className="newMain clearfix">

				<Switch>

					{/*新版竞赛战队详情*/}
					<Route path="/competitions/:identifier/competition_teams/:competition_team_id"
								 render={
									 (props) => (<CompetitionTeams {...this.props} {...props} {...this.state} />)
								 }
					></Route>


					{/*新版竞赛报名*/}
					<Route
						path="/competitions/:identifier/enroll"
						render={
							(props) => (<Registration {...this.props} {...props} {...this.state}/>)
						}
					/>

					{/*新版竞赛详情页面*/}
					<Route path="/competitions/:identifier"
								 render={
									 (props) => (<CompetitionCommon {...this.props} {...props} {...this.state} />)
								 }
					></Route>

					{/*新版竞赛首页*/}
					<Route path="/competitions"
								 render={
									 (props) => (<CompetitionsIndex {...this.props} {...props} {...this.state} />)
								 }
					></Route>

				</Switch>

			</div>
		);
	}
}

export default CNotificationHOC() (TPMIndexHOC (Competitions)) ;