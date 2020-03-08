import React,{ Component } from "react";
import { Modal,Checkbox,Select,Input,Spin,Icon,Radio,DatePicker,Tooltip} from "antd";
import locale from 'antd/lib/date-picker/locale/zh_CN';
import axios from'axios';
import {handleDateString} from 'educoder';
import NoneData from "../coursesPublic/NoneData";
import Modals from '../../modals/Modals';
import moment from 'moment';
const Option = Select.Option;
const Search = Input.Search;
const dateFormat ="YYYY-MM-DD HH:mm"
function formatDate(date) {
	var dateee = new Date(date).toJSON();
	return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}
function range(start, end) {
	const result = [];
	for (let i = start; i < end; i++) {
		result.push(i);
	}
	return result;
}
function disabledDateTime() {
	return {
		disabledMinutes: () => range(1, 30).concat(range(31, 60)),
		// disabledSeconds: () => range(1,60)
	}
}
function disabledDate(current) {
	return current && current < moment().endOf('day').subtract(1, 'days');
}
class Selectresource extends Component{
	constructor(props){
		super(props);
		this.state={
			Searchvalue:undefined,
			type:'all',
			category_id:0,
			page:1,
			Resourcelist:undefined,
			hometypepvisible:true,
			getallfiles:false,
			searchtype:'getallfiles',
			Radiovalue:0,
			datatime:undefined
		}
	}
	componentDidMount() {
		this.getallfiles(undefined,1)
	}

	componentDidUpdate = (prevProps) => {



	}

	//勾选实训
	shixunhomeworkedit=(list)=>{

		this.setState({
			patheditarry:list
		})

	}


	//搜索
	SenttotheValue=(e)=>{
		this.setState({
			Searchvalue:e.target.value,
			page:1,
		})
	}

	SenttotheSearch=(value)=>{
		let {searchtype}=this.state;
		if(searchtype==="getallfiles"){
			this.getallfiles(value,1)
		}else if(searchtype==="getmyfiles"){
			this.getmyfiles(value,1)
		}
	}


	setupdatalist=(url,newpage)=>{
		let {Resourcelist,Searchvalue}=this.state;
		if(Resourcelist!=undefined){
			let newResourcelist=Resourcelist.files;
			axios.get(url,{
				params:{
					page:newpage,
					page_size:15,
					search:Searchvalue,
				}
			}).then((result)=>{

				var list=result.data.data.files;
				for(var i=0;i<list.length; i++ ){
					newResourcelist.push(list[i])
				}
				let lists={
					total_count:Resourcelist.total_count,
					files:newResourcelist
				}
				this.setState({
					Resourcelist:lists,
					hometypepvisible:false,
					getallfiles:true,
					page:newpage
				})
			}).catch((error)=>{
				console.log(error)
			})
		}
	}
	contentViewScroll=(e)=>{
		let {page,searchtype}=this.state;
		let newscrollTop=parseInt(e.currentTarget.scrollTop);
		let allclientHeight=e.currentTarget.clientHeight+newscrollTop;

		//滑动到底判断
		if(e.currentTarget.scrollHeight-allclientHeight===0||e.currentTarget.scrollHeight-allclientHeight===1||e.currentTarget.scrollHeight-allclientHeight===-1){
			let newpage=page+1;
			let url
			if(searchtype==="getallfiles"){
				url="/files/public_with_course_and_project.json";
				this.setupdatalist(url,newpage)

			}else if(searchtype==="getmyfiles"){
				url="/files/mine_with_course_and_project.json";
				this.setupdatalist(url,newpage)
			}
		}

	}

	//tag
	changeTag=(types)=>{

		this.setState({
			type:types,
			page:1,
			patheditarry:[],
			Resourcelist:undefined
		})
		// this.props.funshixunmodallist(Searchvalue,types,true,1)
		// this.props.funpatheditarry([])
		if(types==="all"){
			this.getallfiles(undefined,1)
		}else if(types==="my"){
			this.getmyfiles(undefined,1)
		}

	}

	getallfiles=(value,page)=>{
		let url = "/files/public_with_course_and_project.json";
		axios.get(url,{
			params:{
				page:1,
				page_size:15,
				search:value,
			}
		}).then((result)=>{
			this.setState({
				Resourcelist:result.data.data,
				hometypepvisible:false,
				getallfiles:true,
				searchtype:'getallfiles'
			})
		}).catch((error)=>{
			console.log(error)
		})
	}

