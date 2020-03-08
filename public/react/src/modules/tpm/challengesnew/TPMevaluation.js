import React, {Component} from 'react';

import {Input, Select, Radio, Checkbox,  Modal,Button,Tooltip} from 'antd';

import { Link} from "react-router-dom";

import axios from 'axios';

import Bottomsubmit from "../../modals/Bottomsubmit";

import { getImageUrl } from 'educoder';

import './css/TPMchallengesnew.css';

const $ = window.$;

const Option = Select.Option;

const RadioGroup = Radio.Group;

const { TextArea } = Input;

function isNulltpm( str ){
	if ( str == "" ) return true;
	var regu = "^[ ]+$";
	var re = new RegExp(regu);
	return re.test(str);
}

export default class TPMevaluation extends Component {
	constructor(props) {
		super(props)
		this.state = {
			choice_url: undefined,
			practice_url: undefined,
			go_back_url: undefined,
			task_pass_default: undefined,
			submit_url: undefined,
			value: 1,
			evaluationlist:[],
			shixunId:undefined,
			power:false,
			shixunfilepath:undefined,
			evaluationvisible:false,
			trees:undefined,
			path:"",
			main:[],
			saveshixunfilepath:undefined,
			selectpath:undefined,
			shixunfilepathplay:undefined,
			shixunfileexpectpicturepath:undefined,
			shixunfilestandardpicturepath:undefined,
			shixunfilepicturepath:undefined,
			pathoptionvalue:-1,
			showrepositoryurltiptype: false,
			prev_challenge: undefined,
			next_challenge: undefined,
			StudentTaskPapers:false,
			StudentTaskDocs:false,
			selectpatharr:[],
			handpathopt:false,
			scorevalue:false,
			markvalue:true,
			scoretype:undefined,
			web_route:null,
			exec_time:undefined
		}
	}

	componentDidMount() {
		let id = this.props.match.params.shixunId;
		let checkpointId=this.props.match.params.checkpointId;
		this.setState({
			shixunId:id,
			checkpointId:checkpointId
		})
		let newchoice_url= "/shixuns/"+id+"/challenges/newquestion";
		let newpractice_url= "/shixuns/"+id+"/challenges/new";
		let newgo_back_url="/shixuns/"+id+"/challenges";

		let url = "/shixuns/" + id + "/challenges/" + checkpointId + "/edit.json?tab=1";
		axios.get(url).then((response) => {
			let newprev_challenge = response.data.prev_challenge;
			let next_challenge = response.data.next_challenge;
			if (newprev_challenge != undefined) {
				if(newprev_challenge.st===0){
					newprev_challenge = "/shixuns/" + id + "/challenges/" + newprev_challenge.id + "/editcheckpoint";
				}else{
					newprev_challenge = "/shixuns/" + id + "/challenges/" + newprev_challenge.id  + "/editquestion";
				}
			}
			if (next_challenge != undefined) {

				if(next_challenge.st===0){
					next_challenge = "/shixuns/" + id + "/challenges/" + next_challenge.id+ "/editcheckpoint";
				}else{
					next_challenge = "/shixuns/" + id + "/challenges/" + next_challenge.id+ "/editquestion";
				}
			}
			let newevaluationlist=[]
			if(response.data.test_sets.length===0){
				let newlist=[
					{hidden:0,input:"",output:"",score:100},
				]
				newevaluationlist=newlist
			}else{
				newevaluationlist=response.data.test_sets
			}

			this.setState({
				power: response.data.power,
				evaluationlist:newevaluationlist,
				shixunfilepath:response.data.path,
				shixunfilepathplay:response.data.exec_path,
				pathoptionvalue:response.data.show_type,
				shixunfileexpectpicturepath:response.data.original_picture_path,
				shixunfilestandardpicturepath:response.data.expect_picture_path,
				shixunfilepicturepath:response.data.picture_path,
				prev_challenge: newprev_challenge,
				next_challenge: next_challenge,
				choice_url: newchoice_url,	//	导航中的新建选择题url
				practice_url: newpractice_url,	//string	导航中新建实践题url
				go_back_url: newgo_back_url,	//string	导航中的返回url
				position: response.data.position,	//int	关卡位置，导航栏中的第几关
				scorevalue:response.data.test_set_score,
				markvalue:response.data.test_set_average,
				web_route:response.data.web_route,
				has_web_route:response.data.has_web_route,
				responsedata:response.data,
				exec_time:response.data.exec_time,
			})
			this.evaluationoninputvalueonload();
			if(response.data.power===false){
				this.props.showNotification("你没有权限修改");
			}


		}).catch((error) => {
			console.log(error)
		});

	}


	setevaluationlist=(newevaluationlist)=>{
		this.setState({
			evaluationlist:newevaluationlist
		})
		console.log(newevaluationlist)
	}


