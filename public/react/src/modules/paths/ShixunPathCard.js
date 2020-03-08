import React, { Component } from 'react';
import {getImageUrl , setImagesUrl } from 'educoder';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Tooltip} from 'antd';
import LoadingSpin from '../../common/LoadingSpin';


class ShixunPathCard extends Component{
  constructor(props) {
    super(props)
  }
  render(){
    let {pathList}=this.props;
    return(
      <div className="educontent" id="subjects_list_content">

        {
         pathList===null?<LoadingSpin/>
				: pathList && pathList.length > 0 ?
          (
            <div className="square-list clearfix">
              {
                pathList && pathList.map((item,key)=>{

                  return(
                    <div className="squareCard" id={"item_"+key}>
                      {/* item.tag_name === null ? "" :
                        <div className="tag-green">
                          <span className="tag-name">{item.tag_name}</span>
                          <img src={getImageUrl('images/educoder/tag2.png')}/>
                        </div> */}

											{
												item.excellent === false ? "" :
                        <div className="tag_open">
                          <span className="tag_open_name">开放课程</span>
                        </div>
											}

											{/* <div className={item.allow_visit=== false ? "closeSquare" : "none"}>
                        <img src={getImageUrl("images/educoder/icon/lockclose.svg")}
                            className="mt80 mb25"/>
                        <p className="font-14 color-white">非试用内容，需要授权</p>
                      </div> */}

                      <Link to={"/paths/"+item.id} className="squareImg" >
												{/*target="_blank"*/}
                        <img alt="详情图片" src={setImagesUrl(item.image_url)}/>
                      </Link>
                      <div className="mt20" style={{marginLeft:"1px"}}>
                        <p className="task-hide mb10">
                          <Link to={"/paths/"+item.id}  className="justify cardName">{item.name}</Link>
													{/*target="_blank"*/}
                        </p>
                        <p className="clearfix squareInfo">

                          {/* <Tooltip placement="bottom" title={"章节"}> */}
                            {/* <i className="iconfont icon-shixun fl mr3"></i> */}
                            <span className="fl pr squareLine mr20">章节: {item.stages_count}</span>
                          {/* </Tooltip> */}

                          {/*<Tooltip placement="bottom" title={"经验值"}>*/}
                              {/*<span className="mr10 fl squareIconSpan"><i className="iconfont icon-jingyan fl mr3"></i>{item.shixuns_count}</span>*/}
                          {/*</Tooltip>*/}
                          {/* <Tooltip placement="bottom" title={"学习人数"}> */}
                            {/* <i className="iconfont icon-chengyuan fl mr3"></i> */}
                            <span className="fl">学习人数: {item.members_count}</span>
                          {/* </Tooltip> */}
                        </p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          ):(
            <div className="edu-tab-con-box clearfix edu-txt-center mb50">
              <img className="edu-nodata-img mb20" src={getImageUrl("images/educoder/nodata.png")}/>
              <p className="edu-nodata-p mb20">暂时还没有相关数据哦！</p>
            </div>
          )
        }
        
      </div>
    )
  }
}
export default ShixunPathCard;

