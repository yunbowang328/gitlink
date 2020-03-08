import React,{ Component } from "react";
import { Modal,Checkbox,DatePicker} from "antd";
import { handleDateString } from 'educoder';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
const CheckboxGroup = Checkbox.Group;
const dateFormat = 'YYYY-MM-DD HH:mm';

function range(start, end) {
	const result = [];
	for (let i = start; i < end; i++) {
		result.push(i);
	}
	return result;
}
function disabledDateTime() {
	return {
		// disabledHours: () => range(0, 24).splice(4, 20),
		disabledMinutes: () => range(1, 30).concat(range(31, 60)),
		// disabledSeconds: () => [55, 56],
	};
}


function disabledDate(current) {
	return current && current < moment().endOf('day').subtract(1, 'days');
}



class OneSelfOrderModal extends Component{
	constructor(props){
		super(props);
		this.state={
			group_ids:[],
			endtime:"",
			course_groups:undefined,
			Checkboxtype:true
		}
	}
	componentDidMount() {


		if(this.props.course_groups!=undefined&&this.props.course_groups.length!=0){
				if(this.props.course_groups!=undefined) {
						let arr = this.props.course_groups.map(item => item.id);
						let newarr = [];
						let course_groups = this.props.course_groups;
						course_groups.map((item, key) => {
							if (item.end_time === null) {
								// if(this.props.starttimesend===undefined){
								// 	item.end_time = moment(moment(handleDateString(this.props.staytime)).add(1, 'week')).format("YYYY-MM-DD HH:mm");
								// }else{
								// 	item.end_time = moment(handleDateString(this.props.starttimesend)).format("YYYY-MM-DD HH:mm");
								// }
								item.end_time = moment(moment(handleDateString(this.props.staytime)).add(1, 'week')).format("YYYY-MM-DD HH:mm");
								newarr.push(item)
							} else {
								newarr.push(item)
							}
						})
						this.setState({
							course_groups: newarr
						})
						this.shixunhomeworkedit(arr);
				}
		}

		if(this.props.starttimes===undefined||this.props.starttimes===""||this.props.starttimes===null){
			if(this.props.starttimesend===undefined){
				this.setState({
					endtime:moment(moment(handleDateString(this.props.staytime)).add(1, 'week')).format("YYYY-MM-DD HH:mm")
				})
			}else{
				this.setState({
					endtime:moment(handleDateString(this.props.starttimesend)).format("YYYY-MM-DD HH:mm")
				})
			}

		}else{
			if(this.props.starttimesend===undefined){
				this.setState({
					endtime:moment(moment(handleDateString(this.props.staytime)).add(1, 'week')).format("YYYY-MM-DD HH:mm")
				})
			}else{
				this.setState({
					endtime:moment(handleDateString(this.props.starttimesend)).format("YYYY-MM-DD HH:mm")
				})
			}
		}
	}
	componentDidUpdate=(prevProps)=>{

		if(prevProps.course_groups!=this.props.course_groups){
				if(this.props.course_groups!=undefined){
						let arr=this.props.course_groups.map(item => item.id);
						let newarr=[];
						let course_groups=this.props.course_groups;
						course_groups.map((item,key)=>{
							if(item.end_time===null){
								item.end_time = moment(moment(handleDateString(this.props.staytime)).add(1, 'week')).format("YYYY-MM-DD HH:mm");
								newarr.push(item)
							}else{
								newarr.push(item)
							}
						})
						this.setState({
							course_groups:newarr
						})
						this.shixunhomeworkedit(arr);
				}
		}


		if(prevProps.starttimes!=this.props.starttimes){

			if(this.props.starttimes===undefined||this.props.starttimes===""||this.props.starttimes===null){
				if(this.props.starttimesend===undefined){
					this.setState({
						endtime:moment(moment(handleDateString(this.props.staytime)).add(1, 'week')).format("YYYY-MM-DD HH:mm")
					})
				}else{
					this.setState({
						endtime:moment(handleDateString(this.props.starttimesend)).format("YYYY-MM-DD HH:mm")
					})
				}

			}else{
				if(this.props.starttimesend===undefined){
					this.setState({
						endtime:moment(moment(handleDateString(this.props.staytime)).add(1, 'week')).format("YYYY-MM-DD HH:mm")
					})
				}else{
					this.setState({
						endtime:moment(handleDateString(this.props.starttimesend)).format("YYYY-MM-DD HH:mm")
					})
				}
			}
		}
	}

