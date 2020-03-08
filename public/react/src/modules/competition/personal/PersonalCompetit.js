import React, {Component} from 'react';
import {SnackbarHOC, WordsBtn} from 'educoder';
import {TPMIndexHOC} from '../../tpm/TPMIndexHOC';
import competition from '../comcss/competition.css';
import {Button, Pagination,} from 'antd';
import CompetitionMaxImg from '../CompetitionMaxImg';
import Registrationitem from '../Registrationitem';

// 团队竞赛报名无报名
class PersonalCompetit extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loadingstate: false,
			page: 1,
			limit: 20,
			type: 6,
			pint: 1,
			test: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
		}
	}


	paginationonChangestwo = (pageNumber) => {
		this.setState({
			page: pageNumber,
			loadingstate: true,
		})
	}

	render() {
		const {test, page, limit, type, pint} = this.state;
		const listItems = test.map((item, index) =>
			<Registrationitem></Registrationitem>
		);
		return (
			<div className="newMain clearfix ">
				<div className={"educontent  mb20"} style={{width: "1200px", marginTop: "26px"}}>
					<div className="educontent mb20 ">
						<p className="clearfix mb20 mt10">
							<a className="btn colorgrey fl hovercolorblue ">在线竞赛</a>
							<span className="color-grey-9 fl ml3 mr3">&gt;</span>
							<a
								className=" btn colorgrey fl hovercolorblue ">全国高校计算机大赛-项目挑战</a>
							<span className="color-grey-9 fl ml3 mr3">&gt;</span>
							<WordsBtn className="fl">报名</WordsBtn>
						</p>
					</div>
					{/*大图*/}
					{
						type === 6 ?
							<CompetitionMaxImg type={type} pint={pint}></CompetitionMaxImg>
							:
							""
					}
					{
						pint === 1 || pint === 3 ?
							<div style={{
								marginTop: "22px"
							}}>
								<p>参赛总人数：<span style={{color: "#459BE5"}}>132</span><span style={{marginLeft: "5px"}}>人</span></p>
							</div>
							: ""}

					{/*列表*/}
					{
						pint === 1 || pint === 3 ?
							<div
								style={{
									marginTop: "31px"
								}}
							>
								{
									listItems
								}

							</div>
							: ""}
					{
						pint === 1 || pint === 3 ?
							<div className="edu-txt-center ysyslxh mt56 " style={{marginBottom: "192px",}}>
								<Pagination showQuickJumper current={page}
														onChange={this.paginationonChangestwo} pageSize={limit}
														total={30}></Pagination>
							</div>
							: ""
					}

				</div>

			</div>
		)
	}

}

export default SnackbarHOC()(TPMIndexHOC(PersonalCompetit));
