import React , { Component } from 'react';
import {Menu, Spin} from 'antd';
import { getImageUrl , markdownToHTML } from 'educoder';
import { Router , Route , Link } from 'react-router-dom';
import Top from './DetailTop';

import './list.css';

import SelectBranch from '../Branch/SelectBranch';
import CloneAddress from '../Branch/CloneAddress';
import RootTable from './RootTable';
import CoderRootFileDetail from './CoderRootFileDetail';
import NullData from './NullData';

import axios from 'axios';
/**
 * address:http和SSH，http_url(对应git地址)
 * branch:当前分支
 * filePath:点击目录时当前目录的路径
 * subfileType:保存当前点击目录的文件类型（显示目录列表时才显示新建文件，如果点击的是文件就不显示新建文件按钮）
 * readMeContent:根目录下面的readme文件内容
 */
class CoderRootDirectory extends Component{
  constructor(props){
    super(props);
    this.state={
      address:"http",
      branch:"master",
      filePath:[],
      http_url:undefined,
      subFileType:"",
      readMeContent:undefined,

      isSpin:true,

      branchList:undefined,
      fileDetail:undefined,
      branchLastCommit:undefined,
      current_user:undefined,

      rootData:undefined
    }
  }
  changeAddress=(address)=>{
    this.setState({
      address
    })
  }

  componentDidMount=()=>{
    let { search } = this.props.history.location;
    let branchName = undefined;
    if(search && search.indexOf("branch")>-1){
      branchName = search.split("=")[1];
      this.setState({
        branch:branchName
      })
    }
    const { branch } = this.state;
    this.getProjectRoot(branchName || branch);
  }

  // 获取根目录
  getProjectRoot=(branch)=>{
    const { current_user } = this.props;
    const { projectsId } = this.props.match.params;
    const { state } = this.props.history.location;
    console.log(this.props);
    const url = `/${state ? state : current_user && current_user.login}/${projectsId}/entries.json`;
    axios.get((url),{
      params:{
        branch
      }
    }).then((result)=>{
      if(result){
        if(result && result.data && result.data.length > 0){
          this.setState({
            filePath:[],
            fileDetail:undefined,
            isSpin: false
          })
          this.renderData(result.data);
        }
        this.setState({
          rootData:result.data
        })
      }

    }).catch((error)=>{})
  }

  ChangeFile=(arr,index)=>{
    this.renderUrl(arr.name,arr.path,arr.type);
    this.getFileDetail(arr);
    this.setState({
      subFileType:arr.type
    })
  }

  renderUrl=(name,path,type)=>{
    let list =[];
    const { filePath } = this.state;
    if(path.indexOf("/")){
      const array = path.split("/");
      let str = "";
      array.map((i,k)=>{
        str += '/'+i;
        return list.push({
          index:k,
          name:i,
          path:str.substr(1),
          type:(filePath && filePath.length>0) ? (filePath[k] ? filePath[k].type : type) : type
        })
      })
    }else{
      list.push({
        index:0,
        name,path,type
      })
    }
    this.setState({
      filePath:list
    })
  }

