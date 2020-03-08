import React,{ Component } from "react";

class CDropdown extends Component{
  constructor(props){
    super(props);
    
  }
  
  render(){
    let { dataList, children, actionButtonText, onActionButtonClick }=this.props;
    return(
      <ul className="drop_down_menu" style={{"lef":"tunset"}}>
        {
          dataList && dataList.length > 10?
          (<p className="drop_down_search">
            <Input placeholder="搜索"/>
          </p>):
          (dataList && dataList.length == 0 && <p>暂无数据</p>)
        }
        {children}
        <p className="drop_down_btn">
          <a href="javascript:void(0)" className="color-grey-6" onClick={onActionButtonClick}>{actionButtonText}</a>
        </p>
      </ul>
    )
  }
}
export default CDropdown;