import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import classNames from 'classnames'

import axios from 'axios';

// import { TPMIndexHOC } from '../../../tpm/TPMIndexHOC';

import { SnackbarHOC } from 'educoder'

import { Select,InputNumber,message,Modal,Input,Radio,Spin,Icon,Tooltip } from 'antd';

import 'antd/dist/antd.css';

import '../../css/ecCourseEvaluations.css';
import EcTitleCourseEvaluations from "../../ecTitle/ecTitle";
import './eccourseevalut.css'
const $ = window.$;

// 课程目标评价方法
class EcCourseEvaluationsbottom extends Component {
    constructor(props) {
      super(props)
      this.state={
        totalevaluations_list:[],
        ec_course_target_id:0,
        achievement_list:[],
        evaluations_listSelec:[],
        evaluations_lists: [],
        evaluation_subitems_lists: [],
        evaluations_list:[],
        evaluation_subitems_list:{},
        achievement_methods:[],
        ec_course_target_name:"",
        buttomSaveCourseEvaluationsbottom:this.SaveCourseEvaluationsbottom,
        spinningstate:true,
        schooldata:{},
        sequenceid:0,
        target_id:null,
        titlemessages:"提示",
        Modallists:"",
        eacoursetype:false,
        eacoursesavetypes:false,
        newec_course_idbottom:undefined,
        methodologytype:false,
        meweacoursetype:false,
        newshowredvalue:false,
        percentagetype:false,
        ismanager:true
      }
    }
    getec_course_achievement_methods=()=>{
      const {newec_course_idbottom}=this.state;
      if(newec_course_idbottom!=undefined){
          // const url ='ec_courses/:course_id/course_targets.json';
          // const url = `/ec_course_achievement_methods?ec_course_id=`+newec_course_idbottom;
				const course_id = 706
          const  url =`/ec_courses/${course_id}/course_targets/course_achievement_methods.json`;
          axios.get(url, {
                withCredentials: true,
              })
            .then((response)=>{
              this.setState({
                achievement_list:response.data.course_targets,
                spinningstate:false,
                ismanager:true
              })
          }).catch(function (error) {
                console.log(error);
            });
      }
        // this.setState({
        //     achievement_list:[
        //         {course_achievement_methods: [
        //                 {
        //                     evaluate_id: 24,
        //                     evaluate_name: "期末考试",
        //                     course_evaluation_subitems: [
        //                         {evaluation_relates_id: 31, evaluation_relates_name: "期末考试1目标1考题"},
        //                         {evaluation_relates_id: 32, evaluation_relates_name: "期末考试1目标2考题"}
        //                     ],
        //                     percentage: 100,
        //                     score: 15
        //                 }
        //             ],
        //             target_id: 5
        //         },
        //     ],
        //     spinningstate:false
        // })


    }