	getmyfiles=(value,page)=>{

		let url = "/files/mine_with_course_and_project.json";
		axios.get(url,{
			params:{
				page:1,
				page_size:15,
				search:value,
			}
		}).then((result)=>{
			this.setState({
				Resourcelist: result.data.data,
				hometypepvisible:false,
				searchtype:'getmyfiles'
			})
		}).catch((error)=>{
			console.log(error)
		})
	}


	hidecouseShixunModal=()=>{
		this.props.hidecouseShixunModal()
	}

	ModalCancelModalCancel=()=>{
		this.setState({
			Modalstype:false,
			visible:false,
			Modalstopval:"",
			ModalSave:this.ModalCancelModalCancel,
			loadtype:false
		})
		this.props.hidecouseShixunModal()
	}

	savecouseShixunModal=()=>{

		let {patheditarry,datatime,Radiovalue}=this.state;
		let {coursesId,attachmentId}=this.props;
		let url="/files/import.json";

		if(patheditarry===undefined||patheditarry.length===0){
			this.setState({
				patheditarrytype:true
			})
			return
		}else{
			this.setState({
				patheditarrytype:false
			})
		}

		if(this.state.Radiovalue===1){
			if(datatime===undefined||datatime===null||datatime=== ""){
				this.setState({
					Radiovaluetype:true
				})
				return
			}else{
				this.setState({
					Radiovaluetype:false
				})
			}
		}

		axios.post(url, {
				course_id:coursesId,
				attachment_ids:patheditarry,
				course_second_category_id:this.props.coursesidtype===undefined||this.props.coursesidtype==="node"?0:attachmentId,
				delay_publish:Radiovalue,
				publish_time:Radiovalue===1?datatime:undefined
			}
		).then((response) => {
			if(response.data.status===0){
				this.ModalCancelModalCancel();
				this.props.updataleftNavfun();
				this.props.showNotification("选用资源成功");
				this.props.setupdate(attachmentId)
			}
		}).catch((error) => {
			console.log(error)
		})

	}

	RadioonChange=(e)=>{
		if(e.target.value===0){
			this.setState({
				datatime:undefined
			})
		}
		this.setState({
			Radiovalue: e.target.value,
		});
	}

