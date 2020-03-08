import React , {Component} from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';
import Nav from '../Order/Nav';
import UploadComponent from '../Upload/Index';

import{ Modal,Col,Form,Input,Tooltip,Popconfirm } from 'antd'
import NoneData from '../../modules/courses/coursesPublic/NoneData';


const TextArea = Input.TextArea;


class MergeDetail extends Component{
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
      showFiles: true
    }
  }
  
  componentDidMount=()=>{
    this.getDetail();
  }

  getDetail=()=>{
    const { projectsId , mergeid} = this.props.match.params;
    const url = `/projects/${projectsId}/pull_requests/${mergeid}.json`;
    axios.get(url).then((result)=>{
      if(result){
        this.setState({
          data:result.data,
        })
      this.getjournalslist();
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

    //添加评论 
    addjournals=()=>{
      this.props.form.validateFieldsAndScroll((err, values) => {
        if(!err){
          const { data } = this.state;
          const url = `/issues/${data.pull_request.id}/journals.json`;
          axios.post(url,{
            ...values,
            issue_id:data.id,
          }).then(result=>{
            if(result){
              this.setState({
                showFiles: false
              })
              this.getjournalslist();
            }
          }).catch(error=>{
            console.log(error);
          })
        }
      })
    }
    //获取评论信息
    getjournalslist=()=>{
      const { data } = this.state;
      const url = `/issues/${data.pull_request.id}/journals.json`;
      let id=data.id;
      axios.get(url,{
        params:{
          id
        }
      }).then(result=>{
        if(result){
          this.setState({
            journalsdata:result.data
          })  
        }
      }).catch(error=>{
        console.log(error);
      })
    }
  
    //关闭工单
    closedetail=(id)=>{
    const {projectsId,orderId} = this.props.match.params;
    const url = `/projects/${projectsId}/issues/${orderId}/close_issue.json`;
    axios.post(url,{
      project_id:projectsId,
      id:orderId,
      status_id:id,
    }).then(result=>{
      if(result){
        this.getDetail();
      }
    }).catch(error=>{
      console.log(error);
    })
    }

    //修改评论
    updatedetail=(id)=>{
      const {mergeid} = this.props.match.params;
      const url = `/issues/${mergeid}/journals/${id}.json`;
      axios.put(url,{
        issue_id:mergeid,
        id:id,
        content:this.state.countvalue
      }).then(result=>{
        if(result){
          this.setState({
            isedit:'block'
          })  
          this.getjournalslist();
        }
      }).catch(error=>{
        console.log(error);
      })
    }

    changmodelname=(e)=>{
      this.setState({
        countvalue:e.target.value
      })
    }
    editdetail=(count,status)=>{
      this.setState({
        countvalue:count,
        isedit:status
      })  
    }

// 判断是否重新上传文件
  changeIsComplete=(flag)=>{
    this.setState({
      showFiles:flag
    })
  }
  render(){
    const { projectsId,mergeid} = this.props.match.params;
    const { data,journalsdata, showFiles } = this.state;
    const { getFieldDecorator } = this.props.form;
    const url = this.props.history.location.pathname;
    const renderList =()=>{
      if(journalsdata && journalsdata.issue_journals && journalsdata.issue_journals.length>0 ){
       return(
         <div className="tagList">{
          journalsdata.issue_journals.map((item,key)=>{
               return(
                 <li>
                <div className="df">
                <Link to={``}><img class="user_img" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1608431072,669449145&fm=27&gp=0.jpg" alt=""/></Link>
                  <div className="detail_context" >
                  <div className="topWrapper_detali">
                    <p className="detail_p">{item.user_name}
                   <Tooltip title={item.format_time} placement="bottom">
                  <span className="commenttitle">于{item.created_at}</span>
                  </Tooltip>
                   评论</p>
                   <div className="detail_right">
                    <i className="iconfont icon-weibiaoti1 font-18 mr3" onClick={()=>this.editdetail(item.content,'none')}></i> 
                    <div style={{width:20}}></div>
                    <Popconfirm placement="bottom" title={'确定要删除当前评论吗'}  okText="是" cancelText="否" onConfirm={()=>this.deletedetail(item.id)}>
                    <i className="iconfont icon-yiguanbi1 font-18 mr3"></i> 
                    </Popconfirm>
                     </div>   
                  
                    </div>
                    <div className="detail_ptitlecount">
                      <p style={{display:this.state.isedit}} >{item.content}</p>
                      <div style={{display:this.state.isedit==='none'?'block':'none'}}>
                    <TextArea style={{height:"200px"}} value={this.state.countvalue} onChange={this.changmodelname}/>
                    <p className="clearfix mt15">
                    <a className="topWrapper_btn fr" type="submit" onClick={()=>this.updatedetail(item.id)}>保存</a>
                    <a className="Closeor_btn fr" type="submit" onClick={()=>this.editdetail(item.content,'block')}>取消</a>
                  </p>
                  </div>
                     </div>
                    <div style={{display: this.state.display}}>
                    <div className="div_line" ></div>
                    {/* <List
                         grid={{ gutter: 16, column: 6 }}
                         dataSource={valuse}
                          renderItem={obj => (
                          <List.Item>
                            <img class="list_img" onClick={this.imgshow} src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1608431072,669449145&fm=27&gp=0.jpg" alt=""/>      
                            </List.Item>
                          )}
                      /> */}
                    </div>
                  </div>
                  </div>
                  <div className="order_line" style={{marginLeft:80}}></div>
                  </li>
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
        <Nav  {...this.props} {...this.state}/>
        <Link to={`/projects/${projectsId}/merge/new`} className="topWrapper_btn">创建合并请求</Link>
      </div>
      <div>
        <div className="detailContent">
          <p>
            <span className="font-16" > { data && data.issue.subject}</span>
            <div>       
            <Link to={`/projects/${projectsId}/merge/${mergeid}/updatemerge`} className="color-blue fr">编辑</Link>
            </div>
          </p>
          <p className="mt15">{ data && data.issue.description}</p>
          <p className="mt10 color-grey-c">
           <div className={data&&data.issue_status==="关闭"?"closedetail":"opendetail"}>{data&&data.issue_status==="关闭"?"关闭中!":"开启中!"} </div>
            由 { data && data.issue.author_name} 于 { data && data.issue.created_at }创建{ data && data.issue.journals_count && data.issue.journals_count > 0 ?` · ${data.issue.journals_count} 条评论`:""}
          </p>
        </div>
     
  
        <div className="detailHeader-wrapper">
          <div className="normal f-wrap-between">
            <ul className="headerMenu-wrapper">
              <li className={url.indexOf("Messagecount")>0? "active" : ""}><Link to={`/projects/${projectsId}/merge/${mergeid}/Messagecount`}>对话内容</Link></li>
               <li className={url.indexOf("MergeSubmit")>0 ? "active" : ""}><Link to={`projects/${projectsId}/merge/${mergeid}/MergeSubmit`}>代码提交</Link></li>
            </ul>
          </div>
        </div>



        <div className="f-wrap-between mt20" style={{alignItems:"flex-start"}}>
          <div className="list-right df divwidth" >
            <ul className="ul_width">
                {renderList()} 
              <li>
              <div className="df">
              <Link to={``}><img class="user_img" onClick={this.imgshow} src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1608431072,669449145&fm=27&gp=0.jpg" alt=""/>      </Link>
              <div className="new_context">
                <Form.Item>
                {getFieldDecorator('content', {
                     rules: [{
                      required: true, message: '请输入内容'
                    }],
                  })(
                      <TextArea placeholder="请输入描述内容..." style={{height:"200px"}}/>
                  )}
                </Form.Item>
                <UploadComponent load={this.UploadFunc} isComplete={showFiles} changeIsComplete={this.changeIsComplete}></UploadComponent>
                <p className="clearfix mt15">
                <a className="topWrapper_btn fr" type="submit" onClick={this.addjournals}>评论</a>
                  <a className="Closeor_btn fr" type="submit" onClick={()=>this.closedetail(data&&data.issue_status==="关闭"?2:5)}>{data&&data.issue_status==="关闭"?"开启":"关闭"}</a>
                </p>
              </div>
              </div>
              </li>
            </ul>
          </div>
          <div className="list-left DetailRight">
            <p>
              <span className="span_title">当前状态</span>
              <span>{data && data.issue.issue_status}</span>
            </p>
            <p>
              <span className="span_title">优先级</span>
              <span>{data && data.issue.priority}</span>
            </p>
            <p>
              <span className="span_title">指派给</span>
              <span>{data && data.issue.assign_user_name}</span>
            </p>
            <p>
              <span className="span_title">里程碑</span>
              <span>{data&&data.issue.version===null?"未添加里程碑":data&&data.issue.version.length===0?data.issue.version:'未添加里程碑'}</span>
            </p>
          </div>
        </div>
      </div>
      <Modal
      onCancel={this.handleCancel}
      visible={this.state.isShow}
      width="400px"
      footer={
        []
      }
      bodyStyle={{textAlign:'center'}}
      >
      <img class="list_img" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1608431072,669449145&fm=27&gp=0.jpg" alt=""/>
      </Modal>
    </div>
    )
  }
}

const WrappedMergeDetailForm = Form.create({ name: 'MergeDetailOrderForm' })(MergeDetail);
export default WrappedMergeDetailForm;