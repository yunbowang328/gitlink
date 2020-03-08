import React,{ Component } from "react";
import { Input, Checkbox, Table, Tooltip, Pagination,Spin } from "antd";
import { WordsBtn,on, off, trigger ,getUrl} from 'educoder';
import axios from 'axios';
import Modals from '../../modals/Modals';
import Sendtofilesmodal from "../coursesPublic/SendToFilesModal";
import Selectresource from "../coursesPublic/SelectResource";
import Sendresource from "../coursesPublic/sendResource";
import Selectsetting from "../coursesPublic/SelectSetting";
import HomeworkModal from "../coursesPublic/HomeworkModal";
import Fileslistitem from './Fileslistitem';
import Titlesearchsection from '../common/titleSearch/TitleSearchSection';
import NoneData from "../coursesPublic/NoneData";
import _ from 'lodash'
import './style.css';
import '../css/members.css';
import moment from 'moment';
class Fileslists extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchValue: '',
      checkAllValue: false,
      checkBoxValues: [],
      total_count: 0,
      page: 1,
      pagesize: 15,
      tagname:undefined,
      search:undefined,
      sort:"desc",
      sorttype:"created_on",
      coursesecondcategoryid:undefined,
      filesId:undefined,
      name:"",
      sendTotype:false,
      Accessoryvisible:false,
      discussMessageid:undefined,
      course_modules:undefined,
      has_course_groups:false,
      course_is_public:undefined,
      isSpin:false,
			course_second_categories:[]
    }
  }


  getcourse_groupslists=()=>{
		let coursesId=this.props.match.params.coursesId;
		let url="/courses/"+coursesId+"/all_course_groups.json";
		axios.get(url).then((response) => {
			if(response.status===200){
				this.setState({
					course_groups:response.data.course_groups
				})
			}
		}).catch((error) => {
			console.log(error)
		});
	}
  componentDidMount=()=>{
  	this.getcourse_groupslists()
    this.setState({
      isSpin:true,
			checkBoxValues:[],
			checkAllValue:false
    })

    if(this.props.match.params.main_id){
      this.setState({
         child:false,
				 sort:"desc"
			})
			this.seactall(undefined,"desc");
    }else if(this.props.match.params.Id){
			this.setState({
				child:true,
				sort:"desc"
			})
			this.seactall(parseInt(this.props.match.params.Id),"desc")
    }
    this.updadatalist();
		on('updateNavSuccess', this.updateNavSuccess)
		on('updateNavSuccess',this.updadatalist)
  }

	updateNavSuccess=()=>{
  	let{sort}=this.state;
		this.setState({
			isSpin:true
		})
		if(this.props.match.params.main_id){
			this.seactall(undefined,sort);
		}else if(this.props.match.params.Id){
			this.seactall(parseInt(this.props.match.params.Id),sort)
		}
	}
  componentDidUpdate = (prevProps) => {
    if(prevProps.match.params.main_id != this.props.match.params.main_id){
			this.getcourse_groupslists()
			this.setState({
				isSpin:true,
				checkBoxValues:[],
				checkAllValue:false,
			})
      if(this.props.match.params.main_id!=undefined){
				this.setState({
					child:false,
					sort:"desc"
				})
        this.seactall(undefined,"desc");
      }
    }
    if(prevProps.match.params.Id != this.props.match.params.Id){
			this.getcourse_groupslists()
			this.setState({
				isSpin:true,
				checkBoxValues:[],
				checkAllValue:false,
			})
      if(this.props.match.params.Id!=undefined){
				this.setState({
					child:true,
					sort:"desc"
				})
        this.seactall(parseInt(this.props.match.params.Id),"desc")
      }
    }
  }

  updadatalist=(id)=>{
    // this.seactall(id)
		if(this.props.user&&this.props.user.login=== ""||this.props.user&&this.props.user.login=== null||this.props.user&&this.props.user.login=== undefined){

		}else{
			let coursesId=this.props.match.params.coursesId;
			let url="/courses/"+coursesId+"/attahcment_category_list.json";
			axios.get(url, {
			}).then((response) => {
				if(response!=undefined){

					if(response.data&&response.data) {
						if (response.data.status != 401) {
							let list = response.data.course_modules;
							let course_second_categoriess;
							list.map((item, key) => {
								course_second_categoriess = item.course_second_categories
							})

							this.setState({
								course_modules: response.data,
								has_course_groups: response.data.has_course_groups,
								course_second_categories: course_second_categoriess
							})
						}
					}

				}

			})
		}

  }
  updatafiled=()=>{
		let{sort}=this.state;
		if(this.props.match.params.main_id){
			this.seactall(undefined,sort);
		}else if(this.props.match.params.Id){
			this.seactall(parseInt(this.props.match.params.Id),sort)
		}
	}
  seactall=(coursesecondcategoryid,sort)=>{

    this.setState({
      coursesecondcategoryid:coursesecondcategoryid,
      isSpin:true
    })

    let{pagesize,page,tagname,searchValue,sorttype}=this.state;
    this.getfileslist(pagesize,page,tagname,searchValue,sort,sorttype,coursesecondcategoryid);
  }

  onSortTypeChange=(sorttype)=>{
    let{pagesize,page,tagname,searchValue,sort,coursesecondcategoryid,}=this.state;
    let newsort="desc";
    if(sort==="desc"){
			this.setState({
				sorttype:sorttype,
				sort:"asc"
			})
			newsort="asc"
		}else{
			this.setState({
				sorttype:sorttype,
				sort:"desc"
			})
			newsort="desc"
		}

    this.getfileslist(pagesize,page,tagname,searchValue,newsort,sorttype,coursesecondcategoryid);
  }

  getfileslist=(pagesize,page,tagname,searchValue,sort,sorttype,coursesecondcategoryid)=>{

    let url = "/files.json";
    const courseid = this.props.match.params.coursesId;
    let id=coursesecondcategoryid;

    axios.get(url,{
      params:{
        course_id:courseid,
        page_size:pagesize,
        page:page,
        tag_name:tagname,
        search:searchValue,
        sort:sort==="desc"?0:1,
        sort_type:sorttype,
        course_second_category_id:id
      }
    }).then((result)=>{
     if(result!=undefined){
			 if(result.status===200){
				 if(result.data.status===0){
					 let list=result.data.data;
					 this.setState({
						 total_count:list.total_count,
						 publish_count:list.publish_count,
						 unpublish_count:list.unpublish_count,
						 files:list.files,
						 filesId:list.id,
						 name:list.name,
						 course_is_public:result.data.data.course_is_public,
						 isSpin:false,
             page:page
					 })
				 }
			 }
		 }else{
     	this.setState({
				isSpin:false
			})
		 }
    }).catch((error)=>{
      console.log(error)
      this.setState({
        isSpin:false
      })
    })
  }

  cancelmodel=()=>{

    this.setState({
      Modalstype:false,
      Loadtype:false,
      Modalstopval:"",
      ModalCancel:"",
      ModalSave:"",
      checkBoxValues:[],
    })

  }

  testonSelect=()=>{

    let {checkBoxValues,checkAllValue}=this.state;

    if(checkAllValue===false){
      if(checkBoxValues.length===0){
        return true
      }
    }

  }

  noSelect=(value)=>{

    // this.setState({
    //   Modalstype:true,
    //   Loadtype:true,
    //   Modalstopval:"请选择你要操作的任务",
    //   ModalSave:this.cancelmodel,
    // })
   if(value===1){
     this.props.showNotification("请先在列表中选择要删除的资源");
   }else if(value===2){
     this.props.showNotification("请先在列表中选择要发送的资源");
   }else if(value===3){
     this.props.showNotification("请先在列表中选择要公开的资源");
   }else if(value===4){
		 this.props.showNotification("请先在列表中选择要发布的资源");
	 }
  }

  onDelete = () => {

    let selectnum= this.testonSelect();
    if(selectnum===true){
      this.noSelect(1);
      return
    }

    this.setState({
      Modalstype:true,
      Modalstopval:"是否确认删除?",
      ModalCancel:this.cancelmodel,
      ModalSave:this.savedelete,
    })

  }

  savedelete=()=>{

    this.setState({
      Modalstype:false,
    })
    let {checkBoxValues} = this.state;

    const cid = this.props.match.params.coursesId
    const url = `/files/bulk_delete.json`;
    axios.delete(url, { data: {
        course_id:cid,
        ids: checkBoxValues,
      }})
        .then((response) => {
          if (response.data.status == 0) {
            //Modalstopval:response.data.message,
						this.updatafiled()
            this.setState({
              // Modalstype:true,
              // Modalstopval:"删除成功",
              ModalsBottomval:"",
              // ModalSave:this.cancelmodel,
              // Loadtype:true,
              checkBoxValues:[],
              checkAllValue:false
            })
            this.props.showNotification("删除成功");
						this.props.updataleftNavfun()
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  onSend= () => {
    let selectnum= this.testonSelect();
    if(selectnum===true){
      this.noSelect(2);
      return
    }
    this.setState({
      sendTotype:true
    })
    this.refs.sendToCourseModal.setVisible(true)

  }

  gobackonSend=(message)=>{
    this.setState({
      Modalstype:true,
      Modalstopval:message,
      ModalsBottomval:"",
      ModalSave:this.cancelmodel,
      Loadtype:true,
      checkBoxValues:[],
      checkAllValue:false
    })
  }


  onOpen= () => {
    let selectnum= this.testonSelect();
    if(selectnum===true){
      this.noSelect(3);
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
    this.setState({
      Modalstype:false,
    })

    let {checkBoxValues,sort} = this.state;

    const cid = this.props.match.params.coursesId;
    let url="/files/bulk_public.json";
    axios.put(url, {
      course_id:cid,
      ids: checkBoxValues,
    })
        .then((response) => {
          if (response.data.status == 0) {
   				  this.updatafiled()
            //:response.data.message
            this.props.showNotification("更新成功");
            this.setState({
              // Modalstype:true,
              // Modalstopval:"更新成功",
              ModalsBottomval:"",
              ModalSave:this.cancelmodel,
              // Loadtype:true,
              checkBoxValues:[],
              checkAllValue:false
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        });

  }

  onPressEnter = () => {
    let {searchValue}=this.state;
    let{pagesize,page,tagname,sort,sorttype,coursesecondcategoryid}=this.state;
    this.getfileslist(pagesize,1,tagname,searchValue,sort,sorttype,coursesecondcategoryid);
  }

  onInputSearchChange = (e) => {
    this.setState({
      searchValue:e.target.value
    })
  }

  addDir = () => {
    let {filesId,course_modules}=this.state;
    this.setState({
			checkBoxValues:[]
		})
		if(parseInt(this.props.match.params.main_id)!=parseInt(this.props.coursesids)){
			trigger('attachmentAddlog', parseInt(		course_modules&&course_modules.course_modules[0].id))
		}else{
			trigger('attachmentAddlog', parseInt(filesId))
		}

  }

  editDir = (name) => {
    let {filesId}=this.state;
		this.setState({
			checkBoxValues:[]
		})
    let data={id:parseInt(filesId),name:name}
    trigger('flieseditDir', data)
  }

  onCheckAll = (e) => {

    let {files,checkBoxValues,page} =this.state;

    this.setState({
      checkAllValue:e.target.checked,
      selectpage:page
    })
    this.setState({
      checkAllValue:e.target.checked,
      selectpage:page
    })
    let checkBoxValuess=[];
    if(e.target.checked===true){
      for (var list of checkBoxValues){
        checkBoxValuess.push(list)
      }
      for(var value of files){
        checkBoxValuess.push(value.id)
      }
      checkBoxValuess=[...new Set(checkBoxValuess)]
      if(checkBoxValuess.length>15){
        this.onselectfifteen()
        return
      }

      this.setState({
        checkBoxValues:checkBoxValuess
      })
    }else if(e.target.checked===false){
      this.setState({
        checkBoxValues:checkBoxValuess
      })
    }

  }


  onselectfifteen = () => {
    this.setState({
      Modalstype:true,
      Modalstopval:"选择条数不能大于15条",
      ModalSave:this.cancelmodel,
      Loadtype:true
    })
  }

  onCheckBoxChange = (checkedValues) => {
    let {checkBoxValues,checkAllValue,files} =this.state;
    let type=checkAllValue
    if(checkedValues.length<files.length){
      type=false
    }else if(checkedValues.length===files.length){
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

	onItemClick = (item) => {
		const checkBoxValues = this.state.checkBoxValues.slice(0);
		const index = checkBoxValues.indexOf(item.id);
		if (index != -1) {
			_.remove(checkBoxValues, (listItem)=> listItem === item.id)
		} else {
			checkBoxValues.push(item.id);
		}
		this.onCheckBoxChange(checkBoxValues)
	}
  PaginationTask=(page)=>{

    let {search,order,selectpage,checkAllValue,checkBoxValues}=this.state;
    let selectpagetype=selectpage===page?true:false
    this.setState({
      page:page,
      checkAllValue:selectpagetype,
			checkBoxValues:[]
    })

    let{pagesize,tagname,searchValue,sort,sorttype,coursesecondcategoryid}=this.state;
    this.getfileslist(pagesize,page,tagname,searchValue,sort,sorttype,coursesecondcategoryid);

  }


  //选用资源
  addResource=()=>{
    this.setState({
      shixunmodal:true,
			checkBoxValues:[]
    })
  }

  hidecouseShixunModal=()=>{
    this.setState({
      shixunmodal:false
    })
  }

  //上传资源
  sendResources = () => {

    this.setState({
      Accessoryvisible:true,
			checkBoxValues:[]
    })

  }

  Cancelvisible=()=>{

    this.setState({
      Accessoryvisible:false,
      Settingtype:false
    })

  }

  Settingtypes=(id)=>{
    this.setState({
      Settingtype:true,
      discussMessageid:id
    })
  }

  moveTos=(id)=>{

    let {checkBoxValues} = this.state;
    if(checkBoxValues.length===0){
      this.props.showNotification('请先在列表中选择要移动的资源')
      return
    }
    const cid = this.props.match.params.coursesId;
    const url = `/files/bulk_move.json`
    axios.put(url, {
      course_id: cid,
      ids:checkBoxValues,
      to_category_id:id
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

            this.props.showNotification('资源移动成功')
						this.props.updataleftNavfun()
						this.updatafiled()
          }
        })
  }

	homeworkstart=()=>{
		let selectnum= this.testonSelect();
		if(selectnum===true){
			this.noSelect(4);
			return
		}
		let starttime= this.props.getNowFormatDates(1);
		let endtime=this.props.getNowFormatDates(2);

		this.setState({
			modalname:"立即发布",
			modaltype:this.state.course_groups===null||this.state.course_groups.length===0?2:1,
			visible:true,
			typs:"end",
			Topval:"学生将能立即收到资源",
			// Botvalleft:"暂不发布",
			// Botval:`本操作只对"未发布"的分班有效`,
			// starttime:"发布时间："+moment(moment(new Date())).format("YYYY-MM-DD HH:mm"),
			// starttimes:starttime,
			// endtime:"截止时间："+endtime,
			Cancelname:"暂不发布",
			Savesname:"立即发布",
			Cancel:this.homeworkhide,
			Saves:this.homeworkstartend,
			course_groups:this.state.course_groups,
		})

	}
	// 立即发布
	homeworkstartend=(ds,endtime)=>{
		let {checkBoxValues}=this.state;
		let coursesId=this.props.match.params.coursesId;
		let url ="/files/bulk_publish.json";
		axios.put(url, {
			course_id:coursesId,
			group_ids:ds,
			ids	:checkBoxValues,
		}).then((result)=>{
			if(result.status===200){
				this.props.showNotification("发布成功")
				this.setState({
					checkBoxValues:[],
					checkAllValue:false
				})
				this.homeworkhide()
				this.props.updataleftNavfun()
				this.updatafiled()
			}
		}).catch((error)=>{
			console.log(error);
		})
	}


	homeworkhide=()=>{
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
		})
	}

	getcourse_groupslist=(id)=>{
		this.setState({
			course_groupslist:id
		})
	}
  render(){
    let { searchValue,
      checkBoxValues,
      checkAllValue,
      total_count,
			publish_count,
			unpublish_count,
      files,
      sorttype,
      Modalstype,
      Modalstopval,
      ModalCancel,
      ModalSave,
      ModalsBottomval,
      Loadtype,
      page,
      name,
      sendTotype,
      Accessoryvisible,
      Settingtype,
      discussMessageid,
      course_modules,
      shixunmodal,
      course_is_public,
			filesId,
			child,
			sort
    } = this.state;
    let category_id= this.props.match.params.category_id;


		// console.log(this.state.course_groups)
    return(
        <React.Fragment >

					{/*立即发布*/}
					{this.state.visible===true?<HomeworkModal
						category_id={this.props.match.params.category_id}
						modaltype={this.state.modaltype}
						modalname={this.state.modalname}
						visible={this.state.visible}
						Topval={this.state.Topval}
						Topvalright={this.state.Topvalright}
						Botvalleft={this.state.Botvalleft}
						Botval={this.state.Botval}
						starttime={this.state.starttime}
						starttimes={this.state.starttimes}
						typs={this.state.typs}
						endtime={this.state.endtime}
						Cancelname={this.state.Cancelname}
						Savesname={this.state.Savesname}
						Cancel={this.state.Cancel}
						Saves={this.state.Saves}
						// course_groups={this.state.course_groups}
					/>:""}

          {/*发送*/}
          <Sendtofilesmodal
              ref="sendToCourseModal"
              {...this.props}
              moduleName="资源"
              url={"/files/bulk_send.json"}
              gobackonSend={(value)=>this.gobackonSend(value)}
              sendTotype={sendTotype}
              selectedMessageIds={checkBoxValues}
              cancelmodel={()=>this.cancelmodel()}
          ></Sendtofilesmodal>

          {/*提示*/}
          {Modalstype&&Modalstype===true?<Modals
              modalsType={Modalstype}
              modalsTopval={Modalstopval}
              modalCancel={ModalCancel}
              modalSave={ModalSave}
              modalsBottomval={ModalsBottomval}
              loadtype={Loadtype}
          />:""}
          {
            shixunmodal===true||Accessoryvisible===true||Settingtype===true?<style>
              {
                `
              body {
							  overflow: hidden !important;
							}
              `
              }
            </style>:""
          }
          {/*选择资源*/}
          {shixunmodal&&shixunmodal===true?<Selectresource
              {...this.props}
							{...this.state}
              visible={this.state.shixunmodal}
              shixunmodallist={this.state.shixunmodallist}
              newshixunmodallist={this.state.newshixunmodallist}
              coursesId={this.props.match.params.coursesId}
              patheditarry={this.state.patheditarry}
              coursesecondcategoryid={this.state.coursesecondcategoryid}
              hidecouseShixunModal={this.hidecouseShixunModal}
              setupdate={(id)=>this.seactall(id,sort)}
              attachmentId={this.state.coursesecondcategoryid}
          />:""}


          {/*上传资源*/}
          {Accessoryvisible&&Accessoryvisible===true?<Sendresource
              {...this.props}
							{...this.state}
              modalname={"上传资源"}
              visible={Accessoryvisible}
              Cancelname={"取消"}
              Savesname={"确认"}
              Cancel={this.Cancelvisible}
              categoryid={category_id}
              setupdate={(id)=>this.seactall(id,sort)}
              has_course_groups={this.state.has_course_groups}
              attachmentId={this.state.coursesecondcategoryid}
          />:""}
 					{/*设置资源*/}
          {Settingtype&&Settingtype===true?<Selectsetting
              {...this.props}
							{...this.state}
              Settingtype={Settingtype}
              discussMessageid={discussMessageid}
              course_id={this.props.match.params.coursesId}
              setupdate={(id)=>this.seactall(id,sort)}
              Cancel={this.Cancelvisible}
              has_course_groups={this.state.has_course_groups}
							attachmentId={this.state.coursesecondcategoryid}
          />:""}
						{child===false?"":<style>
							{
								`
								 .filesnameslist{
										max-width: 486px;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
								 }
								`
							}
						</style>}
            <Titlesearchsection
                title={child===false?"全部资源":name}
                searchValue={ searchValue }
                // searchtype={this.props.isAdmin||this.props.isStudent ?true:false}
                onInputSearchChange={this.onInputSearchChange}
                allowClearonChange={this.onInputSearchChange}
                firstRowRight={
                  <React.Fragment>
                    {/*{this.props.isAdmin()?parseInt(this.props.match.params.main_id)===parseInt(this.props.coursesids)?<WordsBtn style="blue" onClick={()=>this.addDir()} className={"mr30 font-16"}>新建目录</WordsBtn>:"":""}*/}
										{this.props.isAdmin()?<WordsBtn style="blue" onClick={()=>this.addDir()} className={"mr30 font-16"}>新建目录</WordsBtn>:""}
                    {this.props.isAdmin()?parseInt(this.props.match.params.main_id)!=parseInt(this.props.coursesids)?<WordsBtn style="blue" onClick={()=>this.editDir(name)} className={"mr30 font-16"}>目录重命名</WordsBtn>:"":""}

                    {this.props.isAdmin()||this.props.isStudent() ? this.props.user&&this.props.user.main_site===true? <WordsBtn style="blue" className="mr30 font-16" onClick={()=>this.addResource()}>选用资源</WordsBtn>:"":""}
                    {this.props.isAdmin()||this.props.isStudent() ? <WordsBtn style="blue" className=" font-16" onClick={()=>this.sendResources()}>上传资源</WordsBtn>:""}
                  </React.Fragment>
                }

                secondRowLeft={
                  <div style={{"display":"inline-block", "marginTop": "22px"}}>
                    <span>共 {total_count} 个资源</span>
                    <span style={{"marginLeft":"16px"}}>已发布：{publish_count}个</span>
                    <span style={{"marginLeft":"16px"}}>未发布：{unpublish_count}个</span>
                  </div>
                }
                onPressEnter={this.onPressEnter}
                searchPlaceholder={"请输入名称进行搜索"}
                showSearchInput={true}
            ></Titlesearchsection>

						{this.props.isAdmin()? files===undefined?'' :files.length===0? "":<div className="mt20 edu-back-white padding20-30" style={{display:this.props.isAdmin()||this.props.isStudent()?"":"none"}}>
              <div className="clearfix">
                {this.props.isAdmin()? <Checkbox className="fl" onChange={this.onCheckAll} checked={checkAllValue}>已选 {checkBoxValues.length} 个   （不支持跨页勾选）</Checkbox>:""}
                <div className="studentList_operation_ul">
                  {this.props.isAdmin()?<li className="li_line"><a href="javascript:void(0)" className="color-grey-9" onClick={this.onDelete}>删除</a></li>:""}
                  {this.props.isAdmin()?<li className="li_line"><a href="javascript:void(0)" className="color-grey-9" onClick={this.onSend}>发送</a></li>:""}
									{this.props.isAdmin()?
										<li className="li_line"><a href="javascript:void(0)" className="color-grey-9" onClick={this.homeworkstart}>立即发布</a></li>
										:""}
                  {this.props.isAdmin()?course_is_public===true?
                    <li className="li_line"><a href="javascript:void(0)" className="color-grey-9" onClick={this.onOpen}>设为公开</a></li>
                    :"":""}

                  {this.props.isAdmin()?<li className="li_line drop_down">
                    移动到...<i className="iconfont icon-xiajiantou font-12 ml2"></i>

                    <style>
                      { `
                  .drop_down_menu{
                    max-height:350px;
                    overflow-y: auto;
                   }
              
									 .courseSecond{
								    margin-left: 10px;
    								padding: 10px;
									 }
                  `}
                    </style>
                    <ul className="drop_down_menu" style={{"right":"0px","left":"unset","min-width":'150px'}}>
											{this.state.course_second_categories.length>10? <p className="drop_down_search">
                        <Input placeholder="搜索" value={this.state.dirSearchValue} onChange={(e) => {this.setState({dirSearchValue: e.target.value})}}/>
                      </p>:""}

                      {course_modules&&course_modules.course_modules.map((item,key)=>{
                        return(
													filesId&&filesId===item.id?"":<li key={key} id={item.id} onClick={() => this.moveTos(0)} title={item.module_name}>{item.module_name}</li>
                        )
                      })}

                      { course_modules&&course_modules.course_modules.map( (item,key) => {

                        return   item.course_second_categories.filter((item)=> {
                          return (!this.state.dirSearchValue || item.name.indexOf(this.state.dirSearchValue) != -1)
                        }).map((itm,k)=>{
                          return(
														filesId&&filesId===itm.id?"":<li key={k} id={itm.id} onClick={() => this.moveTos(itm.id )} title={itm.name}>{itm.name}</li>
                          )
                        })
                      })}
											{this.state.course_second_categories.length===0?
												<div className={"courseSecond"}>暂无数据</div>:""}

                      {/*{course_modules&&course_modules.course_modules.map((item,key)=>{*/}
                        {/*return(*/}
                            {/*item.course_second_categories.map((itm,k)=>{*/}
                              {/*return(*/}
                                  {/*<li key={k} id={itm.id} onClick={() => this.moveTos(itm.id )}>{itm.name}</li>*/}
                              {/*)*/}
                            {/*})*/}
                        {/*)*/}
                      {/*})}*/}
                      {this.props.isAdmin()?parseInt(this.props.match.params.main_id)===filesId&&filesId?
                        <p className="drop_down_btn">
                          <a className="color-grey-6" onClick={()=>this.addDir()}>新建目录</a>
                        </p>
                        :"":""}
                    </ul>



                  </li>:""}
									<style>
										{
											`
											 .fiilssort{
											     position: absolute;
    											 top: -10px;
											 }
											`
										}
									</style>
                  {this.props.isAdmin()||this.props.isStudent()? <li className="drop_down" onClick={() => this.onSortTypeChange('created_on')}>
										更新时间
										<sapn className="relativef ml5"style={{"top":"2px"}} >
											<i className={sort==="asc"?
												"iconfont icon-sanjiaoxing-up font-12  color-blue fiilssort" :"iconfont icon-sanjiaoxing-up font-12 fiilssort"}></i>
											<i className={sort==="desc"?
												"iconfont icon-sanjiaoxing-down font-12 yslbottomsj color-blue":"iconfont icon-sanjiaoxing-down font-12 yslbottomsj"}></i>
										</sapn>
                  </li>:""}
                </div>
              </div>
            </div> :""}

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
            <Spin size="large" spinning={this.state.isSpin}>
            <div className="clearfix stu_table">
              <Checkbox.Group style={{ width: '100%' }} onChange={this.onCheckBoxChange} value={checkBoxValues}>
                { files&&files.map((item, index) => {

                  return (
                      <div className="mt20 edu-back-white padding02010" key={index} onClick={()=>this.onItemClick(item)}>
                        <div className="clearfix">
                          <div key={index}>
                            <Fileslistitem
                                {...this.props}
																{...this.state}
                                discussMessage={item}
                                isAdmin={this.props.isAdmin()}
                                isStudent={this.props.isStudent()}
                                isNotMember={this.props.isNotMember()}
                                checkBox={this.props.isAdmin()?<Checkbox value={item.id} key={item.id}></Checkbox>:""}
                                Settingtypes={(id)=>this.Settingtypes(id)}
                                coursesId={this.props.match.params.coursesId}
                                updatafiledfun={()=>this.updatafiled()}
                                index={index}
                            ></Fileslistitem>
                          </div>
                        </div>
                      </div>
                  )
                })
                }
              </Checkbox.Group>
            </div>
            </Spin>
            <style>
              {
                `
                .padding20-20{
                   padding:20px;
                }
                `
              }
            </style>
            <div className="edu-txt-center padding20-20"
                 style={
                   {
                     display: total_count===undefined?'none':total_count< 15 ? 'none' : 'block'
                   }
                 }
            >

              {this.props.isAdmin()||this.props.isStudent() ? files&&files.length>0?<Pagination
                  showQuickJumper
                  defaultCurrent={1}
                  pageSize={15}
                  total={total_count}
                  current={page}
                  onChange={this.PaginationTask}
              />:"":""}
            </div>

					{
						files===undefined?'' :files.length===0?<NoneData></NoneData>:""
					}
          </React.Fragment>
    )
  }
}
export default Fileslists;

{/*<div className="alltask"*/}
		 {/*style={*/}
			 {/*{*/}
				 {/*display: files===undefined?'none' :files.length===0? 'block' : 'none'*/}
			 {/*}*/}
		 {/*}*/}
{/*>*/}
	{/*<div className="edu-tab-con-box clearfix edu-txt-center">*/}
		{/*<img className="edu-nodata-img mb20"  src="/images/educoder/nodata.png" />*/}
		{/*<p className="edu-nodata-p mb20">暂时还没有相关数据哦！</p></div>*/}
{/*</div>*/}