    getNavigationData=(ec_course_id)=>{
        // const jol =`/ec_major_schools/get_navigation_data?ec_year_id=`+ec_year_id+"&ec_course_id="+ec_course_id;
        const jol =`/ec_major_schools/get_navigation_data?ec_course_id=`+ec_course_id;
        axios.get(jol, {
            withCredentials: true,
        })
            .then((response) => {
                if(response.status===200){
                //   if(response.data.allow_visit===false){
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
    componentDidMount(){
         let ec_course_id=this.props.match.params.ec_course_id;
         const course_id = 706
         const  url =`/ec_courses/${course_id}/course_targets/with_achievement_methods.json`;
			  // /ec_courses//course_targets/course_achievement_methods.json
         // const url = `/ec_course_achievement_methods?ec_course_id=`+course_id;
          axios.get(url)
            .then((response)=>{
              this.setState({
                achievement_list:response.data.course_targets,
                spinningstate:false,
                ismanager:true
              })
          }).catch(function (error) {
                console.log(error);
            });
    
         // this.getNavigationData(ec_course_id);
         this.setState({
             newec_course_idbottom:course_id
         })
      this.props.Ontitine("evaluation_methods");
    }
    editecCourseEvaluationslist=(e)=>{
        let id =e.target.getAttribute("target_id");
        let newid =e.target.name;

      this.setState({
          buttomSaveCourseEvaluationsbottom:this.SaveCourseEvaluationsbottom,
          target_id:id,
          percentagetype:false
       })
      // $("#ecCourseEvaluationsbottomsubmit").show();
      // $("#SystemParametersbottom").show();
      // let offsettop=$("#ecCourseEvaluationsbottomsubmit").position().top||$("#ecCourseEvaluationsbottomsubmit").scrollTop || $("#ecCourseEvaluationsbottomsubmit").pageYOffset;
      // window.scrollTo(0, offsettop)

      let {evaluations_list,evaluation_subitems_list,achievement_methods} = this.state;
      this.setState({
        achievement_methods:undefined,
        selectevaluation_phase:[],
        course_select_value:'',
        evaluations_lists:[],
        sequenceid:newid,
        methodologytype:false,
        Modallists:' ',
        meweacoursetype:false,
        eacoursesavetypes:false,
        newshowredvalue:false
      })

      let newevaluations_list=[];
      let newevaluation_subitems_list=new Object ();
      let newachievement_methods=[];
      const url = `/ec_course_achievement_methods/edit_course_target?ec_course_target_id=`+id;
      axios.get(url, {
            withCredentials: true,
          })
        .then((response)=>{
          if(response.status===200){
          if(response.data.evaluation_phase_list.length===0){
            this.setState({
              achievement_methods:undefined
            })
               let newObject=new Object ();
               newachievement_methods.push(newObject)
          }

          if(response.data.evaluation_phase_list.length>0){
            let evaluation_phase_list=response.data.evaluation_phase_list;
            let evaluations_list=response.data.evaluations_list;
            for(var i=0; i<evaluation_phase_list.length;i++){
              let course_select_value=null;
              let newevaluation_phase=evaluation_phase_list[i].evaluation_phase;
              let selectevaluation_phase=[]
              for(var j=0;j<response.data.evaluations_list.length;j++){
                    if(evaluation_phase_list[i].evaluation_id===evaluations_list[j].id){
                       course_select_value=evaluations_list[j].name
                    }
              }
              for(var z=0;z<newevaluation_phase.length;z++){
                selectevaluation_phase.push(newevaluation_phase[z].name)
              }
              let newObject={
                course_evaluation_id:evaluation_phase_list[i].evaluation_id,
                score:evaluation_phase_list[i].score,
                percentage: evaluation_phase_list[i].percentage,
                evaluation_subitems:evaluation_phase_list[i].evaluation_phase,
                course_select_value:course_select_value,
                selectevaluation_phase:selectevaluation_phase
              }
              newachievement_methods.push(newObject)
            }

          }
          for(var i=0; i<response.data.evaluations_list.length;i++){
                newevaluations_list.push(response.data.evaluations_list[i].name);
                newevaluation_subitems_list[response.data.evaluations_list[i].name]=[];
                for(var j=0; j<response.data.evaluations_list[i].evaluation_subitems_list.length;j++){
                  newevaluation_subitems_list[response.data.evaluations_list[i].name].push(response.data.evaluations_list[i].evaluation_subitems_list[j].name)
                }
            }
          // let newec_course_target_name="";
          // let newec_course_target_namelist=response.data.evaluations_list;
          //     for(var o=0; o<newec_course_target_namelist.length;o++){
          //       newec_course_target_name=newec_course_target_namelist[o].ec_course_target_name
          //     }
            this.setState({
              achievement_methods:newachievement_methods,
              totalevaluations_list:response.data,
              // ec_course_target_name:newec_course_target_name,
              evaluations_list:newevaluations_list,
              evaluation_subitems_list:newevaluation_subitems_list,
              newec_course_target_id:id,
              methodologytype:true,
              ec_course_target_name:response.data.ec_course_target_name,
              ismanager:true
            })

            // this.setState({
            //   // evaluations_lists: evaluation_subitems_list[evaluations_list[0]],
            //   evaluation_subitems_lists: evaluation_subitems_list[evaluations_list[0]][0]
            // })
          }
       }).catch(function (error) {
            console.log(error);
        });
    }

    handleevaluations_list=(value,keythis)=>{

      let {evaluation_subitems_list,totalevaluations_list,achievement_methods} = this.state;
      let newachievement_methods=achievement_methods;
      let newlist=new Object ();
      let location=keythis.key;
      let list=totalevaluations_list.evaluations_list;
      // 点击切换清空
        for(var z=0; z<newachievement_methods.length;z++){
            if(z===location){
                newachievement_methods[z].evaluation_subitems=[]
            }
        }
      this.setState({
        evaluations_lists: evaluation_subitems_list[value],
        evaluation_subitems_lists: evaluation_subitems_list[value][0],
         achievement_methods:newachievement_methods
      });



      if(newachievement_methods.length===0){
          for(var i=0; i<list.length;i++){
            if(list[i].name===value){
              newlist.course_evaluation_id=list[i].id
            }
          }
          newachievement_methods.push(newlist)
      }else if(newachievement_methods.length>0){
          if(newachievement_methods[location]===undefined){
              newachievement_methods.push(newlist)
          }
          for(var i=0; i<list.length;i++){
            if(list[i].name===value){
              newachievement_methods[location].course_evaluation_id=list[i].id
              newachievement_methods[location].course_select_value=value
              newachievement_methods[location].selectevaluation_phase=[]
            }
          }
      }

      this.setState({
        achievement_methods: newachievement_methods
      });

    }
    handevaluation_subitems_list=(value,keynum)=>{
      let{totalevaluations_list,achievement_methods}=this.state;
      let newachievement_methods=[];
      let id;
      if(value.length>0){

        newachievement_methods=achievement_methods
        for(var j=0; j<value.length;j++){
          if(!isNaN(keynum[j].key)){
            id=keynum[j].key
          }
        }

        let list=[];

        for(var k=0; k<value.length;k++){

          for(var i=0; i<totalevaluations_list.evaluations_list.length;i++){
            let newlist=totalevaluations_list.evaluations_list[i].evaluation_subitems_list;
            for(var z=0; z<newlist.length; z++){
                  if(value[k]===newlist[z].name){
                    let Objectlist=new Object ();
                    Objectlist.id=newlist[z].id;
                    // Objectlist.name=newlist[z].name;
                    Objectlist.position=newlist[z].position;
                    list.push(Objectlist)
                  }
            }
          }
         }
      newachievement_methods[id].evaluation_subitems=list;
      newachievement_methods[id].selectevaluation_phase=value;
       this.setState({
        evaluation_subitems_lists: value,
        achievement_methods:newachievement_methods
      });

      }
    }

    handevaluation_Addlist=(value,keynum)=>{
      let id=parseInt(keynum.key);
      let{achievement_methods}=this.state;
      let newachievement_methods=achievement_methods;
      for(var i=0; i<newachievement_methods.length;i++){
          if(isNaN(id)){
              for(var j=0; j< newachievement_methods[i].evaluation_subitems.length; j++){
                  if(newachievement_methods[i].evaluation_subitems[j].name===value){
                      newachievement_methods[i].evaluation_subitems.splice(j,1);
                      newachievement_methods[i].selectevaluation_phase.splice(j,1);
                  }
              }
          }else{
              if(id===i){
                  newachievement_methods[i].evaluation_subitems.splice(i,1);
                  newachievement_methods[i].selectevaluation_phase.splice(i,1);
              }
          }
      }
      this.setState({
        achievement_methods:newachievement_methods
      })
    }


    handevaluation_CourseScore=(e)=>{
      let {achievement_methods} = this.state;
      let newachievement_methods=achievement_methods;
      let id=e.target.id;
      var value=parseFloat(e.target.value);
      for(var i=0; i<newachievement_methods.length;i++){
        newachievement_methods[id].score=value
      }
      this.setState({
        achievement_methods:newachievement_methods
      })
    }
    handevaluation_CoursePercentag=(e)=>{
      let {achievement_methods} = this.state;
      let newachievement_methods=achievement_methods;
      let id=e.target.id;
      let value=parseFloat(e.target.value);

        if(value>100){
        // message.warning('占比请输入0~100的数');
        this.setState({
            Modallists:'占比请输入0~100的数',
            meweacoursetype:true,
            newshowredvalue:true
        })
        value=100
      }

        if(value<0){
            // message.warning('占比请输入0~100的数');
            this.setState({
                Modallists:'占比不能小于0',
                meweacoursetype:true,
                newshowredvalue:true
            })
            value=0
        }

        if(value===""||value===null||value===undefined){
            // message.warning('占比请输入0~100的数');
            this.setState({
                Modallists:'占比不能为空',
                meweacoursetype:true,
                newshowredvalue:true
            })
            value=0
        }

      for(var i=0; i<newachievement_methods.length;i++){
        newachievement_methods[id].percentage=value
      }
      this.setState({
        achievement_methods:newachievement_methods
      })
    }

    Addhandevaluation=(e)=>{
      let {achievement_methods} = this.state;
      let newachievement_methods=achievement_methods;
      let newlist=new Object ();
      newachievement_methods.push(newlist);
      this.setState({
        achievement_methods:newachievement_methods
     });
    }
    Delethandevaluation=(e)=>{
      let {achievement_methods} = this.state;
      let id =e.target.getAttribute("index");
      let newachievement_methods=achievement_methods;
      newachievement_methods.splice(id,1);
      this.setState({
        achievement_methods:newachievement_methods
     });
    }


    EvaluationsSaveonloadgetdata=(id)=>{
			const course_id = 706;
      const url = `/ec_courses/${course_id}/course_targets/with_achievement_methods.json`;
      axios.get(url, {
            withCredentials: true,
          })
        .then((response)=>{
          this.setState({
            achievement_list:response.data.course_targets,
            spinningstate:false,
            ismanager:true
          })

       }).catch(function (error) {
            console.log(error);
            this.setState({
              spinningstate:false
            })
        });


     }
     ecrestoration=()=>{
      this.setState({
        buttomSaveCourseEvaluationsbottom:this.SaveCourseEvaluationsbottom
       })
     }

    SaveCourseEvaluationsbottom=()=>{
      let ec_course_id=this.props.match.params.ec_course_id;
        this.setState({
          buttomSaveCourseEvaluationsbottom:'',
          percentagetype:true
        })
      let {newec_course_target_id,achievement_methods} = this.state;


      for(var j=0; j<achievement_methods.length;j++){
        if(achievement_methods[j].course_evaluation_id===undefined){
          // message.error('提交失败！请选择该目标评价环节');
            this.setState({
                Modallists:'提交失败,评价环节不能为空',
                meweacoursetype:true,
                eacoursesavetypes:true
            })
          this.ecrestoration();
          return;
        }

        if(achievement_methods[j].evaluation_subitems===undefined){
          // message.error('提交失败！请选择支撑项');
            this.setState({
                Modallists:'提交失败,支撑项内容不能为空',
                meweacoursetype:true,
                eacoursesavetypes:true
            })
          this.ecrestoration();
          return;
        }
        if(achievement_methods[j].score===undefined||achievement_methods[j].score===NaN||achievement_methods[j].score===null){
          // message.error('提交失败！请填写支撑分数！');
            this.setState({
                Modallists:'提交失败,支撑分数不能为空',
                meweacoursetype:true,
                eacoursesavetypes:true
            })
          this.ecrestoration();
          return;
        }

        if(achievement_methods[j].percentage===undefined||achievement_methods[j].percentage===NaN||achievement_methods[j].percentage===null){
          // message.error('提交失败！请填写占比！');
            this.setState({
                Modallists:'提交失败,占比不能为空',
                meweacoursetype:true,
                eacoursesavetypes:true,
                newshowredvalue:true
            })
          this.ecrestoration();
          return;
        }


      }

      let percentagenum=0;
      for(var o=0;o<achievement_methods.length;o++){
        percentagenum=percentagenum+achievement_methods[o].percentage;
      }
      if(percentagenum>100){
        // message.error('提交失败！支撑占比不能超过总和100%');
          this.setState({
              Modallists:'提交失败,支撑占比不能超过总和100%',
              meweacoursetype:true,
              newshowredvalue:true,
              percentagetype:true
          })
        this.setState({
          buttomSaveCourseEvaluationsbottom:this.SaveCourseEvaluationsbottom
         })
        return
      }
      if(percentagenum<100){
        // message.error('提交失败！支撑占比不能超过总和100%');
          this.setState({
              Modallists:'提交失败,支撑占比总和要等于100%',
              meweacoursetype:true,
              newshowredvalue:true,
              percentagetype:true
          })
        this.setState({
          buttomSaveCourseEvaluationsbottom:this.SaveCourseEvaluationsbottom
         })
        return
      }
      for(var i=0;i<achievement_methods.length;i++){
        if(JSON.stringify(achievement_methods[i])==="{}"){
          achievement_methods.splice(i,1);
        }else{
          delete achievement_methods[i].course_select_value;
          delete achievement_methods[i].selectevaluation_phase;
          for(var j=0; j< achievement_methods[i].evaluation_subitems.length;j++){
            delete achievement_methods[i].evaluation_subitems[j].evaluation_subitem_id;
            delete achievement_methods[i].evaluation_subitems[j].name;
          }
        }
      }


      // var Url = '/ec_course_achievement_methods/create_evaluation_methods';
      var Url = '/ec_courses/:course_id/course_targets/:target_id/course_achievement_methods.json';

      axios.post(Url, {
        ec_course_target_id: newec_course_target_id,
        achievement_methods:achievement_methods
      },
      {
        withCredentials: true
      }
      ).then((response) => {
        if(response.data.status===0){
            this.setState({
              target_id:null,
              newec_course_idbottom:response.data.ec_course_id,
              buttomSaveCourseEvaluationsbottom:this.SaveCourseEvaluationsbottom,
              // Modallists:response.data.message,
              // eacoursetype:true,
              Modallists:' ',
              meweacoursetype:false,
              achievement_methods:undefined,
              eacoursesavetypes:false,
              newshowredvalue:false,
              ismanager:true
            })
            // $("#ecCourseEvaluationsbottomsubmit").hide();
            // $("#SystemParametersbottom").hide();
            this.EvaluationsSaveonloadgetdata(response.data.ec_course_id);
            this.getNavigationData(ec_course_id);

        }else if(response.data.status===-1){
           this.setState({
            buttomSaveCourseEvaluationsbottom:this.SaveCourseEvaluationsbottom,
            Modallists:response.data.message,
            eacoursetype:true,
           })
        }
      }).catch((error) => {
        console.log(error)
      })
    }
    CancelecCourseEvaluationsbottom=()=>{
      this.setState({
        achievement_methods:undefined,
        target_id:null,
        methodologytype:false,
        Modallists:' ',
        meweacoursetype:false,
        eacoursesavetypes:false,
        newshowredvalue:false,
        percentagetype:false
      })
      // $("#ecCourseEvaluationsbottomsubmit").hide();
      // $("#SystemParametersbottom").hide();
      this.getec_course_achievement_methods();
    }

    selectsonFocuslist=(e,key)=>{
       let value =e.course_select_value;
       let {evaluation_subitems_list,totalevaluations_list,achievement_methods} = this.state;
       let newachievement_methods=achievement_methods;
       let newlist=new Object ();
       let location=key;
       let list=totalevaluations_list.evaluations_list;
       this.setState({
         evaluations_lists: evaluation_subitems_list[value],
         evaluation_subitems_lists: evaluation_subitems_list[value][0]
       });

       if(newachievement_methods.length===0){
           for(var i=0; i<list.length;i++){
             if(list[i].name===value){
               newlist.course_evaluation_id=list[i].id
             }
           }
           newachievement_methods.push(newlist)
       }else if(newachievement_methods.length>0){
           if(newachievement_methods[location]===undefined){
               newachievement_methods.push(newlist)
           }
           for(var i=0; i<list.length;i++){
             if(list[i].name===value){
               newachievement_methods[location].course_evaluation_id=list[i].id
             }
           }
       }

       this.setState({
         achievement_methods: newachievement_methods
       });
    }

    hidemodeleacourse=()=>{
        this.setState({
            eacoursetype:false
        })
    }
  	render() {
      const Option = Select.Option;
      let {schooldata,achievement_list,spinningstate,evaluations_list,evaluations_lists,newec_course_target_id,achievement_methods,ec_course_target_name,buttomSaveCourseEvaluationsbottom,sequenceid,target_id,
          titlemessages,
          Modallists,
          eacoursetype,
          eacoursesavetypes,
          methodologytype,
          newec_course_idbottom,
          meweacoursetype,
          percentagetype,
          ismanager
      } = this.state;
      // console.log("EcCourseEvaluationsbottom12345");
      // console.log(achievement_list);
	    return (
        <div className="newMain clearfix">
          <div className="educontent mb50">
              <Modal
                  title={titlemessages}
                  // visible={modeldelet===true&&listid===list.id?true:false}
                  visible={eacoursetype}
                  className={"ecmodeldelet"}
                  closable={false}
                  footer={null}
              >
                  <div className="task-popup-content"  >
                      <div className="task-popup-text-center font-14">{Modallists}</div>
                  </div>
                  <div className="task-popup-submit clearfix">
                      <a onClick={this.hidemodeleacourse} className="task-btn fl">取消</a>
                      <a  className="task-btn task-btn-orange fr"
                          onClick={this.hidemodeleacourse}
                      >确定</a>
                  </div>
              </Modal>

              {/*导航*/}
              {/*<div className="edu-back-white eacourse">*/}

                  {/*<p className="clearfix padding20-30 bor-bottom-greyE" id="SystemParametersP">*/}
                      {/*<a href={schooldata.course_setting_url} className="TrainingLecturer color-grey-9">课程列表 > </a>*/}
                      {/*<a className="TrainingTheory major_name"> {schooldata.ec_course_name} 课程考核方式与数据来源</a>*/}
                      {/*/!* <span className="fl font-18 courseSystem"></span> *!/*/}
                      {/*/!* <a href="javascript:void(0)" className="fr white-btn edu-blueback-btn mt4">导出培养目标</a> *!/*/}
                      {/*<span className="Importclassroomdata" style={{top: '22px'}}><a className="white-btn edu-blueback-btn fr mb10 mr10">导出策略</a></span>*/}
                  {/*</p>*/}

                  {/*<div className="padding20-30" id="SystemParameters">*/}
                      {/*<span className="fl SystemParameters">课程考核标准</span>*/}
                      {/*<span className="fl ml20 SystemParameters">（请在完成配置后，使用各项成绩导入模板，将本学年所有参与的学生成绩数据导入系统）</span>*/}
                      {/*<span className="fr ml20 SystemParameters" style={{display:course_name===null||course_name===undefined?"none":"block",height:'37px'}}><span className="ecblock">在线课堂:</span><a href={course_url} target="_blank" className="ecnowrap" data-tip-down={course_name}>{course_name}</a></span>*/}
                      {/*<span className="Importclassroomdata" style={{display:course_name===null||course_name===undefined?"none":"block"}}><a onClick={this.sync_course_data} className="white-btn edu-orangeback-btn  fr mt2 mr10">导入课堂数据</a></span>*/}
                  {/*</div>*/}

              {/*</div>*/}
              {/*<EcTitleCourseEvaluations*/}
              {/*    {...this.props}*/}
              {/*    schooldata={schooldata}*/}
              {/*    ecpath={"show"}*/}
              {/*/>*/}

                {/*<div className="edu-back-white eacourse">*/}

                {/*    <p className="clearfix padding20-30 bor-bottom-greyE" id="SystemParametersP">*/}
                {/*        <a href={schooldata.course_setting_url} className="TrainingLecturer color-grey-9">课程体系 </a> >*/}
                {/*        <a className="TrainingTheory major_name"> {schooldata.ec_course_name} </a>*/}
                {/*        <div className="color-grey-9 mr10">请结合本课程的教学情况，修改说明每个课程目标的评价环节和评估方式  <a className={"color-blue"} onClick={() => window.elasticLayer(3533)}>查看详情</a></div>*/}

                {/*      /!*课程考核方式与数据来源*!/*/}
                {/*        /!* <span className="fl font-18 courseSystem"></span> *!/*/}
                {/*        /!* <a href="javascript:void(0)" className="fr white-btn edu-blueback-btn mt4">导出培养目标</a> *!/*/}
                {/*        <span className="Importclassroomdata" style={{top: '22px'}}>*/}
                {/*           <a className="white-btn edu-blueback-btn fr mb10 mr10" target="_blank" href={'/ec_courses/'+newec_course_idbottom+'/export_ec_course_targets?format=xls'}>导出评价方法</a>*/}
                {/*        </span>*/}
                {/*    </p>*/}

                {/*    <div className="padding20-30" id="SystemParameters">*/}
                {/*      /!*<span className="fl SystemParameters">课程目标达成方法</span>*!/*/}
                {/*        <a className="fl SystemParameters color4D4D4D" style={{display:schooldata.ec_course_support_setting_url===null?"none":"block",marginLeft: '9px' }}*/}
                {/*           href={schooldata.ec_course_support_setting_url}>1.课程目标</a>*/}
                {/*        <a className="fl ml40 SystemParameters4CACFF color4D4D4D"*/}
                {/*           style={{display:schooldata.ec_course_reach_setting_url===null?"none":"block"}}*/}
                {/*           href={schooldata.ec_course_reach_setting_url}>2.课程考核方式与数据来源</a>*/}
                {/*        <a className="fl SystemParameters4CACFF ml40 color4D4D4D"*/}
                {/*          href={schooldata.score_level_setting_url}*/}
                {/*        >3.成绩等级设置</a>*/}
                {/*        <a className="fl ml40 SystemParameters4CACFF color4CACFF"*/}
                {/*           style={{display:schooldata.evaluation_methods_url===null?"none":"block"}}*/}
                {/*           href={schooldata.evaluation_methods_url}>4.课程目标评价方法</a>*/}
                {/*        <a className="fl SystemParameters ml40 color4D4D4D"*/}
                {/*           style={{display:schooldata.competition_calculation_info_url===null?"none":"block"}}*/}
                {/*           href={schooldata.competition_calculation_info_url}>5.课程达成评价结果</a>*/}
                {/*      <span className="fr ml20 SystemParameters" style={{color: '#989898'}}>（各环节平均得分*占比）之和/（各环节总分*占比）之和</span>*/}
                {/*    </div>*/}

                {/*</div>*/}

                <div className="ListTableLine newSystem" id="school_major_list">

                        <p className="clearfix Coursetitle" style={{width:"1200px"}}>
                          <span className="column-1 color-666">课程目标</span>
                          <span className="column-1 color-666">评价环节</span>
                          <span className="column-1 ml15 color-666">数据内容</span>
                          <span className="column-1 operationright color-666 f5f5f5"
                          >
                             操作 
                          </span>
                          <span className="column-1 ml30 operationright color-666">评价占比</span>
                          <span className="column-1 ml15 operationright color-666">支撑总分值</span>
                        </p>

                        {
                          achievement_list===undefined?"":achievement_list&&achievement_list.length===0?<Spin spinning={spinningstate} className="Spinlarge"  indicator={<Icon type="loading" style={{ fontSize: 30 }} spin />}/>:achievement_list&&achievement_list.map((item,key)=>{
                            return(
                                    <div key={key} >
                                    {
                                      item.course_achievement_methods.length===0?
                                      <li key={key} className="clearfix" >
                                          <div  style={{ width:'99.8%'}} className={"yslpadding"} style={{display:parseInt(target_id)===item.id?"none":"block"}}>
                                              <span className="column-1 mt4 textaligncenters"><span>{key+1}</span></span>
                                          <span>
                                          <span className="column-1 textaligncenters mt4">
                                                <span></span>
                                          </span>
                                          <span className="column-1 ml15 textaligncenters color99 mt4 newtextaligncenter evaluationdataClassy">
                                                          <span></span>
                                          </span>
                                          <span className="column-1 operationright mt4">
                                              <div className="operationColumn">
                                                  <div className="right operationalter nulleditSubentry" style={{display:ismanager===false?'none':'block'}}>
                                                      <a className="mr16 editSubentry" data-tip-down="编辑" ><i target_id={item.id}  name={key} onClick={this.editecCourseEvaluationslist.bind(this)} className="iconfont icon-bianjidaibeijing color-green" ></i></a>
                                                </div>
                                              </div>
                                          </span>


                                          <span className="column-1  operationright mt4 percentages">
                                              <div></div>
                                          </span>

                                          <span className="column-1 mr20 operationright mt4">
                                              <div className="ColorF68"></div>
                                          </span>

                                          </span>
                                          </div>

                                          {/* 修改start*/}
                                          <div className="ListTableLine newSystem" id="EvaluationsList">
                                              <div style={{display:parseInt(target_id)===item.id?"block":"none"}} >
                                                  {/* <div className="edu-back-white eacourse" id="SystemParametersbottom" style={{display:parseInt(sequenceid)===key?"block":"none"}}> */}
                                                  <div className="edu-back-white eacourse" id="SystemParametersbottom" style={{display:parseInt(target_id)===item.id?"block":"none"}}>
                                                      <div className="padding20-30" id="SystemParameters" style={{paddingLeft:'0px'}}>
                                                          {/* <span className="fl SystemParameters">课程目标{sequenceid}：{ec_course_target_name}</span> */}
                                                          <span className="fl SystemParameters">课程目标{key+1}：{ec_course_target_name}</span>
                                                      </div>
                                                  </div>
                                                  {
                                                      achievement_methods===undefined?" ":achievement_methods.map((item,itemkey)=>{
                                                          return(
                                                              <div key={itemkey} className="clearfix editorModify"  >
                                                                  <div className="">
                                                                      <span className="column-1 mr12" style={{paddingLeft:'0px'}}>评价环节</span>
                                                                      <Select
                                                                          // className={item.course_select_value===undefined&&eacoursesavetypes===true? "inputWeight  bor-red": "inputWeight"}
                                                                          className={item.course_select_value===undefined&&eacoursesavetypes===true?Modallists==='提交失败,评价环节不能为空'?"inputWeight  bor-red":"inputWeight": "inputWeight"}

                                                                          placeholder="请选择该目标的评价环节"
                                                                          size="large"
                                                                          style={{ width: '20%' }}
                                                                          value={item.course_select_value}
                                                                          onChange={this.handleevaluations_list.bind(this)}
                                                                      >
                                                                          {evaluations_list.map(province => <Option value={province} key={itemkey}>{province}</Option>)}

                                                                      </Select>

                                                                      <span className="column-1 mr13"></span>

                                                                      <Select
                                                                          mode="multiple"
                                                                          // className={item.selectevaluation_phase===undefined&&eacoursesavetypes===true? "inputWeight  bor-red": "inputWeight"}
                                                                          className={item.selectevaluation_phase===undefined&&eacoursesavetypes===true?Modallists==='提交失败,支撑项内容不能为空'?"inputWeight bor-red":"inputWeight": "inputWeight"}

                                                                          placeholder="请选择具体数据内容"
                                                                          size="large"
                                                                          id="Coursemultiple"
                                                                          style={{ width: '37%' }}
                                                                          onChange={this.handevaluation_subitems_list.bind(this)}
                                                                          onDeselect={this.handevaluation_Addlist.bind(this)}
                                                                          value={item.selectevaluation_phase}
                                                                          onFocus={()=>this.selectsonFocuslist(item,itemkey)}
                                                                      >
                                                                          {evaluations_lists.map(city => <Option value={city} key={itemkey}>{city}</Option>)}
                                                                      </Select>

                                                                      <span className="column-1 mr14"></span>
                                                                      <Input size="large"  type="number" value={item.score}
                                                                             className={item.score===undefined&&eacoursesavetypes===true?Modallists==='提交失败,支撑分数不能为空'?"bor-red": "": ""}
                                                                             onInput={this.handevaluation_CourseScore.bind(this)} id={itemkey} style={{ width: '11%' }} placeholder="请输入支撑分数"/>
                                                                      <span className="column-1 ml5 mr10">分</span>
                                                                      <Input size="large" type="number"   value={item.percentage}
                                                                             className={item.percentage===undefined&&eacoursesavetypes===true||item.percentage>100&&eacoursesavetypes===true||percentagetype===true?"bor-red": ""}
                                                                             onInput={this.handevaluation_CoursePercentag.bind(this)}  id={itemkey} style={{ width: '11%' }}  placeholder="请输入占比"/>
                                                                      <span className="column-1 ml5 mr10">%</span>
                                                                      <span className="buttoninline SetTheAssociated"  style={{marginLeft:'10px'}}>
                                                                                    <div className="left operatebutton" style={{display:ismanager===false?'none':'block'}}>
                                                                                        <a className="mr15 delSubentry" style={{display:itemkey===0?'none':'inline-block'}}>
                                                                                            <Tooltip placement="bottom" title="删除">
                                                                                                <i className="iconfont icon-shanchu color-grey-c  font-17" index={itemkey} onClick={this.Delethandevaluation.bind(this)}></i>
                                                                                            </Tooltip>
                                                                                        </a>
                                                                                        <a className="newAddSubentry" data-tip-down="添加"
                                                                                          style={{ display:itemkey===achievement_methods.length-1?'inline-block':'none'}}
                                                                                        ><i className="iconfont icon-tianjiafangda color-green" index={itemkey} onClick={this.Addhandevaluation.bind(this)}></i></a>
                                                                                    </div>
                                                                            </span>
                                                                  </div>
                                                                  <br />
                                                              </div>
                                                          )
                                                      })
                                                  }
                                                  <span className="c_red none ml30" id="error_tip" style={{display:meweacoursetype===true?'inline-block':'none'}}>{Modallists}</span>
                                                  <div className="right editglybuttonbox mb10" id="ecCourseEvaluationsbottomsubmit"  style={{display:parseInt(target_id)===item.target_id?"block":"none"}} >
                                                      <div className="defalutSubmitbtn fr" onClick={buttomSaveCourseEvaluationsbottom}>保存</div>
                                                      <div className="defalutCancelbtn fr mr20" onClick={this.CancelecCourseEvaluationsbottom}>取消</div>
                                                  </div>
                                              </div>
                                          </div>
                                          {/* 修改end*/}


                                      
                                      </li>
                                      :item.course_achievement_methods.map((i,k)=>{
                                            return(
                                              <li key={key} className={achievement_list&&achievement_list.length-1===key?item.course_achievement_methods.length-1===k?"clearfix yslinitials ":" yslinitials bordereaeaea clearfix":item.course_achievement_methods.length-1===k?" yslinitials bordereaeaeas clearfix":" yslinitials bordereaeaea clearfix" } style={{display:parseInt(target_id)===item.target_id&&methodologytype===true?item.course_achievement_methods.length-1===k?'block':"none":"block"}}>
                                              <div  style={{ width:'99.8%'}}  className={"yslpadding"} style={{display:parseInt(target_id)===item.target_id&&methodologytype===true?"none":"block"}} >
                                                  <span className="column-1 mt4 textaligncenters">{key-k===key?key+1:""}</span>
                                              <span>
                                              <span className="column-1 textaligncenters mt4 ">
                                                     {i.course_evaluation.name}
                                              </span>
                                              <span className="column-1 ml15 textaligncenters color99 mt4 newtextaligncenter  evaluationdataClassy" >
                                                  {
                                                    i.course_evaluation_subitems.map((y,e)=>{
                                                      return(
                                                              <div key={y} >{y.name+"  "} </div>
                                                      )
                                                    })
                                                  }
                                              </span>
                                              {
                                                key-k===key?<span className="column-1 operationright mt4">
                                                  <div className="operationColumn">
                                                      <div className="right operationalter neweditSubentry" style={{display:ismanager===false?'none':'block'}}>
                                                          <a className="mr20 editSubentry" data-tip-down="编辑" ><i target_id={item.target_id} name={key} onClick={this.editecCourseEvaluationslist.bind(this)} className="iconfont icon-bianjidaibeijing color-green" ></i></a>
                                                      </div>
                                                  </div>
                                              </span>:
                                                <span className="column-1 operationright mt4">
                                                    <div className="operationColumn">
                                                        <div className="left operationalter neweditSubentry">
                                                            <a className="mr20 editSubentry"></a>
                                                      </div>
                                                    </div>
                                                </span>
                                              }


                                              <span className="column-1  operationright mt4 percentages">
                                                  <div>{i.percentage+"%"}</div>
                                              </span>

                                              <span className="column-1 mr20 operationright mt4">
                                                  <div className="ColorF68">{i.score}</div>
                                              </span>

                                              </span>
                                              </div>
                                                  {/* 修改start*/}
                                                  <div className="ListTableLine newSystem" id="EvaluationsList">
                                                      <div style={{display:parseInt(target_id)===item.target_id&&item.course_achievement_methods.length-1===k?"block":"none"}} >
                                                          <div className="edu-back-white eacourse" id="SystemParametersbottom" style={{display:parseInt(target_id)===item.target_id&&item.course_achievement_methods.length-1===k?"block":"none"}}>
                                                              <div className="padding20-30" id="SystemParameters" style={{paddingLeft:'0px'}}>
                                                                  {/* <span className="fl SystemParameters">课程目标{sequenceid}：{ec_course_target_name}</span> */}
                                                                  <span className="fl SystemParameters">课程目标{key+1}：{ec_course_target_name}</span>
                                                              </div>
                                                          </div>
                                                          {
                                                              achievement_methods===undefined?" ":achievement_methods.map((item,itemkey)=>{
                                                        
                                                                  return(
                                                                      <div key={itemkey} className="clearfix editorModify"  >
                                                                          <div className="">
                                                                              <span className="column-1 mr12" style={{
                                                                                    paddingLeft: '0px'
                                                                              }}>评价环节</span>
                                                                              <Select
                                                                                  className={item.course_select_value===undefined&&eacoursesavetypes===true?Modallists==='提交失败,评价环节不能为空'?"inputWeight  bor-red":"inputWeight": "inputWeight"}

                                                                                  placeholder="请选择该目标的评价环节"
                                                                                  size="large"
                                                                                  style={{ width: '20%' }}
                                                                                  value={item.course_select_value}
                                                                                  onChange={this.handleevaluations_list.bind(this)}
                                                                              >
                                                                                  {evaluations_list.map(province => <Option value={province} key={itemkey}>{province}</Option>)}

                                                                              </Select>

                                                                              <span className="column-1 mr13"></span>

                                                                              <Select
                                                                                  mode="multiple"
                                                                                  className={item.selectevaluation_phase===undefined&&eacoursesavetypes===true?Modallists==='提交失败,支撑项内容不能为空'?"inputWeight bor-red":"inputWeight": "inputWeight"}

                                                                                  placeholder="请选择具体支撑项"
                                                                                  size="large"
                                                                                  id="Coursemultiple"
                                                                                  style={{ width: '37%' }}
                                                                                  onChange={this.handevaluation_subitems_list.bind(this)}
                                                                                  onDeselect={this.handevaluation_Addlist.bind(this)}
                                                                                  value={item.selectevaluation_phase}
                                                                                  onFocus={()=>this.selectsonFocuslist(item,itemkey)}
                                                                              >
                                                                                  {evaluations_lists.map(city => <Option value={city} key={itemkey}>{city}</Option>)}
                                                                              </Select>

                                                                              <span className="column-1 mr14"></span>
                                                                              <Input size="large"  type="number"
                                                                                     value={item.score}
                                                                                     className={item.score===undefined&&eacoursesavetypes===true?Modallists==='提交失败,支撑分数不能为空'?"bor-red": "": ""}
                                                                                     onInput={this.handevaluation_CourseScore.bind(this)} id={itemkey} style={{ width: '11%' }} placeholder="请输入支撑分数"/>
                                                                              <span className="column-1 ml5 mr10">分</span>
                                                                              <Input size="large" type="number"
                                                                                     value={item.percentage}
                                                                                     className={item.percentage===undefined&&eacoursesavetypes===true||item.percentage>100&&eacoursesavetypes===true||percentagetype===true?"bor-red": ""}
                                                                                     onInput={this.handevaluation_CoursePercentag.bind(this)}
                                                                                     id={itemkey} style={{ width: '11%' }}
                                                                                     placeholder="请输入占比"/>
                                                                              <span className="column-1 ml5 mr10">%</span>
                                                                              <span className="buttoninline SetTheAssociated" style={{marginLeft:'10px'}}>
                                                                                    <div className="left operatebutton" style={{display:ismanager===false?'none':'block'}}>
                                                                                        <a className="mr15 delSubentry" style={{display:achievement_methods.length===1?'none':'inline-block'}}>
                                                                                            <Tooltip placement="bottom" title="删除">
                                                                                                <i className="iconfont icon-shanchu color-grey-c  font-17" index={itemkey} onClick={this.Delethandevaluation.bind(this)}></i>
                                                                                            </Tooltip>
                                                                                        </a>
                                                                                        <a className="newAddSubentry" data-tip-down="添加"
                                                                                           style={{ display:itemkey===achievement_methods.length-1?'inline-block':'none'}}
                                                                                        ><i className="iconfont icon-tianjiafangda color-green" index={itemkey} onClick={this.Addhandevaluation.bind(this)}></i></a>
                                                                                    </div>
                                                                            </span>
                                                                          </div>
                                                                          <br />
                                                                      </div>
                                                                  )
                                                              })
                                                          }
                                                          <span className="c_red none ml30" id="error_tip" style={{display:meweacoursetype===true?'inline-block':'none'}}>{Modallists}</span>
                                                          <div className="right editglybuttonbox mb10" id="ecCourseEvaluationsbottomsubmit"  style={{display:parseInt(target_id)===item.target_id?"block":"none"}}>
                                                              <div className="defalutSubmitbtn fr" onClick={buttomSaveCourseEvaluationsbottom}>保存</div>
                                                              <div className="defalutCancelbtn fr mr20" onClick={this.CancelecCourseEvaluationsbottom}>取消</div>
                                                          </div>
                                                      </div>
                                                  </div>
                                                  {/* 修改end*/}

                                              </li>

                                            )

                                      })
                                    }
                            </div>
                              )
                            })
                          }
              </div>

             </div>
         </div>
	    );
  	}
}

export default SnackbarHOC() (EcCourseEvaluationsbottom);