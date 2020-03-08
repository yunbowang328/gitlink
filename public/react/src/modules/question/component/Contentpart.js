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
	Popover,
	Tooltip
} from "antd";
import './../questioncss/questioncom.css';
import NoneDatas from '../component/NoneDatas';
import LoadingSpin from '../../../common/LoadingSpin';
import Contentquestionbank from "./Contentquestionbank";
import Listjihe from "./Listjihe";
const { TabPane } = Tabs;
const Search = Input.Search;
class Contentpart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page:1,
			chakanjiexibool:false,
		}
	}
	//初始化
	componentDidMount(){


	}

	chakanjiexibool=(index)=>{
   this.props.chakanjiexibool(index);
	}
	componentDidUpdate(prevProps) {
		if(prevProps.current_user !== this.props.current_user) {
			debugger
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
	xinzenw=(e)=>{
		var urls="?";
		 if(this.props.discipline_id){
			 if(urls==="?"){
				 urls=urls+`discipline_id=${this.props.discipline_id}`
			 }else {
				 urls=urls+`&discipline_id=${this.props.discipline_id}`
			 }
		 }
		if(this.props.sub_discipline_id){
			if(urls==="?"){
				urls=urls+`sub_discipline_id=${this.props.sub_discipline_id}`
			}else {
				urls=urls+`&sub_discipline_id=${this.props.sub_discipline_id}`
			}
		}
		if(this.props.tag_discipline_id){
			if(urls==="?"){
				urls=urls+`sub_discipline_id=${this.props.tag_discipline_id}`
			}else {
				urls=urls+`&sub_discipline_id=${this.props.tag_discipline_id}`
			}
		}
		if(this.props.difficulty){
			if(urls==="?"){
				urls=urls+`difficulty=${this.props.difficulty}&`
			}else {
				urls=urls+`&difficulty=${this.props.difficulty}`
			}
		}
		if(this.props.item_type){
			if(urls==="?"){
				urls=urls+`item_type=${this.props.item_type}`
			}else {
				urls=urls+`&item_type=${this.props.item_type}`
			}

		}


		this.props.history.push("/question/newitem"+urls);
	}
	render() {
		let {page}=this.state;
		let {defaultActiveKey,item_type,booljupyterurls}=this.props;
		const isysladmins=this.props&&this.props.current_user&&this.props.current_user.admin?this.props.current_user.admin:false;
		const is_teacher=this.props&&this.props.current_user&&this.props.current_user.is_teacher?this.props.current_user.is_teacher:false;
		const professional_certification=this.props&&this.props.current_user&&this.props.current_user.professional_certification?this.props.current_user.professional_certification:false;


		const content = (
			<div className="questiontypes" style={{
				width:'93px',
				height:'200px',
			}}>
				<p className="questiontype " onClick={()=>this.props.setitem_types(null)}>全部</p>
				<p className="questiontypeheng" ></p>
				<p className="questiontype " onClick={()=>this.props.setitem_types("SINGLE")}>单选题</p>
				<p className="questiontypeheng" ></p>
				<p className="questiontype "  onClick={()=>this.props.setitem_types("MULTIPLE")}>多选题</p>
				<p className="questiontypeheng"></p>
				<p className="questiontype "  onClick={()=>this.props.setitem_types("JUDGMENT")}>判断题</p>
				<p className="questiontypeheng"></p>
				<p className="questiontype "  onClick={()=>this.props.setitem_types("PROGRAM")}>编程题</p>
				<p className="questiontypeheng"></p>

			</div>
		);
		const contents = (
			<div  className="questiontypes" style={{
				width:'93px',
				height:'120px',
			}}>
				<p className="questiontype " onClick={()=>this.props.setoj_status(null)}>全部</p>
				<p className="questiontypeheng"></p>
				<p className="questiontype " onClick={()=>this.props.setoj_status(0)}>未发布</p>
				<p className="questiontypeheng"></p>
				<p className="questiontype " onClick={()=>this.props.setoj_status(1)}>已发布</p>
				<p className="questiontypeheng"></p>
			</div>
		);


		//console.log("Contentpart.js");
		//console.log(this.props.defaultActiveKey);

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
							right:" 0px",
							paddingRight: "20px",
						}}>
							<style>
								{
									`
									
									.xaxisreverseorder .ant-input-group-addon{
									width: 60px !important;
									
									}
									
									.xaxisreverseorder .ant-input-lg {
    height: 41px !important;}
                 
                  .xaxisreverseorder .ant-popover{
                       top: 30px !important;
                   }
                   
                   
                  .xaxisreverseorder .ant-popover-inner-content {
                   padding:0px !important;
                   }
   
									`
								}
							</style>
						 <div className="xaxisreverseorder">
							 {
								 defaultActiveKey===0||defaultActiveKey==="0"?
									 isysladmins===true||(is_teacher===true&&professional_certification===true)?
											 this.props.Isitapopup&&this.props.Isitapopup==="true"?
												 ""
												 :
												 <a onClick={(e)=>this.xinzenw(e)}>
													 <div className="newbutoon">
														 <p className="newbutoontes" >新增</p>
													 </div>
												 </a>
											 :""
									 :""
							 }

							 {item_type==="PROGRAM"?
								 defaultActiveKey===0||defaultActiveKey==="0"?
									<Popover getPopupContainer={trigger => trigger.parentNode}  placement="bottom" trigger="hover" content={contents}   onVisibleChange={()=>this.props.handleVisibleChange(true)}>
										<div className=" sortinxdirection mr30">

											<div className="subjecttit">
												全部
											</div>
											<i className="iconfont icon-sanjiaoxing-down font-12 lg ml7 icondowncolor"></i>
										</div>
									</Popover>
									:
									"":""
							 }


							 {
								 defaultActiveKey===0||defaultActiveKey==="0"?
									 this.props.Isitapopup&&this.props.Isitapopup==="true"?
										 <Search
											 style={isysladmins===true||(is_teacher===true&&professional_certification)?{ marginRight:"0px"}:{marginRight:"0px"}}
											 className={"xaxisreverseorder searchwidth"}
											 placeholder="请输入题目名称、内容"
											 enterButton
											 size="large"
											 onInput={(e)=>this.props.setdatafunsval(e)}
											 onSearch={ (value)=>this.props.setdatafuns(value)} />
										 :
									 <Search
										 style={isysladmins===true||(is_teacher===true&&professional_certification)?{ marginRight:"30px"}:{marginRight:"0px"}}
										 className={"xaxisreverseorder searchwidth"}
										 placeholder="请输入题目名称、内容"
										 enterButton
										 size="large"
										 onInput={(e)=>this.props.setdatafunsval(e)}
										 onSearch={ (value)=>this.props.setdatafuns(value)} />
									 :
									 <Search
										 className={"xaxisreverseorder searchwidth"}
										 placeholder="请输入题目名称、内容"
										 enterButton
										 size="large"
										 onInput={(e)=>this.props.setdatafunsval(e)}
										 onSearch={ (value)=>this.props.setdatafuns(value)} />
							 }

						 </div>

						</div>
					</div>
					{/*内容*/}
					{
						this.props.Contentdata.items === undefined ||this.props.Contentdata.items === null||this.props.Contentdata.items.length===0 ?
							<div className=" w100s mb10"></div>
							:
							<div className=" w100s mb10">
								{
							defaultActiveKey===1||defaultActiveKey==="1"?
										<Contentquestionbank {...this.props} {...this.state}  selectallquestionsonthispage={()=>this.props.selectallquestionsonthispage()} ></Contentquestionbank>
										:""
								}
								{
									defaultActiveKey===0||defaultActiveKey==="0"?
										<Contentquestionbank {...this.props} {...this.state} selectallquestionsonthispage={()=>this.props.selectallquestionsonthispage()}></Contentquestionbank>
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
							this.props.Contentdata.items === undefined ||this.props.Contentdata.items === null||this.props.Contentdata.items.length===0?
							 <NoneDatas></NoneDatas>


							: this.props.Contentdata.items.map((object, index) => {
							return (
								<Listjihe {...this.state} {...this.props}
													Isitapopup={this.props.Isitapopup}
													chakanjiexiboolindex={this.props.chakanjiexiboolindex}
													chakanjiexibool={(keindex)=>this.chakanjiexibool(keindex)}
													listjihe={index+1}
													keindex={index}
													items={object}
													key={index}
													getitem_basketss={(id)=>this.props.getitem_basketss(id)}
													getitem_baskets={(e)=>this.props.getitem_baskets(e)}
													showmodels={(e)=>this.props.showmodels(e)}
													showmodelysl={(e)=>this.props.showmodelysl(e)}>

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
