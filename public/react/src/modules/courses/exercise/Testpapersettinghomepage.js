import React,{ Component } from "react";
import {Checkbox,Input,Table, Pagination,Menu,Spin} from "antd";
import {Link,NavLink} from 'react-router-dom';
import { WordsBtn ,getRandomNumber,queryString,getRandomcode} from 'educoder';
import CoursesListType from '../coursesPublic/CoursesListType';
import '../css/members.css';
import '../css/busyWork.css';
import axios from 'axios';
import Modals from '../../modals/Modals';
import DownloadMessageysl from "../../modals/DownloadMessageysl";
import Studentshavecompletedthelist from './Studentshavecompletedthelist';
import WrappedExercisesetting from './Exercisesetting';
import ExerciseDisplay from './ExerciseDisplay'
import Exercisestatisticalresult from './Exercisestatisticalresult';
import ImmediatelyPublish from "../poll/pollPublicBtn/ImmediatelyPublish";
import ImmediatelyEnd from "../poll/pollPublicBtn/ImmediatelyEnd";
import Ecerciseallbackagain from './Ecerciseallbackagain';


const polls_status={1:"未发布",2:"提交中",3:"已截止",4:"已结束"}
const start_Value={0:"继续答题",1:"查看答题",2:"开始答题"}
const qs = require('qs');
//试卷主要设置页面
class Testpapersettinghomepage extends Component{
    constructor(props) {
        super(props);
            this.state={
                tab:["0"],
                searchtext:"",
                Commonheadofthetestpaper:undefined,
                visible:false,
                groupyslsval:"",
                current_status:undefined,
                DownloadType:false,
                DownloadMessageval:undefined,
							  donwloading:false,
							  exercise_status:3,
            }
    }
    //切换tab
    changeTab=(e)=>{
        this.setState({
            tab:e.key
        })

        // this.props.history.push(`/courses/${this.props.match.params.coursesId}/exercises/${this.props.match.params.Id}/student_exercise_list?tab=`+e.key)

    }
    componentDidMount(){
        const query =this.props.location.search;
        const type = query.split('?tab=');
        let sum = []
            sum.push(type[1])
        // console.log("componentDidMountcomponentDidMount");
        // console.log(sum);
        this.setState({
            tab:sum,
        })
     this.Commonheadofthetestpaper();

    }
    //试卷公用头部
    Commonheadofthetestpaper=()=>{
         // console.log("Commonheadofthetestpaper 试卷公用头部");
        var exercise_id = this.props.match.params.Id;
        var url = `/exercises/${exercise_id}/common_header.json`;
        axios.get(url).then((response) => {
            // console.log(JSON.stringify(response));
            try {
                if(response.status === 200){
                    this.setState({
                        Commonheadofthetestpaper:response.data,
                        current_status:response.data.user_permission.current_status,
											  exercise_status:response.data.exercise_status,
                    })
                    // console.log(JSON.stringify(response.data.show_statistic));

                }
            }catch (e) {

            }
        }).catch((error) => {
            console.log(error)
        });

    }

    Ecerciseacallagain=()=>{
        this.setState({
            visible:true
        })
    }
    callback=(val)=>{
        this.setState({
            visible:false
        })
      if(val===1){
          window.location.reload()
      }
    }

    moveTos=(val)=>{
        if(val===0){

        }
    }

    setcourse_groupysls=(val)=>{
        let list="";
        val.map((item,key)=>{
            if(item!=undefined){
                list=list+"&exercise_group_id[]="+item
            }
        })
        this.setState({
            groupyslsval:list
        })
    }
    // experiment=(url)=>{
		//
    //     axios.get(url).then((response) => {
    //     	   console.log(response);
    //         if(response.data.status&&response.data.status===-1){
		//
    //         }else if(response.data.status&&response.data.status===-2){
    //                if(response.data.messages === "100"){
    //                    // 已超出文件导出的上限数量（100 ），建议：
		// 								 this.setState({
		// 									 DownloadType:true,
		// 									 DownloadMessageval:100
		// 								 })
    //                }else {
    //                  //因附件资料超过500M
		// 								 this.setState({
		// 									 DownloadType:true,
		// 									 DownloadMessageval:500
		// 								 })
    //                }
    //         }else {
    //             window.open("/api"+url, '_blank');
    //         }
    //     }).catch((error) => {
    //         console.log(error)
    //     });
		//
    // }

