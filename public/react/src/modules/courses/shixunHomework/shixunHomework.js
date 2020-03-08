import React,{ Component } from "react";
import { Input,Checkbox, Pagination,Menu,Spin } from "antd";
import { WordsBtn,on, trigger ,publicSearchs} from 'educoder';
import {Link} from 'react-router-dom';
import axios from'axios';
import HomeworkModal from "../coursesPublic/HomeworkModal";

import NewShixunModel from '../coursesPublic/NewShixunModel';
import AddcoursesNav from "../coursesPublic/AddcoursesNav";
import Modals from '../../modals/Modals';
import moment from 'moment';
import '../css/members.css';
import '../css/busyWork.css'
import ShixunhomeWorkItem from "./ShixunhomeWorkItem";
import NoneData from "../coursesPublic/NoneData";

class ShixunHomework extends Component{
  constructor(props){
    super(props);
    this.state={
      modalname:undefined,
      modaltype:undefined,
      visible:false,
      Topval:undefined,
      Topvalright:undefined,
      Botvalleft:undefined,
      Botval:undefined,
      starttime:undefined,
      endtime:undefined,
      Cancelname:undefined,
      Savesname:undefined,
      Cancel:undefined,
      Saves:undefined,
      StudentList_value:undefined,
      addname:undefined,
      addnametype:false,
      addnametab:undefined,
      addcanner:undefined,
      addsave:undefined,
      datas:undefined,
      page:1,
      Coursename:"",
      order:undefined,
			orders:"8",
      shixunmodal:false,
      shixunmodallist:undefined,
      hometypepvisible:false,
      newshixunmodallist:undefined,
      category_id:undefined,
      homework_ids:undefined,
      patheditarry:[],
      course_groups:undefined,
      course_groupslist:[],
      checkedtype:false,
      checkBoxValues:[],
      isSpin:false,
			antIcon:false
    }
  }
	updateNavSuccess=()=>{
		this.setState({
			isSpin:true
		})
		if(this.props.match.params.main_id){
			this.setState({
				isSpin:true
			})
			this.seactall();
			if(this.props.isAdmin()===true){
				this.updadatalist()
			}

		}else if(this.props.match.params.category_id){
			this.setState({
				isSpin:true
			})
			this.seactall(parseInt(this.props.match.params.category_id))
			if(this.props.isAdmin()===true){
				this.updadatalist()
			}
		}
	}
  componentDidMount() {
		this.setState({
			isSpin:true,

		})
		if(this.props.match.params.main_id){
			this.setState({
				isSpin:true,
				checkedtype:false,
				order:undefined,
				orders:"8",
				page:1,
			})
			this.seactall();
			if(this.props.isAdmin()===true){
				this.updadatalist()
			}

		}else if(this.props.match.params.category_id){
			this.setState({
				isSpin:true,
				checkedtype:false,
				order:undefined,
				orders:"8",
				page:1
			})
			this.seactall(parseInt(this.props.match.params.category_id))
			if(this.props.isAdmin()===true){
				this.updadatalist()
			}
		}
		on('updateNavSuccess', this.updateNavSuccess)
  }
  seactall=(id)=>{
   this.setState({
     isSpin:true,
		 checkBoxValues:[]
   })
    let coursesId=this.props.match.params.coursesId;
    let url="/courses/"+coursesId+"/homework_commons.json?type=4";

    axios.get(encodeURI(url),{
      params: {
        search:undefined,
        page:1,
        order:undefined,
        category:id
      }
    }).then((result)=>{
    	if(result!=undefined){
				this.setState({
					isSpin:false,
					datas:result.data,
				})
			}else{
				this.setState({
					isSpin:false,
				})
			}
    }).catch((error)=>{
      console.log(error);
    })
  }

  componentDidUpdate = (prevProps) => {

    if(prevProps.match.params.main_id != this.props.match.params.main_id){
      if(this.props.match.params.main_id!=undefined){
      	this.setState({
					checkedtype:false,
					orders:"8",
					order:undefined,
					page:1
				})
        this.seactall();
      }
    }
    if(prevProps.match.params.category_id != this.props.match.params.category_id){
      if(this.props.match.params.category_id!=undefined){
				this.setState({
					checkedtype:false,
					orders:"8",
					order:undefined,
					page:1
				})
        this.seactall(parseInt(this.props.match.params.category_id))
      }
    }

  }

  homeworkupdatalist=(search,page,order)=>{
    let {datas}=this.state;
    // let newhomework_idsval=checkBoxValues;
    let coursesId=this.props.match.params.coursesId;
    let category_id=this.props.match.params.category_id
    let url="/courses/"+coursesId+"/homework_commons.json?type=4";
    let neworder=order;
    if(order==="8"){
      neworder=undefined
    }

    axios.get(url, {
      params: {
        search: search,
        page:page,
        order:neworder,
        category: category_id===undefined?undefined:category_id
      }
    }).then((result)=>{
			if(result!=undefined){
				if(result.status===200){
					this.setState({
						datas:result.data,
						isSpin:false,
            page:page
					})
				}
			}else{
				this.setState({
					isSpin:false,
				})
			}
    }).catch((error)=>{
      console.log(error);
      this.setState({
        isSpin:false
      })
    })
  }

