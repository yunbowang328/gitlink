import React , { Component } from 'react';
import { Link } from 'react-router-dom';

class MergeItem extends Component{

  set_issue_tags =(issue_tags)=>{
    if(issue_tags && issue_tags.length > 0){
      return(
        issue_tags.map((item,key)=>{
          return(
            <span className="issue-tag-show" style={{background: item.color}}>{item.name}</span>
          )
        })
      )
    }else{
      return("--")
    }
  }

  render(){
    const { issues , search_count , page , limit } = this.props;
    const { projectsId } = this.props.match.params;
    const renderList =()=>{
      if(issues && issues.length > 0){
        return(
          issues.map((item,key)=>{
            return(
              <div className="issueItem">
              <div className="flex-1">
                  <p className="mb15 df">
                    <span className="issueNo"># {search_count - (key + (page-1) * limit)}</span>
                    <Link to={`/projects/${projectsId}/merge/${item.pull_request_id}/Messagecount`} className="flex-1 hide-1 font-16 color-grey-3 lineh-30">{item.name}</Link>
                  </p>
                  <p className="color-grey-6 font-12">
                    <span>{item.format_time}</span><span className="ml5">发布</span>
                    {
                      item.updated_at === item.format_time ?
                        ""
                        :
                        <span className="ml20"><span>{item.updated_at}</span><span className="ml5">更新</span></span>
                    }
                  </p>
                </div>
                  <ul className="topWrapper_select">
                  <li>{this.set_issue_tags(item.issue_tags)}</li>
                  {/*<li>{item.issue_type || "--"}</li>*/}
                  <li>{item.version || "--"}</li>
                  <li>{item.assign_user_name || "--"}</li>
                  <li>{ item.journals_count ? <span><i className="iconfont icon-pinglun1 mr3 font-16"></i>{item.journals_count}</span> : "" }</li>
                </ul>
              </div>
            )
          })
        )
      }
    }
    return(
      <div>
        {renderList()}
      </div>
    )
  }
}

export default MergeItem;