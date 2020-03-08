import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {getRandomcode} from 'educoder';
import axios from 'axios';

import { Select,message,Modal,Input,Spin,Icon,Tooltip  } from 'antd';

import './ecCourseSupports.css';

const $ = window.$;
class CourseSupports extends Component {
    constructor(props) {
        super(props)
        this.state={
            data:'',
            ec_courses_list:[],
            editcourse:[{"weights": 0,
                "ec_course_name":'',
                "top_relation": false,
                "ec_course_id":''
            }],
            editnum:0,
            index:0,
            ec_graduation_subitem_id:0,
            ec_year_id:0,
            schooldata:{},
            spinning:true,
            ecComponentState:'ecCourseSupports',
            supportid:null,
            Editkey:null,
            titlemessage:"提示",
            Supportstype:false,
            Supportslist:'',
            Supportssum:false,
            Supportsclass:false,
					  Supportsclasskey:undefined,
				   	neweditcourse:[{"weights": 0,
							"ec_course_name":'',
							"top_relation": false,
							"ec_course_id":''
						}],
					max_support_count:0
        }
    }

    componentWillMount(){
        this.setState({
            ec_year_id:this.props.match.params.ec_year_id,
            major_school_id:this.props.match.params.major_school_id
        })
        window.document.title = '课程体系 vs 毕业要求';
    }

    UpdateClassData=()=>{

        let ec_year_id=this.props.match.params.ec_year_id;

        this.setState({
            ec_year_id:ec_year_id
        })

        const url = `/ec_years/${ec_year_id}/graduation_course_supports.json`;
        axios.get(url)
				.then((response) => {
						if(response.status===200){
								if(response.data.graduation_subitems.length===0){
									this.setState({
										Supportstype:true,
										data:response.data,
										Supportslist:'数据为空，请去毕业要求——>毕业要求指标点分解列表配置数据'
									})
								}else{
									let datas=response.data.graduation_subitems;
									let listlength=[]
									 datas.map((item,key)=>{
										 listlength.push(item.course_supports.length)
									 })

								 let max_support_count=Math.max(...listlength);

									this.setState({
										max_support_count:max_support_count,
										data:response.data
									})
								}
						}

				})
				.catch(function (error) {
						console.log(error);
				});

			const zrl = `/ec_years/${ec_year_id}/ec_courses/search.json`;
			axios.get(zrl,{params:{
						per_page:10000,
					}
				})
				.then((response) => {

					if(response.status===200){
						this.setState({
							ec_courses_list:response.data.ec_courses
						})
					}

				})
				.catch(function (error) {
					console.log(error);
				});

    }
    componentDidMount(){
        this.setState({
            ec_year_id:this.props.match.params.ec_year_id,
            major_school_id:this.props.match.params.major_school_id
        })
        this.UpdateClassData();

    }
    EditSupportCourse=(keys,e)=>{
        $('#school_major_list').scrollLeft(0);
        let id=e.target.id;
        id=parseInt(id);

        let subindex =e.target.getAttribute("subindex");

        // const url = `/ec_course_supports/edit_require_vs_course?subitem_id=`+id
        // axios.get(url)
        //     .then((response) => {
				//
        //         if(response.status===200){

				//
        //             this.setState({
        //                 ec_courses_list:response.data.ec_courses_list,
        //                 editcourse:support_data,
        //                 index:subindex,
        //                 ec_graduation_subitem_id:id,
        //                 Supportssum:false,
        //                 Supportsclass:false,
        //             })
				//
        //             let {editcourse} =this.state;
        //             let neweditcourse=editcourse;
        //             let newnum=0;
        //             for(var j=0;j<neweditcourse.length;j++){
        //                 if(neweditcourse[j].weigths===undefined){
        //                     newnum=0
        //                 }else{
        //                     newnum=newnum+neweditcourse[j].weigths;
        //                 }
        //             }
        //             newnum= Math.round(newnum*100)/100;
				//
        //             this.setState({
        //                 editnum:newnum
        //             })
        //         }
				//
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
      let  {data}=this.state;


			data.graduation_subitems.map((item,key)=>{
				if(keys===key){

					if(item.course_supports.length>0){
						this.setState({
							editcourse:item.course_supports,
							neweditcourse:item.course_supports,
							Editkey:key,
							index:subindex,
							ec_graduation_subitem_id:id,
						})
					}else if(item.course_supports.length===0){
						this.setState({
							editcourse:[{weights: 0,top_relation: false,ec_course_name:'',ec_course_id:''}],
							neweditcourse:[{weights: 0,top_relation: false,ec_course_name:'',ec_course_id:''}],
							Editkey:key,
							index:subindex,
							ec_graduation_subitem_id:id,
						})
					}

				}
			})

			let newnum=0;

			data.graduation_subitems.map((item,key)=>{
				if(keys===key){
					item.course_supports.map((items,keys)=>{
						if(items.weights===undefined){
							newnum=0
						}else{
							newnum=newnum+items.weights;
						}
					})
				}
			})

			newnum= Math.round(newnum*100)/100;

			this.setState({
				editnum:newnum
			})
      console.log(newnum)

        // $("#school_ListTableLine").show();
        // let offsettop=$("#school_ListTableLine").position().top||$("#school_ListTableLine").scrollTop || $("#school_ListTableLine").pageYOffset;
        // window.scrollTo(0, offsettop)
    }