	//勾选实训
	shixunhomeworkedit=(list)=>{
   if(this.state.course_groups){
		 if(this.state.course_groups.length===list.length){
			 this.setState({
				 Checkboxtype:true,
				 group_ids:list
			 })
		 }else{
			 this.setState({
				 Checkboxtype:false,
				 group_ids:list
			 })
		 }
	 }else{
		 this.setState({
			 group_ids:list
		 })
	 }

		this.props.getcourse_groupslist && this.props.getcourse_groupslist(list)
	}

	onChangeTimeend= (date, dateString) => {
		// console.log('startValue',dateString);

		this.setState({
			endtime: date===null?"":handleDateString(dateString),
		})

	}

	onChangeTimeendlist=(date, dateString,id)=>{
		let {course_groups,endtimetypeid}=this.state;
		if(endtimetypeid===id){
			if(date!=null){
				this.setState({
					endtimetypeid:undefined
				})
			}
			if(moment(dateString,"YYYY-MM-DD HH:mm") <= moment(this.props.starttime,"YYYY-MM-DD HH:mm")){}else{
				if(date!=null){
					this.setState({
						endtimetypeid:undefined
					})
				}
			}
		}
		let arr=course_groups;

		 arr.map((item,key)=>{
		 	if(item.id===id){
				item.end_time=date===null?"":moment(handleDateString(dateString)).format('YYYY-MM-DD HH:mm')
			}
		 })

		this.setState({
			course_groups:arr
		})

	}

	propsSaves=(ds,endtime)=>{
    let {course_groups}=this.state;

		if(this.props.typs=="end"){
			this.props.Saves()
		}else{

			if(this.props.typs!="end"){
				if(!endtime){
					this.setState({
						endtimetype:true,
						endtimetypevalue:"截止时间不能为空"
					})
					return
				}
				if(moment(endtime,"YYYY-MM-DD HH:mm") <= moment(this.props.starttime,"YYYY-MM-DD HH:mm")){
					this.setState({
						endtimetype:true,
						endtimetypevalue:"必须晚于当前时间"
					})
					return
				}
			}

			let type=false
			if(course_groups===undefined||course_groups.length===0){
				this.props.Saves(ds,moment(handleDateString(endtime),"YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm"))
			}else{
				 let arr=[]
				 ds.map((item,key)=>{
					 course_groups.map((items,key)=>{
					 	if(item===items.id){
					 		if(!items.end_time){
								type=true
								this.setState({
									endtimetype:true,
									endtimetypeid:items.id,
									endtimetypevalue:"截止时间不能为空"
								})
								return

								// arr.push(moment(moment(handleDateString(this.props.staytime)).add(1, 'week')).format("YYYY-MM-DD HH:mm"))
							}else{
								if(moment(items.end_time,"YYYY-MM-DD HH:mm") <= moment(this.props.starttime,"YYYY-MM-DD HH:mm")){
									this.setState({
										endtimetype:true,
										endtimetypevalue:"必须晚于当前时间"
									})
									return
								}
								arr.push(handleDateString(items.end_time))
							}
						}
					 })
				 })

				if(type===false){
					this.props.Saves(ds,arr)
				}

			}


		}
	}

