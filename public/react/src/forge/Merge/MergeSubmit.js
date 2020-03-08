import React , {Component} from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';
import Nav from '../Order/Nav';
import UploadComponent from '../Upload/Index';

import{ Modal,Col,Form,Input,Tooltip,Popconfirm,Table} from 'antd'
import NoneData from '../../modules/courses/coursesPublic/NoneData';
import { getImageUrl } from 'educoder';


const TextArea = Input.TextArea;


class MergeSubmit extends Component{
  constructor(props){
    super(props);
    this.state={
      data:undefined,
      isShow:false,
      imgsrc:'',
      journalsdata:undefined,
      //图片区域是否显示 none 隐藏 block 显示
      display:'none',
      titledisplay:'none',
      countvalue:'',
      //是否需要编辑
      isedit:'block',
      limit:50,
      page:1,
      titledata:undefined,
    }
  }
  
  componentDidMount=()=>{
    
    this.getDetail();
  }

  getDetail=()=>{
    const { projectsId , mergeId} = this.props.match.params;
    const url = `/projects/${projectsId}/pull_requests/${mergeId}.json`;
    axios.get(url).then((result)=>{
      if(result){
        this.setState({
          data:result.data,
        })
        const { page , limit } = this.state;
    
        this.getCommitList( result.data.pull_request.base , page , limit );
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

    handleok=() => {
      this.setState({
        isShow:false
      });
    };
    handleCancel=()=>{
      this.setState({
        isShow:false
      });
    }

    imgshow=()=>{
      this.setState({
        isShow:true
      }); 
    };

 //获取提交列表
  getCommitList=(branch , page , limit)=>{
    const { login } = this.props.current_user;
    const { projectsId } = this.props.match.params;
    const url = `/${login}/${projectsId}/commits.json`;
    axios.get(url,{
      params:{
        sha:branch,
        page,
        limit
      }
    }).then((result)=>{
      if(result){
        const array = [];
        result.data && result.data.commits.length > 0 && result.data.commits.map((item,key)=>{
          array.push({
            name:item.author && item.author.name,
            image_url:item.author && item.author.image_url,
            sha:item.sha,
            time_from_now:item.time_from_now,
            message:item.message
          })
        })
        this.setState({
          titledata:array,
          dataCount:result.data.total_count,
          isSpin:false
        })
      }
    }).catch((error)=>{console.log(error)})
  }


  render(){
    const { projectsId,mergeId} = this.props.match.params;
    const { data,titledata} = this.state;
    
    
    const columns=[{
        title:"作者",
        dataIndex: 'name',
        width:"10%",
        render: (text,item) => (
          <span className="f-wrap-alignCenter">
            <img src={getImageUrl(`images/${item.image_url}`)} alt="" width="28px" height="28px" className="mr3 radius"/>
            <label className="hide-1" style={{maxWidth:"75px"}}>{text}</label>
          </span>
        ),
      },{
        title:"SHA",
        dataIndex: 'sha',
        render: (text) => (
          <span className="commitKey">{text}</span>
        )
      },{
        title:"备注",
        dataIndex: 'message',
        render: (text) => (
          <span>{text}</span>
        )
      },{
        title:"提交时间",
        className:"edu-txt-right",
        dataIndex: 'time_from_now',
        render: (text) => (
          <span>{text}</span>
        )
      }]
  
      const title =()=>{
        return(
          <div className="f-wrap-between" style={{alignItems:"center"}}>
            <span className="font-16">提交列表</span>
            {/* <div className="f-wrap-alignCenter">
              <Input placeholder="搜索提交历史" style={{width:"300px"}}/>
              <Checkbox className="ml15">所有分支</Checkbox>
              <a className="btn_32 ml15">搜索</a>
            </div> */}
          </div>
        )
      }

    const url = this.props.history.location.pathname;
    return(
      <div className="main">
      <div className="topWrapper">
        <Nav  {...this.props} {...this.state}/>
        <Link to={`/projects/${projectsId}/merge/new`} className="topWrapper_btn">创建合并请求</Link>
      </div>
      <div>
        <div className="detailContent">
          <p>
            {
              data ?
                <span className="font-20">【{ data.issue.tracker}】</span>
                :
                ""
            }
            <span className="font-20" > { data && data.issue.subject }</span>

          </p>
          <p className="mt10 color-grey-c">
           <span className={data&&data.issue.issue_status==="关闭"?"closedetail":"opendetail"}>{data&&data.issue.issue_status==="关闭"?"关闭中":"开启中"} </span>
            <span className="ml10 lineH32">
              由 { data && data.issue.author_name} 于 { data && data.issue.created_at }创建{ data && data.issue.journals_count && data.issue.journals_count > 0 ?` · ${data.issue.journals_count} 条评论`:""}
            </span>
            <span className="pull-right lineH32">
              <Link to={`/projects/${projectsId}/merge/${mergeId}/UpdateMerge`} className="color-blue fr">编辑</Link>
            </span>
          </p>
        </div>
     
  
        <div className="detailHeader-wrapper">
          <div className="normal f-wrap-between">
            <ul className="headerMenu-wrapper" style={{paddingTop:42,paddingLeft:15}}>
              <li className={url.indexOf("Messagecount")>0? "active" : ""}><Link to={`/projects/${projectsId}/merge/${mergeId}/Messagecount`}>对话内容</Link></li>
               <li className={url.indexOf("MergeSubmit")>0 ? "active" : ""}><Link to={`/projects/${projectsId}/merge/${mergeId}/MergeSubmit`}>代码提交</Link></li>
            </ul>
          </div>
        </div>
          <Table
            className="mt20 wrap-commit-table"
            columns={columns}
            dataSource={titledata}
            showHeader={false}
            size="small"
            pagination={false}
            title={() => title()}
          />
      </div>
    </div>
    )
  }
}

const WrappedMergeSubmitForm = Form.create({ name: 'MergeSubmitForm' })(MergeSubmit);
export default WrappedMergeSubmitForm;