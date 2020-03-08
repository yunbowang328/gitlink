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

// 团队竞赛报名无报名子组件团队 竞赛报名-已创建战队
class RegisListviewdata extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			item: undefined
		}

	}

	componentDidMount() {
		////console.log("RegisListviewdata");
		////console.log(this.props.item)
		this.setState({
			item: this.props.item
		})

	}

	getotiku = (url) => {
		window.open(url, '_blank');
	}

	render() {
		const {item} = this.props;
		return (

			<div>
				{
					item !== undefined ?
						<div className={"yslborderbottom"}>
							<div className="regitem22">

								<div className="regitemimg1 ">
									<img className="regitemimg2" src={getImageUrl("images/" + item.creator.image_url)}>

									</img>
									<a className="maxnamewidth78" title={item.creator.name} style={{
										color: "#999999", fontSize: "14px",
										width: "78px",
										textAlign: "center"
									}}>{item.creator.name}</a>
								</div>
								<div style={{
									marginTop: "29px",
									marginLeft: "37px",
									width: "160px",
									textAlign: "center",
								}} className="textsize maxnamewidth160">
									{
										this.props.admin?
											this.props.admin===true?
												<a className="maxnamewidth160"  title={item.name} style={{
													fontSize: "16px",
													width: "160px",
													textAlign: "center",
													cursor:"pointer"
												}}
													 onClick={()=>this.getotiku(`/competitions/${this.props.match.params.identifier}/competition_teams/${item.id}`)}
												>{item.name}</a>
												:	<p className="maxnamewidth160" style={{
													color: "#05101A",
													fontSize: "16px",
													width: "160px",
													textAlign: "center"
												}}>{item.name}</p>
											:	<p className="maxnamewidth160" style={{
												color: "#05101A",
												fontSize: "16px",
												width: "160px",
												textAlign: "center"
											}}>{item.name}</p>
									}
								</div>
								<div style={{
									marginLeft: "37px",
									display: "flex",
									flexDirection: "initial",
									width: "487px"
								}}>

									{
										item && item.team_members.map((item, index) => {
											return (

												index === 0 ?
													<img className="regitemimgs" src={getImageUrl("images/" + item.image_url)}>

													</img>
													: index === 1 ?
													<img className="regitemimgs2" src={getImageUrl("images/" + item.image_url)}>

													</img>
													: index === 2 ?
														<img className="regitemimgs2" src={getImageUrl("images/" + item.image_url)}>

														</img>
														: index === 3 ?
															<img className="regitemimgs2" src={getImageUrl("images/" + item.image_url)}>

															</img>
															: index === 4 ?
																<img className="regitemimgs2" src={getImageUrl("images/" + item.image_url)}>

																</img>
																: index === 5 ?
																	<div>
																	<img className="regitemimgs2" src={getImageUrl("images/" + item.image_url)}>

																	</img>
																		<img className="regitemimgs22"
																				 src={getImageUrl(`images/educoder/competitions/pexjiazai.png`)}>
																	</img>
																	</div>
																	: ""

											)
										})
									}
								</div>
								<div style={{
									marginLeft: "41px",
									width: "134px",
									marginTop: "29px",
									textAlign: "center",
								}} className="maxnamewidth134">
									<a className="maxnamewidth134" title={item.school_name} style={{
										color: "#05101A",
										fontSize: "16px",
										textAlign: "center"
									}}>{item.school_name}</a>
								</div>
								<div style={{
									marginLeft: "37px",
									width: "151px",
									marginTop: "29px",

								}}>
									<p style={{
										color: "#999999",
										fontSize: "16px",
										textAlign: "center"
									}}>{item.created_at}</p>
								</div>
							</div>
						</div>
						: ""
				}
			</div>


		)
	}

}

export default RegisListviewdata;
