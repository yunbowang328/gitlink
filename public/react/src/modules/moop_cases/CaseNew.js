import React,{ Component } from "react";
import './css/moopCases.css'
import '../courses/css/Courses.css'
import { Form , Input , Upload , Button , Icon , message , Tooltip } from "antd";

import { getImageUrl , setImagesUrl , MarkdownToHtml , ActionBtn , appendFileSizeToUploadFile , appendFileSizeToUploadFileAll , getUrl , getUploadActionUrl } from 'educoder';

import Tags from './CaseTags'

import axios from 'axios';
import TPMMDEditor from '../tpm/challengesnew/TPMMDEditor';
import _ from 'lodash'
const { Dragger } = Upload;
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
 const $ = window.$;
class CaseNew extends Component{
  constructor(props){
    super(props);
    this.DescMdRef = React.createRef();

    this.state={
      casesTags:[],
      contentFileList:[],
      filesID:[],
      imageUrl:undefined,
      loading: false,
      checkTag:false,
      checkFile:false,
      coverID:undefined,
			library_tags:undefined
    }
  }

  // 上传附件-删除确认框
  onAttachmentRemove = (file, stateName) => {
    if(!file.percent || file.percent == 100){
      this.props.confirm({
        content: '是否确认删除?',
        onOk: () => {
          this.deleteAttachment(file, stateName)
        },
        onCancel() {
          console.log('Cancel');
        },
      });
      return false;
    }
  }

  // 上传附件-确认删除
  deleteAttachment = (file, stateName) => {
    // 初次上传不能直接取uid
    const url = `/attachments/${file.response ? file.response.id : file.uid}.json`
    axios.delete(url, {
    }).then((response) => {
      if (response.data) {
        const { status } = response.data;
        if (status == 0) {
          console.log('--- success')
          
          this.setState((state) => {
            const index = state[stateName].indexOf(file);
            const newFileList = state[stateName].slice();
            newFileList.splice(index, 1);
            console.log("newFileList");
            console.log(newFileList.map(item =>{ return( item.id )}));
            return {
              [stateName]: newFileList,
              filesID:newFileList.map(item =>{ return( item.id )})
            };
          });
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  // 上传附件-change
  handleContentUploadChange = (info) => {
    if (info.file.status === 'done' || info.file.status === 'uploading' || info.file.status === 'removed') {
      let contentFileList = info.fileList;
      this.setState({ contentFileList: appendFileSizeToUploadFileAll(contentFileList)});
      let list = appendFileSizeToUploadFileAll(contentFileList);
      let arr = list.map(item=>{
        return ( item.response && item.response.id )
      })
      this.setState({
        filesID:arr,
        checkFile:arr.length > 0 ? false : true
      })
    }
  }

  // 上传封面图-change
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        }),
      );
      console.log(info.file);
      this.setState({
        coverID:info.file.response && info.file.response.id
      })
    }
  };

  // 编辑时加载数据
  componentDidMount=()=>{

    if(this.props.match.params.caseID){
      this.InitEditData();
    }else{
			window.document.title = '教学案例'
		}
		let url=`/library_tags.json`;
		axios.get(url).then((result) => {
			console.log(result)
			if(result.data.status===0){
				this.setState({
					library_tags:result.data.library_tags
				})
			}
		}).catch((error) => {
			console.log(error);
		})
  }

  componentDidUpdate=(prevState)=>{
    if(this.props.CaseDetail && prevState.CaseDetail != this.props.CaseDetail){
      this.props.form.setFieldsValue({
        caseTitle:this.props.CaseDetail.title,
        userName:this.props.CaseDetail.author_name,
        userUnit:this.props.CaseDetail.author_school_name,
      })
      this.setState({
        contentFileList:this.props.attachments.map(item => {
          return {
            id: item.id,
            uid: item.id,
            name: appendFileSizeToUploadFile(item),
            url: item.url,
            filesize: item.filesize,
            status: 'done'
          }
        }),
        filesID:this.props.attachments.map(item => {
          return ( item.id )
        }),
        coverID:this.props.cover && this.props.cover.id,
        imageUrl:this.props.CaseDetail.cover && setImagesUrl(this.props.CaseDetail.cover.url),
        casesTags:this.props.tags.map(item=>{
          return (item.id);
        })
      })
      console.log(this.props.attachments.map(item => {
        return ( item.id )
      }))
    }
  }

