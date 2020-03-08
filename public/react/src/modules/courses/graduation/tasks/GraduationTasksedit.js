import React,{Component} from "react";
import { Form, Select, Input, Button,Checkbox,Upload,Icon,message,Modal} from "antd";
import {Link} from 'react-router-dom';
import TPMMDEditor from '../../../tpm/challengesnew/TPMMDEditor';
import { WordsBtn,getUrl ,getUploadActionUrl,appendFileSizeToUploadFileAll,AttachmentList,appendFileSizeToUploadFile} from 'educoder';
import axios from 'axios';
import Modals from '../../../modals/Modals';
import '../../css/Courses.css';
const { Option} = Select;
const CheckboxGroup = Checkbox.Group;
const confirm = Modal.confirm;
let GraduationTasksedittype=true;

class GraduationTasksedit extends Component{

  constructor(props){
    super(props)
    this.state={
      coursename:"",
      coursesearch:"",
      title_num:0,
      title_value:"",
      fileList: [],
      contents: [{val:"",id:1}],
      taskid:"",
      taskneme:"",
      tasktype:undefined,
      name:"",
      description:undefined,
      shixunsreplace:false,
      graduationtask_id:undefined
    }
  }

  componentDidMount(){

   let {title_num}=this.state;

    let tasksid=this.props.match.params.category_id;
    let url ="/graduation_tasks/"+tasksid+"/edit.json"
    axios.get(url).then((result)=>{
        // console.log(result)

        // let newfilelist=[];
        // if(result.data.attachments.length!=0){
        //   for(var list of result.data.attachments){
        //     newfilelist.push({
        //       uid:list.id,
        //       name:list.title,
        //       status: 'done',
        //       url:list.url,
        //     })
        //   }
				//
        // }
			let namelength=result.data.task_name.length;
      // let sixlength=title_num-namelength

			const fileList = result.data.attachments.map(item => {
				return {
					id: item.id,
					uid: item.id,
					name: appendFileSizeToUploadFile(item),
					url: item.url,
					filesize: item.filesize,
					status: 'done'
				}
			})
      this.setState({
          // fileList:newfilelist,
          description:result.data.description,
          tasktype:result.data.task_type,
          name:result.data.task_name,
          data:result.data,
				  title_num:namelength,
			  	attachments:result.data.attachments,
          fileList:fileList,
          graduationtask_id:result.data.graduation_id
      })


      this.props.form.setFieldsValue({
        tasktype:result.data.task_type,
        name:result.data.task_name,
      });
    }).catch((error)=>{
      console.log(error)
    })



  }




  goback=()=>{

		// let courseId = this.props.match.params.coursesId;
		// if(courseId===undefined){
		// 	this.props.history.push("/courses");
		// }else{
		// 	this.props.history.push(this.props.current_user.first_category_url);
		// }
		this.props.history.replace(`/courses/${this.state.data.course_id}/graduation_tasks/${this.state.data.graduation_id}`);
  }


  // 输入title
  changeTitle=(e)=>{
		//   title_num:60-parseInt(e.target.value.length),
    this.setState({
      title_num:e.target.value.length,
      title_value:e.target.value
    })

  }
  // 附件相关 START
  handleChange = (info) => {
    if (info.file.status === 'uploading' || info.file.status === 'done' || info.file.status === 'removed') {
      let fileList = info.fileList;
      // console.log(fileList)
      // for(var list of fileList ){
      //   console.log(fileList)
      // }
      this.setState({
        fileList: appendFileSizeToUploadFileAll(fileList),
      });
    }
  }

  // onAttachmentRemove = (file) => {
  //   // confirm({
  //   //   title: '确定要删除这个附件吗?',
  //   //   okText: '确定',
  //   //   cancelText: '取消',
  //   //   // content: 'Some descriptions',
  //   //   onOk: () => {
  //   //     this.deleteAttachment(file)
  //   //   },
  //   //   onCancel() {
  //   //     console.log('Cancel');
  //   //   },
  //   // });
  //   // return false;
	//
  //   this.setState({
  //     Modalstype:true,
  //     Modalstopval:'确定要删除这个附件吗?',
  //     ModalSave: ()=>this.deleteAttachment(file),
  //     ModalCancel:this.cancelAttachment
  //   })
  //   return false;
  // }

  cancelAttachment=()=>{
    this.setState({
      Modalstype:false,
      Loadtype:false,
      Modalstopval:'确定要删除这个附件吗?',
      ModalSave:"",
      ModalCancel:""
    })
  }

