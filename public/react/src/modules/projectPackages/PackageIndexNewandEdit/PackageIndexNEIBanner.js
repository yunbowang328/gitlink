import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { Steps, Divider } from 'antd';
const { Step } = Steps;

class PackageIndexNEIBanner extends Component {
    constructor(props) {
        super(props)
        this.state = {
					current:0
        }
    }
    componentDidMount() {


    }

	onChange=(current)=>{
    	debugger
		console.log('onChange:', current);
		this.setState({ current });
	};

    render() {
			const { current } = this.state;
        return (
					<div className="edu-back-white mb20 PackageIndexNEIBanner">
						<p className="clearfix padding110">
							<Steps current={current} >
								<Step title="发布需求"/>
								<Step title="筛选合适的接包方"/>
								<Step title="线下交易，完成实施"/>
							</Steps>
						</p>
					</div>
        )
    }
}

export default PackageIndexNEIBanner;

