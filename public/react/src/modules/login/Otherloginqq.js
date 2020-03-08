import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Spin } from 'antd';
import axios from 'axios';
class Otherloginqq extends Component {

	componentDidMount() {
		let query=this.props.location.search;
		if(query!= ""){
			const type = query.split('?code=');
			const types = type[1].split('&state=');
			const typeshref = types[1].split('%2C');
			let codeurl = `/auth/qq/callback`;
			axios.get(codeurl,{params:{
					code:types[0],
					redirect_uri:`https://www.educoder.net/otherloginqq`
				}}).then((result)=> {
				if(result){
					if(result.data.status===0){
						if(result.data.new_user===true){
							window.location.href=`https://${decodeURIComponent(typeshref[1])}/loginqq?type=qq`;
						}else{
							// this.getinfo()
							if(typeshref[0]==="account"){
								window.location.href=`https://${decodeURIComponent(typeshref[1])}/account/binding`;
							}else{
								window.location.href=`https://${decodeURIComponent(typeshref[1])}`;
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

export default Otherloginqq;