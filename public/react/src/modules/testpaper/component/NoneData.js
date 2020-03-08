import React, { Component } from 'react';
import { getImageUrl , getUrl } from 'educoder';

class NoneData extends Component{
	constructor(props) {
		super(props)
	}
	render(){
		const { style } = this.props;
		return(
			<div className="edu-tab-con-box clearfix edu-txt-center intermediatecenter" style={ style || { width:"100%",height:"100%"}}>
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
            .zenwuxgsj{
						font-size:17px;
						font-family:MicrosoftYaHei;
						color:rgba(136,136,136,1);
            }
          `}
				</style>
				<img className="edu-nodata-img mb20" src={getUrl("/images/educoder/nodata.png")}/>
				<p className="edu-nodata-p mb10  zenwuxgsj">暂无相关数据</p>
				<p className="edu-nodata-p mb20 mt4 zenwuxgsj">请选择试题进行组卷</p>
			</div>
		)
	}
}
export default NoneData;
