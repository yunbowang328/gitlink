import React,{ Component } from "react";

class ColorCountText extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    let { count, name } = this.props;
    return(
      <span className="fl mt22">共<label className="color-orange-tip ml3 mr3">{count}</label>{name}</span>
            
      )
    }
}
export default ColorCountText;