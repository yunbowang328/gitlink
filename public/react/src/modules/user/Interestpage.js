import React, {Component} from 'react';
import {Button,notification} from 'antd';
import {broadcastChannelPostMessage} from 'educoder';
import MyEduCoderModal from './MyEduCoderModal';
import axios from 'axios';
import './common.css';
import './MyeducoderI.css'
import mytc from './img/mytc.png';
import skzbdx from './img/skzbdx.png';
import zyrs1 from './img/zyrs1.png';
import gouxuan from './img/gouxuan.png';
import meigouxuan from './img/meigouxuan.png';
import qdkf from './img/qdkf.png';
import hdkf from './img/hdkf.png';
import ydkf from './img/ydkf.png';
import sjk from './img/sjk.png';
import ysj from './img/ysj.png';
import yunwei from './img/yunwei.png';
import rgzn from './img/rgzn.png';
import qita from './img/qita.png';

//父组件 EducoderLogin.js
class InterestpageComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			gouxuans: "",
			gouxuans2:0,
			gouxuans4:[],
			namezh:this.props.namezh,
			passmm:this.props.passmm,
			homedatalist:undefined,
			hometypepvisible: undefined,
			MyEduCoderModals:false,
		}
	}
	openNotification = (messge) => {
		// type  1 成功提示绿色 2提醒颜色黄色 3错误提示红色
		notification.open({
			message: "提示",
			description: messge,
			onClick: () => {
				console.log('Notification Clicked!');
			},
		});
	}
	componentDidMount(){
		console.log("min");
		let{gouxuans4} =this.state;
		let url=`/repertoires.json`;
		axios.get(url).then((response)=> {
			if(response){
				// console.log("53");
				// console.log(response.data);
				for(var i=0;i<response.data.repertoires.length;i++){
					var qdkfys="";
					if(response.data.repertoires[i].id===1){
						qdkfys=qdkf;
					}if(response.data.repertoires[i].id===2){
						qdkfys=hdkf;
					}if(response.data.repertoires[i].id===3){
						qdkfys=ydkf;
					}if(response.data.repertoires[i].id===4){
						qdkfys=sjk;
					}if(response.data.repertoires[i].id===5){
						qdkfys=ysj;
					}if(response.data.repertoires[i].id===6){
						qdkfys=yunwei;
					}if(response.data.repertoires[i].id===8){
						qdkfys=qita;
					}if(response.data.repertoires[i].id===9){
						qdkfys=rgzn;
					}

					if(response.data.repertoires[i].id===1) {
						var datas = {
							id: response.data.repertoires[i].id,
							name: response.data.repertoires[i].name,
							bool: true,
							url: qdkfys
						};
					} else{
						var datas = {
							id: response.data.repertoires[i].id,
							name: response.data.repertoires[i].name,
							bool: false,
							url: qdkfys
						};
					}

					gouxuans4.push(datas);
          this.setState({
						gouxuans4:gouxuans4,
					})
				}
				// console.log("75");
				// console.log(gouxuans4);

			}
		}).catch((error)=>{
			console.log(error)
		});
	}
	componentWillReceiveProps(nextProps) {
		// console.log("46");
		// console.log(nextProps);
		// console.log(this.props);
		if (nextProps.namezh != this.props.namezh) {
			// console.log("50");
			// console.log(nextProps.user);
			if (nextProps.namezh !== undefined) {
				// console.log("53");
				// console.log(nextProps.user);
				this.setState({
					namezh: nextProps.namezh,
				})
			}


		}
		if (nextProps.passmm != this.props.passmm) {
			// console.log("50");
			// console.log(nextProps.user);
			if (nextProps.passmm !== undefined) {
				// console.log("53");
				// console.log(nextProps.user);
				this.setState({
					passmm: nextProps.passmm,
				})
			}


		}


	}


	Clickteacher=(e)=>{
    // console.log(e);
    if(e === "teacher"){
      this.setState({
				gouxuans:"teacher",
			})
		}else if(e ==="student"){
			this.setState({
				gouxuans:"student",
			})
		}else if(e === "professional"){
			this.setState({
				gouxuans:"professional",
			})
		}
	}
	Clickteacher2=(e)=>{
		// console.log(e);
		let {gouxuans4} =this.state;
    for (var i=0;i<gouxuans4.length;i++){
    	if(gouxuans4[i].id === e){
    		// console.log("51");
    		// console.log(e);
    		if(gouxuans4[i].bool === true){
					gouxuans4[i].bool=false;
				}else{
					gouxuans4[i].bool=true;
				}
			}
		}
    // console.log(gouxuans4);
    this.setState({
			gouxuans4:gouxuans4,
		})

	}

   setMyEduCoderModals=()=>{
		this.setState({
			MyEduCoderModals:true
		})
	 }

	//兴趣页面点击
	Interestcompletionpage(){
		if(this.state.gouxuans.length === 0){
			this.openNotification("请选择职业");
			return
		}

		var ints=[];
		for (var i =0;i<this.state.gouxuans4.length;i++) {
        if(this.state.gouxuans4[i].bool === true){
          ints.push(this.state.gouxuans4[i].id);
				}
		}
		console.log("195195");
		console.log(ints);
		if(ints.length<1){
			this.openNotification("请至少选择一个您感兴趣的内容");
			return
		}
		var url = "/users/interest.json";
		axios.post(url, {
			identity:this.state.gouxuans,
			interest_ids: ints,
		}).then((response) => {
			if (response !== undefined) {
      // this.Jumptotheinterestpage();
			// 	window.location.href = "/"
				if(response.data.status===0){

					this.setMyEduCoderModals()
				}

			}


		}).catch((error) => {
			console.log(error);

		})
	}

	// //跳转然后登入
	// Jumptotheinterestpage=()=>{
	// 	console.log(this.state.login);
	// 	console.log(this.state.password);
	// 	var url = "/accounts/login.json";
	// 	axios.post(url, {
	// 		login: this.props.login,
	// 		password: this.props.password,
	// 	}).then((response) => {
	// 		if (response === undefined) {
	// 			return
	// 		}
	// 		if (response.status === 200) {
	// 			// if (response.data.status === 402) {
	// 			// 	window.location.href = response.data.url;
	// 			// } else {
	// 			// 	broadcastChannelPostMessage('refreshPage')
	// 			// 	this.setState({
	// 			// 		isRender: false
	// 			// 	})
	// 				window.location.href = "/"
	// 			// }
	// 		}
	//
	//
	// 	}).catch((error) => {
	// 		console.log(error);
	// 	})
	// }
	setNotcompleteds=()=>{
		this.setState({
			Notcompleteds:true,
			MyEduCoderModals:false
		})
	}

	render() {
		const {
			gouxuans,
			gouxuans4,
		} = this.state
		console.log(window.screen.width);
		return (

			<div className="ysllogin_register_contents" style={{width:"60%"}}>

				<MyEduCoderModal
					modalsType={this.state.MyEduCoderModals}
					setNotcompleteds={()=>{this.setNotcompleteds()}}
				/>

				<div className="ysllogin_section">
					<div style={{marginTop: "1%"}}><span className="yslspans1">请选择你的职业</span></div>
					<div className="ysldivhome1" >
          <div className="ysldivhomediv" style={{marginLeft:"30px"}} >
					<div className="ysldivhomedivtxt" onClick={()=>this.Clickteacher("teacher")}>{gouxuans ==="teacher"? <img src={gouxuan} className="gouxuanimg"/>:<img className="gouxuanimg" src={meigouxuan}/>}老师</div>
						<div className="ysldivhomedivimgsy" ><img onClick={()=>this.Clickteacher("teacher")} src={skzbdx} className="ysldivhomedivimg"/></div>
          </div>
          <div className="ysldivhomediv" style={{ marginLeft:"101px",marginRight:"101px"}}>
						<div className="ysldivhomedivtxt" onClick={()=>this.Clickteacher("student")}>{gouxuans==="student"? <img src={gouxuan} className="gouxuanimg"/>:<img className="gouxuanimg" src={meigouxuan}/>}学生</div>
						<div className="ysldivhomedivimgsy"><img onClick={()=>this.Clickteacher("student")} src={mytc} className="ysldivhomedivimg"/></div>
          </div>
          <div className="ysldivhomediv" >
						<div className="ysldivhomedivtxt" onClick={()=>this.Clickteacher("professional")}>{gouxuans==="professional"?<img src={gouxuan} className="gouxuanimg"/>:<img className="gouxuanimg" src={meigouxuan}/>}专业人士</div>
						<div className="ysldivhomedivimgsy"><img  onClick={()=>this.Clickteacher("professional")} src={zyrs1} className="ysldivhomedivimg"/></div>
          </div>
					</div>
					 <p className="yslspans2">选择你可能感兴趣的内容</p>
				  <p className="yslspans3">基于你关注的内容推荐</p>
					<div className="ysldivhome2">

					{gouxuans4&&gouxuans4.map((item,key)=>{
								return(
										<div className={item.id<5?"ysldivhomediv1":"ysldivhomediv2"} onClick={()=>this.Clickteacher2(item.id)}>
											{item.bool===true?<img src={gouxuan} className="yslgouxuanimg"/>:<div className="yslgouxuanimg2"></div>}
											<img className="div1img" src={item.url}/>
											<p className="textall">{item.name}</p>
										</div>

								)
							})}
					</div>
					<Button className="yslbutton" size={"large"} type="primary"onClick={()=>this.Interestcompletionpage()} style={{width:"255px",height: "35px",background: "#4CACFF",marginTop: "2%",marginBottom:" 2%",}}>完成</Button>
				</div>

			</div>
		);
	}
}

export default (InterestpageComponent);
