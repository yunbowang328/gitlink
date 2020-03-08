import React, { Component } from 'react';
import { getUrl } from 'educoder';

class NoneData extends Component{
  
  
  render(){
    const { style,searchtypes } = this.props;

    return(
      <div className="edu-tab-con-box clearfix edu-txt-center" style={ style || { width:"100%" }}>
        <style>
          {`
            .edu-tab-con-box{
              padding:100px 0px;
            }
            .ant-modal-body .edu-tab-con-box{
              padding:0px!important;
            }
            img.edu-nodata-img{
              margin: 40px auto 20px;
            }
          `}
        </style>
        <img className="edu-nodata-img mb20" src={getUrl("/images/educoder/nodata.png")}/>
        <p className="edu-nodata-p mb20">{searchtypes===true?"抱歉没有您要搜索的内容，请换个词语试试看":"暂时还没有相关数据哦!"}</p>
      </div>
    )
  }
}
export default NoneData;