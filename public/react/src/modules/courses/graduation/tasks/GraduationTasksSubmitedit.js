import React,{Component} from "react";
import { Form, Select, Input, Button,Checkbox,Upload,Icon,message,Modal,Spin,Tooltip} from "antd";
import {Link} from 'react-router-dom';
import TPMMDEditor from '../../../tpm/challengesnew/TPMMDEditor';
import { WordsBtn,getUploadActionUrl ,bytesToSize,getImageUrl,appendFileSizeToUploadFileAll,appendFileSizeToUploadFile} from 'educoder';
import axios from 'axios';
import Modals from '../../../modals/Modals';
const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;
let GraduationTasksnewtype=true;

class GraduationTasksSubmitedit extends Component{

  constructor(props){
    super(props)
    this.state={
      coursename:"",
      coursesearch:"",
      title_num:20,
      title_value:"",
      fileList: [],
      contents: [{val:"",id:1}],
      type:true,
      workslist:undefined,
      search:"",
      memberslist:undefined,
      task_status:[],
      selectmemberslist:[],
      minvalue:"",
      setvalue:"",
      minmaxtype:false,
      selectobjct:undefined,
      Loadtype:false,
      description:undefined,
      attachments:undefined,
      spinnings:false,
      shixunsreplace:false,
			limit:20
    }
  }

  componentDidMount(){

    this.props.form.validateFields();
    let workId=this.props.match.params.work_Id;

    let url = "/graduation_works/"+workId+"/edit.json";
    axios.get(url).then((result)=>{

      if(result){
        console.log(result.data.description);
				const fileList = result.data.attachments.map(item => {
					return {
						id: item.id,
						uid: item.id,
						name: appendFileSizeToUploadFile(item),
						url: item.url,
						filesize: item.filesize,
            delete:item.delete,
						status: 'done'
					}
				})
        this.setState({
          workslist:result.data,
          attachments:result.data.attachments,
          selectmemberslist:result.data.members,
          selectobjct:result.data.members,
          description:result.data.description,
					fileList:fileList
        })
        if(result.data.task_type===1){

        }else{
          this.searchList("",1,20,result.data.task_id)
        }

        this.props.form.setFieldsValue({
          description:result.data.description,
        });

      }

    }).catch((error)=>{
      console.log(error)
    })



  }