	addevaluationon=()=>{
		let {evaluationlist,markvalue}=this.state;
		let newevaluationlist=evaluationlist;
		newevaluationlist.push({hidden:0,input:"",output:"",score:0,match_rule:"full"});
		newevaluationlist=this.oneditevaluationlist(newevaluationlist,markvalue);
		this.setevaluationlist(newevaluationlist);
	}

	del_test_array=(key)=>{
		let {evaluationlist,markvalue}=this.state;
		let newevaluationlist=evaluationlist;
		newevaluationlist.splice(key,1);
		newevaluationlist=this.oneditevaluationlist(newevaluationlist,markvalue);
		this.setevaluationlist(newevaluationlist);
	}

	getfilepath=(e,shixunfilepath,type)=>{
		this.setState({
			evaluationvisible: true,
			selectpath:e.target.value,
			selectpatharr:[],
			pathtype:type
		});
		let id = this.props.match.params.shixunId;
		let url ="/shixuns/"+id+"/repository.json";
		axios.post(url,{
			path: ""
		}).then((response) => {
			if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {

			}else{
				this.setState({
					trees:response.data.trees,
					saveshixunfilepath:shixunfilepath,
					path:"",
					main:[],
				})
			}

		}).catch((error) => {
			console.log(error)
		});
	}

	sendgetfilepath=(newpath,type,newpathtype)=>{
		let id = this.props.match.params.shixunId;
		let{path,main,pathtype}=this.state;
		let ary=main;
		let paths=path;

		this.setState({
			selectpatharr:[],
		})
		if(paths===""&&type==="tree"){
			newpath=newpath+"/";
			paths="";
			if(main.length===0){
				ary.push({val:"根目录/",path:""},{val:newpath,path:paths+newpath})
			}else{
				ary.push({val:newpath,path:paths+newpath})
			}

		}else if(paths!=""&&type==="tree"){
			newpath=newpath+"/";
			ary.push({val:newpath,path:paths+newpath})
		}


		let url ="/shixuns/"+id+"/repository.json";
		if(type==="tree"){

			axios.post(url,{
				path: paths+newpath
			}).then((response) => {
				if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {

				}else{
					this.setState({
						trees:response.data.trees,
						path:paths+newpath,
						main:ary,
						// selectpath:""
					})
				}

			}).catch((error) => {
				console.log(error)
			});
		}

		if(pathtype===2){
			this.setState({
				selectpath: newpathtype,
			})
		}
	}

	goblakepath=(path,key)=>{
		let {main,selectpath,pathtype} =this.state;
		let newmain=[]
		for(var i=0;i<=key;i++){
			newmain.push(main[i])
		}
		let id = this.props.match.params.shixunId;
		let url ="/shixuns/"+id+"/repository.json";
		axios.post(url,{
			path: path
		}).then((response) => {
			if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {

			}else {
				this.setState({
					trees: response.data.trees,
					path: path,
					main: newmain,
					// selectpath:selectpath
				})
			}
		}).catch((error) => {
			console.log(error)
		});

		if(pathtype===2){
			let paths =  path.substring(0,path.length-1);
			console.log(paths)
			this.setState({
				selectpath: paths,
			})
		}


	}

	savegetfilepath=(value)=>{
		let {selectpath,saveshixunfilepath,pathtype} = this.state

		if(pathtype===1){
			let newselectpath;

			if(saveshixunfilepath==="shixunfilepathplay"){
				newselectpath=value
			}else{
				const type = selectpath.split('；');
				let types=false;
				for(var i=0; i<type.length; i++){
					if(type[i]===value){
						types=true
						return
					}
				}

				if(types===false){
					newselectpath=selectpath+value+ "；"
				}else{
					newselectpath=selectpath
				}
			}
			this.setState({
				// selectpatharr:newarr,
				selectpath: newselectpath,

			})
		}

	}

	evaluationenter=()=>{
		let {saveshixunfilepath,selectpath}=this.state;
		this.setState({
			evaluationvisible: false,
			[saveshixunfilepath]:selectpath
		});
	}
	evaluationhideModal=()=>{
		this.setState({
			evaluationvisible: false,
		});
	}
	handpathoptionvalue=(value)=>{
		this.setState({
			pathoptionvalue:value,
			shixunfileexpectpicturepath:undefined,
			shixunfilestandardpicturepath:undefined,
			shixunfilepicturepath:undefined
		})
	}
	showrepositoryurltip=(type)=>{
		if(type===1){
			this.setState({
				showrepositoryurltiptype:true
			})
		}else{
			this.setState({
				showrepositoryurltiptype:false
			})
		}
	}

