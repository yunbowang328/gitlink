import React , {Component} from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';
import Nav from '../Order/Nav';
import UploadComponent from '../Upload/Index';
import { getImageUrl } from 'educoder';
import {Modal, Col, Form, Input, Tooltip, Popconfirm, Pagination  , Spin,Dropdown,Icon,Menu} from 'antd'
import NoneData from '../../modules/courses/coursesPublic/NoneData';
import Attachments from '../Upload/attachment'
import './merge.css';


const TextArea = Input.TextArea;


class MessageCount extends Component{
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
      isedit:undefined,
      fileList:undefined,
      limit:10,
      page:1,
      search_count:undefined,
      isSpin:false,
      showFiles: true,
      ismesrge:'none',
      buttonshow:'none',
      mergename:'合并请求',
      mergekey:'merge',
      title:'',
      body:''
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
          data:result.data
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
          const { data, page, limit, fileList } = this.state;
          const url = `/issues/${data.issue.id}/journals.json`;
          axios.post(url,{
            ...values,
            issue_id:data.id,
            attachment_ids:fileList
          }).then(result=>{
            if(result){
              this.props.form.setFieldsValue({
                content: "",
                attachments_ids: undefined
              });
              this.setState({
                showFiles: false
              })
              this.getjournalslist(page, limit);
              this.props.showNotification("评论成功！");
              // this.UploadFunc(undefined)
            }
          }).catch(error=>{
            console.log(error);
          })
        }
      })
    }
    //获取评论信息
    getjournalslist=(page, limit)=>{
      const { data} = this.state;
      const url = `/issues/${data.issue.id}/journals.json`;
      let id=data.id;
      axios.get(url,{
        params:{
          id,page,limit
        }
      }).then(result=>{
        if(result){
          this.setState({
            journalsdata:result.data,
            search_count:result.data.journals_count,
            isSpin:false,
            fileList:undefined,
            showFiles: true
          })
        }
      }).catch(error=>{
        console.log(error);
      })
    }


    //关闭工单
    closedetail=(id)=>{
    const {projectsId,orderId} = this.props.match.params;
    const {data } = this.state;
    const url = `/projects/${projectsId}/issues/${data.issue.id}/close_issue.json`;
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

    //合并请求
    prmerge=()=>{
      const {projectsId} = this.props.match.params;
      const {data,title,body,mergekey} = this.state;
      const url = `/projects/${projectsId}/pull_requests/${data.pull_request.id}/pr_merge.json`;
      axios.post(url,{
        project_id:projectsId,
        id:data.pull_request.id,
        do:mergekey,
        body:body,
        title:title,
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
      console.log("updtedetail", this.state)
      const {page, limit,data } = this.state;
      const {orderId} = this.props.match.params;
      const url = `/issues/${data.issue.id}/journals/${id}.json`;
      axios.put(url,{
        issue_id:orderId,
        id:id,
        content:this.state.countvalue
      }).then(result=>{
        if(result){
          this.setState({
            isedit: undefined
          })
          this.getjournalslist(page, limit);
        }
      }).catch(error=>{
        console.log(error);
      })
    }
  // 获取上传后的文件id数组
  UploadFunc=(fileList)=>{
    this.setState({
      fileList
    })
  }

    //删除评论
    deleteorder=(id)=>{
      const { orderId} = this.props.match.params;
      const { page, limit,data } = this.state;
      const url = `/issues/${data.issue.id}/journals/${id}.json`;
        axios.delete(url,{ data: {
          issue_id: orderId,
          id:id
        }
      }).then((result)=>{
          if(result){
            this.getjournalslist(page,limit)
          }
        }).catch((error)=>{
          console.log(error);
        }) 
    }
    
    changmodelname=(e)=>{
      this.setState({
        countvalue:e.target.value
      })
    }
    changtitlepr=(e)=>{
      this.setState({
        title:e.target.value
      })  
    }

    changbodypr=(e)=>{
      this.setState({
        body:e.target.value
      })
    }
    editdetail=(count,status)=>{
      this.setState({
        countvalue:count,
        isedit:status
      })  
    }
    submitmerge=()=>{
      if(this.state.mergekey==="rebase"){
        this.setState({
          buttonshow:'block',
          ismesrge:'none'
        })
      }else{
        this.setState({
          ismesrge:'block',
          buttonshow:'block'
        })
      }
     
    }


    nonemerge=()=>{
      this.setState({
        ismesrge:'none',
        buttonshow:'none'
      })
    }

  renderJournalList=(list)=>{
    if(list && list.length >0){
      return(
        list.map((item,key)=>{
          return(
            <div key={key+1} className="journal-list-item">
              <span className="font-weight-bold mr3">
                {item.detail}：
              </span>
              <span className="mr5 color-grey-9">
                {item.old_value &&item.old_value.length > 0 ? "更新为" : "新增"}
              </span>
              <span>
                {item.value && item.value.length > 0 ?
                  item.detail === "标签" ?  <span className="issue-tag-show" style={{background: item.value[0].color}}>{item.value[0].name}</span> : item.value
                    :
                  "无"
                }
              </span>
            </div>
          )
        })
      )
    }else{
      return(
        <div>
          <span>没有评论~</span>
        </div>

      )
    }
  }


  // 翻页
  ChangePage=(page)=>{
    this.setState({
      page,
      isSpin:true
    })
    const {limit} =  this.state;
    this.getjournalslist(page,limit);
  }
  getOption=(e)=>{
    this.setState({
      mergename:e.item.props.value,
      mergekey:e.key,
      title:'',
      body:''
    })
  }

  render(){
    const { projectsId,mergeId} = this.props.match.params;
    const { data,journalsdata, page, limit, search_count, isSpin, isedit, showFiles } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { current_user } = this.props;
    const url = this.props.history.location.pathname;


    const menu = (
      <Menu onClick={(e)=>this.getOption(e)}>
        <Menu.Item key={'merge'} value="合并请求">合并请求</Menu.Item>
        <Menu.Item key={'rebase'} value="变基并合并">变基并合并</Menu.Item>
        <Menu.Item key={'rebase-merge'} value="变基合并 --no-ff">变基合并 --no-ff</Menu.Item>
        <Menu.Item key={'squash'} value="压缩提交并合并">压缩提交并合并</Menu.Item>
      </Menu>
    )

    const Paginations = (
      <React.Fragment>
        {
          search_count > limit ?
            <div className="pt30 mb50 edu-txt-center btp1">
              <Pagination simple defaultCurrent={page} total={search_count} pageSize={limit} onChange={this.ChangePage}></Pagination>
            </div>:""
        }
      </React.Fragment>
    )
    const renderList =()=>{
      if(journalsdata && journalsdata.issue_journals && journalsdata.issue_journals.length>0 ){
       return(
         <div className="tagList">{
          journalsdata.issue_journals.map((item,key)=>{
               return(
                 <li key={key}>
                <div className="df">
                  <Link to={``}><img className="user_img" src={getImageUrl(`images/${item.user_picture && item.user_picture}`)} alt=""/></Link>
                  <div className="detail_context" >
                  <div className="topWrapper_detali">
                    <p className="ml6 detail_p lineH40">
                      {item.user_name}
                      <span className="color-grey-9 ml3 mr3">评论于</span>
                     <Tooltip title={item.format_time} placement="bottom">
                      <span>{item.created_at}</span>
                    </Tooltip>
                   </p>
                   <div className="detail_right" style={{display: current_user && (current_user.admin || current_user.login === item.user_login) ? "block" : "none"}}>
                     <span onClick={()=>this.editdetail(item.content,item.id)} className="detail_edit_action">编辑</span>
                     <Popconfirm placement="bottom" title={'确定要删除当前评论吗'}  okText="是" cancelText="否" onConfirm={()=>this.deleteorder(item.id)}>
                      <span className="detail_edit_action">删除</span>
                     </Popconfirm>
                     </div>
                    </div>
                    <div className="detail_ptitlecount">
                      <div style={{display: (isedit && isedit === item.id) ? "none" : "block"}} >
                        {
                          item.content ?
                            <div>{item.content}</div>
                            :
                            <div>
                              {this.renderJournalList(item.journal_details)}
                            </div>
                        }
                        {
                          item && item.attachments.length > 0 ?
                            <Attachments attachments={item.attachments} showNotification={this.props.showNotification} canDelete={current_user && (current_user.admin || current_user.login === item.user_login)}/>
                            :
                            ""
                        }
                      </div>
                      <div style={{display: (isedit && isedit === item.id) ? "block" : "none"}}>
                        <TextArea style={{height:"200px"}} value={this.state.countvalue} onChange={this.changmodelname}/>
                        <p className="clearfix mt15">
                          <a className="topWrapper_btn fr" type="submit" onClick={()=>this.updatedetail(item.id)}>保存</a>
                          <a className="a_btn cancel_btn fr" type="submit" onClick={()=>this.editdetail(item.content,undefined)}>取消</a>
                        </p>
                      </div>
                     </div>
                    <div style={{display: this.state.display}}>
                    <div className="div_line" ></div>

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
            {
              data ?
                <span className="font-20">【{ data.issue.issue_classify==='issue'?data.issue.tracker:"合并"}】</span>
                :
                ""
            }
            <span className="font-20" > { data && data.issue.subject }</span>

          </p>
          <p className="mt10 color-grey-c">
           <span className={data&&data.issue.issue_status==="关闭"?"closedetail":data&&data.pull_request.status===0?"opendetail":"prdetail"}>{data&&data.issue.issue_status==="关闭"?"关闭中":data&&data.pull_request.status===0?"开启中":"已合并"} </span>
            <span className="ml10 lineH32">
              由 { data && data.issue.author_name} 于 { data && data.issue.created_at }创建{ data && data.issue.journals_count && data.issue.journals_count > 0 ?` · ${data.issue.journals_count} 条评论`:""}
            </span>
            <span className="pull-right lineH32">
              <Link to={`/projects/${projectsId}/merge/${mergeId}/UpdateMerge`} className="color-blue fr">编辑</Link>
            </span>
          </p>
          <div className="df mt20">
              {
                data && data.attachments.length > 0 ?
                  <Attachments attachments={data.attachments} showNotification={this.props.showNotification}/>
                  :
                  ""
              }
          </div>
          <div className="detailHeader-wrapper">
          <div className="normal f-wrap-between">
            <ul className="headerMenu-wrapper" style={{paddingTop:42,paddingLeft:15}}>
              <li className={url.indexOf("Messagecount")>0? "active" : ""}><Link to={`/projects/${projectsId}/merge/${mergeId}/Messagecount`}>对话内容</Link></li>
               <li className={url.indexOf("MergeSubmit")>0 ? "active" : ""}><Link to={`/projects/${projectsId}/merge/${mergeId}/MergeSubmit`}>代码提交</Link></li>
            </ul>
          </div>
        </div>

        </div>
        <div className="f-wrap-between mt5" style={{alignItems:"flex-start"}}>
          <div className="item-list-right" >
            <Spin spinning={isSpin}>
              <ul className="ul_width">
                {renderList()}
              </ul>
            </Spin>

            { Paginations }
            <div className="df" style={{display:this.state.data&&this.state.data.pull_request.status===1?'none':'flex'}}>
              <Link to={``}><img className="user_img" src={getImageUrl(`images/${current_user && current_user.image_url}`)} alt=""/></Link>
              <div className="new_context" >
              <p>该合并请求可以进行自动合并操作</p>
              <p style={{marginTop:15,display:this.state.mergekey==='rebase'?this.state.buttonshow==='none'?"block":"none":this.state.ismesrge==='none'?"block":"none"}}>
              {/* <button className="topmerge_btn" onClick={this.submitmerge} >{this.state.mergename}</button> */}
              {/* <Dropdown style={{marginBottom:5}} overlay={menu} trigger={['click']} > */}
              <Dropdown.Button overlay={menu} type="primary" onClick={this.submitmerge} icon={<Icon type="caret-down"/>}>
               {this.state.mergename}
            </Dropdown.Button>
              
              {/* </Dropdown> */}
              </p>
             
              <div style={{display:this.state.ismesrge,marginTop:15}}>
                  <Input placeholder="标题" value={this.state.title} onChange={this.changtitlepr}/>
                  <TextArea placeholder="=描述..." style={{height:"300px",marginTop:15}} value={this.state.body} onChange={this.changbodypr} />
              </div>
              <p className="clearfix mt15" style={{display:this.state.buttonshow}}>
                  <a className="topWrapper_btn " type="submit" onClick={()=>this.prmerge()}>合并请求</a>
                  <a className="a_btn cancel_btn " type="submit" style={{marginLeft:15}} onClick={this.nonemerge}>取消</a>
              </p>
              </div>
           
            </div>
            <div className="order_line" style={{marginLeft:80}}></div>
            <div className="df">
              <Link to={``}><img className="user_img"
                                 src={getImageUrl(`images/${current_user && current_user.image_url}`)} alt=""/></Link>
              <div className="new_context">
                <Form.Item>
                  {getFieldDecorator('content', {
                    rules: [{
                      required: true, message: '请输入内容'
                    }],
                  })(
                    <TextArea placeholder="添加评论..." style={{height: "200px"}}/>
                  )}
                </Form.Item>
                <UploadComponent load={this.UploadFunc} isComplete={showFiles}></UploadComponent>
                <p className="clearfix mt15">
                  <a className="topWrapper_btn fr" type="submit" onClick={this.addjournals}>评论</a>
                  <a className="Closeor_btn fr" type="submit" style={{display:data&&data.pull_request.status===0?'block':'none'}}
                     onClick={() => this.closedetail(data && data.issue.issue_status === "关闭" ? 2 : 5)}>{data && data.issue.issue_status === "关闭" ? "开启" : "关闭"}</a>
                </p>
              </div>
            </div>
          </div>
          <div className="list-left DetailRight mt10">
            <p>
              <span className="span_title">标签</span>
              <span>{
                data && data.issue.issue_tags ? <span className="issue-tag-show" style={{background: data.issue.issue_tags[0].color}}>{data.issue.issue_tags[0].name}</span> : "--"
              }</span>
            </p>
            <p>
              <span className="span_title">里程碑</span>
              <span>{
                data && data.issue.version ? data.issue.version : "--"
              }</span>
            </p>
            <p>
              <span className="span_title">指派给</span>
              <span>{data && data.issue.assign_user_name ? data.issue.assign_user_name : "--"}</span>
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
      <img className="list_img" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1608431072,669449145&fm=27&gp=0.jpg" alt=""/>
      </Modal>
    </div>
    )
  }
}

const MessageCountForm = Form.create({ name: 'MessageCountForm' })(MessageCount);
export default MessageCountForm;