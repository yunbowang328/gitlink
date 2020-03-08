import React, { Component } from 'react';
import { Select,InputNumber,message,Modal,Input,Radio,Spin,Icon,Tooltip,Popconfirm,Upload,Button} from 'antd';
import axios from 'axios';
class Curriculumtwo extends Component {
	//测试用
	constructor(props) {
		super(props)
		// console.log(props);
		this.state={
			params:[],
			deletelist:[],
			ec_course_id:0,
			ec_course_name:undefined,
			ec_course_evaluation_lists:undefined,
			course_evaluation_lists:undefined,
			course_name: undefined,
			deletetype:"end",
			savetype:'',
			schooldata:{},
			course_url:undefined,
			Evaluationsparamstype:true,
			idkey:null,
			listid:null,
			Modallist:"",
			Modallisttype:false,
			titlemessage:"提示",
			savetypes:false,
			levels:undefined,
			editecGradetype:false,
			editlevels:undefined,
			listvaluey:null,
			Modallisttypes:false,
			ismanager:false
		}
	}

	componentWillMount(){
		window.document.title ="成绩等级设置";
	}

	componentDidMount(){
		console.log(this.props.match.params);
		this.props.Ontitine(this.props.match.params.type);
		let ec_course_id=706;
		let Url = `/ec_courses/`+ec_course_id+`/score_levels.json`;
		axios.get(Url).then((response) => {
			if(response.status===200){
				this.setState({
					levels:response.data.levels,
					ismanager:response.data.ismanager,
					editlevels:response.data.levels
				})
			}
		}).catch((error) => {
			console.log(error)
		})

		const jol =`/ec_major_schools/get_navigation_data?ec_course_id=`+ec_course_id;
		axios.get(jol, {
				withCredentials: true,
			})
			.then((response) => {
				if(response.status===200){
					// if(response.data.allow_visit===false){
					//     window.location.href="/403"
					//  }
					this.setState({
						schooldata:response.data
					})
				}

			})
			.catch(function (error) {
				console.log(error);
			});
	}

	updalevels=()=>{
		let ec_course_id=this.props.match.params.ec_course_id;
		let Url = `/ec_courses/`+ec_course_id+`/score_level_data`;
		axios.get(Url, {
				withCredentials: true,
			}
		).then((response) => {
			if(response.status===200){
				this.setState({
					levels:response.data.levels,
					ismanager:response.data.ismanager,
					editlevels:response.data.levels
				})
			}
		}).catch((error) => {
			console.log(error)
		})

	}
	editecGrade=()=>{
		this.setState({
			editecGradetype:true
		})
	}

	CancelecCourseEvaluationstop=()=>{
		this.updalevels();
		this.setState({
			editecGradetype:false
		})

	}

	SaveecCourseEvaluationstop=()=>{
		let {editlevels}=this.state;
		let levels=editlevels;
		let ec_course_id=this.props.match.params.ec_course_id;
		for(var i=0; i<levels.length; i++){
			if(levels[i].level===""){
				this.setState({
					Modallisttypes:true,
					// Modallist:"等级名称不能为空",
					listvaluey:i
				})
				return
			}
		}

		let Url = `/ec_courses/`+ec_course_id+`/crud_score_level`;
		axios.post(Url,{levels:editlevels}
		).then((response) => {
			if(response.status===200){
				// this.setState({
				//     editecGradetype:false
				// })
				this.updalevels();
			}
		}).catch((error) => {
			console.log(error)
		})

	}

	deleteditecGrade=(key)=>{
		let {editlevels}=this.state;
		let neweditlevels=editlevels;
		// console.log(key)
		neweditlevels.splice(key, 1);
		this.setState({
			editlevels:neweditlevels
		})
	}

	additecGrade=(key)=>{
		let {editlevels}=this.state;
		let neweditlevels=editlevels;
		let list={score: 0, level: ""}
		neweditlevels.push(list)
		// console.log(key)
		this.setState({
			editlevels:neweditlevels
		})
	}

	editlevelslist=(e,key)=>{
		let {editlevels}=this.state;
		let neweditlevels=editlevels;
		neweditlevels[key].level=e.target.value;
		this.setState({
			editlevels:neweditlevels
		})
	}

	editlevelslists=(e,key)=>{
		let {editlevels}=this.state;
		let neweditlevels=editlevels;
		let sum=parseInt(e.target.value);
		if(isNaN(sum)){
			sum=0
		}
		neweditlevels[key].score=sum;
		this.setState({
			editlevels:neweditlevels
		})
	}

