import React, { Component } from 'react';
import {Link} from 'react-router-dom'

const map={"blue":"colorblue","white":"colorwhite","grey":"colorgrey", 'orange': "color-orange",'colorgrey9':'color-grey-9'}
class WordsBtn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let{to, href,targets, style2, style, className, ...others }=this.props
    return(
      <React.Fragment>
        {
          to==undefined&&targets==undefined ?
          <a href={href || "javascript:void(0)"} onClick={this.props.onClick} className={"btn "+`${map[this.props.style]} ${this.props.className}`}
              style={style2} {...others}
          >{this.props.children}</a>:
						targets!=undefined? <a href={to} target="_blank" className={"btn "+`${map[this.props.style]} ${this.props.className}`}
              style={style2} {...others}
            >{this.props.children}</a>
          :
          <Link to={to} className={"btn "+`${map[this.props.style]} ${this.props.className}`}
            style={style2} {...others}
          >{this.props.children}</Link>
        }
      </React.Fragment>
    )
  }
}
export default WordsBtn;