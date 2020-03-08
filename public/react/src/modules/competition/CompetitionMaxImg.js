import React, {Component} from 'react';
import competition from './comcss/competition.css';
import {getImageUrl} from 'educoder';
// 团队竞赛报名大图
class CompetitionMaxImg extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			GetenrollmentAPI: undefined
		}
	}

	componentDidMount() {

	}

	componentDidUpdate = (prevProps) => {
		if (prevProps.GetenrollmentAPI != this.props.GetenrollmentAPI) {
			this.setState({
				GetenrollmentAPI: this.props.GetenrollmentAPI,
			})
		}
	}

	render() {
		let {type, pint} = this.props;
		return (
			<div>
				<style>
					{
						`
					
						`
					}
				</style>
				{
					type === 1 || type === 2 ?
						<div className="registrationback"
								 style={{"background": `url(${getImageUrl(`images/educoder/competitions/tipregistit.jpg`)})`}}
						>
							<p className="registrationbackp1">在线竞赛平台</p>
							<p className="registrationbackp2">在线竞赛平台是一个面向计算机类的互联网IT教育和实战平台，</p>
							<p className="registrationbackp3">提供企业级工程实训，以实现工程化专业教学的自动化和智能化。</p>
							<div className="registrationbackp2button">
								<div className="registbut1">
									<p onClick={() => this.props.Jointheteam()}>加入战队</p>
								</div>
								<div className="registbut2">
									<p onClick={() => this.props.Createateam()}>创建战队</p>
								</div>

							</div>
						</div>
						:
						type === 3 ?

							<div className="registrationback"
									 style={{"background": `url(${getImageUrl(`images/educoder/competitions/tipregistit.jpg`)})`}}
							>
								<p className="registrationbackp1">在线竞赛平台</p>
								<p className="registrationbackp2">在线竞赛平台是一个面向计算机类的互联网IT教育和实战平台，</p>
								<p className="registrationbackp3">提供企业级工程实训，以实现工程化专业教学的自动化和智能化。</p>
								<div className="registrationbackp2button">
									<div className="registbut1">
										<p onClick={() => this.props.Jointheteam()}>加入战队</p>
									</div>
									<div className="registbut2">
										<p onClick={() => this.props.Createateam()}>创建战队</p>
									</div>

								</div>
							</div>
							:
							type === 4 || type === 5 ?

								<div className="registrationback"
										 style={{"background": `url(${getImageUrl(`images/educoder/competitions/tipregistit.jpg`)})`}}
								>
									<p className="registrationbackp1">在线竞赛平台</p>
									<p className="registrationbackp2">在线竞赛平台是一个面向计算机类的互联网IT教育和实战平台，</p>
									<p className="registrationbackp3">提供企业级工程实训，以实现工程化专业教学的自动化和智能化。</p>
									<div className="registrationbackp2button">
										<div className="registbut1">
											<p onClick={() => this.props.Jointheteam()}>加入战队</p>
										</div>
										<div className="registbut2">
											<p onClick={() => this.props.Createateam()}>创建战队</p>
										</div>

									</div>
								</div>
								: type === 6 ?
								<div className="registrationback"
										 style={{"background": `url(${getImageUrl(`images/educoder/competitions/tipregistit.jpg`)})`}}>
									<p className="registrationbackp1">在线竞赛平台</p>
									<p className="registrationbackp2">在线竞赛平台是一个面向计算机类的互联网IT教育和实战平台，</p>
									<p className="registrationbackp3">提供企业级工程实训，以实现工程化专业教学的自动化和智能化。</p>
									<div className="registrationbackp2button">
										{
											pint === 1 ?
												<div className="registbut1" onClick={() => this.props.Personalregistration()}>
													<p onClick={() => this.props.Personalregistration()}>立即报名</p>
												</div>
												: pint === 2 ?
												<div className="personreg1">
													<p>已报名</p>
												</div>
												:
												<div className="personreg1">
													<p>报名已截止</p>
												</div>
										}

									</div>
								</div>
								:
								<div className="registrationback"
										 style={{"background": `url(${getImageUrl(`images/educoder/competitions/tipregistit.jpg`)})`}}>
								</div>
				}


			</div>

		)
	}

}

export default CompetitionMaxImg;

// // type3
// /*<div className="registrationback"*/
// /*		 style={{"background": `url(${getImageUrl(`images/educoder/competitions/tipregistit.jpg`)})`}}>*/
// /*	<p className="registrationbackp1">Educoder竞赛平台</p>*/
// /*	<p className="registrationbackp4">高校智能课堂与综合实训平台</p>*/
// /*	<div className="registrationbackp2button2">*/
// /*		<div className="registbut11">*/
// /*			<p onClick={() => this.props.Jointheteam()}>加入战队</p>*/
// /*		</div>*/
// /*		<div className="registbut22">*/
// /*			<p onClick={() => this.props.Createateam()}>创建战队</p>*/
// /*		</div>*/
//
// /*	</div>*/
// /*</div>*/
//
//
// // type === 4 || type === 5
// // <div className="registrationback1"
// // 		 style={{"background": `url(${getImageUrl(`images/educoder/competitions/tipregistit.jpg`)})`}}>
// // 	<p className="registrationbackp11">Educoder竞赛平台</p>
// // 	<p className="registrationbackp22">高校智能课堂与综合实训平台</p>
// // 	<div className="registrationbackp2button3">
// // 		<div className="registbut111">
// // 			<p onClick={() => this.props.Jointheteam()}>加入战队</p>
// // 		</div>
// // 		<div className="registbut222">
// // 			<p onClick={() => this.props.Createateam()}>创建战队</p>
// // 		</div>
// //
// // 	</div>
// // </div>