	hidemodeldelete=()=>{
		this.setState({
			Modallisttype:false
		})
	}

	render() {
		const RadioGroup = Radio.Group;
		let {listvaluey,params,ec_course_evaluation_lists,ec_course_id,schooldata,course_name,course_url,idkey,modeldelet,listid,titlemessage,Modallisttype,Modallist,savetypes,levels,editlevels,editecGradetype,Modallisttypes,ismanager} = this.state;
		console.log(ismanager)
		return (
			<div className="educontent fl">
				<div className="ListTableLine newSystem" id="school_major_list">

					<p className="clearfix Coursetitle" style={{width:"1200px"}}>
						<span className="column-1 color-666 textalign ">等级名称</span>
						<span className="column-1 color-666 textalign">规则</span>

						<span className={ismanager===false?"none":"operationright color-666"}>
                            {/* 操作 */}
							<a className={"newAddSubentry"} data-tip-down="编辑" onClick={this.editecGrade}>
                                      {/*<i className="iconfont icon-tianjiafangda color-green" onClick={this.AddCourseEvaluations}></i>*/}
								<i className={"iconfont icon-bianjidaibeijing color-green"}></i>
                                </a>
                             </span>

					</p>

					<ul className="edu-back-white" style={{display:editecGradetype===false?'block':'none'}}>
						{
							levels===undefined?"":levels.map((item,key)=>{
								return(
									<li className="clearfix" key={key}>
										<span className="column-1 textalign textalign">{item.level}</span>
										<span className="column-1 task-hid a05101 textalign">分数
											{key>2?'<':'>= '}
											{item.score}</span>
									</li>
								)
							})
						}

					</ul>


					<div className="ListTableLine newSystem" id="school_major_list"  style={{display:editecGradetype===false?'none':'block'}}>
						<div className="ant-spin ant-spin-spinning">

							<div >
								<div className="ListTableLine newSystem" id="school_major_list" >
									<p className="clearfix Coursetitle GRADENEWFFF" style={{width:"1200px"}}>
										<span className="column-1 color-666 textalign font-16">等级名称</span>
										<span className="column-1 color-666 textalign font-16">规则</span>
										<span className="column-1 color-666 textalign font-16">分值</span>
										<span className="column-3 textalign" style={{color:'#989898'}}>（请按照分数的降序方式进行等级的划分设置）</span>
									</p>
								</div>

								<ul className="edu-back-white">
									{
										editlevels===undefined?"":editlevels.map((item,key)=>{
											return(
												<li className="clearfix GRADENbottom"  key={key}>
                                                <span className="column-1 textalign textalign ">
                                                    <Input size="large" className={parseInt(listvaluey)===key?"bor-red textalign":"textalign"} style={{width:"100%"}} value={item.level} index={key} onInput={(e)=>this.editlevelslist(e,key)}/>
                                                </span>
													{key===editlevels.length-1?<span className="column-1 task-hid a05101 textalign mt8">小于</span>:<span className="column-1 task-hid a05101 textalign mt8">大于或等于</span>}
													<span className="column-1 textalign textalign  ">
                                                    <Input size="large" className={"textalign"}  style={{width:"100%"}}  value={item.score} index={key}  onInput={(e)=>this.editlevelslists(e,key)}/>
                                                </span>

													{key===editlevels.length-1?<span className="column-3 GRADENpadding">
                                                    <a className="mr15 delSubentry">
                                                        <Tooltip placement="bottom" title="删除">
                                                            <i className="iconfont icon-shanchu color-grey-c font-17" onClick={()=>this.deleteditecGrade(key)}></i>
                                                        </Tooltip>
                                                    </a>
                                                    <a className="newAddSubentry">
                                                        <Tooltip placement="bottom" title="添加">
                                                        <i className="iconfont icon-tianjiafangda color-green additecGrade" onClick={()=>this.additecGrade(key)}></i>
                                                        </Tooltip>
                                                    </a>
                                                </span>:""}
												</li>
											)
										})
									}
									<span className="c_red none ml30" id="error_tip" style={{display: Modallisttypes===true?"block":"none", width: '100px'}}>内容不能为空</span>
								</ul>


								<div className="right editglybuttonbox mt20 mb20 mr20">
									<div className="defalutSubmitbtn fr" onClick={this.SaveecCourseEvaluationstop}>提交</div>
									<div className="defalutCancelbtn fr mr20" onClick={this.CancelecCourseEvaluationstop}>取消</div>
								</div>

							</div>



						</div>
					</div>
				</div>
			</div>
		)
	}


}
export default Curriculumtwo;