	onAttachmentRemove = (file) => {
		if(!file.percent || file.percent == 100){
			// debugger
			this.cancelAttachment();
			const url = `/attachments/${file.response ? file.response.id : file.uid}.json`
			// const url = `/attachments/${file}.json`
			axios.delete(url, {
				})
				.then((response) => {
					if (response.data) {

						if ( response.data.status === 0) {

							this.setState({
								Modalstype:false,
								Modalstopval:response.data.message,
								ModalSave:this.cancelAttachment,
								Loadtype:true,
							})

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

  Commoninterface=(fileList)=>{
    let listid=[]
    let graduation_id=this.state.data.graduation_id;
    if(fileList!=undefined&&fileList.length>0) {
      for (var list of fileList) {
        if (list.response != undefined) {
          listid.push(list.response.id)
        } else {
          listid.push(list.uid)
        }

      }
    }

    // console.log(listid)
    // if(GraduationTasksedittype===true){
      this.props.form.validateFields((err, values) => {

        if (!err) {

          if(values.tasktype===undefined){
            this.scrollToAnchors("tasktypes");
            return
          }

          if(values.name===undefined){
            this.scrollToAnchors("nametypes");
            return
          }

          if(values.description===undefined){
            this.scrollToAnchors("descriptiontypes");
            return
          }else if(values.description.length>5000){
            this.scrollToAnchors("descriptiontypes");
            return
          }


          console.log('Received values of form: ', values);
          // console.log(fileList);
          let tasksid=this.props.match.params.category_id;

          let url="/graduation_tasks/"+tasksid+".json"
          axios.put(url, {
              task_type:parseInt(values.tasktype),
              name:values.name,
              description:values.description,
              attachment_ids:listid,
            }
          ).then((response) => {
            if(response.status===200) {
              // console.log(response)
              // GraduationTasksedittype=false;
              // window.location.href="/courses/"+course_id+"/graduation/"+graduationId+"/graduation_tasks/"+category_id+"/questions";
							this.goback()
              //this.props.history.push("/courses/"+this.props.match.params.coursesId+"/graduation_tasks/"+graduation_id+"/"+this.props.match.params.category_id +"/setting");
            }
          }).catch((error) => {
            console.log(error)
          })

        }
      });
    // }
  }
  handleSubmit=(e)=>{

    let {fileList}=this.state;
    // if(fileList.length===0){
    //   this.setState({
    //     shixunsreplace:true,
    //   })
    //   return
    // }

     this.Commoninterface(fileList);
  }
   //确认
  hidestartshixunsreplace = ()=>{
    let {fileList}=this.state;

    this.Commoninterface(fileList);


  }
   //取消
  hidestartshixunsreplacetwo=()=>{
     this.setState({
       shixunsreplace:false,
     })
  }
  checkContent = (rule, value, callback) => {
    if(value.length>5000){
			callback('最大限制为5000个字符');
		}else{
			callback();
		}
	}
  render(){
    const { getFieldDecorator } = this.props.form;
    let {title_num,pageType,name,description,Loadtype,attachments,fileList,
      Modalstype,Modalstopval,ModalCancel,ModalSave,shixunsreplace ,graduationtask_id} =this.state;

    let {coursedata}=this.props;
    let courseId=this.props.match.params.coursesId;

    let category_id=this.props.match.params.category_id;
    const uploadProps = {
      width: 600,
			fileList,
      // https://github.com/ant-design/ant-design/issues/15505
      // showUploadList={false}，然后外部拿到 fileList 数组自行渲染列表。
      // showUploadList: false,
      action: `${getUploadActionUrl()}`,
      onChange: this.handleChange,
      onRemove: this.onAttachmentRemove,
      beforeUpload: (file) => {
        console.log('beforeUpload', file.name);
        const isLt150M = file.size / 1024 / 1024 < 150;
        if (!isLt150M) {
          this.props.showNotification('文件大小必须小于150MB!');
        }
        return isLt150M;
      },
    };


		document.title=this.props.current_user&&this.props.current_user.course_name;
    return(
      <React.Fragment>

        <div>
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
                <WordsBtn style="grey" className="fl">
                  <Link to={`/courses/${graduationtask_id}`} className="color-grey-6">{this.props.current_user&&this.props.current_user.course_name}</Link>
                </WordsBtn>
                <span className="color-grey-9 fl ml3 mr3">&gt;</span>
                <WordsBtn style="grey" className="fl"> <Link to={"/courses/"+courseId+"/graduation_tasks/"+graduationtask_id} className="color-grey-6">毕设任务</Link></WordsBtn>
                <span className="color-grey-9 fl ml3 mr3">&gt;</span>
                {name===""?"":
                  <WordsBtn style="grey" className="fl">
                    <Link to={"/courses/"+courseId+"/graduation_tasks/"+graduationtask_id+"/detail/"+category_id+"/list"} className="color-grey-6">{name}</Link>
                    <span className="color-grey-9 ml3 mr3">&gt;</span>
                  </WordsBtn>
                }
                <span>{"编辑"}</span>
              </p>

              <div style={{ width:'100%',height:'75px'}} >
                <p className=" fl color-black mt25 summaryname">编辑毕设任务</p>
                <a className="color-grey-6 fr font-16 ml30 mt10 mr20" onClick={this.goback}>返回</a>
              </div>

              {description===undefined?"":
                <div>

                <div className="stud-class-set bor-bottom-greyE pt20 pl20 pr20 pb0 edu-back-white">

                  <Form.Item label="类型">
                    {getFieldDecorator('tasktype', {
                      rules: [{ required: true, message: "请选择任务类型" }],
                    })(<Select className={"greyInput"}
                               style={{width:'20%'}}
                               disabled={true}
                               placeholder="请选择任务类型">
                      <Option value={1}>普通</Option>
                      <Option value={2}>分组</Option>
                    </Select>)}
                    <input type="hidden"  id='tasktypes' />
                    <span className={"newcoursestitle"}>（选择确认后，无法修改）</span>
                  </Form.Item>
                  <style>
                    {
                      `
											.yslgraduainputedit .ant-input{
																					border-right: none !important;
																					height: 40px !important;
																					}

											`
                    }
                  </style>
                  <Form.Item label="任务标题"  >
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: "请输入标题" }],
                    })(<Input placeholder="请输入任务名称，最大限制60个字符" value={name} onInput={this.changeTitle}  className="searchView searchViewAfter yslgraduainputedit" style={{"width":"100%"}} maxLength="60" addonAfter={String(title_num)+"/60"}/>)}
                  </Form.Item>
                  <input type="hidden"  id='nametypes' />
                </div>


                <div className="stud-class-set pt20 pl20 pr20 pb0 coursenavbox edu-back-white">
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

              `}</style>
                  <Form.Item
                    label="内容"
                    className="mdInForm"
										style={{marginBottom:'0px'}}
                  >
                    {getFieldDecorator('description', {
                      rules: [{
												required: true, message: '请输入内容',
											},{
                        max:5000,message:'最大限制5000个字符'
                      }],
                    })(
                    <TPMMDEditor ref={this.mdRef} placeholder={'请输入任务内容说明，最大限制5000个字符'} {...this.state} {...this.props}
                                                        mdID={'courseMessageMD'} initValue={description} className="courseMessageMD"></TPMMDEditor>
                    )}
                  </Form.Item>
                  <input type="hidden"  id='descriptiontypes' />
									{/*<AttachmentList {...this.props} {...this.state} attachments={attachments&&attachments}></AttachmentList>*/}
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
														 {/*onClick={()=>this.onAttachmentRemove(item.id)}*/}
														 {/*aria-hidden="true">*/}
													{/*</i>:""}*/}
											{/*</div>*/}
										{/*)*/}
									{/*})}*/}
									<Upload {...uploadProps} fileList={this.state.fileList} className="upload_1 ml5">
										<Button className="uploadBtn">
											<Icon type="upload" /> 上传附件
										</Button>
										(单个文件150M以内)
									</Upload>
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
                             {/*onClick={()=>this.onAttachmentRemove(item)}*/}
                             {/*aria-hidden="true">*/}
                          {/*</i>:""}*/}
                      {/*</div>*/}
                    {/*)*/}
                  {/*})}*/}


                </div>


                <Form.Item>
                  <div className="clearfix mt30 mb30">
                    <Button type="primary" htmlType="submit" onClick={()=>this.handleSubmit()} className="defalutSubmitbtn fl mr20">提交</Button>
                    <a onClick={this.goback} className="defalutCancelbtn fl">取消</a>
                  </div>
                </Form.Item>
              {/*</Form>*/}
                </div>
              }

            </div>
          </div>
        </div>

      </React.Fragment>

    )
  }
}
const GraduationTaskseditApp = Form.create({ name: 'coursesNew' })(GraduationTasksedit);
export default GraduationTaskseditApp;
