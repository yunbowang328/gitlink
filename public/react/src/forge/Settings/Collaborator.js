import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input , AutoComplete , Dropdown , Menu , Icon , Spin , Pagination } from 'antd';
import axios from 'axios';

const { Option } = AutoComplete;
const MENU_LIST = [{
  id:"Manager",
  name:'管理员'
},{
  id:"Developer",
  name:'开发人员'
},{
  id:"Reporter",
  name:'报告人员'
}];
const LIMIT = 15;
class Collaborator extends Component{
  constructor(props){
    super(props);
    this.state={
      listData:undefined,
      user:undefined,
      user_id:undefined,
      userDataSource:undefined,
      page:1,
      total_count:undefined,
      isSpin:true
    }
  }

  componentDidMount=()=>{
    if(this.props.project_id){
      const { page } = this.state;
      this.getMember(this.props.project_id,page);
    }
  }

  componentDidUpdate=(prevState)=>{
    if(this.props.project_id && this.props.project_id !== prevState.project_id){
      const { page } = this.state;
      this.getMember(this.props.project_id,page);
    }
  }

  // 获取项目协作者
  getMember=(project_id,page)=>{
    const url =  `/projects/${project_id}/members.json`;
    axios.get(url,{
      params:{
        page,limit:LIMIT
      }
    }).then(result=>{
      if(result){
        this.setState({
          listData:result.data.members,
          isSpin:false,
          total_count:result.data.total_count
        })
      }
    }).catch(error=>{
      console.log(error);
    })
  }
  // 输入用户
  changeInputUser=(e)=>{
    this.getUserList(e);
  }
  // 选择用户
  selectInputUser=(e,option)=>{
    this.setState({
      user_id:e
    })
    this.getUserList(option.props.children);
  }
  getUserList=(e)=>{
    const url = `/users/list.json`;
    axios.get(url,{
      params:{
        search:e
      }
    }).then(result=>{
      if(result){
        this.setState({
          userDataSource:result.data.users
        })
      }
    }).catch(error=>{
      console.log(error);
    })
  }

  // 增加协作者
  addCollaborator=()=>{
    const { project_id } = this.props;
    const { user_id } = this.state;
    const url = `/projects/${project_id}/members.json`;
    axios.post(url,{
      user_id
    }).then(result=>{
      if(result){
        this.setState({
          isSpin:true
        })
        this.getMember(project_id);
      }
    }).catch(error=>{
      console.log(error);
    })
  }

  // 修改权限
  changeOperaiton=(e,id)=>{
    const { project_id , page } = this.props;
    this.setState({
      isSpin:true
    })
    const url = `/projects/${project_id}/members/change_role.json`;
    axios.put(url,{
      user_id:id,
      role:e.key
    }).then(result=>{
      if(result){
        this.setState({
          isSpin:true
        })
        this.props.showNotification('权限修改成功!');
        this.getMember(project_id,page);
      }
    }).catch(error=>{
      console.log(error);
    })
  }

  // 删除协作者
  deleteUser=(id)=>{
    const { page } = this.state;
    this.props.confirm({
      content:"确认将此成员从项目中移除？",
      onOk:()=>{
        const { project_id } = this.props;
        const url = `/projects/${project_id}/members/remove.json`;
        axios.delete(url,{
          user_id:id
        }).then(result=>{
          if(result){
            this.setState({
              isSpin:true
            })
            this.props.showNotification("成员删除成功！");
            this.getMember(project_id,page);
          }
        }).catch(error=>{
          console.log(error);
        })
      }
    })
  }
  changePage=(page)=>{
    this.setState({
      page
    })
    const { project_id } = this.props;
    this.getMember(project_id,page);
  }
  render(){
    const { userDataSource , listData , isSpin , page , total_count } = this.state;
    // 获取当前项目的拥有者
    const { author } = this.props;
    const menu =(id)=> (
      <Menu>
        {
          MENU_LIST.map((item,key)=>{
            return(
              <Menu.Item key={item.id} value={item.id} onClick={(e)=>this.changeOperaiton(e,id)}>{item.name}</Menu.Item>
            )
          })
        }
      </Menu>
    )

    const source = userDataSource && userDataSource.map((item,key)=>{
      return(
        <Option key={key} value={`${item.user_id}`}>{item.username}</Option>
      )
    })
    return(
      <div>
        <div className="normalBox">
          <div className="normalBox-title font-16">
            协作者
          </div>
          <Spin spinning={isSpin}>
            <div className="collaboratorList">
              {
                listData && listData.map((item,key)=>{
                  const operation = MENU_LIST.filter(i=>i.id === item.role);
                  return(
                    <div className="collaboratorItem">
                      <span><Link to={``} className="color-blue">{item.name}</Link></span>
                      <span>
                        {
                          author && author.login === item.login ?
                          <label>{operation && operation[0].name}</label>
                          :
                          <Dropdown overlay={menu(`${item.id}`)} placement={"bottomCenter"}>
                            <span>{operation && operation[0].name}<Icon type="down" /></span>
                          </Dropdown>
                        }
                        
                      </span>
                      <span style={{justifyContent:"center"}}>
                        {
                          author && author.login !== item.login &&
                          <a className="red_btn" onClick={()=>this.deleteUser(item.id)}>删除</a>
                        }
                      </span>
                    </div>
                  )
                })
              }
              

            </div>
          </Spin>
          <div className="addPanel">
            <AutoComplete
              dataSource={source}
              style={{ width: 200 }}
              onChange={this.changeInputUser}
              onSelect={this.selectInputUser}
              placeholder="搜索用户"
            />
            <a className="small_submitBtn ml20" onClick={this.addCollaborator}>增加协作者</a>
          </div>
        </div>
        {
          total_count && total_count > LIMIT ?
          <div className="edu-txt-center mt20 mb20">
            <Pagination showQuickJumper pageSize={LIMIT} current={page} total={total_count} onChange={this.changePage}></Pagination>
          </div>
          :""
        }
      </div>
    )
  }
}
export default Collaborator;