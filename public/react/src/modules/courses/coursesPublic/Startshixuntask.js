import React,{ Component } from "react";
import { WordsBtn, getTaskUrlById } from 'educoder';
import {Tooltip,message,Modal,Spin} from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Modals from '../../modals/Modals';


class Startshixuntask extends Component{
	constructor(props){
		super(props);
		this.state = {
			startbtn:false,
			isSpin:false,
		}

	}

	componentDidMount() {

	}

	taskoperationId=(list)=>{
		this.setState({
			startbtn:true,
		})
		let url= list+".json";
		axios.get(url).then((response) => {

			if(response.status===200){
				if(response.data.status===-2){

					this.setState({
						startbtn:false,
						shixunsreplace:true,
						hidestartshixunsreplacevalue:response.data.message+".json"
					})
				}else if(response.data.status===-1){
					console.log(response)
				}else if(response.data.status===-3){
					this.setState({
						shixunsmessage:response.data.message,
						startshixunCombattype:true,
						startbtn:false
					})
				}else{
					setTimeout(() => {
						this.setState({
							startbtn: false,
						})
					}, 1000)

					if(response.data.status!=401&&response.data.status!=403){
						window.open( `/tasks/${response.data.game_identifier}`)
					}

				}
			}
		}).catch((error) => {
			this.setState({
				startbtn:false
			})
		});

	}

	hidestartshixunsreplace=(url)=>{
		this.setState({
			isSpin:true
		})
		axios.get(url).then((response) => {
			if(response.status===200){

				this.setState({
					shixunsreplace:false,
					isSpin:false,
				})
				message.success('重置成功，正在进入实训！');
				let path="/shixuns/"+response.data.shixun_identifier+"/challenges";
				this.props.history.push(path);

			}}
		).catch((error) => {
			this.setState({
				startbtn:false,
				shixunsreplace:false,
				isSpin:false,
			})
		});

	}

	hidestartshixunCombattype=()=>{
		this.setState({
			startshixunCombattype:false
		})
	}

	render(){
		let {
			Modalstype,
			Modalstopval,
			Modalsbottomval,
			cardsModalcancel,
			cardsModalsavetype,
			loadtype,
			shixunsreplace,
			hidestartshixunsreplacevalue,
			startshixunCombattype,
			shixunsmessage,
			startbtn,
			isSpin
		} = this.state;

		return(
			  <a className="fr color-blue font-16" >
				<Modals
					modalsType={Modalstype}
					modalsTopval={Modalstopval}
					modalsBottomval={Modalsbottomval}
					modalCancel={cardsModalcancel}
					modalSave={cardsModalsavetype}
					loadtype={loadtype}
				/>


				<Modal
					title="提示"
					visible={shixunsreplace}
					closable={false}
					footer={null}
					keyboard={false}
				>
					<Spin size="large" spinning={isSpin}>
					<div className="task-popup-content">
						<p className="task-popup-text-center font-16 pb20">实训已经更新了，正在为您重置!</p>
					</div>
					<div className="task-popup-submit clearfix">
						<a className="task-btn task-btn-orange fr mr51"
						   onClick={() => this.hidestartshixunsreplace(hidestartshixunsreplacevalue)}>知道了</a>
					</div>
				</Spin>
				</Modal>
				<Modal
					title="提示"
					visible={startshixunCombattype}
					closable={false}
					footer={null}
					keyboard={false}
				>
					<div className="task-popup-content">
						<p className="task-popup-text-center font-16 pb20">目前该实训项目尚在内测中，将于{shixunsmessage}之后开放，谢谢！</p>
					</div>
					<div className="task-popup-submit clearfix">
						{/*<a onClick={this.hidestartshixunCombattype} className="task-btn fl">取消</a>*/}
						<a className="task-btn task-btn-orange fr mr51" onClick={this.hidestartshixunCombattype}>知道啦</a>
					</div>
					{/*<p className="inviteTipbtn with100 fl">*/}
					{/*<a onClick={this.hidestartshixunCombattype}>知道了</a>*/}
					{/*</p>*/}
				</Modal>
					<style>{`
						a.startShixunTask_continueShixun {
							padding: 0;
							color: #4CACFF !important;
							font-size: 16px;
						}
					`}</style>
					{/* 如果是继续实战和查看实战，实训作业这边，后台会直接返回identity，直接写成a标签 */}
					{this.props.isStudent?
						<span>
							{this.props.data&&this.props.data.task_operation&&this.props.data.task_operation?startbtn===false
									? 
								((this.props.data && this.props.data.task_operation[1] && this.props.data.task_operation[1].indexOf('/') == -1) ?
								<span>
									<a href={getTaskUrlById(this.props.data.task_operation[1])}
										class="startShixunTask_continueShixun"
									>{this.props.data.task_operation[0]}</a>
								</span>
								:
								<span onClick={()=>this.taskoperationId(	this.props.data&&this.props.data.task_operation[1])}>
									{this.props.data&&this.props.data.task_operation[0]}
								</span>)
								:"开启中":""}
						</span>
						:""
					}

			</a>
		)
	}
}
export default Startshixuntask;