import React,{ Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {Checkbox,Modal,Input,Tooltip,notification,Popover} from 'antd';
import { DragDropContext,Draggable, Droppable} from 'react-beautiful-dnd';
import Modals from '../../modals/Modals';
import { on, off, trigger } from 'educoder';
import './MainLeftNav.css';
import MyEduChapterupdate from './MyEduChapterupdate';
const CheckboxGroup = Checkbox.Group;


let navidtype=true;


//a little function to help us with reordering the result
const reorder =  (list, startIndex, endIndex) => {
  // console.log(list)
  // console.log(startIndex)
  // console.log(endIndex)
  let newlist=list;
  const result = Array.from(newlist);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// const getItemStyle = (isDragging, draggableStyle) => ({
//   // change background colour if dragging
//   background: isDragging?'#f1f1f1': '',
//   // styles we need to apply on draggables
//   ...draggableStyle,
// });


class Coursesleftnav extends Component{
  constructor(props){
    super(props);
    this.state = {
      index:1,
      addGroup:true,
      navid:undefined,
      sandiantype:undefined,
      twosandiantype:undefined,
      addCheckboxGroup:[],
      Navmodalname:"",
      Navmodalnametype:false,
      Navmodaltypename:"",
      setnavid:"",
      NavmodalValue:"",
      ModalsType:false,
      Modalstopval:"",
      loadtype:false,
      selectnavid:false,
      newselectnavid:undefined,
      positiontype:undefined,
      toopvisible:false,
      toopvisibleindex:undefined,
      toopvisibleindexs:undefined,
      sandiantypes:undefined,
			antIcon:false,
      chapterupdate:false,
    }
  }

  // updataleftNav=()=>{
  //
  //   let id=this.props.match.params.coursesId;
  //   let url ="/courses/"+id+"/left_banner.json"
  //   axios.get(url).then((response) => {
  //     if(response!=undefined){
  //       if(response.data&&response.data){
  //         this.setState({
  //           course_modules:response.data.course_modules,
  //           hidden_modules:response.data.hidden_modules,
  //           is_teacher:response.data.is_teacher,
  //         })
  //         this.locationNav(response.data.course_modules)
  //       }
  //     }
  //
  //   })
  // }

  // locationNav=(list)=>{
  //   let filesId=this.props.match.params.Id;
  //   let url=this.props.location.pathname;
  //   var lists=list;
  //
  //
  //   lists.forEach((item,index)=>{
  //     if(item.second_category!=undefined&&item.second_category.length!=0){
  //       item.second_category.forEach((iem,key)=>{
  //         if( parseInt(filesId)===iem.category_id||parseInt(filesId)===item.id){
  //           this.setState({
  //             indexs:index,
  //             url:url
  //           })
  //         }
  //       })
  //     }
  //
  //     if(this.props.match.url===item.category_url){
  //       this.props.coursesidsfun(item.id)
  //     }
  //   })
  //
  // }

  // setcoursesidsfun=()=>{
  //   // let {course_modules} =this.props;
  //   // let lists=course_modules;
  //   // let url=this.props.location.pathname;
  //   // lists.forEach((item,index)=>{
  //   //   if(item.second_category!=undefined&&item.second_category.length!=0){
  //   //     item.second_category.forEach((iem,key)=>{
  //   //       if(url===iem.second_category_url){
  //   //         this.props.coursesidsfun(item.id,"child")
  //   //       }
  //   //     })
  //   //   }
  //   //
  //   //   if(url===item.category_url){
  //   //     this.props.coursesidsfun(item.id,"node")
  //   //   }
  //   // })
  //   // this.props.updataleftNavfun()
  // }

  componentWillUnmount() {
    off('boardAdd', this.boardAddListener)
    off('boardRename', this.boardRenameListener)
    off('groupAdd', this.groupAddListener)
    off('groupRename', this.groupRenameListener)
    off('attachmentAddlog',this.attachmentAddlog)
    off('flieseditDir',this.flieseditDir)
    off('shixun_homeworkadd',this.addshixunchild)
    off('editshixunname',this.editshixunchild)
    off('editshixunmainname',this.editshixunmainname)
  }
  addshixunchild=(e, data)=>{
    this.Navmodalnames(e,1,"shixun_homework",data)
  }
  editshixunchild=(e, data)=>{
    this.Navmodalnames(e,4,"editSecondname",data.id,data.name)
  }
  editshixunmainname=(e, data)=>{
    this.Navmodalnames(e,3,"editname",data.id,data.name)
  }
  boardAddListener = (e, data) => {
    this.Navmodalnames(e,6,"board", data)
  }
  boardRenameListener = (e, data) => {
    this.Navmodalnames(e,7,"editSecondname", data.category_id, data.category_name)
  }
  groupAddListener = (e, data) => {
    this.Navmodalnames(e,2,"course_group", data)
  }
  groupRenameListener = (e, data) => {
    this.Navmodalnames(e,5,"editSecondname", data.id, data.name)
  }
  attachmentAddlog=(e,data)=>{
    this.Navmodalnames(e,1,"attachment",data)
  }
  flieseditDir=(e, data)=>{
    this.Navmodalnames(e,4,"editSecondname",data.id,data.name)
  }

  componentDidMount() {

    this.setState({
      url:this.props.match.url
    })
    on('boardAdd', this.boardAddListener)
    on('boardRename', this.boardRenameListener)
    on('groupAdd', this.groupAddListener)
    on('groupRename', this.groupRenameListener)
    on('attachmentAddlog', this.attachmentAddlog)
    on('flieseditDir', this.flieseditDir)
    on('shixun_homeworkadd',this.addshixunchild)
    on('editshixunname',this.editshixunchild)
    on('editshixunmainname',this.editshixunmainname)

    // this.props.updataleftNavfun();
    // this.props.getleftNavid && this.props.getleftNavid("shixun_homework");
    // const position =parseInt(this.props.match.params.position);

    let courstype=this.props.match.url;

        courstype = courstype.split('/');

        courstype=courstype[3];

        // console.log(courstype)

    const query =this.props.location.search;

    // const type = query.split('?type=');
    let category_id;
    if(courstype==="board"){
      category_id=parseInt(this.props.match.params.boardId);
    }else{
      category_id=parseInt(this.props.match.params.category_id);
    }


  // console.log(category_id)

    if(query===""){
      this.setState({
        navid:0,
        positiontype:courstype,
        selectnavid:false,
        newselectnavid:parseInt(category_id),
      })
    }else{

      if(isNaN(category_id)){
        this.setState({
          positiontype:courstype,
          newselectnavid:parseInt(category_id),
          selectnavid:false,
        })
      }else{
        this.setState({
          positiontype:courstype,
          newselectnavid:parseInt(category_id),
          selectnavid:false,
        })
      }

    }

    if(navidtype===false){
      navidtype=true
    }
   this.props.updataleftNavfun()
  }

	componentDidUpdate=(prevProps)=>{
    if(prevProps!=this.props){
			let courstype=this.props.match.url;
			courstype = courstype.split('/');
			courstype=courstype[3];
			const query =this.props.location.search;
			let category_id;
			if(courstype==="board"){
				category_id=parseInt(this.props.match.params.boardId);
			}else{
				category_id=parseInt(this.props.match.params.category_id);
			}
			if(query===""){
				this.setState({
					positiontype:courstype,
				})
			}else{
				if(isNaN(category_id)){
					this.setState({
						positiontype:courstype,
					})
				}else{
					this.setState({
						positiontype:courstype,
					})
				}

			}
		}
	}

  setnavid=(e,key,id,type,url)=>{
    // this.props.getleftNavid && this.props.getleftNavid(key,type);
    //   let {selectnavid,navid}=this.state;
		//
    //   if(navidtype===true&&selectnavid===false){
		//
    //       if(navid===key){
    //         this.setState({
    //           navid:"",
    //           selectnavid:false,
    //           newselectnavid:id
    //         })
    //       }else{
    //         this.setState({
    //           navid:key,
    //           positiontype:type,
    //           selectnavid:false,
    //           newselectnavid:id
    //         })
    //       }
    //   }else{
    //     // console.log(navidtype)
    //     // console.log(selectnavid)
    //     this.setState({
    //       navid:"",
    //       selectnavid:false,
    //       newselectnavid:id
    //     })
    //   }
    //
    // this.props.updataleftNavfun();
    // this.props.history.replace( url );
    // e.stopPropagation();//阻止冒泡
		this.selectnavid(e,key,id,type,url)
  }

  selectnavid=(e,key,id,type,urls,index)=>{

    let {url}=this.state;
    if(urls!=url){
			this.props.updataleftNavfun();
      this.props.history.replace(urls);
    }else{

      if (key === this.props.indexs) {
        this.props.unlocationNavfun(undefined)
      } else {
				this.props.updataleftNavfun();
        this.props.unlocationNavfun(key)
				this.props.history.replace(urls);
      }
    }
    this.setState({
      selectnavid:true,
      newselectnavid:id,
      url:urls,
      indexs:index
    })
    // this.props.history.replace(urls);
    e.stopPropagation();//阻止冒泡

  }
  selectnavids=(e,key,id,type,urls,index)=>{
    this.setState({
      selectnavid:true,
      newselectnavid:id,
      url:urls,
      indexs:index
    })
		this.props.updataleftNavfun();
    this.props.history.replace(urls);
    e.stopPropagation();//阻止冒泡
  }


  twosandianshow=(e,key,type)=>{

     // console.log("twosandianshow");
     // console.log(key);
     // console.log(type);
    this.setState({
      toopvisibleindexs:key,
      twosandiantype:key,
      toopvisible:false,
      toopvisibleindex:undefined,
      twosandiantypes:type
    })
    e.stopPropagation();//阻止冒泡
  }
  twosandianshowys=(e,key,type)=>{
    // console.log("twosandianshow");
    // console.log(key);
    // console.log(type);
    this.setState({
      toopvisibleindexs:key,
    })
    e.stopPropagation();//阻止冒泡
  }
  twosandianshowyss=(e,key,type)=>{
    // console.log("twosandianshow");
    // console.log(key);
    // console.log(type);
    this.setState({
      toopvisibleindexs:undefined,
    })
    e.stopPropagation();//阻止冒泡
  }

  twosandianhide=(e,index,type)=>{
    // console.log(index)
    this.setState({
      toopvisibleindexs:undefined,
      twosandiantype:undefined,
      twosandiantypenum:undefined,
      toopvisible:true,
      toopvisibleindex:index,
      twosandiantypes:type
    })
    e.stopPropagation();//阻止冒泡
  }

  twosandianhideys=(e,index,type)=>{
    // console.log(index)
    this.setState({
      toopvisibleindexs:undefined,
    })
    e.stopPropagation();//阻止冒泡
  }

  //置顶
  editSetup=(e,id)=>{
    e.stopPropagation();//阻止冒泡
    navidtype=false
    this.setState({
      navid:undefined,
      sandiantype:undefined,
      twosandiantype:undefined,
    })

    let url="/course_modules/"+id+"/sticky_module.json"
    axios.get(url).then((result)=>{
      navidtype=true
      this.props.updataleftNavfun();
    }).catch((error)=>{
      navidtype=true
    })
  }

  //隐藏
  edithiddens=(id)=>{

    navidtype=false
    this.setState({
      navid:undefined,
      sandiantype:undefined,
      twosandiantype:undefined,
			ModalsType:false
    })

    let url="/course_modules/"+id+"/hidden_module.json"
    axios.get(url).then((result)=>{
      navidtype=true
      this.props.updataleftNavfun();
      // console.log(this.props)
      let list=this.props.course_modules;
      for(var i=0; i<list.length;i++){
        if(list[i].id!=id){
          this.props.history.push(list[i].category_url)
          return
        }
      }
    }).catch((error)=>{
      navidtype=true
    })
  }

  edithidden=(e,id)=>{
    e.stopPropagation();//阻止冒泡
		let {course_modules}=this.props;

		if(course_modules.length>1){
			this.setState({
				ModalsType:true,
				Modalstopval:"隐藏后将不再显示此模块，",
				ModalsBottomval:"后续可在课堂设置中重新勾选模块恢复显示",
				ModalSave:()=>this.edithiddens(id),
			})
		}else{
			this.setState({
				ModalsType:true,
				Modalstopval:"您不能隐藏所有课堂模块，请至少保留",
				ModalsBottomval:"其中一个模块。",
				loadtype:true,
				ModalSave:()=>this.cannerNavmoda(),
			})
		}

  }

  Navmodalnames=(e,id,type,setnavid,name)=>{
    e.stopPropagation();//阻止冒泡
      navidtype=false
      if(id===1||id===2||id===6){
        this.setState({
          Navmodalname:id===2?"新建分班":"新建目录",
          Navtitles:id===2?"分班名称":"目录名称",
          Navplaceholder:"请输入名称，最大限制60个字符",
          Navmodalnametype:true,
          Navmodaltypename:id,
          setnavid:setnavid,
          NavmodalValue:""
        })
      }else if(id===3||id===4||id===5||id===7){

        this.setState({
          Navmodalname:id===5?"分班重命名":"目录重命名",
          Navtitles:id===5?"分班名称":"目录名称",
          Navplaceholder:"请输入名称，最大限制60个字符",
          Navmodalnametype:true,
          Navmodaltypename:id,
          setnavid:setnavid,
          NavmodalValue:name
        })

      }


  }

  cannerNavmoda=()=>{

    this.setState({
      Navmodalnametype:false,
      NavmodalValuetype:false,
      ModalsType:false
    })
    navidtype=true
  }
  setNavmodalValue=(e)=>{
    this.setState({
      NavmodalValue:e.target.value
    })
  }

  updasaveNavmoda=(message)=>{
    this.props.updataleftNavfun();
    // this.setState({
    //   ModalsType:true,
    //   Modalstopval:message,
    //   loadtype:true,
    //   NavmodalValue:""
    // })
    navidtype=true
  }

  saveNavmodapost=(url,value,positiontype,coursesId)=>{

    axios.post(url,
      {name:value}).then((result)=>{
      	if(result!=undefined){
					if(result.data.status===0){

						notification.open({
							message:"提示",
							description:result.data.message
						});


						if(positiontype==="files"){
              this.updasaveNavmoda()
              trigger('updateNavSuccess')
							window.location.href=`/courses/${coursesId}/file/${result.data.category_id}`;
						}

					  if(positiontype==="boards"){
              this.updasaveNavmoda()
              trigger('updateNavSuccess')
							window.location.href=`/courses/${coursesId}/boards/${result.data.category_id}`;
						}

            if(positiontype!="course_groups"){
              this.updasaveNavmoda()
            }

						if(positiontype==="course_groups"){
							window.location.href=`/courses/${coursesId}/course_groups/${result.data.group_id}`;
						}

					}
				}
    }).catch((error)=>{
      console.log(error)
    })
  }
  saveboardpost=(url,value)=>{
    axios.put(url,
      {name:value}).then((result)=>{
			if(result!=undefined){
				if(result.data.status===0){
					// window.location.reload()
					this.updasaveNavmoda()
					trigger('updateNavSuccess')

					//
					notification.open({
						message:"提示",
						description:result.data.message
					});
				}
			}
    }).catch((error)=>{
      console.log(error)
    })
  }

  saveNavmoda=()=>{
    let {Navmodaltypename,setnavid,NavmodalValue}=this.state;
    let id =setnavid;

		if(Navmodaltypename===5&&NavmodalValue==="未分班"||Navmodaltypename===2&&NavmodalValue==="未分班"){
			this.setState({
				NavmodalValuetype:true,
				NavmodalValues:"名称不能和未分班一样"
			})
			return
		}

    if(NavmodalValue===""){
      this.setState({
        NavmodalValuetype:true,
        NavmodalValues:"名称不能为空"
      })
      return
    }else  if(NavmodalValue.length>60){
      this.setState({
        NavmodalValuetype:true,
        NavmodalValues:"名称不能超过60个字"
      })
      return
    }

   if(Navmodaltypename===1){
     let url="/course_modules/"+id+"/add_second_category.json"
     this.saveNavmodapost(url,NavmodalValue,this.state.positiontype,this.props.match.params.coursesId)

    } else if(Navmodaltypename===2){

     let newid=this.props.match.params.coursesId;
     let url="/courses/"+newid+"/course_groups.json";
     this.saveNavmodapost(url,NavmodalValue,this.state.positiontype,this.props.match.params.coursesId)

    }else if(Navmodaltypename===3){

     let url="/course_modules/"+id+"/rename_module.json"
     this.saveNavmodapost(url,NavmodalValue)

   }else if(Navmodaltypename===4){

     let url="/course_second_categories/"+id+"/rename_category.json";
     this.saveNavmodapost(url,NavmodalValue)

    }else if(Navmodaltypename===5){

     let url="/course_groups/"+id+"/rename_group.json";
     this.saveNavmodapost(url,NavmodalValue)

    }else if(Navmodaltypename===6) {

     let newid=this.props.match.params.coursesId;
     let url = "/courses/"+newid+"/boards.json";
     this.saveNavmodapost(url,NavmodalValue,this.state.positiontype,this.props.match.params.coursesId)

    }else if(Navmodaltypename===7) {

     let url = "/boards/"+id+".json";
     this.saveboardpost(url,NavmodalValue)

     }

     this.setState({
      Navmodalnametype:false
    })
  }




   updatadeleteSecondary=(url)=>{
     this.props.updataleftNavfun();
     // this.setState({
     //   ModalsType:true,
     //   Modalstopval:"删除成功",
     //   loadtype:true,
     // })
     // notification.open({
     //   message: "删除成功",
     // });

		 // this.props.history.replace(url);
      window.location.href = url;
   }

  deletenavchilds=(url,mainurl)=>{
   this.setState({
		 antIcon:true
	 })
    axios.delete(url).then((result)=>{
      if(result.data.status===0){

				if(mainurl===undefined){
					this.updatadeleteSecondary(result.data.right_url)
				}else{
					this.updatadeleteSecondary(mainurl)
				}

      }
    }).catch((error)=>{
      console.log(error)
    })
  }
  deleteSecondary=(e,type,id,mainurl)=>{
    e.stopPropagation();//阻止冒泡
    if(type===1){
      let url="/course_second_categories/"+id+".json"

      this.setState({
         ModalsType:true,
         Modalstopval:"该目录下的内容将被移动到父目录,",
         ModalsBottomval:"是否确认删除?",
         ModalSave:()=>this.deletenavchilds(url),

      })

    }else if(type===2){
      let url="/course_groups/"+id+".json"
      this.setState({
        ModalsType:true,
        Modalstopval:"该分班的学生将被移动到“未分班”,",
        ModalsBottomval:"是否确认删除?",
        ModalSave:()=>this.deletenavchilds(url),

      })
    }else if(type===3){
      let url="/boards/"+id+".json"
      this.setState({
        ModalsType:true,
        Modalstopval:"该目录下的内容将被移动到父目录,",
        ModalsBottomval:"是否确认删除?",
        ModalSave:()=>this.deletenavchilds(url,mainurl),

      })
    }

  }


  droppablepost=(url,list)=>{
    axios.post(url,{position: list}).then((result)=>{
			if(result!=undefined){
				// this.updasaveNavmoda(result.data.message)
				this.updasaveNavmoda()
				//
				notification.open({
					message:"提示",
					description:result.data.message
				});
			}
    }).catch((error)=>{
      console.log(error)
    })
  }

  onDragEnd=(result)=>{
    // console.log(result)
    // let {course_modules}=this.props;
    // let newcourse_modules=course_modules;
    // let newid=this.props.match.params.coursesId;
    // let list=[];
    // let positionlist=[];
    // for(var i=0; i<newcourse_modules.length;i++){
    //   if(newcourse_modules[i].type===result.source.droppableId){
    //     list=newcourse_modules[i].second_category
    //   }
    // }
    // const newlist = reorder(
    //   list,
    //   result.source.index,
    //   result.destination.index
    // );
    //
    // for(var z=0; z<newlist.length; z++){
    //   positionlist.push(newlist[z].position)
    // }
    //
    // for(var i=0; i<newcourse_modules.length;i++){
    //   if(newcourse_modules[i].type===result.source.droppableId){
    //     newcourse_modules[i].second_category=newlist
    //   }
    // }
    //
    // this.setState({
    //   course_modules:newcourse_modules
    // })

		if(result.source.droppableId==="shixun_homework"||result.source.droppableId==="graduation"||result.source.droppableId==="attachment"){

			let url ="/course_second_categories/"+result.draggableId+"/move_category.json";
			if(result.destination.index!=null){
				this.droppablepost(url,result.destination.index+1)
			}
		}else if(result.source.droppableId==="board"){

			let url ="/boards/"+result.draggableId+"/move_category.json";
			if(result.destination.index!=null) {
				this.droppablepost(url, result.destination.index + 1)
			}
		}else if(result.source.droppableId==="course_group"){
			if(result.draggableId!=1){
				let url ="/course_groups/"+result.draggableId+"/move_category.json";
				if(result.destination.index!=null) {
					this.droppablepost(url, result.destination.index + 1)
				}
			}
		}

  }

  hidesandian=(e,key)=>{
    this.setState({
      sandiantypes:undefined
    })
    e.stopPropagation();//阻止冒泡
  }

  showsandian=(e,key)=>{
    this.setState({
      sandiantypes:key
    })
    e.stopPropagation();//阻止冒泡
  }

  showsandians=(e,key,urls,num,id,type,index)=> {
    let {url}=this.state;
    if (key === this.props.indexs) {
      this.props.unlocationNavfun(undefined)
    } else {
			this.props.updataleftNavfun();
      this.props.unlocationNavfun(key)
    }
    if(urls!=url){
			this.props.updataleftNavfun();
    }
		this.setState({
			selectnavid:true,
			newselectnavid:id,
			url:urls,
			indexs:index
    })
    this.props.history.replace(urls);
    e.stopPropagation();//阻止冒泡
  }

  maincontent=(item,key)=>{
    return (  <div className={"sandianbox"}>
       {/*公告栏*/}
      {/*作业*/}
      {item.type==="shixun_homework"?<div onClick={e=>this.Navmodalnames(e,1,"shixun_homework",item.id)}>新建目录</div>:""}
      {/*资源*/}
      {item.type==="attachment"?<div onClick={e=>this.Navmodalnames(e,1,"attachment",item.id)}>新建目录</div>:""}
      {/*毕业设计*/}
      {/*{item.type==="graduation"?<div onClick={()=>this.Navmodalnames(1,"attachment",item.id)}>添加目录</div>:""}*/}
      {/*讨论区*/}
      {item.type==="board"?this.props.current_user&&this.props.current_user.course_is_end===true?"":<div onClick={e=>this.Navmodalnames(e,6,"board",item.main_id)}>新建目录</div>:""}
      {/*分班*/}
      {item.type==="course_group"?this.props.current_user&&this.props.current_user.course_is_end===true?"":<div onClick={e=>this.Navmodalnames(e,2,"course_group",item.id)}>新建分班</div>:""}
      {/*分班*/}
      {/*{item.type==="course_group"? :""}*/}
      <div onClick={e=>this.Navmodalnames(e,3,"editname",item.id,item.name)}>重命名</div>
      {/*online_learning*/}
      {/*{*/}
      {/*  this.props.isClassManagement()===true?*/}
      {/*    (*/}
      {/*      item.type==="online_learning"?*/}
      {/*        <div onClick={e=>this.Chapterediting(e,item.id,item.url)}>章节编辑</div>*/}
      {/*      :""*/}
      {/*    )*/}
      {/*    :""}*/}
      <div onClick={e=>this.edithidden(e,item.id)}>隐藏</div>
      <div onClick={e=>this.editSetup(e,item.id)}>置顶</div>
    </div>)
  }
  content=(item,iem,index)=>{
    let {twosandiantypes,twosandiantypenum}=this.state;
    return (item.type==="graduation"?"": <div className={item.type===twosandiantypes&&twosandiantypenum===index?"sandianboxs":"sandianboxs"} >
          {/*作业/资源*/}
          {item.type==="shixun_homework"||item.type==="attachment"||item.type==="graduation"?<div onClick={e=>this.Navmodalnames(e,4,"editSecondname",iem.category_id,iem.category_name)}>重命名</div>:""}
          {item.type==="shixun_homework"||item.type==="attachment"?<div onClick={e=>this.deleteSecondary(e,1,iem.category_id)}>删除</div>:""}
          {/*分班*/}
          {item.type==="course_group"?<div onClick={e=>this.Navmodalnames(e,5,"editSecondname",iem.category_id,iem.category_name)}>重命名</div>:""}
          {item.type==="course_group"?<div onClick={e=>this.deleteSecondary(e,2,iem.category_id)}>删除</div>:""}
          {/*讨论区*/}
          {item.type==="board"?<div onClick={e=>this.Navmodalnames(e,7,"editSecondname",iem.category_id,iem.category_name)}>重命名</div>:""}
          {item.type==="board"?<div onClick={e=>this.deleteSecondary(e,3,iem.category_id,item.category_url)}>删除</div>:""}
        </div>)
  };

  //章节编辑
  Chapterediting=(e,id,url)=> {
    e.stopPropagation();//阻止冒泡
    //页面刷新
    this.setState({
      chapterupdate:true,
    })
  };
  setchapterupdatefalse =()=>{
    this.setState({
      chapterupdate:false,
    })
  }
  render(){
     let {
       twosandiantype,
       Navmodalname,
       Navmodalnametype,
       NavmodalValue,
       ModalsType,
       Modalstopval,
       ModalsBottomval,
       ModalSave,
       loadtype,
       twosandiantypes,
       toopvisibleindexs
       }=this.state;

     let {course_modules,hidden_modules,is_teacher} =this.props;
    // console.log(this.props.location.pathname)
    // // console.log(item.category_url)
    // console.log(this.props.location.pathname)

    // console.log("778");
    // console.log("CoursesLeftNav");
    // console.log(course_modules);

    return(

         <ul className="mb10 newedu-class-leftnav">

           <Modals
             modalsType={ModalsType}
             modalsTopval={Modalstopval}
             modalsBottomval={ModalsBottomval}
             modalSave={ModalSave}
             modalCancel={this.cannerNavmoda}
             loadtype={loadtype}
						 antIcon={this.state.antIcon}
           >
           </Modals>

           {/*{*/}
           {/*  this.state.chapterupdate===true?*/}
           {/*    <div>*/}
           {/*      <style>*/}
           {/*        {*/}
           {/*          `*/}
           {/*      .ant-modal-body{*/}
           {/*         padding-left: 33px !important;*/}
           {/*         padding-right: 33px !important;*/}
           {/*         padding-top: 27px !important;*/}
           {/*         padding-bottom: 21px !important;*/}
           {/*        }*/}
           {/*    `*/}
           {/*        }*/}
           {/*      </style>*/}
           {/*    <MyEduChapterupdate  {...this.props} {...this.state} chapterupdate={this.state.chapterupdate} setchapterupdatefalse={this.setchapterupdatefalse}>*/}
           {/*    </MyEduChapterupdate>*/}
           {/*    </div>*/}
           {/*    :*/}
           {/*    ""*/}
           {/*}*/}

           {
             Navmodalnametype===true?<style>
               {
                 `
              body {
							  overflow: hidden !important;
							}
              `
               }
             </style>:""
           }
           <Modal
             keyboard={false}
             title={Navmodalname}
             visible={Navmodalnametype}
             className={"Navmodal"}
             closable={false}
             footer={null}
             destroyOnClose={true}
             centered={true}
           >
             <div className="df">
                <div className={"fl mt5"}>{this.state.Navtitles}：</div>
                <Input placeholder={this.state.Navplaceholder}
                    className={"input-flex-35 greyInput fl"}
                    maxLength="60"
                    value={NavmodalValue}
                    onInput={this.setNavmodalValue}
                />
             </div>
						 <style>
							 {
							 	`
							 	.ml70{
    							margin-left: 70px;
							 	}
							 	`
							 }
						 </style>
             {this.state.NavmodalValuetype===true?<span className={"ml70 color-red"}>
                 {this.state.NavmodalValues}
             </span>:""}
             <div className={this.state.NavmodalValuetype===true?"clearfix mt20 edu-txt-center":"clearfix mt50 edu-txt-center"}>
               <a  className="task-btn mr30" onClick={this.cannerNavmoda}>取消</a>
               <a className="task-btn task-btn-orange" onClick={this.saveNavmoda}>确定</a>
             </div>
           </Modal>
           <style>
             {`
              // .activity-left-name{
              //    width: 100%;
              //   }
                .droppableul{
                  max-height: 500px;
                  overflow-y:auto;
                  overflow-x:hidden;
                }

                .mr13{
                margin-right:13px;
                }
             `}
           </style>
           { is_teacher===true?
                  course_modules===undefined?"":course_modules.map((item,key)=>{
                    return(
                        <div key={key} 	>
                            <a>
																<li title={item.name.length<7?"":item.name} onClick={(e)=>this.showsandians(e,key,item.category_url,1,item.id,item.type)} className={this.props.mainurl===item.category_url&&this.props.location.pathname===item.category_url?"liactive":"clearfix active"} onMouseLeave={(e)=>this.hidesandian(e,key)} onMouseEnter={(e)=>this.showsandian(e,key)}>
																	<a onClick={(e)=>this.showsandians(e,key,item.category_url,1,item.id,item.type)} className={ item.second_category===undefined?"fl ml20 pd0":item.second_category.length===0?"fl ml20 pd0":this.state.sandiantypes===key?"fl ml20 pd0 ebebeb":"fl ml20 pd0"}>
																		{
																			item.type==="announcement"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-xiaoxi1 mr10 fl":"iconfont icon-xiaoxi1 mr10 fl"}></i>:
																				item.type==="online_learning"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-kecheng mr10 fl font-16":"iconfont icon-kecheng mr10 fl font-16"}></i>:
																					item.type==="shixun_homework"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-daima mr10 fl":"iconfont icon-daima mr10 fl"}></i>:
																						item.type==="common_homework"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-putongzuoye mr10 fl":"iconfont icon-putongzuoye mr10 fl"}></i>:
																							item.type==="group_homework"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-fenzuzuoye mr10 fl":"iconfont icon-fenzuzuoye mr10 fl"}></i>:
																								item.type==="graduation"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-biyezhuanhuan mr10 fl":"iconfont icon-biyezhuanhuan mr10 fl"}></i>:
																									item.type==="exercise"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-shijuan mr10 fl":"iconfont icon-shijuan mr10 fl"}></i>:
																										item.type==="poll"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-wenjuan mr10 fl":"iconfont icon-wenjuan mr10 fl"}></i>:
																											item.type==="attachment"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-ziyuan mr10 fl":"iconfont icon-ziyuan mr10 fl"}  ></i>:
																												item.type==="board"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-taolun mr10 fl":"iconfont icon-taolun mr10 fl"}  ></i>:
																													item.type==="course_group"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-fenban mr10 fl":"iconfont icon-fenban mr10 fl"}  ></i>:
																														item.type==="statistics"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-tongji mr10 fl":"iconfont icon-tongji mr10 fl"}  ></i>:
																														item.type==="video"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-bofang2 mr10 fl":"iconfont icon-bofang2 mr10 fl"}  ></i>:""
																		}

																		{/*||this.props.location.pathname===this.state.url&&key===this.state.indexs*/}

																		<span className={this.props.location.pathname===item.category_url?"color-blue task-hide activity-left-name":"task-hide activity-left-name"}
																					onClick={(e)=>this.selectnavid(e,key,item.id,item.type,item.category_url)}
																		>{item.name}</span>

																		{/*className={sandiantype===undefined?item.task_count===0?"fr mr10 colortransparent":"fr mr10 color999 font-14":sandiantype===key?"none":item.task_count===0?"none":"fr mr10 color999 font-14"}*/}
																		<span className={this.state.sandiantypes===key?"none":this.props.location.pathname===item.category_url?"color-blue fr mr25 font-14":"fr mr25 color999 font-14"} >{item.task_count===0?"":item.task_count}</span>
																		{/*<i className={this.state.sandiantypes===key?"iconfont icon-sandian mr5 fr color999":"none"} onMouseEnter={(e)=>this.sandianshow(e,key)}></i>  */}

																		{this.state.sandiantypes===key?<Popover placement="right" content={this.maincontent(item,key)} trigger="hover" key={key}>

																			<i className={"iconfont icon-sandian mr20 fr color999"}></i>

																		</Popover>:""}
																	</a>
																</li>

                            {/*下拉列表*/}

                              {/* 可拖拽选择实训列表*/}
                              {/*className={this.props.location.pathname===item.category_url||this.props.location.pathname===this.state.url&&key===this.state.indexs?"TabsWarps":"TabsWarps"}*/}
                              {
                                  <DragDropContext onDragEnd={this.onDragEnd} >
                                      <Droppable droppableId={item.type}>
                                          {(provided, snapshot) => (
                                              <ul
                                              ref={provided.innerRef}
                                              {...provided.droppableProps}
                                              className={"droppableul"}
                                              style={{display: key===this.props.indexs?"":"none"}}
                                              >
                                                  {item.second_category===undefined?"":item.second_category.map((iem,index)=>{
                                                    if(item.type==="course_group"){
                                                      if(iem.category_name==="未分班"){
                                                        if(iem.category_count===0){
                                                          return
                                                        }
                                                      }
                                                    }
                                                    // console.log(iem.category_name);
                                                    // console.log(iem.category_name.length);
                                                  return(
                                                      <Draggable
                                                      key={'id'+index}
                                                      draggableId={iem.category_id===0?index+1:iem.category_id}
                                                      index={index}
                                                      className={"TabsWarps"}
                                                      >
                                                          {(provided, snapshot) => (
                                                            <Tooltip placement="bottom" title={"拖拽二级菜单调整顺序"}
                                                                     key={index}
                                                                      // visible={toopvisible===true&&toopvisibleindex===iem.category_id?true:false}
                                                                     visible={false}
                                                            >
                                                              {/*"/courses/"+this.props.match.params.coursesId+"/"+item.type+"/"+iem.category_type+"/"+iem.category_id*/}
                                                              <a  className={"Draggablelichild"} key={index}>
                                                                <li className="clearfix width93 Draggableli" key={index} onClick={(e)=>this.selectnavids(e,key,iem.category_id,item.type+"child",iem.second_category_url,key)}  onMouseLeave={(e)=>this.twosandianhide(e,index,item.type)} onMouseEnter={(e)=>this.twosandianshow(e,index,item.type)}
                                                              key={index}
                                                              ref={provided.innerRef}
                                                              {...provided.draggableProps}
                                                              {...provided.dragHandleProps}
																														  // title={iem.category_name.length<10?"":iem.category_name}
                                                              >
                                                                <a className="fl pl46 pd0  Draggablelichild">
                                                                  <span className={this.props.location.pathname===iem.second_category_url?"color-blue fl ml38 maxwidth170 task-hide  Draggablelichild":"fl ml38 maxwidth170 task-hide  Draggablelichild"} onMouseEnter={(e)=>this.twosandianshowys(e,index,item.type)}>{iem.category_name}</span>

                                                                  <span className={twosandiantype===undefined?this.props.location.pathname===iem.second_category_url?"fr mr20 color-blue Draggablelichild font-14":"fr mr20 color999  Draggablelichild font-14":item.type===twosandiantypes&&twosandiantype===index&&iem.category_id!=0?"none":this.props.location.pathname===iem.second_category_url?"fr mr20 color-blue Draggablelichild font-14":"fr mr20 color999  Draggablelichild font-14"} >{iem.category_count===0?"":iem.category_count}</span>
                                                                  {item.type===twosandiantypes&&twosandiantype===index?
																																		iem.category_id===0?"":
                                                                    iem.category_type==="graduation_topics"||iem.category_type==="graduation_tasks"?
                                                                      (
                                                                        iem.category_name&&iem.category_name.length<13?
                                                                          <span className={"fr mr20 color999  Draggablelichild font-14"} >{iem.category_count===0?"":iem.category_count}</span>
                                                                          :
                                                                          <Tooltip placement="right" key={index} title={iem.category_name}  visible={toopvisibleindexs===undefined?false:toopvisibleindexs===index?true:false}>
                                                                            <span className={"fr mr20 color999  Draggablelichild font-14"} >{iem.category_count===0?"":iem.category_count}</span>
                                                                          </Tooltip>
                                                                      )
                                                                      :
                                                                      (
                                                                        iem.category_name&&iem.category_name.length<13?
                                                                          <Popover placement="right" content={this.content(item,iem,index)} trigger="hover" key={index} onMouseEnter={(e)=>this.twosandianshowyss(e)}>
                                                                            <i className={"iconfont icon-sandian fr color999 mr15 Draggablelichild"}></i>
                                                                          </Popover>
                                                                       :
                                                                        <Tooltip placement="right" key={index} title={iem.category_name}  visible={toopvisibleindexs===undefined?false:toopvisibleindexs===index?true:false}>
                                                                        <Popover placement="right" content={this.content(item,iem,index)} trigger="hover" key={index} onMouseEnter={(e)=>this.twosandianshowyss(e)}>
                                                                        <i className={"iconfont icon-sandian fr color999 mr15 Draggablelichild"}></i>
                                                                        </Popover>
                                                                        </Tooltip>
                                                                      )
                                                                    :""}
                                                                </a>
                                                                  {provided.placeholder}

                                                              </li>

                                                              </a>
                                                            </Tooltip>
                                                          )}
                                                      </Draggable>
                                                  )})}
                                              </ul>
                                          )}
                                      </Droppable>
                                  </DragDropContext>
                              }
                            </a>

                        </div>
                     )
                    })

                : course_modules===undefined?"":course_modules.map((item,key)=>{

               return(
                 <div key={key}>
                   {/*<Tooltip placement="bottom" title={"点击空白处展开二级菜单，点击模块名字跳转到对应模块"}>*/}
                   <a>

											 <li className={this.props.mainurl===item.category_url&&this.props.location.pathname===item.category_url?"liactive":"clearfix active"}
													 onClick={(e)=>this.setnavid(e,key,item.id,item.type,item.category_url)} onMouseEnter={(e)=>this.showsandian(e,key)}
													 title={item.name.length<7?"":item.name}
											 >
												 <a className={ item.second_category===undefined?"fl ml20 pd0":item.second_category.length===0?"fl ml20 pd0":this.state.sandiantypes===key?"fl ml20 pd0 ebebeb":"fl ml20 pd0"}>
													 {
														 item.type==="announcement"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-xiaoxi1 mr10 fl":"iconfont icon-xiaoxi1 mr10 fl"}></i>:
															 item.type==="online_learning"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-kecheng mr10 fl font-16":"iconfont icon-kecheng mr10 fl font-16"}></i>:
																 item.type==="shixun_homework"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-daima mr10 fl":"iconfont icon-daima mr10 fl"}></i>:
																	 item.type==="common_homework"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-putongzuoye mr10 fl":"iconfont icon-putongzuoye mr10 fl"}></i>:
																		 item.type==="group_homework"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-fenzuzuoye mr10 fl":"iconfont icon-fenzuzuoye mr10 fl"}></i>:
																			 item.type==="graduation"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-biyezhuanhuan mr10 fl":"iconfont icon-biyezhuanhuan mr10 fl"}></i>:
																				 item.type==="exercise"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-shijuan mr10 fl":"iconfont icon-shijuan mr10 fl"}></i>:
																					 item.type==="poll"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-wenjuan mr10 fl":"iconfont icon-wenjuan mr10 fl"}></i>:
																						 item.type==="attachment"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-ziyuan mr10 fl":"iconfont icon-ziyuan mr10 fl"}  ></i>:
																							 item.type==="board"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-taolun mr10 fl":"iconfont icon-taolun mr10 fl"}  ></i>:
                                                 item.type==="course_group"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-fenban mr10 fl":"iconfont icon-fenban mr10 fl"}  ></i>:

                                                 item.type==="video"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-bofang2 mr10 fl":"iconfont icon-bofang2 mr10 fl"}  ></i>:
														 												item.type==="statistics"?<i className={this.props.location.pathname===item.category_url?"color-blue iconfont icon-tongji mr10 fl":"iconfont icon-tongji mr10 fl"}  ></i>:""
													 }

													 <span className={this.props.location.pathname===item.category_url?"color-blue task-hide activity-left-name":"task-hide activity-left-name"} onClick={(e)=>this.selectnavid(e,key,item.id,item.type,item.category_url)}>{item.name}</span>
													 <span className={this.props.location.pathname===item.category_url?"color-blue fr mr20 font-14":"fr mr20 color999 font-14"}>{item.task_count===0?"":item.task_count}</span>

												 </a>
											 </li>
                   </a>

                   <ul style={{display:key===this.props.indexs?"":"none"}} class="droppableul">

                     {
                       item.second_category===undefined?"":item.second_category.map((iem,index)=>{
                         if(item.type==="course_group"){
                           if(iem.category_name==="未分班"){
                             if(iem.category_count===0){
                               return
                             }
                           }
                         }
                         // console.log(iem.category_name);
                         // console.log(iem.category_name.length);一开始是10 显示是13
                         return(
                           <a >
                             {/*title={iem.category_name.length<10?"":iem.category_name}*/}

                             <li className="clearfix Draggableli" key={index} style={{ width: '244px'}}  >
                               {
                                   iem.category_name&&iem.category_name.length<13?
                                       <a className="fl pl46 pd0 Draggablelichild" onClick={(e)=>this.selectnavids(e,key,iem.category_id,item.type+"child",iem.second_category_url,key)} >
                                         {/*<span className="fl ml38 maxwidth170 task-hide">{iem.category_name}</span>*/}
                                         {/*{iem.category_name.length<10?"":*/}
                                         {/*  iem.category_name}*/}
                                         <span className={this.props.location.pathname===iem.second_category_url?"color-blue fl ml38 maxwidth170 task-hide  Draggablelichild":"fl ml38 maxwidth170 task-hide  Draggablelichild"}>{iem.category_name}</span>
                                         <span className={twosandiantype===undefined?this.props.location.pathname===iem.second_category_url?"fr mr20 color-blue font-14":"fr mr20 color999 font-14":twosandiantype===index&&item.type!="graduation"?"none":this.props.location.pathname===iem.second_category_url?"fr mr20 color-blue font-14":"fr mr20 color999 font-14"}>{iem.category_count===0?"":iem.category_count}</span>
                                       </a>
                                     :
                                     <Tooltip placement="right" key={index} title={iem.category_name}>
                                       <a className="fl pl46 pd0 Draggablelichild" onClick={(e)=>this.selectnavids(e,key,iem.category_id,item.type+"child",iem.second_category_url,key)} >
                                         {/*<span className="fl ml38 maxwidth170 task-hide">{iem.category_name}</span>*/}
                                         {/*{iem.category_name.length<10?"":*/}
                                         {/*  iem.category_name}*/}
                                         <span className={this.props.location.pathname===iem.second_category_url?"color-blue fl ml38 maxwidth170 task-hide  Draggablelichild":"fl ml38 maxwidth170 task-hide  Draggablelichild"}>{iem.category_name}</span>
                                         <span className={twosandiantype===undefined?this.props.location.pathname===iem.second_category_url?"fr mr20 color-blue font-14":"fr mr20 color999 font-14":twosandiantype===index&&item.type!="graduation"?"none":this.props.location.pathname===iem.second_category_url?"fr mr20 color-blue font-14":"fr mr20 color999 font-14"}>{iem.category_count===0?"":iem.category_count}</span>
                                       </a>
                                     </Tooltip>
                               }
                               </li>

                           </a>
                         )
                       })
                     }
                   </ul>

                 </div>
               )
             })
           }

              </ul>


      )
    }
}
export default Coursesleftnav;