  InitEditData=()=>{
    let caseID = this.props.match.params.caseID;
    this.props.getDetail(caseID);
  }

  // 申请提交和保存
  handleSubmit = (type) => {
    let caseID = this.props.match.params.caseID;
    console.log(type);    
    this.props.form.validateFieldsAndScroll((err, values) => {
      let { casesTags , filesID } = this.state;
      if(casesTags.length == 0){
        $("html").animate({ scrollTop: $("#tagFormItem").offset().top - 100 });
        this.setState({
          checkTag:true
        })
        return;
      }
      if(filesID.length == 0){
        $("html").animate({ scrollTop: $("#fileFormItem").offset().top - 100 });
        this.setState({
          checkFile:true
        })
        return;
      }

      const mdContnet = this.DescMdRef.current.getValue().trim();
      console.log(mdContnet)
      values.description = mdContnet;

      console.log(values);
      let url = caseID ? `/libraries/${caseID}.json`: `/libraries.json`;
      if(caseID){
        axios.put((url),{
          title:values.caseTitle,
          author_name:values.userName,
          author_school_name:values.userUnit,
          content:values.description,
          attachment_ids:this.state.contentFileList.map(item=>{
            return (item.response ? item.response.id : item.id )
          }),
          tag_ids:this.state.casesTags,
          cover_id:this.state.coverID,
          publish:type == 'save' ? false : true 
        }).then((result)=>{
          if(result){
            this.props.showNotification(type == 'save' ? `案例保存成功！`: `提交成功！`);
            this.props.history.push(type == 'save' ? `/moop_cases/${result.data.id}` : `/moop_cases/${result.data.id}/publish_success`);
          }
        }).catch((error)=>{
          console.log(error);
        })
      }else{
        axios.post((url),{
          title:values.caseTitle,
          author_name:values.userName,
          author_school_name:values.userUnit,
          content:values.description,
          attachment_ids:this.state.filesID,
          tag_ids:this.state.casesTags,
          cover_id:this.state.coverID,
          publish:type == 'save' ? false : true 
        }).then((result)=>{
          if(result){
            this.props.showNotification(type == 'save' ? `案例保存成功！`: `提交成功！`);
            this.props.history.push(type == 'save' ? `/moop_cases/${result.data.id}` : `/moop_cases/${result.data.id}/publish_success`);
          }
        }).catch((error)=>{
          console.log(error);
        })
      }
      
    })
  }

  // 选择标签
  changeType=(type)=>{
    // console.log(this.state.casesTags);
    // debugger
    let tags = [];

    if(this.state.casesTags.indexOf(type) > -1){
      tags = this.state.casesTags.filter(item => item != type);
    }else{
      tags = this.state.casesTags.concat(type);
    }
    const tagUniqed = _.uniq(tags);
    this.setState({
      casesTags: tagUniqed,
      checkTag:tags.length > 0 ? false : true
    })
  }

