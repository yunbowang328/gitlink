import React, { Component } from 'react';
import {Spin} from 'antd';
class LoadingSpin extends Component{
	constructor(props) {
		super(props)
	}
	render(){
		const { style } = this.props;
		return(
			<div className="edu-tab-con-box clearfix edu-txt-center" style={style}>
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
				<Spin tip="正在获取相关数据..."/>
			</div>
		)
	}
}
export default LoadingSpin;