	evaluationonChange=(e,key)=>{
		let {evaluationlist}=this.state;
		let newevaluationlist=evaluationlist;
		let newtype;
		if(e===1){
			newtype=0;
		}else{
			newtype=1;
		}
		newevaluationlist[key].hidden=newtype;

		this.setState({
			evaluationlist:newevaluationlist
		})
		this.setevaluationlist(newevaluationlist);
	}

	//  填写分数百分比
	editpercentage=(e,key)=>{
		let {evaluationlist,scoretype}=this.state;

		if(scoretype===key){
			this.setState({
				scoretype:undefined
			})
		}
		let newevaluationlist=evaluationlist;
		let sum =parseInt(e.target.value);
		if(isNaN(sum)){
			sum=0
		}
		newevaluationlist[key].score=sum;

		this.setState({
			evaluationlist:newevaluationlist,
			markvalue:false
		})
		this.setevaluationlist(newevaluationlist);
	}

	// 修改测试集的匹配规则
	changeEvaluationRule=(e,key)=>{
		let {evaluationlist}=this.state;
		let newevaluationlist=evaluationlist;
		newevaluationlist[key].match_rule=e.target.value
		this.setevaluationlist(newevaluationlist);
	}

	evaluationoninputvalue=(e,key,type)=>{
		$.fn.autoHeight = function(){
			function autoHeight(elem){
				elem.style.height = 'auto';
				elem.style.maxHeight = '140px';
				elem.scrollTop = 0; //防抖动
				elem.style.height = elem.scrollHeight + 'px';
			}
			this.each(function(){
				autoHeight(this);
				$(this).on('keyup', function(){
					autoHeight(this);
				});
			});
		}
		$('textarea[autoHeight]').autoHeight();

		let {evaluationlist}=this.state;
		let newevaluationlist=evaluationlist;
		if(type==="sr"){
			newevaluationlist[key].input=e.target.value
		}else if(type==="yq"){
			// 统一转成\r\n
			newevaluationlist[key].output= e.target.value ? e.target.value.replace(/\r?\n/g, "\r\n") : e.target.value
		}
		this.setevaluationlist(newevaluationlist);
	}


	evaluationoninputvalueonload=()=>{
		$.fn.autoHeight = function(){
			function autoHeight(elem){
				elem.style.height = 'auto';
				elem.style.maxHeight = '140px';
				elem.scrollTop = 0; //防抖动
				elem.style.height = elem.scrollHeight + 'px';
			}
			this.each(function(){
				autoHeight(this);
				$(this).on('keyup', function(){
					autoHeight(this);
				});
			});
		}
		$('textarea[autoHeight]').autoHeight();
	}
	submitarbitrationevaluation=()=>{
		let{exec_time,evaluationlist,shixunfilepath,shixunfilepathplay,shixunfileexpectpicturepath,shixunfilestandardpicturepath,shixunfilepicturepath,pathoptionvalue,scorevalue,markvalue,web_route}=this.state;


		let newscorevalue;
		if(scorevalue===false){
			newscorevalue=false
		}else{
			//判断占比
			newscorevalue=true

			let sum=0;
			for(var i=0; i<evaluationlist.length; i++){
				if(evaluationlist[i].score>100){
					this.props.showNotification("测试集的评分占比不能大于100");
					this.setState({
						scoretype:i
					})
					return
				}
				sum=sum+evaluationlist[i].score
			}

			if(sum>100||sum<100){
				this.props.showNotification("测试集的评分占比之和必须等于100");
				return
			}


		}


		if(exec_time===null||exec_time===undefined||exec_time === ""){
			this.setState({
			  	shixunExec_timeType:true,
			})
		  this.props.scrollToAnchor("exec_timeid");
			return
		}

		if (isNulltpm(exec_time)) {
		    this.props.showNotification("评测时长，请勿输入空格");
		    this.setState({
		        shixunExec_timeType:true,
		    })
		    this.props.scrollToAnchor("exec_timeid");
		    return
		}

		if(shixunfilepath===undefined||shixunfilepath===""||shixunfilepath===null){
			// this.props.showSnackbar("学员任务文件路径为空");
			this.setState({
				StudentTaskPapers:true
			})
			this.props.scrollToAnchor("Studenttaskfile");
			return
		}

		if(shixunfilepathplay===undefined||shixunfilepathplay===""||shixunfilepathplay===null){
			// this.props.showSnackbar("评测执行文件路径为空");
			this.setState({
				StudentTaskDocs:true
			})
			this.props.scrollToAnchor("Benchmarkexecutable");
			return
		}

		if(evaluationlist.length===0){
			this.props.showSnackbar("测试集不能为空");
			this.props.scrollToAnchor("Thetestset");
			return
		}
		let id = this.props.match.params.shixunId;
		let{checkpointId}=this.state;
		let url = "/shixuns/"+id+"/challenges/"+checkpointId+".json";
		let newchallenge={
			path:shixunfilepath,
			exec_path:shixunfilepathplay,
			show_type:pathoptionvalue,
			original_picture_path:pathoptionvalue===-1?undefined:shixunfileexpectpicturepath===undefined?null:shixunfileexpectpicturepath,
			expect_picture_path:pathoptionvalue===-1?undefined:shixunfilestandardpicturepath===undefined?null:shixunfilestandardpicturepath,
			picture_path:pathoptionvalue===-1?undefined:shixunfilepicturepath===undefined?null:shixunfilepicturepath,
			test_set_score:newscorevalue,
			test_set_average:markvalue,
			web_route:web_route===null?undefined:web_route,
			exec_time:exec_time
		}
		axios.put(url,{
				tab:1,
				challenge:newchallenge,
				test_set:evaluationlist
			}
		).then((response) => {
			this.props.showNotification(response.data.messages);
			window.location.href=`/shixuns/${id}/challenges/${response.data.challenge_id}/tab=3`;
			// if(response.data.status===1){
			//     window.location.href = "/shixuns/" + id + "/challenges/"+response.data.challenge_id+"/tab=3"
			// }
		}).catch((error) => {
			console.log(error)
		});
	}