  homeworkhide=()=>{
    let {Coursename,page,order}=this.state;
    this.setState({
      modalname:undefined,
      modaltype:undefined,
      visible:false,
      Topval:undefined,
      Topvalright:undefined,
      Botvalleft:undefined,
      Botval:undefined,
      starttime:undefined,
      endtime:undefined,
      Cancelname:undefined,
      Savesname:undefined,
      Cancel:undefined,
      Saves:undefined,
      StudentList_value:undefined,
      addname:undefined,
      addnametype:false,
      addnametab:undefined,
			typs:undefined,
			starttimes:undefined,
			OneSelftype:false
    })
		this.cancelmodel()
		this.homeworkupdatalist(Coursename,page,order);
    this.props.updataleftNavfun()
  }


  //立即发布
  homeworkstart=()=>{
    let selectnum= this.testonSelect();
    if(selectnum===true){
      this.noSelect();
      return
    }
    let coursesId=this.props.match.params.coursesId;
    let url="/courses/"+coursesId+"/all_course_groups.json";

    axios.get(url).then((response) => {

      if(response.status===200){
        let starttime= this.props.getNowFormatDates(1);
        let endtime=this.props.getNowFormatDates(2);
        this.setState({
          modalname:"立即发布",
          modaltype:response.data.course_groups===null||response.data.course_groups.length===0?2:1,
          visible:true,
					typs:"start",
					Topval:"学生将立即收到作业",
          // Botvalleft:"暂不发布",
					Botval:`本操作只对"未发布"的作业有效`,
          starttime:"发布时间："+moment(moment(new Date())).format("YYYY-MM-DD HH:mm"),
					starttimes:starttime,
          endtime:"截止时间："+endtime,
          Cancelname:"暂不发布",
          Savesname:"立即发布",
          Cancel:this.homeworkhide,
          Saves:this.homeworkstartend,
          course_groups:response.data.course_groups,
        })
      }
    }).catch((error) => {
      console.log(error)
    });

  }


	//立即发布
	homeworkOneSelfstart=()=>{
		let selectnum= this.testonSelect();
		if(selectnum===true){
			this.noSelect();
			return
		}
		let coursesId=this.props.match.params.coursesId;
		let url="/courses/"+coursesId+"/all_course_groups.json";

		axios.get(url).then((response) => {

			if(response.status===200){
				let starttime= this.props.getNowFormatDates(1);
				let endtime=this.props.getNowFormatDates(2);
				this.setState({
					modalname:"立即发布",
					modaltype:response.data.course_groups===null||response.data.course_groups.length===0?2:1,
					OneSelftype:true,
					typs:"start",
					Topval:"学生将立即收到作业",
					// Botvalleft:"暂不发布",
					Botval:`本操作只对"未发布"的作业有效`,
					starttime:"发布时间："+moment(moment(new Date())).format("YYYY-MM-DD HH:mm"),
					starttimes:starttime,
					endtime:"截止时间："+endtime,
					Cancelname:"暂不发布",
					Savesname:"立即发布",
					Cancel:this.homeworkhide,
					Saves:this.homeworkstartend,
					course_groups:response.data.course_groups,
				})
			}
		}).catch((error) => {
			console.log(error)
		});

	}


  cancelmodels=()=>{
    this.setState({
      Modalstype:false,
      Loadtype:false,
      Modalstopval:""
    })
  }
  // 立即发布
  homeworkstartend=(ds,endtime)=>{
    let {Coursename,page,order,checkBoxValues,course_groupslist,datas,course_groups}=this.state;
    let category_id=this.props.match.params.category_id;
    if(course_groups.length>0){
      if(course_groupslist.length===0){
        this.setState({
          Modalstype:true,
          Loadtype:true,
          Modalstopval:"请先选择分班",
          ModalSave:this.cancelmodels,
        })
        return
      }

    }

     let coursesId=this.props.match.params.coursesId;
     let url ="/courses/"+coursesId+"/homework_commons/publish_homework.json";
      axios.post(url,{
        category_id:category_id===undefined?undefined:category_id,
        homework_ids:checkBoxValues,
        group_ids:course_groupslist,
				end_time:endtime,
      }).then((result)=>{
        if(result.status===200){
          if(result.data.status===0){
            this.setState({
              Modalstype:false,
              // Modalstopval:result.data.message,
              Loadtype:false,
              visible:false,
              course_groups:[],
              ModalSave:this.cancelmodel,
            })
          }


					this.homeworkupdatalist(Coursename,page,order);
					this.cancelmodel()
					this.props.showNotification(result.data.message)
          this.props.updataleftNavfun()

        }
      }).catch((error)=>{
        console.log(error);
      })
  }


