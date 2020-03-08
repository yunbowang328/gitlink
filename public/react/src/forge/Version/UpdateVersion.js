import React , { Component } from "react";
import { Form , Input , Select,Divider,Button,Checkbox,Dropdown,Menu} from 'antd';
import {Link} from 'react-router-dom';

import UploadComponent from '../Upload/Index';
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
      pull:undefined,
      tag_name:'',
      data:undefined
    }
  }

  componentDidMount=()=>{
    this.getSelectList();
  }

  getSelectList=()=>{
    const { projectsId,versionId} = this.props.match.params;
    const url = `/projects/${projectsId}/version_releases/${versionId}/edit.json`;
    axios.get(url).then((result)=>{
      if(result){
        this.setState({
            data:result.data,
          pull:result.data.target_commitish
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }


  //delete
  deleteversion=()=>{
    const { projectsId , versionId} = this.props.match.params;
    const url = `/projects/${projectsId}/version_releases/${versionId}.json`;
      axios.delete(url,{ data: {
        project_id: projectsId,
        id:versionId
      }
    }).then((result)=>{
        if(result){
          this.props.history.push(`/projects/${projectsId}/version`);

        }
      }).catch((error)=>{
        console.log(error);
      })
  }

  // 创建
  handleSubmit=()=>{
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(!err){
        const { projectsId,versionId} = this.props.match.params;
        const { pull,ischeck } = this.state;
        const url = `/projects/${projectsId}/version_releases/${versionId}.json`;
        // if(values.issue_type==="普通"){
        //   values.issue_type="1"
        // }
        axios.put(url,{
          ...values,
          tag_name:this.state.data&&this.state.data.tag_name,
          draft:false,
          prerelease:ischeck,
          target_commitish:pull
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

  RedieonChange=(e)=>{
     this.setState({
      ischeck:e.target.checked
     })
  }
  Preservation=()=>{
    alert(this.state.data.tag_name)  
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
    const { projectsId } = this.props.match.params;
    return(
        <div className="main">
          <Form>
          <h1 style={{marginLeft:15,marginTop:20}}>发布新版</h1>
          <h5 style={{marginLeft:15}}>版本发布组织项目的版本。</h5>
          <Divider/>
          <div  style={{display:'flex',marginLeft:15}}>
            {this.state.data&&this.state.data.tag_name}@{this.state.data&&this.state.data.target_commitish}
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
                    initialValue:this.state.data&&this.state.data.name
                    
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
                    initialValue:this.state.data&&this.state.data.body
                  })(
                    <TextArea placeholder="添加一个可选的扩展描述。。。"  style={{height:"300px"}}/>

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
        <a className='topWrapper_btn_delete fr' onClick={()=>this.deleteversion()} style={{marginLeft:15}}>删除发布</a>  
        <a className='topWrapper_btn fr' onClick={()=>this.handleSubmit()} style={{marginRight:15}}>编辑发布信息</a>
        <Link to={`/projects/${projectsId}/version`} style={{marginRight:30}} className='topWrapper_btn fr'>取消</Link>
        </div>
        </Form>
    </div>
    )
  }
}
const WrappedNewVersionForm = Form.create({ name: 'NewVersionForm' })(NewVersion);
export default WrappedNewVersionForm;