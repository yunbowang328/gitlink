import React,{ Component } from "react";
import {Menu} from "antd";


import CoursesListType from '../coursesPublic/CoursesListType';
import { WordsBtn,getRandomcode } from 'educoder'
import PollTabFirst from './PollDetailTabFirst'
import PollTabSecond from './PollDetailTabSecond'
import PollTabThird from './PollDetailTabThird'
import PollTabForth from './PollDetailTabForth'

import DownloadMessageysl from "../../modals/DownloadMessageysl";

import ImmediatelyPublish from './pollPublicBtn/ImmediatelyPublish'
import ImmediatelyEnd from './pollPublicBtn/ImmediatelyEnd'
import CancelPublish from './pollPublicBtn/CancelPublish'

import '../css/members.css'
import '../css/busyWork.css'

import axios from 'axios'

const map={1:"未发布",2:"提交中",3:"已截止",4:"已结束"}
class PollDetailIndex extends Component{
	constructor(props){
		super(props);
		this.state={
			tab:["0"],
			pollDetail:undefined,
			user_permission:undefined,
			DownloadType:false,
			DownloadMessageval:undefined,
			polls_status:3,
		}
	}

	getPollInfo=()=>{
		// console.log(this.props);
		let pollId=this.props.match.params.pollId;
		let url=`/polls/${pollId}/common_header.json`
		axios.get(url).then((result)=>{
			if(result.status==200){
				this.setState({
					pollDetail:result.data,
					user_permission:result.data.user_permission,
					polls_status:result.data.polls_status,
				})
			}
		}).catch((error)=>{
			console.log(error);
		})

		let{tab}=this.state;
		try {
			if(tab[0]==="0"){
				this.child.Teacherliststudentlist();
			}
			if(tab[0]==="1"){
				this.child.Teacherliststudentlist();
			}
			if(tab[0]==="2"){
				this.child.Teacherliststudentlist();
			}
			if(tab[0]==="3"){
				this.child.getSettingInfo();
			}
		}catch (e) {

		}
	}
	newgetPollInfo=()=>{
		// console.log(this.props);
		let pollId=this.props.match.params.pollId;
		let url=`/polls/${pollId}/common_header.json`
		axios.get(url).then((result)=>{
			if(result.status==200){
				this.setState({
					pollDetail:result.data,
					user_permission:result.data.user_permission,
					polls_status:result.data.polls_status,
				})
			}
		}).catch((error)=>{
			console.log(error);
		})

	}

	componentDidMount(){
		const query =this.props.location.search;
		if(query.indexOf("?")!=-1){
			const type = query.split('?');
			let name = type[1].split("tab=");
			name = String(name).split(",");
			name = decodeURI(name[1]);
			if(name!=undefined && name!="" && name!="undefined"){
				this.setState({
					tab:[name]
				})
			}
		}

		this.getPollInfo();
	}

	//切换tab
	changeTab=(e)=>{
		this.setState({
			tab:e.key
		})
	}

	/// 确认是否下载
	confirmysl(url){
		axios.get(url + '&export=true' ).then((response) => {
			if(response.data.status&&response.data.status===-1){

			}else if(response.data.status&&response.data.status===-2){
				if(response.data.message === "100"){
					// 已超出文件导出的上限数量（100 ），建议：

					this.setState({
						DownloadType:true,
						DownloadMessageval:100
					})
				}else {
					//因附件资料超过500M
					this.setState({
						DownloadType:true,
						DownloadMessageval:500
					})
				}
			}else {
		        this.props.slowDownload(getRandomcode(url))

				// this.props.showNotification(`正在下载中`);
				// window.open("/api"+url, '_blank');
			}
		}).catch((error) => {
			console.log(error)
		});
	}

