import React, {Component} from "react";
import {BrowserRouter as Router,Route,Switch,Link, NavLin} from 'react-router-dom';
import {WordsBtn, ActionBtn,getImageUrl} from 'educoder';
import { Input,Checkbox,Table, Pagination, Modal,Menu, Tooltip,Spin,Button,Form } from "antd";
import axios from 'axios';
import BanksMenu from '../../user/usersInfo/banks/banksMenu'
import Loadable from 'react-loadable';
import Loading from '../../../Loading';
import '../css/members.css';
import "../common/formCommon.css";
import '../css/Courses.css';
import '../css/busyWork.css';
import '../poll/pollStyle.css';
// 问卷内容
const Groupjobbandetails = Loadable({
	loader: () => import('./Groupjobbandetails'),
	loading: Loading,
})
// 试卷详情
const Groupjobquesanswer = Loadable({
	loader: () => import('./Groupjobquesanswer'),
	loading: Loading,
});
class GroupjobbankPage extends Component {
	//分组作业内容详情
	constructor(props) {
		super(props);
		// this.answerMdRef = React.createRef();
		this.state = {
			tab: ["0"],
			workid:1,
			isSpin:false,
			datas:[],
			visible:false,
			banksMenu:undefined
		}
	}

	componentDidMount() {
		this.getonedata();

	}

	getonedata=()=>{
		if(	this.props.match.params.workid){
			this.setState({
				workid:	this.props.match.params.workid,
			})
		}
		this.getdata(this.props.match.params.workid);
	};
	//获取数据的地方
	getdata=(workid)=>{
		var workids= workid;
		if(workids){

		}else{
			workids=this.state.workid;
		}
		this.setState({
			isSpin:true,
		})
		let url = `/homework_banks/${workids}.json`;
		//
		axios.get(url).then((response) => {
			if(response){
				if(response.data){
					this.setState({
						datas:response.data,
					})
					try {
						const crumbData={
							title:response && response.data && response.data.name,
							is_public:response && response.data && response.data.is_public,
							crumbArray:[
								{content:'详情'}
							]
						};
						const menuData={
							tab:'0',//tab选中的index
							menuArray:[//tab以及tab路由
								{to:`/banks/group/${workids}/${this.props.match.params.type}?tab=0`,content:'内容详情'},
								{to:`/banks/group/${workids}/${this.props.match.params.type}/answer?tab=1`,content:'参考答案'}
							],
							category:'group',//毕设选题
							tos:`/banks/group/${workids}/edit/${this.props.match.params.type}?tab=0`,
							id:workids,
							is_public:response && response.data && response.data.is_public,
							type:this.props.match.params.type,
							authorize:response && response.data && response.data.authorize,
						}
						this.setState({
							banksMenu:menuData
						})
						this.props.initPublic(crumbData,response.data);
					}catch (e) {

					}
				}else {
					this.setState({
						datas:[],

					})

				}
			}else {
				this.setState({
					datas:[],
				})

			}
			this.setState({
				isSpin:false,
			})
		}).catch((error) => {
			console.log(error)
			this.setState({
				datas:[],
				isSpin:false,
			})
		});
	};
	// initPublic = (crumbData,menuData) =>{
	// 	this.setState({
	// 		banksMenu:menuData
	// 	})
	// 	this.props.initPublic(crumbData);
	// }

	render() {
		let {tab,datas,visible} = this.state;

		let{
			banksMenu
		}=this.state
		//
		// const common={
		// 	initPublic:this.initPublic,
		// }
		return (
			<React.Fragment>
			 <div className="pd30">
				 {
					 banksMenu &&
					 <BanksMenu
						 banksMenu={banksMenu}
						 {...this.props}
						 {...this.state}
					 ></BanksMenu>
				 }
				 <Switch {...this.props}>
					 <Route path={`/banks/group/:workid/${this.props.match.params.type}/answer`}
									render={
										(props) => {
											return (<Groupjobquesanswer {...this.props} {...props} {...this.state} datas={datas}  />)
										}
									}></Route>
					 <Route path={`/banks/group/:workid/${this.props.match.params.type}`}
									render={
										(props) => {
											return (<Groupjobbandetails {...this.props} {...props} {...this.state} datas={datas} />)
										}
									}></Route>
				 </Switch>
			 </div>
			</React.Fragment>
		)
	}


}

export default GroupjobbankPage;
