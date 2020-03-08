import React , { Component } from "react";
import { NavLink } from 'react-router-dom';
import './order.css'
class Nav extends Component{
  constructor(props){
    super(props);
    this.state={
      projectTag: undefined
    }
  }

  render(){
    const { projectsId } = this.props.match.params;
    return(
      <p className="topWrapper_nav">
        <NavLink activeClassName="active" className="issue-type-button" to={`/projects/${projectsId}/orders/tags`}>标签</NavLink>
        <NavLink activeClassName="active" className="issue-type-button" to={`/projects/${projectsId}/orders/Milepost`}>里程碑</NavLink>
        
      </p>
    )
  }
}
export default Nav;