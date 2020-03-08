import React , {Component} from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';
import Nav from './Nav';
import UploadComponent from '../Upload/Index';
import { getImageUrl } from 'educoder';
import {Modal, Col, Form, Input, Tooltip, Popconfirm, Pagination  , Spin} from 'antd'
import NoneData from '../../modules/courses/coursesPublic/NoneData';
import Attachments from '../Upload/attachment'


const TextArea = Input.TextArea;


class Detail extends Component{
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
      showFiles: true
    }
  }
  
  componentDidMount=()=>{
    this.getDetail();
  }

  getDetail=()=>{
    const { projectsId , orderId} = this.props.match.params;
    const url = `/projects/${projectsId}/issues/${orderId}.json`;
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
          const url = `/issues/${data.id}/journals.json`;
          axios.post(url,{
            ...values,
            issue_id:data.id,
            attachment_ids:fileList
          }).then(result=>{
            if(result){
              this.props.form.setFieldsValue({
                content: ""
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
      const url = `/issues/${data.id}/journals.json`;
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
          })
        }
      }).catch(error=>{
        console.log(error);
      })
    }
  
  //删除工单信息
    deletedetail=(id)=>{
      const { projectsId , orderId} = this.props.match.params;
    const url = `/projects/${projectsId}/issues/${orderId}.json`;
      axios.delete(url,{ data: {
        project_id: projectsId,
        id:id
      }
    }).then((result)=>{
        if(result){
          this.props.history.push(`/projects/${projectsId}/orders`);
        }
      }).catch((error)=>{
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
      const {page, limit } = this.state;
      const {orderId} = this.props.match.params;
      const url = `/issues/${orderId}/journals/${id}.json`;
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
      const { page, limit } = this.state;
      const url = `/issues/${orderId}/journals/${id}.json`;
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
    editdetail=(count,status)=>{
      this.setState({
        countvalue:count,
        isedit:status
      })  
    }

  renderJournalList=(list)=>{
    console.log(list);
    if(list && list.length >0){
      return(
        list.map((item,key)=>{
          return(
            <div key={key+1} className="journal-list-item">
              <span className="font-weight-bold mr3">
                {item.detail}：
              </span>
              <span className="mr5 color-grey-9">
                {item.old_value && item.old_value.length > 0 ? "更新为" : "新增"}
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

    //复制
    copydetail=()=>{
      const {projectsId,orderId} = this.props.match.params;
      const url = `/projects/${projectsId}/issues/${orderId}/copy.json`;
      axios.post(url,{
        project_id:projectsId,
        id:orderId,
      }).then(result=>{
        if(result){
          this.props.history.push(`/projects/${projectsId}/orders/${result.data.issue_id}/copyetail`);
        }
      }).catch(error=>{
        console.log(error);
      })
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

  // 判断是否重新上传文件
  changeIsComplete=(flag)=>{
    this.setState({
      showFiles:flag
    })
  }

  render(){
    const { projectsId,orderId} = this.props.match.params;
    const { data,journalsdata, page, limit, search_count, isSpin, isedit, showFiles } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { current_user } = this.props;
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
                   <div className="detail_right" style={{display: current_user && isedit === undefined && (current_user.admin || current_user.login === item.user_login) ? "block" : "none"}}>
                     <span onClick={()=>this.editdetail(item.content,item.id)} className="detail_edit_action">编辑</span>
                     <Popconfirm placement="bottom" title={'确定要删除当前评论吗?'}  okText="是" cancelText="否" onConfirm={()=>this.deleteorder(item.id)}>
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
                          item && item.attachments && item.attachments.length > 0 ?
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
     }
   }

    return(
      <div className="main">
      <div className="topWrapper">
        <Nav  {...this.props} {...this.state}/>
        <Link to={`/projects/${projectsId}/orders/new`} className="topWrapper_btn">创建工单</Link>
      </div>
      <div>
        <div className="detailContent">
          <p>
            {
              data ?
                <span className="font-20">【{data.issue_classify === "issue" ? data.tracker : "合并请求"}】</span>
                :
                ""
            }
            <span className="font-20" > { data && data.subject }</span>

          </p>
          <p className="mt10 color-grey-c">
           <span className={data&&data.issue_status==="关闭"?"closedetail":"opendetail"}>{data&&data.issue_status==="关闭"?"关闭中":"开启中"} </span>
            <span className="ml10 lineH32">
              由 { data && data.author_name} 于 { data && data.created_at }创建{ data && data.journals_count && data.journals_count > 0 ?` · ${data.journals_count} 条评论`:""}
            </span>
            {
              data && data.user_permission ?
                <span className="pull-right lineH32">
              <a className="color-blue fr" onClick={this.copydetail}>复制</a>
              <Popconfirm placement="bottom" title={'您确定要删除吗'}  okText="是" cancelText="否" onConfirm={()=>this.deletedetail(orderId)}>
                <a className="color-blue fr" style={{marginLeft:20,marginRight:20}}>删除</a>
              </Popconfirm>

              <Link to={`/projects/${projectsId}/orders/${orderId}/updatedetail`} className="color-blue fr">编辑</Link>
            </span>
                :
                ""
            }
          </p>
          <div className="df mt20">
            <Link to={``}><img className="user_img" src={getImageUrl(`images/${data && data.author_picture}`)} alt=""/></Link>
            <div className="detail_context">
              <div className="detail_p">
                { data && data.description }
              </div>
              {
                data && data.attachments && data.attachments.length > 0 ?
                  <Attachments attachments={data.attachments} showNotification={this.props.showNotification}/>
                  :
                  ""
              }
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

            <div className="df">
              <Link to={``}><img className="user_img" src={getImageUrl(`images/${current_user && current_user.image_url}`)} alt=""/></Link>
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
                <UploadComponent load={this.UploadFunc} isComplete={showFiles} changeIsComplete={this.changeIsComplete}></UploadComponent>
                <p className="clearfix mt15">
                  <a className="topWrapper_btn fr" type="submit" onClick={this.addjournals}>评论</a>
                  {
                    data && data.user_permission ?
                      <a className="Closeor_btn fr" type="submit"
                         onClick={() => this.closedetail(data && data.issue_status === "关闭" ? 2 : 5)}>{data && data.issue_status === "关闭" ? "重新开启" : "关闭"}</a>
                      :
                      ""
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="list-left DetailRight mt10">
            <p>
              <span className="span_title">分支</span>
              <span>{
                data && data.branch_name ? data.branch_name : "--"
              }</span>
            </p>
            <p>
              <span className="span_title">标签</span>
              <span>{
                data && data.issue_tags ? <span className="issue-tag-show" style={{background: data.issue_tags[0].color}}>{data.issue_tags[0].name}</span> : "--"
              }</span>
            </p>
            <p>
              <span className="span_title">里程碑</span>
              <span>{
                data && data.version ? data.version : "--"
              }</span>
            </p>
            <p>
              <span className="span_title">当前状态</span>
              <span>{
                data && data.issue_status ? data.issue_status : "--"
              }</span>
            </p>
            <p>
              <span className="span_title">分类</span>
              <span>{
                data && data.tracker ? data.tracker : "--"
              }</span>
            </p>
            <p>
              <span className="span_title">指派给</span>
              <span>{data && data.assign_user_name ? data.assign_user_name : "--"}</span>
            </p>
            <p>
              <span className="span_title">优先级</span>
              <span>{data && data.priority ? data.priority : "--"}</span>
            </p>
            <p>
              <span className="span_title">完成度</span>
              <span>{data && data.done_ratio ? data.done_ratio : "--"}</span>
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

const WrappedDetailForm = Form.create({ name: 'DetailOrderForm' })(Detail);
export default WrappedDetailForm;