  handleSelectChange = (value) => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  }

  goback=()=>{

    // let courseId=this.props.match.params.coursesId;
		// if(courseId===undefined){
		// 	this.props.history.push("/courses");
		// }else{
		// 	this.props.history.push(this.props.current_user.first_category_url);
		// }
		this.props.history.replace(`/courses/${this.state.workslist.course_id}/graduation_tasks/${this.state.workslist.graduation_id}`);

  }


  // 输入title
  changeTitle=(e)=>{

    this.setState({
      title_num:20-parseInt(e.target.value.length),
      title_value:e.target.value
    })

  }
  // 附件相关 START
  handleChange = (info) => {

		if (info.file.status === 'uploading') {

			let fileList = info.fileList;
			this.setState({ fileList:appendFileSizeToUploadFileAll(fileList) });
		}

		if (info.file.status === 'done' || info.file.status === 'removed') {
			let fileList = info.fileList;
			this.setState({ fileList:appendFileSizeToUploadFileAll(fileList) });
		}
  }

  onAttachmentRemove = (file) => {
    if(file.delete===false){
      this.props.showNotification(`该作品已被评阅，不能删除该附件`);
      return false
    }else{
      if(!file.percent || file.percent == 100){
        this.setState({
          Modalstype:true,
          Modalstopval:'确定要删除这个附件吗?',
          ModalSave: ()=>this.deleteAttachment(file),
          ModalCancel:this.cancelAttachment
        })
        return false;
      }
    }


  }

  cancelAttachment=()=>{
    this.setState({
      Modalstype:false,
      Modalstopval:'',
      ModalSave:"",
      ModalCancel:""
    })
  }


	deleteAttachment = (file) => {
		if(!file.percent || file.percent == 100){
			let {attachments,fileList}=this.state;
			let id=file.response ==undefined ? file.id : file.response.id;
			const url = `/attachments/${id}.json`
			axios.delete(url, {
				})
				.then((response) => {
					if (response.data) {
						// const { status } = response.data;
						if (response.data.status === 0) {
							console.log('--- success')
							let newattachments=attachments;
							if(file.uid===undefined){
								for(var i=0; i<newattachments.length; i++){
									if(newattachments[i].id===file.id){
										newattachments.splice(i, 1);
									}
								}

							}
							// this.setState({
							// 	Modalstype:true,
							// 	Modalstopval:response.data.message,
							// 	ModalSave:this.cancelAttachment,
							// 	Loadtype:true,
							// 	attachments:newattachments
							// })

							this.cancelAttachment();
							this.setState((state) => {
								const index = state.fileList.indexOf(file);
								const newFileList = state.fileList.slice();
								newFileList.splice(index, 1);
								return {
									fileList: newFileList,
								};
							});
						}
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		}

  }

  inputSearchValue=(e)=>{

    if(e.target.value===""){
      this.setState({
        search:null
      })
    }else{
      this.setState({
        search:e.target.value
      })
    }

  }


  searchValue=()=>{

    let {search,workslist} = this.state;

    this.searchList(search,1,20,workslist.task_id)

  }

  searchList=(search,page,limit,id,types)=>{
  	let {memberslist}=this.state;
		let newmemberslist=memberslist
    this.setState({

    })
    let newid=id
   if(newid===undefined){
     newid=this.props.match.params.work_Id;
   }

    let url="/graduation_tasks/"+newid+"/graduation_works/search_member_list.json";
    axios.post(url,{
      search:search,
      page:page,
      limit:limit
    }).then((result)=>{

      if(result){
				if(types===1){
					if(result.data.members.length>0) {
						result.data.members.map((item, key) => {
							newmemberslist.push(item)
						})
					}
					this.setState({
						memberslist:newmemberslist,
						search:search,
						page:page,
						limit:limit
					})

				}else{
					this.setState({
						memberslist:result.data.members,
						search:search,
						page:page,
						limit:limit
					})
				}

      }

    }).catch((error)=>{
      console.log(error)
    })
  }


  contentViewScroll=(e)=>{
    //滑动到底判断
		let newscrollTop=parseInt(e.currentTarget.scrollTop);
		let allclientHeight=e.currentTarget.clientHeight+newscrollTop;

		if(e.currentTarget.scrollHeight-allclientHeight===0||e.currentTarget.scrollHeight-allclientHeight===1||e.currentTarget.scrollHeight-allclientHeight===-1){
      // console.log("到达底部");

      let{ search,page,limit,workslist}=this.state;

      let newpage=page+1

      this.searchList(search,newpage,limit,workslist.task_id,1)

    }

  }


  funtaskstatus=(checkedValues)=>{

    let{memberslist,selectobjct,workslist}=this.state;
  	if(selectobjct.length>workslist.max_num){
			this.setState({
				minvalue:workslist.max_num,
				setvalue:"大于",
				minmaxtype:true
			})
  		return
		}else{
			this.setState({
				minmaxtype:false
			})
		}
    let newlist =memberslist;
    let newcheckedValues=checkedValues;
    let selects=[];

    for(var list of selectobjct){
      selects.push(list)
    }
    for(var i=0; i<newlist.length; i++){
      for(var z=0; z<newcheckedValues.length; z++){
        if(newlist[i].user_id===newcheckedValues[z]){
          selects.push(newlist[i])
        }
      }

    }

    this.setState({
      task_status:checkedValues,
      selectmemberslist:selects
    })



  }

  delecttask_status=(id)=>{

    let{selectmemberslist,task_status}=this.state;
    let newlist=task_status;
    let selects=selectmemberslist;

    for(var i=0; i<newlist.length; i++){
      if(newlist[i]===id){
        newlist.splice(i,1)
      }
    }

    for(var z=0; z<selects.length; z++){
      if(selects[z].user_id===id){
        selects.splice(z,1)
      }
    }
		console.log(newlist)
    console.log(selects)
    this.setState({
      task_status:newlist,
      selectmemberslist:selects
    })
  }

  gocannel=()=>{
		this.props.history.goBack()
  }

  handleSubmit=(e) => {

    let {fileList,selectmemberslist,workslist}=this.state;

     this.Commoninterface(fileList,selectmemberslist,workslist);
    // setTimeout(function () {
    //   GraduationTasksnewtype=true
    // },10000)

  }
  Commoninterface =(fileList,selectmemberslist,workslist)=>{

		let coursesIds=this.props.match.params.coursesId
		let workId=this.props.match.params.work_Id;

    let  userids=[];
    // for(var list of selectmemberslist){
    //   if(list.user_id!=undefined&&list.user_id!=null){
		// 		userids.push(list.user_id)
		// 	}
    // }
   if(selectmemberslist!=undefined&&selectmemberslist.length>0){
     selectmemberslist.map((list,key)=>{
       if(list.user_id!=undefined&&list.user_id!=null){
         userids.push(list.user_id)
       }
     })
   }


    let listid=[];

    // for(var list of fileList){
    //   listid.push(list.response == undefined ? list.id : list.response.id)
    // }
    if(fileList!=undefined&&fileList.length>0){
      fileList.map((list,key)=>{
        listid.push(list.response == undefined ? list.id : list.response.id)
      })
    }


      this.props.form.validateFields((err, values) => {

          // console.log(fileList);
          if(values.description===undefined||values.description===""){
						this.scrollToAnchor("valuestypes");
            return
          }

          if(workslist.task_type===2){
            if(userids.length<workslist.min_num){
              this.setState({
                minvalue:workslist.min_num,
                setvalue:"小于",
                minmaxtype:true
              })
              return
            }else if(userids.length>workslist.max_num){
              this.setState({
                minvalue:workslist.max_num,
                setvalue:"大于",
                minmaxtype:true
              })
              return
            }

          }
          this.setState({
            spinnings:true
          })


					// if(fileList.length===0){
					// 	this.setState({
					// 		shixunsreplace:true,
					// 	})
					// 	return
					// }

          let url="/graduation_works/"+workId+".json";
          axios.put(url, {
              description:values.description,
              attachment_ids:listid,
              user_ids:userids
            }
          ).then((response) => {
            this.setState({
              spinnings:false
            })
            if(response!== undefined){
              // this.goback()
							window.location.href=`/courses/${coursesIds}/graduation_tasks/${workId}/appraise`
            }
            // if(response.status===200) {
            //   GraduationTasksnewtype=false;
            //   if(response.data.status===0){
            //     // this.setState({
            //     //   Modalstype:true,
            //     //   Modalstopval:response.data.message,
            //     //   ModalSave:this.setedit,
            //     //   Loadtype:true
            //     // })
            //   }else{
            //     GraduationTasksnewtype=true;
            //   }
            // }
          }).catch((error) => {
            console.log(error)
						this.setState({
							spinnings:false
						})
          })


      });

  }

  hidestartshixunsreplace = ()=>{

    let {fileList,selectmemberslist,workslist}=this.state;

    this.Commoninterface(fileList,selectmemberslist,workslist);

  }

  hidestartshixunsreplacetwo= ()=>{
    this.setState({
      shixunsreplace:false,
			spinnings:false
    })
  }

	scrollToAnchor = (anchorName) => {
		if (anchorName) {
			// 找到锚点
			let anchorElement = document.getElementById(anchorName);
			// 如果对应id的锚点存在，就跳转到锚点
			if(anchorElement) { anchorElement.scrollIntoView({block: 'start', behavior: 'smooth'}); }
		}
	}
  render(){
    const { getFieldDecorator } = this.props.form;
    let {search,fileList, workslist,setvalue,minvalue,minmaxtype,Loadtype,description,attachments,
      Modalstype,Modalstopval,ModalCancel,ModalSave,memberslist,task_status,selectmemberslist,shixunsreplace} =this.state;

    let courseId=this.props.match.params.coursesId;
    let task_Id=this.props.match.params.coursesId;
    // let category_id=this.props.match.params.category_id;
		let work_Id=this.props.match.params.work_Id
    const uploadProps = {
      width: 600,
      fileList,
      multiple: true,
      // https://github.com/ant-design/ant-design/issues/15505
      // showUploadList={false}，然后外部拿到 fileList 数组自行渲染列表。
      // showUploadList: false,
      action: `${getUploadActionUrl()}`,
      onChange: this.handleChange,
      onRemove: this.onAttachmentRemove,
      beforeUpload: (file) => {
				// TODO 文件存在则提示并退出
				let gotSameFile = false;
				this.state.fileList && this.state.fileList.some((item) => {
					if (item.name && item.name.startsWith(file.name)) {
						gotSameFile = true;
						return true
					}
				})
				if (gotSameFile) {
					this.props.showNotification("该附件已被上传！")
					return false
				}
        console.log('beforeUpload', file.name);
        const isLt150M = file.size / 1024 / 1024 < 150;
        if (!isLt150M) {
          this.props.showNotification('文件大小必须小于150MB!');
        }
        return isLt150M;
      },
    };

		document.title=workslist&&workslist.course_name;
    return(
      <React.Fragment>

        <div>
          <Spin size="large" spinning={this.state.spinnings}>
          {/*提示*/}
          <Modals
            modalsType={Modalstype}
            modalsTopval={Modalstopval}
            modalCancel={ModalCancel}
            modalSave={ModalSave}
            loadtype={Loadtype}
          />
            <Modal
              keyboard={false}
              title="提示"
              visible={shixunsreplace}
              closable={false}
              footer={null}
            >
              <div className="task-popup-content">
                <p className="task-popup-text-center font-16 ">还未上传附件</p>
                <p className="task-popup-text-center font-16 pb20">是否确认提交作品?</p>
              </div>
              <div className="task-popup-submit clearfix">
                <a className="task-btn task-btn-orange fr "
                   onClick={() => this.hidestartshixunsreplace()}>确认</a>
                <a className="task-btn fr mr50"
                   onClick={() => this.hidestartshixunsreplacetwo()}>取消</a>
              </div>
            </Modal>
          <div className="newMain clearfix">
            <div className={"educontent mb20"}>

              <p className="clearfix mt10">
                {/*<WordsBtn style="grey" className="fl">  <Link to={"/courses/"+courseId+"/graduation"} className="color-grey-6">{workslist&&workslist.course_name}</Link></WordsBtn>*/}
                {/*<span className="color-grey-9 fl ml3 mr3">&gt;</span>*/}
                <WordsBtn style="grey" className="fl"> <a onClick={this.goback} className="color-grey-6">毕设任务</a></WordsBtn>
                <span className="color-grey-9 fl ml3 mr3">&gt;</span>
                <WordsBtn style="grey" className="fl"> <Link to={`/courses/${courseId}/graduation_tasks/${workslist && workslist.graduation_id}/detail/${workslist && workslist.task_id}/list`} className="color-grey-6">任务详情</Link></WordsBtn>
                <span className="color-grey-9 fl ml3 mr3">&gt;</span>
                {/*<WordsBtn style="grey" className="fl">*/}
                {/*<Link to={"/courses/"+courseId+"/graduation/graduation_tasks/"+category_id} className="color-grey-6">{workslist&&workslist.task_name}</Link>*/}
                {/*<span className="color-grey-9 ml3 mr3">&gt;</span>*/}
                {/*</WordsBtn>*/}
                <span>{this.props.current_user&&this.props.current_user.real_name} 修改作品</span>
              </p>

              <div style={{ width:'100%',height:'75px'}} >
                <p className=" fl color-black mt25 summaryname">{ workslist && workslist.task_name }</p>
                <a className="color-grey-6 fr font-16 ml30 mt10 mr20" onClick={this.goback}>返回</a>
              </div>

              {description&&description?
                 <div>
                <Form>
                <div className="stud-class-set pd20 coursenavbox edu-back-white" id={"valuestypes"}>
                  <style>{`
                .uploadBtn.ant-btn {
                  border: none;
                  color: #4CACFF;
                  box-shadow: none;
                  background: transparent;
                  padding: 0 6px;
                }
                .ant-upload-list-item:hover .ant-upload-list-item-info{
                  background-color:#fff;
                }
                .upload_1 .ant-upload-list {
                  width: 350px;
                }
                .ant-form-item{
                  margin-bottom: 0px;
                }
              `}</style>
                  <Form.Item
                    label="内容"
                    className="mdInForm"
                  >
                    {getFieldDecorator('description', {
                      rules: [{
                        required: true, message: '请在此输入作品内容或附件的简要描述',
                      }, {
                        max: 5000, message: '最大限制为5000个字符',
                      }],
                    })(
                      <TPMMDEditor ref={this.mdRef} placeholder={'请在此输入作品内容或附件的简要描述，最大限制5000个字符'} maxLent={"5000"}
                                   mdID={'courseMessageMD'} initValue={description} className="courseMessageMD"></TPMMDEditor>
                    )}
                  </Form.Item>
                  <Upload {...uploadProps} className="upload_1">
                    <Button className="uploadBtn">
                      <Icon type="upload" /> 上传附件
                    </Button>
                    <span className={"color-grey-9"}>(单个文件150M以内)</span>
                  </Upload>


                  {/*{attachments&&attachments.map((item,key)=>{*/}

                    {/*return(*/}
                      {/*<div className="color-grey mt5"*/}
                         {/*key={key}*/}
                      {/*>*/}
                        {/*<a className="color-grey ml3">*/}
                          {/*<i className="font-14 color-green iconfont icon-fujian mr8" aria-hidden="true"></i>*/}
                        {/*</a>*/}
                        {/*<a*/}
                          {/*href={item.url}*/}
                          {/*className="mr12 color9B9B" length="58">*/}
                          {/*{item.title}*/}

                        {/*</a>*/}
                        {/*<span className="color656565 mt2 color-grey-6 font-12 mr8">*/}
                      {/*{item.filesize}*/}

                    {/*</span>*/}
                        {/*{item.delete===true?*/}
                        {/*<i className="font-14 iconfont  icon-guanbi "*/}
                           {/*id={item.id}*/}
                           {/*onClick={()=>this.onAttachmentRemoves(item.id)}*/}
                           {/*aria-hidden="true">*/}
                        {/*</i>:""}*/}
                      {/*</div>*/}
                        {/*)*/}
                      {/*})}*/}

									{/*<style>*/}
										{/*{*/}
											{/*`*/}
								{/*.maxwidth500{*/}
										{/*max-width:500px;*/}
										{/*overflow: hidden;*/}
										{/*text-overflow: ellipsis;*/}
										{/*white-space: nowrap;*/}
										 {/*color: #05101a;*/}
								{/*}*/}
								{/*`*/}
										{/*}*/}
									{/*</style>*/}
									{/*{this.state.fileList.length===0?"":this.state.fileList.map((item,key)=>{*/}
										{/*return(*/}
											{/*<p className="color-grey mt10" key={key}  >*/}
												{/*<a className="color-grey fl">*/}
													{/*<i className="font-14 color-green iconfont icon-fujian mr8" aria-hidden="true"></i>*/}
												{/*</a>*/}
												{/*<span className="mr12 color9B9B maxwidth500 fl" length="58">*/}
										{/*{item.name}*/}
									{/*</span>*/}
												{/*<span className="color656565 mt2 color-grey-6 font-12 mr8">*/}
										{/*{item.response===undefined?"":bytesToSize(item.size)}*/}
									{/*</span>*/}
												{/*<i className="font-14 iconfont  icon-guanbi "*/}
													 {/*id={item.response===undefined?"":item.response.id}*/}
													 {/*aria-hidden="true" onClick={()=>this.onAttachmentRemove(item.response===undefined?"":item.response.id&&item.response.id)}></i>*/}
											{/*</p>*/}
										{/*)*/}
									{/*})}*/}



                </div>



                {workslist&&workslist.task_type===1?"":
                <div className="stud-class-set pd20 coursenavbox edu-back-white"
										 style={{borderTop:'1px solid #ccc'}}
								>
                  <Form.Item
                    label="小组成员"

                  >
                    <div>
                      <div className={"fl ml20"}>成员要求：{workslist&&workslist.min_num}～{workslist&&workslist.max_num}人</div>
                      <Search
                        className={"fl mt5 ml20"}
                        style={{width:"270px"}}
                        placeholder="请输入姓名或学号搜索"
                        id="subject_search_input"
                        value={search}
                        onInput={this.inputSearchValue}
                        onSearch={this.searchValue}
                        autoComplete="off"
                      ></Search>
                    </div>

										<style>{`
               .fonthidden{
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap
                }
                .width100{
                    width: 100px;
    								height: 24px;
                }
                img.edu-nodata-img {
										width: 200px;
										margin: 50px 90px 20px;
										display: block;
								}
									.autos{
										 overflow: auto;
								}
              `}</style>
                  </Form.Item>
                  <div className={"ml20 mt10"} style={{width:"100%"}}>


                    <div className={"members fl autos"}
												 style={{paddingLeft: '9px'}}
                         onScroll={this.contentViewScroll}>

                      <CheckboxGroup value={task_status} onChange={this.funtaskstatus} style={{ paddingTop: '4px'}}>
												{memberslist===undefined?"":memberslist.length===0? 	<div className="square-list clearfix">
													<div className="edu-tab-con-box clearfix edu-txt-center">
														<img className="edu-nodata-img mb20" src={getImageUrl("images/educoder/nodata.png")}/>
														<p className="edu-nodata-p mb20">未找到包含{search}的学生</p>
													</div>
												</div>:memberslist&&memberslist.map((item,key)=>{
                          return(
                            <div key={key} style={{
                              width: '400px',
                              height: '30px'
                            }}>
                              <Checkbox value={item.user_id}
																				key={item.user_id}
																				checked={
																					task_status.map((item,key)=>{
																						return  parseInt(task_status[key])===item.user_id?true:false
																					})
																				}
																				disabled={item.commit_status===true?true:false}  className="fl "></Checkbox>
                              <div className={"fl ml5 fonthidden width100"} style={{width: '70px'}} title={item.user_name}>{item.user_name}</div>
                              <div className={"fl ml5 fonthidden width100 color-grey-9"}>{item.group_name}</div>
                              <div className={"fl ml5 color-grey-9 fonthidden width100"}>{item.student_id}</div>
                              <div className={"fl ml20"}>{item.commit_status===true?<span className={"color-orange"}>已提交</span> :""}</div>
                            </div>
                          )
                        })}
                      </CheckboxGroup>


                    </div>

                    <div className={"youjiangboxs"}>
                      <i className={"iconfont icon-youjiang fl ml20 mr20"}></i>
                    </div>

                    <div className={"members fl autos"}>

                      {selectmemberslist&&selectmemberslist.map((item,key)=>{
                      	console.log(item)
												if(item.group_name!=undefined) {
													return (
														<div key={key} style={{
															width: '375px',
															height: '30px',
															display: item.user_name === undefined ? "none" : ""
														}}>
															<div className={"fl ml5 fonthidden width100"}
																	 title={item.user_name}>{item.user_name}</div>
															<div className={"fl ml5 fonthidden width100 color-grey-9"}>{item.group_name}</div>
															<div className={"fl ml5 color-grey-9 fonthidden width100"}>{item.student_id}</div>
															{key > 0 ?
																<div className={"fr ml20"}><i className={"iconfont icon-shanchudiao fl  color-grey-9"}
																															style={{marginTop: '-4px'}}
																															onClick={() => this.delecttask_status(item.user_id)}></i>
																</div> : ""}
																<div className={"both"}></div>
														</div>
													)
												}
                      })}

                    </div>


                    <div className={"both"}>

                    </div>

                    {minmaxtype===true?<span className={"color-red mt20"}>
                人数不能{setvalue+minvalue}个人
              </span>:""}

                  </div>
                </div>}




                {/*<Form.Item></Form.Item>*/}
                  <div className="clearfix mt30 mb30">
                    <Button type="primary" onClick={this.handleSubmit} className="defalutSubmitbtn fl mr20">提交</Button>
                    <a onClick={this.goback} className="defalutCancelbtn fl">取消</a>
                  </div>

              </Form>
                 </div>
                   :""}

            </div>
          </div>
          </Spin>
        </div>

      </React.Fragment>

    )
  }
}
const GraduationTasksSubmiteditApp = Form.create({ name: 'coursesNew' })(GraduationTasksSubmitedit);
export default GraduationTasksSubmiteditApp;
