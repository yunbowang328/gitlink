import React,{ Component } from "react";
import './css/moopCases.css'
import '../courses/css/Courses.css'

class CaseTags extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let { tags } = this.props;
    return(
      <React.Fragment>
        {
          tags && tags.map((item,key)=>{
            return(
              <React.Fragment>
                {
                  item.name == "获奖案例" ?
                  <span key={key} className="edu-filter-btn fl cdefault edu-activity-red ml10">{item.name}</span>
                  :
                  item.name == "入库案例" ?
                  <span key={key} className="edu-filter-btn fl cdefault edu-activity-blue ml10">{item.name}</span>
                  :item.name =='企业案例'?
                  <span key={key} className="edu-filter-btn fl cdefault edu-activity-orange-sub ml10">{item.name}</span>
										: <span key={key} className="edu-filter-btn fl cdefault edu-activity-36c53c-sub ml10">{item.name}</span>
                }
              </React.Fragment>
            )
          })
        }
      </React.Fragment>
      
    )
  }
}
export default CaseTags;