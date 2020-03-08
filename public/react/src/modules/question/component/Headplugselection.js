import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {WordsBtn, ActionBtn,SnackbarHOC,getImageUrl} from 'educoder';
import axios from 'axios';
import {
	notification,
	Spin,
	Table,
	Pagination,
} from "antd";
import './../questioncss/questioncom.css';
class Headplugselection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page:1,
			titlestting:"全部",
			titlesttingid:null,
			titlesttings:null,
			titlesttingss:null,

		}
	}
	//初始化
	componentDidMount(){

	}
//
// 	setdiscipline_id={(e)=>this.setdiscipline_id(e)}
// setsub_discipline_id={(e)=>this.setsub_discipline_id(e)}
// settag_discipline_id={(e)=>this.settag_discipline_id(e)}
  settitlestting=(name,id)=>{
		//如果全部其他的选项重置
		this.setState({
			titlestting:name,
			titlesttingid:id,
			titlesttings:null,
			titlesttingsid:null,
			titlesttingss:null,
			titlesttingssid:null
		})
		if(name==="全部"){
			this.props.setdiscipline_id(null);

		}else{
			this.props.setdiscipline_id(id);
		}



	}

	settitlesttings=(name,id)=>{
		//课程选项
		this.setState({
			titlesttings:name,
			titlesttingsid:id,
			titlesttingss:null,
		})
		this.props.setsub_discipline_id(id);
	}

	settitlesttingss=(name,id)=>{
		//知识点
		if(this.state.titlesttings===null){
			this.props.showNotification('请先选择课程');
			return

		}
		this.setState({
			titlesttingss:name,
			titlesttingssid:id
		})
		this.props.settag_discipline_id(id);


	}
	render() {
		let {page,titlestting,titlesttings,titlesttingss}=this.state;
		// //console.log("Headplugselection");
		// //console.log(this.props.disciplinesdata);
		// disciplinesdatakc:kc,
		// 	disciplinesdatazsd:zsd,
		var kc=0;
		var zsd=0;

		if(this.props.disciplinesdata){
		const didata = this.props.disciplinesdata;
		for (var i = 0; i < didata.length; i++) {
			//方向
			const fxdidata = didata[i].sub_disciplines;

			if(titlestting===didata[i].name){
			for (var j = 0; j < fxdidata.length; j++) {
					kc=kc+1;

				//课程
				const zsddata = fxdidata[j].tag_disciplines;
				for (var k = 0; k < zsddata.length; k++) {
					//知识点
					zsd=zsd+1;
				}
			}
			}else if(titlestting==="全部"){
				kc=kc+1;
				zsd=zsd+1;
			}else{

			}


		}
		}
		return (
			<div className=" clearfix mt21  ">
				<div className="educontent w1200dbl">

			<div className="clearfix edu-back-white    tophoms">
				{/*课程*/}
      <div className=" sortinxdirection">
       <div className="w60  tophomsembolds">
				 方向：
			 </div>
				<div className="sortinxdirection minleng40">
					<div className={titlestting==="全部"?" titlesttingcss xiaoshou":" titlesttingcssmy xiaoshou"} onClick={()=>this.settitlestting("全部",null)}>
						全部
					</div>
					{this.props.disciplinesdata&&this.props.disciplinesdata.map((object, index) => {
						return (
							<div className={titlestting===object.name?" xiaoshou titlesttingcss":" titlesttingcssmy xiaoshou"} onClick={()=>this.settitlestting(object.name,object.id)}>
								{object.name}
							</div>
						)
					})}

				</div>
			</div>
      {/*课程*/}
				{
					kc===0?
						""
						:
						<div className="mt30 sortinxdirection">
							<div className="w60  tophomsembolds">
								课程：
							</div>
							<div className="sortinxdirection minleng40">

								{this.props.disciplinesdata&&this.props.disciplinesdata.map((objectn, index) => {
									return (
										titlestting==="全部"?
											objectn.sub_disciplines&&objectn.sub_disciplines.map((object, indexs) => {
												return (
													<div className={index===0&&indexs===0&&titlesttings===object.name?"titlesttingcss xiaoshou":index===0&&indexs===0&&titlesttings!==object.name?"titlesttingcssmy xiaoshou"

														:titlesttings===object.name?" titlesttingcss xiaoshou":"titlesttingcssmy  xiaoshou"} onClick={()=>this.settitlesttings(object.name,object.id)}>
														{object.name}
													</div>
												)
											})
											:
											objectn.name===titlestting?
												objectn.sub_disciplines&&objectn.sub_disciplines.map((object, indexs) => {
													return (
														<div className={index===0&&indexs===0&&titlesttings===object.name?"titlesttingcss xiaoshou":index===0&&indexs===0&&titlesttings!==object.name?"titlesttingcssmy xiaoshou"

															:titlesttings===object.name?" titlesttingcss xiaoshou":"titlesttingcssmy  xiaoshou"} onClick={()=>this.settitlesttings(object.name,object.id)}>
															{object.name}
														</div>
													)
												})
												: ""
									)
								})}

							</div>


						</div>
				}
				{/*知识点*/}
				{
					zsd===0?
						""
						:<div className="mt30 sortinxdirection">
							<div className="w60  tophomsembolds">
								知识点：
							</div>


							<div className="sortinxdirection minleng40">

								{this.props.disciplinesdata&&this.props.disciplinesdata.map((objecta, index) => {
									return (
										titlestting==="全部"&&titlesttings===null?
											objecta.sub_disciplines&&objecta.sub_disciplines.map((objectb, indexs) => {
												return (
													objectb.tag_disciplines&&objectb.tag_disciplines.map((object, indexss) => {
														return (
															<div className={index===0&&indexs===0&&indexss===0&&titlesttingss===object.name?"titlesttingcss xiaoshou":
																index===0&&indexs===0&&indexss===0&&titlesttingss!==object.name?"titlesttingcssmy xiaoshou"
																	:titlesttingss===object.name?" titlesttingcss xiaoshou":" titlesttingcssmy xiaoshou"} onClick={()=>this.settitlesttingss(object.name)}>
																{object.name}
															</div>
														)
													})
												)
											})
											:titlestting==="全部"&&titlesttings!==null?
											objecta.sub_disciplines&&objecta.sub_disciplines.map((objectb, indexs) => {
												return (
													titlesttings===objectb.name?
														objectb.tag_disciplines&&objectb.tag_disciplines.map((object, indexss) => {
															return (
																<div className={index===0&&indexs===0&&indexss===0&&titlesttingss===object.name?"titlesttingcss xiaoshou":
																	index===0&&indexs===0&&indexss===0&&titlesttingss!==object.name?"titlesttingcssmy xiaoshou"
																		:titlesttingss===object.name?" titlesttingcss xiaoshou":" titlesttingcssmy xiaoshou"} onClick={()=>this.settitlesttingss(object.name)}>
																	{object.name}
																</div>
															)
														}):""
												)
											})
											: titlestting!=="全部"&&titlesttings!==null?
												titlestting===objecta.name?
													objecta.sub_disciplines&&objecta.sub_disciplines.map((objectb, indexs) => {
														return (
															titlesttings===objectb.name?
																objectb.tag_disciplines&&objectb.tag_disciplines.map((object, indexss) => {
																	return (
																		<div className={index===0&&indexs===0&&indexss===0&&titlesttingss===object.name?"titlesttingcss xiaoshou":
																			index===0&&indexs===0&&indexss===0&&titlesttingss!==object.name?"titlesttingcssmy xiaoshou"
																				:titlesttingss===object.name?" titlesttingcss xiaoshou":" titlesttingcssmy xiaoshou"} onClick={()=>this.settitlesttingss(object.name)}>
																			{object.name}
																		</div>
																	)
																}):""
														)
													})
													:""
												: titlestting!=="全部"&&titlesttings===null?
													titlestting===objecta.name?
														objecta.sub_disciplines&&objecta.sub_disciplines.map((objectb, indexs) => {
															return (
																objectb.tag_disciplines&&objectb.tag_disciplines.map((object, indexss) => {
																	return (
																		<div className={index===0&&indexs===0&&indexss===0&&titlesttingss===object.name?"titlesttingcss xiaoshou":
																			index===0&&indexs===0&&indexss===0&&titlesttingss!==object.name?"titlesttingcssmy xiaoshou"
																				:titlesttingss===object.name?" titlesttingcss xiaoshou":" titlesttingcssmy xiaoshou"} onClick={()=>this.settitlesttingss(object.name)}>
																			{object.name}
																		</div>
																	)
																})
															)
														})
														:""
													:""
									)
								})}

							</div>


						</div>
				}

			</div>
			</div>
			</div>
		)

	}



}
export default  Headplugselection ;
