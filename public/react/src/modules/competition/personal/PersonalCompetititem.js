import React, {Component} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import {SnackbarHOC, WordsBtn, getImageUrl} from 'educoder';
import {TPMIndexHOC} from '../../tpm/TPMIndexHOC';
import competition from '../comcss/competition.css';
import {Button, message, Tooltip} from 'antd';
// 点击按钮复制功能
function jsCopy(s) {
	var e = document.getElementById(s);
	e.select();
	document.execCommand("Copy");
	codesuccess()
	// const  range=document.createRange();
	// window.getSelection().removeAllRanges();
	// range.selectNode(e.target);
	// window.getSelection().addRange(range);
	// const successful =document.execCommand('copy');
	// if(successful){
	// 	codesuccess()
	// }
}

function codesuccess() {
	message.success('复制成功');
};
// 团队竞赛报名无报名子组件团队 竞赛报名-已创建战队
class PersonalCompetititem extends React.Component {
	constructor(props) {
		super(props)


	}

	componentDidMount() {
		//  // ////console.log(this.props.data)


	}

	componentDidUpdate = (prevProps) => {
		//
		// if (prevProps.data != this.props.data) {
		//
		// }
	}

	render() {
		const {key, item, type, mode} = this.props;
		// ////console.log("PersonalCompetititem");
		// ////console.log(data);
		// ////console.log(data[0]);
		// ////console.log(data&&data[0].creator.image_url);
		// const listItems = mydatas.map((item, index) =>
		//
		// );
		// console.log("PersonalCompetititem");
		// console.log(data);
		// console.log("PersonalCompetititem");
		// console.log(type);
		// console.log("sdasjdhahsdas");
		// console.log(this.props);
		return (
			<div>
				{
					item !== undefined || item !== null ? <div className={"yslborderbottom"}>
							<div
								className={this.props.index === undefined || this.props.index === null ? "myregitem11" : this.props.index === 0 ? "regitem" : "myregitem11"}
								style={{
								marginBottom: "19px",
							}}>
								<div className="regitemimg1  ">
									<img className="regitemimg2" src={getImageUrl("images/" + item.creator.image_url)}>

								</img>
									<a className="maxnamewidth78" title={item.creator.name} style={{
									color: "#999999",
									fontSize: "14px",
									width: "78px",
									textAlign: "center"

									}}>{item.creator.name}</a>
							</div>
							<div className=" maxnamewidth160" style={{
								marginTop: "29px",
								marginLeft: "37px",
								width: "160px",
								textAlign: "center"
							}} >
								<a className="maxnamewidth160" title={item.name} style={{

									color: "#05101A",
									fontSize: "16px",
									width: "160px",
									textAlign: "center"
								}}>{item.name}</a>
							</div>
								{this.props.type === 5 || this.props.type === 2 ?
									(this.props.mode === 3 ?
											<div style={{
												marginLeft: "37px",
												display: "flex",
												flexDirection: "initial",
												width: "340px"
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
																		<div>
																			<img className="regitemimgs2" src={getImageUrl("images/" + item.image_url)}>

																			</img>

																			<img className="regitemimgs222"
																					 src={getImageUrl(`images/educoder/competitions/pexjiazai.png`)}>

																			</img>
																		</div>
																		: ""
														)
													})
												}

											</div>

											:
											<div className=" " style={{
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

																					<img className="regitemimgs222"
																							 src={getImageUrl(`images/educoder/competitions/pexjiazai.png`)}>

																					</img>
																				</div>
																				: ""
														)
													})
												}

											</div>
									)
									:
									<div className=" " style={{
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

																			<img className="regitemimgs222"
																					 src={getImageUrl(`images/educoder/competitions/pexjiazai.png`)}>

																			</img>
																		</div>
																		: ""
												)
											})
										}

									</div>
								}
								<div style={this.props.type === 5 || this.props.type === 2 ?
									(this.props.mode === 3 ?

											{
												marginLeft: "37px",
											}
											:
											{
												marginLeft: "18px",
											}
									)
									: {
										marginLeft: "16px",
							}}>
									<div style={{marginTop: "23px", width: '140px'}}>
								<span style={{
									color: "#05101A",
									fontSize: "16px",
								}}>邀请码：</span>
									<span
												style={{

													color: "#05101A",
									fontSize: "16px",
												}}>{item.invite_code === null || item.invite_code === undefined ? "" : item.invite_code}</span>
								</div>
								<div style={{
									overflow: 'hidden',
									height: "1px",
									width: "1px"
								}}>
									<input id={"copy_invite_code" + this.props.index}
												 value={item.invite_code === null || item.invite_code === undefined ? "" : item.invite_code}/>
								</div>
							</div>
								{item.invite_code === null || item.invite_code === undefined ?
									<i className="regitemimgs3 iconfont icon-fuzhi1 font-14 font-n"
										 style={{
											 marginLeft: "18px",
										 }}
									>
									</i>
									:
									<Tooltip placement="bottom" title={"复制邀请码"}>
										<i className="regitemimgs3 iconfont icon-fuzhi1 font-14 font-n"
											 style={{
												 marginLeft: "18px",
											 }}
											 onClick={() => {
												 jsCopy("copy_invite_code" + this.props.index)
											 }}
										>
										</i>
									</Tooltip>
								}

							{
								this.props.type === 5 ?
									(this.props.mode === 3 ?
											<div className="regitemimgs444"
													 style={{
														 marginLeft: "32px",
													 }}
											>
												<div className="regitemimgs555">
													<a
														href={`/competitions/${this.props.match.params.identifier}/competition_teams/${item.id}`}
														style={{
														color: "#459be5",
														width: "100%",
														height: "100%",
														lineHeight: "39px",
													}}>战队详情</a>
												</div>
												<div className="regitemimgs555"
														 style={item.manage_permission === true ? {display: "block"} : {display: "none"}}
														 onClick={() => this.props.Exittheteamshow(item.id, true)}>
													<p onClick={() => this.props.Exittheteamshow(item.id, true)}>删除战队</p>
												</div>
												<div className="regitemimgs6"
														 style={item.manage_permission === true ? {display: "block"} : {display: "none"}}
														 onClick={() => this.props.Createateamedit(item)}>
													<p onClick={() => this.props.Createateamedit(item)}>编辑战队</p>
												</div>
												<div className="regitemimgs6"
														 style={item.manage_permission === true ? {display: "none"} : {display: "block"}}
														 onClick={() => this.props.Exittheteamshow(item.id, false)}>
													<p onClick={() => this.props.Exittheteamshow(item.id, false)}>退出战队</p>
												</div>

											</div>
											:
											<div className="regitemimgs444"
													 style={{
														 marginLeft: "32px",
													 }}
											>

												<div className="regitemimgs5"
														 style={item.manage_permission === true ? {display: "block"} : {display: "none"}}
														 onClick={() => this.props.Exittheteamshow(item.id, true)}>
													<p onClick={() => this.props.Exittheteamshow(item.id, true)}>删除战队</p>
												</div>
												<div className="regitemimgs6"
														 style={item.manage_permission === true ? {display: "block"} : {display: "none"}}
														 onClick={() => this.props.Createateamedit(item)}>
													<p onClick={() => this.props.Createateamedit(item)}>编辑战队</p>
												</div>
												<div className="regitemimgs6"
														 style={item.manage_permission === true ? {display: "none"} : {display: "block"}}
														 onClick={() => this.props.Exittheteamshow(item.id, false)}>
													<p onClick={() => this.props.Exittheteamshow(item.id, false)}>退出战队</p>
												</div>

											</div>

									)
									: this.props.type === 2 ?
									(this.props.mode === 3 ?
											<div className="regitemimgs444 "
													 style={{
														 marginLeft: "32px",
													 }}
											>
												<div className="regitemimgs555">
													<a
														href={`/competitions/${this.props.match.params.identifier}/competition_teams/${item.id}`}
														style={{
														color: "#459be5",
														width: "100%",
														height: "100%",
														lineHeight: "39px",
													}}>战队详情</a>
												</div>
												<div className="regitemimgs555"
														 style={item.manage_permission === true ? {display: "block"} : {display: "none"}}
														 onClick={() => this.props.Exittheteamshow(item.id, true)}>
													<p onClick={() => this.props.Exittheteamshow(item.id, true)}>删除战队</p>
												</div>
												<div className="regitemimgs6"
														 style={item.manage_permission === true ? {display: "block"} : {display: "none"}}
														 onClick={() => this.props.Createateamedit(item)}>
													<p onClick={() => this.props.Createateamedit(item)}>编辑战队</p>
												</div>
												<div className="regitemimgs6"
														 style={item.manage_permission === true ? {display: "none"} : {display: "block"}}
														 onClick={() => this.props.Exittheteamshow(item.id, false)}>
													<p onClick={() => this.props.Exittheteamshow(item.id, false)}>退出战队</p>
												</div>
											</div>
											:
											<div className="regitemimgs444 "
													 style={{
														 marginLeft: "32px",
													 }}
											>
												<div className="regitemimgs5"
														 style={item.manage_permission === true ? {display: "block"} : {display: "none"}}
														 onClick={() => this.props.Exittheteamshow(item.id, true)}>
													<p onClick={() => this.props.Exittheteamshow(item.id, true)}>删除战队</p>
												</div>
												<div className="regitemimgs6"
														 style={item.manage_permission === true ? {display: "block"} : {display: "none"}}
														 onClick={() => this.props.Createateamedit(item)}>
													<p onClick={() => this.props.Createateamedit(item)}>编辑战队</p>
												</div>
												<div className="regitemimgs6"
														 style={item.manage_permission === true ? {display: "none"} : {display: "block"}}
														 onClick={() => this.props.Exittheteamshow(item.id, false)}>
													<p onClick={() => this.props.Exittheteamshow(item.id, false)}>退出战队</p>
												</div>
											</div>
									)
									:
									this.props.type === 3 ?
										<div className="regitemimgs4"
												 style={{
													 marginLeft: "32px",
												 }}
										>

											<div className="regitemimgs6" onClick={() => this.props.Exittheteamshow(item.id, false)}>
												<p onClick={() => this.props.Exittheteamshow(item.id, false)}>退出战队</p>
											</div>

										</div>
										:
										""

							}
						</div>
						</div>
						: ""
				}
			</div>


		)
	}

}

export default PersonalCompetititem;