    Addcourse=(e)=>{
        let {editcourse} =this.state;
				let arr=new Array();
				editcourse.map((item,key)=>{
					arr.push(item)
				})

        let neweditcourse=arr;
        let newadd = {weights: 0,top_relation: false,ec_course_name:'',ec_course_id:''};
        neweditcourse.push(newadd);
        this.setState({
            editcourse:neweditcourse
        })
    }
    editcourse=(neweditcourse)=>{
        this.setState({
            editcourse:neweditcourse
        })

    }

    Deletcourse=(e)=>{
        // 删除
        // let id =e.target.getAttribute("index");
        let {editcourse} = this.state;
        let arr=new Array();
				editcourse.map((item,key)=>{
					arr.push(item)
				})

        let neweditcourse=arr;
			if(neweditcourse.length>1){
				neweditcourse.splice(e,1);
				let newnum=0;
				for(var j=0;j<neweditcourse.length;j++){
					if(neweditcourse[j].weights===undefined){
						newnum=0
					}else{
						newnum=newnum+neweditcourse[j].weights;
					}
				}
				newnum= Math.round(newnum*100)/100;

				this.setState({
					Supportstype:false,
					supportid:null,
					Supportslist:"",
					editcourse:neweditcourse,
					editnum:newnum
				})
			}else{
				this.setState({
					// Supportstype:true,
					Supportslist:'删除失败,至少保留一个课程',
				})
			}


    }

