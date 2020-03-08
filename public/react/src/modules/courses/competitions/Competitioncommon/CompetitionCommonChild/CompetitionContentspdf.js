import React, { Component } from 'react';
import {Tabs} from 'antd';
import axios from 'axios';
import {markdownToHTML,getImageUrl,AttachmentList} from 'educoder';
import CompetitionContentspdfdownload from './CompetitionContentspdfChild/CompetitionContentspdfdownload';
import CompetitionContentspdfpeopledata from './CompetitionContentspdfChild/CompetitionContentspdfpeopledata';
// import NoneData from "../../../courses/shixunHomework/shixunHomework";

const { TabPane } = Tabs;
class CompetitionContentspdf extends Component{
	constructor(props) {
		super(props)
		this.state={
			Tabskey:"1"
		}
	}

	componentDidMount(){
		window.document.title = '竞赛';
		let query=this.props.location&&this.props.location.search;
		const types = query.split('user_id=')
		if(types[1]===undefined){
		}else{
			this.setState({
				Tabskey:"2"
			})
		}
	}

	Competitioncallback=(key)=>{
		this.setState({
			Tabskey:key
		})
	}

	render() {


		return (

			<div className={"fr"}>
				<div className={"mb100 "}>
					<Tabs defaultActiveKey="1" onChange={(e) => this.Competitioncallback(e)} activeKey={this.state.Tabskey}>
						<TabPane tab="获奖证书下载" key="1" >
							{this.state.Tabskey==="1"?<CompetitionContentspdfdownload
								{...this.props}
								{...this.state}
								Competitioncallback={(e)=>this.Competitioncallback(e)}
							/>:""}
						</TabPane>
						<TabPane tab="完善个人信息" key="2">
							{this.state.Tabskey==="2"?<CompetitionContentspdfpeopledata
								{...this.props}
								{...this.state}
							/>:""}
						</TabPane>
					</Tabs>
				</div>
			</div>

		)
	}
}
export default CompetitionContentspdf;
