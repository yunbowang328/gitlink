import React , { Component } from 'react';
import {Link} from 'react-router-dom';
import './activity.css';
import { getImageUrl } from 'educoder';


class ActivityItem extends Component{
  render(){
    const { projectsId } = this.props.match.params;
    const { item } = this.props;
    return(
      <div className="activity_item">
        <div className="flex1">
          {/* 如果是版本发布 */}
          { item.trend_type==="VersionRelease"? 
          <p className="itemLine">
            <Link to={`/projects/${projectsId}/version`} className="color-blue font-16">{item.name}</Link>
            <span className="activity_type">{item.trend_type}</span>
          </p >
          :
          // 如果是工单
          item.trend_type==="Issue"?
          <p className="itemLine">
            <Link to={`/projects/${projectsId}/orders/${item.trend_id}/detail`} className="color-blue font-16">{item.name}</Link>
            <span className="activity_type">{item.trend_type}</span>
          </p >
          :
          // 如果是合并请求
          <p className="itemLine">
            <Link to={`/projects/${projectsId}/merge/${item.trend_id}/Messagecount`} className="color-blue font-16">{item.name}</Link>
            <span className="activity_type">{item.trend_type}</span>
          </p >
          }
          <p className="itemLine mt15">
            <img alt="" src={getImageUrl(`images/${item.user_avatar}`)} className="createImage"/>
            <span className="mr20">{item.user_name}</span>
            { item.created_at && <span className="color-grey-9">创建于<span className="ml2 color-grey-6">{item.created_at}</span></span>}
            </p >
            </div>
            </div>
    )
  }
}
export default ActivityItem;