	Checkboxtype=(e)=>{

		let {course_groups}=this.state;

		let arr=[];
   if(e.target.checked==true){
		 course_groups.map((item,key)=>{
			 arr.push(item.id)
		 })
	 }else{
		 arr=[]
	 }
		this.setState({
			Checkboxtype:e.target.checked,
			group_ids:arr
		})
	}

	render(){
		let {group_ids,endtime,course_groups}=this.state;
    // console.log(this.props.modaltype)
		let course_groupstype=course_groups===undefined||course_groups.length===0;
		// TODO course_groups为空时的处理
		return(
			<div>
				<style>
					{
						`
					.ant-input, .ant-input .ant-input-suffix{
							background-color: #fff !important;
					}
					.width300{
					 width:300px;
           display: inline-block;
					}
					`
					}
				</style>
				{
					this.props.OneSelftype===true?<style>
						{
							`
              body {
							  overflow: hidden !important;
							}
              `
						}
					</style>:""
				}
				{
					this.props.OneSelftype===true? <Modal
						keyboard={false}
						className={"HomeworkModal"}
						title={this.props.modalname}
						visible={this.props.OneSelftype}
						closable={false}
						footer={null}
						destroyOnClose={true}
					>
						<div className="task-popup-content">


							{ this.props.usingCheckBeforePost ?
								<React.Fragment>
									<p className="task-popup-text-center font-16">
										<span>发布设置均可修改，</span>
										<span className={"color-blue underline"} onClick={this.props.onToPublishClick}>
                点击修改
                </span>
									</p>
									<p className="task-popup-text-center font-16 mt10">
										此设置将对所有分班生效
									</p>
								</React.Fragment> :
								<React.Fragment>
									<p className="task-popup-text-center font-16">
										{this.props.Topval}
										<span className={"color-blue underline"}>{this.props.Topvalright}</span>
									</p>
									{/*<p className="task-popup-text-center font-16 mt10">*/}
										{/*{this.props.Botvalleft===undefined?"":<span className={"colorFF6800"}>"{this.props.Botvalleft}"</span>}*/}
										{/*{this.props.Botval}*/}
									{/*</p>*/}
								</React.Fragment>  }


							{this.props.starttime===undefined||
							this.props.starttime===""?""
								: <p className="task-popup-text-center font-16 mt20 mb10">
									{/*<span className={"font-14 mr20 color979797"}>*/}
											{/*<span className={"mr10"}>发布时间:</span>*/}
										{/*{this.props.starttime}</span>*/}
									{this.props.modaltype===undefined||this.props.modaltype===2?	<span className={"font-14 color979797"}>
									{/*{this.props.endtime}*/}
								  <span className={"mr10"}>截止时间</span>
									<DatePicker
										dropdownClassName="hideDisable"
										showTime={{ format: 'HH:mm' }}
										disabledTime={disabledDateTime}
										disabledDate={disabledDate}
										showToday={false}
										locale={locale}
										format={dateFormat}
										placeholder="请选择截止时间"
										id={"endTime"}
										width={"210px"}
										value={endtime===null||endtime===""?"":moment(endtime, dateFormat)}
										onChange={this.onChangeTimeend}
										className={ this.state.endtimetype===true?"noticeTip":""}
									/>

										{/*<div className={"fr mr90 mt5"}>(仅支持半点和整点)</div>*/}
                </span>:""}

								</p>}
							{/* usingCheckBeforePost 为true的时候 全选所有分班 */}

							<style>
								{
									`
                  .HomeworkModal .ant-checkbox-wrapper {
                        margin-top: 0px;
                        float: left;
                    }

               	  .upload_select_box li:hover {
										background: transparent;
									}

									.F4FAFF{
									background: #F4FAFF;
									}
                  `
								}
							</style>
							{this.props.modaltype===undefined||this.props.modaltype===2
							|| this.props.usingCheckBeforePost ?"":<div className="clearfix edu-txt-center lineh-40 F4FAFF">
								<li style={{ width: '100%',padding: "0px 10px"}} className={"mb10"}>
									<span style={{"float":"left","color":"#05101A"}} className="task-hide color-grey-name color-grey-9">分班名称</span>
									<span style={{"float":"right","color":"#05101A","margin-right": "145px"}} className="task-hide color-grey-name color-grey-9">截止时间</span>
								</li>
							</div>}
							{this.props.modaltype===undefined||this.props.modaltype===2
							|| this.props.usingCheckBeforePost ?"":<ul className={this.state.endtimetypeid!=undefined&&this.state.endtimetype===true?"upload_select_box fl clearfix mb20":"upload_select_box fl clearfix mb30"}
																												 style={{"overflow-y":"auto",padding:"10px 0px"}}
																												 id="search_not_members_list"

							>

								{  <Checkbox.Group style={{ width: '100%' }} value={group_ids}  onChange={this.shixunhomeworkedit}>
									{
										course_groups===undefined||course_groups.length===0?"":course_groups.map((item,key)=>{

											return(
												<div className="clearfix edu-txt-center lineh-40 mb10" key={key}>
													<li  style={{ width: '100%',padding: "0px 10px"}} className={"mb10"}>
														<Checkbox
															className="task-hide edu-txt-left width300"
															name="shixun_homework[]"
															value={item.id}
															key={item.id}
														>
															<span style={{"textAlign":"left","color":"#05101A"}} className="task-hide color-grey-name">{item.name}</span>
														</Checkbox>
														<DatePicker
															dropdownClassName="hideDisable"
															showTime={{ format: 'HH:mm' }}
															disabledTime={disabledDateTime}
															disabledDate={disabledDate}
															showToday={false}
															locale={locale}
															format={dateFormat}
															placeholder="请选择截止时间"
															width={"210px"}
															value={item.end_time===null||item.end_time===""?"":moment(handleDateString(item.end_time), dateFormat)}
															onChange={(e,data)=>this.onChangeTimeendlist(e,data,item.id)}
															className={ this.state.endtimetypeid===item.id&&this.state.endtimetype===true||moment(handleDateString(item.end_time),"YYYY-MM-DD HH:mm") <= moment(this.props.starttime,"YYYY-MM-DD HH:mm")?"noticeTip fr":"fr"}
														/>
													</li>

												</div>
											)
										})
									}
								</Checkbox.Group>}

							</ul>
							}
							{this.state.endtimetype===true&&course_groupstype===true?<div className={"color-red"} style={{'text-align': 'center'}}>{this.state.endtimetypevalue}</div>:""}
							{this.state.endtimetypeid!=undefined&&this.state.endtimetype===true?<div className={"color-red fl ml10 mb20"}>{this.state.endtimetypevalue}</div>:""}
							{course_groupstype===true?<div className={this.state.endtimetype===true&&course_groupstype===true?"clearfix mt10 edu-txt-center mb10":"clearfix mt20 edu-txt-center mb10"}>
								<a  className="task-btn color-white mr30" onClick={this.props.Cancel}>{this.props.Cancelname}</a>
								<a className="task-btn task-btn-orange" onClick={()=>this.propsSaves(group_ids,this.state.endtime)}>{this.props.Savesname}</a>
							</div>:<div className="clearfix mt30 edu-txt-center mb10">
								{course_groupstype===true?"":<Checkbox className="fl ml10" checked={this.state.Checkboxtype} onChange={this.Checkboxtype}>全选</Checkbox>}
								<a className="task-btn task-btn-orange fr" onClick={()=>this.propsSaves(group_ids,this.state.endtime)}>{this.props.Savesname}</a>
								<a  className="task-btn color-white mr30 fr" onClick={this.props.Cancel}>{this.props.Cancelname}</a>
							</div>}

						</div>
					</Modal>:""}
			</div>
		)
	}
}
export default OneSelfOrderModal;