	onChangeTimepublish= (date, dateString) => {

		this.setState({
			datatime:handleDateString(dateString),
		})

	}
	render(){
		let {Searchvalue,type,Resourcelist,hometypepvisible,patheditarry,datatime}=this.state;
		let {visible}=this.props;
		const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
		const radioStyle = {
			display: 'block',
			height: '30px',
			lineHeight: '30px',
		};
		return(
			<div>
				{/*提示*/}
				<Modals
					modalsType={this.state.Modalstype}
					modalsTopval={this.state.Modalstopval}
					modalCancel={this.state.ModalCancel}
					modalSave={this.state.ModalSave}
					loadtype= {this.state.loadtype}

				/>
				{visible===true?
					<Modal
						keyboard={false}
						title="选用资源"
						visible={visible}
						closable={false}
						footer={null}
						width="600px"
						destroyOnClose={true}
					>
						<style>
							{
								`
							.ant-modal-body{
                  padding: 30px 0px;
							}
							`
							}
						</style>

						<Spin indicator={antIcon} spinning={hometypepvisible}  size="large" style={{marginTop:'15%'}}>
							<style>{`
                .newupload_conboxtop{
                   margin-top: -30px;
                }
                #shixun_tab_div{
                   padding: 0 30px;
                   padding-top:30px;
                }
                .search-news{
									width: 237px!important;
									height: 30px;
									margin-bottom: 30px;
                }
              `}</style>

							<div className="newupload_conbox newupload_conboxtop">
								<div className="clearfix shixun_work_div newshixun_tab_div cdefault" style={{"marginRight":"4px"}} id="shixun_tab_div">

									<li className="fl mr5 mt5"> <a onClick={()=>this.changeTag("all")} className={ type==="all" ? "active edu-filter-cir-grey font-12":"edu-filter-cir-grey font-12"}>全部</a></li>
									<li className="fl mr5 mt5 ml15"> <a onClick={()=>this.changeTag("my")} className={ type==="my" ? " active edu-filter-cir-grey font-12":"edu-filter-cir-grey font-12"}>我的资源</a></li>
									<div className="fr search-news" >
										<Search
											placeholder="请输入发布人或名称进行搜索"
											value={Searchvalue}
											onInput={this.SenttotheValue}
											onSearch={(value) => this.SenttotheSearch(value)}
											style={{width: '100%'}}
										/>
									</div>
								</div>


								<style>{`
                .greybackHead{
                  padding:0px 30px;
                }
                .fontlefts{text-align: left;}
              `}</style>
								<ul className="clearfix greybackHead edu-txt-center">
									<li className="fl paddingleft22 fontlefts" style={{width:'220px'}}>资源名称</li>
									<li className="fl edu-txt-left" style={{width:'80px'}}>大小</li>
									<li className="fl" style={{width:'100px'}}>发布人</li>
									<li className="fl" style={{width:'100px'}}>时间</li>
								</ul>


								<style>{`
                   .color-grey-9a{color: #9A9A9A !important;}
                   .datastyle{
                      width: 120px;
									    overflow: hidden;
									    height: 37px;
                   }
                   .scrollbox{
                     height:250px !important;
                   }
                   .selectfilsbox{
								     height: 50px;
								     line-height: 50px;
                   }
                `}</style>
								<div className="over210 pl20 pr20 scrollbox"
										 onScroll={this.contentViewScroll}
								>

									{
										Resourcelist === undefined ?"":Resourcelist.files.length===0?<NoneData/>:

											<Checkbox.Group style={{ width: '100%' }} value={patheditarry}  onChange={this.shixunhomeworkedit}>
												{
													Resourcelist.files.map((item,key)=>{
														return(
															<div className="clearfix edu-txt-center lineh-40 bor-bottom-greyE selectfilsbox" key={key}>
																<li className="fl" style={{width:'220px'}}>
																	<Checkbox
																		value={item.id}
																		key={item.id}
																		className="fl task-hide edu-txt-left"
																		style={{"width":"220px"}}
																		name="shixun_homework[]"
																	>
																		<label style={{"textAlign":"left","color":"#4C4C4C"}} className="task-hide" title={item.title}>{item.title}</label>
																	</Checkbox>
																</li>
																<li className="fl edu-txt-left task-hide paddingl5 color-grey-9a" style={{width:'90px'}}>{item.filesize}</li>
																<li className="fl paddingl10 color-grey-9a" style={{width:'100px'}}>{item.author.name}</li>
																<li className="fl color-grey-9a paddingl10 datastyle">{formatDate(item.created_on)}</li>
															</div>
														)
													})
												}
											</Checkbox.Group>

									}
								</div>

								<div className={"mt10"}>
									<span className={"color-ooo fl mt6 ml20"}>发布设置：</span>
									<Radio.Group onChange={this.RadioonChange} value={this.state.Radiovalue} style={{'width': '460px'}}>
										<Radio style={radioStyle} value={0}>
											立即发布
										</Radio>
										<Tooltip placement="bottom" title={this.props.isStudent()===true?"不支持学生延迟发布":""} >
											<Radio style={radioStyle} value={1} className={"fl"} disabled={this.props.isStudent()}>
												<span className={"mr5"}>延期发布</span>
												<DatePicker
													dropdownClassName="hideDisable"
													showTime={{ format: 'HH:mm' }}
													locale={locale}
													format={dateFormat}
													placeholder="请选择发布时间"
													id={"startime"}
													showToday={false}
													width={"210px"}
													value={this.state.Radiovalue===1?datatime===undefined||datatime===""?undefined:moment(datatime, dateFormat):undefined}
													onChange={(e,index)=>this.onChangeTimepublish(e,index,undefined,1)}
													disabledTime={disabledDateTime}
													disabledDate={disabledDate}
													disabled={this.state.Radiovalue===1?false:true}
												/>
											</Radio>
										</Tooltip>
										<span className={"fl mt5 color-grey-c"}>(按照设置的时间定时发布)</span>
									</Radio.Group>
								</div>

								{this.state.patheditarrytype===true?<p className={"color-red ml20"}>请选择资源</p>:""}
								{this.state.Radiovaluetype===true?<p className={"color-red ml20"}>发布时间不能为空</p>:""}
								<div className="mt20 marginauto clearfix edu-txt-center">
									<a className="pop_close task-btn mr30 margin-tp26" onClick={this.hidecouseShixunModal}>取消</a>
									<a className="task-btn task-btn-orange margin-tp26" id="submit_send_shixun" onClick={this.savecouseShixunModal}>确定</a>
								</div>
							</div>
						</Spin>
					</Modal>:""}
			</div>
		)
	}
}
export default Selectresource;



