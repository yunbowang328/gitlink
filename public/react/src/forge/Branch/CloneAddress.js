import React , { Component } from 'react';
import { Dropdown , Icon , Menu } from 'antd';

import "./branch.css"

class CloneAddress extends Component{
  constructor(props){
    super(props);
  }
  // 点击按钮复制功能
  jsCopy=()=>{
    var e = document.getElementById("copy_rep_content");
    e.select();
    document.execCommand("Copy");
    this.props.showNotification('复制成功');
  }

  render(){
    const { http_url , downloadUrl } = this.props;
    return(
      <div className="gitAddressClone">
        <span className={"addressType active"} onClick={()=>this.changeAddress("http")}>HTTP</span>
        {/* <span className={address ==="ssh" ? "addressType active":"addressType"} onClick={()=>this.changeAddress("ssh")}>SSH</span> */}
        <input type="text" id="copy_rep_content" value={ http_url }/>
        <span onClick={()=>this.jsCopy()}><i className="iconfont icon-fuzhi"></i></span>
        <span>
        <Dropdown overlay={downloadUrl} trigger={['click']} placement="bottomRight">
          <a className="ant-dropdown-link">
            <Icon type="cloud-download" className="font-18 fl"/>
          </a>
        </Dropdown></span>
      </div>
    )
  }
}
export default CloneAddress;