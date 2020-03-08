import React , { Component } from "react";
import Editor from "react-monaco-editor";

import UserSubmitComponent from './UserSubmitComponent';
import { Input } from 'antd';
import './index.css';

class Index extends Component{
  constructor(props){
    super(props);
    this.state={
      editorValue:"",
      filename:""
    }
  }

  // 命名文件
  changeFileName=(e)=>{
    this.setState({
      filename:e.target.value
    })
  }
  // 取消，弹框询问
  CancelAddFile=()=>{

  }

  changeEditor=(editorValue)=>{
    this.setState({
      editorValue
    })
  }

  render(){
    const { editorValue , filename } = this.state;
    const { projectDetail } = this.props;

    const { pathname } = this.props.location;
    const urlroot = pathname.split("newfile")[1];
    return(
      <div className="main">
        <div className="f-wrap-alignCenter">
          <div className="setInputAddon">
            <Input addonBefore={`/${projectDetail && projectDetail.identifier}${urlroot}/`} value={filename} onChange={this.changeFileName} placeholder="命名文件..."/>
          </div>
          <a onClick={this.CancelAddFile} className="color-blue">取消</a>
        </div>
        <div className="branchTable">
          <p className="branchTitle">新建文件</p>
          <Editor
            height="320px"
            theme={"vs-dark"}
            value={editorValue}
            onChange={this.changeEditor}
          />
        </div>
        <UserSubmitComponent 
          {...this.props} 
          {...this.state} 
          filepath={`${urlroot}/${filename}`}
          content={editorValue}
        ></UserSubmitComponent>
      </div>
    )
  }
}
export default Index;