import React,{ Component } from "react";
import './css/moopCases.css'
import '../courses/css/Courses.css'

import { getUrl } from 'educoder';

import Tags from './CaseTags'

class CaseItem extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let { libraries } = this.props;
    console.log(libraries)
    return(
      <div className="library-list-container">
        {
          libraries && libraries.map((item,key)=>{
            return(
            	<a href={`/moop_cases/${item.id}`}  target="_blank">
								<li className="library_list_item pointer">
									<img alt={item.id} className="mr15 mt3 radius4" height="90" src={getUrl(`${item.cover_url || "/images/educoder/library-default-cover.png"}`)} width="120" />
									<div className="flex1">
										<p className="clearfix mb25 lineh-40">
											<a className="task-hide font-22 library_l_name">{item.title}</a>
											<span className="fl mt10"><Tags tags={item.tags}></Tags></span>
										</p>
										<p className="clearfix lineh-20">
											<span className="color-grey-3 mr10">{item.author_name}</span>
											<span className="color-grey-3 mr20">{item.author_school_name}</span>
											<span className="color-grey-c fr">
												{
													item.visited_count && item.visited_count != 0 ?
													<span className="color-grey-c ml20"><span className=" item-group-icon mr5"><i className="fa fa-eye"></i></span>{item.visited_count} 浏览</span>:""
												}
												{
													item.praise_count && item.praise_count != 0 ?
													<span className="color-grey-c ml20"><span className=" item-group-icon mr5"><i className="fa fa-thumbs-o-up"></i></span>{item.praise_count} 赞</span>:""
												}
												{
													item.download_count && item.download_count != 0 ?
													<span className="color-grey-c ml20" style={{"marginRight":'1px'}}><span className=" item-group-icon mr5"><i className="fa fa-download"></i></span>{item.download_count} 下载</span>:""
												}
											</span>
										</p>
									</div>
								</li>
							</a>
            )
          })
        }
        
      </div>
    )
  }
}
export default CaseItem;