    enterweight=(e)=>{
        let {editcourse} = this.state;
				let arr=new Array();
				editcourse.map((item,key)=>{
					arr.push(item)
				})

        let neweditcourse=arr;
        var id=e.target.id;
        var value=parseFloat(e.target.value);
        if(isNaN(value)){
            value=""
        }
        var x = String(value).indexOf('.') + 1;
        var y = String(value).length - x;
        if(y > 2){
            this.setState({
                // Supportstype:true,
                Supportslist:'请精确到2位数',
                Supportssum:true
            })
            return
        }else{
					this.setState({
						Supportssum:false
					})
				}


        const person = new Object ();
        person.weights=value;
        person.ec_course_id= neweditcourse[id].ec_course_id;
        person.ec_course_name=neweditcourse[id].ec_course_name;
        person.top_relation=neweditcourse[id].top_relation;


        neweditcourse[id]=person;

        let newnum=0;
        for(var j=0;j<neweditcourse.length;j++){

            if(neweditcourse[j].weights===undefined){
                newnum=newnum+0;
            }else if(neweditcourse[j].weights===""){
                newnum=newnum+0;
            }else{
                newnum=newnum+neweditcourse[j].weights;
            }

        }
        newnum= Math.round(newnum*100)/100;
        this.setState({
            editnum:newnum,
            editcourse:neweditcourse
        })
        if(newnum>1){
            this.setState({
                // Supportstype:true,
                Supportslist:'权重之和不能大于1',
                Supportssum:true
            })
        }else{
					this.setState({
						Supportssum:false
					})
				}

    }
    handleChange=(e)=> {

        let {editcourse} = this.state;

				let arr=new Array();
				editcourse.map((item,key)=>{
					arr.push(item)
				})
        let neweditcourse=arr;

				let value=`${e[0]}`;
				value=parseInt(value)
        let num=`${e[1]}`;
        num=parseInt(num)

        for(var z=0;z<editcourse.length;z++){
            if(neweditcourse[z].ec_course_name===`${e[2]}`){
                this.setState({
                    Supportstype:true,
                    Supportslist:"请勿选择重复的支持课程"
                })
                return
            }
        }
        for(var i=0;i<1;i++){
            neweditcourse[num].ec_course_id=value;
            neweditcourse[num].ec_course_name=`${e[2]}`
        }

        this.editcourse(neweditcourse);
    }

    relevancetop=(e)=>{

        let {editcourse} = this.state;

				let arr=new Array();
				editcourse.map((item,key)=>{
					arr.push(item)
				})

        let neweditcourse=arr;
        let id =e.target.getAttribute("itindex");
        for(var i=0;i<1;i++){
            neweditcourse[id].top_relation=false;
        }

        this.editcourse(neweditcourse);
    }

    relevancebottom=(e)=>{

        let {editcourse} = this.state;
				let arr=new Array();
				editcourse.map((item,key)=>{
					arr.push(item)
				})
        let neweditcourse=arr;
        let id =e.target.getAttribute("itindex");
        for(var i=0;i<1;i++){
            neweditcourse[id].top_relation=true;
        }

        this.editcourse(neweditcourse);
    }
    focus() {
        this.inputNumberRef.focus();
    }

