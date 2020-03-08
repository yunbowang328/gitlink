import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

//业务组件
import PackageBanner from "./PackageBanner";
import PackageConcent from "./PackageConcent";

class PackageIndex extends Component{
	constructor(props) {
		super(props)
	}

	componentDidMount(){
		window.document.title = '众包创新'
	}

	render() {
		return (
			<div>
				<div className="clearfix">
					{/*头部banner*/}
					<PackageBanner {...this.props}></PackageBanner>
					{/*内容banner*/}
					<PackageConcent {...this.props}></PackageConcent>
				</div>
			</div>
		)
	}
}
export default PackageIndex;