	setgameexercise=(url)=>{

		let{Commonheadofthetestpaper}=this.state;
		if(Commonheadofthetestpaper.time>0){
			this.setState({
				Modalstype:true,
				ModalSave:()=>this.props.history.push(url),
				Modalstopval:`答题时长限制${Commonheadofthetestpaper.time}分钟，从首次答题开始实行不间断计时方法`,
				modalsBottomval:'请确认是否有充足的答题时间？',
			});
		}else{
			this.setState({
				Modalstype:true,
				ModalSave:()=>this.props.history.push(url),
				Modalstopval:"是否确认开始答题？",
				modalsBottomval:' ',
			})
		}

	}
    //打开pdf
	 confpdf = (url) =>{
		 window.open(url);
	 }
    /// 确认是否下载
        confirmysl(url,child){
					let params ={}
					if(child!=undefined){
						params =child._getRequestParams()!==undefined?child._getRequestParams():{};
					}

          const urll=url+`?${queryString.stringify(params)}`;

					axios.get(urll+ '&export=true').then((response) => {
            	if(response===undefined){
            		return
							}
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
                this.props.slowDownload(getRandomcode(urll))
							// this.setState({ donwloading: true })
							// downloadFile({
							// 	url: urll,
							// 	successCallback: (url) => {
							// 		this.setState({ donwloading: false })
							// 		console.log('successCallback')
							// 	},
							// 	failCallback: (responseHtml, url) => {
							// 		this.setState({ donwloading: false })
							// 		console.log('failCallback')
							// 	}
							// })
							// this.props.showNotification(`正在下载中`);

							// window.open("/api"+url+`?${queryString.stringify(params)}`+ '&export=true', '_blank');
            }
        }).catch((error) => {
            console.log(error)
        });
    }

    Downloadcal=()=>{
        this.setState({
            DownloadType:false,
            DownloadMessageval:undefined
        })
    }
	cancelmodel=()=>{
		this.setState({
			Modalstype:false,
			ModalSave:' ',
			Modalstopval:' ',
			modalsBottomval:' ',
			Loadtype:false
		})
	}
	// DownloadType=()=>{
	// 	this.setState({
	// 		DownloadType:false,
	// 		DownloadMessageval:undefined
	// 	})
	// }
	// Downloadcal=()=>{
	// 	this.setState({
	// 		DownloadType:false,
	// 		DownloadMessageval:undefined
	// 	})
	// }
	getsetdata =()=>{
    	 // console.log("Testpapersettinghomepage");
    	 // console.log("getsetdatassssss");
		  let{tab}=this.state;
    	try {
				if(tab[0]==="0"){
        this.child.Teacherliststudentlist();
				}
				if(tab[0]==="1"){
					this.child.Teacherliststudentlist();
				}
				if(tab[0]==="2"){
					this.child.Teacherliststudentlist();
				}
				if(tab[0]==="3"){
					this.child.getSettingInfo();
				}
			}catch (e) {

			}

	}
  bindRef = ref => { this.child = ref };
	goback=()=>{
		// let {datalist}=this.state;
		// let courseId=this.props.match.params.coursesId;
		// let category_id=this.props.match.params.category_id;
		//
		// window.location.href="/courses/"+courseId+"/graduation_tasks/"+datalist.graduation_id;
		// let courseId=this.props.match.params.coursesId;
		// if(courseId===undefined){
		// 	this.props.history.push("/courses");
		// }else{
		// 	this.props.history.push(this.props.current_user.first_category_url);
		// }
		this.props.history.goBack()
	}
    render(){
        let {tab,visible,Commonheadofthetestpaper,exercise_status}=this.state;
        const isAdmin =this.props.isAdmin();
        const isStudent = this.props.isStudent();
            // TODO

	  //console.log(Commonheadofthetestpaper.exercise_status);
			document.title=this.props.coursedata&&this.props.coursedata.name;
        return(
            <div className="newMain clearfix ">
								{/*<DownloadMessage*/}
								{/*	{...this.props}*/}
								{/*	value={this.state.DownloadMessageval}*/}
								{/*	modalCancel={this.Downloadcal}*/}
								{/*	modalsType={this.DownloadType}*/}
								{/*/>*/}
                <div className={"educontent mb20"} style={{width:"1200px"}}>
									{/* 公用的提示弹框 */}
									{this.state.Modalstype===true?<Modals
										modalsType={this.state.Modalstype}
										modalsTopval={this.state.Modalstopval}
										modalsBottomval={this.state.modalsBottomval}
										loadtype={this.state.Loadtype}
										modalCancel={this.cancelmodel}
										modalSave={this.state.ModalSave}
										antIcon={this.state.Modalstypeloding}
									></Modals>:""}
                    {visible===true?<Ecerciseallbackagain
                        {...this.props}
                        modalname={"打回重做"}
                        visible={visible}
                        callback={this.callback}
                    />:""}

                    <div className="educontent mb20" style={{width:"1200px"}}>
                        <p className="clearfix mb20 mt10">
                            <Link className=" btn colorgrey fl hovercolorblue "  to = {`/courses/${this.props.match.params.coursesId}`} >{this.props.coursedata.name}</Link>
                            <span className="color-grey-9 fl ml3 mr3">&gt;</span>
                            <Link className=" btn colorgrey fl hovercolorblue " to={`/courses/${this.props.match.params.coursesId}/exercises/${Commonheadofthetestpaper&&Commonheadofthetestpaper.user_permission.left_banner_id}`} >试卷</Link>
                            <span className="color-grey-9 fl ml3 mr3">&gt;</span>
                            <WordsBtn className="fl">试卷详情</WordsBtn>
                        </p>
                    </div>
                    <style>
                        {`
                        .summaryname{
                            line-height: 23px;
                            cursor: pointer;
                        }
                        `}
                    </style>

                    <div className="educontent" style={{width:"1200px"}}>
                        <p className=" fl color-black  summaryname ">
                            {Commonheadofthetestpaper === undefined?"":Commonheadofthetestpaper.exercise_name}
                        </p>
                        <CoursesListType
                            typelist={[`${polls_status[Commonheadofthetestpaper && Commonheadofthetestpaper.exercise_status]}`]}
                        />
                        <Link className="color-grey-6 fr font-16  summaryname  mr30" to={`/courses/${this.props.match.params.coursesId}/exercises/${Commonheadofthetestpaper&&Commonheadofthetestpaper.user_permission.left_banner_id}`}>返回</Link>
                        <p className="color-grey-6 fr font-16"> </p>

                    </div>
                    <div className="edu-back-white mt10" >
                        <div className="stud-class-set bor-bottom-greyE ">
                            <div className=" clearfix edu-back-white  pl30 pr30">
                                <div className="fl task_menu_ul">
                                    {this.props.isAdmin()===true?
                                        <Menu mode="horizontal" selectedKeys={tab} onClick={this.changeTab}>
                                            <Menu.Item key="0" className={"exercisesafonts"}>答题列表</Menu.Item>
                                            <Menu.Item key="1" className={"exercisesafonts"}>统计结果</Menu.Item>
                                            <Menu.Item key="2" className={"exercisesafonts"}>试卷预览</Menu.Item>
                                            <Menu.Item key="3" className={"exercisesafonts"}>设置</Menu.Item>
                                        </Menu>
                                        :
                                        <Menu mode="horizontal" selectedKeys={tab} onClick={this.changeTab}>
                                            <Menu.Item key="0" className={"exercisesafonts"}>答题列表</Menu.Item>
																					{Commonheadofthetestpaper&&Commonheadofthetestpaper.show_statistic===true?
                                            Commonheadofthetestpaper && Commonheadofthetestpaper.exercise_status===3?
																						<Menu.Item key="1" className={"exercisesafonts"}>统计结果</Menu.Item>:"":""}
                                            <Menu.Item key="3" className={"exercisesafonts"}>设置</Menu.Item>
                                        </Menu>
                                    }
                                </div>
                                {/*导出这块应该是下拉 因为需要前端导出，目前就只导出学生成绩*/}
                                {/*{isAdmin  === true? <WordsBtn className="fr color-blue font-16">导出成绩</WordsBtn>:""}*/}
                                <style>
                                    { `
                                          .drop_down_menu{
                                            height: 118px;
                                            left:0px;
                                            width: 121px;
                                           }
                                          .drop_down_menu li {
                                             overflow: visible;
                                               width: 121px;
                                             }
                                            .drop_down_menu li a{
                                                 padding:  0px; 
                                                font-size: 14px; 
                                             }
                                             .mt19{
                                              margin-top:19px;
                                             }
                                             .drop_down_menu, .drop_down_normal{
                                                padding-top: 10px;
                                                padding-bottom: 8px;
                                             }
                                              .exercisesafonts:hover {
                                                color:#1A0B00 !important;
                                                }
                                          `}
                                </style>
                                <div className={"studentList_operation_ul mt23"}>
                                {isAdmin  === true? <Spin spinning={this.state.donwloading} style={{  }}><li className="li_line drop_down fr color-blue font-15" style={{"paddingLeft":"0px"}}>
                                    导出<i className="iconfont icon-xiajiantou font-12 ml2"></i>
                                    <ul className="drop_down_menu" style={{"right":"-34px","left":"unset","height":"auto"}}>
                                        <li><a onClick={()=>this.confirmysl(`/exercises/${this.props.match.params.Id}/exercise_lists.xlsx`,this.child)}>学生成绩</a></li>
                                        {/* <li><a onClick={()=>this.confpdf(`/api/exercises/${this.props.match.params.Id}/export_exercise`)} >空白试卷</a></li> */}
                                        <li><a href={getRandomcode(`/api/exercises/${this.props.match.params.Id}/export_exercise`)} target="_blank">空白试卷</a></li>
                                        {/*<li><a onClick={()=>this.confirmysl(`/zip/export_exercises?exercise_id=${this.props.match.params.Id}${this.state.groupyslsval===null||this.state.groupyslsval===undefined?null:this.state.groupyslsval}`)}>学生答题试卷</a></li>*/}
                                    </ul>
                                </li></Spin>:""}
                                </div>

                                {
                                    isAdmin  === true &&Commonheadofthetestpaper && Commonheadofthetestpaper.user_permission.user_commit_counts>0&&Commonheadofthetestpaper.exercise_status===2?
                                      <a className="fr color-blue font-16 mt20 mr20" onClick={this.Ecerciseacallagain}>打回重做</a>:""
                                }

                                {isAdmin  === true? Commonheadofthetestpaper!==undefined&&Commonheadofthetestpaper.user_permission.exercise_publish_count>0? <ImmediatelyEnd
                                    {...this.props}
                                    {...this.state}
                                    className={"btn fr color-blue font-16 mt20 mr20"}
                                    checkBoxValues={[parseInt(this.props.match.params.Id)]}
                                    Exercisetype={"exercise"}
																	  // single={true}
                                    action={this.Commonheadofthetestpaper}
                                ></ImmediatelyEnd>:"":""}
                                {isAdmin  === true?Commonheadofthetestpaper!==undefined&&Commonheadofthetestpaper.user_permission.exercise_unpublish_count>0?   <ImmediatelyPublish
                                    {...this.props}
                                    {...this.state}
                                    className={"btn fr color-blue font-16 mt20 mr20"}
                                    checkBoxValues={[parseInt(this.props.match.params.Id)]}
                                    Exercisetype={"exercise"}
																		pushtype={true}
									                  action={this.Commonheadofthetestpaper}
                                    single={true}
																		getsetdata={this.getsetdata}
                                ></ImmediatelyPublish>
                               :"":""}
                                {isAdmin  === true? <Link className="fr color-blue font-16 mt20 mr20" to={`/courses/${this.props.match.params.coursesId}/exercises/${this.props.match.params.Id}/edit`}>编辑试卷</Link>:""}

                                {isAdmin  === false && this.props.current_user !== undefined?
																	Commonheadofthetestpaper&&Commonheadofthetestpaper.user_permission.current_status===2?
																		<a  className="fr color-blue font-16 mt20" onClick={()=>this.setgameexercise(`/courses/${this.props.match.params.coursesId}/exercises/${this.props.match.params.Id}/users/${this.props.current_user.login}`)}>开始答题</a>:
                                  <Link className="fr color-blue font-16 mt20"
                                        to={`/courses/${this.props.match.params.coursesId}/exercises/${this.props.match.params.Id}/users/${this.props.current_user.login}`}>
																		{exercise_status===2?start_Value[Commonheadofthetestpaper&&Commonheadofthetestpaper.user_permission.current_status]:exercise_status===3?"":exercise_status===4?"":start_Value[Commonheadofthetestpaper&&Commonheadofthetestpaper.user_permission.current_status]}
																	</Link>
                                  :""}

                            </div>
                        </div>


                    </div>
                    <DownloadMessageysl
                      {...this.props}
                      value={this.state.DownloadMessageval}
                      modalCancel={this.Downloadcal}
                      modalsType={this.state.DownloadType}
                    />
                    {
                        // 教师列表
                        parseInt(tab[0])==0 ? <Studentshavecompletedthelist {...this.props} {...this.state}  triggerRef={this.bindRef}  setcourse_groupysls={(value)=>this.setcourse_groupysls(value)} current_status = {this.state.current_status} Commonheadofthetestpaper={this.state.Commonheadofthetestpaper} yslstustate={[`${polls_status[Commonheadofthetestpaper && Commonheadofthetestpaper.exercise_status]}`]}></Studentshavecompletedthelist>:""
                    }

                    {/*统计结果*/}
                    {

                        parseInt(tab[0])==1 ? <Exercisestatisticalresult {...this.props} {...this.state} triggerRef={this.bindRef}></Exercisestatisticalresult>:""
                    }

                    {

                        parseInt(tab[0])==2 ? <ExerciseDisplay {...this.props} {...this.state} triggerRef={this.bindRef}></ExerciseDisplay>:""
                    }
                    {

                        parseInt(tab[0])==3 ? <WrappedExercisesetting  Commonheadofthetestpaper={this.state.Commonheadofthetestpaper} {...this.props} {...this.state} triggerRef={this.bindRef} Commonheadofthetestpapers={this.Commonheadofthetestpaper}></WrappedExercisesetting>:""
                    }
                </div>
            </div>
        )
    }
}

export default Testpapersettinghomepage;
