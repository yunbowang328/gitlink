import React , { Component } from 'react';
import { Link} from 'react-router-dom';

class DetailTop extends Component{
  render(){
    const { projectDetail } = this.props;
    const { projectsId } = this.props.match.params;
    const { pathname } = this.props.location;
    return(
      <p className="branch-wrapper">
        <Link to={`/projects/${projectsId}/coder/commit`} className={ pathname.indexOf("/coder/commit") > 0 ? "active" : ""}>
          <i className="iconfont icon-tijiaojilu font-18 mr3"></i>
          <span className="mr3">{projectDetail && projectDetail.commits_count}</span>提交
        </Link>
        <Link to={`/projects/${projectsId}/coder/branch`} className={ pathname.indexOf("/coder/branch") > 0 ? "active" : ""}>
          <i className="iconfont icon-fenzhi font-18 mr3"></i>
          <span className="mr3">{projectDetail && projectDetail.branches_count}</span>分支
        </Link>
      </p>
    )
  }
}
export default DetailTop;
