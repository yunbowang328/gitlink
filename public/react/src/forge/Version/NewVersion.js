import React , { Component } from "react";
import { Form , Input , Select,Divider,Button,Checkbox,Dropdown,Menu} from 'antd';
import {Link} from 'react-router-dom';

import '../Order/order.css';
import './version.css';

import axios from 'axios';

const Option = Select.Option;
const TextArea = Input.TextArea;
class NewVersion extends Component{
  constructor(props){
    super(props);
    this.state={
      branch_name:"",
      issue_tag_ids:"",
      fixed_version_id:"",
      issue_chosen:undefined,
      fileList:undefined,
      ischeck:undefined,
      branches:undefined,
      pull:undefined,
      tag_name:'',
    }
  }

  componentDidMount=()=>{
    this.InitData();
    this.getSelectList();
  }

  InitData=()=>{
    this.props.form.setFieldsValue({
      ...this.state
    });
  }

  getSelectList=()=>{
    const { projectsId } = this.props.match.params;
    const url = `/projects/${projectsId}/version_releases/new.json`;
    axios.get(url).then((result)=>{
      if(result){
        this.setState({
          branches:result.data.branches,
          pull:result.data.branches[0]
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }


  renderSelect=(list)=>{
    if(list && list.length >0){
      return(
        list.map((item,key)=>{
          return(
            <Option key={key+1} value={item.id+""}>{item.name}</Option>
          )
        })
      )
    }
  }

  // 创建
  handleSubmit=(draft)=>{
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(!err){
        const { projectsId } = this.props.match.params;
        const { pull,tag_name,ischeck} = this.state;
        const url = `/projects/${projectsId}/version_releases.json`;
        // if(values.issue_type==="普通"){
        //   values.issue_type="1"
        // }
        axios.post(url,{
          ...values,
          tag_name:tag_name,
          draft:draft,
          prerelease:ischeck,
          target_commitish:pull,
        }).then(result=>{
          if(result){
            this.props.history.push(`/projects/${projectsId}/version`);
          }
        }).catch(error=>{
          console.log(error);
        })

      }
    })
  }

  // 获取上传后的文件id数组
  UploadFunc=(fileList)=>{
    this.setState({
      fileList
    })
  }
  RedieonChange=(e)=>{
     this.setState({
      ischeck:e.target.checked
     })
  }
  Preservation=()=>{
    alert(this.state.ischeck)  
  }

  renderMenu =(array,id)=>{
    return(
      <Menu>
        {
          array && array.length > 0 && array.map((item,key)=>{
            return(
              <Menu.Item key={item} onClick={()=>this.getOption(item)}>{item}</Menu.Item>
            )
          })
        }
      </Menu>
    )
  }

  getOption=(name)=>{
      this.setState({
        pull:name
      })
    
  }

  changmodelname=(e)=>{
    this.setState({
      tag_name:e.target.value
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const {branches,pull,tag_name} = this.state;
    
    return(
        <div className="main">
          <Form>
          <h1 style={{marginLeft:15,marginTop:20}}>发布新版</h1>
          <h5 style={{marginLeft:15}}>版本发布组织项目的版本。</h5>
          <Divider/>
          <div  style={{display:'flex'}}>
          <Input placeholder="标签名称" style={{width:180,marginLeft:15}} value={tag_name} onChange={this.changmodelname}/>
           <div style={{marginLeft:20,marginRight:20,lineHeight: '32px'}}>@ </div>
          <Dropdown overlay={this.renderMenu(branches &&branches,'pull')} trigger={['click']} placement="bottomCenter">
          <Button style={{width:180}}>{pull}</Button>
          </Dropdown>
          </div>
           <div  style={{display:'flex'}}>
             <div className="versionmilepostleft">
              <h1>标题</h1> 
               <div>
               <Form.Item>
                  {getFieldDecorator('name', {
                    rules: [{
                      required: true, message: '请输入标题'
                    }],
                  })(
                    <Input placeholder="标题"/>
                  )}
                </Form.Item>
              </div>
              <h1>内容</h1> 
               <Form.Item>
                  {getFieldDecorator('body', {
                    rules: [{
                      required: true, message: '请输入描述内容'
                    }],
                  })(
                    <TextArea placeholder="添加描述内容..."  style={{height:"300px"}}/>

                  )}
                </Form.Item>
                {/* <UploadComponent load={this.UploadFunc} style={{width:80,marginLeft:15}}></UploadComponent> */}
               </div>
          </div>
          
        <Divider/>
        <div className="fr">
        <Checkbox  onChange={this.RedieonChange}>标记为预行版</Checkbox>
        <p>标记此版本不适合生产使用</p>
        </div>
        <div className="clearfix mt15" style={{marginTop:5}} >
        <a className='topWrapper_btn_close fr' onClick={()=>this.handleSubmit(true)} style={{marginLeft:15}} >保存草稿</a>  <a className='topWrapper_btn fr' onClick={()=>this.handleSubmit(false)} style={{marginRight:15}}>发布版本</a>
        </div>
        </Form>
    </div>
    )
  }
}
const WrappedNewVersionForm = Form.create({ name: 'NewVersionForm' })(NewVersion);
export default WrappedNewVersionForm;