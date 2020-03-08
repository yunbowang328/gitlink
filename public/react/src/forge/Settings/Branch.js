import React , { Component } from 'react';
import { Input , Select } from 'antd';

const { Option } = Select;
class Branch extends Component{
  constructor(props){
    super(props);
    this.state={
      userDataSource:undefined
    }
  }

  // 更新仓库设置
  resetSetting=()=>{
    
  }

  render(){
    const { branchList } = this.props;
    const branchListRender = (
      branchList && branchList.map((item,key)=>{
        return(
          <Option value={item.name}>{item.name}</Option>
        )
      })
    )
    return(
      <div className="normalBox">
        <div className="normalBox-title font-16">
          分支列表
        </div>
        <p className="pl15 pt15">请选择一个默认的分支用于合并请求和提交：</p>
        <div className="addPanel">
          <Select className="branchSelect">
            {branchListRender}
          </Select>
          <a className="small_submitBtn ml20" onClick={this.resetSetting}>更新仓库设置</a>
        </div>
      </div>
    )
  }
}
export default Branch;