import React, {Component} from "react";
import {WordsBtn,markdownToHTML, MarkdownToHtml} from 'educoder';
import { Form, Select, Input, Button,Checkbox,Upload,Icon,message,Modal, Table, Divider,InputNumber, Tag,DatePicker,Radio,Tooltip,Pagination} from "antd";
import {Link,Switch,Route,Redirect} from 'react-router-dom';
import axios from 'axios';
import Exercisetablesmubu from './Exercisetablesmubu';
import Exercisestatisticalresulttabel from './Exercisestatisticalresulttabel';

import '../css/members.css';
import '../css/busyWork.css';
import '../poll/pollStyle.css';

const CheckboxGroup = Checkbox.Group;
const $ = window.$
function createMarkup(value) { return {__html:value} };
class Exercisestatisticalresult extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data:undefined,
			sort:"asc",
			exercise_group_id:[],
			page:1,
			limit:10,
			searchtext:"",
			order: "end_at",


		}
	}

	componentDidMount() {
	 let{sort,exercise_group_id,page,limit}=this.state;
	  this.updatefun(sort,exercise_group_id,page,limit);
		try {
			this.props.triggerRef(this);
		}catch (e) {

		}
	}
	_getRequestParams() {
		const { order, exercise_group_id,searchtext, page ,limit} = this.state
		return {
			page,
			search:searchtext,
			order,
			limit: limit,
			group_id:exercise_group_id,
		}
	}
	updatefun=(sort,exercise_group_id,page,limit)=>{
		let ExerciseId=this.props.match.params.Id;
		let url = `/exercises/`+ExerciseId+`/exercise_result.json`;
		axios.get(url,{
			params:{
				sort:sort,
				exercise_group_id:exercise_group_id,
				page:page,
				limit:limit
			}
		}).then((result) => {
				this.setState({
					data:result.data
				})
		}).catch((error) => {
			console.log(error)
		})
	}


	onSortTypeChange=()=>{
		let{exercise_group_id,page,limit,sort}=this.state;
		let newdesc="asc";
		if(sort==="desc"){
			newdesc="asc"
		}else{
			newdesc="desc"
		}
		 this.setState({
			 sort:newdesc
		 })

		 this.updatefun(newdesc,exercise_group_id,page,limit)
	}

	funtaskstatustwo=(checkedValues,list)=>{

		let{sort,page,limit}=this.state;
    // if(checkedValues.length===list.length){
		// 	this.setState({
		// 		exercise_group_id:[]
		// 	})
		// }else{
		//
		// }
		this.setState({
			exercise_group_id:checkedValues
		})
		this.updatefun(sort,checkedValues,page,limit)
	}

	alldatalist = () => {
		let {sort, page, limit} = this.state;
		this.setState({
			exercise_group_id: []
		})
		this.updatefun(sort, [], page, limit)
	}
	PaginationCourse=(pageNumber)=>{
		let{sort,exercise_group_id,limit}=this.state;

		this.setState({
			page:pageNumber
		})

		// debugger
		$('html').animate({
			scrollTop: 10
		}, 1000);
		this.updatefun(sort,exercise_group_id,pageNumber,limit)

	}

	render() {
		let{data,sort,page,limit} =this.state;
		let choicetype=["满分作答","部分得分作答","零分作答","未批"]
		return (
			<div className=" ">

				<style>
					{`
					 div{
					 color: rgba(0, 0, 0, 0.65);
					 }
					`}
				</style>
				<div className={"educontent mb30" } >

					{data&&data.course_groups.length===0?"":<div className="stud-class-set">
						<div className="clearfix edu-back-white">
							<ul className="clearfix" style={{padding:'20px'}}>
							<li className="clearfix  mt10">
								<span className="fl mr10 color-grey-8">分班情况：</span>
								<span className="fl ">
									<a id="graduation_comment_no_limit"
										 className={this.state.exercise_group_id.length === 0 ? "pl10 pr10 mr20 check_on" : "pl10 pr10 mr20"}
										 onClick={() => this.alldatalist()}>全部</a>
								</span>
								<CheckboxGroup onChange={(e)=>this.funtaskstatustwo(e,data&&data.course_groups)} value={this.state.exercise_group_id} style={{width:'87%',paddingTop: '4px'}}>
									{ data&&data.course_groups.map((item, key) => {
										return (
											<span key={key}>
                        <Checkbox value={item.exercise_group_id}
																	key={item.exercise_group_id}
                                  // checked={course_group_info === undefined ? false : course_group_info[key].course_group_id === item.course_group_id ? true : false}
                                  className="fl ">{item.exercise_group_name}
                          <span>({item.exercise_group_students})</span>
                        </Checkbox>
                    </span>
										)
									})}
								</CheckboxGroup>
							</li>
							</ul>
						</div>
					</div>}

					<div className="stud-class-set">
						<div className="clearfix edu-back-white exerciseTable ">
               <Exercisestatisticalresulttabel
	               data={data}
               />
						</div>
					</div>
					<style>
						{`
						.fafafa{
						    background: #fafafa;
						    height:50px;
						  }
						  .drop_down_normal li{
    						text-align: center;
						  }
						  .mr33{
    						margin-right: 33px;
						  }
						 .fiilssort{
								 position: absolute;
								 top: -9px;
						  }
						`}
					</style>

					<div className="stud-class-set fafafa">
						<li className="fl mt10 cursor zexercisetitle">统计详情</li>
						<li className="drop_down fr mt10 cursor zexercisetitle" onClick={() => this.onSortTypeChange()}>
							{/*{sort==="percent"?"正确率":sort==="type"?"题型":sort==="position"?"题序":""}*/}
							{/*<i className="iconfont icon-xiajiantou font-12 ml2"></i>*/}
							{/*<ul className="drop_down_normal">*/}
								{/*{sort==='percent'?"":<li onClick={() => this.onSortTypeChange('percent')}>正确率</li>}*/}
								{/*{sort==='type'?"":<li onClick={() => this.onSortTypeChange('type')}>题型</li>}*/}
								{/*{sort==='position'?"":<li onClick={() => this.onSortTypeChange('position')}>题序</li>}*/}
							{/*</ul>*/}
							正确率
							<sapn className="relativef ml5"style={{"top":"3px"}} >
								<i className={sort==="asc"?
									"iconfont icon-sanjiaoxing-up font-12  color-blue fiilssort" :"iconfont icon-sanjiaoxing-up font-12 fiilssort"}></i>
								<i className={sort==="desc"?
									"iconfont icon-sanjiaoxing-down font-12 yslbottomsj color-blue":"iconfont icon-sanjiaoxing-down font-12 yslbottomsj"}></i>
							</sapn>
						</li>
					</div>


				 <style>
					 {`
					 .CACFF{
						 color:#4CACFF;
					 }
					 .C3333{
					   color:#333;
					 }
					 .bor-greyE{
						border: 1px solid #EEEEEE!important;
					 }
						.padtop24{
						    padding-top: 24px;
						}
						.exerciseTable .shixunreporttitle{
							padding:0px!important;
						}
						.exerciseTable .ant-table-thead > tr > th,.exerciseTable .ant-table-tbody > tr > td{
							padding:16px 20px!important;
						}
						.exerciseTable .editormd-html-preview{
							width:100%!important;
						}
					 `}
				 </style>
					{/* 从子组件将样式提出来，不然会循环多次 */}
				 <style>{`
				// .ant-table-thead > tr > th{
				//     text-align: center;
				// 	}
				.tasknamebox{
			    width: 50px;
			    height: 24px;
			    border: 1px solid rgba(221,23,23,1);
			    border-radius: 12px;
			    color: rgba(221,23,23,1);
			    display: inline-block;
					line-height: 24px;
					text-align: center;
					}

					.tasknameboxs{
					   color: #666666 !important;
					   background:rgba(237,237,237,1) !important;
					}

				  .ant-table-tbody > tr > td{
            font-size:14px;
					}
					.task-hide{
					    max-width: 345px;
					    overflow: hidden;
					    white-space: nowrap;
					    text-overflow: ellipsis;
					}
					// .ant-table-tbody > tr{
					//    height:64px;
					//    text-align: center;
					// }
          .ant-progress-success-bg, .ant-progress-bg{
             background-color: #29BD8B !important;
          }
          .ant-table-thead > tr > th:nth-child(1){
     				text-align: left;
          }
          .ant-table-tbody > tr > td:nth-child(1){
          		text-align: left;
          }
          .Exermubu .ant-table-tbody > tr:nth-last-child(1) > td{
					  border:1px solid transparent;
          }
		  .Exermubu .editormd-html-preview, .Exermubu .editormd-preview-container {
			  background: transparent;
		  }
			`}
				</style>
					{data&&data.commit_results.map((item,key)=>{
							 return(
								<div className="stud-class-set mb20 exerciseTable" key={key}>
									<div className="clearfix edu-back-white poll_list"  style={{padding: '20px'}}>
										<div className="font-16 shixunreporttitle fl" style={{width:"1050px"}}>
											<span
												className="C3333">{item.ques_position + "."}{item.ques_type === 0 ? "单选" : item.ques_type === 1 ? "多选" : item.ques_type === 2 ? "判断" : item.ques_type === 3 ? "填空" : item.ques_type === 4 ? "主观" : item.ques_type === 5 ? "实训" : ""}题</span>
										<div>
											{/*Q{item.ques_position}：*/}
											{/* <div className={"markdown-body"} dangerouslySetInnerHTML={{__html: markdownToHTML1(item.ques_title).replace(/▁/g,"▁▁▁")}}></div> */}
											<MarkdownToHtml content={item.ques_title} selector={'ques_title_' + key}
												className=""
											></MarkdownToHtml>
											{/*<span className="markdown-body" dangerouslySetInnerHTML={createMarkup(item.ques_title)}></span>*/}
										</div>
										 </div>
								    <div className="fr shixunreporttitles mt3">正确率<span style={{color:'#FF6800'}}> {item.right_percent}%</span></div>
									</div>
									{item.ques_type===5?

									item.ques_details.map((ite,k)=>{
										return(
											<div>
												<div className="clearfix edu-back-white poll_list mb10"  style={{padding: '0px 20px'}}>
													<div className="font-16 shixunreporttitle fl pt20 pb20">
														<span>{ite.challenge_position}：{ite.challenge_name}</span>
													</div>
													<div className="fr shixunreporttitles">正确率<span style={{color:'#FF6800'}}> {ite.challenge_percent}%</span></div>
												</div>
												<Exercisetablesmubu
													tableNum={`${key}${k}`}
													data={ite.challenge_details}
													type={item.ques_type}
													effictive_counts={item.effictive_counts}
													choicetype={choicetype}
												/>
											</div>
										)
									}):
							    <Exercisetablesmubu
										tableNum={key}
								    data={item.ques_details}
								    type={item.ques_type}
								    effictive_counts={item.effictive_counts}
										choicetype={choicetype}
									 />}
								</div>
							 )
						 })}

				</div>
				{
					data && data.questions_count > 10 &&
					<div className="mb40 edu-txt-center padding20-30">
						<Pagination
							showQuickJumper
							defaultCurrent={1}
							pageSize={limit}
							total={ data && data.questions_count }
							current={page}
							onChange={this.PaginationCourse}
						/>
					</div>
				}

			</div>


		)
	}
}

export default Exercisestatisticalresult;



