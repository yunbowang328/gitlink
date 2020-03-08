import React , { Component } from 'react';
import { Link } from "react-router-dom";
import { Dropdown , Menu , Icon , Tooltip } from 'antd';

import './list.css'
import { branch } from 'recompose';
import Top from './DetailTop';

class CoderRootBranch extends Component {
  constructor(porps){
    super(porps);
    this.state={
      data:undefined
    }
  }

  render(){
    const { branchList, projectDetail } = this.props;
    const { projectsId } = this.props.match.params;
    const list =()=>{
      if(branchList && branchList.length>0){
        return(
          <React.Fragment>
          

          <ul className="branchUl">
            {
              branchList.map((item,key)=>{
                return(
                  <li>
                    <div>
                      <Link to={`/projects/${projectsId}/coder?branch=${item.name}`} className="color-blue font-15" style={{"maxWidth":"100px"}}>{item.name}</Link>
                      {/*<span className="color-blue font-15">{item.name}</span>*/}
                      <p className="f-wrap-alignCenter">
                        <span className="mr5 color-blue">{item.last_commit && item.last_commit.id}</span>
                        {/*<Link to="javascript:void(0)" className="mr5 color-blue" >{item.last_commit && item.last_commit.id}</Link>*/}
                        <span className="color-grey-9 hide-1 messages leftPoint">{item.last_commit && item.last_commit.message}</span>
                        <span className="color-grey-6 leftPoint">最后更新于{item.last_commit && item.last_commit.time_from_now}</span>
                      </p>
                    </div>
                    <span>
                      <Link to={`/projects/${projectsId}/merge/new`} className="mr20 operationBtn">创建合并请求</Link>
                      
                      <Dropdown overlay={menu(item.zip_url,item.tar_url)} trigger={['click']} placement="bottomRight" className="operationBtn">
                        <a className="ant-dropdown-link">
                          <Tooltip title={`下载分支${item.name}`}><Icon type="cloud-download" className="font-18"/></Tooltip>
                        </a>
                      </Dropdown>
                    </span>
                  </li>
                )
              })
            }
          </ul>
          </React.Fragment>
        )
      }
    }
    const menu =(zip_url,tar_url)=> (
      <Menu>
        <Menu.Item><a href={zip_url}>ZIP</a></Menu.Item>
        <Menu.Item><a href={tar_url}>TAR.GZ</a></Menu.Item>
      </Menu>
    )
    return(
      <div>
        <Top { ...this.props } {...this.state} />
        <div className="branchTable">
          <p className="branchTitle">分支列表</p>
          {list()}
        </div>
      </div>
    )
  }

}

export default CoderRootBranch;