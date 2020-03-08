import React , { Component } from "react";
import {Link} from 'react-router-dom';
import { Input ,Dropdown , Menu , Icon , Pagination , Spin, Divider } from 'antd';
import NoneData from '../../modules/courses/coursesPublic/NoneData';
import Nav from '../Order/Nav';
import './version.css';


import axios from 'axios';

const Search = Input.Search;
/**
 * issue_chosen:下拉的筛选列表,
 * data:列表接口返回的所有数据,
 * issues:列表数组,
 * isSpin:加载中,
 * search:搜索关键字,
 * author_id:发布者id,
 * assigned_to_id:指派给。。。的id，
 * limit:每页条数,
 * page:当前页,
 * search_count:列表总条数
 * issue_type:搜索条件
 */
class version extends Component{
  constructor(props){
    super(props);
    this.state={
      issue_chosen:undefined,
      data:undefined,
      issues:undefined,
      isSpin:false,
      search:undefined,
      author_id:undefined,
      assigned_to_id:undefined,
      limit:15,
      page:1,
      search_count:undefined,
      issue_type:undefined
    }
  }

  componentDidMount=()=>{
    this.getIssueList();
  }
  // 获取列表数据
  getIssueList=(page,limit,search,author_id,assigned_to_id,id,value)=>{
    const { projectsId } = this.props.match.params;
    const url = `/projects/${projectsId}/version_releases.json`;
    axios.get(url).then((result)=>{
      if(result){
        this.setState({
          data:result.data,
          issues:result.data.issues,
          search_count:result.data.search_count,
          isSpin:false
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

 


  render(){
    const { projectsId } = this.props.match.params;
    const{data}=this.state
    const renderList =()=>{
      if(data && data.releases && data.releases.length>0 ){
        return(
          <div>{
              data.releases.map((item,key)=>{
                return(
                  <div>
                <div style={{display:'flex'}}>
                  <div className="versionleft">
                    <div className="versionrighe"></div><span  className={item&&item.draft==="稳定"?"opendversionetail":"closedversionetail"} style={{marginTop:5,margin:'auto',marginRight:15}}>{item.draft} </span>
                    </div>
                    <div className="version_line_one">
                      <p className="versionrectangle"> </p>
                    </div>
                  {
                    data && data.user_permission ?
                      <div className="versionrighe">
                        <h1 style={{marginLeft:15,marginTop:5}}>{item.name}<Link to={`/projects/${projectsId}/version/${item.version_id}/upversion`} style={{color:'blue',fontSize:10,marginLeft:5}}>(编辑)</Link> </h1>
                      </div>
                      : ''
                  }

                </div>
                  <div style={{display:'flex'}}>
                  <div className="versionleft">
                   <span style={{marginTop:5,margin:'auto',marginRight:15}}>{item.tag_name} </span>
                    </div>
                    <div className="version_line_one">
                    <p  style={{width:4}}> </p>

                    </div>
                    <div className="versionrighe">
                    <h5 style={{marginLeft:15,marginTop:10}}>{item.body} </h5>
                    </div>
                </div>
                <div style={{display:'flex'}}>
                  <div className="versionleft">
                   <span style={{marginTop:5,marginRight:15}}></span>
                    </div>
                    <div className="version_line_tpw">
                    <p  style={{width:4}}> </p>
                    </div>
                    <div className="versionrighe">
                    <h1 style={{marginLeft:15,marginTop:10}}>下载附件 
                    </h1>
                      <a href={item.zipball_url} download="源代码(ZIP)" style={{color:'blue',marginLeft:15}}>源代码(ZIP)</a>
                      <a href={item.tarball_url} download="源文件(TAR.GZ)" style={{color:'blue',marginLeft:15}}>源文件(TAR.GZ)</a>
                  </div>
                </div>
                <div style={{display:'flex'}}>
                  <div className="versionleft">
                   <span style={{marginTop:5,marginRight:15}}></span>
                    </div>
                    <div className="version_line_tpw">
                    <p  style={{width:4}}> </p>
                    </div>
                    <div className="versionrighe">
                  </div>
                </div>
                </div>
                )
              })
            }
          </div> 
        )
      }else{
       return(
         <NoneData />
       )
     }
   }

    return(
      <div className="main">
        <div className="topWrapper">
          <h1>版本发布</h1>
          {
            data && data.user_permission ?
              <Link to={`/projects/${projectsId}/version/new`} className="topWrapper_btn">发布新版</Link>
              : ''
          }

        </div> 
        <div>
        {renderList()}
        </div>
      
    </div>
    )
  }
}
export default version;