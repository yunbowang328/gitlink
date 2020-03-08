import React, { Component } from 'react';
import {Button,Layout,Row, Col,Divider,Table} from 'antd';
import axios from 'axios';
import {getImageUrl,getRandomcode} from 'educoder';
import './CompetitionContentspdfdownload.css';
// import NoneData from "../../../courses/shixunHomework/shixunHomework";


class CompetitionContentspdfdownload extends Component{
	constructor(props) {
		super(props)
		this.state={
			data:undefined,
			teams:undefined
		}
	}

	componentDidMount(){
		window.document.title = '竞赛';
		let url=`/competitions/${this.props.match.params.identifier}/prize.json`;
		let query=this.props.location&&this.props.location.search;
		const types = query.split('user_id=')
		let userid;
    if(types[1]===undefined){
			userid=this.props.user&&this.props.user.user_id;
		}else{
			userid=types[1];
		}
		axios.get(url,{params:{
				user_id:userid,
			}
		}).then((response) => {
			if(response.status===200){

				let datas=response.data.teams;
				if(datas.length>0){
					datas.map((item,key)=>{
						let lista=item.team_members;
						if(lista.length>0){
							console.log(lista)
							lista.map((i,k)=>{
							 i["bank_account"]=item.bank_account;
							})
						}
					})
				}
				this.setState({
					data:response.data,
					teams:datas,
				})
			}
		}).catch((error) => {
			console.log(error)
		})
	}

	render() {



    let {data,teams}=this.state;

		const columns = [
		{
			title: '角色',
			dataIndex: 'type',
			key: 'type',
			render: (text, record) => (
			<span>
					{record.role}
      </span>
			),
		},
		{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
			render: (text, record) => (
			<span>
				{record.name}
      </span>
			),
		},
		{
			title: '实名认证',
			dataIndex: 'namecertify',
			key: 'namecertify',
			render: (text, record) => (
				<span>
				{record.real_name_auth==="authed"?<span className={"pdfdownloadfont00CC5F"}>已认证</span>:record.real_name_auth==="authing"?<span className={"pdfdownloadfontFF6602"}>待审核</span>:record.real_name_auth==="not_authed"?<span className={"color-red"}>未认证</span>:""}
      </span>
			),
		},
		{
			title: '职业认证',
		  key: 'certify',
			dataIndex: 'certify',
			render: (text, record) => (
				<span>
				{record.professional_auth==="authed"?<span className={"pdfdownloadfont00CC5F"}>已认证</span>:record.professional_auth==="authing"?<span className={"pdfdownloadfontFF6602"}>待审核</span>:record.professional_auth==="not_authed"?<span className={"color-red"}>未认证</span>:""}
      </span>
			),
		},
		{
			title: '手机绑定',
		  key: 'mobile',
			dataIndex: 'mobile',
			render: (text, record) => (
				<span>
				{record.phone_binded===true?<span className={"pdfdownloadfont00CC5F"}>已绑定</span>:<span className={"color-red"}>未绑定</span>}
      </span>
		),
		},
		{
			title: '邮箱绑定',
			key: 'mail',
			dataIndex: 'mail',
			render: (text, record) => (
				<span>
					{record.email_binded===true?<span className={"pdfdownloadfont00CC5F"}>已绑定</span>:<span className={"color-red"}>未绑定</span>}
      </span>
			),
		},
			{
				title: '开户行及银行卡号信息（队长填写）',
				key: 'idcard',
				dataIndex: 'idcard',
				render: (value, record, index) => {
					if (index === 0&&record.bank_account!=null) {
						return {
							children: <span>{record.bank_account.bank + record.bank_account.second_bank + record.bank_account.card_no}</span>,
						};
					}

				},
			},
	];


   let people=[  { url: '/api/competitions/xxxxx/certificates/1/personal' },
		 { url: '/api/competitions/xxxxx/certificates/2/personal' },]
		return (
			<React.Fragment>
				<Row>
					<Col className={"pdfdownload"}>温馨提示：填写的个人信息经审批后，将提供个人获奖证书下载；团队队员信息全部审批后，将提供团队获奖证书下载。</Col>
				</Row>

				<Row className={"mt30"}>
					<Col className={"pdfpicture"}>证书情况</Col>
				</Row>

				<Row className={"mt30"}>
				   <Col>个人证书：{data&&data.personal_certifications.length===0&&data&&data.all_certified===false?
						 <span><span className={"pdfpicture font-14"}>暂未生成</span>  <span className={"ml20"}>原因：<span className={"pdfpicture font-14"}>还未认证个人信息，</span><a className={"pdfdownloadfont4CACFF"} onClick={()=>this.props.Competitioncallback("2")}>立即认证</a></span></span>:
						 data&&data.personal_certifications.length===0&&data&&data.all_certified===true?
							 <span><span className={"pdfpicture font-14"}>暂未生成</span>  <span className={"ml20"}>原因：<span className={"pdfpicture font-14"}>组委会未完成证书审批，请稍后</span></span></span>:
						 data&&data.personal_certifications.map((item,key)=>{
							return(
								<span className={"mr10"} key={key}>
									<img src={ getImageUrl(`images/educoder/pdfs.png`)} />
									<a className={"pdfdownloadfont4CACFF ml10"}    href={getRandomcode(item.url)} download=""
										 title="下载"  mce_href="#">立即下载</a>
								</span>
							)
						})}</Col>
				</Row>

				<Row className={"mt30"}>
					<Col>团队证书：
						{data&&data.team_certifications.length===0?<span className={"pdfpicture font-14"}>暂未生成</span>
						:data&&data.team_certifications.map((item,key)=>{
							return(
								<span className={"mr10"} key={key}>
									<img src={ getImageUrl(`images/educoder/pdfs.png`)} />
									<a className={"pdfdownloadfont4CACFF ml10"}    href={getRandomcode(item.url)} download=""
										 title="下载"  mce_href="#">立即下载</a>
								</span>
							)
						})}
					</Col>
				</Row>
				<Divider />
				<style>
					{
						`
						.pdfdownloadTable .ant-table-column-title{
						 color:#000;
						}
						.pdfdownloadTable .ant-table-tbody > tr > td{
							color:#666666;
				      border-bottom: 1px solid transparent;
						}
						.pdfdownloadTable .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
  					  text-align: center;
			      }
						`
					}
				</style>
				{teams&&teams.map((item,key)=>{
					return(
						<Row className={"mt30"} key={key}>
							<Col className={"pdfpicture mb20"}>{item.name}战队信息填报概况</Col>

							<Table columns={columns} dataSource={item.team_members} className={"pdfdownloadTable"} pagination={false}/>
						</Row>
					)
				})
				}


			</React.Fragment>
		)
	}
}
export default CompetitionContentspdfdownload;