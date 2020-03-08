import React , { Component } from 'react';
import { Dropdown , Icon , Menu } from 'antd';

import "./branch.css"

class SelectBranch extends Component{

  render(){
    const { branchs , branch , changeBranch } = this.props;
    const menu = (
      <Menu>
        {
          branchs && branchs.map((item,key)=>{
            return(
              <Menu.Item key={item.index} onClick={(value)=>changeBranch(value)}>{item.name}</Menu.Item>
            )
          })
        }
      </Menu>
    );
    return(
      <div className="branchDropdown f-wrap-alignCenter">
        <span className="color-grey-9 mr3"><i className="iconfont icon-fenzhi font-20 color-grey-6 mr3"></i>分支:</span>
        <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
          <a className="ant-dropdown-link">
            {branch} <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    )
  }
}
export default SelectBranch;