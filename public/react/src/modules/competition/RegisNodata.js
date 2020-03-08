import React, {Component} from 'react';
import competition from './comcss/competition.css';
import {getImageUrl} from 'educoder';
// 团队竞赛报名无报名子组件
class RegisNodata extends React.Component {
	constructor(props) {
		super(props)


	}


	render() {
		return (
			<div className="bootom">
				<div className="bootomimg" style={{
					height: "80px",
					width: "125px",
					marginTop: "107px",
					background: `url(${getImageUrl(`images/educoder/competitions/Noentry.jpg`)})`,
					backgroundPosition: "center",
					backgroundSize: "110% 100%",
				}}>

				</div>
				<p className="bootomtext">暂无战队参与报名哦，赶紧来成为第一个挑战的吧~</p>
			</div>

		)
	}

}

export default RegisNodata;