	saveselectpath=(e)=>{

		this.setState({
			selectpath:e.target.value
		})

	}
	updatepath=(e,name,type)=>{
		this.setState({
			[name]:e.target.value,
			pathtype:type
		})
	}


	oneditevaluationlist=(newevaluationlist,markvalue)=>{

		if(markvalue===true){
			if(100%newevaluationlist.length===0){
				let sum=100/newevaluationlist.length;
				for(var i=0; i<newevaluationlist.length;i++){
					newevaluationlist[i].score=sum
				}
			}else{
				let sum=parseInt(100/newevaluationlist.length);
				for(var i=0; i<newevaluationlist.length;i++){
					if(i+1!=newevaluationlist.length){
						newevaluationlist[i].score=sum
					}else{
						newevaluationlist[i].score=sum+100%newevaluationlist.length
					}
				}
			}

		}

		return newevaluationlist
	}
	//选择得分规范
	onChangeRadioGroups=(e)=>{

		let {markvalue,evaluationlist}=this.state;
		let newevaluationlist=evaluationlist;

		if(e.target.value===true){
			newevaluationlist=this.oneditevaluationlist(newevaluationlist,markvalue)
		}

		this.setState({
			scorevalue: e.target.value,
			evaluationlist:newevaluationlist
		});

		this.setevaluationlist(newevaluationlist);
	}

	//均匀比例
	onChangemarkvalue=(e)=>{
		let {evaluationlist}=this.state;

		if(e.target.value===true){
			let newevaluationlist=evaluationlist;
			newevaluationlist=this.oneditevaluationlist(newevaluationlist,e.target.value);
			this.setevaluationlist(newevaluationlist);
		}

		this.setState({
			markvalue: e.target.value,
		});

	}

	updatewebroute=(e)=>{
		this.setState({
			web_route:e.target.value
		})
	}

	gotocheckpoint=(url)=>{
		this.props.history.replace(url);
	}

	setexec_time=(e)=>{
		if(e.target.value===null||e.target.value===undefined||e.target.value === ""||e.target.value.match(/^[ ]*$/)){

		}else{
			this.setState({
				shixunExec_timeType:false,
			})
		}
		this.setState({
			exec_time:e.target.value
		})
	}

