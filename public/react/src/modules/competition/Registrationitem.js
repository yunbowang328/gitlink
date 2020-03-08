import React, {Component} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import {SnackbarHOC, WordsBtn, getImageUrl} from 'educoder';
import {TPMIndexHOC} from '../tpm/TPMIndexHOC';
import competition from './comcss/competition.css';
import {Button} from 'antd';
import RegisListviewdata from "./RegisListviewdata";

// 团队竞赛报名无报名子组件团队 竞赛报名-已创建战队
class Registrationitem extends React.Component {
	constructor(props) {
		super(props)


	}


	render() {
		let {item} = this.props;
		return (
			<div className="yslborderbottom">
				{
					item !== undefined ?
			<div className="regitem2">
				<div className="perregitemimg1 ">
					<img className="personregitemimg" src={getImageUrl("images/" + item.creator.image_url)}>

					</img>
				</div>
				<div className="" style={{
					marginTop: "19px",
					marginLeft: "54px",
					display: "flex",
					flexDirection: "initial",
				}}>
					<p className="" style={{
						color: "#05101A",
						fontSize: "16px",
						width: "160px",
						textAlign: "center"
					}}>{item.creator.name}</p>
					{
						item.manage_permission === true ?
							<p className="" style={{
								color: "#459BE5",
								fontSize: "16px",
								textAlign: "center",
								marginLeft: "25px",
							}}>已报名</p>
							:
							""
					}

				</div>

				<div className="" style={{
					marginLeft: "632px",
					width: "151px",
					marginTop: "19px",
					marginRight: "35px",
				}}>
					<p style={{
						color: "#999999",
						fontSize: "16px",
						textAlign: "center",
					}}>{item.created_at}</p>
				</div>

			</div>
						: ""
				}
			</div>
		)
	}

}

export default Registrationitem;
