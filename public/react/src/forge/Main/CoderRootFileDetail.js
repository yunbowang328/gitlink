import React , { Component } from "react";
import Editor from "react-monaco-editor";

import { Popconfirm, Result } from 'antd';

import './list.css';

import axios from 'axios';
function bytesToSize(bytes) {
  if (bytes === 0) return '0 B';
  let k = 1024,
  sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)). toFixed(2) + ' ' + sizes[i];
}
class CoderRootFileDetail extends Component{
  constructor(props){
    super(props);
    this.state={
      readOnly:true,
      value:undefined
    }
  }

  componentDidMount=()=>{
    const { detail } = this.props;

    this.setState({
      value: detail.content
    })
  }

  EditFile=()=>{
    this.setState({
      readOnly:false
    })
  }
  CancelEdit=()=>{
    this.setState({
      readOnly:true
    })
  }

  // 编辑文件
  changeContent=(e)=>{
    this.setState({
      value:e
    })
  }

  deleteFile=()=>{
    const { author , branch , detail }= this.props;
    const { projectsId } = this.props.match.params;

    const url =  `/${author.login}/${projectsId}/contents/files/delete.json`;
    axios.delete(url,{
      params:{
        filepath:detail.path,
        branch
      }
    }).then(result=>{
      if(result){
        this.props.showNotification("删除成功!");
        this.props.history.push(`/projects/${projectsId}`);
      }
    }).catch(error=>{
      console.log(error);
    })
  }



  // 确认修改文件
  UpdateFile=()=>{
    console.log("user", this.props)
    const { author , branch , detail}= this.props;
    const { projectsId } = this.props.match.params;
    const { value } = this.state;
    const url =`/${author.login}/${projectsId}/contents/files/update.json`;
    axios.put(url,{
      filepath:detail.path,
      branch,
      content:value,
      sha:detail.sha,
    }).then(result=>{
      if(result){
        this.props.showNotification("修改成功!");
        this.setState({
          readOnly:true
        })
      }
    }).catch(error=>{
      console.log(error);
    })
  }

  render(){
    const { detail } = this.props;
    const { readOnly ,value } = this.state;
    return(
      <div>
        <div className="branchTable">
          <p className="branchTitle f-wrap-alignCenter f-wrap-between">
            <span>{bytesToSize(detail && detail.size)}</span>
            <span>
            {
              readOnly ?
                <a onClick={this.EditFile} className="ml20"><i className="iconfont icon-bianji font-15 color-grey-6"></i></a>
                :
                <React.Fragment>
                  <button type="button" className="ant-btn ant-btn-sm mr10" onClick={this.CancelEdit}><span>取 消</span>
                  </button>
                  <button type="button" className="ant-btn ant-btn-primary ant-btn-sm" onClick={this.UpdateFile}><span>确 定</span>
                  </button>
                </React.Fragment>
            }

              <Popconfirm title="确认删除这个文件？" className="ml20" okText="确定" cancelText="取消" onConfirm={this.deleteFile}>
              <a><i className="iconfont icon-shanchu font-15 color-grey-6"></i></a>
            </Popconfirm>
          </span>
          </p>
        </div>
        <div className="content-file">
          {
            detail.direct_download ?
              <div className="text-center">
                <a href={detail.download_url} className="color-blue font-15">下载原始文件</a>
              </div>
              :
              <Editor
                height="300px"
                theme={"vs-dark"}
                value={value}
                onChange={this.changeContent}
                readOnly={readOnly}
              />
          }
        </div>
      </div>


    )
  }
}

export default CoderRootFileDetail;