  render(){
    let { caseID } = this.props.match.params;
    let { CaseDetail } = this.props;
    let { casesTags , contentFileList , imageUrl , checkTag , checkFile,library_tags } = this.state;
    const {getFieldDecorator} = this.props.form;


    // 上传附件点击事件
    const uploadProps = {
      width: 600,
      multiple: true,
      fileList:contentFileList,
      action: `${getUploadActionUrl()}`,
      onChange: this.handleContentUploadChange,
      onRemove: (file) => this.onAttachmentRemove(file, 'contentFileList'),
      beforeUpload: (file) => {
        const isLt150M = file.size / 1024 / 1024 < 150;
        if (!isLt150M) {
          //this.props.showNotification('文件大小必须小于150MB!');
          this.props.define({
            title:'提示', 
            content:"该文件无法上传。超过文件大小限制(150MB),建议上传到百度云等其它共享工具里，然后再txt文档里给出链接以及共享密码并上传"
          })
          return isLt150M;
        }
      }
    };
    // 上传封面图-html
    const uploadButton = (
      <div>
        <Icon className='font-36 color-grey-c' type={this.state.loading ? 'loading' : 'plus'} />
      </div>
    );
    // 上传封面图点击事件
    const uploadCover = {
      listType:"picture-card",
      className:"avatar-uploader",
      showUploadList:false,
      action:`${getUploadActionUrl()}`,
      onChange:this.handleChange,
    }
    // console.log('111');
    // console.log(!caseID || (CaseDetail && CaseDetail.status == "pending"));
    return(
      <div className="educontent mt10 mb50">
        <style>
          {
            `
            .newCases .ant-col.ant-form-item-label{
              float:left;
              margin-right:20px;
              height:35px;
              line-height:35px;
            }

            .newCaseUpload{
              width: 100%;
              background: #F2F9FF;
              justify-content: center;
              align-items: center;
              display: -webkit-flex;
              text-align: center;
              height: 120px;
              border-radius: 4px;
              border: 1px dashed #4cacff;
            }
            .newCases .ant-form-item{
              margin-bottom:20px!important ;
            }
            .newCases .ant-col.ant-form-item-control-wrapper{
              position:relative;
            }
            .newCases .ant-form-explain{
              position:absolute;
              bottom:-18px;
              left:76px;
              padding-left: 7px;
            }
            .newCases .resetLeft .ant-form-explain{
              left:0px;
            }
            .newCases .resetBottom .ant-form-explain{
              bottom:2px;
            }
            `
          }
        </style>
        <p className="mt10 mb20 clearfix lineh-20">
          <a href="/moop_cases" className="color-grey-9">教学案例</a> &gt; <span className="color-grey-3">{ caseID ? "编辑" : "新建" }</span>
        </p>
        <p class="lineh-25 font-22 mb20">上传教学案例</p>
          <Form onSubmit={this.handleSubmit} className={"newCases"}>            
            <div className="padding30 edu-back-white">
              <Form.Item label="标题">
                {getFieldDecorator('caseTitle', {
                  rules: [{required: true, message: "案例标题不能为空"}],
                })(
                  <Input placeholder="例如：软件工程教学案例" className="greyInput winput-300-35 mr20 fl"/>
                )}
                <span className="color-grey-c font-12 fl">简明扼要介绍文档/视频所包含的主要的内容</span>
              </Form.Item>
              <div className="clearfix">
                <Form.Item label="作者" className="fl with22">
                  {getFieldDecorator('userName', {
                    rules: [{required: true, message: "请输入作者姓名"}],
                  })(
                    <Input placeholder="请输入姓名" className="greyInput winput-120-35 mr20 fl winput150"/>
                  )}
                </Form.Item>
                <Form.Item className="fl resetLeft">
                  {getFieldDecorator('userUnit', {
                    rules: [{required: true, message: "请输入作者单位名称"}],
                  })(
                    <Input placeholder="请输入作者单位名称" className="greyInput winput-300-35 mr20 fl"/>
                  )}
                </Form.Item>
              </div>
              <div className={checkTag==true ? "clearfix mb20 pr has-error" : "clearfix mb20"} id="tagFormItem">
                <span className="upload_Title must">标签</span>
                <ul className="fl libraries_tab">
									{library_tags&&library_tags.map((item,key)=>{
										return(
										<li key={key} className={ casesTags.indexOf(item.id) > -1 ? "active" :"" } onClick={()=>this.changeType(item.id)}>{item.name}</li>
										)
									})}
                </ul>
                {
                  checkTag && <div class="ant-form-explain">请选择标签</div>
                }
              </div>
              <Form.Item label="描述" className="resetBottom" style={{marginBottom:"0px"}}> 
                {getFieldDecorator('description', {
                  rules: [{
                    required: true, message: '请输入描述内容'
                  }],
                })(
                  <TPMMDEditor ref={this.DescMdRef} placeholder="请添加描述" mdID={'caseContentMD'} refreshTimeout={1500} 
                    watch={true} className="caseMessageMD" initValue={CaseDetail && CaseDetail.content}></TPMMDEditor>
                )}
              </Form.Item>
              <div className={checkFile == true ? "clearfix mb20 pr has-error" : "clearfix mb20"}  id="fileFormItem" style={{marginLeft:"76px"}}>
                <Dragger {...uploadProps} className="librariesField upload_1">
                  <p className="ant-upload-text color-blue font-18 mb20">上传附件</p>
                  <p className="ant-upload-text color-grey-c">从我的电脑选择要上传的文档：按住CTRL可以上传多份文档。单个文件最大限制：150MB</p>
                </Dragger>
                {
                  checkFile == true && <div style={{left:"0px",bottom:"-21px"}} class="ant-form-explain">请先上传附件</div>
                }
              </div>
              <p className="lineh-25 mt20 mb10 clearfix">
                <span className="upload_Title" style={{marginRight:"12px"}}>封面图</span><span class="color-grey-c fl lineh-35">（上传尺寸：120*90 px）</span>
              </p>
              <div style={{marginLeft:"76px"}} className="uploadImage">
                <Upload {...uploadCover}>
                  { imageUrl ? 
                    <Tooltip title="重新上传">
                      <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> 
                    </Tooltip>
                    : 
                    <Tooltip title="上传图片">
                      {uploadButton}
                    </Tooltip>
                  }
                </Upload>
              </div>
            </div>
            <div className="padding30 bor-top-greyE edu-back-white">
              <li className="lineh-25 color-grey-6 font-18 mb20">审核说明</li>
              <ul className="font-16">
                <li>平台管理员将对每天新上传的文档进行审核，审核通过的文档将公开显示，否则将私有化或移除</li>
              </ul>
            </div>
            <div className="padding30 bor-top-greyE edu-back-white">
              <li className="lineh-25 color-grey-6 font-18 mb20">温馨提示</li>
              <ul className="font-16 lineh-30">
                <li>1.请勿上传已设置加密口令的文档资源；</li>
                <li>2.可以上传符合教学案例标准的文档资料，如
                  <a className="color-blue" target="_blank" href="https://www.educoder.net/courses/1309/boards/5909/messages/34799">案例入库标准</a>、
                  <a target="_blank" className="color-blue" href="https://www.educoder.net/courses/1309/boards/5909/messages/34798">案例使用说明书</a>以及其他资料等，上传支持的文件最大容量：100MB；</li>
                <li>3.请确保上传内容无侵权或违反国家关于互联网政策的不良行为；</li>
                <li>4.请使用Chrome，Firefox，Safari，IE11（及以上版本）浏览器；</li>
              </ul>
            </div>
            <Form.Item>
              <div className="clearfix mt30 mb30">
                {
                  (!caseID || (CaseDetail && CaseDetail.status == "pending" || CaseDetail && CaseDetail.status == "refused")) ? <Button type="primary" onClick={()=>this.handleSubmit("submit")} className="defalutSubmitbtn fl mr20">申请发布</Button> : ""
                }
                <a className="defalutCancelbtn fl" onClick={()=>this.handleSubmit("save")}>保存</ a>
              </div>
            </Form.Item>
          </Form>
      </div>
    )
  }
}
const WrappedCoursesNewApp = Form.create({name: 'CaseNew'})(CaseNew);
export default WrappedCoursesNewApp;