import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu , Input , Dropdown , Icon, Spin , Pagination } from 'antd';
import '../css/index.css'
import './list.css';


import ListItem from './IndexItem'
import axios from 'axios';

import img_new from '../Images/new.png';
import img_array from '../Images/array.png';

const Search = Input.Search;

class Index extends Component{
  constructor(props){
    super(props);
    this.state={
      projectsList:undefined,
      page:1,
      limit:15,
      search:undefined,
      sort:undefined,
      total:0,
      isSpin:true,
      project_type:undefined,
      category_id:undefined,

      typeList:undefined,
      categoryList:undefined
    }

  }

  componentDidMount=()=>{
    const { page,limit, search , sort ,project_type,category_id} = this.state;
    this.getListData(page,limit, search , sort,project_type,category_id);

    this.getType();

    this.getCategory();
  }

  // 获取列表
  getListData=(page,limit, search , sort,project_type,category_id)=>{
    const { current_user } = this.props;
    const url = `/projects.json`;
    axios.get(url,{params:{
      user_id:current_user && current_user.user_id,
      page,
      limit,
      search,
      sort_by:sort,
      project_type,
      category_id
    }}).then((result)=>{
      if(result){
        this.setState({
          projectsList:result.data.projects,
          total:result.data.total_count,
          isSpin:false
        })
      }
    }).catch((error)=>{})
  }

  // 获取类型
  getType=()=>{
    const url = `/projects/group_type_list.json`;
    axios.get(url).then((result)=>{
      if(result && result.data){
        this.setTypeList(result.data, undefined)
      }
    }).catch((error)=>{})
  }

  setTypeList=(list, active_type)=>{
    this.setState({
      typeList:list.map((item,key)=>{
        return(
          <li key={key} className={active_type && active_type === item.project_type ? 'active' : ''} onClick={()=>this.changeType(`${item.project_type}`, list)}>
            <p>
              <span className="font-16">{item.name}</span>
              <span className="color-blue">{item.projects_count}</span>
            </p>
          </li>
        )
      })
    })
  }

  // 切换类型
  changeType=(type,list)=>{
    this.setState({
      isSpin:true,
      project_type:type,
      search:undefined
    })
    this.setTypeList(list,type)
    const { page,limit, sort,category_id } = this.state;
    this.getListData(page,limit, undefined , sort, type ,category_id);
  }

  // 获取类型
  getCategory=()=>{
    const url = `/project_categories/group_list.json`;

    axios.get(url).then((result)=>{
      if(result && result.data){
        this.setCategoryList(result.data, undefined);
      }
    }).catch((error)=>{})
  }

  setCategoryList=(list, active_id)=>{
    this.setState({
      categoryList:list.map((item,key)=>{
        return(
          <li key={key} className={active_id && parseInt(active_id) === item.id ? 'active' : ''} onClick={()=>this.changeCategory(`${item.id}`,list)}>
            <p>
              <span className="font-16">{item.name}</span>
              <span className="color-blue">{item.projects_count}</span>
            </p>
          </li>
        )
      })
    })
  }

  changeCategory=(id,list)=>{
    this.setState({
      category_id:id,
      page:1
    });
    this.setCategoryList(list,id)
    const { limit , sort, project_type } = this.state;
    this.getListData(1,limit, undefined , sort, project_type ,id);
  }

  // 排序
  ChangeSoryBy=(e)=>{
    this.setState({
      sort_by:e.key,
      page:1,
      search:undefined,
      isSpin:true
    })
    const { limit,project_type,category_id } = this.state;
    this.getListData(1 ,limit , undefined , e.key,project_type,category_id);
  }

  // 搜索
  searchFun=(value)=>{
    // console.log(value)
    this.setState({
      page:1,
      search:value,
      isSpin:true,
      project_type:undefined
    })
    const { limit , sort , category_id } = this.state;
    this.getListData(1 ,limit, value , sort , undefined,category_id);
  }
  changeSearchValue=(e)=>{
    this.setState({
      search:e.target.value
    })
  }
  // 翻页
  ChangePage=(page)=>{
    this.setState({
      page
    })
    const { limit, search , sort,project_type,category_id } = this.state;
    this.getListData(page,limit, search , sort,project_type,category_id);
  }

  render(){
    const menu=(
      <Menu onClick={this.ChangeSoryBy}>
        <Menu.Item key="updated_on">更新时间排序</Menu.Item>
        <Menu.Item key="created_on">创建时间排序</Menu.Item>
        <Menu.Item key="forked_count">fork数据排序</Menu.Item>
        <Menu.Item key="praises_count">点赞数量排序</Menu.Item>
      </Menu>
    )
    const newItem=(
      <Menu>
        <Menu.Item key="created_mirror"><Link to={`/projects/mirror/new`}>新建镜像项目</Link></Menu.Item>
        <Menu.Item key="created_deposit"><Link to={`/projects/deposit/new`}>新建托管项目</Link></Menu.Item>
      </Menu>
    )

    const { projectsList , isSpin , total , search , limit , page , typeList , categoryList } = this.state;

    const pagination = (
      total && total > limit ?
      <div className="edu-txt-center pt30 mb30">
        <Pagination simple defaultCurrent={page} total={total} pageSize={limit} onChange={this.ChangePage}></Pagination>
      </div>:""
    )
    return(
      <div style={{background:"#fafafa"}}>
        <p className="t_project_banner"></p>
        <div className="main ProjectListIndex">
          <div className="list-left">
            <ul className="list-l-Menu">
              <li className="MenuTitle">项目类型</li>
              { typeList }
            </ul>
            <ul className="list-l-Menu">
              <li className="MenuTitle">项目类别</li>
              { categoryList }
            </ul>
          </div>
          <div className="list-right boxShandow padding0-25">
            <Spin spinning={isSpin}>
              <div className="list-r-operation">
                <div>
                  <Dropdown overlay={newItem} trigger={["click"]} placement='bottomRight' className="mr30">
                    <a className="ant-dropdown-link">
                      <span className="color-blue font-16"><img src={img_new} alt="" width="13px"/> 新建</span>
                    </a>
                  </Dropdown>
                  <Dropdown overlay={menu} trigger={['click']} placement='bottomRight'>
                    <a className="ant-dropdown-link">
                      <span className="color-blue font-16">排序 <img src={img_array} alt="" width="10px"/></span>
                    </a>
                  </Dropdown>
                </div>
                <Search
                  placeholder="输入项目名称关键字进行搜索"
                  enterButton="搜索"
                  size="large"
                  onSearch={this.searchFun}
                  className="list-r-Search"
                  value={search}
                  onChange={this.changeSearchValue}
                />
              </div>
              <ListItem {...this.props} {...this.state} projects={projectsList}></ListItem>
              { pagination }
            </Spin>
          </div>
        </div>
      </div>
    )
  }
}
export default Index;