    blur() {
        this.inputNumberRef.blur();
    }
    CancelSupports=()=>{
    	let{editcourse,neweditcourse}=this.state;
				//
				// console.log(editcourse)
				// console.log(neweditcourse)

        this.setState({
            Editkey:null,
            Supportssum:false,
            Supportsclass:false,
					  editcourse:neweditcourse
        })
    }
    SubmitClassData=()=>{
        let {editcourse,editnum,ec_graduation_subitem_id} = this.state;
        if(editcourse.length===0){
            this.setState({
                // Supportstype:true,
                Supportslist:'保存失败,至少保留一个课程',
                Supportssum:true
            })
            return
        } 
        if(editnum>1||editnum===0){
            this.setState({
                // Supportstype:true,
                Supportslist:'保存失败,权重大于1或为空',
                Supportssum:true
            })
            return
        }

        // for(var p=0; p<editcourse.length;p++){
        //     if(editcourse[p].weigths===""){
        //         editcourse[p].weigths=0;
        //     }
        //     if(editcourse[p].ec_course_id===""){
        //         this.setState({
        //             // Supportstype:true,
        //             Supportslist:'保存失败,课程不能为空',
        //             Supportsclass:true
        //         })
        //         return
        //     }
        // }

				editcourse.map((item,key)=>{
					if(item.weights===""){
						item.weights=0;
					}
					if(item.ec_course_id===""){
						this.setState({
							// Supportstype:true,
							Supportslist:'保存失败,课程不能为空',
							Supportsclass:true,
							Supportsclasskey:key
						})
						return
					}
				})




        var Url = `/ec_years/${this.props.match.params.ec_year_id}/graduation_course_supports.json`;
        axios.post(Url, {
					    	graduation_subitem_id	:ec_graduation_subitem_id,
					    	course_supports: editcourse
            }
        ).then((response) => {
            if(response.data.id===ec_graduation_subitem_id){

              //   this.setState({
              //       Editkey:null,
              //       Supportslist:"保存成功",
              //       Supportstype:true,
              //       Supportssum:false,
              //       Supportsclass:false,
							// 		  Supportsclasskey:undefined,
              //   })
							this.UpdateClassData();
							this.setState({
								Editkey:null,
								Supportssum:false,
								Supportsclass:false,
							})
            }else if(response.data.status===-1){
                // this.setState({
                //     Supportslist:"参数错误",
                //     Supportstype:true,
                //     Supportssum:false,
                //     Supportsclass:false,
								// 	  Supportsclasskey:undefined,
                // })
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    Deletcourses=(key)=>{
        this.setState({
            supportid:key,
            Supportslist:"您确定要删除吗?",
            Supportstype:true
        })
    }
    hideSupports=()=>{
        this.setState({
            Supportstype:false,
            supportid:null,
            Supportslist:"",
        })
    }

			confirmysl(url){
				axios.get(url + '?export=true').then((response) => {
					if(response.data.status&&response.data.status===-1){

					}else if(response.data.status&&response.data.status===-2){
						if(response.data.message === "100"){
							// 已超出文件导出的上限数量（100 ），建议：

							this.setState({
								DownloadType:true,
								DownloadMessageval:100
							})
						}else {
							//因附件资料超过500M
							this.setState({
								DownloadType:true,
								DownloadMessageval:500
							})
						}
					}else {
						this.props.showNotification(`正在下载中`);
						window.open(getRandomcode("/api"+url), '_blank');
					}
				}).catch((error) => {
					console.log(error)
				});
			}

			toforums=(url)=>{
				window.open( url, '_blank');
			}
    render() {
        const Option = Select.Option;
        let {max_support_count,data,ec_courses_list,editcourse,editnum,index,ec_year_id,Supportsclasskey,ecComponentState,hidesupport,supportid,Editkey,titlemessage,Supportstype,Supportslist,Supportssum,Supportsclass,major_school_id} = this.state;
        var list = (length) => {
            var res = [];
            for(var i = 0; i < length; i++) {
                res.push( <span key={i} className="column-1 color-666">
                            <div style={{lineHeight: '20px'}}>支撑课程
                            <br/> （权值）
                            </div>
                          </span>)
            }
            return res
        }

        let toptiebox={width: 126.6*max_support_count+"px"};

        let ismidbox={width:123.82*max_support_count+"px",margin:'0px 0px'};

        // console.log(this.props.year&&this.props.year.can_manager)
        return (
            <div className="newMain clearfix">
                <Modal
                    title={titlemessage}
                    // Supportstype
                    visible={Supportstype}
                    className={"ecmodeldelet"}
                    closable={false}
                    footer={null}
                >
                    <div className="task-popup-content">
                        <div className="task-popup-text-center font-14">{Supportslist}</div>
                    </div>
                    <div className="task-popup-submit clearfix">
                    <a onClick={this.hideSupports} className="task-btn fl">取消</a>
                        { supportid===null?<a className="task-btn task-btn-orange fr"
                            onClick={this.hideSupports}
                        >确定</a>:
                       <a  className="task-btn task-btn-orange fr"
                            onClick={()=>this.Deletcourse(supportid)}
                        >确定</a>}
                    </div>
                </Modal>


                <div className="educontent mb20">



                    <div className="edu-back-white eacourse">

                        <div className="clearfix padding20-30 bor-bottom-greyE" style={{position:'relative'}}>
                            <span className="font-18 courseSystem">课程体系对毕业要求的支撑</span>
                            {/* <a href="javascript:void(0)" className="fr white-btn edu-blueback-btn mt4">导出培养目标</a> */}


                            <span className={this.props.year&&this.props.year.can_manager===false?"none":"Importclassroomdata"} style={{top: '29px'}}>
                                <a className="white-btn edu-blueback-btn fr mb10 mr10" onClick={()=>this.confirmysl(`/ec_years/${this.props.match.params.ec_year_id}/graduation_course_supports.xlsx`)}>导出课程体系支撑矩阵</a>
                            </span>
                            <div className="color-grey-9 mr10">用矩阵图的形式说明本专业课程体系对毕业要求的支撑关系  <a className={"color-blue"} onClick={() => this.toforums(`/forums/${3534}`)} >查看详情</a></div>

                        </div>
                        <div className="padding20-30" id="training_objective_contents">
                            <span className="fl SystemParameters" >毕业要求指标点（<a href={`/ecs/major_schools/${this.props.match.params.major_school_id}/years/${this.props.match.params.ec_year_id}/graduation_requirement`}><span className="Systemnum">{data.count}</span></a>）</span>
                            <span className="fl ml20 SystemParameters">课程体系（<a href={`/ecs/major_schools/${this.props.match.params.major_school_id}/years/${this.props.match.params.ec_year_id}/courses/ec_course_support_setting/1`}><span className="Systemnum">{data.course_count}</span></a>）</span>
                        </div>

                    </div>

                    <div className="ListTableLine" id="school_major_list" style={{overflow:'auto'}}>

                        <p className="clearfix" style={toptiebox}>
                            <span className="color-666 finishtarget">毕业要求指标点</span>
                            {data.graduation_subitems===undefined?"":list(max_support_count<5||max_support_count===undefined?5:max_support_count)}
                            <span className="column-1 operationright color-666"
                            style={{
                                paddingLeft: '28px'
                            }}
                            >合计</span>
                        </p>
                        <div className="paddingLF" style={{background:'#fff'}}>
                            {
                                data.graduation_subitems===undefined? <Spin  delay={500} className="Spinlarge"  indicator={<Icon type="loading" style={{ fontSize: 30 }} spin />}/>:data.graduation_subitems.map((item,key)=>{

                                    return (
                                        <li className={data.graduation_subitems.length===key+1?"clearfix mb10":"clearfix"}  key={key} style={ismidbox}>
                                            <Tooltip placement="bottom" title={item.sequence_title}>
                                                <span className="column-1 columnlocation" style={{display:Editkey!=key?"block":'none',width: '95px', paddingLeft: '23px'}}>{item.graduation_requirement_position+"-"+item.position}</span>
                                            </Tooltip>


                                            {
                                                item.course_supports.map((t,kes)=>{

                                                    return(
                                                        <span key={kes} className="column-1" 
                                                        style={{
                                                            display:Editkey!=key?"block":'none',
                                                            marginRight: '-1px'
                                                        }}>
                                                        <div title={t.ec_course_name} className={t.top_relation===true?"DDred columnbox":"columnbox"}
                                                        style={{textAlign: 'center'}}
                                                        >{t.ec_course_name.length>12?t.ec_course_name.substring(0, 10)+"...":t.ec_course_name}</div>
                                                        <div className={t.top_relation===true?"DDred":""}
                                                         style={{textAlign: 'center'}}
                                                        >（{t.weights}）</div>
                                                         </span>
                                                    )

                                                })
                                            }

                                            <span className="column-1 operationright" style={{display:Editkey!=key?"block":'none',width:'75px'}}>
                                                  <div className="operationColumn">
                                                      <div className="left">
                                                          <div className="width20 columnbox">{item.course_supports.length}</div>
                                                          <div className="width20">{Math.round(item.weights_total*100)/100===0?0:(Math.round(item.weights_total*100)/100)}</div>
                                                      </div>
                                                      <div className="left operationalter">
                                                         {this.props.year&&this.props.year.can_manager===false?"":<a className="editSubentry" title="编辑">
                                                            <i className="iconfont icon-bianjidaibeijing color-green" id={item.id} subindex={item.graduation_requirement_position+"-"+item.position} onClick={this.EditSupportCourse.bind(this,key)}></i>
                                                          </a>} 
                                                    </div>
                                                  </div>

                                              </span>
																					<style>
																						{
																							`
																							.ListTableLine li{ background: rgb(255, 255, 255);}
																							`
																						}
																					</style>
																					{Editkey===key?
                                            <p className="ListTableLine" id="school_ListTableLine"  style={ismidbox}  >
																							<div style={{width: '1134px'}}>
																								<p className="clearfix SystemModifythelist">
																									<span className="ml6" style={{width:'77px'}}>指标点 {index}</span>
																									<span className="column-4">支撑课程</span>
																									<span className="column-2 ml93">
                                                      <span> 权重(∑=1)</span>
                                                      <span className="Systempoint">（精确到两位小数）</span>
                                                    </span>
																									<span className="column-1 ml50">关联度最高</span>
																								</p>

																								<div className="clearfix editorModify">
																									{Supportsclass===true?<style>
																										{
																											`
																											.showredfont .ant-select-selection{
																											    border: 1px solid #db0505 !important;
																											}
																											`
																										}
																									</style>:""}
																									{
																										editcourse.map((it,key)=>{

																											return(
																												<div className="mb15" key={key}>

																													<Select className={Supportsclasskey===key?"showredfont heightimportant":"heightimportant"} showSearch value={it.ec_course_name} onChange={this.handleChange}>
																														{
																															ec_courses_list.map((qva,qk)=>{
																																return(
																																	<Option value={[qva.id,key,qva.name]} key={[qva.id,key,qva.name]}>{qva.name}</Option>
																																)
																															})

																														}
																													</Select>
																													<Input
																														type="number"
																														size="large"
																														className={Supportssum===true?"inputWeight bor-red":"inputWeight"}
																														id={key}
																														value={it.weights}
																														onInput={this.enterweight.bind(this)}
																													/>

																													<div className="SetTheAssociated">

																														<div className="SetTheAssociatedchild">

																															<i className="iconfont icon-gouxuan gouxuanbule" style={{display:it.top_relation===false?'none':'block'}} itindex={key} onClick={this.relevancetop.bind(this)}></i>
																															<i className="iconfont icon-gouxuan gouxuanwhite" style={{display:it.top_relation===false?'block':'none'}} itindex={key} onClick={this.relevancebottom.bind(this)}></i>

																														</div>

																														<div className="left operatebutton">
																															{editcourse.length===1?"":<a className="mr15 delSubentry" title="删除">
																																<i className="iconfont icon-shanchu color-grey-c font-15" onClick={()=>this.Deletcourses(key)}></i>
																															</a>}
																															<a className="newAddSubentry" title="添加"
																																 style={{display:key===editcourse.length-1?"inline-block":'none'}}
																															><i className="iconfont icon-tianjiafangda color-green" onClick={this.Addcourse}></i></a>
																														</div>

																													</div>

																												</div>
																											)
																										})
																									}

																								</div>
																								<span className="c_red none ml35 color-red" id="error_tip" style={{display:Supportssum===true||Supportsclass===true?'inline':'none'}}>{Supportslist}</span>
																								<div className="clearfix editorModify">
                                                    <span className="column-1"
																													style={{
																														width: '580px',
																														paddingLeft: '37px',
																														display: 'inline-block'
																													}}
																										>合计: <span>{editcourse.length}</span></span>
																									<span className="ml30">合计: <span>{editnum}</span></span>
																								</div>

																								<div className="right editlybuttonbox">
																									<div className="defalutSubmitbtn fr" onClick={this.SubmitClassData}>保存</div>
																									<div className="defalutCancelbtn fr mr20" onClick={this.CancelSupports}>取消</div>
																								</div>
																							</div>
                                            </p>:""}
                                        </li>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default  CourseSupports ;