  // 获取子目录
  getFileDetail=(arr)=>{
    const { current_user } = this.props;
    const { projectsId } = this.props.match.params;
    const { branch } = this.state;
    const { state } = this.props.history.location;


    const url =`/${state ? state : current_user && current_user.login}/${projectsId}/sub_entries.json`;

    axios.get(url,{
      params:{
        filepath:arr.path,
        ref:branch
      }
    }).then((result)=>{
      if(result && result.data && result.data.length > 0){
        if(arr.type==="file"){
          this.setState({
            fileDetail:result.data[0],
            rootList:undefined
          })
        }else{
          this.setState({
            fileDetail:undefined
          })
          this.renderData(result.data)
        }
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  renderData=(data)=>{
    const rootList = [];
    const readMeContent = [];
    data && data.map((item,key)=>{
      rootList.push({
        key,
        ...item
      })
      if(item.name === 'README.md'){
        readMeContent.push({...item})
      }
    })
    this.setState({
      rootList:rootList,
      readMeContent
    })
  }

  // readme文件内容
  renderReadMeContent=(readMeContent)=>{
    const { fileDetail } = this.state;
    if(fileDetail){return;}
    if(readMeContent && readMeContent.length > 0){
      return(
        <div className="commonBox">
          <div className="commonBox-title">{readMeContent[0].name}</div>
          <div className="commonBox-info">
            {
              readMeContent[0].content  ?
              <div className={"markdown-body"} dangerouslySetInnerHTML={{__html: markdownToHTML(readMeContent[0].content).replace(/▁/g, "▁▁▁")}}></div>
              :
              <span>暂无~</span>
            }
          </div>
        </div>
      )
    }
  }

  // 选择分支
  changeBranch=(value)=>{
    const { branchList } = this.props;

    let branchLastCommit = branchList && branchList.length >0 && branchList[parseInt(value.key)];
    this.setState({
      branch:branchLastCommit.name,
      branchLastCommit,
      http_url:branchLastCommit.http_url,
      isSpin: true
    })
    this.getProjectRoot(branchLastCommit.name);

  }
  render(){
    const { rootList , branch ,filePath , fileDetail , subFileType , readMeContent, isSpin , rootData } = this.state;
    const { branchLastCommit , http_url , isManager , isDeveloper } = this.props;
    const { projectsId } = this.props.match.params;

    const columns = [
      {
        dataIndex: 'name',
        width:"100%",
        render: (text,item) => (
          <a onClick={()=>this.ChangeFile(item)}>
            <i className={ item.type === "file" ? "iconfont icon-zuoye font-15 color-blue mr5":"iconfont icon-wenjian font-15 color-blue mr5"}></i>{text}
          </a>
        ),
      }
    ];
    const title = () =>{
      if(branchLastCommit && branchLastCommit.last_commit){
        return(
          <div className="f-wrap-alignCenter">
            {
              branchLastCommit.author ?
                <React.Fragment>
                  <img src={getImageUrl(`images/${branchLastCommit.author.image_url}`)} className="radius mr10" width="32" height="32" alt=""/>
                  <span className="mr15">{branchLastCommit.author.login}</span>
                </React.Fragment>
              :""
            }
            <Link to={``} className="commitKey">{branchLastCommit.last_commit.id}</Link>
            <span className="color-blue flex-1 hide-1">{branchLastCommit.last_commit.message}</span>
            <span>{branchLastCommit.last_commit.time_from_now}</span>
          </div>
        )
      }else{
        return undefined;
      }
    }

    const downloadUrl = ()=>{
      if(branchLastCommit && branchLastCommit.zip_url){
        return(
          <Menu>
            <Menu.Item><a href={branchLastCommit.zip_url}>ZIP</a></Menu.Item>
            <Menu.Item><a href={branchLastCommit.tar_url}>TAR.GZ</a></Menu.Item>
          </Menu>
        )
      }
    }

    const urlRoot = filePath && filePath.length > 0 ? `/${filePath[filePath.length - 1].path}` : "";
    return(
      <React.Fragment>
        {
          rootData &&
          <React.Fragment>
          {
            rootData.length > 0 ?
            <div>
              <Top { ...this.props } {...this.state} />
              <div className="f-wrap-between mt20">
                <div className="f-wrap-alignCenter">
                  <SelectBranch branch={branch} changeBranch={this.changeBranch} {...this.props} {...this.state}></SelectBranch>
                  {
                    filePath && filePath.length > 0 &&
                    <span className="ml20 font-16">
                      <a onClick={()=>this.getProjectRoot(branch)} className="color-blue">{projectsId}</a>
                      {
                        filePath.map((item,key)=>{
                          return(
                            <React.Fragment>
                              {
                                key === filePath.length-1 ?
                                  <span className="color-grey-6 subFileName" key={key}>{item.name}</span>
                                  :
                                  <a onClick={()=>this.ChangeFile(item,key)} className="color-blue subFileName" key={key}>{item.name}</a>
                              }
                            </React.Fragment>
                          )
                        })
                      }

                    </span>
                  }

                </div>
                <div className="f-wrap-alignCenter">
                  {
                    subFileType !== "file" && isManager && isDeveloper &&
                    <p className="addFile">
                      <Link to={`/projects/${projectsId}/coder/${branch}/newfile${urlRoot}`} >新建文件</Link>
                      <Link to={``}>上传文件</Link>
                    </p>
                  }
                  {
                    filePath && filePath.length === 0 && <CloneAddress http_url={http_url} downloadUrl={downloadUrl} showNotification={this.props.showNotification}></CloneAddress>
                  }
                </div>
              </div>
              <Spin spinning={isSpin}>
                {/* 文件夹-子目录列表 */}
                {
                  rootList && <RootTable columns = {columns} data={rootList} title={() => title()}></RootTable>
                }

                {
                  fileDetail &&
                  <CoderRootFileDetail detail = {fileDetail} {...this.props} {...this.state}></CoderRootFileDetail>
                }

                {/* readme.txt */}
                { this.renderReadMeContent(readMeContent) }
              </Spin>
            </div>
            :
            <NullData {...this.props} {...this.state} http_url={http_url} ></NullData>
          }
        </React.Fragment>
        }
      </React.Fragment>
    )
  }
}
export default CoderRootDirectory;