  homeworkends=()=>{


    let selectnum= this.testonSelect();
    if(selectnum===true){
      this.noSelect();
      return
    }

    let coursesId=this.props.match.params.coursesId;
    let url="/courses/"+coursesId+"/all_course_groups.json";

    axios.get(url).then((response) => {

      if(response.status===200){
        this.setState({

        })
        this.setState({
          modalname:"立即截止",
          modaltype:response.data.course_groups===null||response.data.course_groups.length===0?2:1,
          visible:true,
					Topval:"学生将不能再提交作业",
					// Botvalleft:"暂不截止",
					Botval:`本操作只对"提交中"的作业有效`,
          Cancelname:"暂不截止",
          Savesname:"立即截止",
          Cancel:this.homeworkhide,
          Saves:this.coursetaskend,
          starttime:undefined,
          endtime:undefined,
					typs:"end",
          course_groups:response.data.course_groups,
        })
      }
    }).catch((error) => {
      console.log(error)
    });


  }

  getcourse_groupslist=(id)=>{
     this.setState({
       course_groupslist:id
     })
  }

  //立即截止确定按钮
  coursetaskend=()=>{
    let {Coursename,page,order,datas,checkBoxValues,course_groupslist,course_groups}=this.state;
    this.setState({
      Modalstype:false,
    })

    let category_id=this.props.match.params.category_id;

    if(course_groups.length>0){
      if(course_groupslist.length===0){
        this.setState({
          Modalstype:true,
          Loadtype:true,
          Modalstopval:"请先选择分班",
          ModalSave:this.cancelmodels,
        })
        return
      }

    }

    const cid = this.props.match.params.coursesId;
    let url="/courses/"+cid+"/homework_commons/end_homework.json";
    axios.post(url, {
        category_id:category_id===undefined?undefined:category_id,
        group_ids:course_groupslist,
        homework_ids: checkBoxValues,
      })
      .then((response) => {
        if (response.data.status == 0) {
          this.setState({
            Modalstype:false,
            Modalstopval:"",
            ModalsBottomval:"",
            ModalSave:this.cancelmodel,
            Loadtype:false,
            course_groups:[]
          })
					this.homeworkupdatalist(Coursename,page,order);
					this.cancelmodel()
          this.props.showNotification(response.data.message)
          this.props.updataleftNavfun()

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //发布实训，立即发布回调
  newhomeworkstart=(category_id,homework_ids)=>{

     this.setState({
       category_id:category_id,
       checkBoxValues:homework_ids,
       shixunmodal:false
     })

     let starttime= this.props.getNowFormatDates(1);
     let endtime=this.props.getNowFormatDates(2);
     let coursesId=this.props.match.params.coursesId;
     let url="/courses/"+coursesId+"/all_course_groups.json";

    axios.get(url).then((response) => {
      if(response.status===200){

        this.setState({
          modalname:"立即发布",
          course_groups:response.data.course_groups,
          modaltype:response.data.course_groups===null||response.data.course_groups.length===0?2:1,
          visible:true,
					Topval:"学生将立即收到作业",
					// Botvalleft:"暂不发布",
					Botval:`本操作只对"未发布"的作业有效`,
          starttime:"发布时间："+ moment(moment(new Date())).format("YYYY-MM-DD HH:mm"),
					starttimes:starttime,
					typs:"start",
          endtime:"截止时间："+ endtime,
          Cancelname:"暂不发布",
          Savesname:"立即发布",
          Cancel:this.homeworkhide,
          Saves:this.homeworkstartend,
        })

      }
    }).catch((error) => {
      console.log(error)
    });

  }


  // // 选用实训
  // createCommonWork=()=>{
	//
  //   this.setState({
  //     hometypepvisible:true,
  //     shixunmodal:true,
  //     patheditarry:[],
	// 		checkBoxValues:[]
  //   })
	//
	//
  // }

  // 选用实训路径
  createCommonpath=()=>{

    this.setState({
      hometypepvisible:true,
      patheditarry:[],
			checkBoxValues:[],
			shixunpath: true,
    })


  }


  hidecouseShixunModal=()=>{
    this.setState({
      shixunmodal:false,
      shixunpath:false,
      shixunpathlist:[],
      newshixunpathlist:[],
    })
  }

  // funshixunmodallist=(search,type,loading,page)=>{
  //   let{newshixunmodallist}=this.state;
  //   let newshixunmodallists=[]
  //   if(page>1){
  //     newshixunmodallists=newshixunmodallist;
  //   }
  //   this.setState({
  //     hometypepvisible:loading
  //   })
  //   let coursesId=this.props.match.params.coursesId;
  //   let url ="/courses/"+coursesId+"/homework_commons/shixuns.json";
	//
  //   axios.get(url, {
  //     params: {
  //       search: search,
  //       type:type,
  //       page:page
  //     }
  //   }).then((result)=>{
  //     if(result.status===200){
	//
  //       let  shixun_lists=result.data.shixun_lists;
  //       for(var i=0; i<shixun_lists.length;i++){
  //         newshixunmodallists.push(shixun_lists[i])
  //       }
  //       this.setState({
  //         shixunmodal:true,
  //         shixunmodallist:result.data,
  //         newshixunmodallist:newshixunmodallists,
  //         hometypepvisible:false
  //       })
  //     }
  //   }).catch((error)=>{
  //     console.log(error);
  //   })
  // }


  // funshixunpathlist=(search,type,loading,page)=>{
  //   let{newshixunpathlist}=this.state;
  //   let newshixunmodallists=[]
  //   if(page>1){
  //     newshixunmodallists=newshixunpathlist;
  //   }
  //   this.setState({
  //     hometypepvisible:loading
  //   })
  //   let coursesId=this.props.match.params.coursesId;
  //   let url ="/courses/"+coursesId+"/homework_commons/subjects.json";
	//
  //   axios.get(url, {
  //     params: {
  //       search: search,
  //       type:type,
  //       page:page
  //     }
  //   }).then((result)=>{
  //     if(result.status===200){
	//
  //       let  shixun_lists=result.data.subject_list;
  //       for(var i=0; i<shixun_lists.length;i++){
  //         newshixunmodallists.push(shixun_lists[i])
  //       }
  //       this.setState({
  //         shixunpath:true,
  //         shixunpathlist:result.data,
  //         newshixunpathlist:newshixunmodallists,
  //         hometypepvisible:false
  //       })
  //     }
  //   }).catch((error)=>{
  //     console.log(error);
  //   })
  // }

  PaginationCourse=(pageNumber)=>{
    let {Coursename,order}=this.state;

    this.setState({
      page:pageNumber,
			checkBoxValues:[]
    })

    this.homeworkupdatalist(Coursename,pageNumber,order);

  }

  SearchCoursenames=(e)=>{
    this.setState({
      Coursename:e.target.value,
    })
  }



  SearchCoursename=(value)=>{

    let {page,order}=this.state;
    this.setState({
      Coursename:value,
      isSpin:true,
    })
    this.homeworkupdatalist(value,1,order);

  }

  handleClick = (e) => {
   let {Coursename,page}=this.state;
    this.setState({
      order: e.key,
			orders:e.key,
      checkBoxValues:[],
      checkedtype:false,
      isSpin:true,
			page:1,
    });
    let newkey=e.key;
    if(newkey==="8"){
      newkey=undefined
    }

    this.homeworkupdatalist(Coursename,1,newkey);
  }

  funpatheditarry=(list)=>{
    this.setState({
      patheditarry:list
    })
  }

  funselect=(e)=>{
     let{page,datas}=this.state;
     let newhomework_idsval=[];
     this.setState({
       checkedtype:e.target.checked
     })

    if(e.target.checked===true){

      for (var value of datas.homeworks) {
        newhomework_idsval.push(value.homework_id);
      }

    }

    // console.log(newhomework_idsval)
    this.setState({
      checkBoxValues:newhomework_idsval
    })

  }

  onselectfifteen = () => {
    this.setState({
      Modalstype:true,
      Modalstopval:"选择条数不能大于15条",
      ModalSave:this.cancelmodel,
      Loadtype:true
    })
  }

  onCheckBoxChange=(checkedValues)=>{
     // debugger
    let {checkBoxValues,tasks} =this.state;

    console.log(checkBoxValues)
    let type=false;
    if(checkBoxValues<tasks){
      type=false
    }else if(checkBoxValues<tasks){
      type=true
    }
    if(checkBoxValues.length>15||checkedValues.length>15){
      this.onselectfifteen()
      return
    }
    this.setState({
      checkBoxValues: checkedValues,
      checkAllValue:type
    })

  }


  savedelete=()=>{
		this.setState({
			antIcon:true
		})
    let {Coursename,page,order,checkBoxValues,datas}=this.state;
    let category_id=this.props.match.params.category_id;
    const cid = this.props.match.params.coursesId
    const url = `/courses/`+cid+`/homework_commons/multi_destroy.json`;
    axios.post(url, {
        category_id:category_id===undefined?undefined:category_id,
        homework_ids: checkBoxValues,
        })
      .then((response) => {
        if (response.data.status === 0) {

          // this.setState({
          //   Modalstype:true,
          //   Modalstopval:response.data.message,
          //   ModalsBottomval:"",
          //   ModalSave:this.cancelmodel,
          //   Loadtype:true,
          //   checkBoxValues:[],
          //   checkAllValue:false
          // })

          this.setState({
            Modalstype:false,
            Modalstopval:"",
            ModalsBottomval:"",
            ModalSave:this.cancelmodel,
            Loadtype:false,
            checkBoxValues:[],
            checkedtype:false,
						antIcon:false
          })
					this.homeworkupdatalist(Coursename,page,order);
          this.props.showNotification(response.data.message)
					this.props.updataleftNavfun()
        }else{
        	this.setState({
						antIcon:false
					})
					this.props.showNotification(response.data.message)
				}
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  testonSelect=()=>{

    let {checkBoxValues,checkedtype}=this.state;

    if(checkedtype===false){
      if(checkBoxValues.length===0){
        return true
      }
    }

  }
  onDelete = () => {

    let selectnum= this.testonSelect();
    if(selectnum===true){
      this.noSelect();
      return
    }

    this.setState({
      Modalstype:true,
      Modalstopval:"已提交作品将全部被删除，不可恢复",
      ModalsBottomval:"是否确认删除？",
      ModalCancel:this.cancelmodel,
      ModalSave:this.savedelete,
    })

  }

  noSelect=()=>{

    // this.setState({
    //   Modalstype:true,
    //   Loadtype:true,
    //   Modalstopval:"请选择你要操作的任务",
    //   ModalSave:this.cancelmodel,
    // })
    this.props.showNotification("请选择你要操作的任务");

  }

  cancelmodel=()=>{

    this.setState({
      Modalstype:false,
			OneSelftype:false,
      Loadtype:false,
      visible:false,
      Modalstopval:"",
      ModalCancel:"",
      ModalSave:"",
      checkBoxValues:[],
      checkedtype:false
    })

  }


  onOpen=()=>{
    let selectnum= this.testonSelect();
    if(selectnum===true){
      this.noSelect();
      return
    }

    this.setState({
      Modalstype:true,
      Modalstopval:"设为公开后，非课堂成员也可以访问查看",
      ModalsBottomval:"是否确认设为公开？",
      ModalCancel:this.cancelmodel,
      ModalSave:this.saveonOpen,
    })
  }

  saveonOpen=()=>{
    let {Coursename,page,order,checkBoxValues,datas}=this.state;
    this.setState({
      Modalstype:false,
    })
    let category_id=this.props.match.params.category_id;
    
    const cid = this.props.match.params.coursesId;
    let url="/courses/"+cid+"/homework_commons/set_public.json";
    axios.post(url, {
      category_id:category_id===undefined?undefined:category_id,
      homework_ids: checkBoxValues,
      })
      .then((response) => {
        if (response.data.status == 0) {

          this.setState({
            Modalstype:false,
            Modalstopval:"",
            ModalsBottomval:"",
            ModalSave:this.cancelmodel,
            Loadtype:false,
            checkBoxValues:[]
          })
					this.homeworkupdatalist(Coursename,page,order);
          this.props.showNotification(response.data.message)


        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  updadatalist=(id)=>{
    // this.seactall(id)
    let coursesId=this.props.match.params.coursesId;
    let url="/courses/"+coursesId+"/homework_commons/choose_category.json";
    axios.get(url, {
    }).then((response) => {
      if(response!=undefined){
        if(response.data&&response.data){
          this.setState({
            course_modules:response.data,
						homework_categorys:response.data.homework_category
          })
        }
      }

    })
  }

  moveTos=(id)=>{
    let {checkBoxValues,Coursename,page,order}=this.state;
    let selectnum= this.testonSelect();
    if(selectnum===true){
      this.noSelect();
      return
    }
    const cid = this.props.match.params.coursesId;
    const url = `/courses/`+cid+`/homework_commons/move_to_category.json`
    axios.post(url, {
        homework_ids: checkBoxValues,
        new_category_id:id,
      })
      .then((response) => {
        if (response.data.status == 0) {
          this.setState({
            // Modalstype:true,
            // Modalstopval:response.data.message,
            // ModalsBottomval:"",
            // ModalSave:this.cancelmodel,
            // Loadtype:true,
            checkBoxValues:[],
            checkAllValue:false
          })
					this.homeworkupdatalist(Coursename,page,order);
          this.props.showNotification('已完成')
          this.props.updataleftNavfun()

        }
      })
  }

  addDir = () => {
		this.setState({
			checkBoxValues:[]
		})
    let {datas}=this.state;
    trigger('shixun_homeworkadd', parseInt(datas.main_category_id))
  }
  //
  // editname = (name) => {
  //   let {datas}=this.state;
  //   let data={id:parseInt(datas.main_category_id),name:name}
  //   trigger('editshixunmainname', data)
  // }

  editDir = (name) => {
  	this.setState({
			checkBoxValues:[]
		})
    let {datas}=this.state;
    let data={id:parseInt(datas.category_id),name:name}
    trigger('editshixunname', data)
  }
  gotohome=()=>{
    let courseId=this.props.match.params.coursesId;
    if(courseId===undefined){
      this.props.history.push("/courses");
    }else{
      this.props.history.push(this.props.current_user.first_category_url);
    }
  }
 showNewShixunModelType=()=>{
	 this.setState({
		 NewShixunModelType:true,
		 patheditarry:[],
		 checkBoxValues:[]
	 })
 }
  hideNewShixunModelType=()=>{
   this.setState({
		 NewShixunModelType:false,
		 shixunpath:false
	 })
	}
  render(){
    let {
      modalname,
      modaltype,
      visible,
      Topval,
      Topvalright,
      Botvalleft,
      Botval,
      starttime,
      endtime,
      Cancelname,
      Savesname,
      Cancel,
      Saves,
      addname,
      addnametype,
      addnametab,
      addcanner,
      addsave,
      datas,
      page,
      Coursename,
      shixunmodal,
      shixunmodallist,
      hometypepvisible,
      newshixunmodallist,
      patheditarry,
      course_groups,
      Modalstype,
      checkedtype,
      checkBoxValues,
      course_modules,
      shixunpath,
      order,
			orders,
			NewShixunModelType,
    }=this.state;

		let main_id=this.props.match.params.main_id;

    return(
      <React.Fragment  >
      <div>

				 {/*新版实训model*/}
				{NewShixunModelType===true?<NewShixunModel
					{...this.props}
					{...this.state}
					category_id={this.props.match.params.category_id}
					type={'shixuns'}
					hideNewShixunModelType={()=>this.hideNewShixunModelType()}
					coursesId={this.props.match.params.coursesId}
					homeworkupdatalists={(Coursename,page,order)=>this.homeworkupdatalist(Coursename,page,order)}
					Coursename={Coursename}
					page={page}
					order={order}
					statustype={'published'}
				/>:""}

				{/*新版实训model*/}
				{shixunpath===true?<NewShixunModel
					{...this.props}
					{...this.state}
					category_id={this.props.match.params.category_id}
					type={'path'}
					hideNewShixunModelType={()=>this.hideNewShixunModelType()}
					coursesId={this.props.match.params.coursesId}
					homeworkupdatalists={(Coursename,page,order)=>this.homeworkupdatalist(Coursename,page,order)}
					Coursename={Coursename}
					page={page}
					order={order}
				/>:""}


        {/*提示*/}
        {Modalstype&&Modalstype===true?<Modals
          modalsType={this.state.Modalstype}
          modalsTopval={this.state.Modalstopval}
          modalCancel={this.state.ModalCancel}
          modalSave={this.state.ModalSave}
          modalsBottomval={this.state.ModalsBottomval}
          loadtype={this.state.Loadtype}
					antIcon={this.state.antIcon}
        />:""}
        {/*批量立即发布*/}
        {visible===true?<HomeworkModal
          datas={datas}
          category_id={this.props.match.params.category_id}
          modaltype={modaltype}
          modalname={modalname}
          visible={visible}
          Topval={Topval}
          Topvalright={Topvalright}
          Botvalleft={Botvalleft}
          Botval={Botval}
          starttime={starttime}
					starttimes={this.state.starttimes}
					typs={this.state.typs}
          endtime={endtime}
          Cancelname={Cancelname}
          Savesname={Savesname}
          Cancel={Cancel}
          Saves={Saves}
          course_groups={course_groups}
          getcourse_groupslist={(id)=>this.getcourse_groupslist(id)}
        />:""}

				{/*{单个立即发布}*/}
				{/*<OneSelfOrderModal*/}
					{/*OneSelftype={this.state.OneSelftype}*/}
					{/*datas={datas}*/}
					{/*category_id={this.props.match.params.category_id}*/}
					{/*modaltype={modaltype}*/}
					{/*modalname={modalname}*/}
					{/*Topval={Topval}*/}
					{/*Topvalright={Topvalright}*/}
					{/*Botvalleft={Botvalleft}*/}
					{/*Botval={Botval}*/}
					{/*starttime={starttime}*/}
					{/*starttimes={this.state.starttimes}*/}
					{/*typs={this.state.typs}*/}
					{/*endtime={endtime}*/}
					{/*Cancelname={Cancelname}*/}
					{/*Savesname={Savesname}*/}
					{/*Cancel={Cancel}*/}
					{/*Saves={Saves}*/}
					{/*course_groups={course_groups}*/}
					{/*getcourse_groupslist={(id)=>this.getcourse_groupslist(id)}*/}
				{/*/>*/}
        {shixunmodal===true||shixunpath===true?<style>
            {
              `
              body {
							  overflow: hidden !important;
							}
              `
            }
        </style>:""}



        {/*添加目录/选择目录*/}
        <AddcoursesNav
          addname={addname}
          addnametype={addnametype}
          addnametab={addnametab}
          addcanner={addcanner}
          addsave={addsave}
        />

				{
					datas&&datas.category_name===undefined||datas&&datas.category_name===null?"":
					<style>
					{
						`
							.category_namehome{
							  max-width: 558px;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								display: inline-block;
								margin-right: 5px;
							}
						 .category_namehomelist{
								 display: inline-block;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						`
					}
				</style>
				}
        <div className="edu-back-white">
          <p className="clearfix padding30 bor-bottom-greyE">
            <p style={{height: '20px'}}>
							<span className="font-18 fl color-dark-21">
								{datas&&datas.category_name===undefined||datas&&datas.category_name===null?datas&&datas.main_category_name:<span>
									<span className={"category_namehome"}>{datas&&datas.category_name} </span>
									<span className={"category_namehomelist"}> 作业列表</span>
								</span>}
							</span>
              <li className="fr">
								{datas===undefined?"":datas.homeworks && datas.homeworks.length>1?this.props.isAdminOrCreator()===true?datas&&datas.category_name===undefined||datas&&datas.category_name===null?
									<span>
                    <WordsBtn style="blue" className={"mr30 font-16"}>
											<Link className="color4CACFF" to={`/courses/${this.props.match.params.coursesId}/ordering/shixun_homework/${main_id&&main_id}`}>调整排序</Link>
                    </WordsBtn>
                  </span>:"":"":""}

              {this.props.isAdmin()===true?datas&&datas.category_name===undefined||datas&&datas.category_name===null?
                  <span>
                    <WordsBtn style="blue" onClick={()=>this.addDir()} className={"mr30 font-16"}>新建目录</WordsBtn>
                    {/*<WordsBtn style="blue" onClick={()=>this.editname(datas&&datas.main_category_name)} className={"mr30"}>目录重命名</WordsBtn>*/}
                  </span>:
                  <WordsBtn style="blue" onClick={()=>this.editDir(datas&&datas.category_name)} className={"mr30 font-16"}>目录重命名</WordsBtn>:""}
              {this.props.isAdmin()===true?datas&&datas.category_name===undefined||datas&&datas.category_name===null?<WordsBtn style="blue" className="mr30 font-16" onClick={this.createCommonpath}>选用实践课程</WordsBtn>:"":""}
              {this.props.isAdmin()===true?<a className={"btn colorblue font-16"} onClick={()=>this.showNewShixunModelType()}>选用实训项目</a>:""}
            </li>
            </p>

          </p>
          <div className="clearfix pl30 pr30">
			     	<p style={{marginTop:'10px'}}>
              <div style={{"display":"inline-block", "marginTop": "22px"}}>
                <span>共 {datas&&datas.all_count}个实训作业</span>
                <span style={{"marginLeft":"16px"}}>已发布：{datas&&datas.published_count}个</span>
								<span style={{"marginLeft":"16px"}}>未发布： {datas&&datas.unpublished_count}个</span>
              </div>
            </p>
            <div className="fl mt6 task_menu_ul">
              <Menu mode="horizontal" selectedKeys={orders} onClick={this.handleClick}>
                <Menu.Item key="8">全部</Menu.Item>
                {this.props.isAdmin()?<Menu.Item key="0">未发布</Menu.Item>:""}
                <Menu.Item key="1">提交中</Menu.Item>
                <Menu.Item key="2">补交中</Menu.Item>
                <Menu.Item key="5">已截止</Menu.Item>
              </Menu>
            </div>
            <div className="fr mt16 mb16 searchView">
              {publicSearchs("请输入名称进行搜索",value => this.SearchCoursename(value),this.SearchCoursenames,(e)=>this.SearchCoursenames(e))}
              {/*<Search*/}
              {/*  // value={Coursename}*/}
              {/*  placeholder="请输入名称进行搜索"*/}
              {/*  onInput={this.SearchCoursenames}*/}
              {/*  onSearch={value => this.SearchCoursename(value)}*/}
              {/*  onChange={(e)=>this.allowClearonChange(e)}*/}
              {/*  allowClear={true}*/}
              {/*></Search>*/}
            </div>
          </div>
        </div>
        <Spin size="large" spinning={this.state.isSpin}>
        {this.props.isAdmin()===true?
					datas===undefined?'' :datas.homeworks.length===0?"":
					<div className="mt20 edu-back-white padding20-30">

          <div className="clearfix">
            <Checkbox className="fl" style={{marginTop:'0px'}} checked={checkedtype} onClick={this.funselect}>已选 {checkBoxValues&&checkBoxValues.length} 个   （不支持跨页勾选）</Checkbox>
            <div className="studentList_operation_ul">
                <li className="li_line"><a className="color-grey-9" onClick={this.onDelete}>删除</a></li>
							  {/*{checkBoxValues&&checkBoxValues.length>1?<li className="li_line"><a className="color-grey-9" onClick={this.homeworkstart}>立即发布</a></li>*/}
								{/*:<li className="li_line"><a className="color-grey-9" onClick={this.homeworkOneSelfstart}>单个立即发布</a></li>}*/}
						  	<li className="li_line"><a className="color-grey-9" onClick={this.homeworkstart}>立即发布</a></li>
                {/*onClick={this.homeworkstart}*/}
                <li className="li_line"><a className="color-grey-9" onClick={this.homeworkends}>立即截止</a></li>
                <li className="li_line" style={{display:datas===undefined?"none":datas.course_public===true?"block":"none"}}>
                  <a className="color-grey-9" onClick={this.onOpen}>设为公开</a>
                </li>
                <li className="li_line drop_down"  onMouseEnter={this.updadatalist}>
                  {/*onClick={()=>this.selectBlank(4)}*/}
                  移动到...<i className="iconfont icon-xiajiantou font-12 ml2"></i>
                <ul className="drop_down_menu"  style={{"right":"0px","left":"unset", maxHeight: '318px', overflowY: 'auto',  minWidth: '200px'}}>
                  { course_modules&&course_modules.homework_category.length > 10 && <p className="drop_down_search">
                    <Input placeholder="搜索" value={this.state.dirSearchValue} onChange={(e) => {this.setState({dirSearchValue: e.target.value})}}/>
                  </p> }

                  {course_modules&&course_modules.main_category.map((item,key)=>{
                    return(
											datas&&datas.category_id===null?"":<li key={key} id={item.main_category_id} onClick={() => this.moveTos(item.main_category_id)} title={item.main_category_name.length>18?item.main_category_name:""}>{item.main_category_name}</li>
									)
                  })}


                  { course_modules&&course_modules.homework_category.filter((item,key)=> {
                  return (!this.state.dirSearchValue || item.category_name.indexOf(this.state.dirSearchValue) != -1)
                  }).map( (item,key) => {
 										if(datas&&datas.category_id!=null&&datas&&datas.category_id===item.category_id===false){
											return <li key={key} id={item.category_id} onClick={() => this.moveTos(item.category_id )} title={item.category_name.length>18?item.category_name:""}>{item.category_name}</li>
										}
										if(datas&&datas.category_id===null){
											return <li key={key} id={item.category_id} onClick={() => this.moveTos(item.category_id )} title={item.category_name.length>18?item.category_name:""}>{item.category_name}</li>
										}
									})}


									<style>
										{`
									.courseSecond{
								    margin-left: 10px;
    								padding: 10px;
									 }
										`}
									</style>
									{course_modules&&course_modules.homework_category.length===0&&datas&&datas.category_id===null?
										<div className={"courseSecond"}>暂无数据</div>:""}

                  {/*{course_modules&&course_modules.homework_category.map((item,key)=>{*/}
                    {/*return(*/}
                      {/*<li key={key} id={item.category_id} onClick={() => this.moveTos(item.category_id )}>{item.category_name}</li>*/}
                    {/*)*/}
                  {/*})}*/}

                  {this.props.isAdmin()?datas&&datas.category_name===undefined||datas&&datas.category_name===null?
                      <p className="drop_down_btn">
                        <a className="color-grey-6" onClick={()=>this.addDir()}>新建目录...</a>
                      </p>
                        :"":""}

                </ul>
                </li>
              </div>
          </div>

        </div>:""}
        <style>{`
          .padding02010{
              padding: 10px 30px 0px 30px;
              cursor: pointer;
          }
          .ant-checkbox-group > div .boardsList {
              border-top: 1px solid transparent;
              padding: 10px 0px 20px!important;
          }
          .padding02010:hover{
              box-shadow: 0px 2px 6px rgba(51,51,51,0.09);
              opacity: 1;
              border-radius: 2px;
          }
        `}</style>
        {/*onChange={this.onCheckBoxChange} value={checkBoxValues}*/}
        {datas===undefined?"": <Checkbox.Group style={{ width: '100%' }} onChange={this.onCheckBoxChange} value={this.state.checkBoxValues}>
          { datas.homeworks && datas.homeworks.map((item, index) => {
            // console.log("ShixunhomeWorkItem")
            // console.log("++++++++++++++++++++++++++++++++++++++++++")
            // console.log(JSON.stringify(this.props))
            return (
              <div className="mt20 edu-back-white padding02010" key={index} >
                <div className="clearfix">
                  <ShixunhomeWorkItem
                    {...this.props}
                    discussMessage={item}
                    isAdmin={this.props.isAdmin()}
                    isStudent={this.props.isStudent()}
                    isNotMember={this.props.isNotMember()}
										isClassManagement={this.props.isClassManagement()}
                    checkBox={this.props.isAdmin()?<Checkbox value={item.homework_id} key={item.homework_id}></Checkbox>:""}
                    match={this.props.match}
                    index={index}
                    coursedata={this.props.coursedata}
                    coursupdata={()=>this.homeworkupdatalist(Coursename,page,order)}
                    course_identity={datas.course_identity}
                  // onItemClick={this.onItemClick}
                    // onSticky={this.onSticky}
                    // funlist={()=>this.fetchAll(search,page,order)}
                    // coursename={this.props.coursedata&&this.props.coursedata.name}
                    // graduationId={this.props.match.params.graduationId}
                    // taskid={item.task_id}
                    // coursesId={this.props.match.params.coursesId}
                    // categoryid={this.props.match.params.category_id}
                    // workid={item.work_id}
                  ></ShixunhomeWorkItem>
                </div>
              </div>
            )

          })
          }
        </Checkbox.Group>
        }

          <div className="mb40 edu-txt-center padding20-30"
         style={
            {
              display: datas===undefined?'none':datas.task_count >15 ? 'block':'none'
            }
          }>

            <Pagination
              showQuickJumper
              defaultCurrent={1}
              pageSize={15}
              total={datas===undefined?"":datas.task_count}
              current={page}
              onChange={this.PaginationCourse}
            />

          </div>

					{
						datas===undefined?"":datas.homeworks && datas.homeworks.length===0? <NoneData></NoneData>:""
					}

      </Spin>

      </div>
      </React.Fragment>
    )
  }
}
export default ShixunHomework;
