import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { Dropdown , Icon , Menu , Pagination,Typography,Popconfirm} from 'antd';
import Nav from './Nav';
import NoneData from '../../modules/courses/coursesPublic/NoneData';
import axios from 'axios';

const { Text } = Typography;

class Milepost extends Component{
  constructor(props){
    super(props);
    this.state={
      data:undefined,
      limit:15,
      page:1,
      order_type:undefined,
      //新建标签区域是否显示 none 隐藏 block 显示
      display:'none',
      status:'open',
      openselect:1,
      closeselect:undefined,
      order_name:undefined
    } 
  }

  componentDidMount=()=>{
    this.getList(1,this.state.status,'desc');
  }
 

  

  getList=(page,status,order_type,order_name)=>{
    const { projectsId } = this.props.match.params;
    const { limit } = this.state;
    const url = `/projects/${projectsId}/versions.json`;
    axios.get(url,{
      params:{
        projectsId,page,limit,status,order_type,order_name
      }
    }).then((result)=>{
      if(result){
        this.setState({
          data:result.data
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  opneMilelist=(type)=>{
    const { order_name} = this.state;
    if(type){
      const { current_user } = this.props;
      if(type===1){
        this.setState({
          status:'open',
          openselect:current_user.user_id,
          closeselect:undefined
        })
        this.getList(1,'open','desc',order_name);
      }else{
        this.setState({
          status:'closed',
          openselect:undefined,
          closeselect:current_user.user_id
        })
        this.getList(1,'closed','desc',order_name); 
      }
    }

  }

  updatestatusemile=(status,arr)=>{
    const { projectsId } = this.props.match.params;
    const url = `/projects/${projectsId}/versions/${arr.id}/update_status`;
    const { current_user } = this.props;
    axios.post(url,{
      project_id:projectsId,
      id:arr.id,
      status:status
    }).then(result=>{
      if(result){
        this.setState({
          status:status,
          closeselect:status==="closed"?current_user.user_id:undefined,
          openselect:status==="closed"?undefined:current_user.user_id
        }) 

        this.getList(1,status,'desc')
      }
    }).catch(error=>{
      console.log(error);
    })
  }

  closemile=(arr)=>{
    const { projectsId } = this.props.match.params;
    const url = `/projects/${projectsId}/versions/${arr.id}`;
    axios.delete(url,{ data: {
      project_id: projectsId,
      id: arr.id
    }
  }).then((result)=>{
      if(result){
        this.getList(1,this.state.status,'desc')
      }
    }).catch((error)=>{
      console.log(error);
    }) 
  }

  ChangePage=(page)=>{
    this.setState({
      page
    })

    this.getList(page);
  }

  // 排序
  arrayList=(e)=>{
    this.setState({
      order_name:e.key,
      order_type:e.item.props.value
    })
    this.getList(1,this.state.status,e.item.props.value,e.key);
  }


  //控制新建标签页是否显示
  newshow=()=>{
    this.setState({
      display:'block'
    });
   
  };
  newclose=()=>{
    this.setState({
      display:'none'
    }); 
  };


  render(){
    const { data , limit , page,openselect,closeselect } = this.state;
    const { projectsId } = this.props.match.params;
    const menu = (
      <Menu onClick={this.arrayList}>
        <Menu.Item key={'created_on'} value="desc">到期日从近到远</Menu.Item>
        <Menu.Item key={'created_on'} value="asc">到期日从远到近</Menu.Item>
        <Menu.Item key={'percent'} value="desc">完成度从低到高</Menu.Item>
        <Menu.Item key={'percent'} value="asc">完成度从高到低</Menu.Item>
        <Menu.Item key={'issues_count'} value="desc">工单从多到少</Menu.Item>
        <Menu.Item key={'issues_count'} value="asc">工单从少到多</Menu.Item>
      </Menu>
    )

    const Paginations = (
      <React.Fragment>
        {
          data && data.issue_tags_count > limit ?
          <div className="mt30 mb50 edu-txt-center">
            <Pagination simple defaultCurrent={page} total={data && data.issue_tags_count} pageSize={limit} onChange={this.ChangePage}></Pagination>
          </div>:""
        }
      </React.Fragment>
    )

    const renderList =()=>{
       if(data && data.versions && data.versions.length>0 ){
        return(
          <div className="tagList">
            {
              data.versions.map((item,key)=>{
                return(
                <div style={{display:'block'}}>
                    <div className="milepostdiv">
                        <div className="milepostwidth">
                          <div className="grid-item width100">
                            <i className="iconfont icon-lubiaosignpost3 font-12 mr3"></i>
                            <Link to={`/projects/${projectsId}/orders/${item.id}/MilepostDetail`} className="font-16">{item.name}</Link>
                          </div>

                        </div>
                    </div> 
                    <div className="milepostdiv" style={{marginTop:5}}>
                        <div className="milepostrighe">

                          <div className="grid-item mr10">
                            <i className="iconfont icon-rili font-14 mr5">
                            </i>
                            {
                              item.effective_date ?
                                <span className="color-red">{item.effective_date}</span>
                                :
                                <span className="color-grey-c">暂无截止时间</span>
                            }
                          </div>
                          <div className="grid-item mr10 color-grey-9">
                            <i className="iconfont icon-issue font-14 mr5"></i>
                            <span>
                              {item.open_issues_count}个开启
                            </span>
                          </div>
                          <div className="grid-item mr10 color-grey-9">
                            <i className="iconfont icon-shanchudiao font-14 mr5"></i>
                            <span>
                              {item.close_issues_count}个关闭
                            </span>
                          </div>
                        </div>
                      {
                        data && data.user_admin_or_member ?
                          <div className="milepostleft">
                            <div className="grid-item mr15 color-grey-9">
                              <i className="iconfont icon-bianji3 font-14 mr5"></i>
                              <Link to={`/projects/${projectsId}/orders/${item.id}/meilpost`} className="color-grey-9">编辑</Link>
                            </div>
                            <div className="grid-item mr15 color-grey-9">
                              <i className="iconfont icon-yiguanbi1 font-14 mr5"></i>
                              <a onClick={()=>this.updatestatusemile(this.state.status==="closed"?"open":"closed",item)} className="color-grey-9">{this.state.status==="closed"?"开启":"关闭"}</a>
                            </div>
                            <div className="grid-item mr15 color-grey-9">
                              <i className="iconfont icon-lajitong font-14 mr5" ></i>
                              <Popconfirm placement="bottom" title={'是否删除里程碑？'}  okText="是" cancelText="否" onConfirm={()=>this.closemile(item)}>
                                <a className="color-grey-9">删除</a>
                              </Popconfirm>
                            </div>

                          </div>
                          : ''
                      }

                    </div> 
                    <div className="milepostdiv"style={{marginTop:5}}>
                        <div className="textwidth">
                        <Text
                            type="secondary"
                            ellipsis={{rows: 30, expandable: false, onExpand: Function}}
                        >
                            {item.description}</Text>
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
        <div>
          <div className="topWrapper">
            <Nav {...this.props} {...this.state} />
            {
              data && data.user_admin_or_member ?
                <Link to={`/projects/${projectsId}/orders/meilpost`} className="topWrapper_btn">新的里程碑</Link>
                : ''
            }


          </div>
          <div style={{display: this.state.display}}>
            <div className="tagdiv" >
            <span>里程碑{ data && data.issue_tags_count }已创建</span>
            </div>
          </div>
          <div className="topWrapper">
              <div className="topWrapper_type">
              <li className={openselect ? "active":""} onClick={()=>this.opneMilelist(1)}>{data && data.open_count}个开启中</li>
              <li className={closeselect ? "active":""} onClick={()=>this.opneMilelist(2)}>{data && data.closed_count}个已关闭</li>
                {/* <span onClick={this.opneMilelist}>{ data && data.open_count }开启中</span>
                <span onClick={this.closeMilelist}>{ data && data.closed_count }已关闭</span> */}
            </div>
            <ul className="topWrapper_select">
              <li>
                <Dropdown className="topWrapperSelect" overlay={menu} trigger={['click']} placement="bottomCenter">
                  <span>排序<Icon type="caret-down" className="ml5" /></span>
                </Dropdown>
              </li>
            </ul>
          </div>
          { renderList()}
          { Paginations }
        </div>
      </div>
    )
  }
}
export default Milepost;