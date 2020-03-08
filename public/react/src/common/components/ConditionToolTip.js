import React,{ Component } from "react";
import { Modal,Input, Tooltip} from "antd";

class ConditionToolTip extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }
  render(){
    
    let { condition } = this.props;
    return(
      <React.Fragment>
        {
          condition ? 
          <Tooltip placement="bottom" {...this.props}>
            {this.props.children}
          </Tooltip> : 
          <React.Fragment>
            {this.props.children}
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}
export default ConditionToolTip;