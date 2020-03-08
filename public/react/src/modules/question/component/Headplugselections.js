import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {WordsBtn, ActionBtn,SnackbarHOC,getImageUrl} from 'educoder';
import axios from 'axios';
import './../questioncss/questioncom.css';
import { Select, Input,Menu, Dropdown,notification,
	Spin,
	Table,
	Pagination} from 'antd';

import 'antd/lib/style/index.css';

import 'antd/lib/select/style/index.css';

import 'antd/lib/input/style/index.css';

import '../../tpm/shixuns/shixunCss/ShixunSearchBar.css';


const $ = window.$;

const Option = Select.Option;

const Search = Input.Search;

class Headplugselections extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page:1,
			titlestting:"全部",
			titlesttingid:null,
			titlesttings:null,
			titlesttingss:null,
			status: undefined,
			diff: null,
			InputValue: undefined,
			shixunhoverData: [],
			shixunchildValues:'',
			shixunsearchAllvalue:"a",
			openStatus:false,
			openLevel:false,
			tixing:null,

		}
	}
	//初始化
	componentDidMount(){

	}

	settitlestting=(name,id)=>{
		//如果全部其他的选项重置
		this.setState({
			titlestting:name,
			titlesttingid:id,
			titlesttings:null,
			titlesttingsid:null,
			titlesttingss:null,
			titlesttingssid:null
		})
		if(name==="全部"){
			this.props.setdiscipline_id(null);

		}else{
			this.props.setdiscipline_id(id);
		}



	}

	shixunsearchall=(id)=>{
		this.setState({
			shixunsearchAllvalue:id,
			shixunchildValues:""
		})
		try {
			this.props.setdiscipline_id(null);
		}catch (e) {

		}
	}

	//获取方向
	shixunsearchAll = (id) => {
		//console.log("获取方向");
		//console.log(id);
		if(id!=undefined){
			this.setState({
				shixunsearchAllvalue:id,
			})
			try {
				this.props.setdiscipline_id(id);
			}catch (e) {

			}

		}

	}
	//难度筛选
	diff_search = (value) => {
		this.setState({
			diff: value,
			openLevel:false
		})
		try {
			this.props.setdifficulty(value);
		}catch (e) {

		}
	}

	//题型塞选
	settixingtixing=(value)=>{
		this.setState({
			tixing: value,
		})

	  try {
			this.props.setitem_types(value);
		}catch (e) {

		}

	}

	getshixunchildValue = (id,ids) => {
		// //console.log("getshixunchildValue");
		// //console.log(id);
		// debugger
		if(id!=undefined ||ids!=undefined){
			this.setState({
				shixunsearchAllvalue:ids
			})

			try {
				this.props.setsub_discipline_id(ids,id);
			}catch (e) {

			}
		}
	}
	render() {
		let {shixunhoverData, shixunchildValues, shixunsearchAllvalue, InputValue,openStatus,openLevel} = this.state;
		let {disciplinesdata} = this.props;
		let overlaymenu=(item,id)=>(
			<Menu>
				{
					item&&item.map((list,k)=>{
						return(
							<Menu.Item key={k}>
								<div className="mt5 subshaicontent-part" key={k}>
									<a style={{ height: '20px' }} className={ "mb15 shixun_repertoire color-dark intermediatecenterysls textcen "}  name={list.id} id={list.id} onClick={()=>this.getshixunchildValue(list.id,id)}>{list.name}</a>
								</div>
							</Menu.Item>
						)
					})
				}
			</Menu>
		)
		return (
			<div className=" clearfix mt21  ">
				<div className="educontent w1200dbl">

					<div className="clearfix edu-back-white    tophomss">
						{/*课程*/}


						<div className="edu-back-white" >
							<div className="educontent">
								<div >
									<div className="clearfix mb10 shaiContent  sortinxdirection">
										<span className=" fl mt3">方向：</span>
										<span>
										<li className={shixunsearchAllvalue==="a"?"shaiItem shixun_repertoire active ":"shaiItem shixun_repertoire "} value= "a"    onClick={()=>this.shixunsearchall("a")}>全部</li>
										</span>
										<style>
											{
												`
												.shaiAllItem{
															 max-width: 930px!important;
												}
												`
											}
										</style>
										<div className="fl pr shaiAllItem ">
											<style>
												{
													`
															.ant-dropdown{
														     width: 800px;
															}
															.shixun_repertoire{
															  text-align: center;
																	cursor: pointer;
																	float: left;
																	color: #999;
																	cursor: pointer;
																	margin-bottom: 10px;
															}
															.ant-dropdown-menu-item, .ant-dropdown-menu-submenu-title{
    															padding: 0px 12px;
															}
															.ant-dropdown-menu-item:hover, .ant-dropdown-menu-submenu-title:hover{
													      background:transparent !important;
															}
															.dingbus .ant-dropdown ul{
															display: flex;
															flex-direction: row;
															flex-wrap: wrap;
															}
															
															.shaiItem{
															padding: 3px 14px;
															}
															
															.active{
															    border-radius:16px !important;
															}
															.shaiContent li.shaiItem:hover {
															  border-radius:16px !important;
															}
															`
												}
											</style>
											<div className="dingbus">


											{
												disciplinesdata&&disciplinesdata.map((item,key)=>{
													return(
														<Dropdown getPopupContainer={trigger => trigger.parentNode} overlay={overlaymenu(item.sub_disciplines,item.id)} key={key} placement={item.id<4?"bottomRight":item.id>=8?"bottomLeft":"bottomCenter"}>
															<li  key={key} className={parseInt(shixunsearchAllvalue)===item.id?"shaiItem shixun_repertoire active":"shaiItem shixun_repertoire"} value={item.id}  onClick={()=>this.shixunsearchAll(item.id)}>
																{item.name}
															</li>
														</Dropdown>
													)
												})
											}

											</div>
										</div>


									</div>

                  {/*题型*/}

									<div className="clearfix">
										<span className=" fl mt6">题型：</span>
										{
											<style>
												{`
															  .shaiItems{
																		padding: 3px 15px;
																		float: left;
																		border-radius: 4px;
																		color: #4C4C4C;
																		cursor: pointer;
																		margin-right: 15px;
																		display: block;
																		float:left;
																	}
																	.shaiItems.active {
																			background-color: #4CACFF!important;
																			color: #fff!important;
																	}
															`}
											</style>
										}
										<div className="fl pr shaiAllItem mt1">
											<li className={this.state.tixing===null?"shaiItems shixun_repertoire active":"shaiItems shixun_repertoire"}  onClick={()=>this.settixingtixing(null)}>全部</li>
											<li className={this.state.tixing==="PROGRAM"?"shaiItems shixun_repertoire active":"shaiItems shixun_repertoire"}  onClick={()=>this.settixingtixing("PROGRAM")}>编程题</li>
											<li className={this.state.tixing==="SINGLE"?"shaiItems shixun_repertoire active":"shaiItems shixun_repertoire"}  onClick={()=>this.settixingtixing("SINGLE")}>单选题</li>
											<li className={this.state.tixing==="MULTIPLE"?"shaiItems shixun_repertoire active":"shaiItems shixun_repertoire"}  onClick={()=>this.settixingtixing("MULTIPLE")}>多选题</li>
											<li className={this.state.tixing==="JUDGMENT"?"shaiItems shixun_repertoire active":"shaiItems shixun_repertoire"}  onClick={()=>this.settixingtixing("JUDGMENT")}>判断题</li>
										</div>

									</div>
                  {/*题型结尾*/}
                   {/*难度*/}
									<div className="clearfix mb10">
										<span className=" fl mt6">难度：</span>
										{
											<style>
												{`
															  .shaiItems{
																		padding: 3px 15px;
																		float: left;
																		border-radius: 4px;
																		color: #4C4C4C;
																		cursor: pointer;
																		margin-right: 15px;
																		display: block;
																		float:left;
																	}
																	.shaiItems.active {
																			background-color: #4CACFF!important;
																			color: #fff!important;
																	}
															`}
											</style>
										}
										<div className="fl pr shaiAllItem mt1">
											<li className={this.state.diff===null?"shaiItems shixun_repertoire active":"shaiItems shixun_repertoire"}  onClick={()=>this.diff_search(null)}>全部</li>
											<li className={this.state.diff===1?"shaiItems shixun_repertoire active":"shaiItems shixun_repertoire"}  onClick={()=>this.diff_search(1)}>简单</li>
											<li className={this.state.diff===2?"shaiItems shixun_repertoire active":"shaiItems shixun_repertoire"}  onClick={()=>this.diff_search(2)}>适中</li>
											<li className={this.state.diff===3?"shaiItems shixun_repertoire active":"shaiItems shixun_repertoire"}  onClick={()=>this.diff_search(3)}>困难</li>
										</div>

									</div>
                  {/*难度结尾*/}

								</div>
							</div>
						</div>









						{/*课程尾巴*/}
					</div>
				</div>
			</div>
		)

	}



}
export default  Headplugselections ;
