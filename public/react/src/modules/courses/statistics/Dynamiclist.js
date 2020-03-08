import React,{ Component } from "react";
import {Row, Col,Popover,Button,Icon} from "antd";
import {
	G2,
	Chart,
	Geom,
	Axis,
	Tooltip,
	Coord,
	Label,
	Legend,
	View,
	Guide,
	Shape,
	Facet,
	Util
} from "bizcharts";

class Dynamiclist extends Component{
	constructor(props){
		super(props);
		this.state={

		}
	}


	render(){
		const data = []
		let {course_members}=this.props;
    if(course_members){
    	if(course_members.length>0){
				course_members.map((item,key)=>{
					data.push({'name':item.user_name,'活跃度':item.total_score})
				})
			}
		}

		const content = (
			<div className={"Statisticscircle"}>
				<p>
					作业完成数（*10）
				</p>
				<p>
					试卷完成数（*10）
				</p>
				<p>
					问卷完成数（*7）
				</p>
				<p>
					资源发布数（*5）
				</p>
				<p>
					帖子发布数（*2）
				</p>
				<p>
					帖子回复数（*1）
				</p>
				<p>
					作业回复数（*1）
				</p>
			</div>
		);
		return(
			<React.Fragment>
				<Row>
					<Col span={12} className={"top10s"}>Top 10</Col>
					<Col span={12} className={"Statisticsliboxjsgz"}>
						<span className={"mr10"}>计算规则</span>
						<Popover  placement="bottom" title={"活动规则计算说明"} content={content} trigger="hover">
							<Icon type="info-circle" />
						</Popover>
					</Col>
				</Row>
				{/*scale={cols}*/}
				<Chart height={400} data={data} forceFit>
					<Axis name="name" />
					<Axis name="活跃度" />
					<Tooltip
						crosshairs={{
							type: "y"
						}}
					/>
					<Geom type="interval" position="name*活跃度" />
				</Chart>
			</React.Fragment>
		)
	}
}
export default Dynamiclist;
