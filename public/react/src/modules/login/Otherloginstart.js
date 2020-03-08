import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Spin } from 'antd';
import axios from 'axios';
class Otherloginstart extends Component {

	componentDidMount() {
		let query=this.props.location.search;

		if(query!= ""){
			const type = query.split('?code=');
			const types = type[1].split('&state=');
			const typeshref = types[1].split(',');

			if(typeshref[1]==="test-newweb.educoder.net"){
				window.location.href=`https://${typeshref[1]}/otherloginstart?code=${types[0]}&state=null,""`;
			}else if(typeshref[1]==="pre-newweb.educoder.net"){
				window.location.href=`https://${typeshref[1]}/otherloginstart?code=${types[0]}&state=null,""`;
			}
			let codeurl = `/auth/wechat/callback.json`
			axios.get(codeurl,{params:{
					code:types[0]
				}}).then((result)=> {
				if(result){
					if(result.data.status===0){
						if(result.data.new_user===true){
							this.props.history.replace(`/otherlogin?type=wechat`);
						}else{
							// this.getinfo()
							if(typeshref[0]==="account"){
								this.props.history.replace(`/account/binding`);
							}else{
								this.props.history.replace(`/`);
							}

						}
					}
				}
			}).catch((error)=>{

			})
		}


	}

	render() {
		// Loading
		return (
			<div className="App" style={{minHeight: '800px',width:"100%"}}>
				<style>
					{
						`
						 .margintop{
						   margin-top:20%;
						 }
						`
					}
				</style>
				<Spin size="large" className={"margintop"}/>
			</div>
		);
	}
}

export default Otherloginstart;