	Downloadcal=()=>{
		this.setState({
			DownloadType:false,
			DownloadMessageval:undefined
		})
	}
	bindRef = ref => { this.child = ref };
	render(){
		let {tab,pollDetail,user_permission,polls_status}=this.state;
		const { current_user } = this.props;
		const isAdmin =this.props.isAdmin();
		const isStudent = this.props.isStudent();
		document.title=this.props.coursedata&&this.props.coursedata.name;
		return(
			<div className="newMain">
				<DownloadMessageysl
					{...this.props}
					value={this.state.DownloadMessageval}
					modalCancel={this.Downloadcal}
					modalsType={this.state.DownloadType}
				/>
				<div className="educontent mt10 mb50">
					<p className="clearfix mb20">
						<WordsBtn style="grey" className="fl" to={current_user && current_user.first_category_url}>{this.props.coursedata.name}</WordsBtn>
						<span className="color-grey-9 fl ml3 mr3">&gt;</span>
						<WordsBtn style="grey" className="fl" to={`/courses/${this.props.match.params.coursesId}/polls/${user_permission && user_permission.left_banner_id}`}>问卷</WordsBtn>
						<span className="color-grey-9 fl ml3 mr3">&gt;</span>
						<span>问卷详情</span>
					</p>
					<p className="clearfix mb20 lineh-25">
						<span className="color-grey-3 font-24 fl task-hide break-word" style={{maxWidth:"900px",lineHeight:"25px"}} title={`${pollDetail && pollDetail.polls_name}`}>{pollDetail && pollDetail.polls_name}</span>
						<span className="mt3 fl" style={{height:"25px"}}>
              <CoursesListType typelist={[`${map[pollDetail && pollDetail.polls_status]}`]} typesylename={""} />
            </span>
						<WordsBtn className="fr font-16 mt2" style="grey" to={`/courses/${this.props.match.params.coursesId}/polls/${user_permission && user_permission.left_banner_id}`}>返回</WordsBtn>
					</p>
					<div>
						<div className="clearfix edu-back-white pl30 pr30 bor-bottom-greyE">
							<div className="fl task_menu_ul">
								<Menu mode="horizontal" selectedKeys={tab} onClick={this.changeTab}>
									<Menu.Item key="0">答题列表</Menu.Item>
									{
										(isAdmin || (isStudent && pollDetail && pollDetail.show_result == 1 && pollDetail.polls_status == 3 && user_permission && user_permission.current_status==1)) && <Menu.Item key="1">统计结果</Menu.Item>
									}
									{ isAdmin && <Menu.Item key="2">问卷预览</Menu.Item> }
									<Menu.Item key="3">设置</Menu.Item>
								</Menu>
							</div>
							{
								isAdmin &&
								<span className="fr mt22">
                  <WordsBtn style="blue" to={`/courses/${this.props.match.params.coursesId}/polls/${this.props.match.params.pollId}/edit`} className="fl mr20 font-16">编辑问卷</WordsBtn>
									{/* 立即发布 */}
									{
										user_permission && user_permission.poll_unpublish_count > 0 ?
											<li className="fl mr20">
												<ImmediatelyPublish
													{...this.props}
													{...this.state}
													style="blue"
													className={"font-16"}
													checkBoxValues={[this.props.match.params.pollId]}
													action={this.getPollInfo}
													pushtype={true}
													single={true}
												></ImmediatelyPublish>
											</li>
											:""
									}
									{/* 立即截止、撤销发布 */}
									{
										user_permission && user_permission.poll_publish_count > 0 ?
											<li className="fl mr20">
												<ImmediatelyEnd
													{...this.props}
													{...this.state}
													style="blue"
													className={"font-16"}
													checkBoxValues={[this.props.match.params.pollId]}
													action={this.getPollInfo}
													// single={true}
												></ImmediatelyEnd>
											</li>
											:""
									}
									{/* {
                    user_permission && user_permission.poll_publish_count>0 ?
                    <li className="fl mr20">
                      <CancelPublish
                        {...this.props}
                        {...this.state}
                        style="blue"
                        checkBoxValues={[this.props.match.params.pollId]}
                        action={this.getPollInfo}
                      ></CancelPublish>
                    </li>
                    :""
                  } */}
									<a className="fl color-blue font-16" onClick={(url)=>this.confirmysl(`/polls/${this.props.match.params.pollId}/commit_result.xlsx`)} href="javascript:void(0);">导出统计</a>
                </span>
							}
							{
								isStudent &&
								<span className="fr mt22 font-16">
                  {
										user_permission && user_permission.current_status!=3 ?
											<WordsBtn style="blue" to={`/courses/${this.props.match.params.coursesId}/polls/${this.props.match.params.pollId}/users/${this.props.current_user.login}`}>
												{ user_permission && user_permission.current_status ==0 ? "继续答题" :
													user_permission.current_status == 1 ?
													(polls_status===1?"":"查看答题")
													:user_permission.current_status == 2 ?(polls_status===3?"":polls_status===4?"":"开始答题"):""
												}
											</WordsBtn>
											:""
									}
                </span>
							}

						</div>

						{
							// 答题列表
							parseInt(tab[0])==0 && <PollTabFirst {...this.props} {...this.state}></PollTabFirst>
						}
						{
							// 统计结果
							parseInt(tab[0])==1 && <PollTabSecond {...this.props} {...this.state}></PollTabSecond>
						}

						{
							//问卷预览
							parseInt(tab[0])==2 && <PollTabThird {...this.props} {...this.state}></PollTabThird>
						}
						{
							//设置
							parseInt(tab[0])==3 && <PollTabForth {...this.props} {...this.state} triggerRef={this.bindRef} user_permission={user_permission} getPollInfo={this.getPollInfo} newgetPollInfo={this.newgetPollInfo}></PollTabForth>
						}

					</div>
				</div>
			</div>
		)
	}
}
export default PollDetailIndex
