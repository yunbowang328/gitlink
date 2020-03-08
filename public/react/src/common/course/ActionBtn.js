import React, { Component } from 'react';
import {Link} from 'react-router-dom'

const map={"blue":"blueFull","greyBack":"greyBack","grey":"greyWidthFixed","green":"greenBack",'greyLine':"greyLine",'orangeLine':"orangeLine",
  'colorBlue': 'colorBlue',   // 蓝字白底
}
class ActionBtn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let{to, children, style, className, ...others}=this.props
    return(
      <React.Fragment>
        {
          to==undefined ? 
          <a href="javascript:void(0)" onClick={this.props.onClick} 
            {...others}
            className={"Actionbtn "+`${map[style || 'blue']} ${this.props.className}`}
          >{children}</a>
          :
          <Link to={to} className={"btn "+`${map[this.props.style]} ${this.props.className}`} {...others}>{this.props.children}</Link>
        }
      </React.Fragment>
    )
  }
}
export default ActionBtn;