	render() {

		let {
			choice_url,
			practice_url,
			go_back_url,
			position,
			evaluationlist,
			shixunId,
			checkpointId,
			power,
			shixunfileexpectpicturepath,
			shixunfilestandardpicturepath,
			shixunfilepicturepath,
			shixunfilepath,
			evaluationvisible,
			trees,
			path,
			main,
			selectpath,
			shixunfilepathplay,
			pathoptionvalue,
			showrepositoryurltiptype,
			prev_challenge,
			next_challenge,
			StudentTaskPapers,
			StudentTaskDocs,
			web_route,
			scorevalue,
			markvalue,
			scoretype,
			has_web_route,
			responsedata
		} = this.state;

		let tab1url="/shixuns/" + shixunId + "/challenges/"+checkpointId+"/editcheckpoint";
		let tab2url="/shixuns/" + shixunId + "/challenges/"+checkpointId+"/tab=2";
		let tab3url="/shixuns/" + shixunId + "/challenges/"+checkpointId+"/tab=3";
		// console.log(this.props)
		const radioStyle = {
			display: 'block',
			height: '30px',
			lineHeight: '30px',
			marginLeft: '20px',
		};

		return (
			<React.Fragment>
				<div className="educontent mt30 mb30">
					<div className="TPMchallengesnewtitles edu-back-white clearfix borderbottomf4">
						<span className="font-16 task-hide fl TPMtaskName">第{position}关：{responsedata&&responsedata.st === 0 ?"实践题":responsedata&&responsedata.st === 1?"选择题":""}</span>
						{this.props.identity>4||this.props.identity===undefined||this.props.status===2||this.props.status===1?"":<a href={practice_url === undefined ? "" : practice_url} className="fr ml15 mt13">
							<Button type="primary" className="edu-default-btn edu-greenback-btn  "
							>新增实践任务</Button></a>}
						{this.props.identity>4||this.props.identity===undefined||this.props.status===2||this.props.status===1?"":<Link to={choice_url === undefined ? "" : choice_url}
																																																													 className="fr ml15 mt13">
							<Button type="primary"
											className="edu-default-btn edu-greenback-btn  mr5"
							>新增选择题任务</Button></Link>}
						{next_challenge===undefined?"":
							<Button type="primary" ghost onClick={()=>this.gotocheckpoint(next_challenge)}
											className="edu-default-btn edu-greenback-btn  mr5 fr ml15 mt13"
							>下一关</Button> }
						{prev_challenge===undefined?"":
							<Button type="primary" ghost onClick={()=>this.gotocheckpoint(prev_challenge)}
											className="edu-default-btn edu-greenback-btn  mr5 fr ml15 mt13"
							>上一关</Button>}
					</div>

					<div className="challenge_nav clearfix edu-back-white">
						<li>
							<Link to={tab1url}>1、本关任务 </Link>
						</li>
						{tab2url === "" ? "":<li> > </li>}
						<li className="active">
							<Link to={tab2url} className={"color-blue"}>2、评测设置</Link>
						</li>
						{tab3url === "" ? "":<li> > </li>}
						<li className="">
							<Link to={tab3url}>  3、参考答案</Link>
						</li>
					</div>

					<p className="color-orange-tip font-14 padding10 edu-back-white text-centers">
						<div className={"bor25510211"}>
							请先上传本关任务的所有代码文件、标准图片等所有必要的文件到
							<a href={"/shixuns/" + shixunId + "/repository"} className="color-bule-tip decoration" target="_blank">版本库</a>
						</div>
					</p>

					<div className="edu-back-white newpadding02020"  id={"exec_timeid"} >
						<p className="color-grey-6 font-16 mb20"> <span className="color-red mr5 fl">*</span> 评测时长限制<span className={"color-grey-8 font-14"}>（程序评测运行时间限制时长，单位：秒）</span></p>
						<div className="clearfix mb5">
							<div className="pr status_con" style={{'width':'233px'}}>
								<Input  value={this.state.exec_time}
												className={this.state.shixunExec_timeType === true ?"panel-box-sizing task-form-100 task-height-40 bor-red":"panel-box-sizing task-form-100 task-height-40" }
												placeholder="请输入评测时长" onInput={this.setexec_time}/>
							</div>
							<div
								className={this.state.shixunExec_timeType === true ? "color-red mt8  block ml5" : " none"}
								id="new_shixun_name">必填项：不能为空</div>
						</div>
					</div>


					<div className="edu-back-white clearfix">
						<div className="padding1020tpms mb10">
							<p className="color-grey-6 font-16 mb20"><span className="color-red mr5 fl">*</span> 评测效果展现方式<span className={"color-grey-8 font-14"}>（学员评测本关任务时，查看效果页上需要展现的文件类型）</span></p>
							<div className="pr">
								<Select className="winput-240-40"
												value={pathoptionvalue}
												onChange={this.handpathoptionvalue}>
									<Option value={-1}>无</Option>
									<Option value={1}>图片</Option>
									<Option value={2}>apk/exe</Option>
									<Option value={3}>txt</Option>
									<Option value={4}>html</Option>
									<Option value={5}>mp3</Option>
									<Option value={6}>mp4</Option>
								</Select>
								<a className="ml10" onClick={()=>this.showrepositoryurltip(1)}><img src={getImageUrl("images/educoder/problem.png")}/></a>
								<div className="invite-tip clearfix repository_url_tippostion" style={{display:showrepositoryurltiptype===true?"block":"none"}} id="repository_url_tip"
								>
									<span className="top-black-trangleft"></span>
									<div className="padding20 invitecontent clearfix">
										<p className="font-12 edu-txt-left">
											图片：处理或输出图片类型的任务，请选填此项<br/>
											可以通过设置图片路径和学员答案文件路径，展示代码对应的图片效果<br/><br/>
											apk/exe：写可执行文件的任务，请选填此项<br/>
											可以通过设置学员答案文件路径，展示二维码以供扫码下载<br/><br/>
											txt：输出txt文档类型的任务，请选填此项<br/>
											可以通过学员答案文件路径设置，展示txt文件内容<br/><br/>
											html：web类型的任务，请选填此项<br/>
											可以通过Web路由设置，展示html效果预览页<br/><br/>
											mp3/mp4：mp3/mp4文件类型的任务，请选填此项<br/>
											可以通过学员答案文件路径设置，展示mp3/mp4文件内容<br/><br/>
										</p></div>
									<p className="inviteTipbtn with100"><a onClick={()=>this.showrepositoryurltip(2)}
									>知道了</a>
									</p>
								</div>
							</div>
						</div>
					</div>


					<div className="edu-back-white clearfix">
						<div className="padding1020tpms mb10" id={"Studenttaskfile"}>
							<p className="color-grey-6 font-16 mb20"><span className="color-red mr5 fl">*</span> 学员任务文件<span className={"color-grey-8 font-14"}>（该文件将直接显示给学生，需要学生在其中填写代码）</span></p>
							<div>
								<div className="flex1">
									<input type="text"
												 className={StudentTaskPapers===true?"input-100-45 greyInput change bor-red":"input-100-45 greyInput change"}
												 id="shixun_file_path"
												 name="challenge[path]" autoComplete="off"
												 placeholder="请选择版本库中的代码文件。例： src/step1/HelloWorld.java"
												 value={shixunfilepath}
												 style={{ width:StudentTaskPapers===true?'100%':""}}
												 onInput={(e)=>this.updatepath(e,"shixunfilepath",1)}
												 onClick={(e)=>this.getfilepath(e,"shixunfilepath",1)}
									/>
								</div>
								<div>
										<span className={StudentTaskPapers===true?"color-red mt8 fl":" none"} id="student_task_name"> 必选项：不能为空</span>
								</div>
							</div>
						</div>
					</div>



					<Modal
						keyboard={false}
						title="文件路径"
						visible={evaluationvisible}
						closable={false}
						footer={false}
					>
						<div className="task_popup_con">
							<div className="newupload_conbox clearfix">
								<ul id="directory_file">
									{/*文件导航*/}
									{
										main.length===0?"":main.map((item,key)=>{
											return(
												<a className="f14 fb" onClick={()=>this.goblakepath(item.path,key,item)}>{item.val}</a>
											)
										})
									}
									{/*文件*/}
									{trees === undefined || trees === null ? "" : trees.map((item, key) => {
										return(
											<li className="entry" key={key}>
												<div className="filename_no_report hidden">{
													item.type==="tree"?<a onClick={()=>this.sendgetfilepath(item.name,item.type,path+item.name)} data-remote="true">
														<i className="iconfont icon-wenjianjia color-blue mr2"></i>
														{path+item.name}</a>:<a data-remote="true">
														<i className="iconfont icon-zuoye color-blue mr2"></i>
														<span onClick={()=>this.savegetfilepath(path+item.name,item.type)}>{path+item.name}</span>
													</a>
												}
												</div>
											</li>

										)
									})}

								</ul>
								<div className="clearfix mt20">
									<label className="fl mt5 directory_filepath">选中的文件路径：</label>
									<Input id="points_tusi" placeholder="选中的文件路径" className="fl input-60-40"
												 style={{width:"400px"}}
												 onInput={(e)=>this.saveselectpath(e)}
												 value={selectpath}/>
								</div>

								<a className="task-btn task-btn-orange fr"
									 style={{marginTop: '20px',marginLeft:'20px'}} id="add_path"  onClick={()=>this.evaluationenter()}>确定</a>
								<a  className="pop_close task-btn mb10 fr"
										style={{marginTop: '20px'}} id="back_page" onClick={()=>this.evaluationhideModal()}>取消</a>
							</div>
						</div>
					</Modal>

					<div className="edu-back-white clearfix">
						<div className="padding1020tpms mb10" id={"Benchmarkexecutable"}>
							<p className="color-grey-6 font-16 mb20"><span className="color-red mr5 fl">*</span>评测执行文件<span className={"color-grey-8 font-14"}>（若执行平台脚本，请输入学员任务文件路径；若使用自己设计的脚本测试学生代码，请输入设计的脚本文件路径）</span></p>
							<div>
								<div className="flex1">
									<input type="text" className={StudentTaskDocs===true?"bor-red input-100-45 greyInput":"input-100-45 greyInput"} id="shixun_file_path_play"
												 name="challenge[exec_path]" autoComplete="off"
												 placeholder="请选择版本库中的代码文件。例：src/step1/HelloWorldTest.java"
												 value={shixunfilepathplay}
												 style={{width:StudentTaskDocs===true?'100%':""}}
												 onInput={(e)=>this.updatepath(e,"shixunfilepathplay",1)}
												 onClick={(e)=>this.getfilepath(e,"shixunfilepathplay",1)}
									/>
								</div>
								<div>
										<span className={StudentTaskDocs===true?"color-red mt8 fl":"none"} id="student_task_name">
												必选项：不能为空
										</span>
								</div>
							</div>
						</div>
					</div>

					{pathoptionvalue===4&&web_route!=null||pathoptionvalue===4&&has_web_route===true?<div className="edu-back-white clearfix">
						<div className="padding1020tpms mb10">
							<p className="color-grey-6 font-16 mb20">Web路由<span className={"color-grey-8 font-14"}>（请注意将服务器程序的端口号映射到8080端口）</span></p>
							<div className="df">
								<div className="flex1 mr20">
									<input type="text" className="input-100-45 change" autoComplete="off"
												 id="shixun_file_picture_path" name="challenge[picture_path]"
												 value={web_route}
												 onInput={(e)=>this.updatewebroute(e)}
												 placeholder="网站类型实训，请填写Web路由地址。例：java/mypage"/>
								</div>
							</div>
						</div>
					</div>:""}

					{pathoptionvalue===1||pathoptionvalue===5||pathoptionvalue===6?<div className="edu-back-white clearfix">
						<div className="padding1020tpms mb10">
							<p className="color-grey-6 font-16 mb20">待处理文件路径<span className={"color-grey-8 font-14"}>（该路径下的文件将在学员评测本关任务时，作为原始文件显示在查看效果页，供学员参考；请注意与程序文件所在文件夹分开）</span></p>
							<div className="df">
								<div className="flex1 mr20">
									<input type="text" className="input-100-45" autoComplete="off"
												 id="shixun_file_expect_picture_path" name="challenge[original_picture_path]"
												 placeholder="请选择版本库中存储了待处理文件(图片/MP3等)的路径。例：src/step1/sourcefiles"
												 value={shixunfileexpectpicturepath}
												 onInput={(e)=>this.updatepath(e,"shixunfileexpectpicturepath",2)}
												 onClick={(e)=>this.getfilepath(e,"shixunfileexpectpicturepath",2)}
									/>
								</div>
								<div></div>
							</div>
						</div>
					</div>:""}


					{pathoptionvalue===1||pathoptionvalue===5||pathoptionvalue===6? <div className="edu-back-white clearfix">
						<div className="padding1020tpms mb10">
							<p className="color-grey-6 font-16 mb20">标准答案文件路径<span className={"color-grey-8 font-14"}>（该路径下的文件将在学员评测本关任务时，作为参考答案显示在查看效果页，供学员参考；请注意与程序文件所在文件夹分开）</span></p>
							<div className="df">
								<div className="flex1 mr20">
									<input type="text" className="input-100-45" autoComplete="off"
												 id="shixun_file_standard_picture_path" name="challenge[expect_picture_path]"
												 placeholder="请选择版本库中存储了标准答案文件(图片/MP3等)的路径。例：src/step1/expectedfiles"
												 value={shixunfilestandardpicturepath}
												 onInput={(e)=>this.updatepath(e,"shixunfilestandardpicturepath",2)}
												 onClick={(e)=>this.getfilepath(e,"shixunfilestandardpicturepath",2)}
									/>
								</div>
								<div></div>
							</div>
						</div>
					</div>:""}


					{pathoptionvalue===-1?"":<div className="edu-back-white clearfix">
						<div className="padding1020tpms mb10">
							<p className="color-grey-6 font-16 mb20">学员答案文件路径<span className={"color-grey-8 font-14"}>（学员评测本关任务时生成的文件将保存在该路径下，并作为实际输出显示在查看效果页，供学员确认；请注意与程序文件所在文件夹分开）</span></p>
							<div className="df">
								<div className="flex1 mr20">
									<input type="text" className="input-100-45 change" autoComplete="off"
												 id="shixun_file_picture_path" name="challenge[picture_path]"
												 value={shixunfilepicturepath}
												 onInput={(e)=>this.updatepath(e,"shixunfilepicturepath",2)}
												 onClick={(e)=>this.getfilepath(e,"shixunfilepicturepath",2)}
												 placeholder="请在版本库中指定用来保存学员代码实际输出结果的路径。例：src/step1/outputfiles"/>
								</div>
								<div></div>
							</div>
						</div>
					</div>}


					<div className="edu-back-white clearfix" id={"Thetestset"}>
						<div className="padding1020tpms mb20">
							{/*<p className="color-grey-6 font-16">测试集</p>*/}
							<p className="color-grey-6 font-16 height40pxtpm borbottomeeetpm">测试集和系统评分规则</p>
							<p className="color-grey-9  mt20"
								 style={{width:'100%',height:'60px'}}
							>
								<span className={"headdfgf color979797"}>得分规范：</span>
								<RadioGroup
									className={"fl"}
									value={scorevalue}
									onChange={this.onChangeRadioGroups}
								>
									<Radio  style={radioStyle} value={false}>
										通过全部测试集
										<span className={"color979797"}>（学员评测，仅当所有测试集都正确时，才获得一次性奖励）</span>
									</Radio>
									<Radio  style={radioStyle} value={true}>
										通过部分测试集
										<span className={"color979797"}>（学员评测，当至少有一组测试集正确时，即可获得其对应比例的奖励）</span></Radio>
								</RadioGroup>
							</p>

							<p className="color-grey-9  mb20"
								 style={{width:'100%',height:'20px',display:scorevalue===true?'block':'none'}}
							>
								<span className={"headdfgf color979797"} style={{width:'500px'}} >
										系统评分占比：
										<RadioGroup
											value={markvalue}
											onChange={this.onChangemarkvalue}
										>
											<Radio value={true}>均分比例</Radio>
											<Radio value={false}>自定义比例</Radio>
										</RadioGroup>
								</span>

							</p>

							<div>
								<div className="flex1 mr20">

									<div id="test_array_set">

										{evaluationlist===undefined?"":evaluationlist.length===0?"":evaluationlist.map((item,key)=>{
											return(
												<div className="test_array_item mt30 borbottomeeetpm pb20" key={key}>
													<p className="clearfix pr mb20">
														<span className="fl mr10 color-red">*</span>
														<span className="color-blue font-16 fl" name="sample_inputs_label">组{key+1}</span>
														<span className="fl ml20 color-grey-6">
                                                            {/*checked={item.is_public===1?false:true}*/}

															<input className={scoretype===key?"bor-red fl martopf4":"fl martopf4"}
																		 style={{width: '25%',display:scorevalue===true?'inline-block':'none'}}
																		 onInput={(e)=>this.editpercentage(e,key)}
																		 value={item.score} />
                                                        <span className="mr15 ml10"
																															style={{display:scorevalue===true?'inline-block':'none'}}
																												>%</span>


                                                    <Checkbox onChange={()=>this.evaluationonChange(item.hidden,key)}  checked={item.hidden===1?true:false}>隐藏<span className={"color-grey-8 font-14"}>（选中则对学员隐藏本测试集内容）</span></Checkbox>
                                                  </span>

														<Tooltip placement="bottom" title={"删除"}>
															<div className="fr sample_icon_remove " style={{display:key===0?"none":"block"}}
																 onClick={()=>this.del_test_array(key)}>
																<i className={"iconfont icon-shanchu_Hover font-16 fl"}></i>
															</div>
														</Tooltip>
													</p>
													<TextArea className="textareavalue mb15" name="test_set[input][]"
																		placeholder="输入"
																		value={item.input}
																		id={"textareavalue"+key}
																		// autoHeight="true"
																		rows={3}
																		onInput={(e)=>this.evaluationoninputvalue(e,key,"sr")}
													></TextArea>
													<TextArea className="textareavalue" name="test_set[output][]"
																		placeholder="预期输出"
																		value={item.output}
																		id={key+"textareavalue"}
																		// autoHeight="true"
																		rows={5}
																		onInput={(e)=>this.evaluationoninputvalue(e,key,"yq")}
													></TextArea>
													<div className="clearfix lineh-30 mt20">
														<span className="fl mr10 color-grey-6">匹配规则：</span>
														<RadioGroup className="fl" value={item.match_rule} onChange={(e)=>this.changeEvaluationRule(e,key)}>
															<Radio value='full'>完全匹配<span className={"color-grey-8 font-14"}>（实际输出与预期输出完全相同）</span></Radio>
															<Radio value='last'>末尾匹配<span className={"color-grey-8 font-14"}>（实际输出的末尾内容与预期输出完全相同）</span></Radio>
														</RadioGroup>
													</div>
												</div>
											)
										})}

									</div>
								</div>

								<p className="clearfix" onClick={this.addevaluationon}>
										<Button type="primary" ghost className="edu-default-btn edu-greenback-btn mt20 mb20">新增测试集</Button>
								</p>

								<p className="color-grey-9">温馨提示：公开测试集和隐藏测试集结合使用，可以降低作弊的几率；隐藏测试集，在“提交评测”时也将被系统自动检测</p>
							</div>
						</div>
					</div>

				</div>

				{this.props.identity>4||this.props.identity===undefined||power===false?"":<div className="clearfix mt30">
					{/*<a className="defalutSubmitbtn fl mr20" onClick={this.submitarbitrationevaluation}>提交</a>*/}
					{/*/!*<a href={"/shixuns/" + shixunId + "/challenges"} className="defalutCancelbtn fl">取消</a>*!/*/}
					{/*<Link to={"/shixuns/" + shixunId + "/challenges"} className="defalutCancelbtn fl">取消</Link>*/}
					<Bottomsubmit url={"/shixuns/" + shixunId + "/challenges"}
												bottomvalue={"提交"}
												onSubmits={this.submitarbitrationevaluation}
												{...this.props}
												{...this.state}
												loadings={false}
					/>
				</div>}
			</React.Fragment>
		)
	}
}


