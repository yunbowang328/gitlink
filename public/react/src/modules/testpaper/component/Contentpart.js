import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {WordsBtn, ActionBtn,SnackbarHOC,getImageUrl} from 'educoder';
import axios from 'axios';
import {
	notification,
	Spin,
	Table,
	Pagination,
	Tabs,
	Input,
	Popover
} from "antd";
import './../testioncss/testioncss.css';

import NoneDatas from '../component/NoneDatas';
import Contentquestionbank from "./Contentquestionbank";
import LoadingSpin from '../../../common/LoadingSpin';
import Listjihe from "./Listjihe";
const { TabPane } = Tabs;
const Search = Input.Search;
class Contentpart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page:1,

		}
	}
	//初始化
	componentDidMount(){


	}
	//跳转人工组卷
	Mantegeneration=()=>{
		this.props.history.push('/question');
	}


	componentDidUpdate(prevProps) {
		if(prevProps.current_user !== this.props.current_user) {
			const isysladmins=this.props&&this.props.current_user&&this.props.current_user.admin?this.props.current_user.admin:false;
			const is_teacher=this.props&&this.props.current_user&&this.props.current_user.is_teacher?this.props.current_user.is_teacher:false;
			const professional_certification=this.props&&this.props.current_user&&this.props.current_user.professional_certification?this.props.current_user.professional_certification:false;
			let {defaultActiveKey} = this.props;
			var defaultActiveKeys=defaultActiveKey;
			if(isysladmins===true||(is_teacher===true&&professional_certification===true)){
				defaultActiveKeys="0"
			}else{
				defaultActiveKeys="1"
			}
			this.props.callback(defaultActiveKeys);
		}
	}

	render() {
		let {page}=this.state;
		let {defaultActiveKey}=this.props;


		const isysladmins=this.props&&this.props.current_user&&this.props.current_user.admin?this.props.current_user.admin:false;
		const is_teacher=this.props&&this.props.current_user&&this.props.current_user.is_teacher?this.props.current_user.is_teacher:false;
		const professional_certification=this.props&&this.props.current_user&&this.props.current_user.professional_certification?this.props.current_user.professional_certification:false;

		const contents = (
			<div  className="questiontypes" style={{
				width:'93px',
				height:'160px',
			}}>
				<p className="questiontype " onClick={()=>this.props.setdifficulty(null)}>全部</p>
				<p className="questiontypeheng"></p>
				<p className="questiontype " onClick={()=>this.props.setdifficulty(1)}>简单</p>
				<p className="questiontypeheng"></p>
				<p className="questiontype "  onClick={()=>this.props.setdifficulty(2)}>适中</p>
				<p className="questiontypeheng"></p>
				<p className="questiontype "  onClick={()=>this.props.setdifficulty(3)}>困难</p>
				<p className="questiontypeheng"></p>
			</div>
		);


		return (
			<div className=" clearfix mt25">
				<div className="educontent mt10 pb20 w1200s">
					<div className="w1200ms contentparttit" style={{
						position: "relative",
					}}>
						<style>
							{
								`
								.contentparttit .ant-tabs-bar{
										margin: 0px 0px 0px 0px !important;
								}
								.contentparttit .ant-tabs-nav  .ant-tabs-tab{
								margin: 10px 10px 10px 0 !important;
								}
								.contentparttit .ant-tabs-nav .ant-tabs-ink-bar{
								width: 31px !important;
								left: 14px;
								}
								.ant-tabs-nav{
								z-index: 1000;
								}
								`
							}
						</style>

						{
							isysladmins===true||(is_teacher===true&&professional_certification===true)?
									<Tabs activeKey={defaultActiveKey} onChange={(e)=>this.props.callback(e)}>
										<TabPane tab="公共" key="1">
										</TabPane>
										<TabPane tab="我的" key="0">
										</TabPane>
									</Tabs>
								:
								<Tabs activeKey={1} onChange={(e)=>this.props.callback(e)}>
									<TabPane tab="公共" key="1">
									</TabPane>
								</Tabs>
						}
						<div className=" mt19" style={{
							position:"absolute",
							top: "0px",
							paddingLeft: "170px",
							width: "100%",
						}}>
							<style>
								{
									`
									.sortinxdirection .ant-input-group-addon{
									width: 60px !important;
									
									}
									
									.sortinxdirection .ant-input-lg {
  								  height: 41px;}
                 
                  .sortinxdirection .ant-popover{
                       top: 348px !important;
                   }
                   
									`
								}
							</style>
							<div className={isysladmins===true||(is_teacher===true&&professional_certification===true)?"sortinxdirection":"xaxisreverseorder"}>
								<Search
									style={{ width: "347px",marginRight:"60px",}}
									placeholder="请输入题目名称、内容"
									enterButton
									size="large"
									onInput={(e)=>this.props.setdatafunsval(e)}
									onSearch={ (value)=>this.props.setdatafuns(value)}
									value={this.props.keywords}
								/>

								{
									isysladmins===true||(is_teacher===true&&professional_certification===true)?
										<div className="xaxisreverseorder" style={{
											width:"50%"
										}}>

											<a href={'/Integeneration'}>
												<div className="newbutoonss">
													<p className="newbutoontess" >智能组卷</p>
												</div>
											</a>

											<a href={'/question'} >
												<div className="newbutoons mr39">
													<p className="newbutoontess" >人工组卷</p>
												</div>
											</a>
										</div>
										:""
								}

							</div>

						</div>
					</div>
					{/*内容*/}
					{
						this.props.Contentdata.exams === undefined ||this.props.Contentdata.exams === null||this.props.Contentdata.exams.length===0 ?
							<div className=" w100s mb10"></div>
							:
							<div className=" w100s mb10" style={
								{
									position:"relative",
								}
							}>
								{
									defaultActiveKey===1||defaultActiveKey==="1"?
										<Contentquestionbank {...this.props} {...this.state}  ></Contentquestionbank>
										:""
								}
								{
									defaultActiveKey===0||defaultActiveKey==="0"?
										<Contentquestionbank {...this.props} {...this.state} ></Contentquestionbank>
										:""
								}
							</div>
					}


					<div className="minheight">
						{/*列表集合*/}
						<div className=" w100s">
							{
								this.props.booljupyterurls===true?
									<LoadingSpin></LoadingSpin>
									:
									this.props.Contentdata.exams === undefined ||this.props.Contentdata.exams === null||this.props.Contentdata.exams.length===0?
										<NoneDatas></NoneDatas>


										: this.props.Contentdata.exams.map((object, index) => {
											return (
												<Listjihe {...this.state} {...this.props} items={object} key={index}
																	Testpapereditor={(e)=>this.props.Testpapereditor(e)}
																	showmodels={(e)=>this.props.showmodels(e)}
																	showmodelysl={(e)=>this.props.showmodelysl(e)}
																	Isitapopup={this.props.Isitapopup}
												>

												</Listjihe>
											)
										})}



						</div>

					</div>


			</div>
				</div>
		)

	}



}
export default Contentpart
