import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

//业务组件
import PackageIndexNEIBanner from "./PackageIndexNEIBanner";

import PackageIndexNEIBannerConcent from "./PackageIndexNEIBannerConcent"

import PackageIndexNEISubmit from './PackageIndexNEISubmit'
import '../packageconcnet.css';
class PackageIndexNewandEditIndex extends Component{
	constructor(props) {
		super(props)
		this.state = {
			setPublication:false,
			id:undefined
		}
	}

	componentDidMount(){
		window.document.title = '众包创新'
	}

	setPublicationfun=(ids)=>{
		this.setState({
			setPublication:true,
			id:ids
		})
	}

	goback = () => {
		// window.history.go(-1)
		// window.location.href="/crowdsourcing";
		this.props.history.goBack()
	}

	render() {
		let {setPublication}=this.state;
		return (
			<div>
				<div className="clearfix">
					{setPublication===false?<div className={"educontent mt20 mb50"}>

							  <p className="clearfix mt20 mb20">
										<span className="fl font-24 color-grey-3">
											{this.props.match.params.id!=undefined?"编辑":"新建"}</span>
									<a className="color-grey-6 fr font-15 mr20" onClick={this.goback}>返回</a>
								</p>

					    	<PackageIndexNEIBanner {...this.props} />

								<PackageIndexNEIBannerConcent
									{...this.props}
									setPublicationfun={this.setPublicationfun}
								/>

								</div>:
							  <div className={"educontent mt30 mb50"}>
										<PackageIndexNEISubmit
											{...this.props}
											id={this.state.id}
										/>
							  </div>}
				</div>
			</div>
		)
	}
}
export default PackageIndexNewandEditIndex;